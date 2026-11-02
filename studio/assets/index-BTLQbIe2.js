(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();const dt=1e-9;function pc(e,t,n,a=120){return Number.isFinite(e)?Math.min(n,Math.max(t,e)):Math.min(n,Math.max(t,a))}class hi{minBpm;maxBpm;maxPoints;segs;constructor(t={}){this.minBpm=t.minBpm??1,this.maxBpm=t.maxBpm??999,this.maxPoints=Math.max(2,t.maxPoints??4096);const n=t.anchor??{beat:0,time:0};this.segs=[{beat:n.beat,time:n.time,bpm:this.clamp(t.bpm??120)}]}get anchor(){return{beat:this.segs[0].beat,time:this.segs[0].time}}get points(){return this.segs.map(t=>({beat:t.beat,bpm:t.bpm}))}get bpm(){return this.segs[this.segs.length-1].bpm}clamp(t){return pc(t,this.minBpm,this.maxBpm,this.segs?.[this.segs.length-1]?.bpm??120)}reset(t,n){const a=n.filter(s=>Number.isFinite(s.beat)&&Number.isFinite(s.bpm)).slice().sort((s,l)=>s.beat-l.beat);let i=a.length?a[0].bpm:this.bpm;for(const s of a)s.beat<=t.beat+dt&&(i=s.bpm);const o=[{beat:t.beat,time:t.time,bpm:this.clamp(i)}];for(const s of a){if(s.beat<=t.beat+dt)continue;const l=this.clamp(s.bpm);l!==o[o.length-1].bpm&&o.push({beat:s.beat,time:0,bpm:l})}this.segs=o,this.recompute(1)}restart(t,n=this.bpm){this.segs=[{beat:t.beat,time:t.time,bpm:this.clamp(n)}]}setTempoAt(t,n){if(t=this.clamp(t),!Number.isFinite(n)||n<=this.segs[0].beat+dt){this.segs=[{...this.segs[0],bpm:t}];return}for(;this.segs.length>1&&this.segs[this.segs.length-1].beat>=n-dt;)this.segs.pop();this.segs[this.segs.length-1].bpm!==t&&(this.segs.push({beat:n,time:0,bpm:t}),this.recompute(this.segs.length-1),this.segs.length>this.maxPoints&&this.prune(this.segs[this.segs.length-this.maxPoints].beat))}rampTempo(t,n,a,i=.25){const o=this.bpmAt(n);if(!(a>0)||!(i>0)){this.setTempoAt(t,n);return}const s=Math.max(1,Math.round(a/i));this.setTempoAt(o,n);for(let l=1;l<=s;l++)this.setTempoAt(o+(t-o)*l/s,n+a*(l-1)/s)}prune(t){let n=0;for(let a=1;a<this.segs.length;a++)this.segs[a].beat<=t&&(n=a);n>0&&(this.segs=this.segs.slice(n))}bpmAt(t){return this.segAtBeat(t).bpm}timeAt(t){const n=this.segAtBeat(t);return n.time+(t-n.beat)*60/n.bpm}beatAt(t){const n=this.segAtTime(t);return n.beat+(t-n.time)*n.bpm/60}clone(){const t=new hi({minBpm:this.minBpm,maxBpm:this.maxBpm,maxPoints:this.maxPoints});return t.segs=this.segs.map(n=>({...n})),t}shift(t){this.segs[0].time+=t,this.recompute(1)}recompute(t){for(let n=Math.max(1,t);n<this.segs.length;n++){const a=this.segs[n-1];this.segs[n].time=a.time+(this.segs[n].beat-a.beat)*60/a.bpm}}segAtBeat(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].beat<=t+dt)return n[a];return n[0]}segAtTime(t){const n=this.segs;for(let a=n.length-1;a>0;a--)if(n[a].time<=t+dt)return n[a];return n[0]}}const hc=Object.freeze({beatsPerBar:4,beatUnit:4}),wt=1e-9;function mc(e){return Math.floor(e+wt)}function Ao(e,t,n=!1){if(!(t>0))return e;const i=Math.ceil(e/t-wt)*t;return n&&i<=e+wt?i+t:i}class fc{tempo;meter;startTime=null;stopTime=null;stoppedBeat=0;constructor(t={}){this.tempo=new hi({bpm:t.bpm,minBpm:t.minBpm,maxBpm:t.maxBpm}),this.meter={...t.meter??hc}}get bpm(){return this.tempo.bpm}get running(){return this.startTime!==null&&this.stopTime===null}isPlayingAt(t){return this.startTime!==null&&t>=this.startTime-wt&&(this.stopTime===null||t<this.stopTime-wt)}start(t){const n=t.beat??0;this.tempo.restart({beat:n,time:t.at},t.bpm??this.tempo.bpm),this.startTime=t.at,this.stopTime=null,this.stoppedBeat=n}stop(t){if(this.startTime===null)return;const n=Math.max(t.at,this.startTime);this.stoppedBeat=this.tempo.beatAt(n),this.stopTime=n}reset(t=0){this.startTime=null,this.stopTime=null,this.stoppedBeat=t}setTempo(t,n){if(!this.running||n===void 0){const a=this.tempo.anchor;return this.tempo.setTempoAt(t,a.beat),a.beat}return this.tempo.setTempoAt(t,n),n}beatAt(t){return this.startTime===null?this.stoppedBeat:this.stopTime!==null&&t>=this.stopTime-wt?this.stoppedBeat:this.tempo.beatAt(t)}timeAt(t){return this.tempo.timeAt(t)}position(t){const n=Math.max(1,this.meter.beatsPerBar),a=mc(t/n),i=Math.max(0,t-a*n);return{beat:t,bar:a,beatInBar:i,barPhase:i/n}}nextBar(t,n=!1){return Ao(t,Math.max(1,this.meter.beatsPerBar),n)}get anchor(){return this.tempo.anchor}get tempoPoints(){return this.tempo.points}}const So="nc-clock/snapshot",Mo=1;function gc(e,t="local"){return{format:So,version:Mo,timebase:t,anchor:e.tempo.anchor,tempo:e.tempo.points,meter:{...e.meter},playing:e.running,startTime:e.startTime,stopTime:e.stopTime,stoppedBeat:e.stoppedBeat}}function bc(e,t){const n=yc(t);e.tempo.reset(n.anchor,n.tempo),e.meter={...n.meter},e.startTime=n.startTime,e.stopTime=n.stopTime,e.stoppedBeat=n.stoppedBeat}const Fe=e=>typeof e=="number"&&Number.isFinite(e),Ji=e=>e===null||Fe(e);function yc(e){const t=e,n=a=>{throw new TypeError(`Invalid nc-clock snapshot: ${a}`)};return(!t||typeof t!="object")&&n("not an object"),t.format!==So&&n("format"),(!Fe(t.version)||Math.floor(t.version)!==Mo)&&n(`unsupported version ${String(t.version)}`),(!t.anchor||!Fe(t.anchor.beat)||!Fe(t.anchor.time))&&n("anchor"),(!Array.isArray(t.tempo)||!t.tempo.length||!t.tempo.every(a=>a&&Fe(a.beat)&&Fe(a.bpm)&&a.bpm>0))&&n("tempo"),(!t.meter||!Fe(t.meter.beatsPerBar)||t.meter.beatsPerBar<1||!Fe(t.meter.beatUnit))&&n("meter"),(!Ji(t.startTime)||!Ji(t.stopTime)||!Fe(t.stoppedBeat))&&n("transport times"),t}class vc{transport;timebase;authority=null;listeners=new Set;constructor(t={}){this.transport=new fc(t),this.timebase=t.timebase??"local"}get external(){return this.authority!==null}setAuthority(t){this.authority=t}onChange(t){return this.listeners.add(t),()=>{this.listeners.delete(t)}}subscribe(t){const n=this.onChange(t);return t({kind:"snapshot",snapshot:this.toSnapshot(),replay:!0}),n}play(t){return this.authority?(this.authority.requestStart(t),!1):(this.commitStart(t.at,t.beat??0,t.bpm),!0)}stop(t){return this.authority?(this.authority.requestStop(t),!1):(this.commitStop(t.at,t.all??!1),!0)}setTempo(t){return this.authority?(this.authority.requestTempo(t),!1):(this.commitTempo(t.bpm,t.atBeat),!0)}setMeter(t){this.transport.meter={...t}}commitStart(t,n=0,a){this.transport.start({at:t,beat:n,bpm:a}),this.emit({kind:"start",at:t,beat:n})}commitStop(t,n=!1){this.transport.stop({at:t}),this.emit({kind:"stop",at:t,all:n})}commitTempo(t,n){const a=this.transport.setTempo(t,n);this.emit({kind:"tempo",atBeat:a,bpm:this.transport.tempo.bpmAt(a)})}applySnapshot(t){bc(this.transport,t),this.emit({kind:"snapshot",snapshot:t})}toSnapshot(){return gc(this.transport,this.timebase)}emit(t){for(const n of[...this.listeners])n(t)}}const wc="nc-sync/1",xc=1,$c="nc-sync",kc="nc-sync-leader",Ec=0,To=.5,Lo=.75;function Ac(e){return typeof e=="number"&&Number.isFinite(e)&&e>=To&&e<=Lo?e:null}const ca=Object.freeze({tempoRange:[20,300],tempoRamps:!1,swing:!1,meter:!1,prefersLeader:!1,canLead:!0,sampleAccurate:!1}),qt=e=>typeof e=="number"&&Number.isFinite(e),fn=e=>typeof e=="string"&&e.length>0;function Sc(e){const t=e;if(!t||typeof t!="object"||typeof t.proto!="string"||!t.proto.startsWith("nc-sync/")||parseInt(t.proto.slice(8),10)!==xc||!fn(t.type)||!fn(t.from)||!qt(t.term)||!qt(t.seq)||!qt(t.sentAt))return null;switch(t.type){case"hello":return fn(t.app)&&typeof t.capabilities=="object"&&t.capabilities?t:null;case"bye":return t;case"heartbeat":return t;case"state":return t.clock&&typeof t.clock=="object"?t:null;case"transport":return t.action==="start"||t.action==="stop"?t:null;case"tempo":return qt(t.bpm)&&t.bpm>0?t:null;case"snapshot":return(t.op==="recall"||t.op==="stopSequence"||t.op==="store")&&qt(t.slot)?t:null;case"ping":case"pong":return fn(t.id)?t:null;case"notes":return Array.isArray(t.notes)?t:null;default:return null}}function Mc(e,t,n,a,i){return{proto:wc,from:t,term:n,seq:a,sentAt:i,...e}}function je(){return(performance.timeOrigin+performance.now())/1e3}const da=.003,Tc=3,ua=.002+1e-6,Lc=.01,Zi=500;class Cc{ctx;keep;intervalMs;latencyIntervalMs;timeOrigin;perfNow;offsets=[];settled=!1;lastReal=!1;timer=null;warmIntervalMs;warmTimer=null;lastLatencyRead=-1/0;latency=null;onSink=()=>{this.offsets.length=0,this.settled=!1,this.revertUntil=-1/0,this.clearPending(),this.waitSince=null,this.readLatency(!0),this.sample(),this.warm()};pausedCtx=null;pausedWall=0;onState=()=>{const t=this.ctx;if(t.state!=="running"){this.clearPending(),this.coolDown(),this.pausedCtx===null&&(this.pausedCtx=t.currentTime,this.pausedWall=this.perfNow());return}if(this.pausedCtx===null){this.warm();return}const n=t.currentTime-this.pausedCtx-(this.perfNow()-this.pausedWall)/1e3;this.pausedCtx=null,Math.abs(n)<=(this.stepThreshold>0?Lc:0)?this.warm():this.onSink()};waitSince=null;lastStampC=-1;lastStampP=-1;stampSince=0;stepThreshold;stepConfirmations;stepCheckMs;stepTimer=null;pendingStep=null;pendingCount=0;pendingBack=!1;stepConfirmMs;confirmTimer=null;pendingStamp=0;stepCount=0;revertCount=0;stepRevert;preStep=[];preStepBase=0;preStepCount=0;revertUntil=-1/0;scratch=[];stepListeners=new Set;userOffsetMs;constructor(t,n={}){this.ctx=t,this.keep=Math.max(1,n.samples??9),this.intervalMs=n.intervalMs??250,this.warmIntervalMs=Math.max(0,n.warmIntervalMs??5),this.latencyIntervalMs=n.latencyIntervalMs??5e3,this.userOffsetMs=n.userOffsetMs??0,this.timeOrigin=n.timeOrigin??performance.timeOrigin,this.perfNow=n.perfNow??(()=>performance.now()),this.stepThreshold=Math.max(0,n.stepThresholdMs??2)/1e3,this.stepConfirmations=Math.max(1,n.stepConfirmations??3),this.stepCheckMs=n.stepCheckMs??50,this.stepConfirmMs=Math.max(0,n.stepConfirmMs??10),this.stepRevert=Math.max(0,n.stepRevertMs??200)/1e3}get reanchors(){return this.stepCount}get reverts(){return this.revertCount}onStep(t){return this.stepListeners.add(t),()=>{this.stepListeners.delete(t)}}checkStep(){if(this.stepThreshold===0||this.ctx.state!=="running"||!this.settled)return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null,n=t?.contextTime??0,a=t?.performanceTime??0;if(!(n>=da&&a>0)||!Number.isFinite(n)||!Number.isFinite(a))return!1;const i=n-(this.timeOrigin+a)/1e3,o=this.median(),s=i-o,l=Math.abs(i-this.preStepBase),u=this.ctx.currentTime<=this.revertUntil&&l<=this.stepThreshold&&l<Math.abs(s);return!u&&Math.abs(s)<=this.stepThreshold?(this.clearPending(),!1):this.pendingStep!==null&&u===this.pendingBack&&(u||Math.abs(s-this.pendingStep)<this.stepThreshold/2)?n===this.pendingStamp?(this.followUp(),!1):(this.pendingStamp=n,++this.pendingCount<this.stepConfirmations?(this.followUp(),!1):(this.clearPending(),this.reanchor(i,o,u))):(this.pendingStep=s,this.pendingBack=u,this.pendingCount=1,this.pendingStamp=n,this.stepConfirmations===1?this.checkStep():(this.followUp(),!1))}reanchor(t,n,a){const i=this.ctx.currentTime,o=i<=this.revertUntil;let s;if(a&&o){const l=this.offsets,u=this.preStep;l.length=0;for(let c=0;c<u.length;c++)l.push(u[c]);this.stepCount=this.preStepCount,this.revertCount++,this.revertUntil=-1/0,s={stepSeconds:this.preStepBase-n,confirmedAt:i,reanchors:this.stepCount,revert:!0}}else{if(Math.abs(t-n)<=this.stepThreshold)return!1;if(!o){const c=this.offsets,d=this.preStep;d.length=0;for(let p=0;p<c.length;p++)d.push(c[p]);this.preStepBase=n,this.preStepCount=this.stepCount,this.revertUntil=this.stepRevert>0?i+this.stepRevert:-1/0}const l=this.offsets,u=t-n;for(let c=0;c<l.length;c++)l[c]+=u;this.stepCount++,s={stepSeconds:t-n,confirmedAt:i,reanchors:this.stepCount,revert:!1}}for(const l of[...this.stepListeners])l(s);return!0}median(){const t=this.offsets,n=this.scratch,a=t.length;n.length=a;for(let o=0;o<a;o++){const s=t[o];let l=o-1;for(;l>=0&&n[l]>s;)n[l+1]=n[l],l--;n[l+1]=s}const i=a>>1;return a%2?n[i]:(n[i-1]+n[i])/2}followUp(){!this.stepTimer||this.stepConfirmMs===0||this.confirmTimer||(this.confirmTimer=setTimeout(()=>{this.confirmTimer=null,this.checkStep()},this.stepConfirmMs))}clearPending(){this.pendingStep=null,this.pendingBack=!1,this.pendingCount=0,this.pendingStamp=0,this.confirmTimer&&clearTimeout(this.confirmTimer),this.confirmTimer=null}sharedNow(){return(this.timeOrigin+this.perfNow())/1e3}sample(){const t=this.ctx;if(t.state!=="running")return!1;this.readLatency(!1);let n=null,a=!1;const i=typeof t.getOutputTimestamp=="function"?t.getOutputTimestamp():null;if(i&&Number.isFinite(i.contextTime)&&Number.isFinite(i.performanceTime)&&i.contextTime>=da&&i.performanceTime>0)if(this.waitSince=null,i.contextTime===this.lastStampC&&i.performanceTime===this.lastStampP&&this.offsets.length){if(this.ready||this.perfNow()-this.stampSince<Zi)return!0;t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow()),a=!1}else this.lastStampC=i.contextTime,this.lastStampP=i.performanceTime,this.stampSince=this.perfNow(),n=i.contextTime-(this.timeOrigin+i.performanceTime)/1e3,a=!0;else if(!i||!(i.contextTime>=da)&&!(i.contextTime>0&&!(i.performanceTime>0))){if(i){const o=this.perfNow();if(this.waitSince===null&&(this.waitSince=o),o-this.waitSince<Zi)return!1}t.currentTime>0&&(n=t.currentTime-(this.latency??0)-this.sharedNow())}return n===null||!Number.isFinite(n)?!1:(this.offsets.push(n),this.offsets.length>this.keep&&this.offsets.shift(),this.lastReal=a,this.settled||this.settle(),!0)}settle(){const t=this.offsets,n=t.length,a=Math.min(Tc,this.keep);if(n<a)return;if(!this.lastReal||n>=this.keep){this.settled=!0;return}let i=-1,o=0;for(let l=0;l<n;l++){let u=0;for(let c=0;c<n;c++)Math.abs(t[c]-t[l])<=ua&&u++;u>o&&(i=l,o=u)}if(o<a)return;const s=t[i];for(let l=n-1;l>=0;l--)Math.abs(t[l]-s)>ua&&t.splice(l,1);this.settled=!0}warm(){!this.timer||this.warmTimer||this.settled||this.warmIntervalMs===0||this.ctx.state!=="running"||(this.warmTimer=setInterval(()=>{this.settled||this.sample(),(this.settled||this.ctx.state!=="running")&&this.coolDown()},this.warmIntervalMs))}coolDown(){this.warmTimer&&clearInterval(this.warmTimer),this.warmTimer=null}get ready(){return this.settled}sampleIfNotReady(){return this.ready?!0:(this.sample(),this.ready)}settledNow(){if(this.ctx.state!=="running"||!this.sampleIfNotReady())return!1;const t=typeof this.ctx.getOutputTimestamp=="function"?this.ctx.getOutputTimestamp():null;if(!t||!t.contextTime||!t.performanceTime||!Number.isFinite(t.contextTime)||!Number.isFinite(t.performanceTime))return!0;const n=t.contextTime-(this.timeOrigin+t.performanceTime)/1e3;return Math.abs(n-(this.offset-this.userOffsetMs/1e3))<=ua}whenSettled(t=1500){if(this.settledNow())return null;const n=this.perfNow()+t;return new Promise(a=>{const i=()=>{this.settledNow()?a(!0):this.perfNow()>=n?a(!1):setTimeout(i,2)};setTimeout(i,2)})}get offset(){return this.offsets.length||this.sample(),(this.offsets.length?this.median():this.ctx.currentTime-this.sharedNow())+this.userOffsetMs/1e3}toContextTime(t){return t+this.offset}toSharedTime(t){return t-this.offset}get outputLatencyMs(){return this.readLatency(!1),this.latency===null?null:this.latency*1e3}start(){this.timer||(this.sample(),this.timer=setInterval(()=>this.sample(),this.intervalMs),this.stepThreshold>0&&(this.stepTimer=setInterval(()=>this.checkStep(),this.stepCheckMs)),this.warm(),this.ctx.addEventListener?.("sinkchange",this.onSink),this.pausedCtx=null,this.ctx.state!=="running"&&this.onState(),this.ctx.addEventListener?.("statechange",this.onState))}stop(){this.timer&&clearInterval(this.timer),this.timer=null,this.coolDown(),this.stepTimer&&clearInterval(this.stepTimer),this.stepTimer=null,this.clearPending(),this.revertUntil=-1/0,this.pausedCtx=null,this.pausedWall=0,this.ctx.removeEventListener?.("sinkchange",this.onSink),this.ctx.removeEventListener?.("statechange",this.onState)}readLatency(t){const n=this.perfNow();if(!t&&n-this.lastLatencyRead<this.latencyIntervalMs)return;this.lastLatencyRead=n;const a=this.ctx.outputLatency,i=this.ctx.baseLatency;this.latency=Number.isFinite(a)&&a>0?a:Number.isFinite(i)&&i>0?i:null}}class Nc{id;term=0;peers=new Map;o;startWaits=0;caps;clock;channel=null;channelOption;locks;seq=0;lastSeq=new Map;leader=!1;joinedAt=0;heartbeat=null;grace=null;releaseLock=null;lockAbort=null;yielding=!1;stopAll=!1;roleListeners=new Set;peerListeners=new Set;snapshotListeners=new Set;messageListeners=new Set;swingListeners=new Set;appliedSwing=null;constructor(t){const n=globalThis;this.clock=t.clock,this.caps={...ca,...t.capabilities},this.channelOption=t.channel??$c,this.locks=t.locks===void 0?n.navigator?.locks??null:t.locks,this.id=t.instanceId??n.crypto?.randomUUID?.()??`p-${Math.random().toString(36).slice(2)}`,this.o={app:t.app,version:t.version,clock:t.clock,now:t.now??(()=>(n.performance.timeOrigin+n.performance.now())/1e3),audio:t.audio??(()=>"none"),hidden:t.hidden??(()=>n.document?.visibilityState==="hidden"),outputLatencyMs:t.outputLatencyMs??(()=>null),swing:t.swing??(()=>null),heartbeatMs:t.heartbeatMs??1e3,peerTimeoutMs:t.peerTimeoutMs??3e3,hiddenPeerTimeoutMs:t.hiddenPeerTimeoutMs??65e3,startLeadSeconds:t.startLeadSeconds??.2,minLeadSeconds:t.minLeadSeconds??.1,joinGraceMs:t.joinGraceMs??300,startGate:t.startGate??(()=>null),gatedStartLeadSeconds:t.gatedStartLeadSeconds??.3}}get isLeader(){return this.leader}get capabilities(){return{...this.caps}}async start(){this.channel||(this.channel=typeof this.channelOption=="string"?new BroadcastChannel(this.channelOption):this.channelOption,this.channel.onmessage=t=>this.receive(t.data),this.joinedAt=this.o.now(),this.clock.setAuthority(this),this.send({type:"hello",app:this.o.app,version:this.o.version,capabilities:this.caps,audio:this.o.audio(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt}),this.heartbeat=setInterval(()=>this.beat(),this.o.heartbeatMs),this.locks?this.elect():this.grace=setTimeout(()=>{this.grace=null,this.elect()},this.o.joinGraceMs))}stop(){this.channel&&(this.heartbeat&&clearInterval(this.heartbeat),this.heartbeat=null,this.grace&&clearTimeout(this.grace),this.grace=null,this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock?.(),this.releaseLock=null,this.setLeader(!1),this.send({type:"bye"}),this.channel.onmessage=null,typeof this.channelOption=="string"&&this.channel.close(),this.channel=null,this.clock.setAuthority(null),this.peers.clear(),this.lastSeq.clear())}onRole(t){return this.roleListeners.add(t),()=>this.roleListeners.delete(t)}onPeers(t){return this.peerListeners.add(t),()=>this.peerListeners.delete(t)}onSnapshot(t){return this.snapshotListeners.add(t),()=>this.snapshotListeners.delete(t)}onMessage(t){return this.messageListeners.add(t),()=>this.messageListeners.delete(t)}onSwing(t){return this.swingListeners.add(t),()=>this.swingListeners.delete(t)}get swing(){return this.appliedSwing}publishState(){return!this.leader||!this.channel?!1:(this.broadcastState(),!0)}sendSnapshot(t,n,a={}){this.send({type:"snapshot",op:t,slot:n,...a})}requestStart(t){this.gated(n=>this.startNow(t,n))||this.startNow(t)}startNow(t,n){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStart(n);return}this.send({type:"transport",action:"start",...t.beat!==void 0?{atBeat:t.beat}:{}})}gated(t){const n=++this.startWaits;if(this.clock.transport.running)return!1;let a=null;try{a=this.o.startGate()}catch{a=null}if(!a||typeof a.then!="function")return!1;const i=this.o.now(),o=()=>{n===this.startWaits&&t(i)};return a.then(o,o),!0}requestStop(t){if(this.startWaits++,!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideStop(t.all??!1);return}this.send({type:"transport",action:"stop",all:t.all??!1})}requestTempo(t){if(!this.leader&&!this.knownLeader()&&this.becomeLeaderIfAlone(),this.leader){this.decideTempo(t.bpm,t.atBeat,t.rampBeats);return}this.send({type:"tempo",bpm:t.bpm,...t.atBeat!==void 0?{atBeat:t.atBeat}:{},...t.rampBeats?{rampBeats:t.rampBeats}:{}})}decideStart(t){const n=this.clock.transport,a=this.o.now();if(n.isPlayingAt(a)&&n.stopTime===null){const i=n.nextBar(n.beatAt(a+this.o.minLeadSeconds));this.clock.commitStart(n.timeAt(i),0)}else{const i=a+this.o.startLeadSeconds;this.clock.commitStart(t===void 0?i:Math.max(t+this.o.gatedStartLeadSeconds,i),0)}this.broadcastState()}decideStop(t){this.stopAll=t,this.clock.commitStop(this.o.now()+this.o.minLeadSeconds,t),this.broadcastState(),this.stopAll=!1}decideTempo(t,n,a){const[i,o]=this.tempoRange();t=Math.min(o,Math.max(i,t));const s=this.clock.transport,l=this.o.now();if(!s.running){this.clock.commitTempo(t),this.broadcastState();return}const u=s.beatAt(l+this.o.minLeadSeconds),c=Math.max(n??Ao(u,1),u);a&&a>0?(s.tempo.rampTempo(t,c,a),this.clock.applySnapshot(this.clock.toSnapshot())):this.clock.commitTempo(t,c),this.broadcastState()}tempoRange(){let[t,n]=this.caps.tempoRange;for(const a of this.peers.values())t=Math.max(t,a.capabilities.tempoRange[0]),n=Math.min(n,a.capabilities.tempoRange[1]);return t<=n?[t,n]:this.caps.tempoRange}broadcastState(){if(!this.leader)return;const t=this.o.swing(),n=typeof t=="number"&&Number.isFinite(t)?Math.min(Lo,Math.max(To,t)):Ec;this.send({type:"state",clock:this.clock.toSnapshot(),swing:n,leaderApp:this.o.app,...this.stopAll?{stopAll:!0}:{}}),this.noteSwing(n)}noteSwing(t){const n=Ac(t);if(!(n===null||n===this.appliedSwing)){this.appliedSwing=n;for(const a of[...this.swingListeners])a(n)}}receive(t){const n=Sc(t);if(!n||n.from===this.id)return;const a=this.lastSeq.get(n.from);if(!(a!==void 0&&n.seq<=a)){switch(this.lastSeq.set(n.from,n.seq),n.term>this.term&&n.type!=="state"&&(this.term=Math.max(this.term,n.term)),n.type){case"hello":case"heartbeat":{const i=this.peers.has(n.from);this.peers.set(n.from,{id:n.from,app:n.app,capabilities:{...ca,...n.capabilities},audio:n.audio,hidden:n.type==="heartbeat"?n.hidden:!1,leader:n.type==="heartbeat"?n.leader:!1,joinedAt:n.joinedAt,lastSeen:this.o.now(),outputLatencyMs:n.outputLatencyMs}),i||this.emitPeers(),n.type==="hello"&&(this.leader&&this.broadcastState(),this.sendHeartbeat()),this.elect();break}case"bye":this.peers.delete(n.from),this.lastSeq.delete(n.from),this.emitPeers(),this.elect();break;case"state":{if(n.term<this.term)return;if(this.leader){if(n.term===this.term&&this.outranks(n.from)){this.broadcastState();return}this.setLeader(!1)}this.term=n.term;for(const o of this.peers.values())o.leader=o.id===n.from;const i=this.peers.get(n.from);i?i.lastSeen=this.o.now():(this.peers.set(n.from,{id:n.from,app:n.leaderApp,capabilities:{...ca},audio:"none",hidden:!1,leader:!0,joinedAt:n.sentAt,lastSeen:this.o.now(),outputLatencyMs:null}),this.emitPeers()),this.clock.applySnapshot(n.clock),this.noteSwing(n.swing),n.stopAll&&this.clock.commitStop(n.clock.stopTime??this.o.now(),!0);break}case"transport":this.leader&&(n.action==="start"?this.gated(i=>{this.leader&&this.decideStart(i)})||this.decideStart():(this.startWaits++,this.decideStop(n.all??!1)));break;case"tempo":this.leader&&this.decideTempo(n.bpm,n.atBeat,n.rampBeats);break;case"snapshot":for(const i of[...this.snapshotListeners])i(n);break;case"ping":this.send({type:"pong",id:n.id,receivedAt:this.o.now()});break}for(const i of[...this.messageListeners])i(n)}}outranked(){if(!this.caps.canLead)return!0;for(const t of this.peers.values())if(t.capabilities.canLead&&t.capabilities.prefersLeader&&!this.caps.prefersLeader)return!0;return!1}elect(){if(!this.channel)return;const t=this.outranked();if(this.locks){if(t){if(this.yielding=!0,this.lockAbort?.abort(),this.lockAbort=null,this.releaseLock){const s=this.releaseLock;this.releaseLock=null,s()}return}if(this.yielding=!1,this.releaseLock||this.lockAbort)return;const o=new AbortController;this.lockAbort=o,this.locks.request(kc,{signal:o.signal},()=>(this.lockAbort=null,!this.channel||this.yielding?Promise.resolve():new Promise(s=>{this.releaseLock=()=>{this.setLeader(!1),s()},this.setLeader(!0)}))).catch(()=>{}).finally(()=>{this.lockAbort===o&&(this.lockAbort=null),this.channel&&!this.releaseLock&&!this.lockAbort&&!this.yielding&&queueMicrotask(()=>this.elect())});return}if(this.grace)return;const n=(o,s,l)=>[o?0:1,s,l];let a=n(this.caps.prefersLeader,this.joinedAt,this.id),i=this.caps.canLead?this.id:null;for(const o of this.peers.values()){if(!o.capabilities.canLead)continue;const s=n(o.capabilities.prefersLeader,o.joinedAt,o.id);(i===null||s[0]<a[0]||s[0]===a[0]&&(s[1]<a[1]||s[1]===a[1]&&s[2]<a[2]))&&(a=s,i=o.id)}this.setLeader(i===this.id)}outranks(t){const n=this.peers.get(t);if(!n)return this.id<t;const a=[this.caps.prefersLeader?0:1,this.joinedAt],i=[n.capabilities.prefersLeader?0:1,n.joinedAt];return a[0]!==i[0]?a[0]<i[0]:a[1]!==i[1]?a[1]<i[1]:this.id<t}knownLeader(){return[...this.peers.values()].some(t=>t.leader)}becomeLeaderIfAlone(){!this.peers.size&&!this.locks&&this.caps.canLead&&this.setLeader(!0)}setLeader(t){if(t!==this.leader){this.leader=t,t&&(this.term+=1,this.broadcastState());for(const n of[...this.roleListeners])n(t?"leader":"follower");this.beat()}}beat(){if(!this.channel)return;const t=this.o.now();let n=!1;for(const a of[...this.peers.values()]){const i=(a.hidden?this.o.hiddenPeerTimeoutMs:this.o.peerTimeoutMs)/1e3;t-a.lastSeen>i&&(this.peers.delete(a.id),this.lastSeq.delete(a.id),n=!0)}n&&(this.emitPeers(),this.elect()),this.sendHeartbeat()}sendHeartbeat(){this.send({type:"heartbeat",app:this.o.app,leader:this.leader,audio:this.o.audio(),hidden:this.o.hidden(),outputLatencyMs:this.o.outputLatencyMs(),joinedAt:this.joinedAt,capabilities:this.caps})}emitPeers(){const t=[...this.peers.values()];for(const n of[...this.peerListeners])n(t)}send(t){this.channel&&this.channel.postMessage(Mc(t,this.id,this.term,++this.seq,this.o.now()))}}const Fc="modulepreload",zc=function(e){return"/studio/"+e},er={},Pc=function(t,n,a){let i=Promise.resolve();if(n&&n.length>0){let s=function(c){return Promise.all(c.map(d=>Promise.resolve(d).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");i=s(n.map(c=>{if(c=zc(c),c in er)return;er[c]=!0;const d=c.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${p}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":Fc,d||(h.as="script"),h.crossOrigin="",h.href=c,u&&h.setAttribute("nonce",u),document.head.appendChild(h),d)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${c}`)))})}))}function o(s){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=s,window.dispatchEvent(l),!l.defaultPrevented)throw s}return i.then(s=>{for(const l of s||[])l.status==="rejected"&&o(l.reason);return t().catch(o)})};var Dc=[[.125,"1/32"],[.25,"1/16"],[.5,"1/8"],[.75,"1/8 dotted"],[1,"1/4"],[1.5,"1/4 dotted"],[2,"1/2"]],Pa=[.25,.5,.75,1,1.5,2],Rc=4.9,K={cutoff:{pow:[2e4,150/2e4],div:100,round:!0,zeroNull:!0},hpHz:{pow:[20,100],div:100,round:!0,zeroNull:!0},hpQ:{pow:[.7071,8/.7071],div:100,fixed:3},bpHz:{pow:[100,80],div:100,round:!0},bpQ:{pow:[.4,20],div:100,fixed:2},midHz:{pow:[200,25],div:100,round:!0},eqQ:{pow:[.3,20],div:100,fixed:2},ratio:{pow:[1,20],div:100,fixed:2},rate:{pow:[.05,200],div:100,fixed:3},driveTone:{exp2:[500,5],div:99,round:!0},delayTone:{exp2:[800,4],div:99,round:!0}},et={fmt:"wet"},Ee={fmt:"pct"},ut={fmt:"db"},gn={fmt:"signedPct"},pa={fmt:"num",suffix:" ms"},X={div:100};function F(e,t,n,a,i,o,s,l){var u={key:e,label:t,min:n,max:a,default:i,step:1,k:o,unit:null,format:s};if(l)for(var c in l)u[c]=l[c];return u}function bn(e){return e.map(function(t){return{value:t[0],label:t[1]}})}var Gt=[{type:"lowpass",label:"Low-pass filter",hidden:!0,dials:[F("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:K.cutoff,astrid:!0,zero:"open"})]},{type:"highpass",label:"High-pass filter",hidden:!0,dials:[F("cutoff","Cutoff",0,100,0,1,{fmt:"hz",law:K.hpHz,astrid:!0,zero:"off"}),F("q","Resonance",0,100,0,2,{fmt:"q",law:K.hpQ},{dsp:{law:K.hpQ}})]},{type:"bandpass",label:"Band-pass filter",hidden:!0,dials:[F("centre_hz","Centre",0,100,53,1,{fmt:"hz",law:K.bpHz,astrid:!0},{dsp:{law:K.bpHz}}),F("q","Q",0,100,0,2,{fmt:"q",law:K.bpQ},{dsp:{law:K.bpQ}}),F("mix","Mix",0,100,100,3,et,{dsp:X,unit:"%"})]},{type:"delay",label:"Delay",fixed:!0,tempoSynced:!0,dials:[F("delay_beats","Timing",.125,2,.75,1,{fmt:"tempoMs"},{step:null,unit:"beats",options:bn(Dc),overriddenBy:"beats_free",tempoSynced:!0}),F("feedback","Feedback",0,90,35,2,Ee,{dsp:X,unit:"%"}),F("mix","Wet/dry",0,100,0,3,et,{dsp:X,unit:"%",astridKey:"wet"}),F("tone","Tone",0,100,100,4,{fmt:"hz",law:K.delayTone,offAt:100},{dsp:{div:99},more:!0}),F("low_cut","Low cut",0,1e3,0,5,{fmt:"hz",zero:"off"},{unit:"Hz",curve:"log",more:!0}),F("mode","Mode",0,1,0,6,{fmt:"option"},{step:null,options:bn([[0,"Insert"],[1,"Send"]]),more:!0}),F("send","Send",0,100,100,7,Ee,{dsp:X,unit:"%",more:!0}),F("mod_send","Accent → send",-100,100,0,8,gn,{dsp:X,unit:"%",more:!0}),F("beats_free","Free time",0,2,0,9,{fmt:"freeBeats"},{step:.001,exact:!0,minOn:.125,unit:"beats",tempoSynced:!0,more:!0})]},{type:"plate",label:"Reverb",fixed:!0,dials:[F("predelay","Pre-delay",0,200,0,1,pa,{dsp:{div:1e3},unit:"ms"}),F("size","Size",0,100,50,2,{fmt:"fixed",div:100,add:.5,digits:2,suffix:"×"},{dsp:X,unit:"%"}),F("decay","Decay",0,100,50,3,Ee,{dsp:X,unit:"%"}),F("damping","Damping",0,100,0,4,Ee,{dsp:X,unit:"%"}),F("mix","Mix",0,100,0,5,et,{dsp:X,unit:"%"})]},{type:"flanger",label:"Flanger",dials:[F("rate","Rate",0,100,26,1,{fmt:"rate",law:K.rate},{dsp:{law:K.rate}}),F("depth","Depth",0,100,70,2,Ee,{dsp:X,unit:"%"}),F("feedback","Feedback",-90,90,50,3,gn,{dsp:X,unit:"%"}),F("mix","Mix",0,100,50,4,et,{dsp:X,unit:"%"})]},{type:"chorus",label:"Chorus",dials:[F("rate","Rate",0,100,52,1,{fmt:"rate",law:K.rate},{dsp:{law:K.rate}}),F("depth","Depth",0,100,50,2,Ee,{dsp:X,unit:"%"}),F("spread","Spread",0,100,70,3,Ee,{dsp:X,unit:"%"}),F("mix","Mix",0,100,40,4,et,{dsp:X,unit:"%"})]},{type:"phaser",label:"Phaser",dials:[F("rate","Rate",0,100,39,1,{fmt:"rate",law:K.rate},{dsp:{law:K.rate}}),F("depth","Depth",0,100,70,2,Ee,{dsp:X,unit:"%"}),F("stages","Stages",4,8,6,3,{fmt:"stages"},{step:null,options:bn([[4,"4"],[6,"6"],[8,"8"]])}),F("feedback","Feedback",0,90,30,4,Ee,{dsp:X,unit:"%"}),F("mix","Mix",0,100,50,5,et,{dsp:X,unit:"%"})]},{type:"eq",label:"EQ",note:"Low shelf 150 Hz, high shelf 6 kHz.",dials:[F("low_db","Low",-18,18,0,1,ut,{unit:"dB"}),F("mid_db","Mid",-18,18,0,2,ut,{unit:"dB"}),F("mid_hz","Mid at",0,100,50,3,{fmt:"hz",law:K.midHz,astrid:!0},{dsp:{law:K.midHz}}),F("mid_q","Mid Q",0,100,40,5,{fmt:"q",law:K.eqQ},{dsp:{law:K.eqQ}}),F("high_db","High",-18,18,0,4,ut,{unit:"dB"})]},{type:"drive",label:"Drive",fixed:!0,dials:[F("drive_db","Drive",0,24,0,1,{fmt:"db",zero:"clean"},{unit:"dB",stepWhen:[{key:"curve",value:1,step:.1}]}),F("output_db","Output",-12,12,0,2,ut,{unit:"dB"}),F("mix","Mix",0,100,100,3,et,{dsp:X,unit:"%"}),F("curve","Curve",0,1,0,4,{fmt:"option"},{step:null,options:bn([[0,"Smooth"],[1,"Acid"]]),more:!0}),F("tone","Tone",0,100,100,5,{fmt:"hz",law:K.driveTone,offAt:100},{dsp:{div:99},more:!0}),F("mod_drive","Accent → drive",-100,100,0,6,gn,{dsp:X,unit:"%",more:!0}),F("mod_tone","Accent → tone",-100,100,0,7,gn,{dsp:X,unit:"%",more:!0})]},{type:"compressor",label:"Compressor",dials:[F("threshold_db","Threshold",-60,0,0,1,ut,{unit:"dB"}),F("ratio","Ratio",0,100,0,2,{fmt:"ratio",law:K.ratio},{dsp:{law:K.ratio}}),F("attack_ms","Attack",1,100,10,3,pa,{unit:"ms"}),F("release_ms","Release",10,1e3,150,4,pa,{unit:"ms"}),F("makeup_db","Makeup",0,24,0,5,ut,{unit:"dB"})]},{type:"width",label:"Width",note:"A mono sound has no sides, so width leaves it as it is.",dials:[F("width","Width",0,200,100,1,Ee,{dsp:X,unit:"%"}),F("balance","Balance",-100,100,0,2,{fmt:"balance"},{dsp:X})]}],Ic=Gt.map(function(e){return e.type}),qc=Gt.filter(function(e){return!e.hidden}).map(function(e){return e.type}),Oc={reverb:"plate"},St={},Co=[],Wt=[];function Bc(e){St[e.type]||Co.push(e.type),St[e.type]=e;for(var t=0;t<Wt.length;t++)try{Wt[t](e.type)}catch(n){typeof console<"u"&&console.error(n)}}function _c(){return Co.map(function(e){return St[e]})}function jc(e){return Wt.push(e),function(){var t=Wt.indexOf(e);t>=0&&Wt.splice(t,1)}}function No(e){return typeof e=="string"&&/^plugin:[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(e)&&e.length<=71}function mi(e){var t=Oc[e]||e;return Ic.indexOf(t)>=0||typeof t=="string"&&St[t]?t:null}function re(e){for(var t=mi(e),n=0;n<Gt.length;n++)if(Gt[n].type===t)return Gt[n];return t&&St[t]?St[t]:null}function Hc(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function gt(e,t){if(e.zeroNull&&t<=0)return null;var n=e.pow?e.pow[0]*Math.pow(e.pow[1],t/e.div):e.exp2[0]*Math.pow(2,e.exp2[1]*t/e.div);return e.fixed!==void 0?+n.toFixed(e.fixed):e.round?Math.round(n):n}function Nn(e,t){var n=e.dsp;if(!n)return t;if(n.div)return t/n.div;var a=gt(n.law,t);return a===null?0:a}function tr(e,t){return Math.min(Rc,e*60/(t>0?t:120))}var nr=function(e){return e>0?"+":e<0?"−":""};function Uc(e){return e==null?"open":e>=1e3?(e/1e3).toFixed(e>=1e4?0:1)+" kHz":e+" Hz"}function Fo(e,t,n){var a=e.format,i;switch(a.fmt){case"db":return t===0&&a.zero?a.zero:nr(t)+Math.abs(t)+" dB";case"pct":return t+"%";case"wet":return t+"% wet";case"signedPct":return nr(t)+Math.abs(t)+"%";case"num":return t+a.suffix;case"fixed":return(a.add+t/a.div).toFixed(a.digits)+a.suffix;case"hz":return a.offAt!==void 0&&t>=a.offAt?"off":a.law?(i=gt(a.law,t),i===null?a.zero||"open":a.astrid?Uc(i):i+" Hz"):t===0&&a.zero?a.zero:t+" Hz";case"q":return"Q "+gt(a.law,t).toFixed(1);case"ratio":return gt(a.law,t).toFixed(1)+":1";case"rate":return i=gt(a.law,t),(i<1?i.toFixed(2):i<10?i.toFixed(1):i.toFixed(0))+" Hz";case"balance":return t===0?"centre":t<0?"L "+-t:"R "+t;case"stages":return t+" stages";case"option":for(var o=0;o<e.options.length;o++)if(e.options[o].value===t)return e.options[o].label;return String(t);case"tempoMs":return Math.round(tr(t,n)*1e3)+" ms";case"freeBeats":return t===0?"off":"free "+ +t.toFixed(3)+" beats · "+Math.round(tr(t,n)*1e3)+" ms"}return String(t)}var Vc=1,Qn=["drive","delay","plate"];function Gc(e){var t={};for(var n in e)n!=="format"&&(t[n]=e[n]);return t.format=function(a,i){return Fo(e,a,i)},t}var xt=Qn.map(function(e){var t=re(e),n={type:e,label:t.label,dials:t.dials.map(Gc)};return t.tempoSynced&&(n.tempoSynced=!0),n}),Wc={reverb:"plate"};function Fn(e){var t=Wc[e]||e;return Qn.indexOf(t)>=0?t:null}function Jn(e){for(var t=Fn(e),n=0;n<xt.length;n++)if(xt[n].type===t)return xt[n];return null}function zo(e,t){var n=Jn(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}function Mt(e,t){if(e.stepWhen&&t){for(var n=0;n<e.stepWhen.length;n++)if(t[e.stepWhen[n].key]===e.stepWhen[n].value)return e.stepWhen[n].step}return e.step}function De(e,t,n){if(typeof t!="number"||!isFinite(t))return e.default;if(e.options){for(var a=e.options[0].value,i=1;i<e.options.length;i++)Math.abs(e.options[i].value-t)<Math.abs(a-t)&&(a=e.options[i].value);return a}if(e.exact)return t>0?t<e.minOn?e.minOn:t>e.max?e.max:t:0;var o=n>0&&n<1?Math.round(1/n):1;return Math.max(e.min,Math.min(e.max,Math.round(t*o)/o))+0}function Yc(){return{v:Vc,chain:xt.map(function(e){var t={};return e.dials.forEach(function(n){t[n.key]=n.default}),{id:e.type,type:e.type,bypass:!0,dials:t}})}}function Xc(e){return Pa.reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t},Pa[0])}function ha(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Kc(e){for(var t=Array.isArray(e)?e:ha(e)&&Array.isArray(e.chain)?e.chain:[],n=Array.isArray(e),a=Yc(),i={},o=[],s=0;s<t.length;s++){var l=t[s];if(ha(l)){var u=Fn(l.type);if(!u){typeof l.type=="string"&&o.push(l.type);continue}if(i[u]){o.push(u);continue}i[u]=!0;var c=a.chain[Qn.indexOf(u)],d=ha(l.dials)?l.dials:{};u==="delay"&&d.mix===void 0&&d.wet!==void 0&&(d=Object.assign({},d,{mix:d.wet})),c.bypass=n?l.bypass===!0:l.bypass!==!1,Jn(u).dials.forEach(function(p){c.dials[p.key]=De(p,d[p.key])}),Qc(u,c.dials,d)}}return{state:a,dropped:o}}function Qc(e,t,n){for(var a=Jn(e),i=0;i<a.dials.length;i++){var o=a.dials[i];o.stepWhen&&(t[o.key]=De(o,n&&typeof n[o.key]=="number"?n[o.key]:t[o.key],Mt(o,t)))}}function zn(e){return Kc(e).state}function Jc(e){return JSON.parse(JSON.stringify(e))}var Zc=24,Da={drive:{bypass:0,drive_db:1,output_db:2,mix:3,curve:14,tone:15,mod_drive:16,mod_tone:17},delay:{bypass:4,delay_beats:5,feedback:6,mix:7,tone:18,low_cut:19,mode:20,send:21,mod_send:22,beats_free:23},plate:{bypass:8,predelay:9,size:10,decay:11,damping:12,mix:13}};function Ra(e,t,n){if(t==="bypass")return n?0:1;var a=zo(e,t)||ed(e,t);return a?Nn(a,n):0}function ed(e,t){var n=re(e);if(!n)return null;for(var a=0;a<n.dials.length;a++)if(n.dials[a].key===t)return n.dials[a];return null}var td={};xt.forEach(function(e){e.dials.forEach(function(t){td[e.type+"."+t.key]=t.format})});function ma(e,t){var n=new Float64Array(Zc),a=zn(e);return a.chain.forEach(function(i){var o=Da[i.type];n[o.bypass]=i.bypass?0:1,Object.keys(i.dials).forEach(function(s){n[o[s]]=Ra(i.type,s,i.dials[s])})}),n}var fa=1,ar=15,Po=/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/,nd=/^[a-z][a-z0-9_]{0,31}$/,Do=/^\d+\.\d+\.\d+$/,Ro=/^[A-Za-z0-9.+-]+(?: (?:AND|OR|WITH) [A-Za-z0-9.+-]+)*$/,ad=/^[A-Za-z0-9_-][A-Za-z0-9._-]{0,63}\.js$/,ir=["$schema","ncPlugin","id","name","version","author","licence","description","website","keywords","dsp","params"],rr=["id","label","type","defaultValue","minValue","maxValue","discreteStep","exponent","choices","units","more"],Ia={1:"It failed to start.",2:"It crashed while playing.",3:"It made bad numbers (NaN, infinity or runaway level).",4:"It crashed when a dial moved.",5:"Its code is not loaded."};function Yt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function pt(e){return typeof e=="number"&&isFinite(e)}function nt(e,t){return typeof e=="string"&&e.trim().length>0&&e.length<=t}function Io(e){var t=[],n=e,a=function(l,u){t.push(l+": "+u)};if(!Yt(n))return{ok:!1,errors:["manifest: must be a JSON object"],manifest:null};Object.keys(n).forEach(function(l){ir.indexOf(l)<0&&a(l,"unknown field (allowed: "+ir.slice(1).join(", ")+")")}),n.ncPlugin!==fa&&a("ncPlugin","must be "+fa),(typeof n.id!="string"||!Po.test(n.id)||n.id.length>64)&&a("id",'lowercase letters and digits, with dots or dashes between, up to 64 (e.g. "yourname.tremolo")'),nt(n.name,40)||a("name","a name of 1 to 40 characters"),(typeof n.version!="string"||!Do.test(n.version))&&a("version",'x.y.z, e.g. "1.0.0"'),nt(n.author,80)||a("author","who made it, 1 to 80 characters"),(typeof n.licence!="string"||!Ro.test(n.licence)||n.licence.length>64)&&a("licence",'an SPDX licence id, e.g. "MIT"'),n.description!==void 0&&!(typeof n.description=="string"&&n.description.length<=200)&&a("description","up to 200 characters"),n.website!==void 0&&!(typeof n.website=="string"&&/^https:\/\/\S+$/.test(n.website)&&n.website.length<=2048)&&a("website","an https:// address"),n.keywords!==void 0&&!(Array.isArray(n.keywords)&&n.keywords.length<=8&&n.keywords.every(function(l){return nt(l,24)}))&&a("keywords","up to 8 short strings"),(typeof n.dsp!="string"||!ad.test(n.dsp))&&a("dsp",`the DSP file's name, in the same folder as plugin.json, ending in .js (e.g. "tremolo.dsp.js")`);var i=[];if(!Array.isArray(n.params))a("params","a list of params (may be empty)");else if(n.params.length>ar)a("params","at most "+ar);else{var o={};n.params.forEach(function(l,u){var c="params["+u+"]";if(!Yt(l)){a(c,"must be an object");return}Object.keys(l).forEach(function(h){rr.indexOf(h)<0&&a(c+"."+h,"unknown field (allowed: "+rr.join(", ")+")")}),typeof l.id!="string"||!nd.test(l.id)||l.id==="bypass"?a(c+".id",'lowercase, starting with a letter: letters, digits, _ (not "bypass")'):o[l.id]?a(c+".id",'"'+l.id+'" is used twice'):o[l.id]=!0,nt(l.label,24)||a(c+".label","the dial's name, 1 to 24 characters");var d=l.type===void 0?"float":l.type;if(["float","int","boolean","choice"].indexOf(d)<0){a(c+".type","float, int, boolean or choice");return}var p={id:l.id,label:l.label,type:d};if(d==="choice"){if(!Array.isArray(l.choices)||l.choices.length<2||l.choices.length>16||!l.choices.every(function(h){return nt(h,24)})){a(c+".choices","2 to 16 names");return}p.choices=l.choices.slice(),p.minValue=0,p.maxValue=l.choices.length-1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==p.maxValue)&&a(c,"a choice's values are 0 to choices.length - 1: leave out minValue and maxValue")}else if(d==="boolean")p.minValue=0,p.maxValue=1,p.discreteStep=1,(l.minValue!==void 0&&l.minValue!==0||l.maxValue!==void 0&&l.maxValue!==1)&&a(c,"a boolean is 0 or 1: leave out minValue and maxValue");else{if(!pt(l.minValue)||!pt(l.maxValue)||!(l.minValue<l.maxValue)){a(c,"minValue and maxValue: numbers, minValue < maxValue");return}p.minValue=l.minValue,p.maxValue=l.maxValue,l.discreteStep!==void 0&&!(pt(l.discreteStep)&&l.discreteStep>0&&l.discreteStep<=l.maxValue-l.minValue)&&a(c+".discreteStep","a number > 0, at most the range"),p.discreteStep=d==="int"?Math.max(1,Math.round(l.discreteStep||1)):pt(l.discreteStep)&&l.discreteStep>0?l.discreteStep:id(l.maxValue-l.minValue),d==="int"&&(!Number.isInteger(l.minValue)||!Number.isInteger(l.maxValue))&&a(c,"an int has whole-number minValue and maxValue")}l.defaultValue===void 0?p.defaultValue=p.minValue:!pt(l.defaultValue)||l.defaultValue<p.minValue||l.defaultValue>p.maxValue?a(c+".defaultValue","a number from "+p.minValue+" to "+p.maxValue):p.defaultValue=l.defaultValue,l.units!==void 0&&(typeof l.units=="string"&&l.units.length<=8?p.units=l.units:a(c+".units",'up to 8 characters, e.g. "Hz", "ms", "%", "dB"')),l.exponent!==void 0&&(pt(l.exponent)&&l.exponent>0?p.exponent=l.exponent:a(c+".exponent","a number > 0")),l.more!==void 0&&(typeof l.more=="boolean"?l.more&&(p.more=!0):a(c+".more","true or false")),i.push(p)})}if(t.length)return{ok:!1,errors:t,manifest:null};var s={ncPlugin:fa,id:n.id,name:n.name.trim(),version:n.version,author:n.author.trim(),licence:n.licence,dsp:n.dsp,params:i};return n.description&&(s.description=n.description),n.website&&(s.website=n.website),n.keywords&&(s.keywords=n.keywords.slice()),{ok:!0,errors:[],manifest:s}}function id(e){var t=Math.pow(10,Math.floor(Math.log10(e/100)));return t<.001?.001:t>1?1:+t.toFixed(3)}function rd(e){for(var t=0;t<3&&Math.abs(Math.round(e*Math.pow(10,t))-e*Math.pow(10,t))>1e-9;)t++;return t}function fi(e){return"plugin:"+e}function od(e,t){var n=e,a=t||{},i=n.params.map(function(s,l){var u={key:s.id,label:s.label,min:s.minValue,max:s.maxValue,default:s.defaultValue,step:s.discreteStep,k:l+1,unit:s.units||null,format:null};if(s.type==="choice"||s.type==="boolean"){var c=s.type==="choice"?s.choices:["Off","On"];u.step=null,u.options=c.map(function(p,h){return{value:h,label:p}}),u.format={fmt:"option"}}else{var d=s.units?/^[%°×]/.test(s.units)?s.units:" "+s.units:"";u.format={fmt:"fixed",div:1,add:0,digits:rd(s.discreteStep),suffix:d}}return s.more&&(u.more=!0),u}),o={type:fi(n.id),label:n.name,dials:i,plugin:{id:n.id,version:n.version,author:n.author,licence:n.licence,engine:"plugin:"+n.id+"@"+n.version,idBase:n.id.split(".").pop(),url:typeof a.url=="string"?a.url:"",listed:a.listed===!0}};return n.description&&(o.note=n.description),n.website&&(o.plugin.website=n.website),o}function sd(e,t){var n=Io(e);if(!n.ok)throw new Error("nc-fx plugin: "+n.errors.join("; "));var a=re(fi(n.manifest.id));if(a&&a.plugin.version!==n.manifest.version)throw new Error("nc-fx plugin: "+n.manifest.id+" "+a.plugin.version+" is already loaded on this page; reload to use "+n.manifest.version);if(a)return a;var i=od(n.manifest,t);return Bc(i),i}async function ld(e){var t=globalThis.crypto&&globalThis.crypto.subtle;if(!t)throw new Error("nc-fx plugin: no WebCrypto here (integrity needs a secure context: https or localhost)");for(var n=new Uint8Array(await t.digest("SHA-256",e)),a="",i=0;i<n.length;i++)a+=String.fromCharCode(n[i]);return"sha256-"+btoa(a)}function cd(e){if(e.protocol!=="https:"&&!(e.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(e.hostname)))throw new Error("nc-fx plugin: load plugins over https (http only from localhost): "+e.href)}async function or(e,t,n,a){var i=await t(e,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugin: "+a+" "+e+" answered "+i.status);var o=new Uint8Array(await i.arrayBuffer());if(n){var s=await ld(o);if(s!==n)throw new Error("nc-fx plugin: "+a+" "+e+" does not match the registry (expected "+n+", got "+s+")")}return new TextDecoder().decode(o)}var yn=typeof WeakMap=="function"?new WeakMap:null;async function qo(e,t,n){var a=n||{},i=new URL(String(t),a.base||(typeof location<"u"?location.href:void 0));cd(i);var o=a.fetch||globalThis.fetch.bind(globalThis),s=a.integrity||{},l=await or(i.href,o,s.manifest,"plugin.json"),u;try{u=JSON.parse(l)}catch{throw new Error("nc-fx plugin: "+i.href+" is not JSON")}var c=Io(u);if(!c.ok)throw new Error("nc-fx plugin: "+i.href+": "+c.errors.join("; "));var d=c.manifest;if(a.expect&&(a.expect.id&&a.expect.id!==d.id||a.expect.version&&a.expect.version!==d.version))throw new Error("nc-fx plugin: "+i.href+" is "+d.id+" "+d.version+", not what the registry lists");var p=re(fi(d.id));if(p&&p.plugin.version!==d.version)throw new Error("nc-fx plugin: "+d.name+" "+p.plugin.version+" is already loaded on this page. Reload the page to use "+d.version+".");var h=new URL(d.dsp,i),f=d.id+"@"+d.version,g=yn&&yn.get(e);if(!g&&yn&&(g={},yn.set(e,g)),!g||!g[f]){var y=(async function(){var b=await or(h.href,o,s.dsp,"DSP file");await Ho(e,a.moduleUrl);var v=URL.createObjectURL(new Blob([b+`
//# sourceURL=`+h.href+`
`],{type:"text/javascript"}));try{await e.audioWorklet.addModule(v)}finally{URL.revokeObjectURL(v)}})();g&&(g[f]=y,y.catch(function(){delete g[f]})),await y}else await g[f];var m=sd(d,{url:i.href,listed:a.listed===!0});return{entry:m,manifest:d,url:i.href}}function dd(e){var t=[];if(!Yt(e)||e.v!==1||!Array.isArray(e.plugins))return{ok:!1,errors:['registry: { "v": 1, "plugins": [...] }'],registry:{v:1,plugins:[]}};var n=[],a={};return e.plugins.forEach(function(i,o){var s="plugins["+o+"]",l=[];if(!Yt(i)){t.push(s+": must be an object");return}if((typeof i.id!="string"||!Po.test(i.id))&&l.push("id"),nt(i.name,40)||l.push("name"),(typeof i.version!="string"||!Do.test(i.version))&&l.push("version"),nt(i.author,80)||l.push("author"),(typeof i.licence!="string"||!Ro.test(i.licence))&&l.push("licence"),(typeof i.manifest!="string"||!i.manifest)&&l.push("manifest"),(!Yt(i.integrity)||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.manifest||"")||!/^sha256-[A-Za-z0-9+/]{43}=$/.test(i.integrity.dsp||""))&&l.push("integrity"),(typeof i.checked!="string"||!/^\d{4}-\d{2}-\d{2}/.test(i.checked))&&l.push("checked"),a[i.id]&&l.push("id (listed twice)"),l.length){t.push(s+": bad "+l.join(", "));return}a[i.id]=!0;var u={id:i.id,name:i.name,version:i.version,author:i.author,licence:i.licence,manifest:i.manifest,integrity:{manifest:i.integrity.manifest,dsp:i.integrity.dsp},checked:i.checked};typeof i.description=="string"&&(u.description=i.description.slice(0,200)),n.push(u)}),{ok:t.length===0,errors:t,registry:{v:1,plugins:n}}}async function ud(e,t){var n=t||{},a=new URL(String(e),n.base||(typeof location<"u"?location.href:void 0)),i=await(n.fetch||globalThis.fetch.bind(globalThis))(a.href,{credentials:"omit",cache:"no-cache"});if(!i.ok)throw new Error("nc-fx plugins: the registry "+a.href+" answered "+i.status);var o=dd(await i.json());return{registry:o.registry,url:a.href,errors:o.errors}}function pd(e,t,n,a){return qo(e,new URL(t.manifest,n).href,Object.assign({},a,{integrity:t.integrity,listed:!0,expect:{id:t.id,version:t.version}}))}var hd=2,Pn=3,sr=/^[A-Za-z0-9][A-Za-z0-9 _./:+-]{0,63}$/;function at(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}var md=/^\d+\.\d+\.\d+$/;function fd(e,t){var n=at(e)?e:{},a=t.slice(7),i={id:a,version:typeof n.version=="string"&&md.test(n.version)?n.version:"0.0.0",url:"",name:a};return typeof n.url=="string"&&n.url.length<=2048&&/^https?:\/\//.test(n.url)&&(i.url=n.url),typeof n.name=="string"&&n.name.trim()&&(i.name=n.name.trim().slice(0,40)),i}function Oo(e){var t=e.plugin;return{id:t.id,version:t.version,url:t.url,name:e.label}}function gd(e){var t={},n=0;if(at(e))for(var a in e)n<16&&/^[a-z][a-z0-9_]{0,31}$/.test(a)&&typeof e[a]=="number"&&isFinite(e[a])&&(t[a]=e[a],n++);return t}function bd(e){return e.plugin?e.plugin.idBase:e.type}function Bo(e,t){var n=re(e);if(!n)return null;var a={};(t||[]).forEach(function(u){u&&u.id&&(a[u.id]=!0)});for(var i=1,o=bd(n);a[o+"-"+i];)i++;var s={};n.dials.forEach(function(u){s[u.key]=u.default});var l={id:o+"-"+i,type:n.type,bypass:!1,dials:s};return n.plugin&&(l.plugin=Oo(n)),l}function yd(e){var t=re(e.type),n=/-(\d+)$/.exec(e.id||""),a=t?t.label:e.plugin&&e.plugin.name?e.plugin.name:e.type;return a+(n&&+n[1]>1?" "+n[1]:"")}function vd(e,t,n){var a=e.length-1,i=Math.max(0,Math.min(a,n));if(t<0||t>a||t===i)return e;var o=e.slice(),s=o.splice(t,1)[0];return o.splice(i,0,s),o}function wd(e){return typeof e=="number"&&isFinite(e)?Xc(e):e}function lr(e,t,n){var a={};return e.dials.forEach(function(i){var o=t[i.key];o===void 0&&i.astridKey&&(o=t[i.astridKey]),n&&e.type==="delay"&&i.key==="delay_beats"&&(o=wd(o)),a[i.key]=e.plugin?De(i,o,i.step):De(i,o)}),e.dials.forEach(function(i){i.stepWhen&&(a[i.key]=De(i,typeof t[i.key]=="number"?t[i.key]:a[i.key],Mt(i,a)))}),a}function xd(e,t){if(!(typeof t!="number"||!isFinite(t))){var n=e.dsp;if(!n)return t;if(n.div)return Math.round(t*n.div*1e6)/1e6;for(var a=e.min,i=1/0,o=e.min;o<=e.max;o++){var s=gt(n.law,o),l=s===null?1/0:Math.abs(s-t);l<i&&(i=l,a=o)}return a}}var $d={rate:"rate_hz"};function kd(e,t,n,a){var i={};return e.dials.forEach(function(o){if(!o.more){var s=o.astridKey||$d[o.key]||o.key;i[o.key]=xd(o,t[s])}}),e.type==="eq"&&t.low_hz==null&&t.high_hz==null&&t.mid_q==null&&n.push(a+": EQ from before 2026-10-21 (first voicing) loads as the current one"),i}function Ed(e,t){var n=t>0?Math.floor(t):Pn,a=[],i=[],o=[],s=!1,l=!1;Array.isArray(e)?(o=e,l=!0):at(e)&&Array.isArray(e.chain)&&(o=e.chain,s=e.v===1,l=e.schema===2);for(var u=[],c=0;c<o.length;c++){var d=o[c];if(at(d)&&!(d.type==="limiter"||d.fixed===!0)){var p=mi(d.type),h=p&&re(p);if(!h&&!s&&No(d.type)){if(u.length>=n){a.push(d.id||d.type);continue}for(var f=fd(d.plugin,d.type),g=f.id.split(".").pop(),y=1;u.some(function(w){return w.id===g+"-"+y});)y++;var m=typeof d.id=="string"&&sr.test(d.id)&&!u.some(function(w){return w.id===d.id})?d.id:g+"-"+y;u.push({id:m,type:d.type,bypass:d.bypass===!0,dials:gd(d.dials),plugin:f});continue}if(!h||s&&["drive","delay","plate"].indexOf(p)<0){typeof d.type=="string"&&a.push(d.type);continue}if(u.length>=n){a.push(d.id||p);continue}var b;at(d.params)&&!at(d.dials)?b=lr(h,kd(h,d.params,i,d.id||p),l):b=lr(h,at(d.dials)?d.dials:{},l);var v=Bo(p,u),$=typeof d.id=="string"&&sr.test(d.id)&&!u.some(function(w){return w.id===d.id})?d.id:v.id,S=s?d.bypass!==!1:d.bypass===!0,z={id:s?v.id:$,type:p,bypass:S,dials:b};h.plugin&&(z.plugin=Oo(h)),u.push(z)}}return{state:{v:hd,chain:u},dropped:a,notes:i}}function rt(e,t){return Ed(e,t).state}function ht(e){var t=re(e.type),n=[[0,e.bypass?0:1]];return t&&t.dials.forEach(function(a){n.push([a.k,Nn(a,e.dials[a.key])])}),n}function Ad(e){var t=rt(e,8),n=[],a=t.chain.filter(function(i){return i.plugin?(n.push(i.id+": ASTRID has no plugins"),!1):!0}).map(function(i,o){var s=re(i.type),l={};return o>=Pn&&n.push(i.id+": ASTRID keeps three hacks"),s.dials.forEach(function(u){var c=i.dials[u.key];if(u.more){c!==u.default&&n.push(i.id+"."+u.key);return}u.key==="delay_beats"&&Pa.indexOf(c)<0&&n.push(i.id+".delay_beats"),l[u.astridKey||u.key]=c}),{id:i.id,type:i.type,bypass:i.bypass,dials:l}});return{hacks:a,lossy:n}}var Sd=150,Md=6e3,Td=18,_o=6.283185307179586;function Zn(e,t,n){return e<t?t:e>n?n:e}function Ld(e,t,n,a,i){var o=Math.pow(10,n/40),s=_o*t/i,l=Math.cos(s),u=Math.sin(s),c,d,p,h,f,g,y,m;if(e===0||e===2){y=u/2*Math.SQRT2,m=2*Math.sqrt(o)*y;var b=e===0?1:-1;c=o*(o+1-b*(o-1)*l+m),d=b*2*o*(o-1-b*(o+1)*l),p=o*(o+1-b*(o-1)*l-m),h=o+1+b*(o-1)*l+m,f=-b*2*(o-1+b*(o+1)*l),g=o+1+b*(o-1)*l-m}else y=u/(2*a),c=1+y*o,d=-2*l,p=1-y*o,h=1+y/o,f=-2*l,g=1-y/o;return[c/h,d/h,p/h,f/h,g/h]}function Cd(e,t,n){var a=_o*t/n,i=Math.cos(a),o=Math.sin(a),s=Math.cos(2*a),l=Math.sin(2*a),u=e[0]+e[1]*i+e[2]*s,c=-(e[1]*o+e[2]*l),d=1+e[3]*i+e[4]*s,p=-(e[3]*o+e[4]*l);return 10*Math.log10((u*u+c*c)/(d*d+p*p))}var cr={};function Ke(e){return cr[e]||(cr[e]=Hc("eq",e))}function ft(e,t){var n=Ke(t),a=e&&typeof e[t]=="number"&&isFinite(e[t])?e[t]:n.default;return Zn(a,n.min,n.max)}function jo(e){return[{id:"low",kind:0,hz:Sd,db:ft(e,"low_db"),q:Math.SQRT1_2},{id:"mid",kind:1,hz:Nn(Ke("mid_hz"),ft(e,"mid_hz")),db:ft(e,"mid_db"),q:Nn(Ke("mid_q"),ft(e,"mid_q"))},{id:"high",kind:2,hz:Md,db:ft(e,"high_db"),q:Math.SQRT1_2}]}function Nd(e,t,n){for(var a=jo(e),i=n.length,o=new Float64Array(i),s=[],l=t/2,u=0;u<a.length;u++){var c=a[u],d=new Float64Array(i);if(c.db!==0)for(var p=Ld(c.kind,c.hz,c.db,c.q,t),h=0;h<i;h++){var f=n[h]<l?n[h]:l*.9999;d[h]=Cd(p,f,t),o[h]+=d[h]}s.push(d)}return{total:o,bands:s}}function Fd(e){var t=Ke("mid_hz").dsp.law;return Zn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}function zd(e){var t=Ke("mid_q").dsp.law;return Zn(t.div*Math.log(e/t.pow[0])/Math.log(t.pow[1]),0,100)}var Dn={low:"low_db",mid:"mid_db",high:"high_db"},Pd={low:"Low",mid:"Mid",high:"High"};function Dd(e,t,n){var a=[];function i(o,s){var l=Ke(o),u=l.step||1;s=Zn(Math.round(s/u)*u,l.min,l.max),s===0&&(s=0),s!==ft(e,o)&&a.push([o,s])}return typeof n.db=="number"&&Dn[t]&&i(Dn[t],n.db),t==="mid"&&typeof n.hz=="number"&&n.hz>0&&i("mid_hz",Fd(n.hz)),t==="mid"&&typeof n.q=="number"&&n.q>0&&i("mid_q",zd(n.q)),a}function Rd(e){var t=e==="mid"?["mid_db","mid_hz","mid_q"]:Dn[e]?[Dn[e]]:[];return t.map(function(n){return[n,Ke(n).default]})}var vn=typeof WeakMap=="function"?new WeakMap:null;function Id(e){var t=e&&e.output;if(!t||!t.context||typeof t.context.createAnalyser!="function")return null;var n=vn&&vn.get(e);return n||(n={node:null,users:0,handle:null},n.handle={open:function(){return e.status==="disposed"?null:(n.node||(n.node=t.context.createAnalyser(),n.node.fftSize=4096,n.node.smoothingTimeConstant=.8,n.node.minDecibels=-110,n.node.maxDecibels=0),n.users++===0&&t.connect(n.node),n.node)},close:function(){if(n.users!==0&&--n.users===0&&n.node)try{t.disconnect(n.node)}catch{}}},vn&&vn.set(e,n)),n.handle}function qd(e,t,n){var a=n||{},i={};["low_db","mid_db","mid_hz","mid_q","high_db"].forEach(function(d){var p=e&&typeof e.getParam=="function"?e.getParam(t,d):void 0;i[d]=typeof p=="number"?p:Ke(d).default});var o=e&&e.output&&e.output.context,s=a.sampleRate||o&&o.sampleRate||48e3,l=a.help||{},u=jo(i).map(function(d){var p=(d.db>0?"+":d.db<0?"−":"")+Math.abs(d.db)+" dB",h=d.hz>=1e3?(d.hz/1e3).toFixed(d.hz>=1e4?0:1)+" kHz":Math.round(d.hz)+" Hz";return{id:d.id,label:Pd[d.id],kind:d.kind===0?"lowshelf":d.kind===1?"peak":"highshelf",hz:d.hz,db:d.db,q:d.q,moveHz:d.id==="mid",moveQ:d.id==="mid",minHz:d.id==="mid"?200:d.hz,maxHz:d.id==="mid"?5e3:d.hz,minQ:.3,maxQ:6,valueText:d.id==="mid"?p+" at "+h+", Q "+d.q.toFixed(1):p+(d.id==="low"?", shelf below ":", shelf above ")+h,help:l[d.id]}}),c=function(d){for(var p=0;p<d.length;p++)a.set(d[p][0],d[p][1])};return{type:"eqGraph",id:a.id,label:a.label||"EQ curve",range:Td,sampleRate:s,on:a.on!==!1,bands:u,help:l.graph,response:function(d){return Nd(i,s,d)},spectrum:a.spectrum===!1?void 0:Id(e)||void 0,onBand:function(d,p){c(Dd(i,d,p))},onReset:function(d){c(Rd(d).filter(function(p){return p[1]!==i[p[0]]}))}}}var Od="nc-fx@1",Bd=600,_d=256,jd=8,Ot=typeof WeakMap=="function"?new WeakMap:null;function Ho(e,t){var n=Ot&&Ot.get(e);return n||(n=(async function(){if(!e||!e.audioWorklet)throw new Error("nc-fx: AudioWorklet is not available in this context");if(t){await e.audioWorklet.addModule(String(t));return}var a=(await Pc(async()=>{const{default:o}=await import("./worklet-source-BFsD5n4C.js");return{default:o}},[])).default,i=URL.createObjectURL(new Blob([a],{type:"text/javascript"}));try{await e.audioWorklet.addModule(i)}finally{URL.revokeObjectURL(i)}})(),Ot&&(Ot.set(e,n),n.catch(function(){Ot.delete(e)})),n)}function mt(e,t){return typeof e=="number"&&isFinite(e)?e:t}function Uo(e,t,n,a){var i=Math.min(400,Math.max(20,mt(t.bpm,120))),o=[],s=t.limiter==="soft"||t.limiter==="lookahead"?t.limiter:"off",l=t.bypassMode==="hold"?"hold":"run",u=mt(t.preGain,1),c=Math.max(0,mt(t.crossfade,.012)),d=mt(t.maxDelaySeconds,void 0),p=e.createGain(),h=e.createGain(),f=e.createGain(),g=e.createGain(),y=null;t.modInput===!0&&(y=e.createGain(),y.channelCount=1,y.channelCountMode="explicit",y.channelInterpretation="discrete"),g.gain.value=0,p.connect(f),f.connect(h),g.connect(h);var m={node:null,status:"loading",error:null,disposed:!1,listeners:[],bpm:i,mUsers:0,lv:null,lvAt:0},b=n(i);m.post=function(w){m.node?m.node.port.postMessage(w):m.disposed||(o.length>=_d&&(o=a().concat([{t:"tempo",bpm:m.bpm,when:0}]),m.mUsers>0&&o.push({t:"meter",on:!0})),o.push(w))};function v(w){var x=o.map(function(E){var A=Object.assign({},E);return A.when>w||(A.when=0,A.t!=="clear"&&(A.snap=!0)),A});return o=[],x}m.emit=function(w){for(var x=0;x<m.listeners.length;x++)try{m.listeners[x](w)}catch(E){typeof console<"u"&&console.error(E)}},m.whenOf=function(w){return typeof w=="number"&&isFinite(w)&&w>0?w:0};var $=!1;m.tooFar=function(w){return typeof w=="number"&&w>e.currentTime+Bd?(!$&&typeof console<"u"&&($=!0,console.warn("nc-fx: ignoring a time "+Math.round(w-e.currentTime)+" s ahead of AudioContext time; convert clock times with toContextTime() (see followClock)")),!0):!1};var S=Ho(e,t.moduleUrl).then(function(){if(!m.disposed){var w=Object.assign({bpm:i,bypassMode:l,limiter:s,preGain:u,maxDelaySeconds:d},b);w.pending=v(e.currentTime),m.node=new AudioWorkletNode(e,Od,{numberOfInputs:y?2:1,numberOfOutputs:1,outputChannelCount:[2],channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",processorOptions:w}),m.node.port.onmessage=function(E){var A=E.data;if(A&&A.t==="lv"&&m.mUsers>0)m.lv=A.d,m.lvAt=dr();else if(A&&A.t==="perr"&&m.onPluginError&&A.d)for(var L=0;L<(A.n|0);L++)m.onPluginError(A.d[2*L],A.d[2*L+1])},p.connect(m.node),y&&y.connect(m.node,0,1),m.node.connect(g);var x=e.currentTime;x<=0||c===0?(f.gain.value=0,g.gain.value=1):(f.gain.setValueAtTime(1,x),f.gain.linearRampToValueAtTime(0,x+c),g.gain.setValueAtTime(0,x),g.gain.linearRampToValueAtTime(1,x+c)),m.status="ready"}},function(w){m.status="unavailable",o=[],m.error=w});m.meterOpen=function(){return m.disposed||m.status==="unavailable"?!1:(m.mUsers++===0&&m.post({t:"meter",on:!0}),!0)},m.meterClose=function(){m.mUsers!==0&&--m.mUsers===0&&(m.lv=null,m.disposed||m.post({t:"meter",on:!1}))},m.levels=function(){return m.lv&&dr()-m.lvAt<Hd?m.lv:null};var z={};return m.meter=function(w,x){if(z[w])return z[w];var E=0,A={in:0,out:0},L={open:function(){return m.meterOpen()?(E++,!0):!1},close:function(){E!==0&&(E--,m.meterClose())},read:function(){var C=E>0?m.levels():null;return A.in=0,A.out=0,C&&x(C,A),A}};return z[w]=L,L},m.core={input:p,output:h,modInput:y,ready:S,get status(){return m.status},get error(){return m.error},latencySamples:s==="lookahead"?Math.max(1,Math.round(.0015*e.sampleRate)):0,limiter:s,setTempo:function(w,x){var E=mt(w,NaN);!(E>0)||m.disposed||m.tooFar(x)||(m.bpm=Math.min(400,Math.max(20,E)),m.post({t:"tempo",bpm:m.bpm,when:m.whenOf(x)}),m.emit({effect:null,key:"tempo",value:m.bpm}))},getTempo:function(){return m.bpm},clear:function(w){var x=w&&typeof w=="object"?w:{at:w};if(!(m.disposed||m.tooFar(x.at))){var E=mt(x.fadeMs,0);m.post({t:"clear",when:m.whenOf(x.at),fadeMs:E>0?Math.min(1e3,E):0})}},onChange:function(w){return m.listeners.push(w),function(){var x=m.listeners.indexOf(w);x>=0&&m.listeners.splice(x,1)}},dispose:function(){if(!m.disposed){if(m.disposed=!0,m.status="disposed",o=[],m.listeners.length=0,m.node){m.node.port.postMessage({t:"dispose"}),m.node.port.close();try{m.node.disconnect()}catch{}}[p,f,g,h,y].forEach(function(w){try{w&&w.disconnect()}catch{}})}}},m}var Hd=250;function dr(){return typeof performance<"u"&&performance.now?performance.now():Date.now()}function Vo(e,t){t.in=e[0],t.out=e[1]}function ga(e,t){return e&&typeof e.meter=="function"?e.meter(t):null}function ba(e,t){var n=t||{};if(n.slots)return Ud(e,n);var a=zn(n.state),i=Array.from(ma(a)),o=Uo(e,n,function(){return{program:i}},function(){return[{t:"load",program:Array.from(ma(a)),when:0}]}),s=o.core;function l(u){return a.chain[Qn.indexOf(u)]}return s.setParam=function(u,c,d,p){var h=Fn(u);if(!(!h||o.disposed||o.tooFar(p))){var f=l(h),g;if(c==="bypass")g=!!d;else{var y=zo(h,c);if(!y)return;g=De(y,d,Mt(y,f.dials))}return c==="bypass"?f.bypass=g:f.dials[c]=g,o.post({t:"p",i:Da[h][c],v:Ra(h,c,g),when:o.whenOf(p)}),o.emit({effect:h,key:c,value:g}),Jn(h).dials.forEach(function(m){if(!(!m.stepWhen||!m.stepWhen.some(function($){return $.key===c}))){var b=f.dials[m.key],v=De(m,b,Mt(m,f.dials));v!==b&&(f.dials[m.key]=v,o.post({t:"p",i:Da[h][m.key],v:Ra(h,m.key,v),when:o.whenOf(p)}),o.emit({effect:h,key:m.key,value:v}))}}),g}},s.meter=function(){return o.meter("",Vo)},s.getParam=function(u,c){var d=Fn(u);if(d){var p=l(d);return c==="bypass"?p.bypass:p.dials[c]}},s.getState=function(){return Jc(a)},s.setState=function(u,c){o.disposed||o.tooFar(c&&c.at)||(a=zn(u),o.post({t:"load",program:Array.from(ma(a)),when:o.whenOf(c&&c.at)}),o.emit({effect:null,key:null,value:null}))},s}function Ud(e,t){var n=t.slots===!0?Pn:Math.max(1,Math.min(jd,Math.floor(+t.slots)||Pn)),a=rt(t.state,n),i=1,o={},s={};function l(w){return!No(w.type)||re(w.type)!==null}function u(w){var x=re(w.type);return x&&x.plugin?x.plugin.engine:w.type}function c(w){return o[w.id]||(o[w.id]=i++),o[w.id]}function d(w){return w.filter(l).map(function(x){return{uid:c(x),type:u(x),program:ht(x)}})}function p(){return a.chain.filter(l).map(function(w){return o[w.id]})}var h=d(a.chain),f=p(),g=Uo(e,t,function(){return{slots:n,chain:h,order:f}},function(){return[{t:"sync",chain:d(a.chain),order:p(),when:0}]}),y=g.core;g.onPluginError=function(w,x){for(var E in o)o[E]===w&&(s[E]=x,g.emit({effect:E,key:"error",value:x}))};function m(w){var x;for(x=0;x<a.chain.length;x++)if(a.chain[x].id===w)return a.chain[x];var E=mi(w);if(E){for(x=0;x<a.chain.length;x++)if(a.chain[x].type===E)return a.chain[x]}return null}function b(w,x){var E=c(w);g.post({t:"add",uid:E,type:u(w),when:x}),ht(w).forEach(function(A){g.post({t:"ps",uid:E,k:A[0],v:A[1],when:x,snap:!0})})}function v(w){g.post({t:"order",uids:p(),when:w})}function $(w,x){var E={};a.chain.forEach(function(C){E[C.id]=C});var A=p().join();w.chain.forEach(function(C){var H=E[C.id];if(!l(C)){delete o[C.id];return}if(!H||H.type!==C.type||!o[C.id]){delete o[C.id],delete s[C.id],b(C,x);return}var B={};ht(H).forEach(function(G){B[G[0]]=G[1]}),ht(C).forEach(function(G){B[G[0]]!==G[1]&&g.post({t:"ps",uid:o[C.id],k:G[0],v:G[1],when:x})})});var L={};w.chain.forEach(function(C){L[C.id]=!0}),Object.keys(o).forEach(function(C){L[C]||delete o[C]}),Object.keys(s).forEach(function(C){L[C]||delete s[C]}),a=w,p().join()!==A&&v(x)}var S=jc(function(w){if(!(g.disposed||!a.chain.some(function(E){return E.type===w}))){var x=JSON.parse(JSON.stringify(a));x.chain=x.chain.map(function(E){return E.type===w?rt({v:2,chain:[E]},1).chain[0]:E}),$(x,0),g.emit({effect:null,key:"plugin",value:w})}}),z=y.dispose;return y.dispose=function(){S(),z()},y.slots=n,y.meter=function(w){return w==null||w===""?g.meter("",Vo):g.meter("#"+w,function(x,E){var A=m(w),L=A?o[A.id]:0,C=x[2];if(L){for(var H=3,B=0;B<C;B++,H+=3)if(x[H]===L){E.in=x[H+1],E.out=x[H+2];return}}})},y.setParam=function(w,x,E,A){var L=m(w);if(!(!L||g.disposed||g.tooFar(A))){var C=re(L.type),H,B=null;if(!C)return x!=="bypass"?void 0:(L.bypass=!!E,g.emit({effect:L.id,key:x,value:L.bypass}),L.bypass);if(x==="bypass")H=!!E;else{for(var G=0;G<C.dials.length;G++)C.dials[G].key===x&&(B=C.dials[G]);if(!B)return;H=De(B,E,Mt(B,L.dials))}var ke={},be={};ht(L).forEach(function(O){ke[O[0]]=O[1]}),C.dials.forEach(function(O){O.stepWhen&&(be[O.key]=L.dials[O.key])}),x==="bypass"?L.bypass=H:L.dials[x]=H,C.dials.forEach(function(O){O.stepWhen&&(L.dials[O.key]=De(O,L.dials[O.key],Mt(O,L.dials)))});var ye=g.whenOf(A),J=o[L.id];return J&&ht(L).forEach(function(O){(ke[O[0]]!==O[1]||B&&O[0]===B.k)&&g.post({t:"ps",uid:J,k:O[0],v:O[1],when:ye})}),g.emit({effect:L.id,key:x,value:H}),Object.keys(be).forEach(function(O){O!==x&&L.dials[O]!==be[O]&&g.emit({effect:L.id,key:O,value:L.dials[O]})}),H}},y.getParam=function(w,x){var E=m(w);if(E)return x==="bypass"?E.bypass:E.dials[x]},y.getState=function(){return JSON.parse(JSON.stringify(a))},y.setState=function(w,x){g.disposed||g.tooFar(x&&x.at)||($(rt(w,n),g.whenOf(x&&x.at)),g.emit({effect:null,key:null,value:null}))},y.addEffect=function(w,x){var E=x||{},A=Bo(w,a.chain);if(!(!A||a.chain.length>=n||g.disposed||g.tooFar(E.at))){if(E.dials){var L=rt({v:2,chain:[{id:A.id,type:A.type,dials:E.dials}]},1).chain[0];A.dials=L.dials}E.bypass===!0&&(A.bypass=!0);var C=a.chain.slice(),H=typeof E.index=="number"?Math.max(0,Math.min(C.length,E.index)):C.length;return C.splice(H,0,A),$({v:2,chain:C},g.whenOf(E.at)),g.emit({effect:A.id,key:"chain",value:"add"}),A.id}},y.removeEffect=function(w,x){var E=m(w),A=x&&x.at;return!E||g.disposed||g.tooFar(A)?!1:($({v:2,chain:a.chain.filter(function(L){return L!==E})},g.whenOf(A)),g.emit({effect:E.id,key:"chain",value:"remove"}),!0)},y.moveEffect=function(w,x,E){var A=m(w),L=E&&E.at;if(!A||g.disposed||g.tooFar(L))return!1;var C=vd(a.chain,a.chain.indexOf(A),x);return C===a.chain?!1:($({v:2,chain:C},g.whenOf(L)),g.emit({effect:A.id,key:"chain",value:"move"}),!0)},y.getChain=function(){return a.chain.map(function(w){var x={id:w.id,type:w.type,name:yd(w),bypass:w.bypass};if(w.plugin){var E=s[w.id]||0,A=!l(w)||E===5;x.plugin={id:w.plugin.id,version:w.plugin.version,url:w.plugin.url,name:w.plugin.name,status:A?"missing":E?"failed":"ready"},E&&!A&&(x.plugin.error=Ia[E]||Ia[2])}return x})},y.toAstrid=function(){return Ad(a)},y}function ur(e,t){return typeof e=="number"?e:e?typeof e.bpmAt=="function"?+e.bpmAt(t||0):typeof e.bpm=="number"?e.bpm:NaN:NaN}function Go(e,t,n){var a=n||{},i=a.mapper&&typeof a.mapper.toContextTime=="function"?a.mapper:null,o=typeof a.toAudioTime=="function"?a.toAudioTime:i?function(h){return i.toContextTime(h)}:t&&t.timebase==="shared"?null:function(h){return h},s=typeof a.now=="function"?a.now:i&&typeof i.sharedNow=="function"?function(){return i.sharedNow()}:null,l=t&&t.transport?t.transport:t,u=l&&l.tempo?l.tempo:l,c=!1;function d(h){if(!o){!c&&typeof console<"u"&&(c=!0,console.warn("nc-fx followClock: a shared clock needs { mapper } (AudioClockMapper) or { toAudioTime }; applying tempo changes at once"));return}if(!(!l||typeof l.timeAt!="function"||typeof h!="number")){var f=o(l.timeAt(h));return typeof f=="number"&&isFinite(f)?f:void 0}}function p(){var h=s&&l&&typeof l.beatAt=="function"?l.beatAt(s()):NaN;if(!isFinite(h)){var f=l&&typeof l.bpm=="number"?l.bpm:ur(u,0);f>0&&e.setTempo(f);return}var g=ur(u,h);g>0&&e.setTempo(g);for(var y=u&&(u.points||u.tempoPoints)||[],m=0;m<y.length;m++){var b=y[m];if(b.beat>h&&b.bpm>0){var v=d(b.beat);v!==void 0&&e.setTempo(b.bpm,v)}}}return p(),!t||typeof t.onChange!="function"?function(){}:t.onChange(function(h){h&&(h.kind==="tempo"&&h.bpm>0?e.setTempo(h.bpm,d(h.atBeat)):(h.kind==="snapshot"||h.kind==="start")&&p())})}const Xt="/studio/assets/worklet-BQ6MeJr9.js";var Vd="nc-ui",Gd={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},gi={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Rn={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Wd={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Yd={light:{color:Gd.color,semantic:gi,component:Rn,runtime:Wd},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},jt=e=>`--${Vd}-${e}`,qa=gi["label-on-fill-dark"],pr=gi["label-on-fill-light"],Xd=Ye["label-min-contrast"],Kd=/^#[0-9a-f]{6}$/i,Qd=e=>typeof e=="string"&&Kd.test(e),An=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function hr(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=o=>{let s=(o+e/30)%12;return n-a*Math.max(-1,Math.min(s-3,9-s,1))};return`#${An(i(0)*255)}${An(i(8)*255)}${An(i(4)*255)}`}function Wo(e){let[t,n,a]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),i=Math.max(t,n,a),o=Math.min(t,n,a),s=(i+o)/2,l=i-o;if(!l)return{h:0,s:0,l:s};let u=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:u,l:s}}function mr(e){let[t,n,a]=[1,3,5].map(i=>{let o=parseInt(e.slice(i,i+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function Oa(e,t){let[n,a]=[mr(e),mr(t)].sort((i,o)=>o-i);return(n+.05)/(a+.05)}var In=e=>Oa(e,qa)>=Oa(e,pr)?qa:pr;function Yo(e,t,n,a=Xd){let i=hr(e,t,n),o=In(i)===qa?1:-1;for(let s=0;s<40&&Oa(i,In(i))<a;s++)n+=o*.01,i=hr(e,t,n);return i}function Jd(e){let{h:t,s:n}=Wo(e),a=Yo(t,Math.min(n,Ye["surprise-on-max-saturation"]),Ye["surprise-on-lightness"]);return{fill:e,ink:In(e),on:a,onInk:In(a)}}var Zd=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function eu(e,t=Math.random){let[n,a]=Ye["surprise-saturation"],[i,o]=Ye["surprise-lightness"],s=Ye["surprise-min-hue-gap"],l=Qd(e)?Wo(e).h:null,u=t()*360;return l!==null&&Zd(u,l)<s&&(u=(l+s+t()*(360-2*s))%360),Yo(u,n+t()*(a-n),i+t()*(o-i))}function tu(e){if(!e)return null;let t=Jd(e);return{[jt("surprise-fill")]:t.fill,[jt("surprise-ink")]:t.ink,[jt("surprise-on")]:t.on,[jt("surprise-on-ink")]:t.onInk}}var nu=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,au=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function fr(e){let[t,n,a]=[1,3,5].map(l=>nu(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*o-.0040720468*s,1.9779984951*i-2.428592205*o+.4505937099*s,.0259040371*i+.7827717662*o-.808675766*s]}function iu([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*o,-1.2684380046*a+2.6097574011*i-.3413193965*o,-.0041960863*a-.7034186147*i+1.707614701*o].map(s=>An(au(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var ru=Ye["velocity-range"],Xo={min:Rn.rhythm["velocity-min"],max:Rn.rhythm["velocity-max"]},gr=Object.fromEntries(Object.entries(Yd).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function ou(e,t=Xo){let[n,a]=ru,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(i-n)/(a-n),s=t.ink??Rn.rhythm["step-cell-ink"];if(o<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(o>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=fr(t.min),u=fr(t.max);return{velocity:i,t:o,fill:iu(l.map((c,d)=>c+(u[d]-c)*o)),ink:s}}function br(e,t=Xo){return{[jt("velocity-fill")]:ou(e,t).fill}}var qn="data-nc-theme",Ba="nc-ui-theme-change",su=Object.freeze(["system","light","dark"]),lu="netcomposer.studio.theme.v1",cu="(prefers-color-scheme: dark)",bi=e=>e?.documentElement??null,Ko=e=>e?.defaultView?.matchMedia?.(cu)??null,yi=e=>e==="light"||e==="dark"?e:"system";function du(e=globalThis.document){return yi(bi(e)?.getAttribute(qn))}function On(e=globalThis.document){let t=du(e);return t!=="system"?t:Ko(e)?.matches?"dark":"light"}function vi(e,t=globalThis.document){let n=bi(t);if(!n)return"light";let a=yi(e);a==="system"?n.removeAttribute(qn):n.setAttribute(qn,a);let i=On(t),o=t.defaultView?.CustomEvent;return o&&t.dispatchEvent(new o(Ba,{detail:{choice:a,theme:i}})),i}function Qo(e,t=globalThis.document){let n=bi(t);if(!n)return()=>{};let a=On(t),i=()=>{let u=On(t);u!==a&&(a=u,e(u))},o=t.defaultView?.MutationObserver,s=o?new o(i):null;s?.observe(n,{attributes:!0,attributeFilter:[qn]});let l=Ko(t);return l?.addEventListener?.("change",i),t.addEventListener(Ba,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(Ba,i)}}var uu={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},pu={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-bg":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},hu={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},mu={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},ea={};for(let[e,t]of Object.entries(pu))ea[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(mu))ea[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(hu))ea[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(uu.renames.map(e=>[e.old,e.new]));function Jo(e){let t=ea[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function Q(e){return Jo(e).prop}function r(e){return`var(${Q(e)})`}function fu(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(Q(t)));return Number.isFinite(n)?n:0}function te(e,t){let n=Jo(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=o:i.style.color=o,(e instanceof Element?e:a.documentElement).append(i);let s=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function Zo(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function gu(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=r("font-ui"),n.style.fontSize=r("label-size"),n.style.fontWeight=r("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var bu="[data-modulated], [data-modulated] *",es="(orientation: landscape) and (max-height: 500px) and (max-width: 1023px)";function ya(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function yr(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${r("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${r("hairline")} solid ${r("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function yu(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${r(`module-bg-stack-${a}`)};
      ${Q("text-sub")}: ${r(`module-sub-stack-${a}`)};
      ${Q("divider")}: ${r(`module-div-stack-${a}`)};
      ${Q("slider-track")}: ${r(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${r(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${r(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${r("module-bg-stack-1")};
      ${Q("text-sub")}: ${r("module-sub-stack-1")};
      ${Q("divider")}: ${r("module-div-stack-1")};
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
${bu} { transition: none; }
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
.nc-ui-fx-visual { display: block; width: 100%; height: ${r("display-height")}; }
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
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${r("target-min")});
    height: max(100%, ${r("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-strip[data-nc-folded] > .nc-strip-ms { gap: 0; }
  .nc-strip[data-nc-folded] .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: 0; margin-top: calc(${r("module-gap")} * -1); }
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
  ${Q("text-sub")}: ${r("module-sub-stack-1")};
  ${Q("divider")}: ${r("module-div-stack-1")};
  ${Q("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-template-columns: repeat(3, ${r("fx-card-width")});
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
  ${Q("text-sub")}: ${r("module-sub-stack-1")};
  ${Q("divider")}: ${r("module-div-stack-1")};
  ${Q("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${r("control-gap")} ${r("module-pad")};
  padding-bottom: ${r("module-pad")};
  background: ${r("module-bg-stack-1")};
  ${Q("text-sub")}: ${r("module-sub-stack-1")};
  ${Q("divider")}: ${r("module-div-stack-1")};
  ${Q("slider-track")}: ${r("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${r("stack-card-pad-y")} ${r("module-pad")} ${r("module-pad")};
  ${Q("text-sub")}: inherit;
  ${Q("divider")}: inherit;
  ${Q("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { background: ${r("module-bg-adjacent-2")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { background: ${r("module-bg-adjacent-3")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { background: ${r("module-bg-adjacent-4")}; }
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
    width: ${r("fx-fold-width")};
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
    width: ${r("fx-fold-width")};
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
    width: ${r("fx-fold-width")};
    margin-inline-end: calc(${r("fx-fold-width")} * -1);
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
   (the master too, with empty M/S and send rows) keeps the same row heights, so faders and ticks line up. */
.nc-strip {
  position: relative;
  flex: none;
  width: ${r("strip-width")};
  display: grid;
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${r("slider-pitch")} ${r("slider-pitch")} calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) auto auto;
  justify-items: center;
  row-gap: ${r("module-gap")};
  min-width: 0;
  padding-inline: ${r("control-gap")};
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${r("slider-pitch")} ${r("slider-pitch")} calc(${r("knob-size")} + ${r("control-gap")} + ${r("label-size")} * ${r("label-leading")}) auto auto;
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${r("hairline")} solid ${r("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { background: ${r("strip-bg")}; }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { background: ${r("strip-alt-bg")}; }
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
.nc-strip[data-nc-folded] { width: ${r("strip-fold-width")}; padding-inline: 0; align-content: start; }
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
.nc-strip[data-nc-folded] > .nc-strip-ms { grid-row: 2 / span 2; flex-direction: column; height: auto; gap: ${r("module-gap")}; }
.nc-strip[data-nc-folded] .nc-ms-wrap { width: ${r("slider-pitch")}; }
/* Touch: each folded M and S a full target-min box (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] .nc-ms-wrap { width: ${r("target-min")}; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-row: 6;
  grid-template-columns: auto auto;
  column-gap: ${r("control-gap")};
}
.nc-strip[data-nc-folded][data-nc-sends-hidden] > .nc-strip-body { grid-row: 5; }
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
.nc-strip-ms { display: flex; gap: ${r("control-gap")}; height: ${r("slider-pitch")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${r("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${r("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest (Peter, 2026-10-31): the divider; text-sub on hover, so it still reads as a button. */
  border: ${r("hairline")} solid ${r("divider")};
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
/* On the darker alternate strips the divider outline nearly vanishes: text-sub at 50% there (still lighter than the
   old outline); hover still takes it to text-sub. */
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]) {
  border-color: color-mix(in oklab, ${r("text-sub")} 50%, ${r("divider")});
}
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) .nc-hacks:not([aria-pressed="true"]):hover { border-color: ${r("text-sub")}; }
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
    radial-gradient(closest-side, ${r("surface-page")} 70%, transparent 72%),
    conic-gradient(from 225deg, ${r("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${r("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, ${r("surface-page")} 70%, transparent 72%),
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
${yr("")}
}
@media (max-width: 1023px) {
${yr("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${ya("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${ya("")}
}
@media (max-width: 1023px) {
${ya("html[data-nc-landscape] ")}
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
`}var va=null,vu="nc-ui-fallback";function ts(e=globalThis.document){if(!e?.documentElement||(e.documentElement,va&&va.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${vu} {
${yu()}
}
`,e.head.append(t),va=t}var Bt=null,wu=0,xu=new URL("/studio/assets/confirm-BSJWrX8s.css",import.meta.url).href,ns=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=xu,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ns(document);function ta(e){return as(e).then(t=>!!t.ok)}function as({title:e,body:t,confirmLabel:n="Confirm",cancelLabel:a="Cancel",danger:i=!1,root:o,returnFocus:s,signal:l},u){if(Bt||l?.aborted)return Promise.resolve({});let c=o?.ownerDocument??document,d=ns(c),p=o??c.body,h=c.defaultView??globalThis,f=`nc-ui-confirm-${++wu}`,g=(q,ne,le)=>{let U=c.createElement(q);return U.className=`nc-ui-confirm${ne}`,le!=null&&(U.textContent=le),U},y=g("div","-layer");y.dataset.state="enter";let m=g("div","");m.setAttribute("role","alertdialog"),m.setAttribute("aria-modal","true"),m.setAttribute("aria-labelledby",`${f}-t`),m.setAttribute("aria-describedby",`${f}-b`);let b=g("h2","-title",e);b.id=`${f}-t`;let v=g("p","-body",t);v.id=`${f}-b`;let $=g("div","-actions"),S=(q,ne)=>{let le=g("button","-btn",q);return le.type="button",le.dataset.ncConfirm=ne,le.addEventListener("click",()=>se(ne==="ok")),le},z=S(a,"cancel"),w=S(n,"ok");i&&(w.dataset.danger="true"),$.append(z,w);let[x,E]=u?.(g,w)??[];m.append(b,v,...x?[x]:[],$);let A=[E,z,w].filter(Boolean);y.append(m);let L={layer:y};Bt=L;let C=s??c.activeElement,H=[];for(let q of p.children)q.hasAttribute("inert")||(q.setAttribute("inert",""),H.push(q));let B=()=>{if(Bt!==L)return;p.append(y),(E??z).focus({preventScroll:!0});let q=h.requestAnimationFrame?.bind(h)??(ne=>setTimeout(ne,16));q(()=>q(()=>{y.dataset.state==="enter"&&(y.dataset.state="open")}))};d?d.then(B):B();let G=!1;y.addEventListener("pointerdown",q=>{G=q.target===y}),y.addEventListener("click",q=>{q.target===y&&G&&se(!1),G=!1});let ke=q=>{if(q.stopImmediatePropagation(),q.key==="Escape")q.preventDefault(),se(!1);else if(q.key==="Tab"){q.preventDefault();let ne=A.filter(U=>!U.disabled),le=ne.length;ne[(ne.indexOf(c.activeElement)+(q.shiftKey?le-1:1))%le].focus()}else q.key==="Enter"&&(q.preventDefault(),c.activeElement===z?se(!1):w.disabled||se(!0))},be=q=>q.stopImmediatePropagation();h.addEventListener("keydown",ke,!0),h.addEventListener("keyup",be,!0);let ye=()=>se(!1);l?.addEventListener("abort",ye);let J,O=new Promise(q=>{J=q});function se(q){if(Bt!==L)return;Bt=null,h.removeEventListener("keydown",ke,!0),h.removeEventListener("keyup",be,!0),l?.removeEventListener("abort",ye);for(let Te of H)Te.removeAttribute("inert");y.dataset.state="closing",C?.isConnected&&typeof C.focus=="function"&&C.focus({preventScroll:!0});let ne=h.getComputedStyle?.(y),le=Math.max(0,...String(ne?.transitionDuration??"").split(",").map(Te=>Number.parseFloat(Te)*(Te.trim().endsWith("ms")?1:1e3)||0)),U=()=>y.remove();y.addEventListener("transitionend",Te=>Te.target===y&&U()),setTimeout(U,le+50),J({ok:q,value:E?.value.trim()})}return O}function $u(e){let t=e.field??{};return as(e,(n,a)=>{let i=n("label","-field"),o=n("input","-input");o.type=t.type??"text",o.value=t.value??"",t.placeholder&&(o.placeholder=t.placeholder),o.spellcheck=!1,o.autocomplete="off";let s=()=>{a.disabled=o.value.trim()===""};return o.addEventListener("input",s),s(),i.append(n("span","-label",t.label??""),o),[i,o]}).then(n=>n.ok?n.value:null)}function is(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(i,o),n.append(a);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let u=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",u),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",u),n.remove()}}}var rs=new WeakMap,vr=.25;function ku(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let o=0,s=e.step??.005,l=e.onChange,u=e.onReset,c=m=>Math.min(1,Math.max(0,m)),d=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},p=m=>{let b=c(m);b!==o&&(o=b,d(),l?.(b))},h=0,f=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();m.target!==i&&b.height>0&&p(1-(m.clientY-b.top)/b.height),h=m.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!f)return;let b=n.getBoundingClientRect().height||1,v=(h-m.clientY)/b*(m.shiftKey?vr:1);h=m.clientY,p(o+v)});let g=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",m=>{m.preventDefault(),u?.()}),n.addEventListener("keydown",m=>{let b=m.shiftKey?s*vr:s,v={ArrowUp:o+b,ArrowRight:o+b,ArrowDown:o-b,ArrowLeft:o-b,PageUp:o+s*10,PageDown:o-s*10,Home:0,End:1};m.key in v&&(m.preventDefault(),p(v[m.key]))});let y={el:n,get value(){return o},get dragging(){return f},set(m){f||(o=c(Number(m)||0),d())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(u=m.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),rs.set(n,y),y}function Eu(e){return rs.get(e)}var os=new WeakMap,Au=.2,Su=1.5,Mu=.5;function Tu(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function wr(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Tu(a.getComputedStyle(e).getPropertyValue(Q(t)),n)}function Lu(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let s=[];for(let y=0;y<n;y++){let m=t.createElement("span");m.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let v=t.createElement("span");v.className="nc-meter-rms";let $=t.createElement("span");$.className="nc-meter-hold",m.append(b,v,$),o.append(m),s.push({peak:b,rms:v,hold:$,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,o);let l=e.label,u=e.onClear,c=!1,d=-1,p=-1,h=()=>{i.dataset.lit=c?"true":"false",i.setAttribute("aria-pressed",c?"true":"false"),i.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),i.title=c?"Clipped. Click to clear":"Clip light"},f=(y,m,b,v)=>{let $=Math.round(v*1e3)/1e3;b[m]!==$&&(b[m]=$,y.style.transform=m==="hold"?`translateY(${Math.round((1-$)*1e3)/10}%)`:`scaleY(${$})`)};i.addEventListener("click",()=>{g.clear(),u?.()});let g={el:a,get clipped(){return c},update(y,m){d<0&&(d=wr(a,"motion-meter-fall",Au)),p<0&&(p=wr(a,"motion-meter-hold",Su));let b=Math.max(0,Math.min(.25,Number(m)||0)),v=d>0?Math.exp(-b/d):0;s.forEach(($,S)=>{let z=y[S]??y[0]??{peak:0,rms:0},w=Math.min(1,Math.max(0,Number(z.peak)||0)),x=Math.min(w,Math.max(0,Number(z.rms)||0));z.over&&g.clip(),$.level.peak=w>=$.level.peak?w:w+($.level.peak-w)*v,$.level.rms=x>=$.level.rms?x:x+($.level.rms-x)*v,$.holdAge+=b,w>=$.holdAt?($.holdAt=w,$.holdAge=0):$.holdAge>p&&($.holdAt=Math.max(w,$.holdAt-Mu*b)),f($.peak,"peak",$.shown,$.level.peak),f($.rms,"rms",$.shown,$.level.rms),f($.hold,"hold",$.shown,$.holdAt),$.hold.dataset.off=$.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,h())},clear(){c=!1,h()},reset(){for(let y of s)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,f(y.peak,"peak",y.shown,0),f(y.rms,"rms",y.shown,0),f(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,h()},configure(y){y.onClear&&(u=y.onClear)}};return h(),g.reset(),os.set(a,g),g}function ss(e){return e?os.get(e):void 0}var Cu=3,Nu=new Set(["freq","q","rate","time","log"]);function wi(e,t,n){return!e||!Nu.has(e)||!(n>t)?"linear":t>0?"log":"power"}function na(e,t,n){return wi(e,t,n)!=="linear"}function xi(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let o=Math.min(n,Math.max(t,i)),s=wi(e,t,n);if(s==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return s==="power"?Math.cbrt(l):l}function ls(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),o=wi(e,t,n);return o==="log"?t*(n/t)**i:t+(n-t)*(o==="power"?i**Cu:i)}function cs(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(o)),i=Math.min(n,Math.max(t,i))}return i}function $i(e,t,n,a){return Math.round(xi(e,t,n,a)*1e3)}function _a(e,t,n,a,i){return cs(ls(e,t,n,Number(a)/1e3),t,n,i)}function Fu(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+i:t==="ArrowLeft"||t==="ArrowDown"?o=a-i:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function ds(e,t,n,a,i,o=!1,s){let l=$i(e,t,n,a),u=Fu(l,i,o);if(u===null)return null;let c=_a(e,t,n,u,s),d=Math.sign(u-l),p=cs(Number(a),t,n,s);for(;d!==0&&c===p&&u>0&&u<1e3;)u+=d,c=_a(e,t,n,u,s);return c}function xr(e){return!e||e.options?"linear":typeof e.taper=="string"?e.taper:e.curve==="log"?"freq":e.unit==="ms"||/_ms$/.test(String(e.key??""))||e.key==="predelay"?"time":"linear"}function $r(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function zu(e,t,n,a=n/6){let i=e.some(d=>d===null),o=Math.max(0,n-(i?a:0)),s=e.reduce((d,p,h)=>p===null?d:d+$r(t[h]),0),l=s>0?o/s:0,u=e.map(d=>d===null?0:Math.min(o,$r(d)*l));if(i){let d=u.reduce((h,f)=>h+f,0),p=e.indexOf(null);u[p]=Math.max(a,n-d)}let c=[0];for(let d of u)c.push(Math.round((c[c.length-1]+d)*100)/100);return i&&(c[c.length-1]=n),c}function Pu(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function He(e){return Math.max(0,Math.min(1,e))}function us(e,t){let{ctx:n,w:a,h:i}=Pu(e);if(!n)return;n.clearRect(0,0,a,i);let o=gu(e);if(t.paint==="swatch"){let u=te(e,"accent"),c=te(e,"rhythm.step-cell-on");e.dataset.ncAccent=u,e.dataset.ncStep=c,n.fillStyle=u,n.fillRect(0,0,a/2,i),n.fillStyle=c,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Iu(n,a,i,t,e,o);return}if(t.paint==="filter"){let u=t.mode??"lp",c=te(e,Zo(u)),d=te(e,"divider"),p=He(t.cutoff??.5),h=.08+(1-He(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){let g=f/Math.max(1,a),y=0;u==="lp"?y=g<p?1:Math.max(0,1-(g-p)/h):u==="hp"?y=g>p?1:Math.max(0,1-(p-g)/h):y=Math.max(0,1-Math.abs(g-p)/h);let m=i*.78-y*i*.62;f===0?n.moveTo(f,m):n.lineTo(f,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=te(e,"text-sub"),n.font=o,n.fillText(u.toUpperCase(),0,i),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=te(e,"accent");let u=Math.max(0,t.attack??0),c=Math.max(0,t.decay??.4),[d,p,h]=zu([u,c],t.max??[1,4],a),f=2,g=i-1;n.beginPath(),n.moveTo(d,g),n.lineTo(p,f);let y=Math.max(1,Math.ceil(h-p));for(let m=1;m<=y;m++){let b=m/y;n.lineTo(p+(h-p)*b,g-(g-f)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(a,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let u=Array.isArray(t.peaks)?t.peaks:[],[c,d]=Array.isArray(t.region)?t.region:[0,1],p=te(e,"accent"),h=te(e,"text-sub"),f=i/2;n.fillStyle=te(e,"accent-soft"),n.fillRect(He(c)*a,0,(He(d)-He(c))*a,i),n.strokeStyle=te(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(a,f),n.stroke();let g=Math.floor(u.length/2);for(let y=0;y<g;y++){let m=(y+.5)/g*a,b=Math.max(-1,Math.min(1,u[y*2]??0)),v=Math.max(-1,Math.min(1,u[y*2+1]??0)),$=(y+.5)/g;n.strokeStyle=$>=c&&$<=d?p:h,n.beginPath(),n.moveTo(m,f-v*(f-1)),n.lineTo(m,f-b*(f-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[c,d,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(He(y)*(a-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=te(e,"text"),n.fillRect(Math.round(He(t.position)*(a-1)),0,1,i)),g||(n.fillStyle=h,n.font=o,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let u=He(t.level??0);n.fillStyle=te(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=te(e,"accent"),n.fillRect(0,i*.4,a*u,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=te(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=te(e,"rhythm.playhead"),n.fillRect(l/s*a,i*.3,Math.max(1,a/s),i*.4),e.dataset.ncAccent=te(e,"accent")}var Kt=20,ja=2e4,wa=24,kr=-60;function Du(e,t,n,a,i=48e3){let o=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(o),l=Math.sin(o)/(2*n),u,c,d;e==="hp"?[u,c,d]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[u,c,d]=[l,0,-l]:[u,c,d]=[(1-s)/2,1-s,(1-s)/2];let p=1+l,h=-2*s,f=1-l,g=2*Math.PI*a/i,y=($,S,z)=>$+S*Math.cos(g)+z*Math.cos(2*g),m=($,S)=>-($*Math.sin(g)+S*Math.sin(2*g)),b=Math.hypot(y(u,c,d),m(c,d)),v=Math.hypot(y(p,h,f),m(h,f));return v>0?b/v:0}function Ru(e,t){return Math.log(Math.max(Kt,Math.min(ja,e))/Kt)/Math.log(ja/Kt)*t}function Er(e,t,n){let a=Math.max(kr,Math.min(wa,e));return t+(wa-a)/(wa-kr)*(n-t)}function Iu(e,t,n,a,i,o){let s=a.mode??"lp",l=te(i,Zo(s)),u=te(i,"divider"),c=te(i,"text-sub"),d=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,h=Math.max(p+4,n-d-3),f=a.q??Math.SQRT1_2,g=Math.round(Er(0,p,h))+.5;e.strokeStyle=u,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let m=Kt*(ja/Kt)**(y/Math.max(1,t)),b=a.open?1:Du(s,a.hz,f,m,a.sampleRate),v=Er(20*Math.log10(Math.max(1e-5,b)),p,h);y===0?e.moveTo(y,v):e.lineTo(y,v)}if(e.strokeStyle=l,e.stroke(),!a.open){let y=Math.round(Ru(a.hz,t))+.5;e.strokeStyle=c,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=c,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function Ae(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function qu(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var ot=20,cn=2e4,ki=Math.log(cn/ot),Ha=32,Ou=250,Bu=-100,_u=1200,ju=4.5,Ar=-6,it=-96,Hu=48,Sr=[100,1e3,1e4],Uu=[6,12];function $t(e,t){return Math.log(Math.max(ot,Math.min(cn,e))/ot)/ki*t}function Sn(e,t){return ot*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*ki)}function Xe(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Ua(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ps=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Vu(e,t,n,a){let i=n?3:1,o=u=>({db:Math.max(-a,Math.min(a,e.db+u*i))}),s=u=>({hz:Math.max(e.minHz??ot,Math.min(e.maxHz??cn,e.hz*2**(u*i/6)))}),l=u=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(u*i)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?s(1):o(1);case"ArrowLeft":return e.moveHz?s(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Ei(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Gu(e,t,n,a,i,o,s,l,u){let c=u?.25:1,d={},p=Math.max(1,o/2-l);if(d.db=Math.max(-s,Math.min(s,t.db-a*c/p*s/Ei(e))),e.moveHz){let h=t.hz*Math.exp(n*c/Math.max(1,i)*ki);d.hz=Math.max(e.minHz??ot,Math.min(e.maxHz??cn,h))}return d}function Wu(e,t,n,a,i){let o=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,s-o),u=Math.max(o,Math.min(e.left,s-l));return{left:Math.round(u-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var oe=new WeakMap;function Yu(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,a.append(i,o);for(let u of e.bands)a.append(Xu(n,u,t));a.append(s),a.addEventListener("click",u=>{if(!ys(n)||u.button>0)return;let c=bs(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),oe.set(n,{control:e,cache:null,spec:null,active:null}),ms(n,e),n}function hs(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Xu(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},o=()=>i()?.bands.find(c=>c.id===t.id)??null,s=null;a.addEventListener("pointerdown",c=>{if(c.button!==0)return;let d=o();d&&(c.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(c.pointerId),s={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:d.hz,db:d.db}},a.dataset.drag="true",Ue(e,t.id))}),a.addEventListener("pointermove",c=>{if(!s||c.pointerId!==s.id)return;let d=i(),p=o(),h=oe.get(e);if(!d||!p||!h?.box)return;let{w:f,h:g,pad:y}=h.box;d.onBand(p.id,Gu(p,s.start,c.clientX-s.x,c.clientY-s.y,f,g,d.range??18,y,c.shiftKey))});let l=c=>{!s||c.pointerId!==s.id||(s=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&Ue(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",c=>{c.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",c=>{let d=i(),p=o();if(!d||!p)return;let h=Vu(p,c.key,c.shiftKey,d.range??18);h&&(c.preventDefault(),h==="reset"?d.onReset?.(p.id):d.onBand(p.id,h),Ue(e,p.id))});let u=null;return a.addEventListener("wheel",c=>{let d=i(),p=o();if(!d||!p?.moveQ)return;c.preventDefault();let h=c.timeStamp;(!u||h-u.t>400)&&(u={q:p.q,t:h});let f=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;u.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,u.q*2**(-f/240))),u.t=h,d.onBand(p.id,{q:u.q}),Ue(e,p.id)},{passive:!1}),a.addEventListener("pointerenter",()=>Ue(e,t.id)),a.addEventListener("focus",()=>Ue(e,t.id)),a.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==a&&Ue(e,null)}),a.addEventListener("blur",()=>{s||Ue(e,null)}),a}function Ue(e,t){let n=oe.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Tt(e):Ai(e)}function Ai(e){let t=oe.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(a&&g.dataset.band===a.id?g.dataset.active="true":delete g.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,ps(a.db)];a.kind==="peak"?i.push(Ua(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${Ua(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Ku(t.control,a)),n.hidden=!1;let{w:o,h:s,pad:l}=t.box,u=$t(a.hz,o),c=Xe(a.db*Ei(a),s,t.control.range??18,l),d=n.offsetWidth,p=n.offsetHeight,h=Math.max(0,Math.min(o-d,u-d/2)),f=c-p-l*1.5>=0?c-p-l*1.5:Math.min(s-p,c+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(f)}px`}function Ku(e,t){return e.bands.indexOf(t)%3+1}function ms(e,t){let n=oe.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Si(e);let a=t.range??18;t.bands.forEach((i,o)=>{let s=hs(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(o%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-a)),s.setAttribute("aria-valuemax",String(a)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${ps(i.db)}, ${Ua(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),Tt(e),np(e)}function fs(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let s=e.getContext("2d");return s?.setTransform(a,0,0,a,0,0),{ctx:s,w:t,h:n}}function gs(e){return{curve:Ae(e,"eq-curve"),fill:Ae(e,"eq-fill"),quiet:Ae(e,"text-sub"),grid:Ae(e,"eq-grid"),zero:Ae(e,"divider"),label:Ae(e,"text-sub"),spectrum:Ae(e,"eq-spectrum"),bands:[Ae(e,"eq-band-1"),Ae(e,"eq-band-2"),Ae(e,"eq-band-3")]}}function Qu(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Tt(e){oe.has(e)&&Si(e);let t=oe.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:o,h:s}=fs(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),u=a.range??18;t.box={w:o,h:s,pad:l},t.colours=gs(e);let c=t.colours,d=Qu(a,o);if(!t.cache||t.cache.key!==d){let S=Math.max(64,Math.ceil(o)+1),z=new Float64Array(S);for(let x=0;x<S;x++)z[x]=Sn(x/(S-1)*o,o);let w=null;try{w=typeof a.response=="function"?a.response(z):null}catch{w=null}t.cache={key:d,freqs:z,total:w?.total??new Float64Array(S),bands:w?.bands??[]}}i.clearRect(0,0,o,s);let p=qu(e),h=a.on!==!1;Ju(i,o,s,u,l,c,p);let{freqs:f,total:g,bands:y}=t.cache,m=Array.from(f,S=>$t(S,o)),b=Xe(0,s,u,l);y.forEach((S,z)=>{if(!S||!S.some(E=>Math.abs(E)>.05))return;let w=h?c.bands[z%3]:c.quiet,x=Array.from(S,E=>Xe(E,s,u,l));i.save(),t.active&&a.bands[z]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=w,Mr(i,m,x,b)),i.globalAlpha=h?.75:.4,i.strokeStyle=w,i.lineWidth=.75,xa(i,m,x),i.restore()});let v=Array.from(g,S=>Xe(S,s,u,l)),$=h?c.curve:c.quiet;i.save(),i.fillStyle=h?c.fill:c.quiet,i.globalAlpha=h?.2:.08,Mr(i,m,v,b),i.restore(),i.save(),i.strokeStyle=h?c.fill:$,i.lineJoin="round",i.lineCap="round",h&&(i.globalAlpha=.16,i.lineWidth=4,xa(i,m,v)),i.globalAlpha=1,i.strokeStyle=$,i.lineWidth=1.25,xa(i,m,v),i.restore(),Zu(e),Ai(e)}function Ju(e,t,n,a,i,o,s){e.save(),e.lineWidth=1;for(let u=10;u<=1e4;u*=10)for(let c=1;c<=9;c++){let d=u*c;if(d<ot||d>cn)continue;let p=Math.round($t(d,t))+.5;e.globalAlpha=Sr.includes(d)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let u of Uu)if(!(u>a))for(let c of[1,-1]){let d=Math.round(Xe(u*c,n,a,i))+.5;e.globalAlpha=u===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(Xe(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let u of Sr){let c=u>=1e3?`${u/1e3}k`:String(u),d=e.measureText(c).width,p=$t(u,t)+3;e.fillText(c,p+d+2>t?$t(u,t)-d-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let u of[12,0,-12]){if(Math.abs(u)>a)continue;let c=Xe(u,n,a,i);e.fillText(u>0?`+${u}`:u<0?`−${-u}`:"0",t-3,Math.round(c)-1)}e.restore()}function Bn(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,o)}e.lineTo(t[t.length-1],n[n.length-1])}function xa(e,t,n){e.beginPath(),Bn(e,t,n),e.stroke()}function Mr(e,t,n,a){e.beginPath(),Bn(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function bs(e){return e.closest("[data-nc-maxable]")}function ys(e){let t=bs(e);return!!t&&!t.hasAttribute("data-nc-max")}function Si(e){let t=ys(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=oe.get(e);n?.active&&(n.active=null,Ai(e))}return t}function Zu(e){Si(e);let t=oe.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,o=t.control.range??18;for(let s of t.control.bands){let l=hs(e,s.id);l instanceof HTMLElement&&(l.style.left=`${$t(s.hz,n).toFixed(1)}px`,l.style.top=`${Xe(s.db*Ei(s),a,o,i).toFixed(1)}px`)}}function ep(e,t,n,a){let i=a/2/n,o=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let u=0;u<e;u++){let c=(u-.5)/(e-1)*t,d=(u+.5)/(e-1)*t,p=Sn(c,t),h=Sn(d,t),f=Sn(u/(e-1)*t,t);o[u]=Math.min(n-1,p/i),s[u]=Math.min(n-1,h/i),l[u]=ju*Math.log2(f/1e3)}return{lo:o,hi:s,tilt:l}}function tp(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let s=t-a,l=e[a]??-1/0,u=e[Math.min(e.length-1,a+1)]??l;return l+(u-l)*s}let o=-1/0;for(let s=a;s<=i&&s<e.length;s++)e[s]>o&&(o=e[s]);return o}function np(e){let t=oe.get(e);if(t){if(!t.control.spectrum){ws(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=oe.get(e)?.spec;i&&(i.visible=a.some(o=>o.isIntersecting),Va(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Va(e)}}function Va(e){let t=oe.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){vs(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ga(e),n.onVis||(n.onVis=()=>Va(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Wa(e,!1)}function Ga(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Wa(e,t){let n=oe.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,$a(e,Ga(e))),Ou):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,$a(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,$a(e,Ga(e))),Ha))}function vs(e){let t=oe.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function ws(e){let t=oe.get(e)?.spec;if(!t)return;vs(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=oe.get(e);n&&(n.spec=null)}function $a(e,t){let n=oe.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){ws(e);return}if(!a.analyser)return;if(t-a.last<Ha-4&&!a.idle){Wa(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):Ha/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:u}=fs(o);if(!s)return;let c=Math.max(16,Math.round(l/2)),d=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==c||a.map.w!==l||a.map.sr!==d)&&(a.map={cols:c,w:l,sr:d,...ep(c,l,a.buf.length,d)},a.disp=new Float32Array(c).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let p=-1/0,h=Hu*i,{lo:f,hi:g,tilt:y}=a.map;for(let b=0;b<c;b++){let v=tp(a.buf,f[b],g[b]);v>p&&(p=v);let $=v+y[b],S=a.disp[b]-h;a.disp[b]=$>S?$:S}p>Bu&&(a.loud=t);let m=t-a.loud>_u;s.clearRect(0,0,l,u),(!m||a.disp.some(b=>b>it))&&ap(s,l,u,a.disp,n.colours??gs(e)),a.idle=m&&!a.disp.some(b=>b>it),Wa(e,a.idle)}function ap(e,t,n,a,i){let o=a.length,s=new Array(o),l=new Array(o),u=c=>{let d=a[Math.max(0,Math.min(o-1,c))];return Number.isFinite(d)?d:it};for(let c=0;c<o;c++){let d=u(c)*.36+(u(c-1)+u(c+1))*.22+(u(c-2)+u(c+2))*.1,p=(Math.max(it,Math.min(Ar,Number.isFinite(d)?d:it))-it)/(Ar-it);s[c]=c/(o-1)*t,l[c]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Bn(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Bn(e,s,l),e.stroke(),e.restore()}var ip=.8912509381337456,Ya=32,rp=250,op=1200,sp=.2,xs=1.5;function lp(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function cp(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var _n=new WeakMap,Tr=new WeakMap;function Lr(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(i);return Number.isFinite(o)?i.endsWith("ms")?o/1e3:o:n}function dp(e){let t=Tr.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let o of i){let s=_n.get(o.target);s&&(s.seen.set(o.target,o.isIntersecting),Qt(s))}bt(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Qt(i);bt(t)}),Tr.set(e,t),t}var $s=e=>e.els.some(t=>t.isConnected);function up(e){if(!e.loop.io)return $s(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Qt(e){let t=!e.dead&&!!e.source&&up(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Mi(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Qa(e))}function Mi(e){return e.doc.defaultView?.performance?.now()??Date.now()}function bt(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){ks(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Mi(e)),!e.raf&&!e.timer&&Xa(e,!1)}function Xa(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>Cr(e,Mi(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),rp):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Cr(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Ya)}function ks(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Cr(e,t){if(t-e.last<Ya-4&&!e.idle&&e.last){Xa(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Ya/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let o of e.recs){if(!$s(o)){(o.placed||e.frames-o.born>90)&&Es(o);continue}o.placed=!0,o.open&&(i=!0,pp(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!i){ks(e);return}e.idle=t-e.loud>op&&!a,Xa(e,e.idle)}function pp(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Lr(h,"motion-meter-fall",sp),e.hold=Lr(h,"motion-meter-hold",xs)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",o=i?a:Number(a?.in)||0,s=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=s&&Number(a.out)||0,u=s?"2":"1";if(e.rows!==u){e.rows=u;for(let h of e.els)h.dataset.ncRows=u}let c=e.fall>0?Math.exp(-t/e.fall):0,d=[o,l],p=!1;for(let h=0;h<2;h++){let f=lp(d[h]);f>0&&(p=!0),e.disp[h]=f>=e.disp[h]?f:f+(e.disp[h]-f)*c,e.disp[h]<.001&&(e.disp[h]=0),d[h]>=ip&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Ka(e,h,e.disp[h],g)}return p}function Ka(e,t,n,a){let i=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===o)){e.shown[t]=i,e.clipShown[t]=o;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=o)}}}function Qa(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ka(e,0,0,!1),Ka(e,1,0,!1)}function Es(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),_n.get(t)===e&&_n.delete(t)}function hp(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=dp(a),o={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:xs,rows:""};for(let s of n)_n.set(s,o),i.io?.observe(s);if(i.recs.add(o),Qa(o),!i.io){let s=a.defaultView,l=()=>{Qt(o),bt(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!o.dead){if(l===o.source){Qt(o),bt(i);return}o.open&&(o.open=!1,o.source?.close?.(),Qa(o)),o.source=l,Qt(o),bt(i)}},destroy(){o.dead||Es(o),bt(i)}}}var As={slop:8,longPressMs:500,pitchPx:16},mp=class{constructor(e,t,n=As){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,o)<this.config.slop)return;Math.abs(o)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-o/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function fp(e,t,n,a=As){let i=!1,o=0,s=(c,d)=>{let p=e.ownerDocument.elementFromPoint?.(c,d),h=[...e.querySelectorAll(t)],f=p?h.findIndex(m=>m===p||m.contains(p)):-1;if(f>=0)return f;let g=-1,y=Number.POSITIVE_INFINITY;return h.forEach((m,b)=>{if(m.hidden)return;let v=m.getBoundingClientRect();if(d<v.top||d>v.bottom)return;let $=Math.abs(c-(v.left+v.width/2));$<y&&$<=v.width&&(g=b,y=$)}),g},l=new mp(s,c=>{(c.kind==="paint"||c.kind==="long")&&(i=!0),n(c)},a),u=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",c=>{c.button>0||(i=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(u(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&u())}),e.addEventListener("pointerup",c=>{u(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{u(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{i&&(i=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var Ss="netcomposer.groups.v1";function Ti(){try{return globalThis.localStorage??null}catch{return null}}function Ms(e=Ti(),t=Ss){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,o]of Object.entries(n))typeof o=="boolean"&&a.set(i,o);return a}catch{return new Map}}function gp(e,t,n,a=Ss){let i=Ms(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function bp(e,t=Ti()){return Ms(t).get(e.id)??e.open===!0}function yp(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(o,s,l);let u=document.createElement("div");u.className="nc-group-body",u.id=`${e.id}-group-body`,u.setAttribute("role","group"),u.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",u.id);for(let c of e.controls)u.append(n(c,t));return i.addEventListener("click",()=>{let c=a.dataset.ncOpen!=="true";gp(Ti(),e.id,c),Ja(a,c);let d=t(a);d?.type==="group"&&d.onToggle?.(c)}),a.append(i,u),Ts(a,e),Ja(a,bp(e)),Ls(a,e),a}function Ja(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Ts(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Ls(e,t){Ts(e,t)&&Ja(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var wn="application/x-nc-pad",Nr="http://www.w3.org/2000/svg";function vp(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let o=0;o<n;o++){let s=Math.floor(o*t/n),l=Math.max(s+1,Math.floor((o+1)*t/n)),u=0,c=0;for(let p=s;p<l;p++)u=Math.min(u,e[2*p]??0),c=Math.max(c,e[2*p+1]??0);let d=n===1?50:o/(n-1)*100;a.push(`${d.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),i.push(`${d.toFixed(1)} ${(10-Math.max(-1,u)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function wp(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,o)=>a.append(xp(n,o,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&Mn(n)}),Ns(n,e),n}function xp(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let u=document.createElementNS(Nr,"svg");u.setAttribute("class","nc-padgrid-pad-wave"),u.setAttribute("viewBox","0 0 100 20"),u.setAttribute("preserveAspectRatio","none"),u.setAttribute("aria-hidden","true");let c=document.createElementNS(Nr,"path");return u.append(c),a.append(i,o,s,l,u),kp(e,a,t,n),o.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&a.dataset.empty!=="true"&&Cs(e,a,t,n)}),a.addEventListener("dragstart",d=>{if(a.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(wn,String(t)),d.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",d=>{let p=d.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(wn)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=p.includes(wn)&&!d.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",d=>{delete a.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let h=d.dataTransfer?.getData(wn);if(h!==void 0&&h!==""){d.preventDefault(),d.stopPropagation();let g=Number(h);g!==t&&p.onMove?.(g,t,d.altKey);return}let f=d.dataTransfer?.files?.[0];f&&(d.preventDefault(),d.stopPropagation(),p.onFile?.(t,f))}),a}function $p(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function kp(e,t,n,a){let i=0,o=!1,s=0,l=0,u=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;o=!1,s=c.clientX,l=c.clientY,u();let d=a(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&c.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,o=Fr(e,t,n,a)},450)))}),t.addEventListener("pointermove",c=>{i&&Math.hypot(c.clientX-s,c.clientY-l)>8&&u()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,u);t.addEventListener("contextmenu",c=>{c.preventDefault(),u(),o=Fr(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}$p(e,n,a)})}function Fr(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let o=i.menu(n);if(!o.length)return!1;Mn(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),Mn(e)}),s.addEventListener("click",d=>d.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of o){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=d.id,p.textContent=d.label,p.addEventListener("click",()=>{Mn(e);let h=a(e);h?.type==="padGrid"&&(d.id==="rename"&&h.onRename?Cs(e,t,n,a):h.onMenu?.(n,d.id))}),l.append(p)}e.append(s,l);let u=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-u.left}px`,l.style.top=`${c.bottom-u.top}px`,l.querySelector("button")?.focus(),!0}function Cs(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=i.nameMax??24,o.value=i.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-s.left}px`,o.style.top=`${l.top-s.top}px`,o.style.width=`${l.width}px`;let u=!1,c=d=>{if(u)return;u=!0;let p=o.value.trim();o.remove(),t.focus();let h=a(e);d&&p&&h?.type==="padGrid"&&h.onRename?.(n,p)};o.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?c(!0):d.key==="Escape"&&c(!1)}),o.addEventListener("blur",()=>c(!0));for(let d of["pointerdown","click","dblclick"])o.addEventListener(d,p=>p.stopPropagation());e.append(o),o.focus(),o.select()}function Mn(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ns(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let o=n[i];if(!(o instanceof HTMLButtonElement))return;let s=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),u=o.querySelector(".nc-padgrid-pad-wave path"),c=o.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),u?.setAttribute("d","")):(delete o.dataset.empty,s&&(s.textContent=a.label),l&&(l.textContent=""),u?.setAttribute("d",vp(a.peaks))),a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let d=t.selected===i;d?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",d?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.badgeLabel?`, ${a.badgeLabel}`:""}${d?", selected":""}`)})}function pe(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function aa(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function zr(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function nn(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Ep=450,Pr=8;function Re(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Ap(e){let t=fu(e,"target-min");return t>0?t:44}function Sp(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Ap(e),a=n/2,i=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let s=t[o],l=i[o];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let u=l.left+l.width/2,c=l.top+l.height/2,d=u-a,p=u+a,h=c-a,f=c+a;for(let g=0;g<t.length;g++){if(o===g)continue;let y=i[g];if(!y||y.width===0)continue;let m=y.left+y.width/2,b=y.top+y.height/2;Math.abs(b-c)<a*2&&(m>u?p=Math.min(p,(u+m)/2):m<u&&(d=Math.max(d,(u+m)/2))),Math.abs(m-u)<a*2&&(b>c?f=Math.min(f,(c+b)/2):b<c&&(h=Math.max(h,(c+b)/2)))}d=Math.min(d,l.left),p=Math.max(p,l.right),h=Math.min(h,l.top),f=Math.max(f,l.bottom),s.style.left=`${d-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,p-d)}px`,s.style.height=`${Math.max(0,f-h)}px`,s.style.transform="none"}}function Fs(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Dr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Lt(e,t){switch(e.type){case"slider":return Mp(e,t);case"select":return Lp(e,t);case"toggle":return Cp(e,t);case"button":return Np(e,t);case"readout":return Fp(e);case"label":return Rp(e);case"note":return Rr(e);case"knob":return Op(e,t);case"choice":return Bp(e,t);case"slotRow":return _p(e,t);case"stepGrid":return Vp(e,t);case"canvas":return Xp(e);case"fx":return eh(e,t);case"eqGraph":return Yu(e,t);case"group":return yp(e,t,Lt);case"strip":return Kp(e,t);case"stripAdd":return Zp(e,t);case"padGrid":return wp(e,t);case"moves":return Pp(e,t);default:return Rr({id:"unknown",text:""})}}function Se(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ds(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(zs(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??nn(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),zr(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")zr(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&st(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Ip(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??nn(t.value))}else if(t.type==="choice")Rs(e,t);else if(t.type==="slotRow")qs(e,t);else if(t.type==="stepGrid")ei(e,t);else if(t.type==="padGrid")Ns(e,t);else if(t.type==="moves")Ps(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&us(n,t)}else if(t.type==="eqGraph")ms(e,t);else if(t.type==="strip"){js(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${kt(n.id)}"]`);a instanceof Element&&Se(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Bs(e,t);else if(t.type==="group"){Ls(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${kt(n.id)}"]`);a instanceof Element&&Se(a,n)}}else if(t.type==="fx"){Xs(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${kt(n.id)}"]`);a instanceof Element&&Se(a,n)}}}}function Mp(e,t){let n=aa(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=na(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(zs(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>i?_a(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),i&&a.addEventListener("keydown",l=>{let u=t(a);if(u?.type!=="slider"||a.disabled)return;let c=u.taper??e.taper,d=ds(c,u.min,u.max,u.value,l.key,l.shiftKey,u.step);d!==null&&(l.preventDefault(),a.value=String($i(c,u.min,u.max,d)),u.onChange(d),u.onCommit?.(d))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(a,s),e.onTap&&n.insertBefore(Tp(e,a,t),s),n.append(pe()),Se(n,e),n}function zs(e){return na(e.taper,e.min,e.max)?$i(e.taper,e.min,e.max,e.value):e.value}function Tp(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(Re());let i=o=>{let s=n(t);s?.type==="slider"&&s.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&i(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),i(o.timeStamp))}),a}function Lp(e,t){let n=aa(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let o of e.options){let s=document.createElement("option");s.value=o.value,s.textContent=o.label,o.disabled&&(s.disabled=!0),o.group?i?.getAttribute("label")!==o.group&&(i=document.createElement("optgroup"),i.setAttribute("label",o.group),a.append(i)):i=null,(i??a).append(s)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,pe()),n}function Cp(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(pe()),Se(n,e),n}function Np(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(pe()),Se(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Fs(),i.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Os(o);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),a.append(n,i),a}function Fp(e){let t=aa(e.id,e.label);return t.append(pe()),Se(t,e),t}var zp=450;function Pp(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of a.moves){let u=document.createElement("button");u.type="button",u.className="nc-moves-btn",u.dataset.ncMove=l.id,u.title=l.title??l.text,u.setAttribute("aria-label",`${a.label} ${l.text}`),u.append(Dp(l.icon)),u.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(u)}i.append(o,s),n.append(i)}return Ps(n,e),n}function Ps(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${kt(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function Dp(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Rp(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(pe()),t}function Rr(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(pe()),t}function Ir(e){if(typeof e.valueText=="string")return e.valueText;let t=nn(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ds(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Ip(e,t){let n=xi(t.taper,t.min,t.max,t.value);Ds(e,t.modulated===!0);let a=Math.round(n*270);e.style.setProperty("--knob-turn",String(a)),t.bipolar&&(e.style.setProperty("--knob-from",String(Math.min(a,135))),e.style.setProperty("--knob-to",String(Math.max(a,135)))),e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Ir(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Ir(t)}`}function qp(e,t){if(na(e.taper,e.min,e.max))return ds(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Op(e,t){let n=aa(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let o=0,s=0;a.addEventListener("pointerdown",c=>{o=c.clientY;let d=t(a);s=d&&"value"in d?Number(d.value):0,a.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",c=>{if(a.hasPointerCapture&&!a.hasPointerCapture(c.pointerId))return;let d=t(a);if(d?.type!=="knob")return;if(na(d.taper,d.min,d.max)){let f=xi(d.taper,d.min,d.max,s)-(c.clientY-o)/120;d.onChange(ls(d.taper,d.min,d.max,f));return}let p=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,s-(c.clientY-o)*p/120));d.onChange(h)}),a.addEventListener("dblclick",()=>{let c=t(a);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),a.addEventListener("keydown",c=>{let d=t(a);if(d?.type!=="knob")return;let p=qp(d,c);p!==null&&(c.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,p))))});let u=n.querySelector("[data-nc-readout]");return n.insertBefore(a,u),n.append(pe()),Se(n,e),n}function Bp(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),i.addEventListener("keydown",o=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),u=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")u=(l+1)%s.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")u=(l-1+s.length)%s.length;else if(o.key==="Home")u=0;else if(o.key==="End")u=s.length-1;else return;let c=s[u];c instanceof HTMLButtonElement&&(o.preventDefault(),c.focus(),c.click())}),n.append(i)}return n.append(pe()),Rs(n,e),n}function Rs(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function _p(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let p=e.slots[d],h=document.createElement("span");h.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(d),f.textContent=p.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(f,Re()),jp(h,f,n,d,t),a.append(h)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Fs(),i.append(Re()),i.addEventListener("click",()=>{Os(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(l.value))});let u=document.createElement("span");u.className="nc-readout nc-morph-readout",u.dataset.ncMorph="",o.append(s,u,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(a,...i?[i]:[]),n.append(c,o,pe()),Is(n,t),qs(n,e),n}function qr(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;Ht(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,o)}function jp(e,t,n,a,i){let o=0,s=0,l=0,u=!1,c=!1,d=!1,p=!1,h=()=>{window.clearTimeout(o),o=0},f=b=>{let v=b.clientX-s,$=b.clientY-l;v*v+$*$>Pr*Pr&&(u=!0,h())},g=()=>{p&&(p=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",m))},y=b=>{let v=o!==0&&!u&&!c;h(),g(),v&&(d=!0,qr(n,a,i,b))},m=()=>{u=!0,h(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),c=!1,u=!1,d=!1,s=b.clientX,l=b.clientY,h(),o=window.setTimeout(()=>{o=0,!u&&(c=!0,Hp(n,t,a,i))},Ep),p=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(d||c||u){d=!1,c=!1,u=!1;return}qr(n,a,i,b)})}function Is(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=Or("Save","store"),i=Or("Clear","clear");n.append(a,i);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ht(e)}),o.addEventListener("click",s=>s.stopPropagation()),e.append(o,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let u=t(e);if(u?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(u.onSlot(c,"store"),Ht(e)):l.dataset.ncSlotOp==="clear"&&(u.onSlot(c,"clear"),Ht(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ht(e)})}function Or(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Hp(e,t,n,a){Is(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Ht(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function qs(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let o=Number(i.dataset.ncSlot),s=t.slots[o];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Os(e){let t=e.dataset.ncLastFill||null,n=eu(t);e.dataset.ncLastFill=n;let a=tu(n);if(a)for(let[i,o]of Object.entries(a))e.style.setProperty(i,o)}function Up(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),i(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>i(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||i(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),i(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Vp(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=m=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=m,a.append(b),b},o=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let b of[o,s]){let v=b===m;b.setAttribute("aria-checked",v?"true":"false"),b.tabIndex=v?0:-1}};l(o);for(let m of[o,s])m.addEventListener("click",()=>l(m));a.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let b=s.getAttribute("aria-checked")==="true"?o:s;l(b),b.focus()});let u=document.createElement("div");if(u.className="nc-step-tools",u.append(a),e.onFill&&u.append(Up(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),u.append(m)}n.append(u);for(let m of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let v=document.createElement("button");v.type="button",v.className="nc-name",v.textContent=m.label,v.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(v.dataset.ncLane=String((m.lane-1)%4+1));let $=!1,S=0;v.addEventListener("pointerdown",x=>{$=!1,!(x.pointerType==="mouse"||x.button!==0)&&(S=window.setTimeout(()=>{let E=t(n);E?.type!=="stepGrid"||!E.selectedRows||($=!0,E.onSelectRow?.(E.rows.findIndex(A=>A.id===m.id),!0))},zp))});for(let x of["pointerup","pointercancel","pointerleave"])v.addEventListener(x,()=>window.clearTimeout(S));v.addEventListener("contextmenu",x=>{$&&x.preventDefault()}),v.addEventListener("click",x=>{let E=t(n);if(E?.type!=="stepGrid")return;if($){$=!1;return}let A=E.rows.findIndex(C=>C.id===m.id),L=!!E.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);E.onSelectRow?.(A,L)}),v.addEventListener("keydown",x=>Gp(n,v,x));let z=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=x,A.textContent=x==="mute"?"M":"S",A.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${m.label}`),E.append(A,Re()),E.addEventListener("click",()=>{let L=t(n);if(L?.type!=="stepGrid")return;let C=L.rows.findIndex(H=>H.id===m.id);(x==="mute"?L.onMute:L.onSolo)?.(C)}),z.push(E)}let w=document.createElement("div");w.className="nc-steps";for(let x=0;x<m.steps.length;x++){let E=document.createElement("span");E.className="nc-step-wrap";let A=document.createElement("button");A.type="button",A.className="nc-step",A.dataset.ncStep=`${m.id}:${x}`,A.setAttribute("aria-label",`${m.label} step ${x+1}`),E.append(A,Re()),E.addEventListener("click",L=>{let C=t(n);if(C?.type!=="stepGrid")return;let H=C.rows.findIndex(G=>G.id===m.id),B=s.getAttribute("aria-checked")==="true";C.onToggle(H,x,L.shiftKey||B)}),w.append(E)}if(e.onLength&&w.append(Wp(n,w,m,t)),b.append(...z,v,w),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=m.id,x.setAttribute("aria-label",`Re-roll ${m.label}`),x.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=Dr(),x.append(Re()),x.addEventListener("click",()=>{let E=t(n);E?.type==="stepGrid"&&E.onDice?.(E.rows.findIndex(A=>A.id===m.id))}),b.append(x)}b.addEventListener("click",x=>{if(x.target!==b)return;let E=t(n);E?.type==="stepGrid"&&E.onSelectRow?.(E.rows.findIndex(A=>A.id===m.id))}),Br(n,w,".nc-step-wrap",t,s,()=>m.id),n.append(b)}let c=document.createElement("div");c.className="nc-pads-head";let d=(m,b,v)=>{let $=document.createElement("button");return $.type="button",$.className=m,$.textContent=b,v&&$.setAttribute("aria-label",v),$},p=d("nc-pads-step","‹","Previous lane"),h=d("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ei(n,m))}));for(let[m,b]of[[p,-1],[h,1]])m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid"||v.rows.length===0)return;let $=v.rows.length;v.onSelectRow?.(((xn(v)+b)%$+$)%$)});if(c.append(p,f,h),e.onDice){let m=d("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Dr(),m.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let v=xn(b);v>=0&&b.onDice?.(v)}),c.append(m)}if(e.transport){let m=d("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),c.append(m)}n.append(c);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let y=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<y;m++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(m),b.textContent=String(m+1),b.addEventListener("click",v=>{let $=t(n);if($?.type!=="stepGrid")return;let S=xn($);if(S<0)return;if(n.dataset.ncLenMode==="true"){$.onLength?.(S,m+1);return}let z=s.getAttribute("aria-checked")==="true";$.onToggle(S,m,v.shiftKey||z)}),g.append(b)}return Br(n,g,".nc-pad",t,s,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[xn(m)]?.id:void 0}),n.append(g),n.append(pe()),ei(n,e),n}function xn(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Br(e,t,n,a,i,o){let s="on",l=!0,u=-1,c=(d,p)=>{let h=d.rows[u]?.steps[p];!h||p>=d.rows[u].length||(d.onSet?d.onSet(u,p,s,l):!!h[s]!==l&&d.onToggle(u,p,s==="accent"))};fp(t,n,d=>{let p=a(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let h=p.rows.findIndex(f=>f.id===o());h>=0&&p.rows[h].length!==d.pad+1&&p.onLength?.(h,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let h=o();u=p.rows.findIndex(g=>g.id===h);let f=p.rows[u]?.steps[d.pad];if(!f)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[s]}c(p,d.pad)}else if(d.kind==="long"){let h=o(),f=p.rows.findIndex(y=>y.id===h),g=t.querySelectorAll(n)[d.pad];f>=0&&g instanceof HTMLElement&&p.onLongPress?.(f,d.pad,g)}}})}function Gp(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),o=i;n.key==="ArrowDown"?o=i+1:n.key==="ArrowUp"?o=i-1:n.key==="Home"?o=0:o=a.length-1;let s=a[o];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function Wp(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Re());let o=c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.findIndex(g=>g.id===n.id),h=d.rows[p];if(!h)return;let f=Math.max(1,Math.min(h.steps.length,c));f!==h.length&&d.onLength?.(p,f)},s=c=>{let d=[...t.querySelectorAll(".nc-step")],p=1;return d.forEach((h,f)=>{let g=h.getBoundingClientRect();g.width>0&&c>=g.left+g.width/2&&(p=f+1)}),p},l=c=>o(s(c.clientX)),u=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",u),window.removeEventListener("pointercancel",u),delete i.dataset.dragging};return i.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",u),window.addEventListener("pointercancel",u))}),i.addEventListener("keydown",c=>{let d=a(e);if(d?.type!=="stepGrid")return;let p=d.rows.find(f=>f.id===n.id);if(!p)return;let h={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};c.key in h&&(c.preventDefault(),o(h[c.key]))}),i}var ka=new WeakMap,$n=new WeakMap;function Yp(e){return e?($n.has(e)||($n.set(e,On(e)),Qo(t=>{$n.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Za(n,Number(n.getAttribute("data-nc-velocity")))},e)),$n.get(e)):"light"}function Za(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Yp(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(ka.has(e)&&ka.get(e)===i)){if(ka.set(e,i),n===null){for(let o of Object.keys(br(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,s]of Object.entries(br(n,gr[a]??gr.light)))e.style.setProperty(o,s)}}function ei(e,t){let n=t.rows.some(d=>d.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),o=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&o&&(s.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let u=e.querySelector("[data-nc-pads-dice]");u instanceof HTMLElement&&o&&(u.setAttribute("aria-label",`Re-roll ${o.label}`),u.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let d=!!t.transport?.playing,p=t.transport?.label??(d?"Stop":"Play");c.textContent!==p&&(c.textContent=p),c.setAttribute("aria-pressed",d?"true":"false");let h=t.transport?.ariaLabel;h?c.setAttribute("aria-label",h):c.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let d=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let h=Number(p.getAttribute("data-nc-pad")),f=o.steps[h];p instanceof HTMLButtonElement&&(p.hidden=!f||!l&&h>=o.length,l&&h>=o.length?p.dataset.out="true":delete p.dataset.out,l&&h===o.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${o.label} step ${h+1}`),p.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?p.dataset.accent="true":delete p.dataset.accent,f?.dim?p.dataset.dim="true":delete p.dataset.dim,Za(p,f?.velocity),t.playhead>=0&&h===d?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let d of t.rows){for(let f=0;f<d.steps.length;f++){let g=d.steps[f],y=e.querySelector(`[data-nc-step="${d.id}:${f}"]`);if(!(y instanceof HTMLButtonElement))continue;let m=y.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;let $=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);$?m.dataset.picked="true":delete m.dataset.picked;let S=m.querySelector(".nc-name");S instanceof HTMLElement&&(S.setAttribute("aria-pressed",t.selectedRow===d.id||$?"true":"false"),S.textContent!==d.label&&(S.textContent=d.label,S.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(let z of m.querySelectorAll("[data-nc-ms]")){let w=z.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;z.setAttribute("aria-pressed",w?"true":"false")}}y.setAttribute("aria-pressed",g.on?"true":"false"),g.accent?y.dataset.accent="true":delete y.dataset.accent,g.dim?y.dataset.dim="true":delete y.dataset.dim,f%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof g.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Za(y,g.velocity);let b=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;f===b?y.dataset.playhead="true":delete y.dataset.playhead;let v=!!t.onLength&&t.selectedRow===d.id;y.hidden=f>=d.length&&!v,f>=d.length&&v?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${d.id}"]`),h=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&h&&h.nextElementSibling!==p){let f=document.activeElement===p;h.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(d.length)),p.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),p.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function Xp(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,pe()),t}function Kp(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",s=null;if(o&&(n.dataset.ncFoldable="",s=Us(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==s&&s.focus())})),a.append(i),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onRemove?.(b)}),a.append(b)}let l=document.createElement("div");if(l.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",b.append(v,Re()),b.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onHacks?.()}),l.append(b)}let u=document.createElement("div");u.className="nc-strip-ms";for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let v=document.createElement("span");v.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=b,$.textContent=b==="mute"?"M":"S",v.append($,Re()),v.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&(b==="mute"?S.onMute:S.onSolo)?.()}),u.append(v)}let c=document.createElement("div");c.className="nc-strip-sends";for(let b of e.sends??[])c.append(Lt({...b,type:"knob",compact:!0},t));let d=document.createElement("div");d.className="nc-strip-pan",e.pan&&d.append(Lt(Li(e),t));let p=document.createElement("div");p.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(b.value)),v.textContent=b.label,h.append(v)}let f=ku({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let v=t(n);v?.type==="strip"&&v.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&jr(b)}}),g=Lu({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(p.append(h,f.el,g.el),o){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");let $=document.createElement("span");$.className="nc-ui-fx-fold-name",$.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!e.pan,b.append(v,S,$),b.addEventListener("click",()=>{let z=t(n);if(z?.type!=="strip")return;z.onFold?.(!1);let w=n.querySelector("[data-nc-strip-hide]");w instanceof HTMLElement&&w.focus()}),p.prepend(b)}let y=document.createElement("button");y.type="button",y.className="nc-strip-db",y.dataset.ncReadout="";let m=0;return y.addEventListener("click",b=>{let v=t(n);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(m),b.detail===0?_r(n,y,t):b.detail===1&&(m=window.setTimeout(()=>_r(n,y,t),Jp)))}),y.addEventListener("dblclick",()=>{window.clearTimeout(m);let b=t(n);b?.type==="strip"&&jr(b)}),s&&n.append(s),n.append(a,l,u,c,d,p,y,pe()),js(n,e),n}function Li(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Qp(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Qp(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Jp=250;function _r(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??nn(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let o=!1,s=l=>{if(o)return;o=!0;let u=i.value;if(i.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(u)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function Zp(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(i,o);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),u=s.value;_s(s),l?.type==="stripAdd"&&u&&l.onAdd(u)}),n.append(a,s,pe()),Bs(n,e),n}function Bs(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==s&&(a.replaceChildren(...i.map(l=>{let u=document.createElement("option");return u.value=l.value,u.textContent=l.label,u.disabled=l.disabled===!0,u})),_s(a))}function _s(e){let t=e.options[0];t&&(t.selected=!0)}function jr(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function js(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),o=i?Eu(i):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),ss(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let p=t.valueText??nn(t.value);s.textContent!==p&&(s.textContent=p),s.setAttribute("aria-label",`${t.label} level ${p}`);let h=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${h}`:h}for(let p of e.querySelectorAll("[data-nc-ms]")){let h=p.getAttribute("data-nc-ms"),f=h==="mute"?t.mute===!0:t.solo===!0;p.setAttribute("aria-pressed",f?"true":"false"),p.setAttribute("aria-label",`${h==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let p=t.hacksLabel??"Hacks";l.textContent!==p&&(l.textContent=p),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${p}: ${t.label}`)}if(t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let p=e.querySelector(`.nc-strip-pan [data-nc-id="${kt(t.pan.id)}"]`);p&&Se(p,Li(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let c=e.querySelector("[data-nc-strip-hide]");c instanceof HTMLElement&&(Vs(c,u,t.label),st(c,t.foldHelp));let d=e.querySelector("[data-nc-strip-fold]");if(d instanceof HTMLElement){d.hidden=!u,d.setAttribute("aria-label",`Expand ${t.label}`);let p=d.querySelector("[data-nc-strip-fold-name]");p&&p.textContent!==t.label&&(p.textContent=t.label),st(d,t.foldedHelp??t.foldHelp)}}function Hr(e,t){let n=e?.querySelector?.(`.nc-strip[data-nc-id="${kt(t)}"]`);return ss(n?.querySelector(".nc-meter")??void 0)}function eh(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",o=!!e.meter;if(e.on===void 0&&!i&&!jn(e)&&!o)n.append(a);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(a),o&&s.append(Ws(n,"head")),e.on!==void 0){let l=is({checked:e.on,labelledBy:a.id,onChange:u=>{let c=t(l.el);c?.type==="fx"&&c.onToggle?.(u)}});l.el.dataset.ncFxSwitch="",s.append(l.el)}i&&s.append(nh(n,t)),jn(e)&&s.append(oh(n,t)),n.append(s)}i&&n.prepend(ah(n,t)),o&&Ys(n,e);for(let s of e.controls)n.append(Lt(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let l=document.createElement("summary");l.textContent=e.moreLabel??"More",s.append(l);for(let u of e.more)s.append(Lt(u,t));n.append(s)}return n.append(pe()),Xs(n,e),n}var th=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Hs(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&th(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function nh(e,t){let n=Us();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),Hs(e))}),n}function Us(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Vs(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function ah(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ws(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Hs(e)}}),n}var Ct=new Set;function Tn(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var jn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),ih="(max-width: 768px)";function rh(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function oh(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(rh()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Gs(e,a,!Ct.has(a.id)),n.focus())}),n}function Gs(e,t,n){n?Ct.add(t.id):Ct.delete(t.id),Ci(e,t)}function sh(e,t){t?.type==="fx"&&Ct.has(t.id)&&Gs(e,t,!1)}function lh(e){return e.ownerDocument.defaultView?.matchMedia?.(ih).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ci(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=jn(t)&&Ct.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!jn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Tn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Tt(s)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",st(n,t.maxHelp)),!a){e.dataset.ncMax&&Ur(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Ct.has(t.id)&&Ci(e,t);queueMicrotask(()=>{e.isConnected?s():Tn(e.ownerDocument,s)});return}let i=lh(e),o=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Ur(e),e.dataset.ncMax=i,i==="over"&&ch(e,t)),dh(e.ownerDocument),i==="over"&&Ni(e),Tn(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Tt(s)})}function Ur(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Tn(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Tt(n)})}function ch(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Ni(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,o=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,s=Wu(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var Vr=new WeakSet;function dh(e){Vr.has(e)||(Vr.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Ni(t)}))}var ti=new WeakMap;function Ws(e,t){let n=cp(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ys(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)st(i,t.meterHelp);let a=ti.get(e);a?a.set(t.meter):ti.set(e,hp(n,t.meter))}function Xs(e,t){(t.meter||ti.has(e))&&Ys(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Vs(o,i,t.title),st(o,t.foldHelp)),Ci(e,t);let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let l=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${l?`, ${l.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let u=s.querySelector("[data-nc-fx-fold-state]");u&&(u.textContent=l,u.hidden=l==="");let c=s.querySelector("[data-nc-fx-fold-name]");c&&(c.textContent=t.title),st(s,t.foldHelp)}}function st(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function kt(e){return e.replace(/["\\]/g,"\\$&")}function uh(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&us(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Tt(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Ni(n);Sp(e)}var ph=Ye["toast-duration"];function hh({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function mh(e,t,n,a){let i=l=>({top:l,bottom:l+n}),o=l=>e.some(u=>u&&u.bottom>l.top&&u.top<l.bottom),s=i(t-a-n);return o(s)?o(i(a))?"bottom":"top":"bottom"}function fh(e,t,n,a,i,o){let s=e.bottom+i,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let u=!0,c=0;u&&c<8;c++){u=!1;for(let d of t)d&&d.bottom>s&&d.top<s+n.height&&d.right>l&&d.left<l+n.width&&(s=d.bottom+i,u=!0)}return{top:s,left:l}}var Gr="data-nc-ui-toast-live";function gh(e,t){let n=t.querySelector(`[${Gr}]`);return n||(n=e.createElement("div"),n.setAttribute(Gr,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function bh({message:e,actionLabel:t,onAction:n,duration:a=ph,onClose:i,avoid:o=[],anchor:s,host:l,document:u=globalThis.document}={}){l=l??u.body;let c=u.defaultView??globalThis,d=u.createElement("div");d.className="nc-ui-toast",d.setAttribute("data-state","enter");let p=u.createElement("span");p.className="nc-ui-toast-message",p.textContent=e,d.appendChild(p);let h=null;t&&(h=u.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,d.appendChild(h)),l.appendChild(d);let f="open",g=J=>J&&typeof J.getBoundingClientRect=="function"?J.getBoundingClientRect():null,y=g(d),m=y?.height||44,b=c.getComputedStyle?.(d),v=Number.parseFloat(b?.getPropertyValue(Q("toast-offset")))||16,$=Number.parseFloat(b?.getPropertyValue(Q("toast-anchor-gap")))||8,S=g(s),z=c.innerHeight??0,w=o.map(g).filter(Boolean),x=S&&S.bottom>0&&S.top<z?fh(S,w,{width:y?.width||0,height:m},c.innerWidth??0,$,v):null;x&&x.top+m<=z?(d.setAttribute("data-placement","anchor"),d.style.top=`${x.top+(c.scrollY??0)}px`,d.style.left=`${x.left+(c.scrollX??0)}px`):d.setAttribute("data-placement",mh(w,z,m,v));let E=c.requestAnimationFrame?.bind(c)??(J=>setTimeout(J,16));E(()=>E(()=>{f==="open"&&d.setAttribute("data-state","open")})),gh(u,l).textContent=hh({message:e,actionLabel:t});let A,L,C=new Promise(J=>{L=J}),H=J=>{clearTimeout(A),A=setTimeout(()=>ye("timeout"),J)},B=a,G=Date.now(),ke=()=>{f==="open"&&(clearTimeout(A),B=Math.max(0,B-(Date.now()-G)))},be=()=>{f==="open"&&(G=Date.now(),H(B))};d.addEventListener("pointerenter",ke),d.addEventListener("pointerleave",be),d.addEventListener("focusin",ke),d.addEventListener("focusout",be),h?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{ye("action")}}),Number.isFinite(a)&&H(a);function ye(J="close"){if(f!=="open")return;f="closing",clearTimeout(A),d.setAttribute("data-state","closing"),i?.(J);let O=c.getComputedStyle?.(d),se=O?Math.max(0,...String(O.transitionDuration||"").split(",").map(ne=>Number.parseFloat(ne)*(ne.trim().endsWith("ms")?1:1e3)||0)):0,q=()=>{f!=="gone"&&(f="gone",d.remove(),L(J))};d.addEventListener("transitionend",q),setTimeout(q,se+50)}return{el:d,close:ye,closed:C}}var Wr="data-nc-help";function yh(e,t,n,a=0,i=6,o=8){let s=e.top-i-t.height,l=s>=a+o?"above":"below",u=l==="above"?s:e.bottom+i,c=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(u),left:Math.round(c),side:l}}var Ea=new WeakMap;function vh(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function wh({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Ea.get(e);if(n)return n;let a=e.defaultView,i=null,o=null,s,l=()=>{clearTimeout(s),o=null,i&&(i.hidden=!0)},u=h=>{let f=h.getAttribute(Wr);if(!f)return;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=f,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let g=h.getBoundingClientRect(),y=yh(g,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,vh(e));i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility=""},c=h=>{if(h.pointerType==="touch")return;let f=h.target&&h.target.closest?h.target.closest(`[${Wr}]`):null;f!==o&&(l(),f&&(o=f,s=setTimeout(()=>{o===f&&f.isConnected&&u(f)},t)))},d=h=>{h.key==="Escape"&&l()};e.addEventListener("pointerover",c),e.addEventListener("pointerdown",l,!0),e.addEventListener("keydown",d),a.addEventListener("scroll",l,!0),a.addEventListener("blur",l);let p={hide:l,uninstall(){l(),e.removeEventListener("pointerover",c),e.removeEventListener("pointerdown",l,!0),e.removeEventListener("keydown",d),a.removeEventListener("scroll",l,!0),a.removeEventListener("blur",l),i?.remove(),i=null,Ea.delete(e)}};return Ea.set(e,p),p}var Ks="(max-width: 768px)",xh='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',$h='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',kh=0;function Eh({panel:e,button:t,label:n="Menu",media:a=Ks}){let i=e.ownerDocument,o=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++kh}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=xh),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function u(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",d,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll($h)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function c({focus:m}={}){if(!l())return;let b=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",d,!0),i.removeEventListener("pointerdown",p,!0),(m??b)&&s.focus?.({preventScroll:!0})}function d(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),c({focus:!0}))}function p(m){let b=m.target;b instanceof o.Node&&(e.contains(b)||s.contains(b))||c({focus:!1})}let h=()=>l()?c({focus:!0}):u(),f=m=>{let b=m.target,v=b instanceof o.Element?b.closest("button"):null;!v||!e.contains(v)||v.closest("[data-nc-menu-stay]")||c({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",f);let g=o.matchMedia?.(a),y=()=>{g?.matches||c({focus:!1})};return g?.addEventListener?.("change",y),{button:s,panel:e,open:u,close:c,isOpen:l,destroy(){c({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",f),g?.removeEventListener?.("change",y)}}}var Fi="netcomposer.rhythm.hidden.v1",ze=new WeakMap;function Aa(){try{return globalThis.localStorage??null}catch{return null}}function Qs(e,t=Fi){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function Yr(e,t,n,a=Fi){let i=Qs(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function zi(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let o of i.controls)a(o)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),i.pan&&n.push(Li(i)));return n}function Js(e,t){if(!(!e||!t))return zi(e).find(n=>n.id===t)}function Ah(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${zi(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Sh(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Zs(e,t)}function Zs(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Mh(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ze.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Js(n,a)}function Th(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=Ah(t);if(e.dataset.ncSignature===i){for(let o of a){let s=e.querySelector(`[data-nc-section="${Kr(o.id)}"]`);s&&Zs(s,o);for(let l of o.controls){let u=e.querySelector(`[data-nc-id="${Kr(l.id)}"]`);u instanceof Element&&Se(u,l)}s instanceof HTMLElement&&ni(s,o,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=o.id,o.inset&&(s.dataset.ncInset="true"),o.area&&(s.dataset.ncArea=o.area),o.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",o.label)),o.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),o.title&&s.setAttribute("aria-label",o.title)),Sh(s,o);let l=o.panel?document.createElement("div"):s;o.panel&&(l.className="nc-panel-body",s.append(l));for(let u of o.controls)l.append(Lt(u,Mh));e.append(s),ni(s,o,n)}}function el(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Lh="(max-width: 768px)",tl=new WeakMap;function Xr(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Ch(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=Xr("prev"),o=Xr("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,s,o,l);let u=(c,d)=>{let p=tl.get(e);if(!p||d.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=el(h,p.pageSize,(t.pages.get(p.id)??0)+c);t.pages.set(p.id,f),p.onPage?.(f),ni(e,{...p,page:f},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===i?o:i).focus(),t.redraw()};return i.addEventListener("click",()=>u(-1,i)),o.addEventListener("click",()=>u(1,o)),e.prepend(a),a}function ni(e,t,n){tl.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:o,page:s}=el(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),o<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of a)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Lh).matches===!0,u=e.closest(".nc-module");a.forEach((m,b)=>{let v=Math.floor(b/i)!==s;if(v?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,v&&!l){let $=u instanceof HTMLElement?ze.get(u):void 0;sh(m,Js($,m.dataset.ncId))}});let c=Ch(e,n),d=c.querySelector('[data-nc-fx-page="prev"]'),p=c.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",s===0?"true":"false"),p.setAttribute("aria-disabled",s===o-1?"true":"false");let h=c.querySelector("[data-nc-fx-page-count]"),f=`${s+1} / ${o}`;h.textContent!==f&&(h.textContent=f);let g=c.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${s+1} of ${o}`;g.textContent!==y&&(g.textContent=y)}function Kr(e){return e.replace(/["\\]/g,"\\$&")}function Nh(e,t=Fi){ts();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Qs(Aa(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let u=document.createElement("span");u.className="nc-index",u.dataset.ncIndex="";let c=is({labelledBy:o.id,onChange:v=>(ze.get(n)??e).onToggle?.(v)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,u);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",i.append(o,d,s);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",h.append(f);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,i,p,h),n.setAttribute("aria-labelledby",o.id);let y=v=>{let $=ze.get(n)??e;n.dataset.ncOpen=v?"false":"true",p.hidden=v,h.hidden=!v,l.textContent=v?"+":"−",l.setAttribute("aria-expanded",v?"false":"true"),l.setAttribute("aria-controls",p.id),l.setAttribute("aria-label",`${v?"Show":"Hide"} ${$.title}`),l.title=v?"Show":"Hide",v?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let v=n.dataset.ncOpen==="true";Yr(Aa(),(ze.get(n)??e).id,v,t),y(v),ai(n.parentElement)}),h.addEventListener("click",()=>{Yr(Aa(),(ze.get(n)??e).id,!1,t),y(!1),ai(n.parentElement)});let m={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(v){ze.set(n,v),v.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=v.title,d.textContent=v.status??"",v.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),f.textContent=v.summary??v.title,c.el.hidden=v.on===void 0,c.set(v.on===!0),v.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,h.setAttribute("aria-label",`Show ${v.title}`),Th(p,v,m),y(p.hidden),b.redraw()},redraw(){let v=ze.get(n);v&&uh(n,zi(v))}};return ze.set(n,e),y(a),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Qo(()=>b.redraw(),n.ownerDocument),b}function Fh(e,t,n="adjacent"){ts(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,o)=>{let s=o%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),ai(e)}function ai(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?r("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const nl="netcomposer.studio.instances.v1",Qr="netcomposer.studio.types-seen.v1",zh=["petra-rhythm","olive-bass"];function al(e,t){return t===1?e:`${e}#${t}`}function Pi(e){const t=/^([a-z0-9][a-z0-9-]{0,47})(?:#([1-9][0-9]{0,2}))?$/.exec(e);if(!t?.[1])return null;const n=t[2]?Number(t[2]):1;return n===1&&t[2]?null:{type:t[1],n}}function Ph(e,t){return t===1?e.name:`${e.name} ${t}`}function Pt(e,t,n){const a=Ph(e,t),i=rl(n,a);return{id:al(e.id,t),type:e.id,n:t,name:i,src:e.src,...i!==a?{custom:!0}:{}}}const il=20;function rl(e,t){return typeof e!="string"?t:[...e.replace(/\s+/g," ").trim()].slice(0,il).join("").trim()||t}function Dh(e,t,n,a){return e.map(i=>{if(i.id!==t)return i;const o=a.find(s=>s.id===i.type);return o?Pt(o,i.n,n):i})}function Rh(e,t){const n=new URLSearchParams({instance:String(e.n)});return t&&n.set("measure",""),`${e.src}?${n.toString().replace(/=(&|$)/g,"$1")}`}function Ih(e,t){const n=new Set(e.filter(i=>i.type===t.id).map(i=>i.n));let a=1;for(;n.has(a);)a++;return Pt(t,a)}function an(e){return e.filter(t=>t.available!==!1).map(t=>Pt(t,1))}function qh(e,t){if(!Array.isArray(e))return an(t);const n=[];for(const a of e){const i=a&&typeof a=="object"?a:null,o=typeof a=="string"?a:i?.id;if(typeof o!="string")continue;const s=Pi(o),l=s&&t.find(u=>u.id===s.type&&u.available!==!1);!s||!l||n.some(u=>u.id===o)||n.push(Pt(l,s.n,i?.name))}return n.length>0||e.length===0?n:an(t)}function Di(){try{return globalThis.localStorage??null}catch{return null}}function Oh(e,t=Di()){try{const n=t?.getItem(nl);return n?qh(JSON.parse(n),e):an(e)}catch{return an(e)}}function Bh(e,t,n=Di()){let a=zh;try{const s=JSON.parse(n?.getItem(Qr)??"null");Array.isArray(s)&&(a=s.filter(l=>typeof l=="string"))}catch{}const i=t.filter(s=>!a.includes(s.id)&&s.available!==!1);if(i.length===0)return[...e];const o=[...e];for(const s of i)o.some(l=>l.type===s.id)||o.push(Pt(s,1));try{n?.setItem(Qr,JSON.stringify([...new Set([...a,...i.map(s=>s.id)])]))}catch{}return o.length!==e.length&&Dt(o,n),o}function _h(e){return e.map(t=>t.custom?{id:t.id,name:t.name}:t.id)}function Dt(e,t=Di()){try{t?.setItem(nl,JSON.stringify(_h(e)))}catch{}}function jh(e,t){const n=new Map;return(a,i)=>{const o=Pi(a),s=o?.type??a,l=i?.instance!==void 0?Number(i.instance):a.includes("#")?o?.n:void 0,u=e().filter(d=>d.instance.type===s);let c;if(l!==void 0&&Number.isInteger(l)&&l>=1)c=u.find(d=>d.instance.n===l);else{const d=u.filter(p=>{const h=p.window();return h!=null&&h!==n.get(p.instance.id)});c=d.find(p=>p.readyState?.()!=="complete")??d[0]??u[0]}if(!c){if(t.some(p=>p.id===s))return null;const d=l!==void 0?al(s,l):a;return{id:d,name:d}}return n.set(c.instance.id,c.window()),{id:c.instance.id,name:c.instance.name}}}const Sa="netcomposer.studio.pending-presets.v1",Hh=3e3,Uh=6e4;function Jr(e){return!!e&&typeof e=="object"&&typeof e.format=="string"&&"data"in e}function Vh(e,t){return new Promise(n=>{const a=setTimeout(()=>n(void 0),t);e.then(i=>{clearTimeout(a),n(i)},()=>{clearTimeout(a),n(void 0)})})}function Gh(e){const t=new Map,n=[],a=()=>{try{const s=JSON.parse(e()?.getItem(Sa)??"{}"),l={};if(s&&typeof s=="object")for(const[u,c]of Object.entries(s))Jr(c)&&(l[u]=c);return l}catch{return{}}},i=s=>{try{const l=e();if(!l)return;Object.keys(s).length?l.setItem(Sa,JSON.stringify(s)):l.removeItem(Sa)}catch{}},o=async(s,l)=>{const u=a(),c=u[s];if(!c)return;delete u[s],i(u);let d=c.format===l.format;if(d)try{await l.set(c.data)}catch{d=!1}for(const p of n)p(s,d)};return{provide(s,l){!l||typeof l.get!="function"||typeof l.set!="function"||(t.set(s,l),o(s,l))},provided:()=>[...t.keys()],async collect(s,l=Hh){const u={};return await Promise.all(s.map(async c=>{const d=t.get(c);if(!d)return;const p=await Vh(Promise.resolve().then(()=>d.get()),l);p!=null&&(u[c]={format:d.format,...d.version!==void 0?{v:d.version}:{},data:p})})),u},stash(s){const l={};for(const[u,c]of Object.entries(s))Jr(c)&&(l[u]=c);i(l)},onApplied(s){n.push(s)},pending:()=>Object.keys(a()),dropPending(){const s=Object.keys(a());return i({}),s}}}function Wh(e,t){return`${e}@studio/${t}`}const Yh=1,ge=[{id:"petra-rhythm",name:"Rhythm",src:"/rhythm/",brand:"PETRA",identity:"instrument-petra"},{id:"olive-bass",name:"Bass",src:"/bass/",brand:"OLIVE",identity:"instrument-olive"},{id:"astrid-synth",name:"Synth",src:"/synth/",brand:"ASTRID",identity:"instrument-astrid"},{id:"lucy",name:"Audio",src:"/lucy/",brand:"LUCY",identity:"instrument-lucy"},{id:"nyx",name:"Sampler",src:"/nyx/",brand:"NYX",identity:"instrument-nyx"}],Ri=[...ge];function Xh(e,t,n={}){const a=n.instruments??ge;return{version:Yh,...n.syncScope?{syncScope:n.syncScope}:{},...n.fxWorklet?{fxWorklet:n.fxWorklet}:{},...n.grab?{grab:n.grab}:{},...n.play?{play:n.play}:{},...n.countIn?{countIn:n.countIn}:{},attach(i,o){if(typeof i!="string"||i.length===0||i.length>64)return null;const s=n.resolve?n.resolve(i,o):{id:i,name:a.find(p=>p.id===i)?.name??i};if(!s)return null;const l=t.attach(s.id,s.name),u=s.id,c=n.presets,d=n.share?.host(u);return{ctx:e,output:l,...n.mapper===void 0?{}:{mapper:n.mapper},instance:u,storageKey:p=>Wh(p,u),...n.holdFirstPlay?{holdFirstPlay:n.holdFirstPlay}:{},...c?{providePreset:p=>c.provide(u,p)}:{},...d?{audioReceivers:d.audioReceivers,sendAudio:d.sendAudio,onAudio:d.onAudio,reveal:d.reveal}:{}}}}}const Zr=16,Kh=30;function Qh(e){if(!e||typeof e!="object")return null;const t=e,n=Array.isArray(t.beats)?t.beats.slice(0,Zr+1):[],a=t.until;if(n.length<1||n.length>Zr||!n.every(l=>typeof l=="number"&&Number.isFinite(l))||n.some((l,u)=>u>0&&l<=n[u-1]))return null;const i=n[0],o=n[n.length-1];if(typeof a!="number"||!Number.isFinite(a)||a<=o||a-i>Kh)return null;const s=Array.isArray(t.accents)?t.accents:[];return{beats:[...n],accents:n.map((l,u)=>s[u]===!0),until:a}}function Jh(e,t){if(t>=e.until)return null;let n=-1;for(;n+1<e.beats.length&&e.beats[n+1]<=t;)n++;return{n:e.beats.length-Math.max(0,n),accent:n>=0&&e.accents?.[n]===!0}}function Zh(e,t){return t===null?e:`${t} · ${e}`}function em(e){let t=0;for(const n of e)Number.isFinite(n)&&n>t&&(t=n);return Math.round(t)}function tm(e){const t=e.doc??document,n=t.createElement("div");n.className="count-in",n.hidden=!0,n.setAttribute("role","status");const a=t.createElement("span");a.className="count-in-who";const i=t.createElement("span");i.className="count-in-n",n.append(a,i);const o=t.title,s=new Map;let l=!1;const u=()=>{const d=e.now();for(const[$,S]of s)d>=S.until&&s.delete($);const[p,h]=[...s][0]??[],f=h?Jh(h,d):null;if(!p||!f){n.hidden=!0,delete n.dataset.accent,t.title=o,l=!1;return}n.hidden=!1;const g=e.clearOf?.()??[],y=`${em(g.map($=>$.getBoundingClientRect().bottom))}px`;n.style.getPropertyValue("--count-in-top")!==y&&n.style.setProperty("--count-in-top",y);const m=e.labelOf(p);a.textContent!==m&&(a.textContent=m);const b=String(f.n);i.textContent!==b&&(i.textContent=b),n.toggleAttribute("data-accent",f.accent),n.setAttribute("aria-label",`${m} count-in ${b}`);const v=Zh(o,f.n);t.title!==v&&(t.title=v),requestAnimationFrame(u)},c=()=>{l||(l=!0,requestAnimationFrame(u))};return{el:n,api:{show(d,p){if(typeof d!="string"||!d)return;const h=Qh(p);h&&(s.set(d,h),c())},clear(d){s.delete(d)&&c()}}}}const nm=1e4;function am(e=nm,t=globalThis){const n=new Set;let a=[];const i=()=>{if(n.size>0)return;const o=a;a=[];for(const s of o)s()};return{hold(){const o={};n.add(o);const s=t.setTimeout(()=>l(),e),l=()=>{n.delete(o)&&(t.clearTimeout(s),i())};return l},get count(){return n.size},idle(){return n.size===0?Promise.resolve():new Promise(o=>a.push(o))}}}const ol="netcomposer.studio.fx-fold.v1",Ma={a:!1,b:!1,insert:!1};function Ii(e){try{const t=e?.getItem(ol);if(!t)return Ma;const n=JSON.parse(t);if(!n||typeof n!="object")return Ma;const a=n;return{a:a.a===!0,b:a.b===!0,insert:a.insert===!0}}catch{return Ma}}function sl(e,t,n){const a={...Ii(e),[t]:n};try{e?.setItem(ol,JSON.stringify(a))}catch{}return a}const ll="netcomposer.studio.insert-fold.v1";function cl(e){try{const t=e?.getItem(ll),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function dl(e,t,n){const a=[...cl(e)].filter(o=>o!==t);n&&a.push(t);const i=a.slice(-256);try{e?.setItem(ll,JSON.stringify(i))}catch{}return new Set(i)}function im(e,t){return Ii(e).insert?(sl(e,"insert",!1),dl(e,t,!0)):cl(e)}function me(){try{return globalThis.localStorage??null}catch{return null}}const rm={a:{plate:{size:55,decay:55,damping:20}},b:{delay:{delay_beats:.75,feedback:35,tone:60}},insert:{drive:{drive_db:6}}};function ul(e,t){const n=t.fx[e],a=zn(n);for(const i of a.chain){const o=rm[e][i.type];n===void 0&&o&&Object.assign(i.dials,o),e==="a"?(i.bypass=i.type!=="plate",i.type==="plate"&&(i.dials.mix=100)):e==="b"?(i.bypass=i.type!=="delay",i.type==="delay"&&(i.dials.mix=100,i.dials.mode=0,i.dials.send=100)):i.bypass=i.type!=="drive"||!t.insert.on}return a}const pl="drive-1",ii=3;function om(e,t){if(e.masterFx!==null&&e.masterFx!==void 0)return rt(e.masterFx,t);const n=e.insert.on?ul("insert",e).chain.find(a=>a.type==="drive"):void 0;return rt({v:2,chain:n?[{id:pl,type:"drive",bypass:!1,dials:{...n.dials}}]:[]},t)}function sm(e){return e.chain.some(t=>t.type==="drive"&&!t.bypass)}const lm={"no-source":"that source isn't there",empty:"the range is empty",gone:"that range is older than the 20 seconds kept","not-kept":"that source wasn't being kept yet when the range played",timeout:"no answer from the audio (is it running?)"};function cm(e,t,n,a=2e3){return(Number.isFinite(e-t)?Math.max(0,e-t):0)/n*1e3+a}const kn=e=>({channels:null,reason:e,message:lm[e]});function dm(e,t){const n=new Map,a=new Map;let i=1;const o=l=>{const u=t.nodeFor(l);if(!u)return null;const c=n.get(l);if(c&&c.source===u)return c.node;c?.node.disconnect();const d=new AudioWorkletNode(e,"nc-studio-grab",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});return d.port.onmessage=p=>{const h=p.data;h.type!=="took"&&h.type!=="recorded"||(a.get(h.id)?.(h.channels,h.reason),a.delete(h.id))},u.connect(d),n.set(l,{node:d,source:u}),d},s=async(l,u,c)=>{await t.ready;const d=o(l);if(!d)return kn("no-source");if(!(c>u))return kn("empty");const p=i++;return new Promise(h=>{a.set(p,(f,g)=>h(f?{channels:f}:kn(g??"gone"))),d.port.postMessage({type:"take",id:p,from:u,to:c}),setTimeout(()=>{a.delete(p)&&h(kn("timeout"))},cm(c,e.currentTime*e.sampleRate,e.sampleRate))})};return{record(l,u){if(!t.nodeFor(l))return null;const c=n.get(l)?.node??null,d=i++;let p=c;const h=g=>p?.port.postMessage(g);p?h({type:"record",id:d,from:u}):t.ready.then(()=>{p=o(l),h({type:"record",id:d,from:u})});let f=!1;return{stop(g){return f?Promise.resolve(null):(f=!0,new Promise(y=>{a.set(d,y),h({type:"record-end",id:d,to:g}),setTimeout(()=>{a.delete(d)&&y(null)},Math.max(0,(g-e.currentTime*e.sampleRate)/e.sampleRate)*1e3+5e3)}))},cancel(){f=!0,h({type:"record-cancel",id:d})}}},sources:()=>t.sources(),latency(l){if(typeof l!="string")return 0;const u=t.latencyFor?.(l)??0;return Number.isFinite(u)&&u>0?Math.round(u):0},listen(l){return t.nodeFor(l)?(t.ready.then(()=>o(l)),!0):!1},take:(l,u,c)=>s(l,u,c).then(d=>d.channels),takeResult:s}}function um(e){const t=()=>{};return new Proxy(e,{get(n,a,i){if(a==="stop")return t;const o=Reflect.get(n,a,i);return typeof o=="function"?o.bind(n):o}})}const Y={"transport:rec":"Records the Master to a WAV file. If nothing is sounding, Rec arms and waits: it starts on the first sound or on bar 1. Press again to cancel or stop.","mix:sends":"The two send effects every channel feeds with its A and B knobs. Shown while no Inserts button is lit.","inserts:channel":"Shows this channel's own effects, applied before its fader and sends. Press again to go back to Reverb and Delay.","inserts:master":"Shows the master's own effects on the whole mix: none until you add one, up to three (EQ, compressor, drive and so on). Press again to go back to Reverb and Delay.","fx:fold":"Folds this effect sideways into a narrow column so the Mix takes less room. It keeps sounding as set; a click on the column (or its ▶) opens it again.","fx:meter":"The level going into this effect (left bar) and coming out of it (right bar), from −48 dB up to full scale; orange near clipping. It keeps showing the input, greyed, while the effect is off.","fx:meter-return":"The level the sends feed into this effect (left bar) and its return (right bar), from −48 dB up to full scale; orange near clipping. Silent while the return is off.","fx:max":"Widens this card to three cards so its graph is easy to see; the dials sit under it. Click again, or press Escape, to put it back.","eq:graph":"The EQ's curve over the sound coming out right now: boosts rise above the middle line, cuts fall below it. Click it to open it wide, then drag a dot to shape it.","eq:low":"The lows, below 150 Hz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","eq:mid":"The middle band: drag up or down to boost or cut, sideways to move it, and scroll over it for narrower or wider. Double-click resets it.","eq:high":"The highs, above 6 kHz: drag up to boost, down to cut (arrow keys too). Double-click resets it.","strip:fold":"Minimizes this channel sideways to a narrow column so more fit. It keeps playing at the same level; M and S still work, and ▶ expands it again.","strip:folded":"A minimized channel: its name, mute, solo and level meter. Click the name or ▶ to expand it. Drag the name to move it.","strip:pan":"Balance: moves this channel left or right in the stereo mix by turning the other side down (its sends follow). Drag or use the arrow keys; double-click to centre it.","strip:name":"This channel's instrument. Click to show it below, drag to move the channel, double-click to rename it.","strip:rename":"Type a new name (up to 20 characters) and press Enter; Escape cancels. Leave it empty to go back to the default name.","sends:toggle":"Hides or shows the send effects: the A · Reverb and B · Delay cards and every channel's A and B knobs. Only the view changes: the sends keep sounding as set. Inserts still opens a stack.","vu:add":"Adds analog VU meters for the finished mix beside the master: left on top, right below. 0 VU is −18 dBFS RMS.","vu:module":"The master's left (top) and right (bottom) as classic VU meters, which show average loudness. 0 VU is −18 dBFS RMS; the red is louder than that.","vu:remove":"Hides the VU meters. + Meters in the Mix header brings them back.","vu:fold":"Folds the meters to a narrow column with two thin level bars, L and R. The triangle opens them again."},hl={threshold:-3,knee:0,ratio:20,attack:.001,release:.1};function pm(e){return Math.floor(.006*e)}const ri=1024,eo=ri+8192,hm=.25;function mm(e,t){let n=0;for(let a=t;a<e.length;a++)n=Math.max(n,Math.abs(e[a]??0));if(!(n>1e-6))return null;for(let a=t;a<e.length;a++)if(Math.abs(e[a]??0)>=n/2)return a-t;return null}async function fm(e,t,n=OfflineAudioContext){const a=new n(1,eo,e),i=a.createBuffer(1,eo,e);i.getChannelData(0)[ri]=hm;const o=new AudioBufferSourceNode(a,{buffer:i}),s=t(a);o.connect(s.input),s.output.connect(a.destination),o.start(0);const l=await a.startRendering();return mm(l.getChannelData(0),ri)}function gm(e,t=()=>fm(e,n=>{const a=new DynamicsCompressorNode(n,hl);return{input:a,output:a}})){let n=pm(e);const a=(async()=>{try{const i=await t();i!==null&&i>=0&&i<e/10&&(n=i)}catch{}})();return{get:()=>n,ready:a}}const qe=-54,dn=6,Me=-qe/(dn-qe),bm=-9,oi=(bm-qe)/(dn-qe);function ml(e){const t=Math.min(1,Math.max(0,e));return t===0?Number.NEGATIVE_INFINITY:qe+t*(dn-qe)}function ym(e){return e===Number.NEGATIVE_INFINITY?0:10**(e/20)}function vm(e){return e<=0?Number.NEGATIVE_INFINITY:20*Math.log10(e)}function tt(e){return ym(ml(e))}function wm(e){if(e===Number.NEGATIVE_INFINITY||e<-99)return"−∞";const t=e.toFixed(1);return t.startsWith("-")?`−${t.slice(1)}`:e>.05?`+${t}`:t}function xm(e){const t=e.some(n=>n.solo);return e.map(n=>n.mute||t&&!n.solo?0:tt(n.position))}function qi(e){return e===Number.NEGATIVE_INFINITY||Number.isNaN(e)?0:Math.min(1,Math.max(0,(e-qe)/(dn-qe)))}function to(e){return qi(vm(e))}const no=[0,-6,-12,-24,-48].map(e=>({value:qi(e),label:e===0?"0":`−${-e}`})),$m=1;function km(e){let t=0,n=0;for(const a of e){const i=Math.abs(a);i>t&&(t=i),n+=a*a}return{peak:t,rms:e.length>0?Math.sqrt(n/e.length):0}}function ao(e){const t=e.trim().toLowerCase().replace(/\u2212/g,"-").replace(/\s*db$/,"").trim();if(t==="")return null;if(t==="off"||t==="-inf"||t==="-∞"||t==="−∞")return 0;if(!/^[+-]?(\d+([.,]\d*)?|[.,]\d+)$/.test(t))return null;const n=Number(t.replace(",","."));return Number.isFinite(n)?n<qe?0:qi(Math.min(dn,n)):null}function Em(e){const t=Math.min(1,Math.max(-1,Number.isFinite(e)?e:0)),n=Math.cos(Math.abs(t)*Math.PI/2);return t>0?[n,1]:t<0?[1,n]:[1,1]}const fl="netcomposer.studio.mix.v1",gl={position:oi,mute:!1,solo:!1,sendA:0,sendB:0,pan:0};function rn(){return{v:1,channels:{},master:Me,returns:{a:{on:!0,level:Me},b:{on:!0,level:Me}},insert:{on:!1},fx:{},channelFx:{},masterFx:null}}const Jt=(e,t)=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(0,e)):t,Am=e=>typeof e=="number"&&Number.isFinite(e)?Math.min(1,Math.max(-1,e)):0,Hn=(e,t)=>typeof e=="boolean"?e:t,Ge=e=>e&&typeof e=="object"&&!Array.isArray(e)?e:{};function Sm(e){const t=Ge(e);return{position:Jt(t.position,gl.position),mute:Hn(t.mute,!1),solo:Hn(t.solo,!1),sendA:Math.min(Me,Jt(t.sendA,0)),sendB:Math.min(Me,Jt(t.sendB,0)),pan:Am(t.pan)}}function bl(e){const t=rn(),n=Ge(e);if(n.v!==1)return t;const a={};for(const[c,d]of Object.entries(Ge(n.channels)))c.length>0&&c.length<=64&&(a[c]=Sm(d));const i=Ge(n.returns),o=(c,d)=>{const p=Ge(c);return{on:Hn(p.on,d.on),level:Jt(p.level,d.level)}},s={},l=Ge(n.fx);for(const c of["a","b","insert"])l[c]!==void 0&&(s[c]=l[c]);const u={};for(const[c,d]of Object.entries(Ge(n.channelFx)))c.length>0&&c.length<=64&&d&&typeof d=="object"&&(u[c]=d);return{v:1,channels:a,master:Jt(n.master,t.master),returns:{a:o(i.a,t.returns.a),b:o(i.b,t.returns.b)},insert:{on:Hn(Ge(n.insert).on,t.insert.on)},fx:s,channelFx:u,masterFx:n.masterFx&&typeof n.masterFx=="object"?n.masterFx:null}}function yl(){try{return globalThis.localStorage??null}catch{return null}}function Mm(e=yl()){try{const t=e?.getItem(fl);return t?bl(JSON.parse(t)):rn()}catch{return rn()}}function vl(e,t=yl()){try{return t?.setItem(fl,JSON.stringify(e)),t!==null}catch{return!1}}const ia=3;function Tm(e,t=ia){return Math.max(1,Math.ceil(e/t))}function io(e,t=ia){return Math.max(0,Math.floor(e/t))}function Lm(e,t,n,a=null,i=ia){const o=Tm(n.length,i)-1;if(!e||e.key!==t)return 0;const s=a===null?-1:n.indexOf(a);if(s>=0)return io(s,i);const l=new Set(e.ids);let u=-1;return n.forEach((c,d)=>{l.has(c)||(u=d)}),u>=0?io(u,i):Math.min(o,Math.max(0,e.page))}const ro="plugin-url",Ta="listed:",Cm="../plugins/registry.json",W={urlTitle:"Load a plugin from a URL",urlBody:"Paste the address of the plugin's plugin.json.",urlField:"Address",urlPlaceholder:"https://…/plugin.json",urlNext:"Next",warnTitle:"Run this plugin?",warnBody:e=>`This runs code from ${e} in your browser. Only load plugins from people you trust. Listed plugins are checked; this one is not.`,warnLoad:"Load and run",badUrl:"That isn't a plugin address. Use https://, or http://localhost while you build one.",badUrlShort:"Not a plugin address.",failedShort:"Couldn't load it.",missing:"Missing: not loaded.",missingNoUrl:"Missing: no address saved.",through:"Sound passes through.",kept:"Its dials are kept.",from:e=>`From ${e}`,load:"Load",loadAsk:"Load…",loading:"Loading…",retry:"Remove, add to retry."};function Nm(e){const t={1:"Stopped: failed to start.",2:"Stopped: it crashed.",3:"Stopped: bad numbers.",4:"Stopped: a dial crashed it.",5:"Stopped: code not loaded."};for(const[n,a]of Object.entries(Ia))if(a===e)return t[Number(n)];return"Stopped."}function _t(e){try{return new URL(e).host||e}catch{return e}}function Fm(e,t){let n;try{n=new URL(e.trim(),t)}catch{return null}return n.protocol==="https:"||n.protocol==="http:"&&/^(localhost|127\.0\.0\.1|\[::1\])$/.test(n.hostname)?n.href:null}function zm(e){const t=new URL(Cm,e.base).href;let n=[];const a=new Set,i=new Map,o=[],s=new Set,l=()=>{for(const h of s)h()},u=h=>String(h?.message??h).replace(/^nc-fx plugins?: /,""),c=ud(t,{fetch:e.fetch}).then(h=>{n=h.registry.plugins;for(const g of h.errors)console.warn(`Studio plugins: registry ${g}`);l();const f=o.splice(0);f.length&&p.restore(f)}).catch(h=>{console.info(`Studio plugins: no listed plugins (${u(h)})`)}),d=async(h,f)=>{a.add(h),i.delete(h),l();try{const{entry:g}=await f();return g.type}catch(g){throw i.set(h,u(g)),g}finally{a.delete(h),l()}},p={listed:()=>n,loaded:()=>_c().filter(h=>!h.plugin.listed),listingFor(h){const f=n.find(y=>y.id===h.id);if(!f)return null;const g=new URL(f.manifest,t).href;return!h.url||h.url===g?f:null},loading:h=>a.has(h),async loadListed(h){const f=re(`plugin:${h}`);if(f)return f.type;await c;const g=n.find(y=>y.id===h);if(!g)throw new Error(`${h} isn't listed`);return d(h,()=>pd(e.ctx,g,t,{moduleUrl:e.moduleUrl,fetch:e.fetch}))},loadUrl(h){return d("url",()=>qo(e.ctx,h,{moduleUrl:e.moduleUrl,fetch:e.fetch,base:e.base}))},restore(h){for(const f of h)if(!(f.status!=="missing"||a.has(f.id)||re(`plugin:${f.id}`))){if(!n.length){o.some(g=>g.id===f.id)||o.push(f);continue}p.listingFor(f)&&p.loadListed(f.id).catch(()=>{})}},onChange(h){return s.add(h),()=>s.delete(h)},problem:h=>i.get(h)??null,clearProblem(h){i.delete(h)&&l()}};return p}const wl="netcomposer.studio.sends.v1";function Pm(e,t=!1){try{const n=e?.getItem(wl);if(n==="0")return!1;if(n==="1")return!0}catch{}return!t}function Dm(e,t){try{return!!(e?.matchMedia(t.portrait).matches||e?.matchMedia(t.landscape).matches)}catch{return!1}}function Rm(e,t){try{e?.setItem(wl,t?"1":"0")}catch{}}function Im(e){return e?{text:"− Sends",aria:"Hide the send effects"}:{text:"+ Sends",aria:"Show the send effects"}}const xl="netcomposer.studio.strip-fold.v1";function $l(e){try{const t=e?.getItem(xl),n=t?JSON.parse(t):[];return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function kl(e,t){try{e?.setItem(xl,JSON.stringify([...t].sort()))}catch{}return t}function El(e,t,n){const a=new Set($l(e));return n?a.add(t):a.delete(t),kl(e,a)}function qm(e,t){return El(e,t,!1)}function Om(e,t){const n=new Set(t),a=$l(e),i=new Set([...a].filter(o=>n.has(o)));return i.size===a.size?a:kl(e,i)}const Bm=-18,_m=-20,Al=3,jm=[-20,-10,-7,-5,-3,-2,-1,0,1,2,3],oo=[-20,-10,-7,-5,-3,0,1,2,3],Hm=.3,Um=6.638/Hm,Vm=48;function Gm(e){return e-Bm}function Sl(e){return Number.isFinite(e)?Math.min(1,Math.max(0,10**((e-Al)/20))):e>0?1:0}function Wm(e){return e>0?Sl(Gm(20*Math.log10(e))):0}function Oi(e){return(Math.min(1,Math.max(0,e))*2-1)*Vm}const so={x:0,v:0};function Ym(e,t,n,a=!1){if(a)return{x:t,v:0};if(!(n>0))return e;const i=Um,o=e.x-t,s=e.v+i*o,l=Math.exp(-i*n),u=t+(o+s*n)*l,c=(e.v-i*s*n)*l;return u>=1?{x:1,v:0}:u<=0?{x:0,v:0}:{x:u,v:c}}function Xm(e,t){return Math.abs(e.x-t)<1e-4&&Math.abs(e.v)<.001}const Ml="netcomposer.studio.vu.v1";function Km(e){try{return e?.getItem(Ml)==="1"}catch{return!1}}function Qm(e,t){try{e?.setItem(Ml,t?"1":"0")}catch{}}const Tl="netcomposer.studio.vu-fold.v1";function Jm(e){try{return e?.getItem(Tl)==="1"}catch{return!1}}function Zm(e,t){try{e?.setItem(Tl,t?"1":"0")}catch{}}const ef="http://www.w3.org/2000/svg",si=200,La=112,yt=si/2,Zt=132,lo=100,tf=108,nf=105,af=116,rf=103,of=112,Ce=(e,t)=>{const n=document.createElementNS(ef,e);for(const[a,i]of Object.entries(t))n.setAttribute(a,String(i));return n},co=e=>Math.round(e*100)/100;function en(e,t){const n=Oi(Sl(e))*Math.PI/180;return[co(yt+t*Math.sin(n)),co(Zt-t*Math.cos(n))]}function uo(e,t,n){const[a,i]=en(e,n),[o,s]=en(t,n);return`M ${a} ${i} A ${n} ${n} 0 0 1 ${o} ${s}`}const sf=e=>e>0?`+${e}`:e<0?`−${-e}`:"0";function po(e){const t=Ce("svg",{class:"vu-meter",viewBox:`0 0 ${si} ${La}`,role:"img","aria-label":`${e==="L"?"Left":"Right"} VU meter`,"data-vu-side":e});t.append(Ce("rect",{class:"vu-face",x:.5,y:.5,width:si-1,height:La-1,rx:4})),t.append(Ce("path",{class:"vu-arc",d:uo(_m,0,lo)})),t.append(Ce("path",{class:"vu-zone",d:uo(0,Al,rf)}));for(const o of jm){const[s,l]=en(o,lo),[u,c]=en(o,oo.includes(o)?tf:nf);t.append(Ce("line",{class:o>0?"vu-tick vu-red":"vu-tick",x1:s,y1:l,x2:u,y2:c}))}for(const o of oo){const[s,l]=en(o,af),u=Ce("text",{class:o>0?"vu-num vu-red":"vu-num",x:s,y:l,"text-anchor":"middle"});u.textContent=Math.abs(o)===20||o===3?sf(o):String(Math.abs(o)),t.append(u)}const n=Ce("text",{class:"vu-legend",x:yt,y:92,"text-anchor":"middle"});n.textContent="VU";const a=Ce("text",{class:"vu-side",x:10,y:La-10});a.textContent=e;const i=Ce("line",{class:"vu-needle",x1:yt,y1:Zt,x2:yt,y2:Zt-of,transform:`rotate(${Oi(0)} ${yt} ${Zt})`});return t.append(n,a,i),{svg:t,needle:i}}function lf(e){const t=document.createElement("div");t.className="vu",t.dataset.vu="",t.setAttribute("role","group"),t.setAttribute("aria-label","VU meters");const n=document.createElement("div");n.className="vu-hd";const a=document.createElement("button");a.type="button",a.className="nc-fold-toggle",a.dataset.vuFold="";const i=document.createElement("span");i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),a.append(i),a.setAttribute("data-nc-help",Y["vu:fold"]);const o=document.createElement("span");o.className="nc-strip-name vu-name",o.textContent="Meters",o.setAttribute("data-nc-help",Y["vu:module"]);const s=document.createElement("button");s.type="button",s.className="nc-page-action vu-hide",s.dataset.vuRemove="",s.textContent="Hide",s.setAttribute("aria-label","Hide VU meters"),s.setAttribute("data-nc-help",Y["vu:remove"]),s.addEventListener("click",()=>e.onRemove(s)),n.append(a,o,s);const l=document.createElement("div");l.className="vu-mini",l.setAttribute("aria-hidden","true");const u=["L","R"].map(b=>{const v=document.createElement("span");v.className="vu-bar",v.dataset.side=b;const $=document.createElement("span");return $.className="vu-bar-fill",v.append($),l.append(v),$});let c=e.folded;const d=()=>{t.toggleAttribute("data-folded",c),a.setAttribute("aria-expanded",c?"false":"true"),a.setAttribute("aria-label",c?"Expand VU meters":"Minimize VU meters"),a.title=c?"Expand":"Minimize"};d(),a.addEventListener("click",()=>{c=!c,d(),e.onFold(c)});const p=po("L"),h=po("R");t.append(n,p.svg,h.svg,l);const f=matchMedia("(prefers-reduced-motion: reduce)"),g=[so,so],y=[Number.NaN,Number.NaN],m=[p.needle,h.needle];return{el:t,frame(b,v){let $=!1;for(const S of[0,1]){const z=b?Wm(b[S]):0;g[S]=Ym(g[S],z,v,f.matches),(!Xm(g[S],z)||z>0)&&($=!0);const w=Math.round(Oi(g[S].x)*10)/10;w!==y[S]&&(y[S]=w,m[S].setAttribute("transform",`rotate(${w} ${yt} ${Zt})`),u[S].style.transform=`scaleY(${Math.max(0,Math.min(1,g[S].x)).toFixed(3)})`,t.dataset[S===0?"vuL":"vuR"]=w.toFixed(1))}return $}}}const cf="netcomposer.studio.hidden.v1",En=1/120,Ne="master",ho="Inserts",df="(max-width: 768px)",Ll=8,Ln=e=>wm(ml(e)),mo=e=>{const t=Ln(e);return t==="−∞"?"off":`${t} dB`};function uf(e,t){return xt.find(n=>n.type===e)?.dials.find(n=>n.key===t)}function pf(e,t,n){const a=n.bpm,i=k=>{const M=n.order(),T=M.indexOf(k);return T<0?M.length:T},o=(k,M,T,I)=>{const P=uf(T,I);if(!P||!M)return null;const ae=Number(M.getParam(T,I)??P.default),he=`mix-${k}-${I}`;return P.options?{type:"select",id:he,label:P.label,value:String(ae),options:P.options.map(N=>({value:String(N.value),label:N.label})),onChange:N=>{M.setParam(T,I,Number(N)),ee.render()}}:{type:"slider",id:he,label:P.label,min:P.min,max:P.max,step:P.step??1,taper:xr(P),value:ae,valueText:P.format(ae,a()),onChange:N=>{M.setParam(T,I,N),ee.render()}}},s=(k,M,T,I)=>I.map(P=>o(k,M,T,P)).filter(P=>P!==null),l=matchMedia(df);let u=null;const c=k=>{u=k,ee.render()},d=k=>c(u===k?null:k);l.addEventListener("change",()=>ee.render());const p=(k,M,T,I)=>{k.setParam(M,T,I),ee.render()},h=(k,M,T,I)=>qd(M,T,{id:`hack-${k}-${T}-graph`,on:I,set:(P,ae)=>p(M,T,P,ae),help:{graph:Y["eq:graph"],low:Y["eq:low"],mid:Y["eq:mid"],high:Y["eq:high"]}}),f=(k,M,T,I)=>{const P=Number(M.getParam(T,I.key)??I.default),ae=`hack-${k}-${T}-${I.key}`,he=N=>p(M,T,I.key,N);return I.options?{type:"select",id:ae,label:I.label,value:String(P),options:I.options.map(N=>({value:String(N.value),label:N.label})),onChange:N=>he(Number(N))}:{type:"slider",id:ae,label:I.label,min:I.min,max:I.max,step:I.step??.001,taper:xr(I),value:P,valueText:Fo(I,P,a()),onChange:he}},g="",y={plate:{mix:30},delay:{mix:30},compressor:{threshold_db:-18,ratio:40,makeup_db:3},drive:{drive_db:6}};let m=im(me(),`${Ne}/${pl}`);const b=k=>({folded:m.has(k),onFold:M=>{m=dl(me(),k,M),ee.render()},foldHelp:Y["fx:fold"]}),v=n.plugins;v?.onChange(()=>ee.render());const $=new Map,S=k=>String(k?.message??k).replace(/^nc-fx plugins?: /,""),z=(k,M,T)=>{$.set(k,M),ee.render(),bh({message:T,duration:9e3,anchor:U.el.querySelector(`[data-nc-id='hack-${k}-add']`)})},w=async(k,M,T)=>{if(!v)return null;const I=T??await $u({title:W.urlTitle,body:W.urlBody,field:{label:W.urlField,placeholder:W.urlPlaceholder,type:"url"},confirmLabel:W.urlNext,returnFocus:M??void 0});if(!I)return null;const P=Fm(I,location.href);if(!P)return z(k,W.badUrlShort,W.badUrl),null;if(!await ta({title:W.warnTitle,body:W.warnBody(_t(P)),confirmLabel:W.warnLoad,danger:!0,returnFocus:M??void 0}))return null;try{return await v.loadUrl(P)}catch(he){return z(k,W.failedShort,S(he)),null}},x=async(k,M,T,I)=>{$.delete(k);let P=T;if(T===ro)P=await w(k,I);else if(T.startsWith(Ta)&&v){ee.render();try{P=await v.loadListed(T.slice(Ta.length))}catch(ae){z(k,W.failedShort,S(ae)),P=null}}P&&M.addEffect(P,{dials:y[P]}),ee.render()},E=()=>v?[...v.listed().map(k=>({value:`${Ta}${k.id}`,label:k.name,group:"Plugins"})),...v.loaded().map(k=>({value:k.type,label:`${k.label} (${_t(k.plugin.url)})`,group:"Plugins"})),{value:ro,label:"Load plugin from URL…",group:"Plugins"}]:[];let A=null,L=null;const C=(k,M,T,I)=>{const P=T.getChain(),ae=P.map((N,ce)=>{const _=re(N.type),pn=_?.dials??[],Qi=ie=>{T.moveEffect(N.id,ie),L=`hack-${k}-${N.id}`,ee.render()},It=[];ce>0&&It.push({type:"button",id:`hack-${k}-${N.id}-left`,label:"Move left",on:!1,onPress:()=>Qi(ce-1)}),ce<P.length-1&&It.push({type:"button",id:`hack-${k}-${N.id}-right`,label:"Move right",on:!1,onPress:()=>Qi(ce+1)}),It.push({type:"button",id:`hack-${k}-${N.id}-remove`,label:"Remove",ariaLabel:`Remove ${N.name} from ${M}`,on:!1,onPress:()=>{T.removeEffect(N.id),ee.render()}});const de=N.plugin,we=(ie,hn,mn=!1)=>({type:"note",id:`hack-${k}-${N.id}-${ie}`,...mn?{tone:"danger"}:{},text:hn});if(de&&de.status==="missing"){const ie=v?.listingFor(de)??null,hn=v?.loading(de.id)??!1,mn=hn?[we("missing",W.loading)]:[we("missing",de.url?W.missing:W.missingNoUrl,!0),we("through",W.through),we("kept",W.kept),...de.url?[we("from",W.from(_t(de.url)))]:[]];return v&&de.url&&!hn&&mn.push({type:"button",id:`hack-${k}-${N.id}-load`,label:ie?W.load:W.loadAsk,ariaLabel:ie?`Load ${de.name}`:`Load ${de.name} from ${_t(de.url)} (asks first)`,on:!1,onPress:()=>{const uc=document.getElementById(`hack-${k}-${N.id}-load`);ie?v.loadListed(de.id).catch(()=>ee.render()):w(k,uc,de.url)}}),{type:"fx",id:`hack-${k}-${N.id}`,title:`${ce+1} · ${N.name}`,...b(`${k}/${N.id}`),depth:ce%4+1,controls:mn,more:It}}const ct=_&&"plugin"in _?_.plugin:void 0,cc=ct?[we("by",`By ${ct.author}`),we("version",`${ct.licence} · ${ct.version}`),we("source",ct.listed?"Listed":W.from(_t(ct.url)))]:[],dc=de?.status==="failed"?[we("failed",Nm(de.error),!0),we("through",W.through),we("retry",W.retry)]:[];return{type:"fx",id:`hack-${k}-${N.id}`,title:`${ce+1} · ${N.name}`,...b(`${k}/${N.id}`),depth:ce%4+1,on:!N.bypass,meter:ga(T,N.id)??void 0,meterHelp:Y["fx:meter"],onToggle:ie=>{T.setParam(N.id,"bypass",!ie),ee.render()},controls:[...dc,...N.type==="eq"?[h(k,T,N.id,!N.bypass)]:[],...pn.filter(ie=>!ie.more).map(ie=>f(k,T,N.id,ie))],maxHelp:Y["fx:max"],more:[...pn.filter(ie=>ie.more).map(ie=>f(k,T,N.id,ie)),...cc,...It]}}),he=P.length>=I;return ae.push({type:"fx",id:`hack-${k}-add`,title:`${M} · Inserts`,...b(`${k}/add`),depth:P.length%4+1,controls:[{type:"note",id:`hack-${k}-note`,...$.get(k)?{tone:"danger"}:{},text:$.get(k)??(v?.loading("url")||v?.listed().some(N=>v.loading(N.id))?W.loading:he?`${P.length} of ${I}: the stack is full.`:P.length===0?"No effects yet.":`${P.length} of ${I}, first to last.`)},...he?[]:[{type:"select",id:`hack-${k}-add-type`,label:"Add",value:g,options:[{value:g,label:"Effect…"},...qc.map(N=>({value:N,label:re(N)?.label??N})),...E()],onChange:N=>{if(N===g)return;const ce=document.getElementById(`hack-${k}-add-type`);ce instanceof HTMLSelectElement&&(ce.value=g),x(k,T,N,ce)}}]]}),ae},H=k=>{const M=t.returns[k];return{type:"slider",id:`mix-${k}-return`,label:"Return",min:0,max:1,step:En,value:M.level,valueText:mo(M.level),onChange:T=>t.setReturn(k,{level:T})}};let B=Pm(me(),Dm(globalThis.window,{portrait:Ks,landscape:es})),G=Om(me(),n.order());const ke=()=>[...t.list()].sort((k,M)=>i(k.id)-i(M.id)).map(k=>({type:"strip",id:`strip-${k.id}`,label:k.name,value:k.strip.position,valueText:Ln(k.strip.position),step:En,defaultValue:oi,resetText:`${Ln(oi)} dB`,ticks:[...no],mute:k.strip.mute,solo:k.strip.solo,silent:k.silent,sendsHidden:!B,onChange:M=>t.set(k.id,{position:M}),onTypeIn:M=>{const T=ao(M);T!==null&&t.set(k.id,{position:T})},onRemove:M=>n.onRemove(k.id,M),folded:G.has(k.id),onFold:M=>{G=El(me(),k.id,M),ee.render()},foldHelp:Y["strip:fold"],foldedHelp:Y["strip:folded"],...k.fx?{hacks:u===k.id,hacksLabel:ho,onHacks:()=>d(k.id)}:{},pan:{id:`pan-${k.id}`,value:k.strip.pan,ariaLabel:`${k.name} pan`,help:Y["strip:pan"],onChange:M=>t.set(k.id,{pan:Math.abs(M)<.005?0:M})},onMute:()=>t.set(k.id,{mute:!k.strip.mute}),onSolo:()=>t.set(k.id,{solo:!k.strip.solo}),sends:["A","B"].map(M=>{const T=M==="A"?"sendA":"sendB",I=k.strip[T];return{id:`send-${M.toLowerCase()}-${k.id}`,label:M,ariaLabel:`${k.name} send ${M}`,min:0,max:Me,step:En*2,value:I,valueText:mo(I),defaultValue:0,onChange:P=>t.set(k.id,{[T]:P})}})})),be=()=>({type:"strip",id:`strip-${Ne}`,label:"Master",master:!0,sendsHidden:!B,...t.masterFx?{hacks:u===Ne,hacksLabel:ho,onHacks:()=>d(Ne)}:{},channels:2,value:t.masterPositionValue,valueText:Ln(t.masterPositionValue),step:En,defaultValue:Me,resetText:"0.0 dB",ticks:[...no],onChange:k=>t.setMaster(k),onTypeIn:k=>{const M=ao(k);M!==null&&t.setMaster(M)}});let ye=Ii(me());const J=k=>({folded:ye[k],onFold:M=>{ye=sl(me(),k,M),ee.render()},foldHelp:Y["fx:fold"]});let O=Km(me()),se=null,q=!0;const ne=k=>{O=k,q=!0,Qm(me(),k),ee.render()},le=()=>{const k=t.returns.a,M=t.returns.b,T=u===Ne&&t.masterFx?{id:Ne,name:"Master",fx:t.masterFx}:(()=>{const _=t.list().find(pn=>pn.id===u);return _?.fx?{id:_.id,name:_.name,fx:_.fx}:null})();T||(u=null);const I=t.masterFx?.getChain()??[],P=[{type:"fx",id:"mix-a",title:"A · Reverb",depth:1,on:k.on,onToggle:_=>t.setReturn("a",{on:_}),meter:ga(k.fx)??void 0,meterHelp:Y["fx:meter-return"],...J("a"),controls:[H("a"),...s("a",k.fx,"plate",["decay","size"])],more:s("a",k.fx,"plate",["predelay","damping"])},{type:"fx",id:"mix-b",title:"B · Delay",depth:2,on:M.on,onToggle:_=>t.setReturn("b",{on:_}),meter:ga(M.fx)??void 0,meterHelp:Y["fx:meter-return"],...J("b"),controls:[H("b"),...s("b",M.fx,"delay",["delay_beats","feedback"])],more:s("b",M.fx,"delay",["tone","low_cut"])}],ae=T?[...T.id===Ne&&l.matches&&B?P:[],...C(T.id,T.name,T.fx,T.id===Ne?ii:Ll)]:B?P:[],he=T?.id??"sends",N=ae.map(_=>_.id),ce=Lm(A,he,N,L);return A={key:he,ids:N,page:ce},L=null,{id:"mix",title:"Mix",summary:`${t.list().map(_=>_.name).join(", ")||"No instruments"} · A Reverb · B Delay · Master ${I.filter(_=>!_.bypass).map(_=>_.name).join(", ")||"no inserts on"}`,layout:"console",compact:!0,sections:[{id:"strips",area:"strips",label:"Channels",controls:[...ke(),{type:"stripAdd",id:"mix-add",label:"Add",ariaLabel:"Add instrument",options:n.catalogue.map(_=>({value:_.id,label:_.available===!1?`${_.name} (soon)`:_.name,disabled:_.available===!1})),onAdd:_=>n.onAdd(_)}]},{id:"fx",area:"fx",label:T?`${T.name} inserts`:"Send effects",pageSize:ia,page:ce,onPage:_=>{A&&(A={...A,page:_})},controls:ae},...O?[{id:"meters",area:"meters",label:"VU meters",controls:[]}]:[],{id:"master",area:"master",label:"Master",controls:[be()]}]}},U=Nh(le(),cf),Te=()=>U.el.toggleAttribute("data-hacks-folded",u===null&&l.matches);Te();const ve=document.createElement("button");ve.type="button",ve.className="nc-page-action vu-add",ve.dataset.vuAdd="",ve.textContent="+ Meters",ve.setAttribute("aria-label","Add VU meters"),ve.setAttribute("data-nc-help",Y["vu:add"]),ve.addEventListener("click",()=>{ne(!0),se?.el.querySelector("[data-vu-remove]")?.focus()}),U.el.querySelector(".nc-module-end")?.prepend(ve);const Le=document.createElement("button");Le.type="button",Le.className="nc-page-action sends-toggle",Le.dataset.sendsToggle="",Le.setAttribute("data-nc-help",Y["sends:toggle"]),Le.addEventListener("click",()=>{B=!B,Rm(me(),B),ee.render()}),ve.after(Le);const Yi=()=>{const{text:k,aria:M}=Im(B);Le.textContent!==k&&(Le.textContent=k),Le.setAttribute("aria-label",M),U.el.toggleAttribute("data-sends-hidden",!B)};Yi();const Xi=()=>{ve.hidden=O;const k=U.el.querySelector('[data-nc-section="meters"]');!O||!k||(se??=lf({onRemove:()=>{ne(!1),ve.focus()},folded:Jm(me()),onFold:M=>{q=!0,Zm(me(),M)}}),se.el.parentElement!==k&&k.append(se.el))};Xi(),mf(U.el,n),hf(U.el,t,n),bo(U.el),go(U.el),Fh(e,[U],"adjacent");const Ki=k=>({peak:to(k.peak),rms:to(k.rms),over:k.peak>=$m}),ee={module:U,get hacksShown(){return u},showHacks:c,render(){U.update(le()),Te(),Xi(),Yi(),bo(U.el),go(U.el)},frame(k){if(U.el.dataset.ncOpen!=="true")return;for(const T of t.list())Hr(U.el,`strip-${T.id}`)?.update([Ki(T.levels())],k);const M=t.masterLevels();if(Hr(U.el,`strip-${Ne}`)?.update(M.map(Ki),k),se&&O){const T=t.ctx.state==="running";T&&(q=!0),q&&(q=se.frame(T?[M[0].rms,M[1].rms]:null,k))}}};return ee}const Ca="application/x-nc-strip",Nt=".nc-strip:not([data-nc-master])",fo=`${Nt}, .nc-strip-add`,Cn=e=>e?.getAttribute("data-nc-id")?.replace(/^strip-/,"")??null;function go(e){for(const t of e.querySelectorAll(".nc-strip [data-nc-hacks]"))t.setAttribute("data-nc-help",t.closest("[data-nc-master]")?Y["inserts:master"]:Y["inserts:channel"]);for(const t of e.querySelectorAll(':is([data-nc-id="mix-a"], [data-nc-id="mix-b"]) .nc-ui-fx-hd .nc-ui-fx-name'))t.setAttribute("data-nc-help",Y["mix:sends"])}function bo(e){for(const t of e.querySelectorAll(`${Nt} .nc-strip-hd > .nc-strip-name`))t.setAttribute("data-nc-help",Y["strip:name"]);for(const t of e.querySelectorAll(`${Nt} :is(.nc-strip-hd, .nc-strip-fold)`))!(t instanceof HTMLElement)||t.draggable||t.hasAttribute("data-renaming")||(t.draggable=!0,t.title="Drag to move this channel")}function hf(e,t,n){e.addEventListener("dblclick",a=>{const i=a.target instanceof Element?a.target.closest(".nc-strip-hd > .nc-strip-name"):null,o=i?.closest(Nt),s=Cn(o??null),l=i?.parentElement;if(!s||!l||!n.onRename||l.hasAttribute("data-renaming"))return;const u=t.list().find(h=>h.id===s)?.name??i.textContent??"",c=document.createElement("input");c.type="text",c.className="nc-strip-name-input",c.value=u,c.maxLength=il,c.spellcheck=!1,c.autocomplete="off",c.setAttribute("aria-label",`Rename ${u}`),c.setAttribute("data-nc-help",Y["strip:rename"]),l.setAttribute("data-renaming",""),l.draggable=!1,l.insertBefore(c,i),c.focus(),c.select();let d=!1;const p=h=>{if(d)return;d=!0;const f=c.value;c.remove(),l.removeAttribute("data-renaming"),l.draggable=!0,h&&f!==u&&n.onRename?.(s,f)};c.addEventListener("keydown",h=>{h.key==="Enter"?(h.preventDefault(),p(!0)):h.key==="Escape"&&(h.preventDefault(),p(!1))}),c.addEventListener("blur",()=>p(!0)),c.addEventListener("click",h=>h.stopPropagation()),c.addEventListener("dragstart",h=>h.preventDefault())})}function mf(e,t){const n=()=>{for(const i of e.querySelectorAll("[data-drop]"))i.removeAttribute("data-drop");for(const i of e.querySelectorAll("[data-dragging]"))i.removeAttribute("data-dragging")},a=(i,o)=>{const s=i.getBoundingClientRect();return o<s.left+s.width/2?"before":"after"};e.addEventListener("dragstart",i=>{const s=(i.target instanceof Element?i.target.closest(".nc-strip-hd, .nc-strip-fold"):null)?.closest(Nt),l=Cn(s??null);!l||!i.dataTransfer||!(s instanceof HTMLElement)||(i.dataTransfer.setData(Ca,l),i.dataTransfer.effectAllowed="move",i.dataTransfer.setDragImage(s,s.offsetWidth/2,16),s.setAttribute("data-dragging","true"))}),e.addEventListener("dragover",i=>{if(!i.dataTransfer?.types.includes(Ca))return;const o=i.target instanceof Element?i.target.closest(fo):null;if(!(o instanceof HTMLElement))return;i.preventDefault(),i.dataTransfer.dropEffect="move";const s=o.matches(".nc-strip-add")?"before":a(o,i.clientX);if(o.getAttribute("data-drop")!==s){for(const l of e.querySelectorAll("[data-drop]"))l.removeAttribute("data-drop");o.setAttribute("data-drop",s)}}),e.addEventListener("drop",i=>{const o=i.dataTransfer?.getData(Ca),s=i.target instanceof Element?i.target.closest(fo):null;if(!o||!(s instanceof HTMLElement))return n();if(i.preventDefault(),s.matches(".nc-strip-add")){n(),t.onReorder?.(o,null);return}const l=Cn(s),u=a(s,i.clientX);if(n(),!l||l===o)return;let c=l;if(u==="after"){const d=[...e.querySelectorAll(Nt)],p=d[d.indexOf(s)+1];if(c=p?Cn(p):null,c===o)return}t.onReorder?.(o,c)}),e.addEventListener("dragend",n)}const Ve=.012,Na=1024;class ff{ctx;bus;masterFx;master;limiter;masterMeter;masterMeters;insertMeters;returns;masterPosition=Me;channels=[];listeners=new Set;scratch=new Float32Array(Na);restore;channelFx;constructor(t,n={}){this.ctx=t,this.restore=n.restore,this.channelFx=n.channelFx;const a=()=>new AnalyserNode(t,{fftSize:Na});this.bus=new GainNode(t,{gain:1}),this.master=new GainNode(t,{gain:tt(this.masterPosition)}),this.limiter=new DynamicsCompressorNode(t,hl),this.masterMeter=a(),this.masterMeters=[a(),a()],this.insertMeters={pre:a(),post:a()},this.masterFx=n.masterFx?.()??null,this.bus.connect(this.insertMeters.pre),this.masterFx?(this.bus.connect(this.masterFx.input),this.masterFx.output.connect(this.master),this.masterFx.output.connect(this.insertMeters.post)):(this.bus.connect(this.master),this.bus.connect(this.insertMeters.post)),this.master.connect(this.limiter),this.limiter.connect(this.masterMeter).connect(t.destination);const i=new ChannelSplitterNode(t,{numberOfOutputs:2});this.limiter.connect(i),i.connect(this.masterMeters[0],0),i.connect(this.masterMeters[1],1);const o=s=>{const l=new GainNode(t,{gain:1}),u=n.fx?.(s)??null,c=new GainNode(t,{gain:tt(Me)}),d=a();return u?(l.connect(u.input),u.output.connect(c)):c.gain.value=0,c.connect(d),c.connect(this.bus),{bus:l,fx:u,gain:c,meter:d,on:u!==null,level:Me}};this.returns={a:o("a"),b:o("b")}}attach(t,n){let a=this.channels.find(i=>i.id===t);if(a)a.input.disconnect(),a.input=new GainNode(this.ctx,{gain:1}),a.input.connect(a.fx?.input??a.fader);else{const i=new GainNode(this.ctx,{gain:1}),o=new GainNode(this.ctx,{gain:0}),s=new AnalyserNode(this.ctx,{fftSize:Na}),l=new GainNode(this.ctx,{gain:0}),u=new GainNode(this.ctx,{gain:0}),c=this.channelFx?.(t)??null;c?(i.connect(c.input),c.output.connect(o)):i.connect(o);const d=new GainNode(this.ctx,{gain:1,channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"}),p=new ChannelSplitterNode(this.ctx,{numberOfOutputs:2}),h=new GainNode(this.ctx,{gain:1}),f=new GainNode(this.ctx,{gain:1}),g=new ChannelMergerNode(this.ctx,{numberOfInputs:2});o.connect(s),o.connect(d).connect(p),p.connect(h,0).connect(g,0,0),p.connect(f,1).connect(g,0,1),g.connect(this.bus),g.connect(l).connect(this.returns.a.bus),g.connect(u).connect(this.returns.b.bus),a={id:t,name:n,input:i,fader:o,stereo:d,split:p,balL:h,balR:f,panner:g,meter:s,sendA:l,sendB:u,fx:c,strip:this.restore?.(t)??gl},this.channels.push(a),this.apply()}return this.emit(),a.input}rename(t,n){const a=this.channels.find(i=>i.id===t);!a||a.name===n||(a.name=n,this.emit())}detach(t){const n=this.channels.findIndex(i=>i.id===t);if(n<0)return;const[a]=this.channels.splice(n,1);if(a){for(const i of[a.input,a.fader,a.stereo,a.split,a.balL,a.balR,a.panner,a.meter,a.sendA,a.sendB])i.disconnect();a.fx?.output.disconnect(),a.fx?.dispose(),this.apply(),this.emit()}}tapNode(t){return t==="master"?this.limiter:this.channels.find(n=>n.id===t)?.panner??null}tapLatency(t,n){const a=o=>{const s=o?.latencySamples;return typeof s=="number"&&Number.isFinite(s)&&s>0?Math.round(s):0};if(t==="master")return Math.max(0,Math.round(n))+a(this.masterFx);const i=this.channels.find(o=>o.id===t);return i?a(i.fx):null}set(t,n){const a=this.channels.find(i=>i.id===t);a&&(a.strip={...a.strip,...n},this.apply(),this.emit())}setMaster(t){this.masterPosition=t,this.master.gain.setTargetAtTime(tt(t),this.ctx.currentTime,Ve),this.emit()}get masterPositionValue(){return this.masterPosition}setReturn(t,n){const a=this.returns[t],i=this.ctx.currentTime;n.on!==void 0&&(a.on=n.on&&a.fx!==null,a.bus.gain.setTargetAtTime(a.on?1:0,i,Ve)),n.level!==void 0&&(a.level=n.level,a.fx&&a.gain.gain.setTargetAtTime(tt(a.level),i,Ve)),this.emit()}setTempo(t,n){for(const a of[this.returns.a.fx,this.returns.b.fx,this.masterFx])a?.setTempo(t,n);for(const a of this.channels)a.fx?.setTempo(t,n)}masterPeak(){return this.levelsOf(this.masterMeter).peak}masterLevels(){return[this.levelsOf(this.masterMeters[0]),this.levelsOf(this.masterMeters[1])]}returnLevels(t){return this.levelsOf(this.returns[t].meter)}insertLevels(){return{pre:this.levelsOf(this.insertMeters.pre),post:this.levelsOf(this.insertMeters.post)}}list(){const t=this.channels.some(n=>n.strip.solo);return this.channels.map(n=>({id:n.id,name:n.name,strip:n.strip,silent:n.strip.mute||t&&!n.strip.solo,fx:n.fx,peak:()=>this.levelsOf(n.meter).peak,levels:()=>this.levelsOf(n.meter)}))}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}apply(){const t=xm(this.channels.map(a=>a.strip)),n=this.ctx.currentTime;this.channels.forEach((a,i)=>{a.fader.gain.setTargetAtTime(t[i]??0,n,Ve),a.sendA.gain.setTargetAtTime(tt(a.strip.sendA),n,Ve),a.sendB.gain.setTargetAtTime(tt(a.strip.sendB),n,Ve);const[o,s]=Em(a.strip.pan);a.balL.gain.setTargetAtTime(o,n,Ve),a.balR.gain.setTargetAtTime(s,n,Ve)})}levelsOf(t){return t.getFloatTimeDomainData(this.scratch),km(this.scratch)}emit(){for(const t of this.listeners)t()}}const Bi="studio";function gf(){let e=null;const t=new Set,n=new Set,a=new Set,i=new Map,o=c=>{try{return i.get(c)?.()===!0}catch{return!1}},s=c=>{for(const d of[...c])try{d()}catch{}},l=c=>{if(c!==e){e=c;for(const d of n)d()}},u=(c,d)=>(c.add(d),()=>{c.delete(d)});return{owner:()=>e,claim(c){e===null&&l(c)},claimAll(){l(Bi),s(t)},clear:()=>l(null),onAll:c=>u(t,c),member(c,d){return i.set(c,d),()=>{i.get(c)===d&&i.delete(c)}},out(c){for(const d of i.keys())if(d!==c&&o(d))return;s(a)},drop:c=>{i.delete(c)},onLastOut:c=>u(a,c),playing:()=>[...i.keys()].filter(o),onChange:c=>u(n,c)}}const bf="audio/wav";function yf(e){const t=a=>String(a).padStart(2,"0");return`netcomposer-studio-${`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())}-${t(e.getHours())}${t(e.getMinutes())}`}.wav`}function vf(e,t){const n=Math.min(e.length,t.length),a=new Uint8Array(n*6);let i=0;for(let o=0;o<n;o++)for(const s of[e[o]??0,t[o]??0]){const l=Math.max(-1,Math.min(1,s)),u=Math.round(l<0?l*8388608:l*8388607);a[i++]=u&255,a[i++]=u>>8&255,a[i++]=u>>16&255}return a}function wf(e,t){const i=e*2*3,o=new ArrayBuffer(44),s=new DataView(o),l=(u,c)=>{for(let d=0;d<4;d++)s.setUint8(u+d,c.charCodeAt(d))};return l(0,"RIFF"),s.setUint32(4,36+i,!0),l(8,"WAVE"),l(12,"fmt "),s.setUint32(16,16,!0),s.setUint16(20,1,!0),s.setUint16(22,2,!0),s.setUint32(24,t,!0),s.setUint32(28,t*2*3,!0),s.setUint16(32,6,!0),s.setUint16(34,24,!0),l(36,"data"),s.setUint32(40,i,!0),new Uint8Array(o)}class xf{constructor(t,n){this.ctx=t,this.source=n}node=null;id=0;phase="idle";parts=[];frames=0;from=0;why="now";done=null;listeners=new Set;attach(){const t=this.source();if(this.node||!t)return;const n=new AudioWorkletNode(this.ctx,"nc-studio-rec",{numberOfInputs:1,numberOfOutputs:0,channelCount:2,channelCountMode:"explicit"});n.port.onmessage=a=>this.message(a.data),t.connect(n),this.node=n}get supported(){return typeof AudioWorkletNode<"u"}get state(){return this.phase}get started(){return this.phase==="recording"||this.phase==="stopping"?{from:this.from,why:this.why}:null}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}arm(t=!1){this.phase==="idle"&&(this.attach(),this.node&&(this.id++,this.parts=[],this.frames=0,this.set("arming"),this.node.port.postMessage({type:"arm",id:this.id,force:t})))}schedule(t){this.phase!=="arming"&&this.phase!=="armed"||this.node?.port.postMessage({type:"at",id:this.id,at:t})}cancel(){this.phase!=="arming"&&this.phase!=="armed"||(this.node?.port.postMessage({type:"cancel",id:this.id}),this.parts=[],this.id++,this.set("idle"))}stop(){return this.phase!=="recording"||!this.node?Promise.resolve(null):(this.set("stopping"),new Promise(t=>{this.done=t,this.node?.port.postMessage({type:"stop",id:this.id})}))}set(t){if(this.phase!==t){this.phase=t;for(const n of this.listeners)n()}}message(t){if(t.id===this.id){if(t.type==="rec")t.phase==="armed"&&this.phase==="arming"?this.set("armed"):t.phase==="recording"&&(this.phase==="arming"||this.phase==="armed")?(this.from=t.from??0,this.why=t.why??"now",this.set("recording")):t.phase==="idle"&&this.phase==="stopping"&&this.finish(null);else if(t.type==="rec-data"){const[n,a]=t.channels??[];if(!n||!a)return;this.parts.push(vf(n,a)),this.frames+=n.length}else if(t.type==="rec-done"){const n=t.sampleRate??this.ctx.sampleRate,a=new Blob([wf(this.frames,n),...this.parts],{type:bf});this.finish({blob:a,name:yf(new Date),seconds:this.frames/n,from:t.from??this.from,why:this.why})}}}finish(t){this.parts=[],this.frames=0;const n=this.done;this.done=null,this.set("idle"),n?.(t)}}const $f="NetComposer Studio",Ie=[40,240],kf="nc-sync";function Ef(e,t=globalThis.navigator?.locks){const n=`/studio/${e}`;return{channel:`${kf}${n}`,locks:t?{request:(a,i,o)=>t.request(`${a}${n}`,i,o)}:null}}function Af(){return globalThis.crypto?.randomUUID?.()??`${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`}const Sf=.2,yo=.5;function Mf(e,t,n){const a=new vc({bpm:120,minBpm:Ie[0],maxBpm:Ie[1],timebase:"shared"}),i=new Nc({app:$f,version:"0.1.0",clock:a,capabilities:{prefersLeader:!0,canLead:!0,tempoRange:Ie},startLeadSeconds:Sf,...n?{startGate:()=>n(),gatedStartLeadSeconds:yo}:{},...t?{channel:t.channel,locks:t.locks}:{},audio:()=>{const u=e();return u==="running"?"running":u==="closed"?"none":"needs-gesture"}});let o=!1,s=0,l=!1;return{clock:a,peer:i,async start(){o||(o=!0,await i.start())},play(){const u=n?.()??null;if(!u){l=!1,a.play({at:je()});return}const c=++s,d=je();l=!0;const p=()=>{c!==s||!l||(l=!1,i.isLeader&&!a.transport.running?(a.commitStart(Math.max(d,je())+yo,0),i.publishState()):a.play({at:je()}))};u.then(p,p)},stop(){l&&(l=!1,s++,!a.transport.running)||a.stop({at:je()})},setTempo:u=>a.setTempo({bpm:Tf(u)}),playing:()=>a.transport.isPlayingAt(je()),running:()=>l||a.transport.running,bpm:()=>a.transport.bpm,position(){const u=a.transport,c=je();return u.isPlayingAt(c)?Lf(u.beatAt(c)):null},beatPhase(){const u=a.transport,c=je();if(!u.isPlayingAt(c))return null;const d=u.beatAt(c);return d-Math.floor(d)},peers:()=>[...i.peers.values()]}}function Tf(e){return Number.isFinite(e)?Math.min(Ie[1],Math.max(Ie[0],Math.round(e*10)/10)):120}function Lf(e){const t=Math.max(0,Math.floor(e));return{bar:Math.floor(t/4)+1,beat:t%4+1}}const li="netcomposer.scene",Cl=1,Nl="netcomposer.studio.tempo.v1",Fl="netcomposer.studio.scene-name.v1",Un=120,_i="Untitled scene",Cf=2*1024*1024;function ra(e){const t=typeof e=="number"?e:Number(e);return Number.isFinite(t)?Math.min(Ie[1],Math.max(Ie[0],Math.round(t*10)/10)):Un}function lt(e){return(typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,60):"")||_i}function Nf(e){return{format:li,v:Cl,name:lt(e.name),saved:(e.now??new Date).toISOString(),tempo:{bpm:ra(e.bpm)},meter:[4,4],instances:e.instances.map(t=>({id:t.id,type:t.type,name:t.name})),mix:e.mix,presets:e.presets??{},media:e.media??[]}}function Ff(e,t){if(e.length>Cf)return{ok:!1,error:"That file is too large to be a Scene."};let n;try{n=JSON.parse(e)}catch{return{ok:!1,error:"That file isn't a Scene (it isn't JSON)."}}if(!n||typeof n!="object")return{ok:!1,error:"That file isn't a Scene."};const a=n;if(a.format!==li)return{ok:!1,error:"That file isn't a Scene. Load an instrument's own file from that instrument."};if((typeof a.v=="number"?a.v:0)<1)return{ok:!1,error:"That Scene has no version."};const o=new Set,s=[];for(const c of Array.isArray(a.instances)?a.instances:[]){if(!c||typeof c!="object")continue;const d=c.id;if(typeof d!="string")continue;const p=Pi(d);if(!p||!t.includes(p.type)||o.has(d))continue;o.add(d);const h=c.name;s.push({id:d,type:p.type,name:rl(h,"")})}if(!s.length)return{ok:!1,error:"That Scene has no instruments this Studio knows."};const l=a.tempo&&typeof a.tempo=="object"?a.tempo.bpm:void 0,u={};if(a.presets&&typeof a.presets=="object")for(const[c,d]of Object.entries(a.presets))o.has(c)&&(u[c]=d);return{ok:!0,scene:{format:li,v:Cl,name:lt(a.name),saved:typeof a.saved=="string"?a.saved:"",tempo:{bpm:ra(l)},meter:[4,4],instances:s,mix:bl(a.mix??rn()),presets:u,media:Array.isArray(a.media)?a.media:[]}}}function zf(e){return`${lt(e).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")||"scene"}.scene.json`}function Pf(e){try{const t=e?.getItem(Nl);return t?ra(Number(t)):Un}catch{return Un}}function zl(e,t){try{t?.setItem(Nl,String(ra(e)))}catch{}}function Df(e){try{return lt(e?.getItem(Fl))}catch{return _i}}function Pl(e,t){try{t?.setItem(Fl,lt(e))}catch{}}const Rf=300,If=120*1e3;function qf(e){return Object.prototype.toString.call(e)==="[object Float32Array]"}function Of(e){const t=e&&typeof e=="object"?e:null;if(!t)return{ok:!1,message:"No audio."};const n=typeof t.name=="string"?t.name.trim().slice(0,64):"";if(!n)return{ok:!1,message:"The audio has no name."};const a=t.sampleRate;if(typeof a!="number"||!Number.isFinite(a)||a<8e3||a>192e3)return{ok:!1,message:"The sample rate is out of range (8–192 kHz)."};const i=t.channels;if(!Array.isArray(i)||i.length<1||i.length>2)return{ok:!1,message:"The audio needs one or two channels."};if(!i.every(qf))return{ok:!1,message:"Channels must be 32-bit float arrays."};const o=i[0].length;if(o===0)return{ok:!1,message:"The audio is empty."};if(i.some(u=>u.length!==o))return{ok:!1,message:"The channels differ in length."};if(o>Rf*a)return{ok:!1,message:"The audio is longer than five minutes."};const s=typeof t.bars=="number"&&Number.isInteger(t.bars)&&t.bars>=1&&t.bars<=256?t.bars:void 0,l=typeof t.bpm=="number"&&Number.isFinite(t.bpm)&&t.bpm>=20&&t.bpm<=300?t.bpm:void 0;return{ok:!0,audio:{name:n,sampleRate:a,channels:i.map(u=>new Float32Array(u)),...s===void 0?{}:{bars:s},...l===void 0?{}:{bpm:l}}}}function vo(e){try{const t=e.targets();return Array.isArray(t)?t.flatMap(n=>{if(!n||typeof n.id!="string"||!n.id)return[];const a=typeof n.name=="string"&&n.name?n.name.slice(0,64):n.id;return[{id:n.id,name:a,...n.filled?{filled:!0}:{}}]}):[]}catch{return[]}}function Bf(e={}){const t=new Map,n=s=>e.live?.(s)??!0,a=s=>e.nameOf?.(s)??s,i=e.answerMs??If,o=s=>[...t.entries()].filter(([l])=>l!==s&&n(l)).map(([l,u])=>{const c=e.brandOf?.(l);return{instance:l,name:a(l),...c?{brand:c}:{},label:typeof u.label=="string"&&u.label?u.label.slice(0,24):"Target",targets:vo(u)}});return{forget(s){t.delete(s)},host(s){return{audioReceivers:()=>o(s),async sendAudio(l,u,c){const d=t.get(l);if(l===s||!d||!n(l))return{ok:!1,reason:"gone",message:"That instrument isn't in the Studio."};if(typeof c!="string"||!vo(d).some(g=>g.id===c))return{ok:!1,reason:"invalid",message:`No ${c} there.`};const p=Of(u);if(!p.ok)return{ok:!1,reason:"invalid",message:p.message};const h={...p.audio,from:s,fromName:e.brandOf?.(s)??a(s)};let f;try{const g=await Promise.race([Promise.resolve(d.receive(h,c)),new Promise(y=>{f=setTimeout(()=>y({ok:!1,reason:"timeout",message:"No answer."}),i)})]);return!g||typeof g!="object"||typeof g.ok!="boolean"?{ok:!1,reason:"error",message:"The instrument didn't answer."}:g}catch(g){return{ok:!1,reason:"error",message:g instanceof Error?g.message:String(g)}}finally{clearTimeout(f)}},onAudio(l){return t.set(s,l),()=>{t.get(s)===l&&t.delete(s)}},reveal(){n(s)&&e.reveal?.(s)}}}}}const _f="/studio/assets/silence-processor-CMfx2MIS.js";function jf(e,t=Ri){const n=t.find(o=>o.id===e.type),a=(n?.name??e.type).toUpperCase(),i=String(e.n).padStart(2,"0");return{brand:n?.brand??a,rest:e.custom&&e.name?` / ${e.name.toUpperCase()}`:` / ${a} / ${i}`,...n?.identity?{identity:n.identity}:{}}}const ci=lu,Pe=su,Fa={system:"System",light:"Light",dark:"Dark"};function Hf(e){try{return yi(e?.getItem(ci))}catch{return"system"}}function Uf(e,t){try{t==="system"?e?.removeItem(ci):e?.setItem(ci,t)}catch{}}const Vf=e=>Pe[(Pe.indexOf(e)+1)%Pe.length]??"system";function Gf(e){try{return e.contentDocument?.documentElement?e.contentDocument:null}catch{return null}}function Dl(e,t){const n=Gf(e);n&&vi(t,n)}function Wf(e,t){const n=document.createElement("div");n.className="theme",n.setAttribute("role","radiogroup"),n.setAttribute("aria-label","Theme"),n.dataset.theme="";let a=e;const i=Pe.map(s=>{const l=document.createElement("button");l.type="button",l.className="ghost theme-choice",l.setAttribute("role","radio"),l.dataset.themeChoice=s;const u=document.createElement("span");return u.className="theme-word",u.textContent=Fa[s],l.append(u),l.setAttribute("aria-label",`${Fa[s]} theme`),l.title=s==="system"?"Follow this computer's light or dark setting":`${Fa[s]} theme`,l.addEventListener("click",()=>{const c=n.closest(".nc-page-menu[data-nc-open]")!==null,d=s===a&&!c?Vf(s):s;o(d),t(d),i[Pe.indexOf(d)]?.focus({preventScroll:!0})}),l});n.append(...i);function o(s){a=s;for(const l of i){const u=l.dataset.themeChoice===s;l.setAttribute("aria-checked",u?"true":"false"),l.tabIndex=u?0:-1}}return o(e),n.addEventListener("keydown",s=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(s.key))return;s.preventDefault();const l=s.key==="ArrowLeft"||s.key==="ArrowUp"?-1:1,u=(Pe.indexOf(a)+l+Pe.length)%Pe.length,c=Pe[u]??"system";o(c),t(c),i[u]?.focus()}),{el:n,get choice(){return a},set:o}}function Yf(e,t){const n=e.addModule.bind(e),a=new Map;return Object.defineProperty(e,"addModule",{value:(o,s)=>{const l=new URL(String(o),t).href;let u=a.get(l);return u||(u=n(o,s),a.set(l,u),u.catch(()=>{a.get(l)===u&&a.delete(l)})),u},configurable:!0}),e}const V=new AudioContext({latencyHint:"interactive"});Yf(V.audioWorklet,location.href);const Xf=new URLSearchParams(location.search).has("plugins"),Vn=Xf?zm({ctx:V,moduleUrl:Xt,base:location.href}):null;function wo(e){return Vn?.restore(e.getChain().flatMap(t=>t.plugin?[t.plugin]:[])),e.onChange(t=>{(t.key==="error"||t.key==="plugin")&&Ze?.render()}),e}const fe=Mm(),Ft={},Kf=Ll,oa=new Map,Z=new ff(V,{restore:e=>fe.channels[e],fx:e=>{const t=ba(V,{moduleUrl:Xt,bpm:120,state:ul(e,fe)});return Ft[e]=t,t},masterFx:()=>{const e=ba(V,{moduleUrl:Xt,bpm:120,slots:ii,state:om(fe,ii)});return e.onChange(ln),wo(e)},channelFx:e=>{Kn.delete(e);const t=ba(V,{moduleUrl:Xt,bpm:j.bpm(),slots:Kf,state:fe.channelFx[e]??{v:2,chain:[]}}),n=Go(t,j.clock,{mapper:Je}),a=t.dispose.bind(t);return t.dispose=()=>{n(),a()},t.onChange(ln),oa.set(e,t),wo(t)}});Z.setMaster(fe.master);Z.setReturn("a",fe.returns.a);Z.setReturn("b",fe.returns.b);const Je=new Cc(V);Je.start();const Rl=Af();let Il=()=>{};const ql=gm(V.sampleRate),ji=dm(V,{nodeFor:e=>Z.tapNode(e),latencyFor:e=>Z.tapLatency(e,ql.get()),sources:()=>[{id:"master",name:"Master"},...Z.list().map(e=>({id:e.id,name:e.name}))],ready:new Promise(e=>{Il=e})}),xe=gf(),Et=Gh(()=>{try{return globalThis.sessionStorage??null}catch{return null}}),Ol=Bf({live:e=>R.some(t=>t.id===e),nameOf:e=>R.find(t=>t.id===e)?.name??e,brandOf:e=>{const t=R.find(a=>a.id===e),n=ge.find(a=>a.id===t?.type)?.brand;return t&&n?t.n===1?n:`${n} ${t.n}`:void 0},reveal:e=>{Oe(e),document.getElementById(`tab-${e}`)?.scrollIntoView({block:"nearest"}),$e.get(e)?.contentWindow?.focus()}});let Bl=!1;const Hi=am(),_l=tm({now:()=>V.currentTime,labelOf:e=>{const t=R.find(a=>a.id===e),n=ge.find(a=>a.id===t?.type)?.brand??t?.name??e;return t&&t.n>1?`${n} ${t.n}`:n},clearOf:()=>[Vl,Xn,Wl]});window.ncStudio=Xh(V,Z,{countIn:_l.api,holdFirstPlay:()=>Hi.hold(),presets:Et,share:Ol,grab:ji,play:xe,mapper:um(Je),resolve:(e,t)=>tg(e,t),syncScope:Rl,fxWorklet:new URL(Xt,location.href).href});const j=Mf(()=>V.state,Ef(Rl),()=>Bl&&V.state==="running"&&Je.ready&&Hi.count===0?null:og());function Qe(){try{return globalThis.localStorage??null}catch{return null}}j.setTempo(Pf(Qe()));const ue=new xf(V,()=>Z.tapNode("master"));let Ut=null;function D(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))o===void 0||o===!1||a.setAttribute(i,o===!0?"":String(o));return a.append(...n),a}const on=D("button",{type:"button",class:"btn play","aria-pressed":"false"},"Play"),zt=D("input",{type:"number",class:"bpm",min:Ie[0],max:Ie[1],step:.1,value:120,"aria-label":"Tempo in BPM"}),Gn=D("output",{class:"position","aria-label":"Bar and beat"},"—"),We=D("button",{type:"button",class:"btn rec","aria-pressed":"false","data-state":"idle","data-nc-help":Y["transport:rec"]},"Rec"),Vt=D("a",{class:"take",hidden:!0}),Ui=D("span",{class:"status",role:"status"}),vt=D("input",{type:"text",class:"scene-name",maxlength:60,value:Df(Qe()),"aria-label":"Scene name",title:"Scene name (used when you Save)"}),jl=D("button",{type:"button",class:"ghost","data-scene":"save",title:"Save this Scene as a file"},"Save"),Hl=D("button",{type:"button",class:"ghost","data-scene":"load",title:"Load a Scene file"},"Load"),Ul=D("button",{type:"button",class:"ghost","data-scene":"new",title:"Start a new Scene"},"New"),tn=D("input",{type:"file",accept:".json,application/json",hidden:!0}),Vi=Wf(Hf(Qe()),e=>{Uf(Qe(),e),vi(e);for(const t of $e.values())Dl(t,e)});vi(Vi.choice);const Vl=D("h1",{class:"brand","aria-label":"NetComposer Studio"},D("span",{"aria-hidden":"true"},"NetComposer",D("span",{class:"brand-sep"}," / "),"Studio")),di=D("span",{class:"beat-light","aria-hidden":"true"}),Wn=D("span",{class:"status-long"}),Yn=D("span",{class:"status-short"});Ui.append(Wn,Yn);const Xn=D("header",{class:"top"},D("div",{class:"transport"},on,D("label",{class:"tempo"},zt,D("span",{class:"tempo-unit"},"BPM")),di,Gn),D("div",{class:"record"},We,Vt),Ui),Gl=D("div",{class:"scene-actions"},vt,jl,Hl,Ul,Vi.el),Qf=Eh({panel:Gl}),Wl=D("div",{class:"scene",role:"group","aria-label":"Scene"},Gl,tn,Qf.button);ue.supported||(We.disabled=!0,We.title="This browser can't record audio");const Rt=D("div",{class:"tabs",role:"tablist","aria-label":"Instruments"}),Yl=D("div",{class:"stage"}),un=D("label",{class:"tab tab-add",title:"Add an instrument"},D("span",{"aria-hidden":"true"},"+")),At=D("select",{class:"tab-add-select","aria-label":"Add an instrument"});At.append(D("option",{value:""},"Add an instrument"),...Ri.map(e=>{const t=D("option",{value:e.id},e.available===!1?`${e.name} (soon)`:e.name);return t.disabled=e.available===!1,t}));At.addEventListener("change",()=>{const e=At.value;At.value="",e&&nc(e)});un.append(At);Rt.append(un);wh();const sn=D("div",{class:"spine","aria-hidden":"true"}),$e=new Map;let R=Bh(Oh(ge),ge),Be=R[0]?.id??"";const Jf=new URLSearchParams(location.search).has("measure"),xo=new Map,Zf=2e4;function Xl(e){const t=D("button",{type:"button",role:"tab",id:`tab-${e.id}`,"aria-controls":`panel-${e.id}`,class:"tab"},e.name);t.addEventListener("click",()=>Oe(e.id)),Rt.insertBefore(t,un);const a=(xo.get(e.type)??Promise.resolve()).then(()=>new Promise(i=>{if(!R.some(l=>l.id===e.id))return i();const o=D("iframe",{id:`panel-${e.id}`,role:"tabpanel","aria-labelledby":`tab-${e.id}`,title:e.name,src:Rh(e,Jf),allow:"autoplay; clipboard-read; clipboard-write; microphone"});$e.set(e.id,o);const s=window.setTimeout(i,Zf);o.addEventListener("load",()=>eg(o)),o.addEventListener("load",()=>{window.clearTimeout(s),i()},{once:!0}),Yl.append(o),Oe(Be)}));return xo.set(e.type,a),a}const Kl=window.matchMedia(es);function Ql(e){try{e.contentDocument?.documentElement.toggleAttribute("data-nc-landscape",Kl.matches)}catch{}}Kl.addEventListener("change",()=>{for(const e of $e.values())Ql(e)});function eg(e){let t=null;try{t=e.contentDocument}catch{return}if(!t?.documentElement)return;t.documentElement.dataset.ncHosted="",Dl(e,Vi.choice),Ql(e);const n=e.id.replace(/^panel-/,""),a=()=>{const o=t?.querySelector(".nc-page"),s=o?o.getBoundingClientRect().height:t?.documentElement.scrollHeight??0;s>0&&(e.style.height=`${Math.ceil(s)}px`);const l=t?.querySelector(".nc-page-hd, .nc-title-band");l&&(Zl.set(n,Math.round(l.getBoundingClientRect().bottom)),n===Be&&ec())};a();const i=t.querySelector(".nc-page")??t.body;i&&new ResizeObserver(()=>{a(),sa()}).observe(i),Gi.add(e),Jl(e)}const Gi=new Set;function Jl(e){let t;try{t=e.contentDocument?.documentElement}catch{return}if(!t||!e.isConnected){Gi.delete(e);return}const n=e.getBoundingClientRect();if(n.height<=0)return;const a=getComputedStyle(Xn).position==="sticky"?Xn.getBoundingClientRect().bottom:0,i=Math.min(n.height,Math.max(0,a-n.top)),o=Math.max(i,Math.min(n.height,window.innerHeight-n.top));t.style.setProperty("--nc-host-top",`${Math.round(i)}px`),t.style.setProperty("--nc-host-height",`${Math.round(o-i)}px`),t.style.setProperty("--nc-host-bottom",`${Math.round(n.height-o)}px`)}let za=!1;function sa(){za||(za=!0,requestAnimationFrame(()=>{za=!1;for(const e of Gi)Jl(e)}))}window.addEventListener("scroll",sa,{passive:!0});window.addEventListener("resize",sa);const Zl=new Map;function ec(){const e=Zl.get(Be);e===void 0?sn.style.removeProperty("--spine-top"):sn.style.setProperty("--spine-top",`${e}px`)}function tc(e){if(!e){sn.replaceChildren();return}const t=jf(e),n=D("span",{class:"spine-brand"},t.brand);t.identity&&(n.style.color=`var(--nc-ui-${t.identity})`),sn.replaceChildren(D("span",{class:"spine-text"},n,D("span",{class:"spine-rest"},t.rest)))}function Oe(e){Be=e,tc(R.find(t=>t.id===e)),ec(),sa();for(const t of R){const n=t.id===e;$e.get(t.id)?.classList.toggle("shown",n);const a=document.getElementById(`tab-${t.id}`);a?.setAttribute("aria-selected",String(n)),a?.setAttribute("tabindex",n?"0":"-1")}}const tg=jh(()=>R.map(e=>({instance:e,window:()=>$e.get(e.id)?.contentWindow,readyState:()=>{try{return $e.get(e.id)?.contentDocument?.readyState}catch{return}}})),ge);function nc(e){const t=ge.find(i=>i.id===e);if(!t)return;const n=Ih(R,t),a=R.map(i=>i.type).lastIndexOf(n.type);R=a<0?[...R,n]:[...R.slice(0,a+1),n,...R.slice(a+1)],Dt(R),Xl(n);for(const i of R){const o=document.getElementById(`tab-${i.id}`);o&&Rt.insertBefore(o,un)}Oe(n.id),Ze?.render()}function ng(e,t){const n=R.find(o=>o.id===e);if(!n)return;const a=R.filter(o=>o.id!==e),i=t===null?a.length:a.findIndex(o=>o.id===t);R=[...a.slice(0,i<0?a.length:i),n,...a.slice(i<0?a.length:i)],Dt(R);for(const o of R){const s=document.getElementById(`tab-${o.id}`);s&&Rt.insertBefore(s,un)}Ze?.render()}function ag(e,t){R=Dh(R,e,t,ge),Dt(R);const n=R.find(i=>i.id===e);if(!n)return;const a=document.getElementById(`tab-${e}`);a&&(a.textContent=n.name),$e.get(e)?.setAttribute("title",n.name),Be===e&&tc(n),Z.rename(e,n.name)}async function ig(e,t){const a=R.find(l=>l.id===e)?.name??e;if(!await ta({title:`Remove ${a}?`,body:`Its channel, strip and mix settings go. ${a}'s own saved patterns stay in the instrument.`,confirmLabel:"Remove",danger:!0,returnFocus:t}))return;R=R.filter(l=>l.id!==e),Dt(R),Ol.forget(e);const o=xe.playing().includes(e);xe.drop(e),o&&xe.out(e);const s=$e.get(e);$e.delete(e),s?.setAttribute("src","about:blank"),s?.remove(),document.getElementById(`tab-${e}`)?.remove(),Z.detach(e),rg(e),qm(me(),e),Be===e&&Oe(R[0]?.id??"")}const ui=D("div",{class:"mix"});ui.addEventListener("click",e=>{const n=e.target?.closest?.(".nc-strip[data-nc-id]")?.dataset.ncId?.replace(/^strip-/,"");n&&n!==Be&&R.some(a=>a.id===n)&&Oe(n)});let Ze=null,pi=0;const Kn=new Set;function rg(e){Kn.add(e),delete fe.channels[e],delete fe.channelFx[e],oa.delete(e),ln()}let ac=!1;function ln(){window.clearTimeout(pi),!ac&&(pi=window.setTimeout(()=>{vl(ic())},300))}function ic(){const e={...fe.channels};for(const i of Z.list())e[i.id]=i.strip;for(const i of Kn)delete e[i];const t={};for(const i of["a","b"]){const o=Ft[i];o&&(t[i]=o.getState())}const n=Z.masterFx?.getState()??null,a={...fe.channelFx};for(const[i,o]of oa)a[i]=o.getState();for(const i of Kn)delete a[i];return{v:1,channels:e,master:Z.masterPositionValue,returns:{a:{on:Z.returns.a.on,level:Z.returns.a.level},b:{on:Z.returns.b.on,level:Z.returns.b.level}},insert:{on:n?sm(n):fe.insert.on},fx:t,channelFx:a,masterFx:n??fe.masterFx}}Z.onChange(()=>{Ze?.render(),ln()});for(const e of Object.values(Ft))e?.onChange(ln);async function Wi(){V.state!=="running"&&await V.resume()}const $o=1500;async function og(){const e=performance.now()+$o;await Promise.race([Wi(),new Promise(t=>setTimeout(t,$o))]),await Je.whenSettled(Math.max(0,e-performance.now())),await Promise.race([Hi.idle(),new Promise(t=>setTimeout(t,Math.max(0,e-performance.now())))])}on.addEventListener("click",()=>{Wi(),j.running()&&xe.owner()===Bi?j.stop():j.running()?xe.claimAll():(xe.claimAll(),j.play()),_e()});function rc(){const e=Number(zt.value);j.setTempo(e),zl(j.bpm(),Qe())}vt.addEventListener("change",()=>{vt.value=lt(vt.value),Pl(vt.value,Qe())});function sg(e,t,n){const a=URL.createObjectURL(new Blob([t],{type:n})),i=D("a",{href:a,download:e});document.body.append(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(a),1e4)}jl.addEventListener("click",async()=>{const e=lt(vt.value),t=R.map(o=>o.id),n=await Et.collect(t),a=Nf({name:e,bpm:j.bpm(),instances:R,mix:ic(),presets:n});sg(zf(e),`${JSON.stringify(a,null,2)}
`,"application/json");const i=R.filter(o=>!n[o.id]).map(o=>o.name);la(i.length?`Saved “${e}” (without ${i.join(", ")}: ${i.length===1?"it hasn't":"they haven't"} loaded yet)`:`Saved “${e}”`)});Hl.addEventListener("click",()=>tn.click());tn.addEventListener("change",async()=>{const e=tn.files?.[0];if(tn.value="",!e)return;const t=Ff(await e.text(),ge.filter(i=>i.available!==!1).map(i=>i.id));if(!t.ok){la(t.error);return}const n=t.scene;await ta({title:`Load “${n.name}”?`,body:"The music stops and the Studio reloads with this Scene's instruments, their sounds and patterns, the mix and the tempo. Save the current Scene first to keep it.",confirmLabel:"Load"})&&oc({name:n.name,bpm:n.tempo.bpm,instances:n.instances,mix:n.mix,presets:n.presets})});Ul.addEventListener("click",async()=>{await ta({title:"Start a new Scene?",body:"The music stops and the Studio reloads with one of each instrument, a fresh mix and 120 BPM. Each instrument keeps its own sound and pattern. Save the current Scene first to keep it.",confirmLabel:"New"})&&oc({name:_i,bpm:Un,instances:an(ge),mix:rn()})});function oc(e){j.running()&&j.stop(),ac=!0,window.clearTimeout(pi);const t=e.instances.map(({id:n,name:a})=>{const[i,o]=n.split("#"),s=ge.find(l=>l.id===i);return s?Pt(s,o?Number(o):1,a):null}).filter(n=>n!==null);Dt(t),vl(e.mix),zl(e.bpm,Qe()),Pl(e.name,Qe()),Et.stash({...e.presets??{}}),location.reload()}let ko=0;function la(e){Wn.textContent=e,Yn.textContent=e,window.clearTimeout(ko),ko=window.setTimeout(_e,4e3)}zt.addEventListener("change",rc);zt.addEventListener("keydown",e=>{e.key==="Enter"&&rc()});We.addEventListener("click",()=>{Wi();const e=ue.state;e==="recording"?lg():e==="arming"||e==="armed"?(ue.cancel(),la("Rec cancelled")):e==="idle"&&(ue.arm(j.playing()),sc())});async function lg(){const e=await ue.stop();e&&(Ut&&URL.revokeObjectURL(Ut.url),Ut={url:URL.createObjectURL(e.blob),take:e},Vt.href=Ut.url,Vt.download=e.name,Vt.textContent=`Save take (${e.seconds.toFixed(1)} s)`,Vt.hidden=!1)}function sc(){const e=ue.state;if(e!=="arming"&&e!=="armed")return;const t=j.clock.transport;if(!t.running||t.startTime===null){ue.schedule(null);return}const n=Math.round(Je.toContextTime(t.startTime)*V.sampleRate);ue.schedule(n+ji.latency("master"))}function cg(){const e=ue.state,t=e==="arming"||e==="armed",n=e==="recording"||e==="stopping";We.dataset.state=t?"armed":n?"recording":"idle",We.setAttribute("aria-pressed",String(n)),We.textContent=t?"Armed":n?"Stop rec":"Rec",We.disabled=e==="stopping"||!ue.supported,_e()}ue.onChange(cg);document.addEventListener("keydown",e=>{if(e.code!=="Space"||e.repeat)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable)||(e.preventDefault(),on.click())});Rt.addEventListener("keydown",e=>{if(e.target===At)return;const t=R.map(i=>i.id),n=t.indexOf(Be),a=e.key==="ArrowRight"?t[(n+1)%t.length]:e.key==="ArrowLeft"?t[(n-1+t.length)%t.length]:null;a&&(e.preventDefault(),Oe(a),document.getElementById(`tab-${a}`)?.focus())});function _e(){const e=j.running()&&xe.owner()===Bi;on.textContent=e?"Stop":"Play",on.setAttribute("aria-pressed",String(e)),document.activeElement!==zt&&(zt.value=String(Math.round(j.bpm()*10)/10));const t=j.position();Gn.value=t?`${t.bar}.${t.beat}`:"—";const n=j.peers().length;Wn.textContent=V.state==="running"?`${n} instrument${n===1?"":"s"} on the clock`:"Audio is off: press Play to start",Yn.textContent=V.state==="running"?"":"Audio off",(ue.state==="arming"||ue.state==="armed")&&(Wn.textContent="Rec armed: waiting for sound",Yn.textContent="Rec armed"),Ui.classList.toggle("off",V.state!=="running")}j.clock.onChange(()=>{j.clock.transport.running&&(Bl=!0),j.running()||xe.clear(),sc(),_e()});xe.onChange(_e);xe.onLastOut(()=>{j.running()&&j.stop(),_e()});j.clock.onChange(()=>Ze?.render());j.peer.onPeers(_e);V.addEventListener("statechange",_e);const dg=.25;let Eo=performance.now();function lc(e){const t=Math.min(.1,(e-Eo)/1e3);Eo=e,Ze?.frame(t);const n=j.position(),a=n?`${n.bar}.${n.beat}`:"—";Gn.value!==a&&(Gn.value=a);const i=j.beatPhase(),o=i!==null&&i<dg;di.hasAttribute("data-on")!==o&&di.toggleAttribute("data-on",o),requestAnimationFrame(lc)}async function ug(){const e=document.getElementById("app");if(!e)throw new Error("Missing #app");e.append(Vl,Xn,Wl,ui,D("main",{class:"instruments"},Rt,D("div",{class:"bay"},sn,Yl)),_l.el),Ze=pf(ui,Z,{order:()=>R.map(t=>t.id),catalogue:Ri,bpm:()=>j.bpm(),onAdd:nc,onRemove:(t,n)=>void ig(t,n),onReorder:(t,n)=>ng(t,n),onRename:(t,n)=>ag(t,n),...Vn?{plugins:Vn}:{}}),V.state==="running"&&await V.suspend(),await V.audioWorklet.addModule(_f),Il(),ue.attach(),await j.start();for(const t of[Ft.a,Ft.b,Z.masterFx])t&&Go(t,j.clock,{mapper:Je});for(const t of R)Xl(t);Oe(Be),_e(),requestAnimationFrame(lc),document.documentElement.dataset.studioReady="",pg()}function pg(){const e=new Set(Et.pending());if(!e.size)return;const t=[],n=o=>R.find(s=>s.id===o)?.name??o,a=()=>{window.clearTimeout(i);const o=[...t,...Et.dropPending()].map(n);la(o.length?`Scene loaded; ${o.join(", ")} kept ${o.length===1?"its":"their"} own sound`:"Scene loaded")};Et.onApplied((o,s)=>{e.delete(o)&&(s||t.push(o),e.size||a())});const i=window.setTimeout(a,Uh)}window.__studio={ctx:V,mixer:Z,grab:ji,recorder:ue,get lastTake(){return Ut?.take??null},limiterDelay:ql,mapper:Je,transport:j,frames:$e,show:Oe,get instances(){return R},fx:Ft,plugins:Vn,channelCores:oa,get mix(){return Ze}};ug();
