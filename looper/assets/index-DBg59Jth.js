(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function Ai(){return(performance.timeOrigin+performance.now())/1e3}var Si="nc-ui",Mi={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},$n={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},ut={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Ti={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},me={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Li={light:{color:Mi.color,semantic:$n,component:ut,runtime:Ti},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},He=e=>`--${Si}-${e}`,Wt=$n["label-on-fill-dark"],On=$n["label-on-fill-light"],Ci=me["label-min-contrast"],zi=/^#[0-9a-f]{6}$/i,Fi=e=>typeof e=="string"&&zi.test(e),rt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function _n(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=s=>{let r=(s+e/30)%12;return n-o*Math.max(-1,Math.min(r-3,9-r,1))};return`#${rt(i(0)*255)}${rt(i(8)*255)}${rt(i(4)*255)}`}function Ba(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),s=Math.min(t,n,o),r=(i+s)/2,l=i-s;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((i===t?60*((n-o)/l%6):i===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function Vn(e){let[t,n,o]=[1,3,5].map(i=>{let s=parseInt(e.slice(i,i+2),16)/255;return s<=.03928?s/12.92:((s+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function Kt(e,t){let[n,o]=[Vn(e),Vn(t)].sort((i,s)=>s-i);return(n+.05)/(o+.05)}var ht=e=>Kt(e,Wt)>=Kt(e,On)?Wt:On;function ja(e,t,n,o=Ci){let i=_n(e,t,n),s=ht(i)===Wt?1:-1;for(let r=0;r<40&&Kt(i,ht(i))<o;r++)n+=s*.01,i=_n(e,t,n);return i}function Ni(e){let{h:t,s:n}=Ba(e),o=ja(t,Math.min(n,me["surprise-on-max-saturation"]),me["surprise-on-lightness"]);return{fill:e,ink:ht(e),on:o,onInk:ht(o)}}var qi=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Di(e,t=Math.random){let[n,o]=me["surprise-saturation"],[i,s]=me["surprise-lightness"],r=me["surprise-min-hue-gap"],l=Fi(e)?Ba(e).h:null,c=t()*360;return l!==null&&qi(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),ja(c,n+t()*(o-n),i+t()*(s-i))}function Pi(e){if(!e)return null;let t=Ni(e);return{[He("surprise-fill")]:t.fill,[He("surprise-ink")]:t.ink,[He("surprise-on")]:t.on,[He("surprise-on-ink")]:t.onInk}}var Ii=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Bi=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Gn(e){let[t,n,o]=[1,3,5].map(l=>Ii(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),s=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*s-.0040720468*r,1.9779984951*i-2.428592205*s+.4505937099*r,.0259040371*i+.7827717662*s-.808675766*r]}function ji([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,s=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*s,-1.2684380046*o+2.6097574011*i-.3413193965*s,-.0041960863*o-.7034186147*i+1.707614701*s].map(r=>rt(Bi(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var Ri=me["velocity-range"],Ra={min:ut.rhythm["velocity-min"],max:ut.rhythm["velocity-max"]},Un=Object.fromEntries(Object.entries(Li).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Hi(e,t=Ra){let[n,o]=Ri,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,s=(i-n)/(o-n),r=t.ink??ut.rhythm["step-cell-ink"];if(s<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:r};if(s>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:r};let l=Gn(t.min),c=Gn(t.max);return{velocity:i,t:s,fill:ji(l.map((d,p)=>d+(c[p]-d)*s)),ink:r}}function Yn(e,t=Ra){return{[He("velocity-fill")]:Hi(e,t).fill}}var Ha="data-nc-theme",Wn="nc-ui-theme-change",Oi="(prefers-color-scheme: dark)",Oa=e=>e?.documentElement??null,_a=e=>e?.defaultView?.matchMedia?.(Oi)??null,_i=e=>e==="light"||e==="dark"?e:"system";function Vi(e=globalThis.document){return _i(Oa(e)?.getAttribute(Ha))}function Xt(e=globalThis.document){let t=Vi(e);return t!=="system"?t:_a(e)?.matches?"dark":"light"}function Va(e,t=globalThis.document){let n=Oa(t);if(!n)return()=>{};let o=Xt(t),i=()=>{let c=Xt(t);c!==o&&(o=c,e(c))},s=t.defaultView?.MutationObserver,r=s?new s(i):null;r?.observe(n,{attributes:!0,attributeFilter:[Ha]});let l=_a(t);return l?.addEventListener?.("change",i),t.addEventListener(Wn,i),()=>{r?.disconnect(),l?.removeEventListener?.("change",i),t.removeEventListener(Wn,i)}}var Gi={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Ui={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Yi={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Wi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},St={};for(let[e,t]of Object.entries(Ui))St[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Wi))St[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Yi))St[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Gi.renames.map(e=>[e.old,e.new]));function Ga(e){let t=St[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function I(e){return Ga(e).prop}function a(e){return`var(${I(e)})`}function Ki(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(I(t)));return Number.isFinite(n)?n:0}function O(e,t){let n=Ga(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let s=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=s:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=s:i.style.color=s,(e instanceof Element?e:o.documentElement).append(i);let r=(o.defaultView??window).getComputedStyle(i),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return i.remove(),l}function Ua(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Xi(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var Qi="[data-modulated], [data-modulated] *";function Nt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Kn(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Ji(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${I("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${I("divider")}: ${a(`module-div-stack-${o}`)};
      ${I("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${I("text-sub")}: ${a("module-sub-stack-1")};
      ${I("divider")}: ${a("module-div-stack-1")};
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
${Qi} { transition: none; }
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
  ${I("text-sub")}: ${a("module-sub-stack-1")};
  ${I("divider")}: ${a("module-div-stack-1")};
  ${I("slider-track")}: ${a("module-div-stack-1")};
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
  ${I("text-sub")}: ${a("module-sub-stack-1")};
  ${I("divider")}: ${a("module-div-stack-1")};
  ${I("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${I("text-sub")}: ${a("module-sub-stack-1")};
  ${I("divider")}: ${a("module-div-stack-1")};
  ${I("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${I("text-sub")}: inherit;
  ${I("divider")}: inherit;
  ${I("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${I("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${I("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${I("divider")}: ${a("strip-divider")}; }
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
${Kn("")}
}
@media (max-width: 1023px) {
${Kn("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Nt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Nt("")}
}
@media (max-width: 1023px) {
${Nt("html[data-nc-landscape] ")}
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
`}var qt=null,Zi="nc-ui-fallback";function Ya(e=globalThis.document){if(!e?.documentElement||(e.documentElement,qt&&qt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Zi} {
${Ji()}
}
`,e.head.append(t),qt=t}var es=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,ts=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=es,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ts(document);function Wa(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let s=t.createElement("span");s.dataset.ncOff="",s.textContent=e.offText??"Off",o.append(i,s),n.append(o);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Ka=new WeakMap,Xn=.25;function ns(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let s=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=f=>Math.min(1,Math.max(0,f)),p=()=>{n.style.setProperty("--fader-pos",String(s)),n.setAttribute("aria-valuenow",String(Math.round(s*1e3)/1e3))},u=f=>{let w=d(f);w!==s&&(s=w,p(),l?.(w))},m=0,h=!1;n.addEventListener("pointerdown",f=>{if(f.button!==0)return;f.preventDefault(),n.focus?.({preventScroll:!0});let w=n.getBoundingClientRect();f.target!==i&&w.height>0&&u(1-(f.clientY-w.top)/w.height),m=f.clientY,h=!0,n.dataset.dragging="true",n.setPointerCapture?.(f.pointerId)}),n.addEventListener("pointermove",f=>{if(!h)return;let w=n.getBoundingClientRect().height||1,y=(m-f.clientY)/w*(f.shiftKey?Xn:1);m=f.clientY,u(s+y)});let b=()=>{h=!1,delete n.dataset.dragging};n.addEventListener("pointerup",b),n.addEventListener("pointercancel",b),n.addEventListener("lostpointercapture",b),n.addEventListener("dblclick",f=>{f.preventDefault(),c?.()}),n.addEventListener("keydown",f=>{let w=f.shiftKey?r*Xn:r,y={ArrowUp:s+w,ArrowRight:s+w,ArrowDown:s-w,ArrowLeft:s-w,PageUp:s+r*10,PageDown:s-r*10,Home:0,End:1};f.key in y&&(f.preventDefault(),u(y[f.key]))});let g={el:n,get value(){return s},get dragging(){return h},set(f){h||(s=d(Number(f)||0),p())},setText(f){f?n.setAttribute("aria-valuetext",f):n.removeAttribute("aria-valuetext")},setLabel(f){n.setAttribute("aria-label",f)},configure(f){typeof f.step=="number"&&f.step>0&&(r=f.step),f.onChange&&(l=f.onChange),f.onReset&&(c=f.onReset)}};return g.setLabel(e.label),g.set(e.value??0),g.setText(e.valueText),Ka.set(n,g),g}function as(e){return Ka.get(e)}var Xa=new WeakMap,os=.2,is=1.5,ss=.5;function rs(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function Qn(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:rs(o.getComputedStyle(e).getPropertyValue(I(t)),n)}function ls(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let s=t.createElement("div");s.className="nc-meter-bars",s.setAttribute("aria-hidden","true");let r=[];for(let g=0;g<n;g++){let f=t.createElement("span");f.className="nc-meter-bar";let w=t.createElement("span");w.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let x=t.createElement("span");x.className="nc-meter-hold",f.append(w,y,x),s.append(f),r.push({peak:w,rms:y,hold:x,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,s);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,m=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},h=(g,f,w,y)=>{let x=Math.round(y*1e3)/1e3;w[f]!==x&&(w[f]=x,g.style.transform=f==="hold"?`translateY(${Math.round((1-x)*1e3)/10}%)`:`scaleY(${x})`)};i.addEventListener("click",()=>{b.clear(),c?.()});let b={el:o,get clipped(){return d},update(g,f){p<0&&(p=Qn(o,"motion-meter-fall",os)),u<0&&(u=Qn(o,"motion-meter-hold",is));let w=Math.max(0,Math.min(.25,Number(f)||0)),y=p>0?Math.exp(-w/p):0;r.forEach((x,E)=>{let L=g[E]??g[0]??{peak:0,rms:0},T=Math.min(1,Math.max(0,Number(L.peak)||0)),$=Math.min(T,Math.max(0,Number(L.rms)||0));L.over&&b.clip(),x.level.peak=T>=x.level.peak?T:T+(x.level.peak-T)*y,x.level.rms=$>=x.level.rms?$:$+(x.level.rms-$)*y,x.holdAge+=w,T>=x.holdAt?(x.holdAt=T,x.holdAge=0):x.holdAge>u&&(x.holdAt=Math.max(T,x.holdAt-ss*w)),h(x.peak,"peak",x.shown,x.level.peak),h(x.rms,"rms",x.shown,x.level.rms),h(x.hold,"hold",x.shown,x.holdAt),x.hold.dataset.off=x.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,m())},clear(){d=!1,m()},reset(){for(let g of r)g.level.peak=0,g.level.rms=0,g.holdAt=0,g.holdAge=0,h(g.peak,"peak",g.shown,0),h(g.rms,"rms",g.shown,0),h(g.hold,"hold",g.shown,0),g.hold.dataset.off="true"},setLabel(g){l=g,m()},configure(g){g.onClear&&(c=g.onClear)}};return m(),b.reset(),Xa.set(o,b),b}function cs(e){return e?Xa.get(e):void 0}var ds=3,ps=new Set(["freq","q","rate","time","log"]);function kn(e,t,n){return!e||!ps.has(e)||!(n>t)?"linear":t>0?"log":"power"}function Je(e,t,n){return kn(e,t,n)!=="linear"}function mt(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let s=Math.min(n,Math.max(t,i)),r=kn(e,t,n);if(r==="log")return Math.log(s/t)/Math.log(n/t);let l=(s-t)/(n-t);return r==="power"?Math.cbrt(l):l}function Qa(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),s=kn(e,t,n);return s==="log"?t*(n/t)**i:t+(n-t)*(s==="power"?i**ds:i)}function Ja(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let s=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(s)),i=Math.min(n,Math.max(t,i))}return i}function We(e,t,n,o){return Math.round(mt(e,t,n,o)*1e3)}function ft(e,t,n,o,i){return Ja(Qa(e,t,n,Number(o)/1e3),t,n,i)}function us(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,s=null;return t==="ArrowRight"||t==="ArrowUp"?s=o+i:t==="ArrowLeft"||t==="ArrowDown"?s=o-i:t==="PageUp"?s=o+1e3/10:t==="PageDown"?s=o-1e3/10:t==="Home"?s=0:t==="End"&&(s=1e3),s===null?null:Math.min(1e3,Math.max(0,Math.round(s)))}function En(e,t,n,o,i,s=!1,r){let l=We(e,t,n,o),c=us(l,i,s);if(c===null)return null;let d=ft(e,t,n,c,r),p=Math.sign(c-l),u=Ja(Number(o),t,n,r);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=ft(e,t,n,c,r);return d}function Jn(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function hs(e,t,n,o=n/6){let i=e.some(p=>p===null),s=Math.max(0,n-(i?o:0)),r=e.reduce((p,u,m)=>u===null?p:p+Jn(t[m]),0),l=r>0?s/r:0,c=e.map(p=>p===null?0:Math.min(s,Jn(p)*l));if(i){let p=c.reduce((m,h)=>m+h,0),u=e.indexOf(null);c[u]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=n),d}function ms(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),s=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function ce(e){return Math.max(0,Math.min(1,e))}function Za(e,t){let{ctx:n,w:o,h:i}=ms(e);if(!n)return;n.clearRect(0,0,o,i);let s=Xi(e);if(t.paint==="swatch"){let c=O(e,"accent"),d=O(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){bs(n,o,i,t,e,s);return}if(t.paint==="filter"){let c=t.mode??"lp",d=O(e,Ua(c)),p=O(e,"divider"),u=ce(t.cutoff??.5),m=.08+(1-ce(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let h=0;h<=o;h++){let b=h/Math.max(1,o),g=0;c==="lp"?g=b<u?1:Math.max(0,1-(b-u)/m):c==="hp"?g=b>u?1:Math.max(0,1-(u-b)/m):g=Math.max(0,1-Math.abs(b-u)/m);let f=i*.78-g*i*.62;h===0?n.moveTo(h,f):n.lineTo(h,f)}n.strokeStyle=d,n.stroke(),n.fillStyle=O(e,"text-sub"),n.font=s,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=O(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,m]=hs([c,d],t.max??[1,4],o),h=2,b=i-1;n.beginPath(),n.moveTo(p,b),n.lineTo(u,h);let g=Math.max(1,Math.ceil(m-u));for(let f=1;f<=g;f++){let w=f/g;n.lineTo(u+(m-u)*w,b-(b-h)*Math.exp(-4.6*w)*(1-w*.01))}n.lineTo(m,b),n.lineTo(o,b),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=O(e,"accent"),m=O(e,"text-sub"),h=i/2;n.fillStyle=O(e,"accent-soft"),n.fillRect(ce(d)*o,0,(ce(p)-ce(d))*o,i),n.strokeStyle=O(e,"divider"),n.beginPath(),n.moveTo(0,h),n.lineTo(o,h),n.stroke();let b=Math.floor(c.length/2);for(let g=0;g<b;g++){let f=(g+.5)/b*o,w=Math.max(-1,Math.min(1,c[g*2]??0)),y=Math.max(-1,Math.min(1,c[g*2+1]??0)),x=(g+.5)/b;n.strokeStyle=x>=d&&x<=p?u:m,n.beginPath(),n.moveTo(f,h-y*(h-1)),n.lineTo(f,h-w*(h-1)+.5),n.stroke()}n.strokeStyle=u;for(let g of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let f=Math.round(ce(g)*(o-1))+.5;n.beginPath(),n.moveTo(f,0),n.lineTo(f,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=O(e,"text"),n.fillRect(Math.round(ce(t.position)*(o-1)),0,1,i)),b||(n.fillStyle=m,n.font=s,n.fillText(t.empty??"Empty",0,h+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=ce(t.level??0);n.fillStyle=O(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=O(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=O(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=O(e,"rhythm.playhead"),n.fillRect(l/r*o,i*.3,Math.max(1,o/r),i*.4),e.dataset.ncAccent=O(e,"accent")}var Ge=20,Qt=2e4,Dt=24,Zn=-60;function fs(e,t,n,o,i=48e3){let s=2*Math.PI*Math.min(t,i*.49)/i,r=Math.cos(s),l=Math.sin(s)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let u=1+l,m=-2*r,h=1-l,b=2*Math.PI*o/i,g=(x,E,L)=>x+E*Math.cos(b)+L*Math.cos(2*b),f=(x,E)=>-(x*Math.sin(b)+E*Math.sin(2*b)),w=Math.hypot(g(c,d,p),f(d,p)),y=Math.hypot(g(u,m,h),f(m,h));return y>0?w/y:0}function gs(e,t){return Math.log(Math.max(Ge,Math.min(Qt,e))/Ge)/Math.log(Qt/Ge)*t}function ea(e,t,n){let o=Math.max(Zn,Math.min(Dt,e));return t+(Dt-o)/(Dt-Zn)*(n-t)}function bs(e,t,n,o,i,s){let r=o.mode??"lp",l=O(i,Ua(r)),c=O(i,"divider"),d=O(i,"text-sub"),p=Number.parseFloat(String(s).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,m=Math.max(u+4,n-p-3),h=o.q??Math.SQRT1_2,b=Math.round(ea(0,u,m))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,b),e.lineTo(t,b),e.stroke(),e.beginPath();for(let g=0;g<=t;g++){let f=Ge*(Qt/Ge)**(g/Math.max(1,t)),w=o.open?1:fs(r,o.hz,h,f,o.sampleRate),y=ea(20*Math.log10(Math.max(1e-5,w)),u,m);g===0?e.moveTo(g,y):e.lineTo(g,y)}if(e.strokeStyle=l,e.stroke(),!o.open){let g=Math.round(gs(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(g,u),e.lineTo(g,m),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=s,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(o.hz))}function te(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function xs(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var ke=20,Ze=2e4,An=Math.log(Ze/ke),Jt=32,ws=250,ys=-100,vs=1200,$s=4.5,ta=-6,ye=-96,ks=48,na=[100,1e3,1e4],Es=[6,12];function ze(e,t){return Math.log(Math.max(ke,Math.min(Ze,e))/ke)/An*t}function lt(e,t){return ke*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*An)}function fe(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Zt(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var eo=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function As(e,t,n,o){let i=n?3:1,s=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),r=c=>({hz:Math.max(e.minHz??ke,Math.min(e.maxHz??Ze,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return s(1);case"ArrowDown":return s(-1);case"ArrowRight":return e.moveHz?r(1):s(1);case"ArrowLeft":return e.moveHz?r(-1):s(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Sn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Ss(e,t,n,o,i,s,r,l,c){let d=c?.25:1,p={},u=Math.max(1,s/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-o*d/u*r/Sn(e))),e.moveHz){let m=t.hz*Math.exp(n*d/Math.max(1,i)*An);p.hz=Math.max(e.minHz??ke,Math.min(e.maxHz??Ze,m))}return p}function Ms(e,t,n,o,i){let s=Math.max(0,n.left)+1,r=Math.min(n.right,i)-1,l=Math.min(t.width*3+o*2,r-s),c=Math.max(s,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var _=new WeakMap;function Ts(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let s=document.createElement("canvas");s.className="nc-eq-curve",s.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,o.append(i,s);for(let c of e.bands)o.append(Ls(n,c,t));o.append(r),o.addEventListener("click",c=>{if(!so(n)||c.button>0)return;let d=io(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),_.set(n,{control:e,cache:null,spec:null,active:null}),no(n,e),n}function to(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Ls(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},s=()=>i()?.bands.find(d=>d.id===t.id)??null,r=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=s();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",de(e,t.id))}),o.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=i(),u=s(),m=_.get(e);if(!p||!u||!m?.box)return;let{w:h,h:b,pad:g}=m.box;p.onBand(u.id,Ss(u,r.start,d.clientX-r.x,d.clientY-r.y,h,b,p.range??18,g,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&de(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=i(),u=s();if(!p||!u)return;let m=As(u,d.key,d.shiftKey,p.range??18);m&&(d.preventDefault(),m==="reset"?p.onReset?.(u.id):p.onBand(u.id,m),de(e,u.id))});let c=null;return o.addEventListener("wheel",d=>{let p=i(),u=s();if(!p||!u?.moveQ)return;d.preventDefault();let m=d.timeStamp;(!c||m-c.t>400)&&(c={q:u.q,t:m});let h=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-h/240))),c.t=m,p.onBand(u.id,{q:c.q}),de(e,u.id)},{passive:!1}),o.addEventListener("pointerenter",()=>de(e,t.id)),o.addEventListener("focus",()=>de(e,t.id)),o.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==o&&de(e,null)}),o.addEventListener("blur",()=>{r||de(e,null)}),o}function de(e,t){let n=_.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Ne(e):Mn(e)}function Mn(e){let t=_.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(b=>b.id===t.active):null;for(let b of e.querySelectorAll(".nc-eq-node"))b instanceof HTMLElement&&(o&&b.dataset.band===o.id?b.dataset.active="true":delete b.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,eo(o.db)];o.kind==="peak"?i.push(Zt(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${Zt(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Cs(t.control,o)),n.hidden=!1;let{w:s,h:r,pad:l}=t.box,c=ze(o.hz,s),d=fe(o.db*Sn(o),r,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,m=Math.max(0,Math.min(s-p,c-p/2)),h=d-u-l*1.5>=0?d-u-l*1.5:Math.min(r-u,d+l*1.5);n.style.left=`${Math.round(m)}px`,n.style.top=`${Math.round(h)}px`}function Cs(e,t){return e.bands.indexOf(t)%3+1}function no(e,t){let n=_.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Tn(e);let o=t.range??18;t.bands.forEach((i,s)=>{let r=to(e,i.id);r instanceof HTMLElement&&(r.dataset.tone=String(s%3+1),r.dataset.kind=i.kind,r.setAttribute("aria-label",`${i.label} band`),r.setAttribute("aria-valuemin",String(-o)),r.setAttribute("aria-valuemax",String(o)),r.setAttribute("aria-valuenow",String(i.db)),r.setAttribute("aria-valuetext",i.valueText??`${eo(i.db)}, ${Zt(i.hz)}`),r.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?r.setAttribute("data-nc-help",i.help):r.removeAttribute("data-nc-help"))}),Ne(e),Ps(e)}function ao(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),s=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==s)&&(e.width=i,e.height=s);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function oo(e){return{curve:te(e,"eq-curve"),fill:te(e,"eq-fill"),quiet:te(e,"text-sub"),grid:te(e,"eq-grid"),zero:te(e,"divider"),label:te(e,"text-sub"),spectrum:te(e,"eq-spectrum"),bands:[te(e,"eq-band-1"),te(e,"eq-band-2"),te(e,"eq-band-3")]}}function zs(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Ne(e){_.has(e)&&Tn(e);let t=_.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:s,h:r}=ao(n);if(!i)return;let l=Math.max(8,Math.round(r*.06)),c=o.range??18;t.box={w:s,h:r,pad:l},t.colours=oo(e);let d=t.colours,p=zs(o,s);if(!t.cache||t.cache.key!==p){let E=Math.max(64,Math.ceil(s)+1),L=new Float64Array(E);for(let $=0;$<E;$++)L[$]=lt($/(E-1)*s,s);let T=null;try{T=typeof o.response=="function"?o.response(L):null}catch{T=null}t.cache={key:p,freqs:L,total:T?.total??new Float64Array(E),bands:T?.bands??[]}}i.clearRect(0,0,s,r);let u=xs(e),m=o.on!==!1;Fs(i,s,r,c,l,d,u);let{freqs:h,total:b,bands:g}=t.cache,f=Array.from(h,E=>ze(E,s)),w=fe(0,r,c,l);g.forEach((E,L)=>{if(!E||!E.some(S=>Math.abs(S)>.05))return;let T=m?d.bands[L%3]:d.quiet,$=Array.from(E,S=>fe(S,r,c,l));i.save(),t.active&&o.bands[L]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=T,aa(i,f,$,w)),i.globalAlpha=m?.75:.4,i.strokeStyle=T,i.lineWidth=.75,Pt(i,f,$),i.restore()});let y=Array.from(b,E=>fe(E,r,c,l)),x=m?d.curve:d.quiet;i.save(),i.fillStyle=m?d.fill:d.quiet,i.globalAlpha=m?.2:.08,aa(i,f,y,w),i.restore(),i.save(),i.strokeStyle=m?d.fill:x,i.lineJoin="round",i.lineCap="round",m&&(i.globalAlpha=.16,i.lineWidth=4,Pt(i,f,y)),i.globalAlpha=1,i.strokeStyle=x,i.lineWidth=1.25,Pt(i,f,y),i.restore(),Ns(e),Mn(e)}function Fs(e,t,n,o,i,s,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<ke||p>Ze)continue;let u=Math.round(ze(p,t))+.5;e.globalAlpha=na.includes(p)?.9:.35,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of Es)if(!(c>o))for(let d of[1,-1]){let p=Math.round(fe(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=s.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=s.zero;let l=Math.round(fe(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=s.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of na){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=ze(c,t)+3;e.fillText(d,u+p+2>t?ze(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=fe(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function gt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,s=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,s)}e.lineTo(t[t.length-1],n[n.length-1])}function Pt(e,t,n){e.beginPath(),gt(e,t,n),e.stroke()}function aa(e,t,n,o){e.beginPath(),gt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function io(e){return e.closest("[data-nc-maxable]")}function so(e){let t=io(e);return!!t&&!t.hasAttribute("data-nc-max")}function Tn(e){let t=so(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=_.get(e);n?.active&&(n.active=null,Mn(e))}return t}function Ns(e){Tn(e);let t=_.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,s=t.control.range??18;for(let r of t.control.bands){let l=to(e,r.id);l instanceof HTMLElement&&(l.style.left=`${ze(r.hz,n).toFixed(1)}px`,l.style.top=`${fe(r.db*Sn(r),o,s,i).toFixed(1)}px`)}}function qs(e,t,n,o){let i=o/2/n,s=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=lt(d,t),m=lt(p,t),h=lt(c/(e-1)*t,t);s[c]=Math.min(n-1,u/i),r[c]=Math.min(n-1,m/i),l[c]=$s*Math.log2(h/1e3)}return{lo:s,hi:r,tilt:l}}function Ds(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let r=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*r}let s=-1/0;for(let r=o;r<=i&&r<e.length;r++)e[r]>s&&(s=e[r]);return s}function Ps(e){let t=_.get(e);if(t){if(!t.control.spectrum){lo(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=_.get(e)?.spec;i&&(i.visible=o.some(s=>s.isIntersecting),en(e))}),t.spec.io.observe(e)):t.spec.visible=!0}en(e)}}function en(e){let t=_.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){ro(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=tn(e),n.onVis||(n.onVis=()=>en(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&nn(e,!1)}function tn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function nn(e,t){let n=_.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,It(e,tn(e))),ws):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,It(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,It(e,tn(e))),Jt))}function ro(e){let t=_.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function lo(e){let t=_.get(e)?.spec;if(!t)return;ro(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=_.get(e);n&&(n.spec=null)}function It(e,t){let n=_.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){lo(e);return}if(!o.analyser)return;if(t-o.last<Jt-4&&!o.idle){nn(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):Jt/1e3;o.last=t;let s=e.querySelector(".nc-eq-spectrum");if(!(s instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=ao(s);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...qs(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let u=-1/0,m=ks*i,{lo:h,hi:b,tilt:g}=o.map;for(let w=0;w<d;w++){let y=Ds(o.buf,h[w],b[w]);y>u&&(u=y);let x=y+g[w],E=o.disp[w]-m;o.disp[w]=x>E?x:E}u>ys&&(o.loud=t);let f=t-o.loud>vs;r.clearRect(0,0,l,c),(!f||o.disp.some(w=>w>ye))&&Is(r,l,c,o.disp,n.colours??oo(e)),o.idle=f&&!o.disp.some(w=>w>ye),nn(e,o.idle)}function Is(e,t,n,o,i){let s=o.length,r=new Array(s),l=new Array(s),c=d=>{let p=o[Math.max(0,Math.min(s-1,d))];return Number.isFinite(p)?p:ye};for(let d=0;d<s;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(ye,Math.min(ta,Number.isFinite(p)?p:ye))-ye)/(ta-ye);r[d]=d/(s-1)*t,l[d]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),gt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),gt(e,r,l),e.stroke(),e.restore()}var J=new WeakMap,Bs=450,js=6,Rs=33,Bt=24,Hs="http://www.w3.org/2000/svg";function Os(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function _s(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Vs(e,t,n,o,i){let s=e.slice();if(t===o)return s[o]=i,s;let r=t<o?1:-1;for(let l=t;l!==o+r;l+=r){let c=(l-t)/(o-t);s[l]=Math.round((n+(i-n)*c)*100)/100}return s}function Gs(e,t){let n=e.steps[t],o=(e.shapes??[]).find(s=>s.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function ve(e,t){let n=document.createElementNS(Hs,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function co(e){let t=ve("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(ve("path",{d:e})),t}function Us(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let s=document.createElement("div");s.className="nc-lsteps-shapes",s.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(o,i,s,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return J.set(n,c),Ws(n,o),Ks(n,r),po(n,e),n}function Z(e){let t=J.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Ys(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function jt(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=Ys(e);return{i:_s(t.clientX,o),level:Os(t.clientY-n.top,n.height)}}function Ws(e,t){let n=J.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",s=>{let r=Z(e);if(!r||s.button>0||!r.steps.length)return;s.preventDefault(),bt(e),t.setPointerCapture?.(s.pointerId);let l=jt(t,s),c=r.steps.map(d=>d.level);n.drag={id:s.pointerId,x:s.clientX,y:s.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,oa(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,Z(e)?.onLevels(d.start.slice(),!0),Rt(e,d.i))},Bs)}),t.addEventListener("pointermove",s=>{let r=n.drag;if(!r||r.id!==s.pointerId||r.long||!r.moved&&Math.hypot(s.clientX-r.x,s.clientY-r.y)<js)return;r.moved=!0,o();let l=jt(t,s);oa(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let i=s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(s.pointerId),r.long||Z(e)?.onLevels(r.levels.slice(),!0),an(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",s=>{let r=n.drag;!r||r.id!==s.pointerId||(o(),n.drag=null,r.long||Z(e)?.onLevels(r.start.slice(),!0),an(e,-1))}),t.addEventListener("contextmenu",s=>{Z(e)?.onShape&&(s.preventDefault(),Rt(e,jt(t,s).i))}),t.addEventListener("keydown",s=>{let r=Z(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=u=>{let m=r.steps.map(h=>h.level);m[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,r.onLevels(m,!0)};switch(s.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(s.shiftKey?.01:.05));break;case"ArrowDown":p(d-(s.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;Rt(e,c);break;default:return}s.preventDefault(),on(e)}),t.addEventListener("focus",()=>on(e)),t.addEventListener("blur",()=>{for(let s of t.querySelectorAll("[data-focus]"))s.removeAttribute("data-focus")})}function oa(e,t,n,o,i,s){let r=J.get(e).drag;r&&(r.levels=Vs(r.levels,t,n,o,i),an(e,o,r.levels[o]),Z(e)?.onLevels(r.levels.slice(),s))}function an(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function on(e){let t=J.get(e),n=e.querySelector(".nc-lsteps-plot"),o=Z(e);if(!n||!o)return;for(let s of n.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===t.focus?s.dataset.focus="true":s.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",Gs(o,i))}function Ks(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),bt(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),J.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&bt(e)}}function Rt(e,t){let n=Z(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let s=J.get(e);s.focus=t,o.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,o.append(r);for(let h of n.shapes??[]){let b=document.createElement("button");b.type="button",b.setAttribute("role","menuitemradio"),b.setAttribute("aria-checked",n.steps[t]?.shape===h.value?"true":"false"),h.icon&&b.append(co(h.icon)),b.append(document.createTextNode(h.label)),b.addEventListener("click",()=>{Z(e)?.onShape?.(t,h.value),bt(e,!0)}),o.append(b)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",s.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,m=Math.max(0,Math.min(c.width-p,u-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(m)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function bt(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",J.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function Xs(e,t){let n=J.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let s=0;s<t;s++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(s),s%4===0&&s>0&&(r.dataset.beat="true");let l=ve("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(ve("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),ve("path",{class:"nc-lsteps-env",d:""}),ve("path",{class:"nc-lsteps-top",d:""}),ve("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),o.append(r);let c=document.createElement("span");s%4===0&&(c.textContent=String(s+1)),s%4===0&&s>0&&(c.dataset.beat="true"),i.append(c)}}}function po(e,t){let n=J.get(e);if(!n)return;n.control=t;let o=t.steps.length;Xs(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let s=Math.max(.5,Math.min(.75,t.swing??.5)),r=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((h,b)=>{let g=r[b];if(!g)return;let f=String((b%2?1-s:s)*2);g.style.setProperty("--nc-lsteps-grow",f),l[b]?.style.setProperty("--nc-lsteps-grow",f),t.played!==void 0&&b>=t.played?g.dataset.out="true":g.removeAttribute("data-out"),g.dataset.zero=h.level<=0?"true":"false";let w=Math.max(0,Math.min(1,h.level)),y=g.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-w*100)),y.setAttribute("height",String(w*100));let x=t.curve?t.curve(b,Bt):null,E="M0 100",L="";for(let T=0;T<=Bt;T++){let $=x?Math.max(0,Math.min(1,x[T]??w)):w,S=T/Bt*100,v=100-$*100;E+=` L${S.toFixed(2)} ${v.toFixed(2)}`,L+=`${T?" L":"M"}${S.toFixed(2)} ${v.toFixed(2)}`}g.querySelector(".nc-lsteps-env").setAttribute("d",`${E} L100 100 Z`),g.querySelector(".nc-lsteps-top").setAttribute("d",L)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(h=>`${h.value}:${h.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let h of t.shapes??[]){let b=document.createElement("button");b.type="button",b.className="nc-lsteps-shape",b.setAttribute("role","tab"),b.dataset.shape=String(h.value),h.icon&&b.append(co(h.icon)),b.append(document.createTextNode(h.label)),b.addEventListener("click",()=>Z(e)?.onShapeAll?.(h.value)),c.append(b)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,u=t.steps[0]?.shape,m=t.steps.slice(0,p).every(h=>h.shape===u);for(let h of c.querySelectorAll(".nc-lsteps-shape")){let b=m&&h.dataset.shape===String(u);h.setAttribute("aria-selected",b?"true":"false"),h.tabIndex=b||!m&&h===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),on(e),n.last=-2,Qs(e)}function Qs(e){let t=J.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Ht(e,null);return}let o=0,i=s=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Ht(e,null);return}s-o>=Rs&&(o=s,Ht(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function Ht(e,t){let n=J.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let s of e.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===o?(s.dataset.playhead="true",s.dataset.locked=i?"true":"false"):(s.removeAttribute("data-playhead"),s.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var Js=.8912509381337456,sn=32,Zs=250,er=1200,tr=.2,uo=1.5;function nr(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function ar(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var xt=new WeakMap,ia=new WeakMap;function sa(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),s=Number.parseFloat(i);return Number.isFinite(s)?i.endsWith("ms")?s/1e3:s:n}function or(e){let t=ia.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let s of i){let r=xt.get(s.target);r&&(r.seen.set(s.target,s.isIntersecting),Ue(r))}Te(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)Ue(i);Te(t)}),ia.set(e,t),t}var ho=e=>e.els.some(t=>t.isConnected);function ir(e){if(!e.loop.io)return ho(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function Ue(e){let t=!e.dead&&!!e.source&&ir(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ln(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),cn(e))}function Ln(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Te(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){mo(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ln(e)),!e.raf&&!e.timer&&rn(e,!1)}function rn(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>ra(e,Ln(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Zs):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,ra(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),sn)}function mo(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function ra(e,t){if(t-e.last<sn-4&&!e.idle&&e.last){rn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):sn/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let s of e.recs){if(!ho(s)){(s.placed||e.frames-s.born>90)&&fo(s);continue}s.placed=!0,s.open&&(i=!0,sr(s,n,t)&&(e.loud=t),(s.disp[0]>0||s.disp[1]>0)&&(o=!0))}if(!i){mo(e);return}e.idle=t-e.loud>er&&!o,rn(e,e.idle)}function sr(e,t,n){if(e.fall<0){let m=e.els[0];e.fall=sa(m,"motion-meter-fall",tr),e.hold=sa(m,"motion-meter-hold",uo)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",s=i?o:Number(o?.in)||0,r=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=r&&Number(o.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let m of e.els)m.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[s,l],u=!1;for(let m=0;m<2;m++){let h=nr(p[m]);h>0&&(u=!0),e.disp[m]=h>=e.disp[m]?h:h+(e.disp[m]-h)*d,e.disp[m]<.001&&(e.disp[m]=0),p[m]>=Js&&(e.clipAt[m]=n);let b=e.clipAt[m]>0&&n-e.clipAt[m]<e.hold*1e3;ln(e,m,e.disp[m],b)}return u}function ln(e,t,n,o){let i=Math.round(n*1e3)/1e3,s=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===s)){e.shown[t]=i,e.clipShown[t]=s;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=s)}}}function cn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,ln(e,0,0,!1),ln(e,1,0,!1)}function fo(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),xt.get(t)===e&&xt.delete(t)}function rr(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=or(o),s={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:uo,rows:""};for(let r of n)xt.set(r,s),i.io?.observe(r);if(i.recs.add(s),cn(s),!i.io){let r=o.defaultView,l=()=>{Ue(s),Te(i)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!s.dead){if(l===s.source){Ue(s),Te(i);return}s.open&&(s.open=!1,s.source?.close?.(),cn(s)),s.source=l,Ue(s),Te(i)}},destroy(){s.dead||fo(s),Te(i)}}}var go={slop:8,longPressMs:500,pitchPx:16},lr=class{constructor(e,t,n=go){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,s=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,s)<this.config.slop)return;Math.abs(s)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-s/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function cr(e,t,n,o=go){let i=!1,s=0,r=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),m=[...e.querySelectorAll(t)],h=u?m.findIndex(f=>f===u||f.contains(u)):-1;if(h>=0)return h;let b=-1,g=Number.POSITIVE_INFINITY;return m.forEach((f,w)=>{if(f.hidden)return;let y=f.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let x=Math.abs(d-(y.left+y.width/2));x<g&&x<=y.width&&(b=w,g=x)}),b},l=new lr(r,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{s&&clearTimeout(s),s=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),s=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var bo="netcomposer.groups.v1";function Cn(){try{return globalThis.localStorage??null}catch{return null}}function xo(e=Cn(),t=bo){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,s]of Object.entries(n))typeof s=="boolean"&&o.set(i,s);return o}catch{return new Map}}function dr(e,t,n,o=bo){let i=xo(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function pr(e,t=Cn()){return xo(t).get(e.id)??e.open===!0}function ur(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let s=document.createElement("span");s.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(s,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";dr(Cn(),e.id,d),dn(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(i,c),wo(o,e),dn(o,pr(e)),yo(o,e),o}function dn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function wo(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function yo(e,t){wo(e,t)&&dn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var et="application/x-nc-pad",la="http://www.w3.org/2000/svg";function hr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let s=0;s<n;s++){let r=Math.floor(s*t/n),l=Math.max(r+1,Math.floor((s+1)*t/n)),c=0,d=0;for(let u=r;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:s/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function mr(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,s)=>o.append(fr(n,s,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&ct(n)}),$o(n,e),n}function fr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(la,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(la,"path");return c.append(d),o.append(i,s,r,l,c),br(e,o,t,n),s.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&vo(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(et,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(et)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(et)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let m=p.dataTransfer?.getData(et);if(m!==void 0&&m!==""){p.preventDefault(),p.stopPropagation();let b=Number(m);b!==t&&u.onMove?.(b,t,p.altKey);return}let h=p.dataTransfer?.files?.[0];h&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,h))}),o}function gr(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function br(e,t,n,o){let i=0,s=!1,r=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;s=!1,r=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,s=ca(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),s=ca(e,t,n,o)}),t.addEventListener("click",()=>{if(s){s=!1;return}gr(e,n,o)})}function ca(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let s=i.menu(n);if(!s.length)return!1;ct(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),ct(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of s){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{ct(e);let m=o(e);m?.type==="padGrid"&&(p.id==="rename"&&m.onRename?vo(e,t,n,o):m.onMenu?.(n,p.id))}),l.append(u)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function vo(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let s=document.createElement("input");s.type="text",s.className="nc-padgrid-rename",s.maxLength=i.nameMax??24,s.value=i.pads[n]?.label??"",s.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.top-r.top}px`,s.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=s.value.trim();s.remove(),t.focus();let m=o(e);p&&u&&m?.type==="padGrid"&&m.onRename?.(n,u)};s.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),s.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])s.addEventListener(p,u=>u.stopPropagation());e.append(s),s.focus(),s.select()}function ct(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function $o(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let s=n[i];if(!(s instanceof HTMLButtonElement))return;let r=s.querySelector(".nc-padgrid-pad-name"),l=s.querySelector(".nc-padgrid-pad-hint"),c=s.querySelector(".nc-padgrid-pad-wave path"),d=s.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),s.draggable=!o.empty,o.empty?(s.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete s.dataset.empty,r&&(r.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",hr(o.peaks))),!o.empty&&o.hint?s.dataset.hint="true":delete s.dataset.hint,o.lane?s.dataset.ncLane=String(o.lane):delete s.dataset.ncLane;let p=t.selected===i;p?s.dataset.selected="true":delete s.dataset.selected,s.setAttribute("aria-pressed",p?"true":"false"),o.playing?s.dataset.playing="true":delete s.dataset.playing,s.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function U(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Mt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function da(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function Ke(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var xr=450,pa=8;function ne(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function wr(e){let t=Ki(e,"target-min");return t>0?t:44}function yr(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=wr(e),o=n/2,i=t.map(s=>s.parentElement?.getBoundingClientRect()??null);for(let s=0;s<t.length;s++){let r=t[s],l=i[s];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,u=c+o,m=d-o,h=d+o;for(let b=0;b<t.length;b++){if(s===b)continue;let g=i[b];if(!g||g.width===0)continue;let f=g.left+g.width/2,w=g.top+g.height/2;Math.abs(w-d)<o*2&&(f>c?u=Math.min(u,(c+f)/2):f<c&&(p=Math.max(p,(c+f)/2))),Math.abs(f-c)<o*2&&(w>d?h=Math.min(h,(d+w)/2):w<d&&(m=Math.max(m,(d+w)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),m=Math.min(m,l.top),h=Math.max(h,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${m-l.top}px`,r.style.width=`${Math.max(0,u-p)}px`,r.style.height=`${Math.max(0,h-m)}px`,r.style.transform="none"}}function ko(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function ua(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function $e(e,t){switch(e.type){case"slider":return vr(e,t);case"select":return kr(e,t);case"toggle":return Er(e,t);case"button":return Ar(e,t);case"readout":return Sr(e);case"label":return Cr(e);case"note":return ha(e);case"knob":return Nr(e,t);case"choice":return qr(e,t);case"slotRow":return Dr(e,t);case"stepGrid":return jr(e,t);case"canvas":return _r(e);case"fx":return Jr(e,t);case"eqGraph":return Ts(e,t);case"levelSteps":return Us(e,t);case"group":return ur(e,t,$e);case"strip":return Vr(e,t);case"stripAdd":return Wr(e,t);case"padGrid":return mr(e,t);case"moves":return Tr(e,t);default:return ha({id:"unknown",text:""})}}function ee(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,So(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Eo(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??Ke(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),da(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")da(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ge(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&zr(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??Ke(t.value))}else if(t.type==="choice")Mo(e,t);else if(t.type==="slotRow")Lo(e,t);else if(t.type==="stepGrid")un(e,t);else if(t.type==="padGrid")$o(e,t);else if(t.type==="moves")Ao(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Za(n,t)}else if(t.type==="eqGraph")no(e,t);else if(t.type==="levelSteps")po(e,t);else if(t.type==="strip"){No(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Fe(n.id)}"]`);o instanceof Element&&ee(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")zo(e,t);else if(t.type==="group"){yo(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Fe(n.id)}"]`);o instanceof Element&&ee(o,n)}}else if(t.type==="fx"){Oo(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Fe(n.id)}"]`);o instanceof Element&&ee(o,n)}}}}function vr(e,t){let n=Mt(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=Je(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(Eo(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let s=l=>i?ft(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(s(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(s(l))}),i&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=En(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(We(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(o,r),e.onTap&&n.insertBefore($r(e,o,t),r),n.append(U()),ee(n,e),n}function Eo(e){return Je(e.taper,e.min,e.max)?We(e.taper,e.min,e.max,e.value):e.value}function $r(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(ne());let i=s=>{let r=n(t);r?.type==="slider"&&r.onTap?.(s)};return o.addEventListener("pointerdown",s=>{s.button===0&&i(s.timeStamp)}),o.addEventListener("keydown",s=>{s.repeat||s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),i(s.timeStamp))}),o}function kr(e,t){let n=Mt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let s of e.options){let r=document.createElement("option");r.value=s.value,r.textContent=s.label,s.disabled&&(r.disabled=!0),s.group?i?.getAttribute("label")!==s.group&&(i=document.createElement("optgroup"),i.setAttribute("label",s.group),o.append(i)):i=null,(i??o).append(r)}return o.value=e.value,o.addEventListener("change",()=>{let s=t(o);s?.type==="select"&&s.onChange(o.value)}),n.append(o,U()),n}function Er(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(U()),ee(n,e),n}function Ar(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let s=t(n);s?.type==="button"&&s.onPress()}),n.append(U()),ee(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=ko(),i.addEventListener("click",()=>{let s=n.closest(".nc-module")?.querySelector(".nc-slot-row");s instanceof HTMLElement&&Co(s);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),o.append(n,i),o}function Sr(e){let t=Mt(e.id,e.label);return t.append(U()),ee(t,e),t}var Mr=450;function Tr(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let s=document.createElement("span");s.className="nc-moves-label",s.setAttribute("aria-hidden","true"),s.textContent=o.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(Lr(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}i.append(s,r),n.append(i)}return Ao(n,e),n}function Ao(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${Fe(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function Lr(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function Cr(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(U()),t}function ha(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(U()),t}function ma(e){if(typeof e.valueText=="string")return e.valueText;let t=Ke(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function So(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function zr(e,t){let n=mt(t.taper,t.min,t.max,t.value);So(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(mt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ma(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ma(t)}`}function Fr(e,t){if(Je(e.taper,e.min,e.max))return En(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Nr(e,t){let n=Mt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let s=0,r=0;o.addEventListener("pointerdown",d=>{s=d.clientY;let p=t(o);r=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(Je(p.taper,p.min,p.max)){let h=mt(p.taper,p.min,p.max,r)-(d.clientY-s)/120;p.onChange(Qa(p.taper,p.min,p.max,h));return}let u=p.max-p.min||1,m=Math.min(p.max,Math.max(p.min,r-(d.clientY-s)*u/120));p.onChange(m)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let u=Fr(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(U()),ee(n,e),n}function qr(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let s=t(n);s?.type==="choice"&&s.onChange(o.value)}),i.addEventListener("keydown",s=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(i),c=l;if(s.key==="ArrowRight"||s.key==="ArrowDown")c=(l+1)%r.length;else if(s.key==="ArrowLeft"||s.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(s.key==="Home")c=0;else if(s.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(s.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(U()),Mo(n,e),n}function Mo(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function Dr(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],m=document.createElement("span");m.className="nc-snap-wrap";let h=document.createElement("button");h.type="button",h.className="nc-snap",h.dataset.ncSlot=String(p),h.textContent=u.label,h.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",m.append(h,ne()),Pr(m,h,n,p,t),o.append(m)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=ko(),i.append(ne()),i.addEventListener("click",()=>{Co(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let s=document.createElement("div");s.className="nc-field nc-morph-field",s.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",s.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,s,U()),To(n,t),Lo(n,e),n}function fa(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;Oe(e);let s=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,s)}function Pr(e,t,n,o,i){let s=0,r=0,l=0,c=!1,d=!1,p=!1,u=!1,m=()=>{window.clearTimeout(s),s=0},h=w=>{let y=w.clientX-r,x=w.clientY-l;y*y+x*x>pa*pa&&(c=!0,m())},b=()=>{u&&(u=!1,window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",g),window.removeEventListener("pointercancel",f))},g=w=>{let y=s!==0&&!c&&!d;m(),b(),y&&(p=!0,fa(n,o,i,w))},f=()=>{c=!0,m(),b()};e.addEventListener("pointerdown",w=>{w.button===0&&(b(),d=!1,c=!1,p=!1,r=w.clientX,l=w.clientY,m(),s=window.setTimeout(()=>{s=0,!c&&(d=!0,Ir(n,t,o,i))},xr),u=!0,window.addEventListener("pointermove",h),window.addEventListener("pointerup",g),window.addEventListener("pointercancel",f))}),e.addEventListener("contextmenu",w=>w.preventDefault()),e.addEventListener("click",w=>{if(p||d||c){p=!1,d=!1,c=!1;return}fa(n,o,i,w)})}function To(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=ga("Save","store"),i=ga("Clear","clear");n.append(o,i);let s=document.createElement("div");s.className="nc-slot-scrim",s.hidden=!0,s.setAttribute("aria-hidden","true"),s.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Oe(e)}),s.addEventListener("click",r=>r.stopPropagation()),e.append(s,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Oe(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Oe(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&Oe(e)})}function ga(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Ir(e,t,n,o){To(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let s=e.querySelector(".nc-slot-scrim");s instanceof HTMLElement&&(s.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.bottom-r.top}px`,i.querySelector("button")?.focus()}function Oe(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Lo(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let s=Number(i.dataset.ncSlot),r=t.slots[s];if(!r)continue;i.textContent=r.label,r.filled?i.dataset.filled="true":delete i.dataset.filled,r.active?i.dataset.active="true":delete i.dataset.active,r.edited?i.dataset.edited="true":delete i.dataset.edited,r.queued?i.dataset.queued="true":delete i.dataset.queued,r.queued&&r.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Co(e){let t=e.dataset.ncLastFill||null,n=Di(t);e.dataset.ncLastFill=n;let o=Pi(n);if(o)for(let[i,s]of Object.entries(o))e.style.setProperty(i,s)}function Br(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=s=>{if(o===s)return;o=s,n.setAttribute("aria-pressed",s?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(s)};n.addEventListener("pointerdown",s=>{s.button===0&&(s.preventDefault(),n.setPointerCapture?.(s.pointerId),i(!0))});for(let s of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(s,()=>i(!1));return n.addEventListener("keydown",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),s.repeat||i(!0))}),n.addEventListener("keyup",s=>{s.key!==" "&&s.key!=="Enter"||(s.preventDefault(),i(!1))}),n.addEventListener("contextmenu",s=>s.preventDefault()),n}function jr(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=f=>{let w=document.createElement("button");return w.type="button",w.setAttribute("role","radio"),w.textContent=f,o.append(w),w},s=i("Note"),r=i("Accent");r.dataset.ncAccentMode="";let l=f=>{for(let w of[s,r]){let y=w===f;w.setAttribute("aria-checked",y?"true":"false"),w.tabIndex=y?0:-1}};l(s);for(let f of[s,r])f.addEventListener("click",()=>l(f));o.addEventListener("keydown",f=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(f.key))return;f.preventDefault();let w=r.getAttribute("aria-checked")==="true"?s:r;l(w),w.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(Br(n,t)),e.onClear){let f=document.createElement("button");f.type="button",f.className="nc-fill nc-clear",f.dataset.ncClear="",f.textContent=e.clearLabel??"Clear",f.title="Clear every step (Undo takes it back)",f.addEventListener("click",()=>{let w=t(n);w?.type==="stepGrid"&&w.onClear?.()}),c.append(f)}n.append(c);for(let f of e.rows){let w=document.createElement("div");w.className="nc-row",w.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=f.label,y.setAttribute("aria-label",`Select ${f.label}`),f.lane&&(y.dataset.ncLane=String((f.lane-1)%4+1));let x=!1,E=0;y.addEventListener("pointerdown",$=>{x=!1,!($.pointerType==="mouse"||$.button!==0)&&(E=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(x=!0,S.onSelectRow?.(S.rows.findIndex(v=>v.id===f.id),!0))},Mr))});for(let $ of["pointerup","pointercancel","pointerleave"])y.addEventListener($,()=>window.clearTimeout(E));y.addEventListener("contextmenu",$=>{x&&$.preventDefault()}),y.addEventListener("click",$=>{let S=t(n);if(S?.type!=="stepGrid")return;if(x){x=!1;return}let v=S.rows.findIndex(k=>k.id===f.id),M=!!S.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);S.onSelectRow?.(v,M)}),y.addEventListener("keydown",$=>Rr(n,y,$));let L=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let v=document.createElement("button");v.type="button",v.className="nc-ms",v.dataset.ncMs=$,v.textContent=$==="mute"?"M":"S",v.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${f.label}`),S.append(v,ne()),S.addEventListener("click",()=>{let M=t(n);if(M?.type!=="stepGrid")return;let k=M.rows.findIndex(C=>C.id===f.id);($==="mute"?M.onMute:M.onSolo)?.(k)}),L.push(S)}let T=document.createElement("div");T.className="nc-steps";for(let $=0;$<f.steps.length;$++){let S=document.createElement("span");S.className="nc-step-wrap";let v=document.createElement("button");v.type="button",v.className="nc-step",v.dataset.ncStep=`${f.id}:${$}`,v.setAttribute("aria-label",`${f.label} step ${$+1}`),S.append(v,ne()),S.addEventListener("click",M=>{let k=t(n);if(k?.type!=="stepGrid")return;let C=k.rows.findIndex(j=>j.id===f.id),F=r.getAttribute("aria-checked")==="true";k.onToggle(C,$,M.shiftKey||F)}),T.append(S)}if(e.onLength&&T.append(Hr(n,T,f,t)),w.append(...L,y,T),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=f.id,$.setAttribute("aria-label",`Re-roll ${f.label}`),$.title=`Re-roll ${f.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=ua(),$.append(ne()),$.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex(v=>v.id===f.id))}),w.append($)}w.addEventListener("click",$=>{if($.target!==w)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex(v=>v.id===f.id))}),ba(n,T,".nc-step-wrap",t,r,()=>f.id),n.append(w)}let d=document.createElement("div");d.className="nc-pads-head";let p=(f,w,y)=>{let x=document.createElement("button");return x.type="button",x.className=f,x.textContent=w,y&&x.setAttribute("aria-label",y),x},u=p("nc-pads-step","‹","Previous lane"),m=p("nc-pads-step","›","Next lane"),h=document.createElement(e.onLength?"button":"span");h.className="nc-pads-label",h.setAttribute("aria-live","polite"),e.onLength&&(h.type="button",h.dataset.ncLenToggle="",h.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",un(n,f))}));for(let[f,w]of[[u,-1],[m,1]])f.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let x=y.rows.length;y.onSelectRow?.(((tt(y)+w)%x+x)%x)});if(d.append(u,h,m),e.onDice){let f=p("nc-pads-step nc-pads-dice","","Re-roll lane");f.dataset.ncPadsDice="",f.innerHTML=ua(),f.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid")return;let y=tt(w);y>=0&&w.onDice?.(y)}),d.append(f)}if(e.transport){let f=p("nc-pads-play","Play");f.dataset.ncPadsPlay="",f.addEventListener("click",()=>{let w=t(n);w?.type==="stepGrid"&&w.transport?.onToggle()}),d.append(f)}n.append(d);let b=document.createElement("div");b.className="nc-pads",b.setAttribute("role","group");let g=Math.max(0,...e.rows.map(f=>f.steps.length));for(let f=0;f<g;f++){let w=document.createElement("button");w.type="button",w.className="nc-pad",w.dataset.ncPad=String(f),w.textContent=String(f+1),w.addEventListener("click",y=>{let x=t(n);if(x?.type!=="stepGrid")return;let E=tt(x);if(E<0)return;if(n.dataset.ncLenMode==="true"){x.onLength?.(E,f+1);return}let L=r.getAttribute("aria-checked")==="true";x.onToggle(E,f,y.shiftKey||L)}),b.append(w)}return ba(n,b,".nc-pad",t,r,()=>{let f=t(n);return f?.type==="stepGrid"?f.rows[tt(f)]?.id:void 0}),n.append(b),n.append(U()),un(n,e),n}function tt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ba(e,t,n,o,i,s){let r="on",l=!0,c=-1,d=(p,u)=>{let m=p.rows[c]?.steps[u];!m||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,r,l):!!m[r]!==l&&p.onToggle(c,u,r==="accent"))};cr(t,n,p=>{let u=o(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let m=u.rows.findIndex(h=>h.id===s());m>=0&&u.rows[m].length!==p.pad+1&&u.onLength?.(m,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let m=s();c=u.rows.findIndex(b=>b.id===m);let h=u.rows[c]?.steps[p.pad];if(!h)return;r=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!h[r]}d(u,p.pad)}else if(p.kind==="long"){let m=s(),h=u.rows.findIndex(g=>g.id===m),b=t.querySelectorAll(n)[p.pad];h>=0&&b instanceof HTMLElement&&u.onLongPress?.(h,p.pad,b)}}})}function Rr(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),s=i;n.key==="ArrowDown"?s=i+1:n.key==="ArrowUp"?s=i-1:n.key==="Home"?s=0:s=o.length-1;let r=o[s];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Hr(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(ne());let s=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(b=>b.id===n.id),m=p.rows[u];if(!m)return;let h=Math.max(1,Math.min(m.steps.length,d));h!==m.length&&p.onLength?.(u,h)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((m,h)=>{let b=m.getBoundingClientRect();b.width>0&&d>=b.left+b.width/2&&(u=h+1)}),u},l=d=>s(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(h=>h.id===n.id);if(!u)return;let m={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in m&&(d.preventDefault(),s(m[d.key]))}),i}var Ot=new WeakMap,nt=new WeakMap;function Or(e){return e?(nt.has(e)||(nt.set(e,Xt(e)),Va(t=>{nt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))pn(n,Number(n.getAttribute("data-nc-velocity")))},e)),nt.get(e)):"light"}function pn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:Or(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(Ot.has(e)&&Ot.get(e)===i)){if(Ot.set(e,i),n===null){for(let s of Object.keys(Yn(1)))e.style.removeProperty(s);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[s,r]of Object.entries(Yn(n,Un[o]??Un.light)))e.style.setProperty(s,r)}}function xa(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function un(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),s=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&s&&(r.textContent=l?`${s.label} · ${s.length}`:s.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${s.label} length ${s.length} steps: tap or drag the pads to set the end, tap here when done`:`${s.label}, ${s.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&s&&(c.setAttribute("aria-label",`Re-roll ${s.label}`),c.title=`Re-roll ${s.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let m=t.transport?.ariaLabel;m?d.setAttribute("aria-label",m):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&s){i.setAttribute("aria-label",`${s.label} steps`),s.lane&&(i.dataset.ncLane=String((s.lane-1)%4+1)),s.mute||n&&!s.solo?i.dataset.silent="true":delete i.dataset.silent;let p=s.length>0?(t.playhead%s.length+s.length)%s.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let m=Number(u.getAttribute("data-nc-pad")),h=s.steps[m];u instanceof HTMLButtonElement&&(u.hidden=!h||!l&&m>=s.length,l&&m>=s.length?u.dataset.out="true":delete u.dataset.out,l&&m===s.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${s.label} step ${m+1}${h?.markLabel?`, ${h.markLabel}`:""}`),xa(u,h),u.setAttribute("aria-pressed",h?.on?"true":"false"),h?.accent?u.dataset.accent="true":delete u.dataset.accent,h?.dim?u.dataset.dim="true":delete u.dataset.dim,pn(u,h?.velocity),t.playhead>=0&&m===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let h=0;h<p.steps.length;h++){let b=p.steps[h],g=e.querySelector(`[data-nc-step="${p.id}:${h}"]`);if(!(g instanceof HTMLButtonElement))continue;let f=g.closest(".nc-row");if(f instanceof HTMLElement){t.selectedRow===p.id?f.dataset.selected="true":delete f.dataset.selected;let E=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);E?f.dataset.picked="true":delete f.dataset.picked;let L=f.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||E?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?f.dataset.silent="true":delete f.dataset.silent;for(let T of f.querySelectorAll("[data-nc-ms]")){let $=T.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;T.setAttribute("aria-pressed",$?"true":"false")}}g.setAttribute("aria-pressed",b.on?"true":"false");let w=`${p.label} step ${h+1}${b.markLabel?`, ${b.markLabel}`:""}`;g.getAttribute("aria-label")!==w&&g.setAttribute("aria-label",w),xa(g,b),b.accent?g.dataset.accent="true":delete g.dataset.accent,b.dim?g.dataset.dim="true":delete g.dataset.dim,h%4===0?g.dataset.bar="true":delete g.dataset.bar,typeof b.velocity=="number"?(g.dataset.velocity="true",g.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,b.velocity))*100)}%`)):(delete g.dataset.velocity,g.style.removeProperty("--level")),pn(g,b.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;h===y?g.dataset.playhead="true":delete g.dataset.playhead;let x=!!t.onLength&&t.selectedRow===p.id;g.hidden=h>=p.length&&!x,h>=p.length&&x?g.dataset.out="true":delete g.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),m=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&m&&m.nextElementSibling!==u){let h=document.activeElement===u;m.after(u),h&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function _r(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,U()),t}function Vr(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let s=!e.master&&typeof e.onFold=="function",r=null;s&&(n.dataset.ncFoldable="",r=Io(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let x=t(n);x?.type==="strip"&&(x.onFold?.(x.folded!==!0),document.activeElement!==r&&r.focus())})),o.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let x=document.createElement("span");x.className="nc-strip-grip-dots",x.setAttribute("aria-hidden","true"),l.append(x),l.addEventListener("keydown",E=>{if(E.key!=="ArrowLeft"&&E.key!=="ArrowRight"||E.ctrlKey||E.metaKey||E.shiftKey)return;let L=t(n);L?.type==="strip"&&(E.preventDefault(),L.onMove?.(E.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>va(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",x=>{x.pointerType==="touch"||x.pointerType==="pen"||x.target instanceof Element&&x.target.closest("input, .nc-strip-remove")||(x.preventDefault(),va(n,o,t,{x:x.clientX,y:x.clientY}))}),e.onRemove){let x=document.createElement("button");x.type="button",x.className="nc-strip-remove",x.dataset.ncStripRemove="",x.textContent="×",x.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&E.onRemove?.(x)}),o.append(x)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let x=document.createElement("span");x.className="nc-hacks-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks",E.dataset.ncHacks="",x.append(E,ne()),x.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),c.append(x)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let x=document.createElement("span");x.className="nc-hacks-wrap nc-sends-view-wrap";let E=document.createElement("button");E.type="button",E.className="nc-hacks nc-sends-view",E.dataset.ncSendsView="",x.append(E,ne()),x.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),d.append(x)}for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let E=document.createElement("span");E.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=x,L.textContent=x==="mute"?"M":"S",E.append(L,ne()),E.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&(x==="mute"?T.onMute:T.onSolo)?.()}),d.append(E)}let p=document.createElement("div");p.className="nc-strip-sends";for(let x of e.sends??[])p.append($e({...x,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append($e(zn(e),t));let m=document.createElement("div");m.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let x of e.ticks??[]){let E=document.createElement("span");E.className="nc-scale-tick",E.style.setProperty("--tick-pos",String(x.value)),E.textContent=x.label,h.append(E)}let b=ns({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:x=>{let E=t(n);E?.type==="strip"&&E.onChange(x)},onReset:()=>{let x=t(n);x?.type==="strip"&&ya(x)}}),g=ls({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let x=t(n);x?.type==="strip"&&x.onClipClear?.()}});if(m.append(h,b.el,g.el),s){let x=document.createElement("button");x.type="button",x.className="nc-ui-fx-fold nc-strip-fold",x.dataset.ncStripFold="",x.setAttribute("aria-expanded","false");let E=document.createElement("span");E.className="nc-strip-fold-cap",E.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let T=document.createElement("span");T.className="nc-strip-fold-pan",T.setAttribute("aria-hidden","true"),T.hidden=!e.pan,x.append(E,T,L),x.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),m.prepend(x)}let f=document.createElement("button");f.type="button",f.className="nc-strip-db",f.dataset.ncReadout="";let w=0;f.addEventListener("click",x=>{let E=t(n);E?.type!=="strip"||!E.onTypeIn||(window.clearTimeout(w),x.detail===0?wa(n,f,t):x.detail===1&&(w=window.setTimeout(()=>wa(n,f,t),Yr)))}),f.addEventListener("dblclick",()=>{window.clearTimeout(w);let x=t(n);x?.type==="strip"&&ya(x)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append($e(Fn(e),t)),r&&n.append(r),l&&n.append(l),n.append(o,y,c,d,p,u,m,f,U()),No(n,e),n}function zn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Ur(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Fn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Gr(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function Gr(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Ur(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Yr=250;function wa(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??Ke(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let s=!1,r=l=>{if(s)return;s=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),i.addEventListener("blur",()=>r(!1))}function Wr(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let s=document.createElement("span");s.className="nc-strip-add-label",o.append(i,s);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;Fo(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(o,r,U()),zo(n,e),n}function zo(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],s=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");s!==r&&(o.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Fo(o))}function Fo(e){let t=e.options[0];t&&(t.selected=!0)}function ya(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function No(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),s=i?as(i):void 0;s&&(s.configure({step:t.step}),s.set(t.value),s.setText(t.valueText),s.setLabel(`${t.label} level`)),cs(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let b=t.valueText??Ke(t.value);r.textContent!==b&&(r.textContent=b),r.setAttribute("aria-label",`${t.label} level ${b}`);let g=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${g}`:g}for(let b of e.querySelectorAll("[data-nc-ms]")){let g=b.getAttribute("data-nc-ms"),f=g==="mute"?t.mute===!0:t.solo===!0;b.setAttribute("aria-pressed",f?"true":"false"),b.setAttribute("aria-label",`${g==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let b=t.hacksLabel??"Hacks";l.textContent!==b&&(l.textContent=b),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${b}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let b=t.sendsViewLabel??"Sends";c.textContent!==b&&(c.textContent=b),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${b}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ge(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=qo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let b=e.querySelector(`.nc-strip-trim [data-nc-id="${Fe(t.trim.id)}"]`);b&&ee(b,Fn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let b=e.querySelector(`.nc-strip-pan [data-nc-id="${Fe(t.pan.id)}"]`);b&&ee(b,zn(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let m=e.querySelector("[data-nc-strip-hide]");m instanceof HTMLElement&&(Bo(m,u,t.label),ge(m,t.foldHelp));let h=e.querySelector("[data-nc-strip-fold]");if(h instanceof HTMLElement){h.hidden=!u,h.setAttribute("aria-label",`Expand ${t.label}`);let b=h.querySelector("[data-nc-strip-fold-name]");b&&b.textContent!==t.label&&(b.textContent=t.label),ge(h,t.foldedHelp??t.foldHelp)}}function qo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Do?t:0}var Do=8,at=null;function va(e,t,n,o){at?.();let i=n(e);if(i?.type!=="strip")return null;let s=e.ownerDocument,r=s.defaultView??globalThis,l=s.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=s.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=s.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=qo(i),u=e.querySelector("[data-nc-strip-grip]")??t,m=(w=!1)=>{if(at!==m)return;at=null;let y=l.contains(s.activeElement);l.remove(),s.removeEventListener("keydown",b,!0),s.removeEventListener("pointerdown",g,!0),r.removeEventListener("resize",f),(w||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},h=[0,...Array.from({length:Do},(w,y)=>y+1)].map(w=>{let y=s.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",w===p?"true":"false"),y.setAttribute("tabindex",w===p?"0":"-1"),y.dataset.ncShadeChoice=String(w),w===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(w),y.setAttribute("aria-label",`Shade ${w}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${w})`)),y.addEventListener("click",()=>{let x=n(e);m(!0),x?.type==="strip"&&x.onShade?.(w===0?null:w)}),y});if(d.append(...h),d.addEventListener("keydown",w=>{let y=h.indexOf(s.activeElement);if(y<0)return;let x=-1;w.key==="ArrowRight"||w.key==="ArrowDown"?x=(y+1)%h.length:w.key==="ArrowLeft"||w.key==="ArrowUp"?x=(y-1+h.length)%h.length:w.key==="Home"?x=0:w.key==="End"&&(x=h.length-1),!(x<0)&&(w.preventDefault(),h[y].setAttribute("tabindex","-1"),h[x].setAttribute("tabindex","0"),h[x].focus())}),l.append(c,d),typeof i.onMove=="function"){let w=[...e.parentElement?.children??[]].filter(x=>x.classList?.contains("nc-strip")&&!x.hasAttribute("data-nc-master")),y=w.indexOf(e);for(let[x,E,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let T=s.createElement("button");T.type="button",T.className="nc-strip-menu-item",T.dataset.ncStripMove=x<0?"left":"right";let $=s.createElement("span");$.textContent=E;let S=s.createElement("kbd");S.textContent=L,S.setAttribute("aria-hidden","true"),T.append($,S),T.disabled=x<0?y<=0:y<0||y>=w.length-1,T.addEventListener("click",()=>{let v=n(e);m(!0),v?.type==="strip"&&v.onMove?.(x)}),l.append(T)}}s.body.append(l),(()=>{let w=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,x=l.offsetHeight,E=r.innerWidth||s.documentElement.clientWidth||y,L=r.innerHeight||s.documentElement.clientHeight||x,T=o?o.x:w.right-y,$=o?o.y:w.bottom+4;T=Math.max(4,Math.min(T,E-y-4)),$+x>L-4&&($=Math.max(4,(o?o.y:w.top)-x-4)),l.style.left=`${Math.round(T)}px`,l.style.top=`${Math.round($)}px`})();let b=w=>{if(w.key==="Escape")w.preventDefault(),w.stopPropagation(),m(!0);else if(w.key==="Tab"&&l.contains(s.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(E=>E.getAttribute("tabindex")!=="-1"),x=(y.indexOf(s.activeElement)+(w.shiftKey?-1:1)+y.length)%y.length;w.preventDefault(),y[x]?.focus()}},g=w=>{l.contains(w.target)||m(!1)},f=()=>m(!1);return s.addEventListener("keydown",b,!0),s.addEventListener("pointerdown",g,!0),r.addEventListener("resize",f),at=m,(h.find(w=>w.getAttribute("tabindex")==="0")??h[0]).focus({preventScroll:!0}),{el:l,close:()=>m(!1)}}var hn=typeof ResizeObserver=="function"?new ResizeObserver(Kr):null;function Kr(e){for(let t of e){if(!t.target.isConnected){hn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Xr(n)}}function Xr(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,s=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+s}px`)}function Qr(e){if(hn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))hn.observe(t)}function Jr(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",s=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!wt(e)&&!s&&!r)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),s&&l.append(Ro(n,"head")),e.on!==void 0){let c=Wa({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(el(n,t)),wt(e)&&l.append(ol(n,t)),r&&l.append(il(t)),n.append(l)}i&&n.prepend(tl(n,t)),s&&Ho(n,e);for(let l of e.controls)n.append($e(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append($e(d,t));n.append(l)}return n.append(U()),Oo(n,e),Qr(n),n}var Zr=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function Po(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&Zr(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function el(e,t){let n=Io();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),Po(e))}),n}function Io(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Bo(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function tl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let s=document.createElement("span");return s.className="nc-fold-tri",s.setAttribute("aria-hidden","true"),n.append(s,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ro(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),Po(e)}}),n}var qe=new Set;function dt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var wt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),nl="(max-width: 768px)";function al(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function ol(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(al()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(jo(e,o,!qe.has(o.id)),n.focus())}),n}function il(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function jo(e,t,n){n?qe.add(t.id):qe.delete(t.id),Nn(e,t)}function sl(e,t){t?.type==="fx"&&qe.has(t.id)&&jo(e,t,!1)}function rl(e){return e.ownerDocument.defaultView?.matchMedia?.(nl).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Nn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=wt(t)&&qe.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!wt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),dt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ne(r)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",ge(n,t.maxHelp)),!o){e.dataset.ncMax&&$a(e);return}if(!e.isConnected){let r=()=>e.isConnected&&qe.has(t.id)&&Nn(e,t);queueMicrotask(()=>{e.isConnected?r():dt(e.ownerDocument,r)});return}let i=rl(e),s=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;s>0&&e.style.setProperty("--nc-fx-dials",String(s)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&$a(e),e.dataset.ncMax=i,i==="over"&&ll(e,t)),cl(e.ownerDocument),i==="over"&&qn(e),dt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ne(r)})}function $a(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),dt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ne(n)})}function ll(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function qn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,s=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,r=Ms(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),s,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var ka=new WeakSet;function cl(e){ka.has(e)||(ka.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&qn(t)}))}var mn=new WeakMap;function Ro(e,t){let n=ar(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ho(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)ge(i,t.meterHelp);let o=mn.get(e);o?o.set(t.meter):mn.set(e,rr(n,t.meter))}function Oo(e,t){(t.meter||mn.has(e))&&Ho(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let s=e.querySelector("[data-nc-fx-hide]");s instanceof HTMLElement&&(Bo(s,i,t.title),ge(s,t.foldHelp)),Nn(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=i,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),ge(l,t.foldHelp)}}function ge(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Fe(e){return e.replace(/["\\]/g,"\\$&")}function dl(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&Za(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ne(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&qn(n);yr(e)}var pl=1e3,ul=e=>e===!0?"log":typeof e=="string"?e:"linear";function hl(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??ul(e.log),i=Je(o,e.min,e.max),s=n.createElement("div");s.className="nc-field",s.dataset.ncRow="",s.dataset.ncSlider="",s.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?pl:e.max),l.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",s.append(r,l,c,d);let p=e.value,u=()=>{let h=e.format(p);c.textContent=h,l.setAttribute("aria-valuetext",h)},m=h=>{p=h,n.activeElement!==l&&(l.value=String(i?We(o,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?ft(o,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",h=>{let b=En(o,e.min,e.max,p,h.key,h.shiftKey,e.step);b===null||l.disabled||(h.preventDefault(),l.value=String(We(o,e.min,e.max,b)),p=b,u(),e.onInput(p))}),l.disabled=e.disabled===!0,m(e.value),{el:s,set:m,setDisabled(h){l.disabled=h===!0}}}var ml=me["toast-duration"];function fl({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function gl(e,t,n,o){let i=l=>({top:l,bottom:l+n}),s=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=i(t-o-n);return s(r)?s(i(o))?"bottom":"top":"bottom"}function bl(e,t,n,o,i,s){let r=e.bottom+i,l=Math.max(s,Math.min(e.left,o-s-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+i,c=!0)}return{top:r,left:l}}var Ea="data-nc-ui-toast-live";function xl(e,t){let n=t.querySelector(`[${Ea}]`);return n||(n=e.createElement("div"),n.setAttribute(Ea,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function wl({message:e,actionLabel:t,onAction:n,duration:o=ml,onClose:i,avoid:s=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let u=c.createElement("span");u.className="nc-ui-toast-message",u.textContent=e,p.appendChild(u);let m=null;t&&(m=c.createElement("button"),m.type="button",m.className="nc-ui-toast-action",m.textContent=t,p.appendChild(m)),l.appendChild(p);let h="open",b=N=>N&&typeof N.getBoundingClientRect=="function"?N.getBoundingClientRect():null,g=b(p),f=g?.height||44,w=d.getComputedStyle?.(p),y=Number.parseFloat(w?.getPropertyValue(I("toast-offset")))||16,x=Number.parseFloat(w?.getPropertyValue(I("toast-anchor-gap")))||8,E=b(r),L=d.innerHeight??0,T=s.map(b).filter(Boolean),$=E&&E.bottom>0&&E.top<L?bl(E,T,{width:g?.width||0,height:f},d.innerWidth??0,x,y):null;$&&$.top+f<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${$.top+(d.scrollY??0)}px`,p.style.left=`${$.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",gl(T,L,f,y));let S=d.requestAnimationFrame?.bind(d)??(N=>setTimeout(N,16));S(()=>S(()=>{h==="open"&&p.setAttribute("data-state","open")})),xl(c,l).textContent=fl({message:e,actionLabel:t});let v,M,k=new Promise(N=>{M=N}),C=N=>{clearTimeout(v),v=setTimeout(()=>P("timeout"),N)},F=o,j=Date.now(),R=()=>{h==="open"&&(clearTimeout(v),F=Math.max(0,F-(Date.now()-j)))},D=()=>{h==="open"&&(j=Date.now(),C(F))};p.addEventListener("pointerenter",R),p.addEventListener("pointerleave",D),p.addEventListener("focusin",R),p.addEventListener("focusout",D),m?.addEventListener("click",()=>{if(h==="open")try{n?.()}finally{P("action")}}),Number.isFinite(o)&&C(o);function P(N="close"){if(h!=="open")return;h="closing",clearTimeout(v),p.setAttribute("data-state","closing"),i?.(N);let q=d.getComputedStyle?.(p),re=q?Math.max(0,...String(q.transitionDuration||"").split(",").map(le=>Number.parseFloat(le)*(le.trim().endsWith("ms")?1:1e3)||0)):0,oe=()=>{h!=="gone"&&(h="gone",p.remove(),M(N))};p.addEventListener("transitionend",oe),setTimeout(oe,re+50)}return{el:p,close:P,closed:k}}var yt="data-nc-help";function yl(e,t,n,o=0,i=6,s=8){let r=e.top-i-t.height,l=r>=o+s?"above":"below",c=l==="above"?r:e.bottom+i,d=Math.max(s,Math.min(e.left,n-s-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var _t=new WeakMap;function vl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function $l({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=_t.get(e);if(n)return n;let o=e.defaultView,i=null,s=null,r,l=!1,c,d=null,p=!1,u=0,m=()=>{clearTimeout(r),p&&!l&&(u=Date.now()+1500),p=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},h=()=>{m(),clearTimeout(c),s=null,d=null,l=!1},b=($,S)=>{clearTimeout(r),d=S;let v=Date.now()<u?Math.min(t,300):t;r=setTimeout(()=>{s===$&&$.isConnected&&!l&&w($)&&(p=!0)},v)},g=$=>({x:Number($.clientX)||0,y:Number($.clientY)||0}),f=($,S,v)=>!$||Math.hypot($.x-S.x,$.y-S.y)>v,w=($,S)=>{let v=S??$.getAttribute(yt);if(!v)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=v,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let M=$.getBoundingClientRect(),k=yl(M,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,vl(e));return i.style.top=`${k.top}px`,i.style.left=`${k.left}px`,i.dataset.side=k.side,i.style.visibility="",!0},y=$=>{if(l||$.pointerType==="touch")return;let S=$.target&&$.target.closest?$.target.closest(`[${yt}]`):null;S!==s&&(h(),!(!S||$.buttons)&&(s=S,b(S,g($))))},x=$=>{if(l||$.pointerType==="touch"||!s)return;if($.buttons){m(),d=null;return}let S=g($);p?f(d,S,8)&&(m(),b(s,S)):f(d,S,4)&&b(s,S)},E=$=>{!l&&!$.relatedTarget&&h()},L=$=>{(l||$.key==="Escape")&&h()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",x,{passive:!0}),e.addEventListener("pointerout",E),e.addEventListener("pointerdown",h,!0),e.addEventListener("keydown",L),o.addEventListener("scroll",h,!0),o.addEventListener("blur",h);let T={hide:h,pin($,S,{ms:v=0}={}){return h(),!$||!$.isConnected||!w($,S)?!1:(l=!0,i.dataset.pinned="",v>0&&(c=setTimeout(h,v)),!0)},uninstall(){h(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",x),e.removeEventListener("pointerout",E),e.removeEventListener("pointerdown",h,!0),e.removeEventListener("keydown",L),o.removeEventListener("scroll",h,!0),o.removeEventListener("blur",h),i?.remove(),i=null,_t.delete(e)}};return _t.set(e,T),T}var Dn="netcomposer.rhythm.hidden.v1",ie=new WeakMap;function Vt(){try{return globalThis.localStorage??null}catch{return null}}function _o(e,t=Dn){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Aa(e,t,n,o=Dn){let i=_o(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function Pn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let s of i.controls)o(s)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(s=>({...s,type:"knob",compact:!0}))),i.pan&&n.push(zn(i)),i.trim&&n.push(Fn(i)));return n}function Vo(e,t){if(!(!e||!t))return Pn(e).find(n=>n.id===t)}function kl(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Pn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function El(e,t){if(!t.title)return;if(!t.panel){let s=document.createElement("h3");s.className="nc-ui-fx-name",s.textContent=t.title,e.append(s);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),Go(e,t)}function Go(e,t){if(!t.panel)return;let n=[...e.children].find(s=>s.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Al(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ie.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Vo(n,o)}function Sl(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=kl(t);if(e.dataset.ncSignature===i){for(let s of o){let r=e.querySelector(`[data-nc-section="${Ma(s.id)}"]`);r&&Go(r,s);for(let l of s.controls){let c=e.querySelector(`[data-nc-id="${Ma(l.id)}"]`);c instanceof Element&&ee(c,l)}r instanceof HTMLElement&&fn(r,s,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let s of o){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=s.id,s.inset&&(r.dataset.ncInset="true"),s.area&&(r.dataset.ncArea=s.area),s.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",s.label)),s.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),s.title&&r.setAttribute("aria-label",s.title)),El(r,s);let l=s.panel?document.createElement("div"):r;s.panel&&(l.className="nc-panel-body",r.append(l));for(let c of s.controls)l.append($e(c,Al));e.append(r),fn(r,s,n)}}function Uo(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var Ml="(max-width: 768px)",Yo=new WeakMap;function Sa(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Tl(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=Sa("prev"),s=Sa("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(i,r,s,l);let c=(d,p)=>{let u=Yo.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let m=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:h}=Uo(m,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,h),u.onPage?.(h),fn(e,{...u,page:h},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?s:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),s.addEventListener("click",()=>c(1,s)),e.prepend(o),o}function fn(e,t,n){Yo.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:s,page:r}=Uo(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,r),s<=1){for(let f of[...e.children])f.classList.contains("nc-fx-pager")&&f.remove();delete e.dataset.ncPaged;for(let f of o)delete f.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Ml).matches===!0,c=e.closest(".nc-module");o.forEach((f,w)=>{let y=Math.floor(w/i)!==r;if(y?f.dataset.ncOffPage="":delete f.dataset.ncOffPage,y&&!l){let x=c instanceof HTMLElement?ie.get(c):void 0;sl(f,Vo(x,f.dataset.ncId))}});let d=Tl(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),u.setAttribute("aria-disabled",r===s-1?"true":"false");let m=d.querySelector("[data-nc-fx-page-count]"),h=`${r+1} / ${s}`;m.textContent!==h&&(m.textContent=h);let b=d.querySelector("[data-nc-fx-page-live]"),g=`Effects page ${r+1} of ${s}`;b.textContent!==g&&(b.textContent=g)}function Ma(e){return e.replace(/["\\]/g,"\\$&")}function Ll(e,t=Dn){Ya();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=_o(Vt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let s=document.createElement("h2");s.className="nc-title",s.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Wa({labelledBy:s.id,onChange:y=>(ie.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(s,p,r);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let m=document.createElement("button");m.type="button",m.className="nc-slim";let h=document.createElement("span");h.className="nc-slim-lines",m.append(h);let b=document.createElement("i");b.className="nc-token-probe",b.dataset.ncProbe="",n.append(b,i,u,m),n.setAttribute("aria-labelledby",s.id);let g=y=>{let x=ie.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,m.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${x.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";Aa(Vt(),(ie.get(n)??e).id,y,t),g(y),gn(n.parentElement)}),m.addEventListener("click",()=>{Aa(Vt(),(ie.get(n)??e).id,!1,t),g(!1),gn(n.parentElement)});let f={pages:new Map,redraw:()=>w.redraw()},w={el:n,update(y){ie.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,s.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),h.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,m.setAttribute("aria-label",`Show ${y.title}`),Sl(u,y,f),g(u.hidden),w.redraw()},redraw(){let y=ie.get(n);y&&dl(n,Pn(y))}};return ie.set(n,e),g(o),w.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>w.redraw()).observe(n),Va(()=>w.redraw(),n.ownerDocument),w}function Cl(e,t,n="adjacent"){Ya(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,s)=>{let r=s%4+1;i.el.dataset.ncShade=String(r),i.el.dataset.ncPlace=o;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(i.el),i.redraw()}),gn(e)}function gn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(s=>s instanceof HTMLElement&&s.classList.contains("nc-module")),n=t.some(s=>s.hasAttribute("data-nc-lead")),o=t.map(s=>s.hasAttribute("data-nc-slim")?a("module-slim-column"):n?s.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(s=>!s.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const zl={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"The song's bars. Drag across them to loop a section, drag an end to move it, double-click to clear. While jamming, a change starts at the next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in this browser.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"This pass's own quantize. Song follows the Setup."};function Wo(e){return zl[e]??""}const Ko="nc-song-looper",Xo=4,Fl=[1,2,3,4],bn=64,B=960,H=4,ae=32,xn=4e3,Tt=120,vt=40,$t=240,Nl=8,Le=40,In=["off","1/8","1/16","1/32"],Qo=[.5,.75,1],Jo=128,De=e=>Math.max(1,Math.floor(e/H)),X=e=>e.bars*H*B,kt=H*B;function wn(e){const t=e.loop;return t?{start:(t.from-1)*kt,length:(t.to-t.from+1)*kt}:{start:0,length:X(e)}}function Zo(e,t){const n=X(t);if(!e.repeat||e.endTick>=n)return[0];const o=[];for(let i=0;i<n;i+=e.endTick)o.push(i);return o}function ei(e,t){if(!e.shift)return 0;const n=X(t),o=e.repeat&&e.endTick<n?e.endTick:n,i=e.shift*kt%o;return i<0?i+o:i}function ql(e,t){const n=X(t),o=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(o/kt)-1)}function Dl(e){const t=Math.round(e.bars*H*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function ti(e,t=new Date,n=Math.random){const o=Math.min($t,Math.max(vt,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString(),s=i.replace(/[-:T]/g,"").slice(0,12);return{format:Ko,version:Xo,id:`sl-${s}-${Math.floor(n()*65535).toString(16).padStart(4,"0")}`,name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:o,beatsPerBar:H,bars:Math.min(Nl,De(o)),countInBars:1,ppq:B},passes:[],comps:[]}}const Me=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),W=e=>Number.isInteger(e),we=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,Gt=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),pe=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function Ta(e){if(e===void 0)return null;if(!Me(e))return"quantize must be an object";const t=pe(e,["grid","strength"]);return t?`quantize has an unknown field (${t})`:In.includes(e.grid)?Qo.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%":"quantize grid is not off, 1/8, 1/16 or 1/32"}function Pl(e){if(!Me(e)||e.format!==Ko)return"it isn't a Lupa song";if(!Fl.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=pe(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!we(e.id))return"its id is missing";if(!we(e.name,Le*2))return"its name is missing";if(!Gt(e.createdAt)||!Gt(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Me(n))return"its song is missing";const o=pe(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop"]);if(o)return`its song has an unknown field (${o})`;if(!W(n.bpm)||n.bpm<vt||n.bpm>$t)return`its tempo is not ${vt}–${$t}`;if(n.beatsPerBar!==H)return"it isn't in 4/4";if(!W(n.bars)||n.bars<1||n.bars>De(n.bpm))return`its bars are not 1–${De(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==B)return`its ticks are not ${B} a beat`;const i=Ta(n.quantize);if(i)return`its song's ${i}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const c=n.loop;if(!Me(c)||pe(c,["from","to"])||!W(c.from)||!W(c.to)||c.from<1||c.to<c.from||c.to>n.bars)return`its loop is not bars 1–${n.bars}`}const s=X(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>ae)return`it has more than ${ae} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let c=0;c<e.passes.length;c++){const d=e.passes[c],p=`Pass ${c+1}`;if(!Me(d))return`${p} is not an object`;const u=pe(d,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift"]);if(u)return`${p} has an unknown field (${u})`;if(d.repeat!==void 0&&(e.version<3||typeof d.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(d.shift!==void 0&&(e.version<4||!W(d.shift)||d.shift===0||Math.abs(d.shift)>bn))return`${p}'s shift is not a whole number of bars`;if(!we(d.id)||r.has(d.id))return`${p} has no id of its own`;if(r.add(d.id),!W(d.n)||d.n<1||l.has(d.n))return`${p} has no number of its own`;if(l.add(d.n),!we(d.name,Le))return`${p}'s name is not 1–${Le} characters`;if(!Gt(d.recordedAt))return`${p}'s date is wrong`;if(!W(d.endTick)||d.endTick<=0||d.endTick>s)return`${p}'s end is not in the song`;for(const b of["kept","mute","solo"])if(typeof d[b]!="boolean")return`${p}'s ${b} is not true or false`;if(typeof d.volume!="number"||!(d.volume>=0&&d.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(d.instruments)||!d.instruments.every(b=>we(b,64)))return`${p}'s instruments are wrong`;const m=Ta(d.quantize);if(m)return`${p}'s ${m}`;if(!Array.isArray(d.events))return`${p}'s events are missing`;if(d.events.length>xn)return`${p} has more than ${xn} events`;let h=Number.NEGATIVE_INFINITY;for(let b=0;b<d.events.length;b++){const g=d.events[b],f=`event ${b+1} in ${p}`;if(!Me(g))return`${f} is not an object`;if(!we(g.inst,64)||!d.instruments.includes(g.inst))return`${f} is from an instrument not listed`;if(!W(g.at)||g.at<-Tt||g.at>=d.endTick)return`${f} is outside the pass`;if(g.at<h)return`${f} is out of order`;if(h=g.at,g.kind==="take"){if(e.version===1)return`${f} is of an unknown kind`;const y=pe(g,["kind","inst","take","at","len","peaks"]);if(y)return`${f} has an unknown field (${y})`;if(!we(g.take)||g.take.length>128)return`${f} has no take`;if(!W(g.len)||g.len<1||g.at+g.len>s)return`${f} has a length outside the song`;if(g.peaks!==void 0&&!(Array.isArray(g.peaks)&&g.peaks.length<=Jo&&g.peaks.every(x=>typeof x=="number"&&x>=0&&x<=1)))return`${f} has bad peaks`;continue}if(g.kind==="slot"){const y=pe(g,["kind","inst","slot","at"]);if(y)return`${f} has an unknown field (${y})`;if(!W(g.slot)||g.slot<1||g.slot>16)return`${f} has slot ${String(g.slot)}`;continue}const w=pe(g,["kind","inst","note","vel","at","len","slice","name"]);if(w)return`${f} has an unknown field (${w})`;if(g.kind!==void 0&&g.kind!=="note")return`${f} is of an unknown kind`;if(!W(g.note)||g.note<0||g.note>127)return`${f} has note ${String(g.note)}`;if(typeof g.vel!="number"||!(g.vel>0&&g.vel<=1))return`${f} has velocity ${String(g.vel)}`;if(!W(g.len)||g.len<1||g.len>s)return`${f} has a length outside the song`;if(g.slice!==void 0&&!(W(g.slice)&&g.slice>=0&&g.slice<=255))return`${f} has slice ${String(g.slice)}`;if(g.name!==void 0&&!(typeof g.name=="string"&&g.name.length>0&&g.name.length<=Le))return`${f} has a bad sound name`}}return null}function Il(e){const t=Pl(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=Xo,{session:n}}class Bl{song;b0;passes;drafts=new Map;held=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/B}get lapTicks(){return wn(this.song).length}get lapStart(){return wn(this.song).start}get full(){return this.passes.length>=ae}hasDraft(t){return(this.drafts.get(t)?.count??0)>0}place(t){const n=t-this.b0,o=Math.floor(n/this.lapBeats+1e-12);return{lap:o,tick:Math.round((n-o*this.lapBeats)*B)}}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-Tt?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/B}played(t,n){const o=[];for(const i of n){if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="chordPad"||i.type==="lap"){this.stats.ignored++;continue}if(i.type==="take"){const p=this.voicePass(t,i);p&&o.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:s,tick:r}=this.placeOn(i.beat);if(s<0||s<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(s)??{lap:s,events:[],count:0};if(l.events.length>=xn){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(i.type==="slot")c={kind:"slot",inst:t,slot:i.slot,at:d};else{const p={inst:t,note:i.note,vel:jl(i.velocity),at:d,len:1};i.slice!==void 0&&(p.slice=i.slice),typeof i.name=="string"&&i.name.trim()&&(p.name=i.name.trim().slice(0,Le)),this.held.set(`${t}|${i.id}`,{ev:p,onBeat:i.beat}),c=p}La(l.events,c),l.count++,this.drafts.set(s,l),this.stats.taken++,o.push({lap:s,ev:c})}return o}release(t,n,o){const i=`${t}|${n}`,s=this.held.get(i);s&&(this.held.delete(i),s.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-s.onBeat)*B))))}seam(t){const n=this.place(t).lap,o=[];for(let i=this.through+1;i<n;i++){this.through=i;const s=this.commit(i,this.lapTicks);s&&o.push(s)}return o}stop(t){for(const[s,r]of this.held)this.held.delete(s),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-r.onBeat)*B)));const n=this.seam(t),{lap:o,tick:i}=this.place(t);if(o>=0&&o>this.through){this.through=o;const s=H*B,r=Math.min(this.lapTicks,Math.max(s,Math.ceil(Math.max(1,i)/s)*s)),l=this.commit(o,r);l&&n.push(l)}return this.drafts.clear(),n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:i}=this.place(n.beat);if(o<0||!n.take||this.passes.some(d=>d.events.some(p=>p.kind==="take"&&p.take===n.take)))return this.stats.ignored++,null;const s=Math.max(0,Math.min(this.lapTicks-1,i)),r=Math.max(1,Math.min(this.lapTicks-s,Math.round(n.lengthBeats*B))),l={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+s,len:r};Array.isArray(n.peaks)&&n.peaks.length&&(l.peaks=n.peaks.slice(0,Jo).map(d=>Number.isFinite(d)?Math.round(Math.max(0,Math.min(1,d))*100)/100:0)),this.drafts.set(-1-o,{lap:o,events:[l],count:1});const c=this.commitDraft(-1-o,o,this.lapTicks);return c&&this.stats.taken++,c}isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,o){const i=this.drafts.get(n),s=this.lapStart-o;if(this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),i){for(const r of i.events)r.at+=s;i.lap=0,this.drafts.set(0,i)}}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,o){const i=this.drafts.get(t);if(this.drafts.delete(t),!i||i.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=i.count,null;const s=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=i.events.filter(d=>d.at-r<o),c={id:`p${s}-${this.now().getTime().toString(36)}`,n:s,name:`Pass ${s}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?X(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:n}=this.place(t),o=this.drafts.get(n);if(o&&o.count>0){this.drafts.delete(n);for(const[l,c]of this.held)o.events.includes(c.ev)&&this.held.delete(l);const r={kind:"lap",draft:o};return this.redoStack.push(r),r}const i=this.passes.pop();if(!i)return null;const s={kind:"pass",pass:i};return this.redoStack.push(s),s}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const s=this.passes.findIndex(r=>r.n>n.pass.n);return s<0?this.passes.push(n.pass):this.passes.splice(s,0,n.pass),n}const{lap:o}=this.place(t);if(n.draft.lap===o||n.draft.lap>this.through){const s=this.drafts.get(n.draft.lap);if(s)for(const r of n.draft.events)La(s.events,r);else this.drafts.set(n.draft.lap,n.draft);return s&&(s.count+=n.draft.count),n}this.drafts.set(n.draft.lap,n.draft);const i=this.commit(n.draft.lap,this.lapTicks);return i?{kind:"pass",pass:i}:null}get canRedo(){return this.redoStack.length>0}}function jl(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function La(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const Ca=.5,Rl=64,ot="draft:",Hl=12,Ol={"1/8":B/2,"1/16":B/4,"1/32":B/8};function za(e,t){const n=t?Ol[t.grid]:void 0;if(!t||!n)return e;const o=Math.round(e/n)*n;return Math.round(e+(o-e)*t.strength)}function it(e,t){return e.mute?!1:t?e.solo:!0}const Fa=e=>e.kind==="slot",Ut=e=>e.kind==="take",_l=.05;class Vl{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.restart()}rebase(t){for(const[n,o]of this.takesSent)o<=t+1e-9&&this.takesSent.delete(n);this.rung=this.rung.filter(n=>!n.pass.startsWith(ot))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;this.silence(t);const n=[...this.takesSent.values()].some(o=>o>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(o=>o.beat<t);for(const[o,i]of this.takesSent)i>t&&this.takesSent.delete(o);for(const[o,i]of this.sounding)this.sounding.set(o,i.filter(s=>s.start<t))}}pump(t,n,o){const i=this.rec,s=[];if(this.waiting.length){const v=[];for(const M of this.waiting){if(i.isHeld(M.ev)){v.push(M);continue}if(M.beat>=t)s.push(M);else{const k=Math.min(M.ev.len,this.rec.lapTicks)/B-(t-M.beat);k>.05&&s.push({...M,beat:t,lenBeats:k})}}this.waiting=v}const r=Math.max(this.sentTo,t);if(!(n>r)&&!s.length&&!this.lateTakes(t))return 0;const l=o?.lapTicks??i.lapTicks,c=l/B,d=o?.lapStart??i.lapStart,p=d+l,u=o?.b0??i.b0,m=(v,M)=>u+v*c+(M-d)/B,h=v=>v>=d-Tt&&v<p,b=Math.max(0,Math.floor((r-u)/c)-1),g=Math.floor((n-u)/c)+1,f=[],w=(v,M,k)=>{const C=k+v.at;if(!h(C))return;const F=m(M,C);F>=r&&F<n&&f.push({inst:v.inst,beat:F,slot:v.slot})},y=[],x=(v,M,k,C,F=Number.NEGATIVE_INFINITY,j=Number.POSITIVE_INFINITY)=>{const R=C,D=R+M.at,P=Math.min(D+M.len,R+v.endTick,j),N=Math.max(D,d,F),q=Math.min(P,p);if(q<=N)return;const re=m(k,N),oe=m(k,q),le=`${v.id}|${k}|${R}`;if(this.takesSent.has(le)||oe<=t||re>=n)return;const be=Math.max(re,t);if(oe-be<_l)return;const Be=(N-D)/B+(be-re),je={type:"take",id:`t${++this.serial}`,beat:be,take:M.take,lengthBeats:Be+(oe-be),gain:Math.max(0,Math.min(1,v.volume))};Be>1e-9&&(je.offsetBeats=Be),this.takesSent.set(le,oe),y.push({inst:M.inst,ev:je})},E=i.passes,L=E.some(v=>v.solo&&!v.mute),T=(v,M,k,C,F,j,R)=>{if(!h(F))return;const D=m(j,F);D>=r&&D<n&&(i.isHeld(C)?this.waiting.push({inst:M,age:k,beat:D,ev:C,velocity:R,pass:v}):s.push({inst:M,age:k,beat:D,ev:C,velocity:R,pass:v}))};for(const v of E){if(!it(v,L))continue;const M=o?void 0:i.lapOf(v),k=M===void 0?0:M+1,C=v.quantize??this.song.quantize,F=Zo(v,this.song),j=ei(v,this.song),R=F.length>1?v.endTick:X(this.song),D=P=>{const N=P+j;return j&&N>=R?N-R:N};for(let P=Math.max(k,b);P<=g;P++)for(const N of F)for(const q of v.events)if(!(q.at>=v.endTick)){if(Fa(q)){w(q,P,N+D(q.at)-q.at);continue}if(Ut(q)){j?(x(v,q,P,N+j,N,N+R),x(v,q,P,N+j-R,N,N+R)):x(v,q,P,N);continue}T(v.id,q.inst,v.n,q,N+D(za(q.at,C)),P,q.vel*v.volume)}}if(!L)for(const v of i.drafting())for(let M=Math.max(o?0:v.lap+1,b);M<=g;M++)for(const k of v.events){if(Fa(k)){w(k,M,0);continue}Ut(k)||T(`${ot}${v.lap}`,k.inst,Number.POSITIVE_INFINITY,k,za(k.at,this.song.quantize),M,k.vel)}if(this.announceLaps&&!i.full&&!i.paused){const v=[];for(let M=Math.max(0,Math.ceil((r-u)/c));u+M*c<n;M++)v.push({type:"lap",id:`l${++this.serial}`,beat:u+M*c,lengthBeats:c});v.length&&(this.sink.laps(v),this.stats.laps+=v.length)}if(this.sentTo=Math.max(this.sentTo,n),y.length){const v=new Map;for(const M of y)v.set(M.inst,[...v.get(M.inst)??[],M.ev]);for(const[M,k]of v)this.sink.controls(M,k);this.stats.takes+=y.length}if(f.length){f.sort((M,k)=>M.beat-k.beat);const v=new Map;for(const M of f){const k=v.get(M.inst)??[];k.push({type:"slot",id:`s${++this.serial}`,beat:M.beat,slot:M.slot}),v.set(M.inst,k)}for(const[M,k]of v)this.sink.controls(M,k);this.stats.slots+=f.length}if(!s.length)return 0;s.sort((v,M)=>v.beat-M.beat||M.age-v.age);const $=new Map;for(const v of s){const M=v.lenBeats??Math.max(1,Math.min(v.ev.len,l))/B;if(!this.voice(v.inst,v.beat,v.beat+M,v.age)){this.stats.dropped++;continue}const k={note:v.ev.note,velocity:Math.max(.01,Math.min(1,v.velocity)),startBeat:v.beat,lengthBeats:M,spanBeats:M,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:v.ev.note};v.ev.slice!==void 0&&(k.slice=v.ev.slice),this.rung.push({inst:v.inst,pass:v.pass,note:k});const C=$.get(v.inst)??[];C.push(k),$.set(v.inst,C)}let S=0;for(const[v,M]of $)this.sink.send(v,M),S+=M.length;return this.stats.sent+=S,S}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-Rl),!this.rung.length||!this.sink.release)return;const n=this.rec.passes,o=n.some(c=>c.solo&&!c.mute),i=new Map(n.map(c=>[c.id,c])),s=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(ot)){const p=Number(c.slice(ot.length));if(s.has(p))return!o;const u=n.find(m=>this.rec.lapOf(m)===p);return!!u&&it(u,o)}const d=i.get(c);return!!d&&it(d,o)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,o=Math.floor((t-n.b0)/n.lapBeats),i=n.passes.some(s=>s.solo&&!s.mute);return n.passes.some(s=>{if(!it(s,i)||!s.events.some(Ut))return!1;const r=n.lapOf(s);return r===void 0||o>r})}voice(t,n,o,i){const s=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(s.length>=Hl){let r=0;for(let l=1;l<s.length;l++)s[l].age<s[r].age&&(r=l);if(i<=s[r].age)return this.sounding.set(t,s),!1;s.splice(r,1)}return s.push({start:n,end:o,age:i}),this.sounding.set(t,s),!0}}const Gl={running:!1,beatAt:()=>0,timeAt:()=>0};class Ul{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];constructor(t,n){this.session=t,this.deps=n,this.rec=new Bl({song:t.song,b0:0,passes:t.passes,now:n.date}),this.replay=n.sink?new Vl(this.rec,n.sink):null;const o=n.host;o?.clock&&this.offs.push(o.clock.onChange(i=>this.clockChanged(i))),o?.onPlayed&&this.offs.push(o.onPlayed((i,s)=>this.played(i,s))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],i=>(i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??Gl}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min($t,Math.max(vt,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,De(n)),this.changed())}toggle(){this.jamming||this.wantJam?this.stop():this.jam()}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.transport.running){const o=Math.ceil(this.beatNow()/H+.05)*H;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}begin(t){this.wantJam=!1,this.jamming=!0;const n=t+this.session.song.countInBars*H;if(this.rec.resume(n),this.replay?.start(),this.transport.running){const o=Math.min(t,this.beatNow());this.replay?.pump(o,this.transport.beatAt(this.deps.now()+Ca))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,n)}showCountIn(t,n){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||n<=t)return;const i=this.transport,s=l=>o.mapper?.toContextTime(i.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(s(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%H===0),until:s(n)})}catch{}}stop(){const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null),this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){t.kind==="start"&&this.wantJam?this.begin(typeof t.beat=="number"?t.beat:0):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),this.changed(!1)}played(t,n){if(!this.jamming)return;const o=this.rec.played(t,n);o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),n!==this.lastLap&&(this.lastLap=n,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const s=this.rec.seam(t),r=this.pending;if(r&&t>=r.seam){this.pending=null;const d=this.rec.lapStart,p=this.rec.place(t).lap;this.applyLoop(r.loop),this.rec.rebase(r.seam,p,d),this.replay?.rebase(r.seam),this.lastLap=-1,this.changed()}const l=this.transport.beatAt(this.deps.now()+Ca),c=this.pending;if(c&&l>c.seam){this.replay?.pump(t,c.seam);const d=wn({bars:this.session.song.bars,...c.loop?{loop:c.loop}:{}});this.replay?.pump(Math.max(t,c.seam),l,{b0:c.seam,lapStart:d.start,lapTicks:d.length})}else this.replay?.pump(t,l);return s.length?(this.changed(),!0):o}view(){const t=this.session,n=this.transport,o=this.jamming&&n.running?this.beatNow():null,i=o===null?null:this.rec.place(o),s=o!==null&&o<this.rec.b0,r=t.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,l=this.deps.host?.studioTransport?.bpm(),c=this.jamming?s?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:c,jamming:this.jamming||this.wantJam,bar:i&&!s?Math.floor((this.rec.lapStart+i.tick)/(H*960))+1:null,songPos:i&&!s?(this.rec.lapStart+i.tick)/X(t.song):null,pendingLoop:this.pending?.loop,nextPass:r,countIn:s&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!s?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof l=="number"&&Math.round(l)!==t.song.bpm?Math.round(l):null,notice:this.notice}}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const o=Math.max(1,Math.min(De(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=o;else if(o>n.bars&&t.grow){n.bars=o;const i=X(n);for(const s of this.session.passes)s.endTick<i&&s.repeat===void 0&&(s.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let o=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),c=Math.max(l,Math.min(n.bars,Math.round(t.to)));o=l===1&&c===n.bars?null:{from:l,to:c}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(o),this.changed();return}const i=this.beatNow(),{lap:s}=this.rec.place(i),r=this.rec.beatOf(Math.max(s+1,0),0);this.pending={loop:o,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const o=this.pass(t);if(o){if(n.name!==void 0){const i=n.name.replace(/\s+/g," ").trim().slice(0,Le);o.name=i||`Pass ${o.n}`}if(n.kept!==void 0&&(o.kept=n.kept),n.mute!==void 0&&(o.mute=n.mute),n.solo!==void 0&&(o.solo=n.solo),n.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&o.endTick<X(this.session.song)&&(o.repeat=n.repeat),n.shift!==void 0){const i=Math.max(-bn,Math.min(bn,Math.round(n.shift)||0));i?o.shift=i:delete o.shift}n.quantize===null?delete o.quantize:n.quantize&&(o.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(i=>i.id===t);if(n<0)return null;const[o]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),o?{pass:o,index:n}:null}restorePass(t,n){const o=this.session.passes;return o.length>=ae||o.some(i=>i.id===t.id)?!1:(o.splice(Math.min(Math.max(0,n),o.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){this.jamming&&this.stop();const t=ti(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.notice="",this.changed(),t}get passCount(){return this.session.passes.length}get maxPasses(){return ae}dispose(){for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const Yl="netcomposer-looper",Ce="sessions",Wl="netcomposer.looper.current.v1",Kl=500;function Xl(e){return new Promise((t,n)=>{const o=e.open(Yl,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(Ce)||o.result.createObjectStore(Ce,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}function Ql(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Jl(e={}){const t=e.idb===void 0?Na(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?Na(()=>globalThis.localStorage):e.local,o=e.currentKey??Wl;let i=null;const s=()=>t?(i??=Xl(t),i):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=m=>{const h=structuredClone(m);c=c.then(async()=>{const g=(await s()).transaction(Ce,"readwrite");g.objectStore(Ce).put(h),await Ql(g);try{n?.setItem(o,h.id)}catch{}}).catch(()=>{d++})},u=()=>{l&&clearTimeout(l),l=null;const m=r;r=null,m&&p(m)};return{async load(){let m=null;try{m=n?.getItem(o)??null}catch{m=null}if(!m||!t)return null;try{const g=(await s()).transaction(Ce,"readonly").objectStore(Ce).get(m),f=await new Promise((w,y)=>{g.onsuccess=()=>w(g.result),g.onerror=()=>y(g.error)});return f===void 0?null:Il(f)}catch{return null}},save(m,h=!1){if(r=m,h){u();return}l||(l=setTimeout(u,Kl))},async flush(){u(),await c},get failures(){return d}}}function Na(e){try{return e()??null}catch{return null}}const ni=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let Ee;function Zl(){if(Ee!==void 0)return Ee;Ee=null;try{Ee=ni()?.attach("looper",{instance:1})??null}catch{Ee=null}return Ee}function ec(){return ni()?.countIn??null}function tc(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const nc="netcomposer.looper.hidden.v1",ac=50;function A(e,t={},...n){const o=document.createElement(e);for(const[i,s]of Object.entries(t))s!==void 0&&o.setAttribute(i,s);for(const i of n)i!==null&&i!==!1&&o.append(i);return o}const Y=e=>({[yt]:Wo(e)||void 0});function G(e,t,n){const o=A("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function _e(e,t){return A("span",{class:"nc-label",...t?Y(t):{}},e)}function ai(e,t,n,o,i,s=!1){const r=A("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=G(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&i(l.value)});c.disabled=s,r.append(c)}return r}function Et(e,t,n,o,i,s="lp-toggle"){return G(t,{class:s,"aria-pressed":String(n),"data-lp-id":e,...Y(o)},i)}function Bn(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function oi(e,t,n){const o=A("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),s=Ll(i(),nc),r=()=>{const l=s.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return r(),{handle:s,mount:o,update(){s.update(i()),r()}}}const Q=Zl(),Lt=Jl({currentKey:Q?.storageKey?.("netcomposer.looper.current.v1")}),Ae=await Lt.load();let ii="",yn;Ae&&"session"in Ae?yn=Ae.session:(Ae&&"error"in Ae&&(ii=`Your last song didn't open: ${Ae.error}. A new one is started.`),yn=ti(Q?.studioTransport?.bpm()??120));function oc(){let e=null;try{e=Q?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,o=i=>{n.has(i)||(n.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,s){o(i),t.send(s,i)},controls(i,s){o(i),t.sendControls(s,i)},laps(i){let s=[];try{s=(Q?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{s=[]}for(const r of s)o(r),t.sendControls(i,r)},off(i){t.off(i===void 0?"stop":"restart",i)},release(i,s){n.has(i)&&t.release?.(s,i)},restart(){t.restart()}}}const z=new Ul(yn,{host:Q,countIn:ec(),load:tc,now:Ai,save:e=>Lt.save(e),sink:oc()});z.notice=ii;addEventListener("pagehide",()=>Lt.save(z.session,!0));const si=document.getElementById("app");si.classList.add("nc","nc-page");$l();const ri=A("header",{class:"nc-page-hd"},A("div",{},A("h1",{class:"nc-page-title"},A("span",{class:"lp-brand"},"LUPA")," ",A("span",{class:"nc-page-sep"},"/")," LOOPER ",A("span",{class:"nc-page-sep"},"/")," ",A("span",{class:"nc-mono"},"01")),A("p",{class:"nc-page-sub"},"A NetComposer element.")),A("div",{class:"nc-page-actions"},G("New song",{class:"nc-page-action","data-lp-id":"new-song",...Y("new-song")},()=>sc()))),li=A("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),ci=A("footer",{class:"lp-foot lp-sub"},A("span",{class:"lp-notice",role:"status"}),A("span",{class:"lp-mono"},"netcomposer.looper.01"));si.append(ri,A("main",{class:"nc-page-body"},li),ci);let Se=null;function ic(){return ri.querySelector('[data-lp-id="new-song"]')}function Yt(e){const t=ic();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function sc(){if(z.passCount&&!Se){Yt(!0),Se=setTimeout(()=>{Se=null,Yt(!1)},4e3);return}Se&&clearTimeout(Se),Se=null,Yt(!1),z.newSong(),Qe=null,K="all",z.notice="New song started. The last one stays in this browser.",se()}const di=A("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),he=Q?.metronome,pi=hl({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((he?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>he?.set({volume:e/100})});pi.el.setAttribute(yt,Wo("volume"));he?.onChange(()=>se());function qa(e,t,n,o,i,s=!1){const r=A("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e});for(const l of n){const c=A("option",{value:l.value},l.label);l.value===o&&(c.selected=!0),r.append(c)}return r.disabled=s,r.addEventListener("change",()=>i(r.value)),r}let ue=null;function rc(e){if(ue===null)return null;const t=e.session.song,n=ue*H*B,o=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),i=o.length?Math.max(...o.map(l=>Math.floor(n/l.endTick))):ue/t.bars,s=l=>{const c=ue;ue=null,l&&c&&z.setSong({bars:c,grow:l}),se()},r=o.length;return A("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},A("span",{class:"lp-ask-title"},`Grow to ${ue} bars?`),A("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),G(`Repeat ×${Math.max(2,Math.round(i))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>s("repeat")),G("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>s("once")),G("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>s(null)))}function lc(e){const t=e.session.song,n=[1,2,4,8,16].filter(i=>i<=De(t.bpm)&&(!e.locked||i>=t.bars)),o=t.quantize;Bn(di,A("h3",{class:"lp-section-title"},"Setup"),A("div",{class:"lp-field"},_e("Tempo","tempo"),A("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?A("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?A("span",{class:"lp-sub"},"Locked: the song has passes."):A("span",{class:"lp-sub"},"Follows the Studio.")),A("div",{class:"lp-field"},_e("Length","bars"),ai("bars","Bars",n.map(i=>({value:String(i),label:String(i)})),String(ue??t.bars),i=>{const s=Number(i);e.locked&&s>t.bars?(ue=s,se()):z.setSong({bars:s})},e.jamming),rc(e)??A("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${Dl(t)}`)),A("div",{class:"lp-row lp-toggles"},Et("count-in","Count-in",t.countInBars===1,"count-in",()=>z.setSong({countInBars:t.countInBars?0:1})),he?Et("metronome","Metronome",he.prefs().on,"metronome",()=>he.set({on:!he.prefs().on})):null),he?pi.el:null,A("div",{class:"lp-pair"},A("label",{class:"lp-field"},_e("Quantize","quantize"),qa("quantize","Quantize",In.map(i=>({value:i,label:i==="off"?"Off":i})),o?.grid??"off",i=>z.setSong({quantize:i==="off"?null:{grid:i,strength:o?.strength??1}}))),A("label",{class:"lp-field"},_e("Strength","strength"),qa("strength","Strength",Qo.map(i=>({value:String(i),label:`${Math.round(i*100)}%`})),String(o?.strength??1),i=>o&&z.setSong({quantize:{grid:o.grid,strength:Number(i)}}),!o))))}const ui=oi("jam","Jam",()=>{const e=z.view(),t=e.session.song.loop,n=t?`loop ${Pe(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${z.passCount} / ${ae} passes`});function Pe(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const cc="http://www.w3.org/2000/svg",V=(e,t)=>{const n=document.createElementNS(cc,e);for(const[o,i]of Object.entries(t))n.setAttribute(o,i);return n},Xe=44,vn=2*Math.PI*Xe,hi=V("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),mi=V("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(Xe),"stroke-width":"3","stroke-dasharray":`0 ${vn}`,transform:"rotate(-90 50 50)"}),pt=V("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});hi.append(V("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(Xe),"stroke-width":"1"}),mi,pt);const fi=A("span",{class:"lp-bar","data-lp-id":"bar"},"–"),gi=A("span",{class:"lp-pass","data-lp-id":"pass"}),dc=A("div",{class:"lp-ring"},hi,A("div",{class:"lp-ring-mid"},fi,gi));function bi(e){const t=e.lapPos??0;mi.setAttribute("stroke-dasharray",`${t*vn} ${vn}`);const n=t*2*Math.PI;pt.setAttribute("cx",String(50+Xe*Math.sin(n))),pt.setAttribute("cy",String(50-Xe*Math.cos(n))),pt.style.visibility=e.lapPos===null?"hidden":"visible";const o=e.session.song.loop;fi.textContent=e.countIn!==null?String(e.countIn):o?e.bar!==null?`${e.bar} · ${Pe(o)}`:Pe(o):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const i=e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${ae} / ${ae}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;gi.replaceChildren(...e.phase==="recording"?[A("span",{class:"lp-dot","aria-hidden":"true"})]:[],i)}function pc(e){const t=G(e.jamming?"STOP":"JAM",{class:"nc-btn lp-big","data-lp-id":"jam",...Y(e.jamming?"stop":"jam"),...e.jamming?{}:{"data-jam":""}},()=>z.toggle());t.disabled=!Q;const n=G("UNDO",{class:"nc-btn","data-lp-id":"undo",...Y("undo")},()=>z.undo());n.disabled=!e.lapHasNotes&&!z.passCount;const o=G("REDO",{class:"nc-btn","data-lp-id":"redo",...Y("redo")},()=>z.redo());o.disabled=!e.canRedo,bi(e);const i=e.session.song.loop,s=e.pendingLoop,r=s!==void 0?A("p",{class:"lp-sub","data-lp-id":"loop-next"},s?`Loop ${Pe(s)} from the next lap.`:"Loop off from the next lap."):null,l=i&&s===void 0?A("div",{class:"lp-loop-line"},A("span",{},`Loop ${Pe(i)}`),G("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...Y("loop-off")},()=>z.setLoop(null))):null;Bn(ui.mount,A("div",{class:"lp-jam-stack"},dc,t,A("div",{class:"lp-two"},n,o),l,r,Q?null:A("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),di)}const Ct=oi("passes","Passes",()=>`${z.passCount} / ${ae}`);let Qe=null,K="all";const uc={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},zt={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},Ft=e=>e.split("#")[0]??e,hc=e=>zt[Ft(e)]?.noun[0]==="hit",xi=e=>e.kind!=="slot"&&e.kind!=="take";function Ye(e){const[t=e,n]=e.split("#"),o=uc[t]??t.toUpperCase();return n?`${o} ${n}`:o}function mc(e,t){const n=new Map;for(const i of e.events)i.inst===t&&xi(i)&&i.name&&n.set(i.name,(n.get(i.name)??0)+1);const o=[...n].sort((i,s)=>s[1]-i[1]).map(([i])=>i);return o.length?o.length===1?o[0]:`${o[0]} +${o.length-1}`:""}function Da(e,t){let n=0,o=0,i=0;for(const c of e.events)c.inst===t&&(c.kind==="slot"?o++:c.kind==="take"?i++:n++);const[s,r]=zt[Ft(t)]?.noun??["note","notes"],l=[];return i&&l.push(i===1?"voice":`${i} takes`),n&&l.push(`${n} ${n===1?s:r}`),o&&l.push(`${o} slot ${o===1?"change":"changes"}`),l.join(" · ")||"nothing"}const jn=new Map,fc=1;function gc(e,t){const n=t.bars,o=B,i=X(t),s=Zo(e,t),r=ei(e,t),l=s.length>1?e.endTick:i,c=k=>r&&k+r>=l?k+r-l:k+r,d=t.loop,p=d?(d.from-1)*H*B:0,u=d?d.to*H*B:i,m=(k,C)=>(C>0?.45:1)*(k>=p-Tt&&k<u?1:.35),h=1e3,b=34,g=V("svg",{class:"lp-strip",viewBox:`0 0 ${h} ${b}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&g.append(V("rect",{class:"lp-strip-loop",x:String(p/i*h),y:"0",width:String((u-p)/i*h),height:String(b)}));const f=n*H;for(let k=1;k<f;k++){const C=String(k*h/f);k%H!==0&&n>8||g.append(k%H===0?V("line",{class:n>8&&k%(4*H)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:C,x2:C,y1:"0",y2:String(b)}):V("line",{class:"lp-strip-beat",x1:C,x2:C,y1:String(b/2-2),y2:String(b/2+2)}))}const w=e.events.filter(xi),y=[],x=o/4*fc,E=new Set(w.filter(k=>hc(k.inst)).map(k=>k.inst)),L=new Map,T=[...new Set(w.filter(k=>E.has(k.inst)).map(k=>k.note))].sort((k,C)=>C-k);T.length>=2&&T.length<=4&&T.forEach((k,C)=>L.set(k,C));const $=w.filter(k=>!E.has(k.inst)).map(k=>k.note);let S=Math.min(...$)-2,v=Math.max(...$)+2;if(v-S<12){const k=(v+S)/2;S=k-6,v=k+6}for(const k of s)for(const C of w){const F=k+c(C.at);if(F>=i||C.at>=e.endTick)continue;const j=F/i*h,R=((.35+.65*C.vel)*m(F,k)).toFixed(2);if(E.has(C.inst)){const D=L.get(C.note);let P,N;if(D===void 0){const q=4+C.vel*9;P=b/2-q,N=b/2+q}else{const q=6+D*(b-12)/Math.max(1,L.size-1);P=q-3,N=q+3}g.append(V("line",{class:"lp-strip-hit",x1:j.toFixed(1),x2:j.toFixed(1),y1:P.toFixed(1),y2:N.toFixed(1),"stroke-opacity":R})),y.push(F/i,Math.min(1,(F+x)/i))}else{const D=Math.min(i,F+Math.max(1,C.len))/i*h,P=(4+(1-(C.note-S)/(v-S))*(b-8)).toFixed(1);g.append(V("line",{class:"lp-strip-note",x1:j.toFixed(1),x2:Math.max(j+.1,D-2).toFixed(1),y1:P,y2:P,"stroke-opacity":R})),y.push(F/i,Math.min(1,(F+Math.max(x,C.len))/i))}}const M=k=>r?[{base:k+r,lo:k,hi:k+l},{base:k+r-l,lo:k,hi:k+l}]:[{base:k,lo:k,hi:i}];for(const k of s)for(const C of M(k))for(const F of e.events){if(F.kind!=="take")continue;const j=C.base+F.at,R=Math.min(i,j+F.len,C.base+e.endTick,C.hi),D=Math.max(j,C.lo);if(D>=i||R<=D)continue;const P=D/i*h,N=R/i*h,q=F.peaks?.length?F.peaks:[.35,.35],re=Math.floor((D-j)/F.len*(q.length-1)),oe=Math.ceil((R-j)/F.len*(q.length-1)),le=q.slice(Math.max(0,re),Math.max(re+2,oe+1)),be=le.length>=2?le:[.35,.35],Be=be.length,je=b/2,$i=xe=>Math.max(.6,xe*(b/2-2)),Hn=be.map((xe,Re)=>[P+(N-P)*Re/Math.max(1,Be-1),$i(xe)]),ki=Hn.map(([xe,Re])=>`${xe.toFixed(1)},${(je-Re).toFixed(1)}`),Ei=[...Hn].reverse().map(([xe,Re])=>`${xe.toFixed(1)},${(je+Re).toFixed(1)}`);g.append(V("path",{class:"lp-strip-voice",d:`M${ki.join(" L")} L${Ei.join(" L")} Z`,opacity:m(D,k).toFixed(2)})),y.push(D/i,Math.min(1,(D+F.len)/i))}for(const k of s)for(const C of e.events){if(C.kind!=="slot"||k+c(C.at)>=i)continue;const F=((k+c(C.at))/i*h).toFixed(1);g.append(V("line",{class:"lp-strip-slot",x1:F,x2:F,y1:"0",y2:String(b)}))}if(e.endTick<i&&!e.repeat){const k=(c(e.endTick)/i*h).toFixed(1);g.append(V("line",{class:"lp-strip-end",x1:k,x2:k,y1:"8",y2:String(b-8)}))}return jn.set(e.id,Float32Array.from(y)),g}function st(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const Ie={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function Rn(e){const t=V("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(V("path",{d:e})),t}function At(e,t,n,o,i){const s=G("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...o},i);return s.append(Rn(n)),s}let Pa=null;function bc(e){Qe===e.id&&(Qe=null);const t=z.deletePass(e.id);if(!t)return;Pa?.close();const n=wl({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>z.restorePass(t.pass,t.index),anchor:Ct.mount});n.el.setAttribute("data-lp-id","delete-toast"),Pa=n}function xc(e,t){const n=z.session.song,o=H*n.ppq,i=Qe===e.id,s=[...new Set(e.instruments)],r=G("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(i)},()=>{Qe=i?null:e.id,se()}),l=A("span",{class:"lp-pass-line"},A("span",{class:"lp-pass-title"},e.name));for(const g of s)l.append(A("span",{class:"lp-inst","data-inst":zt[Ft(g)]?.token??""},Ye(g)));const c=[];for(const g of s){const f=mc(e,g);c.push(f?`${f} · ${Da(e,g)}`:Da(e,g))}s.length||c.push("Empty"),e.mute&&c.push("muted"),r.append(A("span",{class:"lp-now","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},l,A("span",{class:"lp-pass-sub"},c.join(" · "))));const d=A("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...Y("pass-volume")});d.value=String(Math.round(e.volume*100));const p=A("span",{class:"lp-db","data-lp-id":`db-${e.id}`},st(e.volume));d.style.setProperty("--lp-fill",`${d.value}%`),d.setAttribute("aria-valuetext",st(e.volume)),d.addEventListener("input",()=>{const g=Number(d.value)/100;p.textContent=st(g),d.style.setProperty("--lp-fill",`${d.value}%`),d.setAttribute("aria-valuetext",st(g)),z.editPass(e.id,{volume:g})});const u=A("div",{class:"lp-ms-pair"},Et(`mute-${e.id}`,"M",e.mute,"mute",()=>z.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),Et(`solo-${e.id}`,"S",e.solo,"solo",()=>z.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));u.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),u.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const m=At(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,Ie.star,{"aria-pressed":String(e.kept),...Y("star")},()=>z.editPass(e.id,{kept:!e.kept})),h=At(`delete-${e.id}`,`Delete ${e.name}`,Ie.trash,Y("delete"),()=>bc(e)),b=A("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...i?{"data-open":""}:{}},r,A("div",{class:"lp-tools"},wc(e,n),yc(e,n),u,A("div",{class:"lp-acts"},m,h)),A("div",{class:"lp-strip-box"},gc(e,n),A("span",{class:"lp-head","aria-hidden":"true"})),A("div",{class:"lp-vol"},d,p));if(i){const g=new Set;for(const x of e.events)g.add(Math.floor(x.at/o));const f=A("div",{class:"lp-bars",style:`--lp-bars: ${n.bars}`});for(let x=0;x<n.bars;x++)f.append(A("span",g.has(x)?{"data-on":""}:{},String(x+1)));const w=A("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});w.addEventListener("change",()=>z.editPass(e.id,{name:w.value}));const y=e.quantize;b.append(A("div",{class:"lp-sheet"},w,A("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),A("span",{class:"lp-sub"},`Plays through ${s.map(Ye).join(" and ")||"its instrument"}'s current sound.`),f,A("div",{class:"lp-field"},_e("Quantize","pass-quantize"),ai(`pq-${e.id}`,"Pass quantize",[{value:"song",label:"Song"},...In.map(x=>({value:x,label:x==="off"?"Off":x}))],y?.grid??"song",x=>z.editPass(e.id,{quantize:x==="song"?null:{grid:x,strength:y?.strength??1}})))))}return b}function wc(e,t){const n=e.shift??0,o=ql(e,t),i=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,s=d=>z.editPass(e.id,{shift:Math.max(-o,Math.min(o,n+d))}),r=At(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,Ie.earlier,n<=-o?{disabled:""}:{},()=>s(-1)),l=At(`shift-later-${e.id}`,`Move ${e.name} a bar later`,Ie.later,n>=o?{disabled:""}:{},()=>s(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return A("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${i(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...Y("shift")},r,A("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function yc(e,t){const n=X(t);if(e.endTick>=n)return A("span",{class:"lp-repeat-none","aria-hidden":"true"});const o=Math.ceil(n/e.endTick),i=!!e.repeat,s=Math.round(e.endTick/(H*B)),r=G(i?`×${o}`:"once",{class:"lp-repeat","aria-pressed":String(i),"aria-label":i?`${e.name} repeats every ${s} ${s===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...Y("repeat")},()=>z.editPass(e.id,{repeat:!i}));return i&&r.prepend(Rn(Ie.loop)),r}function vc(e){const t=e.session.song,n=t.bars,o=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,i=A("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...Y("ruler")}),s=A("div",{class:"lp-ruler-nums","aria-hidden":"true"});for(let m=1;m<=n;m++)s.append(A("span",o&&m>=o.from&&m<=o.to?{"data-in":""}:{},String(m)));const r=A("div",{class:"lp-ruler-lane"}),l=A("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),c=m=>{l.hidden=!m,m&&(l.style.setProperty("--lp-from",String(m.from-1)),l.style.setProperty("--lp-to",String(m.to)))};c(o);const d=m=>{const h=A("button",{type:"button",class:"lp-loop-handle","data-end":m,"aria-label":m==="from"?"Loop start":"Loop end","data-lp-id":`loop-${m}`});return h.addEventListener("keydown",b=>{const g=t.loop;if(!g||b.key!=="ArrowLeft"&&b.key!=="ArrowRight")return;b.preventDefault();const f=b.key==="ArrowLeft"?-1:1,w={...g};m==="from"?w.from=Math.max(1,Math.min(g.to,g.from+f)):w.to=Math.min(n,Math.max(g.from,g.to+f)),z.setLoop(w)}),h.addEventListener("pointerdown",b=>{const g=o;g&&(b.stopPropagation(),u(b,f=>m==="from"?{from:Math.min(f,g.to),to:g.to}:{from:g.from,to:Math.max(f,g.from)}))}),h};l.append(d("from"),d("to"));const p=m=>{const h=r.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((m-h.left)/Math.max(1,h.width)*n)+1))},u=(m,h)=>{if(e.jamming&&!Q)return;r.setPointerCapture?.(m.pointerId);let b=h(p(m.clientX));c(b);const g=w=>{b=h(p(w.clientX)),c(b)},f=()=>{r.removeEventListener("pointermove",g),r.removeEventListener("pointerup",f),r.removeEventListener("pointercancel",f),z.setLoop(b)};r.addEventListener("pointermove",g),r.addEventListener("pointerup",f),r.addEventListener("pointercancel",f)};return r.addEventListener("pointerdown",m=>{if(m.button!==0)return;const h=p(m.clientX);u(m,b=>({from:Math.min(h,b),to:Math.max(h,b)}))}),r.addEventListener("dblclick",()=>z.setLoop(null)),!o&&n>1&&r.append(A("span",{class:"lp-ruler-hint"},A("span",{},"Drag across the bars to loop a section"))),r.append(l),i.append(s,r),i}function $c(e){if(e.length<2)return null;const t=new Map;for(const s of e)for(const r of new Set(s.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(s=>s.kept).length;K!=="all"&&K!=="starred"&&!t.has(K)&&(K="all"),K==="starred"&&!n&&(K="all");const o=(s,r,l,c={})=>{const d=G("",{class:"lp-chip","aria-pressed":String(K===s),"data-lp-id":`filter-${s}`,...c},()=>{K=K===s?"all":s,se()});return d.append(r,A("span",{class:"lp-chip-n"},String(l))),d},i=A("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},o("all","All",e.length));for(const[s,r]of[...t].sort((l,c)=>Ye(l[0]).localeCompare(Ye(c[0]))))i.append(o(s,Ye(s),r,{"data-inst":zt[Ft(s)]?.token??""}));return n&&i.append(o("starred",Rn(Ie.star),n,{"aria-label":"Starred"})),i}function kc(e){const t=e.session.passes,n=t.some(l=>l.solo),o=t.filter(l=>K==="all"?!0:K==="starred"?l.kept:l.instruments.includes(K)),i=A("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&i.append(A("div",{class:"lp-pass-head"},vc(e))),e.phase==="recording"&&i.append(A("div",{class:"lp-pass-row lp-live","data-live":""},A("span",{class:"lp-pass-name"},A("span",{class:"lp-dot","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},A("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),A("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),jn.clear();for(const l of[...o].reverse())i.append(xc(l,n));!t.length&&e.phase!=="recording"?i.append(A("p",{class:"lp-sub"},"No passes yet. Press Jam (or Space) and play.")):t.length&&!o.length&&i.append(A("p",{class:"lp-sub"},"No passes here."));const s=t.filter(l=>!l.kept).length,r=G(`CLEAR UNSTARRED${s?` (${s})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...Y("clear-unkept")},()=>z.clearUnkept());r.disabled=!s,Bn(Ct.mount,$c(t),i,t.length?A("div",{class:"lp-between"},A("span",{class:"lp-row"},r,A("span",{class:"lp-sub"},"Starred passes stay.")),A("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${ae}`)):null),Ve=""}let Ve="";function Ec(e){const t=Ct.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),Ve){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");Ve=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const o=e.session.passes.some(l=>l.solo),i=[];for(const l of e.session.passes){if(l.mute||o&&!l.solo)continue;const c=jn.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){i.push(l.id);break}}}const s=i.join("|");if(s===Ve)return;Ve=s;const r=new Set(i);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const wi=[ui,Ct];Cl(li,wi.map(e=>e.handle),"adjacent");let Ia="";function yi(e){const t=e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.session.song.loop?`Lupa · Bar ${e.bar} · loop ${Pe(e.session.song.loop)} · Pass ${e.nextPass}`:`Lupa · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,n=`${t}|${e.phase}`;if(n!==Ia){Ia=n;try{Q?.readout?.(t),Q?.chip?.(e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:z.passCount?{text:`${z.passCount} passes`}:null)}catch{}}}function se(){const e=z.view();lc(e),pc(e),kc(e);for(const n of wi)n.update();const t=ci.querySelector(".lp-notice");t&&(t.textContent=e.notice),yi(e)}z.onChange(se);setInterval(()=>{z.tick()&&se(),z.jamming||z.syncTempo()},ac);function vi(){const e=z.view();e.jamming&&(bi(e),yi(e)),Ec(e),requestAnimationFrame(vi)}requestAnimationFrame(vi);se();window.__looper={looper:z,store:Lt,view:()=>z.view(),get hosted(){return!!Q}};
