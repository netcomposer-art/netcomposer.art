(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function Qe(){return(performance.timeOrigin+performance.now())/1e3}const Ae=["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"],vo=["Essential","Seventh","Extended","Altered","Experimental"],He=(e,t)=>t.map(([n,o,r,i])=>({id:n,name:o,intervals:r,category:e,symbol:i})),Fe=[...He("Essential",[["major","Major",[0,4,7],""],["minor","Minor",[0,3,7],"m"],["diminished","Diminished",[0,3,6],"dim"],["augmented","Augmented",[0,4,8],"aug"],["sus2","Sus2",[0,2,7],"sus2"],["sus4","Sus4",[0,5,7],"sus4"],["power","Power Chord",[0,7,12],"5"],["major-6","Major 6",[0,4,7,9],"6"],["minor-6","Minor 6",[0,3,7,9],"m6"]]),...He("Seventh",[["major-7","Major 7",[0,4,7,11],"maj7"],["minor-7","Minor 7",[0,3,7,10],"m7"],["dominant-7","Dominant 7",[0,4,7,10],"7"],["minor-major-7","Minor-Major 7",[0,3,7,11],"m(maj7)"],["half-diminished-7","Half-Diminished 7",[0,3,6,10],"m7b5"],["diminished-7","Diminished 7",[0,3,6,9],"dim7"],["augmented-major-7","Augmented Major 7",[0,4,8,11],"aug(maj7)"],["augmented-7","Augmented 7",[0,4,8,10],"aug7"],["7sus4","7sus4",[0,5,7,10],"7sus4"]]),...He("Extended",[["add9","Add9",[0,4,7,14],"add9"],["minor-add9","Minor Add9",[0,3,7,14],"m(add9)"],["major-9","Major 9",[0,4,7,11,14],"maj9"],["minor-9","Minor 9",[0,3,7,10,14],"m9"],["dominant-9","Dominant 9",[0,4,7,10,14],"9"],["6-9","6/9",[0,4,7,9,14],"6/9"],["minor-6-9","Minor 6/9",[0,3,7,9,14],"m6/9"],["major-7-sharp11","Major 7#11",[0,4,7,11,18],"maj7#11"],["minor-11","Minor 11",[0,3,7,10,14,17],"m11"],["dominant-11","Dominant 11",[0,4,7,10,14,17],"11"],["9sus4","9sus4",[0,5,7,10,14],"9sus4"],["major-13","Major 13",[0,4,7,11,14,21],"maj13"],["minor-13","Minor 13",[0,3,7,10,14,17,21],"m13"],["dominant-13","Dominant 13",[0,4,7,10,14,21],"13"]]),...He("Altered",[["7b9","7b9",[0,4,7,10,13],"7b9"],["7-sharp9","7#9",[0,4,7,10,15],"7#9"],["7b5","7b5",[0,4,6,10],"7b5"],["7-sharp5","7#5",[0,4,8,10],"7#5"],["7b9-sharp5","7b9#5",[0,4,8,10,13],"7b9#5"],["7-sharp9-b5","7#9b5",[0,4,6,10,15],"7#9b5"],["7alt","7alt",[0,4,10,13,15,18,20],"7alt"],["major-7b5","Major 7b5",[0,4,6,11],"maj7b5"],["minor-7b9","Minor 7b9",[0,3,7,10,13],"m7b9"]]),...He("Experimental",[["quartal-3","Quartal 3",[0,5,10]," Quartal 3"],["quartal-4","Quartal 4",[0,5,10,15]," Quartal 4"],["quartal-5","Quartal 5",[0,5,10,15,20]," Quartal 5"],["quintal-3","Quintal 3",[0,7,14]," Quintal 3"],["quintal-4","Quintal 4",[0,7,14,21]," Quintal 4"],["chromatic-cluster","Chromatic Cluster",[0,1,2]," Chromatic Cluster"],["whole-tone-cluster","Whole-Tone Cluster",[0,2,4,6]," Whole-Tone Cluster"],["minor-second-cluster","Minor-Second Cluster",[0,1,5,7]," Minor-Second Cluster"],["major-second-stack","Major-Second Stack",[0,2,4,7,9]," Major-Second Stack"],["lydian-stack","Lydian Stack",[0,2,4,6,7,11]," Lydian Stack"],["major-pentatonic","Major Pentatonic",[0,2,4,7,9]," Major Pentatonic"],["minor-pentatonic","Minor Pentatonic",[0,3,5,7,10]," Minor Pentatonic"],["in-sen","In-sen",[0,1,5,7,10]," In-sen"],["whole-tone","Whole-Tone Collection",[0,2,4,6,8,10]," Whole-Tone"]])],yo=new Map(Fe.map(e=>[e.id,e])),_t={Major:"major",Minor:"minor",Diminished:"diminished",Augmented:"augmented",Sus2:"sus2",Sus4:"sus4","Major 7th":"major-7","Minor 7th":"minor-7","Dominant 7th":"dominant-7"};function ke(e){if(typeof e!="string")return"major";if(yo.has(e))return e;if(_t[e])return _t[e];const t=o=>o.trim().toLowerCase().replace(/[\s_-]+/g,""),n=t(e);return Object.entries(_t).find(([o])=>t(o)===n)?.[1]??Fe.find(o=>t(o.name)===n||t(o.id)===n)?.id??"major"}function G(e){return yo.get(ke(e))}const an=(e,t,n)=>Math.max(t,Math.min(n,Math.round(Number.isFinite(e)?e:t)));function $o(e){if(!e.length)return[];const t=Math.min(...e),n=Math.max(...e),o=Math.ceil(-t/12),r=Math.floor((127-n)/12);if(o>r)throw new RangeError("Voicing spans more than the supported MIDI range.");const i=Math.max(o,Math.min(r,0))*12;return e.map(l=>l+i)}function qe(e,t,n=0,o="compact"){const i=G(t).intervals.map(s=>an(e,0,127)+s);for(let s=0;s<an(n,0,i.length-1);s++){const c=i.shift(),p=i[i.length-1];i.push(c+Math.ceil((p-c+1)/12)*12)}const l={compact:0,wide:1,wider:2,maximum:4}[o]??0;return $o(i.map((s,c)=>s+12*Math.floor(c*l/Math.max(1,i.length-1))))}function Er(e,t=1){return[...new Set(Array.from({length:an(t,1,4)},(n,o)=>e.map(r=>r+o*12)).flat().filter(n=>n>=0&&n<=127))]}function Ar(e,t){const n=[...new Set(e)].sort((i,l)=>i-l),o=n.length;if(o<2)return n;const r=[...n,...n.slice(1,-1).reverse()];switch(t){case"down":return n.reverse();case"up-down":return r;case"down-up":return r.map(i=>n[o-1-n.indexOf(i)]);case"up-down-repeat":return[...n,...[...n].reverse()];case"as-played":return[...new Set(e)];case"outside-in":{const i=[];for(let l=0,s=o-1;l<=s;l++,s--)i.push(n[l]),l!==s&&i.push(n[s]);return i}case"inside-out":return n.map((i,l)=>({note:i,i:l})).sort((i,l)=>Math.abs(i.i-(o-1)/2)-Math.abs(l.i-(o-1)/2)||i.i-l.i).map(i=>i.note);case"pendulum":{const i=Math.floor((o-1)/2);return[...r.slice(i),...r.slice(0,i)]}case"blossom-up":case"blossom-down":{const i=Math.floor((o-1)/2),l=t==="blossom-up"?1:-1,s=[n[i]];for(let c=1;s.length<o;c++)for(const p of[i+l*c,i-l*c])p>=0&&p<o&&s.push(n[p]);return s}case"low-and-up":case"low-and-down":case"hi-and-up":case"hi-and-down":{const i=t.startsWith("low"),l=i?n[0]:n[o-1],s=i?n.slice(1):n.slice(0,-1);return t.endsWith("down")&&s.reverse(),s.flatMap(c=>[l,c])}default:return n}}const Mr=16,on={hits:5,steps:8,rotate:0};function Dn(e){const t=(o,r)=>typeof o=="number"&&Number.isFinite(o)?Math.round(o):r,n=Math.max(1,Math.min(Mr,t(e?.arpSteps,on.steps)));return{steps:n,hits:Math.max(0,Math.min(n,t(e?.arpHits,on.hits))),rotate:(t(e?.arpRotate,0)%n+n)%n}}function qn(e,t){return((Math.floor(t)+e.rotate)%e.steps+e.steps)%e.steps*e.hits%e.steps<e.hits}const fa=e=>Array.from({length:e.steps},(t,n)=>qn(e,n)?"x":".").join("");function Sr(e,t){let n=Math.floor(t/e.steps)*e.hits;for(let o=t-t%e.steps;o<t;o++)qn(e,o)&&n++;return n}const Cr=1592598566;function Lr(e){let t=(Math.imul(e^Cr,2654435761)^2246822507)>>>0;return t=Math.imul(t^t>>>16,2146121005),t=Math.imul(t^t>>>15,2221713035),((t^t>>>16)>>>0)/2**32}const ga=new Map;function Tr(e,t){if(e<2)return 0;const n=Math.max(0,Math.floor(t));let o=ga.get(e);(!o||o.step>n)&&(o={step:0,pos:0});let{step:r,pos:i}=o;for(;r<n;r++){const l=Lr(r+1);i=(i+(l<.5?1:l<.75?0:e-1))%e}return ga.set(e,{step:r,pos:i}),i}function zr(e,t,n,o=on,r=Math.random){if(t<1)return null;const i=l=>(Math.floor(l)%t+t)%t;if(e==="random")return Math.min(t-1,Math.max(0,Math.floor(r()*t)));if(e==="walk")return Tr(t,n);if(e==="euclidean"){const l=Dn({arpHits:o.hits,arpSteps:o.steps,arpRotate:o.rotate}),s=Math.max(0,Math.floor(n));return qn(l,s)?i(Sr(l,s)):null}return i(n)}const Me=[{id:"off",num:0,name:"Off — chord",description:"No arp: the chord plays together"},{id:"up",num:1,name:"Up",description:"Low to high, then again"},{id:"down",num:2,name:"Down",description:"High to low, then again"},{id:"up-down",num:3,name:"Up/Down",description:"Up then down, ends not repeated"},{id:"up-down-repeat",num:4,name:"Up/Down Repeat",description:"Up then down, ends repeated"},{id:"random",num:5,name:"Random",description:"Any note each step"},{id:"as-played",num:6,name:"As Played",description:"The order the keys were pressed"},{id:"outside-in",num:7,name:"Outside-In",description:"Lowest, highest, then inward"},{id:"inside-out",num:8,name:"Inside-Out",description:"From the middle outward, lower first"},{id:"pendulum",num:9,name:"Pendulum",description:"From the lower middle, swing between the ends"},{id:"blossom-up",num:10,name:"Blossom Up",description:"From center, spiral up"},{id:"blossom-down",num:11,name:"Blossom Down",description:"From center, spiral down"},{id:"low-and-up",num:12,name:"Low&Up",description:"Low pedal, others ascending"},{id:"low-and-down",num:13,name:"Low&Down",description:"Low pedal, others descending"},{id:"hi-and-up",num:14,name:"Hi&Up",description:"High pedal, others ascending"},{id:"hi-and-down",num:15,name:"Hi&Down",description:"High pedal, others descending"},{id:"walk",num:16,name:"Walk",description:"Next 50%, repeat 25%, back 25%"},{id:"euclidean",num:17,name:"Euclidean",description:"Hits spread evenly over Steps, rests between"},{id:"down-up",num:18,name:"Down/Up (legacy)",description:"Down then up, ends not repeated",legacy:!0}],ba={none:"off",chord:"off",updown:"up-down","up-and-down":"up-down",downup:"down-up","down-and-up":"down-up","down-up-legacy":"down-up","off-chord":"off",rand:"random",played:"as-played",order:"as-played",converge:"outside-in",diverge:"inside-out","thumb-up":"low-and-up","thumb-down":"low-and-down","pinky-up":"hi-and-up","pinky-down":"hi-and-down","high-and-up":"hi-and-up","high-and-down":"hi-and-down",euclid:"euclidean",drunk:"walk"},wa=new Set(Me.map(e=>e.id)),xa=new Map(Me.map(e=>[e.num,e.id]));function ko(e){if(typeof e=="number")return Number.isInteger(e)?xa.get(e)??null:null;if(typeof e!="string")return null;if(/^\s*\d+\s*$/.test(e))return xa.get(Number(e))??null;if(wa.has(e))return e;const t=e.trim().toLowerCase().replace(/\(legacy\)/g,"").replace(/&/g,"-and-").replace(/[\s_/]+/g,"-").replace(/[^a-z0-9-]/g,"").replace(/-+/g,"-").replace(/^-|-$/g,"");return wa.has(t)?t:ba[t]?ba[t]:Me.find(o=>o.name.toLowerCase().replace(/\s*\(legacy\)/,"")===e.trim().toLowerCase())?.id??null}Me.map(e=>({value:e.id,label:e.name}));const ve=[{id:"block",label:"Block",kind:"repeat"},{id:"walk-up",label:"Inversion walk · up",kind:"repeat"},{id:"walk-down",label:"Inversion walk · down",kind:"repeat"},{id:"walk-up-down",label:"Inversion walk · up-down",kind:"repeat"},{id:"walk-random",label:"Inversion walk · random",kind:"repeat"},{id:"oom-pah",label:"Oom-pah",kind:"bar"},{id:"alberti",label:"Alberti",kind:"repeat"},{id:"pulse",label:"Pulse + accents",kind:"repeat"},{id:"charleston",label:"Charleston",kind:"bar"},{id:"skank",label:"Skank",kind:"bar"},{id:"house",label:"House stab",kind:"bar"},{id:"montuno",label:"Montuno",kind:"bar"},{id:"push",label:"Push",kind:"bar"},{id:"strum",label:"Strum",kind:"bar"},{id:"drift",label:"Voicing drift",kind:"repeat"}],Ir=ve.map(e=>e.id),rn=e=>ve.find(t=>t.id===e)?.kind??"repeat",Fr=15,Eo=40,J=e=>[...e].sort((t,n)=>t-n);function Ao(e,t){const n=J(e);for(let o=0;o<t;o++){const r=n.shift(),i=n[n.length-1]??r;n.push(r+Math.ceil((i-r+1)/12)*12)}return n}const dt=e=>Ao(e,1);function Pr(e,t){const n=e[0];return n-((n-t)%12+12)%12}function Nr(e,t){const n=J(e);if(n.length<3)return n;switch((t%4+4)%4){case 1:return J([n[0],...n.slice(2),n[1]+12]);case 2:return J([n[0],...n.slice(3),n[1]+12,n[2]+12]);case 3:return J([n[0]-12,n[2],n[1]+12,...n.slice(3).map(r=>r+12)]);default:return n}}function Dr(e,t,n,o=Math.random){const r=Math.max(1,Math.min(t,3)),i=Math.max(0,Math.floor(n));switch(e){case"walk-down":return(r-i%r)%r;case"walk-up-down":{if(r<2)return 0;const l=2*r-2,s=i%l;return s<r?s:l-s}case"walk-random":return Math.min(r-1,Math.floor(o()*r));default:return i%r}}function Mo(e,t,n,o,r=Math.random){const i=J(t);if(!i.length)return{notes:[],velocity:1};switch(e){case"block":return{notes:i,velocity:1};case"walk-up":case"walk-down":case"walk-up-down":case"walk-random":return{notes:Ao(i,Dr(e,i.length,n,r)),velocity:.9};case"alberti":return{notes:[[i[0],i[2]??i[i.length-1],i[1]??i[0],i[2]??i[i.length-1]][(Math.floor(n)%4+4)%4]],velocity:.85};case"pulse":{const l=Math.abs(o/2-Math.round(o/2))<1e-6;return{notes:i,velocity:l?1:.45}}case"drift":return{notes:Nr(i,n),velocity:.9};default:return null}}function So(e,t,n,o,r=t){const i=J(t);if(!i.length)return[];const l=(c,p,d,u)=>c.map(h=>({step:h,len:p,notes:d,velocity:u})),s=Pr(i,n);switch(e){case"oom-pah":return[...l([0],3,[s-12],1),...l([4],2,dt(i),.75),...l([8],3,[s-12],1),...l([12],2,dt(i),.75)];case"charleston":return l([0,6],2,i,.9);case"skank":return l([4,12],1,dt(i),.9);case"house":return l([2,6,10,14],1,dt(i),.9);case"montuno":{const c=s+(o[1]??4),p=s+(o[2]??7),d=o[3]!==void 0&&o[3]<12?s+o[3]:s+12,u=[s,s+12],h=[c,p];return[[0,u],[3,h],[5,u],[6,h],[8,[p,d]],[10,u],[13,h],[14,[p,s+12]]].map(([f,b])=>({step:f,len:1,notes:J(b),velocity:.85}))}case"push":return[...l([0],6,i,.9),...l([6],2,i,.9),{step:14,len:2,notes:J(r),velocity:.9,next:!0}];case"strum":{const c=[...i,i[0]+12];return[{step:0,len:3.5,notes:c,velocity:.95,strum:"down"},{step:8,len:3.5,notes:c,velocity:.75,strum:"up"}]}default:return[]}}function qr(e,t,n,o,r,i,l=()=>0){const s=Math.max(.1,Math.min(1,i/100));if(rn(e)==="bar")return So(e,t,n,o).map(d=>({...d,len:d.len*s}));const c=16/r,p=[];for(let d=0;d*c<16-1e-9;d++){const u=Mo(e,t,d,d*c/4,l);u&&u.notes.length&&p.push({step:d*c,len:c*s,notes:u.notes,velocity:u.velocity})}return p}function jr(e,t,n){const o=n==="down"?J(e):J(e).reverse(),r=Math.max(0,Math.min(Eo,t))/1e3;return o.map((i,l)=>({midi:i,offset:l*r}))}const va=e=>Math.abs(e-Math.round(e))<1e-6?"down":"up";function Rr(e){const t=new Set(e.map(i=>(i%12+12)%12)),n=i=>t.has(i);let o;const r=n(3)&&!n(4);return r&&n(6)&&n(9)?o=[14]:r&&n(6)?o=[17]:n(4)&&n(8)&&!n(7)?o=[14]:n(4)&&n(10)?o=[14,21]:n(4)?o=[14,18,21]:n(3)?o=[14,17]:n(5)||n(2)?o=[14,21]:o=[14],o.filter(i=>!n(i%12))}function Br(e,t,n,o=Math.random){const r=Rr(n);if(!r.length||!e.length)return null;const i=(t+r[Math.min(r.length-1,Math.floor(o()*r.length))])%12,l=Math.max(...e),s=l+1+((i-(l+1))%12+12)%12;return s<=127?s:null}function At(e,t,n=0,o="compact"){const r=t.map(s=>Math.max(0,Math.min(127,Math.round(e)))+s),i=Math.max(0,Math.min(r.length-1,Math.round(n)||0));for(let s=0;s<i;s++){const c=r.shift(),p=r[r.length-1];r.push(c+Math.ceil((p-c+1)/12)*12)}const l={compact:0,wide:1,wider:2,maximum:4}[o]??0;return $o(r.map((s,c)=>s+12*Math.floor(c*l/Math.max(1,r.length-1))))}function Or(e,t){const n=J(e),o=J(t);if(n.length===o.length)return n.reduce((i,l,s)=>i+Math.abs(l-o[s]),0);const r=(i,l)=>Math.min(...l.map(s=>Math.abs(s-i)));return n.reduce((i,l)=>i+r(l,o),0)+o.reduce((i,l)=>i+r(l,n),0)}function Hr(e,t,n,o,r,i="compact",l){const s=At(t,n,l??r,i);if(!e||!e.length)return s;let c=s,p=1/0,d=1/0;const u=l!==void 0?[l]:n.map((h,f)=>f);for(const h of u)for(const f of[-24,-12,0,12]){const b=At(t,n,h,i).map(g=>g+f);if(b[0]<o-7||b[0]>o+12||b[0]<0||b[b.length-1]>127)continue;const w=Or(b,e),m=Math.abs(b.reduce((g,y)=>g+y,0)/b.length-e.reduce((g,y)=>g+y,0)/e.length);(w<p-1e-9||Math.abs(w-p)<1e-9&&m<d-1e-9)&&(c=b,p=w,d=m)}return c}const Co=["Pop / Rock","Blues","Jazz","Soul / R&B / Neo-soul","Gospel","EDM / House / Trance","Cinematic / Ambient","Latin / Flamenco","Lo-fi / Chill","Modal"],Vr={"Pop / Rock":"Pop",Blues:"Blues",Jazz:"Jazz","Soul / R&B / Neo-soul":"Soul",Gospel:"Gospel","EDM / House / Trance":"EDM","Cinematic / Ambient":"Cinematic","Latin / Flamenco":"Latin","Lo-fi / Chill":"Lo-fi",Modal:"Modal"},v=(e,t,n,o=1,r={})=>({degree:e,chord:t,numeral:n,bars:o,...r}),C="major",O="minor",T="dominant-7",F="minor-7",_="major-7",Gt="half-diminished-7",Ut="diminished-7",I=(e,t,n,o,r,i)=>({id:e,group:t,name:n,level:o,tonality:r,chords:i,short:Vr[t]}),ya=e=>[v(0,T,"I7"),v(e==="IV7"?5:0,T,e),v(0,T,"I7"),v(0,T,"I7"),v(5,T,"IV7"),v(5,T,"IV7"),v(0,T,"I7"),v(0,T,"I7"),v(7,T,"V7"),v(5,T,"IV7"),v(0,T,"I7"),v(7,T,"V7")],qt=[I("pop-1-5-6-4","Pop / Rock","I–V–vi–IV",1,"major",[v(0,C,"I"),v(7,C,"V"),v(9,O,"vi"),v(5,C,"IV")]),I("pop-6-4-1-5","Pop / Rock","vi–IV–I–V",1,"major",[v(9,O,"vi"),v(5,C,"IV"),v(0,C,"I"),v(7,C,"V")]),I("pop-50s","Pop / Rock","I–vi–IV–V · 50s",1,"major",[v(0,C,"I"),v(9,O,"vi"),v(5,C,"IV"),v(7,C,"V")]),I("rock-1-b7-4","Pop / Rock","I–♭VII–IV",2,"mixolydian",[v(0,C,"I"),v(10,C,"♭VII"),v(5,C,"IV",2)]),I("pop-canon","Pop / Rock","Canon · 8 chords",2,"major",[v(0,C,"I",.5),v(7,C,"V",.5),v(9,O,"vi",.5),v(4,O,"iii",.5),v(5,C,"IV",.5),v(0,C,"I",.5),v(5,C,"IV",.5),v(7,C,"V",.5)]),I("blues-12","Blues","12-bar",1,"blues",ya("I7")),I("blues-12-quick","Blues","12-bar quick change",2,"blues",ya("IV7")),I("blues-minor","Blues","Minor blues",2,"minor",[v(0,F,"i7"),v(0,F,"i7"),v(0,F,"i7"),v(0,F,"i7"),v(5,F,"iv7"),v(5,F,"iv7"),v(0,F,"i7"),v(0,F,"i7"),v(8,T,"♭VI7"),v(7,T,"V7"),v(0,F,"i7"),v(7,T,"V7")]),I("blues-jazz","Blues","Jazz blues",3,"blues",[v(0,T,"I7"),v(5,T,"IV7"),v(0,T,"I7"),v(7,F,"v7",.5),v(0,T,"I7",.5),v(5,T,"IV7"),v(6,Ut,"♯iv°7"),v(0,T,"I7"),v(9,T,"VI7"),v(2,F,"ii7"),v(7,T,"V7"),v(0,T,"I7",.5),v(9,T,"VI7",.5),v(2,F,"ii7",.5),v(7,T,"V7",.5)]),I("jazz-2-5-1","Jazz","ii–V–I",1,"major",[v(2,F,"ii7"),v(7,T,"V7"),v(0,_,"Imaj7",2)]),I("jazz-2-5-1-minor","Jazz","ii–V–i minor",2,"minor",[v(2,Gt,"iiø7"),v(7,"7b9","V7♭9"),v(0,"minor-6","i6",2)]),I("jazz-rhythm","Jazz","I–vi–ii–V · rhythm changes",2,"major",[v(0,_,"Imaj7",.5),v(9,F,"vi7",.5),v(2,F,"ii7",.5),v(7,T,"V7",.5)]),I("jazz-turnaround","Jazz","iii–VI–ii–V turnaround",2,"major",[v(4,F,"iii7",.5),v(9,T,"VI7",.5),v(2,F,"ii7",.5),v(7,T,"V7",.5)]),I("jazz-autumn","Jazz","Autumn cycle",3,"minor",[v(5,F,"iv7"),v(10,T,"♭VII7"),v(3,_,"♭IIImaj7"),v(8,_,"♭VImaj7"),v(2,Gt,"iiø7"),v(7,"7b9","V7♭9"),v(0,F,"i7",2)]),I("jazz-giant-steps","Jazz","Giant Steps cycle",3,"major",[v(0,_,"Imaj7",.5),v(3,T,"♭III7",.5),v(8,_,"♭VImaj7",.5),v(11,T,"VII7",.5),v(4,_,"IIImaj7"),v(10,F,"♭vii7",.5),v(3,T,"♭III7",.5),v(8,_,"♭VImaj7",.5),v(11,T,"VII7",.5),v(4,_,"IIImaj7",.5),v(7,T,"V7",.5),v(0,_,"Imaj7"),v(6,F,"♯iv7",.5),v(11,T,"VII7",.5)]),I("soul-dorian-vamp","Soul / R&B / Neo-soul","Dorian vamp i7–IV7",1,"dorian",[v(0,F,"i7"),v(5,T,"IV7")]),I("soul-4-3-2-1","Soul / R&B / Neo-soul","IVmaj7–iii7–ii7–Imaj7",2,"major",[v(5,_,"IVmaj7"),v(4,F,"iii7"),v(2,F,"ii7"),v(0,_,"Imaj7")]),I("soul-two-of-us","Soul / R&B / Neo-soul","Just the Two of Us",3,"major",[v(5,_,"IVmaj7"),v(4,T,"III7"),v(9,F,"vi7"),v(7,F,"v7",.5),v(0,T,"I7",.5)]),I("soul-2-5-1-ext","Soul / R&B / Neo-soul","ii9–V13sus–Imaj9",3,"major",[v(2,"minor-9","ii9"),v(7,"9sus4","V13sus",1,{intervals:[0,5,7,10,14,21],symbol:"13sus4"}),v(0,"major-9","Imaj9",2)]),I("gospel-1-4-1-dim","Gospel","1–4–1 passing dim",2,"major",[v(0,C,"I"),v(5,C,"IV",.5),v(6,Ut,"♯iv°7",.5)]),I("gospel-7-3-6","Gospel","7–3–6",3,"major",[v(11,Gt,"viiø7"),v(4,T,"III7"),v(9,F,"vi7",2)]),I("gospel-1-17-4-dim","Gospel","I–I7–IV–♯iv°–I/V",3,"major",[v(0,C,"I",.5),v(0,T,"I7",.5),v(5,C,"IV",.5),v(6,Ut,"♯iv°7",.5),v(0,C,"I/V",2,{inversion:2})]),I("edm-epic","EDM / House / Trance","i–VI–III–VII · epic",1,"minor",[v(0,O,"i"),v(8,C,"VI"),v(3,C,"III"),v(10,C,"VII")]),I("edm-1-7-6-7","EDM / House / Trance","i–VII–VI–VII",1,"minor",[v(0,O,"i"),v(10,C,"VII"),v(8,C,"VI"),v(10,C,"VII")]),I("house-organ","EDM / House / Trance","House organ i7–iv7",1,"minor",[v(0,F,"i7"),v(5,F,"iv7")]),I("trance-1-6-7-5","EDM / House / Trance","Trance i–VI–VII–v",2,"minor",[v(0,O,"i"),v(8,C,"VI"),v(10,C,"VII"),v(7,O,"v")]),I("cine-minor-plagal","Cinematic / Ambient","Minor plagal iv–i",1,"minor",[v(5,O,"iv"),v(0,O,"i")]),I("cine-hero","Cinematic / Ambient","Hero I–♭VI–♭VII–I",2,"major",[v(0,C,"I"),v(8,C,"♭VI"),v(10,C,"♭VII"),v(0,C,"I")]),I("cine-mediant","Cinematic / Ambient","Mediant I–III",2,"major",[v(0,C,"I"),v(4,C,"III")]),I("cine-lydian","Cinematic / Ambient","Lydian I–II",2,"lydian",[v(0,C,"I"),v(2,C,"II")]),I("latin-andalusian","Latin / Flamenco","Andalusian i–♭VII–♭VI–V",1,"minor",[v(0,O,"i"),v(10,C,"♭VII"),v(8,C,"♭VI"),v(7,C,"V")]),I("latin-montuno","Latin / Flamenco","Montuno i–iv–V7",1,"minor",[v(0,O,"i"),v(5,O,"iv"),v(7,T,"V7",2)]),I("latin-bossa","Latin / Flamenco","Bossa Imaj7–II7–ii7–V7",2,"major",[v(0,_,"Imaj7",2),v(2,T,"II7",2),v(2,F,"ii7"),v(7,T,"V7")]),I("lofi-2-5-1-6","Lo-fi / Chill","ii9–V9–Imaj9–vi9",2,"major",[v(2,"minor-9","ii9"),v(7,"dominant-9","V9"),v(0,"major-9","Imaj9"),v(9,"minor-9","vi9")]),I("lofi-4-3-6","Lo-fi / Chill","IVmaj7–iii7–vi7",2,"major",[v(5,_,"IVmaj7"),v(4,F,"iii7"),v(9,F,"vi7",2)]),I("modal-dorian","Modal","Dorian i–IV",1,"dorian",[v(0,O,"i"),v(5,C,"IV")]),I("modal-mixolydian","Modal","Mixolydian I–♭VII",1,"mixolydian",[v(0,C,"I"),v(10,C,"♭VII")]),I("modal-phrygian","Modal","Phrygian i–♭II",1,"phrygian",[v(0,O,"i"),v(1,C,"♭II")])],_r=qt.map(e=>e.id),Lo=e=>qt.find(t=>t.id===e)??null,$a=e=>"●".repeat(e)+"○".repeat(3-e),To=[.5,1,2,4,0],zo=e=>e===.5?"½":String(e),ka=e=>`${zo(e)} bar${e>1?"s":""}`;function ce(e,t,n,o=0){const r=Lo(e);if(!r)return null;const i=(n+1)*12+t;return r.chords.map((l,s)=>{const c=G(l.chord),p=l.intervals??c.intervals,d=(t+l.degree)%12;return{index:s,root:i+l.degree,rootPc:d,chord:c.id,intervals:p,numeral:l.numeral,name:`${Ae[d]}${l.symbol??c.symbol}`,bars:o>0?o:l.bars,...l.inversion!==void 0?{inversion:l.inversion}:{}}})}const jt=e=>e.reduce((t,n)=>t+n.bars,0),jn=(e,t)=>e.slice(0,t).reduce((n,o)=>n+o.bars,0);function Ea(e,t){const n=jt(e),o=(t%n+n)%n;let r=0;for(let i=0;i<e.length;i++){if(o<r+e[i].bars-1e-9)return{chord:e[i],index:i,position:o,total:n};r+=e[i].bars}return{chord:e[e.length-1],index:e.length-1,position:o,total:n}}const Se=e=>({value:e,label:`1/${e}`,short:`1/${e}`,kind:"straight"}),pt=e=>({value:e*2/3,label:`1/${e} dotted`,short:`1/${e}.`,kind:"dotted"}),Ve=e=>({value:e*3/2,label:`1/${e} triplet`,short:`1/${e}T`,kind:"triplet"}),Mt=[Se(1),pt(2),Se(2),Ve(2),pt(4),Se(4),Ve(4),pt(8),Se(8),Ve(8),pt(16),Se(16),Ve(16),Se(32),Ve(32)].sort((e,t)=>e.value-t.value);Mt.filter(e=>e.kind==="straight").map(e=>e.value);function Io(e){return typeof e!="number"||!Number.isFinite(e)?null:Mt.find(t=>Math.abs(t.value-e)<1e-6)??null}const Gr=(e,t=4)=>Io(e)?.value??t,Fo=e=>Io(e)?.short??`1/${Math.round(e)}`,Ze=16,Po=e=>typeof e=="string"&&Fe.some(t=>t.id===ke(e))&&(ke(e)!=="major"||e==="major"||e==="Major"),St=(e,t)=>typeof e=="number"&&Number.isFinite(e)?(Math.round(e)%12+12)%12:t,Rn=(e,t)=>{const n=G(t).intervals.length-1;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(n,Math.round(e))):0},Bn=()=>Array.from({length:Ze},()=>null);function Ur(e,t=0){const n=Bn();return Array.isArray(e)&&e.slice(0,Ze).forEach((o,r)=>{if(!o||typeof o!="object")return;const i=o;if(!Po(i.chord))return;const l=ke(i.chord);n[r]={chord:l,root:St(i.root,St(t,0)),inversion:Rn(i.inversion,l)}}),n}function Wr(e,t,n){const o=e.length;if(t===n||t<0||n<0||t>=o||n>=o)return e;const r=[...e],[i]=r.splice(t,1);return r.splice(n,0,i),r}function Yr(e,t,n){if(e.some(i=>i?.chord===t))return e;const o=e.indexOf(null);if(o<0)return e;const r=[...e];return r[o]={chord:t,root:St(n,0),inversion:0},r}function Kr(e,t,n){if(t<0||t>=e.length)return e;const o=[...e];return o[t]=n&&Po(n.chord)?{chord:ke(n.chord),root:St(n.root,0),inversion:Rn(n.inversion,n.chord)}:null,o}function Jr(e,t,n){return{chord:e.chord,inversion:Rn(e.inversion,e.chord),...t==="pad"?{note:e.root}:{},...n&&n!=="off"?{chordProgression:"off"}:{}}}const Xr=["st","nd","rd"],Qr=e=>e.inversion>0?`${e.inversion}${Xr[e.inversion-1]??"th"} inv`:"",Zr=["off","single","chord","random"],No=e=>Zr.includes(e),el={mode:"single",note:0,octave:3,octaveRange:2,chord:"minor-7",inversion:0,interval:4,gate:75,arp:"off",arpOctaves:1,arpSpread:"compact",arpHits:5,arpSteps:8,arpRotate:0,chordStyle:"block",voiceLeading:"fixed",strum:0,tension:0,chordProgression:"off",progressionBars:0,favoriteChords:[],chordPads:Bn(),chordPadMode:"pad"};function Aa(e,t,n=Math.random){if(e.mode==="off")return[];const o=Math.min(127,Math.max(0,(e.octave+1)*12+e.note));if(e.mode==="single")return[o];if(e.mode==="random"){const c=Math.min(127,(e.octave+1)*12),p=Math.min(127,c+e.octaveRange*12-1);return[c+Math.floor(n()*(p-c+1))]}const r=qe(o,e.chord,e.inversion,e.arpSpread);if(e.arp==="off")return r;const i=Er(r,e.arpOctaves),l=Ar(i,e.arp),s=zr(e.arp,l.length,t,Dn(e),n);return s===null?[]:[l[s]]}function tl(e,t){return t.direction&&t.strumMs>0&&e.length>1?jr(e,t.strumMs,t.direction):e.map(n=>({midi:n,offset:0}))}function nl(e,t=0){return tl(e.notes,e).map(({midi:n,offset:o})=>({note:n,velocity:e.velocity,startBeat:e.beat,lengthBeats:e.spanBeats*e.gate,role:e.role,offsetSec:o,spanBeats:e.spanBeats,gate:e.gate,hit:t,root:e.root}))}const Ma=(e,t,n)=>Math.min(n,Math.max(t,e)),al=1e-9;function ol(e,t){return t>0?Math.ceil(e/t-al)*t:e}const Sa=(e,t)=>({from:e,origin:t,jump:null,last:null,lastKey:"",pushedTo:-1,bar:{bar:NaN,settings:null,hits:[]}});class On{step=0;grid={origin:0,index:0,interval:16};comp=Sa(0,0);read;random;chordRandom;bpb;serial=0;constructor(t,n={}){this.read=typeof t=="function"?t:()=>t,this.random=n.random??Math.random,this.chordRandom=n.chordRandom??Math.random,this.bpb=n.beatsPerBar??(()=>4)}get settings(){return this.read()}beatsPerBar(){return Math.max(1,this.bpb())}beatInBar(t){const n=this.beatsPerBar();return(t%n+n)%n}start(t,{join:n=!1}={}){const o=this.settings.interval,r=4/o,i=n?ol(t,r):t;this.grid={origin:i,index:0,interval:o},this.step=Math.max(0,Math.round(i/r));const l=this.beatsPerBar();return this.comp=Sa(i,n?0:Math.floor(t/l+1e-9)*l),i}clone(t={}){const n=new On(t.settings??this.read,{random:t.random??this.random,chordRandom:t.chordRandom??this.chordRandom,beatsPerBar:t.beatsPerBar??this.bpb});n.step=this.step,n.grid={...this.grid},n.serial=this.serial;const o=this.comp;return n.comp={...o,jump:o.jump?{...o.jump}:null,last:o.last?[...o.last]:null,bar:{...o.bar}},n}resetGrid(){this.grid={origin:0,index:0,interval:this.settings.interval}}nextBeat(){return this.grid.origin+this.grid.index*4/this.grid.interval}stepBeats(){return 4/this.grid.interval}followInterval(){const t=this.settings.interval;t!==this.grid.interval&&(this.grid={origin:this.nextBeat(),index:0,interval:t})}skipTo(t){const n=Math.max(0,Math.ceil((t-this.nextBeat())/this.stepBeats()-1e-9));return this.grid.index+=n,this.step+=n,n}advance(){this.grid.index++}advanceStep(){this.step++}applyJump(t){const n=this.comp.jump;n&&t>=n.at-1e-9&&(this.comp.origin=n.origin,this.comp.jump=null)}plainChord(){const t=this.settings;return t.chordStyle==="block"&&t.chordProgression==="off"&&!(t.strum>0)&&!(t.tension>0)}barStyleActive(){const t=this.settings;return t.mode==="chord"&&t.arp==="off"&&!this.plainChord()&&rn(t.chordStyle)==="bar"}stepHit(t){const n=this.settings,o=this.stepBeats();if(n.mode==="chord"&&!this.plainChord()){if(n.arp!=="off"){const d=this.chordAt(t),u={...n,chord:d.chord,note:d.rootPc,octave:Math.floor(d.root/12)-1,...d.inversion!==void 0?{inversion:d.inversion}:{}},h=Aa(u,this.step,this.random);return this.step++,h.length?this.hit(t,o,h,1,null,d,!1,"arp"):null}if(rn(n.chordStyle)==="bar")return this.step++,null;const s=this.chordAt(t),c=this.voicingFor(s),p=Mo(n.chordStyle,c,this.step,this.beatInBar(t),this.chordRandom);return this.step++,!p||!p.notes.length?null:this.hit(t,o,p.notes,p.velocity,va(this.beatInBar(t)),s,!0,"chord")}if(!No(n.mode))return this.step++,null;const r=Aa(n,this.step,this.random);if(this.step++,!r.length)return null;const i=n.mode==="chord",l=i?Math.min(127,Math.max(0,(n.octave+1)*12+n.note)):r[0];return{beat:t,spanBeats:o,gate:Ma(n.gate/100,.1,1),velocity:1,notes:r,kind:"plain",direction:null,strumMs:0,chord:i?this.plainChordAt():null,root:l,role:i?n.arp==="off"?"chord":"arp":"note"}}hit(t,n,o,r,i,l,s,c){const p=this.settings,d=[...o];if(s&&p.tension>0&&this.chordRandom()*100<p.tension){const h=Br(d,l.rootPc,l.intervals,this.chordRandom);h!==null&&d.push(h)}const u=p.chordStyle==="strum"&&i?p.strum>0?p.strum:Fr:p.strum;return{beat:t,spanBeats:n,gate:Ma(p.gate/100,.1,1),velocity:r,notes:d,kind:"comp",direction:i,strumMs:u,chord:l,root:l.root,role:c}}progressionOrigin(t){const n=this.comp.jump;return n&&t>=n.at-1e-9?n.origin:this.comp.origin}plainChordAt(){const t=this.settings,n=G(t.chord);return{index:0,root:(t.octave+1)*12+t.note,rootPc:t.note,chord:n.id,intervals:n.intervals,name:"",numeral:"",bars:1}}chordAt(t){const n=this.settings,o=ce(n.chordProgression,n.note,n.octave,n.progressionBars);return o?.length?Ea(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar()).chord:this.plainChordAt()}voicingFor(t){const n=this.settings,o=t.inversion??Math.min(Math.max(0,n.inversion|0),t.intervals.length-1),r=`${t.root}|${t.intervals.join(",")}|${o}|${n.voiceLeading}|${n.arpSpread}`;if(this.comp.last&&r===this.comp.lastKey)return this.comp.last;const i=n.voiceLeading==="smooth"?Hr(this.comp.last,t.root,t.intervals,(n.octave+1)*12+n.note,o,n.arpSpread,t.inversion):At(t.root,t.intervals,o,n.arpSpread);return this.comp.last=i,this.comp.lastKey=r,i}compBar(t){const n=this.comp.bar,o=this.settings;if(n.bar===t&&n.settings===o)return n.hits;const r=o,i=this.beatsPerBar(),l=r.chordStyle,s=this.chordAt(t*i),c=this.voicingFor(s);let p=c;if(l==="push"){const u=this.chordAt((t+1)*i);if(`${u.root}|${u.intervals.join(",")}`!=`${s.root}|${s.intervals.join(",")}`){const h={last:this.comp.last,key:this.comp.lastKey};p=this.voicingFor(u),this.comp.last=h.last,this.comp.lastKey=h.key}}let d=So(l,c,s.rootPc,s.intervals,p).filter(u=>u.step/4<i-1e-9);return l==="push"&&this.comp.pushedTo===t&&(d=d.filter(u=>u.step!==0)),this.comp.bar={bar:t,settings:o,hits:d},d}barFrom(){return this.comp.from}catchUpBars(t){this.comp.from=t}syncBars(){this.comp.from=this.nextBeat()}barHits(t,n=()=>!1){const o=this.settings,r=this.beatsPerBar(),i=[];for(let l=0;l<128;l++){const s=Math.floor(this.comp.from/r+1e-9),p=this.compBar(s).find(f=>s*r+f.step/4>=this.comp.from-1e-9);if(!p){this.comp.from=(s+1)*r;continue}const d=s*r+p.step/4;if(!t(d))break;if(this.comp.from=d+1e-6,n())continue;const u=p.next&&o.chordStyle==="push"?p.len+6:p.len;p.next&&(this.comp.pushedTo=s+1);const h=this.chordAt(p.next?(s+1)*r:d);i.push(this.hit(d,u/4,p.notes,p.velocity,p.strum??va(this.beatInBar(d)),h,!0,"chord"))}return i}chordPosition(t){const n=this.settings;if(n.mode!=="chord")return null;const o=ce(n.chordProgression,n.note,n.octave,n.progressionBars);if(!o?.length)return null;const r=Ea(o,(t+1e-6-this.progressionOrigin(t))/this.beatsPerBar());return{index:r.index,bar:Math.floor(r.position+1e-9)+1,bars:r.total}}jumpToChord(t,n){const o=this.settings,r=ce(o.chordProgression,o.note,o.octave,o.progressionBars);if(!r?.length||t<0||t>=r.length)return!1;const i=this.beatsPerBar(),l=Math.max(n,this.nextBeat(),this.comp.from),s=Math.ceil(l/i-1e-9)*i;return this.comp.jump={at:s,origin:s-jn(r,t)*i},!0}window(t,{muted:n=()=>!1}={}){const o=[];this.followInterval(),this.applyJump(this.nextBeat());for(let i=0;i<4096;i++){const l=this.nextBeat();if(!(l<t))break;if(n())this.advanceStep();else{const s=this.stepHit(l);s&&o.push(s)}this.advance()}this.barStyleActive()?o.push(...this.barHits(i=>i<t,n)):this.syncBars();const r=[];for(const i of o)r.push(...nl(i,++this.serial));return r.sort((i,l)=>i.startBeat-l.startBeat)}}var il="nc-ui",rl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Hn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#9B30FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ct={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ll={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},sl={light:{color:rl.color,semantic:Hn,component:Ct,runtime:ll},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FF2E97","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FF2E97","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},_e=e=>`--${il}-${e}`,ln=Hn["label-on-fill-dark"],Ca=Hn["label-on-fill-light"],cl=ye["label-min-contrast"],dl=/^#[0-9a-f]{6}$/i,pl=e=>typeof e=="string"&&dl.test(e),wt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function La(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),r=i=>{let l=(i+e/30)%12;return n-o*Math.max(-1,Math.min(l-3,9-l,1))};return`#${wt(r(0)*255)}${wt(r(8)*255)}${wt(r(4)*255)}`}function Do(e){let[t,n,o]=[1,3,5].map(p=>parseInt(e.slice(p,p+2),16)/255),r=Math.max(t,n,o),i=Math.min(t,n,o),l=(r+i)/2,s=r-i;if(!s)return{h:0,s:0,l};let c=s/(1-Math.abs(2*l-1));return{h:((r===t?60*((n-o)/s%6):r===n?60*((o-t)/s+2):60*((t-n)/s+4))+360)%360,s:c,l}}function Ta(e){let[t,n,o]=[1,3,5].map(r=>{let i=parseInt(e.slice(r,r+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function sn(e,t){let[n,o]=[Ta(e),Ta(t)].sort((r,i)=>i-r);return(n+.05)/(o+.05)}var Lt=e=>sn(e,ln)>=sn(e,Ca)?ln:Ca;function qo(e,t,n,o=cl){let r=La(e,t,n),i=Lt(r)===ln?1:-1;for(let l=0;l<40&&sn(r,Lt(r))<o;l++)n+=i*.01,r=La(e,t,n);return r}function ul(e){let{h:t,s:n}=Do(e),o=qo(t,Math.min(n,ye["surprise-on-max-saturation"]),ye["surprise-on-lightness"]);return{fill:e,ink:Lt(e),on:o,onInk:Lt(o)}}var hl=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function ml(e,t=Math.random){let[n,o]=ye["surprise-saturation"],[r,i]=ye["surprise-lightness"],l=ye["surprise-min-hue-gap"],s=pl(e)?Do(e).h:null,c=t()*360;return s!==null&&hl(c,s)<l&&(c=(s+l+t()*(360-2*l))%360),qo(c,n+t()*(o-n),r+t()*(i-r))}function fl(e){if(!e)return null;let t=ul(e);return{[_e("surprise-fill")]:t.fill,[_e("surprise-ink")]:t.ink,[_e("surprise-on")]:t.on,[_e("surprise-on-ink")]:t.onInk}}var gl=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,bl=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function za(e){let[t,n,o]=[1,3,5].map(s=>gl(parseInt(e.slice(s,s+2),16)/255)),r=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),l=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*r+.793617785*i-.0040720468*l,1.9779984951*r-2.428592205*i+.4505937099*l,.0259040371*r+.7827717662*i-.808675766*l]}function wl([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,r=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*r+.2309699292*i,-1.2684380046*o+2.6097574011*r-.3413193965*i,-.0041960863*o-.7034186147*r+1.707614701*i].map(l=>wt(bl(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}var xl=ye["velocity-range"],jo={min:Ct.rhythm["velocity-min"],max:Ct.rhythm["velocity-max"]},Ia=Object.fromEntries(Object.entries(sl).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function vl(e,t=jo){let[n,o]=xl,r=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,i=(r-n)/(o-n),l=t.ink??Ct.rhythm["step-cell-ink"];if(i<=0)return{velocity:r,t:0,fill:t.min.toUpperCase(),ink:l};if(i>=1)return{velocity:r,t:1,fill:t.max.toUpperCase(),ink:l};let s=za(t.min),c=za(t.max);return{velocity:r,t:i,fill:wl(s.map((p,d)=>p+(c[d]-p)*i)),ink:l}}function Fa(e,t=jo){return{[_e("velocity-fill")]:vl(e,t).fill}}var Ro="data-nc-theme",Pa="nc-ui-theme-change",yl="(prefers-color-scheme: dark)",Bo=e=>e?.documentElement??null,Oo=e=>e?.defaultView?.matchMedia?.(yl)??null,$l=e=>e==="light"||e==="dark"?e:"system";function kl(e=globalThis.document){return $l(Bo(e)?.getAttribute(Ro))}function cn(e=globalThis.document){let t=kl(e);return t!=="system"?t:Oo(e)?.matches?"dark":"light"}function Ho(e,t=globalThis.document){let n=Bo(t);if(!n)return()=>{};let o=cn(t),r=()=>{let c=cn(t);c!==o&&(o=c,e(c))},i=t.defaultView?.MutationObserver,l=i?new i(r):null;l?.observe(n,{attributes:!0,attributeFilter:[Ro]});let s=Oo(t);return s?.addEventListener?.("change",r),t.addEventListener(Pa,r),()=>{l?.disconnect(),s?.removeEventListener?.("change",r),t.removeEventListener(Pa,r)}}var El={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Al={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Ml={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Sl={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Rt={};for(let[e,t]of Object.entries(Al))Rt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Sl))Rt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Ml))Rt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(El.renames.map(e=>[e.old,e.new]));function Vo(e){let t=Rt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function D(e){return Vo(e).prop}function a(e){return`var(${D(e)})`}function Cl(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(D(t)));return Number.isFinite(n)?n:0}function q(e,t){let n=Vo(t),o=e.ownerDocument??document,r=o.createElement("span");r.dataset.ncLive=t,r.style.position="absolute",r.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?r.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?r.style.paddingLeft=i:r.style.color=i,(e instanceof Element?e:o.documentElement).append(r);let l=(o.defaultView??window).getComputedStyle(r),s=n.kind==="family"?l.fontFamily:n.kind==="color"?l.color:l.paddingLeft;return r.remove(),s}function _o(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Ll(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var Tl="[data-modulated], [data-modulated] *";function Wt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Na(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function zl(){let e=o=>`
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
${Tl} { transition: none; }
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
${Na("")}
}
@media (max-width: 1023px) {
${Na("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Wt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Wt("")}
}
@media (max-width: 1023px) {
${Wt("html[data-nc-landscape] ")}
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
`}var Yt=null,Il="nc-ui-fallback";function Go(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Yt&&Yt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Il} {
${zl()}
}
`,e.head.append(t),Yt=t}var Fl=new URL("/calliope/assets/confirm-BSJWrX8s.css",import.meta.url).href,Pl=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Fl,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Pl(document);function Uo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let r=t.createElement("span");r.dataset.ncOn="",r.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",o.append(r,i),n.append(o);let l=!1,s=p=>{l=p===!0,n.setAttribute("aria-checked",l?"true":"false")};s(e.checked);let c=()=>{s(!l),e.onChange?.(l)};return n.addEventListener("click",c),{el:n,get checked(){return l},set:s,destroy(){n.removeEventListener("click",c),n.remove()}}}var Wo=new WeakMap,Da=.25;function Nl(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let r=t.createElement("span");r.className="nc-fader-cap",r.setAttribute("aria-hidden","true"),n.append(o,r);let i=0,l=e.step??.005,s=e.onChange,c=e.onReset,p=m=>Math.min(1,Math.max(0,m)),d=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},u=m=>{let g=p(m);g!==i&&(i=g,d(),s?.(g))},h=0,f=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();m.target!==r&&g.height>0&&u(1-(m.clientY-g.top)/g.height),h=m.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!f)return;let g=n.getBoundingClientRect().height||1,y=(h-m.clientY)/g*(m.shiftKey?Da:1);h=m.clientY,u(i+y)});let b=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",m=>{m.preventDefault(),c?.()}),n.addEventListener("keydown",m=>{let g=m.shiftKey?l*Da:l,y={ArrowUp:i+g,ArrowRight:i+g,ArrowDown:i-g,ArrowLeft:i-g,PageUp:i+l*10,PageDown:i-l*10,Home:0,End:1};m.key in y&&(m.preventDefault(),u(y[m.key]))});let w={el:n,get value(){return i},get dragging(){return f},set(m){f||(i=p(Number(m)||0),d())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(l=m.step),m.onChange&&(s=m.onChange),m.onReset&&(c=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),Wo.set(n,w),w}function Dl(e){return Wo.get(e)}var Yo=new WeakMap,ql=.2,jl=1.5,Rl=.5;function Bl(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function qa(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Bl(o.getComputedStyle(e).getPropertyValue(D(t)),n)}function Ol(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let r=t.createElement("button");r.type="button",r.className="nc-meter-clip",r.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let l=[];for(let w=0;w<n;w++){let m=t.createElement("span");m.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",m.append(g,y,x),i.append(m),l.push({peak:g,rms:y,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(r,i);let s=e.label,c=e.onClear,p=!1,d=-1,u=-1,h=()=>{r.dataset.lit=p?"true":"false",r.setAttribute("aria-pressed",p?"true":"false"),r.setAttribute("aria-label",p?`${s} clipped: clear`:`${s} clip light`),r.title=p?"Clipped. Click to clear":"Clip light"},f=(w,m,g,y)=>{let x=Math.round(y*1e3)/1e3;g[m]!==x&&(g[m]=x,w.style.transform=m==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};r.addEventListener("click",()=>{b.clear(),c?.()});let b={el:o,get clipped(){return p},update(w,m){d<0&&(d=qa(o,"motion-meter-fall",ql)),u<0&&(u=qa(o,"motion-meter-hold",jl));let g=Math.max(0,Math.min(.25,Number(m)||0)),y=d>0?Math.exp(-g/d):0;l.forEach((x,E)=>{let A=w[E]??w[0]??{peak:0,rms:0},S=Math.min(1,Math.max(0,Number(A.peak)||0)),M=Math.min(S,Math.max(0,Number(A.rms)||0));A.over&&b.clip(),x.level.peak=S>=x.level.peak?S:S+(x.level.peak-S)*y,x.level.rms=M>=x.level.rms?M:M+(x.level.rms-M)*y,x.holdAge+=g,S>=x.holdAt?(x.holdAt=S,x.holdAge=0):x.holdAge>u&&(x.holdAt=Math.max(S,x.holdAt-Rl*g)),f(x.peak,"peak",x.shown,x.level.peak),f(x.rms,"rms",x.shown,x.level.rms),f(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){p||(p=!0,h())},clear(){p=!1,h()},reset(){for(let w of l)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,f(w.peak,"peak",w.shown,0),f(w.rms,"rms",w.shown,0),f(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){s=w,h()},configure(w){w.onClear&&(c=w.onClear)}};return h(),b.reset(),Yo.set(o,b),b}function Hl(e){return e?Yo.get(e):void 0}var Vl=3,_l=new Set(["freq","q","rate","time","log"]);function Vn(e,t,n){return!e||!_l.has(e)||!(n>t)?"linear":t>0?"log":"power"}function rt(e,t,n){return Vn(e,t,n)!=="linear"}function Tt(e,t,n,o){let r=Number(o);if(!(n>t)||!Number.isFinite(r))return 0;let i=Math.min(n,Math.max(t,r)),l=Vn(e,t,n);if(l==="log")return Math.log(i/t)/Math.log(n/t);let s=(i-t)/(n-t);return l==="power"?Math.cbrt(s):s}function Ko(e,t,n,o){let r=Math.min(1,Math.max(0,Number(o)||0)),i=Vn(e,t,n);return i==="log"?t*(n/t)**r:t+(n-t)*(i==="power"?r**Vl:r)}function Jo(e,t,n,o){let r=Math.min(n,Math.max(t,e));if(o>0){r=t+Math.round((r-t)/o)*o;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));r=Number(r.toFixed(i)),r=Math.min(n,Math.max(t,r))}return r}function et(e,t,n,o){return Math.round(Tt(e,t,n,o)*1e3)}function zt(e,t,n,o,r){return Jo(Ko(e,t,n,Number(o)/1e3),t,n,r)}function Gl(e,t,n=!1){let o=Number(e)||0,r=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=o+r:t==="ArrowLeft"||t==="ArrowDown"?i=o-r:t==="PageUp"?i=o+1e3/10:t==="PageDown"?i=o-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function _n(e,t,n,o,r,i=!1,l){let s=et(e,t,n,o),c=Gl(s,r,i);if(c===null)return null;let p=zt(e,t,n,c,l),d=Math.sign(c-s),u=Jo(Number(o),t,n,l);for(;d!==0&&p===u&&c>0&&c<1e3;)c+=d,p=zt(e,t,n,c,l);return p}function ja(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ul(e,t,n,o=n/6){let r=e.some(d=>d===null),i=Math.max(0,n-(r?o:0)),l=e.reduce((d,u,h)=>u===null?d:d+ja(t[h]),0),s=l>0?i/l:0,c=e.map(d=>d===null?0:Math.min(i,ja(d)*s));if(r){let d=c.reduce((h,f)=>h+f,0),u=e.indexOf(null);c[u]=Math.max(o,n-d)}let p=[0];for(let d of c)p.push(Math.round((p[p.length-1]+d)*100)/100);return r&&(p[p.length-1]=n),p}function Wl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.floor(t*o)),i=Math.max(1,Math.floor(n*o));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function pe(e){return Math.max(0,Math.min(1,e))}function Xo(e,t){let{ctx:n,w:o,h:r}=Wl(e);if(!n)return;n.clearRect(0,0,o,r);let i=Ll(e);if(t.paint==="swatch"){let c=q(e,"accent"),p=q(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=p,n.fillStyle=c,n.fillRect(0,0,o/2,r),n.fillStyle=p,n.fillRect(o/2,0,o/2,r);return}if(t.paint==="filter"&&typeof t.hz=="number"){Jl(n,o,r,t,e,i);return}if(t.paint==="filter"){let c=t.mode??"lp",p=q(e,_o(c)),d=q(e,"divider"),u=pe(t.cutoff??.5),h=.08+(1-pe(t.resonance??.2))*.22;n.strokeStyle=d,n.beginPath(),n.moveTo(0,r*.72),n.lineTo(o,r*.72),n.stroke(),n.beginPath();for(let f=0;f<=o;f++){let b=f/Math.max(1,o),w=0;c==="lp"?w=b<u?1:Math.max(0,1-(b-u)/h):c==="hp"?w=b>u?1:Math.max(0,1-(u-b)/h):w=Math.max(0,1-Math.abs(b-u)/h);let m=r*.78-w*r*.62;f===0?n.moveTo(f,m):n.lineTo(f,m)}n.strokeStyle=p,n.stroke(),n.fillStyle=q(e,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,r),e.dataset.ncAccent=p;return}if(t.paint==="envelope"){n.strokeStyle=q(e,"accent");let c=Math.max(0,t.attack??0),p=Math.max(0,t.decay??.4),[d,u,h]=Ul([c,p],t.max??[1,4],o),f=2,b=r-1;n.beginPath(),n.moveTo(d,b),n.lineTo(u,f);let w=Math.max(1,Math.ceil(h-u));for(let m=1;m<=w;m++){let g=m/w;n.lineTo(u+(h-u)*g,b-(b-f)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(h,b),n.lineTo(o,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[p,d]=Array.isArray(t.region)?t.region:[0,1],u=q(e,"accent"),h=q(e,"text-sub"),f=r/2;n.fillStyle=q(e,"accent-soft"),n.fillRect(pe(p)*o,0,(pe(d)-pe(p))*o,r),n.strokeStyle=q(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(o,f),n.stroke();let b=Math.floor(c.length/2);for(let w=0;w<b;w++){let m=(w+.5)/b*o,g=Math.max(-1,Math.min(1,c[w*2]??0)),y=Math.max(-1,Math.min(1,c[w*2+1]??0)),x=(w+.5)/b;n.strokeStyle=x>=p&&x<=d?u:h,n.beginPath(),n.moveTo(m,f-y*(f-1)),n.lineTo(m,f-g*(f-1)+.5),n.stroke()}n.strokeStyle=u;for(let w of[p,d,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(pe(w)*(o-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,r),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=q(e,"text"),n.fillRect(Math.round(pe(t.position)*(o-1)),0,1,r)),b||(n.fillStyle=h,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=pe(t.level??0);n.fillStyle=q(e,"divider"),n.fillRect(0,r*.4,o,r*.2),n.fillStyle=q(e,"accent"),n.fillRect(0,r*.4,o*c,r*.2),e.dataset.ncAccent=n.fillStyle;return}let l=Math.max(1,t.steps??16),s=((t.step??0)%l+l)%l;n.fillStyle=q(e,"rhythm.step-cell-off"),n.fillRect(0,r*.45,o,r*.1),n.fillStyle=q(e,"rhythm.playhead"),n.fillRect(s/l*o,r*.3,Math.max(1,o/l),r*.4),e.dataset.ncAccent=q(e,"accent")}var We=20,dn=2e4,Kt=24,Ra=-60;function Yl(e,t,n,o,r=48e3){let i=2*Math.PI*Math.min(t,r*.49)/r,l=Math.cos(i),s=Math.sin(i)/(2*n),c,p,d;e==="hp"?[c,p,d]=[(1+l)/2,-(1+l),(1+l)/2]:e==="bp"?[c,p,d]=[s,0,-s]:[c,p,d]=[(1-l)/2,1-l,(1-l)/2];let u=1+s,h=-2*l,f=1-s,b=2*Math.PI*o/r,w=(x,E,A)=>x+E*Math.cos(b)+A*Math.cos(2*b),m=(x,E)=>-(x*Math.sin(b)+E*Math.sin(2*b)),g=Math.hypot(w(c,p,d),m(p,d)),y=Math.hypot(w(u,h,f),m(h,f));return y>0?g/y:0}function Kl(e,t){return Math.log(Math.max(We,Math.min(dn,e))/We)/Math.log(dn/We)*t}function Ba(e,t,n){let o=Math.max(Ra,Math.min(Kt,e));return t+(Kt-o)/(Kt-Ra)*(n-t)}function Jl(e,t,n,o,r,i){let l=o.mode??"lp",s=q(r,_o(l)),c=q(r,"divider"),p=q(r,"text-sub"),d=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,h=Math.max(u+4,n-d-3),f=o.q??Math.SQRT1_2,b=Math.round(Ba(0,u,h))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let m=We*(dn/We)**(w/Math.max(1,t)),g=o.open?1:Yl(l,o.hz,f,m,o.sampleRate),y=Ba(20*Math.log10(Math.max(1e-5,g)),u,h);w===0?e.moveTo(w,y):e.lineTo(w,y)}if(e.strokeStyle=s,e.stroke(),!o.open){let w=Math.round(Kl(o.hz,t))+.5;e.strokeStyle=p,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,u),e.lineTo(w,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=p,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",r.dataset.ncAccent=s,r.dataset.ncFilterHz=String(Math.round(o.hz))}function ae(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let r=n.defaultView.getComputedStyle(o).color;return o.remove(),r}function Xl(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Ee=20,lt=2e4,Gn=Math.log(lt/Ee),pn=32,Ql=250,Zl=-100,es=1200,ts=4.5,Oa=-6,xe=-96,ns=48,Ha=[100,1e3,1e4],as=[6,12];function Pe(e,t){return Math.log(Math.max(Ee,Math.min(lt,e))/Ee)/Gn*t}function xt(e,t){return Ee*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Gn)}function fe(e,t,n,o){let r=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*r}function un(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Qo=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function os(e,t,n,o){let r=n?3:1,i=c=>({db:Math.max(-o,Math.min(o,e.db+c*r))}),l=c=>({hz:Math.max(e.minHz??Ee,Math.min(e.maxHz??lt,e.hz*2**(c*r/6)))}),s=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*r)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?l(1):i(1);case"ArrowLeft":return e.moveHz?l(-1):i(-1);case"PageUp":return e.moveQ?s(1):null;case"PageDown":return e.moveQ?s(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Un(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function is(e,t,n,o,r,i,l,s,c){let p=c?.25:1,d={},u=Math.max(1,i/2-s);if(d.db=Math.max(-l,Math.min(l,t.db-o*p/u*l/Un(e))),e.moveHz){let h=t.hz*Math.exp(n*p/Math.max(1,r)*Gn);d.hz=Math.max(e.minHz??Ee,Math.min(e.maxHz??lt,h))}return d}function rs(e,t,n,o,r){let i=Math.max(0,n.left)+1,l=Math.min(n.right,r)-1,s=Math.min(t.width*3+o*2,l-i),c=Math.max(i,Math.min(e.left,l-s));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(s)}}var B=new WeakMap;function ls(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let r=document.createElement("canvas");r.className="nc-eq-spectrum",r.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-eq-tip",l.setAttribute("aria-hidden","true"),l.hidden=!0,o.append(r,i);for(let c of e.bands)o.append(ss(n,c,t));o.append(l),o.addEventListener("click",c=>{if(!oi(n)||c.button>0)return;let p=ai(n)?.querySelector("[data-nc-max-toggle]");p instanceof HTMLElement&&p.click()}),n.append(o);let s=document.createElement("i");return s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s),B.set(n,{control:e,cache:null,spec:null,active:null}),ei(n,e),n}function Zo(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function ss(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let r=()=>{let p=n(e);return p?.type==="eqGraph"?p:null},i=()=>r()?.bands.find(p=>p.id===t.id)??null,l=null;o.addEventListener("pointerdown",p=>{if(p.button!==0)return;let d=i();d&&(p.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(p.pointerId),l={id:p.pointerId,x:p.clientX,y:p.clientY,start:{hz:d.hz,db:d.db}},o.dataset.drag="true",ue(e,t.id))}),o.addEventListener("pointermove",p=>{if(!l||p.pointerId!==l.id)return;let d=r(),u=i(),h=B.get(e);if(!d||!u||!h?.box)return;let{w:f,h:b,pad:w}=h.box;d.onBand(u.id,is(u,l.start,p.clientX-l.x,p.clientY-l.y,f,b,d.range??18,w,p.shiftKey))});let s=p=>{!l||p.pointerId!==l.id||(l=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&ue(e,null))};o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("dblclick",p=>{p.preventDefault(),r()?.onReset?.(t.id)}),o.addEventListener("keydown",p=>{let d=r(),u=i();if(!d||!u)return;let h=os(u,p.key,p.shiftKey,d.range??18);h&&(p.preventDefault(),h==="reset"?d.onReset?.(u.id):d.onBand(u.id,h),ue(e,u.id))});let c=null;return o.addEventListener("wheel",p=>{let d=r(),u=i();if(!d||!u?.moveQ)return;p.preventDefault();let h=p.timeStamp;(!c||h-c.t>400)&&(c={q:u.q,t:h});let f=p.deltaMode===1?p.deltaY*16:p.deltaMode===2?p.deltaY*400:p.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-f/240))),c.t=h,d.onBand(u.id,{q:c.q}),ue(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>ue(e,t.id)),o.addEventListener("focus",()=>ue(e,t.id)),o.addEventListener("pointerleave",()=>{!l&&e.ownerDocument.activeElement!==o&&ue(e,null)}),o.addEventListener("blur",()=>{l||ue(e,null)}),o}function ue(e,t){let n=B.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?je(e):Wn(e)}function Wn(e){let t=B.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(o&&b.dataset.band===o.id?b.dataset.active="true":delete b.dataset.active);if(!o||!t.box){n.hidden=!0;return}let r=[o.label,Qo(o.db)];o.kind==="peak"?r.push(un(o.hz),`Q ${o.q.toFixed(1)}`):r.push(`${o.kind==="lowshelf"?"below":"above"} ${un(o.hz)}`),n.textContent=r.join(" · "),n.dataset.tone=String(cs(t.control,o)),n.hidden=!1;let{w:i,h:l,pad:s}=t.box,c=Pe(o.hz,i),p=fe(o.db*Un(o),l,t.control.range??18,s),d=n.offsetWidth,u=n.offsetHeight,h=Math.max(0,Math.min(i-d,c-d/2)),f=p-u-s*1.5>=0?p-u-s*1.5:Math.min(l-u,p+s*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(f)}px`}function cs(e,t){return e.bands.indexOf(t)%3+1}function ei(e,t){let n=B.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Yn(e);let o=t.range??18;t.bands.forEach((r,i)=>{let l=Zo(e,r.id);l instanceof HTMLElement&&(l.dataset.tone=String(i%3+1),l.dataset.kind=r.kind,l.setAttribute("aria-label",`${r.label} band`),l.setAttribute("aria-valuemin",String(-o)),l.setAttribute("aria-valuemax",String(o)),l.setAttribute("aria-valuenow",String(r.db)),l.setAttribute("aria-valuetext",r.valueText??`${Qo(r.db)}, ${un(r.hz)}`),l.setAttribute("aria-keyshortcuts",r.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),r.help?l.setAttribute("data-nc-help",r.help):l.removeAttribute("data-nc-help"))}),je(e),fs(e)}function ti(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,r=Math.max(1,Math.round(t*o)),i=Math.max(1,Math.round(n*o));(e.width!==r||e.height!==i)&&(e.width=r,e.height=i);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function ni(e){return{curve:ae(e,"eq-curve"),fill:ae(e,"eq-fill"),quiet:ae(e,"text-sub"),grid:ae(e,"eq-grid"),zero:ae(e,"divider"),label:ae(e,"text-sub"),spectrum:ae(e,"eq-spectrum"),bands:[ae(e,"eq-band-1"),ae(e,"eq-band-2"),ae(e,"eq-band-3")]}}function ds(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function je(e){B.has(e)&&Yn(e);let t=B.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:r,w:i,h:l}=ti(n);if(!r)return;let s=Math.max(8,Math.round(l*.06)),c=o.range??18;t.box={w:i,h:l,pad:s},t.colours=ni(e);let p=t.colours,d=ds(o,i);if(!t.cache||t.cache.key!==d){let E=Math.max(64,Math.ceil(i)+1),A=new Float64Array(E);for(let M=0;M<E;M++)A[M]=xt(M/(E-1)*i,i);let S=null;try{S=typeof o.response=="function"?o.response(A):null}catch{S=null}t.cache={key:d,freqs:A,total:S?.total??new Float64Array(E),bands:S?.bands??[]}}r.clearRect(0,0,i,l);let u=Xl(e),h=o.on!==!1;ps(r,i,l,c,s,p,u);let{freqs:f,total:b,bands:w}=t.cache,m=Array.from(f,E=>Pe(E,i)),g=fe(0,l,c,s);w.forEach((E,A)=>{if(!E||!E.some(z=>Math.abs(z)>.05))return;let S=h?p.bands[A%3]:p.quiet,M=Array.from(E,z=>fe(z,l,c,s));r.save(),t.active&&o.bands[A]?.id===t.active&&(r.globalAlpha=.14,r.fillStyle=S,Va(r,m,M,g)),r.globalAlpha=h?.75:.4,r.strokeStyle=S,r.lineWidth=.75,Jt(r,m,M),r.restore()});let y=Array.from(b,E=>fe(E,l,c,s)),x=h?p.curve:p.quiet;r.save(),r.fillStyle=h?p.fill:p.quiet,r.globalAlpha=h?.2:.08,Va(r,m,y,g),r.restore(),r.save(),r.strokeStyle=h?p.fill:x,r.lineJoin="round",r.lineCap="round",h&&(r.globalAlpha=.16,r.lineWidth=4,Jt(r,m,y)),r.globalAlpha=1,r.strokeStyle=x,r.lineWidth=1.25,Jt(r,m,y),r.restore(),us(e),Wn(e)}function ps(e,t,n,o,r,i,l){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let p=1;p<=9;p++){let d=c*p;if(d<Ee||d>lt)continue;let u=Math.round(Pe(d,t))+.5;e.globalAlpha=Ha.includes(d)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of as)if(!(c>o))for(let p of[1,-1]){let d=Math.round(fe(c*p,n,o,r))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,d),e.lineTo(t,d),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let s=Math.round(fe(0,n,o,r))+.5;e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke(),e.font=l,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Ha){let p=c>=1e3?`${c/1e3}k`:String(c),d=e.measureText(p).width,u=Pe(c,t)+3;e.fillText(p,u+d+2>t?Pe(c,t)-d-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let p=fe(c,n,o,r);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(p)-1)}e.restore()}function It(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let r=(t[o]+t[o+1])/2,i=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],r,i)}e.lineTo(t[t.length-1],n[n.length-1])}function Jt(e,t,n){e.beginPath(),It(e,t,n),e.stroke()}function Va(e,t,n,o){e.beginPath(),It(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function ai(e){return e.closest("[data-nc-maxable]")}function oi(e){let t=ai(e);return!!t&&!t.hasAttribute("data-nc-max")}function Yn(e){let t=oi(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=B.get(e);n?.active&&(n.active=null,Wn(e))}return t}function us(e){Yn(e);let t=B.get(e);if(!t?.box)return;let{w:n,h:o,pad:r}=t.box,i=t.control.range??18;for(let l of t.control.bands){let s=Zo(e,l.id);s instanceof HTMLElement&&(s.style.left=`${Pe(l.hz,n).toFixed(1)}px`,s.style.top=`${fe(l.db*Un(l),o,i,r).toFixed(1)}px`)}}function hs(e,t,n,o){let r=o/2/n,i=new Float32Array(e),l=new Float32Array(e),s=new Float32Array(e);for(let c=0;c<e;c++){let p=(c-.5)/(e-1)*t,d=(c+.5)/(e-1)*t,u=xt(p,t),h=xt(d,t),f=xt(c/(e-1)*t,t);i[c]=Math.min(n-1,u/r),l[c]=Math.min(n-1,h/r),s[c]=ts*Math.log2(f/1e3)}return{lo:i,hi:l,tilt:s}}function ms(e,t,n){let o=Math.floor(t),r=Math.ceil(n);if(r-o<=1){let l=t-o,s=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??s;return s+(c-s)*l}let i=-1/0;for(let l=o;l<=r&&l<e.length;l++)e[l]>i&&(i=e[l]);return i}function fs(e){let t=B.get(e);if(t){if(!t.control.spectrum){ri(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let r=B.get(e)?.spec;r&&(r.visible=o.some(i=>i.isIntersecting),hn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}hn(e)}}function hn(e){let t=B.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){ii(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=mn(e),n.onVis||(n.onVis=()=>hn(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&fn(e,!1)}function mn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function fn(e,t){let n=B.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,Xt(e,mn(e))),Ql):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(r=>(n.raf=0,Xt(e,r))):n.timer=o.setTimeout(()=>(n.timer=0,Xt(e,mn(e))),pn))}function ii(e){let t=B.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function ri(e){let t=B.get(e)?.spec;if(!t)return;ii(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=B.get(e);n&&(n.spec=null)}function Xt(e,t){let n=B.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){ri(e);return}if(!o.analyser)return;if(t-o.last<pn-4&&!o.idle){fn(e,!1);return}let r=o.last?Math.min(.25,(t-o.last)/1e3):pn/1e3;o.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:l,w:s,h:c}=ti(i);if(!l)return;let p=Math.max(16,Math.round(s/2)),d=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==p||o.map.w!==s||o.map.sr!==d)&&(o.map={cols:p,w:s,sr:d,...hs(p,s,o.buf.length,d)},o.disp=new Float32Array(p).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,h=ns*r,{lo:f,hi:b,tilt:w}=o.map;for(let g=0;g<p;g++){let y=ms(o.buf,f[g],b[g]);y>u&&(u=y);let x=y+w[g],E=o.disp[g]-h;o.disp[g]=x>E?x:E}u>Zl&&(o.loud=t);let m=t-o.loud>es;l.clearRect(0,0,s,c),(!m||o.disp.some(g=>g>xe))&&gs(l,s,c,o.disp,n.colours??ni(e)),o.idle=m&&!o.disp.some(g=>g>xe),fn(e,o.idle)}function gs(e,t,n,o,r){let i=o.length,l=new Array(i),s=new Array(i),c=p=>{let d=o[Math.max(0,Math.min(i-1,p))];return Number.isFinite(d)?d:xe};for(let p=0;p<i;p++){let d=c(p)*.36+(c(p-1)+c(p+1))*.22+(c(p-2)+c(p+2))*.1,u=(Math.max(xe,Math.min(Oa,Number.isFinite(d)?d:xe))-xe)/(Oa-xe);l[p]=p/(i-1)*t,s[p]=n-u*n}e.save(),e.fillStyle=r.spectrum,e.globalAlpha=.13,e.beginPath(),It(e,l,s),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=r.spectrum,e.lineWidth=1,e.beginPath(),It(e,l,s),e.stroke(),e.restore()}var bs=.8912509381337456,gn=32,ws=250,xs=1200,vs=.2,li=1.5;function ys(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function $s(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let r=e.createElement("span");r.className="nc-fx-level-fill",o.append(r),t.append(o)}return t}var Ft=new WeakMap,_a=new WeakMap;function Ga(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let r=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(r);return Number.isFinite(i)?r.endsWith("ms")?i/1e3:i:n}function ks(e){let t=_a.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(r=>{for(let i of r){let l=Ft.get(i.target);l&&(l.seen.set(i.target,i.isIntersecting),Ye(l))}Ie(t)})),e.addEventListener("visibilitychange",()=>{for(let r of t.recs)Ye(r);Ie(t)}),_a.set(e,t),t}var si=e=>e.els.some(t=>t.isConnected);function Es(e){if(!e.loop.io)return si(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Ye(e){let t=!e.dead&&!!e.source&&Es(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Kn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),xn(e))}function Kn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Ie(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){ci(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Kn(e)),!e.raf&&!e.timer&&bn(e,!1)}function bn(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Ua(e,Kn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),ws):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(r=>(e.raf=0,Ua(e,r))):e.timer=n.setTimeout(()=>(e.timer=0,o()),gn)}function ci(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ua(e,t){if(t-e.last<gn-4&&!e.idle&&e.last){bn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):gn/1e3;e.last=t,e.frames++;let o=!1,r=!1;for(let i of e.recs){if(!si(i)){(i.placed||e.frames-i.born>90)&&di(i);continue}i.placed=!0,i.open&&(r=!0,As(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(o=!0))}if(!r){ci(e);return}e.idle=t-e.loud>xs&&!o,bn(e,e.idle)}function As(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Ga(h,"motion-meter-fall",vs),e.hold=Ga(h,"motion-meter-hold",li)}let o=null;try{o=e.source.read()}catch{o=null}let r=typeof o=="number",i=r?o:Number(o?.in)||0,l=!r&&o!==null&&typeof o=="object"&&typeof o.out=="number",s=l&&Number(o.out)||0,c=l?"2":"1";if(e.rows!==c){e.rows=c;for(let h of e.els)h.dataset.ncRows=c}let p=e.fall>0?Math.exp(-t/e.fall):0,d=[i,s],u=!1;for(let h=0;h<2;h++){let f=ys(d[h]);f>0&&(u=!0),e.disp[h]=f>=e.disp[h]?f:f+(e.disp[h]-f)*p,e.disp[h]<.001&&(e.disp[h]=0),d[h]>=bs&&(e.clipAt[h]=n);let b=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;wn(e,h,e.disp[h],b)}return u}function wn(e,t,n,o){let r=Math.round(n*1e3)/1e3,i=o?"true":"false";if(!(e.shown[t]===r&&e.clipShown[t]===i)){e.shown[t]=r,e.clipShown[t]=i;for(let l of e.els){let s=l.children[t]?.firstElementChild;s&&(s.style.transform=`scaleY(${r})`,s.dataset.clip=i)}}}function xn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,wn(e,0,0,!1),wn(e,1,0,!1)}function di(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ft.get(t)===e&&Ft.delete(t)}function Ms(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,r=ks(o),i={els:n,source:t??null,loop:r,open:!1,dead:!1,seen:new Map,born:r.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:li,rows:""};for(let l of n)Ft.set(l,i),r.io?.observe(l);if(r.recs.add(i),xn(i),!r.io){let l=o.defaultView,s=()=>{Ye(i),Ie(r)};typeof l?.requestAnimationFrame=="function"?l.requestAnimationFrame(s):setTimeout(s,0)}return{set(l){let s=l??null;if(!i.dead){if(s===i.source){Ye(i),Ie(r);return}i.open&&(i.open=!1,i.source?.close?.(),xn(i)),i.source=s,Ye(i),Ie(r)}},destroy(){i.dead||di(i),Ie(r)}}}var pi={slop:8,longPressMs:500,pitchPx:16},Ss=class{constructor(e,t,n=pi){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let r=this.hit(t,n);return r<0?!1:(this.phase="pending",this.pointer=e,this.pad=r,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let r=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(r,i)<this.config.slop)return;Math.abs(i)>=Math.abs(r)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-i/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(t,n);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Cs(e,t,n,o=pi){let r=!1,i=0,l=(p,d)=>{let u=e.ownerDocument.elementFromPoint?.(p,d),h=[...e.querySelectorAll(t)],f=u?h.findIndex(m=>m===u||m.contains(u)):-1;if(f>=0)return f;let b=-1,w=Number.POSITIVE_INFINITY;return h.forEach((m,g)=>{if(m.hidden)return;let y=m.getBoundingClientRect();if(d<y.top||d>y.bottom)return;let x=Math.abs(p-(y.left+y.width/2));x<w&&x<=y.width&&(b=g,w=x)}),b},s=new Ss(l,p=>{(p.kind==="paint"||p.kind==="long")&&(r=!0),n(p)},o),c=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",p=>{p.button>0||(r=!1,s.down(p.pointerId,p.clientX,p.clientY,p.timeStamp)&&(c(),i=setTimeout(()=>s.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",p=>{s.state!=="idle"&&(s.move(p.pointerId,p.clientX,p.clientY,p.timeStamp),s.state!=="pending"&&c())}),e.addEventListener("pointerup",p=>{c(),s.up(p.pointerId,p.clientX,p.clientY,p.timeStamp)}),e.addEventListener("pointercancel",p=>{c(),s.cancel(p.pointerId)}),e.addEventListener("click",p=>{r&&(r=!1,p.stopPropagation(),p.preventDefault())},!0),e.addEventListener("contextmenu",p=>p.preventDefault()),s}var ui="netcomposer.groups.v1";function Jn(){try{return globalThis.localStorage??null}catch{return null}}function hi(e=Jn(),t=ui){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[r,i]of Object.entries(n))typeof i=="boolean"&&o.set(r,i);return o}catch{return new Map}}function Ls(e,t,n,o=ui){let r=hi(e,o);r.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(r)))}catch{}}function Ts(e,t=Jn()){return hi(t).get(e.id)??e.open===!0}function zs(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let r=document.createElement("button");r.type="button",r.className="nc-group-toggle",r.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let l=document.createElement("span");l.className="nc-group-summary";let s=document.createElement("span");s.className="nc-group-mark",s.setAttribute("aria-hidden","true"),r.append(i,l,s);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",r.id),r.setAttribute("aria-controls",c.id);for(let p of e.controls)c.append(n(p,t));return r.addEventListener("click",()=>{let p=o.dataset.ncOpen!=="true";Ls(Jn(),e.id,p),vn(o,p);let d=t(o);d?.type==="group"&&d.onToggle?.(p)}),o.append(r,c),mi(o,e),vn(o,Ts(e)),fi(o,e),o}function vn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let r=n?.querySelector(".nc-group-mark");r&&(r.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function mi(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function fi(e,t){mi(e,t)&&vn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),r=t.summary??"";o&&o.textContent!==r&&(o.textContent=r)}var ut="application/x-nc-pad",Wa="http://www.w3.org/2000/svg";function Is(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],r=[];for(let i=0;i<n;i++){let l=Math.floor(i*t/n),s=Math.max(l+1,Math.floor((i+1)*t/n)),c=0,p=0;for(let u=l;u<s;u++)c=Math.min(c,e[2*u]??0),p=Math.max(p,e[2*u+1]??0);let d=n===1?50:i/(n-1)*100;o.push(`${d.toFixed(1)} ${(10-Math.min(1,p)*10).toFixed(2)}`),r.push(`${d.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${r.reverse().join("L")}Z`}function Fs(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((r,i)=>o.append(Ps(n,i,t))),n.append(o),n.addEventListener("keydown",r=>{r.key==="Escape"&&vt(n)}),bi(n,e),n}function Ps(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let r=document.createElement("span");r.className="nc-padgrid-pad-bar",r.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let l=document.createElement("span");l.className="nc-padgrid-pad-hint";let s=document.createElement("span");s.className="nc-padgrid-pad-badge";let c=document.createElementNS(Wa,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let p=document.createElementNS(Wa,"path");return c.append(p),o.append(r,i,l,s,c),Ds(e,o,t,n),i.addEventListener("dblclick",()=>{let d=n(e);d?.type==="padGrid"&&d.onRename&&o.dataset.empty!=="true"&&gi(e,o,t,n)}),o.addEventListener("dragstart",d=>{if(o.dataset.empty==="true"||!d.dataTransfer){d.preventDefault();return}d.dataTransfer.setData(ut,String(t)),d.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",d=>{let u=d.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(ut)||(d.preventDefault(),d.stopPropagation(),d.dataTransfer&&(d.dataTransfer.dropEffect=u.includes(ut)&&!d.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",d=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let h=d.dataTransfer?.getData(ut);if(h!==void 0&&h!==""){d.preventDefault(),d.stopPropagation();let b=Number(h);b!==t&&u.onMove?.(b,t,d.altKey);return}let f=d.dataTransfer?.files?.[0];f&&(d.preventDefault(),d.stopPropagation(),u.onFile?.(t,f))}),o}function Ns(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Ds(e,t,n,o){let r=0,i=!1,l=0,s=0,c=()=>{window.clearTimeout(r),r=0};t.addEventListener("pointerdown",p=>{if(p.button!==0)return;i=!1,l=p.clientX,s=p.clientY,c();let d=o(e);d?.type==="padGrid"&&(d.onDown?.(n),!(d.onDown&&p.pointerType==="mouse")&&(r=window.setTimeout(()=>{r=0,i=Ya(e,t,n,o)},450)))}),t.addEventListener("pointermove",p=>{r&&Math.hypot(p.clientX-l,p.clientY-s)>8&&c()});for(let p of["pointerup","pointercancel","pointerleave"])t.addEventListener(p,c);t.addEventListener("contextmenu",p=>{p.preventDefault(),c(),i=Ya(e,t,n,o)}),t.addEventListener("click",()=>{if(i){i=!1;return}Ns(e,n,o)})}function Ya(e,t,n,o){let r=o(e);if(r?.type!=="padGrid"||!r.menu)return!1;let i=r.menu(n);if(!i.length)return!1;vt(e);let l=document.createElement("div");l.className="nc-slot-scrim",l.setAttribute("aria-hidden","true"),l.addEventListener("pointerdown",d=>{d.preventDefault(),d.stopPropagation(),vt(e)}),l.addEventListener("click",d=>d.stopPropagation());let s=document.createElement("div");s.className="nc-slot-menu nc-padgrid-pad-menu",s.setAttribute("role","menu"),s.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let d of i){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=d.id,u.textContent=d.label,u.addEventListener("click",()=>{vt(e);let h=o(e);h?.type==="padGrid"&&(d.id==="rename"&&h.onRename?gi(e,t,n,o):h.onMenu?.(n,d.id))}),s.append(u)}e.append(l,s);let c=e.getBoundingClientRect(),p=t.getBoundingClientRect();return s.style.left=`${p.left-c.left}px`,s.style.top=`${p.bottom-c.top}px`,s.querySelector("button")?.focus(),!0}function gi(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let r=o(e);if(r?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=r.nameMax??24,i.value=r.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();i.style.left=`${s.left-l.left}px`,i.style.top=`${s.top-l.top}px`,i.style.width=`${s.width}px`;let c=!1,p=d=>{if(c)return;c=!0;let u=i.value.trim();i.remove(),t.focus();let h=o(e);d&&u&&h?.type==="padGrid"&&h.onRename?.(n,u)};i.addEventListener("keydown",d=>{d.stopPropagation(),d.key==="Enter"?p(!0):d.key==="Escape"&&p(!1)}),i.addEventListener("blur",()=>p(!0));for(let d of["pointerdown","click","dblclick"])i.addEventListener(d,u=>u.stopPropagation());e.append(i),i.focus(),i.select()}function vt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function bi(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,r)=>{let i=n[r];if(!(i instanceof HTMLButtonElement))return;let l=i.querySelector(".nc-padgrid-pad-name"),s=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),p=i.querySelector(".nc-padgrid-pad-badge");p&&(p.textContent=o.empty?"":o.badge??""),i.draggable=!o.empty,o.empty?(i.dataset.empty="true",l&&(l.textContent=t.emptyLabel??"Load"),s&&(s.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,l&&(l.textContent=o.label),s&&(s.textContent=""),c?.setAttribute("d",Is(o.peaks))),o.lane?i.dataset.ncLane=String(o.lane):delete i.dataset.ncLane;let d=t.selected===r;d?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",d?"true":"false"),o.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",o.empty?`Pad ${r+1}, empty: load a sample`:`Pad ${r+1}, ${o.label}${o.badgeLabel?`, ${o.badgeLabel}`:""}${d?", selected":""}`)})}function U(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Bt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let r=document.createElement("span");return r.className="nc-readout",r.dataset.ncReadout="",n.append(o,r),n}function Ka(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function tt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var qs=450,Ja=8;function oe(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function js(e){let t=Cl(e,"target-min");return t>0?t:44}function Rs(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=js(e),o=n/2,r=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let l=t[i],s=r[i];if(!(l instanceof HTMLElement)||!s||s.width===0||s.height===0)continue;if(s.width>=n&&s.height>=n){l.style.display="none";continue}let c=s.left+s.width/2,p=s.top+s.height/2,d=c-o,u=c+o,h=p-o,f=p+o;for(let b=0;b<t.length;b++){if(i===b)continue;let w=r[b];if(!w||w.width===0)continue;let m=w.left+w.width/2,g=w.top+w.height/2;Math.abs(g-p)<o*2&&(m>c?u=Math.min(u,(c+m)/2):m<c&&(d=Math.max(d,(c+m)/2))),Math.abs(m-c)<o*2&&(g>p?f=Math.min(f,(p+g)/2):g<p&&(h=Math.max(h,(p+g)/2)))}d=Math.min(d,s.left),u=Math.max(u,s.right),h=Math.min(h,s.top),f=Math.max(f,s.bottom),l.style.left=`${d-s.left}px`,l.style.top=`${h-s.top}px`,l.style.width=`${Math.max(0,u-d)}px`,l.style.height=`${Math.max(0,f-h)}px`,l.style.transform="none"}}function wi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Xa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function $e(e,t){switch(e.type){case"slider":return Bs(e,t);case"select":return Hs(e,t);case"toggle":return Vs(e,t);case"button":return _s(e,t);case"readout":return Gs(e);case"label":return Ks(e);case"note":return Qa(e);case"knob":return Qs(e,t);case"choice":return Zs(e,t);case"slotRow":return ec(e,t);case"stepGrid":return oc(e,t);case"canvas":return sc(e);case"fx":return bc(e,t);case"eqGraph":return ls(e,t);case"group":return zs(e,t,$e);case"strip":return cc(e,t);case"stripAdd":return hc(e,t);case"padGrid":return Fs(e,t);case"moves":return Ws(e,t);default:return Qa({id:"unknown",text:""})}}function ee(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,yi(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(xi(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let r=e.querySelector("[data-nc-readout]");r&&(r.textContent=t.valueText??tt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ka(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ka(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ge(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Js(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??tt(t.value))}else if(t.type==="choice")$i(e,t);else if(t.type==="slotRow")Ei(e,t);else if(t.type==="stepGrid")$n(e,t);else if(t.type==="padGrid")bi(e,t);else if(t.type==="moves")vi(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Xo(n,t)}else if(t.type==="eqGraph")ei(e,t);else if(t.type==="strip"){Ci(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Ne(n.id)}"]`);o instanceof Element&&ee(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Mi(e,t);else if(t.type==="group"){fi(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Ne(n.id)}"]`);o instanceof Element&&ee(o,n)}}else if(t.type==="fx"){qi(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Ne(n.id)}"]`);o instanceof Element&&ee(o,n)}}}}function Bs(e,t){let n=Bt(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let r=rt(e.taper,e.min,e.max);o.min=String(r?0:e.min),o.max=String(r?1e3:e.max),o.step=String(r?1:e.step),r&&(o.dataset.ncTaper=e.taper),o.value=String(xi(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let i=s=>r?zt(s.taper??e.taper,s.min,s.max,o.value,s.step):Number(o.value);o.addEventListener("input",()=>{let s=t(o);s?.type==="slider"&&s.onChange(i(s))}),o.addEventListener("change",()=>{let s=t(o);s?.type==="slider"&&s.onCommit?.(i(s))}),r&&o.addEventListener("keydown",s=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let p=c.taper??e.taper,d=_n(p,c.min,c.max,c.value,s.key,s.shiftKey,c.step);d!==null&&(s.preventDefault(),o.value=String(et(p,c.min,c.max,d)),c.onChange(d),c.onCommit?.(d))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(o,l),e.onTap&&n.insertBefore(Os(e,o,t),l),n.append(U()),ee(n,e),n}function xi(e){return rt(e.taper,e.min,e.max)?et(e.taper,e.min,e.max,e.value):e.value}function Os(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(oe());let r=i=>{let l=n(t);l?.type==="slider"&&l.onTap?.(i)};return o.addEventListener("pointerdown",i=>{i.button===0&&r(i.timeStamp)}),o.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),r(i.timeStamp))}),o}function Hs(e,t){let n=Bt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let r=null;for(let i of e.options){let l=document.createElement("option");l.value=i.value,l.textContent=i.label,i.disabled&&(l.disabled=!0),i.group?r?.getAttribute("label")!==i.group&&(r=document.createElement("optgroup"),r.setAttribute("label",i.group),o.append(r)):r=null,(r??o).append(l)}return o.value=e.value,o.addEventListener("change",()=>{let i=t(o);i?.type==="select"&&i.onChange(o.value)}),n.append(o,U()),n}function Vs(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(U()),ee(n,e),n}function _s(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(U()),ee(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let r=document.createElement("button");return r.type="button",r.className="nc-sparkle-btn",r.dataset.ncSparkle=e.id,r.setAttribute("aria-label","Surprise me"),r.title=e.sparkleTitle??"Surprise me",r.innerHTML=wi(),r.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Ai(i);let l=t(n);l?.type==="button"&&l.onSparkle?.()}),o.append(n,r),o}function Gs(e){let t=Bt(e.id,e.label);return t.append(U()),ee(t,e),t}var Us=450;function Ws(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let r=document.createElement("div");r.className="nc-moves-row",r.setAttribute("role","group"),r.setAttribute("aria-label",o.label),o.title&&(r.title=o.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=o.label;let l=document.createElement("div");l.className="nc-moves-btns";for(let s of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=s.id,c.title=s.title??s.text,c.setAttribute("aria-label",`${o.label} ${s.text}`),c.append(Ys(s.icon)),c.addEventListener("click",()=>{let p=t(n);p?.type==="moves"&&p.onMove(s.id)}),l.append(c)}r.append(i,l),n.append(r)}return vi(n,e),n}function vi(e,t){for(let n of t.groups)for(let o of n.moves){let r=e.querySelector(`[data-nc-move="${Ne(o.id)}"]`);r instanceof HTMLButtonElement&&(r.disabled=o.disabled===!0)}}function Ys(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function Ks(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(U()),t}function Qa(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(U()),t}function Za(e){if(typeof e.valueText=="string")return e.valueText;let t=tt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function yi(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Js(e,t){let n=Tt(t.taper,t.min,t.max,t.value);yi(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let r=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Tt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,r))),e.style.setProperty("--knob-to",String(Math.max(o,r)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Za(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Za(t)}`}function Xs(e,t){if(rt(e.taper,e.min,e.max))return _n(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,r=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+r:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-r:null}function Qs(e,t){let n=Bt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let r=document.createElement("i");r.className="nc-knob-mark",o.append(r);let i=0,l=0;o.addEventListener("pointerdown",p=>{i=p.clientY;let d=t(o);l=d&&"value"in d?Number(d.value):0,o.setPointerCapture?.(p.pointerId),n.dataset.ncDragging="true"});let s=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("lostpointercapture",s),o.addEventListener("pointermove",p=>{if(o.hasPointerCapture&&!o.hasPointerCapture(p.pointerId))return;let d=t(o);if(d?.type!=="knob")return;if(rt(d.taper,d.min,d.max)){let f=Tt(d.taper,d.min,d.max,l)-(p.clientY-i)/120;d.onChange(Ko(d.taper,d.min,d.max,f));return}let u=d.max-d.min||1,h=Math.min(d.max,Math.max(d.min,l-(p.clientY-i)*u/120));d.onChange(h)}),o.addEventListener("dblclick",()=>{let p=t(o);p?.type==="knob"&&typeof p.defaultValue=="number"&&p.onChange(p.defaultValue)}),o.addEventListener("keydown",p=>{let d=t(o);if(d?.type!=="knob")return;let u=Xs(d,p);u!==null&&(p.preventDefault(),d.onChange(Math.min(d.max,Math.max(d.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(U()),ee(n,e),n}function Zs(e,t){let n=document.createElement("div");n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label);for(let o of e.options){let r=document.createElement("button");r.type="button",r.className="nc-choice",r.dataset.ncChoice=o.value,r.setAttribute("role","tab"),r.textContent=o.label,r.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(o.value)}),r.addEventListener("keydown",i=>{let l=[...n.querySelectorAll("[data-nc-choice]")],s=l.indexOf(r),c=s;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(s+1)%l.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(s-1+l.length)%l.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=l.length-1;else return;let p=l[c];p instanceof HTMLButtonElement&&(i.preventDefault(),p.focus(),p.click())}),n.append(r)}return n.append(U()),$i(n,e),n}function $i(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function ec(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let d=0;d<e.slots.length;d++){let u=e.slots[d],h=document.createElement("span");h.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(d),f.textContent=u.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(f,oe()),tc(h,f,n,d,t),o.append(h)}let r=e.onSparkle?document.createElement("button"):null;r&&(r.type="button",r.className="nc-sparkle",r.setAttribute("aria-label","Surprise me"),r.innerHTML=wi(),r.append(oe()),r.addEventListener("click",()=>{Ai(n);let d=t(n);d?.type==="slotRow"&&d.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let l=document.createElement("span");l.className="nc-label",l.textContent="Morph";let s=document.createElement("input");s.type="range",s.className="nc-range nc-morph",s.min="0",s.max="4",s.step="0.01",s.setAttribute("aria-label","Morph time"),s.addEventListener("input",()=>{let d=t(n);d?.type==="slotRow"&&d.onMorph(Number(s.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(l,c,s);let p=document.createElement("div");return p.className="nc-slot-line",p.append(o,...r?[r]:[]),n.append(p,i,U()),ki(n,t),Ei(n,e),n}function eo(e,t,n,o){let r=n(e);if(r?.type!=="slotRow")return;Ge(e);let i=o.shiftKey?"store":o.altKey?"clear":"recall";r.onSlot(t,i)}function tc(e,t,n,o,r){let i=0,l=0,s=0,c=!1,p=!1,d=!1,u=!1,h=()=>{window.clearTimeout(i),i=0},f=g=>{let y=g.clientX-l,x=g.clientY-s;y*y+x*x>Ja*Ja&&(c=!0,h())},b=()=>{u&&(u=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=g=>{let y=i!==0&&!c&&!p;h(),b(),y&&(d=!0,eo(n,o,r,g))},m=()=>{c=!0,h(),b()};e.addEventListener("pointerdown",g=>{g.button===0&&(b(),p=!1,c=!1,d=!1,l=g.clientX,s=g.clientY,h(),i=window.setTimeout(()=>{i=0,!c&&(p=!0,nc(n,t,o,r))},qs),u=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(d||p||c){d=!1,p=!1,c=!1;return}eo(n,o,r,g)})}function ki(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=to("Save","store"),r=to("Clear","clear");n.append(o,r);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),Ge(e)}),i.addEventListener("click",l=>l.stopPropagation()),e.append(i,n),n.addEventListener("click",l=>{let s=l.target;if(!(s instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let p=Number(n.dataset.ncIndex);s.dataset.ncSlotOp==="store"?(c.onSlot(p,"store"),Ge(e)):s.dataset.ncSlotOp==="clear"&&(c.onSlot(p,"clear"),Ge(e))}),e.addEventListener("keydown",l=>{l.key==="Escape"&&Ge(e)})}function to(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function nc(e,t,n,o){ki(e,o);let r=e.querySelector(".nc-slot-menu");if(!(r instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),r.hidden=!1,r.dataset.ncIndex=String(n);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();r.style.left=`${s.left-l.left}px`,r.style.top=`${s.bottom-l.top}px`,r.querySelector("button")?.focus()}function Ge(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Ei(e,t){for(let r of e.querySelectorAll("[data-nc-slot]")){if(!(r instanceof HTMLButtonElement))continue;let i=Number(r.dataset.ncSlot),l=t.slots[i];if(!l)continue;r.textContent=l.label,l.filled?r.dataset.filled="true":delete r.dataset.filled,l.active?r.dataset.active="true":delete r.dataset.active,l.edited?r.dataset.edited="true":delete r.dataset.edited,l.queued?r.dataset.queued="true":delete r.dataset.queued,l.queued&&l.pulse?r.dataset.pulse="true":delete r.dataset.pulse;let s=[l.filled?"saved":"empty",l.active?"playing":"",l.edited?"edited":"",l.queued?"queued, tap again to switch now":""];r.setAttribute("aria-label",[l.label,...s.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Ai(e){let t=e.dataset.ncLastFill||null,n=ml(t);e.dataset.ncLastFill=n;let o=fl(n);if(o)for(let[r,i]of Object.entries(o))e.style.setProperty(r,i)}function ac(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,r=i=>{if(o===i)return;o=i,n.setAttribute("aria-pressed",i?"true":"false");let l=t(e);l?.type==="stepGrid"&&l.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),r(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>r(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||r(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),r(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function oc(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let r=m=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=m,o.append(g),g},i=r("Note"),l=r("Accent");l.dataset.ncAccentMode="";let s=m=>{for(let g of[i,l]){let y=g===m;g.setAttribute("aria-checked",y?"true":"false"),g.tabIndex=y?0:-1}};s(i);for(let m of[i,l])m.addEventListener("click",()=>s(m));o.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let g=l.getAttribute("aria-checked")==="true"?i:l;s(g),g.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(ac(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),c.append(m)}n.append(c);for(let m of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=m.label,y.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(y.dataset.ncLane=String((m.lane-1)%4+1));let x=!1,E=0;y.addEventListener("pointerdown",M=>{x=!1,!(M.pointerType==="mouse"||M.button!==0)&&(E=window.setTimeout(()=>{let z=t(n);z?.type!=="stepGrid"||!z.selectedRows||(x=!0,z.onSelectRow?.(z.rows.findIndex(N=>N.id===m.id),!0))},Us))});for(let M of["pointerup","pointercancel","pointerleave"])y.addEventListener(M,()=>window.clearTimeout(E));y.addEventListener("contextmenu",M=>{x&&M.preventDefault()}),y.addEventListener("click",M=>{let z=t(n);if(z?.type!=="stepGrid")return;if(x){x=!1;return}let N=z.rows.findIndex(we=>we.id===m.id),ne=!!z.selectedRows&&(M.shiftKey||M.metaKey||M.ctrlKey);z.onSelectRow?.(N,ne)}),y.addEventListener("keydown",M=>ic(n,y,M));let A=[];for(let M of["mute","solo"]){if(!(M==="mute"?e.onMute:e.onSolo))continue;let z=document.createElement("span");z.className="nc-ms-wrap";let N=document.createElement("button");N.type="button",N.className="nc-ms",N.dataset.ncMs=M,N.textContent=M==="mute"?"M":"S",N.setAttribute("aria-label",`${M==="mute"?"Mute":"Solo"} ${m.label}`),z.append(N,oe()),z.addEventListener("click",()=>{let ne=t(n);if(ne?.type!=="stepGrid")return;let we=ne.rows.findIndex(Vt=>Vt.id===m.id);(M==="mute"?ne.onMute:ne.onSolo)?.(we)}),A.push(z)}let S=document.createElement("div");S.className="nc-steps";for(let M=0;M<m.steps.length;M++){let z=document.createElement("span");z.className="nc-step-wrap";let N=document.createElement("button");N.type="button",N.className="nc-step",N.dataset.ncStep=`${m.id}:${M}`,N.setAttribute("aria-label",`${m.label} step ${M+1}`),z.append(N,oe()),z.addEventListener("click",ne=>{let we=t(n);if(we?.type!=="stepGrid")return;let Vt=we.rows.findIndex(kr=>kr.id===m.id),$r=l.getAttribute("aria-checked")==="true";we.onToggle(Vt,M,ne.shiftKey||$r)}),S.append(z)}if(e.onLength&&S.append(rc(n,S,m,t)),g.append(...A,y,S),e.onDice){let M=document.createElement("button");M.type="button",M.className="nc-sparkle nc-row-dice",M.dataset.ncDice=m.id,M.setAttribute("aria-label",`Re-roll ${m.label}`),M.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,M.innerHTML=Xa(),M.append(oe()),M.addEventListener("click",()=>{let z=t(n);z?.type==="stepGrid"&&z.onDice?.(z.rows.findIndex(N=>N.id===m.id))}),g.append(M)}g.addEventListener("click",M=>{if(M.target!==g)return;let z=t(n);z?.type==="stepGrid"&&z.onSelectRow?.(z.rows.findIndex(N=>N.id===m.id))}),no(n,S,".nc-step-wrap",t,l,()=>m.id),n.append(g)}let p=document.createElement("div");p.className="nc-pads-head";let d=(m,g,y)=>{let x=document.createElement("button");return x.type="button",x.className=m,x.textContent=g,y&&x.setAttribute("aria-label",y),x},u=d("nc-pads-step","‹","Previous lane"),h=d("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",$n(n,m))}));for(let[m,g]of[[u,-1],[h,1]])m.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let x=y.rows.length;y.onSelectRow?.(((ht(y)+g)%x+x)%x)});if(p.append(u,f,h),e.onDice){let m=d("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Xa(),m.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let y=ht(g);y>=0&&g.onDice?.(y)}),p.append(m)}if(e.transport){let m=d("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),p.append(m)}n.append(p);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(m),g.textContent=String(m+1),g.addEventListener("click",y=>{let x=t(n);if(x?.type!=="stepGrid")return;let E=ht(x);if(E<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(E,m+1);return}let A=l.getAttribute("aria-checked")==="true";x.onToggle(E,m,y.shiftKey||A)}),b.append(g)}return no(n,b,".nc-pad",t,l,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[ht(m)]?.id:void 0}),n.append(b),n.append(U()),$n(n,e),n}function ht(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function no(e,t,n,o,r,i){let l="on",s=!0,c=-1,p=(d,u)=>{let h=d.rows[c]?.steps[u];!h||u>=d.rows[c].length||(d.onSet?d.onSet(c,u,l,s):!!h[l]!==s&&d.onToggle(c,u,l==="accent"))};Cs(t,n,d=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(d.kind!=="paint")return;let h=u.rows.findIndex(f=>f.id===i());h>=0&&u.rows[h].length!==d.pad+1&&u.onLength?.(h,d.pad+1);return}if(d.kind==="paint"){if(d.phase==="start"){let h=i();c=u.rows.findIndex(b=>b.id===h);let f=u.rows[c]?.steps[d.pad];if(!f)return;l=r.getAttribute("aria-checked")==="true"?"accent":"on",s=!f[l]}p(u,d.pad)}else if(d.kind==="long"){let h=i(),f=u.rows.findIndex(w=>w.id===h),b=t.querySelectorAll(n)[d.pad];f>=0&&b instanceof HTMLElement&&u.onLongPress?.(f,d.pad,b)}}})}function ic(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],r=o.indexOf(t),i=r;n.key==="ArrowDown"?i=r+1:n.key==="ArrowUp"?i=r-1:n.key==="Home"?i=0:i=o.length-1;let l=o[i];!(l instanceof HTMLElement)||l===t||(n.preventDefault(),l.focus(),l.click())}function rc(e,t,n,o){let r=document.createElement("button");r.type="button",r.className="nc-len-handle",r.dataset.ncLen=n.id,r.setAttribute("role","slider"),r.setAttribute("aria-valuemin","1"),r.setAttribute("aria-valuemax",String(n.steps.length)),r.append(oe());let i=p=>{let d=o(e);if(d?.type!=="stepGrid")return;let u=d.rows.findIndex(b=>b.id===n.id),h=d.rows[u];if(!h)return;let f=Math.max(1,Math.min(h.steps.length,p));f!==h.length&&d.onLength?.(u,f)},l=p=>{let d=[...t.querySelectorAll(".nc-step")],u=1;return d.forEach((h,f)=>{let b=h.getBoundingClientRect();b.width>0&&p>=b.left+b.width/2&&(u=f+1)}),u},s=p=>i(l(p.clientX)),c=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete r.dataset.dragging};return r.addEventListener("pointerdown",p=>{p.button===0&&(p.preventDefault(),r.dataset.dragging="true",window.addEventListener("pointermove",s),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),r.addEventListener("keydown",p=>{let d=o(e);if(d?.type!=="stepGrid")return;let u=d.rows.find(f=>f.id===n.id);if(!u)return;let h={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};p.key in h&&(p.preventDefault(),i(h[p.key]))}),r}var Qt=new WeakMap,mt=new WeakMap;function lc(e){return e?(mt.has(e)||(mt.set(e,cn(e)),Ho(t=>{mt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))yn(n,Number(n.getAttribute("data-nc-velocity")))},e)),mt.get(e)):"light"}function yn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:lc(e.ownerDocument),r=n===null?null:`${o} ${n}`;if(!(Qt.has(e)&&Qt.get(e)===r)){if(Qt.set(e,r),n===null){for(let i of Object.keys(Fa(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,l]of Object.entries(Fa(n,Ia[o]??Ia.light)))e.style.setProperty(i,l)}}function $n(e,t){let n=t.rows.some(d=>d.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let r=e.querySelector(".nc-pads"),i=t.rows.find(d=>d.id===t.selectedRow)??t.rows[0],l=e.querySelector(".nc-pads-label"),s=e.dataset.ncLenMode==="true"&&!!t.onLength;l instanceof HTMLElement&&i&&(l.textContent=s?`${i.label} · ${i.length}`:i.label,t.onLength&&(l.setAttribute("aria-pressed",s?"true":"false"),l.setAttribute("aria-label",s?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let p=e.querySelector("[data-nc-pads-play]");if(p instanceof HTMLElement){let d=!!t.transport?.playing,u=t.transport?.label??(d?"Stop":"Play");p.textContent!==u&&(p.textContent=u),p.setAttribute("aria-pressed",d?"true":"false");let h=t.transport?.ariaLabel;h?p.setAttribute("aria-label",h):p.removeAttribute("aria-label")}if(r instanceof HTMLElement&&i){r.setAttribute("aria-label",`${i.label} steps`),i.lane&&(r.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?r.dataset.silent="true":delete r.dataset.silent;let d=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let u of r.querySelectorAll("[data-nc-pad]")){let h=Number(u.getAttribute("data-nc-pad")),f=i.steps[h];u instanceof HTMLButtonElement&&(u.hidden=!f||!s&&h>=i.length,s&&h>=i.length?u.dataset.out="true":delete u.dataset.out,s&&h===i.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${i.label} step ${h+1}`),u.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?u.dataset.accent="true":delete u.dataset.accent,f?.dim?u.dataset.dim="true":delete u.dataset.dim,yn(u,f?.velocity),t.playhead>=0&&h===d?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let d of t.rows){for(let f=0;f<d.steps.length;f++){let b=d.steps[f],w=e.querySelector(`[data-nc-step="${d.id}:${f}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===d.id?m.dataset.selected="true":delete m.dataset.selected;let x=t.selectedRow!==d.id&&(t.selectedRows??[]).includes(d.id);x?m.dataset.picked="true":delete m.dataset.picked;let E=m.querySelector(".nc-name");E instanceof HTMLElement&&(E.setAttribute("aria-pressed",t.selectedRow===d.id||x?"true":"false"),E.textContent!==d.label&&(E.textContent=d.label,E.setAttribute("aria-label",`Select ${d.label}`))),d.mute||n&&!d.solo?m.dataset.silent="true":delete m.dataset.silent;for(let A of m.querySelectorAll("[data-nc-ms]")){let S=A.getAttribute("data-nc-ms")==="mute"?d.mute:d.solo;A.setAttribute("aria-pressed",S?"true":"false")}}w.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?w.dataset.accent="true":delete w.dataset.accent,b.dim?w.dataset.dim="true":delete w.dataset.dim,f%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof b.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),yn(w,b.velocity);let g=t.playhead>=0&&d.length>0?(t.playhead%d.length+d.length)%d.length:-1;f===g?w.dataset.playhead="true":delete w.dataset.playhead;let y=!!t.onLength&&t.selectedRow===d.id;w.hidden=f>=d.length&&!y,f>=d.length&&y?w.dataset.out="true":delete w.dataset.out}let u=e.querySelector(`[data-nc-len="${d.id}"]`),h=e.querySelector(`[data-nc-step="${d.id}:${Math.max(0,d.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&h&&h.nextElementSibling!==u){let f=document.activeElement===u;h.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(d.length)),u.setAttribute("aria-label",`${d.label} length, ${d.length} steps`),u.title=`${d.label}: drag to set the length (${d.length} steps)`)}}function sc(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,U()),t}function cc(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let r=document.createElement("span");r.className="nc-strip-name",r.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",l=null;i&&(n.dataset.ncFoldable="",l=Ii(),l.dataset.ncStripHide="",l.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==l&&l.focus())})),o.append(r);let s=null;if(!e.master&&typeof e.onMove=="function"){s=document.createElement("button"),s.type="button",s.className="nc-strip-grip",s.dataset.ncStripGrip="",s.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),s.append(x),s.addEventListener("keydown",E=>{if(E.key!=="ArrowLeft"&&E.key!=="ArrowRight"||E.ctrlKey||E.metaKey||E.shiftKey)return;let A=t(n);A?.type==="strip"&&(E.preventDefault(),A.onMove?.(E.key==="ArrowLeft"?-1:1))})}if(s&&typeof e.onShade=="function"&&(s.setAttribute("aria-haspopup","dialog"),s.addEventListener("click",()=>io(n,s,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),io(n,o,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onRemove?.(x)}),o.append(x)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks",E.dataset.ncHacks="",x.append(E,oe()),x.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onHacks?.()}),c.append(x)}let p=document.createElement("div");if(p.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks nc-sends-view",E.dataset.ncSendsView="",x.append(E,oe()),x.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onSendsView?.()}),p.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=x,A.textContent=x==="mute"?"M":"S",E.append(A,oe()),E.addEventListener("click",()=>{let S=t(n);S?.type==="strip"&&(x==="mute"?S.onMute:S.onSolo)?.()}),p.append(E)}let d=document.createElement("div");d.className="nc-strip-sends";for(let x of e.sends??[])d.append($e({...x,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append($e(Xn(e),t));let h=document.createElement("div");h.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let E=document.createElement("span");E.className="nc-scale-tick",E.style.setProperty("--tick-pos",String(x.value)),E.textContent=x.label,f.append(E)}let b=Nl({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let E=t(n);E?.type==="strip"&&E.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&oo(x)}}),w=Ol({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(h.append(f,b.el,w.el),i){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let E=document.createElement("span");E.className="nc-strip-fold-cap",E.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let S=document.createElement("span");S.className="nc-strip-fold-pan",S.setAttribute("aria-hidden","true"),S.hidden=!e.pan,x.append(E,S,A),x.addEventListener("click",()=>{let M=t(n);if(M?.type!=="strip")return;M.onFold?.(!1);let z=n.querySelector("[data-nc-strip-hide]");z instanceof HTMLElement&&z.focus()}),h.prepend(x)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let g=0;m.addEventListener("click",x=>{let E=t(n);E?.type!=="strip"||!E.onTypeIn||(window.clearTimeout(g),x.detail===0?ao(n,m,t):x.detail===1&&(g=window.setTimeout(()=>ao(n,m,t),uc)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(g);let x=t(n);x?.type==="strip"&&oo(x)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append($e(Qn(e),t)),l&&n.append(l),s&&n.append(s),n.append(o,y,c,p,d,u,h,m,U()),Ci(n,e),n}function Xn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??pc(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Qn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??dc(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:r=>t.onChange(r)}}function dc(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function pc(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var uc=250;function ao(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let r=document.createElement("input");r.type="text",r.className="nc-strip-db-input",r.inputMode="decimal",r.spellcheck=!1,r.autocomplete="off",r.value=o.valueText??tt(o.value),r.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(r),r.focus(),r.select?.();let i=!1,l=s=>{if(i)return;i=!0;let c=r.value;if(r.remove(),t.hidden=!1,s){let p=n(e);p?.type==="strip"&&p.onTypeIn?.(c)}t.focus?.()};r.addEventListener("keydown",s=>{s.key==="Enter"?(s.preventDefault(),l(!0)):s.key==="Escape"&&(s.preventDefault(),l(!1))}),r.addEventListener("blur",()=>l(!1))}function hc(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-strip-add-plus",r.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",o.append(r,i);let l=document.createElement("select");return l.className="nc-strip-add-select",l.addEventListener("change",()=>{let s=t(n),c=l.value;Si(l),s?.type==="stripAdd"&&c&&s.onAdd(c)}),n.append(o,l,U()),Mi(n,e),n}function Mi(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let r=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...o.options].map(s=>`${s.value}|${s.textContent}|${s.disabled}`).join(","),l=r.map(s=>`${s.value}|${s.label}|${s.disabled===!0}`).join(",");i!==l&&(o.replaceChildren(...r.map(s=>{let c=document.createElement("option");return c.value=s.value,c.textContent=s.label,c.disabled=s.disabled===!0,c})),Si(o))}function Si(e){let t=e.options[0];t&&(t.selected=!0)}function oo(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Ci(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let r=e.querySelector(".nc-fader"),i=r?Dl(r):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Hl(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let l=e.querySelector(".nc-strip-db");if(l instanceof HTMLElement){let b=t.valueText??tt(t.value);l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-label",`${t.label} level ${b}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";l.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let b of e.querySelectorAll("[data-nc-ms]")){let w=b.getAttribute("data-nc-ms"),m=w==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",m?"true":"false"),b.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let s=e.querySelector("[data-nc-hacks]");if(s){let b=t.hacksLabel??"Hacks";s.textContent!==b&&(s.textContent=b),s.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),s.setAttribute("aria-label",`${b}: ${t.label}`),s.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let b=t.sendsViewLabel??"Sends";c.textContent!==b&&(c.textContent=b),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ge(c,t.sendsViewHelp)}let p=e.querySelector("[data-nc-strip-grip]");p instanceof HTMLElement&&(p.setAttribute("aria-label",`Move ${t.label}`),p.title=t.moveHelp??"Drag to move this channel");let d=Li(t);if(d?e.dataset.ncShade=String(d):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let b=e.querySelector(`.nc-strip-trim [data-nc-id="${Ne(t.trim.id)}"]`);b&&ee(b,Qn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${Ne(t.pan.id)}"]`);b&&ee(b,Xn(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Fi(h,u,t.label),ge(h,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!u,f.setAttribute("aria-label",`Expand ${t.label}`);let b=f.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),ge(f,t.foldedHelp??t.foldHelp)}}function Li(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Ti?t:0}var Ti=8,ft=null;function io(e,t,n,o){ft?.();let r=n(e);if(r?.type!=="strip")return null;let i=e.ownerDocument,l=i.defaultView??globalThis,s=i.createElement("div");s.className="nc-strip-menu",s.dataset.ncStripMenu="",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`${r.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(r.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let p=i.createElement("div");p.className="nc-strip-menu-shades",p.setAttribute("role","radiogroup"),p.setAttribute("aria-labelledby",c.id);let d=Li(r),u=e.querySelector("[data-nc-strip-grip]")??t,h=(g=!1)=>{if(ft!==h)return;ft=null;let y=s.contains(i.activeElement);s.remove(),i.removeEventListener("keydown",b,!0),i.removeEventListener("pointerdown",w,!0),l.removeEventListener("resize",m),(g||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},f=[0,...Array.from({length:Ti},(g,y)=>y+1)].map(g=>{let y=i.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",g===d?"true":"false"),y.setAttribute("tabindex",g===d?"0":"-1"),y.dataset.ncShadeChoice=String(g),g===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(g),y.setAttribute("aria-label",`Shade ${g}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${g})`)),y.addEventListener("click",()=>{let x=n(e);h(!0),x?.type==="strip"&&x.onShade?.(g===0?null:g)}),y});if(p.append(...f),p.addEventListener("keydown",g=>{let y=f.indexOf(i.activeElement);if(y<0)return;let x=-1;g.key==="ArrowRight"||g.key==="ArrowDown"?x=(y+1)%f.length:g.key==="ArrowLeft"||g.key==="ArrowUp"?x=(y-1+f.length)%f.length:g.key==="Home"?x=0:g.key==="End"&&(x=f.length-1),!(x<0)&&(g.preventDefault(),f[y].setAttribute("tabindex","-1"),f[x].setAttribute("tabindex","0"),f[x].focus())}),s.append(c,p),typeof r.onMove=="function"){let g=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),y=g.indexOf(e);for(let[x,E,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let S=i.createElement("button");S.type="button",S.className="nc-strip-menu-item",S.dataset.ncStripMove=x<0?"left":"right";let M=i.createElement("span");M.textContent=E;let z=i.createElement("kbd");z.textContent=A,z.setAttribute("aria-hidden","true"),S.append(M,z),S.disabled=x<0?y<=0:y<0||y>=g.length-1,S.addEventListener("click",()=>{let N=n(e);h(!0),N?.type==="strip"&&N.onMove?.(x)}),s.append(S)}}i.body.append(s),(()=>{let g=t.getBoundingClientRect?.()??{bottom:0,right:0},y=s.offsetWidth,x=s.offsetHeight,E=l.innerWidth||i.documentElement.clientWidth||y,A=l.innerHeight||i.documentElement.clientHeight||x,S=o?o.x:g.right-y,M=o?o.y:g.bottom+4;S=Math.max(4,Math.min(S,E-y-4)),M+x>A-4&&(M=Math.max(4,(o?o.y:g.top)-x-4)),s.style.left=`${Math.round(S)}px`,s.style.top=`${Math.round(M)}px`})();let b=g=>{if(g.key==="Escape")g.preventDefault(),g.stopPropagation(),h(!0);else if(g.key==="Tab"&&s.contains(i.activeElement)){let y=[...s.querySelectorAll("button:not([disabled])")].filter(E=>E.getAttribute("tabindex")!=="-1"),x=(y.indexOf(i.activeElement)+(g.shiftKey?-1:1)+y.length)%y.length;g.preventDefault(),y[x]?.focus()}},w=g=>{s.contains(g.target)||h(!1)},m=()=>h(!1);return i.addEventListener("keydown",b,!0),i.addEventListener("pointerdown",w,!0),l.addEventListener("resize",m),ft=h,(f.find(g=>g.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:s,close:()=>h(!1)}}var kn=typeof ResizeObserver=="function"?new ResizeObserver(mc):null;function mc(e){for(let t of e){if(!t.target.isConnected){kn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&fc(n)}}function fc(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,r=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+r+i}px`)}function gc(e){if(kn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))kn.observe(t)}function bc(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let r=typeof e.onFold=="function",i=!!e.meter,l=typeof e.onRemove=="function";if(e.on===void 0&&!r&&!Pt(e)&&!i&&!l)n.append(o);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(o),i&&s.append(Ni(n,"head")),e.on!==void 0){let c=Uo({checked:e.on,labelledBy:o.id,onChange:p=>{let d=t(c.el);d?.type==="fx"&&d.onToggle?.(p)}});c.el.dataset.ncFxSwitch="",s.append(c.el)}r&&s.append(xc(n,t)),Pt(e)&&s.append(kc(n,t)),l&&s.append(Ec(t)),n.append(s)}r&&n.prepend(vc(n,t)),i&&Di(n,e);for(let s of e.controls)n.append($e(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",s.append(c);for(let p of e.more)s.append($e(p,t));n.append(s)}return n.append(U()),qi(n,e),gc(n),n}var wc=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function zi(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&wc(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function xc(e,t){let n=Ii();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),zi(e))}),n}function Ii(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Fi(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function vc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let r=document.createElement("span");r.className="nc-ui-fx-fold-name",r.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,o,r),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ni(e,"fold")),n.addEventListener("click",()=>{let l=t(n);if(l?.type==="fx"){if(l.folded!==!0){let s=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(s instanceof HTMLElement){s.click();return}}l.onFold?.(!1),zi(e)}}),n}var Re=new Set;function yt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Pt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"),yc="(max-width: 768px)";function $c(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function kc(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append($c()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(Pi(e,o,!Re.has(o.id)),n.focus())}),n}function Ec(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Pi(e,t,n){n?Re.add(t.id):Re.delete(t.id),Zn(e,t)}function Ac(e,t){t?.type==="fx"&&Re.has(t.id)&&Pi(e,t,!1)}function Mc(e){return e.ownerDocument.defaultView?.matchMedia?.(yc).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Zn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=Pt(t)&&Re.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Pt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),yt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&je(l)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",ge(n,t.maxHelp)),!o){e.dataset.ncMax&&ro(e);return}if(!e.isConnected){let l=()=>e.isConnected&&Re.has(t.id)&&Zn(e,t);queueMicrotask(()=>{e.isConnected?l():yt(e.ownerDocument,l)});return}let r=Mc(e),i=[...e.children].filter(l=>l.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==r&&(e.dataset.ncMax&&ro(e),e.dataset.ncMax=r,r==="over"&&Sc(e,t)),Cc(e.ownerDocument),r==="over"&&ea(e),yt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&je(l)})}function ro(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),yt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&je(n)})}function Sc(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let r=e.querySelector("[data-nc-fx-max]");r instanceof HTMLElement&&r.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function ea(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,r=e.ownerDocument.defaultView,i=Number.parseFloat(r?.getComputedStyle(o).columnGap??"")||0,l=rs(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),i,r?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${l.left}px`,e.style.top=`${l.top}px`,e.style.width=`${l.width}px`}var lo=new WeakSet;function Cc(e){lo.has(e)||(lo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(r=>r.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&ea(t)}))}var En=new WeakMap;function Ni(e,t){let n=$s(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Di(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let r of n)ge(r,t.meterHelp);let o=En.get(e);o?o.set(t.meter):En.set(e,Ms(n,t.meter))}function qi(e,t){(t.meter||En.has(e))&&Di(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let r=typeof t.onFold=="function"&&t.folded===!0;r?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Fi(i,r,t.title),ge(i,t.foldHelp)),Zn(e,t);let l=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(l instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;l.hidden=r,l.setAttribute("aria-label",c),l.title=c}let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";s.hidden=!r,s.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let p=s.querySelector("[data-nc-fx-fold-state]");p&&(p.textContent=c,p.hidden=c==="");let d=s.querySelector("[data-nc-fx-fold-name]");d&&(d.textContent=t.title),ge(s,t.foldHelp)}}function ge(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Ne(e){return e.replace(/["\\]/g,"\\$&")}function Lc(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(r=>r.type==="canvas"&&r.id===n.dataset.ncId);o?.type==="canvas"&&Xo(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&je(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&ea(n);Rs(e)}var Tc=1e3,zc=e=>e===!0?"log":typeof e=="string"?e:"linear";function ta(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??zc(e.log),r=rt(o,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let l=n.createElement("label");l.className="nc-label",l.setAttribute("for",e.id),l.textContent=e.label;let s=n.createElement("input");s.type="range",s.className="nc-range",s.id=e.id,s.dataset.ncId=e.id,s.min=String(r?0:e.min),s.max=String(r?Tc:e.max),s.step=r?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let p=n.createElement("i");p.className="nc-token-probe",p.dataset.ncProbe="",i.append(l,s,c,p);let d=e.value,u=()=>{let f=e.format(d);c.textContent=f,s.setAttribute("aria-valuetext",f)},h=f=>{d=f,n.activeElement!==s&&(s.value=String(r?et(o,e.min,e.max,d):d)),u()};return s.addEventListener("input",()=>{d=r?zt(o,e.min,e.max,s.value,e.step):Number(s.value),u(),e.onInput(d)}),r&&s.addEventListener("keydown",f=>{let b=_n(o,e.min,e.max,d,f.key,f.shiftKey,e.step);b===null||s.disabled||(f.preventDefault(),s.value=String(et(o,e.min,e.max,b)),d=b,u(),e.onInput(d))}),s.disabled=e.disabled===!0,h(e.value),{el:i,set:h,setDisabled(f){s.disabled=f===!0}}}var Nt="data-nc-help";function Ic(e,t,n,o=0,r=6,i=8){let l=e.top-r-t.height,s=l>=o+i?"above":"below",c=s==="above"?l:e.bottom+r,p=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(c),left:Math.round(p),side:s}}var Zt=new WeakMap;function Fc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Pc({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=Zt.get(e);if(n)return n;let o=e.defaultView,r=null,i=null,l,s=()=>{clearTimeout(l),i=null,r&&(r.hidden=!0)},c=h=>{let f=h.getAttribute(Nt);if(!f)return;r||(r=e.createElement("div"),r.className="nc-ui-help",r.setAttribute("role","tooltip"),r.dataset.testid="nc-help",r.style.position="fixed",r.style.pointerEvents="none",r.style.zIndex="6",e.body.appendChild(r)),r.textContent=f,r.hidden=!1,r.style.visibility="hidden",r.style.top="0px",r.style.left="0px";let b=h.getBoundingClientRect(),w=Ic(b,{width:r.offsetWidth,height:r.offsetHeight},o.innerWidth,Fc(e));r.style.top=`${w.top}px`,r.style.left=`${w.left}px`,r.dataset.side=w.side,r.style.visibility=""},p=h=>{if(h.pointerType==="touch")return;let f=h.target&&h.target.closest?h.target.closest(`[${Nt}]`):null;f!==i&&(s(),f&&(i=f,l=setTimeout(()=>{i===f&&f.isConnected&&c(f)},t)))},d=h=>{h.key==="Escape"&&s()};e.addEventListener("pointerover",p),e.addEventListener("pointerdown",s,!0),e.addEventListener("keydown",d),o.addEventListener("scroll",s,!0),o.addEventListener("blur",s);let u={hide:s,uninstall(){s(),e.removeEventListener("pointerover",p),e.removeEventListener("pointerdown",s,!0),e.removeEventListener("keydown",d),o.removeEventListener("scroll",s,!0),o.removeEventListener("blur",s),r?.remove(),r=null,Zt.delete(e)}};return Zt.set(e,u),u}var Nc="(max-width: 768px)",Dc='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',qc='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',jc=0;function Rc({panel:e,button:t,label:n="Menu",media:o=Nc}){let r=e.ownerDocument,i=r.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++jc}`);let l=t??r.createElement("button");t||(l.type="button",l.innerHTML=Dc),l.classList.add("nc-page-menu-btn"),l.setAttribute("aria-label",n),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-controls",e.id);let s=()=>e.hasAttribute("data-nc-open");function c(){s()||(e.setAttribute("data-nc-open",""),l.setAttribute("aria-expanded","true"),r.addEventListener("keydown",d,!0),r.addEventListener("pointerdown",u,!0),[...e.querySelectorAll(qc)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function p({focus:m}={}){if(!s())return;let g=e.contains(r.activeElement);e.removeAttribute("data-nc-open"),l.setAttribute("aria-expanded","false"),r.removeEventListener("keydown",d,!0),r.removeEventListener("pointerdown",u,!0),(m??g)&&l.focus?.({preventScroll:!0})}function d(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),p({focus:!0}))}function u(m){let g=m.target;g instanceof i.Node&&(e.contains(g)||l.contains(g))||p({focus:!1})}let h=()=>s()?p({focus:!0}):c(),f=m=>{let g=m.target,y=g instanceof i.Element?g.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||p({focus:!0})};l.addEventListener("click",h),e.addEventListener("click",f);let b=i.matchMedia?.(o),w=()=>{b?.matches||p({focus:!1})};return b?.addEventListener?.("change",w),{button:l,panel:e,open:c,close:p,isOpen:s,destroy(){p({focus:!1}),l.removeEventListener("click",h),e.removeEventListener("click",f),b?.removeEventListener?.("change",w)}}}var na="netcomposer.rhythm.hidden.v1",se=new WeakMap;function en(){try{return globalThis.localStorage??null}catch{return null}}function ji(e,t=na){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function An(e,t,n,o=na){let r=ji(e,o);n?r.add(t):r.delete(t);try{e?.setItem(o,JSON.stringify([...r]))}catch{}}function aa(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(r=>r.controls)],n=[],o=r=>{if(n.push(r),r.type==="group")for(let i of r.controls)o(i)};for(let r of t)o(r),r.type==="fx"&&n.push(...r.controls,...r.more??[]),r.type==="strip"&&(n.push(...(r.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),r.pan&&n.push(Xn(r)),r.trim&&n.push(Qn(r)));return n}function Ri(e,t){if(!(!e||!t))return aa(e).find(n=>n.id===t)}function Bc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${aa(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Oc(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let r=document.createElement("span");r.className="nc-panel-subject",r.dataset.ncPanelSubject="",n.append(o,r),e.append(n),Bi(e,t)}function Bi(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),r=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),r&&(r.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Hc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=se.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Ri(n,o)}function Vc(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],r=Bc(t);if(e.dataset.ncSignature===r){for(let i of o){let l=e.querySelector(`[data-nc-section="${co(i.id)}"]`);l&&Bi(l,i);for(let s of i.controls){let c=e.querySelector(`[data-nc-id="${co(s.id)}"]`);c instanceof Element&&ee(c,s)}l instanceof HTMLElement&&Mn(l,i,n)}return}e.dataset.ncSignature=r,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of o){let l=document.createElement("div");l.className="nc-section",l.dataset.ncSection=i.id,i.inset&&(l.dataset.ncInset="true"),i.area&&(l.dataset.ncArea=i.area),i.label&&(l.setAttribute("role","group"),l.setAttribute("aria-label",i.label)),i.panel&&(l.dataset.ncPanel="true",l.setAttribute("role","region"),i.title&&l.setAttribute("aria-label",i.title)),Oc(l,i);let s=i.panel?document.createElement("div"):l;i.panel&&(s.className="nc-panel-body",l.append(s));for(let c of i.controls)s.append($e(c,Hc));e.append(l),Mn(l,i,n)}}function Oi(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,r=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,r))}}var _c="(max-width: 768px)",Hi=new WeakMap;function so(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Gc(e,t){let n=[...e.children].find(p=>p.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let r=so("prev"),i=so("next"),l=document.createElement("span");l.className="nc-fx-page-count",l.dataset.ncFxPageCount="",l.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-ui-toast-live",s.dataset.ncFxPageLive="",s.setAttribute("aria-live","polite"),o.append(r,l,i,s);let c=(p,d)=>{let u=Hi.get(e);if(!u||d.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Oi(h,u.pageSize,(t.pages.get(u.id)??0)+p);t.pages.set(u.id,f),u.onPage?.(f),Mn(e,{...u,page:f},t),d.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===d&&(d===r?i:r).focus(),t.redraw()};return r.addEventListener("click",()=>c(-1,r)),i.addEventListener("click",()=>c(1,i)),e.prepend(o),o}function Mn(e,t,n){Hi.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],r=t.pageSize??0,{pages:i,page:l}=Oi(o.length,r,t.page??n.pages.get(t.id)??0);if(r>0&&n.pages.set(t.id,l),i<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of o)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let s=e.ownerDocument.defaultView?.matchMedia?.(_c).matches===!0,c=e.closest(".nc-module");o.forEach((m,g)=>{let y=Math.floor(g/r)!==l;if(y?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,y&&!s){let x=c instanceof HTMLElement?se.get(c):void 0;Ac(m,Ri(x,m.dataset.ncId))}});let p=Gc(e,n),d=p.querySelector('[data-nc-fx-page="prev"]'),u=p.querySelector('[data-nc-fx-page="next"]');d.setAttribute("aria-disabled",l===0?"true":"false"),u.setAttribute("aria-disabled",l===i-1?"true":"false");let h=p.querySelector("[data-nc-fx-page-count]"),f=`${l+1} / ${i}`;h.textContent!==f&&(h.textContent=f);let b=p.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${l+1} of ${i}`;b.textContent!==w&&(b.textContent=w)}function co(e){return e.replace(/["\\]/g,"\\$&")}function Uc(e,t=na){Go();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=ji(en(),t).has(e.id),r=document.createElement("header");r.className="nc-module-hd",r.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let l=document.createElement("span");l.className="nc-module-end";let s=document.createElement("button");s.type="button",s.className="nc-hide",s.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let p=Uo({labelledBy:i.id,onChange:y=>(se.get(n)??e).onToggle?.(y)});p.el.dataset.ncModuleSwitch="",l.append(p.el,s,c);let d=document.createElement("span");d.className="nc-snap-msg",d.dataset.ncStatus="",r.append(i,d,l);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",h.append(f);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,r,u,h),n.setAttribute("aria-labelledby",i.id);let w=y=>{let x=se.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,h.hidden=!y,s.textContent=y?"+":"−",s.setAttribute("aria-expanded",y?"false":"true"),s.setAttribute("aria-controls",u.id),s.setAttribute("aria-label",`${y?"Show":"Hide"} ${x.title}`),s.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};s.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";An(en(),(se.get(n)??e).id,y,t),w(y),Sn(n.parentElement)}),h.addEventListener("click",()=>{An(en(),(se.get(n)??e).id,!1,t),w(!1),Sn(n.parentElement)});let m={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(y){se.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=y.title,d.textContent=y.status??"",y.status!==void 0?d.setAttribute("aria-live","polite"):d.removeAttribute("aria-live"),f.textContent=y.summary??y.title,p.el.hidden=y.on===void 0,p.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),Vc(u,y,m),w(u.hidden),g.redraw()},redraw(){let y=se.get(n);y&&Lc(n,aa(y))}};return se.set(n,e),w(o),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),Ho(()=>g.redraw(),n.ownerDocument),g}function Wc(e,t,n="adjacent"){Go(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((r,i)=>{let l=i%4+1;r.el.dataset.ncShade=String(l),r.el.dataset.ncPlace=o;let s=r.el.querySelector("[data-nc-index]");s&&(s.textContent=String(l).padStart(2,"0")),e.append(r.el),r.redraw()}),Sn(e)}function Sn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),o=t.map(i=>i.hasAttribute("data-nc-slim")?a("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let r=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&r.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}function Yc(e,t,n,o={}){const r=()=>{const l=e.transport;t.start(l.beatAt(Math.max(l.startTime??n(),n())),!0),o.started?.()},i=e.onChange(l=>{const s=e.transport;l.kind==="start"&&typeof l.beat=="number"?(t.start(l.beat,!1),o.started?.()):l.kind==="stop"?(t.stop(),o.stopped?.()):l.kind==="snapshot"&&(!s.running&&t.playing?(t.stop(),o.stopped?.()):s.running&&!t.playing&&r())});return e.transport.running&&r(),i}const Kc=.5,Jc=20,Xc=.2;class Ce{constructor(t){this.state=t}next=()=>{this.state=this.state+1831565813>>>0;let t=this.state;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const H=1e-9;class Qc{constructor(t){this.o=t,this.cur=this.latest=t.settings,this.ahead=t.aheadSec??Kc,this.lead=t.leadSec??Xc}gen=null;random=new Ce(1);chordRandom=new Ce(2);cur;latest;genTo=0;runStart=0;snaps=[];history=[];pending=[];ahead;lead;stats={sent:0,resends:0,runs:0};get playing(){return this.gen!==null}get settings(){return this.latest}get sentTo(){return this.genTo}get startBeat(){return this.runStart}get queued(){return this.pending}beatsPerBar(){return Math.max(1,this.o.transport().meter?.beatsPerBar??4)}make(){return new On(()=>this.cur,{random:this.random.next,chordRandom:this.chordRandom.next,beatsPerBar:()=>this.beatsPerBar()})}start(t,n=!1){const o=this.o.seed?.()??Math.floor(Math.random()*2147483648);this.random=new Ce(o>>>0),this.chordRandom=new Ce(o+1e3>>>0),this.cur=this.latest,this.pending=[],this.history=[],this.snaps=[],this.gen=this.make(),this.o.sink.restart(),this.gen.start(t,{join:n}),this.genTo=this.runStart=t,this.stats.runs++,this.pump()}stop(){this.gen&&(this.gen=null,this.pending=[],this.history=[],this.snaps=[],this.cur=this.latest,this.o.sink.off("stop"))}pump(){const t=this.o.transport();if(!this.gen||!t.running)return;const n=t.beatAt(this.o.now()+this.ahead);n>this.genTo+H&&this.advance(n,Number.NEGATIVE_INFINITY),this.prune(t.beatAt(this.o.now()))}changeBeat(){const t=this.o.transport();if(!this.gen||!t.running)return null;const n=Math.ceil(t.beatAt(this.o.now()+this.lead)-H);return Math.max(n,Math.ceil(this.runStart-H))}set(t,n={}){const o={...t};this.latest=o;const r=this.changeBeat();if(r===null)return this.gen||(this.cur=o),null;const i={beat:r,settings:o,...n.jump===void 0?{}:{jump:n.jump}};return this.pending=this.pending.filter(l=>l.beat<r-H),r>=this.genTo-H?(this.pending.push(i),r):(this.rewind(i),r)}rewind(t){const n=t.beat,o=this.genTo;let r=this.snaps.length-1;for(;r>0&&this.snaps[r].from>n+H;)r--;const i=this.snaps[r];if(!i||i.from>n+H){this.pending.push(t);return}this.random=new Ce(i.random),this.chordRandom=new Ce(i.chordRandom),this.cur=i.settings,this.gen=i.gen.clone({settings:()=>this.cur,random:this.random.next,chordRandom:this.chordRandom.next}),this.genTo=i.from,this.snaps=this.snaps.slice(0,r);const l=this.history.filter(s=>s.beat>i.from+H&&s.beat<n-H);this.history=this.history.filter(s=>s.beat<=i.from+H),this.pending=[...l,t,...this.pending.filter(s=>s.beat>n+H)],this.o.sink.off("restart",n),this.stats.resends++,this.advance(o,n)}advance(t,n){const o=[];for(;this.pending.length&&this.pending[0].beat<t-H;){const i=this.pending.shift();o.push(...this.play(i.beat)),this.cur=i.settings,this.gen.barFrom()<i.beat&&this.gen.catchUpBars(i.beat),i.jump!==void 0&&this.gen.jumpToChord(i.jump,i.beat),this.history.push(i)}o.push(...this.play(t));const r=o.filter(i=>i.startBeat>=n-H);r.length&&(this.stats.sent+=r.length,this.o.sink.send(r))}play(t){const n=this.gen;if(t<=this.genTo+H)return[];this.snaps.push({from:this.genTo,gen:n.clone({settings:()=>this.cur}),random:this.random.state,chordRandom:this.chordRandom.state,settings:this.cur});const o=n.window(t);return this.genTo=t,o}prune(t){for(;this.snaps.length>1&&this.snaps[1].from<=t-H;)this.snaps.shift();const n=this.snaps[0]?.from??this.genTo;this.history=this.history.filter(o=>o.beat>n+H)}chordPosition(t){return this.gen?.chordPosition(t)??null}}const Zc={"page:save":"Download CALLIOPE's settings, pads and targets as a file.","page:load":"Load a CALLIOPE file. What plays changes on the next beat.","page:panic":"Stop every note CALLIOPE is playing. It plays on from the next step.",mode:"Off rests. Single plays the Note. Chord plays the chord, pads and progression. Random picks notes in the Octave and up.",note:"The root note (and the key of a progression).",octave:"The octave the notes start from (C3 is middle C's octave below).","octave-range":"Random: how many octaves up from Octave it may pick.",chord:"The chord that plays when no pad holds and no progression runs.",browse:"Open the chord library: categories, search and favorites (stars).",category:"Which chords the list shows. Favorites are the starred ones.",search:"Find a chord by name or symbol in every category.",root:"Pad root: each pad plays its own root. Follow root: pads keep only the chord type and play on the Note.",pads:"Click a pad: its chord plays from the next beat and holds. A held pad pauses the Progression. Drag or Alt+arrows to reorder; ⋯ for more.","all-pads":"Show all sixteen pads.",progression:"A chord progression in the Note's key. A held pad pauses it; click a step to go back to it.","progression-off":"Turn the progression off: the Chord plays.","progression-step":"Play the progression from this chord, on the next bar line.",bars:"How long each chord of the progression lasts.",inversion:"Which chord tone is lowest.","voice-leading":"Smooth moves each chord to the nearest voicing. Fixed keeps the inversion.",style:"How the chord is played: held, walked, or in a groove. The arp plays instead when it is on.",strum:"Spread the chord's notes, down on the beat and up off it.",tension:"How often a colour tone joins the chord.",arp:"Play the chord one note at a time, in the Note order.",latch:"On: a pad click holds the pad. Off: a pad plays while you press it.","note-order":"The order the arp plays the chord's notes in.",octaves:"How many octaves the arp climbs.",spread:"How wide the chord is voiced.",rate:"The arp's step (the Grid) and the tempo.",hits:"Euclidean: notes spread as evenly as they fit in the Steps.",steps:"Euclidean: the length of the pattern.",rotate:"Euclidean: where the pattern starts.",pattern:"The Euclidean pattern: x plays, . rests.",grid:"How often a step plays: quarters, eighths, triplets…",gate:"How long each note lasts, as a share of its step.","now-playing":"What CALLIOPE plays now, and what comes next.",targets:"The instruments CALLIOPE plays, each as a chord, its root or its top note.","target-on":"Play this instrument from CALLIOPE. Off, it plays its own part again.",role:"Chord: every note. Root: the chord's root only. Top: the top note only.","target-octave":"Move what this instrument gets up or down by whole octaves.",inputs:"Situation's signals will drive CALLIOPE here (with Situation v1)."},Vi=e=>Zc[e]??"",_i="netcomposer.calliope",Gi=1,po="netcomposer.calliope.v1",ed=["chord","root","top"],$t=-3,Ui=3,td=["sus2","major-7","minor-7","dominant-7","7sus4","add9","major-9","minor-9","minor-11","dominant-13"],Q=(e,t)=>({chord:e,root:t,inversion:0});function nd(){const e=Bn();return[Q("major-7",0),Q("minor-7",9),Q("minor-9",2),Q("7sus4",7),Q("major-7",5),Q("minor-7",4),Q("minor-9",9),Q("dominant-13",7),Q("add9",0),Q("major-9",5),Q("minor-11",2),Q("sus2",4)].forEach((t,n)=>{e[n]=t}),e}function Wi(){return{...el,mode:"chord",note:9,octave:3,chord:"minor-7",interval:8,gate:75,voiceLeading:"smooth",favoriteChords:[...td],chordPads:nd(),chordPadMode:"pad"}}function Cn(){return{gen:Wi(),chordCategory:"Favorites",held:null,latch:!0,lastArp:"up",targets:{}}}function re(e){const t=e.held===null?null:e.gen.chordPads[e.held];return t?{...e.gen,...Jr(t,e.gen.chordPadMode,e.gen.chordProgression)}:e.gen}const ad=e=>e.held===null?null:e.gen.chordPads[e.held]??null,Yi=e=>e.gen.chordProgression!=="off"&&ad(e)!==null;function oa(e,t){return t<0||t>=Ze||!e.gen.chordPads[t]?e:{...e,held:t}}const od=e=>({...e,held:null});function Ki(e){return{...e,held:null}}function P(e,t){const n={...e.gen,...t};let o=e.held;return o!==null&&!n.chordPads[o]&&(o=null),("chord"in t||"note"in t)&&!("chordPads"in t)&&(o=null),{...e,gen:n,held:o}}function tn(e,t){const n=e.gen.chordProgression==="off",o=P(e,n&&t!=="off"?{chordProgression:t,voiceLeading:"smooth"}:{chordProgression:t});return t!=="off"?{...o,held:null}:o}function id(e){return e.gen.arp!=="off"?{...P(e,{arp:"off"}),lastArp:e.gen.arp}:P(e,{arp:e.lastArp==="off"?"up":e.lastArp})}function Ke(e,t,n){const o=e.targets[t]??{on:!1,role:"chord",octave:0},r=Ji({...o,...n});return{...e,targets:{...e.targets,[t]:r}}}const kt=(e,t,n,o)=>typeof e=="number"&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):o,le=(e,t,n,o)=>Math.round(kt(e,t,n,o)),he=(e,t,n)=>t.includes(e)?e:n;function Ji(e){const t=e&&typeof e=="object"?e:{};return{on:t.on===!0,role:he(t.role,ed,"chord"),octave:le(t.octave,$t,Ui,0)}}function rd(e){const t=Wi(),n=e&&typeof e=="object"?e:{},o=le(n.note,0,11,t.note),r=Array.isArray(n.favoriteChords)?[...new Set(n.favoriteChords.filter(s=>typeof s=="string").map(ke))]:t.favoriteChords,i=typeof n.chord=="string"?ke(n.chord):t.chord,l=ko(n.arp)??t.arp;return{mode:No(n.mode)?n.mode:t.mode,note:o,octave:le(n.octave,0,7,t.octave),octaveRange:le(n.octaveRange,1,3,t.octaveRange),chord:i,inversion:le(n.inversion,0,G(i).intervals.length-1,0),interval:Gr(n.interval,t.interval),gate:kt(n.gate,10,100,t.gate),arp:l,arpOctaves:le(n.arpOctaves,1,4,t.arpOctaves),arpSpread:he(n.arpSpread,["compact","wide","wider","maximum"],t.arpSpread),arpHits:le(n.arpHits,1,16,t.arpHits),arpSteps:le(n.arpSteps,1,16,t.arpSteps),arpRotate:le(n.arpRotate,0,15,t.arpRotate),chordStyle:he(n.chordStyle,Ir,t.chordStyle),voiceLeading:he(n.voiceLeading,["fixed","smooth"],t.voiceLeading),strum:kt(n.strum,0,40,0),tension:kt(n.tension,0,100,0),chordProgression:he(n.chordProgression,["off",..._r],"off"),progressionBars:he(n.progressionBars,To,0),favoriteChords:r,chordPads:Array.isArray(n.chordPads)?Ur(n.chordPads,o):t.chordPads,chordPadMode:he(n.chordPadMode,["pad","follow"],"pad")}}function Xi(e){const t=Cn(),n=e&&typeof e=="object"?e:{},o=rd(n.gen),r=typeof n.held=="number"&&Number.isInteger(n.held)&&o.chordPads[n.held]?n.held:null,i={};if(n.targets&&typeof n.targets=="object")for(const[s,c]of Object.entries(n.targets))s&&s.length<=64&&(i[s]=Ji(c));const l=ko(n.lastArp);return{gen:o,chordCategory:he(n.chordCategory,["Favorites",...vo],t.chordCategory),held:r,latch:n.latch!==!1,lastArp:l&&l!=="off"?l:t.lastArp,targets:i}}function Qi(e){return{format:_i,version:Gi,state:e}}function Zi(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==_i||typeof t.version!="number"||t.version>Gi?null:Xi(t.state)}function ld(e){return{...re(e),chordPads:e.gen.chordPads,favoriteChords:e.gen.favoriteChords}}Me.filter(e=>!e.legacy).map(e=>e.id);function er(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let Le;function sd(e,t=er()){if(Le!==void 0)return Le;Le=null;try{if(typeof window>"u"||window.parent===window)return Le;const n=window.parent.ncStudio;n&&n.version===1&&(Le=n.attach(e,{instance:t}))}catch{}return Le}const uo={"olive-bass":"coming soon · Bass will keep its rhythm and take the pitch",nyx:"coming soon · a pad tuned to the note"},cd=["calliope"];function dd(e,t,n){const o=[],r=[],i=[];for(const l of e){if(l.instance===n||cd.includes(l.type))continue;const s=l.n>1&&l.name.endsWith(` ${l.n}`)?l.name.slice(0,-` ${l.n}`.length):l.name,c={instance:l.instance,name:l.name,label:s,n:l.n};l.takesNotes?o.push({...c,playable:!0,note:""}):uo[l.type]?r.push({...c,playable:!1,note:uo[l.type]}):i.includes(s)||i.push(s)}return{playable:o,coming:r,none:i}}const Je=e=>`${Ae[(e%12+12)%12]}${Math.floor(e/12)-1}`;function nt(e,t){return`${Ae[(e%12+12)%12]}${G(t).symbol}`}function tr(e,t){return nt(t.chordPadMode==="follow"?t.note:e.root,e.chord)}class pd{marks=[];reset(t,n){this.marks=[{beat:Number.NEGATIVE_INFINITY,settings:t,pad:n}]}mark(t){this.marks=this.marks.filter(n=>n.beat<t.beat-1e-9),this.marks.push(t)}at(t){let n=this.marks[0];for(const o of this.marks)o.beat<=t+1e-9&&(n=o);return n}after(t){return this.marks.find(n=>n.beat>t+1e-9)??null}prune(t){for(;this.marks.length>1&&this.marks[1].beat<=t+1e-9;)this.marks.shift()}get size(){return this.marks.length}}function Et(e,t){const n=e.settings,o=n.chordPads??[],r=e.pad===null?null:o[e.pad]??null;if(n.mode!=="chord")return{name:n.mode==="off"?"—":n.mode==="random"?"Random":Je((n.octave+1)*12+n.note),detail:n.mode==="off"?"Mode is Off":`${n.mode==="random"?"Random notes":"Single note"}`,voicing:"",pad:null,step:null};const i=ce(n.chordProgression,n.note,n.octave,n.progressionBars);if(i?.length&&!r){const p=Math.min(t?.index??0,i.length-1),d=i[p],u=qe(d.root,d.chord,d.inversion??Math.min(n.inversion,d.intervals.length-1),n.arpSpread);return{name:d.name,detail:`${d.numeral} · from the progression`,voicing:u.map(Je).join(" "),pad:null,step:p}}const l=(n.octave+1)*12+n.note,s=G(n.chord),c=qe(l,s.id,n.inversion,n.arpSpread).map(Je).join(" ");return r&&e.pad!==null?{name:nt(n.note,n.chord),detail:`Pad ${e.pad+1} · held`,voicing:c,pad:e.pad,step:null}:{name:nt(n.note,n.chord),detail:`${s.name} · ${s.category}`,voicing:c,pad:null,step:null}}function ho(e,t){const n=ce(e.chordProgression,e.note,e.octave,e.progressionBars);if(!n||n.length<2)return null;const o=(t+1)%n.length;return{name:n[o].name,bar:Math.floor(jn(n,o))%Math.max(1,jt(n))+1}}function nr(e,t=4){const n=Math.max(0,e);return{bar:Math.floor(n/t+1e-9)+1,beat:Math.floor(n%t+1e-9)+1}}const ia=er(),ra=String(ia).padStart(2,"0"),ie=sd("calliope",ia),ar=ie?.storageKey?.(po)??po,Ln="netcomposer.calliope.hidden.v1",or="netcomposer.calliope.ui.v1",ud=`CALLIOPE ${ia}`,at="(max-width: 768px)";function Be(){try{return globalThis.localStorage??null}catch{return null}}function hd(){try{const e=Be()?.getItem(ar);return e?Xi(JSON.parse(e)):Cn()}catch{return Cn()}}let nn=null;function md(){nn===null&&(nn=window.setTimeout(()=>{nn=null;try{Be()?.setItem(ar,JSON.stringify(k))}catch{}},200))}const Z=(()=>{try{return{library:JSON.parse(Be()?.getItem(or)??"null")?.library??!window.matchMedia(at).matches,allPads:!1,progression:!1}}catch{return{library:!window.matchMedia(at).matches,allPads:!1,progression:!1}}})();function fd(){try{Be()?.setItem(or,JSON.stringify({library:Z.library}))}catch{}}let k=hd();const Tn=ie?.clock??null,de=ie?.notesSource?.(ud)??null,gd={running:!1,startTime:null,beatAt:()=>0,timeAt:()=>0},st=()=>Tn?.transport??gd;let me=[];const X=new Qc({transport:st,now:Qe,settings:re(k),sink:{send(e){for(const t of e)me.push({start:t.startBeat,end:t.startBeat+t.lengthBeats});de?.send(e)},off(e,t){me=t===void 0?[]:me.filter(n=>n.start<t),de?.off(e,t)},restart(){me=[],de?.restart()}}}),te=new pd;te.reset(re(k),k.held);let la=0;const mo=e=>JSON.stringify({...e,favoriteChords:0,chordPads:0});function L(e,t={}){const n=re(k);k=e,md();const o=re(k);if(mo(n)!==mo(o)||t.jump!==void 0){const r=X.set(o,t);r===null?(te.reset(o,k.held),t.jump!==void 0&&(la=t.jump)):te.mark({beat:r,settings:o,pad:k.held,...t})}sa(),K()}let ot=[];function ir(){try{ot=ie?.notesTargets?.()??[]}catch{ot=[]}}const zn=new Map;function sa(){if(de)for(const e of ot){if(!e.takesNotes)continue;const t=k.targets[e.instance],n={role:t?.role??"chord",on:t?.on===!0,transpose:(t?.octave??0)*12},o=JSON.stringify(n);zn.get(e.instance)!==o&&(zn.set(e.instance,o),de.setTarget(e.instance,n))}}function $(e,t={},...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t))i!==void 0&&o.setAttribute(r,i);for(const r of n)r!==null&&r!==!1&&o.append(r);return o}const Y=e=>({[Nt]:Vi(e)||void 0});function R(e,t,n){const o=$("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function V(e,t,n){return $(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?Y(t):{}},e)}function Ot(e,t,n,o,r,i=!1){const l=$("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-cal-id":e});for(const s of n){const c=R(s.label,{role:"radio","aria-checked":String(s.value===o),"data-value":s.value,"data-cal-id":`${e}-${s.value}`},()=>{s.value!==o&&r(s.value)});c.disabled=i,l.append(c)}return l}function j(e,t,n,o,r,i,l=!1){const s=$("select",{class:"nc-select",id:`cal-${e}`,"data-cal-id":e});let c=null;for(const p of o){const d=$("option",{value:p.value},p.label);p.group&&c?.label!==p.group?(c=$("optgroup",{label:p.group}),s.append(c)):p.group||(c=null),(c??s).append(d)}return s.value=r,s.disabled=l,s.addEventListener("change",()=>i(s.value)),$("div",{class:"cal-field"},V(t,n,`cal-${e}`),s)}const bd=e=>e>0?`+${e}`:e<0?`−${-e}`:"0",rr=e=>e===0?"Root":`${e}${["st","nd","rd"][e-1]??"th"}`;function be(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.calId:void 0;e.replaceChildren(...t.filter(r=>!!r)),o&&e.querySelector(`[data-cal-id="${CSS.escape(o)}"]`)?.focus()}const lr=document.getElementById("app");lr.classList.add("nc","nc-page");Pc();function wd(){const e=new Blob([JSON.stringify(Qi(k),null,2)],{type:"application/json"}),t=$("a",{href:URL.createObjectURL(e),download:`calliope-${ra}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const De=$("input",{type:"file",accept:".json,application/json"});De.hidden=!0;let Dt="";De.addEventListener("change",async()=>{const e=De.files?.[0];if(De.value="",!(!e||e.size>256*1024)){try{const t=Zi(JSON.parse(await e.text()));if(!t)throw new Error("not a CALLIOPE file");L(t),Dt=`Loaded ${e.name}.`}catch(t){Dt=`Couldn't load ${e.name}: ${t.message}.`}K()}});function xd(){X.stop();const e=st();e.running&&X.start(e.beatAt(Math.max(e.startTime??Qe(),Qe())),!0),te.reset(re(k),k.held)}const In=(e,t)=>R(e,{class:"nc-page-action","data-cal-action":e.toLowerCase(),...Y(`page:${e.toLowerCase()}`)},t),fo=Rc({panel:$("div",{},In("Save",wd),In("Load",()=>De.click()))}),vd=$("header",{class:"nc-page-hd"},$("div",{},$("h1",{class:"nc-page-title"},$("span",{class:"cal-brand"},"CALLIOPE")," ",$("span",{class:"nc-page-sep"},"/")," GENERATOR ",$("span",{class:"nc-page-sep"},"/")," ",$("span",{class:"nc-mono"},ra)),$("p",{class:"nc-page-sub"},"A NetComposer element.")),$("div",{class:"nc-page-actions"},fo.panel,In("Panic",xd),fo.button,De)),sr=$("div",{class:"nc-stack cal-stack","data-nc-layout":"adjacent"}),cr=$("footer",{class:"cal-foot"},$("span",{},"double-click any slider to reset"),$("span",{},`netcomposer.generator.${ra}`));lr.append(vd,$("main",{class:"nc-page-body"},sr),cr);window.matchMedia(at).matches&&!Be()?.getItem(Ln)&&An(Be(),"rhythm",!0,Ln);function ct(e,t,n){const o=$("div",{class:"cal-body","data-cal-module":e}),r=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=Uc(r(),Ln),l=()=>{const s=i.el.querySelector(`[data-nc-id="${e}-mount"]`);s&&s.nextSibling!==o&&s.after(o)};return l(),{handle:i,mount:o,update(){i.update(r()),l()}}}function dr(){const e=st();return X.playing&&e.running?e.beatAt(Qe()):null}function it(){return Math.max(1,st().meter?.beatsPerBar??4)}function ca(){const e=dr();if(e===null){const l={settings:re(k),pad:k.held},s=ce(k.gen.chordProgression,k.gen.note,k.gen.octave,k.gen.progressionBars),c=Et(l,{index:Math.min(la,(s?.length??1)-1)}),p=k.held===null&&c.step!==null?ho(l.settings,c.step):null;return{playing:!1,beat:0,now:c,activePad:k.held,queuedPad:null,queuedBeat:null,next:p?{name:p.name,detail:"",when:`bar ${p.bar}`}:null,step:c.step}}const t=te.at(e),n=t.pad===null?X.chordPosition(e):null,o=Et(t,n),r=te.after(e);let i=null;if(r){const l=Et(r,r.jump!==void 0?{index:r.jump}:X.chordPosition(r.beat)),s=nr(r.beat,it()),c=r.beat-e<=1+1e-6;i={name:l.name,detail:l.pad!==null?`Pad ${l.pad+1}`:l.step!==null?"progression":"",when:`on ${s.beat===1?`bar ${s.bar}`:`beat ${s.beat}`}${c?" (next beat)":""}`}}else if(o.step!==null&&n){const l=ho(t.settings,o.step);l&&(i={name:l.name,detail:"",when:`on bar ${l.bar}`})}return{playing:!0,beat:e,now:o,activePad:t.pad,queuedPad:r?.pad??null,queuedBeat:r?.beat??null,next:i,step:o.step}}function pr(e){const t=$("div",{class:"cal-now","data-cal-now":e,role:"status"}),n=$("div",{class:"cal-now-hd"},V("Now playing","now-playing"),$("span",{class:"cal-mono cal-sub","data-cal":"pos"})),o=$("div",{class:"cal-now-name","data-cal":"name"}),r=$("span",{class:"cal-mono cal-sub","data-cal":"detail"}),i=$("div",{class:"cal-mono cal-sub cal-small","data-cal":"voicing"}),l=$("span",{class:"cal-meter","aria-hidden":"true"});for(let d=0;d<4;d++)l.append($("i",{}));const s=$("div",{class:"cal-next"},V("Next"),$("span",{class:"cal-next-name","data-cal":"next"}),l),c=$("div",{class:"cal-mono cal-sub cal-small","data-cal":"when"});t.append(n,$("div",{class:"cal-now-row"},o,r),i,s,c);let p="";return{el:t,tick(d){const u=nr(d.beat,it()),h=JSON.stringify([d.playing,u,d.now,d.next]);h!==p&&(p=h,n.lastChild.textContent=d.playing?`bar ${u.bar} · beat ${u.beat}`:"stopped",o.textContent=d.now.name,r.textContent=d.now.detail,i.textContent=d.now.voicing,s.children[1].textContent=d.next?`${d.next.name}${d.next.detail?` · ${d.next.detail}`:""}`:"—",c.textContent=d.next?.when??"",[...l.children].forEach((f,b)=>f.toggleAttribute("data-on",d.playing&&b<u.beat)),l.style.setProperty("--cal-beats",String(it())))}}}const ur=pr("targets"),hr=pr("pads"),mr=ct("mode","Mode",()=>`${k.gen.mode} · ${Ae[k.gen.note]}${k.gen.octave}`),Oe=ct("chord","Chord",()=>Et({settings:k.gen,pad:null},null).name);Oe.handle.el.dataset.ncPlace="stack";Oe.handle.el.dataset.ncShade="1";function yd(){const e=k.gen,t=[$("div",{class:"cal-field"},V("Mode","mode"),Ot("mode","Mode",[{value:"off",label:"Off"},{value:"single",label:"Single"},{value:"chord",label:"Chord"},{value:"random",label:"Random"}],e.mode,n=>L(P(k,{mode:n})))),$("div",{class:"cal-grid2"},j("note","Note","note",Ae.map((n,o)=>({value:String(o),label:n})),String(e.note),n=>L(P(k,{note:Number(n)}))),j("octave","Octave","octave",[1,2,3,4,5,6].map(n=>({value:String(n),label:String(n)})),String(e.octave),n=>L(P(k,{octave:Number(n)}))))];e.mode==="random"&&t.push(j("octave-range","Octave range","octave-range",[1,2,3].map(n=>({value:String(n),label:`${n} oct`})),String(e.octaveRange),n=>L(P(k,{octaveRange:Number(n)})))),be(mr.mount,...t,Oe.handle.el)}let Ue="";const Xe=$("input",{type:"search",class:"cal-input",id:"cal-search",placeholder:"all categories","data-cal-id":"search"});Xe.addEventListener("input",()=>{Ue=Xe.value,da()});function da(){const e=k.gen,t=G(e.chord),n=e.favoriteChords,o=qe((e.octave+1)*12+e.note,t.id,e.inversion,e.arpSpread).map(Je).join(" "),r=$("div",{class:"cal-row-between"},V("Chord","chord"),R(Z.library?"Close library":"Browse chords",{class:"nc-page-action cal-ghost","aria-expanded":String(Z.library),"data-cal-id":"browse",...Y("browse")},()=>{Z.library=!Z.library,fd(),da()})),i=$("div",{},$("div",{class:"cal-chord-name","data-cal":"chord-name"},nt(e.note,e.chord)),$("div",{class:"cal-sub cal-small"},`${t.name} · ${t.category}`),$("div",{class:"cal-mono cal-sub cal-small cal-voicing"},o));let l=null;if(Z.library){const s=Ue.trim().toLowerCase(),c=s?Fe.filter(d=>d.name.toLowerCase().includes(s)||d.symbol.trim().toLowerCase().includes(s)||d.id.includes(s)):k.chordCategory==="Favorites"?Fe.filter(d=>n.includes(d.id)):Fe.filter(d=>d.category===k.chordCategory),p=$("ul",{class:"cal-library","aria-label":"Chord library"});for(const d of c){const u=d.id===e.chord,h=n.includes(d.id),f=R("",{class:"cal-lib-pick","aria-current":String(u),"data-cal-id":`chord-${d.id}`},()=>L(P(k,{chord:d.id,inversion:Math.min(e.inversion,d.intervals.length-1)})));f.append($("span",{class:"cal-ellipsis"},d.name),$("span",{class:"cal-mono cal-sub cal-small"},`${s?`${d.category} · `:""}${d.intervals.length}n`));const b=R(h?"★":"☆",{class:"cal-star","aria-pressed":String(h),"aria-label":`${h?"Unfavorite":"Favorite"} ${d.name}`,"data-cal-id":`star-${d.id}`},()=>L(P(k,h?{favoriteChords:n.filter(w=>w!==d.id)}:{favoriteChords:[...n,d.id],chordPads:Yr(e.chordPads,d.id,e.note)})));p.append($("li",{class:"cal-lib-row","data-on":String(u)},f,b))}c.length||p.append($("li",{class:"cal-sub cal-small"},s?`No chord named “${Ue.trim()}”.`:"No favorites yet. Star chords to collect them here.")),Xe.value!==Ue&&(Xe.value=Ue),l=$("div",{class:"cal-browser",id:"cal-browser"},$("div",{class:"cal-grid2"},j("category","Category","category",[{value:"Favorites",label:`Favorites (${n.length})`},...vo.map(d=>({value:d,label:d}))],k.chordCategory,d=>L({...k,chordCategory:d})),$("div",{class:"cal-field"},V("Search","search","cal-search"),Xe)),$("div",{class:"cal-mono cal-sub cal-small","aria-live":"polite"},s?`${c.length} match${c.length===1?"":"es"} across all categories`:`${c.length} in ${k.chordCategory}`),p)}be(Oe.mount,r,i,l)}const Ht=ct("pads","Chord pads",()=>`${k.gen.chordPads.filter(Boolean).length} pads${k.held!==null?` · Pad ${k.held+1} held`:""}`),ze=$("div",{class:"cal-pads",role:"group","aria-label":"Chord pads",...Y("pads")});let W=null,Te=null,gt=!1;function $d(e,t){const n=document.elementFromPoint(e,t)?.closest("[data-pad-index]"),o=n?Number(n.getAttribute("data-pad-index")):Number.NaN;return Number.isInteger(o)?o:null}function kd(e){if(!k.gen.chordPads[e]){W=W===e?null:e,K();return}k.held===e&&te.after(dr()??Number.POSITIVE_INFINITY)===null&&X.playing||L(oa(k,e))}function go(e,t){if(e===t)return;const n=r=>r===null?r:r===e?t:e<t&&r>e&&r<=t?r-1:e>t&&r>=t&&r<e?r+1:r;W=n(W);const o=n(k.held);k={...k,held:o},L({...P(k,{chordPads:Wr(k.gen.chordPads,e,t)}),held:o})}function Ed(e){const t=k.gen,n=window.matchMedia(at).matches,o=t.chordPads.filter(Boolean).length,r=!n||Z.allPads||[e.activePad,e.queuedPad,W].some(s=>s!==null&&s>=8),i=[];t.chordPads.slice(0,r?Ze:8).forEach((s,c)=>{const p=s?tr(s,t):"",d=!!s&&!t.favoriteChords.includes(s.chord),u=R("",{class:"cal-pad","data-pad-index":String(c),"data-cal-id":`pad-${c}`,"data-filled":s?"":void 0,"aria-label":s?`Pad ${c+1}: ${p}`:`Pad ${c+1}: empty, choose a chord`},()=>{if(gt){gt=!1;return}(k.latch||!s)&&kd(c)});u.append($("span",{class:"cal-pad-name"},s?p:"+"),$("span",{class:"cal-pad-meta"},s?Qr(s)||" ":"empty"),$("span",{class:"cal-pad-meta"},d?"not ★":" ")),u.addEventListener("pointerdown",b=>{if(b.button!==0)return;const w=b.pointerType!=="mouse";Te={i:c,id:b.pointerId,x:b.clientX,y:b.clientY,dragging:!1,over:c,timer:null,held:!1,touch:w};const m=Te;m.timer=window.setTimeout(()=>{m.held=!0,m.timer=null},450),w||u.setPointerCapture?.(b.pointerId),!k.latch&&s&&L(oa(k,c))}),u.addEventListener("pointermove",b=>{const w=Te;if(!w||w.id!==b.pointerId)return;const m=Math.hypot(b.clientX-w.x,b.clientY-w.y)>8;if(!w.dragging){if(!m||!t.chordPads[w.i])return;if(w.touch&&!w.held){w.timer&&clearTimeout(w.timer),Te=null;return}w.dragging=!0}w.over=$d(b.clientX,b.clientY)??w.over;for(const g of ze.querySelectorAll("[data-drop]"))g.removeAttribute("data-drop");w.over!==w.i&&ze.querySelector(`[data-pad-index="${w.over}"]`)?.setAttribute("data-drop",w.over>w.i?"after":"before")});const h=b=>{const w=Te;!w||w.id!==b.pointerId||(Te=null,w.timer&&clearTimeout(w.timer),!k.latch&&s&&k.held===c&&L(od(k)),w.dragging?(gt=!0,go(w.i,w.over)):w.held&&w.touch&&(gt=!0,W=c,K()))};u.addEventListener("pointerup",h),u.addEventListener("pointercancel",h),u.addEventListener("contextmenu",b=>{b.preventDefault(),W=c,K()}),u.addEventListener("keydown",b=>{if(!b.altKey)return;const w={ArrowLeft:-1,ArrowRight:1,ArrowUp:-4,ArrowDown:4}[b.key];if(!w)return;b.preventDefault();const m=Math.max(0,Math.min(Ze-1,c+w));go(c,m),ze.querySelector(`[data-pad-index="${m}"]`)?.focus()});const f=R("⋯",{class:"cal-pad-more","aria-label":`Pad ${c+1} menu`,"aria-expanded":String(W===c),"data-cal-id":`pad-menu-${c}`},()=>{W=W===c?null:c,K()});i.push($("div",{class:"cal-pad-wrap"},u,f))}),be(ze,...i),fr(e);const l=[hr.el,$("div",{class:"cal-field"},V("Root","root"),Ot("pad-mode","Root",[{value:"pad",label:"Pad root"},{value:"follow",label:"Follow root"}],t.chordPadMode,s=>L(P(k,{chordPadMode:s})))),ze];n&&l.push(R(r?"Fewer pads":`All 16 pads · ${o} filled`,{class:"nc-page-action cal-ghost cal-left","aria-expanded":String(r),"data-cal-id":"all-pads",...Y("all-pads")},()=>{Z.allPads=!r,K()})),W!==null&&l.push(Ad(W)),l.push(Sd(e,n)),l.push($("div",{class:"cal-grid2"},j("inversion","Inversion","inversion",Array.from({length:G(t.chord).intervals.length},(s,c)=>({value:String(c),label:rr(c)})),String(t.inversion),s=>L(P(k,{inversion:Number(s)}))),j("voice-leading","Voice leading","voice-leading",[{value:"smooth",label:"Smooth"},{value:"fixed",label:"Fixed"}],t.voiceLeading,s=>L(P(k,{voiceLeading:s}))))),be(Ht.mount,...l)}function Ad(e){const t=k.gen,n=t.chordPads[e]??null,o=i=>{const l=Kr(t.chordPads,e,i);L({...P(k,{chordPads:l}),held:i||k.held!==e?k.held:null})},r=[{value:"",label:"Empty"},...n&&!t.favoriteChords.includes(n.chord)?[{value:n.chord,label:`${G(n.chord).name} (not starred)`}]:[],...t.favoriteChords.map(i=>({value:i,label:G(i).name})),...!n||t.favoriteChords.includes(t.chord)||n.chord===t.chord?[]:[{value:t.chord,label:`${G(t.chord).name} (the Chord)`}]];return $("div",{class:"cal-browser cal-pad-panel",role:"group","aria-label":`Pad ${e+1}`},$("div",{class:"cal-row-between"},V(`Pad ${e+1}${n?` · ${tr(n,t)}`:""}`),R("Done",{class:"nc-page-action cal-ghost","data-cal-id":"pad-done"},()=>{W=null,K()})),$("div",{class:"cal-grid2"},j("pad-chord","Chord","pads",n?r:[{value:"",label:"Empty"},{value:`cur:${t.chord}`,label:`${nt(t.note,t.chord)} (the Chord)`},...t.favoriteChords.map(i=>({value:i,label:G(i).name}))],n?.chord??"",i=>{if(!i)return o(null);if(i.startsWith("cur:"))return o({chord:t.chord,root:t.note,inversion:t.inversion});o({chord:i,root:n?.root??t.note,inversion:i===n?.chord?n.inversion:0})}),t.chordPadMode==="pad"?j("pad-root","Root","root",Ae.map((i,l)=>({value:String(l),label:i})),String(n?.root??t.note),i=>n&&o({...n,root:Number(i)}),!n):null,j("pad-inversion","Inversion","inversion",Array.from({length:n?G(n.chord).intervals.length:1},(i,l)=>({value:String(l),label:rr(l)})),String(n?.inversion??0),i=>n&&o({...n,inversion:Number(i)}),!n)),R("Clear pad",{class:"nc-page-action cal-ghost cal-left","data-cal-id":"pad-clear"},()=>{o(null),W=null,K()}))}const bt=Co.flatMap(e=>qt.filter(t=>t.group===e).map(t=>t.id));function Md(e,t){const n=bt.length,o=bt.indexOf(e);return o<0?bt[t>0?0:n-1]:bt[((o+t)%n+n)%n]}function Sd(e,t){const n=k.gen,o=Lo(n.chordProgression),r=ce(n.chordProgression,n.note,n.octave,n.progressionBars),i=Yi(k),l=$("div",{class:"cal-prog","data-paused":i?"":void 0}),s=t&&!Z.progression,c=$("div",{class:"cal-row-between"},t?R("",{class:"cal-fold","aria-expanded":String(!s),"data-cal-id":"prog-fold",...Y("progression")},()=>{Z.progression=!Z.progression,K()}):V("Progression","progression","cal-progression"),t&&s?$("span",{class:"cal-mono cal-sub cal-small"},o?`${o.short}${i?" · paused":""}`:"off"):R("Off",{class:"nc-page-action cal-ghost","data-cal-id":"prog-off",...Y("progression-off")},()=>L(tn(k,"off"))));if(t&&c.firstChild.append(V("Progression")),t||(c.lastChild.disabled=!o),l.append(c),s)return l;const p=$("select",{class:"nc-select cal-prog-select",id:"cal-progression","data-cal-id":"progression","aria-label":"Progression"});p.append($("option",{value:"off"},"Off · single chord"));for(const h of Co){const f=$("optgroup",{label:h});for(const b of qt.filter(w=>w.group===h))f.append($("option",{value:b.id},`${b.name}   ${$a(b.level)}`));p.append(f)}p.value=o?o.id:"off",p.addEventListener("change",()=>L(tn(k,p.value)));const d=$("div",{class:"cal-prog-pick"},$("div",{class:"nc-select cal-prog-face","data-on":o?"":void 0,"aria-hidden":"true"},$("span",{class:"cal-ellipsis"},o?`${o.short} · ${o.name}`:"Off · single chord"),o?$("span",{class:"cal-mono cal-sub cal-small"},$a(o.level)):null),p),u=[-1,1].map(h=>R(h<0?"◀":"▶",{class:"cal-step-btn","aria-label":h<0?"Previous progression":"Next progression","data-cal-id":`prog-${h}`},()=>L(tn(k,Md(n.chordProgression,h)))));if(l.append($("div",{class:"cal-row"},d,...u)),r&&o){const h=$("div",{class:"cal-strip","aria-label":"Progression chords","data-cal":"strip"});for(const m of r){const g=R("",{class:"cal-step","data-step":String(m.index),"data-cal-id":`step-${m.index}`,"aria-label":`Play from ${m.name}, ${m.numeral}`,...Y("progression-step")},()=>L(Ki(k),{jump:m.index}));g.append($("span",{class:"cal-pad-name"},m.name),$("span",{class:"cal-pad-meta"},m.numeral),$("span",{class:"cal-pad-meta"},ka(m.bars))),h.append(g)}const f=jt(r),b=e.step??Math.min(la,r.length-1),w=e.playing&&!i&&e.step!==null?Math.floor((e.beat-X.startBeat)/it()%f)+1:Math.floor(jn(r,b))+1;l.append(h,$("div",{class:"cal-row-between cal-mono cal-small"},$("span",{class:"cal-sub"},`in ${Ae[n.note]} · ${n.progressionBars>0?`${ka(n.progressionBars)} per chord`:"as written"} · loops`),$("span",{"data-cal":"bar"},`bar ${w} of ${f}`)),$("div",{class:"cal-field"},V("Bars per chord","bars"),Ot("bars","Bars per chord",To.map(m=>({value:String(m),label:m===0?"as written":zo(m)})),String(n.progressionBars),m=>L(P(k,{progressionBars:Number(m)}))))),i&&l.append($("p",{class:"cal-mono cal-sub cal-small","data-cal":"paused"},`paused while Pad ${(k.held??0)+1} holds · click a step to go back`))}return l}function fr(e){for(const n of ze.querySelectorAll("[data-pad-index]")){const o=Number(n.dataset.padIndex),r=e.activePad===o,i=e.queuedPad===o&&!r;n.hasAttribute("data-active")!==r&&n.toggleAttribute("data-active",r),n.hasAttribute("data-queued")!==i&&n.toggleAttribute("data-queued",i),n.setAttribute("aria-current",String(r))}const t=Yi(k)&&e.activePad!==null;for(const n of Ht.mount.querySelectorAll("[data-step]")){const o=!t&&e.step===Number(n.dataset.step);n.setAttribute("aria-current",String(o))}}const gr=ct("rhythm","Rhythm",()=>{const e=k.gen,t=ve.find(o=>o.id===e.chordStyle)?.label??e.chordStyle,n=e.arp==="off"?"arp off":`arp ${Me.find(o=>o.id===e.arp)?.name??e.arp}${e.arp==="euclidean"?` ${e.arpHits}/${e.arpSteps}`:""}`;return`${t} · ${n} · grid ${Fo(e.interval)} · gate ${Math.round(e.gate)}%`}),pa=ta({id:"strum",label:"Strum",min:0,max:Eo,step:1,value:k.gen.strum,taper:"time",format:e=>e>0?`${Math.round(e)} ms ↓↑`:"off",onInput:e=>L(P(k,{strum:e}))}),ua=ta({id:"tension",label:"Tension",min:0,max:100,step:1,value:k.gen.tension,format:e=>`${Math.round(e)}%`,onInput:e=>L(P(k,{tension:e}))}),ha=ta({id:"gate",label:"Gate",min:10,max:100,step:1,value:k.gen.gate,format:e=>`${Math.round(e)}%`,onInput:e=>L(P(k,{gate:e}))});for(const[e,t,n]of[[pa,"strum",0],[ua,"tension",0],[ha,"gate",75]])e.el.setAttribute(Nt,Vi(t)),e.el.addEventListener("dblclick",()=>{e.set(n),L(P(k,{[t]:n}))});const br=$("div",{class:"cal-col"}),wr=$("div",{class:"cal-col"}),xr=$("div",{class:"cal-col"});gr.mount.append(br,$("div",{class:"cal-grid2"},pa.el,ua.el),$("hr",{class:"cal-rule"}),wr,$("hr",{class:"cal-rule"}),xr,ha.el);const Cd=()=>{let e=7;return()=>(e=e*48271%2147483647,e/2147483647)};function Ld(){const e=re(k),n=ce(e.chordProgression,e.note,e.octave,e.progressionBars)?.[0],o=G(e.chord),r=n?At(n.root,n.intervals,n.inversion??Math.min(e.inversion,n.intervals.length-1),e.arpSpread):qe((e.octave+1)*12+e.note,o.id,e.inversion,e.arpSpread),i=qr(e.chordStyle,r,n?.rootPc??e.note,n?.intervals??o.intervals,e.interval,e.gate,Cd()),l="http://www.w3.org/2000/svg",s=470,c=30,p=14,d=128,u=4,h=document.createElementNS(l,"svg");h.setAttribute("class","cal-roll"),h.setAttribute("viewBox",`0 0 ${s} ${d}`),h.setAttribute("role","img"),h.setAttribute("aria-label",`One bar: ${i.length} hit${i.length===1?"":"s"}`);const f=(A,S,M)=>{const z=document.createElementNS(l,A);for(const[N,ne]of Object.entries(S))z.setAttribute(N,String(ne));M&&(z.textContent=M),h.append(z)},b=[...new Set(i.flatMap(A=>A.notes))].sort((A,S)=>A-S),w=Math.max(b.length,8),m=(d-p)/w,g=u*4,y=(s-c)/g,x=A=>d-p-(b.indexOf(A)+1)*m;for(const A of b)A%12===0&&f("rect",{class:"cal-roll-c",x:c,y:x(A),width:s-c,height:m});for(let A=0;A<=g;A++)f("line",{class:A%4===0?"cal-roll-beat":"cal-roll-line",x1:c+A*y,x2:c+A*y,y1:0,y2:d-p});const E=b.filter(A=>A%12===0);!E.length&&b.length&&E.push(b[0]);for(const A of E)f("text",{class:"cal-roll-label",x:0,y:x(A)+m*.8},Je(A));for(let A=0;A<u;A++)f("text",{class:"cal-roll-label",x:c+A*4*y+2,y:d-2},String(A+1));for(const A of i)for(const S of A.notes)f("rect",{class:"cal-roll-note",x:c+A.step*y+1,y:x(S)+1.5,width:Math.max(3,A.len*y-2),height:Math.max(1,m-3),rx:1.5,"fill-opacity":.25+.75*A.velocity});return h}function Td(e,t){const n=ve.findIndex(r=>r.id===e),o=ve.length;return ve[((n<0?0:n+t)%o+o)%o].id}function zd(){const e=k.gen;be(br,$("div",{class:"cal-row cal-end"},$("div",{class:"cal-grow"},j("style","Style","style",ve.map(i=>({value:i.id,label:i.label})),e.chordStyle,i=>L(P(k,{chordStyle:i})))),...[-1,1].map(i=>R(i<0?"◀":"▶",{class:"cal-step-btn","aria-label":i<0?"Previous style":"Next style","data-cal-id":`style-${i}`},()=>L(P(k,{chordStyle:Td(e.chordStyle,i)}))))),$("div",{class:"cal-roll-box","data-arp":e.arp!=="off"?"":void 0},Ld())),pa.set(e.strum),ua.set(e.tension),ha.set(e.gate);const t=e.arp!=="off",n=Dn(e),o=t?new Set(qe((e.octave+1)*12+e.note,e.chord,e.inversion,e.arpSpread).flatMap(i=>Array.from({length:e.arpOctaves},(l,s)=>i+12*s)).filter(i=>i<=127)).size:0,r=(i,l=1)=>Array.from({length:i},(s,c)=>({value:String(c+l),label:String(c+l)}));be(wr,$("div",{class:"cal-row-between"},V("Arp","arp"),$("span",{class:"cal-row"},R("arp",{class:"cal-toggle","aria-pressed":String(t),"data-cal-id":"arp",...Y("arp")},()=>L(id(k))),R("latch",{class:"cal-toggle","aria-pressed":String(k.latch),"data-cal-id":"latch",...Y("latch")},()=>L({...k,latch:!k.latch,held:(k.latch,k.held)})))),$("div",{class:"cal-grid2"},j("note-order","Note order","note-order",Me.filter(i=>i.id!=="off"&&!i.legacy).map(i=>({value:i.id,label:i.name})),t?e.arp:k.lastArp,i=>L({...P(k,{arp:i}),lastArp:i}),!t),j("octaves","Octaves","octaves",[1,2,3,4].map(i=>({value:String(i),label:`${i} oct`})),String(e.arpOctaves),i=>L(P(k,{arpOctaves:Number(i)})),!t),j("spread","Spread","spread",["compact","wide","wider","maximum"].map(i=>({value:i,label:i[0].toUpperCase()+i.slice(1)})),e.arpSpread,i=>L(P(k,{arpSpread:i}))),$("div",{class:"cal-field",...Y("rate")},V("Rate","rate"),$("span",{class:"cal-mono cal-readout","data-cal":"rate"},`${Fo(e.interval)} · ${Math.round(Id())}`))),e.arp==="euclidean"?$("div",{class:"cal-grid2"},j("hits","Hits","hits",r(n.steps),String(n.hits),i=>L(P(k,{arpHits:Number(i)}))),j("steps","Steps","steps",r(16),String(n.steps),i=>L(P(k,{arpSteps:Number(i)}))),j("rotate","Rotate","rotate",r(n.steps,0),String(n.rotate),i=>L(P(k,{arpRotate:Number(i)}))),$("div",{class:"cal-field",...Y("pattern")},V("Pattern","pattern"),$("span",{class:"cal-mono cal-readout"},n.steps<=8?fa(n).split("").join(" "):fa(n)))):null,t?$("p",{class:"cal-mono cal-sub cal-small"},`${o} notes in arpeggio`):null),be(xr,j("grid","Grid","grid",Mt.map(i=>({value:String(i.value),label:i.short})),String(Mt.find(i=>Math.abs(i.value-e.interval)<1e-6)?.value??e.interval),i=>L(P(k,{interval:Number(i)}))))}function Id(){const e=st();return typeof e.bpm=="number"?e.bpm:120}const ma=ct("targets","Targets",()=>{const e=Object.values(k.targets).filter(t=>t.on).length;return e?`${e} on`:"none on"}),Fd=[{value:"chord",label:"Chord"},{value:"root",label:"Root"},{value:"top",label:"Top"}];function Pd(){const e=dd(ot,k.targets,ie?.instance??""),t=[ur.el];ie?de||t.push($("p",{class:"cal-sub"},"This Studio has no notes bus yet: update it to play instruments from CALLIOPE.")):t.push($("p",{class:"cal-sub"},"CALLIOPE plays instruments in NetComposer Studio. Open it there: ",$("a",{href:"/studio/"},"Studio"),"."));for(const n of e.playable)t.push(bo(n));for(const n of e.coming)t.push(bo(n));ie&&!e.playable.length&&!e.coming.length&&t.push($("p",{class:"cal-sub cal-small"},"Add a Synth to play it from CALLIOPE.")),e.none.length&&t.push($("p",{class:"cal-small","data-cal":"no-notes"},`${Nd(e.none)} take${e.none.length===1?"s":""} no notes.`)),t.push($("div",{class:"cal-inputs","aria-disabled":"true",...Y("inputs")},$("div",{class:"cal-row-between"},V("Inputs"),$("span",{class:"cal-mono cal-small"},"with Situation v1")),...["Events","Energy","Harmony"].map(n=>$("div",{class:"cal-row-between"},$("span",{},n),$("span",{class:"cal-mono cal-small"},"ignore"))))),be(ma.mount,...t)}function Nd(e){return e.length<2?e[0]??"":`${e.slice(0,-1).join(", ")} and ${e.at(-1)}`}function bo(e){const t=k.targets[e.instance]??{on:!1,role:"chord",octave:0},n=!e.playable,o=t.on&&!n,r=e.instance.replace(/[^a-z0-9]/gi,"-"),i=$("div",{class:"cal-row-between"},$("span",{class:"cal-row cal-target-name"},$("i",{class:"cal-dot","data-cal-dot":e.instance,"aria-hidden":"true"}),$("span",{},e.label),$("span",{class:"cal-mono cal-sub cal-small"},String(e.n).padStart(2,"0"))),R(o?"On":"Off",{class:"cal-onoff",role:"switch","aria-checked":String(o),"aria-label":`Play ${e.name} from CALLIOPE`,"data-cal-id":`on-${r}`,...Y("target-on")},()=>{L(Ke(k,e.instance,{on:!t.on}))}));i.lastChild.disabled=n;const l=$("div",{class:"cal-target-body"},$("div",{class:"cal-field cal-grow"},V("Role","role"),Ot(`role-${r}`,`${e.name} role`,Fd,t.role,s=>L(Ke(k,e.instance,{role:s})),n)),$("div",{class:"cal-oct"},j(`oct-${r}`,"Octave","target-octave",Array.from({length:Ui-$t+1},(s,c)=>({value:String(c+$t),label:bd(c+$t)})),String(t.octave),s=>L(Ke(k,e.instance,{octave:Number(s)})),n)));return $("div",{class:"cal-target","data-target":e.instance,"data-on":o?"":void 0,"data-disabled":n?"":void 0},i,l,e.note?$("p",{class:"cal-mono cal-sub cal-small"},e.note):null)}const vr=[mr,Ht,gr,ma];Wc(sr,vr.map(e=>e.handle),"adjacent");const wo=Oe.handle.el.querySelector("[data-nc-index]");wo&&(wo.textContent="01a");function K(){const e=ca();da(),yd(),Ed(e),zd(),Pd();for(const n of[...vr,Oe])n.update();const t=$("p",{class:"cal-mono cal-sub cal-small",role:"status"},Dt);Dt&&cr.firstChild?.replaceWith(t),Fn="",yr()}let Fn="",xo="";function yr(){const e=ca();ur.tick(e),hr.tick(e);const t=JSON.stringify([e.activePad,e.queuedPad,e.step,e.playing&&Math.floor(e.beat)]);if(t!==Fn){Fn=t,fr(e);const i=Ht.mount.querySelector('[data-cal="bar"]'),l=k.gen,s=ce(l.chordProgression,l.note,l.octave,l.progressionBars);if(i&&s&&e.playing){const c=jt(s);i.textContent=`bar ${Math.floor(Math.max(0,e.beat-X.startBeat)/it()%c+1e-9)+1} of ${c}`}}const n=e.playing?e.beat:null;n!==null&&me.length>256&&(me=me.filter(i=>i.end>n-1));const o=n!==null&&me.some(i=>i.start<=n&&i.end>n);for(const i of ma.mount.querySelectorAll("[data-cal-dot]")){const l=o&&!!k.targets[i.dataset.calDot??""]?.on;i.hasAttribute("data-on")!==l&&i.toggleAttribute("data-on",l)}const r=e.playing?JSON.stringify({now:e.now.name,next:e.next?.name??""}):"";if(r!==xo){xo=r;try{de?.status?.(r?JSON.parse(r):null)}catch{}}e.playing&&te.prune(e.beat-1)}ir();ie?.onNotesTargets?.(()=>{ir(),zn.clear(),sa(),K()});de?.onTakeBack?.(e=>{const t=JSON.parse(JSON.stringify(ld(k)));return queueMicrotask(()=>L(Ke(k,e,{on:!1}))),t});function Dd(){try{const e=window.frameElement;return!e||e.classList.contains("shown")}catch{return!0}}let Pn=!1;function Nn(){if(yr(),!X.playing){Pn=!1;return}Dd()?requestAnimationFrame(Nn):window.setTimeout(Nn,200)}function qd(){Pn||(Pn=!0,requestAnimationFrame(Nn))}Tn&&Yc(Tn,X,Qe,{started:()=>{te.reset(re(k),k.held),qd()},stopped:()=>{te.reset(re(k),k.held),K()}});sa();ie?.providePreset?.({format:"netcomposer.calliope",version:1,get:()=>Qi(k),set:e=>{const t=Zi(e);t&&L(t)}});window.setInterval(()=>X.pump(),Jc);K();window.matchMedia(at).addEventListener("change",()=>K());window.__calliope={get state(){return k},driver:X,timeline:te,live:ca,apply:L,holdPad:e=>L(oa(k,e)),resume:e=>L(Ki(k),{jump:e}),setTarget:(e,t)=>L(Ke(k,e,t)),patch:e=>L(P(k,e)),get targets(){return ot},get hosted(){return!!ie},get source(){return de?.id??null}};
