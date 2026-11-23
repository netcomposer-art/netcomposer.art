(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function ci(){return(performance.timeOrigin+performance.now())/1e3}var di="nc-ui",pi={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Yn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ft={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},ui={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},xe={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},hi={light:{color:pi.color,semantic:Yn,component:Ft,runtime:ui},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},tt=e=>`--${di}-${e}`,gn=Yn["label-on-fill-dark"],wa=Yn["label-on-fill-light"],mi=xe["label-min-contrast"],fi=/^#[0-9a-f]{6}$/i,gi=e=>typeof e=="string"&&fi.test(e),At=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function ya(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let s=t*Math.min(n,1-n),o=i=>{let r=(i+e/30)%12;return n-s*Math.max(-1,Math.min(r-3,9-r,1))};return`#${At(o(0)*255)}${At(o(8)*255)}${At(o(4)*255)}`}function gs(e){let[t,n,s]=[1,3,5].map(c=>parseInt(e.slice(c,c+2),16)/255),o=Math.max(t,n,s),i=Math.min(t,n,s),r=(o+i)/2,l=o-i;if(!l)return{h:0,s:0,l:r};let d=l/(1-Math.abs(2*r-1));return{h:((o===t?60*((n-s)/l%6):o===n?60*((s-t)/l+2):60*((t-n)/l+4))+360)%360,s:d,l:r}}function xa(e){let[t,n,s]=[1,3,5].map(o=>{let i=parseInt(e.slice(o,o+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*s}function bn(e,t){let[n,s]=[xa(e),xa(t)].sort((o,i)=>i-o);return(n+.05)/(s+.05)}var Nt=e=>bn(e,gn)>=bn(e,wa)?gn:wa;function bs(e,t,n,s=mi){let o=ya(e,t,n),i=Nt(o)===gn?1:-1;for(let r=0;r<40&&bn(o,Nt(o))<s;r++)n+=i*.01,o=ya(e,t,n);return o}function bi(e){let{h:t,s:n}=gs(e),s=bs(t,Math.min(n,xe["surprise-on-max-saturation"]),xe["surprise-on-lightness"]);return{fill:e,ink:Nt(e),on:s,onInk:Nt(s)}}var wi=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function yi(e,t=Math.random){let[n,s]=xe["surprise-saturation"],[o,i]=xe["surprise-lightness"],r=xe["surprise-min-hue-gap"],l=gi(e)?gs(e).h:null,d=t()*360;return l!==null&&wi(d,l)<r&&(d=(l+r+t()*(360-2*r))%360),bs(d,n+t()*(s-n),o+t()*(i-o))}function xi(e){if(!e)return null;let t=bi(e);return{[tt("surprise-fill")]:t.fill,[tt("surprise-ink")]:t.ink,[tt("surprise-on")]:t.on,[tt("surprise-on-ink")]:t.onInk}}var vi=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,$i=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function va(e){let[t,n,s]=[1,3,5].map(l=>vi(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*s),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*s),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*s);return[.2104542553*o+.793617785*i-.0040720468*r,1.9779984951*o-2.428592205*i+.4505937099*r,.0259040371*o+.7827717662*i-.808675766*r]}function ki([e,t,n]){let s=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*s-3.3077115913*o+.2309699292*i,-1.2684380046*s+2.6097574011*o-.3413193965*i,-.0041960863*s-.7034186147*o+1.707614701*i].map(r=>At($i(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var Ei=xe["velocity-range"],ws={min:Ft.rhythm["velocity-min"],max:Ft.rhythm["velocity-max"]},$a=Object.fromEntries(Object.entries(hi).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ai(e,t=ws){let[n,s]=Ei,o=Number.isFinite(e)?Math.max(n,Math.min(s,e)):n,i=(o-n)/(s-n),r=t.ink??Ft.rhythm["step-cell-ink"];if(i<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:r};if(i>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:r};let l=va(t.min),d=va(t.max);return{velocity:o,t:i,fill:ki(l.map((c,p)=>c+(d[p]-c)*i)),ink:r}}function ka(e,t=ws){return{[tt("velocity-fill")]:Ai(e,t).fill}}var ys="data-nc-theme",Ea="nc-ui-theme-change",Si="(prefers-color-scheme: dark)",xs=e=>e?.documentElement??null,vs=e=>e?.defaultView?.matchMedia?.(Si)??null,Mi=e=>e==="light"||e==="dark"?e:"system";function Ti(e=globalThis.document){return Mi(xs(e)?.getAttribute(ys))}function wn(e=globalThis.document){let t=Ti(e);return t!=="system"?t:vs(e)?.matches?"dark":"light"}function $s(e,t=globalThis.document){let n=xs(t);if(!n)return()=>{};let s=wn(t),o=()=>{let d=wn(t);d!==s&&(s=d,e(d))},i=t.defaultView?.MutationObserver,r=i?new i(o):null;r?.observe(n,{attributes:!0,attributeFilter:[ys]});let l=vs(t);return l?.addEventListener?.("change",o),t.addEventListener(Ea,o),()=>{r?.disconnect(),l?.removeEventListener?.("change",o),t.removeEventListener(Ea,o)}}var Li={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Ci={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Fi={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Ni={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Vt={};for(let[e,t]of Object.entries(Ci))Vt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Ni))Vt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Fi))Vt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Li.renames.map(e=>[e.old,e.new]));function ks(e){let t=Vt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function H(e){return ks(e).prop}function a(e){return`var(${H(e)})`}function zi(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(H(t)));return Number.isFinite(n)?n:0}function V(e,t){let n=ks(t),s=e.ownerDocument??document,o=s.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=i:o.style.color=i,(e instanceof Element?e:s.documentElement).append(o);let r=(s.defaultView??window).getComputedStyle(o),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return o.remove(),l}function Es(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function Di(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let s=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),s}var qi="[data-modulated], [data-modulated] *";function Jt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Aa(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Pi(){let e=s=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${s}"],
    .nc-ui-fx[data-nc-depth="${s}"] {
      background: ${a(`module-bg-stack-${s}`)};
      ${H("text-sub")}: ${a(`module-sub-stack-${s}`)};
      ${H("divider")}: ${a(`module-div-stack-${s}`)};
      ${H("slider-track")}: ${a(`module-div-stack-${s}`)};
    }`,t=s=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${s}"] { background: ${a(`module-bg-adjacent-${s}`)}; }`,n=s=>s<4?`.nc-module[data-nc-shade="${s}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${s+1}`)}; }`:`.nc-module[data-nc-shade="${s}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${H("text-sub")}: ${a("module-sub-stack-1")};
      ${H("divider")}: ${a("module-div-stack-1")};
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
${qi} { transition: none; }
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
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
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
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${H("text-sub")}: ${a("module-sub-stack-1")};
  ${H("divider")}: ${a("module-div-stack-1")};
  ${H("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${H("text-sub")}: inherit;
  ${H("divider")}: inherit;
  ${H("slider-track")}: inherit;
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
${[1,2,3,4,5,6,7,8].map(s=>`.nc-strip[data-nc-shade="${s}"] { --nc-strip-shade: ${a(`strip-shade-${s}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${H("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${H("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${H("divider")}: ${a("strip-divider")}; }
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
${Aa("")}
}
@media (max-width: 1023px) {
${Aa("html[data-nc-landscape] ")}
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
`}var Qt=null,Ii="nc-ui-fallback";function As(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Qt&&Qt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ii} {
${Pi()}
}
`,e.head.append(t),Qt=t}var Bi=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,ji=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Bi,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let s=()=>{t.ncWait=null,n()};t.onload=s,t.onerror=s}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ji(document);function Ss(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let s=t.createElement("span");s.className="nc-ui-switch-text",s.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",s.append(o,i),n.append(s);let r=!1,l=c=>{r=c===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let d=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",d),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",d),n.remove()}}}var Ms=new WeakMap,Sa=.25;function Ri(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let s=t.createElement("span");s.className="nc-fader-track",s.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(s,o);let i=0,r=e.step??.005,l=e.onChange,d=e.onReset,c=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},h=u=>{let m=c(u);m!==i&&(i=m,p(),l?.(m))},g=0,f=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();u.target!==o&&m.height>0&&h(1-(u.clientY-m.top)/m.height),g=u.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!f)return;let m=n.getBoundingClientRect().height||1,w=(g-u.clientY)/m*(u.shiftKey?Sa:1);g=u.clientY,h(i+w)});let y=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",y),n.addEventListener("pointercancel",y),n.addEventListener("lostpointercapture",y),n.addEventListener("dblclick",u=>{u.preventDefault(),d?.()}),n.addEventListener("keydown",u=>{let m=u.shiftKey?r*Sa:r,w={ArrowUp:i+m,ArrowRight:i+m,ArrowDown:i-m,ArrowLeft:i-m,PageUp:i+r*10,PageDown:i-r*10,Home:0,End:1};u.key in w&&(u.preventDefault(),h(w[u.key]))});let x={el:n,get value(){return i},get dragging(){return f},set(u){f||(i=c(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(r=u.step),u.onChange&&(l=u.onChange),u.onReset&&(d=u.onReset)}};return x.setLabel(e.label),x.set(e.value??0),x.setText(e.valueText),Ms.set(n,x),x}function Oi(e){return Ms.get(e)}var Ts=new WeakMap,Hi=.2,_i=1.5,Vi=.5;function Gi(e,t){let n=String(e??"").trim(),s=Number.parseFloat(n);return Number.isFinite(s)?n.endsWith("ms")?s/1e3:s:t}function Ma(e,t,n){let s=e.ownerDocument?.defaultView??globalThis;return typeof s.getComputedStyle!="function"?n:Gi(s.getComputedStyle(e).getPropertyValue(H(t)),n)}function Ki(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,s=t.createElement("div");s.className="nc-meter",s.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let r=[];for(let x=0;x<n;x++){let u=t.createElement("span");u.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let w=t.createElement("span");w.className="nc-meter-rms";let b=t.createElement("span");b.className="nc-meter-hold",u.append(m,w,b),i.append(u),r.push({peak:m,rms:w,hold:b,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}s.append(o,i);let l=e.label,d=e.onClear,c=!1,p=-1,h=-1,g=()=>{o.dataset.lit=c?"true":"false",o.setAttribute("aria-pressed",c?"true":"false"),o.setAttribute("aria-label",c?`${l} clipped: clear`:`${l} clip light`),o.title=c?"Clipped. Click to clear":"Clip light"},f=(x,u,m,w)=>{let b=Math.round(w*1e3)/1e3;m[u]!==b&&(m[u]=b,x.style.transform=u==="hold"?`translateY(${Math.round((1-b)*1e3)/10}%)`:`scaleY(${b})`)};o.addEventListener("click",()=>{y.clear(),d?.()});let y={el:s,get clipped(){return c},update(x,u){p<0&&(p=Ma(s,"motion-meter-fall",Hi)),h<0&&(h=Ma(s,"motion-meter-hold",_i));let m=Math.max(0,Math.min(.25,Number(u)||0)),w=p>0?Math.exp(-m/p):0;r.forEach((b,k)=>{let L=x[k]??x[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(L.peak)||0)),v=Math.min(E,Math.max(0,Number(L.rms)||0));L.over&&y.clip(),b.level.peak=E>=b.level.peak?E:E+(b.level.peak-E)*w,b.level.rms=v>=b.level.rms?v:v+(b.level.rms-v)*w,b.holdAge+=m,E>=b.holdAt?(b.holdAt=E,b.holdAge=0):b.holdAge>h&&(b.holdAt=Math.max(E,b.holdAt-Vi*m)),f(b.peak,"peak",b.shown,b.level.peak),f(b.rms,"rms",b.shown,b.level.rms),f(b.hold,"hold",b.shown,b.holdAt),b.hold.dataset.off=b.holdAt<=.001?"true":"false"})},clip(){c||(c=!0,g())},clear(){c=!1,g()},reset(){for(let x of r)x.level.peak=0,x.level.rms=0,x.holdAt=0,x.holdAge=0,f(x.peak,"peak",x.shown,0),f(x.rms,"rms",x.shown,0),f(x.hold,"hold",x.shown,0),x.hold.dataset.off="true"},setLabel(x){l=x,g()},configure(x){x.onClear&&(d=x.onClear)}};return g(),y.reset(),Ts.set(s,y),y}function Wi(e){return e?Ts.get(e):void 0}var Yi=3,Ui=new Set(["freq","q","rate","time","log"]);function Un(e,t,n){return!e||!Ui.has(e)||!(n>t)?"linear":t>0?"log":"power"}function ft(e,t,n){return Un(e,t,n)!=="linear"}function zt(e,t,n,s){let o=Number(s);if(!(n>t)||!Number.isFinite(o))return 0;let i=Math.min(n,Math.max(t,o)),r=Un(e,t,n);if(r==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return r==="power"?Math.cbrt(l):l}function Ls(e,t,n,s){let o=Math.min(1,Math.max(0,Number(s)||0)),i=Un(e,t,n);return i==="log"?t*(n/t)**o:t+(n-t)*(i==="power"?o**Yi:o)}function Cs(e,t,n,s){let o=Math.min(n,Math.max(t,e));if(s>0){o=t+Math.round((o-t)/s)*s;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(s))+1));o=Number(o.toFixed(i)),o=Math.min(n,Math.max(t,o))}return o}function lt(e,t,n,s){return Math.round(zt(e,t,n,s)*1e3)}function Dt(e,t,n,s,o){return Cs(Ls(e,t,n,Number(s)/1e3),t,n,o)}function Xi(e,t,n=!1){let s=Number(e)||0,o=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=s+o:t==="ArrowLeft"||t==="ArrowDown"?i=s-o:t==="PageUp"?i=s+1e3/10:t==="PageDown"?i=s-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function Xn(e,t,n,s,o,i=!1,r){let l=lt(e,t,n,s),d=Xi(l,o,i);if(d===null)return null;let c=Dt(e,t,n,d,r),p=Math.sign(d-l),h=Cs(Number(s),t,n,r);for(;p!==0&&c===h&&d>0&&d<1e3;)d+=p,c=Dt(e,t,n,d,r);return c}function Ta(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Ji(e,t,n,s=n/6){let o=e.some(p=>p===null),i=Math.max(0,n-(o?s:0)),r=e.reduce((p,h,g)=>h===null?p:p+Ta(t[g]),0),l=r>0?i/r:0,d=e.map(p=>p===null?0:Math.min(i,Ta(p)*l));if(o){let p=d.reduce((g,f)=>g+f,0),h=e.indexOf(null);d[h]=Math.max(s,n-p)}let c=[0];for(let p of d)c.push(Math.round((c[c.length-1]+p)*100)/100);return o&&(c[c.length-1]=n),c}function Qi(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),s=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*s)),i=Math.max(1,Math.floor(n*s));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(s,0,0,s,0,0),{ctx:r,w:t,h:n}}function fe(e){return Math.max(0,Math.min(1,e))}function Fs(e,t){let{ctx:n,w:s,h:o}=Qi(e);if(!n)return;n.clearRect(0,0,s,o);let i=Di(e);if(t.paint==="swatch"){let d=V(e,"accent"),c=V(e,"rhythm.step-cell-on");e.dataset.ncAccent=d,e.dataset.ncStep=c,n.fillStyle=d,n.fillRect(0,0,s/2,o),n.fillStyle=c,n.fillRect(s/2,0,s/2,o);return}if(t.paint==="filter"&&typeof t.hz=="number"){tr(n,s,o,t,e,i);return}if(t.paint==="filter"){let d=t.mode??"lp",c=V(e,Es(d)),p=V(e,"divider"),h=fe(t.cutoff??.5),g=.08+(1-fe(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(s,o*.72),n.stroke(),n.beginPath();for(let f=0;f<=s;f++){let y=f/Math.max(1,s),x=0;d==="lp"?x=y<h?1:Math.max(0,1-(y-h)/g):d==="hp"?x=y>h?1:Math.max(0,1-(h-y)/g):x=Math.max(0,1-Math.abs(y-h)/g);let u=o*.78-x*o*.62;f===0?n.moveTo(f,u):n.lineTo(f,u)}n.strokeStyle=c,n.stroke(),n.fillStyle=V(e,"text-sub"),n.font=i,n.fillText(d.toUpperCase(),0,o),e.dataset.ncAccent=c;return}if(t.paint==="envelope"){n.strokeStyle=V(e,"accent");let d=Math.max(0,t.attack??0),c=Math.max(0,t.decay??.4),[p,h,g]=Ji([d,c],t.max??[1,4],s),f=2,y=o-1;n.beginPath(),n.moveTo(p,y),n.lineTo(h,f);let x=Math.max(1,Math.ceil(g-h));for(let u=1;u<=x;u++){let m=u/x;n.lineTo(h+(g-h)*m,y-(y-f)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(g,y),n.lineTo(s,y),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let d=Array.isArray(t.peaks)?t.peaks:[],[c,p]=Array.isArray(t.region)?t.region:[0,1],h=V(e,"accent"),g=V(e,"text-sub"),f=o/2;n.fillStyle=V(e,"accent-soft"),n.fillRect(fe(c)*s,0,(fe(p)-fe(c))*s,o),n.strokeStyle=V(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(s,f),n.stroke();let y=Math.floor(d.length/2);for(let x=0;x<y;x++){let u=(x+.5)/y*s,m=Math.max(-1,Math.min(1,d[x*2]??0)),w=Math.max(-1,Math.min(1,d[x*2+1]??0)),b=(x+.5)/y;n.strokeStyle=b>=c&&b<=p?h:g,n.beginPath(),n.moveTo(u,f-w*(f-1)),n.lineTo(u,f-m*(f-1)+.5),n.stroke()}n.strokeStyle=h;for(let x of[c,p,...Array.isArray(t.markers)?t.markers:[]]){let u=Math.round(fe(x)*(s-1))+.5;n.beginPath(),n.moveTo(u,0),n.lineTo(u,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=V(e,"text"),n.fillRect(Math.round(fe(t.position)*(s-1)),0,1,o)),y||(n.fillStyle=g,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let d=fe(t.level??0);n.fillStyle=V(e,"divider"),n.fillRect(0,o*.4,s,o*.2),n.fillStyle=V(e,"accent"),n.fillRect(0,o*.4,s*d,o*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=V(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,s,o*.1),n.fillStyle=V(e,"rhythm.playhead"),n.fillRect(l/r*s,o*.3,Math.max(1,s/r),o*.4),e.dataset.ncAccent=V(e,"accent")}var st=20,yn=2e4,Zt=24,La=-60;function Zi(e,t,n,s,o=48e3){let i=2*Math.PI*Math.min(t,o*.49)/o,r=Math.cos(i),l=Math.sin(i)/(2*n),d,c,p;e==="hp"?[d,c,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[d,c,p]=[l,0,-l]:[d,c,p]=[(1-r)/2,1-r,(1-r)/2];let h=1+l,g=-2*r,f=1-l,y=2*Math.PI*s/o,x=(b,k,L)=>b+k*Math.cos(y)+L*Math.cos(2*y),u=(b,k)=>-(b*Math.sin(y)+k*Math.sin(2*y)),m=Math.hypot(x(d,c,p),u(c,p)),w=Math.hypot(x(h,g,f),u(g,f));return w>0?m/w:0}function er(e,t){return Math.log(Math.max(st,Math.min(yn,e))/st)/Math.log(yn/st)*t}function Ca(e,t,n){let s=Math.max(La,Math.min(Zt,e));return t+(Zt-s)/(Zt-La)*(n-t)}function tr(e,t,n,s,o,i){let r=s.mode??"lp",l=V(o,Es(r)),d=V(o,"divider"),c=V(o,"text-sub"),p=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,g=Math.max(h+4,n-p-3),f=s.q??Math.SQRT1_2,y=Math.round(Ca(0,h,g))+.5;e.strokeStyle=d,e.lineWidth=1,e.beginPath(),e.moveTo(0,y),e.lineTo(t,y),e.stroke(),e.beginPath();for(let x=0;x<=t;x++){let u=st*(yn/st)**(x/Math.max(1,t)),m=s.open?1:Zi(r,s.hz,f,u,s.sampleRate),w=Ca(20*Math.log10(Math.max(1e-5,m)),h,g);x===0?e.moveTo(x,w):e.lineTo(x,w)}if(e.strokeStyle=l,e.stroke(),!s.open){let x=Math.round(er(s.hz,t))+.5;e.strokeStyle=c,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(x,h),e.lineTo(x,g),e.stroke(),e.setLineDash?.([])}e.fillStyle=c,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(s.hz))}function ie(e,t){let n=e.ownerDocument,s=n.createElement("span");s.style.position="absolute",s.style.color=`var(--nc-ui-${t})`,e.append(s);let o=n.defaultView.getComputedStyle(s).color;return s.remove(),o}function nr(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let s=t.defaultView.getComputedStyle(n).font;return n.remove(),s}var De=20,gt=2e4,Jn=Math.log(gt/De),xn=32,ar=250,sr=-100,or=1200,ir=4.5,Fa=-6,Me=-96,rr=48,Na=[100,1e3,1e4],lr=[6,12];function Oe(e,t){return Math.log(Math.max(De,Math.min(gt,e))/De)/Jn*t}function St(e,t){return De*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Jn)}function ve(e,t,n,s){let o=t/2-s;return t/2-Math.max(-n,Math.min(n,e))/n*o}function vn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Ns=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function cr(e,t,n,s){let o=n?3:1,i=d=>({db:Math.max(-s,Math.min(s,e.db+d*o))}),r=d=>({hz:Math.max(e.minHz??De,Math.min(e.maxHz??gt,e.hz*2**(d*o/6)))}),l=d=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(d*o)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?r(1):i(1);case"ArrowLeft":return e.moveHz?r(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Qn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function dr(e,t,n,s,o,i,r,l,d){let c=d?.25:1,p={},h=Math.max(1,i/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-s*c/h*r/Qn(e))),e.moveHz){let g=t.hz*Math.exp(n*c/Math.max(1,o)*Jn);p.hz=Math.max(e.minHz??De,Math.min(e.maxHz??gt,g))}return p}function pr(e,t,n,s,o){let i=Math.max(0,n.left)+1,r=Math.min(n.right,o)-1,l=Math.min(t.width*3+s*2,r-i),d=Math.max(i,Math.min(e.left,r-l));return{left:Math.round(d-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var K=new WeakMap;function ur(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let s=document.createElement("div");s.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,s.append(o,i);for(let d of e.bands)s.append(hr(n,d,t));s.append(r),s.addEventListener("click",d=>{if(!Bs(n)||d.button>0)return;let c=Is(n)?.querySelector("[data-nc-max-toggle]");c instanceof HTMLElement&&c.click()}),n.append(s);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),K.set(n,{control:e,cache:null,spec:null,active:null}),Ds(n,e),n}function zs(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function hr(e,t,n){let s=document.createElement("div");s.className="nc-eq-node",s.tabIndex=0,s.dataset.band=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-orientation","vertical");let o=()=>{let c=n(e);return c?.type==="eqGraph"?c:null},i=()=>o()?.bands.find(c=>c.id===t.id)??null,r=null;s.addEventListener("pointerdown",c=>{if(c.button!==0)return;let p=i();p&&(c.preventDefault(),s.focus({preventScroll:!0}),s.setPointerCapture?.(c.pointerId),r={id:c.pointerId,x:c.clientX,y:c.clientY,start:{hz:p.hz,db:p.db}},s.dataset.drag="true",ge(e,t.id))}),s.addEventListener("pointermove",c=>{if(!r||c.pointerId!==r.id)return;let p=o(),h=i(),g=K.get(e);if(!p||!h||!g?.box)return;let{w:f,h:y,pad:x}=g.box;p.onBand(h.id,dr(h,r.start,c.clientX-r.x,c.clientY-r.y,f,y,p.range??18,x,c.shiftKey))});let l=c=>{!r||c.pointerId!==r.id||(r=null,delete s.dataset.drag,e.ownerDocument.activeElement!==s&&!s.matches(":hover")&&ge(e,null))};s.addEventListener("pointerup",l),s.addEventListener("pointercancel",l),s.addEventListener("dblclick",c=>{c.preventDefault(),o()?.onReset?.(t.id)}),s.addEventListener("keydown",c=>{let p=o(),h=i();if(!p||!h)return;let g=cr(h,c.key,c.shiftKey,p.range??18);g&&(c.preventDefault(),g==="reset"?p.onReset?.(h.id):p.onBand(h.id,g),ge(e,h.id))});let d=null;return s.addEventListener("wheel",c=>{let p=o(),h=i();if(!p||!h?.moveQ)return;c.preventDefault();let g=c.timeStamp;(!d||g-d.t>400)&&(d={q:h.q,t:g});let f=c.deltaMode===1?c.deltaY*16:c.deltaMode===2?c.deltaY*400:c.deltaY;d.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,d.q*2**(-f/240))),d.t=g,p.onBand(h.id,{q:d.q}),ge(e,h.id)},{passive:!1}),s.addEventListener("pointerenter",()=>ge(e,t.id)),s.addEventListener("focus",()=>ge(e,t.id)),s.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==s&&ge(e,null)}),s.addEventListener("blur",()=>{r||ge(e,null)}),s}function ge(e,t){let n=K.get(e);if(!n)return;let s=n.active!==t;n.active=t,s?_e(e):Zn(e)}function Zn(e){let t=K.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let s=t.active?t.control.bands.find(y=>y.id===t.active):null;for(let y of e.querySelectorAll(".nc-eq-node"))y instanceof HTMLElement&&(s&&y.dataset.band===s.id?y.dataset.active="true":delete y.dataset.active);if(!s||!t.box){n.hidden=!0;return}let o=[s.label,Ns(s.db)];s.kind==="peak"?o.push(vn(s.hz),`Q ${s.q.toFixed(1)}`):o.push(`${s.kind==="lowshelf"?"below":"above"} ${vn(s.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(mr(t.control,s)),n.hidden=!1;let{w:i,h:r,pad:l}=t.box,d=Oe(s.hz,i),c=ve(s.db*Qn(s),r,t.control.range??18,l),p=n.offsetWidth,h=n.offsetHeight,g=Math.max(0,Math.min(i-p,d-p/2)),f=c-h-l*1.5>=0?c-h-l*1.5:Math.min(r-h,c+l*1.5);n.style.left=`${Math.round(g)}px`,n.style.top=`${Math.round(f)}px`}function mr(e,t){return e.bands.indexOf(t)%3+1}function Ds(e,t){let n=K.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ea(e);let s=t.range??18;t.bands.forEach((o,i)=>{let r=zs(e,o.id);r instanceof HTMLElement&&(r.dataset.tone=String(i%3+1),r.dataset.kind=o.kind,r.setAttribute("aria-label",`${o.label} band`),r.setAttribute("aria-valuemin",String(-s)),r.setAttribute("aria-valuemax",String(s)),r.setAttribute("aria-valuenow",String(o.db)),r.setAttribute("aria-valuetext",o.valueText??`${Ns(o.db)}, ${vn(o.hz)}`),r.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?r.setAttribute("data-nc-help",o.help):r.removeAttribute("data-nc-help"))}),_e(e),xr(e)}function qs(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),s=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*s)),i=Math.max(1,Math.round(n*s));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(s,0,0,s,0,0),{ctx:r,w:t,h:n}}function Ps(e){return{curve:ie(e,"eq-curve"),fill:ie(e,"eq-fill"),quiet:ie(e,"text-sub"),grid:ie(e,"eq-grid"),zero:ie(e,"divider"),label:ie(e,"text-sub"),spectrum:ie(e,"eq-spectrum"),bands:[ie(e,"eq-band-1"),ie(e,"eq-band-2"),ie(e,"eq-band-3")]}}function fr(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function _e(e){K.has(e)&&ea(e);let t=K.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let s=t.control,{ctx:o,w:i,h:r}=qs(n);if(!o)return;let l=Math.max(8,Math.round(r*.06)),d=s.range??18;t.box={w:i,h:r,pad:l},t.colours=Ps(e);let c=t.colours,p=fr(s,i);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(i)+1),L=new Float64Array(k);for(let v=0;v<k;v++)L[v]=St(v/(k-1)*i,i);let E=null;try{E=typeof s.response=="function"?s.response(L):null}catch{E=null}t.cache={key:p,freqs:L,total:E?.total??new Float64Array(k),bands:E?.bands??[]}}o.clearRect(0,0,i,r);let h=nr(e),g=s.on!==!1;gr(o,i,r,d,l,c,h);let{freqs:f,total:y,bands:x}=t.cache,u=Array.from(f,k=>Oe(k,i)),m=ve(0,r,d,l);x.forEach((k,L)=>{if(!k||!k.some(M=>Math.abs(M)>.05))return;let E=g?c.bands[L%3]:c.quiet,v=Array.from(k,M=>ve(M,r,d,l));o.save(),t.active&&s.bands[L]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=E,za(o,u,v,m)),o.globalAlpha=g?.75:.4,o.strokeStyle=E,o.lineWidth=.75,en(o,u,v),o.restore()});let w=Array.from(y,k=>ve(k,r,d,l)),b=g?c.curve:c.quiet;o.save(),o.fillStyle=g?c.fill:c.quiet,o.globalAlpha=g?.2:.08,za(o,u,w,m),o.restore(),o.save(),o.strokeStyle=g?c.fill:b,o.lineJoin="round",o.lineCap="round",g&&(o.globalAlpha=.16,o.lineWidth=4,en(o,u,w)),o.globalAlpha=1,o.strokeStyle=b,o.lineWidth=1.25,en(o,u,w),o.restore(),br(e),Zn(e)}function gr(e,t,n,s,o,i,r){e.save(),e.lineWidth=1;for(let d=10;d<=1e4;d*=10)for(let c=1;c<=9;c++){let p=d*c;if(p<De||p>gt)continue;let h=Math.round(Oe(p,t))+.5;e.globalAlpha=Na.includes(p)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let d of lr)if(!(d>s))for(let c of[1,-1]){let p=Math.round(ve(d*c,n,s,o))+.5;e.globalAlpha=d===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(ve(0,n,s,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let d of Na){let c=d>=1e3?`${d/1e3}k`:String(d),p=e.measureText(c).width,h=Oe(d,t)+3;e.fillText(c,h+p+2>t?Oe(d,t)-p-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let d of[12,0,-12]){if(Math.abs(d)>s)continue;let c=ve(d,n,s,o);e.fillText(d>0?`+${d}`:d<0?`−${-d}`:"0",t-3,Math.round(c)-1)}e.restore()}function qt(e,t,n){e.moveTo(t[0],n[0]);for(let s=1;s<t.length-1;s++){let o=(t[s]+t[s+1])/2,i=(n[s]+n[s+1])/2;e.quadraticCurveTo(t[s],n[s],o,i)}e.lineTo(t[t.length-1],n[n.length-1])}function en(e,t,n){e.beginPath(),qt(e,t,n),e.stroke()}function za(e,t,n,s){e.beginPath(),qt(e,t,n),e.lineTo(t[t.length-1],s),e.lineTo(t[0],s),e.closePath(),e.fill()}function Is(e){return e.closest("[data-nc-maxable]")}function Bs(e){let t=Is(e);return!!t&&!t.hasAttribute("data-nc-max")}function ea(e){let t=Bs(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=K.get(e);n?.active&&(n.active=null,Zn(e))}return t}function br(e){ea(e);let t=K.get(e);if(!t?.box)return;let{w:n,h:s,pad:o}=t.box,i=t.control.range??18;for(let r of t.control.bands){let l=zs(e,r.id);l instanceof HTMLElement&&(l.style.left=`${Oe(r.hz,n).toFixed(1)}px`,l.style.top=`${ve(r.db*Qn(r),s,i,o).toFixed(1)}px`)}}function wr(e,t,n,s){let o=s/2/n,i=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let d=0;d<e;d++){let c=(d-.5)/(e-1)*t,p=(d+.5)/(e-1)*t,h=St(c,t),g=St(p,t),f=St(d/(e-1)*t,t);i[d]=Math.min(n-1,h/o),r[d]=Math.min(n-1,g/o),l[d]=ir*Math.log2(f/1e3)}return{lo:i,hi:r,tilt:l}}function yr(e,t,n){let s=Math.floor(t),o=Math.ceil(n);if(o-s<=1){let r=t-s,l=e[s]??-1/0,d=e[Math.min(e.length-1,s+1)]??l;return l+(d-l)*r}let i=-1/0;for(let r=s;r<=o&&r<e.length;r++)e[r]>i&&(i=e[r]);return i}function xr(e){let t=K.get(e);if(t){if(!t.control.spectrum){Rs(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(s=>{let o=K.get(e)?.spec;o&&(o.visible=s.some(i=>i.isIntersecting),$n(e))}),t.spec.io.observe(e)):t.spec.visible=!0}$n(e)}}function $n(e){let t=K.get(e),n=t?.spec;if(!n)return;let s=e.ownerDocument;if(!(e.isConnected&&n.visible&&s.visibilityState!=="hidden"&&t.control.spectrum)){js(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=kn(e),n.onVis||(n.onVis=()=>$n(e),s.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&En(e,!1)}function kn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function En(e,t){let n=K.get(e)?.spec,s=e.ownerDocument.defaultView;!n||!s||(t?n.timer=s.setTimeout(()=>(n.timer=0,tn(e,kn(e))),ar):typeof s.requestAnimationFrame=="function"?n.raf=s.requestAnimationFrame(o=>(n.raf=0,tn(e,o))):n.timer=s.setTimeout(()=>(n.timer=0,tn(e,kn(e))),xn))}function js(e){let t=K.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let s=e.querySelector(".nc-eq-spectrum");s instanceof HTMLCanvasElement&&s.getContext("2d")?.clearRect(0,0,s.width,s.height)}function Rs(e){let t=K.get(e)?.spec;if(!t)return;js(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=K.get(e);n&&(n.spec=null)}function tn(e,t){let n=K.get(e),s=n?.spec;if(!n||!s)return;if(!e.isConnected){Rs(e);return}if(!s.analyser)return;if(t-s.last<xn-4&&!s.idle){En(e,!1);return}let o=s.last?Math.min(.25,(t-s.last)/1e3):xn/1e3;s.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:d}=qs(i);if(!r)return;let c=Math.max(16,Math.round(l/2)),p=s.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!s.map||s.map.cols!==c||s.map.w!==l||s.map.sr!==p)&&(s.map={cols:c,w:l,sr:p,...wr(c,l,s.buf.length,p)},s.disp=new Float32Array(c).fill(-1/0)),s.analyser.getFloatFrequencyData(s.buf);let h=-1/0,g=rr*o,{lo:f,hi:y,tilt:x}=s.map;for(let m=0;m<c;m++){let w=yr(s.buf,f[m],y[m]);w>h&&(h=w);let b=w+x[m],k=s.disp[m]-g;s.disp[m]=b>k?b:k}h>sr&&(s.loud=t);let u=t-s.loud>or;r.clearRect(0,0,l,d),(!u||s.disp.some(m=>m>Me))&&vr(r,l,d,s.disp,n.colours??Ps(e)),s.idle=u&&!s.disp.some(m=>m>Me),En(e,s.idle)}function vr(e,t,n,s,o){let i=s.length,r=new Array(i),l=new Array(i),d=c=>{let p=s[Math.max(0,Math.min(i-1,c))];return Number.isFinite(p)?p:Me};for(let c=0;c<i;c++){let p=d(c)*.36+(d(c-1)+d(c+1))*.22+(d(c-2)+d(c+2))*.1,h=(Math.max(Me,Math.min(Fa,Number.isFinite(p)?p:Me))-Me)/(Fa-Me);r[c]=c/(i-1)*t,l[c]=n-h*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),qt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),qt(e,r,l),e.stroke(),e.restore()}var te=new WeakMap,$r=450,kr=6,Er=33,nn=24,Ar="http://www.w3.org/2000/svg";function Sr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Mr(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Tr(e,t,n,s,o){let i=e.slice();if(t===s)return i[s]=o,i;let r=t<s?1:-1;for(let l=t;l!==s+r;l+=r){let d=(l-t)/(s-t);i[l]=Math.round((n+(o-n)*d)*100)/100}return i}function Lr(e,t){let n=e.steps[t],s=(e.shapes??[]).find(i=>i.value===n.shape),o=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${s?`, ${s.label}`:""}${o}`}function Te(e,t){let n=document.createElementNS(Ar,e);for(let[s,o]of Object.entries(t))n.setAttribute(s,String(o));return n}function Os(e){let t=Te("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Te("path",{d:e})),t}function Cr(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let s=document.createElement("div");s.className="nc-lsteps-plot",s.tabIndex=0,s.setAttribute("role","slider"),s.setAttribute("aria-orientation","vertical"),s.setAttribute("aria-valuemin","0"),s.setAttribute("aria-valuemax","100"),s.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let o=document.createElement("div");o.className="nc-lsteps-axis",o.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(s,o,i,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let d={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return te.set(n,d),Nr(n,s),zr(n,r),Hs(n,e),n}function ae(e){let t=te.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Fr(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function an(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),s=Fr(e);return{i:Mr(t.clientX,s),level:Sr(t.clientY-n.top,n.height)}}function Nr(e,t){let n=te.get(e),s=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let r=ae(e);if(!r||i.button>0||!r.steps.length)return;i.preventDefault(),Pt(e),t.setPointerCapture?.(i.pointerId);let l=an(t,i),d=r.steps.map(c=>c.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:d,levels:d,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Da(e,l.i,l.level,l.i,l.level,!1),s(),n.timer=setTimeout(()=>{n.timer=0;let c=n.drag;!c||c.moved||(c.long=!0,ae(e)?.onLevels(c.start.slice(),!0),sn(e,c.i))},$r)}),t.addEventListener("pointermove",i=>{let r=n.drag;if(!r||r.id!==i.pointerId||r.long||!r.moved&&Math.hypot(i.clientX-r.x,i.clientY-r.y)<kr)return;r.moved=!0,s();let l=an(t,i);Da(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let o=i=>{let r=n.drag;!r||r.id!==i.pointerId||(s(),n.drag=null,t.releasePointerCapture?.(i.pointerId),r.long||ae(e)?.onLevels(r.levels.slice(),!0),An(e,-1))};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",i=>{let r=n.drag;!r||r.id!==i.pointerId||(s(),n.drag=null,r.long||ae(e)?.onLevels(r.start.slice(),!0),An(e,-1))}),t.addEventListener("contextmenu",i=>{ae(e)?.onShape&&(i.preventDefault(),sn(e,an(t,i).i))}),t.addEventListener("keydown",i=>{let r=ae(e);if(!r||!r.steps.length)return;let l=r.steps.length,d=Math.min(n.focus,l-1),c=r.steps[d].level,p=h=>{let g=r.steps.map(f=>f.level);g[d]=Math.round(Math.max(0,Math.min(1,h))*100)/100,r.onLevels(g,!0)};switch(i.key){case"ArrowLeft":n.focus=(d-1+l)%l;break;case"ArrowRight":n.focus=(d+1)%l;break;case"ArrowUp":p(c+(i.shiftKey?.01:.05));break;case"ArrowDown":p(c-(i.shiftKey?.01:.05));break;case"PageUp":p(c+.25);break;case"PageDown":p(c-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;sn(e,d);break;default:return}i.preventDefault(),Sn(e)}),t.addEventListener("focus",()=>Sn(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function Da(e,t,n,s,o,i){let r=te.get(e).drag;r&&(r.levels=Tr(r.levels,t,n,s,o),An(e,s,r.levels[s]),ae(e)?.onLevels(r.levels.slice(),i))}function An(e,t,n){for(let s of e.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===t?(s.dataset.dragging="true",s.dataset.level=`${Math.round(n*100)}%`):s.removeAttribute("data-dragging")}function Sn(e){let t=te.get(e),n=e.querySelector(".nc-lsteps-plot"),s=ae(e);if(!n||!s)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let o=Math.min(t.focus,s.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((s.steps[o]?.level??0)*100))),n.setAttribute("aria-valuetext",Lr(s,o))}function zr(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Pt(e,!0);return}let s=[...t.querySelectorAll("button")],o=s.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),s[(o+1)%s.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),s[(o-1+s.length)%s.length]?.focus())}),te.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Pt(e)}}function sn(e,t){let n=ae(e),s=e.querySelector(".nc-lsteps-pick"),o=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!s||!o)return;let i=te.get(e);i.focus=t,s.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,s.append(r);for(let f of n.shapes??[]){let y=document.createElement("button");y.type="button",y.setAttribute("role","menuitemradio"),y.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&y.append(Os(f.icon)),y.append(document.createTextNode(f.label)),y.addEventListener("click",()=>{ae(e)?.onShape?.(t,f.value),Pt(e,!0)}),s.append(y)}s.setAttribute("aria-label",`Shape of step ${t+1}`),s.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=o.querySelector(`.nc-lsteps-step[data-i="${t}"]`),d=e.getBoundingClientRect(),c=l?.getBoundingClientRect(),p=s.getBoundingClientRect().width,h=c?c.left+c.width/2-d.left:0,g=Math.max(0,Math.min(d.width-p,h-p/2));s.style.setProperty("--nc-lsteps-pick-x",`${Math.round(g)}px`),s.querySelector('[aria-checked="true"]')?.focus?.()??s.querySelector("button")?.focus?.()}function Pt(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",te.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function Dr(e,t){let n=te.get(e),s=e.querySelector(".nc-lsteps-plot"),o=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,s.textContent="",o.textContent="";for(let i=0;i<t;i++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(i),i%4===0&&i>0&&(r.dataset.beat="true");let l=Te("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Te("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Te("path",{class:"nc-lsteps-env",d:""}),Te("path",{class:"nc-lsteps-top",d:""}),Te("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),s.append(r);let d=document.createElement("span");i%4===0&&(d.textContent=String(i+1)),i%4===0&&i>0&&(d.dataset.beat="true"),o.append(d)}}}function Hs(e,t){let n=te.get(e);if(!n)return;n.control=t;let s=t.steps.length;Dr(e,s),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let o=e.querySelector(".nc-lsteps-plot");o.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),r=o.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,y)=>{let x=r[y];if(!x)return;let u=String((y%2?1-i:i)*2);x.style.setProperty("--nc-lsteps-grow",u),l[y]?.style.setProperty("--nc-lsteps-grow",u),t.played!==void 0&&y>=t.played?x.dataset.out="true":x.removeAttribute("data-out"),x.dataset.zero=f.level<=0?"true":"false";let m=Math.max(0,Math.min(1,f.level)),w=x.querySelector(".nc-lsteps-level");w.setAttribute("y",String(100-m*100)),w.setAttribute("height",String(m*100));let b=t.curve?t.curve(y,nn):null,k="M0 100",L="";for(let E=0;E<=nn;E++){let v=b?Math.max(0,Math.min(1,b[E]??m)):m,M=E/nn*100,$=100-v*100;k+=` L${M.toFixed(2)} ${$.toFixed(2)}`,L+=`${E?" L":"M"}${M.toFixed(2)} ${$.toFixed(2)}`}x.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),x.querySelector(".nc-lsteps-top").setAttribute("d",L)});let d=e.querySelector(".nc-lsteps-shapes"),c=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(c!==n.shapeKey){n.shapeKey=c,d.textContent="";for(let f of t.shapes??[]){let y=document.createElement("button");y.type="button",y.className="nc-lsteps-shape",y.setAttribute("role","tab"),y.dataset.shape=String(f.value),f.icon&&y.append(Os(f.icon)),y.append(document.createTextNode(f.label)),y.addEventListener("click",()=>ae(e)?.onShapeAll?.(f.value)),d.append(y)}}d.hidden=!(t.shapes?.length&&t.onShapeAll),d.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??s,h=t.steps[0]?.shape,g=t.steps.slice(0,p).every(f=>f.shape===h);for(let f of d.querySelectorAll(".nc-lsteps-shape")){let y=g&&f.dataset.shape===String(h);f.setAttribute("aria-selected",y?"true":"false"),f.tabIndex=y||!g&&f===d.firstElementChild?0:-1}n.focus>=s&&(n.focus=0),Sn(e),n.last=-2,qr(e)}function qr(e){let t=te.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&on(e,null);return}let s=0,o=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){on(e,null);return}i-s>=Er&&(s=i,on(e,t.control.playhead())),t.loop=n.requestAnimationFrame(o)};t.loop=n.requestAnimationFrame(o)}function on(e,t){let n=te.get(e),s=t&&Number.isInteger(t.step)?t.step:-1,o=!!t?.locked;if(!(n.last===s&&n.lastLocked===o)){n.last=s,n.lastLocked=o;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===s?(i.dataset.playhead="true",i.dataset.locked=o?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!o?"true":"false"}}var Pr=.8912509381337456,Mn=32,Ir=250,Br=1200,jr=.2,_s=1.5;function Rr(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Or(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let s=e.createElement("span");s.className="nc-fx-level-bar",s.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",s.append(o),t.append(s)}return t}var It=new WeakMap,qa=new WeakMap;function Pa(e,t,n){let s=e.ownerDocument?.defaultView;if(typeof s?.getComputedStyle!="function")return n;let o=String(s.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(o);return Number.isFinite(i)?o.endsWith("ms")?i/1e3:i:n}function Hr(e){let t=qa.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let s=n?.IntersectionObserver;return s&&(t.io=new s(o=>{for(let i of o){let r=It.get(i.target);r&&(r.seen.set(i.target,i.isIntersecting),ot(r))}Re(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)ot(o);Re(t)}),qa.set(e,t),t}var Vs=e=>e.els.some(t=>t.isConnected);function _r(e){if(!e.loop.io)return Vs(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ot(e){let t=!e.dead&&!!e.source&&_r(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ta(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Cn(e))}function ta(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Re(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Gs(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ta(e)),!e.raf&&!e.timer&&Tn(e,!1)}function Tn(e,t){let n=e.doc.defaultView;if(!n)return;let s=()=>Ia(e,ta(e));t?e.timer=n.setTimeout(()=>(e.timer=0,s()),Ir):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,Ia(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,s()),Mn)}function Gs(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ia(e,t){if(t-e.last<Mn-4&&!e.idle&&e.last){Tn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Mn/1e3;e.last=t,e.frames++;let s=!1,o=!1;for(let i of e.recs){if(!Vs(i)){(i.placed||e.frames-i.born>90)&&Ks(i);continue}i.placed=!0,i.open&&(o=!0,Vr(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(s=!0))}if(!o){Gs(e);return}e.idle=t-e.loud>Br&&!s,Tn(e,e.idle)}function Vr(e,t,n){if(e.fall<0){let g=e.els[0];e.fall=Pa(g,"motion-meter-fall",jr),e.hold=Pa(g,"motion-meter-hold",_s)}let s=null;try{s=e.source.read()}catch{s=null}let o=typeof s=="number",i=o?s:Number(s?.in)||0,r=!o&&s!==null&&typeof s=="object"&&typeof s.out=="number",l=r&&Number(s.out)||0,d=r?"2":"1";if(e.rows!==d){e.rows=d;for(let g of e.els)g.dataset.ncRows=d}let c=e.fall>0?Math.exp(-t/e.fall):0,p=[i,l],h=!1;for(let g=0;g<2;g++){let f=Rr(p[g]);f>0&&(h=!0),e.disp[g]=f>=e.disp[g]?f:f+(e.disp[g]-f)*c,e.disp[g]<.001&&(e.disp[g]=0),p[g]>=Pr&&(e.clipAt[g]=n);let y=e.clipAt[g]>0&&n-e.clipAt[g]<e.hold*1e3;Ln(e,g,e.disp[g],y)}return h}function Ln(e,t,n,s){let o=Math.round(n*1e3)/1e3,i=s?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===i)){e.shown[t]=o,e.clipShown[t]=i;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=i)}}}function Cn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Ln(e,0,0,!1),Ln(e,1,0,!1)}function Ks(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),It.get(t)===e&&It.delete(t)}function Gr(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),s=n[0]?.ownerDocument??globalThis.document,o=Hr(s),i={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:_s,rows:""};for(let r of n)It.set(r,i),o.io?.observe(r);if(o.recs.add(i),Cn(i),!o.io){let r=s.defaultView,l=()=>{ot(i),Re(o)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!i.dead){if(l===i.source){ot(i),Re(o);return}i.open&&(i.open=!1,i.source?.close?.(),Cn(i)),i.source=l,ot(i),Re(o)}},destroy(){i.dead||Ks(i),Re(o)}}}var Ws={slop:8,longPressMs:500,pitchPx:16},Kr=class{constructor(e,t,n=Ws){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,s){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,s){if(e!==this.pointer)return;let o=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(o,i)<this.config.slop)return;Math.abs(i)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-i/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Wr(e,t,n,s=Ws){let o=!1,i=0,r=(c,p)=>{let h=e.ownerDocument.elementFromPoint?.(c,p),g=[...e.querySelectorAll(t)],f=h?g.findIndex(u=>u===h||u.contains(h)):-1;if(f>=0)return f;let y=-1,x=Number.POSITIVE_INFINITY;return g.forEach((u,m)=>{if(u.hidden)return;let w=u.getBoundingClientRect();if(p<w.top||p>w.bottom)return;let b=Math.abs(c-(w.left+w.width/2));b<x&&b<=w.width&&(y=m,x=b)}),y},l=new Kr(r,c=>{(c.kind==="paint"||c.kind==="long")&&(o=!0),n(c)},s),d=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",c=>{c.button>0||(o=!1,l.down(c.pointerId,c.clientX,c.clientY,c.timeStamp)&&(d(),i=setTimeout(()=>l.tick(performance.now()),s.longPressMs)))}),e.addEventListener("pointermove",c=>{l.state!=="idle"&&(l.move(c.pointerId,c.clientX,c.clientY,c.timeStamp),l.state!=="pending"&&d())}),e.addEventListener("pointerup",c=>{d(),l.up(c.pointerId,c.clientX,c.clientY,c.timeStamp)}),e.addEventListener("pointercancel",c=>{d(),l.cancel(c.pointerId)}),e.addEventListener("click",c=>{o&&(o=!1,c.stopPropagation(),c.preventDefault())},!0),e.addEventListener("contextmenu",c=>c.preventDefault()),l}var Ys="netcomposer.groups.v1";function na(){try{return globalThis.localStorage??null}catch{return null}}function Us(e=na(),t=Ys){try{let n=JSON.parse(e?.getItem(t)??"{}"),s=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,i]of Object.entries(n))typeof i=="boolean"&&s.set(o,i);return s}catch{return new Map}}function Yr(e,t,n,s=Ys){let o=Us(e,s);o.set(t,n);try{e?.setItem(s,JSON.stringify(Object.fromEntries(o)))}catch{}}function Ur(e,t=na()){return Us(t).get(e.id)??e.open===!0}function Xr(e,t,n){let s=document.createElement("div");s.className="nc-group",s.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(i,r,l);let d=document.createElement("div");d.className="nc-group-body",d.id=`${e.id}-group-body`,d.setAttribute("role","group"),d.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",d.id);for(let c of e.controls)d.append(n(c,t));return o.addEventListener("click",()=>{let c=s.dataset.ncOpen!=="true";Yr(na(),e.id,c),Fn(s,c);let p=t(s);p?.type==="group"&&p.onToggle?.(c)}),s.append(o,d),Xs(s,e),Fn(s,Ur(e)),Js(s,e),s}function Fn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),s=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),s instanceof HTMLElement&&(s.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Xs(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Js(e,t){Xs(e,t)&&Fn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let s=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";s&&s.textContent!==o&&(s.textContent=o)}var bt="application/x-nc-pad",Ba="http://www.w3.org/2000/svg";function Jr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),s=[],o=[];for(let i=0;i<n;i++){let r=Math.floor(i*t/n),l=Math.max(r+1,Math.floor((i+1)*t/n)),d=0,c=0;for(let h=r;h<l;h++)d=Math.min(d,e[2*h]??0),c=Math.max(c,e[2*h+1]??0);let p=n===1?50:i/(n-1)*100;s.push(`${p.toFixed(1)} ${(10-Math.min(1,c)*10).toFixed(2)}`),o.push(`${p.toFixed(1)} ${(10-Math.max(-1,d)*10).toFixed(2)}`)}return`M${s.join("L")}L${o.reverse().join("L")}Z`}function Qr(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let s=document.createElement("div");return s.className="nc-padgrid-pads",s.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,i)=>s.append(Zr(n,i,t))),n.append(s),n.addEventListener("keydown",o=>{o.key==="Escape"&&Mt(n)}),Zs(n,e),n}function Zr(e,t,n){let s=document.createElement("button");s.type="button",s.className="nc-padgrid-pad",s.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let d=document.createElementNS(Ba,"svg");d.setAttribute("class","nc-padgrid-pad-wave"),d.setAttribute("viewBox","0 0 100 20"),d.setAttribute("preserveAspectRatio","none"),d.setAttribute("aria-hidden","true");let c=document.createElementNS(Ba,"path");return d.append(c),s.append(o,i,r,l,d),tl(e,s,t,n),i.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&s.dataset.empty!=="true"&&Qs(e,s,t,n)}),s.addEventListener("dragstart",p=>{if(s.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(bt,String(t)),p.dataTransfer.effectAllowed="copyMove",s.dataset.dragging="true"}),s.addEventListener("dragend",()=>delete s.dataset.dragging),s.addEventListener("dragover",p=>{let h=p.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(bt)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=h.includes(bt)&&!p.altKey?"move":"copy"),s.dataset.drop="true")}),s.addEventListener("dragleave",()=>delete s.dataset.drop),s.addEventListener("drop",p=>{delete s.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let g=p.dataTransfer?.getData(bt);if(g!==void 0&&g!==""){p.preventDefault(),p.stopPropagation();let y=Number(g);y!==t&&h.onMove?.(y,t,p.altKey);return}let f=p.dataTransfer?.files?.[0];f&&(p.preventDefault(),p.stopPropagation(),h.onFile?.(t,f))}),s}function el(e,t,n){let s=n(e);s?.type==="padGrid"&&s.onPress(t)}function tl(e,t,n,s){let o=0,i=!1,r=0,l=0,d=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",c=>{if(c.button!==0)return;i=!1,r=c.clientX,l=c.clientY,d();let p=s(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&c.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,i=ja(e,t,n,s)},450)))}),t.addEventListener("pointermove",c=>{o&&Math.hypot(c.clientX-r,c.clientY-l)>8&&d()});for(let c of["pointerup","pointercancel","pointerleave"])t.addEventListener(c,d);t.addEventListener("contextmenu",c=>{c.preventDefault(),d(),i=ja(e,t,n,s)}),t.addEventListener("click",()=>{if(i){i=!1;return}el(e,n,s)})}function ja(e,t,n,s){let o=s(e);if(o?.type!=="padGrid"||!o.menu)return!1;let i=o.menu(n);if(!i.length)return!1;Mt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Mt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of i){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=p.id,h.textContent=p.label,h.addEventListener("click",()=>{Mt(e);let g=s(e);g?.type==="padGrid"&&(p.id==="rename"&&g.onRename?Qs(e,t,n,s):g.onMenu?.(n,p.id))}),l.append(h)}e.append(r,l);let d=e.getBoundingClientRect(),c=t.getBoundingClientRect();return l.style.left=`${c.left-d.left}px`,l.style.top=`${c.bottom-d.top}px`,l.querySelector("button")?.focus(),!0}function Qs(e,t,n,s){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=s(e);if(o?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=o.nameMax??24,i.value=o.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.top-r.top}px`,i.style.width=`${l.width}px`;let d=!1,c=p=>{if(d)return;d=!0;let h=i.value.trim();i.remove(),t.focus();let g=s(e);p&&h&&g?.type==="padGrid"&&g.onRename?.(n,h)};i.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?c(!0):p.key==="Escape"&&c(!1)}),i.addEventListener("blur",()=>c(!0));for(let p of["pointerdown","click","dblclick"])i.addEventListener(p,h=>h.stopPropagation());e.append(i),i.focus(),i.select()}function Mt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Zs(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((s,o)=>{let i=n[o];if(!(i instanceof HTMLButtonElement))return;let r=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),d=i.querySelector(".nc-padgrid-pad-wave path"),c=i.querySelector(".nc-padgrid-pad-badge");c&&(c.textContent=s.empty?"":s.badge??""),i.draggable=!s.empty,s.empty?(i.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),d?.setAttribute("d","")):(delete i.dataset.empty,r&&(r.textContent=s.label),l&&(l.textContent=s.hint??""),d?.setAttribute("d",Jr(s.peaks))),!s.empty&&s.hint?i.dataset.hint="true":delete i.dataset.hint,s.lane?i.dataset.ncLane=String(s.lane):delete i.dataset.ncLane;let p=t.selected===o;p?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",p?"true":"false"),s.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",s.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${s.label}${s.hint?`, ${s.hint}`:""}${s.badgeLabel?`, ${s.badgeLabel}`:""}${p?", selected":""}`)})}function J(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Gt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let s=document.createElement("label");s.className="nc-label",s.htmlFor=e,s.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(s,o),n}function Ra(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function ct(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var nl=450,Oa=8;function ce(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function al(e){let t=zi(e,"target-min");return t>0?t:44}function sl(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=al(e),s=n/2,o=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let r=t[i],l=o[i];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let d=l.left+l.width/2,c=l.top+l.height/2,p=d-s,h=d+s,g=c-s,f=c+s;for(let y=0;y<t.length;y++){if(i===y)continue;let x=o[y];if(!x||x.width===0)continue;let u=x.left+x.width/2,m=x.top+x.height/2;Math.abs(m-c)<s*2&&(u>d?h=Math.min(h,(d+u)/2):u<d&&(p=Math.max(p,(d+u)/2))),Math.abs(u-d)<s*2&&(m>c?f=Math.min(f,(c+m)/2):m<c&&(g=Math.max(g,(c+m)/2)))}p=Math.min(p,l.left),h=Math.max(h,l.right),g=Math.min(g,l.top),f=Math.max(f,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${g-l.top}px`,r.style.width=`${Math.max(0,h-p)}px`,r.style.height=`${Math.max(0,f-g)}px`,r.style.transform="none"}}function eo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Ha(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Fe(e,t){switch(e.type){case"slider":return ol(e,t);case"select":return rl(e,t);case"toggle":return ll(e,t);case"button":return cl(e,t);case"readout":return dl(e);case"label":return ml(e);case"note":return _a(e);case"knob":return bl(e,t);case"choice":return wl(e,t);case"slotRow":return yl(e,t);case"stepGrid":return kl(e,t);case"canvas":return Ml(e);case"fx":return Pl(e,t);case"eqGraph":return ur(e,t);case"levelSteps":return Cr(e,t);case"group":return Xr(e,t,Fe);case"strip":return Tl(e,t);case"stripAdd":return Nl(e,t);case"padGrid":return Qr(e,t);case"moves":return ul(e,t);default:return _a({id:"unknown",text:""})}}function oe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),s=e.querySelector("label");s&&(s.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,ao(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(to(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??ct(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Ra(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Ra(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&$e(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&fl(n,t);let s=e.querySelector("[data-nc-readout]");s&&(s.textContent=t.valueText??ct(t.value))}else if(t.type==="choice")so(e,t);else if(t.type==="slotRow")io(e,t);else if(t.type==="stepGrid")zn(e,t);else if(t.type==="padGrid")Zs(e,t);else if(t.type==="moves")no(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Fs(n,t)}else if(t.type==="eqGraph")Ds(e,t);else if(t.type==="levelSteps")Hs(e,t);else if(t.type==="strip"){po(e,t);for(let n of t.sends??[]){let s=e.querySelector(`[data-nc-id="${He(n.id)}"]`);s instanceof Element&&oe(s,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")lo(e,t);else if(t.type==="group"){Js(e,t);for(let n of t.controls){let s=e.querySelector(`[data-nc-id="${He(n.id)}"]`);s instanceof Element&&oe(s,n)}}else if(t.type==="fx"){xo(e,t);for(let n of[...t.controls,...t.more??[]]){let s=e.querySelector(`[data-nc-id="${He(n.id)}"]`);s instanceof Element&&oe(s,n)}}}}function ol(e,t){let n=Gt(e.id,e.label);n.dataset.ncSlider="";let s=document.createElement("input");s.type="range",s.className="nc-range",s.id=e.id;let o=ft(e.taper,e.min,e.max);s.min=String(o?0:e.min),s.max=String(o?1e3:e.max),s.step=String(o?1:e.step),o&&(s.dataset.ncTaper=e.taper),s.value=String(to(e)),s.disabled=e.disabled===!0,s.dataset.ncId=e.id;let i=l=>o?Dt(l.taper??e.taper,l.min,l.max,s.value,l.step):Number(s.value);s.addEventListener("input",()=>{let l=t(s);l?.type==="slider"&&l.onChange(i(l))}),s.addEventListener("change",()=>{let l=t(s);l?.type==="slider"&&l.onCommit?.(i(l))}),o&&s.addEventListener("keydown",l=>{let d=t(s);if(d?.type!=="slider"||s.disabled)return;let c=d.taper??e.taper,p=Xn(c,d.min,d.max,d.value,l.key,l.shiftKey,d.step);p!==null&&(l.preventDefault(),s.value=String(lt(c,d.min,d.max,p)),d.onChange(p),d.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(s,r),e.onTap&&n.insertBefore(il(e,s,t),r),n.append(J()),oe(n,e),n}function to(e){return ft(e.taper,e.min,e.max)?lt(e.taper,e.min,e.max,e.value):e.value}function il(e,t,n){let s=document.createElement("button");s.type="button",s.className="nc-tap",s.dataset.ncTap=e.id,s.textContent="Tap",s.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),s.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,s.append(ce());let o=i=>{let r=n(t);r?.type==="slider"&&r.onTap?.(i)};return s.addEventListener("pointerdown",i=>{i.button===0&&o(i.timeStamp)}),s.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),o(i.timeStamp))}),s}function rl(e,t){let n=Gt(e.id,e.label),s=document.createElement("select");s.className="nc-select",s.id=e.id,s.dataset.ncId=e.id;let o=null;for(let i of e.options){let r=document.createElement("option");r.value=i.value,r.textContent=i.label,i.disabled&&(r.disabled=!0),i.group?o?.getAttribute("label")!==i.group&&(o=document.createElement("optgroup"),o.setAttribute("label",i.group),s.append(o)):o=null,(o??s).append(r)}return s.value=e.value,s.addEventListener("change",()=>{let i=t(s);i?.type==="select"&&i.onChange(s.value)}),n.append(s,J()),n}function ll(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let s=t(n);s?.type==="toggle"&&s.onPress()}),n.append(J()),oe(n,e),n}function cl(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(J()),oe(n,e),!e.onSparkle)return n;let s=document.createElement("div");s.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=eo(),o.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&ro(i);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),s.append(n,o),s}function dl(e){let t=Gt(e.id,e.label);return t.append(J()),oe(t,e),t}var pl=450;function ul(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let s of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",s.label),s.title&&(o.title=s.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=s.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of s.moves){let d=document.createElement("button");d.type="button",d.className="nc-moves-btn",d.dataset.ncMove=l.id,d.title=l.title??l.text,d.setAttribute("aria-label",`${s.label} ${l.text}`),d.append(hl(l.icon)),d.addEventListener("click",()=>{let c=t(n);c?.type==="moves"&&c.onMove(l.id)}),r.append(d)}o.append(i,r),n.append(o)}return no(n,e),n}function no(e,t){for(let n of t.groups)for(let s of n.moves){let o=e.querySelector(`[data-nc-move="${He(s.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=s.disabled===!0)}}function hl(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let s=document.createElementNS(t,"path");s.setAttribute("d",e.stroke),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),n.append(s)}if(e?.fill){let s=document.createElementNS(t,"path");s.setAttribute("d",e.fill),s.setAttribute("fill","currentColor"),n.append(s)}return n}function ml(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(J()),t}function _a(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(J()),t}function Va(e){if(typeof e.valueText=="string")return e.valueText;let t=ct(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function ao(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function fl(e,t){let n=zt(t.taper,t.min,t.max,t.value);ao(e,t.modulated===!0);let s=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(s)),t.bipolar){let o=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(zt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(s,o))),e.style.setProperty("--knob-to",String(Math.max(s,o)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Va(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Va(t)}`}function gl(e,t){if(ft(e.taper,e.min,e.max))return Xn(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,s=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?s/10:s;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+s*10:t.key==="PageDown"?e.value-s*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function bl(e,t){let n=Gt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let s=document.createElement("button");s.type="button",s.className="nc-knob",s.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",s.append(o);let i=0,r=0;s.addEventListener("pointerdown",c=>{i=c.clientY;let p=t(s);r=p&&"value"in p?Number(p.value):0,s.setPointerCapture?.(c.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;s.addEventListener("pointerup",l),s.addEventListener("pointercancel",l),s.addEventListener("lostpointercapture",l),s.addEventListener("pointermove",c=>{if(s.hasPointerCapture&&!s.hasPointerCapture(c.pointerId))return;let p=t(s);if(p?.type!=="knob")return;if(ft(p.taper,p.min,p.max)){let f=zt(p.taper,p.min,p.max,r)-(c.clientY-i)/120;p.onChange(Ls(p.taper,p.min,p.max,f));return}let h=p.max-p.min||1,g=Math.min(p.max,Math.max(p.min,r-(c.clientY-i)*h/120));p.onChange(g)}),s.addEventListener("dblclick",()=>{let c=t(s);c?.type==="knob"&&typeof c.defaultValue=="number"&&c.onChange(c.defaultValue)}),s.addEventListener("keydown",c=>{let p=t(s);if(p?.type!=="knob")return;let h=gl(p,c);h!==null&&(c.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,h))))});let d=n.querySelector("[data-nc-readout]");return n.insertBefore(s,d),n.append(J()),oe(n,e),n}function wl(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let s=document.createElement("span");s.className="nc-label nc-choice-caption",s.setAttribute("aria-hidden","true"),s.textContent=e.caption,n.dataset.ncCaption="",n.append(s)}for(let s of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=s.value,o.setAttribute("role","tab"),o.textContent=s.label,o.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(s.value)}),o.addEventListener("keydown",i=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(o),d=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")d=(l+1)%r.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")d=(l-1+r.length)%r.length;else if(i.key==="Home")d=0;else if(i.key==="End")d=r.length-1;else return;let c=r[d];c instanceof HTMLButtonElement&&(i.preventDefault(),c.focus(),c.click())}),n.append(o)}return n.append(J()),so(n,e),n}function so(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let s=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",s?"true":"false"),n.tabIndex=s?0:-1}}function yl(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let s=document.createElement("div");s.className="nc-snap-row",s.setAttribute("role","group"),s.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let h=e.slots[p],g=document.createElement("span");g.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(p),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",g.append(f,ce()),xl(g,f,n,p,t),s.append(g)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=eo(),o.append(ce()),o.addEventListener("click",()=>{ro(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let d=document.createElement("span");d.className="nc-readout nc-morph-readout",d.dataset.ncMorph="",i.append(r,d,l);let c=document.createElement("div");return c.className="nc-slot-line",c.append(s,...o?[o]:[]),n.append(c,i,J()),oo(n,t),io(n,e),n}function Ga(e,t,n,s){let o=n(e);if(o?.type!=="slotRow")return;nt(e);let i=s.shiftKey?"store":s.altKey?"clear":"recall";o.onSlot(t,i)}function xl(e,t,n,s,o){let i=0,r=0,l=0,d=!1,c=!1,p=!1,h=!1,g=()=>{window.clearTimeout(i),i=0},f=m=>{let w=m.clientX-r,b=m.clientY-l;w*w+b*b>Oa*Oa&&(d=!0,g())},y=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",x),window.removeEventListener("pointercancel",u))},x=m=>{let w=i!==0&&!d&&!c;g(),y(),w&&(p=!0,Ga(n,s,o,m))},u=()=>{d=!0,g(),y()};e.addEventListener("pointerdown",m=>{m.button===0&&(y(),c=!1,d=!1,p=!1,r=m.clientX,l=m.clientY,g(),i=window.setTimeout(()=>{i=0,!d&&(c=!0,vl(n,t,s,o))},nl),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",x),window.addEventListener("pointercancel",u))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(p||c||d){p=!1,c=!1,d=!1;return}Ga(n,s,o,m)})}function oo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let s=Ka("Save","store"),o=Ka("Clear","clear");n.append(s,o);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),nt(e)}),i.addEventListener("click",r=>r.stopPropagation()),e.append(i,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let d=t(e);if(d?.type!=="slotRow")return;let c=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(d.onSlot(c,"store"),nt(e)):l.dataset.ncSlotOp==="clear"&&(d.onSlot(c,"clear"),nt(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&nt(e)})}function Ka(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function vl(e,t,n,s){oo(e,s);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.bottom-r.top}px`,o.querySelector("button")?.focus()}function nt(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function io(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let i=Number(o.dataset.ncSlot),r=t.slots[i];if(!r)continue;o.textContent=r.label,r.filled?o.dataset.filled="true":delete o.dataset.filled,r.active?o.dataset.active="true":delete o.dataset.active,r.edited?o.dataset.edited="true":delete o.dataset.edited,r.queued?o.dataset.queued="true":delete o.dataset.queued,r.queued&&r.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let s=e.querySelector("[data-nc-morph]");s&&(s.textContent=t.morphText)}function ro(e){let t=e.dataset.ncLastFill||null,n=yi(t);e.dataset.ncLastFill=n;let s=xi(n);if(s)for(let[o,i]of Object.entries(s))e.style.setProperty(o,i)}function $l(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let s=!1,o=i=>{if(s===i)return;s=i,n.setAttribute("aria-pressed",i?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),o(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>o(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||o(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),o(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function kl(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let s=document.createElement("div");s.className="nc-seg",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Step tool");let o=u=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,s.append(m),m},i=o("Note"),r=o("Accent");r.dataset.ncAccentMode="";let l=u=>{for(let m of[i,r]){let w=m===u;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(i);for(let u of[i,r])u.addEventListener("click",()=>l(u));s.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let m=r.getAttribute("aria-checked")==="true"?i:r;l(m),m.focus()});let d=document.createElement("div");if(d.className="nc-step-tools",d.append(s),e.onFill&&d.append($l(n,t)),e.onClear){let u=document.createElement("button");u.type="button",u.className="nc-fill nc-clear",u.dataset.ncClear="",u.textContent=e.clearLabel??"Clear",u.title="Clear every step (Undo takes it back)",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),d.append(u)}n.append(d);for(let u of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=u.label,w.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(w.dataset.ncLane=String((u.lane-1)%4+1));let b=!1,k=0;w.addEventListener("pointerdown",v=>{b=!1,!(v.pointerType==="mouse"||v.button!==0)&&(k=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(b=!0,M.onSelectRow?.(M.rows.findIndex($=>$.id===u.id),!0))},pl))});for(let v of["pointerup","pointercancel","pointerleave"])w.addEventListener(v,()=>window.clearTimeout(k));w.addEventListener("contextmenu",v=>{b&&v.preventDefault()}),w.addEventListener("click",v=>{let M=t(n);if(M?.type!=="stepGrid")return;if(b){b=!1;return}let $=M.rows.findIndex(S=>S.id===u.id),T=!!M.selectedRows&&(v.shiftKey||v.metaKey||v.ctrlKey);M.onSelectRow?.($,T)}),w.addEventListener("keydown",v=>El(n,w,v));let L=[];for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",$.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${u.label}`),M.append($,ce()),M.addEventListener("click",()=>{let T=t(n);if(T?.type!=="stepGrid")return;let S=T.rows.findIndex(F=>F.id===u.id);(v==="mute"?T.onMute:T.onSolo)?.(S)}),L.push(M)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<u.steps.length;v++){let M=document.createElement("span");M.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${u.id}:${v}`,$.setAttribute("aria-label",`${u.label} step ${v+1}`),M.append($,ce()),M.addEventListener("click",T=>{let S=t(n);if(S?.type!=="stepGrid")return;let F=S.rows.findIndex(q=>q.id===u.id),N=r.getAttribute("aria-checked")==="true";S.onToggle(F,v,T.shiftKey||N)}),E.append(M)}if(e.onLength&&E.append(Al(n,E,u,t)),m.append(...L,w,E),e.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=u.id,v.setAttribute("aria-label",`Re-roll ${u.label}`),v.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=Ha(),v.append(ce()),v.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex($=>$.id===u.id))}),m.append(v)}m.addEventListener("click",v=>{if(v.target!==m)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex($=>$.id===u.id))}),Wa(n,E,".nc-step-wrap",t,r,()=>u.id),n.append(m)}let c=document.createElement("div");c.className="nc-pads-head";let p=(u,m,w)=>{let b=document.createElement("button");return b.type="button",b.className=u,b.textContent=m,w&&b.setAttribute("aria-label",w),b},h=p("nc-pads-step","‹","Previous lane"),g=p("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let u=t(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",zn(n,u))}));for(let[u,m]of[[h,-1],[g,1]])u.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let b=w.rows.length;w.onSelectRow?.(((wt(w)+m)%b+b)%b)});if(c.append(h,f,g),e.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=Ha(),u.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let w=wt(m);w>=0&&m.onDice?.(w)}),c.append(u)}if(e.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),c.append(u)}n.append(c);let y=document.createElement("div");y.className="nc-pads",y.setAttribute("role","group");let x=Math.max(0,...e.rows.map(u=>u.steps.length));for(let u=0;u<x;u++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",w=>{let b=t(n);if(b?.type!=="stepGrid")return;let k=wt(b);if(k<0)return;if(n.dataset.ncLenMode==="true"){b.onLength?.(k,u+1);return}let L=r.getAttribute("aria-checked")==="true";b.onToggle(k,u,w.shiftKey||L)}),y.append(m)}return Wa(n,y,".nc-pad",t,r,()=>{let u=t(n);return u?.type==="stepGrid"?u.rows[wt(u)]?.id:void 0}),n.append(y),n.append(J()),zn(n,e),n}function wt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Wa(e,t,n,s,o,i){let r="on",l=!0,d=-1,c=(p,h)=>{let g=p.rows[d]?.steps[h];!g||h>=p.rows[d].length||(p.onSet?p.onSet(d,h,r,l):!!g[r]!==l&&p.onToggle(d,h,r==="accent"))};Wr(t,n,p=>{let h=s(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let g=h.rows.findIndex(f=>f.id===i());g>=0&&h.rows[g].length!==p.pad+1&&h.onLength?.(g,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let g=i();d=h.rows.findIndex(y=>y.id===g);let f=h.rows[d]?.steps[p.pad];if(!f)return;r=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[r]}c(h,p.pad)}else if(p.kind==="long"){let g=i(),f=h.rows.findIndex(x=>x.id===g),y=t.querySelectorAll(n)[p.pad];f>=0&&y instanceof HTMLElement&&h.onLongPress?.(f,p.pad,y)}}})}function El(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let s=[...e.querySelectorAll(".nc-name")],o=s.indexOf(t),i=o;n.key==="ArrowDown"?i=o+1:n.key==="ArrowUp"?i=o-1:n.key==="Home"?i=0:i=s.length-1;let r=s[i];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Al(e,t,n,s){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(ce());let i=c=>{let p=s(e);if(p?.type!=="stepGrid")return;let h=p.rows.findIndex(y=>y.id===n.id),g=p.rows[h];if(!g)return;let f=Math.max(1,Math.min(g.steps.length,c));f!==g.length&&p.onLength?.(h,f)},r=c=>{let p=[...t.querySelectorAll(".nc-step")],h=1;return p.forEach((g,f)=>{let y=g.getBoundingClientRect();y.width>0&&c>=y.left+y.width/2&&(h=f+1)}),h},l=c=>i(r(c.clientX)),d=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",d),window.removeEventListener("pointercancel",d),delete o.dataset.dragging};return o.addEventListener("pointerdown",c=>{c.button===0&&(c.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",d),window.addEventListener("pointercancel",d))}),o.addEventListener("keydown",c=>{let p=s(e);if(p?.type!=="stepGrid")return;let h=p.rows.find(f=>f.id===n.id);if(!h)return;let g={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};c.key in g&&(c.preventDefault(),i(g[c.key]))}),o}var rn=new WeakMap,yt=new WeakMap;function Sl(e){return e?(yt.has(e)||(yt.set(e,wn(e)),$s(t=>{yt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Nn(n,Number(n.getAttribute("data-nc-velocity")))},e)),yt.get(e)):"light"}function Nn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,s=n===null?null:Sl(e.ownerDocument),o=n===null?null:`${s} ${n}`;if(!(rn.has(e)&&rn.get(e)===o)){if(rn.set(e,o),n===null){for(let i of Object.keys(ka(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,r]of Object.entries(ka(n,$a[s]??$a.light)))e.style.setProperty(i,r)}}function Ya(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function zn(e,t){let n=t.rows.some(p=>p.solo),s=e.querySelector("[data-nc-clear]");s&&s.textContent!==(t.clearLabel??"Clear")&&(s.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),i=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&i&&(r.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let d=e.querySelector("[data-nc-pads-dice]");d instanceof HTMLElement&&i&&(d.setAttribute("aria-label",`Re-roll ${i.label}`),d.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let c=e.querySelector("[data-nc-pads-play]");if(c instanceof HTMLElement){let p=!!t.transport?.playing,h=t.transport?.label??(p?"Stop":"Play");c.textContent!==h&&(c.textContent=h),c.setAttribute("aria-pressed",p?"true":"false");let g=t.transport?.ariaLabel;g?c.setAttribute("aria-label",g):c.removeAttribute("aria-label")}if(o instanceof HTMLElement&&i){o.setAttribute("aria-label",`${i.label} steps`),i.lane&&(o.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?o.dataset.silent="true":delete o.dataset.silent;let p=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let g=Number(h.getAttribute("data-nc-pad")),f=i.steps[g];h instanceof HTMLButtonElement&&(h.hidden=!f||!l&&g>=i.length,l&&g>=i.length?h.dataset.out="true":delete h.dataset.out,l&&g===i.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${i.label} step ${g+1}${f?.markLabel?`, ${f.markLabel}`:""}`),Ya(h,f),h.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?h.dataset.accent="true":delete h.dataset.accent,f?.dim?h.dataset.dim="true":delete h.dataset.dim,Nn(h,f?.velocity),t.playhead>=0&&g===p?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let p of t.rows){for(let f=0;f<p.steps.length;f++){let y=p.steps[f],x=e.querySelector(`[data-nc-step="${p.id}:${f}"]`);if(!(x instanceof HTMLButtonElement))continue;let u=x.closest(".nc-row");if(u instanceof HTMLElement){t.selectedRow===p.id?u.dataset.selected="true":delete u.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?u.dataset.picked="true":delete u.dataset.picked;let L=u.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?u.dataset.silent="true":delete u.dataset.silent;for(let E of u.querySelectorAll("[data-nc-ms]")){let v=E.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;E.setAttribute("aria-pressed",v?"true":"false")}}x.setAttribute("aria-pressed",y.on?"true":"false");let m=`${p.label} step ${f+1}${y.markLabel?`, ${y.markLabel}`:""}`;x.getAttribute("aria-label")!==m&&x.setAttribute("aria-label",m),Ya(x,y),y.accent?x.dataset.accent="true":delete x.dataset.accent,y.dim?x.dataset.dim="true":delete x.dataset.dim,f%4===0?x.dataset.bar="true":delete x.dataset.bar,typeof y.velocity=="number"?(x.dataset.velocity="true",x.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,y.velocity))*100)}%`)):(delete x.dataset.velocity,x.style.removeProperty("--level")),Nn(x,y.velocity);let w=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;f===w?x.dataset.playhead="true":delete x.dataset.playhead;let b=!!t.onLength&&t.selectedRow===p.id;x.hidden=f>=p.length&&!b,f>=p.length&&b?x.dataset.out="true":delete x.dataset.out}let h=e.querySelector(`[data-nc-len="${p.id}"]`),g=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&g&&g.nextElementSibling!==h){let f=document.activeElement===h;g.after(h),f&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(p.length)),h.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),h.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Ml(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let s=document.createElement("canvas");return s.className="nc-canvas",s.dataset.ncId=e.id,s.dataset.ncPaint=e.paint,t.append(n,s,J()),t}function Tl(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let s=document.createElement("div");s.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",r=null;i&&(n.dataset.ncFoldable="",r=fo(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==r&&r.focus())})),s.append(o);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let b=document.createElement("span");b.className="nc-strip-grip-dots",b.setAttribute("aria-hidden","true"),l.append(b),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let L=t(n);L?.type==="strip"&&(k.preventDefault(),L.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Ja(n,l,t))),!e.master&&typeof e.onShade=="function"&&s.addEventListener("contextmenu",b=>{b.pointerType==="touch"||b.pointerType==="pen"||b.target instanceof Element&&b.target.closest("input, .nc-strip-remove")||(b.preventDefault(),Ja(n,s,t,{x:b.clientX,y:b.clientY}))}),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(b)}),s.append(b)}let d=document.createElement("div");if(d.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",b.append(k,ce()),b.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),d.append(b)}let c=document.createElement("div");if(c.className="nc-strip-ms",e.onSendsView){let b=document.createElement("span");b.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",b.append(k,ce()),b.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),c.append(b)}for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=b,L.textContent=b==="mute"?"M":"S",k.append(L,ce()),k.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(b==="mute"?E.onMute:E.onSolo)?.()}),c.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let b of e.sends??[])p.append(Fe({...b,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Fe(aa(e),t));let g=document.createElement("div");g.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(b.value)),k.textContent=b.label,f.append(k)}let y=Ri({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let k=t(n);k?.type==="strip"&&k.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&Xa(b)}}),x=Ki({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(g.append(f,y.el,x.el),i){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,b.append(k,E,L),b.addEventListener("click",()=>{let v=t(n);if(v?.type!=="strip")return;v.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),g.prepend(b)}let u=document.createElement("button");u.type="button",u.className="nc-strip-db",u.dataset.ncReadout="";let m=0;u.addEventListener("click",b=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(m),b.detail===0?Ua(n,u,t):b.detail===1&&(m=window.setTimeout(()=>Ua(n,u,t),Fl)))}),u.addEventListener("dblclick",()=>{window.clearTimeout(m);let b=t(n);b?.type==="strip"&&Xa(b)});let w=document.createElement("div");return w.className="nc-strip-trim",e.trim&&w.append(Fe(sa(e),t)),r&&n.append(r),l&&n.append(l),n.append(s,w,d,c,p,h,g,u,J()),po(n,e),n}function aa(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Cl(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function sa(e){let t=e.trim,n=t.min??-12,s=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:s,step:t.step??.5,value:t.value,valueText:t.valueText??Ll(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:o=>t.onChange(o)}}function Ll(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Cl(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Fl=250;function Ua(e,t,n){let s=n(e);if(s?.type!=="strip"||!s.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=s.valueText??ct(s.value),o.setAttribute("aria-label",`${s.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let i=!1,r=l=>{if(i)return;i=!0;let d=o.value;if(o.remove(),t.hidden=!1,l){let c=n(e);c?.type==="strip"&&c.onTypeIn?.(d)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),o.addEventListener("blur",()=>r(!1))}function Nl(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let s=document.createElement("span");s.className="nc-strip-add-face",s.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",s.append(o,i);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),d=r.value;co(r),l?.type==="stripAdd"&&d&&l.onAdd(d)}),n.append(s,r,J()),lo(n,e),n}function lo(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let s=e.querySelector("select");if(!(s instanceof HTMLSelectElement))return;s.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...s.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==r&&(s.replaceChildren(...o.map(l=>{let d=document.createElement("option");return d.value=l.value,d.textContent=l.label,d.disabled=l.disabled===!0,d})),co(s))}function co(e){let t=e.options[0];t&&(t.selected=!0)}function Xa(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function po(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let s=e.querySelector("[data-nc-strip-remove]");s&&(s.setAttribute("aria-label",`Remove ${t.label}`),s.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),i=o?Oi(o):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Wi(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let y=t.valueText??ct(t.value);r.textContent!==y&&(r.textContent=y),r.setAttribute("aria-label",`${t.label} level ${y}`);let x=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${x}`:x}for(let y of e.querySelectorAll("[data-nc-ms]")){let x=y.getAttribute("data-nc-ms"),u=x==="mute"?t.mute===!0:t.solo===!0;y.setAttribute("aria-pressed",u?"true":"false"),y.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let y=t.hacksLabel??"Hacks";l.textContent!==y&&(l.textContent=y),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${y}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let d=e.querySelector("[data-nc-sends-view]");if(d){let y=t.sendsViewLabel??"Sends";d.textContent!==y&&(d.textContent=y),d.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),d.setAttribute("aria-label",`${y}: ${t.sendsView===!0?"hide":"show"} the send effects`),d.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),$e(d,t.sendsViewHelp)}let c=e.querySelector("[data-nc-strip-grip]");c instanceof HTMLElement&&(c.setAttribute("aria-label",`Move ${t.label}`),c.title=t.moveHelp??"Drag to move this channel");let p=uo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let y=e.querySelector(`.nc-strip-trim [data-nc-id="${He(t.trim.id)}"]`);y&&oe(y,sa(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let y=e.querySelector(`.nc-strip-pan [data-nc-id="${He(t.pan.id)}"]`);y&&oe(y,aa(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let g=e.querySelector("[data-nc-strip-hide]");g instanceof HTMLElement&&(go(g,h,t.label),$e(g,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!h,f.setAttribute("aria-label",`Expand ${t.label}`);let y=f.querySelector("[data-nc-strip-fold-name]");y&&y.textContent!==t.label&&(y.textContent=t.label),$e(f,t.foldedHelp??t.foldHelp)}}function uo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=ho?t:0}var ho=8,xt=null;function Ja(e,t,n,s){xt?.();let o=n(e);if(o?.type!=="strip")return null;let i=e.ownerDocument,r=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let d=i.createElement("div");d.className="nc-strip-menu-title",d.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,d.textContent="Shade";let c=i.createElement("div");c.className="nc-strip-menu-shades",c.setAttribute("role","radiogroup"),c.setAttribute("aria-labelledby",d.id);let p=uo(o),h=e.querySelector("[data-nc-strip-grip]")??t,g=(m=!1)=>{if(xt!==g)return;xt=null;let w=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",y,!0),i.removeEventListener("pointerdown",x,!0),r.removeEventListener("resize",u),(m||w)&&h?.isConnected&&h.focus?.({preventScroll:!0})},f=[0,...Array.from({length:ho},(m,w)=>w+1)].map(m=>{let w=i.createElement("button");return w.type="button",w.setAttribute("role","radio"),w.setAttribute("aria-checked",m===p?"true":"false"),w.setAttribute("tabindex",m===p?"0":"-1"),w.dataset.ncShadeChoice=String(m),m===0?(w.textContent="Auto",w.setAttribute("aria-label","Auto: alternate light and dark"),w.title="Auto: alternate light and dark"):(w.textContent=String(m),w.setAttribute("aria-label",`Shade ${m}`),w.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${m})`)),w.addEventListener("click",()=>{let b=n(e);g(!0),b?.type==="strip"&&b.onShade?.(m===0?null:m)}),w});if(c.append(...f),c.addEventListener("keydown",m=>{let w=f.indexOf(i.activeElement);if(w<0)return;let b=-1;m.key==="ArrowRight"||m.key==="ArrowDown"?b=(w+1)%f.length:m.key==="ArrowLeft"||m.key==="ArrowUp"?b=(w-1+f.length)%f.length:m.key==="Home"?b=0:m.key==="End"&&(b=f.length-1),!(b<0)&&(m.preventDefault(),f[w].setAttribute("tabindex","-1"),f[b].setAttribute("tabindex","0"),f[b].focus())}),l.append(d,c),typeof o.onMove=="function"){let m=[...e.parentElement?.children??[]].filter(b=>b.classList?.contains("nc-strip")&&!b.hasAttribute("data-nc-master")),w=m.indexOf(e);for(let[b,k,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=i.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=b<0?"left":"right";let v=i.createElement("span");v.textContent=k;let M=i.createElement("kbd");M.textContent=L,M.setAttribute("aria-hidden","true"),E.append(v,M),E.disabled=b<0?w<=0:w<0||w>=m.length-1,E.addEventListener("click",()=>{let $=n(e);g(!0),$?.type==="strip"&&$.onMove?.(b)}),l.append(E)}}i.body.append(l),(()=>{let m=t.getBoundingClientRect?.()??{bottom:0,right:0},w=l.offsetWidth,b=l.offsetHeight,k=r.innerWidth||i.documentElement.clientWidth||w,L=r.innerHeight||i.documentElement.clientHeight||b,E=s?s.x:m.right-w,v=s?s.y:m.bottom+4;E=Math.max(4,Math.min(E,k-w-4)),v+b>L-4&&(v=Math.max(4,(s?s.y:m.top)-b-4)),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round(v)}px`})();let y=m=>{if(m.key==="Escape")m.preventDefault(),m.stopPropagation(),g(!0);else if(m.key==="Tab"&&l.contains(i.activeElement)){let w=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),b=(w.indexOf(i.activeElement)+(m.shiftKey?-1:1)+w.length)%w.length;m.preventDefault(),w[b]?.focus()}},x=m=>{l.contains(m.target)||g(!1)},u=()=>g(!1);return i.addEventListener("keydown",y,!0),i.addEventListener("pointerdown",x,!0),r.addEventListener("resize",u),xt=g,(f.find(m=>m.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>g(!1)}}var Dn=typeof ResizeObserver=="function"?new ResizeObserver(zl):null;function zl(e){for(let t of e){if(!t.target.isConnected){Dn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&Dl(n)}}function Dl(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),s=t instanceof HTMLElement?t.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${s}px`),e.style.setProperty("--nc-fx-pin-h",`${s+o+i}px`)}function ql(e){if(Dn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Dn.observe(t)}function Pl(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let s=document.createElement("h3");s.className="nc-ui-fx-name",s.id=`${e.id}-name`,s.textContent=e.title;let o=typeof e.onFold=="function",i=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!o&&!Bt(e)&&!i&&!r)n.append(s);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(s),i&&l.append(wo(n,"head")),e.on!==void 0){let d=Ss({checked:e.on,labelledBy:s.id,onChange:c=>{let p=t(d.el);p?.type==="fx"&&p.onToggle?.(c)}});d.el.dataset.ncFxSwitch="",l.append(d.el)}o&&l.append(Bl(n,t)),Bt(e)&&l.append(Hl(n,t)),r&&l.append(_l(t)),n.append(l)}o&&n.prepend(jl(n,t)),i&&yo(n,e);for(let l of e.controls)n.append(Fe(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let d=document.createElement("summary");d.textContent=e.moreLabel??"More",l.append(d);for(let c of e.more)l.append(Fe(c,t));n.append(l)}return n.append(J()),xo(n,e),ql(n),n}var Il=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function mo(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),s=e.dataset.ncFolded==="true"&&t&&Il(t)?t:n;s instanceof HTMLElement&&document.activeElement!==s&&s.focus()}function Bl(e,t){let n=fo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let s=t(n);s?.type==="fx"&&(s.onFold?.(s.folded!==!0),mo(e))}),n}function fo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function go(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function jl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let s=document.createElement("span");s.className="nc-ui-fx-fold-state",s.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,s,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(wo(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),mo(e)}}),n}var Ve=new Set;function Tt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Bt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Rl="(max-width: 768px)";function Ol(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Hl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Ol()),n.addEventListener("click",()=>{let s=t(n);s?.type==="fx"&&(bo(e,s,!Ve.has(s.id)),n.focus())}),n}function _l(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function bo(e,t,n){n?Ve.add(t.id):Ve.delete(t.id),oa(e,t)}function Vl(e,t){t?.type==="fx"&&Ve.has(t.id)&&bo(e,t,!1)}function Gl(e){return e.ownerDocument.defaultView?.matchMedia?.(Rl).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function oa(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),s=Bt(t)&&Ve.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Bt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Tt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&_e(r)})),n.setAttribute("aria-pressed",s?"true":"false"),n.setAttribute("aria-label",`${s?"Restore":"Maximize"} ${t.title}`),n.title=s?"Restore (Esc)":"Maximize",$e(n,t.maxHelp)),!s){e.dataset.ncMax&&Qa(e);return}if(!e.isConnected){let r=()=>e.isConnected&&Ve.has(t.id)&&oa(e,t);queueMicrotask(()=>{e.isConnected?r():Tt(e.ownerDocument,r)});return}let o=Gl(e),i=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&Qa(e),e.dataset.ncMax=o,o==="over"&&Kl(e,t)),Wl(e.ownerDocument),o==="over"&&ia(e),Tt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&_e(r)})}function Qa(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Tt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&_e(n)})}function Kl(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let s=document.createElement("button");s.type="button",s.className="nc-fx-close",s.textContent="×",s.setAttribute("aria-label",`Close ${t.title}`),s.title="Close (Esc)",s.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(s)}function ia(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let s=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,i=Number.parseFloat(o?.getComputedStyle(s).columnGap??"")||0,r=pr(t.getBoundingClientRect(),n.getBoundingClientRect(),s.getBoundingClientRect(),i,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var Za=new WeakSet;function Wl(e){Za.has(e)||(Za.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],s=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");s instanceof HTMLElement&&(t.preventDefault(),s.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&ia(t)}))}var qn=new WeakMap;function wo(e,t){let n=Or(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function yo(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)$e(o,t.meterHelp);let s=qn.get(e);s?s.set(t.meter):qn.set(e,Gr(n,t.meter))}function xo(e,t){(t.meter||qn.has(e))&&yo(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let s=e.querySelector("[data-nc-fx-switch]");s&&s.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(go(i,o,t.title),$e(i,t.foldHelp)),oa(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let d=t.removeLabel??`Remove ${t.title}`;r.hidden=o,r.setAttribute("aria-label",d),r.title=d}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let d=t.on===void 0?"":t.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${t.title}${d?`, ${d.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let c=l.querySelector("[data-nc-fx-fold-state]");c&&(c.textContent=d,c.hidden=d==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),$e(l,t.foldHelp)}}function $e(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function He(e){return e.replace(/["\\]/g,"\\$&")}function Yl(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let s=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);s?.type==="canvas"&&Fs(n,s)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&_e(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&ia(n);sl(e)}var Ul=1e3,Xl=e=>e===!0?"log":typeof e=="string"?e:"linear";function Jl(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let s=e.taper??Xl(e.log),o=ft(s,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(o?0:e.min),l.max=String(o?Ul:e.max),l.step=o?"1":String(e.step??"any");let d=n.createElement("span");d.className="nc-readout",d.dataset.ncReadout="";let c=n.createElement("i");c.className="nc-token-probe",c.dataset.ncProbe="",i.append(r,l,d,c);let p=e.value,h=()=>{let f=e.format(p);d.textContent=f,l.setAttribute("aria-valuetext",f)},g=f=>{p=f,n.activeElement!==l&&(l.value=String(o?lt(s,e.min,e.max,p):p)),h()};return l.addEventListener("input",()=>{p=o?Dt(s,e.min,e.max,l.value,e.step):Number(l.value),h(),e.onInput(p)}),o&&l.addEventListener("keydown",f=>{let y=Xn(s,e.min,e.max,p,f.key,f.shiftKey,e.step);y===null||l.disabled||(f.preventDefault(),l.value=String(lt(s,e.min,e.max,y)),p=y,h(),e.onInput(p))}),l.disabled=e.disabled===!0,g(e.value),{el:i,set:g,setDisabled(f){l.disabled=f===!0}}}var Ql=xe["toast-duration"];function Zl({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function ec(e,t,n,s){let o=l=>({top:l,bottom:l+n}),i=l=>e.some(d=>d&&d.bottom>l.top&&d.top<l.bottom),r=o(t-s-n);return i(r)?i(o(s))?"bottom":"top":"bottom"}function tc(e,t,n,s,o,i){let r=e.bottom+o,l=Math.max(i,Math.min(e.left,s-i-n.width));for(let d=!0,c=0;d&&c<8;c++){d=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+o,d=!0)}return{top:r,left:l}}var es="data-nc-ui-toast-live";function nc(e,t){let n=t.querySelector(`[${es}]`);return n||(n=e.createElement("div"),n.setAttribute(es,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function ac({message:e,actionLabel:t,onAction:n,duration:s=Ql,onClose:o,avoid:i=[],anchor:r,host:l,document:d=globalThis.document}={}){l=l??d.body;let c=d.defaultView??globalThis,p=d.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let h=d.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,p.appendChild(h);let g=null;t&&(g=d.createElement("button"),g.type="button",g.className="nc-ui-toast-action",g.textContent=t,p.appendChild(g)),l.appendChild(p);let f="open",y=D=>D&&typeof D.getBoundingClientRect=="function"?D.getBoundingClientRect():null,x=y(p),u=x?.height||44,m=c.getComputedStyle?.(p),w=Number.parseFloat(m?.getPropertyValue(H("toast-offset")))||16,b=Number.parseFloat(m?.getPropertyValue(H("toast-anchor-gap")))||8,k=y(r),L=c.innerHeight??0,E=i.map(y).filter(Boolean),v=k&&k.bottom>0&&k.top<L?tc(k,E,{width:x?.width||0,height:u},c.innerWidth??0,b,w):null;v&&v.top+u<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${v.top+(c.scrollY??0)}px`,p.style.left=`${v.left+(c.scrollX??0)}px`):p.setAttribute("data-placement",ec(E,L,u,w));let M=c.requestAnimationFrame?.bind(c)??(D=>setTimeout(D,16));M(()=>M(()=>{f==="open"&&p.setAttribute("data-state","open")})),nc(d,l).textContent=Zl({message:e,actionLabel:t});let $,T,S=new Promise(D=>{T=D}),F=D=>{clearTimeout($),$=setTimeout(()=>I("timeout"),D)},N=s,q=Date.now(),j=()=>{f==="open"&&(clearTimeout($),N=Math.max(0,N-(Date.now()-q)))},O=()=>{f==="open"&&(q=Date.now(),F(N))};p.addEventListener("pointerenter",j),p.addEventListener("pointerleave",O),p.addEventListener("focusin",j),p.addEventListener("focusout",O),g?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{I("action")}}),Number.isFinite(s)&&F(s);function I(D="close"){if(f!=="open")return;f="closing",clearTimeout($),p.setAttribute("data-state","closing"),o?.(D);let B=c.getComputedStyle?.(p),he=B?Math.max(0,...String(B.transitionDuration||"").split(",").map(me=>Number.parseFloat(me)*(me.trim().endsWith("ms")?1:1e3)||0)):0,de=()=>{f!=="gone"&&(f="gone",p.remove(),T(D))};p.addEventListener("transitionend",de),setTimeout(de,he+50)}return{el:p,close:I,closed:S}}var qe="data-nc-help";function sc(e,t,n,s=0,o=6,i=8){let r=e.top-o-t.height,l=r>=s+i?"above":"below",d=l==="above"?r:e.bottom+o,c=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(d),left:Math.round(c),side:l}}var ln=new WeakMap;function oc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function ic({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=ln.get(e);if(n)return n;let s=e.defaultView,o=null,i=null,r,l=!1,d,c=null,p=!1,h=0,g=()=>{clearTimeout(r),p&&!l&&(h=Date.now()+1500),p=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},f=()=>{g(),clearTimeout(d),i=null,c=null,l=!1},y=(v,M)=>{clearTimeout(r),c=M;let $=Date.now()<h?Math.min(t,300):t;r=setTimeout(()=>{i===v&&v.isConnected&&!l&&m(v)&&(p=!0)},$)},x=v=>({x:Number(v.clientX)||0,y:Number(v.clientY)||0}),u=(v,M,$)=>!v||Math.hypot(v.x-M.x,v.y-M.y)>$,m=(v,M)=>{let $=M??v.getAttribute(qe);if(!$)return!1;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=$,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let T=v.getBoundingClientRect(),S=sc(T,{width:o.offsetWidth,height:o.offsetHeight},s.innerWidth,oc(e));return o.style.top=`${S.top}px`,o.style.left=`${S.left}px`,o.dataset.side=S.side,o.style.visibility="",!0},w=v=>{if(l||v.pointerType==="touch")return;let M=v.target&&v.target.closest?v.target.closest(`[${qe}]`):null;M!==i&&(f(),!(!M||v.buttons)&&(i=M,y(M,x(v))))},b=v=>{if(l||v.pointerType==="touch"||!i)return;if(v.buttons){g(),c=null;return}let M=x(v);p?u(c,M,8)&&(g(),y(i,M)):u(c,M,4)&&y(i,M)},k=v=>{!l&&!v.relatedTarget&&f()},L=v=>{(l||v.key==="Escape")&&f()};e.addEventListener("pointerover",w),e.addEventListener("pointermove",b,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",L),s.addEventListener("scroll",f,!0),s.addEventListener("blur",f);let E={hide:f,pin(v,M,{ms:$=0}={}){return f(),!v||!v.isConnected||!m(v,M)?!1:(l=!0,o.dataset.pinned="",$>0&&(d=setTimeout(f,$)),!0)},uninstall(){f(),e.removeEventListener("pointerover",w),e.removeEventListener("pointermove",b),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",L),s.removeEventListener("scroll",f,!0),s.removeEventListener("blur",f),o?.remove(),o=null,ln.delete(e)}};return ln.set(e,E),E}var ra="netcomposer.rhythm.hidden.v1",ue=new WeakMap;function cn(){try{return globalThis.localStorage??null}catch{return null}}function vo(e,t=ra){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(s=>typeof s=="string"):[])}catch{return new Set}}function ts(e,t,n,s=ra){let o=vo(e,s);n?o.add(t):o.delete(t);try{e?.setItem(s,JSON.stringify([...o]))}catch{}}function la(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],s=o=>{if(n.push(o),o.type==="group")for(let i of o.controls)s(i)};for(let o of t)s(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),o.pan&&n.push(aa(o)),o.trim&&n.push(sa(o)));return n}function $o(e,t){if(!(!e||!t))return la(e).find(n=>n.id===t)}function rc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${la(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(s=>s.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function lc(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let s=document.createElement("h3");s.className="nc-panel-title",s.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(s,o),e.append(n),ko(e,t)}function ko(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),s=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");s&&(s.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function cc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ue.get(t),s=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return $o(n,s)}function dc(e,t,n){let s=t.sections??[{id:"main",controls:t.controls??[]}],o=rc(t);if(e.dataset.ncSignature===o){for(let i of s){let r=e.querySelector(`[data-nc-section="${as(i.id)}"]`);r&&ko(r,i);for(let l of i.controls){let d=e.querySelector(`[data-nc-id="${as(l.id)}"]`);d instanceof Element&&oe(d,l)}r instanceof HTMLElement&&Pn(r,i,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of s){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=i.id,i.inset&&(r.dataset.ncInset="true"),i.area&&(r.dataset.ncArea=i.area),i.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",i.label)),i.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),i.title&&r.setAttribute("aria-label",i.title)),lc(r,i);let l=i.panel?document.createElement("div"):r;i.panel&&(l.className="nc-panel-body",r.append(l));for(let d of i.controls)l.append(Fe(d,cc));e.append(r),Pn(r,i,n)}}function Eo(e,t,n){let s=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:s,page:Math.min(s-1,Math.max(0,o))}}var pc="(max-width: 768px)",Ao=new WeakMap;function ns(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let s=document.createElement("span");return s.className="nc-fx-page-icon",s.setAttribute("aria-hidden","true"),t.append(s),t}function uc(e,t){let n=[...e.children].find(c=>c.classList.contains("nc-fx-pager"));if(n)return n;let s=document.createElement("div");s.className="nc-fx-pager",s.dataset.ncFxPager="",s.setAttribute("role","group"),s.setAttribute("aria-label","Effects pages");let o=ns("prev"),i=ns("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),s.append(o,r,i,l);let d=(c,p)=>{let h=Ao.get(e);if(!h||p.getAttribute("aria-disabled")==="true")return;let g=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Eo(g,h.pageSize,(t.pages.get(h.id)??0)+c);t.pages.set(h.id,f),h.onPage?.(f),Pn(e,{...h,page:f},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===o?i:o).focus(),t.redraw()};return o.addEventListener("click",()=>d(-1,o)),i.addEventListener("click",()=>d(1,i)),e.prepend(s),s}function Pn(e,t,n){Ao.set(e,t);let s=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:i,page:r}=Eo(s.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,r),i<=1){for(let u of[...e.children])u.classList.contains("nc-fx-pager")&&u.remove();delete e.dataset.ncPaged;for(let u of s)delete u.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(pc).matches===!0,d=e.closest(".nc-module");s.forEach((u,m)=>{let w=Math.floor(m/o)!==r;if(w?u.dataset.ncOffPage="":delete u.dataset.ncOffPage,w&&!l){let b=d instanceof HTMLElement?ue.get(d):void 0;Vl(u,$o(b,u.dataset.ncId))}});let c=uc(e,n),p=c.querySelector('[data-nc-fx-page="prev"]'),h=c.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),h.setAttribute("aria-disabled",r===i-1?"true":"false");let g=c.querySelector("[data-nc-fx-page-count]"),f=`${r+1} / ${i}`;g.textContent!==f&&(g.textContent=f);let y=c.querySelector("[data-nc-fx-page-live]"),x=`Effects page ${r+1} of ${i}`;y.textContent!==x&&(y.textContent=x)}function as(e){return e.replace(/["\\]/g,"\\$&")}function hc(e,t=ra){As();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let s=vo(cn(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let d=document.createElement("span");d.className="nc-index",d.dataset.ncIndex="";let c=Ss({labelledBy:i.id,onChange:w=>(ue.get(n)??e).onToggle?.(w)});c.el.dataset.ncModuleSwitch="",r.append(c.el,l,d);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",o.append(i,p,r);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let g=document.createElement("button");g.type="button",g.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",g.append(f);let y=document.createElement("i");y.className="nc-token-probe",y.dataset.ncProbe="",n.append(y,o,h,g),n.setAttribute("aria-labelledby",i.id);let x=w=>{let b=ue.get(n)??e;n.dataset.ncOpen=w?"false":"true",h.hidden=w,g.hidden=!w,l.textContent=w?"+":"−",l.setAttribute("aria-expanded",w?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${w?"Show":"Hide"} ${b.title}`),l.title=w?"Show":"Hide",w?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let w=n.dataset.ncOpen==="true";ts(cn(),(ue.get(n)??e).id,w,t),x(w),In(n.parentElement)}),g.addEventListener("click",()=>{ts(cn(),(ue.get(n)??e).id,!1,t),x(!1),In(n.parentElement)});let u={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(w){ue.set(n,w),w.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=w.title,p.textContent=w.status??"",w.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),f.textContent=w.summary??w.title,c.el.hidden=w.on===void 0,c.set(w.on===!0),w.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,g.setAttribute("aria-label",`Show ${w.title}`),dc(h,w,u),x(h.hidden),m.redraw()},redraw(){let w=ue.get(n);w&&Yl(n,la(w))}};return ue.set(n,e),x(s),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),$s(()=>m.redraw(),n.ownerDocument),m}function mc(e,t,n="adjacent"){As(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let s=n==="stack"?"stack":"adjacent";t.forEach((o,i)=>{let r=i%4+1;o.el.dataset.ncShade=String(r),o.el.dataset.ncPlace=s;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(o.el),o.redraw()}),In(e)}function In(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),s=t.map(i=>i.hasAttribute("data-nc-slim")?a("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",s.join(" "));let o=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const fc={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome. Off: Pass 1 starts with the clock.",start:"How Jam starts. Count-in: a bar of clicks, then Pass 1. Wait: Jam waits for the first sound from any instrument, and Pass 1 starts on its beat.","jam-wait":"Wait for the first sound from any instrument: the loop starts on that beat. With Record on, every lap from it becomes a pass. Space anywhere.",waiting:"Waiting for the first sound. Press again (or Space) to cancel. Nothing is recorded.","pattern-pass":"An instrument's own pattern, recorded once and again when it changes. It doesn't replay while that instrument plays its pattern itself.","mode-play":"Play: the loop plays and you can try things on any instrument. Nothing is recorded.","mode-record":"Record: every lap from the next bar 1 becomes a pass. Pressed in a lap's first beat, that lap. Shift+Space anywhere.","mode-full":"32 passes: delete one to record.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the loop: after the count-in it plays, or records with Record on (an empty song always records). Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"Q: this pass's quantize. Q · Song follows the Setup; Q 1/16 is its own grid (1/8T: eighth-note triplets). Notes move on replay; the pass keeps what you played.","pass-strength":"How far this pass's notes move toward its own grid. Following the song, it uses the Setup's Strength.","knob-pass":"The knobs you moved in this lap. They move again on replay. Muted or deleted, each goes back to where it was.","you-have-it":"You moved this knob, so this pass lets go of it until the lap ends. Then it takes the knob again."};function dt(e){return fc[e]??""}const So="nc-song-looper",ca=7,gc=[1,2,3,4,5,6,7],Bn=8,Mo=/^[A-Za-z0-9._-]{1,64}$/,jn=24,Rn=64,z=960,P=4,ee=32,Le=4e3,bc=120,wc=120,Kt=200,yc=e=>Math.max(bc,Math.min(Kt,Math.round(wc/1e3*(e/60)*z))),jt=40,Rt=240,xc=8,Ne=40,Wt=["off","1/4","1/8","1/8T","1/16","1/32"],vc=["1/4","1/8T"],$c={"1/4":z,"1/8":z/2,"1/8T":z/3,"1/16":z/4,"1/32":z/8},Yt=[.5,.75,1],To=128,On=e=>!!e.knobs?.length,se=e=>`${e.inst}|${e.param}`,Ge=e=>Math.max(1,Math.floor(e/P)),_=e=>e.bars*P*z,Ot=P*z;function Hn(e){const t=e.loop;return t?{start:(t.from-1)*Ot,length:(t.to-t.from+1)*Ot}:{start:0,length:_(e)}}function it(e,t){const n=_(t);if(!e.repeat||e.endTick>=n)return[0];const s=[];for(let o=0;o<n;o+=e.endTick)s.push(o);return s}function rt(e,t){if(!e.shift)return 0;const n=_(t),s=e.repeat&&e.endTick<n?e.endTick:n,o=e.shift*Ot%s;return o<0?o+s:o}function kc(e,t){const n=_(t),s=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(s/Ot)-1)}function Ec(e){const t=Math.round(e.bars*P*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Lo(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const da=Ne*2;function Co(e,t=new Date,n=Math.random){const s=Math.min(Rt,Math.max(jt,Math.round(Number.isFinite(e)?e:80))),o=t.toISOString();return{format:So,version:ca,id:Lo(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:o,updatedAt:o,song:{bpm:s,beatsPerBar:P,bars:Math.min(xc,Ge(s)),countInBars:1,ppq:z},passes:[],comps:[]}}const Se=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z=e=>Number.isInteger(e),pe=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,dn=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),re=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function ss(e,t){if(e===void 0)return null;if(!Se(e))return"quantize must be an object";const n=re(e,["grid","strength"]);return n?`quantize has an unknown field (${n})`:!Wt.includes(e.grid)||t<5&&vc.includes(e.grid)?t<5?"quantize grid is not off, 1/8, 1/16 or 1/32":"quantize grid is not off, 1/4, 1/8, 1/8T, 1/16 or 1/32":Yt.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%"}function Ac(e){if(!Se(e)||e.format!==So)return"it isn't a Lupa song";if(!gc.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=re(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!pe(e.id))return"its id is missing";if(!pe(e.name,da))return"its name is missing";if(!dn(e.createdAt)||!dn(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Se(n))return"its song is missing";const s=re(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop","start"]);if(s)return`its song has an unknown field (${s})`;if(n.start!==void 0){if(e.version<7)return"its song has an unknown field (start)";if(n.start!=="wait")return"its start is not Count-in or Wait"}if(!Z(n.bpm)||n.bpm<jt||n.bpm>Rt)return`its tempo is not ${jt}–${Rt}`;if(n.beatsPerBar!==P)return"it isn't in 4/4";if(!Z(n.bars)||n.bars<1||n.bars>Ge(n.bpm))return`its bars are not 1–${Ge(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==z)return`its ticks are not ${z} a beat`;const o=ss(n.quantize,e.version);if(o)return`its song's ${o}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const d=n.loop;if(!Se(d)||re(d,["from","to"])||!Z(d.from)||!Z(d.to)||d.from<1||d.to<d.from||d.to>n.bars)return`its loop is not bars 1–${n.bars}`}const i=_(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>ee)return`it has more than ${ee} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let d=0;d<e.passes.length;d++){const c=e.passes[d],p=`Pass ${d+1}`;if(!Se(c))return`${p} is not an object`;const h=re(c,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift","knobs","pattern"]);if(h)return`${p} has an unknown field (${h})`;if(c.pattern!==void 0){if(e.version<7)return`${p} has an unknown field (pattern)`;if(c.pattern!==!0)return`${p}'s pattern is not true`;if(c.knobs!==void 0)return`${p} is a pattern and moves knobs`}const g=new Map;if(c.knobs!==void 0){if(e.version<6)return`${p} has an unknown field (knobs)`;if(!Array.isArray(c.knobs)||!c.knobs.length||c.knobs.length>Bn)return`${p}'s knobs are not 1–${Bn}`;for(const x of c.knobs){if(!Se(x)||re(x,["inst","param","label","base"]))return`${p} has a knob that is wrong`;if(!pe(x.inst,64)||!(Array.isArray(c.instruments)&&c.instruments.includes(x.inst)))return`${p} has a knob from an instrument not listed`;if(typeof x.param!="string"||!Mo.test(x.param))return`${p} has a knob with a bad id`;if(!pe(x.label,jn))return`${p}'s knob ${x.param} has no name`;if(typeof x.base!="number"||!(x.base>=0&&x.base<=1))return`${p}'s knob ${x.param} does not start at 0–1`;const u=`${x.inst}|${x.param}`;if(g.has(u))return`${p} has knob ${x.param} twice`;g.set(u,x)}if(c.quantize!==void 0)return`${p} moves knobs and has a quantize`}if(c.repeat!==void 0&&(e.version<3||typeof c.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(c.shift!==void 0&&(e.version<4||!Z(c.shift)||c.shift===0||Math.abs(c.shift)>Rn))return`${p}'s shift is not a whole number of bars`;if(!pe(c.id)||r.has(c.id))return`${p} has no id of its own`;if(r.add(c.id),!Z(c.n)||c.n<1||l.has(c.n))return`${p} has no number of its own`;if(l.add(c.n),!pe(c.name,Ne))return`${p}'s name is not 1–${Ne} characters`;if(!dn(c.recordedAt))return`${p}'s date is wrong`;if(!Z(c.endTick)||c.endTick<=0||c.endTick>i)return`${p}'s end is not in the song`;for(const x of["kept","mute","solo"])if(typeof c[x]!="boolean")return`${p}'s ${x} is not true or false`;if(typeof c.volume!="number"||!(c.volume>=0&&c.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(c.instruments)||!c.instruments.every(x=>pe(x,64)))return`${p}'s instruments are wrong`;const f=ss(c.quantize,e.version);if(f)return`${p}'s ${f}`;if(!Array.isArray(c.events))return`${p}'s events are missing`;if(c.events.length>Le)return`${p} has more than ${Le} events`;let y=Number.NEGATIVE_INFINITY;for(let x=0;x<c.events.length;x++){const u=c.events[x],m=`event ${x+1} in ${p}`;if(!Se(u))return`${m} is not an object`;if(!pe(u.inst,64)||!c.instruments.includes(u.inst))return`${m} is from an instrument not listed`;if(!Z(u.at)||u.at<-Kt||u.at>=c.endTick)return`${m} is outside the pass`;if(u.at<y)return`${m} is out of order`;if(y=u.at,u.kind==="take"){if(e.version===1)return`${m} is of an unknown kind`;const b=re(u,["kind","inst","take","at","len","peaks"]);if(b)return`${m} has an unknown field (${b})`;if(!pe(u.take)||u.take.length>128)return`${m} has no take`;if(!Z(u.len)||u.len<1||u.at+u.len>i)return`${m} has a length outside the song`;if(u.peaks!==void 0&&!(Array.isArray(u.peaks)&&u.peaks.length<=To&&u.peaks.every(k=>typeof k=="number"&&k>=0&&k<=1)))return`${m} has bad peaks`;continue}if(u.kind==="param"){if(e.version<6||!g.size)return`${m} is of an unknown kind`;const b=re(u,["kind","inst","param","at","value"]);if(b)return`${m} has an unknown field (${b})`;if(typeof u.param!="string"||!g.has(`${u.inst}|${u.param}`))return`${m} moves a knob the pass doesn't list`;if(typeof u.value!="number"||!(u.value>=0&&u.value<=1))return`${m} has a value outside 0–1`;continue}if(g.size)return`${m} is not a knob move in a knob pass`;if(c.pattern===!0&&u.kind!==void 0&&u.kind!=="note")return`${m} is not a note in a pattern pass`;if(u.kind==="slot"){const b=re(u,["kind","inst","slot","at"]);if(b)return`${m} has an unknown field (${b})`;if(!Z(u.slot)||u.slot<1||u.slot>16)return`${m} has slot ${String(u.slot)}`;continue}const w=re(u,["kind","inst","note","vel","at","len","slice","name"]);if(w)return`${m} has an unknown field (${w})`;if(u.kind!==void 0&&u.kind!=="note")return`${m} is of an unknown kind`;if(!Z(u.note)||u.note<0||u.note>127)return`${m} has note ${String(u.note)}`;if(typeof u.vel!="number"||!(u.vel>0&&u.vel<=1))return`${m} has velocity ${String(u.vel)}`;if(!Z(u.len)||u.len<1||u.len>i)return`${m} has a length outside the song`;if(u.slice!==void 0&&!(Z(u.slice)&&u.slice>=0&&u.slice<=255))return`${m} has slice ${String(u.slice)}`;if(u.name!==void 0&&!(typeof u.name=="string"&&u.name.length>0&&u.name.length<=Ne))return`${m} has a bad sound name`}}return null}function pa(e){const t=Ac(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=ca,{session:n}}const Ht=e=>`${e.note}|${e.at}|${e.slice??""}`,Fo=30,pn=e=>(e?.events??[]).filter(t=>t.kind!=="slot"&&t.kind!=="take"&&t.kind!=="param");function vt(e,t,n){if(e.length!==t.length)return!1;const s=new Map;for(const o of t)s.set(Ht(o),o);if(s.size!==t.length)return!1;for(const o of e){const i=s.get(Ht(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>Fo&&!n?.(o))return!1}return!0}function Sc(e,t,n){const s=new Map;for(const o of t)s.set(Ht(o),o);for(const o of e){const i=s.get(Ht(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>Fo&&!n?.(o))return!1}return!0}class Mc{song;b0;passes;drafts=new Map;held=new Map;knobDrafts=new Map;knobValues=new Map;patternDrafts=new Map;settled=null;amended=!1;redoStack=[];laps=new WeakMap;through=-1;paused=!1;recFrom=0;punched=null;now;stats={taken:0,ignored:0,overCap:0,empty:0,samePattern:0,late:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/z}get lapTicks(){return Hn(this.song).length}get lapStart(){return Hn(this.song).start}get full(){return this.passes.length>=ee}hasDraft(t){return t<this.recFrom?!1:(this.drafts.get(t)?.count??0)>0||(this.knobDrafts.get(t)?.events.length??0)>0}place(t){const n=t-this.b0,s=Math.floor(n/this.lapBeats+1e-12);return{lap:s,tick:Math.round((n-s*this.lapBeats)*z)}}get graceTicks(){return yc(this.song.bpm)}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-this.graceTicks?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/z}played(t,n){const s=[];for(const o of n){if(o.type==="sound"||o.type==="note"&&o.stopped){this.stats.ignored++;continue}if(o.type==="note"&&!o.on){this.release(t,o.id,o.beat);continue}if(o.type==="note"&&o.pattern){const p=this.patternNote(t,o);p&&s.push(p);continue}if(o.type==="chordPad"||o.type==="lap"){this.stats.ignored++;continue}if(o.type==="take"){const p=this.voicePass(t,o);p&&s.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(o.type==="param"){const p=this.knob(t,o);p&&s.push(p);continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:i,tick:r}=this.placeOn(o.beat);if(i<0||i<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(i)??{lap:i,events:[],count:0};if(l.events.length>=Le){this.stats.overCap++;continue}let d;const c=this.lapStart+r;if(o.type==="slot")d={kind:"slot",inst:t,slot:o.slot,at:c};else{const p={inst:t,note:o.note,vel:$t(o.velocity),at:c,len:1};o.slice!==void 0&&(p.slice=o.slice),typeof o.name=="string"&&o.name.trim()&&(p.name=o.name.trim().slice(0,Ne)),this.held.set(`${t}|${o.id}`,{ev:p,onBeat:o.beat}),d=p}be(l.events,d),l.count++,this.drafts.set(i,l),this.stats.taken++,s.push({lap:i,ev:d})}return this.rejudge(),s}patternNote(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:s,tick:o}=this.place(n.beat);if(s>=0&&s===this.settled?.lap&&s<=this.through)return this.latePattern(t,n,o),null;if(s<0||s<=this.through)return this.stats.ignored++,null;const i=this.patternDrafts.get(s)??new Map,r=i.get(t)??[];if(r.length>=Le)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+o,len:1};return n.slice!==void 0&&(l.slice=n.slice),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:n.beat}),be(r,l),i.set(t,r),this.patternDrafts.set(s,i),this.stats.taken++,{lap:s,ev:l}}latePattern(t,n,s){const o=this.settled;if(!o)return;const i={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+s,len:1};n.slice!==void 0&&(i.slice=n.slice);let r=o.byInst.get(t);if(!(r?.pass&&!this.passes.includes(r.pass))){if(r||(r={events:[],pass:null,completed:!1},o.byInst.set(t,r)),r.events.length>=Le){this.stats.overCap++;return}this.held.set(`${t}|${n.id}`,{ev:i,onBeat:n.beat}),be(r.events,i),r.pass&&r.pass.events!==r.events&&be(r.pass.events,i),this.stats.late++,r.dirty=!0}}rejudge(){const t=this.settled;if(t)for(const[n,s]of t.byInst){if(!s.dirty)continue;s.dirty=!1;const o=this.lastPattern(n,s.pass??void 0),i=!!o&&vt(s.events,pn(o),this.heldNote);if(s.pass){if(i&&!s.completed){const r=this.passes.indexOf(s.pass);r>=0&&this.passes.splice(r,1),s.pass=null,this.stats.samePattern++}this.amended=!0}else!i&&!this.full&&(s.pass=this.patternPass(n,s.events,t.lap,this.lapTicks),this.amended=!0)}}lastPattern(t,n){let s;for(const o of this.passes)o!==n&&o.pattern&&o.instruments.includes(t)&&(!s||o.n>s.n)&&(s=o);return s}patternLive(t){if(this.paused||this.full)return[];const{lap:n,tick:s}=this.place(t),o=n>this.through&&n>=this.recFrom?this.patternDrafts.get(n):void 0;if(!o)return[];const i=this.lapStart,r=[];for(const[l,d]of o){const c=d.filter(h=>h.at-i<=s);if(!c.length)continue;const p=this.lastPattern(l);if(p){const h=s-z,g=c.filter(y=>y.at-i<=h),f=pn(p).filter(y=>y.at-i<=h);if(vt(g,f,this.heldNote))continue}r.push({inst:l,events:c})}return r}snapFirst(t,n,s,o=this.b0){if(!n.on||this.paused||this.full||this.through>=0||this.recFrom>0)return null;const i=Math.max(0,Math.min(this.lapTicks-1,Math.round((o-this.b0)*z))),r=this.drafts.get(0)??{lap:0,events:[],count:0};if(r.events.length>=Le)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+i,len:1};return n.slice!==void 0&&(l.slice=n.slice),typeof n.name=="string"&&n.name.trim()&&(l.name=n.name.trim().slice(0,Ne)),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:Math.min(s,o)}),be(r.events,l),r.count++,this.drafts.set(0,r),this.stats.taken++,{lap:0,ev:l}}knob(t,n){const s=se({inst:t,param:n.param}),o=os(n.value),i=this.knobValues.get(s);if(o!==null&&this.knobValues.set(s,o),o===null||!Mo.test(n.param)||this.paused||this.full)return this.stats.ignored++,null;const{lap:r,tick:l}=this.place(n.beat);if(r<0||r<=this.through)return this.stats.ignored++,null;const d=this.knobDrafts.get(r)??{lap:r,events:[],knobs:new Map};let c=d.knobs.get(s);if(!c){if(d.knobs.size>=Bn)return this.stats.ignored++,null;const g=(n.label??"").trim().slice(0,jn)||n.param.slice(0,jn);c={inst:t,param:n.param,label:g,base:os(n.from)??i??o},d.knobs.set(s,c)}let p;for(let g=d.events.length-1;g>=0&&!p;g--){const f=d.events[g];f.inst===t&&f.param===n.param&&(p=f)}if(p&&p.value===o)return null;if(d.events.length>=Le)return this.stats.overCap++,null;const h={kind:"param",inst:t,param:n.param,at:this.lapStart+l,value:o};return be(d.events,h),this.knobDrafts.set(r,d),this.stats.taken++,{lap:r,ev:h}}release(t,n,s){const o=`${t}|${n}`,i=this.held.get(o);i&&(this.held.delete(o),i.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((s-i.onBeat)*z))))}seam(t){const n=this.place(t).lap,s=[];for(let o=this.through+1;o<n;o++){if(this.through=o,o<this.recFrom){this.drop(o);continue}s.push(...this.commitPatterns(o,this.lapTicks));const i=this.commit(o,this.lapTicks);i&&s.push(i);const r=this.commitKnobs(o,this.lapTicks);r&&s.push(r)}return s}stop(t){for(const[s,o]of this.held)this.held.delete(s),this.cut.add(o.ev),o.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-o.onBeat)*z)));const n=this.seam(t);return this.settled=null,n.push(...this.part(t)),this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.settled=null,this.cut.clear(),n}punchOut(t){for(const[r,l]of this.held)this.held.delete(r),this.cut.add(l.ev),l.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-l.onBeat)*z)));const n=this.seam(t);this.settled=null;const{lap:s,tick:o}=this.place(t),i=s>=this.recFrom;n.push(...this.part(t)),i&&(this.punched={lap:s,tick:o}),this.recFrom=Number.POSITIVE_INFINITY;for(const r of[...this.drafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.knobDrafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.patternDrafts.keys()])r>this.through&&this.drop(r);return this.cut.clear(),n}recordFrom(t){return this.recFrom=Math.max(t,this.through+1,0),this.recFrom}recordNone(){this.recFrom=Number.POSITIVE_INFINITY}records(t){return t>=this.recFrom}drop(t){const n=this.drafts.get(t);if(n)for(const[o,i]of this.held)n.events.includes(i.ev)&&this.held.delete(o);const s=this.patternDrafts.get(t);if(s)for(const o of s.values())for(const[i,r]of this.held)o.includes(r.ev)&&this.held.delete(i);this.drafts.delete(t),this.knobDrafts.delete(t),this.patternDrafts.delete(t)}part(t){const n=[],{lap:s,tick:o}=this.place(t);if(s>=0&&s>this.through){if(this.through=s,s<this.recFrom)return this.drop(s),n;const i=P*z,r=Math.min(this.lapTicks,Math.max(i,Math.ceil(Math.max(1,o)/i)*i)),l=this.patternDrafts.get(s);if(l)for(const[p,h]of l){const g=h.filter(f=>f.at-this.lapStart<=o);g.length?l.set(p,g):l.delete(p)}n.push(...this.commitPatterns(s,r,o));const d=this.commit(s,r);d&&n.push(d);const c=this.commitKnobs(s,r);c&&n.push(c)}return n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:s,tick:o}=this.place(n.beat),i=this.punched?.lap===s?this.punched.tick:null;if(s<0||s<this.recFrom&&i===null||i!==null&&o>=i||!n.take||this.passes.some(p=>p.events.some(h=>h.kind==="take"&&h.take===n.take)))return this.stats.ignored++,null;const r=Math.max(0,Math.min(this.lapTicks-1,o)),l=Math.max(1,Math.min((i??this.lapTicks)-r,Math.round(n.lengthBeats*z))),d={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+r,len:l};Array.isArray(n.peaks)&&n.peaks.length&&(d.peaks=n.peaks.slice(0,To).map(p=>Number.isFinite(p)?Math.round(Math.max(0,Math.min(1,p))*100)/100:0)),this.drafts.set(-1-s,{lap:s,events:[d],count:1});const c=this.commitDraft(-1-s,s,this.lapTicks);return c&&this.stats.taken++,c}heldNote=t=>this.cut.has(t)||this.isHeld(t);cut=new Set;isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,s){const o=this.drafts.get(n),i=this.knobDrafts.get(n),r=this.patternDrafts.get(n),l=this.lapStart-s;if(Number.isFinite(this.recFrom)&&(this.recFrom=Math.max(0,this.recFrom-n)),this.punched=null,this.b0=t,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),r){for(const d of r.values())for(const c of d)c.at+=l;this.patternDrafts.set(0,r)}if(o){for(const d of o.events)d.at+=l;o.lap=0,this.drafts.set(0,o)}if(i){for(const d of i.events)d.at+=l;i.lap=0,this.knobDrafts.set(0,i)}}resume(t){this.b0=t,this.punched=null,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,s){const o=this.drafts.get(t);if(this.drafts.delete(t),!o||o.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=o.count,null;const i=this.passes.reduce((c,p)=>Math.max(c,p.n),0)+1,r=this.lapStart,l=o.events.filter(c=>c.at-r<s),d={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):s,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(c=>c.inst))],events:l};return this.passes.push(d),this.laps.set(d,n),this.redoStack=[],d}commitPatterns(t,n,s){const o=this.patternDrafts.get(t);if(this.patternDrafts.delete(t),this.settled=s===void 0?{lap:t,byInst:new Map}:null,!o)return[];const i=[],r=this.lapStart;for(const[l,d]of o){const c=d.filter(x=>x.at-r<n);if(!c.length)continue;const p={events:c,pass:null,completed:!1};this.settled?.byInst.set(l,p);const h=this.lastPattern(l),g=pn(h);let f=g;if(s!==void 0){const x=c.reduce((m,w)=>Math.max(m,w.at-r),Number.NEGATIVE_INFINITY),u=Math.min(s,x);f=g.filter(m=>m.at-r<=u)}const y=s===void 0?vt(c,f,this.heldNote):Sc(c,f,this.heldNote);if(h&&y){this.stats.samePattern++;continue}if(this.full){this.stats.ignored+=c.length;continue}if(h&&this.laps.get(h)===t-1&&g.length){const x=g[0]?.at??0;if(vt(c.filter(u=>u.at>=x),g)){const u=this.passes.indexOf(h);u>=0&&this.passes.splice(u,1),p.completed=!0}}p.pass=this.patternPass(l,c,t,n),i.push(p.pass)}return i}patternPass(t,n,s,o){const i=this.passes.reduce((l,d)=>Math.max(l,d.n),0)+1,r={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[t],events:n,pattern:!0};return this.passes.push(r),this.laps.set(r,s),this.redoStack=[],r}patternDrafting(){const t=[];for(const[n,s]of this.patternDrafts)if(n>=this.recFrom)for(const[o,i]of s)t.push({lap:n,inst:o,events:i});return t}commitKnobs(t,n){const s=this.knobDrafts.get(t);if(this.knobDrafts.delete(t),!s?.events.length)return null;if(this.full)return this.stats.ignored+=s.events.length,null;const o=this.lapStart,i=s.events.filter(p=>p.at-o<n);if(!i.length)return null;const r=new Set(i.map(p=>se(p))),l=[...s.knobs.values()].filter(p=>r.has(se(p))),d=this.passes.reduce((p,h)=>Math.max(p,h.n),0)+1,c={id:`p${d}-${this.now().getTime().toString(36)}`,n:d,name:`Pass ${d}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(p=>p.inst))],events:i,knobs:l.map(p=>({...p}))};return this.passes.push(c),this.laps.set(c,t),this.redoStack=[],c}knobDrafting(){return[...this.knobDrafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events,knobs:[...t.knobs.values()]}))}drafting(){return[...this.drafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events}))}undo(t){this.settled=null;const{lap:n}=this.place(t),s=n>=this.recFrom?this.drafts.get(n):void 0,o=n>=this.recFrom?this.knobDrafts.get(n):void 0;if(s&&s.count>0||o?.events.length){this.drafts.delete(n),this.knobDrafts.delete(n);const l=s??{lap:n,events:[],count:0};for(const[c,p]of this.held)l.events.includes(p.ev)&&this.held.delete(c);const d={kind:"lap",draft:l,...o?.events.length?{knobs:o}:{}};return this.redoStack.push(d),d}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const l=this.passes.findIndex(d=>d.n>n.pass.n);return l<0?this.passes.push(n.pass):this.passes.splice(l,0,n.pass),n}const{lap:s}=this.place(t);if(n.draft.lap===s||n.draft.lap>this.through){const l=this.drafts.get(n.draft.lap);if(l)for(const d of n.draft.events)be(l.events,d);else n.draft.count&&this.drafts.set(n.draft.lap,n.draft);if(l&&(l.count+=n.draft.count),n.knobs){const d=this.knobDrafts.get(n.knobs.lap);if(!d)this.knobDrafts.set(n.knobs.lap,n.knobs);else{for(const c of n.knobs.events)be(d.events,c);for(const[c,p]of n.knobs.knobs)d.knobs.has(c)||d.knobs.set(c,p)}}return n}n.draft.count&&this.drafts.set(n.draft.lap,n.draft),n.knobs&&this.knobDrafts.set(n.knobs.lap,n.knobs);const o=this.commit(n.draft.lap,this.lapTicks),i=this.commitKnobs(n.draft.lap,this.lapTicks),r=o??i;return r?{kind:"pass",pass:r}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function os(e){return typeof e!="number"||!Number.isFinite(e)?null:Math.round(Math.max(0,Math.min(1,e))*1e4)/1e4}function $t(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function be(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const is=.5,Tc=64,Ae="draft:",Lc=12;function rs(e,t){const n=t&&t.grid!=="off"?$c[t.grid]:void 0;if(!t||!n)return e;const s=Math.round(e/n)*n;return Math.round(e+(s-e)*t.strength)}function et(e,t){return e.mute?!1:t?e.solo:!0}const ls=e=>e.kind==="slot",un=e=>e.kind==="take",hn=e=>e.kind==="param",Cc=.25,Fc=4,Nc=.05;class zc{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;live=null;knobs=new Map;hands=new Map;resend=new Map;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0,params:0,live:0,byInst:{}};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.restart()}forgetKnobs(){this.knobs.clear(),this.hands.clear(),this.resend.clear()}rebase(t){for(const[n,s]of this.takesSent)s<=t+1e-9&&this.takesSent.delete(n);this.hands.clear();for(const n of this.knobs.values())n.fresh=!1;this.rung=this.rung.filter(n=>!n.pass.startsWith(Ae))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;for(const s of this.knobs.values())s.fresh=!1;this.silence(t);const n=[...this.takesSent.values()].some(s=>s>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(s=>s.beat<t);for(const[s,o]of this.takesSent)o>t&&this.takesSent.delete(s);for(const[s,o]of this.sounding)this.sounding.set(s,o.filter(i=>i.start<t))}}pump(t,n,s){const o=this.rec,i=[];if(this.waiting.length){const $=[];for(const T of this.waiting){if(o.isHeld(T.ev)){$.push(T);continue}if(T.beat>=t)i.push(T);else{const S=Math.min(T.ev.len,this.rec.lapTicks)/z-(t-T.beat);S>.05&&i.push({...T,beat:t,lenBeats:S})}}this.waiting=$}const r=Math.max(this.sentTo,t);if(!(n>r)&&!i.length&&!this.lateTakes(t))return 0;const l=s?.lapTicks??o.lapTicks,d=l/z,c=s?.lapStart??o.lapStart,p=c+l,h=s?.b0??o.b0,g=($,T)=>h+$*d+(T-c)/z,f=$=>$>=c-Kt&&$<p,y=Math.max(0,Math.floor((r-h)/d)-1),x=Math.floor((n-h)/d)+1,u=[],m=($,T,S)=>{const F=S+$.at;if(!f(F))return;const N=g(T,F);N>=r&&N<n&&u.push({inst:$.inst,beat:N,slot:$.slot})},w=[],b=($,T,S,F,N=Number.NEGATIVE_INFINITY,q=Number.POSITIVE_INFINITY)=>{const j=F,O=j+T.at,I=Math.min(O+T.len,j+$.endTick,q),D=Math.max(O,c,N),B=Math.min(I,p);if(B<=D)return;const he=g(S,D),de=g(S,B),me=`${$.id}|${S}|${j}`;if(this.takesSent.has(me)||de<=t||he>=n)return;const ke=Math.max(he,t);if(de-ke<Nc)return;const Je=(D-O)/z+(ke-he),Qe={type:"take",id:`t${++this.serial}`,beat:ke,take:T.take,lengthBeats:Je+(de-ke),gain:Math.max(0,Math.min(1,$.volume))};Je>1e-9&&(Qe.offsetBeats=Je),this.takesSent.set(me,de),w.push({inst:T.inst,ev:Qe})},k=o.passes,L=k.some($=>$.solo&&!$.mute),E=($,T,S,F,N,q,j,O=!1)=>{if(!f(N))return;const I=g(q,N);if(I>=r&&I<n){if(O&&this.live?.(T,I)){this.stats.live++;return}o.isHeld(F)?this.waiting.push({inst:T,age:S,beat:I,ev:F,velocity:j,pass:$}):i.push({inst:T,age:S,beat:I,ev:F,velocity:j,pass:$})}};for(const $ of k){if(!et($,L))continue;const T=s?void 0:o.lapOf($),S=T===void 0?0:T+1,F=$.quantize??this.song.quantize,N=it($,this.song),q=rt($,this.song),j=N.length>1?$.endTick:_(this.song),O=I=>{const D=I+q;return q&&D>=j?D-j:D};for(let I=Math.max(S,y);I<=x;I++)for(const D of N)for(const B of $.events)if(!(B.at>=$.endTick)){if(ls(B)){m(B,I,D+O(B.at)-B.at);continue}if(!hn(B)){if(un(B)){q?(b($,B,I,D+q,D,D+j),b($,B,I,D+q-j,D,D+j)):b($,B,I,D);continue}E($.id,B.inst,$.n,B,D+O(rs(B.at,F)),I,B.vel*$.volume,$.pattern===!0)}}}if(!L)for(const $ of o.drafting())for(let T=Math.max(s?0:$.lap+1,y);T<=x;T++)for(const S of $.events){if(ls(S)){m(S,T,0);continue}un(S)||hn(S)||E(`${Ae}${$.lap}`,S.inst,Number.POSITIVE_INFINITY,S,rs(S.at,this.song.quantize),T,S.vel)}if(this.announceLaps&&!o.full&&!o.paused){const $=[],T=s&&Number.isFinite(o.recFrom)?0:o.recFrom;for(let S=Math.max(0,Math.ceil((r-h)/d),T);Number.isFinite(S)&&h+S*d<n;S++)$.push({type:"lap",id:`l${++this.serial}`,beat:h+S*d,lengthBeats:d});$.length&&(this.sink.laps($),this.stats.laps+=$.length)}if(this.pumpKnobs(t,r,n,{b0:h,L:d,cs:c,ce:p,beatAt:g,inCycle:f,lapLo:y,lapHi:x,loopChange:!!s}),this.sentTo=Math.max(this.sentTo,n),w.length){const $=new Map;for(const T of w)$.set(T.inst,[...$.get(T.inst)??[],T.ev]);for(const[T,S]of $)this.sink.controls(T,S);this.stats.takes+=w.length}if(u.length){u.sort((T,S)=>T.beat-S.beat);const $=new Map;for(const T of u){const S=$.get(T.inst)??[];S.push({type:"slot",id:`s${++this.serial}`,beat:T.beat,slot:T.slot}),$.set(T.inst,S)}for(const[T,S]of $)this.sink.controls(T,S);this.stats.slots+=u.length}if(!i.length)return 0;i.sort(($,T)=>$.beat-T.beat||T.age-$.age);const v=new Map;for(const $ of i){const T=$.lenBeats??Math.max(1,Math.min($.ev.len,l))/z;if(!this.voice($.inst,$.beat,$.beat+T,$.age)){this.stats.dropped++;continue}const S={note:$.ev.note,velocity:Math.max(.01,Math.min(1,$.velocity)),startBeat:$.beat,lengthBeats:T,spanBeats:T,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:$.ev.note};$.ev.slice!==void 0&&(S.slice=$.ev.slice),this.rung.push({inst:$.inst,pass:$.pass,note:S});const F=v.get($.inst)??[];F.push(S),v.set($.inst,F)}let M=0;for(const[$,T]of v)this.sink.send($,T),M+=T.length,this.stats.byInst[$]=(this.stats.byInst[$]??0)+T.length;return this.stats.sent+=M,M}knobSources(t){const n=this.rec,s=n.passes.some(i=>i.solo&&!i.mute),o=[];for(const i of n.passes){if(!On(i)||!et(i,s))continue;const r=t?void 0:n.lapOf(i);o.push({id:i.id,age:i.n,first:r===void 0?0:r+1,endTick:i.endTick,...i.repeat?{repeat:!0}:{},...i.shift?{shift:i.shift}:{},knobs:i.knobs??[],events:i.events.filter(hn)})}if(!s)for(const i of n.knobDrafting())o.push({id:`${Ae}${i.lap}`,age:1e9+i.lap,first:t?0:i.lap+1,endTick:_(this.song),knobs:i.knobs,events:i.events});return o}driver(t,n,s){let o=null;for(const i of t)i.first<=s&&i.knobs.some(r=>se(r)===n)&&(!o||i.age>o.age)&&(o=i);return o}curve(t,n){const s=t.knobs.find(l=>se(l)===n),o=Cc*this.song.bpm*z/60,i=[];let r=null;for(const l of t.events){if(se(l)!==n||l.at>=t.endTick)continue;const d=r===null?Number.POSITIVE_INFINITY:l.at-r;i.push({at:l.at,value:l.value,...d>0&&d<=o?{glide:Math.min(Fc,d/z)}:{}}),r=l.at}return{base:s?.base??i[0]?.value??0,points:i}}valueAt(t,n,s){const o=rt(t,this.song),i=it(t,this.song).length>1,r=i?t.endTick:_(this.song);let l=i?s-Math.floor(s/r)*r:s;l-=o,l<0&&(l+=r);let d=n.base;for(const c of n.points){if(c.at>l)break;d=c.value}return d}knobMarks(t,n){const s=it(t,this.song),o=rt(t,this.song),i=s.length>1?t.endTick:_(this.song),r=d=>{const c=d+o;return o&&c>=i?c-i:c},l=[];for(const d of s){l.push({t:d+r(0),value:n.base});for(const c of n.points)l.push({t:d+r(c.at),value:c.value,...c.glide?{glide:c.glide}:{}})}return l}pumpKnobs(t,n,s,o){for(const[d,c]of this.hands)c.until<=t&&this.hands.delete(d);const i=this.knobSources(o.loopChange),r=new Map;for(const d of this.knobs.values())r.set(se(d),d);for(const d of i)for(const c of d.knobs)r.set(se(c),c);if(!r.size)return;const l=new Map;for(const[d,c]of r){const p=this.resend.get(d);this.resend.delete(d);const h=p!==void 0?Math.min(n,Math.max(p,t)):n;if(!(s>h))continue;const g=this.hands.get(d),f=w=>!!g&&w>=g.from-1e-9&&w<g.until-1e-9;let y=this.knobs.get(d);const x=[],u=Math.max(0,Math.min(o.lapLo,Math.floor((h-o.b0)/o.L)-1));for(let w=u;w<=o.lapHi;w++){const b=o.beatAt(w,o.cs);if(o.beatAt(w,o.ce)<=h||b>=s)continue;const L=this.driver(i,d,w),E=Math.max(h,b);if(!L){y?.driver&&(f(E)||x.push({beat:E,value:y.base}),y.driver=null);continue}const v=this.curve(L,d);if(y||(y={inst:c.inst,param:c.param,driver:null,base:v.base,fresh:!1},this.knobs.set(d,y)),y.driver!==L.id||!y.fresh){const M=o.cs+(E-b)*z;f(E)||x.push({beat:E,value:this.valueAt(L,v,M)}),y.driver=L.id,y.base=v.base,y.fresh=!0}b>=h&&b<s&&!f(b)&&x.push({beat:b,value:this.valueAt(L,v,o.cs)});for(const M of this.knobMarks(L,v)){if(!o.inCycle(M.t)||M.t<o.cs)continue;const $=o.beatAt(w,M.t);$<h||$>=s||f($)||x.push({beat:$,value:M.value,...M.glide?{glide:M.glide}:{}})}}if(!x.length)continue;x.sort((w,b)=>w.beat-b.beat);const m=l.get(c.inst)??[];for(let w=0;w<x.length;w++){const b=x[w],k=x[w+1];k&&Math.abs(k.beat-b.beat)<1e-9||m.push({type:"param",id:`k${++this.serial}`,beat:b.beat,param:c.param,value:b.value,...b.glide?{glide:b.glide}:{}})}l.set(c.inst,m)}for(const[d,c]of l)c.length&&(c.sort((p,h)=>p.beat-h.beat),this.sink.controls(d,c),this.stats.params+=c.length)}hand(t,n,s){if(this.sentTo===Number.NEGATIVE_INFINITY)return null;const o=se({inst:t,param:n}),i=this.rec,{lap:r}=i.place(s),l=i.beatOf(r+1,0),d=this.hands.get(o);if(d&&Math.abs(d.until-l)<1e-9)return this.sentTo>l&&this.resend.set(o,l),d;const c=this.driver(this.knobSources(!1),o,r);if(!c)return null;const p={inst:t,param:n,driver:c.id,from:s,until:l};return this.hands.set(o,p),this.sentTo>l&&this.resend.set(o,l),p}handsAt(t){const n=[];for(const s of this.hands.values()){if(t<s.from-1e-9||t>=s.until)continue;let o=s.driver;if(o.startsWith(Ae)){const i=Number(o.slice(Ae.length));o=this.rec.passes.find(r=>On(r)&&this.rec.lapOf(r)===i)?.id??null}n.push({...s,pass:o})}return n}silence(t){if(this.rung=this.rung.filter(d=>d.note.startBeat>=t-Tc),!this.rung.length||!this.sink.release)return;const n=this.rec.passes,s=n.some(d=>d.solo&&!d.mute),o=new Map(n.map(d=>[d.id,d])),i=new Set(this.rec.drafting().map(d=>d.lap)),r=d=>{if(d.startsWith(Ae)){const p=Number(d.slice(Ae.length));if(i.has(p))return!s;const h=n.find(g=>this.rec.lapOf(g)===p);return!!h&&et(h,s)}const c=o.get(d);return!!c&&et(c,s)},l=new Map;this.rung=this.rung.filter(d=>d.note.startBeat>=t||r(d.pass)?!0:(l.set(d.inst,[...l.get(d.inst)??[],d.note]),!1));for(const[d,c]of l)this.sink.release(d,c);l.size&&(this.stats.released+=[...l.values()].reduce((d,c)=>d+c.length,0))}lateTakes(t){const n=this.rec,s=Math.floor((t-n.b0)/n.lapBeats),o=n.passes.some(i=>i.solo&&!i.mute);return n.passes.some(i=>{if(!et(i,o)||!i.events.some(un))return!1;const r=n.lapOf(i);return r===void 0||s>r})}voice(t,n,s,o){const i=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(i.length>=Lc){let r=0;for(let l=1;l<i.length;l++)i[l].age<i[r].age&&(r=l);if(o<=i[r].age)return this.sounding.set(t,i),!1;i.splice(r,1)}return i.push({start:n,end:s,age:o}),this.sounding.set(t,i),!0}}const Dc=2*P,qc={running:!1,beatAt:()=>0,timeAt:()=>0};class Pc{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];listening=!1;soundOff=null;recent=[];starting=null;snap=null;startedBy=null;countedIn=!0;armedKey=-1;liveCount=0;recOn;patterns=new Map;constructor(t,n){this.session=t,this.deps=n,this.rec=new Mc({song:t.song,b0:0,passes:t.passes,now:n.date}),this.recOn=t.passes.length===0,this.replay=n.sink?new zc(this.rec,n.sink):null,this.replay&&(this.replay.live=(o,i)=>this.live(o,i));const s=n.host;s?.clock&&this.offs.push(s.clock.onChange(o=>this.clockChanged(o))),s?.onPlayed&&this.offs.push(s.onPlayed((o,i)=>this.played(o,i))),s?.claimKeys&&this.offs.push(s.claimKeys(["Space","Backspace"],o=>(o.code==="Space"&&o.shiftKey?this.toggleRecord():o.code==="Space"?this.toggle():o.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??qc}get graceBeats(){return this.rec.graceTicks/z}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(Rt,Math.max(jt,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Ge(n)),this.changed())}toggle(){this.waiting?this.cancelWait():this.jamming||this.wantJam?this.stop():this.jam()}get waiting(){return this.listening||this.starting!==null}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.session.passes.length||(this.recOn=!0),this.session.song.start==="wait"){if(t.onSound){this.wait();return}this.notice="Wait needs a newer Studio. Counting in."}if(this.transport.running){const s=Math.ceil(this.beatNow()/P+.05)*P;this.begin(s)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}wait(){const t=this.deps.host;if(!t?.onSound)return;this.recent=[],this.listening=!0;let n=null;try{n=t.onSound(s=>this.heard(s))}catch{n=null}this.listening?this.soundOff=n:n?.(),this.changed(!1)}stopListening(){this.listening=!1;const t=this.soundOff;this.soundOff=null;try{t?.()}catch{}}cancelWait(){const t=this.starting!==null;this.stopListening(),this.starting=null,this.recent=[],t&&this.transport.running&&this.deps.host?.studioTransport?.stop(),this.changed(!1)}heard(t){if(!this.listening)return;this.startedBy=t;const n=this.deps.host;if((t.kind==="start"||t.kind==="in")&&t.from!=="studio"&&t.beat!==null&&this.markLive(t.from,t.beat),t.stopped||t.beat===null||!this.transport.running){this.stopListening(),this.starting={at:t.at,from:t.from,lead:[]};for(const i of this.recent)i.at>=t.at-.1&&this.starting.lead.push(i);this.recent=[],n?.studioTransport?.playOnly?n.studioTransport.playOnly(n.instance??"looper"):n?.studioTransport?.play(),this.changed(!1);return}const s=t.kind==="start"||t.kind==="in"?t.beat:Math.floor((t.beat+this.graceBeats)/P)*P;this.stopListening();const o=this.recent;this.recent=[],this.begin(s,!1);for(const i of o){const r=i.events.filter(l=>!(l.type==="note"&&l.stopped)&&l.beat>=s-this.graceBeats);r.length&&this.record(i.source,r)}this.changed(!1)}startFromSound(t){const n=this.starting;if(this.starting=null,!n)return;this.begin(t,!1);const s=this.transport.timeAt(t),o=Math.max(1e-6,this.transport.beatAt(s+1)-t);this.snap={b0:t,first:null,t0:s,bps:o,until:s+.25};for(const i of n.lead)this.snapPlayed(i.source,i.events,i.at);this.changed(!1)}snapPlayed(t,n,s){const o=this.snap;if(!o)return[...n];const i=[],r=o.b0+(s-o.t0)*o.bps;for(const l of n){const d=l.type==="note"&&l.stopped||l.type==="note"&&l.beat<o.b0-1e-9;if(l.type!=="note"||!d){i.push(l);continue}if(!l.on){this.rec.played(t,[{...l,stopped:!1,beat:Math.max(r,o.b0)}]);continue}o.first===null&&(o.first=s);const c=o.b0+Math.max(0,s-o.first)*o.bps;this.rec.snapFirst(t,{...l,stopped:!1},Math.min(r,c),c)&&this.changed(!1)}return i}markLive(t,n){const s=this.patterns.get(t);!s||n>s.last+P+1e-6||n<s.from-P?this.patterns.set(t,{from:n,last:n}):(s.last=Math.max(s.last,n),s.from=Math.min(s.from,n))}live(t,n){const s=this.patterns.get(t);return!!s&&n>=s.from-1e-6&&n<=s.last+P+1e-6}begin(t,n=!0){this.wantJam=!1,this.jamming=!0,this.snap=null;const s=t+(n?this.session.song.countInBars*P:0);if(this.countedIn=s>t,this.rec.resume(s),this.recOn&&!this.rec.full?this.rec.recordFrom(0):this.rec.recordNone(),this.replay?.start(),this.transport.running){const o=Math.min(t,this.beatNow());this.replay?.pump(o,this.transport.beatAt(this.deps.now()+is))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,s)}showCountIn(t,n){const s=this.deps.host;if(!this.deps.countIn||!s?.mapper||n<=t)return;const o=this.transport,i=l=>s.mapper?.toContextTime(o.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(i(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,d)=>d%P===0),until:i(n)})}catch{}}stop(){if(this.waiting){this.cancelWait();return}const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.snap=null,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null),this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.recOn=this.session.passes.length===0,this.rec.recFrom=0,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){const n=typeof t.beat=="number"?t.beat:0;t.kind==="start"&&this.starting?this.startFromSound(n):t.kind==="start"&&this.wantJam?this.begin(n):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),(t.kind==="stop"||t.kind==="snapshot"&&!this.transport.running)&&(this.patterns.clear(),this.starting&&(this.starting=null,this.recent=[])),this.changed(!1)}get recording(){return this.recOn}toggleRecord(){this.setRecord(!this.recOn)}setRecord(t){if(t===this.recOn)return;if(t&&this.rec.full){this.notice=`${ee} passes: delete one to record.`,this.changed(!1);return}if(this.recOn=t,this.notice="",!(this.jamming&&this.transport.running)){this.changed(!1);return}const s=this.beatNow();if(t){const{lap:i,tick:r}=this.rec.place(s);this.rec.recordFrom(s<this.rec.b0?0:r<z?i:i+1),this.changed(!1);return}if(!this.rec.records(this.rec.place(s).lap)){this.rec.recordNone(),this.changed(!1);return}const o=this.rec.punchOut(s);this.replayChanged(),this.changed(o.length>0)}played(t,n){for(const i of n)i.type==="note"&&i.on&&i.pattern&&!i.stopped&&this.markLive(t,i.beat);const s=this.deps.now();if(this.starting){this.starting.lead.push({source:t,events:n,at:s});return}if(this.listening){this.keepRecent(t,n,s);return}if(!this.jamming)return;const o=this.snap?this.snapPlayed(t,n,s):n;this.snap&&s>this.snap.until&&(this.snap=null),o.length&&this.record(t,o)}keepRecent(t,n,s){const o=this.transport.running?this.beatNow():null;this.recent.push({source:t,events:n,at:s}),o!==null&&(this.recent=this.recent.filter(i=>i.events.some(r=>r.beat>=o-Dc))),this.recent.length>256&&this.recent.splice(0,this.recent.length-256)}record(t,n){let s=!1;if(this.replay)for(const i of n)i.type==="param"&&this.replay.hand(t,i.param,i.beat)&&(s=!0);const o=this.rec.played(t,n);if(this.rec.amended){this.rec.amended=!1,this.changed();return}s&&!o.length&&this.changed(!1),o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let s=!1;const o=this.deps.load?.()==="over";o&&!this.rec.paused&&(this.rec.paused=!0,this.recOn&&(this.notice="Too busy to record. Playback carries on."),s=!0),n!==this.lastLap&&(this.lastLap=n,s=!0,!o&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const i=this.rec.seam(t),r=this.rec.beatOf(this.rec.recFrom,0)-t,l=this.recOn&&Number.isFinite(r)&&r>0?r>P?Math.ceil(r/P-1e-9)*100:Math.ceil(r-1e-9):-1;l!==this.armedKey&&(this.armedKey=l,s=!0);const d=this.rec.patternLive(t).reduce((g,f)=>g+f.events.length,0);d!==this.liveCount&&(this.liveCount=d,s=!0);const c=this.pending;if(c&&t>=c.seam){this.pending=null;const g=this.rec.lapStart,f=this.rec.place(t).lap;this.applyLoop(c.loop),this.rec.rebase(c.seam,f,g),this.replay?.rebase(c.seam),this.lastLap=-1,this.changed()}const p=this.transport.beatAt(this.deps.now()+is),h=this.pending;if(h&&p>h.seam){this.replay?.pump(t,h.seam);const g=Hn({bars:this.session.song.bars,...h.loop?{loop:h.loop}:{}});this.replay?.pump(Math.max(t,h.seam),p,{b0:h.seam,lapStart:g.start,lapTicks:g.length})}else this.replay?.pump(t,p);return i.length?(this.changed(),!0):s}view(){const t=this.session,n=this.transport,s=this.jamming&&n.running?this.beatNow():null,o=s!==null&&!this.countedIn?Math.max(s,this.rec.b0):s,i=o===null?null:this.rec.place(o),r=o!==null&&o<this.rec.b0,l=t.passes.reduce((x,u)=>Math.max(x,u.n),0)+1,d=i&&!r?i.lap:null,c=this.recOn&&d!==null&&!this.rec.records(d),p=!this.recOn,h=o!==null&&!r&&!p&&!c&&!this.rec.paused&&!this.rec.full,g=this.deps.host?.studioTransport?.bpm(),f=this.waiting?"waiting":this.jamming?r?"count-in":p?"playing":c?"armed":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";let y=null;if(c&&o!==null&&Number.isFinite(this.rec.recFrom)){const x=Math.max(0,this.rec.beatOf(this.rec.recFrom,0)-o);y=x>P?{bars:Math.ceil(x/P-1e-9),beats:Math.ceil(x-1e-9)}:{bars:0,beats:Math.max(1,Math.ceil(x-1e-9))}}return{session:t,phase:f,jamming:this.jamming||this.wantJam,bar:i&&!r?Math.floor((this.rec.lapStart+i.tick)/(P*960))+1:null,songPos:i&&!r?(this.rec.lapStart+i.tick)/_(t.song):null,pendingLoop:this.pending?.loop,nextPass:l,waiting:this.waiting,countIn:r&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,livePatterns:h&&o!==null?this.rec.patternLive(o).map((x,u)=>({...x,n:l+u})):[],hands:o!==null&&i&&!r?this.handsAt(o):[],record:this.recOn,recIn:y,recBar:Math.floor(this.rec.lapStart/(P*z))+1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof g=="number"&&Math.round(g)!==t.song.bpm?Math.round(g):null,notice:this.notice}}handsAt(t){if(!this.replay)return[];const n=_(this.session.song),s=i=>{const{tick:r}=this.rec.place(i);return Math.max(0,Math.min(1,(this.rec.lapStart+r)/n))},o=[];for(const i of this.replay.handsAt(t)){if(!i.pass)continue;const r=(this.rec.lapStart+this.rec.lapTicks)/n;o.push({pass:i.pass,inst:i.inst,param:i.param,from:s(i.from),to:r})}return o}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const s=Math.max(1,Math.min(Ge(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=s;else if(s>n.bars&&t.grow){n.bars=s;const o=_(n);for(const i of this.session.passes)i.endTick<o&&i.repeat===void 0&&(i.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.start==="wait"?n.start="wait":t.start==="count-in"&&delete n.start,t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let s=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),d=Math.max(l,Math.min(n.bars,Math.round(t.to)));s=l===1&&d===n.bars?null:{from:l,to:d}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(s),this.changed();return}const o=this.beatNow(),{lap:i}=this.rec.place(o),r=this.rec.beatOf(Math.max(i+1,0),0);this.pending={loop:s,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const s=this.pass(t);if(s){if(n.name!==void 0){const o=n.name.replace(/\s+/g," ").trim().slice(0,Ne);s.name=o||`Pass ${s.n}`}if(n.kept!==void 0&&(s.kept=n.kept),n.mute!==void 0&&(s.mute=n.mute),n.solo!==void 0&&(s.solo=n.solo),n.volume!==void 0&&(s.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&s.endTick<_(this.session.song)&&(s.repeat=n.repeat),n.shift!==void 0){const o=Math.max(-Rn,Math.min(Rn,Math.round(n.shift)||0));o?s.shift=o:delete s.shift}n.quantize===null?delete s.quantize:n.quantize&&(s.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(o=>o.id===t);if(n<0)return null;const[s]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),s?{pass:s,index:n}:null}restorePass(t,n){const s=this.session.passes;return s.length>=ee||s.some(o=>o.id===t.id)?!1:(s.splice(Math.min(Math.max(0,n),s.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(s=>s.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){(this.jamming||this.waiting)&&this.stop();const t=Co(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session.song.start&&(t.song.start=this.session.song.start),this.use(t),this.changed(),t}openSession(t){(this.jamming||this.waiting)&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,da);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.recOn=t.passes.length===0,this.notice=""}get passCount(){return this.session.passes.length}get maxPasses(){return ee}dispose(){this.stopListening();for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const ua=e=>e==="off"?"Off":e;function Ic(e){const t=e.quantize?.grid??"off";return`Song · ${t==="off"?"off":t}`}function cs(e,t){if(e==="song"){const n=t.quantize?.grid??"off";return`Q · Song ${n==="off"?"off":n}`}return`Q ${ua(e)}`}function No(e,t=!1){return[{value:"song",label:t?cs("song",e):Ic(e)},...Wt.map(n=>({value:n,label:t?cs(n,e):ua(n)}))]}const zo=()=>Yt.map(e=>({value:String(e),label:`${Math.round(e*100)}%`})),Do=e=>e.quantize?.grid??"song",qo=e=>!!e.quantize&&e.quantize.grid!=="off";function Po(e,t,n){return n==="song"||!Wt.includes(n)?null:{grid:n,strength:e.quantize?.strength??t.quantize?.strength??1}}function Io(e,t){const n=Number(t);return!e.quantize||!Yt.includes(n)?null:{grid:e.quantize.grid,strength:n}}const Bc="netcomposer-looper",le="sessions",jc="netcomposer.looper.current.v1",Rc=500;function Oc(e){return new Promise((t,n)=>{const s=e.open(Bc,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(le)||s.result.createObjectStore(le,{keyPath:"id"})},s.onsuccess=()=>t(s.result),s.onerror=()=>n(s.error)})}function ds(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Hc(e={}){const t=e.idb===void 0?ps(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?ps(()=>globalThis.localStorage):e.local,s=e.currentKey??jc;let o=null;const i=()=>t?(o??=Oc(t),o):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,d=Promise.resolve(),c=0;const p=u=>{try{n?.setItem(s,u)}catch{}},h=async u=>{const b=(await i()).transaction(le,"readonly").objectStore(le).get(u);return new Promise((k,L)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>L(b.error)})},g=u=>{const m=d.then(async()=>{const b=(await i()).transaction(le,"readwrite");u(b.objectStore(le)),await ds(b)});return d=m.catch(()=>{c++}),m.then(()=>!0,()=>!1)},f=async u=>{if(!t||!u)return null;try{const m=await h(u);return m===void 0?null:pa(m)}catch{return null}},y=u=>{const m=structuredClone(u);d=d.then(async()=>{const b=(await i()).transaction(le,"readwrite");b.objectStore(le).put(m),await ds(b),p(m.id)}).catch(()=>{c++})},x=()=>{l&&clearTimeout(l),l=null;const u=r;r=null,u&&y(u)};return{async load(){let u=null;try{u=n?.getItem(s)??null}catch{u=null}return u?f(u):null},get:f,setCurrent:p,async list(){if(!t)return[];x(),await d;let u=[];try{const b=(await i()).transaction(le,"readonly").objectStore(le).getAll();u=await new Promise((k,L)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>L(b.error)})}catch{return[]}return Vc(u)},async rename(u,m){const w=_n(m);if(!t||!w)return!1;x(),await d;let b;try{b=await h(u)}catch{return!1}return!b||typeof b!="object"?!1:g(k=>k.put({...b,name:w}))},async remove(u){return t?(r?.id===u&&(l&&clearTimeout(l),l=null,r=null),g(m=>m.delete(u))):!1},async adopt(u){const m=await f(u.id);if(m&&"session"in m&&_c(m.session,u))return m.session;const w=m===null?structuredClone(u):{...structuredClone(u),id:Lo(),name:_n(`${u.name} (scene)`)||u.name};if(!await g(k=>k.put(w)))throw new Error("not saved");return w},save(u,m=!1){if(r=u,m){x();return}l||(l=setTimeout(x,Rc))},async flush(){x(),await d},get failures(){return c}}}function _n(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,da):""}function _c(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function Vc(e){const t=[];for(const s of e){if(!s||typeof s!="object")continue;const o=s;if(typeof o.id!="string"||!o.id)continue;const i=pa(s);if("session"in i){const r=i.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=o.song;t.push({id:o.id,name:_n(o.name)||"Untitled song",passes:Array.isArray(o.passes)?o.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof o.updatedAt=="string"?o.updatedAt:"",error:i.error})}}const n=s=>{const o=Date.parse(s.updatedAt);return Number.isNaN(o)?0:o};return t.sort((s,o)=>n(o)-n(s))}const Gc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Kc(e,t=new Date){const n=new Date(e),s=n.getTime();if(Number.isNaN(s))return"";const o=t.getTime()-s;if(o>=0&&o<6e4)return"just now";if(o>=0&&o<36e5)return`${Math.floor(o/6e4)} min ago`;const i=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=c=>new Date(c.getFullYear(),c.getMonth(),c.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${i}`;if(l===1)return`yesterday ${i}`;const d=`${Gc[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?d:`${d}, ${n.getFullYear()}`}function Wc(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],s=Kc(e.updatedAt,t);return s&&n.push(s),n.join(" · ")}function ps(e){try{return e()??null}catch{return null}}const Yc=4e3;function W(e,t={},...n){const s=document.createElement(e);for(const[o,i]of Object.entries(t))s.setAttribute(o,i);return s.append(...n),s}function Uc(e){const t=W("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=W("div",{class:"lp-songs-list",role:"none"}),s=W("div",{class:"lp-songs-msg",role:"status"});s.hidden=!0;const o=W("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,s,W("div",{class:"lp-songs-sep",role:"separator"}),W("div",{class:"lp-songs-note"},e.note)),i=W("span",{class:"lp-songs-wrap"},t,o);let r=null,l=null;const d=()=>i.hasAttribute("data-open"),c=E=>{s.textContent=E,s.hidden=!E},p=()=>[...n.querySelectorAll(".lp-song-main")],h=E=>E?.closest(".lp-song")??null,g=E=>[...E.querySelectorAll('[role="menuitem"]')],f=(E,v="main")=>{((E?n.querySelector(`.lp-song[data-song="${CSS.escape(E)}"]`):null)?.querySelector(`.lp-song-${v}`)??p()[0]??t).focus({preventScroll:!0})},y=()=>{if(!r)return;clearTimeout(r.timer);const E=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);E&&(E.textContent="Delete",E.removeAttribute("data-lp-ask")),r=null};async function x(E){const v=await e.list(),M=e.openId(),$=e.now?.()??new Date;y(),l=null,n.replaceChildren(...v.map(T=>{const S=T.id===M,F=`${Wc(T,$)}${S?" · open":""}${T.error?" · doesn't open":""}`,N=W("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${T.id}`,"aria-label":`${T.name}, ${F}`},W("span",{class:"lp-song-name"},T.name),W("span",{class:"lp-song-sub"},F));S&&N.setAttribute("aria-current","true"),N.addEventListener("click",()=>void u(T));const q=W("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${T.id}`,"aria-label":`Rename ${T.name}`},"Rename");q.addEventListener("click",()=>m(T)),T.error&&(q.disabled=!0);const j=W("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${T.id}`,"aria-label":`Delete ${T.name}`},"Delete");j.addEventListener("click",()=>void w(T,j));const O=W("div",{class:"lp-song",role:"none","data-song":T.id},N,W("span",{class:"lp-song-acts",role:"none"},q,j));return S&&O.setAttribute("data-open",""),O})),v.length||n.append(W("div",{class:"lp-songs-empty"},"No songs yet.")),E&&f(E.id,E.part)}async function u(E){if(E.id===e.openId()){k(!0);return}const v=await e.open(E.id);if(v){c(v);return}k(!0)}function m(E){const v=n.querySelector(`.lp-song[data-song="${CSS.escape(E.id)}"]`),M=v?.querySelector(".lp-song-main"),$=M?.querySelector(".lp-song-name");if(!v||!M||!$)return;y(),l=E.id;const T=W("input",{class:"lp-name-input lp-song-input",value:E.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${E.id}`});T.value=E.name;let S=!1;const F=async N=>{if(S)return;S=!0,l=null;const q=T.value.replace(/\s+/g," ").trim();N&&q&&q!==E.name&&await e.rename(E.id,q),await x({id:E.id,part:"rename"})};T.addEventListener("keydown",N=>{N.stopPropagation(),N.key==="Enter"?(N.preventDefault(),F(!0)):N.key==="Escape"&&(N.preventDefault(),F(!1))}),T.addEventListener("blur",()=>void F(!0)),v.setAttribute("data-renaming",""),v.insertBefore(T,M),T.focus(),T.select()}async function w(E,v){if(r?.id!==E.id){y(),v.textContent="Press again to delete",v.setAttribute("data-lp-ask",""),r={id:E.id,timer:setTimeout(y,Yc)};return}y();const M=p().findIndex(S=>h(S)?.dataset.song===E.id);await e.remove(E.id),await x();const $=p();($[Math.min(Math.max(M,0),$.length-1)]??t).focus({preventScroll:!0})}async function b(){d()||(i.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",L,!0)),c(""),await x({id:e.openId()})}function k(E=!1){d()&&(y(),i.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",L,!0),c(""),E&&t.focus({preventScroll:!0}))}function L(E){i.contains(E.target)||k()}return t.addEventListener("click",()=>d()?k():void b()),t.addEventListener("keydown",E=>{(E.key==="ArrowDown"||E.key==="ArrowUp")&&(E.preventDefault(),b().then(()=>{const v=p();(E.key==="ArrowUp"?v[v.length-1]:v[0])?.focus({preventScroll:!0})}))}),o.addEventListener("keydown",E=>{if(l)return;const v=p(),M=document.activeElement,$=h(M),T=v.findIndex(F=>h(F)===$);let S;if(E.key==="ArrowDown")S=v[(T+1)%v.length];else if(E.key==="ArrowUp")S=v[(T-1+v.length)%v.length];else if(E.key==="Home")S=v[0];else if(E.key==="End")S=v[v.length-1];else if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(!$)return;const F=g($).filter(j=>!j.disabled),N=F.indexOf(M),q=E.key==="ArrowRight"?1:-1;S=F[Math.min(F.length-1,Math.max(0,N+q))]}else if(E.key==="Escape"){E.preventDefault(),E.stopPropagation(),k(!0);return}else if(E.key==="Tab"){k(!1);return}else return;E.preventDefault(),S?.focus({preventScroll:!0})}),{el:i,button:t,open:b,close:k,isOpen:d,async refresh(){d()&&!l&&await x()}}}const Bo=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let Ie;function Xc(){if(Ie!==void 0)return Ie;Ie=null;try{Ie=Bo()?.attach("looper",{instance:1})??null}catch{Ie=null}return Ie}function Jc(){return Bo()?.countIn??null}function Qc(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const Zc="netcomposer.looper.hidden.v1",ed=50;function A(e,t={},...n){const s=document.createElement(e);for(const[o,i]of Object.entries(t))i!==void 0&&s.setAttribute(o,i);for(const o of n)o!==null&&o!==!1&&s.append(o);return s}const G=e=>({[qe]:dt(e)||void 0});function Y(e,t,n){const s=A("button",{type:"button",...t},e);return s.addEventListener("click",n),s}function Ce(e,t){return A("span",{class:"nc-label",...t?G(t):{}},e)}function jo(e,t,n,s,o,i=!1){const r=A("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const d=Y(l.label,{role:"radio","aria-checked":String(l.value===s),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==s&&o(l.value)});d.disabled=i,r.append(d)}return r}function Vn(e,t,n,s,o,i="lp-toggle"){return Y(t,{class:i,"aria-pressed":String(n),"data-lp-id":e,...G(s)},o)}function ha(e,...t){const n=document.activeElement,s=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(o=>!!o)),s&&e.querySelector(`[data-lp-id="${CSS.escape(s)}"]`)?.focus({preventScroll:!0})}function Ro(e,t,n){const s=A("div",{class:"lp-body","data-lp-module":e}),o=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=hc(o(),Zc),r=()=>{const l=i.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==s&&l.after(s)};return r(),{handle:i,mount:s,update(){i.update(o()),r()}}}const Q=Xc(),X=Hc({currentKey:Q?.storageKey?.("netcomposer.looper.current.v1")}),Be=await X.load();let Oo="",Gn;Be&&"session"in Be?Gn=Be.session:(Be&&"error"in Be&&(Oo=`Your last song didn't open: ${Be.error}. A new one is started.`),Gn=Co(Q?.studioTransport?.bpm()??120));function td(){let e=null;try{e=Q?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,s=o=>{n.has(o)||(n.add(o),t.setTarget(o,{role:"chord",on:!0,layer:!0}))};return{send(o,i){s(o),t.send(i,o)},controls(o,i){s(o),t.sendControls(i,o)},laps(o){let i=[];try{i=(Q?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{i=[]}for(const r of i)s(r),t.sendControls(o,r)},off(o){t.off(o===void 0?"stop":"restart",o)},release(o,i){n.has(o)&&t.release?.(i,o)},restart(){t.restart()}}}const C=new Pc(Gn,{host:Q,countIn:Jc(),load:Qc,now:ci,save:e=>X.save(e),sink:td()});C.notice=Oo;addEventListener("pagehide",()=>X.save(C.session,!0));let pt=null;const Ho=document.getElementById("app");Ho.classList.add("nc","nc-page");ic();const _o=A("header",{class:"nc-page-hd"},A("div",{},A("h1",{class:"nc-page-title"},A("span",{class:"lp-brand"},"LUPA")," ",A("span",{class:"nc-page-sep"},"/")," LOOPER ",A("span",{class:"nc-page-sep"},"/")," ",A("span",{class:"nc-mono"},"01")),A("p",{class:"nc-page-sub"},"A TRIKI instrument.")),A("div",{class:"nc-page-actions"},od(),Y("New song",{class:"nc-page-action","data-lp-id":"new-song",...G("new-song")},()=>ad()))),Vo=A("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),Go=A("footer",{class:"lp-foot lp-sub"},A("span",{class:"lp-notice",role:"status"}),A("span",{class:"lp-mono"},"netcomposer.looper.01"));Ho.append(_o,A("main",{class:"nc-page-body"},Vo),Go);let je=null;function nd(){return _o.querySelector('[data-lp-id="new-song"]')}function mn(e){const t=nd();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function ad(){if(C.passCount&&!je){mn(!0),je=setTimeout(()=>{je=null,mn(!1)},4e3);return}je&&clearTimeout(je),je=null,mn(!1),Ko(),C.notice="New song started. The last one stays in Songs.",ne()}function Ko(){C.newSong(),Pe=null,U="all"}function sd(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function od(){return pt=Uc({list:()=>X.list(),openId:()=>C.session.id,open:us,async rename(e,t){e===C.session.id?C.rename(t):await X.rename(e,t)},async remove(e){if(e===C.session.id){C.jamming&&C.stop(),await X.flush();const t=(await X.list()).find(s=>s.id!==e&&!s.error);(t?await us(t.id):"no song")&&Ko(),C.notice="Song deleted."}await X.remove(e),ne()},note:Q?`Songs save as you play, in this browser. Save the Studio’s scene (${sd()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),pt.el}async function us(e){if(C.jamming)return"Stop jamming to open another song.";await X.flush();const t=await X.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(C.openSession(t.session),X.setCurrent(t.session.id),Pe=null,U="all",C.notice=`“${t.session.name}” is open.`,ne(),null):"That song isn't in this browser any more."}function id(){pt?.button.setAttribute(qe,dt("songs").replace("{name}",C.session.name))}const Wo=A("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),ye=Q?.metronome,Yo=Jl({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((ye?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>ye?.set({volume:e/100})});Yo.el.setAttribute(qe,dt("volume"));ye?.onChange(()=>ne());function Ke(e,t,n,s,o,i=!1){const r=A("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e});for(const l of n){const d=A("option",{value:l.value},l.label);l.value===s&&(d.selected=!0),r.append(d)}return r.disabled=i,r.addEventListener("change",()=>o(r.value)),r}let we=null;function rd(e){if(we===null)return null;const t=e.session.song,n=we*P*z,s=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),o=s.length?Math.max(...s.map(l=>Math.floor(n/l.endTick))):we/t.bars,i=l=>{const d=we;we=null,l&&d&&C.setSong({bars:d,grow:l}),ne()},r=s.length;return A("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},A("span",{class:"lp-ask-title"},`Grow to ${we} bars?`),A("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),Y(`Repeat ×${Math.max(2,Math.round(o))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>i("repeat")),Y("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>i("once")),Y("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>i(null)))}function ld(e){const t=e.session.song,n=t.start==="wait",s=n?A("span",{class:"lp-sub","data-lp-id":"start-sub"},"Jam waits for the first sound from any instrument."):A("span",{class:"lp-sub lp-start-sub","data-lp-id":"start-sub"},t.countInBars?"One bar of clicks first. ":"No count-in: Pass 1 starts with the clock. ",Y(t.countInBars?"Off":"On",{class:"lp-loop-off","data-lp-id":"count-in",...G("count-in")},()=>C.setSong({countInBars:t.countInBars?0:1})));return A("div",{class:"lp-field"},Ce("Start","start"),jo("start","Start",[{value:"count-in",label:"Count-in"},{value:"wait",label:"Wait"}],n?"wait":"count-in",o=>C.setSong({start:o==="wait"?"wait":"count-in"}),e.jamming||e.waiting),s)}function cd(e){const t=e.session.song,n=[1,2,4,8,16].filter(o=>o<=Ge(t.bpm)&&(!e.locked||o>=t.bars)),s=t.quantize;ha(Wo,A("h3",{class:"lp-section-title"},"Setup"),A("div",{class:"lp-field"},Ce("Tempo","tempo"),A("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?A("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?A("span",{class:"lp-sub"},"Locked: the song has passes."):A("span",{class:"lp-sub"},"Follows the Studio.")),A("div",{class:"lp-field"},Ce("Length","bars"),jo("bars","Bars",n.map(o=>({value:String(o),label:String(o)})),String(we??t.bars),o=>{const i=Number(o);e.locked&&i>t.bars?(we=i,ne()):C.setSong({bars:i})},e.jamming),rd(e)??A("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${Ec(t)}`)),ld(e),ye?A("div",{class:"lp-row lp-toggles"},Vn("metronome","Metronome",ye.prefs().on,"metronome",()=>ye.set({on:!ye.prefs().on}))):null,ye?Yo.el:null,A("div",{class:"lp-pair"},A("label",{class:"lp-field"},Ce("Quantize","quantize"),Ke("quantize","Quantize",Wt.map(o=>({value:o,label:ua(o)})),s?.grid??"off",o=>C.setSong({quantize:o==="off"?null:{grid:o,strength:s?.strength??1}}))),A("label",{class:"lp-field"},Ce("Strength","strength"),Ke("strength","Strength",Yt.map(o=>({value:String(o),label:`${Math.round(o*100)}%`})),String(s?.strength??1),o=>s&&C.setSong({quantize:{grid:s.grid,strength:Number(o)}}),!s))))}const Uo=Ro("jam","Jam",()=>{const e=C.view(),t=e.session.song.loop,n=t?`loop ${We(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${C.passCount} / ${ee} passes`});function We(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const dd="http://www.w3.org/2000/svg",R=(e,t)=>{const n=document.createElementNS(dd,e);for(const[s,o]of Object.entries(t))n.setAttribute(s,o);return n},ut=44,Kn=2*Math.PI*ut,Xo=R("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),Jo=R("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(ut),"stroke-width":"3","stroke-dasharray":`0 ${Kn}`,transform:"rotate(-90 50 50)"}),Lt=R("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"}),Qo=R("circle",{class:"lp-ring-mark",cx:"50",cy:"6",r:"3.2"});Xo.append(R("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(ut),"stroke-width":"1"}),Jo,Lt,Qo);function ht(e=!1){return A("span",{class:"lp-dot","aria-hidden":"true",...e?{"data-armed":""}:{}})}function mt(e){const t=e.recIn;return t?t.bars?`${t.bars} bar${t.bars===1?"":"s"}`:`${t.beats} beat${t.beats===1?"":"s"}`:""}const hs=e=>e.phase==="armed"||e.record&&(e.phase==="idle"||e.phase==="waiting"||e.phase==="count-in"),Zo=A("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Ct=A("span",{class:"lp-pass","data-lp-id":"pass"}),pd=A("div",{class:"lp-ring"},Xo,A("div",{class:"lp-ring-mid"},Zo,Ct));function ei(e){const t=e.lapPos??0;Jo.setAttribute("stroke-dasharray",`${t*Kn} ${Kn}`);const n=t*2*Math.PI;Lt.setAttribute("cx",String(50+ut*Math.sin(n))),Lt.setAttribute("cy",String(50-ut*Math.cos(n))),Lt.style.visibility=e.lapPos===null?"hidden":"visible";const s=e.session.song.loop;Zo.textContent=e.countIn!==null?String(e.countIn):s?e.bar!==null?`${e.bar} · ${We(s)}`:We(s):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const o=e.phase==="waiting"?e.record?`WAITING · PASS ${e.nextPass}`:"WAITING":e.phase==="count-in"?"COUNT-IN":e.phase==="playing"?"PLAYING":e.phase==="armed"?e.recIn&&!e.recIn.bars?`IN ${e.recIn.beats}`:`IN ${mt(e).toUpperCase()}`:e.phase==="full"?`FULL · ${ee} / ${ee}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":e.record?`PASS ${e.nextPass}`:"PLAY",i=hs(e)&&e.phase!=="count-in",r=`${o}|${e.phase}|${i}`;Ct.dataset.key!==r&&(Ct.dataset.key=r,Ct.replaceChildren(...e.phase==="recording"?[ht()]:i?[ht(!0)]:[],o)),Qo.style.visibility=hs(e)?"visible":"hidden"}function ud(e){const t=A("div",{class:"nc-seg lp-mode",role:"radiogroup","aria-label":"Play or Record","data-lp-id":"mode"}),n=e.session.passes.length>=ee,s=e.phase==="recording"||e.phase==="paused"||e.phase==="full",o=(i,r,l)=>{const d=A("button",{type:"button",role:"radio","aria-checked":String(i),"data-lp-id":`mode-${r}`,...G(r==="record"&&n&&!i?"mode-full":`mode-${r}`)},...l);return d.addEventListener("click",()=>C.setRecord(r==="record")),r==="record"&&n&&!i&&(d.disabled=!0),d};return t.append(o(!e.record,"play",["Play"]),o(e.record,"record",[...s&&e.record?[ht()]:e.record?[ht(!0)]:[],"Record"])),t}function hd(e){const t=(o,i)=>A("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},A("b",{},o),i?` ${i}`:""),n=e.session.song.start==="wait",s=`bar ${e.recBar}`;return e.waiting?e.record?t("Play anything, on any instrument.",`Pass ${e.nextPass} starts on that beat. Press again to cancel.`):t("Play anything, on any instrument.","The loop starts on that beat. Press again to cancel."):e.jamming?e.phase==="playing"?t("Playing. Nothing is recorded.",`Shift+Space records from ${s}.`):e.phase==="armed"?t(`Recording from ${s}, in ${mt(e)}.`,"Press Record again to cancel."):e.phase==="recording"?t("Recording every lap.","Play (Shift+Space) stops recording now. This lap is kept."):null:e.session.passes.length?e.record?n?t("Record is on.",`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):t("Record is on.",e.session.song.countInBars?`Jam counts in, then Pass ${e.nextPass} records from ${s}.`:`Jam starts, and Pass ${e.nextPass} records from ${s}.`):n?t("Play.","Jam waits for the first sound, then plays. Nothing is recorded."):t("Play.","Jam plays the loop. Nothing is recorded. Shift+Space turns Record on."):n?A("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):null}function md(e){const t=e.session.song.start==="wait",n=Y(e.waiting?"WAITING":e.jamming?"STOP":"JAM",{class:e.waiting?"nc-btn lp-big lp-waiting":"nc-btn lp-big","data-lp-id":"jam",...G(e.waiting?"waiting":e.jamming?"stop":t?"jam-wait":"jam"),...e.jamming||e.waiting?{}:{"data-jam":""},...e.waiting?{"aria-pressed":"true"}:{}},()=>C.toggle());n.disabled=!Q;const s=Y("UNDO",{class:"nc-btn","data-lp-id":"undo",...G("undo")},()=>C.undo());s.disabled=!e.lapHasNotes&&!C.passCount;const o=Y("REDO",{class:"nc-btn","data-lp-id":"redo",...G("redo")},()=>C.redo());o.disabled=!e.canRedo,ei(e);const i=e.session.song.loop,r=e.pendingLoop,l=r!==void 0?A("p",{class:"lp-sub","data-lp-id":"loop-next"},r?`Loop ${We(r)} from the next lap.`:"Loop off from the next lap."):null,d=i&&r===void 0?A("div",{class:"lp-loop-line"},A("span",{},`Loop ${We(i)}`),Y("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...G("loop-off")},()=>C.setLoop(null))):null;ha(Uo.mount,A("div",{class:"lp-jam-stack"},pd,ud(e),n,A("div",{class:"lp-two"},s,o),d,l,Q?hd(e):A("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),Wo)}const Ut=Ro("passes","Passes",()=>`${C.passCount} / ${ee}`);let Pe=null,U="all",kt={at:0,bar:0};const fd={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},Ye={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},Ue=e=>e.split("#")[0]??e,gd=e=>Ye[Ue(e)]?.noun[0]==="hit",ma=e=>e.kind===void 0||e.kind==="note";function ze(e){const[t=e,n]=e.split("#"),s=fd[t]??t.toUpperCase();return n?`${s} ${n}`:s}function bd(e,t){const n=new Map;for(const o of e.events)o.inst===t&&ma(o)&&o.name&&n.set(o.name,(n.get(o.name)??0)+1);const s=[...n].sort((o,i)=>i[1]-o[1]).map(([o])=>o);return s.length?s.length===1?s[0]:`${s[0]} +${s.length-1}`:""}function Wn(e,t){let n=0,s=0,o=0;for(const d of e.events)d.inst===t&&(d.kind==="slot"?s++:d.kind==="take"?o++:ma(d)&&n++);const[i,r]=Ye[Ue(t)]?.noun??["note","notes"],l=[];return o&&l.push(o===1?"voice":`${o} takes`),n&&l.push(`${n} ${n===1?i:r}`),s&&l.push(`${s} slot ${s===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Xt=new Map,wd=1;function fa(e,t){const n=t.bars,s=z,o=_(t),i=it(e,t),r=rt(e,t),l=i.length>1?e.endTick:o,d=S=>r&&S+r>=l?S+r-l:S+r,c=t.loop,p=c?(c.from-1)*P*z:0,h=c?c.to*P*z:o,g=(S,F)=>(F>0?.45:1)*(S>=p-Kt&&S<h?1:.35),f=1e3,y=34,x=R("svg",{class:"lp-strip",viewBox:`0 0 ${f} ${y}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});c&&x.append(R("rect",{class:"lp-strip-loop",x:String(p/o*f),y:"0",width:String((h-p)/o*f),height:String(y)}));const u=n*P;for(let S=1;S<u;S++){const F=String(S*f/u);S%P!==0&&n>8||x.append(S%P===0?R("line",{class:n>8&&S%(4*P)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:F,x2:F,y1:"0",y2:String(y)}):R("line",{class:"lp-strip-beat",x1:F,x2:F,y1:String(y/2-2),y2:String(y/2+2)}))}const m=e.events.filter(ma),w=[],b=s/4*wd,k=new Set(m.filter(S=>gd(S.inst)).map(S=>S.inst)),L=new Map,E=[...new Set(m.filter(S=>k.has(S.inst)).map(S=>S.note))].sort((S,F)=>F-S);E.length>=2&&E.length<=4&&E.forEach((S,F)=>L.set(S,F));const v=m.filter(S=>!k.has(S.inst)).map(S=>S.note);let M=Math.min(...v)-2,$=Math.max(...v)+2;if($-M<12){const S=($+M)/2;M=S-6,$=S+6}for(const S of i)for(const F of m){const N=S+d(F.at);if(N>=o||F.at>=e.endTick)continue;const q=N/o*f,j=((.35+.65*F.vel)*g(N,S)).toFixed(2);if(k.has(F.inst)){const O=L.get(F.note);let I,D;if(O===void 0){const B=4+F.vel*9;I=y/2-B,D=y/2+B}else{const B=6+O*(y-12)/Math.max(1,L.size-1);I=B-3,D=B+3}x.append(R("line",{class:"lp-strip-hit",x1:q.toFixed(1),x2:q.toFixed(1),y1:I.toFixed(1),y2:D.toFixed(1),"stroke-opacity":j})),w.push(N/o,Math.min(1,(N+b)/o))}else{const O=Math.min(o,N+Math.max(1,F.len))/o*f,I=(4+(1-(F.note-M)/($-M))*(y-8)).toFixed(1);x.append(R("line",{class:"lp-strip-note",x1:q.toFixed(1),x2:Math.max(q+.1,O-2).toFixed(1),y1:I,y2:I,"stroke-opacity":j})),w.push(N/o,Math.min(1,(N+Math.max(b,F.len))/o))}}const T=S=>r?[{base:S+r,lo:S,hi:S+l},{base:S+r-l,lo:S,hi:S+l}]:[{base:S,lo:S,hi:o}];for(const S of i)for(const F of T(S))for(const N of e.events){if(N.kind!=="take")continue;const q=F.base+N.at,j=Math.min(o,q+N.len,F.base+e.endTick,F.hi),O=Math.max(q,F.lo);if(O>=o||j<=O)continue;const I=O/o*f,D=j/o*f,B=N.peaks?.length?N.peaks:[.35,.35],he=Math.floor((O-q)/N.len*(B.length-1)),de=Math.ceil((j-q)/N.len*(B.length-1)),me=B.slice(Math.max(0,he),Math.max(he+2,de+1)),ke=me.length>=2?me:[.35,.35],Je=ke.length,Qe=y/2,ii=Ee=>Math.max(.6,Ee*(y/2-2)),ba=ke.map((Ee,Ze)=>[I+(D-I)*Ze/Math.max(1,Je-1),ii(Ee)]),ri=ba.map(([Ee,Ze])=>`${Ee.toFixed(1)},${(Qe-Ze).toFixed(1)}`),li=[...ba].reverse().map(([Ee,Ze])=>`${Ee.toFixed(1)},${(Qe+Ze).toFixed(1)}`);x.append(R("path",{class:"lp-strip-voice",d:`M${ri.join(" L")} L${li.join(" L")} Z`,opacity:g(O,S).toFixed(2)})),w.push(O/o,Math.min(1,(O+N.len)/o))}for(const S of i)for(const F of e.events){if(F.kind!=="slot"||S+d(F.at)>=o)continue;const N=((S+d(F.at))/o*f).toFixed(1);x.append(R("line",{class:"lp-strip-slot",x1:N,x2:N,y1:"0",y2:String(y)}))}if(e.endTick<o&&!e.repeat){const S=(d(e.endTick)/o*f).toFixed(1);x.append(R("line",{class:"lp-strip-end",x1:S,x2:S,y1:"8",y2:String(y-8)}))}return Xt.set(e.id,Float32Array.from(w)),x}function fn(e){if(e.length<=6)return e;const[t=e,n]=e.split(" ");return n?`${t.slice(0,6)} ${n.slice(0,3)}`:t.slice(0,3)}function ti(e){const[t,n]=e;return t?n?e.length===2?`${fn(t.label)} + ${fn(n.label)}`:`${fn(t.label)} + ${e.length-1}`:t.label:""}function yd(e){const t=e.knobs??[],n=A("span",{class:"lp-knob-tag","aria-label":`Knobs: ${t.map(o=>o.label).join(", ")}`,...G("knob-pass")},ti(t)),s=R("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return s.append(R("circle",{cx:"5",cy:"5",r:"4",fill:"none",stroke:"currentColor"}),R("line",{x1:"5",y1:"5",x2:"5",y2:"1.5",stroke:"currentColor"})),n.prepend(s),n}function ni(){const e=A("span",{class:"lp-knob-tag lp-pattern-tag","data-lp-pattern":"",...G("pattern-pass")},"Pattern"),t=R("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return t.append(R("rect",{x:"0.5",y:"0.5",width:"4",height:"4",fill:"currentColor"}),R("rect",{x:"5.5",y:"0.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),R("rect",{x:"0.5",y:"5.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),R("rect",{x:"5.5",y:"5.5",width:"4",height:"4",fill:"currentColor"})),e.prepend(t),e}function xd(e,t,n){const s=fa({...e,events:[]},t),o=1e3,i=34,r=_(t),l=it(e,t),d=rt(e,t),c=l.length>1?e.endTick:r,p=f=>((1-f)*(i-4)+2).toFixed(1),h=f=>(f/r*o).toFixed(1);s.setAttribute("aria-label",`${ti(e.knobs??[])} across the loop`),n&&s.append(R("rect",{class:"lp-strip-hand",x:(n.from*o).toFixed(1),y:"0",width:(Math.max(0,n.to-n.from)*o).toFixed(1),height:String(i)}));const g=[];if((e.knobs??[]).forEach((f,y)=>{const x=se(f),u=e.events.filter(v=>v.kind==="param"&&se(v)===x&&v.at<e.endTick),m=v=>d&&v+d>=c?v+d-c:v+d,w=v=>{let M=l.length>1?v-Math.floor(v/c)*c:v;if(M-=d,M<0&&(M+=c),M>=e.endTick)return null;let $=f.base;for(const T of u){if(T.at>M)break;$=T.value}return $},b=new Set([0,r]);for(const v of l){b.add(v),b.add(Math.min(r,v+c)),b.add(Math.min(r,v+e.endTick)),b.add(v+m(0));for(const M of u)b.add(v+m(M.at))}const k=[...b].filter(v=>v>=0&&v<=r).sort((v,M)=>v-M),L=[];let E=[];for(let v=0;v<k.length-1;v++){const M=k[v],$=k[v+1];if($<=M)continue;const T=w(M);if(T===null){E.length&&L.push(E),E=[];continue}E.push([M,T],[$,T])}E.length&&L.push(E);for(const v of L){if(v.length<2)continue;const M=v.map(([$,T])=>`${h($)},${p(T)}`).join(" ");y===0&&s.append(R("polygon",{class:"lp-strip-area",points:`${h(v[0][0])},${i} ${M} ${h(v.at(-1)[0])},${i}`})),s.append(R("polyline",{class:`lp-strip-curve${y?" lp-strip-curve-2":""}`,points:M}))}for(const v of u)for(const M of l){const $=M+(v.at+d)%c;g.push($/r,Math.min(1,($+z/4)/r))}}),e.endTick<r&&!e.repeat){const f=((d&&e.endTick+d>=c?e.endTick+d-c:e.endTick+d)/r*o).toFixed(1);s.append(R("line",{class:"lp-strip-end",x1:f,x2:f,y1:"8",y2:String(i-8)}))}return Xt.set(e.id,Float32Array.from(g)),s}function Et(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const Xe={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function ga(e){const t=R("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(R("path",{d:e})),t}function _t(e,t,n,s,o){const i=Y("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...s},o);return i.append(ga(n)),i}let ms=null;function vd(e){Pe===e.id&&(Pe=null);const t=C.deletePass(e.id);if(!t)return;ms?.close();const n=ac({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>C.restorePass(t.pass,t.index),anchor:Ut.mount});n.el.setAttribute("data-lp-id","delete-toast"),ms=n}function $d(e,t,n=null){const s=C.session.song,o=On(e),i=P*s.ppq,r=Pe===e.id,l=[...new Set(e.instruments)],d=Y("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(r)},()=>{Pe=r?null:e.id,ne()}),c=A("span",{class:"lp-pass-line"},A("span",{class:"lp-pass-title"},e.name));for(const w of l)c.append(A("span",{class:"lp-inst","data-inst":Ye[Ue(w)]?.token??""},ze(w)));const p=[];for(const w of l){const b=bd(e,w);p.push(b?`${b} · ${Wn(e,w)}`:Wn(e,w))}l.length||p.push("Empty"),e.mute&&p.push("muted");const h=o?A("span",{class:"lp-pass-sub lp-knob-sub"},yd(e),e.mute?A("span",{},"Muted"):null,n?A("span",{class:"lp-hand-note",...G("you-have-it")},"you have it"):null):e.pattern?A("span",{class:"lp-pass-sub lp-knob-sub"},A("span",{class:"lp-pass-sub-text"},p.join(" · ")),ni()):A("span",{class:"lp-pass-sub"},p.join(" · "));d.append(A("span",{class:"lp-now","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},c,h));const g=A("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...G("pass-volume")});g.value=String(Math.round(e.volume*100));const f=A("span",{class:"lp-db","data-lp-id":`db-${e.id}`},Et(e.volume));g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",Et(e.volume)),g.addEventListener("input",()=>{const w=Number(g.value)/100;f.textContent=Et(w),g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",Et(w)),C.editPass(e.id,{volume:w})});const y=A("div",{class:"lp-ms-pair"},Vn(`mute-${e.id}`,"M",e.mute,"mute",()=>C.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),Vn(`solo-${e.id}`,"S",e.solo,"solo",()=>C.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));y.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),y.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const x=_t(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,Xe.star,{"aria-pressed":String(e.kept),...G("star")},()=>C.editPass(e.id,{kept:!e.kept})),u=_t(`delete-${e.id}`,`Delete ${e.name}`,Xe.trash,G("delete"),()=>vd(e)),m=A("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...r?{"data-open":""}:{}},d,A("div",{class:"lp-tools"},Ad(e,s),Sd(e,s),y,A("div",{class:"lp-acts"},x,u)),A("div",{class:"lp-strip-box"},o?xd(e,s,n):fa(e,s),A("span",{class:"lp-head","aria-hidden":"true"})),o?A("div",{class:"lp-play"},A("div",{class:"lp-q","data-none":"","aria-hidden":"true"}),A("div",{class:"lp-vol","data-knob":"","aria-hidden":"true"})):A("div",{class:"lp-play"},kd(e,s),A("div",{class:"lp-vol"},g,f)));if(n&&m.setAttribute("data-hand",Ye[Ue(l[0]??"")]?.token??""),r){const w=new Set;for(const L of e.events)w.add(Math.floor(L.at/i));const b=A("div",{class:"lp-bars",style:`--lp-bars: ${s.bars}`});for(let L=0;L<s.bars;L++)b.append(A("span",w.has(L)?{"data-on":""}:{},String(L+1)));const k=A("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});k.addEventListener("change",()=>C.editPass(e.id,{name:k.value})),m.append(A("div",{class:"lp-sheet"},k,A("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),A("span",{class:"lp-sub"},o?`Moves ${l.map(ze).join(" and ")}'s ${(e.knobs??[]).map(L=>L.label).join(", ")}. Muted, they go back where they were.`:`Plays through ${l.map(ze).join(" and ")||"its instrument"}'s current sound.`),o?null:Ed(e,s),b))}return m}function kd(e,t){const n=Ke(`pq-${e.id}`,`${e.name} quantize`,No(t,!0),Do(e),o=>C.editPass(e.id,{quantize:Po(e,t,o)}));n.setAttribute(qe,dt("pass-quantize"));const s=[n];if(qo(e)&&e.quantize){const o=Ke(`ps-${e.id}`,`${e.name} strength`,zo(),String(e.quantize.strength),i=>{const r=Io(e,i);r&&C.editPass(e.id,{quantize:r})});o.setAttribute(qe,dt("pass-strength")),s.push(o)}return A("div",{class:"lp-q",role:"group","aria-label":`${e.name} quantize`,...e.quantize?{"data-own":""}:{}},...s)}function Ed(e,t){const n=qo(e)&&e.quantize?e.quantize:null;return A("div",{class:"lp-pair lp-sheet-q"},A("label",{class:"lp-field"},Ce("Quantize","pass-quantize"),Ke(`sq-${e.id}`,`${e.name} quantize`,No(t),Do(e),s=>C.editPass(e.id,{quantize:Po(e,t,s)}))),A("label",{class:"lp-field"},Ce("Strength","pass-strength"),Ke(`ss-${e.id}`,`${e.name} strength`,zo(),String(e.quantize?.strength??t.quantize?.strength??1),s=>{const o=Io(e,s);o&&C.editPass(e.id,{quantize:o})},!n)))}function Ad(e,t){const n=e.shift??0,s=kc(e,t),o=c=>`${Math.abs(c)} ${Math.abs(c)===1?"bar":"bars"}`,i=c=>C.editPass(e.id,{shift:Math.max(-s,Math.min(s,n+c))}),r=_t(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,Xe.earlier,n<=-s?{disabled:""}:{},()=>i(-1)),l=_t(`shift-later-${e.id}`,`Move ${e.name} a bar later`,Xe.later,n>=s?{disabled:""}:{},()=>i(1)),d=n===0?"0":n>0?`+${n}`:`−${-n}`;return A("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${o(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...G("shift")},r,A("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},d),l)}function Sd(e,t){const n=_(t);if(e.endTick>=n)return A("span",{class:"lp-repeat-none","aria-hidden":"true"});const s=Math.ceil(n/e.endTick),o=!!e.repeat,i=Math.round(e.endTick/(P*z)),r=Y(o?`×${s}`:"once",{class:"lp-repeat","aria-pressed":String(o),"aria-label":o?`${e.name} repeats every ${i} ${i===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...G("repeat")},()=>C.editPass(e.id,{repeat:!o}));return o&&r.prepend(ga(Xe.loop)),r}function Md(e){const t=e.session.song,n=t.bars,s=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,o=A("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...G("ruler")}),i=A("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let m=1;m<=n;m++){const w=A("span",s&&m>=s.from&&m<=s.to?{"data-in":""}:{},String(m));r.push(w),i.append(w)}const l=A("div",{class:"lp-ruler-lane"});for(let m=1;m<n;m++)l.append(A("span",{class:"lp-ruler-tick",style:`--lp-at: ${m}`}));const d=A("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),c=m=>{d.hidden=!m,m&&(d.style.setProperty("--lp-from",String(m.from-1)),d.style.setProperty("--lp-to",String(m.to))),r.forEach((w,b)=>{m&&b+1>=m.from&&b+1<=m.to?w.setAttribute("data-in",""):w.removeAttribute("data-in")})};c(s);const p=A("span",{class:"lp-ruler-hint",role:"status"}),h="Drag across bars to repeat them";let g;const f=m=>{p.textContent=m,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(g),g=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=h,p.hidden=!!t.loop},3e3)},y=m=>{const w=A("button",{type:"button",class:"lp-loop-handle","data-end":m,"aria-label":m==="from"?"Loop start":"Loop end","data-lp-id":`loop-${m}`});return w.addEventListener("keydown",b=>{const k=t.loop;if(!k||b.key!=="ArrowLeft"&&b.key!=="ArrowRight")return;b.preventDefault();const L=b.key==="ArrowLeft"?-1:1,E={...k};m==="from"?E.from=Math.max(1,Math.min(k.to,k.from+L)):E.to=Math.min(n,Math.max(k.from,k.to+L)),C.setLoop(E)}),w.addEventListener("pointerdown",b=>{const k=s;k&&(b.stopPropagation(),u(b,L=>m==="from"?{from:Math.min(L,k.to),to:k.to}:{from:k.from,to:Math.max(L,k.from)}))}),w};d.append(y("from"),y("to"));const x=m=>{const w=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((m-w.left)/Math.max(1,w.width)*n)+1))},u=(m,w)=>{if(e.jamming&&!Q){f("Stop jamming to change the loop");return}o.setPointerCapture?.(m.pointerId),o.setAttribute("data-dragging","");const b=x(m.clientX);let k=!1,L=w(b);c(L);const E=M=>{x(M.clientX)!==b&&(k=!0),L=w(x(M.clientX)),c(L)},v=()=>{o.removeEventListener("pointermove",E),o.removeEventListener("pointerup",v),o.removeEventListener("pointercancel",v),o.removeAttribute("data-dragging");for(const T of r)T.removeAttribute("data-hover");const M=performance.now();if(!k&&kt.bar===b&&M-kt.at<450){kt={at:0,bar:0},C.setLoop(null);return}if(kt=k?{at:0,bar:0}:{at:M,bar:b},L.from===1&&L.to===n&&!t.loop){c(void 0),f("That's the whole song. Pick fewer bars.");return}C.setLoop(L)};o.addEventListener("pointermove",E),o.addEventListener("pointerup",v),o.addEventListener("pointercancel",v)};return o.addEventListener("pointerdown",m=>{if(m.button!==0)return;const w=x(m.clientX);u(m,b=>({from:Math.min(w,b),to:Math.max(w,b)}))}),o.addEventListener("pointermove",m=>{if(o.hasAttribute("data-dragging"))return;const w=x(m.clientX);r.forEach((b,k)=>{k+1===w?b.setAttribute("data-hover",""):b.removeAttribute("data-hover")})}),o.addEventListener("pointerleave",()=>{for(const m of r)m.removeAttribute("data-hover")}),p.textContent=h,p.hidden=!!s||n<2,l.append(p,d),o.append(i,l),o}function Td(e){if(e.length<2)return null;const t=new Map;for(const i of e)for(const r of new Set(i.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(i=>i.kept).length;U!=="all"&&U!=="starred"&&!t.has(U)&&(U="all"),U==="starred"&&!n&&(U="all");const s=(i,r,l,d={})=>{const c=Y("",{class:"lp-chip","aria-pressed":String(U===i),"data-lp-id":`filter-${i}`,...d},()=>{U=U===i?"all":i,ne()});return c.append(r,A("span",{class:"lp-chip-n"},String(l))),c},o=A("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},s("all","All",e.length));for(const[i,r]of[...t].sort((l,d)=>ze(l[0]).localeCompare(ze(d[0]))))o.append(s(i,ze(i),r,{"data-inst":Ye[Ue(i)]?.token??""}));return n&&o.append(s("starred",ga(Xe.star),n,{"aria-label":"Starred"})),o}function Ld(e,t){const n=`Pass ${e.n}`,s={id:`live-${e.inst}`,n:e.n,name:n,endTick:_(t),instruments:[e.inst],events:e.events};return A("div",{class:"lp-pass-row lp-live","data-live":"","data-live-pattern":e.inst},A("span",{class:"lp-pass-name"},A("span",{class:"lp-dot","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},A("span",{class:"lp-pass-line"},A("span",{class:"lp-pass-title"},n),A("span",{class:"lp-inst","data-inst":Ye[Ue(e.inst)]?.token??""},ze(e.inst))),A("span",{class:"lp-pass-sub lp-knob-sub"},A("span",{class:"lp-pass-sub-text"},`Recording · ${Wn(s,e.inst)}`),ni()))),A("div",{class:"lp-strip-box"},fa(s,t),A("span",{class:"lp-head","aria-hidden":"true"})))}function Cd(e){const t=e.session.passes,n=t.some(c=>c.solo),s=t.filter(c=>U==="all"?!0:U==="starred"?c.kept:c.instruments.includes(U)),o=A("div",{class:"lp-passes","data-lp-id":"pass-list"});if((t.length||e.session.song.loop)&&o.append(A("div",{class:"lp-pass-head"},Md(e))),e.phase==="recording"&&(e.lapHasNotes||!e.livePatterns.length)&&o.append(A("div",{class:"lp-pass-row lp-live","data-live":""},A("span",{class:"lp-pass-name"},A("span",{class:"lp-dot","aria-hidden":"true"}),A("span",{class:"lp-pass-text"},A("span",{class:"lp-pass-title"},`Pass ${e.nextPass+e.livePatterns.length}`),A("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),e.phase==="recording")for(const c of[...e.livePatterns].reverse())o.append(Ld(c,e.session.song));const i=e.phase==="armed"?`Recording from bar ${e.recBar} · in ${mt(e)}`:e.record&&t.length&&(e.phase==="idle"||e.phase==="waiting")?e.session.song.start==="wait"?"Records from the first sound":e.session.song.countInBars?`Records from bar ${e.recBar} after the count-in`:`Records from bar ${e.recBar}`:e.record&&t.length&&e.phase==="count-in"?`Records from bar ${e.recBar} after the count-in`:null;i&&o.append(A("div",{class:"lp-pass-row lp-live","data-live":"","data-armed":""},A("span",{class:"lp-pass-name"},ht(!0),A("span",{class:"lp-pass-text"},A("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),A("span",{class:"lp-pass-sub","data-lp-id":"armed-text"},i))))),Xt.clear();const r=new Map;for(const c of e.hands){const p=r.get(c.pass);r.set(c.pass,p?{from:Math.min(p.from,c.from),to:Math.max(p.to,c.to)}:c)}for(const c of[...s].reverse())o.append($d(c,n,r.get(c.id)??null));!t.length&&e.phase!=="recording"?o.append(A("p",{class:"lp-sub","data-lp-id":"passes-empty"},e.waiting?"Waiting for the first sound.":"No passes yet. Press Jam (or Space) and play.")):t.length&&!s.length&&o.append(A("p",{class:"lp-sub"},"No passes here."));const l=t.filter(c=>!c.kept).length,d=Y(`CLEAR UNSTARRED${l?` (${l})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...G("clear-unkept")},()=>C.clearUnkept());d.disabled=!l,ha(Ut.mount,Td(t),o,t.length?A("div",{class:"lp-between"},A("span",{class:"lp-row"},d,A("span",{class:"lp-sub"},"Starred passes stay.")),A("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${ee}`)):null),at=""}let at="";function Fd(e){const t=Ut.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),at){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");at=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const s=e.session.passes.some(l=>l.solo),o=[];for(const l of e.session.passes){if(l.mute||s&&!l.solo)continue;const d=Xt.get(l.id);if(d){for(let c=0;c<d.length;c+=2)if(d[c]<=n&&n<d[c+1]){o.push(l.id);break}}}const i=o.join("|");if(i===at)return;at=i;const r=new Set(o);for(const l of t.querySelectorAll("[data-lp-pass]")){const d=r.has(l.dataset.lpPass??"");d!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",d)}}const ai=[Uo,Ut];mc(Vo,ai.map(e=>e.handle),"adjacent");let fs="";function si(e){const t=e.session.song.loop,n=e.bar===null?"":t?`Bar ${e.bar} · loop ${We(t)}`:`Bar ${e.bar} / ${e.session.song.bars}`,s=e.phase==="waiting"?"Lupa · waiting for the first sound":e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.phase==="playing"?`Lupa · Play · ${n}`:e.phase==="armed"?`Lupa · Rec from bar ${e.recBar} · in ${mt(e)}`:`Lupa · ${n} · Pass ${e.nextPass}`:null,o=s===null?null:e.phase==="armed"?"armed":e.phase==="recording"?"rec":null,i=`${s}|${e.phase}|${o}`;if(i!==fs){fs=i;try{Q?.readout?.(s,o?{dot:o}:void 0),Q?.chip?.(e.waiting?{text:"Waiting"}:e.jamming?e.phase==="playing"?{text:e.bar!==null?`Play · bar ${e.bar}`:"Play"}:e.phase==="armed"?{text:`Rec in ${mt(e)}`,armed:!0}:{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:C.passCount?{text:`${C.passCount} passes`}:null)}catch{}}}function ne(){const e=C.view();cd(e),md(e),Cd(e);for(const n of ai)n.update();const t=Go.querySelector(".lp-notice");t&&(t.textContent=e.notice),id(),si(e)}C.onChange(ne);document.addEventListener("keydown",e=>{if(e.code!=="Space"||!e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||(e.preventDefault(),e.repeat||C.toggleRecord())});setInterval(()=>{C.tick()&&ne(),C.jamming||C.syncTempo()},ed);function oi(){const e=C.view();(e.jamming||e.waiting)&&(ei(e),si(e)),Fd(e),requestAnimationFrame(oi)}requestAnimationFrame(oi);ne();Q?.providePreset?.({format:"nc-song-looper",version:ca,get:()=>structuredClone(C.session),async set(e){const t=pa(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;C.jamming&&C.stop(),await X.flush();const n=await X.adopt(t.session);C.openSession(n),X.setCurrent(n.id),Pe=null,U="all",C.notice=`“${n.name}” is open, from the Studio’s scene.`,ne(),pt?.refresh()}});window.__looper={looper:C,store:X,songs:()=>pt,view:()=>C.view(),get hosted(){return!!Q}};
