(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=a(i);fetch(i.href,r)}})();function Do(){return(performance.timeOrigin+performance.now())/1e3}var Po="nc-ui",Io={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},_t={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Oe={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},jo={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},te={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},Bo={light:{color:Io.color,semantic:_t,component:Oe,runtime:jo},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},be=e=>`--${Po}-${e}`,wt=_t["label-on-fill-dark"],ln=_t["label-on-fill-light"],Ro=te["label-min-contrast"],Ho=/^#[0-9a-f]{6}$/i,Oo=e=>typeof e=="string"&&Ho.test(e),Ne=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function dn(e,t,a){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),a=Math.max(0,Math.min(1,a));let o=t*Math.min(a,1-a),i=r=>{let s=(r+e/30)%12;return a-o*Math.max(-1,Math.min(s-3,9-s,1))};return`#${Ne(i(0)*255)}${Ne(i(8)*255)}${Ne(i(4)*255)}`}function ea(e){let[t,a,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,a,o),r=Math.min(t,a,o),s=(i+r)/2,l=i-r;if(!l)return{h:0,s:0,l:s};let c=l/(1-Math.abs(2*s-1));return{h:((i===t?60*((a-o)/l%6):i===a?60*((o-t)/l+2):60*((t-a)/l+4))+360)%360,s:c,l:s}}function cn(e){let[t,a,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*a+.0722*o}function xt(e,t){let[a,o]=[cn(e),cn(t)].sort((i,r)=>r-i);return(a+.05)/(o+.05)}var _e=e=>xt(e,wt)>=xt(e,ln)?wt:ln;function ta(e,t,a,o=Ro){let i=dn(e,t,a),r=_e(i)===wt?1:-1;for(let s=0;s<40&&xt(i,_e(i))<o;s++)a+=r*.01,i=dn(e,t,a);return i}function _o(e){let{h:t,s:a}=ea(e),o=ta(t,Math.min(a,te["surprise-on-max-saturation"]),te["surprise-on-lightness"]);return{fill:e,ink:_e(e),on:o,onInk:_e(o)}}var Vo=(e,t)=>{let a=Math.abs(e-t)%360;return Math.min(a,360-a)};function Go(e,t=Math.random){let[a,o]=te["surprise-saturation"],[i,r]=te["surprise-lightness"],s=te["surprise-min-hue-gap"],l=Oo(e)?ea(e).h:null,c=t()*360;return l!==null&&Vo(c,l)<s&&(c=(l+s+t()*(360-2*s))%360),ta(c,a+t()*(o-a),i+t()*(r-i))}function Uo(e){if(!e)return null;let t=_o(e);return{[be("surprise-fill")]:t.fill,[be("surprise-ink")]:t.ink,[be("surprise-on")]:t.on,[be("surprise-on-ink")]:t.onInk}}var Yo=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Ko=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function pn(e){let[t,a,o]=[1,3,5].map(l=>Yo(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*a+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*a+.1073969566*o),s=Math.cbrt(.0883024619*t+.2817188376*a+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*s,1.9779984951*i-2.428592205*r+.4505937099*s,.0259040371*i+.7827717662*r-.808675766*s]}function Wo([e,t,a]){let o=(e+.3963377774*t+.2158037573*a)**3,i=(e-.1055613458*t-.0638541728*a)**3,r=(e-.0894841775*t-1.291485548*a)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(s=>Ne(Ko(Math.max(0,Math.min(1,s)))*255)).join("")}`.toUpperCase()}var Xo=te["velocity-range"],na={min:Oe.rhythm["velocity-min"],max:Oe.rhythm["velocity-max"]},un=Object.fromEntries(Object.entries(Bo).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Qo(e,t=na){let[a,o]=Xo,i=Number.isFinite(e)?Math.max(a,Math.min(o,e)):a,r=(i-a)/(o-a),s=t.ink??Oe.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:s};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:s};let l=pn(t.min),c=pn(t.max);return{velocity:i,t:r,fill:Wo(l.map((d,p)=>d+(c[p]-d)*r)),ink:s}}function hn(e,t=na){return{[be("velocity-fill")]:Qo(e,t).fill}}var aa="data-nc-theme",mn="nc-ui-theme-change",Jo="(prefers-color-scheme: dark)",oa=e=>e?.documentElement??null,ia=e=>e?.defaultView?.matchMedia?.(Jo)??null,Zo=e=>e==="light"||e==="dark"?e:"system";function ei(e=globalThis.document){return Zo(oa(e)?.getAttribute(aa))}function yt(e=globalThis.document){let t=ei(e);return t!=="system"?t:ia(e)?.matches?"dark":"light"}function ra(e,t=globalThis.document){let a=oa(t);if(!a)return()=>{};let o=yt(t),i=()=>{let c=yt(t);c!==o&&(o=c,e(c))},r=t.defaultView?.MutationObserver,s=r?new r(i):null;s?.observe(a,{attributes:!0,attributeFilter:[aa]});let l=ia(t);return l?.addEventListener?.("change",i),t.addEventListener(mn,i),()=>{s?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(mn,i)}}var ti={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ni={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},ai={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},oi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},et={};for(let[e,t]of Object.entries(ni))et[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(oi))et[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(ai))et[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(ti.renames.map(e=>[e.old,e.new]));function sa(e){let t=et[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function C(e){return sa(e).prop}function n(e){return`var(${C(e)})`}function ii(e,t){if(!(e instanceof Element))return 0;let a=Number.parseFloat(getComputedStyle(e).getPropertyValue(C(t)));return Number.isFinite(a)?a:0}function L(e,t){let a=sa(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${a.prop})`;a.kind==="family"?i.style.fontFamily=r:a.kind==="length"||a.kind==="other"||a.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let s=(o.defaultView??window).getComputedStyle(i),l=a.kind==="family"?s.fontFamily:a.kind==="color"?s.color:s.paddingLeft;return i.remove(),l}function la(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function ri(e){let t=e.ownerDocument??document,a=t.createElement("span");a.style.fontFamily=n("font-ui"),a.style.fontSize=n("label-size"),a.style.fontWeight=n("label-weight"),(e instanceof Element?e:t.documentElement).append(a);let o=(t.defaultView??window).getComputedStyle(a).font;return a.remove(),o}var si="[data-modulated], [data-modulated] *";function it(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function fn(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${n("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${n("hairline")} solid ${n("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function li(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${n(`module-bg-stack-${o}`)};
      ${C("text-sub")}: ${n(`module-sub-stack-${o}`)};
      ${C("divider")}: ${n(`module-div-stack-${o}`)};
      ${C("slider-track")}: ${n(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${n(`module-bg-adjacent-${o}`)}; }`,a=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${n(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${n("module-bg-stack-1")};
      ${C("text-sub")}: ${n("module-sub-stack-1")};
      ${C("divider")}: ${n("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${n("surface-page")};
  color: ${n("text")};
  font-family: ${n("font-ui")};
  font-size: ${n("body-size")};
  font-weight: ${n("title-weight")};
  line-height: ${n("label-leading")};
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
  padding: ${n("page-pad-y")} ${n("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${n("page-action-gap")};
  min-width: 0;
  padding-bottom: ${n("page-head-gap")};
  border-bottom: ${n("hairline")} solid ${n("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${n("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${n("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${n("page-pad-x")} * -1);
  right: calc(${n("page-pad-x")} * -1);
  background: ${n("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${n("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${n("page-title-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${n("page-sub-gap")} 0 0; font-size: ${n("page-sub-size")}; color: ${n("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${n("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${n("control-gap")} ${n("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${n("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${n("control-gap")};
  color: ${n("text-sub")};
  font-size: ${n("label-size")};
  font-weight: ${n("control-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${n("transition-feedback")};
}
.nc-page-action:hover { color: ${n("text")}; border-bottom-color: ${n("text")}; }
.nc-page-action:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("control-gap")}; }
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
    min-width: ${n("target-min")};
    min-height: ${n("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${n("target-min")} - ${n("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${n("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${n("target-min")} / 2.75); height: calc(${n("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: calc(${n("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${n("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${n("control-gap")};
    background: ${n("surface-page")};
    color: ${n("text")};
    border-bottom: ${n("hairline")} solid ${n("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${n("page-pad-x")} * -1);
    right: calc(${n("page-pad-x")} * -1);
    padding-inline: ${n("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${n("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${n("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${n("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${n("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${n("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${n("page-pad-x-md")} * -1);
    right: calc(${n("page-pad-x-md")} * -1);
    padding-inline: ${n("page-pad-x-md")};
  }
}
.nc-module {
  background: ${n("module-bg-adjacent-1")};
  color: ${n("text")};
  padding: ${n("module-pad")};
  border: 0;
  border-bottom: ${n("hairline")} solid ${n("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${n("font-ui")};
  transition: none;
}
${[1,2,3,4].map(t).join(`
`)}
${[1,2,3,4].map(e).join(`
`)}
${[1,2,3,4].map(a).join(`
`)}
.nc-module-hd {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  justify-content: space-between;
  gap: ${n("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${n("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${n("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${n("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${n("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${n("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${n("title-size")};
  font-weight: ${n("title-weight")};
  letter-spacing: ${n("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${n("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${n("header-gap")}; flex: none; }
.nc-index {
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  color: ${n("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${n("control-gap")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("body-size")};
  line-height: ${n("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${n("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${n("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${n("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("control-gap")};
}
.nc-slim-lines {
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${n("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${n("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${n("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${n("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${n("readout-size")};
  color: ${n("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${n("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${n("name-width")} - ${n("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${n("name-width")} - ${n("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${n("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${n("module-gap")};
  row-gap: ${n("control-gap")};
  padding-bottom: ${n("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${n("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${n("control-gap")};
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  line-height: ${n("label-leading")};
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
  bottom: calc(-1 * ${n("control-gap")});
  width: max(100%, ${n("target-min")});
  height: max(100%, ${n("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${n("text-sub")}; color: ${n("text")}; }
.nc-tap:active { background: ${n("text")}; border-color: ${n("text")}; color: ${n("surface-page")}; }
.nc-tap:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${n("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${n("module-pad")} * -1);
  margin-bottom: calc(${n("module-pad")} * -1);
  padding: ${n("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${n("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${n("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${n("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${n("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${n("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${n("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${n("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${n("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${n("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${n("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${n("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${n("hairline")};
  background: ${n("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${n("hairline")};
  background: ${n("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${n("hairline")};
  background: ${n("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${n("slider-thumb-size")};
  height: ${n("slider-thumb-size")};
  margin-top: calc(${n("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${n("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${n("slider-thumb-size")};
  height: ${n("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${n("slider-thumb")};
  transition: none;
}
${si} { transition: none; }
.nc-range:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${n("hairline")} solid ${n("text")};
  background: transparent;
  color: ${n("text")};
  min-height: ${n("target-min")};
  padding: ${n("button-pad-y")} 0;
  font-size: ${n("readout-size")};
  letter-spacing: ${n("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${n("transition-feedback")};
}
.nc-btn:hover { background: ${n("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${n("accent")};
  border-color: ${n("accent")};
  color: ${n("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${n("focus-width-strong")} solid ${n("focus-ring")};
  outline-offset: ${n("control-gap")};
}
.nc-btn:disabled { color: ${n("text-sub")}; border-color: ${n("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${n("hairline")} solid transparent;
  background: transparent;
  color: ${n("text-sub")};
  font-size: ${n("label-size")};
  font-weight: ${n("control-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${n("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${n("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${n("text")}; }
.nc-toggle:hover { border-bottom-color: ${n("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${n("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${n("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${n("rhythm.track-solo")};
  border-bottom-color: ${n("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${n("hairline")} solid ${n("divider")};
  margin-bottom: ${n("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${n("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font-size: ${n("tab-size")};
  font-weight: ${n("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${n("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${n("label-size")}; padding-inline: ${n("control-gap")}; }
.nc-seg > button:hover { color: ${n("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${n("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${n("hairline")} * -1);
  height: ${n("tab-mark")};
  background: ${n("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: calc(${n("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${n("hairline")} solid ${n("divider")};
  border-radius: 0;
  color: ${n("text")};
  font-size: ${n("body-size")};
  padding: ${n("control-gap")} ${n("select-pad-end")} ${n("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${n("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${n("accent")}; }
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${n("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${n("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${n("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${n("slot-size")};
  width: ${n("slot-size")};
  max-width: ${n("slot-size")};
  min-width: 0;
  height: ${n("slot-size")};
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
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("slot-font-size")};
  line-height: ${n("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${n("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${n("text-sub")};
  color: ${n("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${n("accent")};
  color: ${n("accent")};
  box-shadow: inset 0 calc(-1 * ${n("focus-width")} * 2) 0 ${n("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${n("accent")};
  outline: ${n("focus-width")} solid ${n("accent-faint")};
  outline-offset: ${n("hairline")};
  box-shadow: inset 0 calc(-1 * ${n("focus-width")} * 2) 0 ${n("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${n("accent")};
  background: ${n("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${n("focus-width")} * 2) 0 ${n("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${n("control-gap")};
  right: ${n("control-gap")};
  width: ${n("control-gap")};
  height: ${n("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${n("sparkle-size")};
  width: ${n("sparkle-size")};
  height: ${n("sparkle-size")};
  margin-inline: ${n("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${n("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${n("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${n("target-min")};
  width: ${n("target-min")};
  min-height: ${n("target-min")};
  padding: 0;
  border: ${n("hairline")} solid ${n("divider")};
  background: ${n("surprise-fill")};
  color: ${n("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${n("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${n("target-min")} / 2); height: calc(${n("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${n("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
.nc-sparkle svg { width: ${n("sparkle-icon-size")}; height: ${n("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${n("text")}; }
.nc-sparkle:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  color: ${n("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${n("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${n("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${n("name-width")};
  width: ${n("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${n("beat-gap")} - ${n("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${n("row-inset")});
  padding-inline: ${n("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${n("accent-tint")};
  box-shadow: inset ${n("marker-width")} 0 0 ${n("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${n("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${n("text")};
  text-decoration: underline;
  text-decoration-color: ${n("accent")};
  text-decoration-thickness: ${n("hairline")};
  text-underline-offset: ${n("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${n("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${n("move-row-gap")}; margin-top: ${n("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${n("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${n("move-label-width")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${n("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${n("move-size")};
  height: ${n("move-size")};
  padding: 0;
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${n("move-icon")}; height: ${n("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${n("text")}; border-color: ${n("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-moves-btn:disabled { color: ${n("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${n("target-min")}; height: ${n("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${n("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${n("text-sub")}; border-color: ${n("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${n("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${n("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${n("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${n("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${n("slider-pitch")};
  height: ${n("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text-sub")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${n("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${n("rhythm.track-mute")};
  border-color: ${n("rhythm.track-mute")};
  color: ${n("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${n("rhythm.track-solo")};
  border-color: ${n("rhythm.track-solo")};
  color: ${n("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${n("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${n("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${n("hairline")} solid ${n("text-sub")};
  border-radius: ${n("slot-radius")};
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
  background: ${n("velocity-fill")};
  border-color: ${n("velocity-fill")};
  color: ${n("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${n("rhythm.accent-mark-size")}) 0 0 ${n("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${n("playhead-width")} solid ${n("rhythm.playhead")};
  outline-offset: ${n("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${n("rhythm.bar-accent")}; }
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${n("rhythm.step-mark-inset")};
  bottom: ${n("rhythm.step-mark-inset")};
  font-family: ${n("font-readout")};
  font-size: ${n("rhythm.step-mark-size")};
  font-weight: ${n("control-weight")};
  line-height: 1;
  color: ${n("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${n("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${n("rhythm.step-mark-inset")} + ${n("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${n("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${n("control-gap")};
  margin-inline: calc((${n("control-gap")} + ${n("rhythm.step-gap")}) / -2);
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
  width: ${n("hairline")};
  height: ${n("target-min")};
  max-height: calc(${n("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${n("hairline")} solid ${n("text-sub")};
  background: ${n("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${n("text")}; border-color: ${n("text")}; }
.nc-len-handle:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${n("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${n("accent")}; }
.nc-pad[data-out="true"] { border-color: ${n("divider")}; border-style: dashed; background: transparent; color: ${n("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${n("focus-width")} * 2) 0 0 ${n("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${n("focus-width")} * 2) 0 0 ${n("text")}, inset 0 calc(-1 * ${n("rhythm.accent-mark-size")}) 0 0 ${n("rhythm.accent-mark")};
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
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${n("module-gap")};
  margin-bottom: ${n("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${n("target-min")} / 3); height: calc(${n("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${n("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${n("text")}; border-color: ${n("text")}; color: ${n("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${n("target-min")};
  min-height: ${n("target-min")};
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: ${n("surface-page")};
  color: ${n("text")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  font-weight: ${n("title-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${n("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${n("text")}; border-color: ${n("text")}; color: ${n("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${n("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${n("control-gap")};
  color: ${n("text-sub")};
  font-weight: ${n("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${n("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${n("text")}; border-bottom-color: ${n("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${n("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${n("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${n("target-min")} * 1.25);
  border: ${n("hairline")} solid ${n("text-sub")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${n("control-gap")} ${n("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${n("velocity-fill")};
  border-color: ${n("velocity-fill")};
  color: ${n("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${n("rhythm.accent-mark-size")}) 0 0 ${n("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${n("playhead-width")} solid ${n("rhythm.playhead")};
  outline-offset: ${n("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${n("divider")}; color: ${n("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${n("text-sub")}; border-color: ${n("text-sub")}; color: ${n("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
.nc-step:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${n("playhead-width")};
  outline-offset: ${n("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${n("module-pad")} * -1);
  padding: ${n("stack-card-pad-y")} ${n("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${n("module-gap")} 0;
  font-size: ${n("body-size")};
  font-weight: ${n("fx-name-weight")};
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
  gap: ${n("module-gap")};
  margin-bottom: ${n("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${n("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${n("control-gap")}; left: ${n("control-gap")}; z-index: 1; }
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
  padding: ${n("hairline")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${n("text")}; }
.nc-fold-toggle:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${n("control-gap")} * 1.5);
  height: calc(${n("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${n("motion-press")} ${n("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${n("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${n("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${n("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${n("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${n("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${n("control-gap")};
  border-bottom: ${n("hairline")} solid transparent;
  font-size: ${n("label-size")};
  font-weight: ${n("control-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  line-height: ${n("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${n("text")}; border-bottom-color: ${n("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${n("body-size")};
  font-weight: ${n("fx-name-weight")};
  color: ${n("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${n("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${n("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${n("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${n("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${n("slot-gap")};
  height: ${n("level-steps-height")};
  padding: calc(${n("slot-gap")} * 2);
  background: ${n("eq-graph-bg")};
  border-radius: ${n("slot-radius")};
  box-shadow: inset 0 0 0 ${n("hairline")} ${n("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${n("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${n("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${n("beat-gap")} - ${n("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${n("level-steps-bar")}; }
.nc-lsteps-env { fill: ${n("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${n("level-steps-curve")}; stroke-width: ${n("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${n("divider")}; stroke-width: ${n("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${n("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${n("hairline")} ${n("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${n("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${n("playhead-width")} solid ${n("playhead")}; outline-offset: ${n("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${n("level-steps-free")}; outline-width: ${n("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${n("playhead-width")} * -1) 0 0 ${n("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${n("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${n("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${n("slot-gap")} * 2) * -1));
  padding: calc(${n("slot-gap")} / 2) calc(${n("slot-gap")} * 2);
  border-radius: ${n("slot-radius")};
  background: ${n("accent")};
  color: ${n("on-accent")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${n("slot-gap")};
  padding: ${n("slot-gap")} calc(${n("slot-gap")} * 2) 0;
  font-family: ${n("font-readout")};
  font-size: ${n("slot-font-size")};
  line-height: 1;
  color: ${n("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${n("hairline")} solid ${n("divider")}; margin-top: ${n("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${n("slot-gap")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${n("slot-gap")} 0 ${n("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${n("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${n("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${n("hairline")} * -1);
  height: ${n("tab-mark")};
  background: ${n("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: calc(${n("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${n("label-size")} * 1.8); height: calc(${n("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${n("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${n("slot-gap")};
  padding: calc(${n("slot-gap")} * 2);
  background: ${n("surface-page")};
  border-radius: ${n("slot-radius")};
  box-shadow: 0 0 0 ${n("hairline")} ${n("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${n("slot-gap")} * 2); font-family: ${n("font-readout")}; font-size: ${n("readout-size-small")}; color: ${n("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${n("slot-gap")} * 2); border-radius: ${n("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${n("on-accent")}; background: ${n("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${n("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${n("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${n("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${n("eq-graph-height")};
  background: ${n("eq-graph-bg")};
  border-radius: ${n("slot-radius")};
  box-shadow: inset 0 0 0 ${n("hairline")} ${n("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${n("eq-curve")};
  position: absolute;
  width: ${n("eq-node-size")};
  height: ${n("eq-node-size")};
  margin: calc(${n("eq-node-size")} / -2) 0 0 calc(${n("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${n("hairline")} ${n("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${n("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${n("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${n("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${n("target-min")};
  height: ${n("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${n("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${n("motion-press")} ${n("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${n("hairline")} * 2) ${n("eq-graph-bg")}, 0 0 0 calc(${n("hairline")} * 2 + ${n("focus-width")}) ${n("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${n("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${n("hairline")} ${n("control-gap")};
  border-radius: ${n("slot-radius")};
  background: ${n("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${n("hairline")} ${n("divider")};
  color: ${n("text")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  line-height: ${n("label-leading")};
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
  padding: ${n("hairline")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${n("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-fx-close { font-size: ${n("title-size")}; padding-inline: ${n("control-gap")}; }
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
  padding: 0 ${n("hairline")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${n("control-gap")} * -1);
  right: calc(${n("control-gap")} * -1);
  height: max(100%, calc(${n("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${n("text")}; }
.nc-fx-remove:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${n("control-gap")} * 2.5); height: calc(${n("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${n("control-gap")} * 1.1);
  height: calc(${n("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${n("motion-press")} ${n("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${n("hairline")} * 1.5); border-top-width: calc(${n("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${n("hairline")} * 1.5); border-top-width: calc(${n("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${n("hairline")} * 1.5); border-bottom-width: calc(${n("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${n("hairline")} * 1.5); border-bottom-width: calc(${n("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${n("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${n("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${n("module-pad")} * 2);
  row-gap: ${n("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${n("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${n("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${n("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${n("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${n("hairline")} ${n("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${n("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${n("control-gap")};
  cursor: pointer;
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text-sub")};
}
.nc-ui-more > summary:hover { color: ${n("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: calc(${n("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${n("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${n("module-gap")};
  row-gap: ${n("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${n("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${n("text-sub")};
}
.nc-group-toggle:hover { color: ${n("text")}; }
.nc-group-toggle:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: calc(${n("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${n("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${n("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${n("control-gap")};
  border: 0;
  border-bottom: ${n("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${n("label-size")};
  font-weight: ${n("control-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${n("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${n("text")}; border-bottom-color: ${n("accent")}; }
.nc-ui-switch:hover { color: ${n("text")}; border-bottom-color: ${n("text")}; }
.nc-ui-switch:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("control-gap")}; }
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
    width: max(100%, ${n("target-min")});
    height: max(100%, ${n("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${n("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${n("module-pad")} * -1);
  margin-bottom: calc(${n("module-pad")} * -1);
  padding: ${n("module-pad")};
  background: ${n("surface-page")};
  border-top: ${n("hairline")} solid ${n("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${n("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${n("title-size")};
  font-weight: ${n("title-weight")};
  letter-spacing: ${n("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  color: ${n("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${n("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${n("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${n("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${n("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${n("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${n("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${n("danger")}; }
.nc-knob {
  width: ${n("knob-size")};
  height: ${n("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${n("hairline")} solid ${n("divider")};
  background: ${n("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${n("control-gap")};
  width: ${n("hairline")};
  height: ${n("control-gap")};
  background: ${n("text")};
  transform-origin: center ${n("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${n("control-gap")} ${n("header-gap")};
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
  border-bottom: ${n("hairline")} solid transparent;
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  padding: ${n("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${n("target-min")}; min-height: ${n("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${n("control-gap")}; margin-bottom: ${n("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${n("text")};
  border-bottom-color: ${n("accent")};
}
.nc-choice:focus-visible {
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${n("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${n("target-min")} * 1.5);
  padding: ${n("control-gap")} ${n("control-gap")} ${n("control-gap")} calc(${n("control-gap")} * 2);
  border: ${n("hairline")} solid ${n("text-sub")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${n("control-gap")};
  inset-inline-start: ${n("hairline")};
  width: ${n("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${n("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${n("text-sub")}; font-size: ${n("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${n("control-gap")};
  inset-inline-end: ${n("control-gap")};
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${n("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${n("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${n("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${n("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${n("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${n("control-gap")};
  border-color: ${n("divider")};
  background: ${n("divider")};
  color: ${n("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${n("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${n("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${n("accent")}; box-shadow: inset 0 0 0 ${n("hairline")} ${n("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${n("target-min")};
  padding: 0 ${n("control-gap")};
  border: ${n("hairline")} solid ${n("accent")};
  border-radius: ${n("slot-radius")};
  background: ${n("surface-page")};
  color: ${n("text")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  font-weight: ${n("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${n("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${n("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${n("control-gap")};
  min-width: ${n("name-width")};
  padding: ${n("control-gap")};
  background: ${n("surface-page")};
  border: ${n("hairline")} solid ${n("divider")};
  color: ${n("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${n("target-min")};
  border: 0;
  background: transparent;
  color: ${n("text")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${n("target-min")};
  margin-block: calc((${n("slider-pitch")} - ${n("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${n("target-min")}; height: ${n("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${n("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${n("target-min")}); right: calc(${n("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${n("target-min")});
    height: max(100%, ${n("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${n("target-min")} - ${n("slider-pitch")}) / 2);
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
  outline: ${n("focus-width")} solid ${n("focus-ring")};
  outline-offset: ${n("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${n("target-min")};
  height: ${n("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${n("target-min-coarse")}; height: ${n("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${n("module-gap")};
  width: calc(${n("name-width")} * 6);
  max-width: calc(100vw - 2 * ${n("module-gap")});
  padding: ${n("module-gap")};
  background: ${n("surface-page")};
  border: ${n("hairline")} solid ${n("divider")};
  color: ${n("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${n("focus-width")} solid ${n("text")};
  outline-offset: ${n("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${n("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${n("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${n("module-gap")};
  min-height: ${n("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${n("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${n("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${n("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${n("target-min")};
  min-height: ${n("target-min")};
  border: 0;
  background: none;
  color: ${n("text")};
  font-family: ${n("font-ui")};
  font-size: ${n("label-size")};
  font-weight: ${n("title-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${n("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${n("hairline")} 0 0;
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
  gap: ${n("toast-gap")};
  max-width: calc(100vw - 2 * ${n("toast-offset")});
  min-height: ${n("toast-target")};
  padding: 0 0 0 ${n("toast-pad-x")};
  border-radius: ${n("toast-radius")};
  background: ${n("toast-bg")};
  color: ${n("toast-text")};
  font-family: ${n("font-ui")};
  font-size: ${n("toast-font-size")};
  line-height: ${n("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${n("motion-fade")} ${n("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${n("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${n("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${n("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${n("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${n("motion-fade-out")} ${n("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${n("toast-pad-x")} / 2) calc(${n("toast-pad-x")} * 0.75);
  border-radius: ${n("toast-radius")};
  background: ${n("toast-bg")};
  color: ${n("toast-text")};
  font-family: ${n("font-ui")};
  font-size: ${n("toast-font-size")};
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
  min-width: ${n("toast-target")};
  min-height: ${n("toast-target")};
  padding: 0 ${n("toast-pad-x")};
  border: 0;
  background: none;
  color: ${n("toast-action")};
  font: inherit;
  font-weight: ${n("title-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${n("focus-width")} solid ${n("toast-action")};
  outline-offset: calc(-2 * ${n("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${n("hairline")};
  height: ${n("hairline")};
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
  margin-inline: calc(${n("module-pad")} * -1);
  margin-bottom: calc(${n("module-pad")} * -1);
  border-top: ${n("hairline")} solid ${n("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${n("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${n("module-pad")} ${n("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${n("module-bg-stack-1")};
  ${C("text-sub")}: ${n("module-sub-stack-1")};
  ${C("divider")}: ${n("module-div-stack-1")};
  ${C("slider-track")}: ${n("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${n("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${n("stack-card-pad-y")} ${n("module-pad")} ${n("module-pad")};
  border-inline-end: ${n("hairline")} solid ${n("module-div-stack-1")};
  background: ${n("module-bg-stack-1")};
  ${C("text-sub")}: ${n("module-sub-stack-1")};
  ${C("divider")}: ${n("module-div-stack-1")};
  ${C("slider-track")}: ${n("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${n("control-gap")} ${n("module-pad")};
  padding-bottom: ${n("module-pad")};
  background: ${n("module-bg-stack-1")};
  ${C("text-sub")}: ${n("module-sub-stack-1")};
  ${C("divider")}: ${n("module-div-stack-1")};
  ${C("slider-track")}: ${n("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${n("stack-card-pad-y")} ${n("module-pad")} ${n("module-pad")};
  ${C("text-sub")}: inherit;
  ${C("divider")}: inherit;
  ${C("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${n("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${n("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${n("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${n("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${n("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${n("fx-card-width")}; }
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
    width: calc(${n("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${n("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${n("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${n("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${n("module-gap")} * 3), 100% ${n("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${n("module-pad")} * -1) calc(${n("module-gap")} * -1);
    padding: ${n("stack-card-pad-y")} ${n("module-pad")} calc(${n("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${n("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${n("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${n("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${n("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${n("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${n("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${n("fx-card-width")};
    margin-inline-end: calc(${n("fx-card-width")} * -1);
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
    gap: ${n("module-gap")};
    height: ${n("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${n("target-min")};
  height: ${n("target-min")};
  margin: 0;
  padding: 0;
  border: ${n("hairline")} solid ${n("text-sub")};
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${n("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${n("divider")}; border-color: ${n("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${n("control-gap")} * 2.5);
  height: calc(${n("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${n("hairline")} * 2) calc(${n("hairline")} * 2) 0 0;
  transform: translateX(calc(${n("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${n("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${n("text")};
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
  --nc-strip-ms-row: ${n("slider-pitch")};
  --nc-strip-knob-row: calc(${n("knob-size")} + ${n("control-gap")} + ${n("label-size")} * ${n("label-leading")});
  position: relative;
  flex: none;
  width: ${n("strip-width")};
  display: grid;
  grid-template-columns: ${n("control-gap")} minmax(0, 1fr) ${n("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${n("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${n("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${n("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${n("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${n("hairline")} solid ${n("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${n("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${n("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(o=>`.nc-strip[data-nc-shade="${o}"] { --nc-strip-shade: ${n(`strip-shade-${o}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${C("divider")}: color-mix(in oklab, ${n("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${C("meter-track")}: color-mix(in oklab, ${n("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${n("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${n("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${n("control-gap")};
  min-width: calc(${n("strip-width")} * 2.5);
  padding: calc(${n("control-gap")} * 2) calc(${n("control-gap")} * 2.5);
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: ${n("surface-page")};
  color: ${n("text")};
  font-size: ${n("label-size")};
}
.nc-strip-menu-title { color: ${n("text-sub")}; font-weight: ${n("label-weight")}; letter-spacing: ${n("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${n("control-gap")}; margin-bottom: ${n("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${n("control-gap")} * 4.5);
  height: calc(${n("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${n("hairline")};
  border: ${n("hairline")} solid ${n("divider")};
  border-radius: ${n("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${n("text-sub")};
  font: inherit;
  font-size: ${n("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${n("hairline")} * 2) solid ${n("text")}; outline-offset: ${n("hairline")}; color: ${n("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${n("control-gap")} * 3);
  margin: 0;
  padding: ${n("control-gap")} 0;
  border: 0;
  border-top: ${n("hairline")} solid ${n("divider")};
  background: transparent;
  color: ${n("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${n("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${n("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: calc(${n("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${n("target-min")} * 0.7); height: calc(${n("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${n("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${n("stack-card-pad-y")} ${n("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${n("stack-card-pad-y")} ${n("module-pad")}; }
.nc-strip[data-nc-master] { width: ${n("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${n("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  font-family: ${n("font-readout")};
  font-size: ${n("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${n("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${n("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${n("danger")}; }
.nc-strip-remove:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
  text-transform: uppercase;
  color: ${n("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${n("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${n("control-gap")}; left: ${n("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${n("control-gap")};
  right: ${n("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${n("hairline")};
  border: 0;
  background: transparent;
  color: ${n("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${n("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${n("control-gap")} * 1.5);
  height: calc(${n("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${n("hairline")}, transparent calc(${n("hairline")} * 1.5)) 0 0 / calc(${n("control-gap")} * 0.75) calc(${n("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${n("control-gap")} * -1);
    top: calc(${n("control-gap")} * -1);
    width: calc(${n("target-min")} / 2);
    height: calc(${n("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${n("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${n("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${n("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${n("slider-pitch")};
  grid-auto-rows: ${n("slider-pitch")};
  gap: ${n("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${n("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${n("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${n("control-gap")}; }
.nc-strip-fold { gap: ${n("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${n("label-size")}; font-weight: ${n("label-weight")}; letter-spacing: ${n("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${n("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${n("fader-cap-height")};
  height: ${n("control-gap")};
  background: linear-gradient(${n("divider")}, ${n("divider")}) center / 100% ${n("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${n("control-gap")}));
  width: ${n("control-gap")};
  height: ${n("control-gap")};
  border-radius: 50%;
  background: ${n("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${n("fader-cap-height")};
  height: ${n("control-gap")};
  background: var(--nc-strip-cap, ${n("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${n("slider-pitch")};
  grid-template-rows: ${n("slider-pitch")};
  column-gap: ${n("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${n("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${n("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${n("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${C("divider")}: ${n("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${n("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${n("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${n("hairline")} solid color-mix(in oklab, ${n("text-sub")} 50%, ${n("strip-divider")});
  border-radius: ${n("slot-radius")};
  background: transparent;
  color: ${n("strip-hacks-text")};
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${n("text")}; border-color: ${n("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${n("fader-cap-master")};
  border-color: ${n("fader-cap-master")};
  color: ${n("surface-page")};
}
.nc-hacks:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${n("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${n("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${n("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${n("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${n("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${n("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${n("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${n("meter-track")} calc(var(--knob-from, 135) * 1deg), ${n("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${n("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${n("label-size")};
  line-height: ${n("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${n("fader-cap-width")} auto auto;
  grid-template-rows: ${n("clip-size")} ${n("fader-height")};
  justify-content: center;
  column-gap: ${n("control-gap")};
  row-gap: ${n("control-gap")};
  padding-block: calc(${n("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${n("font-readout")};
  font-size: ${n("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${n("text-sub")};
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
  width: ${n("fader-cap-width")};
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
  width: ${n("rule-strong")};
  transform: translateX(-50%);
  background: ${n("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${n("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${n("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${n("hairline")};
  transform: translateY(-50%);
  background: ${n("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${n("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${n("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${n("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${n("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${n("clip-size")};
  padding: 0;
  border: 0;
  background: ${n("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${n("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${n("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-meter-bars { display: flex; gap: ${n("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${n("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${n("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${n("meter-peak")}; }
.nc-meter-rms { background: ${n("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${n("rule-strong")} solid ${n("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${n("hairline")}; height: ${n("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${n("fx-level-bar")}; overflow: hidden; background: ${n("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${n("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${n("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${n("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${n("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${n("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${n("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${n("divider")}; text-underline-offset: ${n("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${n("hairline")} solid ${n("accent")};
  border-radius: 0;
  background: transparent;
  color: ${n("text")};
  font-family: ${n("font-readout")};
  font-size: ${n("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${n("strip-width")};
  margin-inline-start: ${n("module-gap")};
  border: ${n("hairline")} dashed ${n("divider")};
  color: ${n("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${n("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${n("text")}; border-color: ${n("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${n("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${n("font-readout")}; font-size: ${n("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${n("label-size")};
  font-weight: ${n("label-weight")};
  letter-spacing: ${n("label-tracking")};
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
  font-size: ${n("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
.nc-strip-db:focus-visible { outline: ${n("focus-width")} solid ${n("focus-ring")}; outline-offset: ${n("hairline")}; }
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
    border-top: ${n("hairline")} solid ${n("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${n("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${n("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${n("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${n("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${n("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${n("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${n("module-pad-x-desktop")};
    padding-bottom: ${n("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${n("stack-card-pad-y")} ${n("module-pad-x-desktop")} ${n("module-pad-y-desktop")};
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
  background: ${n("accent")};
  font-family: ${n("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${n("page-pad-y-md")} ${n("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${n("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${n("page-pad-y-md")} * -1); left: calc(${n("page-pad-x-md")} * -1); right: calc(${n("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${n("header-gap")};
  padding-inline: ${n("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${n("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${n("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${n("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${n("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${n("target-min")}; }
  .nc-snap { font-size: ${n("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${n("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${n("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${n("page-pad-x-xl")} * -1); right: calc(${n("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${n("hairline")} solid ${n("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${n("module-pad-y-desktop")} ${n("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${n("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${n("target-min")};
  }
  .nc-snap { font-size: ${n("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${n("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${n("module-pad-y-desktop")} * -1);
    padding: ${n("module-pad-y-desktop")} ${n("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${n("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${n("module-pad-y-desktop")} * -1);
    padding: ${n("module-pad-y-desktop")} ${n("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${n("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${n("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${n("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${n("module-pad-x-desktop")} * -1);
    padding-inline: ${n("module-pad-x-desktop")};
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
    border-bottom: ${n("hairline")} solid ${n("divider")};
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
    gap: ${n("module-gap")};
    padding-block: ${n("control-gap")};
    background: ${n("surface-page")};
    border-bottom: ${n("hairline")} solid ${n("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${n("module-gap")};
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
    max-width: ${n("slot-span")};
    height: ${n("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${n("readout-size")}; }
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
${fn("")}
}
@media (max-width: 1023px) {
${fn("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${it("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${it("")}
}
@media (max-width: 1023px) {
${it("html[data-nc-landscape] ")}
}
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${n("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${n("focus-width")} * 2) 0 ${n("accent-faint")};
  }
}
`}var rt=null,di="nc-ui-fallback";function da(e=globalThis.document){if(!e?.documentElement||(e.documentElement,rt&&rt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${di} {
${li()}
}
`,e.head.append(t),rt=t}var ci=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,pi=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=ci,t.dataset.ncUiConfirm="",t.ncWait=new Promise(a=>{let o=()=>{t.ncWait=null,a()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&pi(document);function ca(e={}){let t=e.doc??globalThis.document,a=t.createElement("button");a.type="button",a.className="nc-ui-switch",a.setAttribute("role","switch"),e.id&&(a.id=e.id),e.labelledBy?a.setAttribute("aria-labelledby",e.labelledBy):e.label&&a.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),a.append(o);let s=!1,l=d=>{s=d===!0,a.setAttribute("aria-checked",s?"true":"false")};l(e.checked);let c=()=>{l(!s),e.onChange?.(s)};return a.addEventListener("click",c),{el:a,get checked(){return s},set:l,destroy(){a.removeEventListener("click",c),a.remove()}}}var pa=new WeakMap,gn=.25;function ui(e){let t=e.doc??globalThis.document,a=t.createElement("div");a.className="nc-fader",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),a.append(o,i);let r=0,s=e.step??.005,l=e.onChange,c=e.onReset,d=m=>Math.min(1,Math.max(0,m)),p=()=>{a.style.setProperty("--fader-pos",String(r)),a.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},u=m=>{let y=d(m);y!==r&&(r=y,p(),l?.(y))},g=0,h=!1;a.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),a.focus?.({preventScroll:!0});let y=a.getBoundingClientRect();m.target!==i&&y.height>0&&u(1-(m.clientY-y.top)/y.height),g=m.clientY,h=!0,a.dataset.dragging="true",a.setPointerCapture?.(m.pointerId)}),a.addEventListener("pointermove",m=>{if(!h)return;let y=a.getBoundingClientRect().height||1,b=(g-m.clientY)/y*(m.shiftKey?gn:1);g=m.clientY,u(r+b)});let x=()=>{h=!1,delete a.dataset.dragging};a.addEventListener("pointerup",x),a.addEventListener("pointercancel",x),a.addEventListener("lostpointercapture",x),a.addEventListener("dblclick",m=>{m.preventDefault(),c?.()}),a.addEventListener("keydown",m=>{let y=m.shiftKey?s*gn:s,b={ArrowUp:r+y,ArrowRight:r+y,ArrowDown:r-y,ArrowLeft:r-y,PageUp:r+s*10,PageDown:r-s*10,Home:0,End:1};m.key in b&&(m.preventDefault(),u(b[m.key]))});let w={el:a,get value(){return r},get dragging(){return h},set(m){h||(r=d(Number(m)||0),p())},setText(m){m?a.setAttribute("aria-valuetext",m):a.removeAttribute("aria-valuetext")},setLabel(m){a.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(s=m.step),m.onChange&&(l=m.onChange),m.onReset&&(c=m.onReset)}};return w.setLabel(e.label),w.set(e.value??0),w.setText(e.valueText),pa.set(a,w),w}function hi(e){return pa.get(e)}var ua=new WeakMap,mi=.2,fi=1.5,gi=.5;function bi(e,t){let a=String(e??"").trim(),o=Number.parseFloat(a);return Number.isFinite(o)?a.endsWith("ms")?o/1e3:o:t}function bn(e,t,a){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?a:bi(o.getComputedStyle(e).getPropertyValue(C(t)),a)}function wi(e){let t=e.doc??globalThis.document,a=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(a);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let s=[];for(let w=0;w<a;w++){let m=t.createElement("span");m.className="nc-meter-bar";let y=t.createElement("span");y.className="nc-meter-peak";let b=t.createElement("span");b.className="nc-meter-rms";let f=t.createElement("span");f.className="nc-meter-hold",m.append(y,b,f),r.append(m),s.push({peak:y,rms:b,hold:f,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,g=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},h=(w,m,y,b)=>{let f=Math.round(b*1e3)/1e3;y[m]!==f&&(y[m]=f,w.style.transform=m==="hold"?`translateY(${Math.round((1-f)*1e3)/10}%)`:`scaleY(${f})`)};i.addEventListener("click",()=>{x.clear(),c?.()});let x={el:o,get clipped(){return d},update(w,m){p<0&&(p=bn(o,"motion-meter-fall",mi)),u<0&&(u=bn(o,"motion-meter-hold",fi));let y=Math.max(0,Math.min(.25,Number(m)||0)),b=p>0?Math.exp(-y/p):0;s.forEach((f,v)=>{let A=w[v]??w[0]??{peak:0,rms:0},k=Math.min(1,Math.max(0,Number(A.peak)||0)),$=Math.min(k,Math.max(0,Number(A.rms)||0));A.over&&x.clip(),f.level.peak=k>=f.level.peak?k:k+(f.level.peak-k)*b,f.level.rms=$>=f.level.rms?$:$+(f.level.rms-$)*b,f.holdAge+=y,k>=f.holdAt?(f.holdAt=k,f.holdAge=0):f.holdAge>u&&(f.holdAt=Math.max(k,f.holdAt-gi*y)),h(f.peak,"peak",f.shown,f.level.peak),h(f.rms,"rms",f.shown,f.level.rms),h(f.hold,"hold",f.shown,f.holdAt),f.hold.dataset.off=f.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,g())},clear(){d=!1,g()},reset(){for(let w of s)w.level.peak=0,w.level.rms=0,w.holdAt=0,w.holdAge=0,h(w.peak,"peak",w.shown,0),h(w.rms,"rms",w.shown,0),h(w.hold,"hold",w.shown,0),w.hold.dataset.off="true"},setLabel(w){l=w,g()},configure(w){w.onClear&&(c=w.onClear)}};return g(),x.reset(),ua.set(o,x),x}function xi(e){return e?ua.get(e):void 0}var yi=3,vi=new Set(["freq","q","rate","time","log"]);function Vt(e,t,a){return!e||!vi.has(e)||!(a>t)?"linear":t>0?"log":"power"}function Me(e,t,a){return Vt(e,t,a)!=="linear"}function Ve(e,t,a,o){let i=Number(o);if(!(a>t)||!Number.isFinite(i))return 0;let r=Math.min(a,Math.max(t,i)),s=Vt(e,t,a);if(s==="log")return Math.log(r/t)/Math.log(a/t);let l=(r-t)/(a-t);return s==="power"?Math.cbrt(l):l}function ha(e,t,a,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=Vt(e,t,a);return r==="log"?t*(a/t)**i:t+(a-t)*(r==="power"?i**yi:i)}function ma(e,t,a,o){let i=Math.min(a,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(a,Math.max(t,i))}return i}function Ee(e,t,a,o){return Math.round(Ve(e,t,a,o)*1e3)}function Ge(e,t,a,o,i){return ma(ha(e,t,a,Number(o)/1e3),t,a,i)}function $i(e,t,a=!1){let o=Number(e)||0,i=a?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function Gt(e,t,a,o,i,r=!1,s){let l=Ee(e,t,a,o),c=$i(l,i,r);if(c===null)return null;let d=Ge(e,t,a,c,s),p=Math.sign(c-l),u=ma(Number(o),t,a,s);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=Ge(e,t,a,c,s);return d}function wn(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function ki(e,t,a,o=a/6){let i=e.some(p=>p===null),r=Math.max(0,a-(i?o:0)),s=e.reduce((p,u,g)=>u===null?p:p+wn(t[g]),0),l=s>0?r/s:0,c=e.map(p=>p===null?0:Math.min(r,wn(p)*l));if(i){let p=c.reduce((g,h)=>g+h,0),u=e.indexOf(null);c[u]=Math.max(o,a-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=a),d}function Ei(e){let t=Math.max(1,e.clientWidth||0),a=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(a*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:a}}function Y(e){return Math.max(0,Math.min(1,e))}function fa(e,t){let{ctx:a,w:o,h:i}=Ei(e);if(!a)return;a.clearRect(0,0,o,i);let r=ri(e);if(t.paint==="swatch"){let c=L(e,"accent"),d=L(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,a.fillStyle=c,a.fillRect(0,0,o/2,i),a.fillStyle=d,a.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Mi(a,o,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=L(e,la(c)),p=L(e,"divider"),u=Y(t.cutoff??.5),g=.08+(1-Y(t.resonance??.2))*.22;a.strokeStyle=p,a.beginPath(),a.moveTo(0,i*.72),a.lineTo(o,i*.72),a.stroke(),a.beginPath();for(let h=0;h<=o;h++){let x=h/Math.max(1,o),w=0;c==="lp"?w=x<u?1:Math.max(0,1-(x-u)/g):c==="hp"?w=x>u?1:Math.max(0,1-(u-x)/g):w=Math.max(0,1-Math.abs(x-u)/g);let m=i*.78-w*i*.62;h===0?a.moveTo(h,m):a.lineTo(h,m)}a.strokeStyle=d,a.stroke(),a.fillStyle=L(e,"text-sub"),a.font=r,a.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){a.strokeStyle=L(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,g]=ki([c,d],t.max??[1,4],o),h=2,x=i-1;a.beginPath(),a.moveTo(p,x),a.lineTo(u,h);let w=Math.max(1,Math.ceil(g-u));for(let m=1;m<=w;m++){let y=m/w;a.lineTo(u+(g-u)*y,x-(x-h)*Math.exp(-4.6*y)*(1-y*.01))}a.lineTo(g,x),a.lineTo(o,x),a.stroke(),e.dataset.ncAccent=a.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=L(e,"accent"),g=L(e,"text-sub"),h=i/2;a.fillStyle=L(e,"accent-soft"),a.fillRect(Y(d)*o,0,(Y(p)-Y(d))*o,i),a.strokeStyle=L(e,"divider"),a.beginPath(),a.moveTo(0,h),a.lineTo(o,h),a.stroke();let x=Math.floor(c.length/2);for(let w=0;w<x;w++){let m=(w+.5)/x*o,y=Math.max(-1,Math.min(1,c[w*2]??0)),b=Math.max(-1,Math.min(1,c[w*2+1]??0)),f=(w+.5)/x;a.strokeStyle=f>=d&&f<=p?u:g,a.beginPath(),a.moveTo(m,h-b*(h-1)),a.lineTo(m,h-y*(h-1)+.5),a.stroke()}a.strokeStyle=u;for(let w of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(Y(w)*(o-1))+.5;a.beginPath(),a.moveTo(m,0),a.lineTo(m,i),a.stroke()}typeof t.position=="number"&&t.position>=0&&(a.fillStyle=L(e,"text"),a.fillRect(Math.round(Y(t.position)*(o-1)),0,1,i)),x||(a.fillStyle=g,a.font=r,a.fillText(t.empty??"Empty",0,h+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=Y(t.level??0);a.fillStyle=L(e,"divider"),a.fillRect(0,i*.4,o,i*.2),a.fillStyle=L(e,"accent"),a.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=a.fillStyle;return}let s=Math.max(1,t.steps??16),l=((t.step??0)%s+s)%s;a.fillStyle=L(e,"rhythm.step-cell-off"),a.fillRect(0,i*.45,o,i*.1),a.fillStyle=L(e,"rhythm.playhead"),a.fillRect(l/s*o,i*.3,Math.max(1,o/s),i*.4),e.dataset.ncAccent=L(e,"accent")}var ve=20,vt=2e4,st=24,xn=-60;function Ai(e,t,a,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,s=Math.cos(r),l=Math.sin(r)/(2*a),c,d,p;e==="hp"?[c,d,p]=[(1+s)/2,-(1+s),(1+s)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-s)/2,1-s,(1-s)/2];let u=1+l,g=-2*s,h=1-l,x=2*Math.PI*o/i,w=(f,v,A)=>f+v*Math.cos(x)+A*Math.cos(2*x),m=(f,v)=>-(f*Math.sin(x)+v*Math.sin(2*x)),y=Math.hypot(w(c,d,p),m(d,p)),b=Math.hypot(w(u,g,h),m(g,h));return b>0?y/b:0}function Si(e,t){return Math.log(Math.max(ve,Math.min(vt,e))/ve)/Math.log(vt/ve)*t}function yn(e,t,a){let o=Math.max(xn,Math.min(st,e));return t+(st-o)/(st-xn)*(a-t)}function Mi(e,t,a,o,i,r){let s=o.mode??"lp",l=L(i,la(s)),c=L(i,"divider"),d=L(i,"text-sub"),p=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,g=Math.max(u+4,a-p-3),h=o.q??Math.SQRT1_2,x=Math.round(yn(0,u,g))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,x),e.lineTo(t,x),e.stroke(),e.beginPath();for(let w=0;w<=t;w++){let m=ve*(vt/ve)**(w/Math.max(1,t)),y=o.open?1:Ai(s,o.hz,h,m,o.sampleRate),b=yn(20*Math.log10(Math.max(1e-5,y)),u,g);w===0?e.moveTo(w,b):e.lineTo(w,b)}if(e.strokeStyle=l,e.stroke(),!o.open){let w=Math.round(Si(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(w,u),e.lineTo(w,g),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,a-1),e.textAlign="right",e.fillText("20 kHz",t,a-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function j(e,t){let a=e.ownerDocument,o=a.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=a.defaultView.getComputedStyle(o).color;return o.remove(),i}function zi(e){let t=e.ownerDocument,a=t.createElement("span");a.style.fontFamily="var(--nc-ui-font-ui)",a.style.fontSize="var(--nc-ui-label-size)",a.style.fontWeight="var(--nc-ui-label-weight)",e.append(a);let o=t.defaultView.getComputedStyle(a).font;return a.remove(),o}var ae=20,ze=2e4,Ut=Math.log(ze/ae),$t=32,Ci=250,Li=-100,Ti=1200,Fi=4.5,vn=-6,Z=-96,qi=48,$n=[100,1e3,1e4],Ni=[6,12];function pe(e,t){return Math.log(Math.max(ae,Math.min(ze,e))/ae)/Ut*t}function De(e,t){return ae*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ut)}function X(e,t,a,o){let i=t/2-o;return t/2-Math.max(-a,Math.min(a,e))/a*i}function kt(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ga=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Di(e,t,a,o){let i=a?3:1,r=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),s=c=>({hz:Math.max(e.minHz??ae,Math.min(e.maxHz??ze,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?s(1):r(1);case"ArrowLeft":return e.moveHz?s(-1):r(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Yt(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Pi(e,t,a,o,i,r,s,l,c){let d=c?.25:1,p={},u=Math.max(1,r/2-l);if(p.db=Math.max(-s,Math.min(s,t.db-o*d/u*s/Yt(e))),e.moveHz){let g=t.hz*Math.exp(a*d/Math.max(1,i)*Ut);p.hz=Math.max(e.minHz??ae,Math.min(e.maxHz??ze,g))}return p}function Ii(e,t,a,o,i){let r=Math.max(0,a.left)+1,s=Math.min(a.right,i)-1,l=Math.min(t.width*3+o*2,s-r),c=Math.max(r,Math.min(e.left,s-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var T=new WeakMap;function ji(e,t){let a=document.createElement("div");a.className="nc-eq",a.dataset.ncId=e.id,a.dataset.ncEq="",a.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-eq-tip",s.setAttribute("aria-hidden","true"),s.hidden=!0,o.append(i,r);for(let c of e.bands)o.append(Bi(a,c,t));o.append(s),o.addEventListener("click",c=>{if(!$a(a)||c.button>0)return;let d=va(a)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),a.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",a.append(l),T.set(a,{control:e,cache:null,spec:null,active:null}),wa(a,e),a}function ba(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(a=>a.dataset.band===t)??null}function Bi(e,t,a){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=a(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,s=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=r();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),s={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",K(e,t.id))}),o.addEventListener("pointermove",d=>{if(!s||d.pointerId!==s.id)return;let p=i(),u=r(),g=T.get(e);if(!p||!u||!g?.box)return;let{w:h,h:x,pad:w}=g.box;p.onBand(u.id,Pi(u,s.start,d.clientX-s.x,d.clientY-s.y,h,x,p.range??18,w,d.shiftKey))});let l=d=>{!s||d.pointerId!==s.id||(s=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&K(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=i(),u=r();if(!p||!u)return;let g=Di(u,d.key,d.shiftKey,p.range??18);g&&(d.preventDefault(),g==="reset"?p.onReset?.(u.id):p.onBand(u.id,g),K(e,u.id))});let c=null;return o.addEventListener("wheel",d=>{let p=i(),u=r();if(!p||!u?.moveQ)return;d.preventDefault();let g=d.timeStamp;(!c||g-c.t>400)&&(c={q:u.q,t:g});let h=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-h/240))),c.t=g,p.onBand(u.id,{q:c.q}),K(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>K(e,t.id)),o.addEventListener("focus",()=>K(e,t.id)),o.addEventListener("pointerleave",()=>{!s&&e.ownerDocument.activeElement!==o&&K(e,null)}),o.addEventListener("blur",()=>{s||K(e,null)}),o}function K(e,t){let a=T.get(e);if(!a)return;let o=a.active!==t;a.active=t,o?he(e):Kt(e)}function Kt(e){let t=T.get(e),a=e.querySelector(".nc-eq-tip");if(!t||!(a instanceof HTMLElement))return;let o=t.active?t.control.bands.find(x=>x.id===t.active):null;for(let x of e.querySelectorAll(".nc-eq-node"))x instanceof HTMLElement&&(o&&x.dataset.band===o.id?x.dataset.active="true":delete x.dataset.active);if(!o||!t.box){a.hidden=!0;return}let i=[o.label,ga(o.db)];o.kind==="peak"?i.push(kt(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${kt(o.hz)}`),a.textContent=i.join(" · "),a.dataset.tone=String(Ri(t.control,o)),a.hidden=!1;let{w:r,h:s,pad:l}=t.box,c=pe(o.hz,r),d=X(o.db*Yt(o),s,t.control.range??18,l),p=a.offsetWidth,u=a.offsetHeight,g=Math.max(0,Math.min(r-p,c-p/2)),h=d-u-l*1.5>=0?d-u-l*1.5:Math.min(s-u,d+l*1.5);a.style.left=`${Math.round(g)}px`,a.style.top=`${Math.round(h)}px`}function Ri(e,t){return e.bands.indexOf(t)%3+1}function wa(e,t){let a=T.get(e);if(!a)return;a.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Wt(e);let o=t.range??18;t.bands.forEach((i,r)=>{let s=ba(e,i.id);s instanceof HTMLElement&&(s.dataset.tone=String(r%3+1),s.dataset.kind=i.kind,s.setAttribute("aria-label",`${i.label} band`),s.setAttribute("aria-valuemin",String(-o)),s.setAttribute("aria-valuemax",String(o)),s.setAttribute("aria-valuenow",String(i.db)),s.setAttribute("aria-valuetext",i.valueText??`${ga(i.db)}, ${kt(i.hz)}`),s.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?s.setAttribute("data-nc-help",i.help):s.removeAttribute("data-nc-help"))}),he(e),Ui(e)}function xa(e){let t=Math.max(1,e.clientWidth||0),a=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(a*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let s=e.getContext("2d");return s?.setTransform(o,0,0,o,0,0),{ctx:s,w:t,h:a}}function ya(e){return{curve:j(e,"eq-curve"),fill:j(e,"eq-fill"),quiet:j(e,"text-sub"),grid:j(e,"eq-grid"),zero:j(e,"divider"),label:j(e,"text-sub"),spectrum:j(e,"eq-spectrum"),bands:[j(e,"eq-band-1"),j(e,"eq-band-2"),j(e,"eq-band-3")]}}function Hi(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(a=>`${a.id}:${a.hz}:${a.db}:${a.q}`).join(",")}`}function he(e){T.has(e)&&Wt(e);let t=T.get(e),a=e.querySelector(".nc-eq-curve");if(!t||!(a instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:s}=xa(a);if(!i)return;let l=Math.max(8,Math.round(s*.06)),c=o.range??18;t.box={w:r,h:s,pad:l},t.colours=ya(e);let d=t.colours,p=Hi(o,r);if(!t.cache||t.cache.key!==p){let v=Math.max(64,Math.ceil(r)+1),A=new Float64Array(v);for(let $=0;$<v;$++)A[$]=De($/(v-1)*r,r);let k=null;try{k=typeof o.response=="function"?o.response(A):null}catch{k=null}t.cache={key:p,freqs:A,total:k?.total??new Float64Array(v),bands:k?.bands??[]}}i.clearRect(0,0,r,s);let u=zi(e),g=o.on!==!1;Oi(i,r,s,c,l,d,u);let{freqs:h,total:x,bands:w}=t.cache,m=Array.from(h,v=>pe(v,r)),y=X(0,s,c,l);w.forEach((v,A)=>{if(!v||!v.some(S=>Math.abs(S)>.05))return;let k=g?d.bands[A%3]:d.quiet,$=Array.from(v,S=>X(S,s,c,l));i.save(),t.active&&o.bands[A]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=k,kn(i,m,$,y)),i.globalAlpha=g?.75:.4,i.strokeStyle=k,i.lineWidth=.75,lt(i,m,$),i.restore()});let b=Array.from(x,v=>X(v,s,c,l)),f=g?d.curve:d.quiet;i.save(),i.fillStyle=g?d.fill:d.quiet,i.globalAlpha=g?.2:.08,kn(i,m,b,y),i.restore(),i.save(),i.strokeStyle=g?d.fill:f,i.lineJoin="round",i.lineCap="round",g&&(i.globalAlpha=.16,i.lineWidth=4,lt(i,m,b)),i.globalAlpha=1,i.strokeStyle=f,i.lineWidth=1.25,lt(i,m,b),i.restore(),_i(e),Kt(e)}function Oi(e,t,a,o,i,r,s){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<ae||p>ze)continue;let u=Math.round(pe(p,t))+.5;e.globalAlpha=$n.includes(p)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,a),e.stroke()}for(let c of Ni)if(!(c>o))for(let d of[1,-1]){let p=Math.round(X(c*d,a,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let l=Math.round(X(0,a,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=s,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of $n){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=pe(c,t)+3;e.fillText(d,u+p+2>t?pe(c,t)-p-3:u,a-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=X(c,a,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Ue(e,t,a){e.moveTo(t[0],a[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(a[o]+a[o+1])/2;e.quadraticCurveTo(t[o],a[o],i,r)}e.lineTo(t[t.length-1],a[a.length-1])}function lt(e,t,a){e.beginPath(),Ue(e,t,a),e.stroke()}function kn(e,t,a,o){e.beginPath(),Ue(e,t,a),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function va(e){return e.closest("[data-nc-maxable]")}function $a(e){let t=va(e);return!!t&&!t.hasAttribute("data-nc-max")}function Wt(e){let t=$a(e);t?e.dataset.locked="":delete e.dataset.locked;for(let a of e.querySelectorAll(".nc-eq-node"))a instanceof HTMLElement&&(a.setAttribute("tabindex",t?"-1":"0"),t?a.setAttribute("aria-hidden","true"):a.removeAttribute("aria-hidden"));if(t){let a=T.get(e);a?.active&&(a.active=null,Kt(e))}return t}function _i(e){Wt(e);let t=T.get(e);if(!t?.box)return;let{w:a,h:o,pad:i}=t.box,r=t.control.range??18;for(let s of t.control.bands){let l=ba(e,s.id);l instanceof HTMLElement&&(l.style.left=`${pe(s.hz,a).toFixed(1)}px`,l.style.top=`${X(s.db*Yt(s),o,r,i).toFixed(1)}px`)}}function Vi(e,t,a,o){let i=o/2/a,r=new Float32Array(e),s=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=De(d,t),g=De(p,t),h=De(c/(e-1)*t,t);r[c]=Math.min(a-1,u/i),s[c]=Math.min(a-1,g/i),l[c]=Fi*Math.log2(h/1e3)}return{lo:r,hi:s,tilt:l}}function Gi(e,t,a){let o=Math.floor(t),i=Math.ceil(a);if(i-o<=1){let s=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*s}let r=-1/0;for(let s=o;s<=i&&s<e.length;s++)e[s]>r&&(r=e[s]);return r}function Ui(e){let t=T.get(e);if(t){if(!t.control.spectrum){Ea(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let a=e.ownerDocument.defaultView?.IntersectionObserver;a?(t.spec.io=new a(o=>{let i=T.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),Et(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Et(e)}}function Et(e){let t=T.get(e),a=t?.spec;if(!a)return;let o=e.ownerDocument;if(!(e.isConnected&&a.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){ka(e);return}if(!a.analyser){if(a.source=t.control.spectrum,a.analyser=a.source.open?.()??null,!a.analyser)return;a.buf=new Float32Array(a.analyser.frequencyBinCount),a.loud=At(e),a.onVis||(a.onVis=()=>Et(e),o.addEventListener("visibilitychange",a.onVis))}!a.raf&&!a.timer&&St(e,!1)}function At(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function St(e,t){let a=T.get(e)?.spec,o=e.ownerDocument.defaultView;!a||!o||(t?a.timer=o.setTimeout(()=>(a.timer=0,dt(e,At(e))),Ci):typeof o.requestAnimationFrame=="function"?a.raf=o.requestAnimationFrame(i=>(a.raf=0,dt(e,i))):a.timer=o.setTimeout(()=>(a.timer=0,dt(e,At(e))),$t))}function ka(e){let t=T.get(e)?.spec;if(!t)return;let a=e.ownerDocument.defaultView;t.raf&&a?.cancelAnimationFrame?.(t.raf),t.timer&&a?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function Ea(e){let t=T.get(e)?.spec;if(!t)return;ka(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let a=T.get(e);a&&(a.spec=null)}function dt(e,t){let a=T.get(e),o=a?.spec;if(!a||!o)return;if(!e.isConnected){Ea(e);return}if(!o.analyser)return;if(t-o.last<$t-4&&!o.idle){St(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):$t/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:s,w:l,h:c}=xa(r);if(!s)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??a.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...Vi(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,g=qi*i,{lo:h,hi:x,tilt:w}=o.map;for(let y=0;y<d;y++){let b=Gi(o.buf,h[y],x[y]);b>u&&(u=b);let f=b+w[y],v=o.disp[y]-g;o.disp[y]=f>v?f:v}u>Li&&(o.loud=t);let m=t-o.loud>Ti;s.clearRect(0,0,l,c),(!m||o.disp.some(y=>y>Z))&&Yi(s,l,c,o.disp,a.colours??ya(e)),o.idle=m&&!o.disp.some(y=>y>Z),St(e,o.idle)}function Yi(e,t,a,o,i){let r=o.length,s=new Array(r),l=new Array(r),c=d=>{let p=o[Math.max(0,Math.min(r-1,d))];return Number.isFinite(p)?p:Z};for(let d=0;d<r;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(Z,Math.min(vn,Number.isFinite(p)?p:Z))-Z)/(vn-Z);s[d]=d/(r-1)*t,l[d]=a-u*a}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Ue(e,s,l),e.lineTo(t,a),e.lineTo(0,a),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Ue(e,s,l),e.stroke(),e.restore()}var D=new WeakMap,Ki=450,Wi=6,Xi=33,ct=24,Qi="http://www.w3.org/2000/svg";function Ji(e,t){let a=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,a))*100)/100}function Zi(e,t){for(let a=0;a<t.length;a++)if(e<t[a])return a;return t.length-1}function er(e,t,a,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let s=t<o?1:-1;for(let l=t;l!==o+s;l+=s){let c=(l-t)/(o-t);r[l]=Math.round((a+(i-a)*c)*100)/100}return r}function tr(e,t){let a=e.steps[t],o=(e.shapes??[]).find(r=>r.value===a.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(a.level*100)}%${o?`, ${o.label}`:""}${i}`}function ee(e,t){let a=document.createElementNS(Qi,e);for(let[o,i]of Object.entries(t))a.setAttribute(o,String(i));return a}function Aa(e){let t=ee("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(ee("path",{d:e})),t}function nr(e,t){let a=document.createElement("div");a.className="nc-lsteps",a.dataset.ncId=e.id,a.dataset.ncLsteps="",a.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let s=document.createElement("div");s.className="nc-lsteps-pick",s.setAttribute("role","menu"),s.hidden=!0,a.append(o,i,r,s);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",a.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return D.set(a,c),or(a,o),ir(a,s),Sa(a,e),a}function P(e){let t=D.get(e),a=t?.lookup?.(e);return a?.type==="levelSteps"?a:t?.control}function ar(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function pt(e,t){let a=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=ar(e);return{i:Zi(t.clientX,o),level:Ji(t.clientY-a.top,a.height)}}function or(e,t){let a=D.get(e),o=()=>{a.timer&&(clearTimeout(a.timer),a.timer=0)};t.addEventListener("pointerdown",r=>{let s=P(e);if(!s||r.button>0||!s.steps.length)return;r.preventDefault(),Ye(e),t.setPointerCapture?.(r.pointerId);let l=pt(t,r),c=s.steps.map(d=>d.level);a.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},a.focus=l.i,En(e,l.i,l.level,l.i,l.level,!1),o(),a.timer=setTimeout(()=>{a.timer=0;let d=a.drag;!d||d.moved||(d.long=!0,P(e)?.onLevels(d.start.slice(),!0),ut(e,d.i))},Ki)}),t.addEventListener("pointermove",r=>{let s=a.drag;if(!s||s.id!==r.pointerId||s.long||!s.moved&&Math.hypot(r.clientX-s.x,r.clientY-s.y)<Wi)return;s.moved=!0,o();let l=pt(t,r);En(e,s.i,s.level,l.i,l.level,!1),s.i=l.i,s.level=l.level});let i=r=>{let s=a.drag;!s||s.id!==r.pointerId||(o(),a.drag=null,t.releasePointerCapture?.(r.pointerId),s.long||P(e)?.onLevels(s.levels.slice(),!0),Mt(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let s=a.drag;!s||s.id!==r.pointerId||(o(),a.drag=null,s.long||P(e)?.onLevels(s.start.slice(),!0),Mt(e,-1))}),t.addEventListener("contextmenu",r=>{P(e)?.onShape&&(r.preventDefault(),ut(e,pt(t,r).i))}),t.addEventListener("keydown",r=>{let s=P(e);if(!s||!s.steps.length)return;let l=s.steps.length,c=Math.min(a.focus,l-1),d=s.steps[c].level,p=u=>{let g=s.steps.map(h=>h.level);g[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,s.onLevels(g,!0)};switch(r.key){case"ArrowLeft":a.focus=(c-1+l)%l;break;case"ArrowRight":a.focus=(c+1)%l;break;case"ArrowUp":p(d+(r.shiftKey?.01:.05));break;case"ArrowDown":p(d-(r.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!s.onShape)return;ut(e,c);break;default:return}r.preventDefault(),zt(e)}),t.addEventListener("focus",()=>zt(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function En(e,t,a,o,i,r){let s=D.get(e).drag;s&&(s.levels=er(s.levels,t,a,o,i),Mt(e,o,s.levels[o]),P(e)?.onLevels(s.levels.slice(),r))}function Mt(e,t,a){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(a*100)}%`):o.removeAttribute("data-dragging")}function zt(e){let t=D.get(e),a=e.querySelector(".nc-lsteps-plot"),o=P(e);if(!a||!o)return;for(let r of a.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);a.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),a.setAttribute("aria-valuetext",tr(o,i))}function ir(e,t){t.addEventListener("keydown",a=>{if(a.key==="Escape"){a.preventDefault(),Ye(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(a.target);(a.key==="ArrowRight"||a.key==="ArrowDown")&&(a.preventDefault(),o[(i+1)%o.length]?.focus()),(a.key==="ArrowLeft"||a.key==="ArrowUp")&&(a.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),D.get(e).outside=a=>{!t.hidden&&!t.contains(a.target)&&Ye(e)}}function ut(e,t){let a=P(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!a?.onShape||!o||!i)return;let r=D.get(e);r.focus=t,o.textContent="";let s=document.createElement("span");s.className="nc-lsteps-pick-head",s.textContent=`Step ${t+1}`,o.append(s);for(let h of a.shapes??[]){let x=document.createElement("button");x.type="button",x.setAttribute("role","menuitemradio"),x.setAttribute("aria-checked",a.steps[t]?.shape===h.value?"true":"false"),h.icon&&x.append(Aa(h.icon)),x.append(document.createTextNode(h.label)),x.addEventListener("click",()=>{P(e)?.onShape?.(t,h.value),Ye(e,!0)}),o.append(x)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,g=Math.max(0,Math.min(c.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(g)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function Ye(e,t=!1){let a=e.querySelector(".nc-lsteps-pick");!a||a.hidden||(e.ownerDocument.removeEventListener("pointerdown",D.get(e).outside,!0),a.hidden=!0,a.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function rr(e,t){let a=D.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(a.count!==t){a.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let s=document.createElement("div");s.className="nc-lsteps-step",s.dataset.i=String(r),r%4===0&&r>0&&(s.dataset.beat="true");let l=ee("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(ee("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),ee("path",{class:"nc-lsteps-env",d:""}),ee("path",{class:"nc-lsteps-top",d:""}),ee("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),s.append(l),o.append(s);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function Sa(e,t){let a=D.get(e);if(!a)return;a.control=t;let o=t.steps.length;rr(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),s=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((h,x)=>{let w=s[x];if(!w)return;let m=String((x%2?1-r:r)*2);w.style.setProperty("--nc-lsteps-grow",m),l[x]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&x>=t.played?w.dataset.out="true":w.removeAttribute("data-out"),w.dataset.zero=h.level<=0?"true":"false";let y=Math.max(0,Math.min(1,h.level)),b=w.querySelector(".nc-lsteps-level");b.setAttribute("y",String(100-y*100)),b.setAttribute("height",String(y*100));let f=t.curve?t.curve(x,ct):null,v="M0 100",A="";for(let k=0;k<=ct;k++){let $=f?Math.max(0,Math.min(1,f[k]??y)):y,S=k/ct*100,z=100-$*100;v+=` L${S.toFixed(2)} ${z.toFixed(2)}`,A+=`${k?" L":"M"}${S.toFixed(2)} ${z.toFixed(2)}`}w.querySelector(".nc-lsteps-env").setAttribute("d",`${v} L100 100 Z`),w.querySelector(".nc-lsteps-top").setAttribute("d",A)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(h=>`${h.value}:${h.label}`).join();if(d!==a.shapeKey){a.shapeKey=d,c.textContent="";for(let h of t.shapes??[]){let x=document.createElement("button");x.type="button",x.className="nc-lsteps-shape",x.setAttribute("role","tab"),x.dataset.shape=String(h.value),h.icon&&x.append(Aa(h.icon)),x.append(document.createTextNode(h.label)),x.addEventListener("click",()=>P(e)?.onShapeAll?.(h.value)),c.append(x)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,g=t.steps.slice(0,p).every(h=>h.shape===u);for(let h of c.querySelectorAll(".nc-lsteps-shape")){let x=g&&h.dataset.shape===String(u);h.setAttribute("aria-selected",x?"true":"false"),h.tabIndex=x||!g&&h===c.firstElementChild?0:-1}a.focus>=o&&(a.focus=0),zt(e),a.last=-2,sr(e)}function sr(e){let t=D.get(e),a=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!a?.requestAnimationFrame){t&&!t.control.playhead&&ht(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){ht(e,null);return}r-o>=Xi&&(o=r,ht(e,t.control.playhead())),t.loop=a.requestAnimationFrame(i)};t.loop=a.requestAnimationFrame(i)}function ht(e,t){let a=D.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(a.last===o&&a.lastLocked===i)){a.last=o,a.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var lr=.8912509381337456,Ct=32,dr=250,cr=1200,pr=.2,Ma=1.5;function ur(e){let t=Number(e);if(!(t>0))return 0;let a=(20*Math.log10(t)- -48)/48;return a<=0?0:a>=1?1:a}function hr(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let a of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=a;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var Ke=new WeakMap,An=new WeakMap;function Sn(e,t,a){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return a;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:a}function mr(e){let t=An.get(e);if(t)return t;let a=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=a?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let s=Ke.get(r.target);s&&(s.seen.set(r.target,r.isIntersecting),$e(s))}de(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)$e(i);de(t)}),An.set(e,t),t}var za=e=>e.els.some(t=>t.isConnected);function fr(e){if(!e.loop.io)return za(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function $e(e){let t=!e.dead&&!!e.source&&fr(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let a=typeof e.source.open=="function"?e.source.open():!0;e.open=a!==!1,e.open&&(e.loop.loud=Xt(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Ft(e))}function Xt(e){return e.doc.defaultView?.performance?.now()??Date.now()}function de(e){let t=!1;for(let a of e.recs)a.open&&(t=!0);if(!t){Ca(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Xt(e)),!e.raf&&!e.timer&&Lt(e,!1)}function Lt(e,t){let a=e.doc.defaultView;if(!a)return;let o=()=>Mn(e,Xt(e));t?e.timer=a.setTimeout(()=>(e.timer=0,o()),dr):typeof a.requestAnimationFrame=="function"?e.raf=a.requestAnimationFrame(i=>(e.raf=0,Mn(e,i))):e.timer=a.setTimeout(()=>(e.timer=0,o()),Ct)}function Ca(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Mn(e,t){if(t-e.last<Ct-4&&!e.idle&&e.last){Lt(e,!1);return}let a=e.last?Math.min(.25,(t-e.last)/1e3):Ct/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!za(r)){(r.placed||e.frames-r.born>90)&&La(r);continue}r.placed=!0,r.open&&(i=!0,gr(r,a,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Ca(e);return}e.idle=t-e.loud>cr&&!o,Lt(e,e.idle)}function gr(e,t,a){if(e.fall<0){let g=e.els[0];e.fall=Sn(g,"motion-meter-fall",pr),e.hold=Sn(g,"motion-meter-hold",Ma)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,s=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=s&&Number(o.out)||0,c=s?"2":"1";if(e.rows!==c){e.rows=c;for(let g of e.els)g.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[r,l],u=!1;for(let g=0;g<2;g++){let h=ur(p[g]);h>0&&(u=!0),e.disp[g]=h>=e.disp[g]?h:h+(e.disp[g]-h)*d,e.disp[g]<.001&&(e.disp[g]=0),p[g]>=lr&&(e.clipAt[g]=a);let x=e.clipAt[g]>0&&a-e.clipAt[g]<e.hold*1e3;Tt(e,g,e.disp[g],x)}return u}function Tt(e,t,a,o){let i=Math.round(a*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let s of e.els){let l=s.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=r)}}}function Ft(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Tt(e,0,0,!1),Tt(e,1,0,!1)}function La(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ke.get(t)===e&&Ke.delete(t)}function br(e,t){let a=(Array.isArray(e)?e:[e]).filter(Boolean),o=a[0]?.ownerDocument??globalThis.document,i=mr(o),r={els:a,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Ma,rows:""};for(let s of a)Ke.set(s,r),i.io?.observe(s);if(i.recs.add(r),Ft(r),!i.io){let s=o.defaultView,l=()=>{$e(r),de(i)};typeof s?.requestAnimationFrame=="function"?s.requestAnimationFrame(l):setTimeout(l,0)}return{set(s){let l=s??null;if(!r.dead){if(l===r.source){$e(r),de(i);return}r.open&&(r.open=!1,r.source?.close?.(),Ft(r)),r.source=l,$e(r),de(i)}},destroy(){r.dead||La(r),de(i)}}}var Ta={slop:8,longPressMs:500,pitchPx:16},wr=class{constructor(e,t,a=Ta){this.hit=e,this.emit=t,this.config=a,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,a,o){if(this.phase!=="idle")return!1;let i=this.hit(t,a);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=a,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,a,o){if(e!==this.pointer)return;let i=t-this.x0,r=a-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let s=Math.trunc(-r/this.config.pitchPx);s!==this.degrees&&(this.degrees=s,this.emit({kind:"pitch",pad:this.pad,degrees:s,phase:"move"}))}else if(this.phase==="paint"){let s=this.hit(t,a);s>=0&&s!==this.lastPad&&(this.lastPad=s,this.emit({kind:"paint",pad:s,phase:"enter"}))}}up(e,t,a,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,a,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xr(e,t,a,o=Ta){let i=!1,r=0,s=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),g=[...e.querySelectorAll(t)],h=u?g.findIndex(m=>m===u||m.contains(u)):-1;if(h>=0)return h;let x=-1,w=Number.POSITIVE_INFINITY;return g.forEach((m,y)=>{if(m.hidden)return;let b=m.getBoundingClientRect();if(p<b.top||p>b.bottom)return;let f=Math.abs(d-(b.left+b.width/2));f<w&&f<=b.width&&(x=y,w=f)}),x},l=new wr(s,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),a(d)},o),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Fa="netcomposer.groups.v1";function Qt(){try{return globalThis.localStorage??null}catch{return null}}function qa(e=Qt(),t=Fa){try{let a=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(a&&typeof a=="object"&&!Array.isArray(a))for(let[i,r]of Object.entries(a))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function yr(e,t,a,o=Fa){let i=qa(e,o);i.set(t,a);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function vr(e,t=Qt()){return qa(t).get(e.id)??e.open===!0}function $r(e,t,a){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let s=document.createElement("span");s.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(r,s,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(a(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";yr(Qt(),e.id,d),qt(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(i,c),Na(o,e),qt(o,vr(e)),Da(o,e),o}function qt(e,t){e.dataset.ncOpen=t?"true":"false";let a=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");a?.setAttribute("aria-expanded",t?"true":"false");let i=a?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Na(e,t){let a=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===a?!1:(a?e.dataset.ncCollapse=a:delete e.dataset.ncCollapse,!0)}function Da(e,t){Na(e,t)&&qt(e,e.dataset.ncOpen==="true");let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");a&&a.textContent!==t.title&&(a.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var Ce="application/x-nc-pad",zn="http://www.w3.org/2000/svg";function kr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let a=Math.min(48,t),o=[],i=[];for(let r=0;r<a;r++){let s=Math.floor(r*t/a),l=Math.max(s+1,Math.floor((r+1)*t/a)),c=0,d=0;for(let u=s;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=a===1?50:r/(a-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Er(e,t){let a=document.createElement("div");a.className="nc-padgrid",a.dataset.ncId=e.id,a.dataset.ncRow="",a.setAttribute("role","group"),a.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(Ar(a,r,t))),a.append(o),a.addEventListener("keydown",i=>{i.key==="Escape"&&Pe(a)}),Ia(a,e),a}function Ar(e,t,a){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let s=document.createElement("span");s.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(zn,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(zn,"path");return c.append(d),o.append(i,r,s,l,c),Mr(e,o,t,a),r.addEventListener("dblclick",()=>{let p=a(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&Pa(e,o,t,a)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(Ce,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(Ce)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(Ce)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=a(e);if(u?.type!=="padGrid")return;let g=p.dataTransfer?.getData(Ce);if(g!==void 0&&g!==""){p.preventDefault(),p.stopPropagation();let x=Number(g);x!==t&&u.onMove?.(x,t,p.altKey);return}let h=p.dataTransfer?.files?.[0];h&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,h))}),o}function Sr(e,t,a){let o=a(e);o?.type==="padGrid"&&o.onPress(t)}function Mr(e,t,a,o){let i=0,r=!1,s=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,s=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(a),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=Cn(e,t,a,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-s,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=Cn(e,t,a,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}Sr(e,a,o)})}function Cn(e,t,a,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(a);if(!r.length)return!1;Pe(e);let s=document.createElement("div");s.className="nc-slot-scrim",s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Pe(e)}),s.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of r){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{Pe(e);let g=o(e);g?.type==="padGrid"&&(p.id==="rename"&&g.onRename?Pa(e,t,a,o):g.onMenu?.(a,p.id))}),l.append(u)}e.append(s,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Pa(e,t,a,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[a]?.label??"",r.setAttribute("aria-label",`Name of pad ${a+1}`);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();r.style.left=`${l.left-s.left}px`,r.style.top=`${l.top-s.top}px`,r.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=r.value.trim();r.remove(),t.focus();let g=o(e);p&&u&&g?.type==="padGrid"&&g.onRename?.(a,u)};r.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])r.addEventListener(p,u=>u.stopPropagation());e.append(r),r.focus(),r.select()}function Pe(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Ia(e,t){let a=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=a[i];if(!(r instanceof HTMLButtonElement))return;let s=r.querySelector(".nc-padgrid-pad-name"),l=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",s&&(s.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,s&&(s.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",kr(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let p=t.selected===i;p?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",p?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function q(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function tt(e,t){let a=document.createElement("div");a.className="nc-field",a.dataset.ncRow="",a.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",a.append(o,i),a}function Ln(e,t){let a=e.querySelector("[data-nc-probe]");e.textContent=t,a&&e.append(a)}function Ae(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var zr=450,Tn=8;function B(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Cr(e){let t=ii(e,"target-min");return t>0?t:44}function Lr(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],a=Cr(e),o=a/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let s=t[r],l=i[r];if(!(s instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=a&&l.height>=a){s.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,u=c+o,g=d-o,h=d+o;for(let x=0;x<t.length;x++){if(r===x)continue;let w=i[x];if(!w||w.width===0)continue;let m=w.left+w.width/2,y=w.top+w.height/2;Math.abs(y-d)<o*2&&(m>c?u=Math.min(u,(c+m)/2):m<c&&(p=Math.max(p,(c+m)/2))),Math.abs(m-c)<o*2&&(y>d?h=Math.min(h,(d+y)/2):y<d&&(g=Math.max(g,(d+y)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),g=Math.min(g,l.top),h=Math.max(h,l.bottom),s.style.left=`${p-l.left}px`,s.style.top=`${g-l.top}px`,s.style.width=`${Math.max(0,u-p)}px`,s.style.height=`${Math.max(0,h-g)}px`,s.style.transform="none"}}function ja(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Fn(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function ne(e,t){switch(e.type){case"slider":return Tr(e,t);case"select":return qr(e,t);case"toggle":return Nr(e,t);case"button":return Dr(e,t);case"readout":return Pr(e);case"label":return Rr(e);case"note":return qn(e);case"knob":return _r(e,t);case"choice":return Vr(e,t);case"slotRow":return Gr(e,t);case"stepGrid":return Wr(e,t);case"canvas":return Zr(e);case"fx":return ls(e,t);case"eqGraph":return ji(e,t);case"levelSteps":return nr(e,t);case"group":return $r(e,t,ne);case"strip":return es(e,t);case"stripAdd":return os(e,t);case"padGrid":return Er(e,t);case"moves":return jr(e,t);default:return qn({id:"unknown",text:""})}}function I(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let a=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),a instanceof HTMLInputElement&&(a.disabled=t.disabled===!0,Ha(a,t.modulated===!0),document.activeElement!==a&&(a.value=String(Ba(t))),t.valueText?a.setAttribute("aria-valuetext",t.valueText):a.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Ae(t.value))}else if(t.type==="select"){let a=e.querySelector("select");a instanceof HTMLSelectElement&&document.activeElement!==a&&(a.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ln(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ln(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Q(e,t.help);let a=e.querySelector(".nc-knob");a instanceof HTMLElement&&Hr(a,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Ae(t.value))}else if(t.type==="choice")Oa(e,t);else if(t.type==="slotRow")Va(e,t);else if(t.type==="stepGrid")Dt(e,t);else if(t.type==="padGrid")Ia(e,t);else if(t.type==="moves")Ra(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let a=e.querySelector("canvas");a instanceof HTMLCanvasElement&&fa(a,t)}else if(t.type==="eqGraph")wa(e,t);else if(t.type==="levelSteps")Sa(e,t);else if(t.type==="strip"){Ka(e,t);for(let a of t.sends??[]){let o=e.querySelector(`[data-nc-id="${ue(a.id)}"]`);o instanceof Element&&I(o,{...a,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Ua(e,t);else if(t.type==="group"){Da(e,t);for(let a of t.controls){let o=e.querySelector(`[data-nc-id="${ue(a.id)}"]`);o instanceof Element&&I(o,a)}}else if(t.type==="fx"){ao(e,t);for(let a of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${ue(a.id)}"]`);o instanceof Element&&I(o,a)}}}}function Tr(e,t){let a=tt(e.id,e.label);a.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=Me(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(Ba(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=l=>i?Ge(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(r(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(r(l))}),i&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=Gt(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(Ee(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let s=a.querySelector("[data-nc-readout]");return a.insertBefore(o,s),e.onTap&&a.insertBefore(Fr(e,o,t),s),a.append(q()),I(a,e),a}function Ba(e){return Me(e.taper,e.min,e.max)?Ee(e.taper,e.min,e.max,e.value):e.value}function Fr(e,t,a){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(B());let i=r=>{let s=a(t);s?.type==="slider"&&s.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function qr(e,t){let a=tt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let s=document.createElement("option");s.value=r.value,s.textContent=r.label,r.disabled&&(s.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(s)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),a.append(o,q()),a}function Nr(e,t){let a=document.createElement("button");return a.type="button",a.className="nc-toggle",a.id=e.id,a.dataset.ncId=e.id,a.dataset.ncRow="",e.role&&(a.dataset.ncRole=e.role),a.textContent=e.label,a.addEventListener("click",()=>{let o=t(a);o?.type==="toggle"&&o.onPress()}),a.append(q()),I(a,e),a}function Dr(e,t){let a=document.createElement("button");if(a.type="button",a.className="nc-btn",a.id=e.id,a.dataset.ncId=e.id,a.addEventListener("click",()=>{let r=t(a);r?.type==="button"&&r.onPress()}),a.append(q()),I(a,e),!e.onSparkle)return a;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=ja(),i.addEventListener("click",()=>{let r=a.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Ga(r);let s=t(a);s?.type==="button"&&s.onSparkle?.()}),o.append(a,i),o}function Pr(e){let t=tt(e.id,e.label);return t.append(q()),I(t,e),t}var Ir=450;function jr(e,t){let a=document.createElement("div");a.className="nc-moves",a.dataset.ncId=e.id,a.dataset.ncRow="",a.setAttribute("role","group"),a.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let s=document.createElement("div");s.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(Br(l.icon)),c.addEventListener("click",()=>{let d=t(a);d?.type==="moves"&&d.onMove(l.id)}),s.append(c)}i.append(r,s),a.append(i)}return Ra(a,e),a}function Ra(e,t){for(let a of t.groups)for(let o of a.moves){let i=e.querySelector(`[data-nc-move="${ue(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function Br(e){let t="http://www.w3.org/2000/svg",a=document.createElementNS(t,"svg");if(a.setAttribute("viewBox","0 0 16 16"),a.setAttribute("aria-hidden","true"),a.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),a.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),a.append(o)}return a}function Rr(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(q()),t}function qn(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(q()),t}function Nn(e){if(typeof e.valueText=="string")return e.valueText;let t=Ae(e.value),a=typeof e.unit=="string"?e.unit:"";return a===""?t:a==="%"?`${t}%`:`${t} ${a}`}function Ha(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Hr(e,t){let a=Ve(t.taper,t.min,t.max,t.value);Ha(e,t.modulated===!0);let o=Math.round(a*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Ve(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Nn(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Nn(t)}`}function Or(e,t){if(Me(e.taper,e.min,e.max))return Gt(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let a=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:a/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function _r(e,t){let a=tt(e.id,e.label);e.compact&&(a.dataset.ncCompact=""),e.bipolar&&(a.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,s=0;o.addEventListener("pointerdown",d=>{r=d.clientY;let p=t(o);s=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),a.dataset.ncDragging="true"});let l=()=>delete a.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(Me(p.taper,p.min,p.max)){let h=Ve(p.taper,p.min,p.max,s)-(d.clientY-r)/120;p.onChange(ha(p.taper,p.min,p.max,h));return}let u=p.max-p.min||1,g=Math.min(p.max,Math.max(p.min,s-(d.clientY-r)*u/120));p.onChange(g)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let u=Or(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=a.querySelector("[data-nc-readout]");return a.insertBefore(o,c),a.append(q()),I(a,e),a}function Vr(e,t){let a=document.createElement("div");if(a.className="nc-choice-row",a.dataset.ncId=e.id,a.dataset.ncRow="",a.setAttribute("role","tablist"),a.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,a.dataset.ncCaption="",a.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(a);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let s=[...a.querySelectorAll("[data-nc-choice]")],l=s.indexOf(i),c=l;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(l+1)%s.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(l-1+s.length)%s.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=s.length-1;else return;let d=s[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),a.append(i)}return a.append(q()),Oa(a,e),a}function Oa(e,t){for(let a of e.querySelectorAll("[data-nc-choice]")){if(!(a instanceof HTMLButtonElement))continue;let o=a.dataset.ncChoice===t.value;a.setAttribute("aria-selected",o?"true":"false"),a.tabIndex=o?0:-1}}function Gr(e,t){let a=document.createElement("div");a.className="nc-slot-row",a.dataset.ncRow="",a.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],g=document.createElement("span");g.className="nc-snap-wrap";let h=document.createElement("button");h.type="button",h.className="nc-snap",h.dataset.ncSlot=String(p),h.textContent=u.label,h.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",g.append(h,B()),Ur(g,h,a,p,t),o.append(g)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=ja(),i.append(B()),i.addEventListener("click",()=>{Ga(a);let p=t(a);p?.type==="slotRow"&&p.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let s=document.createElement("span");s.className="nc-label",s.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(a);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(s,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),a.append(d,r,q()),_a(a,t),Va(a,e),a}function Dn(e,t,a,o){let i=a(e);if(i?.type!=="slotRow")return;we(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function Ur(e,t,a,o,i){let r=0,s=0,l=0,c=!1,d=!1,p=!1,u=!1,g=()=>{window.clearTimeout(r),r=0},h=y=>{let b=y.clientX-s,f=y.clientY-l;b*b+f*f>Tn*Tn&&(c=!0,g())},x=()=>{u&&(u=!1,window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",w),window.removeEventListener("pointercancel",m))},w=y=>{let b=r!==0&&!c&&!d;g(),x(),b&&(p=!0,Dn(a,o,i,y))},m=()=>{c=!0,g(),x()};e.addEventListener("pointerdown",y=>{y.button===0&&(x(),d=!1,c=!1,p=!1,s=y.clientX,l=y.clientY,g(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Yr(a,t,o,i))},zr),u=!0,window.addEventListener("pointermove",h),window.addEventListener("pointerup",w),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",y=>y.preventDefault()),e.addEventListener("click",y=>{if(p||d||c){p=!1,d=!1,c=!1;return}Dn(a,o,i,y)})}function _a(e,t){if(e.querySelector(".nc-slot-menu"))return;let a=document.createElement("div");a.className="nc-slot-menu",a.hidden=!0,a.setAttribute("role","menu"),a.setAttribute("aria-label","Slot");let o=Pn("Save","store"),i=Pn("Clear","clear");a.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",s=>{s.preventDefault(),s.stopPropagation(),we(e)}),r.addEventListener("click",s=>s.stopPropagation()),e.append(r,a),a.addEventListener("click",s=>{let l=s.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(a.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),we(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),we(e))}),e.addEventListener("keydown",s=>{s.key==="Escape"&&we(e)})}function Pn(e,t){let a=document.createElement("button");return a.type="button",a.className="nc-menu-btn",a.dataset.ncSlotOp=t,a.setAttribute("role","menuitem"),a.textContent=e,a}function Yr(e,t,a,o){_a(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(a);let s=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-s.left}px`,i.style.top=`${l.bottom-s.top}px`,i.querySelector("button")?.focus()}function we(e){let t=e.querySelector(".nc-slot-menu"),a=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),a instanceof HTMLElement&&(a.hidden=!0)}function Va(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),s=t.slots[r];if(!s)continue;i.textContent=s.label,s.filled?i.dataset.filled="true":delete i.dataset.filled,s.active?i.dataset.active="true":delete i.dataset.active,s.edited?i.dataset.edited="true":delete i.dataset.edited,s.queued?i.dataset.queued="true":delete i.dataset.queued,s.queued&&s.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[s.filled?"saved":"empty",s.active?"playing":"",s.edited?"edited":"",s.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[s.label,...l.filter(Boolean)].join(", "))}let a=e.querySelector(".nc-morph");a instanceof HTMLInputElement&&document.activeElement!==a&&(a.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Ga(e){let t=e.dataset.ncLastFill||null,a=Go(t);e.dataset.ncLastFill=a;let o=Uo(a);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function Kr(e,t){let a=document.createElement("button");a.type="button",a.className="nc-fill",a.dataset.ncFill="",a.textContent="Fill",a.title="Hold for a fill",a.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,a.setAttribute("aria-pressed",r?"true":"false");let s=t(e);s?.type==="stepGrid"&&s.onFill?.(r)};a.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),a.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])a.addEventListener(r,()=>i(!1));return a.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),a.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),a.addEventListener("contextmenu",r=>r.preventDefault()),a}function Wr(e,t){let a=document.createElement("div");a.className="nc-section",a.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=m=>{let y=document.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.textContent=m,o.append(y),y},r=i("Note"),s=i("Accent");s.dataset.ncAccentMode="";let l=m=>{for(let y of[r,s]){let b=y===m;y.setAttribute("aria-checked",b?"true":"false"),y.tabIndex=b?0:-1}};l(r);for(let m of[r,s])m.addEventListener("click",()=>l(m));o.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let y=s.getAttribute("aria-checked")==="true"?r:s;l(y),y.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(Kr(a,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let y=t(a);y?.type==="stepGrid"&&y.onClear?.()}),c.append(m)}a.append(c);for(let m of e.rows){let y=document.createElement("div");y.className="nc-row",y.dataset.ncRow="";let b=document.createElement("button");b.type="button",b.className="nc-name",b.textContent=m.label,b.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(b.dataset.ncLane=String((m.lane-1)%4+1));let f=!1,v=0;b.addEventListener("pointerdown",$=>{f=!1,!($.pointerType==="mouse"||$.button!==0)&&(v=window.setTimeout(()=>{let S=t(a);S?.type!=="stepGrid"||!S.selectedRows||(f=!0,S.onSelectRow?.(S.rows.findIndex(z=>z.id===m.id),!0))},Ir))});for(let $ of["pointerup","pointercancel","pointerleave"])b.addEventListener($,()=>window.clearTimeout(v));b.addEventListener("contextmenu",$=>{f&&$.preventDefault()}),b.addEventListener("click",$=>{let S=t(a);if(S?.type!=="stepGrid")return;if(f){f=!1;return}let z=S.rows.findIndex(J=>J.id===m.id),U=!!S.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);S.onSelectRow?.(z,U)}),b.addEventListener("keydown",$=>Xr(a,b,$));let A=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let z=document.createElement("button");z.type="button",z.className="nc-ms",z.dataset.ncMs=$,z.textContent=$==="mute"?"M":"S",z.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${m.label}`),S.append(z,B()),S.addEventListener("click",()=>{let U=t(a);if(U?.type!=="stepGrid")return;let J=U.rows.findIndex(ot=>ot.id===m.id);($==="mute"?U.onMute:U.onSolo)?.(J)}),A.push(S)}let k=document.createElement("div");k.className="nc-steps";for(let $=0;$<m.steps.length;$++){let S=document.createElement("span");S.className="nc-step-wrap";let z=document.createElement("button");z.type="button",z.className="nc-step",z.dataset.ncStep=`${m.id}:${$}`,z.setAttribute("aria-label",`${m.label} step ${$+1}`),S.append(z,B()),S.addEventListener("click",U=>{let J=t(a);if(J?.type!=="stepGrid")return;let ot=J.rows.findIndex(No=>No.id===m.id),qo=s.getAttribute("aria-checked")==="true";J.onToggle(ot,$,U.shiftKey||qo)}),k.append(S)}if(e.onLength&&k.append(Qr(a,k,m,t)),y.append(...A,b,k),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=m.id,$.setAttribute("aria-label",`Re-roll ${m.label}`),$.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=Fn(),$.append(B()),$.addEventListener("click",()=>{let S=t(a);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(z=>z.id===m.id))}),y.append($)}y.addEventListener("click",$=>{if($.target!==y)return;let S=t(a);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(z=>z.id===m.id))}),In(a,k,".nc-step-wrap",t,s,()=>m.id),a.append(y)}let d=document.createElement("div");d.className="nc-pads-head";let p=(m,y,b)=>{let f=document.createElement("button");return f.type="button",f.className=m,f.textContent=y,b&&f.setAttribute("aria-label",b),f},u=p("nc-pads-step","‹","Previous lane"),g=p("nc-pads-step","›","Next lane"),h=document.createElement(e.onLength?"button":"span");h.className="nc-pads-label",h.setAttribute("aria-live","polite"),e.onLength&&(h.type="button",h.dataset.ncLenToggle="",h.addEventListener("click",()=>{let m=t(a);m?.type==="stepGrid"&&(a.dataset.ncLenMode==="true"?delete a.dataset.ncLenMode:a.dataset.ncLenMode="true",Dt(a,m))}));for(let[m,y]of[[u,-1],[g,1]])m.addEventListener("click",()=>{let b=t(a);if(b?.type!=="stepGrid"||b.rows.length===0)return;let f=b.rows.length;b.onSelectRow?.(((Le(b)+y)%f+f)%f)});if(d.append(u,h,g),e.onDice){let m=p("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=Fn(),m.addEventListener("click",()=>{let y=t(a);if(y?.type!=="stepGrid")return;let b=Le(y);b>=0&&y.onDice?.(b)}),d.append(m)}if(e.transport){let m=p("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let y=t(a);y?.type==="stepGrid"&&y.transport?.onToggle()}),d.append(m)}a.append(d);let x=document.createElement("div");x.className="nc-pads",x.setAttribute("role","group");let w=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<w;m++){let y=document.createElement("button");y.type="button",y.className="nc-pad",y.dataset.ncPad=String(m),y.textContent=String(m+1),y.addEventListener("click",b=>{let f=t(a);if(f?.type!=="stepGrid")return;let v=Le(f);if(v<0)return;if(a.dataset.ncLenMode==="true"){f.onLength?.(v,m+1);return}let A=s.getAttribute("aria-checked")==="true";f.onToggle(v,m,b.shiftKey||A)}),x.append(y)}return In(a,x,".nc-pad",t,s,()=>{let m=t(a);return m?.type==="stepGrid"?m.rows[Le(m)]?.id:void 0}),a.append(x),a.append(q()),Dt(a,e),a}function Le(e){let t=e.rows.findIndex(a=>a.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function In(e,t,a,o,i,r){let s="on",l=!0,c=-1,d=(p,u)=>{let g=p.rows[c]?.steps[u];!g||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,s,l):!!g[s]!==l&&p.onToggle(c,u,s==="accent"))};xr(t,a,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let g=u.rows.findIndex(h=>h.id===r());g>=0&&u.rows[g].length!==p.pad+1&&u.onLength?.(g,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let g=r();c=u.rows.findIndex(x=>x.id===g);let h=u.rows[c]?.steps[p.pad];if(!h)return;s=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!h[s]}d(u,p.pad)}else if(p.kind==="long"){let g=r(),h=u.rows.findIndex(w=>w.id===g),x=t.querySelectorAll(a)[p.pad];h>=0&&x instanceof HTMLElement&&u.onLongPress?.(h,p.pad,x)}}})}function Xr(e,t,a){if(a.key!=="ArrowDown"&&a.key!=="ArrowUp"&&a.key!=="Home"&&a.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;a.key==="ArrowDown"?r=i+1:a.key==="ArrowUp"?r=i-1:a.key==="Home"?r=0:r=o.length-1;let s=o[r];!(s instanceof HTMLElement)||s===t||(a.preventDefault(),s.focus(),s.click())}function Qr(e,t,a,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=a.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(a.steps.length)),i.append(B());let r=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(x=>x.id===a.id),g=p.rows[u];if(!g)return;let h=Math.max(1,Math.min(g.steps.length,d));h!==g.length&&p.onLength?.(u,h)},s=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((g,h)=>{let x=g.getBoundingClientRect();x.width>0&&d>=x.left+x.width/2&&(u=h+1)}),u},l=d=>r(s(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(h=>h.id===a.id);if(!u)return;let g={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in g&&(d.preventDefault(),r(g[d.key]))}),i}var mt=new WeakMap,Te=new WeakMap;function Jr(e){return e?(Te.has(e)||(Te.set(e,yt(e)),ra(t=>{Te.set(e,t);for(let a of e.querySelectorAll("[data-nc-velocity]"))Nt(a,Number(a.getAttribute("data-nc-velocity")))},e)),Te.get(e)):"light"}function Nt(e,t){let a=typeof t=="number"&&Number.isFinite(t)?t:null,o=a===null?null:Jr(e.ownerDocument),i=a===null?null:`${o} ${a}`;if(!(mt.has(e)&&mt.get(e)===i)){if(mt.set(e,i),a===null){for(let r of Object.keys(hn(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(a));for(let[r,s]of Object.entries(hn(a,un[o]??un.light)))e.style.setProperty(r,s)}}function jn(e,t){let a=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";a?e.dataset.ncMark!==a&&(e.dataset.ncMark=a):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Dt(e,t){let a=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],s=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;s instanceof HTMLElement&&r&&(s.textContent=l?`${r.label} · ${r.length}`:r.label,t.onLength&&(s.setAttribute("aria-pressed",l?"true":"false"),s.setAttribute("aria-label",l?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let g=t.transport?.ariaLabel;g?d.setAttribute("aria-label",g):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||a&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let p=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let g=Number(u.getAttribute("data-nc-pad")),h=r.steps[g];u instanceof HTMLButtonElement&&(u.hidden=!h||!l&&g>=r.length,l&&g>=r.length?u.dataset.out="true":delete u.dataset.out,l&&g===r.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${r.label} step ${g+1}${h?.markLabel?`, ${h.markLabel}`:""}`),jn(u,h),u.setAttribute("aria-pressed",h?.on?"true":"false"),h?.accent?u.dataset.accent="true":delete u.dataset.accent,h?.dim?u.dataset.dim="true":delete u.dataset.dim,Nt(u,h?.velocity),t.playhead>=0&&g===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let h=0;h<p.steps.length;h++){let x=p.steps[h],w=e.querySelector(`[data-nc-step="${p.id}:${h}"]`);if(!(w instanceof HTMLButtonElement))continue;let m=w.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===p.id?m.dataset.selected="true":delete m.dataset.selected;let v=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);v?m.dataset.picked="true":delete m.dataset.picked;let A=m.querySelector(".nc-name");A instanceof HTMLElement&&(A.setAttribute("aria-pressed",t.selectedRow===p.id||v?"true":"false"),A.textContent!==p.label&&(A.textContent=p.label,A.setAttribute("aria-label",`Select ${p.label}`))),p.mute||a&&!p.solo?m.dataset.silent="true":delete m.dataset.silent;for(let k of m.querySelectorAll("[data-nc-ms]")){let $=k.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;k.setAttribute("aria-pressed",$?"true":"false")}}w.setAttribute("aria-pressed",x.on?"true":"false");let y=`${p.label} step ${h+1}${x.markLabel?`, ${x.markLabel}`:""}`;w.getAttribute("aria-label")!==y&&w.setAttribute("aria-label",y),jn(w,x),x.accent?w.dataset.accent="true":delete w.dataset.accent,x.dim?w.dataset.dim="true":delete w.dataset.dim,h%4===0?w.dataset.bar="true":delete w.dataset.bar,typeof x.velocity=="number"?(w.dataset.velocity="true",w.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,x.velocity))*100)}%`)):(delete w.dataset.velocity,w.style.removeProperty("--level")),Nt(w,x.velocity);let b=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;h===b?w.dataset.playhead="true":delete w.dataset.playhead;let f=!!t.onLength&&t.selectedRow===p.id;w.hidden=h>=p.length&&!f,h>=p.length&&f?w.dataset.out="true":delete w.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),g=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&g&&g.nextElementSibling!==u){let h=document.activeElement===u;g.after(u),h&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Zr(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-label",a.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(a,o,q()),t}function es(e,t){let a=document.createElement("div");a.className="nc-strip",a.dataset.ncId=e.id,a.setAttribute("role","group"),a.setAttribute("aria-label",e.label),e.master&&(a.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",s=null;r&&(a.dataset.ncFoldable="",s=Ja(),s.dataset.ncStripHide="",s.addEventListener("click",()=>{let f=t(a);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==s&&s.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let f=document.createElement("span");f.className="nc-strip-grip-dots",f.setAttribute("aria-hidden","true"),l.append(f),l.addEventListener("keydown",v=>{if(v.key!=="ArrowLeft"&&v.key!=="ArrowRight"||v.ctrlKey||v.metaKey||v.shiftKey)return;let A=t(a);A?.type==="strip"&&(v.preventDefault(),A.onMove?.(v.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Hn(a,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",f=>{f.pointerType==="touch"||f.pointerType==="pen"||f.target instanceof Element&&f.target.closest("input, .nc-strip-remove")||(f.preventDefault(),Hn(a,o,t,{x:f.clientX,y:f.clientY}))}),e.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let v=t(a);v?.type==="strip"&&v.onRemove?.(f)}),o.append(f)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let f=document.createElement("span");f.className="nc-hacks-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks",v.dataset.ncHacks="",f.append(v,B()),f.addEventListener("click",()=>{let A=t(a);A?.type==="strip"&&A.onHacks?.()}),c.append(f)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let f=document.createElement("span");f.className="nc-hacks-wrap nc-sends-view-wrap";let v=document.createElement("button");v.type="button",v.className="nc-hacks nc-sends-view",v.dataset.ncSendsView="",f.append(v,B()),f.addEventListener("click",()=>{let A=t(a);A?.type==="strip"&&A.onSendsView?.()}),d.append(f)}for(let f of["mute","solo"]){if(!(f==="mute"?e.onMute:e.onSolo))continue;let v=document.createElement("span");v.className="nc-ms-wrap";let A=document.createElement("button");A.type="button",A.className="nc-ms",A.dataset.ncMs=f,A.textContent=f==="mute"?"M":"S",v.append(A,B()),v.addEventListener("click",()=>{let k=t(a);k?.type==="strip"&&(f==="mute"?k.onMute:k.onSolo)?.()}),d.append(v)}let p=document.createElement("div");p.className="nc-strip-sends";for(let f of e.sends??[])p.append(ne({...f,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(ne(Jt(e),t));let g=document.createElement("div");g.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let f of e.ticks??[]){let v=document.createElement("span");v.className="nc-scale-tick",v.style.setProperty("--tick-pos",String(f.value)),v.textContent=f.label,h.append(v)}let x=ui({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:f=>{let v=t(a);v?.type==="strip"&&v.onChange(f)},onReset:()=>{let f=t(a);f?.type==="strip"&&Rn(f)}}),w=wi({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let f=t(a);f?.type==="strip"&&f.onClipClear?.()}});if(g.append(h,x.el,w.el),r){let f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");let v=document.createElement("span");v.className="nc-strip-fold-cap",v.setAttribute("aria-hidden","true");let A=document.createElement("span");A.className="nc-ui-fx-fold-name",A.dataset.ncStripFoldName="";let k=document.createElement("span");k.className="nc-strip-fold-pan",k.setAttribute("aria-hidden","true"),k.hidden=!e.pan,f.append(v,k,A),f.addEventListener("click",()=>{let $=t(a);if($?.type!=="strip")return;$.onFold?.(!1);let S=a.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),g.prepend(f)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let y=0;m.addEventListener("click",f=>{let v=t(a);v?.type!=="strip"||!v.onTypeIn||(window.clearTimeout(y),f.detail===0?Bn(a,m,t):f.detail===1&&(y=window.setTimeout(()=>Bn(a,m,t),as)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(y);let f=t(a);f?.type==="strip"&&Rn(f)});let b=document.createElement("div");return b.className="nc-strip-trim",e.trim&&b.append(ne(Zt(e),t)),s&&a.append(s),l&&a.append(l),a.append(o,b,c,d,p,u,g,m,q()),Ka(a,e),a}function Jt(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??ns(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:a=>t.onChange(a)}}function Zt(e){let t=e.trim,a=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:a,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??ts(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function ts(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let a=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${a} dB`}function ns(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var as=250;function Bn(e,t,a){let o=a(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??Ae(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,s=l=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=a(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),s(!0)):l.key==="Escape"&&(l.preventDefault(),s(!1))}),i.addEventListener("blur",()=>s(!1))}function os(e,t){let a=document.createElement("div");a.className="nc-strip-add",a.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let s=document.createElement("select");return s.className="nc-strip-add-select",s.addEventListener("change",()=>{let l=t(a),c=s.value;Ya(s),l?.type==="stripAdd"&&c&&l.onAdd(c)}),a.append(o,s,q()),Ua(a,e),a}function Ua(e,t){let a=e.querySelector(".nc-strip-add-label");a&&(a.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),s=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");r!==s&&(o.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Ya(o))}function Ya(e){let t=e.options[0];t&&(t.selected=!0)}function Rn(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Ka(e,t){let a=e.querySelector("[data-nc-strip-name]");a&&a.textContent!==t.label&&(a.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?hi(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),xi(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let s=e.querySelector(".nc-strip-db");if(s instanceof HTMLElement){let x=t.valueText??Ae(t.value);s.textContent!==x&&(s.textContent=x),s.setAttribute("aria-label",`${t.label} level ${x}`);let w=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";s.title=t.onTypeIn?`Click to type a value. ${w}`:w}for(let x of e.querySelectorAll("[data-nc-ms]")){let w=x.getAttribute("data-nc-ms"),m=w==="mute"?t.mute===!0:t.solo===!0;x.setAttribute("aria-pressed",m?"true":"false"),x.setAttribute("aria-label",`${w==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let x=t.hacksLabel??"Hacks";l.textContent!==x&&(l.textContent=x),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${x}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let x=t.sendsViewLabel??"Sends";c.textContent!==x&&(c.textContent=x),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${x}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Q(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=Wa(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let x=e.querySelector(`.nc-strip-trim [data-nc-id="${ue(t.trim.id)}"]`);x&&I(x,Zt(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let x=e.querySelector(`.nc-strip-pan [data-nc-id="${ue(t.pan.id)}"]`);x&&I(x,Jt(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let g=e.querySelector("[data-nc-strip-hide]");g instanceof HTMLElement&&(Za(g,u,t.label),Q(g,t.foldHelp));let h=e.querySelector("[data-nc-strip-fold]");if(h instanceof HTMLElement){h.hidden=!u,h.setAttribute("aria-label",`Expand ${t.label}`);let x=h.querySelector("[data-nc-strip-fold-name]");x&&x.textContent!==t.label&&(x.textContent=t.label),Q(h,t.foldedHelp??t.foldHelp)}}function Wa(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Xa?t:0}var Xa=8,Fe=null;function Hn(e,t,a,o){Fe?.();let i=a(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,s=r.defaultView??globalThis,l=r.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=Wa(i),u=e.querySelector("[data-nc-strip-grip]")??t,g=(y=!1)=>{if(Fe!==g)return;Fe=null;let b=l.contains(r.activeElement);l.remove(),r.removeEventListener("keydown",x,!0),r.removeEventListener("pointerdown",w,!0),s.removeEventListener("resize",m),(y||b)&&u?.isConnected&&u.focus?.({preventScroll:!0})},h=[0,...Array.from({length:Xa},(y,b)=>b+1)].map(y=>{let b=r.createElement("button");return b.type="button",b.setAttribute("role","radio"),b.setAttribute("aria-checked",y===p?"true":"false"),b.setAttribute("tabindex",y===p?"0":"-1"),b.dataset.ncShadeChoice=String(y),y===0?(b.textContent="Auto",b.setAttribute("aria-label","Auto: alternate light and dark"),b.title="Auto: alternate light and dark"):(b.textContent=String(y),b.setAttribute("aria-label",`Shade ${y}`),b.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${y})`)),b.addEventListener("click",()=>{let f=a(e);g(!0),f?.type==="strip"&&f.onShade?.(y===0?null:y)}),b});if(d.append(...h),d.addEventListener("keydown",y=>{let b=h.indexOf(r.activeElement);if(b<0)return;let f=-1;y.key==="ArrowRight"||y.key==="ArrowDown"?f=(b+1)%h.length:y.key==="ArrowLeft"||y.key==="ArrowUp"?f=(b-1+h.length)%h.length:y.key==="Home"?f=0:y.key==="End"&&(f=h.length-1),!(f<0)&&(y.preventDefault(),h[b].setAttribute("tabindex","-1"),h[f].setAttribute("tabindex","0"),h[f].focus())}),l.append(c,d),typeof i.onMove=="function"){let y=[...e.parentElement?.children??[]].filter(f=>f.classList?.contains("nc-strip")&&!f.hasAttribute("data-nc-master")),b=y.indexOf(e);for(let[f,v,A]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let k=r.createElement("button");k.type="button",k.className="nc-strip-menu-item",k.dataset.ncStripMove=f<0?"left":"right";let $=r.createElement("span");$.textContent=v;let S=r.createElement("kbd");S.textContent=A,S.setAttribute("aria-hidden","true"),k.append($,S),k.disabled=f<0?b<=0:b<0||b>=y.length-1,k.addEventListener("click",()=>{let z=a(e);g(!0),z?.type==="strip"&&z.onMove?.(f)}),l.append(k)}}r.body.append(l),(()=>{let y=t.getBoundingClientRect?.()??{bottom:0,right:0},b=l.offsetWidth,f=l.offsetHeight,v=s.innerWidth||r.documentElement.clientWidth||b,A=s.innerHeight||r.documentElement.clientHeight||f,k=o?o.x:y.right-b,$=o?o.y:y.bottom+4;k=Math.max(4,Math.min(k,v-b-4)),$+f>A-4&&($=Math.max(4,(o?o.y:y.top)-f-4)),l.style.left=`${Math.round(k)}px`,l.style.top=`${Math.round($)}px`})();let x=y=>{if(y.key==="Escape")y.preventDefault(),y.stopPropagation(),g(!0);else if(y.key==="Tab"&&l.contains(r.activeElement)){let b=[...l.querySelectorAll("button:not([disabled])")].filter(v=>v.getAttribute("tabindex")!=="-1"),f=(b.indexOf(r.activeElement)+(y.shiftKey?-1:1)+b.length)%b.length;y.preventDefault(),b[f]?.focus()}},w=y=>{l.contains(y.target)||g(!1)},m=()=>g(!1);return r.addEventListener("keydown",x,!0),r.addEventListener("pointerdown",w,!0),s.addEventListener("resize",m),Fe=g,(h.find(y=>y.getAttribute("tabindex")==="0")??h[0]).focus({preventScroll:!0}),{el:l,close:()=>g(!1)}}var Pt=typeof ResizeObserver=="function"?new ResizeObserver(is):null;function is(e){for(let t of e){if(!t.target.isConnected){Pt.unobserve(t.target);continue}let a=t.target.parentElement;a?.classList.contains("nc-ui-fx")&&rs(a)}}function rs(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),a=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=a instanceof HTMLElement?a.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function ss(e){if(Pt)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Pt.observe(t)}function ls(e,t){let a=document.createElement("div");a.className="nc-ui-fx",a.dataset.ncId=e.id,a.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,s=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!We(e)&&!r&&!s)a.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),r&&l.append(to(a,"head")),e.on!==void 0){let c=ca({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(cs(a,t)),We(e)&&l.append(ms(a,t)),s&&l.append(fs(t)),a.append(l)}i&&a.prepend(ps(a,t)),r&&no(a,e);for(let l of e.controls)a.append(ne(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(ne(d,t));a.append(l)}return a.append(q()),ao(a,e),ss(a),a}var ds=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Qa(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),a=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&ds(t)?t:a;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function cs(e,t){let a=Ja();return a.dataset.ncFxHide="",a.addEventListener("click",()=>{let o=t(a);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Qa(e))}),a}function Ja(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Za(e,t,a){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${a}`),e.title=t?"Expand":"Minimize"}function ps(e,t){let a=document.createElement("button");a.type="button",a.className="nc-ui-fx-fold",a.dataset.ncFxFold="",a.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),a.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&a.append(to(e,"fold")),a.addEventListener("click",()=>{let s=t(a);if(s?.type==="fx"){if(s.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}s.onFold?.(!1),Qa(e)}}),a}var me=new Set;function Ie(e,t){let a=e.defaultView;typeof a?.requestAnimationFrame=="function"?a.requestAnimationFrame(t):setTimeout(t,16)}var We=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),us="(max-width: 768px)";function hs(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function ms(e,t){let a=document.createElement("button");return a.type="button",a.className="nc-fx-max",a.dataset.ncFxMax="",a.dataset.ncMaxToggle="",a.append(hs()),a.addEventListener("click",()=>{let o=t(a);o?.type==="fx"&&(eo(e,o,!me.has(o.id)),a.focus())}),a}function fs(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let a=e(t);a?.type==="fx"&&a.onRemove?.(t)}),t}function eo(e,t,a){a?me.add(t.id):me.delete(t.id),en(e,t)}function gs(e,t){t?.type==="fx"&&me.has(t.id)&&eo(e,t,!1)}function bs(e){return e.ownerDocument.defaultView?.matchMedia?.(us).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function en(e,t){let a=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=We(t)&&me.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(a instanceof HTMLElement&&(a.hidden=!We(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===a.hidden&&(e.toggleAttribute("data-nc-maxable",!a.hidden),Ie(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&he(s)})),a.setAttribute("aria-pressed",o?"true":"false"),a.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),a.title=o?"Restore (Esc)":"Maximize",Q(a,t.maxHelp)),!o){e.dataset.ncMax&&On(e);return}if(!e.isConnected){let s=()=>e.isConnected&&me.has(t.id)&&en(e,t);queueMicrotask(()=>{e.isConnected?s():Ie(e.ownerDocument,s)});return}let i=bs(e),r=[...e.children].filter(s=>s.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&On(e),e.dataset.ncMax=i,i==="over"&&ws(e,t)),xs(e.ownerDocument),i==="over"&&tn(e),Ie(e.ownerDocument,()=>{for(let s of e.querySelectorAll(".nc-eq"))s instanceof HTMLElement&&he(s)})}function On(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Ie(e.ownerDocument,()=>{for(let a of e.querySelectorAll(".nc-eq"))a instanceof HTMLElement&&he(a)})}function ws(e,t){let a=document.createElement("div");a.className="nc-fx-ghost",a.setAttribute("aria-hidden","true"),a.style.height=`${e.offsetHeight}px`,e.before(a),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function tn(e){let t=e.previousElementSibling,a=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(a instanceof HTMLElement))return;let o=a.parentElement instanceof HTMLElement?a.parentElement:a,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,s=Ii(t.getBoundingClientRect(),a.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${s.left}px`,e.style.top=`${s.top}px`,e.style.width=`${s.width}px`}var _n=new WeakSet;function xs(e){_n.has(e)||(_n.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let a=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(a.find(i=>i.contains(e.activeElement))??a[a.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&tn(t)}))}var It=new WeakMap;function to(e,t){let a=hr(e.ownerDocument);return a.dataset.ncFxLevel=t,a}function no(e,t){let a=[...e.querySelectorAll("[data-nc-fx-level]")];if(!a.length)return;for(let i of a)Q(i,t.meterHelp);let o=It.get(e);o?o.set(t.meter):It.set(e,br(a,t.meter))}function ao(e,t){(t.meter||It.has(e))&&no(e,t);let a=e.querySelector(".nc-ui-fx-name");a&&(a.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(Za(r,i,t.title),Q(r,t.foldHelp)),en(e,t);let s=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(s instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;s.hidden=i,s.setAttribute("aria-label",c),s.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),Q(l,t.foldHelp)}}function Q(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function ue(e){return e.replace(/["\\]/g,"\\$&")}function ys(e,t){for(let a of e.querySelectorAll("canvas")){if(!(a instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===a.dataset.ncId);o?.type==="canvas"&&fa(a,o)}for(let a of e.querySelectorAll(".nc-eq"))a instanceof HTMLElement&&he(a);for(let a of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))a instanceof HTMLElement&&tn(a);Lr(e)}var vs=1e3,$s=e=>e===!0?"log":typeof e=="string"?e:"linear";function ks(e,t={}){let a=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??$s(e.log),i=Me(o,e.min,e.max),r=a.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let s=a.createElement("label");s.className="nc-label",s.setAttribute("for",e.id),s.textContent=e.label;let l=a.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?vs:e.max),l.step=i?"1":String(e.step??"any");let c=a.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=a.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",r.append(s,l,c,d);let p=e.value,u=()=>{let h=e.format(p);c.textContent=h,l.setAttribute("aria-valuetext",h)},g=h=>{p=h,a.activeElement!==l&&(l.value=String(i?Ee(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?Ge(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",h=>{let x=Gt(o,e.min,e.max,p,h.key,h.shiftKey,e.step);x===null||l.disabled||(h.preventDefault(),l.value=String(Ee(o,e.min,e.max,x)),p=x,u(),e.onInput(p))}),l.disabled=e.disabled===!0,g(e.value),{el:r,set:g,setDisabled(h){l.disabled=h===!0}}}var Xe="data-nc-help";function Es(e,t,a,o=0,i=6,r=8){let s=e.top-i-t.height,l=s>=o+r?"above":"below",c=l==="above"?s:e.bottom+i,d=Math.max(r,Math.min(e.left,a-r-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var ft=new WeakMap;function As(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Ss({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let a=ft.get(e);if(a)return a;let o=e.defaultView,i=null,r=null,s,l=!1,c,d=()=>{clearTimeout(s),clearTimeout(c),r=null,l=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},p=(x,w)=>{let m=w??x.getAttribute(Xe);if(!m)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=m,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let y=x.getBoundingClientRect(),b=Es(y,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,As(e));return i.style.top=`${b.top}px`,i.style.left=`${b.left}px`,i.dataset.side=b.side,i.style.visibility="",!0},u=x=>{if(l||x.pointerType==="touch")return;let w=x.target&&x.target.closest?x.target.closest(`[${Xe}]`):null;w!==r&&(d(),w&&(r=w,s=setTimeout(()=>{r===w&&w.isConnected&&p(w)},t)))},g=x=>{(l||x.key==="Escape")&&d()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",d,!0),e.addEventListener("keydown",g),o.addEventListener("scroll",d,!0),o.addEventListener("blur",d);let h={hide:d,pin(x,w,{ms:m=0}={}){return d(),!x||!x.isConnected||!p(x,w)?!1:(l=!0,i.dataset.pinned="",m>0&&(c=setTimeout(d,m)),!0)},uninstall(){d(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",d,!0),e.removeEventListener("keydown",g),o.removeEventListener("scroll",d,!0),o.removeEventListener("blur",d),i?.remove(),i=null,ft.delete(e)}};return ft.set(e,h),h}var nn="netcomposer.rhythm.hidden.v1",O=new WeakMap;function gt(){try{return globalThis.localStorage??null}catch{return null}}function oo(e,t=nn){try{let a=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(a)?a.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Vn(e,t,a,o=nn){let i=oo(e,o);a?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function an(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],a=[],o=i=>{if(a.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&a.push(...i.controls,...i.more??[]),i.type==="strip"&&(a.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&a.push(Jt(i)),i.trim&&a.push(Zt(i)));return a}function io(e,t){if(!(!e||!t))return an(e).find(a=>a.id===t)}function Ms(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${an(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(a=>`${a.id}/${a.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(a=>`${a.id}=${a.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(a=>`${a.group?`${a.group}/`:""}${a.value}${a.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(a=>a.id).join(",")}:${(t.ticks??[]).map(a=>`${a.label}@${a.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(a=>a.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(a=>a.id).join(",")}/${(t.more??[]).map(a=>a.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function zs(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let a=document.createElement("div");a.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",a.append(o,i),e.append(a),ro(e,t)}function ro(e,t){if(!t.panel)return;let a=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=a?.querySelector(".nc-panel-title"),i=a?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Cs(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let a=O.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return io(a,o)}function Ls(e,t,a){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=Ms(t);if(e.dataset.ncSignature===i){for(let r of o){let s=e.querySelector(`[data-nc-section="${Un(r.id)}"]`);s&&ro(s,r);for(let l of r.controls){let c=e.querySelector(`[data-nc-id="${Un(l.id)}"]`);c instanceof Element&&I(c,l)}s instanceof HTMLElement&&jt(s,r,a)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let s=document.createElement("div");s.className="nc-section",s.dataset.ncSection=r.id,r.inset&&(s.dataset.ncInset="true"),r.area&&(s.dataset.ncArea=r.area),r.label&&(s.setAttribute("role","group"),s.setAttribute("aria-label",r.label)),r.panel&&(s.dataset.ncPanel="true",s.setAttribute("role","region"),r.title&&s.setAttribute("aria-label",r.title)),zs(s,r);let l=r.panel?document.createElement("div"):s;r.panel&&(l.className="nc-panel-body",s.append(l));for(let c of r.controls)l.append(ne(c,Cs));e.append(s),jt(s,r,a)}}function so(e,t,a){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(a)?Math.trunc(a):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var Ts="(max-width: 768px)",lo=new WeakMap;function Gn(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let a=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",a),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Fs(e,t){let a=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(a)return a;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=Gn("prev"),r=Gn("next"),s=document.createElement("span");s.className="nc-fx-page-count",s.dataset.ncFxPageCount="",s.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,s,r,l);let c=(d,p)=>{let u=lo.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let g=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:h}=so(g,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,h),u.onPage?.(h),jt(e,{...u,page:h},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(o),o}function jt(e,t,a){lo.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:s}=so(o.length,i,t.page??a.pages.get(t.id)??0);if(i>0&&a.pages.set(t.id,s),r<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of o)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Ts).matches===!0,c=e.closest(".nc-module");o.forEach((m,y)=>{let b=Math.floor(y/i)!==s;if(b?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,b&&!l){let f=c instanceof HTMLElement?O.get(c):void 0;gs(m,io(f,m.dataset.ncId))}});let d=Fs(e,a),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",s===0?"true":"false"),u.setAttribute("aria-disabled",s===r-1?"true":"false");let g=d.querySelector("[data-nc-fx-page-count]"),h=`${s+1} / ${r}`;g.textContent!==h&&(g.textContent=h);let x=d.querySelector("[data-nc-fx-page-live]"),w=`Effects page ${s+1} of ${r}`;x.textContent!==w&&(x.textContent=w)}function Un(e){return e.replace(/["\\]/g,"\\$&")}function qs(e,t=nn){da();let a=document.createElement("section");a.className="nc nc-module",a.dataset.ncModule=e.id,a.dataset.ncOpen="true",a.dataset.ncPlace="adjacent",a.dataset.ncShade="1",e.lead&&(a.dataset.ncLead=""),e.compact&&(a.dataset.ncCompact="");let o=oo(gt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let s=document.createElement("span");s.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=ca({labelledBy:r.id,onChange:b=>(O.get(a)??e).onToggle?.(b)});d.el.dataset.ncModuleSwitch="",s.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(r,p,s);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let g=document.createElement("button");g.type="button",g.className="nc-slim";let h=document.createElement("span");h.className="nc-slim-lines",g.append(h);let x=document.createElement("i");x.className="nc-token-probe",x.dataset.ncProbe="",a.append(x,i,u,g),a.setAttribute("aria-labelledby",r.id);let w=b=>{let f=O.get(a)??e;a.dataset.ncOpen=b?"false":"true",u.hidden=b,g.hidden=!b,l.textContent=b?"+":"−",l.setAttribute("aria-expanded",b?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${b?"Show":"Hide"} ${f.title}`),l.title=b?"Show":"Hide",b?a.dataset.ncSlim="":delete a.dataset.ncSlim};l.addEventListener("click",()=>{let b=a.dataset.ncOpen==="true";Vn(gt(),(O.get(a)??e).id,b,t),w(b),Bt(a.parentElement)}),g.addEventListener("click",()=>{Vn(gt(),(O.get(a)??e).id,!1,t),w(!1),Bt(a.parentElement)});let m={pages:new Map,redraw:()=>y.redraw()},y={el:a,update(b){O.set(a,b),b.compact?a.dataset.ncCompact="":delete a.dataset.ncCompact,r.textContent=b.title,p.textContent=b.status??"",b.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),h.textContent=b.summary??b.title,d.el.hidden=b.on===void 0,d.set(b.on===!0),b.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,g.setAttribute("aria-label",`Show ${b.title}`),Ls(u,b,m),w(u.hidden),y.redraw()},redraw(){let b=O.get(a);b&&ys(a,an(b))}};return O.set(a,e),w(o),y.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>y.redraw()).observe(a),ra(()=>y.redraw(),a.ownerDocument),y}function Ns(e,t,a="adjacent"){da(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=a==="stack"?"stack":"adjacent",e.replaceChildren();let o=a==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let s=r%4+1;i.el.dataset.ncShade=String(s),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(s).padStart(2,"0")),e.append(i.el),i.redraw()}),Bt(e)}function Bt(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),a=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?n("module-slim-column"):a?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));a&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Ds={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass from the next beat.",solo:"Play only the soloed passes. Mute wins over solo.","pass-volume":"How hard this pass plays (velocity), 0–100%.",keep:"Protect this pass from Clear unkept.","clear-unkept":"Delete every pass that isn't kept.","new-song":"Start a new song at the Studio's tempo. This one stays in this browser.",delete:"Delete this pass.","pass-quantize":"This pass's own quantize. Song follows the Setup."};function co(e){return Ds[e]??""}const po="nc-song-looper",uo=1,F=960,N=4,G=32,Rt=4e3,ho=120,Qe=40,Je=240,Ps=8,je=40,on=["off","1/8","1/16","1/32"],mo=[.5,.75,1],fe=e=>Math.max(1,Math.floor(e/N)),Ze=e=>e.bars*N*F;function Is(e){const t=Math.round(e.bars*N*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function fo(e,t=new Date,a=Math.random){const o=Math.min(Je,Math.max(Qe,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString(),r=i.replace(/[-:T]/g,"").slice(0,12);return{format:po,version:uo,id:`sl-${r}-${Math.floor(a()*65535).toString(16).padStart(4,"0")}`,name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:o,beatsPerBar:N,bars:Math.min(Ps,fe(o)),countInBars:1,ppq:F},passes:[],comps:[]}}const xe=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),H=e=>Number.isInteger(e),ie=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,bt=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),le=(e,t)=>{for(const a of Object.keys(e))if(!t.includes(a))return a;return null};function Yn(e){if(e===void 0)return null;if(!xe(e))return"quantize must be an object";const t=le(e,["grid","strength"]);return t?`quantize has an unknown field (${t})`:on.includes(e.grid)?mo.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%":"quantize grid is not off, 1/8, 1/16 or 1/32"}function js(e){if(!xe(e)||e.format!==po)return"it isn't a Song Looper session";if(e.version!==uo)return`it's from another format (version ${String(e.version)})`;const t=le(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!ie(e.id))return"its id is missing";if(!ie(e.name,je*2))return"its name is missing";if(!bt(e.createdAt)||!bt(e.updatedAt))return"its dates are wrong";const a=e.song;if(!xe(a))return"its song is missing";const o=le(a,["bpm","beatsPerBar","bars","countInBars","ppq","quantize"]);if(o)return`its song has an unknown field (${o})`;if(!H(a.bpm)||a.bpm<Qe||a.bpm>Je)return`its tempo is not ${Qe}–${Je}`;if(a.beatsPerBar!==N)return"it isn't in 4/4";if(!H(a.bars)||a.bars<1||a.bars>fe(a.bpm))return`its bars are not 1–${fe(a.bpm)}`;if(a.countInBars!==0&&a.countInBars!==1)return"its count-in is not 0 or 1 bar";if(a.ppq!==F)return`its ticks are not ${F} a beat`;const i=Yn(a.quantize);if(i)return`its song's ${i}`;const r=Ze(a);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>G)return`it has more than ${G} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const s=new Set,l=new Set;for(let c=0;c<e.passes.length;c++){const d=e.passes[c],p=`Pass ${c+1}`;if(!xe(d))return`${p} is not an object`;const u=le(d,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize"]);if(u)return`${p} has an unknown field (${u})`;if(!ie(d.id)||s.has(d.id))return`${p} has no id of its own`;if(s.add(d.id),!H(d.n)||d.n<1||l.has(d.n))return`${p} has no number of its own`;if(l.add(d.n),!ie(d.name,je))return`${p}'s name is not 1–${je} characters`;if(!bt(d.recordedAt))return`${p}'s date is wrong`;if(!H(d.endTick)||d.endTick<=0||d.endTick>r)return`${p}'s end is not in the song`;for(const x of["kept","mute","solo"])if(typeof d[x]!="boolean")return`${p}'s ${x} is not true or false`;if(typeof d.volume!="number"||!(d.volume>=0&&d.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(d.instruments)||!d.instruments.every(x=>ie(x,64)))return`${p}'s instruments are wrong`;const g=Yn(d.quantize);if(g)return`${p}'s ${g}`;if(!Array.isArray(d.events))return`${p}'s events are missing`;if(d.events.length>Rt)return`${p} has more than ${Rt} events`;let h=Number.NEGATIVE_INFINITY;for(let x=0;x<d.events.length;x++){const w=d.events[x],m=`event ${x+1} in ${p}`;if(!xe(w))return`${m} is not an object`;if(!ie(w.inst,64)||!d.instruments.includes(w.inst))return`${m} is from an instrument not listed`;if(!H(w.at)||w.at<-ho||w.at>=d.endTick)return`${m} is outside the pass`;if(w.at<h)return`${m} is out of order`;if(h=w.at,w.kind==="slot"){const b=le(w,["kind","inst","slot","at"]);if(b)return`${m} has an unknown field (${b})`;if(!H(w.slot)||w.slot<1||w.slot>16)return`${m} has slot ${String(w.slot)}`;continue}const y=le(w,["kind","inst","note","vel","at","len","slice"]);if(y)return`${m} has an unknown field (${y})`;if(w.kind!==void 0&&w.kind!=="note")return`${m} is of an unknown kind`;if(!H(w.note)||w.note<0||w.note>127)return`${m} has note ${String(w.note)}`;if(typeof w.vel!="number"||!(w.vel>0&&w.vel<=1))return`${m} has velocity ${String(w.vel)}`;if(!H(w.len)||w.len<1||w.len>r)return`${m} has a length outside the song`;if(w.slice!==void 0&&!(H(w.slice)&&w.slice>=0&&w.slice<=255))return`${m} has slice ${String(w.slice)}`}}return null}function Bs(e){const t=js(e);return t?{error:`This Song Looper session can't be opened: ${t}.`}:{session:structuredClone(e)}}class Rs{song;b0;passes;drafts=new Map;held=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.song.bars*N}get lapTicks(){return Ze(this.song)}get full(){return this.passes.length>=G}hasDraft(t){return(this.drafts.get(t)?.count??0)>0}place(t){const a=t-this.b0,o=Math.floor(a/this.lapBeats+1e-12);return{lap:o,tick:Math.round((a-o*this.lapBeats)*F)}}placeOn(t){const a=this.place(t);return a.tick>=this.lapTicks-ho?{lap:a.lap+1,tick:a.tick-this.lapTicks}:a}beatOf(t,a){return this.b0+t*this.lapBeats+a/F}played(t,a){const o=[];for(const i of a){if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="chordPad"){this.stats.ignored++;continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:r,tick:s}=this.placeOn(i.beat);if(r<0||r<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(r)??{lap:r,events:[],count:0};if(l.events.length>=Rt){this.stats.overCap++;continue}let c;if(i.type==="slot")c={kind:"slot",inst:t,slot:i.slot,at:s};else{const d={inst:t,note:i.note,vel:Hs(i.velocity),at:s,len:1};i.slice!==void 0&&(d.slice=i.slice),this.held.set(`${t}|${i.id}`,{ev:d,onBeat:i.beat}),c=d}Kn(l.events,c),l.count++,this.drafts.set(r,l),this.stats.taken++,o.push({lap:r,ev:c})}return o}release(t,a,o){const i=`${t}|${a}`,r=this.held.get(i);r&&(this.held.delete(i),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-r.onBeat)*F))))}seam(t){const a=this.place(t).lap,o=[];for(let i=this.through+1;i<a;i++){this.through=i;const r=this.commit(i,this.lapTicks);r&&o.push(r)}return o}stop(t){for(const[r,s]of this.held)this.held.delete(r),s.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-s.onBeat)*F)));const a=this.seam(t),{lap:o,tick:i}=this.place(t);if(o>=0&&o>this.through){this.through=o;const r=N*F,s=Math.min(this.lapTicks,Math.max(r,Math.ceil(Math.max(1,i)/r)*r)),l=this.commit(o,s);l&&a.push(l)}return this.drafts.clear(),a}isHeld(t){for(const a of this.held.values())if(a.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.held.clear()}commit(t,a){const o=this.drafts.get(t);if(this.drafts.delete(t),!o||o.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=o.count,null;const i=this.passes.reduce((l,c)=>Math.max(l,c.n),0)+1,r=o.events.filter(l=>l.at<a),s={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:a,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(r.map(l=>l.inst))],events:r};return this.passes.push(s),this.laps.set(s,t),this.redoStack=[],s}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:a}=this.place(t),o=this.drafts.get(a);if(o&&o.count>0){this.drafts.delete(a);for(const[l,c]of this.held)o.events.includes(c.ev)&&this.held.delete(l);const s={kind:"lap",draft:o};return this.redoStack.push(s),s}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}redo(t){const a=this.redoStack.pop();if(!a)return null;if(a.kind==="pass"){if(this.full)return this.redoStack.push(a),null;const r=this.passes.findIndex(s=>s.n>a.pass.n);return r<0?this.passes.push(a.pass):this.passes.splice(r,0,a.pass),a}const{lap:o}=this.place(t);if(a.draft.lap===o||a.draft.lap>this.through){const r=this.drafts.get(a.draft.lap);if(r)for(const s of a.draft.events)Kn(r.events,s);else this.drafts.set(a.draft.lap,a.draft);return r&&(r.count+=a.draft.count),a}this.drafts.set(a.draft.lap,a.draft);const i=this.commit(a.draft.lap,this.lapTicks);return i?{kind:"pass",pass:i}:null}get canRedo(){return this.redoStack.length>0}}function Hs(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function Kn(e,t){let a=e.length;for(;a>0&&e[a-1].at>t.at;)a--;e.splice(a,0,t)}const Os=.5,_s=12,Vs={"1/8":F/2,"1/16":F/4,"1/32":F/8};function Wn(e,t){const a=t?Vs[t.grid]:void 0;if(!t||!a)return e;const o=Math.round(e/a)*a;return Math.round(e+(o-e)*t.strength)}function Gs(e,t){return e.mute?!1:t?e.solo:!0}const Xn=e=>e.kind==="slot";class Us{constructor(t,a){this.rec=t,this.sink=a}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];stats={sent:0,dropped:0,rewinds:0,slots:0};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.sink.restart()}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.sink.off()}rewind(t){if(!(this.sentTo===Number.NEGATIVE_INFINITY||t>=this.sentTo)){this.stats.rewinds++,this.sink.off(t),this.sentTo=t,this.waiting=this.waiting.filter(a=>a.beat<t);for(const[a,o]of this.sounding)this.sounding.set(a,o.filter(i=>i.start<t))}}pump(t,a){const o=this.rec,i=[];if(this.waiting.length){const b=[];for(const f of this.waiting){if(o.isHeld(f.ev)){b.push(f);continue}if(f.beat>=t)i.push(f);else{const v=Math.min(f.ev.len,Ze(this.song))/F-(t-f.beat);v>.05&&i.push({...f,beat:t,lenBeats:v})}}this.waiting=b}const r=Math.max(this.sentTo,t);if(!(a>r)&&!i.length)return 0;const s=o.lapBeats,l=Ze(this.song),c=o.b0,d=Math.max(0,Math.floor((r-c)/s)-1),p=Math.floor((a-c)/s)+1,u=[],g=(b,f)=>{const v=c+f*s+b.at/F;v>=r&&v<a&&u.push({inst:b.inst,beat:v,slot:b.slot})},h=o.passes,x=h.some(b=>b.solo&&!b.mute),w=(b,f,v,A,k,$)=>{const S=c+k*s+A/F;S>=r&&S<a&&(o.isHeld(v)?this.waiting.push({inst:b,age:f,beat:S,ev:v,velocity:$}):i.push({inst:b,age:f,beat:S,ev:v,velocity:$}))};for(const b of h){if(!Gs(b,x))continue;const f=o.lapOf(b),v=f===void 0?0:f+1,A=b.quantize??this.song.quantize;for(let k=Math.max(v,d);k<=p;k++)for(const $ of b.events)if(!($.at>=b.endTick)){if(Xn($)){g($,k);continue}w($.inst,b.n,$,Wn($.at,A),k,$.vel*b.volume)}}if(!x)for(const b of o.drafting())for(let f=Math.max(b.lap+1,d);f<=p;f++)for(const v of b.events){if(Xn(v)){g(v,f);continue}w(v.inst,Number.POSITIVE_INFINITY,v,Wn(v.at,this.song.quantize),f,v.vel)}if(this.sentTo=Math.max(this.sentTo,a),u.length){u.sort((f,v)=>f.beat-v.beat);const b=new Map;for(const f of u){const v=b.get(f.inst)??[];v.push({type:"slot",id:`s${++this.serial}`,beat:f.beat,slot:f.slot}),b.set(f.inst,v)}for(const[f,v]of b)this.sink.controls(f,v);this.stats.slots+=u.length}if(!i.length)return 0;i.sort((b,f)=>b.beat-f.beat||f.age-b.age);const m=new Map;for(const b of i){const f=b.lenBeats??Math.max(1,Math.min(b.ev.len,l))/F;if(!this.voice(b.inst,b.beat,b.beat+f,b.age)){this.stats.dropped++;continue}const v={note:b.ev.note,velocity:Math.max(.01,Math.min(1,b.velocity)),startBeat:b.beat,lengthBeats:f,spanBeats:f,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:b.ev.note};b.ev.slice!==void 0&&(v.slice=b.ev.slice);const A=m.get(b.inst)??[];A.push(v),m.set(b.inst,A)}let y=0;for(const[b,f]of m)this.sink.send(b,f),y+=f.length;return this.stats.sent+=y,y}voice(t,a,o,i){const r=(this.sounding.get(t)??[]).filter(s=>s.end>a);if(r.length>=_s){let s=0;for(let l=1;l<r.length;l++)r[l].age<r[s].age&&(s=l);if(i<=r[s].age)return this.sounding.set(t,r),!1;r.splice(s,1)}return r.push({start:a,end:o,age:i}),this.sounding.set(t,r),!0}}const Ys={running:!1,beatAt:()=>0,timeAt:()=>0};class Ks{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];constructor(t,a){this.session=t,this.deps=a,this.rec=new Rs({song:t.song,b0:0,passes:t.passes,now:a.date}),this.replay=a.sink?new Us(this.rec,a.sink):null;const o=a.host;o?.clock&&this.offs.push(o.clock.onChange(i=>this.clockChanged(i))),o?.onPlayed&&this.offs.push(o.onPlayed((i,r)=>this.played(i,r))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],i=>(i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??Ys}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const a of[...this.listeners])try{a()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const a=Math.min(Je,Math.max(Qe,Math.round(t)));a!==this.session.song.bpm&&(this.session.song.bpm=a,this.session.song.bars=Math.min(this.session.song.bars,fe(a)),this.changed())}toggle(){this.jamming||this.wantJam?this.stop():this.jam()}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.transport.running){const o=Math.ceil(this.beatNow()/N+.05)*N;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.play();this.changed(!1)}begin(t){this.wantJam=!1,this.jamming=!0;const a=t+this.session.song.countInBars*N;this.rec.resume(a),this.replay?.start(),this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,a)}showCountIn(t,a){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||a<=t)return;const i=this.transport,r=l=>o.mapper?.toContextTime(i.timeAt(l))??0,s=[];for(let l=t;l<a;l++)s.push(r(l));try{this.deps.countIn.show("looper",{beats:s,accents:s.map((l,c)=>c%N===0),until:r(a)})}catch{}}stop(){const t=this.deps.host,a=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(a||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){t.kind==="start"&&this.wantJam?this.begin(typeof t.beat=="number"?t.beat:0):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),this.changed(!1)}played(t,a){if(!this.jamming)return;this.rec.played(t,a).length&&this.changed(!1)}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:a}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),a!==this.lastLap&&(this.lastLap=a,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const r=this.rec.seam(t);return this.replay?.pump(t,this.transport.beatAt(this.deps.now()+Os)),r.length?(this.changed(),!0):o}view(){const t=this.session,a=this.transport,o=this.jamming&&a.running?this.beatNow():null,i=o===null?null:this.rec.place(o),r=o!==null&&o<this.rec.b0,s=t.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,l=this.deps.host?.studioTransport?.bpm(),c=this.jamming?r?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:c,jamming:this.jamming||this.wantJam,bar:i&&!r?Math.floor(i.tick/(N*960))+1:null,nextPass:s,countIn:r&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof l=="number"&&Math.round(l)!==t.song.bpm?Math.round(l):null,notice:this.notice}}replayChanged(){!this.jamming||!this.replay||!this.transport.running||this.replay.rewind(Math.ceil(this.beatNow()+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const a=this.session.song;t.bars!==void 0&&!this.session.passes.length&&!this.jamming&&!this.wantJam&&(a.bars=Math.max(1,Math.min(fe(a.bpm),Math.round(t.bars)))),t.countInBars!==void 0&&(a.countInBars=t.countInBars),t.quantize===null||t.quantize?.grid==="off"?delete a.quantize:t.quantize&&(a.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(),this.changed()}pass(t){return this.session.passes.find(a=>a.id===t)}editPass(t,a){const o=this.pass(t);if(o){if(a.name!==void 0){const i=a.name.replace(/\s+/g," ").trim().slice(0,je);o.name=i||`Pass ${o.n}`}a.kept!==void 0&&(o.kept=a.kept),a.mute!==void 0&&(o.mute=a.mute),a.solo!==void 0&&(o.solo=a.solo),a.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,a.volume))),a.quantize===null?delete o.quantize:a.quantize&&(o.quantize={...a.quantize}),(a.mute!==void 0||a.solo!==void 0||a.volume!==void 0||a.quantize!==void 0)&&this.replayChanged(),this.changed()}}deletePass(t){const a=this.session.passes.findIndex(o=>o.id===t);a<0||(this.session.passes.splice(a,1),this.notice="",this.replayChanged(),this.changed())}clearUnkept(){const t=this.session.passes.length,a=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...a),this.replayChanged(),this.changed(),t-a.length}newSong(){this.jamming&&this.stop();const t=fo(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.notice="",this.changed(),t}get passCount(){return this.session.passes.length}get maxPasses(){return G}dispose(){for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const Ws="netcomposer-looper",ce="sessions",Xs="netcomposer.looper.current.v1",Qs=500;function Js(e){return new Promise((t,a)=>{const o=e.open(Ws,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(ce)||o.result.createObjectStore(ce,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>a(o.error)})}function Zs(e){return new Promise((t,a)=>{e.oncomplete=()=>t(),e.onerror=()=>a(e.error),e.onabort=()=>a(e.error)})}function el(e={}){const t=e.idb===void 0?Qn(()=>globalThis.indexedDB):e.idb,a=e.local===void 0?Qn(()=>globalThis.localStorage):e.local,o=e.currentKey??Xs;let i=null;const r=()=>t?(i??=Js(t),i):Promise.reject(new Error("no IndexedDB"));let s=null,l=null,c=Promise.resolve(),d=0;const p=g=>{const h=structuredClone(g);c=c.then(async()=>{const w=(await r()).transaction(ce,"readwrite");w.objectStore(ce).put(h),await Zs(w);try{a?.setItem(o,h.id)}catch{}}).catch(()=>{d++})},u=()=>{l&&clearTimeout(l),l=null;const g=s;s=null,g&&p(g)};return{async load(){let g=null;try{g=a?.getItem(o)??null}catch{g=null}if(!g||!t)return null;try{const w=(await r()).transaction(ce,"readonly").objectStore(ce).get(g),m=await new Promise((y,b)=>{w.onsuccess=()=>y(w.result),w.onerror=()=>b(w.error)});return m===void 0?null:Bs(m)}catch{return null}},save(g,h=!1){if(s=g,h){u();return}l||(l=setTimeout(u,Qs))},async flush(){u(),await c},get failures(){return d}}}function Qn(e){try{return e()??null}catch{return null}}const go=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let re;function tl(){if(re!==void 0)return re;re=null;try{re=go()?.attach("looper",{instance:1})??null}catch{re=null}return re}function nl(){return go()?.countIn??null}function al(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const ol="netcomposer.looper.hidden.v1",il=50;function E(e,t={},...a){const o=document.createElement(e);for(const[i,r]of Object.entries(t))r!==void 0&&o.setAttribute(i,r);for(const i of a)i!==null&&i!==!1&&o.append(i);return o}const _=e=>({[Xe]:co(e)||void 0});function V(e,t,a){const o=E("button",{type:"button",...t},e);return o.addEventListener("click",a),o}function ye(e,t){return E("span",{class:"nc-label",...t?_(t):{}},e)}function Be(e,t,a,o,i,r=!1){const s=E("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of a){const c=V(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});c.disabled=r,s.append(c)}return s}function ke(e,t,a,o,i,r="lp-toggle"){return V(t,{class:r,"aria-pressed":String(a),"data-lp-id":e,..._(o)},i)}function rn(e,...t){const a=document.activeElement,o=a instanceof HTMLElement&&e.contains(a)?a.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function sn(e,t,a){const o=E("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:a(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),r=qs(i(),ol),s=()=>{const l=r.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return s(),{handle:r,mount:o,update(){r.update(i()),s()}}}const R=tl(),nt=el({currentKey:R?.storageKey?.("netcomposer.looper.current.v1")}),se=await nt.load();let bo="",Ht;se&&"session"in se?Ht=se.session:(se&&"error"in se&&(bo=`Your last song didn't open: ${se.error}. A new one is started.`),Ht=fo(R?.studioTransport?.bpm()??120));function rl(){let e=null;try{e=R?.notesSource?.("Looper")??null}catch{e=null}if(!e)return null;const t=e,a=new Set,o=i=>{a.has(i)||(a.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,r){o(i),t.send(r,i)},controls(i,r){o(i),t.sendControls(r,i)},off(i){t.off(i===void 0?"stop":"off",i)},restart(){t.restart()}}}const M=new Ks(Ht,{host:R,countIn:nl(),load:al,now:Do,save:e=>nt.save(e),sink:rl()});M.notice=bo;addEventListener("pagehide",()=>nt.save(M.session,!0));const wo=document.getElementById("app");wo.classList.add("nc","nc-page");Ss();const sl=E("header",{class:"nc-page-hd"},E("div",{},E("h1",{class:"nc-page-title"},E("span",{class:"lp-brand"},"LOOPER")," ",E("span",{class:"nc-page-sep"},"/")," LOOPER ",E("span",{class:"nc-page-sep"},"/")," ",E("span",{class:"nc-mono"},"01")),E("p",{class:"nc-page-sub"},"A NetComposer element.")),E("div",{class:"nc-page-actions"},V("New song",{class:"nc-page-action","data-lp-id":"new-song",..._("new-song")},()=>ll()))),xo=E("div",{class:"nc-stack","data-nc-layout":"adjacent"}),yo=E("footer",{class:"lp-foot lp-sub"},E("span",{class:"lp-notice",role:"status"}),E("span",{class:"lp-mono"},"netcomposer.looper.01"));wo.append(sl,E("main",{class:"nc-page-body"},xo),yo);let qe=!1;function ll(){if(M.passCount&&!qe){qe=!0,M.notice="Press New song again to start a new one. This song stays in this browser.",oe(),setTimeout(()=>{qe=!1},4e3);return}qe=!1,M.newSong(),He=null}const vo=sn("setup","Setup",()=>{const e=M.session.song;return`${e.bpm} BPM · ${e.bars} ${e.bars===1?"bar":"bars"} · ${e.quantize?`Q ${e.quantize.grid}`:"Q off"}`}),W=R?.metronome,$o=ks({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((W?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>W?.set({volume:e/100})});$o.el.setAttribute(Xe,co("volume"));W?.onChange(()=>oe());function dl(e){const t=e.session.song,a=[1,2,4,8,16].filter(i=>i<=fe(t.bpm)),o=t.quantize;rn(vo.mount,E("div",{class:"lp-grid2"},E("div",{class:"lp-field"},ye("Tempo","tempo"),E("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?E("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?E("span",{class:"lp-sub"},"Locked: the song has passes."):E("span",{class:"lp-sub"},"Follows the Studio.")),E("div",{class:"lp-field"},ye("Length","bars"),Be("bars","Bars",a.map(i=>({value:String(i),label:String(i)})),String(t.bars),i=>M.setSong({bars:Number(i)}),e.locked||e.jamming),E("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${Is(t)}`))),E("div",{class:"lp-between"},ke("count-in","Count-in",t.countInBars===1,"count-in",()=>M.setSong({countInBars:t.countInBars?0:1})),W?ke("metronome","Metronome",W.prefs().on,"metronome",()=>W.set({on:!W.prefs().on})):null),W?$o.el:null,E("div",{class:"lp-field"},ye("Quantize","quantize"),Be("quantize","Quantize",on.map(i=>({value:i,label:i==="off"?"Off":i})),o?.grid??"off",i=>M.setSong({quantize:i==="off"?null:{grid:i,strength:o?.strength??1}})),o?E("div",{class:"lp-row"},ye("Strength","strength"),Be("strength","Strength",mo.map(i=>({value:String(i),label:`${Math.round(i*100)}%`})),String(o.strength),i=>M.setSong({quantize:{grid:o.grid,strength:Number(i)}}))):null))}const ko=sn("jam","Jam",()=>{const e=M.view();return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} / ${e.session.song.bars}`:`${M.passCount} / ${G} passes`}),cl="http://www.w3.org/2000/svg",at=(e,t)=>{const a=document.createElementNS(cl,e);for(const[o,i]of Object.entries(t))a.setAttribute(o,i);return a},Se=44,Ot=2*Math.PI*Se,Eo=at("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),Ao=at("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(Se),"stroke-width":"3","stroke-dasharray":`0 ${Ot}`,transform:"rotate(-90 50 50)"}),Re=at("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});Eo.append(at("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(Se),"stroke-width":"1"}),Ao,Re);const So=E("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Mo=E("span",{class:"lp-pass","data-lp-id":"pass"}),pl=E("div",{class:"lp-ring"},Eo,E("div",{class:"lp-ring-mid"},So,Mo));function zo(e){const t=e.lapPos??0;Ao.setAttribute("stroke-dasharray",`${t*Ot} ${Ot}`);const a=t*2*Math.PI;Re.setAttribute("cx",String(50+Se*Math.sin(a))),Re.setAttribute("cy",String(50-Se*Math.cos(a))),Re.style.visibility=e.lapPos===null?"hidden":"visible",So.textContent=e.countIn!==null?String(e.countIn):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const o=e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${G} / ${G}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;Mo.replaceChildren(...e.phase==="recording"?[E("span",{class:"lp-dot","aria-hidden":"true"})]:[],o)}function ul(e){const t=V(e.jamming?"STOP":"JAM",{class:"nc-btn lp-big","data-lp-id":"jam",..._(e.jamming?"stop":"jam"),...e.jamming?{}:{"data-jam":""}},()=>M.toggle());t.disabled=!R;const a=V("UNDO",{class:"nc-btn","data-lp-id":"undo",..._("undo")},()=>M.undo());a.disabled=!e.lapHasNotes&&!M.passCount;const o=V("REDO",{class:"nc-btn","data-lp-id":"redo",..._("redo")},()=>M.redo());o.disabled=!e.canRedo,zo(e),rn(ko.mount,pl,t,E("div",{class:"lp-two"},a,o),R?null:E("p",{class:"lp-sub"},"Open the Looper inside the Studio to jam."))}const Co=sn("passes","Passes",()=>`${M.passCount} / ${G}`);let He=null;const hl={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"};function Jn(e){const[t=e,a]=e.split("#"),o=hl[t]??t.toUpperCase();return a?`${o} ${a}`:o}let ge=null;function ml(e){const t=M.session.song.bars,a=N*M.session.song.ppq,o=[...new Set(e.instruments.map(Jn))].join(" + ")||"Empty",i=He===e.id,r=V("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(i)},()=>{He=i?null:e.id,ge=null,oe()});r.append(E("span",{class:"lp-pass-title"},e.name),E("span",{class:"lp-sub"},e.mute?`Muted · ${o}`:o));const s=E("input",{type:"range",class:"lp-range lp-vol",min:"0",max:"100",step:"1","aria-label":`${e.name} volume`,"data-lp-id":`vol-${e.id}`,..._("pass-volume")});s.value=String(Math.round(e.volume*100)),s.addEventListener("input",()=>M.editPass(e.id,{volume:Number(s.value)/100}));const l=E("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...i?{"data-open":""}:{}},r,ke(`mute-${e.id}`,"M",e.mute,"mute",()=>M.editPass(e.id,{mute:!e.mute}),"nc-btn lp-ms"),ke(`solo-${e.id}`,"S",e.solo,"solo",()=>M.editPass(e.id,{solo:!e.solo}),"nc-btn lp-ms"),s,ke(`keep-${e.id}`,e.kept?"KEPT":"KEEP",e.kept,"keep",()=>M.editPass(e.id,{kept:!e.kept}),"lp-toggle lp-keep"));if(i){const c=new Set;for(const h of e.events)c.add(Math.floor(h.at/a));const d=E("div",{class:"lp-bars",style:`--lp-bars: ${t}`});for(let h=0;h<t;h++)d.append(E("span",c.has(h)?{"data-on":""}:{},String(h+1)));const p=E("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});p.addEventListener("change",()=>M.editPass(e.id,{name:p.value}));const u=e.quantize,g=V(ge===e.id?"Delete it":"Delete",{class:"nc-btn lp-danger","data-lp-id":`delete-${e.id}`,..._("delete")},()=>{if(ge!==e.id){ge=e.id,oe();return}ge=null,He=null,M.deletePass(e.id)});l.append(E("div",{class:"lp-sheet"},p,E("span",{class:"lp-sub"},`${e.events.length} notes · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),E("span",{class:"lp-sub"},`Plays through ${[...new Set(e.instruments.map(Jn))].join(" and ")||"its instrument"}'s current sound.`),d,E("div",{class:"lp-field"},ye("Quantize","pass-quantize"),Be(`pq-${e.id}`,"Pass quantize",[{value:"song",label:"Song"},...on.map(h=>({value:h,label:h==="off"?"Off":h}))],u?.grid??"song",h=>M.editPass(e.id,{quantize:h==="song"?null:{grid:h,strength:u?.strength??1}}))),E("div",{class:"lp-between"},g)))}return l}function fl(e){const t=E("div",{class:"lp-passes"});e.phase==="recording"&&t.append(E("div",{class:"lp-pass-row","data-live":""},E("span",{class:"lp-pass-name"},E("span",{class:"lp-pass-title lp-pass"},E("span",{class:"lp-dot","aria-hidden":"true"}),`Pass ${e.nextPass}`),E("span",{class:"lp-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))));for(const i of[...e.session.passes].reverse())t.append(ml(i));!e.session.passes.length&&e.phase!=="recording"&&t.append(E("p",{class:"lp-sub"},"No passes yet. Press Jam (or Space) and play."));const a=e.session.passes.filter(i=>!i.kept).length,o=V("CLEAR UNKEPT",{class:"lp-toggle","data-lp-id":"clear-unkept",..._("clear-unkept")},()=>M.clearUnkept());o.disabled=!a,rn(Co.mount,t,E("div",{class:"lp-between"},o,E("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${e.session.passes.length} / ${G}`)))}const Lo=[vo,ko,Co];Ns(xo,Lo.map(e=>e.handle),"adjacent");let Zn="";function To(e){const t=e.phase==="count-in"?`Looper · count-in ${e.countIn}`:e.jamming&&e.bar!==null?`Looper · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,a=`${t}|${e.phase}`;if(a!==Zn){Zn=a;try{R?.readout?.(t),R?.chip?.(e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:M.passCount?{text:`${M.passCount} passes`}:null)}catch{}}}function oe(){const e=M.view();dl(e),ul(e),fl(e);for(const a of Lo)a.update();const t=yo.querySelector(".lp-notice");t&&(t.textContent=e.notice),To(e)}M.onChange(oe);setInterval(()=>{M.tick()&&oe(),M.jamming||M.syncTempo()},il);function Fo(){const e=M.view();e.jamming&&(zo(e),To(e)),requestAnimationFrame(Fo)}requestAnimationFrame(Fo);oe();window.__looper={looper:M,store:nt,view:()=>M.view(),get hosted(){return!!R}};
