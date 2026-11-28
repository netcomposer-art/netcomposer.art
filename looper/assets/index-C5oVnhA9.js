(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function _i(){return(performance.timeOrigin+performance.now())/1e3}var Vi="nc-ui",Ui={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},ga={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Vt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Wi={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ae={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},Ki={light:{color:Ui.color,semantic:ga,component:Vt,runtime:Wi},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},In=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],dt=e=>`--${Vi}-${e}`,Us="data-nc-theme",Ha="nc-ui-theme-change",Yi="(prefers-color-scheme: dark)",ba=e=>e?.documentElement??null,Ws=e=>e?.defaultView?.matchMedia?.(Yi)??null,Gi=e=>e==="light"||e==="dark"?e:"system";function Ji(e=globalThis.document){return Gi(ba(e)?.getAttribute(Us))}function Bn(e=globalThis.document){let t=Ji(e);return t!=="system"?t:Ws(e)?.matches?"dark":"light"}var Ks="data-nc-skin",Xi=(In.find(e=>e.default)??In[0])?.id??"prussian",Qi=e=>In.some(t=>t.id===e)?e:Xi;function Zi(e=globalThis.document){return Qi(ba(e)?.getAttribute(Ks))}function Ys(e,t=globalThis.document){let n=ba(t);if(!n)return()=>{};let a=()=>`${Bn(t)} ${Zi(t)}`,o=a(),i=()=>{let d=a();d!==o&&(o=d,e(Bn(t)))},r=t.defaultView?.MutationObserver,l=r?new r(i):null;l?.observe(n,{attributes:!0,attributeFilter:[Us,Ks]});let c=Ws(t);return c?.addEventListener?.("change",i),t.addEventListener(Ha,i),()=>{l?.disconnect(),c?.removeEventListener?.("change",i),t.removeEventListener(Ha,i)}}var Rn=ga["label-on-fill-dark"],_a=ga["label-on-fill-light"],er=Ae["label-min-contrast"],tr=/^#[0-9a-f]{6}$/i,nr=e=>typeof e=="string"&&tr.test(e),qt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Va(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let a=t*Math.min(n,1-n),o=i=>{let r=(i+e/30)%12;return n-a*Math.max(-1,Math.min(r-3,9-r,1))};return`#${qt(o(0)*255)}${qt(o(8)*255)}${qt(o(4)*255)}`}function Gs(e){let[t,n,a]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),o=Math.max(t,n,a),i=Math.min(t,n,a),r=(o+i)/2,l=o-i;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((o===t?60*((n-a)/l%6):o===n?60*((a-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function Ua(e){let[t,n,a]=[1,3,5].map(o=>{let i=parseInt(e.slice(o,o+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*a}function jn(e,t){let[n,a]=[Ua(e),Ua(t)].sort((o,i)=>i-o);return(n+.05)/(a+.05)}var Ut=e=>jn(e,Rn)>=jn(e,_a)?Rn:_a;function Js(e,t,n,a=er){let o=Va(e,t,n),i=Ut(o)===Rn?1:-1;for(let r=0;r<40&&jn(o,Ut(o))<a;r++)n+=i*.01,o=Va(e,t,n);return o}function ar(e){let{h:t,s:n}=Gs(e),a=Js(t,Math.min(n,Ae["surprise-on-max-saturation"]),Ae["surprise-on-lightness"]);return{fill:e,ink:Ut(e),on:a,onInk:Ut(a)}}var sr=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function or(e,t=Math.random){let[n,a]=Ae["surprise-saturation"],[o,i]=Ae["surprise-lightness"],r=Ae["surprise-min-hue-gap"],l=nr(e)?Gs(e).h:null,c=t()*360;return l!==null&&sr(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),Js(c,n+t()*(a-n),o+t()*(i-o))}function ir(e){if(!e)return null;let t=ar(e);return{[dt("surprise-fill")]:t.fill,[dt("surprise-ink")]:t.ink,[dt("surprise-on")]:t.on,[dt("surprise-on-ink")]:t.onInk}}var rr=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,lr=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Wa(e){let[t,n,a]=[1,3,5].map(l=>rr(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*a),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*a),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*a);return[.2104542553*o+.793617785*i-.0040720468*r,1.9779984951*o-2.428592205*i+.4505937099*r,.0259040371*o+.7827717662*i-.808675766*r]}function cr([e,t,n]){let a=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*a-3.3077115913*o+.2309699292*i,-1.2684380046*a+2.6097574011*o-.3413193965*i,-.0041960863*a-.7034186147*o+1.707614701*i].map(r=>qt(lr(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var dr=Ae["velocity-range"],Xs={min:Vt.rhythm["velocity-min"],max:Vt.rhythm["velocity-max"]},Ka=Object.fromEntries(Object.entries(Ki).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function pr(e,t=Xs){let[n,a]=dr,o=Number.isFinite(e)?Math.max(n,Math.min(a,e)):n,i=(o-n)/(a-n),r=t.ink??Vt.rhythm["step-cell-ink"];if(i<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:r};if(i>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:r};let l=Wa(t.min),c=Wa(t.max);return{velocity:o,t:i,fill:cr(l.map((d,p)=>d+(c[p]-d)*i)),ink:r}}function Ya(e,t=Xs){return{[dt("velocity-fill")]:pr(e,t).fill}}var ur={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},hr={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},mr={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},fr={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},cn={};for(let[e,t]of Object.entries(hr))cn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(fr))cn[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(mr))cn[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(ur.renames.map(e=>[e.old,e.new]));function Qs(e){let t=cn[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function _(e){return Qs(e).prop}function s(e){return`var(${_(e)})`}function gr(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(_(t)));return Number.isFinite(n)?n:0}function G(e,t){let n=Qs(t),a=e.ownerDocument??document,o=a.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=i:o.style.color=i,(e instanceof Element?e:a.documentElement).append(o);let r=(a.defaultView??window).getComputedStyle(o),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return o.remove(),l}function Zs(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function br(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=s("font-ui"),n.style.fontSize=s("label-size"),n.style.fontWeight=s("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let a=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),a}var yr="[data-modulated], [data-modulated] *";function gn(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function Ga(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${s("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${s("hairline")} solid ${s("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function bn(e){return`  background-image: conic-gradient(from -26.565deg at 50% 100%, ${s(e)} 53.13deg, transparent 0);`}function wr(){let e=a=>`
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
${yr} { transition: none; }
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
${bn("text-sub")}
  background-size: ${s("select-mark")} ${s("select-mark")};
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${bn("text")}
}
:is(.nc-select, .nc-dd):disabled {
${bn("divider")}
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
${Ga("")}
}
@media (max-width: 1023px) {
${Ga("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${gn("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${gn("")}
}
@media (max-width: 1023px) {
${gn("html[data-nc-landscape] ")}
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
`}var yn=null,vr="nc-ui-fallback";function eo(e=globalThis.document){if(!e?.documentElement||(e.documentElement,yn&&yn.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${vr} {
${wr()}
}
`,e.head.append(t),yn=t}var xr=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,$r=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=xr,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let a=()=>{t.ncWait=null,n()};t.onload=a,t.onerror=a}),e.head.append(t)),t?.ncWait};typeof document<"u"&&$r(document);function to(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let a=t.createElement("span");a.className="nc-ui-switch-text",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",a.append(o,i),n.append(a);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var no=new WeakMap,Ja=.25;function kr(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let a=t.createElement("span");a.className="nc-fader-track",a.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(a,o);let i=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=h=>Math.min(1,Math.max(0,h)),p=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},u=h=>{let m=d(h);m!==i&&(i=m,p(),l?.(m))},g=0,f=!1;n.addEventListener("pointerdown",h=>{if(h.button!==0)return;h.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();h.target!==o&&m.height>0&&u(1-(h.clientY-m.top)/m.height),g=h.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(h.pointerId)}),n.addEventListener("pointermove",h=>{if(!f)return;let m=n.getBoundingClientRect().height||1,y=(g-h.clientY)/m*(h.shiftKey?Ja:1);g=h.clientY,u(i+y)});let w=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",h=>{h.preventDefault(),c?.()}),n.addEventListener("keydown",h=>{let m=h.shiftKey?r*Ja:r,y={ArrowUp:i+m,ArrowRight:i+m,ArrowDown:i-m,ArrowLeft:i-m,PageUp:i+r*10,PageDown:i-r*10,Home:0,End:1};h.key in y&&(h.preventDefault(),u(y[h.key]))});let v={el:n,get value(){return i},get dragging(){return f},set(h){f||(i=d(Number(h)||0),p())},setText(h){h?n.setAttribute("aria-valuetext",h):n.removeAttribute("aria-valuetext")},setLabel(h){n.setAttribute("aria-label",h)},configure(h){typeof h.step=="number"&&h.step>0&&(r=h.step),h.onChange&&(l=h.onChange),h.onReset&&(c=h.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),no.set(n,v),v}function Er(e){return no.get(e)}var ao=new WeakMap,Ar=.2,Sr=1.5,Mr=.5;function Tr(e,t){let n=String(e??"").trim(),a=Number.parseFloat(n);return Number.isFinite(a)?n.endsWith("ms")?a/1e3:a:t}function Xa(e,t,n){let a=e.ownerDocument?.defaultView??globalThis;return typeof a.getComputedStyle!="function"?n:Tr(a.getComputedStyle(e).getPropertyValue(_(t)),n)}function Cr(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,a=t.createElement("div");a.className="nc-meter",a.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let r=[];for(let v=0;v<n;v++){let h=t.createElement("span");h.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let b=t.createElement("span");b.className="nc-meter-hold",h.append(m,y,b),i.append(h),r.push({peak:m,rms:y,hold:b,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}a.append(o,i);let l=e.label,c=e.onClear,d=!1,p=-1,u=-1,g=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},f=(v,h,m,y)=>{let b=Math.round(y*1e3)/1e3;m[h]!==b&&(m[h]=b,v.style.transform=h==="hold"?`translateY(${Math.round((1-b)*1e3)/10}%)`:`scaleY(${b})`)};o.addEventListener("click",()=>{w.clear(),c?.()});let w={el:a,get clipped(){return d},update(v,h){p<0&&(p=Xa(a,"motion-meter-fall",Ar)),u<0&&(u=Xa(a,"motion-meter-hold",Sr));let m=Math.max(0,Math.min(.25,Number(h)||0)),y=p>0?Math.exp(-m/p):0;r.forEach((b,k)=>{let T=v[k]??v[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(T.peak)||0)),$=Math.min(E,Math.max(0,Number(T.rms)||0));T.over&&w.clip(),b.level.peak=E>=b.level.peak?E:E+(b.level.peak-E)*y,b.level.rms=$>=b.level.rms?$:$+(b.level.rms-$)*y,b.holdAge+=m,E>=b.holdAt?(b.holdAt=E,b.holdAge=0):b.holdAge>u&&(b.holdAt=Math.max(E,b.holdAt-Mr*m)),f(b.peak,"peak",b.shown,b.level.peak),f(b.rms,"rms",b.shown,b.level.rms),f(b.hold,"hold",b.shown,b.holdAt),b.hold.dataset.off=b.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,g())},clear(){d=!1,g()},reset(){for(let v of r)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,f(v.peak,"peak",v.shown,0),f(v.rms,"rms",v.shown,0),f(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,g()},configure(v){v.onClear&&(c=v.onClear)}};return g(),w.reset(),ao.set(a,w),w}function Lr(e){return e?ao.get(e):void 0}var zr=3,Nr=new Set(["freq","q","rate","time","log"]);function ya(e,t,n){return!e||!Nr.has(e)||!(n>t)?"linear":t>0?"log":"power"}function At(e,t,n){return ya(e,t,n)!=="linear"}function Wt(e,t,n,a){let o=Number(a);if(!(n>t)||!Number.isFinite(o))return 0;let i=Math.min(n,Math.max(t,o)),r=ya(e,t,n);if(r==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return r==="power"?Math.cbrt(l):l}function so(e,t,n,a){let o=Math.min(1,Math.max(0,Number(a)||0)),i=ya(e,t,n);return i==="log"?t*(n/t)**o:t+(n-t)*(i==="power"?o**zr:o)}function oo(e,t,n,a){let o=Math.min(n,Math.max(t,e));if(a>0){o=t+Math.round((o-t)/a)*a;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(a))+1));o=Number(o.toFixed(i)),o=Math.min(n,Math.max(t,o))}return o}function yt(e,t,n,a){return Math.round(Wt(e,t,n,a)*1e3)}function Kt(e,t,n,a,o){return oo(so(e,t,n,Number(a)/1e3),t,n,o)}function Fr(e,t,n=!1){let a=Number(e)||0,o=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=a+o:t==="ArrowLeft"||t==="ArrowDown"?i=a-o:t==="PageUp"?i=a+1e3/10:t==="PageDown"?i=a-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function wa(e,t,n,a,o,i=!1,r){let l=yt(e,t,n,a),c=Fr(l,o,i);if(c===null)return null;let d=Kt(e,t,n,c,r),p=Math.sign(c-l),u=oo(Number(a),t,n,r);for(;p!==0&&d===u&&c>0&&c<1e3;)c+=p,d=Kt(e,t,n,c,r);return d}function Qa(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function Dr(e,t,n,a=n/6){let o=e.some(p=>p===null),i=Math.max(0,n-(o?a:0)),r=e.reduce((p,u,g)=>u===null?p:p+Qa(t[g]),0),l=r>0?i/r:0,c=e.map(p=>p===null?0:Math.min(i,Qa(p)*l));if(o){let p=c.reduce((g,f)=>g+f,0),u=e.indexOf(null);c[u]=Math.max(a,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return o&&(d[d.length-1]=n),d}function Pr(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*a)),i=Math.max(1,Math.floor(n*a));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:t,h:n}}function xe(e){return Math.max(0,Math.min(1,e))}function io(e,t){let{ctx:n,w:a,h:o}=Pr(e);if(!n)return;n.clearRect(0,0,a,o);let i=br(e);if(t.paint==="swatch"){let c=G(e,"accent"),d=G(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,a/2,o),n.fillStyle=d,n.fillRect(a/2,0,a/2,o);return}if(t.paint==="filter"&&typeof t.hz=="number"){Br(n,a,o,t,e,i);return}if(t.paint==="filter"){let c=t.mode??"lp",d=G(e,Zs(c)),p=G(e,"divider"),u=xe(t.cutoff??.5),g=.08+(1-xe(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(a,o*.72),n.stroke(),n.beginPath();for(let f=0;f<=a;f++){let w=f/Math.max(1,a),v=0;c==="lp"?v=w<u?1:Math.max(0,1-(w-u)/g):c==="hp"?v=w>u?1:Math.max(0,1-(u-w)/g):v=Math.max(0,1-Math.abs(w-u)/g);let h=o*.78-v*o*.62;f===0?n.moveTo(f,h):n.lineTo(f,h)}n.strokeStyle=d,n.stroke(),n.fillStyle=G(e,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,o),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=G(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,u,g]=Dr([c,d],t.max??[1,4],a),f=2,w=o-1;n.beginPath(),n.moveTo(p,w),n.lineTo(u,f);let v=Math.max(1,Math.ceil(g-u));for(let h=1;h<=v;h++){let m=h/v;n.lineTo(u+(g-u)*m,w-(w-f)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(g,w),n.lineTo(a,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],u=G(e,"accent"),g=G(e,"text-sub"),f=o/2;n.fillStyle=G(e,"accent-soft"),n.fillRect(xe(d)*a,0,(xe(p)-xe(d))*a,o),n.strokeStyle=G(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(a,f),n.stroke();let w=Math.floor(c.length/2);for(let v=0;v<w;v++){let h=(v+.5)/w*a,m=Math.max(-1,Math.min(1,c[v*2]??0)),y=Math.max(-1,Math.min(1,c[v*2+1]??0)),b=(v+.5)/w;n.strokeStyle=b>=d&&b<=p?u:g,n.beginPath(),n.moveTo(h,f-y*(f-1)),n.lineTo(h,f-m*(f-1)+.5),n.stroke()}n.strokeStyle=u;for(let v of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let h=Math.round(xe(v)*(a-1))+.5;n.beginPath(),n.moveTo(h,0),n.lineTo(h,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=G(e,"text"),n.fillRect(Math.round(xe(t.position)*(a-1)),0,1,o)),w||(n.fillStyle=g,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=u;return}if(t.paint==="meter"){let c=xe(t.level??0);n.fillStyle=G(e,"divider"),n.fillRect(0,o*.4,a,o*.2),n.fillStyle=G(e,"accent"),n.fillRect(0,o*.4,a*c,o*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=G(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,a,o*.1),n.fillStyle=G(e,"rhythm.playhead"),n.fillRect(l/r*a,o*.3,Math.max(1,a/r),o*.4),e.dataset.ncAccent=G(e,"accent")}var mt=20,On=2e4,wn=24,Za=-60;function qr(e,t,n,a,o=48e3){let i=2*Math.PI*Math.min(t,o*.49)/o,r=Math.cos(i),l=Math.sin(i)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let u=1+l,g=-2*r,f=1-l,w=2*Math.PI*a/o,v=(b,k,T)=>b+k*Math.cos(w)+T*Math.cos(2*w),h=(b,k)=>-(b*Math.sin(w)+k*Math.sin(2*w)),m=Math.hypot(v(c,d,p),h(d,p)),y=Math.hypot(v(u,g,f),h(g,f));return y>0?m/y:0}function Ir(e,t){return Math.log(Math.max(mt,Math.min(On,e))/mt)/Math.log(On/mt)*t}function es(e,t,n){let a=Math.max(Za,Math.min(wn,e));return t+(wn-a)/(wn-Za)*(n-t)}function Br(e,t,n,a,o,i){let r=a.mode??"lp",l=G(o,Zs(r)),c=G(o,"divider"),d=G(o,"text-sub"),p=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),u=1,g=Math.max(u+4,n-p-3),f=a.q??Math.SQRT1_2,w=Math.round(es(0,u,g))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let h=mt*(On/mt)**(v/Math.max(1,t)),m=a.open?1:qr(r,a.hz,f,h,a.sampleRate),y=es(20*Math.log10(Math.max(1e-5,m)),u,g);v===0?e.moveTo(v,y):e.lineTo(v,y)}if(e.strokeStyle=l,e.stroke(),!a.open){let v=Math.round(Ir(a.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,u),e.lineTo(v,g),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(a.hz))}function ue(e,t){let n=e.ownerDocument,a=n.createElement("span");a.style.position="absolute",a.style.color=`var(--nc-ui-${t})`,e.append(a);let o=n.defaultView.getComputedStyle(a).color;return a.remove(),o}function Rr(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let a=t.defaultView.getComputedStyle(n).font;return n.remove(),a}var je=20,St=2e4,va=Math.log(St/je),Hn=32,jr=250,Or=-100,Hr=1200,_r=4.5,ts=-6,Pe=-96,Vr=48,ns=[100,1e3,1e4],Ur=[6,12];function Ke(e,t){return Math.log(Math.max(je,Math.min(St,e))/je)/va*t}function It(e,t){return je*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*va)}function Se(e,t,n,a){let o=t/2-a;return t/2-Math.max(-n,Math.min(n,e))/n*o}function _n(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var ro=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Wr(e,t,n,a){let o=n?3:1,i=c=>({db:Math.max(-a,Math.min(a,e.db+c*o))}),r=c=>({hz:Math.max(e.minHz??je,Math.min(e.maxHz??St,e.hz*2**(c*o/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*o)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?r(1):i(1);case"ArrowLeft":return e.moveHz?r(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function xa(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Kr(e,t,n,a,o,i,r,l,c){let d=c?.25:1,p={},u=Math.max(1,i/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-a*d/u*r/xa(e))),e.moveHz){let g=t.hz*Math.exp(n*d/Math.max(1,o)*va);p.hz=Math.max(e.minHz??je,Math.min(e.maxHz??St,g))}return p}function Yr(e,t,n,a,o){let i=Math.max(0,n.left)+1,r=Math.min(n.right,o)-1,l=Math.min(t.width*3+a*2,r-i),c=Math.max(i,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var X=new WeakMap;function Gr(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,a.append(o,i);for(let c of e.bands)a.append(Jr(n,c,t));a.append(r),a.addEventListener("click",c=>{if(!mo(n)||c.button>0)return;let d=ho(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(a);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),X.set(n,{control:e,cache:null,spec:null,active:null}),co(n,e),n}function lo(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function Jr(e,t,n){let a=document.createElement("div");a.className="nc-eq-node",a.tabIndex=0,a.dataset.band=t.id,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical");let o=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>o()?.bands.find(d=>d.id===t.id)??null,r=null;a.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=i();p&&(d.preventDefault(),a.focus({preventScroll:!0}),a.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},a.dataset.drag="true",$e(e,t.id))}),a.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=o(),u=i(),g=X.get(e);if(!p||!u||!g?.box)return;let{w:f,h:w,pad:v}=g.box;p.onBand(u.id,Kr(u,r.start,d.clientX-r.x,d.clientY-r.y,f,w,p.range??18,v,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete a.dataset.drag,e.ownerDocument.activeElement!==a&&!a.matches(":hover")&&$e(e,null))};a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("dblclick",d=>{d.preventDefault(),o()?.onReset?.(t.id)}),a.addEventListener("keydown",d=>{let p=o(),u=i();if(!p||!u)return;let g=Wr(u,d.key,d.shiftKey,p.range??18);g&&(d.preventDefault(),g==="reset"?p.onReset?.(u.id):p.onBand(u.id,g),$e(e,u.id))});let c=null;return a.addEventListener("wheel",d=>{let p=o(),u=i();if(!p||!u?.moveQ)return;d.preventDefault();let g=d.timeStamp;(!c||g-c.t>400)&&(c={q:u.q,t:g});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(u.minQ??.1,Math.min(u.maxQ??20,c.q*2**(-f/240))),c.t=g,p.onBand(u.id,{q:c.q}),$e(e,u.id)},{passive:!1}),a.addEventListener("pointerenter",()=>$e(e,t.id)),a.addEventListener("focus",()=>$e(e,t.id)),a.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==a&&$e(e,null)}),a.addEventListener("blur",()=>{r||$e(e,null)}),a}function $e(e,t){let n=X.get(e);if(!n)return;let a=n.active!==t;n.active=t,a?Xe(e):$a(e)}function $a(e){let t=X.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let a=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(a&&w.dataset.band===a.id?w.dataset.active="true":delete w.dataset.active);if(!a||!t.box){n.hidden=!0;return}let o=[a.label,ro(a.db)];a.kind==="peak"?o.push(_n(a.hz),`Q ${a.q.toFixed(1)}`):o.push(`${a.kind==="lowshelf"?"below":"above"} ${_n(a.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(Xr(t.control,a)),n.hidden=!1;let{w:i,h:r,pad:l}=t.box,c=Ke(a.hz,i),d=Se(a.db*xa(a),r,t.control.range??18,l),p=n.offsetWidth,u=n.offsetHeight,g=Math.max(0,Math.min(i-p,c-p/2)),f=d-u-l*1.5>=0?d-u-l*1.5:Math.min(r-u,d+l*1.5);n.style.left=`${Math.round(g)}px`,n.style.top=`${Math.round(f)}px`}function Xr(e,t){return e.bands.indexOf(t)%3+1}function co(e,t){let n=X.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",ka(e);let a=t.range??18;t.bands.forEach((o,i)=>{let r=lo(e,o.id);r instanceof HTMLElement&&(r.dataset.tone=String(i%3+1),r.dataset.kind=o.kind,r.setAttribute("aria-label",`${o.label} band`),r.setAttribute("aria-valuemin",String(-a)),r.setAttribute("aria-valuemax",String(a)),r.setAttribute("aria-valuenow",String(o.db)),r.setAttribute("aria-valuetext",o.valueText??`${ro(o.db)}, ${_n(o.hz)}`),r.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?r.setAttribute("data-nc-help",o.help):r.removeAttribute("data-nc-help"))}),Xe(e),al(e)}function po(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),a=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*a)),i=Math.max(1,Math.round(n*a));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(a,0,0,a,0,0),{ctx:r,w:t,h:n}}function uo(e){return{curve:ue(e,"eq-curve"),fill:ue(e,"eq-fill"),quiet:ue(e,"text-sub"),grid:ue(e,"eq-grid"),zero:ue(e,"divider"),label:ue(e,"text-sub"),spectrum:ue(e,"eq-spectrum"),bands:[ue(e,"eq-band-1"),ue(e,"eq-band-2"),ue(e,"eq-band-3")]}}function Qr(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Xe(e){X.has(e)&&ka(e);let t=X.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let a=t.control,{ctx:o,w:i,h:r}=po(n);if(!o)return;let l=Math.max(8,Math.round(r*.06)),c=a.range??18;t.box={w:i,h:r,pad:l},t.colours=uo(e);let d=t.colours,p=Qr(a,i);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(i)+1),T=new Float64Array(k);for(let $=0;$<k;$++)T[$]=It($/(k-1)*i,i);let E=null;try{E=typeof a.response=="function"?a.response(T):null}catch{E=null}t.cache={key:p,freqs:T,total:E?.total??new Float64Array(k),bands:E?.bands??[]}}o.clearRect(0,0,i,r);let u=Rr(e),g=a.on!==!1;Zr(o,i,r,c,l,d,u);let{freqs:f,total:w,bands:v}=t.cache,h=Array.from(f,k=>Ke(k,i)),m=Se(0,r,c,l);v.forEach((k,T)=>{if(!k||!k.some(M=>Math.abs(M)>.05))return;let E=g?d.bands[T%3]:d.quiet,$=Array.from(k,M=>Se(M,r,c,l));o.save(),t.active&&a.bands[T]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=E,as(o,h,$,m)),o.globalAlpha=g?.75:.4,o.strokeStyle=E,o.lineWidth=.75,vn(o,h,$),o.restore()});let y=Array.from(w,k=>Se(k,r,c,l)),b=g?d.curve:d.quiet;o.save(),o.fillStyle=g?d.fill:d.quiet,o.globalAlpha=g?.2:.08,as(o,h,y,m),o.restore(),o.save(),o.strokeStyle=g?d.fill:b,o.lineJoin="round",o.lineCap="round",g&&(o.globalAlpha=.16,o.lineWidth=4,vn(o,h,y)),o.globalAlpha=1,o.strokeStyle=b,o.lineWidth=1.25,vn(o,h,y),o.restore(),el(e),$a(e)}function Zr(e,t,n,a,o,i,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<je||p>St)continue;let u=Math.round(Ke(p,t))+.5;e.globalAlpha=ns.includes(p)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(u,0),e.lineTo(u,n),e.stroke()}for(let c of Ur)if(!(c>a))for(let d of[1,-1]){let p=Math.round(Se(c*d,n,a,o))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(Se(0,n,a,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of ns){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,u=Ke(c,t)+3;e.fillText(d,u+p+2>t?Ke(c,t)-p-3:u,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>a)continue;let d=Se(c,n,a,o);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Yt(e,t,n){e.moveTo(t[0],n[0]);for(let a=1;a<t.length-1;a++){let o=(t[a]+t[a+1])/2,i=(n[a]+n[a+1])/2;e.quadraticCurveTo(t[a],n[a],o,i)}e.lineTo(t[t.length-1],n[n.length-1])}function vn(e,t,n){e.beginPath(),Yt(e,t,n),e.stroke()}function as(e,t,n,a){e.beginPath(),Yt(e,t,n),e.lineTo(t[t.length-1],a),e.lineTo(t[0],a),e.closePath(),e.fill()}function ho(e){return e.closest("[data-nc-maxable]")}function mo(e){let t=ho(e);return!!t&&!t.hasAttribute("data-nc-max")}function ka(e){let t=mo(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=X.get(e);n?.active&&(n.active=null,$a(e))}return t}function el(e){ka(e);let t=X.get(e);if(!t?.box)return;let{w:n,h:a,pad:o}=t.box,i=t.control.range??18;for(let r of t.control.bands){let l=lo(e,r.id);l instanceof HTMLElement&&(l.style.left=`${Ke(r.hz,n).toFixed(1)}px`,l.style.top=`${Se(r.db*xa(r),a,i,o).toFixed(1)}px`)}}function tl(e,t,n,a){let o=a/2/n,i=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,u=It(d,t),g=It(p,t),f=It(c/(e-1)*t,t);i[c]=Math.min(n-1,u/o),r[c]=Math.min(n-1,g/o),l[c]=_r*Math.log2(f/1e3)}return{lo:i,hi:r,tilt:l}}function nl(e,t,n){let a=Math.floor(t),o=Math.ceil(n);if(o-a<=1){let r=t-a,l=e[a]??-1/0,c=e[Math.min(e.length-1,a+1)]??l;return l+(c-l)*r}let i=-1/0;for(let r=a;r<=o&&r<e.length;r++)e[r]>i&&(i=e[r]);return i}function al(e){let t=X.get(e);if(t){if(!t.control.spectrum){go(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(a=>{let o=X.get(e)?.spec;o&&(o.visible=a.some(i=>i.isIntersecting),Vn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Vn(e)}}function Vn(e){let t=X.get(e),n=t?.spec;if(!n)return;let a=e.ownerDocument;if(!(e.isConnected&&n.visible&&a.visibilityState!=="hidden"&&t.control.spectrum)){fo(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Un(e),n.onVis||(n.onVis=()=>Vn(e),a.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Wn(e,!1)}function Un(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Wn(e,t){let n=X.get(e)?.spec,a=e.ownerDocument.defaultView;!n||!a||(t?n.timer=a.setTimeout(()=>(n.timer=0,xn(e,Un(e))),jr):typeof a.requestAnimationFrame=="function"?n.raf=a.requestAnimationFrame(o=>(n.raf=0,xn(e,o))):n.timer=a.setTimeout(()=>(n.timer=0,xn(e,Un(e))),Hn))}function fo(e){let t=X.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let a=e.querySelector(".nc-eq-spectrum");a instanceof HTMLCanvasElement&&a.getContext("2d")?.clearRect(0,0,a.width,a.height)}function go(e){let t=X.get(e)?.spec;if(!t)return;fo(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=X.get(e);n&&(n.spec=null)}function xn(e,t){let n=X.get(e),a=n?.spec;if(!n||!a)return;if(!e.isConnected){go(e);return}if(!a.analyser)return;if(t-a.last<Hn-4&&!a.idle){Wn(e,!1);return}let o=a.last?Math.min(.25,(t-a.last)/1e3):Hn/1e3;a.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=po(i);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=a.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!a.map||a.map.cols!==d||a.map.w!==l||a.map.sr!==p)&&(a.map={cols:d,w:l,sr:p,...tl(d,l,a.buf.length,p)},a.disp=new Float32Array(d).fill(-1/0)),a.analyser.getFloatFrequencyData(a.buf);let u=-1/0,g=Vr*o,{lo:f,hi:w,tilt:v}=a.map;for(let m=0;m<d;m++){let y=nl(a.buf,f[m],w[m]);y>u&&(u=y);let b=y+v[m],k=a.disp[m]-g;a.disp[m]=b>k?b:k}u>Or&&(a.loud=t);let h=t-a.loud>Hr;r.clearRect(0,0,l,c),(!h||a.disp.some(m=>m>Pe))&&sl(r,l,c,a.disp,n.colours??uo(e)),a.idle=h&&!a.disp.some(m=>m>Pe),Wn(e,a.idle)}function sl(e,t,n,a,o){let i=a.length,r=new Array(i),l=new Array(i),c=d=>{let p=a[Math.max(0,Math.min(i-1,d))];return Number.isFinite(p)?p:Pe};for(let d=0;d<i;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,u=(Math.max(Pe,Math.min(ts,Number.isFinite(p)?p:Pe))-Pe)/(ts-Pe);r[d]=d/(i-1)*t,l[d]=n-u*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),Yt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),Yt(e,r,l),e.stroke(),e.restore()}var ie=new WeakMap,ol=450,il=6,rl=33,$n=24,ll="http://www.w3.org/2000/svg";function cl(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function dl(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function pl(e,t,n,a,o){let i=e.slice();if(t===a)return i[a]=o,i;let r=t<a?1:-1;for(let l=t;l!==a+r;l+=r){let c=(l-t)/(a-t);i[l]=Math.round((n+(o-n)*c)*100)/100}return i}function ul(e,t){let n=e.steps[t],a=(e.shapes??[]).find(i=>i.value===n.shape),o=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${a?`, ${a.label}`:""}${o}`}function qe(e,t){let n=document.createElementNS(ll,e);for(let[a,o]of Object.entries(t))n.setAttribute(a,String(o));return n}function bo(e){let t=qe("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(qe("path",{d:e})),t}function hl(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let a=document.createElement("div");a.className="nc-lsteps-plot",a.tabIndex=0,a.setAttribute("role","slider"),a.setAttribute("aria-orientation","vertical"),a.setAttribute("aria-valuemin","0"),a.setAttribute("aria-valuemax","100"),a.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let o=document.createElement("div");o.className="nc-lsteps-axis",o.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(a,o,i,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ie.set(n,c),fl(n,a),gl(n,r),yo(n,e),n}function re(e){let t=ie.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function ml(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function kn(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),a=ml(e);return{i:dl(t.clientX,a),level:cl(t.clientY-n.top,n.height)}}function fl(e,t){let n=ie.get(e),a=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let r=re(e);if(!r||i.button>0||!r.steps.length)return;i.preventDefault(),Gt(e),t.setPointerCapture?.(i.pointerId);let l=kn(t,i),c=r.steps.map(d=>d.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,ss(e,l.i,l.level,l.i,l.level,!1),a(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,re(e)?.onLevels(d.start.slice(),!0),En(e,d.i))},ol)}),t.addEventListener("pointermove",i=>{let r=n.drag;if(!r||r.id!==i.pointerId||r.long||!r.moved&&Math.hypot(i.clientX-r.x,i.clientY-r.y)<il)return;r.moved=!0,a();let l=kn(t,i);ss(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let o=i=>{let r=n.drag;!r||r.id!==i.pointerId||(a(),n.drag=null,t.releasePointerCapture?.(i.pointerId),r.long||re(e)?.onLevels(r.levels.slice(),!0),Kn(e,-1))};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",i=>{let r=n.drag;!r||r.id!==i.pointerId||(a(),n.drag=null,r.long||re(e)?.onLevels(r.start.slice(),!0),Kn(e,-1))}),t.addEventListener("contextmenu",i=>{re(e)?.onShape&&(i.preventDefault(),En(e,kn(t,i).i))}),t.addEventListener("keydown",i=>{let r=re(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=u=>{let g=r.steps.map(f=>f.level);g[c]=Math.round(Math.max(0,Math.min(1,u))*100)/100,r.onLevels(g,!0)};switch(i.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(i.shiftKey?.01:.05));break;case"ArrowDown":p(d-(i.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;En(e,c);break;default:return}i.preventDefault(),Yn(e)}),t.addEventListener("focus",()=>Yn(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function ss(e,t,n,a,o,i){let r=ie.get(e).drag;r&&(r.levels=pl(r.levels,t,n,a,o),Kn(e,a,r.levels[a]),re(e)?.onLevels(r.levels.slice(),i))}function Kn(e,t,n){for(let a of e.querySelectorAll(".nc-lsteps-step"))Number(a.dataset.i)===t?(a.dataset.dragging="true",a.dataset.level=`${Math.round(n*100)}%`):a.removeAttribute("data-dragging")}function Yn(e){let t=ie.get(e),n=e.querySelector(".nc-lsteps-plot"),a=re(e);if(!n||!a)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let o=Math.min(t.focus,a.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((a.steps[o]?.level??0)*100))),n.setAttribute("aria-valuetext",ul(a,o))}function gl(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Gt(e,!0);return}let a=[...t.querySelectorAll("button")],o=a.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),a[(o+1)%a.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),a[(o-1+a.length)%a.length]?.focus())}),ie.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Gt(e)}}function En(e,t){let n=re(e),a=e.querySelector(".nc-lsteps-pick"),o=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!a||!o)return;let i=ie.get(e);i.focus=t,a.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,a.append(r);for(let f of n.shapes??[]){let w=document.createElement("button");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&w.append(bo(f.icon)),w.append(document.createTextNode(f.label)),w.addEventListener("click",()=>{re(e)?.onShape?.(t,f.value),Gt(e,!0)}),a.append(w)}a.setAttribute("aria-label",`Shape of step ${t+1}`),a.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=o.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=a.getBoundingClientRect().width,u=d?d.left+d.width/2-c.left:0,g=Math.max(0,Math.min(c.width-p,u-p/2));a.style.setProperty("--nc-lsteps-pick-x",`${Math.round(g)}px`),a.querySelector('[aria-checked="true"]')?.focus?.()??a.querySelector("button")?.focus?.()}function Gt(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ie.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function bl(e,t){let n=ie.get(e),a=e.querySelector(".nc-lsteps-plot"),o=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,a.textContent="",o.textContent="";for(let i=0;i<t;i++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(i),i%4===0&&i>0&&(r.dataset.beat="true");let l=qe("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(qe("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),qe("path",{class:"nc-lsteps-env",d:""}),qe("path",{class:"nc-lsteps-top",d:""}),qe("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),a.append(r);let c=document.createElement("span");i%4===0&&(c.textContent=String(i+1)),i%4===0&&i>0&&(c.dataset.beat="true"),o.append(c)}}}function yo(e,t){let n=ie.get(e);if(!n)return;n.control=t;let a=t.steps.length;bl(e,a),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let o=e.querySelector(".nc-lsteps-plot");o.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),r=o.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,w)=>{let v=r[w];if(!v)return;let h=String((w%2?1-i:i)*2);v.style.setProperty("--nc-lsteps-grow",h),l[w]?.style.setProperty("--nc-lsteps-grow",h),t.played!==void 0&&w>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=f.level<=0?"true":"false";let m=Math.max(0,Math.min(1,f.level)),y=v.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-m*100)),y.setAttribute("height",String(m*100));let b=t.curve?t.curve(w,$n):null,k="M0 100",T="";for(let E=0;E<=$n;E++){let $=b?Math.max(0,Math.min(1,b[E]??m)):m,M=E/$n*100,z=100-$*100;k+=` L${M.toFixed(2)} ${z.toFixed(2)}`,T+=`${E?" L":"M"}${M.toFixed(2)} ${z.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",T)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let w=document.createElement("button");w.type="button",w.className="nc-lsteps-shape",w.setAttribute("role","tab"),w.dataset.shape=String(f.value),f.icon&&w.append(bo(f.icon)),w.append(document.createTextNode(f.label)),w.addEventListener("click",()=>re(e)?.onShapeAll?.(f.value)),c.append(w)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??a,u=t.steps[0]?.shape,g=t.steps.slice(0,p).every(f=>f.shape===u);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let w=g&&f.dataset.shape===String(u);f.setAttribute("aria-selected",w?"true":"false"),f.tabIndex=w||!g&&f===c.firstElementChild?0:-1}n.focus>=a&&(n.focus=0),Yn(e),n.last=-2,yl(e)}function yl(e){let t=ie.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&An(e,null);return}let a=0,o=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){An(e,null);return}i-a>=rl&&(a=i,An(e,t.control.playhead())),t.loop=n.requestAnimationFrame(o)};t.loop=n.requestAnimationFrame(o)}function An(e,t){let n=ie.get(e),a=t&&Number.isInteger(t.step)?t.step:-1,o=!!t?.locked;if(!(n.last===a&&n.lastLocked===o)){n.last=a,n.lastLocked=o;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===a?(i.dataset.playhead="true",i.dataset.locked=o?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!o?"true":"false"}}var wl=.8912509381337456,Gn=32,vl=250,xl=1200,$l=.2,wo=1.5;function kl(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function El(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let a=e.createElement("span");a.className="nc-fx-level-bar",a.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",a.append(o),t.append(a)}return t}var Jt=new WeakMap,os=new WeakMap;function is(e,t,n){let a=e.ownerDocument?.defaultView;if(typeof a?.getComputedStyle!="function")return n;let o=String(a.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(o);return Number.isFinite(i)?o.endsWith("ms")?i/1e3:i:n}function Al(e){let t=os.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let a=n?.IntersectionObserver;return a&&(t.io=new a(o=>{for(let i of o){let r=Jt.get(i.target);r&&(r.seen.set(i.target,i.isIntersecting),ft(r))}We(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)ft(o);We(t)}),os.set(e,t),t}var vo=e=>e.els.some(t=>t.isConnected);function Sl(e){if(!e.loop.io)return vo(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ft(e){let t=!e.dead&&!!e.source&&Sl(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Ea(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Qn(e))}function Ea(e){return e.doc.defaultView?.performance?.now()??Date.now()}function We(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){xo(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Ea(e)),!e.raf&&!e.timer&&Jn(e,!1)}function Jn(e,t){let n=e.doc.defaultView;if(!n)return;let a=()=>rs(e,Ea(e));t?e.timer=n.setTimeout(()=>(e.timer=0,a()),vl):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,rs(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,a()),Gn)}function xo(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function rs(e,t){if(t-e.last<Gn-4&&!e.idle&&e.last){Jn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Gn/1e3;e.last=t,e.frames++;let a=!1,o=!1;for(let i of e.recs){if(!vo(i)){(i.placed||e.frames-i.born>90)&&$o(i);continue}i.placed=!0,i.open&&(o=!0,Ml(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(a=!0))}if(!o){xo(e);return}e.idle=t-e.loud>xl&&!a,Jn(e,e.idle)}function Ml(e,t,n){if(e.fall<0){let g=e.els[0];e.fall=is(g,"motion-meter-fall",$l),e.hold=is(g,"motion-meter-hold",wo)}let a=null;try{a=e.source.read()}catch{a=null}let o=typeof a=="number",i=o?a:Number(a?.in)||0,r=!o&&a!==null&&typeof a=="object"&&typeof a.out=="number",l=r&&Number(a.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let g of e.els)g.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[i,l],u=!1;for(let g=0;g<2;g++){let f=kl(p[g]);f>0&&(u=!0),e.disp[g]=f>=e.disp[g]?f:f+(e.disp[g]-f)*d,e.disp[g]<.001&&(e.disp[g]=0),p[g]>=wl&&(e.clipAt[g]=n);let w=e.clipAt[g]>0&&n-e.clipAt[g]<e.hold*1e3;Xn(e,g,e.disp[g],w)}return u}function Xn(e,t,n,a){let o=Math.round(n*1e3)/1e3,i=a?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===i)){e.shown[t]=o,e.clipShown[t]=i;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=i)}}}function Qn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Xn(e,0,0,!1),Xn(e,1,0,!1)}function $o(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Jt.get(t)===e&&Jt.delete(t)}function Tl(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),a=n[0]?.ownerDocument??globalThis.document,o=Al(a),i={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:wo,rows:""};for(let r of n)Jt.set(r,i),o.io?.observe(r);if(o.recs.add(i),Qn(i),!o.io){let r=a.defaultView,l=()=>{ft(i),We(o)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!i.dead){if(l===i.source){ft(i),We(o);return}i.open&&(i.open=!1,i.source?.close?.(),Qn(i)),i.source=l,ft(i),We(o)}},destroy(){i.dead||$o(i),We(o)}}}var ko={slop:8,longPressMs:500,pitchPx:16},Cl=class{constructor(e,t,n=ko){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,a){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=a,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,a){if(e!==this.pointer)return;let o=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(a),this.phase!=="pending"||Math.hypot(o,i)<this.config.slop)return;Math.abs(i)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-i/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,a){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,a),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Ll(e,t,n,a=ko){let o=!1,i=0,r=(d,p)=>{let u=e.ownerDocument.elementFromPoint?.(d,p),g=[...e.querySelectorAll(t)],f=u?g.findIndex(h=>h===u||h.contains(u)):-1;if(f>=0)return f;let w=-1,v=Number.POSITIVE_INFINITY;return g.forEach((h,m)=>{if(h.hidden)return;let y=h.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let b=Math.abs(d-(y.left+y.width/2));b<v&&b<=y.width&&(w=m,v=b)}),w},l=new Cl(r,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},a),c=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),i=setTimeout(()=>l.tick(performance.now()),a.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Eo="netcomposer.groups.v1";function Aa(){try{return globalThis.localStorage??null}catch{return null}}function Sa(e=Aa(),t=Eo){try{let n=JSON.parse(e?.getItem(t)??"{}"),a=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,i]of Object.entries(n))typeof i=="boolean"&&a.set(o,i);return a}catch{return new Map}}function Ao(e,t,n,a=Eo){let o=Sa(e,a);o.set(t,n);try{e?.setItem(a,JSON.stringify(Object.fromEntries(o)))}catch{}}function zl(e,t=Aa()){return Sa(t).get(e.id)??e.open===!0}function Nl(e,t,n){let a=document.createElement("div");a.className="nc-group",a.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(i,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return o.addEventListener("click",()=>{let d=a.dataset.ncOpen!=="true";Ao(Aa(),e.id,d),Zn(a,d);let p=t(a);p?.type==="group"&&p.onToggle?.(d)}),a.append(o,c),So(a,e),Zn(a,zl(e)),Mo(a,e),a}function Zn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),a=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),a instanceof HTMLElement&&(a.hidden=!t&&e.dataset.ncCollapse!=="phone")}function So(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Mo(e,t){So(e,t)&&Zn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let a=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";a&&a.textContent!==o&&(a.textContent=o)}var Tt="application/x-nc-pad",ls="http://www.w3.org/2000/svg";function Fl(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),a=[],o=[];for(let i=0;i<n;i++){let r=Math.floor(i*t/n),l=Math.max(r+1,Math.floor((i+1)*t/n)),c=0,d=0;for(let u=r;u<l;u++)c=Math.min(c,e[2*u]??0),d=Math.max(d,e[2*u+1]??0);let p=n===1?50:i/(n-1)*100;a.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${a.join("L")}L${o.reverse().join("L")}Z`}function Dl(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let a=document.createElement("div");return a.className="nc-padgrid-pads",a.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,i)=>a.append(Pl(n,i,t))),n.append(a),n.addEventListener("keydown",o=>{o.key==="Escape"&&Bt(n)}),Co(n,e),n}function Pl(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-padgrid-pad",a.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(ls,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(ls,"path");return c.append(d),a.append(o,i,r,l,c),Il(e,a,t,n),i.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&a.dataset.empty!=="true"&&To(e,a,t,n)}),a.addEventListener("dragstart",p=>{if(a.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(Tt,String(t)),p.dataTransfer.effectAllowed="copyMove",a.dataset.dragging="true"}),a.addEventListener("dragend",()=>delete a.dataset.dragging),a.addEventListener("dragover",p=>{let u=p.dataTransfer?.types??[];!u.includes("Files")&&!u.includes(Tt)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=u.includes(Tt)&&!p.altKey?"move":"copy"),a.dataset.drop="true")}),a.addEventListener("dragleave",()=>delete a.dataset.drop),a.addEventListener("drop",p=>{delete a.dataset.drop;let u=n(e);if(u?.type!=="padGrid")return;let g=p.dataTransfer?.getData(Tt);if(g!==void 0&&g!==""){p.preventDefault(),p.stopPropagation();let w=Number(g);w!==t&&u.onMove?.(w,t,p.altKey);return}let f=p.dataTransfer?.files?.[0];f&&(p.preventDefault(),p.stopPropagation(),u.onFile?.(t,f))}),a}function ql(e,t,n){let a=n(e);a?.type==="padGrid"&&a.onPress(t)}function Il(e,t,n,a){let o=0,i=!1,r=0,l=0,c=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,r=d.clientX,l=d.clientY,c();let p=a(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,i=cs(e,t,n,a)},450)))}),t.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),i=cs(e,t,n,a)}),t.addEventListener("click",()=>{if(i){i=!1;return}ql(e,n,a)})}function cs(e,t,n,a){let o=a(e);if(o?.type!=="padGrid"||!o.menu)return!1;let i=o.menu(n);if(!i.length)return!1;Bt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Bt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of i){let u=document.createElement("button");u.type="button",u.className="nc-menu-btn",u.setAttribute("role","menuitem"),u.dataset.ncMenuItem=p.id,u.textContent=p.label,u.addEventListener("click",()=>{Bt(e);let g=a(e);g?.type==="padGrid"&&(p.id==="rename"&&g.onRename?To(e,t,n,a):g.onMenu?.(n,p.id))}),l.append(u)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function To(e,t,n,a){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=a(e);if(o?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=o.nameMax??24,i.value=o.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.top-r.top}px`,i.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let u=i.value.trim();i.remove(),t.focus();let g=a(e);p&&u&&g?.type==="padGrid"&&g.onRename?.(n,u)};i.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])i.addEventListener(p,u=>u.stopPropagation());e.append(i),i.focus(),i.select()}function Bt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Co(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((a,o)=>{let i=n[o];if(!(i instanceof HTMLButtonElement))return;let r=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=a.empty?"":a.badge??""),i.draggable=!a.empty,a.empty?(i.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,r&&(r.textContent=a.label),l&&(l.textContent=a.hint??""),c?.setAttribute("d",Fl(a.peaks))),!a.empty&&a.hint?i.dataset.hint="true":delete i.dataset.hint,a.lane?i.dataset.ncLane=String(a.lane):delete i.dataset.ncLane;let p=t.selected===o;p?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",p?"true":"false"),a.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",a.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${a.label}${a.hint?`, ${a.hint}`:""}${a.badgeLabel?`, ${a.badgeLabel}`:""}${p?", selected":""}`)})}function ae(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function dn(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let a=document.createElement("label");a.className="nc-label",a.htmlFor=e,a.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(a,o),n}function ds(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function wt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var Bl=450,ps=8;function ge(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Rl(e){let t=gr(e,"target-min");return t>0?t:44}function jl(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Rl(e),a=n/2,o=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let r=t[i],l=o[i];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-a,u=c+a,g=d-a,f=d+a;for(let w=0;w<t.length;w++){if(i===w)continue;let v=o[w];if(!v||v.width===0)continue;let h=v.left+v.width/2,m=v.top+v.height/2;Math.abs(m-d)<a*2&&(h>c?u=Math.min(u,(c+h)/2):h<c&&(p=Math.max(p,(c+h)/2))),Math.abs(h-c)<a*2&&(m>d?f=Math.min(f,(d+m)/2):m<d&&(g=Math.max(g,(d+m)/2)))}p=Math.min(p,l.left),u=Math.max(u,l.right),g=Math.min(g,l.top),f=Math.max(f,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${g-l.top}px`,r.style.width=`${Math.max(0,u-p)}px`,r.style.height=`${Math.max(0,f-g)}px`,r.style.transform="none"}}function Lo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function us(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Be(e,t){switch(e.type){case"slider":return Ol(e,t);case"select":return _l(e,t);case"toggle":return Vl(e,t);case"button":return Ul(e,t);case"readout":return Wl(e);case"label":return Jl(e);case"note":return hs(e);case"knob":return Zl(e,t);case"choice":return ec(e,t);case"slotRow":return tc(e,t);case"stepGrid":return oc(e,t);case"canvas":return cc(e);case"fx":return yc(e,t);case"eqGraph":return Gr(e,t);case"levelSteps":return hl(e,t);case"group":return Nl(e,t,Be);case"strip":return dc(e,t);case"stripAdd":return mc(e,t);case"padGrid":return Dl(e,t);case"moves":return Yl(e,t);default:return hs({id:"unknown",text:""})}}function de(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),a=e.querySelector("label");a&&(a.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Fo(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(zo(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??wt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),ds(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")ds(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&Me(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&Xl(n,t);let a=e.querySelector("[data-nc-readout]");a&&(a.textContent=t.valueText??wt(t.value))}else if(t.type==="choice")Do(e,t);else if(t.type==="slotRow")qo(e,t);else if(t.type==="stepGrid")ta(e,t);else if(t.type==="padGrid")Co(e,t);else if(t.type==="moves")No(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&io(n,t)}else if(t.type==="eqGraph")co(e,t);else if(t.type==="levelSteps")yo(e,t);else if(t.type==="strip"){jo(e,t);for(let n of t.sends??[]){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&de(a,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Bo(e,t);else if(t.type==="group"){Mo(e,t);for(let n of t.controls){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&de(a,n)}}else if(t.type==="fx"){Go(e,t);for(let n of[...t.controls,...t.more??[]]){let a=e.querySelector(`[data-nc-id="${Ye(n.id)}"]`);a instanceof Element&&de(a,n)}}}}function Ol(e,t){let n=dn(e.id,e.label);n.dataset.ncSlider="";let a=document.createElement("input");a.type="range",a.className="nc-range",a.id=e.id;let o=At(e.taper,e.min,e.max);a.min=String(o?0:e.min),a.max=String(o?1e3:e.max),a.step=String(o?1:e.step),o&&(a.dataset.ncTaper=e.taper),a.value=String(zo(e)),a.disabled=e.disabled===!0,a.dataset.ncId=e.id;let i=l=>o?Kt(l.taper??e.taper,l.min,l.max,a.value,l.step):Number(a.value);a.addEventListener("input",()=>{let l=t(a);l?.type==="slider"&&l.onChange(i(l))}),a.addEventListener("change",()=>{let l=t(a);l?.type==="slider"&&l.onCommit?.(i(l))}),o&&a.addEventListener("keydown",l=>{let c=t(a);if(c?.type!=="slider"||a.disabled)return;let d=c.taper??e.taper,p=wa(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),a.value=String(yt(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(a,r),e.onTap&&n.insertBefore(Hl(e,a,t),r),n.append(ae()),de(n,e),n}function zo(e){return At(e.taper,e.min,e.max)?yt(e.taper,e.min,e.max,e.value):e.value}function Hl(e,t,n){let a=document.createElement("button");a.type="button",a.className="nc-tap",a.dataset.ncTap=e.id,a.textContent="Tap",a.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),a.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,a.append(ge());let o=i=>{let r=n(t);r?.type==="slider"&&r.onTap?.(i)};return a.addEventListener("pointerdown",i=>{i.button===0&&o(i.timeStamp)}),a.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),o(i.timeStamp))}),a}function _l(e,t){let n=dn(e.id,e.label),a=document.createElement("select");a.className="nc-select",a.id=e.id,a.dataset.ncId=e.id;let o=null;for(let i of e.options){let r=document.createElement("option");r.value=i.value,r.textContent=i.label,i.disabled&&(r.disabled=!0),i.group?o?.getAttribute("label")!==i.group&&(o=document.createElement("optgroup"),o.setAttribute("label",i.group),a.append(o)):o=null,(o??a).append(r)}return a.value=e.value,a.addEventListener("change",()=>{let i=t(a);i?.type==="select"&&i.onChange(a.value)}),n.append(a,ae()),n}function Vl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let a=t(n);a?.type==="toggle"&&a.onPress()}),n.append(ae()),de(n,e),n}function Ul(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(ae()),de(n,e),!e.onSparkle)return n;let a=document.createElement("div");a.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=Lo(),o.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&Io(i);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),a.append(n,o),a}function Wl(e){let t=dn(e.id,e.label);return t.append(ae()),de(t,e),t}var Kl=450;function Yl(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let a of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",a.label),a.title&&(o.title=a.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=a.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of a.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${a.label} ${l.text}`),c.append(Gl(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}o.append(i,r),n.append(o)}return No(n,e),n}function No(e,t){for(let n of t.groups)for(let a of n.moves){let o=e.querySelector(`[data-nc-move="${Ye(a.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=a.disabled===!0)}}function Gl(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let a=document.createElementNS(t,"path");a.setAttribute("d",e.stroke),a.setAttribute("fill","none"),a.setAttribute("stroke","currentColor"),a.setAttribute("stroke-width","1.5"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round"),n.append(a)}if(e?.fill){let a=document.createElementNS(t,"path");a.setAttribute("d",e.fill),a.setAttribute("fill","currentColor"),n.append(a)}return n}function Jl(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(ae()),t}function hs(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(ae()),t}function ms(e){if(typeof e.valueText=="string")return e.valueText;let t=wt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Fo(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function Xl(e,t){let n=Wt(t.taper,t.min,t.max,t.value);Fo(e,t.modulated===!0);let a=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(a)),t.bipolar){let o=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Wt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(a,o))),e.style.setProperty("--knob-to",String(Math.max(a,o)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",ms(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${ms(t)}`}function Ql(e,t){if(At(e.taper,e.min,e.max))return wa(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,a=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?a/10:a;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+a*10:t.key==="PageDown"?e.value-a*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function Zl(e,t){let n=dn(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let a=document.createElement("button");a.type="button",a.className="nc-knob",a.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",a.append(o);let i=0,r=0;a.addEventListener("pointerdown",d=>{i=d.clientY;let p=t(a);r=p&&"value"in p?Number(p.value):0,a.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;a.addEventListener("pointerup",l),a.addEventListener("pointercancel",l),a.addEventListener("lostpointercapture",l),a.addEventListener("pointermove",d=>{if(a.hasPointerCapture&&!a.hasPointerCapture(d.pointerId))return;let p=t(a);if(p?.type!=="knob")return;if(At(p.taper,p.min,p.max)){let f=Wt(p.taper,p.min,p.max,r)-(d.clientY-i)/120;p.onChange(so(p.taper,p.min,p.max,f));return}let u=p.max-p.min||1,g=Math.min(p.max,Math.max(p.min,r-(d.clientY-i)*u/120));p.onChange(g)}),a.addEventListener("dblclick",()=>{let d=t(a);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),a.addEventListener("keydown",d=>{let p=t(a);if(p?.type!=="knob")return;let u=Ql(p,d);u!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,u))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(a,c),n.append(ae()),de(n,e),n}function ec(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let a=document.createElement("span");a.className="nc-label nc-choice-caption",a.setAttribute("aria-hidden","true"),a.textContent=e.caption,n.dataset.ncCaption="",n.append(a)}for(let a of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=a.value,o.setAttribute("role","tab"),o.textContent=a.label,o.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(a.value)}),o.addEventListener("keydown",i=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(o),c=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(l+1)%r.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(ae()),Do(n,e),n}function Do(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let a=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",a?"true":"false"),n.tabIndex=a?0:-1}}function tc(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-snap-row",a.setAttribute("role","group"),a.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let u=e.slots[p],g=document.createElement("span");g.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(p),f.textContent=u.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",g.append(f,ge()),nc(g,f,n,p,t),a.append(g)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=Lo(),o.append(ge()),o.addEventListener("click",()=>{Io(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(a,...o?[o]:[]),n.append(d,i,ae()),Po(n,t),qo(n,e),n}function fs(e,t,n,a){let o=n(e);if(o?.type!=="slotRow")return;pt(e);let i=a.shiftKey?"store":a.altKey?"clear":"recall";o.onSlot(t,i)}function nc(e,t,n,a,o){let i=0,r=0,l=0,c=!1,d=!1,p=!1,u=!1,g=()=>{window.clearTimeout(i),i=0},f=m=>{let y=m.clientX-r,b=m.clientY-l;y*y+b*b>ps*ps&&(c=!0,g())},w=()=>{u&&(u=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",h))},v=m=>{let y=i!==0&&!c&&!d;g(),w(),y&&(p=!0,fs(n,a,o,m))},h=()=>{c=!0,g(),w()};e.addEventListener("pointerdown",m=>{m.button===0&&(w(),d=!1,c=!1,p=!1,r=m.clientX,l=m.clientY,g(),i=window.setTimeout(()=>{i=0,!c&&(d=!0,ac(n,t,a,o))},Bl),u=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",h))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(p||d||c){p=!1,d=!1,c=!1;return}fs(n,a,o,m)})}function Po(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let a=gs("Save","store"),o=gs("Clear","clear");n.append(a,o);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),pt(e)}),i.addEventListener("click",r=>r.stopPropagation()),e.append(i,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),pt(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),pt(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&pt(e)})}function gs(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function ac(e,t,n,a){Po(e,a);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.bottom-r.top}px`,o.querySelector("button")?.focus()}function pt(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function qo(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let i=Number(o.dataset.ncSlot),r=t.slots[i];if(!r)continue;o.textContent=r.label,r.filled?o.dataset.filled="true":delete o.dataset.filled,r.active?o.dataset.active="true":delete o.dataset.active,r.edited?o.dataset.edited="true":delete o.dataset.edited,r.queued?o.dataset.queued="true":delete o.dataset.queued,r.queued&&r.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let a=e.querySelector("[data-nc-morph]");a&&(a.textContent=t.morphText)}function Io(e){let t=e.dataset.ncLastFill||null,n=or(t);e.dataset.ncLastFill=n;let a=ir(n);if(a)for(let[o,i]of Object.entries(a))e.style.setProperty(o,i)}function sc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let a=!1,o=i=>{if(a===i)return;a=i,n.setAttribute("aria-pressed",i?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),o(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>o(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||o(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),o(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function oc(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let a=document.createElement("div");a.className="nc-seg",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Step tool");let o=h=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=h,a.append(m),m},i=o("Note"),r=o("Accent");r.dataset.ncAccentMode="";let l=h=>{for(let m of[i,r]){let y=m===h;m.setAttribute("aria-checked",y?"true":"false"),m.tabIndex=y?0:-1}};l(i);for(let h of[i,r])h.addEventListener("click",()=>l(h));a.addEventListener("keydown",h=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(h.key))return;h.preventDefault();let m=r.getAttribute("aria-checked")==="true"?i:r;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(a),e.onFill&&c.append(sc(n,t)),e.onClear){let h=document.createElement("button");h.type="button",h.className="nc-fill nc-clear",h.dataset.ncClear="",h.textContent=e.clearLabel??"Clear",h.title="Clear every step (Undo takes it back)",h.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(h)}n.append(c);for(let h of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=h.label,y.setAttribute("aria-label",`Select ${h.label}`),h.lane&&(y.dataset.ncLane=String((h.lane-1)%4+1));let b=!1,k=0;y.addEventListener("pointerdown",$=>{b=!1,!($.pointerType==="mouse"||$.button!==0)&&(k=window.setTimeout(()=>{let M=t(n);M?.type!=="stepGrid"||!M.selectedRows||(b=!0,M.onSelectRow?.(M.rows.findIndex(z=>z.id===h.id),!0))},Kl))});for(let $ of["pointerup","pointercancel","pointerleave"])y.addEventListener($,()=>window.clearTimeout(k));y.addEventListener("contextmenu",$=>{b&&$.preventDefault()}),y.addEventListener("click",$=>{let M=t(n);if(M?.type!=="stepGrid")return;if(b){b=!1;return}let z=M.rows.findIndex(A=>A.id===h.id),S=!!M.selectedRows&&($.shiftKey||$.metaKey||$.ctrlKey);M.onSelectRow?.(z,S)}),y.addEventListener("keydown",$=>ic(n,y,$));let T=[];for(let $ of["mute","solo"]){if(!($==="mute"?e.onMute:e.onSolo))continue;let M=document.createElement("span");M.className="nc-ms-wrap";let z=document.createElement("button");z.type="button",z.className="nc-ms",z.dataset.ncMs=$,z.textContent=$==="mute"?"M":"S",z.setAttribute("aria-label",`${$==="mute"?"Mute":"Solo"} ${h.label}`),M.append(z,ge()),M.addEventListener("click",()=>{let S=t(n);if(S?.type!=="stepGrid")return;let A=S.rows.findIndex(L=>L.id===h.id);($==="mute"?S.onMute:S.onSolo)?.(A)}),T.push(M)}let E=document.createElement("div");E.className="nc-steps";for(let $=0;$<h.steps.length;$++){let M=document.createElement("span");M.className="nc-step-wrap";let z=document.createElement("button");z.type="button",z.className="nc-step",z.dataset.ncStep=`${h.id}:${$}`,z.setAttribute("aria-label",`${h.label} step ${$+1}`),M.append(z,ge()),M.addEventListener("click",S=>{let A=t(n);if(A?.type!=="stepGrid")return;let L=A.rows.findIndex(P=>P.id===h.id),N=r.getAttribute("aria-checked")==="true";A.onToggle(L,$,S.shiftKey||N)}),E.append(M)}if(e.onLength&&E.append(rc(n,E,h,t)),m.append(...T,y,E),e.onDice){let $=document.createElement("button");$.type="button",$.className="nc-sparkle nc-row-dice",$.dataset.ncDice=h.id,$.setAttribute("aria-label",`Re-roll ${h.label}`),$.title=`Re-roll ${h.label}: new steps for this lane (Undo takes it back)`,$.innerHTML=us(),$.append(ge()),$.addEventListener("click",()=>{let M=t(n);M?.type==="stepGrid"&&M.onDice?.(M.rows.findIndex(z=>z.id===h.id))}),m.append($)}m.addEventListener("click",$=>{if($.target!==m)return;let M=t(n);M?.type==="stepGrid"&&M.onSelectRow?.(M.rows.findIndex(z=>z.id===h.id))}),bs(n,E,".nc-step-wrap",t,r,()=>h.id),n.append(m)}let d=document.createElement("div");d.className="nc-pads-head";let p=(h,m,y)=>{let b=document.createElement("button");return b.type="button",b.className=h,b.textContent=m,y&&b.setAttribute("aria-label",y),b},u=p("nc-pads-step","‹","Previous lane"),g=p("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let h=t(n);h?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",ta(n,h))}));for(let[h,m]of[[u,-1],[g,1]])h.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let b=y.rows.length;y.onSelectRow?.(((Ct(y)+m)%b+b)%b)});if(d.append(u,f,g),e.onDice){let h=p("nc-pads-step nc-pads-dice","","Re-roll lane");h.dataset.ncPadsDice="",h.innerHTML=us(),h.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let y=Ct(m);y>=0&&m.onDice?.(y)}),d.append(h)}if(e.transport){let h=p("nc-pads-play","Play");h.dataset.ncPadsPlay="",h.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(h)}n.append(d);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let v=Math.max(0,...e.rows.map(h=>h.steps.length));for(let h=0;h<v;h++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(h),m.textContent=String(h+1),m.addEventListener("click",y=>{let b=t(n);if(b?.type!=="stepGrid")return;let k=Ct(b);if(k<0)return;if(n.dataset.ncLenMode==="true"){b.onLength?.(k,h+1);return}let T=r.getAttribute("aria-checked")==="true";b.onToggle(k,h,y.shiftKey||T)}),w.append(m)}return bs(n,w,".nc-pad",t,r,()=>{let h=t(n);return h?.type==="stepGrid"?h.rows[Ct(h)]?.id:void 0}),n.append(w),n.append(ae()),ta(n,e),n}function Ct(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function bs(e,t,n,a,o,i){let r="on",l=!0,c=-1,d=(p,u)=>{let g=p.rows[c]?.steps[u];!g||u>=p.rows[c].length||(p.onSet?p.onSet(c,u,r,l):!!g[r]!==l&&p.onToggle(c,u,r==="accent"))};Ll(t,n,p=>{let u=a(e);if(u?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let g=u.rows.findIndex(f=>f.id===i());g>=0&&u.rows[g].length!==p.pad+1&&u.onLength?.(g,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let g=i();c=u.rows.findIndex(w=>w.id===g);let f=u.rows[c]?.steps[p.pad];if(!f)return;r=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[r]}d(u,p.pad)}else if(p.kind==="long"){let g=i(),f=u.rows.findIndex(v=>v.id===g),w=t.querySelectorAll(n)[p.pad];f>=0&&w instanceof HTMLElement&&u.onLongPress?.(f,p.pad,w)}}})}function ic(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let a=[...e.querySelectorAll(".nc-name")],o=a.indexOf(t),i=o;n.key==="ArrowDown"?i=o+1:n.key==="ArrowUp"?i=o-1:n.key==="Home"?i=0:i=a.length-1;let r=a[i];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function rc(e,t,n,a){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(ge());let i=d=>{let p=a(e);if(p?.type!=="stepGrid")return;let u=p.rows.findIndex(w=>w.id===n.id),g=p.rows[u];if(!g)return;let f=Math.max(1,Math.min(g.steps.length,d));f!==g.length&&p.onLength?.(u,f)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],u=1;return p.forEach((g,f)=>{let w=g.getBoundingClientRect();w.width>0&&d>=w.left+w.width/2&&(u=f+1)}),u},l=d=>i(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let p=a(e);if(p?.type!=="stepGrid")return;let u=p.rows.find(f=>f.id===n.id);if(!u)return;let g={ArrowLeft:u.length-1,ArrowDown:u.length-1,ArrowRight:u.length+1,ArrowUp:u.length+1,Home:1,End:u.steps.length};d.key in g&&(d.preventDefault(),i(g[d.key]))}),o}var Sn=new WeakMap,Lt=new WeakMap;function lc(e){return e?(Lt.has(e)||(Lt.set(e,Bn(e)),Ys(t=>{Lt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))ea(n,Number(n.getAttribute("data-nc-velocity")))},e)),Lt.get(e)):"light"}function ea(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,a=n===null?null:lc(e.ownerDocument),o=n===null?null:`${a} ${n}`;if(!(Sn.has(e)&&Sn.get(e)===o)){if(Sn.set(e,o),n===null){for(let i of Object.keys(Ya(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,r]of Object.entries(Ya(n,Ka[a]??Ka.light)))e.style.setProperty(i,r)}}function ys(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function ta(e,t){let n=t.rows.some(p=>p.solo),a=e.querySelector("[data-nc-clear]");a&&a.textContent!==(t.clearLabel??"Clear")&&(a.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),i=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&i&&(r.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,u=t.transport?.label??(p?"Stop":"Play");d.textContent!==u&&(d.textContent=u),d.setAttribute("aria-pressed",p?"true":"false");let g=t.transport?.ariaLabel;g?d.setAttribute("aria-label",g):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&i){o.setAttribute("aria-label",`${i.label} steps`),i.lane&&(o.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?o.dataset.silent="true":delete o.dataset.silent;let p=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let u of o.querySelectorAll("[data-nc-pad]")){let g=Number(u.getAttribute("data-nc-pad")),f=i.steps[g];u instanceof HTMLButtonElement&&(u.hidden=!f||!l&&g>=i.length,l&&g>=i.length?u.dataset.out="true":delete u.dataset.out,l&&g===i.length-1?u.dataset.end="true":delete u.dataset.end,u.setAttribute("aria-label",`${i.label} step ${g+1}${f?.markLabel?`, ${f.markLabel}`:""}`),ys(u,f),u.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?u.dataset.accent="true":delete u.dataset.accent,f?.dim?u.dataset.dim="true":delete u.dataset.dim,ea(u,f?.velocity),t.playhead>=0&&g===p?u.dataset.playhead="true":delete u.dataset.playhead)}}for(let p of t.rows){for(let f=0;f<p.steps.length;f++){let w=p.steps[f],v=e.querySelector(`[data-nc-step="${p.id}:${f}"]`);if(!(v instanceof HTMLButtonElement))continue;let h=v.closest(".nc-row");if(h instanceof HTMLElement){t.selectedRow===p.id?h.dataset.selected="true":delete h.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?h.dataset.picked="true":delete h.dataset.picked;let T=h.querySelector(".nc-name");T instanceof HTMLElement&&(T.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),T.textContent!==p.label&&(T.textContent=p.label,T.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?h.dataset.silent="true":delete h.dataset.silent;for(let E of h.querySelectorAll("[data-nc-ms]")){let $=E.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;E.setAttribute("aria-pressed",$?"true":"false")}}v.setAttribute("aria-pressed",w.on?"true":"false");let m=`${p.label} step ${f+1}${w.markLabel?`, ${w.markLabel}`:""}`;v.getAttribute("aria-label")!==m&&v.setAttribute("aria-label",m),ys(v,w),w.accent?v.dataset.accent="true":delete v.dataset.accent,w.dim?v.dataset.dim="true":delete v.dataset.dim,f%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof w.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),ea(v,w.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;f===y?v.dataset.playhead="true":delete v.dataset.playhead;let b=!!t.onLength&&t.selectedRow===p.id;v.hidden=f>=p.length&&!b,f>=p.length&&b?v.dataset.out="true":delete v.dataset.out}let u=e.querySelector(`[data-nc-len="${p.id}"]`),g=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(u instanceof HTMLElement&&g&&g.nextElementSibling!==u){let f=document.activeElement===u;g.after(u),f&&u.focus()}u instanceof HTMLElement&&(u.setAttribute("aria-valuenow",String(p.length)),u.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),u.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function cc(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let a=document.createElement("canvas");return a.className="nc-canvas",a.dataset.ncId=e.id,a.dataset.ncPaint=e.paint,t.append(n,a,ae()),t}function dc(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let a=document.createElement("div");a.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",r=null;i&&(n.dataset.ncFoldable="",r=Vo(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let b=t(n);b?.type==="strip"&&(b.onFold?.(b.folded!==!0),document.activeElement!==r&&r.focus())})),a.append(o);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let b=document.createElement("span");b.className="nc-strip-grip-dots",b.setAttribute("aria-hidden","true"),l.append(b),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let T=t(n);T?.type==="strip"&&(k.preventDefault(),T.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>xs(n,l,t))),!e.master&&typeof e.onShade=="function"&&a.addEventListener("contextmenu",b=>{b.pointerType==="touch"||b.pointerType==="pen"||b.target instanceof Element&&b.target.closest("input, .nc-strip-remove")||(b.preventDefault(),xs(n,a,t,{x:b.clientX,y:b.clientY}))}),e.onRemove){let b=document.createElement("button");b.type="button",b.className="nc-strip-remove",b.dataset.ncStripRemove="",b.textContent="×",b.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(b)}),a.append(b)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let b=document.createElement("span");b.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",b.append(k,ge()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onHacks?.()}),c.append(b)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let b=document.createElement("span");b.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",b.append(k,ge()),b.addEventListener("click",()=>{let T=t(n);T?.type==="strip"&&T.onSendsView?.()}),d.append(b)}for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let T=document.createElement("button");T.type="button",T.className="nc-ms",T.dataset.ncMs=b,T.textContent=b==="mute"?"M":"S",k.append(T,ge()),k.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(b==="mute"?E.onMute:E.onSolo)?.()}),d.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let b of e.sends??[])p.append(Be({...b,type:"knob",compact:!0},t));let u=document.createElement("div");u.className="nc-strip-pan",e.pan&&u.append(Be(Ma(e),t));let g=document.createElement("div");g.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let b of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(b.value)),k.textContent=b.label,f.append(k)}let w=kr({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:b=>{let k=t(n);k?.type==="strip"&&k.onChange(b)},onReset:()=>{let b=t(n);b?.type==="strip"&&vs(b)}}),v=Cr({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let b=t(n);b?.type==="strip"&&b.onClipClear?.()}});if(g.append(f,w.el,v.el),i){let b=document.createElement("button");b.type="button",b.className="nc-ui-fx-fold nc-strip-fold",b.dataset.ncStripFold="",b.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let T=document.createElement("span");T.className="nc-ui-fx-fold-name",T.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,b.append(k,E,T),b.addEventListener("click",()=>{let $=t(n);if($?.type!=="strip")return;$.onFold?.(!1);let M=n.querySelector("[data-nc-strip-hide]");M instanceof HTMLElement&&M.focus()}),g.prepend(b)}let h=document.createElement("button");h.type="button",h.className="nc-strip-db",h.dataset.ncReadout="";let m=0;h.addEventListener("click",b=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(m),b.detail===0?ws(n,h,t):b.detail===1&&(m=window.setTimeout(()=>ws(n,h,t),hc)))}),h.addEventListener("dblclick",()=>{window.clearTimeout(m);let b=t(n);b?.type==="strip"&&vs(b)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(Be(Ta(e),t)),r&&n.append(r),l&&n.append(l),n.append(a,y,c,d,p,u,g,h,ae()),jo(n,e),n}function Ma(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??uc(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Ta(e){let t=e.trim,n=t.min??-12,a=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:a,step:t.step??.5,value:t.value,valueText:t.valueText??pc(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:o=>t.onChange(o)}}function pc(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function uc(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var hc=250;function ws(e,t,n){let a=n(e);if(a?.type!=="strip"||!a.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=a.valueText??wt(a.value),o.setAttribute("aria-label",`${a.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let i=!1,r=l=>{if(i)return;i=!0;let c=o.value;if(o.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),o.addEventListener("blur",()=>r(!1))}function mc(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let a=document.createElement("span");a.className="nc-strip-add-face",a.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",a.append(o,i);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;Ro(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(a,r,ae()),Bo(n,e),n}function Bo(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let a=e.querySelector("select");if(!(a instanceof HTMLSelectElement))return;a.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...a.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==r&&(a.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),Ro(a))}function Ro(e){let t=e.options[0];t&&(t.selected=!0)}function vs(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function jo(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let a=e.querySelector("[data-nc-strip-remove]");a&&(a.setAttribute("aria-label",`Remove ${t.label}`),a.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),i=o?Er(o):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Lr(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let w=t.valueText??wt(t.value);r.textContent!==w&&(r.textContent=w),r.setAttribute("aria-label",`${t.label} level ${w}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let w of e.querySelectorAll("[data-nc-ms]")){let v=w.getAttribute("data-nc-ms"),h=v==="mute"?t.mute===!0:t.solo===!0;w.setAttribute("aria-pressed",h?"true":"false"),w.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let w=t.hacksLabel??"Hacks";l.textContent!==w&&(l.textContent=w),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${w}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let w=t.sendsViewLabel??"Sends";c.textContent!==w&&(c.textContent=w),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${w}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),Me(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=Oo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let w=e.querySelector(`.nc-strip-trim [data-nc-id="${Ye(t.trim.id)}"]`);w&&de(w,Ta(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let w=e.querySelector(`.nc-strip-pan [data-nc-id="${Ye(t.pan.id)}"]`);w&&de(w,Ma(t))}let u=!t.master&&typeof t.onFold=="function"&&t.folded===!0;u?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let g=e.querySelector("[data-nc-strip-hide]");g instanceof HTMLElement&&(Uo(g,u,t.label),Me(g,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!u,f.setAttribute("aria-label",`Expand ${t.label}`);let w=f.querySelector("[data-nc-strip-fold-name]");w&&w.textContent!==t.label&&(w.textContent=t.label),Me(f,t.foldedHelp??t.foldHelp)}}function Oo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Ho?t:0}var Ho=8,zt=null;function xs(e,t,n,a){zt?.();let o=n(e);if(o?.type!=="strip")return null;let i=e.ownerDocument,r=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=Oo(o),u=e.querySelector("[data-nc-strip-grip]")??t,g=(m=!1)=>{if(zt!==g)return;zt=null;let y=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",w,!0),i.removeEventListener("pointerdown",v,!0),r.removeEventListener("resize",h),(m||y)&&u?.isConnected&&u.focus?.({preventScroll:!0})},f=[0,...Array.from({length:Ho},(m,y)=>y+1)].map(m=>{let y=i.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",m===p?"true":"false"),y.setAttribute("tabindex",m===p?"0":"-1"),y.dataset.ncShadeChoice=String(m),m===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(m),y.setAttribute("aria-label",`Shade ${m}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${m})`)),y.addEventListener("click",()=>{let b=n(e);g(!0),b?.type==="strip"&&b.onShade?.(m===0?null:m)}),y});if(d.append(...f),d.addEventListener("keydown",m=>{let y=f.indexOf(i.activeElement);if(y<0)return;let b=-1;m.key==="ArrowRight"||m.key==="ArrowDown"?b=(y+1)%f.length:m.key==="ArrowLeft"||m.key==="ArrowUp"?b=(y-1+f.length)%f.length:m.key==="Home"?b=0:m.key==="End"&&(b=f.length-1),!(b<0)&&(m.preventDefault(),f[y].setAttribute("tabindex","-1"),f[b].setAttribute("tabindex","0"),f[b].focus())}),l.append(c,d),typeof o.onMove=="function"){let m=[...e.parentElement?.children??[]].filter(b=>b.classList?.contains("nc-strip")&&!b.hasAttribute("data-nc-master")),y=m.indexOf(e);for(let[b,k,T]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=i.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=b<0?"left":"right";let $=i.createElement("span");$.textContent=k;let M=i.createElement("kbd");M.textContent=T,M.setAttribute("aria-hidden","true"),E.append($,M),E.disabled=b<0?y<=0:y<0||y>=m.length-1,E.addEventListener("click",()=>{let z=n(e);g(!0),z?.type==="strip"&&z.onMove?.(b)}),l.append(E)}}i.body.append(l),(()=>{let m=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,b=l.offsetHeight,k=r.innerWidth||i.documentElement.clientWidth||y,T=r.innerHeight||i.documentElement.clientHeight||b,E=a?a.x:m.right-y,$=a?a.y:m.bottom+4;E=Math.max(4,Math.min(E,k-y-4)),$+b>T-4&&($=Math.max(4,(a?a.y:m.top)-b-4)),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round($)}px`})();let w=m=>{if(m.key==="Escape")m.preventDefault(),m.stopPropagation(),g(!0);else if(m.key==="Tab"&&l.contains(i.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),b=(y.indexOf(i.activeElement)+(m.shiftKey?-1:1)+y.length)%y.length;m.preventDefault(),y[b]?.focus()}},v=m=>{l.contains(m.target)||g(!1)},h=()=>g(!1);return i.addEventListener("keydown",w,!0),i.addEventListener("pointerdown",v,!0),r.addEventListener("resize",h),zt=g,(f.find(m=>m.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>g(!1)}}var na=typeof ResizeObserver=="function"?new ResizeObserver(fc):null;function fc(e){for(let t of e){if(!t.target.isConnected){na.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&gc(n)}}function gc(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),a=t instanceof HTMLElement?t.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${a}px`),e.style.setProperty("--nc-fx-pin-h",`${a+o+i}px`)}function bc(e){if(na)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))na.observe(t)}function yc(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let a=document.createElement("h3");a.className="nc-ui-fx-name",a.id=`${e.id}-name`,a.textContent=e.title;let o=typeof e.onFold=="function",i=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!o&&!Xt(e)&&!i&&!r)n.append(a);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(a),i&&l.append(Ko(n,"head")),e.on!==void 0){let c=to({checked:e.on,labelledBy:a.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}o&&l.append(vc(n,t)),Xt(e)&&l.append(Ec(n,t)),r&&l.append(Ac(t)),n.append(l)}o&&n.prepend(xc(n,t)),i&&Yo(n,e);for(let l of e.controls)n.append(Be(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Be(d,t));n.append(l)}return n.append(ae()),Go(n,e),bc(n),n}var wc=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function _o(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),a=e.dataset.ncFolded==="true"&&t&&wc(t)?t:n;a instanceof HTMLElement&&document.activeElement!==a&&a.focus()}function vc(e,t){let n=Vo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(a.onFold?.(a.folded!==!0),_o(e))}),n}function Vo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function Uo(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function xc(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let a=document.createElement("span");a.className="nc-ui-fx-fold-state",a.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,a,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Ko(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),_o(e)}}),n}var Qe=new Set;function Rt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Xt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),$c="(max-width: 768px)";function kc(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Ec(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(kc()),n.addEventListener("click",()=>{let a=t(n);a?.type==="fx"&&(Wo(e,a,!Qe.has(a.id)),n.focus())}),n}function Ac(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function Wo(e,t,n){n?Qe.add(t.id):Qe.delete(t.id),Ca(e,t)}function Sc(e,t){t?.type==="fx"&&Qe.has(t.id)&&Wo(e,t,!1)}function Mc(e){return e.ownerDocument.defaultView?.matchMedia?.($c).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Ca(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),a=Xt(t)&&Qe.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Xt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Rt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Xe(r)})),n.setAttribute("aria-pressed",a?"true":"false"),n.setAttribute("aria-label",`${a?"Restore":"Maximize"} ${t.title}`),n.title=a?"Restore (Esc)":"Maximize",Me(n,t.maxHelp)),!a){e.dataset.ncMax&&$s(e);return}if(!e.isConnected){let r=()=>e.isConnected&&Qe.has(t.id)&&Ca(e,t);queueMicrotask(()=>{e.isConnected?r():Rt(e.ownerDocument,r)});return}let o=Mc(e),i=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&$s(e),e.dataset.ncMax=o,o==="over"&&Tc(e,t)),Cc(e.ownerDocument),o==="over"&&La(e),Rt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Xe(r)})}function $s(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Rt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Xe(n)})}function Tc(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let a=document.createElement("button");a.type="button",a.className="nc-fx-close",a.textContent="×",a.setAttribute("aria-label",`Close ${t.title}`),a.title="Close (Esc)",a.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(a)}function La(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let a=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,i=Number.parseFloat(o?.getComputedStyle(a).columnGap??"")||0,r=Yr(t.getBoundingClientRect(),n.getBoundingClientRect(),a.getBoundingClientRect(),i,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var ks=new WeakSet;function Cc(e){ks.has(e)||(ks.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],a=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");a instanceof HTMLElement&&(t.preventDefault(),a.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&La(t)}))}var aa=new WeakMap;function Ko(e,t){let n=El(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Yo(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)Me(o,t.meterHelp);let a=aa.get(e);a?a.set(t.meter):aa.set(e,Tl(n,t.meter))}function Go(e,t){(t.meter||aa.has(e))&&Yo(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let a=e.querySelector("[data-nc-fx-switch]");a&&a.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(Uo(i,o,t.title),Me(i,t.foldHelp)),Ca(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=o,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),Me(l,t.foldHelp)}}function Me(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Ye(e){return e.replace(/["\\]/g,"\\$&")}function Lc(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let a=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);a?.type==="canvas"&&io(n,a)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Xe(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&La(n);jl(e)}var zc=1e3,Nc=e=>e===!0?"log":typeof e=="string"?e:"linear";function Fc(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let a=e.taper??Nc(e.log),o=At(a,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(o?0:e.min),l.max=String(o?zc:e.max),l.step=o?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",i.append(r,l,c,d);let p=e.value,u=()=>{let f=e.format(p);c.textContent=f,l.setAttribute("aria-valuetext",f)},g=f=>{p=f,n.activeElement!==l&&(l.value=String(o?yt(a,e.min,e.max,p):p)),u()};return l.addEventListener("input",()=>{p=o?Kt(a,e.min,e.max,l.value,e.step):Number(l.value),u(),e.onInput(p)}),o&&l.addEventListener("keydown",f=>{let w=wa(a,e.min,e.max,p,f.key,f.shiftKey,e.step);w===null||l.disabled||(f.preventDefault(),l.value=String(yt(a,e.min,e.max,w)),p=w,u(),e.onInput(p))}),l.disabled=e.disabled===!0,g(e.value),{el:i,set:g,setDisabled(f){l.disabled=f===!0}}}var Dc=Ae["toast-duration"];function Pc({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function qc(e,t,n,a){let o=l=>({top:l,bottom:l+n}),i=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=o(t-a-n);return i(r)?i(o(a))?"bottom":"top":"bottom"}function Ic(e,t,n,a,o,i){let r=e.bottom+o,l=Math.max(i,Math.min(e.left,a-i-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+o,c=!0)}return{top:r,left:l}}var Es="data-nc-ui-toast-live";function Bc(e,t){let n=t.querySelector(`[${Es}]`);return n||(n=e.createElement("div"),n.setAttribute(Es,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Rc({message:e,actionLabel:t,onAction:n,duration:a=Dc,onClose:o,avoid:i=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let u=c.createElement("span");u.className="nc-ui-toast-message",u.textContent=e,p.appendChild(u);let g=null;t&&(g=c.createElement("button"),g.type="button",g.className="nc-ui-toast-action",g.textContent=t,p.appendChild(g)),l.appendChild(p);let f="open",w=q=>q&&typeof q.getBoundingClientRect=="function"?q.getBoundingClientRect():null,v=w(p),h=v?.height||44,m=d.getComputedStyle?.(p),y=Number.parseFloat(m?.getPropertyValue(_("toast-offset")))||16,b=Number.parseFloat(m?.getPropertyValue(_("toast-anchor-gap")))||8,k=w(r),T=d.innerHeight??0,E=i.map(w).filter(Boolean),$=k&&k.bottom>0&&k.top<T?Ic(k,E,{width:v?.width||0,height:h},d.innerWidth??0,b,y):null;$&&$.top+h<=T?(p.setAttribute("data-placement","anchor"),p.style.top=`${$.top+(d.scrollY??0)}px`,p.style.left=`${$.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",qc(E,T,h,y));let M=d.requestAnimationFrame?.bind(d)??(q=>setTimeout(q,16));M(()=>M(()=>{f==="open"&&p.setAttribute("data-state","open")})),Bc(c,l).textContent=Pc({message:e,actionLabel:t});let z,S,A=new Promise(q=>{S=q}),L=q=>{clearTimeout(z),z=setTimeout(()=>U("timeout"),q)},N=a,P=Date.now(),H=()=>{f==="open"&&(clearTimeout(z),N=Math.max(0,N-(Date.now()-P)))},R=()=>{f==="open"&&(P=Date.now(),L(N))};p.addEventListener("pointerenter",H),p.addEventListener("pointerleave",R),p.addEventListener("focusin",H),p.addEventListener("focusout",R),g?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{U("action")}}),Number.isFinite(a)&&L(a);function U(q="close"){if(f!=="open")return;f="closing",clearTimeout(z),p.setAttribute("data-state","closing"),o?.(q);let j=d.getComputedStyle?.(p),V=j?Math.max(0,...String(j.transitionDuration||"").split(",").map(ye=>Number.parseFloat(ye)*(ye.trim().endsWith("ms")?1:1e3)||0)):0,be=()=>{f!=="gone"&&(f="gone",p.remove(),S(q))};p.addEventListener("transitionend",be),setTimeout(be,V+50)}return{el:p,close:U,closed:A}}var vt="data-nc-help";function jc(e,t,n,a=0,o=6,i=8){let r=e.top-o-t.height,l=r>=a+i?"above":"below",c=l==="above"?r:e.bottom+o,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var Mn=new WeakMap;function Oc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Hc({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=Mn.get(e);if(n)return n;let a=e.defaultView,o=null,i=null,r,l=!1,c,d=null,p=!1,u=0,g=()=>{clearTimeout(r),p&&!l&&(u=Date.now()+1500),p=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},f=()=>{g(),clearTimeout(c),i=null,d=null,l=!1},w=($,M)=>{clearTimeout(r),d=M;let z=Date.now()<u?Math.min(t,300):t;r=setTimeout(()=>{i===$&&$.isConnected&&!l&&m($)&&(p=!0)},z)},v=$=>({x:Number($.clientX)||0,y:Number($.clientY)||0}),h=($,M,z)=>!$||Math.hypot($.x-M.x,$.y-M.y)>z,m=($,M)=>{let z=M??$.getAttribute(vt);if(!z)return!1;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=z,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let S=$.getBoundingClientRect(),A=jc(S,{width:o.offsetWidth,height:o.offsetHeight},a.innerWidth,Oc(e));return o.style.top=`${A.top}px`,o.style.left=`${A.left}px`,o.dataset.side=A.side,o.style.visibility="",!0},y=$=>{if(l||$.pointerType==="touch")return;let M=$.target&&$.target.closest?$.target.closest(`[${vt}]`):null;M!==i&&(f(),!(!M||$.buttons)&&(i=M,w(M,v($))))},b=$=>{if(l||$.pointerType==="touch"||!i)return;if($.buttons){g(),d=null;return}let M=v($);p?h(d,M,8)&&(g(),w(i,M)):h(d,M,4)&&w(i,M)},k=$=>{!l&&!$.relatedTarget&&f()},T=$=>{(l||$.key==="Escape")&&f()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",b,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",T),a.addEventListener("scroll",f,!0),a.addEventListener("blur",f);let E={hide:f,pin($,M,{ms:z=0}={}){return f(),!$||!$.isConnected||!m($,M)?!1:(l=!0,o.dataset.pinned="",z>0&&(c=setTimeout(f,z)),!0)},uninstall(){f(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",b),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",T),a.removeEventListener("scroll",f,!0),a.removeEventListener("blur",f),o?.remove(),o=null,Mn.delete(e)}};return Mn.set(e,E),E}var za="netcomposer.rhythm.hidden.v1",we=new WeakMap;function Tn(){try{return globalThis.localStorage??null}catch{return null}}function Jo(e,t=za){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(a=>typeof a=="string"):[])}catch{return new Set}}function As(e,t,n,a=za){let o=Jo(e,a);n?o.add(t):o.delete(t);try{e?.setItem(a,JSON.stringify([...o]))}catch{}}function Na(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],a=o=>{if(n.push(o),o.type==="group")for(let i of o.controls)a(i)};for(let o of t)a(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),o.pan&&n.push(Ma(o)),o.trim&&n.push(Ta(o)));return n}function Xo(e,t){if(!(!e||!t))return Na(e).find(n=>n.id===t)}function _c(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${Na(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(a=>a.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Vc(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let a=document.createElement("h3");a.className="nc-panel-title",a.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(a,o),e.append(n),Qo(e,t)}function Qo(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),a=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");a&&(a.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Uc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=we.get(t),a=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return Xo(n,a)}function Wc(e,t,n){let a=t.sections??[{id:"main",controls:t.controls??[]}],o=_c(t);if(e.dataset.ncSignature===o){for(let i of a){let r=e.querySelector(`[data-nc-section="${Ms(i.id)}"]`);r&&Qo(r,i);for(let l of i.controls){let c=e.querySelector(`[data-nc-id="${Ms(l.id)}"]`);c instanceof Element&&de(c,l)}r instanceof HTMLElement&&sa(r,i,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of a){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=i.id,i.inset&&(r.dataset.ncInset="true"),i.area&&(r.dataset.ncArea=i.area),i.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",i.label)),i.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),i.title&&r.setAttribute("aria-label",i.title)),Vc(r,i);let l=i.panel?document.createElement("div"):r;i.panel&&(l.className="nc-panel-body",r.append(l));for(let c of i.controls)l.append(Be(c,Uc));e.append(r),sa(r,i,n)}}function Zo(e,t,n){let a=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:a,page:Math.min(a-1,Math.max(0,o))}}var Kc="(max-width: 768px)",ei=new WeakMap;function Ss(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let a=document.createElement("span");return a.className="nc-fx-page-icon",a.setAttribute("aria-hidden","true"),t.append(a),t}function Yc(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let a=document.createElement("div");a.className="nc-fx-pager",a.dataset.ncFxPager="",a.setAttribute("role","group"),a.setAttribute("aria-label","Effects pages");let o=Ss("prev"),i=Ss("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),a.append(o,r,i,l);let c=(d,p)=>{let u=ei.get(e);if(!u||p.getAttribute("aria-disabled")==="true")return;let g=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Zo(g,u.pageSize,(t.pages.get(u.id)??0)+d);t.pages.set(u.id,f),u.onPage?.(f),sa(e,{...u,page:f},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===o?i:o).focus(),t.redraw()};return o.addEventListener("click",()=>c(-1,o)),i.addEventListener("click",()=>c(1,i)),e.prepend(a),a}function sa(e,t,n){ei.set(e,t);let a=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:i,page:r}=Zo(a.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,r),i<=1){for(let h of[...e.children])h.classList.contains("nc-fx-pager")&&h.remove();delete e.dataset.ncPaged;for(let h of a)delete h.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Kc).matches===!0,c=e.closest(".nc-module");a.forEach((h,m)=>{let y=Math.floor(m/o)!==r;if(y?h.dataset.ncOffPage="":delete h.dataset.ncOffPage,y&&!l){let b=c instanceof HTMLElement?we.get(c):void 0;Sc(h,Xo(b,h.dataset.ncId))}});let d=Yc(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),u=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),u.setAttribute("aria-disabled",r===i-1?"true":"false");let g=d.querySelector("[data-nc-fx-page-count]"),f=`${r+1} / ${i}`;g.textContent!==f&&(g.textContent=f);let w=d.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${r+1} of ${i}`;w.textContent!==v&&(w.textContent=v)}function Ms(e){return e.replace(/["\\]/g,"\\$&")}function Gc(e,t=za){eo();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let a=Jo(Tn(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=to({labelledBy:i.id,onChange:y=>(we.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",o.append(i,p,r);let u=document.createElement("div");u.className="nc-module-body",u.id=`${e.id}-body`;let g=document.createElement("button");g.type="button",g.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",g.append(f);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,o,u,g),n.setAttribute("aria-labelledby",i.id);let v=y=>{let b=we.get(n)??e;n.dataset.ncOpen=y?"false":"true",u.hidden=y,g.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",u.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${b.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";As(Tn(),(we.get(n)??e).id,y,t),v(y),oa(n.parentElement)}),g.addEventListener("click",()=>{As(Tn(),(we.get(n)??e).id,!1,t),v(!1),oa(n.parentElement)});let h={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(y){we.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),f.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?u.dataset.ncDim="true":delete u.dataset.ncDim,g.setAttribute("aria-label",`Show ${y.title}`),Wc(u,y,h),v(u.hidden),m.redraw()},redraw(){let y=we.get(n);y&&Lc(n,Na(y))}};return we.set(n,e),v(a),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),Ys(()=>m.redraw(),n.ownerDocument),m}function Jc(e,t,n="adjacent"){eo(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let a=n==="stack"?"stack":"adjacent";t.forEach((o,i)=>{let r=i%4+1;o.el.dataset.ncShade=String(r),o.el.dataset.ncPlace=a;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(o.el),o.redraw()}),oa(e)}function oa(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),a=t.map(i=>i.hasAttribute("data-nc-slim")?s("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",a.join(" "));let o=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Xc={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome. Off: Pass 1 starts with the clock.",along:"Sit out: only your passes, the click and what you play. Play along: every instrument's own pattern plays under the song.",start:"How a recording Jam starts. Count-in: a bar of clicks, then the pass. Wait: Jam waits for the first sound, and the pass starts on its beat. Play starts at once.","start-off":"Play starts the loop at once, with the clock. Count-in and Wait apply when Record is on. Your choice is kept.","jam-wait":"Wait for the first sound from any instrument: the loop starts on that beat. With Record on, every lap from it becomes a pass. Space anywhere.",waiting:"Waiting for the first sound. Press again (or Space) to cancel. Nothing is recorded.","pattern-pass":"An instrument's own pattern, recorded once and again when it changes. It doesn't replay while that instrument plays its pattern itself.","mode-play":"Play: the loop plays and you can try things on any instrument. Nothing is recorded.","mode-record":"Record: every lap from the next bar 1 becomes a pass. Pressed in a lap's first beat, that lap. Shift+Space anywhere.","mode-full":"32 passes: delete one to record.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the loop. Play: at once, nothing recorded. Record (an empty song always records): Count-in or Wait as set, then every lap is a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.",normalize:"Normalize: this voice pass at the voice level, the same loudness as the others. Off plays it as recorded. Heard from the next beat.","pass-normalize":"On: the voice pass plays at the voice level (−16 dB loudness, peaks under −3 dB, at most +24 dB). Off: as recorded. The audio itself never changes.","pass-normalize-gain":"What Normalize adds to this voice pass (or takes off a loud one), as LUCY measured it.","normalize-voice":"Turns Normalize on for every voice pass, so they all play at the same loudness.","normalize-undo":"Puts every voice pass's Normalize back as it was before.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",sections:"Parts of your song (Intro, Verse, Chorus), each with its own bars and passes. Tap one, or press 1–9, to play it next.","section-tile":"Play this section next: it starts when the loop ends. Tap again to cancel. Stopped, it's selected at once.","add-section":"A new section, copied from the one selected: its bars and the passes in it. Record into it, or uncheck passes.","in-section":"Checked: this pass plays in the section selected. A pass you record plays only in the section it was recorded in.","section-name":"The section's name. Enter keeps it.","delete-section":"Delete this section. Its passes stay, and its steps leave the song.","song-record":"Records which sections you play, lap by lap, from the next bar 1. Stop ends it and makes it the song.","song-play":"Plays the song you recorded, hands-free, then stops. Tap a section to take over.","song-step":"A step of the song. Click to change how many times it plays, move it or remove it.","song-undo":"Bring back the song before this take.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"Q: this pass's quantize. Q · Song follows the Setup; Q 1/16 is its own grid (1/8T: eighth-note triplets). Notes move on replay; the pass keeps what you played.","pass-strength":"How far this pass's notes move toward its own grid. Following the song, it uses the Setup's Strength.","knob-pass":"The knobs you moved in this lap. They move again on replay. Muted or deleted, each goes back to where it was.",voice:"Records the next whole loop from LUCY's mic as a voice pass, then Lupa is back in Play. Stopped, it starts the jam. No LUCY yet: it adds one.","voice-busy":"Cancel the voice pass. Nothing from this loop is kept.","you-have-it":"You moved this knob, so this pass lets go of it until the lap ends. Then it takes the knob again."};function Fa(e){return Xc[e]??""}const ti="nc-song-looper",Da=10,Qc=[1,2,3,4,5,6,7,8,9,10],Qt=64,ni=-60,ai=24,Zt=9,en=24,tn=64,nn=16,ia=8,si=/^[A-Za-z0-9._-]{1,64}$/,ra=24,la=64,F=960,D=4,se=32,Ie=4e3,Zc=120,ed=120,pn=200,td=e=>Math.max(Zc,Math.min(pn,Math.round(ed/1e3*(e/60)*F))),an=40,sn=240,nd=8,Re=40,un=["off","1/4","1/8","1/8T","1/16","1/32"],ad=["1/4","1/8T"],sd={"1/4":F,"1/8":F/2,"1/8T":F/3,"1/16":F/4,"1/32":F/8},hn=[.5,.75,1],oi=128,xt=e=>e.events.length>0&&e.events.every(t=>t.kind==="take");function ii(e){if(!e.normalize)return null;const t=e.events.find(n=>n.kind==="take");return t&&t.kind==="take"&&typeof t.normDb=="number"?t.normDb:null}const ca=e=>!!e.knobs?.length,le=e=>`${e.inst}|${e.param}`,Te=e=>Math.max(1,Math.floor(e/D)),W=e=>e.bars*D*F,on=D*F;function J(e){return e.sections?.length?e.sections.find(t=>t.id===e.section)??e.sections[0]??null:null}function Cn(e,t,n){if(!e.sections?.length)return!0;const a=n?e.sections.find(o=>o.id===n):J(e);return!a||a.on.includes(t)}function ut(e,t){return e.from===1&&e.to===t?null:{from:e.from,to:e.to}}const Ze=e=>e.to-e.from+1;function od(e){let t=0;for(const n of e.arrangement??[]){const a=e.sections?.find(o=>o.id===n.section);a&&(t+=Ze(a)*n.times)}return t}function ri(e,t){const n=Math.round(e*D*60/t);return`${Math.floor(n/60)}:${String(n%60).padStart(2,"0")}`}function da(e){const t=e.loop;return t?{start:(t.from-1)*on,length:(t.to-t.from+1)*on}:{start:0,length:W(e)}}function gt(e,t){const n=W(t);if(!e.repeat||e.endTick>=n)return[0];const a=[];for(let o=0;o<n;o+=e.endTick)a.push(o);return a}function bt(e,t){if(!e.shift)return 0;const n=W(t),a=e.repeat&&e.endTick<n?e.endTick:n,o=e.shift*on%a;return o<0?o+a:o}function id(e,t){const n=W(t),a=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(a/on)-1)}function rd(e){const t=Math.round(e.bars*D*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function li(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const Pa=Re*2;function ci(e,t=new Date,n=Math.random){const a=Math.min(sn,Math.max(an,Math.round(Number.isFinite(e)?e:80))),o=t.toISOString();return{format:ti,version:Da,id:li(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:o,updatedAt:o,song:{bpm:a,beatsPerBar:D,bars:Math.min(nd,Te(a)),countInBars:1,ppq:F},passes:[],comps:[]}}const ve=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z=e=>Number.isInteger(e),ee=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,Ln=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),oe=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function Ts(e,t){if(e===void 0)return null;if(!ve(e))return"quantize must be an object";const n=oe(e,["grid","strength"]);return n?`quantize has an unknown field (${n})`:!un.includes(e.grid)||t<5&&ad.includes(e.grid)?t<5?"quantize grid is not off, 1/8, 1/16 or 1/32":"quantize grid is not off, 1/4, 1/8, 1/8T, 1/16 or 1/32":hn.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%"}function ld(e){if(!ve(e)||e.format!==ti)return"it isn't a Lupa song";if(!Qc.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=oe(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!ee(e.id))return"its id is missing";if(!ee(e.name,Pa))return"its name is missing";if(!Ln(e.createdAt)||!Ln(e.updatedAt))return"its dates are wrong";const n=e.song;if(!ve(n))return"its song is missing";const a=oe(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop","start","sections","section","arrangement"]);if(a)return`its song has an unknown field (${a})`;const o=cd(n,e.version);if(o)return o;if(n.start!==void 0){if(e.version<7)return"its song has an unknown field (start)";if(n.start!=="wait")return"its start is not Count-in or Wait"}if(!Z(n.bpm)||n.bpm<an||n.bpm>sn)return`its tempo is not ${an}–${sn}`;if(n.beatsPerBar!==D)return"it isn't in 4/4";if(!Z(n.bars)||n.bars<1||n.bars>Te(n.bpm))return`its bars are not 1–${Te(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==F)return`its ticks are not ${F} a beat`;const i=Ts(n.quantize,e.version);if(i)return`its song's ${i}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const d=n.loop;if(!ve(d)||oe(d,["from","to"])||!Z(d.from)||!Z(d.to)||d.from<1||d.to<d.from||d.to>n.bars)return`its loop is not bars 1–${n.bars}`}const r=W(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>se)return`it has more than ${se} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const l=new Set,c=new Set;for(let d=0;d<e.passes.length;d++){const p=e.passes[d],u=`Pass ${d+1}`;if(!ve(p))return`${u} is not an object`;const g=oe(p,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift","knobs","pattern","form","normalize"]);if(g)return`${u} has an unknown field (${g})`;if(p.normalize!==void 0){if(e.version<9)return`${u} has an unknown field (normalize)`;if(typeof p.normalize!="boolean")return`${u}'s normalize is not true or false`}if(p.pattern!==void 0){if(e.version<7)return`${u} has an unknown field (pattern)`;if(p.pattern!==!0)return`${u}'s pattern is not true`;if(p.knobs!==void 0)return`${u} is a pattern and moves knobs`}if(p.form!==void 0){if(e.version<10)return`${u} has an unknown field (form)`;if(p.pattern!==!0)return`${u} has a form but is not a pattern`;if(!ee(p.form,Qt))return`${u}'s form is not 1–${Qt} characters`}const f=new Map;if(p.knobs!==void 0){if(e.version<6)return`${u} has an unknown field (knobs)`;if(!Array.isArray(p.knobs)||!p.knobs.length||p.knobs.length>ia)return`${u}'s knobs are not 1–${ia}`;for(const h of p.knobs){if(!ve(h)||oe(h,["inst","param","label","base"]))return`${u} has a knob that is wrong`;if(!ee(h.inst,64)||!(Array.isArray(p.instruments)&&p.instruments.includes(h.inst)))return`${u} has a knob from an instrument not listed`;if(typeof h.param!="string"||!si.test(h.param))return`${u} has a knob with a bad id`;if(!ee(h.label,ra))return`${u}'s knob ${h.param} has no name`;if(typeof h.base!="number"||!(h.base>=0&&h.base<=1))return`${u}'s knob ${h.param} does not start at 0–1`;const m=`${h.inst}|${h.param}`;if(f.has(m))return`${u} has knob ${h.param} twice`;f.set(m,h)}if(p.quantize!==void 0)return`${u} moves knobs and has a quantize`}if(p.repeat!==void 0&&(e.version<3||typeof p.repeat!="boolean"))return`${u}'s repeat is not true or false`;if(p.shift!==void 0&&(e.version<4||!Z(p.shift)||p.shift===0||Math.abs(p.shift)>la))return`${u}'s shift is not a whole number of bars`;if(!ee(p.id)||l.has(p.id))return`${u} has no id of its own`;if(l.add(p.id),!Z(p.n)||p.n<1||c.has(p.n))return`${u} has no number of its own`;if(c.add(p.n),!ee(p.name,Re))return`${u}'s name is not 1–${Re} characters`;if(!Ln(p.recordedAt))return`${u}'s date is wrong`;if(!Z(p.endTick)||p.endTick<=0||p.endTick>r)return`${u}'s end is not in the song`;for(const h of["kept","mute","solo"])if(typeof p[h]!="boolean")return`${u}'s ${h} is not true or false`;if(typeof p.volume!="number"||!(p.volume>=0&&p.volume<=1))return`${u}'s volume is not 0–1`;if(!Array.isArray(p.instruments)||!p.instruments.every(h=>ee(h,64)))return`${u}'s instruments are wrong`;const w=Ts(p.quantize,e.version);if(w)return`${u}'s ${w}`;if(!Array.isArray(p.events))return`${u}'s events are missing`;if(p.events.length>Ie)return`${u} has more than ${Ie} events`;let v=Number.NEGATIVE_INFINITY;for(let h=0;h<p.events.length;h++){const m=p.events[h],y=`event ${h+1} in ${u}`;if(!ve(m))return`${y} is not an object`;if(!ee(m.inst,64)||!p.instruments.includes(m.inst))return`${y} is from an instrument not listed`;if(!Z(m.at)||m.at<-pn||m.at>=p.endTick)return`${y} is outside the pass`;if(m.at<v)return`${y} is out of order`;if(v=m.at,m.kind==="take"){if(e.version===1)return`${y} is of an unknown kind`;const k=oe(m,["kind","inst","take","at","len","peaks","normDb"]);if(k)return`${y} has an unknown field (${k})`;if(m.normDb!==void 0&&(e.version<9||typeof m.normDb!="number"||!(m.normDb>=ni&&m.normDb<=ai)))return`${y} has a bad normalize gain`;if(!ee(m.take)||m.take.length>128)return`${y} has no take`;if(!Z(m.len)||m.len<1||m.at+m.len>r)return`${y} has a length outside the song`;if(m.peaks!==void 0&&!(Array.isArray(m.peaks)&&m.peaks.length<=oi&&m.peaks.every(T=>typeof T=="number"&&T>=0&&T<=1)))return`${y} has bad peaks`;continue}if(m.kind==="param"){if(e.version<6||!f.size)return`${y} is of an unknown kind`;const k=oe(m,["kind","inst","param","at","value"]);if(k)return`${y} has an unknown field (${k})`;if(typeof m.param!="string"||!f.has(`${m.inst}|${m.param}`))return`${y} moves a knob the pass doesn't list`;if(typeof m.value!="number"||!(m.value>=0&&m.value<=1))return`${y} has a value outside 0–1`;continue}if(f.size)return`${y} is not a knob move in a knob pass`;if(p.pattern===!0&&m.kind!==void 0&&m.kind!=="note")return`${y} is not a note in a pattern pass`;if(m.kind==="slot"){const k=oe(m,["kind","inst","slot","at"]);if(k)return`${y} has an unknown field (${k})`;if(!Z(m.slot)||m.slot<1||m.slot>16)return`${y} has slot ${String(m.slot)}`;continue}const b=oe(m,["kind","inst","note","vel","at","len","slice","name"]);if(b)return`${y} has an unknown field (${b})`;if(m.kind!==void 0&&m.kind!=="note")return`${y} is of an unknown kind`;if(!Z(m.note)||m.note<0||m.note>127)return`${y} has note ${String(m.note)}`;if(typeof m.vel!="number"||!(m.vel>0&&m.vel<=1))return`${y} has velocity ${String(m.vel)}`;if(!Z(m.len)||m.len<1||m.len>r)return`${y} has a length outside the song`;if(m.slice!==void 0&&!(Z(m.slice)&&m.slice>=0&&m.slice<=255))return`${y} has slice ${String(m.slice)}`;if(m.name!==void 0&&!(typeof m.name=="string"&&m.name.length>0&&m.name.length<=Re))return`${y} has a bad sound name`}}return null}function cd(e,t){if(!(e.sections!==void 0||e.section!==void 0||e.arrangement!==void 0))return null;if(t<8)return"its song has an unknown field (sections)";const a=e.sections;if(!Array.isArray(a)||!a.length||a.length>Zt)return`its sections are not 1–${Zt}`;const o=e.bars,i=new Set;for(const r of a){if(!ve(r)||oe(r,["id","name","from","to","on"]))return"a section is wrong";if(!ee(r.id,64)||i.has(r.id))return"a section has no id of its own";if(i.add(r.id),!ee(r.name,en))return`a section's name is not 1–${en} characters`;if(!Z(r.from)||!Z(r.to)||r.from<1||r.to<r.from||r.to>o)return`section ${r.name} is not inside bars 1–${o}`;if(!Array.isArray(r.on)||r.on.length>256||!r.on.every(l=>ee(l)))return`section ${r.name}'s passes are wrong`}if(!ee(e.section,64)||!i.has(e.section))return"the section playing is not one of its sections";if(e.arrangement!==void 0){const r=e.arrangement;if(!Array.isArray(r)||r.length>tn)return`its song order is not 0–${tn} steps`;for(const l of r)if(!ve(l)||oe(l,["section","times"])||!ee(l.section,64)||!i.has(l.section)||!Z(l.times)||l.times<1||l.times>nn)return"a step of its song order is wrong"}return null}function qa(e){const t=ld(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e),a=J(n.song);if(a){const o=ut(a,n.song.bars);o?n.song.loop=o:delete n.song.loop}return n.version=Da,{session:n}}const rn=e=>`${e.note}|${e.at}|${e.slice??""}`,di=30,zn=e=>(e?.events??[]).filter(t=>t.kind!=="slot"&&t.kind!=="take"&&t.kind!=="param"),Ge=new WeakMap;function Cs(e){const t=Ge.get(e);if(!t?.size)return;const n=[...t].sort();if(n.length===1&&n[0].length<=Qt)return n[0];const a=n.join("+");let o=2166136261;for(let i=0;i<a.length;i++)o^=a.charCodeAt(i),o=Math.imul(o,16777619);return`m${(o>>>0).toString(36)}`}function dd(e,t){const n=Ge.get(e);if(n!==null){if(typeof t!="string"||!t.length||t.length>Qt){Ge.set(e,null);return}n?n.add(t):Ge.set(e,new Set([t]))}}function Nt(e,t,n){if(e.length!==t.length)return!1;const a=new Map;for(const o of t)a.set(rn(o),o);if(a.size!==t.length)return!1;for(const o of e){const i=a.get(rn(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>di&&!n?.(o))return!1}return!0}function pd(e,t,n){const a=new Map;for(const o of t)a.set(rn(o),o);for(const o of e){const i=a.get(rn(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>di&&!n?.(o))return!1}return!0}class ud{song;b0;passes;drafts=new Map;held=new Map;knobDrafts=new Map;knobValues=new Map;patternDrafts=new Map;settled=null;amended=!1;redoStack=[];laps=new WeakMap;through=-1;paused=!1;recFrom=0;punched=null;voiceLap=null;voiceCut=null;now;stats={taken:0,ignored:0,overCap:0,empty:0,samePattern:0,late:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/F}get lapTicks(){return da(this.song).length}get lapStart(){return da(this.song).start}get full(){return this.passes.length>=se}hasDraft(t){return t<this.recFrom?!1:(this.drafts.get(t)?.count??0)>0||(this.knobDrafts.get(t)?.events.length??0)>0}place(t){const n=t-this.b0,a=Math.floor(n/this.lapBeats+1e-12);return{lap:a,tick:Math.round((n-a*this.lapBeats)*F)}}get graceTicks(){return td(this.song.bpm)}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-this.graceTicks?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/F}played(t,n){const a=[];for(const o of n){if(o.type==="sound"||o.type==="note"&&o.stopped){this.stats.ignored++;continue}if(o.type==="note"&&!o.on){this.release(t,o.id,o.beat);continue}if(o.type==="note"&&o.pattern){const p=this.patternNote(t,o);p&&a.push(p);continue}if(o.type==="chordPad"||o.type==="lap"||o.type==="voice"){this.stats.ignored++;continue}if(o.type==="take"){const p=this.voicePass(t,o);p&&a.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(o.type==="param"){const p=this.knob(t,o);p&&a.push(p);continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:i,tick:r}=this.placeOn(o.beat);if(i<0||i<=this.through||i===this.voiceLap){this.stats.ignored++;continue}const l=this.drafts.get(i)??{lap:i,events:[],count:0};if(l.events.length>=Ie){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(o.type==="slot")c={kind:"slot",inst:t,slot:o.slot,at:d};else{const p={inst:t,note:o.note,vel:Ft(o.velocity),at:d,len:1};o.slice!==void 0&&(p.slice=o.slice),typeof o.name=="string"&&o.name.trim()&&(p.name=o.name.trim().slice(0,Re)),this.held.set(`${t}|${o.id}`,{ev:p,onBeat:o.beat}),c=p}ke(l.events,c),l.count++,this.drafts.set(i,l),this.stats.taken++,a.push({lap:i,ev:c})}return this.rejudge(),a}patternNote(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:a,tick:o}=this.place(n.beat);if(a===this.voiceLap)return this.stats.ignored++,null;if(a>=0&&a===this.settled?.lap&&a<=this.through)return this.latePattern(t,n,o),null;if(a<0||a<=this.through)return this.stats.ignored++,null;const i=this.patternDrafts.get(a)??new Map,r=i.get(t)??[];if(r.length>=Ie)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+o,len:1};return n.slice!==void 0&&(l.slice=n.slice),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:n.beat}),ke(r,l),dd(r,n.form),i.set(t,r),this.patternDrafts.set(a,i),this.stats.taken++,{lap:a,ev:l}}latePattern(t,n,a){const o=this.settled;if(!o)return;const i={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+a,len:1};n.slice!==void 0&&(i.slice=n.slice);let r=o.byInst.get(t);if(!(r?.pass&&!this.passes.includes(r.pass))){if(r||(r={events:[],pass:null,completed:!1},o.byInst.set(t,r)),r.events.length>=Ie){this.stats.overCap++;return}this.held.set(`${t}|${n.id}`,{ev:i,onBeat:n.beat}),ke(r.events,i),r.form!==void 0&&n.form!==r.form&&(r.form=void 0),r.pass&&r.pass.events!==r.events&&ke(r.pass.events,i),this.stats.late++,r.dirty=!0}}rejudge(){const t=this.settled;if(t)for(const[n,a]of t.byInst){if(!a.dirty)continue;a.dirty=!1;const o=this.lastPattern(n,a.pass??void 0),i=!!o&&(!!a.form&&o.form===a.form||Nt(a.events,zn(o),this.heldNote));if(a.pass){if(i&&!a.completed){const r=this.passes.indexOf(a.pass);r>=0&&this.passes.splice(r,1),a.pass=null,this.stats.samePattern++}this.amended=!0}else!i&&!this.full&&(a.pass=this.patternPass(n,a.events,t.lap,this.lapTicks,a.form),this.amended=!0)}}lastPattern(t,n){let a;for(const o of this.passes)o!==n&&o.pattern&&o.instruments.includes(t)&&(!a||o.n>a.n)&&(a=o);return a}patternLive(t){if(this.paused||this.full)return[];const{lap:n,tick:a}=this.place(t),o=n>this.through&&n>=this.recFrom?this.patternDrafts.get(n):void 0;if(!o)return[];const i=this.lapStart,r=[];for(const[l,c]of o){const d=c.filter(g=>g.at-i<=a);if(!d.length)continue;const p=this.lastPattern(l),u=Cs(c);if(!(p&&u&&p.form===u)){if(p&&!(u&&p.form)){const g=a-F,f=d.filter(v=>v.at-i<=g),w=zn(p).filter(v=>v.at-i<=g);if(Nt(f,w,this.heldNote))continue}r.push({inst:l,events:d})}}return r}snapFirst(t,n,a,o=this.b0){if(!n.on||this.paused||this.full||this.through>=0||this.recFrom>0||this.voiceLap===0)return null;const i=Math.max(0,Math.min(this.lapTicks-1,Math.round((o-this.b0)*F))),r=this.drafts.get(0)??{lap:0,events:[],count:0};if(r.events.length>=Ie)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:Ft(n.velocity),at:this.lapStart+i,len:1};return n.slice!==void 0&&(l.slice=n.slice),typeof n.name=="string"&&n.name.trim()&&(l.name=n.name.trim().slice(0,Re)),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:Math.min(a,o)}),ke(r.events,l),r.count++,this.drafts.set(0,r),this.stats.taken++,{lap:0,ev:l}}knob(t,n){const a=le({inst:t,param:n.param}),o=Ls(n.value),i=this.knobValues.get(a);if(o!==null&&this.knobValues.set(a,o),o===null||!si.test(n.param)||this.paused||this.full)return this.stats.ignored++,null;const{lap:r,tick:l}=this.place(n.beat);if(r<0||r<=this.through||r===this.voiceLap)return this.stats.ignored++,null;const c=this.knobDrafts.get(r)??{lap:r,events:[],knobs:new Map};let d=c.knobs.get(a);if(!d){if(c.knobs.size>=ia)return this.stats.ignored++,null;const g=(n.label??"").trim().slice(0,ra)||n.param.slice(0,ra);d={inst:t,param:n.param,label:g,base:Ls(n.from)??i??o},c.knobs.set(a,d)}let p;for(let g=c.events.length-1;g>=0&&!p;g--){const f=c.events[g];f.inst===t&&f.param===n.param&&(p=f)}if(p&&p.value===o)return null;if(c.events.length>=Ie)return this.stats.overCap++,null;const u={kind:"param",inst:t,param:n.param,at:this.lapStart+l,value:o};return ke(c.events,u),this.knobDrafts.set(r,c),this.stats.taken++,{lap:r,ev:u}}release(t,n,a){const o=`${t}|${n}`,i=this.held.get(o);i&&(this.held.delete(o),i.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((a-i.onBeat)*F))))}seam(t){const n=this.place(t).lap,a=[];for(let o=this.through+1;o<n;o++){if(this.through=o,o<this.recFrom){this.drop(o);continue}a.push(...this.commitPatterns(o,this.lapTicks));const i=this.commit(o,this.lapTicks);i&&a.push(i);const r=this.commitKnobs(o,this.lapTicks);r&&a.push(r)}return a}stop(t){for(const[a,o]of this.held)this.held.delete(a),this.cut.add(o.ev),o.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-o.onBeat)*F)));const n=this.seam(t);return this.settled=null,n.push(...this.part(t)),this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.settled=null,this.cut.clear(),n}punchOut(t){for(const[r,l]of this.held)this.held.delete(r),this.cut.add(l.ev),l.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-l.onBeat)*F)));const n=this.seam(t);this.settled=null;const{lap:a,tick:o}=this.place(t),i=a>=this.recFrom;n.push(...this.part(t)),i&&(this.punched={lap:a,tick:o}),this.recFrom=Number.POSITIVE_INFINITY;for(const r of[...this.drafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.knobDrafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.patternDrafts.keys()])r>this.through&&this.drop(r);return this.cut.clear(),n}recordFrom(t){return this.recFrom=Math.max(t,this.through+1,0),this.recFrom}recordNone(){this.recFrom=Number.POSITIVE_INFINITY}records(t){return t>=this.recFrom}drop(t){const n=this.drafts.get(t);if(n)for(const[o,i]of this.held)n.events.includes(i.ev)&&this.held.delete(o);const a=this.patternDrafts.get(t);if(a)for(const o of a.values())for(const[i,r]of this.held)o.includes(r.ev)&&this.held.delete(i);this.drafts.delete(t),this.knobDrafts.delete(t),this.patternDrafts.delete(t)}part(t){const n=[],{lap:a,tick:o}=this.place(t);if(a>=0&&a>this.through){if(this.through=a,a<this.recFrom)return this.drop(a),n;const i=D*F,r=Math.min(this.lapTicks,Math.max(i,Math.ceil(Math.max(1,o)/i)*i)),l=this.patternDrafts.get(a);if(l)for(const[p,u]of l){const g=u.filter(w=>w.at-this.lapStart<=o),f=Ge.get(u);f!==void 0&&Ge.set(g,f&&new Set(f)),g.length?l.set(p,g):l.delete(p)}n.push(...this.commitPatterns(a,r,o));const c=this.commit(a,r);c&&n.push(c);const d=this.commitKnobs(a,r);d&&n.push(d)}return n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:a,tick:o}=this.place(n.beat),i=a===this.voiceLap,r=i?this.voiceCut:this.punched?.lap===a?this.punched.tick:null;if(a<0||a<this.recFrom&&r===null&&!i||r!==null&&o>=r||!n.take||this.passes.some(u=>u.events.some(g=>g.kind==="take"&&g.take===n.take)))return this.stats.ignored++,null;const l=Math.max(0,Math.min(this.lapTicks-1,o)),c=Math.max(1,Math.min((r??this.lapTicks)-l,Math.round(n.lengthBeats*F))),d={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+l,len:c};Array.isArray(n.peaks)&&n.peaks.length&&(d.peaks=n.peaks.slice(0,oi).map(u=>Number.isFinite(u)?Math.round(Math.max(0,Math.min(1,u))*100)/100:0)),typeof n.normalizeDb=="number"&&n.normalizeDb>=ni&&n.normalizeDb<=ai&&(d.normDb=Math.round(n.normalizeDb*10)/10),this.drafts.set(-1-a,{lap:a,events:[d],count:1});const p=this.commitDraft(-1-a,a,this.lapTicks);return p&&(this.stats.taken++,p.normalize=!0),p}heldNote=t=>this.cut.has(t)||this.isHeld(t);cut=new Set;isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,a){const o=this.drafts.get(n),i=this.knobDrafts.get(n),r=this.patternDrafts.get(n),l=this.lapStart-a;if(Number.isFinite(this.recFrom)&&(this.recFrom=Math.max(0,this.recFrom-n)),this.punched=null,this.voiceLap=null,this.voiceCut=null,this.b0=t,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),r){for(const c of r.values())for(const d of c)d.at+=l;this.patternDrafts.set(0,r)}if(o){for(const c of o.events)c.at+=l;o.lap=0,this.drafts.set(0,o)}if(i){for(const c of i.events)c.at+=l;i.lap=0,this.knobDrafts.set(0,i)}}resume(t){this.b0=t,this.punched=null,this.voiceLap=null,this.voiceCut=null,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,a){const o=this.drafts.get(t);if(this.drafts.delete(t),!o||o.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=o.count,null;const i=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=o.events.filter(d=>d.at-r<a),c={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?W(this.song):a,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}commitPatterns(t,n,a){const o=this.patternDrafts.get(t);if(this.patternDrafts.delete(t),this.settled=a===void 0?{lap:t,byInst:new Map}:null,!o)return[];const i=[],r=this.lapStart;for(const[l,c]of o){const d=c.filter(h=>h.at-r<n);if(!d.length)continue;const p=Cs(c),u={events:d,pass:null,completed:!1};p&&(u.form=p),this.settled?.byInst.set(l,u);const g=this.lastPattern(l),f=zn(g);if(g&&p&&g.form===p){if(!(a===void 0&&this.laps.get(g)===t-1&&(f[0]?.at??Number.NEGATIVE_INFINITY)>(d[0]?.at??0))){this.stats.samePattern++;continue}if(!this.full){const m=this.passes.indexOf(g);m>=0&&this.passes.splice(m,1),u.completed=!0,u.pass=this.patternPass(l,d,t,n,p),i.push(u.pass)}continue}let w=f;if(a!==void 0){const h=d.reduce((y,b)=>Math.max(y,b.at-r),Number.NEGATIVE_INFINITY),m=Math.min(a,h);w=f.filter(y=>y.at-r<=m)}const v=a===void 0?Nt(d,w,this.heldNote):pd(d,w,this.heldNote);if(g&&v){this.stats.samePattern++;continue}if(this.full){this.stats.ignored+=d.length;continue}if(g&&this.laps.get(g)===t-1&&f.length){const h=f[0]?.at??0;if(Nt(d.filter(m=>m.at>=h),f)){const m=this.passes.indexOf(g);m>=0&&this.passes.splice(m,1),u.completed=!0}}u.pass=this.patternPass(l,d,t,n,p),i.push(u.pass)}return i}patternPass(t,n,a,o,i){const r=this.passes.reduce((c,d)=>Math.max(c,d.n),0)+1,l={id:`p${r}-${this.now().getTime().toString(36)}`,n:r,name:`Pass ${r}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?W(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[t],events:n,pattern:!0};return i&&(l.form=i),this.passes.push(l),this.laps.set(l,a),this.redoStack=[],l}patternDrafting(){const t=[];for(const[n,a]of this.patternDrafts)if(n>=this.recFrom)for(const[o,i]of a)t.push({lap:n,inst:o,events:i});return t}commitKnobs(t,n){const a=this.knobDrafts.get(t);if(this.knobDrafts.delete(t),!a?.events.length)return null;if(this.full)return this.stats.ignored+=a.events.length,null;const o=this.lapStart,i=a.events.filter(p=>p.at-o<n);if(!i.length)return null;const r=new Set(i.map(p=>le(p))),l=[...a.knobs.values()].filter(p=>r.has(le(p))),c=this.passes.reduce((p,u)=>Math.max(p,u.n),0)+1,d={id:`p${c}-${this.now().getTime().toString(36)}`,n:c,name:`Pass ${c}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?W(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(p=>p.inst))],events:i,knobs:l.map(p=>({...p}))};return this.passes.push(d),this.laps.set(d,t),this.redoStack=[],d}knobDrafting(){return[...this.knobDrafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events,knobs:[...t.knobs.values()]}))}drafting(){return[...this.drafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events}))}undo(t){this.settled=null;const{lap:n}=this.place(t),a=n>=this.recFrom?this.drafts.get(n):void 0,o=n>=this.recFrom?this.knobDrafts.get(n):void 0;if(a&&a.count>0||o?.events.length){this.drafts.delete(n),this.knobDrafts.delete(n);const l=a??{lap:n,events:[],count:0};for(const[d,p]of this.held)l.events.includes(p.ev)&&this.held.delete(d);const c={kind:"lap",draft:l,...o?.events.length?{knobs:o}:{}};return this.redoStack.push(c),c}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}undoPass(t){const n=this.passes.indexOf(t);if(n<0)return null;this.passes.splice(n,1);const a={kind:"pass",pass:t};return this.redoStack.push(a),a}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const l=this.passes.findIndex(c=>c.n>n.pass.n);return l<0?this.passes.push(n.pass):this.passes.splice(l,0,n.pass),n}const{lap:a}=this.place(t);if(n.draft.lap===a||n.draft.lap>this.through){const l=this.drafts.get(n.draft.lap);if(l)for(const c of n.draft.events)ke(l.events,c);else n.draft.count&&this.drafts.set(n.draft.lap,n.draft);if(l&&(l.count+=n.draft.count),n.knobs){const c=this.knobDrafts.get(n.knobs.lap);if(!c)this.knobDrafts.set(n.knobs.lap,n.knobs);else{for(const d of n.knobs.events)ke(c.events,d);for(const[d,p]of n.knobs.knobs)c.knobs.has(d)||c.knobs.set(d,p)}}return n}n.draft.count&&this.drafts.set(n.draft.lap,n.draft),n.knobs&&this.knobDrafts.set(n.knobs.lap,n.knobs);const o=this.commit(n.draft.lap,this.lapTicks),i=this.commitKnobs(n.draft.lap,this.lapTicks),r=o??i;return r?{kind:"pass",pass:r}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function Ls(e){return typeof e!="number"||!Number.isFinite(e)?null:Math.round(Math.max(0,Math.min(1,e))*1e4)/1e4}function Ft(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function ke(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const zs=.5,hd=64,Fe="draft:",md=12;function Ns(e,t){const n=t&&t.grid!=="off"?sd[t.grid]:void 0;if(!t||!n)return e;const a=Math.round(e/n)*n;return Math.round(e+(a-e)*t.strength)}function ct(e,t){return e.mute?!1:t?e.solo:!0}const Fs=e=>e.kind==="slot",Nn=e=>e.kind==="take",Fn=e=>e.kind==="param",fd=.25,gd=4,bd=.05;class yd{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;live=null;knobs=new Map;hands=new Map;resend=new Map;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0,params:0,live:0,byInst:{}};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.restart()}forgetKnobs(){this.knobs.clear(),this.hands.clear(),this.resend.clear()}rebase(t){for(const[n,a]of this.takesSent)a<=t+1e-9&&this.takesSent.delete(n);this.hands.clear();for(const n of this.knobs.values())n.fresh=!1;this.rung=this.rung.filter(n=>!n.pass.startsWith(Fe))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;for(const a of this.knobs.values())a.fresh=!1;this.silence(t);const n=[...this.takesSent.values()].some(a=>a>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(a=>a.beat<t);for(const[a,o]of this.takesSent)o>t&&this.takesSent.delete(a);for(const[a,o]of this.sounding)this.sounding.set(a,o.filter(i=>i.start<t))}}pump(t,n,a){const o=this.rec,i=[];if(this.waiting.length){const S=[];for(const A of this.waiting){if(o.isHeld(A.ev)){S.push(A);continue}if(A.beat>=t)i.push(A);else{const L=Math.min(A.ev.len,this.rec.lapTicks)/F-(t-A.beat);L>.05&&i.push({...A,beat:t,lenBeats:L})}}this.waiting=S}const r=Math.max(this.sentTo,t);if(!(n>r)&&!i.length&&!this.lateTakes(t))return 0;const l=a?.lapTicks??o.lapTicks,c=l/F,d=a?.lapStart??o.lapStart,p=d+l,u=a?.b0??o.b0,g=(S,A)=>u+S*c+(A-d)/F,f=S=>S>=d-pn&&S<p,w=Math.max(0,Math.floor((r-u)/c)-1),v=Math.floor((n-u)/c)+1,h=[],m=(S,A,L)=>{const N=L+S.at;if(!f(N))return;const P=g(A,N);P>=r&&P<n&&h.push({inst:S.inst,beat:P,slot:S.slot})},y=[],b=(S,A,L,N,P=Number.NEGATIVE_INFINITY,H=Number.POSITIVE_INFINITY)=>{const R=N,U=R+A.at,q=Math.min(U+A.len,R+S.endTick,H),j=Math.max(U,d,P),V=Math.min(q,p);if(V<=j)return;const be=g(L,j),ye=g(L,V),it=`${S.id}|${L}|${R}`;if(this.takesSent.has(it)||ye<=t||be>=n)return;const Ne=Math.max(be,t);if(ye-Ne<bd)return;const rt=(j-U)/F+(Ne-be),He={type:"take",id:`t${++this.serial}`,beat:Ne,take:A.take,lengthBeats:rt+(ye-Ne),gain:Math.max(0,Math.min(1,S.volume))};rt>1e-9&&(He.offsetBeats=rt),S.normalize&&(He.normalize=!0),this.takesSent.set(it,ye),y.push({inst:A.inst,ev:He})},k=S=>Cn(this.song,S.id,a?.section),T=o.passes.filter(k),E=T.some(S=>S.solo&&!S.mute),$=(S,A,L,N,P,H,R,U=!1)=>{if(!f(P))return;const q=g(H,P);if(q>=r&&q<n){if(U&&this.live?.(A,q)){this.stats.live++;return}o.isHeld(N)?this.waiting.push({inst:A,age:L,beat:q,ev:N,velocity:R,pass:S}):i.push({inst:A,age:L,beat:q,ev:N,velocity:R,pass:S})}};for(const S of T){if(!ct(S,E))continue;const A=a?void 0:o.lapOf(S),L=A===void 0?0:A+1,N=S.quantize??this.song.quantize,P=gt(S,this.song),H=bt(S,this.song),R=P.length>1?S.endTick:W(this.song),U=q=>{const j=q+H;return H&&j>=R?j-R:j};for(let q=Math.max(L,w);q<=v;q++)for(const j of P)for(const V of S.events)if(!(V.at>=S.endTick)){if(Fs(V)){m(V,q,j+U(V.at)-V.at);continue}if(!Fn(V)){if(Nn(V)){H?(b(S,V,q,j+H,j,j+R),b(S,V,q,j+H-R,j,j+R)):b(S,V,q,j);continue}$(S.id,V.inst,S.n,V,j+U(Ns(V.at,N)),q,V.vel*S.volume,S.pattern===!0)}}}if(!E)for(const S of o.drafting())for(let A=Math.max(a?0:S.lap+1,w);A<=v;A++)for(const L of S.events){if(Fs(L)){m(L,A,0);continue}Nn(L)||Fn(L)||$(`${Fe}${S.lap}`,L.inst,Number.POSITIVE_INFINITY,L,Ns(L.at,this.song.quantize),A,L.vel)}if(this.announceLaps){const S=[];for(let A=Math.max(0,Math.ceil((r-u)/c));u+A*c<n;A++)S.push({type:"lap",id:`l${++this.serial}`,beat:u+A*c,lengthBeats:c});S.length&&(this.sink.laps(S),this.stats.laps+=S.length)}if(this.pumpKnobs(t,r,n,{b0:u,L:c,cs:d,ce:p,beatAt:g,inCycle:f,lapLo:w,lapHi:v,loopChange:!!a}),this.sentTo=Math.max(this.sentTo,n),y.length){const S=new Map;for(const A of y)S.set(A.inst,[...S.get(A.inst)??[],A.ev]);for(const[A,L]of S)this.sink.controls(A,L);this.stats.takes+=y.length}if(h.length){h.sort((A,L)=>A.beat-L.beat);const S=new Map;for(const A of h){const L=S.get(A.inst)??[];L.push({type:"slot",id:`s${++this.serial}`,beat:A.beat,slot:A.slot}),S.set(A.inst,L)}for(const[A,L]of S)this.sink.controls(A,L);this.stats.slots+=h.length}if(!i.length)return 0;i.sort((S,A)=>S.beat-A.beat||A.age-S.age);const M=new Map;for(const S of i){const A=S.lenBeats??Math.max(1,Math.min(S.ev.len,l))/F;if(!this.voice(S.inst,S.beat,S.beat+A,S.age)){this.stats.dropped++;continue}const L={note:S.ev.note,velocity:Math.max(.01,Math.min(1,S.velocity)),startBeat:S.beat,lengthBeats:A,spanBeats:A,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:S.ev.note};S.ev.slice!==void 0&&(L.slice=S.ev.slice),this.rung.push({inst:S.inst,pass:S.pass,note:L});const N=M.get(S.inst)??[];N.push(L),M.set(S.inst,N)}let z=0;for(const[S,A]of M)this.sink.send(S,A),z+=A.length,this.stats.byInst[S]=(this.stats.byInst[S]??0)+A.length;return this.stats.sent+=z,z}knobSources(t){const n=this.rec,a=n.passes.filter(r=>Cn(this.song,r.id)),o=a.some(r=>r.solo&&!r.mute),i=[];for(const r of a){if(!ca(r)||!ct(r,o))continue;const l=t?void 0:n.lapOf(r);i.push({id:r.id,age:r.n,first:l===void 0?0:l+1,endTick:r.endTick,...r.repeat?{repeat:!0}:{},...r.shift?{shift:r.shift}:{},knobs:r.knobs??[],events:r.events.filter(Fn)})}if(!o)for(const r of n.knobDrafting())i.push({id:`${Fe}${r.lap}`,age:1e9+r.lap,first:t?0:r.lap+1,endTick:W(this.song),knobs:r.knobs,events:r.events});return i}driver(t,n,a){let o=null;for(const i of t)i.first<=a&&i.knobs.some(r=>le(r)===n)&&(!o||i.age>o.age)&&(o=i);return o}curve(t,n){const a=t.knobs.find(l=>le(l)===n),o=fd*this.song.bpm*F/60,i=[];let r=null;for(const l of t.events){if(le(l)!==n||l.at>=t.endTick)continue;const c=r===null?Number.POSITIVE_INFINITY:l.at-r;i.push({at:l.at,value:l.value,...c>0&&c<=o?{glide:Math.min(gd,c/F)}:{}}),r=l.at}return{base:a?.base??i[0]?.value??0,points:i}}valueAt(t,n,a){const o=bt(t,this.song),i=gt(t,this.song).length>1,r=i?t.endTick:W(this.song);let l=i?a-Math.floor(a/r)*r:a;l-=o,l<0&&(l+=r);let c=n.base;for(const d of n.points){if(d.at>l)break;c=d.value}return c}knobMarks(t,n){const a=gt(t,this.song),o=bt(t,this.song),i=a.length>1?t.endTick:W(this.song),r=c=>{const d=c+o;return o&&d>=i?d-i:d},l=[];for(const c of a){l.push({t:c+r(0),value:n.base});for(const d of n.points)l.push({t:c+r(d.at),value:d.value,...d.glide?{glide:d.glide}:{}})}return l}pumpKnobs(t,n,a,o){for(const[c,d]of this.hands)d.until<=t&&this.hands.delete(c);const i=this.knobSources(o.loopChange),r=new Map;for(const c of this.knobs.values())r.set(le(c),c);for(const c of i)for(const d of c.knobs)r.set(le(d),d);if(!r.size)return;const l=new Map;for(const[c,d]of r){const p=this.resend.get(c);this.resend.delete(c);const u=p!==void 0?Math.min(n,Math.max(p,t)):n;if(!(a>u))continue;const g=this.hands.get(c),f=y=>!!g&&y>=g.from-1e-9&&y<g.until-1e-9;let w=this.knobs.get(c);const v=[],h=Math.max(0,Math.min(o.lapLo,Math.floor((u-o.b0)/o.L)-1));for(let y=h;y<=o.lapHi;y++){const b=o.beatAt(y,o.cs);if(o.beatAt(y,o.ce)<=u||b>=a)continue;const T=this.driver(i,c,y),E=Math.max(u,b);if(!T){w?.driver&&(f(E)||v.push({beat:E,value:w.base}),w.driver=null);continue}const $=this.curve(T,c);if(w||(w={inst:d.inst,param:d.param,driver:null,base:$.base,fresh:!1},this.knobs.set(c,w)),w.driver!==T.id||!w.fresh){const M=o.cs+(E-b)*F;f(E)||v.push({beat:E,value:this.valueAt(T,$,M)}),w.driver=T.id,w.base=$.base,w.fresh=!0}b>=u&&b<a&&!f(b)&&v.push({beat:b,value:this.valueAt(T,$,o.cs)});for(const M of this.knobMarks(T,$)){if(!o.inCycle(M.t)||M.t<o.cs)continue;const z=o.beatAt(y,M.t);z<u||z>=a||f(z)||v.push({beat:z,value:M.value,...M.glide?{glide:M.glide}:{}})}}if(!v.length)continue;v.sort((y,b)=>y.beat-b.beat);const m=l.get(d.inst)??[];for(let y=0;y<v.length;y++){const b=v[y],k=v[y+1];k&&Math.abs(k.beat-b.beat)<1e-9||m.push({type:"param",id:`k${++this.serial}`,beat:b.beat,param:d.param,value:b.value,...b.glide?{glide:b.glide}:{}})}l.set(d.inst,m)}for(const[c,d]of l)d.length&&(d.sort((p,u)=>p.beat-u.beat),this.sink.controls(c,d),this.stats.params+=d.length)}hand(t,n,a){if(this.sentTo===Number.NEGATIVE_INFINITY)return null;const o=le({inst:t,param:n}),i=this.rec,{lap:r}=i.place(a),l=i.beatOf(r+1,0),c=this.hands.get(o);if(c&&Math.abs(c.until-l)<1e-9)return this.sentTo>l&&this.resend.set(o,l),c;const d=this.driver(this.knobSources(!1),o,r);if(!d)return null;const p={inst:t,param:n,driver:d.id,from:a,until:l};return this.hands.set(o,p),this.sentTo>l&&this.resend.set(o,l),p}handsAt(t){const n=[];for(const a of this.hands.values()){if(t<a.from-1e-9||t>=a.until)continue;let o=a.driver;if(o.startsWith(Fe)){const i=Number(o.slice(Fe.length));o=this.rec.passes.find(r=>ca(r)&&this.rec.lapOf(r)===i)?.id??null}n.push({...a,pass:o})}return n}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-hd),!this.rung.length||!this.sink.release)return;const n=this.rec.passes.filter(c=>Cn(this.song,c.id)),a=n.some(c=>c.solo&&!c.mute),o=new Map(n.map(c=>[c.id,c])),i=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(Fe)){const p=Number(c.slice(Fe.length));if(i.has(p))return!a;const u=n.find(g=>this.rec.lapOf(g)===p);return!!u&&ct(u,a)}const d=o.get(c);return!!d&&ct(d,a)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,a=Math.floor((t-n.b0)/n.lapBeats),o=n.passes.some(i=>i.solo&&!i.mute);return n.passes.some(i=>{if(!ct(i,o)||!i.events.some(Nn))return!1;const r=n.lapOf(i);return r===void 0||a>r})}voice(t,n,a,o){const i=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(i.length>=md){let r=0;for(let l=1;l<i.length;l++)i[l].age<i[r].age&&(r=l);if(o<=i[r].age)return this.sounding.set(t,i),!1;i.splice(r,1)}return i.push({start:n,end:a,age:o}),this.sounding.set(t,i),!0}}const Ds=8,wd=.3,vd=2*D,xd={running:!1,beatAt:()=>0,timeAt:()=>0};class $d{session;rec;replay;deps;wantJam=!1;along=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];listening=!1;soundOff=null;recent=[];starting=null;snap=null;startedBy=null;countedIn=!0;countFrom=0;armedKey=-1;liveCount=0;recOn;patterns=new Map;voiceJob=null;voiceSerial=0;voiceKey="";constructor(t,n){this.session=t,this.deps=n,this.rec=new ud({song:t.song,b0:0,passes:t.passes,now:n.date}),this.recOn=t.passes.length===0,this.placed=new Set(t.passes.map(i=>i.id)),this.replay=n.sink?new yd(this.rec,n.sink):null,this.replay&&(this.replay.live=(i,r)=>this.live(i,r));const a=n.host;a?.clock&&this.offs.push(a.clock.onChange(i=>this.clockChanged(i))),a?.onPlayed&&this.offs.push(a.onPlayed((i,r)=>this.played(i,r))),a?.claimKeys&&this.offs.push(a.claimKeys(["Space","Backspace"],i=>(i.code==="Space"&&i.shiftKey?this.toggleRecord():i.code==="Space"?this.toggle():i.shiftKey?this.redo():this.undo(),!0)));const o=a?.studioTransport?.take;o&&this.offs.push(o(a.instance??"looper",{name:"Lupa",press:()=>this.toggle(),state:()=>this.listening?"waiting":this.jamming||this.wantJam||this.starting?"playing":"stopped",onChange:i=>this.onChange(i)})),this.along=n.along?.get()===!0,this.syncTempo()}setAlong(t){if(this.along!==t){this.along=t;try{this.deps.along?.set(t)}catch{}t&&(this.jamming||this.wantJam)&&this.deps.host?.studioTransport?.play(),this.changed(!1)}}startClock(){const t=this.deps.host,n=t?.studioTransport;n&&(this.along||!n.playOnly?n.play():n.playOnly(t.instance??"looper"))}get transport(){return this.deps.host?.clock?.transport??xd}get graceBeats(){return this.rec.graceTicks/F}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){this.placeNewPasses(),t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(sn,Math.max(an,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Te(n)),this.clampSections(),this.changed())}toggle(){this.waiting?this.cancelWait():this.jamming||this.wantJam?this.stop():this.jam()}get waiting(){return this.listening||this.starting!==null}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}this.syncTempo(),this.notice="";const n=this.voiceJob?.phase==="starting";if(!this.session.passes.length&&!n&&(this.recOn=!0),n){if(this.recOn=!1,this.transport.running){const i=Math.ceil(this.beatNow()/D+.05)*D;this.begin(i,!0)}else this.wantJam=!0,t.metronome?.want(!0),this.startClock();this.changed(!1);return}if(this.recOn&&this.session.song.start==="wait"){if(t.onSound){this.wait();return}this.notice="Wait needs a newer Studio. Counting in."}if(this.transport.running){this.along&&t.studioTransport.play();const o=Math.ceil(this.beatNow()/D+.05)*D;this.begin(o,this.recOn)}else this.wantJam=!0,t.metronome?.want(!0),this.startClock();this.changed(!1)}wait(){const t=this.deps.host;if(!t?.onSound)return;this.recent=[],this.listening=!0;let n=null;try{n=t.onSound(a=>this.heard(a))}catch{n=null}this.listening?this.soundOff=n:n?.(),this.changed(!1)}stopListening(){this.listening=!1;const t=this.soundOff;this.soundOff=null;try{t?.()}catch{}}cancelWait(){const t=this.starting!==null;this.stopListening(),this.starting=null,this.recent=[],t&&this.transport.running&&this.deps.host?.studioTransport?.stop(),this.changed(!1)}heard(t){if(!this.listening)return;this.startedBy=t;const n=this.deps.host;if((t.kind==="start"||t.kind==="in")&&t.from!=="studio"&&t.beat!==null&&this.markLive(t.from,t.beat),t.stopped||t.beat===null||!this.transport.running){this.stopListening(),this.starting={at:t.at,from:t.from,lead:[]};for(const i of this.recent)i.at>=t.at-.1&&this.starting.lead.push(i);this.recent=[],this.startClock(),this.changed(!1);return}const a=t.kind==="start"||t.kind==="in"?t.beat:Math.floor((t.beat+this.graceBeats)/D)*D;this.stopListening();const o=this.recent;this.recent=[],this.along&&n?.studioTransport?.play(),this.begin(a,!1);for(const i of o){const r=i.events.filter(l=>!(l.type==="note"&&l.stopped)&&l.beat>=a-this.graceBeats);r.length&&this.record(i.source,r)}this.changed(!1)}startFromSound(t){const n=this.starting;if(this.starting=null,!n)return;this.begin(t,!1);const a=this.transport.timeAt(t),o=Math.max(1e-6,this.transport.beatAt(a+1)-t);this.snap={b0:t,first:null,t0:a,bps:o,until:a+.25};for(const i of n.lead)this.snapPlayed(i.source,i.events,i.at);this.changed(!1)}snapPlayed(t,n,a){const o=this.snap;if(!o)return[...n];const i=[],r=o.b0+(a-o.t0)*o.bps;for(const l of n){const c=l.type==="note"&&l.stopped||l.type==="note"&&l.beat<o.b0-1e-9;if(l.type!=="note"||!c){i.push(l);continue}if(!l.on){this.rec.played(t,[{...l,stopped:!1,beat:Math.max(r,o.b0)}]);continue}o.first===null&&(o.first=a);const d=o.b0+Math.max(0,a-o.first)*o.bps;this.rec.snapFirst(t,{...l,stopped:!1},Math.min(r,d),d)&&this.changed(!1)}return i}markLive(t,n){const a=this.patterns.get(t);!a||n>a.last+D+1e-6||n<a.from-D?this.patterns.set(t,{from:n,last:n}):(a.last=Math.max(a.last,n),a.from=Math.min(a.from,n))}live(t,n){const a=this.patterns.get(t);return!!a&&n>=a.from-1e-6&&n<=a.last+D+1e-6}begin(t,n=!0,a){this.wantJam=!1,this.jamming=!0,this.snap=null;const o=this.voiceJob?.phase==="starting",i=o?Math.max(1,this.session.song.countInBars):n?this.session.song.countInBars:0,r=t+i*D;if(this.countFrom=t,this.countedIn=r>t,this.rec.resume(r),this.recOn&&!this.rec.full?this.rec.recordFrom(0):this.rec.recordNone(),this.replay?.start(),this.transport.running){const l=a??Math.min(t,this.beatNow());this.replay?.pump(l,this.transport.beatAt(this.deps.now()+zs))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,r),o&&this.armVoice(0)}showCountIn(t,n){const a=this.deps.host;if(!this.deps.countIn||!a?.mapper||n<=t)return;const o=this.transport,i=l=>a.mapper?.toContextTime(o.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(i(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%D===0),until:i(n)})}catch{}}stop(){if(this.waiting){this.cancelWait();return}const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.snap=null,this.pending&&((this.pending.section===void 0||this.pending.section===this.session.song.section)&&this.applyLoop(this.pending.loop),this.pending=null),this.stopAt=null,this.songPlay=null,this.songRec&&this.endSongRecord();const n=this.voiceJob;if(n&&(n.phase==="starting"||n.phase==="armed"))this.cancelVoice(!0);else if(n&&n.phase==="recording"){const a=Math.max(0,Math.min(n.lengthBeats,t-n.beat));this.rec.voiceCut=Math.round(a*F),n.cutAt=a/n.lengthBeats,n.phase="after",n.until=this.deps.now()+Ds}this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.recOn=this.session.passes.length===0,this.rec.recFrom=0,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){const n=typeof t.beat=="number"?t.beat:0;t.kind==="start"&&this.starting?this.startFromSound(n):t.kind==="start"&&this.wantJam?this.begin(n,this.recOn||this.voiceJob?.phase==="starting"):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),(t.kind==="stop"||t.kind==="snapshot"&&!this.transport.running)&&(this.patterns.clear(),this.starting&&(this.starting=null,this.recent=[])),this.changed(!1)}get recording(){return this.recOn}get startApplies(){return this.recOn||!this.session.passes.length}toggleRecord(){this.setRecord(!this.recOn)}setRecord(t){if(!t&&this.voiceJob&&this.voiceJob.phase!=="after"&&(this.cancelVoice(!0),!this.recOn)||t===this.recOn)return;if(t&&this.rec.full){this.notice=`${se} passes: delete one to record.`,this.changed(!1);return}if(this.recOn=t,this.notice="",!t&&this.listening&&this.session.passes.length){this.stopListening(),this.recent=[],this.jam();return}if(!(this.jamming&&this.transport.running)){this.changed(!1);return}const a=this.beatNow();if(!t&&this.countedIn&&a<this.rec.b0-1e-9){this.playNow(a);return}if(t){const{lap:i,tick:r}=this.rec.place(a);this.rec.recordFrom(a<this.rec.b0?0:r<F?i:i+1),this.changed(!1);return}if(!this.rec.records(this.rec.place(a).lap)){this.rec.recordNone(),this.changed(!1);return}const o=this.rec.punchOut(a);this.replayChanged(),this.changed(o.length>0)}playNow(t){try{this.deps.countIn?.clear("looper")}catch{}this.begin(this.countFrom,!1,t),this.changed(!1)}played(t,n){for(const l of n)l.type==="voice"&&this.voiceNews(t,l);const a=n.some(l=>l.type==="voice")?n.filter(l=>l.type!=="voice"):n;if(!a.length)return;const o=this.voiceJob;if(!this.jamming&&o&&o.lucy===t&&a.some(l=>l.type==="take")){this.voiceTake(t,a.filter(l=>l.type==="take"));return}for(const l of a)l.type==="note"&&l.on&&l.pattern&&!l.stopped&&this.markLive(t,l.beat);const i=this.deps.now();if(this.starting){this.starting.lead.push({source:t,events:a,at:i});return}if(this.listening){this.keepRecent(t,a,i);return}if(!this.jamming)return;const r=this.snap?this.snapPlayed(t,a,i):a;this.snap&&i>this.snap.until&&(this.snap=null),r.length&&this.record(t,r)}keepRecent(t,n,a){const o=this.transport.running?this.beatNow():null;this.recent.push({source:t,events:n,at:a}),o!==null&&(this.recent=this.recent.filter(i=>i.events.some(r=>r.beat>=o-vd))),this.recent.length>256&&this.recent.splice(0,this.recent.length-256)}record(t,n){let a=!1;if(this.replay)for(const i of n)i.type==="param"&&this.replay.hand(t,i.param,i.beat)&&(a=!0);const o=this.rec.played(t,n);if(this.rec.amended){this.rec.amended=!1,this.changed();return}a&&!o.length&&this.changed(!1),this.voiceAdded(t,o),o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}voiceView(t){const n=this.voiceJob;if(!n)return null;const a=Math.max(1,Math.round(n.lengthBeats/D));let o=null,i=null;return n.phase==="recording"&&t!==null&&Number.isFinite(n.beat)?(o=Math.max(0,Math.min(1,(t-n.beat)/n.lengthBeats)),i=Math.min(a,Math.floor((t-n.beat)/D)+1)):n.phase==="after"&&(o=n.cutAt??1),{phase:n.phase,n:n.n,bar:i,bars:a,peaks:n.peaks,pos:o,lucy:n.lucy,from:this.rec.lapStart,ticks:this.rec.lapTicks}}get voicing(){return this.voiceJob!==null}voicePass(t){if(this.voiceJob)return!1;const n=this.deps.host;if(!n?.studioTransport||!n.clock)return this.notice="Jam works inside the Studio.",this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.rec.full)return this.notice=`${se} passes: delete one to record.`,this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.waiting&&this.cancelWait(),this.voiceJob={lucy:t,phase:"starting",lap:-1,beat:Number.NaN,lengthBeats:this.rec.lapBeats,n:this.nextPassNumber(),peaks:[],until:0,cutAt:null},this.notice="",!this.jamming&&!this.wantJam)return this.jam(),!0;if(this.wantJam||!this.transport.running)return this.changed(!1),!0;const a=this.beatNow();let o=a<this.rec.b0?0:this.rec.place(a).lap+1;return this.transport.timeAt(this.rec.beatOf(o,0))-this.deps.now()<wd&&o++,this.armVoice(o),!0}nextPassNumber(){return this.session.passes.reduce((t,n)=>Math.max(t,n.n),0)+1}armVoice(t){const n=this.voiceJob;n&&(n.lap=t,n.beat=this.rec.beatOf(t,0),n.lengthBeats=this.rec.lapBeats,n.n=this.nextPassNumber(),n.phase="armed",this.rec.voiceLap=t,this.rec.voiceCut=null,this.tellVoice(n.lucy,{state:"armed",beat:n.beat,lengthBeats:n.lengthBeats,pass:n.n}),this.changed(!1))}cancelVoice(t=!0){const n=this.voiceJob;n&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,t&&this.tellVoice(n.lucy,{state:"cancel",beat:Number.isFinite(n.beat)?n.beat:0}),this.changed(!1))}tellVoice(t,n){try{this.deps.sink?.controls(t,[{type:"voice",id:`vp${++this.voiceSerial}`,...n}])}catch{}}voiceNews(t,n){const a=this.voiceJob;if(n.state==="ask"){this.voicePass(t);return}if(n.state==="undo"){this.undoVoice(t,n.take);return}!a||a.lucy!==t||(n.state==="cancel"?this.cancelVoice(!1):n.state==="recording"&&Array.isArray(n.peaks)?(a.peaks=n.peaks.slice(0,128),this.changed(!1)):n.state==="quiet"&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="Too quiet: the voice loop was not kept.",this.changed(!1)))}voiceTake(t,n){const a=this.rec.played(t,n);this.voiceAdded(t,a),a.length&&this.changed(!0)}voiceAdded(t,n){const a=this.voiceJob;if(!a||a.lucy!==t)return;const o=n.find(r=>r.ev.kind==="take")?.ev;if(!o||o.kind!=="take")return;const i=this.session.passes.find(r=>r.events.includes(o));this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="",this.tellVoice(t,{state:"added",beat:Number.isFinite(a.beat)?a.beat:0,take:o.take,...i?{pass:i.n}:{}})}undoVoice(t,n){const a=n?this.session.passes.find(i=>i.events.some(r=>r.kind==="take"&&r.take===n&&r.inst===t)):void 0;!a||!this.rec.undoPass(a)||(this.notice=`${a.name} undone.`,this.replayChanged(),this.changed(!0),this.tellVoice(t,{state:"undone",beat:0,take:n}))}voiceTick(t){const n=this.voiceJob;if(!n)return!1;if(n.phase==="armed"&&t!==null&&t>=n.beat&&(n.phase="recording"),n.phase==="recording"&&t!==null&&t>=n.beat+n.lengthBeats&&(n.phase="after",n.until=this.deps.now()+Ds),n.phase==="after"&&this.deps.now()>n.until)return this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.voiceKey="",!0;const a=t===null||!Number.isFinite(n.beat)?0:t-n.beat,o=`${n.phase}|${n.phase==="armed"?Math.ceil(-a-1e-9):n.phase==="recording"?Math.floor(a/D):""}`;return o===this.voiceKey?!1:(this.voiceKey=o,!0)}tick(){if(!this.jamming||!this.transport.running)return this.voiceJob?.phase==="after"&&this.voiceTick(null)?(this.changed(!1),!0):!1;const t=this.beatNow(),n=this.voiceTick(t);this.lastBeat=t;const{lap:a}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.recOn&&(this.notice="Too busy to record. Playback carries on."),o=!0),a!==this.lastLap&&(this.lastLap=a,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""),a>=0&&!(this.pending&&t>=this.pending.seam)&&t>=this.rec.b0&&this.lapBegan());const r=this.rec.seam(t);r.length&&this.placeNewPasses();const l=this.rec.beatOf(this.rec.recFrom,0)-t,c=this.recOn&&Number.isFinite(l)&&l>0?l>D?Math.ceil(l/D-1e-9)*100:Math.ceil(l-1e-9):-1;c!==this.armedKey&&(this.armedKey=c,o=!0);const d=this.rec.patternLive(t).reduce((w,v)=>w+v.events.length,0);d!==this.liveCount&&(this.liveCount=d,o=!0);const p=this.pending;if(p&&t>=p.seam){this.pending=null,this.voiceJob&&this.voiceJob.phase!=="after"&&this.voiceJob.phase!=="recording"&&this.cancelVoice(!0);const w=this.rec.lapStart,v=this.rec.place(t).lap,h=p.section!==void 0&&p.section!==this.session.song.section;p.section!==void 0&&(this.session.song.section=p.section),this.applyLoop(p.loop),this.rec.rebase(p.seam,v,w),this.replay?.rebase(p.seam),h&&this.replayChanged(!0),this.lastLap=this.rec.place(t).lap,this.lapBegan(),this.changed()}if(this.stopAt!==null&&t>=this.stopAt-1e-6)return this.stopAt=null,this.songPlay=null,this.notice="The song is over.",this.stop(),!0;const u=this.transport.beatAt(this.deps.now()+zs),g=this.stopAt!==null?Math.min(u,this.stopAt):u,f=this.pending;if(f&&g>f.seam){this.replay?.pump(t,f.seam);const w=da({bars:this.session.song.bars,...f.loop?{loop:f.loop}:{}});this.replay?.pump(Math.max(t,f.seam),g,{b0:f.seam,lapStart:w.start,lapTicks:w.length,...f.section!==void 0?{section:f.section}:{}})}else this.replay?.pump(t,g);return r.length?(this.changed(),!0):o||n}view(){const t=this.session,n=this.transport,a=this.jamming&&n.running?this.beatNow():null,o=a!==null&&!this.countedIn?Math.max(a,this.rec.b0):a,i=o===null?null:this.rec.place(o),r=o!==null&&o<this.rec.b0,l=t.passes.reduce((b,k)=>Math.max(b,k.n),0)+1,c=i&&!r?i.lap:null,d=this.voiceJob,p=d?.phase==="recording"&&c===d.lap,u=d?.phase==="armed"&&!r,g=u||!p&&this.recOn&&c!==null&&!this.rec.records(c),f=!this.recOn&&!p&&!u,w=o!==null&&!r&&!f&&!g&&!this.rec.paused&&!this.rec.full,v=this.deps.host?.studioTransport?.bpm(),h=this.waiting?"waiting":this.jamming?r?"count-in":f?"playing":g?"armed":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";let m=null;const y=u&&d?d.beat:this.rec.beatOf(this.rec.recFrom,0);if(g&&o!==null&&Number.isFinite(y)){const b=Math.max(0,y-o);m=b>D?{bars:Math.ceil(b/D-1e-9),beats:Math.ceil(b-1e-9)}:{bars:0,beats:Math.max(1,Math.ceil(b-1e-9))}}return{session:t,phase:h,jamming:this.jamming||this.wantJam,along:this.along,bar:i&&!r?Math.floor((this.rec.lapStart+i.tick)/(D*960))+1:null,songPos:i&&!r?(this.rec.lapStart+i.tick)/W(t.song):null,pendingLoop:this.pending?.loop,queued:this.queuedView(o),songRec:this.songRec?this.songRec.items.map(b=>({...b})):null,songPlay:this.songPlay?{index:this.songPlay.index,lap:(this.session.song.arrangement?.[this.songPlay.index]?.times??1)-this.songPlay.left+1}:null,sectionAt:i&&!r&&t.song.sections?.length?{bar:Math.floor(i.tick/(D*F))+1,pos:i.tick/this.rec.lapTicks}:null,canUndoSong:this.songUndo!==null,nextPass:l,waiting:this.waiting,countIn:r&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,voice:this.voiceView(o),livePatterns:w&&!p&&o!==null?this.rec.patternLive(o).map((b,k)=>({...b,n:l+k})):[],hands:o!==null&&i&&!r?this.handsAt(o):[],record:this.recOn||p||u,startOn:this.startApplies,recIn:m,recBar:Math.floor(this.rec.lapStart/(D*F))+1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof v=="number"&&Math.round(v)!==t.song.bpm?Math.round(v):null,notice:this.notice}}handsAt(t){if(!this.replay)return[];const n=W(this.session.song),a=i=>{const{tick:r}=this.rec.place(i);return Math.max(0,Math.min(1,(this.rec.lapStart+r)/n))},o=[];for(const i of this.replay.handsAt(t)){if(!i.pass)continue;const r=(this.rec.lapStart+this.rec.lapTicks)/n;o.push({pass:i.pass,inst:i.inst,param:i.param,from:a(i.from),to:r})}return o}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const a=Math.max(1,Math.min(Te(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=a,this.clampSections();else if(a>n.bars&&t.grow){n.bars=a;const o=W(n);for(const i of this.session.passes)i.endTick<o&&i.repeat===void 0&&(i.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.start==="wait"?n.start="wait":t.start==="count-in"&&delete n.start,t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let a=null;if(t){const c=Math.max(1,Math.min(n.bars,Math.round(t.from))),d=Math.max(c,Math.min(n.bars,Math.round(t.to)));a=c===1&&d===n.bars?null:{from:c,to:d}}const o=J(n);if(o&&(o.from=a?a.from:1,o.to=a?a.to:n.bars),!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(a),this.changed();return}const i=this.beatNow(),{lap:r}=this.rec.place(i),l=this.rec.beatOf(Math.max(r+1,0),0);this.pending={loop:a,seam:l,...o?{section:o.id}:{}},this.replay?.rewind(l),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;songRec=null;songPlay=null;stopAt=null;songUndo=null;placed=new Set;get sections(){return this.session.song.sections??[]}queuedView(t){const n=this.pending;if(!n||n.section===void 0||n.section===this.session.song.section)return null;const a=t===null?0:Math.max(0,n.seam-t),o=Math.max(1e-6,n.seam-(n.queuedAt??n.seam-this.rec.lapTicks/F));return{section:n.section,inBars:Math.ceil(a/D-1e-9),inBeats:Math.ceil(a-1e-9),progress:Math.max(0,Math.min(1,1-a/o))}}ensureSections(){const t=this.session.song;if(t.sections?.length)return t.sections;const n=t.loop,a={id:"s1",name:"Section 1",from:n?n.from:1,to:n?n.to:t.bars,on:this.session.passes.map(o=>o.id)};t.sections=[a],t.section=a.id;for(const o of this.session.passes)this.placed.add(o.id);return t.sections}addSection(){const t=this.ensureSections();if(t.length>=Zt)return this.notice=`${Zt} sections is the most.`,this.changed(!1),null;const n=J(this.session.song)??t[0];if(!n)return null;let a=2;const o=n.name.replace(/\s+\d+$/,""),i=new Set(t.map(d=>d.name));for(;i.has(`${o} ${a}`);)a++;let r=t.length+1;const l=new Set(t.map(d=>d.id));for(;l.has(`s${r}`);)r++;const c={id:`s${r}`,name:`${o} ${a}`.slice(0,en),from:n.from,to:n.to,on:[...n.on]};return t.push(c),!this.jamming&&!this.wantJam?this.selectSection(c.id):this.changed(),c}renameSection(t,n){const a=this.sections.find(i=>i.id===t),o=n.replace(/\s+/g," ").trim().slice(0,en);return!a||!o||o===a.name?!1:(a.name=o,this.changed(),!0)}deleteSection(t){const n=this.session.song,a=n.sections;if(!a||a.length<2)return!1;const o=a.findIndex(i=>i.id===t);if(o<0)return!1;if(this.jamming&&n.section===t)return this.notice="Play another section first, or stop.",this.changed(!1),!1;if(this.pending?.section===t&&this.cancelQueued(),a.splice(o,1),n.arrangement&&(n.arrangement=kd(n.arrangement.filter(i=>i.section!==t)),n.arrangement.length||delete n.arrangement),n.section===t){const i=a[Math.min(o,a.length-1)];n.section=i.id,this.applyLoop(ut(i,n.bars))}return this.changed(),!0}selectSection(t,n=!1){const a=this.session.song,o=a.sections?.find(d=>d.id===t);if(!o)return;!n&&this.songPlay&&(this.songPlay=null,this.stopAt!==null&&(this.stopAt=null,this.replayChanged(!0)),this.notice="You took over from the song.");const i=ut(o,a.bars);if(!this.jamming||!this.transport.running){this.pending=null,a.section=t,this.applyLoop(i),this.changed();return}if(this.pending?.section===t&&!n){this.cancelQueued();return}if(a.section===t&&(!this.pending||this.pending.section===void 0)){this.changed(!1);return}if(a.section===t){this.cancelQueued();return}const r=this.beatNow(),{lap:l}=this.rec.place(r),c=this.rec.beatOf(Math.max(l+1,0),0);this.pending={loop:i,seam:c,section:t,queuedAt:r},this.replay?.rewind(c),this.changed(!1)}cancelQueued(){const t=this.pending;!t||t.section===void 0||(this.pending=null,this.replay?.rewind(t.seam),this.changed(!1))}selectSectionAt(t){const n=this.sections[t];return n?(this.selectSection(n.id),!0):!1}setSectionBars(t,n="repeat"){const a=this.session.song,o=J(a);if(!o||this.jamming||this.wantJam)return;const i=Math.max(1,Math.round(t)),r=Math.min(Te(a.bpm),o.from-1+i);r>a.bars&&(this.session.passes.length?this.setSong({bars:r,grow:n}):a.bars=r,a.bars<r)||(o.to=Math.max(o.from,r),this.applyLoop(ut(o,a.bars)),this.changed())}setInSection(t,n){const a=J(this.session.song);if(!a)return;const o=a.on.includes(t);n!==o&&(n?a.on.push(t):a.on.splice(a.on.indexOf(t),1),this.replayChanged(!1),this.changed())}clampSections(){const t=this.session.song;if(!t.sections)return;for(const a of t.sections)a.to=Math.min(a.to,t.bars),a.from=Math.min(a.from,a.to);const n=J(t);n&&this.applyLoop(ut(n,t.bars))}placeNewPasses(){const t=this.session.song,n=J(t);for(const a of this.session.passes)this.placed.has(a.id)||(this.placed.add(a.id),n&&(t.sections?.some(o=>o.on.includes(a.id))||n.on.push(a.id)))}get songRecording(){return this.songRec!==null}get songPlaying(){return this.songPlay!==null}toggleSongRecord(){if(this.songRec){this.endSongRecord(),this.changed();return}this.sections.length&&(this.songPlay=null,this.stopAt=null,this.songRec={items:[]},this.notice="",!this.jamming&&!this.wantJam?this.jam():this.changed(!1))}endSongRecord(){const t=this.songRec;if(this.songRec=null,!t?.items.length)return;const n=this.session.song;this.songUndo={arrangement:n.arrangement?n.arrangement.map(a=>({...a})):void 0},n.arrangement=t.items.slice(0,tn),this.notice="The song is recorded."}undoSong(){const t=this.songUndo;if(!t)return;this.songUndo=null;const n=this.session.song;t.arrangement?n.arrangement=t.arrangement:delete n.arrangement,this.notice="The song before is back.",this.changed()}toggleSongPlay(){if(this.songPlay){this.stop();return}const t=this.session.song.arrangement,n=t?.[0];if(!(!t||!n)){if(this.songRec&&this.endSongRecord(),this.recOn=!1,this.songPlay={index:0,left:n.times,fresh:!0},this.stopAt=null,this.jamming||this.wantJam){this.session.song.section!==n.section?this.selectSection(n.section,!0):this.songPlay.fresh=!0,this.changed(!1);return}this.selectSection(n.section,!0),this.jam()}}lapBegan(){const t=this.session.song,n=t.section;if(this.songRec&&n){const i=this.songRec.items.at(-1);i&&i.section===n&&i.times<nn?i.times++:this.songRec.items.length<tn&&this.songRec.items.push({section:n,times:1})}const a=this.songPlay,o=t.arrangement;if(!(!a||!o)){if(a.fresh)a.fresh=!1;else if(a.left--,a.left<=0){a.index++;const i=o[a.index];if(!i){this.songPlay=null;return}a.left=i.times}if(a.left===1){const i=o[a.index+1],r=this.beatNow(),l=this.rec.beatOf(Math.max(this.rec.place(r).lap+1,0),0);i?i.section!==n&&this.selectSection(i.section,!0):(this.stopAt=l,this.replay?.rewind(l))}}}setStepTimes(t,n){const o=this.session.song.arrangement?.[t];!o||this.songPlay||(o.times=Math.max(1,Math.min(nn,Math.round(n))),this.changed())}moveStep(t,n){const a=this.session.song.arrangement,o=t+n;!a||this.songPlay||!a[t]||!a[o]||([a[t],a[o]]=[a[o],a[t]],this.changed())}removeStep(t){const n=this.session.song,a=n.arrangement;!a?.[t]||this.songPlay||(a.splice(t,1),a.length||delete n.arrangement,this.changed())}pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const a=this.pass(t);if(a){if(n.name!==void 0){const o=n.name.replace(/\s+/g," ").trim().slice(0,Re);a.name=o||`Pass ${a.n}`}if(n.kept!==void 0&&(a.kept=n.kept),n.mute!==void 0&&(a.mute=n.mute),n.solo!==void 0&&(a.solo=n.solo),n.volume!==void 0&&(a.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&a.endTick<W(this.session.song)&&(a.repeat=n.repeat),n.shift!==void 0){const o=Math.max(-la,Math.min(la,Math.round(n.shift)||0));o?a.shift=o:delete a.shift}n.normalize!==void 0&&xt(a)&&(a.normalize=n.normalize,this.normalizeUndo=null),n.quantize===null?delete a.quantize:n.quantize&&(a.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0||n.normalize!==void 0)&&this.replayChanged(!1),this.changed()}}normalizeVoice(){const t=this.session.passes.filter(xt),n=new Map(t.map(o=>[o.id,o.normalize]));let a=0;for(const o of t)o.normalize||(o.normalize=!0,a++);return this.normalizeUndo=a?n:null,this.notice=a?`${a} voice ${a===1?"pass":"passes"} normalized.`:"Every voice pass is normalized already.",a&&this.replayChanged(!1),this.changed(a>0),a}get canUndoNormalize(){return!!this.normalizeUndo}undoNormalize(){const t=this.normalizeUndo;if(t){this.normalizeUndo=null;for(const n of this.session.passes){if(!t.has(n.id))continue;const a=t.get(n.id);a===void 0?delete n.normalize:n.normalize=a}this.notice="Normalize undone.",this.replayChanged(!1),this.changed()}}normalizeUndo=null;deletePass(t){const n=this.session.passes.findIndex(o=>o.id===t);if(n<0)return null;const[a]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),a?{pass:a,index:n}:null}restorePass(t,n){const a=this.session.passes;return a.length>=se||a.some(o=>o.id===t.id)?!1:(a.splice(Math.min(Math.max(0,n),a.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(a=>a.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){(this.jamming||this.waiting)&&this.stop();const t=ci(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session.song.start&&(t.song.start=this.session.song.start),this.use(t),this.changed(),t}openSession(t){(this.jamming||this.waiting)&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,Pa);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.recOn=t.passes.length===0,this.notice="",this.placed=new Set(t.passes.map(n=>n.id)),this.songRec=null,this.songPlay=null,this.songUndo=null,this.stopAt=null}get passCount(){return this.session.passes.length}get maxPasses(){return se}dispose(){this.stopListening();for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}function kd(e){const t=[];for(const n of e){const a=t.at(-1);a&&a.section===n.section&&a.times+n.times<=nn?a.times+=n.times:t.push({...n})}return t}const Ia=e=>e==="off"?"Off":e;function Ed(e){const t=e.quantize?.grid??"off";return`Song · ${t==="off"?"off":t}`}function Ps(e,t){if(e==="song"){const n=t.quantize?.grid??"off";return`Q · Song ${n==="off"?"off":n}`}return`Q ${Ia(e)}`}function pi(e,t=!1){return[{value:"song",label:t?Ps("song",e):Ed(e)},...un.map(n=>({value:n,label:t?Ps(n,e):Ia(n)}))]}const ui=()=>hn.map(e=>({value:String(e),label:`${Math.round(e*100)}%`})),hi=e=>e.quantize?.grid??"song",mi=e=>!!e.quantize&&e.quantize.grid!=="off";function fi(e,t,n){return n==="song"||!un.includes(n)?null:{grid:n,strength:e.quantize?.strength??t.quantize?.strength??1}}function gi(e,t){const n=Number(t);return!e.quantize||!hn.includes(n)?null:{grid:e.quantize.grid,strength:n}}const Ad="netcomposer-looper",me="sessions",Sd="netcomposer.looper.current.v1",Md=500;function Td(e){return new Promise((t,n)=>{const a=e.open(Ad,1);a.onupgradeneeded=()=>{a.result.objectStoreNames.contains(me)||a.result.createObjectStore(me,{keyPath:"id"})},a.onsuccess=()=>t(a.result),a.onerror=()=>n(a.error)})}function qs(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Cd(e={}){const t=e.idb===void 0?Is(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?Is(()=>globalThis.localStorage):e.local,a=e.currentKey??Sd;let o=null;const i=()=>t?(o??=Td(t),o):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=h=>{try{n?.setItem(a,h)}catch{}},u=async h=>{const b=(await i()).transaction(me,"readonly").objectStore(me).get(h);return new Promise((k,T)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>T(b.error)})},g=h=>{const m=c.then(async()=>{const b=(await i()).transaction(me,"readwrite");h(b.objectStore(me)),await qs(b)});return c=m.catch(()=>{d++}),m.then(()=>!0,()=>!1)},f=async h=>{if(!t||!h)return null;try{const m=await u(h);return m===void 0?null:qa(m)}catch{return null}},w=h=>{const m=structuredClone(h);c=c.then(async()=>{const b=(await i()).transaction(me,"readwrite");b.objectStore(me).put(m),await qs(b),p(m.id)}).catch(()=>{d++})},v=()=>{l&&clearTimeout(l),l=null;const h=r;r=null,h&&w(h)};return{async load(){let h=null;try{h=n?.getItem(a)??null}catch{h=null}return h?f(h):null},get:f,setCurrent:p,async list(){if(!t)return[];v(),await c;let h=[];try{const b=(await i()).transaction(me,"readonly").objectStore(me).getAll();h=await new Promise((k,T)=>{b.onsuccess=()=>k(b.result),b.onerror=()=>T(b.error)})}catch{return[]}return zd(h)},async rename(h,m){const y=pa(m);if(!t||!y)return!1;v(),await c;let b;try{b=await u(h)}catch{return!1}return!b||typeof b!="object"?!1:g(k=>k.put({...b,name:y}))},async remove(h){return t?(r?.id===h&&(l&&clearTimeout(l),l=null,r=null),g(m=>m.delete(h))):!1},async adopt(h){const m=await f(h.id);if(m&&"session"in m&&Ld(m.session,h))return m.session;const y=m===null?structuredClone(h):{...structuredClone(h),id:li(),name:pa(`${h.name} (scene)`)||h.name};if(!await g(k=>k.put(y)))throw new Error("not saved");return y},save(h,m=!1){if(r=h,m){v();return}l||(l=setTimeout(v,Md))},async flush(){v(),await c},get failures(){return d}}}function pa(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,Pa):""}function Ld(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function zd(e){const t=[];for(const a of e){if(!a||typeof a!="object")continue;const o=a;if(typeof o.id!="string"||!o.id)continue;const i=qa(a);if("session"in i){const r=i.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=o.song;t.push({id:o.id,name:pa(o.name)||"Untitled song",passes:Array.isArray(o.passes)?o.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof o.updatedAt=="string"?o.updatedAt:"",error:i.error})}}const n=a=>{const o=Date.parse(a.updatedAt);return Number.isNaN(o)?0:o};return t.sort((a,o)=>n(o)-n(a))}const Nd=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fd(e,t=new Date){const n=new Date(e),a=n.getTime();if(Number.isNaN(a))return"";const o=t.getTime()-a;if(o>=0&&o<6e4)return"just now";if(o>=0&&o<36e5)return`${Math.floor(o/6e4)} min ago`;const i=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${i}`;if(l===1)return`yesterday ${i}`;const c=`${Nd[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?c:`${c}, ${n.getFullYear()}`}function Dd(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],a=Fd(e.updatedAt,t);return a&&n.push(a),n.join(" · ")}function Is(e){try{return e()??null}catch{return null}}const Pd=4e3;function Q(e,t={},...n){const a=document.createElement(e);for(const[o,i]of Object.entries(t))a.setAttribute(o,i);return a.append(...n),a}function qd(e){const t=Q("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=Q("div",{class:"lp-songs-list",role:"none"}),a=Q("div",{class:"lp-songs-msg",role:"status"});a.hidden=!0;const o=Q("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,a,Q("div",{class:"lp-songs-sep",role:"separator"}),Q("div",{class:"lp-songs-note"},e.note)),i=Q("span",{class:"lp-songs-wrap"},t,o);let r=null,l=null;const c=()=>i.hasAttribute("data-open"),d=E=>{a.textContent=E,a.hidden=!E},p=()=>[...n.querySelectorAll(".lp-song-main")],u=E=>E?.closest(".lp-song")??null,g=E=>[...E.querySelectorAll('[role="menuitem"]')],f=(E,$="main")=>{((E?n.querySelector(`.lp-song[data-song="${CSS.escape(E)}"]`):null)?.querySelector(`.lp-song-${$}`)??p()[0]??t).focus({preventScroll:!0})},w=()=>{if(!r)return;clearTimeout(r.timer);const E=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);E&&(E.textContent="Delete",E.removeAttribute("data-lp-ask")),r=null};async function v(E){const $=await e.list(),M=e.openId(),z=e.now?.()??new Date;w(),l=null,n.replaceChildren(...$.map(S=>{const A=S.id===M,L=`${Dd(S,z)}${A?" · open":""}${S.error?" · doesn't open":""}`,N=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${S.id}`,"aria-label":`${S.name}, ${L}`},Q("span",{class:"lp-song-name"},S.name),Q("span",{class:"lp-song-sub"},L));A&&N.setAttribute("aria-current","true"),N.addEventListener("click",()=>void h(S));const P=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${S.id}`,"aria-label":`Rename ${S.name}`},"Rename");P.addEventListener("click",()=>m(S)),S.error&&(P.disabled=!0);const H=Q("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${S.id}`,"aria-label":`Delete ${S.name}`},"Delete");H.addEventListener("click",()=>void y(S,H));const R=Q("div",{class:"lp-song",role:"none","data-song":S.id},N,Q("span",{class:"lp-song-acts",role:"none"},P,H));return A&&R.setAttribute("data-open",""),R})),$.length||n.append(Q("div",{class:"lp-songs-empty"},"No songs yet.")),E&&f(E.id,E.part)}async function h(E){if(E.id===e.openId()){k(!0);return}const $=await e.open(E.id);if($){d($);return}k(!0)}function m(E){const $=n.querySelector(`.lp-song[data-song="${CSS.escape(E.id)}"]`),M=$?.querySelector(".lp-song-main"),z=M?.querySelector(".lp-song-name");if(!$||!M||!z)return;w(),l=E.id;const S=Q("input",{class:"lp-name-input lp-song-input",value:E.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${E.id}`});S.value=E.name;let A=!1;const L=async N=>{if(A)return;A=!0,l=null;const P=S.value.replace(/\s+/g," ").trim();N&&P&&P!==E.name&&await e.rename(E.id,P),await v({id:E.id,part:"rename"})};S.addEventListener("keydown",N=>{N.stopPropagation(),N.key==="Enter"?(N.preventDefault(),L(!0)):N.key==="Escape"&&(N.preventDefault(),L(!1))}),S.addEventListener("blur",()=>void L(!0)),$.setAttribute("data-renaming",""),$.insertBefore(S,M),S.focus(),S.select()}async function y(E,$){if(r?.id!==E.id){w(),$.textContent="Press again to delete",$.setAttribute("data-lp-ask",""),r={id:E.id,timer:setTimeout(w,Pd)};return}w();const M=p().findIndex(A=>u(A)?.dataset.song===E.id);await e.remove(E.id),await v();const z=p();(z[Math.min(Math.max(M,0),z.length-1)]??t).focus({preventScroll:!0})}async function b(){c()||(i.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",T,!0)),d(""),await v({id:e.openId()})}function k(E=!1){c()&&(w(),i.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",T,!0),d(""),E&&t.focus({preventScroll:!0}))}function T(E){i.contains(E.target)||k()}return t.addEventListener("click",()=>c()?k():void b()),t.addEventListener("keydown",E=>{(E.key==="ArrowDown"||E.key==="ArrowUp")&&(E.preventDefault(),b().then(()=>{const $=p();(E.key==="ArrowUp"?$[$.length-1]:$[0])?.focus({preventScroll:!0})}))}),o.addEventListener("keydown",E=>{if(l)return;const $=p(),M=document.activeElement,z=u(M),S=$.findIndex(L=>u(L)===z);let A;if(E.key==="ArrowDown")A=$[(S+1)%$.length];else if(E.key==="ArrowUp")A=$[(S-1+$.length)%$.length];else if(E.key==="Home")A=$[0];else if(E.key==="End")A=$[$.length-1];else if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(!z)return;const L=g(z).filter(H=>!H.disabled),N=L.indexOf(M),P=E.key==="ArrowRight"?1:-1;A=L[Math.min(L.length-1,Math.max(0,N+P))]}else if(E.key==="Escape"){E.preventDefault(),E.stopPropagation(),k(!0);return}else if(E.key==="Tab"){k(!1);return}else return;E.preventDefault(),A?.focus({preventScroll:!0})}),{el:i,button:t,open:b,close:k,isOpen:c,async refresh(){c()&&!l&&await v()}}}const bi=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let _e;function Id(){if(_e!==void 0)return _e;_e=null;try{_e=bi()?.attach("looper",{instance:1})??null}catch{_e=null}return _e}function Bd(){return bi()?.countIn??null}function Rd(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const jd="netcomposer.looper.hidden.v1",Od=50;function x(e,t={},...n){const a=document.createElement(e);for(const[o,i]of Object.entries(t))i!==void 0&&a.setAttribute(o,i);for(const o of n)o!==null&&o!==!1&&a.append(o);return a}const B=e=>({[vt]:Fa(e)||void 0});function I(e,t,n){const a=x("button",{type:"button",...t},e);return a.addEventListener("click",n),a}function ce(e,t){return x("span",{class:"nc-label",...t?B(t):{}},e)}function mn(e,t,n,a,o,i=!1){const r=x("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=I(l.label,{role:"radio","aria-checked":String(l.value===a),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==a&&o(l.value)});c.disabled=i,r.append(c)}return r}function jt(e,t,n,a,o,i="lp-toggle"){return I(t,{class:i,"aria-pressed":String(n),"data-lp-id":e,...B(a)},o)}function Ba(e,...t){const n=document.activeElement,a=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(o=>!!o)),a&&e.querySelector(`[data-lp-id="${CSS.escape(a)}"]`)?.focus({preventScroll:!0})}function yi(e,t,n){const a=x("div",{class:"lp-body","data-lp-module":e}),o=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=Gc(o(),jd),r=()=>{const l=i.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==a&&l.after(a)};return r(),{handle:i,mount:a,update(){i.update(o()),r()}}}const K=Id(),ne=Cd({currentKey:K?.storageKey?.("netcomposer.looper.current.v1")}),Ve=await ne.load();let wi="",ua;Ve&&"session"in Ve?ua=Ve.session:(Ve&&"error"in Ve&&(wi=`Your last song didn't open: ${Ve.error}. A new one is started.`),ua=ci(K?.studioTransport?.bpm()??120));function Hd(){let e=null;try{e=K?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,a=o=>{n.has(o)||(n.add(o),t.setTarget(o,{role:"chord",on:!0,layer:!0}))};return{send(o,i){a(o),t.send(i,o)},controls(o,i){a(o),t.sendControls(i,o)},laps(o){let i=[];try{i=(K?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{i=[]}for(const r of i)a(r),t.sendControls(o,r)},off(o){t.off(o===void 0?"stop":"restart",o)},release(o,i){n.has(o)&&t.release?.(i,o)},restart(){t.restart()}}}const Bs="netcomposer.looper.along.v1",C=new $d(ua,{host:K,countIn:Bd(),load:Rd,now:_i,save:e=>ne.save(e),sink:Hd(),along:{get:()=>{try{return localStorage.getItem(Bs)==="1"}catch{return!1}},set:e=>{try{localStorage.setItem(Bs,e?"1":"0")}catch{}}}});C.notice=wi;addEventListener("pagehide",()=>ne.save(C.session,!0));let $t=null;const vi=document.getElementById("app");vi.classList.add("nc","nc-page");Hc();const xi=x("header",{class:"nc-page-hd"},x("div",{},x("h1",{class:"nc-page-title"},x("span",{class:"lp-brand"},"LUPA")," ",x("span",{class:"nc-page-sep"},"/")," LOOPER ",x("span",{class:"nc-page-sep"},"/")," ",x("span",{class:"nc-mono"},"01")),x("p",{class:"nc-page-sub"},"A TRIKI instrument.")),x("div",{class:"nc-page-actions"},Wd(),I("New song",{class:"nc-page-action","data-lp-id":"new-song",...B("new-song")},()=>Vd()))),$i=x("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),ki=x("footer",{class:"lp-foot lp-sub"},x("span",{class:"lp-notice",role:"status"}),x("span",{class:"lp-mono"},"netcomposer.looper.01"));vi.append(xi,x("main",{class:"nc-page-body"},$i),ki);let Ue=null;function _d(){return xi.querySelector('[data-lp-id="new-song"]')}function Dn(e){const t=_d();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function Vd(){if(C.passCount&&!Ue){Dn(!0),Ue=setTimeout(()=>{Ue=null,Dn(!1)},4e3);return}Ue&&clearTimeout(Ue),Ue=null,Dn(!1),Ei(),C.notice="New song started. The last one stays in Songs.",Y()}function Ei(){C.newSong(),Oe=null,te="all"}function Ud(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function Wd(){return $t=qd({list:()=>ne.list(),openId:()=>C.session.id,open:Rs,async rename(e,t){e===C.session.id?C.rename(t):await ne.rename(e,t)},async remove(e){if(e===C.session.id){C.jamming&&C.stop(),await ne.flush();const t=(await ne.list()).find(a=>a.id!==e&&!a.error);(t?await Rs(t.id):"no song")&&Ei(),C.notice="Song deleted."}await ne.remove(e),Y()},note:K?`Songs save as you play, in this browser. Save the Studio’s scene (${Ud()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),$t.el}async function Rs(e){if(C.jamming)return"Stop jamming to open another song.";await ne.flush();const t=await ne.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(C.openSession(t.session),ne.setCurrent(t.session.id),Oe=null,te="all",C.notice=`“${t.session.name}” is open.`,Y(),null):"That song isn't in this browser any more."}function Kd(){$t?.button.setAttribute(vt,Fa("songs").replace("{name}",C.session.name))}const Ai=x("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),Ee=K?.metronome,Si=Fc({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((Ee?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>Ee?.set({volume:e/100})});Si.el.setAttribute(vt,Fa("volume"));Ee?.onChange(()=>Y());function et(e,t,n,a,o,i=!1,r){const l=x("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e,...r?B(r):{}});for(const c of n){const d=x("option",{value:c.value},c.label);c.value===a&&(d.selected=!0),l.append(d)}return l.disabled=i,l.addEventListener("change",()=>o(l.value)),x("span",{class:"lp-dd"},l)}let fe=null;function Yd(e){if(fe===null)return null;const t=e.session.song,n=J(t),a=n?n.from-1+fe:fe,o=a*D*F,i=e.session.passes.filter(d=>d.endTick<o&&d.repeat===void 0),r=i.length?Math.max(...i.map(d=>Math.floor(o/d.endTick))):a/t.bars,l=d=>{const p=fe;fe=null,d&&p&&n?C.setSectionBars(p,d):d&&p&&C.setSong({bars:p,grow:d}),Y()},c=i.length;return x("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},x("span",{class:"lp-ask-title"},n?`Make ${n.name} ${fe} bars? The song grows.`:`Grow to ${fe} bars?`),x("span",{class:"lp-sub"},c?`${c===1?"A pass is":`${c} passes are`} shorter. Repeat ${c===1?"it":"them"} to fill the song, or play ${c===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),I(`Repeat ×${Math.max(2,Math.round(r))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>l("repeat")),I("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>l("once")),I("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>l(null)))}function Gd(e){const t=e.session.song,n=t.start==="wait",a=!e.startOn,o=a?x("span",{class:"lp-sub","data-lp-id":"start-sub"},"Play starts at once. Count-in and Wait apply when recording."):n?x("span",{class:"lp-sub","data-lp-id":"start-sub"},"Jam waits for the first sound from any instrument."):x("span",{class:"lp-sub lp-start-sub","data-lp-id":"start-sub"},t.countInBars?"One bar of clicks first. ":"No count-in: Pass 1 starts with the clock. ",I(t.countInBars?"Off":"On",{class:"lp-loop-off","data-lp-id":"count-in",...B("count-in")},()=>C.setSong({countInBars:t.countInBars?0:1})));return x("div",{class:"lp-field lp-start","data-lp-id":"start-field",...a?{"data-off":""}:{}},ce("Start",a?"start-off":"start"),mn("start","Start",[{value:"count-in",label:"Count-in"},{value:"wait",label:"Wait"}],n?"wait":"count-in",i=>C.setSong({start:i==="wait"?"wait":"count-in"}),a||e.jamming||e.waiting),o)}function Jd(e){return x("div",{class:"lp-field lp-start","data-lp-id":"instruments-field"},ce("Instruments","along"),mn("instruments","Instruments",[{value:"out",label:"Sit out"},{value:"along",label:"Play along"}],e.along?"along":"out",t=>C.setAlong(t==="along"),!1),x("span",{class:"lp-sub","data-lp-id":"instruments-sub"},e.along?"Every instrument plays its own pattern under the song.":"Only your passes, the click and what you play."))}function Xd(e){const t=e.session.song,n=J(t),a=n?Ze(n):0,o=[1,2,4,8,16].filter(r=>n?n.from-1+r<=Te(t.bpm):r<=Te(t.bpm)&&(!e.locked||r>=t.bars)),i=t.quantize;Ba(Ai,x("h3",{class:"lp-section-title"},"Setup"),x("div",{class:"lp-field"},ce("Tempo","tempo"),x("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?x("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?x("span",{class:"lp-sub"},"Locked: the song has passes."):x("span",{class:"lp-sub"},"Follows the Studio.")),x("div",{class:"lp-field"},ce("Length","bars"),mn("bars","Bars",o.map(r=>({value:String(r),label:String(r)})),String(fe??(n?a:t.bars)),r=>{const l=Number(r);n?e.locked&&n.from-1+l>t.bars?(fe=l,Y()):C.setSectionBars(l):e.locked&&l>t.bars?(fe=l,Y()):C.setSong({bars:l})},e.jamming),Yd(e)??x("span",{class:"lp-sub","data-lp-id":"length-text"},n?`${a} ${a===1?"bar":"bars"} · ${ri(a,t.bpm)} · ${n.name}`:`${t.bars} ${t.bars===1?"bar":"bars"} · ${rd(t)}`)),Gd(e),K?.studioTransport?.take?Jd(e):null,Ee?x("div",{class:"lp-row lp-toggles"},jt("metronome","Metronome",Ee.prefs().on,"metronome",()=>Ee.set({on:!Ee.prefs().on}))):null,Ee?Si.el:null,x("div",{class:"lp-pair"},x("label",{class:"lp-field"},ce("Quantize","quantize"),et("quantize","Quantize",un.map(r=>({value:r,label:Ia(r)})),i?.grid??"off",r=>C.setSong({quantize:r==="off"?null:{grid:r,strength:i?.strength??1}}))),x("label",{class:"lp-field"},ce("Strength","strength"),et("strength","Strength",hn.map(r=>({value:String(r),label:`${Math.round(r*100)}%`})),String(i?.strength??1),r=>i&&C.setSong({quantize:{grid:i.grid,strength:Number(r)}}),!i))))}const Mi=yi("jam","Jam",()=>{const e=C.view(),t=e.session.song.loop,n=t?`loop ${tt(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${C.passCount} / ${se} passes`});function tt(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const Qd="http://www.w3.org/2000/svg",O=(e,t)=>{const n=document.createElementNS(Qd,e);for(const[a,o]of Object.entries(t))n.setAttribute(a,o);return n},kt=44,ha=2*Math.PI*kt,Ti=O("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),Ci=O("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(kt),"stroke-width":"3","stroke-dasharray":`0 ${ha}`,transform:"rotate(-90 50 50)"}),Ot=O("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"}),Li=O("circle",{class:"lp-ring-mark",cx:"50",cy:"6",r:"3.2"});Ti.append(O("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(kt),"stroke-width":"1"}),Ci,Ot,Li);function ze(e=!1){return x("span",{class:"lp-dot","aria-hidden":"true",...e?{"data-armed":""}:{}})}function Ce(e){const t=e.recIn;return t?t.bars?`${t.bars} bar${t.bars===1?"":"s"}`:`${t.beats} beat${t.beats===1?"":"s"}`:""}const js=e=>e.phase==="armed"||e.record&&(e.phase==="idle"||e.phase==="waiting"||e.phase==="count-in"),zi=x("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Ht=x("span",{class:"lp-pass","data-lp-id":"pass"}),Zd=x("div",{class:"lp-ring"},Ti,x("div",{class:"lp-ring-mid"},zi,Ht));function Ni(e){const t=e.lapPos??0;Ci.setAttribute("stroke-dasharray",`${t*ha} ${ha}`);const n=t*2*Math.PI;Ot.setAttribute("cx",String(50+kt*Math.sin(n))),Ot.setAttribute("cy",String(50-kt*Math.cos(n))),Ot.style.visibility=e.lapPos===null?"hidden":"visible";const a=e.session.song.loop,o=J(e.session.song);zi.textContent=e.countIn!==null?String(e.countIn):o?e.sectionAt?`${e.sectionAt.bar} / ${Ze(o)}`:`– / ${Ze(o)}`:a?e.bar!==null?`${e.bar} · ${tt(a)}`:tt(a):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const i=o?e.queued?`→ ${Je(e.session.song,e.queued.section).toUpperCase()}`:o.name.toUpperCase():null,r=i&&(e.phase==="playing"||e.phase==="idle"||e.queued)?i:e.phase==="waiting"?e.record?`WAITING · PASS ${e.nextPass}`:"WAITING":e.phase==="count-in"?"COUNT-IN":e.phase==="playing"?"PLAYING":e.phase==="armed"?e.recIn&&!e.recIn.bars?`IN ${e.recIn.beats}`:`IN ${Ce(e).toUpperCase()}`:e.phase==="full"?`FULL · ${se} / ${se}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":e.record?`PASS ${e.nextPass}`:"PLAY",l=js(e)&&e.phase!=="count-in",c=`${r}|${e.phase}|${l}`;Ht.dataset.key!==c&&(Ht.dataset.key=c,Ht.replaceChildren(...e.phase==="recording"?[ze()]:l?[ze(!0)]:[],r)),Li.style.visibility=js(e)?"visible":"hidden"}function ep(e){const t=x("div",{class:"nc-seg lp-mode",role:"radiogroup","aria-label":"Play or Record","data-lp-id":"mode"}),n=e.session.passes.length>=se,a=e.phase==="recording"||e.phase==="paused"||e.phase==="full",o=(i,r,l)=>{const c=x("button",{type:"button",role:"radio","aria-checked":String(i),"data-lp-id":`mode-${r}`,...B(r==="record"&&n&&!i?"mode-full":`mode-${r}`)},...l);return c.addEventListener("click",()=>C.setRecord(r==="record")),r==="record"&&n&&!i&&(c.disabled=!0),c};return t.append(o(!e.record,"play",["Play"]),o(e.record,"record",[...a&&e.record?[ze()]:e.record?[ze(!0)]:[],"Record"])),e.voice&&(e.voice.phase==="armed"||e.voice.phase==="recording")?x("div",{class:"lp-mode-box"},t,x("p",{class:"lp-mode-note","data-lp-id":"mode-note"},"For this loop only")):t}function tp(e){const t=(i,r)=>x("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},x("b",{},i),r?` ${r}`:""),n=e.session.song.start==="wait",a=`bar ${e.recBar}`,o=e.voice;return o?.phase==="recording"?t("Recording a voice pass from LUCY.","Back to Play by itself after this loop."):o?.phase==="armed"?t(`A voice pass from LUCY, in ${Ce(e)||"a moment"}.`,"It records one loop, then Lupa is back in Play."):o?.phase==="starting"?t("A voice pass from LUCY.","Lupa counts in, then records one loop."):e.waiting?e.record?t("Play anything, on any instrument.",`Pass ${e.nextPass} starts on that beat. Press again to cancel.`):t("Play anything, on any instrument.","The loop starts on that beat. Press again to cancel."):e.jamming?e.phase==="playing"?t("Playing. Nothing is recorded.",`Shift+Space records from ${a}.`):e.phase==="armed"?t(`Recording from ${a}, in ${Ce(e)}.`,"Press Record again to cancel."):e.phase==="recording"?t("Recording every lap.","Play (Shift+Space) stops recording now. This lap is kept."):null:e.session.passes.length?e.record?n?t("Record is on.",`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):t("Record is on.",e.session.song.countInBars?`Jam counts in, then Pass ${e.nextPass} records from ${a}.`:`Jam starts, and Pass ${e.nextPass} records from ${a}.`):t("Play.","Jam plays the loop at once. Nothing is recorded. Shift+Space turns Record on."):n?x("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):null}function np(e){const t=e.session.song.start==="wait",n=I(e.waiting?"WAITING":e.jamming?"STOP":"JAM",{class:e.waiting?"nc-btn lp-big lp-waiting":"nc-btn lp-big","data-lp-id":"jam",...B(e.waiting?"waiting":e.jamming?"stop":t&&e.startOn?"jam-wait":"jam"),...e.jamming||e.waiting?{}:{"data-jam":""},...e.waiting?{"aria-pressed":"true"}:{}},()=>C.toggle());n.disabled=!K;const a=I("UNDO",{class:"nc-btn","data-lp-id":"undo",...B("undo")},()=>C.undo());a.disabled=!e.lapHasNotes&&!C.passCount;const o=I("REDO",{class:"nc-btn","data-lp-id":"redo",...B("redo")},()=>C.redo());o.disabled=!e.canRedo,Ni(e);const i=e.session.song.loop,r=e.pendingLoop,l=r!==void 0?x("p",{class:"lp-sub","data-lp-id":"loop-next"},r?`Loop ${tt(r)} from the next lap.`:"Loop off from the next lap."):null,c=i&&r===void 0?x("div",{class:"lp-loop-line"},x("span",{},`Loop ${tt(i)}`),I("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...B("loop-off")},()=>C.setLoop(null))):null;Ba(Mi.mount,x("div",{class:"lp-jam-stack"},Zd,ep(e),n,x("div",{class:"lp-two"},a,o),c,l,K?tp(e):x("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),Ai)}const Et=yi("passes","Passes",()=>`${C.passCount} / ${se}`);let Oe=null,te="all",Dt={at:0,bar:0};const ap={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY","petra-rhythm":"PETRA","olive-bass":"OLIVE"},nt={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},at=e=>e.split("#")[0]??e,sp=e=>nt[at(e)]?.noun[0]==="hit",Ra=e=>e.kind===void 0||e.kind==="note";function Le(e){const[t=e,n]=e.split("#"),a=ap[t]??t.toUpperCase();return n?`${a} ${n}`:a}function op(e,t){const n=new Map;for(const o of e.events)o.inst===t&&Ra(o)&&o.name&&n.set(o.name,(n.get(o.name)??0)+1);const a=[...n].sort((o,i)=>i[1]-o[1]).map(([o])=>o);return a.length?a.length===1?a[0]:`${a[0]} +${a.length-1}`:""}function ma(e,t){let n=0,a=0,o=0;for(const d of e.events)d.inst===t&&(d.kind==="slot"?a++:d.kind==="take"?o++:Ra(d)&&n++);const[i,r]=nt[at(t)]?.noun??["note","notes"],l=[];o&&l.push(o===1?"voice":`${o} takes`);const c=o?ii(e):null;return o&&e.normalize&&l.push(c===null?"normalized":fa(c)),n&&l.push(`${n} ${n===1?i:r}`),a&&l.push(`${a} slot ${a===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Mt=new Map,ip=1;function fn(e,t){const n=t.bars,a=F,o=W(t),i=gt(e,t),r=bt(e,t),l=i.length>1?e.endTick:o,c=A=>r&&A+r>=l?A+r-l:A+r,d=t.loop,p=d?(d.from-1)*D*F:0,u=d?d.to*D*F:o,g=(A,L)=>(L>0?.45:1)*(A>=p-pn&&A<u?1:.35),f=1e3,w=34,v=O("svg",{class:"lp-strip",viewBox:`0 0 ${f} ${w}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&v.append(O("rect",{class:"lp-strip-loop",x:String(p/o*f),y:"0",width:String((u-p)/o*f),height:String(w)}));const h=n*D;for(let A=1;A<h;A++){const L=String(A*f/h);A%D!==0&&n>8||v.append(A%D===0?O("line",{class:n>8&&A%(4*D)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:L,x2:L,y1:"0",y2:String(w)}):O("line",{class:"lp-strip-beat",x1:L,x2:L,y1:String(w/2-2),y2:String(w/2+2)}))}const m=e.events.filter(Ra),y=[],b=a/4*ip,k=new Set(m.filter(A=>sp(A.inst)).map(A=>A.inst)),T=new Map,E=[...new Set(m.filter(A=>k.has(A.inst)).map(A=>A.note))].sort((A,L)=>L-A);E.length>=2&&E.length<=4&&E.forEach((A,L)=>T.set(A,L));const $=m.filter(A=>!k.has(A.inst)).map(A=>A.note);let M=Math.min(...$)-2,z=Math.max(...$)+2;if(z-M<12){const A=(z+M)/2;M=A-6,z=A+6}for(const A of i)for(const L of m){const N=A+c(L.at);if(N>=o||L.at>=e.endTick)continue;const P=N/o*f,H=((.35+.65*L.vel)*g(N,A)).toFixed(2);if(k.has(L.inst)){const R=T.get(L.note);let U,q;if(R===void 0){const j=4+L.vel*9;U=w/2-j,q=w/2+j}else{const j=6+R*(w-12)/Math.max(1,T.size-1);U=j-3,q=j+3}v.append(O("line",{class:"lp-strip-hit",x1:P.toFixed(1),x2:P.toFixed(1),y1:U.toFixed(1),y2:q.toFixed(1),"stroke-opacity":H})),y.push(N/o,Math.min(1,(N+b)/o))}else{const R=Math.min(o,N+Math.max(1,L.len))/o*f,U=(4+(1-(L.note-M)/(z-M))*(w-8)).toFixed(1);v.append(O("line",{class:"lp-strip-note",x1:P.toFixed(1),x2:Math.max(P+.1,R-2).toFixed(1),y1:U,y2:U,"stroke-opacity":H})),y.push(N/o,Math.min(1,(N+Math.max(b,L.len))/o))}}const S=A=>r?[{base:A+r,lo:A,hi:A+l},{base:A+r-l,lo:A,hi:A+l}]:[{base:A,lo:A,hi:o}];for(const A of i)for(const L of S(A))for(const N of e.events){if(N.kind!=="take")continue;const P=L.base+N.at,H=Math.min(o,P+N.len,L.base+e.endTick,L.hi),R=Math.max(P,L.lo);if(R>=o||H<=R)continue;const U=R/o*f,q=H/o*f,j=e.normalize&&typeof N.normDb=="number"?N.normDb/60:0,V=(N.peaks?.length?N.peaks:[.35,.35]).map(pe=>j?Math.max(0,Math.min(1,pe+j)):pe),be=Math.floor((R-P)/N.len*(V.length-1)),ye=Math.ceil((H-P)/N.len*(V.length-1)),it=V.slice(Math.max(0,be),Math.max(be+2,ye+1)),Ne=it.length>=2?it:[.35,.35],rt=Ne.length,He=w/2,ji=pe=>Math.max(.6,pe*(w/2-2)),Oa=Ne.map((pe,lt)=>[U+(q-U)*lt/Math.max(1,rt-1),ji(pe)]),Oi=Oa.map(([pe,lt])=>`${pe.toFixed(1)},${(He-lt).toFixed(1)}`),Hi=[...Oa].reverse().map(([pe,lt])=>`${pe.toFixed(1)},${(He+lt).toFixed(1)}`);v.append(O("path",{class:"lp-strip-voice",d:`M${Oi.join(" L")} L${Hi.join(" L")} Z`,opacity:g(R,A).toFixed(2)})),y.push(R/o,Math.min(1,(R+N.len)/o))}for(const A of i)for(const L of e.events){if(L.kind!=="slot"||A+c(L.at)>=o)continue;const N=((A+c(L.at))/o*f).toFixed(1);v.append(O("line",{class:"lp-strip-slot",x1:N,x2:N,y1:"0",y2:String(w)}))}if(e.endTick<o&&!e.repeat){const A=(c(e.endTick)/o*f).toFixed(1);v.append(O("line",{class:"lp-strip-end",x1:A,x2:A,y1:"8",y2:String(w-8)}))}return Mt.set(e.id,Float32Array.from(y)),v}function Pn(e){if(e.length<=6)return e;const[t=e,n]=e.split(" ");return n?`${t.slice(0,6)} ${n.slice(0,3)}`:t.slice(0,3)}function Fi(e){const[t,n]=e;return t?n?e.length===2?`${Pn(t.label)} + ${Pn(n.label)}`:`${Pn(t.label)} + ${e.length-1}`:t.label:""}function rp(e){const t=e.knobs??[],n=x("span",{class:"lp-knob-tag","aria-label":`Knobs: ${t.map(o=>o.label).join(", ")}`,...B("knob-pass")},Fi(t)),a=O("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return a.append(O("circle",{cx:"5",cy:"5",r:"4",fill:"none",stroke:"currentColor"}),O("line",{x1:"5",y1:"5",x2:"5",y2:"1.5",stroke:"currentColor"})),n.prepend(a),n}function Di(){const e=x("span",{class:"lp-knob-tag lp-pattern-tag","data-lp-pattern":"",...B("pattern-pass")},"Pattern"),t=O("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return t.append(O("rect",{x:"0.5",y:"0.5",width:"4",height:"4",fill:"currentColor"}),O("rect",{x:"5.5",y:"0.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),O("rect",{x:"0.5",y:"5.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),O("rect",{x:"5.5",y:"5.5",width:"4",height:"4",fill:"currentColor"})),e.prepend(t),e}function lp(e,t,n){const a=fn({...e,events:[]},t),o=1e3,i=34,r=W(t),l=gt(e,t),c=bt(e,t),d=l.length>1?e.endTick:r,p=f=>((1-f)*(i-4)+2).toFixed(1),u=f=>(f/r*o).toFixed(1);a.setAttribute("aria-label",`${Fi(e.knobs??[])} across the loop`),n&&a.append(O("rect",{class:"lp-strip-hand",x:(n.from*o).toFixed(1),y:"0",width:(Math.max(0,n.to-n.from)*o).toFixed(1),height:String(i)}));const g=[];if((e.knobs??[]).forEach((f,w)=>{const v=le(f),h=e.events.filter($=>$.kind==="param"&&le($)===v&&$.at<e.endTick),m=$=>c&&$+c>=d?$+c-d:$+c,y=$=>{let M=l.length>1?$-Math.floor($/d)*d:$;if(M-=c,M<0&&(M+=d),M>=e.endTick)return null;let z=f.base;for(const S of h){if(S.at>M)break;z=S.value}return z},b=new Set([0,r]);for(const $ of l){b.add($),b.add(Math.min(r,$+d)),b.add(Math.min(r,$+e.endTick)),b.add($+m(0));for(const M of h)b.add($+m(M.at))}const k=[...b].filter($=>$>=0&&$<=r).sort(($,M)=>$-M),T=[];let E=[];for(let $=0;$<k.length-1;$++){const M=k[$],z=k[$+1];if(z<=M)continue;const S=y(M);if(S===null){E.length&&T.push(E),E=[];continue}E.push([M,S],[z,S])}E.length&&T.push(E);for(const $ of T){if($.length<2)continue;const M=$.map(([z,S])=>`${u(z)},${p(S)}`).join(" ");w===0&&a.append(O("polygon",{class:"lp-strip-area",points:`${u($[0][0])},${i} ${M} ${u($.at(-1)[0])},${i}`})),a.append(O("polyline",{class:`lp-strip-curve${w?" lp-strip-curve-2":""}`,points:M}))}for(const $ of h)for(const M of l){const z=M+($.at+c)%d;g.push(z/r,Math.min(1,(z+F/4)/r))}}),e.endTick<r&&!e.repeat){const f=((c&&e.endTick+c>=d?e.endTick+c-d:e.endTick+c)/r*o).toFixed(1);a.append(O("line",{class:"lp-strip-end",x1:f,x2:f,y1:"8",y2:String(i-8)}))}return Mt.set(e.id,Float32Array.from(g)),a}function Pt(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}function fa(e){const t=Math.round(e*10)/10;return`${t>0?"+":t<0?"−":""}${Math.abs(t).toFixed(1)} dB`}const st={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function ja(e){const t=O("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(O("path",{d:e})),t}function ln(e,t,n,a,o){const i=I("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...a},o);return i.append(ja(n)),i}let Os=null;function cp(e){Oe===e.id&&(Oe=null);const t=C.deletePass(e.id);if(!t)return;Os?.close();const n=Rc({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>C.restorePass(t.pass,t.index),anchor:Et.mount});n.el.setAttribute("data-lp-id","delete-toast"),Os=n}function dp(e,t,n=null){const a=C.session.song,o=ca(e),i=D*a.ppq,r=Oe===e.id,l=[...new Set(e.instruments)],c=I("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(r)},()=>{Oe=r?null:e.id,Y()}),d=x("span",{class:"lp-pass-line"},x("span",{class:"lp-pass-title"},e.name));for(const b of l)d.append(x("span",{class:"lp-inst","data-inst":nt[at(b)]?.token??""},Le(b)));const p=[];for(const b of l){const k=op(e,b);p.push(k?`${k} · ${ma(e,b)}`:ma(e,b))}l.length||p.push("Empty"),e.mute&&p.push("muted");const u=o?x("span",{class:"lp-pass-sub lp-knob-sub"},rp(e),e.mute?x("span",{},"Muted"):null,n?x("span",{class:"lp-hand-note",...B("you-have-it")},"you have it"):null):e.pattern?x("span",{class:"lp-pass-sub lp-knob-sub"},x("span",{class:"lp-pass-sub-text"},p.join(" · ")),Di()):x("span",{class:"lp-pass-sub"},p.join(" · "));c.append(x("span",{class:"lp-now","aria-hidden":"true"}),x("span",{class:"lp-pass-text"},d,u));const g=x("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...B("pass-volume")});g.value=String(Math.round(e.volume*100));const f=x("span",{class:"lp-db","data-lp-id":`db-${e.id}`},Pt(e.volume));g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",Pt(e.volume)),g.addEventListener("input",()=>{const b=Number(g.value)/100;f.textContent=Pt(b),g.style.setProperty("--lp-fill",`${g.value}%`),g.setAttribute("aria-valuetext",Pt(b)),C.editPass(e.id,{volume:b})});const w=x("div",{class:"lp-ms-pair"},jt(`mute-${e.id}`,"M",e.mute,"mute",()=>C.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),jt(`solo-${e.id}`,"S",e.solo,"solo",()=>C.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));if(w.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),w.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`),xt(e)){const b=jt(`normalize-${e.id}`,"N",!!e.normalize,"normalize",()=>C.editPass(e.id,{normalize:!e.normalize}),"lp-ms lp-ms-n");b.setAttribute("aria-label",`Normalize ${e.name}`),w.append(b)}const v=ln(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,st.star,{"aria-pressed":String(e.kept),...B("star")},()=>C.editPass(e.id,{kept:!e.kept})),h=ln(`delete-${e.id}`,`Delete ${e.name}`,st.trash,B("delete"),()=>cp(e)),m=x("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...r?{"data-open":""}:{}},c,x("div",{class:"lp-tools"},mp(e,a),fp(e,a),w,x("div",{class:"lp-acts"},v,h)),x("div",{class:"lp-strip-box"},o?lp(e,a,n):fn(e,a),x("span",{class:"lp-head","aria-hidden":"true"})),o?x("div",{class:"lp-play"},x("div",{class:"lp-q","data-none":"","aria-hidden":"true"}),x("div",{class:"lp-vol","data-knob":"","aria-hidden":"true"})):x("div",{class:"lp-play"},up(e,a),x("div",{class:"lp-vol"},g,f)));n&&m.setAttribute("data-hand",nt[at(l[0]??"")]?.token??"");const y=J(a);if(y){const b=y.on.includes(e.id);m.setAttribute("data-sec",""),b||m.setAttribute("data-sec-off",""),m.prepend(I("",{class:"lp-sec-in",role:"checkbox","aria-checked":String(b),"aria-label":`${e.name} in ${y.name}`,"data-lp-id":`in-${e.id}`,...B("in-section")},()=>C.setInSection(e.id,!b)))}if(r){const b=new Set;for(const E of e.events)b.add(Math.floor(E.at/i));const k=x("div",{class:"lp-bars",style:`--lp-bars: ${a.bars}`});for(let E=0;E<a.bars;E++)k.append(x("span",b.has(E)?{"data-on":""}:{},String(E+1)));const T=x("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});T.addEventListener("change",()=>C.editPass(e.id,{name:T.value})),m.append(x("div",{class:"lp-sheet"},T,x("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),x("span",{class:"lp-sub"},o?`Moves ${l.map(Le).join(" and ")}'s ${(e.knobs??[]).map(E=>E.label).join(", ")}. Muted, they go back where they were.`:`Plays through ${l.map(Le).join(" and ")||"its instrument"}'s current sound.`),o?null:hp(e,a),xt(e)?pp(e):null,k))}return m}function pp(e){const t=ii(e),n=e.events.find(o=>o.kind==="take"),a=n&&n.kind==="take"&&typeof n.normDb=="number"?n.normDb:null;return x("div",{class:"lp-pair lp-sheet-norm","data-lp-id":`norm-${e.id}`},x("div",{class:"lp-field"},ce("Normalize","pass-normalize"),mn(`pass-normalize-${e.id}`,"Normalize",[{value:"on",label:"On"},{value:"off",label:"Off"}],e.normalize?"on":"off",o=>C.editPass(e.id,{normalize:o==="on"}))),x("div",{class:"lp-field"},ce("Gain","pass-normalize-gain"),x("span",{class:"lp-value","data-lp-id":`norm-gain-${e.id}`},e.normalize?t!==null?fa(t):"LUCY's level":"As recorded"),x("span",{class:"lp-sub"},e.normalize?"To the voice level (−16 dB loudness); peaks stay under −3 dB.":a!==null?`On would add ${fa(a)}.`:"On plays it at the voice level.")))}function up(e,t){const a=[et(`pq-${e.id}`,`${e.name} quantize`,pi(t,!0),hi(e),o=>C.editPass(e.id,{quantize:fi(e,t,o)}),!1,"pass-quantize")];if(mi(e)&&e.quantize){const o=et(`ps-${e.id}`,`${e.name} strength`,ui(),String(e.quantize.strength),i=>{const r=gi(e,i);r&&C.editPass(e.id,{quantize:r})},!1,"pass-strength");a.push(o)}return x("div",{class:"lp-q",role:"group","aria-label":`${e.name} quantize`,...e.quantize?{"data-own":""}:{}},...a)}function hp(e,t){const n=mi(e)&&e.quantize?e.quantize:null;return x("div",{class:"lp-pair lp-sheet-q"},x("label",{class:"lp-field"},ce("Quantize","pass-quantize"),et(`sq-${e.id}`,`${e.name} quantize`,pi(t),hi(e),a=>C.editPass(e.id,{quantize:fi(e,t,a)}))),x("label",{class:"lp-field"},ce("Strength","pass-strength"),et(`ss-${e.id}`,`${e.name} strength`,ui(),String(e.quantize?.strength??t.quantize?.strength??1),a=>{const o=gi(e,a);o&&C.editPass(e.id,{quantize:o})},!n)))}function mp(e,t){const n=e.shift??0,a=id(e,t),o=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,i=d=>C.editPass(e.id,{shift:Math.max(-a,Math.min(a,n+d))}),r=ln(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,st.earlier,n<=-a?{disabled:""}:{},()=>i(-1)),l=ln(`shift-later-${e.id}`,`Move ${e.name} a bar later`,st.later,n>=a?{disabled:""}:{},()=>i(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return x("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${o(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...B("shift")},r,x("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function fp(e,t){const n=W(t);if(e.endTick>=n)return x("span",{class:"lp-repeat-none","aria-hidden":"true"});const a=Math.ceil(n/e.endTick),o=!!e.repeat,i=Math.round(e.endTick/(D*F)),r=I(o?`×${a}`:"once",{class:"lp-repeat","aria-pressed":String(o),"aria-label":o?`${e.name} repeats every ${i} ${i===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...B("repeat")},()=>C.editPass(e.id,{repeat:!o}));return o&&r.prepend(ja(st.loop)),r}function gp(e){const t=e.session.song,n=t.bars,a=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,o=x("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...B("ruler")}),i=x("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let y=1;y<=n;y++){const b=x("span",a&&y>=a.from&&y<=a.to?{"data-in":""}:{},String(y));r.push(b),i.append(b)}const l=x("div",{class:"lp-ruler-lane"});for(let y=1;y<n;y++)l.append(x("span",{class:"lp-ruler-tick",style:`--lp-at: ${y}`}));const c=x("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=y=>{c.hidden=!y,y&&(c.style.setProperty("--lp-from",String(y.from-1)),c.style.setProperty("--lp-to",String(y.to))),r.forEach((b,k)=>{y&&k+1>=y.from&&k+1<=y.to?b.setAttribute("data-in",""):b.removeAttribute("data-in")})};d(a);const p=x("span",{class:"lp-ruler-hint",role:"status"}),u=J(t),g=u?`Drag across bars to set ${u.name}'s bars`:"Drag across bars to repeat them";let f;const w=y=>{p.textContent=y,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(f),f=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=g,p.hidden=!!t.loop},3e3)},v=y=>{const b=x("button",{type:"button",class:"lp-loop-handle","data-end":y,"aria-label":y==="from"?"Loop start":"Loop end","data-lp-id":`loop-${y}`});return b.addEventListener("keydown",k=>{const T=t.loop;if(!T||k.key!=="ArrowLeft"&&k.key!=="ArrowRight")return;k.preventDefault();const E=k.key==="ArrowLeft"?-1:1,$={...T};y==="from"?$.from=Math.max(1,Math.min(T.to,T.from+E)):$.to=Math.min(n,Math.max(T.from,T.to+E)),C.setLoop($)}),b.addEventListener("pointerdown",k=>{const T=a;T&&(k.stopPropagation(),m(k,E=>y==="from"?{from:Math.min(E,T.to),to:T.to}:{from:T.from,to:Math.max(E,T.from)}))}),b};c.append(v("from"),v("to"));const h=y=>{const b=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((y-b.left)/Math.max(1,b.width)*n)+1))},m=(y,b)=>{if(e.jamming&&!K){w("Stop jamming to change the loop");return}o.setPointerCapture?.(y.pointerId),o.setAttribute("data-dragging","");const k=h(y.clientX);let T=!1,E=b(k);d(E);const $=z=>{h(z.clientX)!==k&&(T=!0),E=b(h(z.clientX)),d(E)},M=()=>{o.removeEventListener("pointermove",$),o.removeEventListener("pointerup",M),o.removeEventListener("pointercancel",M),o.removeAttribute("data-dragging");for(const A of r)A.removeAttribute("data-hover");const z=performance.now();if(!T&&Dt.bar===k&&z-Dt.at<450){Dt={at:0,bar:0},C.setLoop(null);return}if(Dt=T?{at:0,bar:0}:{at:z,bar:k},E.from===1&&E.to===n&&!t.loop){d(void 0),w("That's the whole song. Pick fewer bars.");return}C.setLoop(E)};o.addEventListener("pointermove",$),o.addEventListener("pointerup",M),o.addEventListener("pointercancel",M)};return o.addEventListener("pointerdown",y=>{if(y.button!==0)return;const b=h(y.clientX);m(y,k=>({from:Math.min(b,k),to:Math.max(b,k)}))}),o.addEventListener("pointermove",y=>{if(o.hasAttribute("data-dragging"))return;const b=h(y.clientX);r.forEach((k,T)=>{T+1===b?k.setAttribute("data-hover",""):k.removeAttribute("data-hover")})}),o.addEventListener("pointerleave",()=>{for(const y of r)y.removeAttribute("data-hover")}),p.textContent=g,p.hidden=!!a||n<2,l.append(p,c),o.append(i,l),o}function bp(e){if(e.length<2)return null;const t=new Map;for(const i of e)for(const r of new Set(i.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(i=>i.kept).length;te!=="all"&&te!=="starred"&&!t.has(te)&&(te="all"),te==="starred"&&!n&&(te="all");const a=(i,r,l,c={})=>{const d=I("",{class:"lp-chip","aria-pressed":String(te===i),"data-lp-id":`filter-${i}`,...c},()=>{te=te===i?"all":i,Y()});return d.append(r,x("span",{class:"lp-chip-n"},String(l))),d},o=x("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},a("all","All",e.length));for(const[i,r]of[...t].sort((l,c)=>Le(l[0]).localeCompare(Le(c[0]))))o.append(a(i,Le(i),r,{"data-inst":nt[at(i)]?.token??""}));return n&&o.append(a("starred",ja(st.star),n,{"aria-label":"Starred"})),o}function yp(e,t){const n=`Pass ${e.n}`,a={id:`live-${e.inst}`,n:e.n,name:n,endTick:W(t),instruments:[e.inst],events:e.events};return x("div",{class:"lp-pass-row lp-live","data-live":"","data-live-pattern":e.inst},x("span",{class:"lp-pass-name"},x("span",{class:"lp-dot","aria-hidden":"true"}),x("span",{class:"lp-pass-text"},x("span",{class:"lp-pass-line"},x("span",{class:"lp-pass-title"},n),x("span",{class:"lp-inst","data-inst":nt[at(e.inst)]?.token??""},Le(e.inst))),x("span",{class:"lp-pass-sub lp-knob-sub"},x("span",{class:"lp-pass-sub-text"},`Recording · ${ma(a,e.inst)}`),Di()))),x("div",{class:"lp-strip-box"},fn(a,t),x("span",{class:"lp-head","aria-hidden":"true"})))}function wp(e,t){const n=t.session.song,a=`Pass ${e.n}`,o=W(n),i=e.peaks.length/128,r=Math.max(0,Math.min(1,e.pos??0)),l=Math.max(1,Math.round(e.ticks*Math.min(r||i,i||r))),c={id:"live-voice",n:e.n,name:a,endTick:o,instruments:[e.lucy],events:e.peaks.length>1?[{kind:"take",inst:e.lucy,take:"live",at:e.from,len:l,peaks:e.peaks}]:[]},d=fn(c,n);if(Mt.delete(c.id),e.pos!==null&&e.pos<1){const u=((e.from+e.ticks*e.pos)/o*1e3).toFixed(1);d.append(O("line",{class:"lp-strip-rec",x1:u,x2:u,y1:"0",y2:"34"}))}const p=e.phase==="armed"?`Next loop · in ${Ce(t)||"a moment"}`:e.phase==="after"?"Saving the take…":`Recording… bar ${e.bar??1} of ${e.bars}`;return x("div",{class:"lp-pass-row lp-live lp-live-voice","data-live":"","data-live-pattern":"lucy","data-lp-id":"voice-row"},x("span",{class:"lp-pass-name"},e.phase==="armed"?ze(!0):x("span",{class:"lp-dot","aria-hidden":"true"}),x("span",{class:"lp-pass-text"},x("span",{class:"lp-pass-line"},x("span",{class:"lp-pass-title"},a),x("span",{class:"lp-inst","data-inst":"lucy"},Le(e.lucy))),x("span",{class:"lp-pass-sub","data-lp-id":"voice-sub"},p))),x("div",{class:"lp-strip-box"},d))}function Hs(){try{return(K?.notesTargets?.()??[]).filter(e=>e.type==="lucy"&&e.takesNotes).map(e=>e.instance)}catch{return[]}}let _t=!1;async function vp(){if(C.voicing){C.cancelVoice(!0);return}if(_t||!K)return;let e=Hs()[0];if(!e){let t=null;try{t=K.addInstrument?.({v:1,type:"lucy"})??null}catch{t=null}if(!t){C.notice="Add Audio (LUCY) to the Studio for a voice pass.",Y();return}_t=!0,C.notice="LUCY is added. Allow the mic when it asks.",Y();try{K.showInstance?.(t)}catch{}const n=t,a=await new Promise(o=>{const i=Date.now()+2e4,r=()=>{Hs().includes(n)?o(!0):Date.now()>i?o(!1):setTimeout(r,100)};r()});if(_t=!1,!a){C.notice="LUCY didn't open in time. Press + Voice again.",Y();return}e=n}C.voicePass(e)}function xp(e){const t=e.session.passes.filter(xt);if(!t.length)return null;const n=C.canUndoNormalize,a=t.filter(i=>!i.normalize).length,o=I(n?"Undo normalize":"Normalize voice",{class:"lp-voice lp-norm-all","data-lp-id":"normalize-voice",...B(n?"normalize-undo":"normalize-voice")},()=>n?C.undoNormalize():C.normalizeVoice());return!n&&!a&&(o.disabled=!0),x("div",{class:"lp-voice-box"},o,x("div",{class:"lp-voice-help"},n?"Puts them back as they were":a?"Every voice pass, same loudness":"Every voice pass is normalized"))}function $p(e){if(!K)return null;const t=e.voice,n=!!t,a=t?.phase==="recording"?"Recording voice":t?.phase==="after"?"Saving voice":t?"Voice next loop":"Voice",o=I("",{class:"lp-voice","data-lp-id":"voice",...n?{"data-busy":""}:{},"aria-label":n?"Cancel the voice pass":"Record a voice pass: the next loop from LUCY's mic",...B(n?"voice-busy":"voice")},()=>void vp());return o.append(...t?.phase==="recording"?[ze()]:t&&t.phase!=="after"?[ze(!0)]:["+ "],a),(t?.phase==="after"||_t)&&(o.disabled=!0),x("div",{class:"lp-voice-box"},o,x("div",{class:"lp-voice-help"},t&&t.phase!=="after"?"Press to cancel":"Next loop from LUCY's mic"))}const Pi="lupa-sections";let De=Sa().get(Pi)??!1,he=null;const Je=(e,t)=>e.sections?.find(n=>n.id===t)?.name??"",ot=(e,t,n=`${t}s`)=>`${e} ${e===1?t:n}`;function kp(e){const t=e.session.song,n=t.sections??[];if(!n.length)return"One section";const a=J(t),o=[];return e.songRec?o.push("Recording song"):e.songPlay&&o.push("Playing song"),a&&o.push(a.name),e.queued?o.push(`next ${Je(t,e.queued.section)} in ${qi(e.queued)}`):!e.songRec&&!e.songPlay&&o.push(ot(n.length,"section")),o.join(" · ")}function qi(e){return e.inBars>1?`${e.inBars} bars`:ot(Math.max(1,e.inBeats),"beat")}function Ep(e,t,n){const o=e.session.song.section===t.id,i=e.queued?.section===t.id,r=Ze(t),l=t.on.filter(u=>e.session.passes.some(g=>g.id===u)).length,c=i?`Next · in ${qi(e.queued)}`:o&&e.sectionAt?`Bar ${e.sectionAt.bar} of ${r} · ${l} on`:`${ot(r,"bar")} · ${l} on`,d=I("",{class:"lp-sec-tile","data-lp-id":`section-${t.id}`,"aria-pressed":String(o),"aria-label":`${t.name}, ${c}`,...i?{"data-queued":""}:{},...B("section-tile")},()=>C.selectSection(t.id));d.append(x("span",{class:"lp-sec-key","aria-hidden":"true"},String(n+1)),x("span",{class:"lp-sec-name"},t.name),x("span",{class:"lp-sec-meta","data-lp-id":`section-meta-${t.id}`},c));const p=i?e.queued?.progress:o&&e.sectionAt?e.sectionAt.pos:null;return p!=null&&d.append(x("span",{class:"lp-sec-prog","aria-hidden":"true"},x("i",{style:`width: ${Math.round(p*100)}%`}))),d}function Ap(e){const t=e.session.song,n=J(t);if(!n||e.jamming)return null;const a=x("input",{class:"lp-sec-input",type:"text",value:n.name,maxlength:"24","aria-label":"Section name","data-lp-id":"section-name",...B("section-name")}),o=()=>{C.renameSection(n.id,a.value)||(a.value=n.name)};a.addEventListener("change",o),a.addEventListener("keydown",r=>{r.key==="Enter"&&a.blur(),r.key==="Escape"&&(a.value=n.name,a.blur())});const i=I("Delete section",{class:"lp-link","data-lp-id":"delete-section",...B("delete-section")},()=>C.deleteSection(n.id));return i.disabled=(t.sections?.length??0)<2,x("div",{class:"lp-sec-edit"},ce("Name"),a,i,x("span",{class:"lp-sub"},"Length is in Setup."))}function Sp(e){const t=e.session.song,n=t.arrangement??[],a=x("div",{class:"lp-perf-hd"},x("h4",{class:"lp-sec-title"},"Song")),o=x("div",{class:"lp-perf-steps","data-lp-id":"song-steps"}),i=x("div",{class:"lp-perf","data-lp-id":"song"},a),r=(w,v,h={},m=null)=>{const y=I("",{class:"lp-perf-step","data-lp-id":`step-${v}`,...B("song-step"),...h},()=>{h["data-live"]!==void 0||e.songPlay||(he=he===v?null:v,Y())});return y.append(x("span",{class:"lp-perf-n"},String(v+1)),x("span",{},Je(t,w.section)),x("span",{class:"lp-perf-x"},`×${w.times}`)),m!==null&&y.append(x("span",{class:"lp-sec-prog","aria-hidden":"true"},x("i",{style:`width: ${Math.round(m*100)}%`}))),y};if(e.songRec)return a.append(x("span",{class:"lp-perf-status","data-lp-id":"song-status"},x("span",{class:"lp-rec-dot","aria-hidden":"true"}),"Recording song"),x("span",{class:"lp-sub lp-perf-hint"},"Keep playing sections. Stop ends the song."),I("Stop",{class:"lp-perf-btn","data-solid":"","data-lp-id":"song-record",...B("song-record")},()=>C.toggleSongRecord())),e.songRec.forEach((w,v)=>o.append(r(w,v,v===(e.songRec?.length??0)-1?{"data-live":""}:{},null))),e.songRec.length||o.append(x("span",{class:"lp-sub"},"The first step starts at the next bar 1.")),i.append(o),i;const l=od(t),c=n.length?`${ot(l,"bar")} · ${ri(l,t.bpm)}`:"";if(!n.length){const w=x("span",{class:"lp-sub lp-perf-hint"});return w.append("Press ",x("b",{},"Record song"),", then play your sections. What you play becomes the song."),a.append(w,I("Record song",{class:"lp-perf-btn","data-lp-id":"song-record",...B("song-record")},()=>C.toggleSongRecord())),a.lastElementChild?.prepend(x("span",{class:"lp-rec-dot","aria-hidden":"true"})),i}const d=e.songPlay;a.append(x("span",{class:"lp-perf-status","data-lp-id":"song-status"},d?`Playing song · ${Je(t,n[d.index]?.section)}, ${d.lap} of ${n[d.index]?.times??1}`:`${ot(n.length,"step")} · ${c}`),x("span",{class:"lp-sub lp-perf-hint"},d?"Hands off: it plays to the end, then stops.":"Plays hands-free. Record again for a new take."));const p=I(d?"Stop":"Play song",{class:"lp-perf-btn","data-solid":"","data-lp-id":"song-play",...B("song-play")},()=>C.toggleSongPlay());p.prepend(x("span",{class:d?"lp-stop-mark":"lp-play-mark","aria-hidden":"true"}));const u=I("Record again",{class:"lp-perf-btn","data-quiet":"","data-lp-id":"song-record",...B("song-record")},()=>C.toggleSongRecord());u.prepend(x("span",{class:"lp-rec-dot","aria-hidden":"true"})),a.append(p,u),e.canUndoSong&&!d&&a.append(I("Undo",{class:"lp-link","data-lp-id":"song-undo",...B("song-undo")},()=>C.undoSong())),he!==null&&(he>=n.length||d)&&(he=null),n.forEach((w,v)=>{const h=d?.index===v,m=h&&e.sectionAt?((d?.lap??1)-1+e.sectionAt.pos)/w.times:null;o.append(r(w,v,h?{"data-now":""}:he===v?{"data-open":""}:{},m))}),i.append(o);const g=he,f=g!==null?n[g]:void 0;if(g!==null&&f){const w=x("span",{class:"lp-step-times"},I("−",{"aria-label":"Fewer times","data-lp-id":"step-fewer"},()=>C.setStepTimes(g,f.times-1)),x("span",{class:"lp-mono"},`×${f.times}`),I("+",{"aria-label":"More times","data-lp-id":"step-more"},()=>C.setStepTimes(g,f.times+1))),v=I("◀ Earlier",{class:"lp-link","data-lp-id":"step-earlier"},()=>{C.moveStep(g,-1),he=g-1,Y()});v.disabled=g===0;const h=I("Later ▶",{class:"lp-link","data-lp-id":"step-later"},()=>{C.moveStep(g,1),he=g+1,Y()});h.disabled=g===n.length-1,i.append(x("div",{class:"lp-step-edit","data-lp-id":"step-edit"},x("span",{},`${g+1} · ${Je(t,f.section)}`),w,v,h,I("Remove",{class:"lp-link","data-lp-id":"step-remove"},()=>{he=null,C.removeStep(g)}),x("span",{class:"lp-mono lp-sub lp-perf-total"},c)))}else o.append(x("span",{class:"lp-mono lp-sub lp-perf-total"},c));return i}function Mp(e){const t=e.session.song,n=t.sections??[],a=x("div",{class:"nc-group lp-sections","data-lp-id":"sections","data-nc-open":String(De)}),o=I("",{class:"nc-group-toggle",id:"lp-sections-toggle","aria-expanded":String(De),"aria-controls":"lp-sections-body","data-lp-id":"sections-toggle",...B("sections")},()=>{De=!De,Ao(globalThis.localStorage??null,Pi,De),Y()});if(o.append(x("span",{class:"nc-group-title"},"Sections"),x("span",{class:"nc-group-summary","data-lp-id":"sections-summary"},kp(e)),x("span",{class:"nc-group-mark","aria-hidden":"true"},De?"−":"+")),a.append(o),!De)return a;const i=x("div",{class:"nc-group-body lp-sections-body",id:"lp-sections-body",role:"group","aria-labelledby":"lp-sections-toggle"}),r=x("p",{class:"lp-sub lp-sec-hint","data-lp-id":"sections-hint"});n.length?e.queued?r.append(x("b",{},Je(t,e.queued.section)),` starts when ${J(t)?.name??"this one"} ends. Tap it again to cancel.`):e.songPlay?r.append("The song is choosing sections. Tap one to take over."):r.append("Tap a section (or press 1–9) to play it next. It switches when the loop ends."):r.append("Build a song from parts: ",x("b",{},"+ Section")," copies this one. Then pick which passes play in each, and tap (or press 1–9) to switch at the end of the loop.");const l=x("div",{class:"lp-sec-tiles","data-lp-id":"section-tiles"});(n.length?n:[{id:"",name:"Section 1",from:t.loop?.from??1,to:t.loop?.to??t.bars,on:e.session.passes.map(u=>u.id)}]).forEach((u,g)=>{if(u.id)l.append(Ep(e,u,g));else{const f=x("div",{class:"lp-sec-tile","aria-pressed":"true","data-lp-id":"section-implicit"},x("span",{class:"lp-sec-key","aria-hidden":"true"},"1"),x("span",{class:"lp-sec-name"},u.name),x("span",{class:"lp-sec-meta"},`${ot(Ze(u),"bar")} · all passes`));l.append(f)}});const d=I("+ Section",{class:"lp-sec-add","data-lp-id":"add-section",...B("add-section")},()=>{C.addSection()});d.disabled=n.length>=9,l.append(d),i.append(r,l);const p=Ap(e);return p&&i.append(p),n.length&&i.append(Sp(e)),a.append(i),a}function Tp(e){const t=e.session.passes,n=t.some(v=>v.solo),a=t.filter(v=>te==="all"?!0:te==="starred"?v.kept:v.instruments.includes(te)),o=x("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&o.append(x("div",{class:"lp-pass-head"},gp(e)));const i=e.voice;if(i&&(i.phase==="recording"||i.phase==="after"||i.phase==="armed")?o.append(wp(i,e)):e.phase==="recording"&&(e.lapHasNotes||!e.livePatterns.length)&&o.append(x("div",{class:"lp-pass-row lp-live","data-live":""},x("span",{class:"lp-pass-name"},x("span",{class:"lp-dot","aria-hidden":"true"}),x("span",{class:"lp-pass-text"},x("span",{class:"lp-pass-title"},`Pass ${e.nextPass+e.livePatterns.length}`),x("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),e.phase==="recording")for(const v of[...e.livePatterns].reverse())o.append(yp(v,e.session.song));const r=i?null:e.phase==="armed"?`Recording from bar ${e.recBar} · in ${Ce(e)}`:e.record&&t.length&&(e.phase==="idle"||e.phase==="waiting")?e.session.song.start==="wait"?"Records from the first sound":e.session.song.countInBars?`Records from bar ${e.recBar} after the count-in`:`Records from bar ${e.recBar}`:e.record&&t.length&&e.phase==="count-in"?`Records from bar ${e.recBar} after the count-in`:null;r&&o.append(x("div",{class:"lp-pass-row lp-live","data-live":"","data-armed":""},x("span",{class:"lp-pass-name"},ze(!0),x("span",{class:"lp-pass-text"},x("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),x("span",{class:"lp-pass-sub","data-lp-id":"armed-text"},r))))),Mt.clear();const l=new Map;for(const v of e.hands){const h=l.get(v.pass);l.set(v.pass,h?{from:Math.min(h.from,v.from),to:Math.max(h.to,v.to)}:v)}for(const v of[...a].reverse())o.append(dp(v,n,l.get(v.id)??null));!t.length&&e.phase!=="recording"?o.append(x("p",{class:"lp-sub","data-lp-id":"passes-empty"},e.waiting?"Waiting for the first sound.":"No passes yet. Press Jam (or Space) and play.")):t.length&&!a.length&&o.append(x("p",{class:"lp-sub"},"No passes here."));const c=t.filter(v=>!v.kept).length,d=I(`CLEAR UNSTARRED${c?` (${c})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...B("clear-unkept")},()=>C.clearUnkept());d.disabled=!c;const p=!!e.session.song.sections?.length,u=J(e.session.song);Ba(Et.mount,Mp(e),x("div",{class:"lp-chiprow"},bp(t)??x("span"),x("div",{class:"lp-voice-acts"},xp(e),$p(e))),p&&u&&t.length?x("p",{class:"lp-sub lp-sec-note","data-lp-id":"section-note"},"Checked passes play in ",x("b",{},u.name),`. A pass you record now is only in ${u.name}.`):null,o,t.length?x("div",{class:"lp-between"},x("span",{class:"lp-row"},d,x("span",{class:"lp-sub"},"Starred passes stay.")),x("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${se}`)):null),ht="";const g=Et.mount.querySelector('[data-lp-id="section-tiles"]'),f=g?.querySelector(".lp-sec-tile[data-queued]")??g?.querySelector('.lp-sec-tile[aria-pressed="true"]'),w=f?.dataset.lpId??"";g&&f&&g.scrollWidth>g.clientWidth&&(w!==_s&&(_s=w,qn=Math.max(0,f.offsetLeft+f.offsetWidth-g.clientWidth+8)),g.scrollLeft=qn,g.addEventListener("scroll",()=>{qn=g.scrollLeft}))}let _s="",qn=0,ht="";function Cp(e){const t=Et.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),ht){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");ht=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const a=e.session.passes.some(l=>l.solo),o=[];for(const l of e.session.passes){if(l.mute||a&&!l.solo)continue;const c=Mt.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){o.push(l.id);break}}}const i=o.join("|");if(i===ht)return;ht=i;const r=new Set(o);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const Ii=[Mi,Et];Jc($i,Ii.map(e=>e.handle),"adjacent");let Vs="";function Bi(e){const t=e.session.song.loop,n=e.bar===null?"":t?`Bar ${e.bar} · loop ${tt(t)}`:`Bar ${e.bar} / ${e.session.song.bars}`,a=e.phase==="waiting"?"Lupa · waiting for the first sound":e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.phase==="playing"?`Lupa · Play · ${n}`:e.phase==="armed"?e.voice?`Lupa · voice pass in ${Ce(e)}`:`Lupa · Rec from bar ${e.recBar} · in ${Ce(e)}`:`Lupa · ${n} · Pass ${e.voice?.n??e.nextPass}`:null,o=a===null?null:e.phase==="armed"?"armed":e.phase==="recording"?"rec":null,i=`${a}|${e.phase}|${o}`;if(i!==Vs){Vs=i;try{K?.readout?.(a,o?{dot:o}:void 0),K?.chip?.(e.waiting?{text:"Waiting"}:e.jamming?e.phase==="playing"?{text:e.bar!==null?`Play · bar ${e.bar}`:"Play"}:e.phase==="armed"?{text:`Rec in ${Ce(e)}`,armed:!0}:{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:C.passCount?{text:`${C.passCount} passes`}:null)}catch{}}}function Y(){const e=C.view();Xd(e),np(e),Tp(e);for(const n of Ii)n.update();const t=ki.querySelector(".lp-notice");t&&(t.textContent=e.notice),Kd(),Bi(e)}C.onChange(Y);K?.playKeys?.(Array.from({length:9},(e,t)=>`Digit${t+1}`));document.addEventListener("keydown",e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.repeat)return;const t=/^Digit([1-9])$/.exec(e.code);if(!t||!C.sections.length)return;const n=e.target;n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.tagName==="SELECT"||n.isContentEditable)||C.selectSectionAt(Number(t[1])-1)&&e.preventDefault()});document.addEventListener("keydown",e=>{if(e.code!=="Space"||!e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||(e.preventDefault(),e.repeat||C.toggleRecord())});setInterval(()=>{C.tick()&&Y(),C.jamming||C.syncTempo()},Od);function Ri(){const e=C.view();(e.jamming||e.waiting)&&(Ni(e),Bi(e)),Cp(e),requestAnimationFrame(Ri)}requestAnimationFrame(Ri);Y();K?.providePreset?.({format:"nc-song-looper",version:Da,get:()=>structuredClone(C.session),async set(e){const t=qa(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;C.jamming&&C.stop(),await ne.flush();const n=await ne.adopt(t.session);C.openSession(n),ne.setCurrent(n.id),Oe=null,te="all",C.notice=`“${n.name}” is open, from the Studio’s scene.`,Y(),$t?.refresh()}});window.__looper={looper:C,store:ne,songs:()=>$t,view:()=>C.view(),get hosted(){return!!K}};
