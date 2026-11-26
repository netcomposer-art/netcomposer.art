(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function mt(){return(performance.timeOrigin+performance.now())/1e3}const Ce=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],Fr=["Essential","Seventh","Extended","Altered","Experimental"],nt=(e,t)=>t.map(([n,o,i,r])=>({id:n,name:o,intervals:i,category:e,symbol:r})),Fe=[...nt("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...nt("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...nt("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...nt("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...nt("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],Nr=new Map(Fe.map(e=>[e.id,e])),yn={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function qe(e){if(typeof e!="string")return"major";if(Nr.has(e))return e;if(yn[e])return yn[e];const t=o=>o.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(yn).find(([o])=>t(o)===n)?.[1]??Fe.find(o=>t(o.name)===n||t(o.id)===n)?.id??"major"}function Y(e){return Nr.get(qe(e))}const On=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function zr(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),o=Math.ceil(-t/12),i=Math.floor((127-n)/12);if(o>i)throw new RangeError("Voicing spans more than the supported MIDI range.");const r=Math.max(o,Math.min(i,0))*12;return e.map(s=>s+r)}function Xe(e,t,n=0,o="compact"){const r=Y(t).intervals.map(l=>On(e,0,127)+l);for(let l=0;l<On(n,0,r.length-1);l++){const c=r.shift(),d=r[r.length-1];r.push(c+Math.ceil((d-c+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[o]??0;return zr(r.map((l,c)=>l+12*Math.floor(c*s/Math.max(1,r.length-1))))}function nl(e,t=1){return[...new Set(Array.from({length:On(t,1,4)},(n,o)=>e.map(i=>i+o*12)).flat().filter(n=>n>=0&&n<=127))]}function al(e,t){const n=[...new Set(e)].sort((r,s)=>r-s),o=n.length;if(o<2)return n;const i=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return i;case"down-up":return i.map(r=>n[o-1-n.indexOf(r)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const r=[];for(let s=0,l=o-1;s<=l;s++,l--)r.push(n[s]),s!==l&&r.push(n[l]);return r}case"inside-out":return n.map((r,s)=>({note:r,i:s})).sort((r,s)=>Math.abs(r.i-(o-1)/2)-Math.abs(s.i-(o-1)/2)||r.i-s.i).map(r=>r.note);case"pendulum":{const r=Math.floor((o-1)/2);return[...i.slice(r),...i.slice(0,r)]}case"blossom-up":case"blossom-down":{const r=Math.floor((o-1)/2),s=t==="blossom-up"?1:-1,l=[n[r]];for(let c=1;l.length<o;c++)for(const d of[r+s*c,r-s*c])d>=0&&d<o&&l.push(n[d]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const r=t.startsWith("low"),s=r?n[0]:n[o-1],l=r?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(c=>[s,c])}default:return n}}const ol=16,Hn={hits:5,steps:8,rotate:0};function Ea(e){const t=(o,i)=>typeof o=="number"&&Number.isFinite(o)?Math.round(o):i,n=Math.max(1,Math.min(ol,t(e?.arpSteps,Hn.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,Hn.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function Aa(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}const fo=e=>Array.from({length:e.steps},(t,n)=>Aa(e,n)?"x":".").join("");function rl(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let o=t-t%e.steps;o<t;o++)Aa(e,o)&&n++;return n}const il=1592598566;function sl(e){let t=(Math.imul(e^il,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const go=new Map;function ll(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let o=go.get(e);(!o||o.step>n)&&(o={step:0,pos:0});let{step:i,pos:r}=o;for(;i<n;i++){const s=sl(i+1);r=(r+(s<.5?1:s<.75?0:e-1))%e}return go.set(e,{step:i,pos:r}),r}function cl(e,t,n,o=Hn,i=Math.random){if(t<1)return null;const r=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(i()*t)));if(e==="walk")return ll(t,n);if(e==="euclidean"){const s=Ea({arpHits:o.hits,arpSteps:o.steps,arpRotate:o.rotate}),l=Math.max(0,Math.floor(n));return Aa(s,l)?r(rl(s,l)):null}return r(n)}const Re=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}],bo={none:"off",chord:"off",updown:"up-down","up-and-down":"up-down",downup:"down-up","down-and-up":"down-up","down-up-legacy":"down-up","off-chord":"off",rand:"random",played:"as-played",order:"as-played",converge:"outside-in",diverge:"inside-out","thumb-up":"low-and-up","thumb-down":"low-and-down","pinky-up":"hi-and-up","pinky-down":"hi-and-down","high-and-up":"hi-and-up","high-and-down":"hi-and-down",euclid:"euclidean",drunk:"walk"},vo=new Set(Re.map(e=>e.id)),yo=new Map(Re.map(e=>[e.num,e.id]));function Pr(e){if(typeof e=="number")return Number.isInteger(e)?yo.get(e)??null:null;if(typeof e!="string")return null;if(/^\s*\d+\s*$/.test(e))return yo.get(Number(e))??null;if(vo.has(e))return e;const t=e.trim().toLowerCase().replace(/\(legacy\)/g,"").replace(/&/g,"-and-").replace(/[\s_/]+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"");return vo.has(t)?t:bo[t]?bo[t]:Re.find(o=>o.name.toLowerCase().replace(/\s*\(legacy\)/,"")===e.trim().toLowerCase())?.id??null}Re.map(e=>({value:e.id,label:e.name}));const Ne=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}],dl=Ne.map(e=>e.id),Vn=e=>Ne.find(t=>t.id===e)?.kind??"repeat",pl=15,Dr=40,Z=e=>[...e].sort((t,n)=>t-n);function qr(e,t){const n=Z(e);for(let o=0;o<t;o++){const i=n.shift(),r=n[n.length-1]??i;n.push(i+Math.ceil((r-i+1)/12)*12)}return n}const It=e=>qr(e,1);function ul(e,t){const n=e[0];return n-((n-t)%12+12)%12}function hl(e,t){const n=Z(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return Z([n[0],...n.slice(2),n[1]+12]);case 2:return Z([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return Z([n[0]-12,n[2],n[1]+12,...n.slice(3).map(i=>i+12)]);default:return n}}function ml(e,t,n,o=Math.random){const i=Math.max(1,Math.min(t,3)),r=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(i-r%i)%i;case"walk-up-down":{if(i<2)return 0;const s=2*i-2,l=r%s;return l<i?l:s-l}case"walk-random":return Math.min(i-1,Math.floor(o()*i));default:return r%i}}function jr(e,t,n,o,i=Math.random){const r=Z(t);if(!r.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:r,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:qr(r,ml(e,r.length,n,i)),velocity:.9};case"alberti":return{notes:[[r[0],r[2]??r[r.length-1],r[1]??r[0],r[2]??r[r.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(o/2-Math.round(o/2))<1e-6;return{notes:r,velocity:s?1:.45}}case"drift":return{notes:hl(r,n),velocity:.9};default:return null}}function Rr(e,t,n,o,i=t){const r=Z(t);if(!r.length)return[];const s=(c,d,p,u)=>c.map(h=>({step:h,len:d,notes:p,velocity:u})),l=ul(r,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,It(r),.75),...s([8],3,[l-12],1),...s([12],2,It(r),.75)];case"charleston":return s([0,6],2,r,.9);case"skank":return s([4,12],1,It(r),.9);case"house":return s([2,6,10,14],1,It(r),.9);case"montuno":{const c=l+(o[1]??4),d=l+(o[2]??7),p=o[3]!==void 0&&o[3]<12?l+o[3]:l+12,u=[l,l+12],h=[c,d];return[[0,u],[3,h],[5,u],[6,h],[8,[d,p]],[10,u],[13,h],[14,[d,l+12]]].map(([m,g])=>({step:m,len:1,notes:Z(g),velocity:.85}))}case"push":return[...s([0],6,r,.9),...s([6],2,r,.9),{step:14,len:2,notes:Z(i),velocity:.9,next:!0}];case"strum":{const c=[...r,r[0]+12];return[{step:0,len:3.5,notes:c,velocity:.95,strum:"down"},{step:8,len:3.5,notes:c,velocity:.75,strum:"up"}]}default:return[]}}function fl(e,t,n,o,i,r,s=()=>0){const l=Math.max(.1,Math.min(1,r/100));if(Vn(e)==="bar")return Rr(e,t,n,o).map(p=>({...p,len:p.len*l}));const c=16/i,d=[];for(let p=0;p*c<16-1e-9;p++){const u=jr(e,t,p,p*c/4,s);u&&u.notes.length&&d.push({step:p*c,len:c*l,notes:u.notes,velocity:u.velocity})}return d}function gl(e,t,n){const o=n==="down"?Z(e):Z(e).reverse(),i=Math.max(0,Math.min(Dr,t))/1e3;return o.map((r,s)=>({midi:r,offset:s*i}))}const wo=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function bl(e){const t=new Set(e.map(r=>(r%12+12)%12)),n=r=>t.has(r);let o;const i=n(3)&&!n(4);return i&&n(6)&&n(9)?o=[14]:i&&n(6)?o=[17]:n(4)&&n(8)&&!n(7)?o=[14]:n(4)&&n(10)?o=[14,21]:n(4)?o=[14,18,21]:n(3)?o=[14,17]:n(5)||n(2)?o=[14,21]:o=[14],o.filter(r=>!n(r%12))}function vl(e,t,n,o=Math.random){const i=bl(n);if(!i.length||!e.length)return null;const r=(t+i[Math.min(i.length-1,Math.floor(o()*i.length))])%12,s=Math.max(...e),l=s+1+((r-(s+1))%12+12)%12;return l<=127?l:null}function Kt(e,t,n=0,o="compact"){const i=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),r=Math.max(0,Math.min(i.length-1,Math.round(n)||0));for(let l=0;l<r;l++){const c=i.shift(),d=i[i.length-1];i.push(c+Math.ceil((d-c+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[o]??0;return zr(i.map((l,c)=>l+12*Math.floor(c*s/Math.max(1,i.length-1))))}function yl(e,t){const n=Z(e),o=Z(t);if(n.length===o.length)return n.reduce((r,s,l)=>r+Math.abs(s-o[l]),0);const i=(r,s)=>Math.min(...s.map(l=>Math.abs(l-r)));return n.reduce((r,s)=>r+i(s,o),0)+o.reduce((r,s)=>r+i(s,n),0)}function wl(e,t,n,o,i,r="compact",s){const l=Kt(t,n,s??i,r);if(!e||!e.length)return l;let c=l,d=1/0,p=1/0;const u=s!==void 0?[s]:n.map((h,m)=>m);for(const h of u)for(const m of[-24,-12,0,12]){const g=Kt(t,n,h,r).map(b=>b+m);if(g[0]<o-7||g[0]>o+12||g[0]<0||g[g.length-1]>127)continue;const v=yl(g,e),f=Math.abs(g.reduce((b,x)=>b+x,0)/g.length-e.reduce((b,x)=>b+x,0)/e.length);(v<d-1e-9||Math.abs(v-d)<1e-9&&f<p-1e-9)&&(c=g,d=v,p=f)}return c}const Br=["Pop / Rock","Blues","Jazz","Soul / R&B / Neo-soul","Gospel","EDM / House / Trance","Cinematic / Ambient","Latin / Flamenco","Lo-fi / Chill","Modal"],xl={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},w=(e,t,n,o=1,i={})=>({degree:e,chord:t,numeral:n,bars:o,...i}),L="major",G="minor",I="dominant-7",z="minor-7",X="major-7",wn="half-diminished-7",xn="diminished-7",N=(e,t,n,o,i,r)=>({id:e,group:t,name:n,level:o,tonality:i,chords:r,short:xl[t]}),xo=e=>[w(0,I,"I7"),w(e==="IV7"?5:0,I,e),w(0,I,"I7"),w(0,I,"I7"),w(5,I,"IV7"),w(5,I,"IV7"),w(0,I,"I7"),w(0,I,"I7"),w(7,I,"V7"),w(5,I,"IV7"),w(0,I,"I7"),w(7,I,"V7")],dn=[N("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[w(0,L,"I"),w(7,L,"V"),w(9,G,"vi"),w(5,L,"IV")]),N("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[w(9,G,"vi"),w(5,L,"IV"),w(0,L,"I"),w(7,L,"V")]),N("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[w(0,L,"I"),w(9,G,"vi"),w(5,L,"IV"),w(7,L,"V")]),N("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[w(0,L,"I"),w(10,L,"♭VII"),w(5,L,"IV",2)]),N("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[w(0,L,"I",.5),w(7,L,"V",.5),w(9,G,"vi",.5),w(4,G,"iii",.5),w(5,L,"IV",.5),w(0,L,"I",.5),w(5,L,"IV",.5),w(7,L,"V",.5)]),N("blues-12","Blues","12-bar",1,"blues",xo("I7")),N("blues-12-quick","Blues","12-bar quick change",2,"blues",xo("IV7")),N("blues-minor","Blues","Minor blues",2,"minor",[w(0,z,"i7"),w(0,z,"i7"),w(0,z,"i7"),w(0,z,"i7"),w(5,z,"iv7"),w(5,z,"iv7"),w(0,z,"i7"),w(0,z,"i7"),w(8,I,"♭VI7"),w(7,I,"V7"),w(0,z,"i7"),w(7,I,"V7")]),N("blues-jazz","Blues","Jazz blues",3,"blues",[w(0,I,"I7"),w(5,I,"IV7"),w(0,I,"I7"),w(7,z,"v7",.5),w(0,I,"I7",.5),w(5,I,"IV7"),w(6,xn,"♯iv°7"),w(0,I,"I7"),w(9,I,"VI7"),w(2,z,"ii7"),w(7,I,"V7"),w(0,I,"I7",.5),w(9,I,"VI7",.5),w(2,z,"ii7",.5),w(7,I,"V7",.5)]),N("jazz-2-5-1","Jazz","ii–V–I",1,"major",[w(2,z,"ii7"),w(7,I,"V7"),w(0,X,"Imaj7",2)]),N("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[w(2,wn,"iiø7"),w(7,"7b9","V7♭9"),w(0,"minor-6","i6",2)]),N("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[w(0,X,"Imaj7",.5),w(9,z,"vi7",.5),w(2,z,"ii7",.5),w(7,I,"V7",.5)]),N("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[w(4,z,"iii7",.5),w(9,I,"VI7",.5),w(2,z,"ii7",.5),w(7,I,"V7",.5)]),N("jazz-autumn","Jazz","Autumn cycle",3,"minor",[w(5,z,"iv7"),w(10,I,"♭VII7"),w(3,X,"♭IIImaj7"),w(8,X,"♭VImaj7"),w(2,wn,"iiø7"),w(7,"7b9","V7♭9"),w(0,z,"i7",2)]),N("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[w(0,X,"Imaj7",.5),w(3,I,"♭III7",.5),w(8,X,"♭VImaj7",.5),w(11,I,"VII7",.5),w(4,X,"IIImaj7"),w(10,z,"♭vii7",.5),w(3,I,"♭III7",.5),w(8,X,"♭VImaj7",.5),w(11,I,"VII7",.5),w(4,X,"IIImaj7",.5),w(7,I,"V7",.5),w(0,X,"Imaj7"),w(6,z,"♯iv7",.5),w(11,I,"VII7",.5)]),N("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[w(0,z,"i7"),w(5,I,"IV7")]),N("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[w(5,X,"IVmaj7"),w(4,z,"iii7"),w(2,z,"ii7"),w(0,X,"Imaj7")]),N("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[w(5,X,"IVmaj7"),w(4,I,"III7"),w(9,z,"vi7"),w(7,z,"v7",.5),w(0,I,"I7",.5)]),N("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[w(2,"minor-9","ii9"),w(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),w(0,"major-9","Imaj9",2)]),N("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[w(0,L,"I"),w(5,L,"IV",.5),w(6,xn,"♯iv°7",.5)]),N("gospel-7-3-6","Gospel","7–3–6",3,"major",[w(11,wn,"viiø7"),w(4,I,"III7"),w(9,z,"vi7",2)]),N("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[w(0,L,"I",.5),w(0,I,"I7",.5),w(5,L,"IV",.5),w(6,xn,"♯iv°7",.5),w(0,L,"I/V",2,{inversion:2})]),N("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[w(0,G,"i"),w(8,L,"VI"),w(3,L,"III"),w(10,L,"VII")]),N("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[w(0,G,"i"),w(10,L,"VII"),w(8,L,"VI"),w(10,L,"VII")]),N("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[w(0,z,"i7"),w(5,z,"iv7")]),N("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[w(0,G,"i"),w(8,L,"VI"),w(10,L,"VII"),w(7,G,"v")]),N("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[w(5,G,"iv"),w(0,G,"i")]),N("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[w(0,L,"I"),w(8,L,"♭VI"),w(10,L,"♭VII"),w(0,L,"I")]),N("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[w(0,L,"I"),w(4,L,"III")]),N("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[w(0,L,"I"),w(2,L,"II")]),N("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[w(0,G,"i"),w(10,L,"♭VII"),w(8,L,"♭VI"),w(7,L,"V")]),N("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[w(0,G,"i"),w(5,G,"iv"),w(7,I,"V7",2)]),N("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[w(0,X,"Imaj7",2),w(2,I,"II7",2),w(2,z,"ii7"),w(7,I,"V7")]),N("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[w(2,"minor-9","ii9"),w(7,"dominant-9","V9"),w(0,"major-9","Imaj9"),w(9,"minor-9","vi9")]),N("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[w(5,X,"IVmaj7"),w(4,z,"iii7"),w(9,z,"vi7",2)]),N("modal-dorian","Modal","Dorian i–IV",1,"dorian",[w(0,G,"i"),w(5,L,"IV")]),N("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[w(0,L,"I"),w(10,L,"♭VII")]),N("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[w(0,G,"i"),w(1,L,"♭II")])],$l=dn.map(e=>e.id),Or=e=>dn.find(t=>t.id===e)??null,$o=e=>"●".repeat(e)+"○".repeat(3-e),Hr=[.5,1,2,4,0],Vr=e=>e===.5?"½":String(e),ko=e=>`${Vr(e)} bar${e>1?"s":""}`;function ue(e,t,n,o=0){const i=Or(e);if(!i)return null;const r=(n+1)*12+t;return i.chords.map((s,l)=>{const c=Y(s.chord),d=s.intervals??c.intervals,p=(t+s.degree)%12;return{index:l,root:r+s.degree,rootPc:p,chord:c.id,intervals:d,numeral:s.numeral,name:`${Ce[p]}${s.symbol??c.symbol}`,bars:o>0?o:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const pn=e=>e.reduce((t,n)=>t+n.bars,0),Sa=(e,t)=>e.slice(0,t).reduce((n,o)=>n+o.bars,0);function Eo(e,t){const n=pn(e),o=(t%n+n)%n;let i=0;for(let r=0;r<e.length;r++){if(o<i+e[r].bars-1e-9)return{chord:e[r],index:r,position:o,total:n};i+=e[r].bars}return{chord:e[e.length-1],index:e.length-1,position:o,total:n}}const Be=e=>({value:e,label:`1/${e}`,short:`1/${e}`,kind:"straight"}),Ft=e=>({value:e*2/3,label:`1/${e} dotted`,short:`1/${e}.`,kind:"dotted"}),at=e=>({value:e*3/2,label:`1/${e} triplet`,short:`1/${e}T`,kind:"triplet"}),ft=[Be(1),Ft(2),Be(2),at(2),Ft(4),Be(4),at(4),Ft(8),Be(8),at(8),Ft(16),Be(16),at(16),Be(32),at(32)].sort((e,t)=>e.value-t.value);ft.filter(e=>e.kind==="straight").map(e=>e.value);function Ma(e){return typeof e!="number"||!Number.isFinite(e)?null:ft.find(t=>Math.abs(t.value-e)<1e-6)??null}const kl=(e,t=4)=>Ma(e)?.value??t,_r=e=>Ma(e)?.short??`1/${Math.round(e)}`,Ke=16,Gr=e=>typeof e=="string"&&Fe.some(t=>t.id===qe(e))&&(qe(e)!=="major"||e==="major"||e==="Major"),Jt=(e,t)=>typeof e=="number"&&Number.isFinite(e)?(Math.round(e)%12+12)%12:t,Ca=(e,t)=>{const n=Y(t).intervals.length-1;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(n,Math.round(e))):0},La=()=>Array.from({length:Ke},()=>null);function El(e,t=0){const n=La();return Array.isArray(e)&&e.slice(0,Ke).forEach((o,i)=>{if(!o||typeof o!="object")return;const r=o;if(!Gr(r.chord))return;const s=qe(r.chord);n[i]={chord:s,root:Jt(r.root,Jt(t,0)),inversion:Ca(r.inversion,s)}}),n}function Al(e,t,n){const o=e.length;if(t===n||t<0||n<0||t>=o||n>=o)return e;const i=[...e],[r]=i.splice(t,1);return i.splice(n,0,r),i}function Sl(e,t,n){if(e.some(r=>r?.chord===t))return e;const o=e.indexOf(null);if(o<0)return e;const i=[...e];return i[o]={chord:t,root:Jt(n,0),inversion:0},i}function Ml(e,t,n){if(t<0||t>=e.length)return e;const o=[...e];return o[t]=n&&Gr(n.chord)?{chord:qe(n.chord),root:Jt(n.root,0),inversion:Ca(n.inversion,n.chord)}:null,o}function Ur(e,t,n){return{chord:e.chord,inversion:Ca(e.inversion,e.chord),...t==="pad"?{note:e.root}:{},...n&&n!=="off"?{chordProgression:"off"}:{}}}const Cl=["st","nd","rd"];function Ll(e,t,n){const o=Y(e.chord);return t==="pad"?`${n[e.root]}${o.symbol}`:o.symbol.trim()||"maj"}const Ao=e=>e.inversion>0?`${e.inversion}${Cl[e.inversion-1]??"th"} inv`:"",Tl=["off","single","chord","random"],Yr=e=>Tl.includes(e),Il={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:La(),chordPadMode:"pad"};function So(e,t,n=Math.random){if(e.mode==="off")return[];const o=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[o];if(e.mode==="random"){const c=Math.min(127,(e.octave+1)*12),d=Math.min(127,c+e.octaveRange*12-1);return[c+Math.floor(n()*(d-c+1))]}const i=Xe(o,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return i;const r=nl(i,e.arpOctaves),s=al(r,e.arp),l=cl(e.arp,s.length,t,Ea(e),n);return l===null?[]:[s[l]]}function Qt(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Fl(e,t){return t.direction&&t.strumMs>0&&e.length>1?gl(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function Nl(e,t=0){return Fl(e.notes,e).map(({midi:n,offset:o})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:o,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Mo=(e,t,n)=>Math.min(n,Math.max(t,e)),zl=1e-9;function Pl(e,t){return t>0?Math.ceil(e/t-zl)*t:e}const Co=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class kt{step=0;grid={origin:0,index:0,interval:16};comp=Co(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const o=this.settings.interval,i=4/o,r=n?Pl(t,i):t;this.grid={origin:r,index:0,interval:o},this.step=Math.max(0,Math.round(r/i));const s=this.beatsPerBar();return this.comp=Co(r,n?0:Math.floor(t/s+1e-9)*s),r}clone(t={}){const n=new kt(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const o=this.comp;return n.comp={...o,jump:o.jump?{...o.jump}:null,last:o.last?[...o.last]:null,bar:{...o.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&Vn(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,o=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const p=this.chordAt(t),u={...n,chord:p.chord,note:p.rootPc,octave:Math.floor(p.root/12)-1,...p.inversion!==void 0?{inversion:p.inversion}:{}},h=So(u,this.step,this.random);return this.step++,h.length?this.hit(t,o,h,1,null,p,!1,"arp"):null}if(Vn(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),c=this.voicingFor(l),d=jr(n.chordStyle,c,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!d||!d.notes.length?null:this.hit(t,o,d.notes,d.velocity,wo(this.beatInBar(t)),l,!0,"chord")}if(!Yr(n.mode))return this.step++,null;const i=So(n,this.step,this.random);if(this.step++,!i.length)return null;const r=n.mode==="chord",s=r?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):i[0];return{beat:t,spanBeats:o,gate:Mo(n.gate/100,.1,1),velocity:1,notes:i,kind:"plain",direction:null,strumMs:0,chord:r?this.plainChordAt():null,root:s,role:r?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,o,i,r,s,l,c){const d=this.settings,p=[...o];if(l&&d.tension>0&&this.chordRandom()*100<d.tension){const h=vl(p,s.rootPc,s.intervals,this.chordRandom);h!==null&&p.push(h)}const u=d.chordStyle==="strum"&&r?d.strum>0?d.strum:pl:d.strum;return{beat:t,spanBeats:n,gate:Mo(d.gate/100,.1,1),velocity:i,notes:p,kind:"comp",direction:r,strumMs:u,chord:s,root:s.root,role:c}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=Y(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,o=ue(n.chordProgression,n.note,n.octave,n.progressionBars);return o?.length?Eo(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,o=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),i=`${t.root}|${t.intervals.join(",")}|${o}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&i===this.comp.lastKey)return this.comp.last;const r=n.voiceLeading==="smooth"?wl(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,o,n.arpSpread,t.inversion):Kt(t.root,t.intervals,o,n.arpSpread);return this.comp.last=r,this.comp.lastKey=i,r}compBar(t){const n=this.comp.bar,o=this.settings;if(n.bar===t&&n.settings===o)return n.hits;const i=o,r=this.beatsPerBar(),s=i.chordStyle,l=this.chordAt(t*r),c=this.voicingFor(l);let d=c;if(s==="push"){const u=this.chordAt((t+1)*r);if(`${u.root}|${u.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};d=this.voicingFor(u),this.comp.last=h.last,this.comp.lastKey=h.key}}let p=Rr(s,c,l.rootPc,l.intervals,d).filter(u=>u.step/4<r-1e-9);return s==="push"&&this.comp.pushedTo===t&&(p=p.filter(u=>u.step!==0)),this.comp.bar={bar:t,settings:o,hits:p},p}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const o=this.settings,i=this.beatsPerBar(),r=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/i+1e-9),d=this.compBar(l).find(m=>l*i+m.step/4>=this.comp.from-1e-9);if(!d){this.comp.from=(l+1)*i;continue}const p=l*i+d.step/4;if(!t(p))break;if(this.comp.from=p+1e-6,n())continue;const u=d.next&&o.chordStyle==="push"?d.len+6:d.len;d.next&&(this.comp.pushedTo=l+1);const h=this.chordAt(d.next?(l+1)*i:p);r.push(this.hit(p,u/4,d.notes,d.velocity,d.strum??wo(this.beatInBar(p)),h,!0,"chord"))}return r}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const o=ue(n.chordProgression,n.note,n.octave,n.progressionBars);if(!o?.length)return null;const i=Eo(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:i.index,bar:Math.floor(i.position+1e-9)+1,bars:i.total}}jumpToChord(t,n){const o=this.settings,i=ue(o.chordProgression,o.note,o.octave,o.progressionBars);if(!i?.length||t<0||t>=i.length)return!1;const r=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/r-1e-9)*r;return this.comp.jump={at:l,origin:l-Sa(i,t)*r},!0}window(t,{muted:n=()=>!1}={}){const o=[];this.followInterval(),this.applyJump(this.nextBeat());for(let r=0;r<4096;r++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&o.push(l)}this.advance()}this.barStyleActive()?o.push(...this.barHits(r=>r<t,n)):this.syncBars();const i=[];for(const r of o)i.push(...Nl(r,++this.serial));return i.sort((r,s)=>r.startBeat-s.startBeat)}}const Dl=8,ql=1.5;function jl(e,t=0){const n={...e,mode:"chord",arp:"off",chordStyle:"block",chordProgression:"off",strum:0,tension:0},o=new kt(n,{random:Qt(1),chordRandom:Qt(2)});o.start(0);const i=o.window(4);if(!i.length)return[];const r=i[0];return i.filter(s=>s.hit===r.hit&&s.startBeat===r.startBeat).map(s=>({...s,startBeat:0,offsetSec:0,hit:t}))}const Le=1,$n=1024,Rl=[1,10,100],Bl=32,Ol=32,Wr=128,Hl=400,Vl=["off","blocked","live","paused","none"],ot=[{id:"aria:energy",key:"energy",label:"Ground Energy",group:"ground",bipolar:!1},{id:"aria:phone-tilt-x",key:"tiltX",label:"Phone Tilt X",group:"phone",bipolar:!0},{id:"aria:phone-tilt-y",key:"tiltY",label:"Phone Tilt Y",group:"phone",bipolar:!0},{id:"aria:phone-shake",key:"shake",label:"Phone Shake",group:"phone",bipolar:!1},{id:"aria:phone-heading",key:"heading",label:"Phone Heading",group:"phone",bipolar:!1}],Ot=e=>typeof e=="object"&&e!==null,U=e=>typeof e=="number"&&Number.isFinite(e),_l=(e,t=Wr)=>typeof e=="string"&&e.length>0&&e.length<=t,kn=e=>e<0?0:e>1?1:e,Gl=["live","quiet","offline","off"],Ul=["removed","hold"],Lo=e=>e<-1?-1:e>1?1:e,Yl=/^[A-Z0-9?*-]{0,8}$/i;function To(e){if(!Ot(e))return null;const{net:t,sta:n,loc:o,cha:i,name:r,rate:s}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"||typeof i!="string"||![t,n,o,i].every(l=>Yl.test(l))||!t||!n||typeof r!="string"||r.length>Wr||!U(s)||s<0||s>1e4?null:{net:t,sta:n,loc:o,cha:i,name:r,rate:s}}function Wl(e){const t=e?.length;if(!(e instanceof Float32Array)&&!Array.isArray(e)&&!ArrayBuffer.isView(e)||t!==$n)return null;const n=new Float32Array($n),o=e;for(let i=0;i<$n;i++){const r=Number(o[i]);if(!Number.isFinite(r))return null;n[i]=r<-1?-1:r>1?1:r}return n}function Xl(e){if(!Ot(e))return null;const t=e.v;if(typeof t!="number"||Math.floor(t)!==Le||!_l(e.source))return null;const n=e.source;switch(e.kind){case"energy":{if(!Array.isArray(e.frames))return null;const o=[];for(const i of e.frames.slice(0,Bl)){if(!Ot(i)||!U(i.at)||!U(i.value))return null;o.push({at:i.at,value:kn(i.value)})}return{v:Le,kind:"energy",source:n,frames:o}}case"table":{if(!U(e.seq)||e.seq<0||!U(e.at)||!U(e.rms)||e.rms<0||!Rl.includes(e.speed))return null;const o=Wl(e.samples);if(!o)return null;const i=e.station===null?null:To(e.station);if(e.station!==null&&!i)return null;const r=e.behindSec===null?null:U(e.behindSec)?e.behindSec:void 0;return r===void 0?null:{v:Le,kind:"table",source:n,seq:Math.floor(e.seq),at:e.at,speed:e.speed,station:i,behindSec:r,samples:o,rms:Math.min(1,e.rms)}}case"status":{if(!Gl.includes(e.state))return null;const o=e.station===null?null:To(e.station);if(e.station!==null&&!o)return null;const i=c=>c===null?null:U(c)?c:void 0,r=i(e.newestAgeSec),s=i(e.behindSec);if(r===void 0||s===void 0||typeof e.hold!="boolean"||typeof e.credit!="string"||e.credit.length>Hl)return null;const l={v:Le,kind:"status",source:n,state:e.state,station:o,newestAgeSec:r,behindSec:s,hold:e.hold,credit:e.credit};return U(e.retryAt)&&(l.retryAt=e.retryAt),e.recorded===!0&&(l.recorded=!0),Vl.includes(e.motion)&&(l.motion=e.motion),l}case"motion":{if(!Array.isArray(e.frames))return null;const o=[];for(const i of e.frames.slice(0,Ol)){if(!Ot(i)||!U(i.at)||!U(i.tiltX)||!U(i.tiltY)||!U(i.heading)||!U(i.shake))return null;const r=i.heading%1;o.push({at:i.at,tiltX:Lo(i.tiltX),tiltY:Lo(i.tiltY),heading:r<0?r+1:r,shake:kn(i.shake)})}return{v:Le,kind:"motion",source:n,frames:o}}case"shake":return!U(e.at)||!U(e.strength)?null:{v:Le,kind:"shake",source:n,at:e.at,strength:kn(e.strength)};case"off":return Ul.includes(e.reason)?{v:Le,kind:"off",source:n,reason:e.reason}:null;default:return null}}var Kl="nc-ui",Jl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ta={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Zt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Ql={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ze={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Zl={light:{color:Jl.color,semantic:Ta,component:Zt,runtime:Ql},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},_n=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],it=e=>`--${Kl}-${e}`,Xr="data-nc-theme",Io="nc-ui-theme-change",ec="(prefers-color-scheme: dark)",Ia=e=>e?.documentElement??null,Kr=e=>e?.defaultView?.matchMedia?.(ec)??null,tc=e=>e==="light"||e==="dark"?e:"system";function nc(e=globalThis.document){return tc(Ia(e)?.getAttribute(Xr))}function Gn(e=globalThis.document){let t=nc(e);return t!=="system"?t:Kr(e)?.matches?"dark":"light"}var Jr="data-nc-skin",ac=(_n.find(e=>e.default)??_n[0])?.id??"prussian",oc=e=>_n.some(t=>t.id===e)?e:ac;function rc(e=globalThis.document){return oc(Ia(e)?.getAttribute(Jr))}function Qr(e,t=globalThis.document){let n=Ia(t);if(!n)return()=>{};let o=()=>`${Gn(t)} ${rc(t)}`,i=o(),r=()=>{let d=o();d!==i&&(i=d,e(Gn(t)))},s=t.defaultView?.MutationObserver,l=s?new s(r):null;l?.observe(n,{attributes:!0,attributeFilter:[Xr,Jr]});let c=Kr(t);return c?.addEventListener?.("change",r),t.addEventListener(Io,r),()=>{l?.disconnect(),c?.removeEventListener?.("change",r),t.removeEventListener(Io,r)}}var Un=Ta["label-on-fill-dark"],Fo=Ta["label-on-fill-light"],ic=ze["label-min-contrast"],sc=/^#[0-9a-f]{6}$/i,lc=e=>typeof e=="string"&&sc.test(e),Ht=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function No(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=r=>{let s=(r+e/30)%12;return n-o*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Ht(i(0)*255)}${Ht(i(8)*255)}${Ht(i(4)*255)}`}function Zr(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),r=Math.min(t,n,o),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-o)/l%6):i===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function zo(e){let[t,n,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function Yn(e,t){let[n,o]=[zo(e),zo(t)].sort((i,r)=>r-i);return(n+.05)/(o+.05)}var en=e=>Yn(e,Un)>=Yn(e,Fo)?Un:Fo;function ei(e,t,n,o=ic){let i=No(e,t,n),r=en(i)===Un?1:-1;for(let s=0;s<40&&Yn(i,en(i))<o;s++)n+=r*.01,i=No(e,t,n);return i}function cc(e){let{h:t,s:n}=Zr(e),o=ei(t,Math.min(n,ze["surprise-on-max-saturation"]),ze["surprise-on-lightness"]);return{fill:e,ink:en(e),on:o,onInk:en(o)}}var dc=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function pc(e,t=Math.random){let[n,o]=ze["surprise-saturation"],[i,r]=ze["surprise-lightness"],s=ze["surprise-min-hue-gap"],l=lc(e)?Zr(e).h:null,c=t()*360;return l!==null&&dc(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),ei(c,n+t()*(o-n),i+t()*(r-i))}function uc(e){if(!e)return null;let t=cc(e);return{[it("surprise-fill")]:t.fill,[it("surprise-ink")]:t.ink,[it("surprise-on")]:t.on,[it("surprise-on-ink")]:t.onInk}}var hc=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,mc=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Po(e){let[t,n,o]=[1,3,5].map(l=>hc(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function fc([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(s=>Ht(mc(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var gc=ze["velocity-range"],ti={min:Zt.rhythm["velocity-min"],max:Zt.rhythm["velocity-max"]},Do=Object.fromEntries(Object.entries(Zl).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function bc(e,t=ti){let[n,o]=gc,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,r=(i-n)/(o-n),s=t.ink??Zt.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Po(t.min),c=Po(t.max);return{velocity:i,t:r,fill:fc(l.map((d,p)=>d+(c[p]-d)*r)),ink:s}}function qo(e,t=ti){return{[it("velocity-fill")]:bc(e,t).fill}}var vc={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},yc={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},wc={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},xc={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},un={};for(let[e,t]of Object.entries(yc))un[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(xc))un[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(wc))un[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(vc.renames.map(e=>[e.old,e.new]));function ni(e){let t=un[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function D(e){return ni(e).prop}function a(e){return`var(${D(e)})`}function $c(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(D(t)));return Number.isFinite(n)?n:0}function B(e,t){let n=ni(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let s=(o.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function ai(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function kc(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var Ec="[data-modulated], [data-modulated] *";function En(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function jo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function An(e){return`  background-image: conic-gradient(from -26.565deg at 50% 100%, ${a(e)} 53.13deg, transparent 0);`}function Ac(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${D("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${D("divider")}: ${a(`module-div-stack-${o}`)};
      ${D("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${D("text-sub")}: ${a("module-sub-stack-1")};
      ${D("divider")}: ${a("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("body-size")};
  font-weight: ${a("title-weight")};
  line-height: ${a("label-leading")};
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
  padding: ${a("page-pad-y")} ${a("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${a("page-action-gap")};
  min-width: 0;
  padding-bottom: ${a("page-head-gap")};
  border-bottom: ${a("hairline")} solid ${a("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${a("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${a("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${a("page-pad-x")} * -1);
  right: calc(${a("page-pad-x")} * -1);
  background: ${a("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${a("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${a("page-title-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${a("page-sub-gap")} 0 0; font-size: ${a("page-sub-size")}; color: ${a("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${a("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${a("control-gap")} ${a("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${a("control-gap")};
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-page-action:hover { color: ${a("text")}; border-bottom-color: ${a("text")}; }
.nc-page-action:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
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
    min-width: ${a("target-min")};
    min-height: ${a("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${a("target-min")} - ${a("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${a("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${a("target-min")} / 2.75); height: calc(${a("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${a("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${a("control-gap")};
    background: ${a("surface-page")};
    color: ${a("text")};
    border-bottom: ${a("hairline")} solid ${a("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${a("page-pad-x")} * -1);
    right: calc(${a("page-pad-x")} * -1);
    padding-inline: ${a("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${a("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${a("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${a("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${a("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${a("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${a("page-pad-x-md")} * -1);
    right: calc(${a("page-pad-x-md")} * -1);
    padding-inline: ${a("page-pad-x-md")};
  }
}
.nc-module {
  background: ${a("module-bg-adjacent-1")};
  color: ${a("text")};
  padding: ${a("module-pad")};
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${a("font-ui")};
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
  gap: ${a("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${a("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${a("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${a("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${a("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${a("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${a("title-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${a("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${a("header-gap")}; flex: none; }
.nc-index {
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${a("control-gap")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("body-size")};
  line-height: ${a("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${a("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${a("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${a("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
.nc-slim-lines {
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${a("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${a("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${a("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${a("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${a("readout-size")};
  color: ${a("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${a("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${a("name-width")} - ${a("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${a("name-width")} - ${a("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${a("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${a("module-gap")};
  row-gap: ${a("control-gap")};
  padding-bottom: ${a("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${a("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${a("control-gap")};
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  line-height: ${a("label-leading")};
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
  bottom: calc(-1 * ${a("control-gap")});
  width: max(100%, ${a("target-min")});
  height: max(100%, ${a("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${a("text-sub")}; color: ${a("text")}; }
.nc-tap:active { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-tap:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${a("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  padding: ${a("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${a("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${a("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${a("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${a("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${a("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${a("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${a("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${a("hairline")};
  background: ${a("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${a("hairline")};
  background: ${a("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${a("hairline")};
  background: ${a("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${a("slider-thumb-size")};
  height: ${a("slider-thumb-size")};
  margin-top: calc(${a("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${a("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${a("slider-thumb-size")};
  height: ${a("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${a("slider-thumb")};
  transition: none;
}
${Ec} { transition: none; }
.nc-range:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${a("hairline")} solid ${a("text")};
  background: transparent;
  color: ${a("text")};
  min-height: ${a("target-min")};
  padding: ${a("button-pad-y")} 0;
  font-size: ${a("readout-size")};
  letter-spacing: ${a("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${a("transition-feedback")};
}
.nc-btn:hover { background: ${a("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${a("accent")};
  border-color: ${a("accent")};
  color: ${a("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${a("focus-width-strong")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
.nc-btn:disabled { color: ${a("text-sub")}; border-color: ${a("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${a("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${a("text")}; }
.nc-toggle:hover { border-bottom-color: ${a("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${a("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${a("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${a("rhythm.track-solo")};
  border-bottom-color: ${a("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  margin-bottom: ${a("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${a("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("tab-size")};
  font-weight: ${a("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${a("label-size")}; padding-inline: ${a("control-gap")}; }
.nc-seg > button:hover { color: ${a("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${a("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${a("hairline")} * -1);
  height: ${a("tab-mark")};
  background: ${a("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: calc(${a("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("divider")};
  border-radius: 0;
  color: ${a("text")};
  font-size: ${a("body-size")};
  padding: ${a("control-gap")} ${a("select-pad-end")} ${a("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${a("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${a("accent")}; }
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; LUPA's ▾ for every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${An("text-sub")}
  background-size: ${a("select-mark")} ${a("select-mark")};
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${An("text")}
}
:is(.nc-select, .nc-dd):disabled {
${An("divider")}
}
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${a("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${a("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${a("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${a("slot-size")};
  width: ${a("slot-size")};
  max-width: ${a("slot-size")};
  min-width: 0;
  height: ${a("slot-size")};
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
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("slot-font-size")};
  line-height: ${a("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${a("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${a("text-sub")};
  color: ${a("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${a("accent")};
  color: ${a("accent")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${a("accent")};
  outline: ${a("focus-width")} solid ${a("accent-faint")};
  outline-offset: ${a("hairline")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${a("accent")};
  background: ${a("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${a("control-gap")};
  right: ${a("control-gap")};
  width: ${a("control-gap")};
  height: ${a("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${a("sparkle-size")};
  width: ${a("sparkle-size")};
  height: ${a("sparkle-size")};
  margin-inline: ${a("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${a("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${a("target-min")};
  width: ${a("target-min")};
  min-height: ${a("target-min")};
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  background: ${a("surprise-fill")};
  color: ${a("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${a("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${a("target-min")} / 2); height: calc(${a("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${a("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-sparkle svg { width: ${a("sparkle-icon-size")}; height: ${a("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${a("text")}; }
.nc-sparkle:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${a("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${a("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${a("name-width")};
  width: ${a("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${a("beat-gap")} - ${a("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${a("row-inset")});
  padding-inline: ${a("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${a("accent-tint")};
  box-shadow: inset ${a("marker-width")} 0 0 ${a("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${a("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${a("text")};
  text-decoration: underline;
  text-decoration-color: ${a("accent")};
  text-decoration-thickness: ${a("hairline")};
  text-underline-offset: ${a("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${a("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${a("move-row-gap")}; margin-top: ${a("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${a("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${a("move-label-width")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${a("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${a("move-size")};
  height: ${a("move-size")};
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${a("move-icon")}; height: ${a("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${a("text")}; border-color: ${a("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-moves-btn:disabled { color: ${a("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${a("target-min")}; height: ${a("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${a("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${a("text-sub")}; border-color: ${a("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${a("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${a("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${a("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${a("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${a("slider-pitch")};
  height: ${a("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${a("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${a("rhythm.track-mute")};
  border-color: ${a("rhythm.track-mute")};
  color: ${a("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${a("rhythm.track-solo")};
  border-color: ${a("rhythm.track-solo")};
  color: ${a("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${a("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${a("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
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
  background: ${a("velocity-fill")};
  border-color: ${a("velocity-fill")};
  color: ${a("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${a("playhead-width")} solid ${a("rhythm.playhead")};
  outline-offset: ${a("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${a("rhythm.bar-accent")}; }
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${a("rhythm.step-mark-inset")};
  bottom: ${a("rhythm.step-mark-inset")};
  font-family: ${a("font-readout")};
  font-size: ${a("rhythm.step-mark-size")};
  font-weight: ${a("control-weight")};
  line-height: 1;
  color: ${a("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${a("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${a("rhythm.step-mark-inset")} + ${a("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${a("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${a("control-gap")};
  margin-inline: calc((${a("control-gap")} + ${a("rhythm.step-gap")}) / -2);
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
  width: ${a("hairline")};
  height: ${a("target-min")};
  max-height: calc(${a("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${a("hairline")} solid ${a("text-sub")};
  background: ${a("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${a("text")}; border-color: ${a("text")}; }
.nc-len-handle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${a("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${a("accent")}; }
.nc-pad[data-out="true"] { border-color: ${a("divider")}; border-style: dashed; background: transparent; color: ${a("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${a("focus-width")} * 2) 0 0 ${a("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${a("focus-width")} * 2) 0 0 ${a("text")}, inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
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
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${a("module-gap")};
  margin-bottom: ${a("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${a("target-min")} / 3); height: calc(${a("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${a("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${a("target-min")};
  min-height: ${a("target-min")};
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${a("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${a("text")}; border-color: ${a("text")}; color: ${a("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${a("control-gap")};
  color: ${a("text-sub")};
  font-weight: ${a("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${a("text")}; border-bottom-color: ${a("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${a("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${a("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${a("target-min")} * 1.25);
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${a("control-gap")} ${a("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${a("velocity-fill")};
  border-color: ${a("velocity-fill")};
  color: ${a("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${a("rhythm.accent-mark-size")}) 0 0 ${a("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${a("playhead-width")} solid ${a("rhythm.playhead")};
  outline-offset: ${a("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${a("divider")}; color: ${a("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${a("text-sub")}; border-color: ${a("text-sub")}; color: ${a("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
.nc-step:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${a("playhead-width")};
  outline-offset: ${a("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${a("module-pad")} * -1);
  padding: ${a("stack-card-pad-y")} ${a("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${a("module-gap")} 0;
  font-size: ${a("body-size")};
  font-weight: ${a("fx-name-weight")};
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
  gap: ${a("module-gap")};
  margin-bottom: ${a("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${a("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${a("control-gap")}; left: ${a("control-gap")}; z-index: 1; }
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
  padding: ${a("hairline")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${a("text")}; }
.nc-fold-toggle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${a("control-gap")} * 1.5);
  height: calc(${a("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${a("motion-press")} ${a("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${a("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${a("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${a("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${a("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${a("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${a("control-gap")};
  border-bottom: ${a("hairline")} solid transparent;
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  line-height: ${a("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${a("text")}; border-bottom-color: ${a("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${a("body-size")};
  font-weight: ${a("fx-name-weight")};
  color: ${a("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${a("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${a("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${a("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${a("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${a("slot-gap")};
  height: ${a("level-steps-height")};
  padding: calc(${a("slot-gap")} * 2);
  background: ${a("eq-graph-bg")};
  border-radius: ${a("slot-radius")};
  box-shadow: inset 0 0 0 ${a("hairline")} ${a("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${a("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${a("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${a("beat-gap")} - ${a("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${a("level-steps-bar")}; }
.nc-lsteps-env { fill: ${a("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${a("level-steps-curve")}; stroke-width: ${a("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${a("divider")}; stroke-width: ${a("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${a("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${a("hairline")} ${a("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${a("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${a("playhead-width")} solid ${a("playhead")}; outline-offset: ${a("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${a("level-steps-free")}; outline-width: ${a("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${a("playhead-width")} * -1) 0 0 ${a("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${a("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${a("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${a("slot-gap")} * 2) * -1));
  padding: calc(${a("slot-gap")} / 2) calc(${a("slot-gap")} * 2);
  border-radius: ${a("slot-radius")};
  background: ${a("accent")};
  color: ${a("on-accent")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${a("slot-gap")};
  padding: ${a("slot-gap")} calc(${a("slot-gap")} * 2) 0;
  font-family: ${a("font-readout")};
  font-size: ${a("slot-font-size")};
  line-height: 1;
  color: ${a("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${a("hairline")} solid ${a("divider")}; margin-top: ${a("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${a("slot-gap")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${a("slot-gap")} 0 ${a("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${a("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${a("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${a("hairline")} * -1);
  height: ${a("tab-mark")};
  background: ${a("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${a("label-size")} * 1.8); height: calc(${a("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${a("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${a("slot-gap")};
  padding: calc(${a("slot-gap")} * 2);
  background: ${a("surface-page")};
  border-radius: ${a("slot-radius")};
  box-shadow: 0 0 0 ${a("hairline")} ${a("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${a("slot-gap")} * 2); font-family: ${a("font-readout")}; font-size: ${a("readout-size-small")}; color: ${a("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${a("slot-gap")} * 2); border-radius: ${a("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${a("on-accent")}; background: ${a("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${a("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${a("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${a("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${a("eq-graph-height")};
  background: ${a("eq-graph-bg")};
  border-radius: ${a("slot-radius")};
  box-shadow: inset 0 0 0 ${a("hairline")} ${a("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${a("eq-curve")};
  position: absolute;
  width: ${a("eq-node-size")};
  height: ${a("eq-node-size")};
  margin: calc(${a("eq-node-size")} / -2) 0 0 calc(${a("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${a("hairline")} ${a("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${a("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${a("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${a("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${a("target-min")};
  height: ${a("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${a("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${a("motion-press")} ${a("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${a("hairline")} * 2) ${a("eq-graph-bg")}, 0 0 0 calc(${a("hairline")} * 2 + ${a("focus-width")}) ${a("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${a("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${a("hairline")} ${a("control-gap")};
  border-radius: ${a("slot-radius")};
  background: ${a("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${a("hairline")} ${a("divider")};
  color: ${a("text")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  line-height: ${a("label-leading")};
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
  padding: ${a("hairline")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${a("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-fx-close { font-size: ${a("title-size")}; padding-inline: ${a("control-gap")}; }
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
  padding: 0 ${a("hairline")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${a("control-gap")} * -1);
  right: calc(${a("control-gap")} * -1);
  height: max(100%, calc(${a("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${a("text")}; }
.nc-fx-remove:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${a("control-gap")} * 2.5); height: calc(${a("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${a("control-gap")} * 1.1);
  height: calc(${a("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${a("motion-press")} ${a("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${a("hairline")} * 1.5); border-top-width: calc(${a("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${a("hairline")} * 1.5); border-top-width: calc(${a("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${a("hairline")} * 1.5); border-bottom-width: calc(${a("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${a("hairline")} * 1.5); border-bottom-width: calc(${a("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${a("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${a("module-pad")} * 2);
  row-gap: ${a("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${a("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${a("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${a("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${a("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${a("hairline")} ${a("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${a("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${a("control-gap")};
  cursor: pointer;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
}
.nc-ui-more > summary:hover { color: ${a("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${a("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${a("module-gap")};
  row-gap: ${a("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${a("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${a("text-sub")};
}
.nc-group-toggle:hover { color: ${a("text")}; }
.nc-group-toggle:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${a("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${a("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${a("control-gap")};
  border: 0;
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${a("text")}; border-bottom-color: ${a("accent")}; }
.nc-ui-switch:hover { color: ${a("text")}; border-bottom-color: ${a("text")}; }
.nc-ui-switch:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
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
    width: max(100%, ${a("target-min")});
    height: max(100%, ${a("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${a("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  padding: ${a("module-pad")};
  background: ${a("surface-page")};
  border-top: ${a("hairline")} solid ${a("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${a("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${a("title-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  color: ${a("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${a("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${a("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${a("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${a("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${a("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${a("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${a("danger")}; }
.nc-knob {
  width: ${a("knob-size")};
  height: ${a("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${a("hairline")} solid ${a("divider")};
  background: ${a("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${a("control-gap")};
  width: ${a("hairline")};
  height: ${a("control-gap")};
  background: ${a("text")};
  transform-origin: center ${a("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${a("control-gap")} ${a("header-gap")};
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
  border-bottom: ${a("hairline")} solid transparent;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  padding: ${a("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${a("target-min")}; min-height: ${a("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${a("control-gap")}; margin-bottom: ${a("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${a("text")};
  border-bottom-color: ${a("accent")};
}
.nc-choice:focus-visible {
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${a("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${a("target-min")} * 1.5);
  padding: ${a("control-gap")} ${a("control-gap")} ${a("control-gap")} calc(${a("control-gap")} * 2);
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${a("control-gap")};
  inset-inline-start: ${a("hairline")};
  width: ${a("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${a("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${a("text-sub")}; font-size: ${a("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${a("control-gap")};
  inset-inline-end: ${a("control-gap")};
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${a("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${a("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${a("control-gap")};
  border-color: ${a("divider")};
  background: ${a("divider")};
  color: ${a("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${a("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${a("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${a("accent")}; box-shadow: inset 0 0 0 ${a("hairline")} ${a("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${a("target-min")};
  padding: 0 ${a("control-gap")};
  border: ${a("hairline")} solid ${a("accent")};
  border-radius: ${a("slot-radius")};
  background: ${a("surface-page")};
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${a("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${a("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${a("control-gap")};
  min-width: ${a("name-width")};
  padding: ${a("control-gap")};
  background: ${a("surface-page")};
  border: ${a("hairline")} solid ${a("divider")};
  color: ${a("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${a("target-min")};
  border: 0;
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${a("target-min")};
  margin-block: calc((${a("slider-pitch")} - ${a("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${a("target-min")}; height: ${a("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${a("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${a("target-min")}); right: calc(${a("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${a("target-min")});
    height: max(100%, ${a("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${a("target-min")} - ${a("slider-pitch")}) / 2);
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
  outline: ${a("focus-width")} solid ${a("focus-ring")};
  outline-offset: ${a("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${a("target-min")};
  height: ${a("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${a("target-min-coarse")}; height: ${a("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${a("module-gap")};
  width: calc(${a("name-width")} * 6);
  max-width: calc(100vw - 2 * ${a("module-gap")});
  padding: ${a("module-gap")};
  background: ${a("surface-page")};
  border: ${a("hairline")} solid ${a("divider")};
  color: ${a("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${a("focus-width")} solid ${a("text")};
  outline-offset: ${a("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${a("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${a("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${a("module-gap")};
  min-height: ${a("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${a("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${a("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${a("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${a("target-min")};
  min-height: ${a("target-min")};
  border: 0;
  background: none;
  color: ${a("text")};
  font-family: ${a("font-ui")};
  font-size: ${a("label-size")};
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${a("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${a("hairline")} 0 0;
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
  gap: ${a("toast-gap")};
  max-width: calc(100vw - 2 * ${a("toast-offset")});
  min-height: ${a("toast-target")};
  padding: 0 0 0 ${a("toast-pad-x")};
  border-radius: ${a("toast-radius")};
  background: ${a("toast-bg")};
  color: ${a("toast-text")};
  font-family: ${a("font-ui")};
  font-size: ${a("toast-font-size")};
  line-height: ${a("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${a("motion-fade")} ${a("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${a("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${a("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${a("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${a("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${a("motion-fade-out")} ${a("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${a("toast-pad-x")} / 2) calc(${a("toast-pad-x")} * 0.75);
  border-radius: ${a("toast-radius")};
  background: ${a("toast-bg")};
  color: ${a("toast-text")};
  font-family: ${a("font-ui")};
  font-size: ${a("toast-font-size")};
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
  min-width: ${a("toast-target")};
  min-height: ${a("toast-target")};
  padding: 0 ${a("toast-pad-x")};
  border: 0;
  background: none;
  color: ${a("toast-action")};
  font: inherit;
  font-weight: ${a("title-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${a("focus-width")} solid ${a("toast-action")};
  outline-offset: calc(-2 * ${a("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${a("hairline")};
  height: ${a("hairline")};
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
  margin-inline: calc(${a("module-pad")} * -1);
  margin-bottom: calc(${a("module-pad")} * -1);
  border-top: ${a("hairline")} solid ${a("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${a("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${a("module-pad")} ${a("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${a("module-bg-stack-1")};
  ${D("text-sub")}: ${a("module-sub-stack-1")};
  ${D("divider")}: ${a("module-div-stack-1")};
  ${D("slider-track")}: ${a("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${a("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  border-inline-end: ${a("hairline")} solid ${a("module-div-stack-1")};
  background: ${a("module-bg-stack-1")};
  ${D("text-sub")}: ${a("module-sub-stack-1")};
  ${D("divider")}: ${a("module-div-stack-1")};
  ${D("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${D("text-sub")}: ${a("module-sub-stack-1")};
  ${D("divider")}: ${a("module-div-stack-1")};
  ${D("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${D("text-sub")}: inherit;
  ${D("divider")}: inherit;
  ${D("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${a("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${a("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${a("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${a("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${a("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${a("fx-card-width")}; }
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
    width: calc(${a("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${a("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${a("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${a("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${a("module-gap")} * 3), 100% ${a("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${a("module-pad")} * -1) calc(${a("module-gap")} * -1);
    padding: ${a("stack-card-pad-y")} ${a("module-pad")} calc(${a("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${a("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${a("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${a("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${a("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${a("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${a("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${a("fx-card-width")};
    margin-inline-end: calc(${a("fx-card-width")} * -1);
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
    gap: ${a("module-gap")};
    height: ${a("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${a("target-min")};
  height: ${a("target-min")};
  margin: 0;
  padding: 0;
  border: ${a("hairline")} solid ${a("text-sub")};
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${a("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${a("divider")}; border-color: ${a("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${a("control-gap")} * 2.5);
  height: calc(${a("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${a("hairline")} * 2) calc(${a("hairline")} * 2) 0 0;
  transform: translateX(calc(${a("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${a("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${a("text")};
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
  --nc-strip-ms-row: ${a("slider-pitch")};
  --nc-strip-knob-row: calc(${a("knob-size")} + ${a("control-gap")} + ${a("label-size")} * ${a("label-leading")});
  position: relative;
  flex: none;
  width: ${a("strip-width")};
  display: grid;
  grid-template-columns: ${a("control-gap")} minmax(0, 1fr) ${a("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${a("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${a("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${a("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${a("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${a("hairline")} solid ${a("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${a("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${a("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(o=>`.nc-strip[data-nc-shade="${o}"] { --nc-strip-shade: ${a(`strip-shade-${o}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${D("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${D("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${a("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${a("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${a("control-gap")};
  min-width: calc(${a("strip-width")} * 2.5);
  padding: calc(${a("control-gap")} * 2) calc(${a("control-gap")} * 2.5);
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: ${a("surface-page")};
  color: ${a("text")};
  font-size: ${a("label-size")};
}
.nc-strip-menu-title { color: ${a("text-sub")}; font-weight: ${a("label-weight")}; letter-spacing: ${a("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${a("control-gap")}; margin-bottom: ${a("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${a("control-gap")} * 4.5);
  height: calc(${a("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${a("hairline")};
  border: ${a("hairline")} solid ${a("divider")};
  border-radius: ${a("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${a("text-sub")};
  font: inherit;
  font-size: ${a("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${a("hairline")} * 2) solid ${a("text")}; outline-offset: ${a("hairline")}; color: ${a("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${a("control-gap")} * 3);
  margin: 0;
  padding: ${a("control-gap")} 0;
  border: 0;
  border-top: ${a("hairline")} solid ${a("divider")};
  background: transparent;
  color: ${a("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${a("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${a("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: calc(${a("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${a("target-min")} * 0.7); height: calc(${a("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${a("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${a("stack-card-pad-y")} ${a("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${a("stack-card-pad-y")} ${a("module-pad")}; }
.nc-strip[data-nc-master] { width: ${a("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${a("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  font-family: ${a("font-readout")};
  font-size: ${a("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${a("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${a("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${a("danger")}; }
.nc-strip-remove:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
  text-transform: uppercase;
  color: ${a("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${a("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${a("control-gap")}; left: ${a("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${a("control-gap")};
  right: ${a("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${a("hairline")};
  border: 0;
  background: transparent;
  color: ${a("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${a("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${a("control-gap")} * 1.5);
  height: calc(${a("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${a("hairline")}, transparent calc(${a("hairline")} * 1.5)) 0 0 / calc(${a("control-gap")} * 0.75) calc(${a("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${a("control-gap")} * -1);
    top: calc(${a("control-gap")} * -1);
    width: calc(${a("target-min")} / 2);
    height: calc(${a("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${a("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${a("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${a("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${a("slider-pitch")};
  grid-auto-rows: ${a("slider-pitch")};
  gap: ${a("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${a("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${a("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${a("control-gap")}; }
.nc-strip-fold { gap: ${a("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${a("label-size")}; font-weight: ${a("label-weight")}; letter-spacing: ${a("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${a("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${a("fader-cap-height")};
  height: ${a("control-gap")};
  background: linear-gradient(${a("divider")}, ${a("divider")}) center / 100% ${a("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${a("control-gap")}));
  width: ${a("control-gap")};
  height: ${a("control-gap")};
  border-radius: 50%;
  background: ${a("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${a("fader-cap-height")};
  height: ${a("control-gap")};
  background: var(--nc-strip-cap, ${a("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${a("slider-pitch")};
  grid-template-rows: ${a("slider-pitch")};
  column-gap: ${a("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${a("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${a("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${a("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${D("divider")}: ${a("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${a("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${a("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${a("hairline")} solid color-mix(in oklab, ${a("text-sub")} 50%, ${a("strip-divider")});
  border-radius: ${a("slot-radius")};
  background: transparent;
  color: ${a("strip-hacks-text")};
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${a("text")}; border-color: ${a("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${a("fader-cap-master")};
  border-color: ${a("fader-cap-master")};
  color: ${a("surface-page")};
}
.nc-hacks:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${a("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${a("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${a("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${a("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${a("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${a("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${a("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${a("meter-track")} calc(var(--knob-from, 135) * 1deg), ${a("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${a("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${a("label-size")};
  line-height: ${a("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${a("fader-cap-width")} auto auto;
  grid-template-rows: ${a("clip-size")} ${a("fader-height")};
  justify-content: center;
  column-gap: ${a("control-gap")};
  row-gap: ${a("control-gap")};
  padding-block: calc(${a("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${a("font-readout")};
  font-size: ${a("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${a("text-sub")};
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
  width: ${a("fader-cap-width")};
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
  width: ${a("rule-strong")};
  transform: translateX(-50%);
  background: ${a("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${a("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${a("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${a("hairline")};
  transform: translateY(-50%);
  background: ${a("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${a("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${a("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${a("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${a("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${a("clip-size")};
  padding: 0;
  border: 0;
  background: ${a("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${a("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${a("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-meter-bars { display: flex; gap: ${a("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${a("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${a("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${a("meter-peak")}; }
.nc-meter-rms { background: ${a("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${a("rule-strong")} solid ${a("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${a("hairline")}; height: ${a("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${a("fx-level-bar")}; overflow: hidden; background: ${a("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${a("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${a("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${a("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${a("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${a("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${a("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${a("divider")}; text-underline-offset: ${a("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${a("hairline")} solid ${a("accent")};
  border-radius: 0;
  background: transparent;
  color: ${a("text")};
  font-family: ${a("font-readout")};
  font-size: ${a("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${a("strip-width")};
  margin-inline-start: ${a("module-gap")};
  border: ${a("hairline")} dashed ${a("divider")};
  color: ${a("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${a("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${a("text")}; border-color: ${a("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${a("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${a("font-readout")}; font-size: ${a("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${a("label-size")};
  font-weight: ${a("label-weight")};
  letter-spacing: ${a("label-tracking")};
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
  font-size: ${a("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
.nc-strip-db:focus-visible { outline: ${a("focus-width")} solid ${a("focus-ring")}; outline-offset: ${a("hairline")}; }
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
    border-top: ${a("hairline")} solid ${a("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${a("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${a("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${a("module-pad-x-desktop")};
    padding-bottom: ${a("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${a("stack-card-pad-y")} ${a("module-pad-x-desktop")} ${a("module-pad-y-desktop")};
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
  background: ${a("accent")};
  font-family: ${a("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${a("page-pad-y-md")} ${a("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${a("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${a("page-pad-y-md")} * -1); left: calc(${a("page-pad-x-md")} * -1); right: calc(${a("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${a("header-gap")};
  padding-inline: ${a("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${a("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${a("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${a("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${a("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${a("target-min")}; }
  .nc-snap { font-size: ${a("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${a("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${a("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${a("page-pad-x-xl")} * -1); right: calc(${a("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${a("hairline")} solid ${a("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${a("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${a("target-min")};
  }
  .nc-snap { font-size: ${a("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
    padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${a("module-pad-y-desktop")} * -1);
    padding: ${a("module-pad-y-desktop")} ${a("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${a("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${a("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${a("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${a("module-pad-x-desktop")} * -1);
    padding-inline: ${a("module-pad-x-desktop")};
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
    border-bottom: ${a("hairline")} solid ${a("divider")};
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
    gap: ${a("module-gap")};
    padding-block: ${a("control-gap")};
    background: ${a("surface-page")};
    border-bottom: ${a("hairline")} solid ${a("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${a("module-gap")};
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
    max-width: ${a("slot-span")};
    height: ${a("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${a("readout-size")}; }
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
${jo("")}
}
@media (max-width: 1023px) {
${jo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${En("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${En("")}
}
@media (max-width: 1023px) {
${En("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${a("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${a("fill-panel")};
  border-radius: ${a("fill-radius")};
  box-shadow: inset 0 0 0 ${a("fill-gutter")} ${a("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${a("fill-radius")} ${a("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${a("fill-cell")};
  border-color: ${a("fill-cell")};
  border-radius: ${a("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${a("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${a("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 9%, ${a("fill-panel")});
  border-radius: ${a("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 14%, ${a("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 14%, ${a("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${a("fill-panel")}; }
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${a("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${a("focus-width")} * 2) 0 ${a("accent-faint")};
  }
}
`}var Sn=null,Sc="nc-ui-fallback";function oi(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Sn&&Sn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Sc} {
${Ac()}
}
`,e.head.append(t),Sn=t}var Mc=new URL("/calliope/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Cc=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Mc,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Cc(document);function ri(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),n.append(o);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var ii=new WeakMap,Ro=.25;function Lc(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let r=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=f=>Math.min(1,Math.max(0,f)),p=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},u=f=>{let b=d(f);b!==r&&(r=b,p(),l?.(b))},h=0,m=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();f.target!==i&&b.height>0&&u(1-(f.clientY-b.top)/b.height),h=f.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!m)return;let b=n.getBoundingClientRect().height||1,x=(h-f.clientY)/b*(f.shiftKey?Ro:1);h=f.clientY,u(r+x)});let g=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",g),n.addEventListener("pointercancel",g),n.addEventListener("lostpointercapture",g),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let b=f.shiftKey?s*Ro:s,x={ArrowUp:r+b,ArrowRight:r+b,ArrowDown:r-b,ArrowLeft:r-b,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};f.key in x&&(f.preventDefault(),u(x[f.key]))});let v={el:n,get value(){return r},get dragging(){return m},set(f){m||(r=d(Number(f)||0),p())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(s=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),ii.set(n,v),v}function Tc(e){return ii.get(e)}var si=new WeakMap,Ic=.2,Fc=1.5,Nc=.5;function zc(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function Bo(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:zc(o.getComputedStyle(e).getPropertyValue(D(t)),n)}function Pc(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let v=0;v<n;v++){let f=t.createElement("span");f.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let y=t.createElement("span");y.className="nc-meter-hold",f.append(b,x,y),r.append(f),s.push({peak:b,rms:x,hold:y,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,h=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},m=(v,f,b,x)=>{let y=Math.round(x*1e3)/1e3;b[f]!==y&&(b[f]=y,v.style.transform=f==="hold"?`translateY(${Math.round((1-y)*1e3)/10}%)`:`scaleY(${y})`)};i.addEventListener("click",()=>{g.clear(),c?.()});let g={el:o,get clipped(){return d},update(v,f){p<0&&(p=Bo(o,"motion-meter-fall",Ic)),u<0&&(u=Bo(o,"motion-meter-hold",Fc));let b=Math.max(0,Math.min(.25,Number(f)||0)),x=p>0?Math.exp(-b/p):0;s.forEach((y,S)=>{let C=v[S]??v[0]??{peak:0,rms:0},A=Math.min(1,Math.max(0,Number(C.peak)||0)),E=Math.min(A,Math.max(0,Number(C.rms)||0));C.over&&g.clip(),y.level.peak=A>=y.level.peak?A:A+(y.level.peak-A)*x,y.level.rms=E>=y.level.rms?E:E+(y.level.rms-E)*x,y.holdAge+=b,A>=y.holdAt?(y.holdAt=A,y.holdAge=0):y.holdAge>u&&(y.holdAt=Math.max(A,y.holdAt-Nc*b)),m(y.peak,"peak",y.shown,y.level.peak),m(y.rms,"rms",y.shown,y.level.rms),m(y.hold,"hold",y.shown,y.holdAt),y.hold.dataset.off=y.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,h())},clear(){d=!1,h()},reset(){for(let v of s)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,m(v.peak,"peak",v.shown,0),m(v.rms,"rms",v.shown,0),m(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,h()},configure(v){v.onClear&&(c=v.onClear)}};return h(),g.reset(),si.set(o,g),g}function Dc(e){return e?si.get(e):void 0}var qc=3,jc=new Set(["freq","q","rate","time","log"]);function Fa(e,t,n){return!e||!jc.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Et(e,t,n){return Fa(e,t,n)!=="linear"}function tn(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),s=Fa(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function li(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=Fa(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**qc:i)}function ci(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function gt(e,t,n,o){return Math.round(tn(e,t,n,o)*1e3)}function nn(e,t,n,o,i){return ci(li(e,t,n,Number(o)/1e3),t,n,i)}function Rc(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Na(e,t,n,o,i,r=!1,s){let l=gt(e,t,n,o),c=Rc(l,i,r);if(c===null)return null;let d=nn(e,t,n,c,s),p=Math.sign(c-l),u=ci(Number(o),t,n,s);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=nn(e,t,n,c,s);return d}function Oo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Bc(e,t,n,o=n/6){let i=e.some(p=>p===null),r=Math.max(0,n-(i?o:0)),s=e.reduce((p,u,h)=>u===null?p:p+Oo(t[h]),0),l=s>0?r/s:0,c=e.map(p=>p===null?0:Math.min(r,Oo(p)*l));if(i){let p=c.reduce((h,m)=>h+m,0),u=e.indexOf(null);c[u]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=n),d}function Oc(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function ve(e){return Math.max(0,Math.min(1,e))}function di(e,t){let{ctx:n,w:o,h:i}=Oc(e);if(!n)return;n.clearRect(0,0,o,i);let r=kc(e);if(t.paint==="swatch"){let c=B(e,"accent"),d=B(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){_c(n,o,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=B(e,ai(c)),p=B(e,"divider"),u=ve(t.cutoff??.5),h=.08+(1-ve(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=o;m++){let g=m/Math.max(1,o),v=0;c==="lp"?v=g<u?1:Math.max(0,1-(g-u)/h):c==="hp"?v=g>u?1:Math.max(0,1-(u-g)/h):v=Math.max(0,1-Math.abs(g-u)/h);let f=i*.78-v*i*.62;m===0?n.moveTo(m,f):n.lineTo(m,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=B(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=B(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,h]=Bc([c,d],t.max??[1,4],o),m=2,g=i-1;n.beginPath(),n.moveTo(p,g),n.lineTo(u,m);let v=Math.max(1,Math.ceil(h-u));for(let f=1;f<=v;f++){let b=f/v;n.lineTo(u+(h-u)*b,g-(g-m)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(h,g),n.lineTo(o,g),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=B(e,"accent"),h=B(e,"text-sub"),m=i/2;n.fillStyle=B(e,"accent-soft"),n.fillRect(ve(d)*o,0,(ve(p)-ve(d))*o,i),n.strokeStyle=B(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(o,m),n.stroke();let g=Math.floor(c.length/2);for(let v=0;v<g;v++){let f=(v+.5)/g*o,b=Math.max(-1,Math.min(1,c[v*2]??0)),x=Math.max(-1,Math.min(1,c[v*2+1]??0)),y=(v+.5)/g;n.strokeStyle=y>=d&&y<=p?u:h,n.beginPath(),n.moveTo(f,m-x*(m-1)),n.lineTo(f,m-b*(m-1)+.5),n.stroke()}n.strokeStyle=u;for(let v of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(ve(v)*(o-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=B(e,"text"),n.fillRect(Math.round(ve(t.position)*(o-1)),0,1,i)),g||(n.fillStyle=h,n.font=r,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=ve(t.level??0);n.fillStyle=B(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=B(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=B(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=B(e,"rhythm.playhead"),n.fillRect(l/s*o,i*.3,Math.max(1,o/s),i*.4),e.dataset.ncAccent=B(e,"accent")}var dt=20,Wn=2e4,Mn=24,Ho=-60;function Hc(e,t,n,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-s)/2,1-s,(1-s)/2];let u=1+l,h=-2*s,m=1-l,g=2*Math.PI*o/i,v=(y,S,C)=>y+S*Math.cos(g)+C*Math.cos(2*g),f=(y,S)=>-(y*Math.sin(g)+S*Math.sin(2*g)),b=Math.hypot(v(c,d,p),f(d,p)),x=Math.hypot(v(u,h,m),f(h,m));return x>0?b/x:0}function Vc(e,t){return Math.log(Math.max(dt,Math.min(Wn,e))/dt)/Math.log(Wn/dt)*t}function Vo(e,t,n){let o=Math.max(Ho,Math.min(Mn,e));return t+(Mn-o)/(Mn-Ho)*(n-t)}function _c(e,t,n,o,i,r){let s=o.mode??"lp",l=B(i,ai(s)),c=B(i,"divider"),d=B(i,"text-sub"),p=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,h=Math.max(u+4,n-p-3),m=o.q??Math.SQRT1_2,g=Math.round(Vo(0,u,h))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,g),e.lineTo(t,g),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let f=dt*(Wn/dt)**(v/Math.max(1,t)),b=o.open?1:Hc(s,o.hz,m,f,o.sampleRate),x=Vo(20*Math.log10(Math.max(1e-5,b)),u,h);v===0?e.moveTo(v,x):e.lineTo(v,x)}if(e.strokeStyle=l,e.stroke(),!o.open){let v=Math.round(Vc(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,u),e.lineTo(v,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function pe(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function Gc(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var je=20,At=2e4,za=Math.log(At/je),Xn=32,Uc=250,Yc=-100,Wc=1200,Xc=4.5,_o=-6,Te=-96,Kc=48,Go=[100,1e3,1e4],Jc=[6,12];function Ge(e,t){return Math.log(Math.max(je,Math.min(At,e))/je)/za*t}function Vt(e,t){return je*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*za)}function Ee(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Kn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var pi=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Qc(e,t,n,o){let i=n?3:1,r=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),s=c=>({hz:Math.max(e.minHz??je,Math.min(e.maxHz??At,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Pa(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Zc(e,t,n,o,i,r,s,l,c){let d=c?.25:1,p={},u=Math.max(1,r/2-l);if(p.db=Math.max(-s,Math.min(s,t.db-o*d/u*s/Pa(e))),e.moveHz){let h=t.hz*Math.exp(n*d/Math.max(1,i)*za);p.hz=Math.max(e.minHz??je,Math.min(e.maxHz??At,h))}return p}function ed(e,t,n,o,i){let r=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+o*2,s-r),c=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var _=new WeakMap;function td(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,o.append(i,r);for(let c of e.bands)o.append(nd(n,c,t));o.append(s),o.addEventListener("click",c=>{if(!bi(n)||c.button>0)return;let d=gi(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),_.set(n,{control:e,cache:null,spec:null,active:null}),hi(n,e),n}function ui(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function nd(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,s=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=r();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",ye(e,t.id))}),o.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let p=i(),u=r(),h=_.get(e);if(!p||!u||!h?.box)return;let{w:m,h:g,pad:v}=h.box;p.onBand(u.id,Zc(u,s.start,d.clientX-s.x,d.clientY-s.y,m,g,p.range??18,v,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&ye(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=i(),u=r();if(!p||!u)return;let h=Qc(u,d.key,d.shiftKey,p.range??18);h&&(d.preventDefault(),h==="reset"?p.onReset?.(u.id):p.onBand(u.id,h),ye(e,u.id))});let c=null;return o.addEventListener("wheel",d=>{let p=i(),u=r();if(!p||!u?.moveQ)return;d.preventDefault();let h=d.timeStamp;(!c||h-c.t>400)&&(c={q:u.q,t:h});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-m/240))),c.t=h,p.onBand(u.id,{q:c.q}),ye(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>ye(e,t.id)),o.addEventListener("focus",()=>ye(e,t.id)),o.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==o&&ye(e,null)}),o.addEventListener("blur",()=>{s||ye(e,null)}),o}function ye(e,t){let n=_.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Je(e):Da(e)}function Da(e){let t=_.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(g=>g.id===t.active):null;for(let g of e.querySelectorAll(".nc-eq-node"))g instanceof HTMLElement&&(o&&g.dataset.band===o.id?g.dataset.active="true":delete g.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,pi(o.db)];o.kind==="peak"?i.push(Kn(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${Kn(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(ad(t.control,o)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,c=Ge(o.hz,r),d=Ee(o.db*Pa(o),s,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,h=Math.max(0,Math.min(r-p,c-p/2)),m=d-u-l*1.5>=0?d-u-l*1.5:Math.min(s-u,d+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(m)}px`}function ad(e,t){return e.bands.indexOf(t)%3+1}function hi(e,t){let n=_.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",qa(e);let o=t.range??18;t.bands.forEach((i,r)=>{let s=ui(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-o)),s.setAttribute("aria-valuemax",String(o)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${pi(i.db)}, ${Kn(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),Je(e),cd(e)}function mi(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function fi(e){return{curve:pe(e,"eq-curve"),fill:pe(e,"eq-fill"),quiet:pe(e,"text-sub"),grid:pe(e,"eq-grid"),zero:pe(e,"divider"),label:pe(e,"text-sub"),spectrum:pe(e,"eq-spectrum"),bands:[pe(e,"eq-band-1"),pe(e,"eq-band-2"),pe(e,"eq-band-3")]}}function od(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Je(e){_.has(e)&&qa(e);let t=_.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:s}=mi(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),c=o.range??18;t.box={w:r,h:s,pad:l},t.colours=fi(e);let d=t.colours,p=od(o,r);if(!t.cache||t.cache.key!==p){let S=Math.max(64,Math.ceil(r)+1),C=new Float64Array(S);for(let E=0;E<S;E++)C[E]=Vt(E/(S-1)*r,r);let A=null;try{A=typeof o.response=="function"?o.response(C):null}catch{A=null}t.cache={key:p,freqs:C,total:A?.total??new Float64Array(S),bands:A?.bands??[]}}i.clearRect(0,0,r,s);let u=Gc(e),h=o.on!==!1;rd(i,r,s,c,l,d,u);let{freqs:m,total:g,bands:v}=t.cache,f=Array.from(m,S=>Ge(S,r)),b=Ee(0,s,c,l);v.forEach((S,C)=>{if(!S||!S.some(M=>Math.abs(M)>.05))return;let A=h?d.bands[C%3]:d.quiet,E=Array.from(S,M=>Ee(M,s,c,l));i.save(),t.active&&o.bands[C]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=A,Uo(i,f,E,b)),i.globalAlpha=h?.75:.4,i.strokeStyle=A,i.lineWidth=.75,Cn(i,f,E),i.restore()});let x=Array.from(g,S=>Ee(S,s,c,l)),y=h?d.curve:d.quiet;i.save(),i.fillStyle=h?d.fill:d.quiet,i.globalAlpha=h?.2:.08,Uo(i,f,x,b),i.restore(),i.save(),i.strokeStyle=h?d.fill:y,i.lineJoin="round",i.lineCap="round",h&&(i.globalAlpha=.16,i.lineWidth=4,Cn(i,f,x)),i.globalAlpha=1,i.strokeStyle=y,i.lineWidth=1.25,Cn(i,f,x),i.restore(),id(e),Da(e)}function rd(e,t,n,o,i,r,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<je||p>At)continue;let u=Math.round(Ge(p,t))+.5;e.globalAlpha=Go.includes(p)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of Jc)if(!(c>o))for(let d of[1,-1]){let p=Math.round(Ee(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(Ee(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Go){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=Ge(c,t)+3;e.fillText(d,u+p+2>t?Ge(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=Ee(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function an(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function Cn(e,t,n){e.beginPath(),an(e,t,n),e.stroke()}function Uo(e,t,n,o){e.beginPath(),an(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function gi(e){return e.closest("[data-nc-maxable]")}function bi(e){let t=gi(e);return!!t&&!t.hasAttribute("data-nc-max")}function qa(e){let t=bi(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=_.get(e);n?.active&&(n.active=null,Da(e))}return t}function id(e){qa(e);let t=_.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=ui(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Ge(s.hz,n).toFixed(1)}px`,l.style.top=`${Ee(s.db*Pa(s),o,r,i).toFixed(1)}px`)}}function sd(e,t,n,o){let i=o/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=Vt(d,t),h=Vt(p,t),m=Vt(c/(e-1)*t,t);r[c]=Math.min(n-1,u/i),s[c]=Math.min(n-1,h/i),l[c]=Xc*Math.log2(m/1e3)}return{lo:r,hi:s,tilt:l}}function ld(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let s=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*s}let r=-1/0;for(let s=o;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function cd(e){let t=_.get(e);if(t){if(!t.control.spectrum){yi(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=_.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),Jn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Jn(e)}}function Jn(e){let t=_.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){vi(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Qn(e),n.onVis||(n.onVis=()=>Jn(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Zn(e,!1)}function Qn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Zn(e,t){let n=_.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,Ln(e,Qn(e))),Uc):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,Ln(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,Ln(e,Qn(e))),Xn))}function vi(e){let t=_.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function yi(e){let t=_.get(e)?.spec;if(!t)return;vi(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=_.get(e);n&&(n.spec=null)}function Ln(e,t){let n=_.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){yi(e);return}if(!o.analyser)return;if(t-o.last<Xn-4&&!o.idle){Zn(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):Xn/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=mi(r);if(!s)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...sd(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,h=Kc*i,{lo:m,hi:g,tilt:v}=o.map;for(let b=0;b<d;b++){let x=ld(o.buf,m[b],g[b]);x>u&&(u=x);let y=x+v[b],S=o.disp[b]-h;o.disp[b]=y>S?y:S}u>Yc&&(o.loud=t);let f=t-o.loud>Wc;s.clearRect(0,0,l,c),(!f||o.disp.some(b=>b>Te))&&dd(s,l,c,o.disp,n.colours??fi(e)),o.idle=f&&!o.disp.some(b=>b>Te),Zn(e,o.idle)}function dd(e,t,n,o,i){let r=o.length,s=new Array(r),l=new Array(r),c=d=>{let p=o[Math.max(0,Math.min(r-1,d))];return Number.isFinite(p)?p:Te};for(let d=0;d<r;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(Te,Math.min(_o,Number.isFinite(p)?p:Te))-Te)/(_o-Te);s[d]=d/(r-1)*t,l[d]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),an(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),an(e,s,l),e.stroke(),e.restore()}var ie=new WeakMap,pd=450,ud=6,hd=33,Tn=24,md="http://www.w3.org/2000/svg";function fd(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function gd(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function bd(e,t,n,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let s=t<o?1:-1;for(let l=t;l!==o+s;l+=s){let c=(l-t)/(o-t);r[l]=Math.round((n+(i-n)*c)*100)/100}return r}function vd(e,t){let n=e.steps[t],o=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function Ie(e,t){let n=document.createElementNS(md,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function wi(e){let t=Ie("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Ie("path",{d:e})),t}function yd(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(o,i,r,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ie.set(n,c),xd(n,o),$d(n,s),xi(n,e),n}function se(e){let t=ie.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function wd(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function In(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=wd(e);return{i:gd(t.clientX,o),level:fd(t.clientY-n.top,n.height)}}function xd(e,t){let n=ie.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let s=se(e);if(!s||r.button>0||!s.steps.length)return;r.preventDefault(),on(e),t.setPointerCapture?.(r.pointerId);let l=In(t,r),c=s.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Yo(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,se(e)?.onLevels(d.start.slice(),!0),Fn(e,d.i))},pd)}),t.addEventListener("pointermove",r=>{let s=n.drag;if(!s||s.id!==r.pointerId||s.long||!s.moved&&Math.hypot(r.clientX-s.x,r.clientY-s.y)<ud)return;s.moved=!0,o();let l=In(t,r);Yo(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let i=r=>{let s=n.drag;!s||s.id!==r.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(r.pointerId),s.long||se(e)?.onLevels(s.levels.slice(),!0),ea(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let s=n.drag;!s||s.id!==r.pointerId||(o(),n.drag=null,s.long||se(e)?.onLevels(s.start.slice(),!0),ea(e,-1))}),t.addEventListener("contextmenu",r=>{se(e)?.onShape&&(r.preventDefault(),Fn(e,In(t,r).i))}),t.addEventListener("keydown",r=>{let s=se(e);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(n.focus,l-1),d=s.steps[c].level,p=u=>{let h=s.steps.map(m=>m.level);h[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,s.onLevels(h,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(r.shiftKey?.01:.05));break;case"ArrowDown":p(d-(r.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!s.onShape)return;Fn(e,c);break;default:return}r.preventDefault(),ta(e)}),t.addEventListener("focus",()=>ta(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function Yo(e,t,n,o,i,r){let s=ie.get(e).drag;s&&(s.levels=bd(s.levels,t,n,o,i),ea(e,o,s.levels[o]),se(e)?.onLevels(s.levels.slice(),r))}function ea(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function ta(e){let t=ie.get(e),n=e.querySelector(".nc-lsteps-plot"),o=se(e);if(!n||!o)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",vd(o,i))}function $d(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),on(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),ie.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&on(e)}}function Fn(e,t){let n=se(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let r=ie.get(e);r.focus=t,o.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,o.append(s);for(let m of n.shapes??[]){let g=document.createElement("button");g.type="button",g.setAttribute("role","menuitemradio"),g.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&g.append(wi(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>{se(e)?.onShape?.(t,m.value),on(e,!0)}),o.append(g)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,h=Math.max(0,Math.min(c.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function on(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ie.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function kd(e,t){let n=ie.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(r),r%4===0&&r>0&&(s.dataset.beat="true");let l=Ie("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Ie("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Ie("path",{class:"nc-lsteps-env",d:""}),Ie("path",{class:"nc-lsteps-top",d:""}),Ie("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),o.append(s);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function xi(e,t){let n=ie.get(e);if(!n)return;n.control=t;let o=t.steps.length;kd(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),s=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,g)=>{let v=s[g];if(!v)return;let f=String((g%2?1-r:r)*2);v.style.setProperty("--nc-lsteps-grow",f),l[g]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&g>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=m.level<=0?"true":"false";let b=Math.max(0,Math.min(1,m.level)),x=v.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-b*100)),x.setAttribute("height",String(b*100));let y=t.curve?t.curve(g,Tn):null,S="M0 100",C="";for(let A=0;A<=Tn;A++){let E=y?Math.max(0,Math.min(1,y[A]??b)):b,M=A/Tn*100,F=100-E*100;S+=` L${M.toFixed(2)} ${F.toFixed(2)}`,C+=`${A?" L":"M"}${M.toFixed(2)} ${F.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${S} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",C)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let g=document.createElement("button");g.type="button",g.className="nc-lsteps-shape",g.setAttribute("role","tab"),g.dataset.shape=String(m.value),m.icon&&g.append(wi(m.icon)),g.append(document.createTextNode(m.label)),g.addEventListener("click",()=>se(e)?.onShapeAll?.(m.value)),c.append(g)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,h=t.steps.slice(0,p).every(m=>m.shape===u);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let g=h&&m.dataset.shape===String(u);m.setAttribute("aria-selected",g?"true":"false"),m.tabIndex=g||!h&&m===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),ta(e),n.last=-2,Ed(e)}function Ed(e){let t=ie.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Nn(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Nn(e,null);return}r-o>=hd&&(o=r,Nn(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function Nn(e,t){let n=ie.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var Ad=.8912509381337456,na=32,Sd=250,Md=1200,Cd=.2,$i=1.5;function Ld(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Td(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var rn=new WeakMap,Wo=new WeakMap;function Xo(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function Id(e){let t=Wo.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let s=rn.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),pt(s))}_e(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)pt(i);_e(t)}),Wo.set(e,t),t}var ki=e=>e.els.some(t=>t.isConnected);function Fd(e){if(!e.loop.io)return ki(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function pt(e){let t=!e.dead&&!!e.source&&Fd(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ja(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),ra(e))}function ja(e){return e.doc.defaultView?.performance?.now()??Date.now()}function _e(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Ei(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ja(e)),!e.raf&&!e.timer&&aa(e,!1)}function aa(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Ko(e,ja(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Sd):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Ko(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),na)}function Ei(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ko(e,t){if(t-e.last<na-4&&!e.idle&&e.last){aa(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):na/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!ki(r)){(r.placed||e.frames-r.born>90)&&Ai(r);continue}r.placed=!0,r.open&&(i=!0,Nd(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Ei(e);return}e.idle=t-e.loud>Md&&!o,aa(e,e.idle)}function Nd(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Xo(h,"motion-meter-fall",Cd),e.hold=Xo(h,"motion-meter-hold",$i)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,s=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=s&&Number(o.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let h of e.els)h.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[r,l],u=!1;for(let h=0;h<2;h++){let m=Ld(p[h]);m>0&&(u=!0),e.disp[h]=m>=e.disp[h]?m:m+(e.disp[h]-m)*d,e.disp[h]<.001&&(e.disp[h]=0),p[h]>=Ad&&(e.clipAt[h]=n);let g=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;oa(e,h,e.disp[h],g)}return u}function oa(e,t,n,o){let i=Math.round(n*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function ra(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,oa(e,0,0,!1),oa(e,1,0,!1)}function Ai(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),rn.get(t)===e&&rn.delete(t)}function zd(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=Id(o),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:$i,rows:""};for(let s of n)rn.set(s,r),i.io?.observe(s);if(i.recs.add(r),ra(r),!i.io){let s=o.defaultView,l=()=>{pt(r),_e(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){pt(r),_e(i);return}r.open&&(r.open=!1,r.source?.close?.(),ra(r)),r.source=l,pt(r),_e(i)}},destroy(){r.dead||Ai(r),_e(i)}}}var Si={slop:8,longPressMs:500,pitchPx:16},Pd=class{constructor(e,t,n=Si){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Dd(e,t,n,o=Si){let i=!1,r=0,s=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),h=[...e.querySelectorAll(t)],m=u?h.findIndex(f=>f===u||f.contains(u)):-1;if(m>=0)return m;let g=-1,v=Number.POSITIVE_INFINITY;return h.forEach((f,b)=>{if(f.hidden)return;let x=f.getBoundingClientRect();if(p<x.top||p>x.bottom)return;let y=Math.abs(d-(x.left+x.width/2));y<v&&y<=x.width&&(g=b,v=y)}),g},l=new Pd(s,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Mi="netcomposer.groups.v1";function Ra(){try{return globalThis.localStorage??null}catch{return null}}function Ci(e=Ra(),t=Mi){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function qd(e,t,n,o=Mi){let i=Ci(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function jd(e,t=Ra()){return Ci(t).get(e.id)??e.open===!0}function Rd(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";qd(Ra(),e.id,d),ia(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(i,c),Li(o,e),ia(o,jd(e)),Ti(o,e),o}function ia(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Li(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Ti(e,t){Li(e,t)&&ia(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var Nt="application/x-nc-pad",Jo="http://www.w3.org/2000/svg";function Bd(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let u=s;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:r/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Od(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(Hd(n,r,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&_t(n)}),Fi(n,e),n}function Hd(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Jo,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Jo,"path");return c.append(d),o.append(i,r,s,l,c),_d(e,o,t,n),r.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&Ii(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(Nt,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(Nt)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(Nt)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let h=p.dataTransfer?.getData(Nt);if(h!==void 0&&h!==""){p.preventDefault(),p.stopPropagation();let g=Number(h);g!==t&&u.onMove?.(g,t,p.altKey);return}let m=p.dataTransfer?.files?.[0];m&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,m))}),o}function Vd(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function _d(e,t,n,o){let i=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=Qo(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=Qo(e,t,n,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}Vd(e,n,o)})}function Qo(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;_t(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),_t(e)}),s.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of r){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{_t(e);let h=o(e);h?.type==="padGrid"&&(p.id==="rename"&&h.onRename?Ii(e,t,n,o):h.onMenu?.(n,p.id))}),l.append(u)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Ii(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=r.value.trim();r.remove(),t.focus();let h=o(e);p&&u&&h?.type==="padGrid"&&h.onRename?.(n,u)};r.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])r.addEventListener(p,u=>u.stopPropagation());e.append(r),r.focus(),r.select()}function _t(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Fi(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",Bd(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let p=t.selected===i;p?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",p?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function K(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function hn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function Zo(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function bt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Gd=450,er=8;function he(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Ud(e){let t=$c(e,"target-min");return t>0?t:44}function Yd(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Ud(e),o=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,u=c+o,h=d-o,m=d+o;for(let g=0;g<t.length;g++){if(r===g)continue;let v=i[g];if(!v||v.width===0)continue;let f=v.left+v.width/2,b=v.top+v.height/2;Math.abs(b-d)<o*2&&(f>c?u=Math.min(u,(c+f)/2):f<c&&(p=Math.max(p,(c+f)/2))),Math.abs(f-c)<o*2&&(b>d?m=Math.min(m,(d+b)/2):b<d&&(h=Math.max(h,(d+b)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),h=Math.min(h,l.top),m=Math.max(m,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${h-l.top}px`,s.style.width=`${Math.max(0,u-p)}px`,s.style.height=`${Math.max(0,m-h)}px`,s.style.transform="none"}}function Ni(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function tr(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Pe(e,t){switch(e.type){case"slider":return Wd(e,t);case"select":return Kd(e,t);case"toggle":return Jd(e,t);case"button":return Qd(e,t);case"readout":return Zd(e);case"label":return ap(e);case"note":return nr(e);case"knob":return ip(e,t);case"choice":return sp(e,t);case"slotRow":return lp(e,t);case"stepGrid":return up(e,t);case"canvas":return gp(e);case"fx":return Ap(e,t);case"eqGraph":return td(e,t);case"levelSteps":return yd(e,t);case"group":return Rd(e,t,Pe);case"strip":return bp(e,t);case"stripAdd":return xp(e,t);case"padGrid":return Od(e,t);case"moves":return tp(e,t);default:return nr({id:"unknown",text:""})}}function de(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Di(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(zi(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??bt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Zo(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Zo(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Ae(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&op(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??bt(t.value))}else if(t.type==="choice")qi(e,t);else if(t.type==="slotRow")Ri(e,t);else if(t.type==="stepGrid")la(e,t);else if(t.type==="padGrid")Fi(e,t);else if(t.type==="moves")Pi(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&di(n,t)}else if(t.type==="eqGraph")hi(e,t);else if(t.type==="levelSteps")xi(e,t);else if(t.type==="strip"){Vi(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Ue(n.id)}"]`);o instanceof Element&&de(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Oi(e,t);else if(t.type==="group"){Ti(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Ue(n.id)}"]`);o instanceof Element&&de(o,n)}}else if(t.type==="fx"){Qi(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Ue(n.id)}"]`);o instanceof Element&&de(o,n)}}}}function Wd(e,t){let n=hn(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=Et(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(zi(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=l=>i?nn(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(r(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=Na(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(gt(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(o,s),e.onTap&&n.insertBefore(Xd(e,o,t),s),n.append(K()),de(n,e),n}function zi(e){return Et(e.taper,e.min,e.max)?gt(e.taper,e.min,e.max,e.value):e.value}function Xd(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(he());let i=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function Kd(e,t){let n=hn(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(s)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),n.append(o,K()),n}function Jd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(K()),de(n,e),n}function Qd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(K()),de(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Ni(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Bi(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),o.append(n,i),o}function Zd(e){let t=hn(e.id,e.label);return t.append(K()),de(t,e),t}var ep=450;function tp(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(np(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}i.append(r,s),n.append(i)}return Pi(n,e),n}function Pi(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${Ue(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function np(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function ap(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(K()),t}function nr(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(K()),t}function ar(e){if(typeof e.valueText=="string")return e.valueText;let t=bt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Di(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function op(e,t){let n=tn(t.taper,t.min,t.max,t.value);Di(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(tn(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ar(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ar(t)}`}function rp(e,t){if(Et(e.taper,e.min,e.max))return Na(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function ip(e,t){let n=hn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,s=0;o.addEventListener("pointerdown",d=>{r=d.clientY;let p=t(o);s=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(Et(p.taper,p.min,p.max)){let m=tn(p.taper,p.min,p.max,s)-(d.clientY-r)/120;p.onChange(li(p.taper,p.min,p.max,m));return}let u=p.max-p.min||1,h=Math.min(p.max,Math.max(p.min,s-(d.clientY-r)*u/120));p.onChange(h)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let u=rp(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(K()),de(n,e),n}function sp(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(K()),qi(n,e),n}function qi(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function lp(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],h=document.createElement("span");h.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(p),m.textContent=u.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(m,he()),cp(h,m,n,p,t),o.append(h)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Ni(),i.append(he()),i.addEventListener("click",()=>{Bi(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,r,K()),ji(n,t),Ri(n,e),n}function or(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;st(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function cp(e,t,n,o,i){let r=0,s=0,l=0,c=!1,d=!1,p=!1,u=!1,h=()=>{window.clearTimeout(r),r=0},m=b=>{let x=b.clientX-s,y=b.clientY-l;x*x+y*y>er*er&&(c=!0,h())},g=()=>{u&&(u=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",f))},v=b=>{let x=r!==0&&!c&&!d;h(),g(),x&&(p=!0,or(n,o,i,b))},f=()=>{c=!0,h(),g()};e.addEventListener("pointerdown",b=>{b.button===0&&(g(),d=!1,c=!1,p=!1,s=b.clientX,l=b.clientY,h(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,dp(n,t,o,i))},Gd),u=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(p||d||c){p=!1,d=!1,c=!1;return}or(n,o,i,b)})}function ji(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=rr("Save","store"),i=rr("Clear","clear");n.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),st(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),st(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),st(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&st(e)})}function rr(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function dp(e,t,n,o){ji(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function st(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Ri(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Bi(e){let t=e.dataset.ncLastFill||null,n=pc(t);e.dataset.ncLastFill=n;let o=uc(n);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function pp(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function up(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=f=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=f,o.append(b),b},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=f=>{for(let b of[r,s]){let x=b===f;b.setAttribute("aria-checked",x?"true":"false"),b.tabIndex=x?0:-1}};l(r);for(let f of[r,s])f.addEventListener("click",()=>l(f));o.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let b=s.getAttribute("aria-checked")==="true"?r:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(pp(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(f)}n.append(c);for(let f of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=f.label,x.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(x.dataset.ncLane=String((f.lane-1)%4+1));let y=!1,S=0;x.addEventListener("pointerdown",E=>{y=!1,!(E.pointerType==="mouse"||E.button!==0)&&(S=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(y=!0,M.onSelectRow?.(M.rows.findIndex(F=>F.id===f.id),!0))},ep))});for(let E of["pointerup","pointercancel","pointerleave"])x.addEventListener(E,()=>window.clearTimeout(S));x.addEventListener("contextmenu",E=>{y&&E.preventDefault()}),x.addEventListener("click",E=>{let M=t(n);if(M?.type!=="stepGrid")return;if(y){y=!1;return}let F=M.rows.findIndex(Q=>Q.id===f.id),ne=!!M.selectedRows&&(E.shiftKey||E.metaKey||E.ctrlKey);M.onSelectRow?.(F,ne)}),x.addEventListener("keydown",E=>hp(n,x,E));let C=[];for(let E of["mute","solo"]){if(!(E==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let F=document.createElement("button");F.type="button",F.className="nc-ms",F.dataset.ncMs=E,F.textContent=E==="mute"?"M":"S",F.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${f.label}`),M.append(F,he()),M.addEventListener("click",()=>{let ne=t(n);if(ne?.type!=="stepGrid")return;let Q=ne.rows.findIndex(vn=>vn.id===f.id);(E==="mute"?ne.onMute:ne.onSolo)?.(Q)}),C.push(M)}let A=document.createElement("div");A.className="nc-steps";for(let E=0;E<f.steps.length;E++){let M=document.createElement("span");M.className="nc-step-wrap";let F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${f.id}:${E}`,F.setAttribute("aria-label",`${f.label} step ${E+1}`),M.append(F,he()),M.addEventListener("click",ne=>{let Q=t(n);if(Q?.type!=="stepGrid")return;let vn=Q.rows.findIndex(tl=>tl.id===f.id),el=s.getAttribute("aria-checked")==="true";Q.onToggle(vn,E,ne.shiftKey||el)}),A.append(M)}if(e.onLength&&A.append(mp(n,A,f,t)),b.append(...C,x,A),e.onDice){let E=document.createElement("button");E.type="button",E.className="nc-sparkle nc-row-dice",E.dataset.ncDice=f.id,E.setAttribute("aria-label",`Re-roll ${f.label}`),E.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,E.innerHTML=tr(),E.append(he()),E.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(F=>F.id===f.id))}),b.append(E)}b.addEventListener("click",E=>{if(E.target!==b)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(F=>F.id===f.id))}),ir(n,A,".nc-step-wrap",t,s,()=>f.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let p=(f,b,x)=>{let y=document.createElement("button");return y.type="button",y.className=f,y.textContent=b,x&&y.setAttribute("aria-label",x),y},u=p("nc-pads-step","‹","Previous lane"),h=p("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",la(n,f))}));for(let[f,b]of[[u,-1],[h,1]])f.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let y=x.rows.length;x.onSelectRow?.(((zt(x)+b)%y+y)%y)});if(d.append(u,m,h),e.onDice){let f=p("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=tr(),f.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let x=zt(b);x>=0&&b.onDice?.(x)}),d.append(f)}if(e.transport){let f=p("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(f)}n.append(d);let g=document.createElement("div");g.className="nc-pads",g.setAttribute("role","group");let v=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<v;f++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(f),b.textContent=String(f+1),b.addEventListener("click",x=>{let y=t(n);if(y?.type!=="stepGrid")return;let S=zt(y);if(S<0)return;if(n.dataset.ncLenMode==="true"){y.onLength?.(S,f+1);return}let C=s.getAttribute("aria-checked")==="true";y.onToggle(S,f,x.shiftKey||C)}),g.append(b)}return ir(n,g,".nc-pad",t,s,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[zt(f)]?.id:void 0}),n.append(g),n.append(K()),la(n,e),n}function zt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ir(e,t,n,o,i,r){let s="on",l=!0,c=-1,d=(p,u)=>{let h=p.rows[c]?.steps[u];!h||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,s,l):!!h[s]!==l&&p.onToggle(c,u,s==="accent"))};Dd(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let h=u.rows.findIndex(m=>m.id===r());h>=0&&u.rows[h].length!==p.pad+1&&u.onLength?.(h,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let h=r();c=u.rows.findIndex(g=>g.id===h);let m=u.rows[c]?.steps[p.pad];if(!m)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[s]}d(u,p.pad)}else if(p.kind==="long"){let h=r(),m=u.rows.findIndex(v=>v.id===h),g=t.querySelectorAll(n)[p.pad];m>=0&&g instanceof HTMLElement&&u.onLongPress?.(m,p.pad,g)}}})}function hp(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=o.length-1;let s=o[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function mp(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(he());let r=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(g=>g.id===n.id),h=p.rows[u];if(!h)return;let m=Math.max(1,Math.min(h.steps.length,d));m!==h.length&&p.onLength?.(u,m)},s=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((h,m)=>{let g=h.getBoundingClientRect();g.width>0&&d>=g.left+g.width/2&&(u=m+1)}),u},l=d=>r(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(m=>m.id===n.id);if(!u)return;let h={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in h&&(d.preventDefault(),r(h[d.key]))}),i}var zn=new WeakMap,Pt=new WeakMap;function fp(e){return e?(Pt.has(e)||(Pt.set(e,Gn(e)),Qr(t=>{Pt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))sa(n,Number(n.getAttribute("data-nc-velocity")))},e)),Pt.get(e)):"light"}function sa(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:fp(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(zn.has(e)&&zn.get(e)===i)){if(zn.set(e,i),n===null){for(let r of Object.keys(qo(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(qo(n,Do[o]??Do.light)))e.style.setProperty(r,s)}}function sr(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function la(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let h=t.transport?.ariaLabel;h?d.setAttribute("aria-label",h):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let p=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let h=Number(u.getAttribute("data-nc-pad")),m=r.steps[h];u instanceof HTMLButtonElement&&(u.hidden=!m||!l&&h>=r.length,l&&h>=r.length?u.dataset.out="true":delete u.dataset.out,l&&h===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${h+1}${m?.markLabel?`, ${m.markLabel}`:""}`),sr(u,m),u.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?u.dataset.accent="true":delete u.dataset.accent,m?.dim?u.dataset.dim="true":delete u.dataset.dim,sa(u,m?.velocity),t.playhead>=0&&h===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let m=0;m<p.steps.length;m++){let g=p.steps[m],v=e.querySelector(`[data-nc-step="${p.id}:${m}"]`);if(!(v instanceof HTMLButtonElement))continue;let f=v.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===p.id?f.dataset.selected="true":delete f.dataset.selected;let S=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);S?f.dataset.picked="true":delete f.dataset.picked;let C=f.querySelector(".nc-name");C instanceof HTMLElement&&(C.setAttribute("aria-pressed",t.selectedRow===p.id||S?"true":"false"),C.textContent!==p.label&&(C.textContent=p.label,C.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?f.dataset.silent="true":delete f.dataset.silent;for(let A of f.querySelectorAll("[data-nc-ms]")){let E=A.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;A.setAttribute("aria-pressed",E?"true":"false")}}v.setAttribute("aria-pressed",g.on?"true":"false");let b=`${p.label} step ${m+1}${g.markLabel?`, ${g.markLabel}`:""}`;v.getAttribute("aria-label")!==b&&v.setAttribute("aria-label",b),sr(v,g),g.accent?v.dataset.accent="true":delete v.dataset.accent,g.dim?v.dataset.dim="true":delete v.dataset.dim,m%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof g.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,g.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),sa(v,g.velocity);let x=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;m===x?v.dataset.playhead="true":delete v.dataset.playhead;let y=!!t.onLength&&t.selectedRow===p.id;v.hidden=m>=p.length&&!y,m>=p.length&&y?v.dataset.out="true":delete v.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),h=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&h&&h.nextElementSibling!==u){let m=document.activeElement===u;h.after(u),m&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function gp(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,K()),t}function bp(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;r&&(n.dataset.ncFoldable="",s=Yi(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let y=t(n);y?.type==="strip"&&(y.onFold?.(y.folded!==!0),document.activeElement!==s&&s.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let y=document.createElement("span");y.className="nc-strip-grip-dots",y.setAttribute("aria-hidden","true"),l.append(y),l.addEventListener("keydown",S=>{if(S.key!=="ArrowLeft"&&S.key!=="ArrowRight"||S.ctrlKey||S.metaKey||S.shiftKey)return;let C=t(n);C?.type==="strip"&&(S.preventDefault(),C.onMove?.(S.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>dr(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",y=>{y.pointerType==="touch"||y.pointerType==="pen"||y.target instanceof Element&&y.target.closest("input, .nc-strip-remove")||(y.preventDefault(),dr(n,o,t,{x:y.clientX,y:y.clientY}))}),e.onRemove){let y=document.createElement("button");y.type="button",y.className="nc-strip-remove",y.dataset.ncStripRemove="",y.textContent="×",y.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&S.onRemove?.(y)}),o.append(y)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let y=document.createElement("span");y.className="nc-hacks-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks",S.dataset.ncHacks="",y.append(S,he()),y.addEventListener("click",()=>{let C=t(n);C?.type==="strip"&&C.onHacks?.()}),c.append(y)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let y=document.createElement("span");y.className="nc-hacks-wrap nc-sends-view-wrap";let S=document.createElement("button");S.type="button",S.className="nc-hacks nc-sends-view",S.dataset.ncSendsView="",y.append(S,he()),y.addEventListener("click",()=>{let C=t(n);C?.type==="strip"&&C.onSendsView?.()}),d.append(y)}for(let y of["mute","solo"]){if(!(y==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let C=document.createElement("button");C.type="button",C.className="nc-ms",C.dataset.ncMs=y,C.textContent=y==="mute"?"M":"S",S.append(C,he()),S.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&(y==="mute"?A.onMute:A.onSolo)?.()}),d.append(S)}let p=document.createElement("div");p.className="nc-strip-sends";for(let y of e.sends??[])p.append(Pe({...y,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(Pe(Ba(e),t));let h=document.createElement("div");h.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let y of e.ticks??[]){let S=document.createElement("span");S.className="nc-scale-tick",S.style.setProperty("--tick-pos",String(y.value)),S.textContent=y.label,m.append(S)}let g=Lc({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:y=>{let S=t(n);S?.type==="strip"&&S.onChange(y)},onReset:()=>{let y=t(n);y?.type==="strip"&&cr(y)}}),v=Pc({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let y=t(n);y?.type==="strip"&&y.onClipClear?.()}});if(h.append(m,g.el,v.el),r){let y=document.createElement("button");y.type="button",y.className="nc-ui-fx-fold nc-strip-fold",y.dataset.ncStripFold="",y.setAttribute("aria-expanded","false");let S=document.createElement("span");S.className="nc-strip-fold-cap",S.setAttribute("aria-hidden","true");let C=document.createElement("span");C.className="nc-ui-fx-fold-name",C.dataset.ncStripFoldName="";let A=document.createElement("span");A.className="nc-strip-fold-pan",A.setAttribute("aria-hidden","true"),A.hidden=!e.pan,y.append(S,A,C),y.addEventListener("click",()=>{let E=t(n);if(E?.type!=="strip")return;E.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),h.prepend(y)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let b=0;f.addEventListener("click",y=>{let S=t(n);S?.type!=="strip"||!S.onTypeIn||(window.clearTimeout(b),y.detail===0?lr(n,f,t):y.detail===1&&(b=window.setTimeout(()=>lr(n,f,t),wp)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(b);let y=t(n);y?.type==="strip"&&cr(y)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(Pe(Oa(e),t)),s&&n.append(s),l&&n.append(l),n.append(o,x,c,d,p,u,h,f,K()),Vi(n,e),n}function Ba(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??yp(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Oa(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??vp(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function vp(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function yp(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var wp=250;function lr(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??bt(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function xp(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;Hi(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(o,s,K()),Oi(n,e),n}function Oi(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(o.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Hi(o))}function Hi(e){let t=e.options[0];t&&(t.selected=!0)}function cr(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Vi(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?Tc(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Dc(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let g=t.valueText??bt(t.value);s.textContent!==g&&(s.textContent=g),s.setAttribute("aria-label",`${t.label} level ${g}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let g of e.querySelectorAll("[data-nc-ms]")){let v=g.getAttribute("data-nc-ms"),f=v==="mute"?t.mute===!0:t.solo===!0;g.setAttribute("aria-pressed",f?"true":"false"),g.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let g=t.hacksLabel??"Hacks";l.textContent!==g&&(l.textContent=g),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${g}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let g=t.sendsViewLabel??"Sends";c.textContent!==g&&(c.textContent=g),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${g}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Ae(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=_i(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let g=e.querySelector(`.nc-strip-trim [data-nc-id="${Ue(t.trim.id)}"]`);g&&de(g,Oa(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let g=e.querySelector(`.nc-strip-pan [data-nc-id="${Ue(t.pan.id)}"]`);g&&de(g,Ba(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Wi(h,u,t.label),Ae(h,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!u,m.setAttribute("aria-label",`Expand ${t.label}`);let g=m.querySelector("[data-nc-strip-fold-name]");g&&g.textContent!==t.label&&(g.textContent=t.label),Ae(m,t.foldedHelp??t.foldHelp)}}function _i(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Gi?t:0}var Gi=8,Dt=null;function dr(e,t,n,o){Dt?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,s=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=_i(i),u=e.querySelector("[data-nc-strip-grip]")??t,h=(b=!1)=>{if(Dt!==h)return;Dt=null;let x=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",g,!0),r.removeEventListener("pointerdown",v,!0),s.removeEventListener("resize",f),(b||x)&&u?.isConnected&&u.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Gi},(b,x)=>x+1)].map(b=>{let x=r.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",b===p?"true":"false"),x.setAttribute("tabindex",b===p?"0":"-1"),x.dataset.ncShadeChoice=String(b),b===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(b),x.setAttribute("aria-label",`Shade ${b}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),x.addEventListener("click",()=>{let y=n(e);h(!0),y?.type==="strip"&&y.onShade?.(b===0?null:b)}),x});if(d.append(...m),d.addEventListener("keydown",b=>{let x=m.indexOf(r.activeElement);if(x<0)return;let y=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?y=(x+1)%m.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?y=(x-1+m.length)%m.length:b.key==="Home"?y=0:b.key==="End"&&(y=m.length-1),!(y<0)&&(b.preventDefault(),m[x].setAttribute("tabindex","-1"),m[y].setAttribute("tabindex","0"),m[y].focus())}),l.append(c,d),typeof i.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(y=>y.classList?.contains("nc-strip")&&!y.hasAttribute("data-nc-master")),x=b.indexOf(e);for(let[y,S,C]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let A=r.createElement("button");A.type="button",A.className="nc-strip-menu-item",A.dataset.ncStripMove=y<0?"left":"right";let E=r.createElement("span");E.textContent=S;let M=r.createElement("kbd");M.textContent=C,M.setAttribute("aria-hidden","true"),A.append(E,M),A.disabled=y<0?x<=0:x<0||x>=b.length-1,A.addEventListener("click",()=>{let F=n(e);h(!0),F?.type==="strip"&&F.onMove?.(y)}),l.append(A)}}r.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},x=l.offsetWidth,y=l.offsetHeight,S=s.innerWidth||r.documentElement.clientWidth||x,C=s.innerHeight||r.documentElement.clientHeight||y,A=o?o.x:b.right-x,E=o?o.y:b.bottom+4;A=Math.max(4,Math.min(A,S-x-4)),E+y>C-4&&(E=Math.max(4,(o?o.y:b.top)-y-4)),l.style.left=`${Math.round(A)}px`,l.style.top=`${Math.round(E)}px`})();let g=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),h(!0);else if(b.key==="Tab"&&l.contains(r.activeElement)){let x=[...l.querySelectorAll("button:not([disabled])")].filter(S=>S.getAttribute("tabindex")!=="-1"),y=(x.indexOf(r.activeElement)+(b.shiftKey?-1:1)+x.length)%x.length;b.preventDefault(),x[y]?.focus()}},v=b=>{l.contains(b.target)||h(!1)},f=()=>h(!1);return r.addEventListener("keydown",g,!0),r.addEventListener("pointerdown",v,!0),s.addEventListener("resize",f),Dt=h,(m.find(b=>b.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var ca=typeof ResizeObserver=="function"?new ResizeObserver($p):null;function $p(e){for(let t of e){if(!t.target.isConnected){ca.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&kp(n)}}function kp(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function Ep(e){if(ca)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))ca.observe(t)}function Ap(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!sn(e)&&!r&&!s)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),r&&l.append(Ki(n,"head")),e.on!==void 0){let c=ri({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(Mp(n,t)),sn(e)&&l.append(Ip(n,t)),s&&l.append(Fp(t)),n.append(l)}i&&n.prepend(Cp(n,t)),r&&Ji(n,e);for(let l of e.controls)n.append(Pe(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Pe(d,t));n.append(l)}return n.append(K()),Qi(n,e),Ep(n),n}var Sp=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Ui(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&Sp(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Mp(e,t){let n=Yi();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Ui(e))}),n}function Yi(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Wi(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Cp(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ki(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Ui(e)}}),n}var Qe=new Set;function Gt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var sn=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Lp="(max-width: 768px)";function Tp(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Ip(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Tp()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(Xi(e,o,!Qe.has(o.id)),n.focus())}),n}function Fp(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Xi(e,t,n){n?Qe.add(t.id):Qe.delete(t.id),Ha(e,t)}function Np(e,t){t?.type==="fx"&&Qe.has(t.id)&&Xi(e,t,!1)}function zp(e){return e.ownerDocument.defaultView?.matchMedia?.(Lp).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ha(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=sn(t)&&Qe.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!sn(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Gt(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Je(s)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",Ae(n,t.maxHelp)),!o){e.dataset.ncMax&&pr(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Qe.has(t.id)&&Ha(e,t);queueMicrotask(()=>{e.isConnected?s():Gt(e.ownerDocument,s)});return}let i=zp(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&pr(e),e.dataset.ncMax=i,i==="over"&&Pp(e,t)),Dp(e.ownerDocument),i==="over"&&Va(e),Gt(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Je(s)})}function pr(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Gt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Je(n)})}function Pp(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function Va(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,s=ed(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ur=new WeakSet;function Dp(e){ur.has(e)||(ur.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Va(t)}))}var da=new WeakMap;function Ki(e,t){let n=Td(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ji(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)Ae(i,t.meterHelp);let o=da.get(e);o?o.set(t.meter):da.set(e,zd(n,t.meter))}function Qi(e,t){(t.meter||da.has(e))&&Ji(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Wi(r,i,t.title),Ae(r,t.foldHelp)),Ha(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),Ae(l,t.foldHelp)}}function Ae(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Ue(e){return e.replace(/["\\]/g,"\\$&")}function qp(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&di(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Je(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Va(n);Yd(e)}var jp=1e3,Rp=e=>e===!0?"log":typeof e=="string"?e:"linear";function _a(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Rp(e.log),i=Et(o,e.min,e.max),r=n.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let s=n.createElement("label");s.className="nc-label",s.setAttribute("for",e.id),s.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?jp:e.max),l.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",r.append(s,l,c,d);let p=e.value,u=()=>{let m=e.format(p);c.textContent=m,l.setAttribute("aria-valuetext",m)},h=m=>{p=m,n.activeElement!==l&&(l.value=String(i?gt(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?nn(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",m=>{let g=Na(o,e.min,e.max,p,m.key,m.shiftKey,e.step);g===null||l.disabled||(m.preventDefault(),l.value=String(gt(o,e.min,e.max,g)),p=g,u(),e.onInput(p))}),l.disabled=e.disabled===!0,h(e.value),{el:r,set:h,setDisabled(m){l.disabled=m===!0}}}var vt="data-nc-help";function Bp(e,t,n,o=0,i=6,r=8){let s=e.top-i-t.height,l=s>=o+r?"above":"below",c=l==="above"?s:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Pn=new WeakMap;function Op(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Hp({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Pn.get(e);if(n)return n;let o=e.defaultView,i=null,r=null,s,l=!1,c,d=null,p=!1,u=0,h=()=>{clearTimeout(s),p&&!l&&(u=Date.now()+1500),p=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},m=()=>{h(),clearTimeout(c),r=null,d=null,l=!1},g=(E,M)=>{clearTimeout(s),d=M;let F=Date.now()<u?Math.min(t,300):t;s=setTimeout(()=>{r===E&&E.isConnected&&!l&&b(E)&&(p=!0)},F)},v=E=>({x:Number(E.clientX)||0,y:Number(E.clientY)||0}),f=(E,M,F)=>!E||Math.hypot(E.x-M.x,E.y-M.y)>F,b=(E,M)=>{let F=M??E.getAttribute(vt);if(!F)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=F,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let ne=E.getBoundingClientRect(),Q=Bp(ne,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,Op(e));return i.style.top=`${Q.top}px`,i.style.left=`${Q.left}px`,i.dataset.side=Q.side,i.style.visibility="",!0},x=E=>{if(l||E.pointerType==="touch")return;let M=E.target&&E.target.closest?E.target.closest(`[${vt}]`):null;M!==r&&(m(),!(!M||E.buttons)&&(r=M,g(M,v(E))))},y=E=>{if(l||E.pointerType==="touch"||!r)return;if(E.buttons){h(),d=null;return}let M=v(E);p?f(d,M,8)&&(h(),g(r,M)):f(d,M,4)&&g(r,M)},S=E=>{!l&&!E.relatedTarget&&m()},C=E=>{(l||E.key==="Escape")&&m()};e.addEventListener("pointerover",x),e.addEventListener("pointermove",y,{passive:!0}),e.addEventListener("pointerout",S),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",C),o.addEventListener("scroll",m,!0),o.addEventListener("blur",m);let A={hide:m,pin(E,M,{ms:F=0}={}){return m(),!E||!E.isConnected||!b(E,M)?!1:(l=!0,i.dataset.pinned="",F>0&&(c=setTimeout(m,F)),!0)},uninstall(){m(),e.removeEventListener("pointerover",x),e.removeEventListener("pointermove",y),e.removeEventListener("pointerout",S),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",C),o.removeEventListener("scroll",m,!0),o.removeEventListener("blur",m),i?.remove(),i=null,Pn.delete(e)}};return Pn.set(e,A),A}var Vp="(max-width: 768px)",_p='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Gp='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Up=0;function Yp({panel:e,button:t,label:n="Menu",media:o=Vp}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Up}`);let s=t??i.createElement("button");t||(s.type="button",s.innerHTML=_p),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),i.addEventListener("keydown",p,!0),i.addEventListener("pointerdown",u,!0),[...e.querySelectorAll(Gp)].find(f=>!f.hidden&&f.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:f}={}){if(!l())return;let b=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",p,!0),i.removeEventListener("pointerdown",u,!0),(f??b)&&s.focus?.({preventScroll:!0})}function p(f){f.key==="Escape"&&(f.preventDefault(),f.stopPropagation(),d({focus:!0}))}function u(f){let b=f.target;b instanceof r.Node&&(e.contains(b)||s.contains(b))||d({focus:!1})}let h=()=>l()?d({focus:!0}):c(),m=f=>{let b=f.target,x=b instanceof r.Element?b.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",h),e.addEventListener("click",m);let g=r.matchMedia?.(o),v=()=>{g?.matches||d({focus:!1})};return g?.addEventListener?.("change",v),{button:s,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",h),e.removeEventListener("click",m),g?.removeEventListener?.("change",v)}}}var Ga="netcomposer.rhythm.hidden.v1",fe=new WeakMap;function Dn(){try{return globalThis.localStorage??null}catch{return null}}function Zi(e,t=Ga){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function pa(e,t,n,o=Ga){let i=Zi(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function Ua(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(Ba(i)),i.trim&&n.push(Oa(i)));return n}function es(e,t){if(!(!e||!t))return Ua(e).find(n=>n.id===t)}function Wp(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Ua(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Xp(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),ts(e,t)}function ts(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Kp(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=fe.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return es(n,o)}function Jp(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=Wp(t);if(e.dataset.ncSignature===i){for(let r of o){let s=e.querySelector(`[data-nc-section="${mr(r.id)}"]`);s&&ts(s,r);for(let l of r.controls){let c=e.querySelector(`[data-nc-id="${mr(l.id)}"]`);c instanceof Element&&de(c,l)}s instanceof HTMLElement&&ua(s,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),Xp(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let c of r.controls)l.append(Pe(c,Kp));e.append(s),ua(s,r,n)}}function ns(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var Qp="(max-width: 768px)",as=new WeakMap;function hr(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Zp(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=hr("prev"),r=hr("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,s,r,l);let c=(d,p)=>{let u=as.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=ns(h,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,m),u.onPage?.(m),ua(e,{...u,page:m},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(o),o}function ua(e,t,n){as.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=ns(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),r<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of o)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Qp).matches===!0,c=e.closest(".nc-module");o.forEach((f,b)=>{let x=Math.floor(b/i)!==s;if(x?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,x&&!l){let y=c instanceof HTMLElement?fe.get(c):void 0;Np(f,es(y,f.dataset.ncId))}});let d=Zp(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",s===0?"true":"false"),u.setAttribute("aria-disabled",s===r-1?"true":"false");let h=d.querySelector("[data-nc-fx-page-count]"),m=`${s+1} / ${r}`;h.textContent!==m&&(h.textContent=m);let g=d.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${s+1} of ${r}`;g.textContent!==v&&(g.textContent=v)}function mr(e){return e.replace(/["\\]/g,"\\$&")}function eu(e,t=Ga){oi();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=Zi(Dn(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=ri({labelledBy:r.id,onChange:x=>(fe.get(n)??e).onToggle?.(x)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(r,p,s);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",h.append(m);let g=document.createElement("i");g.className="nc-token-probe",g.dataset.ncProbe="",n.append(g,i,u,h),n.setAttribute("aria-labelledby",r.id);let v=x=>{let y=fe.get(n)??e;n.dataset.ncOpen=x?"false":"true",u.hidden=x,h.hidden=!x,l.textContent=x?"+":"−",l.setAttribute("aria-expanded",x?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${x?"Show":"Hide"} ${y.title}`),l.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";pa(Dn(),(fe.get(n)??e).id,x,t),v(x),ha(n.parentElement)}),h.addEventListener("click",()=>{pa(Dn(),(fe.get(n)??e).id,!1,t),v(!1),ha(n.parentElement)});let f={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(x){fe.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=x.title,p.textContent=x.status??"",x.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),m.textContent=x.summary??x.title,d.el.hidden=x.on===void 0,d.set(x.on===!0),x.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,h.setAttribute("aria-label",`Show ${x.title}`),Jp(u,x,f),v(u.hidden),b.redraw()},redraw(){let x=fe.get(n);x&&qp(n,Ua(x))}};return fe.set(n,e),v(o),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Qr(()=>b.redraw(),n.ownerDocument),b}function tu(e,t,n="adjacent"){oi(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),ha(e)}function ha(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}class nu{constructor(t,n,o=ql){this.sink=t,this.now=n,this.holdSec=o}seq=0;until=Number.NEGATIVE_INFINITY;stats={sent:0,offs:0};get sounding(){return this.now()<this.until}get available(){return!!this.sink()?.audition}play(t){return this.send(jl(t),this.holdSec)}send(t,n){const o=this.sink();if(!o?.audition||!t.length)return!1;const i=this.seq++;return o.audition(t.map(r=>({...r,startBeat:0,offsetSec:0,hit:i})),n),this.stats.sent++,this.until=this.now()+n+4,!0}release(t="off"){this.sounding&&(this.until=Number.NEGATIVE_INFINITY,this.sink()?.off(t),this.stats.offs++)}}const os=1,au=.03;function ou(e,{bpm:t,beatsPerBar:n=4,bars:o=os,chord:i}){if(!(t>0))return[];const r=60/t;return rs(e,{beatsPerBar:n,bars:o,...i===void 0?{}:{chord:i}}).map(({beat:s,events:l})=>({atSec:s*r,events:l,holdSec:Math.min(Dl,Math.max(au,Math.max(...l.map(c=>c.lengthBeats))*r))}))}function rs(e,{beatsPerBar:t=4,bars:n=os,chord:o}={}){if(!e.arp||e.arp==="off")return[];const i=Math.max(1,t),r=new kt(e,{random:Qt(1),chordRandom:Qt(2),beatsPerBar:()=>i});r.start(0),o!==void 0&&o>0&&r.jumpToChord(o,0);const s=new Map;for(const l of r.window(n*i))s.set(l.startBeat,[...s.get(l.startBeat)??[],l]);return[...s.entries()].sort((l,c)=>l[0]-c[0]).map(([l,c])=>({beat:l,events:c}))}class ru{constructor(t){this.audition=t}timers=[];stats={runs:0};get running(){return this.timers.length>0}play(t){if(this.cancel(),!t.length||!this.audition.available)return!1;this.stats.runs++;for(const n of t){if(n.atSec<=0){this.audition.send(n.events,n.holdSec);continue}const o=setTimeout(()=>{this.timers=this.timers.filter(i=>i!==o),this.audition.send(n.events,n.holdSec)},n.atSec*1e3);this.timers.push(o)}return!0}cancel(){for(const t of this.timers)clearTimeout(t);this.timers=[]}}function iu(e,t,n,o={}){const i=()=>{const s=e.transport;t.start(s.beatAt(Math.max(s.startTime??n(),n())),!0),o.started?.()},r=e.onChange(s=>{const l=e.transport;s.kind==="start"&&typeof s.beat=="number"?(t.start(s.beat,!1),o.started?.()):s.kind==="stop"?(t.stop(),o.stopped?.()):s.kind==="snapshot"&&(!l.running&&t.playing?(t.stop(),o.stopped?.()):l.running&&!t.playing&&i())});return e.transport.running&&i(),r}const su=.5,lu=20,cu=.2;class Oe{constructor(t){this.state=t}next=()=>{this.state=this.state+1831565813>>>0;let t=this.state;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const j=1e-9;class du{constructor(t){this.o=t,this.cur=this.latest=t.settings,this.ahead=t.aheadSec??su,this.lead=t.leadSec??cu}gen=null;random=new Oe(1);chordRandom=new Oe(2);cur;latest;genTo=0;runStart=0;snaps=[];history=[];pending=[];ahead;lead;stats={sent:0,resends:0,runs:0,phrases:0};get playing(){return this.gen!==null}get settings(){return this.latest}get sentTo(){return this.genTo}get startBeat(){return this.runStart}get queued(){return this.pending}beatsPerBar(){return Math.max(1,this.o.transport().meter?.beatsPerBar??4)}make(){return new kt(()=>this.cur,{random:this.random.next,chordRandom:this.chordRandom.next,beatsPerBar:()=>this.beatsPerBar()})}start(t,n=!1){const o=this.o.seed?.()??Math.floor(Math.random()*2147483648);this.random=new Oe(o>>>0),this.chordRandom=new Oe(o+1e3>>>0),this.cur=this.latest,this.pending=[],this.history=[],this.snaps=[],this.gen=this.make(),this.o.sink.restart(),this.gen.start(t,{join:n}),this.genTo=this.runStart=t,this.stats.runs++,this.pump()}stop(){this.gen&&(this.gen=null,this.pending=[],this.history=[],this.snaps=[],this.cur=this.latest,this.o.sink.off("stop"))}pump(){const t=this.o.transport();if(!this.gen||!t.running)return;const n=t.beatAt(this.o.now()+this.ahead);n>this.genTo+j&&this.advance(n,Number.NEGATIVE_INFINITY),this.prune(t.beatAt(this.o.now()))}changeBeat(){const t=this.o.transport();if(!this.gen||!t.running)return null;const n=Math.ceil(t.beatAt(this.o.now()+this.lead)-j);return Math.max(n,Math.ceil(this.runStart-j))}set(t,n={}){const o={...t};this.latest=o;const i=this.changeBeat();if(i===null)return this.gen||(this.cur=o),null;const r={beat:i,settings:o,...n.jump===void 0?{}:{jump:n.jump}},s=this.pending.filter(l=>l.beat>=i-j&&l.phrase!==void 0).map(l=>({...l,settings:o}));return this.pending=this.pending.filter(l=>l.beat<i-j),i>=this.genTo-j?(this.pending.push(r),this.queue(...s),i):(this.rewind(r),this.queue(...s),i)}phrase(t=this.o.seed?.()??Math.floor(Math.random()*2**31)){const n=this.changeBeat();if(n===null)return null;const o=this.beatsPerBar(),i=Math.ceil(n/o-j)*o;if(this.pending.some(s=>s.phrase!==void 0&&Math.abs(s.beat-i)<j))return i;const r={beat:i,settings:this.latest,jump:0,phrase:t>>>0};return this.stats.phrases++,i>=this.genTo-j?this.queue(r):this.rewind(r),i}queue(...t){t.length&&(this.pending.push(...t),this.pending.sort((n,o)=>n.beat-o.beat))}rewind(t){const n=t.beat,o=this.genTo;let i=this.snaps.length-1;for(;i>0&&this.snaps[i].from>n+j;)i--;const r=this.snaps[i];if(!r||r.from>n+j){this.pending.push(t);return}this.random=new Oe(r.random),this.chordRandom=new Oe(r.chordRandom),this.cur=r.settings,this.gen=r.gen.clone({settings:()=>this.cur,random:this.random.next,chordRandom:this.chordRandom.next}),this.genTo=r.from,this.snaps=this.snaps.slice(0,i);const s=this.history.filter(l=>l.beat>r.from+j&&l.beat<n-j);this.history=this.history.filter(l=>l.beat<=r.from+j),this.pending=[...s,t,...this.pending.filter(l=>l.beat>n+j)],this.o.sink.off("restart",n),this.stats.resends++,this.advance(o,n)}advance(t,n){const o=[];for(;this.pending.length&&this.pending[0].beat<t-j;){const r=this.pending.shift();o.push(...this.play(r.beat)),this.cur=r.settings,this.gen.barFrom()<r.beat&&this.gen.catchUpBars(r.beat),r.phrase!==void 0&&(this.random.state=r.phrase,this.chordRandom.state=r.phrase+1e3>>>0,this.gen.step=0),r.jump!==void 0&&this.gen.jumpToChord(r.jump,r.beat),this.history.push(r)}o.push(...this.play(t));const i=o.filter(r=>r.startBeat>=n-j);i.length&&(this.stats.sent+=i.length,this.o.sink.send(i))}play(t){const n=this.gen;if(t<=this.genTo+j)return[];this.snaps.push({from:this.genTo,gen:n.clone({settings:()=>this.cur}),random:this.random.state,chordRandom:this.chordRandom.state,settings:this.cur});const o=n.window(t);return this.genTo=t,o}prune(t){for(;this.snaps.length>1&&this.snaps[1].from<=t-j;)this.snaps.shift();const n=this.snaps[0]?.from??this.genTo;this.history=this.history.filter(o=>o.beat>n+j)}chordPosition(t){return this.gen?.chordPosition(t)??null}}const pu={"page:save":"Download CALLIOPE's settings, pads and targets as a file.","page:load":"Load a CALLIOPE file. What plays changes on the next beat.","page:panic":"Stop every note CALLIOPE is playing. It plays on from the next step.",mode:"Off rests. Single plays the Note. Chord plays the chord, pads and progression. Random picks notes in the Octave and up.",note:"The root note (and the key of a progression).",octave:"The octave the notes start from (C3 is middle C's octave below).","octave-range":"Random: how many octaves up from Octave it may pick.",chord:"The chord that plays when no pad holds and no progression runs.",browse:"Open the chord library: categories, search and favorites (stars).",category:"Which chords the list shows. Favorites are the starred ones.",search:"Find a chord by name or symbol in every category.",root:"Pad root: each pad plays its own root. Follow root: pads keep only the chord type and play on the Note.",pads:"Click a pad: its chord plays from the next beat and holds. A held pad pauses the Progression. Drag or Alt+arrows to reorder; ⋯ for more.","all-pads":"Show all sixteen pads.",progression:"A chord progression in the Note's key. A held pad pauses it; click a step to go back to it.","progression-off":"Turn the progression off: the Chord plays.","progression-step":"Play the progression from this chord, on the next bar line.",bars:"How long each chord of the progression lasts.",inversion:"Which chord tone is lowest.","voice-leading":"Smooth moves each chord to the nearest voicing. Fixed keeps the inversion.",style:"How the chord is played: held, walked, or in a groove. The arp plays instead when it is on.",strum:"Spread the chord's notes, down on the beat and up off it.",tension:"How often a colour tone joins the chord.",arp:"Play the chord one note at a time, in the Note order. Stopped, a bar of it plays at once; Play runs it in time.",latch:"On: a pad click holds the pad. Off: a pad plays while you press it.","note-order":"The order the arp plays the chord's notes in.",octaves:"How many octaves the arp climbs.",spread:"How wide the chord is voiced.",rate:"The arp's step (the Grid) and the tempo.",hits:"Euclidean: notes spread as evenly as they fit in the Steps.",steps:"Euclidean: the length of the pattern.",rotate:"Euclidean: where the pattern starts.",pattern:"The Euclidean pattern: x plays, . rests.",grid:"How often a step plays: quarters, eighths, triplets…",gate:"How long each note lasts, as a share of its step.","now-playing":"What CALLIOPE plays now, and what comes next.",targets:"The instruments CALLIOPE plays, each as a chord, its root or its top note.","target-on":"Play this instrument from CALLIOPE. Off, it plays its own part again.","add-synth":"Add a Synth to the Studio. CALLIOPE turns it on and plays it at once.",role:"Chord: every note. Root: the chord's root only. Top: the top note only.","target-octave":"Move what this instrument gets up or down by whole octaves.",inputs:"Signals from ARIA that steer CALLIOPE. Each one can set one thing; Ignore leaves it out.","input:energy":"How much the ground moves (ARIA's Ground Energy). Its normal keeps the Rhythm as set.","input:tiltX":"Tip the phone left or right. Right raises the setting; centre keeps the Rhythm as set.","input:tiltY":"Tilt forward for more, back for less. Centre keeps the Rhythm as set.","input:heading":"Which way the phone points. Turning it clockwise raises the setting; south keeps it as set.","input:shake:ignore":"Shake the phone to start a new phrase, move to the next chord or play the next pad.","input:shake:phrase":"Each shake starts a new phrase on the next bar.","input:shake:chord":"Each shake moves the progression to its next chord, on the next bar.","input:shake:pad":"Each shake plays the next pad, as a click on it."},St=e=>pu[e]??"",uu={energy:"ignore",tiltX:"ignore",tiltY:"ignore",heading:"ignore",shake:"ignore"},hu=["energy","tiltX","tiltY","heading"],is=[{value:"ignore",label:"Ignore"},{value:"density",label:"Density"},{value:"gate",label:"Gate"},{value:"tension",label:"Tension"},{value:"octave",label:"Octave"},{value:"strum",label:"Strum"}],ss=[{value:"ignore",label:"Ignore"},{value:"phrase",label:"New phrase"},{value:"chord",label:"Next chord"},{value:"pad",label:"Next pad"}],Ya={energy:null,tiltX:null,tiltY:null,heading:null};function ls(e,t){if(t===null||!Number.isFinite(t))return 0;const n=e==="tiltX"||e==="tiltY"?t:t*2-1;return n<-1?-1:n>1?1:n}const cs=(e,t)=>(ls(e,t)+1)/2,Ut={density:{n:2,size:1},gate:{n:4,size:10},tension:{n:5,size:20},octave:{n:1,size:1},strum:{n:4,size:10}},mu=.15;function fu(e,t,n=0){const o=e*t;return Math.abs(o-n)<.5+mu?n:Math.max(-t,Math.min(t,Math.round(o)))}class gu{last=new Map;steps(t,n){const o=new Map;for(const i of hu){const r=t[i];if(r==="ignore"){this.last.delete(i);continue}const s=fu(ls(i,n[i]),Ut[r].n,this.last.get(i)??0);this.last.set(i,s),o.set(i,{target:r,step:s})}return o}}function bu(e,t){const n=Ma(e);if(!n||!t)return e;const o=ft.filter(r=>r.kind===n.kind).map(r=>r.value),i=o.indexOf(n.value);return o[Math.max(0,Math.min(o.length-1,i+t))]??e}function vu(e,t){const n={};for(const{target:r,step:s}of t.values())s&&(n[r]=(n[r]??0)+s);if(!Object.keys(n).length)return e;const o=(r,s,l)=>Math.min(l,Math.max(s,r)),i={...e};return n.density&&(i.interval=bu(e.interval,n.density)),n.gate&&(i.gate=o(e.gate+n.gate*Ut.gate.size,10,100)),n.tension&&(i.tension=o(e.tension+n.tension*Ut.tension.size,0,100)),n.octave&&(i.octave=o(e.octave+n.octave,0,7)),n.strum&&(i.strum=o(e.strum+n.strum*Ut.strum.size,0,40)),i}const yu={energy:"more energy",tiltX:"right",tiltY:"forward",heading:"clockwise"},wu={density:"more notes",gate:"longer notes",tension:"more colour",octave:"higher",strum:"slower strum"};function xu(e,t,n){if(t==="ignore")return"";const o=Math.round(cs(e,n)*100);return`${yu[e]} = ${wu[t]} · ${n===null?"—":`${o}%`}`}function $u(e,t){const n={ignore:"",phrase:"next bar",chord:"next chord",pad:"next pad"}[e];if(!n)return"";if(t===null)return`${n} · no shake yet`;const o=t<90?`${Math.max(0,Math.round(t))} s`:`${Math.round(t/60)} min`;return`${n} · ${o} ago`}function ku(e,t){const n=e.length;for(let o=1;o<=n;o++){const i=(((t??-1)+o)%n+n)%n;if(e[i])return i}return null}function Eu(e){const t=e&&typeof e=="object"?e:{},n=o=>is.some(i=>i.value===o)?o:"ignore";return{energy:n(t.energy),tiltX:n(t.tiltX),tiltY:n(t.tiltY),heading:n(t.heading),shake:ss.some(o=>o.value===t.shake)?t.shake:"ignore"}}function Au(e){const t=e.energy!=="ignore",n=e.tiltX!=="ignore"||e.tiltY!=="ignore"||e.heading!=="ignore"||e.shake!=="ignore";return!t&&!n?null:{...t?{energy:!0}:{},...n?{motion:!0}:{}}}const Su=Fe.filter(e=>e.category==="Essential"||e.category==="Seventh"||e.category==="Extended"),fr=e=>[...new Set(e.map(t=>(t%12+12)%12))],Mu=(e,t)=>e.length===t.length&&e.every(n=>t.includes(n));function Cu(e,t){const n=e.filter(s=>Number.isInteger(s)&&s>=0&&s<=127);if(!n.length)return null;const o=[...n].sort((s,l)=>s-l),i=(o[0]%12+12)%12,r=fr(o);if(r.length>=2){const s=[i,...r.filter(l=>l!==i)];for(const l of s)for(const c of Su){const d=c.intervals.map(h=>(l+h)%12);if(!Mu(fr(d),r))continue;const p=[...new Set(d)],u=Math.max(0,p.indexOf(i));return{chord:c.id,root:l,inversion:u}}}return{chord:t,root:i,inversion:0}}const Lu="netcomposer.calliope.pads-hint.v1",ds=8e3,Tu="netcomposer.calliope.press-play-note.v1";function ps(e,t){let n=!1;return{seen(){if(n)return!0;try{return t()?.getItem(e)==="1"}catch{return!1}},mark(){n=!0;try{t()?.setItem(e,"1")}catch{}}}}function Iu(e){const t=ps(Lu,e.storage);return{seen:t.seen,show(n,o){return!o||t.seen()||!e.pin(n,o,{ms:ds})?!1:(t.mark(),!0)},skip:()=>t.mark()}}const us="netcomposer.calliope",hs=1,gr="netcomposer.calliope.v1",Fu=["chord","root","top"],Yt=-3,ms=3,Nu=["sus2","major-7","minor-7","dominant-7","7sus4","add9","major-9","minor-9","minor-11","dominant-13"],ae=(e,t)=>({chord:e,root:t,inversion:0});function zu(){const e=La();return[ae("major-7",0),ae("minor-7",9),ae("minor-9",2),ae("7sus4",7),ae("major-7",5),ae("minor-7",4),ae("minor-9",9),ae("dominant-13",7),ae("add9",0),ae("major-9",5),ae("minor-11",2),ae("sus2",4)].forEach((t,n)=>{e[n]=t}),e}function fs(){return{...Il,mode:"chord",note:9,octave:3,chord:"minor-7",interval:8,gate:75,voiceLeading:"smooth",favoriteChords:[...Nu],chordPads:zu(),chordPadMode:"pad"}}function gs(){return{gen:fs(),chordCategory:"Favorites",held:null,latch:!0,lastArp:"up",targets:{},inputs:{...uu},targetsTouched:!1}}function yt(e){const t=e.held===null?null:e.gen.chordPads[e.held];return t?{...e.gen,...Ur(t,e.gen.chordPadMode,e.gen.chordProgression)}:e.gen}const Pu=e=>e.held===null?null:e.gen.chordPads[e.held]??null,bs=e=>e.gen.chordProgression!=="off"&&Pu(e)!==null;function mn(e,t){return t<0||t>=Ke||!e.gen.chordPads[t]?e:{...e,held:t}}const ma=e=>({...e,held:null});function Wa(e){return{...e,held:null}}function P(e,t){const n={...e.gen,...t};let o=e.held;return o!==null&&!n.chordPads[o]&&(o=null),("chord"in t||"note"in t)&&!("chordPads"in t)&&(o=null),{...e,gen:n,held:o}}function qn(e,t){const n=e.gen.chordProgression==="off",o=P(e,n&&t!=="off"?{chordProgression:t,voiceLeading:"smooth"}:{chordProgression:t});return t!=="off"?{...o,held:null}:o}function Du(e){return e.gen.arp!=="off"?{...P(e,{arp:"off"}),lastArp:e.gen.arp}:P(e,{arp:e.lastArp==="off"?"up":e.lastArp})}function Xa(e,t,n){return{...wt(e,t,n),targetsTouched:!0}}function wt(e,t,n){const o=e.targets[t]??{on:!1,role:"chord",octave:0},i=vs({...o,...n});return{...e,targets:{...e.targets,[t]:i}}}const Wt=(e,t,n,o)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):o,me=(e,t,n,o)=>Math.round(Wt(e,t,n,o)),xe=(e,t,n)=>t.includes(e)?e:n;function vs(e){const t=e&&typeof e=="object"?e:{};return{on:t.on===!0,role:xe(t.role,Fu,"chord"),octave:me(t.octave,Yt,ms,0)}}function qu(e){const t=fs(),n=e&&typeof e=="object"?e:{},o=me(n.note,0,11,t.note),i=Array.isArray(n.favoriteChords)?[...new Set(n.favoriteChords.filter(l=>typeof l=="string").map(qe))]:t.favoriteChords,r=typeof n.chord=="string"?qe(n.chord):t.chord,s=Pr(n.arp)??t.arp;return{mode:Yr(n.mode)?n.mode:t.mode,note:o,octave:me(n.octave,0,7,t.octave),octaveRange:me(n.octaveRange,1,3,t.octaveRange),chord:r,inversion:me(n.inversion,0,Y(r).intervals.length-1,0),interval:kl(n.interval,t.interval),gate:Wt(n.gate,10,100,t.gate),arp:s,arpOctaves:me(n.arpOctaves,1,4,t.arpOctaves),arpSpread:xe(n.arpSpread,["compact","wide","wider","maximum"],t.arpSpread),arpHits:me(n.arpHits,1,16,t.arpHits),arpSteps:me(n.arpSteps,1,16,t.arpSteps),arpRotate:me(n.arpRotate,0,15,t.arpRotate),chordStyle:xe(n.chordStyle,dl,t.chordStyle),voiceLeading:xe(n.voiceLeading,["fixed","smooth"],t.voiceLeading),strum:Wt(n.strum,0,40,0),tension:Wt(n.tension,0,100,0),chordProgression:xe(n.chordProgression,["off",...$l],"off"),progressionBars:xe(n.progressionBars,Hr,0),favoriteChords:i,chordPads:Array.isArray(n.chordPads)?El(n.chordPads,o):t.chordPads,chordPadMode:xe(n.chordPadMode,["pad","follow"],"pad")}}function ys(e){const t=gs(),n=e&&typeof e=="object"?e:{},o=qu(n.gen),i=typeof n.held=="number"&&Number.isInteger(n.held)&&o.chordPads[n.held]?n.held:null,r={};if(n.targets&&typeof n.targets=="object")for(const[l,c]of Object.entries(n.targets))l&&l.length<=64&&(r[l]=vs(c));const s=Pr(n.lastArp);return{gen:o,chordCategory:xe(n.chordCategory,["Favorites",...Fr],t.chordCategory),held:i,latch:n.latch!==!1,lastArp:s&&s!=="off"?s:t.lastArp,targets:r,inputs:Eu(n.inputs),targetsTouched:typeof n.targetsTouched=="boolean"?n.targetsTouched:Object.keys(r).length>0}}function ws(e){return{format:us,version:hs,state:e}}function xs(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==us||typeof t.version!="number"||t.version>hs?null:{...ys(t.state),targetsTouched:!0}}function ju(e){return{...yt(e),chordPads:e.gen.chordPads,favoriteChords:e.gen.favoriteChords}}Re.filter(e=>!e.legacy).map(e=>e.id);function $s(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let He;function Ru(e,t=$s()){if(He!==void 0)return He;He=null;try{if(typeof window>"u"||window.parent===window)return He;const n=window.parent.ncStudio;n&&n.version===1&&(He=n.attach(e,{instance:t}))}catch{}return He}const br={"olive-bass":"keeps its rhythm · takes the root",nyx:"keeps its hits · pads that follow take the root"},vr={"olive-bass":"not ready yet · takes the root once loaded",nyx:"not ready yet · takes the root once loaded"},ks=["calliope"];function Mt(e,t,n){const o=[],i=[],r=[];for(const s of e){if(s.instance===n||ks.includes(s.type))continue;const l=s.n>1&&s.name.endsWith(` ${s.n}`)?s.name.slice(0,-` ${s.n}`.length):s.name,c={instance:s.instance,name:s.name,label:l,n:s.n},d=s.takesPitch??br[s.type]!==void 0;s.layerOnly?r.includes(l)||r.push(l):s.takesNotes?o.push({...c,playable:!0,pitch:d,note:d?br[s.type]??"takes the root":""}):vr[s.type]?i.push({...c,playable:!1,pitch:d,note:vr[s.type]}):r.includes(l)||r.push(l)}return{playable:o,coming:i,none:r}}function Bu(e,t){const n=[];for(const o of e){if(!o.takesNotes||o.layerOnly)continue;const i=t[o.instance],r=Mt([o],{},"").playable[0]?.pitch===!0;n.push({instance:o.instance,setting:{role:r?"root":i?.role??"chord",on:i?.on===!0,transpose:(i?.octave??0)*12}})}return n}function Ou(e,t,n){return Mt(e,t,n).playable.some(o=>{const i=t[o.instance];return!o.pitch&&i?.on===!0&&i.role!=="root"})}const Ka="astrid-synth";function Hu(e,t,n){if(e.some(c=>c.instance!==n&&ks.includes(c.type)))return null;const o=Mt(e,t,n).playable,i=e.some(c=>c.type===Ka&&!c.takesNotes&&!c.layerOnly),s=o.find(c=>!c.pitch)??(i?void 0:o.find(c=>c.pitch));if(!s&&i)return null;let l=null;for(const c of o){const d=t[c.instance],p=c.instance===s?.instance;p!==(d?.on===!0)&&(l??={...t},l[c.instance]=p?{on:!0,role:c.pitch?"root":"chord",octave:d?.octave??0}:{role:d?.role??"chord",octave:d?.octave??0,on:!1})}for(const[c,d]of Object.entries(t))d.on&&!e.some(p=>p.instance===c)&&(l??={...t},l[c]={...d,on:!1});return l}function Es(e,t){return e.some(n=>n.type===Ka&&!n.layerOnly)||Mt(e,{},t).playable.some(n=>!n.pitch)}function Vu(e,t,n){return Es(e,n)?Ou(e,t,n)?null:"turn-on":"add-synth"}const ut=e=>`${Ce[(e%12+12)%12]}${Math.floor(e/12)-1}`;function xt(e,t){return`${Ce[(e%12+12)%12]}${Y(t).symbol}`}function As(e,t){return xt(t.chordPadMode==="follow"?t.note:e.root,e.chord)}class _u{marks=[];reset(t,n){this.marks=[{beat:Number.NEGATIVE_INFINITY,settings:t,pad:n}]}mark(t){this.marks=this.marks.filter(n=>n.beat<t.beat-1e-9),this.marks.push(t)}at(t){let n=this.marks[0];for(const o of this.marks)o.beat<=t+1e-9&&(n=o);return n}after(t){return this.marks.find(n=>n.beat>t+1e-9)??null}prune(t){for(;this.marks.length>1&&this.marks[1].beat<=t+1e-9;)this.marks.shift()}get size(){return this.marks.length}}function Xt(e,t){const n=e.settings,o=n.chordPads??[],i=e.pad===null?null:o[e.pad]??null;if(n.mode!=="chord")return{name:n.mode==="off"?"—":n.mode==="random"?"Random":ut((n.octave+1)*12+n.note),detail:n.mode==="off"?"Mode is Off":`${n.mode==="random"?"Random notes":"Single note"}`,voicing:"",pad:null,step:null};const r=ue(n.chordProgression,n.note,n.octave,n.progressionBars);if(r?.length&&!i){const d=Math.min(t?.index??0,r.length-1),p=r[d],u=Xe(p.root,p.chord,p.inversion??Math.min(n.inversion,p.intervals.length-1),n.arpSpread);return{name:p.name,detail:`${p.numeral} · from the progression`,voicing:u.map(ut).join(" "),pad:null,step:d}}const s=(n.octave+1)*12+n.note,l=Y(n.chord),c=Xe(s,l.id,n.inversion,n.arpSpread).map(ut).join(" ");return i&&e.pad!==null?{name:xt(n.note,n.chord),detail:`Pad ${e.pad+1} · held`,voicing:c,pad:e.pad,step:null}:{name:xt(n.note,n.chord),detail:`${l.name} · ${l.category}`,voicing:c,pad:null,step:null}}function yr(e,t){const n=ue(e.chordProgression,e.note,e.octave,e.progressionBars);if(!n||n.length<2)return null;const o=(t+1)%n.length;return{name:n[o].name,bar:Math.floor(Sa(n,o))%Math.max(1,pn(n))+1}}function Ss(e,t=4){const n=Math.max(0,e);return{bar:Math.floor(n/t+1e-9)+1,beat:Math.floor(n%t+1e-9)+1}}const Ja=$s(),Qa=String(Ja).padStart(2,"0"),q=Ru("calliope",Ja),Ms=q?.storageKey?.(gr)??gr,fa="netcomposer.calliope.hidden.v1",Cs="netcomposer.calliope.ui.v1",Gu=`CALLIOPE ${Ja}`,$t="(max-width: 768px)";function Me(){try{return globalThis.localStorage??null}catch{return null}}function Uu(){try{const e=Me()?.getItem(Ms);return e?ys(JSON.parse(e)):wr()}catch{return wr()}}function wr(){const e=gs();return q?.legacyCopy===!1?{...e,targetsTouched:!0}:e}let jn=null;function Yu(){jn===null&&(jn=window.setTimeout(()=>{jn=null;try{Me()?.setItem(Ms,JSON.stringify($))}catch{}},200))}const le=(()=>{try{return{library:JSON.parse(Me()?.getItem(Cs)??"null")?.library??!window.matchMedia($t).matches,allPads:!1,progression:!1}}catch{return{library:!window.matchMedia($t).matches,allPads:!1,progression:!1}}})();function Wu(){try{Me()?.setItem(Cs,JSON.stringify({library:le.library}))}catch{}}let $=Uu();const ga=q?.clock??null,te=q?.notesSource?.(Gu)??null,Xu={running:!1,startTime:null,beatAt:()=>0,timeAt:()=>0},Ct=()=>ga?.transport??Xu;let ke=[];const Lt=new nu(()=>te,()=>performance.now()/1e3),Za=new ru(Lt),eo=k("p",{class:"cal-play-note","data-cal":"press-play",role:"status",hidden:""},"Press Play to run it in time."),xr=ps(Tu,Me);let $e={...Ya},ba=0,va=null;const Ku=new gu;let ce=null;const fn=()=>vu(ce?{...yt($),...Ur(ce,"pad",$.gen.chordProgression)}:yt($),Ku.steps($.inputs,$e));let ge=fn();const R=new du({transport:Ct,now:mt,settings:ge,sink:{send(e){for(const t of e)ke.push({start:t.startBeat,end:t.startBeat+t.lengthBeats});te?.send(e)},off(e,t){ke=t===void 0?[]:ke.filter(n=>n.start<t),te?.off(e,t)},restart(){ke=[],Za.cancel(),Lt.release(),eo.hidden=!0,te?.restart()}}}),re=new _u;re.reset(ge,$.held);let Ze=0;const $r=e=>JSON.stringify({...e,favoriteChords:0,chordPads:0});function T(e,t={}){$=e,Yu(),to(t),Ls(),no(),V()}function to(e={}){const t=fn();if($r(ge)===$r(t)&&e.jump===void 0)return;ge=t;const n=R.set(t,e);n===null?(re.reset(t,$.held),e.jump!==void 0&&(Ze=e.jump)):re.mark({beat:n,settings:t,pad:$.held,...e})}function Ju(){try{return q?.situationSources?.()[0]?.name??null}catch{return null}}let qt=null,kr="";function Ls(){const e=Au($.inputs),t=JSON.stringify(e);if(t!==kr){if(kr=t,qt?.(),qt=null,!e){$e={...Ya};return}try{qt=q?.situationIn?.(Qu,e)??null}catch{qt=null}}}function Qu(e){const t=Xl(e);if(t){if(t.kind==="energy"){const n=t.frames.at(-1);n&&($e={...$e,energy:n.value})}else if(t.kind==="motion"){const n=t.frames.at(-1);n&&($e={...$e,tiltX:n.tiltX,tiltY:n.tiltY,heading:n.heading},ba=n.shake)}else if(t.kind==="shake")Zu();else if(t.kind==="off"&&t.reason==="removed")$e={...Ya},ba=0;else return;to(),kh()}}function Zu(){va=performance.now();const e=$.inputs.shake;if(e==="phrase"){const t=R.phrase();t!==null&&re.mark({beat:t,settings:ge,pad:$.held,jump:0})}else if(e==="chord"){const t=$.gen,n=ue(t.chordProgression,t.note,t.octave,t.progressionBars);if(!n?.length)return;const o=ao(),i=o===null?Ze:R.chordPosition(o)?.index??Ze;T(Wa($),{jump:(i+1)%n.length})}else if(e==="pad"){const t=ku($.gen.chordPads,$.held);t!==null&&io(t)}}let be=[];function Ts(){try{be=q?.notesTargets?.()??[]}catch{be=[]}}const ya=new Map;function Is(){if(!q||!te||$.targetsTouched)return;const e=Hu(be,$.targets,q.instance??"");e&&T({...$,targets:e})}let De=null,Ye=null;const eh=3e4,Fs=()=>typeof q?.addInstrument=="function"&&!!te;function Ns(){if(De||!Fs())return;let e=null;try{e=q?.addInstrument?.({v:1,type:Ka})??null}catch{e=null}typeof e=="string"&&(De=e,Ye!==null&&window.clearTimeout(Ye),Ye=window.setTimeout(()=>{De=null,V()},eh),V())}function th(){const e=De;return!e||!be.some(t=>t.instance===e&&t.takesNotes)?!1:(De=null,Ye!==null&&window.clearTimeout(Ye),Ye=null,T(wt($,e,{on:!0,role:"chord"})),!0)}function zs(e){if(!Fs())return null;const t=O(De?"Adding…":"Add Synth",{class:"nc-btn cal-add-btn","data-cal-id":`add-synth-${e}`,...ee("add-synth")},()=>Ns());return t.disabled=De!==null,t}function no(){if(te)for(const{instance:e,setting:t}of Bu(be,$.targets)){const n=JSON.stringify(t);ya.get(e)!==n&&(ya.set(e,n),te.setTarget(e,t))}}function k(e,t={},...n){const o=document.createElement(e);for(const[i,r]of Object.entries(t))r!==void 0&&o.setAttribute(i,r);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const ee=e=>({[vt]:St(e)||void 0});function O(e,t,n){const o=k("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function W(e,t,n){return k(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?ee(t):{}},e)}function gn(e,t,n,o,i,r=!1){const s=k("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-cal-id":e});for(const l of n){const c=O(l.label,{role:"radio","aria-checked":String(l.value===o),"data-value":l.value,"data-cal-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});c.disabled=r||l.disabled===!0,s.append(c)}return s}function H(e,t,n,o,i,r,s=!1){const l=k("select",{class:"nc-select",id:`cal-${e}`,"data-cal-id":e});let c=null;for(const d of o){const p=k("option",{value:d.value},d.label);d.group&&c?.label!==d.group?(c=k("optgroup",{label:d.group}),l.append(c)):d.group||(c=null),(c??l).append(p)}return l.value=i,l.disabled=s,l.addEventListener("change",()=>r(l.value)),k("div",{class:"cal-field"},W(t,n,`cal-${e}`),l)}const nh=e=>e>0?`+${e}`:e<0?`−${-e}`:"0",Ps=e=>e===0?"Root":`${e}${["st","nd","rd"][e-1]??"th"}`;function Se(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.calId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-cal-id="${CSS.escape(o)}"]`)?.focus()}const Ds=document.getElementById("app");Ds.classList.add("nc","nc-page");const qs=Hp();function ah(){const e=new Blob([JSON.stringify(ws($),null,2)],{type:"application/json"}),t=k("a",{href:URL.createObjectURL(e),download:`calliope-${Qa}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const We=k("input",{type:"file",accept:".json,application/json"});We.hidden=!0;let ln="";We.addEventListener("change",async()=>{const e=We.files?.[0];if(We.value="",!(!e||e.size>256*1024)){try{const t=xs(JSON.parse(await e.text()));if(!t)throw new Error("not a CALLIOPE file");T(t),ln=`Loaded ${e.name}.`}catch(t){ln=`Couldn't load ${e.name}: ${t.message}.`}V()}});function oh(){R.stop();const e=Ct();e.running&&R.start(e.beatAt(Math.max(e.startTime??mt(),mt())),!0),re.reset(ge,$.held)}const wa=(e,t)=>O(e,{class:"nc-page-action","data-cal-action":e.toLowerCase(),...ee(`page:${e.toLowerCase()}`)},t),Er=Yp({panel:k("div",{},wa("Save",ah),wa("Load",()=>We.click()))}),rh=k("header",{class:"nc-page-hd"},k("div",{},k("h1",{class:"nc-page-title"},k("span",{class:"cal-brand"},"CALLIOPE")," ",k("span",{class:"nc-page-sep"},"/")," GENERATOR ",k("span",{class:"nc-page-sep"},"/")," ",k("span",{class:"nc-mono"},Qa)),k("p",{class:"nc-page-sub"},"A TRIKI instrument.")),k("div",{class:"nc-page-actions"},Er.panel,wa("Panic",oh),Er.button,We)),js=k("div",{class:"nc-stack cal-stack","data-nc-layout":"adjacent"}),Rs=k("footer",{class:"cal-foot"},k("span",{},"double-click any slider to reset"),k("span",{},`netcomposer.generator.${Qa}`));Ds.append(rh,k("main",{class:"nc-page-body"},js),Rs);window.matchMedia($t).matches&&!Me()?.getItem(fa)&&pa(Me(),"rhythm",!0,fa);function Tt(e,t,n){const o=k("div",{class:"cal-body","data-cal-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),r=eu(i(),fa),s=()=>{const l=r.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return s(),{handle:r,mount:o,update(){r.update(i()),s()}}}function ao(){const e=Ct();return R.playing&&e.running?e.beatAt(mt()):null}function et(){return Math.max(1,Ct().meter?.beatsPerBar??4)}function oo(){const e=ao();if(e===null){const s={settings:ge,pad:$.held},l=ue($.gen.chordProgression,$.gen.note,$.gen.octave,$.gen.progressionBars),c=Xt(s,{index:Math.min(Ze,(l?.length??1)-1)}),d=$.held===null&&c.step!==null?yr(s.settings,c.step):null;return{playing:!1,beat:0,now:c,activePad:$.held,queuedPad:null,queuedBeat:null,next:d?{name:d.name,detail:"",when:`bar ${d.bar}`}:null,step:c.step}}const t=re.at(e),n=t.pad===null?R.chordPosition(e):null,o=Xt(t,n),i=re.after(e);let r=null;if(i){const s=Xt(i,i.jump!==void 0?{index:i.jump}:R.chordPosition(i.beat)),l=Ss(i.beat,et()),c=i.beat-e<=1+1e-6;r={name:s.name,detail:s.pad!==null?`Pad ${s.pad+1}`:s.step!==null?"progression":"",when:`on ${l.beat===1?`bar ${l.bar}`:`beat ${l.beat}`}${c?" (next beat)":""}`}}else if(o.step!==null&&n){const s=yr(t.settings,o.step);s&&(r={name:s.name,detail:"",when:`on bar ${s.bar}`})}return{playing:!0,beat:e,now:o,activePad:t.pad,queuedPad:i?.pad??null,queuedBeat:i?.beat??null,next:r,step:o.step}}function Bs(e){const t=k("div",{class:"cal-now","data-cal-now":e,role:"status"}),n=k("div",{class:"cal-now-hd"},W("Now playing","now-playing"),k("span",{class:"cal-mono cal-sub","data-cal":"pos"})),o=k("div",{class:"cal-now-name","data-cal":"name"}),i=k("span",{class:"cal-mono cal-sub","data-cal":"detail"}),r=k("div",{class:"cal-mono cal-sub cal-small","data-cal":"voicing"}),s=k("span",{class:"cal-meter","aria-hidden":"true"});for(let p=0;p<4;p++)s.append(k("i",{}));const l=k("div",{class:"cal-next"},W("Next"),k("span",{class:"cal-next-name","data-cal":"next"}),s),c=k("div",{class:"cal-mono cal-sub cal-small","data-cal":"when"});t.append(n,k("div",{class:"cal-now-row"},o,i),r,l,c);let d="";return{el:t,tick(p){const u=Ss(p.beat,et()),h=JSON.stringify([p.playing,u,p.now,p.next]);h!==d&&(d=h,n.lastChild.textContent=p.playing?`bar ${u.bar} · beat ${u.beat}`:"stopped",o.textContent=p.now.name,i.textContent=p.now.detail,r.textContent=p.now.voicing,l.children[1].textContent=p.next?`${p.next.name}${p.next.detail?` · ${p.next.detail}`:""}`:"—",c.textContent=p.next?.when??"",[...s.children].forEach((m,g)=>m.toggleAttribute("data-on",p.playing&&g<u.beat)),s.style.setProperty("--cal-beats",String(et())))}}}const Os=Bs("targets"),Hs=Bs("pads"),Vs=Tt("mode","Mode",()=>`${$.gen.mode} · ${Ce[$.gen.note]}${$.gen.octave}`),tt=Tt("chord","Chord",()=>Xt({settings:$.gen,pad:null},null).name);tt.handle.el.dataset.ncPlace="stack";tt.handle.el.dataset.ncShade="1";function ih(){const e=$.gen,t=[k("div",{class:"cal-field"},W("Mode","mode"),gn("mode","Mode",[{value:"off",label:"Off"},{value:"single",label:"Single"},{value:"chord",label:"Chord"},{value:"random",label:"Random"}],e.mode,n=>T(P($,{mode:n})))),k("div",{class:"cal-grid2"},H("note","Note","note",Ce.map((n,o)=>({value:String(o),label:n})),String(e.note),n=>T(P($,{note:Number(n)}))),H("octave","Octave","octave",[1,2,3,4,5,6].map(n=>({value:String(n),label:String(n)})),String(e.octave),n=>T(P($,{octave:Number(n)}))))];e.mode==="random"&&t.push(H("octave-range","Octave range","octave-range",[1,2,3].map(n=>({value:String(n),label:`${n} oct`})),String(e.octaveRange),n=>T(P($,{octaveRange:Number(n)})))),Se(Vs.mount,...t,tt.handle.el)}let lt="";const ht=k("input",{type:"search",class:"cal-input",id:"cal-search",placeholder:"all categories","data-cal-id":"search"});ht.addEventListener("input",()=>{lt=ht.value,ro()});function ro(){const e=$.gen,t=Y(e.chord),n=e.favoriteChords,o=Xe((e.octave+1)*12+e.note,t.id,e.inversion,e.arpSpread).map(ut).join(" "),i=k("div",{class:"cal-row-between"},W("Chord","chord"),O(le.library?"Close library":"Browse chords",{class:"nc-page-action cal-ghost","aria-expanded":String(le.library),"data-cal-id":"browse",...ee("browse")},()=>{le.library=!le.library,Wu(),ro()})),r=k("div",{},k("div",{class:"cal-chord-name","data-cal":"chord-name"},xt(e.note,e.chord)),k("div",{class:"cal-sub cal-small"},`${t.name} · ${t.category}`),k("div",{class:"cal-mono cal-sub cal-small cal-voicing"},o));let s=null;if(le.library){const l=lt.trim().toLowerCase(),c=l?Fe.filter(p=>p.name.toLowerCase().includes(l)||p.symbol.trim().toLowerCase().includes(l)||p.id.includes(l)):$.chordCategory==="Favorites"?Fe.filter(p=>n.includes(p.id)):Fe.filter(p=>p.category===$.chordCategory),d=k("ul",{class:"cal-library","aria-label":"Chord library"});for(const p of c){const u=p.id===e.chord,h=n.includes(p.id),m=O("",{class:"cal-lib-pick","aria-current":String(u),"data-cal-id":`chord-${p.id}`},()=>T(P($,{chord:p.id,inversion:Math.min(e.inversion,p.intervals.length-1)})));m.append(k("span",{class:"cal-ellipsis"},p.name),k("span",{class:"cal-mono cal-sub cal-small"},`${l?`${p.category} · `:""}${p.intervals.length}n`));const g=O(h?"★":"☆",{class:"cal-star","aria-pressed":String(h),"aria-label":`${h?"Unfavorite":"Favorite"} ${p.name}`,"data-cal-id":`star-${p.id}`},()=>T(P($,h?{favoriteChords:n.filter(v=>v!==p.id)}:{favoriteChords:[...n,p.id],chordPads:Sl(e.chordPads,p.id,e.note)})));d.append(k("li",{class:"cal-lib-row","data-on":String(u)},m,g))}c.length||d.append(k("li",{class:"cal-sub cal-small"},l?`No chord named “${lt.trim()}”.`:"No favorites yet. Star chords to collect them here.")),ht.value!==lt&&(ht.value=lt),s=k("div",{class:"cal-browser",id:"cal-browser"},k("div",{class:"cal-grid2"},H("category","Category","category",[{value:"Favorites",label:`Favorites (${n.length})`},...Fr.map(p=>({value:p,label:p}))],$.chordCategory,p=>T({...$,chordCategory:p})),k("div",{class:"cal-field"},W("Search","search","cal-search"),ht)),k("div",{class:"cal-mono cal-sub cal-small","aria-live":"polite"},l?`${c.length} match${c.length===1?"":"es"} across all categories`:`${c.length} in ${$.chordCategory}`),d)}Se(tt.mount,i,r,s)}const bn=Tt("pads","Chord pads",()=>`${$.gen.chordPads.filter(Boolean).length} pads${$.held!==null?` · Pad ${$.held+1} held`:""}`),sh=k("span",{id:"cal-pads-help",class:"cal-sr"},St("pads")),oe=k("div",{class:"cal-pads",role:"group","aria-label":"Chord pads","aria-describedby":"cal-pads-help"}),jt=Iu({storage:Me,pin:(e,t,n)=>qs.pin(e,t,n)});function lh(){if(document.visibilityState==="hidden")return!1;try{const e=window.frameElement;return e?getComputedStyle(e).visibility!=="hidden"&&e.getClientRects().length>0:!0}catch{return!0}}const Rn=k("p",{class:"cal-mono cal-sub cal-small","data-cal":"keys",hidden:""}),ct=new Set;function Ar(){const e=ce;ce=Cu([...ct],$.gen.chord),to(),R.playing||(ce?Lt.play(fn()):e&&cn()),V()}q?.midiIn?.(e=>{if(!(!e||typeof e!="object"))try{if(e.kind==="release-all"){ct.size&&(ct.clear(),Ar()),!$.latch&&rt!==null&&$.held===rt&&(T(ma($)),cn()),rt=null;return}if(e.kind==="note"&&Number.isInteger(e.note)){const t=e.note;if(e.on===!0)ct.add(t);else if(!ct.delete(t))return;Ar();return}if(e.kind==="pad"&&Number.isInteger(e.pad)){const t=e.pad-1;if(t<0||t>=Ke||!$.gen.chordPads[t])return;e.on===!0?(rt=t,$.latch?io(t):(T(mn($,t)),R.playing||so())):!$.latch&&$.held===t&&(rt=null,T(ma($)),cn())}}catch{}},{keys:!0,pads:!0});let rt=null;function ch(){if(jt.seen()||typeof IntersectionObserver>"u")return;let e=!1,t=0;const n=()=>{i.disconnect(),clearInterval(t)},o=()=>{if(jt.seen())return n();if(!(!e||!lh())&&jt.show(oe,St("pads"))){n();try{const s=window.parent!==window?window.parent.document:null;if(!s)return;const l=()=>{s.removeEventListener("pointerdown",c,!0),s.removeEventListener("keydown",c,!0)},c=()=>{qs.hide(),l()};s.addEventListener("pointerdown",c,!0),s.addEventListener("keydown",c,!0),setTimeout(l,ds)}catch{}}},i=new IntersectionObserver(s=>{e=s.some(l=>l.isIntersecting&&l.intersectionRatio>0),o()},{threshold:[0,.25]});i.observe(oe);const r=()=>{jt.skip(),n(),oe.removeEventListener("pointerdown",r,!0),oe.removeEventListener("keydown",r,!0)};oe.addEventListener("pointerdown",r,!0),oe.addEventListener("keydown",r,!0),t=window.setInterval(o,400),document.addEventListener("visibilitychange",o)}let J=null,Ve=null,Rt=!1;function dh(e,t){const n=document.elementFromPoint(e,t)?.closest("[data-pad-index]"),o=n?Number(n.getAttribute("data-pad-index")):Number.NaN;return Number.isInteger(o)?o:null}function io(e){if(!$.gen.chordPads[e]){J=J===e?null:e,V();return}$.held===e&&re.after(ao()??Number.POSITIVE_INFINITY)===null&&R.playing||(T(mn($,e)),R.playing||so())}function so(){($.gen.arp!=="off"?lo():Lt.play(yt($)))&&(xr.seen()||(xr.mark(),eo.hidden=!1))}function lo(){return R.playing||$.gen.arp==="off"?!1:Za.play(ou(fn(),{bpm:Xs(),beatsPerBar:et(),...$.held===null?{chord:Ze}:{}}))}function we(e){T(e),lo()}function cn(){Za.cancel(),Lt.release()}function Sr(e,t){if(e===t)return;const n=i=>i===null?i:i===e?t:e<t&&i>e&&i<=t?i-1:e>t&&i>=t&&i<e?i+1:i;J=n(J);const o=n($.held);$={...$,held:o},T({...P($,{chordPads:Al($.gen.chordPads,e,t)}),held:o})}function ph(e){const t=$.gen,n=window.matchMedia($t).matches,o=t.chordPads.filter(Boolean).length,i=!n||le.allPads||[e.activePad,e.queuedPad,J].some(l=>l!==null&&l>=8),r=[];t.chordPads.slice(0,i?Ke:8).forEach((l,c)=>{const d=l?As(l,t):"",p=!!l&&!t.favoriteChords.includes(l.chord),u=O("",{class:"cal-pad","data-pad-index":String(c),"data-cal-id":`pad-${c}`,"data-filled":l?"":void 0,"aria-label":l?`Pad ${c+1}: ${d}`:`Pad ${c+1}: empty, choose a chord`},()=>{if(Rt){Rt=!1;return}($.latch||!l)&&io(c)});u.append(k("span",{class:"cal-pad-name"},l?d:"+"),k("span",{class:"cal-pad-meta"},l?Ao(l)||" ":"empty"),k("span",{class:"cal-pad-meta"},p?"not ★":" ")),u.addEventListener("pointerdown",g=>{if(g.button!==0)return;const v=g.pointerType!=="mouse";Ve={i:c,id:g.pointerId,x:g.clientX,y:g.clientY,dragging:!1,over:c,timer:null,held:!1,touch:v};const f=Ve;f.timer=window.setTimeout(()=>{f.held=!0,f.timer=null},450),v||u.setPointerCapture?.(g.pointerId),!$.latch&&l&&(T(mn($,c)),R.playing||so())}),u.addEventListener("pointermove",g=>{const v=Ve;if(!v||v.id!==g.pointerId)return;const f=Math.hypot(g.clientX-v.x,g.clientY-v.y)>8;if(!v.dragging){if(!f||!t.chordPads[v.i])return;if(v.touch&&!v.held){v.timer&&clearTimeout(v.timer),Ve=null;return}v.dragging=!0}v.over=dh(g.clientX,g.clientY)??v.over;for(const b of oe.querySelectorAll("[data-drop]"))b.removeAttribute("data-drop");v.over!==v.i&&oe.querySelector(`[data-pad-index="${v.over}"]`)?.setAttribute("data-drop",v.over>v.i?"after":"before")});const h=g=>{const v=Ve;!v||v.id!==g.pointerId||(Ve=null,v.timer&&clearTimeout(v.timer),!$.latch&&l&&$.held===c&&(T(ma($)),cn()),v.dragging?(Rt=!0,Sr(v.i,v.over)):v.held&&v.touch&&(Rt=!0,J=c,V()))};u.addEventListener("pointerup",h),u.addEventListener("pointercancel",h),u.addEventListener("contextmenu",g=>{g.preventDefault(),J=c,V()}),u.addEventListener("keydown",g=>{if(!g.altKey)return;const v={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4}[g.key];if(!v)return;g.preventDefault();const f=Math.max(0,Math.min(Ke-1,c+v));Sr(c,f),oe.querySelector(`[data-pad-index="${f}"]`)?.focus()});const m=O("⋯",{class:"cal-pad-more","aria-label":`Pad ${c+1} menu`,"aria-expanded":String(J===c),"data-cal-id":`pad-menu-${c}`},()=>{J=J===c?null:c,V()});r.push(k("div",{class:"cal-pad-wrap"},u,m))}),Se(oe,...r),_s(e),Rn.hidden=!ce,Rn.textContent=ce?`MIDI keys hold ${Ll(ce,"pad",Ce)}${ce.inversion?` · ${Ao(ce)}`:""}${$.gen.chordProgression!=="off"?" · Progression paused":""}`:"";const s=[Hs.el,k("div",{class:"cal-field"},W("Root","root"),gn("pad-mode","Root",[{value:"pad",label:"Pad root"},{value:"follow",label:"Follow root"}],t.chordPadMode,l=>T(P($,{chordPadMode:l})))),oe,Rn,eo,sh];n&&s.push(O(i?"Fewer pads":`All 16 pads · ${o} filled`,{class:"nc-page-action cal-ghost cal-left","aria-expanded":String(i),"data-cal-id":"all-pads",...ee("all-pads")},()=>{le.allPads=!i,V()})),J!==null&&s.push(uh(J)),s.push(mh(e,n)),s.push(k("div",{class:"cal-grid2"},H("inversion","Inversion","inversion",Array.from({length:Y(t.chord).intervals.length},(l,c)=>({value:String(c),label:Ps(c)})),String(t.inversion),l=>T(P($,{inversion:Number(l)}))),H("voice-leading","Voice leading","voice-leading",[{value:"smooth",label:"Smooth"},{value:"fixed",label:"Fixed"}],t.voiceLeading,l=>T(P($,{voiceLeading:l}))))),Se(bn.mount,...s)}function uh(e){const t=$.gen,n=t.chordPads[e]??null,o=r=>{const s=Ml(t.chordPads,e,r);T({...P($,{chordPads:s}),held:r||$.held!==e?$.held:null})},i=[{value:"",label:"Empty"},...n&&!t.favoriteChords.includes(n.chord)?[{value:n.chord,label:`${Y(n.chord).name} (not starred)`}]:[],...t.favoriteChords.map(r=>({value:r,label:Y(r).name})),...!n||t.favoriteChords.includes(t.chord)||n.chord===t.chord?[]:[{value:t.chord,label:`${Y(t.chord).name} (the Chord)`}]];return k("div",{class:"cal-browser cal-pad-panel",role:"group","aria-label":`Pad ${e+1}`},k("div",{class:"cal-row-between"},W(`Pad ${e+1}${n?` · ${As(n,t)}`:""}`),O("Done",{class:"nc-page-action cal-ghost","data-cal-id":"pad-done"},()=>{J=null,V()})),k("div",{class:"cal-grid2"},H("pad-chord","Chord","pads",n?i:[{value:"",label:"Empty"},{value:`cur:${t.chord}`,label:`${xt(t.note,t.chord)} (the Chord)`},...t.favoriteChords.map(r=>({value:r,label:Y(r).name}))],n?.chord??"",r=>{if(!r)return o(null);if(r.startsWith("cur:"))return o({chord:t.chord,root:t.note,inversion:t.inversion});o({chord:r,root:n?.root??t.note,inversion:r===n?.chord?n.inversion:0})}),t.chordPadMode==="pad"?H("pad-root","Root","root",Ce.map((r,s)=>({value:String(s),label:r})),String(n?.root??t.note),r=>n&&o({...n,root:Number(r)}),!n):null,H("pad-inversion","Inversion","inversion",Array.from({length:n?Y(n.chord).intervals.length:1},(r,s)=>({value:String(s),label:Ps(s)})),String(n?.inversion??0),r=>n&&o({...n,inversion:Number(r)}),!n)),O("Clear pad",{class:"nc-page-action cal-ghost cal-left","data-cal-id":"pad-clear"},()=>{o(null),J=null,V()}))}const Bt=Br.flatMap(e=>dn.filter(t=>t.group===e).map(t=>t.id));function hh(e,t){const n=Bt.length,o=Bt.indexOf(e);return o<0?Bt[t>0?0:n-1]:Bt[((o+t)%n+n)%n]}function mh(e,t){const n=$.gen,o=Or(n.chordProgression),i=ue(n.chordProgression,n.note,n.octave,n.progressionBars),r=bs($),s=k("div",{class:"cal-prog","data-paused":r?"":void 0}),l=t&&!le.progression,c=k("div",{class:"cal-row-between"},t?O("",{class:"cal-fold","aria-expanded":String(!l),"data-cal-id":"prog-fold",...ee("progression")},()=>{le.progression=!le.progression,V()}):W("Progression","progression","cal-progression"),t&&l?k("span",{class:"cal-mono cal-sub cal-small"},o?`${o.short}${r?" · paused":""}`:"off"):O("Off",{class:"nc-page-action cal-ghost","data-cal-id":"prog-off",...ee("progression-off")},()=>T(qn($,"off"))));if(t&&c.firstChild.append(W("Progression")),t||(c.lastChild.disabled=!o),s.append(c),l)return s;const d=k("select",{class:"nc-select cal-prog-select",id:"cal-progression","data-cal-id":"progression","aria-label":"Progression"});d.append(k("option",{value:"off"},"Off · single chord"));for(const h of Br){const m=k("optgroup",{label:h});for(const g of dn.filter(v=>v.group===h))m.append(k("option",{value:g.id},`${g.name}   ${$o(g.level)}`));d.append(m)}d.value=o?o.id:"off",d.addEventListener("change",()=>T(qn($,d.value)));const p=k("div",{class:"cal-prog-pick"},k("div",{class:"nc-select cal-prog-face","data-on":o?"":void 0,"aria-hidden":"true"},k("span",{class:"cal-ellipsis"},o?`${o.short} · ${o.name}`:"Off · single chord"),o?k("span",{class:"cal-mono cal-sub cal-small"},$o(o.level)):null),d),u=[-1,1].map(h=>O(h<0?"◀":"▶",{class:"cal-step-btn","aria-label":h<0?"Previous progression":"Next progression","data-cal-id":`prog-${h}`},()=>T(qn($,hh(n.chordProgression,h)))));if(s.append(k("div",{class:"cal-row"},p,...u)),i&&o){const h=k("div",{class:"cal-strip","aria-label":"Progression chords","data-cal":"strip"});for(const f of i){const b=O("",{class:"cal-step","data-step":String(f.index),"data-cal-id":`step-${f.index}`,"aria-label":`Play from ${f.name}, ${f.numeral}`,...ee("progression-step")},()=>T(Wa($),{jump:f.index}));b.append(k("span",{class:"cal-pad-name"},f.name),k("span",{class:"cal-pad-meta"},f.numeral),k("span",{class:"cal-pad-meta"},ko(f.bars))),h.append(b)}const m=pn(i),g=e.step??Math.min(Ze,i.length-1),v=e.playing&&!r&&e.step!==null?Math.floor((e.beat-R.startBeat)/et()%m)+1:Math.floor(Sa(i,g))+1;s.append(h,k("div",{class:"cal-row-between cal-mono cal-small"},k("span",{class:"cal-sub"},`in ${Ce[n.note]} · ${n.progressionBars>0?`${ko(n.progressionBars)} per chord`:"as written"} · loops`),k("span",{"data-cal":"bar"},`bar ${v} of ${m}`)),k("div",{class:"cal-field"},W("Bars per chord","bars"),gn("bars","Bars per chord",Hr.map(f=>({value:String(f),label:f===0?"as written":Vr(f)})),String(n.progressionBars),f=>T(P($,{progressionBars:Number(f)}))))),r&&s.append(k("p",{class:"cal-mono cal-sub cal-small","data-cal":"paused"},`paused while Pad ${($.held??0)+1} holds · click a step to go back`))}return s}function _s(e){for(const n of oe.querySelectorAll("[data-pad-index]")){const o=Number(n.dataset.padIndex),i=e.activePad===o,r=e.queuedPad===o&&!i;n.hasAttribute("data-active")!==i&&n.toggleAttribute("data-active",i),n.hasAttribute("data-queued")!==r&&n.toggleAttribute("data-queued",r),n.setAttribute("aria-current",String(i))}const t=bs($)&&e.activePad!==null;for(const n of bn.mount.querySelectorAll("[data-step]")){const o=!t&&e.step===Number(n.dataset.step);n.setAttribute("aria-current",String(o))}}const Gs=Tt("rhythm","Rhythm",()=>{const e=$.gen,t=Ne.find(o=>o.id===e.chordStyle)?.label??e.chordStyle,n=e.arp==="off"?"arp off":`arp ${Re.find(o=>o.id===e.arp)?.name??e.arp}${e.arp==="euclidean"?` ${e.arpHits}/${e.arpSteps}`:""}`;return`${t} · ${n} · grid ${_r(e.interval)} · gate ${Math.round(e.gate)}%`}),co=_a({id:"strum",label:"Strum",min:0,max:Dr,step:1,value:$.gen.strum,taper:"time",format:e=>e>0?`${Math.round(e)} ms ↓↑`:"off",onInput:e=>T(P($,{strum:e}))}),po=_a({id:"tension",label:"Tension",min:0,max:100,step:1,value:$.gen.tension,format:e=>`${Math.round(e)}%`,onInput:e=>T(P($,{tension:e}))}),uo=_a({id:"gate",label:"Gate",min:10,max:100,step:1,value:$.gen.gate,format:e=>`${Math.round(e)}%`,onInput:e=>T(P($,{gate:e}))});for(const[e,t,n]of[[co,"strum",0],[po,"tension",0],[uo,"gate",75]])e.el.setAttribute(vt,St(t)),e.el.addEventListener("dblclick",()=>{e.set(n),T(P($,{[t]:n}))});const Us=k("div",{class:"cal-col"}),Ys=k("div",{class:"cal-col"}),Ws=k("div",{class:"cal-col"});Gs.mount.append(Us,Ws,k("hr",{class:"cal-rule"}),Ys,k("hr",{class:"cal-rule"}),k("div",{class:"cal-grid2"},co.el,po.el),uo.el);const fh=()=>{let e=7;return()=>(e=e*48271%2147483647,e/2147483647)};function gh(){const e=yt($),n=ue(e.chordProgression,e.note,e.octave,e.progressionBars)?.[0],o=Y(e.chord),i=n?Kt(n.root,n.intervals,n.inversion??Math.min(e.inversion,n.intervals.length-1),e.arpSpread):Xe((e.octave+1)*12+e.note,o.id,e.inversion,e.arpSpread),r=rs(e,{beatsPerBar:4,bars:1}).map(({beat:A,events:E})=>({step:A*4,len:Math.max(...E.map(M=>M.lengthBeats))*4,notes:E.map(M=>M.note),velocity:Math.max(...E.map(M=>M.velocity))})),s=e.arp!=="off"?r:fl(e.chordStyle,i,n?.rootPc??e.note,n?.intervals??o.intervals,e.interval,e.gate,fh()),l="http://www.w3.org/2000/svg",c=470,d=30,p=14,u=128,h=4,m=document.createElementNS(l,"svg");m.setAttribute("class","cal-roll"),m.setAttribute("viewBox",`0 0 ${c} ${u}`),m.setAttribute("role","img"),m.setAttribute("aria-label",`One bar: ${s.length} hit${s.length===1?"":"s"}`);const g=(A,E,M)=>{const F=document.createElementNS(l,A);for(const[ne,Q]of Object.entries(E))F.setAttribute(ne,String(Q));M&&(F.textContent=M),m.append(F)},v=[...new Set(s.flatMap(A=>A.notes))].sort((A,E)=>A-E),f=Math.max(v.length,8),b=(u-p)/f,x=h*4,y=(c-d)/x,S=A=>u-p-(v.indexOf(A)+1)*b;for(const A of v)A%12===0&&g("rect",{class:"cal-roll-c",x:d,y:S(A),width:c-d,height:b});for(let A=0;A<=x;A++)g("line",{class:A%4===0?"cal-roll-beat":"cal-roll-line",x1:d+A*y,x2:d+A*y,y1:0,y2:u-p});const C=v.filter(A=>A%12===0);!C.length&&v.length&&C.push(v[0]);for(const A of C)g("text",{class:"cal-roll-label",x:0,y:S(A)+b*.8},ut(A));for(let A=0;A<h;A++)g("text",{class:"cal-roll-label",x:d+A*4*y+2,y:u-2},String(A+1));for(const A of s)for(const E of A.notes)g("rect",{class:"cal-roll-note",x:d+A.step*y+1,y:S(E)+1.5,width:Math.max(3,A.len*y-2),height:Math.max(1,b-3),rx:1.5,"fill-opacity":.25+.75*A.velocity});return m}function bh(e,t){const n=Ne.findIndex(i=>i.id===e),o=Ne.length;return Ne[((n<0?0:n+t)%o+o)%o].id}function vh(){const e=$.gen;Se(Us,k("div",{class:"cal-row cal-end"},k("div",{class:"cal-grow"},H("style","Style","style",Ne.map(r=>({value:r.id,label:r.label})),e.chordStyle,r=>T(P($,{chordStyle:r})))),...[-1,1].map(r=>O(r<0?"◀":"▶",{class:"cal-step-btn","aria-label":r<0?"Previous style":"Next style","data-cal-id":`style-${r}`},()=>T(P($,{chordStyle:bh(e.chordStyle,r)}))))),k("div",{class:"cal-roll-box","data-arp":e.arp!=="off"?"":void 0},gh())),co.set(e.strum),po.set(e.tension),uo.set(e.gate);const t=e.arp!=="off",n=Ea(e),o=t?new Set(Xe((e.octave+1)*12+e.note,e.chord,e.inversion,e.arpSpread).flatMap(r=>Array.from({length:e.arpOctaves},(s,l)=>r+12*l)).filter(r=>r<=127)).size:0,i=(r,s=1)=>Array.from({length:r},(l,c)=>({value:String(c+s),label:String(c+s)}));Se(Ys,k("div",{class:"cal-row-between"},W("Arp","arp"),k("span",{class:"cal-row"},O("arp",{class:"cal-toggle","aria-pressed":String(t),"data-cal-id":"arp",...ee("arp")},()=>we(Du($))),O("latch",{class:"cal-toggle","aria-pressed":String($.latch),"data-cal-id":"latch",...ee("latch")},()=>T({...$,latch:!$.latch,held:($.latch,$.held)})))),k("div",{class:"cal-grid2"},H("note-order","Note order","note-order",Re.filter(r=>r.id!=="off"&&!r.legacy).map(r=>({value:r.id,label:r.name})),t?e.arp:$.lastArp,r=>we({...P($,{arp:r}),lastArp:r}),!t),H("octaves","Octaves","octaves",[1,2,3,4].map(r=>({value:String(r),label:`${r} oct`})),String(e.arpOctaves),r=>we(P($,{arpOctaves:Number(r)})),!t),H("spread","Spread","spread",["compact","wide","wider","maximum"].map(r=>({value:r,label:r[0].toUpperCase()+r.slice(1)})),e.arpSpread,r=>we(P($,{arpSpread:r}))),k("div",{class:"cal-field",...ee("rate")},W("Rate","rate"),k("span",{class:"cal-mono cal-readout","data-cal":"rate"},`${_r(e.interval)} · ${Math.round(Xs())}`))),e.arp==="euclidean"?k("div",{class:"cal-grid2"},H("hits","Hits","hits",i(n.steps),String(n.hits),r=>we(P($,{arpHits:Number(r)}))),H("steps","Steps","steps",i(16),String(n.steps),r=>we(P($,{arpSteps:Number(r)}))),H("rotate","Rotate","rotate",i(n.steps,0),String(n.rotate),r=>we(P($,{arpRotate:Number(r)}))),k("div",{class:"cal-field",...ee("pattern")},W("Pattern","pattern"),k("span",{class:"cal-mono cal-readout"},n.steps<=8?fo(n).split("").join(" "):fo(n)))):null,t?k("p",{class:"cal-mono cal-sub cal-small"},`${o} notes in arpeggio`):null,yh(t)),Se(Ws,H("grid","Grid","grid",ft.map(r=>({value:String(r.value),label:r.short})),String(ft.find(r=>Math.abs(r.value-e.interval)<1e-6)?.value??e.interval),r=>we(P($,{interval:Number(r)}))))}function yh(e){if(!q||!te)return null;const t=Vu(be,$.targets,q.instance??"");return t==="add-synth"?k("div",{class:"cal-add","data-cal":"arp-hint"},k("p",{class:"cal-small",role:"status"},"Add a Synth to hear the arp."),zs("arp")):t==="turn-on"&&e?k("p",{class:"cal-small","data-cal":"arp-hint",role:"status"},"Turn on a Synth in Targets to hear the arp."):null}function Xs(){const e=Ct();return typeof e.bpm=="number"?e.bpm:120}const ho=Tt("targets","Targets",()=>{const e=Object.values($.targets).filter(t=>t.on).length;return e?`${e} on`:"none on"}),Mr=[{value:"chord",label:"Chord"},{value:"root",label:"Root"},{value:"top",label:"Top"}];function wh(){const e=Mt(be,$.targets,q?.instance??""),t=[Os.el];q?te||t.push(k("p",{class:"cal-sub"},"This Studio has no notes bus yet: update it to play instruments from CALLIOPE.")):t.push(k("p",{class:"cal-sub"},"CALLIOPE plays instruments in TRIKI Studio. Open it there: ",k("a",{href:"/studio/"},"Studio"),"."));for(const n of e.playable)t.push(Lr(n));for(const n of e.coming)t.push(Lr(n));q&&!e.playable.length&&!e.coming.length&&t.push(k("div",{class:"cal-add","data-cal":"targets-empty"},k("p",{class:"cal-sub cal-small"},"Add a Synth, Bass or Sampler to play it from CALLIOPE."),Es(be,q.instance??"")?null:zs("targets"))),e.none.length&&t.push(k("p",{class:"cal-small","data-cal":"no-notes"},`${Eh(e.none)} take${e.none.length===1?"s":""} no notes.`)),t.push($h),mo(),Se(ho.mount,...t)}const Cr={energy:ot.find(e=>e.key==="energy")?.label??"Ground Energy",tiltX:ot.find(e=>e.key==="tiltX")?.label??"Phone Tilt X",tiltY:ot.find(e=>e.key==="tiltY")?.label??"Phone Tilt Y",shake:ot.find(e=>e.key==="shake")?.label??"Phone Shake",heading:ot.find(e=>e.key==="heading")?.label??"Phone Heading"},Ks=k("span",{class:"cal-mono cal-small","data-cal":"inputs-from"});function xh(e){const t=`cal-in-${e}`,n=k("select",{class:"nc-select",id:t,"data-cal-input":e,"aria-label":`${Cr[e]} sets`},...(e==="shake"?ss:is).map(l=>k("option",{value:l.value},l.label)));n.addEventListener("change",()=>{const l=n.value;T({...$,inputs:e==="shake"?{...$.inputs,shake:l}:{...$.inputs,[e]:l}})});const o=k("i",{}),i=k("span",{}),r=k("span",{class:"cal-in-note","data-cal":`input-note-${e}`},k("span",{class:"cal-in-meter","aria-hidden":"true"},o),i);return{row:k("div",{class:"cal-in-row","data-cal":`input-${e}`},k("label",{class:"cal-in-name",for:t},Cr[e]),n,r),select:n,note:r,fill:o,text:i}}const Js=new Map(["energy","tiltX","tiltY","shake","heading"].map(e=>[e,xh(e)])),$h=k("div",{class:"cal-inputs","data-cal":"inputs"},k("div",{class:"cal-row-between"},W("Inputs","inputs"),Ks),...[...Js.values()].map(e=>e.row));function mo(){const e=Ju();Ks.textContent=e?`from ${e}`:q?"add Situation to use them":"in the Studio";for(const[t,n]of Js){const o=t==="shake"?$.inputs.shake:$.inputs[t];n.select.value!==o&&document.activeElement!==n.select&&(n.select.value=o);const i=o==="ignore";if(n.row.classList.toggle("cal-in-off",i),n.row.querySelector(".cal-in-name")?.setAttribute(vt,St(t==="shake"?`input:shake:${o}`:`input:${t}`)),n.note.hidden=i,!i)if(t==="shake")n.fill.style.width=`${Math.round(ba*100)}%`,n.text.textContent=$u(o,va===null?null:(performance.now()-va)/1e3);else{const r=$e[t];n.fill.style.width=r===null?"0%":`${Math.round(cs(t,r)*100)}%`,n.text.textContent=xu(t,o,r)}}}let Bn=0;function kh(){Bn||(Bn=window.setTimeout(()=>{Bn=0,mo()},100))}q?.onSituationSources?.(()=>mo());Ls();function Eh(e){return e.length<2?e[0]??"":`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`}function Lr(e){const t=$.targets[e.instance]??{on:!1,role:"chord",octave:0},n=e.pitch?{...t,role:"root"}:t,o=!e.playable,i=n.on&&!o,r=e.instance.replace(/[^a-z0-9]/gi,"-"),s=k("div",{class:"cal-row-between"},k("span",{class:"cal-row cal-target-name"},k("i",{class:"cal-dot","data-cal-dot":e.instance,"aria-hidden":"true"}),k("span",{},e.label),k("span",{class:"cal-mono cal-sub cal-small"},String(e.n).padStart(2,"0"))),O(i?"On":"Off",{class:"cal-onoff",role:"switch","aria-checked":String(i),"aria-label":`Play ${e.name} from CALLIOPE`,"data-cal-id":`on-${r}`,...ee("target-on")},()=>{T(Xa($,e.instance,{on:!n.on,...e.pitch?{role:"root"}:{}}))}));s.lastChild.disabled=o;const l=k("div",{class:"cal-target-body"},k("div",{class:"cal-field cal-grow"},W("Role","role"),gn(`role-${r}`,`${e.name} role`,e.pitch?Mr.map(c=>({...c,disabled:c.value!=="root"})):Mr,n.role,c=>T(wt($,e.instance,{role:c})),o)),k("div",{class:"cal-oct"},H(`oct-${r}`,"Octave","target-octave",Array.from({length:ms-Yt+1},(c,d)=>({value:String(d+Yt),label:nh(d+Yt)})),String(n.octave),c=>T(wt($,e.instance,{octave:Number(c)})),o)));return k("div",{class:"cal-target","data-target":e.instance,"data-on":i?"":void 0,"data-disabled":o?"":void 0},s,l,e.note?k("p",{class:"cal-mono cal-sub cal-small"},e.note):null)}const Qs=[Vs,bn,Gs,ho];tu(js,Qs.map(e=>e.handle),"adjacent");const Tr=tt.handle.el.querySelector("[data-nc-index]");Tr&&(Tr.textContent="01a");function V(){const e=oo();ro(),ih(),ph(e),vh(),wh();for(const n of[...Qs,tt])n.update();const t=k("p",{class:"cal-mono cal-sub cal-small",role:"status"},ln);ln&&Rs.firstChild?.replaceWith(t),xa="",Zs()}let xa="",Ir="";function Zs(){const e=oo();Os.tick(e),Hs.tick(e);const t=JSON.stringify([e.activePad,e.queuedPad,e.step,e.playing&&Math.floor(e.beat)]);if(t!==xa){xa=t,_s(e);const r=bn.mount.querySelector('[data-cal="bar"]'),s=$.gen,l=ue(s.chordProgression,s.note,s.octave,s.progressionBars);if(r&&l&&e.playing){const c=pn(l);r.textContent=`bar ${Math.floor(Math.max(0,e.beat-R.startBeat)/et()%c+1e-9)+1} of ${c}`}}const n=e.playing?e.beat:null;n!==null&&ke.length>256&&(ke=ke.filter(r=>r.end>n-1));const o=n!==null&&ke.some(r=>r.start<=n&&r.end>n);for(const r of ho.mount.querySelectorAll("[data-cal-dot]")){const s=o&&!!$.targets[r.dataset.calDot??""]?.on;r.hasAttribute("data-on")!==s&&r.toggleAttribute("data-on",s)}const i=e.playing?JSON.stringify({now:e.now.name,next:e.next?.name??""}):"";if(i!==Ir){Ir=i;try{te?.status?.(i?JSON.parse(i):null)}catch{}}e.playing&&re.prune(e.beat-1)}Ts();q?.onNotesTargets?.(()=>{Ts(),ya.clear(),no();const e=th();Is(),V(),e&&lo()});te?.onTakeBack?.(e=>{const t=JSON.parse(JSON.stringify(ju($)));return queueMicrotask(()=>T(Xa($,e,{on:!1}))),t});function Ah(){try{const e=window.frameElement;return!e||e.classList.contains("shown")}catch{return!0}}let $a=!1;function ka(){if(Zs(),!R.playing){$a=!1;return}Ah()?requestAnimationFrame(ka):window.setTimeout(ka,200)}function Sh(){$a||($a=!0,requestAnimationFrame(ka))}ga&&iu(ga,R,mt,{started:()=>{re.reset(ge,$.held),Sh()},stopped:()=>{re.reset(ge,$.held),V()}});no();q?.providePreset?.({format:"netcomposer.calliope",version:1,get:()=>ws($),set:e=>{const t=xs(e);t&&T(t)}});Is();window.setInterval(()=>R.pump(),lu);V();ch();window.matchMedia($t).addEventListener("change",()=>V());window.__calliope={get state(){return $},get keysChord(){return ce},driver:R,timeline:re,live:oo,apply:T,holdPad:e=>T(mn($,e)),resume:e=>T(Wa($),{jump:e}),setTarget:(e,t)=>T("on"in t?Xa($,e,t):wt($,e,t)),addSynth:Ns,patch:e=>T(P($,e)),get targets(){return be},get hosted(){return!!q},get source(){return te?.id??null}};
