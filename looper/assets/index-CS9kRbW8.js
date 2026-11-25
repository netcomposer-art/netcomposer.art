(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();function zo(){return(performance.timeOrigin+performance.now())/1e3}var Do="nc-ui",qo={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},pa={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Ot={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Po={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ee={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Io={light:{color:qo.color,semantic:pa,component:Ot,runtime:Po},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Nn=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],lt=e=>`--${Do}-${e}`,Bs="data-nc-theme",Ia="nc-ui-theme-change",Bo="(prefers-color-scheme: dark)",ua=e=>e?.documentElement??null,Rs=e=>e?.defaultView?.matchMedia?.(Bo)??null,Ro=e=>e==="light"||e==="dark"?e:"system";function jo(e=globalThis.document){return Ro(ua(e)?.getAttribute(Bs))}function zn(e=globalThis.document){let t=jo(e);return t!=="system"?t:Rs(e)?.matches?"dark":"light"}var js="data-nc-skin",Oo=(Nn.find(e=>e.default)??Nn[0])?.id??"prussian",Ho=e=>Nn.some(t=>t.id===e)?e:Oo;function _o(e=globalThis.document){return Ho(ua(e)?.getAttribute(js))}function Os(e,t=globalThis.document){let n=ua(t);if(!n)return()=>{};let a=()=>`${zn(t)} ${_o(t)}`,i=a(),o=()=>{let d=a();d!==i&&(i=d,e(zn(t)))},r=t.defaultView?.MutationObserver,l=r?new r(o):null;l?.observe(n,{attributes:!0,attributeFilter:[Bs,js]});let c=Rs(t);return c?.addEventListener?.("change",o),t.addEventListener(Ia,o),()=>{l?.disconnect(),c?.removeEventListener?.("change",o),t.removeEventListener(Ia,o)}}var Dn=pa["label-on-fill-dark"],Ba=pa["label-on-fill-light"],Vo=Ee["label-min-contrast"],Uo=/^#[0-9a-f]{6}$/i,Ko=e=>typeof e=="string"&&Uo.test(e),Dt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Ra(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),i=o=>{let r=(o+e/30)%12;return n-a*Math.max(-1,Math.min(r-3,9-r,1))};return`#${Dt(i(0)*255)}${Dt(i(8)*255)}${Dt(i(4)*255)}`}function Hs(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,a),o=Math.min(t,n,a),r=(i+o)/2,l=i-o;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((i===t?60*((n-a)/l%6):i===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function ja(e){let[t,n,a]=[1,3,5].map(i=>{let o=parseInt(e.slice(i,i+2),16)/255;return o<=.03928?o/12.92:((o+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function qn(e,t){let[n,a]=[ja(e),ja(t)].sort((i,o)=>o-i);return(n+.05)/(a+.05)}var Ht=e=>qn(e,Dn)>=qn(e,Ba)?Dn:Ba;function _s(e,t,n,a=Vo){let i=Ra(e,t,n),o=Ht(i)===Dn?1:-1;for(let r=0;r<40&&qn(i,Ht(i))<a;r++)n+=o*.01,i=Ra(e,t,n);return i}function Wo(e){let{h:t,s:n}=Hs(e),a=_s(t,Math.min(n,Ee["surprise-on-max-saturation"]),Ee["surprise-on-lightness"]);return{fill:e,ink:Ht(e),on:a,onInk:Ht(a)}}var Yo=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Go(e,t=Math.random){let[n,a]=Ee["surprise-saturation"],[i,o]=Ee["surprise-lightness"],r=Ee["surprise-min-hue-gap"],l=Ko(e)?Hs(e).h:null,c=t()*360;return l!==null&&Yo(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),_s(c,n+t()*(a-n),i+t()*(o-i))}function Jo(e){if(!e)return null;let t=Wo(e);return{[lt("surprise-fill")]:t.fill,[lt("surprise-ink")]:t.ink,[lt("surprise-on")]:t.on,[lt("surprise-on-ink")]:t.onInk}}var Xo=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Qo=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Oa(e){let[t,n,a]=[1,3,5].map(l=>Xo(parseInt(e.slice(l,l+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),o=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*i+.793617785*o-.0040720468*r,1.9779984951*i-2.428592205*o+.4505937099*r,.0259040371*i+.7827717662*o-.808675766*r]}function Zo([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,o=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*i+.2309699292*o,-1.2684380046*a+2.6097574011*i-.3413193965*o,-.0041960863*a-.7034186147*i+1.707614701*o].map(r=>Dt(Qo(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var er=Ee["velocity-range"],Vs={min:Ot.rhythm["velocity-min"],max:Ot.rhythm["velocity-max"]},Ha=Object.fromEntries(Object.entries(Io).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function tr(e,t=Vs){let[n,a]=er,i=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,o=(i-n)/(a-n),r=t.ink??Ot.rhythm["step-cell-ink"];if(o<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:r};if(o>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:r};let l=Oa(t.min),c=Oa(t.max);return{velocity:i,t:o,fill:Zo(l.map((d,p)=>d+(c[p]-d)*o)),ink:r}}function _a(e,t=Vs){return{[lt("velocity-fill")]:tr(e,t).fill}}var nr={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ar={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},sr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},ir={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},sn={};for(let[e,t]of Object.entries(ar))sn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(ir))sn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(sr))sn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(nr.renames.map(e=>[e.old,e.new]));function Us(e){let t=sn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function _(e){return Us(e).prop}function s(e){return`var(${_(e)})`}function or(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(_(t)));return Number.isFinite(n)?n:0}function G(e,t){let n=Us(t),a=e.ownerDocument??document,i=a.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let o=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=o:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=o:i.style.color=o,(e instanceof Element?e:a.documentElement).append(i);let r=(a.defaultView??window).getComputedStyle(i),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return i.remove(),l}function Ks(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function rr(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=s("font-ui"),n.style.fontSize=s("label-size"),n.style.fontWeight=s("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var lr="[data-modulated], [data-modulated] *";function pn(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Va(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${s("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${s("hairline")} solid ${s("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function un(e){return`  background-image: conic-gradient(from -26.565deg at 50% 100%, ${s(e)} 53.13deg, transparent 0);`}function cr(){let e=a=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${a}"],
    .nc-ui-fx[data-nc-depth="${a}"] {
      background: ${s(`module-bg-stack-${a}`)};
      ${_("text-sub")}: ${s(`module-sub-stack-${a}`)};
      ${_("divider")}: ${s(`module-div-stack-${a}`)};
      ${_("slider-track")}: ${s(`module-div-stack-${a}`)};
    }`,t=a=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${a}"] { background: ${s(`module-bg-adjacent-${a}`)}; }`,n=a=>a<4?`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] { background: ${s(`module-bg-adjacent-${a+1}`)}; }`:`.nc-module[data-nc-shade="${a}"] .nc-section[data-nc-inset="true"] {
      background: ${s("module-bg-stack-1")};
      ${_("text-sub")}: ${s("module-sub-stack-1")};
      ${_("divider")}: ${s("module-div-stack-1")};
    }`;return`
*, *::before, *::after { box-sizing: border-box; }
html, body {
  margin: 0;
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("body-size")};
  font-weight: ${s("title-weight")};
  line-height: ${s("label-leading")};
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
  padding: ${s("page-pad-y")} ${s("page-pad-x")};
}
.nc-page-hd {
  display: flex;
  flex-direction: column;
  gap: ${s("page-action-gap")};
  min-width: 0;
  padding-bottom: ${s("page-head-gap")};
  border-bottom: ${s("hairline")} solid ${s("divider")};
  position: relative;
  /* Its own layer above the page body: the band sits behind the header's content, and a menu that opens from the
     header (Bass's and Rhythm's phone menu) draws over the modules, not under them. */
  z-index: ${s("page-head-layer")};
}
/* The title band (Peter): page-head-bg from the top of the page down to the header's divider, edge to edge. It
   reaches into the page's padding, so it never widens the page; the divider keeps its inset. */
.nc-page-hd::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: calc(${s("page-pad-y")} * -1);
  bottom: 0;
  left: calc(${s("page-pad-x")} * -1);
  right: calc(${s("page-pad-x")} * -1);
  background: ${s("page-head-bg")};
  pointer-events: none;
}
.nc-page-body { min-width: 0; padding-top: ${s("page-body-gap")}; }
/* Page title (ASTRID: "ASTRID / SYNTH / 01"), the line under it, and the header's text actions (Save, Load, Panic). */
.nc-page-title {
  margin: 0;
  font-size: ${s("page-title-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("page-title-tracking")};
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-page-sub { margin: ${s("page-sub-gap")} 0 0; font-size: ${s("page-sub-size")}; color: ${s("text-sub")}; }
.nc-page-title .nc-page-sep { color: ${s("text-sub")}; }
.nc-page-actions { display: flex; flex-wrap: wrap; align-items: flex-end; gap: ${s("control-gap")} ${s("page-action-gap")}; min-width: 0; }
.nc-page-action {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  padding: 0 0 ${s("control-gap")};
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-page-action:hover { color: ${s("text")}; border-bottom-color: ${s("text")}; }
.nc-page-action:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
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
    min-width: ${s("target-min")};
    min-height: ${s("target-min")};
    /* The bars' right edge on the page gutter, as the text actions' last word. */
    margin-inline-end: calc((${s("target-min")} - ${s("target-min")} / 2.75) / -2);
    padding: 0;
    border: 0;
    background: transparent;
    color: ${s("text")};
    cursor: pointer;
  }
  .nc-page-menu-btn > svg { width: calc(${s("target-min")} / 2.75); height: calc(${s("target-min")} / 2.75); fill: currentColor; }
  .nc-page-menu-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] {
    position: absolute;
    top: calc(100% + ${s("hairline")});
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-block: ${s("control-gap")};
    background: ${s("surface-page")};
    color: ${s("text")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  /* Under a kit header: edge to edge, the items on the page gutter. */
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${s("page-pad-x")} * -1);
    right: calc(${s("page-pad-x")} * -1);
    padding-inline: ${s("page-pad-x")};
  }
  .nc-page-menu[data-nc-open] button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: ${s("target-min")};
    margin: 0;
    padding: 0;
    border: 0;
    text-align: left;
    color: ${s("text")};
  }
  .nc-page-menu[data-nc-open] button:focus-visible { outline-offset: calc(${s("focus-width")} * -1); }
  .nc-page-menu[data-nc-open] > .nc-field { width: auto !important; padding-block: ${s("control-gap")}; }
  /* The header with a menu keeps one row on a phone: the title at the left (cut only if it must be), the kept
     actions and the ☰ at the right. */
  .nc-page-hd:has(.nc-page-menu-btn) { flex-direction: row; align-items: center; justify-content: space-between; gap: ${s("header-gap")}; }
  .nc-page-hd:has(.nc-page-menu-btn) > :first-child { min-width: 0; }
  .nc-page-actions:has(> .nc-page-menu-btn) { flex: none; flex-wrap: nowrap; align-items: center; }
}
@media (min-width: 768px) and (max-width: 768px) {
  .nc-page-hd .nc-page-menu[data-nc-open] {
    left: calc(${s("page-pad-x-md")} * -1);
    right: calc(${s("page-pad-x-md")} * -1);
    padding-inline: ${s("page-pad-x-md")};
  }
}
.nc-module {
  background: ${s("module-bg-adjacent-1")};
  color: ${s("text")};
  padding: ${s("module-pad")};
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  min-width: 0;
  position: relative;
  font-family: ${s("font-ui")};
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
  gap: ${s("header-gap")};
  min-width: 0;
}
.nc-module[data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("head-margin")}; }
/* A compact header (defineModule compact): the title at the slim size and the index on one slim line, a small gap
   under it. For a module that sits over others (the Studio's Mix). */
.nc-module[data-nc-compact] .nc-title { font-size: ${s("title-size-slim")}; }
.nc-module[data-nc-compact][data-nc-open="true"] .nc-module-hd { margin-bottom: ${s("head-margin-compact")}; }
.nc-module[data-nc-compact]:not([data-nc-slim]) { padding-top: ${s("module-gap")}; }
.nc-module[data-nc-compact][data-nc-slim] { padding-block: ${s("module-gap")}; }
.nc-title {
  margin: 0;
  min-width: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module[data-nc-slim] .nc-title { font-size: ${s("title-size-slim")}; }
.nc-module-end { display: flex; align-items: baseline; gap: ${s("header-gap")}; flex: none; }
.nc-index {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-hide, .nc-slim {
  padding: 0 ${s("control-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: ${s("label-leading")};
  cursor: pointer;
  transition: none;
}
.nc-slim {
  display: flex;
  align-items: center;
  gap: ${s("module-gap")};
  flex: 1;
  min-width: 0;
  margin-top: ${s("module-gap")};
  text-align: left;
}
.nc-hide:hover, .nc-slim:hover { color: ${s("text")}; }
.nc-hide:focus-visible, .nc-slim:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("control-gap")};
}
.nc-slim-lines {
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-module-body {
  display: flex;
  flex-direction: column;
  gap: ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-section { display: flex; flex-direction: column; gap: ${s("module-gap")}; min-width: 0; }
.nc-row, .nc-field, .nc-controls, .nc-slot-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("module-gap")};
  min-width: 0;
}
.nc-label {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-readout, .nc-mono {
  font-family: ${s("font-readout")};
  font-variant-numeric: tabular-nums;
  font-size: ${s("readout-size")};
  color: ${s("text")};
  white-space: nowrap;
}
/* One label column (the lane-name width), so the sliders in a module start together, as in ASTRID. A label is never
   cut below that column (TEMPO, SWING and DECAY stay whole), but longer text gives way on one line with an ellipsis
   instead of widening the page; the full text stays in the DOM, so the accessible name is never cut. */
.nc-field .nc-label { flex: 0 1 auto; min-width: min(${s("name-width")}, 100%); }
/* A value never gives way to its label: it keeps its width (flex: none), so a long label is cut first and 0.3 stays
   0.3. Only a value that is itself longer than the row beside a name-width label is cut, with an ellipsis. The control
   beside it (range, knob, canvas, select) keeps its size. */
.nc-field .nc-readout {
  flex: none;
  min-width: 0;
  max-width: calc(100% - ${s("name-width")} - ${s("module-gap")});
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-field .nc-range, .nc-field .nc-canvas { flex: 1 1 0; min-width: 0; }
/* A display beside a label keeps the width it has next to a column-wide label: a long label is cut, not the display. */
.nc-field > .nc-label + .nc-canvas { min-width: calc(100% - ${s("name-width")} - ${s("module-gap")}); }
/* ASTRID slider rows: label and value on one baseline, the slider full width under them. */
.nc-field[data-nc-slider] {
  display: grid;
  grid-template-columns: minmax(min(${s("name-width")}, 100%), 1fr) auto;
  grid-template-areas: "label value" "range range";
  align-items: baseline;
  column-gap: ${s("module-gap")};
  row-gap: ${s("control-gap")};
  padding-bottom: ${s("module-gap")};
}
.nc-field[data-nc-slider] .nc-label { grid-area: label; min-width: 0; }
/* In the slider grid the value column is auto (sized to the value), so the flex-row cap does not apply. */
.nc-field[data-nc-slider] .nc-readout { grid-area: value; max-width: none; text-align: right; }
.nc-field[data-nc-slider] .nc-range { grid-area: range; width: 100%; margin: 0; }
/* Tap tempo: a small outlined button on the label line, between the label and the value. */
.nc-field[data-nc-slider]:has(> .nc-tap) {
  grid-template-columns: minmax(min(${s("name-width")}, 100%), 1fr) auto auto;
  grid-template-areas: "label tap value" "range range range";
}
.nc-tap {
  grid-area: tap;
  position: relative;
  align-self: center;
  padding: 0 ${s("control-gap")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("label-leading")};
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
  bottom: calc(-1 * ${s("control-gap")});
  width: max(100%, ${s("target-min")});
  height: max(100%, ${s("target-min")});
  transform: translateX(-50%);
}
/* The chip's ::before is already its touch box and stops at the slider; a hit pad on top of it covered the top
   half of the tempo slider, so a drag there tapped instead (Rhythm #40). */
.nc-tap > .nc-hit { display: none; }
.nc-tap:hover { border-color: ${s("text-sub")}; color: ${s("text")}; }
.nc-tap:active { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-tap:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
/* ASTRID row spacing: a 48 px row every 72 px (measured on ASTRID's VCA at 1280 and 390). */
/* A flat phone-only group's sliders count as the section's own (group.js, collapse: "phone"). */
.nc-section:is(:has(> .nc-field[data-nc-slider]), :has(> .nc-group[data-nc-collapse="phone"] > .nc-group-body > .nc-field[data-nc-slider])) { row-gap: ${s("module-pad")}; }
.nc-section[data-nc-inset="true"] {
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
}
.nc-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: ${s("slider-pitch")};
  background: transparent;
  cursor: pointer;
  transition: none;
  accent-color: ${s("accent")};
}
/* Dimming is by colour, never opacity (plan 5.1): a disabled or bypassed control's label, value, track and thumb go
   to text-sub at full strength, so every pair keeps its contrast (Lucy's panel fix: 38 of 38 pairs pass). */
.nc-range:disabled { cursor: not-allowed; accent-color: ${s("text-sub")}; }
.nc-range:disabled::-webkit-slider-thumb { background: ${s("text-sub")}; }
.nc-range:disabled::-moz-range-thumb { background: ${s("text-sub")}; }
.nc-range:disabled::-moz-range-progress { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-label, [data-nc-dim="true"] .nc-readout, [data-nc-dim="true"] .nc-ui-fx-name, [data-nc-dim="true"] .nc-ui-fx-fold-name,
[data-nc-dim="true"] .nc-select { color: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range { accent-color: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-webkit-slider-thumb { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-thumb { background: ${s("text-sub")}; }
[data-nc-dim="true"] .nc-range::-moz-range-progress { background: ${s("text-sub")}; }
.nc-range::-webkit-slider-runnable-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-track {
  height: ${s("hairline")};
  background: ${s("slider-track")};
  transition: none;
}
.nc-range::-moz-range-progress {
  height: ${s("hairline")};
  background: ${s("slider-progress")};
  transition: none;
}
.nc-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  margin-top: calc(${s("slider-thumb-size")} / -2);
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
.nc-range::-moz-range-thumb {
  width: ${s("slider-thumb-size")};
  height: ${s("slider-thumb-size")};
  border: 0;
  border-radius: 50%;
  background: ${s("slider-thumb")};
  transition: none;
}
${lr} { transition: none; }
.nc-range:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
.nc-btn {
  width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: ${s("hairline")} solid ${s("text")};
  background: transparent;
  color: ${s("text")};
  min-height: ${s("target-min")};
  padding: ${s("button-pad-y")} 0;
  font-size: ${s("readout-size")};
  letter-spacing: ${s("button-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition-property: color, background-color, border-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-btn:hover { background: ${s("surface-raised")}; }
.nc-btn:active { transform: scale(0.985); }
.nc-btn[data-on="true"] {
  background: ${s("accent")};
  border-color: ${s("accent")};
  color: ${s("on-accent")};
}
.nc-btn:focus-visible {
  outline: ${s("focus-width-strong")} solid ${s("focus-ring")};
  outline-offset: ${s("control-gap")};
}
.nc-btn:disabled { color: ${s("text-sub")}; border-color: ${s("divider")}; cursor: not-allowed; }
.nc-toggle {
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  padding: 0 0 ${s("control-gap")};
  cursor: pointer;
  align-self: flex-start;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-toggle:hover, .nc-toggle[aria-pressed="true"] { color: ${s("text")}; }
.nc-toggle:hover { border-bottom-color: ${s("text")}; }
.nc-toggle[aria-pressed="true"] { border-bottom-color: ${s("accent")}; }
.nc-toggle[data-nc-role="mute"][aria-pressed="true"] { color: ${s("rhythm.track-mute")}; }
.nc-toggle[data-nc-role="solo"][aria-pressed="true"] {
  color: ${s("rhythm.track-solo")};
  border-bottom-color: ${s("rhythm.track-solo")};
}
.nc-toggle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("control-gap")};
}
/* Underline tabs (ASTRID .nc-seg): words on a hairline, the chosen one in text with a tab-mark accent bar on the
   line. Radio semantics stay (role="radio", aria-checked). */
.nc-seg {
  display: flex;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  margin-bottom: ${s("module-gap")};
  min-width: 0;
}
.nc-seg > button {
  flex: 1 1 0;
  position: relative;
  min-width: 0;
  padding: ${s("tab-pad-y")} 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("tab-size")};
  font-weight: ${s("control-weight")};
  white-space: nowrap;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-seg:has(> button:nth-child(4)) > button { font-size: ${s("label-size")}; padding-inline: ${s("control-gap")}; }
.nc-seg > button:hover { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"] { color: ${s("text")}; }
.nc-seg > button[aria-checked="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${s("hairline")} * -1);
  height: ${s("tab-mark")};
  background: ${s("accent")};
}
.nc-seg > button:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: calc(${s("focus-width")} * -1);
}
.nc-select {
  flex: 1 1 auto;
  min-width: 0;
  appearance: none;
  background: transparent;
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("divider")};
  border-radius: 0;
  color: ${s("text")};
  font-size: ${s("body-size")};
  padding: ${s("control-gap")} ${s("select-pad-end")} ${s("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
.nc-select:hover:not(:disabled) { border-bottom-color: ${s("text-sub")}; }
.nc-select:focus-visible { outline: none; border-bottom-color: ${s("accent")}; }
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; LUPA's ▾ for every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${un("text-sub")}
  background-size: ${s("select-mark")} ${s("select-mark")};
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${un("text")}
}
:is(.nc-select, .nc-dd):disabled {
${un("divider")}
}
/* Slots on one line, Morph under them as a slider row (label and value, then the slider). */
.nc-slot-row { flex-direction: column; align-items: stretch; gap: ${s("module-gap")}; }
.nc-slot-line { display: flex; flex-wrap: nowrap; align-items: center; gap: ${s("slot-gap")}; min-width: 0; }
.nc-morph-field { padding-bottom: 0; }
.nc-snap-row {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("slot-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-snap-wrap {
  position: relative;
  flex: 1 1 ${s("slot-size")};
  width: ${s("slot-size")};
  max-width: ${s("slot-size")};
  min-width: 0;
  height: ${s("slot-size")};
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
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("slot-font-size")};
  line-height: ${s("label-leading")};
  padding: 0;
  cursor: pointer;
  transition: none;
}
.nc-snap:hover { border-color: ${s("text-sub")}; }
/* Has saved content: an ink outline and ink digit, as in Bass (no grey fill). Empty: hairline, sub ink. */
.nc-snap[data-filled="true"] {
  border-color: ${s("text-sub")};
  color: ${s("text")};
}
/* Active (Bass): the accent outline, ink and underline, in every theme and surprise palette. */
.nc-snap[data-active="true"] {
  background: transparent;
  border-color: ${s("accent")};
  color: ${s("accent")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Queued for the end of the bar (Bass): a faint accent underline and outline that go full accent on each beat
   (audio-driven, from the playhead), steady under reduced motion. A second tap switches now. */
.nc-snap[data-queued="true"] {
  color: ${s("accent")};
  outline: ${s("focus-width")} solid ${s("accent-faint")};
  outline-offset: ${s("hairline")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
}
.nc-snap[data-queued="true"][data-pulse="true"] {
  outline-color: ${s("accent")};
  background: ${s("accent-soft")};
  box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent")};
}
/* Edited since it was stored or recalled: a small dot in the corner, in the slot's ink. */
.nc-snap[data-edited="true"] { position: relative; }
.nc-snap[data-edited="true"]::after {
  content: "";
  position: absolute;
  top: ${s("control-gap")};
  right: ${s("control-gap")};
  width: ${s("control-gap")};
  height: ${s("control-gap")};
  border-radius: 50%;
  background: currentColor;
}
.nc-snap:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle {
  position: relative;
  flex: 0 0 ${s("sparkle-size")};
  width: ${s("sparkle-size")};
  height: ${s("sparkle-size")};
  margin-inline: ${s("rhythm.sparkle-gap")};
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-play-row {
  display: flex;
  align-items: stretch;
  gap: ${s("rhythm.sparkle-gap")};
}
.nc-play-row > .nc-btn { flex: 1 1 auto; width: auto; }
.nc-sparkle-btn {
  flex: 0 0 ${s("target-min")};
  width: ${s("target-min")};
  min-height: ${s("target-min")};
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surprise-fill")};
  color: ${s("surprise-ink")};
  display: grid;
  place-items: center;
  cursor: pointer;
  transition-property: color, background-color, transform;
  transition-duration: ${s("transition-feedback")};
}
.nc-sparkle-btn svg { width: calc(${s("target-min")} / 2); height: calc(${s("target-min")} / 2); display: block; }
.nc-sparkle-btn:hover { background: ${s("surface-raised")}; }
.nc-sparkle-btn:active { transform: scale(0.985); }
.nc-sparkle-btn:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-sparkle svg { width: ${s("sparkle-icon-size")}; height: ${s("sparkle-icon-size")}; display: block; }
.nc-sparkle:hover { color: ${s("text")}; }
.nc-sparkle:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-module-hd:has(> .nc-snap-msg:not(:empty)) { flex-wrap: wrap; row-gap: 0; }
.nc-snap-msg:not(:empty) { order: 1; flex-basis: 100%; }
.nc-snap-msg {
  flex: 1 1 auto;
  min-width: 0;
  text-align: left;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
  white-space: normal;
  overflow: hidden;
  transition: none;
}
.nc-module[data-nc-slim] {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${s("header-gap")};
}
.nc-module[data-nc-slim] .nc-module-hd { display: contents; }
.nc-module[data-nc-slim] .nc-title { order: 0; }
.nc-module[data-nc-slim] .nc-snap-msg { order: 1; }
.nc-module[data-nc-slim] .nc-slim { order: 2; margin-top: 0; }
.nc-module[data-nc-slim] .nc-module-end { order: 3; }
.nc-steps {
  display: flex;
  flex-wrap: nowrap;
  gap: ${s("rhythm.step-gap")};
  min-width: 0;
  flex: 1 1 auto;
}
.nc-name {
  flex: 0 1 ${s("name-width")};
  width: ${s("name-width")};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
}
.nc-name:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Beats read at a glance: every 4 steps the gap widens from step-gap to beat-gap (one beat = one pad row on phones). */
/* Counted among the cells only ("of .nc-step-wrap"): the lane's end handle sits between cells when the lane is short,
   and must not push a beat gap onto the wrong cell. */
.nc-steps > .nc-step-wrap:nth-child(4n + 1 of .nc-step-wrap):not(:first-child) {
  margin-inline-start: calc(${s("beat-gap")} - ${s("rhythm.step-gap")});
}
/* Every lane row bleeds a little into the module padding, so the selected one can be tinted edge to edge (M, S,
   name, steps, menu) with its marker clear of the M button, without moving anything when the selection changes. */
.nc-row[data-nc-row] {
  margin-inline: calc(-1 * ${s("row-inset")});
  padding-inline: ${s("row-inset")};
}
/* The selected lane is lit, not just underlined: the whole row tinted, with a solid accent bar at its start. */
.nc-row[data-selected="true"] {
  background: ${s("accent-tint")};
  box-shadow: inset ${s("marker-width")} 0 0 ${s("accent")};
}
/* Also selected (multi-select): the same tint, no marker; the name underlined. */
.nc-row[data-picked="true"] { background: ${s("accent-tint")}; }
.nc-row[data-picked="true"] .nc-name,
.nc-row[data-selected="true"] .nc-name {
  color: ${s("text")};
  text-decoration: underline;
  text-decoration-color: ${s("accent")};
  text-decoration-thickness: ${s("hairline")};
  text-underline-offset: ${s("control-gap")};
}
/* On the tint, off steps and unlit M/S are paper squares (step-cell-off), as in the mockup, so their outlines stay
   crisp instead of melting into the tint. */
.nc-row[data-selected="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-selected="true"] .nc-ms:not([aria-pressed="true"]),
.nc-row[data-picked="true"] .nc-step:not([aria-pressed="true"]):not([data-accent="true"]):not([data-out="true"]),
.nc-row[data-picked="true"] .nc-ms:not([aria-pressed="true"]) { background: ${s("rhythm.step-cell-off")}; }
/* Moves (renderMoves): a label column, then quiet square icon buttons that darken on hover (Bass's look). */
.nc-moves { display: flex; flex-direction: column; gap: ${s("move-row-gap")}; margin-top: ${s("page-body-gap")}; }
.nc-moves-row { display: flex; align-items: center; gap: ${s("module-gap")}; }
.nc-moves-label {
  flex: none;
  width: ${s("move-label-width")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-moves-btns { display: flex; flex-wrap: wrap; gap: ${s("move-gap")}; min-width: 0; }
.nc-moves-btn {
  display: grid;
  place-items: center;
  width: ${s("move-size")};
  height: ${s("move-size")};
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  cursor: pointer;
}
.nc-moves-icon { width: ${s("move-icon")}; height: ${s("move-icon")}; }
.nc-moves-btn:hover:not(:disabled) { color: ${s("text")}; border-color: ${s("text-sub")}; }
.nc-moves-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-moves-btn:disabled { color: ${s("divider")}; cursor: default; }
@media (pointer: coarse) {
  .nc-moves-btn { width: ${s("target-min")}; height: ${s("target-min")}; }
}
/* Muted, or silenced by another lane's solo: the lane's steps dim by colour, not just its button. On steps fill with
   text-sub (the velocity shade is set aside while silent), off steps keep only a divider outline. */
.nc-row[data-silent="true"] .nc-step { border-color: ${s("divider")}; }
.nc-row[data-silent="true"] .nc-step[aria-pressed="true"] { background: ${s("text-sub")}; border-color: ${s("text-sub")}; }
.nc-name[data-nc-lane="1"] { color: ${s("rhythm.lane-1")}; }
.nc-name[data-nc-lane="2"] { color: ${s("rhythm.lane-2")}; }
.nc-name[data-nc-lane="3"] { color: ${s("rhythm.lane-3")}; }
.nc-name[data-nc-lane="4"] { color: ${s("rhythm.lane-4")}; }
.nc-ms-wrap {
  position: relative;
  flex: 0 0 ${s("slider-pitch")};
  height: ${s("slider-pitch")};
}
.nc-ms {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  cursor: pointer;
  transition: none;
}
.nc-ms:hover { color: ${s("text")}; }
.nc-ms[data-nc-ms="mute"][aria-pressed="true"] {
  background: ${s("rhythm.track-mute")};
  border-color: ${s("rhythm.track-mute")};
  color: ${s("surface-page")};
}
.nc-ms[data-nc-ms="solo"][aria-pressed="true"] {
  background: ${s("rhythm.track-solo")};
  border-color: ${s("rhythm.track-solo")};
  color: ${s("surface-page")};
}
.nc-ms:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step-wrap {
  position: relative;
  flex: 1 1 ${s("rhythm.step-cell-size")};
  min-width: 0;
  aspect-ratio: 1;
  max-height: ${s("slider-pitch")};
}
.nc-step {
  position: absolute;
  inset: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
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
  background: ${s("velocity-fill")};
  border-color: ${s("velocity-fill")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-step[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
}
/* The playing step, Bass's method: an accent ring outside the step, one hairline clear of it, so it reads the same on an
   empty step or a filled one at any velocity, and every lane's ring at the playhead forms one column. It lifts
   above its neighbours (the ring is wider than step-gap). No transition: it follows the audio clock, step by step. */
.nc-step[data-playhead="true"] {
  z-index: 1;
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
}
.nc-step[data-bar="true"] { border-bottom-color: ${s("rhythm.bar-accent")}; }
/* A step's mark (StepCell.mark, data-nc-mark): a short tag in the lower right corner, e.g. NYX's bar number on a step
   that plays in one bar only. In the step's own ink: text-sub on an empty step, the accent mark's paper on a filled
   one (tested on every fill of the velocity ramp); above the accent bar when the step is accented. */
:is(.nc-step, .nc-pad)[data-nc-mark]::after {
  content: attr(data-nc-mark);
  position: absolute;
  right: ${s("rhythm.step-mark-inset")};
  bottom: ${s("rhythm.step-mark-inset")};
  font-family: ${s("font-readout")};
  font-size: ${s("rhythm.step-mark-size")};
  font-weight: ${s("control-weight")};
  line-height: 1;
  color: ${s("text-sub")};
  pointer-events: none;
}
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-nc-mark]::after { color: ${s("rhythm.accent-mark")}; }
:is(.nc-step, .nc-pad)[aria-pressed="true"][data-accent="true"][data-nc-mark]::after {
  bottom: calc(${s("rhythm.step-mark-inset")} + ${s("rhythm.accent-mark-size")});
}
/* Chance below 100%: a dashed outline at the same width (style only, no opacity, since shade means velocity). The fill
   stops at the padding box, so the dashes are the step's own colour with the row showing between them. */
.nc-step[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
/* Per-lane length: steps past the end are ghosted on the selected row; the end handle sits after the last step. */
.nc-step[data-out="true"] { border-color: ${s("divider")}; background: transparent; pointer-events: none; }
/* Every lane lays its handle out the same way, selected or not, and the handle takes no width in the row: its negative
   margins cancel its own width and the step gap it adds, so it sits centred in the gap after the last step and the
   cells never move when the selection changes. Unselected lanes keep it hidden (visibility, so it cannot be focused). */
.nc-len-handle {
  display: block;
  visibility: hidden;
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("control-gap")};
  margin-inline: calc((${s("control-gap")} + ${s("rhythm.step-gap")}) / -2);
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
  width: ${s("hairline")};
  height: ${s("target-min")};
  max-height: calc(${s("target-min")} / 2);
  transform: translate(-50%, -50%);
  border-inline: ${s("hairline")} solid ${s("text-sub")};
  background: ${s("text-sub")};
}
.nc-row[data-selected="true"] .nc-len-handle { visibility: visible; z-index: 1; }
.nc-len-handle:hover::before, .nc-len-handle[data-dragging="true"]::before { background: ${s("text")}; border-color: ${s("text")}; }
.nc-len-handle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
button.nc-pads-label {
  border: 0;
  background: transparent;
  min-height: ${s("target-min")};
  padding: 0;
  font-family: inherit;
  cursor: pointer;
}
button.nc-pads-label[aria-pressed="true"] { color: ${s("accent")}; }
.nc-pad[data-out="true"] { border-color: ${s("divider")}; border-style: dashed; background: transparent; color: ${s("text-sub")}; }
.nc-pad[data-end="true"] { box-shadow: inset calc(-1 * ${s("focus-width")} * 2) 0 0 ${s("text")}; }
.nc-pad[data-end="true"][aria-pressed="true"][data-accent="true"] {
  box-shadow: inset calc(-1 * ${s("focus-width")} * 2) 0 0 ${s("text")}, inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
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
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text")};
}
.nc-step-tools {
  display: flex;
  align-items: stretch;
  gap: ${s("module-gap")};
  margin-bottom: ${s("module-gap")};
}
.nc-step-tools > .nc-seg { flex: 1 1 auto; align-self: flex-end; margin-bottom: 0; }
/* No margin (nor the sparkle's): the row gap already sets the dice off the length handle, and 1024 needs the
   width for 18 px cells now that beats are split by beat-gap. */
.nc-row-dice { flex: none; margin-inline: 0; }
.nc-pads-dice svg { width: calc(${s("target-min")} / 3); height: calc(${s("target-min")} / 3); display: block; margin: auto; }
.nc-fill { padding-inline: ${s("module-gap")}; touch-action: none; user-select: none; -webkit-user-select: none; }
/* Clear is a tap, not a hold: phones still scroll over it. */
.nc-clear { touch-action: manipulation; }
.nc-fill[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step, .nc-pads-play, .nc-fill {
  flex: none;
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-pads-play { padding-inline: ${s("module-gap")}; }
.nc-pads-play[aria-pressed="true"] { background: ${s("text")}; border-color: ${s("text")}; color: ${s("surface-page")}; }
.nc-pads-step:focus-visible, .nc-pads-play:focus-visible, .nc-fill:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Fill and Clear are text actions, like the page's Save and Load (Peter, 2026-10-31: the buttons took too much
   height). Fill held reads as pressed: ink with an ink underline. On a coarse pointer an invisible pad keeps each a
   full target (below). */
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear) {
  min-width: 0;
  min-height: 0;
  align-self: center;
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  border-radius: 0;
  background: transparent;
  padding: 0 0 ${s("control-gap")};
  color: ${s("text-sub")};
  font-weight: ${s("control-weight")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):hover,
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear)[aria-pressed="true"] { background: transparent; color: ${s("text")}; border-bottom-color: ${s("text")}; }
:is(.nc-step-tools .nc-fill, .nc-fill.nc-clear):focus-visible { outline-offset: ${s("control-gap")}; }
/* Two text actions side by side (Fill, Clear) get the page actions' gap. */
.nc-step-tools .nc-fill + .nc-fill { margin-left: ${s("page-action-gap")}; }
.nc-pad {
  position: relative;
  overflow: hidden;
  min-height: calc(${s("target-min")} * 1.25);
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: start;
  vertical-align: top;
  padding: ${s("control-gap")} ${s("module-gap")};
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  transition: none;
}
/* Pads show the selected lane's steps, so they follow the same rules: fill = velocity, accent = the paper mark,
   chance below 100% = dashed outline. */
.nc-pad[aria-pressed="true"] {
  background: ${s("velocity-fill")};
  border-color: ${s("velocity-fill")};
  color: ${s("rhythm.step-cell-ink")};
}
.nc-pad[aria-pressed="true"][data-accent="true"] {
  box-shadow: inset 0 calc(-1 * ${s("rhythm.accent-mark-size")}) 0 0 ${s("rhythm.accent-mark")};
}
.nc-pad[data-playhead="true"] {
  outline: ${s("playhead-width")} solid ${s("rhythm.playhead")};
  outline-offset: ${s("playhead-offset")};
}
.nc-pad[data-dim="true"] { border-style: dashed; background-clip: padding-box; }
.nc-pads[data-silent="true"] .nc-pad { border-color: ${s("divider")}; color: ${s("text-sub")}; }
.nc-pads[data-silent="true"] .nc-pad[aria-pressed="true"] { background: ${s("text-sub")}; border-color: ${s("text-sub")}; color: ${s("surface-page")}; }
.nc-pad:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
.nc-step:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* A focused step or pad that is also playing keeps the playhead ring (focus comes later at the same specificity and
   would thin it to focus-width; both are the accent). */
.nc-step[data-playhead="true"]:focus-visible, .nc-pad[data-playhead="true"]:focus-visible {
  outline-width: ${s("playhead-width")};
  outline-offset: ${s("playhead-offset")};
}
.nc-ui-fx {
  margin-inline: calc(${s("module-pad")} * -1);
  padding: ${s("stack-card-pad-y")} ${s("module-pad")};
  min-width: 0;
  transition: none;
}
.nc-ui-fx-name {
  margin: 0 0 ${s("module-gap")} 0;
  font-size: ${s("body-size")};
  font-weight: ${s("fx-name-weight")};
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
  gap: ${s("module-gap")};
  margin-bottom: ${s("module-gap")};
  min-width: 0;
}
.nc-ui-fx-hd > .nc-ui-fx-name { margin: 0 auto 0 0; }
/* A filter curve above the row it draws (Peter, 2026-11-07: "In Sampler, the filter slider belongs UNDER the
   graphic"): its 20 Hz and 20 kHz sit on the canvas's bottom edge, so the next row keeps a gap's distance. */
.nc-ui-fx > .nc-field:has(> .nc-canvas[data-nc-paint="filter"]) + .nc-field { margin-top: ${s("module-gap")}; }
/* Fold (onFold): a −/+ after the switch. Folded, the card keeps its header row only; in a console row from 769 px it
   is a narrow column instead (below). It folds and unfolds at once: no motion. */
.nc-ui-fx-hd > [data-nc-fx-hide] { flex: none; }
/* Like a channel strip's (Peter, 2026-11-01: "the minimize icon should be positioned in the same place as the
   instrument channels"): the fold triangle sits in the card's top-left corner, above the name. */
.nc-ui-fx:has(> .nc-ui-fx-hd > [data-nc-fx-hide]) { position: relative; }
.nc-ui-fx-hd > [data-nc-fx-hide] { position: absolute; top: ${s("control-gap")}; left: ${s("control-gap")}; z-index: 1; }
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
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  line-height: 1;
  cursor: pointer;
}
.nc-fold-toggle:hover { color: ${s("text")}; }
.nc-fold-toggle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fold-tri {
  display: block;
  width: calc(${s("control-gap")} * 1.5);
  height: calc(${s("control-gap")} * 2);
  background: currentColor;
  clip-path: polygon(100% 0, 0 50%, 100% 100%);
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
}
.nc-fold-toggle[aria-expanded="false"] .nc-fold-tri,
.nc-ui-fx-fold > .nc-fold-tri { transform: scaleX(-1); }
.nc-ui-fx-fold > .nc-fold-tri { flex: none; color: ${s("text-sub")}; }
.nc-ui-fx-fold:hover > .nc-fold-tri { color: ${s("text")}; }
.nc-ui-fx-fold { display: none; }
/* A folded card's column width: fx-fold-width, or fx-fold-width-slim for a card with foldSlim (the Studio's send
   returns; Peter, 2026-11-01: "make send effect minimized state 50% thinner"). */
.nc-ui-fx { --nc-fx-fold-w: ${s("fx-fold-width")}; }
.nc-ui-fx[data-nc-fold-slim] { --nc-fx-fold-w: ${s("fx-fold-width-slim")}; }
.nc-ui-fx[data-nc-folded] > :not(.nc-ui-fx-hd, .nc-token-probe) { display: none; }
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd { margin-bottom: 0; }
.nc-ui-fx-fold {
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${s("module-gap")};
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font: inherit;
  cursor: pointer;
  transition: none;
}
.nc-ui-fx-fold:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
/* The on/off word as the switch draws it: off text-sub, on text with the accent hairline. */
.nc-ui-fx-fold-state {
  padding-bottom: ${s("control-gap")};
  border-bottom: ${s("hairline")} solid transparent;
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  line-height: ${s("label-leading")};
}
.nc-ui-fx-fold[data-on="true"] .nc-ui-fx-fold-state { color: ${s("text")}; border-bottom-color: ${s("accent")}; }
/* The name read bottom to top (the Studio's instrument spine). */
.nc-ui-fx-fold-name {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-size: ${s("body-size")};
  font-weight: ${s("fx-name-weight")};
  color: ${s("text")};
  white-space: nowrap;
}
.nc-ui-fx-fold:hover .nc-ui-fx-fold-state { color: ${s("text")}; }
/* The slim column (fx-fold-width-slim): the same parts, the on/off word a step smaller so OFF fits with room. */
.nc-ui-fx[data-nc-fold-slim] .nc-ui-fx-fold-state { font-size: ${s("scale-size")}; letter-spacing: 0; }
.nc-ui-fx-visual { display: block; width: 100%; height: ${s("display-height")}; }
/* Level steps (level-steps.js, Gate's strip): a display like the EQ graph's, a column per step (beats a gap apart,
   swing widening the first of each pair), the level a soft bar, the shape's curve in the accent over it, the playing
   step ringed (the accent while locked to Play, quieter while it runs free). Under it the step numbers and the shape
   tabs. A long press opens the shape picker over the step. */
.nc-lsteps { position: relative; min-width: 0; margin-bottom: ${s("control-gap")}; }
.nc-lsteps-plot {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${s("slot-gap")};
  height: ${s("level-steps-height")};
  padding: calc(${s("slot-gap")} * 2);
  background: ${s("eq-graph-bg")};
  border-radius: ${s("slot-radius")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  cursor: ns-resize;
}
.nc-lsteps-plot:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-ui-fx[data-nc-max] .nc-lsteps-plot { height: ${s("level-steps-height-max")}; }
.nc-lsteps-step { position: relative; flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; border-radius: ${s("slot-radius")}; }
.nc-lsteps-step[data-beat="true"], .nc-lsteps-axis > span[data-beat="true"] { margin-inline-start: calc(${s("beat-gap")} - ${s("slot-gap")}); }
.nc-lsteps-step > svg { position: absolute; inset: 0; width: 100%; height: 100%; display: block; overflow: visible; pointer-events: none; }
.nc-lsteps-level { fill: ${s("level-steps-bar")}; }
.nc-lsteps-env { fill: ${s("level-steps-curve")}; }
.nc-lsteps-top { fill: none; stroke: ${s("level-steps-curve")}; stroke-width: ${s("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-floor { stroke: ${s("divider")}; stroke-width: ${s("grid-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-step[data-zero="true"] .nc-lsteps-floor { stroke: ${s("text-sub")}; stroke-dasharray: 2 2; }
/* 1/8T with 16 steps: 13-16 don't play. Dashed and empty, as a step grid's out-of-range steps. */
.nc-lsteps-step[data-out="true"] { box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")}; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-level, .nc-lsteps-step[data-out="true"] .nc-lsteps-env { fill: transparent; }
.nc-lsteps-step[data-out="true"] .nc-lsteps-top { stroke: ${s("divider")}; }
.nc-lsteps-step[data-playhead="true"] { z-index: 1; outline: ${s("playhead-width")} solid ${s("playhead")}; outline-offset: ${s("playhead-offset")}; }
.nc-lsteps-step[data-playhead="true"][data-locked="false"] { outline-color: ${s("level-steps-free")}; outline-width: ${s("hairline")}; }
.nc-lsteps-step[data-focus="true"] { box-shadow: inset 0 calc(${s("playhead-width")} * -1) 0 0 ${s("focus-ring")}; }
.nc-lsteps-plot:not(:focus-visible) .nc-lsteps-step[data-focus="true"] { box-shadow: none; }
.nc-lsteps[data-on="false"] .nc-lsteps-env, .nc-lsteps[data-on="false"] .nc-lsteps-level { fill: ${s("divider")}; }
.nc-lsteps[data-on="false"] .nc-lsteps-top { stroke: ${s("text-sub")}; }
.nc-lsteps-step[data-dragging="true"]::after {
  content: attr(data-level);
  position: absolute;
  left: 50%;
  bottom: 100%;
  transform: translate(-50%, calc(calc(${s("slot-gap")} * 2) * -1));
  padding: calc(${s("slot-gap")} / 2) calc(${s("slot-gap")} * 2);
  border-radius: ${s("slot-radius")};
  background: ${s("accent")};
  color: ${s("on-accent")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  pointer-events: none;
}
.nc-lsteps-axis {
  display: flex;
  gap: ${s("slot-gap")};
  padding: ${s("slot-gap")} calc(${s("slot-gap")} * 2) 0;
  font-family: ${s("font-readout")};
  font-size: ${s("slot-font-size")};
  line-height: 1;
  color: ${s("text-sub")};
}
.nc-lsteps-axis > span { flex: var(--nc-lsteps-grow, 1) 1 0; min-width: 0; }
.nc-lsteps-shapes { display: flex; border-bottom: ${s("hairline")} solid ${s("divider")}; margin-top: ${s("control-gap")}; min-width: 0; }
.nc-lsteps-shapes[hidden] { display: none; }
.nc-lsteps-shape, .nc-lsteps-pick > button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${s("slot-gap")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  cursor: pointer;
  white-space: nowrap;
}
.nc-lsteps-shape { position: relative; flex: 1 1 0; min-width: 0; padding: ${s("slot-gap")} 0 ${s("control-gap")}; }
.nc-lsteps-shape:hover, .nc-lsteps-pick > button:hover { color: ${s("text")}; }
.nc-lsteps-shape[aria-selected="true"] { color: ${s("text")}; }
.nc-lsteps-shape[aria-selected="true"]::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(${s("hairline")} * -1);
  height: ${s("tab-mark")};
  background: ${s("accent")};
}
.nc-lsteps-shape:focus-visible, .nc-lsteps-pick > button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
.nc-lsteps-ico { width: calc(${s("label-size")} * 1.8); height: calc(${s("label-size")} * 0.9); overflow: visible; }
.nc-lsteps-ico path { fill: none; stroke: currentColor; stroke-width: ${s("curve-stroke")}; vector-effect: non-scaling-stroke; }
.nc-lsteps-pick {
  position: absolute;
  z-index: 3;
  top: 0;
  left: var(--nc-lsteps-pick-x, 0);
  display: flex;
  align-items: stretch;
  gap: ${s("slot-gap")};
  padding: calc(${s("slot-gap")} * 2);
  background: ${s("surface-page")};
  border-radius: ${s("slot-radius")};
  box-shadow: 0 0 0 ${s("hairline")} ${s("divider")};
}
.nc-lsteps-pick[hidden] { display: none; }
.nc-lsteps-pick-head { align-self: center; padding: 0 calc(${s("slot-gap")} * 2); font-family: ${s("font-readout")}; font-size: ${s("readout-size-small")}; color: ${s("text-sub")}; white-space: nowrap; }
.nc-lsteps-pick > button { padding: calc(${s("slot-gap")} * 2); border-radius: ${s("slot-radius")}; }
.nc-lsteps-pick > button[aria-checked="true"] { color: ${s("on-accent")}; background: ${s("accent")}; }
@media (pointer: coarse) {
  .nc-lsteps-shape, .nc-lsteps-pick > button { min-height: ${s("target-min")}; justify-content: center; }
  .nc-lsteps-pick > button { min-width: ${s("target-min")}; }
}
/* EQ graph (eq-graph.js): a display at the top of an EQ card. A plot a touch off the card's shade, a hairline frame,
   the spectrum and curve canvases filling it, and one dot per band (its own colour) over them, each a 44 px target. */
.nc-eq { position: relative; min-width: 0; margin-bottom: ${s("control-gap")}; }
.nc-eq-plot {
  position: relative;
  height: ${s("eq-graph-height")};
  background: ${s("eq-graph-bg")};
  border-radius: ${s("slot-radius")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
}
.nc-eq-plot > canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; pointer-events: none; }
.nc-eq-node {
  --nc-eq-tone: ${s("eq-curve")};
  position: absolute;
  width: ${s("eq-node-size")};
  height: ${s("eq-node-size")};
  margin: calc(${s("eq-node-size")} / -2) 0 0 calc(${s("eq-node-size")} / -2);
  border-radius: 50%;
  background: var(--nc-eq-tone);
  box-shadow: 0 0 0 ${s("hairline")} ${s("eq-graph-bg")};
  cursor: grab;
  touch-action: none;
  outline: none;
  z-index: 1;
}
.nc-eq-node[data-tone="1"] { --nc-eq-tone: ${s("eq-band-1")}; }
.nc-eq-node[data-tone="2"] { --nc-eq-tone: ${s("eq-band-2")}; }
.nc-eq-node[data-tone="3"] { --nc-eq-tone: ${s("eq-band-3")}; }
/* The hit area (target-min), and a soft halo in the band's colour while it is hovered, focused or dragged. */
.nc-eq-node::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${s("target-min")};
  height: ${s("target-min")};
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.nc-eq-node::after {
  content: "";
  position: absolute;
  inset: calc(${s("control-gap")} * -1.5);
  border-radius: 50%;
  background: color-mix(in srgb, var(--nc-eq-tone) 24%, transparent);
  transform: scale(0);
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
  pointer-events: none;
}
.nc-eq-node:hover::after, .nc-eq-node[data-active="true"]::after { transform: scale(1); }
.nc-eq-node[data-drag="true"] { cursor: grabbing; }
.nc-eq-node:focus-visible { box-shadow: 0 0 0 calc(${s("hairline")} * 2) ${s("eq-graph-bg")}, 0 0 0 calc(${s("hairline")} * 2 + ${s("focus-width")}) ${s("focus-ring")}; }
.nc-eq[data-on="false"] .nc-eq-node { --nc-eq-tone: ${s("text-sub")}; }
/* Not maximized: a display. The dots are markers; a click on the plot maximizes the card. */
.nc-eq[data-locked] .nc-eq-plot { cursor: zoom-in; }
.nc-eq[data-locked] .nc-eq-node { pointer-events: none; cursor: inherit; }
/* The readout beside the band in use: "MID −18 dB · 938 Hz · Q 0.3". */
.nc-eq-tip {
  position: absolute;
  z-index: 2;
  padding: ${s("hairline")} ${s("control-gap")};
  border-radius: ${s("slot-radius")};
  background: ${s("eq-graph-bg")};
  box-shadow: inset 0 0 0 ${s("hairline")} ${s("divider")};
  color: ${s("text")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  line-height: ${s("label-leading")};
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
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font: inherit;
  line-height: 1;
  cursor: pointer;
}
.nc-fx-max[hidden] { display: none; }
.nc-fx-max:hover, .nc-fx-close:hover { color: ${s("text")}; }
.nc-fx-max:focus-visible, .nc-fx-close:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-close { font-size: ${s("title-size")}; padding-inline: ${s("control-gap")}; }
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
  padding: 0 ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("body-size")};
  line-height: 1;
  cursor: pointer;
}
.nc-fx-remove::before {
  content: "";
  position: absolute;
  top: 50%;
  left: calc(${s("control-gap")} * -1);
  right: calc(${s("control-gap")} * -1);
  height: max(100%, calc(${s("control-gap")} * 5));
  transform: translateY(-50%);
}
.nc-fx-remove:hover { color: ${s("text")}; }
.nc-fx-remove:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-remove[hidden],
.nc-ui-fx[data-nc-folded] > .nc-ui-fx-hd > .nc-fx-remove,
.nc-ui-fx[data-nc-max="over"] > .nc-ui-fx-hd > .nc-fx-remove { display: none; }
.nc-fx-max-icon { position: relative; display: block; width: calc(${s("control-gap")} * 2.5); height: calc(${s("control-gap")} * 2.5); }
.nc-fx-max-icon > i {
  position: absolute;
  width: calc(${s("control-gap")} * 1.1);
  height: calc(${s("control-gap")} * 1.1);
  border: 0 solid currentColor;
  transition: transform ${s("motion-press")} ${s("motion-press-easing")};
}
.nc-fx-max-icon > i:nth-child(1) { left: 0; top: 0; border-left-width: calc(${s("hairline")} * 1.5); border-top-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(2) { right: 0; top: 0; border-right-width: calc(${s("hairline")} * 1.5); border-top-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(3) { left: 0; bottom: 0; border-left-width: calc(${s("hairline")} * 1.5); border-bottom-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max-icon > i:nth-child(4) { right: 0; bottom: 0; border-right-width: calc(${s("hairline")} * 1.5); border-bottom-width: calc(${s("hairline")} * 1.5); }
.nc-fx-max[aria-pressed="true"] .nc-fx-max-icon > i { transform: rotate(180deg); }
/* Maximized: a taller plot, and the dials in columns under it (row and over). */
.nc-ui-fx[data-nc-max] .nc-eq-plot { height: ${s("eq-graph-height-max")}; }
.nc-ui-fx[data-nc-max="over"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"] {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${s("fx-card-width")} * 0.6)), 1fr));
  column-gap: calc(${s("module-pad")} * 2);
  row-gap: ${s("module-gap")};
  align-content: start;
}
/* Maximized, the dials sit on one line (Peter, 2026-11-01): as many columns as the card has dials (--nc-fx-dials,
   set by controls.js), sharing the width. */
.nc-ui-fx[data-nc-max="over"][style*="--nc-fx-dials"],
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-max="row"][style*="--nc-fx-dials"] {
  grid-template-columns: repeat(var(--nc-fx-dials), minmax(0, 1fr));
  column-gap: ${s("module-pad")};
}
.nc-ui-fx[data-nc-max="row"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note),
.nc-ui-fx[data-nc-max="over"] > :is(.nc-ui-fx-hd, .nc-eq, .nc-ui-more, .nc-ui-fx-fold, .nc-note) { grid-column: 1 / -1; }
.nc-ui-fx[data-nc-max] > .nc-eq { margin-bottom: ${s("module-gap")}; }
/* Over the modules (an instrument's Hacks column): a panel three module widths wide, in its module, above the rest. */
.nc-module:has(.nc-ui-fx[data-nc-max="over"]) { position: relative; z-index: ${s("eq-panel-layer")}; }
.nc-ui-fx[data-nc-max="over"] {
  position: absolute;
  z-index: ${s("eq-panel-layer")};
  margin: 0;
  box-shadow: 0 0 0 ${s("hairline")} ${s("text-sub")};
}
.nc-fx-ghost { margin-inline: calc(${s("module-pad")} * -1); }
.nc-ui-more > summary {
  display: flex;
  align-items: center;
  padding-block: ${s("control-gap")};
  cursor: pointer;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
}
.nc-ui-more > summary:hover { color: ${s("text")}; }
.nc-ui-more > summary:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
/* Group (group.js): a collapsible run of a module's controls. Its header is the More toggle's look (label style,
   text-sub, hover to text) as a real button: the title with the -/+ mark at the end of its line, and while closed a
   quiet summary on its own line under them, wrapping rather than cut (a narrow column still shows all of it).
   Open or closed at once: no motion. Open, its controls space as the module's own do. */
.nc-group { display: flex; flex-direction: column; gap: ${s("module-pad")}; min-width: 0; }
.nc-group-toggle {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: ${s("module-gap")};
  row-gap: ${s("control-gap")};
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: ${s("control-gap")} 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  text-align: start;
  color: ${s("text-sub")};
}
.nc-group-toggle:hover { color: ${s("text")}; }
.nc-group-toggle:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
.nc-group-title { grid-area: 1 / 1; min-width: 0; }
.nc-group-summary {
  grid-area: 2 / 1 / 3 / -1;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  letter-spacing: normal;
  text-transform: none;
}
.nc-group-mark { grid-area: 1 / 2; font-family: ${s("font-readout")}; }
.nc-group-summary:empty, .nc-group[data-nc-open="true"] .nc-group-summary { display: none; }
.nc-group-body { display: flex; flex-direction: column; gap: ${s("module-pad")}; min-width: 0; }
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
  padding: 0 0 ${s("control-gap")};
  border: 0;
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-ui-switch[aria-checked="true"] { color: ${s("text")}; border-bottom-color: ${s("accent")}; }
.nc-ui-switch:hover { color: ${s("text")}; border-bottom-color: ${s("text")}; }
.nc-ui-switch:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
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
    width: max(100%, ${s("target-min")});
    height: max(100%, ${s("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-toggle { overflow: visible; text-overflow: clip; }
  .nc-select { min-height: ${s("target-min")}; }
}
/* A panel (Rhythm's Parameters, under the grid): a page-coloured area, full bleed to the module's sides and
   bottom, a hairline above, a title and what it edits, and its controls in columns from 1024 px. */
.nc-section[data-nc-panel="true"] {
  flex: 1 0 auto;
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  padding: ${s("module-pad")};
  background: ${s("surface-page")};
  border-top: ${s("hairline")} solid ${s("divider")};
}
.nc-panel-hd {
  display: flex;
  align-items: baseline;
  gap: ${s("module-gap")};
  min-width: 0;
}
.nc-panel-title {
  margin: 0;
  font-size: ${s("title-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("title-tracking")};
  white-space: nowrap;
}
.nc-panel-subject {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  color: ${s("text-sub")};
}
.nc-section[data-nc-lane="1"] .nc-panel-subject { color: ${s("rhythm.lane-1")}; }
.nc-section[data-nc-lane="2"] .nc-panel-subject { color: ${s("rhythm.lane-2")}; }
.nc-section[data-nc-lane="3"] .nc-panel-subject { color: ${s("rhythm.lane-3")}; }
.nc-section[data-nc-lane="4"] .nc-panel-subject { color: ${s("rhythm.lane-4")}; }
.nc-panel-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${s("module-pad")};
  min-width: 0;
}
.nc-canvas {
  width: 100%;
  height: ${s("display-height")};
  display: block;
  background: transparent;
}
.nc-note {
  /* The containing block for its absolute token probe, so overflow: hidden clips the probe after a long note. */
  position: relative;
  margin: 0;
  min-width: 0;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nc-note[data-nc-tone="danger"] { color: ${s("danger")}; }
.nc-knob {
  width: ${s("knob-size")};
  height: ${s("knob-size")};
  flex: none;
  border-radius: 50%;
  border: ${s("hairline")} solid ${s("divider")};
  background: ${s("surface-page")};
  position: relative;
  padding: 0;
  touch-action: none;
  cursor: pointer;
  transition: none;
}
.nc-knob-mark {
  position: absolute;
  left: 50%;
  top: ${s("control-gap")};
  width: ${s("hairline")};
  height: ${s("control-gap")};
  background: ${s("text")};
  transform-origin: center ${s("module-gap")};
  transform: rotate(calc(var(--knob-turn, 0) * 1deg));
  transition: none;
}
.nc-knob:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Tabs stay on one line (no height jump); a tab that does not fit gives way with an ellipsis, and its full text stays
   its accessible name. */
.nc-choice-row {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: ${s("control-gap")} ${s("header-gap")};
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
  border-bottom: ${s("hairline")} solid transparent;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  padding: ${s("control-gap")} 0;
  cursor: pointer;
  transition: none;
}
/* On touch a tab cut to an ellipsis is still a full target: never narrower or shorter than target-min. */
@media (pointer: coarse) {
  .nc-choice { min-width: ${s("target-min")}; min-height: ${s("target-min")}; }
  /* Tabs that cannot shrink below target-min scroll within their row (no visible scrollbar), never the page. */
  .nc-choice-row { overflow-x: auto; scrollbar-width: none; }
  .nc-choice-row::-webkit-scrollbar { display: none; }
}
/* A captioned row (Gate's Rate in a narrow FX card): the label, then the tabs packed close so short ones never cut. */
.nc-choice-caption { flex: 0 0 auto; margin-inline-end: auto; }
.nc-choice-row[data-nc-caption] { gap: ${s("control-gap")}; margin-bottom: ${s("control-gap")}; }
.nc-choice-row[data-nc-caption] > .nc-choice { flex: 0 0 auto; overflow: visible; }
.nc-choice[aria-selected="true"] {
  color: ${s("text")};
  border-bottom-color: ${s("accent")};
}
.nc-choice:focus-visible {
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* Pad grid (NYX): pads as the way in. Empty pads are shaded and say Load; filled pads carry a lane-coloured bar and
   a mini waveform; the selected pad is outlined in the accent. */
.nc-padgrid { position: relative; }
.nc-padgrid-pads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: ${s("control-gap")}; }
.nc-padgrid-pads[data-nc-columns="4"] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.nc-padgrid-pad {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  align-content: start;
  min-width: 0;
  min-height: calc(${s("target-min")} * 1.5);
  padding: ${s("control-gap")} ${s("control-gap")} ${s("control-gap")} calc(${s("control-gap")} * 2);
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  text-align: left;
  cursor: pointer;
  -webkit-touch-callout: none;
  user-select: none;
  touch-action: manipulation;
}
.nc-padgrid-pad-bar {
  position: absolute;
  inset-block: ${s("control-gap")};
  inset-inline-start: ${s("hairline")};
  width: ${s("focus-width")};
  background: currentColor;
}
.nc-padgrid-pad-name { justify-self: start; align-self: flex-start; max-width: 100%; font-weight: ${s("control-weight")}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad-hint { display: none; color: ${s("text-sub")}; font-size: ${s("readout-size-small")}; }
.nc-padgrid-pad-badge {
  position: absolute;
  inset-block-start: ${s("control-gap")};
  inset-inline-end: ${s("control-gap")};
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  line-height: 1;
}
.nc-padgrid-pad-badge:empty { display: none; }
.nc-padgrid-pad-wave { width: 100%; height: ${s("slider-pitch")}; align-self: end; }
.nc-padgrid-pad-wave path { fill: currentColor; fill-opacity: 0.35; stroke: currentColor; stroke-width: 0.6; vector-effect: non-scaling-stroke; }
.nc-padgrid-pad[data-nc-lane="1"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-1")}; }
.nc-padgrid-pad[data-nc-lane="2"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-2")}; }
.nc-padgrid-pad[data-nc-lane="3"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-3")}; }
.nc-padgrid-pad[data-nc-lane="4"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { color: ${s("rhythm.lane-4")}; }
.nc-padgrid-pad[data-empty="true"] {
  align-content: center;
  justify-items: center;
  text-align: center;
  padding-inline-start: ${s("control-gap")};
  border-color: ${s("divider")};
  background: ${s("divider")};
  color: ${s("text-sub")};
}
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-name { font-weight: inherit; font-size: ${s("body-size")}; }
.nc-padgrid-pad[data-empty="true"] .nc-padgrid-pad-hint { display: block; }
.nc-padgrid-pad[data-hint="true"] .nc-padgrid-pad-hint { display: block; justify-self: start; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nc-padgrid-pad[data-empty="true"] :is(.nc-padgrid-pad-bar, .nc-padgrid-pad-wave) { display: none; }
.nc-padgrid-pad:hover { border-color: ${s("text")}; }
.nc-padgrid-pad[data-selected="true"] { border-color: ${s("accent")}; box-shadow: inset 0 0 0 ${s("hairline")} ${s("accent")}; }
.nc-padgrid-rename {
  position: absolute;
  z-index: 3;
  min-height: ${s("target-min")};
  padding: 0 ${s("control-gap")};
  border: ${s("hairline")} solid ${s("accent")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("control-weight")};
}
.nc-padgrid-rename:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-padgrid-pad[data-dragging="true"] { border-style: dashed; color: ${s("text-sub")}; }
.nc-padgrid-pad[data-drop="true"] { border-style: dashed; border-color: ${s("accent")}; }
.nc-padgrid-pad[data-playing="true"] .nc-padgrid-pad-wave path { fill-opacity: 0.7; }
.nc-padgrid-pad:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-slot-row { position: relative; }
.nc-slot-menu {
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${s("control-gap")};
  min-width: ${s("name-width")};
  padding: ${s("control-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
.nc-menu-btn {
  display: flex;
  align-items: center;
  min-height: ${s("target-min")};
  border: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size-small")};
  text-align: left;
  padding: 0;
  cursor: pointer;
  transition: none;
}
/* 44 px on every pointer (desktop too): a touch band drawn at the 20 px slider pitch; the extra height overlaps the
   gaps, not the rows. */
.nc-field[data-nc-slider] .nc-range {
  height: ${s("target-min")};
  margin-block: calc((${s("slider-pitch")} - ${s("target-min")}) / 2);
}
/* M and S on touch: each a full target-min box (the button paints smaller inside), touching, never overlapping.
   Only on a coarse pointer: on every pointer it made each lane target-min tall on desktop (Rhythm #40). */
@media (pointer: coarse) {
  .nc-ms-wrap { flex-basis: ${s("target-min")}; height: ${s("target-min")}; }
  .nc-ms-wrap + .nc-ms-wrap { margin-inline-start: calc(${s("module-gap")} * -1); }
  /* The ×'s touch target: target-min tall, out to the card's padding on the right; never over maximize. */
  .nc-fx-remove::before { height: max(100%, ${s("target-min")}); right: calc(${s("control-gap")} * -3); }
  .nc-fold-toggle::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: max(100%, ${s("target-min")});
    height: max(100%, ${s("target-min")});
    transform: translate(-50%, -50%);
  }
  .nc-ms {
    inset: calc((${s("target-min")} - ${s("slider-pitch")}) / 2);
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
  outline: ${s("focus-width")} solid ${s("focus-ring")};
  outline-offset: ${s("hairline")};
}
/* A hit pad grows a control that cannot grow its look to target-min, on every pointer. */
.nc-hit {
  display: block;
  position: absolute;
  pointer-events: auto;
  left: 50%;
  top: 50%;
  width: ${s("target-min")};
  height: ${s("target-min")};
  transform: translate(-50%, -50%);
}
@media (pointer: coarse) {
  .nc-hit { width: ${s("target-min-coarse")}; height: ${s("target-min-coarse")}; }
}
/* nc-ui step editor (openStepEditor): long-press a step for velocity and chance. Sits under the step;
   a bottom sheet at phone widths. Rows are 44 px so the sliders are thumb-sized. */
.nc-step-editor {
  position: fixed;
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: ${s("module-gap")};
  width: calc(${s("name-width")} * 6);
  max-width: calc(100vw - 2 * ${s("module-gap")});
  padding: ${s("module-gap")};
  background: ${s("surface-page")};
  border: ${s("hairline")} solid ${s("divider")};
  color: ${s("text")};
}
/* The step being edited: a dark ring (as Bass marks its selected pad), full strength, fill unchanged. */
.nc-pad[data-editing="true"], .nc-step-wrap[data-editing="true"] .nc-step {
  outline: ${s("focus-width")} solid ${s("text")};
  outline-offset: ${s("hairline")};
}
.nc-step-editor-scrim[data-placement="sheet"] { z-index: 4; background: ${s("dialog-scrim")}; }
.nc-step-editor[data-placement="sheet"] { z-index: 5; }
.nc-step-editor-head { display: flex; align-items: center; justify-content: space-between; gap: ${s("module-gap")}; }
.nc-step-editor-row {
  display: flex;
  align-items: center;
  gap: ${s("module-gap")};
  min-height: ${s("target-min")};
}
.nc-step-editor-row .nc-label { flex: none; min-width: ${s("name-width")}; }
.nc-step-editor-row .nc-range { flex: 1 1 0; min-width: 0; height: ${s("target-min")}; }
.nc-step-editor-row .nc-readout { flex: none; min-width: ${s("name-width")}; text-align: right; }
.nc-step-editor-done {
  min-width: ${s("target-min")};
  min-height: ${s("target-min")};
  border: 0;
  background: none;
  color: ${s("text")};
  font-family: ${s("font-ui")};
  font-size: ${s("label-size")};
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-step-editor-done:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-step-editor[data-placement="sheet"] {
  left: 0;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  padding-bottom: calc(${s("module-gap")} + env(safe-area-inset-bottom));
  border-width: ${s("hairline")} 0 0;
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
  gap: ${s("toast-gap")};
  max-width: calc(100vw - 2 * ${s("toast-offset")});
  min-height: ${s("toast-target")};
  padding: 0 0 0 ${s("toast-pad-x")};
  border-radius: ${s("toast-radius")};
  background: ${s("toast-bg")};
  color: ${s("toast-text")};
  font-family: ${s("font-ui")};
  font-size: ${s("toast-font-size")};
  line-height: ${s("label-leading")};
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0;
  transition: opacity ${s("motion-fade")} ${s("motion-fade-easing")};
}
.nc-ui-toast[data-placement="bottom"] { bottom: calc(${s("toast-offset")} + env(safe-area-inset-bottom)); }
.nc-ui-toast[data-placement="top"] { top: calc(${s("toast-offset")} + env(safe-area-inset-top)); }
/* In the Studio (html[data-nc-hosted]) the frame is as tall as its page: toasts and sheets keep to the part you can
   see, which the Studio writes as --nc-host-top / --nc-host-bottom. */
html[data-nc-hosted] .nc-ui-toast[data-placement="bottom"] { bottom: calc(var(--nc-host-bottom, 0px) + ${s("toast-offset")}); }
html[data-nc-hosted] .nc-ui-toast[data-placement="top"] { top: calc(var(--nc-host-top, 0px) + ${s("toast-offset")}); }
html[data-nc-hosted] .nc-step-editor[data-placement="sheet"] { bottom: var(--nc-host-bottom, 0px); }
.nc-ui-toast[data-placement="anchor"] { position: absolute; transform: none; }
.nc-ui-toast[data-state="open"] { opacity: 1; }
.nc-ui-toast[data-state="closing"] {
  opacity: 0;
  pointer-events: none;
  transition: opacity ${s("motion-fade-out")} ${s("motion-fade-out-easing")};
}
/* nc-ui help (installHelpTips): a label's description, shown when the pointer rests on it. The toast's dark slab,
   smaller and wrapping; it never takes the pointer, so it can't block the control under it. No motion. */
[data-nc-help] { cursor: help; }
[data-nc-help]:hover { text-decoration: underline dotted; text-underline-offset: 0.2em; }
.nc-ui-help {
  position: fixed;
  z-index: 6;
  max-width: 34ch;
  padding: calc(${s("toast-pad-x")} / 2) calc(${s("toast-pad-x")} * 0.75);
  border-radius: ${s("toast-radius")};
  background: ${s("toast-bg")};
  color: ${s("toast-text")};
  font-family: ${s("font-ui")};
  font-size: ${s("toast-font-size")};
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
  min-width: ${s("toast-target")};
  min-height: ${s("toast-target")};
  padding: 0 ${s("toast-pad-x")};
  border: 0;
  background: none;
  color: ${s("toast-action")};
  font: inherit;
  font-weight: ${s("title-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  cursor: pointer;
  transition: none;
}
.nc-ui-toast-action:focus-visible {
  outline: ${s("focus-width")} solid ${s("toast-action")};
  outline-offset: calc(-2 * ${s("focus-width")});
}
.nc-ui-toast-live {
  position: absolute;
  width: ${s("hairline")};
  height: ${s("hairline")};
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
  margin-inline: calc(${s("module-pad")} * -1);
  margin-bottom: calc(${s("module-pad")} * -1);
  border-top: ${s("hairline")} solid ${s("divider")};
}
.nc-module-body[data-nc-layout="console"] > .nc-section { gap: 0; padding-top: ${s("stack-card-pad-y")}; }
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
  grid-area: strips;
  flex-direction: row;
  align-items: flex-start;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scrollbar-width: thin;
  padding-inline: ${s("module-pad")} ${s("control-gap")};
  /* The strips run the full height (their own padding): no band above or below them. */
  padding-block: 0;
  /* The channel strips sit on the master's shade (Peter, 2026-10-30): the lightest step of the stack. */
  background: ${s("module-bg-stack-1")};
  ${_("text-sub")}: ${s("module-sub-stack-1")};
  ${_("divider")}: ${s("module-div-stack-1")};
  ${_("slider-track")}: ${s("module-div-stack-1")};
}
/* The fx area is as wide as the cards it shows (Peter, 2026-11-01: "Weird empty slot next to Master slider"): one
   column per shown card, none held empty, so the master sits right after the last card and the strips area (the
   flexible column) takes the rest. A paged area keeps three cards' width (below). */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] {
  grid-area: fx;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${s("fx-card-width")};
  align-items: stretch;
  padding-top: 0;
}
/* An optional meters section (the Studio's VU meters): after the FX cards, just left of the master, on the master's
   shade with a hairline between them. Without one the column is empty. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="meters"] {
  grid-area: meters;
  padding: ${s("stack-card-pad-y")} ${s("module-pad")} ${s("module-pad")};
  border-inline-end: ${s("hairline")} solid ${s("module-div-stack-1")};
  background: ${s("module-bg-stack-1")};
  ${_("text-sub")}: ${s("module-sub-stack-1")};
  ${_("divider")}: ${s("module-div-stack-1")};
  ${_("slider-track")}: ${s("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${s("control-gap")} ${s("module-pad")};
  padding-bottom: ${s("module-pad")};
  background: ${s("module-bg-stack-1")};
  ${_("text-sub")}: ${s("module-sub-stack-1")};
  ${_("divider")}: ${s("module-div-stack-1")};
  ${_("slider-track")}: ${s("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${s("stack-card-pad-y")} ${s("module-pad")} ${s("module-pad")};
  ${_("text-sub")}: inherit;
  ${_("divider")}: inherit;
  ${_("slider-track")}: inherit;
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="1"] { --nc-fx-card-bg: ${s("module-bg-adjacent-2")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="2"] { --nc-fx-card-bg: ${s("module-bg-adjacent-3")}; background: var(--nc-fx-card-bg); }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx[data-nc-depth="3"] { --nc-fx-card-bg: ${s("module-bg-adjacent-4")}; background: var(--nc-fx-card-bg); }
/* In the console a card is a column: a select row gets the same space under it as a slider row. */
.nc-module-body[data-nc-layout="console"] .nc-ui-fx { display: flex; flex-direction: column; gap: ${s("module-gap")}; }
.nc-module-body[data-nc-layout="console"] .nc-ui-fx > .nc-field:not([data-nc-slider]) { padding-bottom: ${s("module-gap")}; }
/* Folded cards in a console row (769 px up): a narrow column, the whole column one button. Once any card is folded the
   fx area is a row of its cards' own widths, so the strips get the room back. */
@media (min-width: 769px) {
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) {
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx { flex: none; width: ${s("fx-card-width")}; }
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
    width: calc(${s("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"] > .nc-ui-fx[data-nc-max="row"] { grid-column: span 3; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:has(> .nc-ui-fx[data-nc-folded]) > .nc-ui-fx[data-nc-max="row"][data-nc-max="row"] {
    width: calc(${s("fx-card-width")} * 3);
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
    scroll-padding-top: var(--nc-fx-pin-h, ${s("module-gap")});
    /* The foot shade (scroll) shows while there is more below; the card's own colour at the end of its content (local)
       covers it once scrolled to the end, or when nothing overflows. */
    background-image:
      linear-gradient(transparent, var(--nc-fx-card-bg) 70%),
      linear-gradient(transparent, ${s("divider")});
    background-position: bottom, bottom;
    background-size: 100% calc(${s("module-gap")} * 3), 100% ${s("module-gap")};
    background-repeat: no-repeat;
    background-attachment: local, scroll;
  }
  /* The pinned header (or bare name) holds the card's top padding, so nothing scrolls by above it; its fold triangle
     keeps its corner (the header is its containing block now, edge to edge). */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > :is(.nc-ui-fx-hd, .nc-ui-fx-name) {
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0 calc(${s("module-pad")} * -1) calc(${s("module-gap")} * -1);
    padding: ${s("stack-card-pad-y")} ${s("module-pad")} calc(${s("module-gap")} * 2);
    background-color: var(--nc-fx-card-bg);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"]:not(:has(> .nc-ui-fx[data-nc-max="row"])) > .nc-ui-fx:not([data-nc-folded]) > .nc-eq {
    position: sticky;
    top: var(--nc-fx-hd-h, 0);
    z-index: 1;
    margin-bottom: 0;
    padding-bottom: ${s("control-gap")};
    background-color: var(--nc-fx-card-bg);
    /* The card's colour out to its edges beside the graph (no spread: nothing below it is covered). */
    box-shadow: calc(${s("module-pad")} * -1) 0 0 var(--nc-fx-card-bg), ${s("module-pad")} 0 0 var(--nc-fx-card-bg);
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
    padding-top: ${s("target-min")};
  }
  /* No card folded on this page: three cards' width, a part-filled last page too, so the strips never shift. */
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged]:not(:has(> .nc-ui-fx[data-nc-folded]:not([data-nc-off-page]))) {
    min-width: calc(${s("fx-card-width")} * 3);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx { flex: none; width: ${s("fx-card-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="fx"][data-nc-paged] > .nc-ui-fx[data-nc-off-page][data-nc-off-page][data-nc-off-page] {
    order: -1;
    flex: none;
    width: ${s("fx-card-width")};
    margin-inline-end: calc(${s("fx-card-width")} * -1);
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
    gap: ${s("module-gap")};
    height: ${s("target-min")};
  }
}
/* A chevron button: a full target, a square outline like Moves' buttons, the chevron in ink so it reads at a glance.
   At an end it stays focusable (aria-disabled) and dims by colour. */
.nc-fx-page-btn {
  display: grid;
  place-items: center;
  flex: none;
  width: ${s("target-min")};
  height: ${s("target-min")};
  margin: 0;
  padding: 0;
  border: ${s("hairline")} solid ${s("text-sub")};
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("text")};
  cursor: pointer;
}
.nc-fx-page-btn:hover:not([aria-disabled="true"]) { border-color: ${s("text")}; }
.nc-fx-page-btn:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-fx-page-btn[aria-disabled="true"] { color: ${s("divider")}; border-color: ${s("divider")}; cursor: default; }
.nc-fx-page-icon {
  display: block;
  width: calc(${s("control-gap")} * 2.5);
  height: calc(${s("control-gap")} * 2.5);
  border-style: solid;
  border-color: currentColor;
  border-width: calc(${s("hairline")} * 2) calc(${s("hairline")} * 2) 0 0;
  transform: translateX(calc(${s("control-gap")} * -0.5)) rotate(45deg);
}
.nc-fx-page-btn[data-nc-fx-page="prev"] .nc-fx-page-icon { transform: translateX(calc(${s("control-gap")} * 0.5)) rotate(-135deg); }
.nc-fx-page-count {
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  font-variant-numeric: tabular-nums;
  color: ${s("text")};
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
  --nc-strip-ms-row: ${s("slider-pitch")};
  --nc-strip-knob-row: calc(${s("knob-size")} + ${s("control-gap")} + ${s("label-size")} * ${s("label-leading")});
  position: relative;
  flex: none;
  width: ${s("strip-width")};
  display: grid;
  grid-template-columns: ${s("control-gap")} minmax(0, 1fr) ${s("control-gap")};
  /* Name, Inserts, M/S, sends, pan, the fader body, the readout. */
  grid-template-rows: auto ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
  justify-items: center;
  row-gap: ${s("module-gap")};
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
  .nc-strip { --nc-strip-ms-row: ${s("target-min")}; }
}
/* sendsHidden: no sends row (the host's "hide the sends"); give it to every strip so their rows still line up. */
.nc-strip[data-nc-sends-hidden] {
  grid-template-rows: auto ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". hacks ." "ms ms ms" ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-sends-hidden] > .nc-strip-sends { display: none; }
.nc-strip + .nc-strip { border-inline-start: ${s("hairline")} solid ${s("divider")}; }
/* Channel strips alternate light and dark grey, full height, so a row of identical strips reads apart (Peter,
   2026-10-30); the master keeps the module's shade. */
.nc-strip:not([data-nc-master]) { --nc-strip-ground: var(--nc-strip-shade, ${s("strip-bg")}); background: var(--nc-strip-ground); }
.nc-strip:not([data-nc-master]):nth-child(even of .nc-strip:not([data-nc-master])) { --nc-strip-ground: var(--nc-strip-shade, ${s("strip-alt-bg")}); }
/* A shade a player picked (shade, 1-8; Peter, 2026-11-04): one of eight neutral greys (strip-shade-1..8), in place of
   the alternation. 1 and 2 are the alternation's own greys. On the darker four (5-8) the Inserts word at rest takes
   text-sub, so it keeps its contrast (the lighter hacks grey falls to 2.2:1 there). */
${[1,2,3,4,5,6,7,8].map(a=>`.nc-strip[data-nc-shade="${a}"] { --nc-strip-shade: ${s(`strip-shade-${a}`)}; }`).join(`
`)}
/* A compact knob's centre is the strip's own grey (--nc-strip-ground), not the page's, so it never shows as a dot. On
   3-8 the M and S hairline is mixed from the strip's grey (strip-divider vanishes on the middle greys, and reads as a
   light box on the darkest). */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${_("divider")}: color-mix(in oklab, ${s("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${_("meter-track")}: color-mix(in oklab, ${s("text-sub")} 30%, var(--nc-strip-shade)); }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]) { color: ${s("text-sub")}; }
.nc-strip:is([data-nc-shade="5"], [data-nc-shade="6"], [data-nc-shade="7"], [data-nc-shade="8"]) .nc-hacks:not([aria-pressed="true"]):hover { color: ${s("text")}; }
/* The strip menu (onShade): a small sheet under the grip, or where the name was right-clicked: "Shade", a row of Auto
   and the eight swatches (the picked one ringed in ink), then Move left / Move right with their keys. Over the page,
   so it never shifts the layout; page ground and a hairline (the kit draws no shadows). */
.nc-strip-menu {
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: ${s("control-gap")};
  min-width: calc(${s("strip-width")} * 2.5);
  padding: calc(${s("control-gap")} * 2) calc(${s("control-gap")} * 2.5);
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: ${s("surface-page")};
  color: ${s("text")};
  font-size: ${s("label-size")};
}
.nc-strip-menu-title { color: ${s("text-sub")}; font-weight: ${s("label-weight")}; letter-spacing: ${s("label-tracking")}; text-transform: uppercase; }
.nc-strip-menu-shades { display: flex; gap: ${s("control-gap")}; margin-bottom: ${s("control-gap")}; }
.nc-strip-menu-shades > button {
  flex: none;
  min-width: calc(${s("control-gap")} * 4.5);
  height: calc(${s("control-gap")} * 4.5);
  margin: 0;
  padding: 0 ${s("hairline")};
  border: ${s("hairline")} solid ${s("divider")};
  border-radius: ${s("slot-radius")};
  background: var(--nc-swatch, transparent);
  color: ${s("text-sub")};
  font: inherit;
  font-size: ${s("scale-size")};
  cursor: pointer;
}
.nc-strip-menu-shades > button[aria-checked="true"] { outline: calc(${s("hairline")} * 2) solid ${s("text")}; outline-offset: ${s("hairline")}; color: ${s("text")}; }
.nc-strip-menu-shades > button:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-menu-item {
  display: flex;
  justify-content: space-between;
  gap: calc(${s("control-gap")} * 3);
  margin: 0;
  padding: ${s("control-gap")} 0;
  border: 0;
  border-top: ${s("hairline")} solid ${s("divider")};
  background: transparent;
  color: ${s("text")};
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.nc-strip-menu-item:disabled { color: ${s("text-sub")}; cursor: default; }
.nc-strip-menu-item > kbd { font: inherit; color: ${s("text-sub")}; }
.nc-strip-menu-item:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: calc(${s("focus-width")} * -1); }
@media (pointer: coarse) {
  .nc-strip-menu-shades > button { min-width: calc(${s("target-min")} * 0.7); height: calc(${s("target-min")} * 0.7); }
  .nc-strip-menu-item { min-height: ${s("target-min")}; align-items: center; }
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
  align-self: stretch;
  padding-block: ${s("stack-card-pad-y")} ${s("module-pad")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add { margin-block: ${s("stack-card-pad-y")} ${s("module-pad")}; }
.nc-strip[data-nc-master] { width: ${s("strip-width-master")}; }
/* Name row: the name, and the remove × when the strip can be removed. */
.nc-strip-hd { display: flex; align-items: baseline; justify-content: center; gap: ${s("control-gap")}; max-width: 100%; min-width: 0; }
.nc-strip-remove {
  position: relative;
  flex: none;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  font-family: ${s("font-readout")};
  font-size: ${s("label-size")};
  line-height: 1;
  cursor: pointer;
  transition-property: color;
  transition-duration: ${s("transition-feedback")};
}
.nc-strip-remove::before { content: ""; position: absolute; inset: calc(${s("control-gap")} * -1); }
.nc-strip-remove:hover { color: ${s("danger")}; }
.nc-strip-remove:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-name {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
  text-transform: uppercase;
  color: ${s("text")};
}
.nc-strip[data-silent="true"] .nc-strip-name, .nc-strip[data-silent="true"] .nc-strip-db { color: ${s("text-sub")}; }
/* Minimize (onFold): the fold triangle in the top-left corner, above the name; the name row and its × as before, so a
   minimize click can't land on remove. Folded, the strip is a narrow column on the same rows (meters still line up): the
   ▶ in the corner, the name row kept but unseen, M and S stacked over the Inserts and M/S rows, then the name read bottom to top under a small mark in the
   fader cap's colour (one button, the FX fold's look) beside a thin meter. At once: no motion. */
/* The triangle sits in the strip's top-left corner, above the name; folded, centred over the column. */
.nc-strip > [data-nc-strip-hide] { position: absolute; top: ${s("control-gap")}; left: ${s("control-gap")}; z-index: 1; }
.nc-strip[data-nc-folded] > [data-nc-strip-hide] { left: 50%; transform: translateX(-50%); }
/* Move (onMove): a grip of six dots in the top-right corner, across from the triangle, in text-sub (ink on hover), so a
   strip says it can be dragged. touch-action none: a drag from the grip moves the strip at once on touch, never the
   page. Not on a folded strip (its column is the handle there). */
.nc-strip > [data-nc-strip-grip] {
  position: absolute;
  top: ${s("control-gap")};
  right: ${s("control-gap")};
  /* Over the next strip's fold triangle, whose touch target reaches back across the strips' edge. */
  z-index: 2;
  display: inline-flex;
  margin: 0;
  padding: ${s("hairline")};
  border: 0;
  background: transparent;
  color: ${s("text-sub")};
  line-height: 1;
  cursor: grab;
  touch-action: none;
}
.nc-strip > [data-nc-strip-grip]:hover { color: ${s("text")}; }
.nc-strip > [data-nc-strip-grip]:active { cursor: grabbing; }
.nc-strip > [data-nc-strip-grip]:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-grip-dots {
  display: block;
  width: calc(${s("control-gap")} * 1.5);
  height: calc(${s("control-gap")} * 2.25);
  background: radial-gradient(circle, currentColor ${s("hairline")}, transparent calc(${s("hairline")} * 1.5)) 0 0 / calc(${s("control-gap")} * 0.75) calc(${s("control-gap")} * 0.75);
}
.nc-strip[data-nc-folded] > [data-nc-strip-grip] { display: none; }
@media (pointer: coarse) {
  .nc-strip > [data-nc-strip-grip]::before {
    content: "";
    position: absolute;
    right: calc(${s("control-gap")} * -1);
    top: calc(${s("control-gap")} * -1);
    width: calc(${s("target-min")} / 2);
    height: calc(${s("target-min")} / 2);
  }
}
/* Folded: no gutters, and M and S take the Inserts, M/S and sends rows (sends hidden: the pan row) as one area, so the
   two fit stacked at full size with the rows unchanged. */
.nc-strip[data-nc-folded] {
  width: ${s("strip-fold-width")};
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
  grid-template-rows: auto var(--nc-strip-knob-row) ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) var(--nc-strip-knob-row) auto auto;
  grid-template-areas: ". hd ." ". trim ." ". hacks ." "ms ms ms" ". sends ." ". pan ." ". body ." ". db .";
}
.nc-strip[data-nc-trim][data-nc-sends-hidden] {
  grid-template-rows: auto var(--nc-strip-knob-row) ${s("slider-pitch")} var(--nc-strip-ms-row) var(--nc-strip-knob-row) auto auto;
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
  grid-auto-columns: ${s("slider-pitch")};
  grid-auto-rows: ${s("slider-pitch")};
  gap: ${s("module-gap")};
  align-self: start;
  justify-self: center;
}
/* Touch: each folded M and S as wide as the column and target-min tall, touching (after the rule above, so it wins). */
@media (pointer: coarse) {
  .nc-strip[data-nc-folded] > .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-auto-rows: ${s("target-min")}; gap: 0; justify-self: stretch; }
}
.nc-strip[data-nc-folded] > .nc-strip-body {
  grid-template-columns: auto auto;
  column-gap: ${s("control-gap")};
}
.nc-strip[data-nc-folded] .nc-strip-body > .nc-strip-fold { display: flex; grid-column: 1; grid-row: 1 / span 2; width: auto; }
.nc-strip[data-nc-folded] .nc-strip-body > .nc-meter { grid-column: 2; }
.nc-strip[data-nc-folded] .nc-meter-bar { width: ${s("control-gap")}; }
.nc-strip-fold { gap: ${s("control-gap")}; }
.nc-strip-fold > .nc-ui-fx-fold-name { font-size: ${s("label-size")}; font-weight: ${s("label-weight")}; letter-spacing: ${s("label-tracking")}; text-transform: uppercase; }
.nc-strip[data-silent="true"] .nc-strip-fold > .nc-ui-fx-fold-name { color: ${s("text-sub")}; }
/* Folded with a pan: a tiny track with a dot where the pan sits (--nc-strip-pan, −1..1). */
.nc-strip-fold-pan {
  position: relative;
  flex: none;
  width: ${s("fader-cap-height")};
  height: ${s("control-gap")};
  background: linear-gradient(${s("divider")}, ${s("divider")}) center / 100% ${s("hairline")} no-repeat;
}
.nc-strip-fold-pan[hidden] { display: none; }
.nc-strip-fold-pan::after {
  content: "";
  position: absolute;
  top: 0;
  left: calc((var(--nc-strip-pan, 0) + 1) / 2 * (100% - ${s("control-gap")}));
  width: ${s("control-gap")};
  height: ${s("control-gap")};
  border-radius: 50%;
  background: ${s("text-sub")};
}
.nc-strip-fold-cap {
  flex: none;
  width: ${s("fader-cap-height")};
  height: ${s("control-gap")};
  background: var(--nc-strip-cap, ${s("fader-cap")});
}
/* M and S: an explicit two-column grid (never flex with overlapping margins), centred at the slider pitch; on touch
   it fills the strip's full width (the gutters too), two target-min boxes side by side, touching, nothing past the
   strip's edges. The kit's hit pads take any width short of target-min (the divider hairline) outward. */
.nc-strip-ms {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${s("slider-pitch")};
  grid-template-rows: ${s("slider-pitch")};
  column-gap: ${s("control-gap")};
  justify-self: center;
  align-self: start;
}
.nc-strip > .nc-strip-ms > .nc-ms-wrap { margin: 0; width: auto; }
/* The master's Sends button (onSendsView): Inserts' twin in the M/S row, the strip's width, the slider pitch tall. */
.nc-strip > .nc-strip-ms:has(> .nc-sends-view-wrap) { grid-auto-columns: minmax(0, 1fr); justify-self: stretch; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap { grid-column: 1 / -1; height: ${s("slider-pitch")}; }
.nc-strip > .nc-strip-ms > .nc-sends-view-wrap > .nc-sends-view { inset-inline: ${s("control-gap")}; width: auto; }
@media (pointer: coarse) {
  .nc-strip-ms { grid-auto-columns: minmax(0, 1fr); grid-template-rows: ${s("target-min")}; column-gap: 0; justify-self: stretch; }
}
/* M and S on a channel strip: the kit's outlined squares, their hairline the one for the strip's own shade
   (strip-divider). The console's body hands its stack-1 hairline down, a near match for the light strip (gone there)
   but lighter than the alternate one (a light box there), so M and S showed boxes on every other strip only. */
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${_("divider")}: ${s("strip-divider")}; }
/* Hacks: a full-width toggle above M and S, in mixed case and a lighter grey (Peter); pressed while the console's fx area shows this strip's stack. */
.nc-strip-hacks { display: flex; width: 100%; height: ${s("slider-pitch")}; }
.nc-hacks-wrap { position: relative; flex: 1 1 auto; height: ${s("slider-pitch")}; }
.nc-hacks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  /* A light outline at rest, the same on every strip (Peter, 2026-11-01: the box only says the stack has effects):
     text-sub at 50% over the strip hairline; text-sub on hover, so it still reads as a button. */
  border: ${s("hairline")} solid color-mix(in oklab, ${s("text-sub")} 50%, ${s("strip-divider")});
  border-radius: ${s("slot-radius")};
  background: transparent;
  color: ${s("strip-hacks-text")};
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  /* Stated, not left out: an older bundled copy of the kit (an app's fallback layer) set uppercase and tracking. */
  letter-spacing: normal;
  text-transform: none;
  cursor: pointer;
  transition: none;
}
.nc-hacks:hover { color: ${s("text")}; border-color: ${s("text-sub")}; }
/* hacksEmpty (no effects in the stack): the plain word, no box, hover too; still a button with its focus ring. */
.nc-hacks[data-nc-empty]:not([aria-pressed="true"]) { border-color: transparent; }
.nc-hacks[aria-pressed="true"] {
  background: ${s("fader-cap-master")};
  border-color: ${s("fader-cap-master")};
  color: ${s("surface-page")};
}
.nc-hacks:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-sends { display: flex; align-items: flex-start; gap: ${s("module-gap")}; }
/* Pan: one compact bipolar knob, centred, in its own row (empty on the master, so the faders line up). */
.nc-strip-pan { display: flex; justify-content: center; align-items: flex-start; }
.nc-field[data-nc-compact] {
  flex-direction: column-reverse;
  align-items: center;
  gap: ${s("control-gap")};
}
.nc-field[data-nc-compact] .nc-label { min-width: 0; line-height: ${s("label-leading")}; }
.nc-field[data-nc-compact] .nc-readout { display: none; }
/* A compact knob draws its amount: a ring over its 270° travel, filled in the meter blue up to the value. */
.nc-field[data-nc-compact] .nc-knob {
  border: 0;
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${s("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${s("meter-fill")} calc(var(--knob-turn, 0) * 1deg), ${s("meter-track")} 0 270deg, transparent 0);
}
/* A bipolar knob (pan) fills from the top of its travel (the centre) to the value, either way. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-knob {
  background:
    radial-gradient(closest-side, var(--nc-strip-ground, ${s("surface-page")}) 70%, transparent 72%),
    conic-gradient(from 225deg, ${s("meter-track")} calc(var(--knob-from, 135) * 1deg), ${s("meter-fill")} 0 calc(var(--knob-to, 135) * 1deg), ${s("meter-track")} 0 270deg, transparent 0);
}
/* Its value ("C", "L 30") shows in the label's place while hovered, focused or dragged; no motion. */
.nc-field[data-nc-compact][data-nc-bipolar] .nc-readout {
  order: -1;
  flex: none;
  width: auto;
  min-width: max-content;
  max-width: none;
  text-align: center;
  font-size: ${s("label-size")};
  line-height: ${s("label-leading")};
  white-space: nowrap;
}
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-label { display: none; }
.nc-field[data-nc-compact][data-nc-bipolar]:is(:hover, :focus-within, [data-nc-dragging]) .nc-readout { display: block; }
/* Its mark starts at the bottom of the travel (7:30) and turns 270° to 4:30, along the ring. */
.nc-field[data-nc-compact] .nc-knob-mark { transform: rotate(calc((var(--knob-turn, 0) - 135) * 1deg)); }
.nc-strip-body {
  display: grid;
  grid-template-columns: ${s("fader-cap-width")} auto auto;
  grid-template-rows: ${s("clip-size")} ${s("fader-height")};
  justify-content: center;
  column-gap: ${s("control-gap")};
  row-gap: ${s("control-gap")};
  padding-block: calc(${s("fader-cap-height")} / 2);
}
.nc-strip-body > .nc-fader { grid-column: 1; grid-row: 2; }
.nc-strip-body > .nc-scale { grid-column: 2; grid-row: 2; }
.nc-strip-body > .nc-meter { grid-column: 3; grid-row: 1 / span 2; }
/* The dB scale between fader and meter: faint mono labels, each centred on its level. */
.nc-scale {
  position: relative;
  width: 3ch;
  font-family: ${s("font-readout")};
  font-size: ${s("scale-size")};
  font-variant-numeric: tabular-nums;
  color: ${s("text-sub")};
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
  width: ${s("fader-cap-width")};
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
  width: ${s("rule-strong")};
  transform: translateX(-50%);
  background: ${s("fader-track")};
}
.nc-fader-cap {
  position: absolute;
  left: 0;
  width: 100%;
  height: ${s("fader-cap-height")};
  top: calc((1 - var(--fader-pos, 0)) * 100%);
  transform: translateY(-50%);
  background: ${s("fader-cap")};
  transition: none;
}
.nc-fader-cap::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: ${s("hairline")};
  transform: translateY(-50%);
  background: ${s("fader-cap-line")};
}
/* A host can colour a channel's fader cap with --nc-strip-cap (Peter, 2026-10-31: the Studio uses each instrument's
   own colour, muted). The kit names no instrument colours. Unset, the cap stays ink; the master stays accent. */
.nc-strip .nc-fader-cap { background: var(--nc-strip-cap, ${s("fader-cap")}); }
.nc-fader[data-dragging="true"] .nc-fader-cap { background: ${s("accent")}; }
/* The master's cap in Prussian blue (Peter, 2026-10-30): the master reads apart from the channels at a glance. */
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] .nc-fader-cap { background: ${s("fader-cap-master")}; }
.nc-fader:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("control-gap")}; }
/* The level meter: peak over RMS in the lighter Prussian blue, a hold line, a clip light on top. It follows the audio
   every frame (transforms written by the meter's own ballistics), so nothing here transitions. */
.nc-meter {
  display: grid;
  grid-template-rows: subgrid;
  row-gap: ${s("control-gap")};
  justify-items: stretch;
}
.nc-meter-clip {
  position: relative;
  display: block;
  height: ${s("clip-size")};
  padding: 0;
  border: 0;
  background: ${s("meter-track")};
  cursor: pointer;
  transition: none;
}
.nc-meter-clip::before {
  content: "";
  position: absolute;
  inset: calc(${s("control-gap")} * -1);
}
.nc-meter-clip[data-lit="true"] { background: ${s("meter-clip")}; }
.nc-meter-clip:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-meter-bars { display: flex; gap: ${s("hairline")}; height: 100%; }
.nc-meter-bar {
  position: relative;
  width: ${s("meter-width")};
  height: 100%;
  overflow: hidden;
  background: ${s("meter-track")};
}
.nc-meter-peak, .nc-meter-rms {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  transition: none;
}
.nc-meter-peak { background: ${s("meter-peak")}; }
.nc-meter-rms { background: ${s("meter-fill")}; }
.nc-meter-hold {
  position: absolute;
  inset: 0;
  border-top: ${s("rule-strong")} solid ${s("meter-hold-mark")};
  transform: translateY(100%);
  transition: none;
}
.nc-meter-hold[data-off="true"] { visibility: hidden; }
/* An FX card's level meter (fx-level.js): two thin bars beside the switch, in (left) and out (right), on the card's own
   divider. Fixed size, so it never moves the header; the loop writes transforms, so nothing transitions. A bypassed
   card dims it by colour; the hot colour (ASTRID's title orange) shows only within 1 dB of full scale. Folded, it sits at the foot of the
   column and gives way when there is no room. */
.nc-fx-level { display: inline-flex; flex: none; align-items: stretch; gap: ${s("hairline")}; height: ${s("fx-level-height")}; }
.nc-fx-level-bar { position: relative; width: ${s("fx-level-bar")}; overflow: hidden; background: ${s("divider")}; }
.nc-fx-level[data-nc-rows="1"] > [data-nc-level="out"] { display: none; }
.nc-fx-level-fill {
  position: absolute;
  inset: 0;
  transform-origin: bottom;
  transform: scaleY(0);
  background: ${s("fx-level-in")};
  transition: none;
}
[data-nc-level="out"] > .nc-fx-level-fill { background: ${s("fx-level-out")}; }
[data-nc-dim="true"] .nc-fx-level-fill { background: ${s("text-sub")}; }
.nc-fx-level-fill[data-clip="true"], [data-nc-dim="true"] .nc-fx-level-fill[data-clip="true"] { background: ${s("fx-level-hot")}; }
.nc-ui-fx-fold > .nc-fx-level { margin-top: auto; height: auto; flex: 0 1 ${s("fx-level-fold-length")}; min-height: 0; }
.nc-strip-db {
  min-width: 0;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size")};
  font-variant-numeric: tabular-nums;
  color: ${s("text")};
  white-space: nowrap;
  cursor: default;
  transition: none;
}
.nc-strip-db:not(:disabled) { cursor: text; }
.nc-strip-db:hover { text-decoration: underline; text-decoration-color: ${s("divider")}; text-underline-offset: ${s("control-gap")}; }
/* The type-in: the readout opened as a field, the same size and font, an accent hairline under it. */
.nc-strip-db-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  border-bottom: ${s("hairline")} solid ${s("accent")};
  border-radius: 0;
  background: transparent;
  color: ${s("text")};
  font-family: ${s("font-readout")};
  font-size: ${s("readout-size")};
  font-variant-numeric: tabular-nums;
  text-align: center;
}
.nc-strip-db-input:focus-visible { outline: none; }
/* The add slot: a ghost strip after the last channel, "+ Add" over a select of what can be added. */
.nc-strip-add {
  position: relative;
  flex: none;
  align-self: stretch;
  width: ${s("strip-width")};
  margin-inline-start: ${s("module-gap")};
  border: ${s("hairline")} dashed ${s("divider")};
  color: ${s("text-sub")};
  transition-property: color, border-color;
  transition-duration: ${s("transition-feedback")};
}
.nc-strip-add:hover, .nc-strip-add:focus-within { color: ${s("text")}; border-color: ${s("text-sub")}; }
.nc-strip-add-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${s("control-gap")};
  pointer-events: none;
}
.nc-strip-add-plus { font-family: ${s("font-readout")}; font-size: ${s("title-size-slim")}; line-height: 1; }
.nc-strip-add-label {
  font-size: ${s("label-size")};
  font-weight: ${s("label-weight")};
  letter-spacing: ${s("label-tracking")};
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
  font-size: ${s("body-size")};
}
.nc-strip-add:has(.nc-strip-add-select:focus-visible) { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
.nc-strip-db:focus-visible { outline: ${s("focus-width")} solid ${s("focus-ring")}; outline-offset: ${s("hairline")}; }
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
    border-top: ${s("hairline")} solid ${s("module-div-stack-1")};
  }
  /* Phones: the master as narrow as a channel strip, so the strips keep the room. */
  .nc-strip[data-nc-master] { width: ${s("strip-width")}; }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] { padding-inline: 0; }
}
@media (min-width: 1024px) {
  .nc-module-body[data-nc-layout="console"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] {
    padding-inline-start: ${s("module-pad-x-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip {
    padding-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="strips"] > .nc-strip-add {
    margin-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
    padding-inline-end: ${s("module-pad-x-desktop")};
    padding-bottom: ${s("module-pad-y-desktop")};
  }
  .nc-module-body[data-nc-layout="console"] .nc-ui-fx {
    margin: 0;
    padding: ${s("stack-card-pad-y")} ${s("module-pad-x-desktop")} ${s("module-pad-y-desktop")};
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
  background: ${s("accent")};
  font-family: ${s("font-ui")};
  pointer-events: none;
}
@media (min-width: 768px) {
  .nc-page { padding: ${s("page-pad-y-md")} ${s("page-pad-x-md")}; }
  .nc-page-hd { flex-direction: row; align-items: flex-end; justify-content: space-between; padding-bottom: ${s("page-head-gap-md")}; }
  .nc-page-hd::before { top: calc(${s("page-pad-y-md")} * -1); left: calc(${s("page-pad-x-md")} * -1); right: calc(${s("page-pad-x-md")} * -1); }
}
/* A minimized full-width module (compact, e.g. the Studio's Mix): one slim bar at every width, title, then the summary
   on one line (cut with an ellipsis), then the index. Overrides the column-wise slim of side-by-side modules. */
.nc-module[data-nc-compact][data-nc-slim] {
  display: flex !important;
  flex-direction: row;
  align-items: center;
  gap: ${s("header-gap")};
  padding-inline: ${s("module-pad")};
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
html[data-nc-hosted] .nc-page { padding-top: ${s("module-gap")}; min-height: 0; }
html[data-nc-hosted] .nc-page-hd {
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${s("module-gap")};
}
html[data-nc-hosted] .nc-page-hd::before { display: none; }
html[data-nc-hosted] .nc-page-hd > :first-child { display: none; }
html[data-nc-hosted] .nc-page-body { padding-top: ${s("module-gap")}; }
/* Tablets (769-1023 px): the same 2 x 5 slot grid as phones and desktop; one row of 10 drew 14 px slots here. */
@media (min-width: 769px) and (max-width: 1023px) {
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${s("control-gap")};
  }
  .nc-snap-wrap { width: 100%; max-width: none; height: ${s("target-min")}; }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
}
@media (min-width: 1024px) {
  .nc-page-body { padding-top: ${s("page-body-gap-lg")}; }
}
@media (min-width: 1280px) {
  .nc-page { padding-inline: ${s("page-pad-x-xl")}; }
  .nc-page-hd::before { left: calc(${s("page-pad-x-xl")} * -1); right: calc(${s("page-pad-x-xl")} * -1); }
}
@media (min-width: 1024px) {
  .nc-stack[data-nc-layout="adjacent"] {
    display: grid;
    grid-template-columns: var(--astrid-cols);
    align-items: stretch;
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module {
    border-bottom: 0;
    border-inline-end: ${s("hairline")} solid ${s("divider")};
  }
  .nc-stack[data-nc-layout="adjacent"] > .nc-module:last-child { border-inline-end: 0; }
  .nc-module { padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")}; }
  /* Desktop slots (item C): Bass's 2 x 5 grid across the column, each slot as tall as the Pattern buttons
     (target-min). One row of 10 left each slot 19 px wide at 1280 and 16 px at 1024. */
  .nc-slot-line { flex-wrap: wrap; }
  .nc-snap-row {
    flex: 1 0 100%;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: ${s("control-gap")};
  }
  .nc-snap-wrap {
    width: 100%;
    max-width: none;
    height: ${s("target-min")};
  }
  .nc-snap { font-size: ${s("readout-size")}; }
  .nc-snap-wrap > .nc-hit { display: none; }
  .nc-section[data-nc-inset="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-section[data-nc-panel="true"] {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    margin-bottom: calc(${s("module-pad-y-desktop")} * -1);
    padding: ${s("module-pad-y-desktop")} ${s("module-pad-x-desktop")};
  }
  .nc-panel-body {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: ${s("module-pad-x-desktop")};
  }
  .nc-module[data-nc-slim] {
    display: block;
    padding-inline: ${s("module-pad-x-slim")};
  }
  .nc-module[data-nc-slim] .nc-module-hd { display: flex; }
  .nc-module[data-nc-slim] .nc-module-hd,
  .nc-module[data-nc-slim] .nc-slim {
    flex-direction: column;
    align-items: flex-start;
  }
  .nc-module[data-nc-slim] .nc-slim { margin-top: ${s("module-gap")}; }
  .nc-module[data-nc-slim] .nc-slim-lines { white-space: normal; }
  .nc-ui-fx {
    margin-inline: calc(${s("module-pad-x-desktop")} * -1);
    padding-inline: ${s("module-pad-x-desktop")};
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
    border-bottom: ${s("hairline")} solid ${s("divider")};
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
    gap: ${s("module-gap")};
    padding-block: ${s("control-gap")};
    background: ${s("surface-page")};
    border-bottom: ${s("hairline")} solid ${s("divider")};
  }
  .nc-pads {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: ${s("module-gap")};
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
    max-width: ${s("slot-span")};
    height: ${s("slot-block")};
    justify-self: center;
  }
  .nc-snap { font-size: ${s("readout-size")}; }
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
${Va("")}
}
@media (max-width: 1023px) {
${Va("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${pn("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${pn("")}
}
@media (max-width: 1023px) {
${pn("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${s("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${s("fill-panel")};
  border-radius: ${s("fill-radius")};
  box-shadow: inset 0 0 0 ${s("fill-gutter")} ${s("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${s("fill-radius")} ${s("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${s("fill-cell")};
  border-color: ${s("fill-cell")};
  border-radius: ${s("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${s("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${s("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${s("fill-panel")}) 9%, ${s("fill-panel")});
  border-radius: ${s("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${s("fill-panel")}) 14%, ${s("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${s("fill-panel")}) 14%, ${s("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${s("fill-panel")}; }
@media (prefers-reduced-motion: reduce) {
  .nc-btn, .nc-btn:active, .nc-toggle, .nc-seg > button, .nc-sparkle, .nc-sparkle-btn, .nc-sparkle-btn:active,
  .nc-ui-toast, .nc-ui-toast[data-state="closing"], .nc-ui-switch, .nc-select,
  .nc-meter, .nc-meter-fill, .nc-step[data-playhead="true"], .nc-fader-cap, .nc-meter-clip, .nc-ui-fx, .nc-ui-fx-fold, .nc-strip, .nc-eq-node::after, .nc-fx-max-icon > i, .nc-fold-tri {
    transition: none;
    animation: none;
  }
  .nc-snap[data-queued="true"][data-pulse="true"] {
    outline-color: ${s("accent-faint")};
    background: transparent;
    box-shadow: inset 0 calc(-1 * ${s("focus-width")} * 2) 0 ${s("accent-faint")};
  }
}
`}var hn=null,dr="nc-ui-fallback";function Ws(e=globalThis.document){if(!e?.documentElement||(e.documentElement,hn&&hn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${dr} {
${cr()}
}
`,e.head.append(t),hn=t}var pr=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,ur=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=pr,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&ur(document);function Ys(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let o=t.createElement("span");o.dataset.ncOff="",o.textContent=e.offText??"Off",a.append(i,o),n.append(a);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var Gs=new WeakMap,Ua=.25;function hr(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(a,i);let o=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),p=()=>{n.style.setProperty("--fader-pos",String(o)),n.setAttribute("aria-valuenow",String(Math.round(o*1e3)/1e3))},u=h=>{let f=d(h);f!==o&&(o=f,p(),l?.(f))},g=0,m=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let f=n.getBoundingClientRect();h.target!==i&&f.height>0&&u(1-(h.clientY-f.top)/f.height),g=h.clientY,m=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!m)return;let f=n.getBoundingClientRect().height||1,y=(g-h.clientY)/f*(h.shiftKey?Ua:1);g=h.clientY,u(o+y)});let w=()=>{m=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let f=h.shiftKey?r*Ua:r,y={ArrowUp:o+f,ArrowRight:o+f,ArrowDown:o-f,ArrowLeft:o-f,PageUp:o+r*10,PageDown:o-r*10,Home:0,End:1};h.key in y&&(h.preventDefault(),u(y[h.key]))});let x={el:n,get value(){return o},get dragging(){return m},set(h){m||(o=d(Number(h)||0),p())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(r=h.step),h.onChange&&(l=h.onChange),h.onReset&&(c=h.onReset)}};return x.setLabel(e.label),x.set(e.value??0),x.setText(e.valueText),Gs.set(n,x),x}function mr(e){return Gs.get(e)}var Js=new WeakMap,fr=.2,gr=1.5,br=.5;function yr(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Ka(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:yr(a.getComputedStyle(e).getPropertyValue(_(t)),n)}function wr(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let o=t.createElement("div");o.className="nc-meter-bars",o.setAttribute("aria-hidden","true");let r=[];for(let x=0;x<n;x++){let h=t.createElement("span");h.className="nc-meter-bar";let f=t.createElement("span");f.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let b=t.createElement("span");b.className="nc-meter-hold",h.append(f,y,b),o.append(h),r.push({peak:f,rms:y,hold:b,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(i,o);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,g=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},m=(x,h,f,y)=>{let b=Math.round(y*1e3)/1e3;f[h]!==b&&(f[h]=b,x.style.transform=h==="hold"?`translateY(${Math.round((1-b)*1e3)/10}%)`:`scaleY(${b})`)};i.addEventListener("click",()=>{w.clear(),c?.()});let w={el:a,get clipped(){return d},update(x,h){p<0&&(p=Ka(a,"motion-meter-fall",fr)),u<0&&(u=Ka(a,"motion-meter-hold",gr));let f=Math.max(0,Math.min(.25,Number(h)||0)),y=p>0?Math.exp(-f/p):0;r.forEach((b,k)=>{let T=x[k]??x[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(T.peak)||0)),$=Math.min(E,Math.max(0,Number(T.rms)||0));T.over&&w.clip(),b.level.peak=E>=b.level.peak?E:E+(b.level.peak-E)*y,b.level.rms=$>=b.level.rms?$:$+(b.level.rms-$)*y,b.holdAge+=f,E>=b.holdAt?(b.holdAt=E,b.holdAge=0):b.holdAge>u&&(b.holdAt=Math.max(E,b.holdAt-br*f)),m(b.peak,"peak",b.shown,b.level.peak),m(b.rms,"rms",b.shown,b.level.rms),m(b.hold,"hold",b.shown,b.holdAt),b.hold.dataset.off=b.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,g())},clear(){d=!1,g()},reset(){for(let x of r)x.level.peak=0,x.level.rms=0,x.holdAt=0,x.holdAge=0,m(x.peak,"peak",x.shown,0),m(x.rms,"rms",x.shown,0),m(x.hold,"hold",x.shown,0),x.hold.dataset.off="true"},setLabel(x){l=x,g()},configure(x){x.onClear&&(c=x.onClear)}};return g(),w.reset(),Js.set(a,w),w}function xr(e){return e?Js.get(e):void 0}var vr=3,$r=new Set(["freq","q","rate","time","log"]);function ha(e,t,n){return!e||!$r.has(e)||!(n>t)?"linear":t>0?"log":"power"}function $t(e,t,n){return ha(e,t,n)!=="linear"}function _t(e,t,n,a){let i=Number(a);if(!(n>t)||!Number.isFinite(i))return 0;let o=Math.min(n,Math.max(t,i)),r=ha(e,t,n);if(r==="log")return Math.log(o/t)/Math.log(n/t);let l=(o-t)/(n-t);return r==="power"?Math.cbrt(l):l}function Xs(e,t,n,a){let i=Math.min(1,Math.max(0,Number(a)||0)),o=ha(e,t,n);return o==="log"?t*(n/t)**i:t+(n-t)*(o==="power"?i**vr:i)}function Qs(e,t,n,a){let i=Math.min(n,Math.max(t,e));if(a>0){i=t+Math.round((i-t)/a)*a;let o=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));i=Number(i.toFixed(o)),i=Math.min(n,Math.max(t,i))}return i}function gt(e,t,n,a){return Math.round(_t(e,t,n,a)*1e3)}function Vt(e,t,n,a,i){return Qs(Xs(e,t,n,Number(a)/1e3),t,n,i)}function kr(e,t,n=!1){let a=Number(e)||0,i=n?1:1e3/100,o=null;return t==="ArrowRight"||t==="ArrowUp"?o=a+i:t==="ArrowLeft"||t==="ArrowDown"?o=a-i:t==="PageUp"?o=a+1e3/10:t==="PageDown"?o=a-1e3/10:t==="Home"?o=0:t==="End"&&(o=1e3),o===null?null:Math.min(1e3,Math.max(0,Math.round(o)))}function ma(e,t,n,a,i,o=!1,r){let l=gt(e,t,n,a),c=kr(l,i,o);if(c===null)return null;let d=Vt(e,t,n,c,r),p=Math.sign(c-l),u=Qs(Number(a),t,n,r);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=Vt(e,t,n,c,r);return d}function Wa(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Er(e,t,n,a=n/6){let i=e.some(p=>p===null),o=Math.max(0,n-(i?a:0)),r=e.reduce((p,u,g)=>u===null?p:p+Wa(t[g]),0),l=r>0?o/r:0,c=e.map(p=>p===null?0:Math.min(o,Wa(p)*l));if(i){let p=c.reduce((g,m)=>g+m,0),u=e.indexOf(null);c[u]=Math.max(a,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return i&&(d[d.length-1]=n),d}function Ar(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*a)),o=Math.max(1,Math.floor(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let r=e.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:t,h:n}}function we(e){return Math.max(0,Math.min(1,e))}function Zs(e,t){let{ctx:n,w:a,h:i}=Ar(e);if(!n)return;n.clearRect(0,0,a,i);let o=rr(e);if(t.paint==="swatch"){let c=G(e,"accent"),d=G(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,i),n.fillStyle=d,n.fillRect(a/2,0,a/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){Tr(n,a,i,t,e,o);return}if(t.paint==="filter"){let c=t.mode??"lp",d=G(e,Ks(c)),p=G(e,"divider"),u=we(t.cutoff??.5),g=.08+(1-we(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(a,i*.72),n.stroke(),n.beginPath();for(let m=0;m<=a;m++){let w=m/Math.max(1,a),x=0;c==="lp"?x=w<u?1:Math.max(0,1-(w-u)/g):c==="hp"?x=w>u?1:Math.max(0,1-(u-w)/g):x=Math.max(0,1-Math.abs(w-u)/g);let h=i*.78-x*i*.62;m===0?n.moveTo(m,h):n.lineTo(m,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=G(e,"text-sub"),n.font=o,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=G(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,g]=Er([c,d],t.max??[1,4],a),m=2,w=i-1;n.beginPath(),n.moveTo(p,w),n.lineTo(u,m);let x=Math.max(1,Math.ceil(g-u));for(let h=1;h<=x;h++){let f=h/x;n.lineTo(u+(g-u)*f,w-(w-m)*Math.exp(-4.6*f)*(1-f*.01))}n.lineTo(g,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=G(e,"accent"),g=G(e,"text-sub"),m=i/2;n.fillStyle=G(e,"accent-soft"),n.fillRect(we(d)*a,0,(we(p)-we(d))*a,i),n.strokeStyle=G(e,"divider"),n.beginPath(),n.moveTo(0,m),n.lineTo(a,m),n.stroke();let w=Math.floor(c.length/2);for(let x=0;x<w;x++){let h=(x+.5)/w*a,f=Math.max(-1,Math.min(1,c[x*2]??0)),y=Math.max(-1,Math.min(1,c[x*2+1]??0)),b=(x+.5)/w;n.strokeStyle=b>=d&&b<=p?u:g,n.beginPath(),n.moveTo(h,m-y*(m-1)),n.lineTo(h,m-f*(m-1)+.5),n.stroke()}n.strokeStyle=u;for(let x of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(we(x)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=G(e,"text"),n.fillRect(Math.round(we(t.position)*(a-1)),0,1,i)),w||(n.fillStyle=g,n.font=o,n.fillText(t.empty??"Empty",0,m+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=we(t.level??0);n.fillStyle=G(e,"divider"),n.fillRect(0,i*.4,a,i*.2),n.fillStyle=G(e,"accent"),n.fillRect(0,i*.4,a*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=G(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,a,i*.1),n.fillStyle=G(e,"rhythm.playhead"),n.fillRect(l/r*a,i*.3,Math.max(1,a/r),i*.4),e.dataset.ncAccent=G(e,"accent")}var ut=20,Pn=2e4,mn=24,Ya=-60;function Sr(e,t,n,a,i=48e3){let o=2*Math.PI*Math.min(t,i*.49)/i,r=Math.cos(o),l=Math.sin(o)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let u=1+l,g=-2*r,m=1-l,w=2*Math.PI*a/i,x=(b,k,T)=>b+k*Math.cos(w)+T*Math.cos(2*w),h=(b,k)=>-(b*Math.sin(w)+k*Math.sin(2*w)),f=Math.hypot(x(c,d,p),h(d,p)),y=Math.hypot(x(u,g,m),h(g,m));return y>0?f/y:0}function Mr(e,t){return Math.log(Math.max(ut,Math.min(Pn,e))/ut)/Math.log(Pn/ut)*t}function Ga(e,t,n){let a=Math.max(Ya,Math.min(mn,e));return t+(mn-a)/(mn-Ya)*(n-t)}function Tr(e,t,n,a,i,o){let r=a.mode??"lp",l=G(i,Ks(r)),c=G(i,"divider"),d=G(i,"text-sub"),p=Number.parseFloat(String(o).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,g=Math.max(u+4,n-p-3),m=a.q??Math.SQRT1_2,w=Math.round(Ga(0,u,g))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let x=0;x<=t;x++){let h=ut*(Pn/ut)**(x/Math.max(1,t)),f=a.open?1:Sr(r,a.hz,m,h,a.sampleRate),y=Ga(20*Math.log10(Math.max(1e-5,f)),u,g);x===0?e.moveTo(x,y):e.lineTo(x,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let x=Math.round(Mr(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(x,u),e.lineTo(x,g),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=o,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=l,i.dataset.ncFilterHz=String(Math.round(a.hz))}function pe(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let i=n.defaultView.getComputedStyle(a).color;return a.remove(),i}function Lr(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var Re=20,kt=2e4,fa=Math.log(kt/Re),In=32,Cr=250,Fr=-100,Nr=1200,zr=4.5,Ja=-6,De=-96,Dr=48,Xa=[100,1e3,1e4],qr=[6,12];function We(e,t){return Math.log(Math.max(Re,Math.min(kt,e))/Re)/fa*t}function qt(e,t){return Re*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*fa)}function Ae(e,t,n,a){let i=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Bn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ei=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Pr(e,t,n,a){let i=n?3:1,o=c=>({db:Math.max(-a,Math.min(a,e.db+c*i))}),r=c=>({hz:Math.max(e.minHz??Re,Math.min(e.maxHz??kt,e.hz*2**(c*i/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return o(1);case"ArrowDown":return o(-1);case"ArrowRight":return e.moveHz?r(1):o(1);case"ArrowLeft":return e.moveHz?r(-1):o(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function ga(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Ir(e,t,n,a,i,o,r,l,c){let d=c?.25:1,p={},u=Math.max(1,o/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-a*d/u*r/ga(e))),e.moveHz){let g=t.hz*Math.exp(n*d/Math.max(1,i)*fa);p.hz=Math.max(e.minHz??Re,Math.min(e.maxHz??kt,g))}return p}function Br(e,t,n,a,i){let o=Math.max(0,n.left)+1,r=Math.min(n.right,i)-1,l=Math.min(t.width*3+a*2,r-o),c=Math.max(o,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var X=new WeakMap;function Rr(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let o=document.createElement("canvas");o.className="nc-eq-curve",o.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,a.append(i,o);for(let c of e.bands)a.append(jr(n,c,t));a.append(r),a.addEventListener("click",c=>{if(!oi(n)||c.button>0)return;let d=ii(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),X.set(n,{control:e,cache:null,spec:null,active:null}),ni(n,e),n}function ti(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function jr(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},o=()=>i()?.bands.find(d=>d.id===t.id)??null,r=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=o();p&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},a.dataset.drag="true",xe(e,t.id))}),a.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=i(),u=o(),g=X.get(e);if(!p||!u||!g?.box)return;let{w:m,h:w,pad:x}=g.box;p.onBand(u.id,Ir(u,r.start,d.clientX-r.x,d.clientY-r.y,m,w,p.range??18,x,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&xe(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let p=i(),u=o();if(!p||!u)return;let g=Pr(u,d.key,d.shiftKey,p.range??18);g&&(d.preventDefault(),g==="reset"?p.onReset?.(u.id):p.onBand(u.id,g),xe(e,u.id))});let c=null;return a.addEventListener("wheel",d=>{let p=i(),u=o();if(!p||!u?.moveQ)return;d.preventDefault();let g=d.timeStamp;(!c||g-c.t>400)&&(c={q:u.q,t:g});let m=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-m/240))),c.t=g,p.onBand(u.id,{q:c.q}),xe(e,u.id)},{passive:!1}),a.addEventListener("pointerenter",()=>xe(e,t.id)),a.addEventListener("focus",()=>xe(e,t.id)),a.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==a&&xe(e,null)}),a.addEventListener("blur",()=>{r||xe(e,null)}),a}function xe(e,t){let n=X.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Je(e):ba(e)}function ba(e){let t=X.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let i=[a.label,ei(a.db)];a.kind==="peak"?i.push(Bn(a.hz),`Q ${a.q.toFixed(1)}`):i.push(`${a.kind==="lowshelf"?"below":"above"} ${Bn(a.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(Or(t.control,a)),n.hidden=!1;let{w:o,h:r,pad:l}=t.box,c=We(a.hz,o),d=Ae(a.db*ga(a),r,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,g=Math.max(0,Math.min(o-p,c-p/2)),m=d-u-l*1.5>=0?d-u-l*1.5:Math.min(r-u,d+l*1.5);n.style.left=`${Math.round(g)}px`,n.style.top=`${Math.round(m)}px`}function Or(e,t){return e.bands.indexOf(t)%3+1}function ni(e,t){let n=X.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ya(e);let a=t.range??18;t.bands.forEach((i,o)=>{let r=ti(e,i.id);r instanceof HTMLElement&&(r.dataset.tone=String(o%3+1),r.dataset.kind=i.kind,r.setAttribute("aria-label",`${i.label} band`),r.setAttribute("aria-valuemin",String(-a)),r.setAttribute("aria-valuemax",String(a)),r.setAttribute("aria-valuenow",String(i.db)),r.setAttribute("aria-valuetext",i.valueText??`${ei(i.db)}, ${Bn(i.hz)}`),r.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?r.setAttribute("data-nc-help",i.help):r.removeAttribute("data-nc-help"))}),Je(e),Wr(e)}function ai(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*a)),o=Math.max(1,Math.round(n*a));(e.width!==i||e.height!==o)&&(e.width=i,e.height=o);let r=e.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:t,h:n}}function si(e){return{curve:pe(e,"eq-curve"),fill:pe(e,"eq-fill"),quiet:pe(e,"text-sub"),grid:pe(e,"eq-grid"),zero:pe(e,"divider"),label:pe(e,"text-sub"),spectrum:pe(e,"eq-spectrum"),bands:[pe(e,"eq-band-1"),pe(e,"eq-band-2"),pe(e,"eq-band-3")]}}function Hr(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Je(e){X.has(e)&&ya(e);let t=X.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:i,w:o,h:r}=ai(n);if(!i)return;let l=Math.max(8,Math.round(r*.06)),c=a.range??18;t.box={w:o,h:r,pad:l},t.colours=si(e);let d=t.colours,p=Hr(a,o);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(o)+1),T=new Float64Array(k);for(let $=0;$<k;$++)T[$]=qt($/(k-1)*o,o);let E=null;try{E=typeof a.response=="function"?a.response(T):null}catch{E=null}t.cache={key:p,freqs:T,total:E?.total??new Float64Array(k),bands:E?.bands??[]}}i.clearRect(0,0,o,r);let u=Lr(e),g=a.on!==!1;_r(i,o,r,c,l,d,u);let{freqs:m,total:w,bands:x}=t.cache,h=Array.from(m,k=>We(k,o)),f=Ae(0,r,c,l);x.forEach((k,T)=>{if(!k||!k.some(M=>Math.abs(M)>.05))return;let E=g?d.bands[T%3]:d.quiet,$=Array.from(k,M=>Ae(M,r,c,l));i.save(),t.active&&a.bands[T]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=E,Qa(i,h,$,f)),i.globalAlpha=g?.75:.4,i.strokeStyle=E,i.lineWidth=.75,fn(i,h,$),i.restore()});let y=Array.from(w,k=>Ae(k,r,c,l)),b=g?d.curve:d.quiet;i.save(),i.fillStyle=g?d.fill:d.quiet,i.globalAlpha=g?.2:.08,Qa(i,h,y,f),i.restore(),i.save(),i.strokeStyle=g?d.fill:b,i.lineJoin="round",i.lineCap="round",g&&(i.globalAlpha=.16,i.lineWidth=4,fn(i,h,y)),i.globalAlpha=1,i.strokeStyle=b,i.lineWidth=1.25,fn(i,h,y),i.restore(),Vr(e),ba(e)}function _r(e,t,n,a,i,o,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<Re||p>kt)continue;let u=Math.round(We(p,t))+.5;e.globalAlpha=Xa.includes(p)?.9:.35,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of qr)if(!(c>a))for(let d of[1,-1]){let p=Math.round(Ae(c*d,n,a,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=o.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=o.zero;let l=Math.round(Ae(0,n,a,i))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=o.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Xa){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=We(c,t)+3;e.fillText(d,u+p+2>t?We(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=Ae(c,n,a,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Ut(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let i=(t[a]+t[a+1])/2,o=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],i,o)}e.lineTo(t[t.length-1],n[n.length-1])}function fn(e,t,n){e.beginPath(),Ut(e,t,n),e.stroke()}function Qa(e,t,n,a){e.beginPath(),Ut(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function ii(e){return e.closest("[data-nc-maxable]")}function oi(e){let t=ii(e);return!!t&&!t.hasAttribute("data-nc-max")}function ya(e){let t=oi(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=X.get(e);n?.active&&(n.active=null,ba(e))}return t}function Vr(e){ya(e);let t=X.get(e);if(!t?.box)return;let{w:n,h:a,pad:i}=t.box,o=t.control.range??18;for(let r of t.control.bands){let l=ti(e,r.id);l instanceof HTMLElement&&(l.style.left=`${We(r.hz,n).toFixed(1)}px`,l.style.top=`${Ae(r.db*ga(r),a,o,i).toFixed(1)}px`)}}function Ur(e,t,n,a){let i=a/2/n,o=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=qt(d,t),g=qt(p,t),m=qt(c/(e-1)*t,t);o[c]=Math.min(n-1,u/i),r[c]=Math.min(n-1,g/i),l[c]=zr*Math.log2(m/1e3)}return{lo:o,hi:r,tilt:l}}function Kr(e,t,n){let a=Math.floor(t),i=Math.ceil(n);if(i-a<=1){let r=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*r}let o=-1/0;for(let r=a;r<=i&&r<e.length;r++)e[r]>o&&(o=e[r]);return o}function Wr(e){let t=X.get(e);if(t){if(!t.control.spectrum){li(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let i=X.get(e)?.spec;i&&(i.visible=a.some(o=>o.isIntersecting),Rn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Rn(e)}}function Rn(e){let t=X.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){ri(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=jn(e),n.onVis||(n.onVis=()=>Rn(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&On(e,!1)}function jn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function On(e,t){let n=X.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,gn(e,jn(e))),Cr):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(i=>(n.raf=0,gn(e,i))):n.timer=a.setTimeout(()=>(n.timer=0,gn(e,jn(e))),In))}function ri(e){let t=X.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function li(e){let t=X.get(e)?.spec;if(!t)return;ri(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=X.get(e);n&&(n.spec=null)}function gn(e,t){let n=X.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){li(e);return}if(!a.analyser)return;if(t-a.last<In-4&&!a.idle){On(e,!1);return}let i=a.last?Math.min(.25,(t-a.last)/1e3):In/1e3;a.last=t;let o=e.querySelector(".nc-eq-spectrum");if(!(o instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=ai(o);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==p)&&(a.map={cols:d,w:l,sr:p,...Ur(d,l,a.buf.length,p)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let u=-1/0,g=Dr*i,{lo:m,hi:w,tilt:x}=a.map;for(let f=0;f<d;f++){let y=Kr(a.buf,m[f],w[f]);y>u&&(u=y);let b=y+x[f],k=a.disp[f]-g;a.disp[f]=b>k?b:k}u>Fr&&(a.loud=t);let h=t-a.loud>Nr;r.clearRect(0,0,l,c),(!h||a.disp.some(f=>f>De))&&Yr(r,l,c,a.disp,n.colours??si(e)),a.idle=h&&!a.disp.some(f=>f>De),On(e,a.idle)}function Yr(e,t,n,a,i){let o=a.length,r=new Array(o),l=new Array(o),c=d=>{let p=a[Math.max(0,Math.min(o-1,d))];return Number.isFinite(p)?p:De};for(let d=0;d<o;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(De,Math.min(Ja,Number.isFinite(p)?p:De))-De)/(Ja-De);r[d]=d/(o-1)*t,l[d]=n-u*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Ut(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Ut(e,r,l),e.stroke(),e.restore()}var oe=new WeakMap,Gr=450,Jr=6,Xr=33,bn=24,Qr="http://www.w3.org/2000/svg";function Zr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function el(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function tl(e,t,n,a,i){let o=e.slice();if(t===a)return o[a]=i,o;let r=t<a?1:-1;for(let l=t;l!==a+r;l+=r){let c=(l-t)/(a-t);o[l]=Math.round((n+(i-n)*c)*100)/100}return o}function nl(e,t){let n=e.steps[t],a=(e.shapes??[]).find(o=>o.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${i}`}function qe(e,t){let n=document.createElementNS(Qr,e);for(let[a,i]of Object.entries(t))n.setAttribute(a,String(i));return n}function ci(e){let t=qe("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(qe("path",{d:e})),t}function al(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let o=document.createElement("div");o.className="nc-lsteps-shapes",o.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(a,i,o,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return oe.set(n,c),il(n,a),ol(n,r),di(n,e),n}function re(e){let t=oe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function sl(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function yn(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=sl(e);return{i:el(t.clientX,a),level:Zr(t.clientY-n.top,n.height)}}function il(e,t){let n=oe.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",o=>{let r=re(e);if(!r||o.button>0||!r.steps.length)return;o.preventDefault(),Kt(e),t.setPointerCapture?.(o.pointerId);let l=yn(t,o),c=r.steps.map(d=>d.level);n.drag={id:o.pointerId,x:o.clientX,y:o.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Za(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,re(e)?.onLevels(d.start.slice(),!0),wn(e,d.i))},Gr)}),t.addEventListener("pointermove",o=>{let r=n.drag;if(!r||r.id!==o.pointerId||r.long||!r.moved&&Math.hypot(o.clientX-r.x,o.clientY-r.y)<Jr)return;r.moved=!0,a();let l=yn(t,o);Za(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let i=o=>{let r=n.drag;!r||r.id!==o.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(o.pointerId),r.long||re(e)?.onLevels(r.levels.slice(),!0),Hn(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",o=>{let r=n.drag;!r||r.id!==o.pointerId||(a(),n.drag=null,r.long||re(e)?.onLevels(r.start.slice(),!0),Hn(e,-1))}),t.addEventListener("contextmenu",o=>{re(e)?.onShape&&(o.preventDefault(),wn(e,yn(t,o).i))}),t.addEventListener("keydown",o=>{let r=re(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=u=>{let g=r.steps.map(m=>m.level);g[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,r.onLevels(g,!0)};switch(o.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(o.shiftKey?.01:.05));break;case"ArrowDown":p(d-(o.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;wn(e,c);break;default:return}o.preventDefault(),_n(e)}),t.addEventListener("focus",()=>_n(e)),t.addEventListener("blur",()=>{for(let o of t.querySelectorAll("[data-focus]"))o.removeAttribute("data-focus")})}function Za(e,t,n,a,i,o){let r=oe.get(e).drag;r&&(r.levels=tl(r.levels,t,n,a,i),Hn(e,a,r.levels[a]),re(e)?.onLevels(r.levels.slice(),o))}function Hn(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function _n(e){let t=oe.get(e),n=e.querySelector(".nc-lsteps-plot"),a=re(e);if(!n||!a)return;for(let o of n.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t.focus?o.dataset.focus="true":o.removeAttribute("data-focus");let i=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",nl(a,i))}function ol(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Kt(e,!0);return}let a=[...t.querySelectorAll("button")],i=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(i+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(i-1+a.length)%a.length]?.focus())}),oe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Kt(e)}}function wn(e,t){let n=re(e),a=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!i)return;let o=oe.get(e);o.focus=t,a.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,a.append(r);for(let m of n.shapes??[]){let w=document.createElement("button");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",n.steps[t]?.shape===m.value?"true":"false"),m.icon&&w.append(ci(m.icon)),w.append(document.createTextNode(m.label)),w.addEventListener("click",()=>{re(e)?.onShape?.(t,m.value),Kt(e,!0)}),a.append(w)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",o.outside,!0);let l=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=a.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,g=Math.max(0,Math.min(c.width-p,u-p/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(g)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Kt(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",oe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function rl(e,t){let n=oe.get(e),a=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",i.textContent="";for(let o=0;o<t;o++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(o),o%4===0&&o>0&&(r.dataset.beat="true");let l=qe("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(qe("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),qe("path",{class:"nc-lsteps-env",d:""}),qe("path",{class:"nc-lsteps-top",d:""}),qe("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),a.append(r);let c=document.createElement("span");o%4===0&&(c.textContent=String(o+1)),o%4===0&&o>0&&(c.dataset.beat="true"),i.append(c)}}}function di(e,t){let n=oe.get(e);if(!n)return;n.control=t;let a=t.steps.length;rl(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let o=Math.max(.5,Math.min(.75,t.swing??.5)),r=i.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((m,w)=>{let x=r[w];if(!x)return;let h=String((w%2?1-o:o)*2);x.style.setProperty("--nc-lsteps-grow",h),l[w]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&w>=t.played?x.dataset.out="true":x.removeAttribute("data-out"),x.dataset.zero=m.level<=0?"true":"false";let f=Math.max(0,Math.min(1,m.level)),y=x.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-f*100)),y.setAttribute("height",String(f*100));let b=t.curve?t.curve(w,bn):null,k="M0 100",T="";for(let E=0;E<=bn;E++){let $=b?Math.max(0,Math.min(1,b[E]??f)):f,M=E/bn*100,F=100-$*100;k+=` L${M.toFixed(2)} ${F.toFixed(2)}`,T+=`${E?" L":"M"}${M.toFixed(2)} ${F.toFixed(2)}`}x.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),x.querySelector(".nc-lsteps-top").setAttribute("d",T)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(m=>`${m.value}:${m.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let m of t.shapes??[]){let w=document.createElement("button");w.type="button",w.className="nc-lsteps-shape",w.setAttribute("role","tab"),w.dataset.shape=String(m.value),m.icon&&w.append(ci(m.icon)),w.append(document.createTextNode(m.label)),w.addEventListener("click",()=>re(e)?.onShapeAll?.(m.value)),c.append(w)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??a,u=t.steps[0]?.shape,g=t.steps.slice(0,p).every(m=>m.shape===u);for(let m of c.querySelectorAll(".nc-lsteps-shape")){let w=g&&m.dataset.shape===String(u);m.setAttribute("aria-selected",w?"true":"false"),m.tabIndex=w||!g&&m===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),_n(e),n.last=-2,ll(e)}function ll(e){let t=oe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&xn(e,null);return}let a=0,i=o=>{if(t.loop=0,!e.isConnected||!t.control.playhead){xn(e,null);return}o-a>=Xr&&(a=o,xn(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function xn(e,t){let n=oe.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===a&&n.lastLocked===i)){n.last=a,n.lastLocked=i;for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===a?(o.dataset.playhead="true",o.dataset.locked=i?"true":"false"):(o.removeAttribute("data-playhead"),o.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var cl=.8912509381337456,Vn=32,dl=250,pl=1200,ul=.2,pi=1.5;function hl(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function ml(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",a.append(i),t.append(a)}return t}var Wt=new WeakMap,es=new WeakMap;function ts(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let i=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),o=Number.parseFloat(i);return Number.isFinite(o)?i.endsWith("ms")?o/1e3:o:n}function fl(e){let t=es.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(i=>{for(let o of i){let r=Wt.get(o.target);r&&(r.seen.set(o.target,o.isIntersecting),ht(r))}Ke(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)ht(i);Ke(t)}),es.set(e,t),t}var ui=e=>e.els.some(t=>t.isConnected);function gl(e){if(!e.loop.io)return ui(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ht(e){let t=!e.dead&&!!e.source&&gl(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=wa(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Wn(e))}function wa(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Ke(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){hi(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=wa(e)),!e.raf&&!e.timer&&Un(e,!1)}function Un(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>ns(e,wa(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),dl):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,ns(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Vn)}function hi(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function ns(e,t){if(t-e.last<Vn-4&&!e.idle&&e.last){Un(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Vn/1e3;e.last=t,e.frames++;let a=!1,i=!1;for(let o of e.recs){if(!ui(o)){(o.placed||e.frames-o.born>90)&&mi(o);continue}o.placed=!0,o.open&&(i=!0,bl(o,n,t)&&(e.loud=t),(o.disp[0]>0||o.disp[1]>0)&&(a=!0))}if(!i){hi(e);return}e.idle=t-e.loud>pl&&!a,Un(e,e.idle)}function bl(e,t,n){if(e.fall<0){let g=e.els[0];e.fall=ts(g,"motion-meter-fall",ul),e.hold=ts(g,"motion-meter-hold",pi)}let a=null;try{a=e.source.read()}catch{a=null}let i=typeof a=="number",o=i?a:Number(a?.in)||0,r=!i&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=r&&Number(a.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let g of e.els)g.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[o,l],u=!1;for(let g=0;g<2;g++){let m=hl(p[g]);m>0&&(u=!0),e.disp[g]=m>=e.disp[g]?m:m+(e.disp[g]-m)*d,e.disp[g]<.001&&(e.disp[g]=0),p[g]>=cl&&(e.clipAt[g]=n);let w=e.clipAt[g]>0&&n-e.clipAt[g]<e.hold*1e3;Kn(e,g,e.disp[g],w)}return u}function Kn(e,t,n,a){let i=Math.round(n*1e3)/1e3,o=a?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===o)){e.shown[t]=i,e.clipShown[t]=o;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${i})`,l.dataset.clip=o)}}}function Wn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Kn(e,0,0,!1),Kn(e,1,0,!1)}function mi(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Wt.get(t)===e&&Wt.delete(t)}function yl(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,i=fl(a),o={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:pi,rows:""};for(let r of n)Wt.set(r,o),i.io?.observe(r);if(i.recs.add(o),Wn(o),!i.io){let r=a.defaultView,l=()=>{ht(o),Ke(i)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!o.dead){if(l===o.source){ht(o),Ke(i);return}o.open&&(o.open=!1,o.source?.close?.(),Wn(o)),o.source=l,ht(o),Ke(i)}},destroy(){o.dead||mi(o),Ke(i)}}}var fi={slop:8,longPressMs:500,pitchPx:16},wl=class{constructor(e,t,n=fi){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let i=t-this.x0,o=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(i,o)<this.config.slop)return;Math.abs(o)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-o/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function xl(e,t,n,a=fi){let i=!1,o=0,r=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),g=[...e.querySelectorAll(t)],m=u?g.findIndex(h=>h===u||h.contains(u)):-1;if(m>=0)return m;let w=-1,x=Number.POSITIVE_INFINITY;return g.forEach((h,f)=>{if(h.hidden)return;let y=h.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let b=Math.abs(d-(y.left+y.width/2));b<x&&b<=y.width&&(w=f,x=b)}),w},l=new wl(r,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},a),c=()=>{o&&clearTimeout(o),o=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),o=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var gi="netcomposer.groups.v1";function xa(){try{return globalThis.localStorage??null}catch{return null}}function va(e=xa(),t=gi){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,o]of Object.entries(n))typeof o=="boolean"&&a.set(i,o);return a}catch{return new Map}}function bi(e,t,n,a=gi){let i=va(e,a);i.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(i)))}catch{}}function vl(e,t=xa()){return va(t).get(e.id)??e.open===!0}function $l(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let o=document.createElement("span");o.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),i.append(o,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";bi(xa(),e.id,d),Yn(a,d);let p=t(a);p?.type==="group"&&p.onToggle?.(d)}),a.append(i,c),yi(a,e),Yn(a,vl(e)),wi(a,e),a}function Yn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function yi(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function wi(e,t){yi(e,t)&&Yn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";a&&a.textContent!==i&&(a.textContent=i)}var St="application/x-nc-pad",as="http://www.w3.org/2000/svg";function kl(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],i=[];for(let o=0;o<n;o++){let r=Math.floor(o*t/n),l=Math.max(r+1,Math.floor((o+1)*t/n)),c=0,d=0;for(let u=r;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:o/(n-1)*100;a.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${i.reverse().join("L")}Z`}function El(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,o)=>a.append(Al(n,o,t))),n.append(a),n.addEventListener("keydown",i=>{i.key==="Escape"&&Pt(n)}),vi(n,e),n}function Al(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(as,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(as,"path");return c.append(d),a.append(i,o,r,l,c),Ml(e,a,t,n),o.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&a.dataset.empty!=="true"&&xi(e,a,t,n)}),a.addEventListener("dragstart",p=>{if(a.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(St,String(t)),p.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(St)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(St)&&!p.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",p=>{delete a.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let g=p.dataTransfer?.getData(St);if(g!==void 0&&g!==""){p.preventDefault(),p.stopPropagation();let w=Number(g);w!==t&&u.onMove?.(w,t,p.altKey);return}let m=p.dataTransfer?.files?.[0];m&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,m))}),a}function Sl(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Ml(e,t,n,a){let i=0,o=!1,r=0,l=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;o=!1,r=d.clientX,l=d.clientY,c();let p=a(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,o=ss(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),o=ss(e,t,n,a)}),t.addEventListener("click",()=>{if(o){o=!1;return}Sl(e,n,a)})}function ss(e,t,n,a){let i=a(e);if(i?.type!=="padGrid"||!i.menu)return!1;let o=i.menu(n);if(!o.length)return!1;Pt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Pt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of o){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{Pt(e);let g=a(e);g?.type==="padGrid"&&(p.id==="rename"&&g.onRename?xi(e,t,n,a):g.onMenu?.(n,p.id))}),l.append(u)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function xi(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=a(e);if(i?.type!=="padGrid")return;let o=document.createElement("input");o.type="text",o.className="nc-padgrid-rename",o.maxLength=i.nameMax??24,o.value=i.pads[n]?.label??"",o.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.top-r.top}px`,o.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=o.value.trim();o.remove(),t.focus();let g=a(e);p&&u&&g?.type==="padGrid"&&g.onRename?.(n,u)};o.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),o.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])o.addEventListener(p,u=>u.stopPropagation());e.append(o),o.focus(),o.select()}function Pt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function vi(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,i)=>{let o=n[i];if(!(o instanceof HTMLButtonElement))return;let r=o.querySelector(".nc-padgrid-pad-name"),l=o.querySelector(".nc-padgrid-pad-hint"),c=o.querySelector(".nc-padgrid-pad-wave path"),d=o.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),o.draggable=!a.empty,a.empty?(o.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete o.dataset.empty,r&&(r.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",kl(a.peaks))),!a.empty&&a.hint?o.dataset.hint="true":delete o.dataset.hint,a.lane?o.dataset.ncLane=String(a.lane):delete o.dataset.ncLane;let p=t.selected===i;p?o.dataset.selected="true":delete o.dataset.selected,o.setAttribute("aria-pressed",p?"true":"false"),a.playing?o.dataset.playing="true":delete o.dataset.playing,o.setAttribute("aria-label",a.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${p?", selected":""}`)})}function ne(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function on(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(a,i),n}function is(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function bt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Tl=450,os=8;function fe(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Ll(e){let t=or(e,"target-min");return t>0?t:44}function Cl(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Ll(e),a=n/2,i=t.map(o=>o.parentElement?.getBoundingClientRect()??null);for(let o=0;o<t.length;o++){let r=t[o],l=i[o];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-a,u=c+a,g=d-a,m=d+a;for(let w=0;w<t.length;w++){if(o===w)continue;let x=i[w];if(!x||x.width===0)continue;let h=x.left+x.width/2,f=x.top+x.height/2;Math.abs(f-d)<a*2&&(h>c?u=Math.min(u,(c+h)/2):h<c&&(p=Math.max(p,(c+h)/2))),Math.abs(h-c)<a*2&&(f>d?m=Math.min(m,(d+f)/2):f<d&&(g=Math.max(g,(d+f)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),g=Math.min(g,l.top),m=Math.max(m,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${g-l.top}px`,r.style.width=`${Math.max(0,u-p)}px`,r.style.height=`${Math.max(0,m-g)}px`,r.style.transform="none"}}function $i(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function rs(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Ie(e,t){switch(e.type){case"slider":return Fl(e,t);case"select":return zl(e,t);case"toggle":return Dl(e,t);case"button":return ql(e,t);case"readout":return Pl(e);case"label":return jl(e);case"note":return ls(e);case"knob":return _l(e,t);case"choice":return Vl(e,t);case"slotRow":return Ul(e,t);case"stepGrid":return Gl(e,t);case"canvas":return Zl(e);case"fx":return lc(e,t);case"eqGraph":return Rr(e,t);case"levelSteps":return al(e,t);case"group":return $l(e,t,Ie);case"strip":return ec(e,t);case"stripAdd":return sc(e,t);case"padGrid":return El(e,t);case"moves":return Bl(e,t);default:return ls({id:"unknown",text:""})}}function ce(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ai(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(ki(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??bt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),is(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")is(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Se(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Ol(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??bt(t.value))}else if(t.type==="choice")Si(e,t);else if(t.type==="slotRow")Ti(e,t);else if(t.type==="stepGrid")Jn(e,t);else if(t.type==="padGrid")vi(e,t);else if(t.type==="moves")Ei(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Zs(n,t)}else if(t.type==="eqGraph")ni(e,t);else if(t.type==="levelSteps")di(e,t);else if(t.type==="strip"){Ni(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&ce(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Ci(e,t);else if(t.type==="group"){wi(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&ce(a,n)}}else if(t.type==="fx"){Oi(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&ce(a,n)}}}}function Fl(e,t){let n=on(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let i=$t(e.taper,e.min,e.max);a.min=String(i?0:e.min),a.max=String(i?1e3:e.max),a.step=String(i?1:e.step),i&&(a.dataset.ncTaper=e.taper),a.value=String(ki(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let o=l=>i?Vt(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(o(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(o(l))}),i&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,p=ma(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),a.value=String(gt(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(a,r),e.onTap&&n.insertBefore(Nl(e,a,t),r),n.append(ne()),ce(n,e),n}function ki(e){return $t(e.taper,e.min,e.max)?gt(e.taper,e.min,e.max,e.value):e.value}function Nl(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(fe());let i=o=>{let r=n(t);r?.type==="slider"&&r.onTap?.(o)};return a.addEventListener("pointerdown",o=>{o.button===0&&i(o.timeStamp)}),a.addEventListener("keydown",o=>{o.repeat||o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),i(o.timeStamp))}),a}function zl(e,t){let n=on(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let i=null;for(let o of e.options){let r=document.createElement("option");r.value=o.value,r.textContent=o.label,o.disabled&&(r.disabled=!0),o.group?i?.getAttribute("label")!==o.group&&(i=document.createElement("optgroup"),i.setAttribute("label",o.group),a.append(i)):i=null,(i??a).append(r)}return a.value=e.value,a.addEventListener("change",()=>{let o=t(a);o?.type==="select"&&o.onChange(a.value)}),n.append(a,ne()),n}function Dl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ne()),ce(n,e),n}function ql(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let o=t(n);o?.type==="button"&&o.onPress()}),n.append(ne()),ce(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=$i(),i.addEventListener("click",()=>{let o=n.closest(".nc-module")?.querySelector(".nc-slot-row");o instanceof HTMLElement&&Li(o);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),a.append(n,i),a}function Pl(e){let t=on(e.id,e.label);return t.append(ne()),ce(t,e),t}var Il=450;function Bl(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",a.label),a.title&&(i.title=a.title);let o=document.createElement("span");o.className="nc-moves-label",o.setAttribute("aria-hidden","true"),o.textContent=a.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Rl(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}i.append(o,r),n.append(i)}return Ei(n,e),n}function Ei(e,t){for(let n of t.groups)for(let a of n.moves){let i=e.querySelector(`[data-nc-move="${Ye(a.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=a.disabled===!0)}}function Rl(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function jl(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ne()),t}function ls(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ne()),t}function cs(e){if(typeof e.valueText=="string")return e.valueText;let t=bt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ai(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Ol(e,t){let n=_t(t.taper,t.min,t.max,t.value);Ai(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(_t(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,i))),e.style.setProperty("--knob-to",String(Math.max(a,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",cs(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${cs(t)}`}function Hl(e,t){if($t(e.taper,e.min,e.max))return ma(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function _l(e,t){let n=on(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",a.append(i);let o=0,r=0;a.addEventListener("pointerdown",d=>{o=d.clientY;let p=t(a);r=p&&"value"in p?Number(p.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let p=t(a);if(p?.type!=="knob")return;if($t(p.taper,p.min,p.max)){let m=_t(p.taper,p.min,p.max,r)-(d.clientY-o)/120;p.onChange(Xs(p.taper,p.min,p.max,m));return}let u=p.max-p.min||1,g=Math.min(p.max,Math.max(p.min,r-(d.clientY-o)*u/120));p.onChange(g)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let p=t(a);if(p?.type!=="knob")return;let u=Hl(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(ne()),ce(n,e),n}function Vl(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=a.value,i.setAttribute("role","tab"),i.textContent=a.label,i.addEventListener("click",()=>{let o=t(n);o?.type==="choice"&&o.onChange(a.value)}),i.addEventListener("keydown",o=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(i),c=l;if(o.key==="ArrowRight"||o.key==="ArrowDown")c=(l+1)%r.length;else if(o.key==="ArrowLeft"||o.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(o.key==="Home")c=0;else if(o.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(o.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(ne()),Si(n,e),n}function Si(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function Ul(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],g=document.createElement("span");g.className="nc-snap-wrap";let m=document.createElement("button");m.type="button",m.className="nc-snap",m.dataset.ncSlot=String(p),m.textContent=u.label,m.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",g.append(m,fe()),Kl(g,m,n,p,t),a.append(g)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=$i(),i.append(fe()),i.addEventListener("click",()=>{Li(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let o=document.createElement("div");o.className="nc-field nc-morph-field",o.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",o.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...i?[i]:[]),n.append(d,o,ne()),Mi(n,t),Ti(n,e),n}function ds(e,t,n,a){let i=n(e);if(i?.type!=="slotRow")return;ct(e);let o=a.shiftKey?"store":a.altKey?"clear":"recall";i.onSlot(t,o)}function Kl(e,t,n,a,i){let o=0,r=0,l=0,c=!1,d=!1,p=!1,u=!1,g=()=>{window.clearTimeout(o),o=0},m=f=>{let y=f.clientX-r,b=f.clientY-l;y*y+b*b>os*os&&(c=!0,g())},w=()=>{u&&(u=!1,window.removeEventListener("pointermove",m),window.removeEventListener("pointerup",x),window.removeEventListener("pointercancel",h))},x=f=>{let y=o!==0&&!c&&!d;g(),w(),y&&(p=!0,ds(n,a,i,f))},h=()=>{c=!0,g(),w()};e.addEventListener("pointerdown",f=>{f.button===0&&(w(),d=!1,c=!1,p=!1,r=f.clientX,l=f.clientY,g(),o=window.setTimeout(()=>{o=0,!c&&(d=!0,Wl(n,t,a,i))},Tl),u=!0,window.addEventListener("pointermove",m),window.addEventListener("pointerup",x),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",f=>f.preventDefault()),e.addEventListener("click",f=>{if(p||d||c){p=!1,d=!1,c=!1;return}ds(n,a,i,f)})}function Mi(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=ps("Save","store"),i=ps("Clear","clear");n.append(a,i);let o=document.createElement("div");o.className="nc-slot-scrim",o.hidden=!0,o.setAttribute("aria-hidden","true"),o.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),ct(e)}),o.addEventListener("click",r=>r.stopPropagation()),e.append(o,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),ct(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),ct(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&ct(e)})}function ps(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Wl(e,t,n,a){Mi(e,a);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let o=e.querySelector(".nc-slot-scrim");o instanceof HTMLElement&&(o.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.bottom-r.top}px`,i.querySelector("button")?.focus()}function ct(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Ti(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let o=Number(i.dataset.ncSlot),r=t.slots[o];if(!r)continue;i.textContent=r.label,r.filled?i.dataset.filled="true":delete i.dataset.filled,r.active?i.dataset.active="true":delete i.dataset.active,r.edited?i.dataset.edited="true":delete i.dataset.edited,r.queued?i.dataset.queued="true":delete i.dataset.queued,r.queued&&r.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Li(e){let t=e.dataset.ncLastFill||null,n=Go(t);e.dataset.ncLastFill=n;let a=Jo(n);if(a)for(let[i,o]of Object.entries(a))e.style.setProperty(i,o)}function Yl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,i=o=>{if(a===o)return;a=o,n.setAttribute("aria-pressed",o?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(o)};n.addEventListener("pointerdown",o=>{o.button===0&&(o.preventDefault(),n.setPointerCapture?.(o.pointerId),i(!0))});for(let o of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(o,()=>i(!1));return n.addEventListener("keydown",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),o.repeat||i(!0))}),n.addEventListener("keyup",o=>{o.key!==" "&&o.key!=="Enter"||(o.preventDefault(),i(!1))}),n.addEventListener("contextmenu",o=>o.preventDefault()),n}function Gl(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let i=h=>{let f=document.createElement("button");return f.type="button",f.setAttribute("role","radio"),f.textContent=h,a.append(f),f},o=i("Note"),r=i("Accent");r.dataset.ncAccentMode="";let l=h=>{for(let f of[o,r]){let y=f===h;f.setAttribute("aria-checked",y?"true":"false"),f.tabIndex=y?0:-1}};l(o);for(let h of[o,r])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let f=r.getAttribute("aria-checked")==="true"?o:r;l(f),f.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(Yl(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let f=document.createElement("div");f.className="nc-row",f.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=h.label,y.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(y.dataset.ncLane=String((h.lane-1)%4+1));let b=!1,k=0;y.addEventListener("pointerdown",$=>{b=!1,!($.pointerType==="mouse"||$.button!==0)&&(k=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(b=!0,M.onSelectRow?.(M.rows.findIndex(F=>F.id===h.id),!0))},Il))});for(let $ of["pointerup","pointercancel","pointerleave"])y.addEventListener($,()=>window.clearTimeout(k));y.addEventListener("contextmenu",$=>{b&&$.preventDefault()}),y.addEventListener("click",$=>{let M=t(n);if(M?.type!=="stepGrid")return;if(b){b=!1;return}let F=M.rows.findIndex(A=>A.id===h.id),S=!!M.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);M.onSelectRow?.(F,S)}),y.addEventListener("keydown",$=>Jl(n,y,$));let T=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let F=document.createElement("button");F.type="button",F.className="nc-ms",F.dataset.ncMs=$,F.textContent=$==="mute"?"M":"S",F.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),M.append(F,fe()),M.addEventListener("click",()=>{let S=t(n);if(S?.type!=="stepGrid")return;let A=S.rows.findIndex(C=>C.id===h.id);($==="mute"?S.onMute:S.onSolo)?.(A)}),T.push(M)}let E=document.createElement("div");E.className="nc-steps";for(let $=0;$<h.steps.length;$++){let M=document.createElement("span");M.className="nc-step-wrap";let F=document.createElement("button");F.type="button",F.className="nc-step",F.dataset.ncStep=`${h.id}:${$}`,F.setAttribute("aria-label",`${h.label} step ${$+1}`),M.append(F,fe()),M.addEventListener("click",S=>{let A=t(n);if(A?.type!=="stepGrid")return;let C=A.rows.findIndex(q=>q.id===h.id),N=r.getAttribute("aria-checked")==="true";A.onToggle(C,$,S.shiftKey||N)}),E.append(M)}if(e.onLength&&E.append(Xl(n,E,h,t)),f.append(...T,y,E),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=rs(),$.append(fe()),$.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(F=>F.id===h.id))}),f.append($)}f.addEventListener("click",$=>{if($.target!==f)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(F=>F.id===h.id))}),us(n,E,".nc-step-wrap",t,r,()=>h.id),n.append(f)}let d=document.createElement("div");d.className="nc-pads-head";let p=(h,f,y)=>{let b=document.createElement("button");return b.type="button",b.className=h,b.textContent=f,y&&b.setAttribute("aria-label",y),b},u=p("nc-pads-step","‹","Previous lane"),g=p("nc-pads-step","›","Next lane"),m=document.createElement(e.onLength?"button":"span");m.className="nc-pads-label",m.setAttribute("aria-live","polite"),e.onLength&&(m.type="button",m.dataset.ncLenToggle="",m.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Jn(n,h))}));for(let[h,f]of[[u,-1],[g,1]])h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let b=y.rows.length;y.onSelectRow?.(((Mt(y)+f)%b+b)%b)});if(d.append(u,m,g),e.onDice){let h=p("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=rs(),h.addEventListener("click",()=>{let f=t(n);if(f?.type!=="stepGrid")return;let y=Mt(f);y>=0&&f.onDice?.(y)}),d.append(h)}if(e.transport){let h=p("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let f=t(n);f?.type==="stepGrid"&&f.transport?.onToggle()}),d.append(h)}n.append(d);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let x=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<x;h++){let f=document.createElement("button");f.type="button",f.className="nc-pad",f.dataset.ncPad=String(h),f.textContent=String(h+1),f.addEventListener("click",y=>{let b=t(n);if(b?.type!=="stepGrid")return;let k=Mt(b);if(k<0)return;if(n.dataset.ncLenMode==="true"){b.onLength?.(k,h+1);return}let T=r.getAttribute("aria-checked")==="true";b.onToggle(k,h,y.shiftKey||T)}),w.append(f)}return us(n,w,".nc-pad",t,r,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[Mt(h)]?.id:void 0}),n.append(w),n.append(ne()),Jn(n,e),n}function Mt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function us(e,t,n,a,i,o){let r="on",l=!0,c=-1,d=(p,u)=>{let g=p.rows[c]?.steps[u];!g||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,r,l):!!g[r]!==l&&p.onToggle(c,u,r==="accent"))};xl(t,n,p=>{let u=a(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let g=u.rows.findIndex(m=>m.id===o());g>=0&&u.rows[g].length!==p.pad+1&&u.onLength?.(g,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let g=o();c=u.rows.findIndex(w=>w.id===g);let m=u.rows[c]?.steps[p.pad];if(!m)return;r=i.getAttribute("aria-checked")==="true"?"accent":"on",l=!m[r]}d(u,p.pad)}else if(p.kind==="long"){let g=o(),m=u.rows.findIndex(x=>x.id===g),w=t.querySelectorAll(n)[p.pad];m>=0&&w instanceof HTMLElement&&u.onLongPress?.(m,p.pad,w)}}})}function Jl(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],i=a.indexOf(t),o=i;n.key==="ArrowDown"?o=i+1:n.key==="ArrowUp"?o=i-1:n.key==="Home"?o=0:o=a.length-1;let r=a[o];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Xl(e,t,n,a){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(fe());let o=d=>{let p=a(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(w=>w.id===n.id),g=p.rows[u];if(!g)return;let m=Math.max(1,Math.min(g.steps.length,d));m!==g.length&&p.onLength?.(u,m)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((g,m)=>{let w=g.getBoundingClientRect();w.width>0&&d>=w.left+w.width/2&&(u=m+1)}),u},l=d=>o(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let p=a(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(m=>m.id===n.id);if(!u)return;let g={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in g&&(d.preventDefault(),o(g[d.key]))}),i}var vn=new WeakMap,Tt=new WeakMap;function Ql(e){return e?(Tt.has(e)||(Tt.set(e,zn(e)),Os(t=>{Tt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Gn(n,Number(n.getAttribute("data-nc-velocity")))},e)),Tt.get(e)):"light"}function Gn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:Ql(e.ownerDocument),i=n===null?null:`${a} ${n}`;if(!(vn.has(e)&&vn.get(e)===i)){if(vn.set(e,i),n===null){for(let o of Object.keys(_a(1)))e.style.removeProperty(o);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[o,r]of Object.entries(_a(n,Ha[a]??Ha.light)))e.style.setProperty(o,r)}}function hs(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Jn(e,t){let n=t.rows.some(p=>p.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),o=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&o&&(r.textContent=l?`${o.label} · ${o.length}`:o.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${o.label} length ${o.length} steps: tap or drag the pads to set the end, tap here when done`:`${o.label}, ${o.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&o&&(c.setAttribute("aria-label",`Re-roll ${o.label}`),c.title=`Re-roll ${o.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let g=t.transport?.ariaLabel;g?d.setAttribute("aria-label",g):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&o){i.setAttribute("aria-label",`${o.label} steps`),o.lane&&(i.dataset.ncLane=String((o.lane-1)%4+1)),o.mute||n&&!o.solo?i.dataset.silent="true":delete i.dataset.silent;let p=o.length>0?(t.playhead%o.length+o.length)%o.length:-1;for(let u of i.querySelectorAll("[data-nc-pad]")){let g=Number(u.getAttribute("data-nc-pad")),m=o.steps[g];u instanceof HTMLButtonElement&&(u.hidden=!m||!l&&g>=o.length,l&&g>=o.length?u.dataset.out="true":delete u.dataset.out,l&&g===o.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${o.label} step ${g+1}${m?.markLabel?`, ${m.markLabel}`:""}`),hs(u,m),u.setAttribute("aria-pressed",m?.on?"true":"false"),m?.accent?u.dataset.accent="true":delete u.dataset.accent,m?.dim?u.dataset.dim="true":delete u.dataset.dim,Gn(u,m?.velocity),t.playhead>=0&&g===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let m=0;m<p.steps.length;m++){let w=p.steps[m],x=e.querySelector(`[data-nc-step="${p.id}:${m}"]`);if(!(x instanceof HTMLButtonElement))continue;let h=x.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===p.id?h.dataset.selected="true":delete h.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?h.dataset.picked="true":delete h.dataset.picked;let T=h.querySelector(".nc-name");T instanceof HTMLElement&&(T.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),T.textContent!==p.label&&(T.textContent=p.label,T.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?h.dataset.silent="true":delete h.dataset.silent;for(let E of h.querySelectorAll("[data-nc-ms]")){let $=E.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;E.setAttribute("aria-pressed",$?"true":"false")}}x.setAttribute("aria-pressed",w.on?"true":"false");let f=`${p.label} step ${m+1}${w.markLabel?`, ${w.markLabel}`:""}`;x.getAttribute("aria-label")!==f&&x.setAttribute("aria-label",f),hs(x,w),w.accent?x.dataset.accent="true":delete x.dataset.accent,w.dim?x.dataset.dim="true":delete x.dataset.dim,m%4===0?x.dataset.bar="true":delete x.dataset.bar,typeof w.velocity=="number"?(x.dataset.velocity="true",x.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete x.dataset.velocity,x.style.removeProperty("--level")),Gn(x,w.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;m===y?x.dataset.playhead="true":delete x.dataset.playhead;let b=!!t.onLength&&t.selectedRow===p.id;x.hidden=m>=p.length&&!b,m>=p.length&&b?x.dataset.out="true":delete x.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),g=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&g&&g.nextElementSibling!==u){let m=document.activeElement===u;g.after(u),m&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Zl(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ne()),t}function ec(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let o=!e.master&&typeof e.onFold=="function",r=null;o&&(n.dataset.ncFoldable="",r=Pi(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==r&&r.focus())})),a.append(i);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let b=document.createElement("span");b.className="nc-strip-grip-dots",b.setAttribute("aria-hidden","true"),l.append(b),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let T=t(n);T?.type==="strip"&&(k.preventDefault(),T.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>gs(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",b=>{b.pointerType==="touch"||b.pointerType==="pen"||b.target instanceof Element&&b.target.closest("input, .nc-strip-remove")||(b.preventDefault(),gs(n,a,t,{x:b.clientX,y:b.clientY}))}),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(b)}),a.append(b)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",b.append(k,fe()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onHacks?.()}),c.append(b)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let b=document.createElement("span");b.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",b.append(k,fe()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onSendsView?.()}),d.append(b)}for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=b,T.textContent=b==="mute"?"M":"S",k.append(T,fe()),k.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(b==="mute"?E.onMute:E.onSolo)?.()}),d.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let b of e.sends??[])p.append(Ie({...b,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(Ie($a(e),t));let g=document.createElement("div");g.className="nc-strip-body";let m=document.createElement("span");m.className="nc-scale",m.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(b.value)),k.textContent=b.label,m.append(k)}let w=hr({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let k=t(n);k?.type==="strip"&&k.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&fs(b)}}),x=wr({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(g.append(m,w.el,x.el),o){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let T=document.createElement("span");T.className="nc-ui-fx-fold-name",T.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,b.append(k,E,T),b.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),g.prepend(b)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let f=0;h.addEventListener("click",b=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(f),b.detail===0?ms(n,h,t):b.detail===1&&(f=window.setTimeout(()=>ms(n,h,t),ac)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(f);let b=t(n);b?.type==="strip"&&fs(b)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(Ie(ka(e),t)),r&&n.append(r),l&&n.append(l),n.append(a,y,c,d,p,u,g,h,ne()),Ni(n,e),n}function $a(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??nc(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function ka(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??tc(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function tc(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function nc(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var ac=250;function ms(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=a.valueText??bt(a.value),i.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let o=!1,r=l=>{if(o)return;o=!0;let c=i.value;if(i.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),i.addEventListener("blur",()=>r(!1))}function sc(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let o=document.createElement("span");o.className="nc-strip-add-label",a.append(i,o);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;Fi(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,r,ne()),Ci(n,e),n}function Ci(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],o=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=i.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");o!==r&&(a.replaceChildren(...i.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Fi(a))}function Fi(e){let t=e.options[0];t&&(t.selected=!0)}function fs(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Ni(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),o=i?mr(i):void 0;o&&(o.configure({step:t.step}),o.set(t.value),o.setText(t.valueText),o.setLabel(`${t.label} level`)),xr(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let w=t.valueText??bt(t.value);r.textContent!==w&&(r.textContent=w),r.setAttribute("aria-label",`${t.label} level ${w}`);let x=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${x}`:x}for(let w of e.querySelectorAll("[data-nc-ms]")){let x=w.getAttribute("data-nc-ms"),h=x==="mute"?t.mute===!0:t.solo===!0;w.setAttribute("aria-pressed",h?"true":"false"),w.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let w=t.hacksLabel??"Hacks";l.textContent!==w&&(l.textContent=w),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${w}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let w=t.sendsViewLabel??"Sends";c.textContent!==w&&(c.textContent=w),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${w}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Se(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=zi(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let w=e.querySelector(`.nc-strip-trim [data-nc-id="${Ye(t.trim.id)}"]`);w&&ce(w,ka(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let w=e.querySelector(`.nc-strip-pan [data-nc-id="${Ye(t.pan.id)}"]`);w&&ce(w,$a(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let g=e.querySelector("[data-nc-strip-hide]");g instanceof HTMLElement&&(Ii(g,u,t.label),Se(g,t.foldHelp));let m=e.querySelector("[data-nc-strip-fold]");if(m instanceof HTMLElement){m.hidden=!u,m.setAttribute("aria-label",`Expand ${t.label}`);let w=m.querySelector("[data-nc-strip-fold-name]");w&&w.textContent!==t.label&&(w.textContent=t.label),Se(m,t.foldedHelp??t.foldHelp)}}function zi(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Di?t:0}var Di=8,Lt=null;function gs(e,t,n,a){Lt?.();let i=n(e);if(i?.type!=="strip")return null;let o=e.ownerDocument,r=o.defaultView??globalThis,l=o.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${i.label}: shade and place`);let c=o.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=o.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=zi(i),u=e.querySelector("[data-nc-strip-grip]")??t,g=(f=!1)=>{if(Lt!==g)return;Lt=null;let y=l.contains(o.activeElement);l.remove(),o.removeEventListener("keydown",w,!0),o.removeEventListener("pointerdown",x,!0),r.removeEventListener("resize",h),(f||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},m=[0,...Array.from({length:Di},(f,y)=>y+1)].map(f=>{let y=o.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",f===p?"true":"false"),y.setAttribute("tabindex",f===p?"0":"-1"),y.dataset.ncShadeChoice=String(f),f===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(f),y.setAttribute("aria-label",`Shade ${f}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${f})`)),y.addEventListener("click",()=>{let b=n(e);g(!0),b?.type==="strip"&&b.onShade?.(f===0?null:f)}),y});if(d.append(...m),d.addEventListener("keydown",f=>{let y=m.indexOf(o.activeElement);if(y<0)return;let b=-1;f.key==="ArrowRight"||f.key==="ArrowDown"?b=(y+1)%m.length:f.key==="ArrowLeft"||f.key==="ArrowUp"?b=(y-1+m.length)%m.length:f.key==="Home"?b=0:f.key==="End"&&(b=m.length-1),!(b<0)&&(f.preventDefault(),m[y].setAttribute("tabindex","-1"),m[b].setAttribute("tabindex","0"),m[b].focus())}),l.append(c,d),typeof i.onMove=="function"){let f=[...e.parentElement?.children??[]].filter(b=>b.classList?.contains("nc-strip")&&!b.hasAttribute("data-nc-master")),y=f.indexOf(e);for(let[b,k,T]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=o.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=b<0?"left":"right";let $=o.createElement("span");$.textContent=k;let M=o.createElement("kbd");M.textContent=T,M.setAttribute("aria-hidden","true"),E.append($,M),E.disabled=b<0?y<=0:y<0||y>=f.length-1,E.addEventListener("click",()=>{let F=n(e);g(!0),F?.type==="strip"&&F.onMove?.(b)}),l.append(E)}}o.body.append(l),(()=>{let f=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,b=l.offsetHeight,k=r.innerWidth||o.documentElement.clientWidth||y,T=r.innerHeight||o.documentElement.clientHeight||b,E=a?a.x:f.right-y,$=a?a.y:f.bottom+4;E=Math.max(4,Math.min(E,k-y-4)),$+b>T-4&&($=Math.max(4,(a?a.y:f.top)-b-4)),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round($)}px`})();let w=f=>{if(f.key==="Escape")f.preventDefault(),f.stopPropagation(),g(!0);else if(f.key==="Tab"&&l.contains(o.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),b=(y.indexOf(o.activeElement)+(f.shiftKey?-1:1)+y.length)%y.length;f.preventDefault(),y[b]?.focus()}},x=f=>{l.contains(f.target)||g(!1)},h=()=>g(!1);return o.addEventListener("keydown",w,!0),o.addEventListener("pointerdown",x,!0),r.addEventListener("resize",h),Lt=g,(m.find(f=>f.getAttribute("tabindex")==="0")??m[0]).focus({preventScroll:!0}),{el:l,close:()=>g(!1)}}var Xn=typeof ResizeObserver=="function"?new ResizeObserver(ic):null;function ic(e){for(let t of e){if(!t.target.isConnected){Xn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&oc(n)}}function oc(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,o=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+i+o}px`)}function rc(e){if(Xn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Xn.observe(t)}function lc(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let i=typeof e.onFold=="function",o=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!Yt(e)&&!o&&!r)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),o&&l.append(Ri(n,"head")),e.on!==void 0){let c=Ys({checked:e.on,labelledBy:a.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}i&&l.append(dc(n,t)),Yt(e)&&l.append(mc(n,t)),r&&l.append(fc(t)),n.append(l)}i&&n.prepend(pc(n,t)),o&&ji(n,e);for(let l of e.controls)n.append(Ie(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Ie(d,t));n.append(l)}return n.append(ne()),Oi(n,e),rc(n),n}var cc=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function qi(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&cc(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function dc(e,t){let n=Pi();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),qi(e))}),n}function Pi(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Ii(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function pc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let o=document.createElement("span");return o.className="nc-fold-tri",o.setAttribute("aria-hidden","true"),n.append(o,a,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ri(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),qi(e)}}),n}var Xe=new Set;function It(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Yt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),uc="(max-width: 768px)";function hc(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function mc(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(hc()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Bi(e,a,!Xe.has(a.id)),n.focus())}),n}function fc(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Bi(e,t,n){n?Xe.add(t.id):Xe.delete(t.id),Ea(e,t)}function gc(e,t){t?.type==="fx"&&Xe.has(t.id)&&Bi(e,t,!1)}function bc(e){return e.ownerDocument.defaultView?.matchMedia?.(uc).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ea(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Yt(t)&&Xe.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Yt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),It(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Je(r)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Se(n,t.maxHelp)),!a){e.dataset.ncMax&&bs(e);return}if(!e.isConnected){let r=()=>e.isConnected&&Xe.has(t.id)&&Ea(e,t);queueMicrotask(()=>{e.isConnected?r():It(e.ownerDocument,r)});return}let i=bc(e),o=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;o>0&&e.style.setProperty("--nc-fx-dials",String(o)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&bs(e),e.dataset.ncMax=i,i==="over"&&yc(e,t)),wc(e.ownerDocument),i==="over"&&Aa(e),It(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Je(r)})}function bs(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),It(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Je(n)})}function yc(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function Aa(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,o=Number.parseFloat(i?.getComputedStyle(a).columnGap??"")||0,r=Br(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),o,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var ys=new WeakSet;function wc(e){ys.has(e)||(ys.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Aa(t)}))}var Qn=new WeakMap;function Ri(e,t){let n=ml(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function ji(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)Se(i,t.meterHelp);let a=Qn.get(e);a?a.set(t.meter):Qn.set(e,yl(n,t.meter))}function Oi(e,t){(t.meter||Qn.has(e))&&ji(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let o=e.querySelector("[data-nc-fx-hide]");o instanceof HTMLElement&&(Ii(o,i,t.title),Se(o,t.foldHelp)),Ea(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=i,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!i,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),Se(l,t.foldHelp)}}function Se(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Ye(e){return e.replace(/["\\]/g,"\\$&")}function xc(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);a?.type==="canvas"&&Zs(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Je(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Aa(n);Cl(e)}var vc=1e3,$c=e=>e===!0?"log":typeof e=="string"?e:"linear";function kc(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let a=e.taper??$c(e.log),i=$t(a,e.min,e.max),o=n.createElement("div");o.className="nc-field",o.dataset.ncRow="",o.dataset.ncSlider="",o.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(i?0:e.min),l.max=String(i?vc:e.max),l.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",o.append(r,l,c,d);let p=e.value,u=()=>{let m=e.format(p);c.textContent=m,l.setAttribute("aria-valuetext",m)},g=m=>{p=m,n.activeElement!==l&&(l.value=String(i?gt(a,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=i?Vt(a,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),i&&l.addEventListener("keydown",m=>{let w=ma(a,e.min,e.max,p,m.key,m.shiftKey,e.step);w===null||l.disabled||(m.preventDefault(),l.value=String(gt(a,e.min,e.max,w)),p=w,u(),e.onInput(p))}),l.disabled=e.disabled===!0,g(e.value),{el:o,set:g,setDisabled(m){l.disabled=m===!0}}}var Ec=Ee["toast-duration"];function Ac({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Sc(e,t,n,a){let i=l=>({top:l,bottom:l+n}),o=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=i(t-a-n);return o(r)?o(i(a))?"bottom":"top":"bottom"}function Mc(e,t,n,a,i,o){let r=e.bottom+i,l=Math.max(o,Math.min(e.left,a-o-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+i,c=!0)}return{top:r,left:l}}var ws="data-nc-ui-toast-live";function Tc(e,t){let n=t.querySelector(`[${ws}]`);return n||(n=e.createElement("div"),n.setAttribute(ws,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Lc({message:e,actionLabel:t,onAction:n,duration:a=Ec,onClose:i,avoid:o=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let u=c.createElement("span");u.className="nc-ui-toast-message",u.textContent=e,p.appendChild(u);let g=null;t&&(g=c.createElement("button"),g.type="button",g.className="nc-ui-toast-action",g.textContent=t,p.appendChild(g)),l.appendChild(p);let m="open",w=P=>P&&typeof P.getBoundingClientRect=="function"?P.getBoundingClientRect():null,x=w(p),h=x?.height||44,f=d.getComputedStyle?.(p),y=Number.parseFloat(f?.getPropertyValue(_("toast-offset")))||16,b=Number.parseFloat(f?.getPropertyValue(_("toast-anchor-gap")))||8,k=w(r),T=d.innerHeight??0,E=o.map(w).filter(Boolean),$=k&&k.bottom>0&&k.top<T?Mc(k,E,{width:x?.width||0,height:h},d.innerWidth??0,b,y):null;$&&$.top+h<=T?(p.setAttribute("data-placement","anchor"),p.style.top=`${$.top+(d.scrollY??0)}px`,p.style.left=`${$.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",Sc(E,T,h,y));let M=d.requestAnimationFrame?.bind(d)??(P=>setTimeout(P,16));M(()=>M(()=>{m==="open"&&p.setAttribute("data-state","open")})),Tc(c,l).textContent=Ac({message:e,actionLabel:t});let F,S,A=new Promise(P=>{S=P}),C=P=>{clearTimeout(F),F=setTimeout(()=>V("timeout"),P)},N=a,q=Date.now(),H=()=>{m==="open"&&(clearTimeout(F),N=Math.max(0,N-(Date.now()-q)))},R=()=>{m==="open"&&(q=Date.now(),C(N))};p.addEventListener("pointerenter",H),p.addEventListener("pointerleave",R),p.addEventListener("focusin",H),p.addEventListener("focusout",R),g?.addEventListener("click",()=>{if(m==="open")try{n?.()}finally{V("action")}}),Number.isFinite(a)&&C(a);function V(P="close"){if(m!=="open")return;m="closing",clearTimeout(F),p.setAttribute("data-state","closing"),i?.(P);let j=d.getComputedStyle?.(p),U=j?Math.max(0,...String(j.transitionDuration||"").split(",").map(de=>Number.parseFloat(de)*(de.trim().endsWith("ms")?1:1e3)||0)):0,ye=()=>{m!=="gone"&&(m="gone",p.remove(),S(P))};p.addEventListener("transitionend",ye),setTimeout(ye,U+50)}return{el:p,close:V,closed:A}}var yt="data-nc-help";function Cc(e,t,n,a=0,i=6,o=8){let r=e.top-i-t.height,l=r>=a+o?"above":"below",c=l==="above"?r:e.bottom+i,d=Math.max(o,Math.min(e.left,n-o-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var $n=new WeakMap;function Fc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Nc({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=$n.get(e);if(n)return n;let a=e.defaultView,i=null,o=null,r,l=!1,c,d=null,p=!1,u=0,g=()=>{clearTimeout(r),p&&!l&&(u=Date.now()+1500),p=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},m=()=>{g(),clearTimeout(c),o=null,d=null,l=!1},w=($,M)=>{clearTimeout(r),d=M;let F=Date.now()<u?Math.min(t,300):t;r=setTimeout(()=>{o===$&&$.isConnected&&!l&&f($)&&(p=!0)},F)},x=$=>({x:Number($.clientX)||0,y:Number($.clientY)||0}),h=($,M,F)=>!$||Math.hypot($.x-M.x,$.y-M.y)>F,f=($,M)=>{let F=M??$.getAttribute(yt);if(!F)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=F,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let S=$.getBoundingClientRect(),A=Cc(S,{width:i.offsetWidth,height:i.offsetHeight},a.innerWidth,Fc(e));return i.style.top=`${A.top}px`,i.style.left=`${A.left}px`,i.dataset.side=A.side,i.style.visibility="",!0},y=$=>{if(l||$.pointerType==="touch")return;let M=$.target&&$.target.closest?$.target.closest(`[${yt}]`):null;M!==o&&(m(),!(!M||$.buttons)&&(o=M,w(M,x($))))},b=$=>{if(l||$.pointerType==="touch"||!o)return;if($.buttons){g(),d=null;return}let M=x($);p?h(d,M,8)&&(g(),w(o,M)):h(d,M,4)&&w(o,M)},k=$=>{!l&&!$.relatedTarget&&m()},T=$=>{(l||$.key==="Escape")&&m()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",b,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",m,!0),e.addEventListener("keydown",T),a.addEventListener("scroll",m,!0),a.addEventListener("blur",m);let E={hide:m,pin($,M,{ms:F=0}={}){return m(),!$||!$.isConnected||!f($,M)?!1:(l=!0,i.dataset.pinned="",F>0&&(c=setTimeout(m,F)),!0)},uninstall(){m(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",b),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",m,!0),e.removeEventListener("keydown",T),a.removeEventListener("scroll",m,!0),a.removeEventListener("blur",m),i?.remove(),i=null,$n.delete(e)}};return $n.set(e,E),E}var Sa="netcomposer.rhythm.hidden.v1",ge=new WeakMap;function kn(){try{return globalThis.localStorage??null}catch{return null}}function Hi(e,t=Sa){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function xs(e,t,n,a=Sa){let i=Hi(e,a);n?i.add(t):i.delete(t);try{e?.setItem(a,JSON.stringify([...i]))}catch{}}function Ma(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],a=i=>{if(n.push(i),i.type==="group")for(let o of i.controls)a(o)};for(let i of t)a(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(o=>({...o,type:"knob",compact:!0}))),i.pan&&n.push($a(i)),i.trim&&n.push(ka(i)));return n}function _i(e,t){if(!(!e||!t))return Ma(e).find(n=>n.id===t)}function zc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Ma(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Dc(e,t){if(!t.title)return;if(!t.panel){let o=document.createElement("h3");o.className="nc-ui-fx-name",o.textContent=t.title,e.append(o);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(a,i),e.append(n),Vi(e,t)}function Vi(e,t){if(!t.panel)return;let n=[...e.children].find(o=>o.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function qc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ge.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return _i(n,a)}function Pc(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],i=zc(t);if(e.dataset.ncSignature===i){for(let o of a){let r=e.querySelector(`[data-nc-section="${$s(o.id)}"]`);r&&Vi(r,o);for(let l of o.controls){let c=e.querySelector(`[data-nc-id="${$s(l.id)}"]`);c instanceof Element&&ce(c,l)}r instanceof HTMLElement&&Zn(r,o,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let o of a){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=o.id,o.inset&&(r.dataset.ncInset="true"),o.area&&(r.dataset.ncArea=o.area),o.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",o.label)),o.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),o.title&&r.setAttribute("aria-label",o.title)),Dc(r,o);let l=o.panel?document.createElement("div"):r;o.panel&&(l.className="nc-panel-body",r.append(l));for(let c of o.controls)l.append(Ie(c,qc));e.append(r),Zn(r,o,n)}}function Ui(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,i))}}var Ic="(max-width: 768px)",Ki=new WeakMap;function vs(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Bc(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let i=vs("prev"),o=vs("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(i,r,o,l);let c=(d,p)=>{let u=Ki.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let g=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:m}=Ui(g,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,m),u.onPage?.(m),Zn(e,{...u,page:m},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===i?o:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),o.addEventListener("click",()=>c(1,o)),e.prepend(a),a}function Zn(e,t,n){Ki.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:o,page:r}=Ui(a.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,r),o<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Ic).matches===!0,c=e.closest(".nc-module");a.forEach((h,f)=>{let y=Math.floor(f/i)!==r;if(y?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,y&&!l){let b=c instanceof HTMLElement?ge.get(c):void 0;gc(h,_i(b,h.dataset.ncId))}});let d=Bc(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),u.setAttribute("aria-disabled",r===o-1?"true":"false");let g=d.querySelector("[data-nc-fx-page-count]"),m=`${r+1} / ${o}`;g.textContent!==m&&(g.textContent=m);let w=d.querySelector("[data-nc-fx-page-live]"),x=`Effects page ${r+1} of ${o}`;w.textContent!==x&&(w.textContent=x)}function $s(e){return e.replace(/["\\]/g,"\\$&")}function Rc(e,t=Sa){Ws();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Hi(kn(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let o=document.createElement("h2");o.className="nc-title",o.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Ys({labelledBy:o.id,onChange:y=>(ge.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",i.append(o,p,r);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let g=document.createElement("button");g.type="button",g.className="nc-slim";let m=document.createElement("span");m.className="nc-slim-lines",g.append(m);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,u,g),n.setAttribute("aria-labelledby",o.id);let x=y=>{let b=ge.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,g.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${b.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";xs(kn(),(ge.get(n)??e).id,y,t),x(y),ea(n.parentElement)}),g.addEventListener("click",()=>{xs(kn(),(ge.get(n)??e).id,!1,t),x(!1),ea(n.parentElement)});let h={pages:new Map,redraw:()=>f.redraw()},f={el:n,update(y){ge.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,o.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),m.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,g.setAttribute("aria-label",`Show ${y.title}`),Pc(u,y,h),x(u.hidden),f.redraw()},redraw(){let y=ge.get(n);y&&xc(n,Ma(y))}};return ge.set(n,e),x(a),f.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>f.redraw()).observe(n),Os(()=>f.redraw(),n.ownerDocument),f}function jc(e,t,n="adjacent"){Ws(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((i,o)=>{let r=o%4+1;i.el.dataset.ncShade=String(r),i.el.dataset.ncPlace=a;let l=i.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(i.el),i.redraw()}),ea(e)}function ea(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(o=>o instanceof HTMLElement&&o.classList.contains("nc-module")),n=t.some(o=>o.hasAttribute("data-nc-lead")),a=t.map(o=>o.hasAttribute("data-nc-slim")?s("module-slim-column"):n?o.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let i=t.filter(o=>!o.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Oc={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome. Off: Pass 1 starts with the clock.",start:"How a recording Jam starts. Count-in: a bar of clicks, then the pass. Wait: Jam waits for the first sound, and the pass starts on its beat. Play starts at once.","start-off":"Play starts the loop at once, with the clock. Count-in and Wait apply when Record is on. Your choice is kept.","jam-wait":"Wait for the first sound from any instrument: the loop starts on that beat. With Record on, every lap from it becomes a pass. Space anywhere.",waiting:"Waiting for the first sound. Press again (or Space) to cancel. Nothing is recorded.","pattern-pass":"An instrument's own pattern, recorded once and again when it changes. It doesn't replay while that instrument plays its pattern itself.","mode-play":"Play: the loop plays and you can try things on any instrument. Nothing is recorded.","mode-record":"Record: every lap from the next bar 1 becomes a pass. Pressed in a lap's first beat, that lap. Shift+Space anywhere.","mode-full":"32 passes: delete one to record.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the loop. Play: at once, nothing recorded. Record (an empty song always records): Count-in or Wait as set, then every lap is a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",sections:"Parts of your song (Intro, Verse, Chorus), each with its own bars and passes. Tap one, or press 1–9, to play it next.","section-tile":"Play this section next: it starts when the loop ends. Tap again to cancel. Stopped, it's selected at once.","add-section":"A new section, copied from the one selected: its bars and the passes in it. Record into it, or uncheck passes.","in-section":"Checked: this pass plays in the section selected. A pass you record plays only in the section it was recorded in.","section-name":"The section's name. Enter keeps it.","delete-section":"Delete this section. Its passes stay, and its steps leave the song.","song-record":"Records which sections you play, lap by lap, from the next bar 1. Stop ends it and makes it the song.","song-play":"Plays the song you recorded, hands-free, then stops. Tap a section to take over.","song-step":"A step of the song. Click to change how many times it plays, move it or remove it.","song-undo":"Bring back the song before this take.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"Q: this pass's quantize. Q · Song follows the Setup; Q 1/16 is its own grid (1/8T: eighth-note triplets). Notes move on replay; the pass keeps what you played.","pass-strength":"How far this pass's notes move toward its own grid. Following the song, it uses the Setup's Strength.","knob-pass":"The knobs you moved in this lap. They move again on replay. Muted or deleted, each goes back to where it was.",voice:"Records the next whole loop from LUCY's mic as a voice pass, then Lupa is back in Play. Stopped, it starts the jam. No LUCY yet: it adds one.","voice-busy":"Cancel the voice pass. Nothing from this loop is kept.","you-have-it":"You moved this knob, so this pass lets go of it until the lap ends. Then it takes the knob again."};function Ta(e){return Oc[e]??""}const Wi="nc-song-looper",La=8,Hc=[1,2,3,4,5,6,7,8],Gt=9,Jt=24,Xt=64,Qt=16,ta=8,Yi=/^[A-Za-z0-9._-]{1,64}$/,na=24,aa=64,z=960,D=4,se=32,Pe=4e3,_c=120,Vc=120,rn=200,Uc=e=>Math.max(_c,Math.min(rn,Math.round(Vc/1e3*(e/60)*z))),Zt=40,en=240,Kc=8,Be=40,ln=["off","1/4","1/8","1/8T","1/16","1/32"],Wc=["1/4","1/8T"],Yc={"1/4":z,"1/8":z/2,"1/8T":z/3,"1/16":z/4,"1/32":z/8},cn=[.5,.75,1],Gi=128,sa=e=>!!e.knobs?.length,le=e=>`${e.inst}|${e.param}`,Me=e=>Math.max(1,Math.floor(e/D)),K=e=>e.bars*D*z,tn=D*z;function J(e){return e.sections?.length?e.sections.find(t=>t.id===e.section)??e.sections[0]??null:null}function En(e,t,n){if(!e.sections?.length)return!0;const a=n?e.sections.find(i=>i.id===n):J(e);return!a||a.on.includes(t)}function dt(e,t){return e.from===1&&e.to===t?null:{from:e.from,to:e.to}}const Qe=e=>e.to-e.from+1;function Gc(e){let t=0;for(const n of e.arrangement??[]){const a=e.sections?.find(i=>i.id===n.section);a&&(t+=Qe(a)*n.times)}return t}function Ji(e,t){const n=Math.round(e*D*60/t);return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function ia(e){const t=e.loop;return t?{start:(t.from-1)*tn,length:(t.to-t.from+1)*tn}:{start:0,length:K(e)}}function mt(e,t){const n=K(t);if(!e.repeat||e.endTick>=n)return[0];const a=[];for(let i=0;i<n;i+=e.endTick)a.push(i);return a}function ft(e,t){if(!e.shift)return 0;const n=K(t),a=e.repeat&&e.endTick<n?e.endTick:n,i=e.shift*tn%a;return i<0?i+a:i}function Jc(e,t){const n=K(t),a=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(a/tn)-1)}function Xc(e){const t=Math.round(e.bars*D*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function Xi(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const Ca=Be*2;function Qi(e,t=new Date,n=Math.random){const a=Math.min(en,Math.max(Zt,Math.round(Number.isFinite(e)?e:80))),i=t.toISOString();return{format:Wi,version:La,id:Xi(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:i,updatedAt:i,song:{bpm:a,beatsPerBar:D,bars:Math.min(Kc,Me(a)),countInBars:1,ppq:z},passes:[],comps:[]}}const be=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z=e=>Number.isInteger(e),ae=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,An=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),ie=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function ks(e,t){if(e===void 0)return null;if(!be(e))return"quantize must be an object";const n=ie(e,["grid","strength"]);return n?`quantize has an unknown field (${n})`:!ln.includes(e.grid)||t<5&&Wc.includes(e.grid)?t<5?"quantize grid is not off, 1/8, 1/16 or 1/32":"quantize grid is not off, 1/4, 1/8, 1/8T, 1/16 or 1/32":cn.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%"}function Qc(e){if(!be(e)||e.format!==Wi)return"it isn't a Lupa song";if(!Hc.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=ie(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!ae(e.id))return"its id is missing";if(!ae(e.name,Ca))return"its name is missing";if(!An(e.createdAt)||!An(e.updatedAt))return"its dates are wrong";const n=e.song;if(!be(n))return"its song is missing";const a=ie(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop","start","sections","section","arrangement"]);if(a)return`its song has an unknown field (${a})`;const i=Zc(n,e.version);if(i)return i;if(n.start!==void 0){if(e.version<7)return"its song has an unknown field (start)";if(n.start!=="wait")return"its start is not Count-in or Wait"}if(!Z(n.bpm)||n.bpm<Zt||n.bpm>en)return`its tempo is not ${Zt}–${en}`;if(n.beatsPerBar!==D)return"it isn't in 4/4";if(!Z(n.bars)||n.bars<1||n.bars>Me(n.bpm))return`its bars are not 1–${Me(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==z)return`its ticks are not ${z} a beat`;const o=ks(n.quantize,e.version);if(o)return`its song's ${o}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const d=n.loop;if(!be(d)||ie(d,["from","to"])||!Z(d.from)||!Z(d.to)||d.from<1||d.to<d.from||d.to>n.bars)return`its loop is not bars 1–${n.bars}`}const r=K(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>se)return`it has more than ${se} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const l=new Set,c=new Set;for(let d=0;d<e.passes.length;d++){const p=e.passes[d],u=`Pass ${d+1}`;if(!be(p))return`${u} is not an object`;const g=ie(p,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift","knobs","pattern"]);if(g)return`${u} has an unknown field (${g})`;if(p.pattern!==void 0){if(e.version<7)return`${u} has an unknown field (pattern)`;if(p.pattern!==!0)return`${u}'s pattern is not true`;if(p.knobs!==void 0)return`${u} is a pattern and moves knobs`}const m=new Map;if(p.knobs!==void 0){if(e.version<6)return`${u} has an unknown field (knobs)`;if(!Array.isArray(p.knobs)||!p.knobs.length||p.knobs.length>ta)return`${u}'s knobs are not 1–${ta}`;for(const h of p.knobs){if(!be(h)||ie(h,["inst","param","label","base"]))return`${u} has a knob that is wrong`;if(!ae(h.inst,64)||!(Array.isArray(p.instruments)&&p.instruments.includes(h.inst)))return`${u} has a knob from an instrument not listed`;if(typeof h.param!="string"||!Yi.test(h.param))return`${u} has a knob with a bad id`;if(!ae(h.label,na))return`${u}'s knob ${h.param} has no name`;if(typeof h.base!="number"||!(h.base>=0&&h.base<=1))return`${u}'s knob ${h.param} does not start at 0–1`;const f=`${h.inst}|${h.param}`;if(m.has(f))return`${u} has knob ${h.param} twice`;m.set(f,h)}if(p.quantize!==void 0)return`${u} moves knobs and has a quantize`}if(p.repeat!==void 0&&(e.version<3||typeof p.repeat!="boolean"))return`${u}'s repeat is not true or false`;if(p.shift!==void 0&&(e.version<4||!Z(p.shift)||p.shift===0||Math.abs(p.shift)>aa))return`${u}'s shift is not a whole number of bars`;if(!ae(p.id)||l.has(p.id))return`${u} has no id of its own`;if(l.add(p.id),!Z(p.n)||p.n<1||c.has(p.n))return`${u} has no number of its own`;if(c.add(p.n),!ae(p.name,Be))return`${u}'s name is not 1–${Be} characters`;if(!An(p.recordedAt))return`${u}'s date is wrong`;if(!Z(p.endTick)||p.endTick<=0||p.endTick>r)return`${u}'s end is not in the song`;for(const h of["kept","mute","solo"])if(typeof p[h]!="boolean")return`${u}'s ${h} is not true or false`;if(typeof p.volume!="number"||!(p.volume>=0&&p.volume<=1))return`${u}'s volume is not 0–1`;if(!Array.isArray(p.instruments)||!p.instruments.every(h=>ae(h,64)))return`${u}'s instruments are wrong`;const w=ks(p.quantize,e.version);if(w)return`${u}'s ${w}`;if(!Array.isArray(p.events))return`${u}'s events are missing`;if(p.events.length>Pe)return`${u} has more than ${Pe} events`;let x=Number.NEGATIVE_INFINITY;for(let h=0;h<p.events.length;h++){const f=p.events[h],y=`event ${h+1} in ${u}`;if(!be(f))return`${y} is not an object`;if(!ae(f.inst,64)||!p.instruments.includes(f.inst))return`${y} is from an instrument not listed`;if(!Z(f.at)||f.at<-rn||f.at>=p.endTick)return`${y} is outside the pass`;if(f.at<x)return`${y} is out of order`;if(x=f.at,f.kind==="take"){if(e.version===1)return`${y} is of an unknown kind`;const k=ie(f,["kind","inst","take","at","len","peaks"]);if(k)return`${y} has an unknown field (${k})`;if(!ae(f.take)||f.take.length>128)return`${y} has no take`;if(!Z(f.len)||f.len<1||f.at+f.len>r)return`${y} has a length outside the song`;if(f.peaks!==void 0&&!(Array.isArray(f.peaks)&&f.peaks.length<=Gi&&f.peaks.every(T=>typeof T=="number"&&T>=0&&T<=1)))return`${y} has bad peaks`;continue}if(f.kind==="param"){if(e.version<6||!m.size)return`${y} is of an unknown kind`;const k=ie(f,["kind","inst","param","at","value"]);if(k)return`${y} has an unknown field (${k})`;if(typeof f.param!="string"||!m.has(`${f.inst}|${f.param}`))return`${y} moves a knob the pass doesn't list`;if(typeof f.value!="number"||!(f.value>=0&&f.value<=1))return`${y} has a value outside 0–1`;continue}if(m.size)return`${y} is not a knob move in a knob pass`;if(p.pattern===!0&&f.kind!==void 0&&f.kind!=="note")return`${y} is not a note in a pattern pass`;if(f.kind==="slot"){const k=ie(f,["kind","inst","slot","at"]);if(k)return`${y} has an unknown field (${k})`;if(!Z(f.slot)||f.slot<1||f.slot>16)return`${y} has slot ${String(f.slot)}`;continue}const b=ie(f,["kind","inst","note","vel","at","len","slice","name"]);if(b)return`${y} has an unknown field (${b})`;if(f.kind!==void 0&&f.kind!=="note")return`${y} is of an unknown kind`;if(!Z(f.note)||f.note<0||f.note>127)return`${y} has note ${String(f.note)}`;if(typeof f.vel!="number"||!(f.vel>0&&f.vel<=1))return`${y} has velocity ${String(f.vel)}`;if(!Z(f.len)||f.len<1||f.len>r)return`${y} has a length outside the song`;if(f.slice!==void 0&&!(Z(f.slice)&&f.slice>=0&&f.slice<=255))return`${y} has slice ${String(f.slice)}`;if(f.name!==void 0&&!(typeof f.name=="string"&&f.name.length>0&&f.name.length<=Be))return`${y} has a bad sound name`}}return null}function Zc(e,t){if(!(e.sections!==void 0||e.section!==void 0||e.arrangement!==void 0))return null;if(t<8)return"its song has an unknown field (sections)";const a=e.sections;if(!Array.isArray(a)||!a.length||a.length>Gt)return`its sections are not 1–${Gt}`;const i=e.bars,o=new Set;for(const r of a){if(!be(r)||ie(r,["id","name","from","to","on"]))return"a section is wrong";if(!ae(r.id,64)||o.has(r.id))return"a section has no id of its own";if(o.add(r.id),!ae(r.name,Jt))return`a section's name is not 1–${Jt} characters`;if(!Z(r.from)||!Z(r.to)||r.from<1||r.to<r.from||r.to>i)return`section ${r.name} is not inside bars 1–${i}`;if(!Array.isArray(r.on)||r.on.length>256||!r.on.every(l=>ae(l)))return`section ${r.name}'s passes are wrong`}if(!ae(e.section,64)||!o.has(e.section))return"the section playing is not one of its sections";if(e.arrangement!==void 0){const r=e.arrangement;if(!Array.isArray(r)||r.length>Xt)return`its song order is not 0–${Xt} steps`;for(const l of r)if(!be(l)||ie(l,["section","times"])||!ae(l.section,64)||!o.has(l.section)||!Z(l.times)||l.times<1||l.times>Qt)return"a step of its song order is wrong"}return null}function Fa(e){const t=Qc(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e),a=J(n.song);if(a){const i=dt(a,n.song.bars);i?n.song.loop=i:delete n.song.loop}return n.version=La,{session:n}}const nn=e=>`${e.note}|${e.at}|${e.slice??""}`,Zi=30,Sn=e=>(e?.events??[]).filter(t=>t.kind!=="slot"&&t.kind!=="take"&&t.kind!=="param");function Ct(e,t,n){if(e.length!==t.length)return!1;const a=new Map;for(const i of t)a.set(nn(i),i);if(a.size!==t.length)return!1;for(const i of e){const o=a.get(nn(i));if(!o||Math.abs(o.vel-i.vel)>.02||Math.abs(o.len-i.len)>Zi&&!n?.(i))return!1}return!0}function ed(e,t,n){const a=new Map;for(const i of t)a.set(nn(i),i);for(const i of e){const o=a.get(nn(i));if(!o||Math.abs(o.vel-i.vel)>.02||Math.abs(o.len-i.len)>Zi&&!n?.(i))return!1}return!0}class td{song;b0;passes;drafts=new Map;held=new Map;knobDrafts=new Map;knobValues=new Map;patternDrafts=new Map;settled=null;amended=!1;redoStack=[];laps=new WeakMap;through=-1;paused=!1;recFrom=0;punched=null;voiceLap=null;voiceCut=null;now;stats={taken:0,ignored:0,overCap:0,empty:0,samePattern:0,late:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/z}get lapTicks(){return ia(this.song).length}get lapStart(){return ia(this.song).start}get full(){return this.passes.length>=se}hasDraft(t){return t<this.recFrom?!1:(this.drafts.get(t)?.count??0)>0||(this.knobDrafts.get(t)?.events.length??0)>0}place(t){const n=t-this.b0,a=Math.floor(n/this.lapBeats+1e-12);return{lap:a,tick:Math.round((n-a*this.lapBeats)*z)}}get graceTicks(){return Uc(this.song.bpm)}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-this.graceTicks?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/z}played(t,n){const a=[];for(const i of n){if(i.type==="sound"||i.type==="note"&&i.stopped){this.stats.ignored++;continue}if(i.type==="note"&&!i.on){this.release(t,i.id,i.beat);continue}if(i.type==="note"&&i.pattern){const p=this.patternNote(t,i);p&&a.push(p);continue}if(i.type==="chordPad"||i.type==="lap"||i.type==="voice"){this.stats.ignored++;continue}if(i.type==="take"){const p=this.voicePass(t,i);p&&a.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(i.type==="param"){const p=this.knob(t,i);p&&a.push(p);continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:o,tick:r}=this.placeOn(i.beat);if(o<0||o<=this.through||o===this.voiceLap){this.stats.ignored++;continue}const l=this.drafts.get(o)??{lap:o,events:[],count:0};if(l.events.length>=Pe){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(i.type==="slot")c={kind:"slot",inst:t,slot:i.slot,at:d};else{const p={inst:t,note:i.note,vel:Ft(i.velocity),at:d,len:1};i.slice!==void 0&&(p.slice=i.slice),typeof i.name=="string"&&i.name.trim()&&(p.name=i.name.trim().slice(0,Be)),this.held.set(`${t}|${i.id}`,{ev:p,onBeat:i.beat}),c=p}ve(l.events,c),l.count++,this.drafts.set(o,l),this.stats.taken++,a.push({lap:o,ev:c})}return this.rejudge(),a}patternNote(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:a,tick:i}=this.place(n.beat);if(a===this.voiceLap)return this.stats.ignored++,null;if(a>=0&&a===this.settled?.lap&&a<=this.through)return this.latePattern(t,n,i),null;if(a<0||a<=this.through)return this.stats.ignored++,null;const o=this.patternDrafts.get(a)??new Map,r=o.get(t)??[];if(r.length>=Pe)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+i,len:1};return n.slice!==void 0&&(l.slice=n.slice),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:n.beat}),ve(r,l),o.set(t,r),this.patternDrafts.set(a,o),this.stats.taken++,{lap:a,ev:l}}latePattern(t,n,a){const i=this.settled;if(!i)return;const o={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+a,len:1};n.slice!==void 0&&(o.slice=n.slice);let r=i.byInst.get(t);if(!(r?.pass&&!this.passes.includes(r.pass))){if(r||(r={events:[],pass:null,completed:!1},i.byInst.set(t,r)),r.events.length>=Pe){this.stats.overCap++;return}this.held.set(`${t}|${n.id}`,{ev:o,onBeat:n.beat}),ve(r.events,o),r.pass&&r.pass.events!==r.events&&ve(r.pass.events,o),this.stats.late++,r.dirty=!0}}rejudge(){const t=this.settled;if(t)for(const[n,a]of t.byInst){if(!a.dirty)continue;a.dirty=!1;const i=this.lastPattern(n,a.pass??void 0),o=!!i&&Ct(a.events,Sn(i),this.heldNote);if(a.pass){if(o&&!a.completed){const r=this.passes.indexOf(a.pass);r>=0&&this.passes.splice(r,1),a.pass=null,this.stats.samePattern++}this.amended=!0}else!o&&!this.full&&(a.pass=this.patternPass(n,a.events,t.lap,this.lapTicks),this.amended=!0)}}lastPattern(t,n){let a;for(const i of this.passes)i!==n&&i.pattern&&i.instruments.includes(t)&&(!a||i.n>a.n)&&(a=i);return a}patternLive(t){if(this.paused||this.full)return[];const{lap:n,tick:a}=this.place(t),i=n>this.through&&n>=this.recFrom?this.patternDrafts.get(n):void 0;if(!i)return[];const o=this.lapStart,r=[];for(const[l,c]of i){const d=c.filter(u=>u.at-o<=a);if(!d.length)continue;const p=this.lastPattern(l);if(p){const u=a-z,g=d.filter(w=>w.at-o<=u),m=Sn(p).filter(w=>w.at-o<=u);if(Ct(g,m,this.heldNote))continue}r.push({inst:l,events:d})}return r}snapFirst(t,n,a,i=this.b0){if(!n.on||this.paused||this.full||this.through>=0||this.recFrom>0||this.voiceLap===0)return null;const o=Math.max(0,Math.min(this.lapTicks-1,Math.round((i-this.b0)*z))),r=this.drafts.get(0)??{lap:0,events:[],count:0};if(r.events.length>=Pe)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+o,len:1};return n.slice!==void 0&&(l.slice=n.slice),typeof n.name=="string"&&n.name.trim()&&(l.name=n.name.trim().slice(0,Be)),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:Math.min(a,i)}),ve(r.events,l),r.count++,this.drafts.set(0,r),this.stats.taken++,{lap:0,ev:l}}knob(t,n){const a=le({inst:t,param:n.param}),i=Es(n.value),o=this.knobValues.get(a);if(i!==null&&this.knobValues.set(a,i),i===null||!Yi.test(n.param)||this.paused||this.full)return this.stats.ignored++,null;const{lap:r,tick:l}=this.place(n.beat);if(r<0||r<=this.through||r===this.voiceLap)return this.stats.ignored++,null;const c=this.knobDrafts.get(r)??{lap:r,events:[],knobs:new Map};let d=c.knobs.get(a);if(!d){if(c.knobs.size>=ta)return this.stats.ignored++,null;const g=(n.label??"").trim().slice(0,na)||n.param.slice(0,na);d={inst:t,param:n.param,label:g,base:Es(n.from)??o??i},c.knobs.set(a,d)}let p;for(let g=c.events.length-1;g>=0&&!p;g--){const m=c.events[g];m.inst===t&&m.param===n.param&&(p=m)}if(p&&p.value===i)return null;if(c.events.length>=Pe)return this.stats.overCap++,null;const u={kind:"param",inst:t,param:n.param,at:this.lapStart+l,value:i};return ve(c.events,u),this.knobDrafts.set(r,c),this.stats.taken++,{lap:r,ev:u}}release(t,n,a){const i=`${t}|${n}`,o=this.held.get(i);o&&(this.held.delete(i),o.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((a-o.onBeat)*z))))}seam(t){const n=this.place(t).lap,a=[];for(let i=this.through+1;i<n;i++){if(this.through=i,i<this.recFrom){this.drop(i);continue}a.push(...this.commitPatterns(i,this.lapTicks));const o=this.commit(i,this.lapTicks);o&&a.push(o);const r=this.commitKnobs(i,this.lapTicks);r&&a.push(r)}return a}stop(t){for(const[a,i]of this.held)this.held.delete(a),this.cut.add(i.ev),i.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-i.onBeat)*z)));const n=this.seam(t);return this.settled=null,n.push(...this.part(t)),this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.settled=null,this.cut.clear(),n}punchOut(t){for(const[r,l]of this.held)this.held.delete(r),this.cut.add(l.ev),l.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-l.onBeat)*z)));const n=this.seam(t);this.settled=null;const{lap:a,tick:i}=this.place(t),o=a>=this.recFrom;n.push(...this.part(t)),o&&(this.punched={lap:a,tick:i}),this.recFrom=Number.POSITIVE_INFINITY;for(const r of[...this.drafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.knobDrafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.patternDrafts.keys()])r>this.through&&this.drop(r);return this.cut.clear(),n}recordFrom(t){return this.recFrom=Math.max(t,this.through+1,0),this.recFrom}recordNone(){this.recFrom=Number.POSITIVE_INFINITY}records(t){return t>=this.recFrom}drop(t){const n=this.drafts.get(t);if(n)for(const[i,o]of this.held)n.events.includes(o.ev)&&this.held.delete(i);const a=this.patternDrafts.get(t);if(a)for(const i of a.values())for(const[o,r]of this.held)i.includes(r.ev)&&this.held.delete(o);this.drafts.delete(t),this.knobDrafts.delete(t),this.patternDrafts.delete(t)}part(t){const n=[],{lap:a,tick:i}=this.place(t);if(a>=0&&a>this.through){if(this.through=a,a<this.recFrom)return this.drop(a),n;const o=D*z,r=Math.min(this.lapTicks,Math.max(o,Math.ceil(Math.max(1,i)/o)*o)),l=this.patternDrafts.get(a);if(l)for(const[p,u]of l){const g=u.filter(m=>m.at-this.lapStart<=i);g.length?l.set(p,g):l.delete(p)}n.push(...this.commitPatterns(a,r,i));const c=this.commit(a,r);c&&n.push(c);const d=this.commitKnobs(a,r);d&&n.push(d)}return n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:a,tick:i}=this.place(n.beat),o=a===this.voiceLap,r=o?this.voiceCut:this.punched?.lap===a?this.punched.tick:null;if(a<0||a<this.recFrom&&r===null&&!o||r!==null&&i>=r||!n.take||this.passes.some(u=>u.events.some(g=>g.kind==="take"&&g.take===n.take)))return this.stats.ignored++,null;const l=Math.max(0,Math.min(this.lapTicks-1,i)),c=Math.max(1,Math.min((r??this.lapTicks)-l,Math.round(n.lengthBeats*z))),d={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+l,len:c};Array.isArray(n.peaks)&&n.peaks.length&&(d.peaks=n.peaks.slice(0,Gi).map(u=>Number.isFinite(u)?Math.round(Math.max(0,Math.min(1,u))*100)/100:0)),this.drafts.set(-1-a,{lap:a,events:[d],count:1});const p=this.commitDraft(-1-a,a,this.lapTicks);return p&&this.stats.taken++,p}heldNote=t=>this.cut.has(t)||this.isHeld(t);cut=new Set;isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,a){const i=this.drafts.get(n),o=this.knobDrafts.get(n),r=this.patternDrafts.get(n),l=this.lapStart-a;if(Number.isFinite(this.recFrom)&&(this.recFrom=Math.max(0,this.recFrom-n)),this.punched=null,this.voiceLap=null,this.voiceCut=null,this.b0=t,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),r){for(const c of r.values())for(const d of c)d.at+=l;this.patternDrafts.set(0,r)}if(i){for(const c of i.events)c.at+=l;i.lap=0,this.drafts.set(0,i)}if(o){for(const c of o.events)c.at+=l;o.lap=0,this.knobDrafts.set(0,o)}}resume(t){this.b0=t,this.punched=null,this.voiceLap=null,this.voiceCut=null,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,a){const i=this.drafts.get(t);if(this.drafts.delete(t),!i||i.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=i.count,null;const o=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=i.events.filter(d=>d.at-r<a),c={id:`p${o}-${this.now().getTime().toString(36)}`,n:o,name:`Pass ${o}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?K(this.song):a,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}commitPatterns(t,n,a){const i=this.patternDrafts.get(t);if(this.patternDrafts.delete(t),this.settled=a===void 0?{lap:t,byInst:new Map}:null,!i)return[];const o=[],r=this.lapStart;for(const[l,c]of i){const d=c.filter(x=>x.at-r<n);if(!d.length)continue;const p={events:d,pass:null,completed:!1};this.settled?.byInst.set(l,p);const u=this.lastPattern(l),g=Sn(u);let m=g;if(a!==void 0){const x=d.reduce((f,y)=>Math.max(f,y.at-r),Number.NEGATIVE_INFINITY),h=Math.min(a,x);m=g.filter(f=>f.at-r<=h)}const w=a===void 0?Ct(d,m,this.heldNote):ed(d,m,this.heldNote);if(u&&w){this.stats.samePattern++;continue}if(this.full){this.stats.ignored+=d.length;continue}if(u&&this.laps.get(u)===t-1&&g.length){const x=g[0]?.at??0;if(Ct(d.filter(h=>h.at>=x),g)){const h=this.passes.indexOf(u);h>=0&&this.passes.splice(h,1),p.completed=!0}}p.pass=this.patternPass(l,d,t,n),o.push(p.pass)}return o}patternPass(t,n,a,i){const o=this.passes.reduce((l,c)=>Math.max(l,c.n),0)+1,r={id:`p${o}-${this.now().getTime().toString(36)}`,n:o,name:`Pass ${o}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?K(this.song):i,kept:!1,mute:!1,solo:!1,volume:1,instruments:[t],events:n,pattern:!0};return this.passes.push(r),this.laps.set(r,a),this.redoStack=[],r}patternDrafting(){const t=[];for(const[n,a]of this.patternDrafts)if(n>=this.recFrom)for(const[i,o]of a)t.push({lap:n,inst:i,events:o});return t}commitKnobs(t,n){const a=this.knobDrafts.get(t);if(this.knobDrafts.delete(t),!a?.events.length)return null;if(this.full)return this.stats.ignored+=a.events.length,null;const i=this.lapStart,o=a.events.filter(p=>p.at-i<n);if(!o.length)return null;const r=new Set(o.map(p=>le(p))),l=[...a.knobs.values()].filter(p=>r.has(le(p))),c=this.passes.reduce((p,u)=>Math.max(p,u.n),0)+1,d={id:`p${c}-${this.now().getTime().toString(36)}`,n:c,name:`Pass ${c}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?K(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(p=>p.inst))],events:o,knobs:l.map(p=>({...p}))};return this.passes.push(d),this.laps.set(d,t),this.redoStack=[],d}knobDrafting(){return[...this.knobDrafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events,knobs:[...t.knobs.values()]}))}drafting(){return[...this.drafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events}))}undo(t){this.settled=null;const{lap:n}=this.place(t),a=n>=this.recFrom?this.drafts.get(n):void 0,i=n>=this.recFrom?this.knobDrafts.get(n):void 0;if(a&&a.count>0||i?.events.length){this.drafts.delete(n),this.knobDrafts.delete(n);const l=a??{lap:n,events:[],count:0};for(const[d,p]of this.held)l.events.includes(p.ev)&&this.held.delete(d);const c={kind:"lap",draft:l,...i?.events.length?{knobs:i}:{}};return this.redoStack.push(c),c}const o=this.passes.pop();if(!o)return null;const r={kind:"pass",pass:o};return this.redoStack.push(r),r}undoPass(t){const n=this.passes.indexOf(t);if(n<0)return null;this.passes.splice(n,1);const a={kind:"pass",pass:t};return this.redoStack.push(a),a}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const l=this.passes.findIndex(c=>c.n>n.pass.n);return l<0?this.passes.push(n.pass):this.passes.splice(l,0,n.pass),n}const{lap:a}=this.place(t);if(n.draft.lap===a||n.draft.lap>this.through){const l=this.drafts.get(n.draft.lap);if(l)for(const c of n.draft.events)ve(l.events,c);else n.draft.count&&this.drafts.set(n.draft.lap,n.draft);if(l&&(l.count+=n.draft.count),n.knobs){const c=this.knobDrafts.get(n.knobs.lap);if(!c)this.knobDrafts.set(n.knobs.lap,n.knobs);else{for(const d of n.knobs.events)ve(c.events,d);for(const[d,p]of n.knobs.knobs)c.knobs.has(d)||c.knobs.set(d,p)}}return n}n.draft.count&&this.drafts.set(n.draft.lap,n.draft),n.knobs&&this.knobDrafts.set(n.knobs.lap,n.knobs);const i=this.commit(n.draft.lap,this.lapTicks),o=this.commitKnobs(n.draft.lap,this.lapTicks),r=i??o;return r?{kind:"pass",pass:r}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function Es(e){return typeof e!="number"||!Number.isFinite(e)?null:Math.round(Math.max(0,Math.min(1,e))*1e4)/1e4}function Ft(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function ve(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const As=.5,nd=64,Ne="draft:",ad=12;function Ss(e,t){const n=t&&t.grid!=="off"?Yc[t.grid]:void 0;if(!t||!n)return e;const a=Math.round(e/n)*n;return Math.round(e+(a-e)*t.strength)}function rt(e,t){return e.mute?!1:t?e.solo:!0}const Ms=e=>e.kind==="slot",Mn=e=>e.kind==="take",Tn=e=>e.kind==="param",sd=.25,id=4,od=.05;class rd{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;live=null;knobs=new Map;hands=new Map;resend=new Map;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0,params:0,live:0,byInst:{}};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.restart()}forgetKnobs(){this.knobs.clear(),this.hands.clear(),this.resend.clear()}rebase(t){for(const[n,a]of this.takesSent)a<=t+1e-9&&this.takesSent.delete(n);this.hands.clear();for(const n of this.knobs.values())n.fresh=!1;this.rung=this.rung.filter(n=>!n.pass.startsWith(Ne))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;for(const a of this.knobs.values())a.fresh=!1;this.silence(t);const n=[...this.takesSent.values()].some(a=>a>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(a=>a.beat<t);for(const[a,i]of this.takesSent)i>t&&this.takesSent.delete(a);for(const[a,i]of this.sounding)this.sounding.set(a,i.filter(o=>o.start<t))}}pump(t,n,a){const i=this.rec,o=[];if(this.waiting.length){const S=[];for(const A of this.waiting){if(i.isHeld(A.ev)){S.push(A);continue}if(A.beat>=t)o.push(A);else{const C=Math.min(A.ev.len,this.rec.lapTicks)/z-(t-A.beat);C>.05&&o.push({...A,beat:t,lenBeats:C})}}this.waiting=S}const r=Math.max(this.sentTo,t);if(!(n>r)&&!o.length&&!this.lateTakes(t))return 0;const l=a?.lapTicks??i.lapTicks,c=l/z,d=a?.lapStart??i.lapStart,p=d+l,u=a?.b0??i.b0,g=(S,A)=>u+S*c+(A-d)/z,m=S=>S>=d-rn&&S<p,w=Math.max(0,Math.floor((r-u)/c)-1),x=Math.floor((n-u)/c)+1,h=[],f=(S,A,C)=>{const N=C+S.at;if(!m(N))return;const q=g(A,N);q>=r&&q<n&&h.push({inst:S.inst,beat:q,slot:S.slot})},y=[],b=(S,A,C,N,q=Number.NEGATIVE_INFINITY,H=Number.POSITIVE_INFINITY)=>{const R=N,V=R+A.at,P=Math.min(V+A.len,R+S.endTick,H),j=Math.max(V,d,q),U=Math.min(P,p);if(U<=j)return;const ye=g(C,j),de=g(C,U),it=`${S.id}|${C}|${R}`;if(this.takesSent.has(it)||de<=t||ye>=n)return;const Oe=Math.max(ye,t);if(de-Oe<od)return;const He=(j-V)/z+(Oe-ye),At={type:"take",id:`t${++this.serial}`,beat:Oe,take:A.take,lengthBeats:He+(de-Oe),gain:Math.max(0,Math.min(1,S.volume))};He>1e-9&&(At.offsetBeats=He),this.takesSent.set(it,de),y.push({inst:A.inst,ev:At})},k=S=>En(this.song,S.id,a?.section),T=i.passes.filter(k),E=T.some(S=>S.solo&&!S.mute),$=(S,A,C,N,q,H,R,V=!1)=>{if(!m(q))return;const P=g(H,q);if(P>=r&&P<n){if(V&&this.live?.(A,P)){this.stats.live++;return}i.isHeld(N)?this.waiting.push({inst:A,age:C,beat:P,ev:N,velocity:R,pass:S}):o.push({inst:A,age:C,beat:P,ev:N,velocity:R,pass:S})}};for(const S of T){if(!rt(S,E))continue;const A=a?void 0:i.lapOf(S),C=A===void 0?0:A+1,N=S.quantize??this.song.quantize,q=mt(S,this.song),H=ft(S,this.song),R=q.length>1?S.endTick:K(this.song),V=P=>{const j=P+H;return H&&j>=R?j-R:j};for(let P=Math.max(C,w);P<=x;P++)for(const j of q)for(const U of S.events)if(!(U.at>=S.endTick)){if(Ms(U)){f(U,P,j+V(U.at)-U.at);continue}if(!Tn(U)){if(Mn(U)){H?(b(S,U,P,j+H,j,j+R),b(S,U,P,j+H-R,j,j+R)):b(S,U,P,j);continue}$(S.id,U.inst,S.n,U,j+V(Ss(U.at,N)),P,U.vel*S.volume,S.pattern===!0)}}}if(!E)for(const S of i.drafting())for(let A=Math.max(a?0:S.lap+1,w);A<=x;A++)for(const C of S.events){if(Ms(C)){f(C,A,0);continue}Mn(C)||Tn(C)||$(`${Ne}${S.lap}`,C.inst,Number.POSITIVE_INFINITY,C,Ss(C.at,this.song.quantize),A,C.vel)}if(this.announceLaps){const S=[];for(let A=Math.max(0,Math.ceil((r-u)/c));u+A*c<n;A++)S.push({type:"lap",id:`l${++this.serial}`,beat:u+A*c,lengthBeats:c});S.length&&(this.sink.laps(S),this.stats.laps+=S.length)}if(this.pumpKnobs(t,r,n,{b0:u,L:c,cs:d,ce:p,beatAt:g,inCycle:m,lapLo:w,lapHi:x,loopChange:!!a}),this.sentTo=Math.max(this.sentTo,n),y.length){const S=new Map;for(const A of y)S.set(A.inst,[...S.get(A.inst)??[],A.ev]);for(const[A,C]of S)this.sink.controls(A,C);this.stats.takes+=y.length}if(h.length){h.sort((A,C)=>A.beat-C.beat);const S=new Map;for(const A of h){const C=S.get(A.inst)??[];C.push({type:"slot",id:`s${++this.serial}`,beat:A.beat,slot:A.slot}),S.set(A.inst,C)}for(const[A,C]of S)this.sink.controls(A,C);this.stats.slots+=h.length}if(!o.length)return 0;o.sort((S,A)=>S.beat-A.beat||A.age-S.age);const M=new Map;for(const S of o){const A=S.lenBeats??Math.max(1,Math.min(S.ev.len,l))/z;if(!this.voice(S.inst,S.beat,S.beat+A,S.age)){this.stats.dropped++;continue}const C={note:S.ev.note,velocity:Math.max(.01,Math.min(1,S.velocity)),startBeat:S.beat,lengthBeats:A,spanBeats:A,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:S.ev.note};S.ev.slice!==void 0&&(C.slice=S.ev.slice),this.rung.push({inst:S.inst,pass:S.pass,note:C});const N=M.get(S.inst)??[];N.push(C),M.set(S.inst,N)}let F=0;for(const[S,A]of M)this.sink.send(S,A),F+=A.length,this.stats.byInst[S]=(this.stats.byInst[S]??0)+A.length;return this.stats.sent+=F,F}knobSources(t){const n=this.rec,a=n.passes.filter(r=>En(this.song,r.id)),i=a.some(r=>r.solo&&!r.mute),o=[];for(const r of a){if(!sa(r)||!rt(r,i))continue;const l=t?void 0:n.lapOf(r);o.push({id:r.id,age:r.n,first:l===void 0?0:l+1,endTick:r.endTick,...r.repeat?{repeat:!0}:{},...r.shift?{shift:r.shift}:{},knobs:r.knobs??[],events:r.events.filter(Tn)})}if(!i)for(const r of n.knobDrafting())o.push({id:`${Ne}${r.lap}`,age:1e9+r.lap,first:t?0:r.lap+1,endTick:K(this.song),knobs:r.knobs,events:r.events});return o}driver(t,n,a){let i=null;for(const o of t)o.first<=a&&o.knobs.some(r=>le(r)===n)&&(!i||o.age>i.age)&&(i=o);return i}curve(t,n){const a=t.knobs.find(l=>le(l)===n),i=sd*this.song.bpm*z/60,o=[];let r=null;for(const l of t.events){if(le(l)!==n||l.at>=t.endTick)continue;const c=r===null?Number.POSITIVE_INFINITY:l.at-r;o.push({at:l.at,value:l.value,...c>0&&c<=i?{glide:Math.min(id,c/z)}:{}}),r=l.at}return{base:a?.base??o[0]?.value??0,points:o}}valueAt(t,n,a){const i=ft(t,this.song),o=mt(t,this.song).length>1,r=o?t.endTick:K(this.song);let l=o?a-Math.floor(a/r)*r:a;l-=i,l<0&&(l+=r);let c=n.base;for(const d of n.points){if(d.at>l)break;c=d.value}return c}knobMarks(t,n){const a=mt(t,this.song),i=ft(t,this.song),o=a.length>1?t.endTick:K(this.song),r=c=>{const d=c+i;return i&&d>=o?d-o:d},l=[];for(const c of a){l.push({t:c+r(0),value:n.base});for(const d of n.points)l.push({t:c+r(d.at),value:d.value,...d.glide?{glide:d.glide}:{}})}return l}pumpKnobs(t,n,a,i){for(const[c,d]of this.hands)d.until<=t&&this.hands.delete(c);const o=this.knobSources(i.loopChange),r=new Map;for(const c of this.knobs.values())r.set(le(c),c);for(const c of o)for(const d of c.knobs)r.set(le(d),d);if(!r.size)return;const l=new Map;for(const[c,d]of r){const p=this.resend.get(c);this.resend.delete(c);const u=p!==void 0?Math.min(n,Math.max(p,t)):n;if(!(a>u))continue;const g=this.hands.get(c),m=y=>!!g&&y>=g.from-1e-9&&y<g.until-1e-9;let w=this.knobs.get(c);const x=[],h=Math.max(0,Math.min(i.lapLo,Math.floor((u-i.b0)/i.L)-1));for(let y=h;y<=i.lapHi;y++){const b=i.beatAt(y,i.cs);if(i.beatAt(y,i.ce)<=u||b>=a)continue;const T=this.driver(o,c,y),E=Math.max(u,b);if(!T){w?.driver&&(m(E)||x.push({beat:E,value:w.base}),w.driver=null);continue}const $=this.curve(T,c);if(w||(w={inst:d.inst,param:d.param,driver:null,base:$.base,fresh:!1},this.knobs.set(c,w)),w.driver!==T.id||!w.fresh){const M=i.cs+(E-b)*z;m(E)||x.push({beat:E,value:this.valueAt(T,$,M)}),w.driver=T.id,w.base=$.base,w.fresh=!0}b>=u&&b<a&&!m(b)&&x.push({beat:b,value:this.valueAt(T,$,i.cs)});for(const M of this.knobMarks(T,$)){if(!i.inCycle(M.t)||M.t<i.cs)continue;const F=i.beatAt(y,M.t);F<u||F>=a||m(F)||x.push({beat:F,value:M.value,...M.glide?{glide:M.glide}:{}})}}if(!x.length)continue;x.sort((y,b)=>y.beat-b.beat);const f=l.get(d.inst)??[];for(let y=0;y<x.length;y++){const b=x[y],k=x[y+1];k&&Math.abs(k.beat-b.beat)<1e-9||f.push({type:"param",id:`k${++this.serial}`,beat:b.beat,param:d.param,value:b.value,...b.glide?{glide:b.glide}:{}})}l.set(d.inst,f)}for(const[c,d]of l)d.length&&(d.sort((p,u)=>p.beat-u.beat),this.sink.controls(c,d),this.stats.params+=d.length)}hand(t,n,a){if(this.sentTo===Number.NEGATIVE_INFINITY)return null;const i=le({inst:t,param:n}),o=this.rec,{lap:r}=o.place(a),l=o.beatOf(r+1,0),c=this.hands.get(i);if(c&&Math.abs(c.until-l)<1e-9)return this.sentTo>l&&this.resend.set(i,l),c;const d=this.driver(this.knobSources(!1),i,r);if(!d)return null;const p={inst:t,param:n,driver:d.id,from:a,until:l};return this.hands.set(i,p),this.sentTo>l&&this.resend.set(i,l),p}handsAt(t){const n=[];for(const a of this.hands.values()){if(t<a.from-1e-9||t>=a.until)continue;let i=a.driver;if(i.startsWith(Ne)){const o=Number(i.slice(Ne.length));i=this.rec.passes.find(r=>sa(r)&&this.rec.lapOf(r)===o)?.id??null}n.push({...a,pass:i})}return n}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-nd),!this.rung.length||!this.sink.release)return;const n=this.rec.passes.filter(c=>En(this.song,c.id)),a=n.some(c=>c.solo&&!c.mute),i=new Map(n.map(c=>[c.id,c])),o=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(Ne)){const p=Number(c.slice(Ne.length));if(o.has(p))return!a;const u=n.find(g=>this.rec.lapOf(g)===p);return!!u&&rt(u,a)}const d=i.get(c);return!!d&&rt(d,a)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,a=Math.floor((t-n.b0)/n.lapBeats),i=n.passes.some(o=>o.solo&&!o.mute);return n.passes.some(o=>{if(!rt(o,i)||!o.events.some(Mn))return!1;const r=n.lapOf(o);return r===void 0||a>r})}voice(t,n,a,i){const o=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(o.length>=ad){let r=0;for(let l=1;l<o.length;l++)o[l].age<o[r].age&&(r=l);if(i<=o[r].age)return this.sounding.set(t,o),!1;o.splice(r,1)}return o.push({start:n,end:a,age:i}),this.sounding.set(t,o),!0}}const Ts=8,ld=.3,cd=2*D,dd={running:!1,beatAt:()=>0,timeAt:()=>0};class pd{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];listening=!1;soundOff=null;recent=[];starting=null;snap=null;startedBy=null;countedIn=!0;countFrom=0;armedKey=-1;liveCount=0;recOn;patterns=new Map;voiceJob=null;voiceSerial=0;voiceKey="";constructor(t,n){this.session=t,this.deps=n,this.rec=new td({song:t.song,b0:0,passes:t.passes,now:n.date}),this.recOn=t.passes.length===0,this.placed=new Set(t.passes.map(i=>i.id)),this.replay=n.sink?new rd(this.rec,n.sink):null,this.replay&&(this.replay.live=(i,o)=>this.live(i,o));const a=n.host;a?.clock&&this.offs.push(a.clock.onChange(i=>this.clockChanged(i))),a?.onPlayed&&this.offs.push(a.onPlayed((i,o)=>this.played(i,o))),a?.claimKeys&&this.offs.push(a.claimKeys(["Space","Backspace"],i=>(i.code==="Space"&&i.shiftKey?this.toggleRecord():i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??dd}get graceBeats(){return this.rec.graceTicks/z}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){this.placeNewPasses(),t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(en,Math.max(Zt,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Me(n)),this.clampSections(),this.changed())}toggle(){this.waiting?this.cancelWait():this.jamming||this.wantJam?this.stop():this.jam()}get waiting(){return this.listening||this.starting!==null}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}this.syncTempo(),this.notice="";const n=this.voiceJob?.phase==="starting";if(!this.session.passes.length&&!n&&(this.recOn=!0),n){if(this.recOn=!1,this.transport.running){const o=Math.ceil(this.beatNow()/D+.05)*D;this.begin(o,!0)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1);return}if(this.recOn&&this.session.song.start==="wait"){if(t.onSound){this.wait();return}this.notice="Wait needs a newer Studio. Counting in."}if(this.transport.running){const i=Math.ceil(this.beatNow()/D+.05)*D;this.begin(i,this.recOn)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}wait(){const t=this.deps.host;if(!t?.onSound)return;this.recent=[],this.listening=!0;let n=null;try{n=t.onSound(a=>this.heard(a))}catch{n=null}this.listening?this.soundOff=n:n?.(),this.changed(!1)}stopListening(){this.listening=!1;const t=this.soundOff;this.soundOff=null;try{t?.()}catch{}}cancelWait(){const t=this.starting!==null;this.stopListening(),this.starting=null,this.recent=[],t&&this.transport.running&&this.deps.host?.studioTransport?.stop(),this.changed(!1)}heard(t){if(!this.listening)return;this.startedBy=t;const n=this.deps.host;if((t.kind==="start"||t.kind==="in")&&t.from!=="studio"&&t.beat!==null&&this.markLive(t.from,t.beat),t.stopped||t.beat===null||!this.transport.running){this.stopListening(),this.starting={at:t.at,from:t.from,lead:[]};for(const o of this.recent)o.at>=t.at-.1&&this.starting.lead.push(o);this.recent=[],n?.studioTransport?.playOnly?n.studioTransport.playOnly(n.instance??"looper"):n?.studioTransport?.play(),this.changed(!1);return}const a=t.kind==="start"||t.kind==="in"?t.beat:Math.floor((t.beat+this.graceBeats)/D)*D;this.stopListening();const i=this.recent;this.recent=[],this.begin(a,!1);for(const o of i){const r=o.events.filter(l=>!(l.type==="note"&&l.stopped)&&l.beat>=a-this.graceBeats);r.length&&this.record(o.source,r)}this.changed(!1)}startFromSound(t){const n=this.starting;if(this.starting=null,!n)return;this.begin(t,!1);const a=this.transport.timeAt(t),i=Math.max(1e-6,this.transport.beatAt(a+1)-t);this.snap={b0:t,first:null,t0:a,bps:i,until:a+.25};for(const o of n.lead)this.snapPlayed(o.source,o.events,o.at);this.changed(!1)}snapPlayed(t,n,a){const i=this.snap;if(!i)return[...n];const o=[],r=i.b0+(a-i.t0)*i.bps;for(const l of n){const c=l.type==="note"&&l.stopped||l.type==="note"&&l.beat<i.b0-1e-9;if(l.type!=="note"||!c){o.push(l);continue}if(!l.on){this.rec.played(t,[{...l,stopped:!1,beat:Math.max(r,i.b0)}]);continue}i.first===null&&(i.first=a);const d=i.b0+Math.max(0,a-i.first)*i.bps;this.rec.snapFirst(t,{...l,stopped:!1},Math.min(r,d),d)&&this.changed(!1)}return o}markLive(t,n){const a=this.patterns.get(t);!a||n>a.last+D+1e-6||n<a.from-D?this.patterns.set(t,{from:n,last:n}):(a.last=Math.max(a.last,n),a.from=Math.min(a.from,n))}live(t,n){const a=this.patterns.get(t);return!!a&&n>=a.from-1e-6&&n<=a.last+D+1e-6}begin(t,n=!0,a){this.wantJam=!1,this.jamming=!0,this.snap=null;const i=this.voiceJob?.phase==="starting",o=i?Math.max(1,this.session.song.countInBars):n?this.session.song.countInBars:0,r=t+o*D;if(this.countFrom=t,this.countedIn=r>t,this.rec.resume(r),this.recOn&&!this.rec.full?this.rec.recordFrom(0):this.rec.recordNone(),this.replay?.start(),this.transport.running){const l=a??Math.min(t,this.beatNow());this.replay?.pump(l,this.transport.beatAt(this.deps.now()+As))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,r),i&&this.armVoice(0)}showCountIn(t,n){const a=this.deps.host;if(!this.deps.countIn||!a?.mapper||n<=t)return;const i=this.transport,o=l=>a.mapper?.toContextTime(i.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(o(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%D===0),until:o(n)})}catch{}}stop(){if(this.waiting){this.cancelWait();return}const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.snap=null,this.pending&&((this.pending.section===void 0||this.pending.section===this.session.song.section)&&this.applyLoop(this.pending.loop),this.pending=null),this.stopAt=null,this.songPlay=null,this.songRec&&this.endSongRecord();const n=this.voiceJob;if(n&&(n.phase==="starting"||n.phase==="armed"))this.cancelVoice(!0);else if(n&&n.phase==="recording"){const a=Math.max(0,Math.min(n.lengthBeats,t-n.beat));this.rec.voiceCut=Math.round(a*z),n.cutAt=a/n.lengthBeats,n.phase="after",n.until=this.deps.now()+Ts}this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.recOn=this.session.passes.length===0,this.rec.recFrom=0,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){const n=typeof t.beat=="number"?t.beat:0;t.kind==="start"&&this.starting?this.startFromSound(n):t.kind==="start"&&this.wantJam?this.begin(n,this.recOn||this.voiceJob?.phase==="starting"):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),(t.kind==="stop"||t.kind==="snapshot"&&!this.transport.running)&&(this.patterns.clear(),this.starting&&(this.starting=null,this.recent=[])),this.changed(!1)}get recording(){return this.recOn}get startApplies(){return this.recOn||!this.session.passes.length}toggleRecord(){this.setRecord(!this.recOn)}setRecord(t){if(!t&&this.voiceJob&&this.voiceJob.phase!=="after"&&(this.cancelVoice(!0),!this.recOn)||t===this.recOn)return;if(t&&this.rec.full){this.notice=`${se} passes: delete one to record.`,this.changed(!1);return}if(this.recOn=t,this.notice="",!t&&this.listening&&this.session.passes.length){this.stopListening(),this.recent=[],this.jam();return}if(!(this.jamming&&this.transport.running)){this.changed(!1);return}const a=this.beatNow();if(!t&&this.countedIn&&a<this.rec.b0-1e-9){this.playNow(a);return}if(t){const{lap:o,tick:r}=this.rec.place(a);this.rec.recordFrom(a<this.rec.b0?0:r<z?o:o+1),this.changed(!1);return}if(!this.rec.records(this.rec.place(a).lap)){this.rec.recordNone(),this.changed(!1);return}const i=this.rec.punchOut(a);this.replayChanged(),this.changed(i.length>0)}playNow(t){try{this.deps.countIn?.clear("looper")}catch{}this.begin(this.countFrom,!1,t),this.changed(!1)}played(t,n){for(const l of n)l.type==="voice"&&this.voiceNews(t,l);const a=n.some(l=>l.type==="voice")?n.filter(l=>l.type!=="voice"):n;if(!a.length)return;const i=this.voiceJob;if(!this.jamming&&i&&i.lucy===t&&a.some(l=>l.type==="take")){this.voiceTake(t,a.filter(l=>l.type==="take"));return}for(const l of a)l.type==="note"&&l.on&&l.pattern&&!l.stopped&&this.markLive(t,l.beat);const o=this.deps.now();if(this.starting){this.starting.lead.push({source:t,events:a,at:o});return}if(this.listening){this.keepRecent(t,a,o);return}if(!this.jamming)return;const r=this.snap?this.snapPlayed(t,a,o):a;this.snap&&o>this.snap.until&&(this.snap=null),r.length&&this.record(t,r)}keepRecent(t,n,a){const i=this.transport.running?this.beatNow():null;this.recent.push({source:t,events:n,at:a}),i!==null&&(this.recent=this.recent.filter(o=>o.events.some(r=>r.beat>=i-cd))),this.recent.length>256&&this.recent.splice(0,this.recent.length-256)}record(t,n){let a=!1;if(this.replay)for(const o of n)o.type==="param"&&this.replay.hand(t,o.param,o.beat)&&(a=!0);const i=this.rec.played(t,n);if(this.rec.amended){this.rec.amended=!1,this.changed();return}a&&!i.length&&this.changed(!1),this.voiceAdded(t,i),i.length&&this.changed(i.some(o=>o.ev.kind==="take"))}voiceView(t){const n=this.voiceJob;if(!n)return null;const a=Math.max(1,Math.round(n.lengthBeats/D));let i=null,o=null;return n.phase==="recording"&&t!==null&&Number.isFinite(n.beat)?(i=Math.max(0,Math.min(1,(t-n.beat)/n.lengthBeats)),o=Math.min(a,Math.floor((t-n.beat)/D)+1)):n.phase==="after"&&(i=n.cutAt??1),{phase:n.phase,n:n.n,bar:o,bars:a,peaks:n.peaks,pos:i,lucy:n.lucy,from:this.rec.lapStart,ticks:this.rec.lapTicks}}get voicing(){return this.voiceJob!==null}voicePass(t){if(this.voiceJob)return!1;const n=this.deps.host;if(!n?.studioTransport||!n.clock)return this.notice="Jam works inside the Studio.",this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.rec.full)return this.notice=`${se} passes: delete one to record.`,this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.waiting&&this.cancelWait(),this.voiceJob={lucy:t,phase:"starting",lap:-1,beat:Number.NaN,lengthBeats:this.rec.lapBeats,n:this.nextPassNumber(),peaks:[],until:0,cutAt:null},this.notice="",!this.jamming&&!this.wantJam)return this.jam(),!0;if(this.wantJam||!this.transport.running)return this.changed(!1),!0;const a=this.beatNow();let i=a<this.rec.b0?0:this.rec.place(a).lap+1;return this.transport.timeAt(this.rec.beatOf(i,0))-this.deps.now()<ld&&i++,this.armVoice(i),!0}nextPassNumber(){return this.session.passes.reduce((t,n)=>Math.max(t,n.n),0)+1}armVoice(t){const n=this.voiceJob;n&&(n.lap=t,n.beat=this.rec.beatOf(t,0),n.lengthBeats=this.rec.lapBeats,n.n=this.nextPassNumber(),n.phase="armed",this.rec.voiceLap=t,this.rec.voiceCut=null,this.tellVoice(n.lucy,{state:"armed",beat:n.beat,lengthBeats:n.lengthBeats,pass:n.n}),this.changed(!1))}cancelVoice(t=!0){const n=this.voiceJob;n&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,t&&this.tellVoice(n.lucy,{state:"cancel",beat:Number.isFinite(n.beat)?n.beat:0}),this.changed(!1))}tellVoice(t,n){try{this.deps.sink?.controls(t,[{type:"voice",id:`vp${++this.voiceSerial}`,...n}])}catch{}}voiceNews(t,n){const a=this.voiceJob;if(n.state==="ask"){this.voicePass(t);return}if(n.state==="undo"){this.undoVoice(t,n.take);return}!a||a.lucy!==t||(n.state==="cancel"?this.cancelVoice(!1):n.state==="recording"&&Array.isArray(n.peaks)?(a.peaks=n.peaks.slice(0,128),this.changed(!1)):n.state==="quiet"&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="Too quiet: the voice loop was not kept.",this.changed(!1)))}voiceTake(t,n){const a=this.rec.played(t,n);this.voiceAdded(t,a),a.length&&this.changed(!0)}voiceAdded(t,n){const a=this.voiceJob;if(!a||a.lucy!==t)return;const i=n.find(r=>r.ev.kind==="take")?.ev;if(!i||i.kind!=="take")return;const o=this.session.passes.find(r=>r.events.includes(i));this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="",this.tellVoice(t,{state:"added",beat:Number.isFinite(a.beat)?a.beat:0,take:i.take,...o?{pass:o.n}:{}})}undoVoice(t,n){const a=n?this.session.passes.find(o=>o.events.some(r=>r.kind==="take"&&r.take===n&&r.inst===t)):void 0;!a||!this.rec.undoPass(a)||(this.notice=`${a.name} undone.`,this.replayChanged(),this.changed(!0),this.tellVoice(t,{state:"undone",beat:0,take:n}))}voiceTick(t){const n=this.voiceJob;if(!n)return!1;if(n.phase==="armed"&&t!==null&&t>=n.beat&&(n.phase="recording"),n.phase==="recording"&&t!==null&&t>=n.beat+n.lengthBeats&&(n.phase="after",n.until=this.deps.now()+Ts),n.phase==="after"&&this.deps.now()>n.until)return this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.voiceKey="",!0;const a=t===null||!Number.isFinite(n.beat)?0:t-n.beat,i=`${n.phase}|${n.phase==="armed"?Math.ceil(-a-1e-9):n.phase==="recording"?Math.floor(a/D):""}`;return i===this.voiceKey?!1:(this.voiceKey=i,!0)}tick(){if(!this.jamming||!this.transport.running)return this.voiceJob?.phase==="after"&&this.voiceTick(null)?(this.changed(!1),!0):!1;const t=this.beatNow(),n=this.voiceTick(t);this.lastBeat=t;const{lap:a}=this.rec.place(t);let i=!1;const o=this.deps.load?.()==="over";o&&!this.rec.paused&&(this.rec.paused=!0,this.recOn&&(this.notice="Too busy to record. Playback carries on."),i=!0),a!==this.lastLap&&(this.lastLap=a,i=!0,!o&&this.rec.paused&&(this.rec.paused=!1,this.notice=""),a>=0&&!(this.pending&&t>=this.pending.seam)&&t>=this.rec.b0&&this.lapBegan());const r=this.rec.seam(t);r.length&&this.placeNewPasses();const l=this.rec.beatOf(this.rec.recFrom,0)-t,c=this.recOn&&Number.isFinite(l)&&l>0?l>D?Math.ceil(l/D-1e-9)*100:Math.ceil(l-1e-9):-1;c!==this.armedKey&&(this.armedKey=c,i=!0);const d=this.rec.patternLive(t).reduce((w,x)=>w+x.events.length,0);d!==this.liveCount&&(this.liveCount=d,i=!0);const p=this.pending;if(p&&t>=p.seam){this.pending=null,this.voiceJob&&this.voiceJob.phase!=="after"&&this.voiceJob.phase!=="recording"&&this.cancelVoice(!0);const w=this.rec.lapStart,x=this.rec.place(t).lap,h=p.section!==void 0&&p.section!==this.session.song.section;p.section!==void 0&&(this.session.song.section=p.section),this.applyLoop(p.loop),this.rec.rebase(p.seam,x,w),this.replay?.rebase(p.seam),h&&this.replayChanged(!0),this.lastLap=this.rec.place(t).lap,this.lapBegan(),this.changed()}if(this.stopAt!==null&&t>=this.stopAt-1e-6)return this.stopAt=null,this.songPlay=null,this.notice="The song is over.",this.stop(),!0;const u=this.transport.beatAt(this.deps.now()+As),g=this.stopAt!==null?Math.min(u,this.stopAt):u,m=this.pending;if(m&&g>m.seam){this.replay?.pump(t,m.seam);const w=ia({bars:this.session.song.bars,...m.loop?{loop:m.loop}:{}});this.replay?.pump(Math.max(t,m.seam),g,{b0:m.seam,lapStart:w.start,lapTicks:w.length,...m.section!==void 0?{section:m.section}:{}})}else this.replay?.pump(t,g);return r.length?(this.changed(),!0):i||n}view(){const t=this.session,n=this.transport,a=this.jamming&&n.running?this.beatNow():null,i=a!==null&&!this.countedIn?Math.max(a,this.rec.b0):a,o=i===null?null:this.rec.place(i),r=i!==null&&i<this.rec.b0,l=t.passes.reduce((b,k)=>Math.max(b,k.n),0)+1,c=o&&!r?o.lap:null,d=this.voiceJob,p=d?.phase==="recording"&&c===d.lap,u=d?.phase==="armed"&&!r,g=u||!p&&this.recOn&&c!==null&&!this.rec.records(c),m=!this.recOn&&!p&&!u,w=i!==null&&!r&&!m&&!g&&!this.rec.paused&&!this.rec.full,x=this.deps.host?.studioTransport?.bpm(),h=this.waiting?"waiting":this.jamming?r?"count-in":m?"playing":g?"armed":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";let f=null;const y=u&&d?d.beat:this.rec.beatOf(this.rec.recFrom,0);if(g&&i!==null&&Number.isFinite(y)){const b=Math.max(0,y-i);f=b>D?{bars:Math.ceil(b/D-1e-9),beats:Math.ceil(b-1e-9)}:{bars:0,beats:Math.max(1,Math.ceil(b-1e-9))}}return{session:t,phase:h,jamming:this.jamming||this.wantJam,bar:o&&!r?Math.floor((this.rec.lapStart+o.tick)/(D*960))+1:null,songPos:o&&!r?(this.rec.lapStart+o.tick)/K(t.song):null,pendingLoop:this.pending?.loop,queued:this.queuedView(i),songRec:this.songRec?this.songRec.items.map(b=>({...b})):null,songPlay:this.songPlay?{index:this.songPlay.index,lap:(this.session.song.arrangement?.[this.songPlay.index]?.times??1)-this.songPlay.left+1}:null,sectionAt:o&&!r&&t.song.sections?.length?{bar:Math.floor(o.tick/(D*z))+1,pos:o.tick/this.rec.lapTicks}:null,canUndoSong:this.songUndo!==null,nextPass:l,waiting:this.waiting,countIn:r&&i!==null?Math.max(1,Math.ceil(this.rec.b0-i)):null,lapPos:o&&!r?o.tick/this.rec.lapTicks:null,lapHasNotes:o?this.rec.hasDraft(o.lap):!1,voice:this.voiceView(i),livePatterns:w&&!p&&i!==null?this.rec.patternLive(i).map((b,k)=>({...b,n:l+k})):[],hands:i!==null&&o&&!r?this.handsAt(i):[],record:this.recOn||p||u,startOn:this.startApplies,recIn:f,recBar:Math.floor(this.rec.lapStart/(D*z))+1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof x=="number"&&Math.round(x)!==t.song.bpm?Math.round(x):null,notice:this.notice}}handsAt(t){if(!this.replay)return[];const n=K(this.session.song),a=o=>{const{tick:r}=this.rec.place(o);return Math.max(0,Math.min(1,(this.rec.lapStart+r)/n))},i=[];for(const o of this.replay.handsAt(t)){if(!o.pass)continue;const r=(this.rec.lapStart+this.rec.lapTicks)/n;i.push({pass:o.pass,inst:o.inst,param:o.param,from:a(o.from),to:r})}return i}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const a=Math.max(1,Math.min(Me(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=a,this.clampSections();else if(a>n.bars&&t.grow){n.bars=a;const i=K(n);for(const o of this.session.passes)o.endTick<i&&o.repeat===void 0&&(o.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.start==="wait"?n.start="wait":t.start==="count-in"&&delete n.start,t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let a=null;if(t){const c=Math.max(1,Math.min(n.bars,Math.round(t.from))),d=Math.max(c,Math.min(n.bars,Math.round(t.to)));a=c===1&&d===n.bars?null:{from:c,to:d}}const i=J(n);if(i&&(i.from=a?a.from:1,i.to=a?a.to:n.bars),!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(a),this.changed();return}const o=this.beatNow(),{lap:r}=this.rec.place(o),l=this.rec.beatOf(Math.max(r+1,0),0);this.pending={loop:a,seam:l,...i?{section:i.id}:{}},this.replay?.rewind(l),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;songRec=null;songPlay=null;stopAt=null;songUndo=null;placed=new Set;get sections(){return this.session.song.sections??[]}queuedView(t){const n=this.pending;if(!n||n.section===void 0||n.section===this.session.song.section)return null;const a=t===null?0:Math.max(0,n.seam-t),i=Math.max(1e-6,n.seam-(n.queuedAt??n.seam-this.rec.lapTicks/z));return{section:n.section,inBars:Math.ceil(a/D-1e-9),inBeats:Math.ceil(a-1e-9),progress:Math.max(0,Math.min(1,1-a/i))}}ensureSections(){const t=this.session.song;if(t.sections?.length)return t.sections;const n=t.loop,a={id:"s1",name:"Section 1",from:n?n.from:1,to:n?n.to:t.bars,on:this.session.passes.map(i=>i.id)};t.sections=[a],t.section=a.id;for(const i of this.session.passes)this.placed.add(i.id);return t.sections}addSection(){const t=this.ensureSections();if(t.length>=Gt)return this.notice=`${Gt} sections is the most.`,this.changed(!1),null;const n=J(this.session.song)??t[0];if(!n)return null;let a=2;const i=n.name.replace(/\s+\d+$/,""),o=new Set(t.map(d=>d.name));for(;o.has(`${i} ${a}`);)a++;let r=t.length+1;const l=new Set(t.map(d=>d.id));for(;l.has(`s${r}`);)r++;const c={id:`s${r}`,name:`${i} ${a}`.slice(0,Jt),from:n.from,to:n.to,on:[...n.on]};return t.push(c),!this.jamming&&!this.wantJam?this.selectSection(c.id):this.changed(),c}renameSection(t,n){const a=this.sections.find(o=>o.id===t),i=n.replace(/\s+/g," ").trim().slice(0,Jt);return!a||!i||i===a.name?!1:(a.name=i,this.changed(),!0)}deleteSection(t){const n=this.session.song,a=n.sections;if(!a||a.length<2)return!1;const i=a.findIndex(o=>o.id===t);if(i<0)return!1;if(this.jamming&&n.section===t)return this.notice="Play another section first, or stop.",this.changed(!1),!1;if(this.pending?.section===t&&this.cancelQueued(),a.splice(i,1),n.arrangement&&(n.arrangement=ud(n.arrangement.filter(o=>o.section!==t)),n.arrangement.length||delete n.arrangement),n.section===t){const o=a[Math.min(i,a.length-1)];n.section=o.id,this.applyLoop(dt(o,n.bars))}return this.changed(),!0}selectSection(t,n=!1){const a=this.session.song,i=a.sections?.find(d=>d.id===t);if(!i)return;!n&&this.songPlay&&(this.songPlay=null,this.stopAt!==null&&(this.stopAt=null,this.replayChanged(!0)),this.notice="You took over from the song.");const o=dt(i,a.bars);if(!this.jamming||!this.transport.running){this.pending=null,a.section=t,this.applyLoop(o),this.changed();return}if(this.pending?.section===t&&!n){this.cancelQueued();return}if(a.section===t&&(!this.pending||this.pending.section===void 0)){this.changed(!1);return}if(a.section===t){this.cancelQueued();return}const r=this.beatNow(),{lap:l}=this.rec.place(r),c=this.rec.beatOf(Math.max(l+1,0),0);this.pending={loop:o,seam:c,section:t,queuedAt:r},this.replay?.rewind(c),this.changed(!1)}cancelQueued(){const t=this.pending;!t||t.section===void 0||(this.pending=null,this.replay?.rewind(t.seam),this.changed(!1))}selectSectionAt(t){const n=this.sections[t];return n?(this.selectSection(n.id),!0):!1}setSectionBars(t,n="repeat"){const a=this.session.song,i=J(a);if(!i||this.jamming||this.wantJam)return;const o=Math.max(1,Math.round(t)),r=Math.min(Me(a.bpm),i.from-1+o);r>a.bars&&(this.session.passes.length?this.setSong({bars:r,grow:n}):a.bars=r,a.bars<r)||(i.to=Math.max(i.from,r),this.applyLoop(dt(i,a.bars)),this.changed())}setInSection(t,n){const a=J(this.session.song);if(!a)return;const i=a.on.includes(t);n!==i&&(n?a.on.push(t):a.on.splice(a.on.indexOf(t),1),this.replayChanged(!1),this.changed())}clampSections(){const t=this.session.song;if(!t.sections)return;for(const a of t.sections)a.to=Math.min(a.to,t.bars),a.from=Math.min(a.from,a.to);const n=J(t);n&&this.applyLoop(dt(n,t.bars))}placeNewPasses(){const t=this.session.song,n=J(t);for(const a of this.session.passes)this.placed.has(a.id)||(this.placed.add(a.id),n&&(t.sections?.some(i=>i.on.includes(a.id))||n.on.push(a.id)))}get songRecording(){return this.songRec!==null}get songPlaying(){return this.songPlay!==null}toggleSongRecord(){if(this.songRec){this.endSongRecord(),this.changed();return}this.sections.length&&(this.songPlay=null,this.stopAt=null,this.songRec={items:[]},this.notice="",!this.jamming&&!this.wantJam?this.jam():this.changed(!1))}endSongRecord(){const t=this.songRec;if(this.songRec=null,!t?.items.length)return;const n=this.session.song;this.songUndo={arrangement:n.arrangement?n.arrangement.map(a=>({...a})):void 0},n.arrangement=t.items.slice(0,Xt),this.notice="The song is recorded."}undoSong(){const t=this.songUndo;if(!t)return;this.songUndo=null;const n=this.session.song;t.arrangement?n.arrangement=t.arrangement:delete n.arrangement,this.notice="The song before is back.",this.changed()}toggleSongPlay(){if(this.songPlay){this.stop();return}const t=this.session.song.arrangement,n=t?.[0];if(!(!t||!n)){if(this.songRec&&this.endSongRecord(),this.recOn=!1,this.songPlay={index:0,left:n.times,fresh:!0},this.stopAt=null,this.jamming||this.wantJam){this.session.song.section!==n.section?this.selectSection(n.section,!0):this.songPlay.fresh=!0,this.changed(!1);return}this.selectSection(n.section,!0),this.jam()}}lapBegan(){const t=this.session.song,n=t.section;if(this.songRec&&n){const o=this.songRec.items.at(-1);o&&o.section===n&&o.times<Qt?o.times++:this.songRec.items.length<Xt&&this.songRec.items.push({section:n,times:1})}const a=this.songPlay,i=t.arrangement;if(!(!a||!i)){if(a.fresh)a.fresh=!1;else if(a.left--,a.left<=0){a.index++;const o=i[a.index];if(!o){this.songPlay=null;return}a.left=o.times}if(a.left===1){const o=i[a.index+1],r=this.beatNow(),l=this.rec.beatOf(Math.max(this.rec.place(r).lap+1,0),0);o?o.section!==n&&this.selectSection(o.section,!0):(this.stopAt=l,this.replay?.rewind(l))}}}setStepTimes(t,n){const i=this.session.song.arrangement?.[t];!i||this.songPlay||(i.times=Math.max(1,Math.min(Qt,Math.round(n))),this.changed())}moveStep(t,n){const a=this.session.song.arrangement,i=t+n;!a||this.songPlay||!a[t]||!a[i]||([a[t],a[i]]=[a[i],a[t]],this.changed())}removeStep(t){const n=this.session.song,a=n.arrangement;!a?.[t]||this.songPlay||(a.splice(t,1),a.length||delete n.arrangement,this.changed())}pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const a=this.pass(t);if(a){if(n.name!==void 0){const i=n.name.replace(/\s+/g," ").trim().slice(0,Be);a.name=i||`Pass ${a.n}`}if(n.kept!==void 0&&(a.kept=n.kept),n.mute!==void 0&&(a.mute=n.mute),n.solo!==void 0&&(a.solo=n.solo),n.volume!==void 0&&(a.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&a.endTick<K(this.session.song)&&(a.repeat=n.repeat),n.shift!==void 0){const i=Math.max(-aa,Math.min(aa,Math.round(n.shift)||0));i?a.shift=i:delete a.shift}n.quantize===null?delete a.quantize:n.quantize&&(a.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(i=>i.id===t);if(n<0)return null;const[a]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),a?{pass:a,index:n}:null}restorePass(t,n){const a=this.session.passes;return a.length>=se||a.some(i=>i.id===t.id)?!1:(a.splice(Math.min(Math.max(0,n),a.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(a=>a.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){(this.jamming||this.waiting)&&this.stop();const t=Qi(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session.song.start&&(t.song.start=this.session.song.start),this.use(t),this.changed(),t}openSession(t){(this.jamming||this.waiting)&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,Ca);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.recOn=t.passes.length===0,this.notice="",this.placed=new Set(t.passes.map(n=>n.id)),this.songRec=null,this.songPlay=null,this.songUndo=null,this.stopAt=null}get passCount(){return this.session.passes.length}get maxPasses(){return se}dispose(){this.stopListening();for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}function ud(e){const t=[];for(const n of e){const a=t.at(-1);a&&a.section===n.section&&a.times+n.times<=Qt?a.times+=n.times:t.push({...n})}return t}const Na=e=>e==="off"?"Off":e;function hd(e){const t=e.quantize?.grid??"off";return`Song · ${t==="off"?"off":t}`}function Ls(e,t){if(e==="song"){const n=t.quantize?.grid??"off";return`Q · Song ${n==="off"?"off":n}`}return`Q ${Na(e)}`}function eo(e,t=!1){return[{value:"song",label:t?Ls("song",e):hd(e)},...ln.map(n=>({value:n,label:t?Ls(n,e):Na(n)}))]}const to=()=>cn.map(e=>({value:String(e),label:`${Math.round(e*100)}%`})),no=e=>e.quantize?.grid??"song",ao=e=>!!e.quantize&&e.quantize.grid!=="off";function so(e,t,n){return n==="song"||!ln.includes(n)?null:{grid:n,strength:e.quantize?.strength??t.quantize?.strength??1}}function io(e,t){const n=Number(t);return!e.quantize||!cn.includes(n)?null:{grid:e.quantize.grid,strength:n}}const md="netcomposer-looper",he="sessions",fd="netcomposer.looper.current.v1",gd=500;function bd(e){return new Promise((t,n)=>{const a=e.open(md,1);a.onupgradeneeded=()=>{a.result.objectStoreNames.contains(he)||a.result.createObjectStore(he,{keyPath:"id"})},a.onsuccess=()=>t(a.result),a.onerror=()=>n(a.error)})}function Cs(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function yd(e={}){const t=e.idb===void 0?Fs(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?Fs(()=>globalThis.localStorage):e.local,a=e.currentKey??fd;let i=null;const o=()=>t?(i??=bd(t),i):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=h=>{try{n?.setItem(a,h)}catch{}},u=async h=>{const b=(await o()).transaction(he,"readonly").objectStore(he).get(h);return new Promise((k,T)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>T(b.error)})},g=h=>{const f=c.then(async()=>{const b=(await o()).transaction(he,"readwrite");h(b.objectStore(he)),await Cs(b)});return c=f.catch(()=>{d++}),f.then(()=>!0,()=>!1)},m=async h=>{if(!t||!h)return null;try{const f=await u(h);return f===void 0?null:Fa(f)}catch{return null}},w=h=>{const f=structuredClone(h);c=c.then(async()=>{const b=(await o()).transaction(he,"readwrite");b.objectStore(he).put(f),await Cs(b),p(f.id)}).catch(()=>{d++})},x=()=>{l&&clearTimeout(l),l=null;const h=r;r=null,h&&w(h)};return{async load(){let h=null;try{h=n?.getItem(a)??null}catch{h=null}return h?m(h):null},get:m,setCurrent:p,async list(){if(!t)return[];x(),await c;let h=[];try{const b=(await o()).transaction(he,"readonly").objectStore(he).getAll();h=await new Promise((k,T)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>T(b.error)})}catch{return[]}return xd(h)},async rename(h,f){const y=oa(f);if(!t||!y)return!1;x(),await c;let b;try{b=await u(h)}catch{return!1}return!b||typeof b!="object"?!1:g(k=>k.put({...b,name:y}))},async remove(h){return t?(r?.id===h&&(l&&clearTimeout(l),l=null,r=null),g(f=>f.delete(h))):!1},async adopt(h){const f=await m(h.id);if(f&&"session"in f&&wd(f.session,h))return f.session;const y=f===null?structuredClone(h):{...structuredClone(h),id:Xi(),name:oa(`${h.name} (scene)`)||h.name};if(!await g(k=>k.put(y)))throw new Error("not saved");return y},save(h,f=!1){if(r=h,f){x();return}l||(l=setTimeout(x,gd))},async flush(){x(),await c},get failures(){return d}}}function oa(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,Ca):""}function wd(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function xd(e){const t=[];for(const a of e){if(!a||typeof a!="object")continue;const i=a;if(typeof i.id!="string"||!i.id)continue;const o=Fa(a);if("session"in o){const r=o.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=i.song;t.push({id:i.id,name:oa(i.name)||"Untitled song",passes:Array.isArray(i.passes)?i.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof i.updatedAt=="string"?i.updatedAt:"",error:o.error})}}const n=a=>{const i=Date.parse(a.updatedAt);return Number.isNaN(i)?0:i};return t.sort((a,i)=>n(i)-n(a))}const vd=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function $d(e,t=new Date){const n=new Date(e),a=n.getTime();if(Number.isNaN(a))return"";const i=t.getTime()-a;if(i>=0&&i<6e4)return"just now";if(i>=0&&i<36e5)return`${Math.floor(i/6e4)} min ago`;const o=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${o}`;if(l===1)return`yesterday ${o}`;const c=`${vd[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?c:`${c}, ${n.getFullYear()}`}function kd(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],a=$d(e.updatedAt,t);return a&&n.push(a),n.join(" · ")}function Fs(e){try{return e()??null}catch{return null}}const Ed=4e3;function Q(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))a.setAttribute(i,o);return a.append(...n),a}function Ad(e){const t=Q("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=Q("div",{class:"lp-songs-list",role:"none"}),a=Q("div",{class:"lp-songs-msg",role:"status"});a.hidden=!0;const i=Q("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,a,Q("div",{class:"lp-songs-sep",role:"separator"}),Q("div",{class:"lp-songs-note"},e.note)),o=Q("span",{class:"lp-songs-wrap"},t,i);let r=null,l=null;const c=()=>o.hasAttribute("data-open"),d=E=>{a.textContent=E,a.hidden=!E},p=()=>[...n.querySelectorAll(".lp-song-main")],u=E=>E?.closest(".lp-song")??null,g=E=>[...E.querySelectorAll('[role="menuitem"]')],m=(E,$="main")=>{((E?n.querySelector(`.lp-song[data-song="${CSS.escape(E)}"]`):null)?.querySelector(`.lp-song-${$}`)??p()[0]??t).focus({preventScroll:!0})},w=()=>{if(!r)return;clearTimeout(r.timer);const E=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);E&&(E.textContent="Delete",E.removeAttribute("data-lp-ask")),r=null};async function x(E){const $=await e.list(),M=e.openId(),F=e.now?.()??new Date;w(),l=null,n.replaceChildren(...$.map(S=>{const A=S.id===M,C=`${kd(S,F)}${A?" · open":""}${S.error?" · doesn't open":""}`,N=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${S.id}`,"aria-label":`${S.name}, ${C}`},Q("span",{class:"lp-song-name"},S.name),Q("span",{class:"lp-song-sub"},C));A&&N.setAttribute("aria-current","true"),N.addEventListener("click",()=>void h(S));const q=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${S.id}`,"aria-label":`Rename ${S.name}`},"Rename");q.addEventListener("click",()=>f(S)),S.error&&(q.disabled=!0);const H=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${S.id}`,"aria-label":`Delete ${S.name}`},"Delete");H.addEventListener("click",()=>void y(S,H));const R=Q("div",{class:"lp-song",role:"none","data-song":S.id},N,Q("span",{class:"lp-song-acts",role:"none"},q,H));return A&&R.setAttribute("data-open",""),R})),$.length||n.append(Q("div",{class:"lp-songs-empty"},"No songs yet.")),E&&m(E.id,E.part)}async function h(E){if(E.id===e.openId()){k(!0);return}const $=await e.open(E.id);if($){d($);return}k(!0)}function f(E){const $=n.querySelector(`.lp-song[data-song="${CSS.escape(E.id)}"]`),M=$?.querySelector(".lp-song-main"),F=M?.querySelector(".lp-song-name");if(!$||!M||!F)return;w(),l=E.id;const S=Q("input",{class:"lp-name-input lp-song-input",value:E.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${E.id}`});S.value=E.name;let A=!1;const C=async N=>{if(A)return;A=!0,l=null;const q=S.value.replace(/\s+/g," ").trim();N&&q&&q!==E.name&&await e.rename(E.id,q),await x({id:E.id,part:"rename"})};S.addEventListener("keydown",N=>{N.stopPropagation(),N.key==="Enter"?(N.preventDefault(),C(!0)):N.key==="Escape"&&(N.preventDefault(),C(!1))}),S.addEventListener("blur",()=>void C(!0)),$.setAttribute("data-renaming",""),$.insertBefore(S,M),S.focus(),S.select()}async function y(E,$){if(r?.id!==E.id){w(),$.textContent="Press again to delete",$.setAttribute("data-lp-ask",""),r={id:E.id,timer:setTimeout(w,Ed)};return}w();const M=p().findIndex(A=>u(A)?.dataset.song===E.id);await e.remove(E.id),await x();const F=p();(F[Math.min(Math.max(M,0),F.length-1)]??t).focus({preventScroll:!0})}async function b(){c()||(o.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",T,!0)),d(""),await x({id:e.openId()})}function k(E=!1){c()&&(w(),o.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",T,!0),d(""),E&&t.focus({preventScroll:!0}))}function T(E){o.contains(E.target)||k()}return t.addEventListener("click",()=>c()?k():void b()),t.addEventListener("keydown",E=>{(E.key==="ArrowDown"||E.key==="ArrowUp")&&(E.preventDefault(),b().then(()=>{const $=p();(E.key==="ArrowUp"?$[$.length-1]:$[0])?.focus({preventScroll:!0})}))}),i.addEventListener("keydown",E=>{if(l)return;const $=p(),M=document.activeElement,F=u(M),S=$.findIndex(C=>u(C)===F);let A;if(E.key==="ArrowDown")A=$[(S+1)%$.length];else if(E.key==="ArrowUp")A=$[(S-1+$.length)%$.length];else if(E.key==="Home")A=$[0];else if(E.key==="End")A=$[$.length-1];else if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(!F)return;const C=g(F).filter(H=>!H.disabled),N=C.indexOf(M),q=E.key==="ArrowRight"?1:-1;A=C[Math.min(C.length-1,Math.max(0,N+q))]}else if(E.key==="Escape"){E.preventDefault(),E.stopPropagation(),k(!0);return}else if(E.key==="Tab"){k(!1);return}else return;E.preventDefault(),A?.focus({preventScroll:!0})}),{el:o,button:t,open:b,close:k,isOpen:c,async refresh(){c()&&!l&&await x()}}}const oo=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let _e;function Sd(){if(_e!==void 0)return _e;_e=null;try{_e=oo()?.attach("looper",{instance:1})??null}catch{_e=null}return _e}function Md(){return oo()?.countIn??null}function Td(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const Ld="netcomposer.looper.hidden.v1",Cd=50;function v(e,t={},...n){const a=document.createElement(e);for(const[i,o]of Object.entries(t))o!==void 0&&a.setAttribute(i,o);for(const i of n)i!==null&&i!==!1&&a.append(i);return a}const B=e=>({[yt]:Ta(e)||void 0});function I(e,t,n){const a=v("button",{type:"button",...t},e);return a.addEventListener("click",n),a}function ke(e,t){return v("span",{class:"nc-label",...t?B(t):{}},e)}function ro(e,t,n,a,i,o=!1){const r=v("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=I(l.label,{role:"radio","aria-checked":String(l.value===a),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==a&&i(l.value)});c.disabled=o,r.append(c)}return r}function ra(e,t,n,a,i,o="lp-toggle"){return I(t,{class:o,"aria-pressed":String(n),"data-lp-id":e,...B(a)},i)}function za(e,...t){const n=document.activeElement,a=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(i=>!!i)),a&&e.querySelector(`[data-lp-id="${CSS.escape(a)}"]`)?.focus({preventScroll:!0})}function lo(e,t,n){const a=v("div",{class:"lp-body","data-lp-module":e}),i=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),o=Rc(i(),Ld),r=()=>{const l=o.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==a&&l.after(a)};return r(),{handle:o,mount:a,update(){o.update(i()),r()}}}const W=Sd(),te=yd({currentKey:W?.storageKey?.("netcomposer.looper.current.v1")}),Ve=await te.load();let co="",la;Ve&&"session"in Ve?la=Ve.session:(Ve&&"error"in Ve&&(co=`Your last song didn't open: ${Ve.error}. A new one is started.`),la=Qi(W?.studioTransport?.bpm()??120));function Fd(){let e=null;try{e=W?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,a=i=>{n.has(i)||(n.add(i),t.setTarget(i,{role:"chord",on:!0,layer:!0}))};return{send(i,o){a(i),t.send(o,i)},controls(i,o){a(i),t.sendControls(o,i)},laps(i){let o=[];try{o=(W?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{o=[]}for(const r of o)a(r),t.sendControls(i,r)},off(i){t.off(i===void 0?"stop":"restart",i)},release(i,o){n.has(i)&&t.release?.(o,i)},restart(){t.restart()}}}const L=new pd(la,{host:W,countIn:Md(),load:Td,now:zo,save:e=>te.save(e),sink:Fd()});L.notice=co;addEventListener("pagehide",()=>te.save(L.session,!0));let wt=null;const po=document.getElementById("app");po.classList.add("nc","nc-page");Nc();const uo=v("header",{class:"nc-page-hd"},v("div",{},v("h1",{class:"nc-page-title"},v("span",{class:"lp-brand"},"LUPA")," ",v("span",{class:"nc-page-sep"},"/")," LOOPER ",v("span",{class:"nc-page-sep"},"/")," ",v("span",{class:"nc-mono"},"01")),v("p",{class:"nc-page-sub"},"A TRIKI instrument.")),v("div",{class:"nc-page-actions"},qd(),I("New song",{class:"nc-page-action","data-lp-id":"new-song",...B("new-song")},()=>zd()))),ho=v("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),mo=v("footer",{class:"lp-foot lp-sub"},v("span",{class:"lp-notice",role:"status"}),v("span",{class:"lp-mono"},"netcomposer.looper.01"));po.append(uo,v("main",{class:"nc-page-body"},ho),mo);let Ue=null;function Nd(){return uo.querySelector('[data-lp-id="new-song"]')}function Ln(e){const t=Nd();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function zd(){if(L.passCount&&!Ue){Ln(!0),Ue=setTimeout(()=>{Ue=null,Ln(!1)},4e3);return}Ue&&clearTimeout(Ue),Ue=null,Ln(!1),fo(),L.notice="New song started. The last one stays in Songs.",Y()}function fo(){L.newSong(),je=null,ee="all"}function Dd(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function qd(){return wt=Ad({list:()=>te.list(),openId:()=>L.session.id,open:Ns,async rename(e,t){e===L.session.id?L.rename(t):await te.rename(e,t)},async remove(e){if(e===L.session.id){L.jamming&&L.stop(),await te.flush();const t=(await te.list()).find(a=>a.id!==e&&!a.error);(t?await Ns(t.id):"no song")&&fo(),L.notice="Song deleted."}await te.remove(e),Y()},note:W?`Songs save as you play, in this browser. Save the Studio’s scene (${Dd()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),wt.el}async function Ns(e){if(L.jamming)return"Stop jamming to open another song.";await te.flush();const t=await te.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(L.openSession(t.session),te.setCurrent(t.session.id),je=null,ee="all",L.notice=`“${t.session.name}” is open.`,Y(),null):"That song isn't in this browser any more."}function Pd(){wt?.button.setAttribute(yt,Ta("songs").replace("{name}",L.session.name))}const go=v("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),$e=W?.metronome,bo=kc({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round(($e?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>$e?.set({volume:e/100})});bo.el.setAttribute(yt,Ta("volume"));$e?.onChange(()=>Y());function Ze(e,t,n,a,i,o=!1,r){const l=v("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e,...r?B(r):{}});for(const c of n){const d=v("option",{value:c.value},c.label);c.value===a&&(d.selected=!0),l.append(d)}return l.disabled=o,l.addEventListener("change",()=>i(l.value)),v("span",{class:"lp-dd"},l)}let me=null;function Id(e){if(me===null)return null;const t=e.session.song,n=J(t),a=n?n.from-1+me:me,i=a*D*z,o=e.session.passes.filter(d=>d.endTick<i&&d.repeat===void 0),r=o.length?Math.max(...o.map(d=>Math.floor(i/d.endTick))):a/t.bars,l=d=>{const p=me;me=null,d&&p&&n?L.setSectionBars(p,d):d&&p&&L.setSong({bars:p,grow:d}),Y()},c=o.length;return v("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},v("span",{class:"lp-ask-title"},n?`Make ${n.name} ${me} bars? The song grows.`:`Grow to ${me} bars?`),v("span",{class:"lp-sub"},c?`${c===1?"A pass is":`${c} passes are`} shorter. Repeat ${c===1?"it":"them"} to fill the song, or play ${c===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),I(`Repeat ×${Math.max(2,Math.round(r))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>l("repeat")),I("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>l("once")),I("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>l(null)))}function Bd(e){const t=e.session.song,n=t.start==="wait",a=!e.startOn,i=a?v("span",{class:"lp-sub","data-lp-id":"start-sub"},"Play starts at once. Count-in and Wait apply when recording."):n?v("span",{class:"lp-sub","data-lp-id":"start-sub"},"Jam waits for the first sound from any instrument."):v("span",{class:"lp-sub lp-start-sub","data-lp-id":"start-sub"},t.countInBars?"One bar of clicks first. ":"No count-in: Pass 1 starts with the clock. ",I(t.countInBars?"Off":"On",{class:"lp-loop-off","data-lp-id":"count-in",...B("count-in")},()=>L.setSong({countInBars:t.countInBars?0:1})));return v("div",{class:"lp-field lp-start","data-lp-id":"start-field",...a?{"data-off":""}:{}},ke("Start",a?"start-off":"start"),ro("start","Start",[{value:"count-in",label:"Count-in"},{value:"wait",label:"Wait"}],n?"wait":"count-in",o=>L.setSong({start:o==="wait"?"wait":"count-in"}),a||e.jamming||e.waiting),i)}function Rd(e){const t=e.session.song,n=J(t),a=n?Qe(n):0,i=[1,2,4,8,16].filter(r=>n?n.from-1+r<=Me(t.bpm):r<=Me(t.bpm)&&(!e.locked||r>=t.bars)),o=t.quantize;za(go,v("h3",{class:"lp-section-title"},"Setup"),v("div",{class:"lp-field"},ke("Tempo","tempo"),v("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?v("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?v("span",{class:"lp-sub"},"Locked: the song has passes."):v("span",{class:"lp-sub"},"Follows the Studio.")),v("div",{class:"lp-field"},ke("Length","bars"),ro("bars","Bars",i.map(r=>({value:String(r),label:String(r)})),String(me??(n?a:t.bars)),r=>{const l=Number(r);n?e.locked&&n.from-1+l>t.bars?(me=l,Y()):L.setSectionBars(l):e.locked&&l>t.bars?(me=l,Y()):L.setSong({bars:l})},e.jamming),Id(e)??v("span",{class:"lp-sub","data-lp-id":"length-text"},n?`${a} ${a===1?"bar":"bars"} · ${Ji(a,t.bpm)} · ${n.name}`:`${t.bars} ${t.bars===1?"bar":"bars"} · ${Xc(t)}`)),Bd(e),$e?v("div",{class:"lp-row lp-toggles"},ra("metronome","Metronome",$e.prefs().on,"metronome",()=>$e.set({on:!$e.prefs().on}))):null,$e?bo.el:null,v("div",{class:"lp-pair"},v("label",{class:"lp-field"},ke("Quantize","quantize"),Ze("quantize","Quantize",ln.map(r=>({value:r,label:Na(r)})),o?.grid??"off",r=>L.setSong({quantize:r==="off"?null:{grid:r,strength:o?.strength??1}}))),v("label",{class:"lp-field"},ke("Strength","strength"),Ze("strength","Strength",cn.map(r=>({value:String(r),label:`${Math.round(r*100)}%`})),String(o?.strength??1),r=>o&&L.setSong({quantize:{grid:o.grid,strength:Number(r)}}),!o))))}const yo=lo("jam","Jam",()=>{const e=L.view(),t=e.session.song.loop,n=t?`loop ${et(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${L.passCount} / ${se} passes`});function et(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const jd="http://www.w3.org/2000/svg",O=(e,t)=>{const n=document.createElementNS(jd,e);for(const[a,i]of Object.entries(t))n.setAttribute(a,i);return n},xt=44,ca=2*Math.PI*xt,wo=O("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),xo=O("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(xt),"stroke-width":"3","stroke-dasharray":`0 ${ca}`,transform:"rotate(-90 50 50)"}),Bt=O("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"}),vo=O("circle",{class:"lp-ring-mark",cx:"50",cy:"6",r:"3.2"});wo.append(O("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(xt),"stroke-width":"1"}),xo,Bt,vo);function Ce(e=!1){return v("span",{class:"lp-dot","aria-hidden":"true",...e?{"data-armed":""}:{}})}function Te(e){const t=e.recIn;return t?t.bars?`${t.bars} bar${t.bars===1?"":"s"}`:`${t.beats} beat${t.beats===1?"":"s"}`:""}const zs=e=>e.phase==="armed"||e.record&&(e.phase==="idle"||e.phase==="waiting"||e.phase==="count-in"),$o=v("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Rt=v("span",{class:"lp-pass","data-lp-id":"pass"}),Od=v("div",{class:"lp-ring"},wo,v("div",{class:"lp-ring-mid"},$o,Rt));function ko(e){const t=e.lapPos??0;xo.setAttribute("stroke-dasharray",`${t*ca} ${ca}`);const n=t*2*Math.PI;Bt.setAttribute("cx",String(50+xt*Math.sin(n))),Bt.setAttribute("cy",String(50-xt*Math.cos(n))),Bt.style.visibility=e.lapPos===null?"hidden":"visible";const a=e.session.song.loop,i=J(e.session.song);$o.textContent=e.countIn!==null?String(e.countIn):i?e.sectionAt?`${e.sectionAt.bar} / ${Qe(i)}`:`– / ${Qe(i)}`:a?e.bar!==null?`${e.bar} · ${et(a)}`:et(a):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const o=i?e.queued?`→ ${Ge(e.session.song,e.queued.section).toUpperCase()}`:i.name.toUpperCase():null,r=o&&(e.phase==="playing"||e.phase==="idle"||e.queued)?o:e.phase==="waiting"?e.record?`WAITING · PASS ${e.nextPass}`:"WAITING":e.phase==="count-in"?"COUNT-IN":e.phase==="playing"?"PLAYING":e.phase==="armed"?e.recIn&&!e.recIn.bars?`IN ${e.recIn.beats}`:`IN ${Te(e).toUpperCase()}`:e.phase==="full"?`FULL · ${se} / ${se}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":e.record?`PASS ${e.nextPass}`:"PLAY",l=zs(e)&&e.phase!=="count-in",c=`${r}|${e.phase}|${l}`;Rt.dataset.key!==c&&(Rt.dataset.key=c,Rt.replaceChildren(...e.phase==="recording"?[Ce()]:l?[Ce(!0)]:[],r)),vo.style.visibility=zs(e)?"visible":"hidden"}function Hd(e){const t=v("div",{class:"nc-seg lp-mode",role:"radiogroup","aria-label":"Play or Record","data-lp-id":"mode"}),n=e.session.passes.length>=se,a=e.phase==="recording"||e.phase==="paused"||e.phase==="full",i=(o,r,l)=>{const c=v("button",{type:"button",role:"radio","aria-checked":String(o),"data-lp-id":`mode-${r}`,...B(r==="record"&&n&&!o?"mode-full":`mode-${r}`)},...l);return c.addEventListener("click",()=>L.setRecord(r==="record")),r==="record"&&n&&!o&&(c.disabled=!0),c};return t.append(i(!e.record,"play",["Play"]),i(e.record,"record",[...a&&e.record?[Ce()]:e.record?[Ce(!0)]:[],"Record"])),e.voice&&(e.voice.phase==="armed"||e.voice.phase==="recording")?v("div",{class:"lp-mode-box"},t,v("p",{class:"lp-mode-note","data-lp-id":"mode-note"},"For this loop only")):t}function _d(e){const t=(o,r)=>v("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},v("b",{},o),r?` ${r}`:""),n=e.session.song.start==="wait",a=`bar ${e.recBar}`,i=e.voice;return i?.phase==="recording"?t("Recording a voice pass from LUCY.","Back to Play by itself after this loop."):i?.phase==="armed"?t(`A voice pass from LUCY, in ${Te(e)||"a moment"}.`,"It records one loop, then Lupa is back in Play."):i?.phase==="starting"?t("A voice pass from LUCY.","Lupa counts in, then records one loop."):e.waiting?e.record?t("Play anything, on any instrument.",`Pass ${e.nextPass} starts on that beat. Press again to cancel.`):t("Play anything, on any instrument.","The loop starts on that beat. Press again to cancel."):e.jamming?e.phase==="playing"?t("Playing. Nothing is recorded.",`Shift+Space records from ${a}.`):e.phase==="armed"?t(`Recording from ${a}, in ${Te(e)}.`,"Press Record again to cancel."):e.phase==="recording"?t("Recording every lap.","Play (Shift+Space) stops recording now. This lap is kept."):null:e.session.passes.length?e.record?n?t("Record is on.",`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):t("Record is on.",e.session.song.countInBars?`Jam counts in, then Pass ${e.nextPass} records from ${a}.`:`Jam starts, and Pass ${e.nextPass} records from ${a}.`):t("Play.","Jam plays the loop at once. Nothing is recorded. Shift+Space turns Record on."):n?v("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):null}function Vd(e){const t=e.session.song.start==="wait",n=I(e.waiting?"WAITING":e.jamming?"STOP":"JAM",{class:e.waiting?"nc-btn lp-big lp-waiting":"nc-btn lp-big","data-lp-id":"jam",...B(e.waiting?"waiting":e.jamming?"stop":t&&e.startOn?"jam-wait":"jam"),...e.jamming||e.waiting?{}:{"data-jam":""},...e.waiting?{"aria-pressed":"true"}:{}},()=>L.toggle());n.disabled=!W;const a=I("UNDO",{class:"nc-btn","data-lp-id":"undo",...B("undo")},()=>L.undo());a.disabled=!e.lapHasNotes&&!L.passCount;const i=I("REDO",{class:"nc-btn","data-lp-id":"redo",...B("redo")},()=>L.redo());i.disabled=!e.canRedo,ko(e);const o=e.session.song.loop,r=e.pendingLoop,l=r!==void 0?v("p",{class:"lp-sub","data-lp-id":"loop-next"},r?`Loop ${et(r)} from the next lap.`:"Loop off from the next lap."):null,c=o&&r===void 0?v("div",{class:"lp-loop-line"},v("span",{},`Loop ${et(o)}`),I("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...B("loop-off")},()=>L.setLoop(null))):null;za(yo.mount,v("div",{class:"lp-jam-stack"},Od,Hd(e),n,v("div",{class:"lp-two"},a,i),c,l,W?_d(e):v("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),go)}const vt=lo("passes","Passes",()=>`${L.passCount} / ${se}`);let je=null,ee="all",Nt={at:0,bar:0};const Ud={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY","petra-rhythm":"PETRA","olive-bass":"OLIVE"},tt={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},nt=e=>e.split("#")[0]??e,Kd=e=>tt[nt(e)]?.noun[0]==="hit",Da=e=>e.kind===void 0||e.kind==="note";function Le(e){const[t=e,n]=e.split("#"),a=Ud[t]??t.toUpperCase();return n?`${a} ${n}`:a}function Wd(e,t){const n=new Map;for(const i of e.events)i.inst===t&&Da(i)&&i.name&&n.set(i.name,(n.get(i.name)??0)+1);const a=[...n].sort((i,o)=>o[1]-i[1]).map(([i])=>i);return a.length?a.length===1?a[0]:`${a[0]} +${a.length-1}`:""}function da(e,t){let n=0,a=0,i=0;for(const c of e.events)c.inst===t&&(c.kind==="slot"?a++:c.kind==="take"?i++:Da(c)&&n++);const[o,r]=tt[nt(t)]?.noun??["note","notes"],l=[];return i&&l.push(i===1?"voice":`${i} takes`),n&&l.push(`${n} ${n===1?o:r}`),a&&l.push(`${a} slot ${a===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Et=new Map,Yd=1;function dn(e,t){const n=t.bars,a=z,i=K(t),o=mt(e,t),r=ft(e,t),l=o.length>1?e.endTick:i,c=A=>r&&A+r>=l?A+r-l:A+r,d=t.loop,p=d?(d.from-1)*D*z:0,u=d?d.to*D*z:i,g=(A,C)=>(C>0?.45:1)*(A>=p-rn&&A<u?1:.35),m=1e3,w=34,x=O("svg",{class:"lp-strip",viewBox:`0 0 ${m} ${w}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&x.append(O("rect",{class:"lp-strip-loop",x:String(p/i*m),y:"0",width:String((u-p)/i*m),height:String(w)}));const h=n*D;for(let A=1;A<h;A++){const C=String(A*m/h);A%D!==0&&n>8||x.append(A%D===0?O("line",{class:n>8&&A%(4*D)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:C,x2:C,y1:"0",y2:String(w)}):O("line",{class:"lp-strip-beat",x1:C,x2:C,y1:String(w/2-2),y2:String(w/2+2)}))}const f=e.events.filter(Da),y=[],b=a/4*Yd,k=new Set(f.filter(A=>Kd(A.inst)).map(A=>A.inst)),T=new Map,E=[...new Set(f.filter(A=>k.has(A.inst)).map(A=>A.note))].sort((A,C)=>C-A);E.length>=2&&E.length<=4&&E.forEach((A,C)=>T.set(A,C));const $=f.filter(A=>!k.has(A.inst)).map(A=>A.note);let M=Math.min(...$)-2,F=Math.max(...$)+2;if(F-M<12){const A=(F+M)/2;M=A-6,F=A+6}for(const A of o)for(const C of f){const N=A+c(C.at);if(N>=i||C.at>=e.endTick)continue;const q=N/i*m,H=((.35+.65*C.vel)*g(N,A)).toFixed(2);if(k.has(C.inst)){const R=T.get(C.note);let V,P;if(R===void 0){const j=4+C.vel*9;V=w/2-j,P=w/2+j}else{const j=6+R*(w-12)/Math.max(1,T.size-1);V=j-3,P=j+3}x.append(O("line",{class:"lp-strip-hit",x1:q.toFixed(1),x2:q.toFixed(1),y1:V.toFixed(1),y2:P.toFixed(1),"stroke-opacity":H})),y.push(N/i,Math.min(1,(N+b)/i))}else{const R=Math.min(i,N+Math.max(1,C.len))/i*m,V=(4+(1-(C.note-M)/(F-M))*(w-8)).toFixed(1);x.append(O("line",{class:"lp-strip-note",x1:q.toFixed(1),x2:Math.max(q+.1,R-2).toFixed(1),y1:V,y2:V,"stroke-opacity":H})),y.push(N/i,Math.min(1,(N+Math.max(b,C.len))/i))}}const S=A=>r?[{base:A+r,lo:A,hi:A+l},{base:A+r-l,lo:A,hi:A+l}]:[{base:A,lo:A,hi:i}];for(const A of o)for(const C of S(A))for(const N of e.events){if(N.kind!=="take")continue;const q=C.base+N.at,H=Math.min(i,q+N.len,C.base+e.endTick,C.hi),R=Math.max(q,C.lo);if(R>=i||H<=R)continue;const V=R/i*m,P=H/i*m,j=N.peaks?.length?N.peaks:[.35,.35],U=Math.floor((R-q)/N.len*(j.length-1)),ye=Math.ceil((H-q)/N.len*(j.length-1)),de=j.slice(Math.max(0,U),Math.max(U+2,ye+1)),it=de.length>=2?de:[.35,.35],Oe=it.length,He=w/2,At=Fe=>Math.max(.6,Fe*(w/2-2)),Pa=it.map((Fe,ot)=>[V+(P-V)*ot/Math.max(1,Oe-1),At(Fe)]),Fo=Pa.map(([Fe,ot])=>`${Fe.toFixed(1)},${(He-ot).toFixed(1)}`),No=[...Pa].reverse().map(([Fe,ot])=>`${Fe.toFixed(1)},${(He+ot).toFixed(1)}`);x.append(O("path",{class:"lp-strip-voice",d:`M${Fo.join(" L")} L${No.join(" L")} Z`,opacity:g(R,A).toFixed(2)})),y.push(R/i,Math.min(1,(R+N.len)/i))}for(const A of o)for(const C of e.events){if(C.kind!=="slot"||A+c(C.at)>=i)continue;const N=((A+c(C.at))/i*m).toFixed(1);x.append(O("line",{class:"lp-strip-slot",x1:N,x2:N,y1:"0",y2:String(w)}))}if(e.endTick<i&&!e.repeat){const A=(c(e.endTick)/i*m).toFixed(1);x.append(O("line",{class:"lp-strip-end",x1:A,x2:A,y1:"8",y2:String(w-8)}))}return Et.set(e.id,Float32Array.from(y)),x}function Cn(e){if(e.length<=6)return e;const[t=e,n]=e.split(" ");return n?`${t.slice(0,6)} ${n.slice(0,3)}`:t.slice(0,3)}function Eo(e){const[t,n]=e;return t?n?e.length===2?`${Cn(t.label)} + ${Cn(n.label)}`:`${Cn(t.label)} + ${e.length-1}`:t.label:""}function Gd(e){const t=e.knobs??[],n=v("span",{class:"lp-knob-tag","aria-label":`Knobs: ${t.map(i=>i.label).join(", ")}`,...B("knob-pass")},Eo(t)),a=O("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return a.append(O("circle",{cx:"5",cy:"5",r:"4",fill:"none",stroke:"currentColor"}),O("line",{x1:"5",y1:"5",x2:"5",y2:"1.5",stroke:"currentColor"})),n.prepend(a),n}function Ao(){const e=v("span",{class:"lp-knob-tag lp-pattern-tag","data-lp-pattern":"",...B("pattern-pass")},"Pattern"),t=O("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return t.append(O("rect",{x:"0.5",y:"0.5",width:"4",height:"4",fill:"currentColor"}),O("rect",{x:"5.5",y:"0.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),O("rect",{x:"0.5",y:"5.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),O("rect",{x:"5.5",y:"5.5",width:"4",height:"4",fill:"currentColor"})),e.prepend(t),e}function Jd(e,t,n){const a=dn({...e,events:[]},t),i=1e3,o=34,r=K(t),l=mt(e,t),c=ft(e,t),d=l.length>1?e.endTick:r,p=m=>((1-m)*(o-4)+2).toFixed(1),u=m=>(m/r*i).toFixed(1);a.setAttribute("aria-label",`${Eo(e.knobs??[])} across the loop`),n&&a.append(O("rect",{class:"lp-strip-hand",x:(n.from*i).toFixed(1),y:"0",width:(Math.max(0,n.to-n.from)*i).toFixed(1),height:String(o)}));const g=[];if((e.knobs??[]).forEach((m,w)=>{const x=le(m),h=e.events.filter($=>$.kind==="param"&&le($)===x&&$.at<e.endTick),f=$=>c&&$+c>=d?$+c-d:$+c,y=$=>{let M=l.length>1?$-Math.floor($/d)*d:$;if(M-=c,M<0&&(M+=d),M>=e.endTick)return null;let F=m.base;for(const S of h){if(S.at>M)break;F=S.value}return F},b=new Set([0,r]);for(const $ of l){b.add($),b.add(Math.min(r,$+d)),b.add(Math.min(r,$+e.endTick)),b.add($+f(0));for(const M of h)b.add($+f(M.at))}const k=[...b].filter($=>$>=0&&$<=r).sort(($,M)=>$-M),T=[];let E=[];for(let $=0;$<k.length-1;$++){const M=k[$],F=k[$+1];if(F<=M)continue;const S=y(M);if(S===null){E.length&&T.push(E),E=[];continue}E.push([M,S],[F,S])}E.length&&T.push(E);for(const $ of T){if($.length<2)continue;const M=$.map(([F,S])=>`${u(F)},${p(S)}`).join(" ");w===0&&a.append(O("polygon",{class:"lp-strip-area",points:`${u($[0][0])},${o} ${M} ${u($.at(-1)[0])},${o}`})),a.append(O("polyline",{class:`lp-strip-curve${w?" lp-strip-curve-2":""}`,points:M}))}for(const $ of h)for(const M of l){const F=M+($.at+c)%d;g.push(F/r,Math.min(1,(F+z/4)/r))}}),e.endTick<r&&!e.repeat){const m=((c&&e.endTick+c>=d?e.endTick+c-d:e.endTick+c)/r*i).toFixed(1);a.append(O("line",{class:"lp-strip-end",x1:m,x2:m,y1:"8",y2:String(o-8)}))}return Et.set(e.id,Float32Array.from(g)),a}function zt(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const at={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function qa(e){const t=O("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(O("path",{d:e})),t}function an(e,t,n,a,i){const o=I("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...a},i);return o.append(qa(n)),o}let Ds=null;function Xd(e){je===e.id&&(je=null);const t=L.deletePass(e.id);if(!t)return;Ds?.close();const n=Lc({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>L.restorePass(t.pass,t.index),anchor:vt.mount});n.el.setAttribute("data-lp-id","delete-toast"),Ds=n}function Qd(e,t,n=null){const a=L.session.song,i=sa(e),o=D*a.ppq,r=je===e.id,l=[...new Set(e.instruments)],c=I("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(r)},()=>{je=r?null:e.id,Y()}),d=v("span",{class:"lp-pass-line"},v("span",{class:"lp-pass-title"},e.name));for(const b of l)d.append(v("span",{class:"lp-inst","data-inst":tt[nt(b)]?.token??""},Le(b)));const p=[];for(const b of l){const k=Wd(e,b);p.push(k?`${k} · ${da(e,b)}`:da(e,b))}l.length||p.push("Empty"),e.mute&&p.push("muted");const u=i?v("span",{class:"lp-pass-sub lp-knob-sub"},Gd(e),e.mute?v("span",{},"Muted"):null,n?v("span",{class:"lp-hand-note",...B("you-have-it")},"you have it"):null):e.pattern?v("span",{class:"lp-pass-sub lp-knob-sub"},v("span",{class:"lp-pass-sub-text"},p.join(" · ")),Ao()):v("span",{class:"lp-pass-sub"},p.join(" · "));c.append(v("span",{class:"lp-now","aria-hidden":"true"}),v("span",{class:"lp-pass-text"},d,u));const g=v("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...B("pass-volume")});g.value=String(Math.round(e.volume*100));const m=v("span",{class:"lp-db","data-lp-id":`db-${e.id}`},zt(e.volume));g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",zt(e.volume)),g.addEventListener("input",()=>{const b=Number(g.value)/100;m.textContent=zt(b),g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",zt(b)),L.editPass(e.id,{volume:b})});const w=v("div",{class:"lp-ms-pair"},ra(`mute-${e.id}`,"M",e.mute,"mute",()=>L.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),ra(`solo-${e.id}`,"S",e.solo,"solo",()=>L.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));w.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),w.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const x=an(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,at.star,{"aria-pressed":String(e.kept),...B("star")},()=>L.editPass(e.id,{kept:!e.kept})),h=an(`delete-${e.id}`,`Delete ${e.name}`,at.trash,B("delete"),()=>Xd(e)),f=v("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...r?{"data-open":""}:{}},c,v("div",{class:"lp-tools"},tp(e,a),np(e,a),w,v("div",{class:"lp-acts"},x,h)),v("div",{class:"lp-strip-box"},i?Jd(e,a,n):dn(e,a),v("span",{class:"lp-head","aria-hidden":"true"})),i?v("div",{class:"lp-play"},v("div",{class:"lp-q","data-none":"","aria-hidden":"true"}),v("div",{class:"lp-vol","data-knob":"","aria-hidden":"true"})):v("div",{class:"lp-play"},Zd(e,a),v("div",{class:"lp-vol"},g,m)));n&&f.setAttribute("data-hand",tt[nt(l[0]??"")]?.token??"");const y=J(a);if(y){const b=y.on.includes(e.id);f.setAttribute("data-sec",""),b||f.setAttribute("data-sec-off",""),f.prepend(I("",{class:"lp-sec-in",role:"checkbox","aria-checked":String(b),"aria-label":`${e.name} in ${y.name}`,"data-lp-id":`in-${e.id}`,...B("in-section")},()=>L.setInSection(e.id,!b)))}if(r){const b=new Set;for(const E of e.events)b.add(Math.floor(E.at/o));const k=v("div",{class:"lp-bars",style:`--lp-bars: ${a.bars}`});for(let E=0;E<a.bars;E++)k.append(v("span",b.has(E)?{"data-on":""}:{},String(E+1)));const T=v("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});T.addEventListener("change",()=>L.editPass(e.id,{name:T.value})),f.append(v("div",{class:"lp-sheet"},T,v("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),v("span",{class:"lp-sub"},i?`Moves ${l.map(Le).join(" and ")}'s ${(e.knobs??[]).map(E=>E.label).join(", ")}. Muted, they go back where they were.`:`Plays through ${l.map(Le).join(" and ")||"its instrument"}'s current sound.`),i?null:ep(e,a),k))}return f}function Zd(e,t){const a=[Ze(`pq-${e.id}`,`${e.name} quantize`,eo(t,!0),no(e),i=>L.editPass(e.id,{quantize:so(e,t,i)}),!1,"pass-quantize")];if(ao(e)&&e.quantize){const i=Ze(`ps-${e.id}`,`${e.name} strength`,to(),String(e.quantize.strength),o=>{const r=io(e,o);r&&L.editPass(e.id,{quantize:r})},!1,"pass-strength");a.push(i)}return v("div",{class:"lp-q",role:"group","aria-label":`${e.name} quantize`,...e.quantize?{"data-own":""}:{}},...a)}function ep(e,t){const n=ao(e)&&e.quantize?e.quantize:null;return v("div",{class:"lp-pair lp-sheet-q"},v("label",{class:"lp-field"},ke("Quantize","pass-quantize"),Ze(`sq-${e.id}`,`${e.name} quantize`,eo(t),no(e),a=>L.editPass(e.id,{quantize:so(e,t,a)}))),v("label",{class:"lp-field"},ke("Strength","pass-strength"),Ze(`ss-${e.id}`,`${e.name} strength`,to(),String(e.quantize?.strength??t.quantize?.strength??1),a=>{const i=io(e,a);i&&L.editPass(e.id,{quantize:i})},!n)))}function tp(e,t){const n=e.shift??0,a=Jc(e,t),i=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,o=d=>L.editPass(e.id,{shift:Math.max(-a,Math.min(a,n+d))}),r=an(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,at.earlier,n<=-a?{disabled:""}:{},()=>o(-1)),l=an(`shift-later-${e.id}`,`Move ${e.name} a bar later`,at.later,n>=a?{disabled:""}:{},()=>o(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return v("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${i(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...B("shift")},r,v("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function np(e,t){const n=K(t);if(e.endTick>=n)return v("span",{class:"lp-repeat-none","aria-hidden":"true"});const a=Math.ceil(n/e.endTick),i=!!e.repeat,o=Math.round(e.endTick/(D*z)),r=I(i?`×${a}`:"once",{class:"lp-repeat","aria-pressed":String(i),"aria-label":i?`${e.name} repeats every ${o} ${o===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...B("repeat")},()=>L.editPass(e.id,{repeat:!i}));return i&&r.prepend(qa(at.loop)),r}function ap(e){const t=e.session.song,n=t.bars,a=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,i=v("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...B("ruler")}),o=v("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let y=1;y<=n;y++){const b=v("span",a&&y>=a.from&&y<=a.to?{"data-in":""}:{},String(y));r.push(b),o.append(b)}const l=v("div",{class:"lp-ruler-lane"});for(let y=1;y<n;y++)l.append(v("span",{class:"lp-ruler-tick",style:`--lp-at: ${y}`}));const c=v("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=y=>{c.hidden=!y,y&&(c.style.setProperty("--lp-from",String(y.from-1)),c.style.setProperty("--lp-to",String(y.to))),r.forEach((b,k)=>{y&&k+1>=y.from&&k+1<=y.to?b.setAttribute("data-in",""):b.removeAttribute("data-in")})};d(a);const p=v("span",{class:"lp-ruler-hint",role:"status"}),u=J(t),g=u?`Drag across bars to set ${u.name}'s bars`:"Drag across bars to repeat them";let m;const w=y=>{p.textContent=y,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(m),m=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=g,p.hidden=!!t.loop},3e3)},x=y=>{const b=v("button",{type:"button",class:"lp-loop-handle","data-end":y,"aria-label":y==="from"?"Loop start":"Loop end","data-lp-id":`loop-${y}`});return b.addEventListener("keydown",k=>{const T=t.loop;if(!T||k.key!=="ArrowLeft"&&k.key!=="ArrowRight")return;k.preventDefault();const E=k.key==="ArrowLeft"?-1:1,$={...T};y==="from"?$.from=Math.max(1,Math.min(T.to,T.from+E)):$.to=Math.min(n,Math.max(T.from,T.to+E)),L.setLoop($)}),b.addEventListener("pointerdown",k=>{const T=a;T&&(k.stopPropagation(),f(k,E=>y==="from"?{from:Math.min(E,T.to),to:T.to}:{from:T.from,to:Math.max(E,T.from)}))}),b};c.append(x("from"),x("to"));const h=y=>{const b=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((y-b.left)/Math.max(1,b.width)*n)+1))},f=(y,b)=>{if(e.jamming&&!W){w("Stop jamming to change the loop");return}i.setPointerCapture?.(y.pointerId),i.setAttribute("data-dragging","");const k=h(y.clientX);let T=!1,E=b(k);d(E);const $=F=>{h(F.clientX)!==k&&(T=!0),E=b(h(F.clientX)),d(E)},M=()=>{i.removeEventListener("pointermove",$),i.removeEventListener("pointerup",M),i.removeEventListener("pointercancel",M),i.removeAttribute("data-dragging");for(const A of r)A.removeAttribute("data-hover");const F=performance.now();if(!T&&Nt.bar===k&&F-Nt.at<450){Nt={at:0,bar:0},L.setLoop(null);return}if(Nt=T?{at:0,bar:0}:{at:F,bar:k},E.from===1&&E.to===n&&!t.loop){d(void 0),w("That's the whole song. Pick fewer bars.");return}L.setLoop(E)};i.addEventListener("pointermove",$),i.addEventListener("pointerup",M),i.addEventListener("pointercancel",M)};return i.addEventListener("pointerdown",y=>{if(y.button!==0)return;const b=h(y.clientX);f(y,k=>({from:Math.min(b,k),to:Math.max(b,k)}))}),i.addEventListener("pointermove",y=>{if(i.hasAttribute("data-dragging"))return;const b=h(y.clientX);r.forEach((k,T)=>{T+1===b?k.setAttribute("data-hover",""):k.removeAttribute("data-hover")})}),i.addEventListener("pointerleave",()=>{for(const y of r)y.removeAttribute("data-hover")}),p.textContent=g,p.hidden=!!a||n<2,l.append(p,c),i.append(o,l),i}function sp(e){if(e.length<2)return null;const t=new Map;for(const o of e)for(const r of new Set(o.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(o=>o.kept).length;ee!=="all"&&ee!=="starred"&&!t.has(ee)&&(ee="all"),ee==="starred"&&!n&&(ee="all");const a=(o,r,l,c={})=>{const d=I("",{class:"lp-chip","aria-pressed":String(ee===o),"data-lp-id":`filter-${o}`,...c},()=>{ee=ee===o?"all":o,Y()});return d.append(r,v("span",{class:"lp-chip-n"},String(l))),d},i=v("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},a("all","All",e.length));for(const[o,r]of[...t].sort((l,c)=>Le(l[0]).localeCompare(Le(c[0]))))i.append(a(o,Le(o),r,{"data-inst":tt[nt(o)]?.token??""}));return n&&i.append(a("starred",qa(at.star),n,{"aria-label":"Starred"})),i}function ip(e,t){const n=`Pass ${e.n}`,a={id:`live-${e.inst}`,n:e.n,name:n,endTick:K(t),instruments:[e.inst],events:e.events};return v("div",{class:"lp-pass-row lp-live","data-live":"","data-live-pattern":e.inst},v("span",{class:"lp-pass-name"},v("span",{class:"lp-dot","aria-hidden":"true"}),v("span",{class:"lp-pass-text"},v("span",{class:"lp-pass-line"},v("span",{class:"lp-pass-title"},n),v("span",{class:"lp-inst","data-inst":tt[nt(e.inst)]?.token??""},Le(e.inst))),v("span",{class:"lp-pass-sub lp-knob-sub"},v("span",{class:"lp-pass-sub-text"},`Recording · ${da(a,e.inst)}`),Ao()))),v("div",{class:"lp-strip-box"},dn(a,t),v("span",{class:"lp-head","aria-hidden":"true"})))}function op(e,t){const n=t.session.song,a=`Pass ${e.n}`,i=K(n),o=e.peaks.length/128,r=Math.max(0,Math.min(1,e.pos??0)),l=Math.max(1,Math.round(e.ticks*Math.min(r||o,o||r))),c={id:"live-voice",n:e.n,name:a,endTick:i,instruments:[e.lucy],events:e.peaks.length>1?[{kind:"take",inst:e.lucy,take:"live",at:e.from,len:l,peaks:e.peaks}]:[]},d=dn(c,n);if(Et.delete(c.id),e.pos!==null&&e.pos<1){const u=((e.from+e.ticks*e.pos)/i*1e3).toFixed(1);d.append(O("line",{class:"lp-strip-rec",x1:u,x2:u,y1:"0",y2:"34"}))}const p=e.phase==="armed"?`Next loop · in ${Te(t)||"a moment"}`:e.phase==="after"?"Saving the take…":`Recording… bar ${e.bar??1} of ${e.bars}`;return v("div",{class:"lp-pass-row lp-live lp-live-voice","data-live":"","data-live-pattern":"lucy","data-lp-id":"voice-row"},v("span",{class:"lp-pass-name"},e.phase==="armed"?Ce(!0):v("span",{class:"lp-dot","aria-hidden":"true"}),v("span",{class:"lp-pass-text"},v("span",{class:"lp-pass-line"},v("span",{class:"lp-pass-title"},a),v("span",{class:"lp-inst","data-inst":"lucy"},Le(e.lucy))),v("span",{class:"lp-pass-sub","data-lp-id":"voice-sub"},p))),v("div",{class:"lp-strip-box"},d))}function qs(){try{return(W?.notesTargets?.()??[]).filter(e=>e.type==="lucy"&&e.takesNotes).map(e=>e.instance)}catch{return[]}}let jt=!1;async function rp(){if(L.voicing){L.cancelVoice(!0);return}if(jt||!W)return;let e=qs()[0];if(!e){let t=null;try{t=W.addInstrument?.({v:1,type:"lucy"})??null}catch{t=null}if(!t){L.notice="Add Audio (LUCY) to the Studio for a voice pass.",Y();return}jt=!0,L.notice="LUCY is added. Allow the mic when it asks.",Y();try{W.showInstance?.(t)}catch{}const n=t,a=await new Promise(i=>{const o=Date.now()+2e4,r=()=>{qs().includes(n)?i(!0):Date.now()>o?i(!1):setTimeout(r,100)};r()});if(jt=!1,!a){L.notice="LUCY didn't open in time. Press + Voice again.",Y();return}e=n}L.voicePass(e)}function lp(e){if(!W)return null;const t=e.voice,n=!!t,a=t?.phase==="recording"?"Recording voice":t?.phase==="after"?"Saving voice":t?"Voice next loop":"Voice",i=I("",{class:"lp-voice","data-lp-id":"voice",...n?{"data-busy":""}:{},"aria-label":n?"Cancel the voice pass":"Record a voice pass: the next loop from LUCY's mic",...B(n?"voice-busy":"voice")},()=>void rp());return i.append(...t?.phase==="recording"?[Ce()]:t&&t.phase!=="after"?[Ce(!0)]:["+ "],a),(t?.phase==="after"||jt)&&(i.disabled=!0),v("div",{class:"lp-voice-box"},i,v("div",{class:"lp-voice-help"},t&&t.phase!=="after"?"Press to cancel":"Next loop from LUCY's mic"))}const So="lupa-sections";let ze=va().get(So)??!1,ue=null;const Ge=(e,t)=>e.sections?.find(n=>n.id===t)?.name??"",st=(e,t,n=`${t}s`)=>`${e} ${e===1?t:n}`;function cp(e){const t=e.session.song,n=t.sections??[];if(!n.length)return"One section";const a=J(t),i=[];return e.songRec?i.push("Recording song"):e.songPlay&&i.push("Playing song"),a&&i.push(a.name),e.queued?i.push(`next ${Ge(t,e.queued.section)} in ${Mo(e.queued)}`):!e.songRec&&!e.songPlay&&i.push(st(n.length,"section")),i.join(" · ")}function Mo(e){return e.inBars>1?`${e.inBars} bars`:st(Math.max(1,e.inBeats),"beat")}function dp(e,t,n){const i=e.session.song.section===t.id,o=e.queued?.section===t.id,r=Qe(t),l=t.on.filter(u=>e.session.passes.some(g=>g.id===u)).length,c=o?`Next · in ${Mo(e.queued)}`:i&&e.sectionAt?`Bar ${e.sectionAt.bar} of ${r} · ${l} on`:`${st(r,"bar")} · ${l} on`,d=I("",{class:"lp-sec-tile","data-lp-id":`section-${t.id}`,"aria-pressed":String(i),"aria-label":`${t.name}, ${c}`,...o?{"data-queued":""}:{},...B("section-tile")},()=>L.selectSection(t.id));d.append(v("span",{class:"lp-sec-key","aria-hidden":"true"},String(n+1)),v("span",{class:"lp-sec-name"},t.name),v("span",{class:"lp-sec-meta","data-lp-id":`section-meta-${t.id}`},c));const p=o?e.queued?.progress:i&&e.sectionAt?e.sectionAt.pos:null;return p!=null&&d.append(v("span",{class:"lp-sec-prog","aria-hidden":"true"},v("i",{style:`width: ${Math.round(p*100)}%`}))),d}function pp(e){const t=e.session.song,n=J(t);if(!n||e.jamming)return null;const a=v("input",{class:"lp-sec-input",type:"text",value:n.name,maxlength:"24","aria-label":"Section name","data-lp-id":"section-name",...B("section-name")}),i=()=>{L.renameSection(n.id,a.value)||(a.value=n.name)};a.addEventListener("change",i),a.addEventListener("keydown",r=>{r.key==="Enter"&&a.blur(),r.key==="Escape"&&(a.value=n.name,a.blur())});const o=I("Delete section",{class:"lp-link","data-lp-id":"delete-section",...B("delete-section")},()=>L.deleteSection(n.id));return o.disabled=(t.sections?.length??0)<2,v("div",{class:"lp-sec-edit"},ke("Name"),a,o,v("span",{class:"lp-sub"},"Length is in Setup."))}function up(e){const t=e.session.song,n=t.arrangement??[],a=v("div",{class:"lp-perf-hd"},v("h4",{class:"lp-sec-title"},"Song")),i=v("div",{class:"lp-perf-steps","data-lp-id":"song-steps"}),o=v("div",{class:"lp-perf","data-lp-id":"song"},a),r=(w,x,h={},f=null)=>{const y=I("",{class:"lp-perf-step","data-lp-id":`step-${x}`,...B("song-step"),...h},()=>{h["data-live"]!==void 0||e.songPlay||(ue=ue===x?null:x,Y())});return y.append(v("span",{class:"lp-perf-n"},String(x+1)),v("span",{},Ge(t,w.section)),v("span",{class:"lp-perf-x"},`×${w.times}`)),f!==null&&y.append(v("span",{class:"lp-sec-prog","aria-hidden":"true"},v("i",{style:`width: ${Math.round(f*100)}%`}))),y};if(e.songRec)return a.append(v("span",{class:"lp-perf-status","data-lp-id":"song-status"},v("span",{class:"lp-rec-dot","aria-hidden":"true"}),"Recording song"),v("span",{class:"lp-sub lp-perf-hint"},"Keep playing sections. Stop ends the song."),I("Stop",{class:"lp-perf-btn","data-solid":"","data-lp-id":"song-record",...B("song-record")},()=>L.toggleSongRecord())),e.songRec.forEach((w,x)=>i.append(r(w,x,x===(e.songRec?.length??0)-1?{"data-live":""}:{},null))),e.songRec.length||i.append(v("span",{class:"lp-sub"},"The first step starts at the next bar 1.")),o.append(i),o;const l=Gc(t),c=n.length?`${st(l,"bar")} · ${Ji(l,t.bpm)}`:"";if(!n.length){const w=v("span",{class:"lp-sub lp-perf-hint"});return w.append("Press ",v("b",{},"Record song"),", then play your sections. What you play becomes the song."),a.append(w,I("Record song",{class:"lp-perf-btn","data-lp-id":"song-record",...B("song-record")},()=>L.toggleSongRecord())),a.lastElementChild?.prepend(v("span",{class:"lp-rec-dot","aria-hidden":"true"})),o}const d=e.songPlay;a.append(v("span",{class:"lp-perf-status","data-lp-id":"song-status"},d?`Playing song · ${Ge(t,n[d.index]?.section)}, ${d.lap} of ${n[d.index]?.times??1}`:`${st(n.length,"step")} · ${c}`),v("span",{class:"lp-sub lp-perf-hint"},d?"Hands off: it plays to the end, then stops.":"Plays hands-free. Record again for a new take."));const p=I(d?"Stop":"Play song",{class:"lp-perf-btn","data-solid":"","data-lp-id":"song-play",...B("song-play")},()=>L.toggleSongPlay());p.prepend(v("span",{class:d?"lp-stop-mark":"lp-play-mark","aria-hidden":"true"}));const u=I("Record again",{class:"lp-perf-btn","data-quiet":"","data-lp-id":"song-record",...B("song-record")},()=>L.toggleSongRecord());u.prepend(v("span",{class:"lp-rec-dot","aria-hidden":"true"})),a.append(p,u),e.canUndoSong&&!d&&a.append(I("Undo",{class:"lp-link","data-lp-id":"song-undo",...B("song-undo")},()=>L.undoSong())),ue!==null&&(ue>=n.length||d)&&(ue=null),n.forEach((w,x)=>{const h=d?.index===x,f=h&&e.sectionAt?((d?.lap??1)-1+e.sectionAt.pos)/w.times:null;i.append(r(w,x,h?{"data-now":""}:ue===x?{"data-open":""}:{},f))}),o.append(i);const g=ue,m=g!==null?n[g]:void 0;if(g!==null&&m){const w=v("span",{class:"lp-step-times"},I("−",{"aria-label":"Fewer times","data-lp-id":"step-fewer"},()=>L.setStepTimes(g,m.times-1)),v("span",{class:"lp-mono"},`×${m.times}`),I("+",{"aria-label":"More times","data-lp-id":"step-more"},()=>L.setStepTimes(g,m.times+1))),x=I("◀ Earlier",{class:"lp-link","data-lp-id":"step-earlier"},()=>{L.moveStep(g,-1),ue=g-1,Y()});x.disabled=g===0;const h=I("Later ▶",{class:"lp-link","data-lp-id":"step-later"},()=>{L.moveStep(g,1),ue=g+1,Y()});h.disabled=g===n.length-1,o.append(v("div",{class:"lp-step-edit","data-lp-id":"step-edit"},v("span",{},`${g+1} · ${Ge(t,m.section)}`),w,x,h,I("Remove",{class:"lp-link","data-lp-id":"step-remove"},()=>{ue=null,L.removeStep(g)}),v("span",{class:"lp-mono lp-sub lp-perf-total"},c)))}else i.append(v("span",{class:"lp-mono lp-sub lp-perf-total"},c));return o}function hp(e){const t=e.session.song,n=t.sections??[],a=v("div",{class:"nc-group lp-sections","data-lp-id":"sections","data-nc-open":String(ze)}),i=I("",{class:"nc-group-toggle",id:"lp-sections-toggle","aria-expanded":String(ze),"aria-controls":"lp-sections-body","data-lp-id":"sections-toggle",...B("sections")},()=>{ze=!ze,bi(globalThis.localStorage??null,So,ze),Y()});if(i.append(v("span",{class:"nc-group-title"},"Sections"),v("span",{class:"nc-group-summary","data-lp-id":"sections-summary"},cp(e)),v("span",{class:"nc-group-mark","aria-hidden":"true"},ze?"−":"+")),a.append(i),!ze)return a;const o=v("div",{class:"nc-group-body lp-sections-body",id:"lp-sections-body",role:"group","aria-labelledby":"lp-sections-toggle"}),r=v("p",{class:"lp-sub lp-sec-hint","data-lp-id":"sections-hint"});n.length?e.queued?r.append(v("b",{},Ge(t,e.queued.section)),` starts when ${J(t)?.name??"this one"} ends. Tap it again to cancel.`):e.songPlay?r.append("The song is choosing sections. Tap one to take over."):r.append("Tap a section (or press 1–9) to play it next. It switches when the loop ends."):r.append("Build a song from parts: ",v("b",{},"+ Section")," copies this one. Then pick which passes play in each, and tap (or press 1–9) to switch at the end of the loop.");const l=v("div",{class:"lp-sec-tiles","data-lp-id":"section-tiles"});(n.length?n:[{id:"",name:"Section 1",from:t.loop?.from??1,to:t.loop?.to??t.bars,on:e.session.passes.map(u=>u.id)}]).forEach((u,g)=>{if(u.id)l.append(dp(e,u,g));else{const m=v("div",{class:"lp-sec-tile","aria-pressed":"true","data-lp-id":"section-implicit"},v("span",{class:"lp-sec-key","aria-hidden":"true"},"1"),v("span",{class:"lp-sec-name"},u.name),v("span",{class:"lp-sec-meta"},`${st(Qe(u),"bar")} · all passes`));l.append(m)}});const d=I("+ Section",{class:"lp-sec-add","data-lp-id":"add-section",...B("add-section")},()=>{L.addSection()});d.disabled=n.length>=9,l.append(d),o.append(r,l);const p=pp(e);return p&&o.append(p),n.length&&o.append(up(e)),a.append(o),a}function mp(e){const t=e.session.passes,n=t.some(x=>x.solo),a=t.filter(x=>ee==="all"?!0:ee==="starred"?x.kept:x.instruments.includes(ee)),i=v("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&i.append(v("div",{class:"lp-pass-head"},ap(e)));const o=e.voice;if(o&&(o.phase==="recording"||o.phase==="after"||o.phase==="armed")?i.append(op(o,e)):e.phase==="recording"&&(e.lapHasNotes||!e.livePatterns.length)&&i.append(v("div",{class:"lp-pass-row lp-live","data-live":""},v("span",{class:"lp-pass-name"},v("span",{class:"lp-dot","aria-hidden":"true"}),v("span",{class:"lp-pass-text"},v("span",{class:"lp-pass-title"},`Pass ${e.nextPass+e.livePatterns.length}`),v("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),e.phase==="recording")for(const x of[...e.livePatterns].reverse())i.append(ip(x,e.session.song));const r=o?null:e.phase==="armed"?`Recording from bar ${e.recBar} · in ${Te(e)}`:e.record&&t.length&&(e.phase==="idle"||e.phase==="waiting")?e.session.song.start==="wait"?"Records from the first sound":e.session.song.countInBars?`Records from bar ${e.recBar} after the count-in`:`Records from bar ${e.recBar}`:e.record&&t.length&&e.phase==="count-in"?`Records from bar ${e.recBar} after the count-in`:null;r&&i.append(v("div",{class:"lp-pass-row lp-live","data-live":"","data-armed":""},v("span",{class:"lp-pass-name"},Ce(!0),v("span",{class:"lp-pass-text"},v("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),v("span",{class:"lp-pass-sub","data-lp-id":"armed-text"},r))))),Et.clear();const l=new Map;for(const x of e.hands){const h=l.get(x.pass);l.set(x.pass,h?{from:Math.min(h.from,x.from),to:Math.max(h.to,x.to)}:x)}for(const x of[...a].reverse())i.append(Qd(x,n,l.get(x.id)??null));!t.length&&e.phase!=="recording"?i.append(v("p",{class:"lp-sub","data-lp-id":"passes-empty"},e.waiting?"Waiting for the first sound.":"No passes yet. Press Jam (or Space) and play.")):t.length&&!a.length&&i.append(v("p",{class:"lp-sub"},"No passes here."));const c=t.filter(x=>!x.kept).length,d=I(`CLEAR UNSTARRED${c?` (${c})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...B("clear-unkept")},()=>L.clearUnkept());d.disabled=!c;const p=!!e.session.song.sections?.length,u=J(e.session.song);za(vt.mount,hp(e),v("div",{class:"lp-chiprow"},sp(t)??v("span"),lp(e)),p&&u&&t.length?v("p",{class:"lp-sub lp-sec-note","data-lp-id":"section-note"},"Checked passes play in ",v("b",{},u.name),`. A pass you record now is only in ${u.name}.`):null,i,t.length?v("div",{class:"lp-between"},v("span",{class:"lp-row"},d,v("span",{class:"lp-sub"},"Starred passes stay.")),v("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${se}`)):null),pt="";const g=vt.mount.querySelector('[data-lp-id="section-tiles"]'),m=g?.querySelector(".lp-sec-tile[data-queued]")??g?.querySelector('.lp-sec-tile[aria-pressed="true"]'),w=m?.dataset.lpId??"";g&&m&&g.scrollWidth>g.clientWidth&&(w!==Ps&&(Ps=w,Fn=Math.max(0,m.offsetLeft+m.offsetWidth-g.clientWidth+8)),g.scrollLeft=Fn,g.addEventListener("scroll",()=>{Fn=g.scrollLeft}))}let Ps="",Fn=0,pt="";function fp(e){const t=vt.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),pt){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");pt=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const a=e.session.passes.some(l=>l.solo),i=[];for(const l of e.session.passes){if(l.mute||a&&!l.solo)continue;const c=Et.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){i.push(l.id);break}}}const o=i.join("|");if(o===pt)return;pt=o;const r=new Set(i);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const To=[yo,vt];jc(ho,To.map(e=>e.handle),"adjacent");let Is="";function Lo(e){const t=e.session.song.loop,n=e.bar===null?"":t?`Bar ${e.bar} · loop ${et(t)}`:`Bar ${e.bar} / ${e.session.song.bars}`,a=e.phase==="waiting"?"Lupa · waiting for the first sound":e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.phase==="playing"?`Lupa · Play · ${n}`:e.phase==="armed"?e.voice?`Lupa · voice pass in ${Te(e)}`:`Lupa · Rec from bar ${e.recBar} · in ${Te(e)}`:`Lupa · ${n} · Pass ${e.voice?.n??e.nextPass}`:null,i=a===null?null:e.phase==="armed"?"armed":e.phase==="recording"?"rec":null,o=`${a}|${e.phase}|${i}`;if(o!==Is){Is=o;try{W?.readout?.(a,i?{dot:i}:void 0),W?.chip?.(e.waiting?{text:"Waiting"}:e.jamming?e.phase==="playing"?{text:e.bar!==null?`Play · bar ${e.bar}`:"Play"}:e.phase==="armed"?{text:`Rec in ${Te(e)}`,armed:!0}:{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:L.passCount?{text:`${L.passCount} passes`}:null)}catch{}}}function Y(){const e=L.view();Rd(e),Vd(e),mp(e);for(const n of To)n.update();const t=mo.querySelector(".lp-notice");t&&(t.textContent=e.notice),Pd(),Lo(e)}L.onChange(Y);W?.playKeys?.(Array.from({length:9},(e,t)=>`Digit${t+1}`));document.addEventListener("keydown",e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.repeat)return;const t=/^Digit([1-9])$/.exec(e.code);if(!t||!L.sections.length)return;const n=e.target;n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||n.isContentEditable)||L.selectSectionAt(Number(t[1])-1)&&e.preventDefault()});document.addEventListener("keydown",e=>{if(e.code!=="Space"||!e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||(e.preventDefault(),e.repeat||L.toggleRecord())});setInterval(()=>{L.tick()&&Y(),L.jamming||L.syncTempo()},Cd);function Co(){const e=L.view();(e.jamming||e.waiting)&&(ko(e),Lo(e)),fp(e),requestAnimationFrame(Co)}requestAnimationFrame(Co);Y();W?.providePreset?.({format:"nc-song-looper",version:La,get:()=>structuredClone(L.session),async set(e){const t=Fa(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;L.jamming&&L.stop(),await te.flush();const n=await te.adopt(t.session);L.openSession(n),te.setCurrent(n.id),je=null,ee="all",L.notice=`“${n.name}” is open, from the Studio’s scene.`,Y(),wt?.refresh()}});window.__looper={looper:L,store:te,songs:()=>wt,view:()=>L.view(),get hosted(){return!!W}};
