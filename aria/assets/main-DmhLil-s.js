import{m as _r,i as Ur,M as Vr,w as Yr,h as T,D as Gr,c as Wr,t as Xr,r as Kr,a as ro,b as Qr,l as Zr,d as Jr,p as el,f as tl,S as al,u as nl,s as Zo}from"./sensors-G6N6u5RL.js";const xt=1,ol=32,il=32;function rl(e,t){return{v:xt,kind:"energy",source:e,frames:t.slice(0,ol)}}function ll(e,t){return{v:xt,kind:"table",source:e,...t}}function Jo(e,t){return{v:xt,kind:"off",source:e,reason:t}}function sl(e,t){return{v:xt,kind:"motion",source:e,frames:t.slice(0,il)}}function dl(e,t,n){return{v:xt,kind:"shake",source:e,at:t,strength:n}}var cl="nc-ui",ul={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Xa={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},zt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},pl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ie={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},hl={light:{color:ul.color,semantic:Xa,component:zt,runtime:pl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},dt=e=>`--${cl}-${e}`,ba=Xa["label-on-fill-dark"],lo=Xa["label-on-fill-light"],ml=Ie["label-min-contrast"],fl=/^#[0-9a-f]{6}$/i,gl=e=>typeof e=="string"&&fl.test(e),Tt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function so(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=r=>{let l=(r+e/30)%12;return n-o*Math.max(-1,Math.min(l-3,9-l,1))};return`#${Tt(i(0)*255)}${Tt(i(8)*255)}${Tt(i(4)*255)}`}function ei(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),r=Math.min(t,n,o),l=(i+r)/2,s=i-r;if(!s)return{h:0,s:0,l};let c=s/(1-Math.abs(2*l-1));return{h:((i===t?60*((n-o)/s%6):i===n?60*((o-t)/s+2):60*((t-n)/s+4))+360)%360,s:c,l}}function co(e){let[t,n,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function va(e,t){let[n,o]=[co(e),co(t)].sort((i,r)=>r-i);return(n+.05)/(o+.05)}var qt=e=>va(e,ba)>=va(e,lo)?ba:lo;function ti(e,t,n,o=ml){let i=so(e,t,n),r=qt(i)===ba?1:-1;for(let l=0;l<40&&va(i,qt(i))<o;l++)n+=r*.01,i=so(e,t,n);return i}function bl(e){let{h:t,s:n}=ei(e),o=ti(t,Math.min(n,Ie["surprise-on-max-saturation"]),Ie["surprise-on-lightness"]);return{fill:e,ink:qt(e),on:o,onInk:qt(o)}}var vl=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function wl(e,t=Math.random){let[n,o]=Ie["surprise-saturation"],[i,r]=Ie["surprise-lightness"],l=Ie["surprise-min-hue-gap"],s=gl(e)?ei(e).h:null,c=t()*360;return s!==null&&vl(c,s)<l&&(c=(s+l+t()*(360-2*l))%360),ti(c,n+t()*(o-n),i+t()*(r-i))}function xl(e){if(!e)return null;let t=bl(e);return{[dt("surprise-fill")]:t.fill,[dt("surprise-ink")]:t.ink,[dt("surprise-on")]:t.on,[dt("surprise-on-ink")]:t.onInk}}var yl=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,$l=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function uo(e){let[t,n,o]=[1,3,5].map(s=>yl(parseInt(e.slice(s,s+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),l=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*l,1.9779984951*i-2.428592205*r+.4505937099*l,.0259040371*i+.7827717662*r-.808675766*l]}function kl([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(l=>Tt($l(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}var El=Ie["velocity-range"],ai={min:zt.rhythm["velocity-min"],max:zt.rhythm["velocity-max"]},po=Object.fromEntries(Object.entries(hl).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Al(e,t=ai){let[n,o]=El,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,r=(i-n)/(o-n),l=t.ink??zt.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:l};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:l};let s=uo(t.min),c=uo(t.max);return{velocity:i,t:r,fill:kl(s.map((d,u)=>d+(c[u]-d)*r)),ink:l}}function ho(e,t=ai){return{[dt("velocity-fill")]:Al(e,t).fill}}var ni="data-nc-theme",mo="nc-ui-theme-change",Ml="(prefers-color-scheme: dark)",oi=e=>e?.documentElement??null,ii=e=>e?.defaultView?.matchMedia?.(Ml)??null,Sl=e=>e==="light"||e==="dark"?e:"system";function Cl(e=globalThis.document){return Sl(oi(e)?.getAttribute(ni))}function wa(e=globalThis.document){let t=Cl(e);return t!=="system"?t:ii(e)?.matches?"dark":"light"}function ri(e,t=globalThis.document){let n=oi(t);if(!n)return()=>{};let o=wa(t),i=()=>{let c=wa(t);c!==o&&(o=c,e(c))},r=t.defaultView?.MutationObserver,l=r?new r(i):null;l?.observe(n,{attributes:!0,attributeFilter:[ni]});let s=ii(t);return s?.addEventListener?.("change",i),t.addEventListener(mo,i),()=>{l?.disconnect(),s?.removeEventListener?.("change",i),t.removeEventListener(mo,i)}}var Tl={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Ll={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Fl={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Dl={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},_t={};for(let[e,t]of Object.entries(Ll))_t[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Dl))_t[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Fl))_t[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Tl.renames.map(e=>[e.old,e.new]));function li(e){let t=_t[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function te(e){return li(e).prop}function a(e){return`var(${te(e)})`}function Nl(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(te(t)));return Number.isFinite(n)?n:0}function ne(e,t){let n=li(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let l=(o.defaultView??window).getComputedStyle(i),s=n.kind==="family"?l.fontFamily:n.kind==="color"?l.color:l.paddingLeft;return i.remove(),s}function si(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function zl(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var ql="[data-modulated], [data-modulated] *";function aa(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function fo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Rl(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${te("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${te("divider")}: ${a(`module-div-stack-${o}`)};
      ${te("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${te("text-sub")}: ${a("module-sub-stack-1")};
      ${te("divider")}: ${a("module-div-stack-1")};
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
${ql} { transition: none; }
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
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
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
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${te("text-sub")}: inherit;
  ${te("divider")}: inherit;
  ${te("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${te("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: ${a("strip-divider")}; }
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
${fo("")}
}
@media (max-width: 1023px) {
${fo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${aa("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${aa("")}
}
@media (max-width: 1023px) {
${aa("html[data-nc-landscape] ")}
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
`}var na=null,Bl="nc-ui-fallback";function di(e=globalThis.document){if(!e?.documentElement||(e.documentElement,na&&na.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Bl} {
${Rl()}
}
`,e.head.append(t),na=t}var Pl=new URL("/aria/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Il=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Pl,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Il(document);function Ka(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),n.append(o);let l=!1,s=d=>{l=d===!0,n.setAttribute("aria-checked",l?"true":"false")};s(e.checked);let c=()=>{s(!l),e.onChange?.(l)};return n.addEventListener("click",c),{el:n,get checked(){return l},set:s,destroy(){n.removeEventListener("click",c),n.remove()}}}var ci=new WeakMap,go=.25;function Hl(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let r=0,l=e.step??.005,s=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=h=>{let v=d(h);v!==r&&(r=v,u(),s?.(v))},m=0,f=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let v=n.getBoundingClientRect();h.target!==i&&v.height>0&&p(1-(h.clientY-v.top)/v.height),m=h.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!f)return;let v=n.getBoundingClientRect().height||1,x=(m-h.clientY)/v*(h.shiftKey?go:1);m=h.clientY,p(r+x)});let b=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let v=h.shiftKey?l*go:l,x={ArrowUp:r+v,ArrowRight:r+v,ArrowDown:r-v,ArrowLeft:r-v,PageUp:r+l*10,PageDown:r-l*10,Home:0,End:1};h.key in x&&(h.preventDefault(),p(x[h.key]))});let y={el:n,get value(){return r},get dragging(){return f},set(h){f||(r=d(Number(h)||0),u())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(l=h.step),h.onChange&&(s=h.onChange),h.onReset&&(c=h.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),ci.set(n,y),y}function jl(e){return ci.get(e)}var ui=new WeakMap,Ol=.2,_l=1.5,Ul=.5;function Vl(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function bo(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Vl(o.getComputedStyle(e).getPropertyValue(te(t)),n)}function Yl(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let l=[];for(let y=0;y<n;y++){let h=t.createElement("span");h.className="nc-meter-bar";let v=t.createElement("span");v.className="nc-meter-peak";let x=t.createElement("span");x.className="nc-meter-rms";let g=t.createElement("span");g.className="nc-meter-hold",h.append(v,x,g),r.append(h),l.push({peak:v,rms:x,hold:g,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let s=e.label,c=e.onClear,d=!1,u=-1,p=-1,m=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${s} clipped: clear`:`${s} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},f=(y,h,v,x)=>{let g=Math.round(x*1e3)/1e3;v[h]!==g&&(v[h]=g,y.style.transform=h==="hold"?`translateY(${Math.round((1-g)*1e3)/10}%)`:`scaleY(${g})`)};i.addEventListener("click",()=>{b.clear(),c?.()});let b={el:o,get clipped(){return d},update(y,h){u<0&&(u=bo(o,"motion-meter-fall",Ol)),p<0&&(p=bo(o,"motion-meter-hold",_l));let v=Math.max(0,Math.min(.25,Number(h)||0)),x=u>0?Math.exp(-v/u):0;l.forEach((g,P)=>{let M=y[P]??y[0]??{peak:0,rms:0},L=Math.min(1,Math.max(0,Number(M.peak)||0)),$=Math.min(L,Math.max(0,Number(M.rms)||0));M.over&&b.clip(),g.level.peak=L>=g.level.peak?L:L+(g.level.peak-L)*x,g.level.rms=$>=g.level.rms?$:$+(g.level.rms-$)*x,g.holdAge+=v,L>=g.holdAt?(g.holdAt=L,g.holdAge=0):g.holdAge>p&&(g.holdAt=Math.max(L,g.holdAt-Ul*v)),f(g.peak,"peak",g.shown,g.level.peak),f(g.rms,"rms",g.shown,g.level.rms),f(g.hold,"hold",g.shown,g.holdAt),g.hold.dataset.off=g.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,m())},clear(){d=!1,m()},reset(){for(let y of l)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,f(y.peak,"peak",y.shown,0),f(y.rms,"rms",y.shown,0),f(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){s=y,m()},configure(y){y.onClear&&(c=y.onClear)}};return m(),b.reset(),ui.set(o,b),b}function Gl(e){return e?ui.get(e):void 0}var Wl=3,Xl=new Set(["freq","q","rate","time","log"]);function Qa(e,t,n){return!e||!Xl.has(e)||!(n>t)?"linear":t>0?"log":"power"}function yt(e,t,n){return Qa(e,t,n)!=="linear"}function Rt(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),l=Qa(e,t,n);if(l==="log")return Math.log(r/t)/Math.log(n/t);let s=(r-t)/(n-t);return l==="power"?Math.cbrt(s):s}function pi(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=Qa(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**Wl:i)}function hi(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function gt(e,t,n,o){return Math.round(Rt(e,t,n,o)*1e3)}function Bt(e,t,n,o,i){return hi(pi(e,t,n,Number(o)/1e3),t,n,i)}function Kl(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Za(e,t,n,o,i,r=!1,l){let s=gt(e,t,n,o),c=Kl(s,i,r);if(c===null)return null;let d=Bt(e,t,n,c,l),u=Math.sign(c-s),p=hi(Number(o),t,n,l);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=Bt(e,t,n,c,l);return d}function vo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ql(e,t,n,o=n/6){let i=e.some(u=>u===null),r=Math.max(0,n-(i?o:0)),l=e.reduce((u,p,m)=>p===null?u:u+vo(t[m]),0),s=l>0?r/l:0,c=e.map(u=>u===null?0:Math.min(r,vo(u)*s));if(i){let u=c.reduce((m,f)=>m+f,0),p=e.indexOf(null);c[p]=Math.max(o,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return i&&(d[d.length-1]=n),d}function Zl(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function Ce(e){return Math.max(0,Math.min(1,e))}function mi(e,t){let{ctx:n,w:o,h:i}=Zl(e);if(!n)return;n.clearRect(0,0,o,i);let r=zl(e);if(t.paint==="swatch"){let c=ne(e,"accent"),d=ne(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){ts(n,o,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=ne(e,si(c)),u=ne(e,"divider"),p=Ce(t.cutoff??.5),m=.08+(1-Ce(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let f=0;f<=o;f++){let b=f/Math.max(1,o),y=0;c==="lp"?y=b<p?1:Math.max(0,1-(b-p)/m):c==="hp"?y=b>p?1:Math.max(0,1-(p-b)/m):y=Math.max(0,1-Math.abs(b-p)/m);let h=i*.78-y*i*.62;f===0?n.moveTo(f,h):n.lineTo(f,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=ne(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ne(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,p,m]=Ql([c,d],t.max??[1,4],o),f=2,b=i-1;n.beginPath(),n.moveTo(u,b),n.lineTo(p,f);let y=Math.max(1,Math.ceil(m-p));for(let h=1;h<=y;h++){let v=h/y;n.lineTo(p+(m-p)*v,b-(b-f)*Math.exp(-4.6*v)*(1-v*.01))}n.lineTo(m,b),n.lineTo(o,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],p=ne(e,"accent"),m=ne(e,"text-sub"),f=i/2;n.fillStyle=ne(e,"accent-soft"),n.fillRect(Ce(d)*o,0,(Ce(u)-Ce(d))*o,i),n.strokeStyle=ne(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(o,f),n.stroke();let b=Math.floor(c.length/2);for(let y=0;y<b;y++){let h=(y+.5)/b*o,v=Math.max(-1,Math.min(1,c[y*2]??0)),x=Math.max(-1,Math.min(1,c[y*2+1]??0)),g=(y+.5)/b;n.strokeStyle=g>=d&&g<=u?p:m,n.beginPath(),n.moveTo(h,f-x*(f-1)),n.lineTo(h,f-v*(f-1)+.5),n.stroke()}n.strokeStyle=p;for(let y of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(Ce(y)*(o-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ne(e,"text"),n.fillRect(Math.round(Ce(t.position)*(o-1)),0,1,i)),b||(n.fillStyle=m,n.font=r,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=Ce(t.level??0);n.fillStyle=ne(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=ne(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let l=Math.max(1,t.steps??16),s=((t.step??0)%l+l)%l;n.fillStyle=ne(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=ne(e,"rhythm.playhead"),n.fillRect(s/l*o,i*.3,Math.max(1,o/l),i*.4),e.dataset.ncAccent=ne(e,"accent")}var pt=20,xa=2e4,oa=24,wo=-60;function Jl(e,t,n,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,l=Math.cos(r),s=Math.sin(r)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+l)/2,-(1+l),(1+l)/2]:e==="bp"?[c,d,u]=[s,0,-s]:[c,d,u]=[(1-l)/2,1-l,(1-l)/2];let p=1+s,m=-2*l,f=1-s,b=2*Math.PI*o/i,y=(g,P,M)=>g+P*Math.cos(b)+M*Math.cos(2*b),h=(g,P)=>-(g*Math.sin(b)+P*Math.sin(2*b)),v=Math.hypot(y(c,d,u),h(d,u)),x=Math.hypot(y(p,m,f),h(m,f));return x>0?v/x:0}function es(e,t){return Math.log(Math.max(pt,Math.min(xa,e))/pt)/Math.log(xa/pt)*t}function xo(e,t,n){let o=Math.max(wo,Math.min(oa,e));return t+(oa-o)/(oa-wo)*(n-t)}function ts(e,t,n,o,i,r){let l=o.mode??"lp",s=ne(i,si(l)),c=ne(i,"divider"),d=ne(i,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,m=Math.max(p+4,n-u-3),f=o.q??Math.SQRT1_2,b=Math.round(xo(0,p,m))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let h=pt*(xa/pt)**(y/Math.max(1,t)),v=o.open?1:Jl(l,o.hz,f,h,o.sampleRate),x=xo(20*Math.log10(Math.max(1e-5,v)),p,m);y===0?e.moveTo(y,x):e.lineTo(y,x)}if(e.strokeStyle=s,e.stroke(),!o.open){let y=Math.round(es(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,p),e.lineTo(y,m),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=s,i.dataset.ncFilterHz=String(Math.round(o.hz))}function ye(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function as(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Oe=20,$t=2e4,Ja=Math.log($t/Oe),ya=32,ns=250,os=-100,is=1200,rs=4.5,yo=-6,Be=-96,ls=48,$o=[100,1e3,1e4],ss=[6,12];function Ke(e,t){return Math.log(Math.max(Oe,Math.min($t,e))/Oe)/Ja*t}function Lt(e,t){return Oe*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ja)}function Fe(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function $a(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var fi=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function ds(e,t,n,o){let i=n?3:1,r=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),l=c=>({hz:Math.max(e.minHz??Oe,Math.min(e.maxHz??$t,e.hz*2**(c*i/6)))}),s=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?l(1):r(1);case"ArrowLeft":return e.moveHz?l(-1):r(-1);case"PageUp":return e.moveQ?s(1):null;case"PageDown":return e.moveQ?s(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function en(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function cs(e,t,n,o,i,r,l,s,c){let d=c?.25:1,u={},p=Math.max(1,r/2-s);if(u.db=Math.max(-l,Math.min(l,t.db-o*d/p*l/en(e))),e.moveHz){let m=t.hz*Math.exp(n*d/Math.max(1,i)*Ja);u.hz=Math.max(e.minHz??Oe,Math.min(e.maxHz??$t,m))}return u}function us(e,t,n,o,i){let r=Math.max(0,n.left)+1,l=Math.min(n.right,i)-1,s=Math.min(t.width*3+o*2,l-r),c=Math.max(r,Math.min(e.left,l-s));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(s)}}var re=new WeakMap;function ps(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-eq-tip",l.setAttribute("aria-hidden","true"),l.hidden=!0,o.append(i,r);for(let c of e.bands)o.append(hs(n,c,t));o.append(l),o.addEventListener("click",c=>{if(!yi(n)||c.button>0)return;let d=xi(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let s=document.createElement("i");return s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s),re.set(n,{control:e,cache:null,spec:null,active:null}),bi(n,e),n}function gi(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function hs(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,l=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=r();u&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),l={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},o.dataset.drag="true",Te(e,t.id))}),o.addEventListener("pointermove",d=>{if(!l||d.pointerId!==l.id)return;let u=i(),p=r(),m=re.get(e);if(!u||!p||!m?.box)return;let{w:f,h:b,pad:y}=m.box;u.onBand(p.id,cs(p,l.start,d.clientX-l.x,d.clientY-l.y,f,b,u.range??18,y,d.shiftKey))});let s=d=>{!l||d.pointerId!==l.id||(l=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&Te(e,null))};o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let u=i(),p=r();if(!u||!p)return;let m=ds(p,d.key,d.shiftKey,u.range??18);m&&(d.preventDefault(),m==="reset"?u.onReset?.(p.id):u.onBand(p.id,m),Te(e,p.id))});let c=null;return o.addEventListener("wheel",d=>{let u=i(),p=r();if(!u||!p?.moveQ)return;d.preventDefault();let m=d.timeStamp;(!c||m-c.t>400)&&(c={q:p.q,t:m});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-f/240))),c.t=m,u.onBand(p.id,{q:c.q}),Te(e,p.id)},{passive:!1}),o.addEventListener("pointerenter",()=>Te(e,t.id)),o.addEventListener("focus",()=>Te(e,t.id)),o.addEventListener("pointerleave",()=>{!l&&e.ownerDocument.activeElement!==o&&Te(e,null)}),o.addEventListener("blur",()=>{l||Te(e,null)}),o}function Te(e,t){let n=re.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?et(e):tn(e)}function tn(e){let t=re.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(o&&b.dataset.band===o.id?b.dataset.active="true":delete b.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,fi(o.db)];o.kind==="peak"?i.push($a(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${$a(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(ms(t.control,o)),n.hidden=!1;let{w:r,h:l,pad:s}=t.box,c=Ke(o.hz,r),d=Fe(o.db*en(o),l,t.control.range??18,s),u=n.offsetWidth,p=n.offsetHeight,m=Math.max(0,Math.min(r-u,c-u/2)),f=d-p-s*1.5>=0?d-p-s*1.5:Math.min(l-p,d+s*1.5);n.style.left=`${Math.round(m)}px`,n.style.top=`${Math.round(f)}px`}function ms(e,t){return e.bands.indexOf(t)%3+1}function bi(e,t){let n=re.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",an(e);let o=t.range??18;t.bands.forEach((i,r)=>{let l=gi(e,i.id);l instanceof HTMLElement&&(l.dataset.tone=String(r%3+1),l.dataset.kind=i.kind,l.setAttribute("aria-label",`${i.label} band`),l.setAttribute("aria-valuemin",String(-o)),l.setAttribute("aria-valuemax",String(o)),l.setAttribute("aria-valuenow",String(i.db)),l.setAttribute("aria-valuetext",i.valueText??`${fi(i.db)}, ${$a(i.hz)}`),l.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?l.setAttribute("data-nc-help",i.help):l.removeAttribute("data-nc-help"))}),et(e),xs(e)}function vi(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function wi(e){return{curve:ye(e,"eq-curve"),fill:ye(e,"eq-fill"),quiet:ye(e,"text-sub"),grid:ye(e,"eq-grid"),zero:ye(e,"divider"),label:ye(e,"text-sub"),spectrum:ye(e,"eq-spectrum"),bands:[ye(e,"eq-band-1"),ye(e,"eq-band-2"),ye(e,"eq-band-3")]}}function fs(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function et(e){re.has(e)&&an(e);let t=re.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:l}=vi(n);if(!i)return;let s=Math.max(8,Math.round(l*.06)),c=o.range??18;t.box={w:r,h:l,pad:s},t.colours=wi(e);let d=t.colours,u=fs(o,r);if(!t.cache||t.cache.key!==u){let P=Math.max(64,Math.ceil(r)+1),M=new Float64Array(P);for(let $=0;$<P;$++)M[$]=Lt($/(P-1)*r,r);let L=null;try{L=typeof o.response=="function"?o.response(M):null}catch{L=null}t.cache={key:u,freqs:M,total:L?.total??new Float64Array(P),bands:L?.bands??[]}}i.clearRect(0,0,r,l);let p=as(e),m=o.on!==!1;gs(i,r,l,c,s,d,p);let{freqs:f,total:b,bands:y}=t.cache,h=Array.from(f,P=>Ke(P,r)),v=Fe(0,l,c,s);y.forEach((P,M)=>{if(!P||!P.some(A=>Math.abs(A)>.05))return;let L=m?d.bands[M%3]:d.quiet,$=Array.from(P,A=>Fe(A,l,c,s));i.save(),t.active&&o.bands[M]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=L,ko(i,h,$,v)),i.globalAlpha=m?.75:.4,i.strokeStyle=L,i.lineWidth=.75,ia(i,h,$),i.restore()});let x=Array.from(b,P=>Fe(P,l,c,s)),g=m?d.curve:d.quiet;i.save(),i.fillStyle=m?d.fill:d.quiet,i.globalAlpha=m?.2:.08,ko(i,h,x,v),i.restore(),i.save(),i.strokeStyle=m?d.fill:g,i.lineJoin="round",i.lineCap="round",m&&(i.globalAlpha=.16,i.lineWidth=4,ia(i,h,x)),i.globalAlpha=1,i.strokeStyle=g,i.lineWidth=1.25,ia(i,h,x),i.restore(),bs(e),tn(e)}function gs(e,t,n,o,i,r,l){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Oe||u>$t)continue;let p=Math.round(Ke(u,t))+.5;e.globalAlpha=$o.includes(u)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of ss)if(!(c>o))for(let d of[1,-1]){let u=Math.round(Fe(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let s=Math.round(Fe(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke(),e.font=l,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of $o){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,p=Ke(c,t)+3;e.fillText(d,p+u+2>t?Ke(c,t)-u-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=Fe(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Pt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function ia(e,t,n){e.beginPath(),Pt(e,t,n),e.stroke()}function ko(e,t,n,o){e.beginPath(),Pt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function xi(e){return e.closest("[data-nc-maxable]")}function yi(e){let t=xi(e);return!!t&&!t.hasAttribute("data-nc-max")}function an(e){let t=yi(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=re.get(e);n?.active&&(n.active=null,tn(e))}return t}function bs(e){an(e);let t=re.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,r=t.control.range??18;for(let l of t.control.bands){let s=gi(e,l.id);s instanceof HTMLElement&&(s.style.left=`${Ke(l.hz,n).toFixed(1)}px`,s.style.top=`${Fe(l.db*en(l),o,r,i).toFixed(1)}px`)}}function vs(e,t,n,o){let i=o/2/n,r=new Float32Array(e),l=new Float32Array(e),s=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,p=Lt(d,t),m=Lt(u,t),f=Lt(c/(e-1)*t,t);r[c]=Math.min(n-1,p/i),l[c]=Math.min(n-1,m/i),s[c]=rs*Math.log2(f/1e3)}return{lo:r,hi:l,tilt:s}}function ws(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let l=t-o,s=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??s;return s+(c-s)*l}let r=-1/0;for(let l=o;l<=i&&l<e.length;l++)e[l]>r&&(r=e[l]);return r}function xs(e){let t=re.get(e);if(t){if(!t.control.spectrum){ki(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=re.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),ka(e))}),t.spec.io.observe(e)):t.spec.visible=!0}ka(e)}}function ka(e){let t=re.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){$i(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ea(e),n.onVis||(n.onVis=()=>ka(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Aa(e,!1)}function Ea(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Aa(e,t){let n=re.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,ra(e,Ea(e))),ns):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,ra(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,ra(e,Ea(e))),ya))}function $i(e){let t=re.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function ki(e){let t=re.get(e)?.spec;if(!t)return;$i(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=re.get(e);n&&(n.spec=null)}function ra(e,t){let n=re.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){ki(e);return}if(!o.analyser)return;if(t-o.last<ya-4&&!o.idle){Aa(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):ya/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:l,w:s,h:c}=vi(r);if(!l)return;let d=Math.max(16,Math.round(s/2)),u=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==s||o.map.sr!==u)&&(o.map={cols:d,w:s,sr:u,...vs(d,s,o.buf.length,u)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let p=-1/0,m=ls*i,{lo:f,hi:b,tilt:y}=o.map;for(let v=0;v<d;v++){let x=ws(o.buf,f[v],b[v]);x>p&&(p=x);let g=x+y[v],P=o.disp[v]-m;o.disp[v]=g>P?g:P}p>os&&(o.loud=t);let h=t-o.loud>is;l.clearRect(0,0,s,c),(!h||o.disp.some(v=>v>Be))&&ys(l,s,c,o.disp,n.colours??wi(e)),o.idle=h&&!o.disp.some(v=>v>Be),Aa(e,o.idle)}function ys(e,t,n,o,i){let r=o.length,l=new Array(r),s=new Array(r),c=d=>{let u=o[Math.max(0,Math.min(r-1,d))];return Number.isFinite(u)?u:Be};for(let d=0;d<r;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(Be,Math.min(yo,Number.isFinite(u)?u:Be))-Be)/(yo-Be);l[d]=d/(r-1)*t,s[d]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Pt(e,l,s),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Pt(e,l,s),e.stroke(),e.restore()}var fe=new WeakMap,$s=450,ks=6,Es=33,la=24,As="http://www.w3.org/2000/svg";function Ms(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Ss(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Cs(e,t,n,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let l=t<o?1:-1;for(let s=t;s!==o+l;s+=l){let c=(s-t)/(o-t);r[s]=Math.round((n+(i-n)*c)*100)/100}return r}function Ts(e,t){let n=e.steps[t],o=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function Pe(e,t){let n=document.createElementNS(As,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function Ei(e){let t=Pe("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Pe("path",{d:e})),t}function Ls(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let l=document.createElement("div");l.className="nc-lsteps-pick",l.setAttribute("role","menu"),l.hidden=!0,n.append(o,i,r,l);let s=document.createElement("i");s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return fe.set(n,c),Ds(n,o),Ns(n,l),Ai(n,e),n}function be(e){let t=fe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Fs(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function sa(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=Fs(e);return{i:Ss(t.clientX,o),level:Ms(t.clientY-n.top,n.height)}}function Ds(e,t){let n=fe.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let l=be(e);if(!l||r.button>0||!l.steps.length)return;r.preventDefault(),It(e),t.setPointerCapture?.(r.pointerId);let s=sa(t,r),c=l.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:s.i,level:s.level,moved:!1,long:!1},n.focus=s.i,Eo(e,s.i,s.level,s.i,s.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,be(e)?.onLevels(d.start.slice(),!0),da(e,d.i))},$s)}),t.addEventListener("pointermove",r=>{let l=n.drag;if(!l||l.id!==r.pointerId||l.long||!l.moved&&Math.hypot(r.clientX-l.x,r.clientY-l.y)<ks)return;l.moved=!0,o();let s=sa(t,r);Eo(e,l.i,l.level,s.i,s.level,!1),l.i=s.i,l.level=s.level});let i=r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(r.pointerId),l.long||be(e)?.onLevels(l.levels.slice(),!0),Ma(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,l.long||be(e)?.onLevels(l.start.slice(),!0),Ma(e,-1))}),t.addEventListener("contextmenu",r=>{be(e)?.onShape&&(r.preventDefault(),da(e,sa(t,r).i))}),t.addEventListener("keydown",r=>{let l=be(e);if(!l||!l.steps.length)return;let s=l.steps.length,c=Math.min(n.focus,s-1),d=l.steps[c].level,u=p=>{let m=l.steps.map(f=>f.level);m[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,l.onLevels(m,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+s)%s;break;case"ArrowRight":n.focus=(c+1)%s;break;case"ArrowUp":u(d+(r.shiftKey?.01:.05));break;case"ArrowDown":u(d-(r.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!l.onShape)return;da(e,c);break;default:return}r.preventDefault(),Sa(e)}),t.addEventListener("focus",()=>Sa(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function Eo(e,t,n,o,i,r){let l=fe.get(e).drag;l&&(l.levels=Cs(l.levels,t,n,o,i),Ma(e,o,l.levels[o]),be(e)?.onLevels(l.levels.slice(),r))}function Ma(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function Sa(e){let t=fe.get(e),n=e.querySelector(".nc-lsteps-plot"),o=be(e);if(!n||!o)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",Ts(o,i))}function Ns(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),It(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),fe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&It(e)}}function da(e,t){let n=be(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let r=fe.get(e);r.focus=t,o.textContent="";let l=document.createElement("span");l.className="nc-lsteps-pick-head",l.textContent=`Step ${t+1}`,o.append(l);for(let f of n.shapes??[]){let b=document.createElement("button");b.type="button",b.setAttribute("role","menuitemradio"),b.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&b.append(Ei(f.icon)),b.append(document.createTextNode(f.label)),b.addEventListener("click",()=>{be(e)?.onShape?.(t,f.value),It(e,!0)}),o.append(b)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let s=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=s?.getBoundingClientRect(),u=o.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,m=Math.max(0,Math.min(c.width-u,p-u/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(m)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function It(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",fe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function zs(e,t){let n=fe.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let l=document.createElement("div");l.className="nc-lsteps-step",l.dataset.i=String(r),r%4===0&&r>0&&(l.dataset.beat="true");let s=Pe("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});s.append(Pe("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Pe("path",{class:"nc-lsteps-env",d:""}),Pe("path",{class:"nc-lsteps-top",d:""}),Pe("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),l.append(s),o.append(l);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function Ai(e,t){let n=fe.get(e);if(!n)return;n.control=t;let o=t.steps.length;zs(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),l=i.querySelectorAll(".nc-lsteps-step"),s=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,b)=>{let y=l[b];if(!y)return;let h=String((b%2?1-r:r)*2);y.style.setProperty("--nc-lsteps-grow",h),s[b]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&b>=t.played?y.dataset.out="true":y.removeAttribute("data-out"),y.dataset.zero=f.level<=0?"true":"false";let v=Math.max(0,Math.min(1,f.level)),x=y.querySelector(".nc-lsteps-level");x.setAttribute("y",String(100-v*100)),x.setAttribute("height",String(v*100));let g=t.curve?t.curve(b,la):null,P="M0 100",M="";for(let L=0;L<=la;L++){let $=g?Math.max(0,Math.min(1,g[L]??v)):v,A=L/la*100,E=100-$*100;P+=` L${A.toFixed(2)} ${E.toFixed(2)}`,M+=`${L?" L":"M"}${A.toFixed(2)} ${E.toFixed(2)}`}y.querySelector(".nc-lsteps-env").setAttribute("d",`${P} L100 100 Z`),y.querySelector(".nc-lsteps-top").setAttribute("d",M)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let b=document.createElement("button");b.type="button",b.className="nc-lsteps-shape",b.setAttribute("role","tab"),b.dataset.shape=String(f.value),f.icon&&b.append(Ei(f.icon)),b.append(document.createTextNode(f.label)),b.addEventListener("click",()=>be(e)?.onShapeAll?.(f.value)),c.append(b)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??o,p=t.steps[0]?.shape,m=t.steps.slice(0,u).every(f=>f.shape===p);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let b=m&&f.dataset.shape===String(p);f.setAttribute("aria-selected",b?"true":"false"),f.tabIndex=b||!m&&f===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),Sa(e),n.last=-2,qs(e)}function qs(e){let t=fe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&ca(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){ca(e,null);return}r-o>=Es&&(o=r,ca(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function ca(e,t){let n=fe.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var Rs=.8912509381337456,Ca=32,Bs=250,Ps=1200,Is=.2,Mi=1.5;function Hs(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function js(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var Ht=new WeakMap,Ao=new WeakMap;function Mo(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function Os(e){let t=Ao.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let l=Ht.get(r.target);l&&(l.seen.set(r.target,r.isIntersecting),ht(l))}Xe(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)ht(i);Xe(t)}),Ao.set(e,t),t}var Si=e=>e.els.some(t=>t.isConnected);function _s(e){if(!e.loop.io)return Si(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ht(e){let t=!e.dead&&!!e.source&&_s(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=nn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Fa(e))}function nn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Xe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Ci(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=nn(e)),!e.raf&&!e.timer&&Ta(e,!1)}function Ta(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>So(e,nn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Bs):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,So(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),Ca)}function Ci(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function So(e,t){if(t-e.last<Ca-4&&!e.idle&&e.last){Ta(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Ca/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!Si(r)){(r.placed||e.frames-r.born>90)&&Ti(r);continue}r.placed=!0,r.open&&(i=!0,Us(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Ci(e);return}e.idle=t-e.loud>Ps&&!o,Ta(e,e.idle)}function Us(e,t,n){if(e.fall<0){let m=e.els[0];e.fall=Mo(m,"motion-meter-fall",Is),e.hold=Mo(m,"motion-meter-hold",Mi)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,l=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",s=l&&Number(o.out)||0,c=l?"2":"1";if(e.rows!==c){e.rows=c;for(let m of e.els)m.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[r,s],p=!1;for(let m=0;m<2;m++){let f=Hs(u[m]);f>0&&(p=!0),e.disp[m]=f>=e.disp[m]?f:f+(e.disp[m]-f)*d,e.disp[m]<.001&&(e.disp[m]=0),u[m]>=Rs&&(e.clipAt[m]=n);let b=e.clipAt[m]>0&&n-e.clipAt[m]<e.hold*1e3;La(e,m,e.disp[m],b)}return p}function La(e,t,n,o){let i=Math.round(n*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let l of e.els){let s=l.children[t]?.firstElementChild;s&&(s.style.transform=`scaleY(${i})`,s.dataset.clip=r)}}}function Fa(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,La(e,0,0,!1),La(e,1,0,!1)}function Ti(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ht.get(t)===e&&Ht.delete(t)}function Vs(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=Os(o),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Mi,rows:""};for(let l of n)Ht.set(l,r),i.io?.observe(l);if(i.recs.add(r),Fa(r),!i.io){let l=o.defaultView,s=()=>{ht(r),Xe(i)};typeof l?.requestAnimationFrame=="function"?l.requestAnimationFrame(s):setTimeout(s,0)}return{set(l){let s=l??null;if(!r.dead){if(s===r.source){ht(r),Xe(i);return}r.open&&(r.open=!1,r.source?.close?.(),Fa(r)),r.source=s,ht(r),Xe(i)}},destroy(){r.dead||Ti(r),Xe(i)}}}var Li={slop:8,longPressMs:500,pitchPx:16},Ys=class{constructor(e,t,n=Li){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(t,n);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Gs(e,t,n,o=Li){let i=!1,r=0,l=(d,u)=>{let p=e.ownerDocument.elementFromPoint?.(d,u),m=[...e.querySelectorAll(t)],f=p?m.findIndex(h=>h===p||h.contains(p)):-1;if(f>=0)return f;let b=-1,y=Number.POSITIVE_INFINITY;return m.forEach((h,v)=>{if(h.hidden)return;let x=h.getBoundingClientRect();if(u<x.top||u>x.bottom)return;let g=Math.abs(d-(x.left+x.width/2));g<y&&g<=x.width&&(b=v,y=g)}),b},s=new Ys(l,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,s.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>s.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{s.state!=="idle"&&(s.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),s.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),s.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),s.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),s}var Fi="netcomposer.groups.v1";function on(){try{return globalThis.localStorage??null}catch{return null}}function Di(e=on(),t=Fi){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function Ws(e,t,n,o=Fi){let i=Di(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function Xs(e,t=on()){return Di(t).get(e.id)??e.open===!0}function Ks(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let l=document.createElement("span");l.className="nc-group-summary";let s=document.createElement("span");s.className="nc-group-mark",s.setAttribute("aria-hidden","true"),i.append(r,l,s);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";Ws(on(),e.id,d),Da(o,d);let u=t(o);u?.type==="group"&&u.onToggle?.(d)}),o.append(i,c),Ni(o,e),Da(o,Xs(e)),zi(o,e),o}function Da(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Ni(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function zi(e,t){Ni(e,t)&&Da(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var At="application/x-nc-pad",Co="http://www.w3.org/2000/svg";function Qs(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let r=0;r<n;r++){let l=Math.floor(r*t/n),s=Math.max(l+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let p=l;p<s;p++)c=Math.min(c,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let u=n===1?50:r/(n-1)*100;o.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Zs(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(Js(n,r,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&Ft(n)}),Ri(n,e),n}function Js(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let l=document.createElement("span");l.className="nc-padgrid-pad-hint";let s=document.createElement("span");s.className="nc-padgrid-pad-badge";let c=document.createElementNS(Co,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Co,"path");return c.append(d),o.append(i,r,l,s,c),td(e,o,t,n),r.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&o.dataset.empty!=="true"&&qi(e,o,t,n)}),o.addEventListener("dragstart",u=>{if(o.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(At,String(t)),u.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(At)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(At)&&!u.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",u=>{delete o.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let m=u.dataTransfer?.getData(At);if(m!==void 0&&m!==""){u.preventDefault(),u.stopPropagation();let b=Number(m);b!==t&&p.onMove?.(b,t,u.altKey);return}let f=u.dataTransfer?.files?.[0];f&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(t,f))}),o}function ed(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function td(e,t,n,o){let i=0,r=!1,l=0,s=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,l=d.clientX,s=d.clientY,c();let u=o(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=To(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-l,d.clientY-s)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=To(e,t,n,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}ed(e,n,o)})}function To(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;Ft(e);let l=document.createElement("div");l.className="nc-slot-scrim",l.setAttribute("aria-hidden","true"),l.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Ft(e)}),l.addEventListener("click",u=>u.stopPropagation());let s=document.createElement("div");s.className="nc-slot-menu nc-padgrid-pad-menu",s.setAttribute("role","menu"),s.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Ft(e);let m=o(e);m?.type==="padGrid"&&(u.id==="rename"&&m.onRename?qi(e,t,n,o):m.onMenu?.(n,u.id))}),s.append(p)}e.append(l,s);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return s.style.left=`${d.left-c.left}px`,s.style.top=`${d.bottom-c.top}px`,s.querySelector("button")?.focus(),!0}function qi(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();r.style.left=`${s.left-l.left}px`,r.style.top=`${s.top-l.top}px`,r.style.width=`${s.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=r.value.trim();r.remove(),t.focus();let m=o(e);u&&p&&m?.type==="padGrid"&&m.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function Ft(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ri(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let l=r.querySelector(".nc-padgrid-pad-name"),s=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",l&&(l.textContent=t.emptyLabel??"Load"),s&&(s.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,l&&(l.textContent=o.label),s&&(s.textContent=o.hint??""),c?.setAttribute("d",Qs(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let u=t.selected===i;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${u?", selected":""}`)})}function se(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Ut(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function Lo(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function bt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var ad=450,Fo=8;function ke(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function nd(e){let t=Nl(e,"target-min");return t>0?t:44}function od(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=nd(e),o=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let l=t[r],s=i[r];if(!(l instanceof HTMLElement)||!s||s.width===0||s.height===0)continue;if(s.width>=n&&s.height>=n){l.style.display="none";continue}let c=s.left+s.width/2,d=s.top+s.height/2,u=c-o,p=c+o,m=d-o,f=d+o;for(let b=0;b<t.length;b++){if(r===b)continue;let y=i[b];if(!y||y.width===0)continue;let h=y.left+y.width/2,v=y.top+y.height/2;Math.abs(v-d)<o*2&&(h>c?p=Math.min(p,(c+h)/2):h<c&&(u=Math.max(u,(c+h)/2))),Math.abs(h-c)<o*2&&(v>d?f=Math.min(f,(d+v)/2):v<d&&(m=Math.max(m,(d+v)/2)))}u=Math.min(u,s.left),p=Math.max(p,s.right),m=Math.min(m,s.top),f=Math.max(f,s.bottom),l.style.left=`${u-s.left}px`,l.style.top=`${m-s.top}px`,l.style.width=`${Math.max(0,p-u)}px`,l.style.height=`${Math.max(0,f-m)}px`,l.style.transform="none"}}function Bi(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Do(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function He(e,t){switch(e.type){case"slider":return id(e,t);case"select":return ld(e,t);case"toggle":return sd(e,t);case"button":return dd(e,t);case"readout":return cd(e);case"label":return md(e);case"note":return No(e);case"knob":return bd(e,t);case"choice":return vd(e,t);case"slotRow":return wd(e,t);case"stepGrid":return kd(e,t);case"canvas":return Sd(e);case"fx":return Rd(e,t);case"eqGraph":return ps(e,t);case"levelSteps":return Ls(e,t);case"group":return Ks(e,t,He);case"strip":return Cd(e,t);case"stripAdd":return Dd(e,t);case"padGrid":return Zs(e,t);case"moves":return pd(e,t);default:return No({id:"unknown",text:""})}}function ve(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Hi(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Pi(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??bt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Lo(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Lo(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&De(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&fd(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??bt(t.value))}else if(t.type==="choice")ji(e,t);else if(t.type==="slotRow")_i(e,t);else if(t.type==="stepGrid")za(e,t);else if(t.type==="padGrid")Ri(e,t);else if(t.type==="moves")Ii(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&mi(n,t)}else if(t.type==="eqGraph")bi(e,t);else if(t.type==="levelSteps")Ai(e,t);else if(t.type==="strip"){Gi(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Vi(e,t);else if(t.type==="group"){zi(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,n)}}else if(t.type==="fx"){ar(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,n)}}}}function id(e,t){let n=Ut(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=yt(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(Pi(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=s=>i?Bt(s.taper??e.taper,s.min,s.max,o.value,s.step):Number(o.value);o.addEventListener("input",()=>{let s=t(o);s?.type==="slider"&&s.onChange(r(s))}),o.addEventListener("change",()=>{let s=t(o);s?.type==="slider"&&s.onCommit?.(r(s))}),i&&o.addEventListener("keydown",s=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,u=Za(d,c.min,c.max,c.value,s.key,s.shiftKey,c.step);u!==null&&(s.preventDefault(),o.value=String(gt(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(o,l),e.onTap&&n.insertBefore(rd(e,o,t),l),n.append(se()),ve(n,e),n}function Pi(e){return yt(e.taper,e.min,e.max)?gt(e.taper,e.min,e.max,e.value):e.value}function rd(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(ke());let i=r=>{let l=n(t);l?.type==="slider"&&l.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function ld(e,t){let n=Ut(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let l=document.createElement("option");l.value=r.value,l.textContent=r.label,r.disabled&&(l.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(l)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),n.append(o,se()),n}function sd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(se()),ve(n,e),n}function dd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(se()),ve(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Bi(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Ui(r);let l=t(n);l?.type==="button"&&l.onSparkle?.()}),o.append(n,i),o}function cd(e){let t=Ut(e.id,e.label);return t.append(se()),ve(t,e),t}var ud=450;function pd(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let l=document.createElement("div");l.className="nc-moves-btns";for(let s of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=s.id,c.title=s.title??s.text,c.setAttribute("aria-label",`${o.label} ${s.text}`),c.append(hd(s.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(s.id)}),l.append(c)}i.append(r,l),n.append(i)}return Ii(n,e),n}function Ii(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${Qe(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function hd(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function md(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(se()),t}function No(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(se()),t}function zo(e){if(typeof e.valueText=="string")return e.valueText;let t=bt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Hi(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function fd(e,t){let n=Rt(t.taper,t.min,t.max,t.value);Hi(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Rt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",zo(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${zo(t)}`}function gd(e,t){if(yt(e.taper,e.min,e.max))return Za(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function bd(e,t){let n=Ut(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,l=0;o.addEventListener("pointerdown",d=>{r=d.clientY;let u=t(o);l=u&&"value"in u?Number(u.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let s=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("lostpointercapture",s),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let u=t(o);if(u?.type!=="knob")return;if(yt(u.taper,u.min,u.max)){let f=Rt(u.taper,u.min,u.max,l)-(d.clientY-r)/120;u.onChange(pi(u.taper,u.min,u.max,f));return}let p=u.max-u.min||1,m=Math.min(u.max,Math.max(u.min,l-(d.clientY-r)*p/120));u.onChange(m)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let u=t(o);if(u?.type!=="knob")return;let p=gd(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(se()),ve(n,e),n}function vd(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let l=[...n.querySelectorAll("[data-nc-choice]")],s=l.indexOf(i),c=s;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(s+1)%l.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(s-1+l.length)%l.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=l.length-1;else return;let d=l[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(se()),ji(n,e),n}function ji(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function wd(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let p=e.slots[u],m=document.createElement("span");m.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(u),f.textContent=p.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(f,ke()),xd(m,f,n,u,t),o.append(m)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Bi(),i.append(ke()),i.addEventListener("click",()=>{Ui(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let l=document.createElement("span");l.className="nc-label",l.textContent="Morph";let s=document.createElement("input");s.type="range",s.className="nc-range nc-morph",s.min="0",s.max="4",s.step="0.01",s.setAttribute("aria-label","Morph time"),s.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(s.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(l,c,s);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,r,se()),Oi(n,t),_i(n,e),n}function qo(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;ct(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function xd(e,t,n,o,i){let r=0,l=0,s=0,c=!1,d=!1,u=!1,p=!1,m=()=>{window.clearTimeout(r),r=0},f=v=>{let x=v.clientX-l,g=v.clientY-s;x*x+g*g>Fo*Fo&&(c=!0,m())},b=()=>{p&&(p=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=v=>{let x=r!==0&&!c&&!d;m(),b(),x&&(u=!0,qo(n,o,i,v))},h=()=>{c=!0,m(),b()};e.addEventListener("pointerdown",v=>{v.button===0&&(b(),d=!1,c=!1,u=!1,l=v.clientX,s=v.clientY,m(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,yd(n,t,o,i))},ad),p=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",v=>v.preventDefault()),e.addEventListener("click",v=>{if(u||d||c){u=!1,d=!1,c=!1;return}qo(n,o,i,v)})}function Oi(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=Ro("Save","store"),i=Ro("Clear","clear");n.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),ct(e)}),r.addEventListener("click",l=>l.stopPropagation()),e.append(r,n),n.addEventListener("click",l=>{let s=l.target;if(!(s instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);s.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),ct(e)):s.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),ct(e))}),e.addEventListener("keydown",l=>{l.key==="Escape"&&ct(e)})}function Ro(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function yd(e,t,n,o){Oi(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();i.style.left=`${s.left-l.left}px`,i.style.top=`${s.bottom-l.top}px`,i.querySelector("button")?.focus()}function ct(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function _i(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),l=t.slots[r];if(!l)continue;i.textContent=l.label,l.filled?i.dataset.filled="true":delete i.dataset.filled,l.active?i.dataset.active="true":delete i.dataset.active,l.edited?i.dataset.edited="true":delete i.dataset.edited,l.queued?i.dataset.queued="true":delete i.dataset.queued,l.queued&&l.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let s=[l.filled?"saved":"empty",l.active?"playing":"",l.edited?"edited":"",l.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[l.label,...s.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Ui(e){let t=e.dataset.ncLastFill||null,n=wl(t);e.dataset.ncLastFill=n;let o=xl(n);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function $d(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,n.setAttribute("aria-pressed",r?"true":"false");let l=t(e);l?.type==="stepGrid"&&l.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function kd(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=h=>{let v=document.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.textContent=h,o.append(v),v},r=i("Note"),l=i("Accent");l.dataset.ncAccentMode="";let s=h=>{for(let v of[r,l]){let x=v===h;v.setAttribute("aria-checked",x?"true":"false"),v.tabIndex=x?0:-1}};s(r);for(let h of[r,l])h.addEventListener("click",()=>s(h));o.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let v=l.getAttribute("aria-checked")==="true"?r:l;s(v),v.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append($d(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let v=document.createElement("div");v.className="nc-row",v.dataset.ncRow="";let x=document.createElement("button");x.type="button",x.className="nc-name",x.textContent=h.label,x.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(x.dataset.ncLane=String((h.lane-1)%4+1));let g=!1,P=0;x.addEventListener("pointerdown",$=>{g=!1,!($.pointerType==="mouse"||$.button!==0)&&(P=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(g=!0,A.onSelectRow?.(A.rows.findIndex(E=>E.id===h.id),!0))},ud))});for(let $ of["pointerup","pointercancel","pointerleave"])x.addEventListener($,()=>window.clearTimeout(P));x.addEventListener("contextmenu",$=>{g&&$.preventDefault()}),x.addEventListener("click",$=>{let A=t(n);if(A?.type!=="stepGrid")return;if(g){g=!1;return}let E=A.rows.findIndex(k=>k.id===h.id),q=!!A.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);A.onSelectRow?.(E,q)}),x.addEventListener("keydown",$=>Ed(n,x,$));let M=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let E=document.createElement("button");E.type="button",E.className="nc-ms",E.dataset.ncMs=$,E.textContent=$==="mute"?"M":"S",E.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),A.append(E,ke()),A.addEventListener("click",()=>{let q=t(n);if(q?.type!=="stepGrid")return;let k=q.rows.findIndex(w=>w.id===h.id);($==="mute"?q.onMute:q.onSolo)?.(k)}),M.push(A)}let L=document.createElement("div");L.className="nc-steps";for(let $=0;$<h.steps.length;$++){let A=document.createElement("span");A.className="nc-step-wrap";let E=document.createElement("button");E.type="button",E.className="nc-step",E.dataset.ncStep=`${h.id}:${$}`,E.setAttribute("aria-label",`${h.label} step ${$+1}`),A.append(E,ke()),A.addEventListener("click",q=>{let k=t(n);if(k?.type!=="stepGrid")return;let w=k.rows.findIndex(R=>R.id===h.id),B=l.getAttribute("aria-checked")==="true";k.onToggle(w,$,q.shiftKey||B)}),L.append(A)}if(e.onLength&&L.append(Ad(n,L,h,t)),v.append(...M,x,L),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Do(),$.append(ke()),$.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(E=>E.id===h.id))}),v.append($)}v.addEventListener("click",$=>{if($.target!==v)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(E=>E.id===h.id))}),Bo(n,L,".nc-step-wrap",t,l,()=>h.id),n.append(v)}let d=document.createElement("div");d.className="nc-pads-head";let u=(h,v,x)=>{let g=document.createElement("button");return g.type="button",g.className=h,g.textContent=v,x&&g.setAttribute("aria-label",x),g},p=u("nc-pads-step","‹","Previous lane"),m=u("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",za(n,h))}));for(let[h,v]of[[p,-1],[m,1]])h.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid"||x.rows.length===0)return;let g=x.rows.length;x.onSelectRow?.(((Mt(x)+v)%g+g)%g)});if(d.append(p,f,m),e.onDice){let h=u("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Do(),h.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid")return;let x=Mt(v);x>=0&&v.onDice?.(x)}),d.append(h)}if(e.transport){let h=u("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.transport?.onToggle()}),d.append(h)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){let v=document.createElement("button");v.type="button",v.className="nc-pad",v.dataset.ncPad=String(h),v.textContent=String(h+1),v.addEventListener("click",x=>{let g=t(n);if(g?.type!=="stepGrid")return;let P=Mt(g);if(P<0)return;if(n.dataset.ncLenMode==="true"){g.onLength?.(P,h+1);return}let M=l.getAttribute("aria-checked")==="true";g.onToggle(P,h,x.shiftKey||M)}),b.append(v)}return Bo(n,b,".nc-pad",t,l,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[Mt(h)]?.id:void 0}),n.append(b),n.append(se()),za(n,e),n}function Mt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Bo(e,t,n,o,i,r){let l="on",s=!0,c=-1,d=(u,p)=>{let m=u.rows[c]?.steps[p];!m||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,l,s):!!m[l]!==s&&u.onToggle(c,p,l==="accent"))};Gs(t,n,u=>{let p=o(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let m=p.rows.findIndex(f=>f.id===r());m>=0&&p.rows[m].length!==u.pad+1&&p.onLength?.(m,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let m=r();c=p.rows.findIndex(b=>b.id===m);let f=p.rows[c]?.steps[u.pad];if(!f)return;l=i.getAttribute("aria-checked")==="true"?"accent":"on",s=!f[l]}d(p,u.pad)}else if(u.kind==="long"){let m=r(),f=p.rows.findIndex(y=>y.id===m),b=t.querySelectorAll(n)[u.pad];f>=0&&b instanceof HTMLElement&&p.onLongPress?.(f,u.pad,b)}}})}function Ed(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=o.length-1;let l=o[r];!(l instanceof HTMLElement)||l===t||(n.preventDefault(),l.focus(),l.click())}function Ad(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(ke());let r=d=>{let u=o(e);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(b=>b.id===n.id),m=u.rows[p];if(!m)return;let f=Math.max(1,Math.min(m.steps.length,d));f!==m.length&&u.onLength?.(p,f)},l=d=>{let u=[...t.querySelectorAll(".nc-step")],p=1;return u.forEach((m,f)=>{let b=m.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(p=f+1)}),p},s=d=>r(l(d.clientX)),c=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",s),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let u=o(e);if(u?.type!=="stepGrid")return;let p=u.rows.find(f=>f.id===n.id);if(!p)return;let m={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in m&&(d.preventDefault(),r(m[d.key]))}),i}var ua=new WeakMap,St=new WeakMap;function Md(e){return e?(St.has(e)||(St.set(e,wa(e)),ri(t=>{St.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Na(n,Number(n.getAttribute("data-nc-velocity")))},e)),St.get(e)):"light"}function Na(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:Md(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(ua.has(e)&&ua.get(e)===i)){if(ua.set(e,i),n===null){for(let r of Object.keys(ho(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,l]of Object.entries(ho(n,po[o]??po.light)))e.style.setProperty(r,l)}}function za(e,t){let n=t.rows.some(u=>u.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],l=e.querySelector(".nc-pads-label"),s=e.dataset.ncLenMode==="true"&&!!t.onLength;l instanceof HTMLElement&&r&&(l.textContent=s?`${r.label} · ${r.length}`:r.label,t.onLength&&(l.setAttribute("aria-pressed",s?"true":"false"),l.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,p=t.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let m=t.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let u=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let m=Number(p.getAttribute("data-nc-pad")),f=r.steps[m];p instanceof HTMLButtonElement&&(p.hidden=!f||!s&&m>=r.length,s&&m>=r.length?p.dataset.out="true":delete p.dataset.out,s&&m===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${m+1}`),p.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?p.dataset.accent="true":delete p.dataset.accent,f?.dim?p.dataset.dim="true":delete p.dataset.dim,Na(p,f?.velocity),t.playhead>=0&&m===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of t.rows){for(let f=0;f<u.steps.length;f++){let b=u.steps[f],y=e.querySelector(`[data-nc-step="${u.id}:${f}"]`);if(!(y instanceof HTMLButtonElement))continue;let h=y.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===u.id?h.dataset.selected="true":delete h.dataset.selected;let g=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);g?h.dataset.picked="true":delete h.dataset.picked;let P=h.querySelector(".nc-name");P instanceof HTMLElement&&(P.setAttribute("aria-pressed",t.selectedRow===u.id||g?"true":"false"),P.textContent!==u.label&&(P.textContent=u.label,P.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?h.dataset.silent="true":delete h.dataset.silent;for(let M of h.querySelectorAll("[data-nc-ms]")){let L=M.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;M.setAttribute("aria-pressed",L?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,f%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Na(y,b.velocity);let v=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;f===v?y.dataset.playhead="true":delete y.dataset.playhead;let x=!!t.onLength&&t.selectedRow===u.id;y.hidden=f>=u.length&&!x,f>=u.length&&x?y.dataset.out="true":delete y.dataset.out}let p=e.querySelector(`[data-nc-len="${u.id}"]`),m=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&m&&m.nextElementSibling!==p){let f=document.activeElement===p;m.after(p),f&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function Sd(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,se()),t}function Cd(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",l=null;r&&(n.dataset.ncFoldable="",l=Qi(),l.dataset.ncStripHide="",l.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==l&&l.focus())})),o.append(i);let s=null;if(!e.master&&typeof e.onMove=="function"){s=document.createElement("button"),s.type="button",s.className="nc-strip-grip",s.dataset.ncStripGrip="",s.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let g=document.createElement("span");g.className="nc-strip-grip-dots",g.setAttribute("aria-hidden","true"),s.append(g),s.addEventListener("keydown",P=>{if(P.key!=="ArrowLeft"&&P.key!=="ArrowRight"||P.ctrlKey||P.metaKey||P.shiftKey)return;let M=t(n);M?.type==="strip"&&(P.preventDefault(),M.onMove?.(P.key==="ArrowLeft"?-1:1))})}if(s&&typeof e.onShade=="function"&&(s.setAttribute("aria-haspopup","dialog"),s.addEventListener("click",()=>Ho(n,s,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",g=>{g.pointerType==="touch"||g.pointerType==="pen"||g.target instanceof Element&&g.target.closest("input, .nc-strip-remove")||(g.preventDefault(),Ho(n,o,t,{x:g.clientX,y:g.clientY}))}),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let P=t(n);P?.type==="strip"&&P.onRemove?.(g)}),o.append(g)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let P=document.createElement("button");P.type="button",P.className="nc-hacks",P.dataset.ncHacks="",g.append(P,ke()),g.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onHacks?.()}),c.append(g)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let g=document.createElement("span");g.className="nc-hacks-wrap nc-sends-view-wrap";let P=document.createElement("button");P.type="button",P.className="nc-hacks nc-sends-view",P.dataset.ncSendsView="",g.append(P,ke()),g.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onSendsView?.()}),d.append(g)}for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let P=document.createElement("span");P.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=g,M.textContent=g==="mute"?"M":"S",P.append(M,ke()),P.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&(g==="mute"?L.onMute:L.onSolo)?.()}),d.append(P)}let u=document.createElement("div");u.className="nc-strip-sends";for(let g of e.sends??[])u.append(He({...g,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(He(rn(e),t));let m=document.createElement("div");m.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let P=document.createElement("span");P.className="nc-scale-tick",P.style.setProperty("--tick-pos",String(g.value)),P.textContent=g.label,f.append(P)}let b=Hl({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let P=t(n);P?.type==="strip"&&P.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&Io(g)}}),y=Yl({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(m.append(f,b.el,y.el),r){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let P=document.createElement("span");P.className="nc-strip-fold-cap",P.setAttribute("aria-hidden","true");let M=document.createElement("span");M.className="nc-ui-fx-fold-name",M.dataset.ncStripFoldName="";let L=document.createElement("span");L.className="nc-strip-fold-pan",L.setAttribute("aria-hidden","true"),L.hidden=!e.pan,g.append(P,L,M),g.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),m.prepend(g)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let v=0;h.addEventListener("click",g=>{let P=t(n);P?.type!=="strip"||!P.onTypeIn||(window.clearTimeout(v),g.detail===0?Po(n,h,t):g.detail===1&&(v=window.setTimeout(()=>Po(n,h,t),Fd)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(v);let g=t(n);g?.type==="strip"&&Io(g)});let x=document.createElement("div");return x.className="nc-strip-trim",e.trim&&x.append(He(ln(e),t)),l&&n.append(l),s&&n.append(s),n.append(o,x,c,d,u,p,m,h,se()),Gi(n,e),n}function rn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Ld(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function ln(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Td(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function Td(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Ld(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Fd=250;function Po(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??bt(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,l=s=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,s){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",s=>{s.key==="Enter"?(s.preventDefault(),l(!0)):s.key==="Escape"&&(s.preventDefault(),l(!1))}),i.addEventListener("blur",()=>l(!1))}function Dd(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let l=document.createElement("select");return l.className="nc-strip-add-select",l.addEventListener("change",()=>{let s=t(n),c=l.value;Yi(l),s?.type==="stripAdd"&&c&&s.onAdd(c)}),n.append(o,l,se()),Vi(n,e),n}function Vi(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(s=>`${s.value}|${s.textContent}|${s.disabled}`).join(","),l=i.map(s=>`${s.value}|${s.label}|${s.disabled===!0}`).join(",");r!==l&&(o.replaceChildren(...i.map(s=>{let c=document.createElement("option");return c.value=s.value,c.textContent=s.label,c.disabled=s.disabled===!0,c})),Yi(o))}function Yi(e){let t=e.options[0];t&&(t.selected=!0)}function Io(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Gi(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?jl(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Gl(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let l=e.querySelector(".nc-strip-db");if(l instanceof HTMLElement){let b=t.valueText??bt(t.value);l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-label",`${t.label} level ${b}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";l.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let b of e.querySelectorAll("[data-nc-ms]")){let y=b.getAttribute("data-nc-ms"),h=y==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",h?"true":"false"),b.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let s=e.querySelector("[data-nc-hacks]");if(s){let b=t.hacksLabel??"Hacks";s.textContent!==b&&(s.textContent=b),s.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),s.setAttribute("aria-label",`${b}: ${t.label}`),s.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let b=t.sendsViewLabel??"Sends";c.textContent!==b&&(c.textContent=b),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),De(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=Wi(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let b=e.querySelector(`.nc-strip-trim [data-nc-id="${Qe(t.trim.id)}"]`);b&&ve(b,ln(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${Qe(t.pan.id)}"]`);b&&ve(b,rn(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let m=e.querySelector("[data-nc-strip-hide]");m instanceof HTMLElement&&(Zi(m,p,t.label),De(m,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!p,f.setAttribute("aria-label",`Expand ${t.label}`);let b=f.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),De(f,t.foldedHelp??t.foldHelp)}}function Wi(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Xi?t:0}var Xi=8,Ct=null;function Ho(e,t,n,o){Ct?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,l=r.defaultView??globalThis,s=r.createElement("div");s.className="nc-strip-menu",s.dataset.ncStripMenu="",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=Wi(i),p=e.querySelector("[data-nc-strip-grip]")??t,m=(v=!1)=>{if(Ct!==m)return;Ct=null;let x=s.contains(r.activeElement);s.remove(),r.removeEventListener("keydown",b,!0),r.removeEventListener("pointerdown",y,!0),l.removeEventListener("resize",h),(v||x)&&p?.isConnected&&p.focus?.({preventScroll:!0})},f=[0,...Array.from({length:Xi},(v,x)=>x+1)].map(v=>{let x=r.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.setAttribute("aria-checked",v===u?"true":"false"),x.setAttribute("tabindex",v===u?"0":"-1"),x.dataset.ncShadeChoice=String(v),v===0?(x.textContent="Auto",x.setAttribute("aria-label","Auto: alternate light and dark"),x.title="Auto: alternate light and dark"):(x.textContent=String(v),x.setAttribute("aria-label",`Shade ${v}`),x.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${v})`)),x.addEventListener("click",()=>{let g=n(e);m(!0),g?.type==="strip"&&g.onShade?.(v===0?null:v)}),x});if(d.append(...f),d.addEventListener("keydown",v=>{let x=f.indexOf(r.activeElement);if(x<0)return;let g=-1;v.key==="ArrowRight"||v.key==="ArrowDown"?g=(x+1)%f.length:v.key==="ArrowLeft"||v.key==="ArrowUp"?g=(x-1+f.length)%f.length:v.key==="Home"?g=0:v.key==="End"&&(g=f.length-1),!(g<0)&&(v.preventDefault(),f[x].setAttribute("tabindex","-1"),f[g].setAttribute("tabindex","0"),f[g].focus())}),s.append(c,d),typeof i.onMove=="function"){let v=[...e.parentElement?.children??[]].filter(g=>g.classList?.contains("nc-strip")&&!g.hasAttribute("data-nc-master")),x=v.indexOf(e);for(let[g,P,M]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let L=r.createElement("button");L.type="button",L.className="nc-strip-menu-item",L.dataset.ncStripMove=g<0?"left":"right";let $=r.createElement("span");$.textContent=P;let A=r.createElement("kbd");A.textContent=M,A.setAttribute("aria-hidden","true"),L.append($,A),L.disabled=g<0?x<=0:x<0||x>=v.length-1,L.addEventListener("click",()=>{let E=n(e);m(!0),E?.type==="strip"&&E.onMove?.(g)}),s.append(L)}}r.body.append(s),(()=>{let v=t.getBoundingClientRect?.()??{bottom:0,right:0},x=s.offsetWidth,g=s.offsetHeight,P=l.innerWidth||r.documentElement.clientWidth||x,M=l.innerHeight||r.documentElement.clientHeight||g,L=o?o.x:v.right-x,$=o?o.y:v.bottom+4;L=Math.max(4,Math.min(L,P-x-4)),$+g>M-4&&($=Math.max(4,(o?o.y:v.top)-g-4)),s.style.left=`${Math.round(L)}px`,s.style.top=`${Math.round($)}px`})();let b=v=>{if(v.key==="Escape")v.preventDefault(),v.stopPropagation(),m(!0);else if(v.key==="Tab"&&s.contains(r.activeElement)){let x=[...s.querySelectorAll("button:not([disabled])")].filter(P=>P.getAttribute("tabindex")!=="-1"),g=(x.indexOf(r.activeElement)+(v.shiftKey?-1:1)+x.length)%x.length;v.preventDefault(),x[g]?.focus()}},y=v=>{s.contains(v.target)||m(!1)},h=()=>m(!1);return r.addEventListener("keydown",b,!0),r.addEventListener("pointerdown",y,!0),l.addEventListener("resize",h),Ct=m,(f.find(v=>v.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:s,close:()=>m(!1)}}var qa=typeof ResizeObserver=="function"?new ResizeObserver(Nd):null;function Nd(e){for(let t of e){if(!t.target.isConnected){qa.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&zd(n)}}function zd(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function qd(e){if(qa)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))qa.observe(t)}function Rd(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,l=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!jt(e)&&!r&&!l)n.append(o);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(o),r&&s.append(er(n,"head")),e.on!==void 0){let c=Ka({checked:e.on,labelledBy:o.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",s.append(c.el)}i&&s.append(Pd(n,t)),jt(e)&&s.append(Od(n,t)),l&&s.append(_d(t)),n.append(s)}i&&n.prepend(Id(n,t)),r&&tr(n,e);for(let s of e.controls)n.append(He(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",s.append(c);for(let d of e.more)s.append(He(d,t));n.append(s)}return n.append(se()),ar(n,e),qd(n),n}var Bd=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Ki(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&Bd(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Pd(e,t){let n=Qi();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Ki(e))}),n}function Qi(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Zi(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Id(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(er(e,"fold")),n.addEventListener("click",()=>{let l=t(n);if(l?.type==="fx"){if(l.folded!==!0){let s=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(s instanceof HTMLElement){s.click();return}}l.onFold?.(!1),Ki(e)}}),n}var tt=new Set;function Dt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var jt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Hd="(max-width: 768px)";function jd(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Od(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(jd()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(Ji(e,o,!tt.has(o.id)),n.focus())}),n}function _d(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Ji(e,t,n){n?tt.add(t.id):tt.delete(t.id),sn(e,t)}function Ud(e,t){t?.type==="fx"&&tt.has(t.id)&&Ji(e,t,!1)}function Vd(e){return e.ownerDocument.defaultView?.matchMedia?.(Hd).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function sn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=jt(t)&&tt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!jt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Dt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&et(l)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",De(n,t.maxHelp)),!o){e.dataset.ncMax&&jo(e);return}if(!e.isConnected){let l=()=>e.isConnected&&tt.has(t.id)&&sn(e,t);queueMicrotask(()=>{e.isConnected?l():Dt(e.ownerDocument,l)});return}let i=Vd(e),r=[...e.children].filter(l=>l.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&jo(e),e.dataset.ncMax=i,i==="over"&&Yd(e,t)),Gd(e.ownerDocument),i==="over"&&dn(e),Dt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&et(l)})}function jo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Dt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&et(n)})}function Yd(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function dn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,l=us(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${l.left}px`,e.style.top=`${l.top}px`,e.style.width=`${l.width}px`}var Oo=new WeakSet;function Gd(e){Oo.has(e)||(Oo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&dn(t)}))}var Ra=new WeakMap;function er(e,t){let n=js(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function tr(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)De(i,t.meterHelp);let o=Ra.get(e);o?o.set(t.meter):Ra.set(e,Vs(n,t.meter))}function ar(e,t){(t.meter||Ra.has(e))&&tr(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Zi(r,i,t.title),De(r,t.foldHelp)),sn(e,t);let l=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(l instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;l.hidden=i,l.setAttribute("aria-label",c),l.title=c}let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let d=s.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),De(s,t.foldHelp)}}function De(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Qe(e){return e.replace(/["\\]/g,"\\$&")}function Wd(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&mi(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&et(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&dn(n);od(e)}var Xd=1e3,Kd=e=>e===!0?"log":typeof e=="string"?e:"linear";function Qd(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Kd(e.log),i=yt(o,e.min,e.max),r=n.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let l=n.createElement("label");l.className="nc-label",l.setAttribute("for",e.id),l.textContent=e.label;let s=n.createElement("input");s.type="range",s.className="nc-range",s.id=e.id,s.dataset.ncId=e.id,s.min=String(i?0:e.min),s.max=String(i?Xd:e.max),s.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",r.append(l,s,c,d);let u=e.value,p=()=>{let f=e.format(u);c.textContent=f,s.setAttribute("aria-valuetext",f)},m=f=>{u=f,n.activeElement!==s&&(s.value=String(i?gt(o,e.min,e.max,u):u)),p()};return s.addEventListener("input",()=>{u=i?Bt(o,e.min,e.max,s.value,e.step):Number(s.value),p(),e.onInput(u)}),i&&s.addEventListener("keydown",f=>{let b=Za(o,e.min,e.max,u,f.key,f.shiftKey,e.step);b===null||s.disabled||(f.preventDefault(),s.value=String(gt(o,e.min,e.max,b)),u=b,p(),e.onInput(u))}),s.disabled=e.disabled===!0,m(e.value),{el:r,set:m,setDisabled(f){s.disabled=f===!0}}}var vt="data-nc-help";function Zd(e,t,n,o=0,i=6,r=8){let l=e.top-i-t.height,s=l>=o+r?"above":"below",c=s==="above"?l:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:s}}var pa=new WeakMap;function Jd(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function ec({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=pa.get(e);if(n)return n;let o=e.defaultView,i=null,r=null,l,s=!1,c,d=()=>{clearTimeout(l),clearTimeout(c),r=null,s=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},u=(b,y)=>{let h=y??b.getAttribute(vt);if(!h)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=h,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let v=b.getBoundingClientRect(),x=Zd(v,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,Jd(e));return i.style.top=`${x.top}px`,i.style.left=`${x.left}px`,i.dataset.side=x.side,i.style.visibility="",!0},p=b=>{if(s||b.pointerType==="touch")return;let y=b.target&&b.target.closest?b.target.closest(`[${vt}]`):null;y!==r&&(d(),y&&(r=y,l=setTimeout(()=>{r===y&&y.isConnected&&u(y)},t)))},m=b=>{(s||b.key==="Escape")&&d()};e.addEventListener("pointerover",p),e.addEventListener("pointerdown",d,!0),e.addEventListener("keydown",m),o.addEventListener("scroll",d,!0),o.addEventListener("blur",d);let f={hide:d,pin(b,y,{ms:h=0}={}){return d(),!b||!b.isConnected||!u(b,y)?!1:(s=!0,i.dataset.pinned="",h>0&&(c=setTimeout(d,h)),!0)},uninstall(){d(),e.removeEventListener("pointerover",p),e.removeEventListener("pointerdown",d,!0),e.removeEventListener("keydown",m),o.removeEventListener("scroll",d,!0),o.removeEventListener("blur",d),i?.remove(),i=null,pa.delete(e)}};return pa.set(e,f),f}var tc="(max-width: 768px)",ac='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',nc='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',oc=0;function ic({panel:e,button:t,label:n="Menu",media:o=tc}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++oc}`);let l=t??i.createElement("button");t||(l.type="button",l.innerHTML=ac),l.classList.add("nc-page-menu-btn"),l.setAttribute("aria-label",n),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-controls",e.id);let s=()=>e.hasAttribute("data-nc-open");function c(){s()||(e.setAttribute("data-nc-open",""),l.setAttribute("aria-expanded","true"),i.addEventListener("keydown",u,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(nc)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!s())return;let v=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),l.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",u,!0),i.removeEventListener("pointerdown",p,!0),(h??v)&&l.focus?.({preventScroll:!0})}function u(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function p(h){let v=h.target;v instanceof r.Node&&(e.contains(v)||l.contains(v))||d({focus:!1})}let m=()=>s()?d({focus:!0}):c(),f=h=>{let v=h.target,x=v instanceof r.Element?v.closest("button"):null;!x||!e.contains(x)||x.closest("[data-nc-menu-stay]")||d({focus:!0})};l.addEventListener("click",m),e.addEventListener("click",f);let b=r.matchMedia?.(o),y=()=>{b?.matches||d({focus:!1})};return b?.addEventListener?.("change",y),{button:l,panel:e,open:c,close:d,isOpen:s,destroy(){d({focus:!1}),l.removeEventListener("click",m),e.removeEventListener("click",f),b?.removeEventListener?.("change",y)}}}var Vt="netcomposer.rhythm.hidden.v1",Me=new WeakMap;function Nt(){try{return globalThis.localStorage??null}catch{return null}}function nr(e,t=Vt){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Ba(e,t,n,o=Vt){let i=nr(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function rc(e,t=Vt){let n=Nt();if(!(!n||n.getItem(`${t}:seeded`))){for(let o of e)Ba(n,o,!0,t);n.setItem(`${t}:seeded`,"1")}}function cn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(rn(i)),i.trim&&n.push(ln(i)));return n}function or(e,t){if(!(!e||!t))return cn(e).find(n=>n.id===t)}function lc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${cn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function sc(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),ir(e,t)}function ir(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function dc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Me.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return or(n,o)}function cc(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=lc(t);if(e.dataset.ncSignature===i){for(let r of o){let l=e.querySelector(`[data-nc-section="${Uo(r.id)}"]`);l&&ir(l,r);for(let s of r.controls){let c=e.querySelector(`[data-nc-id="${Uo(s.id)}"]`);c instanceof Element&&ve(c,s)}l instanceof HTMLElement&&Pa(l,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let l=document.createElement("div");l.className="nc-section",l.dataset.ncSection=r.id,r.inset&&(l.dataset.ncInset="true"),r.area&&(l.dataset.ncArea=r.area),r.label&&(l.setAttribute("role","group"),l.setAttribute("aria-label",r.label)),r.panel&&(l.dataset.ncPanel="true",l.setAttribute("role","region"),r.title&&l.setAttribute("aria-label",r.title)),sc(l,r);let s=r.panel?document.createElement("div"):l;r.panel&&(s.className="nc-panel-body",l.append(s));for(let c of r.controls)s.append(He(c,dc));e.append(l),Pa(l,r,n)}}function rr(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var uc="(max-width: 768px)",lr=new WeakMap;function _o(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function pc(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=_o("prev"),r=_o("next"),l=document.createElement("span");l.className="nc-fx-page-count",l.dataset.ncFxPageCount="",l.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-ui-toast-live",s.dataset.ncFxPageLive="",s.setAttribute("aria-live","polite"),o.append(i,l,r,s);let c=(d,u)=>{let p=lr.get(e);if(!p||u.getAttribute("aria-disabled")==="true")return;let m=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=rr(m,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,f),p.onPage?.(f),Pa(e,{...p,page:f},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(o),o}function Pa(e,t,n){lr.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:l}=rr(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,l),r<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of o)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let s=e.ownerDocument.defaultView?.matchMedia?.(uc).matches===!0,c=e.closest(".nc-module");o.forEach((h,v)=>{let x=Math.floor(v/i)!==l;if(x?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,x&&!s){let g=c instanceof HTMLElement?Me.get(c):void 0;Ud(h,or(g,h.dataset.ncId))}});let d=pc(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",l===0?"true":"false"),p.setAttribute("aria-disabled",l===r-1?"true":"false");let m=d.querySelector("[data-nc-fx-page-count]"),f=`${l+1} / ${r}`;m.textContent!==f&&(m.textContent=f);let b=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${l+1} of ${r}`;b.textContent!==y&&(b.textContent=y)}function Uo(e){return e.replace(/["\\]/g,"\\$&")}function hc(e,t=Vt){di();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=nr(Nt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let l=document.createElement("span");l.className="nc-module-end";let s=document.createElement("button");s.type="button",s.className="nc-hide",s.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Ka({labelledBy:r.id,onChange:x=>(Me.get(n)??e).onToggle?.(x)});d.el.dataset.ncModuleSwitch="",l.append(d.el,s,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",i.append(r,u,l);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",m.append(f);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,p,m),n.setAttribute("aria-labelledby",r.id);let y=x=>{let g=Me.get(n)??e;n.dataset.ncOpen=x?"false":"true",p.hidden=x,m.hidden=!x,s.textContent=x?"+":"−",s.setAttribute("aria-expanded",x?"false":"true"),s.setAttribute("aria-controls",p.id),s.setAttribute("aria-label",`${x?"Show":"Hide"} ${g.title}`),s.title=x?"Show":"Hide",x?n.dataset.ncSlim="":delete n.dataset.ncSlim};s.addEventListener("click",()=>{let x=n.dataset.ncOpen==="true";Ba(Nt(),(Me.get(n)??e).id,x,t),y(x),Ia(n.parentElement)}),m.addEventListener("click",()=>{Ba(Nt(),(Me.get(n)??e).id,!1,t),y(!1),Ia(n.parentElement)});let h={pages:new Map,redraw:()=>v.redraw()},v={el:n,update(x){Me.set(n,x),x.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=x.title,u.textContent=x.status??"",x.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),f.textContent=x.summary??x.title,d.el.hidden=x.on===void 0,d.set(x.on===!0),x.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,m.setAttribute("aria-label",`Show ${x.title}`),cc(p,x,h),y(p.hidden),v.redraw()},redraw(){let x=Me.get(n);x&&Wd(n,cn(x))}};return Me.set(n,e),y(o),v.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>v.redraw()).observe(n),ri(()=>v.redraw(),n.ownerDocument),v}function mc(e,t,n="adjacent"){di(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let l=r%4+1;i.el.dataset.ncShade=String(l),i.el.dataset.ncPlace=o;let s=i.el.querySelector("[data-nc-index]");s&&(s.textContent=String(l).padStart(2,"0")),e.append(i.el),i.redraw()}),Ia(e)}function Ia(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const fc={"page:hold":"Freeze what ARIA sends: the Ground table, Energy and your phone's motion stay where they are until you release Hold.","page:save":"Download ARIA's settings (station, Smoothing) as a file.","page:load":"Load an ARIA file.",station:"The seismometer ARIA listens to, live from EarthScope. Its ground motion becomes the Ground table and Energy.",custom:"Any station EarthScope streams, as NET STA LOC CHA (for example IU ANMO 00 BHZ).",status:"Live: data is arriving. Quiet: connected, nothing for two minutes. Offline: reconnecting; the 2010 recording plays meanwhile.",wave:"The last ten minutes at this station. The line is where ARIA is playing; the shaded slice is the table.",table:"One cycle of ground motion, mirrored so it loops. ASTRID plays it as its Ground table.",energy:"How much the ground moves against this station's last 30 minutes: its normal reads 0.5. ASTRID can use it as Ground Energy.",smoothing:"How slowly Energy follows the ground, in seconds.","motion:allow-motion":"Your phone asks once. Motion stays on this phone: ARIA turns it into signals for the Studio's instruments.","motion:via":"This device: the sensors of the device ARIA runs on. A phone with this Studio: pair a phone and its motion comes here.","remote:end":"End the pairing on both sides. The phone stops sending and the instruments hold their last value.","motion:status":"Live: motion is arriving. Paused: the screen locked or the page was hidden. Blocked: the phone said no.","motion:tilt-x":"Tip the phone left or right. Centre is 0; full tilt is −1 or +1. Instruments see it as Phone Tilt X.","motion:tilt-y":"Tip the top of the phone away from you or toward you. Centre is 0. Instruments see it as Phone Tilt Y.","motion:shake":"Jumps on a shake, then falls away. Each shake is also an event, e.g. a new phrase in the Generator.","motion:heading":"Which way the phone points, 0–360°. It changes slowly. Instruments see it as Phone Heading.","motion:smooth":"How gently the signals follow your hand. 0% is instant and jittery; 100% glides.","motion:centre":"Hold the phone the way you'll play it and keep it still for two seconds. That angle becomes 0.","motion:invert":"Flip the direction, so tipping the other way raises the value.","motion:off":"Stop reading motion. Instruments hold their last value."},un=e=>fc[e]??"";function gc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ha={exports:{}},Vo;function bc(){return Vo||(Vo=1,(function(e,t){var n=(function(){var o=function(M,L){var $=236,A=17,E=M,q=r[L],k=null,w=0,B=null,R=[],I={},V=function(F,D){w=E*4+17,k=(function(S){for(var N=new Array(S),z=0;z<S;z+=1){N[z]=new Array(S);for(var H=0;H<S;H+=1)N[z][H]=null}return N})(w),G(0,0),G(w-7,0),G(0,w-7),Q(),ee(),de(F,D),E>=7&&he(F),B==null&&(B=Et(E,q,R)),ce(B,D)},G=function(F,D){for(var S=-1;S<=7;S+=1)if(!(F+S<=-1||w<=F+S))for(var N=-1;N<=7;N+=1)D+N<=-1||w<=D+N||(0<=S&&S<=6&&(N==0||N==6)||0<=N&&N<=6&&(S==0||S==6)||2<=S&&S<=4&&2<=N&&N<=4?k[F+S][D+N]=!0:k[F+S][D+N]=!1)},K=function(){for(var F=0,D=0,S=0;S<8;S+=1){V(!0,S);var N=s.getLostPoint(I);(S==0||F>N)&&(F=N,D=S)}return D},ee=function(){for(var F=8;F<w-8;F+=1)k[F][6]==null&&(k[F][6]=F%2==0);for(var D=8;D<w-8;D+=1)k[6][D]==null&&(k[6][D]=D%2==0)},Q=function(){for(var F=s.getPatternPosition(E),D=0;D<F.length;D+=1)for(var S=0;S<F.length;S+=1){var N=F[D],z=F[S];if(k[N][z]==null)for(var H=-2;H<=2;H+=1)for(var _=-2;_<=2;_+=1)H==-2||H==2||_==-2||_==2||H==0&&_==0?k[N+H][z+_]=!0:k[N+H][z+_]=!1}},he=function(F){for(var D=s.getBCHTypeNumber(E),S=0;S<18;S+=1){var N=!F&&(D>>S&1)==1;k[Math.floor(S/3)][S%3+w-8-3]=N}for(var S=0;S<18;S+=1){var N=!F&&(D>>S&1)==1;k[S%3+w-8-3][Math.floor(S/3)]=N}},de=function(F,D){for(var S=q<<3|D,N=s.getBCHTypeInfo(S),z=0;z<15;z+=1){var H=!F&&(N>>z&1)==1;z<6?k[z][8]=H:z<8?k[z+1][8]=H:k[w-15+z][8]=H}for(var z=0;z<15;z+=1){var H=!F&&(N>>z&1)==1;z<8?k[8][w-z-1]=H:z<9?k[8][15-z-1+1]=H:k[8][15-z-1]=H}k[w-8][8]=!F},ce=function(F,D){for(var S=-1,N=w-1,z=7,H=0,_=s.getMaskFunction(D),O=w-1;O>0;O-=2)for(O==6&&(O-=1);;){for(var J=0;J<2;J+=1)if(k[N][O-J]==null){var ae=!1;H<F.length&&(ae=(F[H]>>>z&1)==1);var U=_(N,O-J);U&&(ae=!ae),k[N][O-J]=ae,z-=1,z==-1&&(H+=1,z=7)}if(N+=S,N<0||w<=N){N-=S,S=-S;break}}},we=function(F,D){for(var S=0,N=0,z=0,H=new Array(D.length),_=new Array(D.length),O=0;O<D.length;O+=1){var J=D[O].dataCount,ae=D[O].totalCount-J;N=Math.max(N,J),z=Math.max(z,ae),H[O]=new Array(J);for(var U=0;U<H[O].length;U+=1)H[O][U]=255&F.getBuffer()[U+S];S+=J;var oe=s.getErrorCorrectPolynomial(ae),ie=d(H[O],oe.getLength()-1),Ue=ie.mod(oe);_[O]=new Array(oe.getLength()-1);for(var U=0;U<_[O].length;U+=1){var it=U+Ue.getLength()-_[O].length;_[O][U]=it>=0?Ue.getAt(it):0}}for(var rt=0,U=0;U<D.length;U+=1)rt+=D[U].totalCount;for(var Ve=new Array(rt),qe=0,U=0;U<N;U+=1)for(var O=0;O<D.length;O+=1)U<H[O].length&&(Ve[qe]=H[O][U],qe+=1);for(var U=0;U<z;U+=1)for(var O=0;O<D.length;O+=1)U<_[O].length&&(Ve[qe]=_[O][U],qe+=1);return Ve},Et=function(F,D,S){for(var N=u.getRSBlocks(F,D),z=p(),H=0;H<S.length;H+=1){var _=S[H];z.put(_.getMode(),4),z.put(_.getLength(),s.getLengthInBits(_.getMode(),F)),_.write(z)}for(var O=0,H=0;H<N.length;H+=1)O+=N[H].dataCount;if(z.getLengthInBits()>O*8)throw"code length overflow. ("+z.getLengthInBits()+">"+O*8+")";for(z.getLengthInBits()+4<=O*8&&z.put(0,4);z.getLengthInBits()%8!=0;)z.putBit(!1);for(;!(z.getLengthInBits()>=O*8||(z.put($,8),z.getLengthInBits()>=O*8));)z.put(A,8);return we(z,N)};I.addData=function(F,D){D=D||"Byte";var S=null;switch(D){case"Numeric":S=m(F);break;case"Alphanumeric":S=f(F);break;case"Byte":S=b(F);break;case"Kanji":S=y(F);break;default:throw"mode:"+D}R.push(S),B=null},I.isDark=function(F,D){if(F<0||w<=F||D<0||w<=D)throw F+","+D;return k[F][D]},I.getModuleCount=function(){return w},I.make=function(){if(E<1){for(var F=1;F<40;F++){for(var D=u.getRSBlocks(F,q),S=p(),N=0;N<R.length;N++){var z=R[N];S.put(z.getMode(),4),S.put(z.getLength(),s.getLengthInBits(z.getMode(),F)),z.write(S)}for(var H=0,N=0;N<D.length;N++)H+=D[N].dataCount;if(S.getLengthInBits()<=H*8)break}E=F}V(!1,K())},I.createTableTag=function(F,D){F=F||2,D=typeof D>"u"?F*4:D;var S="";S+='<table style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: "+D+"px;",S+='">',S+="<tbody>";for(var N=0;N<I.getModuleCount();N+=1){S+="<tr>";for(var z=0;z<I.getModuleCount();z+=1)S+='<td style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: 0px;",S+=" width: "+F+"px;",S+=" height: "+F+"px;",S+=" background-color: ",S+=I.isDark(N,z)?"#000000":"#ffffff",S+=";",S+='"/>';S+="</tr>"}return S+="</tbody>",S+="</table>",S},I.createSvgTag=function(F,D,S,N){var z={};typeof arguments[0]=="object"&&(z=arguments[0],F=z.cellSize,D=z.margin,S=z.alt,N=z.title),F=F||2,D=typeof D>"u"?F*4:D,S=typeof S=="string"?{text:S}:S||{},S.text=S.text||null,S.id=S.text?S.id||"qrcode-description":null,N=typeof N=="string"?{text:N}:N||{},N.text=N.text||null,N.id=N.text?N.id||"qrcode-title":null;var H=I.getModuleCount()*F+D*2,_,O,J,ae,U="",oe;for(oe="l"+F+",0 0,"+F+" -"+F+",0 0,-"+F+"z ",U+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',U+=z.scalable?"":' width="'+H+'px" height="'+H+'px"',U+=' viewBox="0 0 '+H+" "+H+'" ',U+=' preserveAspectRatio="xMinYMin meet"',U+=N.text||S.text?' role="img" aria-labelledby="'+Ae([N.id,S.id].join(" ").trim())+'"':"",U+=">",U+=N.text?'<title id="'+Ae(N.id)+'">'+Ae(N.text)+"</title>":"",U+=S.text?'<description id="'+Ae(S.id)+'">'+Ae(S.text)+"</description>":"",U+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',U+='<path d="',J=0;J<I.getModuleCount();J+=1)for(ae=J*F+D,_=0;_<I.getModuleCount();_+=1)I.isDark(J,_)&&(O=_*F+D,U+="M"+O+","+ae+oe);return U+='" stroke="transparent" fill="black"/>',U+="</svg>",U},I.createDataURL=function(F,D){F=F||2,D=typeof D>"u"?F*4:D;var S=I.getModuleCount()*F+D*2,N=D,z=S-D;return P(S,S,function(H,_){if(N<=H&&H<z&&N<=_&&_<z){var O=Math.floor((H-N)/F),J=Math.floor((_-N)/F);return I.isDark(J,O)?0:1}else return 1})},I.createImgTag=function(F,D,S){F=F||2,D=typeof D>"u"?F*4:D;var N=I.getModuleCount()*F+D*2,z="";return z+="<img",z+=' src="',z+=I.createDataURL(F,D),z+='"',z+=' width="',z+=N,z+='"',z+=' height="',z+=N,z+='"',S&&(z+=' alt="',z+=Ae(S),z+='"'),z+="/>",z};var Ae=function(F){for(var D="",S=0;S<F.length;S+=1){var N=F.charAt(S);switch(N){case"<":D+="&lt;";break;case">":D+="&gt;";break;case"&":D+="&amp;";break;case'"':D+="&quot;";break;default:D+=N;break}}return D},ot=function(F){var D=1;F=typeof F>"u"?D*2:F;var S=I.getModuleCount()*D+F*2,N=F,z=S-F,H,_,O,J,ae,U={"██":"█","█ ":"▀"," █":"▄","  ":" "},oe={"██":"▀","█ ":"▀"," █":" ","  ":" "},ie="";for(H=0;H<S;H+=2){for(O=Math.floor((H-N)/D),J=Math.floor((H+1-N)/D),_=0;_<S;_+=1)ae="█",N<=_&&_<z&&N<=H&&H<z&&I.isDark(O,Math.floor((_-N)/D))&&(ae=" "),N<=_&&_<z&&N<=H+1&&H+1<z&&I.isDark(J,Math.floor((_-N)/D))?ae+=" ":ae+="█",ie+=F<1&&H+1>=z?oe[ae]:U[ae];ie+=`
`}return S%2&&F>0?ie.substring(0,ie.length-S-1)+Array(S+1).join("▀"):ie.substring(0,ie.length-1)};return I.createASCII=function(F,D){if(F=F||1,F<2)return ot(D);F-=1,D=typeof D>"u"?F*2:D;var S=I.getModuleCount()*F+D*2,N=D,z=S-D,H,_,O,J,ae=Array(F+1).join("██"),U=Array(F+1).join("  "),oe="",ie="";for(H=0;H<S;H+=1){for(O=Math.floor((H-N)/F),ie="",_=0;_<S;_+=1)J=1,N<=_&&_<z&&N<=H&&H<z&&I.isDark(O,Math.floor((_-N)/F))&&(J=0),ie+=J?ae:U;for(O=0;O<F;O+=1)oe+=ie+`
`}return oe.substring(0,oe.length-1)},I.renderTo2dContext=function(F,D){D=D||2;for(var S=I.getModuleCount(),N=0;N<S;N++)for(var z=0;z<S;z++)F.fillStyle=I.isDark(N,z)?"black":"white",F.fillRect(N*D,z*D,D,D)},I};o.stringToBytesFuncs={default:function(M){for(var L=[],$=0;$<M.length;$+=1){var A=M.charCodeAt($);L.push(A&255)}return L}},o.stringToBytes=o.stringToBytesFuncs.default,o.createStringToBytes=function(M,L){var $=(function(){for(var E=x(M),q=function(){var ee=E.read();if(ee==-1)throw"eof";return ee},k=0,w={};;){var B=E.read();if(B==-1)break;var R=q(),I=q(),V=q(),G=String.fromCharCode(B<<8|R),K=I<<8|V;w[G]=K,k+=1}if(k!=L)throw k+" != "+L;return w})(),A=63;return function(E){for(var q=[],k=0;k<E.length;k+=1){var w=E.charCodeAt(k);if(w<128)q.push(w);else{var B=$[E.charAt(k)];typeof B=="number"?(B&255)==B?q.push(B):(q.push(B>>>8),q.push(B&255)):q.push(A)}}return q}};var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},r={L:1,M:0,Q:3,H:2},l={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s=(function(){var M=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],L=1335,$=7973,A=21522,E={},q=function(k){for(var w=0;k!=0;)w+=1,k>>>=1;return w};return E.getBCHTypeInfo=function(k){for(var w=k<<10;q(w)-q(L)>=0;)w^=L<<q(w)-q(L);return(k<<10|w)^A},E.getBCHTypeNumber=function(k){for(var w=k<<12;q(w)-q($)>=0;)w^=$<<q(w)-q($);return k<<12|w},E.getPatternPosition=function(k){return M[k-1]},E.getMaskFunction=function(k){switch(k){case l.PATTERN000:return function(w,B){return(w+B)%2==0};case l.PATTERN001:return function(w,B){return w%2==0};case l.PATTERN010:return function(w,B){return B%3==0};case l.PATTERN011:return function(w,B){return(w+B)%3==0};case l.PATTERN100:return function(w,B){return(Math.floor(w/2)+Math.floor(B/3))%2==0};case l.PATTERN101:return function(w,B){return w*B%2+w*B%3==0};case l.PATTERN110:return function(w,B){return(w*B%2+w*B%3)%2==0};case l.PATTERN111:return function(w,B){return(w*B%3+(w+B)%2)%2==0};default:throw"bad maskPattern:"+k}},E.getErrorCorrectPolynomial=function(k){for(var w=d([1],0),B=0;B<k;B+=1)w=w.multiply(d([1,c.gexp(B)],0));return w},E.getLengthInBits=function(k,w){if(1<=w&&w<10)switch(k){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:return 8;case i.MODE_KANJI:return 8;default:throw"mode:"+k}else if(w<27)switch(k){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw"mode:"+k}else if(w<41)switch(k){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw"mode:"+k}else throw"type:"+w},E.getLostPoint=function(k){for(var w=k.getModuleCount(),B=0,R=0;R<w;R+=1)for(var I=0;I<w;I+=1){for(var V=0,G=k.isDark(R,I),K=-1;K<=1;K+=1)if(!(R+K<0||w<=R+K))for(var ee=-1;ee<=1;ee+=1)I+ee<0||w<=I+ee||K==0&&ee==0||G==k.isDark(R+K,I+ee)&&(V+=1);V>5&&(B+=3+V-5)}for(var R=0;R<w-1;R+=1)for(var I=0;I<w-1;I+=1){var Q=0;k.isDark(R,I)&&(Q+=1),k.isDark(R+1,I)&&(Q+=1),k.isDark(R,I+1)&&(Q+=1),k.isDark(R+1,I+1)&&(Q+=1),(Q==0||Q==4)&&(B+=3)}for(var R=0;R<w;R+=1)for(var I=0;I<w-6;I+=1)k.isDark(R,I)&&!k.isDark(R,I+1)&&k.isDark(R,I+2)&&k.isDark(R,I+3)&&k.isDark(R,I+4)&&!k.isDark(R,I+5)&&k.isDark(R,I+6)&&(B+=40);for(var I=0;I<w;I+=1)for(var R=0;R<w-6;R+=1)k.isDark(R,I)&&!k.isDark(R+1,I)&&k.isDark(R+2,I)&&k.isDark(R+3,I)&&k.isDark(R+4,I)&&!k.isDark(R+5,I)&&k.isDark(R+6,I)&&(B+=40);for(var he=0,I=0;I<w;I+=1)for(var R=0;R<w;R+=1)k.isDark(R,I)&&(he+=1);var de=Math.abs(100*he/w/w-50)/5;return B+=de*10,B},E})(),c=(function(){for(var M=new Array(256),L=new Array(256),$=0;$<8;$+=1)M[$]=1<<$;for(var $=8;$<256;$+=1)M[$]=M[$-4]^M[$-5]^M[$-6]^M[$-8];for(var $=0;$<255;$+=1)L[M[$]]=$;var A={};return A.glog=function(E){if(E<1)throw"glog("+E+")";return L[E]},A.gexp=function(E){for(;E<0;)E+=255;for(;E>=256;)E-=255;return M[E]},A})();function d(M,L){if(typeof M.length>"u")throw M.length+"/"+L;var $=(function(){for(var E=0;E<M.length&&M[E]==0;)E+=1;for(var q=new Array(M.length-E+L),k=0;k<M.length-E;k+=1)q[k]=M[k+E];return q})(),A={};return A.getAt=function(E){return $[E]},A.getLength=function(){return $.length},A.multiply=function(E){for(var q=new Array(A.getLength()+E.getLength()-1),k=0;k<A.getLength();k+=1)for(var w=0;w<E.getLength();w+=1)q[k+w]^=c.gexp(c.glog(A.getAt(k))+c.glog(E.getAt(w)));return d(q,0)},A.mod=function(E){if(A.getLength()-E.getLength()<0)return A;for(var q=c.glog(A.getAt(0))-c.glog(E.getAt(0)),k=new Array(A.getLength()),w=0;w<A.getLength();w+=1)k[w]=A.getAt(w);for(var w=0;w<E.getLength();w+=1)k[w]^=c.gexp(c.glog(E.getAt(w))+q);return d(k,0).mod(E)},A}var u=(function(){var M=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],L=function(E,q){var k={};return k.totalCount=E,k.dataCount=q,k},$={},A=function(E,q){switch(q){case r.L:return M[(E-1)*4+0];case r.M:return M[(E-1)*4+1];case r.Q:return M[(E-1)*4+2];case r.H:return M[(E-1)*4+3];default:return}};return $.getRSBlocks=function(E,q){var k=A(E,q);if(typeof k>"u")throw"bad rs block @ typeNumber:"+E+"/errorCorrectionLevel:"+q;for(var w=k.length/3,B=[],R=0;R<w;R+=1)for(var I=k[R*3+0],V=k[R*3+1],G=k[R*3+2],K=0;K<I;K+=1)B.push(L(V,G));return B},$})(),p=function(){var M=[],L=0,$={};return $.getBuffer=function(){return M},$.getAt=function(A){var E=Math.floor(A/8);return(M[E]>>>7-A%8&1)==1},$.put=function(A,E){for(var q=0;q<E;q+=1)$.putBit((A>>>E-q-1&1)==1)},$.getLengthInBits=function(){return L},$.putBit=function(A){var E=Math.floor(L/8);M.length<=E&&M.push(0),A&&(M[E]|=128>>>L%8),L+=1},$},m=function(M){var L=i.MODE_NUMBER,$=M,A={};A.getMode=function(){return L},A.getLength=function(k){return $.length},A.write=function(k){for(var w=$,B=0;B+2<w.length;)k.put(E(w.substring(B,B+3)),10),B+=3;B<w.length&&(w.length-B==1?k.put(E(w.substring(B,B+1)),4):w.length-B==2&&k.put(E(w.substring(B,B+2)),7))};var E=function(k){for(var w=0,B=0;B<k.length;B+=1)w=w*10+q(k.charAt(B));return w},q=function(k){if("0"<=k&&k<="9")return k.charCodeAt(0)-48;throw"illegal char :"+k};return A},f=function(M){var L=i.MODE_ALPHA_NUM,$=M,A={};A.getMode=function(){return L},A.getLength=function(q){return $.length},A.write=function(q){for(var k=$,w=0;w+1<k.length;)q.put(E(k.charAt(w))*45+E(k.charAt(w+1)),11),w+=2;w<k.length&&q.put(E(k.charAt(w)),6)};var E=function(q){if("0"<=q&&q<="9")return q.charCodeAt(0)-48;if("A"<=q&&q<="Z")return q.charCodeAt(0)-65+10;switch(q){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+q}};return A},b=function(M){var L=i.MODE_8BIT_BYTE,$=o.stringToBytes(M),A={};return A.getMode=function(){return L},A.getLength=function(E){return $.length},A.write=function(E){for(var q=0;q<$.length;q+=1)E.put($[q],8)},A},y=function(M){var L=i.MODE_KANJI,$=o.stringToBytesFuncs.SJIS;if(!$)throw"sjis not supported.";(function(q,k){var w=$(q);if(w.length!=2||(w[0]<<8|w[1])!=k)throw"sjis not supported."})("友",38726);var A=$(M),E={};return E.getMode=function(){return L},E.getLength=function(q){return~~(A.length/2)},E.write=function(q){for(var k=A,w=0;w+1<k.length;){var B=(255&k[w])<<8|255&k[w+1];if(33088<=B&&B<=40956)B-=33088;else if(57408<=B&&B<=60351)B-=49472;else throw"illegal char at "+(w+1)+"/"+B;B=(B>>>8&255)*192+(B&255),q.put(B,13),w+=2}if(w<k.length)throw"illegal char at "+(w+1)},E},h=function(){var M=[],L={};return L.writeByte=function($){M.push($&255)},L.writeShort=function($){L.writeByte($),L.writeByte($>>>8)},L.writeBytes=function($,A,E){A=A||0,E=E||$.length;for(var q=0;q<E;q+=1)L.writeByte($[q+A])},L.writeString=function($){for(var A=0;A<$.length;A+=1)L.writeByte($.charCodeAt(A))},L.toByteArray=function(){return M},L.toString=function(){var $="";$+="[";for(var A=0;A<M.length;A+=1)A>0&&($+=","),$+=M[A];return $+="]",$},L},v=function(){var M=0,L=0,$=0,A="",E={},q=function(w){A+=String.fromCharCode(k(w&63))},k=function(w){if(!(w<0)){if(w<26)return 65+w;if(w<52)return 97+(w-26);if(w<62)return 48+(w-52);if(w==62)return 43;if(w==63)return 47}throw"n:"+w};return E.writeByte=function(w){for(M=M<<8|w&255,L+=8,$+=1;L>=6;)q(M>>>L-6),L-=6},E.flush=function(){if(L>0&&(q(M<<6-L),M=0,L=0),$%3!=0)for(var w=3-$%3,B=0;B<w;B+=1)A+="="},E.toString=function(){return A},E},x=function(M){var L=M,$=0,A=0,E=0,q={};q.read=function(){for(;E<8;){if($>=L.length){if(E==0)return-1;throw"unexpected end of file./"+E}var w=L.charAt($);if($+=1,w=="=")return E=0,-1;if(w.match(/^\s$/))continue;A=A<<6|k(w.charCodeAt(0)),E+=6}var B=A>>>E-8&255;return E-=8,B};var k=function(w){if(65<=w&&w<=90)return w-65;if(97<=w&&w<=122)return w-97+26;if(48<=w&&w<=57)return w-48+52;if(w==43)return 62;if(w==47)return 63;throw"c:"+w};return q},g=function(M,L){var $=M,A=L,E=new Array(M*L),q={};q.setPixel=function(R,I,V){E[I*$+R]=V},q.write=function(R){R.writeString("GIF87a"),R.writeShort($),R.writeShort(A),R.writeByte(128),R.writeByte(0),R.writeByte(0),R.writeByte(0),R.writeByte(0),R.writeByte(0),R.writeByte(255),R.writeByte(255),R.writeByte(255),R.writeString(","),R.writeShort(0),R.writeShort(0),R.writeShort($),R.writeShort(A),R.writeByte(0);var I=2,V=w(I);R.writeByte(I);for(var G=0;V.length-G>255;)R.writeByte(255),R.writeBytes(V,G,255),G+=255;R.writeByte(V.length-G),R.writeBytes(V,G,V.length-G),R.writeByte(0),R.writeString(";")};var k=function(R){var I=R,V=0,G=0,K={};return K.write=function(ee,Q){if(ee>>>Q)throw"length over";for(;V+Q>=8;)I.writeByte(255&(ee<<V|G)),Q-=8-V,ee>>>=8-V,G=0,V=0;G=ee<<V|G,V=V+Q},K.flush=function(){V>0&&I.writeByte(G)},K},w=function(R){for(var I=1<<R,V=(1<<R)+1,G=R+1,K=B(),ee=0;ee<I;ee+=1)K.add(String.fromCharCode(ee));K.add(String.fromCharCode(I)),K.add(String.fromCharCode(V));var Q=h(),he=k(Q);he.write(I,G);var de=0,ce=String.fromCharCode(E[de]);for(de+=1;de<E.length;){var we=String.fromCharCode(E[de]);de+=1,K.contains(ce+we)?ce=ce+we:(he.write(K.indexOf(ce),G),K.size()<4095&&(K.size()==1<<G&&(G+=1),K.add(ce+we)),ce=we)}return he.write(K.indexOf(ce),G),he.write(V,G),he.flush(),Q.toByteArray()},B=function(){var R={},I=0,V={};return V.add=function(G){if(V.contains(G))throw"dup key:"+G;R[G]=I,I+=1},V.size=function(){return I},V.indexOf=function(G){return R[G]},V.contains=function(G){return typeof R[G]<"u"},V};return q},P=function(M,L,$){for(var A=g(M,L),E=0;E<L;E+=1)for(var q=0;q<M;q+=1)A.setPixel(q,E,$(q,E));var k=h();A.write(k);for(var w=v(),B=k.toByteArray(),R=0;R<B.length;R+=1)w.writeByte(B[R]);return w.flush(),"data:image/gif;base64,"+w};return o})();(function(){n.stringToBytesFuncs["UTF-8"]=function(o){function i(r){for(var l=[],s=0;s<r.length;s++){var c=r.charCodeAt(s);c<128?l.push(c):c<2048?l.push(192|c>>6,128|c&63):c<55296||c>=57344?l.push(224|c>>12,128|c>>6&63,128|c&63):(s++,c=65536+((c&1023)<<10|r.charCodeAt(s)&1023),l.push(240|c>>18,128|c>>12&63,128|c>>6&63,128|c&63))}return l}return i(o)}})(),(function(o){e.exports=o()})(function(){return n})})(ha)),ha.exports}var vc=bc();const wc=gc(vc),xc="#fff",yc="#000";function $c(e){const t=wc(0,"M");t.addData(e),t.make();const n=t.getModuleCount(),o=4,i=n+o*2;let r="";for(let l=0;l<n;l++)for(let s=0;s<n;s++)t.isDark(l,s)&&(r+=`M${s+o} ${l+o}h1v1h-1z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${i}" shape-rendering="crispEdges" role="img" aria-label="Pairing code as a QR code"><rect width="${i}" height="${i}" fill="${xc}"/><path d="${r}" fill="${yc}"/></svg>`}const Yo="aria-motion-via",Go="aria-remote-code",kc=2e3,Ec=1e3,ma=10,Ac=1.5,Mc=3,Sc=1/60,sr=["N","NE","E","SE","S","SW","W","NW"];function Cc(e){const t=Math.round((e%1+1)%1*360)%360;return`${sr[Math.round(t/45)%8]} ${t}°`}function Wo(e){const t=Math.round(e*100)/100;return Math.abs(t)<.005?"0.00":`${t>0?"+":"−"}${Math.abs(t).toFixed(2)}`}function Tc(e){const t=Math.max(0,e/1e3);if(t<60)return"just now";if(t<5400)return`${Math.round(t/60)} min ago`;if(t<129600)return`${Math.round(t/3600)} h ago`;const n=Math.round(t/86400);return`${n} day${n===1?"":"s"} ago`}function Lc(e){const t=_r(e.win),n=Ur(e.win),o=new Vr(e.settings()),i=Yr(e.win);let r=null,l=0,s=!1,c=t==="none",d=!1,u=o.values(),p=0,m=0,f=Number.NEGATIVE_INFINITY;const b=[];let y=null,h="",v=0;const x=(()=>{try{return e.win.sessionStorage}catch{return null}})();let g=x?.getItem(Yo)==="remote"?"remote":"device",P=null,M="idle",L="",$=null,A="",E=!0,q=!1,k=0,w=[];const B=new Gr;let R=0,I=0;const V=()=>e.win.performance.now(),G=()=>k>0&&V()-k<kc;function K(){return g==="remote"?!P||M!=="paired"||!k?"off":E&&!q&&G()?"live":"paused":c?"none":s?"blocked":r?d?"paused":"live":d&&e.settings().on?"paused":"off"}let ee=K();function Q(){const C=K();i.set(g==="device"&&C==="live"),C!==ee&&(ee=C,e.onState()),Se()}function he(C){const j=o.step(C);u=j.values;const X=m?Math.max(0,C.t-m):0;for(m=C.t,p=Math.max(u.shake,p*Math.exp(-X/Ac)),j.shake!==null&&(b.push({t:C.t,s:j.shake}),e.held()||e.send(dl(e.sourceId(),e.ctxNow(),j.shake)));b.length&&b[0].t<C.t-ma;)b.shift();if(y&&o.angle)if(y.step(o.angle,C.t),y.centre){const W=y.centre;y=null,e.save({...e.settings(),centre:W,centredAt:Date.now()}),o.set(e.settings()),h=""}else y.gaveUp&&(y=null,h="It kept moving. Rest your hands and try again.");!e.held()&&C.t-f>=Sc-1e-4&&(f=C.t,e.send(sl(e.sourceId(),[{at:e.ctxNow(),...u}]))),Or()}function de(){r||(s=!1,r=Zr(e.win,he),l=e.win.performance.now(),e.win.clearTimeout(v),v=e.win.setTimeout(()=>{!r||r.gotData||d||(ce(),t==="open"?s=!0:c=!0,Q())},Mc*1e3),Q())}function ce(){r?.stop(),r=null,y=null,e.win.clearTimeout(v)}let we=!1;function Et(){const C=ro(e.win);we=!0,e.save({...e.settings(),on:!0}),C.then(j=>{we=!1,j==="granted"?de():(s=j==="denied",Q())})}function Ae(){ce(),s=!1,e.save({...e.settings(),on:!1}),o.reset(),u=o.values(),p=0,b.length=0,Q()}function ot(){if(g!=="remote"&&!(!e.settings().on||r||c||d||we)){if(t==="open"){de();return}ro(e.win).then(C=>{C==="granted"&&e.settings().on?de():C==="denied"&&(s=!0,Q())})}}function F(){if(o.set(e.settings()),g==="remote"){Se();return}!e.settings().on&&r?Ae():e.settings().on&&!r&&ot(),Se()}function D(){return e.sceneName?.().trim()||"NetComposer Studio"}function S(C){if(C.k==="m"){const j=nl(C);if(!j)return;const X=V();for(B.reading(j.t*1e3,X),w.push(X);w.length&&w[0]<X-1e3;)w.shift();const W=G()&&k>0;if(k=X,q||!E)return;he(j),W||Q()}else if(C.k==="pong")typeof C.t0=="number"&&typeof C.tp=="number"&&B.pong(C.t0,C.tp,V());else if(C.k==="vis"){const j=C.v==="visible";j!==E&&(E=j,j&&o.reset(),Q())}else C.k==="hold"?(q=C.on===!0,Q()):C.k==="hi"&&(typeof C.name=="string"&&(A=C.name),Se())}function N(){const C=Qr();try{x?.setItem(Go,C)}catch{}return C}function z(C=!1){H(!1);const j=x?.getItem(Go);$=!C&&j&&/^[A-Z2-9]{4}$/.test(j)?j:N(),M="connecting",L="",A="",E=!0,q=!1,k=0,w=[],B.reset(),o.reset(),u=o.values();const X=$;P=Wr({win:e.win,relay:Kr(e.win),code:X,role:"studio",token:Xr(e.win,"aria-remote-token"),name:D,onMessage:S,onState:(Z,le)=>{if(Z==="refused"&&le.why==="taken"){z(!0);return}M=Z,L=le.text??"",Z==="paired"?le.peer&&(A=le.peer):(A=Z==="waiting"?"":A,k=0,E=!0,q=!1,B.reset(),o.reset(),u=o.values()),Q()}}),e.win.clearInterval(R),R=e.win.setInterval(()=>{!P||M!=="paired"||P.send({k:"ping",t0:V(),d:B.ms,j:B.jitter,n:D()})},Ec),e.win.clearInterval(I);let W=!1;I=e.win.setInterval(()=>{const Z=K()==="live";Z!==W?(W=Z,Q()):Se()},500),Q()}function H(C){e.win.clearInterval(R),e.win.clearInterval(I),P&&(C?P.end():P.stop()),P=null,M=C?"ended":"idle",k=0,o.reset(),u=o.values()}function _(C){if(C!==g){g=C;try{x?.setItem(Yo,g)}catch{}g==="remote"?(ce(),d=!1,z()):(H(!1),M="idle",o.reset(),u=o.values(),ot()),Q()}}function O(){H(!0),Q()}e.win.document.addEventListener("visibilitychange",()=>{if(e.win.document.visibilityState==="hidden"){if(!r)return;ce(),d=!0}else{if(!d)return;d=!1,o.reset(),de();return}Q()});const J=T("div",{class:"aria-status",role:"status","data-aria":"motion-status",...e.help("motion:status")}),ae=T("span",{class:"aria-small aria-sub aria-mono","data-aria":"motion-to"}),U=T("div",{class:"aria-row-between aria-motion-head"},J,ae),oe=C=>T("span",{class:"aria-mo-val","data-aria":`motion-${C}`},"—"),ie=(C,j,X,W,...Z)=>T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},T("span",{},T("span",{class:"nc-label",...e.help(`motion:${X}`)},C),j?T("span",{class:"aria-small aria-sub aria-mono aria-mo-sub"},j):null),W),...Z),Ue=(...C)=>T("div",{class:"aria-row-between aria-small aria-sub aria-mono aria-ends"},...C.map(j=>typeof j=="string"?T("span",{},j):j)),it=C=>{const j=T("i",{}),X=T("div",{class:"aria-meter aria-mo-meter","data-bi":"",role:"meter","aria-label":C,"aria-valuemin":"-1","aria-valuemax":"1"},j);return{el:X,set(W){const Z=50+Math.min(0,W)*50,le=50+Math.max(0,W)*50;j.style.left=`${Z}%`,j.style.width=`${le-Z}%`,X.setAttribute("aria-valuenow",W.toFixed(2))}}},rt=it("Tilt X"),Ve=it("Tilt Y"),qe=oe("tilt-x"),An=oe("tilt-y"),Mn=T("i",{}),Sn=T("b",{}),Cn=T("div",{class:"aria-meter aria-mo-meter",role:"meter","aria-label":"Shake","aria-valuemin":"0","aria-valuemax":"1"},Sn,Mn),Tn=oe("shake"),Ln=T("span",{"data-aria":"motion-shakes"},"no shakes"),Wt=T("canvas",{class:"aria-mo-strip","data-aria":"motion-strip"}),Xt=T("canvas",{class:"aria-mo-tape","data-aria":"motion-tape"}),Fn=oe("heading"),Dn=T("div",{class:"aria-body aria-mo-live","data-aria":"motion-live"},ie("Tilt X",null,"tilt-x",qe,rt.el,Ue("left","0","right")),ie("Tilt Y",null,"tilt-y",An,Ve.el,Ue("back","0","forward")),ie("Shake",null,"shake",Tn,Cn,Wt,Ue("−10 s",Ln,"now")),ie("Heading","slow","heading",Fn,Xt)),Kt=(C,j,X)=>{const W=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":j,...e.help(`motion:${j}`)},C);return W.addEventListener("click",X),W},Qt=C=>T("p",{class:"aria-mo-text"},C),xe=(C,j)=>T("p",{class:"aria-small aria-sub aria-mono",...j?{"data-aria":j}:{}},C),Nn=C=>T("div",{class:"aria-field"},T("span",{class:"nc-label"},C),T("div",{class:"aria-mo-names"},...["Tilt X","Tilt Y","Shake","Heading"].map(j=>T("span",{},T("span",{},j),T("span",{class:"aria-mono"},"—"))))),zn=T("div",{class:"aria-body","data-aria":"motion-allow"},Qt("Tilt and shake this phone to move sounds in the Studio."),Kt("Allow motion","allow-motion",Et),xe("Your phone asks once. Nothing leaves this phone."),Nn("Signals it gives")),qn=T("ol",{class:"aria-mo-steps","data-aria":"motion-steps"}),Rn=T("div",{class:"aria-body","data-aria":"motion-blocked"},Qt("Motion is blocked for this site, so ARIA can't read the phone."),T("div",{class:"aria-field"},T("span",{class:"nc-label"},"To allow it"),qn),Kt("Try again","allow-motion",Et),xe(n?"Safari remembers No until it is closed. Your Studio and saves stay as they are.":"Your Studio and saves stay as they are.")),Rr=n?["Close Safari fully: swipe up from the bottom edge, pause, then swipe Safari away.",`Open ${e.studioUrl} again.`,"Tap Allow motion, then Allow."]:["Open this site's settings in your browser (the icon left of the address).","Set Motion sensors to Allow.","Come back and tap Try again."];qn.append(...Rr.map(C=>T("li",{},C)));const Bn=T("div",{class:"aria-body","data-aria":"motion-none"},Qt("Open the Studio on your phone to use its motion."),xe(`This computer has no motion sensor. On your phone: ${e.studioUrl}`),xe("Or pair a phone with this Studio: choose A phone with this Studio above."),Nn("Signals it gives")),Pn=xe("Paused while this page is hidden. It resumes when the page is back.","motion-paused"),Zt=T("div",{class:"aria-qr","data-aria":"remote-qr","aria-hidden":"true"}),In=T("span",{class:"aria-code","data-aria":"remote-code"},""),Hn=T("p",{class:"aria-small aria-sub aria-mono","data-aria":"remote-status"}),Br=T("div",{class:"aria-pair-text"},T("p",{class:"aria-mo-text"},"Scan with your iPhone camera."),T("p",{class:"aria-small aria-sub aria-mono"},"Or open ",T("b",{},"netcomposer.art/remote")," and type"),In),jn=T("div",{class:"aria-body","data-aria":"remote-pair"},T("div",{class:"aria-pair"},Zt,Br),Hn,xe("Only the phone's motion passes through. Nothing is stored. A Scene never keeps a pairing.")),On=xe("","remote-note"),_n=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":"remote-end",...e.help("remote:end")},"End pairing");_n.addEventListener("click",O);const Un=T("div",{class:"aria-field"},On,_n),Vn=xe("Pairing ended.","remote-ended-text"),Yn=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":"remote-again"},"Pair a phone again");Yn.addEventListener("click",()=>{z(!0)});const Gn=T("div",{class:"aria-body","data-aria":"remote-ended"},Vn,Yn);let Wn="";function Pr(){if(!$)return;const C=el(e.win.location.origin,$);Wn!==C&&(Wn=C,Zt.innerHTML=$c(C),Zt.dataset.link=C),In.textContent=tl($),Hn.replaceChildren(T("i",{class:`aria-dot-inline${M==="offline"?" aria-off":""}`}),M==="connecting"?"Opening a pairing code…":M==="offline"?"Can't reach the pairing relay. Trying again…":M==="refused"?L||"The relay refused this code.":"Waiting for a phone…")}const lt=T("div",{class:"aria-body","data-aria-module":"phone"},U,jn,Dn,Pn,Un,Gn,zn,Rn,Bn),Jt=Kt("Hold still to centre","centre",()=>{r&&(y=new al,h="",Se())}),Xn=xe("","motion-centre"),Kn=C=>{const j=Ka({checked:e.settings()[`invert${C}`],label:`Invert Tilt ${C}`,onChange:W=>e.save({...e.settings(),[`invert${C}`]:W})});return j.el.dataset.aria=`motion-invert-${C.toLowerCase()}`,{row:T("div",{class:"aria-mo-row",...e.help("motion:invert")},T("span",{class:"nc-label"},`Invert Tilt ${C}`),j.el),sw:j}},Qn=Kn("X"),Zn=Kn("Y"),Jn=T("button",{type:"button",class:"nc-page-action aria-mo-off","data-aria-action":"motion-off",...e.help("motion:off")},"Turn motion off");Jn.addEventListener("click",Ae);const Ir=T("div",{class:"aria-body aria-mo-more"},T("div",{class:"aria-field"},Jt,Xn),Qn.row,Zn.row,Jn),eo=xe(i.supported?"Screen stays on while motion is live.":"This browser can't keep the screen on: it may sleep while you play.","motion-foot");function Hr(C){const j={off:"OFF",blocked:"BLOCKED",live:"LIVE",paused:"PAUSED",none:"NO SENSOR"}[C],W=[T("span",{class:`aria-word ${C==="live"?"aria-live":C==="paused"?"aria-quiet":"aria-off"}`,"data-state":C},T("i",{class:"aria-dot"}),j)];g==="remote"&&M==="paired"?W.push(T("b",{"data-aria":"remote-phone"},A||"Phone"),T("span",{class:"aria-sub","data-aria":"remote-delay"},`delay ${Jr(B.ms,B.jitter)}`)):C==="live"&&W.push(T("span",{class:"aria-sub","data-aria":"motion-rate"},`${r?.rate()??0} readings/s`)),J.replaceChildren(...W);const Z=e.listeners();ae.textContent=C!=="live"&&C!=="paused"?"":Z===null?"standalone":Z.length?`to ${Z.join(", ")}`:"no listeners yet"}function Se(){const C=K();lt.dataset.motionState=C,lt.dataset.via=g,lt.dataset.link=g==="remote"?M:"",Hr(C);const j=g==="remote",X=j&&M==="paired";Dn.hidden=j?!X||!k:C!=="live"&&C!=="paused",Pn.hidden=j||C!=="paused",zn.hidden=j||C!=="off",Rn.hidden=j||C!=="blocked",Bn.hidden=j||C!=="none",eo.hidden=j||C!=="live"&&C!=="paused",U.hidden=j&&!X,jn.hidden=!j||X||M==="ended"||M==="idle",Gn.hidden=!j||M!=="ended"&&M!=="idle",Un.hidden=!X,j&&(Pr(),Vn.textContent=L||"Pairing ended.",On.textContent=X?k?q?"Held on the phone: motion stays where it is.":E?C==="paused"?"Paused: nothing from the phone for a moment.":`${w.length} readings/s from the phone.`:"Paused: the phone's screen is off or the Remote page is hidden.":"Paired. Allow motion on the phone to start.":""),to();const W=e.settings();Qn.sw.set(W.invertX),Zn.sw.set(W.invertY);const Z=y?Math.max(1,Math.ceil(y.remaining(m))):0;Jt.textContent=y?`Hold still… ${Z}`:"Hold still to centre",Jt.toggleAttribute("data-holding",!!y),Xn.textContent=y?`Keep it still. Centring in ${Z} s.`:h||(W.centredAt?`Centred ${Tc(Date.now()-W.centredAt)}, at the angle you held then.`:"Not centred yet: 0 is a phone held at a reading angle.")}function to(){rt.set(u.tiltX),Ve.set(u.tiltY),qe.textContent=Wo(u.tiltX),An.textContent=Wo(u.tiltY),Tn.textContent=u.shake.toFixed(2),Mn.style.width=`${Math.round(u.shake*1e3)/10}%`,Sn.style.width=`${Math.round(p*1e3)/10}%`,Cn.setAttribute("aria-valuenow",u.shake.toFixed(2)),Fn.textContent=m?Cc(u.heading):"—";const C=b.length;Ln.textContent=C?`${C} shake${C===1?"":"s"}`:"no shakes";const j=J.querySelector('[data-aria="motion-rate"]');j&&(j.textContent=`${r?.rate()??0} readings/s`),jr()}const st=C=>getComputedStyle(lt).getPropertyValue(C).trim();function ao(C){if(e.win.document.visibilityState==="hidden")return null;const j=C.getBoundingClientRect();if(!j.width||!j.height)return null;const X=e.win.devicePixelRatio||1,W=Math.round(j.width*X),Z=Math.round(j.height*X);(C.width!==W||C.height!==Z)&&(C.width=W,C.height=Z);const le=C.getContext("2d");return le?.clearRect(0,0,W,Z),le}function jr(){const C=e.win.devicePixelRatio||1,j=ao(Wt);if(j){const{width:W,height:Z}=Wt;j.fillStyle=st("--nc-ui-divider"),j.fillRect(0,Math.round(Z/2),W,Math.max(1,Math.round(C/2))),j.fillStyle=st("--aria-magma");for(const le of b){const ea=Math.max(0,m-le.t),ta=(1-ea/ma)*W,Re=Math.max(4*C,le.s*(Z-6*C));j.globalAlpha=.35+.65*(1-ea/ma),j.fillRect(Math.round(ta-C),Math.round((Z-Re)/2),Math.round(2*C),Math.round(Re))}j.globalAlpha=1}const X=ao(Xt);if(X&&m){const{width:W,height:Z}=Xt,le=u.heading*360,ta=W/180;X.fillStyle=st("--nc-ui-text-sub"),X.font=`${10*C}px ${st("--nc-ui-font-readout")||"monospace"}`,X.textAlign="center",X.textBaseline="top";for(let Re=Math.floor((le-90)/15)*15;Re<=le+90;Re+=15){const Ge=W/2+(Re-le)*ta;if(Ge<0||Ge>W)continue;const no=(Re%360+360)%360,oo=no%45===0,io=(oo?12:6)*C;X.fillRect(Math.round(Ge),Z-io,Math.max(1,Math.round(C)),io),oo&&Ge>14*C&&Ge<W-14*C&&X.fillText(sr[no/45],Ge,3*C)}X.fillStyle=st("--aria-magma"),X.fillRect(Math.round(W/2-C),18*C,Math.round(2*C),Z-18*C)}}let Ye=0;function Or(){Ye||(Ye=e.win.requestAnimationFrame(()=>{Ye=0,Se()}),e.win.setTimeout(()=>{Ye&&(e.win.cancelAnimationFrame(Ye),Ye=0,to())},250))}return{state:K,via:()=>g,setVia:_,start(){g==="remote"&&!P&&z()},body:lt,more:Ir,foot:eo,paint:Se,settingsChanged:F,resume:ot,debug:()=>({state:K(),values:u,support:t,shakes:b.length,listenStart:l,wake:i.held,via:g,link:M,code:$,phone:A,delay:B.ms,jitter:B.jitter,remoteRate:w.length})}}function dr(e){const t=e.trim().toUpperCase().split(/[\s.]+/).filter(Boolean),[n,o,i="00",r="BHZ"]=t;if(!n||!o||t.length>4)return null;const l=(s,c)=>c.test(s);return!l(n,/^[A-Z0-9]{1,2}$/)||!l(o,/^[A-Z0-9]{1,5}$/)||!l(i,/^([A-Z0-9]{0,2}|--)$/)||!l(r,/^[A-Z0-9]{3}$/)?null:{net:n,sta:o,loc:i,cha:r}}const Yt=[{id:"anmo",net:"IU",sta:"ANMO",loc:"00",cha:"BHZ",name:"Albuquerque, New Mexico"},{id:"hrv",net:"IU",sta:"HRV",loc:"00",cha:"BHZ",name:"Harvard, Massachusetts"},{id:"poha",net:"IU",sta:"POHA",loc:"00",cha:"BHZ",name:"Between Mauna Loa and Mauna Kea",note:"volcanic",fallback:{net:"IU",sta:"RAO",loc:"00",cha:"BHZ",name:"Raoul Island, an active volcano"}},{id:"axial",net:"OO",sta:"AXCC1",loc:"",cha:"HHZ",name:"Axial Seamount, sea floor",note:"1.5 km down",fallback:{net:"IU",sta:"PTCN",loc:"00",cha:"BHZ",name:"Pitcairn Island, Pacific"}},{id:"qspa",net:"IU",sta:"QSPA",loc:"00",cha:"BHZ",name:"South Pole",note:"the quietest site",fallback:{net:"IU",sta:"CASY",loc:"00",cha:"BHZ",name:"Casey, Antarctica"}},{id:"tato",net:"IU",sta:"TATO",loc:"00",cha:"BHZ",name:"Taipei, Taiwan",note:"a busy city",fallback:{net:"IU",sta:"MAJO",loc:"00",cha:"BHZ",name:"Matsushiro, Japan"}}],Fc="anmo",pn={file:"anmo-2010-02-27.mseed",name:"Recorded: Albuquerque, 27 Feb 2010"},Dc={IU:{name:"Global Seismograph Network (IU)",operator:"Albuquerque Seismological Laboratory / USGS",doi:"10.7914/SN/IU"},OO:{name:"Ocean Observatories Initiative (OO)",operator:"OOI",doi:"10.7914/SN/OO"}};function hn(e){const t=Dc[e],n="real time via EarthScope Consortium (NSF SAGE)";return t?`Data: ${t.name}, ${t.operator}, doi:${t.doi} · ${n}`:`Data: network ${e} (see fdsn.org/networks/detail/${e}) · ${n}`}const Nc="The facilities of EarthScope Consortium were used for access to waveforms, related metadata, and/or derived products. These services are funded through the National Science Foundation's Seismological Facility for the Advancement of Geoscience (SAGE) Award under Cooperative Agreement EAR-1724509.",cr="netcomposer.aria",ur=1,mt={station:Fc,custom:"IU ANMO 00 BHZ",smoothing:5,hold:!1,motion:{...Zo(null),on:!1,centredAt:null}},pr=.5,hr=30;function mr(e){const t=e&&typeof e=="object"?e:{},n=typeof t.station=="string"&&(t.station==="custom"||t.station==="recording"||Yt.some(r=>r.id===t.station))?t.station:mt.station,o=typeof t.custom=="string"&&t.custom.length<=40?t.custom:mt.custom,i=typeof t.smoothing=="number"&&Number.isFinite(t.smoothing)?t.smoothing:mt.smoothing;return{station:n,custom:o,smoothing:Math.min(hr,Math.max(pr,i)),hold:t.hold===!0,motion:zc(t.motion)}}function fr(e){return{format:cr,version:ur,settings:{...e}}}function gr(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==cr||typeof t.version!="number"||t.version>ur?null:mr(t.settings)}function zc(e){const t=e&&typeof e=="object"?e:{},n=t.centredAt;return{...Zo(e),on:t.on===!0,centredAt:typeof n=="number"&&Number.isFinite(n)&&n>0?n:null}}function br(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let We;function qc(e,t=br()){if(We!==void 0)return We;We=null;try{if(typeof window>"u"||window.parent===window)return We;const n=window.parent.ncStudio;n&&n.version===1&&(We=n.attach(e,{instance:t}))}catch{}return We}function Rc(e){return new Worker("/aria/assets/worker-q9eWHHNw.js",{type:"module",name:e?.name})}const Gt=br(),mn=String(Gt).padStart(2,"0"),Ne=qc("aria",Gt),Xo="netcomposer.aria.v1",fn=Ne?.storageKey?.(Xo)??Xo,vr=`${fn}.hidden`,Bc="(max-width: 768px)";function gn(){try{return window.localStorage}catch{return null}}function Pc(){try{const e=gn()?.getItem(fn);return e?mr(JSON.parse(e)):{...mt}}catch{return{...mt}}}let Y=Pc();function Ic(){try{gn()?.setItem(fn,JSON.stringify(Y))}catch{}}function Hc(){try{const e=new URLSearchParams(location.search).get("sl");if(e&&/^wss?:\/\//.test(e))return e;const t=gn()?.getItem("netcomposer.aria.sl");if(t&&/^wss?:\/\//.test(t))return t}catch{}return"wss://rtserve.earthscope.org/seedlink"}const fa=new URL(`/aria/${pn.file}`,location.href).href,_e=e=>({[vt]:un(e)||void 0});function jc(e,t,n){const o=T("button",{type:"button",...t},e);return o.addEventListener("click",n),o}const Ot=(e,t,n)=>T(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?_e(t):{}},e),ga=e=>e===null?"":e<90?`${Math.round(e)} s`:e<5400?`${Math.round(e/60)} min`:`${(e/3600).toFixed(1)} h`,wr=new Rc,Ee=e=>wr.postMessage(e);let ue={state:"off",station:null,newestAgeSec:null,behindSec:null,recorded:!1,note:""},$e=null;const Ze=[];let ge=null,ut=null,Ha=!1;function ja(){Ha||(Ha=!0,xr())}function xr(){if(!Ha)return;if(Y.station==="recording"){Ee({type:"recording",recordingUrl:fa});return}const t=Yt.find(n=>n.id===Y.station)??(()=>{const n=dr(Y.custom);return n?{...n,name:`${n.net}.${n.sta}`}:null})();if(!t){Ee({type:"recording",recordingUrl:fa});return}Ee({type:"start",station:{...t,name:t.name},url:Hc(),recordingUrl:fa})}const kt=Ne?.instance??`aria#${Gt}`,me=Ne?.situationSource?.(`ARIA ${Gt}`)??null,Oa=()=>Ne?.ctx?Ne.ctx.currentTime:performance.now()/1e3;function je(e){try{me?.send(e)}catch{}}function yr(){return me?.demand().speeds??[]}me?.onDemand(()=>{Ee({type:"speeds",speeds:yr()}),(me?.demand().receivers??0)>0&&ja(),Fr(),pe?.paint()});function bn(){const e=ue.station;return{v:1,kind:"status",source:me?.id??kt,state:ue.state,station:e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null,newestAgeSec:ue.newestAgeSec,behindSec:ue.behindSec,...ue.retryAt?{retryAt:ue.retryAt}:{},hold:Y.hold,credit:hn(e?.net??"IU"),...ue.recorded?{recorded:!0}:{},motion:pe.state()}}let Ko=0;wr.onmessage=e=>{const t=e.data,n=me?.id??kt;if(t.type==="tables"){for(const o of t.tables)o.speed===1&&(ut=o.samples),Y.hold||je(ll(n,{seq:o.seq,at:Oa(),speed:o.speed,station:Oc(),behindSec:o.behindSec,samples:o.samples,rms:o.rms}));zr()}else if(t.type==="energy"){$e=t.value;const o=performance.now();!Y.hold&&o-Ko>=100&&(Ko=o,je(rl(n,[{at:Oa()+.1,value:t.value}])))}else t.type==="overview"?(ge=t,$e!==null&&(Ze.push($e),Ze.length>600&&Ze.shift()),Nr(),qr()):t.type==="status"&&(ue=t,je(bn()),Lr())};function Oc(){const e=ue.station;return e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null}const nt=document.getElementById("app");nt.classList.add("nc","nc-page");ec();function ze(e,t){const n=e.hold!==Y.hold;Y=e,Ic(),Ee({type:"smoothing",sec:Y.smoothing}),Ee({type:"hold",on:Y.hold}),n&&je(Y.hold?Jo(me?.id??kt,"hold"):bn()),t&&xr(),pe.settingsChanged(),Dr()}function _c(){const e=new Blob([JSON.stringify(fr(Y),null,2)],{type:"application/json"}),t=T("a",{href:URL.createObjectURL(e),download:`aria-${mn}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const Je=T("input",{type:"file",accept:".json,application/json"});Je.hidden=!0;Je.addEventListener("change",async()=>{const e=Je.files?.[0];if(Je.value="",!(!e||e.size>64*1024))try{const t=gr(JSON.parse(await e.text()));t&&ze(t,!0)}catch{}});const _a=(e,t,n)=>jc(e,{class:"nc-page-action","data-aria-action":n,..._e(`page:${n}`)},t),Ua=_a("Hold",()=>ze({...Y,hold:!Y.hold},!1),"hold"),Qo=ic({panel:T("div",{},_a("Save",_c,"save"),_a("Load",()=>Je.click(),"load"))}),Uc=T("header",{class:"nc-page-hd"},T("div",{},T("h1",{class:"nc-page-title"},T("span",{class:"aria-brand"},"ARIA")," ",T("span",{class:"nc-page-sep"},"/")," SITUATION ",T("span",{class:"nc-page-sep"},"/")," ",T("span",{class:"nc-mono"},mn)),T("p",{class:"nc-page-sub"},"A NetComposer element.")),T("div",{class:"nc-page-actions"},Ua,Qo.panel,Qo.button,Je)),$r=T("div",{class:"nc-stack aria-stack","data-nc-layout":"adjacent"}),kr=T("span",{class:"aria-credit","data-aria":"credit",title:Nc},hn("IU")),Vc=T("footer",{class:"aria-foot"},kr,T("span",{},`netcomposer.situation.${mn}`));nt.append(Uc,T("main",{class:"nc-page-body"},$r),Vc);function vn(e,t,n,o=()=>[],i={},r,l=()=>[]){const s=r??T("div",{class:"aria-body","data-aria-module":e}),c={[`${e}-mount`]:s,...i},d=()=>({id:e,title:t,summary:n(),controls:[...l(),{type:"label",id:`${e}-mount`,text:""},...o()]}),u=hc(d(),vr),p=()=>{for(const[m,f]of Object.entries(c)){const b=u.el.querySelector(`[data-nc-id="${m}"]`);b&&b.nextSibling!==f&&b.after(f)}};return p(),{handle:u,mount:s,update(){u.update(d()),p()}}}const Yc=()=>Y.station==="recording"?pn.name:Yt.find(e=>e.id===Y.station)?.name??Y.custom.toUpperCase(),wn=window.matchMedia(Bc).matches;wn&&rc(["station","signals"],vr);const xn=vn("station","Station",()=>ue.state==="live"?`${ue.station?.sta??Yc()} · live`:ue.recorded?"recorded":ue.state),yn=vn("signals","Signals",()=>$e===null?"Energy —":`Energy ${$e.toFixed(2)}`),at=T("select",{class:"nc-select",id:"aria-station","data-aria-id":"station"});for(const e of Yt)at.append(T("option",{value:e.id},e.note?`${e.name} · ${e.note}`:e.name));at.append(T("option",{value:"custom"},"Other station…"),T("option",{value:"recording"},pn.name));at.addEventListener("change",()=>ze({...Y,station:at.value},!0));const ft=T("input",{class:"nc-field-input aria-custom",id:"aria-custom",type:"text",spellcheck:"false",autocomplete:"off",placeholder:"NET STA LOC CHA","data-aria-id":"custom",..._e("custom")});ft.addEventListener("change",()=>{dr(ft.value)&&ze({...Y,custom:ft.value.trim().toUpperCase()},!0)});const Er=T("span",{class:"nc-mono aria-small aria-sub","data-aria":"code"}),Ar=T("div",{class:"aria-status",role:"status","data-aria":"status",..._e("status")}),Va=T("p",{class:"aria-small aria-sub aria-mono","data-aria":"note"}),Ya=T("canvas",{class:"aria-wave","data-aria":"wave",..._e("wave")});xn.mount.append(T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Station","station","aria-station"),Er),at),T("div",{class:"aria-field","data-aria":"custom-row"},Ot("Network station location channel","custom","aria-custom"),ft),Ar,Va,T("div",{class:"aria-field"},Ya,T("div",{class:"aria-row-between aria-small aria-sub aria-mono aria-ends"},T("span",{},"−10 min"),T("span",{},"the line is where ARIA plays · the shaded slice is the table"),T("span",{},"now"))));const Ga=T("canvas",{class:"aria-cycle","data-aria":"table",..._e("table")}),Mr=T("span",{class:"aria-small aria-sub aria-mono","data-aria":"to"}),Sr=T("span",{class:"aria-energy-val","data-aria":"energy"},"—"),Cr=T("i",{}),Tr=T("div",{class:"aria-meter",role:"meter","aria-label":"Energy","aria-valuemin":"0","aria-valuemax":"1","data-aria":"meter"},Cr),Wa=T("canvas",{class:"aria-history","data-aria":"history"}),$n=Qd({id:"aria-smoothing",label:"Smoothing",min:pr,max:hr,step:.1,value:Y.smoothing,taper:"time",format:e=>`${e.toFixed(1)} s`,onInput:e=>ze({...Y,smoothing:Math.round(e*10)/10},!1)});$n.el.setAttribute(vt,un("smoothing"));yn.mount.append(T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Ground table","table"),Mr),Ga,T("div",{class:"aria-row-between aria-small aria-sub aria-mono"},T("span",{},"256 samples · mirrored"),T("span",{},"5 shapes a second"))),T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Energy","energy"),Sr),Tr,Wa,T("div",{class:"aria-row-between aria-small aria-sub aria-mono"},T("span",{},"−10 min"),T("span",{},"now"))),$n.el,T("p",{class:"aria-small aria-sub aria-mono"},"Runs whether the Studio is playing or stopped."));const Gc=()=>Y.motion,pe=Lc({win:window,settings:Gc,save:e=>ze({...Y,motion:e},!1),send:je,sourceId:()=>me?.id??kt,ctxNow:Oa,listeners:()=>me?me.demand().motionNames??[]:null,held:()=>Y.hold,onState:()=>{je(bn()),kn()},help:_e,studioUrl:"netcomposer.art/studio",sceneName:()=>{try{const e=window.parent!==window?window.parent.document.querySelector("input.scene-name"):null;return e&&"value"in e?String(e.value??""):""}catch{return""}}}),Wc={off:"off",blocked:"blocked",live:"live",paused:"paused",none:"no sensor"},wt=vn("phone","My phone",()=>Wc[pe.state()]??"",()=>[{type:"group",id:"aria-motion-more",title:"More",summary:Xc(),controls:[{type:"slider",id:"aria-motion-smooth",label:"Smooth",min:0,max:100,step:1,value:Math.round(Y.motion.smooth*100),valueText:`${Math.round(Y.motion.smooth*100)}%`,onChange:e=>ze({...Y,motion:{...Y.motion,smooth:e/100}},!1)},{type:"label",id:"phone-more-mount",text:""}]},{type:"label",id:"phone-foot-mount",text:""}],{"phone-more-mount":pe.more,"phone-foot-mount":pe.foot},pe.body,()=>[{type:"choice",id:"aria-motion-via",label:"Motion from",value:pe.via(),options:[{value:"device",label:"This device"},{value:"remote",label:"A phone with this Studio"}],onChange:e=>{pe.setVia(e==="remote"?"remote":"device"),kn()}}]);function Xc(){const e=Y.motion;return`Smooth ${Math.round(e.smooth*100)}% · ${e.centredAt?"centred":"not centred"} · ${e.invertX&&e.invertY?"invert X and Y":e.invertX?"invert X":e.invertY?"invert Y":"invert off"}`}wt.handle.el.querySelector('[data-nc-id="aria-motion-smooth"]')?.setAttribute(vt,un("motion:smooth"));mc($r,[xn.handle,yn.handle,wt.handle],"adjacent");wn&&(wt.handle.el.dataset.ncShade="1");function Lr(){const e=ue,t=e.recorded&&e.state!=="live"?"RECORDED":e.state.toUpperCase(),n=[T("span",{class:`aria-word aria-${e.state}`,"data-state":e.state},T("i",{class:"aria-dot"}),t)];e.station?.rate&&n.push(T("span",{class:"aria-sub"},`${e.station.rate} samples/s`)),e.newestAgeSec!==null&&n.push(T("span",{},`newest ${ga(e.newestAgeSec)} ago`)),e.behindSec!==null&&n.push(T("span",{"data-aria":"behind"},`playing ${ga(e.behindSec)} behind now`)),e.state==="offline"&&e.retryAt&&n.push(T("span",{class:"aria-sub"},`retry ${ga(Math.max(0,(e.retryAt-Date.now())/1e3))}`)),Ar.replaceChildren(...n),Va.textContent=e.note,Va.hidden=!e.note,Er.textContent=e.station?[e.station.net,e.station.sta,e.station.loc,e.station.cha].join("."):"",kr.textContent=hn(e.station?.net??"IU"),xn.update()}function Fr(){const e=me?.demand();Mr.textContent=e?.names.length?`to ${e.names.join(", ")}`:Ne?"no instrument listens yet":"standalone"}function Dr(){at.value=Y.station,ft.value=Y.custom,nt.querySelector('[data-aria="custom-row"]').hidden=Y.station!=="custom",Ua.setAttribute("aria-pressed",String(Y.hold)),Ua.classList.toggle("aria-held",Y.hold),$n.set(Y.smoothing),Lr(),Fr(),kn()}function kn(){wt.update();const e=wt.handle.el.querySelector('[data-nc-id="aria-motion-more"]'),t=pe.state();e&&(e.hidden=t!=="live"&&t!=="paused"),pe.paint()}const Le=e=>getComputedStyle(nt).getPropertyValue(e).trim();function En(e){if(document.visibilityState==="hidden")return null;const t=e.getBoundingClientRect();if(!t.width||!t.height)return null;const n=window.devicePixelRatio||1,o=Math.round(t.width*n),i=Math.round(t.height*n);(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);const r=e.getContext("2d");return r?.clearRect(0,0,o,i),r}function Nr(){const e=En(Ya);if(!e||!ge)return;const{width:t,height:n}=Ya,o=ge.min.length;e.fillStyle=Le("--nc-ui-divider");for(let i=1;i<5;i++)e.fillRect(Math.round(i*t/5),0,1,n);if(Number.isFinite(ge.playhead)){const i=ge.playhead*t;e.globalAlpha=.14,e.fillStyle=Le("--aria-magma"),e.fillRect(i-ge.window*t,0,Math.max(1,ge.window*t),n),e.globalAlpha=1}e.fillStyle=Le("--aria-magma");for(let i=0;i<o;i++){const r=Math.floor(i/o*t),l=n/2-ge.max[i]*(n/2-2),s=n/2-ge.min[i]*(n/2-2);e.fillRect(r,l,Math.max(1,Math.ceil(t/o)),Math.max(1,s-l))}Number.isFinite(ge.playhead)&&(e.fillStyle=Le("--nc-ui-accent"),e.fillRect(Math.round(ge.playhead*t)-1,0,2,n))}function zr(){const e=En(Ga);if(!e||!ut)return;const{width:t,height:n}=Ga;e.fillStyle=Le("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),e.strokeStyle=Le("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.beginPath();for(let o=0;o<ut.length;o+=4){const i=o/ut.length*t,r=n/2-ut[o]*(n/2-3);o?e.lineTo(i,r):e.moveTo(i,r)}e.stroke()}function qr(){Sr.textContent=$e===null?"—":$e.toFixed(2),Cr.style.width=`${Math.round(($e??0)*100)}%`,Tr.setAttribute("aria-valuenow",$e===null?"0":$e.toFixed(2)),yn.update();const e=En(Wa);if(!e)return;const{width:t,height:n}=Wa;e.fillStyle=Le("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),Ze.length&&(e.beginPath(),Ze.forEach((o,i)=>{const r=(600-Ze.length+i)/599*t,l=n-o*n;i?e.lineTo(r,l):e.moveTo(r,l)}),e.strokeStyle=Le("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.stroke())}window.addEventListener("resize",()=>{Nr(),zr(),qr()});Ne?.providePreset?.({format:"netcomposer.aria",version:1,get:()=>fr(Y),set:e=>{const t=gr(e);t&&ze(t,t.station!==Y.station||t.custom!==Y.custom)}});window.addEventListener("pagehide",()=>{je(Jo(me?.id??kt,"removed")),Ee({type:"stop"})});wn&&(nt.dataset.ariaPhone="");Ee({type:"smoothing",sec:Y.smoothing});Ee({type:"hold",on:Y.hold});Ee({type:"speeds",speeds:yr()});Dr();pe.resume();pe.start();window.__ARIA_MOTION__=pe.debug;if(!Ne||(me?.demand().receivers??0)>0)ja();else{const e=setInterval(()=>{document.visibilityState==="visible"&&nt.getBoundingClientRect().width>0&&(clearInterval(e),ja())},1e3)}
