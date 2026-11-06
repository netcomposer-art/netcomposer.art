(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const tt=1e-9;function zs(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class Ba{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return zs(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let o=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+tt&&(o=s.bpm);const r=[{beat:t.beat,time:t.time,bpm:this.clamp(o)}];for(const s of a){if(s.beat<=t.beat+tt)continue;const l=this.clamp(s.bpm);l!==r[r.length-1].bpm&&r.push({beat:s.beat,time:0,bpm:l})}this.segs=r,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+tt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-tt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,o=.25){const r=this.bpmAt(n);if(!(a>0)||!(o>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/o));this.setTempoAt(r,n);for(let l=1;l<=s;l++)this.setTempoAt(r+(t-r)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new Ba({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+tt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+tt)return n[a];return n[0]}}const Ns=Object.freeze({beatsPerBar:4,beatUnit:4}),ht=1e-9;function qs(e){return Math.floor(e+ht)}function Fo(e,t,n=!1){if(!(t>0))return e;const o=Math.ceil(e/t-ht)*t;return n&&o<=e+ht?o+t:o}class Ds{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new Ba({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??Ns}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-ht&&(this.stopTime===null||t<this.stopTime-ht)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-ht?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=qs(t/n),o=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:o,barPhase:o/n}}nextBar(t,n=!1){return Fo(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const zo="nc-clock/snapshot",No=1;function Ps(e,t="local"){return{format:zo,version:No,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function Bs(e,t){const n=Rs(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const xe=e=>typeof e=="number"&&Number.isFinite(e),bi=e=>e===null||xe(e);function Rs(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==zo&&n("format"),(!xe(t.version)||Math.floor(t.version)!==No)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!xe(t.anchor.beat)||!xe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&xe(a.beat)&&xe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!xe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!xe(t.meter.beatUnit))&&n("meter"),(!bi(t.startTime)||!bi(t.stopTime)||!xe(t.stoppedBeat))&&n("transport times"),t}class Is{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new Ds(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){Bs(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return Ps(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const Os="nc-sync/1",js=1,_s="nc-sync",Hs="nc-sync-leader",Us=0,qo=.5,Do=.75;function Ws(e){return typeof e=="number"&&Number.isFinite(e)&&e>=qo&&e<=Do?e:null}const Wn=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),At=e=>typeof e=="number"&&Number.isFinite(e),Jt=e=>typeof e=="string"&&e.length>0;function Gs(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==js||!Jt(t.type)||!Jt(t.from)||!At(t.term)||!At(t.seq)||!At(t.sentAt))return null;switch(t.type){case"hello":return Jt(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return At(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&At(t.slot)?t:null;case"ping":case"pong":return Jt(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Vs(e,t,n,a,o){return{proto:Os,from:t,term:n,seq:a,sentAt:o,...e}}function ne(){return(performance.timeOrigin+performance.now())/1e3}const Gn=.003,Ys=3,Vn=.002+1e-6,Ks=.01,yi=500;class wi{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.held=null,this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Ks:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;holdWhile;held=null;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3,this.holdWhile=n.hold??null}heldBase(){return!this.holdWhile||!this.holdWhile()?(this.held=null,null):(this.held===null&&this.settled&&this.offsets.length&&(this.held=this.median()),this.held)}get holding(){return this.heldBase()!==null}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=Gn&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const o=n-(this.timeOrigin+a)/1e3,r=this.median(),s=o-r,l=Math.abs(o-this.preStepBase),c=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!c&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&c===this.pendingBack&&(c||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(o,r,c))):(this.pendingStep=s,this.pendingBack=c,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const o=this.heldBase()!==null,r=this.ctx.currentTime,s=r<=this.revertUntil;let l;if(a&&s){const c=this.offsets,u=this.preStep;c.length=0;for(let d=0;d<u.length;d++)c.push(u[d]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,l={stepSeconds:this.preStepBase-n,confirmedAt:r,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!s){const d=this.offsets,h=this.preStep;h.length=0;for(let m=0;m<d.length;m++)h.push(d[m]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?r+this.stepRevert:-1/0}const c=this.offsets,u=t-n;for(let d=0;d<c.length;d++)c[d]+=u;this.stepCount++,l={stepSeconds:t-n,confirmedAt:r,reanchors:this.stepCount,revert:!1}}if(!o)for(const c of[...this.stepListeners])c(l);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let r=0;r<a;r++){const s=t[r];let l=r-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const o=a>>1;return a%2?n[o]:(n[o-1]+n[o])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.heldBase(),this.readLatency(!1);let n=null,a=!1;const o=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(o&&Number.isFinite(o.contextTime)&&Number.isFinite(o.performanceTime)&&o.contextTime>=Gn&&o.performanceTime>0)if(this.waitSince=null,o.contextTime===this.lastStampC&&o.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<yi)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=o.contextTime,this.lastStampP=o.performanceTime,this.stampSince=this.perfNow(),n=o.contextTime-(this.timeOrigin+o.performanceTime)/1e3,a=!0;else if(!o||!(o.contextTime>=Gn)&&!(o.contextTime>0&&!(o.performanceTime>0))){if(o){const r=this.perfNow();if(this.waitSince===null&&(this.waitSince=r),r-this.waitSince<yi)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Ys,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let o=-1,r=0;for(let l=0;l<n;l++){let c=0;for(let u=0;u<n;u++)Math.abs(t[u]-t[l])<=Vn&&c++;c>r&&(o=l,r=c)}if(r<a)return;const s=t[o];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>Vn&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-this.estimate())<=Vn}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const o=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(o,2)};setTimeout(o,2)})}get offset(){return this.offsets.length||this.sample(),(this.heldBase()??this.estimate())+this.userOffsetMs/1e3}estimate(){return this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow()}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,o=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(o)&&o>0?o:null}}class Qs{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...Wn,...t.capabilities},this.channelOption=t.channel??_s,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const o=this.o.now(),r=()=>{n===this.startWaits&&t(o)};return a.then(r,r),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const o=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(o),0)}else{const o=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?o:Math.max(t+this.o.gatedStartLeadSeconds,o),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[o,r]=this.tempoRange();t=Math.min(r,Math.max(o,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const c=s.beatAt(l+this.o.minLeadSeconds),u=Math.max(n??Fo(c,1),c);a&&a>0?(s.tempo.rampTempo(t,u,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,u),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Do,Math.max(qo,t)):Us;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Ws(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Gs(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const o=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...Wn,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),o||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const r of this.peers.values())r.leader=r.id===n.from;const o=this.peers.get(n.from);o?o.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...Wn},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(o=>{this.leader&&this.decideStart(o)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const o of[...this.snapshotListeners])o(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const o of[...this.messageListeners])o(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const r=new AbortController;this.lockAbort=r,this.locks.request(Hs,{signal:r.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===r&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(r,s,l)=>[r?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),o=this.caps.canLead?this.id:null;for(const r of this.peers.values()){if(!r.capabilities.canLead)continue;const s=n(r.capabilities.prefersLeader,r.joinedAt,r.id);(o===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,o=r.id)}this.setLeader(o===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],o=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==o[0]?a[0]<o[0]:a[1]!==o[1]?a[1]<o[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const o=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>o&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Vs(t,this.id,this.term,++this.seq,this.o.now()))}}const Xs="modulepreload",Js=function(e){return"/lucy/"+e},vi={},Zs=function(t,n,a){let o=Promise.resolve();if(n&&n.length>0){let s=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");o=s(n.map(u=>{if(u=Js(u),u in vi)return;vi[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${h}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":Xs,d||(m.as="script"),m.crossOrigin="",m.href=u,c&&m.setAttribute("nonce",c),document.head.appendChild(m),d)return new Promise((g,w)=>{m.addEventListener("load",g),m.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${u}`)))})}))}function r(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return o.then(s=>{for(const l of s||[])l.status==="rejected"&&r(l.reason);return t().catch(r)})};var el=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],ca=[.25,.5,.75,1,1.5,2],tl=4.9,H={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},Ue={fmt:"wet"},ge={fmt:"pct"},nt={fmt:"db"},Zt={fmt:"signedPct"},Yn={fmt:"num",suffix:" ms"},O={div:100};function L(e,t,n,a,o,r,s,l){var c={key:e,label:t,min:n,max:a,default:o,step:1,k:r,unit:null,format:s};if(l)for(var u in l)c[u]=l[u];return c}function en(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Nt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:H.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[L("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:H.hpHz,astrid:!0,zero:"off"}),L("q","Resonance",0,100,0,2,{fmt:"q",law:H.hpQ},{dsp:{law:H.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[L("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:H.bpHz,astrid:!0},{dsp:{law:H.bpHz}}),L("q","Q",0,100,0,2,{fmt:"q",law:H.bpQ},{dsp:{law:H.bpQ}}),L("mix","Mix",0,100,100,3,Ue,{dsp:O,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[L("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:en(el),overriddenBy:"beats_free",tempoSynced:!0}),L("feedback","Feedback",0,90,35,2,ge,{dsp:O,unit:"%"}),L("mix","Wet/dry",0,100,0,3,Ue,{dsp:O,unit:"%",astridKey:"wet"}),L("tone","Tone",0,100,100,4,{fmt:"hz",law:H.delayTone,offAt:100},{dsp:{div:99},more:!0}),L("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),L("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:en([[0,"Insert"],[1,"Send"]]),more:!0}),L("send","Send",0,100,100,7,ge,{dsp:O,unit:"%",more:!0}),L("mod_send","Accent → send",-100,100,0,8,Zt,{dsp:O,unit:"%",more:!0}),L("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[L("predelay","Pre-delay",0,200,0,1,Yn,{dsp:{div:1e3},unit:"ms"}),L("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:O,unit:"%"}),L("decay","Decay",0,100,50,3,ge,{dsp:O,unit:"%"}),L("damping","Damping",0,100,0,4,ge,{dsp:O,unit:"%"}),L("mix","Mix",0,100,0,5,Ue,{dsp:O,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[L("rate","Rate",0,100,26,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),L("depth","Depth",0,100,70,2,ge,{dsp:O,unit:"%"}),L("feedback","Feedback",-90,90,50,3,Zt,{dsp:O,unit:"%"}),L("mix","Mix",0,100,50,4,Ue,{dsp:O,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[L("rate","Rate",0,100,52,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),L("depth","Depth",0,100,50,2,ge,{dsp:O,unit:"%"}),L("spread","Spread",0,100,70,3,ge,{dsp:O,unit:"%"}),L("mix","Mix",0,100,40,4,Ue,{dsp:O,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[L("rate","Rate",0,100,39,1,{fmt:"rate",law:H.rate},{dsp:{law:H.rate}}),L("depth","Depth",0,100,70,2,ge,{dsp:O,unit:"%"}),L("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:en([[4,"4"],[6,"6"],[8,"8"]])}),L("feedback","Feedback",0,90,30,4,ge,{dsp:O,unit:"%"}),L("mix","Mix",0,100,50,5,Ue,{dsp:O,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[L("low_db","Low",-18,18,0,1,nt,{unit:"dB"}),L("mid_db","Mid",-18,18,0,2,nt,{unit:"dB"}),L("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:H.midHz,astrid:!0},{dsp:{law:H.midHz}}),L("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:H.eqQ},{dsp:{law:H.eqQ}}),L("high_db","High",-18,18,0,4,nt,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[L("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),L("output_db","Output",-12,12,0,2,nt,{unit:"dB"}),L("mix","Mix",0,100,100,3,Ue,{dsp:O,unit:"%"}),L("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:en([[0,"Smooth"],[1,"Acid"]]),more:!0}),L("tone","Tone",0,100,100,5,{fmt:"hz",law:H.driveTone,offAt:100},{dsp:{div:99},more:!0}),L("mod_drive","Accent → drive",-100,100,0,6,Zt,{dsp:O,unit:"%",more:!0}),L("mod_tone","Accent → tone",-100,100,0,7,Zt,{dsp:O,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[L("threshold_db","Threshold",-60,0,0,1,nt,{unit:"dB"}),L("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:H.ratio},{dsp:{law:H.ratio}}),L("attack_ms","Attack",1,100,10,3,Yn,{unit:"ms"}),L("release_ms","Release",10,1e3,150,4,Yn,{unit:"ms"}),L("makeup_db","Makeup",0,24,0,5,nt,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[L("width","Width",0,200,100,1,ge,{dsp:O,unit:"%"}),L("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:O})]}],nl=Nt.map(function(e){return e.type});Nt.filter(function(e){return!e.hidden}).map(function(e){return e.type});var al={reverb:"plate"};function Ra(e){var t=al[e]||e;return nl.indexOf(t)>=0?t:null}function he(e){for(var t=Ra(e),n=0;n<Nt.length;n++)if(Nt[n].type===t)return Nt[n];return null}function il(e,t){var n=he(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function dt(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function hn(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=dt(n.law,t);return a===null?0:a}function xi(e,t){return Math.min(tl,e*60/(t>0?t:120))}var ki=function(e){return e>0?"+":e<0?"−":""};function ol(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Po(e,t,n){var a=e.format,o;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:ki(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return ki(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(o=dt(a.law,t),o===null?a.zero||"open":a.astrid?ol(o):o+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+dt(a.law,t).toFixed(1);case"ratio":return dt(a.law,t).toFixed(1)+":1";case"rate":return o=dt(a.law,t),(o<1?o.toFixed(2):o<10?o.toFixed(1):o.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var r=0;r<e.options.length;r++)if(e.options[r].value===t)return e.options[r].label;return String(t);case"tempoMs":return Math.round(xi(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(xi(t,n)*1e3)+" ms"}return String(t)}var rl=1,Ln=["drive","delay","plate"];function sl(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,o){return Po(e,a,o)},t}var qt=Ln.map(function(e){var t=he(e),n={type:e,label:t.label,dials:t.dials.map(sl)};return t.tempoSynced&&(n.tempoSynced=!0),n}),ll={reverb:"plate"};function mn(e){var t=ll[e]||e;return Ln.indexOf(t)>=0?t:null}function Cn(e){for(var t=mn(e),n=0;n<qt.length;n++)if(qt[n].type===t)return qt[n];return null}function Bo(e,t){var n=Cn(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function wt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function Be(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,o=1;o<e.options.length;o++)Math.abs(e.options[o].value-t)<Math.abs(a-t)&&(a=e.options[o].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var r=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*r)/r))+0}function cl(){return{v:rl,chain:qt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function dl(e){return ca.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},ca[0])}function Kn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ul(e){for(var t=Array.isArray(e)?e:Kn(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=cl(),o={},r=[],s=0;s<t.length;s++){var l=t[s];if(Kn(l)){var c=mn(l.type);if(!c){typeof l.type=="string"&&r.push(l.type);continue}if(o[c]){r.push(c);continue}o[c]=!0;var u=a.chain[Ln.indexOf(c)],d=Kn(l.dials)?l.dials:{};c==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),u.bypass=n?l.bypass===!0:l.bypass!==!1,Cn(c).dials.forEach(function(h){u.dials[h.key]=Be(h,d[h.key])}),pl(c,u.dials,d)}}return{state:a,dropped:r}}function pl(e,t,n){for(var a=Cn(e),o=0;o<a.dials.length;o++){var r=a.dials[o];r.stepWhen&&(t[r.key]=Be(r,n&&typeof n[r.key]=="number"?n[r.key]:t[r.key],wt(r,t)))}}function da(e){return ul(e).state}function hl(e){return JSON.parse(JSON.stringify(e))}var ml=24,ua={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function pa(e,t,n){if(t==="bypass")return n?0:1;var a=Bo(e,t)||fl(e,t);return a?hn(a,n):0}function fl(e,t){var n=he(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var gl={};qt.forEach(function(e){e.dials.forEach(function(t){gl[e.type+"."+t.key]=t.format})});function Qn(e,t){var n=new Float64Array(ml),a=da(e);return a.chain.forEach(function(o){var r=ua[o.type];n[r.bypass]=o.bypass?0:1,Object.keys(o.dials).forEach(function(s){n[r[s]]=pa(o.type,s,o.dials[s])})}),n}var bl=2,fn=3,yl=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function St(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ia(e,t){var n=he(e);if(!n)return null;var a={};(t||[]).forEach(function(s){s&&s.id&&(a[s.id]=!0)});for(var o=1;a[n.type+"-"+o];)o++;var r={};return n.dials.forEach(function(s){r[s.key]=s.default}),{id:n.type+"-"+o,type:n.type,bypass:!1,dials:r}}function wl(e){var t=he(e.type),n=/-(\d+)$/.exec(e.id||"");return(t?t.label:e.type)+(n&&+n[1]>1?" "+n[1]:"")}function vl(e,t,n){var a=e.length-1,o=Math.max(0,Math.min(a,n));if(t<0||t>a||t===o)return e;var r=e.slice(),s=r.splice(t,1)[0];return r.splice(o,0,s),r}function xl(e){return typeof e=="number"&&isFinite(e)?dl(e):e}function $i(e,t,n){var a={};return e.dials.forEach(function(o){var r=t[o.key];r===void 0&&o.astridKey&&(r=t[o.astridKey]),n&&e.type==="delay"&&o.key==="delay_beats"&&(r=xl(r)),a[o.key]=Be(o,r)}),e.dials.forEach(function(o){o.stepWhen&&(a[o.key]=Be(o,typeof t[o.key]=="number"?t[o.key]:a[o.key],wt(o,a)))}),a}function kl(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,o=1/0,r=e.min;r<=e.max;r++){var s=dt(n.law,r),l=s===null?1/0:Math.abs(s-t);l<o&&(o=l,a=r)}return a}}var $l={rate:"rate_hz"};function El(e,t,n,a){var o={};return e.dials.forEach(function(r){if(!r.more){var s=r.astridKey||$l[r.key]||r.key;o[r.key]=kl(r,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),o}function Ml(e,t){var n=t>0?Math.floor(t):fn,a=[],o=[],r=[],s=!1,l=!1;Array.isArray(e)?(r=e,l=!0):St(e)&&Array.isArray(e.chain)&&(r=e.chain,s=e.v===1,l=e.schema===2);for(var c=[],u=0;u<r.length;u++){var d=r[u];if(St(d)&&!(d.type==="limiter"||d.fixed===!0)){var h=Ra(d.type),m=h&&he(h);if(!m||s&&["drive","delay","plate"].indexOf(h)<0){typeof d.type=="string"&&a.push(d.type);continue}if(c.length>=n){a.push(d.id||h);continue}var g;St(d.params)&&!St(d.dials)?g=$i(m,El(m,d.params,o,d.id||h),l):g=$i(m,St(d.dials)?d.dials:{},l);var w=Ia(h,c),b=typeof d.id=="string"&&yl.test(d.id)&&!c.some(function(f){return f.id===d.id})?d.id:w.id,p=s?d.bypass!==!1:d.bypass===!0;c.push({id:s?w.id:b,type:h,bypass:p,dials:g})}}return{state:{v:bl,chain:c},dropped:a,notes:o}}function Dt(e,t){return Ml(e,t).state}function at(e){var t=he(e.type),n=[[0,e.bypass?0:1]];return t.dials.forEach(function(a){n.push([a.k,hn(a,e.dials[a.key])])}),n}function Al(e){var t=Dt(e,8),n=[],a=t.chain.map(function(o,r){var s=he(o.type),l={};return r>=fn&&n.push(o.id+": ASTRID keeps three hacks"),s.dials.forEach(function(c){var u=o.dials[c.key];if(c.more){u!==c.default&&n.push(o.id+"."+c.key);return}c.key==="delay_beats"&&ca.indexOf(u)<0&&n.push(o.id+".delay_beats"),l[c.astridKey||c.key]=u}),{id:o.id,type:o.type,bypass:o.bypass,dials:l}});return{hacks:a,lossy:n}}var Sl=150,Tl=6e3,Ll=18,Ro=6.283185307179586;function Fn(e,t,n){return e<t?t:e>n?n:e}function Cl(e,t,n,a,o){var r=Math.pow(10,n/40),s=Ro*t/o,l=Math.cos(s),c=Math.sin(s),u,d,h,m,g,w,b,p;if(e===0||e===2){b=c/2*Math.SQRT2,p=2*Math.sqrt(r)*b;var f=e===0?1:-1;u=r*(r+1-f*(r-1)*l+p),d=f*2*r*(r-1-f*(r+1)*l),h=r*(r+1-f*(r-1)*l-p),m=r+1+f*(r-1)*l+p,g=-f*2*(r-1+f*(r+1)*l),w=r+1+f*(r-1)*l-p}else b=c/(2*a),u=1+b*r,d=-2*l,h=1-b*r,m=1+b/r,g=-2*l,w=1-b/r;return[u/m,d/m,h/m,g/m,w/m]}function Fl(e,t,n){var a=Ro*t/n,o=Math.cos(a),r=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),c=e[0]+e[1]*o+e[2]*s,u=-(e[1]*r+e[2]*l),d=1+e[3]*o+e[4]*s,h=-(e[3]*r+e[4]*l);return 10*Math.log10((c*c+u*u)/(d*d+h*h))}var Ei={};function Re(e){return Ei[e]||(Ei[e]=il("eq",e))}function lt(e,t){var n=Re(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Fn(a,n.min,n.max)}function Io(e){return[{id:"low",kind:0,hz:Sl,db:lt(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:hn(Re("mid_hz"),lt(e,"mid_hz")),db:lt(e,"mid_db"),q:hn(Re("mid_q"),lt(e,"mid_q"))},{id:"high",kind:2,hz:Tl,db:lt(e,"high_db"),q:Math.SQRT1_2}]}function zl(e,t,n){for(var a=Io(e),o=n.length,r=new Float64Array(o),s=[],l=t/2,c=0;c<a.length;c++){var u=a[c],d=new Float64Array(o);if(u.db!==0)for(var h=Cl(u.kind,u.hz,u.db,u.q,t),m=0;m<o;m++){var g=n[m]<l?n[m]:l*.9999;d[m]=Fl(h,g,t),r[m]+=d[m]}s.push(d)}return{total:r,bands:s}}function Nl(e){var t=Re("mid_hz").dsp.law;return Fn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function ql(e){var t=Re("mid_q").dsp.law;return Fn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var gn={low:"low_db",mid:"mid_db",high:"high_db"},Dl={low:"Low",mid:"Mid",high:"High"};function Pl(e,t,n){var a=[];function o(r,s){var l=Re(r),c=l.step||1;s=Fn(Math.round(s/c)*c,l.min,l.max),s===0&&(s=0),s!==lt(e,r)&&a.push([r,s])}return typeof n.db=="number"&&gn[t]&&o(gn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&o("mid_hz",Nl(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&o("mid_q",ql(n.q)),a}function Bl(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:gn[e]?[gn[e]]:[];return t.map(function(n){return[n,Re(n).default]})}var tn=typeof WeakMap=="function"?new WeakMap:null;function Rl(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=tn&&tn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},tn&&tn.set(e,n)),n.handle}function Il(e,t,n){var a=n||{},o={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(d){var h=e&&typeof e.getParam=="function"?e.getParam(t,d):void 0;o[d]=typeof h=="number"?h:Re(d).default});var r=e&&e.output&&e.output.context,s=a.sampleRate||r&&r.sampleRate||48e3,l=a.help||{},c=Io(o).map(function(d){var h=(d.db>0?"+":d.db<0?"−":"")+Math.abs(d.db)+" dB",m=d.hz>=1e3?(d.hz/1e3).toFixed(d.hz>=1e4?0:1)+" kHz":Math.round(d.hz)+" Hz";return{id:d.id,label:Dl[d.id],kind:d.kind===0?"lowshelf":d.kind===1?"peak":"highshelf",hz:d.hz,db:d.db,q:d.q,moveHz:d.id==="mid",moveQ:d.id==="mid",minHz:d.id==="mid"?200:d.hz,maxHz:d.id==="mid"?5e3:d.hz,minQ:.3,maxQ:6,valueText:d.id==="mid"?h+" at "+m+", Q "+d.q.toFixed(1):h+(d.id==="low"?", shelf below ":", shelf above ")+m,help:l[d.id]}}),u=function(d){for(var h=0;h<d.length;h++)a.set(d[h][0],d[h][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Ll,sampleRate:s,on:a.on!==!1,bands:c,help:l.graph,response:function(d){return zl(o,s,d)},spectrum:a.spectrum===!1?void 0:Rl(e)||void 0,onBand:function(d,h){u(Pl(o,d,h))},onReset:function(d){u(Bl(d).filter(function(h){return h[1]!==o[h[0]]}))}}}var Ol="nc-fx@1",jl=600,_l=256,Hl=8,Tt=typeof WeakMap=="function"?new WeakMap:null;function Ul(e,t){var n=Tt&&Tt.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Zs(async()=>{const{default:r}=await import("./worklet-source-BibsVBZk.js");return{default:r}},[])).default,o=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(o)}finally{URL.revokeObjectURL(o)}})(),Tt&&(Tt.set(e,n),n.catch(function(){Tt.delete(e)})),n)}function it(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Oo(e,t,n,a){var o=Math.min(400,Math.max(20,it(t.bpm,120))),r=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",c=it(t.preGain,1),u=Math.max(0,it(t.crossfade,.012)),d=it(t.maxDelaySeconds,void 0),h=e.createGain(),m=e.createGain(),g=e.createGain(),w=e.createGain(),b=null;t.modInput===!0&&(b=e.createGain(),b.channelCount=1,b.channelCountMode="explicit",b.channelInterpretation="discrete"),w.gain.value=0,h.connect(g),g.connect(m),w.connect(m);var p={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:o,mUsers:0,lv:null,lvAt:0},f=n(o);p.post=function($){p.node?p.node.port.postMessage($):p.disposed||(r.length>=_l&&(r=a().concat([{t:"tempo",bpm:p.bpm,when:0}]),p.mUsers>0&&r.push({t:"meter",on:!0})),r.push($))};function y($){var k=r.map(function(A){var F=Object.assign({},A);return F.when>$||(F.when=0,F.t!=="clear"&&(F.snap=!0)),F});return r=[],k}p.emit=function($){for(var k=0;k<p.listeners.length;k++)try{p.listeners[k]($)}catch(A){typeof console<"u"&&console.error(A)}},p.whenOf=function($){return typeof $=="number"&&isFinite($)&&$>0?$:0};var v=!1;p.tooFar=function($){return typeof $=="number"&&$>e.currentTime+jl?(!v&&typeof console<"u"&&(v=!0,console.warn("nc-fx: ignoring a time "+Math.round($-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var E=Ul(e,t.moduleUrl).then(function(){if(!p.disposed){var $=Object.assign({bpm:o,bypassMode:l,limiter:s,preGain:c,maxDelaySeconds:d},f);$.pending=y(e.currentTime),p.node=new AudioWorkletNode(e,Ol,{numberOfInputs:b?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:$}),p.node.port.onmessage=function(A){var F=A.data;F&&F.t==="lv"&&p.mUsers>0&&(p.lv=F.d,p.lvAt=Mi())},h.connect(p.node),b&&b.connect(p.node,0,1),p.node.connect(w);var k=e.currentTime;k<=0||u===0?(g.gain.value=0,w.gain.value=1):(g.gain.setValueAtTime(1,k),g.gain.linearRampToValueAtTime(0,k+u),w.gain.setValueAtTime(0,k),w.gain.linearRampToValueAtTime(1,k+u)),p.status="ready"}},function($){p.status="unavailable",r=[],p.error=$});p.meterOpen=function(){return p.disposed||p.status==="unavailable"?!1:(p.mUsers++===0&&p.post({t:"meter",on:!0}),!0)},p.meterClose=function(){p.mUsers!==0&&--p.mUsers===0&&(p.lv=null,p.disposed||p.post({t:"meter",on:!1}))},p.levels=function(){return p.lv&&Mi()-p.lvAt<Wl?p.lv:null};var M={};return p.meter=function($,k){if(M[$])return M[$];var A=0,F={in:0,out:0},I={open:function(){return p.meterOpen()?(A++,!0):!1},close:function(){A!==0&&(A--,p.meterClose())},read:function(){var K=A>0?p.levels():null;return F.in=0,F.out=0,K&&k(K,F),F}};return M[$]=I,I},p.core={input:h,output:m,modInput:b,ready:E,get status(){return p.status},get error(){return p.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function($,k){var A=it($,NaN);!(A>0)||p.disposed||p.tooFar(k)||(p.bpm=Math.min(400,Math.max(20,A)),p.post({t:"tempo",bpm:p.bpm,when:p.whenOf(k)}),p.emit({effect:null,key:"tempo",value:p.bpm}))},getTempo:function(){return p.bpm},clear:function($){var k=$&&typeof $=="object"?$:{at:$};if(!(p.disposed||p.tooFar(k.at))){var A=it(k.fadeMs,0);p.post({t:"clear",when:p.whenOf(k.at),fadeMs:A>0?Math.min(1e3,A):0})}},onChange:function($){return p.listeners.push($),function(){var k=p.listeners.indexOf($);k>=0&&p.listeners.splice(k,1)}},dispose:function(){if(!p.disposed){if(p.disposed=!0,p.status="disposed",r=[],p.listeners.length=0,p.node){p.node.port.postMessage({t:"dispose"}),p.node.port.close();try{p.node.disconnect()}catch{}}[h,g,w,m,b].forEach(function($){try{$&&$.disconnect()}catch{}})}}},p}var Wl=250;function Mi(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function jo(e,t){t.in=e[0],t.out=e[1]}function Gl(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function Vl(e,t){var n=t||{};if(n.slots)return Yl(e,n);var a=da(n.state),o=Array.from(Qn(a)),r=Oo(e,n,function(){return{program:o}},function(){return[{t:"load",program:Array.from(Qn(a)),when:0}]}),s=r.core;function l(c){return a.chain[Ln.indexOf(c)]}return s.setParam=function(c,u,d,h){var m=mn(c);if(!(!m||r.disposed||r.tooFar(h))){var g=l(m),w;if(u==="bypass")w=!!d;else{var b=Bo(m,u);if(!b)return;w=Be(b,d,wt(b,g.dials))}return u==="bypass"?g.bypass=w:g.dials[u]=w,r.post({t:"p",i:ua[m][u],v:pa(m,u,w),when:r.whenOf(h)}),r.emit({effect:m,key:u,value:w}),Cn(m).dials.forEach(function(p){if(!(!p.stepWhen||!p.stepWhen.some(function(v){return v.key===u}))){var f=g.dials[p.key],y=Be(p,f,wt(p,g.dials));y!==f&&(g.dials[p.key]=y,r.post({t:"p",i:ua[m][p.key],v:pa(m,p.key,y),when:r.whenOf(h)}),r.emit({effect:m,key:p.key,value:y}))}}),w}},s.meter=function(){return r.meter("",jo)},s.getParam=function(c,u){var d=mn(c);if(d){var h=l(d);return u==="bypass"?h.bypass:h.dials[u]}},s.getState=function(){return hl(a)},s.setState=function(c,u){r.disposed||r.tooFar(u&&u.at)||(a=da(c),r.post({t:"load",program:Array.from(Qn(a)),when:r.whenOf(u&&u.at)}),r.emit({effect:null,key:null,value:null}))},s}function Yl(e,t){var n=t.slots===!0?fn:Math.max(1,Math.min(Hl,Math.floor(+t.slots)||fn)),a=Dt(t.state,n),o=1,r={};function s(p){return r[p.id]||(r[p.id]=o++),r[p.id]}function l(p){return p.map(function(f){return{uid:s(f),type:f.type,program:at(f)}})}var c=l(a.chain),u=a.chain.map(function(p){return r[p.id]}),d=Oo(e,t,function(){return{slots:n,chain:c,order:u}},function(){return[{t:"sync",chain:l(a.chain),order:a.chain.map(function(p){return r[p.id]}),when:0}]}),h=d.core;function m(p){var f;for(f=0;f<a.chain.length;f++)if(a.chain[f].id===p)return a.chain[f];var y=Ra(p);if(y){for(f=0;f<a.chain.length;f++)if(a.chain[f].type===y)return a.chain[f]}return null}function g(p,f){var y=s(p);d.post({t:"add",uid:y,type:p.type,when:f}),at(p).forEach(function(v){d.post({t:"ps",uid:y,k:v[0],v:v[1],when:f,snap:!0})})}function w(p){d.post({t:"order",uids:a.chain.map(function(f){return r[f.id]}),when:p})}function b(p,f){var y={};a.chain.forEach(function(M){y[M.id]=M});var v=a.chain.map(function(M){return r[M.id]}).join();p.chain.forEach(function(M){var $=y[M.id];if(!$||$.type!==M.type){delete r[M.id],g(M,f);return}var k={};at($).forEach(function(A){k[A[0]]=A[1]}),at(M).forEach(function(A){k[A[0]]!==A[1]&&d.post({t:"ps",uid:r[M.id],k:A[0],v:A[1],when:f})})});var E={};p.chain.forEach(function(M){E[M.id]=!0}),Object.keys(r).forEach(function(M){E[M]||delete r[M]}),a=p,a.chain.map(function(M){return r[M.id]}).join()!==v&&w(f)}return h.slots=n,h.meter=function(p){return p==null||p===""?d.meter("",jo):d.meter("#"+p,function(f,y){var v=m(p),E=v?r[v.id]:0,M=f[2];if(E){for(var $=3,k=0;k<M;k++,$+=3)if(f[$]===E){y.in=f[$+1],y.out=f[$+2];return}}})},h.setParam=function(p,f,y,v){var E=m(p);if(!(!E||d.disposed||d.tooFar(v))){var M=he(E.type),$,k=null;if(f==="bypass")$=!!y;else{for(var A=0;A<M.dials.length;A++)M.dials[A].key===f&&(k=M.dials[A]);if(!k)return;$=Be(k,y,wt(k,E.dials))}var F={},I={};at(E).forEach(function(q){F[q[0]]=q[1]}),M.dials.forEach(function(q){q.stepWhen&&(I[q.key]=E.dials[q.key])}),f==="bypass"?E.bypass=$:E.dials[f]=$,M.dials.forEach(function(q){q.stepWhen&&(E.dials[q.key]=Be(q,E.dials[q.key],wt(q,E.dials)))});var K=d.whenOf(v),fe=r[E.id];return at(E).forEach(function(q){(F[q[0]]!==q[1]||k&&q[0]===k.k)&&d.post({t:"ps",uid:fe,k:q[0],v:q[1],when:K})}),d.emit({effect:E.id,key:f,value:$}),Object.keys(I).forEach(function(q){q!==f&&E.dials[q]!==I[q]&&d.emit({effect:E.id,key:q,value:E.dials[q]})}),$}},h.getParam=function(p,f){var y=m(p);if(y)return f==="bypass"?y.bypass:y.dials[f]},h.getState=function(){return JSON.parse(JSON.stringify(a))},h.setState=function(p,f){d.disposed||d.tooFar(f&&f.at)||(b(Dt(p,n),d.whenOf(f&&f.at)),d.emit({effect:null,key:null,value:null}))},h.addEffect=function(p,f){var y=f||{},v=Ia(p,a.chain);if(!(!v||a.chain.length>=n||d.disposed||d.tooFar(y.at))){if(y.dials){var E=Dt({v:2,chain:[{id:v.id,type:v.type,dials:y.dials}]},1).chain[0];v.dials=E.dials}y.bypass===!0&&(v.bypass=!0);var M=a.chain.slice(),$=typeof y.index=="number"?Math.max(0,Math.min(M.length,y.index)):M.length;return M.splice($,0,v),b({v:2,chain:M},d.whenOf(y.at)),d.emit({effect:v.id,key:"chain",value:"add"}),v.id}},h.removeEffect=function(p,f){var y=m(p),v=f&&f.at;return!y||d.disposed||d.tooFar(v)?!1:(b({v:2,chain:a.chain.filter(function(E){return E!==y})},d.whenOf(v)),d.emit({effect:y.id,key:"chain",value:"remove"}),!0)},h.moveEffect=function(p,f,y){var v=m(p),E=y&&y.at;if(!v||d.disposed||d.tooFar(E))return!1;var M=vl(a.chain,a.chain.indexOf(v),f);return M===a.chain?!1:(b({v:2,chain:M},d.whenOf(E)),d.emit({effect:v.id,key:"chain",value:"move"}),!0)},h.getChain=function(){return a.chain.map(function(p){return{id:p.id,type:p.type,name:wl(p),bypass:p.bypass}})},h.toAstrid=function(){return Al(a)},h}function Ai(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Kl(e,t,n){var a=n||{},o=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,r=typeof a.toAudioTime=="function"?a.toAudioTime:o?function(m){return o.toContextTime(m)}:t&&t.timebase==="shared"?null:function(m){return m},s=typeof a.now=="function"?a.now:o&&typeof o.sharedNow=="function"?function(){return o.sharedNow()}:null,l=t&&t.transport?t.transport:t,c=l&&l.tempo?l.tempo:l,u=!1;function d(m){if(!r){!u&&typeof console<"u"&&(u=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof m!="number")){var g=r(l.timeAt(m));return typeof g=="number"&&isFinite(g)?g:void 0}}function h(){var m=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(m)){var g=l&&typeof l.bpm=="number"?l.bpm:Ai(c,0);g>0&&e.setTempo(g);return}var w=Ai(c,m);w>0&&e.setTempo(w);for(var b=c&&(c.points||c.tempoPoints)||[],p=0;p<b.length;p++){var f=b[p];if(f.beat>m&&f.bpm>0){var y=d(f.beat);y!==void 0&&e.setTempo(f.bpm,y)}}}return h(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(m){m&&(m.kind==="tempo"&&m.bpm>0?e.setTempo(m.bpm,d(m.atBeat)):(m.kind==="snapshot"||m.kind==="start")&&h())})}const Ql="/lucy/assets/worklet-CAv1bvAp.js";var Xl="nc-ui",Jl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Oa={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},bn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Zl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},De={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ec={light:{color:Jl.color,semantic:Oa,component:bn,runtime:Zl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Ct=e=>`--${Xl}-${e}`,ha=Oa["label-on-fill-dark"],Si=Oa["label-on-fill-light"],tc=De["label-min-contrast"],nc=/^#[0-9a-f]{6}$/i,ac=e=>typeof e=="string"&&nc.test(e),rn=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Ti(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),o=r=>{let s=(r+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${rn(o(0)*255)}${rn(o(8)*255)}${rn(o(4)*255)}`}function _o(e){let[t,n,a]=[1,3,5].map(u=>parseInt(e.slice(u,u+2),16)/255),o=Math.max(t,n,a),r=Math.min(t,n,a),s=(o+r)/2,l=o-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((o===t?60*((n-a)/l%6):o===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Li(e){let[t,n,a]=[1,3,5].map(o=>{let r=parseInt(e.slice(o,o+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function ma(e,t){let[n,a]=[Li(e),Li(t)].sort((o,r)=>r-o);return(n+.05)/(a+.05)}var yn=e=>ma(e,ha)>=ma(e,Si)?ha:Si;function Ho(e,t,n,a=tc){let o=Ti(e,t,n),r=yn(o)===ha?1:-1;for(let s=0;s<40&&ma(o,yn(o))<a;s++)n+=r*.01,o=Ti(e,t,n);return o}function ic(e){let{h:t,s:n}=_o(e),a=Ho(t,Math.min(n,De["surprise-on-max-saturation"]),De["surprise-on-lightness"]);return{fill:e,ink:yn(e),on:a,onInk:yn(a)}}var oc=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function rc(e,t=Math.random){let[n,a]=De["surprise-saturation"],[o,r]=De["surprise-lightness"],s=De["surprise-min-hue-gap"],l=ac(e)?_o(e).h:null,c=t()*360;return l!==null&&oc(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),Ho(c,n+t()*(a-n),o+t()*(r-o))}function sc(e){if(!e)return null;let t=ic(e);return{[Ct("surprise-fill")]:t.fill,[Ct("surprise-ink")]:t.ink,[Ct("surprise-on")]:t.on,[Ct("surprise-on-ink")]:t.onInk}}var lc=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,cc=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Ci(e){let[t,n,a]=[1,3,5].map(l=>lc(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*r-.0040720468*s,1.9779984951*o-2.428592205*r+.4505937099*s,.0259040371*o+.7827717662*r-.808675766*s]}function dc([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*r,-1.2684380046*a+2.6097574011*o-.3413193965*r,-.0041960863*a-.7034186147*o+1.707614701*r].map(s=>rn(cc(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var uc=De["velocity-range"],Uo={min:bn.rhythm["velocity-min"],max:bn.rhythm["velocity-max"]},Fi=Object.fromEntries(Object.entries(ec).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function pc(e,t=Uo){let[n,a]=uc,o=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,r=(o-n)/(a-n),s=t.ink??bn.rhythm["step-cell-ink"];if(r<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:s};let l=Ci(t.min),c=Ci(t.max);return{velocity:o,t:r,fill:dc(l.map((u,d)=>u+(c[d]-u)*r)),ink:s}}function zi(e,t=Uo){return{[Ct("velocity-fill")]:pc(e,t).fill}}var Wo="data-nc-theme",Ni="nc-ui-theme-change",hc="(prefers-color-scheme: dark)",Go=e=>e?.documentElement??null,Vo=e=>e?.defaultView?.matchMedia?.(hc)??null,mc=e=>e==="light"||e==="dark"?e:"system";function fc(e=globalThis.document){return mc(Go(e)?.getAttribute(Wo))}function fa(e=globalThis.document){let t=fc(e);return t!=="system"?t:Vo(e)?.matches?"dark":"light"}function Yo(e,t=globalThis.document){let n=Go(t);if(!n)return()=>{};let a=fa(t),o=()=>{let c=fa(t);c!==a&&(a=c,e(c))},r=t.defaultView?.MutationObserver,s=r?new r(o):null;s?.observe(n,{attributes:!0,attributeFilter:[Wo]});let l=Vo(t);return l?.addEventListener?.("change",o),t.addEventListener(Ni,o),()=>{s?.disconnect(),l?.removeEventListener?.("change",o),t.removeEventListener(Ni,o)}}var gc={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},bc={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},yc={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},wc={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},zn={};for(let[e,t]of Object.entries(bc))zn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(wc))zn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(yc))zn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(gc.renames.map(e=>[e.old,e.new]));function Ko(e){let t=zn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function U(e){return Ko(e).prop}function i(e){return`var(${U(e)})`}function vc(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(U(t)));return Number.isFinite(n)?n:0}function Y(e,t){let n=Ko(t),a=e.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=r:o.style.color=r,(e instanceof Element?e:a.documentElement).append(o);let s=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return o.remove(),l}function Qo(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function xc(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=i("font-ui"),n.style.fontSize=i("label-size"),n.style.fontWeight=i("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var kc="[data-modulated], [data-modulated] *";function Xn(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function qi(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${i("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${i("hairline")} solid ${i("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function $c(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${i(`module-bg-stack-${a}`)};
      ${U("text-sub")}: ${i(`module-sub-stack-${a}`)};
      ${U("divider")}: ${i(`module-div-stack-${a}`)};
      ${U("slider-track")}: ${i(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${i(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${i(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${i("module-bg-stack-1")};
      ${U("text-sub")}: ${i("module-sub-stack-1")};
      ${U("divider")}: ${i("module-div-stack-1")};
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
${kc} { transition: none; }
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
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
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
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${i("control-gap")} ${i("module-pad")};
  padding-bottom: ${i("module-pad")};
  background: ${i("module-bg-stack-1")};
  ${U("text-sub")}: ${i("module-sub-stack-1")};
  ${U("divider")}: ${i("module-div-stack-1")};
  ${U("slider-track")}: ${i("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${i("stack-card-pad-y")} ${i("module-pad")} ${i("module-pad")};
  ${U("text-sub")}: inherit;
  ${U("divider")}: inherit;
  ${U("slider-track")}: inherit;
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
    width: ${i("fx-fold-width")};
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
    width: ${i("fx-fold-width")};
    margin-inline-end: calc(${i("fx-fold-width")} * -1);
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
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${i("slider-pitch")} ${i("slider-pitch")} calc(${i("knob-size")} + ${i("control-gap")} + ${i("label-size")} * ${i("label-leading")}) auto auto;
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
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
.nc-strip[data-nc-folded][data-nc-sends-hidden] > .nc-strip-body { grid-row: 5; }
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
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
${qi("")}
}
@media (max-width: 1023px) {
${qi("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Xn("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Xn("")}
}
@media (max-width: 1023px) {
${Xn("html[data-nc-landscape] ")}
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
`}var Jn=null,Ec="nc-ui-fallback";function Xo(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Jn&&Jn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ec} {
${$c()}
}
`,e.head.append(t),Jn=t}var Mc=new URL("/lucy/assets/confirm-BSJWrX8s.css",import.meta.url).href,Ac=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Mc,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Ac(document);function ja(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",a.append(o,r),n.append(a);let s=!1,l=u=>{s=u===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Jo=new WeakMap,Di=.25;function Sc(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let r=0,s=e.step??.005,l=e.onChange,c=e.onReset,u=p=>Math.min(1,Math.max(0,p)),d=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},h=p=>{let f=u(p);f!==r&&(r=f,d(),l?.(f))},m=0,g=!1;n.addEventListener("pointerdown",p=>{if(p.button!==0)return;p.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();p.target!==o&&f.height>0&&h(1-(p.clientY-f.top)/f.height),m=p.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(p.pointerId)}),n.addEventListener("pointermove",p=>{if(!g)return;let f=n.getBoundingClientRect().height||1,y=(m-p.clientY)/f*(p.shiftKey?Di:1);m=p.clientY,h(r+y)});let w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",p=>{p.preventDefault(),c?.()}),n.addEventListener("keydown",p=>{let f=p.shiftKey?s*Di:s,y={ArrowUp:r+f,ArrowRight:r+f,ArrowDown:r-f,ArrowLeft:r-f,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};p.key in y&&(p.preventDefault(),h(y[p.key]))});let b={el:n,get value(){return r},get dragging(){return g},set(p){g||(r=u(Number(p)||0),d())},setText(p){p?n.setAttribute("aria-valuetext",p):n.removeAttribute("aria-valuetext")},setLabel(p){n.setAttribute("aria-label",p)},configure(p){typeof p.step=="number"&&p.step>0&&(s=p.step),p.onChange&&(l=p.onChange),p.onReset&&(c=p.onReset)}};return b.setLabel(e.label),b.set(e.value??0),b.setText(e.valueText),Jo.set(n,b),b}function Tc(e){return Jo.get(e)}var Zo=new WeakMap,Lc=.2,Cc=1.5,Fc=.5;function zc(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Pi(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:zc(a.getComputedStyle(e).getPropertyValue(U(t)),n)}function Nc(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let b=0;b<n;b++){let p=t.createElement("span");p.className="nc-meter-bar";let f=t.createElement("span");f.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",p.append(f,y,v),r.append(p),s.push({peak:f,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,r);let l=e.label,c=e.onClear,u=!1,d=-1,h=-1,m=()=>{o.dataset.lit=u?"true":"false",o.setAttribute("aria-pressed",u?"true":"false"),o.setAttribute("aria-label",u?`${l} clipped: clear`:`${l} clip light`),o.title=u?"Clipped. Click to clear":"Clip light"},g=(b,p,f,y)=>{let v=Math.round(y*1e3)/1e3;f[p]!==v&&(f[p]=v,b.style.transform=p==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};o.addEventListener("click",()=>{w.clear(),c?.()});let w={el:a,get clipped(){return u},update(b,p){d<0&&(d=Pi(a,"motion-meter-fall",Lc)),h<0&&(h=Pi(a,"motion-meter-hold",Cc));let f=Math.max(0,Math.min(.25,Number(p)||0)),y=d>0?Math.exp(-f/d):0;s.forEach((v,E)=>{let M=b[E]??b[0]??{peak:0,rms:0},$=Math.min(1,Math.max(0,Number(M.peak)||0)),k=Math.min($,Math.max(0,Number(M.rms)||0));M.over&&w.clip(),v.level.peak=$>=v.level.peak?$:$+(v.level.peak-$)*y,v.level.rms=k>=v.level.rms?k:k+(v.level.rms-k)*y,v.holdAge+=f,$>=v.holdAt?(v.holdAt=$,v.holdAge=0):v.holdAge>h&&(v.holdAt=Math.max($,v.holdAt-Fc*f)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){u||(u=!0,m())},clear(){u=!1,m()},reset(){for(let b of s)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,g(b.peak,"peak",b.shown,0),g(b.rms,"rms",b.shown,0),g(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,m()},configure(b){b.onClear&&(c=b.onClear)}};return m(),w.reset(),Zo.set(a,w),w}function qc(e){return e?Zo.get(e):void 0}var Dc=3,Pc=new Set(["freq","q","rate","time","log"]);function _a(e,t,n){return!e||!Pc.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Nn(e,t,n){return _a(e,t,n)!=="linear"}function Ha(e,t,n,a){let o=Number(a);if(!(n>t)||!Number.isFinite(o))return 0;let r=Math.min(n,Math.max(t,o)),s=_a(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function er(e,t,n,a){let o=Math.min(1,Math.max(0,Number(a)||0)),r=_a(e,t,n);return r==="log"?t*(n/t)**o:t+(n-t)*(r==="power"?o**Dc:o)}function tr(e,t,n,a){let o=Math.min(n,Math.max(t,e));if(a>0){o=t+Math.round((o-t)/a)*a;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));o=Number(o.toFixed(r)),o=Math.min(n,Math.max(t,o))}return o}function Ua(e,t,n,a){return Math.round(Ha(e,t,n,a)*1e3)}function ga(e,t,n,a,o){return tr(er(e,t,n,Number(a)/1e3),t,n,o)}function Bc(e,t,n=!1){let a=Number(e)||0,o=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=a+o:t==="ArrowLeft"||t==="ArrowDown"?r=a-o:t==="PageUp"?r=a+1e3/10:t==="PageDown"?r=a-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function nr(e,t,n,a,o,r=!1,s){let l=Ua(e,t,n,a),c=Bc(l,o,r);if(c===null)return null;let u=ga(e,t,n,c,s),d=Math.sign(c-l),h=tr(Number(a),t,n,s);for(;d!==0&&u===h&&c>0&&c<1e3;)c+=d,u=ga(e,t,n,c,s);return u}function Rc(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function Bi(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ic(e,t,n,a=n/6){let o=e.some(d=>d===null),r=Math.max(0,n-(o?a:0)),s=e.reduce((d,h,m)=>h===null?d:d+Bi(t[m]),0),l=s>0?r/s:0,c=e.map(d=>d===null?0:Math.min(r,Bi(d)*l));if(o){let d=c.reduce((m,g)=>m+g,0),h=e.indexOf(null);c[h]=Math.max(a,n-d)}let u=[0];for(let d of c)u.push(Math.round((u[u.length-1]+d)*100)/100);return o&&(u[u.length-1]=n),u}function Oc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*a)),r=Math.max(1,Math.floor(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function Fe(e){return Math.max(0,Math.min(1,e))}function ar(e,t){let{ctx:n,w:a,h:o}=Oc(e);if(!n)return;n.clearRect(0,0,a,o);let r=xc(e);if(t.paint==="swatch"){let c=Y(e,"accent"),u=Y(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=u,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=u,n.fillRect(a/2,0,a/2,o);return}if(t.paint==="filter"&&typeof t.hz=="number"){Hc(n,a,o,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",u=Y(e,Qo(c)),d=Y(e,"divider"),h=Fe(t.cutoff??.5),m=.08+(1-Fe(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let g=0;g<=a;g++){let w=g/Math.max(1,a),b=0;c==="lp"?b=w<h?1:Math.max(0,1-(w-h)/m):c==="hp"?b=w>h?1:Math.max(0,1-(h-w)/m):b=Math.max(0,1-Math.abs(w-h)/m);let p=o*.78-b*o*.62;g===0?n.moveTo(g,p):n.lineTo(g,p)}n.strokeStyle=u,n.stroke(),n.fillStyle=Y(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,o),e.dataset.ncAccent=u;return}if(t.paint==="envelope"){n.strokeStyle=Y(e,"accent");let c=Math.max(0,t.attack??0),u=Math.max(0,t.decay??.4),[d,h,m]=Ic([c,u],t.max??[1,4],a),g=2,w=o-1;n.beginPath(),n.moveTo(d,w),n.lineTo(h,g);let b=Math.max(1,Math.ceil(m-h));for(let p=1;p<=b;p++){let f=p/b;n.lineTo(h+(m-h)*f,w-(w-g)*Math.exp(-4.6*f)*(1-f*.01))}n.lineTo(m,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[u,d]=Array.isArray(t.region)?t.region:[0,1],h=Y(e,"accent"),m=Y(e,"text-sub"),g=o/2;n.fillStyle=Y(e,"accent-soft"),n.fillRect(Fe(u)*a,0,(Fe(d)-Fe(u))*a,o),n.strokeStyle=Y(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(a,g),n.stroke();let w=Math.floor(c.length/2);for(let b=0;b<w;b++){let p=(b+.5)/w*a,f=Math.max(-1,Math.min(1,c[b*2]??0)),y=Math.max(-1,Math.min(1,c[b*2+1]??0)),v=(b+.5)/w;n.strokeStyle=v>=u&&v<=d?h:m,n.beginPath(),n.moveTo(p,g-y*(g-1)),n.lineTo(p,g-f*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let b of[u,d,...Array.isArray(t.markers)?t.markers:[]]){let p=Math.round(Fe(b)*(a-1))+.5;n.beginPath(),n.moveTo(p,0),n.lineTo(p,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Y(e,"text"),n.fillRect(Math.round(Fe(t.position)*(a-1)),0,1,o)),w||(n.fillStyle=m,n.font=r,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=Fe(t.level??0);n.fillStyle=Y(e,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=Y(e,"accent"),n.fillRect(0,o*.4,a*c,o*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=Y(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=Y(e,"rhythm.playhead"),n.fillRect(l/s*a,o*.3,Math.max(1,a/s),o*.4),e.dataset.ncAccent=Y(e,"accent")}var Pt=20,ba=2e4,Zn=24,Ri=-60;function jc(e,t,n,a,o=48e3){let r=2*Math.PI*Math.min(t,o*.49)/o,s=Math.cos(r),l=Math.sin(r)/(2*n),c,u,d;e==="hp"?[c,u,d]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,u,d]=[l,0,-l]:[c,u,d]=[(1-s)/2,1-s,(1-s)/2];let h=1+l,m=-2*s,g=1-l,w=2*Math.PI*a/o,b=(v,E,M)=>v+E*Math.cos(w)+M*Math.cos(2*w),p=(v,E)=>-(v*Math.sin(w)+E*Math.sin(2*w)),f=Math.hypot(b(c,u,d),p(u,d)),y=Math.hypot(b(h,m,g),p(m,g));return y>0?f/y:0}function _c(e,t){return Math.log(Math.max(Pt,Math.min(ba,e))/Pt)/Math.log(ba/Pt)*t}function Ii(e,t,n){let a=Math.max(Ri,Math.min(Zn,e));return t+(Zn-a)/(Zn-Ri)*(n-t)}function Hc(e,t,n,a,o,r){let s=a.mode??"lp",l=Y(o,Qo(s)),c=Y(o,"divider"),u=Y(o,"text-sub"),d=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,m=Math.max(h+4,n-d-3),g=a.q??Math.SQRT1_2,w=Math.round(Ii(0,h,m))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let b=0;b<=t;b++){let p=Pt*(ba/Pt)**(b/Math.max(1,t)),f=a.open?1:jc(s,a.hz,g,p,a.sampleRate),y=Ii(20*Math.log10(Math.max(1e-5,f)),h,m);b===0?e.moveTo(b,y):e.lineTo(b,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let b=Math.round(_c(a.hz,t))+.5;e.strokeStyle=u,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(b,h),e.lineTo(b,m),e.stroke(),e.setLineDash?.([])}e.fillStyle=u,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(a.hz))}function be(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function Uc(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Ve=20,Yt=2e4,Wa=Math.log(Yt/Ve),ya=32,Wc=250,Gc=-100,Vc=1200,Yc=4.5,Oi=-6,We=-96,Kc=48,ji=[100,1e3,1e4],Qc=[6,12];function mt(e,t){return Math.log(Math.max(Ve,Math.min(Yt,e))/Ve)/Wa*t}function sn(e,t){return Ve*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Wa)}function Pe(e,t,n,a){let o=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*o}function wa(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ir=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Xc(e,t,n,a){let o=n?3:1,r=c=>({db:Math.max(-a,Math.min(a,e.db+c*o))}),s=c=>({hz:Math.max(e.minHz??Ve,Math.min(e.maxHz??Yt,e.hz*2**(c*o/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*o)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ga(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Jc(e,t,n,a,o,r,s,l,c){let u=c?.25:1,d={},h=Math.max(1,r/2-l);if(d.db=Math.max(-s,Math.min(s,t.db-a*u/h*s/Ga(e))),e.moveHz){let m=t.hz*Math.exp(n*u/Math.max(1,o)*Wa);d.hz=Math.max(e.minHz??Ve,Math.min(e.maxHz??Yt,m))}return d}function Zc(e,t,n,a,o){let r=Math.max(0,n.left)+1,s=Math.min(n.right,o)-1,l=Math.min(t.width*3+a*2,s-r),c=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var ee=new WeakMap;function ed(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(o,r);for(let c of e.bands)a.append(td(n,c,t));a.append(s),a.addEventListener("click",c=>{if(!dr(n)||c.button>0)return;let u=cr(n)?.querySelector("[data-nc-max-toggle]");u instanceof HTMLElement&&u.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),ee.set(n,{control:e,cache:null,spec:null,active:null}),rr(n,e),n}function or(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function td(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let u=n(e);return u?.type==="eqGraph"?u:null},r=()=>o()?.bands.find(u=>u.id===t.id)??null,s=null;a.addEventListener("pointerdown",u=>{if(u.button!==0)return;let d=r();d&&(u.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(u.pointerId),s={id:u.pointerId,x:u.clientX,y:u.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",ze(e,t.id))}),a.addEventListener("pointermove",u=>{if(!s||u.pointerId!==s.id)return;let d=o(),h=r(),m=ee.get(e);if(!d||!h||!m?.box)return;let{w:g,h:w,pad:b}=m.box;d.onBand(h.id,Jc(h,s.start,u.clientX-s.x,u.clientY-s.y,g,w,d.range??18,b,u.shiftKey))});let l=u=>{!s||u.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&ze(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",u=>{u.preventDefault(),o()?.onReset?.(t.id)}),a.addEventListener("keydown",u=>{let d=o(),h=r();if(!d||!h)return;let m=Xc(h,u.key,u.shiftKey,d.range??18);m&&(u.preventDefault(),m==="reset"?d.onReset?.(h.id):d.onBand(h.id,m),ze(e,h.id))});let c=null;return a.addEventListener("wheel",u=>{let d=o(),h=r();if(!d||!h?.moveQ)return;u.preventDefault();let m=u.timeStamp;(!c||m-c.t>400)&&(c={q:h.q,t:m});let g=u.deltaMode===1?u.deltaY*16:u.deltaMode===2?u.deltaY*400:u.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-g/240))),c.t=m,d.onBand(h.id,{q:c.q}),ze(e,h.id)},{passive:!1}),a.addEventListener("pointerenter",()=>ze(e,t.id)),a.addEventListener("focus",()=>ze(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&ze(e,null)}),a.addEventListener("blur",()=>{s||ze(e,null)}),a}function ze(e,t){let n=ee.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?vt(e):Va(e)}function Va(e){let t=ee.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let o=[a.label,ir(a.db)];a.kind==="peak"?o.push(wa(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${wa(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(nd(t.control,a)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,c=mt(a.hz,r),u=Pe(a.db*Ga(a),s,t.control.range??18,l),d=n.offsetWidth,h=n.offsetHeight,m=Math.max(0,Math.min(r-d,c-d/2)),g=u-h-l*1.5>=0?u-h-l*1.5:Math.min(s-h,u+l*1.5);n.style.left=`${Math.round(m)}px`,n.style.top=`${Math.round(g)}px`}function nd(e,t){return e.bands.indexOf(t)%3+1}function rr(e,t){let n=ee.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Ya(e);let a=t.range??18;t.bands.forEach((o,r)=>{let s=or(e,o.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=o.kind,s.setAttribute("aria-label",`${o.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(o.db)),s.setAttribute("aria-valuetext",o.valueText??`${ir(o.db)}, ${wa(o.hz)}`),s.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?s.setAttribute("data-nc-help",o.help):s.removeAttribute("data-nc-help"))}),vt(e),ld(e)}function sr(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*a)),r=Math.max(1,Math.round(n*a));(e.width!==o||e.height!==r)&&(e.width=o,e.height=r);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function lr(e){return{curve:be(e,"eq-curve"),fill:be(e,"eq-fill"),quiet:be(e,"text-sub"),grid:be(e,"eq-grid"),zero:be(e,"divider"),label:be(e,"text-sub"),spectrum:be(e,"eq-spectrum"),bands:[be(e,"eq-band-1"),be(e,"eq-band-2"),be(e,"eq-band-3")]}}function ad(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function vt(e){ee.has(e)&&Ya(e);let t=ee.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:o,w:r,h:s}=sr(n);if(!o)return;let l=Math.max(8,Math.round(s*.06)),c=a.range??18;t.box={w:r,h:s,pad:l},t.colours=lr(e);let u=t.colours,d=ad(a,r);if(!t.cache||t.cache.key!==d){let E=Math.max(64,Math.ceil(r)+1),M=new Float64Array(E);for(let k=0;k<E;k++)M[k]=sn(k/(E-1)*r,r);let $=null;try{$=typeof a.response=="function"?a.response(M):null}catch{$=null}t.cache={key:d,freqs:M,total:$?.total??new Float64Array(E),bands:$?.bands??[]}}o.clearRect(0,0,r,s);let h=Uc(e),m=a.on!==!1;id(o,r,s,c,l,u,h);let{freqs:g,total:w,bands:b}=t.cache,p=Array.from(g,E=>mt(E,r)),f=Pe(0,s,c,l);b.forEach((E,M)=>{if(!E||!E.some(A=>Math.abs(A)>.05))return;let $=m?u.bands[M%3]:u.quiet,k=Array.from(E,A=>Pe(A,s,c,l));o.save(),t.active&&a.bands[M]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=$,_i(o,p,k,f)),o.globalAlpha=m?.75:.4,o.strokeStyle=$,o.lineWidth=.75,ea(o,p,k),o.restore()});let y=Array.from(w,E=>Pe(E,s,c,l)),v=m?u.curve:u.quiet;o.save(),o.fillStyle=m?u.fill:u.quiet,o.globalAlpha=m?.2:.08,_i(o,p,y,f),o.restore(),o.save(),o.strokeStyle=m?u.fill:v,o.lineJoin="round",o.lineCap="round",m&&(o.globalAlpha=.16,o.lineWidth=4,ea(o,p,y)),o.globalAlpha=1,o.strokeStyle=v,o.lineWidth=1.25,ea(o,p,y),o.restore(),od(e),Va(e)}function id(e,t,n,a,o,r,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let u=1;u<=9;u++){let d=c*u;if(d<Ve||d>Yt)continue;let h=Math.round(mt(d,t))+.5;e.globalAlpha=ji.includes(d)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of Qc)if(!(c>a))for(let u of[1,-1]){let d=Math.round(Pe(c*u,n,a,o))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(Pe(0,n,a,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of ji){let u=c>=1e3?`${c/1e3}k`:String(c),d=e.measureText(u).width,h=mt(c,t)+3;e.fillText(u,h+d+2>t?mt(c,t)-d-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let u=Pe(c,n,a,o);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(u)-1)}e.restore()}function wn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let o=(t[a]+t[a+1])/2,r=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],o,r)}e.lineTo(t[t.length-1],n[n.length-1])}function ea(e,t,n){e.beginPath(),wn(e,t,n),e.stroke()}function _i(e,t,n,a){e.beginPath(),wn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function cr(e){return e.closest("[data-nc-maxable]")}function dr(e){let t=cr(e);return!!t&&!t.hasAttribute("data-nc-max")}function Ya(e){let t=dr(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=ee.get(e);n?.active&&(n.active=null,Va(e))}return t}function od(e){Ya(e);let t=ee.get(e);if(!t?.box)return;let{w:n,h:a,pad:o}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=or(e,s.id);l instanceof HTMLElement&&(l.style.left=`${mt(s.hz,n).toFixed(1)}px`,l.style.top=`${Pe(s.db*Ga(s),a,r,o).toFixed(1)}px`)}}function rd(e,t,n,a){let o=a/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let u=(c-.5)/(e-1)*t,d=(c+.5)/(e-1)*t,h=sn(u,t),m=sn(d,t),g=sn(c/(e-1)*t,t);r[c]=Math.min(n-1,h/o),s[c]=Math.min(n-1,m/o),l[c]=Yc*Math.log2(g/1e3)}return{lo:r,hi:s,tilt:l}}function sd(e,t,n){let a=Math.floor(t),o=Math.ceil(n);if(o-a<=1){let s=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*s}let r=-1/0;for(let s=a;s<=o&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function ld(e){let t=ee.get(e);if(t){if(!t.control.spectrum){pr(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let o=ee.get(e)?.spec;o&&(o.visible=a.some(r=>r.isIntersecting),va(e))}),t.spec.io.observe(e)):t.spec.visible=!0}va(e)}}function va(e){let t=ee.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){ur(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=xa(e),n.onVis||(n.onVis=()=>va(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&ka(e,!1)}function xa(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function ka(e,t){let n=ee.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,ta(e,xa(e))),Wc):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,ta(e,o))):n.timer=a.setTimeout(()=>(n.timer=0,ta(e,xa(e))),ya))}function ur(e){let t=ee.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function pr(e){let t=ee.get(e)?.spec;if(!t)return;ur(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=ee.get(e);n&&(n.spec=null)}function ta(e,t){let n=ee.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){pr(e);return}if(!a.analyser)return;if(t-a.last<ya-4&&!a.idle){ka(e,!1);return}let o=a.last?Math.min(.25,(t-a.last)/1e3):ya/1e3;a.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=sr(r);if(!s)return;let u=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==u||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:u,w:l,sr:d,...rd(u,l,a.buf.length,d)},a.disp=new Float32Array(u).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let h=-1/0,m=Kc*o,{lo:g,hi:w,tilt:b}=a.map;for(let f=0;f<u;f++){let y=sd(a.buf,g[f],w[f]);y>h&&(h=y);let v=y+b[f],E=a.disp[f]-m;a.disp[f]=v>E?v:E}h>Gc&&(a.loud=t);let p=t-a.loud>Vc;s.clearRect(0,0,l,c),(!p||a.disp.some(f=>f>We))&&cd(s,l,c,a.disp,n.colours??lr(e)),a.idle=p&&!a.disp.some(f=>f>We),ka(e,a.idle)}function cd(e,t,n,a,o){let r=a.length,s=new Array(r),l=new Array(r),c=u=>{let d=a[Math.max(0,Math.min(r-1,u))];return Number.isFinite(d)?d:We};for(let u=0;u<r;u++){let d=c(u)*.36+(c(u-1)+c(u+1))*.22+(c(u-2)+c(u+2))*.1,h=(Math.max(We,Math.min(Oi,Number.isFinite(d)?d:We))-We)/(Oi-We);s[u]=u/(r-1)*t,l[u]=n-h*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),wn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),wn(e,s,l),e.stroke(),e.restore()}var dd=.8912509381337456,$a=32,ud=250,pd=1200,hd=.2,hr=1.5;function md(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function fd(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",a.append(o),t.append(a)}return t}var vn=new WeakMap,Hi=new WeakMap;function Ui(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(o);return Number.isFinite(r)?o.endsWith("ms")?r/1e3:r:n}function gd(e){let t=Hi.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(o=>{for(let r of o){let s=vn.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Bt(s))}ut(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)Bt(o);ut(t)}),Hi.set(e,t),t}var mr=e=>e.els.some(t=>t.isConnected);function bd(e){if(!e.loop.io)return mr(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Bt(e){let t=!e.dead&&!!e.source&&bd(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ka(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Aa(e))}function Ka(e){return e.doc.defaultView?.performance?.now()??Date.now()}function ut(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){fr(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ka(e)),!e.raf&&!e.timer&&Ea(e,!1)}function Ea(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Wi(e,Ka(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),ud):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,Wi(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,a()),$a)}function fr(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Wi(e,t){if(t-e.last<$a-4&&!e.idle&&e.last){Ea(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):$a/1e3;e.last=t,e.frames++;let a=!1,o=!1;for(let r of e.recs){if(!mr(r)){(r.placed||e.frames-r.born>90)&&gr(r);continue}r.placed=!0,r.open&&(o=!0,yd(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(a=!0))}if(!o){fr(e);return}e.idle=t-e.loud>pd&&!a,Ea(e,e.idle)}function yd(e,t,n){if(e.fall<0){let m=e.els[0];e.fall=Ui(m,"motion-meter-fall",hd),e.hold=Ui(m,"motion-meter-hold",hr)}let a=null;try{a=e.source.read()}catch{a=null}let o=typeof a=="number",r=o?a:Number(a?.in)||0,s=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let m of e.els)m.dataset.ncRows=c}let u=e.fall>0?Math.exp(-t/e.fall):0,d=[r,l],h=!1;for(let m=0;m<2;m++){let g=md(d[m]);g>0&&(h=!0),e.disp[m]=g>=e.disp[m]?g:g+(e.disp[m]-g)*u,e.disp[m]<.001&&(e.disp[m]=0),d[m]>=dd&&(e.clipAt[m]=n);let w=e.clipAt[m]>0&&n-e.clipAt[m]<e.hold*1e3;Ma(e,m,e.disp[m],w)}return h}function Ma(e,t,n,a){let o=Math.round(n*1e3)/1e3,r=a?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===r)){e.shown[t]=o,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=r)}}}function Aa(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ma(e,0,0,!1),Ma(e,1,0,!1)}function gr(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),vn.get(t)===e&&vn.delete(t)}function wd(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=gd(a),r={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:hr,rows:""};for(let s of n)vn.set(s,r),o.io?.observe(s);if(o.recs.add(r),Aa(r),!o.io){let s=a.defaultView,l=()=>{Bt(r),ut(o)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Bt(r),ut(o);return}r.open&&(r.open=!1,r.source?.close?.(),Aa(r)),r.source=l,Bt(r),ut(o)}},destroy(){r.dead||gr(r),ut(o)}}}var br={slop:8,longPressMs:500,pitchPx:16},vd=class{constructor(e,t,n=br){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let o=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,r)<this.config.slop)return;Math.abs(r)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xd(e,t,n,a=br){let o=!1,r=0,s=(u,d)=>{let h=e.ownerDocument.elementFromPoint?.(u,d),m=[...e.querySelectorAll(t)],g=h?m.findIndex(p=>p===h||p.contains(h)):-1;if(g>=0)return g;let w=-1,b=Number.POSITIVE_INFINITY;return m.forEach((p,f)=>{if(p.hidden)return;let y=p.getBoundingClientRect();if(d<y.top||d>y.bottom)return;let v=Math.abs(u-(y.left+y.width/2));v<b&&v<=y.width&&(w=f,b=v)}),w},l=new vd(s,u=>{(u.kind==="paint"||u.kind==="long")&&(o=!0),n(u)},a),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",u=>{u.button>0||(o=!1,l.down(u.pointerId,u.clientX,u.clientY,u.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",u=>{l.state!=="idle"&&(l.move(u.pointerId,u.clientX,u.clientY,u.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",u=>{c(),l.up(u.pointerId,u.clientX,u.clientY,u.timeStamp)}),e.addEventListener("pointercancel",u=>{c(),l.cancel(u.pointerId)}),e.addEventListener("click",u=>{o&&(o=!1,u.stopPropagation(),u.preventDefault())},!0),e.addEventListener("contextmenu",u=>u.preventDefault()),l}var yr="netcomposer.groups.v1";function Qa(){try{return globalThis.localStorage??null}catch{return null}}function wr(e=Qa(),t=yr){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,r]of Object.entries(n))typeof r=="boolean"&&a.set(o,r);return a}catch{return new Map}}function kd(e,t,n,a=yr){let o=wr(e,a);o.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function $d(e,t=Qa()){return wr(t).get(e.id)??e.open===!0}function Ed(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let u of e.controls)c.append(n(u,t));return o.addEventListener("click",()=>{let u=a.dataset.ncOpen!=="true";kd(Qa(),e.id,u),Sa(a,u);let d=t(a);d?.type==="group"&&d.onToggle?.(u)}),a.append(o,c),vr(a,e),Sa(a,$d(e)),xr(a,e),a}function Sa(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function vr(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function xr(e,t){vr(e,t)&&Sa(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var nn="application/x-nc-pad",Gi="http://www.w3.org/2000/svg";function Md(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],o=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),c=0,u=0;for(let h=s;h<l;h++)c=Math.min(c,e[2*h]??0),u=Math.max(u,e[2*h+1]??0);let d=n===1?50:r/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,u)*10).toFixed(2)}`),o.push(`${d.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Ad(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,r)=>a.append(Sd(n,r,t))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&ln(n)}),$r(n,e),n}function Sd(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Gi,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let u=document.createElementNS(Gi,"path");return c.append(u),a.append(o,r,s,l,c),Ld(e,a,t,n),r.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&kr(e,a,t,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(nn,String(t)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let h=d.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(nn)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=h.includes(nn)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let m=d.dataTransfer?.getData(nn);if(m!==void 0&&m!==""){d.preventDefault(),d.stopPropagation();let w=Number(m);w!==t&&h.onMove?.(w,t,d.altKey);return}let g=d.dataTransfer?.files?.[0];g&&(d.preventDefault(),d.stopPropagation(),h.onFile?.(t,g))}),a}function Td(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Ld(e,t,n,a){let o=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",u=>{if(u.button!==0)return;r=!1,s=u.clientX,l=u.clientY,c();let d=a(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&u.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,r=Vi(e,t,n,a)},450)))}),t.addEventListener("pointermove",u=>{o&&Math.hypot(u.clientX-s,u.clientY-l)>8&&c()});for(let u of["pointerup","pointercancel","pointerleave"])t.addEventListener(u,c);t.addEventListener("contextmenu",u=>{u.preventDefault(),c(),r=Vi(e,t,n,a)}),t.addEventListener("click",()=>{if(r){r=!1;return}Td(e,n,a)})}function Vi(e,t,n,a){let o=a(e);if(o?.type!=="padGrid"||!o.menu)return!1;let r=o.menu(n);if(!r.length)return!1;ln(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),ln(e)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of r){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=d.id,h.textContent=d.label,h.addEventListener("click",()=>{ln(e);let m=a(e);m?.type==="padGrid"&&(d.id==="rename"&&m.onRename?kr(e,t,n,a):m.onMenu?.(n,d.id))}),l.append(h)}e.append(s,l);let c=e.getBoundingClientRect(),u=t.getBoundingClientRect();return l.style.left=`${u.left-c.left}px`,l.style.top=`${u.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function kr(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(e);if(o?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=o.nameMax??24,r.value=o.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,u=d=>{if(c)return;c=!0;let h=r.value.trim();r.remove(),t.focus();let m=a(e);d&&h&&m?.type==="padGrid"&&m.onRename?.(n,h)};r.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?u(!0):d.key==="Escape"&&u(!1)}),r.addEventListener("blur",()=>u(!0));for(let d of["pointerdown","click","dblclick"])r.addEventListener(d,h=>h.stopPropagation());e.append(r),r.focus(),r.select()}function ln(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function $r(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,o)=>{let r=n[o];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),u=r.querySelector(".nc-padgrid-pad-badge");u&&(u.textContent=a.empty?"":a.badge??""),r.draggable=!a.empty,a.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),c?.setAttribute("d",Md(a.peaks))),a.lane?r.dataset.ncLane=String(a.lane):delete r.dataset.ncLane;let d=t.selected===o;d?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",d?"true":"false"),a.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function ae(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function qn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function Yi(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Ut(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Cd=450,Ki=8;function Ee(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Fd(e){let t=vc(e,"target-min");return t>0?t:44}function zd(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Fd(e),a=n/2,o=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=o[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,u=l.top+l.height/2,d=c-a,h=c+a,m=u-a,g=u+a;for(let w=0;w<t.length;w++){if(r===w)continue;let b=o[w];if(!b||b.width===0)continue;let p=b.left+b.width/2,f=b.top+b.height/2;Math.abs(f-u)<a*2&&(p>c?h=Math.min(h,(c+p)/2):p<c&&(d=Math.max(d,(c+p)/2))),Math.abs(p-c)<a*2&&(f>u?g=Math.min(g,(u+f)/2):f<u&&(m=Math.max(m,(u+f)/2)))}d=Math.min(d,l.left),h=Math.max(h,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${m-l.top}px`,s.style.width=`${Math.max(0,h-d)}px`,s.style.height=`${Math.max(0,g-m)}px`,s.style.transform="none"}}function Er(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Qi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function xt(e,t){switch(e.type){case"slider":return Nd(e,t);case"select":return Dd(e,t);case"toggle":return Pd(e,t);case"button":return Bd(e,t);case"readout":return Rd(e);case"label":return _d(e);case"note":return Xi(e);case"knob":return Wd(e,t);case"choice":return Gd(e,t);case"slotRow":return Vd(e,t);case"stepGrid":return Xd(e,t);case"canvas":return tu(e);case"fx":return ru(e,t);case"eqGraph":return ed(e,t);case"group":return Ed(e,t,xt);case"strip":return nu(e,t);case"stripAdd":return ou(e,t);case"padGrid":return Ad(e,t);case"moves":return Od(e,t);default:return Xi({id:"unknown",text:""})}}function ye(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Sr(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Mr(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Ut(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Yi(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Yi(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Ye(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Hd(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??Ut(t.value))}else if(t.type==="choice")Tr(e,t);else if(t.type==="slotRow")Cr(e,t);else if(t.type==="stepGrid")La(e,t);else if(t.type==="padGrid")$r(e,t);else if(t.type==="moves")Ar(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ar(n,t)}else if(t.type==="eqGraph")rr(e,t);else if(t.type==="strip"){qr(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Rt(n.id)}"]`);a instanceof Element&&ye(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")zr(e,t);else if(t.type==="group"){xr(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Rt(n.id)}"]`);a instanceof Element&&ye(a,n)}}else if(t.type==="fx"){jr(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Rt(n.id)}"]`);a instanceof Element&&ye(a,n)}}}}function Nd(e,t){let n=qn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let o=Nn(e.taper,e.min,e.max);a.min=String(o?0:e.min),a.max=String(o?1e3:e.max),a.step=String(o?1:e.step),o&&(a.dataset.ncTaper=e.taper),a.value=String(Mr(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let r=l=>o?ga(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(r(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(r(l))}),o&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let u=c.taper??e.taper,d=nr(u,c.min,c.max,c.value,l.key,l.shiftKey,c.step);d!==null&&(l.preventDefault(),a.value=String(Ua(u,c.min,c.max,d)),c.onChange(d),c.onCommit?.(d))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(qd(e,a,t),s),n.append(ae()),ye(n,e),n}function Mr(e){return Nn(e.taper,e.min,e.max)?Ua(e.taper,e.min,e.max,e.value):e.value}function qd(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Ee());let o=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return a.addEventListener("pointerdown",r=>{r.button===0&&o(r.timeStamp)}),a.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),o(r.timeStamp))}),a}function Dd(e,t){let n=qn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let o=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?o?.getAttribute("label")!==r.group&&(o=document.createElement("optgroup"),o.setAttribute("label",r.group),a.append(o)):o=null,(o??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let r=t(a);r?.type==="select"&&r.onChange(a.value)}),n.append(a,ae()),n}function Pd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ae()),ye(n,e),n}function Bd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(ae()),ye(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=Er(),o.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Fr(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,o),a}function Rd(e){let t=qn(e.id,e.label);return t.append(ae()),ye(t,e),t}var Id=450;function Od(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(jd(l.icon)),c.addEventListener("click",()=>{let u=t(n);u?.type==="moves"&&u.onMove(l.id)}),s.append(c)}o.append(r,s),n.append(o)}return Ar(n,e),n}function Ar(e,t){for(let n of t.groups)for(let a of n.moves){let o=e.querySelector(`[data-nc-move="${Rt(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function jd(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function _d(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ae()),t}function Xi(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ae()),t}function Ji(e){if(typeof e.valueText=="string")return e.valueText;let t=Ut(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Sr(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Hd(e,t){let n=Ha(t.taper,t.min,t.max,t.value);Sr(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Ji(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Ji(t)}`}function Ud(e,t){if(Nn(e.taper,e.min,e.max))return nr(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function Wd(e,t){let n=qn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let r=0,s=0;a.addEventListener("pointerdown",u=>{r=u.clientY;let d=t(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(u.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",u=>{if(a.hasPointerCapture&&!a.hasPointerCapture(u.pointerId))return;let d=t(a);if(d?.type!=="knob")return;if(Nn(d.taper,d.min,d.max)){let g=Ha(d.taper,d.min,d.max,s)-(u.clientY-r)/120;d.onChange(er(d.taper,d.min,d.max,g));return}let h=d.max-d.min||1,m=Math.min(d.max,Math.max(d.min,s-(u.clientY-r)*h/120));d.onChange(m)}),a.addEventListener("dblclick",()=>{let u=t(a);u?.type==="knob"&&typeof u.defaultValue=="number"&&u.onChange(u.defaultValue)}),a.addEventListener("keydown",u=>{let d=t(a);if(d?.type!=="knob")return;let h=Ud(d,u);h!==null&&(u.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(ae()),ye(n,e),n}function Gd(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(a.value)}),o.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(o),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let u=s[c];u instanceof HTMLButtonElement&&(r.preventDefault(),u.focus(),u.click())}),n.append(o)}return n.append(ae()),Tr(n,e),n}function Tr(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Vd(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let h=e.slots[d],m=document.createElement("span");m.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(d),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,Ee()),Yd(m,g,n,d,t),a.append(m)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Er(),o.append(Ee()),o.addEventListener("click",()=>{Fr(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let u=document.createElement("div");return u.className="nc-slot-line",u.append(a,...o?[o]:[]),n.append(u,r,ae()),Lr(n,t),Cr(n,e),n}function Zi(e,t,n,a){let o=n(e);if(o?.type!=="slotRow")return;Ft(e);let r=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(t,r)}function Yd(e,t,n,a,o){let r=0,s=0,l=0,c=!1,u=!1,d=!1,h=!1,m=()=>{window.clearTimeout(r),r=0},g=f=>{let y=f.clientX-s,v=f.clientY-l;y*y+v*v>Ki*Ki&&(c=!0,m())},w=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",p))},b=f=>{let y=r!==0&&!c&&!u;m(),w(),y&&(d=!0,Zi(n,a,o,f))},p=()=>{c=!0,m(),w()};e.addEventListener("pointerdown",f=>{f.button===0&&(w(),u=!1,c=!1,d=!1,s=f.clientX,l=f.clientY,m(),r=window.setTimeout(()=>{r=0,!c&&(u=!0,Kd(n,t,a,o))},Cd),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",p))}),e.addEventListener("contextmenu",f=>f.preventDefault()),e.addEventListener("click",f=>{if(d||u||c){d=!1,u=!1,c=!1;return}Zi(n,a,o,f)})}function Lr(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=eo("Save","store"),o=eo("Clear","clear");n.append(a,o);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ft(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let u=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(u,"store"),Ft(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(u,"clear"),Ft(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ft(e)})}function eo(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Kd(e,t,n,a){Lr(e,a);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.bottom-s.top}px`,o.querySelector("button")?.focus()}function Ft(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Cr(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let r=Number(o.dataset.ncSlot),s=t.slots[r];if(!s)continue;o.textContent=s.label,s.filled?o.dataset.filled="true":delete o.dataset.filled,s.active?o.dataset.active="true":delete o.dataset.active,s.edited?o.dataset.edited="true":delete o.dataset.edited,s.queued?o.dataset.queued="true":delete o.dataset.queued,s.queued&&s.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Fr(e){let t=e.dataset.ncLastFill||null,n=rc(t);e.dataset.ncLastFill=n;let a=sc(n);if(a)for(let[o,r]of Object.entries(a))e.style.setProperty(o,r)}function Qd(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=r=>{if(a===r)return;a=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),o(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>o(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||o(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),o(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Xd(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=p=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=p,a.append(f),f},r=o("Note"),s=o("Accent");s.dataset.ncAccentMode="";let l=p=>{for(let f of[r,s]){let y=f===p;f.setAttribute("aria-checked",y?"true":"false"),f.tabIndex=y?0:-1}};l(r);for(let p of[r,s])p.addEventListener("click",()=>l(p));a.addEventListener("keydown",p=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(p.key))return;p.preventDefault();let f=s.getAttribute("aria-checked")==="true"?r:s;l(f),f.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Qd(n,t)),e.onClear){let p=document.createElement("button");p.type="button",p.className="nc-fill nc-clear",p.dataset.ncClear="",p.textContent=e.clearLabel??"Clear",p.title="Clear every step (Undo takes it back)",p.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.onClear?.()}),c.append(p)}n.append(c);for(let p of e.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=p.label,y.setAttribute("aria-label",`Select ${p.label}`),p.lane&&(y.dataset.ncLane=String((p.lane-1)%4+1));let v=!1,E=0;y.addEventListener("pointerdown",k=>{v=!1,!(k.pointerType==="mouse"||k.button!==0)&&(E=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(v=!0,A.onSelectRow?.(A.rows.findIndex(F=>F.id===p.id),!0))},Id))});for(let k of["pointerup","pointercancel","pointerleave"])y.addEventListener(k,()=>window.clearTimeout(E));y.addEventListener("contextmenu",k=>{v&&k.preventDefault()}),y.addEventListener("click",k=>{let A=t(n);if(A?.type!=="stepGrid")return;if(v){v=!1;return}let F=A.rows.findIndex(K=>K.id===p.id),I=!!A.selectedRows&&(k.shiftKey||k.metaKey||k.ctrlKey);A.onSelectRow?.(F,I)}),y.addEventListener("keydown",k=>Jd(n,y,k));let M=[];for(let k of["mute","solo"]){if(!(k==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let F=document.createElement("button");F.type="button",F.className="nc-ms",F.dataset.ncMs=k,F.textContent=k==="mute"?"M":"S",F.setAttribute("aria-label",`${k==="mute"?"Mute":"Solo"} ${p.label}`),A.append(F,Ee()),A.addEventListener("click",()=>{let I=t(n);if(I?.type!=="stepGrid")return;let K=I.rows.findIndex(fe=>fe.id===p.id);(k==="mute"?I.onMute:I.onSolo)?.(K)}),M.push(A)}let $=document.createElement("div");$.className="nc-steps";for(let k=0;k<p.steps.length;k++){let A=document.createElement("span");A.className="nc-step-wrap";let F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${p.id}:${k}`,F.setAttribute("aria-label",`${p.label} step ${k+1}`),A.append(F,Ee()),A.addEventListener("click",I=>{let K=t(n);if(K?.type!=="stepGrid")return;let fe=K.rows.findIndex(Ce=>Ce.id===p.id),q=s.getAttribute("aria-checked")==="true";K.onToggle(fe,k,I.shiftKey||q)}),$.append(A)}if(e.onLength&&$.append(Zd(n,$,p,t)),f.append(...M,y,$),e.onDice){let k=document.createElement("button");k.type="button",k.className="nc-sparkle nc-row-dice",k.dataset.ncDice=p.id,k.setAttribute("aria-label",`Re-roll ${p.label}`),k.title=`Re-roll ${p.label}: new steps for this lane (Undo takes it back)`,k.innerHTML=Qi(),k.append(Ee()),k.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(F=>F.id===p.id))}),f.append(k)}f.addEventListener("click",k=>{if(k.target!==f)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(F=>F.id===p.id))}),to(n,$,".nc-step-wrap",t,s,()=>p.id),n.append(f)}let u=document.createElement("div");u.className="nc-pads-head";let d=(p,f,y)=>{let v=document.createElement("button");return v.type="button",v.className=p,v.textContent=f,y&&v.setAttribute("aria-label",y),v},h=d("nc-pads-step","‹","Previous lane"),m=d("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let p=t(n);p?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",La(n,p))}));for(let[p,f]of[[h,-1],[m,1]])p.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((an(y)+f)%v+v)%v)});if(u.append(h,g,m),e.onDice){let p=d("nc-pads-step nc-pads-dice","","Re-roll lane");p.dataset.ncPadsDice="",p.innerHTML=Qi(),p.addEventListener("click",()=>{let f=t(n);if(f?.type!=="stepGrid")return;let y=an(f);y>=0&&f.onDice?.(y)}),u.append(p)}if(e.transport){let p=d("nc-pads-play","Play");p.dataset.ncPadsPlay="",p.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),u.append(p)}n.append(u);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let b=Math.max(0,...e.rows.map(p=>p.steps.length));for(let p=0;p<b;p++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(p),f.textContent=String(p+1),f.addEventListener("click",y=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=an(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,p+1);return}let M=s.getAttribute("aria-checked")==="true";v.onToggle(E,p,y.shiftKey||M)}),w.append(f)}return to(n,w,".nc-pad",t,s,()=>{let p=t(n);return p?.type==="stepGrid"?p.rows[an(p)]?.id:void 0}),n.append(w),n.append(ae()),La(n,e),n}function an(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function to(e,t,n,a,o,r){let s="on",l=!0,c=-1,u=(d,h)=>{let m=d.rows[c]?.steps[h];!m||h>=d.rows[c].length||(d.onSet?d.onSet(c,h,s,l):!!m[s]!==l&&d.onToggle(c,h,s==="accent"))};xd(t,n,d=>{let h=a(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let m=h.rows.findIndex(g=>g.id===r());m>=0&&h.rows[m].length!==d.pad+1&&h.onLength?.(m,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let m=r();c=h.rows.findIndex(w=>w.id===m);let g=h.rows[c]?.steps[d.pad];if(!g)return;s=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}u(h,d.pad)}else if(d.kind==="long"){let m=r(),g=h.rows.findIndex(b=>b.id===m),w=t.querySelectorAll(n)[d.pad];g>=0&&w instanceof HTMLElement&&h.onLongPress?.(g,d.pad,w)}}})}function Jd(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],o=a.indexOf(t),r=o;n.key==="ArrowDown"?r=o+1:n.key==="ArrowUp"?r=o-1:n.key==="Home"?r=0:r=a.length-1;let s=a[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Zd(e,t,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(Ee());let r=u=>{let d=a(e);if(d?.type!=="stepGrid")return;let h=d.rows.findIndex(w=>w.id===n.id),m=d.rows[h];if(!m)return;let g=Math.max(1,Math.min(m.steps.length,u));g!==m.length&&d.onLength?.(h,g)},s=u=>{let d=[...t.querySelectorAll(".nc-step")],h=1;return d.forEach((m,g)=>{let w=m.getBoundingClientRect();w.width>0&&u>=w.left+w.width/2&&(h=g+1)}),h},l=u=>r(s(u.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",u=>{u.button===0&&(u.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",u=>{let d=a(e);if(d?.type!=="stepGrid")return;let h=d.rows.find(g=>g.id===n.id);if(!h)return;let m={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};u.key in m&&(u.preventDefault(),r(m[u.key]))}),o}var na=new WeakMap,on=new WeakMap;function eu(e){return e?(on.has(e)||(on.set(e,fa(e)),Yo(t=>{on.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Ta(n,Number(n.getAttribute("data-nc-velocity")))},e)),on.get(e)):"light"}function Ta(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:eu(e.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(na.has(e)&&na.get(e)===o)){if(na.set(e,o),n===null){for(let r of Object.keys(zi(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(zi(n,Fi[a]??Fi.light)))e.style.setProperty(r,s)}}function La(e,t){let n=t.rows.some(d=>d.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),r=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let u=e.querySelector("[data-nc-pads-play]");if(u instanceof HTMLElement){let d=!!t.transport?.playing,h=t.transport?.label??(d?"Stop":"Play");u.textContent!==h&&(u.textContent=h),u.setAttribute("aria-pressed",d?"true":"false");let m=t.transport?.ariaLabel;m?u.setAttribute("aria-label",m):u.removeAttribute("aria-label")}if(o instanceof HTMLElement&&r){o.setAttribute("aria-label",`${r.label} steps`),r.lane&&(o.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?o.dataset.silent="true":delete o.dataset.silent;let d=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let m=Number(h.getAttribute("data-nc-pad")),g=r.steps[m];h instanceof HTMLButtonElement&&(h.hidden=!g||!l&&m>=r.length,l&&m>=r.length?h.dataset.out="true":delete h.dataset.out,l&&m===r.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${r.label} step ${m+1}`),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,Ta(h,g?.velocity),t.playhead>=0&&m===d?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let d of t.rows){for(let g=0;g<d.steps.length;g++){let w=d.steps[g],b=e.querySelector(`[data-nc-step="${d.id}:${g}"]`);if(!(b instanceof HTMLButtonElement))continue;let p=b.closest(".nc-row");if(p instanceof HTMLElement){t.selectedRow===d.id?p.dataset.selected="true":delete p.dataset.selected;let v=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);v?p.dataset.picked="true":delete p.dataset.picked;let E=p.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===d.id||v?"true":"false"),E.textContent!==d.label&&(E.textContent=d.label,E.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?p.dataset.silent="true":delete p.dataset.silent;for(let M of p.querySelectorAll("[data-nc-ms]")){let $=M.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;M.setAttribute("aria-pressed",$?"true":"false")}}b.setAttribute("aria-pressed",w.on?"true":"false"),w.accent?b.dataset.accent="true":delete b.dataset.accent,w.dim?b.dataset.dim="true":delete b.dataset.dim,g%4===0?b.dataset.bar="true":delete b.dataset.bar,typeof w.velocity=="number"?(b.dataset.velocity="true",b.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete b.dataset.velocity,b.style.removeProperty("--level")),Ta(b,w.velocity);let f=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;g===f?b.dataset.playhead="true":delete b.dataset.playhead;let y=!!t.onLength&&t.selectedRow===d.id;b.hidden=g>=d.length&&!y,g>=d.length&&y?b.dataset.out="true":delete b.dataset.out}let h=e.querySelector(`[data-nc-len="${d.id}"]`),m=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&m&&m.nextElementSibling!==h){let g=document.activeElement===h;m.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(d.length)),h.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),h.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function tu(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ae()),t}function nu(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;if(r&&(n.dataset.ncFoldable="",s=Pr(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let f=t(n);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(o),e.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&y.onRemove?.(f)}),a.append(f)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let f=document.createElement("span");f.className="nc-hacks-wrap";let y=document.createElement("button");y.type="button",y.className="nc-hacks",y.dataset.ncHacks="",f.append(y,Ee()),f.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onHacks?.()}),l.append(f)}let c=document.createElement("div");c.className="nc-strip-ms";for(let f of["mute","solo"]){if(!(f==="mute"?e.onMute:e.onSolo))continue;let y=document.createElement("span");y.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=f,v.textContent=f==="mute"?"M":"S",y.append(v,Ee()),y.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(f==="mute"?E.onMute:E.onSolo)?.()}),c.append(y)}let u=document.createElement("div");u.className="nc-strip-sends";for(let f of e.sends??[])u.append(xt({...f,type:"knob",compact:!0},t));let d=document.createElement("div");d.className="nc-strip-pan",e.pan&&d.append(xt(Xa(e),t));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let f of e.ticks??[]){let y=document.createElement("span");y.className="nc-scale-tick",y.style.setProperty("--tick-pos",String(f.value)),y.textContent=f.label,m.append(y)}let g=Sc({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:f=>{let y=t(n);y?.type==="strip"&&y.onChange(f)},onReset:()=>{let f=t(n);f?.type==="strip"&&ao(f)}}),w=Nc({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let f=t(n);f?.type==="strip"&&f.onClipClear?.()}});if(h.append(m,g.el,w.el),r){let f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");let y=document.createElement("span");y.className="nc-strip-fold-cap",y.setAttribute("aria-hidden","true");let v=document.createElement("span");v.className="nc-ui-fx-fold-name",v.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,f.append(y,E,v),f.addEventListener("click",()=>{let M=t(n);if(M?.type!=="strip")return;M.onFold?.(!1);let $=n.querySelector("[data-nc-strip-hide]");$ instanceof HTMLElement&&$.focus()}),h.prepend(f)}let b=document.createElement("button");b.type="button",b.className="nc-strip-db",b.dataset.ncReadout="";let p=0;return b.addEventListener("click",f=>{let y=t(n);y?.type!=="strip"||!y.onTypeIn||(window.clearTimeout(p),f.detail===0?no(n,b,t):f.detail===1&&(p=window.setTimeout(()=>no(n,b,t),iu)))}),b.addEventListener("dblclick",()=>{window.clearTimeout(p);let f=t(n);f?.type==="strip"&&ao(f)}),s&&n.append(s),n.append(a,l,c,u,d,h,b,ae()),qr(n,e),n}function Xa(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??au(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function au(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var iu=250;function no(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??Ut(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=o.value;if(o.remove(),t.hidden=!1,l){let u=n(e);u?.type==="strip"&&u.onTypeIn?.(c)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),o.addEventListener("blur",()=>s(!1))}function ou(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",a.append(o,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;Nr(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,s,ae()),zr(n,e),n}function zr(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Nr(a))}function Nr(e){let t=e.options[0];t&&(t.selected=!0)}function ao(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function qr(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),r=o?Tc(o):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),qc(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let h=t.valueText??Ut(t.value);s.textContent!==h&&(s.textContent=h),s.setAttribute("aria-label",`${t.label} level ${h}`);let m=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${m}`:m}for(let h of e.querySelectorAll("[data-nc-ms]")){let m=h.getAttribute("data-nc-ms"),g=m==="mute"?t.mute===!0:t.solo===!0;h.setAttribute("aria-pressed",g?"true":"false"),h.setAttribute("aria-label",`${m==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let h=t.hacksLabel??"Hacks";l.textContent!==h&&(l.textContent=h),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${h}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let h=e.querySelector(`.nc-strip-pan [data-nc-id="${Rt(t.pan.id)}"]`);h&&ye(h,Xa(t))}let c=!t.master&&typeof t.onFold=="function"&&t.folded===!0;c?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let u=e.querySelector("[data-nc-strip-hide]");u instanceof HTMLElement&&(Br(u,c,t.label),Ye(u,t.foldHelp));let d=e.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!c,d.setAttribute("aria-label",`Expand ${t.label}`);let h=d.querySelector("[data-nc-strip-fold-name]");h&&h.textContent!==t.label&&(h.textContent=t.label),Ye(d,t.foldedHelp??t.foldHelp)}}function ru(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let o=typeof e.onFold=="function",r=!!e.meter;if(e.on===void 0&&!o&&!xn(e)&&!r)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),r&&s.append(Ir(n,"head")),e.on!==void 0){let l=ja({checked:e.on,labelledBy:a.id,onChange:c=>{let u=t(l.el);u?.type==="fx"&&u.onToggle?.(c)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}o&&s.append(lu(n,t)),xn(e)&&s.append(pu(n,t)),n.append(s)}o&&n.prepend(cu(n,t)),r&&Or(n,e);for(let s of e.controls)n.append(xt(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let c of e.more)s.append(xt(c,t));n.append(s)}return n.append(ae()),jr(n,e),n}var su=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Dr(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&su(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function lu(e,t){let n=Pr();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Dr(e))}),n}function Pr(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Br(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function cu(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,a,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ir(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Dr(e)}}),n}var kt=new Set;function cn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var xn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),du="(max-width: 768px)";function uu(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function pu(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(uu()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Rr(e,a,!kt.has(a.id)),n.focus())}),n}function Rr(e,t,n){n?kt.add(t.id):kt.delete(t.id),Ja(e,t)}function hu(e,t){t?.type==="fx"&&kt.has(t.id)&&Rr(e,t,!1)}function mu(e){return e.ownerDocument.defaultView?.matchMedia?.(du).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ja(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=xn(t)&&kt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!xn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),cn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&vt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Ye(n,t.maxHelp)),!a){e.dataset.ncMax&&io(e);return}if(!e.isConnected){let s=()=>e.isConnected&&kt.has(t.id)&&Ja(e,t);queueMicrotask(()=>{e.isConnected?s():cn(e.ownerDocument,s)});return}let o=mu(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&io(e),e.dataset.ncMax=o,o==="over"&&fu(e,t)),gu(e.ownerDocument),o==="over"&&Za(e),cn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&vt(s)})}function io(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),cn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&vt(n)})}function fu(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Za(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,r=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,s=Zc(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),r,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var oo=new WeakSet;function gu(e){oo.has(e)||(oo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Za(t)}))}var Ca=new WeakMap;function Ir(e,t){let n=fd(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Or(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)Ye(o,t.meterHelp);let a=Ca.get(e);a?a.set(t.meter):Ca.set(e,wd(n,t.meter))}function jr(e,t){(t.meter||Ca.has(e))&&Or(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Br(r,o,t.title),Ye(r,t.foldHelp)),Ja(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!o,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let c=s.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=l,c.hidden=l==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),Ye(s,t.foldHelp)}}function Ye(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Rt(e){return e.replace(/["\\]/g,"\\$&")}function bu(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&ar(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&vt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Za(n);zd(e)}var yu=De["toast-duration"];function wu({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function vu(e,t,n,a){let o=l=>({top:l,bottom:l+n}),r=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),s=o(t-a-n);return r(s)?r(o(a))?"bottom":"top":"bottom"}function xu(e,t,n,a,o,r){let s=e.bottom+o,l=Math.max(r,Math.min(e.left,a-r-n.width));for(let c=!0,u=0;c&&u<8;u++){c=!1;for(let d of t)d&&d.bottom>s&&d.top<s+n.height&&d.right>l&&d.left<l+n.width&&(s=d.bottom+o,c=!0)}return{top:s,left:l}}var ro="data-nc-ui-toast-live";function ku(e,t){let n=t.querySelector(`[${ro}]`);return n||(n=e.createElement("div"),n.setAttribute(ro,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function $u({message:e,actionLabel:t,onAction:n,duration:a=yu,onClose:o,avoid:r=[],anchor:s,host:l,document:c=globalThis.document}={}){l=l??c.body;let u=c.defaultView??globalThis,d=c.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,d.appendChild(h);let m=null;t&&(m=c.createElement("button"),m.type="button",m.className="nc-ui-toast-action",m.textContent=t,d.appendChild(m)),l.appendChild(d);let g="open",w=C=>C&&typeof C.getBoundingClientRect=="function"?C.getBoundingClientRect():null,b=w(d),p=b?.height||44,f=u.getComputedStyle?.(d),y=Number.parseFloat(f?.getPropertyValue(U("toast-offset")))||16,v=Number.parseFloat(f?.getPropertyValue(U("toast-anchor-gap")))||8,E=w(s),M=u.innerHeight??0,$=r.map(w).filter(Boolean),k=E&&E.bottom>0&&E.top<M?xu(E,$,{width:b?.width||0,height:p},u.innerWidth??0,v,y):null;k&&k.top+p<=M?(d.setAttribute("data-placement","anchor"),d.style.top=`${k.top+(u.scrollY??0)}px`,d.style.left=`${k.left+(u.scrollX??0)}px`):d.setAttribute("data-placement",vu($,M,p,y));let A=u.requestAnimationFrame?.bind(u)??(C=>setTimeout(C,16));A(()=>A(()=>{g==="open"&&d.setAttribute("data-state","open")})),ku(c,l).textContent=wu({message:e,actionLabel:t});let F,I,K=new Promise(C=>{I=C}),fe=C=>{clearTimeout(F),F=setTimeout(()=>et("timeout"),C)},q=a,Ce=Date.now(),Ze=()=>{g==="open"&&(clearTimeout(F),q=Math.max(0,q-(Date.now()-Ce)))},se=()=>{g==="open"&&(Ce=Date.now(),fe(q))};d.addEventListener("pointerenter",Ze),d.addEventListener("pointerleave",se),d.addEventListener("focusin",Ze),d.addEventListener("focusout",se),m?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{et("action")}}),Number.isFinite(a)&&fe(a);function et(C="close"){if(g!=="open")return;g="closing",clearTimeout(F),d.setAttribute("data-state","closing"),o?.(C);let _=u.getComputedStyle?.(d),de=_?Math.max(0,...String(_.transitionDuration||"").split(",").map(gi=>Number.parseFloat(gi)*(gi.trim().endsWith("ms")?1:1e3)||0)):0,le=()=>{g!=="gone"&&(g="gone",d.remove(),I(C))};d.addEventListener("transitionend",le),setTimeout(le,de+50)}return{el:d,close:et,closed:K}}var kn="data-nc-help";function Eu(e,t,n,a=0,o=6,r=8){let s=e.top-o-t.height,l=s>=a+r?"above":"below",c=l==="above"?s:e.bottom+o,u=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(u),side:l}}var aa=new WeakMap;function Mu(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Au({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=aa.get(e);if(n)return n;let a=e.defaultView,o=null,r=null,s,l=()=>{clearTimeout(s),r=null,o&&(o.hidden=!0)},c=m=>{let g=m.getAttribute(kn);if(!g)return;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=g,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let w=m.getBoundingClientRect(),b=Eu(w,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,Mu(e));o.style.top=`${b.top}px`,o.style.left=`${b.left}px`,o.dataset.side=b.side,o.style.visibility=""},u=m=>{if(m.pointerType==="touch")return;let g=m.target&&m.target.closest?m.target.closest(`[${kn}]`):null;g!==r&&(l(),g&&(r=g,s=setTimeout(()=>{r===g&&g.isConnected&&c(g)},t)))},d=m=>{m.key==="Escape"&&l()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let h={hide:l,uninstall(){l(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),o?.remove(),o=null,aa.delete(e)}};return aa.set(e,h),h}var Su="(max-width: 768px)",Tu='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Lu='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Cu=0;function Fu({panel:e,button:t,label:n="Menu",media:a=Su}){let o=e.ownerDocument,r=o.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Cu}`);let s=t??o.createElement("button");t||(s.type="button",s.innerHTML=Tu),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),o.addEventListener("keydown",d,!0),o.addEventListener("pointerdown",h,!0),[...e.querySelectorAll(Lu)].find(p=>!p.hidden&&p.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function u({focus:p}={}){if(!l())return;let f=e.contains(o.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),o.removeEventListener("keydown",d,!0),o.removeEventListener("pointerdown",h,!0),(p??f)&&s.focus?.({preventScroll:!0})}function d(p){p.key==="Escape"&&(p.preventDefault(),p.stopPropagation(),u({focus:!0}))}function h(p){let f=p.target;f instanceof r.Node&&(e.contains(f)||s.contains(f))||u({focus:!1})}let m=()=>l()?u({focus:!0}):c(),g=p=>{let f=p.target,y=f instanceof r.Element?f.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||u({focus:!0})};s.addEventListener("click",m),e.addEventListener("click",g);let w=r.matchMedia?.(a),b=()=>{w?.matches||u({focus:!1})};return w?.addEventListener?.("change",b),{button:s,panel:e,open:c,close:u,isOpen:l,destroy(){u({focus:!1}),s.removeEventListener("click",m),e.removeEventListener("click",g),w?.removeEventListener?.("change",b)}}}var ei="netcomposer.rhythm.hidden.v1",ke=new WeakMap;function ia(){try{return globalThis.localStorage??null}catch{return null}}function _r(e,t=ei){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function so(e,t,n,a=ei){let o=_r(e,a);n?o.add(t):o.delete(t);try{e?.setItem(a,JSON.stringify([...o]))}catch{}}function ti(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let r of o.controls)a(r)};for(let o of t)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),o.pan&&n.push(Xa(o)));return n}function Hr(e,t){if(!(!e||!t))return ti(e).find(n=>n.id===t)}function zu(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ti(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Nu(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),e.append(n),Ur(e,t)}function Ur(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function qu(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ke.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Hr(n,a)}function Du(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],o=zu(t);if(e.dataset.ncSignature===o){for(let r of a){let s=e.querySelector(`[data-nc-section="${co(r.id)}"]`);s&&Ur(s,r);for(let l of r.controls){let c=e.querySelector(`[data-nc-id="${co(l.id)}"]`);c instanceof Element&&ye(c,l)}s instanceof HTMLElement&&Fa(s,r,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),Nu(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let c of r.controls)l.append(xt(c,qu));e.append(s),Fa(s,r,n)}}function Wr(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var Pu="(max-width: 768px)",Gr=new WeakMap;function lo(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Bu(e,t){let n=[...e.children].find(u=>u.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=lo("prev"),r=lo("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,s,r,l);let c=(u,d)=>{let h=Gr.get(e);if(!h||d.getAttribute("aria-disabled")==="true")return;let m=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Wr(m,h.pageSize,(t.pages.get(h.id)??0)+u);t.pages.set(h.id,g),h.onPage?.(g),Fa(e,{...h,page:g},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===o?r:o).focus(),t.redraw()};return o.addEventListener("click",()=>c(-1,o)),r.addEventListener("click",()=>c(1,r)),e.prepend(a),a}function Fa(e,t,n){Gr.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:r,page:s}=Wr(a.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,s),r<=1){for(let p of[...e.children])p.classList.contains("nc-fx-pager")&&p.remove();delete e.dataset.ncPaged;for(let p of a)delete p.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Pu).matches===!0,c=e.closest(".nc-module");a.forEach((p,f)=>{let y=Math.floor(f/o)!==s;if(y?p.dataset.ncOffPage="":delete p.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?ke.get(c):void 0;hu(p,Hr(v,p.dataset.ncId))}});let u=Bu(e,n),d=u.querySelector('[data-nc-fx-page="prev"]'),h=u.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",s===0?"true":"false"),h.setAttribute("aria-disabled",s===r-1?"true":"false");let m=u.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${r}`;m.textContent!==g&&(m.textContent=g);let w=u.querySelector("[data-nc-fx-page-live]"),b=`Effects page ${s+1} of ${r}`;w.textContent!==b&&(w.textContent=b)}function co(e){return e.replace(/["\\]/g,"\\$&")}function Ru(e,t=ei){Xo();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=_r(ia(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let u=ja({labelledBy:r.id,onChange:y=>(ke.get(n)??e).onToggle?.(y)});u.el.dataset.ncModuleSwitch="",s.append(u.el,l,c);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",o.append(r,d,s);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",m.append(g);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,o,h,m),n.setAttribute("aria-labelledby",r.id);let b=y=>{let v=ke.get(n)??e;n.dataset.ncOpen=y?"false":"true",h.hidden=y,m.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";so(ia(),(ke.get(n)??e).id,y,t),b(y),za(n.parentElement)}),m.addEventListener("click",()=>{so(ia(),(ke.get(n)??e).id,!1,t),b(!1),za(n.parentElement)});let p={pages:new Map,redraw:()=>f.redraw()},f={el:n,update(y){ke.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=y.title,d.textContent=y.status??"",y.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),g.textContent=y.summary??y.title,u.el.hidden=y.on===void 0,u.set(y.on===!0),y.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,m.setAttribute("aria-label",`Show ${y.title}`),Du(h,y,p),b(h.hidden),f.redraw()},redraw(){let y=ke.get(n);y&&bu(n,ti(y))}};return ke.set(n,e),b(a),f.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>f.redraw()).observe(n),Yo(()=>f.redraw(),n.ownerDocument),f}function Iu(e,t,n="adjacent"){Xo(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((o,r)=>{let s=r%4+1;o.el.dataset.ncShade=String(s),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(o.el),o.redraw()}),za(e)}function za(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),a=t.map(r=>r.hasAttribute("data-nc-slim")?i("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let o=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}function Ou(e,t,n,a){const o=Math.min(n,e.length);for(let r=Math.max(0,t);r<o;r++)if(Math.abs(e[r]??0)>=a)return r;return-1}function ju(e,t,n,a=.35){let o=0;for(let l=0;l<e.length;l++)o=Math.max(o,Math.abs(e[l]??0));if(o<.01)return null;const r=[];for(const l of t){const c=Ou(e,l,l+n,o*a);c>=0&&r.push(c-l)}if(r.length*2<t.length||r.length===0)return null;r.sort((l,c)=>l-c);const s=Math.floor(r.length/2);return r.length%2?r[s]??0:((r[s-1]??0)+(r[s]??0))/2}const _u="/lucy/assets/capture-processor-7ysBkCxs.js",P=4,dn=[1,2,4,8];function $n(e){return Math.ceil(e/P-1e-6)*P+0}function Hu(e,t,n=0){let a=$n(e);return a-e<n&&(a+=P),{startBeat:a,endBeat:a+t*P}}function Uu(e,t,n,a){const o=Math.round((e+n)*a);return{startFrame:o,endFrame:o+Math.round((t-e)*a)}}function $t(e){return 60/e}function Wu(e,t,n){const a=r=>Math.round(r*4*$t(n)*t),o=dn.find(r=>a(r)>=e)??dn[dn.length-1];return{bars:o,frames:a(o),trimmed:e>a(o)}}const Gu=[0,4,8],Vu=["sound","visual","both"],Vr=0,Yr="both";function Yu(e){return Gu.includes(e)?e:Vr}function Ku(e){return Vu.includes(e)?e:Yr}const Qu=e=>e!=="visual",ni=e=>e!=="sound",Xu=1;function Ju(e,t,n,a=0,o=Xu){if(t){const s=Math.max(0,Math.floor(e/P)*P);if(e-s<=o){const l=s+Math.ceil(n/P)*P;return{countBeat:l-n,startBeat:l}}}const r=Math.max(0,$n(e+a+n));return{countBeat:r-n,startBeat:r}}function Zu(e,t,n){if(e>=n)return null;const a=n-t,o=Math.max(0,Math.floor(e-t+1e-6));return Math.max(1,a-o)}const un=.03;function ep(e,t,n,a=Number.NEGATIVE_INFINITY,o=n(t)){const r=[],s=t-e;for(let l=0;l<s;l++){const c=e+l,u=n(c);u<a||u+un>o||r.push({time:u,accent:c%P===0,n:s-l})}return r}function tp(e,t){return t===null?e:`${t} · ${e}`}const pt=["eq","compressor"],np={eq:{},compressor:{threshold_db:-18,ratio:40,makeup_db:3}};function ai(e){if(e!==void 0){const n=Dt(e,pt.length);if(n.chain.length===pt.length&&n.chain.every((a,o)=>a.type===pt[o]))return n}return{v:2,chain:pt.flatMap(n=>{const a=Ia(n);return a?[{...a,bypass:!0,dials:{...a.dials,...np[n]}}]:[]})}}const Ne={"page:title":"LUCY records a few bars from your mic, or the Studio's Master, and loops them in time with the clock. The number is this copy's, when the Studio holds more than one.",master:"LUCY's output level: the loop and the monitored mic together. Lower is quieter; 0% is silent.","action:save":"Downloads the selected take's region (between its markers) as a WAV file you can open in any audio app.","action:load":"Brings in an audio file as a new take, fitted to 1, 2, 4 or 8 bars at the current tempo. A file longer than 8 bars is trimmed.","action:panic":"Stops it all at once: cancels a take, stops the loop, turns Monitor off and clears effect tails. Play brings the loop back.","module:transport":"Play the loop, record a take and choose how many bars it lasts.","module:input":"What Record records: your mic or audio interface (its level, monitor and timing correction), or in the Studio its Master.","module:takes":"Everything you have recorded or loaded, kept in this browser, newest first. The outlined take is the one that loops.","module:hacks":"Effects on everything LUCY plays, the takes and the monitored mic: EQ, then Compressor. Both start off.",play:"Starts or stops the selected take's region looping in time. In the Studio, Stop sits LUCY out while the others play on, and Play brings it back on the next bar.",arm:"Records the chosen bars from the next bar line: the mic at once (starting the clock), the Master once the music plays. Press again to cancel.",bars:"How many bars Record captures: 1, 2, 4 or 8. The new take loops at that length.",status:"What LUCY is doing now: armed and counting in, recording, playing a take, sitting out or stopped.","record-from":"Mic records your input. Master records the whole Studio mix on the bar lines, inside the page: no monitor, and no round trip or nudge applies.","count-in":"Counts 4 or 8 beats before a Master take starts, so you can switch to another instrument's tab and play into the take. Off starts on the next bar line.",cue:"How the count-in reaches you: a click on each beat, the number in big type here and over every Studio tab, or both. The click is never in the take.",source:"The input LUCY records from: mono or stereo, and its sample rate (how many times a second it is measured).",allow:"Asks the browser for the microphone. LUCY needs it to record and to calibrate.",meter:"How loud your input is right now. Keep it below the top so takes don't distort.",monitor:"Lets you hear your input through LUCY as you play. Use headphones: on speakers it can feed back, and LUCY turns it off if it does.","input-more":"On a phone, timing correction folds away (round trip, Calibrate, Nudge): set it once. Tap to show or hide it.","input-master-more":"On a phone, the count-in before a Master take and how it reaches you. Tap to show or hide them.","hacks-cards":"On a phone, LUCY's effects fold away: the line says which are on. Tap to show the EQ and Compressor.","timing-label":"Allows for the delay between sound leaving and coming back in, so what you play on the beat lands on the beat.",roundtrip:"The delay from LUCY's output back to its input; takes are shifted by it. Until you Calibrate it is the browser's estimate.",calibrate:"Plays four clicks and listens for them to measure the round trip. Use speakers, not headphones, and keep quiet for two seconds.",nudge:"Fine-tunes the timing by up to 10 ms either way, on top of the round trip. Raise it if takes sound late, lower it if they sound early.","takes:empty":"Takes you record, or audio files you Load, appear here as cards, newest first.","take:card":"One take: click it to make it the one Record and Play act on. The outlined card is the selected one.","take:name":"The take's name. Double-click to rename it: Enter saves, Escape cancels.","take:region":"The part that plays, as bar.beat from Start to End, its length in bars and beats, and in seconds.","take:wave":"The take's sound, with its bar lines and fainter beats at the tempo it was recorded at. Outside the markers it is dimmed: that part is skipped.","take:start":"Where the take starts playing. Drag it (Alt or Option skips the snap) or use the arrow keys; double-click to put it back at the start.","take:end":"Where the take stops and loops back to Start. Drag it or use the arrow keys; double-click to put it back at the end.","take:snap":"What the markers snap to: a bar, a beat, an eighth or a sixteenth at the take's tempo, or off. Snapped, the loop is whole beats, so it sits in time.","take:normalize":"On, the take plays at the NetComposer level, so a quiet one fits the mix. Off, it plays as recorded; the audio itself is never changed.","take:normalize-gain":"How much Normalize turns this take up or down to sit at the NetComposer level. It never pushes a peak past −3 dBFS.","take:play":"Plays this take, looping its region in time with the clock; Stop stops it. Only the part between the markers plays.","take:send":"Copies this take's region onto a Sampler pad. A region of a bar or more is fitted to the nearest whole bars; a shorter one lands unfitted.","take:more":"Download this take as a WAV file, or delete it.","take:download":"Saves this take's region (between the markers) as a WAV file you can open in any audio app.","take:delete":"Deletes this take from this browser. Undo on the message that follows brings it back.","take:recording":"The take being recorded: it waits for the bar line (or for the Master's music), then fills in as the audio arrives.","take:cancel":"Stops this recording and drops it. Nothing is kept.","take:source":"Where the take came from: your Mic, the Studio's Master, or a File you loaded.","take:fact:bars":"How many bars the whole take lasts at the tempo it was recorded at.","take:fact:secs":"How long the whole take lasts, in seconds.","take:fact:bpm":"The tempo it was recorded at. At another tempo it plays faster or slower, and its pitch follows.","take:fact:chans":"Mono (one channel) or stereo (two).","take:fact:rate":"Its sample rate: how many times a second the sound was measured.","take:fact:when":"When it was recorded or loaded. Rest on it for the full date and time.","send-to":"Which Sampler gets the take, when the Studio holds more than one.","send-pad":"The pad the take goes onto. A pad that has a sample is replaced only if you say so in the Sampler, and Undo there brings it back.","send-go":"Sends the region to the chosen pad and opens the Sampler, where Undo puts the pad back. If that pad has a sample, the Sampler asks first.","send-name":"An optional name for the sample in the Sampler. Leave it empty to use the take's own name.","send-cancel":"Closes the picker without sending anything.","hack:switch":"Turns this effect on or off. Off, the sound passes through unchanged.","hack:eq":"Tone control: boost or cut the lows (below 150 Hz), the highs (above 6 kHz) and a middle band you can move.","hack:eq:low_db":"Boosts or cuts the lows, below about 150 Hz. Up is fuller and boomier, down is thinner.","hack:eq:mid_db":"Boosts or cuts the middle band set by Mid at. Up pushes that range forward, down scoops it out.","hack:eq:mid_hz":"Where the middle band sits, from 200 Hz (low) to 5 kHz (high). Move it to the range you want to boost or cut.","hack:eq:mid_q":"How wide the middle band is. Higher is narrower and more focused, lower is broader and gentler.","hack:eq:high_db":"Boosts or cuts the highs, above about 6 kHz. Up is brighter and airier, down is darker.","hack:eq:graph":"The EQ's curve over what LUCY plays right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","hack:eq:node:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","hack:eq:node:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","hack:eq:node:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","hack:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. Off, it still shows the input, greyed.","hack:max":"Opens this effect wide, over the modules beside it, so its graph is easy to see. Click again, the ×, or Escape puts it back.","hack:compressor":"Evens out the volume: loud moments are turned down, so the take sounds tighter and more even.","hack:compressor:threshold_db":"The level where turning down starts. Lower catches more of the sound, for a stronger, flatter effect.","hack:compressor:ratio":"How hard loud parts are turned down above the threshold. 1:1 does nothing; higher squashes more.","hack:compressor:attack_ms":"How quickly it turns down once the sound gets loud. Slower lets the start of each note punch through.","hack:compressor:release_ms":"How quickly it lets go once the sound gets quieter. Short recovers fast; long is smoother and steadier.","hack:compressor:makeup_db":"Turns the result back up after compression, to win back the lost volume."};function Kr(e){return`lucy-help-${e.replace(/[^\w-]/g,"-")}`}function ap(e=document){const t=e.querySelector("[data-lucy-help]");if(t)return t;const n=e.createElement("div");n.hidden=!0,n.dataset.lucyHelp="";for(const[a,o]of Object.entries(Ne)){const r=e.createElement("span");r.id=Kr(a),r.textContent=o,n.append(r)}return e.body.append(n),n}function N(e,t,...n){const a=Ne[e];if(!a)return;t&&t.getAttribute(kn)!==a&&t.setAttribute(kn,a);const o=Kr(e);for(const r of n)r&&r.getAttribute("aria-describedby")!==o&&r.setAttribute("aria-describedby",o)}function ip(e,t,n,a=o=>o){const o=`module:${t}`;N(o,e.querySelector(".nc-module-hd .nc-title")),N(o,e.querySelector(".nc-slim"));const r=l=>e.querySelector(`[data-nc-id="${l.replace(/["\\]/g,"\\$&")}"]`),s=l=>{const c=r(l.id);if(!c)return;const u=a(l.id);switch(l.type){case"slider":case"select":N(u,c.querySelector(".nc-label"),c.querySelector("input, select"));break;case"readout":case"canvas":N(u,c.querySelector(".nc-label"));break;case"button":N(u,c,c);break;case"choice":N(u,c,...c.querySelectorAll("[data-nc-choice]"));break;case"label":N(u,c);break;case"group":N(u,c.querySelector(":scope > .nc-group-toggle"),c.querySelector(":scope > .nc-group-toggle"));for(const d of l.controls??[])s(d);break;case"fx":{N(u,c.querySelector(".nc-ui-fx-name"),c.querySelector("[data-nc-fx-switch]")),N("hack:switch",c.querySelector("[data-nc-fx-switch]")),N("hack:meter",null,...c.querySelectorAll("[data-nc-fx-level]"));for(const d of[...l.controls??[],...l.more??[]])s(d);break}}};for(const l of n)s(l)}const op=48e3;function rp(e,t){try{const n=e?.latency?.(t);return typeof n=="number"&&Number.isFinite(n)&&n>0&&n<=op?Math.round(n):0}catch{return 0}}function sp(e,t){return{from:e.from+t,to:e.to+t}}const lp="instance",cp=99;function Kt(e=typeof location>"u"?"":location.search){const t=new URLSearchParams(e).get(lp)?.trim()??"";if(!/^\d+$/.test(t))return 1;const n=Number(t);return n>=2&&n<=cp?n:1}function uo(e,t){return t===1?e:`${e}#${t}`}function dp(e,t){return t===1?e:`${e} ${t}`}let ot;function up(e,t=Kt()){if(ot!==void 0)return ot;ot=null;try{if(typeof window>"u"||window.parent===window)return ot;const n=window.parent.ncStudio;n&&n.version===1&&(ot=n.attach(e,{instance:t}))}catch{}return ot}function pp(){let e;try{if(typeof window<"u"&&window.parent!==window){const a=window.parent.ncStudio;a&&a.version===1&&typeof a.syncScope=="string"&&a.syncScope&&(e=a.syncScope)}}catch{}if(!e)return{};const t=`/studio/${e}`,n=globalThis.navigator?.locks??null;return{channel:`nc-sync${t}`,locks:n?{request:(a,o,r)=>n.request(`${a}${t}`,o,r)}:null}}function hp(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1&&typeof e.fxWorklet=="string"&&e.fxWorklet?e.fxWorklet:null}catch{return null}}function ii(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.grab?e.grab:null}catch{return null}}function Qr(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.countIn?e.countIn:null}catch{return null}}function Ke(){try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e?.version===1&&e.play?e.play:null}catch{return null}}function Ie(e,t=Kt()){return t>1?`${e}#${t}`:e}function mp(e,t=Kt()){const n=Ke()?.owner()??null;return n===null||n==="studio"||n===Ie(e,t)}const oa="master",fp=1,gp=6e3;function bp(e,t,n=0,a=fp){if(t){const r=Math.max(0,Math.floor(e/P)*P);return e-r<=a?r:$n(e)}let o=Math.max(0,$n(e));return o-e<n&&(o+=P),o}function yp(e,t,n,a){const o=Math.round(e*a);return{from:o,to:o+wp(t,n,a)}}function wp(e,t,n){return Math.round(e*P*60/t*n)}class vp{constructor(t){this.deps=t}current={kind:"idle"};rec=null;stopTimer=null;job=0;startSeconds=null;get phase(){return this.current}get busy(){return this.current.kind!=="idle"}press(){this.busy?this.cancel():this.arm()}arm(){if(this.busy)return!0;const t=this.deps.grab();return t?.record?(t.listen(oa),this.set({kind:"waiting"}),this.deps.running()&&this.start(!1),!0):(this.deps.failed("unavailable"),!1)}cancel(){this.drop(),this.set({kind:"idle"})}clockChanged(t){if(this.current.kind==="waiting"&&this.deps.running())this.start(t);else if(this.current.kind==="recording"&&!this.deps.running()){const n=this.current,a=this.deps.now?.();if(n.countBeat<n.startBeat&&a!==void 0&&a<(this.startSeconds??0)){this.drop(),this.set({kind:"waiting"});return}this.drop(),this.set({kind:"idle"}),this.deps.failed("stopped")}}start(t){const n=this.deps.grab(),a=this.deps.beatNow(),o=Math.max(0,Math.round(this.deps.countIn?.()??0)),{countBeat:r,startBeat:s}=o>0?Ju(a,t,o,this.deps.leadBeats()):(()=>{const f=bp(a,t,this.deps.leadBeats());return{countBeat:f,startBeat:f}})(),l=this.deps.bars(),c=this.deps.bpm(),u=this.deps.sampleRate(),{from:d,to:h}=sp(yp(this.deps.contextTime(s),l,c,u),rp(n??null,oa)),m=n?.record?.(oa,d)??null;if(!m){this.set({kind:"idle"}),this.deps.failed("unavailable");return}const g=++this.job,w=this.deps.nextId();this.rec=m,this.startSeconds=this.deps.contextTime(s),this.set({kind:"recording",id:w,countBeat:r,startBeat:s,endBeat:s+l*P,bars:l,bpm:c,from:d,to:h});const b=(h-d)/u*1e3,p=Math.max(0,(this.deps.contextTime(s)-this.nowContext())*1e3);this.stopTimer=this.deps.after(p+b+gp,()=>{g===this.job&&(this.drop(),this.set({kind:"idle"}),this.deps.failed("timeout"))}),m.stop(h).then(f=>this.finish(g,f),()=>this.finish(g,null))}nowContext(){return this.deps.contextTime(this.deps.beatNow())}finish(t,n){if(t!==this.job||this.current.kind!=="recording")return;const a=this.current;this.stopTimer?.(),this.stopTimer=null,this.rec=null,this.set({kind:"idle"});const o=n?.[0]?.length??0;if(!n||o===0){this.deps.failed("empty");return}this.deps.done({id:a.id,bars:a.bars,bpm:a.bpm,startBeat:a.startBeat,from:a.from,to:a.to,channels:n})}drop(){this.job++,this.stopTimer?.(),this.stopTimer=null,this.rec?.cancel(),this.rec=null,this.startSeconds=null}set(t){this.current=t,this.deps.changed()}}function xp(e){let t=0;for(const n of e)for(const a of n)t=Math.max(t,Math.abs(a));return t}const kp=-16,$p=-3,Xr=24,Ep=3,Mp=-80,po=e=>e>0?20*Math.log10(e):Number.NEGATIVE_INFINITY;function Ap(e,t,n=Ep){const a=e[0]?.length??0;if(!a||!e.length)return{rmsDb:Number.NEGATIVE_INFINITY,peakDb:Number.NEGATIVE_INFINITY};const o=Math.max(1,Math.round(t*.01)),r=Math.ceil(a/o),s=new Float64Array(r);let l=0;for(const g of e)for(let w=0;w<a;w++){const b=g[w]??0;s[w/o|0]+=b*b;const p=b<0?-b:b;p>l&&(l=p)}const c=Math.min(r,Math.max(1,Math.round(n*t/o))),u=c===r?a:c*o;let d=0;for(let g=0;g<c;g++)d+=s[g];let h=d;for(let g=c;g<r;g++)d+=s[g]-s[g-c],d>h&&(h=d);const m=Math.max(0,h)/(u*e.length);return{rmsDb:po(Math.sqrt(m)),peakDb:po(l)}}function Sp(e){if(!Number.isFinite(e.rmsDb)||e.rmsDb<Mp)return 0;let t=Math.min(kp-e.rmsDb,Xr);return Number.isFinite(e.peakDb)&&(t=Math.min(t,$p-e.peakDb)),Math.round(t*10)/10}function Dn(e,t){return Sp(Ap(e,t))}function Jr(e){const t=e.normalize;return t?.on?10**(t.gainDb/20):1}function Tp(e){if(!e||typeof e!="object")return;const t=e;if(typeof t.on!="boolean")return;const n=t.gainDb;if(!(typeof n!="number"||!Number.isFinite(n)||n<-60||n>Xr))return{on:t.on,gainDb:n}}function Lp(e){const t=Math.round(e*10)/10;return t===0?"0.0 dB":`${t>0?"+":"−"}${Math.abs(t).toFixed(1)} dB`}const Pn=600;class En{constructor(t,n=Pn){this.totalFrames=t,this.columns=n,this.peaks=new Float32Array(n*2)}peaks;at=0;get filled(){return this.totalFrames<=0?0:Math.min(this.columns,Math.ceil(this.at/this.totalFrames*this.columns))}get frames(){return this.at}add(t){const n=t[0]?.length??0;if(!n||this.totalFrames<=0)return;const a=this.totalFrames/this.columns;let o=0;for(;o<n&&this.at<this.totalFrames;){const r=Math.min(this.columns-1,Math.floor(this.at/a)),s=Math.min(this.totalFrames,Math.ceil((r+1)*a)),l=Math.max(1,Math.min(n-o,s-this.at));let c=this.peaks[r*2]??0,u=this.peaks[r*2+1]??0;for(const d of t)for(let h=o;h<o+l;h++){const m=d[h]??0;m<c&&(c=m),m>u&&(u=m)}this.peaks[r*2]=Math.max(-1,c),this.peaks[r*2+1]=Math.min(1,u),o+=l,this.at+=l}}}function Bn(e,t=Pn){const n=new En(e[0]?.length??0,t);return n.add(e),n.peaks}function ho(e,t=e.length/2,n=.01){const a=Math.min(e.length/2,Math.max(0,Math.floor(t)));if(!a)return"";const o=l=>Math.round(l*1e3)/1e3,r=[],s=[];for(let l=0;l<a;l++){const c=Math.max(e[l*2+1]??0,n);r.push(`${l} ${o(-c)}`,`${l+1} ${o(-c)}`)}for(let l=a-1;l>=0;l--){const c=Math.min(e[l*2]??0,-n);s.push(`${l+1} ${o(-c)}`,`${l} ${o(-c)}`)}return`M${r.join("L")}L${s.join("L")}Z`}function Cp(e,t=Date.now()){const n=Date.parse(e);if(!Number.isFinite(n))return"";const a=Math.max(0,(t-n)/1e3);if(a<45)return"just now";const o=Math.round(a/60);if(o<60)return`${o} min ago`;const r=Math.round(o/60);if(r<24)return`${r} h ago`;const s=Math.round(r/24);return s===1?"yesterday":s<7?`${s} days ago`:new Date(n).toLocaleDateString(void 0,{day:"numeric",month:"short"})}function Fp(e){const t=Date.parse(e);return Number.isFinite(t)?new Date(t).toLocaleString(void 0,{dateStyle:"medium",timeStyle:"short"}):""}const ct=["off","bar","beat","8","16"],zp="beat",Np={off:"Off",bar:"Bar",beat:"Beat",8:"1/8",16:"1/16"};function Me(e){return 60/e.bpm*e.sampleRate}function Zr(e,t){const n=Me(e);switch(t){case"bar":return n*P;case"beat":return n;case"8":return n/2;case"16":return n/4;default:return null}}function es(e){return Math.min(e.frames,Math.max(1,Math.round(Me(e)/4)))}function Le(e){return e.region??{start:0,end:e.frames}}function qp(e,t){return t.start<=0&&t.end>=e.frames}function Dp(e,t,n){const a=Zr(e,n),o=Math.max(0,Math.min(e.frames,t));if(a===null)return Math.round(o);const r=Math.round(Math.round(o/a)*a);return Math.abs(e.frames-o)<Math.abs(r-o)?e.frames:Math.max(0,Math.min(e.frames,r))}function zt(e,t,n){const a=Le(e),o=es(e),r=Math.round(n);return t==="start"?{start:Math.max(0,Math.min(r,a.end-o)),end:a.end}:{start:a.start,end:Math.min(e.frames,Math.max(r,a.start+o))}}function Pp(e,t){if(!t||typeof t!="object")return;const n=t,a=n.start,o=n.end;if(typeof a!="number"||typeof o!="number"||!Number.isFinite(a)||!Number.isFinite(o))return;const r=Math.round(a),s=Math.round(o);if(!(r<0||s>e.frames||s-r<es(e))&&!(r===0&&s===e.frames))return{start:r,end:s}}function mo(e,t,n,a,o=!1){const r=Le(e),s=t==="start"?r.start:r.end,l=o?Me(e)*P:Zr(e,a)??Me(e)/4,c=s/l,d=Math.abs(c-Math.round(c))*l<.5?Math.round(c)+n:n>0?Math.ceil(c):Math.floor(c);let h=Math.round(d*l);return n>0&&h>e.frames&&(h=e.frames),n>0&&Math.abs(e.frames-h)<1&&(h=e.frames),zt(e,t,h)}function fo(e,t){const n=t/Me(e)*4,a=Math.round(n),o=Math.abs(n-a)*(Me(e)/4)<1,r=o?a:Math.floor(n),s=Math.floor(r/16)+1,l=Math.floor(r%16/4)+1,c=r%4+1;return`${o?"":"≈"}${s}.${l}${c===1?"":`.${c}`}`}function Bp(e){const t=Math.round(e*1e3)/1e3,n=Math.floor((t+1e-9)/P),a=Math.round((t-n*P)*1e3)/1e3,o=[];if(n&&o.push(`${n} bar${n===1?"":"s"}`),a>0||!n){const r=Number.isInteger(a)?String(a):String(Math.round(a*100)/100);o.push(`${r} beat${a===1?"":"s"}`)}return o.join(" ")}function oi(e,t=Le(e)){return(t.end-t.start)/Me(e)}function Rp(e,t=Le(e)){const n=(t.end-t.start)/e.sampleRate;return`${fo(e,t.start)} → ${fo(e,t.end)} · ${Bp(oi(e,t))} · ${n.toFixed(2)} s`}function Ip(e,t,n){const a=Math.round(n/Me(e)*4),o=Math.floor(a/16)+1,r=Math.floor(a%16/4)+1;return`${t==="start"?"Start":"End"}: ${(n/e.sampleRate).toFixed(2)} s, bar ${o} beat ${r}`}function Op(e,t=Le(e)){const n=oi(e,t)/P;return n>=1-1e-6?Math.max(1,Math.round(n)):void 0}function ts(e,t){return e.map(n=>n.slice(t.start,t.end))}function jp(e,t,n=0){let a=Math.ceil(e/P-1e-6)*P+0;a-e<n&&(a+=P);const o=Math.max(1e-6,t),r=(a%o+o)%o;return{startBeat:a,offsetBeats:Math.abs(r-o)<1e-6?0:r}}function _p(e){const t=Me(e),n=[],a=[],o=Math.floor(e.frames/t+1e-6);for(let r=1;r<=o;r++){const s=r*t/e.frames;if(s>=1-1e-6)break;(r%P===0?n:a).push(s)}return{bars:n,beats:a}}const Hp={mic:"Mic",master:"Master",file:"File"},ns=40;function as(e){return e.source??(e.name===`Master ${e.id}`?"master":"mic")}function Lt(e){return e.snap??zp}function Up(e,t){e.source??=as(e);const n=t.replace(/\s+/g," ").trim().slice(0,ns);return!n||n===`Take ${e.id}`?e.name=void 0:e.name=n,e.name}const ft={bars:2,monitor:!1,roundTripMs:null,nudgeMs:0,takes:[],selected:null,nextId:1,master:1,source:"mic",countIn:Vr,cue:Yr};function ue(e){return e.name??`Take ${e.id}`}const go=new Set([1,2,4,8]);function Rn(e){const t=e&&typeof e=="object"?e:{},n=(l,c,u)=>typeof l=="number"&&Number.isFinite(l)&&l>=c&&l<=u?l:null,a=Array.isArray(t.takes)?t.takes.flatMap(l=>{const c=l&&typeof l=="object"?l:{},u=n(c.id,1,1e9),d=n(c.bars,1,8),h=n(c.bpm,20,300),m=n(c.sampleRate,8e3,192e3),g=n(c.channels,1,2),w=n(c.frames,0,1e9);if(u===null||d===null||!go.has(d)||h===null||m===null||g===null||w===null)return[];if(c.saved!==!0)return[];const b=typeof c.name=="string"&&c.name.trim()?c.name.trim().slice(0,ns):void 0,p={id:u,bars:d,bpm:h,sampleRate:m,channels:g,frames:w,created:String(c.created??""),saved:!0,...b?{name:b}:{}};(c.source==="mic"||c.source==="master"||c.source==="file")&&(p.source=c.source);const f=Pp(p,c.region);f&&(p.region=f),typeof c.snap=="string"&&ct.includes(c.snap)&&(p.snap=c.snap);const y=Tp(c.normalize);return y&&(p.normalize=y),[p]}):[],o=n(t.bars,1,8),r=n(t.selected,1,1e9),s=Math.max(n(t.nextId,1,1e9)??1,...a.map(l=>l.id+1));return{bars:o!==null&&go.has(o)?o:ft.bars,monitor:typeof t.monitor=="boolean"?t.monitor:ft.monitor,roundTripMs:n(t.roundTripMs,0,1e3),nudgeMs:n(t.nudgeMs,-10,10)??0,takes:a,selected:r!==null&&a.some(l=>l.id===r)?r:a.at(-1)?.id??null,nextId:s,master:n(t.master,0,1)??ft.master,source:t.source==="master"?"master":"mic",countIn:Yu(t.countIn),cue:Ku(t.cue),...t.fx&&typeof t.fx=="object"?{fx:t.fx}:{}}}function Wp(e,t=is()){try{const n=t?.getItem(e);return n?Rn(JSON.parse(n)):{...ft,takes:[]}}catch{return{...ft,takes:[]}}}function Gp(e,t,n=is()){try{n?.setItem(e,JSON.stringify(t))}catch{}}function is(){try{return globalThis.localStorage??null}catch{return null}}function Vp(e,t){return(e??"").replace(/\s+/g," ").trim().slice(0,60)||ue(t)}function Yp(e,t){const n=Le(e),a=Op(e,n);return{name:ue(e),sampleRate:e.sampleRate,channels:ts(t,n),...a!==void 0?{bars:a}:{},bpm:e.bpm}}class Kp{constructor(t,n){this.state=t,this.removeFile=n}pending=new Map;delete(t){const n=this.state.takes.findIndex(o=>o.id===t),a=this.state.takes[n];return a?(this.pending.set(t,{meta:a,index:n,selected:this.state.selected===t}),this.state.takes.splice(n,1),this.state.selected===t&&(this.state.selected=null),!0):!1}undo(t){const n=this.pending.get(t);return n?(this.pending.delete(t),this.state.takes.some(a=>a.id===t)||this.state.takes.splice(Math.min(n.index,this.state.takes.length),0,n.meta),n.selected&&(this.state.selected=t),n.meta):null}async settle(t){this.pending.delete(t)&&await this.removeFile(t)}get held(){return[...this.pending.keys()]}}function rt(e,t){return`${e}-take-${t}.f32`}function Qp(e){return e.channels*e.frames*4}class Xp{constructor(t){this.prefix=t}memory=new Map;dir=null;ready=Promise.resolve();adopt(t,n){return t===this.prefix||!n.length?this.ready:(this.ready=(async()=>{const a=await this.folder();if(a)for(const o of n){try{await a.getFileHandle(rt(this.prefix,o));continue}catch{}try{const r=await(await a.getFileHandle(rt(t,o))).getFile(),l=await(await a.getFileHandle(rt(this.prefix,o),{create:!0})).createWritable?.();if(!l)continue;await l.write(await r.arrayBuffer()),await l.close()}catch{}}})(),this.ready)}folder(){return this.dir??=(async()=>{try{const t=await navigator.storage?.getDirectory?.();return t?await t.getDirectoryHandle("lucy",{create:!0}):null}catch{return null}})(),this.dir}async save(t,n){this.memory.set(t,n),await this.ready;const a=await this.folder();if(!a)return!1;try{const r=await(await a.getFileHandle(rt(this.prefix,t),{create:!0})).createWritable?.();if(!r)return!1;for(const s of n)await r.write(s);return await r.close(),!0}catch{return!1}}async load(t){const n=this.memory.get(t.id);if(n)return n.length===t.channels&&n.every(o=>o.length===t.frames)?n:null;await this.ready;const a=await this.folder();if(!a)return null;try{const o=await(await a.getFileHandle(rt(this.prefix,t.id))).getFile();if(o.size!==Qp(t))return null;const r=new Float32Array(await o.arrayBuffer()),s=Array.from({length:t.channels},(l,c)=>r.slice(c*t.frames,(c+1)*t.frames));return this.memory.set(t.id,s),s}catch{return null}}async remove(t){this.memory.delete(t),await this.ready;const n=await this.folder();try{await n?.removeEntry(rt(this.prefix,t))}catch{}}}function Jp(e,t){const n=e[0]?.length??0,a=e.length,o=n*a*4,r=new DataView(new ArrayBuffer(44+o)),s=(c,u)=>{for(let d=0;d<u.length;d++)r.setUint8(c+d,u.charCodeAt(d))};s(0,"RIFF"),r.setUint32(4,36+o,!0),s(8,"WAVE"),s(12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,3,!0),r.setUint16(22,a,!0),r.setUint32(24,t,!0),r.setUint32(28,t*a*4,!0),r.setUint16(32,a*4,!0),r.setUint16(34,32,!0),s(36,"data"),r.setUint32(40,o,!0);let l=44;for(let c=0;c<n;c++)for(let u=0;u<a;u++)r.setFloat32(l,e[u]?.[c]??0,!0),l+=4;return new Uint8Array(r.buffer)}const ri="netcomposer.lucy",Mn=1;function Zp(e){const{roundTripMs:t,nudgeMs:n,...a}=Rn(JSON.parse(JSON.stringify(e)));return{format:ri,v:Mn,...a,fx:ai(a.fx)}}function eh(e,t){const n=th(t);return{...n,roundTripMs:e.roundTripMs,nudgeMs:e.nudgeMs,nextId:Math.max(n.nextId,e.nextId)}}function th(e){if(!e||typeof e!="object"||Array.isArray(e))throw new Error("Not a LUCY preset: expected an object.");const t=e;if(t.format!==void 0&&t.format!==ri)throw new Error(`Not a LUCY preset: format ${String(t.format)}.`);if(t.v!==void 0){if(typeof t.v!="number"||!Number.isInteger(t.v)||t.v<0)throw new Error("Not a LUCY preset: bad version.");if(t.v>Mn)throw new Error(`LUCY preset v${t.v} is newer than this LUCY (v${Mn}).`)}if(!Array.isArray(t.takes)||typeof t.bars!="number")throw new Error("Not a LUCY preset: no takes or length.");const n=Rn(t);return{...n,fx:ai(n.fx)}}function nh(e){return e.replace(/[\\/]/g,"~")}function ah(e,t=Kt()){const n=uo("lucy.state",t),a=uo("lucy",t),o=typeof e?.storageKey=="function"?e.storageKey.bind(e):null;return o?{state:o("lucy.state"),files:nh(o("lucy")),legacyState:n,legacyFiles:a}:{state:n,files:a,legacyState:n,legacyFiles:a}}function ih(e,t){if(!t||e.state===e.legacyState)return null;try{if(t.getItem(e.state)!==null)return null;const n=t.getItem(e.legacyState);let a={...ft,takes:[]};if(n)try{a=Rn(JSON.parse(n))}catch{}return t.setItem(e.state,JSON.stringify(a)),n?a.takes.map(o=>o.id):null}catch{return null}}const It="http://www.w3.org/2000/svg";function T(e,t,n={},...a){const o=document.createElement(e);t&&(o.className=t);for(const[r,s]of Object.entries(n))o.setAttribute(r,s);return o.append(...a),o}function Q(e,t){e.textContent!==t&&(e.textContent=t)}function ie(e,t,n){n===null?e.hasAttribute(t)&&e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function st(e,t,n){ie(e,`data-${t}`,n?"true":null)}function bo(){const e=document.createElementNS(It,"svg");e.setAttribute("class","lucy-wave-svg"),e.setAttribute("viewBox",`0 -1 ${Pn} 2`),e.setAttribute("preserveAspectRatio","none"),e.setAttribute("aria-hidden","true");const t=r=>{const s=document.createElementNS(It,"path");return s.setAttribute("class",r),e.append(s),s},n=t("lucy-wave-env"),a=t("lucy-wave-beats"),o=t("lucy-wave-bars");return{svg:e,beats:a,bars:o,env:n}}function oh(){const e=document.createElementNS(It,"svg");e.setAttribute("class","lucy-take-play-icon"),e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("aria-hidden","true");const t=document.createElementNS(It,"path");t.setAttribute("class","lucy-icon-play"),t.setAttribute("d","M7 5 L19 12 L7 19 Z");const n=document.createElementNS(It,"path");return n.setAttribute("class","lucy-icon-stop"),n.setAttribute("d","M6 6 H18 V18 H6 Z"),e.append(t,n),e}function ra(e){return e.map(t=>`M${Math.round(t*Pn*100)/100} -1V1`).join("")}class rh{constructor(t){this.on=t,this.el=T("div","lucy-takes"),this.list=T("div","lucy-take-list",{role:"list"}),this.emptyLine=T("p","lucy-takes-empty"),N("takes:empty",this.emptyLine),this.el.append(this.emptyLine,this.list),document.addEventListener("pointerdown",n=>{this.openMenu&&!this.openMenu.root.querySelector(".lucy-take-more-wrap")?.contains(n.target)&&this.closeMenu()})}el;list;emptyLine;cards=new Map;live=null;openMenu=null;render(t){this.renderLive(t.live);const n=!t.takes.length&&!t.live;if(this.emptyLine.hidden=!n,n){Q(this.emptyLine,""),this.emptyLine.firstChild||this.emptyLine.append(T("span","lucy-takes-empty-line",{},"No takes yet. Record or load a WAV."),T("span","lucy-takes-empty-hint"));const r=this.emptyLine.querySelector(".lucy-takes-empty-hint");r&&Q(r,t.hint)}const a=new Set;let o=this.live?.root??null;for(const r of t.takes){a.add(r.id);let s=this.cards.get(r.id);s||(s=this.create(r),this.cards.set(r.id,s)),this.update(s,r,t),(o?o.nextElementSibling:this.list.firstElementChild)!==s.root&&(o?o.after(s.root):this.list.prepend(s.root)),o=s.root}for(const[r,s]of this.cards)a.has(r)||(this.openMenu===s&&(this.openMenu=null),s.root.remove(),this.cards.delete(r))}setPlayhead(t,n){for(const a of this.cards.values()){const o=a.id===t&&n>=0;if(o){const r=n.toFixed(4);a.wave.style.getPropertyValue("--lucy-at")!==r&&a.wave.style.setProperty("--lucy-at",r)}st(a.wave,"head",o)}}card(t){return this.cards.get(t)?.root}renderLive(t){if(!t){this.live?.root.remove(),this.live=null;return}if(!this.live){const r=T("span","lucy-take-live-label",{"aria-live":"polite"}),s=T("button","nc-page-action lucy-take-action",{type:"button"},"Cancel");s.addEventListener("click",()=>this.on.cancelRecording()),N("take:cancel",s,s);const{svg:l,bars:c,env:u}=bo(),d=T("span","lucy-take-count",{"aria-hidden":"true",hidden:""}),h=T("div","lucy-take-wave",{"data-live":"true"},l,d),m=T("span","lucy-take-name lucy-take-name-live",{},"New take"),g=T("article","lucy-take",{"data-live":"true",role:"listitem","aria-label":"Recording"},T("div","lucy-take-hd",{},m,r,T("div","lucy-take-actions",{},s)),h);N("take:recording",r),this.list.prepend(g),this.live={root:g,label:r,count:d,env:u,bars:c,drawn:""}}Q(this.live.label,t.label);const n=t.count??null;this.live.count.hidden=n===null,Q(this.live.count,n===null?"":String(n));const a=t.bars.join(",");this.live.bars.dataset.key!==a&&(this.live.bars.dataset.key=a,this.live.bars.setAttribute("d",ra(t.bars)));const o=t.peaks?`${t.filled}`:"";o!==this.live.drawn&&(this.live.drawn=o,this.live.env.setAttribute("d",t.peaks?ho(t.peaks,t.filled):"")),this.list.firstElementChild!==this.live.root&&this.list.prepend(this.live.root)}create(t){const n=t.id,a=T("h3","lucy-take-name",{tabindex:"0"}),o=T("span","lucy-take-region nc-readout"),r=(C,_)=>{const de=T("button","nc-page-action lucy-take-action",{type:"button","data-take-action":_},C);return N(`take:${_}`,de,de),de},s=T("button","lucy-take-play",{type:"button","data-take-action":"play","aria-label":"Play","aria-pressed":"false"},oh());N("take:play",s,s);const l=T("span","lucy-take-source");N("take:source",l);const c=r("Send to Sampler","send"),u=T("button","nc-page-action lucy-take-action lucy-take-more",{type:"button","aria-haspopup":"menu","aria-expanded":"false","aria-label":"More actions","data-take-action":"more"},"⋯");N("take:more",u,u);const d=T("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"download"},"Download WAV"),h=T("button","lucy-take-menu-item",{type:"button",role:"menuitem","data-take-action":"delete"},"Delete");N("take:download",d,d),N("take:delete",h,h);const m=T("div","lucy-take-menu",{role:"menu"},d,h);m.hidden=!0;const g=T("div","lucy-take-actions",{},c,T("span","lucy-take-more-wrap",{},u,m)),{svg:w,env:b}=bo(),p=C=>{const _=T("div","lucy-take-marker",{role:"slider",tabindex:"0","data-marker":C,"aria-orientation":"horizontal"});return N(`take:${C}`,_,_),_},f={start:p("start"),end:p("end")},y=T("span","lucy-take-wave-empty"),v=T("div","lucy-take-barnums",{"aria-hidden":"true"}),E=T("div","lucy-take-wave",{role:"group"},v,w,T("div","lucy-take-dim",{"data-side":"start"}),T("div","lucy-take-dim",{"data-side":"end"}),T("div","lucy-take-playhead",{"aria-hidden":"true"},T("span","lucy-take-playhead-line")),f.start,f.end,y);E.style.setProperty("--lucy-at","-1"),N("take:wave",E);const M=C=>{const _=T("span","lucy-take-fact",{"data-fact":C});return N(`take:fact:${C}`,_),_},$={bars:M("bars"),secs:M("secs"),bpm:M("bpm"),chans:M("chans"),rate:M("rate"),when:M("when")},k=T("span","lucy-take-snap-label",{id:`lucy-snap-${n}`},"Snap"),A=T("span","nc-choice-row lucy-take-snap",{role:"radiogroup","aria-labelledby":`lucy-snap-${n}`});for(const C of ct){const _=T("button","nc-choice lucy-take-snap-opt",{type:"button",role:"radio","data-snap":C,"aria-checked":"false",tabindex:"-1"},Np[C]);_.addEventListener("click",()=>this.on.setSnap(n,C)),A.append(_)}A.addEventListener("keydown",C=>{const _=C.key==="ArrowRight"||C.key==="ArrowDown"?1:C.key==="ArrowLeft"||C.key==="ArrowUp"?-1:0;if(!_)return;C.preventDefault();const de=ct.indexOf(Lt(se.meta)),le=ct[(de+_+ct.length)%ct.length]??"beat";this.on.setSnap(n,le),A.querySelector(`[data-snap="${le}"]`)?.focus()}),N("take:snap",k,A);const F=T("span","lucy-take-snap-label",{id:`lucy-norm-${n}`},"Normalize"),I=ja({checked:t.normalize?.on===!0,labelledBy:`lucy-norm-${n}`,onChange:C=>this.on.setNormalize(n,C)});I.el.classList.add("lucy-take-norm");const K=T("span","lucy-take-norm-gain");N("take:normalize",F,I.el),N("take:normalize-gain",K);const fe=T("div","lucy-take-facts nc-readout",{},...Object.values($),T("span","lucy-take-norm-wrap",{},F,I.el,K),T("span","lucy-take-snap-wrap",{},k,A)),q=T("div","lucy-take-picker");q.hidden=!0;const Ce=T("p","lucy-take-note",{"aria-live":"polite"});Ce.hidden=!0;const Ze=T("article","lucy-take",{role:"listitem","data-take":String(n)},T("div","lucy-take-hd",{},s,T("div","lucy-take-title",{},a,l,o),g),E,fe,q,Ce);N("take:card",null,Ze),N("take:name",a),N("take:region",o);const se={id:n,root:Ze,name:a,region:o,play:s,sourcePill:l,barNums:v,send:c,more:u,menu:m,download:d,remove:h,wave:E,env:b,empty:y,markers:f,facts:$,snap:A,normalize:I,normGain:K,picker:q,note:Ce,drawn:"none",gridKey:"",meta:t,draft:null,editing:!1};Ze.addEventListener("click",C=>{C.target.closest("button, select, input, label, [role=slider], .lucy-take-picker")||this.on.select(n)}),s.addEventListener("click",()=>this.on.play(n)),c.addEventListener("click",()=>this.on.openSend(n)),u.addEventListener("click",()=>this.openMenu===se?this.closeMenu():this.showMenu(se)),m.addEventListener("keydown",C=>{C.key==="Escape"&&(this.closeMenu(),u.focus())}),d.addEventListener("click",()=>{this.closeMenu(),this.on.download(n)}),h.addEventListener("click",()=>{this.closeMenu(),this.on.remove(n)});const et=()=>{if(se.editing)return;se.editing=!0;const C=T("input","lucy-take-rename",{type:"text",maxlength:"40","aria-label":`Rename ${ue(se.meta)}`,value:ue(se.meta)});a.replaceWith(C),C.focus(),C.select();let _=!1;const de=le=>{_||(_=!0,se.editing=!1,C.replaceWith(a),le&&this.on.rename(n,C.value),a.focus())};C.addEventListener("keydown",le=>{le.key==="Enter"?(le.preventDefault(),de(!0)):le.key==="Escape"&&(le.preventDefault(),de(!1))}),C.addEventListener("blur",()=>de(!0))};a.addEventListener("dblclick",et),a.addEventListener("keydown",C=>{(C.key==="Enter"||C.key==="F2")&&(C.preventDefault(),et())});for(const C of["start","end"])this.bindMarker(se,C);return se}showMenu(t){this.closeMenu(),this.openMenu=t,t.menu.hidden=!1,t.more.setAttribute("aria-expanded","true"),t.menu.querySelector("button:not(:disabled)")?.focus()}closeMenu(){const t=this.openMenu;t&&(this.openMenu=null,t.menu.hidden=!0,t.more.setAttribute("aria-expanded","false"))}bindMarker(t,n){const a=t.markers[n],o=()=>({...t.meta,region:t.draft??t.meta.region}),r=l=>{const c=t.wave.getBoundingClientRect();return(l-c.left)/Math.max(1,c.width)*t.meta.frames},s=(l,c)=>{t.draft=c?null:l,this.paintRegion(t,l),this.on.setRegion(t.id,l,c)};a.addEventListener("pointerdown",l=>{if(l.button!==0)return;l.preventDefault(),a.setPointerCapture(l.pointerId),a.focus(),t.root.dataset.dragging="true";let c=null;const u=h=>{const m=o(),g=r(h.clientX),w=h.altKey?g:Dp(m,g,Lt(m));c=zt(m,n,w),s(c,!1)},d=h=>{a.removeEventListener("pointermove",u),a.removeEventListener("pointerup",d),a.removeEventListener("pointercancel",d),t.root.removeAttribute("data-dragging");try{a.releasePointerCapture(h.pointerId)}catch{}c&&s(c,!0)};a.addEventListener("pointermove",u),a.addEventListener("pointerup",d),a.addEventListener("pointercancel",d)}),a.addEventListener("dblclick",()=>{const l=o();s(zt(l,n,n==="start"?0:l.frames),!0)}),a.addEventListener("keydown",l=>{const c=o();let u=null;l.key==="ArrowLeft"||l.key==="ArrowDown"?u=mo(c,n,-1,Lt(c),l.shiftKey):l.key==="ArrowRight"||l.key==="ArrowUp"?u=mo(c,n,1,Lt(c),l.shiftKey):l.key==="Home"?u=zt(c,n,0):l.key==="End"&&(u=zt(c,n,c.frames)),u&&(l.preventDefault(),s(u,!0))})}paintRegion(t,n){const a={...t.meta,region:n},o=Math.max(1,a.frames);t.wave.style.setProperty("--lucy-start",(n.start/o).toFixed(5)),t.wave.style.setProperty("--lucy-end",(n.end/o).toFixed(5)),Q(t.region,Rp(a,n).replace(/(?<![·→]) (?![·→])/g," "));const r=s=>(s/a.sampleRate).toFixed(2);for(const s of["start","end"]){const l=t.markers[s],c=n[s];ie(l,"aria-label",`${s==="start"?"Start":"End"} of ${ue(a)}`),ie(l,"aria-valuemin","0"),ie(l,"aria-valuemax",r(a.frames)),ie(l,"aria-valuenow",r(c)),ie(l,"aria-valuetext",Ip(a,s,c))}}update(t,n,a){t.meta=n;const o=n.id,r=ue(n);t.editing||Q(t.name,r),ie(t.root,"aria-label",r);const s=a.selected===o,l=a.playing===o;st(t.root,"selected",s),st(t.root,"playing",l),ie(t.root,"aria-current",s?"true":null),ie(t.play,"aria-label",`${l?"Stop":"Play"} ${r}`),ie(t.play,"aria-pressed",l?"true":"false");const c=a.peaks(o),u=c===null;st(t.root,"missing",u),st(t.root,"loading",c===void 0),t.drawn!==c&&(t.drawn=c,t.env.setAttribute("d",c?ho(c):"")),Q(t.empty,u?"Not in this browser":""),ie(t.wave,"aria-label",u?`${r}: audio not in this browser`:`${r}: waveform`);const d=`${n.bpm}:${n.sampleRate}:${n.frames}`;if(t.gridKey!==d){t.gridKey=d;const b=_p(n),p=t.wave.querySelector(".lucy-wave-beats"),f=t.wave.querySelector(".lucy-wave-bars");p?.setAttribute("d",ra(b.beats)),f?.setAttribute("d",ra(b.bars)),t.barNums.replaceChildren(...[0,...b.bars].map((y,v)=>{const E=T("span","lucy-take-barnum",{},String(v+1));return E.style.setProperty("--lucy-x",y.toFixed(5)),E}))}for(const b of Object.values(t.markers))b.hidden=u;t.draft||this.paintRegion(t,Le(n));const h=n.frames/n.sampleRate;Q(t.sourcePill,Hp[as(n)]),Q(t.facts.bars,`${n.bars} bar${n.bars===1?"":"s"}`),Q(t.facts.secs,`${h.toFixed(1)} s`),Q(t.facts.bpm,`${Math.round(n.bpm*10)/10} BPM`),Q(t.facts.chans,n.channels===2?"Stereo":"Mono"),Q(t.facts.rate,`${Math.round(n.sampleRate/100)/10} kHz`),Q(t.facts.when,Cp(n.created,a.now)),ie(t.facts.when,"title",Fp(n.created)||null);const m=Lt(n);for(const b of t.snap.querySelectorAll("[data-snap]")){const p=b.dataset.snap===m;ie(b,"aria-checked",p?"true":"false"),ie(b,"tabindex",p?"0":"-1"),b.disabled=u}const g=n.normalize;t.normalize.checked!==(g?.on===!0)&&t.normalize.set(g?.on===!0),t.normalize.el.disabled=u,Q(t.normGain,g?.on?Lp(g.gainDb):""),st(t.root,"normalized",g?.on===!0),t.send.hidden=!a.canSend,Q(t.send,`Send to ${a.sendName}`),t.send.disabled=u,t.download.disabled=u,t.play.disabled=u,this.renderPicker(t,a);const w=a.sendNote?.take===o?a.sendNote.text:"";t.note.hidden=!w,Q(t.note,w)}renderPicker(t,n){const a=n.picker?.take===t.id&&n.canSend?n.picker:null;if(t.picker.hidden=!a,t.send.hidden=t.send.hidden||!!a,!a){t.picker.firstChild&&t.picker.replaceChildren();return}const o=a.receivers.find(d=>d.instance===a.to)??a.receivers[0],r=JSON.stringify([a.receivers.map(d=>[d.instance,d.targets.map(h=>h.id)]),a.to]);if(t.picker.dataset.key!==r){t.picker.dataset.key=r,t.picker.replaceChildren();const d=(p,f,y,v,E)=>{const M=`lucy-${p}-${t.id}`,$=T("select","nc-select lucy-take-pick",{id:M,"data-pick":p});for(const A of v)$.append(T("option","",{value:A.value},A.label));$.addEventListener("change",()=>E($.value));const k=T("label","lucy-take-snap-label",{for:M},f);N(y,k,$),t.picker.append(T("span","lucy-take-pick-wrap",{},k,$))};a.receivers.length>1&&d("send-to","Sampler","send-to",a.receivers.map(p=>({value:p.instance,label:p.name})),p=>this.on.pickTo(p)),d("send-pad",o?.label??"Pad","send-pad",(o?.targets??[]).map(p=>({value:p.id,label:p.name})),p=>this.on.pickTarget(p));const h=`lucy-send-name-${t.id}`,m=T("input","lucy-take-pick-name",{id:h,type:"text","data-pick":"send-name",placeholder:a.defaultName,maxlength:"60",autocomplete:"off",spellcheck:"false"});m.addEventListener("input",()=>this.on.pickName(m.value)),m.addEventListener("keydown",p=>{p.key==="Enter"?(p.preventDefault(),this.on.send()):p.key==="Escape"&&(p.preventDefault(),this.on.cancelSend())});const g=T("label","lucy-take-snap-label",{for:h},"Name");N("send-name",g,m),t.picker.append(T("span","lucy-take-pick-wrap",{},g,m));const w=T("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-go"},"Send");w.addEventListener("click",()=>this.on.send()),N("send-go",w,w);const b=T("button","nc-page-action lucy-take-action",{type:"button","data-take-action":"send-cancel"},"Cancel");b.addEventListener("click",()=>this.on.cancelSend()),N("send-cancel",b,b),t.picker.append(w,b)}const s=t.picker.querySelector('[data-pick="send-to"]');s&&s.value!==a.to&&(s.value=a.to);const l=t.picker.querySelector('[data-pick="send-pad"]');l&&l.value!==a.target&&(l.value=a.target);const c=t.picker.querySelector('[data-pick="send-name"]');c&&(c.value!==a.name&&document.activeElement!==c&&(c.value=a.name),c.placeholder=a.defaultName,c.disabled=a.sending);const u=t.picker.querySelector('[data-take-action="send-go"]');u&&(Q(u,a.sending?"Sending…":"Send"),u.disabled=a.sending)}}const si={knee:.6,ceiling:.944,range:4,points:8193};function sh(e,{knee:t,ceiling:n}=si){const a=Math.abs(e);if(a<=t)return e;const o=n-t;return Math.sign(e)*(t+o*Math.tanh((a-t)/o))}function lh({range:e,points:t}=si){const n=new Float32Array(t);for(let a=0;a<t;a++)n[a]=sh((2*a/(t-1)-1)*e);return n}function ch(e){const t=e.createGain();t.gain.value=1/si.range;const n=e.createWaveShaper();return n.curve=lh(),n.oversample="none",t.connect(n),{input:t,output:n}}const dh="LUCY Audio",Ae="lucy",re=Kt(),li=.15,J=up(Ae,re),In=ah(J,re),yo=ih(In,uh()),os=In.state,x=Wp(os),me=new Xp(In.files);yo&&me.adopt(In.legacyFiles,yo);const G=()=>Gp(os,x);function uh(){try{return globalThis.localStorage??null}catch{return null}}let ce=!1,D={kind:"idle"},gt=!1,B="",An=0,pn=0;const Se=new Is({bpm:120,minBpm:40,maxBpm:240,timebase:"shared"});let S=null,Ot=null;const ph=new Qs({...pp(),app:dp(dh,re),version:"0.1.0",clock:Se,capabilities:{prefersLeader:!1,canLead:!0,tempoRange:[40,240]},audio:()=>{const e=S?.state;return e==="running"?"running":e==="suspended"?"suspended":e?"none":"needs-gesture"},startGate:()=>Ot?.whenSettled?.()??null}),Oe=e=>e+(Ot?.offset??0),R=()=>Se.transport,Wt=()=>R().running,rs=()=>!!J&&typeof ii()?.record=="function",Je=()=>x.source==="master"&&rs()?"master":"mic",je=()=>Wt()&&!ce;let qe=null,oe=null,_e=null,j=null,Sn=null,Ge=null,On=1,ss=!1,Tn=null;function Qe(){return Tn??=(async()=>{J?(S=J.ctx,qe=J.output,Ot=J.mapper??new wi(J.ctx)):(S=new AudioContext({latencyHint:"interactive"}),qe=S.destination,Ot=new wi(S)),Ot.start();try{await S.audioWorklet.addModule(_u)}catch{return B="Audio could not start (the recorder's worklet did not load). Reload to try again.",z(),!1}oe=new AudioWorkletNode(S,"lucy-capture",{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[1],channelCount:2,channelCountMode:"explicit"}),oe.port.onmessage=n=>hh(n.data);const e=new GainNode(S,{gain:0});oe.connect(e).connect(qe),j=Vl(S,{moduleUrl:hp()??Ql,bpm:R().bpm,slots:pt.length,state:ai(x.fx)}),Sn=new GainNode(S,{gain:x.master});const t=ch(S);return j.output.connect(Sn).connect(t.input),t.output.connect(qe),Kl(j,Se,{toAudioTime:Oe,now:ne}),j.onChange(()=>{x.fx=j?.getState(),G()}),_e=new GainNode(S,{gain:0}),_e.connect(j.input),He(x.monitor),!0})(),Tn}async function ci(){if(Ge)return!0;if(!await Qe()||!S||!oe||!_e)return!1;S.state!=="running"&&await S.resume().catch(()=>{});try{const e=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,channelCount:{ideal:2,min:1}}}),n=e.getAudioTracks()[0]?.getSettings()??{};return On=Math.max(1,Math.min(2,n.channelCount??1)),ss=!!(n.echoCancellation||n.noiseSuppression||n.autoGainControl),Ge=S.createMediaStreamSource(e),Ge.connect(oe),Ge.connect(_e),B="",z(),!0}catch{return B="No mic: allow the microphone for this site (and, in the Studio, for the page), then try again.",z(),!1}}function He(e){x.monitor=e,G(),_e&&S&&_e.gain.setTargetAtTime(e&&!gt&&Je()==="mic"?1:0,S.currentTime,.01),pn=0,z()}let $e=null,jt=null;function hh(e){if(e.type==="level"&&typeof e.peak=="number"){An=e.peak;const t=performance.now();x.monitor&&Ge&&An>.97?(pn||=t,t-pn>1500&&(He(!1),B="Monitor off: the input was feeding back. Use headphones, then turn Monitor on again.")):pn=0,Oh();return}if(e.type==="chunk"&&e.id!==void 0&&e.channels){(!$e||$e.id!==e.id)&&($e={id:e.id,parts:[]}),$e.parts.push(e.channels),V?.id===e.id&&(V.builder.add(e.channels),Xt());return}if(e.type==="done"&&e.id!==void 0){const t=$e?.id===e.id?$e.parts:[];$e=null;const n=mh(t);if(jt&&e.id===gs){jt(n),jt=null;return}gh(e.id,n)}}function mh(e){const t=e[0]?.length??0,n=e.reduce((a,o)=>a+(o[0]?.length??0),0);return Array.from({length:t},(a,o)=>{const r=new Float32Array(n);let s=0;for(const l of e){const c=l[o];c&&(r.set(c,s),s+=c.length)}return r})}function di(){const e=x.nudgeMs/1e3;if(x.roundTripMs!==null)return x.roundTripMs/1e3+e;const t=S;return(t?.baseLatency??0)+(t?.outputLatency??0)+.01+e}async function fh(e,t){const n=performance.now()+t;for(;!e();){if(performance.now()>n)return!1;await new Promise(a=>setTimeout(a,20))}return!0}async function ls(){if(Je()==="master"||Z.busy){await wh();return}if(D.kind!=="idle"){oe?.port.postMessage({type:"cancel"}),D={kind:"idle"},$e=null,V=null,z();return}if(!await ci()||!S||!oe)return;if(R().running||(J&&Ke()?.claim(Ie(Ae,re)),Se.play({at:ne()})),ce=!1,!await fh(()=>R().running,2e3)){B="The clock did not start.",z();return}const e=R(),t=li/$t(e.bpm),{startBeat:n,endBeat:a}=Hu(Math.max(0,e.beatAt(ne())),x.bars,t),o=Oe(e.timeAt(n)),r=Oe(e.timeAt(a)),{startFrame:s,endFrame:l}=Uu(o,r,di(),S.sampleRate),c=x.nextId++;G(),oe.port.postMessage({type:"record",id:c,startFrame:s,endFrame:l,channels:On}),D={kind:"armed",id:c,startBeat:n,endBeat:a},V={id:c,source:"mic",bars:x.bars,builder:new En(l-s)},B="",z()}async function gh(e,t){if(D.kind==="idle"||D.id!==e||!S)return;D={kind:"idle"},V?.id===e&&(V=null);const n=t[0]?.length??0;if(n===0){B="Nothing was recorded.",z();return}const a={id:e,bars:x.bars,bpm:R().bpm,sampleRate:S.sampleRate,channels:t.length,frames:n,created:new Date().toISOString(),saved:!1,source:"mic",normalize:{on:!0,gainDb:Dn(t,S.sampleRate)}};Te.set(e,Bn(t)),a.saved=await me.save(e,t),a.saved||(B="This take is kept until you reload: this browser has no file storage here."),x.takes.push(a),x.selected=e,G(),await ve(e)}const Z=new vp({grab:ii,running:()=>R().running,beatNow:()=>R().beatAt(ne()),bpm:()=>R().bpm,contextTime:e=>Oe(R().timeAt(e)),sampleRate:()=>S?.sampleRate??48e3,leadBeats:()=>li/$t(R().bpm),bars:()=>x.bars,countIn:()=>x.countIn,now:()=>S?.currentTime??0,nextId:()=>{const e=x.nextId++;return G(),e},after:(e,t)=>{const n=setTimeout(t,e);return()=>clearTimeout(n)},done:e=>void vh(e),failed:e=>{B=yh[e],V=null,z()},changed:()=>{ds(),z()}});let pe=null;function cs(){const e=Z.phase;return e.kind==="recording"&&e.countBeat<e.startBeat?e:null}function ds(){const e=cs();if(e&&pe?.id===e.id||(ui(),!e||!S))return;const t=s=>Oe(R().timeAt(s)),n=t(e.startBeat),a=ep(e.countBeat,e.startBeat,t,S.currentTime,n),o=Qu(x.cue)?a:[];pe={id:e.id,clicks:o.map(bh),times:o.map(s=>s.time),badge:!1};const r=Qr();if(r&&ni(x.cue)){const s=Array.from({length:e.startBeat-e.countBeat},(l,c)=>e.countBeat+c);r.show(Ie(Ae,re),{beats:s.map(t),accents:s.map(l=>l%P===0),until:n}),pe.badge=!0}}function ui(){if(pe){for(const e of pe.clicks)try{e.stop()}catch{}pe.badge&&Qr()?.clear(Ie(Ae,re)),pe=null}}const wo={accent:.25,beat:.14};function bh(e){const t=S,n=new OscillatorNode(t,{frequency:e.accent?1760:1175}),a=new GainNode(t,{gain:0}),o=e.accent?wo.accent:wo.beat;return a.gain.setValueAtTime(0,e.time),a.gain.linearRampToValueAtTime(o,e.time+.002),a.gain.exponentialRampToValueAtTime(5e-4,e.time+un-.002),a.gain.linearRampToValueAtTime(0,e.time+un),n.connect(a).connect(t.destination),n.start(e.time),n.stop(e.time+un),n.onended=()=>a.disconnect(),n}addEventListener("pagehide",ui);function jn(){const e=cs();return e?Zu(R().beatAt(ne()),e.countBeat,e.startBeat):null}const yh={cancelled:"",stopped:"Music stopped: no take.",unavailable:"Reload the Studio to record its Master.",empty:"The Master take came back empty.",timeout:"Master take timed out: no take."};async function wh(){if(Z.busy){Z.cancel(),V=null,B="",z();return}!await Qe()||!S||(B="",Z.arm())}async function vh(e){if(!S)return;if(xp(e.channels)<1e-4){B="The Master was silent: no take.",z();return}const t=e.channels.map(a=>new Float32Array(a)),n={id:e.id,bars:e.bars,bpm:e.bpm,sampleRate:S.sampleRate,channels:t.length,frames:t[0]?.length??0,created:new Date().toISOString(),saved:!1,name:`Master ${e.id}`,source:"master",normalize:{on:!0,gainDb:Dn(t,S.sampleRate)}};V?.id===e.id&&(V=null),Te.set(e.id,Bn(t)),n.saved=await me.save(e.id,t),B=n.saved?"":"This take is kept until you reload: this browser has no file storage here.",x.takes.push(n),x.selected=e.id,Qt(),G(),await ve(e.id)}function xh(e){x.cue=e,G(),ui(),ds(),z()}function us(e){_n(!1),x.source=e,B="",G(),He(x.monitor)}function Mt(){try{return J?.sendAudio?J.audioReceivers?.()??[]:[]}catch{return[]}}let W=null,_t=!1,Xe=null;function ps(e){return(e?.targets.find(t=>!t.filled)??e?.targets[0])?.id??""}function hs(e=x.selected){const t=Mt()[0];!t||e===null||!x.takes.some(n=>n.id===e)||(W={take:e,to:t.instance,target:ps(t)},Xe=null,z())}function Qt(){W=null}async function ms(){const e=W,t=x.takes.find(l=>l.id===e?.take);if(!e||!t||!J?.sendAudio||_t)return;const n=await me.load(t),a=Mt().find(l=>l.instance===e.to),o=a?.name??"Sampler",r=`${a?.label??"Pad"} ${e.target}`;if(!n){Xe={take:t.id,text:`${ue(t)} could not be read.`},z();return}_t=!0,z();let s;try{s=await J.sendAudio(e.to,{...Yp(t,n),name:Vp(e.name,t)},e.target)}catch(l){s={ok:!1,reason:"error",message:l instanceof Error?l.message:String(l)}}_t=!1,W=null,Xe={take:t.id,text:s.ok?`Sent to ${o} · ${r}`:s.reason==="cancelled"?`Not sent: ${r} kept.`:`Not sent: ${s.message??s.reason}`},z()}let te=null,we=null;async function ve(e){e!==x.selected&&Qt(),x.selected=e,G();const t=x.takes.find(a=>a.id===e);if(!t||!S){te=null,Et(!0),z();return}const n=await me.load(t);if(!n)B=`Take ${t.id} could not be read.`,te=null;else{const a=new AudioBuffer({length:t.frames,numberOfChannels:t.channels,sampleRate:t.sampleRate});n.forEach((o,r)=>a.copyToChannel(o,r)),te={id:t.id,audio:a}}Et(!0),z()}function Na(e){if(we){try{we.node.stop(e??0)}catch{}we=null}}let bt=null,qa=null;function Et(e=!1){const t=x.takes.find(b=>b.id===te?.id);if(!S||!qe||!te||!t||!je()){const b=R().stopTime;Na(b!==null&&S?Math.max(Oe(b),S.currentTime):void 0),bt=null,qa=null;return}const n=R(),a=Le(t),o=JSON.stringify([te.id,n.startTime,n.bpm,a.start,a.end]);if(!e&&we?.stamp===o)return;const r=li/$t(n.bpm),{startBeat:s,offsetBeats:l}=jp(n.beatAt(ne()),oi(t,a),r),c=Math.max(Oe(n.timeAt(s)),S.currentTime);Na(c);const u=new AudioBufferSourceNode(S,{buffer:te.audio,loop:!0}),d=a.start/t.sampleRate,h=a.end/t.sampleRate;u.loopStart=d,u.loopEnd=h;const m=n.bpm/t.bpm;u.playbackRate.value=m;const g=new GainNode(S,{gain:Jr(t)});u.connect(g).connect(j?.input??qe);const w=Math.min(h-d,l*$t(t.bpm));u.start(c,d+w),we={node:u,gain:g,stamp:o},qa=bt,bt={id:t.id,when:c,offset:w,start:d,length:h-d,duration:t.frames/t.sampleRate,rate:m}}function fs(e=S?.currentTime??0){const t=bt&&e>=bt.when?bt:qa??null;if(!t||!we||e<t.when||!t.length)return{id:null,at:-1};const n=(((e-t.when)*t.rate+t.offset)%t.length+t.length)%t.length;return{id:t.id,at:(t.start+n)/t.duration}}const gs=0;async function kh(){if(gt||D.kind!=="idle"||Z.busy||!await ci()||!S||!oe||!qe)return;gt=!0,He(x.monitor),B="Calibrating: speakers on, keep quiet for two seconds…",z();const e=S.sampleRate,t=S.currentTime+.3,n=[0,.5,1,1.5].map(u=>t+u),a=Math.round((t-.05)*e),o=Math.round((t+2.2)*e),r=new Promise(u=>{jt=u,setTimeout(()=>u(null),4e3)});oe.port.postMessage({type:"record",id:gs,startFrame:a,endFrame:o,channels:1});for(const u of n){const d=new OscillatorNode(S,{frequency:2e3}),h=new GainNode(S,{gain:0});h.gain.setValueAtTime(.8,u),h.gain.setValueAtTime(0,u+.004),d.connect(h).connect(qe),d.start(u),d.stop(u+.01)}const s=await r;jt=null,gt=!1;const l=s?.[0],c=l?ju(l,n.map(u=>Math.round(u*e)-a),Math.round(.4*e)):null;c===null?B="Calibration didn't hear the clicks: turn the speakers up (no headphones), then try again.":(x.roundTripMs=Math.round(c/e*1e4)/10,B=`Round trip ${x.roundTripMs} ms: takes are shifted by it.`,G()),He(x.monitor)}async function Da(){if(await Qe(),S&&S.state!=="running"&&await S.resume().catch(()=>{}),J&&Wt()){ce=!ce,Et(!0),z(),ce&&Ke()?.out?.(Ie(Ae,re));return}Wt()?Se.stop({at:ne()}):(ce=!1,J&&Ke()?.claim(Ie(Ae,re)),Se.play({at:ne()}))}let vo=R().running;Se.onChange(()=>{const e=R().running&&!vo;e&&J&&(ce=!mp(Ae,re)),vo=R().running,R().running||(ce=!1,D.kind!=="idle"&&(oe?.port.postMessage({type:"cancel"}),D={kind:"idle"})),Z.clockChanged(e),Et(),z()});Ke()?.member?.(Ie(Ae,re),je);Ke()?.onAll(()=>{ce&&(ce=!1,Et(!0),z())});async function pi(e=x.selected){const t=x.takes.find(r=>r.id===e);if(!t){B="No take to save yet: record one, or Load an audio file.",z();return}const n=await me.load(t);if(!n){B=`${ue(t)} is not in this browser: nothing to save.`,z();return}const a=new Blob([Jp(ts(n,Le(t)),t.sampleRate)],{type:"audio/wav"}),o=document.createElement("a");o.href=URL.createObjectURL(a),o.download=`lucy${re>1?`-${re}`:""}-take-${t.id}-${Math.round(t.bpm)}bpm-${t.created.slice(0,10)}.wav`,o.hidden=!0,document.body.append(o),o.click(),o.remove(),setTimeout(()=>URL.revokeObjectURL(o.href),1e4)}async function $h(e){if(!await Qe()||!S)return;let t;try{t=await S.decodeAudioData(await e.arrayBuffer())}catch{B=`Couldn't read ${e.name}: not an audio file this browser can decode.`,z();return}const n=R().bpm,a=Wu(t.length,t.sampleRate,n),o=[];for(let l=0;l<Math.min(2,t.numberOfChannels);l++){const c=new Float32Array(a.frames);c.set(t.getChannelData(l).subarray(0,a.frames)),o.push(c)}const r=x.nextId++,s={id:r,bars:a.bars,bpm:n,sampleRate:t.sampleRate,channels:o.length,frames:a.frames,created:new Date().toISOString(),saved:!1,source:"file",normalize:{on:!0,gainDb:Dn(o,t.sampleRate)}};Te.set(r,Bn(o)),s.saved=await me.save(r,o),B=`${e.name} is take ${r}: ${a.bars} bar${a.bars===1?"":"s"} at ${Math.round(n)} BPM${a.trimmed?", trimmed to fit":""}.${s.saved?"":" Kept until you reload: this browser has no file storage here."}`,x.takes.push(s),x.selected=r,G(),await ve(r)}function Eh(){_n(!1),Wt()&&(J?(ce=!0,Ke()?.out?.(Ie(Ae,re))):Se.stop({at:ne()})),Na(),j?.clear({fadeMs:20}),He(!1)}function bs(e){x.master=Math.min(1,Math.max(0,e)),G(),Sn&&S&&Sn.gain.setTargetAtTime(x.master,S.currentTime,.01),Gt.value=String(x.master),hi.textContent=`${Math.round(x.master*100)}%`}async function Mh(e){const t=eh(x,e);_n(!1),Qt(),Object.assign(x,t),Te.clear(),B="",G(),!(Tn&&!await Tn)&&(j?.setState(x.fx),bs(x.master),He(x.monitor),await ve(x.selected))}function _n(e=!0){Z.busy&&Z.cancel(),D.kind!=="idle"&&(oe?.port.postMessage({type:"cancel"}),D={kind:"idle"},$e=null),V=null,e&&z()}const Ht=new Kp(x,e=>(Te.delete(e),me.remove(e)));async function ys(e=x.selected){if(e===null)return;const t=x.takes.find(a=>a.id===e),n=x.selected===e;!t||!Ht.delete(e)||(W?.take===e&&Qt(),Xe?.take===e&&(Xe=null),G(),n?await ve(x.takes.at(-1)?.id??null):z(),$u({message:`Deleted ${ue(t)}`,actionLabel:"Undo",onAction:()=>{Ht.undo(e)&&(G(),x.selected===e?ve(e):z())},onClose:a=>{a!=="action"&&Ht.settle(e)}}))}function ws(e,t){const n=x.takes.find(a=>a.id===e);n&&(Up(n,t),G(),z())}function vs(e,t,n){if(!n)return;const a=x.takes.find(o=>o.id===e);a&&(qp(a,t)?a.region=void 0:a.region={start:t.start,end:t.end},G(),te?.id===e&&Et(),z())}async function xs(e,t){const n=x.takes.find(a=>a.id===e);if(n){if(n.normalize)n.normalize.on=t;else{const a=t?await me.load(n):null;if(t&&!a)return;n.normalize={on:t,gainDb:a?Dn(a,n.sampleRate):0}}G(),S&&we&&te?.id===e&&we.gain.gain.setTargetAtTime(Jr(n),S.currentTime,.01),z()}}function ks(e,t){const n=x.takes.find(a=>a.id===e);n&&(t==="beat"?n.snap=void 0:n.snap=t,G(),z())}async function $s(e){if(te?.id===e&&je()){await Da();return}(x.selected!==e||te?.id!==e)&&await ve(e),je()||await Da()}const X=(e,t={},...n)=>{const a=document.createElement(e);for(const[o,r]of Object.entries(t))a.setAttribute(o,r);return a.append(...n),a},Es=document.getElementById("app");Es.classList.add("nc","nc-page");Au();ap();const Hn=X("header",{class:"nc-page-hd"},X("div",{},X("h1",{class:"nc-page-title"},X("span",{style:"color: var(--nc-ui-instrument-lucy)"},"LUCY")," ",X("span",{class:"nc-page-sep"},"/")," AUDIO ",X("span",{class:"nc-page-sep"},"/")," ",X("span",{class:"nc-mono"},String(re).padStart(2,"0"))),X("p",{class:"nc-page-sub"},"A NetComposer element."))),Gt=X("input",{type:"range",class:"nc-range",id:"lucy-master",min:"0",max:"1",step:"0.01",value:String(x.master),"data-nc-id":"lucy-master"});Gt.addEventListener("input",()=>bs(Number(Gt.value)));const hi=X("span",{class:"nc-readout","data-nc-readout":""});hi.textContent=`${Math.round(x.master*100)}%`;const yt=X("input",{type:"file",accept:"audio/*,.wav,.mp3,.m4a,.aac,.ogg,.oga,.flac,.webm"});yt.hidden=!0;yt.addEventListener("change",()=>{const e=yt.files?.[0];yt.value="",e&&$h(e)});const Pa=(e,t)=>{const n=X("button",{type:"button",class:"nc-page-action","data-lucy-action":e.toLowerCase()},e);return n.addEventListener("click",t),N(`action:${e.toLowerCase()}`,n,n),n},xo=Fu({panel:X("div",{},X("div",{class:"nc-field","data-nc-row":"","data-nc-slider":"",style:"width: calc(var(--nc-ui-space-64) * 3)"},X("label",{class:"nc-label",for:"lucy-master"},"Master"),Gt,hi),Pa("Save",()=>void pi()),Pa("Load",()=>yt.click()))});Hn.append(X("div",{class:"nc-page-actions"},xo.panel,Pa("Panic",Eh),xo.button,yt));N("page:title",Hn.querySelector(".nc-page-title"));N("master",Hn.querySelector('label[for="lucy-master"]'),Gt);const mi=X("div",{class:"nc-stack","data-nc-layout":"adjacent"});Es.append(Hn,X("main",{class:"nc-page-body"},mi));function Ms(){const e=R(),t=Z.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const a=e.beatAt(ne()),o=jn();if(o!==null)return`Count-in: ${o}`;if(a<t.startBeat)return"Waiting for Master…";const r=Math.floor((a-t.startBeat)/4)+1;return`Recording Master bar ${Math.min(r,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const a=e.beatAt(ne());if(a<D.startBeat){const r=Math.ceil((D.startBeat-a)/4);return`Armed: recording in ${r} bar${r===1?"":"s"}`}const o=Math.floor((a-D.startBeat)/4)+1;return`Recording bar ${Math.min(o,x.bars)} of ${x.bars}`}if(!Wt())return x.takes.length?"Stopped":Je()==="master"?"Record to take the Master":"Arm to record a take";if(ce)return"Sitting out";const n=te?x.takes.find(a=>a.id===te?.id):void 0;return n?`Playing ${ue(n)}`:"Playing (no take yet)"}function Ah(){const e=Z.phase;return e.kind==="waiting"?"Armed":e.kind==="recording"?R().beatAt(ne())<e.startBeat?"Armed":"Recording":D.kind==="armed"?"Armed":D.kind==="recording"?"Recording":"Record"}function Sh(){const e=D.kind!=="idle"||Z.busy;return{id:"transport",title:"Transport",controls:[{type:"button",id:"play",label:je()?"Stop":"Play",on:je(),onPress:()=>void Da()},{type:"button",id:"arm",label:Ah(),on:e,ariaLabel:e?"Cancel the take":Je()==="master"?"Record the Master from the next bar line the music plays":"Record a take from the next bar",onPress:()=>void ls()},{type:"choice",id:"bars",label:"Length (bars)",value:String(x.bars),options:dn.map(t=>({value:String(t),label:`${t} bar${t===1?"":"s"}`})),onChange:t=>{x.bars=Number(t),G(),z()}},{type:"readout",id:"status",label:"Status",value:Ms()}]}}function ko(){return rs()?[{type:"choice",id:"record-from",label:"Record from",value:Je(),options:[{value:"mic",label:"Mic"},{value:"master",label:"Master"}],onChange:e=>us(e==="master"?"master":"mic")}]:[]}function Th(){return Je()==="master"?{id:"input",title:"Input",controls:[...ko(),{type:"group",id:"input-master-more",title:"Count-in",collapse:"phone",summary:Lh(),controls:Ch()},{type:"note",id:"master-note",text:"Internal: no monitor, no nudge."},...B?[{type:"note",id:"notice",text:B}]:[]]}:{id:"input",title:"Input",controls:[...ko(),Ge?{type:"readout",id:"source",label:"Input",value:`${On===2?"Stereo":"Mono"} · ${Math.round((S?.sampleRate??48e3)/100)/10} kHz`}:{type:"button",id:"allow",label:"Allow the mic",on:!1,onPress:()=>void ci()},{type:"canvas",id:"meter",label:"Level",paint:"meter",level:Math.min(1,An)},{type:"choice",id:"monitor",label:"Monitor",value:x.monitor?"on":"off",options:[{value:"off",label:"Monitor off"},{value:"on",label:"Monitor on"}],onChange:e=>He(e==="on")},...ss?[{type:"note",id:"processing",text:"Voice processing is on: takes may sound squashed."}]:[],...B?[{type:"note",id:"notice",text:B}]:[],{type:"group",id:"input-more",title:"Timing",collapse:"phone",summary:`Round trip ${As()} · Nudge ${Ss()}`,controls:[{type:"label",id:"timing-label",text:"Timing"},...Ih().controls??[]]}]}}function Lh(){if(!x.countIn)return"Count-in off";const e=x.cue==="sound"?"Sound":x.cue==="visual"?"Visual":"Sound + visual";return`Count-in ${x.countIn} · ${e}`}function As(){return x.roundTripMs===null?`${Math.round(di()*1e3)} ms (estimate)`:`${x.roundTripMs} ms`}function Ss(){return`${x.nudgeMs>0?"+":""}${x.nudgeMs} ms`}function Ch(){return[{type:"choice",id:"count-in",label:"Count-in",value:String(x.countIn),options:[{value:"0",label:"Count-in off"},{value:"4",label:"Count-in 4"},{value:"8",label:"Count-in 8"}],onChange:e=>{x.countIn=Number(e)===4?4:Number(e)===8?8:0,G(),z()}},...x.countIn?[{type:"choice",id:"cue",label:"Cue",value:x.cue,options:[{value:"sound",label:"Sound"},{value:"visual",label:"Visual"},{value:"both",label:"Sound + visual"}],onChange:e=>xh(e==="sound"||e==="visual"?e:"both")}]:[]]}function Fh(){return{id:"takes",title:"Takes",summary:x.takes.length?`${x.takes.length} take${x.takes.length===1?"":"s"}`:"No takes",controls:[]}}const Te=new Map,sa=new Set;let $o=Promise.resolve();function zh(e){Te.has(e.id)||sa.has(e.id)||(sa.add(e.id),$o=$o.then(async()=>{const t=await me.load(e).catch(()=>null);sa.delete(e.id),!(!x.takes.includes(e)&&!Ht.held.includes(e.id))&&(Te.set(e.id,t?Bn(t):null),Xt())}))}let V=null,la=!1;function Ts(){const e=R(),t=Z.phase;if(t.kind==="waiting")return"Waiting for Master…";if(t.kind==="recording"){const n=e.beatAt(ne()),a=jn();if(a!==null)return`Count-in · ${a}`;if(n<t.startBeat)return"Waiting for Master…";const o=Math.floor((n-t.startBeat)/P)+1;return`Recording · bar ${Math.min(o,t.bars)} of ${t.bars}`}if(D.kind!=="idle"){const n=e.beatAt(ne());if(n<D.startBeat){const o=Math.ceil((D.startBeat-n)/P);return`Armed · recording in ${o} bar${o===1?"":"s"}`}const a=Math.floor((n-D.startBeat)/P)+1;return`Recording · bar ${Math.min(a,x.bars)} of ${x.bars}`}return""}function Nh(){const e=Z.phase,t=ii();if(!S||!t)return;if(e.kind==="waiting"){V??={id:-1,source:"master",bars:x.bars,builder:new En(0)};return}if(e.kind!=="recording"||((!V||V.id!==e.id)&&(V={id:e.id,source:"master",bars:e.bars,builder:new En(e.to-e.from)}),la))return;const n=e.from+V.builder.frames,a=Math.min(e.to,Math.floor(S.currentTime*S.sampleRate)-2048);if(a-n<4096)return;la=!0;const o=V;t.take("master",n,a).then(r=>{r&&V===o&&(o.builder.add(r),Xt())}).catch(()=>{}).finally(()=>{la=!1})}function qh(){if(!(D.kind!=="idle"||Z.busy))return null;const t=V?.bars??x.bars,n=V?.builder;return{label:Ts(),count:ni(x.cue)?jn():null,source:Z.busy?"master":"mic",peaks:n&&n.totalFrames>0?n.peaks:null,filled:n?.filled??0,bars:Array.from({length:Math.max(0,t-1)},(a,o)=>(o+1)/t)}}function Dh(){const e=Mt();for(const n of x.takes)zh(n);const t=e.find(n=>n.instance===W?.to)??e[0];return{takes:[...x.takes].reverse(),selected:x.selected,playing:je()&&te?te.id:null,peaks:n=>Te.get(n),canSend:e.length>0,sendName:e.length===1?e[0]?.name??"Sampler":"Sampler",picker:W&&t?{take:W.take,receivers:e,to:t.instance,target:W.target,name:W.name??"",defaultName:(()=>{const n=x.takes.find(a=>a.id===W?.take);return n?ue(n):""})(),sending:_t}:null,sendNote:Xe,live:qh(),hint:Je()==="master"?"Record takes the Master on the next bar.":"Record takes the mic on the next bar.",now:Date.now()}}const Vt=new rh({select:e=>void ve(e),play:e=>void $s(e),rename:ws,openSend:e=>hs(e),pickTo:e=>{const t=Mt().find(n=>n.instance===e);t&&W&&(W={...W,to:t.instance,target:ps(t)}),z()},pickTarget:e=>{W&&(W={...W,target:e}),z()},pickName:e=>{W&&(W={...W,name:e})},send:()=>void ms(),cancelSend:()=>{_t||(Qt(),z())},download:e=>void pi(e),remove:e=>void ys(e),setRegion:vs,setSnap:ks,setNormalize:(e,t)=>void xs(e,t),cancelRecording:()=>_n()});function Xt(){Vt.render(Dh())}const Un=new Map;function Ls(e,t,n){j?.setParam(e,t,n),z()}function Ph(e,t){const n="hacks-eq-graph";return Un.set(n,"hack:eq:graph"),Il(j,e,{id:n,on:t,set:(a,o)=>Ls(e,a,o),help:{graph:Ne["hack:eq:graph"],low:Ne["hack:eq:node:low"],mid:Ne["hack:eq:node:mid"],high:Ne["hack:eq:node:high"]}})}function Eo(e,t,n){const a=Number(j?.getParam(t,n.key)??n.default),o=`hacks-${t}-${n.key}`;Un.set(o,`hack:${e}:${n.key}`);const r=s=>Ls(t,n.key,s);return n.options?{type:"select",id:o,label:n.label,value:String(a),options:n.options.map(s=>({value:String(s.value),label:s.label})),onChange:s=>r(Number(s))}:{type:"slider",id:o,label:n.label,min:n.min,max:n.max,step:n.step??.001,taper:Rc(n),value:a,valueText:Po(n,a,R().bpm),onChange:r}}function Bh(e){const t=j?.getChain().find(n=>n.type===e)?.id??e;return j?j.getParam(t,"bypass")===!1:!1}function Mo(e,t){const n=j?.getChain().find(r=>r.type===e)?.id??e,a=he(e),o=a?.dials??[];return Un.set(`hacks-${e}`,`hack:${e}`),{type:"fx",id:`hacks-${e}`,title:a?.label??e,depth:t,on:j?j.getParam(n,"bypass")===!1:!1,onToggle:r=>{j?.setParam(n,"bypass",!r),z()},controls:[...e==="eq"?[Ph(n,j?j.getParam(n,"bypass")===!1:!1)]:[],...o.filter(r=>!r.more).map(r=>Eo(e,n,r))],more:o.filter(r=>r.more).map(r=>Eo(e,n,r)),maxHelp:Ne["hack:max"],meter:Gl(j,n)??void 0,meterHelp:Ne["hack:meter"]}}function Rh(){return{id:"hacks",title:"Hacks",controls:[{type:"group",id:"hacks-cards",title:"EQ & Compressor",collapse:"phone",summary:pt.map(e=>`${he(e)?.label??e} ${Bh(e)?"on":"off"}`).join(" · "),controls:[Mo("eq",1),Mo("compressor",2)]}]}}function Ih(){return{id:"timing",title:"Timing",controls:[{type:"readout",id:"roundtrip",label:"Round trip",value:As()},{type:"button",id:"calibrate",label:gt?"Listening…":"Calibrate",on:gt,onPress:()=>void kh()},{type:"slider",id:"nudge",label:"Nudge",min:-10,max:10,step:.5,value:x.nudgeMs,valueText:Ss(),onChange:e=>{x.nudgeMs=e,G(),z()}}]}}function Cs(e,t){if(e.update(t),t.id==="takes"){const a=e.el.querySelector(".nc-module-body");a&&Vt.el.parentElement!==a&&a.append(Vt.el)}const n=[...t.controls??[],...(t.sections??[]).flatMap(a=>a.controls)];ip(e.el,t.id,n,a=>Un.get(a)??a)}const fi=[Sh,Th,Fh,Rh].map(e=>({def:e,handle:Ru(e())}));Iu(mi,fi.map(e=>e.handle),"adjacent");mi.dataset.lucyLayout="";z();function z(){for(const e of fi)Cs(e.handle,e.def());Xt()}function Oh(){const e=fi[1];e&&Cs(e.handle,e.def())}let Ao="";const jh=document.title;let So="",To=0;const _h=matchMedia("(prefers-reduced-motion: reduce)");let Lo="",Co=0;function Fs(e){if(e-Co>1e3){Co=e;const c=JSON.stringify(Mt().map(u=>[u.instance,u.name,u.targets.map(d=>d.name)]));c!==Lo&&(Lo=c,z())}if(D.kind!=="idle"){const c=R();D.kind==="armed"&&c.beatAt(ne())>=D.startBeat&&(D={...D,kind:"recording"})}const t=ni(x.cue)?jn():null,n=tp(jh,t);document.title!==n&&(document.title=n);const a=Ms(),o=Ts();(a!==Ao||o!==So)&&(Ao=a,So=o,z()),Z.busy&&Nh(),e-To>3e4&&(To=e,Xt());const r=fs(),s=r.id===null?void 0:x.takes.find(c=>c.id===r.id);let l=r.at;if(_h.matches&&s&&l>=0){const c=s.frames/s.sampleRate/$t(s.bpm);l=Math.floor(l*c)/c}Vt.setPlayhead(je()?r.id:null,l),requestAnimationFrame(Fs)}requestAnimationFrame(Fs);ph.start();if(J)Qe().then(()=>ve(x.selected)),J.providePreset?.({format:ri,version:Mn,get:()=>Zp(x),set:Mh});else{const e=()=>{Qe().then(()=>ve(x.selected))};document.addEventListener("pointerdown",e,{once:!0,capture:!0}),document.addEventListener("keydown",e,{once:!0,capture:!0})}window.__lucy={state:x,clock:Se,get ctx(){return S},get phase(){return D},get master(){return Z.phase},get count(){return pe&&{id:pe.id,times:pe.times,badge:pe.badge}},pressRecord:()=>ls(),setSource:us,receivers:Mt,openSend:hs,cards:Vt,trash:Ht,playheadAt:fs,get peaks(){return Te},get live(){return V},removeTake:ys,rename:ws,setRegion:vs,setSnap:ks,setNormalize:xs,get playGain(){return we?we.gain.gain.value:null},playTake:$s,download:pi,get sendPick(){return W},set sendPick(e){W=e,z()},sendTake:ms,get sendNote(){return Xe},get level(){return An},get fx(){return j},roundTrip:di,toContext:Oe,takeAudio:e=>{const t=x.takes.find(n=>n.id===e);return t?me.load(t):null},async testInput(e,t=1){if(!await Qe()||!S||!oe||!_e)return;const n=e(S);n.connect(oe),n.connect(_e),Ge=n,On=t,z()}};
