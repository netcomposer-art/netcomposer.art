(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();const Ht=1,Uo=32;function Vo(e,t){return{v:Ht,kind:"energy",source:e,frames:t.slice(0,Uo)}}function Go(e,t){return{v:Ht,kind:"table",source:e,...t}}function en(e,t){return{v:Ht,kind:"off",source:e,reason:t}}var _o="nc-ui",Wo={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Ot={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ne={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Yo={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ee={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Ko={light:{color:Wo.color,semantic:Ot,component:Ne,runtime:Yo},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},fe=e=>`--${_o}-${e}`,pt=Ot["label-on-fill-dark"],ua=Ot["label-on-fill-light"],Xo=ee["label-min-contrast"],Qo=/^#[0-9a-f]{6}$/i,Zo=e=>typeof e=="string"&&Qo.test(e),Fe=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function ha(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=r=>{let l=(r+e/30)%12;return n-o*Math.max(-1,Math.min(l-3,9-l,1))};return`#${Fe(i(0)*255)}${Fe(i(8)*255)}${Fe(i(4)*255)}`}function tn(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),r=Math.min(t,n,o),l=(i+r)/2,s=i-r;if(!s)return{h:0,s:0,l};let c=s/(1-Math.abs(2*l-1));return{h:((i===t?60*((n-o)/s%6):i===n?60*((o-t)/s+2):60*((t-n)/s+4))+360)%360,s:c,l}}function ma(e){let[t,n,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function ut(e,t){let[n,o]=[ma(e),ma(t)].sort((i,r)=>r-i);return(n+.05)/(o+.05)}var Pe=e=>ut(e,pt)>=ut(e,ua)?pt:ua;function an(e,t,n,o=Xo){let i=ha(e,t,n),r=Pe(i)===pt?1:-1;for(let l=0;l<40&&ut(i,Pe(i))<o;l++)n+=r*.01,i=ha(e,t,n);return i}function Jo(e){let{h:t,s:n}=tn(e),o=an(t,Math.min(n,ee["surprise-on-max-saturation"]),ee["surprise-on-lightness"]);return{fill:e,ink:Pe(e),on:o,onInk:Pe(o)}}var ei=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function ti(e,t=Math.random){let[n,o]=ee["surprise-saturation"],[i,r]=ee["surprise-lightness"],l=ee["surprise-min-hue-gap"],s=Zo(e)?tn(e).h:null,c=t()*360;return s!==null&&ei(c,s)<l&&(c=(s+l+t()*(360-2*l))%360),an(c,n+t()*(o-n),i+t()*(r-i))}function ai(e){if(!e)return null;let t=Jo(e);return{[fe("surprise-fill")]:t.fill,[fe("surprise-ink")]:t.ink,[fe("surprise-on")]:t.on,[fe("surprise-on-ink")]:t.onInk}}var ni=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,oi=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function fa(e){let[t,n,o]=[1,3,5].map(s=>ni(parseInt(e.slice(s,s+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),l=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*l,1.9779984951*i-2.428592205*r+.4505937099*l,.0259040371*i+.7827717662*r-.808675766*l]}function ii([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(l=>Fe(oi(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}var ri=ee["velocity-range"],nn={min:Ne.rhythm["velocity-min"],max:Ne.rhythm["velocity-max"]},ga=Object.fromEntries(Object.entries(Ko).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function li(e,t=nn){let[n,o]=ri,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,r=(i-n)/(o-n),l=t.ink??Ne.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:l};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:l};let s=fa(t.min),c=fa(t.max);return{velocity:i,t:r,fill:ii(s.map((d,p)=>d+(c[p]-d)*r)),ink:l}}function ba(e,t=nn){return{[fe("velocity-fill")]:li(e,t).fill}}var on="data-nc-theme",xa="nc-ui-theme-change",si="(prefers-color-scheme: dark)",rn=e=>e?.documentElement??null,ln=e=>e?.defaultView?.matchMedia?.(si)??null,di=e=>e==="light"||e==="dark"?e:"system";function ci(e=globalThis.document){return di(rn(e)?.getAttribute(on))}function ht(e=globalThis.document){let t=ci(e);return t!=="system"?t:ln(e)?.matches?"dark":"light"}function sn(e,t=globalThis.document){let n=rn(t);if(!n)return()=>{};let o=ht(t),i=()=>{let c=ht(t);c!==o&&(o=c,e(c))},r=t.defaultView?.MutationObserver,l=r?new r(i):null;l?.observe(n,{attributes:!0,attributeFilter:[on]});let s=ln(t);return s?.addEventListener?.("change",i),t.addEventListener(xa,i),()=>{l?.disconnect(),s?.removeEventListener?.("change",i),t.removeEventListener(xa,i)}}var pi={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ui={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},hi={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},mi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ge={};for(let[e,t]of Object.entries(ui))Ge[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(mi))Ge[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(hi))Ge[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(pi.renames.map(e=>[e.old,e.new]));function dn(e){let t=Ge[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function C(e){return dn(e).prop}function a(e){return`var(${C(e)})`}function fi(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(C(t)));return Number.isFinite(n)?n:0}function z(e,t){let n=dn(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let l=(o.defaultView??window).getComputedStyle(i),s=n.kind==="family"?l.fontFamily:n.kind==="color"?l.color:l.paddingLeft;return i.remove(),s}function cn(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function gi(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var bi="[data-modulated], [data-modulated] *";function Qe(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function wa(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function xi(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${C("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${C("divider")}: ${a(`module-div-stack-${o}`)};
      ${C("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${C("text-sub")}: ${a("module-sub-stack-1")};
      ${C("divider")}: ${a("module-div-stack-1")};
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
${bi} { transition: none; }
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
  ${C("text-sub")}: ${a("module-sub-stack-1")};
  ${C("divider")}: ${a("module-div-stack-1")};
  ${C("slider-track")}: ${a("module-div-stack-1")};
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
  ${C("text-sub")}: ${a("module-sub-stack-1")};
  ${C("divider")}: ${a("module-div-stack-1")};
  ${C("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${C("text-sub")}: ${a("module-sub-stack-1")};
  ${C("divider")}: ${a("module-div-stack-1")};
  ${C("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${C("text-sub")}: inherit;
  ${C("divider")}: inherit;
  ${C("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${C("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${C("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${C("divider")}: ${a("strip-divider")}; }
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
${wa("")}
}
@media (max-width: 1023px) {
${wa("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Qe("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Qe("")}
}
@media (max-width: 1023px) {
${Qe("html[data-nc-landscape] ")}
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
`}var Ze=null,wi="nc-ui-fallback";function pn(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Ze&&Ze.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${wi} {
${xi()}
}
`,e.head.append(t),Ze=t}var yi=new URL("/aria/assets/confirm-DwyQU4Nn.css",import.meta.url).href,vi=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=yi,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&vi(document);function un(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),n.append(o);let l=!1,s=d=>{l=d===!0,n.setAttribute("aria-checked",l?"true":"false")};s(e.checked);let c=()=>{s(!l),e.onChange?.(l)};return n.addEventListener("click",c),{el:n,get checked(){return l},set:s,destroy(){n.removeEventListener("click",c),n.remove()}}}var hn=new WeakMap,ya=.25;function $i(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let r=0,l=e.step??.005,s=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),p=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},u=h=>{let g=d(h);g!==r&&(r=g,p(),s?.(g))},f=0,m=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let g=n.getBoundingClientRect();h.target!==i&&g.height>0&&u(1-(h.clientY-g.top)/g.height),f=h.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!m)return;let g=n.getBoundingClientRect().height||1,w=(f-h.clientY)/g*(h.shiftKey?ya:1);f=h.clientY,u(r+w)});let b=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let g=h.shiftKey?l*ya:l,w={ArrowUp:r+g,ArrowRight:r+g,ArrowDown:r-g,ArrowLeft:r-g,PageUp:r+l*10,PageDown:r-l*10,Home:0,End:1};h.key in w&&(h.preventDefault(),u(w[h.key]))});let y={el:n,get value(){return r},get dragging(){return m},set(h){m||(r=d(Number(h)||0),p())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(l=h.step),h.onChange&&(s=h.onChange),h.onReset&&(c=h.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),hn.set(n,y),y}function ki(e){return hn.get(e)}var mn=new WeakMap,Ei=.2,Ai=1.5,Si=.5;function Mi(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function va(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Mi(o.getComputedStyle(e).getPropertyValue(C(t)),n)}function Li(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let l=[];for(let y=0;y<n;y++){let h=t.createElement("span");h.className="nc-meter-bar";let g=t.createElement("span");g.className="nc-meter-peak";let w=t.createElement("span");w.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",h.append(g,w,x),r.append(h),l.push({peak:g,rms:w,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let s=e.label,c=e.onClear,d=!1,p=-1,u=-1,f=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${s} clipped: clear`:`${s} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},m=(y,h,g,w)=>{let x=Math.round(w*1e3)/1e3;g[h]!==x&&(g[h]=x,y.style.transform=h==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};i.addEventListener("click",()=>{b.clear(),c?.()});let b={el:o,get clipped(){return d},update(y,h){p<0&&(p=va(o,"motion-meter-fall",Ei)),u<0&&(u=va(o,"motion-meter-hold",Ai));let g=Math.max(0,Math.min(.25,Number(h)||0)),w=p>0?Math.exp(-g/p):0;l.forEach((x,v)=>{let A=y[v]??y[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(A.peak)||0)),$=Math.min(E,Math.max(0,Number(A.rms)||0));A.over&&b.clip(),x.level.peak=E>=x.level.peak?E:E+(x.level.peak-E)*w,x.level.rms=$>=x.level.rms?$:$+(x.level.rms-$)*w,x.holdAge+=g,E>=x.holdAt?(x.holdAt=E,x.holdAge=0):x.holdAge>u&&(x.holdAt=Math.max(E,x.holdAt-Si*g)),m(x.peak,"peak",x.shown,x.level.peak),m(x.rms,"rms",x.shown,x.level.rms),m(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let y of l)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,m(y.peak,"peak",y.shown,0),m(y.rms,"rms",y.shown,0),m(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){s=y,f()},configure(y){y.onClear&&(c=y.onClear)}};return f(),b.reset(),mn.set(o,b),b}function Ci(e){return e?mn.get(e):void 0}var zi=3,Fi=new Set(["freq","q","rate","time","log"]);function Ut(e,t,n){return!e||!Fi.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ae(e,t,n){return Ut(e,t,n)!=="linear"}function Re(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),l=Ut(e,t,n);if(l==="log")return Math.log(r/t)/Math.log(n/t);let s=(r-t)/(n-t);return l==="power"?Math.cbrt(s):s}function fn(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=Ut(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**zi:i)}function gn(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function ke(e,t,n,o){return Math.round(Re(e,t,n,o)*1e3)}function Ie(e,t,n,o,i){return gn(fn(e,t,n,Number(o)/1e3),t,n,i)}function Ti(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Vt(e,t,n,o,i,r=!1,l){let s=ke(e,t,n,o),c=Ti(s,i,r);if(c===null)return null;let d=Ie(e,t,n,c,l),p=Math.sign(c-s),u=gn(Number(o),t,n,l);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=Ie(e,t,n,c,l);return d}function $a(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function qi(e,t,n,o=n/6){let i=e.some(p=>p===null),r=Math.max(0,n-(i?o:0)),l=e.reduce((p,u,f)=>u===null?p:p+$a(t[f]),0),s=l>0?r/l:0,c=e.map(p=>p===null?0:Math.min(r,$a(p)*s));if(i){let p=c.reduce((f,m)=>f+m,0),u=e.indexOf(null);c[u]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=n),d}function Di(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function G(e){return Math.max(0,Math.min(1,e))}function bn(e,t){let{ctx:n,w:o,h:i}=Di(e);if(!n)return;n.clearRect(0,0,o,i);let r=gi(e);if(t.paint==="swatch"){let c=z(e,"accent"),d=z(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Ri(n,o,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=z(e,cn(c)),p=z(e,"divider"),u=G(t.cutoff??.5),f=.08+(1-G(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=o;m++){let b=m/Math.max(1,o),y=0;c==="lp"?y=b<u?1:Math.max(0,1-(b-u)/f):c==="hp"?y=b>u?1:Math.max(0,1-(u-b)/f):y=Math.max(0,1-Math.abs(b-u)/f);let h=i*.78-y*i*.62;m===0?n.moveTo(m,h):n.lineTo(m,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=z(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=z(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,f]=qi([c,d],t.max??[1,4],o),m=2,b=i-1;n.beginPath(),n.moveTo(p,b),n.lineTo(u,m);let y=Math.max(1,Math.ceil(f-u));for(let h=1;h<=y;h++){let g=h/y;n.lineTo(u+(f-u)*g,b-(b-m)*Math.exp(-4.6*g)*(1-g*.01))}n.lineTo(f,b),n.lineTo(o,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=z(e,"accent"),f=z(e,"text-sub"),m=i/2;n.fillStyle=z(e,"accent-soft"),n.fillRect(G(d)*o,0,(G(p)-G(d))*o,i),n.strokeStyle=z(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(o,m),n.stroke();let b=Math.floor(c.length/2);for(let y=0;y<b;y++){let h=(y+.5)/b*o,g=Math.max(-1,Math.min(1,c[y*2]??0)),w=Math.max(-1,Math.min(1,c[y*2+1]??0)),x=(y+.5)/b;n.strokeStyle=x>=d&&x<=p?u:f,n.beginPath(),n.moveTo(h,m-w*(m-1)),n.lineTo(h,m-g*(m-1)+.5),n.stroke()}n.strokeStyle=u;for(let y of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(G(y)*(o-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=z(e,"text"),n.fillRect(Math.round(G(t.position)*(o-1)),0,1,i)),b||(n.fillStyle=f,n.font=r,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=G(t.level??0);n.fillStyle=z(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=z(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let l=Math.max(1,t.steps??16),s=((t.step??0)%l+l)%l;n.fillStyle=z(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=z(e,"rhythm.playhead"),n.fillRect(s/l*o,i*.3,Math.max(1,o/l),i*.4),e.dataset.ncAccent=z(e,"accent")}var xe=20,mt=2e4,Je=24,ka=-60;function Ni(e,t,n,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,l=Math.cos(r),s=Math.sin(r)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+l)/2,-(1+l),(1+l)/2]:e==="bp"?[c,d,p]=[s,0,-s]:[c,d,p]=[(1-l)/2,1-l,(1-l)/2];let u=1+s,f=-2*l,m=1-s,b=2*Math.PI*o/i,y=(x,v,A)=>x+v*Math.cos(b)+A*Math.cos(2*b),h=(x,v)=>-(x*Math.sin(b)+v*Math.sin(2*b)),g=Math.hypot(y(c,d,p),h(d,p)),w=Math.hypot(y(u,f,m),h(f,m));return w>0?g/w:0}function Pi(e,t){return Math.log(Math.max(xe,Math.min(mt,e))/xe)/Math.log(mt/xe)*t}function Ea(e,t,n){let o=Math.max(ka,Math.min(Je,e));return t+(Je-o)/(Je-ka)*(n-t)}function Ri(e,t,n,o,i,r){let l=o.mode??"lp",s=z(i,cn(l)),c=z(i,"divider"),d=z(i,"text-sub"),p=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,f=Math.max(u+4,n-p-3),m=o.q??Math.SQRT1_2,b=Math.round(Ea(0,u,f))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let h=xe*(mt/xe)**(y/Math.max(1,t)),g=o.open?1:Ni(l,o.hz,m,h,o.sampleRate),w=Ea(20*Math.log10(Math.max(1e-5,g)),u,f);y===0?e.moveTo(y,w):e.lineTo(y,w)}if(e.strokeStyle=s,e.stroke(),!o.open){let y=Math.round(Pi(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,u),e.lineTo(y,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=s,i.dataset.ncFilterHz=String(Math.round(o.hz))}function I(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function Ii(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var ae=20,Se=2e4,Gt=Math.log(Se/ae),ft=32,ji=250,Bi=-100,Hi=1200,Oi=4.5,Aa=-6,Z=-96,Ui=48,Sa=[100,1e3,1e4],Vi=[6,12];function ie(e,t){return Math.log(Math.max(ae,Math.min(Se,e))/ae)/Gt*t}function Te(e,t){return ae*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Gt)}function Y(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function gt(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var xn=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Gi(e,t,n,o){let i=n?3:1,r=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),l=c=>({hz:Math.max(e.minHz??ae,Math.min(e.maxHz??Se,e.hz*2**(c*i/6)))}),s=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?l(1):r(1);case"ArrowLeft":return e.moveHz?l(-1):r(-1);case"PageUp":return e.moveQ?s(1):null;case"PageDown":return e.moveQ?s(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function _t(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function _i(e,t,n,o,i,r,l,s,c){let d=c?.25:1,p={},u=Math.max(1,r/2-s);if(p.db=Math.max(-l,Math.min(l,t.db-o*d/u*l/_t(e))),e.moveHz){let f=t.hz*Math.exp(n*d/Math.max(1,i)*Gt);p.hz=Math.max(e.minHz??ae,Math.min(e.maxHz??Se,f))}return p}function Wi(e,t,n,o,i){let r=Math.max(0,n.left)+1,l=Math.min(n.right,i)-1,s=Math.min(t.width*3+o*2,l-r),c=Math.max(r,Math.min(e.left,l-s));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(s)}}var F=new WeakMap;function Yi(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-eq-tip",l.setAttribute("aria-hidden","true"),l.hidden=!0,o.append(i,r);for(let c of e.bands)o.append(Ki(n,c,t));o.append(l),o.addEventListener("click",c=>{if(!En(n)||c.button>0)return;let d=kn(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let s=document.createElement("i");return s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s),F.set(n,{control:e,cache:null,spec:null,active:null}),yn(n,e),n}function wn(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Ki(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,l=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=r();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),l={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",_(e,t.id))}),o.addEventListener("pointermove",d=>{if(!l||d.pointerId!==l.id)return;let p=i(),u=r(),f=F.get(e);if(!p||!u||!f?.box)return;let{w:m,h:b,pad:y}=f.box;p.onBand(u.id,_i(u,l.start,d.clientX-l.x,d.clientY-l.y,m,b,p.range??18,y,d.shiftKey))});let s=d=>{!l||d.pointerId!==l.id||(l=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&_(e,null))};o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=i(),u=r();if(!p||!u)return;let f=Gi(u,d.key,d.shiftKey,p.range??18);f&&(d.preventDefault(),f==="reset"?p.onReset?.(u.id):p.onBand(u.id,f),_(e,u.id))});let c=null;return o.addEventListener("wheel",d=>{let p=i(),u=r();if(!p||!u?.moveQ)return;d.preventDefault();let f=d.timeStamp;(!c||f-c.t>400)&&(c={q:u.q,t:f});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-m/240))),c.t=f,p.onBand(u.id,{q:c.q}),_(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>_(e,t.id)),o.addEventListener("focus",()=>_(e,t.id)),o.addEventListener("pointerleave",()=>{!l&&e.ownerDocument.activeElement!==o&&_(e,null)}),o.addEventListener("blur",()=>{l||_(e,null)}),o}function _(e,t){let n=F.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?de(e):Wt(e)}function Wt(e){let t=F.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(o&&b.dataset.band===o.id?b.dataset.active="true":delete b.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,xn(o.db)];o.kind==="peak"?i.push(gt(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${gt(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Xi(t.control,o)),n.hidden=!1;let{w:r,h:l,pad:s}=t.box,c=ie(o.hz,r),d=Y(o.db*_t(o),l,t.control.range??18,s),p=n.offsetWidth,u=n.offsetHeight,f=Math.max(0,Math.min(r-p,c-p/2)),m=d-u-s*1.5>=0?d-u-s*1.5:Math.min(l-u,d+s*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(m)}px`}function Xi(e,t){return e.bands.indexOf(t)%3+1}function yn(e,t){let n=F.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Yt(e);let o=t.range??18;t.bands.forEach((i,r)=>{let l=wn(e,i.id);l instanceof HTMLElement&&(l.dataset.tone=String(r%3+1),l.dataset.kind=i.kind,l.setAttribute("aria-label",`${i.label} band`),l.setAttribute("aria-valuemin",String(-o)),l.setAttribute("aria-valuemax",String(o)),l.setAttribute("aria-valuenow",String(i.db)),l.setAttribute("aria-valuetext",i.valueText??`${xn(i.db)}, ${gt(i.hz)}`),l.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?l.setAttribute("data-nc-help",i.help):l.removeAttribute("data-nc-help"))}),de(e),ar(e)}function vn(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function $n(e){return{curve:I(e,"eq-curve"),fill:I(e,"eq-fill"),quiet:I(e,"text-sub"),grid:I(e,"eq-grid"),zero:I(e,"divider"),label:I(e,"text-sub"),spectrum:I(e,"eq-spectrum"),bands:[I(e,"eq-band-1"),I(e,"eq-band-2"),I(e,"eq-band-3")]}}function Qi(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function de(e){F.has(e)&&Yt(e);let t=F.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:l}=vn(n);if(!i)return;let s=Math.max(8,Math.round(l*.06)),c=o.range??18;t.box={w:r,h:l,pad:s},t.colours=$n(e);let d=t.colours,p=Qi(o,r);if(!t.cache||t.cache.key!==p){let v=Math.max(64,Math.ceil(r)+1),A=new Float64Array(v);for(let $=0;$<v;$++)A[$]=Te($/(v-1)*r,r);let E=null;try{E=typeof o.response=="function"?o.response(A):null}catch{E=null}t.cache={key:p,freqs:A,total:E?.total??new Float64Array(v),bands:E?.bands??[]}}i.clearRect(0,0,r,l);let u=Ii(e),f=o.on!==!1;Zi(i,r,l,c,s,d,u);let{freqs:m,total:b,bands:y}=t.cache,h=Array.from(m,v=>ie(v,r)),g=Y(0,l,c,s);y.forEach((v,A)=>{if(!v||!v.some(S=>Math.abs(S)>.05))return;let E=f?d.bands[A%3]:d.quiet,$=Array.from(v,S=>Y(S,l,c,s));i.save(),t.active&&o.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=E,Ma(i,h,$,g)),i.globalAlpha=f?.75:.4,i.strokeStyle=E,i.lineWidth=.75,et(i,h,$),i.restore()});let w=Array.from(b,v=>Y(v,l,c,s)),x=f?d.curve:d.quiet;i.save(),i.fillStyle=f?d.fill:d.quiet,i.globalAlpha=f?.2:.08,Ma(i,h,w,g),i.restore(),i.save(),i.strokeStyle=f?d.fill:x,i.lineJoin="round",i.lineCap="round",f&&(i.globalAlpha=.16,i.lineWidth=4,et(i,h,w)),i.globalAlpha=1,i.strokeStyle=x,i.lineWidth=1.25,et(i,h,w),i.restore(),Ji(e),Wt(e)}function Zi(e,t,n,o,i,r,l){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<ae||p>Se)continue;let u=Math.round(ie(p,t))+.5;e.globalAlpha=Sa.includes(p)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of Vi)if(!(c>o))for(let d of[1,-1]){let p=Math.round(Y(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let s=Math.round(Y(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke(),e.font=l,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Sa){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=ie(c,t)+3;e.fillText(d,u+p+2>t?ie(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=Y(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function je(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function et(e,t,n){e.beginPath(),je(e,t,n),e.stroke()}function Ma(e,t,n,o){e.beginPath(),je(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function kn(e){return e.closest("[data-nc-maxable]")}function En(e){let t=kn(e);return!!t&&!t.hasAttribute("data-nc-max")}function Yt(e){let t=En(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=F.get(e);n?.active&&(n.active=null,Wt(e))}return t}function Ji(e){Yt(e);let t=F.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,r=t.control.range??18;for(let l of t.control.bands){let s=wn(e,l.id);s instanceof HTMLElement&&(s.style.left=`${ie(l.hz,n).toFixed(1)}px`,s.style.top=`${Y(l.db*_t(l),o,r,i).toFixed(1)}px`)}}function er(e,t,n,o){let i=o/2/n,r=new Float32Array(e),l=new Float32Array(e),s=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=Te(d,t),f=Te(p,t),m=Te(c/(e-1)*t,t);r[c]=Math.min(n-1,u/i),l[c]=Math.min(n-1,f/i),s[c]=Oi*Math.log2(m/1e3)}return{lo:r,hi:l,tilt:s}}function tr(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let l=t-o,s=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??s;return s+(c-s)*l}let r=-1/0;for(let l=o;l<=i&&l<e.length;l++)e[l]>r&&(r=e[l]);return r}function ar(e){let t=F.get(e);if(t){if(!t.control.spectrum){Sn(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=F.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),bt(e))}),t.spec.io.observe(e)):t.spec.visible=!0}bt(e)}}function bt(e){let t=F.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){An(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=xt(e),n.onVis||(n.onVis=()=>bt(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&wt(e,!1)}function xt(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function wt(e,t){let n=F.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,tt(e,xt(e))),ji):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,tt(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,tt(e,xt(e))),ft))}function An(e){let t=F.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function Sn(e){let t=F.get(e)?.spec;if(!t)return;An(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=F.get(e);n&&(n.spec=null)}function tt(e,t){let n=F.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){Sn(e);return}if(!o.analyser)return;if(t-o.last<ft-4&&!o.idle){wt(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):ft/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:l,w:s,h:c}=vn(r);if(!l)return;let d=Math.max(16,Math.round(s/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==s||o.map.sr!==p)&&(o.map={cols:d,w:s,sr:p,...er(d,s,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,f=Ui*i,{lo:m,hi:b,tilt:y}=o.map;for(let g=0;g<d;g++){let w=tr(o.buf,m[g],b[g]);w>u&&(u=w);let x=w+y[g],v=o.disp[g]-f;o.disp[g]=x>v?x:v}u>Bi&&(o.loud=t);let h=t-o.loud>Hi;l.clearRect(0,0,s,c),(!h||o.disp.some(g=>g>Z))&&nr(l,s,c,o.disp,n.colours??$n(e)),o.idle=h&&!o.disp.some(g=>g>Z),wt(e,o.idle)}function nr(e,t,n,o,i){let r=o.length,l=new Array(r),s=new Array(r),c=d=>{let p=o[Math.max(0,Math.min(r-1,d))];return Number.isFinite(p)?p:Z};for(let d=0;d<r;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(Z,Math.min(Aa,Number.isFinite(p)?p:Z))-Z)/(Aa-Z);l[d]=d/(r-1)*t,s[d]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),je(e,l,s),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),je(e,l,s),e.stroke(),e.restore()}var q=new WeakMap,or=450,ir=6,rr=33,at=24,lr="http://www.w3.org/2000/svg";function sr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function dr(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function cr(e,t,n,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let l=t<o?1:-1;for(let s=t;s!==o+l;s+=l){let c=(s-t)/(o-t);r[s]=Math.round((n+(i-n)*c)*100)/100}return r}function pr(e,t){let n=e.steps[t],o=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function J(e,t){let n=document.createElementNS(lr,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function Mn(e){let t=J("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(J("path",{d:e})),t}function ur(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let l=document.createElement("div");l.className="nc-lsteps-pick",l.setAttribute("role","menu"),l.hidden=!0,n.append(o,i,r,l);let s=document.createElement("i");s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return q.set(n,c),mr(n,o),fr(n,l),Ln(n,e),n}function P(e){let t=q.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function hr(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function nt(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=hr(e);return{i:dr(t.clientX,o),level:sr(t.clientY-n.top,n.height)}}function mr(e,t){let n=q.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let l=P(e);if(!l||r.button>0||!l.steps.length)return;r.preventDefault(),Be(e),t.setPointerCapture?.(r.pointerId);let s=nt(t,r),c=l.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:s.i,level:s.level,moved:!1,long:!1},n.focus=s.i,La(e,s.i,s.level,s.i,s.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,P(e)?.onLevels(d.start.slice(),!0),ot(e,d.i))},or)}),t.addEventListener("pointermove",r=>{let l=n.drag;if(!l||l.id!==r.pointerId||l.long||!l.moved&&Math.hypot(r.clientX-l.x,r.clientY-l.y)<ir)return;l.moved=!0,o();let s=nt(t,r);La(e,l.i,l.level,s.i,s.level,!1),l.i=s.i,l.level=s.level});let i=r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(r.pointerId),l.long||P(e)?.onLevels(l.levels.slice(),!0),yt(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,l.long||P(e)?.onLevels(l.start.slice(),!0),yt(e,-1))}),t.addEventListener("contextmenu",r=>{P(e)?.onShape&&(r.preventDefault(),ot(e,nt(t,r).i))}),t.addEventListener("keydown",r=>{let l=P(e);if(!l||!l.steps.length)return;let s=l.steps.length,c=Math.min(n.focus,s-1),d=l.steps[c].level,p=u=>{let f=l.steps.map(m=>m.level);f[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,l.onLevels(f,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+s)%s;break;case"ArrowRight":n.focus=(c+1)%s;break;case"ArrowUp":p(d+(r.shiftKey?.01:.05));break;case"ArrowDown":p(d-(r.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!l.onShape)return;ot(e,c);break;default:return}r.preventDefault(),vt(e)}),t.addEventListener("focus",()=>vt(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function La(e,t,n,o,i,r){let l=q.get(e).drag;l&&(l.levels=cr(l.levels,t,n,o,i),yt(e,o,l.levels[o]),P(e)?.onLevels(l.levels.slice(),r))}function yt(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function vt(e){let t=q.get(e),n=e.querySelector(".nc-lsteps-plot"),o=P(e);if(!n||!o)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",pr(o,i))}function fr(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Be(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),q.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Be(e)}}function ot(e,t){let n=P(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let r=q.get(e);r.focus=t,o.textContent="";let l=document.createElement("span");l.className="nc-lsteps-pick-head",l.textContent=`Step ${t+1}`,o.append(l);for(let m of n.shapes??[]){let b=document.createElement("button");b.type="button",b.setAttribute("role","menuitemradio"),b.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&b.append(Mn(m.icon)),b.append(document.createTextNode(m.label)),b.addEventListener("click",()=>{P(e)?.onShape?.(t,m.value),Be(e,!0)}),o.append(b)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let s=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=s?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,f=Math.max(0,Math.min(c.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function Be(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",q.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function gr(e,t){let n=q.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let l=document.createElement("div");l.className="nc-lsteps-step",l.dataset.i=String(r),r%4===0&&r>0&&(l.dataset.beat="true");let s=J("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});s.append(J("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),J("path",{class:"nc-lsteps-env",d:""}),J("path",{class:"nc-lsteps-top",d:""}),J("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),l.append(s),o.append(l);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function Ln(e,t){let n=q.get(e);if(!n)return;n.control=t;let o=t.steps.length;gr(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),l=i.querySelectorAll(".nc-lsteps-step"),s=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,b)=>{let y=l[b];if(!y)return;let h=String((b%2?1-r:r)*2);y.style.setProperty("--nc-lsteps-grow",h),s[b]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&b>=t.played?y.dataset.out="true":y.removeAttribute("data-out"),y.dataset.zero=m.level<=0?"true":"false";let g=Math.max(0,Math.min(1,m.level)),w=y.querySelector(".nc-lsteps-level");w.setAttribute("y",String(100-g*100)),w.setAttribute("height",String(g*100));let x=t.curve?t.curve(b,at):null,v="M0 100",A="";for(let E=0;E<=at;E++){let $=x?Math.max(0,Math.min(1,x[E]??g)):g,S=E/at*100,L=100-$*100;v+=` L${S.toFixed(2)} ${L.toFixed(2)}`,A+=`${E?" L":"M"}${S.toFixed(2)} ${L.toFixed(2)}`}y.querySelector(".nc-lsteps-env").setAttribute("d",`${v} L100 100 Z`),y.querySelector(".nc-lsteps-top").setAttribute("d",A)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let b=document.createElement("button");b.type="button",b.className="nc-lsteps-shape",b.setAttribute("role","tab"),b.dataset.shape=String(m.value),m.icon&&b.append(Mn(m.icon)),b.append(document.createTextNode(m.label)),b.addEventListener("click",()=>P(e)?.onShapeAll?.(m.value)),c.append(b)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,f=t.steps.slice(0,p).every(m=>m.shape===u);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let b=f&&m.dataset.shape===String(u);m.setAttribute("aria-selected",b?"true":"false"),m.tabIndex=b||!f&&m===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),vt(e),n.last=-2,br(e)}function br(e){let t=q.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&it(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){it(e,null);return}r-o>=rr&&(o=r,it(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function it(e,t){let n=q.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var xr=.8912509381337456,$t=32,wr=250,yr=1200,vr=.2,Cn=1.5;function $r(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function kr(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var He=new WeakMap,Ca=new WeakMap;function za(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function Er(e){let t=Ca.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let l=He.get(r.target);l&&(l.seen.set(r.target,r.isIntersecting),we(l))}oe(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)we(i);oe(t)}),Ca.set(e,t),t}var zn=e=>e.els.some(t=>t.isConnected);function Ar(e){if(!e.loop.io)return zn(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function we(e){let t=!e.dead&&!!e.source&&Ar(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Kt(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),At(e))}function Kt(e){return e.doc.defaultView?.performance?.now()??Date.now()}function oe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Fn(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Kt(e)),!e.raf&&!e.timer&&kt(e,!1)}function kt(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Fa(e,Kt(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),wr):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Fa(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),$t)}function Fn(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Fa(e,t){if(t-e.last<$t-4&&!e.idle&&e.last){kt(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):$t/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!zn(r)){(r.placed||e.frames-r.born>90)&&Tn(r);continue}r.placed=!0,r.open&&(i=!0,Sr(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Fn(e);return}e.idle=t-e.loud>yr&&!o,kt(e,e.idle)}function Sr(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=za(f,"motion-meter-fall",vr),e.hold=za(f,"motion-meter-hold",Cn)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,l=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",s=l&&Number(o.out)||0,c=l?"2":"1";if(e.rows!==c){e.rows=c;for(let f of e.els)f.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[r,s],u=!1;for(let f=0;f<2;f++){let m=$r(p[f]);m>0&&(u=!0),e.disp[f]=m>=e.disp[f]?m:m+(e.disp[f]-m)*d,e.disp[f]<.001&&(e.disp[f]=0),p[f]>=xr&&(e.clipAt[f]=n);let b=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Et(e,f,e.disp[f],b)}return u}function Et(e,t,n,o){let i=Math.round(n*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let l of e.els){let s=l.children[t]?.firstElementChild;s&&(s.style.transform=`scaleY(${i})`,s.dataset.clip=r)}}}function At(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Et(e,0,0,!1),Et(e,1,0,!1)}function Tn(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),He.get(t)===e&&He.delete(t)}function Mr(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=Er(o),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Cn,rows:""};for(let l of n)He.set(l,r),i.io?.observe(l);if(i.recs.add(r),At(r),!i.io){let l=o.defaultView,s=()=>{we(r),oe(i)};typeof l?.requestAnimationFrame=="function"?l.requestAnimationFrame(s):setTimeout(s,0)}return{set(l){let s=l??null;if(!r.dead){if(s===r.source){we(r),oe(i);return}r.open&&(r.open=!1,r.source?.close?.(),At(r)),r.source=s,we(r),oe(i)}},destroy(){r.dead||Tn(r),oe(i)}}}var qn={slop:8,longPressMs:500,pitchPx:16},Lr=class{constructor(e,t,n=qn){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(t,n);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Cr(e,t,n,o=qn){let i=!1,r=0,l=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),f=[...e.querySelectorAll(t)],m=u?f.findIndex(h=>h===u||h.contains(u)):-1;if(m>=0)return m;let b=-1,y=Number.POSITIVE_INFINITY;return f.forEach((h,g)=>{if(h.hidden)return;let w=h.getBoundingClientRect();if(p<w.top||p>w.bottom)return;let x=Math.abs(d-(w.left+w.width/2));x<y&&x<=w.width&&(b=g,y=x)}),b},s=new Lr(l,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,s.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>s.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{s.state!=="idle"&&(s.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),s.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),s.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),s.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),s}var Dn="netcomposer.groups.v1";function Xt(){try{return globalThis.localStorage??null}catch{return null}}function Nn(e=Xt(),t=Dn){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function zr(e,t,n,o=Dn){let i=Nn(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function Fr(e,t=Xt()){return Nn(t).get(e.id)??e.open===!0}function Tr(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let l=document.createElement("span");l.className="nc-group-summary";let s=document.createElement("span");s.className="nc-group-mark",s.setAttribute("aria-hidden","true"),i.append(r,l,s);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";zr(Xt(),e.id,d),St(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(i,c),Pn(o,e),St(o,Fr(e)),Rn(o,e),o}function St(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Pn(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Rn(e,t){Pn(e,t)&&St(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var Me="application/x-nc-pad",Ta="http://www.w3.org/2000/svg";function qr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let r=0;r<n;r++){let l=Math.floor(r*t/n),s=Math.max(l+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let u=l;u<s;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:r/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Dr(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(Nr(n,r,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&qe(n)}),jn(n,e),n}function Nr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let l=document.createElement("span");l.className="nc-padgrid-pad-hint";let s=document.createElement("span");s.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ta,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ta,"path");return c.append(d),o.append(i,r,l,s,c),Rr(e,o,t,n),r.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&In(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(Me,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(Me)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(Me)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let f=p.dataTransfer?.getData(Me);if(f!==void 0&&f!==""){p.preventDefault(),p.stopPropagation();let b=Number(f);b!==t&&u.onMove?.(b,t,p.altKey);return}let m=p.dataTransfer?.files?.[0];m&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,m))}),o}function Pr(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Rr(e,t,n,o){let i=0,r=!1,l=0,s=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,l=d.clientX,s=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=qa(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-l,d.clientY-s)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=qa(e,t,n,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}Pr(e,n,o)})}function qa(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;qe(e);let l=document.createElement("div");l.className="nc-slot-scrim",l.setAttribute("aria-hidden","true"),l.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),qe(e)}),l.addEventListener("click",p=>p.stopPropagation());let s=document.createElement("div");s.className="nc-slot-menu nc-padgrid-pad-menu",s.setAttribute("role","menu"),s.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of r){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{qe(e);let f=o(e);f?.type==="padGrid"&&(p.id==="rename"&&f.onRename?In(e,t,n,o):f.onMenu?.(n,p.id))}),s.append(u)}e.append(l,s);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return s.style.left=`${d.left-c.left}px`,s.style.top=`${d.bottom-c.top}px`,s.querySelector("button")?.focus(),!0}function In(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();r.style.left=`${s.left-l.left}px`,r.style.top=`${s.top-l.top}px`,r.style.width=`${s.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=r.value.trim();r.remove(),t.focus();let f=o(e);p&&u&&f?.type==="padGrid"&&f.onRename?.(n,u)};r.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])r.addEventListener(p,u=>u.stopPropagation());e.append(r),r.focus(),r.select()}function qe(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function jn(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let l=r.querySelector(".nc-padgrid-pad-name"),s=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",l&&(l.textContent=t.emptyLabel??"Load"),s&&(s.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,l&&(l.textContent=o.label),s&&(s.textContent=o.hint??""),c?.setAttribute("d",qr(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let p=t.selected===i;p?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",p?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function T(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function _e(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function Da(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Ee(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Ir=450,Na=8;function B(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function jr(e){let t=fi(e,"target-min");return t>0?t:44}function Br(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=jr(e),o=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let l=t[r],s=i[r];if(!(l instanceof HTMLElement)||!s||s.width===0||s.height===0)continue;if(s.width>=n&&s.height>=n){l.style.display="none";continue}let c=s.left+s.width/2,d=s.top+s.height/2,p=c-o,u=c+o,f=d-o,m=d+o;for(let b=0;b<t.length;b++){if(r===b)continue;let y=i[b];if(!y||y.width===0)continue;let h=y.left+y.width/2,g=y.top+y.height/2;Math.abs(g-d)<o*2&&(h>c?u=Math.min(u,(c+h)/2):h<c&&(p=Math.max(p,(c+h)/2))),Math.abs(h-c)<o*2&&(g>d?m=Math.min(m,(d+g)/2):g<d&&(f=Math.max(f,(d+g)/2)))}p=Math.min(p,s.left),u=Math.max(u,s.right),f=Math.min(f,s.top),m=Math.max(m,s.bottom),l.style.left=`${p-s.left}px`,l.style.top=`${f-s.top}px`,l.style.width=`${Math.max(0,u-p)}px`,l.style.height=`${Math.max(0,m-f)}px`,l.style.transform="none"}}function Bn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Pa(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function te(e,t){switch(e.type){case"slider":return Hr(e,t);case"select":return Ur(e,t);case"toggle":return Vr(e,t);case"button":return Gr(e,t);case"readout":return _r(e);case"label":return Xr(e);case"note":return Ra(e);case"knob":return Jr(e,t);case"choice":return el(e,t);case"slotRow":return tl(e,t);case"stepGrid":return il(e,t);case"canvas":return dl(e);case"fx":return xl(e,t);case"eqGraph":return Yi(e,t);case"levelSteps":return ur(e,t);case"group":return Tr(e,t,te);case"strip":return cl(e,t);case"stripAdd":return ml(e,t);case"padGrid":return Dr(e,t);case"moves":return Yr(e,t);default:return Ra({id:"unknown",text:""})}}function R(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Un(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Hn(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Ee(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Da(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Da(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&K(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Qr(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Ee(t.value))}else if(t.type==="choice")Vn(e,t);else if(t.type==="slotRow")_n(e,t);else if(t.type==="stepGrid")Lt(e,t);else if(t.type==="padGrid")jn(e,t);else if(t.type==="moves")On(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&bn(n,t)}else if(t.type==="eqGraph")yn(e,t);else if(t.type==="levelSteps")Ln(e,t);else if(t.type==="strip"){Xn(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${re(n.id)}"]`);o instanceof Element&&R(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Yn(e,t);else if(t.type==="group"){Rn(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${re(n.id)}"]`);o instanceof Element&&R(o,n)}}else if(t.type==="fx"){io(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${re(n.id)}"]`);o instanceof Element&&R(o,n)}}}}function Hr(e,t){let n=_e(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=Ae(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(Hn(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=s=>i?Ie(s.taper??e.taper,s.min,s.max,o.value,s.step):Number(o.value);o.addEventListener("input",()=>{let s=t(o);s?.type==="slider"&&s.onChange(r(s))}),o.addEventListener("change",()=>{let s=t(o);s?.type==="slider"&&s.onCommit?.(r(s))}),i&&o.addEventListener("keydown",s=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=Vt(d,c.min,c.max,c.value,s.key,s.shiftKey,c.step);p!==null&&(s.preventDefault(),o.value=String(ke(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(o,l),e.onTap&&n.insertBefore(Or(e,o,t),l),n.append(T()),R(n,e),n}function Hn(e){return Ae(e.taper,e.min,e.max)?ke(e.taper,e.min,e.max,e.value):e.value}function Or(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(B());let i=r=>{let l=n(t);l?.type==="slider"&&l.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function Ur(e,t){let n=_e(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let l=document.createElement("option");l.value=r.value,l.textContent=r.label,r.disabled&&(l.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(l)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),n.append(o,T()),n}function Vr(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(T()),R(n,e),n}function Gr(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(T()),R(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=Bn(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Wn(r);let l=t(n);l?.type==="button"&&l.onSparkle?.()}),o.append(n,i),o}function _r(e){let t=_e(e.id,e.label);return t.append(T()),R(t,e),t}var Wr=450;function Yr(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let l=document.createElement("div");l.className="nc-moves-btns";for(let s of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=s.id,c.title=s.title??s.text,c.setAttribute("aria-label",`${o.label} ${s.text}`),c.append(Kr(s.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(s.id)}),l.append(c)}i.append(r,l),n.append(i)}return On(n,e),n}function On(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${re(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function Kr(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function Xr(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(T()),t}function Ra(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(T()),t}function Ia(e){if(typeof e.valueText=="string")return e.valueText;let t=Ee(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Un(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Qr(e,t){let n=Re(t.taper,t.min,t.max,t.value);Un(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Re(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Ia(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Ia(t)}`}function Zr(e,t){if(Ae(e.taper,e.min,e.max))return Vt(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Jr(e,t){let n=_e(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,l=0;o.addEventListener("pointerdown",d=>{r=d.clientY;let p=t(o);l=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let s=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("lostpointercapture",s),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(Ae(p.taper,p.min,p.max)){let m=Re(p.taper,p.min,p.max,l)-(d.clientY-r)/120;p.onChange(fn(p.taper,p.min,p.max,m));return}let u=p.max-p.min||1,f=Math.min(p.max,Math.max(p.min,l-(d.clientY-r)*u/120));p.onChange(f)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let u=Zr(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(T()),R(n,e),n}function el(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let l=[...n.querySelectorAll("[data-nc-choice]")],s=l.indexOf(i),c=s;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(s+1)%l.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(s-1+l.length)%l.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=l.length-1;else return;let d=l[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(T()),Vn(n,e),n}function Vn(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function tl(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],f=document.createElement("span");f.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(p),m.textContent=u.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(m,B()),al(f,m,n,p,t),o.append(f)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=Bn(),i.append(B()),i.addEventListener("click",()=>{Wn(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let l=document.createElement("span");l.className="nc-label",l.textContent="Morph";let s=document.createElement("input");s.type="range",s.className="nc-range nc-morph",s.min="0",s.max="4",s.step="0.01",s.setAttribute("aria-label","Morph time"),s.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(s.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(l,c,s);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,r,T()),Gn(n,t),_n(n,e),n}function ja(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;ge(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function al(e,t,n,o,i){let r=0,l=0,s=0,c=!1,d=!1,p=!1,u=!1,f=()=>{window.clearTimeout(r),r=0},m=g=>{let w=g.clientX-l,x=g.clientY-s;w*w+x*x>Na*Na&&(c=!0,f())},b=()=>{u&&(u=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",h))},y=g=>{let w=r!==0&&!c&&!d;f(),b(),w&&(p=!0,ja(n,o,i,g))},h=()=>{c=!0,f(),b()};e.addEventListener("pointerdown",g=>{g.button===0&&(b(),d=!1,c=!1,p=!1,l=g.clientX,s=g.clientY,f(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,nl(n,t,o,i))},Ir),u=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",g=>g.preventDefault()),e.addEventListener("click",g=>{if(p||d||c){p=!1,d=!1,c=!1;return}ja(n,o,i,g)})}function Gn(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=Ba("Save","store"),i=Ba("Clear","clear");n.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),ge(e)}),r.addEventListener("click",l=>l.stopPropagation()),e.append(r,n),n.addEventListener("click",l=>{let s=l.target;if(!(s instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);s.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),ge(e)):s.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),ge(e))}),e.addEventListener("keydown",l=>{l.key==="Escape"&&ge(e)})}function Ba(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function nl(e,t,n,o){Gn(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();i.style.left=`${s.left-l.left}px`,i.style.top=`${s.bottom-l.top}px`,i.querySelector("button")?.focus()}function ge(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function _n(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),l=t.slots[r];if(!l)continue;i.textContent=l.label,l.filled?i.dataset.filled="true":delete i.dataset.filled,l.active?i.dataset.active="true":delete i.dataset.active,l.edited?i.dataset.edited="true":delete i.dataset.edited,l.queued?i.dataset.queued="true":delete i.dataset.queued,l.queued&&l.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let s=[l.filled?"saved":"empty",l.active?"playing":"",l.edited?"edited":"",l.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[l.label,...s.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Wn(e){let t=e.dataset.ncLastFill||null,n=ti(t);e.dataset.ncLastFill=n;let o=ai(n);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function ol(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,n.setAttribute("aria-pressed",r?"true":"false");let l=t(e);l?.type==="stepGrid"&&l.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function il(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=h=>{let g=document.createElement("button");return g.type="button",g.setAttribute("role","radio"),g.textContent=h,o.append(g),g},r=i("Note"),l=i("Accent");l.dataset.ncAccentMode="";let s=h=>{for(let g of[r,l]){let w=g===h;g.setAttribute("aria-checked",w?"true":"false"),g.tabIndex=w?0:-1}};s(r);for(let h of[r,l])h.addEventListener("click",()=>s(h));o.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let g=l.getAttribute("aria-checked")==="true"?r:l;s(g),g.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(ol(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let g=document.createElement("div");g.className="nc-row",g.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=h.label,w.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(w.dataset.ncLane=String((h.lane-1)%4+1));let x=!1,v=0;w.addEventListener("pointerdown",$=>{x=!1,!($.pointerType==="mouse"||$.button!==0)&&(v=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(x=!0,S.onSelectRow?.(S.rows.findIndex(L=>L.id===h.id),!0))},Wr))});for(let $ of["pointerup","pointercancel","pointerleave"])w.addEventListener($,()=>window.clearTimeout(v));w.addEventListener("contextmenu",$=>{x&&$.preventDefault()}),w.addEventListener("click",$=>{let S=t(n);if(S?.type!=="stepGrid")return;if(x){x=!1;return}let L=S.rows.findIndex(Q=>Q.id===h.id),V=!!S.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);S.onSelectRow?.(L,V)}),w.addEventListener("keydown",$=>rl(n,w,$));let A=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=$,L.textContent=$==="mute"?"M":"S",L.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),S.append(L,B()),S.addEventListener("click",()=>{let V=t(n);if(V?.type!=="stepGrid")return;let Q=V.rows.findIndex(Xe=>Xe.id===h.id);($==="mute"?V.onMute:V.onSolo)?.(Q)}),A.push(S)}let E=document.createElement("div");E.className="nc-steps";for(let $=0;$<h.steps.length;$++){let S=document.createElement("span");S.className="nc-step-wrap";let L=document.createElement("button");L.type="button",L.className="nc-step",L.dataset.ncStep=`${h.id}:${$}`,L.setAttribute("aria-label",`${h.label} step ${$+1}`),S.append(L,B()),S.addEventListener("click",V=>{let Q=t(n);if(Q?.type!=="stepGrid")return;let Xe=Q.rows.findIndex(Oo=>Oo.id===h.id),Ho=l.getAttribute("aria-checked")==="true";Q.onToggle(Xe,$,V.shiftKey||Ho)}),E.append(S)}if(e.onLength&&E.append(ll(n,E,h,t)),g.append(...A,w,E),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Pa(),$.append(B()),$.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(L=>L.id===h.id))}),g.append($)}g.addEventListener("click",$=>{if($.target!==g)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(L=>L.id===h.id))}),Ha(n,E,".nc-step-wrap",t,l,()=>h.id),n.append(g)}let d=document.createElement("div");d.className="nc-pads-head";let p=(h,g,w)=>{let x=document.createElement("button");return x.type="button",x.className=h,x.textContent=g,w&&x.setAttribute("aria-label",w),x},u=p("nc-pads-step","‹","Previous lane"),f=p("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Lt(n,h))}));for(let[h,g]of[[u,-1],[f,1]])h.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let x=w.rows.length;w.onSelectRow?.(((Le(w)+g)%x+x)%x)});if(d.append(u,m,f),e.onDice){let h=p("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=Pa(),h.addEventListener("click",()=>{let g=t(n);if(g?.type!=="stepGrid")return;let w=Le(g);w>=0&&g.onDice?.(w)}),d.append(h)}if(e.transport){let h=p("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let g=t(n);g?.type==="stepGrid"&&g.transport?.onToggle()}),d.append(h)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let y=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<y;h++){let g=document.createElement("button");g.type="button",g.className="nc-pad",g.dataset.ncPad=String(h),g.textContent=String(h+1),g.addEventListener("click",w=>{let x=t(n);if(x?.type!=="stepGrid")return;let v=Le(x);if(v<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(v,h+1);return}let A=l.getAttribute("aria-checked")==="true";x.onToggle(v,h,w.shiftKey||A)}),b.append(g)}return Ha(n,b,".nc-pad",t,l,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[Le(h)]?.id:void 0}),n.append(b),n.append(T()),Lt(n,e),n}function Le(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Ha(e,t,n,o,i,r){let l="on",s=!0,c=-1,d=(p,u)=>{let f=p.rows[c]?.steps[u];!f||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,l,s):!!f[l]!==s&&p.onToggle(c,u,l==="accent"))};Cr(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let f=u.rows.findIndex(m=>m.id===r());f>=0&&u.rows[f].length!==p.pad+1&&u.onLength?.(f,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let f=r();c=u.rows.findIndex(b=>b.id===f);let m=u.rows[c]?.steps[p.pad];if(!m)return;l=i.getAttribute("aria-checked")==="true"?"accent":"on",s=!m[l]}d(u,p.pad)}else if(p.kind==="long"){let f=r(),m=u.rows.findIndex(y=>y.id===f),b=t.querySelectorAll(n)[p.pad];m>=0&&b instanceof HTMLElement&&u.onLongPress?.(m,p.pad,b)}}})}function rl(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=o.length-1;let l=o[r];!(l instanceof HTMLElement)||l===t||(n.preventDefault(),l.focus(),l.click())}function ll(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(B());let r=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(b=>b.id===n.id),f=p.rows[u];if(!f)return;let m=Math.max(1,Math.min(f.steps.length,d));m!==f.length&&p.onLength?.(u,m)},l=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((f,m)=>{let b=f.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(u=m+1)}),u},s=d=>r(l(d.clientX)),c=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",s),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(m=>m.id===n.id);if(!u)return;let f={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in f&&(d.preventDefault(),r(f[d.key]))}),i}var rt=new WeakMap,Ce=new WeakMap;function sl(e){return e?(Ce.has(e)||(Ce.set(e,ht(e)),sn(t=>{Ce.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Mt(n,Number(n.getAttribute("data-nc-velocity")))},e)),Ce.get(e)):"light"}function Mt(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:sl(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(rt.has(e)&&rt.get(e)===i)){if(rt.set(e,i),n===null){for(let r of Object.keys(ba(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,l]of Object.entries(ba(n,ga[o]??ga.light)))e.style.setProperty(r,l)}}function Lt(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],l=e.querySelector(".nc-pads-label"),s=e.dataset.ncLenMode==="true"&&!!t.onLength;l instanceof HTMLElement&&r&&(l.textContent=s?`${r.label} · ${r.length}`:r.label,t.onLength&&(l.setAttribute("aria-pressed",s?"true":"false"),l.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let f=t.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let p=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let f=Number(u.getAttribute("data-nc-pad")),m=r.steps[f];u instanceof HTMLButtonElement&&(u.hidden=!m||!s&&f>=r.length,s&&f>=r.length?u.dataset.out="true":delete u.dataset.out,s&&f===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${f+1}`),u.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?u.dataset.accent="true":delete u.dataset.accent,m?.dim?u.dataset.dim="true":delete u.dataset.dim,Mt(u,m?.velocity),t.playhead>=0&&f===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let m=0;m<p.steps.length;m++){let b=p.steps[m],y=e.querySelector(`[data-nc-step="${p.id}:${m}"]`);if(!(y instanceof HTMLButtonElement))continue;let h=y.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===p.id?h.dataset.selected="true":delete h.dataset.selected;let x=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);x?h.dataset.picked="true":delete h.dataset.picked;let v=h.querySelector(".nc-name");v instanceof HTMLElement&&(v.setAttribute("aria-pressed",t.selectedRow===p.id||x?"true":"false"),v.textContent!==p.label&&(v.textContent=p.label,v.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?h.dataset.silent="true":delete h.dataset.silent;for(let A of h.querySelectorAll("[data-nc-ms]")){let E=A.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;A.setAttribute("aria-pressed",E?"true":"false")}}y.setAttribute("aria-pressed",b.on?"true":"false"),b.accent?y.dataset.accent="true":delete y.dataset.accent,b.dim?y.dataset.dim="true":delete y.dataset.dim,m%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof b.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Mt(y,b.velocity);let g=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;m===g?y.dataset.playhead="true":delete y.dataset.playhead;let w=!!t.onLength&&t.selectedRow===p.id;y.hidden=m>=p.length&&!w,m>=p.length&&w?y.dataset.out="true":delete y.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),f=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&f&&f.nextElementSibling!==u){let m=document.activeElement===u;f.after(u),m&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function dl(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,T()),t}function cl(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",l=null;r&&(n.dataset.ncFoldable="",l=eo(),l.dataset.ncStripHide="",l.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==l&&l.focus())})),o.append(i);let s=null;if(!e.master&&typeof e.onMove=="function"){s=document.createElement("button"),s.type="button",s.className="nc-strip-grip",s.dataset.ncStripGrip="",s.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),s.append(x),s.addEventListener("keydown",v=>{if(v.key!=="ArrowLeft"&&v.key!=="ArrowRight"||v.ctrlKey||v.metaKey||v.shiftKey)return;let A=t(n);A?.type==="strip"&&(v.preventDefault(),A.onMove?.(v.key==="ArrowLeft"?-1:1))})}if(s&&typeof e.onShade=="function"&&(s.setAttribute("aria-haspopup","dialog"),s.addEventListener("click",()=>Va(n,s,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),Va(n,o,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onRemove?.(x)}),o.append(x)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",x.append(v,B()),x.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onHacks?.()}),c.append(x)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks nc-sends-view",v.dataset.ncSendsView="",x.append(v,B()),x.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&A.onSendsView?.()}),d.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let v=document.createElement("span");v.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=x,A.textContent=x==="mute"?"M":"S",v.append(A,B()),v.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(x==="mute"?E.onMute:E.onSolo)?.()}),d.append(v)}let p=document.createElement("div");p.className="nc-strip-sends";for(let x of e.sends??[])p.append(te({...x,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(te(Qt(e),t));let f=document.createElement("div");f.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(x.value)),v.textContent=x.label,m.append(v)}let b=$i({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let v=t(n);v?.type==="strip"&&v.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&Ua(x)}}),y=Li({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(f.append(m,b.el,y.el),r){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,x.append(v,E,A),x.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),f.prepend(x)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let g=0;h.addEventListener("click",x=>{let v=t(n);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(g),x.detail===0?Oa(n,h,t):x.detail===1&&(g=window.setTimeout(()=>Oa(n,h,t),hl)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(g);let x=t(n);x?.type==="strip"&&Ua(x)});let w=document.createElement("div");return w.className="nc-strip-trim",e.trim&&w.append(te(Zt(e),t)),l&&n.append(l),s&&n.append(s),n.append(o,w,c,d,p,u,f,h,T()),Xn(n,e),n}function Qt(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??ul(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Zt(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??pl(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function pl(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function ul(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var hl=250;function Oa(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??Ee(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,l=s=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,s){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",s=>{s.key==="Enter"?(s.preventDefault(),l(!0)):s.key==="Escape"&&(s.preventDefault(),l(!1))}),i.addEventListener("blur",()=>l(!1))}function ml(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let l=document.createElement("select");return l.className="nc-strip-add-select",l.addEventListener("change",()=>{let s=t(n),c=l.value;Kn(l),s?.type==="stripAdd"&&c&&s.onAdd(c)}),n.append(o,l,T()),Yn(n,e),n}function Yn(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(s=>`${s.value}|${s.textContent}|${s.disabled}`).join(","),l=i.map(s=>`${s.value}|${s.label}|${s.disabled===!0}`).join(",");r!==l&&(o.replaceChildren(...i.map(s=>{let c=document.createElement("option");return c.value=s.value,c.textContent=s.label,c.disabled=s.disabled===!0,c})),Kn(o))}function Kn(e){let t=e.options[0];t&&(t.selected=!0)}function Ua(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Xn(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?ki(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Ci(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let l=e.querySelector(".nc-strip-db");if(l instanceof HTMLElement){let b=t.valueText??Ee(t.value);l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-label",`${t.label} level ${b}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";l.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let b of e.querySelectorAll("[data-nc-ms]")){let y=b.getAttribute("data-nc-ms"),h=y==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",h?"true":"false"),b.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let s=e.querySelector("[data-nc-hacks]");if(s){let b=t.hacksLabel??"Hacks";s.textContent!==b&&(s.textContent=b),s.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),s.setAttribute("aria-label",`${b}: ${t.label}`),s.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let b=t.sendsViewLabel??"Sends";c.textContent!==b&&(c.textContent=b),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),K(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=Qn(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let b=e.querySelector(`.nc-strip-trim [data-nc-id="${re(t.trim.id)}"]`);b&&R(b,Zt(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${re(t.pan.id)}"]`);b&&R(b,Qt(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(to(f,u,t.label),K(f,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!u,m.setAttribute("aria-label",`Expand ${t.label}`);let b=m.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),K(m,t.foldedHelp??t.foldHelp)}}function Qn(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Zn?t:0}var Zn=8,ze=null;function Va(e,t,n,o){ze?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,l=r.defaultView??globalThis,s=r.createElement("div");s.className="nc-strip-menu",s.dataset.ncStripMenu="",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=Qn(i),u=e.querySelector("[data-nc-strip-grip]")??t,f=(g=!1)=>{if(ze!==f)return;ze=null;let w=s.contains(r.activeElement);s.remove(),r.removeEventListener("keydown",b,!0),r.removeEventListener("pointerdown",y,!0),l.removeEventListener("resize",h),(g||w)&&u?.isConnected&&u.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Zn},(g,w)=>w+1)].map(g=>{let w=r.createElement("button");return w.type="button",w.setAttribute("role","radio"),w.setAttribute("aria-checked",g===p?"true":"false"),w.setAttribute("tabindex",g===p?"0":"-1"),w.dataset.ncShadeChoice=String(g),g===0?(w.textContent="Auto",w.setAttribute("aria-label","Auto: alternate light and dark"),w.title="Auto: alternate light and dark"):(w.textContent=String(g),w.setAttribute("aria-label",`Shade ${g}`),w.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${g})`)),w.addEventListener("click",()=>{let x=n(e);f(!0),x?.type==="strip"&&x.onShade?.(g===0?null:g)}),w});if(d.append(...m),d.addEventListener("keydown",g=>{let w=m.indexOf(r.activeElement);if(w<0)return;let x=-1;g.key==="ArrowRight"||g.key==="ArrowDown"?x=(w+1)%m.length:g.key==="ArrowLeft"||g.key==="ArrowUp"?x=(w-1+m.length)%m.length:g.key==="Home"?x=0:g.key==="End"&&(x=m.length-1),!(x<0)&&(g.preventDefault(),m[w].setAttribute("tabindex","-1"),m[x].setAttribute("tabindex","0"),m[x].focus())}),s.append(c,d),typeof i.onMove=="function"){let g=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),w=g.indexOf(e);for(let[x,v,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=r.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=x<0?"left":"right";let $=r.createElement("span");$.textContent=v;let S=r.createElement("kbd");S.textContent=A,S.setAttribute("aria-hidden","true"),E.append($,S),E.disabled=x<0?w<=0:w<0||w>=g.length-1,E.addEventListener("click",()=>{let L=n(e);f(!0),L?.type==="strip"&&L.onMove?.(x)}),s.append(E)}}r.body.append(s),(()=>{let g=t.getBoundingClientRect?.()??{bottom:0,right:0},w=s.offsetWidth,x=s.offsetHeight,v=l.innerWidth||r.documentElement.clientWidth||w,A=l.innerHeight||r.documentElement.clientHeight||x,E=o?o.x:g.right-w,$=o?o.y:g.bottom+4;E=Math.max(4,Math.min(E,v-w-4)),$+x>A-4&&($=Math.max(4,(o?o.y:g.top)-x-4)),s.style.left=`${Math.round(E)}px`,s.style.top=`${Math.round($)}px`})();let b=g=>{if(g.key==="Escape")g.preventDefault(),g.stopPropagation(),f(!0);else if(g.key==="Tab"&&s.contains(r.activeElement)){let w=[...s.querySelectorAll("button:not([disabled])")].filter(v=>v.getAttribute("tabindex")!=="-1"),x=(w.indexOf(r.activeElement)+(g.shiftKey?-1:1)+w.length)%w.length;g.preventDefault(),w[x]?.focus()}},y=g=>{s.contains(g.target)||f(!1)},h=()=>f(!1);return r.addEventListener("keydown",b,!0),r.addEventListener("pointerdown",y,!0),l.addEventListener("resize",h),ze=f,(m.find(g=>g.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:s,close:()=>f(!1)}}var Ct=typeof ResizeObserver=="function"?new ResizeObserver(fl):null;function fl(e){for(let t of e){if(!t.target.isConnected){Ct.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&gl(n)}}function gl(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function bl(e){if(Ct)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ct.observe(t)}function xl(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,l=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!Oe(e)&&!r&&!l)n.append(o);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(o),r&&s.append(no(n,"head")),e.on!==void 0){let c=un({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",s.append(c.el)}i&&s.append(yl(n,t)),Oe(e)&&s.append(El(n,t)),l&&s.append(Al(t)),n.append(s)}i&&n.prepend(vl(n,t)),r&&oo(n,e);for(let s of e.controls)n.append(te(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",s.append(c);for(let d of e.more)s.append(te(d,t));n.append(s)}return n.append(T()),io(n,e),bl(n),n}var wl=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Jn(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&wl(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function yl(e,t){let n=eo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Jn(e))}),n}function eo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function to(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function vl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(no(e,"fold")),n.addEventListener("click",()=>{let l=t(n);if(l?.type==="fx"){if(l.folded!==!0){let s=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(s instanceof HTMLElement){s.click();return}}l.onFold?.(!1),Jn(e)}}),n}var ce=new Set;function De(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Oe=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),$l="(max-width: 768px)";function kl(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function El(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(kl()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(ao(e,o,!ce.has(o.id)),n.focus())}),n}function Al(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function ao(e,t,n){n?ce.add(t.id):ce.delete(t.id),Jt(e,t)}function Sl(e,t){t?.type==="fx"&&ce.has(t.id)&&ao(e,t,!1)}function Ml(e){return e.ownerDocument.defaultView?.matchMedia?.($l).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Jt(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=Oe(t)&&ce.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Oe(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),De(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&de(l)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",K(n,t.maxHelp)),!o){e.dataset.ncMax&&Ga(e);return}if(!e.isConnected){let l=()=>e.isConnected&&ce.has(t.id)&&Jt(e,t);queueMicrotask(()=>{e.isConnected?l():De(e.ownerDocument,l)});return}let i=Ml(e),r=[...e.children].filter(l=>l.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Ga(e),e.dataset.ncMax=i,i==="over"&&Ll(e,t)),Cl(e.ownerDocument),i==="over"&&ea(e),De(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&de(l)})}function Ga(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),De(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&de(n)})}function Ll(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function ea(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,l=Wi(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${l.left}px`,e.style.top=`${l.top}px`,e.style.width=`${l.width}px`}var _a=new WeakSet;function Cl(e){_a.has(e)||(_a.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&ea(t)}))}var zt=new WeakMap;function no(e,t){let n=kr(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function oo(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)K(i,t.meterHelp);let o=zt.get(e);o?o.set(t.meter):zt.set(e,Mr(n,t.meter))}function io(e,t){(t.meter||zt.has(e))&&oo(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(to(r,i,t.title),K(r,t.foldHelp)),Jt(e,t);let l=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(l instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;l.hidden=i,l.setAttribute("aria-label",c),l.title=c}let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let d=s.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=s.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),K(s,t.foldHelp)}}function K(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function re(e){return e.replace(/["\\]/g,"\\$&")}function zl(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&bn(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&de(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&ea(n);Br(e)}var Fl=1e3,Tl=e=>e===!0?"log":typeof e=="string"?e:"linear";function ql(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Tl(e.log),i=Ae(o,e.min,e.max),r=n.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let l=n.createElement("label");l.className="nc-label",l.setAttribute("for",e.id),l.textContent=e.label;let s=n.createElement("input");s.type="range",s.className="nc-range",s.id=e.id,s.dataset.ncId=e.id,s.min=String(i?0:e.min),s.max=String(i?Fl:e.max),s.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",r.append(l,s,c,d);let p=e.value,u=()=>{let m=e.format(p);c.textContent=m,s.setAttribute("aria-valuetext",m)},f=m=>{p=m,n.activeElement!==s&&(s.value=String(i?ke(o,e.min,e.max,p):p)),u()};return s.addEventListener("input",()=>{p=i?Ie(o,e.min,e.max,s.value,e.step):Number(s.value),u(),e.onInput(p)}),i&&s.addEventListener("keydown",m=>{let b=Vt(o,e.min,e.max,p,m.key,m.shiftKey,e.step);b===null||s.disabled||(m.preventDefault(),s.value=String(ke(o,e.min,e.max,b)),p=b,u(),e.onInput(p))}),s.disabled=e.disabled===!0,f(e.value),{el:r,set:f,setDisabled(m){s.disabled=m===!0}}}var Ue="data-nc-help";function Dl(e,t,n,o=0,i=6,r=8){let l=e.top-i-t.height,s=l>=o+r?"above":"below",c=s==="above"?l:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:s}}var lt=new WeakMap;function Nl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Pl({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=lt.get(e);if(n)return n;let o=e.defaultView,i=null,r=null,l,s=!1,c,d=()=>{clearTimeout(l),clearTimeout(c),r=null,s=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},p=(b,y)=>{let h=y??b.getAttribute(Ue);if(!h)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=h,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let g=b.getBoundingClientRect(),w=Dl(g,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,Nl(e));return i.style.top=`${w.top}px`,i.style.left=`${w.left}px`,i.dataset.side=w.side,i.style.visibility="",!0},u=b=>{if(s||b.pointerType==="touch")return;let y=b.target&&b.target.closest?b.target.closest(`[${Ue}]`):null;y!==r&&(d(),y&&(r=y,l=setTimeout(()=>{r===y&&y.isConnected&&p(y)},t)))},f=b=>{(s||b.key==="Escape")&&d()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",d,!0),e.addEventListener("keydown",f),o.addEventListener("scroll",d,!0),o.addEventListener("blur",d);let m={hide:d,pin(b,y,{ms:h=0}={}){return d(),!b||!b.isConnected||!p(b,y)?!1:(s=!0,i.dataset.pinned="",h>0&&(c=setTimeout(d,h)),!0)},uninstall(){d(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",d,!0),e.removeEventListener("keydown",f),o.removeEventListener("scroll",d,!0),o.removeEventListener("blur",d),i?.remove(),i=null,lt.delete(e)}};return lt.set(e,m),m}var Rl="(max-width: 768px)",Il='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',jl='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',Bl=0;function Hl({panel:e,button:t,label:n="Menu",media:o=Rl}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++Bl}`);let l=t??i.createElement("button");t||(l.type="button",l.innerHTML=Il),l.classList.add("nc-page-menu-btn"),l.setAttribute("aria-label",n),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-controls",e.id);let s=()=>e.hasAttribute("data-nc-open");function c(){s()||(e.setAttribute("data-nc-open",""),l.setAttribute("aria-expanded","true"),i.addEventListener("keydown",p,!0),i.addEventListener("pointerdown",u,!0),[...e.querySelectorAll(jl)].find(h=>!h.hidden&&h.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:h}={}){if(!s())return;let g=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),l.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",p,!0),i.removeEventListener("pointerdown",u,!0),(h??g)&&l.focus?.({preventScroll:!0})}function p(h){h.key==="Escape"&&(h.preventDefault(),h.stopPropagation(),d({focus:!0}))}function u(h){let g=h.target;g instanceof r.Node&&(e.contains(g)||l.contains(g))||d({focus:!1})}let f=()=>s()?d({focus:!0}):c(),m=h=>{let g=h.target,w=g instanceof r.Element?g.closest("button"):null;!w||!e.contains(w)||w.closest("[data-nc-menu-stay]")||d({focus:!0})};l.addEventListener("click",f),e.addEventListener("click",m);let b=r.matchMedia?.(o),y=()=>{b?.matches||d({focus:!1})};return b?.addEventListener?.("change",y),{button:l,panel:e,open:c,close:d,isOpen:s,destroy(){d({focus:!1}),l.removeEventListener("click",f),e.removeEventListener("click",m),b?.removeEventListener?.("change",y)}}}var ta="netcomposer.rhythm.hidden.v1",U=new WeakMap;function st(){try{return globalThis.localStorage??null}catch{return null}}function ro(e,t=ta){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Wa(e,t,n,o=ta){let i=ro(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function aa(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(Qt(i)),i.trim&&n.push(Zt(i)));return n}function lo(e,t){if(!(!e||!t))return aa(e).find(n=>n.id===t)}function Ol(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${aa(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Ul(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),so(e,t)}function so(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Vl(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=U.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return lo(n,o)}function Gl(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=Ol(t);if(e.dataset.ncSignature===i){for(let r of o){let l=e.querySelector(`[data-nc-section="${Ka(r.id)}"]`);l&&so(l,r);for(let s of r.controls){let c=e.querySelector(`[data-nc-id="${Ka(s.id)}"]`);c instanceof Element&&R(c,s)}l instanceof HTMLElement&&Ft(l,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let l=document.createElement("div");l.className="nc-section",l.dataset.ncSection=r.id,r.inset&&(l.dataset.ncInset="true"),r.area&&(l.dataset.ncArea=r.area),r.label&&(l.setAttribute("role","group"),l.setAttribute("aria-label",r.label)),r.panel&&(l.dataset.ncPanel="true",l.setAttribute("role","region"),r.title&&l.setAttribute("aria-label",r.title)),Ul(l,r);let s=r.panel?document.createElement("div"):l;r.panel&&(s.className="nc-panel-body",l.append(s));for(let c of r.controls)s.append(te(c,Vl));e.append(l),Ft(l,r,n)}}function co(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var _l="(max-width: 768px)",po=new WeakMap;function Ya(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Wl(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=Ya("prev"),r=Ya("next"),l=document.createElement("span");l.className="nc-fx-page-count",l.dataset.ncFxPageCount="",l.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-ui-toast-live",s.dataset.ncFxPageLive="",s.setAttribute("aria-live","polite"),o.append(i,l,r,s);let c=(d,p)=>{let u=po.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=co(f,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,m),u.onPage?.(m),Ft(e,{...u,page:m},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(o),o}function Ft(e,t,n){po.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:l}=co(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,l),r<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of o)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let s=e.ownerDocument.defaultView?.matchMedia?.(_l).matches===!0,c=e.closest(".nc-module");o.forEach((h,g)=>{let w=Math.floor(g/i)!==l;if(w?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,w&&!s){let x=c instanceof HTMLElement?U.get(c):void 0;Sl(h,lo(x,h.dataset.ncId))}});let d=Wl(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",l===0?"true":"false"),u.setAttribute("aria-disabled",l===r-1?"true":"false");let f=d.querySelector("[data-nc-fx-page-count]"),m=`${l+1} / ${r}`;f.textContent!==m&&(f.textContent=m);let b=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${l+1} of ${r}`;b.textContent!==y&&(b.textContent=y)}function Ka(e){return e.replace(/["\\]/g,"\\$&")}function Yl(e,t=ta){pn();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=ro(st(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let l=document.createElement("span");l.className="nc-module-end";let s=document.createElement("button");s.type="button",s.className="nc-hide",s.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=un({labelledBy:r.id,onChange:w=>(U.get(n)??e).onToggle?.(w)});d.el.dataset.ncModuleSwitch="",l.append(d.el,s,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(r,p,l);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",f.append(m);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,u,f),n.setAttribute("aria-labelledby",r.id);let y=w=>{let x=U.get(n)??e;n.dataset.ncOpen=w?"false":"true",u.hidden=w,f.hidden=!w,s.textContent=w?"+":"−",s.setAttribute("aria-expanded",w?"false":"true"),s.setAttribute("aria-controls",u.id),s.setAttribute("aria-label",`${w?"Show":"Hide"} ${x.title}`),s.title=w?"Show":"Hide",w?n.dataset.ncSlim="":delete n.dataset.ncSlim};s.addEventListener("click",()=>{let w=n.dataset.ncOpen==="true";Wa(st(),(U.get(n)??e).id,w,t),y(w),Tt(n.parentElement)}),f.addEventListener("click",()=>{Wa(st(),(U.get(n)??e).id,!1,t),y(!1),Tt(n.parentElement)});let h={pages:new Map,redraw:()=>g.redraw()},g={el:n,update(w){U.set(n,w),w.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=w.title,p.textContent=w.status??"",w.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),m.textContent=w.summary??w.title,d.el.hidden=w.on===void 0,d.set(w.on===!0),w.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,f.setAttribute("aria-label",`Show ${w.title}`),Gl(u,w,h),y(u.hidden),g.redraw()},redraw(){let w=U.get(n);w&&zl(n,aa(w))}};return U.set(n,e),y(o),g.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>g.redraw()).observe(n),sn(()=>g.redraw(),n.ownerDocument),g}function Kl(e,t,n="adjacent"){pn(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let l=r%4+1;i.el.dataset.ncShade=String(l),i.el.dataset.ncPlace=o;let s=i.el.querySelector("[data-nc-index]");s&&(s.textContent=String(l).padStart(2,"0")),e.append(i.el),i.redraw()}),Tt(e)}function Tt(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Xl={"page:hold":"Freeze what ARIA sends: the Ground table and Energy stay where they are until you release Hold.","page:save":"Download ARIA's settings (station, Smoothing) as a file.","page:load":"Load an ARIA file.",station:"The seismometer ARIA listens to, live from EarthScope. Its ground motion becomes the Ground table and Energy.",custom:"Any station EarthScope streams, as NET STA LOC CHA (for example IU ANMO 00 BHZ).",status:"Live: data is arriving. Quiet: connected, nothing for two minutes. Offline: reconnecting; the 2010 recording plays meanwhile.",wave:"The last ten minutes at this station. The line is where ARIA is playing; the shaded slice is the table.",table:"One cycle of ground motion, mirrored so it loops. ASTRID plays it as its Ground table.",energy:"How much the ground moves against this station's last 30 minutes: its normal reads 0.5. ASTRID can use it as ARIA Energy.",smoothing:"How slowly Energy follows the ground, in seconds."},uo=e=>Xl[e]??"";function ho(e){const t=e.trim().toUpperCase().split(/[\s.]+/).filter(Boolean),[n,o,i="00",r="BHZ"]=t;if(!n||!o||t.length>4)return null;const l=(s,c)=>c.test(s);return!l(n,/^[A-Z0-9]{1,2}$/)||!l(o,/^[A-Z0-9]{1,5}$/)||!l(i,/^([A-Z0-9]{0,2}|--)$/)||!l(r,/^[A-Z0-9]{3}$/)?null:{net:n,sta:o,loc:i,cha:r}}const We=[{id:"anmo",net:"IU",sta:"ANMO",loc:"00",cha:"BHZ",name:"Albuquerque, New Mexico"},{id:"hrv",net:"IU",sta:"HRV",loc:"00",cha:"BHZ",name:"Harvard, Massachusetts"},{id:"poha",net:"IU",sta:"POHA",loc:"00",cha:"BHZ",name:"Between Mauna Loa and Mauna Kea",note:"volcanic",fallback:{net:"IU",sta:"RAO",loc:"00",cha:"BHZ",name:"Raoul Island, an active volcano"}},{id:"axial",net:"OO",sta:"AXCC1",loc:"",cha:"HHZ",name:"Axial Seamount, sea floor",note:"1.5 km down",fallback:{net:"IU",sta:"PTCN",loc:"00",cha:"BHZ",name:"Pitcairn Island, Pacific"}},{id:"qspa",net:"IU",sta:"QSPA",loc:"00",cha:"BHZ",name:"South Pole",note:"the quietest site",fallback:{net:"IU",sta:"CASY",loc:"00",cha:"BHZ",name:"Casey, Antarctica"}},{id:"tato",net:"IU",sta:"TATO",loc:"00",cha:"BHZ",name:"Taipei, Taiwan",note:"a busy city",fallback:{net:"IU",sta:"MAJO",loc:"00",cha:"BHZ",name:"Matsushiro, Japan"}}],Ql="anmo",na={file:"anmo-2010-02-27.mseed",name:"Recorded: Albuquerque, 27 Feb 2010"},Zl={IU:{name:"Global Seismograph Network (IU)",operator:"Albuquerque Seismological Laboratory / USGS",doi:"10.7914/SN/IU"},OO:{name:"Ocean Observatories Initiative (OO)",operator:"OOI",doi:"10.7914/SN/OO"}};function oa(e){const t=Zl[e],n="real time via EarthScope Consortium (NSF SAGE)";return t?`Data: ${t.name}, ${t.operator}, doi:${t.doi} · ${n}`:`Data: network ${e} (see fdsn.org/networks/detail/${e}) · ${n}`}const Jl="The facilities of EarthScope Consortium were used for access to waveforms, related metadata, and/or derived products. These services are funded through the National Science Foundation's Seismological Facility for the Advancement of Geoscience (SAGE) Award under Cooperative Agreement EAR-1724509.",mo="netcomposer.aria",fo=1,ye={station:Ql,custom:"IU ANMO 00 BHZ",smoothing:5,hold:!1},go=.5,bo=30;function xo(e){const t=e&&typeof e=="object"?e:{},n=typeof t.station=="string"&&(t.station==="custom"||t.station==="recording"||We.some(r=>r.id===t.station))?t.station:ye.station,o=typeof t.custom=="string"&&t.custom.length<=40?t.custom:ye.custom,i=typeof t.smoothing=="number"&&Number.isFinite(t.smoothing)?t.smoothing:ye.smoothing;return{station:n,custom:o,smoothing:Math.min(bo,Math.max(go,i)),hold:t.hold===!0}}function wo(e){return{format:mo,version:fo,settings:{...e}}}function yo(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==mo||typeof t.version!="number"||t.version>fo?null:xo(t.settings)}function vo(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let ne;function es(e,t=vo()){if(ne!==void 0)return ne;ne=null;try{if(typeof window>"u"||window.parent===window)return ne;const n=window.parent.ncStudio;n&&n.version===1&&(ne=n.attach(e,{instance:t}))}catch{}return ne}function ts(e){return new Worker("/aria/assets/worker-q9eWHHNw.js",{type:"module",name:e?.name})}const Ye=vo(),ia=String(Ye).padStart(2,"0"),X=es("aria",Ye),Xa="netcomposer.aria.v1",ra=X?.storageKey?.(Xa)??Xa,as=`${ra}.hidden`,ns="(max-width: 768px)";function la(){try{return window.localStorage}catch{return null}}function os(){try{const e=la()?.getItem(ra);return e?xo(JSON.parse(e)):{...ye}}catch{return{...ye}}}let M=os();function is(){try{la()?.setItem(ra,JSON.stringify(M))}catch{}}function rs(){try{const e=new URLSearchParams(location.search).get("sl");if(e&&/^wss?:\/\//.test(e))return e;const t=la()?.getItem("netcomposer.aria.sl");if(t&&/^wss?:\/\//.test(t))return t}catch{}return"wss://rtserve.earthscope.org/seedlink"}const dt=new URL(`/aria/${na.file}`,location.href).href;function k(e,t={},...n){const o=document.createElement(e);for(const[i,r]of Object.entries(t))r!==void 0&&o.setAttribute(i,r);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const ue=e=>({[Ue]:uo(e)||void 0});function ls(e,t,n){const o=k("button",{type:"button",...t},e);return o.addEventListener("click",n),o}const Ve=(e,t,n)=>k(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?ue(t):{}},e),ct=e=>e===null?"":e<90?`${Math.round(e)} s`:e<5400?`${Math.round(e/60)} min`:`${(e/3600).toFixed(1)} h`,$o=new ts,H=e=>$o.postMessage(e);let N={state:"off",station:null,newestAgeSec:null,behindSec:null,recorded:!1,note:""},j=null;const le=[];let D=null,be=null,qt=!1;function Dt(){qt||(qt=!0,ko())}function ko(){if(!qt)return;if(M.station==="recording"){H({type:"recording",recordingUrl:dt});return}const t=We.find(n=>n.id===M.station)??(()=>{const n=ho(M.custom);return n?{...n,name:`${n.net}.${n.sta}`}:null})();if(!t){H({type:"recording",recordingUrl:dt});return}H({type:"start",station:{...t,name:t.name},url:rs(),recordingUrl:dt})}const Ke=X?.instance??`aria#${Ye}`,O=X?.situationSource?.(`ARIA ${Ye}`)??null,Qa=()=>X?.ctx?X.ctx.currentTime:performance.now()/1e3;function ve(e){try{O?.send(e)}catch{}}function Eo(){return O?.demand().speeds??[]}O?.onDemand(()=>{H({type:"speeds",speeds:Eo()}),(O?.demand().receivers??0)>0&&Dt(),Po()});function Ao(){const e=N.station;return{v:1,kind:"status",source:O?.id??Ke,state:N.state,station:e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null,newestAgeSec:N.newestAgeSec,behindSec:N.behindSec,...N.retryAt?{retryAt:N.retryAt}:{},hold:M.hold,credit:oa(e?.net??"IU"),...N.recorded?{recorded:!0}:{}}}let Za=0;$o.onmessage=e=>{const t=e.data,n=O?.id??Ke;if(t.type==="tables"){for(const o of t.tables)o.speed===1&&(be=o.samples),M.hold||ve(Go(n,{seq:o.seq,at:Qa(),speed:o.speed,station:ss(),behindSec:o.behindSec,samples:o.samples,rms:o.rms}));jo()}else if(t.type==="energy"){j=t.value;const o=performance.now();!M.hold&&o-Za>=100&&(Za=o,ve(Vo(n,[{at:Qa()+.1,value:t.value}])))}else t.type==="overview"?(D=t,j!==null&&(le.push(j),le.length>600&&le.shift()),Io(),Bo()):t.type==="status"&&(N=t,ve(Ao()),No())};function ss(){const e=N.station;return e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null}const he=document.getElementById("app");he.classList.add("nc","nc-page");Pl();function me(e,t){const n=e.hold!==M.hold;M=e,is(),H({type:"smoothing",sec:M.smoothing}),H({type:"hold",on:M.hold}),n&&ve(M.hold?en(O?.id??Ke,"hold"):Ao()),t&&ko(),Ro()}function ds(){const e=new Blob([JSON.stringify(wo(M),null,2)],{type:"application/json"}),t=k("a",{href:URL.createObjectURL(e),download:`aria-${ia}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const se=k("input",{type:"file",accept:".json,application/json"});se.hidden=!0;se.addEventListener("change",async()=>{const e=se.files?.[0];if(se.value="",!(!e||e.size>64*1024))try{const t=yo(JSON.parse(await e.text()));t&&me(t,!0)}catch{}});const Nt=(e,t,n)=>ls(e,{class:"nc-page-action","data-aria-action":n,...ue(`page:${n}`)},t),Pt=Nt("Hold",()=>me({...M,hold:!M.hold},!1),"hold"),Ja=Hl({panel:k("div",{},Nt("Save",ds,"save"),Nt("Load",()=>se.click(),"load"))}),cs=k("header",{class:"nc-page-hd"},k("div",{},k("h1",{class:"nc-page-title"},k("span",{class:"aria-brand"},"ARIA")," ",k("span",{class:"nc-page-sep"},"/")," SITUATION ",k("span",{class:"nc-page-sep"},"/")," ",k("span",{class:"nc-mono"},ia)),k("p",{class:"nc-page-sub"},"A NetComposer element.")),k("div",{class:"nc-page-actions"},Pt,Ja.panel,Ja.button,se)),So=k("div",{class:"nc-stack aria-stack","data-nc-layout":"adjacent"}),Mo=k("span",{class:"aria-credit","data-aria":"credit",title:Jl},oa("IU")),ps=k("footer",{class:"aria-foot"},Mo,k("span",{},`netcomposer.situation.${ia}`));he.append(cs,k("main",{class:"nc-page-body"},So),ps);function Lo(e,t,n){const o=k("div",{class:"aria-body","data-aria-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),r=Yl(i(),as),l=()=>{const s=r.el.querySelector(`[data-nc-id="${e}-mount"]`);s&&s.nextSibling!==o&&s.after(o)};return l(),{handle:r,mount:o,update(){r.update(i()),l()}}}const us=()=>M.station==="recording"?na.name:We.find(e=>e.id===M.station)?.name??M.custom.toUpperCase(),sa=Lo("station","Station",()=>`${us()} · ${N.state}`),da=Lo("signals","Signals",()=>j===null?"Energy —":`Energy ${j.toFixed(2)}`),pe=k("select",{class:"nc-select",id:"aria-station","data-aria-id":"station"});for(const e of We)pe.append(k("option",{value:e.id},e.note?`${e.name} · ${e.note}`:e.name));pe.append(k("option",{value:"custom"},"Other station…"),k("option",{value:"recording"},na.name));pe.addEventListener("change",()=>me({...M,station:pe.value},!0));const $e=k("input",{class:"nc-field-input aria-custom",id:"aria-custom",type:"text",spellcheck:"false",autocomplete:"off",placeholder:"NET STA LOC CHA","data-aria-id":"custom",...ue("custom")});$e.addEventListener("change",()=>{ho($e.value)&&me({...M,custom:$e.value.trim().toUpperCase()},!0)});const Co=k("span",{class:"nc-mono aria-small aria-sub","data-aria":"code"}),zo=k("div",{class:"aria-status",role:"status","data-aria":"status",...ue("status")}),Rt=k("p",{class:"aria-small aria-sub aria-mono","data-aria":"note"}),It=k("canvas",{class:"aria-wave","data-aria":"wave",...ue("wave")});sa.mount.append(k("div",{class:"aria-field"},k("div",{class:"aria-row-between"},Ve("Station","station","aria-station"),Co),pe),k("div",{class:"aria-field","data-aria":"custom-row"},Ve("Network station location channel","custom","aria-custom"),$e),zo,Rt,k("div",{class:"aria-field"},It,k("div",{class:"aria-row-between aria-small aria-sub aria-mono"},k("span",{},"−10 min"),k("span",{},"the line is where ARIA plays · the shaded slice is the table"),k("span",{},"now"))),k("p",{class:"aria-small aria-sub aria-mono"},"More sources later."));const jt=k("canvas",{class:"aria-cycle","data-aria":"table",...ue("table")}),Fo=k("span",{class:"aria-small aria-sub aria-mono","data-aria":"to"}),To=k("span",{class:"aria-energy-val","data-aria":"energy"},"—"),qo=k("i",{}),Do=k("div",{class:"aria-meter",role:"meter","aria-label":"Energy","aria-valuemin":"0","aria-valuemax":"1","data-aria":"meter"},qo),Bt=k("canvas",{class:"aria-history","data-aria":"history"}),ca=ql({id:"aria-smoothing",label:"Smoothing",min:go,max:bo,step:.1,value:M.smoothing,taper:"time",format:e=>`${e.toFixed(1)} s`,onInput:e=>me({...M,smoothing:Math.round(e*10)/10},!1)});ca.el.setAttribute(Ue,uo("smoothing"));da.mount.append(k("div",{class:"aria-field"},k("div",{class:"aria-row-between"},Ve("Ground table","table"),Fo),jt,k("div",{class:"aria-row-between aria-small aria-sub aria-mono"},k("span",{},"256 samples · mirrored"),k("span",{},"5 shapes a second"))),k("div",{class:"aria-field"},k("div",{class:"aria-row-between"},Ve("Energy","energy"),To),Do,Bt,k("div",{class:"aria-row-between aria-small aria-sub aria-mono"},k("span",{},"−10 min"),k("span",{},"now"))),ca.el,k("p",{class:"aria-small aria-sub aria-mono"},"Runs whether the Studio is playing or stopped."));Kl(So,[sa.handle,da.handle],"adjacent");function No(){const e=N,t=e.recorded&&e.state!=="live"?"RECORDED":e.state.toUpperCase(),n=[k("span",{class:`aria-word aria-${e.state}`,"data-state":e.state},k("i",{class:"aria-dot"}),t)];e.station?.rate&&n.push(k("span",{class:"aria-sub"},`${e.station.rate} samples/s`)),e.newestAgeSec!==null&&n.push(k("span",{},`newest ${ct(e.newestAgeSec)} ago`)),e.behindSec!==null&&n.push(k("span",{"data-aria":"behind"},`playing ${ct(e.behindSec)} behind now`)),e.state==="offline"&&e.retryAt&&n.push(k("span",{class:"aria-sub"},`retry ${ct(Math.max(0,(e.retryAt-Date.now())/1e3))}`)),zo.replaceChildren(...n),Rt.textContent=e.note,Rt.hidden=!e.note,Co.textContent=e.station?[e.station.net,e.station.sta,e.station.loc,e.station.cha].join("."):"",Mo.textContent=oa(e.station?.net??"IU"),sa.update()}function Po(){const e=O?.demand();Fo.textContent=e?.names.length?`to ${e.names.join(", ")}`:X?"no instrument listens yet":"standalone"}function Ro(){pe.value=M.station,$e.value=M.custom,he.querySelector('[data-aria="custom-row"]').hidden=M.station!=="custom",Pt.setAttribute("aria-pressed",String(M.hold)),Pt.classList.toggle("aria-held",M.hold),ca.set(M.smoothing),No(),Po()}const W=e=>getComputedStyle(he).getPropertyValue(e).trim();function pa(e){if(document.visibilityState==="hidden")return null;const t=e.getBoundingClientRect();if(!t.width||!t.height)return null;const n=window.devicePixelRatio||1,o=Math.round(t.width*n),i=Math.round(t.height*n);(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);const r=e.getContext("2d");return r?.clearRect(0,0,o,i),r}function Io(){const e=pa(It);if(!e||!D)return;const{width:t,height:n}=It,o=D.min.length;e.fillStyle=W("--nc-ui-divider");for(let i=1;i<5;i++)e.fillRect(Math.round(i*t/5),0,1,n);if(Number.isFinite(D.playhead)){const i=D.playhead*t;e.globalAlpha=.14,e.fillStyle=W("--aria-magma"),e.fillRect(i-D.window*t,0,Math.max(1,D.window*t),n),e.globalAlpha=1}e.fillStyle=W("--aria-magma");for(let i=0;i<o;i++){const r=Math.floor(i/o*t),l=n/2-D.max[i]*(n/2-2),s=n/2-D.min[i]*(n/2-2);e.fillRect(r,l,Math.max(1,Math.ceil(t/o)),Math.max(1,s-l))}Number.isFinite(D.playhead)&&(e.fillStyle=W("--nc-ui-accent"),e.fillRect(Math.round(D.playhead*t)-1,0,2,n))}function jo(){const e=pa(jt);if(!e||!be)return;const{width:t,height:n}=jt;e.fillStyle=W("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),e.strokeStyle=W("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.beginPath();for(let o=0;o<be.length;o+=4){const i=o/be.length*t,r=n/2-be[o]*(n/2-3);o?e.lineTo(i,r):e.moveTo(i,r)}e.stroke()}function Bo(){To.textContent=j===null?"—":j.toFixed(2),qo.style.width=`${Math.round((j??0)*100)}%`,Do.setAttribute("aria-valuenow",j===null?"0":j.toFixed(2)),da.update();const e=pa(Bt);if(!e)return;const{width:t,height:n}=Bt;e.fillStyle=W("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),le.length&&(e.beginPath(),le.forEach((o,i)=>{const r=(600-le.length+i)/599*t,l=n-o*n;i?e.lineTo(r,l):e.moveTo(r,l)}),e.strokeStyle=W("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.stroke())}window.addEventListener("resize",()=>{Io(),jo(),Bo()});X?.providePreset?.({format:"netcomposer.aria",version:1,get:()=>wo(M),set:e=>{const t=yo(e);t&&me(t,t.station!==M.station||t.custom!==M.custom)}});window.addEventListener("pagehide",()=>{ve(en(O?.id??Ke,"removed")),H({type:"stop"})});window.matchMedia(ns).matches&&(he.dataset.ariaPhone="");H({type:"smoothing",sec:M.smoothing});H({type:"hold",on:M.hold});H({type:"speeds",speeds:Eo()});Ro();if(!X||(O?.demand().receivers??0)>0)Dt();else{const e=setInterval(()=>{document.visibilityState==="visible"&&he.getBoundingClientRect().width>0&&(clearInterval(e),Dt())},1e3)}
