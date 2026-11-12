(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=n(i);fetch(i.href,r)}})();function ri(){return(performance.timeOrigin+performance.now())/1e3}var si="nc-ui",li={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},nn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ke={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ci={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},te={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},di={light:{color:li.color,semantic:nn,component:Ke,runtime:ci},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},ke=e=>`--${si}-${e}`,Lt=nn["label-on-fill-dark"],Sn=nn["label-on-fill-light"],pi=te["label-min-contrast"],ui=/^#[0-9a-f]{6}$/i,hi=e=>typeof e=="string"&&ui.test(e),_e=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Mn(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=r=>{let s=(r+e/30)%12;return n-o*Math.max(-1,Math.min(s-3,9-s,1))};return`#${_e(i(0)*255)}${_e(i(8)*255)}${_e(i(4)*255)}`}function $a(e){let[t,n,o]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),i=Math.max(t,n,o),r=Math.min(t,n,o),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let d=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((n-o)/l%6):i===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:s}}function Cn(e){let[t,n,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function zt(e,t){let[n,o]=[Cn(e),Cn(t)].sort((i,r)=>r-i);return(n+.05)/(o+.05)}var Xe=e=>zt(e,Lt)>=zt(e,Sn)?Lt:Sn;function ka(e,t,n,o=pi){let i=Mn(e,t,n),r=Xe(i)===Lt?1:-1;for(let s=0;s<40&&zt(i,Xe(i))<o;s++)n+=r*.01,i=Mn(e,t,n);return i}function mi(e){let{h:t,s:n}=$a(e),o=ka(t,Math.min(n,te["surprise-on-max-saturation"]),te["surprise-on-lightness"]);return{fill:e,ink:Xe(e),on:o,onInk:Xe(o)}}var fi=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function gi(e,t=Math.random){let[n,o]=te["surprise-saturation"],[i,r]=te["surprise-lightness"],s=te["surprise-min-hue-gap"],l=hi(e)?$a(e).h:null,d=t()*360;return l!==null&&fi(d,l)<s&&(d=(l+s+t()*(360-2*s))%360),ka(d,n+t()*(o-n),i+t()*(r-i))}function bi(e){if(!e)return null;let t=mi(e);return{[ke("surprise-fill")]:t.fill,[ke("surprise-ink")]:t.ink,[ke("surprise-on")]:t.on,[ke("surprise-on-ink")]:t.onInk}}var xi=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,wi=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Tn(e){let[t,n,o]=[1,3,5].map(l=>xi(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),s=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function yi([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(s=>_e(wi(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var vi=te["velocity-range"],Ea={min:Ke.rhythm["velocity-min"],max:Ke.rhythm["velocity-max"]},Ln=Object.fromEntries(Object.entries(di).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function $i(e,t=Ea){let[n,o]=vi,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,r=(i-n)/(o-n),s=t.ink??Ke.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=Tn(t.min),d=Tn(t.max);return{velocity:i,t:r,fill:yi(l.map((c,p)=>c+(d[p]-c)*r)),ink:s}}function zn(e,t=Ea){return{[ke("velocity-fill")]:$i(e,t).fill}}var Aa="data-nc-theme",Fn="nc-ui-theme-change",ki="(prefers-color-scheme: dark)",Sa=e=>e?.documentElement??null,Ma=e=>e?.defaultView?.matchMedia?.(ki)??null,Ei=e=>e==="light"||e==="dark"?e:"system";function Ai(e=globalThis.document){return Ei(Sa(e)?.getAttribute(Aa))}function Ft(e=globalThis.document){let t=Ai(e);return t!=="system"?t:Ma(e)?.matches?"dark":"light"}function Ca(e,t=globalThis.document){let n=Sa(t);if(!n)return()=>{};let o=Ft(t),i=()=>{let d=Ft(t);d!==o&&(o=d,e(d))},r=t.defaultView?.MutationObserver,s=r?new r(i):null;s?.observe(n,{attributes:!0,attributeFilter:[Aa]});let l=Ma(t);return l?.addEventListener?.("change",i),t.addEventListener(Fn,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(Fn,i)}}var Si={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Mi={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Ci={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Ti={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},lt={};for(let[e,t]of Object.entries(Mi))lt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Ti))lt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Ci))lt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Si.renames.map(e=>[e.old,e.new]));function Ta(e){let t=lt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function T(e){return Ta(e).prop}function a(e){return`var(${T(e)})`}function Li(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(T(t)));return Number.isFinite(n)?n:0}function F(e,t){let n=Ta(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let s=(o.defaultView??window).getComputedStyle(i),l=n.kind==="family"?s.fontFamily:n.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function La(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function zi(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var Fi="[data-modulated], [data-modulated] *";function ft(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Nn(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Ni(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${T("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${T("divider")}: ${a(`module-div-stack-${o}`)};
      ${T("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${T("text-sub")}: ${a("module-sub-stack-1")};
      ${T("divider")}: ${a("module-div-stack-1")};
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
${Fi} { transition: none; }
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
  ${T("text-sub")}: ${a("module-sub-stack-1")};
  ${T("divider")}: ${a("module-div-stack-1")};
  ${T("slider-track")}: ${a("module-div-stack-1")};
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
  ${T("text-sub")}: ${a("module-sub-stack-1")};
  ${T("divider")}: ${a("module-div-stack-1")};
  ${T("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${T("text-sub")}: ${a("module-sub-stack-1")};
  ${T("divider")}: ${a("module-div-stack-1")};
  ${T("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${T("text-sub")}: inherit;
  ${T("divider")}: inherit;
  ${T("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${T("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${T("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${T("divider")}: ${a("strip-divider")}; }
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
${Nn("")}
}
@media (max-width: 1023px) {
${Nn("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${ft("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${ft("")}
}
@media (max-width: 1023px) {
${ft("html[data-nc-landscape] ")}
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
`}var gt=null,qi="nc-ui-fallback";function za(e=globalThis.document){if(!e?.documentElement||(e.documentElement,gt&&gt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${qi} {
${Ni()}
}
`,e.head.append(t),gt=t}var Di=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Pi=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Di,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Pi(document);function Fa(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),n.append(o);let s=!1,l=c=>{s=c===!0,n.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let d=()=>{l(!s),e.onChange?.(s)};return n.addEventListener("click",d),{el:n,get checked(){return s},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Na=new WeakMap,qn=.25;function Ii(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let r=0,s=e.step??.005,l=e.onChange,d=e.onReset,c=m=>Math.min(1,Math.max(0,m)),p=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},u=m=>{let h=c(m);h!==r&&(r=h,p(),l?.(h))},b=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let h=n.getBoundingClientRect();m.target!==i&&h.height>0&&u(1-(m.clientY-h.top)/h.height),b=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let h=n.getBoundingClientRect().height||1,y=(b-m.clientY)/h*(m.shiftKey?qn:1);b=m.clientY,u(r+y)});let w=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",m=>{m.preventDefault(),d?.()}),n.addEventListener("keydown",m=>{let h=m.shiftKey?s*qn:s,y={ArrowUp:r+h,ArrowRight:r+h,ArrowDown:r-h,ArrowLeft:r-h,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};m.key in y&&(m.preventDefault(),u(y[m.key]))});let f={el:n,get value(){return r},get dragging(){return g},set(m){g||(r=c(Number(m)||0),p())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(d=m.onReset)}};return f.setLabel(e.label),f.set(e.value??0),f.setText(e.valueText),Na.set(n,f),f}function Bi(e){return Na.get(e)}var qa=new WeakMap,ji=.2,Ri=1.5,Hi=.5;function Oi(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function Dn(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Oi(o.getComputedStyle(e).getPropertyValue(T(t)),n)}function _i(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let f=0;f<n;f++){let m=t.createElement("span");m.className="nc-meter-bar";let h=t.createElement("span");h.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",m.append(h,y,x),r.append(m),s.push({peak:h,rms:y,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let l=e.label,d=e.onClear,c=!1,p=-1,u=-1,b=()=>{i.dataset.lit=c?"true":"false",i.setAttribute("aria-pressed",c?"true":"false"),i.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),i.title=c?"Clipped. Click to clear":"Clip light"},g=(f,m,h,y)=>{let x=Math.round(y*1e3)/1e3;h[m]!==x&&(h[m]=x,f.style.transform=m==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};i.addEventListener("click",()=>{w.clear(),d?.()});let w={el:o,get clipped(){return c},update(f,m){p<0&&(p=Dn(o,"motion-meter-fall",ji)),u<0&&(u=Dn(o,"motion-meter-hold",Ri));let h=Math.max(0,Math.min(.25,Number(m)||0)),y=p>0?Math.exp(-h/p):0;s.forEach((x,v)=>{let $=f[v]??f[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number($.peak)||0)),E=Math.min(k,Math.max(0,Number($.rms)||0));$.over&&w.clip(),x.level.peak=k>=x.level.peak?k:k+(x.level.peak-k)*y,x.level.rms=E>=x.level.rms?E:E+(x.level.rms-E)*y,x.holdAge+=h,k>=x.holdAt?(x.holdAt=k,x.holdAge=0):x.holdAge>u&&(x.holdAt=Math.max(k,x.holdAt-Hi*h)),g(x.peak,"peak",x.shown,x.level.peak),g(x.rms,"rms",x.shown,x.level.rms),g(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,b())},clear(){c=!1,b()},reset(){for(let f of s)f.level.peak=0,f.level.rms=0,f.holdAt=0,f.holdAge=0,g(f.peak,"peak",f.shown,0),g(f.rms,"rms",f.shown,0),g(f.hold,"hold",f.shown,0),f.hold.dataset.off="true"},setLabel(f){l=f,b()},configure(f){f.onClear&&(d=f.onClear)}};return b(),w.reset(),qa.set(o,w),w}function Vi(e){return e?qa.get(e):void 0}var Ui=3,Gi=new Set(["freq","q","rate","time","log"]);function an(e,t,n){return!e||!Gi.has(e)||!(n>t)?"linear":t>0?"log":"power"}function De(e,t,n){return an(e,t,n)!=="linear"}function Qe(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),s=an(e,t,n);if(s==="log")return Math.log(r/t)/Math.log(n/t);let l=(r-t)/(n-t);return s==="power"?Math.cbrt(l):l}function Da(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=an(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**Ui:i)}function Pa(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function ze(e,t,n,o){return Math.round(Qe(e,t,n,o)*1e3)}function Je(e,t,n,o,i){return Pa(Da(e,t,n,Number(o)/1e3),t,n,i)}function Yi(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function on(e,t,n,o,i,r=!1,s){let l=ze(e,t,n,o),d=Yi(l,i,r);if(d===null)return null;let c=Je(e,t,n,d,s),p=Math.sign(d-l),u=Pa(Number(o),t,n,s);for(;p!==0&&c===u&&d>0&&d<1e3;)d+=p,c=Je(e,t,n,d,s);return c}function Pn(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Wi(e,t,n,o=n/6){let i=e.some(p=>p===null),r=Math.max(0,n-(i?o:0)),s=e.reduce((p,u,b)=>u===null?p:p+Pn(t[b]),0),l=s>0?r/s:0,d=e.map(p=>p===null?0:Math.min(r,Pn(p)*l));if(i){let p=d.reduce((b,g)=>b+g,0),u=e.indexOf(null);d[u]=Math.max(o,n-p)}let c=[0];for(let p of d)c.push(Math.round((c[c.length-1]+p)*100)/100);return i&&(c[c.length-1]=n),c}function Ki(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function J(e){return Math.max(0,Math.min(1,e))}function Ia(e,t){let{ctx:n,w:o,h:i}=Ki(e);if(!n)return;n.clearRect(0,0,o,i);let r=zi(e);if(t.paint==="swatch"){let d=F(e,"accent"),c=F(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,o/2,i),n.fillStyle=c,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Ji(n,o,i,t,e,r);return}if(t.paint==="filter"){let d=t.mode??"lp",c=F(e,La(d)),p=F(e,"divider"),u=J(t.cutoff??.5),b=.08+(1-J(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=o;g++){let w=g/Math.max(1,o),f=0;d==="lp"?f=w<u?1:Math.max(0,1-(w-u)/b):d==="hp"?f=w>u?1:Math.max(0,1-(u-w)/b):f=Math.max(0,1-Math.abs(w-u)/b);let m=i*.78-f*i*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=F(e,"text-sub"),n.font=r,n.fillText(d.toUpperCase(),0,i),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=F(e,"accent");let d=Math.max(0,t.attack??0),c=Math.max(0,t.decay??.4),[p,u,b]=Wi([d,c],t.max??[1,4],o),g=2,w=i-1;n.beginPath(),n.moveTo(p,w),n.lineTo(u,g);let f=Math.max(1,Math.ceil(b-u));for(let m=1;m<=f;m++){let h=m/f;n.lineTo(u+(b-u)*h,w-(w-g)*Math.exp(-4.6*h)*(1-h*.01))}n.lineTo(b,w),n.lineTo(o,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[c,p]=Array.isArray(t.region)?t.region:[0,1],u=F(e,"accent"),b=F(e,"text-sub"),g=i/2;n.fillStyle=F(e,"accent-soft"),n.fillRect(J(c)*o,0,(J(p)-J(c))*o,i),n.strokeStyle=F(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(o,g),n.stroke();let w=Math.floor(d.length/2);for(let f=0;f<w;f++){let m=(f+.5)/w*o,h=Math.max(-1,Math.min(1,d[f*2]??0)),y=Math.max(-1,Math.min(1,d[f*2+1]??0)),x=(f+.5)/w;n.strokeStyle=x>=c&&x<=p?u:b,n.beginPath(),n.moveTo(m,g-y*(g-1)),n.lineTo(m,g-h*(g-1)+.5),n.stroke()}n.strokeStyle=u;for(let f of[c,p,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(J(f)*(o-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=F(e,"text"),n.fillRect(Math.round(J(t.position)*(o-1)),0,1,i)),w||(n.fillStyle=b,n.font=r,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let d=J(t.level??0);n.fillStyle=F(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=F(e,"accent"),n.fillRect(0,i*.4,o*d,i*.2),e.dataset.ncAccent=n.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;n.fillStyle=F(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=F(e,"rhythm.playhead"),n.fillRect(l/s*o,i*.3,Math.max(1,o/s),i*.4),e.dataset.ncAccent=F(e,"accent")}var Ce=20,Nt=2e4,bt=24,In=-60;function Xi(e,t,n,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*n),d,c,p;e==="hp"?[d,c,p]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[d,c,p]=[l,0,-l]:[d,c,p]=[(1-s)/2,1-s,(1-s)/2];let u=1+l,b=-2*s,g=1-l,w=2*Math.PI*o/i,f=(x,v,$)=>x+v*Math.cos(w)+$*Math.cos(2*w),m=(x,v)=>-(x*Math.sin(w)+v*Math.sin(2*w)),h=Math.hypot(f(d,c,p),m(c,p)),y=Math.hypot(f(u,b,g),m(b,g));return y>0?h/y:0}function Qi(e,t){return Math.log(Math.max(Ce,Math.min(Nt,e))/Ce)/Math.log(Nt/Ce)*t}function Bn(e,t,n){let o=Math.max(In,Math.min(bt,e));return t+(bt-o)/(bt-In)*(n-t)}function Ji(e,t,n,o,i,r){let s=o.mode??"lp",l=F(i,La(s)),d=F(i,"divider"),c=F(i,"text-sub"),p=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,b=Math.max(u+4,n-p-3),g=o.q??Math.SQRT1_2,w=Math.round(Bn(0,u,b))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let f=0;f<=t;f++){let m=Ce*(Nt/Ce)**(f/Math.max(1,t)),h=o.open?1:Xi(s,o.hz,g,m,o.sampleRate),y=Bn(20*Math.log10(Math.max(1e-5,h)),u,b);f===0?e.moveTo(f,y):e.lineTo(f,y)}if(e.strokeStyle=l,e.stroke(),!o.open){let f=Math.round(Qi(o.hz,t))+.5;e.strokeStyle=c,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(f,u),e.lineTo(f,b),e.stroke(),e.setLineDash?.([])}e.fillStyle=c,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function U(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function Zi(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var ce=20,Pe=2e4,rn=Math.log(Pe/ce),qt=32,er=250,tr=-100,nr=1200,ar=4.5,jn=-6,re=-96,or=48,Rn=[100,1e3,1e4],ir=[6,12];function be(e,t){return Math.log(Math.max(ce,Math.min(Pe,e))/ce)/rn*t}function Ve(e,t){return ce*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*rn)}function ne(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Dt(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Ba=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function rr(e,t,n,o){let i=n?3:1,r=d=>({db:Math.max(-o,Math.min(o,e.db+d*i))}),s=d=>({hz:Math.max(e.minHz??ce,Math.min(e.maxHz??Pe,e.hz*2**(d*i/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function sn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function sr(e,t,n,o,i,r,s,l,d){let c=d?.25:1,p={},u=Math.max(1,r/2-l);if(p.db=Math.max(-s,Math.min(s,t.db-o*c/u*s/sn(e))),e.moveHz){let b=t.hz*Math.exp(n*c/Math.max(1,i)*rn);p.hz=Math.max(e.minHz??ce,Math.min(e.maxHz??Pe,b))}return p}function lr(e,t,n,o,i){let r=Math.max(0,n.left)+1,s=Math.min(n.right,i)-1,l=Math.min(t.width*3+o*2,s-r),d=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var q=new WeakMap;function cr(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,o.append(i,r);for(let d of e.bands)o.append(dr(n,d,t));o.append(s),o.addEventListener("click",d=>{if(!Va(n)||d.button>0)return;let c=_a(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),q.set(n,{control:e,cache:null,spec:null,active:null}),Ra(n,e),n}function ja(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function dr(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},r=()=>i()?.bands.find(c=>c.id===t.id)??null,s=null;o.addEventListener("pointerdown",c=>{if(c.button!==0)return;let p=r();p&&(c.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(c.pointerId),s={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",Z(e,t.id))}),o.addEventListener("pointermove",c=>{if(!s||c.pointerId!==s.id)return;let p=i(),u=r(),b=q.get(e);if(!p||!u||!b?.box)return;let{w:g,h:w,pad:f}=b.box;p.onBand(u.id,sr(u,s.start,c.clientX-s.x,c.clientY-s.y,g,w,p.range??18,f,c.shiftKey))});let l=c=>{!s||c.pointerId!==s.id||(s=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&Z(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",c=>{c.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",c=>{let p=i(),u=r();if(!p||!u)return;let b=rr(u,c.key,c.shiftKey,p.range??18);b&&(c.preventDefault(),b==="reset"?p.onReset?.(u.id):p.onBand(u.id,b),Z(e,u.id))});let d=null;return o.addEventListener("wheel",c=>{let p=i(),u=r();if(!p||!u?.moveQ)return;c.preventDefault();let b=c.timeStamp;(!d||b-d.t>400)&&(d={q:u.q,t:b});let g=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;d.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,d.q*2**(-g/240))),d.t=b,p.onBand(u.id,{q:d.q}),Z(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>Z(e,t.id)),o.addEventListener("focus",()=>Z(e,t.id)),o.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==o&&Z(e,null)}),o.addEventListener("blur",()=>{s||Z(e,null)}),o}function Z(e,t){let n=q.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?we(e):ln(e)}function ln(e){let t=q.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(o&&w.dataset.band===o.id?w.dataset.active="true":delete w.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,Ba(o.db)];o.kind==="peak"?i.push(Dt(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${Dt(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(pr(t.control,o)),n.hidden=!1;let{w:r,h:s,pad:l}=t.box,d=be(o.hz,r),c=ne(o.db*sn(o),s,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,b=Math.max(0,Math.min(r-p,d-p/2)),g=c-u-l*1.5>=0?c-u-l*1.5:Math.min(s-u,c+l*1.5);n.style.left=`${Math.round(b)}px`,n.style.top=`${Math.round(g)}px`}function pr(e,t){return e.bands.indexOf(t)%3+1}function Ra(e,t){let n=q.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",cn(e);let o=t.range??18;t.bands.forEach((i,r)=>{let s=ja(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-o)),s.setAttribute("aria-valuemax",String(o)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${Ba(i.db)}, ${Dt(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),we(e),br(e)}function Ha(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:n}}function Oa(e){return{curve:U(e,"eq-curve"),fill:U(e,"eq-fill"),quiet:U(e,"text-sub"),grid:U(e,"eq-grid"),zero:U(e,"divider"),label:U(e,"text-sub"),spectrum:U(e,"eq-spectrum"),bands:[U(e,"eq-band-1"),U(e,"eq-band-2"),U(e,"eq-band-3")]}}function ur(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function we(e){q.has(e)&&cn(e);let t=q.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:s}=Ha(n);if(!i)return;let l=Math.max(8,Math.round(s*.06)),d=o.range??18;t.box={w:r,h:s,pad:l},t.colours=Oa(e);let c=t.colours,p=ur(o,r);if(!t.cache||t.cache.key!==p){let v=Math.max(64,Math.ceil(r)+1),$=new Float64Array(v);for(let E=0;E<v;E++)$[E]=Ve(E/(v-1)*r,r);let k=null;try{k=typeof o.response=="function"?o.response($):null}catch{k=null}t.cache={key:p,freqs:$,total:k?.total??new Float64Array(v),bands:k?.bands??[]}}i.clearRect(0,0,r,s);let u=Zi(e),b=o.on!==!1;hr(i,r,s,d,l,c,u);let{freqs:g,total:w,bands:f}=t.cache,m=Array.from(g,v=>be(v,r)),h=ne(0,s,d,l);f.forEach((v,$)=>{if(!v||!v.some(S=>Math.abs(S)>.05))return;let k=b?c.bands[$%3]:c.quiet,E=Array.from(v,S=>ne(S,s,d,l));i.save(),t.active&&o.bands[$]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=k,Hn(i,m,E,h)),i.globalAlpha=b?.75:.4,i.strokeStyle=k,i.lineWidth=.75,xt(i,m,E),i.restore()});let y=Array.from(w,v=>ne(v,s,d,l)),x=b?c.curve:c.quiet;i.save(),i.fillStyle=b?c.fill:c.quiet,i.globalAlpha=b?.2:.08,Hn(i,m,y,h),i.restore(),i.save(),i.strokeStyle=b?c.fill:x,i.lineJoin="round",i.lineCap="round",b&&(i.globalAlpha=.16,i.lineWidth=4,xt(i,m,y)),i.globalAlpha=1,i.strokeStyle=x,i.lineWidth=1.25,xt(i,m,y),i.restore(),mr(e),ln(e)}function hr(e,t,n,o,i,r,s){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let c=1;c<=9;c++){let p=d*c;if(p<ce||p>Pe)continue;let u=Math.round(be(p,t))+.5;e.globalAlpha=Rn.includes(p)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let d of ir)if(!(d>o))for(let c of[1,-1]){let p=Math.round(ne(d*c,n,o,i))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(ne(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Rn){let c=d>=1e3?`${d/1e3}k`:String(d),p=e.measureText(c).width,u=be(d,t)+3;e.fillText(c,u+p+2>t?be(d,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>o)continue;let c=ne(d,n,o,i);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(c)-1)}e.restore()}function Ze(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function xt(e,t,n){e.beginPath(),Ze(e,t,n),e.stroke()}function Hn(e,t,n,o){e.beginPath(),Ze(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function _a(e){return e.closest("[data-nc-maxable]")}function Va(e){let t=_a(e);return!!t&&!t.hasAttribute("data-nc-max")}function cn(e){let t=Va(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=q.get(e);n?.active&&(n.active=null,ln(e))}return t}function mr(e){cn(e);let t=q.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=ja(e,s.id);l instanceof HTMLElement&&(l.style.left=`${be(s.hz,n).toFixed(1)}px`,l.style.top=`${ne(s.db*sn(s),o,r,i).toFixed(1)}px`)}}function fr(e,t,n,o){let i=o/2/n,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let c=(d-.5)/(e-1)*t,p=(d+.5)/(e-1)*t,u=Ve(c,t),b=Ve(p,t),g=Ve(d/(e-1)*t,t);r[d]=Math.min(n-1,u/i),s[d]=Math.min(n-1,b/i),l[d]=ar*Math.log2(g/1e3)}return{lo:r,hi:s,tilt:l}}function gr(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let s=t-o,l=e[o]??-1/0,d=e[Math.min(e.length-1,o+1)]??l;return l+(d-l)*s}let r=-1/0;for(let s=o;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function br(e){let t=q.get(e);if(t){if(!t.control.spectrum){Ga(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=q.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),Pt(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Pt(e)}}function Pt(e){let t=q.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){Ua(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=It(e),n.onVis||(n.onVis=()=>Pt(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Bt(e,!1)}function It(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Bt(e,t){let n=q.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,wt(e,It(e))),er):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,wt(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,wt(e,It(e))),qt))}function Ua(e){let t=q.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function Ga(e){let t=q.get(e)?.spec;if(!t)return;Ua(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=q.get(e);n&&(n.spec=null)}function wt(e,t){let n=q.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){Ga(e);return}if(!o.analyser)return;if(t-o.last<qt-4&&!o.idle){Bt(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):qt/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:d}=Ha(r);if(!s)return;let c=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==c||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:c,w:l,sr:p,...fr(c,l,o.buf.length,p)},o.disp=new Float32Array(c).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,b=or*i,{lo:g,hi:w,tilt:f}=o.map;for(let h=0;h<c;h++){let y=gr(o.buf,g[h],w[h]);y>u&&(u=y);let x=y+f[h],v=o.disp[h]-b;o.disp[h]=x>v?x:v}u>tr&&(o.loud=t);let m=t-o.loud>nr;s.clearRect(0,0,l,d),(!m||o.disp.some(h=>h>re))&&xr(s,l,d,o.disp,n.colours??Oa(e)),o.idle=m&&!o.disp.some(h=>h>re),Bt(e,o.idle)}function xr(e,t,n,o,i){let r=o.length,s=new Array(r),l=new Array(r),d=c=>{let p=o[Math.max(0,Math.min(r-1,c))];return Number.isFinite(p)?p:re};for(let c=0;c<r;c++){let p=d(c)*.36+(d(c-1)+d(c+1))*.22+(d(c-2)+d(c+2))*.1,u=(Math.max(re,Math.min(jn,Number.isFinite(p)?p:re))-re)/(jn-re);s[c]=c/(r-1)*t,l[c]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Ze(e,s,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Ze(e,s,l),e.stroke(),e.restore()}var H=new WeakMap,wr=450,yr=6,vr=33,yt=24,$r="http://www.w3.org/2000/svg";function kr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Er(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Ar(e,t,n,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let s=t<o?1:-1;for(let l=t;l!==o+s;l+=s){let d=(l-t)/(o-t);r[l]=Math.round((n+(i-n)*d)*100)/100}return r}function Sr(e,t){let n=e.steps[t],o=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function se(e,t){let n=document.createElementNS($r,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function Ya(e){let t=se("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(se("path",{d:e})),t}function Mr(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,n.append(o,i,r,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return H.set(n,d),Tr(n,o),Lr(n,s),Wa(n,e),n}function O(e){let t=H.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Cr(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function vt(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=Cr(e);return{i:Er(t.clientX,o),level:kr(t.clientY-n.top,n.height)}}function Tr(e,t){let n=H.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let s=O(e);if(!s||r.button>0||!s.steps.length)return;r.preventDefault(),et(e),t.setPointerCapture?.(r.pointerId);let l=vt(t,r),d=s.steps.map(c=>c.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,On(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let c=n.drag;!c||c.moved||(c.long=!0,O(e)?.onLevels(c.start.slice(),!0),$t(e,c.i))},wr)}),t.addEventListener("pointermove",r=>{let s=n.drag;if(!s||s.id!==r.pointerId||s.long||!s.moved&&Math.hypot(r.clientX-s.x,r.clientY-s.y)<yr)return;s.moved=!0,o();let l=vt(t,r);On(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let i=r=>{let s=n.drag;!s||s.id!==r.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(r.pointerId),s.long||O(e)?.onLevels(s.levels.slice(),!0),jt(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let s=n.drag;!s||s.id!==r.pointerId||(o(),n.drag=null,s.long||O(e)?.onLevels(s.start.slice(),!0),jt(e,-1))}),t.addEventListener("contextmenu",r=>{O(e)?.onShape&&(r.preventDefault(),$t(e,vt(t,r).i))}),t.addEventListener("keydown",r=>{let s=O(e);if(!s||!s.steps.length)return;let l=s.steps.length,d=Math.min(n.focus,l-1),c=s.steps[d].level,p=u=>{let b=s.steps.map(g=>g.level);b[d]=Math.round(Math.max(0,Math.min(1,u))*100)/100,s.onLevels(b,!0)};switch(r.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":p(c+(r.shiftKey?.01:.05));break;case"ArrowDown":p(c-(r.shiftKey?.01:.05));break;case"PageUp":p(c+.25);break;case"PageDown":p(c-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!s.onShape)return;$t(e,d);break;default:return}r.preventDefault(),Rt(e)}),t.addEventListener("focus",()=>Rt(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function On(e,t,n,o,i,r){let s=H.get(e).drag;s&&(s.levels=Ar(s.levels,t,n,o,i),jt(e,o,s.levels[o]),O(e)?.onLevels(s.levels.slice(),r))}function jt(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function Rt(e){let t=H.get(e),n=e.querySelector(".nc-lsteps-plot"),o=O(e);if(!n||!o)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",Sr(o,i))}function Lr(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),et(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),H.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&et(e)}}function $t(e,t){let n=O(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let r=H.get(e);r.focus=t,o.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,o.append(s);for(let g of n.shapes??[]){let w=document.createElement("button");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",n.steps[t]?.shape===g.value?"true":"false"),g.icon&&w.append(Ya(g.icon)),w.append(document.createTextNode(g.label)),w.addEventListener("click",()=>{O(e)?.onShape?.(t,g.value),et(e,!0)}),o.append(w)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),c=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=c?c.left+c.width/2-d.left:0,b=Math.max(0,Math.min(d.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(b)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function et(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",H.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function zr(e,t){let n=H.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(r),r%4===0&&r>0&&(s.dataset.beat="true");let l=se("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(se("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),se("path",{class:"nc-lsteps-env",d:""}),se("path",{class:"nc-lsteps-top",d:""}),se("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),o.append(s);let d=document.createElement("span");r%4===0&&(d.textContent=String(r+1)),r%4===0&&r>0&&(d.dataset.beat="true"),i.append(d)}}}function Wa(e,t){let n=H.get(e);if(!n)return;n.control=t;let o=t.steps.length;zr(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),s=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((g,w)=>{let f=s[w];if(!f)return;let m=String((w%2?1-r:r)*2);f.style.setProperty("--nc-lsteps-grow",m),l[w]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&w>=t.played?f.dataset.out="true":f.removeAttribute("data-out"),f.dataset.zero=g.level<=0?"true":"false";let h=Math.max(0,Math.min(1,g.level)),y=f.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-h*100)),y.setAttribute("height",String(h*100));let x=t.curve?t.curve(w,yt):null,v="M0 100",$="";for(let k=0;k<=yt;k++){let E=x?Math.max(0,Math.min(1,x[k]??h)):h,S=k/yt*100,M=100-E*100;v+=` L${S.toFixed(2)} ${M.toFixed(2)}`,$+=`${k?" L":"M"}${S.toFixed(2)} ${M.toFixed(2)}`}f.querySelector(".nc-lsteps-env").setAttribute("d",`${v} L100 100 Z`),f.querySelector(".nc-lsteps-top").setAttribute("d",$)});let d=e.querySelector(".nc-lsteps-shapes"),c=(t.shapes??[]).map(g=>`${g.value}:${g.label}`).join();if(c!==n.shapeKey){n.shapeKey=c,d.textContent="";for(let g of t.shapes??[]){let w=document.createElement("button");w.type="button",w.className="nc-lsteps-shape",w.setAttribute("role","tab"),w.dataset.shape=String(g.value),g.icon&&w.append(Ya(g.icon)),w.append(document.createTextNode(g.label)),w.addEventListener("click",()=>O(e)?.onShapeAll?.(g.value)),d.append(w)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,b=t.steps.slice(0,p).every(g=>g.shape===u);for(let g of d.querySelectorAll(".nc-lsteps-shape")){let w=b&&g.dataset.shape===String(u);g.setAttribute("aria-selected",w?"true":"false"),g.tabIndex=w||!b&&g===d.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),Rt(e),n.last=-2,Fr(e)}function Fr(e){let t=H.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&kt(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){kt(e,null);return}r-o>=vr&&(o=r,kt(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function kt(e,t){let n=H.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var Nr=.8912509381337456,Ht=32,qr=250,Dr=1200,Pr=.2,Ka=1.5;function Ir(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Br(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var tt=new WeakMap,_n=new WeakMap;function Vn(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function jr(e){let t=_n.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let s=tt.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),Te(s))}me(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Te(i);me(t)}),_n.set(e,t),t}var Xa=e=>e.els.some(t=>t.isConnected);function Rr(e){if(!e.loop.io)return Xa(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Te(e){let t=!e.dead&&!!e.source&&Rr(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=dn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Vt(e))}function dn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function me(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Qa(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=dn(e)),!e.raf&&!e.timer&&Ot(e,!1)}function Ot(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Un(e,dn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),qr):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Un(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),Ht)}function Qa(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Un(e,t){if(t-e.last<Ht-4&&!e.idle&&e.last){Ot(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Ht/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!Xa(r)){(r.placed||e.frames-r.born>90)&&Ja(r);continue}r.placed=!0,r.open&&(i=!0,Hr(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Qa(e);return}e.idle=t-e.loud>Dr&&!o,Ot(e,e.idle)}function Hr(e,t,n){if(e.fall<0){let b=e.els[0];e.fall=Vn(b,"motion-meter-fall",Pr),e.hold=Vn(b,"motion-meter-hold",Ka)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,s=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=s&&Number(o.out)||0,d=s?"2":"1";if(e.rows!==d){e.rows=d;for(let b of e.els)b.dataset.ncRows=d}let c=e.fall>0?Math.exp(-t/e.fall):0,p=[r,l],u=!1;for(let b=0;b<2;b++){let g=Ir(p[b]);g>0&&(u=!0),e.disp[b]=g>=e.disp[b]?g:g+(e.disp[b]-g)*c,e.disp[b]<.001&&(e.disp[b]=0),p[b]>=Nr&&(e.clipAt[b]=n);let w=e.clipAt[b]>0&&n-e.clipAt[b]<e.hold*1e3;_t(e,b,e.disp[b],w)}return u}function _t(e,t,n,o){let i=Math.round(n*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function Vt(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,_t(e,0,0,!1),_t(e,1,0,!1)}function Ja(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),tt.get(t)===e&&tt.delete(t)}function Or(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=jr(o),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Ka,rows:""};for(let s of n)tt.set(s,r),i.io?.observe(s);if(i.recs.add(r),Vt(r),!i.io){let s=o.defaultView,l=()=>{Te(r),me(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){Te(r),me(i);return}r.open&&(r.open=!1,r.source?.close?.(),Vt(r)),r.source=l,Te(r),me(i)}},destroy(){r.dead||Ja(r),me(i)}}}var Za={slop:8,longPressMs:500,pitchPx:16},_r=class{constructor(e,t,n=Za){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,n);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Vr(e,t,n,o=Za){let i=!1,r=0,s=(c,p)=>{let u=e.ownerDocument.elementFromPoint?.(c,p),b=[...e.querySelectorAll(t)],g=u?b.findIndex(m=>m===u||m.contains(u)):-1;if(g>=0)return g;let w=-1,f=Number.POSITIVE_INFINITY;return b.forEach((m,h)=>{if(m.hidden)return;let y=m.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let x=Math.abs(c-(y.left+y.width/2));x<f&&x<=y.width&&(w=h,f=x)}),w},l=new _r(s,c=>{(c.kind==="paint"||c.kind==="long")&&(i=!0),n(c)},o),d=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",c=>{c.button>0||(i=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),r=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{i&&(i=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var eo="netcomposer.groups.v1";function pn(){try{return globalThis.localStorage??null}catch{return null}}function to(e=pn(),t=eo){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function Ur(e,t,n,o=eo){let i=to(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function Gr(e,t=pn()){return to(t).get(e.id)??e.open===!0}function Yr(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",d.id);for(let c of e.controls)d.append(n(c,t));return i.addEventListener("click",()=>{let c=o.dataset.ncOpen!=="true";Ur(pn(),e.id,c),Ut(o,c);let p=t(o);p?.type==="group"&&p.onToggle?.(c)}),o.append(i,d),no(o,e),Ut(o,Gr(e)),ao(o,e),o}function Ut(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function no(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function ao(e,t){no(e,t)&&Ut(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var Be="application/x-nc-pad",Gn="http://www.w3.org/2000/svg";function Wr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let r=0;r<n;r++){let s=Math.floor(r*t/n),l=Math.max(s+1,Math.floor((r+1)*t/n)),d=0,c=0;for(let u=s;u<l;u++)d=Math.min(d,e[2*u]??0),c=Math.max(c,e[2*u+1]??0);let p=n===1?50:r/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Kr(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(Xr(n,r,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&Ue(n)}),io(n,e),n}function Xr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Gn,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let c=document.createElementNS(Gn,"path");return d.append(c),o.append(i,r,s,l,d),Jr(e,o,t,n),r.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&oo(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(Be,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(Be)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(Be)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let b=p.dataTransfer?.getData(Be);if(b!==void 0&&b!==""){p.preventDefault(),p.stopPropagation();let w=Number(b);w!==t&&u.onMove?.(w,t,p.altKey);return}let g=p.dataTransfer?.files?.[0];g&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,g))}),o}function Qr(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Jr(e,t,n,o){let i=0,r=!1,s=0,l=0,d=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;r=!1,s=c.clientX,l=c.clientY,d();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&c.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=Yn(e,t,n,o)},450)))}),t.addEventListener("pointermove",c=>{i&&Math.hypot(c.clientX-s,c.clientY-l)>8&&d()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,d);t.addEventListener("contextmenu",c=>{c.preventDefault(),d(),r=Yn(e,t,n,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}Qr(e,n,o)})}function Yn(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;Ue(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Ue(e)}),s.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of r){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{Ue(e);let b=o(e);b?.type==="padGrid"&&(p.id==="rename"&&b.onRename?oo(e,t,n,o):b.onMenu?.(n,p.id))}),l.append(u)}e.append(s,l);let d=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-d.left}px`,l.style.top=`${c.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function oo(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let d=!1,c=p=>{if(d)return;d=!0;let u=r.value.trim();r.remove(),t.focus();let b=o(e);p&&u&&b?.type==="padGrid"&&b.onRename?.(n,u)};r.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?c(!0):p.key==="Escape"&&c(!1)}),r.addEventListener("blur",()=>c(!0));for(let p of["pointerdown","click","dblclick"])r.addEventListener(p,u=>u.stopPropagation());e.append(r),r.focus(),r.select()}function Ue(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function io(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),d=r.querySelector(".nc-padgrid-pad-wave path"),c=r.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=o.label),l&&(l.textContent=o.hint??""),d?.setAttribute("d",Wr(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let p=t.selected===i;p?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",p?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function I(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function ct(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function Wn(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Fe(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Zr=450,Kn=8;function Y(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function es(e){let t=Li(e,"target-min");return t>0?t:44}function ts(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=es(e),o=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){s.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,p=d-o,u=d+o,b=c-o,g=c+o;for(let w=0;w<t.length;w++){if(r===w)continue;let f=i[w];if(!f||f.width===0)continue;let m=f.left+f.width/2,h=f.top+f.height/2;Math.abs(h-c)<o*2&&(m>d?u=Math.min(u,(d+m)/2):m<d&&(p=Math.max(p,(d+m)/2))),Math.abs(m-d)<o*2&&(h>c?g=Math.min(g,(c+h)/2):h<c&&(b=Math.max(b,(c+h)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),b=Math.min(b,l.top),g=Math.max(g,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${b-l.top}px`,s.style.width=`${Math.max(0,u-p)}px`,s.style.height=`${Math.max(0,g-b)}px`,s.style.transform="none"}}function ro(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Xn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function le(e,t){switch(e.type){case"slider":return ns(e,t);case"select":return os(e,t);case"toggle":return is(e,t);case"button":return rs(e,t);case"readout":return ss(e);case"label":return ps(e);case"note":return Qn(e);case"knob":return ms(e,t);case"choice":return fs(e,t);case"slotRow":return gs(e,t);case"stepGrid":return ys(e,t);case"canvas":return Es(e);case"fx":return Ns(e,t);case"eqGraph":return cr(e,t);case"levelSteps":return Mr(e,t);case"group":return Yr(e,t,le);case"strip":return As(e,t);case"stripAdd":return Ts(e,t);case"padGrid":return Kr(e,t);case"moves":return cs(e,t);default:return Qn({id:"unknown",text:""})}}function _(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,co(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(so(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Fe(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Wn(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Wn(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ae(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&us(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Fe(t.value))}else if(t.type==="choice")po(e,t);else if(t.type==="slotRow")ho(e,t);else if(t.type==="stepGrid")Yt(e,t);else if(t.type==="padGrid")io(e,t);else if(t.type==="moves")lo(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Ia(n,t)}else if(t.type==="eqGraph")Ra(e,t);else if(t.type==="levelSteps")Wa(e,t);else if(t.type==="strip"){bo(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${xe(n.id)}"]`);o instanceof Element&&_(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")fo(e,t);else if(t.type==="group"){ao(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${xe(n.id)}"]`);o instanceof Element&&_(o,n)}}else if(t.type==="fx"){So(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${xe(n.id)}"]`);o instanceof Element&&_(o,n)}}}}function ns(e,t){let n=ct(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=De(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(so(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=l=>i?Je(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(r(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&o.addEventListener("keydown",l=>{let d=t(o);if(d?.type!=="slider"||o.disabled)return;let c=d.taper??e.taper,p=on(c,d.min,d.max,d.value,l.key,l.shiftKey,d.step);p!==null&&(l.preventDefault(),o.value=String(ze(c,d.min,d.max,p)),d.onChange(p),d.onCommit?.(p))});let s=n.querySelector("[data-nc-readout]");return n.insertBefore(o,s),e.onTap&&n.insertBefore(as(e,o,t),s),n.append(I()),_(n,e),n}function so(e){return De(e.taper,e.min,e.max)?ze(e.taper,e.min,e.max,e.value):e.value}function as(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(Y());let i=r=>{let s=n(t);s?.type==="slider"&&s.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function os(e,t){let n=ct(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(s)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),n.append(o,I()),n}function is(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(I()),_(n,e),n}function rs(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(I()),_(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=ro(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&mo(r);let s=t(n);s?.type==="button"&&s.onSparkle?.()}),o.append(n,i),o}function ss(e){let t=ct(e.id,e.label);return t.append(I()),_(t,e),t}var ls=450;function cs(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of o.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${o.label} ${l.text}`),d.append(ds(l.icon)),d.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),s.append(d)}i.append(r,s),n.append(i)}return lo(n,e),n}function lo(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${xe(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function ds(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function ps(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(I()),t}function Qn(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(I()),t}function Jn(e){if(typeof e.valueText=="string")return e.valueText;let t=Fe(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function co(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function us(e,t){let n=Qe(t.taper,t.min,t.max,t.value);co(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Qe(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Jn(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Jn(t)}`}function hs(e,t){if(De(e.taper,e.min,e.max))return on(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function ms(e,t){let n=ct(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,s=0;o.addEventListener("pointerdown",c=>{r=c.clientY;let p=t(o);s=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",c=>{if(o.hasPointerCapture&&!o.hasPointerCapture(c.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(De(p.taper,p.min,p.max)){let g=Qe(p.taper,p.min,p.max,s)-(c.clientY-r)/120;p.onChange(Da(p.taper,p.min,p.max,g));return}let u=p.max-p.min||1,b=Math.min(p.max,Math.max(p.min,s-(c.clientY-r)*u/120));p.onChange(b)}),o.addEventListener("dblclick",()=>{let c=t(o);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),o.addEventListener("keydown",c=>{let p=t(o);if(p?.type!=="knob")return;let u=hs(p,c);u!==null&&(c.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(o,d),n.append(I()),_(n,e),n}function fs(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let s=[...n.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),d=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")d=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")d=(l-1+s.length)%s.length;else if(r.key==="Home")d=0;else if(r.key==="End")d=s.length-1;else return;let c=s[d];c instanceof HTMLButtonElement&&(r.preventDefault(),c.focus(),c.click())}),n.append(i)}return n.append(I()),po(n,e),n}function po(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function gs(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],b=document.createElement("span");b.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(p),g.textContent=u.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(g,Y()),bs(b,g,n,p,t),o.append(b)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=ro(),i.append(Y()),i.addEventListener("click",()=>{mo(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",r.append(s,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(o,...i?[i]:[]),n.append(c,r,I()),uo(n,t),ho(n,e),n}function Zn(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;Ee(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function bs(e,t,n,o,i){let r=0,s=0,l=0,d=!1,c=!1,p=!1,u=!1,b=()=>{window.clearTimeout(r),r=0},g=h=>{let y=h.clientX-s,x=h.clientY-l;y*y+x*x>Kn*Kn&&(d=!0,b())},w=()=>{u&&(u=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",m))},f=h=>{let y=r!==0&&!d&&!c;b(),w(),y&&(p=!0,Zn(n,o,i,h))},m=()=>{d=!0,b(),w()};e.addEventListener("pointerdown",h=>{h.button===0&&(w(),c=!1,d=!1,p=!1,s=h.clientX,l=h.clientY,b(),r=window.setTimeout(()=>{r=0,!d&&(c=!0,xs(n,t,o,i))},Zr),u=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",f),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",h=>h.preventDefault()),e.addEventListener("click",h=>{if(p||c||d){p=!1,c=!1,d=!1;return}Zn(n,o,i,h)})}function uo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=ea("Save","store"),i=ea("Clear","clear");n.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),Ee(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,n),n.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),Ee(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),Ee(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&Ee(e)})}function ea(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function xs(e,t,n,o){uo(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function Ee(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ho(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function mo(e){let t=e.dataset.ncLastFill||null,n=gi(t);e.dataset.ncLastFill=n;let o=bi(n);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function ws(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,n.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function ys(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=m=>{let h=document.createElement("button");return h.type="button",h.setAttribute("role","radio"),h.textContent=m,o.append(h),h},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let h of[r,s]){let y=h===m;h.setAttribute("aria-checked",y?"true":"false"),h.tabIndex=y?0:-1}};l(r);for(let m of[r,s])m.addEventListener("click",()=>l(m));o.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let h=s.getAttribute("aria-checked")==="true"?r:s;l(h),h.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(o),e.onFill&&d.append(ws(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&h.onClear?.()}),d.append(m)}n.append(d);for(let m of e.rows){let h=document.createElement("div");h.className="nc-row",h.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=m.label,y.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(y.dataset.ncLane=String((m.lane-1)%4+1));let x=!1,v=0;y.addEventListener("pointerdown",E=>{x=!1,!(E.pointerType==="mouse"||E.button!==0)&&(v=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(x=!0,S.onSelectRow?.(S.rows.findIndex(M=>M.id===m.id),!0))},ls))});for(let E of["pointerup","pointercancel","pointerleave"])y.addEventListener(E,()=>window.clearTimeout(v));y.addEventListener("contextmenu",E=>{x&&E.preventDefault()}),y.addEventListener("click",E=>{let S=t(n);if(S?.type!=="stepGrid")return;if(x){x=!1;return}let M=S.rows.findIndex(L=>L.id===m.id),z=!!S.selectedRows&&(E.shiftKey||E.metaKey||E.ctrlKey);S.onSelectRow?.(M,z)}),y.addEventListener("keydown",E=>vs(n,y,E));let $=[];for(let E of["mute","solo"]){if(!(E==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=E,M.textContent=E==="mute"?"M":"S",M.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${m.label}`),S.append(M,Y()),S.addEventListener("click",()=>{let z=t(n);if(z?.type!=="stepGrid")return;let L=z.rows.findIndex(P=>P.id===m.id);(E==="mute"?z.onMute:z.onSolo)?.(L)}),$.push(S)}let k=document.createElement("div");k.className="nc-steps";for(let E=0;E<m.steps.length;E++){let S=document.createElement("span");S.className="nc-step-wrap";let M=document.createElement("button");M.type="button",M.className="nc-step",M.dataset.ncStep=`${m.id}:${E}`,M.setAttribute("aria-label",`${m.label} step ${E+1}`),S.append(M,Y()),S.addEventListener("click",z=>{let L=t(n);if(L?.type!=="stepGrid")return;let P=L.rows.findIndex(Ie=>Ie.id===m.id),$e=s.getAttribute("aria-checked")==="true";L.onToggle(P,E,z.shiftKey||$e)}),k.append(S)}if(e.onLength&&k.append($s(n,k,m,t)),h.append(...$,y,k),e.onDice){let E=document.createElement("button");E.type="button",E.className="nc-sparkle nc-row-dice",E.dataset.ncDice=m.id,E.setAttribute("aria-label",`Re-roll ${m.label}`),E.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,E.innerHTML=Xn(),E.append(Y()),E.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(M=>M.id===m.id))}),h.append(E)}h.addEventListener("click",E=>{if(E.target!==h)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(M=>M.id===m.id))}),ta(n,k,".nc-step-wrap",t,s,()=>m.id),n.append(h)}let c=document.createElement("div");c.className="nc-pads-head";let p=(m,h,y)=>{let x=document.createElement("button");return x.type="button",x.className=m,x.textContent=h,y&&x.setAttribute("aria-label",y),x},u=p("nc-pads-step","‹","Previous lane"),b=p("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Yt(n,m))}));for(let[m,h]of[[u,-1],[b,1]])m.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let x=y.rows.length;y.onSelectRow?.(((je(y)+h)%x+x)%x)});if(c.append(u,g,b),e.onDice){let m=p("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Xn(),m.addEventListener("click",()=>{let h=t(n);if(h?.type!=="stepGrid")return;let y=je(h);y>=0&&h.onDice?.(y)}),c.append(m)}if(e.transport){let m=p("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&h.transport?.onToggle()}),c.append(m)}n.append(c);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let f=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<f;m++){let h=document.createElement("button");h.type="button",h.className="nc-pad",h.dataset.ncPad=String(m),h.textContent=String(m+1),h.addEventListener("click",y=>{let x=t(n);if(x?.type!=="stepGrid")return;let v=je(x);if(v<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(v,m+1);return}let $=s.getAttribute("aria-checked")==="true";x.onToggle(v,m,y.shiftKey||$)}),w.append(h)}return ta(n,w,".nc-pad",t,s,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[je(m)]?.id:void 0}),n.append(w),n.append(I()),Yt(n,e),n}function je(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ta(e,t,n,o,i,r){let s="on",l=!0,d=-1,c=(p,u)=>{let b=p.rows[d]?.steps[u];!b||u>=p.rows[d].length||(p.onSet?p.onSet(d,u,s,l):!!b[s]!==l&&p.onToggle(d,u,s==="accent"))};Vr(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let b=u.rows.findIndex(g=>g.id===r());b>=0&&u.rows[b].length!==p.pad+1&&u.onLength?.(b,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let b=r();d=u.rows.findIndex(w=>w.id===b);let g=u.rows[d]?.steps[p.pad];if(!g)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[s]}c(u,p.pad)}else if(p.kind==="long"){let b=r(),g=u.rows.findIndex(f=>f.id===b),w=t.querySelectorAll(n)[p.pad];g>=0&&w instanceof HTMLElement&&u.onLongPress?.(g,p.pad,w)}}})}function vs(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=o.length-1;let s=o[r];!(s instanceof HTMLElement)||s===t||(n.preventDefault(),s.focus(),s.click())}function $s(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(Y());let r=c=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(w=>w.id===n.id),b=p.rows[u];if(!b)return;let g=Math.max(1,Math.min(b.steps.length,c));g!==b.length&&p.onLength?.(u,g)},s=c=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((b,g)=>{let w=b.getBoundingClientRect();w.width>0&&c>=w.left+w.width/2&&(u=g+1)}),u},l=c=>r(s(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete i.dataset.dragging};return i.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),i.addEventListener("keydown",c=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(g=>g.id===n.id);if(!u)return;let b={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};c.key in b&&(c.preventDefault(),r(b[c.key]))}),i}var Et=new WeakMap,Re=new WeakMap;function ks(e){return e?(Re.has(e)||(Re.set(e,Ft(e)),Ca(t=>{Re.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Gt(n,Number(n.getAttribute("data-nc-velocity")))},e)),Re.get(e)):"light"}function Gt(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:ks(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(Et.has(e)&&Et.get(e)===i)){if(Et.set(e,i),n===null){for(let r of Object.keys(zn(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,s]of Object.entries(zn(n,Ln[o]??Ln.light)))e.style.setProperty(r,s)}}function na(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Yt(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&r&&(d.setAttribute("aria-label",`Re-roll ${r.label}`),d.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");c.textContent!==u&&(c.textContent=u),c.setAttribute("aria-pressed",p?"true":"false");let b=t.transport?.ariaLabel;b?c.setAttribute("aria-label",b):c.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let p=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let b=Number(u.getAttribute("data-nc-pad")),g=r.steps[b];u instanceof HTMLButtonElement&&(u.hidden=!g||!l&&b>=r.length,l&&b>=r.length?u.dataset.out="true":delete u.dataset.out,l&&b===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${b+1}${g?.markLabel?`, ${g.markLabel}`:""}`),na(u,g),u.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?u.dataset.accent="true":delete u.dataset.accent,g?.dim?u.dataset.dim="true":delete u.dataset.dim,Gt(u,g?.velocity),t.playhead>=0&&b===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let g=0;g<p.steps.length;g++){let w=p.steps[g],f=e.querySelector(`[data-nc-step="${p.id}:${g}"]`);if(!(f instanceof HTMLButtonElement))continue;let m=f.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===p.id?m.dataset.selected="true":delete m.dataset.selected;let v=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);v?m.dataset.picked="true":delete m.dataset.picked;let $=m.querySelector(".nc-name");$ instanceof HTMLElement&&($.setAttribute("aria-pressed",t.selectedRow===p.id||v?"true":"false"),$.textContent!==p.label&&($.textContent=p.label,$.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?m.dataset.silent="true":delete m.dataset.silent;for(let k of m.querySelectorAll("[data-nc-ms]")){let E=k.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;k.setAttribute("aria-pressed",E?"true":"false")}}f.setAttribute("aria-pressed",w.on?"true":"false");let h=`${p.label} step ${g+1}${w.markLabel?`, ${w.markLabel}`:""}`;f.getAttribute("aria-label")!==h&&f.setAttribute("aria-label",h),na(f,w),w.accent?f.dataset.accent="true":delete f.dataset.accent,w.dim?f.dataset.dim="true":delete f.dataset.dim,g%4===0?f.dataset.bar="true":delete f.dataset.bar,typeof w.velocity=="number"?(f.dataset.velocity="true",f.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete f.dataset.velocity,f.style.removeProperty("--level")),Gt(f,w.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;g===y?f.dataset.playhead="true":delete f.dataset.playhead;let x=!!t.onLength&&t.selectedRow===p.id;f.hidden=g>=p.length&&!x,g>=p.length&&x?f.dataset.out="true":delete f.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),b=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&b&&b.nextElementSibling!==u){let g=document.activeElement===u;b.after(u),g&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Es(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,I()),t}function As(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;r&&(n.dataset.ncFoldable="",s=vo(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==s&&s.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),l.append(x),l.addEventListener("keydown",v=>{if(v.key!=="ArrowLeft"&&v.key!=="ArrowRight"||v.ctrlKey||v.metaKey||v.shiftKey)return;let $=t(n);$?.type==="strip"&&(v.preventDefault(),$.onMove?.(v.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>ia(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),ia(n,o,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let v=t(n);v?.type==="strip"&&v.onRemove?.(x)}),o.append(x)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",x.append(v,Y()),x.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onHacks?.()}),d.append(x)}let c=document.createElement("div");if(c.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks nc-sends-view",v.dataset.ncSendsView="",x.append(v,Y()),x.addEventListener("click",()=>{let $=t(n);$?.type==="strip"&&$.onSendsView?.()}),c.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let v=document.createElement("span");v.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=x,$.textContent=x==="mute"?"M":"S",v.append($,Y()),v.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&(x==="mute"?k.onMute:k.onSolo)?.()}),c.append(v)}let p=document.createElement("div");p.className="nc-strip-sends";for(let x of e.sends??[])p.append(le({...x,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(le(un(e),t));let b=document.createElement("div");b.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(x.value)),v.textContent=x.label,g.append(v)}let w=Ii({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let v=t(n);v?.type==="strip"&&v.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&oa(x)}}),f=_i({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(b.append(g,w.el,f.el),r){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");let $=document.createElement("span");$.className="nc-ui-fx-fold-name",$.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!e.pan,x.append(v,k,$),x.addEventListener("click",()=>{let E=t(n);if(E?.type!=="strip")return;E.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),b.prepend(x)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let h=0;m.addEventListener("click",x=>{let v=t(n);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(h),x.detail===0?aa(n,m,t):x.detail===1&&(h=window.setTimeout(()=>aa(n,m,t),Cs)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(h);let x=t(n);x?.type==="strip"&&oa(x)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(le(hn(e),t)),s&&n.append(s),l&&n.append(l),n.append(o,y,d,c,p,u,b,m,I()),bo(n,e),n}function un(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Ms(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function hn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Ss(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function Ss(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Ms(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Cs=250;function aa(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??Fe(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let d=i.value;if(i.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(d)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function Ts(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(n),d=s.value;go(s),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(o,s,I()),fo(n,e),n}function fo(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(o.replaceChildren(...i.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),go(o))}function go(e){let t=e.options[0];t&&(t.selected=!0)}function oa(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bo(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?Bi(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),Vi(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let w=t.valueText??Fe(t.value);s.textContent!==w&&(s.textContent=w),s.setAttribute("aria-label",`${t.label} level ${w}`);let f=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${f}`:f}for(let w of e.querySelectorAll("[data-nc-ms]")){let f=w.getAttribute("data-nc-ms"),m=f==="mute"?t.mute===!0:t.solo===!0;w.setAttribute("aria-pressed",m?"true":"false"),w.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let w=t.hacksLabel??"Hacks";l.textContent!==w&&(l.textContent=w),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${w}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let w=t.sendsViewLabel??"Sends";d.textContent!==w&&(d.textContent=w),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${w}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ae(d,t.sendsViewHelp)}let c=e.querySelector("[data-nc-strip-grip]");c instanceof HTMLElement&&(c.setAttribute("aria-label",`Move ${t.label}`),c.title=t.moveHelp??"Drag to move this channel");let p=xo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let w=e.querySelector(`.nc-strip-trim [data-nc-id="${xe(t.trim.id)}"]`);w&&_(w,hn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let w=e.querySelector(`.nc-strip-pan [data-nc-id="${xe(t.pan.id)}"]`);w&&_(w,un(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let b=e.querySelector("[data-nc-strip-hide]");b instanceof HTMLElement&&($o(b,u,t.label),ae(b,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!u,g.setAttribute("aria-label",`Expand ${t.label}`);let w=g.querySelector("[data-nc-strip-fold-name]");w&&w.textContent!==t.label&&(w.textContent=t.label),ae(g,t.foldedHelp??t.foldHelp)}}function xo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=wo?t:0}var wo=8,He=null;function ia(e,t,n,o){He?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,s=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let d=r.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let c=r.createElement("div");c.className="nc-strip-menu-shades",c.setAttribute("role","radiogroup"),c.setAttribute("aria-labelledby",d.id);let p=xo(i),u=e.querySelector("[data-nc-strip-grip]")??t,b=(h=!1)=>{if(He!==b)return;He=null;let y=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",w,!0),r.removeEventListener("pointerdown",f,!0),s.removeEventListener("resize",m),(h||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},g=[0,...Array.from({length:wo},(h,y)=>y+1)].map(h=>{let y=r.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",h===p?"true":"false"),y.setAttribute("tabindex",h===p?"0":"-1"),y.dataset.ncShadeChoice=String(h),h===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(h),y.setAttribute("aria-label",`Shade ${h}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${h})`)),y.addEventListener("click",()=>{let x=n(e);b(!0),x?.type==="strip"&&x.onShade?.(h===0?null:h)}),y});if(c.append(...g),c.addEventListener("keydown",h=>{let y=g.indexOf(r.activeElement);if(y<0)return;let x=-1;h.key==="ArrowRight"||h.key==="ArrowDown"?x=(y+1)%g.length:h.key==="ArrowLeft"||h.key==="ArrowUp"?x=(y-1+g.length)%g.length:h.key==="Home"?x=0:h.key==="End"&&(x=g.length-1),!(x<0)&&(h.preventDefault(),g[y].setAttribute("tabindex","-1"),g[x].setAttribute("tabindex","0"),g[x].focus())}),l.append(d,c),typeof i.onMove=="function"){let h=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),y=h.indexOf(e);for(let[x,v,$]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=r.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=x<0?"left":"right";let E=r.createElement("span");E.textContent=v;let S=r.createElement("kbd");S.textContent=$,S.setAttribute("aria-hidden","true"),k.append(E,S),k.disabled=x<0?y<=0:y<0||y>=h.length-1,k.addEventListener("click",()=>{let M=n(e);b(!0),M?.type==="strip"&&M.onMove?.(x)}),l.append(k)}}r.body.append(l),(()=>{let h=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,x=l.offsetHeight,v=s.innerWidth||r.documentElement.clientWidth||y,$=s.innerHeight||r.documentElement.clientHeight||x,k=o?o.x:h.right-y,E=o?o.y:h.bottom+4;k=Math.max(4,Math.min(k,v-y-4)),E+x>$-4&&(E=Math.max(4,(o?o.y:h.top)-x-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round(E)}px`})();let w=h=>{if(h.key==="Escape")h.preventDefault(),h.stopPropagation(),b(!0);else if(h.key==="Tab"&&l.contains(r.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(v=>v.getAttribute("tabindex")!=="-1"),x=(y.indexOf(r.activeElement)+(h.shiftKey?-1:1)+y.length)%y.length;h.preventDefault(),y[x]?.focus()}},f=h=>{l.contains(h.target)||b(!1)},m=()=>b(!1);return r.addEventListener("keydown",w,!0),r.addEventListener("pointerdown",f,!0),s.addEventListener("resize",m),He=b,(g.find(h=>h.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>b(!1)}}var Wt=typeof ResizeObserver=="function"?new ResizeObserver(Ls):null;function Ls(e){for(let t of e){if(!t.target.isConnected){Wt.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&zs(n)}}function zs(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function Fs(e){if(Wt)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Wt.observe(t)}function Ns(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!nt(e)&&!r&&!s)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),r&&l.append(Eo(n,"head")),e.on!==void 0){let d=Fa({checked:e.on,labelledBy:o.id,onChange:c=>{let p=t(d.el);p?.type==="fx"&&p.onToggle?.(c)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}i&&l.append(Ds(n,t)),nt(e)&&l.append(js(n,t)),s&&l.append(Rs(t)),n.append(l)}i&&n.prepend(Ps(n,t)),r&&Ao(n,e);for(let l of e.controls)n.append(le(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let c of e.more)l.append(le(c,t));n.append(l)}return n.append(I()),So(n,e),Fs(n),n}var qs=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function yo(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&qs(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Ds(e,t){let n=vo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),yo(e))}),n}function vo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function $o(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Ps(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Eo(e,"fold")),n.addEventListener("click",()=>{let s=t(n);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),yo(e)}}),n}var ye=new Set;function Ge(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var nt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Is="(max-width: 768px)";function Bs(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function js(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Bs()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(ko(e,o,!ye.has(o.id)),n.focus())}),n}function Rs(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function ko(e,t,n){n?ye.add(t.id):ye.delete(t.id),mn(e,t)}function Hs(e,t){t?.type==="fx"&&ye.has(t.id)&&ko(e,t,!1)}function Os(e){return e.ownerDocument.defaultView?.matchMedia?.(Is).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function mn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=nt(t)&&ye.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!nt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Ge(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&we(s)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",ae(n,t.maxHelp)),!o){e.dataset.ncMax&&ra(e);return}if(!e.isConnected){let s=()=>e.isConnected&&ye.has(t.id)&&mn(e,t);queueMicrotask(()=>{e.isConnected?s():Ge(e.ownerDocument,s)});return}let i=Os(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&ra(e),e.dataset.ncMax=i,i==="over"&&_s(e,t)),Vs(e.ownerDocument),i==="over"&&fn(e),Ge(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&we(s)})}function ra(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Ge(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&we(n)})}function _s(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function fn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,s=lr(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var sa=new WeakSet;function Vs(e){sa.has(e)||(sa.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&fn(t)}))}var Kt=new WeakMap;function Eo(e,t){let n=Br(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ao(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)ae(i,t.meterHelp);let o=Kt.get(e);o?o.set(t.meter):Kt.set(e,Or(n,t.meter))}function So(e,t){(t.meter||Kt.has(e))&&Ao(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&($o(r,i,t.title),ae(r,t.foldHelp)),mn(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",d),s.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let c=l.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=d,c.hidden=d==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),ae(l,t.foldHelp)}}function ae(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function xe(e){return e.replace(/["\\]/g,"\\$&")}function Us(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&Ia(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&we(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&fn(n);ts(e)}var Gs=1e3,Ys=e=>e===!0?"log":typeof e=="string"?e:"linear";function Ws(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Ys(e.log),i=De(o,e.min,e.max),r=n.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let s=n.createElement("label");s.className="nc-label",s.setAttribute("for",e.id),s.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?Gs:e.max),l.step=i?"1":String(e.step??"any");let d=n.createElement("span");d.className="nc-readout",d.dataset.ncReadout="";let c=n.createElement("i");c.className="nc-token-probe",c.dataset.ncProbe="",r.append(s,l,d,c);let p=e.value,u=()=>{let g=e.format(p);d.textContent=g,l.setAttribute("aria-valuetext",g)},b=g=>{p=g,n.activeElement!==l&&(l.value=String(i?ze(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?Je(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",g=>{let w=on(o,e.min,e.max,p,g.key,g.shiftKey,e.step);w===null||l.disabled||(g.preventDefault(),l.value=String(ze(o,e.min,e.max,w)),p=w,u(),e.onInput(p))}),l.disabled=e.disabled===!0,b(e.value),{el:r,set:b,setDisabled(g){l.disabled=g===!0}}}var Ks=te["toast-duration"];function Xs({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Qs(e,t,n,o){let i=l=>({top:l,bottom:l+n}),r=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),s=i(t-o-n);return r(s)?r(i(o))?"bottom":"top":"bottom"}function Js(e,t,n,o,i,r){let s=e.bottom+i,l=Math.max(r,Math.min(e.left,o-r-n.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(let p of t)p&&p.bottom>s&&p.top<s+n.height&&p.right>l&&p.left<l+n.width&&(s=p.bottom+i,d=!0)}return{top:s,left:l}}var la="data-nc-ui-toast-live";function Zs(e,t){let n=t.querySelector(`[${la}]`);return n||(n=e.createElement("div"),n.setAttribute(la,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function el({message:e,actionLabel:t,onAction:n,duration:o=Ks,onClose:i,avoid:r=[],anchor:s,host:l,document:d=globalThis.document}={}){l=l??d.body;let c=d.defaultView??globalThis,p=d.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let u=d.createElement("span");u.className="nc-ui-toast-message",u.textContent=e,p.appendChild(u);let b=null;t&&(b=d.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=t,p.appendChild(b)),l.appendChild(p);let g="open",w=R=>R&&typeof R.getBoundingClientRect=="function"?R.getBoundingClientRect():null,f=w(p),m=f?.height||44,h=c.getComputedStyle?.(p),y=Number.parseFloat(h?.getPropertyValue(T("toast-offset")))||16,x=Number.parseFloat(h?.getPropertyValue(T("toast-anchor-gap")))||8,v=w(s),$=c.innerHeight??0,k=r.map(w).filter(Boolean),E=v&&v.bottom>0&&v.top<$?Js(v,k,{width:f?.width||0,height:m},c.innerWidth??0,x,y):null;E&&E.top+m<=$?(p.setAttribute("data-placement","anchor"),p.style.top=`${E.top+(c.scrollY??0)}px`,p.style.left=`${E.left+(c.scrollX??0)}px`):p.setAttribute("data-placement",Qs(k,$,m,y));let S=c.requestAnimationFrame?.bind(c)??(R=>setTimeout(R,16));S(()=>S(()=>{g==="open"&&p.setAttribute("data-state","open")})),Zs(d,l).textContent=Xs({message:e,actionLabel:t});let M,z,L=new Promise(R=>{z=R}),P=R=>{clearTimeout(M),M=setTimeout(()=>mt("timeout"),R)},$e=o,Ie=Date.now(),vn=()=>{g==="open"&&(clearTimeout(M),$e=Math.max(0,$e-(Date.now()-Ie)))},$n=()=>{g==="open"&&(Ie=Date.now(),P($e))};p.addEventListener("pointerenter",vn),p.addEventListener("pointerleave",$n),p.addEventListener("focusin",vn),p.addEventListener("focusout",$n),b?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{mt("action")}}),Number.isFinite(o)&&P(o);function mt(R="close"){if(g!=="open")return;g="closing",clearTimeout(M),p.setAttribute("data-state","closing"),i?.(R);let kn=c.getComputedStyle?.(p),ii=kn?Math.max(0,...String(kn.transitionDuration||"").split(",").map(An=>Number.parseFloat(An)*(An.trim().endsWith("ms")?1:1e3)||0)):0,En=()=>{g!=="gone"&&(g="gone",p.remove(),z(R))};p.addEventListener("transitionend",En),setTimeout(En,ii+50)}return{el:p,close:mt,closed:L}}var at="data-nc-help";function tl(e,t,n,o=0,i=6,r=8){let s=e.top-i-t.height,l=s>=o+r?"above":"below",d=l==="above"?s:e.bottom+i,c=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(d),left:Math.round(c),side:l}}var At=new WeakMap;function nl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function al({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=At.get(e);if(n)return n;let o=e.defaultView,i=null,r=null,s,l=!1,d,c=()=>{clearTimeout(s),clearTimeout(d),r=null,l=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},p=(w,f)=>{let m=f??w.getAttribute(at);if(!m)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=m,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let h=w.getBoundingClientRect(),y=tl(h,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,nl(e));return i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility="",!0},u=w=>{if(l||w.pointerType==="touch")return;let f=w.target&&w.target.closest?w.target.closest(`[${at}]`):null;f!==r&&(c(),f&&(r=f,s=setTimeout(()=>{r===f&&f.isConnected&&p(f)},t)))},b=w=>{(l||w.key==="Escape")&&c()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",c,!0),e.addEventListener("keydown",b),o.addEventListener("scroll",c,!0),o.addEventListener("blur",c);let g={hide:c,pin(w,f,{ms:m=0}={}){return c(),!w||!w.isConnected||!p(w,f)?!1:(l=!0,i.dataset.pinned="",m>0&&(d=setTimeout(c,m)),!0)},uninstall(){c(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",c,!0),e.removeEventListener("keydown",b),o.removeEventListener("scroll",c,!0),o.removeEventListener("blur",c),i?.remove(),i=null,At.delete(e)}};return At.set(e,g),g}var gn="netcomposer.rhythm.hidden.v1",Q=new WeakMap;function St(){try{return globalThis.localStorage??null}catch{return null}}function Mo(e,t=gn){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function ca(e,t,n,o=gn){let i=Mo(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function bn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(un(i)),i.trim&&n.push(hn(i)));return n}function Co(e,t){if(!(!e||!t))return bn(e).find(n=>n.id===t)}function ol(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${bn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function il(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),To(e,t)}function To(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function rl(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Q.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Co(n,o)}function sl(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=ol(t);if(e.dataset.ncSignature===i){for(let r of o){let s=e.querySelector(`[data-nc-section="${pa(r.id)}"]`);s&&To(s,r);for(let l of r.controls){let d=e.querySelector(`[data-nc-id="${pa(l.id)}"]`);d instanceof Element&&_(d,l)}s instanceof HTMLElement&&Xt(s,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),il(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let d of r.controls)l.append(le(d,rl));e.append(s),Xt(s,r,n)}}function Lo(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var ll="(max-width: 768px)",zo=new WeakMap;function da(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function cl(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=da("prev"),r=da("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,s,r,l);let d=(c,p)=>{let u=zo.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let b=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Lo(b,u.pageSize,(t.pages.get(u.id)??0)+c);t.pages.set(u.id,g),u.onPage?.(g),Xt(e,{...u,page:g},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>d(-1,i)),r.addEventListener("click",()=>d(1,r)),e.prepend(o),o}function Xt(e,t,n){zo.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=Lo(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,s),r<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of o)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(ll).matches===!0,d=e.closest(".nc-module");o.forEach((m,h)=>{let y=Math.floor(h/i)!==s;if(y?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,y&&!l){let x=d instanceof HTMLElement?Q.get(d):void 0;Hs(m,Co(x,m.dataset.ncId))}});let c=cl(e,n),p=c.querySelector('[data-nc-fx-page="prev"]'),u=c.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",s===0?"true":"false"),u.setAttribute("aria-disabled",s===r-1?"true":"false");let b=c.querySelector("[data-nc-fx-page-count]"),g=`${s+1} / ${r}`;b.textContent!==g&&(b.textContent=g);let w=c.querySelector("[data-nc-fx-page-live]"),f=`Effects page ${s+1} of ${r}`;w.textContent!==f&&(w.textContent=f)}function pa(e){return e.replace(/["\\]/g,"\\$&")}function dl(e,t=gn){za();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=Mo(St(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Fa({labelledBy:r.id,onChange:y=>(Q.get(n)??e).onToggle?.(y)});c.el.dataset.ncModuleSwitch="",s.append(c.el,l,d);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(r,p,s);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let b=document.createElement("button");b.type="button",b.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",b.append(g);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,u,b),n.setAttribute("aria-labelledby",r.id);let f=y=>{let x=Q.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,b.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${x.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";ca(St(),(Q.get(n)??e).id,y,t),f(y),Qt(n.parentElement)}),b.addEventListener("click",()=>{ca(St(),(Q.get(n)??e).id,!1,t),f(!1),Qt(n.parentElement)});let m={pages:new Map,redraw:()=>h.redraw()},h={el:n,update(y){Q.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),g.textContent=y.summary??y.title,c.el.hidden=y.on===void 0,c.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,b.setAttribute("aria-label",`Show ${y.title}`),sl(u,y,m),f(u.hidden),h.redraw()},redraw(){let y=Q.get(n);y&&Us(n,bn(y))}};return Q.set(n,e),f(o),h.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>h.redraw()).observe(n),Ca(()=>h.redraw(),n.ownerDocument),h}function pl(e,t,n="adjacent"){za(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Qt(e)}function Qt(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const ul={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in this browser.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"This pass's own quantize. Song follows the Setup."};function Fo(e){return ul[e]??""}const No="nc-song-looper",qo=2,hl=[1,2],N=960,D=4,X=32,Jt=4e3,Do=120,ot=40,it=240,ml=8,fe=40,xn=["off","1/8","1/16","1/32"],Po=[.5,.75,1],Io=128,ve=e=>Math.max(1,Math.floor(e/D)),rt=e=>e.bars*D*N;function fl(e){const t=Math.round(e.bars*D*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Bo(e,t=new Date,n=Math.random){const o=Math.min(it,Math.max(ot,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString(),r=i.replace(/[-:T]/g,"").slice(0,12);return{format:No,version:qo,id:`sl-${r}-${Math.floor(n()*65535).toString(16).padStart(4,"0")}`,name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:o,beatsPerBar:D,bars:Math.min(ml,ve(o)),countInBars:1,ppq:N},passes:[],comps:[]}}const Ae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),G=e=>Number.isInteger(e),oe=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,Mt=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),ie=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function ua(e){if(e===void 0)return null;if(!Ae(e))return"quantize must be an object";const t=ie(e,["grid","strength"]);return t?`quantize has an unknown field (${t})`:xn.includes(e.grid)?Po.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%":"quantize grid is not off, 1/8, 1/16 or 1/32"}function gl(e){if(!Ae(e)||e.format!==No)return"it isn't a Lupa song";if(!hl.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=ie(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!oe(e.id))return"its id is missing";if(!oe(e.name,fe*2))return"its name is missing";if(!Mt(e.createdAt)||!Mt(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Ae(n))return"its song is missing";const o=ie(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize"]);if(o)return`its song has an unknown field (${o})`;if(!G(n.bpm)||n.bpm<ot||n.bpm>it)return`its tempo is not ${ot}–${it}`;if(n.beatsPerBar!==D)return"it isn't in 4/4";if(!G(n.bars)||n.bars<1||n.bars>ve(n.bpm))return`its bars are not 1–${ve(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==N)return`its ticks are not ${N} a beat`;const i=ua(n.quantize);if(i)return`its song's ${i}`;const r=rt(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>X)return`it has more than ${X} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const s=new Set,l=new Set;for(let d=0;d<e.passes.length;d++){const c=e.passes[d],p=`Pass ${d+1}`;if(!Ae(c))return`${p} is not an object`;const u=ie(c,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize"]);if(u)return`${p} has an unknown field (${u})`;if(!oe(c.id)||s.has(c.id))return`${p} has no id of its own`;if(s.add(c.id),!G(c.n)||c.n<1||l.has(c.n))return`${p} has no number of its own`;if(l.add(c.n),!oe(c.name,fe))return`${p}'s name is not 1–${fe} characters`;if(!Mt(c.recordedAt))return`${p}'s date is wrong`;if(!G(c.endTick)||c.endTick<=0||c.endTick>r)return`${p}'s end is not in the song`;for(const w of["kept","mute","solo"])if(typeof c[w]!="boolean")return`${p}'s ${w} is not true or false`;if(typeof c.volume!="number"||!(c.volume>=0&&c.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(c.instruments)||!c.instruments.every(w=>oe(w,64)))return`${p}'s instruments are wrong`;const b=ua(c.quantize);if(b)return`${p}'s ${b}`;if(!Array.isArray(c.events))return`${p}'s events are missing`;if(c.events.length>Jt)return`${p} has more than ${Jt} events`;let g=Number.NEGATIVE_INFINITY;for(let w=0;w<c.events.length;w++){const f=c.events[w],m=`event ${w+1} in ${p}`;if(!Ae(f))return`${m} is not an object`;if(!oe(f.inst,64)||!c.instruments.includes(f.inst))return`${m} is from an instrument not listed`;if(!G(f.at)||f.at<-Do||f.at>=c.endTick)return`${m} is outside the pass`;if(f.at<g)return`${m} is out of order`;if(g=f.at,f.kind==="take"){if(e.version===1)return`${m} is of an unknown kind`;const y=ie(f,["kind","inst","take","at","len","peaks"]);if(y)return`${m} has an unknown field (${y})`;if(!oe(f.take)||f.take.length>128)return`${m} has no take`;if(!G(f.len)||f.len<1||f.at+f.len>r)return`${m} has a length outside the song`;if(f.peaks!==void 0&&!(Array.isArray(f.peaks)&&f.peaks.length<=Io&&f.peaks.every(x=>typeof x=="number"&&x>=0&&x<=1)))return`${m} has bad peaks`;continue}if(f.kind==="slot"){const y=ie(f,["kind","inst","slot","at"]);if(y)return`${m} has an unknown field (${y})`;if(!G(f.slot)||f.slot<1||f.slot>16)return`${m} has slot ${String(f.slot)}`;continue}const h=ie(f,["kind","inst","note","vel","at","len","slice","name"]);if(h)return`${m} has an unknown field (${h})`;if(f.kind!==void 0&&f.kind!=="note")return`${m} is of an unknown kind`;if(!G(f.note)||f.note<0||f.note>127)return`${m} has note ${String(f.note)}`;if(typeof f.vel!="number"||!(f.vel>0&&f.vel<=1))return`${m} has velocity ${String(f.vel)}`;if(!G(f.len)||f.len<1||f.len>r)return`${m} has a length outside the song`;if(f.slice!==void 0&&!(G(f.slice)&&f.slice>=0&&f.slice<=255))return`${m} has slice ${String(f.slice)}`;if(f.name!==void 0&&!(typeof f.name=="string"&&f.name.length>0&&f.name.length<=fe))return`${m} has a bad sound name`}}return null}function bl(e){const t=gl(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=qo,{session:n}}class xl{song;b0;passes;drafts=new Map;held=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.song.bars*D}get lapTicks(){return rt(this.song)}get full(){return this.passes.length>=X}hasDraft(t){return(this.drafts.get(t)?.count??0)>0}place(t){const n=t-this.b0,o=Math.floor(n/this.lapBeats+1e-12);return{lap:o,tick:Math.round((n-o*this.lapBeats)*N)}}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-Do?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/N}played(t,n){const o=[];for(const i of n){if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="chordPad"||i.type==="lap"){this.stats.ignored++;continue}if(i.type==="take"){const c=this.voicePass(t,i);c&&o.push({lap:this.laps.get(c)??0,ev:c.events[0]});continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:r,tick:s}=this.placeOn(i.beat);if(r<0||r<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(r)??{lap:r,events:[],count:0};if(l.events.length>=Jt){this.stats.overCap++;continue}let d;if(i.type==="slot")d={kind:"slot",inst:t,slot:i.slot,at:s};else{const c={inst:t,note:i.note,vel:wl(i.velocity),at:s,len:1};i.slice!==void 0&&(c.slice=i.slice),typeof i.name=="string"&&i.name.trim()&&(c.name=i.name.trim().slice(0,fe)),this.held.set(`${t}|${i.id}`,{ev:c,onBeat:i.beat}),d=c}ha(l.events,d),l.count++,this.drafts.set(r,l),this.stats.taken++,o.push({lap:r,ev:d})}return o}release(t,n,o){const i=`${t}|${n}`,r=this.held.get(i);r&&(this.held.delete(i),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-r.onBeat)*N))))}seam(t){const n=this.place(t).lap,o=[];for(let i=this.through+1;i<n;i++){this.through=i;const r=this.commit(i,this.lapTicks);r&&o.push(r)}return o}stop(t){for(const[r,s]of this.held)this.held.delete(r),s.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-s.onBeat)*N)));const n=this.seam(t),{lap:o,tick:i}=this.place(t);if(o>=0&&o>this.through){this.through=o;const r=D*N,s=Math.min(this.lapTicks,Math.max(r,Math.ceil(Math.max(1,i)/r)*r)),l=this.commit(o,s);l&&n.push(l)}return this.drafts.clear(),n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:i}=this.place(n.beat);if(o<0||!n.take||this.passes.some(c=>c.events.some(p=>p.kind==="take"&&p.take===n.take)))return this.stats.ignored++,null;const r=Math.max(0,Math.min(this.lapTicks-1,i)),s=Math.max(1,Math.min(this.lapTicks-r,Math.round(n.lengthBeats*N))),l={kind:"take",inst:t,take:n.take.slice(0,128),at:r,len:s};Array.isArray(n.peaks)&&n.peaks.length&&(l.peaks=n.peaks.slice(0,Io).map(c=>Number.isFinite(c)?Math.round(Math.max(0,Math.min(1,c))*100)/100:0)),this.drafts.set(-1-o,{lap:o,events:[l],count:1});const d=this.commitDraft(-1-o,o,this.lapTicks);return d&&this.stats.taken++,d}isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,o){const i=this.drafts.get(t);if(this.drafts.delete(t),!i||i.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=i.count,null;const r=this.passes.reduce((d,c)=>Math.max(d,c.n),0)+1,s=i.events.filter(d=>d.at<o),l={id:`p${r}-${this.now().getTime().toString(36)}`,n:r,name:`Pass ${r}`,recordedAt:this.now().toISOString(),endTick:o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(s.map(d=>d.inst))],events:s};return this.passes.push(l),this.laps.set(l,n),this.redoStack=[],l}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:n}=this.place(t),o=this.drafts.get(n);if(o&&o.count>0){this.drafts.delete(n);for(const[l,d]of this.held)o.events.includes(d.ev)&&this.held.delete(l);const s={kind:"lap",draft:o};return this.redoStack.push(s),s}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const r=this.passes.findIndex(s=>s.n>n.pass.n);return r<0?this.passes.push(n.pass):this.passes.splice(r,0,n.pass),n}const{lap:o}=this.place(t);if(n.draft.lap===o||n.draft.lap>this.through){const r=this.drafts.get(n.draft.lap);if(r)for(const s of n.draft.events)ha(r.events,s);else this.drafts.set(n.draft.lap,n.draft);return r&&(r.count+=n.draft.count),n}this.drafts.set(n.draft.lap,n.draft);const i=this.commit(n.draft.lap,this.lapTicks);return i?{kind:"pass",pass:i}:null}get canRedo(){return this.redoStack.length>0}}function wl(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function ha(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const yl=.5,vl=12,$l={"1/8":N/2,"1/16":N/4,"1/32":N/8};function ma(e,t){const n=t?$l[t.grid]:void 0;if(!t||!n)return e;const o=Math.round(e/n)*n;return Math.round(e+(o-e)*t.strength)}function fa(e,t){return e.mute?!1:t?e.solo:!0}const ga=e=>e.kind==="slot",Ct=e=>e.kind==="take",kl=.05;class El{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];takesSent=new Map;announceLaps=!0;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.restart()}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;const n=[...this.takesSent.values()].some(o=>o>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(o=>o.beat<t);for(const[o,i]of this.takesSent)i>t&&this.takesSent.delete(o);for(const[o,i]of this.sounding)this.sounding.set(o,i.filter(r=>r.start<t))}}pump(t,n){const o=this.rec,i=[];if(this.waiting.length){const v=[];for(const $ of this.waiting){if(o.isHeld($.ev)){v.push($);continue}if($.beat>=t)i.push($);else{const k=Math.min($.ev.len,rt(this.song))/N-(t-$.beat);k>.05&&i.push({...$,beat:t,lenBeats:k})}}this.waiting=v}const r=Math.max(this.sentTo,t);if(!(n>r)&&!i.length&&!this.lateTakes(t))return 0;const s=o.lapBeats,l=rt(this.song),d=o.b0,c=Math.max(0,Math.floor((r-d)/s)-1),p=Math.floor((n-d)/s)+1,u=[],b=(v,$)=>{const k=d+$*s+v.at/N;k>=r&&k<n&&u.push({inst:v.inst,beat:k,slot:v.slot})},g=[],w=(v,$,k)=>{const E=d+k*s+$.at/N,S=Math.min($.len,l-$.at)/N,M=E+S,z=`${v.id}|${k}`;if(this.takesSent.has(z)||M<=t||E>=n)return;const L=Math.max(E,t);if(M-L<kl)return;const P={type:"take",id:`t${++this.serial}`,beat:L,take:$.take,lengthBeats:S,gain:Math.max(0,Math.min(1,v.volume))};L>E&&(P.offsetBeats=L-E),this.takesSent.set(z,M),g.push({inst:$.inst,ev:P})},f=o.passes,m=f.some(v=>v.solo&&!v.mute),h=(v,$,k,E,S,M)=>{const z=d+S*s+E/N;z>=r&&z<n&&(o.isHeld(k)?this.waiting.push({inst:v,age:$,beat:z,ev:k,velocity:M}):i.push({inst:v,age:$,beat:z,ev:k,velocity:M}))};for(const v of f){if(!fa(v,m))continue;const $=o.lapOf(v),k=$===void 0?0:$+1,E=v.quantize??this.song.quantize;for(let S=Math.max(k,c);S<=p;S++)for(const M of v.events)if(!(M.at>=v.endTick)){if(ga(M)){b(M,S);continue}if(Ct(M)){w(v,M,S);continue}h(M.inst,v.n,M,ma(M.at,E),S,M.vel*v.volume)}}if(!m)for(const v of o.drafting())for(let $=Math.max(v.lap+1,c);$<=p;$++)for(const k of v.events){if(ga(k)){b(k,$);continue}Ct(k)||h(k.inst,Number.POSITIVE_INFINITY,k,ma(k.at,this.song.quantize),$,k.vel)}if(this.announceLaps&&!o.full&&!o.paused){const v=[];for(let $=Math.max(0,Math.ceil((r-d)/s));d+$*s<n;$++)v.push({type:"lap",id:`l${++this.serial}`,beat:d+$*s,lengthBeats:s});v.length&&(this.sink.laps(v),this.stats.laps+=v.length)}if(this.sentTo=Math.max(this.sentTo,n),g.length){const v=new Map;for(const $ of g)v.set($.inst,[...v.get($.inst)??[],$.ev]);for(const[$,k]of v)this.sink.controls($,k);this.stats.takes+=g.length}if(u.length){u.sort(($,k)=>$.beat-k.beat);const v=new Map;for(const $ of u){const k=v.get($.inst)??[];k.push({type:"slot",id:`s${++this.serial}`,beat:$.beat,slot:$.slot}),v.set($.inst,k)}for(const[$,k]of v)this.sink.controls($,k);this.stats.slots+=u.length}if(!i.length)return 0;i.sort((v,$)=>v.beat-$.beat||$.age-v.age);const y=new Map;for(const v of i){const $=v.lenBeats??Math.max(1,Math.min(v.ev.len,l))/N;if(!this.voice(v.inst,v.beat,v.beat+$,v.age)){this.stats.dropped++;continue}const k={note:v.ev.note,velocity:Math.max(.01,Math.min(1,v.velocity)),startBeat:v.beat,lengthBeats:$,spanBeats:$,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:v.ev.note};v.ev.slice!==void 0&&(k.slice=v.ev.slice);const E=y.get(v.inst)??[];E.push(k),y.set(v.inst,E)}let x=0;for(const[v,$]of y)this.sink.send(v,$),x+=$.length;return this.stats.sent+=x,x}lateTakes(t){const n=this.rec,o=n.lapBeats,i=Math.floor((t-n.b0)/o),r=n.passes.some(s=>s.solo&&!s.mute);for(const s of n.passes){if(!fa(s,r)||!s.events.some(Ct))continue;const l=n.lapOf(s);if(!(l!==void 0&&i<=l)&&!this.takesSent.has(`${s.id}|${i}`))return!0}return!1}voice(t,n,o,i){const r=(this.sounding.get(t)??[]).filter(s=>s.end>n);if(r.length>=vl){let s=0;for(let l=1;l<r.length;l++)r[l].age<r[s].age&&(s=l);if(i<=r[s].age)return this.sounding.set(t,r),!1;r.splice(s,1)}return r.push({start:n,end:o,age:i}),this.sounding.set(t,r),!0}}const Al={running:!1,beatAt:()=>0,timeAt:()=>0};class Sl{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];constructor(t,n){this.session=t,this.deps=n,this.rec=new xl({song:t.song,b0:0,passes:t.passes,now:n.date}),this.replay=n.sink?new El(this.rec,n.sink):null;const o=n.host;o?.clock&&this.offs.push(o.clock.onChange(i=>this.clockChanged(i))),o?.onPlayed&&this.offs.push(o.onPlayed((i,r)=>this.played(i,r))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],i=>(i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??Al}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(it,Math.max(ot,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,ve(n)),this.changed())}toggle(){this.jamming||this.wantJam?this.stop():this.jam()}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.transport.running){const o=Math.ceil(this.beatNow()/D+.05)*D;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}begin(t){this.wantJam=!1,this.jamming=!0;const n=t+this.session.song.countInBars*D;this.rec.resume(n),this.replay?.start(),this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,n)}showCountIn(t,n){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||n<=t)return;const i=this.transport,r=l=>o.mapper?.toContextTime(i.timeAt(l))??0,s=[];for(let l=t;l<n;l++)s.push(r(l));try{this.deps.countIn.show("looper",{beats:s,accents:s.map((l,d)=>d%D===0),until:r(n)})}catch{}}stop(){const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){t.kind==="start"&&this.wantJam?this.begin(typeof t.beat=="number"?t.beat:0):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),this.changed(!1)}played(t,n){if(!this.jamming)return;const o=this.rec.played(t,n);o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),n!==this.lastLap&&(this.lastLap=n,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const r=this.rec.seam(t);return this.replay?.pump(t,this.transport.beatAt(this.deps.now()+yl)),r.length?(this.changed(),!0):o}view(){const t=this.session,n=this.transport,o=this.jamming&&n.running?this.beatNow():null,i=o===null?null:this.rec.place(o),r=o!==null&&o<this.rec.b0,s=t.passes.reduce((c,p)=>Math.max(c,p.n),0)+1,l=this.deps.host?.studioTransport?.bpm(),d=this.jamming?r?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:d,jamming:this.jamming||this.wantJam,bar:i&&!r?Math.floor(i.tick/(D*960))+1:null,nextPass:s,countIn:r&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof l=="number"&&Math.round(l)!==t.song.bpm?Math.round(l):null,notice:this.notice}}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;t.bars!==void 0&&!this.session.passes.length&&!this.jamming&&!this.wantJam&&(n.bars=Math.max(1,Math.min(ve(n.bpm),Math.round(t.bars)))),t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const o=this.pass(t);if(o){if(n.name!==void 0){const i=n.name.replace(/\s+/g," ").trim().slice(0,fe);o.name=i||`Pass ${o.n}`}n.kept!==void 0&&(o.kept=n.kept),n.mute!==void 0&&(o.mute=n.mute),n.solo!==void 0&&(o.solo=n.solo),n.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,n.volume))),n.quantize===null?delete o.quantize:n.quantize&&(o.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(i=>i.id===t);if(n<0)return null;const[o]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),o?{pass:o,index:n}:null}restorePass(t,n){const o=this.session.passes;return o.length>=X||o.some(i=>i.id===t.id)?!1:(o.splice(Math.min(Math.max(0,n),o.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){this.jamming&&this.stop();const t=Bo(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.notice="",this.changed(),t}get passCount(){return this.session.passes.length}get maxPasses(){return X}dispose(){for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const Ml="netcomposer-looper",ge="sessions",Cl="netcomposer.looper.current.v1",Tl=500;function Ll(e){return new Promise((t,n)=>{const o=e.open(Ml,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(ge)||o.result.createObjectStore(ge,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}function zl(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Fl(e={}){const t=e.idb===void 0?ba(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?ba(()=>globalThis.localStorage):e.local,o=e.currentKey??Cl;let i=null;const r=()=>t?(i??=Ll(t),i):Promise.reject(new Error("no IndexedDB"));let s=null,l=null,d=Promise.resolve(),c=0;const p=b=>{const g=structuredClone(b);d=d.then(async()=>{const f=(await r()).transaction(ge,"readwrite");f.objectStore(ge).put(g),await zl(f);try{n?.setItem(o,g.id)}catch{}}).catch(()=>{c++})},u=()=>{l&&clearTimeout(l),l=null;const b=s;s=null,b&&p(b)};return{async load(){let b=null;try{b=n?.getItem(o)??null}catch{b=null}if(!b||!t)return null;try{const f=(await r()).transaction(ge,"readonly").objectStore(ge).get(b),m=await new Promise((h,y)=>{f.onsuccess=()=>h(f.result),f.onerror=()=>y(f.error)});return m===void 0?null:bl(m)}catch{return null}},save(b,g=!1){if(s=b,g){u();return}l||(l=setTimeout(u,Tl))},async flush(){u(),await d},get failures(){return c}}}function ba(e){try{return e()??null}catch{return null}}const jo=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let pe;function Nl(){if(pe!==void 0)return pe;pe=null;try{pe=jo()?.attach("looper",{instance:1})??null}catch{pe=null}return pe}function ql(){return jo()?.countIn??null}function Dl(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const Pl="netcomposer.looper.hidden.v1",Il=50;function A(e,t={},...n){const o=document.createElement(e);for(const[i,r]of Object.entries(t))r!==void 0&&o.setAttribute(i,r);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const W=e=>({[at]:Fo(e)||void 0});function K(e,t,n){const o=A("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function Se(e,t){return A("span",{class:"nc-label",...t?W(t):{}},e)}function Ye(e,t,n,o,i,r=!1){const s=A("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const d=K(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});d.disabled=r,s.append(d)}return s}function st(e,t,n,o,i,r="lp-toggle"){return K(t,{class:r,"aria-pressed":String(n),"data-lp-id":e,...W(o)},i)}function wn(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function Ro(e,t,n){const o=A("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),r=dl(i(),Pl),s=()=>{const l=r.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return s(),{handle:r,mount:o,update(){r.update(i()),s()}}}const V=Nl(),dt=Fl({currentKey:V?.storageKey?.("netcomposer.looper.current.v1")}),ue=await dt.load();let Ho="",Zt;ue&&"session"in ue?Zt=ue.session:(ue&&"error"in ue&&(Ho=`Your last song didn't open: ${ue.error}. A new one is started.`),Zt=Bo(V?.studioTransport?.bpm()??120));function Bl(){let e=null;try{e=V?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,o=i=>{n.has(i)||(n.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,r){o(i),t.send(r,i)},controls(i,r){o(i),t.sendControls(r,i)},laps(i){let r=[];try{r=(V?.notesTargets?.()??[]).filter(s=>s.type==="lucy"&&s.takesNotes).map(s=>s.instance)}catch{r=[]}for(const s of r)o(s),t.sendControls(i,s)},off(i){t.off(i===void 0?"stop":"off",i)},restart(){t.restart()}}}const C=new Sl(Zt,{host:V,countIn:ql(),load:Dl,now:ri,save:e=>dt.save(e),sink:Bl()});C.notice=Ho;addEventListener("pagehide",()=>dt.save(C.session,!0));const Oo=document.getElementById("app");Oo.classList.add("nc","nc-page");al();const _o=A("header",{class:"nc-page-hd"},A("div",{},A("h1",{class:"nc-page-title"},A("span",{class:"lp-brand"},"LUPA")," ",A("span",{class:"nc-page-sep"},"/")," LOOPER ",A("span",{class:"nc-page-sep"},"/")," ",A("span",{class:"nc-mono"},"01")),A("p",{class:"nc-page-sub"},"A NetComposer element.")),A("div",{class:"nc-page-actions"},K("New song",{class:"nc-page-action","data-lp-id":"new-song",...W("new-song")},()=>Rl()))),Vo=A("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),Uo=A("footer",{class:"lp-foot lp-sub"},A("span",{class:"lp-notice",role:"status"}),A("span",{class:"lp-mono"},"netcomposer.looper.01"));Oo.append(_o,A("main",{class:"nc-page-body"},Vo),Uo);let he=null;function jl(){return _o.querySelector('[data-lp-id="new-song"]')}function Tt(e){const t=jl();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function Rl(){if(C.passCount&&!he){Tt(!0),he=setTimeout(()=>{he=null,Tt(!1)},4e3);return}he&&clearTimeout(he),he=null,Tt(!1),C.newSong(),qe=null,B="all",C.notice="New song started. The last one stays in this browser.",de()}const Go=A("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),ee=V?.metronome,Yo=Ws({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((ee?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>ee?.set({volume:e/100})});Yo.el.setAttribute(at,Fo("volume"));ee?.onChange(()=>de());function Hl(e){const t=e.session.song,n=[1,2,4,8,16].filter(i=>i<=ve(t.bpm)),o=t.quantize;wn(Go,A("h3",{class:"lp-section-title"},"Setup"),A("div",{class:"lp-grid2"},A("div",{class:"lp-field"},Se("Tempo","tempo"),A("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?A("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?A("span",{class:"lp-sub"},"Locked: the song has passes."):A("span",{class:"lp-sub"},"Follows the Studio.")),A("div",{class:"lp-field"},Se("Length","bars"),Ye("bars","Bars",n.map(i=>({value:String(i),label:String(i)})),String(t.bars),i=>C.setSong({bars:Number(i)}),e.locked||e.jamming),A("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${fl(t)}`))),A("div",{class:"lp-between"},st("count-in","Count-in",t.countInBars===1,"count-in",()=>C.setSong({countInBars:t.countInBars?0:1})),ee?st("metronome","Metronome",ee.prefs().on,"metronome",()=>ee.set({on:!ee.prefs().on})):null),ee?Yo.el:null,A("div",{class:"lp-field"},Se("Quantize","quantize"),Ye("quantize","Quantize",xn.map(i=>({value:i,label:i==="off"?"Off":i})),o?.grid??"off",i=>C.setSong({quantize:i==="off"?null:{grid:i,strength:o?.strength??1}})),o?A("div",{class:"lp-row"},Se("Strength","strength"),Ye("strength","Strength",Po.map(i=>({value:String(i),label:`${Math.round(i*100)}%`})),String(o.strength),i=>C.setSong({quantize:{grid:o.grid,strength:Number(i)}}))):null))}const Wo=Ro("jam","Jam",()=>{const e=C.view();return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} / ${e.session.song.bars}`:`${C.passCount} / ${X} passes`}),Ol="http://www.w3.org/2000/svg",j=(e,t)=>{const n=document.createElementNS(Ol,e);for(const[o,i]of Object.entries(t))n.setAttribute(o,i);return n},Ne=44,en=2*Math.PI*Ne,Ko=j("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),Xo=j("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(Ne),"stroke-width":"3","stroke-dasharray":`0 ${en}`,transform:"rotate(-90 50 50)"}),We=j("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});Ko.append(j("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(Ne),"stroke-width":"1"}),Xo,We);const Qo=A("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Jo=A("span",{class:"lp-pass","data-lp-id":"pass"}),_l=A("div",{class:"lp-ring"},Ko,A("div",{class:"lp-ring-mid"},Qo,Jo));function Zo(e){const t=e.lapPos??0;Xo.setAttribute("stroke-dasharray",`${t*en} ${en}`);const n=t*2*Math.PI;We.setAttribute("cx",String(50+Ne*Math.sin(n))),We.setAttribute("cy",String(50-Ne*Math.cos(n))),We.style.visibility=e.lapPos===null?"hidden":"visible",Qo.textContent=e.countIn!==null?String(e.countIn):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const o=e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${X} / ${X}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;Jo.replaceChildren(...e.phase==="recording"?[A("span",{class:"lp-dot","aria-hidden":"true"})]:[],o)}function Vl(e){const t=K(e.jamming?"STOP":"JAM",{class:"nc-btn lp-big","data-lp-id":"jam",...W(e.jamming?"stop":"jam"),...e.jamming?{}:{"data-jam":""}},()=>C.toggle());t.disabled=!V;const n=K("UNDO",{class:"nc-btn","data-lp-id":"undo",...W("undo")},()=>C.undo());n.disabled=!e.lapHasNotes&&!C.passCount;const o=K("REDO",{class:"nc-btn","data-lp-id":"redo",...W("redo")},()=>C.redo());o.disabled=!e.canRedo,Zo(e),wn(Wo.mount,A("div",{class:"lp-jam-row"},_l,A("div",{class:"lp-jam-buttons"},t,A("div",{class:"lp-two"},n,o),A("p",{class:"lp-sub"},V?"Space jams or stops. Backspace undoes.":"Open Lupa inside the Studio to jam."))),Go)}const pt=Ro("passes","Passes",()=>`${C.passCount} / ${X}`);let qe=null,B="all";const Ul={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},ut={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},ht=e=>e.split("#")[0]??e,Gl=e=>ut[ht(e)]?.noun[0]==="hit",ei=e=>e.kind!=="slot"&&e.kind!=="take";function Le(e){const[t=e,n]=e.split("#"),o=Ul[t]??t.toUpperCase();return n?`${o} ${n}`:o}function Yl(e,t){const n=new Map;for(const i of e.events)i.inst===t&&ei(i)&&i.name&&n.set(i.name,(n.get(i.name)??0)+1);const o=[...n].sort((i,r)=>r[1]-i[1]).map(([i])=>i);return o.length?o.length===1?o[0]:`${o[0]} +${o.length-1}`:""}function xa(e,t){let n=0,o=0,i=0;for(const d of e.events)d.inst===t&&(d.kind==="slot"?o++:d.kind==="take"?i++:n++);const[r,s]=ut[ht(t)]?.noun??["note","notes"],l=[];return i&&l.push(i===1?"voice":`${i} takes`),n&&l.push(`${n} ${n===1?r:s}`),o&&l.push(`${o} slot ${o===1?"change":"changes"}`),l.join(" · ")||"nothing"}const yn=new Map,Wl=1;function Kl(e,t,n){const o=t*D*n,i=1e3,r=34,s=j("svg",{class:"lp-strip",viewBox:`0 0 ${i} ${r}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`}),l=t*D;for(let h=1;h<l;h++){const y=String(h*i/l);s.append(h%D===0?j("line",{class:"lp-strip-bar",x1:y,x2:y,y1:"0",y2:String(r)}):j("line",{class:"lp-strip-beat",x1:y,x2:y,y1:String(r/2-2),y2:String(r/2+2)}))}const d=e.events.filter(ei),c=[],p=n/4*Wl,u=new Set(d.filter(h=>Gl(h.inst)).map(h=>h.inst)),b=new Map,g=[...new Set(d.filter(h=>u.has(h.inst)).map(h=>h.note))].sort((h,y)=>y-h);g.length>=2&&g.length<=4&&g.forEach((h,y)=>b.set(h,y));const w=d.filter(h=>!u.has(h.inst)).map(h=>h.note);let f=Math.min(...w)-2,m=Math.max(...w)+2;if(m-f<12){const h=(m+f)/2;f=h-6,m=h+6}for(const h of d){const y=h.at/o*i,x=(.35+.65*h.vel).toFixed(2);if(u.has(h.inst)){const v=b.get(h.note);let $,k;if(v===void 0){const E=4+h.vel*9;$=r/2-E,k=r/2+E}else{const E=6+v*(r-12)/Math.max(1,b.size-1);$=E-3,k=E+3}s.append(j("line",{class:"lp-strip-hit",x1:y.toFixed(1),x2:y.toFixed(1),y1:$.toFixed(1),y2:k.toFixed(1),"stroke-opacity":x})),c.push(h.at/o,Math.min(1,(h.at+p)/o))}else{const v=Math.min(o,h.at+Math.max(1,h.len))/o*i,$=(4+(1-(h.note-f)/(m-f))*(r-8)).toFixed(1);s.append(j("line",{class:"lp-strip-note",x1:y.toFixed(1),x2:Math.max(y+.1,v-2).toFixed(1),y1:$,y2:$,"stroke-opacity":x})),c.push(h.at/o,Math.min(1,(h.at+Math.max(p,h.len))/o))}}for(const h of e.events){if(h.kind!=="take")continue;const y=h.at/o*i,x=Math.min(o,h.at+h.len)/o*i,v=h.peaks?.length?h.peaks:[.35,.35],$=v.length,k=r/2,E=L=>Math.max(.6,L*(r/2-2)),S=v.map((L,P)=>[y+(x-y)*P/Math.max(1,$-1),E(L)]),M=S.map(([L,P])=>`${L.toFixed(1)},${(k-P).toFixed(1)}`),z=[...S].reverse().map(([L,P])=>`${L.toFixed(1)},${(k+P).toFixed(1)}`);s.append(j("path",{class:"lp-strip-voice",d:`M${M.join(" L")} L${z.join(" L")} Z`})),c.push(h.at/o,Math.min(1,(h.at+h.len)/o))}for(const h of e.events){if(h.kind!=="slot")continue;const y=(h.at/o*i).toFixed(1);s.append(j("line",{class:"lp-strip-slot",x1:y,x2:y,y1:"0",y2:String(r)}))}return yn.set(e.id,Float32Array.from(c)),s}function Oe(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const tn={star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"};function ti(e){const t=j("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(j("path",{d:e})),t}function wa(e,t,n,o,i){const r=K("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...o},i);return r.append(ti(n)),r}let ya=null;function Xl(e){qe===e.id&&(qe=null);const t=C.deletePass(e.id);if(!t)return;ya?.close();const n=el({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>C.restorePass(t.pass,t.index),anchor:pt.mount});n.el.setAttribute("data-lp-id","delete-toast"),ya=n}function Ql(e,t){const n=C.session.song,o=D*n.ppq,i=qe===e.id,r=[...new Set(e.instruments)],s=K("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(i)},()=>{qe=i?null:e.id,de()}),l=A("span",{class:"lp-pass-line"},A("span",{class:"lp-pass-title"},e.name));for(const f of r)l.append(A("span",{class:"lp-inst","data-inst":ut[ht(f)]?.token??""},Le(f)));const d=[];for(const f of r){const m=Yl(e,f);d.push(m?`${m} · ${xa(e,f)}`:xa(e,f))}r.length||d.push("Empty"),e.mute&&d.push("muted"),s.append(A("span",{class:"lp-now","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},l,A("span",{class:"lp-pass-sub"},d.join(" · "))));const c=A("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...W("pass-volume")});c.value=String(Math.round(e.volume*100));const p=A("span",{class:"lp-db","data-lp-id":`db-${e.id}`},Oe(e.volume));c.style.setProperty("--lp-fill",`${c.value}%`),c.setAttribute("aria-valuetext",Oe(e.volume)),c.addEventListener("input",()=>{const f=Number(c.value)/100;p.textContent=Oe(f),c.style.setProperty("--lp-fill",`${c.value}%`),c.setAttribute("aria-valuetext",Oe(f)),C.editPass(e.id,{volume:f})});const u=A("div",{class:"lp-ms-pair"},st(`mute-${e.id}`,"M",e.mute,"mute",()=>C.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),st(`solo-${e.id}`,"S",e.solo,"solo",()=>C.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));u.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),u.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const b=wa(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,tn.star,{"aria-pressed":String(e.kept),...W("star")},()=>C.editPass(e.id,{kept:!e.kept})),g=wa(`delete-${e.id}`,`Delete ${e.name}`,tn.trash,W("delete"),()=>Xl(e)),w=A("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...i?{"data-open":""}:{}},s,A("div",{class:"lp-tools"},u,A("div",{class:"lp-acts"},b,g)),A("div",{class:"lp-strip-box"},Kl(e,n.bars,n.ppq),A("span",{class:"lp-head","aria-hidden":"true"})),A("div",{class:"lp-vol"},c,p));if(i){const f=new Set;for(const x of e.events)f.add(Math.floor(x.at/o));const m=A("div",{class:"lp-bars",style:`--lp-bars: ${n.bars}`});for(let x=0;x<n.bars;x++)m.append(A("span",f.has(x)?{"data-on":""}:{},String(x+1)));const h=A("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});h.addEventListener("change",()=>C.editPass(e.id,{name:h.value}));const y=e.quantize;w.append(A("div",{class:"lp-sheet"},h,A("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),A("span",{class:"lp-sub"},`Plays through ${r.map(Le).join(" and ")||"its instrument"}'s current sound.`),m,A("div",{class:"lp-field"},Se("Quantize","pass-quantize"),Ye(`pq-${e.id}`,"Pass quantize",[{value:"song",label:"Song"},...xn.map(x=>({value:x,label:x==="off"?"Off":x}))],y?.grid??"song",x=>C.editPass(e.id,{quantize:x==="song"?null:{grid:x,strength:y?.strength??1}})))))}return w}function Jl(e){if(e.length<2)return null;const t=new Map;for(const r of e)for(const s of new Set(r.instruments))t.set(s,(t.get(s)??0)+1);const n=e.filter(r=>r.kept).length;B!=="all"&&B!=="starred"&&!t.has(B)&&(B="all"),B==="starred"&&!n&&(B="all");const o=(r,s,l,d={})=>{const c=K("",{class:"lp-chip","aria-pressed":String(B===r),"data-lp-id":`filter-${r}`,...d},()=>{B=B===r?"all":r,de()});return c.append(s,A("span",{class:"lp-chip-n"},String(l))),c},i=A("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},o("all","All",e.length));for(const[r,s]of[...t].sort((l,d)=>Le(l[0]).localeCompare(Le(d[0]))))i.append(o(r,Le(r),s,{"data-inst":ut[ht(r)]?.token??""}));return n&&i.append(o("starred",ti(tn.star),n,{"aria-label":"Starred"})),i}function Zl(e){const t=e.session.passes,n=t.some(l=>l.solo),o=t.filter(l=>B==="all"?!0:B==="starred"?l.kept:l.instruments.includes(B)),i=A("div",{class:"lp-passes","data-lp-id":"pass-list"});if(t.length){const l=A("span",{class:"lp-strip-nums",style:`--lp-bars: ${e.session.song.bars}`});for(let d=1;d<=e.session.song.bars;d++)l.append(A("span",{},String(d)));i.append(A("div",{class:"lp-pass-head","aria-hidden":"true"},l))}e.phase==="recording"&&i.append(A("div",{class:"lp-pass-row lp-live","data-live":""},A("span",{class:"lp-pass-name"},A("span",{class:"lp-dot","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},A("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),A("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),yn.clear();for(const l of[...o].reverse())i.append(Ql(l,n));!t.length&&e.phase!=="recording"?i.append(A("p",{class:"lp-sub"},"No passes yet. Press Jam (or Space) and play.")):t.length&&!o.length&&i.append(A("p",{class:"lp-sub"},"No passes here."));const r=t.filter(l=>!l.kept).length,s=K(`CLEAR UNSTARRED${r?` (${r})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...W("clear-unkept")},()=>C.clearUnkept());s.disabled=!r,wn(pt.mount,Jl(t),i,t.length?A("div",{class:"lp-between"},A("span",{class:"lp-row"},s,A("span",{class:"lp-sub"},"Starred passes stay.")),A("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${X}`)):null),Me=""}let Me="";function ec(e){const t=pt.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.lapPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),Me){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");Me=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const o=e.session.passes.some(l=>l.solo),i=[];for(const l of e.session.passes){if(l.mute||o&&!l.solo)continue;const d=yn.get(l.id);if(d){for(let c=0;c<d.length;c+=2)if(d[c]<=n&&n<d[c+1]){i.push(l.id);break}}}const r=i.join("|");if(r===Me)return;Me=r;const s=new Set(i);for(const l of t.querySelectorAll("[data-lp-pass]")){const d=s.has(l.dataset.lpPass??"");d!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",d)}}const ni=[Wo,pt];pl(Vo,ni.map(e=>e.handle),"adjacent");let va="";function ai(e){const t=e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?`Lupa · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,n=`${t}|${e.phase}`;if(n!==va){va=n;try{V?.readout?.(t),V?.chip?.(e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:C.passCount?{text:`${C.passCount} passes`}:null)}catch{}}}function de(){const e=C.view();Hl(e),Vl(e),Zl(e);for(const n of ni)n.update();const t=Uo.querySelector(".lp-notice");t&&(t.textContent=e.notice),ai(e)}C.onChange(de);setInterval(()=>{C.tick()&&de(),C.jamming||C.syncTempo()},Il);function oi(){const e=C.view();e.jamming&&(Zo(e),ai(e)),ec(e),requestAnimationFrame(oi)}requestAnimationFrame(oi);de();window.__looper={looper:C,store:dt,view:()=>C.view(),get hosted(){return!!V}};
