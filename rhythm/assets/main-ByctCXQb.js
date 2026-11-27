const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/preset-library-mount-CwR-kAeB.js","assets/studio-preset-BbaiSdKB.js"])))=>i.map(i=>d[i]);
import{S as La,c as qo,a as ui,b as jo,v as i,p as j,d as Go,r as Os,e as U,f as Uo,g as Ko,h as Un,O as xn,l as Wo,i as Vo,j as Kn,K as Yo,k as Xo,m as Rs,w as Jo,s as Qo,n as Zo,o as pi,q as el,t as tl,u as Wn,x as nl,y as pn,z as De,A as _s,B as Bs,C as al,D as il,E as sl,F as hi,G as rl,H as Oe,I as ol,J as Xe,L as ll,M as cl,N as dl,P as ul,Q as pl,R as hl,T as fl,U as ml,V as gl,W as bl,X as yl,Y as fi,Z as mi,_ as wl,$ as vl}from"./studio-preset-BbaiSdKB.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();const kl="modulepreload",xl=function(t){return"/rhythm/"+t},gi={},Hs=function(e,n,a){let s=Promise.resolve();if(n&&n.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),d=l?.nonce||l?.getAttribute("nonce");s=o(n.map(c=>{if(c=xl(c),c in gi)return;gi[c]=!0;const u=c.endsWith(".css"),p=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":kl,u||(f.as="script"),f.crossOrigin="",f.href=c,d&&f.setAttribute("nonce",d),document.head.appendChild(f),u)return new Promise((b,g)=>{f.addEventListener("load",b),f.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})},je=1e-9;function $l(t,e,n,a=120){return Number.isFinite(t)?Math.min(n,Math.max(e,t)):Math.min(n,Math.max(e,a))}class Ca{minBpm;maxBpm;maxPoints;segs;constructor(e={}){this.minBpm=e.minBpm??1,this.maxBpm=e.maxBpm??999,this.maxPoints=Math.max(2,e.maxPoints??4096);const n=e.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(e.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(e=>({beat:e.beat,bpm:e.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(e){return $l(e,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(e,n){const a=n.filter(o=>Number.isFinite(o.beat)&&Number.isFinite(o.bpm)).slice().sort((o,l)=>o.beat-l.beat);let s=a.length?a[0].bpm:this.bpm;for(const o of a)o.beat<=e.beat+je&&(s=o.bpm);const r=[{beat:e.beat,time:e.time,bpm:this.clamp(s)}];for(const o of a){if(o.beat<=e.beat+je)continue;const l=this.clamp(o.bpm);l!==r[r.length-1].bpm&&r.push({beat:o.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(e,n=this.bpm){this.segs=[{beat:e.beat,time:e.time,bpm:this.clamp(n)}]}setTempoAt(e,n){if(e=this.clamp(e),!Number.isFinite(n)||n<=this.segs[0].beat+je){this.segs=[{...this.segs[0],bpm:e}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-je;)this.segs.pop();this.segs[this.segs.length-1].bpm!==e&&(this.segs.push({beat:n,time:0,bpm:e}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(e,n,a,s=.25){const r=this.bpmAt(n);if(!(a>0)||!(s>0)){this.setTempoAt(e,n);return}const o=Math.max(1,Math.round(a/s));this.setTempoAt(r,n);for(let l=1;l<=o;l++)this.setTempoAt(r+(e-r)*l/o,n+a*(l-1)/o)}prune(e){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=e&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(e){return this.segAtBeat(e).bpm}timeAt(e){const n=this.segAtBeat(e);return n.time+(e-n.beat)*60/n.bpm}beatAt(e){const n=this.segAtTime(e);return n.beat+(e-n.time)*n.bpm/60}clone(){const e=new Ca({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return e.segs=this.segs.map(n=>({...n})),e}shift(e){this.segs[0].time+=e,this.recompute(1)}recompute(e){for(let n=Math.max(1,e);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=e+je)return n[a];return n[0]}segAtTime(e){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=e+je)return n[a];return n[0]}}const Sl=Object.freeze({beatsPerBar:4,beatUnit:4}),Qe=1e-9;function El(t){return Math.floor(t+Qe)}function qs(t,e,n=!1){if(!(e>0))return t;const s=Math.ceil(t/e-Qe)*e;return n&&s<=t+Qe?s+e:s}class Al{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(e={}){this.tempo=new Ca({bpm:e.bpm,minBpm:e.minBpm,maxBpm:e.maxBpm}),this.meter={...e.meter??Sl}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(e){return this.startTime!==null&&e>=this.startTime-Qe&&(this.stopTime===null||e<this.stopTime-Qe)}start(e){const n=e.beat??0;this.tempo.restart({beat:n,time:e.at},e.bpm??this.tempo.bpm),this.startTime=e.at,this.stopTime=null,this.stoppedBeat=n}stop(e){if(this.startTime===null)return;const n=Math.max(e.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(e=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=e}setTempo(e,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(e,a.beat),a.beat}return this.tempo.setTempoAt(e,n),n}beatAt(e){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&e>=this.stopTime-Qe?this.stoppedBeat:this.tempo.beatAt(e)}timeAt(e){return this.tempo.timeAt(e)}position(e){const n=Math.max(1,this.meter.beatsPerBar),a=El(e/n),s=Math.max(0,e-a*n);return{beat:e,bar:a,beatInBar:s,barPhase:s/n}}nextBar(e,n=!1){return qs(e,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const js="nc-clock/snapshot",Gs=1;function Tl(t,e="local"){return{format:js,version:Gs,timebase:e,anchor:t.tempo.anchor,tempo:t.tempo.points,meter:{...t.meter},playing:t.running,startTime:t.startTime,stopTime:t.stopTime,stoppedBeat:t.stoppedBeat}}function Ml(t,e){const n=Cl(e);t.tempo.reset(n.anchor,n.tempo),t.meter={...n.meter},t.startTime=n.startTime,t.stopTime=n.stopTime,t.stoppedBeat=n.stoppedBeat}function Ll(t,e,n=t.timebase){const a=s=>s===null?null:s+e;return{...t,timebase:n,anchor:{beat:t.anchor.beat,time:t.anchor.time+e},tempo:t.tempo.map(s=>({...s})),meter:{...t.meter},startTime:a(t.startTime),stopTime:a(t.stopTime)}}const we=t=>typeof t=="number"&&Number.isFinite(t),bi=t=>t===null||we(t);function Cl(t){const e=t,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!e||typeof e!="object")&&n("not an object"),e.format!==js&&n("format"),(!we(e.version)||Math.floor(e.version)!==Gs)&&n(`unsupported version ${String(e.version)}`),(!e.anchor||!we(e.anchor.beat)||!we(e.anchor.time))&&n("anchor"),(!Array.isArray(e.tempo)||!e.tempo.length||!e.tempo.every(a=>a&&we(a.beat)&&we(a.bpm)&&a.bpm>0))&&n("tempo"),(!e.meter||!we(e.meter.beatsPerBar)||e.meter.beatsPerBar<1||!we(e.meter.beatUnit))&&n("meter"),(!bi(e.startTime)||!bi(e.stopTime)||!we(e.stoppedBeat))&&n("transport times"),e}class Nl{transport;timebase;authority=null;listeners=new Set;constructor(e={}){this.transport=new Al(e),this.timebase=e.timebase??"local"}get external(){return this.authority!==null}setAuthority(e){this.authority=e}onChange(e){return this.listeners.add(e),()=>{this.listeners.delete(e)}}subscribe(e){const n=this.onChange(e);return e({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(e){return this.authority?(this.authority.requestStart(e),!1):(this.commitStart(e.at,e.beat??0,e.bpm),!0)}stop(e){return this.authority?(this.authority.requestStop(e),!1):(this.commitStop(e.at,e.all??!1),!0)}setTempo(e){return this.authority?(this.authority.requestTempo(e),!1):(this.commitTempo(e.bpm,e.atBeat),!0)}setMeter(e){this.transport.meter={...e}}commitStart(e,n=0,a){this.transport.start({at:e,beat:n,bpm:a}),this.emit({kind:"start",at:e,beat:n})}commitStop(e,n=!1){this.transport.stop({at:e}),this.emit({kind:"stop",at:e,all:n})}commitTempo(e,n){const a=this.transport.setTempo(e,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(e){Ml(this.transport,e),this.emit({kind:"snapshot",snapshot:e})}toSnapshot(){return Tl(this.transport,this.timebase)}emit(e){for(const n of[...this.listeners])n(e)}}const Fl="nc-sync/1",zl=1,Pl="nc-sync",Dl="nc-sync-leader",Il=0,Us=.5,Ks=.75;function Ol(t){return typeof t=="number"&&Number.isFinite(t)&&t>=Us&&t<=Ks?t:null}const $n=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),ct=t=>typeof t=="number"&&Number.isFinite(t),Pt=t=>typeof t=="string"&&t.length>0;function Rl(t){const e=t;if(!e||typeof e!="object"||typeof e.proto!="string"||!e.proto.startsWith("nc-sync/")||parseInt(e.proto.slice(8),10)!==zl||!Pt(e.type)||!Pt(e.from)||!ct(e.term)||!ct(e.seq)||!ct(e.sentAt))return null;switch(e.type){case"hello":return Pt(e.app)&&typeof e.capabilities=="object"&&e.capabilities?e:null;case"bye":return e;case"heartbeat":return e;case"state":return e.clock&&typeof e.clock=="object"?e:null;case"transport":return e.action==="start"||e.action==="stop"?e:null;case"tempo":return ct(e.bpm)&&e.bpm>0?e:null;case"snapshot":return(e.op==="recall"||e.op==="stopSequence"||e.op==="store")&&ct(e.slot)?e:null;case"ping":case"pong":return Pt(e.id)?e:null;case"notes":return Array.isArray(e.notes)?e:null;default:return null}}function _l(t,e,n,a,s){return{proto:Fl,from:e,term:n,seq:a,sentAt:s,...t}}function W(){return(performance.timeOrigin+performance.now())/1e3}const Sn=.003,Bl=3,En=.002+1e-6,Hl=.01,yi=500;class ql{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const e=this.ctx;if(e.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=e.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=e.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Hl:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(e,n={}){this.ctx=e,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(e){return this.stepListeners.add(e),()=>{this.stepListeners.delete(e)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=e?.contextTime??0,a=e?.performanceTime??0;if(!(n>=Sn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const s=n-(this.timeOrigin+a)/1e3,r=this.median(),o=s-r,l=Math.abs(s-this.preStepBase),d=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(o);return!d&&Math.abs(o)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&d===this.pendingBack&&(d||Math.abs(o-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(s,r,d))):(this.pendingStep=o,this.pendingBack=d,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(e,n,a){const s=this.heldBase()!==null,r=this.ctx.currentTime,o=r<=this.revertUntil;let l;if(a&&o){const d=this.offsets,c=this.preStep;d.length=0;for(let u=0;u<c.length;u++)d.push(c[u]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(e-n)<=this.stepThreshold)return!1;if(!o){const u=this.offsets,p=this.preStep;p.length=0;for(let f=0;f<u.length;f++)p.push(u[f]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const d=this.offsets,c=e-n;for(let u=0;u<d.length;u++)d[u]+=c;this.stepCount++,l={stepSeconds:e-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!s)for(const d of[...this.stepListeners])d(l);return!0}median(){const e=this.offsets,n=this.scratch,a=e.length;n.length=a;for(let r=0;r<a;r++){const o=e[r];let l=r-1;for(;l>=0&&n[l]>o;)n[l+1]=n[l],l--;n[l+1]=o}const s=a>>1;return a%2?n[s]:(n[s-1]+n[s])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const e=this.ctx;if(e.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const s=typeof e.getOutputTimestamp=="function"?e.getOutputTimestamp():null;if(s&&Number.isFinite(s.contextTime)&&Number.isFinite(s.performanceTime)&&s.contextTime>=Sn&&s.performanceTime>0)if(this.waitSince=null,s.contextTime===this.lastStampC&&s.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<yi)return!0;e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=s.contextTime,this.lastStampP=s.performanceTime,this.stampSince=this.perfNow(),n=s.contextTime-(this.timeOrigin+s.performanceTime)/1e3,a=!0;else if(!s||!(s.contextTime>=Sn)&&!(s.contextTime>0&&!(s.performanceTime>0))){if(s){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<yi)return!1}e.currentTime>0&&(n=e.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const e=this.offsets,n=e.length,a=Math.min(Bl,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let s=-1,r=0;for(let l=0;l<n;l++){let d=0;for(let c=0;c<n;c++)Math.abs(e[c]-e[l])<=En&&d++;d>r&&(s=l,r=d)}if(r<a)return;const o=e[s];for(let l=n-1;l>=0;l--)Math.abs(e[l]-o)>En&&e.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const e=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!e||!e.contextTime||!e.performanceTime||!Number.isFinite(e.contextTime)||!Number.isFinite(e.performanceTime))return!0;const n=e.contextTime-(this.timeOrigin+e.performanceTime)/1e3;return Math.abs(n-this.estimate())<=En}whenSettled(e=1500){if(this.settledNow())return null;const n=this.perfNow()+e;return new Promise(a=>{const s=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(s,2)};setTimeout(s,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(e){return e+this.offset}toSharedTime(e){return e-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(e){const n=this.perfNow();if(!e&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,s=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(s)&&s>0?s:null}}class jl{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(e){const n=globalThis;this.clock=e.clock,this.caps={...$n,...e.capabilities},this.channelOption=e.channel??Pl,this.locks=e.locks===void 0?n.navigator?.locks??null:e.locks,this.id=e.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:e.app,version:e.version,clock:e.clock,now:e.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:e.audio??(()=>"none"),hidden:e.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:e.outputLatencyMs??(()=>null),swing:e.swing??(()=>null),heartbeatMs:e.heartbeatMs??1e3,peerTimeoutMs:e.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:e.hiddenPeerTimeoutMs??65e3,startLeadSeconds:e.startLeadSeconds??.2,minLeadSeconds:e.minLeadSeconds??.1,joinGraceMs:e.joinGraceMs??300,startGate:e.startGate??(()=>null),gatedStartLeadSeconds:e.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=e=>this.receive(e.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(e){return this.roleListeners.add(e),()=>this.roleListeners.delete(e)}onPeers(e){return this.peerListeners.add(e),()=>this.peerListeners.delete(e)}onSnapshot(e){return this.snapshotListeners.add(e),()=>this.snapshotListeners.delete(e)}onMessage(e){return this.messageListeners.add(e),()=>this.messageListeners.delete(e)}onSwing(e){return this.swingListeners.add(e),()=>this.swingListeners.delete(e)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(e,n,a={}){this.send({type:"snapshot",op:e,slot:n,...a})}requestStart(e){this.gated(n=>this.startNow(e,n))||this.startNow(e)}startNow(e,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...e.beat!==void 0?{atBeat:e.beat}:{}})}gated(e){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const s=this.o.now(),r=()=>{n===this.startWaits&&e(s)};return a.then(r,r),!0}requestStop(e){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(e.all??!1);return}this.send({type:"transport",action:"stop",all:e.all??!1})}requestTempo(e){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(e.bpm,e.atBeat,e.rampBeats);return}this.send({type:"tempo",bpm:e.bpm,...e.atBeat!==void 0?{atBeat:e.atBeat}:{},...e.rampBeats?{rampBeats:e.rampBeats}:{}})}decideStart(e){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const s=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(s),0)}else{const s=a+this.o.startLeadSeconds;this.clock.commitStart(e===void 0?s:Math.max(e+this.o.gatedStartLeadSeconds,s),0)}this.broadcastState()}decideStop(e){this.stopAll=e,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,e),this.broadcastState(),this.stopAll=!1}decideTempo(e,n,a){const[s,r]=this.tempoRange();e=Math.min(r,Math.max(s,e));const o=this.clock.transport,l=this.o.now();if(!o.running){this.clock.commitTempo(e),this.broadcastState();return}const d=o.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??qs(d,1),d);a&&a>0?(o.tempo.rampTempo(e,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(e,c),this.broadcastState()}tempoRange(){let[e,n]=this.caps.tempoRange;for(const a of this.peers.values())e=Math.max(e,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return e<=n?[e,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const e=this.o.swing(),n=typeof e=="number"&&Number.isFinite(e)?Math.min(Ks,Math.max(Us,e)):Il;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(e){const n=Ol(e);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(e){const n=Rl(e);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const s=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...$n,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),s||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const s=this.peers.get(n.from);s?s.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...$n},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(s=>{this.leader&&this.decideStart(s)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const s of[...this.snapshotListeners])s(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const s of[...this.messageListeners])s(n)}}outranked(){if(!this.caps.canLead)return!0;for(const e of this.peers.values())if(e.capabilities.canLead&&e.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const e=this.outranked();if(this.locks){if(e){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const o=this.releaseLock;this.releaseLock=null,o()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Dl,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(o=>{this.releaseLock=()=>{this.setLeader(!1),o()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,o,l)=>[r?0:1,o,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),s=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const o=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(s===null||o[0]<a[0]||o[0]===a[0]&&(o[1]<a[1]||o[1]===a[1]&&o[2]<a[2]))&&(a=o,s=r.id)}this.setLeader(s===this.id)}outranks(e){const n=this.peers.get(e);if(!n)return this.id<e;const a=[this.caps.prefersLeader?0:1,this.joinedAt],s=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==s[0]?a[0]<s[0]:a[1]!==s[1]?a[1]<s[1]:this.id<e}knownLeader(){return[...this.peers.values()].some(e=>e.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(e){if(e!==this.leader){this.leader=e,e&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(e?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const e=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const s=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;e-a.lastSeen>s&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const e=[...this.peers.values()];for(const n of[...this.peerListeners])n(e)}send(e){this.channel&&this.channel.postMessage(_l(e,this.id,this.term,++this.seq,this.o.now()))}}const Ws=16,Gl=[2,6,10,14],Ul=[2,3,6,10,11,14],St=[0,2,4,6,8,10,12,14],Kl=[2,6,10,14],Wl=[1,3,7,9,11,15],wi=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],St,[2,6,10,14]],Vs=[St,[0,4,8,12]],Vl=[32,64],Yl=.95,Xl=.55,Jl=.15,Ql=.3,Zl={kick:{tune:[40,75],decay:[.28,.6],level:[.7,.9]},tom:{tune:[70,140],decay:[.2,.5],level:[.5,.75]},snare:{tune:[140,240],decay:[.12,.32],level:[.45,.7]},clap:{tune:[150,260],decay:[.1,.3],level:[.3,.55]},rim:{tune:[280,620],decay:[.04,.12],level:[.25,.5]},hat:{tune:[280,440],decay:[.03,.09],level:[.25,.45]},hatOpen:{tune:[250,380],decay:[.1,.28],level:[.22,.42]},metal:{tune:[180,340],decay:[.08,.28],level:[.25,.5]},shaker:{tune:[5200,9e3],decay:[.02,.028],level:[.24,.36]},ride:{tune:[3800,4800],decay:[3.2,4.6],level:[.42,.55]},crash:{tune:[6e3,7200],decay:[4.6,6.5],level:[.45,.55]}},ec=new Set(["ride","crash"]);function Y(){return Array.from({length:Ws},()=>!1)}function Me(t,e,n,a=!1){const s=e+t()*(n-e);return a?Math.round(s):Math.round(s*100)/100}function An(t,e,n){return Me(t,Math.max(0,e-n),Math.min(1,e+n))}function tc(t){const e=Y();e[0]=!0,t()<.85&&(e[8]=!0),t()<.75&&(e[4]=!0),t()<.75&&(e[12]=!0);const n=[3,6,10,14],a=n[Math.floor(t()*n.length)]??6;return t()<.35&&(e[a]=!0),e}function nc(t){const e=Y();e[4]=t()<.85,e[12]=t()<.85,!e[4]&&!e[12]&&(e[t()<.5?4:12]=!0);const n=Gl.filter(()=>t()<.22);for(const a of n.slice(0,2))e[a]=!0;return e}function ac(t,e){const n=Y();return t[4]&&e()<.65&&(n[4]=!0),t[12]&&e()<.65&&(n[12]=!0),n}function ic(t,e){const n=Y();let a=0;for(const s of Ul)a>=3||t[s]||e()<.35&&(n[s]=!0,a+=1);return n}function sc(t){const e=Y();let n=0;for(const a of Kl){if(n>=2)break;t()<.4&&(e[a]=!0,n+=1)}return e}function rc(t,e){const n=Y();for(const o of St)n[o]=!t[o];const a=St.filter(o=>n[o]&&o!==0),s=1+Math.floor(e()*3);for(let o=0;o<s&&a.length>0;o+=1){const l=Math.floor(e()*a.length),d=a.splice(l,1)[0];d!==void 0&&(n[d]=!1)}let r=0;for(const o of[1,3,5,7,9,11,13,15]){if(r>=2)break;e()<.12&&(n[o]=!0,r+=1)}return n}function oc(t,e){const n=Y(),a=t[12]?[13,14,15]:[12,13,14,15];let s=0;for(const r of a){if(s>=3)break;e()<.45&&(n[r]=!0,s+=1)}return n}function lc(t,e,n){const a=Y();let s=0;for(const r of Wl)s>=2||t[r]||e[r]||n()<.35&&(a[r]=!0,s+=1);return a}function Ys(t,e){const n=Y(),a=t[Math.floor(e()*t.length)]??t[0]??[];for(const s of a)n[s]=!0;return n}function Xs(t){const e=Y(),n=wi[Math.floor(t()*wi.length)]??St;for(const a of n)e[a]=!0;return e}function Xt(t,e,n){return Array.from({length:e},(a,s)=>{const r=t[s]===!0,o=r&&n(s);return{on:r,accent:o,velocity:o?1:.8}})}function Js(t,e){return t==="kick"?e===0||e===8:t==="snare"?e===4||e===12:t==="shaker"?e%4===2:!1}function Vn(t,e,n){const a=Zl[t];return{tune:Me(n,a.tune[0],a.tune[1],!0),decay:t==="shaker"?Math.round((a.decay[0]+n()*(a.decay[1]-a.decay[0]))*1e3)/1e3:Me(n,a.decay[0],a.decay[1]),tone:An(n,e.tone,.15),snap:An(n,e.snap,.15),drive:An(n,e.drive,.1),level:Me(n,a.level[0],a.level[1])}}function Qs(t,e=!1){const n=tc(t),a=nc(t),s=sc(t);return{kick:n,snare:a,clap:ac(a,t),rim:ic(n,t),hat:rc(s,t),hatOpen:s,tom:oc(a,t),metal:lc(n,a,t),shaker:e?Xs(t):Y(),ride:Y(),crash:Y()}}function cc(t,e,n){const a=t.tracks[e];if(!a)return t;const s=l=>l.every((d,c)=>d.on===(a.steps[c]?.on??!1));if(a.voice==="crash"){const l=Vl.filter(u=>u!==a.length),d=l[Math.floor(n()*l.length)]??64,c={...a,...er(d)};return{...t,tracks:t.tracks.map((u,p)=>p===e?c:u)}}let r=a.steps;for(let l=0;l<6;l++){const d=a.voice==="ride"?Ys(Vs,n):Qs(n,a.voice==="shaker")[a.voice];if(r=a.voice==="ride"?Zs(d,a.length):Xt(d,a.length,c=>Js(a.voice,c)),!s(r)&&r.some(c=>c.on))break}const o=a.steps.slice(a.length);return{...t,tracks:t.tracks.map((l,d)=>d===e?{...l,steps:[...r,...o]}:l)}}function dc(t){return{...t,tracks:t.tracks.map(e=>{const n=Math.max(0,e.length-4),a=e.steps.map((s,r)=>{if(r<n||r>=e.length)return s;const o=r-n;return e.voice==="snare"?{on:!0,accent:o===3,velocity:[.55,.7,.85,1][o]??1}:e.voice==="tom"?{on:o%2===1,accent:!1,velocity:.9}:e.voice==="hat"?{...s,on:!1,accent:!1}:s});return{...e,steps:a}})}}function uc(t,e){return hc(pc(t,e),e)}function pc(t,e){const n=Qs(e),a=e()<.4?.5:Me(e,.5,.62),s=e(),r=s<.8?"lp":s<.9?"hp":"bp";return{...t,bpm:t.bpm,swing:a,fx:{...t.fx,mode:r,cutoff:Me(e,.55,.9),resonance:Me(e,.05,.3),drive:Me(e,.02,.18)},tracks:t.tracks.map(o=>{if(ec.has(o.voice))return o;const l=Vn(o.voice,o.params,e),d=o.voice==="shaker"?e()<.5?Y():Xs(e):n[o.voice];return{...o,mute:o.mute,solo:o.solo,params:l,steps:Xt(d,o.length,c=>Js(o.voice,c))}})}}function Zs(t,e){return Array.from({length:e},(n,a)=>({on:t[a%Ws]===!0,accent:!1,velocity:a%4===0?Yl:Xl}))}function er(t){return{length:t,steps:Array.from({length:t},(e,n)=>({on:n===0,accent:n===0,velocity:1}))}}function hc(t,e){const n=t.tracks.find(c=>c.voice==="ride"),a=t.tracks.find(c=>c.voice==="crash");if(!n&&!a)return t;const s=n?Vn("ride",n.params,e):null,r=a?Vn("crash",a.params,e):null,o=n!==void 0&&e()<Jl,l=o?Ys(Vs,e):Y(),d=a!==void 0&&e()<Ql;return{...t,tracks:t.tracks.map(c=>c.voice==="ride"&&s?{...c,params:s,steps:Zs(l,c.length)}:c.voice==="crash"&&r?d?{...c,params:r,...er(64)}:{...c,params:r,steps:Xt(Y(),c.length,()=>!1)}:c.voice==="hat"&&o?{...c,steps:Xt(Y(),c.length,()=>!1)}:c)}}function fc(t,e=Math.random){const n=[];let a=null;for(let r=0;r<La;r+=1){const o=qo(uc(t,e));n.push(o),r===0&&(a=o)}const s=a?{...t,bpm:t.bpm,swing:a.swing,fx:structuredClone(a.fx),tracks:structuredClone(a.tracks)}:t;return{bank:{slots:n,active:0},document:s}}function ie(t){return`${Math.round(t*100)}%`}function vi(t){return ie(t)}function mc(t,e){return t==="tune"?`${Math.round(e)} Hz`:ie(e)}function gc(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ki(t){return`${Math.round(t*1e3)} ms`}const bc={tune:{label:"Shell",min:3e3,max:12e3,step:10,text:t=>`${Math.round(t)} Hz`},decay:{label:"Length",min:.006,max:.06,step:.001,text:ki},tone:{label:"Bright",min:0,max:1,step:.01,text:ie},snap:{label:"Beads",min:0,max:1,step:.01,text:ie},drive:{label:"Attack",min:0,max:1,step:.01,text:t=>ki(ui+(jo-ui)*t)},level:{label:"Level",min:0,max:1,step:.01,text:ie}};function xi(t){const e=t==="ride";return{tune:{label:"Tone",min:e?3e3:3500,max:e?8e3:12e3,step:10,text:n=>`${(n/1e3).toFixed(1)} kHz`},decay:{label:"Decay",min:.5,max:e?8:11,step:.01,text:n=>`${n.toFixed(1)} s`},tone:{label:"Wash",min:0,max:1,step:.01,text:ie},snap:{label:"Hit",min:0,max:1,step:.01,text:ie},drive:{label:"Drive",min:0,max:1,step:.01,text:ie},level:{label:"Level",min:0,max:1,step:.01,text:ie}}}const yc={ride:xi("ride"),crash:xi("crash")};function wc(t){return t==="shaker"||t==="ride"||t==="crash"}function vc(t,e){return t==="shaker"?bc[e]:t==="ride"||t==="crash"?yc[t][e]:{label:gc(e),min:e==="tune"?20:0,max:e==="tune"?800:1,step:e==="tune"?1:.01,text:n=>mc(e,n)}}const $i={drive:{on:!1,dials:{drive_db:9,output_db:3,mix:100,tone:100,curve:0}},compressor:{on:!1,dials:{threshold_db:-18,ratio:30,attack_ms:10,release_ms:120,makeup_db:9}}},Si=(t,e)=>{const n=t&&typeof t=="object"?t:{},a={...e.dials};for(const[s,r]of Object.entries(n.dials??{}))s in e.dials&&typeof r=="number"&&Number.isFinite(r)&&(a[s]=r);return{on:typeof n.on=="boolean"?n.on:e.on,dials:a}};function Re(t){const e=t.hacks??{};return{filter:typeof e.filter=="boolean"?e.filter:!0,drive:Si(e.drive,$i.drive),compressor:Si(e.compressor,$i.compressor)}}function kc(t){const e=Math.max(0,Math.min(1,t));return Math.min(2e4,40*2**(e*10))}const Dt=t=>Math.max(0,Math.min(100,t));function tr(t){const e=kc(t.cutoff),n=Dt(Math.max(0,Math.min(1,t.resonance))*100);return t.mode==="hp"?{type:"highpass",dials:{cutoff:e<=20?0:Dt(100*Math.log(e/20)/Math.log(100)),q:n}}:t.mode==="bp"?{type:"bandpass",dials:{centre_hz:Dt(100*Math.log(Math.max(100,e)/100)/Math.log(80)),q:n,mix:100}}:{type:"lowpass",dials:{cutoff:t.cutoff>=.999?0:Dt(100*Math.log(e/2e4)/Math.log(150/2e4))}}}function xc(t){const{type:e,dials:n}=tr(t);if(e==="highpass"){const s=n.cutoff??0;return{hz:20*100**(s/100),q:Math.SQRT1_2*(8/Math.SQRT1_2)**((n.q??0)/100),open:s<=0}}if(e==="bandpass")return{hz:100*80**((n.centre_hz??0)/100),q:.4*20**((n.q??0)/100),open:!1};const a=n.cutoff??0;return{hz:2e4*(150/2e4)**(a/100),q:Math.SQRT1_2,open:a<=0}}const $c="Tap to join",nr="Tap to join the playing beat";function qt(t,e){return t&&e?"join":e?"stop":"play"}function ar(t){return t==="join"?$c:t==="stop"?"Stop":"Play"}function Sc(t,e,n={}){const a=n.beatsPerBar??4,s=(n.leadSeconds??.15)*e/60;return Math.max(0,Math.ceil((t+s)/a-1e-9)*a)}class Ec{constructor(e={}){this.options=e}joining=!1;joinedBy=!1;entry=null;shown="play";mode(e,n){return this.shown=qt(e,n),this.shown}gesture(e,n,a=!1){return this.joinedBy=!1,a||this.joining||qt(e,n)!=="join"?!1:(this.joining=!0,this.joinedBy=!0,!0)}swallowClick(e,n){const a=this.joinedBy||this.joining||qt(e,n)==="join";return this.joinedBy=!1,a}get pending(){return this.joining}enter(e,n){return this.joining=!1,this.entry=Sc(e,n,this.options),this.entry}cancel(){this.joining=!1}toJSON(){return{mode:this.shown,joining:this.joining,gesture:this.joinedBy,entryBeat:this.entry}}}class Ac{constructor(e=n=>JSON.stringify(n)){this.key=e}value;has=!1;lastKey;listeners=new Set;set(e,n=!1){const a=this.key(e);if(this.value=e,this.has=!0,!n&&a===this.lastKey)return!1;this.lastKey=a;for(const s of this.listeners)s(e);return!0}get current(){return this.value}subscribe(e){return this.listeners.add(e),this.has&&e(this.value),()=>{this.listeners.delete(e)}}get size(){return this.listeners.size}}class Na{queued=null;held=null;seq=0;taken=0;get pending(){return this.held}get lastTaken(){return this.taken}tap(e,n){return!n||this.queued===e?(this.queued=null,this.drop(),{kind:"now",index:e}):(this.queued=e,{kind:"queue",index:e})}recall(e,n,a,s={}){const r=s.id??this.seq+1;this.seq=Math.max(this.seq,r);const o=s.atBeat??ir(n,s.beatsPerBar);return this.held={id:r,slot:e,atBeat:o,payload:a},this.queued=e,this.held}due(e){const n=this.held;return!n||e<n.atBeat?null:this.finish(n)}takeHeld(e){const n=this.held;return!n||n.id!==e?null:this.finish(n)}drop(){const e=this.held;return e?(this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e):null}spent(e){return e<=this.taken}live(e){return e<this.taken?!1:(this.held&&e>=this.held.id&&this.drop(),!0)}hold(e){this.queued=e}take(){const e=this.queued;return this.queued=null,this.drop(),e}cancel(e){(e===void 0||this.queued===e)&&(this.queued=null,this.drop())}toJSON(){return{queued:this.queued,held:this.held,seq:this.seq,taken:this.taken}}static fromJSON(e){const n=new Na;return n.queued=e.queued,n.held=e.held,n.seq=e.seq,n.taken=e.taken,n}finish(e){return this.held=null,this.queued===e.slot&&(this.queued=null),this.taken=Math.max(this.taken,e.id),e}}function ir(t,e=4){return t<0?0:(Math.floor(t/e+1e-9)+1)*e}class Tc{constructor(e){this.options=e}taps=[];tap(e){const{window:n=4,resetMs:a=2e3,jump:s=.4}=this.options,r=this.taps[this.taps.length-1];if(r===void 0||e-r>a||e<=r)return this.taps=[e],null;const o=e-r,l=this.meanInterval();l!==null&&Math.abs(o-l)>l*s&&(this.taps=[r]),this.taps.push(e),this.taps.length>n+1&&this.taps.splice(0,this.taps.length-n-1);const d=this.meanInterval();return d===null?null:Math.min(this.options.max,Math.max(this.options.min,Math.round(6e4/d)))}get count(){return this.taps.length}reset(){this.taps=[]}meanInterval(){if(this.taps.length<2)return null;const e=this.taps[0];return(this.taps[this.taps.length-1]-e)/(this.taps.length-1)}}const sr=globalThis,Mc="linkslots",Lc=new Set(["0","false","off","no"]);function Cc(t,e=sr.location?.search??"",n=Fc()){const a=new URLSearchParams(e).get(Mc);if(a!==null)return!Lc.has(a.trim().toLowerCase());try{return n?.getItem(t)==="1"}catch{return!1}}function Nc(t,e,n){return n||e===t}function Fc(){try{return sr.localStorage??null}catch{return null}}function zc(t){return Number.isFinite(t)?Math.min(.75,Math.max(.5,t)):.5}function Pc(t,e){const n=Math.floor(t/2),a=zc(e);return n*.5+(t%2===0?0:a*.5)}function Dc(t,e){let n=(Math.imul(t+1,2654435761)^Math.imul(e|0,2246822519))>>>0;return n=Math.imul(n^n>>>16,2146121005),n=Math.imul(n^n>>>15,2221713035),n^=n>>>16,(n>>>0)/4294967296}function Ic(t,e,n,a){const s=[];if(!(a>n))return s;let r=!1;for(const d of t)d.solo&&(r=!0);const o=Math.max(0,Math.floor(n*4)-2),l=Math.ceil(a*4)+2;for(let d=o;d<=l;d++){const c=Pc(d,e);if(!(c<n||c>=a))for(let u=0;u<t.length;u++){const p=t[u];if(p.mute||r&&!p.solo)continue;const f=Math.max(1,p.length),b=p.steps[(d%f+f)%f];if(!b?.on)continue;const g=b.probability;g!==void 0&&g<1&&Dc(u,d)>=g||s.push({beat:c,step:d,voice:p.voice,velocity:b.velocity,accent:b.accent})}}return s}const Oc="nc-ui",rr={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"},breakpoint:{md:"768px"}},Fa={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Jt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Rc={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Le={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},_c={light:{color:rr.color,semantic:Fa,component:Jt,runtime:Rc},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},ht=t=>`--${Oc}-${t}`,Yn=Fa["label-on-fill-dark"],Ei=Fa["label-on-fill-light"],Bc=Le["label-min-contrast"],Hc=/^#[0-9a-f]{6}$/i,qc=t=>typeof t=="string"&&Hc.test(t),jt=t=>Math.round(Math.max(0,Math.min(255,t))).toString(16).padStart(2,"0");function Ai(t,e,n){t=(t%360+360)%360,e=Math.max(0,Math.min(1,e)),n=Math.max(0,Math.min(1,n));const a=e*Math.min(n,1-n),s=r=>{const o=(r+t/30)%12;return n-a*Math.max(-1,Math.min(o-3,9-o,1))};return`#${jt(s(0)*255)}${jt(s(8)*255)}${jt(s(4)*255)}`}function or(t){const[e,n,a]=[1,3,5].map(u=>parseInt(t.slice(u,u+2),16)/255),s=Math.max(e,n,a),r=Math.min(e,n,a),o=(s+r)/2,l=s-r;if(!l)return{h:0,s:0,l:o};const d=l/(1-Math.abs(2*o-1));return{h:((s===e?60*((n-a)/l%6):s===n?60*((a-e)/l+2):60*((e-n)/l+4))+360)%360,s:d,l:o}}function Ti(t){const[e,n,a]=[1,3,5].map(s=>{const r=parseInt(t.slice(s,s+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*e+.7152*n+.0722*a}function Xn(t,e){const[n,a]=[Ti(t),Ti(e)].sort((s,r)=>r-s);return(n+.05)/(a+.05)}const Qt=t=>Xn(t,Yn)>=Xn(t,Ei)?Yn:Ei;function lr(t,e,n,a=Bc){let s=Ai(t,e,n);const r=Qt(s)===Yn?1:-1;for(let o=0;o<40&&Xn(s,Qt(s))<a;o++)n+=r*.01,s=Ai(t,e,n);return s}function jc(t){const{h:e,s:n}=or(t),a=lr(e,Math.min(n,Le["surprise-on-max-saturation"]),Le["surprise-on-lightness"]);return{fill:t,ink:Qt(t),on:a,onInk:Qt(a)}}const Gc=(t,e)=>{const n=Math.abs(t-e)%360;return Math.min(n,360-n)};function Uc(t,e=Math.random){const[n,a]=Le["surprise-saturation"],[s,r]=Le["surprise-lightness"],o=Le["surprise-min-hue-gap"],l=qc(t)?or(t).h:null;let d=e()*360;return l!==null&&Gc(d,l)<o&&(d=(l+o+e()*(360-2*o))%360),lr(d,n+e()*(a-n),s+e()*(r-s))}function Kc(t){if(!t)return null;const e=jc(t);return{[ht("surprise-fill")]:e.fill,[ht("surprise-ink")]:e.ink,[ht("surprise-on")]:e.on,[ht("surprise-on-ink")]:e.onInk}}const Wc=t=>t<=.04045?t/12.92:((t+.055)/1.055)**2.4,Vc=t=>t<=.0031308?12.92*t:1.055*t**(1/2.4)-.055;function Mi(t){const[e,n,a]=[1,3,5].map(l=>Wc(parseInt(t.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*e+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*e+.6806995451*n+.1073969566*a),o=Math.cbrt(.0883024619*e+.2817188376*n+.6299787005*a);return[.2104542553*s+.793617785*r-.0040720468*o,1.9779984951*s-2.428592205*r+.4505937099*o,.0259040371*s+.7827717662*r-.808675766*o]}function Yc([t,e,n]){const a=(t+.3963377774*e+.2158037573*n)**3,s=(t-.1055613458*e-.0638541728*n)**3,r=(t-.0894841775*e-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*s+.2309699292*r,-1.2684380046*a+2.6097574011*s-.3413193965*r,-.0041960863*a-.7034186147*s+1.707614701*r].map(l=>jt(Vc(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}const Xc=Le["velocity-range"],cr={min:Jt.rhythm["velocity-min"],max:Jt.rhythm["velocity-max"]},Li=Object.fromEntries(Object.entries(_c).map(([t,e])=>[t,{min:e.component.rhythm["velocity-min"],max:e.component.rhythm["velocity-max"],ink:e.component.rhythm["step-cell-ink"]}]));function Jc(t,e=cr){const[n,a]=Xc,s=Number.isFinite(t)?Math.max(n,Math.min(a,t)):n,r=(s-n)/(a-n),o=e.ink??Jt.rhythm["step-cell-ink"];if(r<=0)return{velocity:s,t:0,fill:e.min.toUpperCase(),ink:o};if(r>=1)return{velocity:s,t:1,fill:e.max.toUpperCase(),ink:o};const l=Mi(e.min),d=Mi(e.max);return{velocity:s,t:r,fill:Yc(l.map((c,u)=>c+(d[u]-c)*r)),ink:o}}function Ci(t,e=cr){return{[ht("velocity-fill")]:Jc(t,e).fill}}const dr="data-nc-theme",Ni="nc-ui-theme-change",Qc="(prefers-color-scheme: dark)",ur=t=>t?.documentElement??null,pr=t=>t?.defaultView?.matchMedia?.(Qc)??null,Zc=t=>t==="light"||t==="dark"?t:"system";function ed(t=globalThis.document){return Zc(ur(t)?.getAttribute(dr))}function Jn(t=globalThis.document){const e=ed(t);return e!=="system"?e:pr(t)?.matches?"dark":"light"}function hr(t,e=globalThis.document){const n=ur(e);if(!n)return()=>{};let a=Jn(e);const s=()=>{const d=Jn(e);d!==a&&(a=d,t(d))},r=e.defaultView?.MutationObserver,o=r?new r(s):null;o?.observe(n,{attributes:!0,attributeFilter:[dr]});const l=pr(e);return l?.addEventListener?.("change",s),e.addEventListener(Ni,s),()=>{o?.disconnect(),l?.removeEventListener?.("change",s),e.removeEventListener(Ni,s)}}const td="[data-modulated], [data-modulated] *";function nd(){const t=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${j("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${j("divider")}: ${i(`module-div-stack-${a}`)};
      ${j("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,e=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${j("text-sub")}: ${i("module-sub-stack-1")};
      ${j("divider")}: ${i("module-div-stack-1")};
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
${td} { transition: none; }
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
  ${j("text-sub")}: ${i("module-sub-stack-1")};
  ${j("divider")}: ${i("module-div-stack-1")};
  ${j("slider-track")}: ${i("module-div-stack-1")};
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
  ${j("text-sub")}: ${i("module-sub-stack-1")};
  ${j("divider")}: ${i("module-div-stack-1")};
  ${j("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${j("text-sub")}: ${i("module-sub-stack-1")};
  ${j("divider")}: ${i("module-div-stack-1")};
  ${j("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${j("text-sub")}: inherit;
  ${j("divider")}: inherit;
  ${j("slider-track")}: inherit;
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
`}let Tn=null;const ad="nc-ui-fallback";function fr(t=globalThis.document){if(!t?.documentElement||(Go(t.documentElement),Tn&&Tn.ownerDocument===t))return;const e=t.createElement("style");e.dataset.ncKit="",e.textContent=`@layer ${ad} {
${nd()}
}
`,t.head.append(e),Tn=e}function mr(t={}){const e=t.doc??globalThis.document,n=e.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),t.id&&(n.id=t.id),t.labelledBy?n.setAttribute("aria-labelledby",t.labelledBy):t.label&&n.setAttribute("aria-label",t.label);const a=e.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.dataset.ncOn="",s.textContent=t.onText??"On";const r=e.createElement("span");r.dataset.ncOff="",r.textContent=t.offText??"Off",a.append(s,r),n.append(a);let o=!1;const l=c=>{o=c===!0,n.setAttribute("aria-checked",o?"true":"false")};l(t.checked);const d=()=>{l(!o),t.onChange?.(o)};return n.addEventListener("click",d),{el:n,get checked(){return o},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}const gr=new WeakMap,Fi=.25;function id(t){const e=t.doc??globalThis.document,n=e.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");const a=e.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");const s=e.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(a,s);let r=0,o=t.step??.005,l=t.onChange,d=t.onReset;const c=h=>Math.min(1,Math.max(0,h)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{const m=c(h);m!==r&&(r=m,u(),l?.(m))};let f=0,b=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});const m=n.getBoundingClientRect();h.target!==s&&m.height>0&&p(1-(h.clientY-m.top)/m.height),f=h.clientY,b=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!b)return;const m=n.getBoundingClientRect().height||1,v=(f-h.clientY)/m*(h.shiftKey?Fi:1);f=h.clientY,p(r+v)});const g=()=>{b=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",h=>{h.preventDefault(),d?.()}),n.addEventListener("keydown",h=>{const m=h.shiftKey?o*Fi:o,v={ArrowUp:r+m,ArrowRight:r+m,ArrowDown:r-m,ArrowLeft:r-m,PageUp:r+o*10,PageDown:r-o*10,Home:0,End:1};h.key in v&&(h.preventDefault(),p(v[h.key]))});const y={el:n,get value(){return r},get dragging(){return b},set(h){b||(r=c(Number(h)||0),u())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(o=h.step),h.onChange&&(l=h.onChange),h.onReset&&(d=h.onReset)}};return y.setLabel(t.label),y.set(t.value??0),y.setText(t.valueText),gr.set(n,y),y}function sd(t){return gr.get(t)}const br=new WeakMap,rd=.2,od=1.5,ld=.5;function cd(t,e){const n=String(t??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:e}function zi(t,e,n){const a=t.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:cd(a.getComputedStyle(t).getPropertyValue(j(e)),n)}function dd(t){const e=t.doc??globalThis.document,n=t.channels===2?2:1,a=e.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);const s=e.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";const r=e.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");const o=[];for(let y=0;y<n;y++){const h=e.createElement("span");h.className="nc-meter-bar";const m=e.createElement("span");m.className="nc-meter-peak";const v=e.createElement("span");v.className="nc-meter-rms";const S=e.createElement("span");S.className="nc-meter-hold",h.append(m,v,S),r.append(h),o.push({peak:m,rms:v,hold:S,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(s,r);let l=t.label,d=t.onClear,c=!1,u=-1,p=-1;const f=()=>{s.dataset.lit=c?"true":"false",s.setAttribute("aria-pressed",c?"true":"false"),s.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),s.title=c?"Clipped. Click to clear":"Clip light"},b=(y,h,m,v)=>{const S=Math.round(v*1e3)/1e3;m[h]!==S&&(m[h]=S,y.style.transform=h==="hold"?`translateY(${Math.round((1-S)*1e3)/10}%)`:`scaleY(${S})`)};s.addEventListener("click",()=>{g.clear(),d?.()});const g={el:a,get clipped(){return c},update(y,h){u<0&&(u=zi(a,"motion-meter-fall",rd)),p<0&&(p=zi(a,"motion-meter-hold",od));const m=Math.max(0,Math.min(.25,Number(h)||0)),v=u>0?Math.exp(-m/u):0;o.forEach((S,T)=>{const $=y[T]??y[0]??{peak:0,rms:0},w=Math.min(1,Math.max(0,Number($.peak)||0)),k=Math.min(w,Math.max(0,Number($.rms)||0));$.over&&g.clip(),S.level.peak=w>=S.level.peak?w:w+(S.level.peak-w)*v,S.level.rms=k>=S.level.rms?k:k+(S.level.rms-k)*v,S.holdAge+=m,w>=S.holdAt?(S.holdAt=w,S.holdAge=0):S.holdAge>p&&(S.holdAt=Math.max(w,S.holdAt-ld*m)),b(S.peak,"peak",S.shown,S.level.peak),b(S.rms,"rms",S.shown,S.level.rms),b(S.hold,"hold",S.shown,S.holdAt),S.hold.dataset.off=S.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,f())},clear(){c=!1,f()},reset(){for(const y of o)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,b(y.peak,"peak",y.shown,0),b(y.rms,"rms",y.shown,0),b(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,f()},configure(y){y.onClear&&(d=y.onClear)}};return f(),g.reset(),br.set(a,g),g}function ud(t){return t?br.get(t):void 0}function pd(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==r)&&(t.width=s,t.height=r);const o=t.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:n}}function Se(t){return Math.max(0,Math.min(1,t))}function yr(t,e){const{ctx:n,w:a,h:s}=pd(t);if(!n)return;n.clearRect(0,0,a,s);const r=Os(t);if(e.paint==="swatch"){const d=U(t,"accent"),c=U(t,"rhythm.step-cell-on");t.dataset.ncAccent=d,t.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,a/2,s),n.fillStyle=c,n.fillRect(a/2,0,a/2,s);return}if(e.paint==="filter"){const d=e.mode??"lp",c=U(t,Uo(d)),u=U(t,"divider"),p=Se(e.cutoff??.5),f=.08+(1-Se(e.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(a,s*.72),n.stroke(),n.beginPath();for(let b=0;b<=a;b++){const g=b/Math.max(1,a);let y=0;d==="lp"?y=g<p?1:Math.max(0,1-(g-p)/f):d==="hp"?y=g>p?1:Math.max(0,1-(p-g)/f):y=Math.max(0,1-Math.abs(g-p)/f);const h=s*.78-y*s*.62;b===0?n.moveTo(b,h):n.lineTo(b,h)}n.strokeStyle=c,n.stroke(),n.fillStyle=U(t,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,s),t.dataset.ncAccent=c;return}if(e.paint==="envelope"){n.strokeStyle=U(t,"accent"),n.beginPath();const d=Math.max(.05,e.decay??.4);for(let c=0;c<=a;c++){const u=c/Math.max(1,a),p=(s-4)*(1-Math.exp(-u*4/d));n.lineTo(c,s-p)}n.stroke(),t.dataset.ncAccent=n.strokeStyle;return}if(e.paint==="waveform"){const d=Array.isArray(e.peaks)?e.peaks:[],[c,u]=Array.isArray(e.region)?e.region:[0,1],p=U(t,"accent"),f=U(t,"text-sub"),b=s/2;n.fillStyle=U(t,"accent-soft"),n.fillRect(Se(c)*a,0,(Se(u)-Se(c))*a,s),n.strokeStyle=U(t,"divider"),n.beginPath(),n.moveTo(0,b),n.lineTo(a,b),n.stroke();const g=Math.floor(d.length/2);for(let y=0;y<g;y++){const h=(y+.5)/g*a,m=Math.max(-1,Math.min(1,d[y*2]??0)),v=Math.max(-1,Math.min(1,d[y*2+1]??0)),S=(y+.5)/g;n.strokeStyle=S>=c&&S<=u?p:f,n.beginPath(),n.moveTo(h,b-v*(b-1)),n.lineTo(h,b-m*(b-1)+.5),n.stroke()}n.strokeStyle=p;for(const y of[c,u,...Array.isArray(e.markers)?e.markers:[]]){const h=Math.round(Se(y)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,s),n.stroke()}typeof e.position=="number"&&e.position>=0&&(n.fillStyle=U(t,"text"),n.fillRect(Math.round(Se(e.position)*(a-1)),0,1,s)),g||(n.fillStyle=f,n.font=r,n.fillText(e.empty??"Empty",0,b+4)),t.dataset.ncAccent=p;return}if(e.paint==="meter"){const d=Se(e.level??0);n.fillStyle=U(t,"divider"),n.fillRect(0,s*.4,a,s*.2),n.fillStyle=U(t,"accent"),n.fillRect(0,s*.4,a*d,s*.2),t.dataset.ncAccent=n.fillStyle;return}const o=Math.max(1,e.steps??16),l=((e.step??0)%o+o)%o;n.fillStyle=U(t,"rhythm.step-cell-off"),n.fillRect(0,s*.45,a,s*.1),n.fillStyle=U(t,"rhythm.playhead"),n.fillRect(l/o*a,s*.3,Math.max(1,a/o),s*.4),t.dataset.ncAccent=U(t,"accent")}const wr={slop:8,longPressMs:500,pitchPx:16};class hd{constructor(e,n,a=wr){this.hit=e,this.emit=n,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,n,a,s){if(this.phase!=="idle")return!1;const r=this.hit(n,a);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=n,this.y0=a,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,n,a,s){if(e!==this.pointer)return;const r=n-this.x0,o=a-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(r,o)<this.config.slop)return;Math.abs(o)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){const l=Math.trunc(-o/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){const l=this.hit(n,a);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,n,a,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,n,a,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}}function fd(t,e,n,a=wr){let s=!1,r=0;const o=(c,u)=>{const f=t.ownerDocument.elementFromPoint?.(c,u),b=[...t.querySelectorAll(e)],g=f?b.findIndex(m=>m===f||m.contains(f)):-1;if(g>=0)return g;let y=-1,h=Number.POSITIVE_INFINITY;return b.forEach((m,v)=>{if(m.hidden)return;const S=m.getBoundingClientRect();if(u<S.top||u>S.bottom)return;const T=Math.abs(c-(S.left+S.width/2));T<h&&T<=S.width&&(y=v,h=T)}),y},l=new hd(o,c=>{(c.kind==="paint"||c.kind==="long")&&(s=!0),n(c)},a),d=()=>{r&&clearTimeout(r),r=0};return t.addEventListener("pointerdown",c=>{c.button>0||(s=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),t.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),t.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),t.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),t.addEventListener("click",c=>{s&&(s=!1,c.stopPropagation(),c.preventDefault())},!0),t.addEventListener("contextmenu",c=>c.preventDefault()),l}const vr="netcomposer.groups.v1";function za(){try{return globalThis.localStorage??null}catch{return null}}function kr(t=za(),e=vr){try{const n=JSON.parse(t?.getItem(e)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(const[s,r]of Object.entries(n))typeof r=="boolean"&&a.set(s,r);return a}catch{return new Map}}function md(t,e,n,a=vr){const s=kr(t,a);s.set(e,n);try{t?.setItem(a,JSON.stringify(Object.fromEntries(s)))}catch{}}function gd(t,e=za()){return kr(e).get(t.id)??t.open===!0}function bd(t,e,n){const a=document.createElement("div");a.className="nc-group",a.dataset.ncId=t.id;const s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${t.id}-group-toggle`;const r=document.createElement("span");r.className="nc-group-title";const o=document.createElement("span");o.className="nc-group-summary";const l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(r,o,l);const d=document.createElement("div");d.className="nc-group-body",d.id=`${t.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",d.id);for(const c of t.controls)d.append(n(c,e));return s.addEventListener("click",()=>{const c=a.dataset.ncOpen!=="true";md(za(),t.id,c),Pi(a,c);const u=e(a);u?.type==="group"&&u.onToggle?.(c)}),a.append(s,d),Pi(a,gd(t)),xr(a,t),a}function Pi(t,e){t.dataset.ncOpen=e?"true":"false";const n=t.querySelector(":scope > .nc-group-toggle"),a=t.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",e?"true":"false");const s=n?.querySelector(".nc-group-mark");s&&(s.textContent=e?"−":"+"),a instanceof HTMLElement&&(a.hidden=!e)}function xr(t,e){const n=t.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==e.title&&(n.textContent=e.title);const a=t.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=e.summary??"";a&&a.textContent!==s&&(a.textContent=s)}const yd=450,It="application/x-nc-pad",Di="http://www.w3.org/2000/svg",wd=48;function vd(t){const e=Math.floor((t?.length??0)/2);if(!e)return"";const n=Math.min(wd,e),a=[],s=[];for(let r=0;r<n;r++){const o=Math.floor(r*e/n),l=Math.max(o+1,Math.floor((r+1)*e/n));let d=0,c=0;for(let p=o;p<l;p++)d=Math.min(d,t[2*p]??0),c=Math.max(c,t[2*p+1]??0);const u=n===1?50:r/(n-1)*100;a.push(`${u.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),s.push(`${u.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${a.join("L")}L${s.reverse().join("L")}Z`}function kd(t,e){const n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Pads");const a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(t.columns??2),t.pads.forEach((s,r)=>a.append(xd(n,r,e))),n.append(a),n.addEventListener("keydown",s=>{s.key==="Escape"&&Gt(n)}),Sr(n,t),n}function xd(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(e);const s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");const r=document.createElement("span");r.className="nc-padgrid-pad-name";const o=document.createElement("span");o.className="nc-padgrid-pad-hint";const l=document.createElement("span");l.className="nc-padgrid-pad-badge";const d=document.createElementNS(Di,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");const c=document.createElementNS(Di,"path");return d.append(c),a.append(s,r,o,l,d),Sd(t,a,e,n),r.addEventListener("dblclick",()=>{const u=n(t);u?.type==="padGrid"&&u.onRename&&a.dataset.empty!=="true"&&$r(t,a,e,n)}),a.addEventListener("dragstart",u=>{if(a.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(It,String(e)),u.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",u=>{const p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(It)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(It)&&!u.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",u=>{delete a.dataset.drop;const p=n(t);if(p?.type!=="padGrid")return;const f=u.dataTransfer?.getData(It);if(f!==void 0&&f!==""){u.preventDefault(),u.stopPropagation();const g=Number(f);g!==e&&p.onMove?.(g,e,u.altKey);return}const b=u.dataTransfer?.files?.[0];b&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(e,b))}),a}function $d(t,e,n){const a=n(t);a?.type==="padGrid"&&a.onPress(e)}function Sd(t,e,n,a){let s=0,r=!1,o=0,l=0;const d=()=>{window.clearTimeout(s),s=0};e.addEventListener("pointerdown",c=>{if(c.button!==0)return;r=!1,o=c.clientX,l=c.clientY,d();const u=a(t);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&c.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,r=Ii(t,e,n,a)},yd)))}),e.addEventListener("pointermove",c=>{s&&Math.hypot(c.clientX-o,c.clientY-l)>8&&d()});for(const c of["pointerup","pointercancel","pointerleave"])e.addEventListener(c,d);e.addEventListener("contextmenu",c=>{c.preventDefault(),d(),r=Ii(t,e,n,a)}),e.addEventListener("click",()=>{if(r){r=!1;return}$d(t,n,a)})}function Ii(t,e,n,a){const s=a(t);if(s?.type!=="padGrid"||!s.menu)return!1;const r=s.menu(n);if(!r.length)return!1;Gt(t);const o=document.createElement("div");o.className="nc-slot-scrim",o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Gt(t)}),o.addEventListener("click",u=>u.stopPropagation());const l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",e.getAttribute("aria-label")??"Pad");for(const u of r){const p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Gt(t);const f=a(t);f?.type==="padGrid"&&(u.id==="rename"&&f.onRename?$r(t,e,n,a):f.onMenu?.(n,u.id))}),l.append(p)}t.append(o,l);const d=t.getBoundingClientRect(),c=e.getBoundingClientRect();return l.style.left=`${c.left-d.left}px`,l.style.top=`${c.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function $r(t,e,n,a){t.querySelector(":scope > .nc-padgrid-rename")?.remove();const s=a(t);if(s?.type!=="padGrid")return;const r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=s.nameMax??24,r.value=s.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);const o=t.getBoundingClientRect(),l=e.getBoundingClientRect();r.style.left=`${l.left-o.left}px`,r.style.top=`${l.top-o.top}px`,r.style.width=`${l.width}px`;let d=!1;const c=u=>{if(d)return;d=!0;const p=r.value.trim();r.remove(),e.focus();const f=a(t);u&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?c(!0):u.key==="Escape"&&c(!1)}),r.addEventListener("blur",()=>c(!0));for(const u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());t.append(r),r.focus(),r.select()}function Gt(t){for(const e of t.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))e.remove()}function Sr(t,e){const n=t.querySelectorAll(".nc-padgrid-pad");e.pads.forEach((a,s)=>{const r=n[s];if(!(r instanceof HTMLButtonElement))return;const o=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),d=r.querySelector(".nc-padgrid-pad-wave path"),c=r.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",o&&(o.textContent=e.emptyLabel??"Load"),l&&(l.textContent=e.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete r.dataset.empty,o&&(o.textContent=a.label),l&&(l.textContent=""),d?.setAttribute("d",vd(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;const u=e.selected===s;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${u?", selected":""}`)})}function Z(){const t=document.createElement("i");return t.className="nc-token-probe",t.dataset.ncProbe="",t}function hn(t,e){const n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=t;const a=document.createElement("label");a.className="nc-label",a.htmlFor=t,a.textContent=e;const s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(a,s),n}function Oi(t,e){const n=t.querySelector("[data-nc-probe]");t.textContent=e,n&&t.append(n)}function Et(t){if(!Number.isFinite(t))return"";const e=Math.round(t*100)/100;return String(e)}const Ed=450,Ri=8;function ke(){const t=document.createElement("span");return t.className="nc-hit",t.setAttribute("aria-hidden","true"),t}function Ad(t){const e=Ko(t,"target-min");return e>0?e:44}function Td(t){if(!(t instanceof HTMLElement))return;const e=[...t.querySelectorAll(".nc-hit")],n=Ad(t),a=n/2,s=e.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<e.length;r++){const o=e[r],l=s[r];if(!(o instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){o.style.display="none";continue}const d=l.left+l.width/2,c=l.top+l.height/2;let u=d-a,p=d+a,f=c-a,b=c+a;for(let g=0;g<e.length;g++){if(r===g)continue;const y=s[g];if(!y||y.width===0)continue;const h=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-c)<a*2&&(h>d?p=Math.min(p,(d+h)/2):h<d&&(u=Math.max(u,(d+h)/2))),Math.abs(h-d)<a*2&&(m>c?b=Math.min(b,(c+m)/2):m<c&&(f=Math.max(f,(c+m)/2)))}u=Math.min(u,l.left),p=Math.max(p,l.right),f=Math.min(f,l.top),b=Math.max(b,l.bottom),o.style.left=`${u-l.left}px`,o.style.top=`${f-l.top}px`,o.style.width=`${Math.max(0,p-u)}px`,o.style.height=`${Math.max(0,b-f)}px`,o.style.transform="none"}}function Er(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function _i(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function at(t,e){switch(t.type){case"slider":return Md(t,e);case"select":return Cd(t,e);case"toggle":return Nd(t,e);case"button":return Fd(t,e);case"readout":return zd(t);case"label":return Od(t);case"note":return Bi(t);case"knob":return Bd(t,e);case"choice":return Hd(t,e);case"slotRow":return qd(t,e);case"stepGrid":return Kd(t,e);case"canvas":return Xd(t);case"fx":return tu(t,e);case"group":return bd(t,e,at);case"strip":return Jd(t,e);case"stripAdd":return eu(t,e);case"padGrid":return kd(t,e);case"moves":return Dd(t,e);default:return Bi({id:"unknown",text:""})}}function de(t,e){if(!(!(t instanceof Element)||t.dataset.ncId!==e.id)){if(e.type==="slider"&&t instanceof HTMLElement){const n=t.querySelector("input"),a=t.querySelector("label");a&&(a.textContent=e.label),n instanceof HTMLInputElement&&(n.disabled=e.disabled===!0,Tr(n,e.modulated===!0),document.activeElement!==n&&(n.value=String(e.value)),e.valueText?n.setAttribute("aria-valuetext",e.valueText):n.removeAttribute("aria-valuetext"));const s=t.querySelector("[data-nc-readout]");s&&(s.textContent=e.valueText??Et(e.value))}else if(e.type==="select"){const n=t.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=e.value)}else if(e.type==="toggle"&&t instanceof HTMLButtonElement)t.setAttribute("aria-pressed",e.pressed?"true":"false");else if(e.type==="button"&&t instanceof HTMLButtonElement)t.dataset.on=e.on?"true":"false",t.setAttribute("aria-pressed",e.on?"true":"false"),Oi(t,e.label),e.ariaLabel?t.setAttribute("aria-label",e.ariaLabel):t.removeAttribute("aria-label");else if(e.type==="readout"){const n=t.querySelector("[data-nc-readout]");n&&(n.textContent=e.value)}else if(e.type==="label"||e.type==="note")Oi(t,e.text);else if(e.type==="knob"){t instanceof HTMLElement&&At(t,e.help);const n=t.querySelector(".nc-knob");n instanceof HTMLElement&&Rd(n,e);const a=t.querySelector("[data-nc-readout]");a&&(a.textContent=e.valueText??Et(e.value))}else if(e.type==="choice")Mr(t,e);else if(e.type==="slotRow")Cr(t,e);else if(e.type==="stepGrid")Zn(t,e);else if(e.type==="padGrid")Sr(t,e);else if(e.type==="moves")Ar(t,e);else if(e.type==="canvas"&&t instanceof HTMLElement){const n=t.querySelector("canvas");n instanceof HTMLCanvasElement&&yr(n,e)}else if(e.type==="strip"){Pr(t,e);for(const n of e.sends??[]){const a=t.querySelector(`[data-nc-id="${gt(n.id)}"]`);a instanceof Element&&de(a,{...n,type:"knob"})}}else if(e.type==="stripAdd")Fr(t,e);else if(e.type==="group"){xr(t,e);for(const n of e.controls){const a=t.querySelector(`[data-nc-id="${gt(n.id)}"]`);a instanceof Element&&de(a,n)}}else if(e.type==="fx"){Rr(t,e);for(const n of[...e.controls,...e.more??[]]){const a=t.querySelector(`[data-nc-id="${gt(n.id)}"]`);a instanceof Element&&de(a,n)}}}}function Md(t,e){const n=hn(t.id,t.label);n.dataset.ncSlider="";const a=document.createElement("input");a.type="range",a.className="nc-range",a.id=t.id,a.min=String(t.min),a.max=String(t.max),a.step=String(t.step),a.value=String(t.value),a.disabled=t.disabled===!0,a.dataset.ncId=t.id,a.addEventListener("input",()=>{const r=e(a);r?.type==="slider"&&r.onChange(Number(a.value))}),a.addEventListener("change",()=>{const r=e(a);r?.type==="slider"&&r.onCommit?.(Number(a.value))});const s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),t.onTap&&n.insertBefore(Ld(t,a,e),s),n.append(Z()),de(n,t),n}function Ld(t,e,n){const a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=t.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${t.label.toLowerCase()}`),a.title=`Tap ${t.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ke());const s=r=>{const o=n(e);o?.type==="slider"&&o.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&s(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),s(r.timeStamp))}),a}function Cd(t,e){const n=hn(t.id,t.label),a=document.createElement("select");a.className="nc-select",a.id=t.id,a.dataset.ncId=t.id;for(const s of t.options){const r=document.createElement("option");r.value=s.value,r.textContent=s.label,a.append(r)}return a.value=t.value,a.addEventListener("change",()=>{const s=e(a);s?.type==="select"&&s.onChange(a.value)}),n.append(a,Z()),n}function Nd(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=t.id,n.dataset.ncId=t.id,n.dataset.ncRow="",t.role&&(n.dataset.ncRole=t.role),n.textContent=t.label,n.addEventListener("click",()=>{const a=e(n);a?.type==="toggle"&&a.onPress()}),n.append(Z()),de(n,t),n}function Fd(t,e){const n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=t.id,n.dataset.ncId=t.id,n.addEventListener("click",()=>{const r=e(n);r?.type==="button"&&r.onPress()}),n.append(Z()),de(n,t),!t.onSparkle)return n;const a=document.createElement("div");a.className="nc-play-row";const s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=t.id,s.setAttribute("aria-label","Surprise me"),s.title=t.sparkleTitle??"Surprise me",s.innerHTML=Er(),s.addEventListener("click",()=>{const r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Nr(r);const o=e(n);o?.type==="button"&&o.onSparkle?.()}),a.append(n,s),a}function zd(t){const e=hn(t.id,t.label);return e.append(Z()),de(e,t),e}const Pd=450;function Dd(t,e){const n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",t.label??"Moves");for(const a of t.groups){const s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",a.label),a.title&&(s.title=a.title);const r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;const o=document.createElement("div");o.className="nc-moves-btns";for(const l of a.moves){const d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${a.label} ${l.text}`),d.append(Id(l.icon)),d.addEventListener("click",()=>{const c=e(n);c?.type==="moves"&&c.onMove(l.id)}),o.append(d)}s.append(r,o),n.append(s)}return Ar(n,t),n}function Ar(t,e){for(const n of e.groups)for(const a of n.moves){const s=t.querySelector(`[data-nc-move="${gt(a.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=a.disabled===!0)}}function Id(t){const e="http://www.w3.org/2000/svg",n=document.createElementNS(e,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),t?.stroke){const a=document.createElementNS(e,"path");a.setAttribute("d",t.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(t?.fill){const a=document.createElementNS(e,"path");a.setAttribute("d",t.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Od(t){const e=document.createElement("span");return e.className="nc-label",e.dataset.ncId=t.id,e.dataset.ncText="",e.textContent=t.text,e.append(Z()),e}function Bi(t){const e=document.createElement("p");return e.className="nc-note",e.dataset.ncId=t.id,e.dataset.ncRow="",e.textContent=t.text,e.append(Z()),e}function Hi(t){if(typeof t.valueText=="string")return t.valueText;const e=Et(t.value),n=typeof t.unit=="string"?t.unit:"";return n===""?e:n==="%"?`${e}%`:`${e} ${n}`}function Tr(t,e){e?t.dataset.modulated="true":delete t.dataset.modulated}function Rd(t,e){const n=e.max-e.min||1,a=(e.value-e.min)/n;Tr(t,e.modulated===!0);const s=Math.round(a*270);t.style.setProperty("--knob-turn",String(s)),e.bipolar&&(t.style.setProperty("--knob-from",String(Math.min(s,135))),t.style.setProperty("--knob-to",String(Math.max(s,135)))),t.setAttribute("role","slider"),t.setAttribute("aria-valuemin",String(e.min)),t.setAttribute("aria-valuemax",String(e.max)),t.setAttribute("aria-valuenow",String(e.value)),t.setAttribute("aria-valuetext",Hi(e)),t.setAttribute("aria-label",e.ariaLabel??e.label),t.title=`${e.ariaLabel??e.label}: ${Hi(e)}`}function _d(t,e){const n=t.max-t.min||1,a=typeof t.step=="number"&&t.step>0?t.step:n/100,s=e.shiftKey?a/10:a;return e.key==="Home"?t.min:e.key==="End"?t.max:e.key==="PageUp"?t.value+a*10:e.key==="PageDown"?t.value-a*10:e.key==="ArrowUp"||e.key==="ArrowRight"?t.value+s:e.key==="ArrowDown"||e.key==="ArrowLeft"?t.value-s:null}function Bd(t,e){const n=hn(t.id,t.label);t.compact&&(n.dataset.ncCompact=""),t.bipolar&&(n.dataset.ncBipolar="");const a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=t.id;const s=document.createElement("i");s.className="nc-knob-mark",a.append(s);let r=0,o=0;a.addEventListener("pointerdown",c=>{r=c.clientY;const u=e(a);o=u&&"value"in u?Number(u.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});const l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;const u=e(a);if(u?.type!=="knob")return;const p=u.max-u.min||1,f=Math.min(u.max,Math.max(u.min,o-(c.clientY-r)*p/120));u.onChange(f)}),a.addEventListener("dblclick",()=>{const c=e(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{const u=e(a);if(u?.type!=="knob")return;const p=_d(u,c);p!==null&&(c.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});const d=n.querySelector("[data-nc-readout]");return n.insertBefore(a,d),n.append(Z()),de(n,t),n}function Hd(t,e){const n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=t.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",t.label);for(const a of t.options){const s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=a.value,s.setAttribute("role","tab"),s.textContent=a.label,s.addEventListener("click",()=>{const r=e(n);r?.type==="choice"&&r.onChange(a.value)}),s.addEventListener("keydown",r=>{const o=[...n.querySelectorAll("[data-nc-choice]")],l=o.indexOf(s);let d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%o.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+o.length)%o.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=o.length-1;else return;const c=o[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(s)}return n.append(Z()),Mr(n,t),n}function Mr(t,e){for(const n of t.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;const a=n.dataset.ncChoice===e.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function qd(t,e){const n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let u=0;u<t.slots.length;u++){const p=t.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";const b=document.createElement("button");b.type="button",b.className="nc-snap",b.dataset.ncSlot=String(u),b.textContent=p.label,b.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(b,ke()),jd(f,b,n,u,e),a.append(f)}const s=t.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Er(),s.append(ke()),s.addEventListener("click",()=>{Nr(n);const u=e(n);u?.type==="slotRow"&&u.onSparkle?.()}));const r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";const o=document.createElement("span");o.className="nc-label",o.textContent="Morph";const l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{const u=e(n);u?.type==="slotRow"&&u.onMorph(Number(l.value))});const d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(o,d,l);const c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...s?[s]:[]),n.append(c,r,Z()),Lr(n,e),Cr(n,t),n}function qi(t,e,n,a){const s=n(t);if(s?.type!=="slotRow")return;ft(t);const r=a.shiftKey?"store":a.altKey?"clear":"recall";s.onSlot(e,r)}function jd(t,e,n,a,s){let r=0,o=0,l=0,d=!1,c=!1,u=!1,p=!1;const f=()=>{window.clearTimeout(r),r=0},b=m=>{const v=m.clientX-o,S=m.clientY-l;v*v+S*S>Ri*Ri&&(d=!0,f())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",b),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=m=>{const v=r!==0&&!d&&!c;f(),g(),v&&(u=!0,qi(n,a,s,m))},h=()=>{d=!0,f(),g()};t.addEventListener("pointerdown",m=>{m.button===0&&(g(),c=!1,d=!1,u=!1,o=m.clientX,l=m.clientY,f(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,Gd(n,e,a,s))},Ed),p=!0,window.addEventListener("pointermove",b),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),t.addEventListener("contextmenu",m=>m.preventDefault()),t.addEventListener("click",m=>{if(u||c||d){u=!1,c=!1,d=!1;return}qi(n,a,s,m)})}function Lr(t,e){if(t.querySelector(".nc-slot-menu"))return;const n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");const a=ji("Save","store"),s=ji("Clear","clear");n.append(a,s);const r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",o=>{o.preventDefault(),o.stopPropagation(),ft(t)}),r.addEventListener("click",o=>o.stopPropagation()),t.append(r,n),n.addEventListener("click",o=>{const l=o.target;if(!(l instanceof HTMLButtonElement))return;const d=e(t);if(d?.type!=="slotRow")return;const c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),ft(t)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),ft(t))}),t.addEventListener("keydown",o=>{o.key==="Escape"&&ft(t)})}function ji(t,e){const n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=e,n.setAttribute("role","menuitem"),n.textContent=t,n}function Gd(t,e,n,a){Lr(t,a);const s=t.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;const r=t.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);const o=t.getBoundingClientRect(),l=e.getBoundingClientRect();s.style.left=`${l.left-o.left}px`,s.style.top=`${l.bottom-o.top}px`,s.querySelector("button")?.focus()}function ft(t){const e=t.querySelector(".nc-slot-menu"),n=t.querySelector(".nc-slot-scrim");e instanceof HTMLElement&&(e.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Cr(t,e){for(const s of t.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;const r=Number(s.dataset.ncSlot),o=e.slots[r];if(!o)continue;s.textContent=o.label,o.filled?s.dataset.filled="true":delete s.dataset.filled,o.active?s.dataset.active="true":delete s.dataset.active,o.edited?s.dataset.edited="true":delete s.dataset.edited,o.queued?s.dataset.queued="true":delete s.dataset.queued,o.queued&&o.pulse?s.dataset.pulse="true":delete s.dataset.pulse;const l=[o.filled?"saved":"empty",o.active?"playing":"",o.edited?"edited":"",o.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[o.label,...l.filter(Boolean)].join(", "))}const n=t.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(e.morph));const a=t.querySelector("[data-nc-morph]");a&&(a.textContent=e.morphText)}function Nr(t){const e=t.dataset.ncLastFill||null,n=Uc(e);t.dataset.ncLastFill=n;const a=Kc(n);if(a)for(const[s,r]of Object.entries(a))t.style.setProperty(s,r)}function Ud(t,e){const n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1;const s=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");const o=e(t);o?.type==="stepGrid"&&o.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),s(!0))});for(const r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>s(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||s(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),s(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Kd(t,e){const n=document.createElement("div");n.className="nc-section",n.dataset.ncId=t.id;const a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");const s=h=>{const m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=h,a.append(m),m},r=s("Note"),o=s("Accent");o.dataset.ncAccentMode="";const l=h=>{for(const m of[r,o]){const v=m===h;m.setAttribute("aria-checked",v?"true":"false"),m.tabIndex=v?0:-1}};l(r);for(const h of[r,o])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();const m=o.getAttribute("aria-checked")==="true"?r:o;l(m),m.focus()});const d=document.createElement("div");if(d.className="nc-step-tools",d.append(a),t.onFill&&d.append(Ud(n,e)),t.onClear){const h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=t.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.onClear?.()}),d.append(h)}n.append(d);for(const h of t.rows){const m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";const v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=h.label,v.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(v.dataset.ncLane=String((h.lane-1)%4+1));let S=!1,T=0;v.addEventListener("pointerdown",k=>{S=!1,!(k.pointerType==="mouse"||k.button!==0)&&(T=window.setTimeout(()=>{const E=e(n);E?.type!=="stepGrid"||!E.selectedRows||(S=!0,E.onSelectRow?.(E.rows.findIndex(A=>A.id===h.id),!0))},Pd))});for(const k of["pointerup","pointercancel","pointerleave"])v.addEventListener(k,()=>window.clearTimeout(T));v.addEventListener("contextmenu",k=>{S&&k.preventDefault()}),v.addEventListener("click",k=>{const E=e(n);if(E?.type!=="stepGrid")return;if(S){S=!1;return}const A=E.rows.findIndex(F=>F.id===h.id),L=!!E.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);E.onSelectRow?.(A,L)}),v.addEventListener("keydown",k=>Wd(n,v,k));const $=[];for(const k of["mute","solo"]){if(!(k==="mute"?t.onMute:t.onSolo))continue;const A=document.createElement("span");A.className="nc-ms-wrap";const L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=k,L.textContent=k==="mute"?"M":"S",L.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${h.label}`),A.append(L,ke()),A.addEventListener("click",()=>{const F=e(n);if(F?.type!=="stepGrid")return;const R=F.rows.findIndex(_=>_.id===h.id);(k==="mute"?F.onMute:F.onSolo)?.(R)}),$.push(A)}const w=document.createElement("div");w.className="nc-steps";for(let k=0;k<h.steps.length;k++){const E=document.createElement("span");E.className="nc-step-wrap";const A=document.createElement("button");A.type="button",A.className="nc-step",A.dataset.ncStep=`${h.id}:${k}`,A.setAttribute("aria-label",`${h.label} step ${k+1}`),E.append(A,ke()),E.addEventListener("click",L=>{const F=e(n);if(F?.type!=="stepGrid")return;const R=F.rows.findIndex(V=>V.id===h.id),_=o.getAttribute("aria-checked")==="true";F.onToggle(R,k,L.shiftKey||_)}),w.append(E)}if(t.onLength&&w.append(Vd(n,w,h,e)),m.append(...$,v,w),t.onDice){const k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=h.id,k.setAttribute("aria-label",`Re-roll ${h.label}`),k.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=_i(),k.append(ke()),k.addEventListener("click",()=>{const E=e(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(A=>A.id===h.id))}),m.append(k)}m.addEventListener("click",k=>{if(k.target!==m)return;const E=e(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(A=>A.id===h.id))}),Gi(n,w,".nc-step-wrap",e,o,()=>h.id),n.append(m)}const c=document.createElement("div");c.className="nc-pads-head";const u=(h,m,v)=>{const S=document.createElement("button");return S.type="button",S.className=h,S.textContent=m,v&&S.setAttribute("aria-label",v),S},p=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),b=document.createElement(t.onLength?"button":"span");b.className="nc-pads-label",b.setAttribute("aria-live","polite"),t.onLength&&(b.type="button",b.dataset.ncLenToggle="",b.addEventListener("click",()=>{const h=e(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Zn(n,h))}));for(const[h,m]of[[p,-1],[f,1]])h.addEventListener("click",()=>{const v=e(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;const S=v.rows.length;v.onSelectRow?.(((Ot(v)+m)%S+S)%S)});if(c.append(p,b,f),t.onDice){const h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=_i(),h.addEventListener("click",()=>{const m=e(n);if(m?.type!=="stepGrid")return;const v=Ot(m);v>=0&&m.onDice?.(v)}),c.append(h)}if(t.transport){const h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{const m=e(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),c.append(h)}n.append(c);const g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");const y=Math.max(0,...t.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){const m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(h),m.textContent=String(h+1),m.addEventListener("click",v=>{const S=e(n);if(S?.type!=="stepGrid")return;const T=Ot(S);if(T<0)return;if(n.dataset.ncLenMode==="true"){S.onLength?.(T,h+1);return}const $=o.getAttribute("aria-checked")==="true";S.onToggle(T,h,v.shiftKey||$)}),g.append(m)}return Gi(n,g,".nc-pad",e,o,()=>{const h=e(n);return h?.type==="stepGrid"?h.rows[Ot(h)]?.id:void 0}),n.append(g),n.append(Z()),Zn(n,t),n}function Ot(t){const e=t.rows.findIndex(n=>n.id===t.selectedRow);return e>=0?e:t.rows.length>0?0:-1}function Gi(t,e,n,a,s,r){let o="on",l=!0,d=-1;const c=(u,p)=>{const f=u.rows[d]?.steps[p];!f||p>=u.rows[d].length||(u.onSet?u.onSet(d,p,o,l):!!f[o]!==l&&u.onToggle(d,p,o==="accent"))};fd(e,n,u=>{const p=a(t);if(p?.type==="stepGrid"){if(t.dataset.ncLenMode==="true"&&e.classList.contains("nc-pads")){if(u.kind!=="paint")return;const f=p.rows.findIndex(b=>b.id===r());f>=0&&p.rows[f].length!==u.pad+1&&p.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){const f=r();d=p.rows.findIndex(g=>g.id===f);const b=p.rows[d]?.steps[u.pad];if(!b)return;o=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!b[o]}c(p,u.pad)}else if(u.kind==="long"){const f=r(),b=p.rows.findIndex(y=>y.id===f),g=e.querySelectorAll(n)[u.pad];b>=0&&g instanceof HTMLElement&&p.onLongPress?.(b,u.pad,g)}}})}function Wd(t,e,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;const a=[...t.querySelectorAll(".nc-name")],s=a.indexOf(e);let r=s;n.key==="ArrowDown"?r=s+1:n.key==="ArrowUp"?r=s-1:n.key==="Home"?r=0:r=a.length-1;const o=a[r];!(o instanceof HTMLElement)||o===e||(n.preventDefault(),o.focus(),o.click())}function Vd(t,e,n,a){const s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(ke());const r=c=>{const u=a(t);if(u?.type!=="stepGrid")return;const p=u.rows.findIndex(g=>g.id===n.id),f=u.rows[p];if(!f)return;const b=Math.max(1,Math.min(f.steps.length,c));b!==f.length&&u.onLength?.(p,b)},o=c=>{const u=[...e.querySelectorAll(".nc-step")];let p=1;return u.forEach((f,b)=>{const g=f.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(p=b+1)}),p},l=c=>r(o(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete s.dataset.dragging};return s.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),s.addEventListener("keydown",c=>{const u=a(t);if(u?.type!=="stepGrid")return;const p=u.rows.find(b=>b.id===n.id);if(!p)return;const f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in f&&(c.preventDefault(),r(f[c.key]))}),s}const Mn=new WeakMap,Rt=new WeakMap;function Yd(t){return t?(Rt.has(t)||(Rt.set(t,Jn(t)),hr(e=>{Rt.set(t,e);for(const n of t.querySelectorAll("[data-nc-velocity]"))Qn(n,Number(n.getAttribute("data-nc-velocity")))},t)),Rt.get(t)):"light"}function Qn(t,e){const n=typeof e=="number"&&Number.isFinite(e)?e:null,a=n===null?null:Yd(t.ownerDocument),s=n===null?null:`${a} ${n}`;if(!(Mn.has(t)&&Mn.get(t)===s)){if(Mn.set(t,s),n===null){for(const r of Object.keys(Ci(1)))t.style.removeProperty(r);t.removeAttribute("data-nc-velocity");return}t.setAttribute("data-nc-velocity",String(n));for(const[r,o]of Object.entries(Ci(n,Li[a]??Li.light)))t.style.setProperty(r,o)}}function Zn(t,e){const n=e.rows.some(u=>u.solo),a=t.querySelector("[data-nc-clear]");a&&a.textContent!==(e.clearLabel??"Clear")&&(a.textContent=e.clearLabel??"Clear");const s=t.querySelector(".nc-pads"),r=e.rows.find(u=>u.id===e.selectedRow)??e.rows[0],o=t.querySelector(".nc-pads-label"),l=t.dataset.ncLenMode==="true"&&!!e.onLength;o instanceof HTMLElement&&r&&(o.textContent=l?`${r.label} · ${r.length}`:r.label,e.onLength&&(o.setAttribute("aria-pressed",l?"true":"false"),o.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));const d=t.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&r&&(d.setAttribute("aria-label",`Re-roll ${r.label}`),d.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);const c=t.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){const u=!!e.transport?.playing,p=e.transport?.label??(u?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",u?"true":"false");const f=e.transport?.ariaLabel;f?c.setAttribute("aria-label",f):c.removeAttribute("aria-label")}if(s instanceof HTMLElement&&r){s.setAttribute("aria-label",`${r.label} steps`),r.lane&&(s.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?s.dataset.silent="true":delete s.dataset.silent;const u=r.length>0?(e.playhead%r.length+r.length)%r.length:-1;for(const p of s.querySelectorAll("[data-nc-pad]")){const f=Number(p.getAttribute("data-nc-pad")),b=r.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!b||!l&&f>=r.length,l&&f>=r.length?p.dataset.out="true":delete p.dataset.out,l&&f===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${f+1}`),p.setAttribute("aria-pressed",b?.on?"true":"false"),b?.accent?p.dataset.accent="true":delete p.dataset.accent,b?.dim?p.dataset.dim="true":delete p.dataset.dim,Qn(p,b?.velocity),e.playhead>=0&&f===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(const u of e.rows){for(let g=0;g<u.steps.length;g++){const y=u.steps[g],h=t.querySelector(`[data-nc-step="${u.id}:${g}"]`);if(!(h instanceof HTMLButtonElement))continue;const m=h.closest(".nc-row");if(m instanceof HTMLElement){e.selectedRow===u.id?m.dataset.selected="true":delete m.dataset.selected;const T=e.selectedRow!==u.id&&(e.selectedRows??[]).includes(u.id);T?m.dataset.picked="true":delete m.dataset.picked;const $=m.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",e.selectedRow===u.id||T?"true":"false"),$.textContent!==u.label&&($.textContent=u.label,$.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?m.dataset.silent="true":delete m.dataset.silent;for(const k of m.querySelectorAll("[data-nc-ms]")){const E=k.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;k.setAttribute("aria-pressed",E?"true":"false")}}h.setAttribute("aria-pressed",y.on?"true":"false"),y.accent?h.dataset.accent="true":delete h.dataset.accent,y.dim?h.dataset.dim="true":delete h.dataset.dim,g%4===0?h.dataset.bar="true":delete h.dataset.bar,typeof y.velocity=="number"?(h.dataset.velocity="true",h.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete h.dataset.velocity,h.style.removeProperty("--level")),Qn(h,y.velocity);const v=e.playhead>=0&&u.length>0?(e.playhead%u.length+u.length)%u.length:-1;g===v?h.dataset.playhead="true":delete h.dataset.playhead;const S=!!e.onLength&&e.selectedRow===u.id;h.hidden=g>=u.length&&!S,g>=u.length&&S?h.dataset.out="true":delete h.dataset.out}const p=t.querySelector(`[data-nc-len="${u.id}"]`),b=t.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&b&&b.nextElementSibling!==p){const g=document.activeElement===p;b.after(p),g&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function Xd(t){const e=document.createElement("div");e.className="nc-field",e.dataset.ncId=t.id;const n=document.createElement("span");n.className="nc-label",n.textContent=t.label;const a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=t.id,a.dataset.ncPaint=t.paint,e.append(n,a,Z()),e}function Jd(t,e){const n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=t.id,n.setAttribute("role","group"),n.setAttribute("aria-label",t.label),t.master&&(n.dataset.ncMaster="");const a=document.createElement("div");a.className="nc-strip-hd";const s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";const r=!t.master&&typeof t.onFold=="function";let o=null;if(r&&(n.dataset.ncFoldable="",o=Ir(),o.dataset.ncStripHide="",o.addEventListener("click",()=>{const m=e(n);m?.type==="strip"&&(m.onFold?.(m.folded!==!0),document.activeElement!==o&&o.focus())})),a.append(s),t.onRemove){const m=document.createElement("button");m.type="button",m.className="nc-strip-remove",m.dataset.ncStripRemove="",m.textContent="×",m.addEventListener("click",()=>{const v=e(n);v?.type==="strip"&&v.onRemove?.(m)}),a.append(m)}const l=document.createElement("div");if(l.className="nc-strip-hacks",t.onHacks){const m=document.createElement("span");m.className="nc-hacks-wrap";const v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",m.append(v,ke()),m.addEventListener("click",()=>{const S=e(n);S?.type==="strip"&&S.onHacks?.()}),l.append(m)}const d=document.createElement("div");d.className="nc-strip-ms";for(const m of["mute","solo"]){if(!(m==="mute"?t.onMute:t.onSolo))continue;const S=document.createElement("span");S.className="nc-ms-wrap";const T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=m,T.textContent=m==="mute"?"M":"S",S.append(T,ke()),S.addEventListener("click",()=>{const $=e(n);$?.type==="strip"&&(m==="mute"?$.onMute:$.onSolo)?.()}),d.append(S)}const c=document.createElement("div");c.className="nc-strip-sends";for(const m of t.sends??[])c.append(at({...m,type:"knob",compact:!0},e));const u=document.createElement("div");u.className="nc-strip-pan",t.pan&&u.append(at(Pa(t),e));const p=document.createElement("div");p.className="nc-strip-body";const f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(const m of t.ticks??[]){const v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(m.value)),v.textContent=m.label,f.append(v)}const b=id({label:`${t.label} level`,value:t.value,step:t.step,valueText:t.valueText,onChange:m=>{const v=e(n);v?.type==="strip"&&v.onChange(m)},onReset:()=>{const m=e(n);m?.type==="strip"&&Ki(m)}}),g=dd({channels:t.channels===2?2:1,label:t.label,onClear:()=>{const m=e(n);m?.type==="strip"&&m.onClipClear?.()}});if(p.append(f,b.el,g.el),r){const m=document.createElement("button");m.type="button",m.className="nc-ui-fx-fold nc-strip-fold",m.dataset.ncStripFold="",m.setAttribute("aria-expanded","false");const v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");const S=document.createElement("span");S.className="nc-ui-fx-fold-name",S.dataset.ncStripFoldName="";const T=document.createElement("span");T.className="nc-strip-fold-pan",T.setAttribute("aria-hidden","true"),T.hidden=!t.pan,m.append(v,T,S),m.addEventListener("click",()=>{const $=e(n);if($?.type!=="strip")return;$.onFold?.(!1);const w=n.querySelector("[data-nc-strip-hide]");w instanceof HTMLElement&&w.focus()}),p.prepend(m)}const y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let h=0;return y.addEventListener("click",m=>{const v=e(n);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(h),m.detail===0?Ui(n,y,e):m.detail===1&&(h=window.setTimeout(()=>Ui(n,y,e),Zd)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(h);const m=e(n);m?.type==="strip"&&Ki(m)}),o&&n.append(o),n.append(a,l,d,c,u,p,y,Z()),Pr(n,t),n}function Pa(t){const e=t.pan;return{type:"knob",id:e.id,label:e.label??"L R",ariaLabel:e.ariaLabel??`${t.label} pan`,min:-1,max:1,step:e.step??.05,value:e.value,valueText:e.valueText??Qd(e.value),defaultValue:0,compact:!0,bipolar:!0,help:e.help,onChange:n=>e.onChange(n)}}function Qd(t){const e=Math.round(Math.min(1,Math.max(-1,t))*100);return e===0?"C":e<0?`L ${-e}`:`R ${e}`}const Zd=250;function Ui(t,e,n){const a=n(t);if(a?.type!=="strip"||!a.onTypeIn||t.querySelector(".nc-strip-db-input"))return;const s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=a.valueText??Et(a.value),s.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),e.hidden=!0,e.after(s),s.focus(),s.select?.();let r=!1;const o=l=>{if(r)return;r=!0;const d=s.value;if(s.remove(),e.hidden=!1,l){const c=n(t);c?.type==="strip"&&c.onTypeIn?.(d)}e.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),o(!0)):l.key==="Escape"&&(l.preventDefault(),o(!1))}),s.addEventListener("blur",()=>o(!1))}function eu(t,e){const n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=t.id;const a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");const s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";const r=document.createElement("span");r.className="nc-strip-add-label",a.append(s,r);const o=document.createElement("select");return o.className="nc-strip-add-select",o.addEventListener("change",()=>{const l=e(n),d=o.value;zr(o),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(a,o,Z()),Fr(n,t),n}function Fr(t,e){const n=t.querySelector(".nc-strip-add-label");n&&(n.textContent=e.label);const a=t.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",e.ariaLabel??e.label);const s=[{value:"",label:e.ariaLabel??e.label,disabled:!0},...e.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),o=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==o&&(a.replaceChildren(...s.map(l=>{const d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),zr(a))}function zr(t){const e=t.options[0];e&&(e.selected=!0)}function Ki(t){t.onReset?t.onReset():typeof t.defaultValue=="number"&&t.onChange(t.defaultValue)}function Pr(t,e){const n=t.querySelector("[data-nc-strip-name]");n&&n.textContent!==e.label&&(n.textContent=e.label);const a=t.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${e.label}`),a.title=`Remove ${e.label}`),t.setAttribute("aria-label",e.label);const s=t.querySelector(".nc-fader"),r=s?sd(s):void 0;r&&(r.configure({step:e.step}),r.set(e.value),r.setText(e.valueText),r.setLabel(`${e.label} level`)),ud(t.querySelector(".nc-meter")??void 0)?.setLabel(e.label);const o=t.querySelector(".nc-strip-db");if(o instanceof HTMLElement){const p=e.valueText??Et(e.value);o.textContent!==p&&(o.textContent=p),o.setAttribute("aria-label",`${e.label} level ${p}`);const f=e.resetText?`Double-click: back to ${e.resetText}`:"Double-click to reset";o.title=e.onTypeIn?`Click to type a value. ${f}`:f}for(const p of t.querySelectorAll("[data-nc-ms]")){const f=p.getAttribute("data-nc-ms"),b=f==="mute"?e.mute===!0:e.solo===!0;p.setAttribute("aria-pressed",b?"true":"false"),p.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${e.label}`)}const l=t.querySelector("[data-nc-hacks]");if(l){const p=e.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",e.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${e.label}`)}if(e.silent?t.dataset.silent="true":delete t.dataset.silent,delete t.dataset.ncIdentity,e.pan){t.style.setProperty("--nc-strip-pan",String(e.pan.value));const p=t.querySelector(`.nc-strip-pan [data-nc-id="${gt(e.pan.id)}"]`);p&&de(p,Pa(e))}const d=!e.master&&typeof e.onFold=="function"&&e.folded===!0;d?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const c=t.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Or(c,d,e.label),At(c,e.foldHelp));const u=t.querySelector("[data-nc-strip-fold]");if(u instanceof HTMLElement){u.hidden=!d,u.setAttribute("aria-label",`Expand ${e.label}`);const p=u.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==e.label&&(p.textContent=e.label),At(u,e.foldedHelp??e.foldHelp)}}function tu(t,e){const n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=t.id,n.dataset.ncDepth=String(t.depth);const a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${t.id}-name`,a.textContent=t.title;const s=typeof t.onFold=="function";if(t.on===void 0&&!s)n.append(a);else{const r=document.createElement("div");if(r.className="nc-ui-fx-hd",r.append(a),t.on!==void 0){const o=mr({checked:t.on,labelledBy:a.id,onChange:l=>{const d=e(o.el);d?.type==="fx"&&d.onToggle?.(l)}});o.el.dataset.ncFxSwitch="",r.append(o.el)}s&&r.append(au(n,e)),n.append(r)}s&&n.prepend(iu(n,e));for(const r of t.controls)n.append(at(r,e));if(t.more?.length){const r=document.createElement("details");r.className="nc-ui-more";const o=document.createElement("summary");o.textContent=t.moreLabel??"More",r.append(o);for(const l of t.more)r.append(at(l,e));n.append(r)}return n.append(Z()),Rr(n,t),n}const nu=t=>typeof t.getClientRects=="function"?t.getClientRects().length>0:!t.hidden;function Dr(t){const e=t.querySelector(":scope > [data-nc-fx-fold]"),n=t.querySelector("[data-nc-fx-hide]"),s=t.dataset.ncFolded==="true"&&e&&nu(e)?e:n;s instanceof HTMLElement&&document.activeElement!==s&&s.focus()}function au(t,e){const n=Ir();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{const a=e(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Dr(t))}),n}function Ir(){const t=document.createElement("button");t.type="button",t.className="nc-fold-toggle";const e=document.createElement("span");return e.className="nc-fold-tri",e.setAttribute("aria-hidden","true"),t.append(e),t}function Or(t,e,n){t.setAttribute("aria-expanded",e?"false":"true"),t.setAttribute("aria-label",`${e?"Expand":"Minimize"} ${n}`),t.title=e?"Expand":"Minimize"}function iu(t,e){const n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");const a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";const s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";const r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,s),n.addEventListener("click",()=>{const o=e(n);o?.type==="fx"&&(o.onFold?.(!1),Dr(t))}),n}function Rr(t,e){const n=t.querySelector(".nc-ui-fx-name");n&&(n.textContent=e.title);const a=t.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",e.on?"true":"false"),e.on===!1?t.dataset.ncDim="true":delete t.dataset.ncDim;const s=typeof e.onFold=="function"&&e.folded===!0;s?t.dataset.ncFolded="true":delete t.dataset.ncFolded;const r=t.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Or(r,s,e.title),At(r,e.foldHelp));const o=t.querySelector(":scope > [data-nc-fx-fold]");if(o instanceof HTMLElement){const l=e.on===void 0?"":e.on?"On":"Off";o.hidden=!s,o.setAttribute("aria-label",`Expand ${e.title}${l?`, ${l.toLowerCase()}`:""}`),o.dataset.on=e.on===!0?"true":"false";const d=o.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=l,d.hidden=l==="");const c=o.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=e.title),At(o,e.foldHelp)}}function At(t,e){e?t.setAttribute("data-nc-help",e):t.removeAttribute("data-nc-help")}function gt(t){return t.replace(/["\\]/g,"\\$&")}function su(t,e){for(const n of t.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;const a=e.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);a?.type==="canvas"&&yr(n,a)}Td(t)}const ru=Le["toast-duration"];function ou({message:t,actionLabel:e}){return e?`${t}, ${e}`:String(t)}function lu(t,e,n,a){const s=l=>({top:l,bottom:l+n}),r=l=>t.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),o=s(e-a-n);return r(o)?r(s(a))?"bottom":"top":"bottom"}function _r(t,e,n,a,s,r){let o=t.bottom+s;const l=Math.max(r,Math.min(t.left,a-r-n.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(const u of e)u&&u.bottom>o&&u.top<o+n.height&&u.right>l&&u.left<l+n.width&&(o=u.bottom+s,d=!0)}return{top:o,left:l}}const Wi="data-nc-ui-toast-live";function cu(t,e){let n=e.querySelector(`[${Wi}]`);return n||(n=t.createElement("div"),n.setAttribute(Wi,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",e.appendChild(n)),n}function du({message:t,actionLabel:e,onAction:n,duration:a=ru,onClose:s,avoid:r=[],anchor:o,host:l,document:d=globalThis.document}={}){l=l??d.body;const c=d.defaultView??globalThis,u=d.createElement("div");u.className="nc-ui-toast",u.setAttribute("data-state","enter");const p=d.createElement("span");p.className="nc-ui-toast-message",p.textContent=t,u.appendChild(p);let f=null;e&&(f=d.createElement("button"),f.type="button",f.className="nc-ui-toast-action",f.textContent=e,u.appendChild(f)),l.appendChild(u);let b="open";const g=P=>P&&typeof P.getBoundingClientRect=="function"?P.getBoundingClientRect():null,y=g(u),h=y?.height||44,m=c.getComputedStyle?.(u),v=Number.parseFloat(m?.getPropertyValue(j("toast-offset")))||16,S=Number.parseFloat(m?.getPropertyValue(j("toast-anchor-gap")))||8,T=g(o),$=c.innerHeight??0,w=r.map(g).filter(Boolean),k=T&&T.bottom>0&&T.top<$?_r(T,w,{width:y?.width||0,height:h},c.innerWidth??0,S,v):null;k&&k.top+h<=$?(u.setAttribute("data-placement","anchor"),u.style.top=`${k.top+(c.scrollY??0)}px`,u.style.left=`${k.left+(c.scrollX??0)}px`):u.setAttribute("data-placement",lu(w,$,h,v));const E=c.requestAnimationFrame?.bind(c)??(P=>setTimeout(P,16));E(()=>E(()=>{b==="open"&&u.setAttribute("data-state","open")})),cu(d,l).textContent=ou({message:t,actionLabel:e});let A,L;const F=new Promise(P=>{L=P}),R=P=>{clearTimeout(A),A=setTimeout(()=>qe("timeout"),P)};let _=a,V=Date.now();const oe=()=>{b==="open"&&(clearTimeout(A),_=Math.max(0,_-(Date.now()-V)))},zt=()=>{b==="open"&&(V=Date.now(),R(_))};u.addEventListener("pointerenter",oe),u.addEventListener("pointerleave",zt),u.addEventListener("focusin",oe),u.addEventListener("focusout",zt),f?.addEventListener("click",()=>{if(b==="open")try{n?.()}finally{qe("action")}}),Number.isFinite(a)&&R(a);function qe(P="close"){if(b!=="open")return;b="closing",clearTimeout(A),u.setAttribute("data-state","closing"),s?.(P);const li=c.getComputedStyle?.(u),Ho=li?Math.max(0,...String(li.transitionDuration||"").split(",").map(di=>Number.parseFloat(di)*(di.trim().endsWith("ms")?1:1e3)||0)):0,ci=()=>{b!=="gone"&&(b="gone",u.remove(),L(P))};u.addEventListener("transitionend",ci),setTimeout(ci,Ho+50)}return{el:u,close:qe,closed:F}}function Vi(t){return`${Math.round(Math.min(1,Math.max(0,Number(t)||0))*100)}%`}function uu({anchor:t,title:e,velocity:n,probability:a,onChange:s,onClose:r,host:o,document:l=globalThis.document}){o=o??l.body;const d=l.defaultView??globalThis,c={velocity:n,probability:a},u=l.createElement("div");u.className="nc-slot-scrim nc-step-editor-scrim";const p=l.createElement("div");p.className="nc-step-editor",p.setAttribute("role","dialog"),p.setAttribute("aria-label",e);const f=l.createElement("div");f.className="nc-step-editor-head";const b=l.createElement("span");b.className="nc-label",b.textContent=e;const g=l.createElement("button");g.type="button",g.className="nc-step-editor-done",g.textContent="Done",f.append(b,g),p.appendChild(f);const y=[];for(const[T,$]of[["velocity","Velocity"],["probability","Chance"]]){const w=l.createElement("label");w.className="nc-step-editor-row";const k=l.createElement("span");k.className="nc-label",k.textContent=$;const E=l.createElement("input");E.type="range",E.className="nc-range",E.min=T==="velocity"?"0.05":"0",E.max="1",E.step="0.05",E.value=String(c[T]),E.setAttribute("data-nc-edit",T);const A=l.createElement("output");A.className="nc-readout",A.textContent=Vi(c[T]),E.setAttribute("aria-valuetext",A.textContent),E.addEventListener("input",()=>{c[T]=Number(E.value),A.textContent=Vi(c[T]),E.setAttribute("aria-valuetext",A.textContent),s({velocity:c.velocity,probability:c.probability})}),w.append(k,E,A),p.appendChild(w),y.push(E)}if(o.append(u,p),t?.setAttribute?.("data-editing","true"),d.matchMedia?.(`(max-width: ${rr.breakpoint.md})`).matches??!1)p.setAttribute("data-placement","sheet"),u.setAttribute("data-placement","sheet");else{const T=t?.getBoundingClientRect?.(),$=p.getBoundingClientRect(),w=Number.parseFloat(d.getComputedStyle(p).getPropertyValue("row-gap"))||8;if(T){let{top:k,left:E}=_r(T,[],{width:$.width,height:$.height},d.innerWidth,w,w);k+$.height>d.innerHeight&&(k=Math.max(w,T.top-w-$.height)),p.style.top=`${k}px`,p.style.left=`${E}px`}p.setAttribute("data-placement","anchor")}y[0]?.focus({preventScroll:!0});let m=!0;const v=T=>{T.key==="Escape"&&(T.preventDefault(),S())};function S(){m&&(m=!1,l.removeEventListener("keydown",v,!0),u.remove(),p.remove(),t?.removeAttribute?.("data-editing"),t?.isConnected&&typeof t.focus=="function"&&t.focus({preventScroll:!0}),r?.())}return l.addEventListener("keydown",v,!0),u.addEventListener("pointerdown",T=>{T.preventDefault(),S()}),g.addEventListener("click",S),{el:p,close:S}}const bt="data-nc-help",pu=350;function hu(t,e,n,a=0,s=6,r=8){const o=t.top-s-e.height,l=o>=a+r?"above":"below",d=l==="above"?o:t.bottom+s,c=Math.max(r,Math.min(t.left,n-r-e.width));return{top:Math.round(d),left:Math.round(c),side:l}}const Ln=new WeakMap;function fu(t){const e=parseFloat(t.defaultView?.getComputedStyle(t.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(e)?e:0}function mu({document:t=globalThis.document,delay:e=pu}={}){if(!t)return{uninstall(){},hide(){}};const n=Ln.get(t);if(n)return n;const a=t.defaultView;let s=null,r=null,o;const l=()=>{clearTimeout(o),r=null,s&&(s.hidden=!0)},d=f=>{const b=f.getAttribute(bt);if(!b)return;s||(s=t.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",t.body.appendChild(s)),s.textContent=b,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";const g=f.getBoundingClientRect(),y=hu(g,{width:s.offsetWidth,height:s.offsetHeight},a.innerWidth,fu(t));s.style.top=`${y.top}px`,s.style.left=`${y.left}px`,s.dataset.side=y.side,s.style.visibility=""},c=f=>{if(f.pointerType==="touch")return;const b=f.target&&f.target.closest?f.target.closest(`[${bt}]`):null;b!==r&&(l(),b&&(r=b,o=setTimeout(()=>{r===b&&b.isConnected&&d(b)},e)))},u=f=>{f.key==="Escape"&&l()};t.addEventListener("pointerover",c),t.addEventListener("pointerdown",l,!0),t.addEventListener("keydown",u),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);const p={hide:l,uninstall(){l(),t.removeEventListener("pointerover",c),t.removeEventListener("pointerdown",l,!0),t.removeEventListener("keydown",u),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),s?.remove(),s=null,Ln.delete(t)}};return Ln.set(t,p),p}const Da="netcomposer.rhythm.hidden.v1",Te=new WeakMap;function Cn(){try{return globalThis.localStorage??null}catch{return null}}function Br(t,e=Da){try{const n=JSON.parse(t?.getItem(e)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Yi(t,e,n,a=Da){const s=Br(t,a);n?s.add(e):s.delete(e);try{t?.setItem(a,JSON.stringify([...s]))}catch{}}function Ia(t){const e=[...t.controls??[],...(t.sections??[]).flatMap(s=>s.controls)],n=[],a=s=>{if(n.push(s),s.type==="group")for(const r of s.controls)a(r)};for(const s of e)a(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),s.pan&&n.push(Pa(s)));return n}function gu(t,e){if(!(!t||!e))return Ia(t).find(n=>n.id===e)}function bu(t){return`${`${t.layout??""}:${(t.sections??[]).map(n=>`${n.id}${n.panel?":panel":""}${n.area?`@${n.area}`:""}`).join(",")}`}#${Ia(t).map(n=>n.type==="stepGrid"?`stepGrid:${n.id}:${n.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${n.onMute?":m":""}${n.onSolo?":s":""}`:n.type==="moves"?`moves:${n.id}:${n.groups.map(a=>`${a.id}=${a.moves.map(s=>s.id).join("+")}`).join(",")}`:n.type==="padGrid"?`padGrid:${n.id}:${n.pads.length}:${n.columns??2}`:n.type==="slotRow"?`slotRow:${n.id}:${n.slots.length}${n.onSparkle?":spark":""}`:n.type==="button"?`button:${n.id}${n.onSparkle?":spark":""}`:n.type==="select"?`select:${n.id}:${n.options.map(a=>a.value).join(",")}`:n.type==="strip"?`strip:${n.id}:${n.channels??1}:${n.master?"master":""}:${n.onMute?"m":""}${n.onSolo?"s":""}${n.onRemove?"x":""}${n.onHacks?"h":""}${n.onFold?"f":""}${n.pan?`p=${n.pan.id}`:""}:${(n.sends??[]).map(a=>a.id).join(",")}:${(n.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:n.type==="group"?`group:${n.id}:${n.controls.map(a=>a.id).join(",")}`:n.type==="fx"?`fx:${n.id}:${n.depth}:${n.on===void 0?"":"sw"}${n.onFold?":fold":""}:${n.controls.map(a=>a.id).join(",")}/${(n.more??[]).map(a=>a.id).join(",")}`:`${n.type}:${n.id}`).join("|")}`}function yu(t,e){if(!e.title)return;if(!e.panel){const r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=e.title,t.append(r);return}const n=document.createElement("div");n.className="nc-panel-hd";const a=document.createElement("h3");a.className="nc-panel-title",a.textContent=e.title;const s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(a,s),t.append(n),Hr(t,e)}function Hr(t,e){if(!e.panel)return;const n=[...t.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");a&&(a.textContent=e.title??""),s&&(s.textContent=e.subject??""),e.lane?t.dataset.ncLane=String(e.lane):delete t.dataset.ncLane}function wu(t){const e=t.closest?.(".nc-module");if(!(e instanceof HTMLElement))return;const n=Te.get(e),a=t.getAttribute?.("data-nc-id")??t.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return gu(n,a)}function vu(t,e){const n=e.sections??[{id:"main",controls:e.controls??[]}],a=bu(e);if(t.dataset.ncSignature===a){for(const s of n){const r=t.querySelector(`[data-nc-section="${Xi(s.id)}"]`);r&&Hr(r,s);for(const o of s.controls){const l=t.querySelector(`[data-nc-id="${Xi(o.id)}"]`);l instanceof Element&&de(l,o)}}return}t.dataset.ncSignature=a,t.replaceChildren(),e.layout==="console"?t.dataset.ncLayout="console":delete t.dataset.ncLayout;for(const s of n){const r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),yu(r,s);const o=s.panel?document.createElement("div"):r;s.panel&&(o.className="nc-panel-body",r.append(o));for(const l of s.controls)o.append(at(l,wu));t.append(r)}}function Xi(t){return t.replace(/["\\]/g,"\\$&")}function Oa(t,e=Da){fr();const n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=t.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",t.lead&&(n.dataset.ncLead=""),t.compact&&(n.dataset.ncCompact="");const a=Br(Cn(),e).has(t.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";const r=document.createElement("h2");r.className="nc-title",r.id=`${t.id}-title`;const o=document.createElement("span");o.className="nc-module-end";const l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";const d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";const c=mr({labelledBy:r.id,onChange:m=>(Te.get(n)??t).onToggle?.(m)});c.el.dataset.ncModuleSwitch="",o.append(c.el,l,d);const u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",s.append(r,u,o);const p=document.createElement("div");p.className="nc-module-body",p.id=`${t.id}-body`;const f=document.createElement("button");f.type="button",f.className="nc-slim";const b=document.createElement("span");b.className="nc-slim-lines",f.append(b);const g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,s,p,f),n.setAttribute("aria-labelledby",r.id);const y=m=>{const v=Te.get(n)??t;n.dataset.ncOpen=m?"false":"true",p.hidden=m,f.hidden=!m,l.textContent=m?"+":"−",l.setAttribute("aria-expanded",m?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${m?"Show":"Hide"} ${v.title}`),l.title=m?"Show":"Hide",m?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{const m=n.dataset.ncOpen==="true";Yi(Cn(),(Te.get(n)??t).id,m,e),y(m),ea(n.parentElement)}),f.addEventListener("click",()=>{Yi(Cn(),(Te.get(n)??t).id,!1,e),y(!1),ea(n.parentElement)});const h={el:n,update(m){Te.set(n,m),m.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=m.title,u.textContent=m.status??"",m.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),b.textContent=m.summary??m.title,c.el.hidden=m.on===void 0,c.set(m.on===!0),m.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${m.title}`),vu(p,m),y(p.hidden),h.redraw()},redraw(){const m=Te.get(n);m&&su(n,Ia(m))}};return Te.set(n,t),y(a),h.update(t),typeof ResizeObserver<"u"&&new ResizeObserver(()=>h.redraw()).observe(n),hr(()=>h.redraw(),n.ownerDocument),h}function ku(t,e,n="adjacent"){fr(t.ownerDocument),t.classList.add("nc-stack"),t.dataset.ncLayout=n==="stack"?"stack":"adjacent",t.replaceChildren();const a=n==="stack"?"stack":"adjacent";e.forEach((s,r)=>{const o=r%4+1;s.el.dataset.ncShade=String(o),s.el.dataset.ncPlace=a;const l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(o).padStart(2,"0")),t.append(s.el),s.redraw()}),ea(t)}function ea(t){if(!(t instanceof HTMLElement))return;if(t.dataset.ncLayout!=="adjacent"){t.style.removeProperty("--astrid-cols"),delete t.dataset.ncStackLast;return}const e=[...t.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=e.some(r=>r.hasAttribute("data-nc-lead")),a=e.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");t.style.setProperty("--astrid-cols",a.join(" "));const s=e.filter(r=>!r.hasAttribute("data-nc-slim"));n&&e.length===4&&s.length===4?t.dataset.ncStackLast="true":delete t.dataset.ncStackLast}function qr(){return new Promise(t=>{if(typeof requestAnimationFrame!="function"){setTimeout(t,0);return}requestAnimationFrame(()=>setTimeout(t,0))})}function xu(t=200){return new Promise(e=>{const n=globalThis.requestIdleCallback;typeof n=="function"?n(()=>e(),{timeout:t}):setTimeout(e,0)})}function $u(t,e={}){const n=new Set,a=(async()=>{await qr();for(const s of t)await xu(e.timeoutMs??200),s.build(),n.add(s)})();return{ready:s=>n.has(s),done:a,toJSON:()=>({built:n.size,total:t.length})}}function Ra(){const t=globalThis.scheduler;return typeof t?.yield=="function"?t.yield():typeof MessageChannel!="function"?new Promise(e=>setTimeout(e,0)):new Promise(e=>{const n=new MessageChannel;n.port1.onmessage=()=>{n.port1.close(),e()},n.port2.postMessage(null)})}var Su=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ta=[.25,.5,.75,1,1.5,2],Eu=4.9,B={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0},hallTone:{exp2:[1500,3.7],div:100,round:!0},crunchRate:{pow:[4e3,44100/4e3],div:100,round:!0}},le={fmt:"wet"},q={fmt:"pct"},Ge={fmt:"db"},_t={fmt:"signedPct"},dt={fmt:"num",suffix:" ms"},D={div:100};function M(t,e,n,a,s,r,o,l){var d={key:t,label:e,min:n,max:a,default:s,step:1,k:r,unit:null,format:o};if(l)for(var c in l)d[c]=l[c];return d}function be(t){return t.map(function(e){return{value:e[0],label:e[1]}})}var yt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[M("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:B.hpHz,astrid:!0,zero:"off"}),M("q","Resonance",0,100,0,2,{fmt:"q",law:B.hpQ},{dsp:{law:B.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[M("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:B.bpHz,astrid:!0},{dsp:{law:B.bpHz}}),M("q","Q",0,100,0,2,{fmt:"q",law:B.bpQ},{dsp:{law:B.bpQ}}),M("mix","Mix",0,100,100,3,le,{dsp:D,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[M("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:be(Su),overriddenBy:"beats_free",tempoSynced:!0}),M("feedback","Feedback",0,90,35,2,q,{dsp:D,unit:"%"}),M("mix","Wet/dry",0,100,0,3,le,{dsp:D,unit:"%",astridKey:"wet"}),M("tone","Tone",0,100,100,4,{fmt:"hz",law:B.delayTone,offAt:100},{dsp:{div:99},more:!0}),M("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:be([[0,"Insert"],[1,"Send"]]),more:!0}),M("send","Send",0,100,100,7,q,{dsp:D,unit:"%",more:!0}),M("mod_send","Accent → send",-100,100,0,8,_t,{dsp:D,unit:"%",more:!0}),M("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[M("predelay","Pre-delay",0,200,0,1,dt,{dsp:{div:1e3},unit:"ms"}),M("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:D,unit:"%"}),M("decay","Decay",0,100,50,3,q,{dsp:D,unit:"%"}),M("damping","Damping",0,100,0,4,q,{dsp:D,unit:"%"}),M("mix","Mix",0,100,0,5,le,{dsp:D,unit:"%"})]},{type:"hall",label:"Hall",own:!0,dials:[M("size","Size",0,100,60,1,q,{dsp:D,unit:"%"}),M("decay","Decay",5,120,35,2,{fmt:"fixed",div:10,add:0,digits:1,suffix:" s"},{dsp:{div:10},unit:"s"}),M("predelay","Pre-delay",0,250,20,3,dt,{dsp:{div:1e3},unit:"ms"}),M("tone","Tone",0,100,60,4,{fmt:"hz",law:B.hallTone,astrid:!0},{dsp:{law:B.hallTone}}),M("mix","Mix",0,100,25,5,le,{dsp:D,unit:"%"}),M("low_cut","Low cut",0,1e3,120,6,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),M("width","Width",0,100,100,7,q,{dsp:D,unit:"%",more:!0}),M("motion","Motion",0,100,30,8,q,{dsp:D,unit:"%",more:!0})]},{type:"ensemble",label:"Ensemble",own:!0,dials:[M("rate","Rate",0,100,35,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,60,2,q,{dsp:D,unit:"%"}),M("width","Width",0,100,80,3,q,{dsp:D,unit:"%"}),M("mix","Mix",0,100,50,4,le,{dsp:D,unit:"%"}),M("voices","Voices",3,6,3,5,{fmt:"option"},{step:null,options:be([[3,"3"],[6,"6"]]),more:!0}),M("vibrato","Vibrato",0,100,20,6,q,{dsp:D,unit:"%",more:!0})]},{type:"gate",label:"Gate",own:!0,tempoSynced:!0,pattern:!0,dials:[M("rate","Rate",4,16,4,1,{fmt:"option"},{step:null,options:be([[4,"1/4"],[8,"1/8"],[16,"1/16"],[12,"1/8T"]])}),M("swing","Swing",0,100,0,3,q,{dsp:D,unit:"%"}),M("depth","Depth",0,100,90,4,q,{dsp:D,unit:"%"}),M("mix","Mix",0,100,100,5,le,{dsp:D,unit:"%"}),M("steps","Steps",8,16,8,2,{fmt:"option"},{step:null,options:be([[8,"8"],[16,"16"]]),more:!0}),M("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:be([[0,"Volume"],[1,"Filter"]]),more:!0}),M("smooth","Smooth",1,20,4,7,dt,{unit:"ms",more:!0}),M("spread","Spread",0,100,0,8,q,{dsp:D,unit:"%",more:!0}),M("res","Resonance",0,100,20,9,q,{dsp:D,unit:"%",more:!0})]},{type:"crunch",label:"Crunch",own:!0,note:"Rate with no filter, then Bits: the S950 / SP-1200 grit.",dials:[M("rate","Rate",0,100,78,1,{fmt:"khz",law:B.crunchRate},{step:.1,dsp:{law:B.crunchRate}}),M("bits","Bits",4,16,12,2,{fmt:"num",suffix:"-bit"},{unit:"bits"}),M("hold","Steps",0,1,0,3,{fmt:"option"},{step:null,options:be([[0,"Hard"],[1,"Smooth"]]),more:!0})]},{type:"flanger",label:"Flanger",dials:[M("rate","Rate",0,100,26,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,70,2,q,{dsp:D,unit:"%"}),M("feedback","Feedback",-90,90,50,3,_t,{dsp:D,unit:"%"}),M("mix","Mix",0,100,50,4,le,{dsp:D,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[M("rate","Rate",0,100,52,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,50,2,q,{dsp:D,unit:"%"}),M("spread","Spread",0,100,70,3,q,{dsp:D,unit:"%"}),M("mix","Mix",0,100,40,4,le,{dsp:D,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[M("rate","Rate",0,100,39,1,{fmt:"rate",law:B.rate},{dsp:{law:B.rate}}),M("depth","Depth",0,100,70,2,q,{dsp:D,unit:"%"}),M("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:be([[4,"4"],[6,"6"],[8,"8"]])}),M("feedback","Feedback",0,90,30,4,q,{dsp:D,unit:"%"}),M("mix","Mix",0,100,50,5,le,{dsp:D,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[M("low_db","Low",-18,18,0,1,Ge,{unit:"dB"}),M("mid_db","Mid",-18,18,0,2,Ge,{unit:"dB"}),M("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:B.midHz,astrid:!0},{dsp:{law:B.midHz}}),M("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:B.eqQ},{dsp:{law:B.eqQ}}),M("high_db","High",-18,18,0,4,Ge,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[M("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),M("output_db","Output",-12,12,0,2,Ge,{unit:"dB"}),M("mix","Mix",0,100,100,3,le,{dsp:D,unit:"%"}),M("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:be([[0,"Smooth"],[1,"Acid"]]),more:!0}),M("tone","Tone",0,100,100,5,{fmt:"hz",law:B.driveTone,offAt:100},{dsp:{div:99},more:!0}),M("mod_drive","Accent → drive",-100,100,0,6,_t,{dsp:D,unit:"%",more:!0}),M("mod_tone","Accent → tone",-100,100,0,7,_t,{dsp:D,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[M("threshold_db","Threshold",-60,0,0,1,Ge,{unit:"dB"}),M("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:B.ratio},{dsp:{law:B.ratio}}),M("attack_ms","Attack",1,100,10,3,dt,{unit:"ms"}),M("release_ms","Release",10,1e3,150,4,dt,{unit:"ms"}),M("makeup_db","Makeup",0,24,0,5,Ge,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[M("width","Width",0,200,100,1,q,{dsp:D,unit:"%"}),M("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:D})]}],Au=yt.map(function(t){return t.type});yt.filter(function(t){return!t.hidden}).map(function(t){return t.type});var Tu={reverb:"plate"},na={};function jr(t){return typeof t=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(t)&&t.length<=71}function _a(t){var e=Tu[t]||t;return Au.indexOf(e)>=0||typeof e=="string"&&na[e]?e:null}function te(t){for(var e=_a(t),n=0;n<yt.length;n++)if(yt[n].type===e)return yt[n];return e&&na[e]?na[e]:null}function Fe(t,e){if(t.zeroNull&&e<=0)return null;var n=t.pow?t.pow[0]*Math.pow(t.pow[1],e/t.div):t.exp2[0]*Math.pow(2,t.exp2[1]*e/t.div);return t.fixed!==void 0?+n.toFixed(t.fixed):t.round?Math.round(n):n}function Gr(t,e){var n=t.dsp;if(!n)return e;if(n.div)return e/n.div;var a=Fe(n.law,e);return a===null?0:a}function Ji(t,e){return Math.min(Eu,t*60/(e>0?e:120))}var Qi=function(t){return t>0?"+":t<0?"−":""};function Mu(t){return t==null?"open":t>=1e3?(t/1e3).toFixed(t>=1e4?0:1)+" kHz":t+" Hz"}function Ur(t,e,n){var a=t.format,s;switch(a.fmt){case"db":return e===0&&a.zero?a.zero:Qi(e)+Math.abs(e)+" dB";case"pct":return e+"%";case"wet":return e+"% wet";case"signedPct":return Qi(e)+Math.abs(e)+"%";case"num":return e+a.suffix;case"fixed":return(a.add+e/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&e>=a.offAt?"off":a.law?(s=Fe(a.law,e),s===null?a.zero||"open":a.astrid?Mu(s):s+" Hz"):e===0&&a.zero?a.zero:e+" Hz";case"khz":return(Fe(a.law,e)/1e3).toFixed(1)+" kHz";case"q":return"Q "+Fe(a.law,e).toFixed(1);case"ratio":return Fe(a.law,e).toFixed(1)+":1";case"rate":return s=Fe(a.law,e),(s<1?s.toFixed(2):s<10?s.toFixed(1):s.toFixed(0))+" Hz";case"balance":return e===0?"centre":e<0?"L "+-e:"R "+e;case"stages":return e+" stages";case"option":for(var r=0;r<t.options.length;r++)if(t.options[r].value===e)return t.options[r].label;return String(e);case"tempoMs":return Math.round(Ji(e,n)*1e3)+" ms";case"freeBeats":return e===0?"off":"free "+ +e.toFixed(3)+" beats · "+Math.round(Ji(e,n)*1e3)+" ms"}return String(e)}var Lu=1,fn=["drive","delay","plate"];function Cu(t){var e={};for(var n in t)n!=="format"&&(e[n]=t[n]);return e.format=function(a,s){return Ur(t,a,s)},e}var wt=fn.map(function(t){var e=te(t),n={type:t,label:e.label,dials:e.dials.map(Cu)};return e.tempoSynced&&(n.tempoSynced=!0),n}),Nu={reverb:"plate"};function Zt(t){var e=Nu[t]||t;return fn.indexOf(e)>=0?e:null}function mn(t){for(var e=Zt(t),n=0;n<wt.length;n++)if(wt[n].type===e)return wt[n];return null}function Kr(t,e){var n=mn(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}function it(t,e){if(t.stepWhen&&e){for(var n=0;n<t.stepWhen.length;n++)if(e[t.stepWhen[n].key]===t.stepWhen[n].value)return t.stepWhen[n].step}return t.step}function xe(t,e,n){if(typeof e!="number"||!isFinite(e))return t.default;if(t.options){for(var a=t.options[0].value,s=1;s<t.options.length;s++)Math.abs(t.options[s].value-e)<Math.abs(a-e)&&(a=t.options[s].value);return a}if(t.exact)return e>0?e<t.minOn?t.minOn:e>t.max?t.max:e:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(t.min,Math.min(t.max,Math.round(e*r)/r))+0}function Fu(){return{v:Lu,chain:wt.map(function(t){var e={};return t.dials.forEach(function(n){e[n.key]=n.default}),{id:t.type,type:t.type,bypass:!0,dials:e}})}}function zu(t){return ta.reduce(function(e,n){return Math.abs(n-t)<Math.abs(e-t)?n:e},ta[0])}function Nn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Pu(t){for(var e=Array.isArray(t)?t:Nn(t)&&Array.isArray(t.chain)?t.chain:[],n=Array.isArray(t),a=Fu(),s={},r=[],o=0;o<e.length;o++){var l=e[o];if(Nn(l)){var d=Zt(l.type);if(!d){typeof l.type=="string"&&r.push(l.type);continue}if(s[d]){r.push(d);continue}s[d]=!0;var c=a.chain[fn.indexOf(d)],u=Nn(l.dials)?l.dials:{};d==="delay"&&u.mix===void 0&&u.wet!==void 0&&(u=Object.assign({},u,{mix:u.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,mn(d).dials.forEach(function(p){c.dials[p.key]=xe(p,u[p.key])}),Du(d,c.dials,u)}}return{state:a,dropped:r}}function Du(t,e,n){for(var a=mn(t),s=0;s<a.dials.length;s++){var r=a.dials[s];r.stepWhen&&(e[r.key]=xe(r,n&&typeof n[r.key]=="number"?n[r.key]:e[r.key],it(r,e)))}}function aa(t){return Pu(t).state}function Iu(t){return JSON.parse(JSON.stringify(t))}var Ou=24,ia={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function sa(t,e,n){if(e==="bypass")return n?0:1;var a=Kr(t,e)||Ru(t,e);return a?Gr(a,n):0}function Ru(t,e){var n=te(t);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===e)return n.dials[a];return null}var _u={};wt.forEach(function(t){t.dials.forEach(function(e){_u[t.type+"."+e.key]=e.format})});function Fn(t,e){var n=new Float64Array(Ou),a=aa(t);return a.chain.forEach(function(s){var r=ia[s.type];n[r.bypass]=s.bypass?0:1,Object.keys(s.dials).forEach(function(o){n[r[o]]=sa(s.type,o,s.dials[o])})}),n}var Zi={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded.",6:"It got stuck in a loop, so it was stopped."},Bu=["hard","pump","swell","blip","glide"],Wr=16;function ye(t){for(var e=[],n=0;n<Wr;n++)e.push(t[n%t.length]);return e}var ra=[{name:"Ducker",note:"The four-on-the-floor duck: every beat dips and comes back.",dials:{rate:4,steps:8,swing:0,depth:90,mode:0},levels:ye([100]),shapes:ye([1])},{name:"Tide",note:"One slow breath a bar.",dials:{rate:8,steps:16,swing:0,depth:85,mode:0},levels:ye([15,35,60,85,100,85,60,35]),shapes:ye([4])},{name:"Stutter",note:"A sixteenth gate with gaps.",dials:{rate:16,steps:16,swing:0,depth:100,mode:0},levels:[100,0,100,100,0,100,0,100,100,0,100,100,0,100,100,0],shapes:ye([0])},{name:"Lope",note:"Swung eighths, short hits.",dials:{rate:8,steps:16,swing:50,depth:100,mode:0},levels:ye([100,55,85,40,100,55,85,70]),shapes:ye([3])},{name:"Embers",note:"Each eighth swells and cuts; the bar fades.",dials:{rate:8,steps:8,swing:0,depth:100,mode:0},levels:ye([100,85,70,60,50,40,30,20]),shapes:ye([2])},{name:"Sieve",note:"Filter mode: sixteenths open a low-pass, a climb at the end of the bar.",dials:{rate:16,steps:16,swing:0,depth:85,mode:1,res:35},levels:[100,20,55,25,95,25,60,35,100,20,55,25,70,80,90,100],shapes:[3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0]}],Hu="Ducker";function Vr(t){for(var e=String(t||"").toLowerCase(),n=0;n<ra.length;n++){var a=ra[n];if(a.name.toLowerCase()===e)return{name:a.name,dials:Object.assign({},a.dials),pattern:{levels:a.levels.slice(),shapes:a.shapes.slice()}}}return null}function es(t,e,n,a){return typeof t!="number"||!isFinite(t)?a:(t=Math.round(t),t<e?e:t>n?n:t)}function Ba(t){for(var e=ra[0],n=t&&typeof t=="object"?t:{},a=Array.isArray(n.levels)?n.levels:[],s=Array.isArray(n.shapes)?n.shapes:[],r={levels:[],shapes:[]},o=0;o<Wr;o++)r.levels.push(es(a[o],0,100,e.levels[o])+0),r.shapes.push(es(s[o],0,Bu.length-1,e.shapes[o])+0);return r}function qu(t){var e=Ba(t),n=[],a,s,r;for(a=0;a<4;a++){for(r=0,s=3;s>=0;s--)r=r*101+e.levels[a*4+s];n.push([10+a,r])}for(a=0;a<2;a++){for(r=0,s=7;s>=0;s--)r=r*5+e.shapes[a*8+s];n.push([14+a,r])}return n}var ju=2,en=3,ts=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function ze(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}var Gu=/^local:[A-Za-z0-9._@-]{1,200}$/,Uu=/^\d+\.\d+\.\d+$/;function Ku(t,e){var n=ze(t)?t:{},a=e.slice(7),s={id:a,version:typeof n.version=="string"&&Uu.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&(/^https?:\/\//.test(n.url)||Gu.test(n.url))&&(s.url=n.url),typeof n.name=="string"&&n.name.trim()&&(s.name=n.name.trim().slice(0,40)),s}function Yr(t){var e=t.plugin;return{id:e.id,version:e.version,url:e.url,name:t.label}}function Wu(t){var e={},n=0;if(ze(t))for(var a in t)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof t[a]=="number"&&isFinite(t[a])&&(e[a]=t[a],n++);return e}function Vu(t){return t.plugin?t.plugin.idBase:t.type}function Xr(t,e){var n=te(t);if(!n)return null;var a={};(e||[]).forEach(function(c){c&&c.id&&(a[c.id]=!0)});for(var s=1,r=Vu(n);a[r+"-"+s];)s++;var o={};n.dials.forEach(function(c){o[c.key]=c.default});var l={id:r+"-"+s,type:n.type,bypass:!1,dials:o};if(n.plugin&&(l.plugin=Yr(n)),n.pattern){var d=Vr(Hu);Object.assign(l.dials,d.dials),l.pattern=d.pattern}return l}function Yu(t){var e=te(t.type),n=/-(\d+)$/.exec(t.id||""),a=e?e.label:t.plugin&&t.plugin.name?t.plugin.name:t.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function Xu(t,e,n){var a=t.length-1,s=Math.max(0,Math.min(a,n));if(e<0||e>a||e===s)return t;var r=t.slice(),o=r.splice(e,1)[0];return r.splice(s,0,o),r}function Ju(t){return typeof t=="number"&&isFinite(t)?zu(t):t}function ns(t,e,n){var a={};return t.dials.forEach(function(s){var r=e[s.key];r===void 0&&s.astridKey&&(r=e[s.astridKey]),n&&t.type==="delay"&&s.key==="delay_beats"&&(r=Ju(r)),a[s.key]=t.plugin?xe(s,r,s.step):xe(s,r)}),t.dials.forEach(function(s){s.stepWhen&&(a[s.key]=xe(s,typeof e[s.key]=="number"?e[s.key]:a[s.key],it(s,a)))}),a}function Qu(t,e){if(!(typeof e!="number"||!isFinite(e))){var n=t.dsp;if(!n)return e;if(n.div)return Math.round(e*n.div*1e6)/1e6;for(var a=t.min,s=1/0,r=t.min;r<=t.max;r++){var o=Fe(n.law,r),l=o===null?1/0:Math.abs(o-e);l<s&&(s=l,a=r)}return a}}var Zu={rate:"rate_hz"};function ep(t,e,n,a){var s={};return t.dials.forEach(function(r){if(!r.more){var o=r.astridKey||Zu[r.key]||r.key;s[r.key]=Qu(r,e[o])}}),t.type==="eq"&&e.low_hz==null&&e.high_hz==null&&e.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),s}function tp(t,e){var n=e>0?Math.floor(e):en,a=[],s=[],r=[],o=!1,l=!1;Array.isArray(t)?(r=t,l=!0):ze(t)&&Array.isArray(t.chain)&&(r=t.chain,o=t.v===1,l=t.schema===2);for(var d=[],c=0;c<r.length;c++){var u=r[c];if(ze(u)&&!(u.type==="limiter"||u.fixed===!0)){var p=_a(u.type),f=p&&te(p);if(!f&&!o&&jr(u.type)){if(d.length>=n){a.push(u.id||u.type);continue}for(var b=Ku(u.plugin,u.type),g=b.id.split(".").pop(),y=1;d.some(function(w){return w.id===g+"-"+y});)y++;var h=typeof u.id=="string"&&ts.test(u.id)&&!d.some(function(w){return w.id===u.id})?u.id:g+"-"+y;d.push({id:h,type:u.type,bypass:u.bypass===!0,dials:Wu(u.dials),plugin:b});continue}if(!f||o&&["drive","delay","plate"].indexOf(p)<0){typeof u.type=="string"&&a.push(u.type);continue}if(d.length>=n){a.push(u.id||p);continue}var m;ze(u.params)&&!ze(u.dials)?m=ns(f,ep(f,u.params,s,u.id||p),l):m=ns(f,ze(u.dials)?u.dials:{},l);var v=Xr(p,d),S=typeof u.id=="string"&&ts.test(u.id)&&!d.some(function(w){return w.id===u.id})?u.id:v.id,T=o?u.bypass!==!1:u.bypass===!0,$={id:o?v.id:S,type:p,bypass:T,dials:m};f.plugin&&($.plugin=Yr(f)),f.pattern&&($.pattern=Ba(u.pattern)),d.push($)}}return{state:{v:ju,chain:d},dropped:a,notes:s}}function Ut(t,e){return tp(t,e).state}function Ee(t){var e=te(t.type),n=[[0,t.bypass?0:1]];return e&&(e.dials.forEach(function(a){n.push([a.k,Gr(a,t.dials[a.key])])}),e.pattern&&(n=n.concat(qu(t.pattern)))),n}function np(t){var e=Ut(t,8),n=[],a=e.chain.filter(function(s){if(s.plugin)return n.push(s.id+": ASTRID has no plugins"),!1;var r=te(s.type);return r&&r.own?(n.push(s.id+": ASTRID has no "+r.label),!1):!0}).map(function(s,r){var o=te(s.type),l={};return r>=en&&n.push(s.id+": ASTRID keeps three hacks"),o.dials.forEach(function(d){var c=s.dials[d.key];if(d.more){c!==d.default&&n.push(s.id+"."+d.key);return}d.key==="delay_beats"&&ta.indexOf(c)<0&&n.push(s.id+".delay_beats"),l[d.astridKey||d.key]=c}),{id:s.id,type:s.type,bypass:s.bypass,dials:l}});return{hacks:a,lossy:n}}var ap="nc-fx@1",ip=600,sp=256,rp=8,ut=typeof WeakMap=="function"?new WeakMap:null;function op(t,e){var n=ut&&ut.get(t);return n||(n=(async function(){if(!t||!t.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(e){await t.audioWorklet.addModule(String(e));return}var a=(await Hs(async()=>{const{default:r}=await import("./worklet-source-Bi3zqun9.js");return{default:r}},[])).default,s=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await t.audioWorklet.addModule(s)}finally{URL.revokeObjectURL(s)}})(),ut&&(ut.set(t,n),n.catch(function(){ut.delete(t)})),n)}function Ae(t,e){return typeof t=="number"&&isFinite(t)?t:e}function Jr(t,e,n,a){var s=Math.min(400,Math.max(20,Ae(e.bpm,120))),r=[],o=e.limiter==="soft"||e.limiter==="lookahead"?e.limiter:"off",l=e.bypassMode==="hold"?"hold":"run",d=Ae(e.preGain,1),c=Math.max(0,Ae(e.crossfade,.012)),u=Ae(e.maxDelaySeconds,void 0),p=t.createGain(),f=t.createGain(),b=t.createGain(),g=t.createGain(),y=null;e.modInput===!0&&(y=t.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,p.connect(b),b.connect(f),g.connect(f);var h={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:s,mUsers:0,lv:null,lvAt:0,clk:null},m=n(s);h.post=function(w){h.node?h.node.port.postMessage(w):h.disposed||(r.length>=sp&&(r=a().concat([{t:"tempo",bpm:h.bpm,when:0}]),h.mUsers>0&&r.push({t:"meter",on:!0})),r.push(w))};function v(w){var k=r.map(function(E){var A=Object.assign({},E);return A.when>w||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return r=[],k}h.emit=function(w){for(var k=0;k<h.listeners.length;k++)try{h.listeners[k](w)}catch(E){typeof console<"u"&&console.error(E)}},h.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var S=!1;h.tooFar=function(w){return typeof w=="number"&&w>t.currentTime+ip?(!S&&typeof console<"u"&&(S=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-t.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var T=op(t,e.moduleUrl).then(function(){if(!h.disposed){var w=Object.assign({bpm:s,bypassMode:l,limiter:o,preGain:d,maxDelaySeconds:u},m);w.pending=v(t.currentTime),h.node=new AudioWorkletNode(t,ap,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),h.node.port.onmessage=function(E){var A=E.data;if(A&&A.t==="lv"&&h.mUsers>0)h.lv=A.d,h.lvAt=as();else if(A&&A.t==="clk"&&A.d)h.clk={beat:A.d[0],frame:A.d[1],perFrame:A.d[2],locked:A.d[3]===1,bar:A.d[4]||4};else if(A&&A.t==="perr"&&h.onPluginError&&A.d)for(var L=0;L<(A.n|0);L++)h.onPluginError(A.d[2*L],A.d[2*L+1])},p.connect(h.node),y&&y.connect(h.node,0,1),h.node.connect(g);var k=t.currentTime;k<=0||c===0?(b.gain.value=0,g.gain.value=1):(b.gain.setValueAtTime(1,k),b.gain.linearRampToValueAtTime(0,k+c),g.gain.setValueAtTime(0,k),g.gain.linearRampToValueAtTime(1,k+c)),h.status="ready"}},function(w){h.status="unavailable",r=[],h.error=w});h.meterOpen=function(){return h.disposed||h.status==="unavailable"?!1:(h.mUsers++===0&&h.post({t:"meter",on:!0}),!0)},h.meterClose=function(){h.mUsers!==0&&--h.mUsers===0&&(h.lv=null,h.disposed||h.post({t:"meter",on:!1}))},h.levels=function(){return h.lv&&as()-h.lvAt<lp?h.lv:null};var $={};return h.meter=function(w,k){if($[w])return $[w];var E=0,A={in:0,out:0,gr:0},L={open:function(){return h.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,h.meterClose())},read:function(){var F=E>0?h.levels():null;return A.in=0,A.out=0,A.gr=0,F&&k(F,A),A}};return $[w]=L,L},h.core={input:p,output:f,modInput:y,ready:T,get status(){return h.status},get error(){return h.error},latencySamples:o==="lookahead"?Math.max(1,Math.round(.0015*t.sampleRate)):0,limiter:o,setTempo:function(w,k){var E=Ae(w,NaN);!(E>0)||h.disposed||h.tooFar(k)||(h.bpm=Math.min(400,Math.max(20,E)),h.post({t:"tempo",bpm:h.bpm,when:h.whenOf(k)}),h.emit({effect:null,key:"tempo",value:h.bpm}))},getTempo:function(){return h.bpm},setBeat:function(w,k){var E=Ae(w,NaN);E!==E||h.disposed||h.tooFar(k)||h.post({t:"beat",beat:E,when:h.whenOf(k)})},freeRun:function(w){h.disposed||h.tooFar(w)||h.post({t:"free",when:h.whenOf(w)})},setBar:function(w,k){var E=Math.round(Ae(w,NaN));!(E>=1&&E<=16)||h.disposed||h.tooFar(k)||h.post({t:"bar",beats:E,when:h.whenOf(k)})},beatAt:function(w){var k=h.clk;if(!k)return null;var E=typeof w=="number"&&isFinite(w)?w:t.currentTime;return{beat:k.beat+(E*t.sampleRate-k.frame)*k.perFrame,bpm:k.perFrame*60*t.sampleRate,locked:k.locked,beatsPerBar:k.bar}},clear:function(w){var k=w&&typeof w=="object"?w:{at:w};if(!(h.disposed||h.tooFar(k.at))){var E=Ae(k.fadeMs,0);h.post({t:"clear",when:h.whenOf(k.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(w){return h.listeners.push(w),function(){var k=h.listeners.indexOf(w);k>=0&&h.listeners.splice(k,1)}},dispose:function(){if(!h.disposed){if(h.disposed=!0,h.status="disposed",r=[],h.listeners.length=0,h.node){h.node.port.postMessage({t:"dispose"}),h.node.port.close();try{h.node.disconnect()}catch{}}[p,b,g,f,y].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},h}var lp=250;function as(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Qr(t,e){e.in=t[0],e.out=t[1]}function cp(t,e){var n=e||{};if(n.slots)return dp(t,n);var a=aa(n.state),s=Array.from(Fn(a)),r=Jr(t,n,function(){return{program:s}},function(){return[{t:"load",program:Array.from(Fn(a)),when:0}]}),o=r.core;function l(d){return a.chain[fn.indexOf(d)]}return o.setParam=function(d,c,u,p){var f=Zt(d);if(!(!f||r.disposed||r.tooFar(p))){var b=l(f),g;if(c==="bypass")g=!!u;else{var y=Kr(f,c);if(!y)return;g=xe(y,u,it(y,b.dials))}return c==="bypass"?b.bypass=g:b.dials[c]=g,r.post({t:"p",i:ia[f][c],v:sa(f,c,g),when:r.whenOf(p)}),r.emit({effect:f,key:c,value:g}),mn(f).dials.forEach(function(h){if(!(!h.stepWhen||!h.stepWhen.some(function(S){return S.key===c}))){var m=b.dials[h.key],v=xe(h,m,it(h,b.dials));v!==m&&(b.dials[h.key]=v,r.post({t:"p",i:ia[f][h.key],v:sa(f,h.key,v),when:r.whenOf(p)}),r.emit({effect:f,key:h.key,value:v}))}}),g}},o.meter=function(){return r.meter("",Qr)},o.getParam=function(d,c){var u=Zt(d);if(u){var p=l(u);return c==="bypass"?p.bypass:p.dials[c]}},o.getState=function(){return Iu(a)},o.setState=function(d,c){r.disposed||r.tooFar(c&&c.at)||(a=aa(d),r.post({t:"load",program:Array.from(Fn(a)),when:r.whenOf(c&&c.at)}),r.emit({effect:null,key:null,value:null}))},o}function dp(t,e){var n=e.slots===!0?en:Math.max(1,Math.min(rp,Math.floor(+e.slots)||en)),a=Ut(e.state,n),s=1,r={},o={};function l($){return!jr($.type)||te($.type)!==null}function d($){var w=te($.type);return w&&w.plugin?w.plugin.engine:$.type}function c($){return r[$.id]||(r[$.id]=s++),r[$.id]}function u($){return $.filter(l).map(function(w){return{uid:c(w),type:d(w),program:Ee(w)}})}function p(){return a.chain.filter(l).map(function($){return r[$.id]})}var f=u(a.chain),b=p(),g=Jr(t,e,function(){return{slots:n,chain:f,order:b}},function(){return[{t:"sync",chain:u(a.chain),order:p(),when:0}]}),y=g.core;g.onPluginError=function($,w){for(var k in r)r[k]===$&&(o[k]=w,g.emit({effect:k,key:"error",value:w}))};function h($){var w;for(w=0;w<a.chain.length;w++)if(a.chain[w].id===$)return a.chain[w];var k=_a($);if(k){for(w=0;w<a.chain.length;w++)if(a.chain[w].type===k)return a.chain[w]}return null}function m($,w){var k=c($);g.post({t:"add",uid:k,type:d($),when:w}),Ee($).forEach(function(E){g.post({t:"ps",uid:k,k:E[0],v:E[1],when:w,snap:!0})})}function v($){g.post({t:"order",uids:p(),when:$})}function S($,w){var k={};a.chain.forEach(function(L){k[L.id]=L});var E=p().join();$.chain.forEach(function(L){var F=k[L.id];if(!l(L)){delete r[L.id];return}if(!F||F.type!==L.type||!r[L.id]){delete r[L.id],delete o[L.id],m(L,w);return}var R={};Ee(F).forEach(function(_){R[_[0]]=_[1]}),Ee(L).forEach(function(_){R[_[0]]!==_[1]&&g.post({t:"ps",uid:r[L.id],k:_[0],v:_[1],when:w})})});var A={};$.chain.forEach(function(L){A[L.id]=!0}),Object.keys(r).forEach(function(L){A[L]||delete r[L]}),Object.keys(o).forEach(function(L){A[L]||delete o[L]}),a=$,p().join()!==E&&v(w)}var T=y.dispose;return y.dispose=function(){T()},y.slots=n,y.meter=function($){return $==null||$===""?g.meter("",Qr):g.meter("#"+$,function(w,k){var E=h($),A=E?r[E.id]:0,L=w[2];if(A){for(var F=3,R=0;R<L;R++,F+=4)if(w[F]===A){k.in=w[F+1],k.out=w[F+2],k.gr=w[F+3];return}}})},y.setParam=function($,w,k,E){var A=h($);if(!(!A||g.disposed||g.tooFar(E))){var L=te(A.type),F,R=null;if(!L)return w!=="bypass"?void 0:(A.bypass=!!k,g.emit({effect:A.id,key:w,value:A.bypass}),A.bypass);if(w==="bypass")F=!!k;else{for(var _=0;_<L.dials.length;_++)L.dials[_].key===w&&(R=L.dials[_]);if(!R)return;F=xe(R,k,it(R,A.dials))}var V={},oe={};Ee(A).forEach(function(P){V[P[0]]=P[1]}),L.dials.forEach(function(P){P.stepWhen&&(oe[P.key]=A.dials[P.key])}),w==="bypass"?A.bypass=F:A.dials[w]=F,L.dials.forEach(function(P){P.stepWhen&&(A.dials[P.key]=xe(P,A.dials[P.key],it(P,A.dials)))});var zt=g.whenOf(E),qe=r[A.id];return qe&&Ee(A).forEach(function(P){(V[P[0]]!==P[1]||R&&P[0]===R.k)&&g.post({t:"ps",uid:qe,k:P[0],v:P[1],when:zt})}),g.emit({effect:A.id,key:w,value:F}),Object.keys(oe).forEach(function(P){P!==w&&A.dials[P]!==oe[P]&&g.emit({effect:A.id,key:P,value:A.dials[P]})}),F}},y.getParam=function($,w){var k=h($);if(k)return w==="bypass"?k.bypass:k.dials[w]},y.setPattern=function($,w,k){var E=h($);if(!(!E||!E.pattern||g.disposed||g.tooFar(k))){var A=w&&typeof w=="object"?w:{},L=Ba({levels:Array.isArray(A.levels)?A.levels:E.pattern.levels,shapes:Array.isArray(A.shapes)?A.shapes:E.pattern.shapes}),F={};Ee(E).forEach(function(V){F[V[0]]=V[1]}),E.pattern=L;var R=r[E.id],_=g.whenOf(k);return R&&Ee(E).forEach(function(V){F[V[0]]!==V[1]&&g.post({t:"ps",uid:R,k:V[0],v:V[1],when:_})}),g.emit({effect:E.id,key:"pattern",value:JSON.parse(JSON.stringify(L))}),JSON.parse(JSON.stringify(L))}},y.getPattern=function($){var w=h($);return w&&w.pattern?JSON.parse(JSON.stringify(w.pattern)):void 0},y.setGatePattern=function($,w,k){var E=h($),A=Vr(w);return!E||!E.pattern||!A||g.disposed||g.tooFar(k)?!1:(Object.keys(A.dials).forEach(function(L){y.setParam(E.id,L,A.dials[L],k)}),y.setPattern(E.id,A.pattern,k),!0)},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function($,w){g.disposed||g.tooFar(w&&w.at)||(S(Ut($,n),g.whenOf(w&&w.at)),g.emit({effect:null,key:null,value:null}))},y.addEffect=function($,w){var k=w||{},E=Xr($,a.chain);if(!(!E||a.chain.length>=n||g.disposed||g.tooFar(k.at))){if(k.dials){var A=Ut({v:2,chain:[{id:E.id,type:E.type,dials:k.dials}]},1).chain[0];E.dials=A.dials}k.bypass===!0&&(E.bypass=!0);var L=a.chain.slice(),F=typeof k.index=="number"?Math.max(0,Math.min(L.length,k.index)):L.length;return L.splice(F,0,E),S({v:2,chain:L},g.whenOf(k.at)),g.emit({effect:E.id,key:"chain",value:"add"}),E.id}},y.removeEffect=function($,w){var k=h($),E=w&&w.at;return!k||g.disposed||g.tooFar(E)?!1:(S({v:2,chain:a.chain.filter(function(A){return A!==k})},g.whenOf(E)),g.emit({effect:k.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function($,w,k){var E=h($),A=k&&k.at;if(!E||g.disposed||g.tooFar(A))return!1;var L=Xu(a.chain,a.chain.indexOf(E),w);return L===a.chain?!1:(S({v:2,chain:L},g.whenOf(A)),g.emit({effect:E.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function($){var w={id:$.id,type:$.type,name:Yu($),bypass:$.bypass};if($.plugin){var k=o[$.id]||0,E=!l($)||k===5;w.plugin={id:$.plugin.id,version:$.plugin.version,url:$.plugin.url,name:$.plugin.name,status:E?"missing":k?"failed":"ready"},k&&!E&&(w.plugin.error=Zi[k]||Zi[2])}return w})},y.toAstrid=function(){return np(a)},y}const up="/rhythm/assets/worklet-CwdWwkqb.js",vt=-48,is=24,pp=-1,oa=32,hp=250,fp=1200,mp=.2,Zr=1.5,gp=[-48,-24,-12,0],la="−",ss=t=>t>0?20*Math.log10(t):-1/0;function Tt(t){return t>vt?t>=0?1:(t-vt)/-vt:0}function eo(t){return t>0?t>=is?1:t/is:0}function ca(t,e=!1){if(e)return`${t>.05?la:""}${Math.abs(t).toFixed(1)} dB`;if(!(t>vt))return"—";const n=Math.round(t*10)/10;return`${n<0?la:n>0?"+":""}${Math.abs(n).toFixed(1)}`}function ne(t,e,n){const a=t.createElement("span");return a.className=e,n!==void 0&&(a.textContent=n),a}function bp(t=globalThis.document){wp(t);const e=t.createElement("div");e.className="nc-comp-gauge",e.setAttribute("aria-hidden","true");for(const[a,s]of[["in","In"],["gr","GR"],["out","Out"]]){e.append(ne(t,"nc-comp-gauge-label",s));const r=ne(t,"nc-comp-gauge-bar");r.dataset.ncGauge=a,r.append(ne(t,"nc-comp-gauge-fill"),ne(t,"nc-comp-gauge-peak")),a!=="gr"&&r.append(ne(t,"nc-comp-gauge-hot")),a==="in"&&r.append(ne(t,"nc-comp-gauge-th")),e.append(r,ne(t,"nc-comp-gauge-val",a==="gr"?ca(0,!0):ca(-1/0)))}const n=ne(t,"nc-comp-gauge-ticks");for(const a of gp){const s=ne(t,"",a===0?"0":`${la}${-a}`);s.style.left=`${Tt(a)*100}%`,n.append(s)}return e.append(ne(t,""),n,ne(t,"")),e}const yp=`
/* A compressor's level gauge (comp-gauge.js; Peter, 2026-11-27, option B): IN, GR, OUT rows, the number at the end of
   each, the dBFS ticks under them. IN and OUT in ink like every meter, the hot colour within 1 dB of full scale; GR
   (filling from the right) and the threshold tick in the instrument's colour (--nc-gauge-gr, set by the app). Rectangles,
   no radius. The loop writes transforms, so nothing transitions. Switched off: GR and OUT grey, IN keeps moving. */
.nc-comp-gauge {
  --nc-gauge-gr-color: var(--nc-gauge-gr, var(--nc-ui-accent));
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr) max-content;
  column-gap: var(--nc-ui-control-gap, var(--nc-ui-space-6));
  row-gap: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.25);
  align-items: center;
  min-width: 0;
}
.nc-comp-gauge-label {
  font-size: var(--nc-ui-label-size);
  font-weight: var(--nc-ui-label-weight);
  letter-spacing: var(--nc-ui-label-tracking);
  text-transform: uppercase;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-val {
  min-width: 6ch;
  text-align: right;
  font-family: var(--nc-ui-font-readout);
  font-size: var(--nc-ui-readout-size-small);
  font-variant-numeric: tabular-nums;
  color: var(--nc-ui-text-sub);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-gauge-gr-color); }
.nc-comp-gauge-bar { position: relative; height: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * 1.5); background: var(--nc-ui-divider); }
.nc-comp-gauge-fill {
  position: absolute;
  inset: 0;
  transform-origin: left;
  transform: scaleX(0);
  background: var(--nc-ui-text);
  transition: none;
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-fill { transform-origin: right; background: var(--nc-gauge-gr-color); }
.nc-comp-gauge-hot { position: absolute; top: 0; bottom: 0; right: 0; width: calc(var(--nc-ui-hairline) * 4); background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); display: none; }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-hot { display: block; }
.nc-comp-gauge-peak {
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(var(--nc-ui-hairline) * 2);
  margin-left: calc(var(--nc-ui-hairline) * -1);
  background: var(--nc-ui-text);
}
.nc-comp-gauge-bar[data-nc-gauge="gr"] > .nc-comp-gauge-peak { background: var(--nc-ui-text); }
.nc-comp-gauge-bar[data-hot="true"] > .nc-comp-gauge-peak { background: var(--nc-ui-fx-level-hot, var(--nc-ui-instrument-astrid, var(--nc-ui-accent))); }
.nc-comp-gauge-peak[hidden], .nc-comp-gauge-th[hidden] { display: none; }
.nc-comp-gauge-th {
  position: absolute;
  top: calc(var(--nc-ui-hairline) * -4);
  bottom: calc(var(--nc-ui-hairline) * -4);
  width: 0;
  border-left: calc(var(--nc-ui-hairline) * 1.5) solid var(--nc-gauge-gr-color);
}
.nc-comp-gauge-ticks { position: relative; height: calc(var(--nc-ui-readout-size-small) * 1.2); margin-top: calc(var(--nc-ui-control-gap, var(--nc-ui-space-6)) * -0.5); }
.nc-comp-gauge-ticks > span {
  position: absolute;
  transform: translateX(-50%);
  font-family: var(--nc-ui-font-readout);
  font-size: calc(var(--nc-ui-readout-size-small) * 0.85);
  color: var(--nc-ui-text-sub);
  white-space: nowrap;
}
/* A narrow column (NYX's Hacks): only the ends of the scale. */
.nc-comp-gauge { container-type: inline-size; }
@container (max-width: 240px) { .nc-comp-gauge-ticks > span:not(:first-child):not(:last-child) { display: none; } }
.nc-comp-gauge-ticks > span:first-child { transform: none; }
.nc-comp-gauge-ticks > span:last-child { transform: translateX(-100%); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar:not([data-nc-gauge="in"]) > .nc-comp-gauge-fill { background: var(--nc-ui-text-sub); }
.nc-comp-gauge[data-nc-off="true"] .nc-comp-gauge-bar[data-nc-gauge="gr"] + .nc-comp-gauge-val { color: var(--nc-ui-text-sub); }
.nc-ui-fx > .nc-comp-gauge { margin-bottom: var(--nc-ui-control-gap, var(--nc-ui-space-6)); }
`;function wp(t){if(!t?.head||t.head.querySelector("style[data-nc-comp-gauge]"))return;const e=t.createElement("style");e.dataset.ncCompGauge="",e.textContent=yp,t.head.append(e)}const tn=new WeakMap,rs=new WeakMap;function os(t,e,n){const a=t.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;const s=String(a.getComputedStyle(t).getPropertyValue(`--nc-ui-${e}`)??"").trim(),r=Number.parseFloat(s);return Number.isFinite(r)?s.endsWith("ms")?r/1e3:r:n}const nn=t=>t.doc.defaultView?.performance?.now()??Date.now();function vp(t){let e=rs.get(t);if(e)return e;const n=t.defaultView;e={doc:t,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1};const a=n?.IntersectionObserver;return a&&(e.io=new a(s=>{for(const r of s){const o=tn.get(r.target);o&&(o.seen=r.isIntersecting,an(o))}sn(e)})),t.addEventListener("visibilitychange",()=>{for(const s of e.recs)an(s);sn(e)}),rs.set(t,e),e}function an(t){const e=t.loop.io?t.seen&&t.el.isConnected:t.el.isConnected,n=!t.dead&&!!t.source&&e&&t.loop.doc.visibilityState!=="hidden";if(n&&!t.open){const a=typeof t.source.open=="function"?t.source.open():!0;t.open=a!==!1,t.open&&(t.loop.loud=nn(t.loop))}else!n&&t.open&&(t.open=!1,t.source?.close?.(),ua(t))}function sn(t){let e=!1;for(const n of t.recs)n.open&&(e=!0);if(!e)return to(t);t.idle&&t.timer&&(t.doc.defaultView?.clearTimeout(t.timer),t.timer=0,t.idle=!1,t.loud=nn(t)),!t.raf&&!t.timer&&da(t,!1)}function da(t,e){const n=t.doc.defaultView;n&&(e?t.timer=n.setTimeout(()=>(t.timer=0,zn(t,nn(t))),hp):typeof n.requestAnimationFrame=="function"?t.raf=n.requestAnimationFrame(a=>(t.raf=0,zn(t,a))):t.timer=n.setTimeout(()=>(t.timer=0,zn(t,nn(t))),oa))}function to(t){const e=t.doc.defaultView;t.raf&&e?.cancelAnimationFrame?.(t.raf),t.timer&&e?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.idle=!1,t.last=0}function zn(t,e){if(t.last&&!t.idle&&e-t.last<oa-4)return da(t,!1);const n=t.last?Math.min(.25,(e-t.last)/1e3):oa/1e3;t.last=e;let a=!1,s=!1;for(const r of t.recs){if(!r.el.isConnected){r.placed&&no(r);continue}r.placed=!0,r.open&&(a=!0,kp(r,n,e)&&(t.loud=e),r.disp.some(o=>o>0)&&(s=!0))}if(!a)return to(t);t.idle=e-t.loud>fp&&!s,da(t,t.idle)}function kp(t,e,n){t.fall<0&&(t.fall=os(t.el,"motion-meter-fall",mp),t.hold=os(t.el,"motion-meter-hold",Zr));let a=null;try{a=t.source.read()}catch{a=null}const s=t.on();!s&&t.wasOn&&(t.disp[1]=t.disp[2]=0,t.peakDb[1]=0,t.peakDb[2]=-1/0),t.wasOn=s;const r=ss(Number(a?.in)||0),o=s?ss(Number(a?.out)||0):-1/0,l=s?Math.max(0,Number(a?.gr)||0):0,d=[Tt(r),eo(l),Tt(o)],c=[r,l,o],u=t.fall>0?Math.exp(-e/t.fall):0;for(let p=0;p<3;p++){const f=d[p];t.disp[p]=f>=t.disp[p]?f:f+(t.disp[p]-f)*u,t.disp[p]<.001&&(t.disp[p]=0);const b=c[p]>=t.peakDb[p];(b||n-t.peakAt[p]>t.hold*1e3)&&(b?(t.peakDb[p]=c[p],t.peakAt[p]=n):t.peakDb[p]=Math.max(p===1?l:c[p],t.peakDb[p]-e*20))}return Ha(t,s),r>vt||l>0}function Ha(t,e){const n=t.el.querySelectorAll(":scope > .nc-comp-gauge-bar"),a=t.el.querySelectorAll(":scope > .nc-comp-gauge-val"),s=e?"false":"true";t.el.dataset.ncOff!==s&&(t.el.dataset.ncOff=s);for(let d=0;d<3;d++){const c=n[d];if(!c)continue;const u=d===1,p=Math.round(t.disp[d]*1e3)/1e3,f=u?eo(t.peakDb[d]):Tt(t.peakDb[d]),b=!u&&t.peakDb[d]>=pp?"true":"false",g=`${p}|${Math.round(f*1e3)}|${b}`;if(t.shown[d]!==g){t.shown[d]=g;const h=c.children[0],m=c.children[1];h.style.transform=`scaleX(${p})`,m.style.left=u?`${(1-f)*100}%`:`${f*100}%`,m.hidden=f<=0,c.dataset.hot=b}const y=ca(t.peakDb[d],u);a[d]&&a[d].textContent!==y&&(a[d].textContent=y)}const r=t.el.querySelector(".nc-comp-gauge-th"),o=t.threshold(),l=typeof o=="number"&&Number.isFinite(o)?`${Tt(o)*100}%`:"";r&&r.style.left!==l&&(r.style.left=l,r.hidden=!l)}function ua(t){t.disp=[0,0,0],t.peakDb=[-1/0,0,-1/0],t.peakAt=[0,0,0],t.shown=["","",""],Ha(t,t.on())}function no(t){t.open&&(t.open=!1,t.source?.close?.()),t.dead=!0,t.loop.recs.delete(t),t.loop.io?.unobserve(t.el),tn.get(t.el)===t&&tn.delete(t.el)}function xp(t,e){const n=t.ownerDocument??globalThis.document,a=vp(n),s={el:t,loop:a,open:!1,dead:!1,seen:!1,placed:!1,source:e?.source??null,threshold:e?.threshold??(()=>null),on:e?.on??(()=>!0),wasOn:!0,disp:[0,0,0],peakDb:[-1/0,0,-1/0],peakAt:[0,0,0],shown:["","",""],fall:-1,hold:Zr};if(tn.set(t,s),a.recs.add(s),a.io?.observe(t),ua(s),!a.io){const r=n.defaultView,o=()=>{an(s),sn(a)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(o):setTimeout(o,0)}return{set(r){if(s.dead)return;s.threshold=r?.threshold??s.threshold,s.on=r?.on??s.on;const o=r?.source??null;o!==s.source&&(s.open&&(s.open=!1,s.source?.close?.()),s.source=o,ua(s)),Ha(s,s.on()),an(s),sn(a)},destroy(){no(s)}}}const ls=new WeakMap;function $p(t,e){if(!t)return null;let n=ls.get(t);if(!n||!n.el.isConnected||n.el.parentElement!==t){n?.binding.destroy();const a=bp(t.ownerDocument);e?.help&&(a.dataset.ncHelp=e.help);const s=e?.after??t.querySelector(":scope > .nc-ui-fx-hd");s&&s.parentElement===t?s.after(a):t.prepend(a),n={el:a,binding:xp(a,e)},ls.set(t,n)}else n.binding.set(e);return e?.color&&n.el.style.setProperty("--nc-gauge-gr",e.color),n.el}const Ze="petra-rhythm.state",ao=3,io=new Set([1,2,ao]),so=400,Sp=2e3;function Ep(t){return JSON.stringify({v:ao,doc:{...t.doc,engine:Kn(t.doc.tracks)},bank:{...t.bank,slots:t.bank.slots.map(e=>e?{...e,engine:Kn(e.tracks)}:null)},selectedTrack:t.selectedTrack})}function Ap(t,e,n){return!e||typeof e!="object"?null:Vo(t,n?{...e,engine:void 0,deep:void 0}:e)}function ro(t){if(!t)return null;let e;try{e=JSON.parse(t)}catch{return null}if(!e||!io.has(e.v))return null;const n=e.v===1,a=Un(n&&e.doc&&typeof e.doc=="object"?{...e.doc,version:1}:e.doc);if(!a.ok||!a.document)return null;const s=a.document,r=e.bank;if(!r||!Array.isArray(r.slots)||r.slots.length!==La)return null;const o=[];for(const p of r.slots){if(p===null){o.push(null);continue}const f=Ap(s,p,n);if(!f)return null;o.push(f)}const l=Number.isInteger(r.active)&&o[r.active]?r.active:null,d=e.selectedTrack,c=e.doc.tracks??[],u=Number.isInteger(d)&&d>=0&&d<c.length?Wo(c,s.tracks,d):0;return{doc:s,bank:{slots:o,active:l},selectedTrack:u}}function Tp(t,e,n=so,a=Ze){let s,r=0,o="";const l=()=>{clearTimeout(s),s=void 0,r=0;try{const d=Ep(e());if(d===o)return;t.setItem(a,d),o=d}catch{}};return{schedule(){const d=Date.now();r||(r=d),clearTimeout(s),s=setTimeout(l,Math.min(n,Math.max(0,r+Sp-d)))},flush:l}}function Mp(t,e,n=Ze){if(new URLSearchParams(e).has("fresh"))return null;let a;try{a=t.getItem(n)}catch{return null}if(!a||ro(a)!==null)return null;let s=null;try{s=JSON.parse(a)}catch{}return s!==null&&typeof s=="object"&&(!io.has(s.v)||Un(s.doc).errors[0]===xn||Array.isArray(s.bank?.slots)&&s.bank.slots.some(o=>o!==null&&typeof o=="object"&&Un({...s?.doc,...o}).errors[0]===xn))?`Couldn't open your last session: ${xn}`:"Couldn't open your last session: it is malformed"}function Lp(t,e,n=Ze){if(new URLSearchParams(e).has("fresh"))return null;try{return ro(t.getItem(n))}catch{return null}}const Pn={maker:"PETRA",instrument:"RHYTHM",number:"01"},Cp="PETRA Rhythm";let cs=!1;function Np(){return`
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
`}function Fp(t){const e=t.ownerDocument;if(!cs){const c=e.createElement("style");c.dataset.petraHead="",c.textContent=Np(),e.head.append(c),cs=!0}const n=e.createElement("header");n.className="nc-page-hd petra-head";const a=e.createElement("h1");a.className="petra-head-name";const s=()=>{const c=e.createElement("span");return c.className="petra-head-sep",c.textContent="/",c},r=e.createElement("span");r.className="petra-head-num",r.textContent=Pn.number;const o=e.createElement("span");o.className="petra-head-maker",o.style.color=i("instrument-petra"),o.textContent=Pn.maker,a.append(o," ",s(),` ${Pn.instrument} `,s()," ",r);const l=e.createElement("p");l.className="petra-head-line",l.textContent="A TRIKI instrument.";const d=e.createElement("div");return d.className="petra-head-title",d.append(a,l),n.append(d),t.before(n),n}function zp(t,e){const n=t.ownerDocument,a=n.createElement("details");a.className="petra-menu";const s=n.createElement("summary");s.setAttribute("aria-label","Menu"),s.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6.5h3v3H2zM6.5 6.5h3v3h-3zM11 6.5h3v3h-3z"/></svg>';const r=n.createElement("div");r.className="petra-menu-body";const o=n.createElement("input");o.type="file",o.accept=".rhythm,.json,application/json",o.hidden=!0,o.addEventListener("change",async()=>{const u=o.files?.[0];o.value="",u&&e.load(await u.text(),u.name)});const l=(u,p)=>{const f=n.createElement("button");return f.type="button",f.textContent=u,f.dataset.petraMenu=u.toLowerCase(),f.addEventListener("click",()=>{p(),d||(a.open=!1)}),f};r.append(l("Save",e.save),l("Load",()=>o.click()),l("New",e.create),...e.panic?[l("Panic",e.panic)]:[],o),a.append(s,r),t.append(a);let d=null;const c=()=>{const u=getComputedStyle(s).display==="none";u!==d&&(a.open=u),d=u};return window.addEventListener("resize",c),c(),a}const ds=t=>`${Math.round(t*100)}%`;function us(t,e){if(t==="tune"){const n=Math.round(e*10)/10;return n===0?"0 st":`${n>0?"+":"−"}${Math.abs(n)} st`}if(t==="noise"){const n=Math.round(e*100)/100;return n===0?"0 oct":`${n>0?"brighter":"darker"} ${Math.abs(n).toFixed(2)} oct`}if(t==="level"){if(e<=.001)return"off";const n=20*Math.log10(e),a=Math.round(n*10)/10;return a===0?"0 dB":`${a>0?"+":"−"}${Math.abs(a).toFixed(1)} dB`}return t==="drive"&&e<=0?"clean":ds(e)}const Pp={tune:"Tune",decay:"Decay",body:"Body",snap:"Snap",noise:"Noise",sizzle:"Sizzle",drive:"Drive",level:"Level"};function Bt(t,e){return Math.abs(t-e)<.5?"off":t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}const Kt=8,kt=72,qa=240,ja=.03,Dp=4,oo=qa/Math.log1p(Dp/ja),pa=t=>t>0?Math.log1p(t/ja)*oo:0,Ip=t=>ja*Math.expm1(t/oo),Ce=(t,e,n)=>t<0?0:t<e?t/e:Math.exp(-(t-e)/n);function Op(t,e,n=96){const a=e.decay,s=t.len*(a>1?a:1),r=[];let o=0;for(let l=0;l<=n;l++){const d=Ip(l/n*qa);let c=0;const u=t.body;if(u){const b=u.a??5e-4,g=d<b?d/b:(1-(u.mix??0))*Math.exp(-(d-b)/(u.d1*a))+(u.mix??0)*Math.exp(-(d-b)/((u.d2??u.d1)*a));c+=g*u.lvl*e.body,u.second&&(c+=Ce(d,5e-4,u.second.d*a)*u.second.lvl*e.body)}t.click&&(c+=Ce(d,2e-4,t.click.d)*t.click.lvl*e.snap*.5),t.noise&&(c+=Ce(d,t.noise.a??5e-4,t.noise.d*a)*t.noise.lvl*.5),t.noise2&&(c+=Ce(d,t.noise2.a??5e-4,t.noise2.d*a)*t.noise2.lvl*e.sizzle*.5),t.metal&&(c+=Ce(d,3e-4,t.metal.d*a)*t.metal.lvl*e.sizzle*.33);const p=t.clap;if(p){let b=0;for(let g=0;g<p.bursts;g++)b+=Ce(d-g*p.gap,3e-4,p.bd)*(g===p.bursts-1?1:.8)*e.snap;b+=Ce(d-p.bursts*p.gap,.002,p.tail*a)*.6,c+=b*p.lvl*.5}const f=s-d;f<=0?c=0:f<.08&&(c*=f/.08),r.push([d,c]),c>o&&(o=c)}if(o>0)for(const l of r)l[1]/=o;return r}const Rp="http://www.w3.org/2000/svg";function Ue(t,e={}){const n=document.createElementNS(Rp,t);for(const[a,s]of Object.entries(e))n.setAttribute(a,s);return n}const _p=t=>Math.round((kt-Math.max(0,Math.min(1,t))*(kt-Kt))*100)/100;function Bp(t){return t.map(([e,n],a)=>`${a?"L":"M"}${Math.round(pa(e)*100)/100},${_p(n)}`).join(" ")}const Hp=[[.01,"10 ms"],[.1,"100 ms"],[1,"1 s"]],qp=t=>t<1?`${Math.round(t*1e3)} ms`:`${Number(t.toFixed(1))} s`;function jp(t){const e=document.createElement("div");e.className="petra-deep-env",e.dataset.petraDeep="envelope";const n=Ue("svg",{viewBox:"-1 0 242 88",preserveAspectRatio:"none",role:"button",tabindex:"0","data-testid":"deep-envelope"}),a="non-scaling-stroke",s=c=>Ue("line",{class:"petra-deep-grid",x1:"0",x2:String(qa),y1:String(c),y2:String(c),"vector-effect":a}),r=Hp.map(([c,u])=>{const p=String(Math.round(pa(c)*100)/100),f=Ue("line",{class:"petra-deep-guide",x1:p,x2:p,y1:String(Kt),y2:String(kt),"vector-effect":a}),b=Ue("text",{class:"petra-deep-label",x:p,y:"86","text-anchor":"middle"});return b.textContent=u,[f,b]}),o=Ue("line",{class:"petra-deep-end",y1:String(Kt),y2:String(kt),"vector-effect":a}),l=Ue("path",{class:"petra-deep-curve",fill:"none","stroke-linejoin":"round","vector-effect":a});n.append(s(Kt),s(kt),...r.flat(),o,l),e.append(n),n.addEventListener("click",t),n.addEventListener("keydown",c=>{c.key!=="Enter"&&c.key!==" "||(c.preventDefault(),t())});let d="";return{el:e,set(c,u,p){const f=Op(c,u),b=Bp(f),g=c.len*(u.decay>1?u.decay:1);let y=g;for(const[v,S]of f)v>.001&&S>.0316&&(y=v);y=Math.min(y,g);const h=`${b}|${p}`;if(h===d)return;d=h,l.setAttribute("d",b);const m=String(Math.round(pa(y)*100)/100);o.setAttribute("x1",m),o.setAttribute("x2",m),n.setAttribute("aria-label",`${p}'s loudness over time: heard for about ${qp(y)}. Click to hear it.`)}}}const I=(t,e,n)=>{const a=document.createElement(t);return a.className=e,n!==void 0&&(a.textContent=n),a};function ps(t,e,n,a,s){const r=I("form","petra-kit-form");r.noValidate=!0;const o=I("input","petra-kit-input");o.type="text",o.value=t,o.maxLength=Yo,o.setAttribute("aria-label",e),o.autocomplete="off",o.spellcheck=!1;const l=I("button","petra-kit-act","Save");l.type="submit",l.dataset.petraHelp="kit-save-ok";const d=I("button","petra-kit-act","Cancel");d.type="button",d.dataset.petraHelp="kit-save-cancel";const c=()=>{const u=o.value.trim();l.disabled=u.length===0,l.textContent=u&&s(u)?e==="Kit name"?"Replace":"Taken":"Save",e!=="Kit name"&&u&&s(u)&&(l.disabled=!0)};return o.addEventListener("input",c),o.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Escape"&&(u.preventDefault(),a())}),r.addEventListener("submit",u=>{u.preventDefault();const p=o.value.trim();p&&n(p)}),d.addEventListener("click",a),r.append(o,l,d),c(),queueMicrotask(()=>{o.focus(),o.select()}),r}function Gp(t){const e=I("div","nc-field petra-kit-field");e.dataset.petraDeep="kit";const n=I("span","nc-label","Kit");n.dataset.petraHelp="kit";const a=I("div","petra-kit"),s=I("div","petra-kit-row"),r=I("button","petra-kit-name");r.type="button",r.dataset.testid="deep-kit-name",r.setAttribute("aria-haspopup","menu"),r.setAttribute("aria-expanded","false");const o=I("span","petra-kit-label"),l=I("span","petra-kit-caret","▾");l.setAttribute("aria-hidden","true"),r.append(o,l);const d=I("output","petra-kit-line");d.setAttribute("aria-live","polite");const c=I("div","petra-kit-menu");c.setAttribute("role","menu"),c.setAttribute("aria-label","Kits"),c.hidden=!0;const u=(v,S,T,$)=>{const w=I("button","petra-kit-step",S);return w.type="button",w.dataset.petraHelp=$,w.setAttribute("aria-label",T),w.addEventListener("click",()=>{h(),t.step(v)}),w};s.append(u(-1,"‹","Previous kit","kit-prev"),r,u(1,"›","Next kit","kit-next")),a.append(s,d,c),e.append(n,a);let p=null,f=null;const b=(v,S,T)=>{const $=I("div","petra-kit-item");T&&($.dataset.saved="");const w=I("button","petra-kit-choice");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",String(v.mark==="current")),w.dataset.kit=v.id;const k=I("span","petra-kit-dot");k.setAttribute("aria-hidden","true"),v.mark&&(k.dataset.mark=v.mark);const E=I("span","petra-kit-item-name",v.name),A=I("span","petra-kit-item-line",v.line),L=I("span","petra-kit-item-count",v.count??"");if(w.append(k,E,A,L),w.addEventListener("click",()=>{h(),S()}),$.append(w),!T)return $;if(f===v.id){const V=ps(v.name,`Rename ${v.name}`,oe=>(f=null,t.rename(v.id,oe)?!0:(f=v.id,!1)),()=>{f=null,g(),w.focus()},oe=>t.taken(oe,v.id));return $.append(V),$}const F=I("span","petra-kit-tools"),R=I("button","petra-kit-act","Rename");R.type="button",R.dataset.petraHelp="kit-rename",R.setAttribute("aria-label",`Rename ${v.name}`),R.addEventListener("click",()=>{f=v.id,g()});const _=I("button","petra-kit-act","Delete");return _.type="button",_.dataset.petraHelp="kit-delete",_.setAttribute("aria-label",`Delete ${v.name}`),_.addEventListener("click",()=>{h(),t.remove(v.id)}),F.append(R,_),$.append(F),$};function g(){if(!p)return;const v=p;c.replaceChildren();for(const T of v.kits)c.append(b(T,()=>t.pick(T.id),!1));if(v.saved.length){const T=I("div","petra-kit-head","Your kits");T.setAttribute("role","presentation"),c.append(T);for(const $ of v.saved)c.append(b($,()=>t.pickSaved($.id),!0))}const S=I("div","petra-kit-foot");if(f==="")S.append(ps(v.suggest,"Kit name",T=>(f=null,t.save(T)?(h(),!0):(f="",!1)),()=>{f=null,g()},T=>t.taken(T)));else if(S.append(I("span","petra-kit-foot-text",v.mixed?"Mixed: drums use different kits. A choice sets every drum.":"Sets every drum to this kit")),v.mixed){const T=I("button","petra-kit-act petra-kit-save","Save as kit…");T.type="button",T.dataset.petraHelp="kit-save",T.addEventListener("click",()=>{f="",g()}),S.append(T)}c.append(S)}function y(){f=null,g(),c.hidden=!1,r.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",m,!0),(c.querySelector('[aria-checked="true"]')??c.querySelector(".petra-kit-choice"))?.closest("button")?.focus()}function h(){c.hidden||(c.hidden=!0,f=null,r.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",m,!0))}function m(v){a.contains(v.target)||h()}return r.addEventListener("click",()=>c.hidden?y():h()),a.addEventListener("keydown",v=>{if(c.hidden)return;if(v.key==="Escape"){v.preventDefault(),h(),r.focus();return}if(v.key!=="ArrowDown"&&v.key!=="ArrowUp")return;const S=Array.from(c.querySelectorAll(".petra-kit-choice")),T=S.indexOf(document.activeElement),$=S[(T+(v.key==="ArrowDown"?1:-1)+S.length)%S.length];$&&(v.preventDefault(),$.focus())}),{el:e,set(v){const S=p;p=v,o.textContent=v.label,r.dataset.mixed=String(v.mixed),r.setAttribute("aria-label",`Kit: ${v.label}. Open the kits`),d.textContent=v.line,!c.hidden&&f===null&&JSON.stringify(S)!==JSON.stringify(v)&&g()},close:h}}function Up(t,e,n){const a=I("div","nc-field petra-source");a.dataset.petraDeep="source";const s=I("span","nc-label","Source");s.dataset.petraHelp="drum-source";const r=I("div","nc-choice-row petra-source-tabs");r.setAttribute("role","tablist"),r.setAttribute("aria-label","Source"),r.dataset.petraHelp="source";const o=e.map(p=>{const f=I("button","nc-choice",n(p));return f.type="button",f.setAttribute("role","tab"),f.dataset.source=p,f.addEventListener("click",()=>t(p)),f});r.append(...o),r.addEventListener("keydown",p=>{if(p.key!=="ArrowRight"&&p.key!=="ArrowLeft")return;const f=o.indexOf(document.activeElement);if(f<0)return;p.preventDefault();const b=o[(f+(p.key==="ArrowRight"?1:-1)+o.length)%o.length];b?.focus(),b?.click()});const l=I("div","petra-source-note"),d=I("span","petra-source-text"),c=I("button","petra-kit-act petra-use-kit","Use kit");c.type="button",c.dataset.petraHelp="use-kit",l.append(d,c),a.append(s,r,l);let u="classic";return c.addEventListener("click",()=>t(u)),{el:a,set(p){u=p.base;for(const b of o){const g=b.dataset.source===p.source;b.setAttribute("aria-selected",String(g)),b.tabIndex=g?0:-1}const f=p.source!==p.base;d.textContent=f?`Kit is ${p.baseName} · ${p.drum} plays ${n(p.source)}`:`Follows the kit · ${p.baseName}`,c.hidden=!f}}}const lo=680;let hs=null,co=[];function Kp(t){hs===t||typeof ResizeObserver>"u"||(hs=t,new ResizeObserver(()=>{t.getBoundingClientRect().width>=lo!==t.hasAttribute("data-petra-wide")&&uo(t,co)}).observe(t))}function uo(t,e){co=e;let n=!1;t instanceof Element&&(Kp(t),n=t.getBoundingClientRect().width>=lo,t.toggleAttribute("data-petra-wide",n));const a=Array.from(t.querySelectorAll(".nc-row[data-nc-row]"));for(const s of a){const r=s.querySelector(":scope > .nc-name"),o=s.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??s.querySelector("[data-nc-len]")?.getAttribute("data-nc-len"),l=e.find(c=>c.id===o);let d=s.querySelector(":scope > .petra-src");if(!r||!l||!(n||l.differs)){d?.remove();continue}d||(d=I("span","petra-src"),d.setAttribute("aria-hidden","true")),r.nextElementSibling!==d&&r.after(d),d.textContent=l.tag,d.toggleAttribute("data-differs",l.differs),d.style.left=`${r.offsetLeft}px`}}function xt(t,e,n){const a=t.querySelector(`[data-nc-id="${e}"]`);return a?(a.nextElementSibling!==n&&a.after(n),!0):(n.remove(),!1)}let fs=!1;function Wp(){return`
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
`}function Vp(t=document){if(fs)return;const e=t.createElement("style");e.dataset.petraDeep="",e.textContent=Wp(),t.head.append(e),fs=!0}function Yp(t){return{params:t.tracks.map(e=>({voice:e.voice,params:{...e.params},deep:{...e.deep},source:e.source,deepVersion:e.deepVersion})),engine:Kn(t.tracks),deep:{kit:t.deep.kit,character:{...t.deep.character},version:t.deep.version}}}function Xp(t){return t==="hp"?"filter-highpass":t==="bp"?"filter-bandpass":"filter-lowpass"}const $t=20,ha=2e4,Dn=24,ms=-60;function Jp(t,e,n,a,s=48e3){const r=2*Math.PI*Math.min(e,s*.49)/s,o=Math.cos(r),l=Math.sin(r)/(2*n);let d,c,u;t==="hp"?[d,c,u]=[(1+o)/2,-(1+o),(1+o)/2]:t==="bp"?[d,c,u]=[l,0,-l]:[d,c,u]=[(1-o)/2,1-o,(1-o)/2];const p=1+l,f=-2*o,b=1-l,g=2*Math.PI*a/s,y=(S,T,$)=>S+T*Math.cos(g)+$*Math.cos(2*g),h=(S,T)=>-(S*Math.sin(g)+T*Math.sin(2*g)),m=Math.hypot(y(d,c,u),h(c,u)),v=Math.hypot(y(p,f,b),h(f,b));return v>0?m/v:0}function Qp(t,e){return Math.log(Math.max($t,Math.min(ha,t))/$t)/Math.log(ha/$t)*e}function gs(t,e,n){const a=Math.max(ms,Math.min(Dn,t));return e+(Dn-a)/(Dn-ms)*(n-e)}function Zp(t){const e=Math.max(1,t.clientWidth||0),n=Math.max(1,t.clientHeight||0),a=t.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(e*a)),r=Math.max(1,Math.floor(n*a));(t.width!==s||t.height!==r)&&(t.width=s,t.height=r);const o=t.getContext("2d");return o?.setTransform(a,0,0,a,0,0),{ctx:o,w:e,h:n}}function eh(t,e){const{ctx:n,w:a,h:s}=Zp(t);if(!n)return;n.clearRect(0,0,a,s);const r=Os(t),o=e.mode??"lp",l=U(t,Xp(o)),d=U(t,"divider"),c=U(t,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,s-u-3),b=e.q??Math.SQRT1_2,g=Math.round(gs(0,p,f))+.5;n.strokeStyle=d,n.lineWidth=1,n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke(),n.beginPath();for(let y=0;y<=a;y++){const h=$t*(ha/$t)**(y/Math.max(1,a)),m=e.open?1:Jp(o,e.hz,b,h,e.sampleRate),v=gs(20*Math.log10(Math.max(1e-5,m)),p,f);y===0?n.moveTo(y,v):n.lineTo(y,v)}if(n.strokeStyle=l,n.stroke(),!e.open){const y=Math.round(Qp(e.hz,a))+.5;n.strokeStyle=c,n.setLineDash?.([2,3]),n.beginPath(),n.moveTo(y,p),n.lineTo(y,f),n.stroke(),n.setLineDash?.([])}n.fillStyle=c,n.font=r,n.textAlign="left",n.fillText("20 Hz",0,s-1),n.textAlign="right",n.fillText("20 kHz",a,s-1),n.textAlign="left",t.dataset.ncAccent=l,t.dataset.ncFilterHz=String(Math.round(e.hz))}function th(t,e){const n=t.redraw.bind(t);return t.redraw=()=>{n();const a=e();if(!a)return;const s=t.el.querySelectorAll('canvas.nc-canvas[data-nc-paint="filter"]');for(let r=0;r<s.length;r++){const o=s[r];o instanceof HTMLCanvasElement&&eh(o,a)}},t.redraw(),t}const Wt={brand:"PETRA Rhythm, a drum machine and one of the TRIKI instruments. Open with the others, it plays on their clock.",menu:"Save, Load, New and Panic.","menu:save":"Downloads the pattern and all 10 slots as a .rhythm file you can load again later.","menu:load":"Opens a .rhythm file, replacing the pattern and all 10 slots. Undo in the message that follows brings back what was there.","menu:new":"Starts over with the default kit, every lane empty and every slot cleared. Undo in the message that follows brings it back.","menu:panic":"Silences every sound that is still ringing, at once. The beat keeps playing.","module:transport":"Starts and stops the beat, sets its speed and swing, and holds the 10 pattern slots.","module:pattern":"The drum pattern: one lane per drum, one square per 16th note. Click squares to add hits; click a drum's name to shape its sound.","module:filter":"Effects on the whole kit, in this order: Filter, Drive, Compressor. They are saved with the pattern and its slots.",hide:"Folds this module down to a slim bar to save room. Press again to open it.",index:"This module's number on the page.",slim:"This module is folded away. Click to open it again.",play:"Starts and stops the beat; Space does the same. When it reads Tap to join, the beat is already playing: tap and you come in on the next bar.",surprise:"Fills all 10 slots with new grooves and plays the first. Undo (or Cmd/Ctrl+Z) puts everything back.",bpm:"The speed of the beat in beats per minute (BPM), from 40 to 240. Higher is faster.",tap:"Tap this in time with the music, two taps or more, and Tempo follows your taps.",swing:"Pushes every second 16th note later for a shuffled, laid-back feel. 50% is straight; higher swings harder, up to 75%.","petra-presets":"Your grooves: the ten slots (your Favs, keys 1 to 0) and the library of factory grooves and your own. Folded, the line says how many slots hold a pattern and which is playing.","preset-now":"The groove playing now: its name, and where it's from. Edited means you changed it since you loaded it; Save as… keeps it.","preset-prev":"The previous groove in the list below. The tempo stays; Undo in the message puts your groove back.","preset-next":"The next groove in the list below. The tempo stays; Undo in the message puts your groove back.","presets-max":"Opens Presets over the instrument, three columns wide, so the whole list fits. Esc or this again puts it back.","pl-source":"Shows the grooves from one place: All, Factory (made for PETRA), Mine (Save as…) or Shared. The number is how many.","pl-row":"Plays this groove now: its pattern and sound. The tempo stays; Undo in the message puts your groove back.","pl-pad":"☆ puts this groove on the next free slot (key 1 to 0); a number says which slot it's on. Click again to take it off or move it.","pl-more":"More for this groove: put it on a slot, rename it, its category and tags, duplicate, delete.","pl-menu":"Does this to the groove.","pl-to-pad":"The slot (key 1 to 0) to put the groove on.","preset-save-as":"Saves the groove playing now into your library, under Mine, with a name, category and tags.","preset-save":"Saves it into your library.","pl-cancel":"Closes this without saving.","preset-import":"Adds grooves from a library file (one exported from PETRA, here or on another computer).","preset-export":"Downloads your own and shared grooves as one file, to keep or to import on another computer.","preset-lib":"The library: factory grooves and yours, by category. Click one to play it (the tempo stays); ☆ puts it on a slot; ⋯ to rename, tag or delete.","transport-more":"On a phone, Swing (and the Sync line, with another tab open) folds away; the line shows them. Tap to show or hide it.","moves-more":"On a phone, the pattern moves (Shift, Groove, Hits) fold away; the line names the lane they act on. Tap to show or hide them.","params-more":"On a phone, the drum's three shaping sliders fold away under one line with their values. Tap to show or hide them.","hacks-more":"On a phone, Drive, Compressor and the meter fold away under the Filter; the line says which are on. Tap to show them.","swing-note":"Whose swing this tab plays. Join the beat (Tap to join or Play) to follow the leading tab's swing; Save then stores it in a slot.",role:"With other TRIKI tabs open, one leads the shared tempo and clock and the others follow it. This tab's part is shown here.",slots:"Ten pattern slots. Click a saved one to play it (while playing, it switches on the next bar); Shift-click or long-press saves, Option-click clears.","slots@touch":"Ten pattern slots. Tap a saved one to play it (while playing, it switches on the next bar); long-press to save or clear.","slot-save":"Saves the pattern as it is now into this slot.","slot-clear":"Empties this slot. Undo in the message that follows puts it back.",morph:"How long a slot change glides from the old sound to the new one. 0 s switches at once.","tool-note":"In Note mode, clicking a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-note@touch":"In Note mode, tapping a square adds or removes a hit. Long-press a square to set its velocity and chance.","tool-accent@touch":"In Accent mode, tapping a square adds or removes an accent, a louder hit. An empty square gets the hit too.","tool-accent":"In Accent mode, clicking a square adds or removes an accent, a louder hit (an empty square gets the hit too). Shift-click does this in Note mode.",fill:"Hold it for a fill over the last beat: a snare roll, tom answers, the closed hat drops out. Let go and the pattern is as it was.",clear:"Turns every square off on every lane; the sounds and lengths stay. Undo takes it back.",mute:"Mute: silences this lane. Press again to hear it.",solo:"Solo: plays only the soloed lanes. Solo more than one to hear them together.",lane:"Click to shape its sound below; Shift- or Cmd-click adds it to the lanes Moves act on.","lane@touch":"Tap to shape its sound below; long-press adds it to the lanes Moves act on.","drum@kick":"Kick drum, the low thump.","drum@snare":"Snare drum, the crack on the backbeat.","drum@clap":"Hand clap, a quick burst of noise.","drum@rim":"Rimshot, a short knock.","drum@hat":"Closed hi-hat, a short tick that cuts the open hat short.","drum@hatOpen":"Open hi-hat, a longer sizzle that a closed-hat hit cuts short.","drum@ride":"Ride cymbal, a stick's tick on a long wash that nothing cuts short.","drum@crash":"Crash cymbal, a bright splash with a long tail that nothing cuts short.","drum@tom":"Tom, a pitched drum.","drum@metal":"Metal, a clanging, bell-like hit.","drum@shaker":"Shaker, beads in a shell.",length:"Drag to set how many steps this lane plays before it starts over. A shorter lane drifts against the others for shifting patterns.",dice:"New steps for this lane only; its sound and length stay. Undo takes it back.","pads-prev":"Shows the previous lane on the pads.","pads-next":"Shows the next lane on the pads.","pads-lane":"The lane on the pads. Tap it, then tap a pad to set where the lane ends; tap it again when done.","moves:shift":"Moves the selected lanes' hits together, wrapping round the end. Shift-click lane names to move several at once.","moves:shift@touch":"Moves the selected lanes' hits together, wrapping round the end. Long-press lane names to move several at once.","moves:groove":"Moves the accents and velocities from hit to hit; the hits stay where they are.","moves:hits":"Trades hits between the selected lanes, or nudges a few so the part evolves.","move:shift-left":"Every hit one step earlier; the first wraps round to the end.","move:shift-right":"Every hit one step later; the last wraps round to the start.","move:shift-random":"Shifts by a random number of steps, every selected lane by the same amount.","move:reverse":"Plays the selected lanes backwards.","move:groove-left":"Each hit takes the next hit's accent and velocity.","move:groove-right":"Each hit takes the previous hit's accent and velocity.","move:shuffle":"Trades hits between the selected lanes, step by step. Select two lanes or more first.","move:mutate":"Moves or adds one or two hits on each selected lane, so the part evolves.","edit-step":"The step you are editing. Long-press another square to edit that one.","edit-velocity":"How hard this step hits. Lower is softer.","edit-chance":"How often this step plays: 100% every time, 50% about every other time. Steps under 100% show dimmed.","edit-done":"Closes the step editor.","section:parameters":"The sound of the selected lane. Click a drum's name in the grid to pick another.","panel-subject":"The lane these sliders shape. Click another drum's name in the grid to switch.",tune:"The drum's pitch in hertz (Hz, vibrations per second). Lower is deeper; higher is tighter.","tune@kick":"The pitch the kick settles on, in hertz (Hz, vibrations per second). Lower is deeper and boomier; higher is punchier.","tune@tom":"The pitch the tom settles on, in hertz (Hz, vibrations per second). Lower is a deep floor tom; higher is a small tom.","tune@snare":"The pitch of the snare's ringing body under the noise, in hertz (Hz). Lower is deeper; higher is tighter.","tune@rim":"The pitch of the rimshot's knock, in hertz (Hz). Lower is woodier; higher is sharper.","tune@clap":"A clap has no pitched body, so Tune does nothing on this lane.","tune@hat":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@hatOpen":"The pitch of the hat's metallic ring, in hertz (Hz). Lower is darker and trashier; higher is thinner.","tune@metal":"The pitch of the clang, in hertz (Hz). Lower is a deep gong; higher is a small bell.",decay:"How long each hit rings before it fades. Short is tight; long rings on.","decay@kick":"How long the kick booms, and how slowly its pitch falls. Short is a tight thud; long is a deep boom.","decay@tom":"How long the tom rings, and how slowly its pitch falls. Short is a thud; long rings on.","decay@hatOpen":"How long the open hat sizzles; it rings far longer than the closed hat at the same setting. A closed-hat hit still cuts it short.",tone:"How bright the hit is. Lower is darker; higher is brighter.","tone@kick":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@tom":"How bright the click at the start of each hit is. Lower is softer; higher is sharper.","tone@snare":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@clap":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@rim":"How bright the noise is. Lower is dull and dark; higher is crisp.","tone@hat":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@hatOpen":"How full the metal sounds. Lower keeps only a thin top sizzle; higher lets more of the ring through.","tone@metal":"How much the clang rings with extra overtones. Lower is a purer tone; higher is harsher.",snap:"How sharp the start of each hit is. More is punchier.","snap@kick":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@tom":"How far the pitch drops at the start of each hit, plus the click. More is punchier; 0 is a soft, round tone.","snap@snare":"Noise rattle against the drum's body. More is a noisier crack; less is more tone.","snap@rim":"Noise against the knock's body. More is a noisier click; less is more tone.","snap@clap":"How tight the clap's bursts are and how much noise they carry. More is a tighter, snappier clap.","snap@hat":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@hatOpen":"How much hiss mixes in with the metal. More is noisier and breathier.","snap@metal":"Moves the clang's overtones for a different metallic colour. Try a few settings to hear each one.",drive:"Saturation on this drum alone. More is fatter and grittier; 0 is clean.",level:"How loud this lane is. Turn it down to sit it back in the mix.","shaker-tune":"The shell's resonance in hertz (Hz, vibrations per second). Lower is a bigger, darker shaker; higher is smaller and brighter.","shaker-decay":"How long each shake rings after its peak. Short is a tight tick; long is a smoother swish.","shaker-tone":"How bright and ringing the shell is. Higher is brighter and thinner; lower is softer.","shaker-snap":"How many beads: few is a coarse, ticking cabasa, many is a dense, soft egg shaker.","shaker-drive":"How quickly each stroke swells in. Short is a sharp chick; long is a soft swish.","shaker-level":"How loud the shaker is. Turn it down to sit it back in the mix.","ride-tune":"The ride's tone, from darker to brighter, in kilohertz (kHz). The wash darkens from there as it fades.","ride-decay":"About how long the ride rings, in seconds, until it has faded away. Short is a tight ping; long is a big ride.","ride-tone":"How loud the smooth wash is under the click. Lower is a dry tick; higher is washier.","ride-snap":"How hard the stick's click is. More is a clearer ping on every beat.","ride-drive":"Saturation on the ride alone. More is grittier; 0 is clean.","ride-level":"How loud the ride is. It keeps time, so it usually sits under the kit.","crash-tune":"The crash's tone, from darker to brighter, in kilohertz (kHz). The tail darkens from there as it fades.","crash-decay":"About how long the crash rings, in seconds, until it has faded away. Short is a quick splash; long is a big crash.","crash-tone":"How loud the long wash is after the burst. Lower is a short splash; higher is a big, washy crash.","crash-snap":"How hard the crash's first burst is. More is a sharper accent.","crash-drive":"Saturation on the crash alone. More is grittier; 0 is clean.","crash-level":"How loud the crash is. It is an accent, so it usually sits on top.","section:sound":"The whole kit's sound: the kit every drum plays, and the character of the Deep drums. The pattern stays as it is.",kit:"The kit every drum plays: Classic or a Deep kit (808, Lo-fi, Linn, Minimal). Mixed: drums play different kits, as tagged after their names.","deep-kit":"Opens the kits, your saved kits under them. Choosing one sets every drum and the character to that kit's sound.","sound-subject":"The kit every drum plays, Mixed when they differ, or your saved kit's name.","kit-prev":"The previous kit, for every drum. From Mixed it steps from the kit most drums play.","kit-next":"The next kit, for every drum. From Mixed it steps from the kit most drums play.","kit-save":"Keep this mix of drums as your own kit, with each drum's sound and the character, to pick again later.","kit-save-ok":"Save the kit under this name. A kit with the same name is replaced.","kit-save-cancel":"Close the name field without saving.","kit-rename":"Give this saved kit a new name. Songs that used it keep playing as they were.","kit-delete":"Removes this saved kit (Undo brings it back). Songs that used it keep their drums and play the same.","drum-source":"Where this drum's sound comes from: Classic or one of the Deep kits. Only this drum changes; the rest keep the kit.",source:"Where this drum's sound comes from: Classic or one of the Deep kits. Only this drum changes; it remembers its settings on each kit.","use-kit":"Put this drum back on the kit the others play.","deep-room":"A small room around the Deep drums (Classic drums stay dry). 0 is dry; more is a bigger, wetter space.","deep-grit":"Bit and sample-rate crush on the Deep drums, for an old sampler's grit. 0 is clean.","deep-hiss":"Tape hiss and vinyl crackle under the Deep drums while they play. 0 is silent.","deep-kit-more":"Saturation and the kit's low and high cut. The line shows their settings.","deep-sat":"Warm saturation on the Deep drums. 0 is off; more is fatter and louder.","deep-lowCut":"Takes the rumble below this pitch out of the Deep drums. All the way down is off.","deep-highCut":"Takes the top above this pitch off the Deep drums, for a darker sound. All the way up is off.","deep-env":"How the selected drum's loudness falls over time, on a stretched time scale. Click it to hear the drum.","deep-tune":"The pitch of the drum's tone and ring, in semitones. Lower is deeper.","deep-tune@kick":"The kick's pitch, in semitones. Lower is a deeper thump; higher is tighter.","deep-tune@tom":"The tom's pitch, in semitones. Lower is a floor tom; higher is a small tom.","deep-decay":"How long the drum rings. 100% is the kit's own; lower is tighter, higher rings on.","deep-body":"How much of the drum's tone sounds under the noise. Lower is more noise and snap; higher is rounder.","deep-snap":"How hard the attack clicks. More is a sharper, punchier start.","deep-snap@clap":"How sharp the clap's quick bursts are. More is a snappier clap.","deep-noise@ride":"The ride's tone, from darker to brighter: the click, the wash and how it darkens all move together, with no pitch.","deep-noise@crash":"The crash's tone, from darker to brighter: the burst, the wash and how it darkens all move together, with no pitch.","deep-decay@ride":"How long the ride's wash rings on. 100% is the kit's own; lower is a tight ping, higher a big wash.","deep-decay@crash":"How long the crash's tail rings on. 100% is the kit's own; lower is a quick splash, higher a long wash.","deep-snap@ride":"How loud the stick's tick is on top of the wash. More is a clearer ping.","deep-snap@crash":"How hard the crash's first splash is. More is a bigger hit.","deep-noise":"The colour of the drum's noise, in octaves. Brighter moves it up; darker moves it down.","deep-sizzle":"How much high sizzle sits on the drum. More is brighter and airier.","deep-drive":"Saturation on this drum alone. More is fatter and grittier; clean is none.","deep-level":"How loud this drum is in the kit, in decibels (dB). 0 dB is the kit's own.","deep-more":"The drum's Body, Noise colour and Drive. The line shows their settings.","hack:hack-filter":"A filter on the whole kit: it takes away part of the sound to make it darker or thinner.","hack:hack-drive":"Saturation on the whole kit for warmth and grit. It also tames the loudest peaks.","hack:hack-compressor":"Evens out the loud and quiet parts of the kit for a tighter, punchier sound.","comp-gauge":"What reaches the compressor (In, the threshold as a tick), how much it turns down (GR) and what comes out (Out).","hack-switch":"Turns this effect on or off. Off, the sound passes through untouched and the settings are kept.",more:"More settings for this effect.",mode:"Low pass keeps the lows and cuts the highs; High pass does the opposite. Band pass keeps only a band around Cutoff.",cutoff:"Where the filter cuts, in hertz (Hz). In Low pass, lower is darker and all the way up is open; in High pass, higher is thinner.",resonance:"Boosts the sound right at the Cutoff for a sharper, ringing edge. 0 is smooth.",curve:"A picture of the filter: low pitches on the left, high on the right. Where the line is high the sound passes; where it drops, it is cut.",meter:"How loud the kit is right now, after the Hacks.","hack-drive-drive_db":"How hard the sound is pushed into saturation, in decibels (dB). More is grittier; 0 is clean.","hack-drive-output_db":"The level after the drive, in decibels (dB). Use it to match the loudness with Drive on and off.","hack-drive-mix":"The blend of driven and clean sound. 100% is all driven; lower mixes the clean kit back in.","hack-drive-curve":"The drive's character. Smooth is warm and keeps the level steady; Acid is harder and rawer.","hack-drive-tone":"Darkens the driven sound by cutting its highs. All the way up is off; lower is darker.","hack-compressor-threshold_db":"The level, in decibels (dB), above which the compressor turns the sound down. Lower acts on more of the sound.","hack-compressor-ratio":"How strongly sound above the Threshold is turned down. 1:1 does nothing; higher squashes harder.","hack-compressor-attack_ms":"How quickly the compressor clamps down, in milliseconds (ms). Slower lets each hit's punch through first.","hack-compressor-release_ms":"How quickly the compressor lets go after a hit, in milliseconds (ms). Shorter pumps with the beat; longer is smoother.","hack-compressor-makeup_db":"Turns the compressed kit back up, in decibels (dB), to make up for what the compressor took off.","toast-undo":"Takes back the last surprise, re-roll, clear, move, slot clear or load."};function bs(t,e,n=!1){return(e?Wt[`${t}@${e}`]:void 0)??(n?Wt[`${t}@touch`]:void 0)??Wt[t]}function nh(t,e=!1){if(t.key!=="lane")return bs(t.key,t.voice,e);const n=t.voice?Wt[`drum@${t.voice}`]:void 0,a=bs("lane",void 0,e);return n&&a?`${n} ${a}`:a}const ce=(t,e)=>t.dataset?.[e];function ah(t,e){const n=[],a=(r,o)=>{for(const l of Array.from(t.querySelectorAll(r))){const d=o(l);d&&n.push({el:l,...d})}},s=r=>()=>({key:r});return a(".petra-head-title",s("brand")),a(".petra-menu > summary",s("menu")),a("[data-petra-menu]",r=>({key:`menu:${ce(r,"petraMenu")}`})),a(".nc-module-hd > .nc-title",r=>{const o=r.closest("[data-nc-module]")?.getAttribute("data-nc-module");return o?{key:`module:${o}`}:null}),a("[data-nc-hide]",s("hide")),a("[data-nc-index]",s("index")),a(".nc-slim",s("slim")),a(".nc-field",r=>{const o=Array.from(r.children).find(p=>p.classList.contains("nc-label"));if(!o)return null;const l=r.classList.contains("nc-morph-field")?"morph":ce(r,"ncId");if(!l)return null;const d=o.getAttribute("for"),c=d?r.ownerDocument.getElementById(d)??null:r.querySelector("input, select"),u=r.closest('[data-nc-section="parameters"]')?e.selectedVoice():void 0;return{key:l,voice:u,control:c,el:o}}),a(".nc-group[data-nc-id] > .nc-group-toggle",r=>({key:r.parentElement?.getAttribute("data-nc-id")??"",control:r})),a(".nc-btn[data-nc-id]",r=>({key:ce(r,"ncId")??""})),a("[data-nc-sparkle]",s("surprise")),a("[data-nc-tap]",s("tap")),a(".nc-snap[data-nc-slot]",s("slots")),a("[data-nc-slot-op]",r=>({key:`slot-${ce(r,"ncSlotOp")==="store"?"save":"clear"}`})),a(".nc-note[data-nc-id]",r=>({key:ce(r,"ncId")??""})),a(".nc-choice-row[data-nc-id]",r=>({key:ce(r,"ncId")??""})),a("[data-petra-help]",r=>({key:ce(r,"petraHelp")??""})),a(".petra-kit-name",s("deep-kit")),a(".nc-pl-chip",s("pl-source")),a(".nc-pl-load",s("pl-row")),a(".nc-pl-pad",s("pl-pad")),a(".nc-pl-more",s("pl-more")),a(".nc-pl-menu > button",s("pl-menu")),a(".nc-pl-pads > button",s("pl-to-pad")),a(".nc-pl-btn",r=>({key:ce(r,"ncId")??"pl-cancel"})),a(".petra-deep-env > svg",s("deep-env")),a('.nc-seg[aria-label="Step tool"] > button',r=>({key:r.hasAttribute("data-nc-accent-mode")?"tool-accent":"tool-note"})),a("[data-nc-fill]:not([data-nc-clear])",s("fill")),a("[data-nc-clear]",s("clear")),a("[data-nc-ms]",r=>({key:ce(r,"ncMs")==="solo"?"solo":"mute"})),a(".nc-row > .nc-name",r=>{const o=r.closest(".nc-row"),l=o?.querySelector("[data-nc-dice]")?.getAttribute("data-nc-dice")??o?.querySelector("[data-nc-len]")?.getAttribute("data-nc-len")??void 0;return{key:"lane",voice:l?e.voiceOf(l):void 0}}),a(".nc-len-handle",s("length")),a(".nc-row-dice, [data-nc-pads-dice]",s("dice")),a(".nc-pads-step:not([data-nc-pads-dice])",r=>({key:r.getAttribute("aria-label")?.startsWith("Next")?"pads-next":"pads-prev"})),a(".nc-pads-label",s("pads-lane")),a("[data-nc-pads-play]",s("play")),a(".nc-moves-row > .nc-moves-label",r=>({key:`moves:${(r.parentElement?.getAttribute("aria-label")??"").toLowerCase()}`,control:r.parentElement})),a("[data-nc-move]",r=>({key:`move:${ce(r,"ncMove")}`})),a(".nc-panel-title",r=>{const o=r.closest("[data-nc-section]")?.getAttribute("data-nc-section");return o?{key:`section:${o}`}:null}),a(".nc-panel-subject",r=>({key:r.closest('[data-nc-section="sound"]')?"sound-subject":"panel-subject"})),a(".nc-ui-fx > .nc-ui-fx-hd > .nc-ui-fx-name",r=>{const o=r.closest(".nc-ui-fx")?.getAttribute("data-nc-id");return o?{key:`hack:${o}`}:null}),a("[data-nc-fx-switch]",s("hack-switch")),a("details.nc-ui-more > summary",s("more")),a(".nc-step-editor-head > .nc-label",s("edit-step")),a(".nc-step-editor-done",s("edit-done")),a(".nc-step-editor-row > .nc-label",r=>{const o=r.parentElement?.querySelector("input[data-nc-edit]");return{key:`edit-${o?.getAttribute("data-nc-edit")==="probability"?"chance":"velocity"}`,control:o??null}}),a(".nc-ui-toast-action",s("toast-undo")),n}const ys="rhythm-help-",ih="button, input, select, summary, [role]";function sh(t,e=document){mu({document:e});const n=e.createElement("div");n.id="rhythm-help",n.hidden=!0,e.body.append(n);const a=new Map,s=c=>{let u=a.get(c);if(!u){u=`${ys}${a.size+1}`;const p=e.createElement("span");p.id=u,p.textContent=c,n.append(p),a.set(c,u)}return u},r=(c,u)=>{const p=c.getAttribute("aria-describedby")??"",b=[...p.split(/\s+/).filter(g=>g&&!g.startsWith(ys)),u].join(" ");b!==p&&c.setAttribute("aria-describedby",b)};let o;const l=()=>{o=t.selectedVoice();const c=e.defaultView?.matchMedia?.("(pointer: coarse)").matches??!1;for(const u of ah(e,t)){const p=nh(u,c);if(!p)continue;u.el.getAttribute(bt)!==p&&u.el.setAttribute(bt,p),u.el.removeAttribute("title"),u.control?.classList.contains("nc-moves-row")&&u.control.removeAttribute("title");const f=u.control??(u.el.matches(ih)?u.el:null);f&&r(f,s(p))}},d=new MutationObserver(c=>{let u=!1;for(const p of c){if(p.type==="attributes"){const f=p.target;f.hasAttribute("title")&&f.hasAttribute(bt)&&f.removeAttribute("title");continue}if(!(p.target===n||p.target.localName==="canvas"))for(const f of Array.from(p.addedNodes))f.nodeType===1&&!f.matches(".nc-ui-help, [data-nc-probe]")&&(u=!0)}u&&l()});return d.observe(e.body,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["title"]}),l(),{refresh:l,follow(){t.selectedVoice()!==o&&l()},disconnect(){d.disconnect(),n.remove()}}}const po={on:!1,accent:!1,velocity:.8},re=t=>({...t??po});function ue(t){return Math.max(1,Math.min(t.length,t.steps.length))}function In(t,e){const n=ue(t),a=t.steps.map(re);for(let s=0;s<n;s++)a[((s+e)%n+n)%n]=re(t.steps[s]);return{...t,steps:a}}function rh(t){const e=ue(t),n=t.steps.map(re);for(let a=0;a<e;a++)n[e-1-a]=re(t.steps[a]);return{...t,steps:n}}function ws(t,e){const n=ue(t),a=[];for(let o=0;o<n;o++)t.steps[o]?.on&&a.push(o);if(a.length<2)return{...t,steps:t.steps.map(re)};const s=a.map(o=>t.steps[o]),r=t.steps.map(re);return a.forEach((o,l)=>{const d=s[((l-e)%a.length+a.length)%a.length];r[o]={on:!0,accent:d.accent,velocity:d.velocity,...d.probability!==void 0?{probability:d.probability}:{}}}),{...t,steps:r}}function oh(t,e){const n=t.map(s=>({...s,steps:s.steps.map(re)})),a=Math.max(0,...t.map(ue));for(let s=0;s<a;s++){const r=t.flatMap((l,d)=>s<ue(l)?[d]:[]);if(r.length<2)continue;const o=r.map(l=>re(t[l]?.steps[s]));for(let l=o.length-1;l>0;l--){const d=Math.floor(e()*(l+1));[o[l],o[d]]=[o[d],o[l]]}r.forEach((l,d)=>{const c=n[l];c&&(c.steps[s]=o[d])})}return n}function lh(t,e){const n=ue(t),a=t.steps.map(re),s=e()<.5?1:2;for(let r=0;r<s;r++){const o=[],l=[];for(let c=0;c<n;c++)(a[c]?.on?o:l).push(c);if(!l.length)break;const d=o.flatMap(c=>[-1,1].map(u=>[c,(c+u+n)%n]).filter(([,u])=>!a[u]?.on));if(d.length&&e()<.7){const[c,u]=d[Math.floor(e()*d.length)];a[u]=re(a[c]),a[c]=re(po)}else{const c=l[Math.floor(e()*l.length)];a[c]={on:!0,accent:!1,velocity:.55}}}return{...t,steps:a}}function ch(t,e){const n=s=>s.steps.slice(0,ue(s)).filter(r=>r.on).length,a=e.some(s=>n(s)>0);switch(t){case"shift-left":case"shift-right":case"shift-random":case"reverse":return e.some(s=>n(s)>0&&n(s)<ue(s));case"groove-left":case"groove-right":return e.some(s=>{const r=s.steps.slice(0,ue(s)).filter(o=>o.on);return r.length>1&&r.some(o=>o.accent!==r[0]?.accent||o.velocity!==r[0]?.velocity)});case"shuffle":return e.length>1&&a;case"mutate":return e.length>0}}function dh(t,e,n){switch(t){case"shift-left":return e.map(a=>In(a,-1));case"shift-right":return e.map(a=>In(a,1));case"shift-random":{const a=Math.min(...e.map(ue)),s=a>1?1+Math.floor(n()*(a-1)):0;return e.map(r=>In(r,s))}case"reverse":return e.map(rh);case"groove-left":return e.map(a=>ws(a,-1));case"groove-right":return e.map(a=>ws(a,1));case"shuffle":return oh(e,n);case"mutate":return e.map(a=>lh(a,n))}}class uh{doc=Xo();bank=Rs();morphSeconds=0;get recallGlideSeconds(){return 0}playing=!1;edited=null;glidePending=null;selectedTrack=0;sparkleUndo=null;sparkleEdited=!1;selectTrack(e){!Number.isInteger(e)||e<0||e>=this.doc.tracks.length||(this.selectedTrack=e)}edit(e){this.retireSparkle(),e(this.doc),this.writeActive(),this.glidePending=0}writeActive(){const e=this.bank.active;e==null||!this.bank.slots[e]||(this.bank=Jo(this.bank,this.doc),this.edited=e)}store(e){this.retireSparkle(),this.doc.swing=this.liveSwing,this.bank=Qo(this.bank,e,this.doc),this.edited=null}replace(e,n){this.retireSparkle();const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...structuredClone(e),bpm:this.doc.bpm},this.bank=structuredClone(n),this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=a}loadGroove(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.doc={...this.doc,swing:e.swing,fx:structuredClone(e.fx),tracks:structuredClone(e.tracks),engine:e.engine,deep:structuredClone(e.deep)},this.bank={slots:this.bank.slots,active:null},this.edited=null,this.selectedTrack=Math.min(this.selectedTrack,this.doc.tracks.length-1),this.glidePending=0,this.sparkleUndo=n}putSlot(e,n){if(e<0||e>=this.bank.slots.length)return;this.retireSparkle();const a=this.bank.slots.slice();a[e]=n?structuredClone(n):null;const s=!n&&this.bank.active===e?null:this.bank.active;this.edited===e&&(this.edited=null),this.bank={slots:a,active:s}}clear(e){this.retireSparkle();const n={bank:structuredClone(this.bank),edited:this.edited,doc:null,selectedTrack:this.selectedTrack};this.bank=Zo(this.bank,e),this.edited===e&&(this.edited=null),this.sparkleUndo=n}peek(e){const n=pi(this.bank,e,this.doc,0);return n.applied?n.document:null}recall(e,n=this.recallGlideSeconds){const a=pi(this.bank,e,this.doc,n);return a.applied?(this.retireSparkle(),this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=a.glideSeconds,!0):!1}surprise(e=Math.random){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},a=fc(this.doc,e);this.sparkleUndo=n,this.bank=a.bank,this.doc=a.document,this.edited=null,this.glidePending=0}diceLane(e,n=Math.random){if(!this.doc.tracks[e])return!1;const a={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};return this.doc=cc(this.doc,e,n),this.writeActive(),this.sparkleUndo=a,this.glidePending=0,!0}clearSteps(){if(!this.doc.tracks.some(a=>a.steps.some(s=>s.on)))return!1;const e={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},n=structuredClone(this.doc);for(const a of n.tracks)a.steps=a.steps.map(()=>({on:!1,accent:!1,velocity:.8}));return this.doc=n,this.writeActive(),this.sparkleUndo=e,this.glidePending=0,!0}moveTracks(e,n,a=Math.random){const s=e.filter(c=>this.doc.tracks[c]);if(!s.length)return!1;const r=s.map(c=>this.doc.tracks[c]),o=dh(n,r,a);if(JSON.stringify(o)===JSON.stringify(r))return!1;const l={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack},d=structuredClone(this.doc);return s.forEach((c,u)=>{const p=o[u];p&&(d.tracks[c]=structuredClone(p))}),this.doc=d,this.writeActive(),this.sparkleUndo=l,this.glidePending=0,!0}undoableEdit(e){const n={bank:structuredClone(this.bank),edited:this.edited,doc:structuredClone(this.doc),selectedTrack:this.selectedTrack};this.retireSparkle(),this.sparkleEdited=!1,e(this.doc),this.writeActive(),this.sparkleUndo=n,this.glidePending=0}undoSurprise(){const e=this.sparkleUndo;return e?(this.bank=e.bank,this.edited=e.edited,this.sparkleUndo=null,e.doc&&(this.doc=e.doc,this.selectedTrack=e.selectedTrack,this.glidePending=0),!0):!1}takeSurpriseEdit(){const e=this.sparkleEdited;return this.sparkleEdited=!1,e}retireSparkle(){this.sparkleUndo&&(this.sparkleUndo=null,this.sparkleEdited=!0)}followSwing=null;get liveSwing(){return this.followSwing??this.doc.swing}adoptSwing(e){if(e==null||e===0||!Number.isFinite(e))return!1;const n=Math.min(.75,Math.max(.5,e)),a=this.liveSwing;return this.followSwing=n,n===a?!1:(this.glidePending=0,!0)}setSwing(e){this.followSwing=null,this.edit(n=>{n.swing=e})}consumeGlide(){if(this.glidePending===null)return;const e=this.glidePending;return this.glidePending=null,e}}let vs=!1;function ph(){return`
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
${hh()}
}
`}function On(t){return`background-image: conic-gradient(from -45deg at 50% 100%, ${i(t)} 90deg, transparent 0);`}function hh(){const t=`calc(${i("control-gap")} * 2)`,e=`calc(${i("control-gap")} * 0.75)`;return`  .nc-select {
    ${On("text-sub")}
    background-size: ${t} ${i("control-gap")};
    background-position: right ${e} top 55%;
    background-repeat: no-repeat;
    background-origin: border-box;
  }
  .nc-select:is(:hover, :focus):not(:disabled) { ${On("text")} }
  .nc-select:disabled { ${On("divider")} }`}function fh(t=document){if(vs)return;const e=t.createElement("style");e.dataset.rhythmKitOverrides="",e.textContent=ph(),t.head.append(e),vs=!0}function mh(t){const e=t.getOutputTimestamp?.(),n=e?.contextTime,a=e?.performanceTime;if(n===void 0||a===void 0||!(n>0)||!(a>0))return null;const s=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0;return{contextTime:n,performanceTime:a,timeOrigin:performance.timeOrigin,latencyMs:s,wallMs:performance.timeOrigin+performance.now(),hidden:document.hidden}}function ks(t,e){const n=t.getOutputTimestamp?.(),a=n?.contextTime,s=n?.performanceTime;if(a===void 0||s===void 0||!(a>0)||!(s>0)||!Number.isFinite(e))return null;const r=s+(e-a)*1e3,o=Number.isFinite(t.outputLatency)?t.outputLatency*1e3:0,l=performance.timeOrigin+r;return{playedMs:l,plusLatencyMs:l+o,latencyMs:o,stampContextTime:a,stampPerformanceTime:s}}const gh=new Set(["transport-more","moves-more","params-more","hacks-more"]);function gn(t){for(const e of Array.from(t.querySelectorAll(".nc-group[data-nc-id]")))gh.has(e.dataset.ncId??"")&&(e.dataset.ncCollapse!=="phone"&&(e.dataset.ncCollapse="phone"),xs(e),!e.dataset.petraFold&&(e.dataset.petraFold="",ho(e,"nc-group-toggle")?.addEventListener("click",()=>xs(e))))}function xs(t){const e=ho(t,"nc-group-body");e?.hidden&&(e.hidden=!1)}function ho(t,e){return Array.from(t.children).find(n=>n instanceof HTMLElement&&n.classList.contains(e))}function bn(t){return t.map(([e,n])=>`${e} ${n}`).join(" · ")}const fa="petra-presets";function bh(t,e,n){const a=t.filter(Boolean).length,s=[a?`${a} of ${t.length} saved`:"none saved"];return e!=null&&t[e]&&s.push(`slot ${n[e]??e+1}`),s.join(" · ")}const yh=1400;function Rn(t,e,n,a=!1){return t==="store"?null:t==="clear"?n?`Cleared ${e}`:null:n?null:a?`${e} is empty · hold to save`:`${e} is empty · Shift+${e} stores`}function wh(t){return t===0?"0 s":`${Math.round(t*100)/100} s`}class vh{constructor(e){this.repaint=e}text="";timer=0;say(e,n=yh){window.clearTimeout(this.timer),this.timer=0,this.text=e??"",e&&(this.timer=window.setTimeout(()=>{this.timer=0,this.text="",this.repaint()},n))}}const kh=50;function xh(t,e,n,a=kh){if(n)return 0;const s=t-e;return s>=a?0:a-s}const Pe=1e3;function Ga(t,e,n){return t==="linear"||!(n>e)?"linear":e>0?"log":"power"}function $h(t,e,n,a){if(!(n>e)||!Number.isFinite(a))return 0;const s=Math.min(n,Math.max(e,a)),r=Ga(t,e,n);if(r==="log")return Math.log(s/e)/Math.log(n/e);const o=(s-e)/(n-e);return r==="power"?Math.cbrt(o):o}function Sh(t,e,n,a){const s=Math.min(1,Math.max(0,a||0)),r=Ga(t,e,n);return r==="log"?e*(n/e)**s:e+(n-e)*(r==="power"?s**3:s)}function Eh(t,e,n,a){let s=Math.min(n,Math.max(e,t));if(a&&a>0){s=e+Math.round((s-e)/a)*a;const r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));s=Math.min(n,Math.max(e,Number(s.toFixed(r))))}return s}const fo=(t,e,n,a)=>Math.round($h(t,e,n,a)*Pe),rn=(t,e,n,a,s)=>Eh(Sh(t,e,n,a/Pe),e,n,s),mo=new Map;let $s=!1;function Ah(){$s||typeof document>"u"||($s=!0,document.addEventListener("keydown",t=>{const e=t.target;if(!(e instanceof HTMLInputElement)||e.type!=="range"||e.disabled)return;const n=mo.get(e.id);if(!n)return;const a=fo(n.taper,n.min,n.max,n.value),s=t.shiftKey?1:Pe/100,r={ArrowRight:s,ArrowUp:s,ArrowLeft:-s,ArrowDown:-s,PageUp:100,PageDown:-100};let o=t.key==="Home"?0:t.key==="End"?Pe:r[t.key]===void 0?null:a+r[t.key];if(o===null)return;t.preventDefault(),o=Math.min(Pe,Math.max(0,Math.round(o)));const l=Math.sign(o-a);let d=rn(n.taper,n.min,n.max,o,n.step);for(;l!==0&&d===n.value&&o>0&&o<Pe;)o+=l,d=rn(n.taper,n.min,n.max,o,n.step);e.value=String(o),n.set(d)},!0))}function yn(t,e){const{min:n,max:a,step:s}=t;return Ga(e,n,a)==="linear"?t:(mo.set(t.id,{taper:e,min:n,max:a,step:s,value:t.value,set:r=>t.onChange(r)}),Ah(),{...t,min:0,max:Pe,step:1,value:fo(e,n,a,t.value),onChange:r=>t.onChange(rn(e,n,a,r,s)),...t.onCommit?{onCommit:r=>t.onCommit?.(rn(e,n,a,r,s))}:{}})}class Th{constructor(e,n=()=>null){this.host=e,this.anchor=n}handle=null;get open(){return this.handle!==null}show(e,n="Surprise applied"){this.handle?.close();const a=du({message:n,actionLabel:"Undo",onAction:e,host:this.host,anchor:this.anchor(),onClose:()=>{this.handle===a&&(this.handle=null,this.clearLive())}});this.handle=a}dismiss(){const e=this.handle;this.handle=null,e?.close(),this.clearLive()}clearLive(){const e=this.host.querySelector("[data-nc-ui-toast-live]");e&&(e.textContent="")}}function Ss(t,e){const n=new AudioContext(e);let a="loading";const s=(async()=>{n.state==="running"&&await n.suspend();for(const r of t)await n.audioWorklet.addModule(r)})().then(()=>{a="loaded"},r=>{throw a="failed",r});return s.catch(()=>{}),{context:n,ready:s,get status(){return a},async start(){return a==="loaded"&&Ne(n),await s,n.state!=="running"&&await n.resume(),n.state}}}function Ne(t){t.state==="running"||t.state==="closed"||t.resume().catch(()=>{})}const Mh=5e3;function Lh(){return typeof navigator<"u"&&"userAgentData"in navigator}function Ch(t,e,n,a={}){const s=a.restartsOnWorkletReady??Lh(),r=a.preloadTimeoutMs??Mh;let o=null,l=!1,d=null,c=null;async function u(){const y=new AudioContext(e);Ne(y);try{for(const h of t)await y.audioWorklet.addModule(h);return y}catch(h){throw y.close().catch(()=>{}),h}}function p(y,h=!1){l=!0,o=null,y.context.close().catch(()=>{}),h?n?.(new Error(`audio preload still loading after ${r} ms`)):y.ready.catch(m=>n?.(m))}async function f(y){const{context:h}=y;n?.(new Error(`audio preload still loading after ${r} ms; loading into its context again`)),Ne(h);const m=(async()=>{for(const v of t)await h.audioWorklet.addModule(v)})();try{return await Promise.race([y.ready.then(()=>{},()=>m),m]),h}catch(v){throw l=!0,o===y&&(o=null),h.close().catch(()=>{}),v}}function b(y){let h;const m=new Promise(v=>{h=setTimeout(()=>v("timeout"),r)});return Promise.race([y.ready.then(()=>"ready"),m]).finally(()=>clearTimeout(h))}async function g(){if(!l){o??=Ss(t,e);const y=o;if(y.status==="failed")p(y);else{const h=y.status==="loaded"||!s;if(h&&Ne(y.context),y.status==="loading"){let m;try{m=await b(y)}catch{return p(y),u()}if(m==="timeout")return s?(p(y,!0),u()):f(y)}return y.context.state==="closed"?(o===y&&(o=null),g()):(h||Ne(y.context),y.context)}}return u()}return{preload(){o||d||c||l||(o=Ss(t,e))},load(){return d&&d.state!=="closed"?(Ne(d),Promise.resolve(d)):c?(o&&(o.status==="loaded"||!s)&&Ne(o.context),c):(c=g().then(y=>(d=y,o=null,y)).finally(()=>{c=null}),c)}}}const Ua={kick:36,rim:37,snare:38,clap:39,hat:42,tom:45,hatOpen:46,crash:49,ride:51,metal:56,shaker:70},Nh=new Map(Object.entries(Ua).map(([t,e])=>[e,t])),Fh=t=>Nh.get(t)??null,Es=.5,As=8,zh=.25,Ph=1.2;function Dh(t,e){const n=JSON.stringify([Math.round(e*1e3),t.map(s=>[s.voice,s.length,s.mute?1:0,s.solo?1:0,s.steps.map(r=>r.on?[r.accent?1:0,Math.round(r.velocity*1e3),Math.round((r.probability??1)*1e3)]:0)])]);let a=2166136261;for(let s=0;s<n.length;s++)a^=n.charCodeAt(s),a=Math.imul(a,16777619);return`p${(a>>>0).toString(36)}`}function Ih(t){let e=Number.NEGATIVE_INFINITY,n=0;const a={hits:0,messages:0,refused:0};return{tick(s){if(s.beat===null){e=Number.NEGATIVE_INFINITY;return}s.beat<e-Es-1e-9&&(e=Number.NEGATIVE_INFINITY);const r=s.beat<=As?0:s.beat,o=Math.max(Number.isFinite(e)?Math.max(e,s.beat-As):r,s.entry),l=s.beat+Es;if(!(l>o))return;e=l;const d=Ic(s.tracks,s.swing,o,l);if(!d.length)return;const c=Dh(s.tracks,s.swing),u=[];for(const p of d){const f=`r|${++n}`,b=Ua[p.voice],g=Math.min(1,Math.max(.01,p.velocity*(p.accent?Ph:1)));u.push({type:"note",id:f,beat:p.beat,on:!0,note:b,velocity:g,pattern:!0,form:c},{type:"note",id:f,beat:p.beat+zh,on:!1,note:b,pattern:!0,form:c})}try{t({v:1,kind:"played",events:u})?(a.messages++,a.hits+=d.length):a.refused++}catch{a.refused++}},reset(){e=Number.NEGATIVE_INFINITY},stats:a}}const Ts=t=>typeof t=="object"&&t!==null,_n=t=>typeof t=="number"&&Number.isFinite(t),Oh=t=>typeof t=="string"&&t.length>0&&t.length<=128;function Rh(t){const e=new Map,n={hits:0,duplicates:0,notDrums:0,refused:0};return{message(a){if(!Ts(a)||a.v!==1){n.refused++;return}if(a.kind==="off"){const r=a.atBeat;if(r!==void 0&&!_n(r)){n.refused++;return}for(const[o,l]of e)(r===void 0||l>=r-1e-9)&&e.delete(o);t(r===void 0?{type:"unlayer"}:{type:"unlayer",atBeat:r});return}if(a.kind!=="notes"||!Array.isArray(a.events)||a.events.length>1024)return;const s=[];for(const r of a.events){if(!Ts(r)||!Oh(r.id)||!Number.isInteger(r.note)||!_n(r.startBeat)||!_n(r.velocity)||r.velocity<0||r.velocity>1){n.refused++;continue}if(e.has(r.id)){n.duplicates++;continue}const o=Fh(r.note);if(!o){n.notDrums++;continue}e.set(r.id,r.startBeat),s.push({beat:r.startBeat,voice:o,velocity:r.velocity})}if(e.size>4096){const r=Math.max(...e.values());for(const[o,l]of e)l<r-64&&e.delete(o)}s.length&&(n.hits+=s.length,t({type:"layer",hits:s}))},stats:n}}const _h=["kick","snare","clap","rim","hat","hatOpen","ride","crash","tom","metal","shaker",null,null,null,null,null],go=t=>Number.isInteger(t)&&t>=1&&t<=16?_h[t-1]??null:null;function Bh(t,e){let n=0;const a=new Map,s={sent:0,stopped:0,refused:0},r=(l,d)=>{const c=(e.origin+d)/1e3-Math.max(0,e.latency()),u=e.beatAt(c),p=u===null||!Number.isFinite(u)?{...l,beat:0,stopped:!0}:{...l,beat:u};try{t({v:1,kind:"played",events:[p]})?"stopped"in p?s.stopped++:s.sent++:s.refused++}catch{s.refused++}},o=(l,d)=>{const c=a.get(l);c&&(a.delete(l),r({type:"note",id:c.id,on:!1,note:c.note},d))};return{pad(l,d,c,u){const p=go(l);if(!p)return;if(!d){o(l,u);return}a.has(l)&&o(l,u);const f=`m|${++n}`,b=Ua[p];a.set(l,{id:f,note:b});const g=Math.min(1,Math.max(.01,Number.isFinite(c)?c:.8));r({type:"note",id:f,on:!0,note:b,velocity:g},u)},releaseAll(l){for(const d of[...a.keys()])o(d,l)},stats:s}}const Hh=-11,bo=10**(Hh/20),Ka={knee:.6,ceiling:.944,range:4,points:8193};function qh(t,{knee:e,ceiling:n}=Ka){const a=Math.abs(t);if(a<=e)return t;const s=n-e;return Math.sign(t)*(e+s*Math.tanh((a-e)/s))}function jh({range:t,points:e}=Ka){const n=new Float32Array(e);for(let a=0;a<e;a++)n[a]=qh((2*a/(e-1)-1)*t);return n}function Gh(t){const e=t.createGain();e.gain.value=bo;const n=t.createGain();n.gain.value=1/Ka.range;const a=t.createWaveShaper();return a.curve=jh(),a.oversample="none",e.connect(n).connect(a),{input:e,output:a}}const Ms="/rhythm/assets/processor-BwW_6CFR.js";function Uh(){try{return globalThis.localStorage??null}catch{return null}}function Wa(t,e,n=e,a=Uh()){if(!t||typeof t.storageKey!="function")return n;const s=t.storageKey(e);if(typeof s!="string"||!s||s===n)return n;try{if(t.legacyCopy!==!1&&a&&a.getItem(s)===null){const r=a.getItem(n);r!==null&&a.setItem(s,r)}}catch{}return s}const Kh="instance",Wh=99;function wn(t=typeof location>"u"?"":location.search){const e=new URLSearchParams(t).get(Kh)?.trim()??"";if(!/^\d+$/.test(e))return 1;const n=Number(e);return n>=2&&n<=Wh?n:1}function on(t,e){return e===1?t:`${t}#${e}`}function Vh(t,e){return e===1?t:`${t} ${e}`}let Ke;function Yh(t,e=wn()){if(Ke!==void 0)return Ke;Ke=null;try{if(typeof window>"u"||window.parent===window)return Ke;const n=window.parent.ncStudio;n&&n.version===1&&(Ke=n.attach(t,{instance:e}))}catch{}return Ke}function Xh(){let t;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(t=a.syncScope)}}catch{}if(!t)return{};const e=`/studio/${t}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${e}`,locks:n?{request:(a,s,r)=>n.request(`${a}${e}`,s,r)}:null}}function Jh(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t&&t.version===1&&typeof t.fxWorklet=="string"&&t.fxWorklet?t.fxWorklet:null}catch{return null}}function Mt(){try{if(typeof window>"u"||window.parent===window)return null;const t=window.parent.ncStudio;return t?.version===1&&t.play?t.play:null}catch{return null}}function ln(t,e=wn()){return e>1?`${t}#${e}`:t}function Qh(t,e=wn()){const n=Mt()?.owner()??null;return n===null||n==="studio"||n===ln(t,e)}function Zh(t,e,n,a){return e&&!t.running&&n?!a():t.sittingOut}function ef(t,e=4){return Number.isFinite(t)&&t>=0&&t<e}function tf(t,e=globalThis){typeof e.requestIdleCallback=="function"?e.requestIdleCallback(t,{timeout:250}):e.setTimeout(t,50)}function nf(t,e){let n=null;const a=()=>(n??=(async()=>{for(const s of e)await t.audioWorklet.addModule(s);return t})(),n.catch(()=>{n=null}),n);return{preload(){a().catch(()=>{})},load:a}}const yo=new URLSearchParams(location.search),J=yo.has("measure"),he=wn(),H=Yh("petra-rhythm",he),Ls=H?.holdFirstPlay?.()??(()=>{}),Va=Vh(Cp,he),af=Wa(H,"petra-rhythm.linkslots",on("petra-rhythm.linkslots",he)),sf=Cc(af),rf=!(J&&yo.get("clockStepFix")==="0");let ma=0;const of=.05;J&&(window.__onsets=[],window.__render=[],window.__stamps=[],window.__ts=[],window.__steps=[],window.__kicks=[],window.__recalls=[],window.__ignoredRecalls=[],window.__posts=[]);const _e=[40,240],x=new uh,Ya=J?on(Ze,he):Wa(H,Ze,on(Ze,he)),mt=J?null:Lp(localStorage,location.search,Ya),ga=J||mt?null:Mp(localStorage,location.search,Ya);if(mt)x.doc=mt.doc,x.bank=mt.bank,x.selectTrack(mt.selectedTrack);else if(!J&&!ga&&H?.legacyCopy===!1)for(const t of x.doc.tracks)t.steps=t.steps.map(()=>({on:!1,accent:!1,velocity:.8}));const vn=J?null:Tp(localStorage,()=>({doc:x.doc,bank:x.bank,selectedTrack:x.selectedTrack}),so,Ya);if(J){for(const e of x.doc.tracks)e.solo=e.voice==="kick";const t=x.doc.tracks.find(e=>e.voice==="kick");t&&(t.params.decay=of)}const O=new Nl({bpm:x.doc.bpm,minBpm:_e[0],maxBpm:_e[1],timebase:"shared"}),Xa=document.querySelector("#app");if(!(Xa instanceof HTMLElement))throw new Error("Missing #app");const lf=Fp(Xa);fh();Vp();const cf=sh({voiceOf:t=>x.doc.tracks.find(e=>e.id===t)?.voice,selectedVoice:()=>x.doc.tracks[ge()]?.voice}),ee=new Th(document.body,()=>{const t=document.querySelector("#play")?.closest(".nc-module");return t&&t.getBoundingClientRect().width<window.innerWidth/2?t:null});let C=null;J&&(window.__audioInfo=()=>C?{sampleRate:C.sampleRate,outputLatency:C.outputLatency,baseLatency:C.baseLatency,state:C.state,hidden:document.hidden}:null,window.__errors=[],window.addEventListener("unhandledrejection",t=>{window.__errors?.push(String(t.reason))}),window.__toggle=()=>Eo(),window.__clockStep=t=>{ma=t},window.__debug=()=>({audio:C?.state??null,onsets:window.__onsets?.length??0,stamps:window.__stamps?.length??0,render:window.__render?.length??0,ts:C?.getOutputTimestamp?.()??null,currentTime:C?.currentTime??null,reanchors:$e?.reanchors??0,play:document.querySelector("#play")?.textContent??null,errors:window.__errors??[]}));let X=null,ae=null,$e=null,cn=0,ba=0;function df(){return C?C.state==="running"?"running":C.state==="suspended"?"suspended":C.state==="interrupted"?"interrupted":"none":"needs-gesture"}const G=new jl({...Xh(),app:Va,version:"0.1.0",clock:O,capabilities:{prefersLeader:!0,sampleAccurate:!0,swing:!0,tempoRamps:!0,meter:!0,tempoRange:_e},audio:df,outputLatencyMs:()=>$e?.outputLatencyMs??null,swing:()=>x.liveSwing,startGate:()=>$e?$e.whenSettled():null});let Je="",wo=0,vo=!1,Cs=Number.NEGATIVE_INFINITY,We=null;const K=new Na;let se=!1,ya=Number.NEGATIVE_INFINITY;function Q(t=W()){return!se&&O.transport.isPlayingAt(t)}function Lt(t){if(!G.isLeader)return;const e=xh(performance.now(),Cs,t);if(e>0){We===null&&(We=setTimeout(()=>{We=null,Lt(!0)},e));return}We!==null&&(clearTimeout(We),We=null),G.publishState()&&(Cs=performance.now())}function wa(){const t=vo?dc(x.doc).tracks:x.doc.tracks;return se?t.map(e=>({...e,mute:!0})):t}function Ct(){if(!$e)return null;const t=Math.round($e.offset*1e4)/1e4;return{offset:t,shifted:Ll(O.toSnapshot(),t,"audio")}}const Ja=new Ac(({offset:t,shifted:e})=>JSON.stringify([t,e.anchor,e.startTime,e.stopTime,e.tempo,e.playing]));function va(t=!1){const e=Ct();e&&Ja.set(e,t)}const uf={mode:"lp",cutoff:1,resonance:0,drive:0};function ka(t){const e=Re(t),n=tr(t);return{v:2,chain:[{id:`${n.type}-1`,type:n.type,bypass:!e.filter||t.mode==="lp"&&t.cutoff>=.999,dials:n.dials},{id:"drive-1",type:"drive",bypass:!e.drive.on,dials:{...e.drive.dials}},{id:"compressor-1",type:"compressor",bypass:!e.compressor.on,dials:{...e.compressor.dials}}]}}let xa=null;function pf(){if(!ae)return;const t=ka(x.doc.fx),e=xa;if(xa=t,!e||e.chain.some((n,a)=>n.type!==t.chain[a]?.type)){ae.setState(t);return}t.chain.forEach((n,a)=>{const s=e.chain[a];if(s){s.bypass!==n.bypass&&ae?.setParam(n.id,"bypass",n.bypass);for(const[r,o]of Object.entries(n.dials))s.dials[r]!==o&&ae?.setParam(n.id,r,o)}})}function ko(t,e,n,a){return{clock:t,measure:J,swing:x.followSwing??e.swing,fx:uf,...a===void 0?{}:{glideSeconds:a},tracks:n.map(s=>({id:s.id,voice:s.voice,length:s.length,mute:s.mute,solo:s.solo,steps:s.steps})),...Yp(e)}}let ve=null;function z(t="state"){const e=t==="state"?Ct():Ja.current??Ct();if(!X||!e)return;wf(),t!=="state"&&(Je="");const{offset:n,shifted:a}=e,s=ve;s!==null&&(ve=null,Je="",ya=s);const r=x.consumeGlide(),o=JSON.stringify({seen:K.lastTaken,offset:n,anchor:a.anchor,start:a.startTime,stop:a.stopTime,tempo:a.tempo,swing:x.liveSwing,glide:r??null,tracks:wa(),fx:x.doc.fx,deep:x.doc.deep});if(pf(),o===Je)return;Je=o;const l={...ko(a,x.doc,wa(),r),seen:K.lastTaken,...s===null?{}:{enterBeat:s}};wo=n,X.port.postMessage({type:"state",state:l}),window.__posts?.push({why:t,anchor:a.anchor.time,start:a.startTime??Number.NaN,wallMs:performance.timeOrigin+performance.now()})}const Qa=H?nf(H.ctx,[Ms]):Ch([Ms],void 0,t=>console.warn("[rhythm] audio preload failed; loading on Play instead",t));async function ot(){const t=Qa.load();if(C)return;const e=await t;if(C){e!==C&&e.close().catch(()=>{});return}if(C=e,J){const s=C,r=s.getOutputTimestamp.bind(s);s.getOutputTimestamp=()=>{const o=r(),l=!ma||!o.contextTime?o:{contextTime:o.contextTime+ma/1e3,performanceTime:o.performanceTime},d=window.__ts;return d&&d.length<2e5&&d.push([performance.timeOrigin+performance.now(),l.contextTime??0,l.performanceTime??0]),l}}C.addEventListener("statechange",()=>{N(),He()}),$e=H?.mapper??new ql(C,rf?{}:{stepThresholdMs:0}),$e.onStep(s=>{window.__steps?.push({wallMs:performance.timeOrigin+performance.now(),stepMs:s.stepSeconds*1e3,confirmedAt:s.confirmedAt,reanchors:s.reanchors,revert:s.revert===!0}),va(!0)}),$e.start(),X=new AudioWorkletNode(C,"rhythm"),X.port.onmessage=s=>{if(s.data.switched!==void 0&&vf(s.data.switched),s.data.level!==void 0&&s.data.step!==void 0&&(ba=s.data.level*bo,cn!==s.data.step&&(cn=s.data.step,N())),!(!J||!C)){for(const r of s.data.onsets??[])window.__kicks?.push({step:r.step,beat:r.beat,shared:r.contextTime-wo});for(const r of s.data.onsets??[]){const o=ks(C,r.contextTime);o&&window.__onsets?.push({app:Va,beat:r.beat,contextTime:r.contextTime,hidden:document.hidden,stampAgeMs:(C.currentTime-r.contextTime)*1e3,...o})}for(const r of s.data.render??[]){const o=ks(C,r.contextTime);o&&window.__render?.push({contextTime:r.contextTime,peak:r.peak,playedMs:o.playedMs})}}},ae=cp(C,{moduleUrl:Jh()??up,slots:3,state:ka(x.doc.fx)}),xa=ka(x.doc.fx),X.connect(ae.input),ae.ready.then(()=>ri()),window.__hacks=()=>({state:ae?.getState(),status:ae?.status}),window.__rhythmLevel=()=>ba;const n=Gh(C);ae.output.connect(n.input),n.output.connect(H?.output??C.destination);let a=!1;Ja.subscribe(()=>z(a?"clock":"attach")),O.subscribe(s=>va(s.kind==="snapshot"&&s.replay===!0)),a=!0}const Ie=new Ec;let Za=!1,Vt=null,et=null;function kn(){return!C||C.state!=="running"}function hf(){return et=Ie.mode(kn(),Q()),et}function ei(){return Vt??=(async()=>{try{ve=Number.POSITIVE_INFINITY,C&&z(),await ot(),C&&C.state!=="running"&&await C.resume();const t=O.transport;ve=Ie.enter(t.beatAt(W()),t.bpm),$a&&($a=!1,ve=Math.floor(t.beatAt(W())/4)*4);const e=ve;Za=!0,ni(),z(),J&&(window.__join={...Ie.toJSON(),tapBeat:xo,sentBeat:e})}catch(t){throw Ie.cancel(),ve=Number.NEGATIVE_INFINITY,z(),t}})().finally(()=>{Vt=null,N(),He()}),Vt}let xo=Number.NaN,$a=!1;function $o(t){const e=t instanceof KeyboardEvent&&t.repeat;Ie.gesture(kn(),Q(),e)&&(xo=O.transport.beatAt(W()),ei().catch(So))}document.addEventListener("pointerdown",$o,{capture:!0});document.addEventListener("keydown",$o,{capture:!0});document.addEventListener("pointerup",()=>{Ie.pending&&C&&C.state!=="running"&&C.resume()},{capture:!0});function So(t){console.warn("[rhythm] audio couldn't start",t),pe.say("Audio couldn't start. Press Play to try again."),N()}function ti(){ff().catch(So)}async function ff(){if(Ie.swallowClick(kn(),Q())){await ei();return}await Eo()}let pt=null;function He(){if(pt!==null&&(clearTimeout(pt),pt=null),!kn())return;qt(!0,Q())!==et&&N();const t=W(),{startTime:e,stopTime:n}=O.transport,a=[e,n].filter(r=>r!==null&&r>t);if(a.length===0)return;const s=Math.min((Math.min(...a)-t)*1e3+1,2**31-1);pt=setTimeout(()=>{pt=null,He()},s)}const mf=1500;function gf(t){let e,n;const a=new Promise(o=>{e=setTimeout(()=>o(!1),mf)}),s=new Promise(o=>{n=()=>{t.state==="running"&&o(!0)},t.addEventListener("statechange",n)}),r=t.resume().then(()=>t.state==="running",()=>!1);return Promise.race([r,s,a]).finally(()=>{clearTimeout(e),n&&t.removeEventListener("statechange",n)})}let Bn=!1;function bf(){C?C.state!=="running"&&C.resume().catch(()=>{}):Qa.load().catch(()=>{})}async function Eo(){if(Bn){bf();return}Bn=!0;try{if(await ot(),!C)return;if(C.state!=="running"&&!await gf(C)&&!Q()){pe.say("Tap Play to start audio"),N();return}}finally{Bn=!1}if(H&&O.transport.isPlayingAt(W())){se?(se=!1,ve=Math.ceil(O.transport.beatAt(W())/4-1e-9)*4):se=!0,x.playing=Q(),Je="",z(),N(),se&&Mt()?.out?.(ln("petra-rhythm",he));return}if(Q()){O.stop({at:W()});return}H&&Mt()?.claim(ln("petra-rhythm",he)),O.play({at:W()}),!G.isLeader&&[...G.peers.values()].some(t=>t.leader)&&(Za=!0,ni(),N())}const pe=new vh(()=>N()),yf=6e3;ga&&pe.say(ga,yf);function Be(){return Za&&!G.isLeader}function ni(){!Be()||!x.adoptSwing(G.swing)||(z(),N())}function Ao(t,e,n){const a=x.peek(t),s=Ct();if(!a||!X||!s)return!1;const r=O.transport.beatAt(W()),o=K.recall(t,r,{glide:e},n===void 0?{}:{atBeat:n});return Co(o,a,s.shifted),!0}let To="";function Mo(t){return Be()?x.followSwing??t.swing:t.swing}function Lo(t,e){return JSON.stringify([t,Mo(e),e.fx,e.tracks,e.deep])}function Co(t,e,n){if(!X)return;To=Lo(t.id,e);const a={...ko(n,e,e.tracks,t.payload.glide),swing:Mo(e),atBeat:t.atBeat,switchId:t.id,slot:t.slot};X.port.postMessage({type:"state",state:a})}function wf(){const t=K.pending;if(!t||!X)return;const e=x.peek(t.slot);if(!e){K.cancel();return}if(Lo(t.id,e)===To)return;const n=Ct();n&&Co(t,e,n.shifted)}function ai(t,e){const n=x.liveSwing;return x.recall(t,e)?(Be()||(x.followSwing=null),x.liveSwing!==n&&Lt(!0),!0):!1}function vf(t){const e=K.takeHeld(t);e&&(ai(e.slot,e.payload.glide),x.consumeGlide(),z(),N())}function No(t){if(K.cancel(),!ai(t,x.recallGlideSeconds))return;const e=x.recallGlideSeconds>0?x.recallGlideSeconds:0;G.sendSnapshot("recall",t,{atBeat:O.transport.beatAt(W()),...e>0?{glide:{seconds:e}}:{}})}function kf(t){if(K.tap(t,Q()).kind==="queue"){const n=x.recallGlideSeconds>0?x.recallGlideSeconds:0;if(Ao(t,n,ir(O.transport.beatAt(W())))){const a=K.pending?.atBeat;G.sendSnapshot("recall",t,{...a===void 0?{}:{atBeat:a},...n>0?{glide:{seconds:n}}:{}});return}}No(t)}function tt(t,e){const n=Wn[t]??"";if(e==="store")x.store(t),pe.say(Rn(e,n,!0));else if(e==="clear"){const a=x.bank.slots[t]!=null;if(K.queued===t){const s=K.drop();K.cancel();const r=x.bank.active;s&&r!=null&&G.sendSnapshot("recall",r,{atBeat:s.atBeat})}x.clear(t),pe.say(Rn(e,n,a)),a&&ee.show(fe,`Slot ${n} cleared`)}else x.bank.slots[t]==null?pe.say(Rn(e,n,!1,matchMedia("(pointer: coarse)").matches)):kf(t);z(),N()}function fe(){x.undoSurprise()&&(ee.dismiss(),z(),N())}function xf(t){const e=t.target;if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement)return;if((t.metaKey||t.ctrlKey)&&t.key==="z"&&!t.shiftKey){t.preventDefault(),fe();return}if(t.code==="Space"){t.preventDefault(),t.repeat||ti();return}const n=t.code.startsWith("Digit")?Number(t.code.slice(5)):Number.NaN;if(!Number.isInteger(n))return;const a=n===0?9:n-1;a<0||a>=La||(t.preventDefault(),t.shiftKey?tt(a,"store"):t.altKey?tt(a,"clear"):tt(a,"recall"))}const $f=new Tc({min:_e[0],max:_e[1]});function Sa(t){x.doc.bpm=t,O.setTempo({bpm:t}),z(),N()}function Sf(){return Be()?"Leader's swing · Save stores it":"Own swing · join to follow"}function Fo(){const t=Q(),e=hf(),n=Be();return{id:"transport",title:"Transport",summary:t?"playing":"stopped",status:pe.text,controls:[{type:"button",id:"play",label:ar(e),on:e==="stop",...e==="join"?{ariaLabel:nr}:{},onPress:()=>ti(),onSparkle:()=>{x.surprise(),z(),N(),ee.show(fe)}},...H?[]:[{type:"slider",id:"bpm",label:"Tempo",min:_e[0],max:_e[1],step:1,value:O.transport.bpm,onChange:Sa,onTap:a=>{const s=$f.tap(a);s!==null&&s!==O.transport.bpm&&Sa(s)}}],{type:"group",id:"transport-more",title:Hn()?"Swing & sync":"Swing",summary:bn([["Swing",vi(x.liveSwing)],...Hn()?[["Sync",G.isLeader?"leader":"follower"]]:[]]),controls:[{type:"slider",id:"swing",label:n?"Swing (leader)":"Swing",min:.5,max:.75,step:.01,value:x.liveSwing,valueText:vi(x.liveSwing),disabled:n,modulated:n&&x.followSwing!=null,onChange:a=>{Be()||Vt||(x.setSwing(a),Lt(!1),z(),N())},onCommit:()=>{Lt(!0)}},...G.isLeader||H?[]:[{type:"note",id:"swing-note",text:Sf()}],...Hn()?[{type:"readout",id:"role",label:"Sync",value:G.isLeader?"leader":"follower"}]:[]]},{type:"group",id:fa,title:"Presets",summary:bh(x.bank.slots.map(a=>a!=null),x.bank.active??null,Wn),onToggle:a=>{a&&ii()},controls:[{type:"note",id:"preset-now",text:""},{type:"slotRow",id:"slots",morph:x.morphSeconds,morphText:wh(x.morphSeconds),slots:Wn.map((a,s)=>({label:a,filled:x.bank.slots[s]!=null,active:x.bank.active===s,edited:x.edited===s,queued:K.queued===s,pulse:K.queued===s&&t&&cn%4<2})),onMorph:a=>{x.morphSeconds=a,N()},onSlot:(a,s)=>{tt(a,s)}},{type:"note",id:"preset-lib",text:""}]}]}}const Ns="triki.share.by";let Ve=null,Fs=!1;function ii(){const t=Ft.el,e=t.querySelector(`[data-nc-id="${fa}"]`);if(!Ve){if(Fs||e?.dataset.ncOpen!=="true")return;Fs=!0,Hs(async()=>{const{createPetraPresets:n}=await import("./preset-library-mount-CwR-kAeB.js");return{createPetraPresets:n}},__vite__mapDeps([0,1])).then(({createPetraPresets:n})=>{nl(),Ve=n({doc:()=>x.doc,load:(a,s)=>{x.loadGroove(a),z(),N(),ee.show(fe,`${s.name} loaded`)},slots:()=>x.bank.slots,putSlot:(a,s)=>{x.putSlot(a,s),z(),N()},by:()=>{try{return(localStorage.getItem(Ns)??"").slice(0,40)}catch{return""}},setBy:a=>{try{localStorage.setItem(Ns,a.trim().slice(0,40))}catch{}}}),ii()});return}xt(t,"preset-now",Ve.now.el),xt(t,"preset-lib",Ve.lib.el),Ve.max.sync(t.querySelector(`[data-nc-id="${fa}"]`)),Ve.refresh()}function Hn(){return!H&&G.peers.size>0}function ge(){const t=x.doc.tracks.length;return t===0?0:Math.min(x.selectedTrack,t-1)}let Ye=[];function nt(){const t=x.doc.tracks,e=t[ge()]?.id,n=Ye.filter(a=>t.some(s=>s.id===a));return e&&!n.includes(e)&&n.unshift(e),n}function Ef(t,e=!1){const n=x.doc.tracks,a=n[t]?.id;if(!a)return;if(!e){Ye=[],x.selectTrack(t);return}const s=nt();if(s.includes(a)&&s.length>1){if(Ye=s.filter(r=>r!==a),n[ge()]?.id===a){const r=n.findIndex(o=>o.id===Ye[Ye.length-1]);r>=0&&x.selectTrack(r)}}else Ye=s.includes(a)?s:[...s,a],x.selectTrack(t)}const zs={stroke:"M13 8H3M7 4 3 8l4 4"},Ps={stroke:"M3 8h10M9 4l4 4-4 4"},Ds=[{id:"shift",label:"Shift",moves:[{id:"shift-left",text:"Left",icon:zs},{id:"shift-right",text:"Right",icon:Ps},{id:"shift-random",text:"Random",icon:{stroke:"M3 3h10v10H3zM6 6h0M8 8h0M10 10h0"}},{id:"reverse",text:"Reverse",icon:{stroke:"M2 5h11M10 2l3 3-3 3M14 11H3M6 8l-3 3 3 3"}}]},{id:"groove",label:"Groove",moves:[{id:"groove-left",text:"Left",icon:zs},{id:"groove-right",text:"Right",icon:Ps}]},{id:"hits",label:"Hits",moves:[{id:"shuffle",text:"Shuffle",icon:{stroke:"M2 4.5h2.5l6 7H14M2 11.5h2.5l6-7H14M12 2.5l2 2-2 2M12 9.5l2 2-2 2"}},{id:"mutate",text:"Mutate",icon:{fill:"M8 1.5 9.3 6.7 14.5 8 9.3 9.3 8 14.5 6.7 9.3 1.5 8 6.7 6.7Z"}}]}];function Af(){const t=nt(),e=x.doc.tracks.filter(n=>t.includes(n.id));return{type:"moves",id:"moves",label:"Pattern moves",groups:Ds.map(n=>({...n,moves:n.moves.map(a=>({...a,disabled:!ch(a.id,e)}))})),onMove:n=>{const a=Ds.flatMap(l=>l.moves.map(d=>({...d,group:l.label}))).find(l=>l.id===n);if(!a)return;const s=nt(),r=x.doc.tracks.flatMap((l,d)=>s.includes(l.id)?[d]:[]);if(!x.moveTracks(r,a.id))return;z(),N();const o=r.length===1?x.doc.tracks[r[0]??0]?.name??"":`${r.length} tracks`;ee.show(fe,`${a.group} ${a.text.toLowerCase()}: ${o}`)}}}function zo(){const t=x.doc.tracks[ge()];return{id:"pattern",title:"Pattern",lead:!0,summary:t?`${x.doc.tracks.length} tracks · ${t.name}`:`${x.doc.tracks.length} tracks`,sections:[{id:"grid",controls:[{type:"stepGrid",transport:{playing:et==="stop",label:ar(et??"play"),...et==="join"?{ariaLabel:nr}:{},onToggle:()=>ti()},id:"grid",playhead:Q()?cn:-1,selectedRow:t?.id,selectedRows:nt(),onSelectRow:(e,n)=>{Ef(e,n),N()},onDice:e=>{const n=x.doc.tracks[e]?.name??"Lane";x.diceLane(e)&&(z(),N(),ee.show(fe,`New ${n} steps`))},onFill:e=>{vo=e,z(),N()},onClear:()=>{x.clearSteps()&&(z(),N(),ee.show(fe,"Pattern cleared"))},onLength:(e,n)=>{x.edit(a=>{const s=a.tracks[e];s&&(s.length=Math.max(1,Math.min(s.steps.length,Math.round(n))))}),z(),N()},onMute:e=>{x.edit(n=>{const a=n.tracks[e];a&&(a.mute=!a.mute)}),z(),N()},onSolo:e=>{x.edit(n=>{const a=n.tracks[e];a&&(a.solo=!a.solo)}),z(),N()},onToggle:(e,n,a)=>{x.edit(s=>{const r=s.tracks[e]?.steps[n];r&&(a?(r.accent=!r.accent,r.accent&&(r.on=!0)):(r.on=!r.on,r.on||(r.accent=!1)))}),z(),N()},onLongPress:(e,n,a)=>{const s=x.doc.tracks[e],r=s?.steps[n];!s||!r||uu({anchor:a,title:`${s.name} · step ${n+1}`,velocity:r.velocity,probability:r.probability??1,onChange:({velocity:o,probability:l})=>{x.edit(d=>{const c=d.tracks[e]?.steps[n];c&&(c.on=!0,c.velocity=o,c.probability=l>=1?void 0:l)}),z(),N()}})},onSet:(e,n,a,s)=>{x.edit(r=>{const o=r.tracks[e]?.steps[n];o&&(a==="accent"?(o.accent=s,s&&(o.on=!0)):(o.on=s,s||(o.accent=!1)))}),z(),N()},rows:x.doc.tracks.map((e,n)=>({id:e.id,label:e.name,lane:n%4+1,mute:e.mute,solo:e.solo,length:e.length,steps:e.steps.map(a=>({on:a.on,accent:a.accent,velocity:a.velocity,dim:(a.probability??1)<1}))}))},{type:"group",id:"moves-more",title:"Moves",summary:`Shift · Groove · Hits on ${nt().length>1?`${nt().length} lanes`:t?.name??"the lane"}`,controls:[Af()]}]},Mf(),Rf()]}}function Tf(t,e=!1){if(!e&&Q())return;const n=()=>X?.port.postMessage({type:"audition",voice:t,velocity:.8});if(H){C?.state==="running"&&n();return}ot().then(async()=>{C&&C.state!=="running"&&await C.resume(),n()}).catch(()=>{})}function lt(t=!1){const e=x.doc.tracks[ge()];e&&Tf(e.voice,t)}function Mf(){const t=x.doc,e=t.tracks.some(a=>a.source!=="classic"),n=[{type:"note",id:"deep-kit",text:Nt().line}];if(e){const a=t.deep.character,s=(l,d,c)=>{const u=ll[l];return yn({type:"slider",id:`deep-${l}`,label:d,min:u.min,max:u.max,step:u.step,value:a[l],valueText:c(a[l]),onChange:p=>{x.edit(f=>{f.deep.character[l]=p}),z(),N()},onCommit:()=>lt()},l==="lowCut"||l==="highCut"?"freq":"linear")},r=l=>l<=0?"off":ie(l),o=[s("sat","Saturation",r),s("lowCut","Low cut",l=>Bt(l,20)),s("highCut","High cut",l=>Bt(l,2e4))];n.push(s("room","Room",r),s("grit","Grit",r),s("hiss","Hiss",r),{type:"group",id:"deep-kit-more",title:"More",summary:bn([["Saturation",r(a.sat)],["Low cut",Bt(a.lowCut,20)],["High cut",Bt(a.highCut,2e4)]]),controls:o})}return{id:"sound",title:"Sound",panel:!0,subject:Nt().label,controls:n}}const Po=Wa(H,"petra-rhythm.kits",on("petra-rhythm.kits",he));let me=J?[]:(()=>{try{return el(localStorage.getItem(Po))}catch{return[]}})();function dn(t){if(me=t,!J)try{localStorage.setItem(Po,vl(t))}catch{}}function Lf(t){const e=t.deep.name;return e?me.find(n=>Oe(n.name,e))??null:null}function Nt(){const t=x.doc,e=pn(t),n=t.deep.name??null,a=Lf(t),s=e.uniform===null,r=n?a?!al(t,a):!1:il(t),o=s?sl(t,e):hi(e.uniform??"classic"),l=d=>`${d} ${d===1?"drum":"drums"}`;return{label:n??(s?"Mixed":De(e.uniform??"classic")),line:r?`Edited · ${o}`:o,mixed:s,kits:Xe.map(d=>{const c=e.counts[d]??0,u=!n&&e.uniform===d;return{id:d,name:De(d),line:hi(d),...u?{mark:"current"}:s&&c?{mark:"used"}:{},...s&&c?{count:l(c)}:{}}}),saved:me.map(d=>({id:d.name,name:d.name,line:ol(d),...n&&Oe(n,d.name)?{mark:"current"}:{}})),suggest:rl(t)}}function Do(t){const n=Nt().mixed||!!x.doc.deep.name;n?x.undoableEdit(a=>mi(a,t)):x.edit(a=>mi(a,t)),z(),N(),lt(),n&&ee.show(fe,`Every drum now ${De(t)}`)}function Cf(t){const{base:e}=pn(x.doc),n=Xe.indexOf(e),a=Xe[(n+t+Xe.length)%Xe.length];a&&Do(a)}function Nf(t){const e=me.find(a=>Oe(a.name,t));if(!e)return;const n=Nt().mixed||!!x.doc.deep.name;n?x.undoableEdit(a=>fi(a,e)):x.edit(a=>fi(a,e)),z(),N(),lt(),n&&ee.show(fe,`Every drum now ${e.name}`)}function Ff(t){const e=bl(x.doc,t);return e.name?(dn(yl(me,e)),x.edit(n=>{n.deep.name=e.name}),N(),pe.say(`Saved the kit ${e.name}`),!0):!1}function zf(t,e){const n=gl(me,t,e),a=n.find((s,r)=>!Oe(s.name,me[r]?.name??""));return a?(dn(n),x.doc.deep.name&&Oe(x.doc.deep.name,t)&&x.edit(s=>{s.deep.name=a.name}),N(),!0):!1}function Pf(t){const e=me;dn(ml(me,t)),N(),ee.show(()=>{dn(e),ee.dismiss(),N()},`Deleted the kit ${t}`)}function Df(t){const e=ge(),n=x.doc.tracks[e]?.source;n===void 0||n===t||(x.edit(a=>{wl(a,e,t)}),z(),N(),lt())}const If=["tune","decay","snap","sizzle","level"];function Of(t){if(!t)return[];const e=Bs(_s(t.source)??"808",t.deepVersion).voices[t.voice],n=cl(e),a=dl(e),s=c=>a&&c==="noise"?"Tone":Pp[c],r=c=>{const u=ul(e,c),p=t.deep[c];return yn({type:"slider",id:`deep-${c}`,label:s(c),min:u.min,max:u.max,step:u.step,value:p,valueText:us(c,p),onChange:f=>{x.edit(b=>{const g=b.tracks[ge()];g&&(g.deep[c]=f)}),z(),N()},onCommit:()=>lt()},c==="decay"&&!a?"time":"linear")},o=c=>If.includes(c)||a&&c==="noise",l=n.filter(o).map(r),d=n.filter(c=>!o(c));return[{type:"note",id:"deep-env",text:""},...l,{type:"group",id:"deep-more",title:"More",summary:bn(d.map(c=>[s(c),us(c,t.deep[c])])),controls:d.map(r)}]}let qn=null,jn=null,Ht=null;function Io(){const t=st.el;qn??=Gp({pick:Do,step:Cf,pickSaved:Nf,save:Ff,rename:zf,remove:Pf,taken:(r,o)=>me.some(l=>Oe(l.name,r)&&!(o&&Oe(l.name,o)))}),jn??=Up(Df,Xe,De),Ht??=jp(()=>lt(!0));const e=x.doc,n=pn(e);xt(t,"deep-kit",qn.el)&&qn.set(Nt());const a=e.tracks[ge()];a&&xt(t,"drum-source",jn.el)&&jn.set({drum:a.name,source:a.source,base:n.base,baseName:De(n.base)});const s=a?_s(a.source):null;a&&s&&xt(t,"deep-env",Ht.el)?Ht.set(Bs(s,a.deepVersion).voices[a.voice],a.deep,a.name):Ht.el.remove(),uo(t,e.tracks.map(r=>({id:r.id,tag:De(r.source),differs:r.source!==n.base})))}function Rf(){const t=ge(),e=x.doc.tracks[t],n=["tune","decay","tone","snap","drive","level"],{base:a}=pn(x.doc),s=e&&e.source!==a;return{id:"parameters",title:"Params",panel:!0,subject:e?s?`${e.name} · ${De(e.source)}`:e.name:"",lane:t%4+1,controls:[{type:"note",id:"drum-source",text:""},...e&&e.source!=="classic"?Of(e):Hf(n,e)]}}const _f={tune:"freq",decay:"time",tone:"linear",snap:"linear",drive:"linear",level:"linear"},Bf=t=>t.curve==="log"?"freq":/_ms$/.test(t.key)||t.key==="predelay"?"time":"linear";function Hf(t,e){const n=t.map(r=>{const o=vc(e?.voice,r);return yn({type:"slider",id:wc(e?.voice)?`${e?.voice}-${r}`:r,label:o.label,valueText:o.text(e?.params[r]??0),min:o.min,max:o.max,step:o.step,value:e?.params[r]??0,onChange:l=>{x.edit(d=>{const c=d.tracks[ge()];c&&(c.params[r]=l)}),z(),N()}},_f[r])}),a=n.slice(2,5),s=a.map(r=>r.label.toLowerCase());return[...n.slice(0,2),{type:"group",id:"params-more",title:`${s[0]}, ${s[1]} & ${s[2]}`.replace(/^./,r=>r.toUpperCase()),summary:bn(a.map(r=>[r.label,r.valueText??""])),controls:a},...n.slice(5)]}function Ea(t,e){x.edit(n=>{const a=Re(n.fx);e(a[t]),n.fx.hacks=a}),z(),N()}function qf(t,e){const n=Re(x.doc.fx)[t].dials[e.key]??e.default,a=`hack-${t}-${e.key}`,s=r=>Ea(t,o=>{o.dials[e.key]=r});return e.options?{type:"select",id:a,label:e.label,value:String(n),options:e.options.map(r=>({value:String(r.value),label:r.label})),onChange:r=>s(Number(r))}:yn({type:"slider",id:a,label:e.label,min:e.min,max:e.max,step:e.step??1,value:n,valueText:Ur(e,n,x.doc.bpm),onChange:s},Bf(e))}const Gn=(t,e)=>(te(t)?.dials??[]).filter(n=>!n.key.startsWith("mod_")&&n.more===!0===e).map(n=>qf(t,n));function jf(t){return t>=1e3?`${(t/1e3).toFixed(t>=1e4?0:1)} kHz`:`${Math.round(t)} Hz`}let Oo=null;function si(){const t=x.doc.fx,e=Re(t),n=t.mode==="lp"&&t.cutoff>=.999,a=xc(t);Oo={mode:t.mode,...a};const s=o=>{x.edit(o),z(),N()},r=[e.filter&&!n?"Filter":"",e.drive.on?"Drive":"",e.compressor.on?"Comp":""].filter(Boolean);return{id:"filter",title:"Hacks",summary:r.length?r.join(" · "):"All off",controls:[{type:"fx",id:"hack-filter",title:"Filter",depth:1,on:e.filter,onToggle:o=>s(l=>{l.fx.hacks={...Re(l.fx),filter:o}}),controls:[{type:"select",id:"mode",label:"Mode",value:t.mode,options:[{value:"lp",label:"Low pass"},{value:"hp",label:"High pass"},{value:"bp",label:"Band pass"}],onChange:o=>s(l=>{(o==="lp"||o==="hp"||o==="bp")&&(l.fx.mode=o)})},{type:"canvas",id:"curve",label:"Curve",paint:"filter",mode:t.mode,cutoff:t.cutoff,resonance:t.mode==="lp"?0:t.resonance,...a},{type:"slider",id:"cutoff",label:"Cutoff",min:0,max:1,step:.01,value:t.cutoff,valueText:n?"open":jf(a.hz),onChange:o=>s(l=>{l.fx.cutoff=o})},...t.mode==="lp"?[]:[{type:"slider",id:"resonance",label:"Resonance",min:0,max:1,step:.01,value:t.resonance,valueText:ie(t.resonance),onChange:o=>s(l=>{l.fx.resonance=o})}]]},{type:"group",id:"hacks-more",title:"Drive & Compressor",summary:`Drive ${e.drive.on?"on":"off"} · Compressor ${e.compressor.on?"on":"off"}`,controls:[{type:"fx",id:"hack-drive",title:"Drive",depth:2,on:e.drive.on,onToggle:o=>Ea("drive",l=>{l.on=o}),controls:Gn("drive",!1),more:Gn("drive",!0)},{type:"fx",id:"hack-compressor",title:"Compressor",depth:3,on:e.compressor.on,onToggle:o=>Ea("compressor",l=>{l.on=o}),controls:Gn("compressor",!1)},{type:"canvas",id:"meter",label:"Meter",paint:"meter",level:ba}]}]}}await qr();const Ft=Oa(Fo());gn(Ft.el);await Ra();const st=Oa({id:"pattern",title:"Pattern",lead:!0}),rt=th(Oa({id:"filter",title:si().title}),()=>Oo),Ro={build:()=>{st.update(zo()),gn(st.el),Io()}},_o={build:()=>{rt.update(si()),gn(rt.el),ri()}};let un=null;function N(){x.takeSurpriseEdit()&&ee.dismiss(),Ft.update(Fo()),ii(),un?.ready(Ro)&&(st.update(zo()),Io()),un?.ready(_o)&&(rt.update(si()),ri());for(const t of[Ft,st,rt])gn(t.el);cf.follow(),vn?.schedule()}window.addEventListener("pagehide",()=>vn?.flush());const Gf={m:null,open(){const t=ae?.meter("compressor-1")??null;return t?(this.m=t,t.open()):!1},close(){this.m?.close(),this.m=null},read(){return this.m?.read()??null}};function ri(){const t=rt.el.querySelector('[data-nc-id="hack-compressor"]');if(!t)return;const e=$p(t,{source:Gf,color:i("instrument-petra"),threshold:()=>Re(x.doc.fx).compressor.dials.threshold_db??null,on:()=>Re(x.doc.fx).compressor.on});e&&(e.dataset.petraHelp="comp-gauge")}function Aa(t,e,n){K.cancel(),x.replace(t,e),z(),N(),vn?.schedule(),ee.show(fe,n)}zp(lf,{save:()=>{const t=x.doc.name||"rhythm",e=URL.createObjectURL(new Blob([fl(x.doc,x.bank)],{type:"application/json"})),n=document.createElement("a");n.href=e,n.download=`${t}.rhythm`,n.click(),setTimeout(()=>URL.revokeObjectURL(e),0),pe.say(`Saved ${t}.rhythm`)},load:(t,e)=>{const n=hl(t);if(!n.ok||!n.document||!n.bank){pe.say(`Couldn't load ${e}: ${n.errors[0]??"not a Rhythm file"}`);return}Aa(n.document,n.bank,`Loaded ${e}`)},create:()=>Aa(pl(),Rs(),"New pattern"),panic:()=>X?.port.postMessage({type:"panic"})});H?.providePreset?.(tl(()=>({doc:x.doc,bank:x.bank}),(t,e)=>{Aa(t,e,"Loaded the Scene's pattern"),vn?.flush()}));let Is=O.transport.running;O.onChange(()=>{if(se=Zh({sittingOut:se,running:Is},O.transport.running,!!H,()=>Qh("petra-rhythm",he)),Is=O.transport.running,x.playing=Q(),!x.playing&&K.pending){const t=K.drop();t&&No(t.slot)}x.doc.bpm=O.transport.bpm,z(),N(),He()});Mt()?.member?.(ln("petra-rhythm",he),()=>O.transport.running&&!se);Mt()?.onAll(()=>{se&&(se=!1,O.transport.isPlayingAt(W())&&(ve=Math.ceil(O.transport.beatAt(W())/4-1e-9)*4),x.playing=Q(),Je="",z(),N())});const Ta=H?.notesOut?Ih(t=>H.notesOut?.(t)===!0):null;Ta&&setInterval(()=>{const t=O.transport,e=X&&t.running?t.beatAt(W()):null;t.running||(ya=Number.NEGATIVE_INFINITY),Ta.tick({beat:e,tracks:wa(),swing:x.liveSwing,entry:ya})},50);const Bo=Rh(t=>{X?X.port.postMessage(t):ot().then(()=>X?.port.postMessage(t))});H?.notesIn?.(t=>Bo.message(t),{takes:"layer"});let oi=performance.timeOrigin;try{window.parent!==window&&(oi=window.parent.performance.timeOrigin)}catch{}const Ma=H?.notesOut?Bh(t=>H.notesOut?.(t)===!0,{beatAt:t=>O.transport.running?O.transport.beatAt(t):null,latency:()=>{const t=C?.outputLatency||C?.baseLatency||0;return Number.isFinite(t)?t:0},origin:oi}):null,Yt=[],Uf=700;function Kf(t,e){const n=x.doc.tracks.findIndex(r=>r.voice===t);if(n<0)return;const a=document.querySelectorAll("[data-nc-row] > .nc-name")[n];if(!a)return;a.querySelector(".petra-midi-vel")?.remove();const s=document.createElement("span");s.className="petra-midi-vel",s.setAttribute("aria-hidden","true"),s.title=`vel ${Math.round(e*127)}`,s.dataset.velocity=String(Math.round(e*127)),getComputedStyle(a).position==="static"&&(a.style.position="relative"),s.style.position="absolute",s.style.left="0",s.style.bottom="0",s.style.height=i("focus-width"),s.style.width=`${Math.round(Math.max(.05,e)*100)}%`,s.style.background=i("instrument-petra"),s.style.pointerEvents="none",a.append(s),window.setTimeout(()=>s.remove(),Uf)}H?.midiIn?.(t=>{if(!(!t||typeof t!="object"))try{if(t.kind==="release-all"){Ma?.releaseAll(performance.now()+performance.timeOrigin-oi);return}if(t.kind!=="pad")return;const e=go(t.pad);if(!e)return;const n=Math.min(1,Math.max(.01,typeof t.velocity=="number"&&Number.isFinite(t.velocity)?t.velocity:.8)),a=typeof t.at=="number"&&Number.isFinite(t.at)?t.at:performance.now();if(Yt.push({pad:t.pad,voice:e,velocity:n,on:t.on===!0}),Yt.length>64&&Yt.splice(0,32),Ma?.pad(t.pad,t.on===!0,n,a),t.on!==!0)return;X&&C?.state==="running"&&X.port.postMessage({type:"audition",voice:e,velocity:n}),Kf(e,n)}catch{}},{keys:!1,pads:!0});window.__lupa={out:Ta?.stats??null,layer:Bo.stats};window.__NC_MIDI__={read:()=>({hits:Yt.slice(),out:Ma?.stats??null})};G.onSwing(t=>{Be()&&x.adoptSwing(t)&&z(),N()});G.onSnapshot(t=>{if(t.op!=="recall")return;const e=G.peers.get(t.from)?.app;if(!Nc(Va,e,sf)){window.__ignoredRecalls?.push({slot:t.slot,app:e??null});return}window.__recalls?.push({slot:t.slot,atBeat:t.atBeat??null,shared:W()});const n=t.glide?.seconds??0;if(Q()&&Ao(t.slot,n,t.atBeat)){N();return}K.cancel(),ai(t.slot,n),z(),N()});G.onRole(()=>{ni(),N(),He()});G.onPeers(()=>{N(),He()});J&&(window.__rhythm={setKick:t=>{x.edit(e=>{const n=e.tracks.find(a=>a.voice==="kick");n&&n.steps.forEach((a,s)=>{a.on=t.includes(s)})}),z(),N()},store:t=>tt(t,"store"),tap:t=>tt(t,"recall"),tempo:t=>Sa(t),beat:()=>O.transport.beatAt(W()),timeAt:t=>O.transport.timeAt(t),slots:()=>({active:x.bank.active??null,queued:K.queued}),swing:()=>{const t=x.bank.active;return{live:x.liveSwing,doc:x.doc.swing,slot:t==null?null:x.bank.slots[t]?.swing??null,leader:G.isLeader}},setSwing:t=>{x.setSwing(t),Lt(!0),z(),N()},lateEnter:()=>{$a=!0},audio:async()=>(await ot(),await C?.resume(),C?.state??"none")});await Ra();await G.start();document.addEventListener("keydown",xf);ku(Xa,[Ft,st,rt],"adjacent");await Ra();N();un=$u([Ro,_o]);He();un.done.then(()=>{Qa.preload(),H&&ot().then(()=>{tf(Ls),!(!Q()||C?.state!=="running")&&(ef(O.transport.beatAt(W()))||ei())}).catch(Ls),document.documentElement.dataset.rhythmReady=""});setInterval(()=>{const t=Q();if(t!==x.playing&&(x.playing=t,N()),va(),z(),!J||!C)return;const e=mh(C);e&&window.__stamps?.push(e)},250);
