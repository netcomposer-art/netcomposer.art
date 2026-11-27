const q=-48,z=24,V=-1;const R=[-48,-24,-12,0],y="−",F=e=>e>0?20*Math.log10(e):-1/0;function p(e){return e>-48?e>=0?1:(e- -48)/48:0}function E(e){return e>0?e>=24?1:e/24:0}function A(e,n=!1){if(n)return`${e>.05?y:""}${Math.abs(e).toFixed(1)} dB`;if(!(e>-48))return"—";const o=Math.round(e*10)/10;return`${o<0?y:o>0?"+":""}${Math.abs(o).toFixed(1)}`}function u(e,n,o){const a=e.createElement("span");return a.className=n,o!==void 0&&(a.textContent=o),a}function H(e=globalThis.document){U(e);const n=e.createElement("div");n.className="nc-comp-gauge",n.setAttribute("aria-hidden","true");for(const[a,t]of[["in","In"],["gr","GR"],["out","Out"]]){n.append(u(e,"nc-comp-gauge-label",t));const i=u(e,"nc-comp-gauge-bar");i.dataset.ncGauge=a,i.append(u(e,"nc-comp-gauge-fill"),u(e,"nc-comp-gauge-peak")),a!=="gr"&&i.append(u(e,"nc-comp-gauge-hot")),a==="in"&&i.append(u(e,"nc-comp-gauge-th")),n.append(i,u(e,"nc-comp-gauge-val",a==="gr"?A(0,!0):A(-1/0)))}const o=u(e,"nc-comp-gauge-ticks");for(const a of R){const t=u(e,"",a===0?"0":`${y}${-a}`);t.style.left=`${p(a)*100}%`,o.append(t)}return n.append(u(e,""),o,u(e,"")),n}const T=`
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
`;function U(e){if(!e?.head||e.head.querySelector("style[data-nc-comp-gauge]"))return;const n=e.createElement("style");n.dataset.ncCompGauge="",n.textContent=T,e.head.append(n)}const h=new WeakMap,M=new WeakMap;function S(e,n,o){const a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return o;const t=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${n}`)??"").trim(),i=Number.parseFloat(t);return Number.isFinite(i)?t.endsWith("ms")?i/1e3:i:o}const b=e=>e.doc.defaultView?.performance?.now()??Date.now();function N(e){let n=M.get(e);if(n)return n;const o=e.defaultView;n={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1};const a=o?.IntersectionObserver;return a&&(n.io=new a(t=>{for(const i of t){const s=h.get(i.target);s&&(s.seen=i.isIntersecting,v(s))}k(n)})),e.addEventListener("visibilitychange",()=>{for(const t of n.recs)v(t);k(n)}),M.set(e,n),n}function v(e){const n=e.loop.io?e.seen&&e.el.isConnected:e.el.isConnected,o=!e.dead&&!!e.source&&n&&e.loop.doc.visibilityState!=="hidden";if(o&&!e.open){const a=typeof e.source.open=="function"?e.source.open():!0;e.open=a!==!1,e.open&&(e.loop.loud=b(e.loop))}else!o&&e.open&&(e.open=!1,e.source?.close?.(),G(e))}function k(e){let n=!1;for(const o of e.recs)o.open&&(n=!0);if(!n)return C(e);e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=b(e)),!e.raf&&!e.timer&&_(e,!1)}function _(e,n){const o=e.doc.defaultView;o&&(n?e.timer=o.setTimeout(()=>(e.timer=0,w(e,b(e))),250):typeof o.requestAnimationFrame=="function"?e.raf=o.requestAnimationFrame(a=>(e.raf=0,w(e,a))):e.timer=o.setTimeout(()=>(e.timer=0,w(e,b(e))),32))}function C(e){const n=e.doc.defaultView;e.raf&&n?.cancelAnimationFrame?.(e.raf),e.timer&&n?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function w(e,n){if(e.last&&!e.idle&&n-e.last<28)return _(e,!1);const o=e.last?Math.min(.25,(n-e.last)/1e3):32/1e3;e.last=n;let a=!1,t=!1;for(const i of e.recs){if(!i.el.isConnected){i.placed&&I(i);continue}i.placed=!0,i.open&&(a=!0,$(i,o,n)&&(e.loud=n),i.disp.some(s=>s>0)&&(t=!0))}if(!a)return C(e);e.idle=n-e.loud>1200&&!t,_(e,e.idle)}function $(e,n,o){e.fall<0&&(e.fall=S(e.el,"motion-meter-fall",.2),e.hold=S(e.el,"motion-meter-hold",1.5));let a=null;try{a=e.source.read()}catch{a=null}const t=e.on();!t&&e.wasOn&&(e.disp[1]=e.disp[2]=0,e.peakDb[1]=0,e.peakDb[2]=-1/0),e.wasOn=t;const i=F(Number(a?.in)||0),s=t?F(Number(a?.out)||0):-1/0,f=t?Math.max(0,Number(a?.gr)||0):0,r=[p(i),E(f),p(s)],g=[i,f,s],d=e.fall>0?Math.exp(-n/e.fall):0;for(let c=0;c<3;c++){const l=r[c];e.disp[c]=l>=e.disp[c]?l:l+(e.disp[c]-l)*d,e.disp[c]<.001&&(e.disp[c]=0);const m=g[c]>=e.peakDb[c];(m||o-e.peakAt[c]>e.hold*1e3)&&(m?(e.peakDb[c]=g[c],e.peakAt[c]=o):e.peakDb[c]=Math.max(c===1?f:g[c],e.peakDb[c]-n*20))}return D(e,t),i>-48||f>0}function D(e,n){const o=e.el.querySelectorAll(":scope > .nc-comp-gauge-bar"),a=e.el.querySelectorAll(":scope > .nc-comp-gauge-val"),t=n?"false":"true";e.el.dataset.ncOff!==t&&(e.el.dataset.ncOff=t);for(let r=0;r<3;r++){const g=o[r];if(!g)continue;const d=r===1,c=Math.round(e.disp[r]*1e3)/1e3,l=d?E(e.peakDb[r]):p(e.peakDb[r]),m=!d&&e.peakDb[r]>=-1?"true":"false",O=`${c}|${Math.round(l*1e3)}|${m}`;if(e.shown[r]!==O){e.shown[r]=O;const B=g.children[0],x=g.children[1];B.style.transform=`scaleX(${c})`,x.style.left=d?`${(1-l)*100}%`:`${l*100}%`,x.hidden=l<=0,g.dataset.hot=m}const L=A(e.peakDb[r],d);a[r]&&a[r].textContent!==L&&(a[r].textContent=L)}const i=e.el.querySelector(".nc-comp-gauge-th"),s=e.threshold(),f=typeof s=="number"&&Number.isFinite(s)?`${p(s)*100}%`:"";i&&i.style.left!==f&&(i.style.left=f,i.hidden=!f)}function G(e){e.disp=[0,0,0],e.peakDb=[-1/0,0,-1/0],e.peakAt=[0,0,0],e.shown=["","",""],D(e,e.on())}function I(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e),e.loop.io?.unobserve(e.el),h.get(e.el)===e&&h.delete(e.el)}function K(e,n){const o=e.ownerDocument??globalThis.document,a=N(o),t={el:e,loop:a,open:!1,dead:!1,seen:!1,placed:!1,source:n?.source??null,threshold:n?.threshold??(()=>null),on:n?.on??(()=>!0),wasOn:!0,disp:[0,0,0],peakDb:[-1/0,0,-1/0],peakAt:[0,0,0],shown:["","",""],fall:-1,hold:1.5};if(h.set(e,t),a.recs.add(t),a.io?.observe(e),G(t),!a.io){const i=o.defaultView,s=()=>{v(t),k(a)};typeof i?.requestAnimationFrame=="function"?i.requestAnimationFrame(s):setTimeout(s,0)}return{set(i){if(t.dead)return;t.threshold=i?.threshold??t.threshold,t.on=i?.on??t.on;const s=i?.source??null;s!==t.source&&(t.open&&(t.open=!1,t.source?.close?.()),t.source=s,G(t)),D(t,t.on()),v(t),k(a)},destroy(){I(t)}}}export{T as COMP_GAUGE_CSS,q as GAUGE_FLOOR_DB,z as GAUGE_GR_DB,V as GAUGE_HOT_DB,K as bindCompGauge,H as createCompGauge,E as gaugeGrPosition,p as gaugePosition,A as gaugeText};
