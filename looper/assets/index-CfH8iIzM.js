(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Di(){return(performance.timeOrigin+performance.now())/1e3}var Pi="nc-ui",Ii={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Sn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},bt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ji={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},be={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Bi={light:{color:Ii.color,semantic:Sn,component:bt,runtime:ji},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Ve=e=>`--${Pi}-${e}`,Jt=Sn["label-on-fill-dark"],Xn=Sn["label-on-fill-light"],Ri=be["label-min-contrast"],Hi=/^#[0-9a-f]{6}$/i,Oi=e=>typeof e=="string"&&Hi.test(e),ut=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Jn(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=s=>{let r=(s+e/30)%12;return n-o*Math.max(-1,Math.min(r-3,9-r,1))};return`#${ut(i(0)*255)}${ut(i(8)*255)}${ut(i(4)*255)}`}function Wa(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),s=Math.min(t,n,o),r=(i+s)/2,l=i-s;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((i===t?60*((n-o)/l%6):i===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function Qn(e){let[t,n,o]=[1,3,5].map(i=>{let s=parseInt(e.slice(i,i+2),16)/255;return s<=.03928?s/12.92:((s+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function Qt(e,t){let[n,o]=[Qn(e),Qn(t)].sort((i,s)=>s-i);return(n+.05)/(o+.05)}var wt=e=>Qt(e,Jt)>=Qt(e,Xn)?Jt:Xn;function Ka(e,t,n,o=Ri){let i=Jn(e,t,n),s=wt(i)===Jt?1:-1;for(let r=0;r<40&&Qt(i,wt(i))<o;r++)n+=s*.01,i=Jn(e,t,n);return i}function _i(e){let{h:t,s:n}=Wa(e),o=Ka(t,Math.min(n,be["surprise-on-max-saturation"]),be["surprise-on-lightness"]);return{fill:e,ink:wt(e),on:o,onInk:wt(o)}}var Vi=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Ui(e,t=Math.random){let[n,o]=be["surprise-saturation"],[i,s]=be["surprise-lightness"],r=be["surprise-min-hue-gap"],l=Oi(e)?Wa(e).h:null,c=t()*360;return l!==null&&Vi(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),Ka(c,n+t()*(o-n),i+t()*(s-i))}function Gi(e){if(!e)return null;let t=_i(e);return{[Ve("surprise-fill")]:t.fill,[Ve("surprise-ink")]:t.ink,[Ve("surprise-on")]:t.on,[Ve("surprise-on-ink")]:t.onInk}}var Yi=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Wi=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Zn(e){let[t,n,o]=[1,3,5].map(l=>Yi(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),s=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*s-.0040720468*r,1.9779984951*i-2.428592205*s+.4505937099*r,.0259040371*i+.7827717662*s-.808675766*r]}function Ki([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,s=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*s,-1.2684380046*o+2.6097574011*i-.3413193965*s,-.0041960863*o-.7034186147*i+1.707614701*s].map(r=>ut(Wi(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var Xi=be["velocity-range"],Xa={min:bt.rhythm["velocity-min"],max:bt.rhythm["velocity-max"]},ea=Object.fromEntries(Object.entries(Bi).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ji(e,t=Xa){let[n,o]=Xi,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,s=(i-n)/(o-n),r=t.ink??bt.rhythm["step-cell-ink"];if(s<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:r};if(s>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:r};let l=Zn(t.min),c=Zn(t.max);return{velocity:i,t:s,fill:Ki(l.map((d,p)=>d+(c[p]-d)*s)),ink:r}}function ta(e,t=Xa){return{[Ve("velocity-fill")]:Ji(e,t).fill}}var Ja="data-nc-theme",na="nc-ui-theme-change",Qi="(prefers-color-scheme: dark)",Qa=e=>e?.documentElement??null,Za=e=>e?.defaultView?.matchMedia?.(Qi)??null,Zi=e=>e==="light"||e==="dark"?e:"system";function es(e=globalThis.document){return Zi(Qa(e)?.getAttribute(Ja))}function Zt(e=globalThis.document){let t=es(e);return t!=="system"?t:Za(e)?.matches?"dark":"light"}function eo(e,t=globalThis.document){let n=Qa(t);if(!n)return()=>{};let o=Zt(t),i=()=>{let c=Zt(t);c!==o&&(o=c,e(c))},s=t.defaultView?.MutationObserver,r=s?new s(i):null;r?.observe(n,{attributes:!0,attributeFilter:[Ja]});let l=Za(t);return l?.addEventListener?.("change",i),t.addEventListener(na,i),()=>{r?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(na,i)}}var ts={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ns={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},as={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},os={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Ct={};for(let[e,t]of Object.entries(ns))Ct[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(os))Ct[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(as))Ct[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(ts.renames.map(e=>[e.old,e.new]));function to(e){let t=Ct[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function B(e){return to(e).prop}function a(e){return`var(${B(e)})`}function is(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(B(t)));return Number.isFinite(n)?n:0}function O(e,t){let n=to(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let s=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=s:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=s:i.style.color=s,(e instanceof Element?e:o.documentElement).append(i);let r=(o.defaultView??window).getComputedStyle(i),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return i.remove(),l}function no(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function ss(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var rs="[data-modulated], [data-modulated] *";function Pt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function aa(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ls(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${B("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${B("divider")}: ${a(`module-div-stack-${o}`)};
      ${B("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${B("text-sub")}: ${a("module-sub-stack-1")};
      ${B("divider")}: ${a("module-div-stack-1")};
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
${rs} { transition: none; }
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
  ${B("text-sub")}: ${a("module-sub-stack-1")};
  ${B("divider")}: ${a("module-div-stack-1")};
  ${B("slider-track")}: ${a("module-div-stack-1")};
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
  ${B("text-sub")}: ${a("module-sub-stack-1")};
  ${B("divider")}: ${a("module-div-stack-1")};
  ${B("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${B("text-sub")}: ${a("module-sub-stack-1")};
  ${B("divider")}: ${a("module-div-stack-1")};
  ${B("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${B("text-sub")}: inherit;
  ${B("divider")}: inherit;
  ${B("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${B("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${B("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${B("divider")}: ${a("strip-divider")}; }
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
${aa("")}
}
@media (max-width: 1023px) {
${aa("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Pt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Pt("")}
}
@media (max-width: 1023px) {
${Pt("html[data-nc-landscape] ")}
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
`}var It=null,cs="nc-ui-fallback";function ao(e=globalThis.document){if(!e?.documentElement||(e.documentElement,It&&It.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${cs} {
${ls()}
}
`,e.head.append(t),It=t}var ds=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,ps=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=ds,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ps(document);function oo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let s=t.createElement("span");s.dataset.ncOff="",s.textContent=e.offText??"Off",o.append(i,s),n.append(o);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var io=new WeakMap,oa=.25;function us(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let s=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(s)),n.setAttribute("aria-valuenow",String(Math.round(s*1e3)/1e3))},h=u=>{let m=d(u);m!==s&&(s=m,p(),l?.(m))},w=0,g=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();u.target!==i&&m.height>0&&h(1-(u.clientY-m.top)/m.height),w=u.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!g)return;let m=n.getBoundingClientRect().height||1,y=(w-u.clientY)/m*(u.shiftKey?oa:1);w=u.clientY,h(s+y)});let x=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",x),n.addEventListener("pointercancel",x),n.addEventListener("lostpointercapture",x),n.addEventListener("dblclick",u=>{u.preventDefault(),c?.()}),n.addEventListener("keydown",u=>{let m=u.shiftKey?r*oa:r,y={ArrowUp:s+m,ArrowRight:s+m,ArrowDown:s-m,ArrowLeft:s-m,PageUp:s+r*10,PageDown:s-r*10,Home:0,End:1};u.key in y&&(u.preventDefault(),h(y[u.key]))});let b={el:n,get value(){return s},get dragging(){return g},set(u){g||(s=d(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(r=u.step),u.onChange&&(l=u.onChange),u.onReset&&(c=u.onReset)}};return b.setLabel(e.label),b.set(e.value??0),b.setText(e.valueText),io.set(n,b),b}function hs(e){return io.get(e)}var so=new WeakMap,ms=.2,fs=1.5,gs=.5;function bs(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function ia(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:bs(o.getComputedStyle(e).getPropertyValue(B(t)),n)}function ws(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let s=t.createElement("div");s.className="nc-meter-bars",s.setAttribute("aria-hidden","true");let r=[];for(let b=0;b<n;b++){let u=t.createElement("span");u.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let f=t.createElement("span");f.className="nc-meter-hold",u.append(m,y,f),s.append(u),r.push({peak:m,rms:y,hold:f,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,s);let l=e.label,c=e.onClear,d=!1,p=-1,h=-1,w=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},g=(b,u,m,y)=>{let f=Math.round(y*1e3)/1e3;m[u]!==f&&(m[u]=f,b.style.transform=u==="hold"?`translateY(${Math.round((1-f)*1e3)/10}%)`:`scaleY(${f})`)};i.addEventListener("click",()=>{x.clear(),c?.()});let x={el:o,get clipped(){return d},update(b,u){p<0&&(p=ia(o,"motion-meter-fall",ms)),h<0&&(h=ia(o,"motion-meter-hold",fs));let m=Math.max(0,Math.min(.25,Number(u)||0)),y=p>0?Math.exp(-m/p):0;r.forEach((f,k)=>{let L=b[k]??b[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(L.peak)||0)),v=Math.min(E,Math.max(0,Number(L.rms)||0));L.over&&x.clip(),f.level.peak=E>=f.level.peak?E:E+(f.level.peak-E)*y,f.level.rms=v>=f.level.rms?v:v+(f.level.rms-v)*y,f.holdAge+=m,E>=f.holdAt?(f.holdAt=E,f.holdAge=0):f.holdAge>h&&(f.holdAt=Math.max(E,f.holdAt-gs*m)),g(f.peak,"peak",f.shown,f.level.peak),g(f.rms,"rms",f.shown,f.level.rms),g(f.hold,"hold",f.shown,f.holdAt),f.hold.dataset.off=f.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,w())},clear(){d=!1,w()},reset(){for(let b of r)b.level.peak=0,b.level.rms=0,b.holdAt=0,b.holdAge=0,g(b.peak,"peak",b.shown,0),g(b.rms,"rms",b.shown,0),g(b.hold,"hold",b.shown,0),b.hold.dataset.off="true"},setLabel(b){l=b,w()},configure(b){b.onClear&&(c=b.onClear)}};return w(),x.reset(),so.set(o,x),x}function xs(e){return e?so.get(e):void 0}var ys=3,vs=new Set(["freq","q","rate","time","log"]);function Mn(e,t,n){return!e||!vs.has(e)||!(n>t)?"linear":t>0?"log":"power"}function nt(e,t,n){return Mn(e,t,n)!=="linear"}function xt(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let s=Math.min(n,Math.max(t,i)),r=Mn(e,t,n);if(r==="log")return Math.log(s/t)/Math.log(n/t);let l=(s-t)/(n-t);return r==="power"?Math.cbrt(l):l}function ro(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),s=Mn(e,t,n);return s==="log"?t*(n/t)**i:t+(n-t)*(s==="power"?i**ys:i)}function lo(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let s=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(s)),i=Math.min(n,Math.max(t,i))}return i}function Je(e,t,n,o){return Math.round(xt(e,t,n,o)*1e3)}function yt(e,t,n,o,i){return lo(ro(e,t,n,Number(o)/1e3),t,n,i)}function $s(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,s=null;return t==="ArrowRight"||t==="ArrowUp"?s=o+i:t==="ArrowLeft"||t==="ArrowDown"?s=o-i:t==="PageUp"?s=o+1e3/10:t==="PageDown"?s=o-1e3/10:t==="Home"?s=0:t==="End"&&(s=1e3),s===null?null:Math.min(1e3,Math.max(0,Math.round(s)))}function Tn(e,t,n,o,i,s=!1,r){let l=Je(e,t,n,o),c=$s(l,i,s);if(c===null)return null;let d=yt(e,t,n,c,r),p=Math.sign(c-l),h=lo(Number(o),t,n,r);for(;p!==0&&d===h&&c>0&&c<1e3;)c+=p,d=yt(e,t,n,c,r);return d}function sa(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function ks(e,t,n,o=n/6){let i=e.some(p=>p===null),s=Math.max(0,n-(i?o:0)),r=e.reduce((p,h,w)=>h===null?p:p+sa(t[w]),0),l=r>0?s/r:0,c=e.map(p=>p===null?0:Math.min(s,sa(p)*l));if(i){let p=c.reduce((w,g)=>w+g,0),h=e.indexOf(null);c[h]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=n),d}function Es(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),s=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function ue(e){return Math.max(0,Math.min(1,e))}function co(e,t){let{ctx:n,w:o,h:i}=Es(e);if(!n)return;n.clearRect(0,0,o,i);let s=ss(e);if(t.paint==="swatch"){let c=O(e,"accent"),d=O(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Ms(n,o,i,t,e,s);return}if(t.paint==="filter"){let c=t.mode??"lp",d=O(e,no(c)),p=O(e,"divider"),h=ue(t.cutoff??.5),w=.08+(1-ue(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=o;g++){let x=g/Math.max(1,o),b=0;c==="lp"?b=x<h?1:Math.max(0,1-(x-h)/w):c==="hp"?b=x>h?1:Math.max(0,1-(h-x)/w):b=Math.max(0,1-Math.abs(x-h)/w);let u=i*.78-b*i*.62;g===0?n.moveTo(g,u):n.lineTo(g,u)}n.strokeStyle=d,n.stroke(),n.fillStyle=O(e,"text-sub"),n.font=s,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=O(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,h,w]=ks([c,d],t.max??[1,4],o),g=2,x=i-1;n.beginPath(),n.moveTo(p,x),n.lineTo(h,g);let b=Math.max(1,Math.ceil(w-h));for(let u=1;u<=b;u++){let m=u/b;n.lineTo(h+(w-h)*m,x-(x-g)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(w,x),n.lineTo(o,x),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],h=O(e,"accent"),w=O(e,"text-sub"),g=i/2;n.fillStyle=O(e,"accent-soft"),n.fillRect(ue(d)*o,0,(ue(p)-ue(d))*o,i),n.strokeStyle=O(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(o,g),n.stroke();let x=Math.floor(c.length/2);for(let b=0;b<x;b++){let u=(b+.5)/x*o,m=Math.max(-1,Math.min(1,c[b*2]??0)),y=Math.max(-1,Math.min(1,c[b*2+1]??0)),f=(b+.5)/x;n.strokeStyle=f>=d&&f<=p?h:w,n.beginPath(),n.moveTo(u,g-y*(g-1)),n.lineTo(u,g-m*(g-1)+.5),n.stroke()}n.strokeStyle=h;for(let b of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let u=Math.round(ue(b)*(o-1))+.5;n.beginPath(),n.moveTo(u,0),n.lineTo(u,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=O(e,"text"),n.fillRect(Math.round(ue(t.position)*(o-1)),0,1,i)),x||(n.fillStyle=w,n.font=s,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=ue(t.level??0);n.fillStyle=O(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=O(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=O(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=O(e,"rhythm.playhead"),n.fillRect(l/r*o,i*.3,Math.max(1,o/r),i*.4),e.dataset.ncAccent=O(e,"accent")}var We=20,en=2e4,jt=24,ra=-60;function As(e,t,n,o,i=48e3){let s=2*Math.PI*Math.min(t,i*.49)/i,r=Math.cos(s),l=Math.sin(s)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let h=1+l,w=-2*r,g=1-l,x=2*Math.PI*o/i,b=(f,k,L)=>f+k*Math.cos(x)+L*Math.cos(2*x),u=(f,k)=>-(f*Math.sin(x)+k*Math.sin(2*x)),m=Math.hypot(b(c,d,p),u(d,p)),y=Math.hypot(b(h,w,g),u(w,g));return y>0?m/y:0}function Ss(e,t){return Math.log(Math.max(We,Math.min(en,e))/We)/Math.log(en/We)*t}function la(e,t,n){let o=Math.max(ra,Math.min(jt,e));return t+(jt-o)/(jt-ra)*(n-t)}function Ms(e,t,n,o,i,s){let r=o.mode??"lp",l=O(i,no(r)),c=O(i,"divider"),d=O(i,"text-sub"),p=Number.parseFloat(String(s).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,w=Math.max(h+4,n-p-3),g=o.q??Math.SQRT1_2,x=Math.round(la(0,h,w))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,x),e.lineTo(t,x),e.stroke(),e.beginPath();for(let b=0;b<=t;b++){let u=We*(en/We)**(b/Math.max(1,t)),m=o.open?1:As(r,o.hz,g,u,o.sampleRate),y=la(20*Math.log10(Math.max(1e-5,m)),h,w);b===0?e.moveTo(b,y):e.lineTo(b,y)}if(e.strokeStyle=l,e.stroke(),!o.open){let b=Math.round(Ss(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(b,h),e.lineTo(b,w),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=s,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function oe(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function Ts(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Se=20,at=2e4,Ln=Math.log(at/Se),tn=32,Ls=250,Cs=-100,zs=1200,Fs=4.5,ca=-6,ke=-96,Ns=48,da=[100,1e3,1e4],qs=[6,12];function Ne(e,t){return Math.log(Math.max(Se,Math.min(at,e))/Se)/Ln*t}function ht(e,t){return Se*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Ln)}function we(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function nn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var po=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Ds(e,t,n,o){let i=n?3:1,s=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),r=c=>({hz:Math.max(e.minHz??Se,Math.min(e.maxHz??at,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return s(1);case"ArrowDown":return s(-1);case"ArrowRight":return e.moveHz?r(1):s(1);case"ArrowLeft":return e.moveHz?r(-1):s(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Cn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Ps(e,t,n,o,i,s,r,l,c){let d=c?.25:1,p={},h=Math.max(1,s/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-o*d/h*r/Cn(e))),e.moveHz){let w=t.hz*Math.exp(n*d/Math.max(1,i)*Ln);p.hz=Math.max(e.minHz??Se,Math.min(e.maxHz??at,w))}return p}function Is(e,t,n,o,i){let s=Math.max(0,n.left)+1,r=Math.min(n.right,i)-1,l=Math.min(t.width*3+o*2,r-s),c=Math.max(s,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var _=new WeakMap;function js(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let s=document.createElement("canvas");s.className="nc-eq-curve",s.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,o.append(i,s);for(let c of e.bands)o.append(Bs(n,c,t));o.append(r),o.addEventListener("click",c=>{if(!bo(n)||c.button>0)return;let d=go(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),_.set(n,{control:e,cache:null,spec:null,active:null}),ho(n,e),n}function uo(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Bs(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},s=()=>i()?.bands.find(d=>d.id===t.id)??null,r=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=s();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",he(e,t.id))}),o.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=i(),h=s(),w=_.get(e);if(!p||!h||!w?.box)return;let{w:g,h:x,pad:b}=w.box;p.onBand(h.id,Ps(h,r.start,d.clientX-r.x,d.clientY-r.y,g,x,p.range??18,b,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&he(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=i(),h=s();if(!p||!h)return;let w=Ds(h,d.key,d.shiftKey,p.range??18);w&&(d.preventDefault(),w==="reset"?p.onReset?.(h.id):p.onBand(h.id,w),he(e,h.id))});let c=null;return o.addEventListener("wheel",d=>{let p=i(),h=s();if(!p||!h?.moveQ)return;d.preventDefault();let w=d.timeStamp;(!c||w-c.t>400)&&(c={q:h.q,t:w});let g=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-g/240))),c.t=w,p.onBand(h.id,{q:c.q}),he(e,h.id)},{passive:!1}),o.addEventListener("pointerenter",()=>he(e,t.id)),o.addEventListener("focus",()=>he(e,t.id)),o.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==o&&he(e,null)}),o.addEventListener("blur",()=>{r||he(e,null)}),o}function he(e,t){let n=_.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Pe(e):zn(e)}function zn(e){let t=_.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(x=>x.id===t.active):null;for(let x of e.querySelectorAll(".nc-eq-node"))x instanceof HTMLElement&&(o&&x.dataset.band===o.id?x.dataset.active="true":delete x.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,po(o.db)];o.kind==="peak"?i.push(nn(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${nn(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Rs(t.control,o)),n.hidden=!1;let{w:s,h:r,pad:l}=t.box,c=Ne(o.hz,s),d=we(o.db*Cn(o),r,t.control.range??18,l),p=n.offsetWidth,h=n.offsetHeight,w=Math.max(0,Math.min(s-p,c-p/2)),g=d-h-l*1.5>=0?d-h-l*1.5:Math.min(r-h,d+l*1.5);n.style.left=`${Math.round(w)}px`,n.style.top=`${Math.round(g)}px`}function Rs(e,t){return e.bands.indexOf(t)%3+1}function ho(e,t){let n=_.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Fn(e);let o=t.range??18;t.bands.forEach((i,s)=>{let r=uo(e,i.id);r instanceof HTMLElement&&(r.dataset.tone=String(s%3+1),r.dataset.kind=i.kind,r.setAttribute("aria-label",`${i.label} band`),r.setAttribute("aria-valuemin",String(-o)),r.setAttribute("aria-valuemax",String(o)),r.setAttribute("aria-valuenow",String(i.db)),r.setAttribute("aria-valuetext",i.valueText??`${po(i.db)}, ${nn(i.hz)}`),r.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?r.setAttribute("data-nc-help",i.help):r.removeAttribute("data-nc-help"))}),Pe(e),Gs(e)}function mo(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),s=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function fo(e){return{curve:oe(e,"eq-curve"),fill:oe(e,"eq-fill"),quiet:oe(e,"text-sub"),grid:oe(e,"eq-grid"),zero:oe(e,"divider"),label:oe(e,"text-sub"),spectrum:oe(e,"eq-spectrum"),bands:[oe(e,"eq-band-1"),oe(e,"eq-band-2"),oe(e,"eq-band-3")]}}function Hs(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Pe(e){_.has(e)&&Fn(e);let t=_.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:s,h:r}=mo(n);if(!i)return;let l=Math.max(8,Math.round(r*.06)),c=o.range??18;t.box={w:s,h:r,pad:l},t.colours=fo(e);let d=t.colours,p=Hs(o,s);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(s)+1),L=new Float64Array(k);for(let v=0;v<k;v++)L[v]=ht(v/(k-1)*s,s);let E=null;try{E=typeof o.response=="function"?o.response(L):null}catch{E=null}t.cache={key:p,freqs:L,total:E?.total??new Float64Array(k),bands:E?.bands??[]}}i.clearRect(0,0,s,r);let h=Ts(e),w=o.on!==!1;Os(i,s,r,c,l,d,h);let{freqs:g,total:x,bands:b}=t.cache,u=Array.from(g,k=>Ne(k,s)),m=we(0,r,c,l);b.forEach((k,L)=>{if(!k||!k.some(T=>Math.abs(T)>.05))return;let E=w?d.bands[L%3]:d.quiet,v=Array.from(k,T=>we(T,r,c,l));i.save(),t.active&&o.bands[L]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=E,pa(i,u,v,m)),i.globalAlpha=w?.75:.4,i.strokeStyle=E,i.lineWidth=.75,Bt(i,u,v),i.restore()});let y=Array.from(x,k=>we(k,r,c,l)),f=w?d.curve:d.quiet;i.save(),i.fillStyle=w?d.fill:d.quiet,i.globalAlpha=w?.2:.08,pa(i,u,y,m),i.restore(),i.save(),i.strokeStyle=w?d.fill:f,i.lineJoin="round",i.lineCap="round",w&&(i.globalAlpha=.16,i.lineWidth=4,Bt(i,u,y)),i.globalAlpha=1,i.strokeStyle=f,i.lineWidth=1.25,Bt(i,u,y),i.restore(),_s(e),zn(e)}function Os(e,t,n,o,i,s,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<Se||p>at)continue;let h=Math.round(Ne(p,t))+.5;e.globalAlpha=da.includes(p)?.9:.35,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of qs)if(!(c>o))for(let d of[1,-1]){let p=Math.round(we(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=s.zero;let l=Math.round(we(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=s.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of da){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,h=Ne(c,t)+3;e.fillText(d,h+p+2>t?Ne(c,t)-p-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=we(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function vt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,s=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,s)}e.lineTo(t[t.length-1],n[n.length-1])}function Bt(e,t,n){e.beginPath(),vt(e,t,n),e.stroke()}function pa(e,t,n,o){e.beginPath(),vt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function go(e){return e.closest("[data-nc-maxable]")}function bo(e){let t=go(e);return!!t&&!t.hasAttribute("data-nc-max")}function Fn(e){let t=bo(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=_.get(e);n?.active&&(n.active=null,zn(e))}return t}function _s(e){Fn(e);let t=_.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,s=t.control.range??18;for(let r of t.control.bands){let l=uo(e,r.id);l instanceof HTMLElement&&(l.style.left=`${Ne(r.hz,n).toFixed(1)}px`,l.style.top=`${we(r.db*Cn(r),o,s,i).toFixed(1)}px`)}}function Vs(e,t,n,o){let i=o/2/n,s=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,h=ht(d,t),w=ht(p,t),g=ht(c/(e-1)*t,t);s[c]=Math.min(n-1,h/i),r[c]=Math.min(n-1,w/i),l[c]=Fs*Math.log2(g/1e3)}return{lo:s,hi:r,tilt:l}}function Us(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let r=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*r}let s=-1/0;for(let r=o;r<=i&&r<e.length;r++)e[r]>s&&(s=e[r]);return s}function Gs(e){let t=_.get(e);if(t){if(!t.control.spectrum){xo(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=_.get(e)?.spec;i&&(i.visible=o.some(s=>s.isIntersecting),an(e))}),t.spec.io.observe(e)):t.spec.visible=!0}an(e)}}function an(e){let t=_.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){wo(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=on(e),n.onVis||(n.onVis=()=>an(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&sn(e,!1)}function on(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function sn(e,t){let n=_.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,Rt(e,on(e))),Ls):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,Rt(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,Rt(e,on(e))),tn))}function wo(e){let t=_.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function xo(e){let t=_.get(e)?.spec;if(!t)return;wo(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=_.get(e);n&&(n.spec=null)}function Rt(e,t){let n=_.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){xo(e);return}if(!o.analyser)return;if(t-o.last<tn-4&&!o.idle){sn(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):tn/1e3;o.last=t;let s=e.querySelector(".nc-eq-spectrum");if(!(s instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=mo(s);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...Vs(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let h=-1/0,w=Ns*i,{lo:g,hi:x,tilt:b}=o.map;for(let m=0;m<d;m++){let y=Us(o.buf,g[m],x[m]);y>h&&(h=y);let f=y+b[m],k=o.disp[m]-w;o.disp[m]=f>k?f:k}h>Cs&&(o.loud=t);let u=t-o.loud>zs;r.clearRect(0,0,l,c),(!u||o.disp.some(m=>m>ke))&&Ys(r,l,c,o.disp,n.colours??fo(e)),o.idle=u&&!o.disp.some(m=>m>ke),sn(e,o.idle)}function Ys(e,t,n,o,i){let s=o.length,r=new Array(s),l=new Array(s),c=d=>{let p=o[Math.max(0,Math.min(s-1,d))];return Number.isFinite(p)?p:ke};for(let d=0;d<s;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(ke,Math.min(ca,Number.isFinite(p)?p:ke))-ke)/(ca-ke);r[d]=d/(s-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),vt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),vt(e,r,l),e.stroke(),e.restore()}var ee=new WeakMap,Ws=450,Ks=6,Xs=33,Ht=24,Js="http://www.w3.org/2000/svg";function Qs(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Zs(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function er(e,t,n,o,i){let s=e.slice();if(t===o)return s[o]=i,s;let r=t<o?1:-1;for(let l=t;l!==o+r;l+=r){let c=(l-t)/(o-t);s[l]=Math.round((n+(i-n)*c)*100)/100}return s}function tr(e,t){let n=e.steps[t],o=(e.shapes??[]).find(s=>s.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function Ee(e,t){let n=document.createElementNS(Js,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function yo(e){let t=Ee("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Ee("path",{d:e})),t}function nr(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let s=document.createElement("div");s.className="nc-lsteps-shapes",s.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(o,i,s,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ee.set(n,c),or(n,o),ir(n,r),vo(n,e),n}function ne(e){let t=ee.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function ar(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function Ot(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=ar(e);return{i:Zs(t.clientX,o),level:Qs(t.clientY-n.top,n.height)}}function or(e,t){let n=ee.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",s=>{let r=ne(e);if(!r||s.button>0||!r.steps.length)return;s.preventDefault(),$t(e),t.setPointerCapture?.(s.pointerId);let l=Ot(t,s),c=r.steps.map(d=>d.level);n.drag={id:s.pointerId,x:s.clientX,y:s.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,ua(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,ne(e)?.onLevels(d.start.slice(),!0),_t(e,d.i))},Ws)}),t.addEventListener("pointermove",s=>{let r=n.drag;if(!r||r.id!==s.pointerId||r.long||!r.moved&&Math.hypot(s.clientX-r.x,s.clientY-r.y)<Ks)return;r.moved=!0,o();let l=Ot(t,s);ua(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let i=s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(s.pointerId),r.long||ne(e)?.onLevels(r.levels.slice(),!0),rn(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,r.long||ne(e)?.onLevels(r.start.slice(),!0),rn(e,-1))}),t.addEventListener("contextmenu",s=>{ne(e)?.onShape&&(s.preventDefault(),_t(e,Ot(t,s).i))}),t.addEventListener("keydown",s=>{let r=ne(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=h=>{let w=r.steps.map(g=>g.level);w[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,r.onLevels(w,!0)};switch(s.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(s.shiftKey?.01:.05));break;case"ArrowDown":p(d-(s.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;_t(e,c);break;default:return}s.preventDefault(),ln(e)}),t.addEventListener("focus",()=>ln(e)),t.addEventListener("blur",()=>{for(let s of t.querySelectorAll("[data-focus]"))s.removeAttribute("data-focus")})}function ua(e,t,n,o,i,s){let r=ee.get(e).drag;r&&(r.levels=er(r.levels,t,n,o,i),rn(e,o,r.levels[o]),ne(e)?.onLevels(r.levels.slice(),s))}function rn(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function ln(e){let t=ee.get(e),n=e.querySelector(".nc-lsteps-plot"),o=ne(e);if(!n||!o)return;for(let s of n.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===t.focus?s.dataset.focus="true":s.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",tr(o,i))}function ir(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),$t(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),ee.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&$t(e)}}function _t(e,t){let n=ne(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let s=ee.get(e);s.focus=t,o.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,o.append(r);for(let g of n.shapes??[]){let x=document.createElement("button");x.type="button",x.setAttribute("role","menuitemradio"),x.setAttribute("aria-checked",n.steps[t]?.shape===g.value?"true":"false"),g.icon&&x.append(yo(g.icon)),x.append(document.createTextNode(g.label)),x.addEventListener("click",()=>{ne(e)?.onShape?.(t,g.value),$t(e,!0)}),o.append(x)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",s.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,w=Math.max(0,Math.min(c.width-p,h-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(w)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function $t(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ee.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function sr(e,t){let n=ee.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let s=0;s<t;s++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(s),s%4===0&&s>0&&(r.dataset.beat="true");let l=Ee("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Ee("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Ee("path",{class:"nc-lsteps-env",d:""}),Ee("path",{class:"nc-lsteps-top",d:""}),Ee("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),o.append(r);let c=document.createElement("span");s%4===0&&(c.textContent=String(s+1)),s%4===0&&s>0&&(c.dataset.beat="true"),i.append(c)}}}function vo(e,t){let n=ee.get(e);if(!n)return;n.control=t;let o=t.steps.length;sr(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let s=Math.max(.5,Math.min(.75,t.swing??.5)),r=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((g,x)=>{let b=r[x];if(!b)return;let u=String((x%2?1-s:s)*2);b.style.setProperty("--nc-lsteps-grow",u),l[x]?.style.setProperty("--nc-lsteps-grow",u),t.played!==void 0&&x>=t.played?b.dataset.out="true":b.removeAttribute("data-out"),b.dataset.zero=g.level<=0?"true":"false";let m=Math.max(0,Math.min(1,g.level)),y=b.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-m*100)),y.setAttribute("height",String(m*100));let f=t.curve?t.curve(x,Ht):null,k="M0 100",L="";for(let E=0;E<=Ht;E++){let v=f?Math.max(0,Math.min(1,f[E]??m)):m,T=E/Ht*100,$=100-v*100;k+=` L${T.toFixed(2)} ${$.toFixed(2)}`,L+=`${E?" L":"M"}${T.toFixed(2)} ${$.toFixed(2)}`}b.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),b.querySelector(".nc-lsteps-top").setAttribute("d",L)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(g=>`${g.value}:${g.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let g of t.shapes??[]){let x=document.createElement("button");x.type="button",x.className="nc-lsteps-shape",x.setAttribute("role","tab"),x.dataset.shape=String(g.value),g.icon&&x.append(yo(g.icon)),x.append(document.createTextNode(g.label)),x.addEventListener("click",()=>ne(e)?.onShapeAll?.(g.value)),c.append(x)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,h=t.steps[0]?.shape,w=t.steps.slice(0,p).every(g=>g.shape===h);for(let g of c.querySelectorAll(".nc-lsteps-shape")){let x=w&&g.dataset.shape===String(h);g.setAttribute("aria-selected",x?"true":"false"),g.tabIndex=x||!w&&g===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),ln(e),n.last=-2,rr(e)}function rr(e){let t=ee.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Vt(e,null);return}let o=0,i=s=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Vt(e,null);return}s-o>=Xs&&(o=s,Vt(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function Vt(e,t){let n=ee.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let s of e.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===o?(s.dataset.playhead="true",s.dataset.locked=i?"true":"false"):(s.removeAttribute("data-playhead"),s.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var lr=.8912509381337456,cn=32,cr=250,dr=1200,pr=.2,$o=1.5;function ur(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function hr(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var kt=new WeakMap,ha=new WeakMap;function ma(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),s=Number.parseFloat(i);return Number.isFinite(s)?i.endsWith("ms")?s/1e3:s:n}function mr(e){let t=ha.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let s of i){let r=kt.get(s.target);r&&(r.seen.set(s.target,s.isIntersecting),Ke(r))}Fe(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Ke(i);Fe(t)}),ha.set(e,t),t}var ko=e=>e.els.some(t=>t.isConnected);function fr(e){if(!e.loop.io)return ko(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Ke(e){let t=!e.dead&&!!e.source&&fr(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Nn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),un(e))}function Nn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Fe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Eo(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Nn(e)),!e.raf&&!e.timer&&dn(e,!1)}function dn(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>fa(e,Nn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),cr):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,fa(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),cn)}function Eo(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function fa(e,t){if(t-e.last<cn-4&&!e.idle&&e.last){dn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):cn/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let s of e.recs){if(!ko(s)){(s.placed||e.frames-s.born>90)&&Ao(s);continue}s.placed=!0,s.open&&(i=!0,gr(s,n,t)&&(e.loud=t),(s.disp[0]>0||s.disp[1]>0)&&(o=!0))}if(!i){Eo(e);return}e.idle=t-e.loud>dr&&!o,dn(e,e.idle)}function gr(e,t,n){if(e.fall<0){let w=e.els[0];e.fall=ma(w,"motion-meter-fall",pr),e.hold=ma(w,"motion-meter-hold",$o)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",s=i?o:Number(o?.in)||0,r=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=r&&Number(o.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let w of e.els)w.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[s,l],h=!1;for(let w=0;w<2;w++){let g=ur(p[w]);g>0&&(h=!0),e.disp[w]=g>=e.disp[w]?g:g+(e.disp[w]-g)*d,e.disp[w]<.001&&(e.disp[w]=0),p[w]>=lr&&(e.clipAt[w]=n);let x=e.clipAt[w]>0&&n-e.clipAt[w]<e.hold*1e3;pn(e,w,e.disp[w],x)}return h}function pn(e,t,n,o){let i=Math.round(n*1e3)/1e3,s=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===s)){e.shown[t]=i,e.clipShown[t]=s;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=s)}}}function un(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,pn(e,0,0,!1),pn(e,1,0,!1)}function Ao(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),kt.get(t)===e&&kt.delete(t)}function br(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=mr(o),s={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:$o,rows:""};for(let r of n)kt.set(r,s),i.io?.observe(r);if(i.recs.add(s),un(s),!i.io){let r=o.defaultView,l=()=>{Ke(s),Fe(i)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!s.dead){if(l===s.source){Ke(s),Fe(i);return}s.open&&(s.open=!1,s.source?.close?.(),un(s)),s.source=l,Ke(s),Fe(i)}},destroy(){s.dead||Ao(s),Fe(i)}}}var So={slop:8,longPressMs:500,pitchPx:16},wr=class{constructor(e,t,n=So){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,s=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,s)<this.config.slop)return;Math.abs(s)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-s/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xr(e,t,n,o=So){let i=!1,s=0,r=(d,p)=>{let h=e.ownerDocument.elementFromPoint?.(d,p),w=[...e.querySelectorAll(t)],g=h?w.findIndex(u=>u===h||u.contains(h)):-1;if(g>=0)return g;let x=-1,b=Number.POSITIVE_INFINITY;return w.forEach((u,m)=>{if(u.hidden)return;let y=u.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let f=Math.abs(d-(y.left+y.width/2));f<b&&f<=y.width&&(x=m,b=f)}),x},l=new wr(r,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{s&&clearTimeout(s),s=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),s=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Mo="netcomposer.groups.v1";function qn(){try{return globalThis.localStorage??null}catch{return null}}function To(e=qn(),t=Mo){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,s]of Object.entries(n))typeof s=="boolean"&&o.set(i,s);return o}catch{return new Map}}function yr(e,t,n,o=Mo){let i=To(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function vr(e,t=qn()){return To(t).get(e.id)??e.open===!0}function $r(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let s=document.createElement("span");s.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(s,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";yr(qn(),e.id,d),hn(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(i,c),Lo(o,e),hn(o,vr(e)),Co(o,e),o}function hn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Lo(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Co(e,t){Lo(e,t)&&hn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var ot="application/x-nc-pad",ga="http://www.w3.org/2000/svg";function kr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let s=0;s<n;s++){let r=Math.floor(s*t/n),l=Math.max(r+1,Math.floor((s+1)*t/n)),c=0,d=0;for(let h=r;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let p=n===1?50:s/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function Er(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,s)=>o.append(Ar(n,s,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&mt(n)}),Fo(n,e),n}function Ar(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(ga,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(ga,"path");return c.append(d),o.append(i,s,r,l,c),Mr(e,o,t,n),s.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&zo(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(ot,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let h=p.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(ot)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=h.includes(ot)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let w=p.dataTransfer?.getData(ot);if(w!==void 0&&w!==""){p.preventDefault(),p.stopPropagation();let x=Number(w);x!==t&&h.onMove?.(x,t,p.altKey);return}let g=p.dataTransfer?.files?.[0];g&&(p.preventDefault(),p.stopPropagation(),h.onFile?.(t,g))}),o}function Sr(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Mr(e,t,n,o){let i=0,s=!1,r=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;s=!1,r=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,s=ba(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),s=ba(e,t,n,o)}),t.addEventListener("click",()=>{if(s){s=!1;return}Sr(e,n,o)})}function ba(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let s=i.menu(n);if(!s.length)return!1;mt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),mt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of s){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=p.id,h.textContent=p.label,h.addEventListener("click",()=>{mt(e);let w=o(e);w?.type==="padGrid"&&(p.id==="rename"&&w.onRename?zo(e,t,n,o):w.onMenu?.(n,p.id))}),l.append(h)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function zo(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let s=document.createElement("input");s.type="text",s.className="nc-padgrid-rename",s.maxLength=i.nameMax??24,s.value=i.pads[n]?.label??"",s.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.top-r.top}px`,s.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let h=s.value.trim();s.remove(),t.focus();let w=o(e);p&&h&&w?.type==="padGrid"&&w.onRename?.(n,h)};s.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),s.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])s.addEventListener(p,h=>h.stopPropagation());e.append(s),s.focus(),s.select()}function mt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Fo(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let s=n[i];if(!(s instanceof HTMLButtonElement))return;let r=s.querySelector(".nc-padgrid-pad-name"),l=s.querySelector(".nc-padgrid-pad-hint"),c=s.querySelector(".nc-padgrid-pad-wave path"),d=s.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),s.draggable=!o.empty,o.empty?(s.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete s.dataset.empty,r&&(r.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",kr(o.peaks))),!o.empty&&o.hint?s.dataset.hint="true":delete s.dataset.hint,o.lane?s.dataset.ncLane=String(o.lane):delete s.dataset.ncLane;let p=t.selected===i;p?s.dataset.selected="true":delete s.dataset.selected,s.setAttribute("aria-pressed",p?"true":"false"),o.playing?s.dataset.playing="true":delete s.dataset.playing,s.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function K(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function zt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function wa(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Qe(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Tr=450,xa=8;function se(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Lr(e){let t=is(e,"target-min");return t>0?t:44}function Cr(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Lr(e),o=n/2,i=t.map(s=>s.parentElement?.getBoundingClientRect()??null);for(let s=0;s<t.length;s++){let r=t[s],l=i[s];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,h=c+o,w=d-o,g=d+o;for(let x=0;x<t.length;x++){if(s===x)continue;let b=i[x];if(!b||b.width===0)continue;let u=b.left+b.width/2,m=b.top+b.height/2;Math.abs(m-d)<o*2&&(u>c?h=Math.min(h,(c+u)/2):u<c&&(p=Math.max(p,(c+u)/2))),Math.abs(u-c)<o*2&&(m>d?g=Math.min(g,(d+m)/2):m<d&&(w=Math.max(w,(d+m)/2)))}p=Math.min(p,l.left),h=Math.max(h,l.right),w=Math.min(w,l.top),g=Math.max(g,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${w-l.top}px`,r.style.width=`${Math.max(0,h-p)}px`,r.style.height=`${Math.max(0,g-w)}px`,r.style.transform="none"}}function No(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ya(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ae(e,t){switch(e.type){case"slider":return zr(e,t);case"select":return Nr(e,t);case"toggle":return qr(e,t);case"button":return Dr(e,t);case"readout":return Pr(e);case"label":return Rr(e);case"note":return va(e);case"knob":return _r(e,t);case"choice":return Vr(e,t);case"slotRow":return Ur(e,t);case"stepGrid":return Kr(e,t);case"canvas":return Zr(e);case"fx":return ll(e,t);case"eqGraph":return js(e,t);case"levelSteps":return nr(e,t);case"group":return $r(e,t,Ae);case"strip":return el(e,t);case"stripAdd":return ol(e,t);case"padGrid":return Er(e,t);case"moves":return jr(e,t);default:return va({id:"unknown",text:""})}}function ae(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Po(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(qo(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Qe(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),wa(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")wa(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&xe(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Hr(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Qe(t.value))}else if(t.type==="choice")Io(e,t);else if(t.type==="slotRow")Bo(e,t);else if(t.type==="stepGrid")fn(e,t);else if(t.type==="padGrid")Fo(e,t);else if(t.type==="moves")Do(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&co(n,t)}else if(t.type==="eqGraph")ho(e,t);else if(t.type==="levelSteps")vo(e,t);else if(t.type==="strip"){_o(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${qe(n.id)}"]`);o instanceof Element&&ae(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Ho(e,t);else if(t.type==="group"){Co(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${qe(n.id)}"]`);o instanceof Element&&ae(o,n)}}else if(t.type==="fx"){Qo(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${qe(n.id)}"]`);o instanceof Element&&ae(o,n)}}}}function zr(e,t){let n=zt(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=nt(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(qo(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let s=l=>i?yt(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(s(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(s(l))}),i&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=Tn(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(Je(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(o,r),e.onTap&&n.insertBefore(Fr(e,o,t),r),n.append(K()),ae(n,e),n}function qo(e){return nt(e.taper,e.min,e.max)?Je(e.taper,e.min,e.max,e.value):e.value}function Fr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(se());let i=s=>{let r=n(t);r?.type==="slider"&&r.onTap?.(s)};return o.addEventListener("pointerdown",s=>{s.button===0&&i(s.timeStamp)}),o.addEventListener("keydown",s=>{s.repeat||s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),i(s.timeStamp))}),o}function Nr(e,t){let n=zt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let s of e.options){let r=document.createElement("option");r.value=s.value,r.textContent=s.label,s.disabled&&(r.disabled=!0),s.group?i?.getAttribute("label")!==s.group&&(i=document.createElement("optgroup"),i.setAttribute("label",s.group),o.append(i)):i=null,(i??o).append(r)}return o.value=e.value,o.addEventListener("change",()=>{let s=t(o);s?.type==="select"&&s.onChange(o.value)}),n.append(o,K()),n}function qr(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(K()),ae(n,e),n}function Dr(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let s=t(n);s?.type==="button"&&s.onPress()}),n.append(K()),ae(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=No(),i.addEventListener("click",()=>{let s=n.closest(".nc-module")?.querySelector(".nc-slot-row");s instanceof HTMLElement&&Ro(s);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),o.append(n,i),o}function Pr(e){let t=zt(e.id,e.label);return t.append(K()),ae(t,e),t}var Ir=450;function jr(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let s=document.createElement("span");s.className="nc-moves-label",s.setAttribute("aria-hidden","true"),s.textContent=o.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(Br(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}i.append(s,r),n.append(i)}return Do(n,e),n}function Do(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${qe(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function Br(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function Rr(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(K()),t}function va(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(K()),t}function $a(e){if(typeof e.valueText=="string")return e.valueText;let t=Qe(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Po(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Hr(e,t){let n=xt(t.taper,t.min,t.max,t.value);Po(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(xt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",$a(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${$a(t)}`}function Or(e,t){if(nt(e.taper,e.min,e.max))return Tn(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function _r(e,t){let n=zt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let s=0,r=0;o.addEventListener("pointerdown",d=>{s=d.clientY;let p=t(o);r=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(nt(p.taper,p.min,p.max)){let g=xt(p.taper,p.min,p.max,r)-(d.clientY-s)/120;p.onChange(ro(p.taper,p.min,p.max,g));return}let h=p.max-p.min||1,w=Math.min(p.max,Math.max(p.min,r-(d.clientY-s)*h/120));p.onChange(w)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let h=Or(p,d);h!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(K()),ae(n,e),n}function Vr(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let s=t(n);s?.type==="choice"&&s.onChange(o.value)}),i.addEventListener("keydown",s=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(i),c=l;if(s.key==="ArrowRight"||s.key==="ArrowDown")c=(l+1)%r.length;else if(s.key==="ArrowLeft"||s.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(s.key==="Home")c=0;else if(s.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(s.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(K()),Io(n,e),n}function Io(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function Ur(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let h=e.slots[p],w=document.createElement("span");w.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(p),g.textContent=h.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",w.append(g,se()),Gr(w,g,n,p,t),o.append(w)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=No(),i.append(se()),i.addEventListener("click",()=>{Ro(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let s=document.createElement("div");s.className="nc-field nc-morph-field",s.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",s.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,s,K()),jo(n,t),Bo(n,e),n}function ka(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;Ue(e);let s=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,s)}function Gr(e,t,n,o,i){let s=0,r=0,l=0,c=!1,d=!1,p=!1,h=!1,w=()=>{window.clearTimeout(s),s=0},g=m=>{let y=m.clientX-r,f=m.clientY-l;y*y+f*f>xa*xa&&(c=!0,w())},x=()=>{h&&(h=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",b),window.removeEventListener("pointercancel",u))},b=m=>{let y=s!==0&&!c&&!d;w(),x(),y&&(p=!0,ka(n,o,i,m))},u=()=>{c=!0,w(),x()};e.addEventListener("pointerdown",m=>{m.button===0&&(x(),d=!1,c=!1,p=!1,r=m.clientX,l=m.clientY,w(),s=window.setTimeout(()=>{s=0,!c&&(d=!0,Yr(n,t,o,i))},Tr),h=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",b),window.addEventListener("pointercancel",u))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(p||d||c){p=!1,d=!1,c=!1;return}ka(n,o,i,m)})}function jo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=Ea("Save","store"),i=Ea("Clear","clear");n.append(o,i);let s=document.createElement("div");s.className="nc-slot-scrim",s.hidden=!0,s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Ue(e)}),s.addEventListener("click",r=>r.stopPropagation()),e.append(s,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Ue(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Ue(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&Ue(e)})}function Ea(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Yr(e,t,n,o){jo(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let s=e.querySelector(".nc-slot-scrim");s instanceof HTMLElement&&(s.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.bottom-r.top}px`,i.querySelector("button")?.focus()}function Ue(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Bo(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let s=Number(i.dataset.ncSlot),r=t.slots[s];if(!r)continue;i.textContent=r.label,r.filled?i.dataset.filled="true":delete i.dataset.filled,r.active?i.dataset.active="true":delete i.dataset.active,r.edited?i.dataset.edited="true":delete i.dataset.edited,r.queued?i.dataset.queued="true":delete i.dataset.queued,r.queued&&r.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Ro(e){let t=e.dataset.ncLastFill||null,n=Ui(t);e.dataset.ncLastFill=n;let o=Gi(n);if(o)for(let[i,s]of Object.entries(o))e.style.setProperty(i,s)}function Wr(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=s=>{if(o===s)return;o=s,n.setAttribute("aria-pressed",s?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(s)};n.addEventListener("pointerdown",s=>{s.button===0&&(s.preventDefault(),n.setPointerCapture?.(s.pointerId),i(!0))});for(let s of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(s,()=>i(!1));return n.addEventListener("keydown",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),s.repeat||i(!0))}),n.addEventListener("keyup",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),i(!1))}),n.addEventListener("contextmenu",s=>s.preventDefault()),n}function Kr(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=u=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,o.append(m),m},s=i("Note"),r=i("Accent");r.dataset.ncAccentMode="";let l=u=>{for(let m of[s,r]){let y=m===u;m.setAttribute("aria-checked",y?"true":"false"),m.tabIndex=y?0:-1}};l(s);for(let u of[s,r])u.addEventListener("click",()=>l(u));o.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let m=r.getAttribute("aria-checked")==="true"?s:r;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(Wr(n,t)),e.onClear){let u=document.createElement("button");u.type="button",u.className="nc-fill nc-clear",u.dataset.ncClear="",u.textContent=e.clearLabel??"Clear",u.title="Clear every step (Undo takes it back)",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(u)}n.append(c);for(let u of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=u.label,y.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(y.dataset.ncLane=String((u.lane-1)%4+1));let f=!1,k=0;y.addEventListener("pointerdown",v=>{f=!1,!(v.pointerType==="mouse"||v.button!==0)&&(k=window.setTimeout(()=>{let T=t(n);T?.type!=="stepGrid"||!T.selectedRows||(f=!0,T.onSelectRow?.(T.rows.findIndex($=>$.id===u.id),!0))},Ir))});for(let v of["pointerup","pointercancel","pointerleave"])y.addEventListener(v,()=>window.clearTimeout(k));y.addEventListener("contextmenu",v=>{f&&v.preventDefault()}),y.addEventListener("click",v=>{let T=t(n);if(T?.type!=="stepGrid")return;if(f){f=!1;return}let $=T.rows.findIndex(A=>A.id===u.id),S=!!T.selectedRows&&(v.shiftKey||v.metaKey||v.ctrlKey);T.onSelectRow?.($,S)}),y.addEventListener("keydown",v=>Xr(n,y,v));let L=[];for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let T=document.createElement("span");T.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",$.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${u.label}`),T.append($,se()),T.addEventListener("click",()=>{let S=t(n);if(S?.type!=="stepGrid")return;let A=S.rows.findIndex(C=>C.id===u.id);(v==="mute"?S.onMute:S.onSolo)?.(A)}),L.push(T)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<u.steps.length;v++){let T=document.createElement("span");T.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${u.id}:${v}`,$.setAttribute("aria-label",`${u.label} step ${v+1}`),T.append($,se()),T.addEventListener("click",S=>{let A=t(n);if(A?.type!=="stepGrid")return;let C=A.rows.findIndex(q=>q.id===u.id),F=r.getAttribute("aria-checked")==="true";A.onToggle(C,v,S.shiftKey||F)}),E.append(T)}if(e.onLength&&E.append(Jr(n,E,u,t)),m.append(...L,y,E),e.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=u.id,v.setAttribute("aria-label",`Re-roll ${u.label}`),v.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=ya(),v.append(se()),v.addEventListener("click",()=>{let T=t(n);T?.type==="stepGrid"&&T.onDice?.(T.rows.findIndex($=>$.id===u.id))}),m.append(v)}m.addEventListener("click",v=>{if(v.target!==m)return;let T=t(n);T?.type==="stepGrid"&&T.onSelectRow?.(T.rows.findIndex($=>$.id===u.id))}),Aa(n,E,".nc-step-wrap",t,r,()=>u.id),n.append(m)}let d=document.createElement("div");d.className="nc-pads-head";let p=(u,m,y)=>{let f=document.createElement("button");return f.type="button",f.className=u,f.textContent=m,y&&f.setAttribute("aria-label",y),f},h=p("nc-pads-step","‹","Previous lane"),w=p("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let u=t(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",fn(n,u))}));for(let[u,m]of[[h,-1],[w,1]])u.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let f=y.rows.length;y.onSelectRow?.(((it(y)+m)%f+f)%f)});if(d.append(h,g,w),e.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=ya(),u.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let y=it(m);y>=0&&m.onDice?.(y)}),d.append(u)}if(e.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(u)}n.append(d);let x=document.createElement("div");x.className="nc-pads",x.setAttribute("role","group");let b=Math.max(0,...e.rows.map(u=>u.steps.length));for(let u=0;u<b;u++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",y=>{let f=t(n);if(f?.type!=="stepGrid")return;let k=it(f);if(k<0)return;if(n.dataset.ncLenMode==="true"){f.onLength?.(k,u+1);return}let L=r.getAttribute("aria-checked")==="true";f.onToggle(k,u,y.shiftKey||L)}),x.append(m)}return Aa(n,x,".nc-pad",t,r,()=>{let u=t(n);return u?.type==="stepGrid"?u.rows[it(u)]?.id:void 0}),n.append(x),n.append(K()),fn(n,e),n}function it(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Aa(e,t,n,o,i,s){let r="on",l=!0,c=-1,d=(p,h)=>{let w=p.rows[c]?.steps[h];!w||h>=p.rows[c].length||(p.onSet?p.onSet(c,h,r,l):!!w[r]!==l&&p.onToggle(c,h,r==="accent"))};xr(t,n,p=>{let h=o(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let w=h.rows.findIndex(g=>g.id===s());w>=0&&h.rows[w].length!==p.pad+1&&h.onLength?.(w,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let w=s();c=h.rows.findIndex(x=>x.id===w);let g=h.rows[c]?.steps[p.pad];if(!g)return;r=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[r]}d(h,p.pad)}else if(p.kind==="long"){let w=s(),g=h.rows.findIndex(b=>b.id===w),x=t.querySelectorAll(n)[p.pad];g>=0&&x instanceof HTMLElement&&h.onLongPress?.(g,p.pad,x)}}})}function Xr(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),s=i;n.key==="ArrowDown"?s=i+1:n.key==="ArrowUp"?s=i-1:n.key==="Home"?s=0:s=o.length-1;let r=o[s];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Jr(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(se());let s=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let h=p.rows.findIndex(x=>x.id===n.id),w=p.rows[h];if(!w)return;let g=Math.max(1,Math.min(w.steps.length,d));g!==w.length&&p.onLength?.(h,g)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],h=1;return p.forEach((w,g)=>{let x=w.getBoundingClientRect();x.width>0&&d>=x.left+x.width/2&&(h=g+1)}),h},l=d=>s(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let h=p.rows.find(g=>g.id===n.id);if(!h)return;let w={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in w&&(d.preventDefault(),s(w[d.key]))}),i}var Ut=new WeakMap,st=new WeakMap;function Qr(e){return e?(st.has(e)||(st.set(e,Zt(e)),eo(t=>{st.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))mn(n,Number(n.getAttribute("data-nc-velocity")))},e)),st.get(e)):"light"}function mn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:Qr(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(Ut.has(e)&&Ut.get(e)===i)){if(Ut.set(e,i),n===null){for(let s of Object.keys(ta(1)))e.style.removeProperty(s);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[s,r]of Object.entries(ta(n,ea[o]??ea.light)))e.style.setProperty(s,r)}}function Sa(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function fn(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),s=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&s&&(r.textContent=l?`${s.label} · ${s.length}`:s.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&s&&(c.setAttribute("aria-label",`Re-roll ${s.label}`),c.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,h=t.transport?.label??(p?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",p?"true":"false");let w=t.transport?.ariaLabel;w?d.setAttribute("aria-label",w):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&s){i.setAttribute("aria-label",`${s.label} steps`),s.lane&&(i.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||n&&!s.solo?i.dataset.silent="true":delete i.dataset.silent;let p=s.length>0?(t.playhead%s.length+s.length)%s.length:-1;for(let h of i.querySelectorAll("[data-nc-pad]")){let w=Number(h.getAttribute("data-nc-pad")),g=s.steps[w];h instanceof HTMLButtonElement&&(h.hidden=!g||!l&&w>=s.length,l&&w>=s.length?h.dataset.out="true":delete h.dataset.out,l&&w===s.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${s.label} step ${w+1}${g?.markLabel?`, ${g.markLabel}`:""}`),Sa(h,g),h.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?h.dataset.accent="true":delete h.dataset.accent,g?.dim?h.dataset.dim="true":delete h.dataset.dim,mn(h,g?.velocity),t.playhead>=0&&w===p?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let p of t.rows){for(let g=0;g<p.steps.length;g++){let x=p.steps[g],b=e.querySelector(`[data-nc-step="${p.id}:${g}"]`);if(!(b instanceof HTMLButtonElement))continue;let u=b.closest(".nc-row");if(u instanceof HTMLElement){t.selectedRow===p.id?u.dataset.selected="true":delete u.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?u.dataset.picked="true":delete u.dataset.picked;let L=u.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?u.dataset.silent="true":delete u.dataset.silent;for(let E of u.querySelectorAll("[data-nc-ms]")){let v=E.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;E.setAttribute("aria-pressed",v?"true":"false")}}b.setAttribute("aria-pressed",x.on?"true":"false");let m=`${p.label} step ${g+1}${x.markLabel?`, ${x.markLabel}`:""}`;b.getAttribute("aria-label")!==m&&b.setAttribute("aria-label",m),Sa(b,x),x.accent?b.dataset.accent="true":delete b.dataset.accent,x.dim?b.dataset.dim="true":delete b.dataset.dim,g%4===0?b.dataset.bar="true":delete b.dataset.bar,typeof x.velocity=="number"?(b.dataset.velocity="true",b.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,x.velocity))*100)}%`)):(delete b.dataset.velocity,b.style.removeProperty("--level")),mn(b,x.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;g===y?b.dataset.playhead="true":delete b.dataset.playhead;let f=!!t.onLength&&t.selectedRow===p.id;b.hidden=g>=p.length&&!f,g>=p.length&&f?b.dataset.out="true":delete b.dataset.out}let h=e.querySelector(`[data-nc-len="${p.id}"]`),w=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&w&&w.nextElementSibling!==h){let g=document.activeElement===h;w.after(h),g&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(p.length)),h.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),h.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Zr(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,K()),t}function el(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let s=!e.master&&typeof e.onFold=="function",r=null;s&&(n.dataset.ncFoldable="",r=Yo(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let f=t(n);f?.type==="strip"&&(f.onFold?.(f.folded!==!0),document.activeElement!==r&&r.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let f=document.createElement("span");f.className="nc-strip-grip-dots",f.setAttribute("aria-hidden","true"),l.append(f),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let L=t(n);L?.type==="strip"&&(k.preventDefault(),L.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>La(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",f=>{f.pointerType==="touch"||f.pointerType==="pen"||f.target instanceof Element&&f.target.closest("input, .nc-strip-remove")||(f.preventDefault(),La(n,o,t,{x:f.clientX,y:f.clientY}))}),e.onRemove){let f=document.createElement("button");f.type="button",f.className="nc-strip-remove",f.dataset.ncStripRemove="",f.textContent="×",f.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(f)}),o.append(f)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let f=document.createElement("span");f.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",f.append(k,se()),f.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),c.append(f)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let f=document.createElement("span");f.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",f.append(k,se()),f.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),d.append(f)}for(let f of["mute","solo"]){if(!(f==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=f,L.textContent=f==="mute"?"M":"S",k.append(L,se()),k.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(f==="mute"?E.onMute:E.onSolo)?.()}),d.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let f of e.sends??[])p.append(Ae({...f,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Ae(Dn(e),t));let w=document.createElement("div");w.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let f of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(f.value)),k.textContent=f.label,g.append(k)}let x=us({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:f=>{let k=t(n);k?.type==="strip"&&k.onChange(f)},onReset:()=>{let f=t(n);f?.type==="strip"&&Ta(f)}}),b=ws({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let f=t(n);f?.type==="strip"&&f.onClipClear?.()}});if(w.append(g,x.el,b.el),s){let f=document.createElement("button");f.type="button",f.className="nc-ui-fx-fold nc-strip-fold",f.dataset.ncStripFold="",f.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,f.append(k,E,L),f.addEventListener("click",()=>{let v=t(n);if(v?.type!=="strip")return;v.onFold?.(!1);let T=n.querySelector("[data-nc-strip-hide]");T instanceof HTMLElement&&T.focus()}),w.prepend(f)}let u=document.createElement("button");u.type="button",u.className="nc-strip-db",u.dataset.ncReadout="";let m=0;u.addEventListener("click",f=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(m),f.detail===0?Ma(n,u,t):f.detail===1&&(m=window.setTimeout(()=>Ma(n,u,t),al)))}),u.addEventListener("dblclick",()=>{window.clearTimeout(m);let f=t(n);f?.type==="strip"&&Ta(f)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(Ae(Pn(e),t)),r&&n.append(r),l&&n.append(l),n.append(o,y,c,d,p,h,w,u,K()),_o(n,e),n}function Dn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??nl(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Pn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??tl(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function tl(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function nl(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var al=250;function Ma(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??Qe(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let s=!1,r=l=>{if(s)return;s=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),i.addEventListener("blur",()=>r(!1))}function ol(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let s=document.createElement("span");s.className="nc-strip-add-label",o.append(i,s);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;Oo(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(o,r,K()),Ho(n,e),n}function Ho(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],s=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");s!==r&&(o.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Oo(o))}function Oo(e){let t=e.options[0];t&&(t.selected=!0)}function Ta(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function _o(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),s=i?hs(i):void 0;s&&(s.configure({step:t.step}),s.set(t.value),s.setText(t.valueText),s.setLabel(`${t.label} level`)),xs(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let x=t.valueText??Qe(t.value);r.textContent!==x&&(r.textContent=x),r.setAttribute("aria-label",`${t.label} level ${x}`);let b=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${b}`:b}for(let x of e.querySelectorAll("[data-nc-ms]")){let b=x.getAttribute("data-nc-ms"),u=b==="mute"?t.mute===!0:t.solo===!0;x.setAttribute("aria-pressed",u?"true":"false"),x.setAttribute("aria-label",`${b==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let x=t.hacksLabel??"Hacks";l.textContent!==x&&(l.textContent=x),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${x}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let x=t.sendsViewLabel??"Sends";c.textContent!==x&&(c.textContent=x),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${x}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),xe(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=Vo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let x=e.querySelector(`.nc-strip-trim [data-nc-id="${qe(t.trim.id)}"]`);x&&ae(x,Pn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let x=e.querySelector(`.nc-strip-pan [data-nc-id="${qe(t.pan.id)}"]`);x&&ae(x,Dn(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let w=e.querySelector("[data-nc-strip-hide]");w instanceof HTMLElement&&(Wo(w,h,t.label),xe(w,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!h,g.setAttribute("aria-label",`Expand ${t.label}`);let x=g.querySelector("[data-nc-strip-fold-name]");x&&x.textContent!==t.label&&(x.textContent=t.label),xe(g,t.foldedHelp??t.foldHelp)}}function Vo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Uo?t:0}var Uo=8,rt=null;function La(e,t,n,o){rt?.();let i=n(e);if(i?.type!=="strip")return null;let s=e.ownerDocument,r=s.defaultView??globalThis,l=s.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=s.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=s.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=Vo(i),h=e.querySelector("[data-nc-strip-grip]")??t,w=(m=!1)=>{if(rt!==w)return;rt=null;let y=l.contains(s.activeElement);l.remove(),s.removeEventListener("keydown",x,!0),s.removeEventListener("pointerdown",b,!0),r.removeEventListener("resize",u),(m||y)&&h?.isConnected&&h.focus?.({preventScroll:!0})},g=[0,...Array.from({length:Uo},(m,y)=>y+1)].map(m=>{let y=s.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",m===p?"true":"false"),y.setAttribute("tabindex",m===p?"0":"-1"),y.dataset.ncShadeChoice=String(m),m===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(m),y.setAttribute("aria-label",`Shade ${m}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${m})`)),y.addEventListener("click",()=>{let f=n(e);w(!0),f?.type==="strip"&&f.onShade?.(m===0?null:m)}),y});if(d.append(...g),d.addEventListener("keydown",m=>{let y=g.indexOf(s.activeElement);if(y<0)return;let f=-1;m.key==="ArrowRight"||m.key==="ArrowDown"?f=(y+1)%g.length:m.key==="ArrowLeft"||m.key==="ArrowUp"?f=(y-1+g.length)%g.length:m.key==="Home"?f=0:m.key==="End"&&(f=g.length-1),!(f<0)&&(m.preventDefault(),g[y].setAttribute("tabindex","-1"),g[f].setAttribute("tabindex","0"),g[f].focus())}),l.append(c,d),typeof i.onMove=="function"){let m=[...e.parentElement?.children??[]].filter(f=>f.classList?.contains("nc-strip")&&!f.hasAttribute("data-nc-master")),y=m.indexOf(e);for(let[f,k,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=s.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=f<0?"left":"right";let v=s.createElement("span");v.textContent=k;let T=s.createElement("kbd");T.textContent=L,T.setAttribute("aria-hidden","true"),E.append(v,T),E.disabled=f<0?y<=0:y<0||y>=m.length-1,E.addEventListener("click",()=>{let $=n(e);w(!0),$?.type==="strip"&&$.onMove?.(f)}),l.append(E)}}s.body.append(l),(()=>{let m=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,f=l.offsetHeight,k=r.innerWidth||s.documentElement.clientWidth||y,L=r.innerHeight||s.documentElement.clientHeight||f,E=o?o.x:m.right-y,v=o?o.y:m.bottom+4;E=Math.max(4,Math.min(E,k-y-4)),v+f>L-4&&(v=Math.max(4,(o?o.y:m.top)-f-4)),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round(v)}px`})();let x=m=>{if(m.key==="Escape")m.preventDefault(),m.stopPropagation(),w(!0);else if(m.key==="Tab"&&l.contains(s.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),f=(y.indexOf(s.activeElement)+(m.shiftKey?-1:1)+y.length)%y.length;m.preventDefault(),y[f]?.focus()}},b=m=>{l.contains(m.target)||w(!1)},u=()=>w(!1);return s.addEventListener("keydown",x,!0),s.addEventListener("pointerdown",b,!0),r.addEventListener("resize",u),rt=w,(g.find(m=>m.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>w(!1)}}var gn=typeof ResizeObserver=="function"?new ResizeObserver(il):null;function il(e){for(let t of e){if(!t.target.isConnected){gn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&sl(n)}}function sl(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,s=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+s}px`)}function rl(e){if(gn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))gn.observe(t)}function ll(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",s=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!Et(e)&&!s&&!r)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),s&&l.append(Xo(n,"head")),e.on!==void 0){let c=oo({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(dl(n,t)),Et(e)&&l.append(ml(n,t)),r&&l.append(fl(t)),n.append(l)}i&&n.prepend(pl(n,t)),s&&Jo(n,e);for(let l of e.controls)n.append(Ae(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Ae(d,t));n.append(l)}return n.append(K()),Qo(n,e),rl(n),n}var cl=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Go(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&cl(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function dl(e,t){let n=Yo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Go(e))}),n}function Yo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Wo(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function pl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let s=document.createElement("span");return s.className="nc-fold-tri",s.setAttribute("aria-hidden","true"),n.append(s,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Xo(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),Go(e)}}),n}var Ie=new Set;function ft(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Et=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),ul="(max-width: 768px)";function hl(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function ml(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(hl()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(Ko(e,o,!Ie.has(o.id)),n.focus())}),n}function fl(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Ko(e,t,n){n?Ie.add(t.id):Ie.delete(t.id),In(e,t)}function gl(e,t){t?.type==="fx"&&Ie.has(t.id)&&Ko(e,t,!1)}function bl(e){return e.ownerDocument.defaultView?.matchMedia?.(ul).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function In(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=Et(t)&&Ie.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Et(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),ft(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Pe(r)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",xe(n,t.maxHelp)),!o){e.dataset.ncMax&&Ca(e);return}if(!e.isConnected){let r=()=>e.isConnected&&Ie.has(t.id)&&In(e,t);queueMicrotask(()=>{e.isConnected?r():ft(e.ownerDocument,r)});return}let i=bl(e),s=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;s>0&&e.style.setProperty("--nc-fx-dials",String(s)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Ca(e),e.dataset.ncMax=i,i==="over"&&wl(e,t)),xl(e.ownerDocument),i==="over"&&jn(e),ft(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Pe(r)})}function Ca(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),ft(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Pe(n)})}function wl(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function jn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,s=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,r=Is(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),s,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var za=new WeakSet;function xl(e){za.has(e)||(za.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&jn(t)}))}var bn=new WeakMap;function Xo(e,t){let n=hr(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Jo(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)xe(i,t.meterHelp);let o=bn.get(e);o?o.set(t.meter):bn.set(e,br(n,t.meter))}function Qo(e,t){(t.meter||bn.has(e))&&Jo(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let s=e.querySelector("[data-nc-fx-hide]");s instanceof HTMLElement&&(Wo(s,i,t.title),xe(s,t.foldHelp)),In(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=i,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),xe(l,t.foldHelp)}}function xe(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function qe(e){return e.replace(/["\\]/g,"\\$&")}function yl(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&co(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Pe(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&jn(n);Cr(e)}var vl=1e3,$l=e=>e===!0?"log":typeof e=="string"?e:"linear";function kl(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??$l(e.log),i=nt(o,e.min,e.max),s=n.createElement("div");s.className="nc-field",s.dataset.ncRow="",s.dataset.ncSlider="",s.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?vl:e.max),l.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",s.append(r,l,c,d);let p=e.value,h=()=>{let g=e.format(p);c.textContent=g,l.setAttribute("aria-valuetext",g)},w=g=>{p=g,n.activeElement!==l&&(l.value=String(i?Je(o,e.min,e.max,p):p)),h()};return l.addEventListener("input",()=>{p=i?yt(o,e.min,e.max,l.value,e.step):Number(l.value),h(),e.onInput(p)}),i&&l.addEventListener("keydown",g=>{let x=Tn(o,e.min,e.max,p,g.key,g.shiftKey,e.step);x===null||l.disabled||(g.preventDefault(),l.value=String(Je(o,e.min,e.max,x)),p=x,h(),e.onInput(p))}),l.disabled=e.disabled===!0,w(e.value),{el:s,set:w,setDisabled(g){l.disabled=g===!0}}}var El=be["toast-duration"];function Al({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Sl(e,t,n,o){let i=l=>({top:l,bottom:l+n}),s=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=i(t-o-n);return s(r)?s(i(o))?"bottom":"top":"bottom"}function Ml(e,t,n,o,i,s){let r=e.bottom+i,l=Math.max(s,Math.min(e.left,o-s-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+i,c=!0)}return{top:r,left:l}}var Fa="data-nc-ui-toast-live";function Tl(e,t){let n=t.querySelector(`[${Fa}]`);return n||(n=e.createElement("div"),n.setAttribute(Fa,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Ll({message:e,actionLabel:t,onAction:n,duration:o=El,onClose:i,avoid:s=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,p.appendChild(h);let w=null;t&&(w=c.createElement("button"),w.type="button",w.className="nc-ui-toast-action",w.textContent=t,p.appendChild(w)),l.appendChild(p);let g="open",x=N=>N&&typeof N.getBoundingClientRect=="function"?N.getBoundingClientRect():null,b=x(p),u=b?.height||44,m=d.getComputedStyle?.(p),y=Number.parseFloat(m?.getPropertyValue(B("toast-offset")))||16,f=Number.parseFloat(m?.getPropertyValue(B("toast-anchor-gap")))||8,k=x(r),L=d.innerHeight??0,E=s.map(x).filter(Boolean),v=k&&k.bottom>0&&k.top<L?Ml(k,E,{width:b?.width||0,height:u},d.innerWidth??0,f,y):null;v&&v.top+u<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${v.top+(d.scrollY??0)}px`,p.style.left=`${v.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",Sl(E,L,u,y));let T=d.requestAnimationFrame?.bind(d)??(N=>setTimeout(N,16));T(()=>T(()=>{g==="open"&&p.setAttribute("data-state","open")})),Tl(c,l).textContent=Al({message:e,actionLabel:t});let $,S,A=new Promise(N=>{S=N}),C=N=>{clearTimeout($),$=setTimeout(()=>j("timeout"),N)},F=o,q=Date.now(),I=()=>{g==="open"&&(clearTimeout($),F=Math.max(0,F-(Date.now()-q)))},D=()=>{g==="open"&&(q=Date.now(),C(F))};p.addEventListener("pointerenter",I),p.addEventListener("pointerleave",D),p.addEventListener("focusin",I),p.addEventListener("focusout",D),w?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{j("action")}}),Number.isFinite(o)&&C(o);function j(N="close"){if(g!=="open")return;g="closing",clearTimeout($),p.setAttribute("data-state","closing"),i?.(N);let P=d.getComputedStyle?.(p),de=P?Math.max(0,...String(P.transitionDuration||"").split(",").map(pe=>Number.parseFloat(pe)*(pe.trim().endsWith("ms")?1:1e3)||0)):0,le=()=>{g!=="gone"&&(g="gone",p.remove(),S(N))};p.addEventListener("transitionend",le),setTimeout(le,de+50)}return{el:p,close:j,closed:A}}var Ze="data-nc-help";function Cl(e,t,n,o=0,i=6,s=8){let r=e.top-i-t.height,l=r>=o+s?"above":"below",c=l==="above"?r:e.bottom+i,d=Math.max(s,Math.min(e.left,n-s-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Gt=new WeakMap;function zl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Fl({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Gt.get(e);if(n)return n;let o=e.defaultView,i=null,s=null,r,l=!1,c,d=null,p=!1,h=0,w=()=>{clearTimeout(r),p&&!l&&(h=Date.now()+1500),p=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},g=()=>{w(),clearTimeout(c),s=null,d=null,l=!1},x=(v,T)=>{clearTimeout(r),d=T;let $=Date.now()<h?Math.min(t,300):t;r=setTimeout(()=>{s===v&&v.isConnected&&!l&&m(v)&&(p=!0)},$)},b=v=>({x:Number(v.clientX)||0,y:Number(v.clientY)||0}),u=(v,T,$)=>!v||Math.hypot(v.x-T.x,v.y-T.y)>$,m=(v,T)=>{let $=T??v.getAttribute(Ze);if(!$)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=$,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let S=v.getBoundingClientRect(),A=Cl(S,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,zl(e));return i.style.top=`${A.top}px`,i.style.left=`${A.left}px`,i.dataset.side=A.side,i.style.visibility="",!0},y=v=>{if(l||v.pointerType==="touch")return;let T=v.target&&v.target.closest?v.target.closest(`[${Ze}]`):null;T!==s&&(g(),!(!T||v.buttons)&&(s=T,x(T,b(v))))},f=v=>{if(l||v.pointerType==="touch"||!s)return;if(v.buttons){w(),d=null;return}let T=b(v);p?u(d,T,8)&&(w(),x(s,T)):u(d,T,4)&&x(s,T)},k=v=>{!l&&!v.relatedTarget&&g()},L=v=>{(l||v.key==="Escape")&&g()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",f,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",g,!0),e.addEventListener("keydown",L),o.addEventListener("scroll",g,!0),o.addEventListener("blur",g);let E={hide:g,pin(v,T,{ms:$=0}={}){return g(),!v||!v.isConnected||!m(v,T)?!1:(l=!0,i.dataset.pinned="",$>0&&(c=setTimeout(g,$)),!0)},uninstall(){g(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",f),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",g,!0),e.removeEventListener("keydown",L),o.removeEventListener("scroll",g,!0),o.removeEventListener("blur",g),i?.remove(),i=null,Gt.delete(e)}};return Gt.set(e,E),E}var Bn="netcomposer.rhythm.hidden.v1",ce=new WeakMap;function Yt(){try{return globalThis.localStorage??null}catch{return null}}function Zo(e,t=Bn){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Na(e,t,n,o=Bn){let i=Zo(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function Rn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let s of i.controls)o(s)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(s=>({...s,type:"knob",compact:!0}))),i.pan&&n.push(Dn(i)),i.trim&&n.push(Pn(i)));return n}function ei(e,t){if(!(!e||!t))return Rn(e).find(n=>n.id===t)}function Nl(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Rn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function ql(e,t){if(!t.title)return;if(!t.panel){let s=document.createElement("h3");s.className="nc-ui-fx-name",s.textContent=t.title,e.append(s);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),ti(e,t)}function ti(e,t){if(!t.panel)return;let n=[...e.children].find(s=>s.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Dl(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ce.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return ei(n,o)}function Pl(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=Nl(t);if(e.dataset.ncSignature===i){for(let s of o){let r=e.querySelector(`[data-nc-section="${Da(s.id)}"]`);r&&ti(r,s);for(let l of s.controls){let c=e.querySelector(`[data-nc-id="${Da(l.id)}"]`);c instanceof Element&&ae(c,l)}r instanceof HTMLElement&&wn(r,s,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let s of o){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),ql(r,s);let l=s.panel?document.createElement("div"):r;s.panel&&(l.className="nc-panel-body",r.append(l));for(let c of s.controls)l.append(Ae(c,Dl));e.append(r),wn(r,s,n)}}function ni(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var Il="(max-width: 768px)",ai=new WeakMap;function qa(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function jl(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=qa("prev"),s=qa("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,r,s,l);let c=(d,p)=>{let h=ai.get(e);if(!h||p.getAttribute("aria-disabled")==="true")return;let w=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=ni(w,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,g),h.onPage?.(g),wn(e,{...h,page:g},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?s:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),s.addEventListener("click",()=>c(1,s)),e.prepend(o),o}function wn(e,t,n){ai.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:s,page:r}=ni(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,r),s<=1){for(let u of[...e.children])u.classList.contains("nc-fx-pager")&&u.remove();delete e.dataset.ncPaged;for(let u of o)delete u.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Il).matches===!0,c=e.closest(".nc-module");o.forEach((u,m)=>{let y=Math.floor(m/i)!==r;if(y?u.dataset.ncOffPage="":delete u.dataset.ncOffPage,y&&!l){let f=c instanceof HTMLElement?ce.get(c):void 0;gl(u,ei(f,u.dataset.ncId))}});let d=jl(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),h.setAttribute("aria-disabled",r===s-1?"true":"false");let w=d.querySelector("[data-nc-fx-page-count]"),g=`${r+1} / ${s}`;w.textContent!==g&&(w.textContent=g);let x=d.querySelector("[data-nc-fx-page-live]"),b=`Effects page ${r+1} of ${s}`;x.textContent!==b&&(x.textContent=b)}function Da(e){return e.replace(/["\\]/g,"\\$&")}function Bl(e,t=Bn){ao();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=Zo(Yt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let s=document.createElement("h2");s.className="nc-title",s.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=oo({labelledBy:s.id,onChange:y=>(ce.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(s,p,r);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let w=document.createElement("button");w.type="button",w.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",w.append(g);let x=document.createElement("i");x.className="nc-token-probe",x.dataset.ncProbe="",n.append(x,i,h,w),n.setAttribute("aria-labelledby",s.id);let b=y=>{let f=ce.get(n)??e;n.dataset.ncOpen=y?"false":"true",h.hidden=y,w.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${f.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";Na(Yt(),(ce.get(n)??e).id,y,t),b(y),xn(n.parentElement)}),w.addEventListener("click",()=>{Na(Yt(),(ce.get(n)??e).id,!1,t),b(!1),xn(n.parentElement)});let u={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(y){ce.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,s.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),g.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,w.setAttribute("aria-label",`Show ${y.title}`),Pl(h,y,u),b(h.hidden),m.redraw()},redraw(){let y=ce.get(n);y&&yl(n,Rn(y))}};return ce.set(n,e),b(o),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),eo(()=>m.redraw(),n.ownerDocument),m}function Rl(e,t,n="adjacent"){ao(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,s)=>{let r=s%4+1;i.el.dataset.ncShade=String(r),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(i.el),i.redraw()}),xn(e)}function xn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(s=>s instanceof HTMLElement&&s.classList.contains("nc-module")),n=t.some(s=>s.hasAttribute("data-nc-lead")),o=t.map(s=>s.hasAttribute("data-nc-slim")?a("module-slim-column"):n?s.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(s=>!s.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Hl={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"This pass's own quantize. Song follows the Setup."};function Hn(e){return Hl[e]??""}const oi="nc-song-looper",On=4,Ol=[1,2,3,4],yn=64,R=960,H=4,re=32,vn=4e3,Ft=120,At=40,St=240,_l=8,De=40,_n=["off","1/8","1/16","1/32"],ii=[.5,.75,1],si=128,je=e=>Math.max(1,Math.floor(e/H)),Z=e=>e.bars*H*R,Mt=H*R;function $n(e){const t=e.loop;return t?{start:(t.from-1)*Mt,length:(t.to-t.from+1)*Mt}:{start:0,length:Z(e)}}function ri(e,t){const n=Z(t);if(!e.repeat||e.endTick>=n)return[0];const o=[];for(let i=0;i<n;i+=e.endTick)o.push(i);return o}function li(e,t){if(!e.shift)return 0;const n=Z(t),o=e.repeat&&e.endTick<n?e.endTick:n,i=e.shift*Mt%o;return i<0?i+o:i}function Vl(e,t){const n=Z(t),o=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(o/Mt)-1)}function Ul(e){const t=Math.round(e.bars*H*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function ci(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const Vn=De*2;function di(e,t=new Date,n=Math.random){const o=Math.min(St,Math.max(At,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString();return{format:oi,version:On,id:ci(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:o,beatsPerBar:H,bars:Math.min(_l,je(o)),countInBars:1,ppq:R},passes:[],comps:[]}}const ze=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Q=e=>Number.isInteger(e),$e=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,Wt=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),me=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function Pa(e){if(e===void 0)return null;if(!ze(e))return"quantize must be an object";const t=me(e,["grid","strength"]);return t?`quantize has an unknown field (${t})`:_n.includes(e.grid)?ii.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%":"quantize grid is not off, 1/8, 1/16 or 1/32"}function Gl(e){if(!ze(e)||e.format!==oi)return"it isn't a Lupa song";if(!Ol.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=me(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!$e(e.id))return"its id is missing";if(!$e(e.name,Vn))return"its name is missing";if(!Wt(e.createdAt)||!Wt(e.updatedAt))return"its dates are wrong";const n=e.song;if(!ze(n))return"its song is missing";const o=me(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop"]);if(o)return`its song has an unknown field (${o})`;if(!Q(n.bpm)||n.bpm<At||n.bpm>St)return`its tempo is not ${At}–${St}`;if(n.beatsPerBar!==H)return"it isn't in 4/4";if(!Q(n.bars)||n.bars<1||n.bars>je(n.bpm))return`its bars are not 1–${je(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==R)return`its ticks are not ${R} a beat`;const i=Pa(n.quantize);if(i)return`its song's ${i}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const c=n.loop;if(!ze(c)||me(c,["from","to"])||!Q(c.from)||!Q(c.to)||c.from<1||c.to<c.from||c.to>n.bars)return`its loop is not bars 1–${n.bars}`}const s=Z(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>re)return`it has more than ${re} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let c=0;c<e.passes.length;c++){const d=e.passes[c],p=`Pass ${c+1}`;if(!ze(d))return`${p} is not an object`;const h=me(d,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift"]);if(h)return`${p} has an unknown field (${h})`;if(d.repeat!==void 0&&(e.version<3||typeof d.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(d.shift!==void 0&&(e.version<4||!Q(d.shift)||d.shift===0||Math.abs(d.shift)>yn))return`${p}'s shift is not a whole number of bars`;if(!$e(d.id)||r.has(d.id))return`${p} has no id of its own`;if(r.add(d.id),!Q(d.n)||d.n<1||l.has(d.n))return`${p} has no number of its own`;if(l.add(d.n),!$e(d.name,De))return`${p}'s name is not 1–${De} characters`;if(!Wt(d.recordedAt))return`${p}'s date is wrong`;if(!Q(d.endTick)||d.endTick<=0||d.endTick>s)return`${p}'s end is not in the song`;for(const x of["kept","mute","solo"])if(typeof d[x]!="boolean")return`${p}'s ${x} is not true or false`;if(typeof d.volume!="number"||!(d.volume>=0&&d.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(d.instruments)||!d.instruments.every(x=>$e(x,64)))return`${p}'s instruments are wrong`;const w=Pa(d.quantize);if(w)return`${p}'s ${w}`;if(!Array.isArray(d.events))return`${p}'s events are missing`;if(d.events.length>vn)return`${p} has more than ${vn} events`;let g=Number.NEGATIVE_INFINITY;for(let x=0;x<d.events.length;x++){const b=d.events[x],u=`event ${x+1} in ${p}`;if(!ze(b))return`${u} is not an object`;if(!$e(b.inst,64)||!d.instruments.includes(b.inst))return`${u} is from an instrument not listed`;if(!Q(b.at)||b.at<-Ft||b.at>=d.endTick)return`${u} is outside the pass`;if(b.at<g)return`${u} is out of order`;if(g=b.at,b.kind==="take"){if(e.version===1)return`${u} is of an unknown kind`;const y=me(b,["kind","inst","take","at","len","peaks"]);if(y)return`${u} has an unknown field (${y})`;if(!$e(b.take)||b.take.length>128)return`${u} has no take`;if(!Q(b.len)||b.len<1||b.at+b.len>s)return`${u} has a length outside the song`;if(b.peaks!==void 0&&!(Array.isArray(b.peaks)&&b.peaks.length<=si&&b.peaks.every(f=>typeof f=="number"&&f>=0&&f<=1)))return`${u} has bad peaks`;continue}if(b.kind==="slot"){const y=me(b,["kind","inst","slot","at"]);if(y)return`${u} has an unknown field (${y})`;if(!Q(b.slot)||b.slot<1||b.slot>16)return`${u} has slot ${String(b.slot)}`;continue}const m=me(b,["kind","inst","note","vel","at","len","slice","name"]);if(m)return`${u} has an unknown field (${m})`;if(b.kind!==void 0&&b.kind!=="note")return`${u} is of an unknown kind`;if(!Q(b.note)||b.note<0||b.note>127)return`${u} has note ${String(b.note)}`;if(typeof b.vel!="number"||!(b.vel>0&&b.vel<=1))return`${u} has velocity ${String(b.vel)}`;if(!Q(b.len)||b.len<1||b.len>s)return`${u} has a length outside the song`;if(b.slice!==void 0&&!(Q(b.slice)&&b.slice>=0&&b.slice<=255))return`${u} has slice ${String(b.slice)}`;if(b.name!==void 0&&!(typeof b.name=="string"&&b.name.length>0&&b.name.length<=De))return`${u} has a bad sound name`}}return null}function Un(e){const t=Gl(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=On,{session:n}}class Yl{song;b0;passes;drafts=new Map;held=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/R}get lapTicks(){return $n(this.song).length}get lapStart(){return $n(this.song).start}get full(){return this.passes.length>=re}hasDraft(t){return(this.drafts.get(t)?.count??0)>0}place(t){const n=t-this.b0,o=Math.floor(n/this.lapBeats+1e-12);return{lap:o,tick:Math.round((n-o*this.lapBeats)*R)}}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-Ft?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/R}played(t,n){const o=[];for(const i of n){if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="chordPad"||i.type==="lap"){this.stats.ignored++;continue}if(i.type==="take"){const p=this.voicePass(t,i);p&&o.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:s,tick:r}=this.placeOn(i.beat);if(s<0||s<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(s)??{lap:s,events:[],count:0};if(l.events.length>=vn){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(i.type==="slot")c={kind:"slot",inst:t,slot:i.slot,at:d};else{const p={inst:t,note:i.note,vel:Wl(i.velocity),at:d,len:1};i.slice!==void 0&&(p.slice=i.slice),typeof i.name=="string"&&i.name.trim()&&(p.name=i.name.trim().slice(0,De)),this.held.set(`${t}|${i.id}`,{ev:p,onBeat:i.beat}),c=p}Ia(l.events,c),l.count++,this.drafts.set(s,l),this.stats.taken++,o.push({lap:s,ev:c})}return o}release(t,n,o){const i=`${t}|${n}`,s=this.held.get(i);s&&(this.held.delete(i),s.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-s.onBeat)*R))))}seam(t){const n=this.place(t).lap,o=[];for(let i=this.through+1;i<n;i++){this.through=i;const s=this.commit(i,this.lapTicks);s&&o.push(s)}return o}stop(t){for(const[s,r]of this.held)this.held.delete(s),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-r.onBeat)*R)));const n=this.seam(t),{lap:o,tick:i}=this.place(t);if(o>=0&&o>this.through){this.through=o;const s=H*R,r=Math.min(this.lapTicks,Math.max(s,Math.ceil(Math.max(1,i)/s)*s)),l=this.commit(o,r);l&&n.push(l)}return this.drafts.clear(),n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:i}=this.place(n.beat);if(o<0||!n.take||this.passes.some(d=>d.events.some(p=>p.kind==="take"&&p.take===n.take)))return this.stats.ignored++,null;const s=Math.max(0,Math.min(this.lapTicks-1,i)),r=Math.max(1,Math.min(this.lapTicks-s,Math.round(n.lengthBeats*R))),l={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+s,len:r};Array.isArray(n.peaks)&&n.peaks.length&&(l.peaks=n.peaks.slice(0,si).map(d=>Number.isFinite(d)?Math.round(Math.max(0,Math.min(1,d))*100)/100:0)),this.drafts.set(-1-o,{lap:o,events:[l],count:1});const c=this.commitDraft(-1-o,o,this.lapTicks);return c&&this.stats.taken++,c}isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,o){const i=this.drafts.get(n),s=this.lapStart-o;if(this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),i){for(const r of i.events)r.at+=s;i.lap=0,this.drafts.set(0,i)}}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,o){const i=this.drafts.get(t);if(this.drafts.delete(t),!i||i.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=i.count,null;const s=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=i.events.filter(d=>d.at-r<o),c={id:`p${s}-${this.now().getTime().toString(36)}`,n:s,name:`Pass ${s}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?Z(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:n}=this.place(t),o=this.drafts.get(n);if(o&&o.count>0){this.drafts.delete(n);for(const[l,c]of this.held)o.events.includes(c.ev)&&this.held.delete(l);const r={kind:"lap",draft:o};return this.redoStack.push(r),r}const i=this.passes.pop();if(!i)return null;const s={kind:"pass",pass:i};return this.redoStack.push(s),s}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const s=this.passes.findIndex(r=>r.n>n.pass.n);return s<0?this.passes.push(n.pass):this.passes.splice(s,0,n.pass),n}const{lap:o}=this.place(t);if(n.draft.lap===o||n.draft.lap>this.through){const s=this.drafts.get(n.draft.lap);if(s)for(const r of n.draft.events)Ia(s.events,r);else this.drafts.set(n.draft.lap,n.draft);return s&&(s.count+=n.draft.count),n}this.drafts.set(n.draft.lap,n.draft);const i=this.commit(n.draft.lap,this.lapTicks);return i?{kind:"pass",pass:i}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function Wl(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function Ia(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const ja=.5,Kl=64,lt="draft:",Xl=12,Jl={"1/8":R/2,"1/16":R/4,"1/32":R/8};function Ba(e,t){const n=t?Jl[t.grid]:void 0;if(!t||!n)return e;const o=Math.round(e/n)*n;return Math.round(e+(o-e)*t.strength)}function ct(e,t){return e.mute?!1:t?e.solo:!0}const Ra=e=>e.kind==="slot",Kt=e=>e.kind==="take",Ql=.05;class Zl{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.restart()}rebase(t){for(const[n,o]of this.takesSent)o<=t+1e-9&&this.takesSent.delete(n);this.rung=this.rung.filter(n=>!n.pass.startsWith(lt))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;this.silence(t);const n=[...this.takesSent.values()].some(o=>o>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(o=>o.beat<t);for(const[o,i]of this.takesSent)i>t&&this.takesSent.delete(o);for(const[o,i]of this.sounding)this.sounding.set(o,i.filter(s=>s.start<t))}}pump(t,n,o){const i=this.rec,s=[];if(this.waiting.length){const $=[];for(const S of this.waiting){if(i.isHeld(S.ev)){$.push(S);continue}if(S.beat>=t)s.push(S);else{const A=Math.min(S.ev.len,this.rec.lapTicks)/R-(t-S.beat);A>.05&&s.push({...S,beat:t,lenBeats:A})}}this.waiting=$}const r=Math.max(this.sentTo,t);if(!(n>r)&&!s.length&&!this.lateTakes(t))return 0;const l=o?.lapTicks??i.lapTicks,c=l/R,d=o?.lapStart??i.lapStart,p=d+l,h=o?.b0??i.b0,w=($,S)=>h+$*c+(S-d)/R,g=$=>$>=d-Ft&&$<p,x=Math.max(0,Math.floor((r-h)/c)-1),b=Math.floor((n-h)/c)+1,u=[],m=($,S,A)=>{const C=A+$.at;if(!g(C))return;const F=w(S,C);F>=r&&F<n&&u.push({inst:$.inst,beat:F,slot:$.slot})},y=[],f=($,S,A,C,F=Number.NEGATIVE_INFINITY,q=Number.POSITIVE_INFINITY)=>{const I=C,D=I+S.at,j=Math.min(D+S.len,I+$.endTick,q),N=Math.max(D,d,F),P=Math.min(j,p);if(P<=N)return;const de=w(A,N),le=w(A,P),pe=`${$.id}|${A}|${I}`;if(this.takesSent.has(pe)||le<=t||de>=n)return;const ye=Math.max(de,t);if(le-ye<Ql)return;const He=(N-D)/R+(ye-de),Oe={type:"take",id:`t${++this.serial}`,beat:ye,take:S.take,lengthBeats:He+(le-ye),gain:Math.max(0,Math.min(1,$.volume))};He>1e-9&&(Oe.offsetBeats=He),this.takesSent.set(pe,le),y.push({inst:S.inst,ev:Oe})},k=i.passes,L=k.some($=>$.solo&&!$.mute),E=($,S,A,C,F,q,I)=>{if(!g(F))return;const D=w(q,F);D>=r&&D<n&&(i.isHeld(C)?this.waiting.push({inst:S,age:A,beat:D,ev:C,velocity:I,pass:$}):s.push({inst:S,age:A,beat:D,ev:C,velocity:I,pass:$}))};for(const $ of k){if(!ct($,L))continue;const S=o?void 0:i.lapOf($),A=S===void 0?0:S+1,C=$.quantize??this.song.quantize,F=ri($,this.song),q=li($,this.song),I=F.length>1?$.endTick:Z(this.song),D=j=>{const N=j+q;return q&&N>=I?N-I:N};for(let j=Math.max(A,x);j<=b;j++)for(const N of F)for(const P of $.events)if(!(P.at>=$.endTick)){if(Ra(P)){m(P,j,N+D(P.at)-P.at);continue}if(Kt(P)){q?(f($,P,j,N+q,N,N+I),f($,P,j,N+q-I,N,N+I)):f($,P,j,N);continue}E($.id,P.inst,$.n,P,N+D(Ba(P.at,C)),j,P.vel*$.volume)}}if(!L)for(const $ of i.drafting())for(let S=Math.max(o?0:$.lap+1,x);S<=b;S++)for(const A of $.events){if(Ra(A)){m(A,S,0);continue}Kt(A)||E(`${lt}${$.lap}`,A.inst,Number.POSITIVE_INFINITY,A,Ba(A.at,this.song.quantize),S,A.vel)}if(this.announceLaps&&!i.full&&!i.paused){const $=[];for(let S=Math.max(0,Math.ceil((r-h)/c));h+S*c<n;S++)$.push({type:"lap",id:`l${++this.serial}`,beat:h+S*c,lengthBeats:c});$.length&&(this.sink.laps($),this.stats.laps+=$.length)}if(this.sentTo=Math.max(this.sentTo,n),y.length){const $=new Map;for(const S of y)$.set(S.inst,[...$.get(S.inst)??[],S.ev]);for(const[S,A]of $)this.sink.controls(S,A);this.stats.takes+=y.length}if(u.length){u.sort((S,A)=>S.beat-A.beat);const $=new Map;for(const S of u){const A=$.get(S.inst)??[];A.push({type:"slot",id:`s${++this.serial}`,beat:S.beat,slot:S.slot}),$.set(S.inst,A)}for(const[S,A]of $)this.sink.controls(S,A);this.stats.slots+=u.length}if(!s.length)return 0;s.sort(($,S)=>$.beat-S.beat||S.age-$.age);const v=new Map;for(const $ of s){const S=$.lenBeats??Math.max(1,Math.min($.ev.len,l))/R;if(!this.voice($.inst,$.beat,$.beat+S,$.age)){this.stats.dropped++;continue}const A={note:$.ev.note,velocity:Math.max(.01,Math.min(1,$.velocity)),startBeat:$.beat,lengthBeats:S,spanBeats:S,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:$.ev.note};$.ev.slice!==void 0&&(A.slice=$.ev.slice),this.rung.push({inst:$.inst,pass:$.pass,note:A});const C=v.get($.inst)??[];C.push(A),v.set($.inst,C)}let T=0;for(const[$,S]of v)this.sink.send($,S),T+=S.length;return this.stats.sent+=T,T}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-Kl),!this.rung.length||!this.sink.release)return;const n=this.rec.passes,o=n.some(c=>c.solo&&!c.mute),i=new Map(n.map(c=>[c.id,c])),s=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(lt)){const p=Number(c.slice(lt.length));if(s.has(p))return!o;const h=n.find(w=>this.rec.lapOf(w)===p);return!!h&&ct(h,o)}const d=i.get(c);return!!d&&ct(d,o)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,o=Math.floor((t-n.b0)/n.lapBeats),i=n.passes.some(s=>s.solo&&!s.mute);return n.passes.some(s=>{if(!ct(s,i)||!s.events.some(Kt))return!1;const r=n.lapOf(s);return r===void 0||o>r})}voice(t,n,o,i){const s=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(s.length>=Xl){let r=0;for(let l=1;l<s.length;l++)s[l].age<s[r].age&&(r=l);if(i<=s[r].age)return this.sounding.set(t,s),!1;s.splice(r,1)}return s.push({start:n,end:o,age:i}),this.sounding.set(t,s),!0}}const ec={running:!1,beatAt:()=>0,timeAt:()=>0};class tc{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];constructor(t,n){this.session=t,this.deps=n,this.rec=new Yl({song:t.song,b0:0,passes:t.passes,now:n.date}),this.replay=n.sink?new Zl(this.rec,n.sink):null;const o=n.host;o?.clock&&this.offs.push(o.clock.onChange(i=>this.clockChanged(i))),o?.onPlayed&&this.offs.push(o.onPlayed((i,s)=>this.played(i,s))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],i=>(i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??ec}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(St,Math.max(At,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,je(n)),this.changed())}toggle(){this.jamming||this.wantJam?this.stop():this.jam()}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.transport.running){const o=Math.ceil(this.beatNow()/H+.05)*H;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}begin(t){this.wantJam=!1,this.jamming=!0;const n=t+this.session.song.countInBars*H;if(this.rec.resume(n),this.replay?.start(),this.transport.running){const o=Math.min(t,this.beatNow());this.replay?.pump(o,this.transport.beatAt(this.deps.now()+ja))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,n)}showCountIn(t,n){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||n<=t)return;const i=this.transport,s=l=>o.mapper?.toContextTime(i.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(s(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%H===0),until:s(n)})}catch{}}stop(){const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null),this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){t.kind==="start"&&this.wantJam?this.begin(typeof t.beat=="number"?t.beat:0):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),this.changed(!1)}played(t,n){if(!this.jamming)return;const o=this.rec.played(t,n);o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),n!==this.lastLap&&(this.lastLap=n,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const s=this.rec.seam(t),r=this.pending;if(r&&t>=r.seam){this.pending=null;const d=this.rec.lapStart,p=this.rec.place(t).lap;this.applyLoop(r.loop),this.rec.rebase(r.seam,p,d),this.replay?.rebase(r.seam),this.lastLap=-1,this.changed()}const l=this.transport.beatAt(this.deps.now()+ja),c=this.pending;if(c&&l>c.seam){this.replay?.pump(t,c.seam);const d=$n({bars:this.session.song.bars,...c.loop?{loop:c.loop}:{}});this.replay?.pump(Math.max(t,c.seam),l,{b0:c.seam,lapStart:d.start,lapTicks:d.length})}else this.replay?.pump(t,l);return s.length?(this.changed(),!0):o}view(){const t=this.session,n=this.transport,o=this.jamming&&n.running?this.beatNow():null,i=o===null?null:this.rec.place(o),s=o!==null&&o<this.rec.b0,r=t.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,l=this.deps.host?.studioTransport?.bpm(),c=this.jamming?s?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:c,jamming:this.jamming||this.wantJam,bar:i&&!s?Math.floor((this.rec.lapStart+i.tick)/(H*960))+1:null,songPos:i&&!s?(this.rec.lapStart+i.tick)/Z(t.song):null,pendingLoop:this.pending?.loop,nextPass:r,countIn:s&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!s?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof l=="number"&&Math.round(l)!==t.song.bpm?Math.round(l):null,notice:this.notice}}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const o=Math.max(1,Math.min(je(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=o;else if(o>n.bars&&t.grow){n.bars=o;const i=Z(n);for(const s of this.session.passes)s.endTick<i&&s.repeat===void 0&&(s.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let o=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),c=Math.max(l,Math.min(n.bars,Math.round(t.to)));o=l===1&&c===n.bars?null:{from:l,to:c}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(o),this.changed();return}const i=this.beatNow(),{lap:s}=this.rec.place(i),r=this.rec.beatOf(Math.max(s+1,0),0);this.pending={loop:o,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const o=this.pass(t);if(o){if(n.name!==void 0){const i=n.name.replace(/\s+/g," ").trim().slice(0,De);o.name=i||`Pass ${o.n}`}if(n.kept!==void 0&&(o.kept=n.kept),n.mute!==void 0&&(o.mute=n.mute),n.solo!==void 0&&(o.solo=n.solo),n.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&o.endTick<Z(this.session.song)&&(o.repeat=n.repeat),n.shift!==void 0){const i=Math.max(-yn,Math.min(yn,Math.round(n.shift)||0));i?o.shift=i:delete o.shift}n.quantize===null?delete o.quantize:n.quantize&&(o.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(i=>i.id===t);if(n<0)return null;const[o]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),o?{pass:o,index:n}:null}restorePass(t,n){const o=this.session.passes;return o.length>=re||o.some(i=>i.id===t.id)?!1:(o.splice(Math.min(Math.max(0,n),o.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){this.jamming&&this.stop();const t=di(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.use(t),this.changed(),t}openSession(t){this.jamming&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,Vn);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.notice=""}get passCount(){return this.session.passes.length}get maxPasses(){return re}dispose(){for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const nc="netcomposer-looper",ie="sessions",ac="netcomposer.looper.current.v1",oc=500;function ic(e){return new Promise((t,n)=>{const o=e.open(nc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(ie)||o.result.createObjectStore(ie,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}function Ha(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function sc(e={}){const t=e.idb===void 0?Oa(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?Oa(()=>globalThis.localStorage):e.local,o=e.currentKey??ac;let i=null;const s=()=>t?(i??=ic(t),i):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=u=>{try{n?.setItem(o,u)}catch{}},h=async u=>{const f=(await s()).transaction(ie,"readonly").objectStore(ie).get(u);return new Promise((k,L)=>{f.onsuccess=()=>k(f.result),f.onerror=()=>L(f.error)})},w=u=>{const m=c.then(async()=>{const f=(await s()).transaction(ie,"readwrite");u(f.objectStore(ie)),await Ha(f)});return c=m.catch(()=>{d++}),m.then(()=>!0,()=>!1)},g=async u=>{if(!t||!u)return null;try{const m=await h(u);return m===void 0?null:Un(m)}catch{return null}},x=u=>{const m=structuredClone(u);c=c.then(async()=>{const f=(await s()).transaction(ie,"readwrite");f.objectStore(ie).put(m),await Ha(f),p(m.id)}).catch(()=>{d++})},b=()=>{l&&clearTimeout(l),l=null;const u=r;r=null,u&&x(u)};return{async load(){let u=null;try{u=n?.getItem(o)??null}catch{u=null}return u?g(u):null},get:g,setCurrent:p,async list(){if(!t)return[];b(),await c;let u=[];try{const f=(await s()).transaction(ie,"readonly").objectStore(ie).getAll();u=await new Promise((k,L)=>{f.onsuccess=()=>k(f.result),f.onerror=()=>L(f.error)})}catch{return[]}return lc(u)},async rename(u,m){const y=kn(m);if(!t||!y)return!1;b(),await c;let f;try{f=await h(u)}catch{return!1}return!f||typeof f!="object"?!1:w(k=>k.put({...f,name:y}))},async remove(u){return t?(r?.id===u&&(l&&clearTimeout(l),l=null,r=null),w(m=>m.delete(u))):!1},async adopt(u){const m=await g(u.id);if(m&&"session"in m&&rc(m.session,u))return m.session;const y=m===null?structuredClone(u):{...structuredClone(u),id:ci(),name:kn(`${u.name} (scene)`)||u.name};if(!await w(k=>k.put(y)))throw new Error("not saved");return y},save(u,m=!1){if(r=u,m){b();return}l||(l=setTimeout(b,oc))},async flush(){b(),await c},get failures(){return d}}}function kn(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,Vn):""}function rc(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function lc(e){const t=[];for(const o of e){if(!o||typeof o!="object")continue;const i=o;if(typeof i.id!="string"||!i.id)continue;const s=Un(o);if("session"in s){const r=s.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=i.song;t.push({id:i.id,name:kn(i.name)||"Untitled song",passes:Array.isArray(i.passes)?i.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof i.updatedAt=="string"?i.updatedAt:"",error:s.error})}}const n=o=>{const i=Date.parse(o.updatedAt);return Number.isNaN(i)?0:i};return t.sort((o,i)=>n(i)-n(o))}const cc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function dc(e,t=new Date){const n=new Date(e),o=n.getTime();if(Number.isNaN(o))return"";const i=t.getTime()-o;if(i>=0&&i<6e4)return"just now";if(i>=0&&i<36e5)return`${Math.floor(i/6e4)} min ago`;const s=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${s}`;if(l===1)return`yesterday ${s}`;const c=`${cc[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?c:`${c}, ${n.getFullYear()}`}function pc(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],o=dc(e.updatedAt,t);return o&&n.push(o),n.join(" · ")}function Oa(e){try{return e()??null}catch{return null}}const uc=4e3;function V(e,t={},...n){const o=document.createElement(e);for(const[i,s]of Object.entries(t))o.setAttribute(i,s);return o.append(...n),o}function hc(e){const t=V("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=V("div",{class:"lp-songs-list",role:"none"}),o=V("div",{class:"lp-songs-msg",role:"status"});o.hidden=!0;const i=V("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,o,V("div",{class:"lp-songs-sep",role:"separator"}),V("div",{class:"lp-songs-note"},e.note)),s=V("span",{class:"lp-songs-wrap"},t,i);let r=null,l=null;const c=()=>s.hasAttribute("data-open"),d=E=>{o.textContent=E,o.hidden=!E},p=()=>[...n.querySelectorAll(".lp-song-main")],h=E=>E?.closest(".lp-song")??null,w=E=>[...E.querySelectorAll('[role="menuitem"]')],g=(E,v="main")=>{((E?n.querySelector(`.lp-song[data-song="${CSS.escape(E)}"]`):null)?.querySelector(`.lp-song-${v}`)??p()[0]??t).focus({preventScroll:!0})},x=()=>{if(!r)return;clearTimeout(r.timer);const E=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);E&&(E.textContent="Delete",E.removeAttribute("data-lp-ask")),r=null};async function b(E){const v=await e.list(),T=e.openId(),$=e.now?.()??new Date;x(),l=null,n.replaceChildren(...v.map(S=>{const A=S.id===T,C=`${pc(S,$)}${A?" · open":""}${S.error?" · doesn't open":""}`,F=V("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${S.id}`,"aria-label":`${S.name}, ${C}`},V("span",{class:"lp-song-name"},S.name),V("span",{class:"lp-song-sub"},C));A&&F.setAttribute("aria-current","true"),F.addEventListener("click",()=>void u(S));const q=V("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${S.id}`,"aria-label":`Rename ${S.name}`},"Rename");q.addEventListener("click",()=>m(S)),S.error&&(q.disabled=!0);const I=V("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${S.id}`,"aria-label":`Delete ${S.name}`},"Delete");I.addEventListener("click",()=>void y(S,I));const D=V("div",{class:"lp-song",role:"none","data-song":S.id},F,V("span",{class:"lp-song-acts",role:"none"},q,I));return A&&D.setAttribute("data-open",""),D})),v.length||n.append(V("div",{class:"lp-songs-empty"},"No songs yet.")),E&&g(E.id,E.part)}async function u(E){if(E.id===e.openId()){k(!0);return}const v=await e.open(E.id);if(v){d(v);return}k(!0)}function m(E){const v=n.querySelector(`.lp-song[data-song="${CSS.escape(E.id)}"]`),T=v?.querySelector(".lp-song-main"),$=T?.querySelector(".lp-song-name");if(!v||!T||!$)return;x(),l=E.id;const S=V("input",{class:"lp-name-input lp-song-input",value:E.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${E.id}`});S.value=E.name;let A=!1;const C=async F=>{if(A)return;A=!0,l=null;const q=S.value.replace(/\s+/g," ").trim();F&&q&&q!==E.name&&await e.rename(E.id,q),await b({id:E.id,part:"rename"})};S.addEventListener("keydown",F=>{F.stopPropagation(),F.key==="Enter"?(F.preventDefault(),C(!0)):F.key==="Escape"&&(F.preventDefault(),C(!1))}),S.addEventListener("blur",()=>void C(!0)),v.setAttribute("data-renaming",""),v.insertBefore(S,T),S.focus(),S.select()}async function y(E,v){if(r?.id!==E.id){x(),v.textContent="Press again to delete",v.setAttribute("data-lp-ask",""),r={id:E.id,timer:setTimeout(x,uc)};return}x();const T=p().findIndex(A=>h(A)?.dataset.song===E.id);await e.remove(E.id),await b();const $=p();($[Math.min(Math.max(T,0),$.length-1)]??t).focus({preventScroll:!0})}async function f(){c()||(s.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",L,!0)),d(""),await b({id:e.openId()})}function k(E=!1){c()&&(x(),s.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",L,!0),d(""),E&&t.focus({preventScroll:!0}))}function L(E){s.contains(E.target)||k()}return t.addEventListener("click",()=>c()?k():void f()),t.addEventListener("keydown",E=>{(E.key==="ArrowDown"||E.key==="ArrowUp")&&(E.preventDefault(),f().then(()=>{const v=p();(E.key==="ArrowUp"?v[v.length-1]:v[0])?.focus({preventScroll:!0})}))}),i.addEventListener("keydown",E=>{if(l)return;const v=p(),T=document.activeElement,$=h(T),S=v.findIndex(C=>h(C)===$);let A;if(E.key==="ArrowDown")A=v[(S+1)%v.length];else if(E.key==="ArrowUp")A=v[(S-1+v.length)%v.length];else if(E.key==="Home")A=v[0];else if(E.key==="End")A=v[v.length-1];else if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(!$)return;const C=w($).filter(I=>!I.disabled),F=C.indexOf(T),q=E.key==="ArrowRight"?1:-1;A=C[Math.min(C.length-1,Math.max(0,F+q))]}else if(E.key==="Escape"){E.preventDefault(),E.stopPropagation(),k(!0);return}else if(E.key==="Tab"){k(!1);return}else return;E.preventDefault(),A?.focus({preventScroll:!0})}),{el:s,button:t,open:f,close:k,isOpen:c,async refresh(){c()&&!l&&await b()}}}const pi=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let Te;function mc(){if(Te!==void 0)return Te;Te=null;try{Te=pi()?.attach("looper",{instance:1})??null}catch{Te=null}return Te}function fc(){return pi()?.countIn??null}function gc(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const bc="netcomposer.looper.hidden.v1",wc=50;function M(e,t={},...n){const o=document.createElement(e);for(const[i,s]of Object.entries(t))s!==void 0&&o.setAttribute(i,s);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const X=e=>({[Ze]:Hn(e)||void 0});function W(e,t,n){const o=M("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function Ge(e,t){return M("span",{class:"nc-label",...t?X(t):{}},e)}function ui(e,t,n,o,i,s=!1){const r=M("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=W(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});c.disabled=s,r.append(c)}return r}function Tt(e,t,n,o,i,s="lp-toggle"){return W(t,{class:s,"aria-pressed":String(n),"data-lp-id":e,...X(o)},i)}function Gn(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function hi(e,t,n){const o=M("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),s=Bl(i(),bc),r=()=>{const l=s.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return r(),{handle:s,mount:o,update(){s.update(i()),r()}}}const J=mc(),Y=sc({currentKey:J?.storageKey?.("netcomposer.looper.current.v1")}),Le=await Y.load();let mi="",En;Le&&"session"in Le?En=Le.session:(Le&&"error"in Le&&(mi=`Your last song didn't open: ${Le.error}. A new one is started.`),En=di(J?.studioTransport?.bpm()??120));function xc(){let e=null;try{e=J?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,o=i=>{n.has(i)||(n.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,s){o(i),t.send(s,i)},controls(i,s){o(i),t.sendControls(s,i)},laps(i){let s=[];try{s=(J?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{s=[]}for(const r of s)o(r),t.sendControls(i,r)},off(i){t.off(i===void 0?"stop":"restart",i)},release(i,s){n.has(i)&&t.release?.(s,i)},restart(){t.restart()}}}const z=new tc(En,{host:J,countIn:fc(),load:gc,now:Di,save:e=>Y.save(e),sink:xc()});z.notice=mi;addEventListener("pagehide",()=>Y.save(z.session,!0));let et=null;const fi=document.getElementById("app");fi.classList.add("nc","nc-page");Fl();const gi=M("header",{class:"nc-page-hd"},M("div",{},M("h1",{class:"nc-page-title"},M("span",{class:"lp-brand"},"LUPA")," ",M("span",{class:"nc-page-sep"},"/")," LOOPER ",M("span",{class:"nc-page-sep"},"/")," ",M("span",{class:"nc-mono"},"01")),M("p",{class:"nc-page-sub"},"A NetComposer element.")),M("div",{class:"nc-page-actions"},kc(),W("New song",{class:"nc-page-action","data-lp-id":"new-song",...X("new-song")},()=>vc()))),bi=M("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),wi=M("footer",{class:"lp-foot lp-sub"},M("span",{class:"lp-notice",role:"status"}),M("span",{class:"lp-mono"},"netcomposer.looper.01"));fi.append(gi,M("main",{class:"nc-page-body"},bi),wi);let Ce=null;function yc(){return gi.querySelector('[data-lp-id="new-song"]')}function Xt(e){const t=yc();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function vc(){if(z.passCount&&!Ce){Xt(!0),Ce=setTimeout(()=>{Ce=null,Xt(!1)},4e3);return}Ce&&clearTimeout(Ce),Ce=null,Xt(!1),xi(),z.notice="New song started. The last one stays in Songs.",te()}function xi(){z.newSong(),Me=null,G="all"}function $c(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function kc(){return et=hc({list:()=>Y.list(),openId:()=>z.session.id,open:_a,async rename(e,t){e===z.session.id?z.rename(t):await Y.rename(e,t)},async remove(e){if(e===z.session.id){z.jamming&&z.stop(),await Y.flush();const t=(await Y.list()).find(o=>o.id!==e&&!o.error);(t?await _a(t.id):"no song")&&xi(),z.notice="Song deleted."}await Y.remove(e),te()},note:J?`Songs save as you play, in this browser. Save the Studio’s scene (${$c()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),et.el}async function _a(e){if(z.jamming)return"Stop jamming to open another song.";await Y.flush();const t=await Y.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(z.openSession(t.session),Y.setCurrent(t.session.id),Me=null,G="all",z.notice=`“${t.session.name}” is open.`,te(),null):"That song isn't in this browser any more."}function Ec(){et?.button.setAttribute(Ze,Hn("songs").replace("{name}",z.session.name))}const yi=M("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),ge=J?.metronome,vi=kl({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((ge?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>ge?.set({volume:e/100})});vi.el.setAttribute(Ze,Hn("volume"));ge?.onChange(()=>te());function Va(e,t,n,o,i,s=!1){const r=M("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e});for(const l of n){const c=M("option",{value:l.value},l.label);l.value===o&&(c.selected=!0),r.append(c)}return r.disabled=s,r.addEventListener("change",()=>i(r.value)),r}let fe=null;function Ac(e){if(fe===null)return null;const t=e.session.song,n=fe*H*R,o=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),i=o.length?Math.max(...o.map(l=>Math.floor(n/l.endTick))):fe/t.bars,s=l=>{const c=fe;fe=null,l&&c&&z.setSong({bars:c,grow:l}),te()},r=o.length;return M("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},M("span",{class:"lp-ask-title"},`Grow to ${fe} bars?`),M("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),W(`Repeat ×${Math.max(2,Math.round(i))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>s("repeat")),W("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>s("once")),W("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>s(null)))}function Sc(e){const t=e.session.song,n=[1,2,4,8,16].filter(i=>i<=je(t.bpm)&&(!e.locked||i>=t.bars)),o=t.quantize;Gn(yi,M("h3",{class:"lp-section-title"},"Setup"),M("div",{class:"lp-field"},Ge("Tempo","tempo"),M("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?M("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?M("span",{class:"lp-sub"},"Locked: the song has passes."):M("span",{class:"lp-sub"},"Follows the Studio.")),M("div",{class:"lp-field"},Ge("Length","bars"),ui("bars","Bars",n.map(i=>({value:String(i),label:String(i)})),String(fe??t.bars),i=>{const s=Number(i);e.locked&&s>t.bars?(fe=s,te()):z.setSong({bars:s})},e.jamming),Ac(e)??M("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${Ul(t)}`)),M("div",{class:"lp-row lp-toggles"},Tt("count-in","Count-in",t.countInBars===1,"count-in",()=>z.setSong({countInBars:t.countInBars?0:1})),ge?Tt("metronome","Metronome",ge.prefs().on,"metronome",()=>ge.set({on:!ge.prefs().on})):null),ge?vi.el:null,M("div",{class:"lp-pair"},M("label",{class:"lp-field"},Ge("Quantize","quantize"),Va("quantize","Quantize",_n.map(i=>({value:i,label:i==="off"?"Off":i})),o?.grid??"off",i=>z.setSong({quantize:i==="off"?null:{grid:i,strength:o?.strength??1}}))),M("label",{class:"lp-field"},Ge("Strength","strength"),Va("strength","Strength",ii.map(i=>({value:String(i),label:`${Math.round(i*100)}%`})),String(o?.strength??1),i=>o&&z.setSong({quantize:{grid:o.grid,strength:Number(i)}}),!o))))}const $i=hi("jam","Jam",()=>{const e=z.view(),t=e.session.song.loop,n=t?`loop ${Be(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${z.passCount} / ${re} passes`});function Be(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const Mc="http://www.w3.org/2000/svg",U=(e,t)=>{const n=document.createElementNS(Mc,e);for(const[o,i]of Object.entries(t))n.setAttribute(o,i);return n},tt=44,An=2*Math.PI*tt,ki=U("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),Ei=U("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(tt),"stroke-width":"3","stroke-dasharray":`0 ${An}`,transform:"rotate(-90 50 50)"}),gt=U("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});ki.append(U("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(tt),"stroke-width":"1"}),Ei,gt);const Ai=M("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Si=M("span",{class:"lp-pass","data-lp-id":"pass"}),Tc=M("div",{class:"lp-ring"},ki,M("div",{class:"lp-ring-mid"},Ai,Si));function Mi(e){const t=e.lapPos??0;Ei.setAttribute("stroke-dasharray",`${t*An} ${An}`);const n=t*2*Math.PI;gt.setAttribute("cx",String(50+tt*Math.sin(n))),gt.setAttribute("cy",String(50-tt*Math.cos(n))),gt.style.visibility=e.lapPos===null?"hidden":"visible";const o=e.session.song.loop;Ai.textContent=e.countIn!==null?String(e.countIn):o?e.bar!==null?`${e.bar} · ${Be(o)}`:Be(o):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const i=e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${re} / ${re}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;Si.replaceChildren(...e.phase==="recording"?[M("span",{class:"lp-dot","aria-hidden":"true"})]:[],i)}function Lc(e){const t=W(e.jamming?"STOP":"JAM",{class:"nc-btn lp-big","data-lp-id":"jam",...X(e.jamming?"stop":"jam"),...e.jamming?{}:{"data-jam":""}},()=>z.toggle());t.disabled=!J;const n=W("UNDO",{class:"nc-btn","data-lp-id":"undo",...X("undo")},()=>z.undo());n.disabled=!e.lapHasNotes&&!z.passCount;const o=W("REDO",{class:"nc-btn","data-lp-id":"redo",...X("redo")},()=>z.redo());o.disabled=!e.canRedo,Mi(e);const i=e.session.song.loop,s=e.pendingLoop,r=s!==void 0?M("p",{class:"lp-sub","data-lp-id":"loop-next"},s?`Loop ${Be(s)} from the next lap.`:"Loop off from the next lap."):null,l=i&&s===void 0?M("div",{class:"lp-loop-line"},M("span",{},`Loop ${Be(i)}`),W("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...X("loop-off")},()=>z.setLoop(null))):null;Gn($i.mount,M("div",{class:"lp-jam-stack"},Tc,t,M("div",{class:"lp-two"},n,o),l,r,J?null:M("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),yi)}const Nt=hi("passes","Passes",()=>`${z.passCount} / ${re}`);let Me=null,G="all",dt={at:0,bar:0};const Cc={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},qt={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},Dt=e=>e.split("#")[0]??e,zc=e=>qt[Dt(e)]?.noun[0]==="hit",Ti=e=>e.kind!=="slot"&&e.kind!=="take";function Xe(e){const[t=e,n]=e.split("#"),o=Cc[t]??t.toUpperCase();return n?`${o} ${n}`:o}function Fc(e,t){const n=new Map;for(const i of e.events)i.inst===t&&Ti(i)&&i.name&&n.set(i.name,(n.get(i.name)??0)+1);const o=[...n].sort((i,s)=>s[1]-i[1]).map(([i])=>i);return o.length?o.length===1?o[0]:`${o[0]} +${o.length-1}`:""}function Ua(e,t){let n=0,o=0,i=0;for(const c of e.events)c.inst===t&&(c.kind==="slot"?o++:c.kind==="take"?i++:n++);const[s,r]=qt[Dt(t)]?.noun??["note","notes"],l=[];return i&&l.push(i===1?"voice":`${i} takes`),n&&l.push(`${n} ${n===1?s:r}`),o&&l.push(`${o} slot ${o===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Yn=new Map,Nc=1;function qc(e,t){const n=t.bars,o=R,i=Z(t),s=ri(e,t),r=li(e,t),l=s.length>1?e.endTick:i,c=A=>r&&A+r>=l?A+r-l:A+r,d=t.loop,p=d?(d.from-1)*H*R:0,h=d?d.to*H*R:i,w=(A,C)=>(C>0?.45:1)*(A>=p-Ft&&A<h?1:.35),g=1e3,x=34,b=U("svg",{class:"lp-strip",viewBox:`0 0 ${g} ${x}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&b.append(U("rect",{class:"lp-strip-loop",x:String(p/i*g),y:"0",width:String((h-p)/i*g),height:String(x)}));const u=n*H;for(let A=1;A<u;A++){const C=String(A*g/u);A%H!==0&&n>8||b.append(A%H===0?U("line",{class:n>8&&A%(4*H)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:C,x2:C,y1:"0",y2:String(x)}):U("line",{class:"lp-strip-beat",x1:C,x2:C,y1:String(x/2-2),y2:String(x/2+2)}))}const m=e.events.filter(Ti),y=[],f=o/4*Nc,k=new Set(m.filter(A=>zc(A.inst)).map(A=>A.inst)),L=new Map,E=[...new Set(m.filter(A=>k.has(A.inst)).map(A=>A.note))].sort((A,C)=>C-A);E.length>=2&&E.length<=4&&E.forEach((A,C)=>L.set(A,C));const v=m.filter(A=>!k.has(A.inst)).map(A=>A.note);let T=Math.min(...v)-2,$=Math.max(...v)+2;if($-T<12){const A=($+T)/2;T=A-6,$=A+6}for(const A of s)for(const C of m){const F=A+c(C.at);if(F>=i||C.at>=e.endTick)continue;const q=F/i*g,I=((.35+.65*C.vel)*w(F,A)).toFixed(2);if(k.has(C.inst)){const D=L.get(C.note);let j,N;if(D===void 0){const P=4+C.vel*9;j=x/2-P,N=x/2+P}else{const P=6+D*(x-12)/Math.max(1,L.size-1);j=P-3,N=P+3}b.append(U("line",{class:"lp-strip-hit",x1:q.toFixed(1),x2:q.toFixed(1),y1:j.toFixed(1),y2:N.toFixed(1),"stroke-opacity":I})),y.push(F/i,Math.min(1,(F+f)/i))}else{const D=Math.min(i,F+Math.max(1,C.len))/i*g,j=(4+(1-(C.note-T)/($-T))*(x-8)).toFixed(1);b.append(U("line",{class:"lp-strip-note",x1:q.toFixed(1),x2:Math.max(q+.1,D-2).toFixed(1),y1:j,y2:j,"stroke-opacity":I})),y.push(F/i,Math.min(1,(F+Math.max(f,C.len))/i))}}const S=A=>r?[{base:A+r,lo:A,hi:A+l},{base:A+r-l,lo:A,hi:A+l}]:[{base:A,lo:A,hi:i}];for(const A of s)for(const C of S(A))for(const F of e.events){if(F.kind!=="take")continue;const q=C.base+F.at,I=Math.min(i,q+F.len,C.base+e.endTick,C.hi),D=Math.max(q,C.lo);if(D>=i||I<=D)continue;const j=D/i*g,N=I/i*g,P=F.peaks?.length?F.peaks:[.35,.35],de=Math.floor((D-q)/F.len*(P.length-1)),le=Math.ceil((I-q)/F.len*(P.length-1)),pe=P.slice(Math.max(0,de),Math.max(de+2,le+1)),ye=pe.length>=2?pe:[.35,.35],He=ye.length,Oe=x/2,Fi=ve=>Math.max(.6,ve*(x/2-2)),Kn=ye.map((ve,_e)=>[j+(N-j)*_e/Math.max(1,He-1),Fi(ve)]),Ni=Kn.map(([ve,_e])=>`${ve.toFixed(1)},${(Oe-_e).toFixed(1)}`),qi=[...Kn].reverse().map(([ve,_e])=>`${ve.toFixed(1)},${(Oe+_e).toFixed(1)}`);b.append(U("path",{class:"lp-strip-voice",d:`M${Ni.join(" L")} L${qi.join(" L")} Z`,opacity:w(D,A).toFixed(2)})),y.push(D/i,Math.min(1,(D+F.len)/i))}for(const A of s)for(const C of e.events){if(C.kind!=="slot"||A+c(C.at)>=i)continue;const F=((A+c(C.at))/i*g).toFixed(1);b.append(U("line",{class:"lp-strip-slot",x1:F,x2:F,y1:"0",y2:String(x)}))}if(e.endTick<i&&!e.repeat){const A=(c(e.endTick)/i*g).toFixed(1);b.append(U("line",{class:"lp-strip-end",x1:A,x2:A,y1:"8",y2:String(x-8)}))}return Yn.set(e.id,Float32Array.from(y)),b}function pt(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const Re={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function Wn(e){const t=U("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(U("path",{d:e})),t}function Lt(e,t,n,o,i){const s=W("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...o},i);return s.append(Wn(n)),s}let Ga=null;function Dc(e){Me===e.id&&(Me=null);const t=z.deletePass(e.id);if(!t)return;Ga?.close();const n=Ll({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>z.restorePass(t.pass,t.index),anchor:Nt.mount});n.el.setAttribute("data-lp-id","delete-toast"),Ga=n}function Pc(e,t){const n=z.session.song,o=H*n.ppq,i=Me===e.id,s=[...new Set(e.instruments)],r=W("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(i)},()=>{Me=i?null:e.id,te()}),l=M("span",{class:"lp-pass-line"},M("span",{class:"lp-pass-title"},e.name));for(const b of s)l.append(M("span",{class:"lp-inst","data-inst":qt[Dt(b)]?.token??""},Xe(b)));const c=[];for(const b of s){const u=Fc(e,b);c.push(u?`${u} · ${Ua(e,b)}`:Ua(e,b))}s.length||c.push("Empty"),e.mute&&c.push("muted"),r.append(M("span",{class:"lp-now","aria-hidden":"true"}),M("span",{class:"lp-pass-text"},l,M("span",{class:"lp-pass-sub"},c.join(" · "))));const d=M("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...X("pass-volume")});d.value=String(Math.round(e.volume*100));const p=M("span",{class:"lp-db","data-lp-id":`db-${e.id}`},pt(e.volume));d.style.setProperty("--lp-fill",`${d.value}%`),d.setAttribute("aria-valuetext",pt(e.volume)),d.addEventListener("input",()=>{const b=Number(d.value)/100;p.textContent=pt(b),d.style.setProperty("--lp-fill",`${d.value}%`),d.setAttribute("aria-valuetext",pt(b)),z.editPass(e.id,{volume:b})});const h=M("div",{class:"lp-ms-pair"},Tt(`mute-${e.id}`,"M",e.mute,"mute",()=>z.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),Tt(`solo-${e.id}`,"S",e.solo,"solo",()=>z.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));h.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),h.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const w=Lt(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,Re.star,{"aria-pressed":String(e.kept),...X("star")},()=>z.editPass(e.id,{kept:!e.kept})),g=Lt(`delete-${e.id}`,`Delete ${e.name}`,Re.trash,X("delete"),()=>Dc(e)),x=M("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...i?{"data-open":""}:{}},r,M("div",{class:"lp-tools"},Ic(e,n),jc(e,n),h,M("div",{class:"lp-acts"},w,g)),M("div",{class:"lp-strip-box"},qc(e,n),M("span",{class:"lp-head","aria-hidden":"true"})),M("div",{class:"lp-vol"},d,p));if(i){const b=new Set;for(const f of e.events)b.add(Math.floor(f.at/o));const u=M("div",{class:"lp-bars",style:`--lp-bars: ${n.bars}`});for(let f=0;f<n.bars;f++)u.append(M("span",b.has(f)?{"data-on":""}:{},String(f+1)));const m=M("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});m.addEventListener("change",()=>z.editPass(e.id,{name:m.value}));const y=e.quantize;x.append(M("div",{class:"lp-sheet"},m,M("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),M("span",{class:"lp-sub"},`Plays through ${s.map(Xe).join(" and ")||"its instrument"}'s current sound.`),u,M("div",{class:"lp-field"},Ge("Quantize","pass-quantize"),ui(`pq-${e.id}`,"Pass quantize",[{value:"song",label:"Song"},..._n.map(f=>({value:f,label:f==="off"?"Off":f}))],y?.grid??"song",f=>z.editPass(e.id,{quantize:f==="song"?null:{grid:f,strength:y?.strength??1}})))))}return x}function Ic(e,t){const n=e.shift??0,o=Vl(e,t),i=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,s=d=>z.editPass(e.id,{shift:Math.max(-o,Math.min(o,n+d))}),r=Lt(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,Re.earlier,n<=-o?{disabled:""}:{},()=>s(-1)),l=Lt(`shift-later-${e.id}`,`Move ${e.name} a bar later`,Re.later,n>=o?{disabled:""}:{},()=>s(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return M("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${i(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...X("shift")},r,M("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function jc(e,t){const n=Z(t);if(e.endTick>=n)return M("span",{class:"lp-repeat-none","aria-hidden":"true"});const o=Math.ceil(n/e.endTick),i=!!e.repeat,s=Math.round(e.endTick/(H*R)),r=W(i?`×${o}`:"once",{class:"lp-repeat","aria-pressed":String(i),"aria-label":i?`${e.name} repeats every ${s} ${s===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...X("repeat")},()=>z.editPass(e.id,{repeat:!i}));return i&&r.prepend(Wn(Re.loop)),r}function Bc(e){const t=e.session.song,n=t.bars,o=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,i=M("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...X("ruler")}),s=M("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let m=1;m<=n;m++){const y=M("span",o&&m>=o.from&&m<=o.to?{"data-in":""}:{},String(m));r.push(y),s.append(y)}const l=M("div",{class:"lp-ruler-lane"});for(let m=1;m<n;m++)l.append(M("span",{class:"lp-ruler-tick",style:`--lp-at: ${m}`}));const c=M("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=m=>{c.hidden=!m,m&&(c.style.setProperty("--lp-from",String(m.from-1)),c.style.setProperty("--lp-to",String(m.to))),r.forEach((y,f)=>{m&&f+1>=m.from&&f+1<=m.to?y.setAttribute("data-in",""):y.removeAttribute("data-in")})};d(o);const p=M("span",{class:"lp-ruler-hint",role:"status"}),h="Drag across bars to repeat them";let w;const g=m=>{p.textContent=m,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(w),w=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=h,p.hidden=!!t.loop},3e3)},x=m=>{const y=M("button",{type:"button",class:"lp-loop-handle","data-end":m,"aria-label":m==="from"?"Loop start":"Loop end","data-lp-id":`loop-${m}`});return y.addEventListener("keydown",f=>{const k=t.loop;if(!k||f.key!=="ArrowLeft"&&f.key!=="ArrowRight")return;f.preventDefault();const L=f.key==="ArrowLeft"?-1:1,E={...k};m==="from"?E.from=Math.max(1,Math.min(k.to,k.from+L)):E.to=Math.min(n,Math.max(k.from,k.to+L)),z.setLoop(E)}),y.addEventListener("pointerdown",f=>{const k=o;k&&(f.stopPropagation(),u(f,L=>m==="from"?{from:Math.min(L,k.to),to:k.to}:{from:k.from,to:Math.max(L,k.from)}))}),y};c.append(x("from"),x("to"));const b=m=>{const y=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((m-y.left)/Math.max(1,y.width)*n)+1))},u=(m,y)=>{if(e.jamming&&!J){g("Stop jamming to change the loop");return}i.setPointerCapture?.(m.pointerId),i.setAttribute("data-dragging","");const f=b(m.clientX);let k=!1,L=y(f);d(L);const E=T=>{b(T.clientX)!==f&&(k=!0),L=y(b(T.clientX)),d(L)},v=()=>{i.removeEventListener("pointermove",E),i.removeEventListener("pointerup",v),i.removeEventListener("pointercancel",v),i.removeAttribute("data-dragging");for(const S of r)S.removeAttribute("data-hover");const T=performance.now();if(!k&&dt.bar===f&&T-dt.at<450){dt={at:0,bar:0},z.setLoop(null);return}if(dt=k?{at:0,bar:0}:{at:T,bar:f},L.from===1&&L.to===n&&!t.loop){d(void 0),g("That's the whole song. Pick fewer bars.");return}z.setLoop(L)};i.addEventListener("pointermove",E),i.addEventListener("pointerup",v),i.addEventListener("pointercancel",v)};return i.addEventListener("pointerdown",m=>{if(m.button!==0)return;const y=b(m.clientX);u(m,f=>({from:Math.min(y,f),to:Math.max(y,f)}))}),i.addEventListener("pointermove",m=>{if(i.hasAttribute("data-dragging"))return;const y=b(m.clientX);r.forEach((f,k)=>{k+1===y?f.setAttribute("data-hover",""):f.removeAttribute("data-hover")})}),i.addEventListener("pointerleave",()=>{for(const m of r)m.removeAttribute("data-hover")}),p.textContent=h,p.hidden=!!o||n<2,l.append(p,c),i.append(s,l),i}function Rc(e){if(e.length<2)return null;const t=new Map;for(const s of e)for(const r of new Set(s.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(s=>s.kept).length;G!=="all"&&G!=="starred"&&!t.has(G)&&(G="all"),G==="starred"&&!n&&(G="all");const o=(s,r,l,c={})=>{const d=W("",{class:"lp-chip","aria-pressed":String(G===s),"data-lp-id":`filter-${s}`,...c},()=>{G=G===s?"all":s,te()});return d.append(r,M("span",{class:"lp-chip-n"},String(l))),d},i=M("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},o("all","All",e.length));for(const[s,r]of[...t].sort((l,c)=>Xe(l[0]).localeCompare(Xe(c[0]))))i.append(o(s,Xe(s),r,{"data-inst":qt[Dt(s)]?.token??""}));return n&&i.append(o("starred",Wn(Re.star),n,{"aria-label":"Starred"})),i}function Hc(e){const t=e.session.passes,n=t.some(l=>l.solo),o=t.filter(l=>G==="all"?!0:G==="starred"?l.kept:l.instruments.includes(G)),i=M("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&i.append(M("div",{class:"lp-pass-head"},Bc(e))),e.phase==="recording"&&i.append(M("div",{class:"lp-pass-row lp-live","data-live":""},M("span",{class:"lp-pass-name"},M("span",{class:"lp-dot","aria-hidden":"true"}),M("span",{class:"lp-pass-text"},M("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),M("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),Yn.clear();for(const l of[...o].reverse())i.append(Pc(l,n));!t.length&&e.phase!=="recording"?i.append(M("p",{class:"lp-sub"},"No passes yet. Press Jam (or Space) and play.")):t.length&&!o.length&&i.append(M("p",{class:"lp-sub"},"No passes here."));const s=t.filter(l=>!l.kept).length,r=W(`CLEAR UNSTARRED${s?` (${s})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...X("clear-unkept")},()=>z.clearUnkept());r.disabled=!s,Gn(Nt.mount,Rc(t),i,t.length?M("div",{class:"lp-between"},M("span",{class:"lp-row"},r,M("span",{class:"lp-sub"},"Starred passes stay.")),M("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${re}`)):null),Ye=""}let Ye="";function Oc(e){const t=Nt.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),Ye){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");Ye=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const o=e.session.passes.some(l=>l.solo),i=[];for(const l of e.session.passes){if(l.mute||o&&!l.solo)continue;const c=Yn.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){i.push(l.id);break}}}const s=i.join("|");if(s===Ye)return;Ye=s;const r=new Set(i);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const Li=[$i,Nt];Rl(bi,Li.map(e=>e.handle),"adjacent");let Ya="";function Ci(e){const t=e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.session.song.loop?`Lupa · Bar ${e.bar} · loop ${Be(e.session.song.loop)} · Pass ${e.nextPass}`:`Lupa · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,n=`${t}|${e.phase}`;if(n!==Ya){Ya=n;try{J?.readout?.(t),J?.chip?.(e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:z.passCount?{text:`${z.passCount} passes`}:null)}catch{}}}function te(){const e=z.view();Sc(e),Lc(e),Hc(e);for(const n of Li)n.update();const t=wi.querySelector(".lp-notice");t&&(t.textContent=e.notice),Ec(),Ci(e)}z.onChange(te);setInterval(()=>{z.tick()&&te(),z.jamming||z.syncTempo()},wc);function zi(){const e=z.view();e.jamming&&(Mi(e),Ci(e)),Oc(e),requestAnimationFrame(zi)}requestAnimationFrame(zi);te();J?.providePreset?.({format:"nc-song-looper",version:On,get:()=>structuredClone(z.session),async set(e){const t=Un(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;z.jamming&&z.stop(),await Y.flush();const n=await Y.adopt(t.session);z.openSession(n),Y.setCurrent(n.id),Me=null,G="all",z.notice=`“${n.name}” is open, from the Studio’s scene.`,te(),et?.refresh()}});window.__looper={looper:z,store:Y,songs:()=>et,view:()=>z.view(),get hosted(){return!!J}};
