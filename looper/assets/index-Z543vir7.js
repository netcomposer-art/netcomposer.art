(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function fi(){return(performance.timeOrigin+performance.now())/1e3}var gi="nc-ui",bi={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Xn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},Nt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},yi={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ve={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},wi={light:{color:bi.color,semantic:Xn,component:Nt,runtime:yi},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},yn=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],nt=e=>`--${gi}-${e}`,$s="data-nc-theme",$a="nc-ui-theme-change",vi="(prefers-color-scheme: dark)",Qn=e=>e?.documentElement??null,ks=e=>e?.defaultView?.matchMedia?.(vi)??null,xi=e=>e==="light"||e==="dark"?e:"system";function $i(e=globalThis.document){return xi(Qn(e)?.getAttribute($s))}function wn(e=globalThis.document){let t=$i(e);return t!=="system"?t:ks(e)?.matches?"dark":"light"}var Es="data-nc-skin",ki=(yn.find(e=>e.default)??yn[0])?.id??"prussian",Ei=e=>yn.some(t=>t.id===e)?e:ki;function Ai(e=globalThis.document){return Ei(Qn(e)?.getAttribute(Es))}function As(e,t=globalThis.document){let n=Qn(t);if(!n)return()=>{};let s=()=>`${wn(t)} ${Ai(t)}`,o=s(),i=()=>{let d=s();d!==o&&(o=d,e(wn(t)))},r=t.defaultView?.MutationObserver,l=r?new r(i):null;l?.observe(n,{attributes:!0,attributeFilter:[$s,Es]});let c=ks(t);return c?.addEventListener?.("change",i),t.addEventListener($a,i),()=>{l?.disconnect(),c?.removeEventListener?.("change",i),t.removeEventListener($a,i)}}var vn=Xn["label-on-fill-dark"],ka=Xn["label-on-fill-light"],Si=ve["label-min-contrast"],Mi=/^#[0-9a-f]{6}$/i,Ti=e=>typeof e=="string"&&Mi.test(e),At=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function Ea(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let s=t*Math.min(n,1-n),o=i=>{let r=(i+e/30)%12;return n-s*Math.max(-1,Math.min(r-3,9-r,1))};return`#${At(o(0)*255)}${At(o(8)*255)}${At(o(4)*255)}`}function Ss(e){let[t,n,s]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),o=Math.max(t,n,s),i=Math.min(t,n,s),r=(o+i)/2,l=o-i;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((o===t?60*((n-s)/l%6):o===n?60*((s-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function Aa(e){let[t,n,s]=[1,3,5].map(o=>{let i=parseInt(e.slice(o,o+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*s}function xn(e,t){let[n,s]=[Aa(e),Aa(t)].sort((o,i)=>i-o);return(n+.05)/(s+.05)}var zt=e=>xn(e,vn)>=xn(e,ka)?vn:ka;function Ms(e,t,n,s=Si){let o=Ea(e,t,n),i=zt(o)===vn?1:-1;for(let r=0;r<40&&xn(o,zt(o))<s;r++)n+=i*.01,o=Ea(e,t,n);return o}function Li(e){let{h:t,s:n}=Ss(e),s=Ms(t,Math.min(n,ve["surprise-on-max-saturation"]),ve["surprise-on-lightness"]);return{fill:e,ink:zt(e),on:s,onInk:zt(s)}}var Ci=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Fi(e,t=Math.random){let[n,s]=ve["surprise-saturation"],[o,i]=ve["surprise-lightness"],r=ve["surprise-min-hue-gap"],l=Ti(e)?Ss(e).h:null,c=t()*360;return l!==null&&Ci(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),Ms(c,n+t()*(s-n),o+t()*(i-o))}function Ni(e){if(!e)return null;let t=Li(e);return{[nt("surprise-fill")]:t.fill,[nt("surprise-ink")]:t.ink,[nt("surprise-on")]:t.on,[nt("surprise-on-ink")]:t.onInk}}var zi=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Di=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function Sa(e){let[t,n,s]=[1,3,5].map(l=>zi(parseInt(e.slice(l,l+2),16)/255)),o=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*s),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*s),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*s);return[.2104542553*o+.793617785*i-.0040720468*r,1.9779984951*o-2.428592205*i+.4505937099*r,.0259040371*o+.7827717662*i-.808675766*r]}function qi([e,t,n]){let s=(e+.3963377774*t+.2158037573*n)**3,o=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*s-3.3077115913*o+.2309699292*i,-1.2684380046*s+2.6097574011*o-.3413193965*i,-.0041960863*s-.7034186147*o+1.707614701*i].map(r=>At(Di(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var Pi=ve["velocity-range"],Ts={min:Nt.rhythm["velocity-min"],max:Nt.rhythm["velocity-max"]},Ma=Object.fromEntries(Object.entries(wi).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function Ii(e,t=Ts){let[n,s]=Pi,o=Number.isFinite(e)?Math.max(n,Math.min(s,e)):n,i=(o-n)/(s-n),r=t.ink??Nt.rhythm["step-cell-ink"];if(i<=0)return{velocity:o,t:0,fill:t.min.toUpperCase(),ink:r};if(i>=1)return{velocity:o,t:1,fill:t.max.toUpperCase(),ink:r};let l=Sa(t.min),c=Sa(t.max);return{velocity:o,t:i,fill:qi(l.map((d,p)=>d+(c[p]-d)*i)),ink:r}}function Ta(e,t=Ts){return{[nt("velocity-fill")]:Ii(e,t).fill}}var Bi={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},ji={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Ri={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Oi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},Yt={};for(let[e,t]of Object.entries(ji))Yt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Oi))Yt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Ri))Yt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Bi.renames.map(e=>[e.old,e.new]));function Ls(e){let t=Yt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function H(e){return Ls(e).prop}function a(e){return`var(${H(e)})`}function Hi(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(H(t)));return Number.isFinite(n)?n:0}function Y(e,t){let n=Ls(t),s=e.ownerDocument??document,o=s.createElement("span");o.dataset.ncLive=t,o.style.position="absolute",o.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?o.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?o.style.paddingLeft=i:o.style.color=i,(e instanceof Element?e:s.documentElement).append(o);let r=(s.defaultView??window).getComputedStyle(o),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return o.remove(),l}function Cs(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function _i(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let s=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),s}var Vi="[data-modulated], [data-modulated] *";function Qt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function La(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function Zt(e){return`  background-image: conic-gradient(from -26.565deg at 50% 100%, ${a(e)} 53.13deg, transparent 0);`}function Yi(){let e=s=>`
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
${Vi} { transition: none; }
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
/* The ▾ (Peter, 2026-11-23: "1/8" and "50%" didn't look like dropdowns; LUPA's ▾ for every instrument). A small solid
   triangle at the select's end, inside its end padding, so the words keep their room: quiet (text-sub), the text
   colour on hover and focus, the divider grey when the select is off. Drawn as a background (a <select> has no
   ::after), so it is the same on every platform and font. .nc-dd puts the same ▾ on an app's own select. */
