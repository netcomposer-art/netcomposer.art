const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/preset-library-mount-CwR-kAeB.js","assets/studio-preset-BbaiSdKB.js"])))=>i.map(i=>d[i]);
import{S as pa,c as io,a as Ka,b as so,v as i,p as O,d as ro,r as cs,e as H,f as oo,g as lo,h as In,O as pn,l as co,i as uo,j as Dn,K as po,k as ho,m as ds,w as fo,s as mo,n as go,o as Wa,q as bo,t as yo,u as Rn,x as wo,y as en,z as Ae,A as us,B as ps,C as vo,D as ko,E as xo,F as Va,G as $o,H as Me,I as So,J as je,L as Eo,M as Ao,N as To,P as Mo,Q as Lo,R as Co,T as No,U as Fo,V as zo,W as Po,X as Io,Y as Ya,Z as Xa,_ as Do,$ as Ro}from"./studio-preset-BbaiSdKB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const Oo="modulepreload",_o=function(t){return"/rhythm/"+t},Ja={},hs=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");s=o(n.map(c=>{if(c=_o(c),c in Ja)return;Ja[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":Oo,d||(m.as="script"),m.crossOrigin="",m.href=c,u&&m.setAttribute("nonce",u),document.head.appendChild(m),d)return new Promise((g,w)=>{m.addEventListener("load",g),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},Pe=1e-9;function Bo(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class ha{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return Bo(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+Pe&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+Pe)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+Pe){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-Pe;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,s=.25){const r=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(e,n);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,n);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,n+a*(l-1)/o)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new ha({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+Pe)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+Pe)return n[a];return n[0]}}const Ho=Object.freeze({beatsPerBar:4,beatUnit:4}),Ke=1e-9;function qo(t){return Math.floor(t+Ke)}function fs(t,e,n=!1){if(!(e>0))return t;const s=Math.ceil(t/e-Ke)*e;return n&&s<=t+Ke?s+e:s}class jo{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new ha({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Ho}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Ke&&(this.stopTime===null||e<this.stopTime-Ke)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Ke?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=qo(e/n),s=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:s,barPhase:s/n}}nextBar(e,n=!1){return fs(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const ms="nc-clock/snapshot",gs=1;function Uo(t,e="local"){return{format:ms,version:gs,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Go(t,e){const n=Wo(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}function Ko(t,e,n=t.timebase){const a=s=>s===null?null:s+e;return{...t,timebase:n,anchor:{beat:t.anchor.beat,time:t.anchor.time+e},tempo:t.tempo.map(s=>({...s})),meter:{...t.meter},startTime:a(t.startTime),stopTime:a(t.stopTime)}}const ue=t=>typeof t=="number"&&Number.isFinite(t),Qa=t=>t===null||ue(t);function Wo(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==ms&&n("format"),(!ue(e.version)||Math.floor(e.version)!==gs)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!ue(e.anchor.beat)||!ue(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&ue(a.beat)&&ue(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!ue(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!ue(e.meter.beatUnit))&&n("meter"),(!Qa(e.startTime)||!Qa(e.stopTime)||!ue(e.stoppedBeat))&&n("transport times"),e}class Vo{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new jo(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){Go(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Uo(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Yo="nc-sync/1",Xo=1,Jo="nc-sync",Qo="nc-sync-leader",Zo=0,bs=.5,ys=.75;function el(t){return typeof t=="number"&&Number.isFinite(t)&&t>=bs&&t<=ys?t:null}const hn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),nt=t=>typeof t=="number"&&Number.isFinite(t),At=t=>typeof t=="string"&&t.length>0;function tl(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==Xo||!At(e.type)||!At(e.from)||!nt(e.term)||!nt(e.seq)||!nt(e.sentAt))return null;switch(e.type){case"hello":return At(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return nt(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&nt(e.slot)?e:null;case"ping":case"pong":return At(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function nl(t,e,n,a,s){return{proto:Yo,from:e,term:n,seq:a,sentAt:s,...t}}function j(){return(performance.timeOrigin+performance.now())/1e3}const fn=.003,al=3,mn=.002+1e-6,il=.01,Za=500;class sl{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?il:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=fn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!u&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,u))):(this.pendingStep=o,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const s=this.heldBase()!==null,r=this.ctx.currentTime,o=r<=this.revertUntil;let l;if(a&&o){const u=this.offsets,c=this.preStep;u.length=0;for(let d=0;d<c.length;d++)u.push(c[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const d=this.offsets,p=this.preStep;p.length=0;for(let m=0;m<d.length;m++)p.push(d[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const u=this.offsets,c=e-n;for(let d=0;d<u.length;d++)u[d]+=c;this.stepCount++,l={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!s)for(const u of[...this.stepListeners])u(l);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&n[l]>o;)n[l+1]=n[l],l--;n[l+1]=o}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const s=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>=fn&&s.performanceTime>0)if(this.waitSince=null,s.contextTime===this.lastStampC&&s.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Za)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=s.contextTime,this.lastStampP=s.performanceTime,this.stampSince=this.perfNow(),n=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3,a=!0;else if(!s||!(s.contextTime>=fn)&&!(s.contextTime>0&&!(s.performanceTime>0))){if(s){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<Za)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(al,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let s=-1,r=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(e[c]-e[l])<=mn&&u++;u>r&&(s=l,r=u)}if(r<a)return;const o=e[s];for(let l=n-1;l>=0;l--)Math.abs(e[l]-o)>mn&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-this.estimate())<=mn}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const s=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(s,2)};setTimeout(s,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class rl{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...hn,...e.capabilities},this.channelOption=e.channel??Jo,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const s=this.o.now(),r=()=>{n===this.startWaits&&e(s)};return a.then(r,r),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const s=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(s),0)}else{const s=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?s:Math.max(e+this.o.gatedStartLeadSeconds,s),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const u=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??fs(u,1),u);a&&a>0?(o.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(ys,Math.max(bs,e)):Zo;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=el(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=tl(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...hn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...hn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(s=>{this.leader&&this.decideStart(s)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Qo,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,o,l)=>[r?0:1,o,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(nl(e,this.id,this.term,++this.seq,this.o.now()))}}const ws=16,ol=[2,6,10,14],ll=[2,3,6,10,11,14],gt=[0,2,4,6,8,10,12,14],cl=[2,6,10,14],dl=[1,3,7,9,11,15],ei=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],gt,[2,6,10,14]],vs=[gt,[0,4,8,12]],ul=[32,64],pl=.95,hl=.55,fl=.15,ml=.3,gl={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]},ride:{tune:[3800,4800],decay:[3.2,4.6],level:[.42,.55]},crash:{tune:[6e3,7200],decay:[4.6,6.5],level:[.45,.55]}},bl=new Set(["ride","crash"]);function G(){return Array.from({length:ws},()=>!1)}function we(t,e,n,a=!1){const s=e+t()*(n-e);return a?Math.round(s):Math.round(s*100)/100}function gn(t,e,n){return we(t,Math.max(0,e-n),Math.min(1,e+n))}function yl(t){const e=G();e[0]=!0,t()<.85&&(e[8]=!0),t()<.75&&(e[4]=!0),t()<.75&&(e[12]=!0);const n=[3,6,10,14],a=n[Math.floor(t()*n.length)]??6;return t()<.35&&(e[a]=!0),e}function wl(t){const e=G();e[4]=t()<.85,e[12]=t()<.85,!e[4]&&!e[12]&&(e[t()<.5?4:12]=!0);const n=ol.filter(()=>t()<.22);for(const a of n.slice(0,2))e[a]=!0;return e}function vl(t,e){const n=G();return t[4]&&e()<.65&&(n[4]=!0),t[12]&&e()<.65&&(n[12]=!0),n}function kl(t,e){const n=G();let a=0;for(const s of ll)a>=3||t[s]||e()<.35&&(n[s]=!0,a+=1);return n}function xl(t){const e=G();let n=0;for(const a of cl){if(n>=2)break;t()<.4&&(e[a]=!0,n+=1)}return e}function $l(t,e){const n=G();for(const o of gt)n[o]=!t[o];const a=gt.filter(o=>n[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),u=a.splice(l,1)[0];u!==void 0&&(n[u]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(n[o]=!0,r+=1)}return n}function Sl(t,e){const n=G(),a=t[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(n[r]=!0,s+=1)}return n}function El(t,e,n){const a=G();let s=0;for(const r of dl)s>=2||t[r]||e[r]||n()<.35&&(a[r]=!0,s+=1);return a}function ks(t,e){const n=G(),a=t[Math.floor(e()*t.length)]??t[0]??[];for(const s of a)n[s]=!0;return n}function xs(t){const e=G(),n=ei[Math.floor(t()*ei.length)]??gt;for(const a of n)e[a]=!0;return e}function jt(t,e,n){return Array.from({length:e},(a,s)=>{const r=t[s]===!0,o=r&&n(s);return{on:r,accent:o,velocity:o?1:.8}})}function $s(t,e){return t==="kick"?e===0||e===8:t==="snare"?e===4||e===12:t==="shaker"?e%4===2:!1}function On(t,e,n){const a=gl[t];return{tune:we(n,a.tune[0],a.tune[1],!0),decay:t==="shaker"?Math.round((a.decay[0]+n()*(a.decay[1]-a.decay[0]))*1e3)/1e3:we(n,a.decay[0],a.decay[1]),tone:gn(n,e.tone,.15),snap:gn(n,e.snap,.15),drive:gn(n,e.drive,.1),level:we(n,a.level[0],a.level[1])}}function Ss(t,e=!1){const n=yl(t),a=wl(t),s=xl(t);return{kick:n,snare:a,clap:vl(a,t),rim:kl(n,t),hat:$l(s,t),hatOpen:s,tom:Sl(a,t),metal:El(n,a,t),shaker:e?xs(t):G(),ride:G(),crash:G()}}function Al(t,e,n){const a=t.tracks[e];if(!a)return t;const s=l=>l.every((u,c)=>u.on===(a.steps[c]?.on??!1));if(a.voice==="crash"){const l=ul.filter(d=>d!==a.length),u=l[Math.floor(n()*l.length)]??64,c={...a,...As(u)};return{...t,tracks:t.tracks.map((d,p)=>p===e?c:d)}}let r=a.steps;for(let l=0;l<6;l++){const u=a.voice==="ride"?ks(vs,n):Ss(n,a.voice==="shaker")[a.voice];if(r=a.voice==="ride"?Es(u,a.length):jt(u,a.length,c=>$s(a.voice,c)),!s(r)&&r.some(c=>c.on))break}const o=a.steps.slice(a.length);return{...t,tracks:t.tracks.map((l,u)=>u===e?{...l,steps:[...r,...o]}:l)}}function Tl(t){return{...t,tracks:t.tracks.map(e=>{const n=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<n||r>=e.length)return s;const o=r-n;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function Ml(t,e){return Cl(Ll(t,e),e)}function Ll(t,e){const n=Ss(e),a=e()<.4?.5:we(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...t,bpm:t.bpm,swing:a,fx:{...t.fx,mode:r,cutoff:we(e,.55,.9),resonance:we(e,.05,.3),drive:we(e,.02,.18)},tracks:t.tracks.map(o=>{if(bl.has(o.voice))return o;const l=On(o.voice,o.params,e),u=o.voice==="shaker"?e()<.5?G():xs(e):n[o.voice];return{...o,mute:o.mute,solo:o.solo,params:l,steps:jt(u,o.length,c=>$s(o.voice,c))}})}}function Es(t,e){return Array.from({length:e},(n,a)=>({on:t[a%ws]===!0,accent:!1,velocity:a%4===0?pl:hl}))}function As(t){return{length:t,steps:Array.from({length:t},(e,n)=>({on:n===0,accent:n===0,velocity:1}))}}function Cl(t,e){const n=t.tracks.find(c=>c.voice==="ride"),a=t.tracks.find(c=>c.voice==="crash");if(!n&&!a)return t;const s=n?On("ride",n.params,e):null,r=a?On("crash",a.params,e):null,o=n!==void 0&&e()<fl,l=o?ks(vs,e):G(),u=a!==void 0&&e()<ml;return{...t,tracks:t.tracks.map(c=>c.voice==="ride"&&s?{...c,params:s,steps:Es(l,c.length)}:c.voice==="crash"&&r?u?{...c,params:r,...As(64)}:{...c,params:r,steps:jt(G(),c.length,()=>!1)}:c.voice==="hat"&&o?{...c,steps:jt(G(),c.length,()=>!1)}:c)}}function Nl(t,e=Math.random){const n=[];let a=null;for(let r=0;r<pa;r+=1){const o=io(Ml(t,e));n.push(o),r===0&&(a=o)}const s=a?{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:t;return{bank:{slots:n,active:0},document:s}}function Z(t){return`${Math.round(t*100)}%`}function ti(t){return Z(t)}function Fl(t,e){return t==="tune"?`${Math.round(e)} Hz`:Z(e)}function zl(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ni(t){return`${Math.round(t*1e3)} ms`}const Pl={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:t=>`${Math.round(t)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:ni},tone:{label:"Bright",min:0,max:1,step:.01,text:Z},snap:{label:"Beads",min:0,max:1,step:.01,text:Z},drive:{label:"Attack",min:0,max:1,step:.01,text:t=>ni(Ka+(so-Ka)*t)},level:{label:"Level",min:0,max:1,step:.01,text:Z}};function ai(t){const e=t==="ride";return{tune:{label:"Tone",min:e?3e3:3500,max:e?8e3:12e3,step:10,text:n=>`${(n/1e3).toFixed(1)} kHz`},decay:{label:"Decay",min:.5,max:e?8:11,step:.01,text:n=>`${n.toFixed(1)} s`},tone:{label:"Wash",min:0,max:1,step:.01,text:Z},snap:{label:"Hit",min:0,max:1,step:.01,text:Z},drive:{label:"Drive",min:0,max:1,step:.01,text:Z},level:{label:"Level",min:0,max:1,step:.01,text:Z}}}const Il={ride:ai("ride"),crash:ai("crash")};function Dl(t){return t==="shaker"||t==="ride"||t==="crash"}function Rl(t,e){return t==="shaker"?Pl[e]:t==="ride"||t==="crash"?Il[t][e]:{label:zl(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:n=>Fl(e,n)}}const ii={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},si=(t,e)=>{const n=t&&typeof t=="object"?t:{},a={...e.dials};for(const[s,r]of Object.entries(n.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof n.on=="boolean"?n.on:e.on,dials:a}};function bt(t){const e=t.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:si(e.drive,ii.drive),compressor:si(e.compressor,ii.compressor)}}function Ol(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const Tt=t=>Math.max(0,Math.min(100,t));function Ts(t){const e=Ol(t.cutoff),n=Tt(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:Tt(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:Tt(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:Tt(100*Math.log(e/2e4)/Math.log(150/2e4))}}}function _l(t){const{type:e,dials:n}=Ts(t);if(e==="highpass"){const s=n.cutoff??0;return{hz:20*100**(s/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:s<=0}}if(e==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const Bl="Tap to join",Ms="Tap to join the playing beat";function It(t,e){return t&&e?"join":e?"stop":"play"}function Ls(t){return t==="join"?Bl:t==="stop"?"Stop":"Play"}function Hl(t,e,n={}){const a=n.beatsPerBar??4,s=(n.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((t+s)/a-1e-9)*a)}class ql{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,n){return this.shown=It(e,n),this.shown}gesture(e,n,a=!1){return this.joinedBy=!1,a||this.joining||It(e,n)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,n){const a=this.joinedBy||this.joining||It(e,n)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,n){return this.joining=!1,this.entry=Hl(e,n,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class jl{constructor(e=n=>JSON.stringify(n)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,n=!1){const a=this.key(e);if(this.value=e,this.has=!0,!n&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class fa{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,n){return!n||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,n,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??Cs(n,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const n=this.held;return!n||e<n.atBeat?null:this.finish(n)}takeHeld(e){const n=this.held;return!n||n.id!==e?null:this.finish(n)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const n=new fa;return n.queued=e.queued,n.held=e.held,n.seq=e.seq,n.taken=e.taken,n}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function Cs(t,e=4){return t<0?0:(Math.floor(t/e+1e-9)+1)*e}class Ul{constructor(e){this.options=e}taps=[];tap(e){const{window:n=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>n+1&&this.taps.splice(0,this.taps.length-n-1);const u=this.meanInterval();return u===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/u)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const Ns=globalThis,Gl="linkslots",Kl=new Set(["0","false","off","no"]);function Wl(t,e=Ns.location?.search??"",n=Yl()){const a=new URLSearchParams(e).get(Gl);if(a!==null)return!Kl.has(a.trim().toLowerCase());try{return n?.getItem(t)==="1"}catch{return!1}}function Vl(t,e,n){return n||e===t}function Yl(){try{return Ns.localStorage??null}catch{return null}}function Xl(t){return Number.isFinite(t)?Math.min(.75,Math.max(.5,t)):.5}function Jl(t,e){const n=Math.floor(t/2),a=Xl(e);return n*.5+(t%2===0?0:a*.5)}function Ql(t,e){let n=(Math.imul(t+1,2654435761)^Math.imul(e|0,2246822519))>>>0;return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),n^=n>>>16,(n>>>0)/4294967296}function Zl(t,e,n,a){const s=[];if(!(a>n))return s;let r=!1;for(const u of t)u.solo&&(r=!0);const o=Math.max(0,Math.floor(n*4)-2),l=Math.ceil(a*4)+2;for(let u=o;u<=l;u++){const c=Jl(u,e);if(!(c<n||c>=a))for(let d=0;d<t.length;d++){const p=t[d];if(p.mute||r&&!p.solo)continue;const m=Math.max(1,p.length),g=p.steps[(u%m+m)%m];if(!g?.on)continue;const w=g.probability;w!==void 0&&w<1&&Ql(d,u)>=w||s.push({beat:c,step:u,voice:p.voice,velocity:g.velocity,accent:g.accent})}}return s}const ec="nc-ui",Fs={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"},breakpoint:{md:"768px"}},ma={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ut={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},tc={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ve={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},nc={light:{color:Fs.color,semantic:ma,component:Ut,runtime:tc},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},rt=t=>`--${ec}-${t}`,_n=ma["label-on-fill-dark"],ri=ma["label-on-fill-light"],ac=ve["label-min-contrast"],ic=/^#[0-9a-f]{6}$/i,sc=t=>typeof t=="string"&&ic.test(t),Dt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function oi(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));const a=e*Math.min(n,1-n),s=r=>{const o=(r+t/30)%12;return n-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${Dt(s(0)*255)}${Dt(s(8)*255)}${Dt(s(4)*255)}`}function zs(t){const[e,n,a]=[1,3,5].map(d=>parseInt(t.slice(d,d+2),16)/255),s=Math.max(e,n,a),r=Math.min(e,n,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const u=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((n-a)/l%6):s===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:u,l:o}}function li(t){const[e,n,a]=[1,3,5].map(s=>{const r=parseInt(t.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Bn(t,e){const[n,a]=[li(t),li(e)].sort((s,r)=>r-s);return(n+.05)/(a+.05)}const Gt=t=>Bn(t,_n)>=Bn(t,ri)?_n:ri;function Ps(t,e,n,a=ac){let s=oi(t,e,n);const r=Gt(s)===_n?1:-1;for(let o=0;o<40&&Bn(s,Gt(s))<a;o++)n+=r*.01,s=oi(t,e,n);return s}function rc(t){const{h:e,s:n}=zs(t),a=Ps(e,Math.min(n,ve["surprise-on-max-saturation"]),ve["surprise-on-lightness"]);return{fill:t,ink:Gt(t),on:a,onInk:Gt(a)}}const oc=(t,e)=>{const n=Math.abs(t-e)%360;return Math.min(n,360-n)};function lc(t,e=Math.random){const[n,a]=ve["surprise-saturation"],[s,r]=ve["surprise-lightness"],o=ve["surprise-min-hue-gap"],l=sc(t)?zs(t).h:null;let u=e()*360;return l!==null&&oc(u,l)<o&&(u=(l+o+e()*(360-2*o))%360),Ps(u,n+e()*(a-n),s+e()*(r-s))}function cc(t){if(!t)return null;const e=rc(t);return{[rt("surprise-fill")]:e.fill,[rt("surprise-ink")]:e.ink,[rt("surprise-on")]:e.on,[rt("surprise-on-ink")]:e.onInk}}const dc=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,uc=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function ci(t){const[e,n,a]=[1,3,5].map(l=>dc(parseInt(t.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function pc([t,e,n]){const a=(t+.3963377774*e+.2158037573*n)**3,s=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>Dt(uc(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const hc=ve["velocity-range"],Is={min:Ut.rhythm["velocity-min"],max:Ut.rhythm["velocity-max"]},di=Object.fromEntries(Object.entries(nc).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function fc(t,e=Is){const[n,a]=hc,s=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(s-n)/(a-n),o=e.ink??Ut.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=ci(e.min),u=ci(e.max);return{velocity:s,t:r,fill:pc(l.map((c,d)=>c+(u[d]-c)*r)),ink:o}}function ui(t,e=Is){return{[rt("velocity-fill")]:fc(t,e).fill}}const Ds="data-nc-theme",pi="nc-ui-theme-change",mc="(prefers-color-scheme: dark)",Rs=t=>t?.documentElement??null,Os=t=>t?.defaultView?.matchMedia?.(mc)??null,gc=t=>t==="light"||t==="dark"?t:"system";function bc(t=globalThis.document){return gc(Rs(t)?.getAttribute(Ds))}function Hn(t=globalThis.document){const e=bc(t);return e!=="system"?e:Os(t)?.matches?"dark":"light"}function _s(t,e=globalThis.document){const n=Rs(e);if(!n)return()=>{};let a=Hn(e);const s=()=>{const u=Hn(e);u!==a&&(a=u,t(u))},r=e.defaultView?.MutationObserver,o=r?new r(s):null;o?.observe(n,{attributes:!0,attributeFilter:[Ds]});const l=Os(e);return l?.addEventListener?.("change",s),e.addEventListener(pi,s),()=>{o?.disconnect(),l?.removeEventListener?.("change",s),e.removeEventListener(pi,s)}}const yc="[data-modulated], [data-modulated] *";function wc(){const t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${O("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${O("divider")}: ${i(`module-div-stack-${a}`)};
      ${O("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${O("text-sub")}: ${i("module-sub-stack-1")};
      ${O("divider")}: ${i("module-div-stack-1")};
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
${[1,2,3,4].map(e).join(`
`)}
${[1,2,3,4].map(t).join(`
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
.nc-section:has(> .nc-field[data-nc-slider]) { row-gap: ${i("module-pad")}; }
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
${yc} { transition: none; }
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
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
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
.nc-ui-fx-visual { display: block; width: 100%; height: ${i("display-height")}; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${i("target-min")});
    height: max(100%, ${i("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${i("module-gap")} * -1); }
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
  ${O("text-sub")}: ${i("module-sub-stack-1")};
  ${O("divider")}: ${i("module-div-stack-1")};
  ${O("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${i("fx-card-width")});
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
  ${O("text-sub")}: ${i("module-sub-stack-1")};
  ${O("divider")}: ${i("module-div-stack-1")};
  ${O("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${O("text-sub")}: ${i("module-sub-stack-1")};
  ${O("divider")}: ${i("module-div-stack-1")};
  ${O("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${O("text-sub")}: inherit;
  ${O("divider")}: inherit;
  ${O("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${i("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${i("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${i("module-bg-adjacent-4")}; }
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
    width: ${i("fx-fold-width")};
    padding-inline: 0;
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { display: none; }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-folded] > .nc-ui-fx-fold { display: flex; }
}
/* One channel strip: name, M and S, sends, then the fader with its scale and meter, then the readout. Every strip
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${i("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${i("module-gap")};
  min-width: 0;
  padding-inline: ${i("control-gap")};
}
.nc-strip + .nc-strip { border-inline-start: ${i("hairline")} solid ${i("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${i("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${i("strip-alt-bg")}; }
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
.nc-strip[data-nc-folded] { width: ${i("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${i("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${i("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
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
.nc-strip-ms { display: flex; gap: ${i("control-gap")}; height: ${i("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${i("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${i("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${i("hairline")} solid ${i("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${i("text-sub")} 50%, ${i("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${i("text-sub")}; }
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
    radial-gradient(closest-side, ${i("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${i("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${i("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${i("surface-page")} 70%, transparent 72%),
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
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
/* Tablets (769-1023 px): the fx row is full width under the strips; with a card folded, the open ones share the rest. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx:not([data-nc-folded]) {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
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
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${i("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${i("focus-width")} * 2) 0 ${i("accent-faint")};
  }
}
`}let bn=null;const vc="nc-ui-fallback";function Bs(t=globalThis.document){if(!t?.documentElement||(ro(t.documentElement),bn&&bn.ownerDocument===t))return;const e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${vc} {
${wc()}
}
`,t.head.append(e),bn=e}function Hs(t={}){const e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=t.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(s,r),n.append(a);let o=!1;const l=c=>{o=c===!0,n.setAttribute("aria-checked",o?"true":"false")};l(t.checked);const u=()=>{l(!o),t.onChange?.(o)};return n.addEventListener("click",u),{el:n,get checked(){return o},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}const qs=new WeakMap,hi=.25;function kc(t){const e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let r=0,o=t.step??.005,l=t.onChange,u=t.onReset;const c=h=>Math.min(1,Math.max(0,h)),d=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{const f=c(h);f!==r&&(r=f,d(),l?.(f))};let m=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});const f=n.getBoundingClientRect();h.target!==s&&f.height>0&&p(1-(h.clientY-f.top)/f.height),m=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;const f=n.getBoundingClientRect().height||1,b=(m-h.clientY)/f*(h.shiftKey?hi:1);m=h.clientY,p(r+b)});const w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),u?.()}),n.addEventListener("keydown",h=>{const f=h.shiftKey?o*hi:o,b={ArrowUp:r+f,ArrowRight:r+f,ArrowDown:r-f,ArrowLeft:r-f,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};h.key in b&&(h.preventDefault(),p(b[h.key]))});const y={el:n,get value(){return r},get dragging(){return g},set(h){g||(r=c(Number(h)||0),d())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(o=h.step),h.onChange&&(l=h.onChange),h.onReset&&(u=h.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),qs.set(n,y),y}function xc(t){return qs.get(t)}const js=new WeakMap,$c=.2,Sc=1.5,Ec=.5;function Ac(t,e){const n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function fi(t,e,n){const a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Ac(a.getComputedStyle(t).getPropertyValue(O(e)),n)}function Tc(t){const e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let y=0;y<n;y++){const h=e.createElement("span");h.className="nc-meter-bar";const f=e.createElement("span");f.className="nc-meter-peak";const b=e.createElement("span");b.className="nc-meter-rms";const k=e.createElement("span");k.className="nc-meter-hold",h.append(f,b,k),r.append(h),o.push({peak:f,rms:b,hold:k,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=t.label,u=t.onClear,c=!1,d=-1,p=-1;const m=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},g=(y,h,f,b)=>{const k=Math.round(b*1e3)/1e3;f[h]!==k&&(f[h]=k,y.style.transform=h==="hold"?`translateY(${Math.round((1-k)*1e3)/10}%)`:`scaleY(${k})`)};s.addEventListener("click",()=>{w.clear(),u?.()});const w={el:a,get clipped(){return c},update(y,h){d<0&&(d=fi(a,"motion-meter-fall",$c)),p<0&&(p=fi(a,"motion-meter-hold",Sc));const f=Math.max(0,Math.min(.25,Number(h)||0)),b=d>0?Math.exp(-f/d):0;o.forEach((k,$)=>{const x=y[$]??y[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(x.peak)||0)),E=Math.min(S,Math.max(0,Number(x.rms)||0));x.over&&w.clip(),k.level.peak=S>=k.level.peak?S:S+(k.level.peak-S)*b,k.level.rms=E>=k.level.rms?E:E+(k.level.rms-E)*b,k.holdAge+=f,S>=k.holdAt?(k.holdAt=S,k.holdAge=0):k.holdAge>p&&(k.holdAt=Math.max(S,k.holdAt-Ec*f)),g(k.peak,"peak",k.shown,k.level.peak),g(k.rms,"rms",k.shown,k.level.rms),g(k.hold,"hold",k.shown,k.holdAt),k.hold.dataset.off=k.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,m())},clear(){c=!1,m()},reset(){for(const y of o)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,g(y.peak,"peak",y.shown,0),g(y.rms,"rms",y.shown,0),g(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,m()},configure(y){y.onClear&&(u=y.onClear)}};return m(),w.reset(),js.set(a,w),w}function Mc(t){return t?js.get(t):void 0}function Lc(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==r)&&(t.width=s,t.height=r);const o=t.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:n}}function be(t){return Math.max(0,Math.min(1,t))}function Us(t,e){const{ctx:n,w:a,h:s}=Lc(t);if(!n)return;n.clearRect(0,0,a,s);const r=cs(t);if(e.paint==="swatch"){const u=H(t,"accent"),c=H(t,"rhythm.step-cell-on");t.dataset.ncAccent=u,t.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,s),n.fillStyle=c,n.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const u=e.mode??"lp",c=H(t,oo(u)),d=H(t,"divider"),p=be(e.cutoff??.5),m=.08+(1-be(e.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){const w=g/Math.max(1,a);let y=0;u==="lp"?y=w<p?1:Math.max(0,1-(w-p)/m):u==="hp"?y=w>p?1:Math.max(0,1-(p-w)/m):y=Math.max(0,1-Math.abs(w-p)/m);const h=s*.78-y*s*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=c,n.stroke(),n.fillStyle=H(t,"text-sub"),n.font=r,n.fillText(u.toUpperCase(),0,s),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=H(t,"accent"),n.beginPath();const u=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const d=c/Math.max(1,a),p=(s-4)*(1-Math.exp(-d*4/u));n.lineTo(c,s-p)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){const u=Array.isArray(e.peaks)?e.peaks:[],[c,d]=Array.isArray(e.region)?e.region:[0,1],p=H(t,"accent"),m=H(t,"text-sub"),g=s/2;n.fillStyle=H(t,"accent-soft"),n.fillRect(be(c)*a,0,(be(d)-be(c))*a,s),n.strokeStyle=H(t,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();const w=Math.floor(u.length/2);for(let y=0;y<w;y++){const h=(y+.5)/w*a,f=Math.max(-1,Math.min(1,u[y*2]??0)),b=Math.max(-1,Math.min(1,u[y*2+1]??0)),k=(y+.5)/w;n.strokeStyle=k>=c&&k<=d?p:m,n.beginPath(),n.moveTo(h,g-b*(g-1)),n.lineTo(h,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=p;for(const y of[c,d,...Array.isArray(e.markers)?e.markers:[]]){const h=Math.round(be(y)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,s),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=H(t,"text"),n.fillRect(Math.round(be(e.position)*(a-1)),0,1,s)),w||(n.fillStyle=m,n.font=r,n.fillText(e.empty??"Empty",0,g+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){const u=be(e.level??0);n.fillStyle=H(t,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=H(t,"accent"),n.fillRect(0,s*.4,a*u,s*.2),t.dataset.ncAccent=n.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;n.fillStyle=H(t,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=H(t,"rhythm.playhead"),n.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),t.dataset.ncAccent=H(t,"accent")}const Gs={slop:8,longPressMs:500,pitchPx:16};class Cc{constructor(e,n,a=Gs){this.hit=e,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,n,a,s){if(this.phase!=="idle")return!1;const r=this.hit(n,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=n,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,n,a,s){if(e!==this.pointer)return;const r=n-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,n,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,n,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function Nc(t,e,n,a=Gs){let s=!1,r=0;const o=(c,d)=>{const m=t.ownerDocument.elementFromPoint?.(c,d),g=[...t.querySelectorAll(e)],w=m?g.findIndex(f=>f===m||f.contains(m)):-1;if(w>=0)return w;let y=-1,h=Number.POSITIVE_INFINITY;return g.forEach((f,b)=>{if(f.hidden)return;const k=f.getBoundingClientRect();if(d<k.top||d>k.bottom)return;const $=Math.abs(c-(k.left+k.width/2));$<h&&$<=k.width&&(y=b,h=$)}),y},l=new Cc(o,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),n(c)},a),u=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),t.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}const Ks="netcomposer.groups.v1";function ga(){try{return globalThis.localStorage??null}catch{return null}}function Ws(t=ga(),e=Ks){try{const n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(const[s,r]of Object.entries(n))typeof r=="boolean"&&a.set(s,r);return a}catch{return new Map}}function Fc(t,e,n,a=Ks){const s=Ws(t,a);s.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(s)))}catch{}}function zc(t,e=ga()){return Ws(e).get(t.id)??t.open===!0}function Pc(t,e,n){const a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;const s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${t.id}-group-toggle`;const r=document.createElement("span");r.className="nc-group-title";const o=document.createElement("span");o.className="nc-group-summary";const l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(r,o,l);const u=document.createElement("div");u.className="nc-group-body",u.id=`${t.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",u.id);for(const c of t.controls)u.append(n(c,e));return s.addEventListener("click",()=>{const c=a.dataset.ncOpen!=="true";Fc(ga(),t.id,c),mi(a,c);const d=e(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(s,u),mi(a,zc(t)),Vs(a,t),a}function mi(t,e){t.dataset.ncOpen=e?"true":"false";const n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");const s=n?.querySelector(".nc-group-mark");s&&(s.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function Vs(t,e){const n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);const a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=e.summary??"";a&&a.textContent!==s&&(a.textContent=s)}const Ic=450,Mt="application/x-nc-pad",gi="http://www.w3.org/2000/svg",Dc=48;function Rc(t){const e=Math.floor((t?.length??0)/2);if(!e)return"";const n=Math.min(Dc,e),a=[],s=[];for(let r=0;r<n;r++){const o=Math.floor(r*e/n),l=Math.max(o+1,Math.floor((r+1)*e/n));let u=0,c=0;for(let p=o;p<l;p++)u=Math.min(u,t[2*p]??0),c=Math.max(c,t[2*p+1]??0);const d=n===1?50:r/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),s.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function Oc(t,e){const n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((s,r)=>a.append(_c(n,r,e))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&Rt(n)}),Xs(n,t),n}function _c(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="nc-padgrid-pad-name";const o=document.createElement("span");o.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const u=document.createElementNS(gi,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");const c=document.createElementNS(gi,"path");return u.append(c),a.append(s,r,o,l,u),Hc(t,a,e,n),r.addEventListener("dblclick",()=>{const d=n(t);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Ys(t,a,e,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(Mt,String(e)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{const p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(Mt)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(Mt)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;const p=n(t);if(p?.type!=="padGrid")return;const m=d.dataTransfer?.getData(Mt);if(m!==void 0&&m!==""){d.preventDefault(),d.stopPropagation();const w=Number(m);w!==e&&p.onMove?.(w,e,d.altKey);return}const g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(e,g))}),a}function Bc(t,e,n){const a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Hc(t,e,n,a){let s=0,r=!1,o=0,l=0;const u=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;r=!1,o=c.clientX,l=c.clientY,u();const d=a(t);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,r=bi(t,e,n,a)},Ic)))}),e.addEventListener("pointermove",c=>{s&&Math.hypot(c.clientX-o,c.clientY-l)>8&&u()});for(const c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,u);e.addEventListener("contextmenu",c=>{c.preventDefault(),u(),r=bi(t,e,n,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}Bc(t,n,a)})}function bi(t,e,n,a){const s=a(t);if(s?.type!=="padGrid"||!s.menu)return!1;const r=s.menu(n);if(!r.length)return!1;Rt(t);const o=document.createElement("div");o.className="nc-slot-scrim",o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Rt(t)}),o.addEventListener("click",d=>d.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const d of r){const p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{Rt(t);const m=a(t);m?.type==="padGrid"&&(d.id==="rename"&&m.onRename?Ys(t,e,n,a):m.onMenu?.(n,d.id))}),l.append(p)}t.append(o,l);const u=t.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Ys(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(t);if(s?.type!=="padGrid")return;const r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=s.nameMax??24,r.value=s.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);const o=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-o.left}px`,r.style.top=`${l.top-o.top}px`,r.style.width=`${l.width}px`;let u=!1;const c=d=>{if(u)return;u=!0;const p=r.value.trim();r.remove(),e.focus();const m=a(t);d&&p&&m?.type==="padGrid"&&m.onRename?.(n,p)};r.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),r.addEventListener("blur",()=>c(!0));for(const d of["pointerdown","click","dblclick"])r.addEventListener(d,p=>p.stopPropagation());t.append(r),r.focus(),r.select()}function Rt(t){for(const e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Xs(t,e){const n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const r=n[s];if(!(r instanceof HTMLButtonElement))return;const o=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),u=r.querySelector(".nc-padgrid-pad-wave path"),c=r.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",o&&(o.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete r.dataset.empty,o&&(o.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",Rc(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;const d=e.selected===s;d?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",d?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function Y(){const t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function tn(t,e){const n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;const a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function yi(t,e){const n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function yt(t){if(!Number.isFinite(t))return"";const e=Math.round(t*100)/100;return String(e)}const qc=450,wi=8;function fe(){const t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function jc(t){const e=lo(t,"target-min");return e>0?e:44}function Uc(t){if(!(t instanceof HTMLElement))return;const e=[...t.querySelectorAll(".nc-hit")],n=jc(t),a=n/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){o.style.display="none";continue}const u=l.left+l.width/2,c=l.top+l.height/2;let d=u-a,p=u+a,m=c-a,g=c+a;for(let w=0;w<e.length;w++){if(r===w)continue;const y=s[w];if(!y||y.width===0)continue;const h=y.left+y.width/2,f=y.top+y.height/2;Math.abs(f-c)<a*2&&(h>u?p=Math.min(p,(u+h)/2):h<u&&(d=Math.max(d,(u+h)/2))),Math.abs(h-u)<a*2&&(f>c?g=Math.min(g,(c+f)/2):f<c&&(m=Math.max(m,(c+f)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),o.style.left=`${d-l.left}px`,o.style.top=`${m-l.top}px`,o.style.width=`${Math.max(0,p-d)}px`,o.style.height=`${Math.max(0,g-m)}px`,o.style.transform="none"}}function Js(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function vi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Je(t,e){switch(t.type){case"slider":return Gc(t,e);case"select":return Wc(t,e);case"toggle":return Vc(t,e);case"button":return Yc(t,e);case"readout":return Xc(t);case"label":return ed(t);case"note":return ki(t);case"knob":return ad(t,e);case"choice":return id(t,e);case"slotRow":return sd(t,e);case"stepGrid":return cd(t,e);case"canvas":return hd(t);case"fx":return yd(t,e);case"group":return Pc(t,e,Je);case"strip":return fd(t,e);case"stripAdd":return bd(t,e);case"padGrid":return Oc(t,e);case"moves":return Qc(t,e);default:return ki({id:"unknown",text:""})}}function ie(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){const n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Zs(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));const s=t.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??yt(e.value))}else if(e.type==="select"){const n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),yi(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){const n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")yi(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&wt(t,e.help);const n=t.querySelector(".nc-knob");n instanceof HTMLElement&&td(n,e);const a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??yt(e.value))}else if(e.type==="choice")er(t,e);else if(e.type==="slotRow")nr(t,e);else if(e.type==="stepGrid")jn(t,e);else if(e.type==="padGrid")Xs(t,e);else if(e.type==="moves")Qs(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){const n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&Us(n,e)}else if(e.type==="strip"){rr(t,e);for(const n of e.sends??[]){const a=t.querySelector(`[data-nc-id="${ct(n.id)}"]`);a instanceof Element&&ie(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")ir(t,e);else if(e.type==="group"){Vs(t,e);for(const n of e.controls){const a=t.querySelector(`[data-nc-id="${ct(n.id)}"]`);a instanceof Element&&ie(a,n)}}else if(e.type==="fx"){dr(t,e);for(const n of[...e.controls,...e.more??[]]){const a=t.querySelector(`[data-nc-id="${ct(n.id)}"]`);a instanceof Element&&ie(a,n)}}}}function Gc(t,e){const n=tn(t.id,t.label);n.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(Kc(t,a,e),s),n.append(Y()),ie(n,t),n}function Kc(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(fe());const s=r=>{const o=n(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function Wc(t,e){const n=tn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(const s of t.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=t.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),n.append(a,Y()),n}function Vc(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{const a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(Y()),ie(n,t),n}function Yc(t,e){const n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{const r=e(n);r?.type==="button"&&r.onPress()}),n.append(Y()),ie(n,t),!t.onSparkle)return n;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=t.id,s.setAttribute("aria-label","Surprise me"),s.title=t.sparkleTitle??"Surprise me",s.innerHTML=Js(),s.addEventListener("click",()=>{const r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&ar(r);const o=e(n);o?.type==="button"&&o.onSparkle?.()}),a.append(n,s),a}function Xc(t){const e=tn(t.id,t.label);return e.append(Y()),ie(e,t),e}const Jc=450;function Qc(t,e){const n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(const a of t.groups){const s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);const r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;const o=document.createElement("div");o.className="nc-moves-btns";for(const l of a.moves){const u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Zc(l.icon)),u.addEventListener("click",()=>{const c=e(n);c?.type==="moves"&&c.onMove(l.id)}),o.append(u)}s.append(r,o),n.append(s)}return Qs(n,t),n}function Qs(t,e){for(const n of e.groups)for(const a of n.moves){const s=t.querySelector(`[data-nc-move="${ct(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function Zc(t){const e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){const a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){const a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function ed(t){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(Y()),e}function ki(t){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(Y()),e}function xi(t){if(typeof t.valueText=="string")return t.valueText;const e=yt(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Zs(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function td(t,e){const n=e.max-e.min||1,a=(e.value-e.min)/n;Zs(t,e.modulated===!0);const s=Math.round(a*270);t.style.setProperty("--knob-turn",String(s)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(s,135))),t.style.setProperty("--knob-to",String(Math.max(s,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",xi(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${xi(e)}`}function nd(t,e){const n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,s=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-s:null}function ad(t,e){const n=tn(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",c=>{r=c.clientY;const d=e(a);o=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});const l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;const d=e(a);if(d?.type!=="knob")return;const p=d.max-d.min||1,m=Math.min(d.max,Math.max(d.min,o-(c.clientY-r)*p/120));d.onChange(m)}),a.addEventListener("dblclick",()=>{const c=e(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{const d=e(a);if(d?.type!=="knob")return;const p=nd(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});const u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(Y()),ie(n,t),n}function id(t,e){const n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(const a of t.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(n);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...n.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let u=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")u=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")u=(l-1+o.length)%o.length;else if(r.key==="Home")u=0;else if(r.key==="End")u=o.length-1;else return;const c=o[u];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(s)}return n.append(Y()),er(n,t),n}function er(t,e){for(const n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;const a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function sd(t,e){const n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<t.slots.length;d++){const p=t.slots[d],m=document.createElement("span");m.className="nc-snap-wrap";const g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=p.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,fe()),rd(m,g,n,d,e),a.append(m)}const s=t.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Js(),s.append(fe()),s.addEventListener("click",()=>{ar(n);const d=e(n);d?.type==="slotRow"&&d.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const d=e(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});const u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",r.append(o,u,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),n.append(c,r,Y()),tr(n,e),nr(n,t),n}function $i(t,e,n,a){const s=n(t);if(s?.type!=="slotRow")return;ot(t);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function rd(t,e,n,a,s){let r=0,o=0,l=0,u=!1,c=!1,d=!1,p=!1;const m=()=>{window.clearTimeout(r),r=0},g=f=>{const b=f.clientX-o,k=f.clientY-l;b*b+k*k>wi*wi&&(u=!0,m())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=f=>{const b=r!==0&&!u&&!c;m(),w(),b&&(d=!0,$i(n,a,s,f))},h=()=>{u=!0,m(),w()};t.addEventListener("pointerdown",f=>{f.button===0&&(w(),c=!1,u=!1,d=!1,o=f.clientX,l=f.clientY,m(),r=window.setTimeout(()=>{r=0,!u&&(c=!0,od(n,e,a,s))},qc),p=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),t.addEventListener("contextmenu",f=>f.preventDefault()),t.addEventListener("click",f=>{if(d||c||u){d=!1,c=!1,u=!1;return}$i(n,a,s,f)})}function tr(t,e){if(t.querySelector(".nc-slot-menu"))return;const n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");const a=Si("Save","store"),s=Si("Clear","clear");n.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),ot(t)}),r.addEventListener("click",o=>o.stopPropagation()),t.append(r,n),n.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const u=e(t);if(u?.type!=="slotRow")return;const c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),ot(t)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),ot(t))}),t.addEventListener("keydown",o=>{o.key==="Escape"&&ot(t)})}function Si(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function od(t,e,n,a){tr(t,a);const s=t.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);const o=t.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function ot(t){const e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function nr(t,e){for(const s of t.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));const a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function ar(t){const e=t.dataset.ncLastFill||null,n=lc(e);t.dataset.ncLastFill=n;const a=cc(n);if(a)for(const[s,r]of Object.entries(a))t.style.setProperty(s,r)}function ld(t,e){const n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");const o=e(t);o?.type==="stepGrid"&&o.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>s(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function cd(t,e){const n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=h=>{const f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=h,a.append(f),f},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=h=>{for(const f of[r,o]){const b=f===h;f.setAttribute("aria-checked",b?"true":"false"),f.tabIndex=b?0:-1}};l(r);for(const h of[r,o])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const f=o.getAttribute("aria-checked")==="true"?r:o;l(f),f.focus()});const u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),t.onFill&&u.append(ld(n,e)),t.onClear){const h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=t.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{const f=e(n);f?.type==="stepGrid"&&f.onClear?.()}),u.append(h)}n.append(u);for(const h of t.rows){const f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";const b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=h.label,b.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(b.dataset.ncLane=String((h.lane-1)%4+1));let k=!1,$=0;b.addEventListener("pointerdown",E=>{k=!1,!(E.pointerType==="mouse"||E.button!==0)&&($=window.setTimeout(()=>{const A=e(n);A?.type!=="stepGrid"||!A.selectedRows||(k=!0,A.onSelectRow?.(A.rows.findIndex(F=>F.id===h.id),!0))},Jc))});for(const E of["pointerup","pointercancel","pointerleave"])b.addEventListener(E,()=>window.clearTimeout($));b.addEventListener("contextmenu",E=>{k&&E.preventDefault()}),b.addEventListener("click",E=>{const A=e(n);if(A?.type!=="stepGrid")return;if(k){k=!1;return}const F=A.rows.findIndex(U=>U.id===h.id),B=!!A.selectedRows&&(E.shiftKey||E.metaKey||E.ctrlKey);A.onSelectRow?.(F,B)}),b.addEventListener("keydown",E=>dd(n,b,E));const x=[];for(const E of["mute","solo"]){if(!(E==="mute"?t.onMute:t.onSolo))continue;const F=document.createElement("span");F.className="nc-ms-wrap";const B=document.createElement("button");B.type="button",B.className="nc-ms",B.dataset.ncMs=E,B.textContent=E==="mute"?"M":"S",B.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${h.label}`),F.append(B,fe()),F.addEventListener("click",()=>{const U=e(n);if(U?.type!=="stepGrid")return;const X=U.rows.findIndex(N=>N.id===h.id);(E==="mute"?U.onMute:U.onSolo)?.(X)}),x.push(F)}const S=document.createElement("div");S.className="nc-steps";for(let E=0;E<h.steps.length;E++){const A=document.createElement("span");A.className="nc-step-wrap";const F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${h.id}:${E}`,F.setAttribute("aria-label",`${h.label} step ${E+1}`),A.append(F,fe()),A.addEventListener("click",B=>{const U=e(n);if(U?.type!=="stepGrid")return;const X=U.rows.findIndex(Fe=>Fe.id===h.id),N=o.getAttribute("aria-checked")==="true";U.onToggle(X,E,B.shiftKey||N)}),S.append(A)}if(t.onLength&&S.append(ud(n,S,h,e)),f.append(...x,b,S),t.onDice){const E=document.createElement("button");E.type="button",E.className="nc-sparkle nc-row-dice",E.dataset.ncDice=h.id,E.setAttribute("aria-label",`Re-roll ${h.label}`),E.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,E.innerHTML=vi(),E.append(fe()),E.addEventListener("click",()=>{const A=e(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(F=>F.id===h.id))}),f.append(E)}f.addEventListener("click",E=>{if(E.target!==f)return;const A=e(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(F=>F.id===h.id))}),Ei(n,S,".nc-step-wrap",e,o,()=>h.id),n.append(f)}const c=document.createElement("div");c.className="nc-pads-head";const d=(h,f,b)=>{const k=document.createElement("button");return k.type="button",k.className=h,k.textContent=f,b&&k.setAttribute("aria-label",b),k},p=d("nc-pads-step","‹","Previous lane"),m=d("nc-pads-step","›","Next lane"),g=document.createElement(t.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),t.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{const h=e(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",jn(n,h))}));for(const[h,f]of[[p,-1],[m,1]])h.addEventListener("click",()=>{const b=e(n);if(b?.type!=="stepGrid"||b.rows.length===0)return;const k=b.rows.length;b.onSelectRow?.(((Lt(b)+f)%k+k)%k)});if(c.append(p,g,m),t.onDice){const h=d("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=vi(),h.addEventListener("click",()=>{const f=e(n);if(f?.type!=="stepGrid")return;const b=Lt(f);b>=0&&f.onDice?.(b)}),c.append(h)}if(t.transport){const h=d("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const f=e(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),c.append(h)}n.append(c);const w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");const y=Math.max(0,...t.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){const f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(h),f.textContent=String(h+1),f.addEventListener("click",b=>{const k=e(n);if(k?.type!=="stepGrid")return;const $=Lt(k);if($<0)return;if(n.dataset.ncLenMode==="true"){k.onLength?.($,h+1);return}const x=o.getAttribute("aria-checked")==="true";k.onToggle($,h,b.shiftKey||x)}),w.append(f)}return Ei(n,w,".nc-pad",e,o,()=>{const h=e(n);return h?.type==="stepGrid"?h.rows[Lt(h)]?.id:void 0}),n.append(w),n.append(Y()),jn(n,t),n}function Lt(t){const e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Ei(t,e,n,a,s,r){let o="on",l=!0,u=-1;const c=(d,p)=>{const m=d.rows[u]?.steps[p];!m||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,o,l):!!m[o]!==l&&d.onToggle(u,p,o==="accent"))};Nc(e,n,d=>{const p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(d.kind!=="paint")return;const m=p.rows.findIndex(g=>g.id===r());m>=0&&p.rows[m].length!==d.pad+1&&p.onLength?.(m,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){const m=r();u=p.rows.findIndex(w=>w.id===m);const g=p.rows[u]?.steps[d.pad];if(!g)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[o]}c(p,d.pad)}else if(d.kind==="long"){const m=r(),g=p.rows.findIndex(y=>y.id===m),w=e.querySelectorAll(n)[d.pad];g>=0&&w instanceof HTMLElement&&p.onLongPress?.(g,d.pad,w)}}})}function dd(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;const a=[...t.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;n.key==="ArrowDown"?r=s+1:n.key==="ArrowUp"?r=s-1:n.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(n.preventDefault(),o.focus(),o.click())}function ud(t,e,n,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(fe());const r=c=>{const d=a(t);if(d?.type!=="stepGrid")return;const p=d.rows.findIndex(w=>w.id===n.id),m=d.rows[p];if(!m)return;const g=Math.max(1,Math.min(m.steps.length,c));g!==m.length&&d.onLength?.(p,g)},o=c=>{const d=[...e.querySelectorAll(".nc-step")];let p=1;return d.forEach((m,g)=>{const w=m.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(p=g+1)}),p},l=c=>r(o(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),s.addEventListener("keydown",c=>{const d=a(t);if(d?.type!=="stepGrid")return;const p=d.rows.find(g=>g.id===n.id);if(!p)return;const m={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in m&&(c.preventDefault(),r(m[c.key]))}),s}const yn=new WeakMap,Ct=new WeakMap;function pd(t){return t?(Ct.has(t)||(Ct.set(t,Hn(t)),_s(e=>{Ct.set(t,e);for(const n of t.querySelectorAll("[data-nc-velocity]"))qn(n,Number(n.getAttribute("data-nc-velocity")))},t)),Ct.get(t)):"light"}function qn(t,e){const n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:pd(t.ownerDocument),s=n===null?null:`${a} ${n}`;if(!(yn.has(t)&&yn.get(t)===s)){if(yn.set(t,s),n===null){for(const r of Object.keys(ui(1)))t.style.removeProperty(r);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(const[r,o]of Object.entries(ui(n,di[a]??di.light)))t.style.setProperty(r,o)}}function jn(t,e){const n=e.rows.some(d=>d.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=t.querySelector(".nc-pads"),r=e.rows.find(d=>d.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",l?"true":"false"),o.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));const u=t.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&r&&(u.setAttribute("aria-label",`Re-roll ${r.label}`),u.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);const c=t.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){const d=!!e.transport?.playing,p=e.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");const m=e.transport?.ariaLabel;m?c.setAttribute("aria-label",m):c.removeAttribute("aria-label")}if(s instanceof HTMLElement&&r){s.setAttribute("aria-label",`${r.label} steps`),r.lane&&(s.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?s.dataset.silent="true":delete s.dataset.silent;const d=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(const p of s.querySelectorAll("[data-nc-pad]")){const m=Number(p.getAttribute("data-nc-pad")),g=r.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!g||!l&&m>=r.length,l&&m>=r.length?p.dataset.out="true":delete p.dataset.out,l&&m===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${m+1}`),p.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?p.dataset.accent="true":delete p.dataset.accent,g?.dim?p.dataset.dim="true":delete p.dataset.dim,qn(p,g?.velocity),e.playhead>=0&&m===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(const d of e.rows){for(let w=0;w<d.steps.length;w++){const y=d.steps[w],h=t.querySelector(`[data-nc-step="${d.id}:${w}"]`);if(!(h instanceof HTMLButtonElement))continue;const f=h.closest(".nc-row");if(f instanceof HTMLElement){e.selectedRow===d.id?f.dataset.selected="true":delete f.dataset.selected;const $=e.selectedRow!==d.id&&(e.selectedRows??[]).includes(d.id);$?f.dataset.picked="true":delete f.dataset.picked;const x=f.querySelector(".nc-name");x instanceof HTMLElement&&(x.setAttribute("aria-pressed",e.selectedRow===d.id||$?"true":"false"),x.textContent!==d.label&&(x.textContent=d.label,x.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?f.dataset.silent="true":delete f.dataset.silent;for(const E of f.querySelectorAll("[data-nc-ms]")){const A=E.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;E.setAttribute("aria-pressed",A?"true":"false")}}h.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?h.dataset.accent="true":delete h.dataset.accent,y.dim?h.dataset.dim="true":delete h.dataset.dim,w%4===0?h.dataset.bar="true":delete h.dataset.bar,typeof y.velocity=="number"?(h.dataset.velocity="true",h.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete h.dataset.velocity,h.style.removeProperty("--level")),qn(h,y.velocity);const b=e.playhead>=0&&d.length>0?(e.playhead%d.length+d.length)%d.length:-1;w===b?h.dataset.playhead="true":delete h.dataset.playhead;const k=!!e.onLength&&e.selectedRow===d.id;h.hidden=w>=d.length&&!k,w>=d.length&&k?h.dataset.out="true":delete h.dataset.out}const p=t.querySelector(`[data-nc-len="${d.id}"]`),g=t.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&g&&g.nextElementSibling!==p){const w=document.activeElement===p;g.after(p),w&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function hd(t){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;const n=document.createElement("span");n.className="nc-label",n.textContent=t.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,Y()),e}function fd(t,e){const n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";const r=!t.master&&typeof t.onFold=="function";let o=null;if(r&&(n.dataset.ncFoldable="",o=lr(),o.dataset.ncStripHide="",o.addEventListener("click",()=>{const f=e(n);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==o&&o.focus())})),a.append(s),t.onRemove){const f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{const b=e(n);b?.type==="strip"&&b.onRemove?.(f)}),a.append(f)}const l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){const f=document.createElement("span");f.className="nc-hacks-wrap";const b=document.createElement("button");b.type="button",b.className="nc-hacks",b.dataset.ncHacks="",f.append(b,fe()),f.addEventListener("click",()=>{const k=e(n);k?.type==="strip"&&k.onHacks?.()}),l.append(f)}const u=document.createElement("div");u.className="nc-strip-ms";for(const f of["mute","solo"]){if(!(f==="mute"?t.onMute:t.onSolo))continue;const k=document.createElement("span");k.className="nc-ms-wrap";const $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=f,$.textContent=f==="mute"?"M":"S",k.append($,fe()),k.addEventListener("click",()=>{const x=e(n);x?.type==="strip"&&(f==="mute"?x.onMute:x.onSolo)?.()}),u.append(k)}const c=document.createElement("div");c.className="nc-strip-sends";for(const f of t.sends??[])c.append(Je({...f,type:"knob",compact:!0},e));const d=document.createElement("div");d.className="nc-strip-pan",t.pan&&d.append(Je(ba(t),e));const p=document.createElement("div");p.className="nc-strip-body";const m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(const f of t.ticks??[]){const b=document.createElement("span");b.className="nc-scale-tick",b.style.setProperty("--tick-pos",String(f.value)),b.textContent=f.label,m.append(b)}const g=kc({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:f=>{const b=e(n);b?.type==="strip"&&b.onChange(f)},onReset:()=>{const f=e(n);f?.type==="strip"&&Ti(f)}}),w=Tc({channels:t.channels===2?2:1,label:t.label,onClear:()=>{const f=e(n);f?.type==="strip"&&f.onClipClear?.()}});if(p.append(m,g.el,w.el),r){const f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");const b=document.createElement("span");b.className="nc-strip-fold-cap",b.setAttribute("aria-hidden","true");const k=document.createElement("span");k.className="nc-ui-fx-fold-name",k.dataset.ncStripFoldName="";const $=document.createElement("span");$.className="nc-strip-fold-pan",$.setAttribute("aria-hidden","true"),$.hidden=!t.pan,f.append(b,$,k),f.addEventListener("click",()=>{const x=e(n);if(x?.type!=="strip")return;x.onFold?.(!1);const S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),p.prepend(f)}const y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let h=0;return y.addEventListener("click",f=>{const b=e(n);b?.type!=="strip"||!b.onTypeIn||(window.clearTimeout(h),f.detail===0?Ai(n,y,e):f.detail===1&&(h=window.setTimeout(()=>Ai(n,y,e),gd)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(h);const f=e(n);f?.type==="strip"&&Ti(f)}),o&&n.append(o),n.append(a,l,u,c,d,p,y,Y()),rr(n,t),n}function ba(t){const e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??md(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function md(t){const e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}const gd=250;function Ai(t,e,n){const a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??yt(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const u=s.value;if(s.remove(),e.hidden=!1,l){const c=n(t);c?.type==="strip"&&c.onTypeIn?.(u)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function bd(t,e){const n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(n),u=o.value;sr(o),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,o,Y()),ir(n,t),n}function ir(t,e){const n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);const a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),sr(a))}function sr(t){const e=t.options[0];e&&(e.selected=!0)}function Ti(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function rr(t,e){const n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);const a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);const s=t.querySelector(".nc-fader"),r=s?xc(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),Mc(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=t.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const p=e.valueText??yt(e.value);o.textContent!==p&&(o.textContent=p),o.setAttribute("aria-label",`${e.label} level ${p}`);const m=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${m}`:m}for(const p of t.querySelectorAll("[data-nc-ms]")){const m=p.getAttribute("data-nc-ms"),g=m==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",g?"true":"false"),p.setAttribute("aria-label",`${m==="mute"?"Mute":"Solo"} ${e.label}`)}const l=t.querySelector("[data-nc-hacks]");if(l){const p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));const p=t.querySelector(`.nc-strip-pan [data-nc-id="${ct(e.pan.id)}"]`);p&&ie(p,ba(e))}const u=!e.master&&typeof e.onFold=="function"&&e.folded===!0;u?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const c=t.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(cr(c,u,e.label),wt(c,e.foldHelp));const d=t.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${e.label}`);const p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==e.label&&(p.textContent=e.label),wt(d,e.foldedHelp??e.foldHelp)}}function yd(t,e){const n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);const a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;const s=typeof t.onFold=="function";if(t.on===void 0&&!s)n.append(a);else{const r=document.createElement("div");if(r.className="nc-ui-fx-hd",r.append(a),t.on!==void 0){const o=Hs({checked:t.on,labelledBy:a.id,onChange:l=>{const u=e(o.el);u?.type==="fx"&&u.onToggle?.(l)}});o.el.dataset.ncFxSwitch="",r.append(o.el)}s&&r.append(vd(n,e)),n.append(r)}s&&n.prepend(kd(n,e));for(const r of t.controls)n.append(Je(r,e));if(t.more?.length){const r=document.createElement("details");r.className="nc-ui-more";const o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(const l of t.more)r.append(Je(l,e));n.append(r)}return n.append(Y()),dr(n,t),n}const wd=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function or(t){const e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),s=t.dataset.ncFolded==="true"&&e&&wd(e)?e:n;s instanceof HTMLElement&&document.activeElement!==s&&s.focus()}function vd(t,e){const n=lr();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{const a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),or(t))}),n}function lr(){const t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";const e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function cr(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function kd(t,e){const n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");const a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";const s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";const r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,s),n.addEventListener("click",()=>{const o=e(n);o?.type==="fx"&&(o.onFold?.(!1),or(t))}),n}function dr(t,e){const n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);const a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;const s=typeof e.onFold=="function"&&e.folded===!0;s?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const r=t.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(cr(r,s,e.title),wt(r,e.foldHelp));const o=t.querySelector(":scope > [data-nc-fx-fold]");if(o instanceof HTMLElement){const l=e.on===void 0?"":e.on?"On":"Off";o.hidden=!s,o.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),o.dataset.on=e.on===!0?"true":"false";const u=o.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");const c=o.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=e.title),wt(o,e.foldHelp)}}function wt(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function ct(t){return t.replace(/["\\]/g,"\\$&")}function xd(t,e){for(const n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&Us(n,a)}Uc(t)}const $d=ve["toast-duration"];function Sd({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function Ed(t,e,n,a){const s=l=>({top:l,bottom:l+n}),r=l=>t.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),o=s(e-a-n);return r(o)?r(s(a))?"bottom":"top":"bottom"}function ur(t,e,n,a,s,r){let o=t.bottom+s;const l=Math.max(r,Math.min(t.left,a-r-n.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(const d of e)d&&d.bottom>o&&d.top<o+n.height&&d.right>l&&d.left<l+n.width&&(o=d.bottom+s,u=!0)}return{top:o,left:l}}const Mi="data-nc-ui-toast-live";function Ad(t,e){let n=e.querySelector(`[${Mi}]`);return n||(n=t.createElement("div"),n.setAttribute(Mi,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function Td({message:t,actionLabel:e,onAction:n,duration:a=$d,onClose:s,avoid:r=[],anchor:o,host:l,document:u=globalThis.document}={}){l=l??u.body;const c=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");const p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=t,d.appendChild(p);let m=null;e&&(m=u.createElement("button"),m.type="button",m.className="nc-ui-toast-action",m.textContent=e,d.appendChild(m)),l.appendChild(d);let g="open";const w=Q=>Q&&typeof Q.getBoundingClientRect=="function"?Q.getBoundingClientRect():null,y=w(d),h=y?.height||44,f=c.getComputedStyle?.(d),b=Number.parseFloat(f?.getPropertyValue(O("toast-offset")))||16,k=Number.parseFloat(f?.getPropertyValue(O("toast-anchor-gap")))||8,$=w(o),x=c.innerHeight??0,S=r.map(w).filter(Boolean),E=$&&$.bottom>0&&$.top<x?ur($,S,{width:y?.width||0,height:h},c.innerWidth??0,k,b):null;E&&E.top+h<=x?(d.setAttribute("data-placement","anchor"),d.style.top=`${E.top+(c.scrollY??0)}px`,d.style.left=`${E.left+(c.scrollX??0)}px`):d.setAttribute("data-placement",Ed(S,x,h,b));const A=c.requestAnimationFrame?.bind(c)??(Q=>setTimeout(Q,16));A(()=>A(()=>{g==="open"&&d.setAttribute("data-state","open")})),Ad(u,l).textContent=Sd({message:t,actionLabel:e});let F,B;const U=new Promise(Q=>{B=Q}),X=Q=>{clearTimeout(F),F=setTimeout(()=>un("timeout"),Q)};let N=a,Fe=Date.now();const ze=()=>{g==="open"&&(clearTimeout(F),N=Math.max(0,N-(Date.now()-Fe)))},qa=()=>{g==="open"&&(Fe=Date.now(),X(N))};d.addEventListener("pointerenter",ze),d.addEventListener("pointerleave",qa),d.addEventListener("focusin",ze),d.addEventListener("focusout",qa),m?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{un("action")}}),Number.isFinite(a)&&X(a);function un(Q="close"){if(g!=="open")return;g="closing",clearTimeout(F),d.setAttribute("data-state","closing"),s?.(Q);const ja=c.getComputedStyle?.(d),ao=ja?Math.max(0,...String(ja.transitionDuration||"").split(",").map(Ga=>Number.parseFloat(Ga)*(Ga.trim().endsWith("ms")?1:1e3)||0)):0,Ua=()=>{g!=="gone"&&(g="gone",d.remove(),B(Q))};d.addEventListener("transitionend",Ua),setTimeout(Ua,ao+50)}return{el:d,close:un,closed:U}}function Li(t){return`${Math.round(Math.min(1,Math.max(0,Number(t)||0))*100)}%`}function Md({anchor:t,title:e,velocity:n,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const u=l.defaultView??globalThis,c={velocity:n,probability:a},d=l.createElement("div");d.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const m=l.createElement("div");m.className="nc-step-editor-head";const g=l.createElement("span");g.className="nc-label",g.textContent=e;const w=l.createElement("button");w.type="button",w.className="nc-step-editor-done",w.textContent="Done",m.append(g,w),p.appendChild(m);const y=[];for(const[$,x]of[["velocity","Velocity"],["probability","Chance"]]){const S=l.createElement("label");S.className="nc-step-editor-row";const E=l.createElement("span");E.className="nc-label",E.textContent=x;const A=l.createElement("input");A.type="range",A.className="nc-range",A.min=$==="velocity"?"0.05":"0",A.max="1",A.step="0.05",A.value=String(c[$]),A.setAttribute("data-nc-edit",$);const F=l.createElement("output");F.className="nc-readout",F.textContent=Li(c[$]),A.setAttribute("aria-valuetext",F.textContent),A.addEventListener("input",()=>{c[$]=Number(A.value),F.textContent=Li(c[$]),A.setAttribute("aria-valuetext",F.textContent),s({velocity:c.velocity,probability:c.probability})}),S.append(E,A,F),p.appendChild(S),y.push(A)}if(o.append(d,p),t?.setAttribute?.("data-editing","true"),u.matchMedia?.(`(max-width: ${Fs.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),d.setAttribute("data-placement","sheet");else{const $=t?.getBoundingClientRect?.(),x=p.getBoundingClientRect(),S=Number.parseFloat(u.getComputedStyle(p).getPropertyValue("row-gap"))||8;if($){let{top:E,left:A}=ur($,[],{width:x.width,height:x.height},u.innerWidth,S,S);E+x.height>u.innerHeight&&(E=Math.max(S,$.top-S-x.height)),p.style.top=`${E}px`,p.style.left=`${A}px`}p.setAttribute("data-placement","anchor")}y[0]?.focus({preventScroll:!0});let f=!0;const b=$=>{$.key==="Escape"&&($.preventDefault(),k())};function k(){f&&(f=!1,l.removeEventListener("keydown",b,!0),d.remove(),p.remove(),t?.removeAttribute?.("data-editing"),t?.isConnected&&typeof t.focus=="function"&&t.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",b,!0),d.addEventListener("pointerdown",$=>{$.preventDefault(),k()}),w.addEventListener("click",k),{el:p,close:k}}const dt="data-nc-help",Ld=350;function Cd(t,e,n,a=0,s=6,r=8){const o=t.top-s-e.height,l=o>=a+r?"above":"below",u=l==="above"?o:t.bottom+s,c=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(u),left:Math.round(c),side:l}}const wn=new WeakMap;function Nd(t){const e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function Fd({document:t=globalThis.document,delay:e=Ld}={}){if(!t)return{uninstall(){},hide(){}};const n=wn.get(t);if(n)return n;const a=t.defaultView;let s=null,r=null,o;const l=()=>{clearTimeout(o),r=null,s&&(s.hidden=!0)},u=m=>{const g=m.getAttribute(dt);if(!g)return;s||(s=t.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",t.body.appendChild(s)),s.textContent=g,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";const w=m.getBoundingClientRect(),y=Cd(w,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,Nd(t));s.style.top=`${y.top}px`,s.style.left=`${y.left}px`,s.dataset.side=y.side,s.style.visibility=""},c=m=>{if(m.pointerType==="touch")return;const g=m.target&&m.target.closest?m.target.closest(`[${dt}]`):null;g!==r&&(l(),g&&(r=g,o=setTimeout(()=>{r===g&&g.isConnected&&u(g)},e)))},d=m=>{m.key==="Escape"&&l()};t.addEventListener("pointerover",c),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);const p={hide:l,uninstall(){l(),t.removeEventListener("pointerover",c),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),s?.remove(),s=null,wn.delete(t)}};return wn.set(t,p),p}const ya="netcomposer.rhythm.hidden.v1",ye=new WeakMap;function vn(){try{return globalThis.localStorage??null}catch{return null}}function pr(t,e=ya){try{const n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Ci(t,e,n,a=ya){const s=pr(t,a);n?s.add(e):s.delete(e);try{t?.setItem(a,JSON.stringify([...s]))}catch{}}function wa(t){const e=[...t.controls??[],...(t.sections??[]).flatMap(s=>s.controls)],n=[],a=s=>{if(n.push(s),s.type==="group")for(const r of s.controls)a(r)};for(const s of e)a(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),s.pan&&n.push(ba(s)));return n}function zd(t,e){if(!(!t||!e))return wa(t).find(n=>n.id===e)}function Pd(t){return`${`${t.layout??""}:${(t.sections??[]).map(n=>`${n.id}${n.panel?":panel":""}${n.area?`@${n.area}`:""}`).join(",")}`}#${wa(t).map(n=>n.type==="stepGrid"?`stepGrid:${n.id}:${n.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${n.onMute?":m":""}${n.onSolo?":s":""}`:n.type==="moves"?`moves:${n.id}:${n.groups.map(a=>`${a.id}=${a.moves.map(s=>s.id).join("+")}`).join(",")}`:n.type==="padGrid"?`padGrid:${n.id}:${n.pads.length}:${n.columns??2}`:n.type==="slotRow"?`slotRow:${n.id}:${n.slots.length}${n.onSparkle?":spark":""}`:n.type==="button"?`button:${n.id}${n.onSparkle?":spark":""}`:n.type==="select"?`select:${n.id}:${n.options.map(a=>a.value).join(",")}`:n.type==="strip"?`strip:${n.id}:${n.channels??1}:${n.master?"master":""}:${n.onMute?"m":""}${n.onSolo?"s":""}${n.onRemove?"x":""}${n.onHacks?"h":""}${n.onFold?"f":""}${n.pan?`p=${n.pan.id}`:""}:${(n.sends??[]).map(a=>a.id).join(",")}:${(n.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:n.type==="group"?`group:${n.id}:${n.controls.map(a=>a.id).join(",")}`:n.type==="fx"?`fx:${n.id}:${n.depth}:${n.on===void 0?"":"sw"}${n.onFold?":fold":""}:${n.controls.map(a=>a.id).join(",")}/${(n.more??[]).map(a=>a.id).join(",")}`:`${n.type}:${n.id}`).join("|")}`}function Id(t,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}const n=document.createElement("div");n.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),t.append(n),hr(t,e)}function hr(t,e){if(!e.panel)return;const n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function Dd(t){const e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const n=ye.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return zd(n,a)}function Rd(t,e){const n=e.sections??[{id:"main",controls:e.controls??[]}],a=Pd(e);if(t.dataset.ncSignature===a){for(const s of n){const r=t.querySelector(`[data-nc-section="${Ni(s.id)}"]`);r&&hr(r,s);for(const o of s.controls){const l=t.querySelector(`[data-nc-id="${Ni(o.id)}"]`);l instanceof Element&&ie(l,o)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(const s of n){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),Id(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(Je(l,Dd));t.append(r)}}function Ni(t){return t.replace(/["\\]/g,"\\$&")}function va(t,e=ya){Bs();const n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");const a=pr(vn(),e).has(t.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";const c=Hs({labelledBy:r.id,onChange:f=>(ye.get(n)??t).onToggle?.(f)});c.el.dataset.ncModuleSwitch="",o.append(c.el,l,u);const d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",s.append(r,d,o);const p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;const m=document.createElement("button");m.type="button",m.className="nc-slim";const g=document.createElement("span");g.className="nc-slim-lines",m.append(g);const w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,s,p,m),n.setAttribute("aria-labelledby",r.id);const y=f=>{const b=ye.get(n)??t;n.dataset.ncOpen=f?"false":"true",p.hidden=f,m.hidden=!f,l.textContent=f?"+":"−",l.setAttribute("aria-expanded",f?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${f?"Show":"Hide"} ${b.title}`),l.title=f?"Show":"Hide",f?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{const f=n.dataset.ncOpen==="true";Ci(vn(),(ye.get(n)??t).id,f,e),y(f),Un(n.parentElement)}),m.addEventListener("click",()=>{Ci(vn(),(ye.get(n)??t).id,!1,e),y(!1),Un(n.parentElement)});const h={el:n,update(f){ye.set(n,f),f.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=f.title,d.textContent=f.status??"",f.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=f.summary??f.title,c.el.hidden=f.on===void 0,c.set(f.on===!0),f.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,m.setAttribute("aria-label",`Show ${f.title}`),Rd(p,f),y(p.hidden),h.redraw()},redraw(){const f=ye.get(n);f&&xd(n,wa(f))}};return ye.set(n,t),y(a),h.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>h.redraw()).observe(n),_s(()=>h.redraw(),n.ownerDocument),h}function Od(t,e,n="adjacent"){Bs(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();const a=n==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),t.append(s.el),s.redraw()}),Un(t)}function Un(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}const e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&s.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function fr(){return new Promise(t=>{if(typeof requestAnimationFrame!="function"){setTimeout(t,0);return}requestAnimationFrame(()=>setTimeout(t,0))})}function _d(t=200){return new Promise(e=>{const n=globalThis.requestIdleCallback;typeof n=="function"?n(()=>e(),{timeout:t}):setTimeout(e,0)})}function Bd(t,e={}){const n=new Set,a=(async()=>{await fr();for(const s of t)await _d(e.timeoutMs??200),s.build(),n.add(s)})();return{ready:s=>n.has(s),done:a,toJSON:()=>({built:n.size,total:t.length})}}function ka(){const t=globalThis.scheduler;return typeof t?.yield=="function"?t.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const n=new MessageChannel;n.port1.onmessage=()=>{n.port1.close(),e()},n.port2.postMessage(null)})}var Hd=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Gn=[.25,.5,.75,1,1.5,2],qd=4.9,R={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},xe={fmt:"wet"},ne={fmt:"pct"},Ie={fmt:"db"},Nt={fmt:"signedPct"},kn={fmt:"num",suffix:" ms"},D={div:100};function L(t,e,n,a,s,r,o,l){var u={key:t,label:e,min:n,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var c in l)u[c]=l[c];return u}function Ft(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var ut=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:R.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:R.hpQ},{dsp:{law:R.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:R.bpHz,astrid:!0},{dsp:{law:R.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:R.bpQ},{dsp:{law:R.bpQ}}),L("mix","Mix",0,100,100,3,xe,{dsp:D,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:Ft(Hd),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,ne,{dsp:D,unit:"%"}),L("mix","Wet/dry",0,100,0,3,xe,{dsp:D,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:R.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:Ft([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,ne,{dsp:D,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,Nt,{dsp:D,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,kn,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:D,unit:"%"}),L("decay","Decay",0,100,50,3,ne,{dsp:D,unit:"%"}),L("damping","Damping",0,100,0,4,ne,{dsp:D,unit:"%"}),L("mix","Mix",0,100,0,5,xe,{dsp:D,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),L("depth","Depth",0,100,70,2,ne,{dsp:D,unit:"%"}),L("feedback","Feedback",-90,90,50,3,Nt,{dsp:D,unit:"%"}),L("mix","Mix",0,100,50,4,xe,{dsp:D,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),L("depth","Depth",0,100,50,2,ne,{dsp:D,unit:"%"}),L("spread","Spread",0,100,70,3,ne,{dsp:D,unit:"%"}),L("mix","Mix",0,100,40,4,xe,{dsp:D,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:R.rate},{dsp:{law:R.rate}}),L("depth","Depth",0,100,70,2,ne,{dsp:D,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:Ft([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,ne,{dsp:D,unit:"%"}),L("mix","Mix",0,100,50,5,xe,{dsp:D,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,Ie,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,Ie,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:R.midHz,astrid:!0},{dsp:{law:R.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:R.eqQ},{dsp:{law:R.eqQ}}),L("high_db","High",-18,18,0,4,Ie,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,Ie,{unit:"dB"}),L("mix","Mix",0,100,100,3,xe,{dsp:D,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:Ft([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:R.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,Nt,{dsp:D,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,Nt,{dsp:D,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,Ie,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:R.ratio},{dsp:{law:R.ratio}}),L("attack_ms","Attack",1,100,10,3,kn,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,kn,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,Ie,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,ne,{dsp:D,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:D})]}],jd=ut.map(function(t){return t.type});ut.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Ud={reverb:"plate"};function xa(t){var e=Ud[t]||t;return jd.indexOf(e)>=0?e:null}function ge(t){for(var e=xa(t),n=0;n<ut.length;n++)if(ut[n].type===e)return ut[n];return null}function Ue(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function mr(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Ue(n.law,e);return a===null?0:a}function Fi(t,e){return Math.min(qd,t*60/(e>0?e:120))}var zi=function(t){return t>0?"+":t<0?"−":""};function Gd(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function gr(t,e,n){var a=t.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:zi(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return zi(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Ue(a.law,e),s===null?a.zero||"open":a.astrid?Gd(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"q":return"Q "+Ue(a.law,e).toFixed(1);case"ratio":return Ue(a.law,e).toFixed(1)+":1";case"rate":return s=Ue(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(Fi(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Fi(e,n)*1e3)+" ms"}return String(e)}var Kd=1,nn=["drive","delay","plate"];function Wd(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,s){return gr(t,a,s)},e}var pt=nn.map(function(t){var e=ge(t),n={type:t,label:e.label,dials:e.dials.map(Wd)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Vd={reverb:"plate"};function Kt(t){var e=Vd[t]||t;return nn.indexOf(e)>=0?e:null}function an(t){for(var e=Kt(t),n=0;n<pt.length;n++)if(pt[n].type===e)return pt[n];return null}function br(t,e){var n=an(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function Qe(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function ke(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,s=1;s<t.options.length;s++)Math.abs(t.options[s].value-e)<Math.abs(a-e)&&(a=t.options[s].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function Yd(){return{v:Kd,chain:pt.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function Xd(t){return Gn.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},Gn[0])}function xn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Jd(t){for(var e=Array.isArray(t)?t:xn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Yd(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(xn(l)){var u=Kt(l.type);if(!u){typeof l.type=="string"&&r.push(l.type);continue}if(s[u]){r.push(u);continue}s[u]=!0;var c=a.chain[nn.indexOf(u)],d=xn(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,an(u).dials.forEach(function(p){c.dials[p.key]=ke(p,d[p.key])}),Qd(u,c.dials,d)}}return{state:a,dropped:r}}function Qd(t,e,n){for(var a=an(t),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=ke(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],Qe(r,e)))}}function Kn(t){return Jd(t).state}function Zd(t){return JSON.parse(JSON.stringify(t))}var eu=24,Wn={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Vn(t,e,n){if(e==="bypass")return n?0:1;var a=br(t,e)||tu(t,e);return a?mr(a,n):0}function tu(t,e){var n=ge(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var nu={};pt.forEach(function(t){t.dials.forEach(function(e){nu[t.type+"."+e.key]=e.format})});function $n(t,e){var n=new Float64Array(eu),a=Kn(t);return a.chain.forEach(function(s){var r=Wn[s.type];n[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){n[r[o]]=Vn(s.type,o,s.dials[o])})}),n}var au=2,Wt=3,iu=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function at(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function yr(t,e){var n=ge(t);if(!n)return null;var a={};(e||[]).forEach(function(o){o&&o.id&&(a[o.id]=!0)});for(var s=1;a[n.type+"-"+s];)s++;var r={};return n.dials.forEach(function(o){r[o.key]=o.default}),{id:n.type+"-"+s,type:n.type,bypass:!1,dials:r}}function su(t){var e=ge(t.type),n=/-(\d+)$/.exec(t.id||"");return(e?e.label:t.type)+(n&&+n[1]>1?" "+n[1]:"")}function ru(t,e,n){var a=t.length-1,s=Math.max(0,Math.min(a,n));if(e<0||e>a||e===s)return t;var r=t.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function ou(t){return typeof t=="number"&&isFinite(t)?Xd(t):t}function Pi(t,e,n){var a={};return t.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),n&&t.type==="delay"&&s.key==="delay_beats"&&(r=ou(r)),a[s.key]=ke(s,r)}),t.dials.forEach(function(s){s.stepWhen&&(a[s.key]=ke(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],Qe(s,a)))}),a}function lu(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,s=1/0,r=t.min;r<=t.max;r++){var o=Ue(n.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var cu={rate:"rate_hz"};function du(t,e,n,a){var s={};return t.dials.forEach(function(r){if(!r.more){var o=r.astridKey||cu[r.key]||r.key;s[r.key]=lu(r,e[o])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function uu(t,e){var n=e>0?Math.floor(e):Wt,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(t)?(r=t,l=!0):at(t)&&Array.isArray(t.chain)&&(r=t.chain,o=t.v===1,l=t.schema===2);for(var u=[],c=0;c<r.length;c++){var d=r[c];if(at(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=xa(d.type),m=p&&ge(p);if(!m||o&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var g;at(d.params)&&!at(d.dials)?g=Pi(m,du(m,d.params,s,d.id||p),l):g=Pi(m,at(d.dials)?d.dials:{},l);var w=yr(p,u),y=typeof d.id=="string"&&iu.test(d.id)&&!u.some(function(f){return f.id===d.id})?d.id:w.id,h=o?d.bypass!==!1:d.bypass===!0;u.push({id:o?w.id:y,type:p,bypass:h,dials:g})}}return{state:{v:au,chain:u},dropped:a,notes:s}}function Ot(t,e){return uu(t,e).state}function De(t){var e=ge(t.type),n=[[0,t.bypass?0:1]];return e.dials.forEach(function(a){n.push([a.k,mr(a,t.dials[a.key])])}),n}function pu(t){var e=Ot(t,8),n=[],a=e.chain.map(function(s,r){var o=ge(s.type),l={};return r>=Wt&&n.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(u){var c=s.dials[u.key];if(u.more){c!==u.default&&n.push(s.id+"."+u.key);return}u.key==="delay_beats"&&Gn.indexOf(c)<0&&n.push(s.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var hu="nc-fx@1",fu=600,mu=256,gu=8,it=typeof WeakMap=="function"?new WeakMap:null;function bu(t,e){var n=it&&it.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await hs(async()=>{const{default:r}=await import("./worklet-source-Cg0XnXjY.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),it&&(it.set(t,n),n.catch(function(){it.delete(t)})),n)}function Re(t,e){return typeof t=="number"&&isFinite(t)?t:e}function wr(t,e,n,a){var s=Math.min(400,Math.max(20,Re(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",u=Re(e.preGain,1),c=Math.max(0,Re(e.crossfade,.012)),d=Re(e.maxDelaySeconds,void 0),p=t.createGain(),m=t.createGain(),g=t.createGain(),w=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),w.gain.value=0,p.connect(g),g.connect(m),w.connect(m);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s},f=n(s);h.post=function(x){h.node?h.node.port.postMessage(x):h.disposed||(r.length>=mu&&(r=a().concat([{t:"tempo",bpm:h.bpm,when:0}])),r.push(x))};function b(x){var S=r.map(function(E){var A=Object.assign({},E);return A.when>x||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return r=[],S}h.emit=function(x){for(var S=0;S<h.listeners.length;S++)try{h.listeners[S](x)}catch(E){typeof console<"u"&&console.error(E)}},h.whenOf=function(x){return typeof x=="number"&&isFinite(x)&&x>0?x:0};var k=!1;h.tooFar=function(x){return typeof x=="number"&&x>t.currentTime+fu?(!k&&typeof console<"u"&&(k=!0,console.warn("nc-fx: ignoring a time "+Math.round(x-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var $=bu(t,e.moduleUrl).then(function(){if(!h.disposed){var x=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:u,maxDelaySeconds:d},f);x.pending=b(t.currentTime),h.node=new AudioWorkletNode(t,hu,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:x}),p.connect(h.node),y&&y.connect(h.node,0,1),h.node.connect(w);var S=t.currentTime;S<=0||c===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,S),g.gain.linearRampToValueAtTime(0,S+c),w.gain.setValueAtTime(0,S),w.gain.linearRampToValueAtTime(1,S+c)),h.status="ready"}},function(x){h.status="unavailable",r=[],h.error=x});return h.core={input:p,output:m,modInput:y,ready:$,get status(){return h.status},get error(){return h.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:o,setTempo:function(x,S){var E=Re(x,NaN);!(E>0)||h.disposed||h.tooFar(S)||(h.bpm=Math.min(400,Math.max(20,E)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(S)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},clear:function(x){var S=x&&typeof x=="object"?x:{at:x};if(!(h.disposed||h.tooFar(S.at))){var E=Re(S.fadeMs,0);h.post({t:"clear",when:h.whenOf(S.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(x){return h.listeners.push(x),function(){var S=h.listeners.indexOf(x);S>=0&&h.listeners.splice(S,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",r=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,g,w,m,y].forEach(function(x){try{x&&x.disconnect()}catch{}})}}},h}function yu(t,e){var n=e||{};if(n.slots)return wu(t,n);var a=Kn(n.state),s=Array.from($n(a)),r=wr(t,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from($n(a)),when:0}]}),o=r.core;function l(u){return a.chain[nn.indexOf(u)]}return o.setParam=function(u,c,d,p){var m=Kt(u);if(!(!m||r.disposed||r.tooFar(p))){var g=l(m),w;if(c==="bypass")w=!!d;else{var y=br(m,c);if(!y)return;w=ke(y,d,Qe(y,g.dials))}return c==="bypass"?g.bypass=w:g.dials[c]=w,r.post({t:"p",i:Wn[m][c],v:Vn(m,c,w),when:r.whenOf(p)}),r.emit({effect:m,key:c,value:w}),an(m).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(k){return k.key===c}))){var f=g.dials[h.key],b=ke(h,f,Qe(h,g.dials));b!==f&&(g.dials[h.key]=b,r.post({t:"p",i:Wn[m][h.key],v:Vn(m,h.key,b),when:r.whenOf(p)}),r.emit({effect:m,key:h.key,value:b}))}}),w}},o.getParam=function(u,c){var d=Kt(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},o.getState=function(){return Zd(a)},o.setState=function(u,c){r.disposed||r.tooFar(c&&c.at)||(a=Kn(u),r.post({t:"load",program:Array.from($n(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},o}function wu(t,e){var n=e.slots===!0?Wt:Math.max(1,Math.min(gu,Math.floor(+e.slots)||Wt)),a=Ot(e.state,n),s=1,r={};function o(h){return r[h.id]||(r[h.id]=s++),r[h.id]}function l(h){return h.map(function(f){return{uid:o(f),type:f.type,program:De(f)}})}var u=l(a.chain),c=a.chain.map(function(h){return r[h.id]}),d=wr(t,e,function(){return{slots:n,chain:u,order:c}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(h){return r[h.id]}),when:0}]}),p=d.core;function m(h){var f;for(f=0;f<a.chain.length;f++)if(a.chain[f].id===h)return a.chain[f];var b=xa(h);if(b){for(f=0;f<a.chain.length;f++)if(a.chain[f].type===b)return a.chain[f]}return null}function g(h,f){var b=o(h);d.post({t:"add",uid:b,type:h.type,when:f}),De(h).forEach(function(k){d.post({t:"ps",uid:b,k:k[0],v:k[1],when:f,snap:!0})})}function w(h){d.post({t:"order",uids:a.chain.map(function(f){return r[f.id]}),when:h})}function y(h,f){var b={};a.chain.forEach(function(x){b[x.id]=x});var k=a.chain.map(function(x){return r[x.id]}).join();h.chain.forEach(function(x){var S=b[x.id];if(!S||S.type!==x.type){delete r[x.id],g(x,f);return}var E={};De(S).forEach(function(A){E[A[0]]=A[1]}),De(x).forEach(function(A){E[A[0]]!==A[1]&&d.post({t:"ps",uid:r[x.id],k:A[0],v:A[1],when:f})})});var $={};h.chain.forEach(function(x){$[x.id]=!0}),Object.keys(r).forEach(function(x){$[x]||delete r[x]}),a=h,a.chain.map(function(x){return r[x.id]}).join()!==k&&w(f)}return p.slots=n,p.setParam=function(h,f,b,k){var $=m(h);if(!(!$||d.disposed||d.tooFar(k))){var x=ge($.type),S,E=null;if(f==="bypass")S=!!b;else{for(var A=0;A<x.dials.length;A++)x.dials[A].key===f&&(E=x.dials[A]);if(!E)return;S=ke(E,b,Qe(E,$.dials))}var F={},B={};De($).forEach(function(N){F[N[0]]=N[1]}),x.dials.forEach(function(N){N.stepWhen&&(B[N.key]=$.dials[N.key])}),f==="bypass"?$.bypass=S:$.dials[f]=S,x.dials.forEach(function(N){N.stepWhen&&($.dials[N.key]=ke(N,$.dials[N.key],Qe(N,$.dials)))});var U=d.whenOf(k),X=r[$.id];return De($).forEach(function(N){(F[N[0]]!==N[1]||E&&N[0]===E.k)&&d.post({t:"ps",uid:X,k:N[0],v:N[1],when:U})}),d.emit({effect:$.id,key:f,value:S}),Object.keys(B).forEach(function(N){N!==f&&$.dials[N]!==B[N]&&d.emit({effect:$.id,key:N,value:$.dials[N]})}),S}},p.getParam=function(h,f){var b=m(h);if(b)return f==="bypass"?b.bypass:b.dials[f]},p.getState=function(){return JSON.parse(JSON.stringify(a))},p.setState=function(h,f){d.disposed||d.tooFar(f&&f.at)||(y(Ot(h,n),d.whenOf(f&&f.at)),d.emit({effect:null,key:null,value:null}))},p.addEffect=function(h,f){var b=f||{},k=yr(h,a.chain);if(!(!k||a.chain.length>=n||d.disposed||d.tooFar(b.at))){if(b.dials){var $=Ot({v:2,chain:[{id:k.id,type:k.type,dials:b.dials}]},1).chain[0];k.dials=$.dials}b.bypass===!0&&(k.bypass=!0);var x=a.chain.slice(),S=typeof b.index=="number"?Math.max(0,Math.min(x.length,b.index)):x.length;return x.splice(S,0,k),y({v:2,chain:x},d.whenOf(b.at)),d.emit({effect:k.id,key:"chain",value:"add"}),k.id}},p.removeEffect=function(h,f){var b=m(h),k=f&&f.at;return!b||d.disposed||d.tooFar(k)?!1:(y({v:2,chain:a.chain.filter(function($){return $!==b})},d.whenOf(k)),d.emit({effect:b.id,key:"chain",value:"remove"}),!0)},p.moveEffect=function(h,f,b){var k=m(h),$=b&&b.at;if(!k||d.disposed||d.tooFar($))return!1;var x=ru(a.chain,a.chain.indexOf(k),f);return x===a.chain?!1:(y({v:2,chain:x},d.whenOf($)),d.emit({effect:k.id,key:"chain",value:"move"}),!0)},p.getChain=function(){return a.chain.map(function(h){return{id:h.id,type:h.type,name:su(h),bypass:h.bypass}})},p.toAstrid=function(){return pu(a)},p}const vu="/rhythm/assets/worklet-CnpUVY5i.js",We="petra-rhythm.state",vr=3,kr=new Set([1,2,vr]),xr=400,ku=2e3;function xu(t){return JSON.stringify({v:vr,doc:{...t.doc,engine:Dn(t.doc.tracks)},bank:{...t.bank,slots:t.bank.slots.map(e=>e?{...e,engine:Dn(e.tracks)}:null)},selectedTrack:t.selectedTrack})}function $u(t,e,n){return!e||typeof e!="object"?null:uo(t,n?{...e,engine:void 0,deep:void 0}:e)}function $r(t){if(!t)return null;let e;try{e=JSON.parse(t)}catch{return null}if(!e||!kr.has(e.v))return null;const n=e.v===1,a=In(n&&e.doc&&typeof e.doc=="object"?{...e.doc,version:1}:e.doc);if(!a.ok||!a.document)return null;const s=a.document,r=e.bank;if(!r||!Array.isArray(r.slots)||r.slots.length!==pa)return null;const o=[];for(const p of r.slots){if(p===null){o.push(null);continue}const m=$u(s,p,n);if(!m)return null;o.push(m)}const l=Number.isInteger(r.active)&&o[r.active]?r.active:null,u=e.selectedTrack,c=e.doc.tracks??[],d=Number.isInteger(u)&&u>=0&&u<c.length?co(c,s.tracks,u):0;return{doc:s,bank:{slots:o,active:l},selectedTrack:d}}function Su(t,e,n=xr,a=We){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const u=xu(e());if(u===o)return;t.setItem(a,u),o=u}catch{}};return{schedule(){const u=Date.now();r||(r=u),clearTimeout(s),s=setTimeout(l,Math.min(n,Math.max(0,r+ku-u)))},flush:l}}function Eu(t,e,n=We){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=t.getItem(n)}catch{return null}if(!a||$r(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(!kr.has(s.v)||In(s.doc).errors[0]===pn||Array.isArray(s.bank?.slots)&&s.bank.slots.some(o=>o!==null&&typeof o=="object"&&In({...s?.doc,...o}).errors[0]===pn))?`Couldn't open your last session: ${pn}`:"Couldn't open your last session: it is malformed"}function Au(t,e,n=We){if(new URLSearchParams(e).has("fresh"))return null;try{return $r(t.getItem(n))}catch{return null}}const Sn={maker:"PETRA",instrument:"RHYTHM",number:"01"},Tu="PETRA Rhythm";let Ii=!1;function Mu(){return`
.petra-head-name {
  margin: 0;
  font-size: ${i("rhythm.brand-size")};
  font-weight: ${i("rhythm.brand-weight")};
  letter-spacing: ${i("rhythm.brand-tracking")};
}
.petra-head-sep { color: ${i("text-sub")}; }
.petra-head-num { font-family: ${i("font-readout")}; }
.petra-head-line {
  margin: ${i("rhythm.brand-sub-gap")} 0 0;
  font-size: ${i("rhythm.brand-sub-size")};
  color: ${i("text-sub")};
}
/* The ⋯ menu (Bass's header menu): Save, Load, New. Phone: a 44 px ⋯ that opens a small panel.
   Desktop: the buttons sit inline in the header and the ⋯ hides. */
/* The frame (gutters, padding, the divider under the header) is the kit's .nc-page-hd, as in ASTRID. */
/* The kit's title band isolates the header (nc-ui 6884367: position relative, isolation: isolate), so the ⋯ panel's
   z-index only counts inside it; lifting the header over the page body keeps the open panel above the modules. */
.petra-head { position: relative; z-index: 20; }
.petra-head-title { flex: 1 1 auto; min-width: 0; }
.petra-menu > summary {
  list-style: none;
  display: grid;
  place-items: center;
  min-width: ${i("target-min")};
  min-height: ${i("target-min")};
  color: ${i("text-sub")};
  cursor: pointer;
}
.petra-menu > summary::-webkit-details-marker { display: none; }
.petra-menu > summary svg { width: calc(${i("target-min")} / 2.75); height: calc(${i("target-min")} / 2.75); fill: currentColor; }
.petra-menu-body {
  position: absolute;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  padding: ${i("control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
}
.petra-menu-body button {
  min-height: ${i("target-min")};
  padding: 0 ${i("module-pad")};
  border: 0;
  background: transparent;
  color: ${i("text")};
  font-family: ${i("font-ui")};
  font-size: ${i("label-size")};
  font-weight: ${i("label-weight")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
}
.petra-menu-body button:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; }
@media (min-width: 1024px) {
  .petra-menu > summary { display: none; }
  .petra-menu-body { position: static; flex-direction: row; padding: 0; border: 0; background: transparent; }
  .petra-menu-body button { color: ${i("text-sub")}; padding: 0 ${i("module-gap")}; }
  /* The last word sits on the page gutter, as ASTRID's header does. */
  .petra-menu-body button:last-of-type { padding-inline-end: 0; }
  .petra-menu-body button:hover { color: ${i("text")}; }
}
`}function Lu(t){const e=t.ownerDocument;if(!Ii){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Mu(),e.head.append(c),Ii=!0}const n=e.createElement("header");n.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},r=e.createElement("span");r.className="petra-head-num",r.textContent=Sn.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=Sn.maker,a.append(o," ",s(),` ${Sn.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A TRIKI instrument.";const u=e.createElement("div");return u.className="petra-head-title",u.append(a,l),n.append(u),t.before(n),n}function Cu(t,e){const n=t.ownerDocument,a=n.createElement("details");a.className="petra-menu";const s=n.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=n.createElement("div");r.className="petra-menu-body";const o=n.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const d=o.files?.[0];o.value="",d&&e.load(await d.text(),d.name)});const l=(d,p)=>{const m=n.createElement("button");return m.type="button",m.textContent=d,m.dataset.petraMenu=d.toLowerCase(),m.addEventListener("click",()=>{p(),u||(a.open=!1)}),m};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),t.append(a);let u=null;const c=()=>{const d=getComputedStyle(s).display==="none";d!==u&&(a.open=d),u=d};return window.addEventListener("resize",c),c(),a}const Di=t=>`${Math.round(t*100)}%`;function Ri(t,e){if(t==="tune"){const n=Math.round(e*10)/10;return n===0?"0 st":`${n>0?"+":"−"}${Math.abs(n)} st`}if(t==="noise"){const n=Math.round(e*100)/100;return n===0?"0 oct":`${n>0?"brighter":"darker"} ${Math.abs(n).toFixed(2)} oct`}if(t==="level"){if(e<=.001)return"off";const n=20*Math.log10(e),a=Math.round(n*10)/10;return a===0?"0 dB":`${a>0?"+":"−"}${Math.abs(a).toFixed(1)} dB`}return t==="drive"&&e<=0?"clean":Di(e)}const Nu={tune:"Tune",decay:"Decay",body:"Body",snap:"Snap",noise:"Noise",sizzle:"Sizzle",drive:"Drive",level:"Level"};function zt(t,e){return Math.abs(t-e)<.5?"off":t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}const _t=8,ht=72,$a=240,Sa=.03,Fu=4,Sr=$a/Math.log1p(Fu/Sa),Yn=t=>t>0?Math.log1p(t/Sa)*Sr:0,zu=t=>Sa*Math.expm1(t/Sr),$e=(t,e,n)=>t<0?0:t<e?t/e:Math.exp(-(t-e)/n);function Pu(t,e,n=96){const a=e.decay,s=t.len*(a>1?a:1),r=[];let o=0;for(let l=0;l<=n;l++){const u=zu(l/n*$a);let c=0;const d=t.body;if(d){const g=d.a??5e-4,w=u<g?u/g:(1-(d.mix??0))*Math.exp(-(u-g)/(d.d1*a))+(d.mix??0)*Math.exp(-(u-g)/((d.d2??d.d1)*a));c+=w*d.lvl*e.body,d.second&&(c+=$e(u,5e-4,d.second.d*a)*d.second.lvl*e.body)}t.click&&(c+=$e(u,2e-4,t.click.d)*t.click.lvl*e.snap*.5),t.noise&&(c+=$e(u,t.noise.a??5e-4,t.noise.d*a)*t.noise.lvl*.5),t.noise2&&(c+=$e(u,t.noise2.a??5e-4,t.noise2.d*a)*t.noise2.lvl*e.sizzle*.5),t.metal&&(c+=$e(u,3e-4,t.metal.d*a)*t.metal.lvl*e.sizzle*.33);const p=t.clap;if(p){let g=0;for(let w=0;w<p.bursts;w++)g+=$e(u-w*p.gap,3e-4,p.bd)*(w===p.bursts-1?1:.8)*e.snap;g+=$e(u-p.bursts*p.gap,.002,p.tail*a)*.6,c+=g*p.lvl*.5}const m=s-u;m<=0?c=0:m<.08&&(c*=m/.08),r.push([u,c]),c>o&&(o=c)}if(o>0)for(const l of r)l[1]/=o;return r}const Iu="http://www.w3.org/2000/svg";function Oe(t,e={}){const n=document.createElementNS(Iu,t);for(const[a,s]of Object.entries(e))n.setAttribute(a,s);return n}const Du=t=>Math.round((ht-Math.max(0,Math.min(1,t))*(ht-_t))*100)/100;function Ru(t){return t.map(([e,n],a)=>`${a?"L":"M"}${Math.round(Yn(e)*100)/100},${Du(n)}`).join(" ")}const Ou=[[.01,"10 ms"],[.1,"100 ms"],[1,"1 s"]],_u=t=>t<1?`${Math.round(t*1e3)} ms`:`${Number(t.toFixed(1))} s`;function Bu(t){const e=document.createElement("div");e.className="petra-deep-env",e.dataset.petraDeep="envelope";const n=Oe("svg",{viewBox:"-1 0 242 88",preserveAspectRatio:"none",role:"button",tabindex:"0","data-testid":"deep-envelope"}),a="non-scaling-stroke",s=c=>Oe("line",{class:"petra-deep-grid",x1:"0",x2:String($a),y1:String(c),y2:String(c),"vector-effect":a}),r=Ou.map(([c,d])=>{const p=String(Math.round(Yn(c)*100)/100),m=Oe("line",{class:"petra-deep-guide",x1:p,x2:p,y1:String(_t),y2:String(ht),"vector-effect":a}),g=Oe("text",{class:"petra-deep-label",x:p,y:"86","text-anchor":"middle"});return g.textContent=d,[m,g]}),o=Oe("line",{class:"petra-deep-end",y1:String(_t),y2:String(ht),"vector-effect":a}),l=Oe("path",{class:"petra-deep-curve",fill:"none","stroke-linejoin":"round","vector-effect":a});n.append(s(_t),s(ht),...r.flat(),o,l),e.append(n),n.addEventListener("click",t),n.addEventListener("keydown",c=>{c.key!=="Enter"&&c.key!==" "||(c.preventDefault(),t())});let u="";return{el:e,set(c,d,p){const m=Pu(c,d),g=Ru(m),w=c.len*(d.decay>1?d.decay:1);let y=w;for(const[b,k]of m)b>.001&&k>.0316&&(y=b);y=Math.min(y,w);const h=`${g}|${p}`;if(h===u)return;u=h,l.setAttribute("d",g);const f=String(Math.round(Yn(y)*100)/100);o.setAttribute("x1",f),o.setAttribute("x2",f),n.setAttribute("aria-label",`${p}'s loudness over time: heard for about ${_u(y)}. Click to hear it.`)}}}const z=(t,e,n)=>{const a=document.createElement(t);return a.className=e,n!==void 0&&(a.textContent=n),a};function Oi(t,e,n,a,s){const r=z("form","petra-kit-form");r.noValidate=!0;const o=z("input","petra-kit-input");o.type="text",o.value=t,o.maxLength=po,o.setAttribute("aria-label",e),o.autocomplete="off",o.spellcheck=!1;const l=z("button","petra-kit-act","Save");l.type="submit",l.dataset.petraHelp="kit-save-ok";const u=z("button","petra-kit-act","Cancel");u.type="button",u.dataset.petraHelp="kit-save-cancel";const c=()=>{const d=o.value.trim();l.disabled=d.length===0,l.textContent=d&&s(d)?e==="Kit name"?"Replace":"Taken":"Save",e!=="Kit name"&&d&&s(d)&&(l.disabled=!0)};return o.addEventListener("input",c),o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Escape"&&(d.preventDefault(),a())}),r.addEventListener("submit",d=>{d.preventDefault();const p=o.value.trim();p&&n(p)}),u.addEventListener("click",a),r.append(o,l,u),c(),queueMicrotask(()=>{o.focus(),o.select()}),r}function Hu(t){const e=z("div","nc-field petra-kit-field");e.dataset.petraDeep="kit";const n=z("span","nc-label","Kit");n.dataset.petraHelp="kit";const a=z("div","petra-kit"),s=z("div","petra-kit-row"),r=z("button","petra-kit-name");r.type="button",r.dataset.testid="deep-kit-name",r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false");const o=z("span","petra-kit-label"),l=z("span","petra-kit-caret","▾");l.setAttribute("aria-hidden","true"),r.append(o,l);const u=z("output","petra-kit-line");u.setAttribute("aria-live","polite");const c=z("div","petra-kit-menu");c.setAttribute("role","menu"),c.setAttribute("aria-label","Kits"),c.hidden=!0;const d=(b,k,$,x)=>{const S=z("button","petra-kit-step",k);return S.type="button",S.dataset.petraHelp=x,S.setAttribute("aria-label",$),S.addEventListener("click",()=>{h(),t.step(b)}),S};s.append(d(-1,"‹","Previous kit","kit-prev"),r,d(1,"›","Next kit","kit-next")),a.append(s,u,c),e.append(n,a);let p=null,m=null;const g=(b,k,$)=>{const x=z("div","petra-kit-item");$&&(x.dataset.saved="");const S=z("button","petra-kit-choice");S.type="button",S.setAttribute("role","menuitemradio"),S.setAttribute("aria-checked",String(b.mark==="current")),S.dataset.kit=b.id;const E=z("span","petra-kit-dot");E.setAttribute("aria-hidden","true"),b.mark&&(E.dataset.mark=b.mark);const A=z("span","petra-kit-item-name",b.name),F=z("span","petra-kit-item-line",b.line),B=z("span","petra-kit-item-count",b.count??"");if(S.append(E,A,F,B),S.addEventListener("click",()=>{h(),k()}),x.append(S),!$)return x;if(m===b.id){const Fe=Oi(b.name,`Rename ${b.name}`,ze=>(m=null,t.rename(b.id,ze)?!0:(m=b.id,!1)),()=>{m=null,w(),S.focus()},ze=>t.taken(ze,b.id));return x.append(Fe),x}const U=z("span","petra-kit-tools"),X=z("button","petra-kit-act","Rename");X.type="button",X.dataset.petraHelp="kit-rename",X.setAttribute("aria-label",`Rename ${b.name}`),X.addEventListener("click",()=>{m=b.id,w()});const N=z("button","petra-kit-act","Delete");return N.type="button",N.dataset.petraHelp="kit-delete",N.setAttribute("aria-label",`Delete ${b.name}`),N.addEventListener("click",()=>{h(),t.remove(b.id)}),U.append(X,N),x.append(U),x};function w(){if(!p)return;const b=p;c.replaceChildren();for(const $ of b.kits)c.append(g($,()=>t.pick($.id),!1));if(b.saved.length){const $=z("div","petra-kit-head","Your kits");$.setAttribute("role","presentation"),c.append($);for(const x of b.saved)c.append(g(x,()=>t.pickSaved(x.id),!0))}const k=z("div","petra-kit-foot");if(m==="")k.append(Oi(b.suggest,"Kit name",$=>(m=null,t.save($)?(h(),!0):(m="",!1)),()=>{m=null,w()},$=>t.taken($)));else if(k.append(z("span","petra-kit-foot-text",b.mixed?"Mixed: drums use different kits. A choice sets every drum.":"Sets every drum to this kit")),b.mixed){const $=z("button","petra-kit-act petra-kit-save","Save as kit…");$.type="button",$.dataset.petraHelp="kit-save",$.addEventListener("click",()=>{m="",w()}),k.append($)}c.append(k)}function y(){m=null,w(),c.hidden=!1,r.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",f,!0),(c.querySelector('[aria-checked="true"]')??c.querySelector(".petra-kit-choice"))?.closest("button")?.focus()}function h(){c.hidden||(c.hidden=!0,m=null,r.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",f,!0))}function f(b){a.contains(b.target)||h()}return r.addEventListener("click",()=>c.hidden?y():h()),a.addEventListener("keydown",b=>{if(c.hidden)return;if(b.key==="Escape"){b.preventDefault(),h(),r.focus();return}if(b.key!=="ArrowDown"&&b.key!=="ArrowUp")return;const k=Array.from(c.querySelectorAll(".petra-kit-choice")),$=k.indexOf(document.activeElement),x=k[($+(b.key==="ArrowDown"?1:-1)+k.length)%k.length];x&&(b.preventDefault(),x.focus())}),{el:e,set(b){const k=p;p=b,o.textContent=b.label,r.dataset.mixed=String(b.mixed),r.setAttribute("aria-label",`Kit: ${b.label}. Open the kits`),u.textContent=b.line,!c.hidden&&m===null&&JSON.stringify(k)!==JSON.stringify(b)&&w()},close:h}}function qu(t,e,n){const a=z("div","nc-field petra-source");a.dataset.petraDeep="source";const s=z("span","nc-label","Source");s.dataset.petraHelp="drum-source";const r=z("div","nc-choice-row petra-source-tabs");r.setAttribute("role","tablist"),r.setAttribute("aria-label","Source"),r.dataset.petraHelp="source";const o=e.map(p=>{const m=z("button","nc-choice",n(p));return m.type="button",m.setAttribute("role","tab"),m.dataset.source=p,m.addEventListener("click",()=>t(p)),m});r.append(...o),r.addEventListener("keydown",p=>{if(p.key!=="ArrowRight"&&p.key!=="ArrowLeft")return;const m=o.indexOf(document.activeElement);if(m<0)return;p.preventDefault();const g=o[(m+(p.key==="ArrowRight"?1:-1)+o.length)%o.length];g?.focus(),g?.click()});const l=z("div","petra-source-note"),u=z("span","petra-source-text"),c=z("button","petra-kit-act petra-use-kit","Use kit");c.type="button",c.dataset.petraHelp="use-kit",l.append(u,c),a.append(s,r,l);let d="classic";return c.addEventListener("click",()=>t(d)),{el:a,set(p){d=p.base;for(const g of o){const w=g.dataset.source===p.source;g.setAttribute("aria-selected",String(w)),g.tabIndex=w?0:-1}const m=p.source!==p.base;u.textContent=m?`Kit is ${p.baseName} · ${p.drum} plays ${n(p.source)}`:`Follows the kit · ${p.baseName}`,c.hidden=!m}}}const Er=680;let _i=null,Ar=[];function ju(t){_i===t||typeof ResizeObserver>"u"||(_i=t,new ResizeObserver(()=>{t.getBoundingClientRect().width>=Er!==t.hasAttribute("data-petra-wide")&&Tr(t,Ar)}).observe(t))}function Tr(t,e){Ar=e;let n=!1;t instanceof Element&&(ju(t),n=t.getBoundingClientRect().width>=Er,t.toggleAttribute("data-petra-wide",n));const a=Array.from(t.querySelectorAll(".nc-row[data-nc-row]"));for(const s of a){const r=s.querySelector(":scope > .nc-name"),o=s.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??s.querySelector("[data-nc-len]")?.getAttribute("data-nc-len"),l=e.find(c=>c.id===o);let u=s.querySelector(":scope > .petra-src");if(!r||!l||!(n||l.differs)){u?.remove();continue}u||(u=z("span","petra-src"),u.setAttribute("aria-hidden","true")),r.nextElementSibling!==u&&r.after(u),u.textContent=l.tag,u.toggleAttribute("data-differs",l.differs),u.style.left=`${r.offsetLeft}px`}}function ft(t,e,n){const a=t.querySelector(`[data-nc-id="${e}"]`);return a?(a.nextElementSibling!==n&&a.after(n),!0):(n.remove(),!1)}let Bi=!1;function Uu(){return`
:root { --petra-deep-curve: ${i("text")}; }
.petra-kit-row {
  display: flex;
  align-items: center;
  gap: ${i("control-gap")};
  max-width: calc(${i("slot-span")} * 5);
  margin-inline: auto;
}
.petra-kit-step {
  flex: none;
  inline-size: calc(${i("target-min")} * 0.75);
  block-size: calc(${i("target-min")} * 0.75);
  padding: 0;
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: ${i("body-size")};
  line-height: 1;
  cursor: pointer;
}
.petra-kit-step:hover { border-color: ${i("text-sub")}; }
.petra-kit-step:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
@media (pointer: coarse) {
  .petra-kit-step { inline-size: ${i("target-min")}; block-size: ${i("target-min")}; }
}
.petra-kit { position: relative; min-width: 0; }
.petra-kit-name {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: ${i("control-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: ${i("tab-size")};
  font-weight: ${i("label-weight")};
  cursor: pointer;
}
.petra-kit-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.petra-kit-caret { flex: none; font-size: calc(${i("readout-size-small")} * 0.8); color: ${i("text-sub")}; }
.petra-kit-name:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.petra-kit-line {
  display: block;
  margin-top: ${i("control-gap")};
  text-align: center;
  font: ${i("readout-size-small")} ${i("font-readout")};
  color: ${i("text-sub")};
}
/* The kits' menu: a raised sheet under the picker, the slots' small radius. */
.petra-kit-menu {
  position: absolute;
  z-index: 20;
  inset-inline: 0;
  top: calc(100% + ${i("module-gap")});
  max-height: 70vh;
  overflow-y: auto;
  padding-block: ${i("control-gap")};
  background: ${i("surface-page")};
  border: ${i("hairline")} solid ${i("divider")};
  border-radius: ${i("slot-radius")};
  box-shadow: 0 calc(${i("module-gap")} * 0.75) calc(${i("module-gap")} * 2.25) color-mix(in srgb, ${i("text")} 10%, transparent);
  text-align: start;
}
.petra-kit-menu[hidden] { display: none; }
.petra-kit-item { display: flex; align-items: center; min-width: 0; }
.petra-kit-item:has(:focus-visible) { background: ${i("accent-soft")}; }
@media (hover: hover) { .petra-kit-item:hover { background: ${i("accent-soft")}; } }
.petra-kit-choice {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: calc(${i("control-gap")} * 3.5) calc(${i("name-width")} * 1.35) minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${i("module-gap")};
  padding: calc(${i("module-gap")} * 1.1) calc(${i("module-gap")} * 1.75) calc(${i("module-gap")} * 1.1) calc(${i("module-gap")} * 1.25);
  border: 0;
  background: transparent;
  color: ${i("text")};
  font: ${i("body-size")} ${i("font-ui")};
  text-align: start;
  cursor: pointer;
}
.petra-kit-choice:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: calc(-1 * ${i("focus-width")}); }
.petra-kit-item-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* A saved kit's name is the player's own: it takes the room it needs (up to half the row) before its line. */
.petra-kit-item[data-saved] > .petra-kit-choice { grid-template-columns: calc(${i("control-gap")} * 3.5) fit-content(50%) minmax(0, 1fr); }
.petra-kit-item[data-saved] .petra-kit-item-count { display: none; }
.petra-kit-item-line, .petra-kit-item-count, .petra-kit-foot, .petra-kit-head, .petra-source-note {
  font: ${i("readout-size-small")} ${i("font-readout")};
  color: ${i("text-sub")};
}
.petra-kit-item-line { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.petra-kit-item-count { white-space: nowrap; }
/* The only circles: the current kit's dot, and a ring for a kit some drums play while Mixed. */
.petra-kit-dot { justify-self: center; align-self: center; inline-size: calc(${i("control-gap")} * 1.5); block-size: calc(${i("control-gap")} * 1.5); border-radius: 50%; }
.petra-kit-dot[data-mark="current"] { background: ${i("accent")}; }
.petra-kit-dot[data-mark="used"] { box-shadow: inset 0 0 0 ${i("hairline")} ${i("text-sub")}; }
.petra-kit-head {
  margin-top: ${i("control-gap")};
  padding: ${i("module-gap")} calc(${i("module-gap")} * 1.75) ${i("control-gap")} calc(${i("module-gap")} * 1.25 + ${i("control-gap")} * 3.5 + ${i("module-gap")});
  border-top: ${i("hairline")} solid ${i("divider")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  font-size: ${i("label-size")};
}
.petra-kit-tools { flex: none; display: flex; gap: ${i("header-gap")}; padding-inline-end: calc(${i("module-gap")} * 1.75); }
.petra-kit-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${i("module-gap")};
  margin-top: ${i("control-gap")};
  padding: ${i("module-gap")} calc(${i("module-gap")} * 1.75) calc(${i("module-gap")} * 0.75) calc(${i("module-gap")} * 1.25 + ${i("control-gap")} * 3.5 + ${i("module-gap")});
  border-top: ${i("hairline")} solid ${i("divider")};
}
.petra-kit-foot-text { flex: 1 1 auto; min-width: 0; }
.petra-kit-foot:has(> .petra-kit-form) { padding-inline-start: calc(${i("module-gap")} * 1.25); }
/* Quiet text actions (Save as kit, Rename, Delete, Use kit): ASTRID's small capitals, no box. */
.petra-kit-act {
  flex: none;
  padding: ${i("control-gap")} 0;
  border: 0;
  background: transparent;
  color: ${i("text-sub")};
  font: ${i("label-size")} ${i("font-ui")};
  letter-spacing: ${i("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
}
.petra-kit-act:hover:not(:disabled) { color: ${i("text")}; }
.petra-kit-act:disabled { opacity: 0.45; cursor: default; }
.petra-kit-act:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
.petra-kit-act[hidden] { display: none; }
@media (pointer: coarse) {
  .petra-kit-act { min-height: ${i("target-min")}; }
}
/* The name field: a plain rectangle with the small radius. */
.petra-kit-form { flex: 1 1 100%; display: flex; align-items: center; gap: ${i("header-gap")}; min-width: 0; }
.petra-kit-item > .petra-kit-form { padding: ${i("control-gap")} calc(${i("module-gap")} * 1.75) ${i("control-gap")} calc(${i("module-gap")} * 1.25 + ${i("control-gap")} * 3.5 + ${i("module-gap")}); }
.petra-kit-item:has(> .petra-kit-form) > .petra-kit-choice { display: none; }
.petra-kit-input {
  flex: 1 1 auto;
  min-width: 0;
  padding: ${i("control-gap")} ${i("module-gap")};
  border: ${i("hairline")} solid ${i("text-sub")};
  border-radius: ${i("slot-radius")};
  background: transparent;
  color: ${i("text")};
  font: ${i("body-size")} ${i("font-ui")};
}
.petra-kit-input:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("hairline")}; }
/* A drum's Source: the label, the tabs, and the line with Use kit. */
.petra-source { display: flex; flex-direction: column; align-items: stretch; gap: ${i("module-gap")}; min-width: 0; }
.petra-source > .nc-label { align-self: flex-start; }
.petra-source-note { display: flex; align-items: baseline; justify-content: space-between; gap: ${i("header-gap")}; min-height: calc(${i("readout-size-small")} * 1.6); }
.petra-source-text { min-width: 0; }
/*
 * Lane tags. Where the grid has room (data-petra-wide on the Pattern module: laneTags) every lane has its source after its name, the quiet grey unless
 * the drum differs from the kit. Narrower (phones, tablets, laptops, most Studio frames) the step cells keep their
 * size: only a drum that differs gets a small tag under its name, inside the row gap, so the rows keep their height
 * and a kit where every drum matches shows none.
 */
.nc-row[data-nc-row] { position: relative; }
.petra-src {
  position: absolute;
  top: calc(50% + ${i("readout-size-small")} * 0.55);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: calc(${i("readout-size-small")} * 0.73) / 1 ${i("font-readout")};
  color: ${i("text")};
  pointer-events: none;
}
.petra-src:not([data-differs]) { display: none; }
[data-petra-wide] .petra-src {
  position: static;
  flex: none;
  inline-size: calc(${i("name-width")} * 1.05);
  margin-inline-start: calc(-1 * ${i("control-gap")});
  font-size: calc(${i("readout-size-small")} * 0.9);
  color: ${i("text-sub")};
}
[data-petra-wide] .petra-src:not([data-differs]) { display: block; }
[data-petra-wide] .petra-src[data-differs] { color: ${i("text")}; }
@media (max-width: 768px) {
  .petra-kit-choice { grid-template-columns: calc(${i("control-gap")} * 3.5) minmax(0, 1fr) auto; row-gap: calc(${i("control-gap")} * 0.75); }
  .petra-kit-item-line { grid-column: 2 / -1; grid-row: 2; white-space: normal; }
  .petra-kit-item[data-saved] > .petra-kit-choice { grid-template-columns: calc(${i("control-gap")} * 3.5) minmax(0, 1fr); }
  .petra-kit-tools { flex-direction: column; align-items: flex-end; gap: 0; }
}
@media (min-width: 1024px) {
  /* A Source per drum (Peter, 2026-11-23): the Kit label in the first column and the picker over the other two;
     Room, Grit and Hiss on the row under them. A drum's Source the same way, its line with Use kit under the tabs. */
  .nc-panel-body > .petra-kit-field,
  .nc-panel-body > .petra-source {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: subgrid;
    align-items: center;
    row-gap: ${i("module-gap")};
  }
  .nc-panel-body > .petra-kit-field > .nc-label {
    align-self: start;
    padding-top: calc(${i("target-min")} * 0.375 - ${i("label-size")} * 0.6);
  }
  .nc-panel-body > .petra-kit-field > .petra-kit,
  .nc-panel-body > .petra-source > .nc-choice-row,
  .nc-panel-body > .petra-source > .petra-source-note {
    grid-column: 2 / -1;
  }
}
/* The Kit field on phones and tablets: the label over the picker. */
.petra-kit-field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${i("module-gap")};
}
.petra-deep-env svg {
  display: block;
  width: 100%;
  height: calc(${i("slot-span")} * 1.6);
  overflow: visible;
  cursor: pointer;
}
.petra-deep-env svg:focus-visible { outline: ${i("focus-width")} solid ${i("focus-ring")}; outline-offset: ${i("control-gap")}; }
.petra-deep-grid, .petra-deep-guide, .petra-deep-end { stroke: ${i("divider")}; stroke-width: ${i("grid-stroke")}; }
.petra-deep-guide, .petra-deep-end { stroke-dasharray: 2 3; }
.petra-deep-end { stroke: ${i("text-sub")}; }
.petra-deep-curve { stroke: var(--petra-deep-curve); stroke-width: ${i("curve-stroke")}; }
.petra-deep-label { fill: ${i("text-sub")}; font: ${i("readout-size-small")} ${i("font-readout")}; }
@media (min-width: 1024px) {
  .nc-panel-body > .nc-group[data-nc-id="deep-more"] > .nc-group-body,
  .nc-panel-body > .nc-group[data-nc-id="deep-kit-more"] > .nc-group-body { column-gap: ${i("module-pad-x-desktop")}; }
}
`}function Gu(t=document){if(Bi)return;const e=t.createElement("style");e.dataset.petraDeep="",e.textContent=Uu(),t.head.append(e),Bi=!0}function Ku(t){return{params:t.tracks.map(e=>({voice:e.voice,params:{...e.params},deep:{...e.deep},source:e.source,deepVersion:e.deepVersion})),engine:Dn(t.tracks),deep:{kit:t.deep.kit,character:{...t.deep.character},version:t.deep.version}}}function Wu(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}const mt=20,Xn=2e4,En=24,Hi=-60;function Vu(t,e,n,a,s=48e3){const r=2*Math.PI*Math.min(e,s*.49)/s,o=Math.cos(r),l=Math.sin(r)/(2*n);let u,c,d;t==="hp"?[u,c,d]=[(1+o)/2,-(1+o),(1+o)/2]:t==="bp"?[u,c,d]=[l,0,-l]:[u,c,d]=[(1-o)/2,1-o,(1-o)/2];const p=1+l,m=-2*o,g=1-l,w=2*Math.PI*a/s,y=(k,$,x)=>k+$*Math.cos(w)+x*Math.cos(2*w),h=(k,$)=>-(k*Math.sin(w)+$*Math.sin(2*w)),f=Math.hypot(y(u,c,d),h(c,d)),b=Math.hypot(y(p,m,g),h(m,g));return b>0?f/b:0}function Yu(t,e){return Math.log(Math.max(mt,Math.min(Xn,t))/mt)/Math.log(Xn/mt)*e}function qi(t,e,n){const a=Math.max(Hi,Math.min(En,t));return e+(En-a)/(En-Hi)*(n-e)}function Xu(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==r)&&(t.width=s,t.height=r);const o=t.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:n}}function Ju(t,e){const{ctx:n,w:a,h:s}=Xu(t);if(!n)return;n.clearRect(0,0,a,s);const r=cs(t),o=e.mode??"lp",l=H(t,Wu(o)),u=H(t,"divider"),c=H(t,"text-sub"),d=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,m=Math.max(p+4,s-d-3),g=e.q??Math.SQRT1_2,w=Math.round(qi(0,p,m))+.5;n.strokeStyle=u,n.lineWidth=1,n.beginPath(),n.moveTo(0,w),n.lineTo(a,w),n.stroke(),n.beginPath();for(let y=0;y<=a;y++){const h=mt*(Xn/mt)**(y/Math.max(1,a)),f=e.open?1:Vu(o,e.hz,g,h,e.sampleRate),b=qi(20*Math.log10(Math.max(1e-5,f)),p,m);y===0?n.moveTo(y,b):n.lineTo(y,b)}if(n.strokeStyle=l,n.stroke(),!e.open){const y=Math.round(Yu(e.hz,a))+.5;n.strokeStyle=c,n.setLineDash?.([2,3]),n.beginPath(),n.moveTo(y,p),n.lineTo(y,m),n.stroke(),n.setLineDash?.([])}n.fillStyle=c,n.font=r,n.textAlign="left",n.fillText("20 Hz",0,s-1),n.textAlign="right",n.fillText("20 kHz",a,s-1),n.textAlign="left",t.dataset.ncAccent=l,t.dataset.ncFilterHz=String(Math.round(e.hz))}function Qu(t,e){const n=t.redraw.bind(t);return t.redraw=()=>{n();const a=e();if(!a)return;const s=t.el.querySelectorAll('canvas.nc-canvas[data-nc-paint="filter"]');for(let r=0;r<s.length;r++){const o=s[r];o instanceof HTMLCanvasElement&&Ju(o,a)}},t.redraw(),t}const Bt={brand:"PETRA Rhythm, a drum machine and one of the TRIKI instruments. Open with the others, it plays on their clock.",menu:"Save, Load, New and Panic.","menu:save":"Downloads the pattern and all 10 slots as a .rhythm file you can load again later.","menu:load":"Opens a .rhythm file, replacing the pattern and all 10 slots. Undo in the message that follows brings back what was there.","menu:new":"Starts over with the default kit, every lane empty and every slot cleared. Undo in the message that follows brings it back.","menu:panic":"Silences every sound that is still ringing, at once. The beat keeps playing.","module:transport":"Starts and stops the beat, sets its speed and swing, and holds the 10 pattern slots.","module:pattern":"The drum pattern: one lane per drum, one square per 16th note. Click squares to add hits; click a drum's name to shape its sound.","module:filter":"Effects on the whole kit, in this order: Filter, Drive, Compressor. They are saved with the pattern and its slots.",hide:"Folds this module down to a slim bar to save room. Press again to open it.",index:"This module's number on the page.",slim:"This module is folded away. Click to open it again.",play:"Starts and stops the beat; Space does the same. When it reads Tap to join, the beat is already playing: tap and you come in on the next bar.",surprise:"Fills all 10 slots with new grooves and plays the first. Undo (or Cmd/Ctrl+Z) puts everything back.",bpm:"The speed of the beat in beats per minute (BPM), from 40 to 240. Higher is faster.",tap:"Tap this in time with the music, two taps or more, and Tempo follows your taps.",swing:"Pushes every second 16th note later for a shuffled, laid-back feel. 50% is straight; higher swings harder, up to 75%.","petra-presets":"Your grooves: the ten slots (your Favs, keys 1 to 0) and the library of factory grooves and your own. Folded, the line says how many slots hold a pattern and which is playing.","preset-now":"The groove playing now: its name, and where it's from. Edited means you changed it since you loaded it; Save as… keeps it.","preset-prev":"The previous groove in the list below. The tempo stays; Undo in the message puts your groove back.","preset-next":"The next groove in the list below. The tempo stays; Undo in the message puts your groove back.","presets-max":"Opens Presets over the instrument, three columns wide, so the whole list fits. Esc or this again puts it back.","pl-source":"Shows the grooves from one place: All, Factory (made for PETRA), Mine (Save as…) or Shared. The number is how many.","pl-row":"Plays this groove now: its pattern and sound. The tempo stays; Undo in the message puts your groove back.","pl-pad":"☆ puts this groove on the next free slot (key 1 to 0); a number says which slot it's on. Click again to take it off or move it.","pl-more":"More for this groove: put it on a slot, rename it, its category and tags, duplicate, delete.","pl-menu":"Does this to the groove.","pl-to-pad":"The slot (key 1 to 0) to put the groove on.","preset-save-as":"Saves the groove playing now into your library, under Mine, with a name, category and tags.","preset-save":"Saves it into your library.","pl-cancel":"Closes this without saving.","preset-import":"Adds grooves from a library file (one exported from PETRA, here or on another computer).","preset-export":"Downloads your own and shared grooves as one file, to keep or to import on another computer.","preset-lib":"The library: factory grooves and yours, by category. Click one to play it (the tempo stays); ☆ puts it on a slot; ⋯ to rename, tag or delete.","transport-more":"On a phone, Swing (and the Sync line, with another tab open) folds away; the line shows them. Tap to show or hide it.","moves-more":"On a phone, the pattern moves (Shift, Groove, Hits) fold away; the line names the lane they act on. Tap to show or hide them.","params-more":"On a phone, the drum's three shaping sliders fold away under one line with their values. Tap to show or hide them.","hacks-more":"On a phone, Drive, Compressor and the meter fold away under the Filter; the line says which are on. Tap to show them.","swing-note":"Whose swing this tab plays. Join the beat (Tap to join or Play) to follow the leading tab's swing; Save then stores it in a slot.",role:"With other TRIKI tabs open, one leads the shared tempo and clock and the others follow it. This tab's part is shown here.",slots:"Ten pattern slots. Click a saved one to play it (while playing, it switches on the next bar); Shift-click or long-press saves, Option-click clears.","slots@touch":"Ten pattern slots. Tap a saved one to play it (while playing, it switches on the next bar); long-press to save or clear.","slot-save":"Saves the pattern as it is now into this slot.","slot-clear":"Empties this slot. Undo in the message that follows puts it back.",morph:"How long a slot change glides from the old sound to the new one. 0 s switches at once.","tool-note":"In Note mode, clicking a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-note@touch":"In Note mode, tapping a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-accent@touch":"In Accent mode, tapping a square adds or removes an accent, a louder hit. An empty square gets the hit too.","tool-accent":"In Accent mode, clicking a square adds or removes an accent, a louder hit (an empty square gets the hit too). Shift-click does this in Note mode.",fill:"Hold it for a fill over the last beat: a snare roll, tom answers, the closed hat drops out. Let go and the pattern is as it was.",clear:"Turns every square off on every lane; the sounds and lengths stay. Undo takes it back.",mute:"Mute: silences this lane. Press again to hear it.",solo:"Solo: plays only the soloed lanes. Solo more than one to hear them together.",lane:"Click to shape its sound below; Shift- or Cmd-click adds it to the lanes Moves act on.","lane@touch":"Tap to shape its sound below; long-press adds it to the lanes Moves act on.","drum@kick":"Kick drum, the low thump.","drum@snare":"Snare drum, the crack on the backbeat.","drum@clap":"Hand clap, a quick burst of noise.","drum@rim":"Rimshot, a short knock.","drum@hat":"Closed hi-hat, a short tick that cuts the open hat short.","drum@hatOpen":"Open hi-hat, a longer sizzle that a closed-hat hit cuts short.","drum@ride":"Ride cymbal, a stick's tick on a long wash that nothing cuts short.","drum@crash":"Crash cymbal, a bright splash with a long tail that nothing cuts short.","drum@tom":"Tom, a pitched drum.","drum@metal":"Metal, a clanging, bell-like hit.","drum@shaker":"Shaker, beads in a shell.",length:"Drag to set how many steps this lane plays before it starts over. A shorter lane drifts against the others for shifting patterns.",dice:"New steps for this lane only; its sound and length stay. Undo takes it back.","pads-prev":"Shows the previous lane on the pads.","pads-next":"Shows the next lane on the pads.","pads-lane":"The lane on the pads. Tap it, then tap a pad to set where the lane ends; tap it again when done.","moves:shift":"Moves the selected lanes' hits together, wrapping round the end. Shift-click lane names to move several at once.","moves:shift@touch":"Moves the selected lanes' hits together, wrapping round the end. Long-press lane names to move several at once.","moves:groove":"Moves the accents and velocities from hit to hit; the hits stay where they are.","moves:hits":"Trades hits between the selected lanes, or nudges a few so the part evolves.","move:shift-left":"Every hit one step earlier; the first wraps round to the end.","move:shift-right":"Every hit one step later; the last wraps round to the start.","move:shift-random":"Shifts by a random number of steps, every selected lane by the same amount.","move:reverse":"Plays the selected lanes backwards.","move:groove-left":"Each hit takes the next hit's accent and velocity.","move:groove-right":"Each hit takes the previous hit's accent and velocity.","move:shuffle":"Trades hits between the selected lanes, step by step. Select two lanes or more first.","move:mutate":"Moves or adds one or two hits on each selected lane, so the part evolves.","edit-step":"The step you are editing. Long-press another square to edit that one.","edit-velocity":"How hard this step hits. Lower is softer.","edit-chance":"How often this step plays: 100% every time, 50% about every other time. Steps under 100% show dimmed.","edit-done":"Closes the step editor.","section:parameters":"The sound of the selected lane. Click a drum's name in the grid to pick another.","panel-subject":"The lane these sliders shape. Click another drum's name in the grid to switch.",tune:"The drum's pitch in hertz (Hz, vibrations per second). Lower is deeper; higher is tighter.","tune@kick":"The pitch the kick settles on, in hertz (Hz, vibrations per second). Lower is deeper and boomier; higher is punchier.","tune@tom":"The pitch the tom settles on, in hertz (Hz, vibrations per second). Lower is a deep floor tom; higher is a small tom.","tune@snare":"The pitch of the snare's ringing body under the noise, in hertz (Hz). Lower is deeper; higher is tighter.","tune@rim":"The pitch of the rimshot's knock, in hertz (Hz). Lower is woodier; higher is sharper.","tune@clap":"A clap has no pitched body, so Tune does nothing on this lane.","tune@hat":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@hatOpen":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@metal":"The pitch of the clang, in hertz (Hz). Lower is a deep gong; higher is a small bell.",decay:"How long each hit rings before it fades. Short is tight; long rings on.","decay@kick":"How long the kick booms, and how slowly its pitch falls. Short is a tight thud; long is a deep boom.","decay@tom":"How long the tom rings, and how slowly its pitch falls. Short is a thud; long rings on.","decay@hatOpen":"How long the open hat sizzles; it rings far longer than the closed hat at the same setting. A closed-hat hit still cuts it short.",tone:"How bright the hit is. Lower is darker; higher is brighter.","tone@kick":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@tom":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@snare":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@clap":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@rim":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@hat":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@hatOpen":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@metal":"How much the clang rings with extra overtones. Lower is a purer tone; higher is harsher.",snap:"How sharp the start of each hit is. More is punchier.","snap@kick":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@tom":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@snare":"Noise rattle against the drum's body. More is a noisier crack; less is more tone.","snap@rim":"Noise against the knock's body. More is a noisier click; less is more tone.","snap@clap":"How tight the clap's bursts are and how much noise they carry. More is a tighter, snappier clap.","snap@hat":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@hatOpen":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@metal":"Moves the clang's overtones for a different metallic colour. Try a few settings to hear each one.",drive:"Saturation on this drum alone. More is fatter and grittier; 0 is clean.",level:"How loud this lane is. Turn it down to sit it back in the mix.","shaker-tune":"The shell's resonance in hertz (Hz, vibrations per second). Lower is a bigger, darker shaker; higher is smaller and brighter.","shaker-decay":"How long each shake rings after its peak. Short is a tight tick; long is a smoother swish.","shaker-tone":"How bright and ringing the shell is. Higher is brighter and thinner; lower is softer.","shaker-snap":"How many beads: few is a coarse, ticking cabasa, many is a dense, soft egg shaker.","shaker-drive":"How quickly each stroke swells in. Short is a sharp chick; long is a soft swish.","shaker-level":"How loud the shaker is. Turn it down to sit it back in the mix.","ride-tune":"The ride's tone, from darker to brighter, in kilohertz (kHz). The wash darkens from there as it fades.","ride-decay":"About how long the ride rings, in seconds, until it has faded away. Short is a tight ping; long is a big ride.","ride-tone":"How loud the smooth wash is under the click. Lower is a dry tick; higher is washier.","ride-snap":"How hard the stick's click is. More is a clearer ping on every beat.","ride-drive":"Saturation on the ride alone. More is grittier; 0 is clean.","ride-level":"How loud the ride is. It keeps time, so it usually sits under the kit.","crash-tune":"The crash's tone, from darker to brighter, in kilohertz (kHz). The tail darkens from there as it fades.","crash-decay":"About how long the crash rings, in seconds, until it has faded away. Short is a quick splash; long is a big crash.","crash-tone":"How loud the long wash is after the burst. Lower is a short splash; higher is a big, washy crash.","crash-snap":"How hard the crash's first burst is. More is a sharper accent.","crash-drive":"Saturation on the crash alone. More is grittier; 0 is clean.","crash-level":"How loud the crash is. It is an accent, so it usually sits on top.","section:sound":"The whole kit's sound: the kit every drum plays, and the character of the Deep drums. The pattern stays as it is.",kit:"The kit every drum plays: Classic or a Deep kit (808, Lo-fi, Linn, Minimal). Mixed: drums play different kits, as tagged after their names.","deep-kit":"Opens the kits, your saved kits under them. Choosing one sets every drum and the character to that kit's sound.","sound-subject":"The kit every drum plays, Mixed when they differ, or your saved kit's name.","kit-prev":"The previous kit, for every drum. From Mixed it steps from the kit most drums play.","kit-next":"The next kit, for every drum. From Mixed it steps from the kit most drums play.","kit-save":"Keep this mix of drums as your own kit, with each drum's sound and the character, to pick again later.","kit-save-ok":"Save the kit under this name. A kit with the same name is replaced.","kit-save-cancel":"Close the name field without saving.","kit-rename":"Give this saved kit a new name. Songs that used it keep playing as they were.","kit-delete":"Removes this saved kit (Undo brings it back). Songs that used it keep their drums and play the same.","drum-source":"Where this drum's sound comes from: Classic or one of the Deep kits. Only this drum changes; the rest keep the kit.",source:"Where this drum's sound comes from: Classic or one of the Deep kits. Only this drum changes; it remembers its settings on each kit.","use-kit":"Put this drum back on the kit the others play.","deep-room":"A small room around the Deep drums (Classic drums stay dry). 0 is dry; more is a bigger, wetter space.","deep-grit":"Bit and sample-rate crush on the Deep drums, for an old sampler's grit. 0 is clean.","deep-hiss":"Tape hiss and vinyl crackle under the Deep drums while they play. 0 is silent.","deep-kit-more":"Saturation and the kit's low and high cut. The line shows their settings.","deep-sat":"Warm saturation on the Deep drums. 0 is off; more is fatter and louder.","deep-lowCut":"Takes the rumble below this pitch out of the Deep drums. All the way down is off.","deep-highCut":"Takes the top above this pitch off the Deep drums, for a darker sound. All the way up is off.","deep-env":"How the selected drum's loudness falls over time, on a stretched time scale. Click it to hear the drum.","deep-tune":"The pitch of the drum's tone and ring, in semitones. Lower is deeper.","deep-tune@kick":"The kick's pitch, in semitones. Lower is a deeper thump; higher is tighter.","deep-tune@tom":"The tom's pitch, in semitones. Lower is a floor tom; higher is a small tom.","deep-decay":"How long the drum rings. 100% is the kit's own; lower is tighter, higher rings on.","deep-body":"How much of the drum's tone sounds under the noise. Lower is more noise and snap; higher is rounder.","deep-snap":"How hard the attack clicks. More is a sharper, punchier start.","deep-snap@clap":"How sharp the clap's quick bursts are. More is a snappier clap.","deep-noise@ride":"The ride's tone, from darker to brighter: the click, the wash and how it darkens all move together, with no pitch.","deep-noise@crash":"The crash's tone, from darker to brighter: the burst, the wash and how it darkens all move together, with no pitch.","deep-decay@ride":"How long the ride's wash rings on. 100% is the kit's own; lower is a tight ping, higher a big wash.","deep-decay@crash":"How long the crash's tail rings on. 100% is the kit's own; lower is a quick splash, higher a long wash.","deep-snap@ride":"How loud the stick's tick is on top of the wash. More is a clearer ping.","deep-snap@crash":"How hard the crash's first splash is. More is a bigger hit.","deep-noise":"The colour of the drum's noise, in octaves. Brighter moves it up; darker moves it down.","deep-sizzle":"How much high sizzle sits on the drum. More is brighter and airier.","deep-drive":"Saturation on this drum alone. More is fatter and grittier; clean is none.","deep-level":"How loud this drum is in the kit, in decibels (dB). 0 dB is the kit's own.","deep-more":"The drum's Body, Noise colour and Drive. The line shows their settings.","hack:hack-filter":"A filter on the whole kit: it takes away part of the sound to make it darker or thinner.","hack:hack-drive":"Saturation on the whole kit for warmth and grit. It also tames the loudest peaks.","hack:hack-compressor":"Evens out the loud and quiet parts of the kit for a tighter, punchier sound.","hack-switch":"Turns this effect on or off. Off, the sound passes through untouched and the settings are kept.",more:"More settings for this effect.",mode:"Low pass keeps the lows and cuts the highs; High pass does the opposite. Band pass keeps only a band around Cutoff.",cutoff:"Where the filter cuts, in hertz (Hz). In Low pass, lower is darker and all the way up is open; in High pass, higher is thinner.",resonance:"Boosts the sound right at the Cutoff for a sharper, ringing edge. 0 is smooth.",curve:"A picture of the filter: low pitches on the left, high on the right. Where the line is high the sound passes; where it drops, it is cut.",meter:"How loud the kit is right now, after the Hacks.","hack-drive-drive_db":"How hard the sound is pushed into saturation, in decibels (dB). More is grittier; 0 is clean.","hack-drive-output_db":"The level after the drive, in decibels (dB). Use it to match the loudness with Drive on and off.","hack-drive-mix":"The blend of driven and clean sound. 100% is all driven; lower mixes the clean kit back in.","hack-drive-curve":"The drive's character. Smooth is warm and keeps the level steady; Acid is harder and rawer.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up is off; lower is darker.","hack-compressor-threshold_db":"The level, in decibels (dB), above which the compressor turns the sound down. Lower acts on more of the sound.","hack-compressor-ratio":"How strongly sound above the Threshold is turned down. 1:1 does nothing; higher squashes harder.","hack-compressor-attack_ms":"How quickly the compressor clamps down, in milliseconds (ms). Slower lets each hit's punch through first.","hack-compressor-release_ms":"How quickly the compressor lets go after a hit, in milliseconds (ms). Shorter pumps with the beat; longer is smoother.","hack-compressor-makeup_db":"Turns the compressed kit back up, in decibels (dB), to make up for what the compressor took off.","toast-undo":"Takes back the last surprise, re-roll, clear, move, slot clear or load."};function ji(t,e,n=!1){return(e?Bt[`${t}@${e}`]:void 0)??(n?Bt[`${t}@touch`]:void 0)??Bt[t]}function Zu(t,e=!1){if(t.key!=="lane")return ji(t.key,t.voice,e);const n=t.voice?Bt[`drum@${t.voice}`]:void 0,a=ji("lane",void 0,e);return n&&a?`${n} ${a}`:a}const ae=(t,e)=>t.dataset?.[e];function ep(t,e){const n=[],a=(r,o)=>{for(const l of Array.from(t.querySelectorAll(r))){const u=o(l);u&&n.push({el:l,...u})}},s=r=>()=>({key:r});return a(".petra-head-title",s("brand")),a(".petra-menu > summary",s("menu")),a("[data-petra-menu]",r=>({key:`menu:${ae(r,"petraMenu")}`})),a(".nc-module-hd > .nc-title",r=>{const o=r.closest("[data-nc-module]")?.getAttribute("data-nc-module");return o?{key:`module:${o}`}:null}),a("[data-nc-hide]",s("hide")),a("[data-nc-index]",s("index")),a(".nc-slim",s("slim")),a(".nc-field",r=>{const o=Array.from(r.children).find(p=>p.classList.contains("nc-label"));if(!o)return null;const l=r.classList.contains("nc-morph-field")?"morph":ae(r,"ncId");if(!l)return null;const u=o.getAttribute("for"),c=u?r.ownerDocument.getElementById(u)??null:r.querySelector("input, select"),d=r.closest('[data-nc-section="parameters"]')?e.selectedVoice():void 0;return{key:l,voice:d,control:c,el:o}}),a(".nc-group[data-nc-id] > .nc-group-toggle",r=>({key:r.parentElement?.getAttribute("data-nc-id")??"",control:r})),a(".nc-btn[data-nc-id]",r=>({key:ae(r,"ncId")??""})),a("[data-nc-sparkle]",s("surprise")),a("[data-nc-tap]",s("tap")),a(".nc-snap[data-nc-slot]",s("slots")),a("[data-nc-slot-op]",r=>({key:`slot-${ae(r,"ncSlotOp")==="store"?"save":"clear"}`})),a(".nc-note[data-nc-id]",r=>({key:ae(r,"ncId")??""})),a(".nc-choice-row[data-nc-id]",r=>({key:ae(r,"ncId")??""})),a("[data-petra-help]",r=>({key:ae(r,"petraHelp")??""})),a(".petra-kit-name",s("deep-kit")),a(".nc-pl-chip",s("pl-source")),a(".nc-pl-load",s("pl-row")),a(".nc-pl-pad",s("pl-pad")),a(".nc-pl-more",s("pl-more")),a(".nc-pl-menu > button",s("pl-menu")),a(".nc-pl-pads > button",s("pl-to-pad")),a(".nc-pl-btn",r=>({key:ae(r,"ncId")??"pl-cancel"})),a(".petra-deep-env > svg",s("deep-env")),a('.nc-seg[aria-label="Step tool"] > button',r=>({key:r.hasAttribute("data-nc-accent-mode")?"tool-accent":"tool-note"})),a("[data-nc-fill]:not([data-nc-clear])",s("fill")),a("[data-nc-clear]",s("clear")),a("[data-nc-ms]",r=>({key:ae(r,"ncMs")==="solo"?"solo":"mute"})),a(".nc-row > .nc-name",r=>{const o=r.closest(".nc-row"),l=o?.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??o?.querySelector("[data-nc-len]")?.getAttribute("data-nc-len")??void 0;return{key:"lane",voice:l?e.voiceOf(l):void 0}}),a(".nc-len-handle",s("length")),a(".nc-row-dice, [data-nc-pads-dice]",s("dice")),a(".nc-pads-step:not([data-nc-pads-dice])",r=>({key:r.getAttribute("aria-label")?.startsWith("Next")?"pads-next":"pads-prev"})),a(".nc-pads-label",s("pads-lane")),a("[data-nc-pads-play]",s("play")),a(".nc-moves-row > .nc-moves-label",r=>({key:`moves:${(r.parentElement?.getAttribute("aria-label")??"").toLowerCase()}`,control:r.parentElement})),a("[data-nc-move]",r=>({key:`move:${ae(r,"ncMove")}`})),a(".nc-panel-title",r=>{const o=r.closest("[data-nc-section]")?.getAttribute("data-nc-section");return o?{key:`section:${o}`}:null}),a(".nc-panel-subject",r=>({key:r.closest('[data-nc-section="sound"]')?"sound-subject":"panel-subject"})),a(".nc-ui-fx > .nc-ui-fx-hd > .nc-ui-fx-name",r=>{const o=r.closest(".nc-ui-fx")?.getAttribute("data-nc-id");return o?{key:`hack:${o}`}:null}),a("[data-nc-fx-switch]",s("hack-switch")),a("details.nc-ui-more > summary",s("more")),a(".nc-step-editor-head > .nc-label",s("edit-step")),a(".nc-step-editor-done",s("edit-done")),a(".nc-step-editor-row > .nc-label",r=>{const o=r.parentElement?.querySelector("input[data-nc-edit]");return{key:`edit-${o?.getAttribute("data-nc-edit")==="probability"?"chance":"velocity"}`,control:o??null}}),a(".nc-ui-toast-action",s("toast-undo")),n}const Ui="rhythm-help-",tp="button, input, select, summary, [role]";function np(t,e=document){Fd({document:e});const n=e.createElement("div");n.id="rhythm-help",n.hidden=!0,e.body.append(n);const a=new Map,s=c=>{let d=a.get(c);if(!d){d=`${Ui}${a.size+1}`;const p=e.createElement("span");p.id=d,p.textContent=c,n.append(p),a.set(c,d)}return d},r=(c,d)=>{const p=c.getAttribute("aria-describedby")??"",g=[...p.split(/\s+/).filter(w=>w&&!w.startsWith(Ui)),d].join(" ");g!==p&&c.setAttribute("aria-describedby",g)};let o;const l=()=>{o=t.selectedVoice();const c=e.defaultView?.matchMedia?.("(pointer: coarse)").matches??!1;for(const d of ep(e,t)){const p=Zu(d,c);if(!p)continue;d.el.getAttribute(dt)!==p&&d.el.setAttribute(dt,p),d.el.removeAttribute("title"),d.control?.classList.contains("nc-moves-row")&&d.control.removeAttribute("title");const m=d.control??(d.el.matches(tp)?d.el:null);m&&r(m,s(p))}},u=new MutationObserver(c=>{let d=!1;for(const p of c){if(p.type==="attributes"){const m=p.target;m.hasAttribute("title")&&m.hasAttribute(dt)&&m.removeAttribute("title");continue}if(!(p.target===n||p.target.localName==="canvas"))for(const m of Array.from(p.addedNodes))m.nodeType===1&&!m.matches(".nc-ui-help, [data-nc-probe]")&&(d=!0)}d&&l()});return u.observe(e.body,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["title"]}),l(),{refresh:l,follow(){t.selectedVoice()!==o&&l()},disconnect(){u.disconnect(),n.remove()}}}const Mr={on:!1,accent:!1,velocity:.8},te=t=>({...t??Mr});function se(t){return Math.max(1,Math.min(t.length,t.steps.length))}function An(t,e){const n=se(t),a=t.steps.map(te);for(let s=0;s<n;s++)a[((s+e)%n+n)%n]=te(t.steps[s]);return{...t,steps:a}}function ap(t){const e=se(t),n=t.steps.map(te);for(let a=0;a<e;a++)n[e-1-a]=te(t.steps[a]);return{...t,steps:n}}function Gi(t,e){const n=se(t),a=[];for(let o=0;o<n;o++)t.steps[o]?.on&&a.push(o);if(a.length<2)return{...t,steps:t.steps.map(te)};const s=a.map(o=>t.steps[o]),r=t.steps.map(te);return a.forEach((o,l)=>{const u=s[((l-e)%a.length+a.length)%a.length];r[o]={on:!0,accent:u.accent,velocity:u.velocity,...u.probability!==void 0?{probability:u.probability}:{}}}),{...t,steps:r}}function ip(t,e){const n=t.map(s=>({...s,steps:s.steps.map(te)})),a=Math.max(0,...t.map(se));for(let s=0;s<a;s++){const r=t.flatMap((l,u)=>s<se(l)?[u]:[]);if(r.length<2)continue;const o=r.map(l=>te(t[l]?.steps[s]));for(let l=o.length-1;l>0;l--){const u=Math.floor(e()*(l+1));[o[l],o[u]]=[o[u],o[l]]}r.forEach((l,u)=>{const c=n[l];c&&(c.steps[s]=o[u])})}return n}function sp(t,e){const n=se(t),a=t.steps.map(te),s=e()<.5?1:2;for(let r=0;r<s;r++){const o=[],l=[];for(let c=0;c<n;c++)(a[c]?.on?o:l).push(c);if(!l.length)break;const u=o.flatMap(c=>[-1,1].map(d=>[c,(c+d+n)%n]).filter(([,d])=>!a[d]?.on));if(u.length&&e()<.7){const[c,d]=u[Math.floor(e()*u.length)];a[d]=te(a[c]),a[c]=te(Mr)}else{const c=l[Math.floor(e()*l.length)];a[c]={on:!0,accent:!1,velocity:.55}}}return{...t,steps:a}}function rp(t,e){const n=s=>s.steps.slice(0,se(s)).filter(r=>r.on).length,a=e.some(s=>n(s)>0);switch(t){case"shift-left":case"shift-right":case"shift-random":case"reverse":return e.some(s=>n(s)>0&&n(s)<se(s));case"groove-left":case"groove-right":return e.some(s=>{const r=s.steps.slice(0,se(s)).filter(o=>o.on);return r.length>1&&r.some(o=>o.accent!==r[0]?.accent||o.velocity!==r[0]?.velocity)});case"shuffle":return e.length>1&&a;case"mutate":return e.length>0}}function op(t,e,n){switch(t){case"shift-left":return e.map(a=>An(a,-1));case"shift-right":return e.map(a=>An(a,1));case"shift-random":{const a=Math.min(...e.map(se)),s=a>1?1+Math.floor(n()*(a-1)):0;return e.map(r=>An(r,s))}case"reverse":return e.map(ap);case"groove-left":return e.map(a=>Gi(a,-1));case"groove-right":return e.map(a=>Gi(a,1));case"shuffle":return ip(e,n);case"mutate":return e.map(a=>sp(a,n))}}class lp{doc=ho();bank=ds();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=fo(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=mo(this.bank,e,this.doc),this.edited=null}replace(e,n){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(n),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}loadGroove(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...this.doc,swing:e.swing,fx:structuredClone(e.fx),tracks:structuredClone(e.tracks),engine:e.engine,deep:structuredClone(e.deep)},this.bank={slots:this.bank.slots,active:null},this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=n}putSlot(e,n){if(e<0||e>=this.bank.slots.length)return;this.retireSparkle();const a=this.bank.slots.slice();a[e]=n?structuredClone(n):null;const s=!n&&this.bank.active===e?null:this.bank.active;this.edited===e&&(this.edited=null),this.bank={slots:a,active:s}}clear(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=go(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=n}peek(e){const n=Wa(this.bank,e,this.doc,0);return n.applied?n.document:null}recall(e,n=this.recallGlideSeconds){const a=Wa(this.bank,e,this.doc,n);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=Nl(this.doc,e);this.sparkleUndo=n,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,n=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=Al(this.doc,e,n),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},n=structuredClone(this.doc);for(const a of n.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=n,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}moveTracks(e,n,a=Math.random){const s=e.filter(c=>this.doc.tracks[c]);if(!s.length)return!1;const r=s.map(c=>this.doc.tracks[c]),o=op(n,r,a);if(JSON.stringify(o)===JSON.stringify(r))return!1;const l={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},u=structuredClone(this.doc);return s.forEach((c,d)=>{const p=o[d];p&&(u.tracks[c]=structuredClone(p))}),this.doc=u,this.writeActive(),this.sparkleUndo=l,this.glidePending=0,!0}undoableEdit(e){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.retireSparkle(),this.sparkleEdited=!1,e(this.doc),this.writeActive(),this.sparkleUndo=n,this.glidePending=0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const n=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=n,n===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(n=>{n.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let Ki=!1;function cp(){return`
#app .nc-morph-field { display: none; }
button[data-nc-help], summary[data-nc-help] { cursor: pointer; }
.nc-len-handle[data-nc-help] { cursor: ew-resize; }
.nc-btn[data-nc-help]:disabled { cursor: not-allowed; }
.nc-moves-btn[data-nc-help]:disabled { cursor: default; }
/* nc-ui help/slider-labels (not vendored yet): the slider's hit band covers most of its label, so with a mouse the
   label sits above it and opens its description. In the fallback layer, as the kit is: the live kit takes over. */
@layer nc-ui-fallback {
  @media (hover: hover) and (pointer: fine) {
    .nc-field[data-nc-slider] > .nc-label[data-nc-help] { position: relative; z-index: 1; }
  }
  /* nc-ui 29f443d (#73, not vendored yet): the row under a filter curve in an FX card keeps a gap from its 20 Hz and
     20 kHz (the Hacks Filter's Cutoff, Peter 2026-11-07). Drop it when re-pinning past 29f443d. */
  .nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${i("module-gap")}; }
  /* nc-ui #80 (not vendored yet; this copy is 0.2.0 at 6b4d6a1): the ▾ at a dropdown's end (Peter, 2026-11-23:
     dropdowns must look like dropdowns). The live kit draws it; this is the same ▾ for when only the bundled kit is
     there. ASTRID's ▾ (Peter, 2026-11-24; nc-ui #81): 8×4 px, 3 px in from the end (control-gap × 2 by control-gap,
     inset control-gap × 0.75: this copy has no select-mark tokens). Drop it when re-pinning past #81. */
${dp()}
}
`}function Tn(t){return`background-image: conic-gradient(from -45deg at 50% 100%, ${i(t)} 90deg, transparent 0);`}function dp(){const t=`calc(${i("control-gap")} * 2)`,e=`calc(${i("control-gap")} * 0.75)`;return`  .nc-select {
    ${Tn("text-sub")}
    background-size: ${t} ${i("control-gap")};
    background-position: right ${e} top 55%;
    background-repeat: no-repeat;
    background-origin: border-box;
  }
  .nc-select:is(:hover, :focus):not(:disabled) { ${Tn("text")} }
  .nc-select:disabled { ${Tn("divider")} }`}function up(t=document){if(Ki)return;const e=t.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=cp(),t.head.append(e),Ki=!0}function pp(t){const e=t.getOutputTimestamp?.(),n=e?.contextTime,a=e?.performanceTime;if(n===void 0||a===void 0||!(n>0)||!(a>0))return null;const s=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0;return{contextTime:n,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function Wi(t,e){const n=t.getOutputTimestamp?.(),a=n?.contextTime,s=n?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const hp=new Set(["transport-more","moves-more","params-more","hacks-more"]);function sn(t){for(const e of Array.from(t.querySelectorAll(".nc-group[data-nc-id]")))hp.has(e.dataset.ncId??"")&&(e.dataset.ncCollapse!=="phone"&&(e.dataset.ncCollapse="phone"),Vi(e),!e.dataset.petraFold&&(e.dataset.petraFold="",Lr(e,"nc-group-toggle")?.addEventListener("click",()=>Vi(e))))}function Vi(t){const e=Lr(t,"nc-group-body");e?.hidden&&(e.hidden=!1)}function Lr(t,e){return Array.from(t.children).find(n=>n instanceof HTMLElement&&n.classList.contains(e))}function rn(t){return t.map(([e,n])=>`${e} ${n}`).join(" · ")}const Jn="petra-presets";function fp(t,e,n){const a=t.filter(Boolean).length,s=[a?`${a} of ${t.length} saved`:"none saved"];return e!=null&&t[e]&&s.push(`slot ${n[e]??e+1}`),s.join(" · ")}const mp=1400;function Mn(t,e,n,a=!1){return t==="store"?null:t==="clear"?n?`Cleared ${e}`:null:n?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function gp(t){return t===0?"0 s":`${Math.round(t*100)/100} s`}class bp{constructor(e){this.repaint=e}text="";timer=0;say(e,n=mp){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},n))}}const yp=50;function wp(t,e,n,a=yp){if(n)return 0;const s=t-e;return s>=a?0:a-s}const Ee=1e3;function Ea(t,e,n){return t==="linear"||!(n>e)?"linear":e>0?"log":"power"}function vp(t,e,n,a){if(!(n>e)||!Number.isFinite(a))return 0;const s=Math.min(n,Math.max(e,a)),r=Ea(t,e,n);if(r==="log")return Math.log(s/e)/Math.log(n/e);const o=(s-e)/(n-e);return r==="power"?Math.cbrt(o):o}function kp(t,e,n,a){const s=Math.min(1,Math.max(0,a||0)),r=Ea(t,e,n);return r==="log"?e*(n/e)**s:e+(n-e)*(r==="power"?s**3:s)}function xp(t,e,n,a){let s=Math.min(n,Math.max(e,t));if(a&&a>0){s=e+Math.round((s-e)/a)*a;const r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));s=Math.min(n,Math.max(e,Number(s.toFixed(r))))}return s}const Cr=(t,e,n,a)=>Math.round(vp(t,e,n,a)*Ee),Vt=(t,e,n,a,s)=>xp(kp(t,e,n,a/Ee),e,n,s),Nr=new Map;let Yi=!1;function $p(){Yi||typeof document>"u"||(Yi=!0,document.addEventListener("keydown",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)||e.type!=="range"||e.disabled)return;const n=Nr.get(e.id);if(!n)return;const a=Cr(n.taper,n.min,n.max,n.value),s=t.shiftKey?1:Ee/100,r={ArrowRight:s,ArrowUp:s,ArrowLeft:-s,ArrowDown:-s,PageUp:100,PageDown:-100};let o=t.key==="Home"?0:t.key==="End"?Ee:r[t.key]===void 0?null:a+r[t.key];if(o===null)return;t.preventDefault(),o=Math.min(Ee,Math.max(0,Math.round(o)));const l=Math.sign(o-a);let u=Vt(n.taper,n.min,n.max,o,n.step);for(;l!==0&&u===n.value&&o>0&&o<Ee;)o+=l,u=Vt(n.taper,n.min,n.max,o,n.step);e.value=String(o),n.set(u)},!0))}function on(t,e){const{min:n,max:a,step:s}=t;return Ea(e,n,a)==="linear"?t:(Nr.set(t.id,{taper:e,min:n,max:a,step:s,value:t.value,set:r=>t.onChange(r)}),$p(),{...t,min:0,max:Ee,step:1,value:Cr(e,n,a,t.value),onChange:r=>t.onChange(Vt(e,n,a,r,s)),...t.onCommit?{onCommit:r=>t.onCommit?.(Vt(e,n,a,r,s))}:{}})}class Sp{constructor(e,n=()=>null){this.host=e,this.anchor=n}handle=null;get open(){return this.handle!==null}show(e,n="Surprise applied"){this.handle?.close();const a=Td({message:n,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Xi(t,e){const n=new AudioContext(e);let a="loading";const s=(async()=>{n.state==="running"&&await n.suspend();for(const r of t)await n.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:n,ready:s,get status(){return a},async start(){return a==="loaded"&&Se(n),await s,n.state!=="running"&&await n.resume(),n.state}}}function Se(t){t.state==="running"||t.state==="closed"||t.resume().catch(()=>{})}const Ep=5e3;function Ap(){return typeof navigator<"u"&&"userAgentData"in navigator}function Tp(t,e,n,a={}){const s=a.restartsOnWorkletReady??Ap(),r=a.preloadTimeoutMs??Ep;let o=null,l=!1,u=null,c=null;async function d(){const y=new AudioContext(e);Se(y);try{for(const h of t)await y.audioWorklet.addModule(h);return y}catch(h){throw y.close().catch(()=>{}),h}}function p(y,h=!1){l=!0,o=null,y.context.close().catch(()=>{}),h?n?.(new Error(`audio preload still loading after ${r} ms`)):y.ready.catch(f=>n?.(f))}async function m(y){const{context:h}=y;n?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),Se(h);const f=(async()=>{for(const b of t)await h.audioWorklet.addModule(b)})();try{return await Promise.race([y.ready.then(()=>{},()=>f),f]),h}catch(b){throw l=!0,o===y&&(o=null),h.close().catch(()=>{}),b}}function g(y){let h;const f=new Promise(b=>{h=setTimeout(()=>b("timeout"),r)});return Promise.race([y.ready.then(()=>"ready"),f]).finally(()=>clearTimeout(h))}async function w(){if(!l){o??=Xi(t,e);const y=o;if(y.status==="failed")p(y);else{const h=y.status==="loaded"||!s;if(h&&Se(y.context),y.status==="loading"){let f;try{f=await g(y)}catch{return p(y),d()}if(f==="timeout")return s?(p(y,!0),d()):m(y)}return y.context.state==="closed"?(o===y&&(o=null),w()):(h||Se(y.context),y.context)}}return d()}return{preload(){o||u||c||l||(o=Xi(t,e))},load(){return u&&u.state!=="closed"?(Se(u),Promise.resolve(u)):c?(o&&(o.status==="loaded"||!s)&&Se(o.context),c):(c=w().then(y=>(u=y,o=null,y)).finally(()=>{c=null}),c)}}}const Aa={kick:36,rim:37,snare:38,clap:39,hat:42,tom:45,hatOpen:46,crash:49,ride:51,metal:56,shaker:70},Mp=new Map(Object.entries(Aa).map(([t,e])=>[e,t])),Lp=t=>Mp.get(t)??null,Ji=.5,Qi=8,Cp=.25,Np=1.2;function Fp(t){let e=Number.NEGATIVE_INFINITY,n=0;const a={hits:0,messages:0,refused:0};return{tick(s){if(s.beat===null){e=Number.NEGATIVE_INFINITY;return}s.beat<e-Ji-1e-9&&(e=Number.NEGATIVE_INFINITY);const r=s.beat<=Qi?0:s.beat,o=Math.max(Number.isFinite(e)?Math.max(e,s.beat-Qi):r,s.entry),l=s.beat+Ji;if(!(l>o))return;e=l;const u=Zl(s.tracks,s.swing,o,l);if(!u.length)return;const c=[];for(const d of u){const p=`r|${++n}`,m=Aa[d.voice],g=Math.min(1,Math.max(.01,d.velocity*(d.accent?Np:1)));c.push({type:"note",id:p,beat:d.beat,on:!0,note:m,velocity:g,pattern:!0},{type:"note",id:p,beat:d.beat+Cp,on:!1,note:m,pattern:!0})}try{t({v:1,kind:"played",events:c})?(a.messages++,a.hits+=u.length):a.refused++}catch{a.refused++}},reset(){e=Number.NEGATIVE_INFINITY},stats:a}}const Zi=t=>typeof t=="object"&&t!==null,Ln=t=>typeof t=="number"&&Number.isFinite(t),zp=t=>typeof t=="string"&&t.length>0&&t.length<=128;function Pp(t){const e=new Map,n={hits:0,duplicates:0,notDrums:0,refused:0};return{message(a){if(!Zi(a)||a.v!==1){n.refused++;return}if(a.kind==="off"){const r=a.atBeat;if(r!==void 0&&!Ln(r)){n.refused++;return}for(const[o,l]of e)(r===void 0||l>=r-1e-9)&&e.delete(o);t(r===void 0?{type:"unlayer"}:{type:"unlayer",atBeat:r});return}if(a.kind!=="notes"||!Array.isArray(a.events)||a.events.length>1024)return;const s=[];for(const r of a.events){if(!Zi(r)||!zp(r.id)||!Number.isInteger(r.note)||!Ln(r.startBeat)||!Ln(r.velocity)||r.velocity<0||r.velocity>1){n.refused++;continue}if(e.has(r.id)){n.duplicates++;continue}const o=Lp(r.note);if(!o){n.notDrums++;continue}e.set(r.id,r.startBeat),s.push({beat:r.startBeat,voice:o,velocity:r.velocity})}if(e.size>4096){const r=Math.max(...e.values());for(const[o,l]of e)l<r-64&&e.delete(o)}s.length&&(n.hits+=s.length,t({type:"layer",hits:s}))},stats:n}}const Ip=["kick","snare","clap","rim","hat","hatOpen","ride","crash","tom","metal","shaker",null,null,null,null,null],Fr=t=>Number.isInteger(t)&&t>=1&&t<=16?Ip[t-1]??null:null;function Dp(t,e){let n=0;const a=new Map,s={sent:0,stopped:0,refused:0},r=(l,u)=>{const c=(e.origin+u)/1e3-Math.max(0,e.latency()),d=e.beatAt(c),p=d===null||!Number.isFinite(d)?{...l,beat:0,stopped:!0}:{...l,beat:d};try{t({v:1,kind:"played",events:[p]})?"stopped"in p?s.stopped++:s.sent++:s.refused++}catch{s.refused++}},o=(l,u)=>{const c=a.get(l);c&&(a.delete(l),r({type:"note",id:c.id,on:!1,note:c.note},u))};return{pad(l,u,c,d){const p=Fr(l);if(!p)return;if(!u){o(l,d);return}a.has(l)&&o(l,d);const m=`m|${++n}`,g=Aa[p];a.set(l,{id:m,note:g});const w=Math.min(1,Math.max(.01,Number.isFinite(c)?c:.8));r({type:"note",id:m,on:!0,note:g,velocity:w},d)},releaseAll(l){for(const u of[...a.keys()])o(u,l)},stats:s}}const Rp=-11,zr=10**(Rp/20),Ta={knee:.6,ceiling:.944,range:4,points:8193};function Op(t,{knee:e,ceiling:n}=Ta){const a=Math.abs(t);if(a<=e)return t;const s=n-e;return Math.sign(t)*(e+s*Math.tanh((a-e)/s))}function _p({range:t,points:e}=Ta){const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=Op((2*a/(e-1)-1)*t);return n}function Bp(t){const e=t.createGain();e.gain.value=zr;const n=t.createGain();n.gain.value=1/Ta.range;const a=t.createWaveShaper();return a.curve=_p(),a.oversample="none",e.connect(n).connect(a),{input:e,output:a}}const es="/rhythm/assets/processor-BwW_6CFR.js";function Hp(){try{return globalThis.localStorage??null}catch{return null}}function Ma(t,e,n=e,a=Hp()){if(!t||typeof t.storageKey!="function")return n;const s=t.storageKey(e);if(typeof s!="string"||!s||s===n)return n;try{if(t.legacyCopy!==!1&&a&&a.getItem(s)===null){const r=a.getItem(n);r!==null&&a.setItem(s,r)}}catch{}return s}const qp="instance",jp=99;function ln(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(qp)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=jp?n:1}function Yt(t,e){return e===1?t:`${t}#${e}`}function Up(t,e){return e===1?t:`${t} ${e}`}let _e;function Gp(t,e=ln()){if(_e!==void 0)return _e;_e=null;try{if(typeof window>"u"||window.parent===window)return _e;const n=window.parent.ncStudio;n&&n.version===1&&(_e=n.attach(t,{instance:e}))}catch{}return _e}function Kp(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,s,r)=>n.request(`${a}${e}`,s,r)}:null}}function Wp(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function vt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function Xt(t,e=ln()){return e>1?`${t}#${e}`:t}function Vp(t,e=ln()){const n=vt()?.owner()??null;return n===null||n==="studio"||n===Xt(t,e)}function Yp(t,e,n,a){return e&&!t.running&&n?!a():t.sittingOut}function Xp(t,e=4){return Number.isFinite(t)&&t>=0&&t<e}function Jp(t,e=globalThis){typeof e.requestIdleCallback=="function"?e.requestIdleCallback(t,{timeout:250}):e.setTimeout(t,50)}function Qp(t,e){let n=null;const a=()=>(n??=(async()=>{for(const s of e)await t.audioWorklet.addModule(s);return t})(),n.catch(()=>{n=null}),n);return{preload(){a().catch(()=>{})},load:a}}const Pr=new URLSearchParams(location.search),W=Pr.has("measure"),oe=ln(),I=Gp("petra-rhythm",oe),ts=I?.holdFirstPlay?.()??(()=>{}),La=Up(Tu,oe),Zp=Ma(I,"petra-rhythm.linkslots",Yt("petra-rhythm.linkslots",oe)),eh=Wl(Zp),th=!(W&&Pr.get("clockStepFix")==="0");let Qn=0;const nh=.05;W&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const Le=[40,240],v=new lp,Ca=W?Yt(We,oe):Ma(I,We,Yt(We,oe)),lt=W?null:Au(localStorage,location.search,Ca),Zn=W||lt?null:Eu(localStorage,location.search,Ca);if(lt)v.doc=lt.doc,v.bank=lt.bank,v.selectTrack(lt.selectedTrack);else if(!W&&!Zn&&I?.legacyCopy===!1)for(const t of v.doc.tracks)t.steps=t.steps.map(()=>({on:!1,accent:!1,velocity:.8}));const cn=W?null:Su(localStorage,()=>({doc:v.doc,bank:v.bank,selectedTrack:v.selectedTrack}),xr,Ca);if(W){for(const e of v.doc.tracks)e.solo=e.voice==="kick";const t=v.doc.tracks.find(e=>e.voice==="kick");t&&(t.params.decay=nh)}const P=new Vo({bpm:v.doc.bpm,minBpm:Le[0],maxBpm:Le[1],timebase:"shared"}),Na=document.querySelector("#app");if(!(Na instanceof HTMLElement))throw new Error("Missing #app");const ah=Lu(Na);up();Gu();const ih=np({voiceOf:t=>v.doc.tracks.find(e=>e.id===t)?.voice,selectedVoice:()=>v.doc.tracks[de()]?.voice}),J=new Sp(document.body,()=>{const t=document.querySelector("#play")?.closest(".nc-module");return t&&t.getBoundingClientRect().width<window.innerWidth/2?t:null});let T=null;W&&(window.__audioInfo=()=>T?{sampleRate:T.sampleRate,outputLatency:T.outputLatency,baseLatency:T.baseLatency,state:T.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",t=>{window.__errors?.push(String(t.reason))}),window.__toggle=()=>Hr(),window.__clockStep=t=>{Qn=t},window.__debug=()=>({audio:T?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:T?.getOutputTimestamp?.()??null,currentTime:T?.currentTime??null,reanchors:me?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let K=null,pe=null,me=null,Jt=0,ea=0;function sh(){return T?T.state==="running"?"running":T.state==="suspended"?"suspended":T.state==="interrupted"?"interrupted":"none":"needs-gesture"}const _=new rl({...Kp(),app:La,version:"0.1.0",clock:P,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:Le},audio:sh,outputLatencyMs:()=>me?.outputLatencyMs??null,swing:()=>v.liveSwing,startGate:()=>me?me.whenSettled():null});let Ge="",Ir=0,Dr=!1,ns=Number.NEGATIVE_INFINITY,Be=null;const q=new fa;let ee=!1,ta=Number.NEGATIVE_INFINITY;function V(t=j()){return!ee&&P.transport.isPlayingAt(t)}function kt(t){if(!_.isLeader)return;const e=wp(performance.now(),ns,t);if(e>0){Be===null&&(Be=setTimeout(()=>{Be=null,kt(!0)},e));return}Be!==null&&(clearTimeout(Be),Be=null),_.publishState()&&(ns=performance.now())}function na(){const t=Dr?Tl(v.doc).tracks:v.doc.tracks;return ee?t.map(e=>({...e,mute:!0})):t}function xt(){if(!me)return null;const t=Math.round(me.offset*1e4)/1e4;return{offset:t,shifted:Ko(P.toSnapshot(),t,"audio")}}const Fa=new jl(({offset:t,shifted:e})=>JSON.stringify([t,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function aa(t=!1){const e=xt();e&&Fa.set(e,t)}const rh={mode:"lp",cutoff:1,resonance:0,drive:0};function ia(t){const e=bt(t),n=Ts(t);return{v:2,chain:[{id:`${n.type}-1`,type:n.type,bypass:!e.filter||t.mode==="lp"&&t.cutoff>=.999,dials:n.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let sa=null;function oh(){if(!pe)return;const t=ia(v.doc.fx),e=sa;if(sa=t,!e||e.chain.some((n,a)=>n.type!==t.chain[a]?.type)){pe.setState(t);return}t.chain.forEach((n,a)=>{const s=e.chain[a];if(s){s.bypass!==n.bypass&&pe?.setParam(n.id,"bypass",n.bypass);for(const[r,o]of Object.entries(n.dials))s.dials[r]!==o&&pe?.setParam(n.id,r,o)}})}function Rr(t,e,n,a){return{clock:t,measure:W,swing:v.followSwing??e.swing,fx:rh,...a===void 0?{}:{glideSeconds:a},tracks:n.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),...Ku(e)}}let he=null;function C(t="state"){const e=t==="state"?xt():Fa.current??xt();if(!K||!e)return;fh(),t!=="state"&&(Ge="");const{offset:n,shifted:a}=e,s=he;s!==null&&(he=null,Ge="",ta=s);const r=v.consumeGlide(),o=JSON.stringify({seen:q.lastTaken,offset:n,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:v.liveSwing,glide:r??null,tracks:na(),fx:v.doc.fx,deep:v.doc.deep});if(oh(),o===Ge)return;Ge=o;const l={...Rr(a,v.doc,na(),r),seen:q.lastTaken,...s===null?{}:{enterBeat:s}};Ir=n,K.port.postMessage({type:"state",state:l}),window.__posts?.push({why:t,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const za=I?Qp(I.ctx,[es]):Tp([es],void 0,t=>console.warn("[rhythm] audio preload failed; loading on Play instead",t));async function et(){const t=za.load();if(T)return;const e=await t;if(T){e!==T&&e.close().catch(()=>{});return}if(T=e,W){const s=T,r=s.getOutputTimestamp.bind(s);s.getOutputTimestamp=()=>{const o=r(),l=!Qn||!o.contextTime?o:{contextTime:o.contextTime+Qn/1e3,performanceTime:o.performanceTime},u=window.__ts;return u&&u.length<2e5&&u.push([performance.timeOrigin+performance.now(),l.contextTime??0,l.performanceTime??0]),l}}T.addEventListener("statechange",()=>{M(),Ne()}),me=I?.mapper??new sl(T,th?{}:{stepThresholdMs:0}),me.onStep(s=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:s.stepSeconds*1e3,confirmedAt:s.confirmedAt,reanchors:s.reanchors,revert:s.revert===!0}),aa(!0)}),me.start(),K=new AudioWorkletNode(T,"rhythm"),K.port.onmessage=s=>{if(s.data.switched!==void 0&&mh(s.data.switched),s.data.level!==void 0&&s.data.step!==void 0&&(ea=s.data.level*zr,Jt!==s.data.step&&(Jt=s.data.step,M())),!(!W||!T)){for(const r of s.data.onsets??[])window.__kicks?.push({step:r.step,beat:r.beat,shared:r.contextTime-Ir});for(const r of s.data.onsets??[]){const o=Wi(T,r.contextTime);o&&window.__onsets?.push({app:La,beat:r.beat,contextTime:r.contextTime,hidden:document.hidden,stampAgeMs:(T.currentTime-r.contextTime)*1e3,...o})}for(const r of s.data.render??[]){const o=Wi(T,r.contextTime);o&&window.__render?.push({contextTime:r.contextTime,peak:r.peak,playedMs:o.playedMs})}}},pe=yu(T,{moduleUrl:Wp()??vu,slots:3,state:ia(v.doc.fx)}),sa=ia(v.doc.fx),K.connect(pe.input),window.__hacks=()=>({state:pe?.getState(),status:pe?.status}),window.__rhythmLevel=()=>ea;const n=Bp(T);pe.output.connect(n.input),n.output.connect(I?.output??T.destination);let a=!1;Fa.subscribe(()=>C(a?"clock":"attach")),P.subscribe(s=>aa(s.kind==="snapshot"&&s.replay===!0)),a=!0}const Te=new ql;let Pa=!1,Ht=null,Ve=null;function dn(){return!T||T.state!=="running"}function lh(){return Ve=Te.mode(dn(),V()),Ve}function Ia(){return Ht??=(async()=>{try{he=Number.POSITIVE_INFINITY,T&&C(),await et(),T&&T.state!=="running"&&await T.resume();const t=P.transport;he=Te.enter(t.beatAt(j()),t.bpm),ra&&(ra=!1,he=Math.floor(t.beatAt(j())/4)*4);const e=he;Pa=!0,Ra(),C(),W&&(window.__join={...Te.toJSON(),tapBeat:Or,sentBeat:e})}catch(t){throw Te.cancel(),he=Number.NEGATIVE_INFINITY,C(),t}})().finally(()=>{Ht=null,M(),Ne()}),Ht}let Or=Number.NaN,ra=!1;function _r(t){const e=t instanceof KeyboardEvent&&t.repeat;Te.gesture(dn(),V(),e)&&(Or=P.transport.beatAt(j()),Ia().catch(Br))}document.addEventListener("pointerdown",_r,{capture:!0});document.addEventListener("keydown",_r,{capture:!0});document.addEventListener("pointerup",()=>{Te.pending&&T&&T.state!=="running"&&T.resume()},{capture:!0});function Br(t){console.warn("[rhythm] audio couldn't start",t),re.say("Audio couldn't start. Press Play to try again."),M()}function Da(){ch().catch(Br)}async function ch(){if(Te.swallowClick(dn(),V())){await Ia();return}await Hr()}let st=null;function Ne(){if(st!==null&&(clearTimeout(st),st=null),!dn())return;It(!0,V())!==Ve&&M();const t=j(),{startTime:e,stopTime:n}=P.transport,a=[e,n].filter(r=>r!==null&&r>t);if(a.length===0)return;const s=Math.min((Math.min(...a)-t)*1e3+1,2**31-1);st=setTimeout(()=>{st=null,Ne()},s)}const dh=1500;function uh(t){let e,n;const a=new Promise(o=>{e=setTimeout(()=>o(!1),dh)}),s=new Promise(o=>{n=()=>{t.state==="running"&&o(!0)},t.addEventListener("statechange",n)}),r=t.resume().then(()=>t.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),n&&t.removeEventListener("statechange",n)})}let Cn=!1;function ph(){T?T.state!=="running"&&T.resume().catch(()=>{}):za.load().catch(()=>{})}async function Hr(){if(Cn){ph();return}Cn=!0;try{if(await et(),!T)return;if(T.state!=="running"&&!await uh(T)&&!V()){re.say("Tap Play to start audio"),M();return}}finally{Cn=!1}if(I&&P.transport.isPlayingAt(j())){ee?(ee=!1,he=Math.ceil(P.transport.beatAt(j())/4-1e-9)*4):ee=!0,v.playing=V(),Ge="",C(),M(),ee&&vt()?.out?.(Xt("petra-rhythm",oe));return}if(V()){P.stop({at:j()});return}I&&vt()?.claim(Xt("petra-rhythm",oe)),P.play({at:j()}),!_.isLeader&&[..._.peers.values()].some(t=>t.leader)&&(Pa=!0,Ra(),M())}const re=new bp(()=>M()),hh=6e3;Zn&&re.say(Zn,hh);function Ce(){return Pa&&!_.isLeader}function Ra(){!Ce()||!v.adoptSwing(_.swing)||(C(),M())}function qr(t,e,n){const a=v.peek(t),s=xt();if(!a||!K||!s)return!1;const r=P.transport.beatAt(j()),o=q.recall(t,r,{glide:e},n===void 0?{}:{atBeat:n});return Kr(o,a,s.shifted),!0}let jr="";function Ur(t){return Ce()?v.followSwing??t.swing:t.swing}function Gr(t,e){return JSON.stringify([t,Ur(e),e.fx,e.tracks,e.deep])}function Kr(t,e,n){if(!K)return;jr=Gr(t.id,e);const a={...Rr(n,e,e.tracks,t.payload.glide),swing:Ur(e),atBeat:t.atBeat,switchId:t.id,slot:t.slot};K.port.postMessage({type:"state",state:a})}function fh(){const t=q.pending;if(!t||!K)return;const e=v.peek(t.slot);if(!e){q.cancel();return}if(Gr(t.id,e)===jr)return;const n=xt();n&&Kr(t,e,n.shifted)}function Oa(t,e){const n=v.liveSwing;return v.recall(t,e)?(Ce()||(v.followSwing=null),v.liveSwing!==n&&kt(!0),!0):!1}function mh(t){const e=q.takeHeld(t);e&&(Oa(e.slot,e.payload.glide),v.consumeGlide(),C(),M())}function Wr(t){if(q.cancel(),!Oa(t,v.recallGlideSeconds))return;const e=v.recallGlideSeconds>0?v.recallGlideSeconds:0;_.sendSnapshot("recall",t,{atBeat:P.transport.beatAt(j()),...e>0?{glide:{seconds:e}}:{}})}function gh(t){if(q.tap(t,V()).kind==="queue"){const n=v.recallGlideSeconds>0?v.recallGlideSeconds:0;if(qr(t,n,Cs(P.transport.beatAt(j())))){const a=q.pending?.atBeat;_.sendSnapshot("recall",t,{...a===void 0?{}:{atBeat:a},...n>0?{glide:{seconds:n}}:{}});return}}Wr(t)}function Ye(t,e){const n=Rn[t]??"";if(e==="store")v.store(t),re.say(Mn(e,n,!0));else if(e==="clear"){const a=v.bank.slots[t]!=null;if(q.queued===t){const s=q.drop();q.cancel();const r=v.bank.active;s&&r!=null&&_.sendSnapshot("recall",r,{atBeat:s.atBeat})}v.clear(t),re.say(Mn(e,n,a)),a&&J.show(le,`Slot ${n} cleared`)}else v.bank.slots[t]==null?re.say(Mn(e,n,!1,matchMedia("(pointer: coarse)").matches)):gh(t);C(),M()}function le(){v.undoSurprise()&&(J.dismiss(),C(),M())}function bh(t){const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((t.metaKey||t.ctrlKey)&&t.key==="z"&&!t.shiftKey){t.preventDefault(),le();return}if(t.code==="Space"){t.preventDefault(),t.repeat||Da();return}const n=t.code.startsWith("Digit")?Number(t.code.slice(5)):Number.NaN;if(!Number.isInteger(n))return;const a=n===0?9:n-1;a<0||a>=pa||(t.preventDefault(),t.shiftKey?Ye(a,"store"):t.altKey?Ye(a,"clear"):Ye(a,"recall"))}const yh=new Ul({min:Le[0],max:Le[1]});function oa(t){v.doc.bpm=t,P.setTempo({bpm:t}),C(),M()}function wh(){return Ce()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Vr(){const t=V(),e=lh(),n=Ce();return{id:"transport",title:"Transport",summary:t?"playing":"stopped",status:re.text,controls:[{type:"button",id:"play",label:Ls(e),on:e==="stop",...e==="join"?{ariaLabel:Ms}:{},onPress:()=>Da(),onSparkle:()=>{v.surprise(),C(),M(),J.show(le)}},...I?[]:[{type:"slider",id:"bpm",label:"Tempo",min:Le[0],max:Le[1],step:1,value:P.transport.bpm,onChange:oa,onTap:a=>{const s=yh.tap(a);s!==null&&s!==P.transport.bpm&&oa(s)}}],{type:"group",id:"transport-more",title:Nn()?"Swing & sync":"Swing",summary:rn([["Swing",ti(v.liveSwing)],...Nn()?[["Sync",_.isLeader?"leader":"follower"]]:[]]),controls:[{type:"slider",id:"swing",label:n?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:v.liveSwing,valueText:ti(v.liveSwing),disabled:n,modulated:n&&v.followSwing!=null,onChange:a=>{Ce()||Ht||(v.setSwing(a),kt(!1),C(),M())},onCommit:()=>{kt(!0)}},..._.isLeader||I?[]:[{type:"note",id:"swing-note",text:wh()}],...Nn()?[{type:"readout",id:"role",label:"Sync",value:_.isLeader?"leader":"follower"}]:[]]},{type:"group",id:Jn,title:"Presets",summary:fp(v.bank.slots.map(a=>a!=null),v.bank.active??null,Rn),onToggle:a=>{a&&_a()},controls:[{type:"note",id:"preset-now",text:""},{type:"slotRow",id:"slots",morph:v.morphSeconds,morphText:gp(v.morphSeconds),slots:Rn.map((a,s)=>({label:a,filled:v.bank.slots[s]!=null,active:v.bank.active===s,edited:v.edited===s,queued:q.queued===s,pulse:q.queued===s&&t&&Jt%4<2})),onMorph:a=>{v.morphSeconds=a,M()},onSlot:(a,s)=>{Ye(a,s)}},{type:"note",id:"preset-lib",text:""}]}]}}const as="triki.share.by";let He=null,is=!1;function _a(){const t=St.el,e=t.querySelector(`[data-nc-id="${Jn}"]`);if(!He){if(is||e?.dataset.ncOpen!=="true")return;is=!0,hs(async()=>{const{createPetraPresets:n}=await import("./preset-library-mount-CwR-kAeB.js");return{createPetraPresets:n}},__vite__mapDeps([0,1])).then(({createPetraPresets:n})=>{wo(),He=n({doc:()=>v.doc,load:(a,s)=>{v.loadGroove(a),C(),M(),J.show(le,`${s.name} loaded`)},slots:()=>v.bank.slots,putSlot:(a,s)=>{v.putSlot(a,s),C(),M()},by:()=>{try{return(localStorage.getItem(as)??"").slice(0,40)}catch{return""}},setBy:a=>{try{localStorage.setItem(as,a.trim().slice(0,40))}catch{}}}),_a()});return}ft(t,"preset-now",He.now.el),ft(t,"preset-lib",He.lib.el),He.max.sync(t.querySelector(`[data-nc-id="${Jn}"]`)),He.refresh()}function Nn(){return!I&&_.peers.size>0}function de(){const t=v.doc.tracks.length;return t===0?0:Math.min(v.selectedTrack,t-1)}let qe=[];function Xe(){const t=v.doc.tracks,e=t[de()]?.id,n=qe.filter(a=>t.some(s=>s.id===a));return e&&!n.includes(e)&&n.unshift(e),n}function vh(t,e=!1){const n=v.doc.tracks,a=n[t]?.id;if(!a)return;if(!e){qe=[],v.selectTrack(t);return}const s=Xe();if(s.includes(a)&&s.length>1){if(qe=s.filter(r=>r!==a),n[de()]?.id===a){const r=n.findIndex(o=>o.id===qe[qe.length-1]);r>=0&&v.selectTrack(r)}}else qe=s.includes(a)?s:[...s,a],v.selectTrack(t)}const ss={stroke:"M13 8H3M7 4 3 8l4 4"},rs={stroke:"M3 8h10M9 4l4 4-4 4"},os=[{id:"shift",label:"Shift",moves:[{id:"shift-left",text:"Left",icon:ss},{id:"shift-right",text:"Right",icon:rs},{id:"shift-random",text:"Random",icon:{stroke:"M3 3h10v10H3zM6 6h0M8 8h0M10 10h0"}},{id:"reverse",text:"Reverse",icon:{stroke:"M2 5h11M10 2l3 3-3 3M14 11H3M6 8l-3 3 3 3"}}]},{id:"groove",label:"Groove",moves:[{id:"groove-left",text:"Left",icon:ss},{id:"groove-right",text:"Right",icon:rs}]},{id:"hits",label:"Hits",moves:[{id:"shuffle",text:"Shuffle",icon:{stroke:"M2 4.5h2.5l6 7H14M2 11.5h2.5l6-7H14M12 2.5l2 2-2 2M12 9.5l2 2-2 2"}},{id:"mutate",text:"Mutate",icon:{fill:"M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z"}}]}];function kh(){const t=Xe(),e=v.doc.tracks.filter(n=>t.includes(n.id));return{type:"moves",id:"moves",label:"Pattern moves",groups:os.map(n=>({...n,moves:n.moves.map(a=>({...a,disabled:!rp(a.id,e)}))})),onMove:n=>{const a=os.flatMap(l=>l.moves.map(u=>({...u,group:l.label}))).find(l=>l.id===n);if(!a)return;const s=Xe(),r=v.doc.tracks.flatMap((l,u)=>s.includes(l.id)?[u]:[]);if(!v.moveTracks(r,a.id))return;C(),M();const o=r.length===1?v.doc.tracks[r[0]??0]?.name??"":`${r.length} tracks`;J.show(le,`${a.group} ${a.text.toLowerCase()}: ${o}`)}}}function Yr(){const t=v.doc.tracks[de()];return{id:"pattern",title:"Pattern",lead:!0,summary:t?`${v.doc.tracks.length} tracks · ${t.name}`:`${v.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:Ve==="stop",label:Ls(Ve??"play"),...Ve==="join"?{ariaLabel:Ms}:{},onToggle:()=>Da()},id:"grid",playhead:V()?Jt:-1,selectedRow:t?.id,selectedRows:Xe(),onSelectRow:(e,n)=>{vh(e,n),M()},onDice:e=>{const n=v.doc.tracks[e]?.name??"Lane";v.diceLane(e)&&(C(),M(),J.show(le,`New ${n} steps`))},onFill:e=>{Dr=e,C(),M()},onClear:()=>{v.clearSteps()&&(C(),M(),J.show(le,"Pattern cleared"))},onLength:(e,n)=>{v.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(n))))}),C(),M()},onMute:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.mute=!a.mute)}),C(),M()},onSolo:e=>{v.edit(n=>{const a=n.tracks[e];a&&(a.solo=!a.solo)}),C(),M()},onToggle:(e,n,a)=>{v.edit(s=>{const r=s.tracks[e]?.steps[n];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),C(),M()},onLongPress:(e,n,a)=>{const s=v.doc.tracks[e],r=s?.steps[n];!s||!r||Md({anchor:a,title:`${s.name} · step ${n+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{v.edit(u=>{const c=u.tracks[e]?.steps[n];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),C(),M()}})},onSet:(e,n,a,s)=>{v.edit(r=>{const o=r.tracks[e]?.steps[n];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),C(),M()},rows:v.doc.tracks.map((e,n)=>({id:e.id,label:e.name,lane:n%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))},{type:"group",id:"moves-more",title:"Moves",summary:`Shift · Groove · Hits on ${Xe().length>1?`${Xe().length} lanes`:t?.name??"the lane"}`,controls:[kh()]}]},$h(),zh()]}}function xh(t,e=!1){if(!e&&V())return;const n=()=>K?.port.postMessage({type:"audition",voice:t,velocity:.8});if(I){T?.state==="running"&&n();return}et().then(async()=>{T&&T.state!=="running"&&await T.resume(),n()}).catch(()=>{})}function tt(t=!1){const e=v.doc.tracks[de()];e&&xh(e.voice,t)}function $h(){const t=v.doc,e=t.tracks.some(a=>a.source!=="classic"),n=[{type:"note",id:"deep-kit",text:$t().line}];if(e){const a=t.deep.character,s=(l,u,c)=>{const d=Eo[l];return on({type:"slider",id:`deep-${l}`,label:u,min:d.min,max:d.max,step:d.step,value:a[l],valueText:c(a[l]),onChange:p=>{v.edit(m=>{m.deep.character[l]=p}),C(),M()},onCommit:()=>tt()},l==="lowCut"||l==="highCut"?"freq":"linear")},r=l=>l<=0?"off":Z(l),o=[s("sat","Saturation",r),s("lowCut","Low cut",l=>zt(l,20)),s("highCut","High cut",l=>zt(l,2e4))];n.push(s("room","Room",r),s("grit","Grit",r),s("hiss","Hiss",r),{type:"group",id:"deep-kit-more",title:"More",summary:rn([["Saturation",r(a.sat)],["Low cut",zt(a.lowCut,20)],["High cut",zt(a.highCut,2e4)]]),controls:o})}return{id:"sound",title:"Sound",panel:!0,subject:$t().label,controls:n}}const Xr=Ma(I,"petra-rhythm.kits",Yt("petra-rhythm.kits",oe));let ce=W?[]:(()=>{try{return bo(localStorage.getItem(Xr))}catch{return[]}})();function Qt(t){if(ce=t,!W)try{localStorage.setItem(Xr,Ro(t))}catch{}}function Sh(t){const e=t.deep.name;return e?ce.find(n=>Me(n.name,e))??null:null}function $t(){const t=v.doc,e=en(t),n=t.deep.name??null,a=Sh(t),s=e.uniform===null,r=n?a?!vo(t,a):!1:ko(t),o=s?xo(t,e):Va(e.uniform??"classic"),l=u=>`${u} ${u===1?"drum":"drums"}`;return{label:n??(s?"Mixed":Ae(e.uniform??"classic")),line:r?`Edited · ${o}`:o,mixed:s,kits:je.map(u=>{const c=e.counts[u]??0,d=!n&&e.uniform===u;return{id:u,name:Ae(u),line:Va(u),...d?{mark:"current"}:s&&c?{mark:"used"}:{},...s&&c?{count:l(c)}:{}}}),saved:ce.map(u=>({id:u.name,name:u.name,line:So(u),...n&&Me(n,u.name)?{mark:"current"}:{}})),suggest:$o(t)}}function Jr(t){const n=$t().mixed||!!v.doc.deep.name;n?v.undoableEdit(a=>Xa(a,t)):v.edit(a=>Xa(a,t)),C(),M(),tt(),n&&J.show(le,`Every drum now ${Ae(t)}`)}function Eh(t){const{base:e}=en(v.doc),n=je.indexOf(e),a=je[(n+t+je.length)%je.length];a&&Jr(a)}function Ah(t){const e=ce.find(a=>Me(a.name,t));if(!e)return;const n=$t().mixed||!!v.doc.deep.name;n?v.undoableEdit(a=>Ya(a,e)):v.edit(a=>Ya(a,e)),C(),M(),tt(),n&&J.show(le,`Every drum now ${e.name}`)}function Th(t){const e=Po(v.doc,t);return e.name?(Qt(Io(ce,e)),v.edit(n=>{n.deep.name=e.name}),M(),re.say(`Saved the kit ${e.name}`),!0):!1}function Mh(t,e){const n=zo(ce,t,e),a=n.find((s,r)=>!Me(s.name,ce[r]?.name??""));return a?(Qt(n),v.doc.deep.name&&Me(v.doc.deep.name,t)&&v.edit(s=>{s.deep.name=a.name}),M(),!0):!1}function Lh(t){const e=ce;Qt(Fo(ce,t)),M(),J.show(()=>{Qt(e),J.dismiss(),M()},`Deleted the kit ${t}`)}function Ch(t){const e=de(),n=v.doc.tracks[e]?.source;n===void 0||n===t||(v.edit(a=>{Do(a,e,t)}),C(),M(),tt())}const Nh=["tune","decay","snap","sizzle","level"];function Fh(t){if(!t)return[];const e=ps(us(t.source)??"808",t.deepVersion).voices[t.voice],n=Ao(e),a=To(e),s=c=>a&&c==="noise"?"Tone":Nu[c],r=c=>{const d=Mo(e,c),p=t.deep[c];return on({type:"slider",id:`deep-${c}`,label:s(c),min:d.min,max:d.max,step:d.step,value:p,valueText:Ri(c,p),onChange:m=>{v.edit(g=>{const w=g.tracks[de()];w&&(w.deep[c]=m)}),C(),M()},onCommit:()=>tt()},c==="decay"&&!a?"time":"linear")},o=c=>Nh.includes(c)||a&&c==="noise",l=n.filter(o).map(r),u=n.filter(c=>!o(c));return[{type:"note",id:"deep-env",text:""},...l,{type:"group",id:"deep-more",title:"More",summary:rn(u.map(c=>[s(c),Ri(c,t.deep[c])])),controls:u.map(r)}]}let Fn=null,zn=null,Pt=null;function Qr(){const t=Ze.el;Fn??=Hu({pick:Jr,step:Eh,pickSaved:Ah,save:Th,rename:Mh,remove:Lh,taken:(r,o)=>ce.some(l=>Me(l.name,r)&&!(o&&Me(l.name,o)))}),zn??=qu(Ch,je,Ae),Pt??=Bu(()=>tt(!0));const e=v.doc,n=en(e);ft(t,"deep-kit",Fn.el)&&Fn.set($t());const a=e.tracks[de()];a&&ft(t,"drum-source",zn.el)&&zn.set({drum:a.name,source:a.source,base:n.base,baseName:Ae(n.base)});const s=a?us(a.source):null;a&&s&&ft(t,"deep-env",Pt.el)?Pt.set(ps(s,a.deepVersion).voices[a.voice],a.deep,a.name):Pt.el.remove(),Tr(t,e.tracks.map(r=>({id:r.id,tag:Ae(r.source),differs:r.source!==n.base})))}function zh(){const t=de(),e=v.doc.tracks[t],n=["tune","decay","tone","snap","drive","level"],{base:a}=en(v.doc),s=e&&e.source!==a;return{id:"parameters",title:"Params",panel:!0,subject:e?s?`${e.name} · ${Ae(e.source)}`:e.name:"",lane:t%4+1,controls:[{type:"note",id:"drum-source",text:""},...e&&e.source!=="classic"?Fh(e):Dh(n,e)]}}const Ph={tune:"freq",decay:"time",tone:"linear",snap:"linear",drive:"linear",level:"linear"},Ih=t=>t.curve==="log"?"freq":/_ms$/.test(t.key)||t.key==="predelay"?"time":"linear";function Dh(t,e){const n=t.map(r=>{const o=Rl(e?.voice,r);return on({type:"slider",id:Dl(e?.voice)?`${e?.voice}-${r}`:r,label:o.label,valueText:o.text(e?.params[r]??0),min:o.min,max:o.max,step:o.step,value:e?.params[r]??0,onChange:l=>{v.edit(u=>{const c=u.tracks[de()];c&&(c.params[r]=l)}),C(),M()}},Ph[r])}),a=n.slice(2,5),s=a.map(r=>r.label.toLowerCase());return[...n.slice(0,2),{type:"group",id:"params-more",title:`${s[0]}, ${s[1]} & ${s[2]}`.replace(/^./,r=>r.toUpperCase()),summary:rn(a.map(r=>[r.label,r.valueText??""])),controls:a},...n.slice(5)]}function la(t,e){v.edit(n=>{const a=bt(n.fx);e(a[t]),n.fx.hacks=a}),C(),M()}function Rh(t,e){const n=bt(v.doc.fx)[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,s=r=>la(t,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:on({type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:gr(e,n,v.doc.bpm),onChange:s},Ih(e))}const Pn=(t,e)=>(ge(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>Rh(t,n));function Oh(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}let Zr=null;function Ba(){const t=v.doc.fx,e=bt(t),n=t.mode==="lp"&&t.cutoff>=.999,a=_l(t);Zr={mode:t.mode,...a};const s=o=>{v.edit(o),C(),M()},r=[e.filter&&!n?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:r.length?r.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:o=>s(l=>{l.fx.hacks={...bt(l.fx),filter:o}}),controls:[{type:"select",id:"mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>s(l=>{(o==="lp"||o==="hp"||o==="bp")&&(l.fx.mode=o)})},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...a},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":Oh(a.hz),onChange:o=>s(l=>{l.fx.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:Z(t.resonance),onChange:o=>s(l=>{l.fx.resonance=o})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:o=>la("drive",l=>{l.on=o}),controls:Pn("drive",!1),more:Pn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:o=>la("compressor",l=>{l.on=o}),controls:Pn("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:ea}]}]}}await fr();const St=va(Vr());sn(St.el);await ka();const Ze=va({id:"pattern",title:"Pattern",lead:!0}),Et=Qu(va({id:"filter",title:Ba().title}),()=>Zr),eo={build:()=>{Ze.update(Yr()),sn(Ze.el),Qr()}},to={build:()=>{Et.update(Ba()),sn(Et.el)}};let Zt=null;function M(){v.takeSurpriseEdit()&&J.dismiss(),St.update(Vr()),_a(),Zt?.ready(eo)&&(Ze.update(Yr()),Qr()),Zt?.ready(to)&&Et.update(Ba());for(const t of[St,Ze,Et])sn(t.el);ih.follow(),cn?.schedule()}window.addEventListener("pagehide",()=>cn?.flush());function ca(t,e,n){q.cancel(),v.replace(t,e),C(),M(),cn?.schedule(),J.show(le,n)}Cu(ah,{save:()=>{const t=v.doc.name||"rhythm",e=URL.createObjectURL(new Blob([No(v.doc,v.bank)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`${t}.rhythm`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),0),re.say(`Saved ${t}.rhythm`)},load:(t,e)=>{const n=Co(t);if(!n.ok||!n.document||!n.bank){re.say(`Couldn't load ${e}: ${n.errors[0]??"not a Rhythm file"}`);return}ca(n.document,n.bank,`Loaded ${e}`)},create:()=>ca(Lo(),ds(),"New pattern"),panic:()=>K?.port.postMessage({type:"panic"})});I?.providePreset?.(yo(()=>({doc:v.doc,bank:v.bank}),(t,e)=>{ca(t,e,"Loaded the Scene's pattern"),cn?.flush()}));let ls=P.transport.running;P.onChange(()=>{if(ee=Yp({sittingOut:ee,running:ls},P.transport.running,!!I,()=>Vp("petra-rhythm",oe)),ls=P.transport.running,v.playing=V(),!v.playing&&q.pending){const t=q.drop();t&&Wr(t.slot)}v.doc.bpm=P.transport.bpm,C(),M(),Ne()});vt()?.member?.(Xt("petra-rhythm",oe),()=>P.transport.running&&!ee);vt()?.onAll(()=>{ee&&(ee=!1,P.transport.isPlayingAt(j())&&(he=Math.ceil(P.transport.beatAt(j())/4-1e-9)*4),v.playing=V(),Ge="",C(),M())});const da=I?.notesOut?Fp(t=>I.notesOut?.(t)===!0):null;da&&setInterval(()=>{const t=P.transport,e=K&&t.running?t.beatAt(j()):null;t.running||(ta=Number.NEGATIVE_INFINITY),da.tick({beat:e,tracks:na(),swing:v.liveSwing,entry:ta})},50);const no=Pp(t=>{K?K.port.postMessage(t):et().then(()=>K?.port.postMessage(t))});I?.notesIn?.(t=>no.message(t),{takes:"layer"});let Ha=performance.timeOrigin;try{window.parent!==window&&(Ha=window.parent.performance.timeOrigin)}catch{}const ua=I?.notesOut?Dp(t=>I.notesOut?.(t)===!0,{beatAt:t=>P.transport.running?P.transport.beatAt(t):null,latency:()=>{const t=T?.outputLatency||T?.baseLatency||0;return Number.isFinite(t)?t:0},origin:Ha}):null,qt=[],_h=700;function Bh(t,e){const n=v.doc.tracks.findIndex(r=>r.voice===t);if(n<0)return;const a=document.querySelectorAll("[data-nc-row] > .nc-name")[n];if(!a)return;a.querySelector(".petra-midi-vel")?.remove();const s=document.createElement("span");s.className="petra-midi-vel",s.setAttribute("aria-hidden","true"),s.title=`vel ${Math.round(e*127)}`,s.dataset.velocity=String(Math.round(e*127)),getComputedStyle(a).position==="static"&&(a.style.position="relative"),s.style.position="absolute",s.style.left="0",s.style.bottom="0",s.style.height=i("focus-width"),s.style.width=`${Math.round(Math.max(.05,e)*100)}%`,s.style.background=i("instrument-petra"),s.style.pointerEvents="none",a.append(s),window.setTimeout(()=>s.remove(),_h)}I?.midiIn?.(t=>{if(!(!t||typeof t!="object"))try{if(t.kind==="release-all"){ua?.releaseAll(performance.now()+performance.timeOrigin-Ha);return}if(t.kind!=="pad")return;const e=Fr(t.pad);if(!e)return;const n=Math.min(1,Math.max(.01,typeof t.velocity=="number"&&Number.isFinite(t.velocity)?t.velocity:.8)),a=typeof t.at=="number"&&Number.isFinite(t.at)?t.at:performance.now();if(qt.push({pad:t.pad,voice:e,velocity:n,on:t.on===!0}),qt.length>64&&qt.splice(0,32),ua?.pad(t.pad,t.on===!0,n,a),t.on!==!0)return;K&&T?.state==="running"&&K.port.postMessage({type:"audition",voice:e,velocity:n}),Bh(e,n)}catch{}},{keys:!1,pads:!0});window.__lupa={out:da?.stats??null,layer:no.stats};window.__NC_MIDI__={read:()=>({hits:qt.slice(),out:ua?.stats??null})};_.onSwing(t=>{Ce()&&v.adoptSwing(t)&&C(),M()});_.onSnapshot(t=>{if(t.op!=="recall")return;const e=_.peers.get(t.from)?.app;if(!Vl(La,e,eh)){window.__ignoredRecalls?.push({slot:t.slot,app:e??null});return}window.__recalls?.push({slot:t.slot,atBeat:t.atBeat??null,shared:j()});const n=t.glide?.seconds??0;if(V()&&qr(t.slot,n,t.atBeat)){M();return}q.cancel(),Oa(t.slot,n),C(),M()});_.onRole(()=>{Ra(),M(),Ne()});_.onPeers(()=>{M(),Ne()});W&&(window.__rhythm={setKick:t=>{v.edit(e=>{const n=e.tracks.find(a=>a.voice==="kick");n&&n.steps.forEach((a,s)=>{a.on=t.includes(s)})}),C(),M()},store:t=>Ye(t,"store"),tap:t=>Ye(t,"recall"),tempo:t=>oa(t),beat:()=>P.transport.beatAt(j()),timeAt:t=>P.transport.timeAt(t),slots:()=>({active:v.bank.active??null,queued:q.queued}),swing:()=>{const t=v.bank.active;return{live:v.liveSwing,doc:v.doc.swing,slot:t==null?null:v.bank.slots[t]?.swing??null,leader:_.isLeader}},setSwing:t=>{v.setSwing(t),kt(!0),C(),M()},lateEnter:()=>{ra=!0},audio:async()=>(await et(),await T?.resume(),T?.state??"none")});await ka();await _.start();document.addEventListener("keydown",bh);Od(Na,[St,Ze,Et],"adjacent");await ka();M();Zt=Bd([eo,to]);Ne();Zt.done.then(()=>{za.preload(),I&&et().then(()=>{Jp(ts),!(!V()||T?.state!=="running")&&(Xp(P.transport.beatAt(j()))||Ia())}).catch(ts),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const t=V();if(t!==v.playing&&(v.playing=t,M()),aa(),C(),!W||!T)return;const e=pp(T);e&&window.__stamps?.push(e)},250);
