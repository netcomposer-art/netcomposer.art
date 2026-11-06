(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Qe(){return(performance.timeOrigin+performance.now())/1e3}const Se=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],Co=["Essential","Seventh","Extended","Altered","Experimental"],He=(e,t)=>t.map(([n,o,r,i])=>({id:n,name:o,intervals:r,category:e,symbol:i})),Ne=[...He("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...He("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...He("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...He("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...He("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],Lo=new Map(Ne.map(e=>[e.id,e])),Wt={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function Ae(e){if(typeof e!="string")return"major";if(Lo.has(e))return e;if(Wt[e])return Wt[e];const t=o=>o.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(Wt).find(([o])=>t(o)===n)?.[1]??Ne.find(o=>t(o.name)===n||t(o.id)===n)?.id??"major"}function G(e){return Lo.get(Ae(e))}const sn=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function To(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),o=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(o>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(o,Math.min(r,0))*12;return e.map(s=>s+i)}function je(e,t,n=0,o="compact"){const i=G(t).intervals.map(l=>sn(e,0,127)+l);for(let l=0;l<sn(n,0,i.length-1);l++){const c=i.shift(),d=i[i.length-1];i.push(c+Math.ceil((d-c+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[o]??0;return To(i.map((l,c)=>l+12*Math.floor(c*s/Math.max(1,i.length-1))))}function Dr(e,t=1){return[...new Set(Array.from({length:sn(t,1,4)},(n,o)=>e.map(r=>r+o*12)).flat().filter(n=>n>=0&&n<=127))]}function qr(e,t){const n=[...new Set(e)].sort((i,s)=>i-s),o=n.length;if(o<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[o-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let s=0,l=o-1;s<=l;s++,l--)i.push(n[s]),s!==l&&i.push(n[l]);return i}case"inside-out":return n.map((i,s)=>({note:i,i:s})).sort((i,s)=>Math.abs(i.i-(o-1)/2)-Math.abs(s.i-(o-1)/2)||i.i-s.i).map(i=>i.note);case"pendulum":{const i=Math.floor((o-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((o-1)/2),s=t==="blossom-up"?1:-1,l=[n[i]];for(let c=1;l.length<o;c++)for(const d of[i+s*c,i-s*c])d>=0&&d<o&&l.push(n[d]);return l}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),s=i?n[0]:n[o-1],l=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&l.reverse(),l.flatMap(c=>[s,c])}default:return n}}const jr=16,ln={hits:5,steps:8,rotate:0};function Rn(e){const t=(o,r)=>typeof o=="number"&&Number.isFinite(o)?Math.round(o):r,n=Math.max(1,Math.min(jr,t(e?.arpSteps,ln.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,ln.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function Bn(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}const va=e=>Array.from({length:e.steps},(t,n)=>Bn(e,n)?"x":".").join("");function Rr(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let o=t-t%e.steps;o<t;o++)Bn(e,o)&&n++;return n}const Br=1592598566;function Or(e){let t=(Math.imul(e^Br,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const xa=new Map;function Hr(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let o=xa.get(e);(!o||o.step>n)&&(o={step:0,pos:0});let{step:r,pos:i}=o;for(;r<n;r++){const s=Or(r+1);i=(i+(s<.5?1:s<.75?0:e-1))%e}return xa.set(e,{step:r,pos:i}),i}function Vr(e,t,n,o=ln,r=Math.random){if(t<1)return null;const i=s=>(Math.floor(s)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Hr(t,n);if(e==="euclidean"){const s=Rn({arpHits:o.hits,arpSteps:o.steps,arpRotate:o.rotate}),l=Math.max(0,Math.floor(n));return Bn(s,l)?i(Rr(s,l)):null}return i(n)}const Ce=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}],ya={none:"off",chord:"off",updown:"up-down","up-and-down":"up-down",downup:"down-up","down-and-up":"down-up","down-up-legacy":"down-up","off-chord":"off",rand:"random",played:"as-played",order:"as-played",converge:"outside-in",diverge:"inside-out","thumb-up":"low-and-up","thumb-down":"low-and-down","pinky-up":"hi-and-up","pinky-down":"hi-and-down","high-and-up":"hi-and-up","high-and-down":"hi-and-down",euclid:"euclidean",drunk:"walk"},$a=new Set(Ce.map(e=>e.id)),ka=new Map(Ce.map(e=>[e.num,e.id]));function Io(e){if(typeof e=="number")return Number.isInteger(e)?ka.get(e)??null:null;if(typeof e!="string")return null;if(/^\s*\d+\s*$/.test(e))return ka.get(Number(e))??null;if($a.has(e))return e;const t=e.trim().toLowerCase().replace(/\(legacy\)/g,"").replace(/&/g,"-and-").replace(/[\s_/]+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"");return $a.has(t)?t:ya[t]?ya[t]:Ce.find(o=>o.name.toLowerCase().replace(/\s*\(legacy\)/,"")===e.trim().toLowerCase())?.id??null}Ce.map(e=>({value:e.id,label:e.name}));const $e=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}],_r=$e.map(e=>e.id),cn=e=>$e.find(t=>t.id===e)?.kind??"repeat",Gr=15,zo=40,J=e=>[...e].sort((t,n)=>t-n);function Fo(e,t){const n=J(e);for(let o=0;o<t;o++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const dt=e=>Fo(e,1);function Ur(e,t){const n=e[0];return n-((n-t)%12+12)%12}function Wr(e,t){const n=J(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return J([n[0],...n.slice(2),n[1]+12]);case 2:return J([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return J([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function Yr(e,t,n,o=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const s=2*r-2,l=i%s;return l<r?l:s-l}case"walk-random":return Math.min(r-1,Math.floor(o()*r));default:return i%r}}function No(e,t,n,o,r=Math.random){const i=J(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Fo(i,Yr(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const s=Math.abs(o/2-Math.round(o/2))<1e-6;return{notes:i,velocity:s?1:.45}}case"drift":return{notes:Wr(i,n),velocity:.9};default:return null}}function Po(e,t,n,o,r=t){const i=J(t);if(!i.length)return[];const s=(c,d,p,u)=>c.map(m=>({step:m,len:d,notes:p,velocity:u})),l=Ur(i,n);switch(e){case"oom-pah":return[...s([0],3,[l-12],1),...s([4],2,dt(i),.75),...s([8],3,[l-12],1),...s([12],2,dt(i),.75)];case"charleston":return s([0,6],2,i,.9);case"skank":return s([4,12],1,dt(i),.9);case"house":return s([2,6,10,14],1,dt(i),.9);case"montuno":{const c=l+(o[1]??4),d=l+(o[2]??7),p=o[3]!==void 0&&o[3]<12?l+o[3]:l+12,u=[l,l+12],m=[c,d];return[[0,u],[3,m],[5,u],[6,m],[8,[d,p]],[10,u],[13,m],[14,[d,l+12]]].map(([g,f])=>({step:g,len:1,notes:J(f),velocity:.85}))}case"push":return[...s([0],6,i,.9),...s([6],2,i,.9),{step:14,len:2,notes:J(r),velocity:.9,next:!0}];case"strum":{const c=[...i,i[0]+12];return[{step:0,len:3.5,notes:c,velocity:.95,strum:"down"},{step:8,len:3.5,notes:c,velocity:.75,strum:"up"}]}default:return[]}}function Kr(e,t,n,o,r,i,s=()=>0){const l=Math.max(.1,Math.min(1,i/100));if(cn(e)==="bar")return Po(e,t,n,o).map(p=>({...p,len:p.len*l}));const c=16/r,d=[];for(let p=0;p*c<16-1e-9;p++){const u=No(e,t,p,p*c/4,s);u&&u.notes.length&&d.push({step:p*c,len:c*l,notes:u.notes,velocity:u.velocity})}return d}function Jr(e,t,n){const o=n==="down"?J(e):J(e).reverse(),r=Math.max(0,Math.min(zo,t))/1e3;return o.map((i,s)=>({midi:i,offset:s*r}))}const Ea=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function Xr(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let o;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?o=[14]:r&&n(6)?o=[17]:n(4)&&n(8)&&!n(7)?o=[14]:n(4)&&n(10)?o=[14,21]:n(4)?o=[14,18,21]:n(3)?o=[14,17]:n(5)||n(2)?o=[14,21]:o=[14],o.filter(i=>!n(i%12))}function Qr(e,t,n,o=Math.random){const r=Xr(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(o()*r.length))])%12,s=Math.max(...e),l=s+1+((i-(s+1))%12+12)%12;return l<=127?l:null}function Mt(e,t,n=0,o="compact"){const r=t.map(l=>Math.max(0,Math.min(127,Math.round(e)))+l),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let l=0;l<i;l++){const c=r.shift(),d=r[r.length-1];r.push(c+Math.ceil((d-c+1)/12)*12)}const s={compact:0,wide:1,wider:2,maximum:4}[o]??0;return To(r.map((l,c)=>l+12*Math.floor(c*s/Math.max(1,r.length-1))))}function Zr(e,t){const n=J(e),o=J(t);if(n.length===o.length)return n.reduce((i,s,l)=>i+Math.abs(s-o[l]),0);const r=(i,s)=>Math.min(...s.map(l=>Math.abs(l-i)));return n.reduce((i,s)=>i+r(s,o),0)+o.reduce((i,s)=>i+r(s,n),0)}function es(e,t,n,o,r,i="compact",s){const l=Mt(t,n,s??r,i);if(!e||!e.length)return l;let c=l,d=1/0,p=1/0;const u=s!==void 0?[s]:n.map((m,g)=>g);for(const m of u)for(const g of[-24,-12,0,12]){const f=Mt(t,n,m,i).map(b=>b+g);if(f[0]<o-7||f[0]>o+12||f[0]<0||f[f.length-1]>127)continue;const w=Zr(f,e),h=Math.abs(f.reduce((b,y)=>b+y,0)/f.length-e.reduce((b,y)=>b+y,0)/e.length);(w<d-1e-9||Math.abs(w-d)<1e-9&&h<p-1e-9)&&(c=f,d=w,p=h)}return c}const Do=["Pop / Rock","Blues","Jazz","Soul / R&B / Neo-soul","Gospel","EDM / House / Trance","Cinematic / Ambient","Latin / Flamenco","Lo-fi / Chill","Modal"],ts={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},x=(e,t,n,o=1,r={})=>({degree:e,chord:t,numeral:n,bars:o,...r}),C="major",O="minor",T="dominant-7",F="minor-7",_="major-7",Yt="half-diminished-7",Kt="diminished-7",z=(e,t,n,o,r,i)=>({id:e,group:t,name:n,level:o,tonality:r,chords:i,short:ts[t]}),Aa=e=>[x(0,T,"I7"),x(e==="IV7"?5:0,T,e),x(0,T,"I7"),x(0,T,"I7"),x(5,T,"IV7"),x(5,T,"IV7"),x(0,T,"I7"),x(0,T,"I7"),x(7,T,"V7"),x(5,T,"IV7"),x(0,T,"I7"),x(7,T,"V7")],jt=[z("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[x(0,C,"I"),x(7,C,"V"),x(9,O,"vi"),x(5,C,"IV")]),z("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[x(9,O,"vi"),x(5,C,"IV"),x(0,C,"I"),x(7,C,"V")]),z("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[x(0,C,"I"),x(9,O,"vi"),x(5,C,"IV"),x(7,C,"V")]),z("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[x(0,C,"I"),x(10,C,"♭VII"),x(5,C,"IV",2)]),z("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[x(0,C,"I",.5),x(7,C,"V",.5),x(9,O,"vi",.5),x(4,O,"iii",.5),x(5,C,"IV",.5),x(0,C,"I",.5),x(5,C,"IV",.5),x(7,C,"V",.5)]),z("blues-12","Blues","12-bar",1,"blues",Aa("I7")),z("blues-12-quick","Blues","12-bar quick change",2,"blues",Aa("IV7")),z("blues-minor","Blues","Minor blues",2,"minor",[x(0,F,"i7"),x(0,F,"i7"),x(0,F,"i7"),x(0,F,"i7"),x(5,F,"iv7"),x(5,F,"iv7"),x(0,F,"i7"),x(0,F,"i7"),x(8,T,"♭VI7"),x(7,T,"V7"),x(0,F,"i7"),x(7,T,"V7")]),z("blues-jazz","Blues","Jazz blues",3,"blues",[x(0,T,"I7"),x(5,T,"IV7"),x(0,T,"I7"),x(7,F,"v7",.5),x(0,T,"I7",.5),x(5,T,"IV7"),x(6,Kt,"♯iv°7"),x(0,T,"I7"),x(9,T,"VI7"),x(2,F,"ii7"),x(7,T,"V7"),x(0,T,"I7",.5),x(9,T,"VI7",.5),x(2,F,"ii7",.5),x(7,T,"V7",.5)]),z("jazz-2-5-1","Jazz","ii–V–I",1,"major",[x(2,F,"ii7"),x(7,T,"V7"),x(0,_,"Imaj7",2)]),z("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[x(2,Yt,"iiø7"),x(7,"7b9","V7♭9"),x(0,"minor-6","i6",2)]),z("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[x(0,_,"Imaj7",.5),x(9,F,"vi7",.5),x(2,F,"ii7",.5),x(7,T,"V7",.5)]),z("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[x(4,F,"iii7",.5),x(9,T,"VI7",.5),x(2,F,"ii7",.5),x(7,T,"V7",.5)]),z("jazz-autumn","Jazz","Autumn cycle",3,"minor",[x(5,F,"iv7"),x(10,T,"♭VII7"),x(3,_,"♭IIImaj7"),x(8,_,"♭VImaj7"),x(2,Yt,"iiø7"),x(7,"7b9","V7♭9"),x(0,F,"i7",2)]),z("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[x(0,_,"Imaj7",.5),x(3,T,"♭III7",.5),x(8,_,"♭VImaj7",.5),x(11,T,"VII7",.5),x(4,_,"IIImaj7"),x(10,F,"♭vii7",.5),x(3,T,"♭III7",.5),x(8,_,"♭VImaj7",.5),x(11,T,"VII7",.5),x(4,_,"IIImaj7",.5),x(7,T,"V7",.5),x(0,_,"Imaj7"),x(6,F,"♯iv7",.5),x(11,T,"VII7",.5)]),z("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[x(0,F,"i7"),x(5,T,"IV7")]),z("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[x(5,_,"IVmaj7"),x(4,F,"iii7"),x(2,F,"ii7"),x(0,_,"Imaj7")]),z("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[x(5,_,"IVmaj7"),x(4,T,"III7"),x(9,F,"vi7"),x(7,F,"v7",.5),x(0,T,"I7",.5)]),z("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[x(2,"minor-9","ii9"),x(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),x(0,"major-9","Imaj9",2)]),z("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[x(0,C,"I"),x(5,C,"IV",.5),x(6,Kt,"♯iv°7",.5)]),z("gospel-7-3-6","Gospel","7–3–6",3,"major",[x(11,Yt,"viiø7"),x(4,T,"III7"),x(9,F,"vi7",2)]),z("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[x(0,C,"I",.5),x(0,T,"I7",.5),x(5,C,"IV",.5),x(6,Kt,"♯iv°7",.5),x(0,C,"I/V",2,{inversion:2})]),z("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[x(0,O,"i"),x(8,C,"VI"),x(3,C,"III"),x(10,C,"VII")]),z("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[x(0,O,"i"),x(10,C,"VII"),x(8,C,"VI"),x(10,C,"VII")]),z("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[x(0,F,"i7"),x(5,F,"iv7")]),z("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[x(0,O,"i"),x(8,C,"VI"),x(10,C,"VII"),x(7,O,"v")]),z("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[x(5,O,"iv"),x(0,O,"i")]),z("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[x(0,C,"I"),x(8,C,"♭VI"),x(10,C,"♭VII"),x(0,C,"I")]),z("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[x(0,C,"I"),x(4,C,"III")]),z("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[x(0,C,"I"),x(2,C,"II")]),z("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[x(0,O,"i"),x(10,C,"♭VII"),x(8,C,"♭VI"),x(7,C,"V")]),z("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[x(0,O,"i"),x(5,O,"iv"),x(7,T,"V7",2)]),z("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[x(0,_,"Imaj7",2),x(2,T,"II7",2),x(2,F,"ii7"),x(7,T,"V7")]),z("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[x(2,"minor-9","ii9"),x(7,"dominant-9","V9"),x(0,"major-9","Imaj9"),x(9,"minor-9","vi9")]),z("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[x(5,_,"IVmaj7"),x(4,F,"iii7"),x(9,F,"vi7",2)]),z("modal-dorian","Modal","Dorian i–IV",1,"dorian",[x(0,O,"i"),x(5,C,"IV")]),z("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[x(0,C,"I"),x(10,C,"♭VII")]),z("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[x(0,O,"i"),x(1,C,"♭II")])],ns=jt.map(e=>e.id),qo=e=>jt.find(t=>t.id===e)??null,Ma=e=>"●".repeat(e)+"○".repeat(3-e),jo=[.5,1,2,4,0],Ro=e=>e===.5?"½":String(e),Sa=e=>`${Ro(e)} bar${e>1?"s":""}`;function pe(e,t,n,o=0){const r=qo(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((s,l)=>{const c=G(s.chord),d=s.intervals??c.intervals,p=(t+s.degree)%12;return{index:l,root:i+s.degree,rootPc:p,chord:c.id,intervals:d,numeral:s.numeral,name:`${Se[p]}${s.symbol??c.symbol}`,bars:o>0?o:s.bars,...s.inversion!==void 0?{inversion:s.inversion}:{}}})}const Rt=e=>e.reduce((t,n)=>t+n.bars,0),On=(e,t)=>e.slice(0,t).reduce((n,o)=>n+o.bars,0);function Ca(e,t){const n=Rt(e),o=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(o<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:o,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:o,total:n}}const Le=e=>({value:e,label:`1/${e}`,short:`1/${e}`,kind:"straight"}),pt=e=>({value:e*2/3,label:`1/${e} dotted`,short:`1/${e}.`,kind:"dotted"}),Ve=e=>({value:e*3/2,label:`1/${e} triplet`,short:`1/${e}T`,kind:"triplet"}),St=[Le(1),pt(2),Le(2),Ve(2),pt(4),Le(4),Ve(4),pt(8),Le(8),Ve(8),pt(16),Le(16),Ve(16),Le(32),Ve(32)].sort((e,t)=>e.value-t.value);St.filter(e=>e.kind==="straight").map(e=>e.value);function Bo(e){return typeof e!="number"||!Number.isFinite(e)?null:St.find(t=>Math.abs(t.value-e)<1e-6)??null}const as=(e,t=4)=>Bo(e)?.value??t,Oo=e=>Bo(e)?.short??`1/${Math.round(e)}`,Ze=16,Ho=e=>typeof e=="string"&&Ne.some(t=>t.id===Ae(e))&&(Ae(e)!=="major"||e==="major"||e==="Major"),Ct=(e,t)=>typeof e=="number"&&Number.isFinite(e)?(Math.round(e)%12+12)%12:t,Hn=(e,t)=>{const n=G(t).intervals.length-1;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(n,Math.round(e))):0},Vn=()=>Array.from({length:Ze},()=>null);function os(e,t=0){const n=Vn();return Array.isArray(e)&&e.slice(0,Ze).forEach((o,r)=>{if(!o||typeof o!="object")return;const i=o;if(!Ho(i.chord))return;const s=Ae(i.chord);n[r]={chord:s,root:Ct(i.root,Ct(t,0)),inversion:Hn(i.inversion,s)}}),n}function is(e,t,n){const o=e.length;if(t===n||t<0||n<0||t>=o||n>=o)return e;const r=[...e],[i]=r.splice(t,1);return r.splice(n,0,i),r}function rs(e,t,n){if(e.some(i=>i?.chord===t))return e;const o=e.indexOf(null);if(o<0)return e;const r=[...e];return r[o]={chord:t,root:Ct(n,0),inversion:0},r}function ss(e,t,n){if(t<0||t>=e.length)return e;const o=[...e];return o[t]=n&&Ho(n.chord)?{chord:Ae(n.chord),root:Ct(n.root,0),inversion:Hn(n.inversion,n.chord)}:null,o}function ls(e,t,n){return{chord:e.chord,inversion:Hn(e.inversion,e.chord),...t==="pad"?{note:e.root}:{},...n&&n!=="off"?{chordProgression:"off"}:{}}}const cs=["st","nd","rd"],ds=e=>e.inversion>0?`${e.inversion}${cs[e.inversion-1]??"th"} inv`:"",ps=["off","single","chord","random"],Vo=e=>ps.includes(e),us={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:Vn(),chordPadMode:"pad"};function La(e,t,n=Math.random){if(e.mode==="off")return[];const o=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[o];if(e.mode==="random"){const c=Math.min(127,(e.octave+1)*12),d=Math.min(127,c+e.octaveRange*12-1);return[c+Math.floor(n()*(d-c+1))]}const r=je(o,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=Dr(r,e.arpOctaves),s=qr(i,e.arp),l=Vr(e.arp,s.length,t,Rn(e),n);return l===null?[]:[s[l]]}function Ta(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function hs(e,t){return t.direction&&t.strumMs>0&&e.length>1?Jr(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function ms(e,t=0){return hs(e.notes,e).map(({midi:n,offset:o})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:o,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Ia=(e,t,n)=>Math.min(n,Math.max(t,e)),fs=1e-9;function gs(e,t){return t>0?Math.ceil(e/t-fs)*t:e}const za=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class Bt{step=0;grid={origin:0,index:0,interval:16};comp=za(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const o=this.settings.interval,r=4/o,i=n?gs(t,r):t;this.grid={origin:i,index:0,interval:o},this.step=Math.max(0,Math.round(i/r));const s=this.beatsPerBar();return this.comp=za(i,n?0:Math.floor(t/s+1e-9)*s),i}clone(t={}){const n=new Bt(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const o=this.comp;return n.comp={...o,jump:o.jump?{...o.jump}:null,last:o.last?[...o.last]:null,bar:{...o.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&cn(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,o=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const p=this.chordAt(t),u={...n,chord:p.chord,note:p.rootPc,octave:Math.floor(p.root/12)-1,...p.inversion!==void 0?{inversion:p.inversion}:{}},m=La(u,this.step,this.random);return this.step++,m.length?this.hit(t,o,m,1,null,p,!1,"arp"):null}if(cn(n.chordStyle)==="bar")return this.step++,null;const l=this.chordAt(t),c=this.voicingFor(l),d=No(n.chordStyle,c,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!d||!d.notes.length?null:this.hit(t,o,d.notes,d.velocity,Ea(this.beatInBar(t)),l,!0,"chord")}if(!Vo(n.mode))return this.step++,null;const r=La(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",s=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:o,gate:Ia(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:s,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,o,r,i,s,l,c){const d=this.settings,p=[...o];if(l&&d.tension>0&&this.chordRandom()*100<d.tension){const m=Qr(p,s.rootPc,s.intervals,this.chordRandom);m!==null&&p.push(m)}const u=d.chordStyle==="strum"&&i?d.strum>0?d.strum:Gr:d.strum;return{beat:t,spanBeats:n,gate:Ia(d.gate/100,.1,1),velocity:r,notes:p,kind:"comp",direction:i,strumMs:u,chord:s,root:s.root,role:c}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=G(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,o=pe(n.chordProgression,n.note,n.octave,n.progressionBars);return o?.length?Ca(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,o=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${o}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?es(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,o,n.arpSpread,t.inversion):Mt(t.root,t.intervals,o,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,o=this.settings;if(n.bar===t&&n.settings===o)return n.hits;const r=o,i=this.beatsPerBar(),s=r.chordStyle,l=this.chordAt(t*i),c=this.voicingFor(l);let d=c;if(s==="push"){const u=this.chordAt((t+1)*i);if(`${u.root}|${u.intervals.join(",")}`!=`${l.root}|${l.intervals.join(",")}`){const m={last:this.comp.last,key:this.comp.lastKey};d=this.voicingFor(u),this.comp.last=m.last,this.comp.lastKey=m.key}}let p=Po(s,c,l.rootPc,l.intervals,d).filter(u=>u.step/4<i-1e-9);return s==="push"&&this.comp.pushedTo===t&&(p=p.filter(u=>u.step!==0)),this.comp.bar={bar:t,settings:o,hits:p},p}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const o=this.settings,r=this.beatsPerBar(),i=[];for(let s=0;s<128;s++){const l=Math.floor(this.comp.from/r+1e-9),d=this.compBar(l).find(g=>l*r+g.step/4>=this.comp.from-1e-9);if(!d){this.comp.from=(l+1)*r;continue}const p=l*r+d.step/4;if(!t(p))break;if(this.comp.from=p+1e-6,n())continue;const u=d.next&&o.chordStyle==="push"?d.len+6:d.len;d.next&&(this.comp.pushedTo=l+1);const m=this.chordAt(d.next?(l+1)*r:p);i.push(this.hit(p,u/4,d.notes,d.velocity,d.strum??Ea(this.beatInBar(p)),m,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const o=pe(n.chordProgression,n.note,n.octave,n.progressionBars);if(!o?.length)return null;const r=Ca(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const o=this.settings,r=pe(o.chordProgression,o.note,o.octave,o.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),s=Math.max(n,this.nextBeat(),this.comp.from),l=Math.ceil(s/i-1e-9)*i;return this.comp.jump={at:l,origin:l-On(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const o=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const s=this.nextBeat();if(!(s<t))break;if(n())this.advanceStep();else{const l=this.stepHit(s);l&&o.push(l)}this.advance()}this.barStyleActive()?o.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of o)r.push(...ms(i,++this.serial));return r.sort((i,s)=>i.startBeat-s.startBeat)}}const bs=1.5;function ws(e,t=0){const n={...e,mode:"chord",arp:"off",chordStyle:"block",chordProgression:"off",strum:0,tension:0},o=new Bt(n,{random:Ta(1),chordRandom:Ta(2)});o.start(0);const r=o.window(4);if(!r.length)return[];const i=r[0];return r.filter(s=>s.hit===i.hit&&s.startBeat===i.startBeat).map(s=>({...s,startBeat:0,offsetSec:0,hit:t}))}var vs="nc-ui",xs={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},_n={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Lt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ys={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ke={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},$s={light:{color:xs.color,semantic:_n,component:Lt,runtime:ys},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},_e=e=>`--${vs}-${e}`,dn=_n["label-on-fill-dark"],Fa=_n["label-on-fill-light"],ks=ke["label-min-contrast"],Es=/^#[0-9a-f]{6}$/i,As=e=>typeof e=="string"&&Es.test(e),vt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Na(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),r=i=>{let s=(i+e/30)%12;return n-o*Math.max(-1,Math.min(s-3,9-s,1))};return`#${vt(r(0)*255)}${vt(r(8)*255)}${vt(r(4)*255)}`}function _o(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),r=Math.max(t,n,o),i=Math.min(t,n,o),s=(r+i)/2,l=r-i;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((r===t?60*((n-o)/l%6):r===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:s}}function Pa(e){let[t,n,o]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function pn(e,t){let[n,o]=[Pa(e),Pa(t)].sort((r,i)=>i-r);return(n+.05)/(o+.05)}var Tt=e=>pn(e,dn)>=pn(e,Fa)?dn:Fa;function Go(e,t,n,o=ks){let r=Na(e,t,n),i=Tt(r)===dn?1:-1;for(let s=0;s<40&&pn(r,Tt(r))<o;s++)n+=i*.01,r=Na(e,t,n);return r}function Ms(e){let{h:t,s:n}=_o(e),o=Go(t,Math.min(n,ke["surprise-on-max-saturation"]),ke["surprise-on-lightness"]);return{fill:e,ink:Tt(e),on:o,onInk:Tt(o)}}var Ss=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Cs(e,t=Math.random){let[n,o]=ke["surprise-saturation"],[r,i]=ke["surprise-lightness"],s=ke["surprise-min-hue-gap"],l=As(e)?_o(e).h:null,c=t()*360;return l!==null&&Ss(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),Go(c,n+t()*(o-n),r+t()*(i-r))}function Ls(e){if(!e)return null;let t=Ms(e);return{[_e("surprise-fill")]:t.fill,[_e("surprise-ink")]:t.ink,[_e("surprise-on")]:t.on,[_e("surprise-on-ink")]:t.onInk}}var Ts=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Is=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Da(e){let[t,n,o]=[1,3,5].map(l=>Ts(parseInt(e.slice(l,l+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*r+.793617785*i-.0040720468*s,1.9779984951*r-2.428592205*i+.4505937099*s,.0259040371*r+.7827717662*i-.808675766*s]}function zs([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*r+.2309699292*i,-1.2684380046*o+2.6097574011*r-.3413193965*i,-.0041960863*o-.7034186147*r+1.707614701*i].map(s=>vt(Is(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Fs=ke["velocity-range"],Uo={min:Lt.rhythm["velocity-min"],max:Lt.rhythm["velocity-max"]},qa=Object.fromEntries(Object.entries($s).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ns(e,t=Uo){let[n,o]=Fs,r=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,i=(r-n)/(o-n),s=t.ink??Lt.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:s};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:s};let l=Da(t.min),c=Da(t.max);return{velocity:r,t:i,fill:zs(l.map((d,p)=>d+(c[p]-d)*i)),ink:s}}function ja(e,t=Uo){return{[_e("velocity-fill")]:Ns(e,t).fill}}var Wo="data-nc-theme",Ra="nc-ui-theme-change",Ps="(prefers-color-scheme: dark)",Yo=e=>e?.documentElement??null,Ko=e=>e?.defaultView?.matchMedia?.(Ps)??null,Ds=e=>e==="light"||e==="dark"?e:"system";function qs(e=globalThis.document){return Ds(Yo(e)?.getAttribute(Wo))}function un(e=globalThis.document){let t=qs(e);return t!=="system"?t:Ko(e)?.matches?"dark":"light"}function Jo(e,t=globalThis.document){let n=Yo(t);if(!n)return()=>{};let o=un(t),r=()=>{let c=un(t);c!==o&&(o=c,e(c))},i=t.defaultView?.MutationObserver,s=i?new i(r):null;s?.observe(n,{attributes:!0,attributeFilter:[Wo]});let l=Ko(t);return l?.addEventListener?.("change",r),t.addEventListener(Ra,r),()=>{s?.disconnect(),l?.removeEventListener?.("change",r),t.removeEventListener(Ra,r)}}var js={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Rs={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Bs={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Os={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ot={};for(let[e,t]of Object.entries(Rs))Ot[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Os))Ot[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Bs))Ot[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(js.renames.map(e=>[e.old,e.new]));function Xo(e){let t=Ot[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function D(e){return Xo(e).prop}function a(e){return`var(${D(e)})`}function Hs(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(D(t)));return Number.isFinite(n)?n:0}function q(e,t){let n=Xo(t),o=e.ownerDocument??document,r=o.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:o.documentElement).append(r);let s=(o.defaultView??window).getComputedStyle(r),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return r.remove(),l}function Qo(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Vs(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var _s="[data-modulated], [data-modulated] *";function Jt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ba(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Gs(){let e=o=>`
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
${_s} { transition: none; }
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
${Ba("")}
}
@media (max-width: 1023px) {
${Ba("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Jt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Jt("")}
}
@media (max-width: 1023px) {
${Jt("html[data-nc-landscape] ")}
}
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
`}var Xt=null,Us="nc-ui-fallback";function Zo(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Xt&&Xt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Us} {
${Gs()}
}
`,e.head.append(t),Xt=t}var Ws=new URL("/calliope/assets/confirm-BSJWrX8s.css",import.meta.url).href,Ys=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Ws,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Ys(document);function ei(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",o.append(r,i),n.append(o);let s=!1,l=d=>{s=d===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",c),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var ti=new WeakMap,Oa=.25;function Ks(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(o,r);let i=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),p=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},u=h=>{let b=d(h);b!==i&&(i=b,p(),l?.(b))},m=0,g=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let b=n.getBoundingClientRect();h.target!==r&&b.height>0&&u(1-(h.clientY-b.top)/b.height),m=h.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!g)return;let b=n.getBoundingClientRect().height||1,y=(m-h.clientY)/b*(h.shiftKey?Oa:1);m=h.clientY,u(i+y)});let f=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",f),n.addEventListener("pointercancel",f),n.addEventListener("lostpointercapture",f),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let b=h.shiftKey?s*Oa:s,y={ArrowUp:i+b,ArrowRight:i+b,ArrowDown:i-b,ArrowLeft:i-b,PageUp:i+s*10,PageDown:i-s*10,Home:0,End:1};h.key in y&&(h.preventDefault(),u(y[h.key]))});let w={el:n,get value(){return i},get dragging(){return g},set(h){g||(i=d(Number(h)||0),p())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(s=h.step),h.onChange&&(l=h.onChange),h.onReset&&(c=h.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),ti.set(n,w),w}function Js(e){return ti.get(e)}var ni=new WeakMap,Xs=.2,Qs=1.5,Zs=.5;function el(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function Ha(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:el(o.getComputedStyle(e).getPropertyValue(D(t)),n)}function tl(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<n;w++){let h=t.createElement("span");h.className="nc-meter-bar";let b=t.createElement("span");b.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let v=t.createElement("span");v.className="nc-meter-hold",h.append(b,y,v),i.append(h),s.push({peak:b,rms:y,hold:v,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(r,i);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,m=()=>{r.dataset.lit=d?"true":"false",r.setAttribute("aria-pressed",d?"true":"false"),r.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),r.title=d?"Clipped. Click to clear":"Clip light"},g=(w,h,b,y)=>{let v=Math.round(y*1e3)/1e3;b[h]!==v&&(b[h]=v,w.style.transform=h==="hold"?`translateY(${Math.round((1-v)*1e3)/10}%)`:`scaleY(${v})`)};r.addEventListener("click",()=>{f.clear(),c?.()});let f={el:o,get clipped(){return d},update(w,h){p<0&&(p=Ha(o,"motion-meter-fall",Xs)),u<0&&(u=Ha(o,"motion-meter-hold",Qs));let b=Math.max(0,Math.min(.25,Number(h)||0)),y=p>0?Math.exp(-b/p):0;s.forEach((v,E)=>{let A=w[E]??w[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(A.peak)||0)),M=Math.min(S,Math.max(0,Number(A.rms)||0));A.over&&f.clip(),v.level.peak=S>=v.level.peak?S:S+(v.level.peak-S)*y,v.level.rms=M>=v.level.rms?M:M+(v.level.rms-M)*y,v.holdAge+=b,S>=v.holdAt?(v.holdAt=S,v.holdAge=0):v.holdAge>u&&(v.holdAt=Math.max(S,v.holdAt-Zs*b)),g(v.peak,"peak",v.shown,v.level.peak),g(v.rms,"rms",v.shown,v.level.rms),g(v.hold,"hold",v.shown,v.holdAt),v.hold.dataset.off=v.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,m())},clear(){d=!1,m()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,g(w.peak,"peak",w.shown,0),g(w.rms,"rms",w.shown,0),g(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,m()},configure(w){w.onClear&&(c=w.onClear)}};return m(),f.reset(),ni.set(o,f),f}function nl(e){return e?ni.get(e):void 0}var al=3,ol=new Set(["freq","q","rate","time","log"]);function Gn(e,t,n){return!e||!ol.has(e)||!(n>t)?"linear":t>0?"log":"power"}function rt(e,t,n){return Gn(e,t,n)!=="linear"}function It(e,t,n,o){let r=Number(o);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),s=Gn(e,t,n);if(s==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return s==="power"?Math.cbrt(l):l}function ai(e,t,n,o){let r=Math.min(1,Math.max(0,Number(o)||0)),i=Gn(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**al:r)}function oi(e,t,n,o){let r=Math.min(n,Math.max(t,e));if(o>0){r=t+Math.round((r-t)/o)*o;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function et(e,t,n,o){return Math.round(It(e,t,n,o)*1e3)}function zt(e,t,n,o,r){return oi(ai(e,t,n,Number(o)/1e3),t,n,r)}function il(e,t,n=!1){let o=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=o+r:t==="ArrowLeft"||t==="ArrowDown"?i=o-r:t==="PageUp"?i=o+1e3/10:t==="PageDown"?i=o-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function Un(e,t,n,o,r,i=!1,s){let l=et(e,t,n,o),c=il(l,r,i);if(c===null)return null;let d=zt(e,t,n,c,s),p=Math.sign(c-l),u=oi(Number(o),t,n,s);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=zt(e,t,n,c,s);return d}function Va(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function rl(e,t,n,o=n/6){let r=e.some(p=>p===null),i=Math.max(0,n-(r?o:0)),s=e.reduce((p,u,m)=>u===null?p:p+Va(t[m]),0),l=s>0?i/s:0,c=e.map(p=>p===null?0:Math.min(i,Va(p)*l));if(r){let p=c.reduce((m,g)=>m+g,0),u=e.indexOf(null);c[u]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return r&&(d[d.length-1]=n),d}function sl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*o)),i=Math.max(1,Math.floor(n*o));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function ue(e){return Math.max(0,Math.min(1,e))}function ii(e,t){let{ctx:n,w:o,h:r}=sl(e);if(!n)return;n.clearRect(0,0,o,r);let i=Vs(e);if(t.paint==="swatch"){let c=q(e,"accent"),d=q(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,r),n.fillStyle=d,n.fillRect(o/2,0,o/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){dl(n,o,r,t,e,i);return}if(t.paint==="filter"){let c=t.mode??"lp",d=q(e,Qo(c)),p=q(e,"divider"),u=ue(t.cutoff??.5),m=.08+(1-ue(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(o,r*.72),n.stroke(),n.beginPath();for(let g=0;g<=o;g++){let f=g/Math.max(1,o),w=0;c==="lp"?w=f<u?1:Math.max(0,1-(f-u)/m):c==="hp"?w=f>u?1:Math.max(0,1-(u-f)/m):w=Math.max(0,1-Math.abs(f-u)/m);let h=r*.78-w*r*.62;g===0?n.moveTo(g,h):n.lineTo(g,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=q(e,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,r),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=q(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,m]=rl([c,d],t.max??[1,4],o),g=2,f=r-1;n.beginPath(),n.moveTo(p,f),n.lineTo(u,g);let w=Math.max(1,Math.ceil(m-u));for(let h=1;h<=w;h++){let b=h/w;n.lineTo(u+(m-u)*b,f-(f-g)*Math.exp(-4.6*b)*(1-b*.01))}n.lineTo(m,f),n.lineTo(o,f),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=q(e,"accent"),m=q(e,"text-sub"),g=r/2;n.fillStyle=q(e,"accent-soft"),n.fillRect(ue(d)*o,0,(ue(p)-ue(d))*o,r),n.strokeStyle=q(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(o,g),n.stroke();let f=Math.floor(c.length/2);for(let w=0;w<f;w++){let h=(w+.5)/f*o,b=Math.max(-1,Math.min(1,c[w*2]??0)),y=Math.max(-1,Math.min(1,c[w*2+1]??0)),v=(w+.5)/f;n.strokeStyle=v>=d&&v<=p?u:m,n.beginPath(),n.moveTo(h,g-y*(g-1)),n.lineTo(h,g-b*(g-1)+.5),n.stroke()}n.strokeStyle=u;for(let w of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(ue(w)*(o-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=q(e,"text"),n.fillRect(Math.round(ue(t.position)*(o-1)),0,1,r)),f||(n.fillStyle=m,n.font=i,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=ue(t.level??0);n.fillStyle=q(e,"divider"),n.fillRect(0,r*.4,o,r*.2),n.fillStyle=q(e,"accent"),n.fillRect(0,r*.4,o*c,r*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=q(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,o,r*.1),n.fillStyle=q(e,"rhythm.playhead"),n.fillRect(l/s*o,r*.3,Math.max(1,o/s),r*.4),e.dataset.ncAccent=q(e,"accent")}var We=20,hn=2e4,Qt=24,_a=-60;function ll(e,t,n,o,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,s=Math.cos(i),l=Math.sin(i)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-s)/2,1-s,(1-s)/2];let u=1+l,m=-2*s,g=1-l,f=2*Math.PI*o/r,w=(v,E,A)=>v+E*Math.cos(f)+A*Math.cos(2*f),h=(v,E)=>-(v*Math.sin(f)+E*Math.sin(2*f)),b=Math.hypot(w(c,d,p),h(d,p)),y=Math.hypot(w(u,m,g),h(m,g));return y>0?b/y:0}function cl(e,t){return Math.log(Math.max(We,Math.min(hn,e))/We)/Math.log(hn/We)*t}function Ga(e,t,n){let o=Math.max(_a,Math.min(Qt,e));return t+(Qt-o)/(Qt-_a)*(n-t)}function dl(e,t,n,o,r,i){let s=o.mode??"lp",l=q(r,Qo(s)),c=q(r,"divider"),d=q(r,"text-sub"),p=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,m=Math.max(u+4,n-p-3),g=o.q??Math.SQRT1_2,f=Math.round(Ga(0,u,m))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,f),e.lineTo(t,f),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let h=We*(hn/We)**(w/Math.max(1,t)),b=o.open?1:ll(s,o.hz,g,h,o.sampleRate),y=Ga(20*Math.log10(Math.max(1e-5,b)),u,m);w===0?e.moveTo(w,y):e.lineTo(w,y)}if(e.strokeStyle=l,e.stroke(),!o.open){let w=Math.round(cl(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,u),e.lineTo(w,m),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=l,r.dataset.ncFilterHz=String(Math.round(o.hz))}function ie(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let r=n.defaultView.getComputedStyle(o).color;return o.remove(),r}function pl(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Me=20,st=2e4,Wn=Math.log(st/Me),mn=32,ul=250,hl=-100,ml=1200,fl=4.5,Ua=-6,ye=-96,gl=48,Wa=[100,1e3,1e4],bl=[6,12];function Pe(e,t){return Math.log(Math.max(Me,Math.min(st,e))/Me)/Wn*t}function xt(e,t){return Me*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Wn)}function ge(e,t,n,o){let r=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*r}function fn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ri=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function wl(e,t,n,o){let r=n?3:1,i=c=>({db:Math.max(-o,Math.min(o,e.db+c*r))}),s=c=>({hz:Math.max(e.minHz??Me,Math.min(e.maxHz??st,e.hz*2**(c*r/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?s(1):i(1);case"ArrowLeft":return e.moveHz?s(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Yn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function vl(e,t,n,o,r,i,s,l,c){let d=c?.25:1,p={},u=Math.max(1,i/2-l);if(p.db=Math.max(-s,Math.min(s,t.db-o*d/u*s/Yn(e))),e.moveHz){let m=t.hz*Math.exp(n*d/Math.max(1,r)*Wn);p.hz=Math.max(e.minHz??Me,Math.min(e.maxHz??st,m))}return p}function xl(e,t,n,o,r){let i=Math.max(0,n.left)+1,s=Math.min(n.right,r)-1,l=Math.min(t.width*3+o*2,s-i),c=Math.max(i,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var B=new WeakMap;function yl(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,o.append(r,i);for(let c of e.bands)o.append($l(n,c,t));o.append(s),o.addEventListener("click",c=>{if(!ui(n)||c.button>0)return;let d=pi(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),B.set(n,{control:e,cache:null,spec:null,active:null}),li(n,e),n}function si(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function $l(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let r=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>r()?.bands.find(d=>d.id===t.id)??null,s=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=i();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",he(e,t.id))}),o.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let p=r(),u=i(),m=B.get(e);if(!p||!u||!m?.box)return;let{w:g,h:f,pad:w}=m.box;p.onBand(u.id,vl(u,s.start,d.clientX-s.x,d.clientY-s.y,g,f,p.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&he(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),r()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=r(),u=i();if(!p||!u)return;let m=wl(u,d.key,d.shiftKey,p.range??18);m&&(d.preventDefault(),m==="reset"?p.onReset?.(u.id):p.onBand(u.id,m),he(e,u.id))});let c=null;return o.addEventListener("wheel",d=>{let p=r(),u=i();if(!p||!u?.moveQ)return;d.preventDefault();let m=d.timeStamp;(!c||m-c.t>400)&&(c={q:u.q,t:m});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-g/240))),c.t=m,p.onBand(u.id,{q:c.q}),he(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>he(e,t.id)),o.addEventListener("focus",()=>he(e,t.id)),o.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==o&&he(e,null)}),o.addEventListener("blur",()=>{s||he(e,null)}),o}function he(e,t){let n=B.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Re(e):Kn(e)}function Kn(e){let t=B.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(f=>f.id===t.active):null;for(let f of e.querySelectorAll(".nc-eq-node"))f instanceof HTMLElement&&(o&&f.dataset.band===o.id?f.dataset.active="true":delete f.dataset.active);if(!o||!t.box){n.hidden=!0;return}let r=[o.label,ri(o.db)];o.kind==="peak"?r.push(fn(o.hz),`Q ${o.q.toFixed(1)}`):r.push(`${o.kind==="lowshelf"?"below":"above"} ${fn(o.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(kl(t.control,o)),n.hidden=!1;let{w:i,h:s,pad:l}=t.box,c=Pe(o.hz,i),d=ge(o.db*Yn(o),s,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,m=Math.max(0,Math.min(i-p,c-p/2)),g=d-u-l*1.5>=0?d-u-l*1.5:Math.min(s-u,d+l*1.5);n.style.left=`${Math.round(m)}px`,n.style.top=`${Math.round(g)}px`}function kl(e,t){return e.bands.indexOf(t)%3+1}function li(e,t){let n=B.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Jn(e);let o=t.range??18;t.bands.forEach((r,i)=>{let s=si(e,r.id);s instanceof HTMLElement&&(s.dataset.tone=String(i%3+1),s.dataset.kind=r.kind,s.setAttribute("aria-label",`${r.label} band`),s.setAttribute("aria-valuemin",String(-o)),s.setAttribute("aria-valuemax",String(o)),s.setAttribute("aria-valuenow",String(r.db)),s.setAttribute("aria-valuetext",r.valueText??`${ri(r.db)}, ${fn(r.hz)}`),s.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?s.setAttribute("data-nc-help",r.help):s.removeAttribute("data-nc-help"))}),Re(e),Ll(e)}function ci(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*o)),i=Math.max(1,Math.round(n*o));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function di(e){return{curve:ie(e,"eq-curve"),fill:ie(e,"eq-fill"),quiet:ie(e,"text-sub"),grid:ie(e,"eq-grid"),zero:ie(e,"divider"),label:ie(e,"text-sub"),spectrum:ie(e,"eq-spectrum"),bands:[ie(e,"eq-band-1"),ie(e,"eq-band-2"),ie(e,"eq-band-3")]}}function El(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Re(e){B.has(e)&&Jn(e);let t=B.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:r,w:i,h:s}=ci(n);if(!r)return;let l=Math.max(8,Math.round(s*.06)),c=o.range??18;t.box={w:i,h:s,pad:l},t.colours=di(e);let d=t.colours,p=El(o,i);if(!t.cache||t.cache.key!==p){let E=Math.max(64,Math.ceil(i)+1),A=new Float64Array(E);for(let M=0;M<E;M++)A[M]=xt(M/(E-1)*i,i);let S=null;try{S=typeof o.response=="function"?o.response(A):null}catch{S=null}t.cache={key:p,freqs:A,total:S?.total??new Float64Array(E),bands:S?.bands??[]}}r.clearRect(0,0,i,s);let u=pl(e),m=o.on!==!1;Al(r,i,s,c,l,d,u);let{freqs:g,total:f,bands:w}=t.cache,h=Array.from(g,E=>Pe(E,i)),b=ge(0,s,c,l);w.forEach((E,A)=>{if(!E||!E.some(I=>Math.abs(I)>.05))return;let S=m?d.bands[A%3]:d.quiet,M=Array.from(E,I=>ge(I,s,c,l));r.save(),t.active&&o.bands[A]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=S,Ya(r,h,M,b)),r.globalAlpha=m?.75:.4,r.strokeStyle=S,r.lineWidth=.75,Zt(r,h,M),r.restore()});let y=Array.from(f,E=>ge(E,s,c,l)),v=m?d.curve:d.quiet;r.save(),r.fillStyle=m?d.fill:d.quiet,r.globalAlpha=m?.2:.08,Ya(r,h,y,b),r.restore(),r.save(),r.strokeStyle=m?d.fill:v,r.lineJoin="round",r.lineCap="round",m&&(r.globalAlpha=.16,r.lineWidth=4,Zt(r,h,y)),r.globalAlpha=1,r.strokeStyle=v,r.lineWidth=1.25,Zt(r,h,y),r.restore(),Ml(e),Kn(e)}function Al(e,t,n,o,r,i,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<Me||p>st)continue;let u=Math.round(Pe(p,t))+.5;e.globalAlpha=Wa.includes(p)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of bl)if(!(c>o))for(let d of[1,-1]){let p=Math.round(ge(c*d,n,o,r))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(ge(0,n,o,r))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Wa){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=Pe(c,t)+3;e.fillText(d,u+p+2>t?Pe(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=ge(c,n,o,r);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Ft(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let r=(t[o]+t[o+1])/2,i=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function Zt(e,t,n){e.beginPath(),Ft(e,t,n),e.stroke()}function Ya(e,t,n,o){e.beginPath(),Ft(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function pi(e){return e.closest("[data-nc-maxable]")}function ui(e){let t=pi(e);return!!t&&!t.hasAttribute("data-nc-max")}function Jn(e){let t=ui(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=B.get(e);n?.active&&(n.active=null,Kn(e))}return t}function Ml(e){Jn(e);let t=B.get(e);if(!t?.box)return;let{w:n,h:o,pad:r}=t.box,i=t.control.range??18;for(let s of t.control.bands){let l=si(e,s.id);l instanceof HTMLElement&&(l.style.left=`${Pe(s.hz,n).toFixed(1)}px`,l.style.top=`${ge(s.db*Yn(s),o,i,r).toFixed(1)}px`)}}function Sl(e,t,n,o){let r=o/2/n,i=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=xt(d,t),m=xt(p,t),g=xt(c/(e-1)*t,t);i[c]=Math.min(n-1,u/r),s[c]=Math.min(n-1,m/r),l[c]=fl*Math.log2(g/1e3)}return{lo:i,hi:s,tilt:l}}function Cl(e,t,n){let o=Math.floor(t),r=Math.ceil(n);if(r-o<=1){let s=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*s}let i=-1/0;for(let s=o;s<=r&&s<e.length;s++)e[s]>i&&(i=e[s]);return i}function Ll(e){let t=B.get(e);if(t){if(!t.control.spectrum){mi(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let r=B.get(e)?.spec;r&&(r.visible=o.some(i=>i.isIntersecting),gn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}gn(e)}}function gn(e){let t=B.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){hi(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=bn(e),n.onVis||(n.onVis=()=>gn(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&wn(e,!1)}function bn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function wn(e,t){let n=B.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,en(e,bn(e))),ul):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(r=>(n.raf=0,en(e,r))):n.timer=o.setTimeout(()=>(n.timer=0,en(e,bn(e))),mn))}function hi(e){let t=B.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function mi(e){let t=B.get(e)?.spec;if(!t)return;hi(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=B.get(e);n&&(n.spec=null)}function en(e,t){let n=B.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){mi(e);return}if(!o.analyser)return;if(t-o.last<mn-4&&!o.idle){wn(e,!1);return}let r=o.last?Math.min(.25,(t-o.last)/1e3):mn/1e3;o.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=ci(i);if(!s)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...Sl(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,m=gl*r,{lo:g,hi:f,tilt:w}=o.map;for(let b=0;b<d;b++){let y=Cl(o.buf,g[b],f[b]);y>u&&(u=y);let v=y+w[b],E=o.disp[b]-m;o.disp[b]=v>E?v:E}u>hl&&(o.loud=t);let h=t-o.loud>ml;s.clearRect(0,0,l,c),(!h||o.disp.some(b=>b>ye))&&Tl(s,l,c,o.disp,n.colours??di(e)),o.idle=h&&!o.disp.some(b=>b>ye),wn(e,o.idle)}function Tl(e,t,n,o,r){let i=o.length,s=new Array(i),l=new Array(i),c=d=>{let p=o[Math.max(0,Math.min(i-1,d))];return Number.isFinite(p)?p:ye};for(let d=0;d<i;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(ye,Math.min(Ua,Number.isFinite(p)?p:ye))-ye)/(Ua-ye);s[d]=d/(i-1)*t,l[d]=n-u*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),Ft(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),Ft(e,s,l),e.stroke(),e.restore()}var Il=.8912509381337456,vn=32,zl=250,Fl=1200,Nl=.2,fi=1.5;function Pl(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Dl(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",o.append(r),t.append(o)}return t}var Nt=new WeakMap,Ka=new WeakMap;function Ja(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let r=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function ql(e){let t=Ka.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(r=>{for(let i of r){let s=Nt.get(i.target);s&&(s.seen.set(i.target,i.isIntersecting),Ye(s))}Fe(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Ye(r);Fe(t)}),Ka.set(e,t),t}var gi=e=>e.els.some(t=>t.isConnected);function jl(e){if(!e.loop.io)return gi(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Ye(e){let t=!e.dead&&!!e.source&&jl(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Xn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),$n(e))}function Xn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Fe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){bi(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Xn(e)),!e.raf&&!e.timer&&xn(e,!1)}function xn(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Xa(e,Xn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),zl):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Xa(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,o()),vn)}function bi(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Xa(e,t){if(t-e.last<vn-4&&!e.idle&&e.last){xn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):vn/1e3;e.last=t,e.frames++;let o=!1,r=!1;for(let i of e.recs){if(!gi(i)){(i.placed||e.frames-i.born>90)&&wi(i);continue}i.placed=!0,i.open&&(r=!0,Rl(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(o=!0))}if(!r){bi(e);return}e.idle=t-e.loud>Fl&&!o,xn(e,e.idle)}function Rl(e,t,n){if(e.fall<0){let m=e.els[0];e.fall=Ja(m,"motion-meter-fall",Nl),e.hold=Ja(m,"motion-meter-hold",fi)}let o=null;try{o=e.source.read()}catch{o=null}let r=typeof o=="number",i=r?o:Number(o?.in)||0,s=!r&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=s&&Number(o.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let m of e.els)m.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[i,l],u=!1;for(let m=0;m<2;m++){let g=Pl(p[m]);g>0&&(u=!0),e.disp[m]=g>=e.disp[m]?g:g+(e.disp[m]-g)*d,e.disp[m]<.001&&(e.disp[m]=0),p[m]>=Il&&(e.clipAt[m]=n);let f=e.clipAt[m]>0&&n-e.clipAt[m]<e.hold*1e3;yn(e,m,e.disp[m],f)}return u}function yn(e,t,n,o){let r=Math.round(n*1e3)/1e3,i=o?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${r})`,l.dataset.clip=i)}}}function $n(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,yn(e,0,0,!1),yn(e,1,0,!1)}function wi(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Nt.get(t)===e&&Nt.delete(t)}function Bl(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,r=ql(o),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:fi,rows:""};for(let s of n)Nt.set(s,i),r.io?.observe(s);if(r.recs.add(i),$n(i),!r.io){let s=o.defaultView,l=()=>{Ye(i),Fe(r)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!i.dead){if(l===i.source){Ye(i),Fe(r);return}i.open&&(i.open=!1,i.source?.close?.(),$n(i)),i.source=l,Ye(i),Fe(r)}},destroy(){i.dead||wi(i),Fe(r)}}}var vi={slop:8,longPressMs:500,pitchPx:16},Ol=class{constructor(e,t,n=vi){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-i/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Hl(e,t,n,o=vi){let r=!1,i=0,s=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),m=[...e.querySelectorAll(t)],g=u?m.findIndex(h=>h===u||h.contains(u)):-1;if(g>=0)return g;let f=-1,w=Number.POSITIVE_INFINITY;return m.forEach((h,b)=>{if(h.hidden)return;let y=h.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let v=Math.abs(d-(y.left+y.width/2));v<w&&v<=y.width&&(f=b,w=v)}),f},l=new Ol(s,d=>{(d.kind==="paint"||d.kind==="long")&&(r=!0),n(d)},o),c=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(r=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),i=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{r&&(r=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var xi="netcomposer.groups.v1";function Qn(){try{return globalThis.localStorage??null}catch{return null}}function yi(e=Qn(),t=xi){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&o.set(r,i);return o}catch{return new Map}}function Vl(e,t,n,o=xi){let r=yi(e,o);r.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(r)))}catch{}}function _l(e,t=Qn()){return yi(t).get(e.id)??e.open===!0}function Gl(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),r.append(i,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return r.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";Vl(Qn(),e.id,d),kn(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(r,c),$i(o,e),kn(o,_l(e)),ki(o,e),o}function kn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function $i(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function ki(e,t){$i(e,t)&&kn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";o&&o.textContent!==r&&(o.textContent=r)}var ut="application/x-nc-pad",Qa="http://www.w3.org/2000/svg";function Ul(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],r=[];for(let i=0;i<n;i++){let s=Math.floor(i*t/n),l=Math.max(s+1,Math.floor((i+1)*t/n)),c=0,d=0;for(let u=s;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:i/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),r.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${r.reverse().join("L")}Z`}function Wl(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>o.append(Yl(n,i,t))),n.append(o),n.addEventListener("keydown",r=>{r.key==="Escape"&&yt(n)}),Ai(n,e),n}function Yl(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Qa,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Qa,"path");return c.append(d),o.append(r,i,s,l,c),Jl(e,o,t,n),i.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&Ei(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(ut,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(ut)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(ut)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let m=p.dataTransfer?.getData(ut);if(m!==void 0&&m!==""){p.preventDefault(),p.stopPropagation();let f=Number(m);f!==t&&u.onMove?.(f,t,p.altKey);return}let g=p.dataTransfer?.files?.[0];g&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,g))}),o}function Kl(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Jl(e,t,n,o){let r=0,i=!1,s=0,l=0,c=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,s=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=Za(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{r&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),i=Za(e,t,n,o)}),t.addEventListener("click",()=>{if(i){i=!1;return}Kl(e,n,o)})}function Za(e,t,n,o){let r=o(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;yt(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),yt(e)}),s.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of i){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{yt(e);let m=o(e);m?.type==="padGrid"&&(p.id==="rename"&&m.onRename?Ei(e,t,n,o):m.onMenu?.(n,p.id))}),l.append(u)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Ei(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=o(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.top-s.top}px`,i.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=i.value.trim();i.remove(),t.focus();let m=o(e);p&&u&&m?.type==="padGrid"&&m.onRename?.(n,u)};i.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])i.addEventListener(p,u=>u.stopPropagation());e.append(i),i.focus(),i.select()}function yt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ai(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let s=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),i.draggable=!o.empty,o.empty?(i.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,s&&(s.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",Ul(o.peaks))),!o.empty&&o.hint?i.dataset.hint="true":delete i.dataset.hint,o.lane?i.dataset.ncLane=String(o.lane):delete i.dataset.ncLane;let p=t.selected===r;p?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",p?"true":"false"),o.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",o.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function W(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Ht(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(o,r),n}function eo(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function tt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Xl=450,to=8;function re(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Ql(e){let t=Hs(e,"target-min");return t>0?t:44}function Zl(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Ql(e),o=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let s=t[i],l=r[i];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,u=c+o,m=d-o,g=d+o;for(let f=0;f<t.length;f++){if(i===f)continue;let w=r[f];if(!w||w.width===0)continue;let h=w.left+w.width/2,b=w.top+w.height/2;Math.abs(b-d)<o*2&&(h>c?u=Math.min(u,(c+h)/2):h<c&&(p=Math.max(p,(c+h)/2))),Math.abs(h-c)<o*2&&(b>d?g=Math.min(g,(d+b)/2):b<d&&(m=Math.max(m,(d+b)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),m=Math.min(m,l.top),g=Math.max(g,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${m-l.top}px`,s.style.width=`${Math.max(0,u-p)}px`,s.style.height=`${Math.max(0,g-m)}px`,s.style.transform="none"}}function Mi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function no(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ee(e,t){switch(e.type){case"slider":return ec(e,t);case"select":return nc(e,t);case"toggle":return ac(e,t);case"button":return oc(e,t);case"readout":return ic(e);case"label":return cc(e);case"note":return ao(e);case"knob":return uc(e,t);case"choice":return hc(e,t);case"slotRow":return mc(e,t);case"stepGrid":return wc(e,t);case"canvas":return $c(e);case"fx":return Ic(e,t);case"eqGraph":return yl(e,t);case"group":return Gl(e,t,Ee);case"strip":return kc(e,t);case"stripAdd":return Sc(e,t);case"padGrid":return Wl(e,t);case"moves":return sc(e,t);default:return ao({id:"unknown",text:""})}}function te(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Li(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Si(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??tt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),eo(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")eo(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&be(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&dc(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??tt(t.value))}else if(t.type==="choice")Ti(e,t);else if(t.type==="slotRow")zi(e,t);else if(t.type==="stepGrid")An(e,t);else if(t.type==="padGrid")Ai(e,t);else if(t.type==="moves")Ci(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&ii(n,t)}else if(t.type==="eqGraph")li(e,t);else if(t.type==="strip"){Di(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${De(n.id)}"]`);o instanceof Element&&te(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Ni(e,t);else if(t.type==="group"){ki(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${De(n.id)}"]`);o instanceof Element&&te(o,n)}}else if(t.type==="fx"){Gi(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${De(n.id)}"]`);o instanceof Element&&te(o,n)}}}}function ec(e,t){let n=Ht(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let r=rt(e.taper,e.min,e.max);o.min=String(r?0:e.min),o.max=String(r?1e3:e.max),o.step=String(r?1:e.step),r&&(o.dataset.ncTaper=e.taper),o.value=String(Si(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let i=l=>r?zt(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(i(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(i(l))}),r&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=Un(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(et(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(o,s),e.onTap&&n.insertBefore(tc(e,o,t),s),n.append(W()),te(n,e),n}function Si(e){return rt(e.taper,e.min,e.max)?et(e.taper,e.min,e.max,e.value):e.value}function tc(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(re());let r=i=>{let s=n(t);s?.type==="slider"&&s.onTap?.(i)};return o.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),o.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),o}function nc(e,t){let n=Ht(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let r=null;for(let i of e.options){let s=document.createElement("option");s.value=i.value,s.textContent=i.label,i.disabled&&(s.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),o.append(r)):r=null,(r??o).append(s)}return o.value=e.value,o.addEventListener("change",()=>{let i=t(o);i?.type==="select"&&i.onChange(o.value)}),n.append(o,W()),n}function ac(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(W()),te(n,e),n}function oc(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(W()),te(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=Mi(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Fi(i);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),o.append(n,r),o}function ic(e){let t=Ht(e.id,e.label);return t.append(W()),te(t,e),t}var rc=450;function sc(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",o.label),o.title&&(r.title=o.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=o.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(lc(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}r.append(i,s),n.append(r)}return Ci(n,e),n}function Ci(e,t){for(let n of t.groups)for(let o of n.moves){let r=e.querySelector(`[data-nc-move="${De(o.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=o.disabled===!0)}}function lc(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function cc(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(W()),t}function ao(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(W()),t}function oo(e){if(typeof e.valueText=="string")return e.valueText;let t=tt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Li(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function dc(e,t){let n=It(t.taper,t.min,t.max,t.value);Li(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(It(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,r))),e.style.setProperty("--knob-to",String(Math.max(o,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",oo(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${oo(t)}`}function pc(e,t){if(rt(e.taper,e.min,e.max))return Un(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function uc(e,t){let n=Ht(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",o.append(r);let i=0,s=0;o.addEventListener("pointerdown",d=>{i=d.clientY;let p=t(o);s=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(rt(p.taper,p.min,p.max)){let g=It(p.taper,p.min,p.max,s)-(d.clientY-i)/120;p.onChange(ai(p.taper,p.min,p.max,g));return}let u=p.max-p.min||1,m=Math.min(p.max,Math.max(p.min,s-(d.clientY-i)*u/120));p.onChange(m)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let u=pc(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(W()),te(n,e),n}function hc(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let o of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=o.value,r.setAttribute("role","tab"),r.textContent=o.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(o.value)}),r.addEventListener("keydown",i=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(r),c=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(l+1)%s.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(r)}return n.append(W()),Ti(n,e),n}function Ti(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function mc(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],m=document.createElement("span");m.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(p),g.textContent=u.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(g,re()),fc(m,g,n,p,t),o.append(m)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=Mi(),r.append(re()),r.addEventListener("click",()=>{Fi(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...r?[r]:[]),n.append(d,i,W()),Ii(n,t),zi(n,e),n}function io(e,t,n,o){let r=n(e);if(r?.type!=="slotRow")return;Ge(e);let i=o.shiftKey?"store":o.altKey?"clear":"recall";r.onSlot(t,i)}function fc(e,t,n,o,r){let i=0,s=0,l=0,c=!1,d=!1,p=!1,u=!1,m=()=>{window.clearTimeout(i),i=0},g=b=>{let y=b.clientX-s,v=b.clientY-l;y*y+v*v>to*to&&(c=!0,m())},f=()=>{u&&(u=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",h))},w=b=>{let y=i!==0&&!c&&!d;m(),f(),y&&(p=!0,io(n,o,r,b))},h=()=>{c=!0,m(),f()};e.addEventListener("pointerdown",b=>{b.button===0&&(f(),d=!1,c=!1,p=!1,s=b.clientX,l=b.clientY,m(),i=window.setTimeout(()=>{i=0,!c&&(d=!0,gc(n,t,o,r))},Xl),u=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",b=>b.preventDefault()),e.addEventListener("click",b=>{if(p||d||c){p=!1,d=!1,c=!1;return}io(n,o,r,b)})}function Ii(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=ro("Save","store"),r=ro("Clear","clear");n.append(o,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ge(e)}),i.addEventListener("click",s=>s.stopPropagation()),e.append(i,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Ge(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Ge(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ge(e)})}function ro(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function gc(e,t,n,o){Ii(e,o);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.bottom-s.top}px`,r.querySelector("button")?.focus()}function Ge(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function zi(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),s=t.slots[i];if(!s)continue;r.textContent=s.label,s.filled?r.dataset.filled="true":delete r.dataset.filled,s.active?r.dataset.active="true":delete r.dataset.active,s.edited?r.dataset.edited="true":delete r.dataset.edited,s.queued?r.dataset.queued="true":delete r.dataset.queued,s.queued&&s.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Fi(e){let t=e.dataset.ncLastFill||null,n=Cs(t);e.dataset.ncLastFill=n;let o=Ls(n);if(o)for(let[r,i]of Object.entries(o))e.style.setProperty(r,i)}function bc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,r=i=>{if(o===i)return;o=i,n.setAttribute("aria-pressed",i?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function wc(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let r=h=>{let b=document.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.textContent=h,o.append(b),b},i=r("Note"),s=r("Accent");s.dataset.ncAccentMode="";let l=h=>{for(let b of[i,s]){let y=b===h;b.setAttribute("aria-checked",y?"true":"false"),b.tabIndex=y?0:-1}};l(i);for(let h of[i,s])h.addEventListener("click",()=>l(h));o.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let b=s.getAttribute("aria-checked")==="true"?i:s;l(b),b.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(bc(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let b=document.createElement("div");b.className="nc-row",b.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=h.label,y.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(y.dataset.ncLane=String((h.lane-1)%4+1));let v=!1,E=0;y.addEventListener("pointerdown",M=>{v=!1,!(M.pointerType==="mouse"||M.button!==0)&&(E=window.setTimeout(()=>{let I=t(n);I?.type!=="stepGrid"||!I.selectedRows||(v=!0,I.onSelectRow?.(I.rows.findIndex(P=>P.id===h.id),!0))},rc))});for(let M of["pointerup","pointercancel","pointerleave"])y.addEventListener(M,()=>window.clearTimeout(E));y.addEventListener("contextmenu",M=>{v&&M.preventDefault()}),y.addEventListener("click",M=>{let I=t(n);if(I?.type!=="stepGrid")return;if(v){v=!1;return}let P=I.rows.findIndex(xe=>xe.id===h.id),oe=!!I.selectedRows&&(M.shiftKey||M.metaKey||M.ctrlKey);I.onSelectRow?.(P,oe)}),y.addEventListener("keydown",M=>vc(n,y,M));let A=[];for(let M of["mute","solo"]){if(!(M==="mute"?e.onMute:e.onSolo))continue;let I=document.createElement("span");I.className="nc-ms-wrap";let P=document.createElement("button");P.type="button",P.className="nc-ms",P.dataset.ncMs=M,P.textContent=M==="mute"?"M":"S",P.setAttribute("aria-label",`${M==="mute"?"Mute":"Solo"} ${h.label}`),I.append(P,re()),I.addEventListener("click",()=>{let oe=t(n);if(oe?.type!=="stepGrid")return;let xe=oe.rows.findIndex(Ut=>Ut.id===h.id);(M==="mute"?oe.onMute:oe.onSolo)?.(xe)}),A.push(I)}let S=document.createElement("div");S.className="nc-steps";for(let M=0;M<h.steps.length;M++){let I=document.createElement("span");I.className="nc-step-wrap";let P=document.createElement("button");P.type="button",P.className="nc-step",P.dataset.ncStep=`${h.id}:${M}`,P.setAttribute("aria-label",`${h.label} step ${M+1}`),I.append(P,re()),I.addEventListener("click",oe=>{let xe=t(n);if(xe?.type!=="stepGrid")return;let Ut=xe.rows.findIndex(Pr=>Pr.id===h.id),Nr=s.getAttribute("aria-checked")==="true";xe.onToggle(Ut,M,oe.shiftKey||Nr)}),S.append(I)}if(e.onLength&&S.append(xc(n,S,h,t)),b.append(...A,y,S),e.onDice){let M=document.createElement("button");M.type="button",M.className="nc-sparkle nc-row-dice",M.dataset.ncDice=h.id,M.setAttribute("aria-label",`Re-roll ${h.label}`),M.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,M.innerHTML=no(),M.append(re()),M.addEventListener("click",()=>{let I=t(n);I?.type==="stepGrid"&&I.onDice?.(I.rows.findIndex(P=>P.id===h.id))}),b.append(M)}b.addEventListener("click",M=>{if(M.target!==b)return;let I=t(n);I?.type==="stepGrid"&&I.onSelectRow?.(I.rows.findIndex(P=>P.id===h.id))}),so(n,S,".nc-step-wrap",t,s,()=>h.id),n.append(b)}let d=document.createElement("div");d.className="nc-pads-head";let p=(h,b,y)=>{let v=document.createElement("button");return v.type="button",v.className=h,v.textContent=b,y&&v.setAttribute("aria-label",y),v},u=p("nc-pads-step","‹","Previous lane"),m=p("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",An(n,h))}));for(let[h,b]of[[u,-1],[m,1]])h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let v=y.rows.length;y.onSelectRow?.(((ht(y)+b)%v+v)%v)});if(d.append(u,g,m),e.onDice){let h=p("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=no(),h.addEventListener("click",()=>{let b=t(n);if(b?.type!=="stepGrid")return;let y=ht(b);y>=0&&b.onDice?.(y)}),d.append(h)}if(e.transport){let h=p("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let b=t(n);b?.type==="stepGrid"&&b.transport?.onToggle()}),d.append(h)}n.append(d);let f=document.createElement("div");f.className="nc-pads",f.setAttribute("role","group");let w=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<w;h++){let b=document.createElement("button");b.type="button",b.className="nc-pad",b.dataset.ncPad=String(h),b.textContent=String(h+1),b.addEventListener("click",y=>{let v=t(n);if(v?.type!=="stepGrid")return;let E=ht(v);if(E<0)return;if(n.dataset.ncLenMode==="true"){v.onLength?.(E,h+1);return}let A=s.getAttribute("aria-checked")==="true";v.onToggle(E,h,y.shiftKey||A)}),f.append(b)}return so(n,f,".nc-pad",t,s,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[ht(h)]?.id:void 0}),n.append(f),n.append(W()),An(n,e),n}function ht(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function so(e,t,n,o,r,i){let s="on",l=!0,c=-1,d=(p,u)=>{let m=p.rows[c]?.steps[u];!m||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,s,l):!!m[s]!==l&&p.onToggle(c,u,s==="accent"))};Hl(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let m=u.rows.findIndex(g=>g.id===i());m>=0&&u.rows[m].length!==p.pad+1&&u.onLength?.(m,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let m=i();c=u.rows.findIndex(f=>f.id===m);let g=u.rows[c]?.steps[p.pad];if(!g)return;s=r.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}d(u,p.pad)}else if(p.kind==="long"){let m=i(),g=u.rows.findIndex(w=>w.id===m),f=t.querySelectorAll(n)[p.pad];g>=0&&f instanceof HTMLElement&&u.onLongPress?.(g,p.pad,f)}}})}function vc(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],r=o.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=o.length-1;let s=o[i];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function xc(e,t,n,o){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(re());let i=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(f=>f.id===n.id),m=p.rows[u];if(!m)return;let g=Math.max(1,Math.min(m.steps.length,d));g!==m.length&&p.onLength?.(u,g)},s=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((m,g)=>{let f=m.getBoundingClientRect();f.width>0&&d>=f.left+f.width/2&&(u=g+1)}),u},l=d=>i(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete r.dataset.dragging};return r.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),r.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(g=>g.id===n.id);if(!u)return;let m={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in m&&(d.preventDefault(),i(m[d.key]))}),r}var tn=new WeakMap,mt=new WeakMap;function yc(e){return e?(mt.has(e)||(mt.set(e,un(e)),Jo(t=>{mt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))En(n,Number(n.getAttribute("data-nc-velocity")))},e)),mt.get(e)):"light"}function En(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:yc(e.ownerDocument),r=n===null?null:`${o} ${n}`;if(!(tn.has(e)&&tn.get(e)===r)){if(tn.set(e,r),n===null){for(let i of Object.keys(ja(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,s]of Object.entries(ja(n,qa[o]??qa.light)))e.style.setProperty(i,s)}}function An(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&i&&(s.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let m=t.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let p=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let u of r.querySelectorAll("[data-nc-pad]")){let m=Number(u.getAttribute("data-nc-pad")),g=i.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!g||!l&&m>=i.length,l&&m>=i.length?u.dataset.out="true":delete u.dataset.out,l&&m===i.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${i.label} step ${m+1}`),u.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?u.dataset.accent="true":delete u.dataset.accent,g?.dim?u.dataset.dim="true":delete u.dataset.dim,En(u,g?.velocity),t.playhead>=0&&m===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let g=0;g<p.steps.length;g++){let f=p.steps[g],w=e.querySelector(`[data-nc-step="${p.id}:${g}"]`);if(!(w instanceof HTMLButtonElement))continue;let h=w.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===p.id?h.dataset.selected="true":delete h.dataset.selected;let v=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);v?h.dataset.picked="true":delete h.dataset.picked;let E=h.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===p.id||v?"true":"false"),E.textContent!==p.label&&(E.textContent=p.label,E.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?h.dataset.silent="true":delete h.dataset.silent;for(let A of h.querySelectorAll("[data-nc-ms]")){let S=A.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;A.setAttribute("aria-pressed",S?"true":"false")}}w.setAttribute("aria-pressed",f.on?"true":"false"),f.accent?w.dataset.accent="true":delete w.dataset.accent,f.dim?w.dataset.dim="true":delete w.dataset.dim,g%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof f.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,f.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),En(w,f.velocity);let b=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;g===b?w.dataset.playhead="true":delete w.dataset.playhead;let y=!!t.onLength&&t.selectedRow===p.id;w.hidden=g>=p.length&&!y,g>=p.length&&y?w.dataset.out="true":delete w.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),m=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&m&&m.nextElementSibling!==u){let g=document.activeElement===u;m.after(u),g&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function $c(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,W()),t}function kc(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",s=null;i&&(n.dataset.ncFoldable="",s=Bi(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&(v.onFold?.(v.folded!==!0),document.activeElement!==s&&s.focus())})),o.append(r);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let v=document.createElement("span");v.className="nc-strip-grip-dots",v.setAttribute("aria-hidden","true"),l.append(v),l.addEventListener("keydown",E=>{if(E.key!=="ArrowLeft"&&E.key!=="ArrowRight"||E.ctrlKey||E.metaKey||E.shiftKey)return;let A=t(n);A?.type==="strip"&&(E.preventDefault(),A.onMove?.(E.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>po(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",v=>{v.pointerType==="touch"||v.pointerType==="pen"||v.target instanceof Element&&v.target.closest("input, .nc-strip-remove")||(v.preventDefault(),po(n,o,t,{x:v.clientX,y:v.clientY}))}),e.onRemove){let v=document.createElement("button");v.type="button",v.className="nc-strip-remove",v.dataset.ncStripRemove="",v.textContent="×",v.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onRemove?.(v)}),o.append(v)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let v=document.createElement("span");v.className="nc-hacks-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks",E.dataset.ncHacks="",v.append(E,re()),v.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onHacks?.()}),c.append(v)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let v=document.createElement("span");v.className="nc-hacks-wrap nc-sends-view-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks nc-sends-view",E.dataset.ncSendsView="",v.append(E,re()),v.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onSendsView?.()}),d.append(v)}for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=v,A.textContent=v==="mute"?"M":"S",E.append(A,re()),E.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&(v==="mute"?S.onMute:S.onSolo)?.()}),d.append(E)}let p=document.createElement("div");p.className="nc-strip-sends";for(let v of e.sends??[])p.append(Ee({...v,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(Ee(Zn(e),t));let m=document.createElement("div");m.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let v of e.ticks??[]){let E=document.createElement("span");E.className="nc-scale-tick",E.style.setProperty("--tick-pos",String(v.value)),E.textContent=v.label,g.append(E)}let f=Ks({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:v=>{let E=t(n);E?.type==="strip"&&E.onChange(v)},onReset:()=>{let v=t(n);v?.type==="strip"&&co(v)}}),w=tl({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let v=t(n);v?.type==="strip"&&v.onClipClear?.()}});if(m.append(g,f.el,w.el),i){let v=document.createElement("button");v.type="button",v.className="nc-ui-fx-fold nc-strip-fold",v.dataset.ncStripFold="",v.setAttribute("aria-expanded","false");let E=document.createElement("span");E.className="nc-strip-fold-cap",E.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!e.pan,v.append(E,S,A),v.addEventListener("click",()=>{let M=t(n);if(M?.type!=="strip")return;M.onFold?.(!1);let I=n.querySelector("[data-nc-strip-hide]");I instanceof HTMLElement&&I.focus()}),m.prepend(v)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let b=0;h.addEventListener("click",v=>{let E=t(n);E?.type!=="strip"||!E.onTypeIn||(window.clearTimeout(b),v.detail===0?lo(n,h,t):v.detail===1&&(b=window.setTimeout(()=>lo(n,h,t),Mc)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(b);let v=t(n);v?.type==="strip"&&co(v)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(Ee(ea(e),t)),s&&n.append(s),l&&n.append(l),n.append(o,y,c,d,p,u,m,h,W()),Di(n,e),n}function Zn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Ac(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function ea(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Ec(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function Ec(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Ac(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Mc=250;function lo(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=o.valueText??tt(o.value),r.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,s=l=>{if(i)return;i=!0;let c=r.value;if(r.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};r.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),r.addEventListener("blur",()=>s(!1))}function Sc(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",o.append(r,i);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),c=s.value;Pi(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(o,s,W()),Ni(n,e),n}function Ni(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=r.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==s&&(o.replaceChildren(...r.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Pi(o))}function Pi(e){let t=e.options[0];t&&(t.selected=!0)}function co(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Di(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?Js(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),nl(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let f=t.valueText??tt(t.value);s.textContent!==f&&(s.textContent=f),s.setAttribute("aria-label",`${t.label} level ${f}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let f of e.querySelectorAll("[data-nc-ms]")){let w=f.getAttribute("data-nc-ms"),h=w==="mute"?t.mute===!0:t.solo===!0;f.setAttribute("aria-pressed",h?"true":"false"),f.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let f=t.hacksLabel??"Hacks";l.textContent!==f&&(l.textContent=f),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${f}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let f=t.sendsViewLabel??"Sends";c.textContent!==f&&(c.textContent=f),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${f}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),be(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=qi(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let f=e.querySelector(`.nc-strip-trim [data-nc-id="${De(t.trim.id)}"]`);f&&te(f,ea(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let f=e.querySelector(`.nc-strip-pan [data-nc-id="${De(t.pan.id)}"]`);f&&te(f,Zn(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let m=e.querySelector("[data-nc-strip-hide]");m instanceof HTMLElement&&(Oi(m,u,t.label),be(m,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!u,g.setAttribute("aria-label",`Expand ${t.label}`);let f=g.querySelector("[data-nc-strip-fold-name]");f&&f.textContent!==t.label&&(f.textContent=t.label),be(g,t.foldedHelp??t.foldHelp)}}function qi(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=ji?t:0}var ji=8,ft=null;function po(e,t,n,o){ft?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,s=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${r.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=qi(r),u=e.querySelector("[data-nc-strip-grip]")??t,m=(b=!1)=>{if(ft!==m)return;ft=null;let y=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",f,!0),i.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",h),(b||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},g=[0,...Array.from({length:ji},(b,y)=>y+1)].map(b=>{let y=i.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",b===p?"true":"false"),y.setAttribute("tabindex",b===p?"0":"-1"),y.dataset.ncShadeChoice=String(b),b===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(b),y.setAttribute("aria-label",`Shade ${b}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${b})`)),y.addEventListener("click",()=>{let v=n(e);m(!0),v?.type==="strip"&&v.onShade?.(b===0?null:b)}),y});if(d.append(...g),d.addEventListener("keydown",b=>{let y=g.indexOf(i.activeElement);if(y<0)return;let v=-1;b.key==="ArrowRight"||b.key==="ArrowDown"?v=(y+1)%g.length:b.key==="ArrowLeft"||b.key==="ArrowUp"?v=(y-1+g.length)%g.length:b.key==="Home"?v=0:b.key==="End"&&(v=g.length-1),!(v<0)&&(b.preventDefault(),g[y].setAttribute("tabindex","-1"),g[v].setAttribute("tabindex","0"),g[v].focus())}),l.append(c,d),typeof r.onMove=="function"){let b=[...e.parentElement?.children??[]].filter(v=>v.classList?.contains("nc-strip")&&!v.hasAttribute("data-nc-master")),y=b.indexOf(e);for(let[v,E,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let S=i.createElement("button");S.type="button",S.className="nc-strip-menu-item",S.dataset.ncStripMove=v<0?"left":"right";let M=i.createElement("span");M.textContent=E;let I=i.createElement("kbd");I.textContent=A,I.setAttribute("aria-hidden","true"),S.append(M,I),S.disabled=v<0?y<=0:y<0||y>=b.length-1,S.addEventListener("click",()=>{let P=n(e);m(!0),P?.type==="strip"&&P.onMove?.(v)}),l.append(S)}}i.body.append(l),(()=>{let b=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,v=l.offsetHeight,E=s.innerWidth||i.documentElement.clientWidth||y,A=s.innerHeight||i.documentElement.clientHeight||v,S=o?o.x:b.right-y,M=o?o.y:b.bottom+4;S=Math.max(4,Math.min(S,E-y-4)),M+v>A-4&&(M=Math.max(4,(o?o.y:b.top)-v-4)),l.style.left=`${Math.round(S)}px`,l.style.top=`${Math.round(M)}px`})();let f=b=>{if(b.key==="Escape")b.preventDefault(),b.stopPropagation(),m(!0);else if(b.key==="Tab"&&l.contains(i.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(E=>E.getAttribute("tabindex")!=="-1"),v=(y.indexOf(i.activeElement)+(b.shiftKey?-1:1)+y.length)%y.length;b.preventDefault(),y[v]?.focus()}},w=b=>{l.contains(b.target)||m(!1)},h=()=>m(!1);return i.addEventListener("keydown",f,!0),i.addEventListener("pointerdown",w,!0),s.addEventListener("resize",h),ft=m,(g.find(b=>b.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>m(!1)}}var Mn=typeof ResizeObserver=="function"?new ResizeObserver(Cc):null;function Cc(e){for(let t of e){if(!t.target.isConnected){Mn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Lc(n)}}function Lc(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+r+i}px`)}function Tc(e){if(Mn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Mn.observe(t)}function Ic(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Pt(e)&&!i&&!s)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),i&&l.append(Vi(n,"head")),e.on!==void 0){let c=ei({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}r&&l.append(Fc(n,t)),Pt(e)&&l.append(qc(n,t)),s&&l.append(jc(t)),n.append(l)}r&&n.prepend(Nc(n,t)),i&&_i(n,e);for(let l of e.controls)n.append(Ee(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Ee(d,t));n.append(l)}return n.append(W()),Gi(n,e),Tc(n),n}var zc=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Ri(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&zc(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Fc(e,t){let n=Bi();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Ri(e))}),n}function Bi(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Oi(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Nc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,o,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Vi(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Ri(e)}}),n}var Be=new Set;function $t(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Pt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),Pc="(max-width: 768px)";function Dc(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function qc(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Dc()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(Hi(e,o,!Be.has(o.id)),n.focus())}),n}function jc(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Hi(e,t,n){n?Be.add(t.id):Be.delete(t.id),ta(e,t)}function Rc(e,t){t?.type==="fx"&&Be.has(t.id)&&Hi(e,t,!1)}function Bc(e){return e.ownerDocument.defaultView?.matchMedia?.(Pc).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function ta(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=Pt(t)&&Be.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Pt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),$t(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Re(s)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",be(n,t.maxHelp)),!o){e.dataset.ncMax&&uo(e);return}if(!e.isConnected){let s=()=>e.isConnected&&Be.has(t.id)&&ta(e,t);queueMicrotask(()=>{e.isConnected?s():$t(e.ownerDocument,s)});return}let r=Bc(e),i=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&uo(e),e.dataset.ncMax=r,r==="over"&&Oc(e,t)),Hc(e.ownerDocument),r==="over"&&na(e),$t(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&Re(s)})}function uo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),$t(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Re(n)})}function Oc(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function na(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(o).columnGap??"")||0,s=xl(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var ho=new WeakSet;function Hc(e){ho.has(e)||(ho.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&na(t)}))}var Sn=new WeakMap;function Vi(e,t){let n=Dl(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function _i(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)be(r,t.meterHelp);let o=Sn.get(e);o?o.set(t.meter):Sn.set(e,Bl(n,t.meter))}function Gi(e,t){(t.meter||Sn.has(e))&&_i(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Oi(i,r,t.title),be(i,t.foldHelp)),ta(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=r,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!r,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),be(l,t.foldHelp)}}function be(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function De(e){return e.replace(/["\\]/g,"\\$&")}function Vc(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);o?.type==="canvas"&&ii(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Re(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&na(n);Zl(e)}var _c=1e3,Gc=e=>e===!0?"log":typeof e=="string"?e:"linear";function aa(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Gc(e.log),r=rt(o,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let s=n.createElement("label");s.className="nc-label",s.setAttribute("for",e.id),s.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(r?0:e.min),l.max=String(r?_c:e.max),l.step=r?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",i.append(s,l,c,d);let p=e.value,u=()=>{let g=e.format(p);c.textContent=g,l.setAttribute("aria-valuetext",g)},m=g=>{p=g,n.activeElement!==l&&(l.value=String(r?et(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=r?zt(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),r&&l.addEventListener("keydown",g=>{let f=Un(o,e.min,e.max,p,g.key,g.shiftKey,e.step);f===null||l.disabled||(g.preventDefault(),l.value=String(et(o,e.min,e.max,f)),p=f,u(),e.onInput(p))}),l.disabled=e.disabled===!0,m(e.value),{el:i,set:m,setDisabled(g){l.disabled=g===!0}}}var Dt="data-nc-help";function Uc(e,t,n,o=0,r=6,i=8){let s=e.top-r-t.height,l=s>=o+i?"above":"below",c=l==="above"?s:e.bottom+r,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var nn=new WeakMap;function Wc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Yc({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=nn.get(e);if(n)return n;let o=e.defaultView,r=null,i=null,s,l=!1,c,d=()=>{clearTimeout(s),clearTimeout(c),i=null,l=!1,r&&(r.hidden=!0,delete r.dataset.pinned)},p=(f,w)=>{let h=w??f.getAttribute(Dt);if(!h)return!1;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=h,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let b=f.getBoundingClientRect(),y=Uc(b,{width:r.offsetWidth,height:r.offsetHeight},o.innerWidth,Wc(e));return r.style.top=`${y.top}px`,r.style.left=`${y.left}px`,r.dataset.side=y.side,r.style.visibility="",!0},u=f=>{if(l||f.pointerType==="touch")return;let w=f.target&&f.target.closest?f.target.closest(`[${Dt}]`):null;w!==i&&(d(),w&&(i=w,s=setTimeout(()=>{i===w&&w.isConnected&&p(w)},t)))},m=f=>{(l||f.key==="Escape")&&d()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",d,!0),e.addEventListener("keydown",m),o.addEventListener("scroll",d,!0),o.addEventListener("blur",d);let g={hide:d,pin(f,w,{ms:h=0}={}){return d(),!f||!f.isConnected||!p(f,w)?!1:(l=!0,r.dataset.pinned="",h>0&&(c=setTimeout(d,h)),!0)},uninstall(){d(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",d,!0),e.removeEventListener("keydown",m),o.removeEventListener("scroll",d,!0),o.removeEventListener("blur",d),r?.remove(),r=null,nn.delete(e)}};return nn.set(e,g),g}var Kc="(max-width: 768px)",Jc='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',Xc='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Qc=0;function Zc({panel:e,button:t,label:n="Menu",media:o=Kc}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Qc}`);let s=t??r.createElement("button");t||(s.type="button",s.innerHTML=Jc),s.classList.add("nc-page-menu-btn"),s.setAttribute("aria-label",n),s.setAttribute("aria-expanded","false"),s.setAttribute("aria-controls",e.id);let l=()=>e.hasAttribute("data-nc-open");function c(){l()||(e.setAttribute("data-nc-open",""),s.setAttribute("aria-expanded","true"),r.addEventListener("keydown",p,!0),r.addEventListener("pointerdown",u,!0),[...e.querySelectorAll(Xc)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!l())return;let b=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),s.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",p,!0),r.removeEventListener("pointerdown",u,!0),(h??b)&&s.focus?.({preventScroll:!0})}function p(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function u(h){let b=h.target;b instanceof i.Node&&(e.contains(b)||s.contains(b))||d({focus:!1})}let m=()=>l()?d({focus:!0}):c(),g=h=>{let b=h.target,y=b instanceof i.Element?b.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};s.addEventListener("click",m),e.addEventListener("click",g);let f=i.matchMedia?.(o),w=()=>{f?.matches||d({focus:!1})};return f?.addEventListener?.("change",w),{button:s,panel:e,open:c,close:d,isOpen:l,destroy(){d({focus:!1}),s.removeEventListener("click",m),e.removeEventListener("click",g),f?.removeEventListener?.("change",w)}}}var oa="netcomposer.rhythm.hidden.v1",de=new WeakMap;function an(){try{return globalThis.localStorage??null}catch{return null}}function Ui(e,t=oa){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Cn(e,t,n,o=oa){let r=Ui(e,o);n?r.add(t):r.delete(t);try{e?.setItem(o,JSON.stringify([...r]))}catch{}}function ia(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],o=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)o(i)};for(let r of t)o(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(Zn(r)),r.trim&&n.push(ea(r)));return n}function Wi(e,t){if(!(!e||!t))return ia(e).find(n=>n.id===t)}function ed(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ia(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function td(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(o,r),e.append(n),Yi(e,t)}function Yi(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function nd(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=de.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Wi(n,o)}function ad(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],r=ed(t);if(e.dataset.ncSignature===r){for(let i of o){let s=e.querySelector(`[data-nc-section="${fo(i.id)}"]`);s&&Yi(s,i);for(let l of i.controls){let c=e.querySelector(`[data-nc-id="${fo(l.id)}"]`);c instanceof Element&&te(c,l)}s instanceof HTMLElement&&Ln(s,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of o){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=i.id,i.inset&&(s.dataset.ncInset="true"),i.area&&(s.dataset.ncArea=i.area),i.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",i.label)),i.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),i.title&&s.setAttribute("aria-label",i.title)),td(s,i);let l=i.panel?document.createElement("div"):s;i.panel&&(l.className="nc-panel-body",s.append(l));for(let c of i.controls)l.append(Ee(c,nd));e.append(s),Ln(s,i,n)}}function Ki(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,r))}}var od="(max-width: 768px)",Ji=new WeakMap;function mo(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function id(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let r=mo("prev"),i=mo("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(r,s,i,l);let c=(d,p)=>{let u=Ji.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let m=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Ki(m,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,g),u.onPage?.(g),Ln(e,{...u,page:g},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>c(-1,r)),i.addEventListener("click",()=>c(1,i)),e.prepend(o),o}function Ln(e,t,n){Ji.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:s}=Ki(o.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,s),i<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of o)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(od).matches===!0,c=e.closest(".nc-module");o.forEach((h,b)=>{let y=Math.floor(b/r)!==s;if(y?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,y&&!l){let v=c instanceof HTMLElement?de.get(c):void 0;Rc(h,Wi(v,h.dataset.ncId))}});let d=id(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",s===0?"true":"false"),u.setAttribute("aria-disabled",s===i-1?"true":"false");let m=d.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${i}`;m.textContent!==g&&(m.textContent=g);let f=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${i}`;f.textContent!==w&&(f.textContent=w)}function fo(e){return e.replace(/["\\]/g,"\\$&")}function rd(e,t=oa){Zo();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=Ui(an(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=ei({labelledBy:i.id,onChange:y=>(de.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",r.append(i,p,s);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",m.append(g);let f=document.createElement("i");f.className="nc-token-probe",f.dataset.ncProbe="",n.append(f,r,u,m),n.setAttribute("aria-labelledby",i.id);let w=y=>{let v=de.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,m.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${v.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";Cn(an(),(de.get(n)??e).id,y,t),w(y),Tn(n.parentElement)}),m.addEventListener("click",()=>{Cn(an(),(de.get(n)??e).id,!1,t),w(!1),Tn(n.parentElement)});let h={pages:new Map,redraw:()=>b.redraw()},b={el:n,update(y){de.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),g.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,m.setAttribute("aria-label",`Show ${y.title}`),ad(u,y,h),w(u.hidden),b.redraw()},redraw(){let y=de.get(n);y&&Vc(n,ia(y))}};return de.set(n,e),w(o),b.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>b.redraw()).observe(n),Jo(()=>b.redraw(),n.ownerDocument),b}function sd(e,t,n="adjacent"){Zo(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let s=i%4+1;r.el.dataset.ncShade=String(s),r.el.dataset.ncPlace=o;let l=r.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(r.el),r.redraw()}),Tn(e)}function Tn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),o=t.map(i=>i.hasAttribute("data-nc-slim")?a("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}class ld{constructor(t,n,o=bs){this.sink=t,this.now=n,this.holdSec=o}seq=0;until=Number.NEGATIVE_INFINITY;stats={sent:0,offs:0};get sounding(){return this.now()<this.until}play(t){const n=this.sink();if(!n?.audition)return!1;const o=ws(t,this.seq++);return o.length?(n.audition(o,this.holdSec),this.stats.sent++,this.until=this.now()+this.holdSec+4,!0):!1}release(t="off"){this.sounding&&(this.until=Number.NEGATIVE_INFINITY,this.sink()?.off(t),this.stats.offs++)}}function cd(e,t,n,o={}){const r=()=>{const s=e.transport;t.start(s.beatAt(Math.max(s.startTime??n(),n())),!0),o.started?.()},i=e.onChange(s=>{const l=e.transport;s.kind==="start"&&typeof s.beat=="number"?(t.start(s.beat,!1),o.started?.()):s.kind==="stop"?(t.stop(),o.stopped?.()):s.kind==="snapshot"&&(!l.running&&t.playing?(t.stop(),o.stopped?.()):l.running&&!t.playing&&r())});return e.transport.running&&r(),i}const dd=.5,pd=20,ud=.2;class Te{constructor(t){this.state=t}next=()=>{this.state=this.state+1831565813>>>0;let t=this.state;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const H=1e-9;class hd{constructor(t){this.o=t,this.cur=this.latest=t.settings,this.ahead=t.aheadSec??dd,this.lead=t.leadSec??ud}gen=null;random=new Te(1);chordRandom=new Te(2);cur;latest;genTo=0;runStart=0;snaps=[];history=[];pending=[];ahead;lead;stats={sent:0,resends:0,runs:0};get playing(){return this.gen!==null}get settings(){return this.latest}get sentTo(){return this.genTo}get startBeat(){return this.runStart}get queued(){return this.pending}beatsPerBar(){return Math.max(1,this.o.transport().meter?.beatsPerBar??4)}make(){return new Bt(()=>this.cur,{random:this.random.next,chordRandom:this.chordRandom.next,beatsPerBar:()=>this.beatsPerBar()})}start(t,n=!1){const o=this.o.seed?.()??Math.floor(Math.random()*2147483648);this.random=new Te(o>>>0),this.chordRandom=new Te(o+1e3>>>0),this.cur=this.latest,this.pending=[],this.history=[],this.snaps=[],this.gen=this.make(),this.o.sink.restart(),this.gen.start(t,{join:n}),this.genTo=this.runStart=t,this.stats.runs++,this.pump()}stop(){this.gen&&(this.gen=null,this.pending=[],this.history=[],this.snaps=[],this.cur=this.latest,this.o.sink.off("stop"))}pump(){const t=this.o.transport();if(!this.gen||!t.running)return;const n=t.beatAt(this.o.now()+this.ahead);n>this.genTo+H&&this.advance(n,Number.NEGATIVE_INFINITY),this.prune(t.beatAt(this.o.now()))}changeBeat(){const t=this.o.transport();if(!this.gen||!t.running)return null;const n=Math.ceil(t.beatAt(this.o.now()+this.lead)-H);return Math.max(n,Math.ceil(this.runStart-H))}set(t,n={}){const o={...t};this.latest=o;const r=this.changeBeat();if(r===null)return this.gen||(this.cur=o),null;const i={beat:r,settings:o,...n.jump===void 0?{}:{jump:n.jump}};return this.pending=this.pending.filter(s=>s.beat<r-H),r>=this.genTo-H?(this.pending.push(i),r):(this.rewind(i),r)}rewind(t){const n=t.beat,o=this.genTo;let r=this.snaps.length-1;for(;r>0&&this.snaps[r].from>n+H;)r--;const i=this.snaps[r];if(!i||i.from>n+H){this.pending.push(t);return}this.random=new Te(i.random),this.chordRandom=new Te(i.chordRandom),this.cur=i.settings,this.gen=i.gen.clone({settings:()=>this.cur,random:this.random.next,chordRandom:this.chordRandom.next}),this.genTo=i.from,this.snaps=this.snaps.slice(0,r);const s=this.history.filter(l=>l.beat>i.from+H&&l.beat<n-H);this.history=this.history.filter(l=>l.beat<=i.from+H),this.pending=[...s,t,...this.pending.filter(l=>l.beat>n+H)],this.o.sink.off("restart",n),this.stats.resends++,this.advance(o,n)}advance(t,n){const o=[];for(;this.pending.length&&this.pending[0].beat<t-H;){const i=this.pending.shift();o.push(...this.play(i.beat)),this.cur=i.settings,this.gen.barFrom()<i.beat&&this.gen.catchUpBars(i.beat),i.jump!==void 0&&this.gen.jumpToChord(i.jump,i.beat),this.history.push(i)}o.push(...this.play(t));const r=o.filter(i=>i.startBeat>=n-H);r.length&&(this.stats.sent+=r.length,this.o.sink.send(r))}play(t){const n=this.gen;if(t<=this.genTo+H)return[];this.snaps.push({from:this.genTo,gen:n.clone({settings:()=>this.cur}),random:this.random.state,chordRandom:this.chordRandom.state,settings:this.cur});const o=n.window(t);return this.genTo=t,o}prune(t){for(;this.snaps.length>1&&this.snaps[1].from<=t-H;)this.snaps.shift();const n=this.snaps[0]?.from??this.genTo;this.history=this.history.filter(o=>o.beat>n+H)}chordPosition(t){return this.gen?.chordPosition(t)??null}}const md={"page:save":"Download CALLIOPE's settings, pads and targets as a file.","page:load":"Load a CALLIOPE file. What plays changes on the next beat.","page:panic":"Stop every note CALLIOPE is playing. It plays on from the next step.",mode:"Off rests. Single plays the Note. Chord plays the chord, pads and progression. Random picks notes in the Octave and up.",note:"The root note (and the key of a progression).",octave:"The octave the notes start from (C3 is middle C's octave below).","octave-range":"Random: how many octaves up from Octave it may pick.",chord:"The chord that plays when no pad holds and no progression runs.",browse:"Open the chord library: categories, search and favorites (stars).",category:"Which chords the list shows. Favorites are the starred ones.",search:"Find a chord by name or symbol in every category.",root:"Pad root: each pad plays its own root. Follow root: pads keep only the chord type and play on the Note.",pads:"Click a pad: its chord plays from the next beat and holds. A held pad pauses the Progression. Drag or Alt+arrows to reorder; ⋯ for more.","all-pads":"Show all sixteen pads.",progression:"A chord progression in the Note's key. A held pad pauses it; click a step to go back to it.","progression-off":"Turn the progression off: the Chord plays.","progression-step":"Play the progression from this chord, on the next bar line.",bars:"How long each chord of the progression lasts.",inversion:"Which chord tone is lowest.","voice-leading":"Smooth moves each chord to the nearest voicing. Fixed keeps the inversion.",style:"How the chord is played: held, walked, or in a groove. The arp plays instead when it is on.",strum:"Spread the chord's notes, down on the beat and up off it.",tension:"How often a colour tone joins the chord.",arp:"Play the chord one note at a time, in the Note order.",latch:"On: a pad click holds the pad. Off: a pad plays while you press it.","note-order":"The order the arp plays the chord's notes in.",octaves:"How many octaves the arp climbs.",spread:"How wide the chord is voiced.",rate:"The arp's step (the Grid) and the tempo.",hits:"Euclidean: notes spread as evenly as they fit in the Steps.",steps:"Euclidean: the length of the pattern.",rotate:"Euclidean: where the pattern starts.",pattern:"The Euclidean pattern: x plays, . rests.",grid:"How often a step plays: quarters, eighths, triplets…",gate:"How long each note lasts, as a share of its step.","now-playing":"What CALLIOPE plays now, and what comes next.",targets:"The instruments CALLIOPE plays, each as a chord, its root or its top note.","target-on":"Play this instrument from CALLIOPE. Off, it plays its own part again.",role:"Chord: every note. Root: the chord's root only. Top: the top note only.","target-octave":"Move what this instrument gets up or down by whole octaves.",inputs:"Situation's signals will drive CALLIOPE here (with Situation v1)."},Vt=e=>md[e]??"",fd="netcomposer.calliope.pads-hint.v1",Xi=8e3,gd="netcomposer.calliope.press-play-note.v1";function Qi(e,t){let n=!1;return{seen(){if(n)return!0;try{return t()?.getItem(e)==="1"}catch{return!1}},mark(){n=!0;try{t()?.setItem(e,"1")}catch{}}}}function bd(e){const t=Qi(fd,e.storage);return{seen:t.seen,show(n,o){return!o||t.seen()||!e.pin(n,o,{ms:Xi})?!1:(t.mark(),!0)},skip:()=>t.mark()}}const Zi="netcomposer.calliope",er=1,go="netcomposer.calliope.v1",wd=["chord","root","top"],kt=-3,tr=3,vd=["sus2","major-7","minor-7","dominant-7","7sus4","add9","major-9","minor-9","minor-11","dominant-13"],Q=(e,t)=>({chord:e,root:t,inversion:0});function xd(){const e=Vn();return[Q("major-7",0),Q("minor-7",9),Q("minor-9",2),Q("7sus4",7),Q("major-7",5),Q("minor-7",4),Q("minor-9",9),Q("dominant-13",7),Q("add9",0),Q("major-9",5),Q("minor-11",2),Q("sus2",4)].forEach((t,n)=>{e[n]=t}),e}function nr(){return{...us,mode:"chord",note:9,octave:3,chord:"minor-7",interval:8,gate:75,voiceLeading:"smooth",favoriteChords:[...vd],chordPads:xd(),chordPadMode:"pad"}}function In(){return{gen:nr(),chordCategory:"Favorites",held:null,latch:!0,lastArp:"up",targets:{}}}function ne(e){const t=e.held===null?null:e.gen.chordPads[e.held];return t?{...e.gen,...ls(t,e.gen.chordPadMode,e.gen.chordProgression)}:e.gen}const yd=e=>e.held===null?null:e.gen.chordPads[e.held]??null,ar=e=>e.gen.chordProgression!=="off"&&yd(e)!==null;function ra(e,t){return t<0||t>=Ze||!e.gen.chordPads[t]?e:{...e,held:t}}const $d=e=>({...e,held:null});function or(e){return{...e,held:null}}function N(e,t){const n={...e.gen,...t};let o=e.held;return o!==null&&!n.chordPads[o]&&(o=null),("chord"in t||"note"in t)&&!("chordPads"in t)&&(o=null),{...e,gen:n,held:o}}function on(e,t){const n=e.gen.chordProgression==="off",o=N(e,n&&t!=="off"?{chordProgression:t,voiceLeading:"smooth"}:{chordProgression:t});return t!=="off"?{...o,held:null}:o}function kd(e){return e.gen.arp!=="off"?{...N(e,{arp:"off"}),lastArp:e.gen.arp}:N(e,{arp:e.lastArp==="off"?"up":e.lastArp})}function Ke(e,t,n){const o=e.targets[t]??{on:!1,role:"chord",octave:0},r=ir({...o,...n});return{...e,targets:{...e.targets,[t]:r}}}const Et=(e,t,n,o)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):o,ce=(e,t,n,o)=>Math.round(Et(e,t,n,o)),me=(e,t,n)=>t.includes(e)?e:n;function ir(e){const t=e&&typeof e=="object"?e:{};return{on:t.on===!0,role:me(t.role,wd,"chord"),octave:ce(t.octave,kt,tr,0)}}function Ed(e){const t=nr(),n=e&&typeof e=="object"?e:{},o=ce(n.note,0,11,t.note),r=Array.isArray(n.favoriteChords)?[...new Set(n.favoriteChords.filter(l=>typeof l=="string").map(Ae))]:t.favoriteChords,i=typeof n.chord=="string"?Ae(n.chord):t.chord,s=Io(n.arp)??t.arp;return{mode:Vo(n.mode)?n.mode:t.mode,note:o,octave:ce(n.octave,0,7,t.octave),octaveRange:ce(n.octaveRange,1,3,t.octaveRange),chord:i,inversion:ce(n.inversion,0,G(i).intervals.length-1,0),interval:as(n.interval,t.interval),gate:Et(n.gate,10,100,t.gate),arp:s,arpOctaves:ce(n.arpOctaves,1,4,t.arpOctaves),arpSpread:me(n.arpSpread,["compact","wide","wider","maximum"],t.arpSpread),arpHits:ce(n.arpHits,1,16,t.arpHits),arpSteps:ce(n.arpSteps,1,16,t.arpSteps),arpRotate:ce(n.arpRotate,0,15,t.arpRotate),chordStyle:me(n.chordStyle,_r,t.chordStyle),voiceLeading:me(n.voiceLeading,["fixed","smooth"],t.voiceLeading),strum:Et(n.strum,0,40,0),tension:Et(n.tension,0,100,0),chordProgression:me(n.chordProgression,["off",...ns],"off"),progressionBars:me(n.progressionBars,jo,0),favoriteChords:r,chordPads:Array.isArray(n.chordPads)?os(n.chordPads,o):t.chordPads,chordPadMode:me(n.chordPadMode,["pad","follow"],"pad")}}function rr(e){const t=In(),n=e&&typeof e=="object"?e:{},o=Ed(n.gen),r=typeof n.held=="number"&&Number.isInteger(n.held)&&o.chordPads[n.held]?n.held:null,i={};if(n.targets&&typeof n.targets=="object")for(const[l,c]of Object.entries(n.targets))l&&l.length<=64&&(i[l]=ir(c));const s=Io(n.lastArp);return{gen:o,chordCategory:me(n.chordCategory,["Favorites",...Co],t.chordCategory),held:r,latch:n.latch!==!1,lastArp:s&&s!=="off"?s:t.lastArp,targets:i}}function sr(e){return{format:Zi,version:er,state:e}}function lr(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==Zi||typeof t.version!="number"||t.version>er?null:rr(t.state)}function Ad(e){return{...ne(e),chordPads:e.gen.chordPads,favoriteChords:e.gen.favoriteChords}}Ce.filter(e=>!e.legacy).map(e=>e.id);function cr(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let Ie;function Md(e,t=cr()){if(Ie!==void 0)return Ie;Ie=null;try{if(typeof window>"u"||window.parent===window)return Ie;const n=window.parent.ncStudio;n&&n.version===1&&(Ie=n.attach(e,{instance:t}))}catch{}return Ie}const bo={"olive-bass":"keeps its rhythm · takes the root",nyx:"keeps its hits · pads that follow take the root"},wo={"olive-bass":"not ready yet · takes the root once loaded",nyx:"not ready yet · takes the root once loaded"},Sd=["calliope"];function dr(e,t,n){const o=[],r=[],i=[];for(const s of e){if(s.instance===n||Sd.includes(s.type))continue;const l=s.n>1&&s.name.endsWith(` ${s.n}`)?s.name.slice(0,-` ${s.n}`.length):s.name,c={instance:s.instance,name:s.name,label:l,n:s.n},d=s.takesPitch??bo[s.type]!==void 0;s.takesNotes?o.push({...c,playable:!0,pitch:d,note:d?bo[s.type]??"takes the root":""}):wo[s.type]?r.push({...c,playable:!1,pitch:d,note:wo[s.type]}):i.includes(l)||i.push(l)}return{playable:o,coming:r,none:i}}const Je=e=>`${Se[(e%12+12)%12]}${Math.floor(e/12)-1}`;function nt(e,t){return`${Se[(e%12+12)%12]}${G(t).symbol}`}function pr(e,t){return nt(t.chordPadMode==="follow"?t.note:e.root,e.chord)}class Cd{marks=[];reset(t,n){this.marks=[{beat:Number.NEGATIVE_INFINITY,settings:t,pad:n}]}mark(t){this.marks=this.marks.filter(n=>n.beat<t.beat-1e-9),this.marks.push(t)}at(t){let n=this.marks[0];for(const o of this.marks)o.beat<=t+1e-9&&(n=o);return n}after(t){return this.marks.find(n=>n.beat>t+1e-9)??null}prune(t){for(;this.marks.length>1&&this.marks[1].beat<=t+1e-9;)this.marks.shift()}get size(){return this.marks.length}}function At(e,t){const n=e.settings,o=n.chordPads??[],r=e.pad===null?null:o[e.pad]??null;if(n.mode!=="chord")return{name:n.mode==="off"?"—":n.mode==="random"?"Random":Je((n.octave+1)*12+n.note),detail:n.mode==="off"?"Mode is Off":`${n.mode==="random"?"Random notes":"Single note"}`,voicing:"",pad:null,step:null};const i=pe(n.chordProgression,n.note,n.octave,n.progressionBars);if(i?.length&&!r){const d=Math.min(t?.index??0,i.length-1),p=i[d],u=je(p.root,p.chord,p.inversion??Math.min(n.inversion,p.intervals.length-1),n.arpSpread);return{name:p.name,detail:`${p.numeral} · from the progression`,voicing:u.map(Je).join(" "),pad:null,step:d}}const s=(n.octave+1)*12+n.note,l=G(n.chord),c=je(s,l.id,n.inversion,n.arpSpread).map(Je).join(" ");return r&&e.pad!==null?{name:nt(n.note,n.chord),detail:`Pad ${e.pad+1} · held`,voicing:c,pad:e.pad,step:null}:{name:nt(n.note,n.chord),detail:`${l.name} · ${l.category}`,voicing:c,pad:null,step:null}}function vo(e,t){const n=pe(e.chordProgression,e.note,e.octave,e.progressionBars);if(!n||n.length<2)return null;const o=(t+1)%n.length;return{name:n[o].name,bar:Math.floor(On(n,o))%Math.max(1,Rt(n))+1}}function ur(e,t=4){const n=Math.max(0,e);return{bar:Math.floor(n/t+1e-9)+1,beat:Math.floor(n%t+1e-9)+1}}const sa=cr(),la=String(sa).padStart(2,"0"),se=Md("calliope",sa),hr=se?.storageKey?.(go)??go,zn="netcomposer.calliope.hidden.v1",mr="netcomposer.calliope.ui.v1",Ld=`CALLIOPE ${sa}`,at="(max-width: 768px)";function ve(){try{return globalThis.localStorage??null}catch{return null}}function Td(){try{const e=ve()?.getItem(hr);return e?rr(JSON.parse(e)):In()}catch{return In()}}let rn=null;function Id(){rn===null&&(rn=window.setTimeout(()=>{rn=null;try{ve()?.setItem(hr,JSON.stringify(k))}catch{}},200))}const ee=(()=>{try{return{library:JSON.parse(ve()?.getItem(mr)??"null")?.library??!window.matchMedia(at).matches,allPads:!1,progression:!1}}catch{return{library:!window.matchMedia(at).matches,allPads:!1,progression:!1}}})();function zd(){try{ve()?.setItem(mr,JSON.stringify({library:ee.library}))}catch{}}let k=Td();const Fn=se?.clock??null,le=se?.notesSource?.(Ld)??null,Fd={running:!1,startTime:null,beatAt:()=>0,timeAt:()=>0},lt=()=>Fn?.transport??Fd;let fe=[];const ca=new ld(()=>le,()=>performance.now()/1e3),da=$("p",{class:"cal-play-note","data-cal":"press-play",role:"status",hidden:""},"Press Play to run it in time."),xo=Qi(gd,ve),U=new hd({transport:lt,now:Qe,settings:ne(k),sink:{send(e){for(const t of e)fe.push({start:t.startBeat,end:t.startBeat+t.lengthBeats});le?.send(e)},off(e,t){fe=t===void 0?[]:fe.filter(n=>n.start<t),le?.off(e,t)},restart(){fe=[],ca.release(),da.hidden=!0,le?.restart()}}}),ae=new Cd;ae.reset(ne(k),k.held);let pa=0;const yo=e=>JSON.stringify({...e,favoriteChords:0,chordPads:0});function L(e,t={}){const n=ne(k);k=e,Id();const o=ne(k);if(yo(n)!==yo(o)||t.jump!==void 0){const r=U.set(o,t);r===null?(ae.reset(o,k.held),t.jump!==void 0&&(pa=t.jump)):ae.mark({beat:r,settings:o,pad:k.held,...t})}ua(),K()}let ot=[];function fr(){try{ot=se?.notesTargets?.()??[]}catch{ot=[]}}const Nn=new Map;function ua(){if(le)for(const e of ot){if(!e.takesNotes)continue;const t=k.targets[e.instance],o={role:dr([e],{},"").playable[0]?.pitch===!0?"root":t?.role??"chord",on:t?.on===!0,transpose:(t?.octave??0)*12},r=JSON.stringify(o);Nn.get(e.instance)!==r&&(Nn.set(e.instance,r),le.setTarget(e.instance,o))}}function $(e,t={},...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t))i!==void 0&&o.setAttribute(r,i);for(const r of n)r!==null&&r!==!1&&o.append(r);return o}const X=e=>({[Dt]:Vt(e)||void 0});function R(e,t,n){const o=$("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function V(e,t,n){return $(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?X(t):{}},e)}function _t(e,t,n,o,r,i=!1){const s=$("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-cal-id":e});for(const l of n){const c=R(l.label,{role:"radio","aria-checked":String(l.value===o),"data-value":l.value,"data-cal-id":`${e}-${l.value}`},()=>{l.value!==o&&r(l.value)});c.disabled=i||l.disabled===!0,s.append(c)}return s}function j(e,t,n,o,r,i,s=!1){const l=$("select",{class:"nc-select",id:`cal-${e}`,"data-cal-id":e});let c=null;for(const d of o){const p=$("option",{value:d.value},d.label);d.group&&c?.label!==d.group?(c=$("optgroup",{label:d.group}),l.append(c)):d.group||(c=null),(c??l).append(p)}return l.value=r,l.disabled=s,l.addEventListener("change",()=>i(l.value)),$("div",{class:"cal-field"},V(t,n,`cal-${e}`),l)}const Nd=e=>e>0?`+${e}`:e<0?`−${-e}`:"0",gr=e=>e===0?"Root":`${e}${["st","nd","rd"][e-1]??"th"}`;function we(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.calId:void 0;e.replaceChildren(...t.filter(r=>!!r)),o&&e.querySelector(`[data-cal-id="${CSS.escape(o)}"]`)?.focus()}const br=document.getElementById("app");br.classList.add("nc","nc-page");const wr=Yc();function Pd(){const e=new Blob([JSON.stringify(sr(k),null,2)],{type:"application/json"}),t=$("a",{href:URL.createObjectURL(e),download:`calliope-${la}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const qe=$("input",{type:"file",accept:".json,application/json"});qe.hidden=!0;let qt="";qe.addEventListener("change",async()=>{const e=qe.files?.[0];if(qe.value="",!(!e||e.size>256*1024)){try{const t=lr(JSON.parse(await e.text()));if(!t)throw new Error("not a CALLIOPE file");L(t),qt=`Loaded ${e.name}.`}catch(t){qt=`Couldn't load ${e.name}: ${t.message}.`}K()}});function Dd(){U.stop();const e=lt();e.running&&U.start(e.beatAt(Math.max(e.startTime??Qe(),Qe())),!0),ae.reset(ne(k),k.held)}const Pn=(e,t)=>R(e,{class:"nc-page-action","data-cal-action":e.toLowerCase(),...X(`page:${e.toLowerCase()}`)},t),$o=Zc({panel:$("div",{},Pn("Save",Pd),Pn("Load",()=>qe.click()))}),qd=$("header",{class:"nc-page-hd"},$("div",{},$("h1",{class:"nc-page-title"},$("span",{class:"cal-brand"},"CALLIOPE")," ",$("span",{class:"nc-page-sep"},"/")," GENERATOR ",$("span",{class:"nc-page-sep"},"/")," ",$("span",{class:"nc-mono"},la)),$("p",{class:"nc-page-sub"},"A NetComposer element.")),$("div",{class:"nc-page-actions"},$o.panel,Pn("Panic",Dd),$o.button,qe)),vr=$("div",{class:"nc-stack cal-stack","data-nc-layout":"adjacent"}),xr=$("footer",{class:"cal-foot"},$("span",{},"double-click any slider to reset"),$("span",{},`netcomposer.generator.${la}`));br.append(qd,$("main",{class:"nc-page-body"},vr),xr);window.matchMedia(at).matches&&!ve()?.getItem(zn)&&Cn(ve(),"rhythm",!0,zn);function ct(e,t,n){const o=$("div",{class:"cal-body","data-cal-module":e}),r=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=rd(r(),zn),s=()=>{const l=i.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return s(),{handle:i,mount:o,update(){i.update(r()),s()}}}function yr(){const e=lt();return U.playing&&e.running?e.beatAt(Qe()):null}function it(){return Math.max(1,lt().meter?.beatsPerBar??4)}function ha(){const e=yr();if(e===null){const s={settings:ne(k),pad:k.held},l=pe(k.gen.chordProgression,k.gen.note,k.gen.octave,k.gen.progressionBars),c=At(s,{index:Math.min(pa,(l?.length??1)-1)}),d=k.held===null&&c.step!==null?vo(s.settings,c.step):null;return{playing:!1,beat:0,now:c,activePad:k.held,queuedPad:null,queuedBeat:null,next:d?{name:d.name,detail:"",when:`bar ${d.bar}`}:null,step:c.step}}const t=ae.at(e),n=t.pad===null?U.chordPosition(e):null,o=At(t,n),r=ae.after(e);let i=null;if(r){const s=At(r,r.jump!==void 0?{index:r.jump}:U.chordPosition(r.beat)),l=ur(r.beat,it()),c=r.beat-e<=1+1e-6;i={name:s.name,detail:s.pad!==null?`Pad ${s.pad+1}`:s.step!==null?"progression":"",when:`on ${l.beat===1?`bar ${l.bar}`:`beat ${l.beat}`}${c?" (next beat)":""}`}}else if(o.step!==null&&n){const s=vo(t.settings,o.step);s&&(i={name:s.name,detail:"",when:`on bar ${s.bar}`})}return{playing:!0,beat:e,now:o,activePad:t.pad,queuedPad:r?.pad??null,queuedBeat:r?.beat??null,next:i,step:o.step}}function $r(e){const t=$("div",{class:"cal-now","data-cal-now":e,role:"status"}),n=$("div",{class:"cal-now-hd"},V("Now playing","now-playing"),$("span",{class:"cal-mono cal-sub","data-cal":"pos"})),o=$("div",{class:"cal-now-name","data-cal":"name"}),r=$("span",{class:"cal-mono cal-sub","data-cal":"detail"}),i=$("div",{class:"cal-mono cal-sub cal-small","data-cal":"voicing"}),s=$("span",{class:"cal-meter","aria-hidden":"true"});for(let p=0;p<4;p++)s.append($("i",{}));const l=$("div",{class:"cal-next"},V("Next"),$("span",{class:"cal-next-name","data-cal":"next"}),s),c=$("div",{class:"cal-mono cal-sub cal-small","data-cal":"when"});t.append(n,$("div",{class:"cal-now-row"},o,r),i,l,c);let d="";return{el:t,tick(p){const u=ur(p.beat,it()),m=JSON.stringify([p.playing,u,p.now,p.next]);m!==d&&(d=m,n.lastChild.textContent=p.playing?`bar ${u.bar} · beat ${u.beat}`:"stopped",o.textContent=p.now.name,r.textContent=p.now.detail,i.textContent=p.now.voicing,l.children[1].textContent=p.next?`${p.next.name}${p.next.detail?` · ${p.next.detail}`:""}`:"—",c.textContent=p.next?.when??"",[...s.children].forEach((g,f)=>g.toggleAttribute("data-on",p.playing&&f<u.beat)),s.style.setProperty("--cal-beats",String(it())))}}}const kr=$r("targets"),Er=$r("pads"),Ar=ct("mode","Mode",()=>`${k.gen.mode} · ${Se[k.gen.note]}${k.gen.octave}`),Oe=ct("chord","Chord",()=>At({settings:k.gen,pad:null},null).name);Oe.handle.el.dataset.ncPlace="stack";Oe.handle.el.dataset.ncShade="1";function jd(){const e=k.gen,t=[$("div",{class:"cal-field"},V("Mode","mode"),_t("mode","Mode",[{value:"off",label:"Off"},{value:"single",label:"Single"},{value:"chord",label:"Chord"},{value:"random",label:"Random"}],e.mode,n=>L(N(k,{mode:n})))),$("div",{class:"cal-grid2"},j("note","Note","note",Se.map((n,o)=>({value:String(o),label:n})),String(e.note),n=>L(N(k,{note:Number(n)}))),j("octave","Octave","octave",[1,2,3,4,5,6].map(n=>({value:String(n),label:String(n)})),String(e.octave),n=>L(N(k,{octave:Number(n)}))))];e.mode==="random"&&t.push(j("octave-range","Octave range","octave-range",[1,2,3].map(n=>({value:String(n),label:`${n} oct`})),String(e.octaveRange),n=>L(N(k,{octaveRange:Number(n)})))),we(Ar.mount,...t,Oe.handle.el)}let Ue="";const Xe=$("input",{type:"search",class:"cal-input",id:"cal-search",placeholder:"all categories","data-cal-id":"search"});Xe.addEventListener("input",()=>{Ue=Xe.value,ma()});function ma(){const e=k.gen,t=G(e.chord),n=e.favoriteChords,o=je((e.octave+1)*12+e.note,t.id,e.inversion,e.arpSpread).map(Je).join(" "),r=$("div",{class:"cal-row-between"},V("Chord","chord"),R(ee.library?"Close library":"Browse chords",{class:"nc-page-action cal-ghost","aria-expanded":String(ee.library),"data-cal-id":"browse",...X("browse")},()=>{ee.library=!ee.library,zd(),ma()})),i=$("div",{},$("div",{class:"cal-chord-name","data-cal":"chord-name"},nt(e.note,e.chord)),$("div",{class:"cal-sub cal-small"},`${t.name} · ${t.category}`),$("div",{class:"cal-mono cal-sub cal-small cal-voicing"},o));let s=null;if(ee.library){const l=Ue.trim().toLowerCase(),c=l?Ne.filter(p=>p.name.toLowerCase().includes(l)||p.symbol.trim().toLowerCase().includes(l)||p.id.includes(l)):k.chordCategory==="Favorites"?Ne.filter(p=>n.includes(p.id)):Ne.filter(p=>p.category===k.chordCategory),d=$("ul",{class:"cal-library","aria-label":"Chord library"});for(const p of c){const u=p.id===e.chord,m=n.includes(p.id),g=R("",{class:"cal-lib-pick","aria-current":String(u),"data-cal-id":`chord-${p.id}`},()=>L(N(k,{chord:p.id,inversion:Math.min(e.inversion,p.intervals.length-1)})));g.append($("span",{class:"cal-ellipsis"},p.name),$("span",{class:"cal-mono cal-sub cal-small"},`${l?`${p.category} · `:""}${p.intervals.length}n`));const f=R(m?"★":"☆",{class:"cal-star","aria-pressed":String(m),"aria-label":`${m?"Unfavorite":"Favorite"} ${p.name}`,"data-cal-id":`star-${p.id}`},()=>L(N(k,m?{favoriteChords:n.filter(w=>w!==p.id)}:{favoriteChords:[...n,p.id],chordPads:rs(e.chordPads,p.id,e.note)})));d.append($("li",{class:"cal-lib-row","data-on":String(u)},g,f))}c.length||d.append($("li",{class:"cal-sub cal-small"},l?`No chord named “${Ue.trim()}”.`:"No favorites yet. Star chords to collect them here.")),Xe.value!==Ue&&(Xe.value=Ue),s=$("div",{class:"cal-browser",id:"cal-browser"},$("div",{class:"cal-grid2"},j("category","Category","category",[{value:"Favorites",label:`Favorites (${n.length})`},...Co.map(p=>({value:p,label:p}))],k.chordCategory,p=>L({...k,chordCategory:p})),$("div",{class:"cal-field"},V("Search","search","cal-search"),Xe)),$("div",{class:"cal-mono cal-sub cal-small","aria-live":"polite"},l?`${c.length} match${c.length===1?"":"es"} across all categories`:`${c.length} in ${k.chordCategory}`),d)}we(Oe.mount,r,i,s)}const Gt=ct("pads","Chord pads",()=>`${k.gen.chordPads.filter(Boolean).length} pads${k.held!==null?` · Pad ${k.held+1} held`:""}`),Rd=$("span",{id:"cal-pads-help",class:"cal-sr"},Vt("pads")),Z=$("div",{class:"cal-pads",role:"group","aria-label":"Chord pads","aria-describedby":"cal-pads-help"}),gt=bd({storage:ve,pin:(e,t,n)=>wr.pin(e,t,n)});function Bd(){if(document.visibilityState==="hidden")return!1;try{const e=window.frameElement;return e?getComputedStyle(e).visibility!=="hidden"&&e.getClientRects().length>0:!0}catch{return!0}}function Od(){if(gt.seen()||typeof IntersectionObserver>"u")return;let e=!1,t=0;const n=()=>{r.disconnect(),clearInterval(t)},o=()=>{if(gt.seen())return n();if(!(!e||!Bd())&&gt.show(Z,Vt("pads"))){n();try{const s=window.parent!==window?window.parent.document:null;if(!s)return;const l=()=>{s.removeEventListener("pointerdown",c,!0),s.removeEventListener("keydown",c,!0)},c=()=>{wr.hide(),l()};s.addEventListener("pointerdown",c,!0),s.addEventListener("keydown",c,!0),setTimeout(l,Xi)}catch{}}},r=new IntersectionObserver(s=>{e=s.some(l=>l.isIntersecting&&l.intersectionRatio>0),o()},{threshold:[0,.25]});r.observe(Z);const i=()=>{gt.skip(),n(),Z.removeEventListener("pointerdown",i,!0),Z.removeEventListener("keydown",i,!0)};Z.addEventListener("pointerdown",i,!0),Z.addEventListener("keydown",i,!0),t=window.setInterval(o,400),document.addEventListener("visibilitychange",o)}let Y=null,ze=null,bt=!1;function Hd(e,t){const n=document.elementFromPoint(e,t)?.closest("[data-pad-index]"),o=n?Number(n.getAttribute("data-pad-index")):Number.NaN;return Number.isInteger(o)?o:null}function Vd(e){if(!k.gen.chordPads[e]){Y=Y===e?null:e,K();return}k.held===e&&ae.after(yr()??Number.POSITIVE_INFINITY)===null&&U.playing||(L(ra(k,e)),U.playing||Mr())}function Mr(){ca.play(ne(k))&&(xo.seen()||(xo.mark(),da.hidden=!1))}function ko(e,t){if(e===t)return;const n=r=>r===null?r:r===e?t:e<t&&r>e&&r<=t?r-1:e>t&&r>=t&&r<e?r+1:r;Y=n(Y);const o=n(k.held);k={...k,held:o},L({...N(k,{chordPads:is(k.gen.chordPads,e,t)}),held:o})}function _d(e){const t=k.gen,n=window.matchMedia(at).matches,o=t.chordPads.filter(Boolean).length,r=!n||ee.allPads||[e.activePad,e.queuedPad,Y].some(l=>l!==null&&l>=8),i=[];t.chordPads.slice(0,r?Ze:8).forEach((l,c)=>{const d=l?pr(l,t):"",p=!!l&&!t.favoriteChords.includes(l.chord),u=R("",{class:"cal-pad","data-pad-index":String(c),"data-cal-id":`pad-${c}`,"data-filled":l?"":void 0,"aria-label":l?`Pad ${c+1}: ${d}`:`Pad ${c+1}: empty, choose a chord`},()=>{if(bt){bt=!1;return}(k.latch||!l)&&Vd(c)});u.append($("span",{class:"cal-pad-name"},l?d:"+"),$("span",{class:"cal-pad-meta"},l?ds(l)||" ":"empty"),$("span",{class:"cal-pad-meta"},p?"not ★":" ")),u.addEventListener("pointerdown",f=>{if(f.button!==0)return;const w=f.pointerType!=="mouse";ze={i:c,id:f.pointerId,x:f.clientX,y:f.clientY,dragging:!1,over:c,timer:null,held:!1,touch:w};const h=ze;h.timer=window.setTimeout(()=>{h.held=!0,h.timer=null},450),w||u.setPointerCapture?.(f.pointerId),!k.latch&&l&&(L(ra(k,c)),U.playing||Mr())}),u.addEventListener("pointermove",f=>{const w=ze;if(!w||w.id!==f.pointerId)return;const h=Math.hypot(f.clientX-w.x,f.clientY-w.y)>8;if(!w.dragging){if(!h||!t.chordPads[w.i])return;if(w.touch&&!w.held){w.timer&&clearTimeout(w.timer),ze=null;return}w.dragging=!0}w.over=Hd(f.clientX,f.clientY)??w.over;for(const b of Z.querySelectorAll("[data-drop]"))b.removeAttribute("data-drop");w.over!==w.i&&Z.querySelector(`[data-pad-index="${w.over}"]`)?.setAttribute("data-drop",w.over>w.i?"after":"before")});const m=f=>{const w=ze;!w||w.id!==f.pointerId||(ze=null,w.timer&&clearTimeout(w.timer),!k.latch&&l&&k.held===c&&(L($d(k)),ca.release()),w.dragging?(bt=!0,ko(w.i,w.over)):w.held&&w.touch&&(bt=!0,Y=c,K()))};u.addEventListener("pointerup",m),u.addEventListener("pointercancel",m),u.addEventListener("contextmenu",f=>{f.preventDefault(),Y=c,K()}),u.addEventListener("keydown",f=>{if(!f.altKey)return;const w={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4}[f.key];if(!w)return;f.preventDefault();const h=Math.max(0,Math.min(Ze-1,c+w));ko(c,h),Z.querySelector(`[data-pad-index="${h}"]`)?.focus()});const g=R("⋯",{class:"cal-pad-more","aria-label":`Pad ${c+1} menu`,"aria-expanded":String(Y===c),"data-cal-id":`pad-menu-${c}`},()=>{Y=Y===c?null:c,K()});i.push($("div",{class:"cal-pad-wrap"},u,g))}),we(Z,...i),Sr(e);const s=[Er.el,$("div",{class:"cal-field"},V("Root","root"),_t("pad-mode","Root",[{value:"pad",label:"Pad root"},{value:"follow",label:"Follow root"}],t.chordPadMode,l=>L(N(k,{chordPadMode:l})))),Z,da,Rd];n&&s.push(R(r?"Fewer pads":`All 16 pads · ${o} filled`,{class:"nc-page-action cal-ghost cal-left","aria-expanded":String(r),"data-cal-id":"all-pads",...X("all-pads")},()=>{ee.allPads=!r,K()})),Y!==null&&s.push(Gd(Y)),s.push(Wd(e,n)),s.push($("div",{class:"cal-grid2"},j("inversion","Inversion","inversion",Array.from({length:G(t.chord).intervals.length},(l,c)=>({value:String(c),label:gr(c)})),String(t.inversion),l=>L(N(k,{inversion:Number(l)}))),j("voice-leading","Voice leading","voice-leading",[{value:"smooth",label:"Smooth"},{value:"fixed",label:"Fixed"}],t.voiceLeading,l=>L(N(k,{voiceLeading:l}))))),we(Gt.mount,...s)}function Gd(e){const t=k.gen,n=t.chordPads[e]??null,o=i=>{const s=ss(t.chordPads,e,i);L({...N(k,{chordPads:s}),held:i||k.held!==e?k.held:null})},r=[{value:"",label:"Empty"},...n&&!t.favoriteChords.includes(n.chord)?[{value:n.chord,label:`${G(n.chord).name} (not starred)`}]:[],...t.favoriteChords.map(i=>({value:i,label:G(i).name})),...!n||t.favoriteChords.includes(t.chord)||n.chord===t.chord?[]:[{value:t.chord,label:`${G(t.chord).name} (the Chord)`}]];return $("div",{class:"cal-browser cal-pad-panel",role:"group","aria-label":`Pad ${e+1}`},$("div",{class:"cal-row-between"},V(`Pad ${e+1}${n?` · ${pr(n,t)}`:""}`),R("Done",{class:"nc-page-action cal-ghost","data-cal-id":"pad-done"},()=>{Y=null,K()})),$("div",{class:"cal-grid2"},j("pad-chord","Chord","pads",n?r:[{value:"",label:"Empty"},{value:`cur:${t.chord}`,label:`${nt(t.note,t.chord)} (the Chord)`},...t.favoriteChords.map(i=>({value:i,label:G(i).name}))],n?.chord??"",i=>{if(!i)return o(null);if(i.startsWith("cur:"))return o({chord:t.chord,root:t.note,inversion:t.inversion});o({chord:i,root:n?.root??t.note,inversion:i===n?.chord?n.inversion:0})}),t.chordPadMode==="pad"?j("pad-root","Root","root",Se.map((i,s)=>({value:String(s),label:i})),String(n?.root??t.note),i=>n&&o({...n,root:Number(i)}),!n):null,j("pad-inversion","Inversion","inversion",Array.from({length:n?G(n.chord).intervals.length:1},(i,s)=>({value:String(s),label:gr(s)})),String(n?.inversion??0),i=>n&&o({...n,inversion:Number(i)}),!n)),R("Clear pad",{class:"nc-page-action cal-ghost cal-left","data-cal-id":"pad-clear"},()=>{o(null),Y=null,K()}))}const wt=Do.flatMap(e=>jt.filter(t=>t.group===e).map(t=>t.id));function Ud(e,t){const n=wt.length,o=wt.indexOf(e);return o<0?wt[t>0?0:n-1]:wt[((o+t)%n+n)%n]}function Wd(e,t){const n=k.gen,o=qo(n.chordProgression),r=pe(n.chordProgression,n.note,n.octave,n.progressionBars),i=ar(k),s=$("div",{class:"cal-prog","data-paused":i?"":void 0}),l=t&&!ee.progression,c=$("div",{class:"cal-row-between"},t?R("",{class:"cal-fold","aria-expanded":String(!l),"data-cal-id":"prog-fold",...X("progression")},()=>{ee.progression=!ee.progression,K()}):V("Progression","progression","cal-progression"),t&&l?$("span",{class:"cal-mono cal-sub cal-small"},o?`${o.short}${i?" · paused":""}`:"off"):R("Off",{class:"nc-page-action cal-ghost","data-cal-id":"prog-off",...X("progression-off")},()=>L(on(k,"off"))));if(t&&c.firstChild.append(V("Progression")),t||(c.lastChild.disabled=!o),s.append(c),l)return s;const d=$("select",{class:"nc-select cal-prog-select",id:"cal-progression","data-cal-id":"progression","aria-label":"Progression"});d.append($("option",{value:"off"},"Off · single chord"));for(const m of Do){const g=$("optgroup",{label:m});for(const f of jt.filter(w=>w.group===m))g.append($("option",{value:f.id},`${f.name}   ${Ma(f.level)}`));d.append(g)}d.value=o?o.id:"off",d.addEventListener("change",()=>L(on(k,d.value)));const p=$("div",{class:"cal-prog-pick"},$("div",{class:"nc-select cal-prog-face","data-on":o?"":void 0,"aria-hidden":"true"},$("span",{class:"cal-ellipsis"},o?`${o.short} · ${o.name}`:"Off · single chord"),o?$("span",{class:"cal-mono cal-sub cal-small"},Ma(o.level)):null),d),u=[-1,1].map(m=>R(m<0?"◀":"▶",{class:"cal-step-btn","aria-label":m<0?"Previous progression":"Next progression","data-cal-id":`prog-${m}`},()=>L(on(k,Ud(n.chordProgression,m)))));if(s.append($("div",{class:"cal-row"},p,...u)),r&&o){const m=$("div",{class:"cal-strip","aria-label":"Progression chords","data-cal":"strip"});for(const h of r){const b=R("",{class:"cal-step","data-step":String(h.index),"data-cal-id":`step-${h.index}`,"aria-label":`Play from ${h.name}, ${h.numeral}`,...X("progression-step")},()=>L(or(k),{jump:h.index}));b.append($("span",{class:"cal-pad-name"},h.name),$("span",{class:"cal-pad-meta"},h.numeral),$("span",{class:"cal-pad-meta"},Sa(h.bars))),m.append(b)}const g=Rt(r),f=e.step??Math.min(pa,r.length-1),w=e.playing&&!i&&e.step!==null?Math.floor((e.beat-U.startBeat)/it()%g)+1:Math.floor(On(r,f))+1;s.append(m,$("div",{class:"cal-row-between cal-mono cal-small"},$("span",{class:"cal-sub"},`in ${Se[n.note]} · ${n.progressionBars>0?`${Sa(n.progressionBars)} per chord`:"as written"} · loops`),$("span",{"data-cal":"bar"},`bar ${w} of ${g}`)),$("div",{class:"cal-field"},V("Bars per chord","bars"),_t("bars","Bars per chord",jo.map(h=>({value:String(h),label:h===0?"as written":Ro(h)})),String(n.progressionBars),h=>L(N(k,{progressionBars:Number(h)}))))),i&&s.append($("p",{class:"cal-mono cal-sub cal-small","data-cal":"paused"},`paused while Pad ${(k.held??0)+1} holds · click a step to go back`))}return s}function Sr(e){for(const n of Z.querySelectorAll("[data-pad-index]")){const o=Number(n.dataset.padIndex),r=e.activePad===o,i=e.queuedPad===o&&!r;n.hasAttribute("data-active")!==r&&n.toggleAttribute("data-active",r),n.hasAttribute("data-queued")!==i&&n.toggleAttribute("data-queued",i),n.setAttribute("aria-current",String(r))}const t=ar(k)&&e.activePad!==null;for(const n of Gt.mount.querySelectorAll("[data-step]")){const o=!t&&e.step===Number(n.dataset.step);n.setAttribute("aria-current",String(o))}}const Cr=ct("rhythm","Rhythm",()=>{const e=k.gen,t=$e.find(o=>o.id===e.chordStyle)?.label??e.chordStyle,n=e.arp==="off"?"arp off":`arp ${Ce.find(o=>o.id===e.arp)?.name??e.arp}${e.arp==="euclidean"?` ${e.arpHits}/${e.arpSteps}`:""}`;return`${t} · ${n} · grid ${Oo(e.interval)} · gate ${Math.round(e.gate)}%`}),fa=aa({id:"strum",label:"Strum",min:0,max:zo,step:1,value:k.gen.strum,taper:"time",format:e=>e>0?`${Math.round(e)} ms ↓↑`:"off",onInput:e=>L(N(k,{strum:e}))}),ga=aa({id:"tension",label:"Tension",min:0,max:100,step:1,value:k.gen.tension,format:e=>`${Math.round(e)}%`,onInput:e=>L(N(k,{tension:e}))}),ba=aa({id:"gate",label:"Gate",min:10,max:100,step:1,value:k.gen.gate,format:e=>`${Math.round(e)}%`,onInput:e=>L(N(k,{gate:e}))});for(const[e,t,n]of[[fa,"strum",0],[ga,"tension",0],[ba,"gate",75]])e.el.setAttribute(Dt,Vt(t)),e.el.addEventListener("dblclick",()=>{e.set(n),L(N(k,{[t]:n}))});const Lr=$("div",{class:"cal-col"}),Tr=$("div",{class:"cal-col"}),Ir=$("div",{class:"cal-col"});Cr.mount.append(Lr,$("div",{class:"cal-grid2"},fa.el,ga.el),$("hr",{class:"cal-rule"}),Tr,$("hr",{class:"cal-rule"}),Ir,ba.el);const Yd=()=>{let e=7;return()=>(e=e*48271%2147483647,e/2147483647)};function Kd(){const e=ne(k),n=pe(e.chordProgression,e.note,e.octave,e.progressionBars)?.[0],o=G(e.chord),r=n?Mt(n.root,n.intervals,n.inversion??Math.min(e.inversion,n.intervals.length-1),e.arpSpread):je((e.octave+1)*12+e.note,o.id,e.inversion,e.arpSpread),i=Kr(e.chordStyle,r,n?.rootPc??e.note,n?.intervals??o.intervals,e.interval,e.gate,Yd()),s="http://www.w3.org/2000/svg",l=470,c=30,d=14,p=128,u=4,m=document.createElementNS(s,"svg");m.setAttribute("class","cal-roll"),m.setAttribute("viewBox",`0 0 ${l} ${p}`),m.setAttribute("role","img"),m.setAttribute("aria-label",`One bar: ${i.length} hit${i.length===1?"":"s"}`);const g=(A,S,M)=>{const I=document.createElementNS(s,A);for(const[P,oe]of Object.entries(S))I.setAttribute(P,String(oe));M&&(I.textContent=M),m.append(I)},f=[...new Set(i.flatMap(A=>A.notes))].sort((A,S)=>A-S),w=Math.max(f.length,8),h=(p-d)/w,b=u*4,y=(l-c)/b,v=A=>p-d-(f.indexOf(A)+1)*h;for(const A of f)A%12===0&&g("rect",{class:"cal-roll-c",x:c,y:v(A),width:l-c,height:h});for(let A=0;A<=b;A++)g("line",{class:A%4===0?"cal-roll-beat":"cal-roll-line",x1:c+A*y,x2:c+A*y,y1:0,y2:p-d});const E=f.filter(A=>A%12===0);!E.length&&f.length&&E.push(f[0]);for(const A of E)g("text",{class:"cal-roll-label",x:0,y:v(A)+h*.8},Je(A));for(let A=0;A<u;A++)g("text",{class:"cal-roll-label",x:c+A*4*y+2,y:p-2},String(A+1));for(const A of i)for(const S of A.notes)g("rect",{class:"cal-roll-note",x:c+A.step*y+1,y:v(S)+1.5,width:Math.max(3,A.len*y-2),height:Math.max(1,h-3),rx:1.5,"fill-opacity":.25+.75*A.velocity});return m}function Jd(e,t){const n=$e.findIndex(r=>r.id===e),o=$e.length;return $e[((n<0?0:n+t)%o+o)%o].id}function Xd(){const e=k.gen;we(Lr,$("div",{class:"cal-row cal-end"},$("div",{class:"cal-grow"},j("style","Style","style",$e.map(i=>({value:i.id,label:i.label})),e.chordStyle,i=>L(N(k,{chordStyle:i})))),...[-1,1].map(i=>R(i<0?"◀":"▶",{class:"cal-step-btn","aria-label":i<0?"Previous style":"Next style","data-cal-id":`style-${i}`},()=>L(N(k,{chordStyle:Jd(e.chordStyle,i)}))))),$("div",{class:"cal-roll-box","data-arp":e.arp!=="off"?"":void 0},Kd())),fa.set(e.strum),ga.set(e.tension),ba.set(e.gate);const t=e.arp!=="off",n=Rn(e),o=t?new Set(je((e.octave+1)*12+e.note,e.chord,e.inversion,e.arpSpread).flatMap(i=>Array.from({length:e.arpOctaves},(s,l)=>i+12*l)).filter(i=>i<=127)).size:0,r=(i,s=1)=>Array.from({length:i},(l,c)=>({value:String(c+s),label:String(c+s)}));we(Tr,$("div",{class:"cal-row-between"},V("Arp","arp"),$("span",{class:"cal-row"},R("arp",{class:"cal-toggle","aria-pressed":String(t),"data-cal-id":"arp",...X("arp")},()=>L(kd(k))),R("latch",{class:"cal-toggle","aria-pressed":String(k.latch),"data-cal-id":"latch",...X("latch")},()=>L({...k,latch:!k.latch,held:(k.latch,k.held)})))),$("div",{class:"cal-grid2"},j("note-order","Note order","note-order",Ce.filter(i=>i.id!=="off"&&!i.legacy).map(i=>({value:i.id,label:i.name})),t?e.arp:k.lastArp,i=>L({...N(k,{arp:i}),lastArp:i}),!t),j("octaves","Octaves","octaves",[1,2,3,4].map(i=>({value:String(i),label:`${i} oct`})),String(e.arpOctaves),i=>L(N(k,{arpOctaves:Number(i)})),!t),j("spread","Spread","spread",["compact","wide","wider","maximum"].map(i=>({value:i,label:i[0].toUpperCase()+i.slice(1)})),e.arpSpread,i=>L(N(k,{arpSpread:i}))),$("div",{class:"cal-field",...X("rate")},V("Rate","rate"),$("span",{class:"cal-mono cal-readout","data-cal":"rate"},`${Oo(e.interval)} · ${Math.round(Qd())}`))),e.arp==="euclidean"?$("div",{class:"cal-grid2"},j("hits","Hits","hits",r(n.steps),String(n.hits),i=>L(N(k,{arpHits:Number(i)}))),j("steps","Steps","steps",r(16),String(n.steps),i=>L(N(k,{arpSteps:Number(i)}))),j("rotate","Rotate","rotate",r(n.steps,0),String(n.rotate),i=>L(N(k,{arpRotate:Number(i)}))),$("div",{class:"cal-field",...X("pattern")},V("Pattern","pattern"),$("span",{class:"cal-mono cal-readout"},n.steps<=8?va(n).split("").join(" "):va(n)))):null,t?$("p",{class:"cal-mono cal-sub cal-small"},`${o} notes in arpeggio`):null),we(Ir,j("grid","Grid","grid",St.map(i=>({value:String(i.value),label:i.short})),String(St.find(i=>Math.abs(i.value-e.interval)<1e-6)?.value??e.interval),i=>L(N(k,{interval:Number(i)}))))}function Qd(){const e=lt();return typeof e.bpm=="number"?e.bpm:120}const wa=ct("targets","Targets",()=>{const e=Object.values(k.targets).filter(t=>t.on).length;return e?`${e} on`:"none on"}),Eo=[{value:"chord",label:"Chord"},{value:"root",label:"Root"},{value:"top",label:"Top"}];function Zd(){const e=dr(ot,k.targets,se?.instance??""),t=[kr.el];se?le||t.push($("p",{class:"cal-sub"},"This Studio has no notes bus yet: update it to play instruments from CALLIOPE.")):t.push($("p",{class:"cal-sub"},"CALLIOPE plays instruments in NetComposer Studio. Open it there: ",$("a",{href:"/studio/"},"Studio"),"."));for(const n of e.playable)t.push(Ao(n));for(const n of e.coming)t.push(Ao(n));se&&!e.playable.length&&!e.coming.length&&t.push($("p",{class:"cal-sub cal-small"},"Add a Synth, Bass or Sampler to play it from CALLIOPE.")),e.none.length&&t.push($("p",{class:"cal-small","data-cal":"no-notes"},`${ep(e.none)} take${e.none.length===1?"s":""} no notes.`)),t.push($("div",{class:"cal-inputs","aria-disabled":"true",...X("inputs")},$("div",{class:"cal-row-between"},V("Inputs"),$("span",{class:"cal-mono cal-small"},"with Situation v1")),...["Events","Energy","Harmony"].map(n=>$("div",{class:"cal-row-between"},$("span",{},n),$("span",{class:"cal-mono cal-small"},"ignore"))))),we(wa.mount,...t)}function ep(e){return e.length<2?e[0]??"":`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`}function Ao(e){const t=k.targets[e.instance]??{on:!1,role:"chord",octave:0},n=e.pitch?{...t,role:"root"}:t,o=!e.playable,r=n.on&&!o,i=e.instance.replace(/[^a-z0-9]/gi,"-"),s=$("div",{class:"cal-row-between"},$("span",{class:"cal-row cal-target-name"},$("i",{class:"cal-dot","data-cal-dot":e.instance,"aria-hidden":"true"}),$("span",{},e.label),$("span",{class:"cal-mono cal-sub cal-small"},String(e.n).padStart(2,"0"))),R(r?"On":"Off",{class:"cal-onoff",role:"switch","aria-checked":String(r),"aria-label":`Play ${e.name} from CALLIOPE`,"data-cal-id":`on-${i}`,...X("target-on")},()=>{L(Ke(k,e.instance,{on:!n.on,...e.pitch?{role:"root"}:{}}))}));s.lastChild.disabled=o;const l=$("div",{class:"cal-target-body"},$("div",{class:"cal-field cal-grow"},V("Role","role"),_t(`role-${i}`,`${e.name} role`,e.pitch?Eo.map(c=>({...c,disabled:c.value!=="root"})):Eo,n.role,c=>L(Ke(k,e.instance,{role:c})),o)),$("div",{class:"cal-oct"},j(`oct-${i}`,"Octave","target-octave",Array.from({length:tr-kt+1},(c,d)=>({value:String(d+kt),label:Nd(d+kt)})),String(n.octave),c=>L(Ke(k,e.instance,{octave:Number(c)})),o)));return $("div",{class:"cal-target","data-target":e.instance,"data-on":r?"":void 0,"data-disabled":o?"":void 0},s,l,e.note?$("p",{class:"cal-mono cal-sub cal-small"},e.note):null)}const zr=[Ar,Gt,Cr,wa];sd(vr,zr.map(e=>e.handle),"adjacent");const Mo=Oe.handle.el.querySelector("[data-nc-index]");Mo&&(Mo.textContent="01a");function K(){const e=ha();ma(),jd(),_d(e),Xd(),Zd();for(const n of[...zr,Oe])n.update();const t=$("p",{class:"cal-mono cal-sub cal-small",role:"status"},qt);qt&&xr.firstChild?.replaceWith(t),Dn="",Fr()}let Dn="",So="";function Fr(){const e=ha();kr.tick(e),Er.tick(e);const t=JSON.stringify([e.activePad,e.queuedPad,e.step,e.playing&&Math.floor(e.beat)]);if(t!==Dn){Dn=t,Sr(e);const i=Gt.mount.querySelector('[data-cal="bar"]'),s=k.gen,l=pe(s.chordProgression,s.note,s.octave,s.progressionBars);if(i&&l&&e.playing){const c=Rt(l);i.textContent=`bar ${Math.floor(Math.max(0,e.beat-U.startBeat)/it()%c+1e-9)+1} of ${c}`}}const n=e.playing?e.beat:null;n!==null&&fe.length>256&&(fe=fe.filter(i=>i.end>n-1));const o=n!==null&&fe.some(i=>i.start<=n&&i.end>n);for(const i of wa.mount.querySelectorAll("[data-cal-dot]")){const s=o&&!!k.targets[i.dataset.calDot??""]?.on;i.hasAttribute("data-on")!==s&&i.toggleAttribute("data-on",s)}const r=e.playing?JSON.stringify({now:e.now.name,next:e.next?.name??""}):"";if(r!==So){So=r;try{le?.status?.(r?JSON.parse(r):null)}catch{}}e.playing&&ae.prune(e.beat-1)}fr();se?.onNotesTargets?.(()=>{fr(),Nn.clear(),ua(),K()});le?.onTakeBack?.(e=>{const t=JSON.parse(JSON.stringify(Ad(k)));return queueMicrotask(()=>L(Ke(k,e,{on:!1}))),t});function tp(){try{const e=window.frameElement;return!e||e.classList.contains("shown")}catch{return!0}}let qn=!1;function jn(){if(Fr(),!U.playing){qn=!1;return}tp()?requestAnimationFrame(jn):window.setTimeout(jn,200)}function np(){qn||(qn=!0,requestAnimationFrame(jn))}Fn&&cd(Fn,U,Qe,{started:()=>{ae.reset(ne(k),k.held),np()},stopped:()=>{ae.reset(ne(k),k.held),K()}});ua();se?.providePreset?.({format:"netcomposer.calliope",version:1,get:()=>sr(k),set:e=>{const t=lr(e);t&&L(t)}});window.setInterval(()=>U.pump(),pd);K();Od();window.matchMedia(at).addEventListener("change",()=>K());window.__calliope={get state(){return k},driver:U,timeline:ae,live:ha,apply:L,holdPad:e=>L(ra(k,e)),resume:e=>L(or(k),{jump:e}),setTarget:(e,t)=>L(Ke(k,e,t)),patch:e=>L(N(k,e)),get targets(){return ot},get hosted(){return!!se},get source(){return le?.id??null}};