:is(.nc-select, .nc-dd) {
${Zt("text-sub")}
  background-size: ${a("select-mark")} ${a("select-mark")};
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${Zt("text")}
}
:is(.nc-select, .nc-dd):disabled {
${Zt("divider")}
}
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
${La("")}
}
@media (max-width: 1023px) {
${La("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Qt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Qt("")}
}
@media (max-width: 1023px) {
${Qt("html[data-nc-landscape] ")}
}
/* Filled panels (data-nc-fill on <html>, Peter 2026-11-19), an option over any skin: the page is a darker ground,
   each module a raised card (an inset ring of the ground makes the gutter, so nothing moves), empty steps are soft
   solid cells instead of outlines, and a host may wash each console strip in its instrument's colour (a custom
   property it sets on the strip; README, Filled panels). A strip with a shade the player picked keeps that shade. */
:root[data-nc-fill], :root[data-nc-fill] body { background: ${a("fill-rack")}; }
:root[data-nc-fill] .nc-module,
:root[data-nc-fill] .nc-module[data-nc-place][data-nc-shade] {
  background: ${a("fill-panel")};
  border-radius: ${a("fill-radius")};
  box-shadow: inset 0 0 0 ${a("fill-gutter")} ${a("fill-rack")};
}
:root[data-nc-fill] .nc-module[data-nc-place="stack"] > .nc-module-hd { border-radius: ${a("fill-radius")} ${a("fill-radius")} 0 0; }
:root[data-nc-fill] .nc-step:not([aria-pressed="true"]):not([data-out="true"]) {
  background: ${a("fill-cell")};
  border-color: ${a("fill-cell")};
  border-radius: ${a("fill-cell-radius")};
}
:root[data-nc-fill] .nc-step[aria-pressed="true"] { border-radius: ${a("fill-cell-radius")}; }
:root[data-nc-fill] .nc-step[data-bar="true"]:not([aria-pressed="true"]):not([data-out="true"]) { border-bottom-color: ${a("rhythm.bar-accent")}; }
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 9%, ${a("fill-panel")});
  border-radius: ${a("fill-radius")};
}
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]),
:root[data-nc-fill][data-nc-theme="dark"] .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
  --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 14%, ${a("fill-panel")});
}
@media (prefers-color-scheme: dark) {
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]),
  :root[data-nc-fill]:not([data-nc-theme="light"]) .nc-strip:not([data-nc-master]):not([data-nc-shade]):nth-child(even of .nc-strip:not([data-nc-master])) {
    --nc-strip-ground: color-mix(in srgb, var(--nc-strip-identity, ${a("fill-panel")}) 14%, ${a("fill-panel")});
  }
}
:root[data-nc-fill] .nc-strip + .nc-strip { border-inline-start-color: ${a("fill-panel")}; }
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
`}var en=null,Ui="nc-ui-fallback";function Fs(e=globalThis.document){if(!e?.documentElement||(e.documentElement,en&&en.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ui} {
${Yi()}
}
`,e.head.append(t),en=t}var Ki=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Wi=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Ki,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let s=()=>{t.ncWait=null,n()};t.onload=s,t.onerror=s}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Wi(document);function Ns(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let s=t.createElement("span");s.className="nc-ui-switch-text",s.setAttribute("aria-hidden","true");let o=t.createElement("span");o.dataset.ncOn="",o.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",s.append(o,i),n.append(s);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var zs=new WeakMap,Ca=.25;function Gi(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let s=t.createElement("span");s.className="nc-fader-track",s.setAttribute("aria-hidden","true");let o=t.createElement("span");o.className="nc-fader-cap",o.setAttribute("aria-hidden","true"),n.append(s,o);let i=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},h=u=>{let m=d(u);m!==i&&(i=m,p(),l?.(m))},b=0,f=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();u.target!==o&&m.height>0&&h(1-(u.clientY-m.top)/m.height),b=u.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!f)return;let m=n.getBoundingClientRect().height||1,y=(b-u.clientY)/m*(u.shiftKey?Ca:1);b=u.clientY,h(i+y)});let w=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",u=>{u.preventDefault(),c?.()}),n.addEventListener("keydown",u=>{let m=u.shiftKey?r*Ca:r,y={ArrowUp:i+m,ArrowRight:i+m,ArrowDown:i-m,ArrowLeft:i-m,PageUp:i+r*10,PageDown:i-r*10,Home:0,End:1};u.key in y&&(u.preventDefault(),h(y[u.key]))});let v={el:n,get value(){return i},get dragging(){return f},set(u){f||(i=d(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(r=u.step),u.onChange&&(l=u.onChange),u.onReset&&(c=u.onReset)}};return v.setLabel(e.label),v.set(e.value??0),v.setText(e.valueText),zs.set(n,v),v}function Ji(e){return zs.get(e)}var Ds=new WeakMap,Xi=.2,Qi=1.5,Zi=.5;function er(e,t){let n=String(e??"").trim(),s=Number.parseFloat(n);return Number.isFinite(s)?n.endsWith("ms")?s/1e3:s:t}function Fa(e,t,n){let s=e.ownerDocument?.defaultView??globalThis;return typeof s.getComputedStyle!="function"?n:er(s.getComputedStyle(e).getPropertyValue(H(t)),n)}function tr(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,s=t.createElement("div");s.className="nc-meter",s.dataset.ncChannels=String(n);let o=t.createElement("button");o.type="button",o.className="nc-meter-clip",o.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let r=[];for(let v=0;v<n;v++){let u=t.createElement("span");u.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let g=t.createElement("span");g.className="nc-meter-hold",u.append(m,y,g),i.append(u),r.push({peak:m,rms:y,hold:g,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}s.append(o,i);let l=e.label,c=e.onClear,d=!1,p=-1,h=-1,b=()=>{o.dataset.lit=d?"true":"false",o.setAttribute("aria-pressed",d?"true":"false"),o.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),o.title=d?"Clipped. Click to clear":"Clip light"},f=(v,u,m,y)=>{let g=Math.round(y*1e3)/1e3;m[u]!==g&&(m[u]=g,v.style.transform=u==="hold"?`translateY(${Math.round((1-g)*1e3)/10}%)`:`scaleY(${g})`)};o.addEventListener("click",()=>{w.clear(),c?.()});let w={el:s,get clipped(){return d},update(v,u){p<0&&(p=Fa(s,"motion-meter-fall",Xi)),h<0&&(h=Fa(s,"motion-meter-hold",Qi));let m=Math.max(0,Math.min(.25,Number(u)||0)),y=p>0?Math.exp(-m/p):0;r.forEach((g,k)=>{let L=v[k]??v[0]??{peak:0,rms:0},A=Math.min(1,Math.max(0,Number(L.peak)||0)),x=Math.min(A,Math.max(0,Number(L.rms)||0));L.over&&w.clip(),g.level.peak=A>=g.level.peak?A:A+(g.level.peak-A)*y,g.level.rms=x>=g.level.rms?x:x+(g.level.rms-x)*y,g.holdAge+=m,A>=g.holdAt?(g.holdAt=A,g.holdAge=0):g.holdAge>h&&(g.holdAt=Math.max(A,g.holdAt-Zi*m)),f(g.peak,"peak",g.shown,g.level.peak),f(g.rms,"rms",g.shown,g.level.rms),f(g.hold,"hold",g.shown,g.holdAt),g.hold.dataset.off=g.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,b())},clear(){d=!1,b()},reset(){for(let v of r)v.level.peak=0,v.level.rms=0,v.holdAt=0,v.holdAge=0,f(v.peak,"peak",v.shown,0),f(v.rms,"rms",v.shown,0),f(v.hold,"hold",v.shown,0),v.hold.dataset.off="true"},setLabel(v){l=v,b()},configure(v){v.onClear&&(c=v.onClear)}};return b(),w.reset(),Ds.set(s,w),w}function nr(e){return e?Ds.get(e):void 0}var ar=3,sr=new Set(["freq","q","rate","time","log"]);function Zn(e,t,n){return!e||!sr.has(e)||!(n>t)?"linear":t>0?"log":"power"}function mt(e,t,n){return Zn(e,t,n)!=="linear"}function Dt(e,t,n,s){let o=Number(s);if(!(n>t)||!Number.isFinite(o))return 0;let i=Math.min(n,Math.max(t,o)),r=Zn(e,t,n);if(r==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return r==="power"?Math.cbrt(l):l}function qs(e,t,n,s){let o=Math.min(1,Math.max(0,Number(s)||0)),i=Zn(e,t,n);return i==="log"?t*(n/t)**o:t+(n-t)*(i==="power"?o**ar:o)}function Ps(e,t,n,s){let o=Math.min(n,Math.max(t,e));if(s>0){o=t+Math.round((o-t)/s)*s;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(s))+1));o=Number(o.toFixed(i)),o=Math.min(n,Math.max(t,o))}return o}function ct(e,t,n,s){return Math.round(Dt(e,t,n,s)*1e3)}function qt(e,t,n,s,o){return Ps(qs(e,t,n,Number(s)/1e3),t,n,o)}function or(e,t,n=!1){let s=Number(e)||0,o=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=s+o:t==="ArrowLeft"||t==="ArrowDown"?i=s-o:t==="PageUp"?i=s+1e3/10:t==="PageDown"?i=s-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function ea(e,t,n,s,o,i=!1,r){let l=ct(e,t,n,s),c=or(l,o,i);if(c===null)return null;let d=qt(e,t,n,c,r),p=Math.sign(c-l),h=Ps(Number(s),t,n,r);for(;p!==0&&d===h&&c>0&&c<1e3;)c+=p,d=qt(e,t,n,c,r);return d}function Na(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function ir(e,t,n,s=n/6){let o=e.some(p=>p===null),i=Math.max(0,n-(o?s:0)),r=e.reduce((p,h,b)=>h===null?p:p+Na(t[b]),0),l=r>0?i/r:0,c=e.map(p=>p===null?0:Math.min(i,Na(p)*l));if(o){let p=c.reduce((b,f)=>b+f,0),h=e.indexOf(null);c[h]=Math.max(s,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return o&&(d[d.length-1]=n),d}function rr(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),s=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.floor(t*s)),i=Math.max(1,Math.floor(n*s));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(s,0,0,s,0,0),{ctx:r,w:t,h:n}}function fe(e){return Math.max(0,Math.min(1,e))}function Is(e,t){let{ctx:n,w:s,h:o}=rr(e);if(!n)return;n.clearRect(0,0,s,o);let i=_i(e);if(t.paint==="swatch"){let c=Y(e,"accent"),d=Y(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,s/2,o),n.fillStyle=d,n.fillRect(s/2,0,s/2,o);return}if(t.paint==="filter"&&typeof t.hz=="number"){dr(n,s,o,t,e,i);return}if(t.paint==="filter"){let c=t.mode??"lp",d=Y(e,Cs(c)),p=Y(e,"divider"),h=fe(t.cutoff??.5),b=.08+(1-fe(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,o*.72),n.lineTo(s,o*.72),n.stroke(),n.beginPath();for(let f=0;f<=s;f++){let w=f/Math.max(1,s),v=0;c==="lp"?v=w<h?1:Math.max(0,1-(w-h)/b):c==="hp"?v=w>h?1:Math.max(0,1-(h-w)/b):v=Math.max(0,1-Math.abs(w-h)/b);let u=o*.78-v*o*.62;f===0?n.moveTo(f,u):n.lineTo(f,u)}n.strokeStyle=d,n.stroke(),n.fillStyle=Y(e,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,o),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=Y(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,h,b]=ir([c,d],t.max??[1,4],s),f=2,w=o-1;n.beginPath(),n.moveTo(p,w),n.lineTo(h,f);let v=Math.max(1,Math.ceil(b-h));for(let u=1;u<=v;u++){let m=u/v;n.lineTo(h+(b-h)*m,w-(w-f)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(b,w),n.lineTo(s,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],h=Y(e,"accent"),b=Y(e,"text-sub"),f=o/2;n.fillStyle=Y(e,"accent-soft"),n.fillRect(fe(d)*s,0,(fe(p)-fe(d))*s,o),n.strokeStyle=Y(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(s,f),n.stroke();let w=Math.floor(c.length/2);for(let v=0;v<w;v++){let u=(v+.5)/w*s,m=Math.max(-1,Math.min(1,c[v*2]??0)),y=Math.max(-1,Math.min(1,c[v*2+1]??0)),g=(v+.5)/w;n.strokeStyle=g>=d&&g<=p?h:b,n.beginPath(),n.moveTo(u,f-y*(f-1)),n.lineTo(u,f-m*(f-1)+.5),n.stroke()}n.strokeStyle=h;for(let v of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let u=Math.round(fe(v)*(s-1))+.5;n.beginPath(),n.moveTo(u,0),n.lineTo(u,o),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=Y(e,"text"),n.fillRect(Math.round(fe(t.position)*(s-1)),0,1,o)),w||(n.fillStyle=b,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=fe(t.level??0);n.fillStyle=Y(e,"divider"),n.fillRect(0,o*.4,s,o*.2),n.fillStyle=Y(e,"accent"),n.fillRect(0,o*.4,s*c,o*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=Y(e,"rhythm.step-cell-off"),n.fillRect(0,o*.45,s,o*.1),n.fillStyle=Y(e,"rhythm.playhead"),n.fillRect(l/r*s,o*.3,Math.max(1,s/r),o*.4),e.dataset.ncAccent=Y(e,"accent")}var ot=20,$n=2e4,tn=24,za=-60;function lr(e,t,n,s,o=48e3){let i=2*Math.PI*Math.min(t,o*.49)/o,r=Math.cos(i),l=Math.sin(i)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let h=1+l,b=-2*r,f=1-l,w=2*Math.PI*s/o,v=(g,k,L)=>g+k*Math.cos(w)+L*Math.cos(2*w),u=(g,k)=>-(g*Math.sin(w)+k*Math.sin(2*w)),m=Math.hypot(v(c,d,p),u(d,p)),y=Math.hypot(v(h,b,f),u(b,f));return y>0?m/y:0}function cr(e,t){return Math.log(Math.max(ot,Math.min($n,e))/ot)/Math.log($n/ot)*t}function Da(e,t,n){let s=Math.max(za,Math.min(tn,e));return t+(tn-s)/(tn-za)*(n-t)}function dr(e,t,n,s,o,i){let r=s.mode??"lp",l=Y(o,Cs(r)),c=Y(o,"divider"),d=Y(o,"text-sub"),p=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,b=Math.max(h+4,n-p-3),f=s.q??Math.SQRT1_2,w=Math.round(Da(0,h,b))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let v=0;v<=t;v++){let u=ot*($n/ot)**(v/Math.max(1,t)),m=s.open?1:lr(r,s.hz,f,u,s.sampleRate),y=Da(20*Math.log10(Math.max(1e-5,m)),h,b);v===0?e.moveTo(v,y):e.lineTo(v,y)}if(e.strokeStyle=l,e.stroke(),!s.open){let v=Math.round(cr(s.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(v,h),e.lineTo(v,b),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",o.dataset.ncAccent=l,o.dataset.ncFilterHz=String(Math.round(s.hz))}function ie(e,t){let n=e.ownerDocument,s=n.createElement("span");s.style.position="absolute",s.style.color=`var(--nc-ui-${t})`,e.append(s);let o=n.defaultView.getComputedStyle(s).color;return s.remove(),o}function pr(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let s=t.defaultView.getComputedStyle(n).font;return n.remove(),s}var Pe=20,ft=2e4,ta=Math.log(ft/Pe),kn=32,ur=250,hr=-100,mr=1200,fr=4.5,qa=-6,Ce=-96,gr=48,Pa=[100,1e3,1e4],br=[6,12];function He(e,t){return Math.log(Math.max(Pe,Math.min(ft,e))/Pe)/ta*t}function St(e,t){return Pe*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*ta)}function xe(e,t,n,s){let o=t/2-s;return t/2-Math.max(-n,Math.min(n,e))/n*o}function En(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var Bs=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function yr(e,t,n,s){let o=n?3:1,i=c=>({db:Math.max(-s,Math.min(s,e.db+c*o))}),r=c=>({hz:Math.max(e.minHz??Pe,Math.min(e.maxHz??ft,e.hz*2**(c*o/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*o)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?r(1):i(1);case"ArrowLeft":return e.moveHz?r(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function na(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function wr(e,t,n,s,o,i,r,l,c){let d=c?.25:1,p={},h=Math.max(1,i/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-s*d/h*r/na(e))),e.moveHz){let b=t.hz*Math.exp(n*d/Math.max(1,o)*ta);p.hz=Math.max(e.minHz??Pe,Math.min(e.maxHz??ft,b))}return p}function vr(e,t,n,s,o){let i=Math.max(0,n.left)+1,r=Math.min(n.right,o)-1,l=Math.min(t.width*3+s*2,r-i),c=Math.max(i,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var W=new WeakMap;function xr(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let s=document.createElement("div");s.className="nc-eq-plot";let o=document.createElement("canvas");o.className="nc-eq-spectrum",o.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,s.append(o,i);for(let c of e.bands)s.append($r(n,c,t));s.append(r),s.addEventListener("click",c=>{if(!Vs(n)||c.button>0)return;let d=_s(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(s);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),W.set(n,{control:e,cache:null,spec:null,active:null}),Rs(n,e),n}function js(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function $r(e,t,n){let s=document.createElement("div");s.className="nc-eq-node",s.tabIndex=0,s.dataset.band=t.id,s.setAttribute("role","slider"),s.setAttribute("aria-orientation","vertical");let o=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>o()?.bands.find(d=>d.id===t.id)??null,r=null;s.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=i();p&&(d.preventDefault(),s.focus({preventScroll:!0}),s.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},s.dataset.drag="true",ge(e,t.id))}),s.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=o(),h=i(),b=W.get(e);if(!p||!h||!b?.box)return;let{w:f,h:w,pad:v}=b.box;p.onBand(h.id,wr(h,r.start,d.clientX-r.x,d.clientY-r.y,f,w,p.range??18,v,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete s.dataset.drag,e.ownerDocument.activeElement!==s&&!s.matches(":hover")&&ge(e,null))};s.addEventListener("pointerup",l),s.addEventListener("pointercancel",l),s.addEventListener("dblclick",d=>{d.preventDefault(),o()?.onReset?.(t.id)}),s.addEventListener("keydown",d=>{let p=o(),h=i();if(!p||!h)return;let b=yr(h,d.key,d.shiftKey,p.range??18);b&&(d.preventDefault(),b==="reset"?p.onReset?.(h.id):p.onBand(h.id,b),ge(e,h.id))});let c=null;return s.addEventListener("wheel",d=>{let p=o(),h=i();if(!p||!h?.moveQ)return;d.preventDefault();let b=d.timeStamp;(!c||b-c.t>400)&&(c={q:h.q,t:b});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-f/240))),c.t=b,p.onBand(h.id,{q:c.q}),ge(e,h.id)},{passive:!1}),s.addEventListener("pointerenter",()=>ge(e,t.id)),s.addEventListener("focus",()=>ge(e,t.id)),s.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==s&&ge(e,null)}),s.addEventListener("blur",()=>{r||ge(e,null)}),s}function ge(e,t){let n=W.get(e);if(!n)return;let s=n.active!==t;n.active=t,s?Ve(e):aa(e)}function aa(e){let t=W.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let s=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(s&&w.dataset.band===s.id?w.dataset.active="true":delete w.dataset.active);if(!s||!t.box){n.hidden=!0;return}let o=[s.label,Bs(s.db)];s.kind==="peak"?o.push(En(s.hz),`Q ${s.q.toFixed(1)}`):o.push(`${s.kind==="lowshelf"?"below":"above"} ${En(s.hz)}`),n.textContent=o.join(" · "),n.dataset.tone=String(kr(t.control,s)),n.hidden=!1;let{w:i,h:r,pad:l}=t.box,c=He(s.hz,i),d=xe(s.db*na(s),r,t.control.range??18,l),p=n.offsetWidth,h=n.offsetHeight,b=Math.max(0,Math.min(i-p,c-p/2)),f=d-h-l*1.5>=0?d-h-l*1.5:Math.min(r-h,d+l*1.5);n.style.left=`${Math.round(b)}px`,n.style.top=`${Math.round(f)}px`}function kr(e,t){return e.bands.indexOf(t)%3+1}function Rs(e,t){let n=W.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",sa(e);let s=t.range??18;t.bands.forEach((o,i)=>{let r=js(e,o.id);r instanceof HTMLElement&&(r.dataset.tone=String(i%3+1),r.dataset.kind=o.kind,r.setAttribute("aria-label",`${o.label} band`),r.setAttribute("aria-valuemin",String(-s)),r.setAttribute("aria-valuemax",String(s)),r.setAttribute("aria-valuenow",String(o.db)),r.setAttribute("aria-valuetext",o.valueText??`${Bs(o.db)}, ${En(o.hz)}`),r.setAttribute("aria-keyshortcuts",o.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),o.help?r.setAttribute("data-nc-help",o.help):r.removeAttribute("data-nc-help"))}),Ve(e),Lr(e)}function Os(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),s=e.ownerDocument.defaultView?.devicePixelRatio||1,o=Math.max(1,Math.round(t*s)),i=Math.max(1,Math.round(n*s));(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);let r=e.getContext("2d");return r?.setTransform(s,0,0,s,0,0),{ctx:r,w:t,h:n}}function Hs(e){return{curve:ie(e,"eq-curve"),fill:ie(e,"eq-fill"),quiet:ie(e,"text-sub"),grid:ie(e,"eq-grid"),zero:ie(e,"divider"),label:ie(e,"text-sub"),spectrum:ie(e,"eq-spectrum"),bands:[ie(e,"eq-band-1"),ie(e,"eq-band-2"),ie(e,"eq-band-3")]}}function Er(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Ve(e){W.has(e)&&sa(e);let t=W.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let s=t.control,{ctx:o,w:i,h:r}=Os(n);if(!o)return;let l=Math.max(8,Math.round(r*.06)),c=s.range??18;t.box={w:i,h:r,pad:l},t.colours=Hs(e);let d=t.colours,p=Er(s,i);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(i)+1),L=new Float64Array(k);for(let x=0;x<k;x++)L[x]=St(x/(k-1)*i,i);let A=null;try{A=typeof s.response=="function"?s.response(L):null}catch{A=null}t.cache={key:p,freqs:L,total:A?.total??new Float64Array(k),bands:A?.bands??[]}}o.clearRect(0,0,i,r);let h=pr(e),b=s.on!==!1;Ar(o,i,r,c,l,d,h);let{freqs:f,total:w,bands:v}=t.cache,u=Array.from(f,k=>He(k,i)),m=xe(0,r,c,l);v.forEach((k,L)=>{if(!k||!k.some(S=>Math.abs(S)>.05))return;let A=b?d.bands[L%3]:d.quiet,x=Array.from(k,S=>xe(S,r,c,l));o.save(),t.active&&s.bands[L]?.id===t.active&&(o.globalAlpha=.14,o.fillStyle=A,Ia(o,u,x,m)),o.globalAlpha=b?.75:.4,o.strokeStyle=A,o.lineWidth=.75,nn(o,u,x),o.restore()});let y=Array.from(w,k=>xe(k,r,c,l)),g=b?d.curve:d.quiet;o.save(),o.fillStyle=b?d.fill:d.quiet,o.globalAlpha=b?.2:.08,Ia(o,u,y,m),o.restore(),o.save(),o.strokeStyle=b?d.fill:g,o.lineJoin="round",o.lineCap="round",b&&(o.globalAlpha=.16,o.lineWidth=4,nn(o,u,y)),o.globalAlpha=1,o.strokeStyle=g,o.lineWidth=1.25,nn(o,u,y),o.restore(),Sr(e),aa(e)}function Ar(e,t,n,s,o,i,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<Pe||p>ft)continue;let h=Math.round(He(p,t))+.5;e.globalAlpha=Pa.includes(p)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of br)if(!(c>s))for(let d of[1,-1]){let p=Math.round(xe(c*d,n,s,o))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(xe(0,n,s,o))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Pa){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,h=He(c,t)+3;e.fillText(d,h+p+2>t?He(c,t)-p-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>s)continue;let d=xe(c,n,s,o);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Pt(e,t,n){e.moveTo(t[0],n[0]);for(let s=1;s<t.length-1;s++){let o=(t[s]+t[s+1])/2,i=(n[s]+n[s+1])/2;e.quadraticCurveTo(t[s],n[s],o,i)}e.lineTo(t[t.length-1],n[n.length-1])}function nn(e,t,n){e.beginPath(),Pt(e,t,n),e.stroke()}function Ia(e,t,n,s){e.beginPath(),Pt(e,t,n),e.lineTo(t[t.length-1],s),e.lineTo(t[0],s),e.closePath(),e.fill()}function _s(e){return e.closest("[data-nc-maxable]")}function Vs(e){let t=_s(e);return!!t&&!t.hasAttribute("data-nc-max")}function sa(e){let t=Vs(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=W.get(e);n?.active&&(n.active=null,aa(e))}return t}function Sr(e){sa(e);let t=W.get(e);if(!t?.box)return;let{w:n,h:s,pad:o}=t.box,i=t.control.range??18;for(let r of t.control.bands){let l=js(e,r.id);l instanceof HTMLElement&&(l.style.left=`${He(r.hz,n).toFixed(1)}px`,l.style.top=`${xe(r.db*na(r),s,i,o).toFixed(1)}px`)}}function Mr(e,t,n,s){let o=s/2/n,i=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,h=St(d,t),b=St(p,t),f=St(c/(e-1)*t,t);i[c]=Math.min(n-1,h/o),r[c]=Math.min(n-1,b/o),l[c]=fr*Math.log2(f/1e3)}return{lo:i,hi:r,tilt:l}}function Tr(e,t,n){let s=Math.floor(t),o=Math.ceil(n);if(o-s<=1){let r=t-s,l=e[s]??-1/0,c=e[Math.min(e.length-1,s+1)]??l;return l+(c-l)*r}let i=-1/0;for(let r=s;r<=o&&r<e.length;r++)e[r]>i&&(i=e[r]);return i}function Lr(e){let t=W.get(e);if(t){if(!t.control.spectrum){Us(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(s=>{let o=W.get(e)?.spec;o&&(o.visible=s.some(i=>i.isIntersecting),An(e))}),t.spec.io.observe(e)):t.spec.visible=!0}An(e)}}function An(e){let t=W.get(e),n=t?.spec;if(!n)return;let s=e.ownerDocument;if(!(e.isConnected&&n.visible&&s.visibilityState!=="hidden"&&t.control.spectrum)){Ys(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Sn(e),n.onVis||(n.onVis=()=>An(e),s.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Mn(e,!1)}function Sn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Mn(e,t){let n=W.get(e)?.spec,s=e.ownerDocument.defaultView;!n||!s||(t?n.timer=s.setTimeout(()=>(n.timer=0,an(e,Sn(e))),ur):typeof s.requestAnimationFrame=="function"?n.raf=s.requestAnimationFrame(o=>(n.raf=0,an(e,o))):n.timer=s.setTimeout(()=>(n.timer=0,an(e,Sn(e))),kn))}function Ys(e){let t=W.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let s=e.querySelector(".nc-eq-spectrum");s instanceof HTMLCanvasElement&&s.getContext("2d")?.clearRect(0,0,s.width,s.height)}function Us(e){let t=W.get(e)?.spec;if(!t)return;Ys(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=W.get(e);n&&(n.spec=null)}function an(e,t){let n=W.get(e),s=n?.spec;if(!n||!s)return;if(!e.isConnected){Us(e);return}if(!s.analyser)return;if(t-s.last<kn-4&&!s.idle){Mn(e,!1);return}let o=s.last?Math.min(.25,(t-s.last)/1e3):kn/1e3;s.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=Os(i);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=s.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!s.map||s.map.cols!==d||s.map.w!==l||s.map.sr!==p)&&(s.map={cols:d,w:l,sr:p,...Mr(d,l,s.buf.length,p)},s.disp=new Float32Array(d).fill(-1/0)),s.analyser.getFloatFrequencyData(s.buf);let h=-1/0,b=gr*o,{lo:f,hi:w,tilt:v}=s.map;for(let m=0;m<d;m++){let y=Tr(s.buf,f[m],w[m]);y>h&&(h=y);let g=y+v[m],k=s.disp[m]-b;s.disp[m]=g>k?g:k}h>hr&&(s.loud=t);let u=t-s.loud>mr;r.clearRect(0,0,l,c),(!u||s.disp.some(m=>m>Ce))&&Cr(r,l,c,s.disp,n.colours??Hs(e)),s.idle=u&&!s.disp.some(m=>m>Ce),Mn(e,s.idle)}function Cr(e,t,n,s,o){let i=s.length,r=new Array(i),l=new Array(i),c=d=>{let p=s[Math.max(0,Math.min(i-1,d))];return Number.isFinite(p)?p:Ce};for(let d=0;d<i;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(Ce,Math.min(qa,Number.isFinite(p)?p:Ce))-Ce)/(qa-Ce);r[d]=d/(i-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=o.spectrum,e.globalAlpha=.13,e.beginPath(),Pt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=o.spectrum,e.lineWidth=1,e.beginPath(),Pt(e,r,l),e.stroke(),e.restore()}var ne=new WeakMap,Fr=450,Nr=6,zr=33,sn=24,Dr="http://www.w3.org/2000/svg";function qr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function Pr(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function Ir(e,t,n,s,o){let i=e.slice();if(t===s)return i[s]=o,i;let r=t<s?1:-1;for(let l=t;l!==s+r;l+=r){let c=(l-t)/(s-t);i[l]=Math.round((n+(o-n)*c)*100)/100}return i}function Br(e,t){let n=e.steps[t],s=(e.shapes??[]).find(i=>i.value===n.shape),o=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${s?`, ${s.label}`:""}${o}`}function Fe(e,t){let n=document.createElementNS(Dr,e);for(let[s,o]of Object.entries(t))n.setAttribute(s,String(o));return n}function Ks(e){let t=Fe("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Fe("path",{d:e})),t}function jr(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let s=document.createElement("div");s.className="nc-lsteps-plot",s.tabIndex=0,s.setAttribute("role","slider"),s.setAttribute("aria-orientation","vertical"),s.setAttribute("aria-valuemin","0"),s.setAttribute("aria-valuemax","100"),s.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let o=document.createElement("div");o.className="nc-lsteps-axis",o.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(s,o,i,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ne.set(n,c),Or(n,s),Hr(n,r),Ws(n,e),n}function ae(e){let t=ne.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Rr(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function on(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),s=Rr(e);return{i:Pr(t.clientX,s),level:qr(t.clientY-n.top,n.height)}}function Or(e,t){let n=ne.get(e),s=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let r=ae(e);if(!r||i.button>0||!r.steps.length)return;i.preventDefault(),It(e),t.setPointerCapture?.(i.pointerId);let l=on(t,i),c=r.steps.map(d=>d.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Ba(e,l.i,l.level,l.i,l.level,!1),s(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,ae(e)?.onLevels(d.start.slice(),!0),rn(e,d.i))},Fr)}),t.addEventListener("pointermove",i=>{let r=n.drag;if(!r||r.id!==i.pointerId||r.long||!r.moved&&Math.hypot(i.clientX-r.x,i.clientY-r.y)<Nr)return;r.moved=!0,s();let l=on(t,i);Ba(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let o=i=>{let r=n.drag;!r||r.id!==i.pointerId||(s(),n.drag=null,t.releasePointerCapture?.(i.pointerId),r.long||ae(e)?.onLevels(r.levels.slice(),!0),Tn(e,-1))};t.addEventListener("pointerup",o),t.addEventListener("pointercancel",i=>{let r=n.drag;!r||r.id!==i.pointerId||(s(),n.drag=null,r.long||ae(e)?.onLevels(r.start.slice(),!0),Tn(e,-1))}),t.addEventListener("contextmenu",i=>{ae(e)?.onShape&&(i.preventDefault(),rn(e,on(t,i).i))}),t.addEventListener("keydown",i=>{let r=ae(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=h=>{let b=r.steps.map(f=>f.level);b[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,r.onLevels(b,!0)};switch(i.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(i.shiftKey?.01:.05));break;case"ArrowDown":p(d-(i.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;rn(e,c);break;default:return}i.preventDefault(),Ln(e)}),t.addEventListener("focus",()=>Ln(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function Ba(e,t,n,s,o,i){let r=ne.get(e).drag;r&&(r.levels=Ir(r.levels,t,n,s,o),Tn(e,s,r.levels[s]),ae(e)?.onLevels(r.levels.slice(),i))}function Tn(e,t,n){for(let s of e.querySelectorAll(".nc-lsteps-step"))Number(s.dataset.i)===t?(s.dataset.dragging="true",s.dataset.level=`${Math.round(n*100)}%`):s.removeAttribute("data-dragging")}function Ln(e){let t=ne.get(e),n=e.querySelector(".nc-lsteps-plot"),s=ae(e);if(!n||!s)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let o=Math.min(t.focus,s.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((s.steps[o]?.level??0)*100))),n.setAttribute("aria-valuetext",Br(s,o))}function Hr(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),It(e,!0);return}let s=[...t.querySelectorAll("button")],o=s.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),s[(o+1)%s.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),s[(o-1+s.length)%s.length]?.focus())}),ne.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&It(e)}}function rn(e,t){let n=ae(e),s=e.querySelector(".nc-lsteps-pick"),o=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!s||!o)return;let i=ne.get(e);i.focus=t,s.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,s.append(r);for(let f of n.shapes??[]){let w=document.createElement("button");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&w.append(Ks(f.icon)),w.append(document.createTextNode(f.label)),w.addEventListener("click",()=>{ae(e)?.onShape?.(t,f.value),It(e,!0)}),s.append(w)}s.setAttribute("aria-label",`Shape of step ${t+1}`),s.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=o.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=s.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,b=Math.max(0,Math.min(c.width-p,h-p/2));s.style.setProperty("--nc-lsteps-pick-x",`${Math.round(b)}px`),s.querySelector('[aria-checked="true"]')?.focus?.()??s.querySelector("button")?.focus?.()}function It(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ne.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function _r(e,t){let n=ne.get(e),s=e.querySelector(".nc-lsteps-plot"),o=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,s.textContent="",o.textContent="";for(let i=0;i<t;i++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(i),i%4===0&&i>0&&(r.dataset.beat="true");let l=Fe("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Fe("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Fe("path",{class:"nc-lsteps-env",d:""}),Fe("path",{class:"nc-lsteps-top",d:""}),Fe("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),s.append(r);let c=document.createElement("span");i%4===0&&(c.textContent=String(i+1)),i%4===0&&i>0&&(c.dataset.beat="true"),o.append(c)}}}function Ws(e,t){let n=ne.get(e);if(!n)return;n.control=t;let s=t.steps.length;_r(e,s),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let o=e.querySelector(".nc-lsteps-plot");o.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),r=o.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,w)=>{let v=r[w];if(!v)return;let u=String((w%2?1-i:i)*2);v.style.setProperty("--nc-lsteps-grow",u),l[w]?.style.setProperty("--nc-lsteps-grow",u),t.played!==void 0&&w>=t.played?v.dataset.out="true":v.removeAttribute("data-out"),v.dataset.zero=f.level<=0?"true":"false";let m=Math.max(0,Math.min(1,f.level)),y=v.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-m*100)),y.setAttribute("height",String(m*100));let g=t.curve?t.curve(w,sn):null,k="M0 100",L="";for(let A=0;A<=sn;A++){let x=g?Math.max(0,Math.min(1,g[A]??m)):m,S=A/sn*100,$=100-x*100;k+=` L${S.toFixed(2)} ${$.toFixed(2)}`,L+=`${A?" L":"M"}${S.toFixed(2)} ${$.toFixed(2)}`}v.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),v.querySelector(".nc-lsteps-top").setAttribute("d",L)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let w=document.createElement("button");w.type="button",w.className="nc-lsteps-shape",w.setAttribute("role","tab"),w.dataset.shape=String(f.value),f.icon&&w.append(Ks(f.icon)),w.append(document.createTextNode(f.label)),w.addEventListener("click",()=>ae(e)?.onShapeAll?.(f.value)),c.append(w)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??s,h=t.steps[0]?.shape,b=t.steps.slice(0,p).every(f=>f.shape===h);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let w=b&&f.dataset.shape===String(h);f.setAttribute("aria-selected",w?"true":"false"),f.tabIndex=w||!b&&f===c.firstElementChild?0:-1}n.focus>=s&&(n.focus=0),Ln(e),n.last=-2,Vr(e)}function Vr(e){let t=ne.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&ln(e,null);return}let s=0,o=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){ln(e,null);return}i-s>=zr&&(s=i,ln(e,t.control.playhead())),t.loop=n.requestAnimationFrame(o)};t.loop=n.requestAnimationFrame(o)}function ln(e,t){let n=ne.get(e),s=t&&Number.isInteger(t.step)?t.step:-1,o=!!t?.locked;if(!(n.last===s&&n.lastLocked===o)){n.last=s,n.lastLocked=o;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===s?(i.dataset.playhead="true",i.dataset.locked=o?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!o?"true":"false"}}var Yr=.8912509381337456,Cn=32,Ur=250,Kr=1200,Wr=.2,Gs=1.5;function Gr(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Jr(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let s=e.createElement("span");s.className="nc-fx-level-bar",s.dataset.ncLevel=n;let o=e.createElement("span");o.className="nc-fx-level-fill",s.append(o),t.append(s)}return t}var Bt=new WeakMap,ja=new WeakMap;function Ra(e,t,n){let s=e.ownerDocument?.defaultView;if(typeof s?.getComputedStyle!="function")return n;let o=String(s.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(o);return Number.isFinite(i)?o.endsWith("ms")?i/1e3:i:n}function Xr(e){let t=ja.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let s=n?.IntersectionObserver;return s&&(t.io=new s(o=>{for(let i of o){let r=Bt.get(i.target);r&&(r.seen.set(i.target,i.isIntersecting),it(r))}Oe(t)})),e.addEventListener("visibilitychange",()=>{for(let o of t.recs)it(o);Oe(t)}),ja.set(e,t),t}var Js=e=>e.els.some(t=>t.isConnected);function Qr(e){if(!e.loop.io)return Js(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function it(e){let t=!e.dead&&!!e.source&&Qr(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=oa(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),zn(e))}function oa(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Oe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Xs(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=oa(e)),!e.raf&&!e.timer&&Fn(e,!1)}function Fn(e,t){let n=e.doc.defaultView;if(!n)return;let s=()=>Oa(e,oa(e));t?e.timer=n.setTimeout(()=>(e.timer=0,s()),Ur):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(o=>(e.raf=0,Oa(e,o))):e.timer=n.setTimeout(()=>(e.timer=0,s()),Cn)}function Xs(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Oa(e,t){if(t-e.last<Cn-4&&!e.idle&&e.last){Fn(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Cn/1e3;e.last=t,e.frames++;let s=!1,o=!1;for(let i of e.recs){if(!Js(i)){(i.placed||e.frames-i.born>90)&&Qs(i);continue}i.placed=!0,i.open&&(o=!0,Zr(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(s=!0))}if(!o){Xs(e);return}e.idle=t-e.loud>Kr&&!s,Fn(e,e.idle)}function Zr(e,t,n){if(e.fall<0){let b=e.els[0];e.fall=Ra(b,"motion-meter-fall",Wr),e.hold=Ra(b,"motion-meter-hold",Gs)}let s=null;try{s=e.source.read()}catch{s=null}let o=typeof s=="number",i=o?s:Number(s?.in)||0,r=!o&&s!==null&&typeof s=="object"&&typeof s.out=="number",l=r&&Number(s.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let b of e.els)b.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[i,l],h=!1;for(let b=0;b<2;b++){let f=Gr(p[b]);f>0&&(h=!0),e.disp[b]=f>=e.disp[b]?f:f+(e.disp[b]-f)*d,e.disp[b]<.001&&(e.disp[b]=0),p[b]>=Yr&&(e.clipAt[b]=n);let w=e.clipAt[b]>0&&n-e.clipAt[b]<e.hold*1e3;Nn(e,b,e.disp[b],w)}return h}function Nn(e,t,n,s){let o=Math.round(n*1e3)/1e3,i=s?"true":"false";if(!(e.shown[t]===o&&e.clipShown[t]===i)){e.shown[t]=o,e.clipShown[t]=i;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${o})`,l.dataset.clip=i)}}}function zn(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Nn(e,0,0,!1),Nn(e,1,0,!1)}function Qs(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Bt.get(t)===e&&Bt.delete(t)}function el(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),s=n[0]?.ownerDocument??globalThis.document,o=Xr(s),i={els:n,source:t??null,loop:o,open:!1,dead:!1,seen:new Map,born:o.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Gs,rows:""};for(let r of n)Bt.set(r,i),o.io?.observe(r);if(o.recs.add(i),zn(i),!o.io){let r=s.defaultView,l=()=>{it(i),Oe(o)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!i.dead){if(l===i.source){it(i),Oe(o);return}i.open&&(i.open=!1,i.source?.close?.(),zn(i)),i.source=l,it(i),Oe(o)}},destroy(){i.dead||Qs(i),Oe(o)}}}var Zs={slop:8,longPressMs:500,pitchPx:16},tl=class{constructor(e,t,n=Zs){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,s){if(this.phase!=="idle")return!1;let o=this.hit(t,n);return o<0?!1:(this.phase="pending",this.pointer=e,this.pad=o,this.x0=t,this.y0=n,this.t0=s,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,s){if(e!==this.pointer)return;let o=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(s),this.phase!=="pending"||Math.hypot(o,i)<this.config.slop)return;Math.abs(i)>=Math.abs(o)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-i/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,s){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,s),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function nl(e,t,n,s=Zs){let o=!1,i=0,r=(d,p)=>{let h=e.ownerDocument.elementFromPoint?.(d,p),b=[...e.querySelectorAll(t)],f=h?b.findIndex(u=>u===h||u.contains(h)):-1;if(f>=0)return f;let w=-1,v=Number.POSITIVE_INFINITY;return b.forEach((u,m)=>{if(u.hidden)return;let y=u.getBoundingClientRect();if(p<y.top||p>y.bottom)return;let g=Math.abs(d-(y.left+y.width/2));g<v&&g<=y.width&&(w=m,v=g)}),w},l=new tl(r,d=>{(d.kind==="paint"||d.kind==="long")&&(o=!0),n(d)},s),c=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(o=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),i=setTimeout(()=>l.tick(performance.now()),s.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{o&&(o=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var eo="netcomposer.groups.v1";function ia(){try{return globalThis.localStorage??null}catch{return null}}function to(e=ia(),t=eo){try{let n=JSON.parse(e?.getItem(t)??"{}"),s=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[o,i]of Object.entries(n))typeof i=="boolean"&&s.set(o,i);return s}catch{return new Map}}function al(e,t,n,s=eo){let o=to(e,s);o.set(t,n);try{e?.setItem(s,JSON.stringify(Object.fromEntries(o)))}catch{}}function sl(e,t=ia()){return to(t).get(e.id)??e.open===!0}function ol(e,t,n){let s=document.createElement("div");s.className="nc-group",s.dataset.ncId=e.id;let o=document.createElement("button");o.type="button",o.className="nc-group-toggle",o.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),o.append(i,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",o.id),o.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return o.addEventListener("click",()=>{let d=s.dataset.ncOpen!=="true";al(ia(),e.id,d),Dn(s,d);let p=t(s);p?.type==="group"&&p.onToggle?.(d)}),s.append(o,c),no(s,e),Dn(s,sl(e)),ao(s,e),s}function Dn(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),s=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let o=n?.querySelector(".nc-group-mark");o&&(o.textContent=t?"−":"+"),s instanceof HTMLElement&&(s.hidden=!t&&e.dataset.ncCollapse!=="phone")}function no(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function ao(e,t){no(e,t)&&Dn(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let s=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),o=t.summary??"";s&&s.textContent!==o&&(s.textContent=o)}var bt="application/x-nc-pad",Ha="http://www.w3.org/2000/svg";function il(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),s=[],o=[];for(let i=0;i<n;i++){let r=Math.floor(i*t/n),l=Math.max(r+1,Math.floor((i+1)*t/n)),c=0,d=0;for(let h=r;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let p=n===1?50:i/(n-1)*100;s.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),o.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${s.join("L")}L${o.reverse().join("L")}Z`}function rl(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let s=document.createElement("div");return s.className="nc-padgrid-pads",s.dataset.ncColumns=String(e.columns??2),e.pads.forEach((o,i)=>s.append(ll(n,i,t))),n.append(s),n.addEventListener("keydown",o=>{o.key==="Escape"&&Mt(n)}),oo(n,e),n}function ll(e,t,n){let s=document.createElement("button");s.type="button",s.className="nc-padgrid-pad",s.dataset.ncPad=String(t);let o=document.createElement("span");o.className="nc-padgrid-pad-bar",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(Ha,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Ha,"path");return c.append(d),s.append(o,i,r,l,c),dl(e,s,t,n),i.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&s.dataset.empty!=="true"&&so(e,s,t,n)}),s.addEventListener("dragstart",p=>{if(s.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(bt,String(t)),p.dataTransfer.effectAllowed="copyMove",s.dataset.dragging="true"}),s.addEventListener("dragend",()=>delete s.dataset.dragging),s.addEventListener("dragover",p=>{let h=p.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(bt)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=h.includes(bt)&&!p.altKey?"move":"copy"),s.dataset.drop="true")}),s.addEventListener("dragleave",()=>delete s.dataset.drop),s.addEventListener("drop",p=>{delete s.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let b=p.dataTransfer?.getData(bt);if(b!==void 0&&b!==""){p.preventDefault(),p.stopPropagation();let w=Number(b);w!==t&&h.onMove?.(w,t,p.altKey);return}let f=p.dataTransfer?.files?.[0];f&&(p.preventDefault(),p.stopPropagation(),h.onFile?.(t,f))}),s}function cl(e,t,n){let s=n(e);s?.type==="padGrid"&&s.onPress(t)}function dl(e,t,n,s){let o=0,i=!1,r=0,l=0,c=()=>{window.clearTimeout(o),o=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,r=d.clientX,l=d.clientY,c();let p=s(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(o=window.setTimeout(()=>{o=0,i=_a(e,t,n,s)},450)))}),t.addEventListener("pointermove",d=>{o&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),i=_a(e,t,n,s)}),t.addEventListener("click",()=>{if(i){i=!1;return}cl(e,n,s)})}function _a(e,t,n,s){let o=s(e);if(o?.type!=="padGrid"||!o.menu)return!1;let i=o.menu(n);if(!i.length)return!1;Mt(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),Mt(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of i){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=p.id,h.textContent=p.label,h.addEventListener("click",()=>{Mt(e);let b=s(e);b?.type==="padGrid"&&(p.id==="rename"&&b.onRename?so(e,t,n,s):b.onMenu?.(n,p.id))}),l.append(h)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function so(e,t,n,s){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let o=s(e);if(o?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=o.nameMax??24,i.value=o.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.top-r.top}px`,i.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let h=i.value.trim();i.remove(),t.focus();let b=s(e);p&&h&&b?.type==="padGrid"&&b.onRename?.(n,h)};i.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])i.addEventListener(p,h=>h.stopPropagation());e.append(i),i.focus(),i.select()}function Mt(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function oo(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((s,o)=>{let i=n[o];if(!(i instanceof HTMLButtonElement))return;let r=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=s.empty?"":s.badge??""),i.draggable=!s.empty,s.empty?(i.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,r&&(r.textContent=s.label),l&&(l.textContent=s.hint??""),c?.setAttribute("d",il(s.peaks))),!s.empty&&s.hint?i.dataset.hint="true":delete i.dataset.hint,s.lane?i.dataset.ncLane=String(s.lane):delete i.dataset.ncLane;let p=t.selected===o;p?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",p?"true":"false"),s.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",s.empty?`Pad ${o+1}, empty: load a sample`:`Pad ${o+1}, ${s.label}${s.hint?`, ${s.hint}`:""}${s.badgeLabel?`, ${s.badgeLabel}`:""}${p?", selected":""}`)})}function Z(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Ut(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let s=document.createElement("label");s.className="nc-label",s.htmlFor=e,s.textContent=t;let o=document.createElement("span");return o.className="nc-readout",o.dataset.ncReadout="",n.append(s,o),n}function Va(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function dt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var pl=450,Ya=8;function ce(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function ul(e){let t=Hi(e,"target-min");return t>0?t:44}function hl(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=ul(e),s=n/2,o=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let r=t[i],l=o[i];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-s,h=c+s,b=d-s,f=d+s;for(let w=0;w<t.length;w++){if(i===w)continue;let v=o[w];if(!v||v.width===0)continue;let u=v.left+v.width/2,m=v.top+v.height/2;Math.abs(m-d)<s*2&&(u>c?h=Math.min(h,(c+u)/2):u<c&&(p=Math.max(p,(c+u)/2))),Math.abs(u-c)<s*2&&(m>d?f=Math.min(f,(d+m)/2):m<d&&(b=Math.max(b,(d+m)/2)))}p=Math.min(p,l.left),h=Math.max(h,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${b-l.top}px`,r.style.width=`${Math.max(0,h-p)}px`,r.style.height=`${Math.max(0,f-b)}px`,r.style.transform="none"}}function io(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Ua(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function De(e,t){switch(e.type){case"slider":return ml(e,t);case"select":return gl(e,t);case"toggle":return bl(e,t);case"button":return yl(e,t);case"readout":return wl(e);case"label":return kl(e);case"note":return Ka(e);case"knob":return Sl(e,t);case"choice":return Ml(e,t);case"slotRow":return Tl(e,t);case"stepGrid":return Nl(e,t);case"canvas":return Pl(e);case"fx":return Yl(e,t);case"eqGraph":return xr(e,t);case"levelSteps":return jr(e,t);case"group":return ol(e,t,De);case"strip":return Il(e,t);case"stripAdd":return Ol(e,t);case"padGrid":return rl(e,t);case"moves":return xl(e,t);default:return Ka({id:"unknown",text:""})}}function oe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),s=e.querySelector("label");s&&(s.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,co(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(ro(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??dt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),Va(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")Va(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&$e(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&El(n,t);let s=e.querySelector("[data-nc-readout]");s&&(s.textContent=t.valueText??dt(t.value))}else if(t.type==="choice")po(e,t);else if(t.type==="slotRow")ho(e,t);else if(t.type==="stepGrid")Pn(e,t);else if(t.type==="padGrid")oo(e,t);else if(t.type==="moves")lo(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Is(n,t)}else if(t.type==="eqGraph")Rs(e,t);else if(t.type==="levelSteps")Ws(e,t);else if(t.type==="strip"){bo(e,t);for(let n of t.sends??[]){let s=e.querySelector(`[data-nc-id="${_e(n.id)}"]`);s instanceof Element&&oe(s,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")fo(e,t);else if(t.type==="group"){ao(e,t);for(let n of t.controls){let s=e.querySelector(`[data-nc-id="${_e(n.id)}"]`);s instanceof Element&&oe(s,n)}}else if(t.type==="fx"){So(e,t);for(let n of[...t.controls,...t.more??[]]){let s=e.querySelector(`[data-nc-id="${_e(n.id)}"]`);s instanceof Element&&oe(s,n)}}}}function ml(e,t){let n=Ut(e.id,e.label);n.dataset.ncSlider="";let s=document.createElement("input");s.type="range",s.className="nc-range",s.id=e.id;let o=mt(e.taper,e.min,e.max);s.min=String(o?0:e.min),s.max=String(o?1e3:e.max),s.step=String(o?1:e.step),o&&(s.dataset.ncTaper=e.taper),s.value=String(ro(e)),s.disabled=e.disabled===!0,s.dataset.ncId=e.id;let i=l=>o?qt(l.taper??e.taper,l.min,l.max,s.value,l.step):Number(s.value);s.addEventListener("input",()=>{let l=t(s);l?.type==="slider"&&l.onChange(i(l))}),s.addEventListener("change",()=>{let l=t(s);l?.type==="slider"&&l.onCommit?.(i(l))}),o&&s.addEventListener("keydown",l=>{let c=t(s);if(c?.type!=="slider"||s.disabled)return;let d=c.taper??e.taper,p=ea(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),s.value=String(ct(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(s,r),e.onTap&&n.insertBefore(fl(e,s,t),r),n.append(Z()),oe(n,e),n}function ro(e){return mt(e.taper,e.min,e.max)?ct(e.taper,e.min,e.max,e.value):e.value}function fl(e,t,n){let s=document.createElement("button");s.type="button",s.className="nc-tap",s.dataset.ncTap=e.id,s.textContent="Tap",s.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),s.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,s.append(ce());let o=i=>{let r=n(t);r?.type==="slider"&&r.onTap?.(i)};return s.addEventListener("pointerdown",i=>{i.button===0&&o(i.timeStamp)}),s.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),o(i.timeStamp))}),s}function gl(e,t){let n=Ut(e.id,e.label),s=document.createElement("select");s.className="nc-select",s.id=e.id,s.dataset.ncId=e.id;let o=null;for(let i of e.options){let r=document.createElement("option");r.value=i.value,r.textContent=i.label,i.disabled&&(r.disabled=!0),i.group?o?.getAttribute("label")!==i.group&&(o=document.createElement("optgroup"),o.setAttribute("label",i.group),s.append(o)):o=null,(o??s).append(r)}return s.value=e.value,s.addEventListener("change",()=>{let i=t(s);i?.type==="select"&&i.onChange(s.value)}),n.append(s,Z()),n}function bl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let s=t(n);s?.type==="toggle"&&s.onPress()}),n.append(Z()),oe(n,e),n}function yl(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(Z()),oe(n,e),!e.onSparkle)return n;let s=document.createElement("div");s.className="nc-play-row";let o=document.createElement("button");return o.type="button",o.className="nc-sparkle-btn",o.dataset.ncSparkle=e.id,o.setAttribute("aria-label","Surprise me"),o.title=e.sparkleTitle??"Surprise me",o.innerHTML=io(),o.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&mo(i);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),s.append(n,o),s}function wl(e){let t=Ut(e.id,e.label);return t.append(Z()),oe(t,e),t}var vl=450;function xl(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let s of e.groups){let o=document.createElement("div");o.className="nc-moves-row",o.setAttribute("role","group"),o.setAttribute("aria-label",s.label),s.title&&(o.title=s.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=s.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of s.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${s.label} ${l.text}`),c.append($l(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}o.append(i,r),n.append(o)}return lo(n,e),n}function lo(e,t){for(let n of t.groups)for(let s of n.moves){let o=e.querySelector(`[data-nc-move="${_e(s.id)}"]`);o instanceof HTMLButtonElement&&(o.disabled=s.disabled===!0)}}function $l(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let s=document.createElementNS(t,"path");s.setAttribute("d",e.stroke),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.5"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),n.append(s)}if(e?.fill){let s=document.createElementNS(t,"path");s.setAttribute("d",e.fill),s.setAttribute("fill","currentColor"),n.append(s)}return n}function kl(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(Z()),t}function Ka(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(Z()),t}function Wa(e){if(typeof e.valueText=="string")return e.valueText;let t=dt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function co(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function El(e,t){let n=Dt(t.taper,t.min,t.max,t.value);co(e,t.modulated===!0);let s=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(s)),t.bipolar){let o=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Dt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(s,o))),e.style.setProperty("--knob-to",String(Math.max(s,o)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Wa(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Wa(t)}`}function Al(e,t){if(mt(e.taper,e.min,e.max))return ea(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,s=typeof e.step=="number"&&e.step>0?e.step:n/100,o=t.shiftKey?s/10:s;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+s*10:t.key==="PageDown"?e.value-s*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+o:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-o:null}function Sl(e,t){let n=Ut(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let s=document.createElement("button");s.type="button",s.className="nc-knob",s.dataset.ncId=e.id;let o=document.createElement("i");o.className="nc-knob-mark",s.append(o);let i=0,r=0;s.addEventListener("pointerdown",d=>{i=d.clientY;let p=t(s);r=p&&"value"in p?Number(p.value):0,s.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;s.addEventListener("pointerup",l),s.addEventListener("pointercancel",l),s.addEventListener("lostpointercapture",l),s.addEventListener("pointermove",d=>{if(s.hasPointerCapture&&!s.hasPointerCapture(d.pointerId))return;let p=t(s);if(p?.type!=="knob")return;if(mt(p.taper,p.min,p.max)){let f=Dt(p.taper,p.min,p.max,r)-(d.clientY-i)/120;p.onChange(qs(p.taper,p.min,p.max,f));return}let h=p.max-p.min||1,b=Math.min(p.max,Math.max(p.min,r-(d.clientY-i)*h/120));p.onChange(b)}),s.addEventListener("dblclick",()=>{let d=t(s);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),s.addEventListener("keydown",d=>{let p=t(s);if(p?.type!=="knob")return;let h=Al(p,d);h!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(s,c),n.append(Z()),oe(n,e),n}function Ml(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let s=document.createElement("span");s.className="nc-label nc-choice-caption",s.setAttribute("aria-hidden","true"),s.textContent=e.caption,n.dataset.ncCaption="",n.append(s)}for(let s of e.options){let o=document.createElement("button");o.type="button",o.className="nc-choice",o.dataset.ncChoice=s.value,o.setAttribute("role","tab"),o.textContent=s.label,o.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(s.value)}),o.addEventListener("keydown",i=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(o),c=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(l+1)%r.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(o)}return n.append(Z()),po(n,e),n}function po(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let s=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",s?"true":"false"),n.tabIndex=s?0:-1}}function Tl(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let s=document.createElement("div");s.className="nc-snap-row",s.setAttribute("role","group"),s.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let h=e.slots[p],b=document.createElement("span");b.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(p),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,ce()),Ll(b,f,n,p,t),s.append(b)}let o=e.onSparkle?document.createElement("button"):null;o&&(o.type="button",o.className="nc-sparkle",o.setAttribute("aria-label","Surprise me"),o.innerHTML=io(),o.append(ce()),o.addEventListener("click",()=>{mo(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(s,...o?[o]:[]),n.append(d,i,Z()),uo(n,t),ho(n,e),n}function Ga(e,t,n,s){let o=n(e);if(o?.type!=="slotRow")return;at(e);let i=s.shiftKey?"store":s.altKey?"clear":"recall";o.onSlot(t,i)}function Ll(e,t,n,s,o){let i=0,r=0,l=0,c=!1,d=!1,p=!1,h=!1,b=()=>{window.clearTimeout(i),i=0},f=m=>{let y=m.clientX-r,g=m.clientY-l;y*y+g*g>Ya*Ya&&(c=!0,b())},w=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",u))},v=m=>{let y=i!==0&&!c&&!d;b(),w(),y&&(p=!0,Ga(n,s,o,m))},u=()=>{c=!0,b(),w()};e.addEventListener("pointerdown",m=>{m.button===0&&(w(),d=!1,c=!1,p=!1,r=m.clientX,l=m.clientY,b(),i=window.setTimeout(()=>{i=0,!c&&(d=!0,Cl(n,t,s,o))},pl),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",v),window.addEventListener("pointercancel",u))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(p||d||c){p=!1,d=!1,c=!1;return}Ga(n,s,o,m)})}function uo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let s=Ja("Save","store"),o=Ja("Clear","clear");n.append(s,o);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),at(e)}),i.addEventListener("click",r=>r.stopPropagation()),e.append(i,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),at(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),at(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&at(e)})}function Ja(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Cl(e,t,n,s){uo(e,s);let o=e.querySelector(".nc-slot-menu");if(!(o instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),o.hidden=!1,o.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();o.style.left=`${l.left-r.left}px`,o.style.top=`${l.bottom-r.top}px`,o.querySelector("button")?.focus()}function at(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function ho(e,t){for(let o of e.querySelectorAll("[data-nc-slot]")){if(!(o instanceof HTMLButtonElement))continue;let i=Number(o.dataset.ncSlot),r=t.slots[i];if(!r)continue;o.textContent=r.label,r.filled?o.dataset.filled="true":delete o.dataset.filled,r.active?o.dataset.active="true":delete o.dataset.active,r.edited?o.dataset.edited="true":delete o.dataset.edited,r.queued?o.dataset.queued="true":delete o.dataset.queued,r.queued&&r.pulse?o.dataset.pulse="true":delete o.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];o.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let s=e.querySelector("[data-nc-morph]");s&&(s.textContent=t.morphText)}function mo(e){let t=e.dataset.ncLastFill||null,n=Fi(t);e.dataset.ncLastFill=n;let s=Ni(n);if(s)for(let[o,i]of Object.entries(s))e.style.setProperty(o,i)}function Fl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let s=!1,o=i=>{if(s===i)return;s=i,n.setAttribute("aria-pressed",i?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),o(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>o(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||o(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),o(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function Nl(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let s=document.createElement("div");s.className="nc-seg",s.setAttribute("role","radiogroup"),s.setAttribute("aria-label","Step tool");let o=u=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,s.append(m),m},i=o("Note"),r=o("Accent");r.dataset.ncAccentMode="";let l=u=>{for(let m of[i,r]){let y=m===u;m.setAttribute("aria-checked",y?"true":"false"),m.tabIndex=y?0:-1}};l(i);for(let u of[i,r])u.addEventListener("click",()=>l(u));s.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let m=r.getAttribute("aria-checked")==="true"?i:r;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(s),e.onFill&&c.append(Fl(n,t)),e.onClear){let u=document.createElement("button");u.type="button",u.className="nc-fill nc-clear",u.dataset.ncClear="",u.textContent=e.clearLabel??"Clear",u.title="Clear every step (Undo takes it back)",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(u)}n.append(c);for(let u of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=u.label,y.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(y.dataset.ncLane=String((u.lane-1)%4+1));let g=!1,k=0;y.addEventListener("pointerdown",x=>{g=!1,!(x.pointerType==="mouse"||x.button!==0)&&(k=window.setTimeout(()=>{let S=t(n);S?.type!=="stepGrid"||!S.selectedRows||(g=!0,S.onSelectRow?.(S.rows.findIndex($=>$.id===u.id),!0))},vl))});for(let x of["pointerup","pointercancel","pointerleave"])y.addEventListener(x,()=>window.clearTimeout(k));y.addEventListener("contextmenu",x=>{g&&x.preventDefault()}),y.addEventListener("click",x=>{let S=t(n);if(S?.type!=="stepGrid")return;if(g){g=!1;return}let $=S.rows.findIndex(M=>M.id===u.id),T=!!S.selectedRows&&(x.shiftKey||x.metaKey||x.ctrlKey);S.onSelectRow?.($,T)}),y.addEventListener("keydown",x=>zl(n,y,x));let L=[];for(let x of["mute","solo"]){if(!(x==="mute"?e.onMute:e.onSolo))continue;let S=document.createElement("span");S.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=x,$.textContent=x==="mute"?"M":"S",$.setAttribute("aria-label",`${x==="mute"?"Mute":"Solo"} ${u.label}`),S.append($,ce()),S.addEventListener("click",()=>{let T=t(n);if(T?.type!=="stepGrid")return;let M=T.rows.findIndex(F=>F.id===u.id);(x==="mute"?T.onMute:T.onSolo)?.(M)}),L.push(S)}let A=document.createElement("div");A.className="nc-steps";for(let x=0;x<u.steps.length;x++){let S=document.createElement("span");S.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${u.id}:${x}`,$.setAttribute("aria-label",`${u.label} step ${x+1}`),S.append($,ce()),S.addEventListener("click",T=>{let M=t(n);if(M?.type!=="stepGrid")return;let F=M.rows.findIndex(P=>P.id===u.id),N=r.getAttribute("aria-checked")==="true";M.onToggle(F,x,T.shiftKey||N)}),A.append(S)}if(e.onLength&&A.append(Dl(n,A,u,t)),m.append(...L,y,A),e.onDice){let x=document.createElement("button");x.type="button",x.className="nc-sparkle nc-row-dice",x.dataset.ncDice=u.id,x.setAttribute("aria-label",`Re-roll ${u.label}`),x.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,x.innerHTML=Ua(),x.append(ce()),x.addEventListener("click",()=>{let S=t(n);S?.type==="stepGrid"&&S.onDice?.(S.rows.findIndex($=>$.id===u.id))}),m.append(x)}m.addEventListener("click",x=>{if(x.target!==m)return;let S=t(n);S?.type==="stepGrid"&&S.onSelectRow?.(S.rows.findIndex($=>$.id===u.id))}),Xa(n,A,".nc-step-wrap",t,r,()=>u.id),n.append(m)}let d=document.createElement("div");d.className="nc-pads-head";let p=(u,m,y)=>{let g=document.createElement("button");return g.type="button",g.className=u,g.textContent=m,y&&g.setAttribute("aria-label",y),g},h=p("nc-pads-step","‹","Previous lane"),b=p("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let u=t(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Pn(n,u))}));for(let[u,m]of[[h,-1],[b,1]])u.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let g=y.rows.length;y.onSelectRow?.(((yt(y)+m)%g+g)%g)});if(d.append(h,f,b),e.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=Ua(),u.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let y=yt(m);y>=0&&m.onDice?.(y)}),d.append(u)}if(e.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(u)}n.append(d);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let v=Math.max(0,...e.rows.map(u=>u.steps.length));for(let u=0;u<v;u++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",y=>{let g=t(n);if(g?.type!=="stepGrid")return;let k=yt(g);if(k<0)return;if(n.dataset.ncLenMode==="true"){g.onLength?.(k,u+1);return}let L=r.getAttribute("aria-checked")==="true";g.onToggle(k,u,y.shiftKey||L)}),w.append(m)}return Xa(n,w,".nc-pad",t,r,()=>{let u=t(n);return u?.type==="stepGrid"?u.rows[yt(u)]?.id:void 0}),n.append(w),n.append(Z()),Pn(n,e),n}function yt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Xa(e,t,n,s,o,i){let r="on",l=!0,c=-1,d=(p,h)=>{let b=p.rows[c]?.steps[h];!b||h>=p.rows[c].length||(p.onSet?p.onSet(c,h,r,l):!!b[r]!==l&&p.onToggle(c,h,r==="accent"))};nl(t,n,p=>{let h=s(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let b=h.rows.findIndex(f=>f.id===i());b>=0&&h.rows[b].length!==p.pad+1&&h.onLength?.(b,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let b=i();c=h.rows.findIndex(w=>w.id===b);let f=h.rows[c]?.steps[p.pad];if(!f)return;r=o.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[r]}d(h,p.pad)}else if(p.kind==="long"){let b=i(),f=h.rows.findIndex(v=>v.id===b),w=t.querySelectorAll(n)[p.pad];f>=0&&w instanceof HTMLElement&&h.onLongPress?.(f,p.pad,w)}}})}function zl(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let s=[...e.querySelectorAll(".nc-name")],o=s.indexOf(t),i=o;n.key==="ArrowDown"?i=o+1:n.key==="ArrowUp"?i=o-1:n.key==="Home"?i=0:i=s.length-1;let r=s[i];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function Dl(e,t,n,s){let o=document.createElement("button");o.type="button",o.className="nc-len-handle",o.dataset.ncLen=n.id,o.setAttribute("role","slider"),o.setAttribute("aria-valuemin","1"),o.setAttribute("aria-valuemax",String(n.steps.length)),o.append(ce());let i=d=>{let p=s(e);if(p?.type!=="stepGrid")return;let h=p.rows.findIndex(w=>w.id===n.id),b=p.rows[h];if(!b)return;let f=Math.max(1,Math.min(b.steps.length,d));f!==b.length&&p.onLength?.(h,f)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],h=1;return p.forEach((b,f)=>{let w=b.getBoundingClientRect();w.width>0&&d>=w.left+w.width/2&&(h=f+1)}),h},l=d=>i(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete o.dataset.dragging};return o.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),o.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),o.addEventListener("keydown",d=>{let p=s(e);if(p?.type!=="stepGrid")return;let h=p.rows.find(f=>f.id===n.id);if(!h)return;let b={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in b&&(d.preventDefault(),i(b[d.key]))}),o}var cn=new WeakMap,wt=new WeakMap;function ql(e){return e?(wt.has(e)||(wt.set(e,wn(e)),As(t=>{wt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))qn(n,Number(n.getAttribute("data-nc-velocity")))},e)),wt.get(e)):"light"}function qn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,s=n===null?null:ql(e.ownerDocument),o=n===null?null:`${s} ${n}`;if(!(cn.has(e)&&cn.get(e)===o)){if(cn.set(e,o),n===null){for(let i of Object.keys(Ta(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,r]of Object.entries(Ta(n,Ma[s]??Ma.light)))e.style.setProperty(i,r)}}function Qa(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Pn(e,t){let n=t.rows.some(p=>p.solo),s=e.querySelector("[data-nc-clear]");s&&s.textContent!==(t.clearLabel??"Clear")&&(s.textContent=t.clearLabel??"Clear");let o=e.querySelector(".nc-pads"),i=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&i&&(r.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,h=t.transport?.label??(p?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",p?"true":"false");let b=t.transport?.ariaLabel;b?d.setAttribute("aria-label",b):d.removeAttribute("aria-label")}if(o instanceof HTMLElement&&i){o.setAttribute("aria-label",`${i.label} steps`),i.lane&&(o.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?o.dataset.silent="true":delete o.dataset.silent;let p=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let h of o.querySelectorAll("[data-nc-pad]")){let b=Number(h.getAttribute("data-nc-pad")),f=i.steps[b];h instanceof HTMLButtonElement&&(h.hidden=!f||!l&&b>=i.length,l&&b>=i.length?h.dataset.out="true":delete h.dataset.out,l&&b===i.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${i.label} step ${b+1}${f?.markLabel?`, ${f.markLabel}`:""}`),Qa(h,f),h.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?h.dataset.accent="true":delete h.dataset.accent,f?.dim?h.dataset.dim="true":delete h.dataset.dim,qn(h,f?.velocity),t.playhead>=0&&b===p?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let p of t.rows){for(let f=0;f<p.steps.length;f++){let w=p.steps[f],v=e.querySelector(`[data-nc-step="${p.id}:${f}"]`);if(!(v instanceof HTMLButtonElement))continue;let u=v.closest(".nc-row");if(u instanceof HTMLElement){t.selectedRow===p.id?u.dataset.selected="true":delete u.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?u.dataset.picked="true":delete u.dataset.picked;let L=u.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?u.dataset.silent="true":delete u.dataset.silent;for(let A of u.querySelectorAll("[data-nc-ms]")){let x=A.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;A.setAttribute("aria-pressed",x?"true":"false")}}v.setAttribute("aria-pressed",w.on?"true":"false");let m=`${p.label} step ${f+1}${w.markLabel?`, ${w.markLabel}`:""}`;v.getAttribute("aria-label")!==m&&v.setAttribute("aria-label",m),Qa(v,w),w.accent?v.dataset.accent="true":delete v.dataset.accent,w.dim?v.dataset.dim="true":delete v.dataset.dim,f%4===0?v.dataset.bar="true":delete v.dataset.bar,typeof w.velocity=="number"?(v.dataset.velocity="true",v.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete v.dataset.velocity,v.style.removeProperty("--level")),qn(v,w.velocity);let y=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;f===y?v.dataset.playhead="true":delete v.dataset.playhead;let g=!!t.onLength&&t.selectedRow===p.id;v.hidden=f>=p.length&&!g,f>=p.length&&g?v.dataset.out="true":delete v.dataset.out}let h=e.querySelector(`[data-nc-len="${p.id}"]`),b=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&b&&b.nextElementSibling!==h){let f=document.activeElement===h;b.after(h),f&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(p.length)),h.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),h.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function Pl(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let s=document.createElement("canvas");return s.className="nc-canvas",s.dataset.ncId=e.id,s.dataset.ncPaint=e.paint,t.append(n,s,Z()),t}function Il(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let s=document.createElement("div");s.className="nc-strip-hd";let o=document.createElement("span");o.className="nc-strip-name",o.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",r=null;i&&(n.dataset.ncFoldable="",r=xo(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==r&&r.focus())})),s.append(o);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let g=document.createElement("span");g.className="nc-strip-grip-dots",g.setAttribute("aria-hidden","true"),l.append(g),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let L=t(n);L?.type==="strip"&&(k.preventDefault(),L.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>ts(n,l,t))),!e.master&&typeof e.onShade=="function"&&s.addEventListener("contextmenu",g=>{g.pointerType==="touch"||g.pointerType==="pen"||g.target instanceof Element&&g.target.closest("input, .nc-strip-remove")||(g.preventDefault(),ts(n,s,t,{x:g.clientX,y:g.clientY}))}),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(g)}),s.append(g)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",g.append(k,ce()),g.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),c.append(g)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let g=document.createElement("span");g.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",g.append(k,ce()),g.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),d.append(g)}for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=g,L.textContent=g==="mute"?"M":"S",k.append(L,ce()),k.addEventListener("click",()=>{let A=t(n);A?.type==="strip"&&(g==="mute"?A.onMute:A.onSolo)?.()}),d.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let g of e.sends??[])p.append(De({...g,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(De(ra(e),t));let b=document.createElement("div");b.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(g.value)),k.textContent=g.label,f.append(k)}let w=Gi({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let k=t(n);k?.type==="strip"&&k.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&es(g)}}),v=tr({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(b.append(f,w.el,v.el),i){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let A=document.createElement("span");A.className="nc-strip-fold-pan",A.setAttribute("aria-hidden","true"),A.hidden=!e.pan,g.append(k,A,L),g.addEventListener("click",()=>{let x=t(n);if(x?.type!=="strip")return;x.onFold?.(!1);let S=n.querySelector("[data-nc-strip-hide]");S instanceof HTMLElement&&S.focus()}),b.prepend(g)}let u=document.createElement("button");u.type="button",u.className="nc-strip-db",u.dataset.ncReadout="";let m=0;u.addEventListener("click",g=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(m),g.detail===0?Za(n,u,t):g.detail===1&&(m=window.setTimeout(()=>Za(n,u,t),Rl)))}),u.addEventListener("dblclick",()=>{window.clearTimeout(m);let g=t(n);g?.type==="strip"&&es(g)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(De(la(e),t)),r&&n.append(r),l&&n.append(l),n.append(s,y,c,d,p,h,b,u,Z()),bo(n,e),n}function ra(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??jl(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function la(e){let t=e.trim,n=t.min??-12,s=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:s,step:t.step??.5,value:t.value,valueText:t.valueText??Bl(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:o=>t.onChange(o)}}function Bl(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function jl(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Rl=250;function Za(e,t,n){let s=n(e);if(s?.type!=="strip"||!s.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let o=document.createElement("input");o.type="text",o.className="nc-strip-db-input",o.inputMode="decimal",o.spellcheck=!1,o.autocomplete="off",o.value=s.valueText??dt(s.value),o.setAttribute("aria-label",`${s.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(o),o.focus(),o.select?.();let i=!1,r=l=>{if(i)return;i=!0;let c=o.value;if(o.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};o.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),o.addEventListener("blur",()=>r(!1))}function Ol(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let s=document.createElement("span");s.className="nc-strip-add-face",s.setAttribute("aria-hidden","true");let o=document.createElement("span");o.className="nc-strip-add-plus",o.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",s.append(o,i);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;go(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(s,r,Z()),fo(n,e),n}function fo(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let s=e.querySelector("select");if(!(s instanceof HTMLSelectElement))return;s.setAttribute("aria-label",t.ariaLabel??t.label);let o=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...s.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=o.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==r&&(s.replaceChildren(...o.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),go(s))}function go(e){let t=e.options[0];t&&(t.selected=!0)}function es(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function bo(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let s=e.querySelector("[data-nc-strip-remove]");s&&(s.setAttribute("aria-label",`Remove ${t.label}`),s.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let o=e.querySelector(".nc-fader"),i=o?Ji(o):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),nr(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let w=t.valueText??dt(t.value);r.textContent!==w&&(r.textContent=w),r.setAttribute("aria-label",`${t.label} level ${w}`);let v=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${v}`:v}for(let w of e.querySelectorAll("[data-nc-ms]")){let v=w.getAttribute("data-nc-ms"),u=v==="mute"?t.mute===!0:t.solo===!0;w.setAttribute("aria-pressed",u?"true":"false"),w.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let w=t.hacksLabel??"Hacks";l.textContent!==w&&(l.textContent=w),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${w}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let w=t.sendsViewLabel??"Sends";c.textContent!==w&&(c.textContent=w),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${w}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),$e(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=yo(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let w=e.querySelector(`.nc-strip-trim [data-nc-id="${_e(t.trim.id)}"]`);w&&oe(w,la(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let w=e.querySelector(`.nc-strip-pan [data-nc-id="${_e(t.pan.id)}"]`);w&&oe(w,ra(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let b=e.querySelector("[data-nc-strip-hide]");b instanceof HTMLElement&&($o(b,h,t.label),$e(b,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!h,f.setAttribute("aria-label",`Expand ${t.label}`);let w=f.querySelector("[data-nc-strip-fold-name]");w&&w.textContent!==t.label&&(w.textContent=t.label),$e(f,t.foldedHelp??t.foldHelp)}}function yo(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=wo?t:0}var wo=8,vt=null;function ts(e,t,n,s){vt?.();let o=n(e);if(o?.type!=="strip")return null;let i=e.ownerDocument,r=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${o.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(o.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=yo(o),h=e.querySelector("[data-nc-strip-grip]")??t,b=(m=!1)=>{if(vt!==b)return;vt=null;let y=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",w,!0),i.removeEventListener("pointerdown",v,!0),r.removeEventListener("resize",u),(m||y)&&h?.isConnected&&h.focus?.({preventScroll:!0})},f=[0,...Array.from({length:wo},(m,y)=>y+1)].map(m=>{let y=i.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",m===p?"true":"false"),y.setAttribute("tabindex",m===p?"0":"-1"),y.dataset.ncShadeChoice=String(m),m===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(m),y.setAttribute("aria-label",`Shade ${m}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${m})`)),y.addEventListener("click",()=>{let g=n(e);b(!0),g?.type==="strip"&&g.onShade?.(m===0?null:m)}),y});if(d.append(...f),d.addEventListener("keydown",m=>{let y=f.indexOf(i.activeElement);if(y<0)return;let g=-1;m.key==="ArrowRight"||m.key==="ArrowDown"?g=(y+1)%f.length:m.key==="ArrowLeft"||m.key==="ArrowUp"?g=(y-1+f.length)%f.length:m.key==="Home"?g=0:m.key==="End"&&(g=f.length-1),!(g<0)&&(m.preventDefault(),f[y].setAttribute("tabindex","-1"),f[g].setAttribute("tabindex","0"),f[g].focus())}),l.append(c,d),typeof o.onMove=="function"){let m=[...e.parentElement?.children??[]].filter(g=>g.classList?.contains("nc-strip")&&!g.hasAttribute("data-nc-master")),y=m.indexOf(e);for(let[g,k,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let A=i.createElement("button");A.type="button",A.className="nc-strip-menu-item",A.dataset.ncStripMove=g<0?"left":"right";let x=i.createElement("span");x.textContent=k;let S=i.createElement("kbd");S.textContent=L,S.setAttribute("aria-hidden","true"),A.append(x,S),A.disabled=g<0?y<=0:y<0||y>=m.length-1,A.addEventListener("click",()=>{let $=n(e);b(!0),$?.type==="strip"&&$.onMove?.(g)}),l.append(A)}}i.body.append(l),(()=>{let m=t.getBoundingClientRect?.()??{bottom:0,right:0},y=l.offsetWidth,g=l.offsetHeight,k=r.innerWidth||i.documentElement.clientWidth||y,L=r.innerHeight||i.documentElement.clientHeight||g,A=s?s.x:m.right-y,x=s?s.y:m.bottom+4;A=Math.max(4,Math.min(A,k-y-4)),x+g>L-4&&(x=Math.max(4,(s?s.y:m.top)-g-4)),l.style.left=`${Math.round(A)}px`,l.style.top=`${Math.round(x)}px`})();let w=m=>{if(m.key==="Escape")m.preventDefault(),m.stopPropagation(),b(!0);else if(m.key==="Tab"&&l.contains(i.activeElement)){let y=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),g=(y.indexOf(i.activeElement)+(m.shiftKey?-1:1)+y.length)%y.length;m.preventDefault(),y[g]?.focus()}},v=m=>{l.contains(m.target)||b(!1)},u=()=>b(!1);return i.addEventListener("keydown",w,!0),i.addEventListener("pointerdown",v,!0),r.addEventListener("resize",u),vt=b,(f.find(m=>m.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>b(!1)}}var In=typeof ResizeObserver=="function"?new ResizeObserver(Hl):null;function Hl(e){for(let t of e){if(!t.target.isConnected){In.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&_l(n)}}function _l(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),s=t instanceof HTMLElement?t.offsetHeight:0,o=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${s}px`),e.style.setProperty("--nc-fx-pin-h",`${s+o+i}px`)}function Vl(e){if(In)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))In.observe(t)}function Yl(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let s=document.createElement("h3");s.className="nc-ui-fx-name",s.id=`${e.id}-name`,s.textContent=e.title;let o=typeof e.onFold=="function",i=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!o&&!jt(e)&&!i&&!r)n.append(s);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(s),i&&l.append(Eo(n,"head")),e.on!==void 0){let c=Ns({checked:e.on,labelledBy:s.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}o&&l.append(Kl(n,t)),jt(e)&&l.append(Xl(n,t)),r&&l.append(Ql(t)),n.append(l)}o&&n.prepend(Wl(n,t)),i&&Ao(n,e);for(let l of e.controls)n.append(De(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(De(d,t));n.append(l)}return n.append(Z()),So(n,e),Vl(n),n}var Ul=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function vo(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),s=e.dataset.ncFolded==="true"&&t&&Ul(t)?t:n;s instanceof HTMLElement&&document.activeElement!==s&&s.focus()}function Kl(e,t){let n=xo();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let s=t(n);s?.type==="fx"&&(s.onFold?.(s.folded!==!0),vo(e))}),n}function xo(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function $o(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Wl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let s=document.createElement("span");s.className="nc-ui-fx-fold-state",s.dataset.ncFxFoldState="";let o=document.createElement("span");o.className="nc-ui-fx-fold-name",o.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,s,o),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(Eo(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),vo(e)}}),n}var Ye=new Set;function Tt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var jt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Gl="(max-width: 768px)";function Jl(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Xl(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Jl()),n.addEventListener("click",()=>{let s=t(n);s?.type==="fx"&&(ko(e,s,!Ye.has(s.id)),n.focus())}),n}function Ql(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function ko(e,t,n){n?Ye.add(t.id):Ye.delete(t.id),ca(e,t)}function Zl(e,t){t?.type==="fx"&&Ye.has(t.id)&&ko(e,t,!1)}function ec(e){return e.ownerDocument.defaultView?.matchMedia?.(Gl).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function ca(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),s=jt(t)&&Ye.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!jt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Tt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ve(r)})),n.setAttribute("aria-pressed",s?"true":"false"),n.setAttribute("aria-label",`${s?"Restore":"Maximize"} ${t.title}`),n.title=s?"Restore (Esc)":"Maximize",$e(n,t.maxHelp)),!s){e.dataset.ncMax&&ns(e);return}if(!e.isConnected){let r=()=>e.isConnected&&Ye.has(t.id)&&ca(e,t);queueMicrotask(()=>{e.isConnected?r():Tt(e.ownerDocument,r)});return}let o=ec(e),i=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==o&&(e.dataset.ncMax&&ns(e),e.dataset.ncMax=o,o==="over"&&tc(e,t)),nc(e.ownerDocument),o==="over"&&da(e),Tt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Ve(r)})}function ns(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Tt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ve(n)})}function tc(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let s=document.createElement("button");s.type="button",s.className="nc-fx-close",s.textContent="×",s.setAttribute("aria-label",`Close ${t.title}`),s.title="Close (Esc)",s.addEventListener("click",()=>{let o=e.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&o.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(s)}function da(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let s=n.parentElement instanceof HTMLElement?n.parentElement:n,o=e.ownerDocument.defaultView,i=Number.parseFloat(o?.getComputedStyle(s).columnGap??"")||0,r=vr(t.getBoundingClientRect(),n.getBoundingClientRect(),s.getBoundingClientRect(),i,o?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var as=new WeakSet;function nc(e){as.has(e)||(as.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],s=(n.find(o=>o.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");s instanceof HTMLElement&&(t.preventDefault(),s.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&da(t)}))}var Bn=new WeakMap;function Eo(e,t){let n=Jr(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function Ao(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let o of n)$e(o,t.meterHelp);let s=Bn.get(e);s?s.set(t.meter):Bn.set(e,el(n,t.meter))}function So(e,t){(t.meter||Bn.has(e))&&Ao(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let s=e.querySelector("[data-nc-fx-switch]");s&&s.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let o=typeof t.onFold=="function"&&t.folded===!0;o?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&($o(i,o,t.title),$e(i,t.foldHelp)),ca(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=o,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!o,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),$e(l,t.foldHelp)}}function $e(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function _e(e){return e.replace(/["\\]/g,"\\$&")}function ac(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let s=t.find(o=>o.type==="canvas"&&o.id===n.dataset.ncId);s?.type==="canvas"&&Is(n,s)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Ve(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&da(n);hl(e)}var sc=1e3,oc=e=>e===!0?"log":typeof e=="string"?e:"linear";function ic(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let s=e.taper??oc(e.log),o=mt(s,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(o?0:e.min),l.max=String(o?sc:e.max),l.step=o?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",i.append(r,l,c,d);let p=e.value,h=()=>{let f=e.format(p);c.textContent=f,l.setAttribute("aria-valuetext",f)},b=f=>{p=f,n.activeElement!==l&&(l.value=String(o?ct(s,e.min,e.max,p):p)),h()};return l.addEventListener("input",()=>{p=o?qt(s,e.min,e.max,l.value,e.step):Number(l.value),h(),e.onInput(p)}),o&&l.addEventListener("keydown",f=>{let w=ea(s,e.min,e.max,p,f.key,f.shiftKey,e.step);w===null||l.disabled||(f.preventDefault(),l.value=String(ct(s,e.min,e.max,w)),p=w,h(),e.onInput(p))}),l.disabled=e.disabled===!0,b(e.value),{el:i,set:b,setDisabled(f){l.disabled=f===!0}}}var rc=ve["toast-duration"];function lc({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function cc(e,t,n,s){let o=l=>({top:l,bottom:l+n}),i=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=o(t-s-n);return i(r)?i(o(s))?"bottom":"top":"bottom"}function dc(e,t,n,s,o,i){let r=e.bottom+o,l=Math.max(i,Math.min(e.left,s-i-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+o,c=!0)}return{top:r,left:l}}var ss="data-nc-ui-toast-live";function pc(e,t){let n=t.querySelector(`[${ss}]`);return n||(n=e.createElement("div"),n.setAttribute(ss,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function uc({message:e,actionLabel:t,onAction:n,duration:s=rc,onClose:o,avoid:i=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,p.appendChild(h);let b=null;t&&(b=c.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=t,p.appendChild(b)),l.appendChild(p);let f="open",w=q=>q&&typeof q.getBoundingClientRect=="function"?q.getBoundingClientRect():null,v=w(p),u=v?.height||44,m=d.getComputedStyle?.(p),y=Number.parseFloat(m?.getPropertyValue(H("toast-offset")))||16,g=Number.parseFloat(m?.getPropertyValue(H("toast-anchor-gap")))||8,k=w(r),L=d.innerHeight??0,A=i.map(w).filter(Boolean),x=k&&k.bottom>0&&k.top<L?dc(k,A,{width:v?.width||0,height:u},d.innerWidth??0,g,y):null;x&&x.top+u<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${x.top+(d.scrollY??0)}px`,p.style.left=`${x.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",cc(A,L,u,y));let S=d.requestAnimationFrame?.bind(d)??(q=>setTimeout(q,16));S(()=>S(()=>{f==="open"&&p.setAttribute("data-state","open")})),pc(c,l).textContent=lc({message:e,actionLabel:t});let $,T,M=new Promise(q=>{T=q}),F=q=>{clearTimeout($),$=setTimeout(()=>I("timeout"),q)},N=s,P=Date.now(),R=()=>{f==="open"&&(clearTimeout($),N=Math.max(0,N-(Date.now()-P)))},O=()=>{f==="open"&&(P=Date.now(),F(N))};p.addEventListener("pointerenter",R),p.addEventListener("pointerleave",O),p.addEventListener("focusin",R),p.addEventListener("focusout",O),b?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{I("action")}}),Number.isFinite(s)&&F(s);function I(q="close"){if(f!=="open")return;f="closing",clearTimeout($),p.setAttribute("data-state","closing"),o?.(q);let B=d.getComputedStyle?.(p),he=B?Math.max(0,...String(B.transitionDuration||"").split(",").map(me=>Number.parseFloat(me)*(me.trim().endsWith("ms")?1:1e3)||0)):0,de=()=>{f!=="gone"&&(f="gone",p.remove(),T(q))};p.addEventListener("transitionend",de),setTimeout(de,he+50)}return{el:p,close:I,closed:M}}var pt="data-nc-help";function hc(e,t,n,s=0,o=6,i=8){let r=e.top-o-t.height,l=r>=s+i?"above":"below",c=l==="above"?r:e.bottom+o,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var dn=new WeakMap;function mc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function fc({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=dn.get(e);if(n)return n;let s=e.defaultView,o=null,i=null,r,l=!1,c,d=null,p=!1,h=0,b=()=>{clearTimeout(r),p&&!l&&(h=Date.now()+1500),p=!1,o&&(o.hidden=!0,delete o.dataset.pinned)},f=()=>{b(),clearTimeout(c),i=null,d=null,l=!1},w=(x,S)=>{clearTimeout(r),d=S;let $=Date.now()<h?Math.min(t,300):t;r=setTimeout(()=>{i===x&&x.isConnected&&!l&&m(x)&&(p=!0)},$)},v=x=>({x:Number(x.clientX)||0,y:Number(x.clientY)||0}),u=(x,S,$)=>!x||Math.hypot(x.x-S.x,x.y-S.y)>$,m=(x,S)=>{let $=S??x.getAttribute(pt);if(!$)return!1;o||(o=e.createElement("div"),o.className="nc-ui-help",o.setAttribute("role","tooltip"),o.dataset.testid="nc-help",o.style.position="fixed",o.style.pointerEvents="none",o.style.zIndex="6",e.body.appendChild(o)),o.textContent=$,o.hidden=!1,o.style.visibility="hidden",o.style.top="0px",o.style.left="0px";let T=x.getBoundingClientRect(),M=hc(T,{width:o.offsetWidth,height:o.offsetHeight},s.innerWidth,mc(e));return o.style.top=`${M.top}px`,o.style.left=`${M.left}px`,o.dataset.side=M.side,o.style.visibility="",!0},y=x=>{if(l||x.pointerType==="touch")return;let S=x.target&&x.target.closest?x.target.closest(`[${pt}]`):null;S!==i&&(f(),!(!S||x.buttons)&&(i=S,w(S,v(x))))},g=x=>{if(l||x.pointerType==="touch"||!i)return;if(x.buttons){b(),d=null;return}let S=v(x);p?u(d,S,8)&&(b(),w(i,S)):u(d,S,4)&&w(i,S)},k=x=>{!l&&!x.relatedTarget&&f()},L=x=>{(l||x.key==="Escape")&&f()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",g,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",L),s.addEventListener("scroll",f,!0),s.addEventListener("blur",f);let A={hide:f,pin(x,S,{ms:$=0}={}){return f(),!x||!x.isConnected||!m(x,S)?!1:(l=!0,o.dataset.pinned="",$>0&&(c=setTimeout(f,$)),!0)},uninstall(){f(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",g),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",L),s.removeEventListener("scroll",f,!0),s.removeEventListener("blur",f),o?.remove(),o=null,dn.delete(e)}};return dn.set(e,A),A}var pa="netcomposer.rhythm.hidden.v1",ue=new WeakMap;function pn(){try{return globalThis.localStorage??null}catch{return null}}function Mo(e,t=pa){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(s=>typeof s=="string"):[])}catch{return new Set}}function os(e,t,n,s=pa){let o=Mo(e,s);n?o.add(t):o.delete(t);try{e?.setItem(s,JSON.stringify([...o]))}catch{}}function ua(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(o=>o.controls)],n=[],s=o=>{if(n.push(o),o.type==="group")for(let i of o.controls)s(i)};for(let o of t)s(o),o.type==="fx"&&n.push(...o.controls,...o.more??[]),o.type==="strip"&&(n.push(...(o.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),o.pan&&n.push(ra(o)),o.trim&&n.push(la(o)));return n}function To(e,t){if(!(!e||!t))return ua(e).find(n=>n.id===t)}function gc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ua(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(s=>s.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function bc(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let s=document.createElement("h3");s.className="nc-panel-title",s.textContent=t.title;let o=document.createElement("span");o.className="nc-panel-subject",o.dataset.ncPanelSubject="",n.append(s,o),e.append(n),Lo(e,t)}function Lo(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),s=n?.querySelector(".nc-panel-title"),o=n?.querySelector(".nc-panel-subject");s&&(s.textContent=t.title??""),o&&(o.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function yc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ue.get(t),s=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return To(n,s)}function wc(e,t,n){let s=t.sections??[{id:"main",controls:t.controls??[]}],o=gc(t);if(e.dataset.ncSignature===o){for(let i of s){let r=e.querySelector(`[data-nc-section="${rs(i.id)}"]`);r&&Lo(r,i);for(let l of i.controls){let c=e.querySelector(`[data-nc-id="${rs(l.id)}"]`);c instanceof Element&&oe(c,l)}r instanceof HTMLElement&&jn(r,i,n)}return}e.dataset.ncSignature=o,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of s){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=i.id,i.inset&&(r.dataset.ncInset="true"),i.area&&(r.dataset.ncArea=i.area),i.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",i.label)),i.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),i.title&&r.setAttribute("aria-label",i.title)),bc(r,i);let l=i.panel?document.createElement("div"):r;i.panel&&(l.className="nc-panel-body",r.append(l));for(let c of i.controls)l.append(De(c,yc));e.append(r),jn(r,i,n)}}function Co(e,t,n){let s=t>0?Math.max(1,Math.ceil(e/t)):1,o=Number.isFinite(n)?Math.trunc(n):0;return{pages:s,page:Math.min(s-1,Math.max(0,o))}}var vc="(max-width: 768px)",Fo=new WeakMap;function is(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let s=document.createElement("span");return s.className="nc-fx-page-icon",s.setAttribute("aria-hidden","true"),t.append(s),t}function xc(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let s=document.createElement("div");s.className="nc-fx-pager",s.dataset.ncFxPager="",s.setAttribute("role","group"),s.setAttribute("aria-label","Effects pages");let o=is("prev"),i=is("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),s.append(o,r,i,l);let c=(d,p)=>{let h=Fo.get(e);if(!h||p.getAttribute("aria-disabled")==="true")return;let b=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=Co(b,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,f),h.onPage?.(f),jn(e,{...h,page:f},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===o?i:o).focus(),t.redraw()};return o.addEventListener("click",()=>c(-1,o)),i.addEventListener("click",()=>c(1,i)),e.prepend(s),s}function jn(e,t,n){Fo.set(e,t);let s=[...e.querySelectorAll(":scope > .nc-ui-fx")],o=t.pageSize??0,{pages:i,page:r}=Co(s.length,o,t.page??n.pages.get(t.id)??0);if(o>0&&n.pages.set(t.id,r),i<=1){for(let u of[...e.children])u.classList.contains("nc-fx-pager")&&u.remove();delete e.dataset.ncPaged;for(let u of s)delete u.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(vc).matches===!0,c=e.closest(".nc-module");s.forEach((u,m)=>{let y=Math.floor(m/o)!==r;if(y?u.dataset.ncOffPage="":delete u.dataset.ncOffPage,y&&!l){let g=c instanceof HTMLElement?ue.get(c):void 0;Zl(u,To(g,u.dataset.ncId))}});let d=xc(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),h.setAttribute("aria-disabled",r===i-1?"true":"false");let b=d.querySelector("[data-nc-fx-page-count]"),f=`${r+1} / ${i}`;b.textContent!==f&&(b.textContent=f);let w=d.querySelector("[data-nc-fx-page-live]"),v=`Effects page ${r+1} of ${i}`;w.textContent!==v&&(w.textContent=v)}function rs(e){return e.replace(/["\\]/g,"\\$&")}function $c(e,t=pa){Fs();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let s=Mo(pn(),t).has(e.id),o=document.createElement("header");o.className="nc-module-hd",o.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Ns({labelledBy:i.id,onChange:y=>(ue.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",o.append(i,p,r);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let b=document.createElement("button");b.type="button",b.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",b.append(f);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,o,h,b),n.setAttribute("aria-labelledby",i.id);let v=y=>{let g=ue.get(n)??e;n.dataset.ncOpen=y?"false":"true",h.hidden=y,b.hidden=!y,l.textContent=y?"+":"−",l.setAttribute("aria-expanded",y?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${y?"Show":"Hide"} ${g.title}`),l.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";os(pn(),(ue.get(n)??e).id,y,t),v(y),Rn(n.parentElement)}),b.addEventListener("click",()=>{os(pn(),(ue.get(n)??e).id,!1,t),v(!1),Rn(n.parentElement)});let u={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(y){ue.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=y.title,p.textContent=y.status??"",y.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),f.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,b.setAttribute("aria-label",`Show ${y.title}`),wc(h,y,u),v(h.hidden),m.redraw()},redraw(){let y=ue.get(n);y&&ac(n,ua(y))}};return ue.set(n,e),v(s),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),As(()=>m.redraw(),n.ownerDocument),m}function kc(e,t,n="adjacent"){Fs(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let s=n==="stack"?"stack":"adjacent";t.forEach((o,i)=>{let r=i%4+1;o.el.dataset.ncShade=String(r),o.el.dataset.ncPlace=s;let l=o.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(o.el),o.redraw()}),Rn(e)}function Rn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),s=t.map(i=>i.hasAttribute("data-nc-slim")?a("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",s.join(" "));let o=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&o.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const Ec={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome. Off: Pass 1 starts with the clock.",start:"How a recording Jam starts. Count-in: a bar of clicks, then the pass. Wait: Jam waits for the first sound, and the pass starts on its beat. Play starts at once.","start-off":"Play starts the loop at once, with the clock. Count-in and Wait apply when Record is on. Your choice is kept.","jam-wait":"Wait for the first sound from any instrument: the loop starts on that beat. With Record on, every lap from it becomes a pass. Space anywhere.",waiting:"Waiting for the first sound. Press again (or Space) to cancel. Nothing is recorded.","pattern-pass":"An instrument's own pattern, recorded once and again when it changes. It doesn't replay while that instrument plays its pattern itself.","mode-play":"Play: the loop plays and you can try things on any instrument. Nothing is recorded.","mode-record":"Record: every lap from the next bar 1 becomes a pass. Pressed in a lap's first beat, that lap. Shift+Space anywhere.","mode-full":"32 passes: delete one to record.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the loop. Play: at once, nothing recorded. Record (an empty song always records): Count-in or Wait as set, then every lap is a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"Q: this pass's quantize. Q · Song follows the Setup; Q 1/16 is its own grid (1/8T: eighth-note triplets). Notes move on replay; the pass keeps what you played.","pass-strength":"How far this pass's notes move toward its own grid. Following the song, it uses the Setup's Strength.","knob-pass":"The knobs you moved in this lap. They move again on replay. Muted or deleted, each goes back to where it was.",voice:"Records the next whole loop from LUCY's mic as a voice pass, then Lupa is back in Play. Stopped, it starts the jam. No LUCY yet: it adds one.","voice-busy":"Cancel the voice pass. Nothing from this loop is kept.","you-have-it":"You moved this knob, so this pass lets go of it until the lap ends. Then it takes the knob again."};function ha(e){return Ec[e]??""}const No="nc-song-looper",ma=7,Ac=[1,2,3,4,5,6,7],On=8,zo=/^[A-Za-z0-9._-]{1,64}$/,Hn=24,_n=64,z=960,D=4,te=32,Ne=4e3,Sc=120,Mc=120,Kt=200,Tc=e=>Math.max(Sc,Math.min(Kt,Math.round(Mc/1e3*(e/60)*z))),Rt=40,Ot=240,Lc=8,qe=40,Wt=["off","1/4","1/8","1/8T","1/16","1/32"],Cc=["1/4","1/8T"],Fc={"1/4":z,"1/8":z/2,"1/8T":z/3,"1/16":z/4,"1/32":z/8},Gt=[.5,.75,1],Do=128,Vn=e=>!!e.knobs?.length,se=e=>`${e.inst}|${e.param}`,Ue=e=>Math.max(1,Math.floor(e/D)),_=e=>e.bars*D*z,Ht=D*z;function Yn(e){const t=e.loop;return t?{start:(t.from-1)*Ht,length:(t.to-t.from+1)*Ht}:{start:0,length:_(e)}}function rt(e,t){const n=_(t);if(!e.repeat||e.endTick>=n)return[0];const s=[];for(let o=0;o<n;o+=e.endTick)s.push(o);return s}function lt(e,t){if(!e.shift)return 0;const n=_(t),s=e.repeat&&e.endTick<n?e.endTick:n,o=e.shift*Ht%s;return o<0?o+s:o}function Nc(e,t){const n=_(t),s=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(s/Ht)-1)}function zc(e){const t=Math.round(e.bars*D*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function qo(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const fa=qe*2;function Po(e,t=new Date,n=Math.random){const s=Math.min(Ot,Math.max(Rt,Math.round(Number.isFinite(e)?e:80))),o=t.toISOString();return{format:No,version:ma,id:qo(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:o,updatedAt:o,song:{bpm:s,beatsPerBar:D,bars:Math.min(Lc,Ue(s)),countInBars:1,ppq:z},passes:[],comps:[]}}const Le=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),ee=e=>Number.isInteger(e),pe=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,un=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),re=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function ls(e,t){if(e===void 0)return null;if(!Le(e))return"quantize must be an object";const n=re(e,["grid","strength"]);return n?`quantize has an unknown field (${n})`:!Wt.includes(e.grid)||t<5&&Cc.includes(e.grid)?t<5?"quantize grid is not off, 1/8, 1/16 or 1/32":"quantize grid is not off, 1/4, 1/8, 1/8T, 1/16 or 1/32":Gt.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%"}function Dc(e){if(!Le(e)||e.format!==No)return"it isn't a Lupa song";if(!Ac.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=re(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!pe(e.id))return"its id is missing";if(!pe(e.name,fa))return"its name is missing";if(!un(e.createdAt)||!un(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Le(n))return"its song is missing";const s=re(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop","start"]);if(s)return`its song has an unknown field (${s})`;if(n.start!==void 0){if(e.version<7)return"its song has an unknown field (start)";if(n.start!=="wait")return"its start is not Count-in or Wait"}if(!ee(n.bpm)||n.bpm<Rt||n.bpm>Ot)return`its tempo is not ${Rt}–${Ot}`;if(n.beatsPerBar!==D)return"it isn't in 4/4";if(!ee(n.bars)||n.bars<1||n.bars>Ue(n.bpm))return`its bars are not 1–${Ue(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==z)return`its ticks are not ${z} a beat`;const o=ls(n.quantize,e.version);if(o)return`its song's ${o}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const c=n.loop;if(!Le(c)||re(c,["from","to"])||!ee(c.from)||!ee(c.to)||c.from<1||c.to<c.from||c.to>n.bars)return`its loop is not bars 1–${n.bars}`}const i=_(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>te)return`it has more than ${te} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let c=0;c<e.passes.length;c++){const d=e.passes[c],p=`Pass ${c+1}`;if(!Le(d))return`${p} is not an object`;const h=re(d,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift","knobs","pattern"]);if(h)return`${p} has an unknown field (${h})`;if(d.pattern!==void 0){if(e.version<7)return`${p} has an unknown field (pattern)`;if(d.pattern!==!0)return`${p}'s pattern is not true`;if(d.knobs!==void 0)return`${p} is a pattern and moves knobs`}const b=new Map;if(d.knobs!==void 0){if(e.version<6)return`${p} has an unknown field (knobs)`;if(!Array.isArray(d.knobs)||!d.knobs.length||d.knobs.length>On)return`${p}'s knobs are not 1–${On}`;for(const v of d.knobs){if(!Le(v)||re(v,["inst","param","label","base"]))return`${p} has a knob that is wrong`;if(!pe(v.inst,64)||!(Array.isArray(d.instruments)&&d.instruments.includes(v.inst)))return`${p} has a knob from an instrument not listed`;if(typeof v.param!="string"||!zo.test(v.param))return`${p} has a knob with a bad id`;if(!pe(v.label,Hn))return`${p}'s knob ${v.param} has no name`;if(typeof v.base!="number"||!(v.base>=0&&v.base<=1))return`${p}'s knob ${v.param} does not start at 0–1`;const u=`${v.inst}|${v.param}`;if(b.has(u))return`${p} has knob ${v.param} twice`;b.set(u,v)}if(d.quantize!==void 0)return`${p} moves knobs and has a quantize`}if(d.repeat!==void 0&&(e.version<3||typeof d.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(d.shift!==void 0&&(e.version<4||!ee(d.shift)||d.shift===0||Math.abs(d.shift)>_n))return`${p}'s shift is not a whole number of bars`;if(!pe(d.id)||r.has(d.id))return`${p} has no id of its own`;if(r.add(d.id),!ee(d.n)||d.n<1||l.has(d.n))return`${p} has no number of its own`;if(l.add(d.n),!pe(d.name,qe))return`${p}'s name is not 1–${qe} characters`;if(!un(d.recordedAt))return`${p}'s date is wrong`;if(!ee(d.endTick)||d.endTick<=0||d.endTick>i)return`${p}'s end is not in the song`;for(const v of["kept","mute","solo"])if(typeof d[v]!="boolean")return`${p}'s ${v} is not true or false`;if(typeof d.volume!="number"||!(d.volume>=0&&d.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(d.instruments)||!d.instruments.every(v=>pe(v,64)))return`${p}'s instruments are wrong`;const f=ls(d.quantize,e.version);if(f)return`${p}'s ${f}`;if(!Array.isArray(d.events))return`${p}'s events are missing`;if(d.events.length>Ne)return`${p} has more than ${Ne} events`;let w=Number.NEGATIVE_INFINITY;for(let v=0;v<d.events.length;v++){const u=d.events[v],m=`event ${v+1} in ${p}`;if(!Le(u))return`${m} is not an object`;if(!pe(u.inst,64)||!d.instruments.includes(u.inst))return`${m} is from an instrument not listed`;if(!ee(u.at)||u.at<-Kt||u.at>=d.endTick)return`${m} is outside the pass`;if(u.at<w)return`${m} is out of order`;if(w=u.at,u.kind==="take"){if(e.version===1)return`${m} is of an unknown kind`;const g=re(u,["kind","inst","take","at","len","peaks"]);if(g)return`${m} has an unknown field (${g})`;if(!pe(u.take)||u.take.length>128)return`${m} has no take`;if(!ee(u.len)||u.len<1||u.at+u.len>i)return`${m} has a length outside the song`;if(u.peaks!==void 0&&!(Array.isArray(u.peaks)&&u.peaks.length<=Do&&u.peaks.every(k=>typeof k=="number"&&k>=0&&k<=1)))return`${m} has bad peaks`;continue}if(u.kind==="param"){if(e.version<6||!b.size)return`${m} is of an unknown kind`;const g=re(u,["kind","inst","param","at","value"]);if(g)return`${m} has an unknown field (${g})`;if(typeof u.param!="string"||!b.has(`${u.inst}|${u.param}`))return`${m} moves a knob the pass doesn't list`;if(typeof u.value!="number"||!(u.value>=0&&u.value<=1))return`${m} has a value outside 0–1`;continue}if(b.size)return`${m} is not a knob move in a knob pass`;if(d.pattern===!0&&u.kind!==void 0&&u.kind!=="note")return`${m} is not a note in a pattern pass`;if(u.kind==="slot"){const g=re(u,["kind","inst","slot","at"]);if(g)return`${m} has an unknown field (${g})`;if(!ee(u.slot)||u.slot<1||u.slot>16)return`${m} has slot ${String(u.slot)}`;continue}const y=re(u,["kind","inst","note","vel","at","len","slice","name"]);if(y)return`${m} has an unknown field (${y})`;if(u.kind!==void 0&&u.kind!=="note")return`${m} is of an unknown kind`;if(!ee(u.note)||u.note<0||u.note>127)return`${m} has note ${String(u.note)}`;if(typeof u.vel!="number"||!(u.vel>0&&u.vel<=1))return`${m} has velocity ${String(u.vel)}`;if(!ee(u.len)||u.len<1||u.len>i)return`${m} has a length outside the song`;if(u.slice!==void 0&&!(ee(u.slice)&&u.slice>=0&&u.slice<=255))return`${m} has slice ${String(u.slice)}`;if(u.name!==void 0&&!(typeof u.name=="string"&&u.name.length>0&&u.name.length<=qe))return`${m} has a bad sound name`}}return null}function ga(e){const t=Dc(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=ma,{session:n}}const _t=e=>`${e.note}|${e.at}|${e.slice??""}`,Io=30,hn=e=>(e?.events??[]).filter(t=>t.kind!=="slot"&&t.kind!=="take"&&t.kind!=="param");function xt(e,t,n){if(e.length!==t.length)return!1;const s=new Map;for(const o of t)s.set(_t(o),o);if(s.size!==t.length)return!1;for(const o of e){const i=s.get(_t(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>Io&&!n?.(o))return!1}return!0}function qc(e,t,n){const s=new Map;for(const o of t)s.set(_t(o),o);for(const o of e){const i=s.get(_t(o));if(!i||Math.abs(i.vel-o.vel)>.02||Math.abs(i.len-o.len)>Io&&!n?.(o))return!1}return!0}class Pc{song;b0;passes;drafts=new Map;held=new Map;knobDrafts=new Map;knobValues=new Map;patternDrafts=new Map;settled=null;amended=!1;redoStack=[];laps=new WeakMap;through=-1;paused=!1;recFrom=0;punched=null;voiceLap=null;voiceCut=null;now;stats={taken:0,ignored:0,overCap:0,empty:0,samePattern:0,late:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/z}get lapTicks(){return Yn(this.song).length}get lapStart(){return Yn(this.song).start}get full(){return this.passes.length>=te}hasDraft(t){return t<this.recFrom?!1:(this.drafts.get(t)?.count??0)>0||(this.knobDrafts.get(t)?.events.length??0)>0}place(t){const n=t-this.b0,s=Math.floor(n/this.lapBeats+1e-12);return{lap:s,tick:Math.round((n-s*this.lapBeats)*z)}}get graceTicks(){return Tc(this.song.bpm)}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-this.graceTicks?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/z}played(t,n){const s=[];for(const o of n){if(o.type==="sound"||o.type==="note"&&o.stopped){this.stats.ignored++;continue}if(o.type==="note"&&!o.on){this.release(t,o.id,o.beat);continue}if(o.type==="note"&&o.pattern){const p=this.patternNote(t,o);p&&s.push(p);continue}if(o.type==="chordPad"||o.type==="lap"||o.type==="voice"){this.stats.ignored++;continue}if(o.type==="take"){const p=this.voicePass(t,o);p&&s.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(o.type==="param"){const p=this.knob(t,o);p&&s.push(p);continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:i,tick:r}=this.placeOn(o.beat);if(i<0||i<=this.through||i===this.voiceLap){this.stats.ignored++;continue}const l=this.drafts.get(i)??{lap:i,events:[],count:0};if(l.events.length>=Ne){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(o.type==="slot")c={kind:"slot",inst:t,slot:o.slot,at:d};else{const p={inst:t,note:o.note,vel:$t(o.velocity),at:d,len:1};o.slice!==void 0&&(p.slice=o.slice),typeof o.name=="string"&&o.name.trim()&&(p.name=o.name.trim().slice(0,qe)),this.held.set(`${t}|${o.id}`,{ev:p,onBeat:o.beat}),c=p}be(l.events,c),l.count++,this.drafts.set(i,l),this.stats.taken++,s.push({lap:i,ev:c})}return this.rejudge(),s}patternNote(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:s,tick:o}=this.place(n.beat);if(s===this.voiceLap)return this.stats.ignored++,null;if(s>=0&&s===this.settled?.lap&&s<=this.through)return this.latePattern(t,n,o),null;if(s<0||s<=this.through)return this.stats.ignored++,null;const i=this.patternDrafts.get(s)??new Map,r=i.get(t)??[];if(r.length>=Ne)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+o,len:1};return n.slice!==void 0&&(l.slice=n.slice),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:n.beat}),be(r,l),i.set(t,r),this.patternDrafts.set(s,i),this.stats.taken++,{lap:s,ev:l}}latePattern(t,n,s){const o=this.settled;if(!o)return;const i={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+s,len:1};n.slice!==void 0&&(i.slice=n.slice);let r=o.byInst.get(t);if(!(r?.pass&&!this.passes.includes(r.pass))){if(r||(r={events:[],pass:null,completed:!1},o.byInst.set(t,r)),r.events.length>=Ne){this.stats.overCap++;return}this.held.set(`${t}|${n.id}`,{ev:i,onBeat:n.beat}),be(r.events,i),r.pass&&r.pass.events!==r.events&&be(r.pass.events,i),this.stats.late++,r.dirty=!0}}rejudge(){const t=this.settled;if(t)for(const[n,s]of t.byInst){if(!s.dirty)continue;s.dirty=!1;const o=this.lastPattern(n,s.pass??void 0),i=!!o&&xt(s.events,hn(o),this.heldNote);if(s.pass){if(i&&!s.completed){const r=this.passes.indexOf(s.pass);r>=0&&this.passes.splice(r,1),s.pass=null,this.stats.samePattern++}this.amended=!0}else!i&&!this.full&&(s.pass=this.patternPass(n,s.events,t.lap,this.lapTicks),this.amended=!0)}}lastPattern(t,n){let s;for(const o of this.passes)o!==n&&o.pattern&&o.instruments.includes(t)&&(!s||o.n>s.n)&&(s=o);return s}patternLive(t){if(this.paused||this.full)return[];const{lap:n,tick:s}=this.place(t),o=n>this.through&&n>=this.recFrom?this.patternDrafts.get(n):void 0;if(!o)return[];const i=this.lapStart,r=[];for(const[l,c]of o){const d=c.filter(h=>h.at-i<=s);if(!d.length)continue;const p=this.lastPattern(l);if(p){const h=s-z,b=d.filter(w=>w.at-i<=h),f=hn(p).filter(w=>w.at-i<=h);if(xt(b,f,this.heldNote))continue}r.push({inst:l,events:d})}return r}snapFirst(t,n,s,o=this.b0){if(!n.on||this.paused||this.full||this.through>=0||this.recFrom>0||this.voiceLap===0)return null;const i=Math.max(0,Math.min(this.lapTicks-1,Math.round((o-this.b0)*z))),r=this.drafts.get(0)??{lap:0,events:[],count:0};if(r.events.length>=Ne)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:$t(n.velocity),at:this.lapStart+i,len:1};return n.slice!==void 0&&(l.slice=n.slice),typeof n.name=="string"&&n.name.trim()&&(l.name=n.name.trim().slice(0,qe)),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:Math.min(s,o)}),be(r.events,l),r.count++,this.drafts.set(0,r),this.stats.taken++,{lap:0,ev:l}}knob(t,n){const s=se({inst:t,param:n.param}),o=cs(n.value),i=this.knobValues.get(s);if(o!==null&&this.knobValues.set(s,o),o===null||!zo.test(n.param)||this.paused||this.full)return this.stats.ignored++,null;const{lap:r,tick:l}=this.place(n.beat);if(r<0||r<=this.through||r===this.voiceLap)return this.stats.ignored++,null;const c=this.knobDrafts.get(r)??{lap:r,events:[],knobs:new Map};let d=c.knobs.get(s);if(!d){if(c.knobs.size>=On)return this.stats.ignored++,null;const b=(n.label??"").trim().slice(0,Hn)||n.param.slice(0,Hn);d={inst:t,param:n.param,label:b,base:cs(n.from)??i??o},c.knobs.set(s,d)}let p;for(let b=c.events.length-1;b>=0&&!p;b--){const f=c.events[b];f.inst===t&&f.param===n.param&&(p=f)}if(p&&p.value===o)return null;if(c.events.length>=Ne)return this.stats.overCap++,null;const h={kind:"param",inst:t,param:n.param,at:this.lapStart+l,value:o};return be(c.events,h),this.knobDrafts.set(r,c),this.stats.taken++,{lap:r,ev:h}}release(t,n,s){const o=`${t}|${n}`,i=this.held.get(o);i&&(this.held.delete(o),i.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((s-i.onBeat)*z))))}seam(t){const n=this.place(t).lap,s=[];for(let o=this.through+1;o<n;o++){if(this.through=o,o<this.recFrom){this.drop(o);continue}s.push(...this.commitPatterns(o,this.lapTicks));const i=this.commit(o,this.lapTicks);i&&s.push(i);const r=this.commitKnobs(o,this.lapTicks);r&&s.push(r)}return s}stop(t){for(const[s,o]of this.held)this.held.delete(s),this.cut.add(o.ev),o.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-o.onBeat)*z)));const n=this.seam(t);return this.settled=null,n.push(...this.part(t)),this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.settled=null,this.cut.clear(),n}punchOut(t){for(const[r,l]of this.held)this.held.delete(r),this.cut.add(l.ev),l.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-l.onBeat)*z)));const n=this.seam(t);this.settled=null;const{lap:s,tick:o}=this.place(t),i=s>=this.recFrom;n.push(...this.part(t)),i&&(this.punched={lap:s,tick:o}),this.recFrom=Number.POSITIVE_INFINITY;for(const r of[...this.drafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.knobDrafts.keys()])r>this.through&&this.drop(r);for(const r of[...this.patternDrafts.keys()])r>this.through&&this.drop(r);return this.cut.clear(),n}recordFrom(t){return this.recFrom=Math.max(t,this.through+1,0),this.recFrom}recordNone(){this.recFrom=Number.POSITIVE_INFINITY}records(t){return t>=this.recFrom}drop(t){const n=this.drafts.get(t);if(n)for(const[o,i]of this.held)n.events.includes(i.ev)&&this.held.delete(o);const s=this.patternDrafts.get(t);if(s)for(const o of s.values())for(const[i,r]of this.held)o.includes(r.ev)&&this.held.delete(i);this.drafts.delete(t),this.knobDrafts.delete(t),this.patternDrafts.delete(t)}part(t){const n=[],{lap:s,tick:o}=this.place(t);if(s>=0&&s>this.through){if(this.through=s,s<this.recFrom)return this.drop(s),n;const i=D*z,r=Math.min(this.lapTicks,Math.max(i,Math.ceil(Math.max(1,o)/i)*i)),l=this.patternDrafts.get(s);if(l)for(const[p,h]of l){const b=h.filter(f=>f.at-this.lapStart<=o);b.length?l.set(p,b):l.delete(p)}n.push(...this.commitPatterns(s,r,o));const c=this.commit(s,r);c&&n.push(c);const d=this.commitKnobs(s,r);d&&n.push(d)}return n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:s,tick:o}=this.place(n.beat),i=s===this.voiceLap,r=i?this.voiceCut:this.punched?.lap===s?this.punched.tick:null;if(s<0||s<this.recFrom&&r===null&&!i||r!==null&&o>=r||!n.take||this.passes.some(h=>h.events.some(b=>b.kind==="take"&&b.take===n.take)))return this.stats.ignored++,null;const l=Math.max(0,Math.min(this.lapTicks-1,o)),c=Math.max(1,Math.min((r??this.lapTicks)-l,Math.round(n.lengthBeats*z))),d={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+l,len:c};Array.isArray(n.peaks)&&n.peaks.length&&(d.peaks=n.peaks.slice(0,Do).map(h=>Number.isFinite(h)?Math.round(Math.max(0,Math.min(1,h))*100)/100:0)),this.drafts.set(-1-s,{lap:s,events:[d],count:1});const p=this.commitDraft(-1-s,s,this.lapTicks);return p&&this.stats.taken++,p}heldNote=t=>this.cut.has(t)||this.isHeld(t);cut=new Set;isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,s){const o=this.drafts.get(n),i=this.knobDrafts.get(n),r=this.patternDrafts.get(n),l=this.lapStart-s;if(Number.isFinite(this.recFrom)&&(this.recFrom=Math.max(0,this.recFrom-n)),this.punched=null,this.voiceLap=null,this.voiceCut=null,this.b0=t,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),r){for(const c of r.values())for(const d of c)d.at+=l;this.patternDrafts.set(0,r)}if(o){for(const c of o.events)c.at+=l;o.lap=0,this.drafts.set(0,o)}if(i){for(const c of i.events)c.at+=l;i.lap=0,this.knobDrafts.set(0,i)}}resume(t){this.b0=t,this.punched=null,this.voiceLap=null,this.voiceCut=null,this.laps=new WeakMap,this.through=-1,this.settled=null,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,s){const o=this.drafts.get(t);if(this.drafts.delete(t),!o||o.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=o.count,null;const i=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=o.events.filter(d=>d.at-r<s),c={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):s,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}commitPatterns(t,n,s){const o=this.patternDrafts.get(t);if(this.patternDrafts.delete(t),this.settled=s===void 0?{lap:t,byInst:new Map}:null,!o)return[];const i=[],r=this.lapStart;for(const[l,c]of o){const d=c.filter(v=>v.at-r<n);if(!d.length)continue;const p={events:d,pass:null,completed:!1};this.settled?.byInst.set(l,p);const h=this.lastPattern(l),b=hn(h);let f=b;if(s!==void 0){const v=d.reduce((m,y)=>Math.max(m,y.at-r),Number.NEGATIVE_INFINITY),u=Math.min(s,v);f=b.filter(m=>m.at-r<=u)}const w=s===void 0?xt(d,f,this.heldNote):qc(d,f,this.heldNote);if(h&&w){this.stats.samePattern++;continue}if(this.full){this.stats.ignored+=d.length;continue}if(h&&this.laps.get(h)===t-1&&b.length){const v=b[0]?.at??0;if(xt(d.filter(u=>u.at>=v),b)){const u=this.passes.indexOf(h);u>=0&&this.passes.splice(u,1),p.completed=!0}}p.pass=this.patternPass(l,d,t,n),i.push(p.pass)}return i}patternPass(t,n,s,o){const i=this.passes.reduce((l,c)=>Math.max(l,c.n),0)+1,r={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[t],events:n,pattern:!0};return this.passes.push(r),this.laps.set(r,s),this.redoStack=[],r}patternDrafting(){const t=[];for(const[n,s]of this.patternDrafts)if(n>=this.recFrom)for(const[o,i]of s)t.push({lap:n,inst:o,events:i});return t}commitKnobs(t,n){const s=this.knobDrafts.get(t);if(this.knobDrafts.delete(t),!s?.events.length)return null;if(this.full)return this.stats.ignored+=s.events.length,null;const o=this.lapStart,i=s.events.filter(p=>p.at-o<n);if(!i.length)return null;const r=new Set(i.map(p=>se(p))),l=[...s.knobs.values()].filter(p=>r.has(se(p))),c=this.passes.reduce((p,h)=>Math.max(p,h.n),0)+1,d={id:`p${c}-${this.now().getTime().toString(36)}`,n:c,name:`Pass ${c}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?_(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(p=>p.inst))],events:i,knobs:l.map(p=>({...p}))};return this.passes.push(d),this.laps.set(d,t),this.redoStack=[],d}knobDrafting(){return[...this.knobDrafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events,knobs:[...t.knobs.values()]}))}drafting(){return[...this.drafts.values()].filter(t=>t.lap>=this.recFrom).map(t=>({lap:t.lap,events:t.events}))}undo(t){this.settled=null;const{lap:n}=this.place(t),s=n>=this.recFrom?this.drafts.get(n):void 0,o=n>=this.recFrom?this.knobDrafts.get(n):void 0;if(s&&s.count>0||o?.events.length){this.drafts.delete(n),this.knobDrafts.delete(n);const l=s??{lap:n,events:[],count:0};for(const[d,p]of this.held)l.events.includes(p.ev)&&this.held.delete(d);const c={kind:"lap",draft:l,...o?.events.length?{knobs:o}:{}};return this.redoStack.push(c),c}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}undoPass(t){const n=this.passes.indexOf(t);if(n<0)return null;this.passes.splice(n,1);const s={kind:"pass",pass:t};return this.redoStack.push(s),s}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const l=this.passes.findIndex(c=>c.n>n.pass.n);return l<0?this.passes.push(n.pass):this.passes.splice(l,0,n.pass),n}const{lap:s}=this.place(t);if(n.draft.lap===s||n.draft.lap>this.through){const l=this.drafts.get(n.draft.lap);if(l)for(const c of n.draft.events)be(l.events,c);else n.draft.count&&this.drafts.set(n.draft.lap,n.draft);if(l&&(l.count+=n.draft.count),n.knobs){const c=this.knobDrafts.get(n.knobs.lap);if(!c)this.knobDrafts.set(n.knobs.lap,n.knobs);else{for(const d of n.knobs.events)be(c.events,d);for(const[d,p]of n.knobs.knobs)c.knobs.has(d)||c.knobs.set(d,p)}}return n}n.draft.count&&this.drafts.set(n.draft.lap,n.draft),n.knobs&&this.knobDrafts.set(n.knobs.lap,n.knobs);const o=this.commit(n.draft.lap,this.lapTicks),i=this.commitKnobs(n.draft.lap,this.lapTicks),r=o??i;return r?{kind:"pass",pass:r}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function cs(e){return typeof e!="number"||!Number.isFinite(e)?null:Math.round(Math.max(0,Math.min(1,e))*1e4)/1e4}function $t(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function be(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const ds=.5,Ic=64,Te="draft:",Bc=12;function ps(e,t){const n=t&&t.grid!=="off"?Fc[t.grid]:void 0;if(!t||!n)return e;const s=Math.round(e/n)*n;return Math.round(e+(s-e)*t.strength)}function tt(e,t){return e.mute?!1:t?e.solo:!0}const us=e=>e.kind==="slot",mn=e=>e.kind==="take",fn=e=>e.kind==="param",jc=.25,Rc=4,Oc=.05;class Hc{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;live=null;knobs=new Map;hands=new Map;resend=new Map;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0,params:0,live:0,byInst:{}};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.restart()}forgetKnobs(){this.knobs.clear(),this.hands.clear(),this.resend.clear()}rebase(t){for(const[n,s]of this.takesSent)s<=t+1e-9&&this.takesSent.delete(n);this.hands.clear();for(const n of this.knobs.values())n.fresh=!1;this.rung=this.rung.filter(n=>!n.pass.startsWith(Te))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;for(const s of this.knobs.values())s.fresh=!1;this.silence(t);const n=[...this.takesSent.values()].some(s=>s>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(s=>s.beat<t);for(const[s,o]of this.takesSent)o>t&&this.takesSent.delete(s);for(const[s,o]of this.sounding)this.sounding.set(s,o.filter(i=>i.start<t))}}pump(t,n,s){const o=this.rec,i=[];if(this.waiting.length){const $=[];for(const T of this.waiting){if(o.isHeld(T.ev)){$.push(T);continue}if(T.beat>=t)i.push(T);else{const M=Math.min(T.ev.len,this.rec.lapTicks)/z-(t-T.beat);M>.05&&i.push({...T,beat:t,lenBeats:M})}}this.waiting=$}const r=Math.max(this.sentTo,t);if(!(n>r)&&!i.length&&!this.lateTakes(t))return 0;const l=s?.lapTicks??o.lapTicks,c=l/z,d=s?.lapStart??o.lapStart,p=d+l,h=s?.b0??o.b0,b=($,T)=>h+$*c+(T-d)/z,f=$=>$>=d-Kt&&$<p,w=Math.max(0,Math.floor((r-h)/c)-1),v=Math.floor((n-h)/c)+1,u=[],m=($,T,M)=>{const F=M+$.at;if(!f(F))return;const N=b(T,F);N>=r&&N<n&&u.push({inst:$.inst,beat:N,slot:$.slot})},y=[],g=($,T,M,F,N=Number.NEGATIVE_INFINITY,P=Number.POSITIVE_INFINITY)=>{const R=F,O=R+T.at,I=Math.min(O+T.len,R+$.endTick,P),q=Math.max(O,d,N),B=Math.min(I,p);if(B<=q)return;const he=b(M,q),de=b(M,B),me=`${$.id}|${M}|${R}`;if(this.takesSent.has(me)||de<=t||he>=n)return;const Se=Math.max(he,t);if(de-Se<Oc)return;const Qe=(q-O)/z+(Se-he),Ze={type:"take",id:`t${++this.serial}`,beat:Se,take:T.take,lengthBeats:Qe+(de-Se),gain:Math.max(0,Math.min(1,$.volume))};Qe>1e-9&&(Ze.offsetBeats=Qe),this.takesSent.set(me,de),y.push({inst:T.inst,ev:Ze})},k=o.passes,L=k.some($=>$.solo&&!$.mute),A=($,T,M,F,N,P,R,O=!1)=>{if(!f(N))return;const I=b(P,N);if(I>=r&&I<n){if(O&&this.live?.(T,I)){this.stats.live++;return}o.isHeld(F)?this.waiting.push({inst:T,age:M,beat:I,ev:F,velocity:R,pass:$}):i.push({inst:T,age:M,beat:I,ev:F,velocity:R,pass:$})}};for(const $ of k){if(!tt($,L))continue;const T=s?void 0:o.lapOf($),M=T===void 0?0:T+1,F=$.quantize??this.song.quantize,N=rt($,this.song),P=lt($,this.song),R=N.length>1?$.endTick:_(this.song),O=I=>{const q=I+P;return P&&q>=R?q-R:q};for(let I=Math.max(M,w);I<=v;I++)for(const q of N)for(const B of $.events)if(!(B.at>=$.endTick)){if(us(B)){m(B,I,q+O(B.at)-B.at);continue}if(!fn(B)){if(mn(B)){P?(g($,B,I,q+P,q,q+R),g($,B,I,q+P-R,q,q+R)):g($,B,I,q);continue}A($.id,B.inst,$.n,B,q+O(ps(B.at,F)),I,B.vel*$.volume,$.pattern===!0)}}}if(!L)for(const $ of o.drafting())for(let T=Math.max(s?0:$.lap+1,w);T<=v;T++)for(const M of $.events){if(us(M)){m(M,T,0);continue}mn(M)||fn(M)||A(`${Te}${$.lap}`,M.inst,Number.POSITIVE_INFINITY,M,ps(M.at,this.song.quantize),T,M.vel)}if(this.announceLaps){const $=[];for(let T=Math.max(0,Math.ceil((r-h)/c));h+T*c<n;T++)$.push({type:"lap",id:`l${++this.serial}`,beat:h+T*c,lengthBeats:c});$.length&&(this.sink.laps($),this.stats.laps+=$.length)}if(this.pumpKnobs(t,r,n,{b0:h,L:c,cs:d,ce:p,beatAt:b,inCycle:f,lapLo:w,lapHi:v,loopChange:!!s}),this.sentTo=Math.max(this.sentTo,n),y.length){const $=new Map;for(const T of y)$.set(T.inst,[...$.get(T.inst)??[],T.ev]);for(const[T,M]of $)this.sink.controls(T,M);this.stats.takes+=y.length}if(u.length){u.sort((T,M)=>T.beat-M.beat);const $=new Map;for(const T of u){const M=$.get(T.inst)??[];M.push({type:"slot",id:`s${++this.serial}`,beat:T.beat,slot:T.slot}),$.set(T.inst,M)}for(const[T,M]of $)this.sink.controls(T,M);this.stats.slots+=u.length}if(!i.length)return 0;i.sort(($,T)=>$.beat-T.beat||T.age-$.age);const x=new Map;for(const $ of i){const T=$.lenBeats??Math.max(1,Math.min($.ev.len,l))/z;if(!this.voice($.inst,$.beat,$.beat+T,$.age)){this.stats.dropped++;continue}const M={note:$.ev.note,velocity:Math.max(.01,Math.min(1,$.velocity)),startBeat:$.beat,lengthBeats:T,spanBeats:T,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:$.ev.note};$.ev.slice!==void 0&&(M.slice=$.ev.slice),this.rung.push({inst:$.inst,pass:$.pass,note:M});const F=x.get($.inst)??[];F.push(M),x.set($.inst,F)}let S=0;for(const[$,T]of x)this.sink.send($,T),S+=T.length,this.stats.byInst[$]=(this.stats.byInst[$]??0)+T.length;return this.stats.sent+=S,S}knobSources(t){const n=this.rec,s=n.passes.some(i=>i.solo&&!i.mute),o=[];for(const i of n.passes){if(!Vn(i)||!tt(i,s))continue;const r=t?void 0:n.lapOf(i);o.push({id:i.id,age:i.n,first:r===void 0?0:r+1,endTick:i.endTick,...i.repeat?{repeat:!0}:{},...i.shift?{shift:i.shift}:{},knobs:i.knobs??[],events:i.events.filter(fn)})}if(!s)for(const i of n.knobDrafting())o.push({id:`${Te}${i.lap}`,age:1e9+i.lap,first:t?0:i.lap+1,endTick:_(this.song),knobs:i.knobs,events:i.events});return o}driver(t,n,s){let o=null;for(const i of t)i.first<=s&&i.knobs.some(r=>se(r)===n)&&(!o||i.age>o.age)&&(o=i);return o}curve(t,n){const s=t.knobs.find(l=>se(l)===n),o=jc*this.song.bpm*z/60,i=[];let r=null;for(const l of t.events){if(se(l)!==n||l.at>=t.endTick)continue;const c=r===null?Number.POSITIVE_INFINITY:l.at-r;i.push({at:l.at,value:l.value,...c>0&&c<=o?{glide:Math.min(Rc,c/z)}:{}}),r=l.at}return{base:s?.base??i[0]?.value??0,points:i}}valueAt(t,n,s){const o=lt(t,this.song),i=rt(t,this.song).length>1,r=i?t.endTick:_(this.song);let l=i?s-Math.floor(s/r)*r:s;l-=o,l<0&&(l+=r);let c=n.base;for(const d of n.points){if(d.at>l)break;c=d.value}return c}knobMarks(t,n){const s=rt(t,this.song),o=lt(t,this.song),i=s.length>1?t.endTick:_(this.song),r=c=>{const d=c+o;return o&&d>=i?d-i:d},l=[];for(const c of s){l.push({t:c+r(0),value:n.base});for(const d of n.points)l.push({t:c+r(d.at),value:d.value,...d.glide?{glide:d.glide}:{}})}return l}pumpKnobs(t,n,s,o){for(const[c,d]of this.hands)d.until<=t&&this.hands.delete(c);const i=this.knobSources(o.loopChange),r=new Map;for(const c of this.knobs.values())r.set(se(c),c);for(const c of i)for(const d of c.knobs)r.set(se(d),d);if(!r.size)return;const l=new Map;for(const[c,d]of r){const p=this.resend.get(c);this.resend.delete(c);const h=p!==void 0?Math.min(n,Math.max(p,t)):n;if(!(s>h))continue;const b=this.hands.get(c),f=y=>!!b&&y>=b.from-1e-9&&y<b.until-1e-9;let w=this.knobs.get(c);const v=[],u=Math.max(0,Math.min(o.lapLo,Math.floor((h-o.b0)/o.L)-1));for(let y=u;y<=o.lapHi;y++){const g=o.beatAt(y,o.cs);if(o.beatAt(y,o.ce)<=h||g>=s)continue;const L=this.driver(i,c,y),A=Math.max(h,g);if(!L){w?.driver&&(f(A)||v.push({beat:A,value:w.base}),w.driver=null);continue}const x=this.curve(L,c);if(w||(w={inst:d.inst,param:d.param,driver:null,base:x.base,fresh:!1},this.knobs.set(c,w)),w.driver!==L.id||!w.fresh){const S=o.cs+(A-g)*z;f(A)||v.push({beat:A,value:this.valueAt(L,x,S)}),w.driver=L.id,w.base=x.base,w.fresh=!0}g>=h&&g<s&&!f(g)&&v.push({beat:g,value:this.valueAt(L,x,o.cs)});for(const S of this.knobMarks(L,x)){if(!o.inCycle(S.t)||S.t<o.cs)continue;const $=o.beatAt(y,S.t);$<h||$>=s||f($)||v.push({beat:$,value:S.value,...S.glide?{glide:S.glide}:{}})}}if(!v.length)continue;v.sort((y,g)=>y.beat-g.beat);const m=l.get(d.inst)??[];for(let y=0;y<v.length;y++){const g=v[y],k=v[y+1];k&&Math.abs(k.beat-g.beat)<1e-9||m.push({type:"param",id:`k${++this.serial}`,beat:g.beat,param:d.param,value:g.value,...g.glide?{glide:g.glide}:{}})}l.set(d.inst,m)}for(const[c,d]of l)d.length&&(d.sort((p,h)=>p.beat-h.beat),this.sink.controls(c,d),this.stats.params+=d.length)}hand(t,n,s){if(this.sentTo===Number.NEGATIVE_INFINITY)return null;const o=se({inst:t,param:n}),i=this.rec,{lap:r}=i.place(s),l=i.beatOf(r+1,0),c=this.hands.get(o);if(c&&Math.abs(c.until-l)<1e-9)return this.sentTo>l&&this.resend.set(o,l),c;const d=this.driver(this.knobSources(!1),o,r);if(!d)return null;const p={inst:t,param:n,driver:d.id,from:s,until:l};return this.hands.set(o,p),this.sentTo>l&&this.resend.set(o,l),p}handsAt(t){const n=[];for(const s of this.hands.values()){if(t<s.from-1e-9||t>=s.until)continue;let o=s.driver;if(o.startsWith(Te)){const i=Number(o.slice(Te.length));o=this.rec.passes.find(r=>Vn(r)&&this.rec.lapOf(r)===i)?.id??null}n.push({...s,pass:o})}return n}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-Ic),!this.rung.length||!this.sink.release)return;const n=this.rec.passes,s=n.some(c=>c.solo&&!c.mute),o=new Map(n.map(c=>[c.id,c])),i=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(Te)){const p=Number(c.slice(Te.length));if(i.has(p))return!s;const h=n.find(b=>this.rec.lapOf(b)===p);return!!h&&tt(h,s)}const d=o.get(c);return!!d&&tt(d,s)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,s=Math.floor((t-n.b0)/n.lapBeats),o=n.passes.some(i=>i.solo&&!i.mute);return n.passes.some(i=>{if(!tt(i,o)||!i.events.some(mn))return!1;const r=n.lapOf(i);return r===void 0||s>r})}voice(t,n,s,o){const i=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(i.length>=Bc){let r=0;for(let l=1;l<i.length;l++)i[l].age<i[r].age&&(r=l);if(o<=i[r].age)return this.sounding.set(t,i),!1;i.splice(r,1)}return i.push({start:n,end:s,age:o}),this.sounding.set(t,i),!0}}const hs=8,_c=.3,Vc=2*D,Yc={running:!1,beatAt:()=>0,timeAt:()=>0};class Uc{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];listening=!1;soundOff=null;recent=[];starting=null;snap=null;startedBy=null;countedIn=!0;countFrom=0;armedKey=-1;liveCount=0;recOn;patterns=new Map;voiceJob=null;voiceSerial=0;voiceKey="";constructor(t,n){this.session=t,this.deps=n,this.rec=new Pc({song:t.song,b0:0,passes:t.passes,now:n.date}),this.recOn=t.passes.length===0,this.replay=n.sink?new Hc(this.rec,n.sink):null,this.replay&&(this.replay.live=(o,i)=>this.live(o,i));const s=n.host;s?.clock&&this.offs.push(s.clock.onChange(o=>this.clockChanged(o))),s?.onPlayed&&this.offs.push(s.onPlayed((o,i)=>this.played(o,i))),s?.claimKeys&&this.offs.push(s.claimKeys(["Space","Backspace"],o=>(o.code==="Space"&&o.shiftKey?this.toggleRecord():o.code==="Space"?this.toggle():o.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??Yc}get graceBeats(){return this.rec.graceTicks/z}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(Ot,Math.max(Rt,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Ue(n)),this.changed())}toggle(){this.waiting?this.cancelWait():this.jamming||this.wantJam?this.stop():this.jam()}get waiting(){return this.listening||this.starting!==null}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}this.syncTempo(),this.notice="";const n=this.voiceJob?.phase==="starting";if(!this.session.passes.length&&!n&&(this.recOn=!0),n){if(this.recOn=!1,this.transport.running){const i=Math.ceil(this.beatNow()/D+.05)*D;this.begin(i,!0)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1);return}if(this.recOn&&this.session.song.start==="wait"){if(t.onSound){this.wait();return}this.notice="Wait needs a newer Studio. Counting in."}if(this.transport.running){const o=Math.ceil(this.beatNow()/D+.05)*D;this.begin(o,this.recOn)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}wait(){const t=this.deps.host;if(!t?.onSound)return;this.recent=[],this.listening=!0;let n=null;try{n=t.onSound(s=>this.heard(s))}catch{n=null}this.listening?this.soundOff=n:n?.(),this.changed(!1)}stopListening(){this.listening=!1;const t=this.soundOff;this.soundOff=null;try{t?.()}catch{}}cancelWait(){const t=this.starting!==null;this.stopListening(),this.starting=null,this.recent=[],t&&this.transport.running&&this.deps.host?.studioTransport?.stop(),this.changed(!1)}heard(t){if(!this.listening)return;this.startedBy=t;const n=this.deps.host;if((t.kind==="start"||t.kind==="in")&&t.from!=="studio"&&t.beat!==null&&this.markLive(t.from,t.beat),t.stopped||t.beat===null||!this.transport.running){this.stopListening(),this.starting={at:t.at,from:t.from,lead:[]};for(const i of this.recent)i.at>=t.at-.1&&this.starting.lead.push(i);this.recent=[],n?.studioTransport?.playOnly?n.studioTransport.playOnly(n.instance??"looper"):n?.studioTransport?.play(),this.changed(!1);return}const s=t.kind==="start"||t.kind==="in"?t.beat:Math.floor((t.beat+this.graceBeats)/D)*D;this.stopListening();const o=this.recent;this.recent=[],this.begin(s,!1);for(const i of o){const r=i.events.filter(l=>!(l.type==="note"&&l.stopped)&&l.beat>=s-this.graceBeats);r.length&&this.record(i.source,r)}this.changed(!1)}startFromSound(t){const n=this.starting;if(this.starting=null,!n)return;this.begin(t,!1);const s=this.transport.timeAt(t),o=Math.max(1e-6,this.transport.beatAt(s+1)-t);this.snap={b0:t,first:null,t0:s,bps:o,until:s+.25};for(const i of n.lead)this.snapPlayed(i.source,i.events,i.at);this.changed(!1)}snapPlayed(t,n,s){const o=this.snap;if(!o)return[...n];const i=[],r=o.b0+(s-o.t0)*o.bps;for(const l of n){const c=l.type==="note"&&l.stopped||l.type==="note"&&l.beat<o.b0-1e-9;if(l.type!=="note"||!c){i.push(l);continue}if(!l.on){this.rec.played(t,[{...l,stopped:!1,beat:Math.max(r,o.b0)}]);continue}o.first===null&&(o.first=s);const d=o.b0+Math.max(0,s-o.first)*o.bps;this.rec.snapFirst(t,{...l,stopped:!1},Math.min(r,d),d)&&this.changed(!1)}return i}markLive(t,n){const s=this.patterns.get(t);!s||n>s.last+D+1e-6||n<s.from-D?this.patterns.set(t,{from:n,last:n}):(s.last=Math.max(s.last,n),s.from=Math.min(s.from,n))}live(t,n){const s=this.patterns.get(t);return!!s&&n>=s.from-1e-6&&n<=s.last+D+1e-6}begin(t,n=!0,s){this.wantJam=!1,this.jamming=!0,this.snap=null;const o=this.voiceJob?.phase==="starting",i=o?Math.max(1,this.session.song.countInBars):n?this.session.song.countInBars:0,r=t+i*D;if(this.countFrom=t,this.countedIn=r>t,this.rec.resume(r),this.recOn&&!this.rec.full?this.rec.recordFrom(0):this.rec.recordNone(),this.replay?.start(),this.transport.running){const l=s??Math.min(t,this.beatNow());this.replay?.pump(l,this.transport.beatAt(this.deps.now()+ds))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,r),o&&this.armVoice(0)}showCountIn(t,n){const s=this.deps.host;if(!this.deps.countIn||!s?.mapper||n<=t)return;const o=this.transport,i=l=>s.mapper?.toContextTime(o.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(i(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%D===0),until:i(n)})}catch{}}stop(){if(this.waiting){this.cancelWait();return}const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.snap=null,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null);const n=this.voiceJob;if(n&&(n.phase==="starting"||n.phase==="armed"))this.cancelVoice(!0);else if(n&&n.phase==="recording"){const s=Math.max(0,Math.min(n.lengthBeats,t-n.beat));this.rec.voiceCut=Math.round(s*z),n.cutAt=s/n.lengthBeats,n.phase="after",n.until=this.deps.now()+hs}this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.recOn=this.session.passes.length===0,this.rec.recFrom=0,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){const n=typeof t.beat=="number"?t.beat:0;t.kind==="start"&&this.starting?this.startFromSound(n):t.kind==="start"&&this.wantJam?this.begin(n,this.recOn||this.voiceJob?.phase==="starting"):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),(t.kind==="stop"||t.kind==="snapshot"&&!this.transport.running)&&(this.patterns.clear(),this.starting&&(this.starting=null,this.recent=[])),this.changed(!1)}get recording(){return this.recOn}get startApplies(){return this.recOn||!this.session.passes.length}toggleRecord(){this.setRecord(!this.recOn)}setRecord(t){if(!t&&this.voiceJob&&this.voiceJob.phase!=="after"&&(this.cancelVoice(!0),!this.recOn)||t===this.recOn)return;if(t&&this.rec.full){this.notice=`${te} passes: delete one to record.`,this.changed(!1);return}if(this.recOn=t,this.notice="",!t&&this.listening&&this.session.passes.length){this.stopListening(),this.recent=[],this.jam();return}if(!(this.jamming&&this.transport.running)){this.changed(!1);return}const s=this.beatNow();if(!t&&this.countedIn&&s<this.rec.b0-1e-9){this.playNow(s);return}if(t){const{lap:i,tick:r}=this.rec.place(s);this.rec.recordFrom(s<this.rec.b0?0:r<z?i:i+1),this.changed(!1);return}if(!this.rec.records(this.rec.place(s).lap)){this.rec.recordNone(),this.changed(!1);return}const o=this.rec.punchOut(s);this.replayChanged(),this.changed(o.length>0)}playNow(t){try{this.deps.countIn?.clear("looper")}catch{}this.begin(this.countFrom,!1,t),this.changed(!1)}played(t,n){for(const l of n)l.type==="voice"&&this.voiceNews(t,l);const s=n.some(l=>l.type==="voice")?n.filter(l=>l.type!=="voice"):n;if(!s.length)return;const o=this.voiceJob;if(!this.jamming&&o&&o.lucy===t&&s.some(l=>l.type==="take")){this.voiceTake(t,s.filter(l=>l.type==="take"));return}for(const l of s)l.type==="note"&&l.on&&l.pattern&&!l.stopped&&this.markLive(t,l.beat);const i=this.deps.now();if(this.starting){this.starting.lead.push({source:t,events:s,at:i});return}if(this.listening){this.keepRecent(t,s,i);return}if(!this.jamming)return;const r=this.snap?this.snapPlayed(t,s,i):s;this.snap&&i>this.snap.until&&(this.snap=null),r.length&&this.record(t,r)}keepRecent(t,n,s){const o=this.transport.running?this.beatNow():null;this.recent.push({source:t,events:n,at:s}),o!==null&&(this.recent=this.recent.filter(i=>i.events.some(r=>r.beat>=o-Vc))),this.recent.length>256&&this.recent.splice(0,this.recent.length-256)}record(t,n){let s=!1;if(this.replay)for(const i of n)i.type==="param"&&this.replay.hand(t,i.param,i.beat)&&(s=!0);const o=this.rec.played(t,n);if(this.rec.amended){this.rec.amended=!1,this.changed();return}s&&!o.length&&this.changed(!1),this.voiceAdded(t,o),o.length&&this.changed(o.some(i=>i.ev.kind==="take"))}voiceView(t){const n=this.voiceJob;if(!n)return null;const s=Math.max(1,Math.round(n.lengthBeats/D));let o=null,i=null;return n.phase==="recording"&&t!==null&&Number.isFinite(n.beat)?(o=Math.max(0,Math.min(1,(t-n.beat)/n.lengthBeats)),i=Math.min(s,Math.floor((t-n.beat)/D)+1)):n.phase==="after"&&(o=n.cutAt??1),{phase:n.phase,n:n.n,bar:i,bars:s,peaks:n.peaks,pos:o,lucy:n.lucy,from:this.rec.lapStart,ticks:this.rec.lapTicks}}get voicing(){return this.voiceJob!==null}voicePass(t){if(this.voiceJob)return!1;const n=this.deps.host;if(!n?.studioTransport||!n.clock)return this.notice="Jam works inside the Studio.",this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.rec.full)return this.notice=`${te} passes: delete one to record.`,this.changed(!1),this.tellVoice(t,{state:"cancel",beat:0}),!1;if(this.waiting&&this.cancelWait(),this.voiceJob={lucy:t,phase:"starting",lap:-1,beat:Number.NaN,lengthBeats:this.rec.lapBeats,n:this.nextPassNumber(),peaks:[],until:0,cutAt:null},this.notice="",!this.jamming&&!this.wantJam)return this.jam(),!0;if(this.wantJam||!this.transport.running)return this.changed(!1),!0;const s=this.beatNow();let o=s<this.rec.b0?0:this.rec.place(s).lap+1;return this.transport.timeAt(this.rec.beatOf(o,0))-this.deps.now()<_c&&o++,this.armVoice(o),!0}nextPassNumber(){return this.session.passes.reduce((t,n)=>Math.max(t,n.n),0)+1}armVoice(t){const n=this.voiceJob;n&&(n.lap=t,n.beat=this.rec.beatOf(t,0),n.lengthBeats=this.rec.lapBeats,n.n=this.nextPassNumber(),n.phase="armed",this.rec.voiceLap=t,this.rec.voiceCut=null,this.tellVoice(n.lucy,{state:"armed",beat:n.beat,lengthBeats:n.lengthBeats,pass:n.n}),this.changed(!1))}cancelVoice(t=!0){const n=this.voiceJob;n&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,t&&this.tellVoice(n.lucy,{state:"cancel",beat:Number.isFinite(n.beat)?n.beat:0}),this.changed(!1))}tellVoice(t,n){try{this.deps.sink?.controls(t,[{type:"voice",id:`vp${++this.voiceSerial}`,...n}])}catch{}}voiceNews(t,n){const s=this.voiceJob;if(n.state==="ask"){this.voicePass(t);return}if(n.state==="undo"){this.undoVoice(t,n.take);return}!s||s.lucy!==t||(n.state==="cancel"?this.cancelVoice(!1):n.state==="recording"&&Array.isArray(n.peaks)?(s.peaks=n.peaks.slice(0,128),this.changed(!1)):n.state==="quiet"&&(this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="Too quiet: the voice loop was not kept.",this.changed(!1)))}voiceTake(t,n){const s=this.rec.played(t,n);this.voiceAdded(t,s),s.length&&this.changed(!0)}voiceAdded(t,n){const s=this.voiceJob;if(!s||s.lucy!==t)return;const o=n.find(r=>r.ev.kind==="take")?.ev;if(!o||o.kind!=="take")return;const i=this.session.passes.find(r=>r.events.includes(o));this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.notice="",this.tellVoice(t,{state:"added",beat:Number.isFinite(s.beat)?s.beat:0,take:o.take,...i?{pass:i.n}:{}})}undoVoice(t,n){const s=n?this.session.passes.find(i=>i.events.some(r=>r.kind==="take"&&r.take===n&&r.inst===t)):void 0;!s||!this.rec.undoPass(s)||(this.notice=`${s.name} undone.`,this.replayChanged(),this.changed(!0),this.tellVoice(t,{state:"undone",beat:0,take:n}))}voiceTick(t){const n=this.voiceJob;if(!n)return!1;if(n.phase==="armed"&&t!==null&&t>=n.beat&&(n.phase="recording"),n.phase==="recording"&&t!==null&&t>=n.beat+n.lengthBeats&&(n.phase="after",n.until=this.deps.now()+hs),n.phase==="after"&&this.deps.now()>n.until)return this.voiceJob=null,this.rec.voiceLap=null,this.rec.voiceCut=null,this.voiceKey="",!0;const s=t===null||!Number.isFinite(n.beat)?0:t-n.beat,o=`${n.phase}|${n.phase==="armed"?Math.ceil(-s-1e-9):n.phase==="recording"?Math.floor(s/D):""}`;return o===this.voiceKey?!1:(this.voiceKey=o,!0)}tick(){if(!this.jamming||!this.transport.running)return this.voiceJob?.phase==="after"&&this.voiceTick(null)?(this.changed(!1),!0):!1;const t=this.beatNow(),n=this.voiceTick(t);this.lastBeat=t;const{lap:s}=this.rec.place(t);let o=!1;const i=this.deps.load?.()==="over";i&&!this.rec.paused&&(this.rec.paused=!0,this.recOn&&(this.notice="Too busy to record. Playback carries on."),o=!0),s!==this.lastLap&&(this.lastLap=s,o=!0,!i&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const r=this.rec.seam(t),l=this.rec.beatOf(this.rec.recFrom,0)-t,c=this.recOn&&Number.isFinite(l)&&l>0?l>D?Math.ceil(l/D-1e-9)*100:Math.ceil(l-1e-9):-1;c!==this.armedKey&&(this.armedKey=c,o=!0);const d=this.rec.patternLive(t).reduce((f,w)=>f+w.events.length,0);d!==this.liveCount&&(this.liveCount=d,o=!0);const p=this.pending;if(p&&t>=p.seam){this.pending=null,this.voiceJob&&this.voiceJob.phase!=="after"&&this.voiceJob.phase!=="recording"&&this.cancelVoice(!0);const f=this.rec.lapStart,w=this.rec.place(t).lap;this.applyLoop(p.loop),this.rec.rebase(p.seam,w,f),this.replay?.rebase(p.seam),this.lastLap=-1,this.changed()}const h=this.transport.beatAt(this.deps.now()+ds),b=this.pending;if(b&&h>b.seam){this.replay?.pump(t,b.seam);const f=Yn({bars:this.session.song.bars,...b.loop?{loop:b.loop}:{}});this.replay?.pump(Math.max(t,b.seam),h,{b0:b.seam,lapStart:f.start,lapTicks:f.length})}else this.replay?.pump(t,h);return r.length?(this.changed(),!0):o||n}view(){const t=this.session,n=this.transport,s=this.jamming&&n.running?this.beatNow():null,o=s!==null&&!this.countedIn?Math.max(s,this.rec.b0):s,i=o===null?null:this.rec.place(o),r=o!==null&&o<this.rec.b0,l=t.passes.reduce((g,k)=>Math.max(g,k.n),0)+1,c=i&&!r?i.lap:null,d=this.voiceJob,p=d?.phase==="recording"&&c===d.lap,h=d?.phase==="armed"&&!r,b=h||!p&&this.recOn&&c!==null&&!this.rec.records(c),f=!this.recOn&&!p&&!h,w=o!==null&&!r&&!f&&!b&&!this.rec.paused&&!this.rec.full,v=this.deps.host?.studioTransport?.bpm(),u=this.waiting?"waiting":this.jamming?r?"count-in":f?"playing":b?"armed":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";let m=null;const y=h&&d?d.beat:this.rec.beatOf(this.rec.recFrom,0);if(b&&o!==null&&Number.isFinite(y)){const g=Math.max(0,y-o);m=g>D?{bars:Math.ceil(g/D-1e-9),beats:Math.ceil(g-1e-9)}:{bars:0,beats:Math.max(1,Math.ceil(g-1e-9))}}return{session:t,phase:u,jamming:this.jamming||this.wantJam,bar:i&&!r?Math.floor((this.rec.lapStart+i.tick)/(D*960))+1:null,songPos:i&&!r?(this.rec.lapStart+i.tick)/_(t.song):null,pendingLoop:this.pending?.loop,nextPass:l,waiting:this.waiting,countIn:r&&o!==null?Math.max(1,Math.ceil(this.rec.b0-o)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,voice:this.voiceView(o),livePatterns:w&&!p&&o!==null?this.rec.patternLive(o).map((g,k)=>({...g,n:l+k})):[],hands:o!==null&&i&&!r?this.handsAt(o):[],record:this.recOn||p||h,startOn:this.startApplies,recIn:m,recBar:Math.floor(this.rec.lapStart/(D*z))+1,canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof v=="number"&&Math.round(v)!==t.song.bpm?Math.round(v):null,notice:this.notice}}handsAt(t){if(!this.replay)return[];const n=_(this.session.song),s=i=>{const{tick:r}=this.rec.place(i);return Math.max(0,Math.min(1,(this.rec.lapStart+r)/n))},o=[];for(const i of this.replay.handsAt(t)){if(!i.pass)continue;const r=(this.rec.lapStart+this.rec.lapTicks)/n;o.push({pass:i.pass,inst:i.inst,param:i.param,from:s(i.from),to:r})}return o}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const s=Math.max(1,Math.min(Ue(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=s;else if(s>n.bars&&t.grow){n.bars=s;const o=_(n);for(const i of this.session.passes)i.endTick<o&&i.repeat===void 0&&(i.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.start==="wait"?n.start="wait":t.start==="count-in"&&delete n.start,t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let s=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),c=Math.max(l,Math.min(n.bars,Math.round(t.to)));s=l===1&&c===n.bars?null:{from:l,to:c}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(s),this.changed();return}const o=this.beatNow(),{lap:i}=this.rec.place(o),r=this.rec.beatOf(Math.max(i+1,0),0);this.pending={loop:s,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const s=this.pass(t);if(s){if(n.name!==void 0){const o=n.name.replace(/\s+/g," ").trim().slice(0,qe);s.name=o||`Pass ${s.n}`}if(n.kept!==void 0&&(s.kept=n.kept),n.mute!==void 0&&(s.mute=n.mute),n.solo!==void 0&&(s.solo=n.solo),n.volume!==void 0&&(s.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&s.endTick<_(this.session.song)&&(s.repeat=n.repeat),n.shift!==void 0){const o=Math.max(-_n,Math.min(_n,Math.round(n.shift)||0));o?s.shift=o:delete s.shift}n.quantize===null?delete s.quantize:n.quantize&&(s.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(o=>o.id===t);if(n<0)return null;const[s]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),s?{pass:s,index:n}:null}restorePass(t,n){const s=this.session.passes;return s.length>=te||s.some(o=>o.id===t.id)?!1:(s.splice(Math.min(Math.max(0,n),s.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(s=>s.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){(this.jamming||this.waiting)&&this.stop();const t=Po(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session.song.start&&(t.song.start=this.session.song.start),this.use(t),this.changed(),t}openSession(t){(this.jamming||this.waiting)&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,fa);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.recOn=t.passes.length===0,this.notice=""}get passCount(){return this.session.passes.length}get maxPasses(){return te}dispose(){this.stopListening();for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const ba=e=>e==="off"?"Off":e;function Kc(e){const t=e.quantize?.grid??"off";return`Song · ${t==="off"?"off":t}`}function ms(e,t){if(e==="song"){const n=t.quantize?.grid??"off";return`Q · Song ${n==="off"?"off":n}`}return`Q ${ba(e)}`}function Bo(e,t=!1){return[{value:"song",label:t?ms("song",e):Kc(e)},...Wt.map(n=>({value:n,label:t?ms(n,e):ba(n)}))]}const jo=()=>Gt.map(e=>({value:String(e),label:`${Math.round(e*100)}%`})),Ro=e=>e.quantize?.grid??"song",Oo=e=>!!e.quantize&&e.quantize.grid!=="off";function Ho(e,t,n){return n==="song"||!Wt.includes(n)?null:{grid:n,strength:e.quantize?.strength??t.quantize?.strength??1}}function _o(e,t){const n=Number(t);return!e.quantize||!Gt.includes(n)?null:{grid:e.quantize.grid,strength:n}}const Wc="netcomposer-looper",le="sessions",Gc="netcomposer.looper.current.v1",Jc=500;function Xc(e){return new Promise((t,n)=>{const s=e.open(Wc,1);s.onupgradeneeded=()=>{s.result.objectStoreNames.contains(le)||s.result.createObjectStore(le,{keyPath:"id"})},s.onsuccess=()=>t(s.result),s.onerror=()=>n(s.error)})}function fs(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Qc(e={}){const t=e.idb===void 0?gs(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?gs(()=>globalThis.localStorage):e.local,s=e.currentKey??Gc;let o=null;const i=()=>t?(o??=Xc(t),o):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=u=>{try{n?.setItem(s,u)}catch{}},h=async u=>{const g=(await i()).transaction(le,"readonly").objectStore(le).get(u);return new Promise((k,L)=>{g.onsuccess=()=>k(g.result),g.onerror=()=>L(g.error)})},b=u=>{const m=c.then(async()=>{const g=(await i()).transaction(le,"readwrite");u(g.objectStore(le)),await fs(g)});return c=m.catch(()=>{d++}),m.then(()=>!0,()=>!1)},f=async u=>{if(!t||!u)return null;try{const m=await h(u);return m===void 0?null:ga(m)}catch{return null}},w=u=>{const m=structuredClone(u);c=c.then(async()=>{const g=(await i()).transaction(le,"readwrite");g.objectStore(le).put(m),await fs(g),p(m.id)}).catch(()=>{d++})},v=()=>{l&&clearTimeout(l),l=null;const u=r;r=null,u&&w(u)};return{async load(){let u=null;try{u=n?.getItem(s)??null}catch{u=null}return u?f(u):null},get:f,setCurrent:p,async list(){if(!t)return[];v(),await c;let u=[];try{const g=(await i()).transaction(le,"readonly").objectStore(le).getAll();u=await new Promise((k,L)=>{g.onsuccess=()=>k(g.result),g.onerror=()=>L(g.error)})}catch{return[]}return ed(u)},async rename(u,m){const y=Un(m);if(!t||!y)return!1;v(),await c;let g;try{g=await h(u)}catch{return!1}return!g||typeof g!="object"?!1:b(k=>k.put({...g,name:y}))},async remove(u){return t?(r?.id===u&&(l&&clearTimeout(l),l=null,r=null),b(m=>m.delete(u))):!1},async adopt(u){const m=await f(u.id);if(m&&"session"in m&&Zc(m.session,u))return m.session;const y=m===null?structuredClone(u):{...structuredClone(u),id:qo(),name:Un(`${u.name} (scene)`)||u.name};if(!await b(k=>k.put(y)))throw new Error("not saved");return y},save(u,m=!1){if(r=u,m){v();return}l||(l=setTimeout(v,Jc))},async flush(){v(),await c},get failures(){return d}}}function Un(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,fa):""}function Zc(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function ed(e){const t=[];for(const s of e){if(!s||typeof s!="object")continue;const o=s;if(typeof o.id!="string"||!o.id)continue;const i=ga(s);if("session"in i){const r=i.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=o.song;t.push({id:o.id,name:Un(o.name)||"Untitled song",passes:Array.isArray(o.passes)?o.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof o.updatedAt=="string"?o.updatedAt:"",error:i.error})}}const n=s=>{const o=Date.parse(s.updatedAt);return Number.isNaN(o)?0:o};return t.sort((s,o)=>n(o)-n(s))}const td=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function nd(e,t=new Date){const n=new Date(e),s=n.getTime();if(Number.isNaN(s))return"";const o=t.getTime()-s;if(o>=0&&o<6e4)return"just now";if(o>=0&&o<36e5)return`${Math.floor(o/6e4)} min ago`;const i=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${i}`;if(l===1)return`yesterday ${i}`;const c=`${td[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?c:`${c}, ${n.getFullYear()}`}function ad(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],s=nd(e.updatedAt,t);return s&&n.push(s),n.join(" · ")}function gs(e){try{return e()??null}catch{return null}}const sd=4e3;function G(e,t={},...n){const s=document.createElement(e);for(const[o,i]of Object.entries(t))s.setAttribute(o,i);return s.append(...n),s}function od(e){const t=G("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=G("div",{class:"lp-songs-list",role:"none"}),s=G("div",{class:"lp-songs-msg",role:"status"});s.hidden=!0;const o=G("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,s,G("div",{class:"lp-songs-sep",role:"separator"}),G("div",{class:"lp-songs-note"},e.note)),i=G("span",{class:"lp-songs-wrap"},t,o);let r=null,l=null;const c=()=>i.hasAttribute("data-open"),d=A=>{s.textContent=A,s.hidden=!A},p=()=>[...n.querySelectorAll(".lp-song-main")],h=A=>A?.closest(".lp-song")??null,b=A=>[...A.querySelectorAll('[role="menuitem"]')],f=(A,x="main")=>{((A?n.querySelector(`.lp-song[data-song="${CSS.escape(A)}"]`):null)?.querySelector(`.lp-song-${x}`)??p()[0]??t).focus({preventScroll:!0})},w=()=>{if(!r)return;clearTimeout(r.timer);const A=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);A&&(A.textContent="Delete",A.removeAttribute("data-lp-ask")),r=null};async function v(A){const x=await e.list(),S=e.openId(),$=e.now?.()??new Date;w(),l=null,n.replaceChildren(...x.map(T=>{const M=T.id===S,F=`${ad(T,$)}${M?" · open":""}${T.error?" · doesn't open":""}`,N=G("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${T.id}`,"aria-label":`${T.name}, ${F}`},G("span",{class:"lp-song-name"},T.name),G("span",{class:"lp-song-sub"},F));M&&N.setAttribute("aria-current","true"),N.addEventListener("click",()=>void u(T));const P=G("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${T.id}`,"aria-label":`Rename ${T.name}`},"Rename");P.addEventListener("click",()=>m(T)),T.error&&(P.disabled=!0);const R=G("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${T.id}`,"aria-label":`Delete ${T.name}`},"Delete");R.addEventListener("click",()=>void y(T,R));const O=G("div",{class:"lp-song",role:"none","data-song":T.id},N,G("span",{class:"lp-song-acts",role:"none"},P,R));return M&&O.setAttribute("data-open",""),O})),x.length||n.append(G("div",{class:"lp-songs-empty"},"No songs yet.")),A&&f(A.id,A.part)}async function u(A){if(A.id===e.openId()){k(!0);return}const x=await e.open(A.id);if(x){d(x);return}k(!0)}function m(A){const x=n.querySelector(`.lp-song[data-song="${CSS.escape(A.id)}"]`),S=x?.querySelector(".lp-song-main"),$=S?.querySelector(".lp-song-name");if(!x||!S||!$)return;w(),l=A.id;const T=G("input",{class:"lp-name-input lp-song-input",value:A.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${A.id}`});T.value=A.name;let M=!1;const F=async N=>{if(M)return;M=!0,l=null;const P=T.value.replace(/\s+/g," ").trim();N&&P&&P!==A.name&&await e.rename(A.id,P),await v({id:A.id,part:"rename"})};T.addEventListener("keydown",N=>{N.stopPropagation(),N.key==="Enter"?(N.preventDefault(),F(!0)):N.key==="Escape"&&(N.preventDefault(),F(!1))}),T.addEventListener("blur",()=>void F(!0)),x.setAttribute("data-renaming",""),x.insertBefore(T,S),T.focus(),T.select()}async function y(A,x){if(r?.id!==A.id){w(),x.textContent="Press again to delete",x.setAttribute("data-lp-ask",""),r={id:A.id,timer:setTimeout(w,sd)};return}w();const S=p().findIndex(M=>h(M)?.dataset.song===A.id);await e.remove(A.id),await v();const $=p();($[Math.min(Math.max(S,0),$.length-1)]??t).focus({preventScroll:!0})}async function g(){c()||(i.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",L,!0)),d(""),await v({id:e.openId()})}function k(A=!1){c()&&(w(),i.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",L,!0),d(""),A&&t.focus({preventScroll:!0}))}function L(A){i.contains(A.target)||k()}return t.addEventListener("click",()=>c()?k():void g()),t.addEventListener("keydown",A=>{(A.key==="ArrowDown"||A.key==="ArrowUp")&&(A.preventDefault(),g().then(()=>{const x=p();(A.key==="ArrowUp"?x[x.length-1]:x[0])?.focus({preventScroll:!0})}))}),o.addEventListener("keydown",A=>{if(l)return;const x=p(),S=document.activeElement,$=h(S),T=x.findIndex(F=>h(F)===$);let M;if(A.key==="ArrowDown")M=x[(T+1)%x.length];else if(A.key==="ArrowUp")M=x[(T-1+x.length)%x.length];else if(A.key==="Home")M=x[0];else if(A.key==="End")M=x[x.length-1];else if(A.key==="ArrowRight"||A.key==="ArrowLeft"){if(!$)return;const F=b($).filter(R=>!R.disabled),N=F.indexOf(S),P=A.key==="ArrowRight"?1:-1;M=F[Math.min(F.length-1,Math.max(0,N+P))]}else if(A.key==="Escape"){A.preventDefault(),A.stopPropagation(),k(!0);return}else if(A.key==="Tab"){k(!1);return}else return;A.preventDefault(),M?.focus({preventScroll:!0})}),{el:i,button:t,open:g,close:k,isOpen:c,async refresh(){c()&&!l&&await v()}}}const Vo=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let Be;function id(){if(Be!==void 0)return Be;Be=null;try{Be=Vo()?.attach("looper",{instance:1})??null}catch{Be=null}return Be}function rd(){return Vo()?.countIn??null}function ld(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const cd="netcomposer.looper.hidden.v1",dd=50;function E(e,t={},...n){const s=document.createElement(e);for(const[o,i]of Object.entries(t))i!==void 0&&s.setAttribute(o,i);for(const o of n)o!==null&&o!==!1&&s.append(o);return s}const V=e=>({[pt]:ha(e)||void 0});function K(e,t,n){const s=E("button",{type:"button",...t},e);return s.addEventListener("click",n),s}function ze(e,t){return E("span",{class:"nc-label",...t?V(t):{}},e)}function Yo(e,t,n,s,o,i=!1){const r=E("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=K(l.label,{role:"radio","aria-checked":String(l.value===s),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==s&&o(l.value)});c.disabled=i,r.append(c)}return r}function Kn(e,t,n,s,o,i="lp-toggle"){return K(t,{class:i,"aria-pressed":String(n),"data-lp-id":e,...V(s)},o)}function ya(e,...t){const n=document.activeElement,s=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(o=>!!o)),s&&e.querySelector(`[data-lp-id="${CSS.escape(s)}"]`)?.focus({preventScroll:!0})}function Uo(e,t,n){const s=E("div",{class:"lp-body","data-lp-module":e}),o=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=$c(o(),cd),r=()=>{const l=i.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==s&&l.after(s)};return r(),{handle:i,mount:s,update(){i.update(o()),r()}}}const U=id(),X=Qc({currentKey:U?.storageKey?.("netcomposer.looper.current.v1")}),je=await X.load();let Ko="",Wn;je&&"session"in je?Wn=je.session:(je&&"error"in je&&(Ko=`Your last song didn't open: ${je.error}. A new one is started.`),Wn=Po(U?.studioTransport?.bpm()??120));function pd(){let e=null;try{e=U?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,s=o=>{n.has(o)||(n.add(o),t.setTarget(o,{role:"chord",on:!0,layer:!0}))};return{send(o,i){s(o),t.send(i,o)},controls(o,i){s(o),t.sendControls(i,o)},laps(o){let i=[];try{i=(U?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{i=[]}for(const r of i)s(r),t.sendControls(o,r)},off(o){t.off(o===void 0?"stop":"restart",o)},release(o,i){n.has(o)&&t.release?.(i,o)},restart(){t.restart()}}}const C=new Uc(Wn,{host:U,countIn:rd(),load:ld,now:fi,save:e=>X.save(e),sink:pd()});C.notice=Ko;addEventListener("pagehide",()=>X.save(C.session,!0));let ut=null;const Wo=document.getElementById("app");Wo.classList.add("nc","nc-page");fc();const Go=E("header",{class:"nc-page-hd"},E("div",{},E("h1",{class:"nc-page-title"},E("span",{class:"lp-brand"},"LUPA")," ",E("span",{class:"nc-page-sep"},"/")," LOOPER ",E("span",{class:"nc-page-sep"},"/")," ",E("span",{class:"nc-mono"},"01")),E("p",{class:"nc-page-sub"},"A TRIKI instrument.")),E("div",{class:"nc-page-actions"},fd(),K("New song",{class:"nc-page-action","data-lp-id":"new-song",...V("new-song")},()=>hd()))),Jo=E("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),Xo=E("footer",{class:"lp-foot lp-sub"},E("span",{class:"lp-notice",role:"status"}),E("span",{class:"lp-mono"},"netcomposer.looper.01"));Wo.append(Go,E("main",{class:"nc-page-body"},Jo),Xo);let Re=null;function ud(){return Go.querySelector('[data-lp-id="new-song"]')}function gn(e){const t=ud();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function hd(){if(C.passCount&&!Re){gn(!0),Re=setTimeout(()=>{Re=null,gn(!1)},4e3);return}Re&&clearTimeout(Re),Re=null,gn(!1),Qo(),C.notice="New song started. The last one stays in Songs.",Q()}function Qo(){C.newSong(),Ie=null,J="all"}function md(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function fd(){return ut=od({list:()=>X.list(),openId:()=>C.session.id,open:bs,async rename(e,t){e===C.session.id?C.rename(t):await X.rename(e,t)},async remove(e){if(e===C.session.id){C.jamming&&C.stop(),await X.flush();const t=(await X.list()).find(s=>s.id!==e&&!s.error);(t?await bs(t.id):"no song")&&Qo(),C.notice="Song deleted."}await X.remove(e),Q()},note:U?`Songs save as you play, in this browser. Save the Studio’s scene (${md()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),ut.el}async function bs(e){if(C.jamming)return"Stop jamming to open another song.";await X.flush();const t=await X.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(C.openSession(t.session),X.setCurrent(t.session.id),Ie=null,J="all",C.notice=`“${t.session.name}” is open.`,Q(),null):"That song isn't in this browser any more."}function gd(){ut?.button.setAttribute(pt,ha("songs").replace("{name}",C.session.name))}const Zo=E("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),we=U?.metronome,ei=ic({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((we?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>we?.set({volume:e/100})});ei.el.setAttribute(pt,ha("volume"));we?.onChange(()=>Q());function Ke(e,t,n,s,o,i=!1,r){const l=E("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e,...r?V(r):{}});for(const c of n){const d=E("option",{value:c.value},c.label);c.value===s&&(d.selected=!0),l.append(d)}return l.disabled=i,l.addEventListener("change",()=>o(l.value)),E("span",{class:"lp-dd"},l)}let ye=null;function bd(e){if(ye===null)return null;const t=e.session.song,n=ye*D*z,s=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),o=s.length?Math.max(...s.map(l=>Math.floor(n/l.endTick))):ye/t.bars,i=l=>{const c=ye;ye=null,l&&c&&C.setSong({bars:c,grow:l}),Q()},r=s.length;return E("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},E("span",{class:"lp-ask-title"},`Grow to ${ye} bars?`),E("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),K(`Repeat ×${Math.max(2,Math.round(o))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>i("repeat")),K("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>i("once")),K("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>i(null)))}function yd(e){const t=e.session.song,n=t.start==="wait",s=!e.startOn,o=s?E("span",{class:"lp-sub","data-lp-id":"start-sub"},"Play starts at once. Count-in and Wait apply when recording."):n?E("span",{class:"lp-sub","data-lp-id":"start-sub"},"Jam waits for the first sound from any instrument."):E("span",{class:"lp-sub lp-start-sub","data-lp-id":"start-sub"},t.countInBars?"One bar of clicks first. ":"No count-in: Pass 1 starts with the clock. ",K(t.countInBars?"Off":"On",{class:"lp-loop-off","data-lp-id":"count-in",...V("count-in")},()=>C.setSong({countInBars:t.countInBars?0:1})));return E("div",{class:"lp-field lp-start","data-lp-id":"start-field",...s?{"data-off":""}:{}},ze("Start",s?"start-off":"start"),Yo("start","Start",[{value:"count-in",label:"Count-in"},{value:"wait",label:"Wait"}],n?"wait":"count-in",i=>C.setSong({start:i==="wait"?"wait":"count-in"}),s||e.jamming||e.waiting),o)}function wd(e){const t=e.session.song,n=[1,2,4,8,16].filter(o=>o<=Ue(t.bpm)&&(!e.locked||o>=t.bars)),s=t.quantize;ya(Zo,E("h3",{class:"lp-section-title"},"Setup"),E("div",{class:"lp-field"},ze("Tempo","tempo"),E("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?E("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?E("span",{class:"lp-sub"},"Locked: the song has passes."):E("span",{class:"lp-sub"},"Follows the Studio.")),E("div",{class:"lp-field"},ze("Length","bars"),Yo("bars","Bars",n.map(o=>({value:String(o),label:String(o)})),String(ye??t.bars),o=>{const i=Number(o);e.locked&&i>t.bars?(ye=i,Q()):C.setSong({bars:i})},e.jamming),bd(e)??E("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${zc(t)}`)),yd(e),we?E("div",{class:"lp-row lp-toggles"},Kn("metronome","Metronome",we.prefs().on,"metronome",()=>we.set({on:!we.prefs().on}))):null,we?ei.el:null,E("div",{class:"lp-pair"},E("label",{class:"lp-field"},ze("Quantize","quantize"),Ke("quantize","Quantize",Wt.map(o=>({value:o,label:ba(o)})),s?.grid??"off",o=>C.setSong({quantize:o==="off"?null:{grid:o,strength:s?.strength??1}}))),E("label",{class:"lp-field"},ze("Strength","strength"),Ke("strength","Strength",Gt.map(o=>({value:String(o),label:`${Math.round(o*100)}%`})),String(s?.strength??1),o=>s&&C.setSong({quantize:{grid:s.grid,strength:Number(o)}}),!s))))}const ti=Uo("jam","Jam",()=>{const e=C.view(),t=e.session.song.loop,n=t?`loop ${We(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${C.passCount} / ${te} passes`});function We(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const vd="http://www.w3.org/2000/svg",j=(e,t)=>{const n=document.createElementNS(vd,e);for(const[s,o]of Object.entries(t))n.setAttribute(s,o);return n},ht=44,Gn=2*Math.PI*ht,ni=j("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),ai=j("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(ht),"stroke-width":"3","stroke-dasharray":`0 ${Gn}`,transform:"rotate(-90 50 50)"}),Lt=j("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"}),si=j("circle",{class:"lp-ring-mark",cx:"50",cy:"6",r:"3.2"});ni.append(j("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(ht),"stroke-width":"1"}),ai,Lt,si);function Ae(e=!1){return E("span",{class:"lp-dot","aria-hidden":"true",...e?{"data-armed":""}:{}})}function ke(e){const t=e.recIn;return t?t.bars?`${t.bars} bar${t.bars===1?"":"s"}`:`${t.beats} beat${t.beats===1?"":"s"}`:""}const ys=e=>e.phase==="armed"||e.record&&(e.phase==="idle"||e.phase==="waiting"||e.phase==="count-in"),oi=E("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Ct=E("span",{class:"lp-pass","data-lp-id":"pass"}),xd=E("div",{class:"lp-ring"},ni,E("div",{class:"lp-ring-mid"},oi,Ct));function ii(e){const t=e.lapPos??0;ai.setAttribute("stroke-dasharray",`${t*Gn} ${Gn}`);const n=t*2*Math.PI;Lt.setAttribute("cx",String(50+ht*Math.sin(n))),Lt.setAttribute("cy",String(50-ht*Math.cos(n))),Lt.style.visibility=e.lapPos===null?"hidden":"visible";const s=e.session.song.loop;oi.textContent=e.countIn!==null?String(e.countIn):s?e.bar!==null?`${e.bar} · ${We(s)}`:We(s):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const o=e.phase==="waiting"?e.record?`WAITING · PASS ${e.nextPass}`:"WAITING":e.phase==="count-in"?"COUNT-IN":e.phase==="playing"?"PLAYING":e.phase==="armed"?e.recIn&&!e.recIn.bars?`IN ${e.recIn.beats}`:`IN ${ke(e).toUpperCase()}`:e.phase==="full"?`FULL · ${te} / ${te}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":e.record?`PASS ${e.nextPass}`:"PLAY",i=ys(e)&&e.phase!=="count-in",r=`${o}|${e.phase}|${i}`;Ct.dataset.key!==r&&(Ct.dataset.key=r,Ct.replaceChildren(...e.phase==="recording"?[Ae()]:i?[Ae(!0)]:[],o)),si.style.visibility=ys(e)?"visible":"hidden"}function $d(e){const t=E("div",{class:"nc-seg lp-mode",role:"radiogroup","aria-label":"Play or Record","data-lp-id":"mode"}),n=e.session.passes.length>=te,s=e.phase==="recording"||e.phase==="paused"||e.phase==="full",o=(i,r,l)=>{const c=E("button",{type:"button",role:"radio","aria-checked":String(i),"data-lp-id":`mode-${r}`,...V(r==="record"&&n&&!i?"mode-full":`mode-${r}`)},...l);return c.addEventListener("click",()=>C.setRecord(r==="record")),r==="record"&&n&&!i&&(c.disabled=!0),c};return t.append(o(!e.record,"play",["Play"]),o(e.record,"record",[...s&&e.record?[Ae()]:e.record?[Ae(!0)]:[],"Record"])),e.voice&&(e.voice.phase==="armed"||e.voice.phase==="recording")?E("div",{class:"lp-mode-box"},t,E("p",{class:"lp-mode-note","data-lp-id":"mode-note"},"For this loop only")):t}function kd(e){const t=(i,r)=>E("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},E("b",{},i),r?` ${r}`:""),n=e.session.song.start==="wait",s=`bar ${e.recBar}`,o=e.voice;return o?.phase==="recording"?t("Recording a voice pass from LUCY.","Back to Play by itself after this loop."):o?.phase==="armed"?t(`A voice pass from LUCY, in ${ke(e)||"a moment"}.`,"It records one loop, then Lupa is back in Play."):o?.phase==="starting"?t("A voice pass from LUCY.","Lupa counts in, then records one loop."):e.waiting?e.record?t("Play anything, on any instrument.",`Pass ${e.nextPass} starts on that beat. Press again to cancel.`):t("Play anything, on any instrument.","The loop starts on that beat. Press again to cancel."):e.jamming?e.phase==="playing"?t("Playing. Nothing is recorded.",`Shift+Space records from ${s}.`):e.phase==="armed"?t(`Recording from ${s}, in ${ke(e)}.`,"Press Record again to cancel."):e.phase==="recording"?t("Recording every lap.","Play (Shift+Space) stops recording now. This lap is kept."):null:e.session.passes.length?e.record?n?t("Record is on.",`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):t("Record is on.",e.session.song.countInBars?`Jam counts in, then Pass ${e.nextPass} records from ${s}.`:`Jam starts, and Pass ${e.nextPass} records from ${s}.`):t("Play.","Jam plays the loop at once. Nothing is recorded. Shift+Space turns Record on."):n?E("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):null}function Ed(e){const t=e.session.song.start==="wait",n=K(e.waiting?"WAITING":e.jamming?"STOP":"JAM",{class:e.waiting?"nc-btn lp-big lp-waiting":"nc-btn lp-big","data-lp-id":"jam",...V(e.waiting?"waiting":e.jamming?"stop":t&&e.startOn?"jam-wait":"jam"),...e.jamming||e.waiting?{}:{"data-jam":""},...e.waiting?{"aria-pressed":"true"}:{}},()=>C.toggle());n.disabled=!U;const s=K("UNDO",{class:"nc-btn","data-lp-id":"undo",...V("undo")},()=>C.undo());s.disabled=!e.lapHasNotes&&!C.passCount;const o=K("REDO",{class:"nc-btn","data-lp-id":"redo",...V("redo")},()=>C.redo());o.disabled=!e.canRedo,ii(e);const i=e.session.song.loop,r=e.pendingLoop,l=r!==void 0?E("p",{class:"lp-sub","data-lp-id":"loop-next"},r?`Loop ${We(r)} from the next lap.`:"Loop off from the next lap."):null,c=i&&r===void 0?E("div",{class:"lp-loop-line"},E("span",{},`Loop ${We(i)}`),K("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...V("loop-off")},()=>C.setLoop(null))):null;ya(ti.mount,E("div",{class:"lp-jam-stack"},xd,$d(e),n,E("div",{class:"lp-two"},s,o),c,l,U?kd(e):E("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),Zo)}const Jt=Uo("passes","Passes",()=>`${C.passCount} / ${te}`);let Ie=null,J="all",kt={at:0,bar:0};const Ad={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},Ge={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},Je=e=>e.split("#")[0]??e,Sd=e=>Ge[Je(e)]?.noun[0]==="hit",wa=e=>e.kind===void 0||e.kind==="note";function Ee(e){const[t=e,n]=e.split("#"),s=Ad[t]??t.toUpperCase();return n?`${s} ${n}`:s}function Md(e,t){const n=new Map;for(const o of e.events)o.inst===t&&wa(o)&&o.name&&n.set(o.name,(n.get(o.name)??0)+1);const s=[...n].sort((o,i)=>i[1]-o[1]).map(([o])=>o);return s.length?s.length===1?s[0]:`${s[0]} +${s.length-1}`:""}function Jn(e,t){let n=0,s=0,o=0;for(const c of e.events)c.inst===t&&(c.kind==="slot"?s++:c.kind==="take"?o++:wa(c)&&n++);const[i,r]=Ge[Je(t)]?.noun??["note","notes"],l=[];return o&&l.push(o===1?"voice":`${o} takes`),n&&l.push(`${n} ${n===1?i:r}`),s&&l.push(`${s} slot ${s===1?"change":"changes"}`),l.join(" · ")||"nothing"}const gt=new Map,Td=1;function Xt(e,t){const n=t.bars,s=z,o=_(t),i=rt(e,t),r=lt(e,t),l=i.length>1?e.endTick:o,c=M=>r&&M+r>=l?M+r-l:M+r,d=t.loop,p=d?(d.from-1)*D*z:0,h=d?d.to*D*z:o,b=(M,F)=>(F>0?.45:1)*(M>=p-Kt&&M<h?1:.35),f=1e3,w=34,v=j("svg",{class:"lp-strip",viewBox:`0 0 ${f} ${w}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&v.append(j("rect",{class:"lp-strip-loop",x:String(p/o*f),y:"0",width:String((h-p)/o*f),height:String(w)}));const u=n*D;for(let M=1;M<u;M++){const F=String(M*f/u);M%D!==0&&n>8||v.append(M%D===0?j("line",{class:n>8&&M%(4*D)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:F,x2:F,y1:"0",y2:String(w)}):j("line",{class:"lp-strip-beat",x1:F,x2:F,y1:String(w/2-2),y2:String(w/2+2)}))}const m=e.events.filter(wa),y=[],g=s/4*Td,k=new Set(m.filter(M=>Sd(M.inst)).map(M=>M.inst)),L=new Map,A=[...new Set(m.filter(M=>k.has(M.inst)).map(M=>M.note))].sort((M,F)=>F-M);A.length>=2&&A.length<=4&&A.forEach((M,F)=>L.set(M,F));const x=m.filter(M=>!k.has(M.inst)).map(M=>M.note);let S=Math.min(...x)-2,$=Math.max(...x)+2;if($-S<12){const M=($+S)/2;S=M-6,$=M+6}for(const M of i)for(const F of m){const N=M+c(F.at);if(N>=o||F.at>=e.endTick)continue;const P=N/o*f,R=((.35+.65*F.vel)*b(N,M)).toFixed(2);if(k.has(F.inst)){const O=L.get(F.note);let I,q;if(O===void 0){const B=4+F.vel*9;I=w/2-B,q=w/2+B}else{const B=6+O*(w-12)/Math.max(1,L.size-1);I=B-3,q=B+3}v.append(j("line",{class:"lp-strip-hit",x1:P.toFixed(1),x2:P.toFixed(1),y1:I.toFixed(1),y2:q.toFixed(1),"stroke-opacity":R})),y.push(N/o,Math.min(1,(N+g)/o))}else{const O=Math.min(o,N+Math.max(1,F.len))/o*f,I=(4+(1-(F.note-S)/($-S))*(w-8)).toFixed(1);v.append(j("line",{class:"lp-strip-note",x1:P.toFixed(1),x2:Math.max(P+.1,O-2).toFixed(1),y1:I,y2:I,"stroke-opacity":R})),y.push(N/o,Math.min(1,(N+Math.max(g,F.len))/o))}}const T=M=>r?[{base:M+r,lo:M,hi:M+l},{base:M+r-l,lo:M,hi:M+l}]:[{base:M,lo:M,hi:o}];for(const M of i)for(const F of T(M))for(const N of e.events){if(N.kind!=="take")continue;const P=F.base+N.at,R=Math.min(o,P+N.len,F.base+e.endTick,F.hi),O=Math.max(P,F.lo);if(O>=o||R<=O)continue;const I=O/o*f,q=R/o*f,B=N.peaks?.length?N.peaks:[.35,.35],he=Math.floor((O-P)/N.len*(B.length-1)),de=Math.ceil((R-P)/N.len*(B.length-1)),me=B.slice(Math.max(0,he),Math.max(he+2,de+1)),Se=me.length>=2?me:[.35,.35],Qe=Se.length,Ze=w/2,ui=Me=>Math.max(.6,Me*(w/2-2)),xa=Se.map((Me,et)=>[I+(q-I)*et/Math.max(1,Qe-1),ui(Me)]),hi=xa.map(([Me,et])=>`${Me.toFixed(1)},${(Ze-et).toFixed(1)}`),mi=[...xa].reverse().map(([Me,et])=>`${Me.toFixed(1)},${(Ze+et).toFixed(1)}`);v.append(j("path",{class:"lp-strip-voice",d:`M${hi.join(" L")} L${mi.join(" L")} Z`,opacity:b(O,M).toFixed(2)})),y.push(O/o,Math.min(1,(O+N.len)/o))}for(const M of i)for(const F of e.events){if(F.kind!=="slot"||M+c(F.at)>=o)continue;const N=((M+c(F.at))/o*f).toFixed(1);v.append(j("line",{class:"lp-strip-slot",x1:N,x2:N,y1:"0",y2:String(w)}))}if(e.endTick<o&&!e.repeat){const M=(c(e.endTick)/o*f).toFixed(1);v.append(j("line",{class:"lp-strip-end",x1:M,x2:M,y1:"8",y2:String(w-8)}))}return gt.set(e.id,Float32Array.from(y)),v}function bn(e){if(e.length<=6)return e;const[t=e,n]=e.split(" ");return n?`${t.slice(0,6)} ${n.slice(0,3)}`:t.slice(0,3)}function ri(e){const[t,n]=e;return t?n?e.length===2?`${bn(t.label)} + ${bn(n.label)}`:`${bn(t.label)} + ${e.length-1}`:t.label:""}function Ld(e){const t=e.knobs??[],n=E("span",{class:"lp-knob-tag","aria-label":`Knobs: ${t.map(o=>o.label).join(", ")}`,...V("knob-pass")},ri(t)),s=j("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return s.append(j("circle",{cx:"5",cy:"5",r:"4",fill:"none",stroke:"currentColor"}),j("line",{x1:"5",y1:"5",x2:"5",y2:"1.5",stroke:"currentColor"})),n.prepend(s),n}function li(){const e=E("span",{class:"lp-knob-tag lp-pattern-tag","data-lp-pattern":"",...V("pattern-pass")},"Pattern"),t=j("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return t.append(j("rect",{x:"0.5",y:"0.5",width:"4",height:"4",fill:"currentColor"}),j("rect",{x:"5.5",y:"0.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),j("rect",{x:"0.5",y:"5.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),j("rect",{x:"5.5",y:"5.5",width:"4",height:"4",fill:"currentColor"})),e.prepend(t),e}function Cd(e,t,n){const s=Xt({...e,events:[]},t),o=1e3,i=34,r=_(t),l=rt(e,t),c=lt(e,t),d=l.length>1?e.endTick:r,p=f=>((1-f)*(i-4)+2).toFixed(1),h=f=>(f/r*o).toFixed(1);s.setAttribute("aria-label",`${ri(e.knobs??[])} across the loop`),n&&s.append(j("rect",{class:"lp-strip-hand",x:(n.from*o).toFixed(1),y:"0",width:(Math.max(0,n.to-n.from)*o).toFixed(1),height:String(i)}));const b=[];if((e.knobs??[]).forEach((f,w)=>{const v=se(f),u=e.events.filter(x=>x.kind==="param"&&se(x)===v&&x.at<e.endTick),m=x=>c&&x+c>=d?x+c-d:x+c,y=x=>{let S=l.length>1?x-Math.floor(x/d)*d:x;if(S-=c,S<0&&(S+=d),S>=e.endTick)return null;let $=f.base;for(const T of u){if(T.at>S)break;$=T.value}return $},g=new Set([0,r]);for(const x of l){g.add(x),g.add(Math.min(r,x+d)),g.add(Math.min(r,x+e.endTick)),g.add(x+m(0));for(const S of u)g.add(x+m(S.at))}const k=[...g].filter(x=>x>=0&&x<=r).sort((x,S)=>x-S),L=[];let A=[];for(let x=0;x<k.length-1;x++){const S=k[x],$=k[x+1];if($<=S)continue;const T=y(S);if(T===null){A.length&&L.push(A),A=[];continue}A.push([S,T],[$,T])}A.length&&L.push(A);for(const x of L){if(x.length<2)continue;const S=x.map(([$,T])=>`${h($)},${p(T)}`).join(" ");w===0&&s.append(j("polygon",{class:"lp-strip-area",points:`${h(x[0][0])},${i} ${S} ${h(x.at(-1)[0])},${i}`})),s.append(j("polyline",{class:`lp-strip-curve${w?" lp-strip-curve-2":""}`,points:S}))}for(const x of u)for(const S of l){const $=S+(x.at+c)%d;b.push($/r,Math.min(1,($+z/4)/r))}}),e.endTick<r&&!e.repeat){const f=((c&&e.endTick+c>=d?e.endTick+c-d:e.endTick+c)/r*o).toFixed(1);s.append(j("line",{class:"lp-strip-end",x1:f,x2:f,y1:"8",y2:String(i-8)}))}return gt.set(e.id,Float32Array.from(b)),s}function Et(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const Xe={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function va(e){const t=j("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(j("path",{d:e})),t}function Vt(e,t,n,s,o){const i=K("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...s},o);return i.append(va(n)),i}let ws=null;function Fd(e){Ie===e.id&&(Ie=null);const t=C.deletePass(e.id);if(!t)return;ws?.close();const n=uc({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>C.restorePass(t.pass,t.index),anchor:Jt.mount});n.el.setAttribute("data-lp-id","delete-toast"),ws=n}function Nd(e,t,n=null){const s=C.session.song,o=Vn(e),i=D*s.ppq,r=Ie===e.id,l=[...new Set(e.instruments)],c=K("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(r)},()=>{Ie=r?null:e.id,Q()}),d=E("span",{class:"lp-pass-line"},E("span",{class:"lp-pass-title"},e.name));for(const y of l)d.append(E("span",{class:"lp-inst","data-inst":Ge[Je(y)]?.token??""},Ee(y)));const p=[];for(const y of l){const g=Md(e,y);p.push(g?`${g} · ${Jn(e,y)}`:Jn(e,y))}l.length||p.push("Empty"),e.mute&&p.push("muted");const h=o?E("span",{class:"lp-pass-sub lp-knob-sub"},Ld(e),e.mute?E("span",{},"Muted"):null,n?E("span",{class:"lp-hand-note",...V("you-have-it")},"you have it"):null):e.pattern?E("span",{class:"lp-pass-sub lp-knob-sub"},E("span",{class:"lp-pass-sub-text"},p.join(" · ")),li()):E("span",{class:"lp-pass-sub"},p.join(" · "));c.append(E("span",{class:"lp-now","aria-hidden":"true"}),E("span",{class:"lp-pass-text"},d,h));const b=E("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...V("pass-volume")});b.value=String(Math.round(e.volume*100));const f=E("span",{class:"lp-db","data-lp-id":`db-${e.id}`},Et(e.volume));b.style.setProperty("--lp-fill",`${b.value}%`),b.setAttribute("aria-valuetext",Et(e.volume)),b.addEventListener("input",()=>{const y=Number(b.value)/100;f.textContent=Et(y),b.style.setProperty("--lp-fill",`${b.value}%`),b.setAttribute("aria-valuetext",Et(y)),C.editPass(e.id,{volume:y})});const w=E("div",{class:"lp-ms-pair"},Kn(`mute-${e.id}`,"M",e.mute,"mute",()=>C.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),Kn(`solo-${e.id}`,"S",e.solo,"solo",()=>C.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));w.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),w.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const v=Vt(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,Xe.star,{"aria-pressed":String(e.kept),...V("star")},()=>C.editPass(e.id,{kept:!e.kept})),u=Vt(`delete-${e.id}`,`Delete ${e.name}`,Xe.trash,V("delete"),()=>Fd(e)),m=E("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...r?{"data-open":""}:{}},c,E("div",{class:"lp-tools"},qd(e,s),Pd(e,s),w,E("div",{class:"lp-acts"},v,u)),E("div",{class:"lp-strip-box"},o?Cd(e,s,n):Xt(e,s),E("span",{class:"lp-head","aria-hidden":"true"})),o?E("div",{class:"lp-play"},E("div",{class:"lp-q","data-none":"","aria-hidden":"true"}),E("div",{class:"lp-vol","data-knob":"","aria-hidden":"true"})):E("div",{class:"lp-play"},zd(e,s),E("div",{class:"lp-vol"},b,f)));if(n&&m.setAttribute("data-hand",Ge[Je(l[0]??"")]?.token??""),r){const y=new Set;for(const L of e.events)y.add(Math.floor(L.at/i));const g=E("div",{class:"lp-bars",style:`--lp-bars: ${s.bars}`});for(let L=0;L<s.bars;L++)g.append(E("span",y.has(L)?{"data-on":""}:{},String(L+1)));const k=E("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});k.addEventListener("change",()=>C.editPass(e.id,{name:k.value})),m.append(E("div",{class:"lp-sheet"},k,E("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),E("span",{class:"lp-sub"},o?`Moves ${l.map(Ee).join(" and ")}'s ${(e.knobs??[]).map(L=>L.label).join(", ")}. Muted, they go back where they were.`:`Plays through ${l.map(Ee).join(" and ")||"its instrument"}'s current sound.`),o?null:Dd(e,s),g))}return m}function zd(e,t){const s=[Ke(`pq-${e.id}`,`${e.name} quantize`,Bo(t,!0),Ro(e),o=>C.editPass(e.id,{quantize:Ho(e,t,o)}),!1,"pass-quantize")];if(Oo(e)&&e.quantize){const o=Ke(`ps-${e.id}`,`${e.name} strength`,jo(),String(e.quantize.strength),i=>{const r=_o(e,i);r&&C.editPass(e.id,{quantize:r})},!1,"pass-strength");s.push(o)}return E("div",{class:"lp-q",role:"group","aria-label":`${e.name} quantize`,...e.quantize?{"data-own":""}:{}},...s)}function Dd(e,t){const n=Oo(e)&&e.quantize?e.quantize:null;return E("div",{class:"lp-pair lp-sheet-q"},E("label",{class:"lp-field"},ze("Quantize","pass-quantize"),Ke(`sq-${e.id}`,`${e.name} quantize`,Bo(t),Ro(e),s=>C.editPass(e.id,{quantize:Ho(e,t,s)}))),E("label",{class:"lp-field"},ze("Strength","pass-strength"),Ke(`ss-${e.id}`,`${e.name} strength`,jo(),String(e.quantize?.strength??t.quantize?.strength??1),s=>{const o=_o(e,s);o&&C.editPass(e.id,{quantize:o})},!n)))}function qd(e,t){const n=e.shift??0,s=Nc(e,t),o=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,i=d=>C.editPass(e.id,{shift:Math.max(-s,Math.min(s,n+d))}),r=Vt(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,Xe.earlier,n<=-s?{disabled:""}:{},()=>i(-1)),l=Vt(`shift-later-${e.id}`,`Move ${e.name} a bar later`,Xe.later,n>=s?{disabled:""}:{},()=>i(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return E("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${o(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...V("shift")},r,E("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function Pd(e,t){const n=_(t);if(e.endTick>=n)return E("span",{class:"lp-repeat-none","aria-hidden":"true"});const s=Math.ceil(n/e.endTick),o=!!e.repeat,i=Math.round(e.endTick/(D*z)),r=K(o?`×${s}`:"once",{class:"lp-repeat","aria-pressed":String(o),"aria-label":o?`${e.name} repeats every ${i} ${i===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...V("repeat")},()=>C.editPass(e.id,{repeat:!o}));return o&&r.prepend(va(Xe.loop)),r}function Id(e){const t=e.session.song,n=t.bars,s=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,o=E("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...V("ruler")}),i=E("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let m=1;m<=n;m++){const y=E("span",s&&m>=s.from&&m<=s.to?{"data-in":""}:{},String(m));r.push(y),i.append(y)}const l=E("div",{class:"lp-ruler-lane"});for(let m=1;m<n;m++)l.append(E("span",{class:"lp-ruler-tick",style:`--lp-at: ${m}`}));const c=E("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=m=>{c.hidden=!m,m&&(c.style.setProperty("--lp-from",String(m.from-1)),c.style.setProperty("--lp-to",String(m.to))),r.forEach((y,g)=>{m&&g+1>=m.from&&g+1<=m.to?y.setAttribute("data-in",""):y.removeAttribute("data-in")})};d(s);const p=E("span",{class:"lp-ruler-hint",role:"status"}),h="Drag across bars to repeat them";let b;const f=m=>{p.textContent=m,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(b),b=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=h,p.hidden=!!t.loop},3e3)},w=m=>{const y=E("button",{type:"button",class:"lp-loop-handle","data-end":m,"aria-label":m==="from"?"Loop start":"Loop end","data-lp-id":`loop-${m}`});return y.addEventListener("keydown",g=>{const k=t.loop;if(!k||g.key!=="ArrowLeft"&&g.key!=="ArrowRight")return;g.preventDefault();const L=g.key==="ArrowLeft"?-1:1,A={...k};m==="from"?A.from=Math.max(1,Math.min(k.to,k.from+L)):A.to=Math.min(n,Math.max(k.from,k.to+L)),C.setLoop(A)}),y.addEventListener("pointerdown",g=>{const k=s;k&&(g.stopPropagation(),u(g,L=>m==="from"?{from:Math.min(L,k.to),to:k.to}:{from:k.from,to:Math.max(L,k.from)}))}),y};c.append(w("from"),w("to"));const v=m=>{const y=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((m-y.left)/Math.max(1,y.width)*n)+1))},u=(m,y)=>{if(e.jamming&&!U){f("Stop jamming to change the loop");return}o.setPointerCapture?.(m.pointerId),o.setAttribute("data-dragging","");const g=v(m.clientX);let k=!1,L=y(g);d(L);const A=S=>{v(S.clientX)!==g&&(k=!0),L=y(v(S.clientX)),d(L)},x=()=>{o.removeEventListener("pointermove",A),o.removeEventListener("pointerup",x),o.removeEventListener("pointercancel",x),o.removeAttribute("data-dragging");for(const T of r)T.removeAttribute("data-hover");const S=performance.now();if(!k&&kt.bar===g&&S-kt.at<450){kt={at:0,bar:0},C.setLoop(null);return}if(kt=k?{at:0,bar:0}:{at:S,bar:g},L.from===1&&L.to===n&&!t.loop){d(void 0),f("That's the whole song. Pick fewer bars.");return}C.setLoop(L)};o.addEventListener("pointermove",A),o.addEventListener("pointerup",x),o.addEventListener("pointercancel",x)};return o.addEventListener("pointerdown",m=>{if(m.button!==0)return;const y=v(m.clientX);u(m,g=>({from:Math.min(y,g),to:Math.max(y,g)}))}),o.addEventListener("pointermove",m=>{if(o.hasAttribute("data-dragging"))return;const y=v(m.clientX);r.forEach((g,k)=>{k+1===y?g.setAttribute("data-hover",""):g.removeAttribute("data-hover")})}),o.addEventListener("pointerleave",()=>{for(const m of r)m.removeAttribute("data-hover")}),p.textContent=h,p.hidden=!!s||n<2,l.append(p,c),o.append(i,l),o}function Bd(e){if(e.length<2)return null;const t=new Map;for(const i of e)for(const r of new Set(i.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(i=>i.kept).length;J!=="all"&&J!=="starred"&&!t.has(J)&&(J="all"),J==="starred"&&!n&&(J="all");const s=(i,r,l,c={})=>{const d=K("",{class:"lp-chip","aria-pressed":String(J===i),"data-lp-id":`filter-${i}`,...c},()=>{J=J===i?"all":i,Q()});return d.append(r,E("span",{class:"lp-chip-n"},String(l))),d},o=E("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},s("all","All",e.length));for(const[i,r]of[...t].sort((l,c)=>Ee(l[0]).localeCompare(Ee(c[0]))))o.append(s(i,Ee(i),r,{"data-inst":Ge[Je(i)]?.token??""}));return n&&o.append(s("starred",va(Xe.star),n,{"aria-label":"Starred"})),o}function jd(e,t){const n=`Pass ${e.n}`,s={id:`live-${e.inst}`,n:e.n,name:n,endTick:_(t),instruments:[e.inst],events:e.events};return E("div",{class:"lp-pass-row lp-live","data-live":"","data-live-pattern":e.inst},E("span",{class:"lp-pass-name"},E("span",{class:"lp-dot","aria-hidden":"true"}),E("span",{class:"lp-pass-text"},E("span",{class:"lp-pass-line"},E("span",{class:"lp-pass-title"},n),E("span",{class:"lp-inst","data-inst":Ge[Je(e.inst)]?.token??""},Ee(e.inst))),E("span",{class:"lp-pass-sub lp-knob-sub"},E("span",{class:"lp-pass-sub-text"},`Recording · ${Jn(s,e.inst)}`),li()))),E("div",{class:"lp-strip-box"},Xt(s,t),E("span",{class:"lp-head","aria-hidden":"true"})))}function Rd(e,t){const n=t.session.song,s=`Pass ${e.n}`,o=_(n),i=e.peaks.length/128,r=Math.max(0,Math.min(1,e.pos??0)),l=Math.max(1,Math.round(e.ticks*Math.min(r||i,i||r))),c={id:"live-voice",n:e.n,name:s,endTick:o,instruments:[e.lucy],events:e.peaks.length>1?[{kind:"take",inst:e.lucy,take:"live",at:e.from,len:l,peaks:e.peaks}]:[]},d=Xt(c,n);if(gt.delete(c.id),e.pos!==null&&e.pos<1){const h=((e.from+e.ticks*e.pos)/o*1e3).toFixed(1);d.append(j("line",{class:"lp-strip-rec",x1:h,x2:h,y1:"0",y2:"34"}))}const p=e.phase==="armed"?`Next loop · in ${ke(t)||"a moment"}`:e.phase==="after"?"Saving the take…":`Recording… bar ${e.bar??1} of ${e.bars}`;return E("div",{class:"lp-pass-row lp-live lp-live-voice","data-live":"","data-live-pattern":"lucy","data-lp-id":"voice-row"},E("span",{class:"lp-pass-name"},e.phase==="armed"?Ae(!0):E("span",{class:"lp-dot","aria-hidden":"true"}),E("span",{class:"lp-pass-text"},E("span",{class:"lp-pass-line"},E("span",{class:"lp-pass-title"},s),E("span",{class:"lp-inst","data-inst":"lucy"},Ee(e.lucy))),E("span",{class:"lp-pass-sub","data-lp-id":"voice-sub"},p))),E("div",{class:"lp-strip-box"},d))}function vs(){try{return(U?.notesTargets?.()??[]).filter(e=>e.type==="lucy"&&e.takesNotes).map(e=>e.instance)}catch{return[]}}let Ft=!1;async function Od(){if(C.voicing){C.cancelVoice(!0);return}if(Ft||!U)return;let e=vs()[0];if(!e){let t=null;try{t=U.addInstrument?.({v:1,type:"lucy"})??null}catch{t=null}if(!t){C.notice="Add Audio (LUCY) to the Studio for a voice pass.",Q();return}Ft=!0,C.notice="LUCY is added. Allow the mic when it asks.",Q();try{U.showInstance?.(t)}catch{}const n=t,s=await new Promise(o=>{const i=Date.now()+2e4,r=()=>{vs().includes(n)?o(!0):Date.now()>i?o(!1):setTimeout(r,100)};r()});if(Ft=!1,!s){C.notice="LUCY didn't open in time. Press + Voice again.",Q();return}e=n}C.voicePass(e)}function Hd(e){if(!U)return null;const t=e.voice,n=!!t,s=t?.phase==="recording"?"Recording voice":t?.phase==="after"?"Saving voice":t?"Voice next loop":"Voice",o=K("",{class:"lp-voice","data-lp-id":"voice",...n?{"data-busy":""}:{},"aria-label":n?"Cancel the voice pass":"Record a voice pass: the next loop from LUCY's mic",...V(n?"voice-busy":"voice")},()=>void Od());return o.append(...t?.phase==="recording"?[Ae()]:t&&t.phase!=="after"?[Ae(!0)]:["+ "],s),(t?.phase==="after"||Ft)&&(o.disabled=!0),E("div",{class:"lp-voice-box"},o,E("div",{class:"lp-voice-help"},t&&t.phase!=="after"?"Press to cancel":"Next loop from LUCY's mic"))}function _d(e){const t=e.session.passes,n=t.some(p=>p.solo),s=t.filter(p=>J==="all"?!0:J==="starred"?p.kept:p.instruments.includes(J)),o=E("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&o.append(E("div",{class:"lp-pass-head"},Id(e)));const i=e.voice;if(i&&(i.phase==="recording"||i.phase==="after"||i.phase==="armed")?o.append(Rd(i,e)):e.phase==="recording"&&(e.lapHasNotes||!e.livePatterns.length)&&o.append(E("div",{class:"lp-pass-row lp-live","data-live":""},E("span",{class:"lp-pass-name"},E("span",{class:"lp-dot","aria-hidden":"true"}),E("span",{class:"lp-pass-text"},E("span",{class:"lp-pass-title"},`Pass ${e.nextPass+e.livePatterns.length}`),E("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),e.phase==="recording")for(const p of[...e.livePatterns].reverse())o.append(jd(p,e.session.song));const r=i?null:e.phase==="armed"?`Recording from bar ${e.recBar} · in ${ke(e)}`:e.record&&t.length&&(e.phase==="idle"||e.phase==="waiting")?e.session.song.start==="wait"?"Records from the first sound":e.session.song.countInBars?`Records from bar ${e.recBar} after the count-in`:`Records from bar ${e.recBar}`:e.record&&t.length&&e.phase==="count-in"?`Records from bar ${e.recBar} after the count-in`:null;r&&o.append(E("div",{class:"lp-pass-row lp-live","data-live":"","data-armed":""},E("span",{class:"lp-pass-name"},Ae(!0),E("span",{class:"lp-pass-text"},E("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),E("span",{class:"lp-pass-sub","data-lp-id":"armed-text"},r))))),gt.clear();const l=new Map;for(const p of e.hands){const h=l.get(p.pass);l.set(p.pass,h?{from:Math.min(h.from,p.from),to:Math.max(h.to,p.to)}:p)}for(const p of[...s].reverse())o.append(Nd(p,n,l.get(p.id)??null));!t.length&&e.phase!=="recording"?o.append(E("p",{class:"lp-sub","data-lp-id":"passes-empty"},e.waiting?"Waiting for the first sound.":"No passes yet. Press Jam (or Space) and play.")):t.length&&!s.length&&o.append(E("p",{class:"lp-sub"},"No passes here."));const c=t.filter(p=>!p.kept).length,d=K(`CLEAR UNSTARRED${c?` (${c})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...V("clear-unkept")},()=>C.clearUnkept());d.disabled=!c,ya(Jt.mount,E("div",{class:"lp-chiprow"},Bd(t)??E("span"),Hd(e)),o,t.length?E("div",{class:"lp-between"},E("span",{class:"lp-row"},d,E("span",{class:"lp-sub"},"Starred passes stay.")),E("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${te}`)):null),st=""}let st="";function Vd(e){const t=Jt.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),st){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");st=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const s=e.session.passes.some(l=>l.solo),o=[];for(const l of e.session.passes){if(l.mute||s&&!l.solo)continue;const c=gt.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){o.push(l.id);break}}}const i=o.join("|");if(i===st)return;st=i;const r=new Set(o);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const ci=[ti,Jt];kc(Jo,ci.map(e=>e.handle),"adjacent");let xs="";function di(e){const t=e.session.song.loop,n=e.bar===null?"":t?`Bar ${e.bar} · loop ${We(t)}`:`Bar ${e.bar} / ${e.session.song.bars}`,s=e.phase==="waiting"?"Lupa · waiting for the first sound":e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.phase==="playing"?`Lupa · Play · ${n}`:e.phase==="armed"?e.voice?`Lupa · voice pass in ${ke(e)}`:`Lupa · Rec from bar ${e.recBar} · in ${ke(e)}`:`Lupa · ${n} · Pass ${e.voice?.n??e.nextPass}`:null,o=s===null?null:e.phase==="armed"?"armed":e.phase==="recording"?"rec":null,i=`${s}|${e.phase}|${o}`;if(i!==xs){xs=i;try{U?.readout?.(s,o?{dot:o}:void 0),U?.chip?.(e.waiting?{text:"Waiting"}:e.jamming?e.phase==="playing"?{text:e.bar!==null?`Play · bar ${e.bar}`:"Play"}:e.phase==="armed"?{text:`Rec in ${ke(e)}`,armed:!0}:{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:C.passCount?{text:`${C.passCount} passes`}:null)}catch{}}}function Q(){const e=C.view();wd(e),Ed(e),_d(e);for(const n of ci)n.update();const t=Xo.querySelector(".lp-notice");t&&(t.textContent=e.notice),gd(),di(e)}C.onChange(Q);document.addEventListener("keydown",e=>{if(e.code!=="Space"||!e.shiftKey||e.metaKey||e.ctrlKey||e.altKey)return;const t=e.target;t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.tagName==="SELECT"||t.isContentEditable)||(e.preventDefault(),e.repeat||C.toggleRecord())});setInterval(()=>{C.tick()&&Q(),C.jamming||C.syncTempo()},dd);function pi(){const e=C.view();(e.jamming||e.waiting)&&(ii(e),di(e)),Vd(e),requestAnimationFrame(pi)}requestAnimationFrame(pi);Q();U?.providePreset?.({format:"nc-song-looper",version:ma,get:()=>structuredClone(C.session),async set(e){const t=ga(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;C.jamming&&C.stop(),await X.flush();const n=await X.adopt(t.session);C.openSession(n),X.setCurrent(n.id),Ie=null,J="all",C.notice=`“${n.name}” is open, from the Studio’s scene.`,Q(),ut?.refresh()}});window.__looper={looper:C,store:X,songs:()=>ut,view:()=>C.view(),get hosted(){return!!U}};
