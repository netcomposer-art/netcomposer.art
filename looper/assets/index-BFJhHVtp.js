(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function hi(){return(performance.timeOrigin+performance.now())/1e3}var mi="nc-ui",fi={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},un={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ot={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},gi={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ue={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},bi={light:{color:fi.color,semantic:un,component:ot,runtime:gi},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},De=e=>`--${mi}-${e}`,jt=un["label-on-fill-dark"],zn=un["label-on-fill-light"],xi=ue["label-min-contrast"],wi=/^#[0-9a-f]{6}$/i,yi=e=>typeof e=="string"&&wi.test(e),Ze=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Fn(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=s=>{let r=(s+e/30)%12;return n-o*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Ze(i(0)*255)}${Ze(i(8)*255)}${Ze(i(4)*255)}`}function Ca(e){let[t,n,o]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),i=Math.max(t,n,o),s=Math.min(t,n,o),r=(i+s)/2,l=i-s;if(!l)return{h:0,s:0,l:r};let d=l/(1-Math.abs(2*r-1));return{h:((i===t?60*((n-o)/l%6):i===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:r}}function Nn(e){let[t,n,o]=[1,3,5].map(i=>{let s=parseInt(e.slice(i,i+2),16)/255;return s<=.03928?s/12.92:((s+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function Rt(e,t){let[n,o]=[Nn(e),Nn(t)].sort((i,s)=>s-i);return(n+.05)/(o+.05)}var it=e=>Rt(e,jt)>=Rt(e,zn)?jt:zn;function za(e,t,n,o=xi){let i=Fn(e,t,n),s=it(i)===jt?1:-1;for(let r=0;r<40&&Rt(i,it(i))<o;r++)n+=s*.01,i=Fn(e,t,n);return i}function vi(e){let{h:t,s:n}=Ca(e),o=za(t,Math.min(n,ue["surprise-on-max-saturation"]),ue["surprise-on-lightness"]);return{fill:e,ink:it(e),on:o,onInk:it(o)}}var $i=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function ki(e,t=Math.random){let[n,o]=ue["surprise-saturation"],[i,s]=ue["surprise-lightness"],r=ue["surprise-min-hue-gap"],l=yi(e)?Ca(e).h:null,d=t()*360;return l!==null&&$i(d,l)<r&&(d=(l+r+t()*(360-2*r))%360),za(d,n+t()*(o-n),i+t()*(s-i))}function Ei(e){if(!e)return null;let t=vi(e);return{[De("surprise-fill")]:t.fill,[De("surprise-ink")]:t.ink,[De("surprise-on")]:t.on,[De("surprise-on-ink")]:t.onInk}}var Ai=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Si=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function qn(e){let[t,n,o]=[1,3,5].map(l=>Ai(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),s=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*s-.0040720468*r,1.9779984951*i-2.428592205*s+.4505937099*r,.0259040371*i+.7827717662*s-.808675766*r]}function Mi([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,s=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*s,-1.2684380046*o+2.6097574011*i-.3413193965*s,-.0041960863*o-.7034186147*i+1.707614701*s].map(r=>Ze(Si(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var Li=ue["velocity-range"],Fa={min:ot.rhythm["velocity-min"],max:ot.rhythm["velocity-max"]},Dn=Object.fromEntries(Object.entries(bi).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ti(e,t=Fa){let[n,o]=Li,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,s=(i-n)/(o-n),r=t.ink??ot.rhythm["step-cell-ink"];if(s<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:r};if(s>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:r};let l=qn(t.min),d=qn(t.max);return{velocity:i,t:s,fill:Mi(l.map((c,p)=>c+(d[p]-c)*s)),ink:r}}function Pn(e,t=Fa){return{[De("velocity-fill")]:Ti(e,t).fill}}var Na="data-nc-theme",In="nc-ui-theme-change",Ci="(prefers-color-scheme: dark)",qa=e=>e?.documentElement??null,Da=e=>e?.defaultView?.matchMedia?.(Ci)??null,zi=e=>e==="light"||e==="dark"?e:"system";function Fi(e=globalThis.document){return zi(qa(e)?.getAttribute(Na))}function Ht(e=globalThis.document){let t=Fi(e);return t!=="system"?t:Da(e)?.matches?"dark":"light"}function Pa(e,t=globalThis.document){let n=qa(t);if(!n)return()=>{};let o=Ht(t),i=()=>{let d=Ht(t);d!==o&&(o=d,e(d))},s=t.defaultView?.MutationObserver,r=s?new s(i):null;r?.observe(n,{attributes:!0,attributeFilter:[Na]});let l=Da(t);return l?.addEventListener?.("change",i),t.addEventListener(In,i),()=>{r?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(In,i)}}var Ni={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},qi={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Di={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Pi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},bt={};for(let[e,t]of Object.entries(qi))bt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Pi))bt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Di))bt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Ni.renames.map(e=>[e.old,e.new]));function Ia(e){let t=bt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function N(e){return Ia(e).prop}function a(e){return`var(${N(e)})`}function Ii(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(N(t)));return Number.isFinite(n)?n:0}function j(e,t){let n=Ia(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let s=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=s:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=s:i.style.color=s,(e instanceof Element?e:o.documentElement).append(i);let r=(o.defaultView??window).getComputedStyle(i),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return i.remove(),l}function Ba(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Bi(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var ji="[data-modulated], [data-modulated] *";function Et(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Bn(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Ri(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${N("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${N("divider")}: ${a(`module-div-stack-${o}`)};
      ${N("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${N("text-sub")}: ${a("module-sub-stack-1")};
      ${N("divider")}: ${a("module-div-stack-1")};
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
${ji} { transition: none; }
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
  ${N("text-sub")}: ${a("module-sub-stack-1")};
  ${N("divider")}: ${a("module-div-stack-1")};
  ${N("slider-track")}: ${a("module-div-stack-1")};
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
  ${N("text-sub")}: ${a("module-sub-stack-1")};
  ${N("divider")}: ${a("module-div-stack-1")};
  ${N("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${N("text-sub")}: ${a("module-sub-stack-1")};
  ${N("divider")}: ${a("module-div-stack-1")};
  ${N("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${N("text-sub")}: inherit;
  ${N("divider")}: inherit;
  ${N("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${N("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${N("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${N("divider")}: ${a("strip-divider")}; }
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
${Bn("")}
}
@media (max-width: 1023px) {
${Bn("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Et("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Et("")}
}
@media (max-width: 1023px) {
${Et("html[data-nc-landscape] ")}
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
`}var At=null,Hi="nc-ui-fallback";function ja(e=globalThis.document){if(!e?.documentElement||(e.documentElement,At&&At.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Hi} {
${Ri()}
}
`,e.head.append(t),At=t}var Oi=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,_i=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Oi,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&_i(document);function Ra(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let s=t.createElement("span");s.dataset.ncOff="",s.textContent=e.offText??"Off",o.append(i,s),n.append(o);let r=!1,l=c=>{r=c===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let d=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",d),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ha=new WeakMap,jn=.25;function Vi(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let s=0,r=e.step??.005,l=e.onChange,d=e.onReset,c=m=>Math.min(1,Math.max(0,m)),p=()=>{n.style.setProperty("--fader-pos",String(s)),n.setAttribute("aria-valuenow",String(Math.round(s*1e3)/1e3))},u=m=>{let x=c(m);x!==s&&(s=x,p(),l?.(x))},h=0,g=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let x=n.getBoundingClientRect();m.target!==i&&x.height>0&&u(1-(m.clientY-x.top)/x.height),h=m.clientY,g=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!g)return;let x=n.getBoundingClientRect().height||1,y=(h-m.clientY)/x*(m.shiftKey?jn:1);h=m.clientY,u(s+y)});let b=()=>{g=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",m=>{m.preventDefault(),d?.()}),n.addEventListener("keydown",m=>{let x=m.shiftKey?r*jn:r,y={ArrowUp:s+x,ArrowRight:s+x,ArrowDown:s-x,ArrowLeft:s-x,PageUp:s+r*10,PageDown:s-r*10,Home:0,End:1};m.key in y&&(m.preventDefault(),u(y[m.key]))});let f={el:n,get value(){return s},get dragging(){return g},set(m){g||(s=c(Number(m)||0),p())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(r=m.step),m.onChange&&(l=m.onChange),m.onReset&&(d=m.onReset)}};return f.setLabel(e.label),f.set(e.value??0),f.setText(e.valueText),Ha.set(n,f),f}function Gi(e){return Ha.get(e)}var Oa=new WeakMap,Ui=.2,Yi=1.5,Wi=.5;function Ki(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function Rn(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Ki(o.getComputedStyle(e).getPropertyValue(N(t)),n)}function Xi(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let s=t.createElement("div");s.className="nc-meter-bars",s.setAttribute("aria-hidden","true");let r=[];for(let f=0;f<n;f++){let m=t.createElement("span");m.className="nc-meter-bar";let x=t.createElement("span");x.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let w=t.createElement("span");w.className="nc-meter-hold",m.append(x,y,w),s.append(m),r.push({peak:x,rms:y,hold:w,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,s);let l=e.label,d=e.onClear,c=!1,p=-1,u=-1,h=()=>{i.dataset.lit=c?"true":"false",i.setAttribute("aria-pressed",c?"true":"false"),i.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),i.title=c?"Clipped. Click to clear":"Clip light"},g=(f,m,x,y)=>{let w=Math.round(y*1e3)/1e3;x[m]!==w&&(x[m]=w,f.style.transform=m==="hold"?`translateY(${Math.round((1-w)*1e3)/10}%)`:`scaleY(${w})`)};i.addEventListener("click",()=>{b.clear(),d?.()});let b={el:o,get clipped(){return c},update(f,m){p<0&&(p=Rn(o,"motion-meter-fall",Ui)),u<0&&(u=Rn(o,"motion-meter-hold",Yi));let x=Math.max(0,Math.min(.25,Number(m)||0)),y=p>0?Math.exp(-x/p):0;r.forEach((w,E)=>{let L=f[E]??f[0]??{peak:0,rms:0},M=Math.min(1,Math.max(0,Number(L.peak)||0)),$=Math.min(M,Math.max(0,Number(L.rms)||0));L.over&&b.clip(),w.level.peak=M>=w.level.peak?M:M+(w.level.peak-M)*y,w.level.rms=$>=w.level.rms?$:$+(w.level.rms-$)*y,w.holdAge+=x,M>=w.holdAt?(w.holdAt=M,w.holdAge=0):w.holdAge>u&&(w.holdAt=Math.max(M,w.holdAt-Wi*x)),g(w.peak,"peak",w.shown,w.level.peak),g(w.rms,"rms",w.shown,w.level.rms),g(w.hold,"hold",w.shown,w.holdAt),w.hold.dataset.off=w.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,h())},clear(){c=!1,h()},reset(){for(let f of r)f.level.peak=0,f.level.rms=0,f.holdAt=0,f.holdAge=0,g(f.peak,"peak",f.shown,0),g(f.rms,"rms",f.shown,0),g(f.hold,"hold",f.shown,0),f.hold.dataset.off="true"},setLabel(f){l=f,h()},configure(f){f.onClear&&(d=f.onClear)}};return h(),b.reset(),Oa.set(o,b),b}function Qi(e){return e?Oa.get(e):void 0}var Ji=3,Zi=new Set(["freq","q","rate","time","log"]);function hn(e,t,n){return!e||!Zi.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Ue(e,t,n){return hn(e,t,n)!=="linear"}function st(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let s=Math.min(n,Math.max(t,i)),r=hn(e,t,n);if(r==="log")return Math.log(s/t)/Math.log(n/t);let l=(s-t)/(n-t);return r==="power"?Math.cbrt(l):l}function _a(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),s=hn(e,t,n);return s==="log"?t*(n/t)**i:t+(n-t)*(s==="power"?i**Ji:i)}function Va(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let s=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(s)),i=Math.min(n,Math.max(t,i))}return i}function Oe(e,t,n,o){return Math.round(st(e,t,n,o)*1e3)}function rt(e,t,n,o,i){return Va(_a(e,t,n,Number(o)/1e3),t,n,i)}function es(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,s=null;return t==="ArrowRight"||t==="ArrowUp"?s=o+i:t==="ArrowLeft"||t==="ArrowDown"?s=o-i:t==="PageUp"?s=o+1e3/10:t==="PageDown"?s=o-1e3/10:t==="Home"?s=0:t==="End"&&(s=1e3),s===null?null:Math.min(1e3,Math.max(0,Math.round(s)))}function mn(e,t,n,o,i,s=!1,r){let l=Oe(e,t,n,o),d=es(l,i,s);if(d===null)return null;let c=rt(e,t,n,d,r),p=Math.sign(d-l),u=Va(Number(o),t,n,r);for(;p!==0&&c===u&&d>0&&d<1e3;)d+=p,c=rt(e,t,n,d,r);return c}function Hn(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function ts(e,t,n,o=n/6){let i=e.some(p=>p===null),s=Math.max(0,n-(i?o:0)),r=e.reduce((p,u,h)=>u===null?p:p+Hn(t[h]),0),l=r>0?s/r:0,d=e.map(p=>p===null?0:Math.min(s,Hn(p)*l));if(i){let p=d.reduce((h,g)=>h+g,0),u=e.indexOf(null);d[u]=Math.max(o,n-p)}let c=[0];for(let p of d)c.push(Math.round((c[c.length-1]+p)*100)/100);return i&&(c[c.length-1]=n),c}function ns(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),s=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function re(e){return Math.max(0,Math.min(1,e))}function Ga(e,t){let{ctx:n,w:o,h:i}=ns(e);if(!n)return;n.clearRect(0,0,o,i);let s=Bi(e);if(t.paint==="swatch"){let d=j(e,"accent"),c=j(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,o/2,i),n.fillStyle=c,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){is(n,o,i,t,e,s);return}if(t.paint==="filter"){let d=t.mode??"lp",c=j(e,Ba(d)),p=j(e,"divider"),u=re(t.cutoff??.5),h=.08+(1-re(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let g=0;g<=o;g++){let b=g/Math.max(1,o),f=0;d==="lp"?f=b<u?1:Math.max(0,1-(b-u)/h):d==="hp"?f=b>u?1:Math.max(0,1-(u-b)/h):f=Math.max(0,1-Math.abs(b-u)/h);let m=i*.78-f*i*.62;g===0?n.moveTo(g,m):n.lineTo(g,m)}n.strokeStyle=c,n.stroke(),n.fillStyle=j(e,"text-sub"),n.font=s,n.fillText(d.toUpperCase(),0,i),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=j(e,"accent");let d=Math.max(0,t.attack??0),c=Math.max(0,t.decay??.4),[p,u,h]=ts([d,c],t.max??[1,4],o),g=2,b=i-1;n.beginPath(),n.moveTo(p,b),n.lineTo(u,g);let f=Math.max(1,Math.ceil(h-u));for(let m=1;m<=f;m++){let x=m/f;n.lineTo(u+(h-u)*x,b-(b-g)*Math.exp(-4.6*x)*(1-x*.01))}n.lineTo(h,b),n.lineTo(o,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[c,p]=Array.isArray(t.region)?t.region:[0,1],u=j(e,"accent"),h=j(e,"text-sub"),g=i/2;n.fillStyle=j(e,"accent-soft"),n.fillRect(re(c)*o,0,(re(p)-re(c))*o,i),n.strokeStyle=j(e,"divider"),n.beginPath(),n.moveTo(0,g),n.lineTo(o,g),n.stroke();let b=Math.floor(d.length/2);for(let f=0;f<b;f++){let m=(f+.5)/b*o,x=Math.max(-1,Math.min(1,d[f*2]??0)),y=Math.max(-1,Math.min(1,d[f*2+1]??0)),w=(f+.5)/b;n.strokeStyle=w>=c&&w<=p?u:h,n.beginPath(),n.moveTo(m,g-y*(g-1)),n.lineTo(m,g-x*(g-1)+.5),n.stroke()}n.strokeStyle=u;for(let f of[c,p,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(re(f)*(o-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=j(e,"text"),n.fillRect(Math.round(re(t.position)*(o-1)),0,1,i)),b||(n.fillStyle=h,n.font=s,n.fillText(t.empty??"Empty",0,g+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let d=re(t.level??0);n.fillStyle=j(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=j(e,"accent"),n.fillRect(0,i*.4,o*d,i*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=j(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=j(e,"rhythm.playhead"),n.fillRect(l/r*o,i*.3,Math.max(1,o/r),i*.4),e.dataset.ncAccent=j(e,"accent")}var je=20,Ot=2e4,St=24,On=-60;function as(e,t,n,o,i=48e3){let s=2*Math.PI*Math.min(t,i*.49)/i,r=Math.cos(s),l=Math.sin(s)/(2*n),d,c,p;e==="hp"?[d,c,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[d,c,p]=[l,0,-l]:[d,c,p]=[(1-r)/2,1-r,(1-r)/2];let u=1+l,h=-2*r,g=1-l,b=2*Math.PI*o/i,f=(w,E,L)=>w+E*Math.cos(b)+L*Math.cos(2*b),m=(w,E)=>-(w*Math.sin(b)+E*Math.sin(2*b)),x=Math.hypot(f(d,c,p),m(c,p)),y=Math.hypot(f(u,h,g),m(h,g));return y>0?x/y:0}function os(e,t){return Math.log(Math.max(je,Math.min(Ot,e))/je)/Math.log(Ot/je)*t}function _n(e,t,n){let o=Math.max(On,Math.min(St,e));return t+(St-o)/(St-On)*(n-t)}function is(e,t,n,o,i,s){let r=o.mode??"lp",l=j(i,Ba(r)),d=j(i,"divider"),c=j(i,"text-sub"),p=Number.parseFloat(String(s).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,h=Math.max(u+4,n-p-3),g=o.q??Math.SQRT1_2,b=Math.round(_n(0,u,h))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let f=0;f<=t;f++){let m=je*(Ot/je)**(f/Math.max(1,t)),x=o.open?1:as(r,o.hz,g,m,o.sampleRate),y=_n(20*Math.log10(Math.max(1e-5,x)),u,h);f===0?e.moveTo(f,y):e.lineTo(f,y)}if(e.strokeStyle=l,e.stroke(),!o.open){let f=Math.round(os(o.hz,t))+.5;e.strokeStyle=c,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(f,u),e.lineTo(f,h),e.stroke(),e.setLineDash?.([])}e.fillStyle=c,e.font=s,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function ee(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function ss(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var we=20,Ye=2e4,fn=Math.log(Ye/we),_t=32,rs=250,ls=-100,cs=1200,ds=4.5,Vn=-6,ge=-96,ps=48,Gn=[100,1e3,1e4],us=[6,12];function Le(e,t){return Math.log(Math.max(we,Math.min(Ye,e))/we)/fn*t}function et(e,t){return we*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*fn)}function he(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Vt(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Ua=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function hs(e,t,n,o){let i=n?3:1,s=d=>({db:Math.max(-o,Math.min(o,e.db+d*i))}),r=d=>({hz:Math.max(e.minHz??we,Math.min(e.maxHz??Ye,e.hz*2**(d*i/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*i)))});switch(t){case"ArrowUp":return s(1);case"ArrowDown":return s(-1);case"ArrowRight":return e.moveHz?r(1):s(1);case"ArrowLeft":return e.moveHz?r(-1):s(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function gn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function ms(e,t,n,o,i,s,r,l,d){let c=d?.25:1,p={},u=Math.max(1,s/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-o*c/u*r/gn(e))),e.moveHz){let h=t.hz*Math.exp(n*c/Math.max(1,i)*fn);p.hz=Math.max(e.minHz??we,Math.min(e.maxHz??Ye,h))}return p}function fs(e,t,n,o,i){let s=Math.max(0,n.left)+1,r=Math.min(n.right,i)-1,l=Math.min(t.width*3+o*2,r-s),d=Math.max(s,Math.min(e.left,r-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var H=new WeakMap;function gs(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let s=document.createElement("canvas");s.className="nc-eq-curve",s.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,o.append(i,s);for(let d of e.bands)o.append(bs(n,d,t));o.append(r),o.addEventListener("click",d=>{if(!Ja(n)||d.button>0)return;let c=Qa(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),H.set(n,{control:e,cache:null,spec:null,active:null}),Wa(n,e),n}function Ya(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function bs(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},s=()=>i()?.bands.find(c=>c.id===t.id)??null,r=null;o.addEventListener("pointerdown",c=>{if(c.button!==0)return;let p=s();p&&(c.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(c.pointerId),r={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",le(e,t.id))}),o.addEventListener("pointermove",c=>{if(!r||c.pointerId!==r.id)return;let p=i(),u=s(),h=H.get(e);if(!p||!u||!h?.box)return;let{w:g,h:b,pad:f}=h.box;p.onBand(u.id,ms(u,r.start,c.clientX-r.x,c.clientY-r.y,g,b,p.range??18,f,c.shiftKey))});let l=c=>{!r||c.pointerId!==r.id||(r=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&le(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",c=>{c.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",c=>{let p=i(),u=s();if(!p||!u)return;let h=hs(u,c.key,c.shiftKey,p.range??18);h&&(c.preventDefault(),h==="reset"?p.onReset?.(u.id):p.onBand(u.id,h),le(e,u.id))});let d=null;return o.addEventListener("wheel",c=>{let p=i(),u=s();if(!p||!u?.moveQ)return;c.preventDefault();let h=c.timeStamp;(!d||h-d.t>400)&&(d={q:u.q,t:h});let g=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;d.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,d.q*2**(-g/240))),d.t=h,p.onBand(u.id,{q:d.q}),le(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>le(e,t.id)),o.addEventListener("focus",()=>le(e,t.id)),o.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==o&&le(e,null)}),o.addEventListener("blur",()=>{r||le(e,null)}),o}function le(e,t){let n=H.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Ce(e):bn(e)}function bn(e){let t=H.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(o&&b.dataset.band===o.id?b.dataset.active="true":delete b.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,Ua(o.db)];o.kind==="peak"?i.push(Vt(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${Vt(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(xs(t.control,o)),n.hidden=!1;let{w:s,h:r,pad:l}=t.box,d=Le(o.hz,s),c=he(o.db*gn(o),r,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,h=Math.max(0,Math.min(s-p,d-p/2)),g=c-u-l*1.5>=0?c-u-l*1.5:Math.min(r-u,c+l*1.5);n.style.left=`${Math.round(h)}px`,n.style.top=`${Math.round(g)}px`}function xs(e,t){return e.bands.indexOf(t)%3+1}function Wa(e,t){let n=H.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",xn(e);let o=t.range??18;t.bands.forEach((i,s)=>{let r=Ya(e,i.id);r instanceof HTMLElement&&(r.dataset.tone=String(s%3+1),r.dataset.kind=i.kind,r.setAttribute("aria-label",`${i.label} band`),r.setAttribute("aria-valuemin",String(-o)),r.setAttribute("aria-valuemax",String(o)),r.setAttribute("aria-valuenow",String(i.db)),r.setAttribute("aria-valuetext",i.valueText??`${Ua(i.db)}, ${Vt(i.hz)}`),r.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?r.setAttribute("data-nc-help",i.help):r.removeAttribute("data-nc-help"))}),Ce(e),Es(e)}function Ka(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),s=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function Xa(e){return{curve:ee(e,"eq-curve"),fill:ee(e,"eq-fill"),quiet:ee(e,"text-sub"),grid:ee(e,"eq-grid"),zero:ee(e,"divider"),label:ee(e,"text-sub"),spectrum:ee(e,"eq-spectrum"),bands:[ee(e,"eq-band-1"),ee(e,"eq-band-2"),ee(e,"eq-band-3")]}}function ws(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Ce(e){H.has(e)&&xn(e);let t=H.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:s,h:r}=Ka(n);if(!i)return;let l=Math.max(8,Math.round(r*.06)),d=o.range??18;t.box={w:s,h:r,pad:l},t.colours=Xa(e);let c=t.colours,p=ws(o,s);if(!t.cache||t.cache.key!==p){let E=Math.max(64,Math.ceil(s)+1),L=new Float64Array(E);for(let $=0;$<E;$++)L[$]=et($/(E-1)*s,s);let M=null;try{M=typeof o.response=="function"?o.response(L):null}catch{M=null}t.cache={key:p,freqs:L,total:M?.total??new Float64Array(E),bands:M?.bands??[]}}i.clearRect(0,0,s,r);let u=ss(e),h=o.on!==!1;ys(i,s,r,d,l,c,u);let{freqs:g,total:b,bands:f}=t.cache,m=Array.from(g,E=>Le(E,s)),x=he(0,r,d,l);f.forEach((E,L)=>{if(!E||!E.some(A=>Math.abs(A)>.05))return;let M=h?c.bands[L%3]:c.quiet,$=Array.from(E,A=>he(A,r,d,l));i.save(),t.active&&o.bands[L]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=M,Un(i,m,$,x)),i.globalAlpha=h?.75:.4,i.strokeStyle=M,i.lineWidth=.75,Mt(i,m,$),i.restore()});let y=Array.from(b,E=>he(E,r,d,l)),w=h?c.curve:c.quiet;i.save(),i.fillStyle=h?c.fill:c.quiet,i.globalAlpha=h?.2:.08,Un(i,m,y,x),i.restore(),i.save(),i.strokeStyle=h?c.fill:w,i.lineJoin="round",i.lineCap="round",h&&(i.globalAlpha=.16,i.lineWidth=4,Mt(i,m,y)),i.globalAlpha=1,i.strokeStyle=w,i.lineWidth=1.25,Mt(i,m,y),i.restore(),vs(e),bn(e)}function ys(e,t,n,o,i,s,r){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let c=1;c<=9;c++){let p=d*c;if(p<we||p>Ye)continue;let u=Math.round(Le(p,t))+.5;e.globalAlpha=Gn.includes(p)?.9:.35,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let d of us)if(!(d>o))for(let c of[1,-1]){let p=Math.round(he(d*c,n,o,i))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=s.zero;let l=Math.round(he(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=s.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Gn){let c=d>=1e3?`${d/1e3}k`:String(d),p=e.measureText(c).width,u=Le(d,t)+3;e.fillText(c,u+p+2>t?Le(d,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>o)continue;let c=he(d,n,o,i);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(c)-1)}e.restore()}function lt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,s=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,s)}e.lineTo(t[t.length-1],n[n.length-1])}function Mt(e,t,n){e.beginPath(),lt(e,t,n),e.stroke()}function Un(e,t,n,o){e.beginPath(),lt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function Qa(e){return e.closest("[data-nc-maxable]")}function Ja(e){let t=Qa(e);return!!t&&!t.hasAttribute("data-nc-max")}function xn(e){let t=Ja(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=H.get(e);n?.active&&(n.active=null,bn(e))}return t}function vs(e){xn(e);let t=H.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,s=t.control.range??18;for(let r of t.control.bands){let l=Ya(e,r.id);l instanceof HTMLElement&&(l.style.left=`${Le(r.hz,n).toFixed(1)}px`,l.style.top=`${he(r.db*gn(r),o,s,i).toFixed(1)}px`)}}function $s(e,t,n,o){let i=o/2/n,s=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let c=(d-.5)/(e-1)*t,p=(d+.5)/(e-1)*t,u=et(c,t),h=et(p,t),g=et(d/(e-1)*t,t);s[d]=Math.min(n-1,u/i),r[d]=Math.min(n-1,h/i),l[d]=ds*Math.log2(g/1e3)}return{lo:s,hi:r,tilt:l}}function ks(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let r=t-o,l=e[o]??-1/0,d=e[Math.min(e.length-1,o+1)]??l;return l+(d-l)*r}let s=-1/0;for(let r=o;r<=i&&r<e.length;r++)e[r]>s&&(s=e[r]);return s}function Es(e){let t=H.get(e);if(t){if(!t.control.spectrum){eo(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=H.get(e)?.spec;i&&(i.visible=o.some(s=>s.isIntersecting),Gt(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Gt(e)}}function Gt(e){let t=H.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){Za(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ut(e),n.onVis||(n.onVis=()=>Gt(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Yt(e,!1)}function Ut(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Yt(e,t){let n=H.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,Lt(e,Ut(e))),rs):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,Lt(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,Lt(e,Ut(e))),_t))}function Za(e){let t=H.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function eo(e){let t=H.get(e)?.spec;if(!t)return;Za(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=H.get(e);n&&(n.spec=null)}function Lt(e,t){let n=H.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){eo(e);return}if(!o.analyser)return;if(t-o.last<_t-4&&!o.idle){Yt(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):_t/1e3;o.last=t;let s=e.querySelector(".nc-eq-spectrum");if(!(s instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:d}=Ka(s);if(!r)return;let c=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==c||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:c,w:l,sr:p,...$s(c,l,o.buf.length,p)},o.disp=new Float32Array(c).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,h=ps*i,{lo:g,hi:b,tilt:f}=o.map;for(let x=0;x<c;x++){let y=ks(o.buf,g[x],b[x]);y>u&&(u=y);let w=y+f[x],E=o.disp[x]-h;o.disp[x]=w>E?w:E}u>ls&&(o.loud=t);let m=t-o.loud>cs;r.clearRect(0,0,l,d),(!m||o.disp.some(x=>x>ge))&&As(r,l,d,o.disp,n.colours??Xa(e)),o.idle=m&&!o.disp.some(x=>x>ge),Yt(e,o.idle)}function As(e,t,n,o,i){let s=o.length,r=new Array(s),l=new Array(s),d=c=>{let p=o[Math.max(0,Math.min(s-1,c))];return Number.isFinite(p)?p:ge};for(let c=0;c<s;c++){let p=d(c)*.36+(d(c-1)+d(c+1))*.22+(d(c-2)+d(c+2))*.1,u=(Math.max(ge,Math.min(Vn,Number.isFinite(p)?p:ge))-ge)/(Vn-ge);r[c]=c/(s-1)*t,l[c]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),lt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),lt(e,r,l),e.stroke(),e.restore()}var Q=new WeakMap,Ss=450,Ms=6,Ls=33,Tt=24,Ts="http://www.w3.org/2000/svg";function Cs(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function zs(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Fs(e,t,n,o,i){let s=e.slice();if(t===o)return s[o]=i,s;let r=t<o?1:-1;for(let l=t;l!==o+r;l+=r){let d=(l-t)/(o-t);s[l]=Math.round((n+(i-n)*d)*100)/100}return s}function Ns(e,t){let n=e.steps[t],o=(e.shapes??[]).find(s=>s.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function be(e,t){let n=document.createElementNS(Ts,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function to(e){let t=be("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(be("path",{d:e})),t}function qs(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let s=document.createElement("div");s.className="nc-lsteps-shapes",s.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(o,i,s,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return Q.set(n,d),Ps(n,o),Is(n,r),no(n,e),n}function J(e){let t=Q.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Ds(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function Ct(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=Ds(e);return{i:zs(t.clientX,o),level:Cs(t.clientY-n.top,n.height)}}function Ps(e,t){let n=Q.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",s=>{let r=J(e);if(!r||s.button>0||!r.steps.length)return;s.preventDefault(),ct(e),t.setPointerCapture?.(s.pointerId);let l=Ct(t,s),d=r.steps.map(c=>c.level);n.drag={id:s.pointerId,x:s.clientX,y:s.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Yn(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let c=n.drag;!c||c.moved||(c.long=!0,J(e)?.onLevels(c.start.slice(),!0),zt(e,c.i))},Ss)}),t.addEventListener("pointermove",s=>{let r=n.drag;if(!r||r.id!==s.pointerId||r.long||!r.moved&&Math.hypot(s.clientX-r.x,s.clientY-r.y)<Ms)return;r.moved=!0,o();let l=Ct(t,s);Yn(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let i=s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(s.pointerId),r.long||J(e)?.onLevels(r.levels.slice(),!0),Wt(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,r.long||J(e)?.onLevels(r.start.slice(),!0),Wt(e,-1))}),t.addEventListener("contextmenu",s=>{J(e)?.onShape&&(s.preventDefault(),zt(e,Ct(t,s).i))}),t.addEventListener("keydown",s=>{let r=J(e);if(!r||!r.steps.length)return;let l=r.steps.length,d=Math.min(n.focus,l-1),c=r.steps[d].level,p=u=>{let h=r.steps.map(g=>g.level);h[d]=Math.round(Math.max(0,Math.min(1,u))*100)/100,r.onLevels(h,!0)};switch(s.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":p(c+(s.shiftKey?.01:.05));break;case"ArrowDown":p(c-(s.shiftKey?.01:.05));break;case"PageUp":p(c+.25);break;case"PageDown":p(c-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;zt(e,d);break;default:return}s.preventDefault(),Kt(e)}),t.addEventListener("focus",()=>Kt(e)),t.addEventListener("blur",()=>{for(let s of t.querySelectorAll("[data-focus]"))s.removeAttribute("data-focus")})}function Yn(e,t,n,o,i,s){let r=Q.get(e).drag;r&&(r.levels=Fs(r.levels,t,n,o,i),Wt(e,o,r.levels[o]),J(e)?.onLevels(r.levels.slice(),s))}function Wt(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function Kt(e){let t=Q.get(e),n=e.querySelector(".nc-lsteps-plot"),o=J(e);if(!n||!o)return;for(let s of n.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===t.focus?s.dataset.focus="true":s.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",Ns(o,i))}function Is(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),ct(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),Q.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&ct(e)}}function zt(e,t){let n=J(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let s=Q.get(e);s.focus=t,o.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,o.append(r);for(let g of n.shapes??[]){let b=document.createElement("button");b.type="button",b.setAttribute("role","menuitemradio"),b.setAttribute("aria-checked",n.steps[t]?.shape===g.value?"true":"false"),g.icon&&b.append(to(g.icon)),b.append(document.createTextNode(g.label)),b.addEventListener("click",()=>{J(e)?.onShape?.(t,g.value),ct(e,!0)}),o.append(b)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",s.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),c=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=c?c.left+c.width/2-d.left:0,h=Math.max(0,Math.min(d.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(h)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function ct(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",Q.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function Bs(e,t){let n=Q.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let s=0;s<t;s++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(s),s%4===0&&s>0&&(r.dataset.beat="true");let l=be("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(be("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),be("path",{class:"nc-lsteps-env",d:""}),be("path",{class:"nc-lsteps-top",d:""}),be("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),o.append(r);let d=document.createElement("span");s%4===0&&(d.textContent=String(s+1)),s%4===0&&s>0&&(d.dataset.beat="true"),i.append(d)}}}function no(e,t){let n=Q.get(e);if(!n)return;n.control=t;let o=t.steps.length;Bs(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let s=Math.max(.5,Math.min(.75,t.swing??.5)),r=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((g,b)=>{let f=r[b];if(!f)return;let m=String((b%2?1-s:s)*2);f.style.setProperty("--nc-lsteps-grow",m),l[b]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&b>=t.played?f.dataset.out="true":f.removeAttribute("data-out"),f.dataset.zero=g.level<=0?"true":"false";let x=Math.max(0,Math.min(1,g.level)),y=f.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-x*100)),y.setAttribute("height",String(x*100));let w=t.curve?t.curve(b,Tt):null,E="M0 100",L="";for(let M=0;M<=Tt;M++){let $=w?Math.max(0,Math.min(1,w[M]??x)):x,A=M/Tt*100,v=100-$*100;E+=` L${A.toFixed(2)} ${v.toFixed(2)}`,L+=`${M?" L":"M"}${A.toFixed(2)} ${v.toFixed(2)}`}f.querySelector(".nc-lsteps-env").setAttribute("d",`${E} L100 100 Z`),f.querySelector(".nc-lsteps-top").setAttribute("d",L)});let d=e.querySelector(".nc-lsteps-shapes"),c=(t.shapes??[]).map(g=>`${g.value}:${g.label}`).join();if(c!==n.shapeKey){n.shapeKey=c,d.textContent="";for(let g of t.shapes??[]){let b=document.createElement("button");b.type="button",b.className="nc-lsteps-shape",b.setAttribute("role","tab"),b.dataset.shape=String(g.value),g.icon&&b.append(to(g.icon)),b.append(document.createTextNode(g.label)),b.addEventListener("click",()=>J(e)?.onShapeAll?.(g.value)),d.append(b)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,h=t.steps.slice(0,p).every(g=>g.shape===u);for(let g of d.querySelectorAll(".nc-lsteps-shape")){let b=h&&g.dataset.shape===String(u);g.setAttribute("aria-selected",b?"true":"false"),g.tabIndex=b||!h&&g===d.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),Kt(e),n.last=-2,js(e)}function js(e){let t=Q.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Ft(e,null);return}let o=0,i=s=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Ft(e,null);return}s-o>=Ls&&(o=s,Ft(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function Ft(e,t){let n=Q.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let s of e.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===o?(s.dataset.playhead="true",s.dataset.locked=i?"true":"false"):(s.removeAttribute("data-playhead"),s.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var Rs=.8912509381337456,Xt=32,Hs=250,Os=1200,_s=.2,ao=1.5;function Vs(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Gs(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var dt=new WeakMap,Wn=new WeakMap;function Kn(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),s=Number.parseFloat(i);return Number.isFinite(s)?i.endsWith("ms")?s/1e3:s:n}function Us(e){let t=Wn.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let s of i){let r=dt.get(s.target);r&&(r.seen.set(s.target,s.isIntersecting),Re(r))}Ae(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Re(i);Ae(t)}),Wn.set(e,t),t}var oo=e=>e.els.some(t=>t.isConnected);function Ys(e){if(!e.loop.io)return oo(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Re(e){let t=!e.dead&&!!e.source&&Ys(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=wn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Zt(e))}function wn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Ae(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){io(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=wn(e)),!e.raf&&!e.timer&&Qt(e,!1)}function Qt(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Xn(e,wn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Hs):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,Xn(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),Xt)}function io(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Xn(e,t){if(t-e.last<Xt-4&&!e.idle&&e.last){Qt(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Xt/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let s of e.recs){if(!oo(s)){(s.placed||e.frames-s.born>90)&&so(s);continue}s.placed=!0,s.open&&(i=!0,Ws(s,n,t)&&(e.loud=t),(s.disp[0]>0||s.disp[1]>0)&&(o=!0))}if(!i){io(e);return}e.idle=t-e.loud>Os&&!o,Qt(e,e.idle)}function Ws(e,t,n){if(e.fall<0){let h=e.els[0];e.fall=Kn(h,"motion-meter-fall",_s),e.hold=Kn(h,"motion-meter-hold",ao)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",s=i?o:Number(o?.in)||0,r=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=r&&Number(o.out)||0,d=r?"2":"1";if(e.rows!==d){e.rows=d;for(let h of e.els)h.dataset.ncRows=d}let c=e.fall>0?Math.exp(-t/e.fall):0,p=[s,l],u=!1;for(let h=0;h<2;h++){let g=Vs(p[h]);g>0&&(u=!0),e.disp[h]=g>=e.disp[h]?g:g+(e.disp[h]-g)*c,e.disp[h]<.001&&(e.disp[h]=0),p[h]>=Rs&&(e.clipAt[h]=n);let b=e.clipAt[h]>0&&n-e.clipAt[h]<e.hold*1e3;Jt(e,h,e.disp[h],b)}return u}function Jt(e,t,n,o){let i=Math.round(n*1e3)/1e3,s=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===s)){e.shown[t]=i,e.clipShown[t]=s;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=s)}}}function Zt(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Jt(e,0,0,!1),Jt(e,1,0,!1)}function so(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),dt.get(t)===e&&dt.delete(t)}function Ks(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=Us(o),s={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:ao,rows:""};for(let r of n)dt.set(r,s),i.io?.observe(r);if(i.recs.add(s),Zt(s),!i.io){let r=o.defaultView,l=()=>{Re(s),Ae(i)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!s.dead){if(l===s.source){Re(s),Ae(i);return}s.open&&(s.open=!1,s.source?.close?.(),Zt(s)),s.source=l,Re(s),Ae(i)}},destroy(){s.dead||so(s),Ae(i)}}}var ro={slop:8,longPressMs:500,pitchPx:16},Xs=class{constructor(e,t,n=ro){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,s=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,s)<this.config.slop)return;Math.abs(s)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-s/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Qs(e,t,n,o=ro){let i=!1,s=0,r=(c,p)=>{let u=e.ownerDocument.elementFromPoint?.(c,p),h=[...e.querySelectorAll(t)],g=u?h.findIndex(m=>m===u||m.contains(u)):-1;if(g>=0)return g;let b=-1,f=Number.POSITIVE_INFINITY;return h.forEach((m,x)=>{if(m.hidden)return;let y=m.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let w=Math.abs(c-(y.left+y.width/2));w<f&&w<=y.width&&(b=x,f=w)}),b},l=new Xs(r,c=>{(c.kind==="paint"||c.kind==="long")&&(i=!0),n(c)},o),d=()=>{s&&clearTimeout(s),s=0};return e.addEventListener("pointerdown",c=>{c.button>0||(i=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),s=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{i&&(i=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var lo="netcomposer.groups.v1";function yn(){try{return globalThis.localStorage??null}catch{return null}}function co(e=yn(),t=lo){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,s]of Object.entries(n))typeof s=="boolean"&&o.set(i,s);return o}catch{return new Map}}function Js(e,t,n,o=lo){let i=co(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function Zs(e,t=yn()){return co(t).get(e.id)??e.open===!0}function er(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let s=document.createElement("span");s.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(s,r,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",d.id);for(let c of e.controls)d.append(n(c,t));return i.addEventListener("click",()=>{let c=o.dataset.ncOpen!=="true";Js(yn(),e.id,c),en(o,c);let p=t(o);p?.type==="group"&&p.onToggle?.(c)}),o.append(i,d),po(o,e),en(o,Zs(e)),uo(o,e),o}function en(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function po(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function uo(e,t){po(e,t)&&en(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var We="application/x-nc-pad",Qn="http://www.w3.org/2000/svg";function tr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let s=0;s<n;s++){let r=Math.floor(s*t/n),l=Math.max(r+1,Math.floor((s+1)*t/n)),d=0,c=0;for(let u=r;u<l;u++)d=Math.min(d,e[2*u]??0),c=Math.max(c,e[2*u+1]??0);let p=n===1?50:s/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function nr(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,s)=>o.append(ar(n,s,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&tt(n)}),mo(n,e),n}function ar(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Qn,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let c=document.createElementNS(Qn,"path");return d.append(c),o.append(i,s,r,l,d),ir(e,o,t,n),s.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&ho(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(We,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(We)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(We)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let h=p.dataTransfer?.getData(We);if(h!==void 0&&h!==""){p.preventDefault(),p.stopPropagation();let b=Number(h);b!==t&&u.onMove?.(b,t,p.altKey);return}let g=p.dataTransfer?.files?.[0];g&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,g))}),o}function or(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function ir(e,t,n,o){let i=0,s=!1,r=0,l=0,d=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;s=!1,r=c.clientX,l=c.clientY,d();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&c.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,s=Jn(e,t,n,o)},450)))}),t.addEventListener("pointermove",c=>{i&&Math.hypot(c.clientX-r,c.clientY-l)>8&&d()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,d);t.addEventListener("contextmenu",c=>{c.preventDefault(),d(),s=Jn(e,t,n,o)}),t.addEventListener("click",()=>{if(s){s=!1;return}or(e,n,o)})}function Jn(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let s=i.menu(n);if(!s.length)return!1;tt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),tt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of s){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{tt(e);let h=o(e);h?.type==="padGrid"&&(p.id==="rename"&&h.onRename?ho(e,t,n,o):h.onMenu?.(n,p.id))}),l.append(u)}e.append(r,l);let d=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-d.left}px`,l.style.top=`${c.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function ho(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let s=document.createElement("input");s.type="text",s.className="nc-padgrid-rename",s.maxLength=i.nameMax??24,s.value=i.pads[n]?.label??"",s.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.top-r.top}px`,s.style.width=`${l.width}px`;let d=!1,c=p=>{if(d)return;d=!0;let u=s.value.trim();s.remove(),t.focus();let h=o(e);p&&u&&h?.type==="padGrid"&&h.onRename?.(n,u)};s.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?c(!0):p.key==="Escape"&&c(!1)}),s.addEventListener("blur",()=>c(!0));for(let p of["pointerdown","click","dblclick"])s.addEventListener(p,u=>u.stopPropagation());e.append(s),s.focus(),s.select()}function tt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function mo(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let s=n[i];if(!(s instanceof HTMLButtonElement))return;let r=s.querySelector(".nc-padgrid-pad-name"),l=s.querySelector(".nc-padgrid-pad-hint"),d=s.querySelector(".nc-padgrid-pad-wave path"),c=s.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=o.empty?"":o.badge??""),s.draggable=!o.empty,o.empty?(s.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete s.dataset.empty,r&&(r.textContent=o.label),l&&(l.textContent=o.hint??""),d?.setAttribute("d",tr(o.peaks))),!o.empty&&o.hint?s.dataset.hint="true":delete s.dataset.hint,o.lane?s.dataset.ncLane=String(o.lane):delete s.dataset.ncLane;let p=t.selected===i;p?s.dataset.selected="true":delete s.dataset.selected,s.setAttribute("aria-pressed",p?"true":"false"),o.playing?s.dataset.playing="true":delete s.dataset.playing,s.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function V(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function xt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function Zn(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function _e(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var sr=450,ea=8;function te(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function rr(e){let t=Ii(e,"target-min");return t>0?t:44}function lr(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=rr(e),o=n/2,i=t.map(s=>s.parentElement?.getBoundingClientRect()??null);for(let s=0;s<t.length;s++){let r=t[s],l=i[s];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,p=d-o,u=d+o,h=c-o,g=c+o;for(let b=0;b<t.length;b++){if(s===b)continue;let f=i[b];if(!f||f.width===0)continue;let m=f.left+f.width/2,x=f.top+f.height/2;Math.abs(x-c)<o*2&&(m>d?u=Math.min(u,(d+m)/2):m<d&&(p=Math.max(p,(d+m)/2))),Math.abs(m-d)<o*2&&(x>c?g=Math.min(g,(c+x)/2):x<c&&(h=Math.max(h,(c+x)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),h=Math.min(h,l.top),g=Math.max(g,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${h-l.top}px`,r.style.width=`${Math.max(0,u-p)}px`,r.style.height=`${Math.max(0,g-h)}px`,r.style.transform="none"}}function fo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ta(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function xe(e,t){switch(e.type){case"slider":return cr(e,t);case"select":return pr(e,t);case"toggle":return ur(e,t);case"button":return hr(e,t);case"readout":return mr(e);case"label":return xr(e);case"note":return na(e);case"knob":return vr(e,t);case"choice":return $r(e,t);case"slotRow":return kr(e,t);case"stepGrid":return Mr(e,t);case"canvas":return zr(e);case"fx":return Rr(e,t);case"eqGraph":return gs(e,t);case"levelSteps":return qs(e,t);case"group":return er(e,t,xe);case"strip":return Fr(e,t);case"stripAdd":return Pr(e,t);case"padGrid":return nr(e,t);case"moves":return gr(e,t);default:return na({id:"unknown",text:""})}}function Z(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,xo(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(go(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??_e(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Zn(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Zn(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&me(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&wr(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??_e(t.value))}else if(t.type==="choice")wo(e,t);else if(t.type==="slotRow")vo(e,t);else if(t.type==="stepGrid")nn(e,t);else if(t.type==="padGrid")mo(e,t);else if(t.type==="moves")bo(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Ga(n,t)}else if(t.type==="eqGraph")Wa(e,t);else if(t.type==="levelSteps")no(e,t);else if(t.type==="strip"){Ao(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Te(n.id)}"]`);o instanceof Element&&Z(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")ko(e,t);else if(t.type==="group"){uo(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Te(n.id)}"]`);o instanceof Element&&Z(o,n)}}else if(t.type==="fx"){qo(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Te(n.id)}"]`);o instanceof Element&&Z(o,n)}}}}function cr(e,t){let n=xt(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=Ue(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(go(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let s=l=>i?rt(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(s(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(s(l))}),i&&o.addEventListener("keydown",l=>{let d=t(o);if(d?.type!=="slider"||o.disabled)return;let c=d.taper??e.taper,p=mn(c,d.min,d.max,d.value,l.key,l.shiftKey,d.step);p!==null&&(l.preventDefault(),o.value=String(Oe(c,d.min,d.max,p)),d.onChange(p),d.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(o,r),e.onTap&&n.insertBefore(dr(e,o,t),r),n.append(V()),Z(n,e),n}function go(e){return Ue(e.taper,e.min,e.max)?Oe(e.taper,e.min,e.max,e.value):e.value}function dr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(te());let i=s=>{let r=n(t);r?.type==="slider"&&r.onTap?.(s)};return o.addEventListener("pointerdown",s=>{s.button===0&&i(s.timeStamp)}),o.addEventListener("keydown",s=>{s.repeat||s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),i(s.timeStamp))}),o}function pr(e,t){let n=xt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let s of e.options){let r=document.createElement("option");r.value=s.value,r.textContent=s.label,s.disabled&&(r.disabled=!0),s.group?i?.getAttribute("label")!==s.group&&(i=document.createElement("optgroup"),i.setAttribute("label",s.group),o.append(i)):i=null,(i??o).append(r)}return o.value=e.value,o.addEventListener("change",()=>{let s=t(o);s?.type==="select"&&s.onChange(o.value)}),n.append(o,V()),n}function ur(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(V()),Z(n,e),n}function hr(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let s=t(n);s?.type==="button"&&s.onPress()}),n.append(V()),Z(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=fo(),i.addEventListener("click",()=>{let s=n.closest(".nc-module")?.querySelector(".nc-slot-row");s instanceof HTMLElement&&$o(s);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),o.append(n,i),o}function mr(e){let t=xt(e.id,e.label);return t.append(V()),Z(t,e),t}var fr=450;function gr(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let s=document.createElement("span");s.className="nc-moves-label",s.setAttribute("aria-hidden","true"),s.textContent=o.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of o.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${o.label} ${l.text}`),d.append(br(l.icon)),d.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),r.append(d)}i.append(s,r),n.append(i)}return bo(n,e),n}function bo(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${Te(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function br(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function xr(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(V()),t}function na(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(V()),t}function aa(e){if(typeof e.valueText=="string")return e.valueText;let t=_e(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function xo(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function wr(e,t){let n=st(t.taper,t.min,t.max,t.value);xo(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(st(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",aa(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${aa(t)}`}function yr(e,t){if(Ue(e.taper,e.min,e.max))return mn(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function vr(e,t){let n=xt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let s=0,r=0;o.addEventListener("pointerdown",c=>{s=c.clientY;let p=t(o);r=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",c=>{if(o.hasPointerCapture&&!o.hasPointerCapture(c.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(Ue(p.taper,p.min,p.max)){let g=st(p.taper,p.min,p.max,r)-(c.clientY-s)/120;p.onChange(_a(p.taper,p.min,p.max,g));return}let u=p.max-p.min||1,h=Math.min(p.max,Math.max(p.min,r-(c.clientY-s)*u/120));p.onChange(h)}),o.addEventListener("dblclick",()=>{let c=t(o);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),o.addEventListener("keydown",c=>{let p=t(o);if(p?.type!=="knob")return;let u=yr(p,c);u!==null&&(c.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(o,d),n.append(V()),Z(n,e),n}function $r(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let s=t(n);s?.type==="choice"&&s.onChange(o.value)}),i.addEventListener("keydown",s=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(i),d=l;if(s.key==="ArrowRight"||s.key==="ArrowDown")d=(l+1)%r.length;else if(s.key==="ArrowLeft"||s.key==="ArrowUp")d=(l-1+r.length)%r.length;else if(s.key==="Home")d=0;else if(s.key==="End")d=r.length-1;else return;let c=r[d];c instanceof HTMLButtonElement&&(s.preventDefault(),c.focus(),c.click())}),n.append(i)}return n.append(V()),wo(n,e),n}function wo(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function kr(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],h=document.createElement("span");h.className="nc-snap-wrap";let g=document.createElement("button");g.type="button",g.className="nc-snap",g.dataset.ncSlot=String(p),g.textContent=u.label,g.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",h.append(g,te()),Er(h,g,n,p,t),o.append(h)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=fo(),i.append(te()),i.addEventListener("click",()=>{$o(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let s=document.createElement("div");s.className="nc-field nc-morph-field",s.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",s.append(r,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(o,...i?[i]:[]),n.append(c,s,V()),yo(n,t),vo(n,e),n}function oa(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;Pe(e);let s=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,s)}function Er(e,t,n,o,i){let s=0,r=0,l=0,d=!1,c=!1,p=!1,u=!1,h=()=>{window.clearTimeout(s),s=0},g=x=>{let y=x.clientX-r,w=x.clientY-l;y*y+w*w>ea*ea&&(d=!0,h())},b=()=>{u&&(u=!1,window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",f),window.removeEventListener("pointercancel",m))},f=x=>{let y=s!==0&&!d&&!c;h(),b(),y&&(p=!0,oa(n,o,i,x))},m=()=>{d=!0,h(),b()};e.addEventListener("pointerdown",x=>{x.button===0&&(b(),c=!1,d=!1,p=!1,r=x.clientX,l=x.clientY,h(),s=window.setTimeout(()=>{s=0,!d&&(c=!0,Ar(n,t,o,i))},sr),u=!0,window.addEventListener("pointermove",g),window.addEventListener("pointerup",f),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",x=>x.preventDefault()),e.addEventListener("click",x=>{if(p||c||d){p=!1,c=!1,d=!1;return}oa(n,o,i,x)})}function yo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=ia("Save","store"),i=ia("Clear","clear");n.append(o,i);let s=document.createElement("div");s.className="nc-slot-scrim",s.hidden=!0,s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Pe(e)}),s.addEventListener("click",r=>r.stopPropagation()),e.append(s,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),Pe(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),Pe(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&Pe(e)})}function ia(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Ar(e,t,n,o){yo(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let s=e.querySelector(".nc-slot-scrim");s instanceof HTMLElement&&(s.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.bottom-r.top}px`,i.querySelector("button")?.focus()}function Pe(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function vo(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let s=Number(i.dataset.ncSlot),r=t.slots[s];if(!r)continue;i.textContent=r.label,r.filled?i.dataset.filled="true":delete i.dataset.filled,r.active?i.dataset.active="true":delete i.dataset.active,r.edited?i.dataset.edited="true":delete i.dataset.edited,r.queued?i.dataset.queued="true":delete i.dataset.queued,r.queued&&r.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function $o(e){let t=e.dataset.ncLastFill||null,n=ki(t);e.dataset.ncLastFill=n;let o=Ei(n);if(o)for(let[i,s]of Object.entries(o))e.style.setProperty(i,s)}function Sr(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=s=>{if(o===s)return;o=s,n.setAttribute("aria-pressed",s?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(s)};n.addEventListener("pointerdown",s=>{s.button===0&&(s.preventDefault(),n.setPointerCapture?.(s.pointerId),i(!0))});for(let s of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(s,()=>i(!1));return n.addEventListener("keydown",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),s.repeat||i(!0))}),n.addEventListener("keyup",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),i(!1))}),n.addEventListener("contextmenu",s=>s.preventDefault()),n}function Mr(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=m=>{let x=document.createElement("button");return x.type="button",x.setAttribute("role","radio"),x.textContent=m,o.append(x),x},s=i("Note"),r=i("Accent");r.dataset.ncAccentMode="";let l=m=>{for(let x of[s,r]){let y=x===m;x.setAttribute("aria-checked",y?"true":"false"),x.tabIndex=y?0:-1}};l(s);for(let m of[s,r])m.addEventListener("click",()=>l(m));o.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let x=r.getAttribute("aria-checked")==="true"?s:r;l(x),x.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(o),e.onFill&&d.append(Sr(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let x=t(n);x?.type==="stepGrid"&&x.onClear?.()}),d.append(m)}n.append(d);for(let m of e.rows){let x=document.createElement("div");x.className="nc-row",x.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=m.label,y.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(y.dataset.ncLane=String((m.lane-1)%4+1));let w=!1,E=0;y.addEventListener("pointerdown",$=>{w=!1,!($.pointerType==="mouse"||$.button!==0)&&(E=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(w=!0,A.onSelectRow?.(A.rows.findIndex(v=>v.id===m.id),!0))},fr))});for(let $ of["pointerup","pointercancel","pointerleave"])y.addEventListener($,()=>window.clearTimeout(E));y.addEventListener("contextmenu",$=>{w&&$.preventDefault()}),y.addEventListener("click",$=>{let A=t(n);if(A?.type!=="stepGrid")return;if(w){w=!1;return}let v=A.rows.findIndex(T=>T.id===m.id),S=!!A.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);A.onSelectRow?.(v,S)}),y.addEventListener("keydown",$=>Lr(n,y,$));let L=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=$,v.textContent=$==="mute"?"M":"S",v.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${m.label}`),A.append(v,te()),A.addEventListener("click",()=>{let S=t(n);if(S?.type!=="stepGrid")return;let T=S.rows.findIndex(z=>z.id===m.id);($==="mute"?S.onMute:S.onSolo)?.(T)}),L.push(A)}let M=document.createElement("div");M.className="nc-steps";for(let $=0;$<m.steps.length;$++){let A=document.createElement("span");A.className="nc-step-wrap";let v=document.createElement("button");v.type="button",v.className="nc-step",v.dataset.ncStep=`${m.id}:${$}`,v.setAttribute("aria-label",`${m.label} step ${$+1}`),A.append(v,te()),A.addEventListener("click",S=>{let T=t(n);if(T?.type!=="stepGrid")return;let z=T.rows.findIndex(P=>P.id===m.id),F=r.getAttribute("aria-checked")==="true";T.onToggle(z,$,S.shiftKey||F)}),M.append(A)}if(e.onLength&&M.append(Tr(n,M,m,t)),x.append(...L,y,M),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=m.id,$.setAttribute("aria-label",`Re-roll ${m.label}`),$.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=ta(),$.append(te()),$.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(v=>v.id===m.id))}),x.append($)}x.addEventListener("click",$=>{if($.target!==x)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(v=>v.id===m.id))}),sa(n,M,".nc-step-wrap",t,r,()=>m.id),n.append(x)}let c=document.createElement("div");c.className="nc-pads-head";let p=(m,x,y)=>{let w=document.createElement("button");return w.type="button",w.className=m,w.textContent=x,y&&w.setAttribute("aria-label",y),w},u=p("nc-pads-step","‹","Previous lane"),h=p("nc-pads-step","›","Next lane"),g=document.createElement(e.onLength?"button":"span");g.className="nc-pads-label",g.setAttribute("aria-live","polite"),e.onLength&&(g.type="button",g.dataset.ncLenToggle="",g.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",nn(n,m))}));for(let[m,x]of[[u,-1],[h,1]])m.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let w=y.rows.length;y.onSelectRow?.(((Ke(y)+x)%w+w)%w)});if(c.append(u,g,h),e.onDice){let m=p("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=ta(),m.addEventListener("click",()=>{let x=t(n);if(x?.type!=="stepGrid")return;let y=Ke(x);y>=0&&x.onDice?.(y)}),c.append(m)}if(e.transport){let m=p("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let x=t(n);x?.type==="stepGrid"&&x.transport?.onToggle()}),c.append(m)}n.append(c);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let f=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<f;m++){let x=document.createElement("button");x.type="button",x.className="nc-pad",x.dataset.ncPad=String(m),x.textContent=String(m+1),x.addEventListener("click",y=>{let w=t(n);if(w?.type!=="stepGrid")return;let E=Ke(w);if(E<0)return;if(n.dataset.ncLenMode==="true"){w.onLength?.(E,m+1);return}let L=r.getAttribute("aria-checked")==="true";w.onToggle(E,m,y.shiftKey||L)}),b.append(x)}return sa(n,b,".nc-pad",t,r,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Ke(m)]?.id:void 0}),n.append(b),n.append(V()),nn(n,e),n}function Ke(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function sa(e,t,n,o,i,s){let r="on",l=!0,d=-1,c=(p,u)=>{let h=p.rows[d]?.steps[u];!h||u>=p.rows[d].length||(p.onSet?p.onSet(d,u,r,l):!!h[r]!==l&&p.onToggle(d,u,r==="accent"))};Qs(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let h=u.rows.findIndex(g=>g.id===s());h>=0&&u.rows[h].length!==p.pad+1&&u.onLength?.(h,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let h=s();d=u.rows.findIndex(b=>b.id===h);let g=u.rows[d]?.steps[p.pad];if(!g)return;r=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!g[r]}c(u,p.pad)}else if(p.kind==="long"){let h=s(),g=u.rows.findIndex(f=>f.id===h),b=t.querySelectorAll(n)[p.pad];g>=0&&b instanceof HTMLElement&&u.onLongPress?.(g,p.pad,b)}}})}function Lr(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),s=i;n.key==="ArrowDown"?s=i+1:n.key==="ArrowUp"?s=i-1:n.key==="Home"?s=0:s=o.length-1;let r=o[s];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Tr(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(te());let s=c=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(b=>b.id===n.id),h=p.rows[u];if(!h)return;let g=Math.max(1,Math.min(h.steps.length,c));g!==h.length&&p.onLength?.(u,g)},r=c=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((h,g)=>{let b=h.getBoundingClientRect();b.width>0&&c>=b.left+b.width/2&&(u=g+1)}),u},l=c=>s(r(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete i.dataset.dragging};return i.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),i.addEventListener("keydown",c=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(g=>g.id===n.id);if(!u)return;let h={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};c.key in h&&(c.preventDefault(),s(h[c.key]))}),i}var Nt=new WeakMap,Xe=new WeakMap;function Cr(e){return e?(Xe.has(e)||(Xe.set(e,Ht(e)),Pa(t=>{Xe.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))tn(n,Number(n.getAttribute("data-nc-velocity")))},e)),Xe.get(e)):"light"}function tn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:Cr(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(Nt.has(e)&&Nt.get(e)===i)){if(Nt.set(e,i),n===null){for(let s of Object.keys(Pn(1)))e.style.removeProperty(s);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[s,r]of Object.entries(Pn(n,Dn[o]??Dn.light)))e.style.setProperty(s,r)}}function ra(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function nn(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),s=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&s&&(r.textContent=l?`${s.label} · ${s.length}`:s.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&s&&(d.setAttribute("aria-label",`Re-roll ${s.label}`),d.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");c.textContent!==u&&(c.textContent=u),c.setAttribute("aria-pressed",p?"true":"false");let h=t.transport?.ariaLabel;h?c.setAttribute("aria-label",h):c.removeAttribute("aria-label")}if(i instanceof HTMLElement&&s){i.setAttribute("aria-label",`${s.label} steps`),s.lane&&(i.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||n&&!s.solo?i.dataset.silent="true":delete i.dataset.silent;let p=s.length>0?(t.playhead%s.length+s.length)%s.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let h=Number(u.getAttribute("data-nc-pad")),g=s.steps[h];u instanceof HTMLButtonElement&&(u.hidden=!g||!l&&h>=s.length,l&&h>=s.length?u.dataset.out="true":delete u.dataset.out,l&&h===s.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${s.label} step ${h+1}${g?.markLabel?`, ${g.markLabel}`:""}`),ra(u,g),u.setAttribute("aria-pressed",g?.on?"true":"false"),g?.accent?u.dataset.accent="true":delete u.dataset.accent,g?.dim?u.dataset.dim="true":delete u.dataset.dim,tn(u,g?.velocity),t.playhead>=0&&h===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let g=0;g<p.steps.length;g++){let b=p.steps[g],f=e.querySelector(`[data-nc-step="${p.id}:${g}"]`);if(!(f instanceof HTMLButtonElement))continue;let m=f.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===p.id?m.dataset.selected="true":delete m.dataset.selected;let E=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);E?m.dataset.picked="true":delete m.dataset.picked;let L=m.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||E?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?m.dataset.silent="true":delete m.dataset.silent;for(let M of m.querySelectorAll("[data-nc-ms]")){let $=M.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;M.setAttribute("aria-pressed",$?"true":"false")}}f.setAttribute("aria-pressed",b.on?"true":"false");let x=`${p.label} step ${g+1}${b.markLabel?`, ${b.markLabel}`:""}`;f.getAttribute("aria-label")!==x&&f.setAttribute("aria-label",x),ra(f,b),b.accent?f.dataset.accent="true":delete f.dataset.accent,b.dim?f.dataset.dim="true":delete f.dataset.dim,g%4===0?f.dataset.bar="true":delete f.dataset.bar,typeof b.velocity=="number"?(f.dataset.velocity="true",f.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete f.dataset.velocity,f.style.removeProperty("--level")),tn(f,b.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;g===y?f.dataset.playhead="true":delete f.dataset.playhead;let w=!!t.onLength&&t.selectedRow===p.id;f.hidden=g>=p.length&&!w,g>=p.length&&w?f.dataset.out="true":delete f.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),h=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&h&&h.nextElementSibling!==u){let g=document.activeElement===u;h.after(u),g&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function zr(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,V()),t}function Fr(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let s=!e.master&&typeof e.onFold=="function",r=null;s&&(n.dataset.ncFoldable="",r=To(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let w=t(n);w?.type==="strip"&&(w.onFold?.(w.folded!==!0),document.activeElement!==r&&r.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let w=document.createElement("span");w.className="nc-strip-grip-dots",w.setAttribute("aria-hidden","true"),l.append(w),l.addEventListener("keydown",E=>{if(E.key!=="ArrowLeft"&&E.key!=="ArrowRight"||E.ctrlKey||E.metaKey||E.shiftKey)return;let L=t(n);L?.type==="strip"&&(E.preventDefault(),L.onMove?.(E.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>da(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",w=>{w.pointerType==="touch"||w.pointerType==="pen"||w.target instanceof Element&&w.target.closest("input, .nc-strip-remove")||(w.preventDefault(),da(n,o,t,{x:w.clientX,y:w.clientY}))}),e.onRemove){let w=document.createElement("button");w.type="button",w.className="nc-strip-remove",w.dataset.ncStripRemove="",w.textContent="×",w.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onRemove?.(w)}),o.append(w)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let w=document.createElement("span");w.className="nc-hacks-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks",E.dataset.ncHacks="",w.append(E,te()),w.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),d.append(w)}let c=document.createElement("div");if(c.className="nc-strip-ms",e.onSendsView){let w=document.createElement("span");w.className="nc-hacks-wrap nc-sends-view-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks nc-sends-view",E.dataset.ncSendsView="",w.append(E,te()),w.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),c.append(w)}for(let w of["mute","solo"]){if(!(w==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=w,L.textContent=w==="mute"?"M":"S",E.append(L,te()),E.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&(w==="mute"?M.onMute:M.onSolo)?.()}),c.append(E)}let p=document.createElement("div");p.className="nc-strip-sends";for(let w of e.sends??[])p.append(xe({...w,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(xe(vn(e),t));let h=document.createElement("div");h.className="nc-strip-body";let g=document.createElement("span");g.className="nc-scale",g.setAttribute("aria-hidden","true");for(let w of e.ticks??[]){let E=document.createElement("span");E.className="nc-scale-tick",E.style.setProperty("--tick-pos",String(w.value)),E.textContent=w.label,g.append(E)}let b=Vi({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:w=>{let E=t(n);E?.type==="strip"&&E.onChange(w)},onReset:()=>{let w=t(n);w?.type==="strip"&&ca(w)}}),f=Xi({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let w=t(n);w?.type==="strip"&&w.onClipClear?.()}});if(h.append(g,b.el,f.el),s){let w=document.createElement("button");w.type="button",w.className="nc-ui-fx-fold nc-strip-fold",w.dataset.ncStripFold="",w.setAttribute("aria-expanded","false");let E=document.createElement("span");E.className="nc-strip-fold-cap",E.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let M=document.createElement("span");M.className="nc-strip-fold-pan",M.setAttribute("aria-hidden","true"),M.hidden=!e.pan,w.append(E,M,L),w.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),h.prepend(w)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let x=0;m.addEventListener("click",w=>{let E=t(n);E?.type!=="strip"||!E.onTypeIn||(window.clearTimeout(x),w.detail===0?la(n,m,t):w.detail===1&&(x=window.setTimeout(()=>la(n,m,t),Dr)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(x);let w=t(n);w?.type==="strip"&&ca(w)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(xe($n(e),t)),r&&n.append(r),l&&n.append(l),n.append(o,y,d,c,p,u,h,m,V()),Ao(n,e),n}function vn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??qr(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function $n(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Nr(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function Nr(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function qr(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Dr=250;function la(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??_e(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let s=!1,r=l=>{if(s)return;s=!0;let d=i.value;if(i.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(d)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),i.addEventListener("blur",()=>r(!1))}function Pr(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let s=document.createElement("span");s.className="nc-strip-add-label",o.append(i,s);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),d=r.value;Eo(r),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(o,r,V()),ko(n,e),n}function ko(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],s=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");s!==r&&(o.replaceChildren(...i.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),Eo(o))}function Eo(e){let t=e.options[0];t&&(t.selected=!0)}function ca(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Ao(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),s=i?Gi(i):void 0;s&&(s.configure({step:t.step}),s.set(t.value),s.setText(t.valueText),s.setLabel(`${t.label} level`)),Qi(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let b=t.valueText??_e(t.value);r.textContent!==b&&(r.textContent=b),r.setAttribute("aria-label",`${t.label} level ${b}`);let f=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${f}`:f}for(let b of e.querySelectorAll("[data-nc-ms]")){let f=b.getAttribute("data-nc-ms"),m=f==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",m?"true":"false"),b.setAttribute("aria-label",`${f==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let b=t.hacksLabel??"Hacks";l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${b}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let b=t.sendsViewLabel??"Sends";d.textContent!==b&&(d.textContent=b),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),me(d,t.sendsViewHelp)}let c=e.querySelector("[data-nc-strip-grip]");c instanceof HTMLElement&&(c.setAttribute("aria-label",`Move ${t.label}`),c.title=t.moveHelp??"Drag to move this channel");let p=So(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let b=e.querySelector(`.nc-strip-trim [data-nc-id="${Te(t.trim.id)}"]`);b&&Z(b,$n(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${Te(t.pan.id)}"]`);b&&Z(b,vn(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let h=e.querySelector("[data-nc-strip-hide]");h instanceof HTMLElement&&(Co(h,u,t.label),me(h,t.foldHelp));let g=e.querySelector("[data-nc-strip-fold]");if(g instanceof HTMLElement){g.hidden=!u,g.setAttribute("aria-label",`Expand ${t.label}`);let b=g.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),me(g,t.foldedHelp??t.foldHelp)}}function So(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Mo?t:0}var Mo=8,Qe=null;function da(e,t,n,o){Qe?.();let i=n(e);if(i?.type!=="strip")return null;let s=e.ownerDocument,r=s.defaultView??globalThis,l=s.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let d=s.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let c=s.createElement("div");c.className="nc-strip-menu-shades",c.setAttribute("role","radiogroup"),c.setAttribute("aria-labelledby",d.id);let p=So(i),u=e.querySelector("[data-nc-strip-grip]")??t,h=(x=!1)=>{if(Qe!==h)return;Qe=null;let y=l.contains(s.activeElement);l.remove(),s.removeEventListener("keydown",b,!0),s.removeEventListener("pointerdown",f,!0),r.removeEventListener("resize",m),(x||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},g=[0,...Array.from({length:Mo},(x,y)=>y+1)].map(x=>{let y=s.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",x===p?"true":"false"),y.setAttribute("tabindex",x===p?"0":"-1"),y.dataset.ncShadeChoice=String(x),x===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(x),y.setAttribute("aria-label",`Shade ${x}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${x})`)),y.addEventListener("click",()=>{let w=n(e);h(!0),w?.type==="strip"&&w.onShade?.(x===0?null:x)}),y});if(c.append(...g),c.addEventListener("keydown",x=>{let y=g.indexOf(s.activeElement);if(y<0)return;let w=-1;x.key==="ArrowRight"||x.key==="ArrowDown"?w=(y+1)%g.length:x.key==="ArrowLeft"||x.key==="ArrowUp"?w=(y-1+g.length)%g.length:x.key==="Home"?w=0:x.key==="End"&&(w=g.length-1),!(w<0)&&(x.preventDefault(),g[y].setAttribute("tabindex","-1"),g[w].setAttribute("tabindex","0"),g[w].focus())}),l.append(d,c),typeof i.onMove=="function"){let x=[...e.parentElement?.children??[]].filter(w=>w.classList?.contains("nc-strip")&&!w.hasAttribute("data-nc-master")),y=x.indexOf(e);for(let[w,E,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let M=s.createElement("button");M.type="button",M.className="nc-strip-menu-item",M.dataset.ncStripMove=w<0?"left":"right";let $=s.createElement("span");$.textContent=E;let A=s.createElement("kbd");A.textContent=L,A.setAttribute("aria-hidden","true"),M.append($,A),M.disabled=w<0?y<=0:y<0||y>=x.length-1,M.addEventListener("click",()=>{let v=n(e);h(!0),v?.type==="strip"&&v.onMove?.(w)}),l.append(M)}}s.body.append(l),(()=>{let x=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,w=l.offsetHeight,E=r.innerWidth||s.documentElement.clientWidth||y,L=r.innerHeight||s.documentElement.clientHeight||w,M=o?o.x:x.right-y,$=o?o.y:x.bottom+4;M=Math.max(4,Math.min(M,E-y-4)),$+w>L-4&&($=Math.max(4,(o?o.y:x.top)-w-4)),l.style.left=`${Math.round(M)}px`,l.style.top=`${Math.round($)}px`})();let b=x=>{if(x.key==="Escape")x.preventDefault(),x.stopPropagation(),h(!0);else if(x.key==="Tab"&&l.contains(s.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(E=>E.getAttribute("tabindex")!=="-1"),w=(y.indexOf(s.activeElement)+(x.shiftKey?-1:1)+y.length)%y.length;x.preventDefault(),y[w]?.focus()}},f=x=>{l.contains(x.target)||h(!1)},m=()=>h(!1);return s.addEventListener("keydown",b,!0),s.addEventListener("pointerdown",f,!0),r.addEventListener("resize",m),Qe=h,(g.find(x=>x.getAttribute("tabindex")==="0")??g[0]).focus({preventScroll:!0}),{el:l,close:()=>h(!1)}}var an=typeof ResizeObserver=="function"?new ResizeObserver(Ir):null;function Ir(e){for(let t of e){if(!t.target.isConnected){an.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Br(n)}}function Br(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,s=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+s}px`)}function jr(e){if(an)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))an.observe(t)}function Rr(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",s=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!pt(e)&&!s&&!r)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),s&&l.append(Fo(n,"head")),e.on!==void 0){let d=Ra({checked:e.on,labelledBy:o.id,onChange:c=>{let p=t(d.el);p?.type==="fx"&&p.onToggle?.(c)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}i&&l.append(Or(n,t)),pt(e)&&l.append(Ur(n,t)),r&&l.append(Yr(t)),n.append(l)}i&&n.prepend(_r(n,t)),s&&No(n,e);for(let l of e.controls)n.append(xe(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let c of e.more)l.append(xe(c,t));n.append(l)}return n.append(V()),qo(n,e),jr(n),n}var Hr=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Lo(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&Hr(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Or(e,t){let n=To();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Lo(e))}),n}function To(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Co(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function _r(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let s=document.createElement("span");return s.className="nc-fold-tri",s.setAttribute("aria-hidden","true"),n.append(s,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Fo(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),Lo(e)}}),n}var ze=new Set;function nt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var pt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Vr="(max-width: 768px)";function Gr(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Ur(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Gr()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(zo(e,o,!ze.has(o.id)),n.focus())}),n}function Yr(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function zo(e,t,n){n?ze.add(t.id):ze.delete(t.id),kn(e,t)}function Wr(e,t){t?.type==="fx"&&ze.has(t.id)&&zo(e,t,!1)}function Kr(e){return e.ownerDocument.defaultView?.matchMedia?.(Vr).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function kn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=pt(t)&&ze.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!pt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),nt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ce(r)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",me(n,t.maxHelp)),!o){e.dataset.ncMax&&pa(e);return}if(!e.isConnected){let r=()=>e.isConnected&&ze.has(t.id)&&kn(e,t);queueMicrotask(()=>{e.isConnected?r():nt(e.ownerDocument,r)});return}let i=Kr(e),s=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;s>0&&e.style.setProperty("--nc-fx-dials",String(s)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&pa(e),e.dataset.ncMax=i,i==="over"&&Xr(e,t)),Qr(e.ownerDocument),i==="over"&&En(e),nt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ce(r)})}function pa(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),nt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ce(n)})}function Xr(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function En(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,s=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,r=fs(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),s,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var ua=new WeakSet;function Qr(e){ua.has(e)||(ua.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&En(t)}))}var on=new WeakMap;function Fo(e,t){let n=Gs(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function No(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)me(i,t.meterHelp);let o=on.get(e);o?o.set(t.meter):on.set(e,Ks(n,t.meter))}function qo(e,t){(t.meter||on.has(e))&&No(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let s=e.querySelector("[data-nc-fx-hide]");s instanceof HTMLElement&&(Co(s,i,t.title),me(s,t.foldHelp)),kn(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;r.hidden=i,r.setAttribute("aria-label",d),r.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let c=l.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=d,c.hidden=d==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),me(l,t.foldHelp)}}function me(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Te(e){return e.replace(/["\\]/g,"\\$&")}function Jr(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&Ga(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ce(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&En(n);lr(e)}var Zr=1e3,el=e=>e===!0?"log":typeof e=="string"?e:"linear";function tl(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??el(e.log),i=Ue(o,e.min,e.max),s=n.createElement("div");s.className="nc-field",s.dataset.ncRow="",s.dataset.ncSlider="",s.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?Zr:e.max),l.step=i?"1":String(e.step??"any");let d=n.createElement("span");d.className="nc-readout",d.dataset.ncReadout="";let c=n.createElement("i");c.className="nc-token-probe",c.dataset.ncProbe="",s.append(r,l,d,c);let p=e.value,u=()=>{let g=e.format(p);d.textContent=g,l.setAttribute("aria-valuetext",g)},h=g=>{p=g,n.activeElement!==l&&(l.value=String(i?Oe(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?rt(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",g=>{let b=mn(o,e.min,e.max,p,g.key,g.shiftKey,e.step);b===null||l.disabled||(g.preventDefault(),l.value=String(Oe(o,e.min,e.max,b)),p=b,u(),e.onInput(p))}),l.disabled=e.disabled===!0,h(e.value),{el:s,set:h,setDisabled(g){l.disabled=g===!0}}}var nl=ue["toast-duration"];function al({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function ol(e,t,n,o){let i=l=>({top:l,bottom:l+n}),s=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),r=i(t-o-n);return s(r)?s(i(o))?"bottom":"top":"bottom"}function il(e,t,n,o,i,s){let r=e.bottom+i,l=Math.max(s,Math.min(e.left,o-s-n.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+i,d=!0)}return{top:r,left:l}}var ha="data-nc-ui-toast-live";function sl(e,t){let n=t.querySelector(`[${ha}]`);return n||(n=e.createElement("div"),n.setAttribute(ha,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function rl({message:e,actionLabel:t,onAction:n,duration:o=nl,onClose:i,avoid:s=[],anchor:r,host:l,document:d=globalThis.document}={}){l=l??d.body;let c=d.defaultView??globalThis,p=d.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let u=d.createElement("span");u.className="nc-ui-toast-message",u.textContent=e,p.appendChild(u);let h=null;t&&(h=d.createElement("button"),h.type="button",h.className="nc-ui-toast-action",h.textContent=t,p.appendChild(h)),l.appendChild(p);let g="open",b=B=>B&&typeof B.getBoundingClientRect=="function"?B.getBoundingClientRect():null,f=b(p),m=f?.height||44,x=c.getComputedStyle?.(p),y=Number.parseFloat(x?.getPropertyValue(N("toast-offset")))||16,w=Number.parseFloat(x?.getPropertyValue(N("toast-anchor-gap")))||8,E=b(r),L=c.innerHeight??0,M=s.map(b).filter(Boolean),$=E&&E.bottom>0&&E.top<L?il(E,M,{width:f?.width||0,height:m},c.innerWidth??0,w,y):null;$&&$.top+m<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${$.top+(c.scrollY??0)}px`,p.style.left=`${$.left+(c.scrollX??0)}px`):p.setAttribute("data-placement",ol(M,L,m,y));let A=c.requestAnimationFrame?.bind(c)??(B=>setTimeout(B,16));A(()=>A(()=>{g==="open"&&p.setAttribute("data-state","open")})),sl(d,l).textContent=al({message:e,actionLabel:t});let v,S,T=new Promise(B=>{S=B}),z=B=>{clearTimeout(v),v=setTimeout(()=>ae("timeout"),B)},F=o,P=Date.now(),D=()=>{g==="open"&&(clearTimeout(v),F=Math.max(0,F-(Date.now()-P)))},R=()=>{g==="open"&&(P=Date.now(),z(F))};p.addEventListener("pointerenter",D),p.addEventListener("pointerleave",R),p.addEventListener("focusin",D),p.addEventListener("focusout",R),h?.addEventListener("click",()=>{if(g==="open")try{n?.()}finally{ae("action")}}),Number.isFinite(o)&&z(o);function ae(B="close"){if(g!=="open")return;g="closing",clearTimeout(v),p.setAttribute("data-state","closing"),i?.(B);let G=c.getComputedStyle?.(p),W=G?Math.max(0,...String(G.transitionDuration||"").split(",").map(qe=>Number.parseFloat(qe)*(qe.trim().endsWith("ms")?1:1e3)||0)):0,ye=()=>{g!=="gone"&&(g="gone",p.remove(),S(B))};p.addEventListener("transitionend",ye),setTimeout(ye,W+50)}return{el:p,close:ae,closed:T}}var ut="data-nc-help";function ll(e,t,n,o=0,i=6,s=8){let r=e.top-i-t.height,l=r>=o+s?"above":"below",d=l==="above"?r:e.bottom+i,c=Math.max(s,Math.min(e.left,n-s-t.width));return{top:Math.round(d),left:Math.round(c),side:l}}var qt=new WeakMap;function cl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function dl({document:e=globalThis.document,delay:t=350}={}){if(!e)return{uninstall(){},hide(){}};let n=qt.get(e);if(n)return n;let o=e.defaultView,i=null,s=null,r,l=!1,d,c=()=>{clearTimeout(r),clearTimeout(d),s=null,l=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},p=(b,f)=>{let m=f??b.getAttribute(ut);if(!m)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=m,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let x=b.getBoundingClientRect(),y=ll(x,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,cl(e));return i.style.top=`${y.top}px`,i.style.left=`${y.left}px`,i.dataset.side=y.side,i.style.visibility="",!0},u=b=>{if(l||b.pointerType==="touch")return;let f=b.target&&b.target.closest?b.target.closest(`[${ut}]`):null;f!==s&&(c(),f&&(s=f,r=setTimeout(()=>{s===f&&f.isConnected&&p(f)},t)))},h=b=>{(l||b.key==="Escape")&&c()};e.addEventListener("pointerover",u),e.addEventListener("pointerdown",c,!0),e.addEventListener("keydown",h),o.addEventListener("scroll",c,!0),o.addEventListener("blur",c);let g={hide:c,pin(b,f,{ms:m=0}={}){return c(),!b||!b.isConnected||!p(b,f)?!1:(l=!0,i.dataset.pinned="",m>0&&(d=setTimeout(c,m)),!0)},uninstall(){c(),e.removeEventListener("pointerover",u),e.removeEventListener("pointerdown",c,!0),e.removeEventListener("keydown",h),o.removeEventListener("scroll",c,!0),o.removeEventListener("blur",c),i?.remove(),i=null,qt.delete(e)}};return qt.set(e,g),g}var An="netcomposer.rhythm.hidden.v1",oe=new WeakMap;function Dt(){try{return globalThis.localStorage??null}catch{return null}}function Do(e,t=An){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function ma(e,t,n,o=An){let i=Do(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function Sn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let s of i.controls)o(s)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(s=>({...s,type:"knob",compact:!0}))),i.pan&&n.push(vn(i)),i.trim&&n.push($n(i)));return n}function Po(e,t){if(!(!e||!t))return Sn(e).find(n=>n.id===t)}function pl(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Sn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function ul(e,t){if(!t.title)return;if(!t.panel){let s=document.createElement("h3");s.className="nc-ui-fx-name",s.textContent=t.title,e.append(s);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),Io(e,t)}function Io(e,t){if(!t.panel)return;let n=[...e.children].find(s=>s.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function hl(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=oe.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Po(n,o)}function ml(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=pl(t);if(e.dataset.ncSignature===i){for(let s of o){let r=e.querySelector(`[data-nc-section="${ga(s.id)}"]`);r&&Io(r,s);for(let l of s.controls){let d=e.querySelector(`[data-nc-id="${ga(l.id)}"]`);d instanceof Element&&Z(d,l)}r instanceof HTMLElement&&sn(r,s,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let s of o){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),ul(r,s);let l=s.panel?document.createElement("div"):r;s.panel&&(l.className="nc-panel-body",r.append(l));for(let d of s.controls)l.append(xe(d,hl));e.append(r),sn(r,s,n)}}function Bo(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var fl="(max-width: 768px)",jo=new WeakMap;function fa(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function gl(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=fa("prev"),s=fa("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,r,s,l);let d=(c,p)=>{let u=jo.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let h=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:g}=Bo(h,u.pageSize,(t.pages.get(u.id)??0)+c);t.pages.set(u.id,g),u.onPage?.(g),sn(e,{...u,page:g},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?s:i).focus(),t.redraw()};return i.addEventListener("click",()=>d(-1,i)),s.addEventListener("click",()=>d(1,s)),e.prepend(o),o}function sn(e,t,n){jo.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:s,page:r}=Bo(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,r),s<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of o)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(fl).matches===!0,d=e.closest(".nc-module");o.forEach((m,x)=>{let y=Math.floor(x/i)!==r;if(y?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,y&&!l){let w=d instanceof HTMLElement?oe.get(d):void 0;Wr(m,Po(w,m.dataset.ncId))}});let c=gl(e,n),p=c.querySelector('[data-nc-fx-page="prev"]'),u=c.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),u.setAttribute("aria-disabled",r===s-1?"true":"false");let h=c.querySelector("[data-nc-fx-page-count]"),g=`${r+1} / ${s}`;h.textContent!==g&&(h.textContent=g);let b=c.querySelector("[data-nc-fx-page-live]"),f=`Effects page ${r+1} of ${s}`;b.textContent!==f&&(b.textContent=f)}function ga(e){return e.replace(/["\\]/g,"\\$&")}function bl(e,t=An){ja();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=Do(Dt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let s=document.createElement("h2");s.className="nc-title",s.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Ra({labelledBy:s.id,onChange:y=>(oe.get(n)??e).onToggle?.(y)});c.el.dataset.ncModuleSwitch="",r.append(c.el,l,d);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(s,p,r);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let h=document.createElement("button");h.type="button",h.className="nc-slim";let g=document.createElement("span");g.className="nc-slim-lines",h.append(g);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,u,h),n.setAttribute("aria-labelledby",s.id);let f=y=>{let w=oe.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,h.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${w.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";ma(Dt(),(oe.get(n)??e).id,y,t),f(y),rn(n.parentElement)}),h.addEventListener("click",()=>{ma(Dt(),(oe.get(n)??e).id,!1,t),f(!1),rn(n.parentElement)});let m={pages:new Map,redraw:()=>x.redraw()},x={el:n,update(y){oe.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,s.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),g.textContent=y.summary??y.title,c.el.hidden=y.on===void 0,c.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,h.setAttribute("aria-label",`Show ${y.title}`),ml(u,y,m),f(u.hidden),x.redraw()},redraw(){let y=oe.get(n);y&&Jr(n,Sn(y))}};return oe.set(n,e),f(o),x.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>x.redraw()).observe(n),Pa(()=>x.redraw(),n.ownerDocument),x}function xl(e,t,n="adjacent"){ja(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,s)=>{let r=s%4+1;i.el.dataset.ncShade=String(r),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(i.el),i.redraw()}),rn(e)}function rn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(s=>s instanceof HTMLElement&&s.classList.contains("nc-module")),n=t.some(s=>s.hasAttribute("data-nc-lead")),o=t.map(s=>s.hasAttribute("data-nc-slim")?a("module-slim-column"):n?s.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(s=>!s.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const wl={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"The song's bars. Drag across them to loop a section, drag an end to move it, double-click to clear. While jamming, a change starts at the next lap.","loop-off":"Play the whole song again (from the next lap while jamming).","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in this browser.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"This pass's own quantize. Song follows the Setup."};function Ro(e){return wl[e]??""}const Ho="nc-song-looper",Oo=3,yl=[1,2,3],q=960,I=4,ne=32,ln=4e3,wt=120,ht=40,mt=240,vl=8,Se=40,Mn=["off","1/8","1/16","1/32"],_o=[.5,.75,1],Vo=128,Fe=e=>Math.max(1,Math.floor(e/I)),ie=e=>e.bars*I*q,ba=I*q;function cn(e){const t=e.loop;return t?{start:(t.from-1)*ba,length:(t.to-t.from+1)*ba}:{start:0,length:ie(e)}}function Go(e,t){const n=ie(t);if(!e.repeat||e.endTick>=n)return[0];const o=[];for(let i=0;i<n;i+=e.endTick)o.push(i);return o}function $l(e){const t=Math.round(e.bars*I*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Uo(e,t=new Date,n=Math.random){const o=Math.min(mt,Math.max(ht,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString(),s=i.replace(/[-:T]/g,"").slice(0,12);return{format:Ho,version:Oo,id:`sl-${s}-${Math.floor(n()*65535).toString(16).padStart(4,"0")}`,name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:o,beatsPerBar:I,bars:Math.min(vl,Fe(o)),countInBars:1,ppq:q},passes:[],comps:[]}}const Ee=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),K=e=>Number.isInteger(e),fe=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,Pt=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),ce=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function xa(e){if(e===void 0)return null;if(!Ee(e))return"quantize must be an object";const t=ce(e,["grid","strength"]);return t?`quantize has an unknown field (${t})`:Mn.includes(e.grid)?_o.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%":"quantize grid is not off, 1/8, 1/16 or 1/32"}function kl(e){if(!Ee(e)||e.format!==Ho)return"it isn't a Lupa song";if(!yl.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=ce(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!fe(e.id))return"its id is missing";if(!fe(e.name,Se*2))return"its name is missing";if(!Pt(e.createdAt)||!Pt(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Ee(n))return"its song is missing";const o=ce(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop"]);if(o)return`its song has an unknown field (${o})`;if(!K(n.bpm)||n.bpm<ht||n.bpm>mt)return`its tempo is not ${ht}–${mt}`;if(n.beatsPerBar!==I)return"it isn't in 4/4";if(!K(n.bars)||n.bars<1||n.bars>Fe(n.bpm))return`its bars are not 1–${Fe(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==q)return`its ticks are not ${q} a beat`;const i=xa(n.quantize);if(i)return`its song's ${i}`;if(n.loop!==void 0){if(e.version!==3)return"its song has an unknown field (loop)";const d=n.loop;if(!Ee(d)||ce(d,["from","to"])||!K(d.from)||!K(d.to)||d.from<1||d.to<d.from||d.to>n.bars)return`its loop is not bars 1–${n.bars}`}const s=ie(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>ne)return`it has more than ${ne} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let d=0;d<e.passes.length;d++){const c=e.passes[d],p=`Pass ${d+1}`;if(!Ee(c))return`${p} is not an object`;const u=ce(c,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat"]);if(u)return`${p} has an unknown field (${u})`;if(c.repeat!==void 0&&(e.version!==3||typeof c.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(!fe(c.id)||r.has(c.id))return`${p} has no id of its own`;if(r.add(c.id),!K(c.n)||c.n<1||l.has(c.n))return`${p} has no number of its own`;if(l.add(c.n),!fe(c.name,Se))return`${p}'s name is not 1–${Se} characters`;if(!Pt(c.recordedAt))return`${p}'s date is wrong`;if(!K(c.endTick)||c.endTick<=0||c.endTick>s)return`${p}'s end is not in the song`;for(const b of["kept","mute","solo"])if(typeof c[b]!="boolean")return`${p}'s ${b} is not true or false`;if(typeof c.volume!="number"||!(c.volume>=0&&c.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(c.instruments)||!c.instruments.every(b=>fe(b,64)))return`${p}'s instruments are wrong`;const h=xa(c.quantize);if(h)return`${p}'s ${h}`;if(!Array.isArray(c.events))return`${p}'s events are missing`;if(c.events.length>ln)return`${p} has more than ${ln} events`;let g=Number.NEGATIVE_INFINITY;for(let b=0;b<c.events.length;b++){const f=c.events[b],m=`event ${b+1} in ${p}`;if(!Ee(f))return`${m} is not an object`;if(!fe(f.inst,64)||!c.instruments.includes(f.inst))return`${m} is from an instrument not listed`;if(!K(f.at)||f.at<-wt||f.at>=c.endTick)return`${m} is outside the pass`;if(f.at<g)return`${m} is out of order`;if(g=f.at,f.kind==="take"){if(e.version===1)return`${m} is of an unknown kind`;const y=ce(f,["kind","inst","take","at","len","peaks"]);if(y)return`${m} has an unknown field (${y})`;if(!fe(f.take)||f.take.length>128)return`${m} has no take`;if(!K(f.len)||f.len<1||f.at+f.len>s)return`${m} has a length outside the song`;if(f.peaks!==void 0&&!(Array.isArray(f.peaks)&&f.peaks.length<=Vo&&f.peaks.every(w=>typeof w=="number"&&w>=0&&w<=1)))return`${m} has bad peaks`;continue}if(f.kind==="slot"){const y=ce(f,["kind","inst","slot","at"]);if(y)return`${m} has an unknown field (${y})`;if(!K(f.slot)||f.slot<1||f.slot>16)return`${m} has slot ${String(f.slot)}`;continue}const x=ce(f,["kind","inst","note","vel","at","len","slice","name"]);if(x)return`${m} has an unknown field (${x})`;if(f.kind!==void 0&&f.kind!=="note")return`${m} is of an unknown kind`;if(!K(f.note)||f.note<0||f.note>127)return`${m} has note ${String(f.note)}`;if(typeof f.vel!="number"||!(f.vel>0&&f.vel<=1))return`${m} has velocity ${String(f.vel)}`;if(!K(f.len)||f.len<1||f.len>s)return`${m} has a length outside the song`;if(f.slice!==void 0&&!(K(f.slice)&&f.slice>=0&&f.slice<=255))return`${m} has slice ${String(f.slice)}`;if(f.name!==void 0&&!(typeof f.name=="string"&&f.name.length>0&&f.name.length<=Se))return`${m} has a bad sound name`}}return null}function El(e){const t=kl(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=Oo,{session:n}}class Al{song;b0;passes;drafts=new Map;held=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/q}get lapTicks(){return cn(this.song).length}get lapStart(){return cn(this.song).start}get full(){return this.passes.length>=ne}hasDraft(t){return(this.drafts.get(t)?.count??0)>0}place(t){const n=t-this.b0,o=Math.floor(n/this.lapBeats+1e-12);return{lap:o,tick:Math.round((n-o*this.lapBeats)*q)}}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-wt?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/q}played(t,n){const o=[];for(const i of n){if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="chordPad"||i.type==="lap"){this.stats.ignored++;continue}if(i.type==="take"){const p=this.voicePass(t,i);p&&o.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:s,tick:r}=this.placeOn(i.beat);if(s<0||s<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(s)??{lap:s,events:[],count:0};if(l.events.length>=ln){this.stats.overCap++;continue}let d;const c=this.lapStart+r;if(i.type==="slot")d={kind:"slot",inst:t,slot:i.slot,at:c};else{const p={inst:t,note:i.note,vel:Sl(i.velocity),at:c,len:1};i.slice!==void 0&&(p.slice=i.slice),typeof i.name=="string"&&i.name.trim()&&(p.name=i.name.trim().slice(0,Se)),this.held.set(`${t}|${i.id}`,{ev:p,onBeat:i.beat}),d=p}wa(l.events,d),l.count++,this.drafts.set(s,l),this.stats.taken++,o.push({lap:s,ev:d})}return o}release(t,n,o){const i=`${t}|${n}`,s=this.held.get(i);s&&(this.held.delete(i),s.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-s.onBeat)*q))))}seam(t){const n=this.place(t).lap,o=[];for(let i=this.through+1;i<n;i++){this.through=i;const s=this.commit(i,this.lapTicks);s&&o.push(s)}return o}stop(t){for(const[s,r]of this.held)this.held.delete(s),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-r.onBeat)*q)));const n=this.seam(t),{lap:o,tick:i}=this.place(t);if(o>=0&&o>this.through){this.through=o;const s=I*q,r=Math.min(this.lapTicks,Math.max(s,Math.ceil(Math.max(1,i)/s)*s)),l=this.commit(o,r);l&&n.push(l)}return this.drafts.clear(),n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:i}=this.place(n.beat);if(o<0||!n.take||this.passes.some(c=>c.events.some(p=>p.kind==="take"&&p.take===n.take)))return this.stats.ignored++,null;const s=Math.max(0,Math.min(this.lapTicks-1,i)),r=Math.max(1,Math.min(this.lapTicks-s,Math.round(n.lengthBeats*q))),l={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+s,len:r};Array.isArray(n.peaks)&&n.peaks.length&&(l.peaks=n.peaks.slice(0,Vo).map(c=>Number.isFinite(c)?Math.round(Math.max(0,Math.min(1,c))*100)/100:0)),this.drafts.set(-1-o,{lap:o,events:[l],count:1});const d=this.commitDraft(-1-o,o,this.lapTicks);return d&&this.stats.taken++,d}isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,o){const i=this.drafts.get(n),s=this.lapStart-o;if(this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),i){for(const r of i.events)r.at+=s;i.lap=0,this.drafts.set(0,i)}}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,o){const i=this.drafts.get(t);if(this.drafts.delete(t),!i||i.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=i.count,null;const s=this.passes.reduce((c,p)=>Math.max(c,p.n),0)+1,r=this.lapStart,l=i.events.filter(c=>c.at-r<o),d={id:`p${s}-${this.now().getTime().toString(36)}`,n:s,name:`Pass ${s}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?ie(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(c=>c.inst))],events:l};return this.passes.push(d),this.laps.set(d,n),this.redoStack=[],d}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:n}=this.place(t),o=this.drafts.get(n);if(o&&o.count>0){this.drafts.delete(n);for(const[l,d]of this.held)o.events.includes(d.ev)&&this.held.delete(l);const r={kind:"lap",draft:o};return this.redoStack.push(r),r}const i=this.passes.pop();if(!i)return null;const s={kind:"pass",pass:i};return this.redoStack.push(s),s}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const s=this.passes.findIndex(r=>r.n>n.pass.n);return s<0?this.passes.push(n.pass):this.passes.splice(s,0,n.pass),n}const{lap:o}=this.place(t);if(n.draft.lap===o||n.draft.lap>this.through){const s=this.drafts.get(n.draft.lap);if(s)for(const r of n.draft.events)wa(s.events,r);else this.drafts.set(n.draft.lap,n.draft);return s&&(s.count+=n.draft.count),n}this.drafts.set(n.draft.lap,n.draft);const i=this.commit(n.draft.lap,this.lapTicks);return i?{kind:"pass",pass:i}:null}get canRedo(){return this.redoStack.length>0}}function Sl(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function wa(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const ya=.5,Ml=12,Ll={"1/8":q/2,"1/16":q/4,"1/32":q/8};function va(e,t){const n=t?Ll[t.grid]:void 0;if(!t||!n)return e;const o=Math.round(e/n)*n;return Math.round(e+(o-e)*t.strength)}function $a(e,t){return e.mute?!1:t?e.solo:!0}const ka=e=>e.kind==="slot",It=e=>e.kind==="take",Tl=.05;class Cl{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];takesSent=new Map;announceLaps=!0;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.restart()}rebase(t){for(const[n,o]of this.takesSent)o<=t+1e-9&&this.takesSent.delete(n)}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;const n=[...this.takesSent.values()].some(o=>o>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(o=>o.beat<t);for(const[o,i]of this.takesSent)i>t&&this.takesSent.delete(o);for(const[o,i]of this.sounding)this.sounding.set(o,i.filter(s=>s.start<t))}}pump(t,n,o){const i=this.rec,s=[];if(this.waiting.length){const v=[];for(const S of this.waiting){if(i.isHeld(S.ev)){v.push(S);continue}if(S.beat>=t)s.push(S);else{const T=Math.min(S.ev.len,this.rec.lapTicks)/q-(t-S.beat);T>.05&&s.push({...S,beat:t,lenBeats:T})}}this.waiting=v}const r=Math.max(this.sentTo,t);if(!(n>r)&&!s.length&&!this.lateTakes(t))return 0;const l=o?.lapTicks??i.lapTicks,d=l/q,c=o?.lapStart??i.lapStart,p=c+l,u=o?.b0??i.b0,h=(v,S)=>u+v*d+(S-c)/q,g=v=>v>=c-wt&&v<p,b=Math.max(0,Math.floor((r-u)/d)-1),f=Math.floor((n-u)/d)+1,m=[],x=(v,S,T)=>{const z=T+v.at;if(!g(z))return;const F=h(S,z);F>=r&&F<n&&m.push({inst:v.inst,beat:F,slot:v.slot})},y=[],w=(v,S,T,z)=>{const F=z+S.at,P=Math.min(F+S.len,z+v.endTick),D=Math.max(F,c),R=Math.min(P,p);if(R<=D)return;const ae=h(T,D),B=h(T,R),G=`${v.id}|${T}|${z}`;if(this.takesSent.has(G)||B<=t||ae>=n)return;const W=Math.max(ae,t);if(B-W<Tl)return;const ye=(D-F)/q+(W-ae),qe={type:"take",id:`t${++this.serial}`,beat:W,take:S.take,lengthBeats:ye+(B-W),gain:Math.max(0,Math.min(1,v.volume))};ye>1e-9&&(qe.offsetBeats=ye),this.takesSent.set(G,B),y.push({inst:S.inst,ev:qe})},E=i.passes,L=E.some(v=>v.solo&&!v.mute),M=(v,S,T,z,F,P)=>{if(!g(z))return;const D=h(F,z);D>=r&&D<n&&(i.isHeld(T)?this.waiting.push({inst:v,age:S,beat:D,ev:T,velocity:P}):s.push({inst:v,age:S,beat:D,ev:T,velocity:P}))};for(const v of E){if(!$a(v,L))continue;const S=o?void 0:i.lapOf(v),T=S===void 0?0:S+1,z=v.quantize??this.song.quantize,F=Go(v,this.song);for(let P=Math.max(T,b);P<=f;P++)for(const D of F)for(const R of v.events)if(!(R.at>=v.endTick)){if(ka(R)){x(R,P,D);continue}if(It(R)){w(v,R,P,D);continue}M(R.inst,v.n,R,D+va(R.at,z),P,R.vel*v.volume)}}if(!L)for(const v of i.drafting())for(let S=Math.max(o?0:v.lap+1,b);S<=f;S++)for(const T of v.events){if(ka(T)){x(T,S,0);continue}It(T)||M(T.inst,Number.POSITIVE_INFINITY,T,va(T.at,this.song.quantize),S,T.vel)}if(this.announceLaps&&!i.full&&!i.paused){const v=[];for(let S=Math.max(0,Math.ceil((r-u)/d));u+S*d<n;S++)v.push({type:"lap",id:`l${++this.serial}`,beat:u+S*d,lengthBeats:d});v.length&&(this.sink.laps(v),this.stats.laps+=v.length)}if(this.sentTo=Math.max(this.sentTo,n),y.length){const v=new Map;for(const S of y)v.set(S.inst,[...v.get(S.inst)??[],S.ev]);for(const[S,T]of v)this.sink.controls(S,T);this.stats.takes+=y.length}if(m.length){m.sort((S,T)=>S.beat-T.beat);const v=new Map;for(const S of m){const T=v.get(S.inst)??[];T.push({type:"slot",id:`s${++this.serial}`,beat:S.beat,slot:S.slot}),v.set(S.inst,T)}for(const[S,T]of v)this.sink.controls(S,T);this.stats.slots+=m.length}if(!s.length)return 0;s.sort((v,S)=>v.beat-S.beat||S.age-v.age);const $=new Map;for(const v of s){const S=v.lenBeats??Math.max(1,Math.min(v.ev.len,l))/q;if(!this.voice(v.inst,v.beat,v.beat+S,v.age)){this.stats.dropped++;continue}const T={note:v.ev.note,velocity:Math.max(.01,Math.min(1,v.velocity)),startBeat:v.beat,lengthBeats:S,spanBeats:S,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:v.ev.note};v.ev.slice!==void 0&&(T.slice=v.ev.slice);const z=$.get(v.inst)??[];z.push(T),$.set(v.inst,z)}let A=0;for(const[v,S]of $)this.sink.send(v,S),A+=S.length;return this.stats.sent+=A,A}lateTakes(t){const n=this.rec,o=Math.floor((t-n.b0)/n.lapBeats),i=n.passes.some(s=>s.solo&&!s.mute);return n.passes.some(s=>{if(!$a(s,i)||!s.events.some(It))return!1;const r=n.lapOf(s);return r===void 0||o>r})}voice(t,n,o,i){const s=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(s.length>=Ml){let r=0;for(let l=1;l<s.length;l++)s[l].age<s[r].age&&(r=l);if(i<=s[r].age)return this.sounding.set(t,s),!1;s.splice(r,1)}return s.push({start:n,end:o,age:i}),this.sounding.set(t,s),!0}}const zl={running:!1,beatAt:()=>0,timeAt:()=>0};class Fl{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];constructor(t,n){this.session=t,this.deps=n,this.rec=new Al({song:t.song,b0:0,passes:t.passes,now:n.date}),this.replay=n.sink?new Cl(this.rec,n.sink):null;const o=n.host;o?.clock&&this.offs.push(o.clock.onChange(i=>this.clockChanged(i))),o?.onPlayed&&this.offs.push(o.onPlayed((i,s)=>this.played(i,s))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],i=>(i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??zl}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(mt,Math.max(ht,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Fe(n)),this.changed())}toggle(){this.jamming||this.wantJam?this.stop():this.jam()}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.transport.running){const o=Math.ceil(this.beatNow()/I+.05)*I;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}begin(t){this.wantJam=!1,this.jamming=!0;const n=t+this.session.song.countInBars*I;if(this.rec.resume(n),this.replay?.start(),this.transport.running){const o=Math.min(t,this.beatNow());this.replay?.pump(o,this.transport.beatAt(this.deps.now()+ya))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,n)}showCountIn(t,n){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||n<=t)return;const i=this.transport,s=l=>o.mapper?.toContextTime(i.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(s(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,d)=>d%I===0),until:s(n)})}catch{}}stop(){const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null),this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){t.kind==="start"&&this.wantJam?this.begin(typeof t.beat=="number"?t.beat:0):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),this.changed(!1)}played(t,n){if(!this.jamming)return;const o=this.rec.played(t,n);o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),n!==this.lastLap&&(this.lastLap=n,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const s=this.rec.seam(t),r=this.pending;if(r&&t>=r.seam){this.pending=null;const c=this.rec.lapStart,p=this.rec.place(t).lap;this.applyLoop(r.loop),this.rec.rebase(r.seam,p,c),this.replay?.rebase(r.seam),this.lastLap=-1,this.changed()}const l=this.transport.beatAt(this.deps.now()+ya),d=this.pending;if(d&&l>d.seam){this.replay?.pump(t,d.seam);const c=cn({bars:this.session.song.bars,...d.loop?{loop:d.loop}:{}});this.replay?.pump(Math.max(t,d.seam),l,{b0:d.seam,lapStart:c.start,lapTicks:c.length})}else this.replay?.pump(t,l);return s.length?(this.changed(),!0):o}view(){const t=this.session,n=this.transport,o=this.jamming&&n.running?this.beatNow():null,i=o===null?null:this.rec.place(o),s=o!==null&&o<this.rec.b0,r=t.passes.reduce((c,p)=>Math.max(c,p.n),0)+1,l=this.deps.host?.studioTransport?.bpm(),d=this.jamming?s?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:d,jamming:this.jamming||this.wantJam,bar:i&&!s?Math.floor((this.rec.lapStart+i.tick)/(I*960))+1:null,songPos:i&&!s?(this.rec.lapStart+i.tick)/ie(t.song):null,pendingLoop:this.pending?.loop,nextPass:r,countIn:s&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!s?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof l=="number"&&Math.round(l)!==t.song.bpm?Math.round(l):null,notice:this.notice}}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const o=Math.max(1,Math.min(Fe(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=o;else if(o>n.bars&&t.grow){n.bars=o;const i=ie(n);for(const s of this.session.passes)s.endTick<i&&s.repeat===void 0&&(s.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let o=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),d=Math.max(l,Math.min(n.bars,Math.round(t.to)));o=l===1&&d===n.bars?null:{from:l,to:d}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(o),this.changed();return}const i=this.beatNow(),{lap:s}=this.rec.place(i),r=this.rec.beatOf(Math.max(s+1,0),0);this.pending={loop:o,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const o=this.pass(t);if(o){if(n.name!==void 0){const i=n.name.replace(/\s+/g," ").trim().slice(0,Se);o.name=i||`Pass ${o.n}`}n.kept!==void 0&&(o.kept=n.kept),n.mute!==void 0&&(o.mute=n.mute),n.solo!==void 0&&(o.solo=n.solo),n.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&o.endTick<ie(this.session.song)&&(o.repeat=n.repeat),n.quantize===null?delete o.quantize:n.quantize&&(o.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(i=>i.id===t);if(n<0)return null;const[o]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),o?{pass:o,index:n}:null}restorePass(t,n){const o=this.session.passes;return o.length>=ne||o.some(i=>i.id===t.id)?!1:(o.splice(Math.min(Math.max(0,n),o.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){this.jamming&&this.stop();const t=Uo(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.notice="",this.changed(),t}get passCount(){return this.session.passes.length}get maxPasses(){return ne}dispose(){for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const Nl="netcomposer-looper",Me="sessions",ql="netcomposer.looper.current.v1",Dl=500;function Pl(e){return new Promise((t,n)=>{const o=e.open(Nl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Me)||o.result.createObjectStore(Me,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}function Il(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Bl(e={}){const t=e.idb===void 0?Ea(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?Ea(()=>globalThis.localStorage):e.local,o=e.currentKey??ql;let i=null;const s=()=>t?(i??=Pl(t),i):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,d=Promise.resolve(),c=0;const p=h=>{const g=structuredClone(h);d=d.then(async()=>{const f=(await s()).transaction(Me,"readwrite");f.objectStore(Me).put(g),await Il(f);try{n?.setItem(o,g.id)}catch{}}).catch(()=>{c++})},u=()=>{l&&clearTimeout(l),l=null;const h=r;r=null,h&&p(h)};return{async load(){let h=null;try{h=n?.getItem(o)??null}catch{h=null}if(!h||!t)return null;try{const f=(await s()).transaction(Me,"readonly").objectStore(Me).get(h),m=await new Promise((x,y)=>{f.onsuccess=()=>x(f.result),f.onerror=()=>y(f.error)});return m===void 0?null:El(m)}catch{return null}},save(h,g=!1){if(r=h,g){u();return}l||(l=setTimeout(u,Dl))},async flush(){u(),await d},get failures(){return c}}}function Ea(e){try{return e()??null}catch{return null}}const Yo=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let ve;function jl(){if(ve!==void 0)return ve;ve=null;try{ve=Yo()?.attach("looper",{instance:1})??null}catch{ve=null}return ve}function Rl(){return Yo()?.countIn??null}function Hl(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const Ol="netcomposer.looper.hidden.v1",_l=50;function k(e,t={},...n){const o=document.createElement(e);for(const[i,s]of Object.entries(t))s!==void 0&&o.setAttribute(i,s);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const Y=e=>({[ut]:Ro(e)||void 0});function _(e,t,n){const o=k("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function Ie(e,t){return k("span",{class:"nc-label",...t?Y(t):{}},e)}function Wo(e,t,n,o,i,s=!1){const r=k("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const d=_(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});d.disabled=s,r.append(d)}return r}function ft(e,t,n,o,i,s="lp-toggle"){return _(t,{class:s,"aria-pressed":String(n),"data-lp-id":e,...Y(o)},i)}function Ln(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function Ko(e,t,n){const o=k("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),s=bl(i(),Ol),r=()=>{const l=s.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return r(),{handle:s,mount:o,update(){s.update(i()),r()}}}const X=jl(),yt=Bl({currentKey:X?.storageKey?.("netcomposer.looper.current.v1")}),$e=await yt.load();let Xo="",dn;$e&&"session"in $e?dn=$e.session:($e&&"error"in $e&&(Xo=`Your last song didn't open: ${$e.error}. A new one is started.`),dn=Uo(X?.studioTransport?.bpm()??120));function Vl(){let e=null;try{e=X?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,o=i=>{n.has(i)||(n.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,s){o(i),t.send(s,i)},controls(i,s){o(i),t.sendControls(s,i)},laps(i){let s=[];try{s=(X?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{s=[]}for(const r of s)o(r),t.sendControls(i,r)},off(i){t.off(i===void 0?"stop":"off",i)},restart(){t.restart()}}}const C=new Fl(dn,{host:X,countIn:Rl(),load:Hl,now:hi,save:e=>yt.save(e),sink:Vl()});C.notice=Xo;addEventListener("pagehide",()=>yt.save(C.session,!0));const Qo=document.getElementById("app");Qo.classList.add("nc","nc-page");dl();const Jo=k("header",{class:"nc-page-hd"},k("div",{},k("h1",{class:"nc-page-title"},k("span",{class:"lp-brand"},"LUPA")," ",k("span",{class:"nc-page-sep"},"/")," LOOPER ",k("span",{class:"nc-page-sep"},"/")," ",k("span",{class:"nc-mono"},"01")),k("p",{class:"nc-page-sub"},"A NetComposer element.")),k("div",{class:"nc-page-actions"},_("New song",{class:"nc-page-action","data-lp-id":"new-song",...Y("new-song")},()=>Ul()))),Zo=k("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),ei=k("footer",{class:"lp-foot lp-sub"},k("span",{class:"lp-notice",role:"status"}),k("span",{class:"lp-mono"},"netcomposer.looper.01"));Qo.append(Jo,k("main",{class:"nc-page-body"},Zo),ei);let ke=null;function Gl(){return Jo.querySelector('[data-lp-id="new-song"]')}function Bt(e){const t=Gl();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function Ul(){if(C.passCount&&!ke){Bt(!0),ke=setTimeout(()=>{ke=null,Bt(!1)},4e3);return}ke&&clearTimeout(ke),ke=null,Bt(!1),C.newSong(),Ge=null,U="all",C.notice="New song started. The last one stays in this browser.",se()}const ti=k("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),pe=X?.metronome,ni=tl({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((pe?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>pe?.set({volume:e/100})});ni.el.setAttribute(ut,Ro("volume"));pe?.onChange(()=>se());function Aa(e,t,n,o,i,s=!1){const r=k("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e});for(const l of n){const d=k("option",{value:l.value},l.label);l.value===o&&(d.selected=!0),r.append(d)}return r.disabled=s,r.addEventListener("change",()=>i(r.value)),r}let de=null;function Yl(e){if(de===null)return null;const t=e.session.song,n=de*I*q,o=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),i=o.length?Math.max(...o.map(l=>Math.floor(n/l.endTick))):de/t.bars,s=l=>{const d=de;de=null,l&&d&&C.setSong({bars:d,grow:l}),se()},r=o.length;return k("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},k("span",{class:"lp-ask-title"},`Grow to ${de} bars?`),k("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),_(`Repeat ×${Math.max(2,Math.round(i))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>s("repeat")),_("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>s("once")),_("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>s(null)))}function Wl(e){const t=e.session.song,n=[1,2,4,8,16].filter(i=>i<=Fe(t.bpm)&&(!e.locked||i>=t.bars)),o=t.quantize;Ln(ti,k("h3",{class:"lp-section-title"},"Setup"),k("div",{class:"lp-field"},Ie("Tempo","tempo"),k("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?k("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?k("span",{class:"lp-sub"},"Locked: the song has passes."):k("span",{class:"lp-sub"},"Follows the Studio.")),k("div",{class:"lp-field"},Ie("Length","bars"),Wo("bars","Bars",n.map(i=>({value:String(i),label:String(i)})),String(de??t.bars),i=>{const s=Number(i);e.locked&&s>t.bars?(de=s,se()):C.setSong({bars:s})},e.jamming),Yl(e)??k("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${$l(t)}`)),k("div",{class:"lp-row lp-toggles"},ft("count-in","Count-in",t.countInBars===1,"count-in",()=>C.setSong({countInBars:t.countInBars?0:1})),pe?ft("metronome","Metronome",pe.prefs().on,"metronome",()=>pe.set({on:!pe.prefs().on})):null),pe?ni.el:null,k("div",{class:"lp-pair"},k("label",{class:"lp-field"},Ie("Quantize","quantize"),Aa("quantize","Quantize",Mn.map(i=>({value:i,label:i==="off"?"Off":i})),o?.grid??"off",i=>C.setSong({quantize:i==="off"?null:{grid:i,strength:o?.strength??1}}))),k("label",{class:"lp-field"},Ie("Strength","strength"),Aa("strength","Strength",_o.map(i=>({value:String(i),label:`${Math.round(i*100)}%`})),String(o?.strength??1),i=>o&&C.setSong({quantize:{grid:o.grid,strength:Number(i)}}),!o))))}const ai=Ko("jam","Jam",()=>{const e=C.view(),t=e.session.song.loop,n=t?`loop ${Ne(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${C.passCount} / ${ne} passes`});function Ne(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const Kl="http://www.w3.org/2000/svg",O=(e,t)=>{const n=document.createElementNS(Kl,e);for(const[o,i]of Object.entries(t))n.setAttribute(o,i);return n},Ve=44,pn=2*Math.PI*Ve,oi=O("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),ii=O("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(Ve),"stroke-width":"3","stroke-dasharray":`0 ${pn}`,transform:"rotate(-90 50 50)"}),at=O("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});oi.append(O("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(Ve),"stroke-width":"1"}),ii,at);const si=k("span",{class:"lp-bar","data-lp-id":"bar"},"–"),ri=k("span",{class:"lp-pass","data-lp-id":"pass"}),Xl=k("div",{class:"lp-ring"},oi,k("div",{class:"lp-ring-mid"},si,ri));function li(e){const t=e.lapPos??0;ii.setAttribute("stroke-dasharray",`${t*pn} ${pn}`);const n=t*2*Math.PI;at.setAttribute("cx",String(50+Ve*Math.sin(n))),at.setAttribute("cy",String(50-Ve*Math.cos(n))),at.style.visibility=e.lapPos===null?"hidden":"visible";const o=e.session.song.loop;si.textContent=e.countIn!==null?String(e.countIn):o?e.bar!==null?`${e.bar} · ${Ne(o)}`:Ne(o):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const i=e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${ne} / ${ne}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;ri.replaceChildren(...e.phase==="recording"?[k("span",{class:"lp-dot","aria-hidden":"true"})]:[],i)}function Ql(e){const t=_(e.jamming?"STOP":"JAM",{class:"nc-btn lp-big","data-lp-id":"jam",...Y(e.jamming?"stop":"jam"),...e.jamming?{}:{"data-jam":""}},()=>C.toggle());t.disabled=!X;const n=_("UNDO",{class:"nc-btn","data-lp-id":"undo",...Y("undo")},()=>C.undo());n.disabled=!e.lapHasNotes&&!C.passCount;const o=_("REDO",{class:"nc-btn","data-lp-id":"redo",...Y("redo")},()=>C.redo());o.disabled=!e.canRedo,li(e);const i=e.session.song.loop,s=e.pendingLoop,r=s!==void 0?k("p",{class:"lp-sub","data-lp-id":"loop-next"},s?`Loop ${Ne(s)} from the next lap.`:"Loop off from the next lap."):null,l=i&&s===void 0?k("div",{class:"lp-loop-line"},k("span",{},`Loop ${Ne(i)}`),_("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...Y("loop-off")},()=>C.setLoop(null))):null;Ln(ai.mount,k("div",{class:"lp-jam-stack"},Xl,t,k("div",{class:"lp-two"},n,o),l,r,X?null:k("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),ti)}const vt=Ko("passes","Passes",()=>`${C.passCount} / ${ne}`);let Ge=null,U="all";const Jl={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},$t={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},kt=e=>e.split("#")[0]??e,Zl=e=>$t[kt(e)]?.noun[0]==="hit",ci=e=>e.kind!=="slot"&&e.kind!=="take";function He(e){const[t=e,n]=e.split("#"),o=Jl[t]??t.toUpperCase();return n?`${o} ${n}`:o}function ec(e,t){const n=new Map;for(const i of e.events)i.inst===t&&ci(i)&&i.name&&n.set(i.name,(n.get(i.name)??0)+1);const o=[...n].sort((i,s)=>s[1]-i[1]).map(([i])=>i);return o.length?o.length===1?o[0]:`${o[0]} +${o.length-1}`:""}function Sa(e,t){let n=0,o=0,i=0;for(const d of e.events)d.inst===t&&(d.kind==="slot"?o++:d.kind==="take"?i++:n++);const[s,r]=$t[kt(t)]?.noun??["note","notes"],l=[];return i&&l.push(i===1?"voice":`${i} takes`),n&&l.push(`${n} ${n===1?s:r}`),o&&l.push(`${o} slot ${o===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Tn=new Map,tc=1;function nc(e,t){const n=t.bars,o=q,i=ie(t),s=Go(e,t),r=t.loop,l=r?(r.from-1)*I*q:0,d=r?r.to*I*q:i,c=($,A)=>(A>0?.45:1)*($>=l-wt&&$<d?1:.35),p=1e3,u=34,h=O("svg",{class:"lp-strip",viewBox:`0 0 ${p} ${u}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});r&&h.append(O("rect",{class:"lp-strip-loop",x:String(l/i*p),y:"0",width:String((d-l)/i*p),height:String(u)}));const g=n*I;for(let $=1;$<g;$++){const A=String($*p/g);$%I!==0&&n>8||h.append($%I===0?O("line",{class:n>8&&$%(4*I)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:A,x2:A,y1:"0",y2:String(u)}):O("line",{class:"lp-strip-beat",x1:A,x2:A,y1:String(u/2-2),y2:String(u/2+2)}))}const b=e.events.filter(ci),f=[],m=o/4*tc,x=new Set(b.filter($=>Zl($.inst)).map($=>$.inst)),y=new Map,w=[...new Set(b.filter($=>x.has($.inst)).map($=>$.note))].sort(($,A)=>A-$);w.length>=2&&w.length<=4&&w.forEach(($,A)=>y.set($,A));const E=b.filter($=>!x.has($.inst)).map($=>$.note);let L=Math.min(...E)-2,M=Math.max(...E)+2;if(M-L<12){const $=(M+L)/2;L=$-6,M=$+6}for(const $ of s)for(const A of b){const v=$+A.at;if(v>=i||A.at>=e.endTick)continue;const S=v/i*p,T=((.35+.65*A.vel)*c(v,$)).toFixed(2);if(x.has(A.inst)){const z=y.get(A.note);let F,P;if(z===void 0){const D=4+A.vel*9;F=u/2-D,P=u/2+D}else{const D=6+z*(u-12)/Math.max(1,y.size-1);F=D-3,P=D+3}h.append(O("line",{class:"lp-strip-hit",x1:S.toFixed(1),x2:S.toFixed(1),y1:F.toFixed(1),y2:P.toFixed(1),"stroke-opacity":T})),f.push(v/i,Math.min(1,(v+m)/i))}else{const z=Math.min(i,v+Math.max(1,A.len))/i*p,F=(4+(1-(A.note-L)/(M-L))*(u-8)).toFixed(1);h.append(O("line",{class:"lp-strip-note",x1:S.toFixed(1),x2:Math.max(S+.1,z-2).toFixed(1),y1:F,y2:F,"stroke-opacity":T})),f.push(v/i,Math.min(1,(v+Math.max(m,A.len))/i))}}for(const $ of s)for(const A of e.events){if(A.kind!=="take")continue;const v=$+A.at;if(v>=i)continue;const S=v/i*p,T=Math.min(i,v+A.len,$+e.endTick)/i*p,z=A.peaks?.length?A.peaks:[.35,.35],F=z.length,P=u/2,D=G=>Math.max(.6,G*(u/2-2)),R=z.map((G,W)=>[S+(T-S)*W/Math.max(1,F-1),D(G)]),ae=R.map(([G,W])=>`${G.toFixed(1)},${(P-W).toFixed(1)}`),B=[...R].reverse().map(([G,W])=>`${G.toFixed(1)},${(P+W).toFixed(1)}`);h.append(O("path",{class:"lp-strip-voice",d:`M${ae.join(" L")} L${B.join(" L")} Z`,opacity:c(v,$).toFixed(2)})),f.push(v/i,Math.min(1,(v+A.len)/i))}for(const $ of s)for(const A of e.events){if(A.kind!=="slot"||$+A.at>=i)continue;const v=(($+A.at)/i*p).toFixed(1);h.append(O("line",{class:"lp-strip-slot",x1:v,x2:v,y1:"0",y2:String(u)}))}if(e.endTick<i&&!e.repeat){const $=(e.endTick/i*p).toFixed(1);h.append(O("line",{class:"lp-strip-end",x1:$,x2:$,y1:"8",y2:String(u-8)}))}return Tn.set(e.id,Float32Array.from(f)),h}function Je(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const gt={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6"};function Cn(e){const t=O("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(O("path",{d:e})),t}function Ma(e,t,n,o,i){const s=_("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...o},i);return s.append(Cn(n)),s}let La=null;function ac(e){Ge===e.id&&(Ge=null);const t=C.deletePass(e.id);if(!t)return;La?.close();const n=rl({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>C.restorePass(t.pass,t.index),anchor:vt.mount});n.el.setAttribute("data-lp-id","delete-toast"),La=n}function oc(e,t){const n=C.session.song,o=I*n.ppq,i=Ge===e.id,s=[...new Set(e.instruments)],r=_("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(i)},()=>{Ge=i?null:e.id,se()}),l=k("span",{class:"lp-pass-line"},k("span",{class:"lp-pass-title"},e.name));for(const f of s)l.append(k("span",{class:"lp-inst","data-inst":$t[kt(f)]?.token??""},He(f)));const d=[];for(const f of s){const m=ec(e,f);d.push(m?`${m} · ${Sa(e,f)}`:Sa(e,f))}s.length||d.push("Empty"),e.mute&&d.push("muted"),r.append(k("span",{class:"lp-now","aria-hidden":"true"}),k("span",{class:"lp-pass-text"},l,k("span",{class:"lp-pass-sub"},d.join(" · "))));const c=k("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...Y("pass-volume")});c.value=String(Math.round(e.volume*100));const p=k("span",{class:"lp-db","data-lp-id":`db-${e.id}`},Je(e.volume));c.style.setProperty("--lp-fill",`${c.value}%`),c.setAttribute("aria-valuetext",Je(e.volume)),c.addEventListener("input",()=>{const f=Number(c.value)/100;p.textContent=Je(f),c.style.setProperty("--lp-fill",`${c.value}%`),c.setAttribute("aria-valuetext",Je(f)),C.editPass(e.id,{volume:f})});const u=k("div",{class:"lp-ms-pair"},ft(`mute-${e.id}`,"M",e.mute,"mute",()=>C.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),ft(`solo-${e.id}`,"S",e.solo,"solo",()=>C.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));u.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),u.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const h=Ma(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,gt.star,{"aria-pressed":String(e.kept),...Y("star")},()=>C.editPass(e.id,{kept:!e.kept})),g=Ma(`delete-${e.id}`,`Delete ${e.name}`,gt.trash,Y("delete"),()=>ac(e)),b=k("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...i?{"data-open":""}:{}},r,k("div",{class:"lp-tools"},ic(e,n),u,k("div",{class:"lp-acts"},h,g)),k("div",{class:"lp-strip-box"},nc(e,n),k("span",{class:"lp-head","aria-hidden":"true"})),k("div",{class:"lp-vol"},c,p));if(i){const f=new Set;for(const w of e.events)f.add(Math.floor(w.at/o));const m=k("div",{class:"lp-bars",style:`--lp-bars: ${n.bars}`});for(let w=0;w<n.bars;w++)m.append(k("span",f.has(w)?{"data-on":""}:{},String(w+1)));const x=k("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});x.addEventListener("change",()=>C.editPass(e.id,{name:x.value}));const y=e.quantize;b.append(k("div",{class:"lp-sheet"},x,k("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),k("span",{class:"lp-sub"},`Plays through ${s.map(He).join(" and ")||"its instrument"}'s current sound.`),m,k("div",{class:"lp-field"},Ie("Quantize","pass-quantize"),Wo(`pq-${e.id}`,"Pass quantize",[{value:"song",label:"Song"},...Mn.map(w=>({value:w,label:w==="off"?"Off":w}))],y?.grid??"song",w=>C.editPass(e.id,{quantize:w==="song"?null:{grid:w,strength:y?.strength??1}})))))}return b}function ic(e,t){const n=ie(t);if(e.endTick>=n)return k("span",{class:"lp-repeat-none","aria-hidden":"true"});const o=Math.ceil(n/e.endTick),i=!!e.repeat,s=Math.round(e.endTick/(I*q)),r=_(i?`×${o}`:"once",{class:"lp-repeat","aria-pressed":String(i),"aria-label":i?`${e.name} repeats every ${s} ${s===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...Y("repeat")},()=>C.editPass(e.id,{repeat:!i}));return i&&r.prepend(Cn(gt.loop)),r}function sc(e){const t=e.session.song,n=t.bars,o=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,i=k("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...Y("ruler")}),s=k("div",{class:"lp-ruler-nums","aria-hidden":"true"});for(let h=1;h<=n;h++)s.append(k("span",o&&h>=o.from&&h<=o.to?{"data-in":""}:{},String(h)));const r=k("div",{class:"lp-ruler-lane"}),l=k("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=h=>{l.hidden=!h,h&&(l.style.setProperty("--lp-from",String(h.from-1)),l.style.setProperty("--lp-to",String(h.to)))};d(o);const c=h=>{const g=k("button",{type:"button",class:"lp-loop-handle","data-end":h,"aria-label":h==="from"?"Loop start":"Loop end","data-lp-id":`loop-${h}`});return g.addEventListener("keydown",b=>{const f=t.loop;if(!f||b.key!=="ArrowLeft"&&b.key!=="ArrowRight")return;b.preventDefault();const m=b.key==="ArrowLeft"?-1:1,x={...f};h==="from"?x.from=Math.max(1,Math.min(f.to,f.from+m)):x.to=Math.min(n,Math.max(f.from,f.to+m)),C.setLoop(x)}),g.addEventListener("pointerdown",b=>{const f=o;f&&(b.stopPropagation(),u(b,m=>h==="from"?{from:Math.min(m,f.to),to:f.to}:{from:f.from,to:Math.max(m,f.from)}))}),g};l.append(c("from"),c("to"));const p=h=>{const g=r.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((h-g.left)/Math.max(1,g.width)*n)+1))},u=(h,g)=>{if(e.jamming&&!X)return;r.setPointerCapture?.(h.pointerId);let b=g(p(h.clientX));d(b);const f=x=>{b=g(p(x.clientX)),d(b)},m=()=>{r.removeEventListener("pointermove",f),r.removeEventListener("pointerup",m),r.removeEventListener("pointercancel",m),C.setLoop(b)};r.addEventListener("pointermove",f),r.addEventListener("pointerup",m),r.addEventListener("pointercancel",m)};return r.addEventListener("pointerdown",h=>{if(h.button!==0)return;const g=p(h.clientX);u(h,b=>({from:Math.min(g,b),to:Math.max(g,b)}))}),r.addEventListener("dblclick",()=>C.setLoop(null)),!o&&n>1&&r.append(k("span",{class:"lp-ruler-hint"},k("span",{},"Drag across the bars to loop a section"))),r.append(l),i.append(s,r),i}function rc(e){if(e.length<2)return null;const t=new Map;for(const s of e)for(const r of new Set(s.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(s=>s.kept).length;U!=="all"&&U!=="starred"&&!t.has(U)&&(U="all"),U==="starred"&&!n&&(U="all");const o=(s,r,l,d={})=>{const c=_("",{class:"lp-chip","aria-pressed":String(U===s),"data-lp-id":`filter-${s}`,...d},()=>{U=U===s?"all":s,se()});return c.append(r,k("span",{class:"lp-chip-n"},String(l))),c},i=k("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},o("all","All",e.length));for(const[s,r]of[...t].sort((l,d)=>He(l[0]).localeCompare(He(d[0]))))i.append(o(s,He(s),r,{"data-inst":$t[kt(s)]?.token??""}));return n&&i.append(o("starred",Cn(gt.star),n,{"aria-label":"Starred"})),i}function lc(e){const t=e.session.passes,n=t.some(l=>l.solo),o=t.filter(l=>U==="all"?!0:U==="starred"?l.kept:l.instruments.includes(U)),i=k("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&i.append(k("div",{class:"lp-pass-head"},sc(e))),e.phase==="recording"&&i.append(k("div",{class:"lp-pass-row lp-live","data-live":""},k("span",{class:"lp-pass-name"},k("span",{class:"lp-dot","aria-hidden":"true"}),k("span",{class:"lp-pass-text"},k("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),k("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),Tn.clear();for(const l of[...o].reverse())i.append(oc(l,n));!t.length&&e.phase!=="recording"?i.append(k("p",{class:"lp-sub"},"No passes yet. Press Jam (or Space) and play.")):t.length&&!o.length&&i.append(k("p",{class:"lp-sub"},"No passes here."));const s=t.filter(l=>!l.kept).length,r=_(`CLEAR UNSTARRED${s?` (${s})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...Y("clear-unkept")},()=>C.clearUnkept());r.disabled=!s,Ln(vt.mount,rc(t),i,t.length?k("div",{class:"lp-between"},k("span",{class:"lp-row"},r,k("span",{class:"lp-sub"},"Starred passes stay.")),k("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${ne}`)):null),Be=""}let Be="";function cc(e){const t=vt.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),Be){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");Be=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const o=e.session.passes.some(l=>l.solo),i=[];for(const l of e.session.passes){if(l.mute||o&&!l.solo)continue;const d=Tn.get(l.id);if(d){for(let c=0;c<d.length;c+=2)if(d[c]<=n&&n<d[c+1]){i.push(l.id);break}}}const s=i.join("|");if(s===Be)return;Be=s;const r=new Set(i);for(const l of t.querySelectorAll("[data-lp-pass]")){const d=r.has(l.dataset.lpPass??"");d!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",d)}}const di=[ai,vt];xl(Zo,di.map(e=>e.handle),"adjacent");let Ta="";function pi(e){const t=e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.session.song.loop?`Lupa · Bar ${e.bar} · loop ${Ne(e.session.song.loop)} · Pass ${e.nextPass}`:`Lupa · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,n=`${t}|${e.phase}`;if(n!==Ta){Ta=n;try{X?.readout?.(t),X?.chip?.(e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:C.passCount?{text:`${C.passCount} passes`}:null)}catch{}}}function se(){const e=C.view();Wl(e),Ql(e),lc(e);for(const n of di)n.update();const t=ei.querySelector(".lp-notice");t&&(t.textContent=e.notice),pi(e)}C.onChange(se);setInterval(()=>{C.tick()&&se(),C.jamming||C.syncTempo()},_l);function ui(){const e=C.view();e.jamming&&(li(e),pi(e)),cc(e),requestAnimationFrame(ui)}requestAnimationFrame(ui);se();window.__looper={looper:C,store:yt,view:()=>C.view(),get hosted(){return!!X}};
