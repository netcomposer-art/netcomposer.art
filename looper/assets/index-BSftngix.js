(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Xs(){return(performance.timeOrigin+performance.now())/1e3}var Js="nc-ui",Qs={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Hn={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},At={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},Zs={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},ye={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1],"toast-duration":5500},ei={light:{color:Qs.color,semantic:Hn,component:At,runtime:Zs},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},Je=e=>`--${Js}-${e}`,dn=Hn["label-on-fill-dark"],ca=Hn["label-on-fill-light"],ti=ye["label-min-contrast"],ni=/^#[0-9a-f]{6}$/i,ai=e=>typeof e=="string"&&ni.test(e),xt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function da(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),s=i=>{let r=(i+e/30)%12;return n-o*Math.max(-1,Math.min(r-3,9-r,1))};return`#${xt(s(0)*255)}${xt(s(8)*255)}${xt(s(4)*255)}`}function co(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),s=Math.max(t,n,o),i=Math.min(t,n,o),r=(s+i)/2,l=s-i;if(!l)return{h:0,s:0,l:r};let c=l/(1-Math.abs(2*r-1));return{h:((s===t?60*((n-o)/l%6):s===n?60*((o-t)/l+2):60*((t-n)/l+4))+360)%360,s:c,l:r}}function pa(e){let[t,n,o]=[1,3,5].map(s=>{let i=parseInt(e.slice(s,s+2),16)/255;return i<=.03928?i/12.92:((i+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function pn(e,t){let[n,o]=[pa(e),pa(t)].sort((s,i)=>i-s);return(n+.05)/(o+.05)}var St=e=>pn(e,dn)>=pn(e,ca)?dn:ca;function po(e,t,n,o=ti){let s=da(e,t,n),i=St(s)===dn?1:-1;for(let r=0;r<40&&pn(s,St(s))<o;r++)n+=i*.01,s=da(e,t,n);return s}function oi(e){let{h:t,s:n}=co(e),o=po(t,Math.min(n,ye["surprise-on-max-saturation"]),ye["surprise-on-lightness"]);return{fill:e,ink:St(e),on:o,onInk:St(o)}}var si=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function ii(e,t=Math.random){let[n,o]=ye["surprise-saturation"],[s,i]=ye["surprise-lightness"],r=ye["surprise-min-hue-gap"],l=ai(e)?co(e).h:null,c=t()*360;return l!==null&&si(c,l)<r&&(c=(l+r+t()*(360-2*r))%360),po(c,n+t()*(o-n),s+t()*(i-s))}function ri(e){if(!e)return null;let t=oi(e);return{[Je("surprise-fill")]:t.fill,[Je("surprise-ink")]:t.ink,[Je("surprise-on")]:t.on,[Je("surprise-on-ink")]:t.onInk}}var li=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,ci=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function ua(e){let[t,n,o]=[1,3,5].map(l=>li(parseInt(e.slice(l,l+2),16)/255)),s=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),i=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),r=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*s+.793617785*i-.0040720468*r,1.9779984951*s-2.428592205*i+.4505937099*r,.0259040371*s+.7827717662*i-.808675766*r]}function di([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,s=(e-.1055613458*t-.0638541728*n)**3,i=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*s+.2309699292*i,-1.2684380046*o+2.6097574011*s-.3413193965*i,-.0041960863*o-.7034186147*s+1.707614701*i].map(r=>xt(ci(Math.max(0,Math.min(1,r)))*255)).join("")}`.toUpperCase()}var pi=ye["velocity-range"],uo={min:At.rhythm["velocity-min"],max:At.rhythm["velocity-max"]},ha=Object.fromEntries(Object.entries(ei).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function ui(e,t=uo){let[n,o]=pi,s=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,i=(s-n)/(o-n),r=t.ink??At.rhythm["step-cell-ink"];if(i<=0)return{velocity:s,t:0,fill:t.min.toUpperCase(),ink:r};if(i>=1)return{velocity:s,t:1,fill:t.max.toUpperCase(),ink:r};let l=ua(t.min),c=ua(t.max);return{velocity:s,t:i,fill:di(l.map((d,p)=>d+(c[p]-d)*i)),ink:r}}function ma(e,t=uo){return{[Je("velocity-fill")]:ui(e,t).fill}}var ho="data-nc-theme",fa="nc-ui-theme-change",hi="(prefers-color-scheme: dark)",mo=e=>e?.documentElement??null,fo=e=>e?.defaultView?.matchMedia?.(hi)??null,mi=e=>e==="light"||e==="dark"?e:"system";function fi(e=globalThis.document){return mi(mo(e)?.getAttribute(ho))}function un(e=globalThis.document){let t=fi(e);return t!=="system"?t:fo(e)?.matches?"dark":"light"}function go(e,t=globalThis.document){let n=mo(t);if(!n)return()=>{};let o=un(t),s=()=>{let c=un(t);c!==o&&(o=c,e(c))},i=t.defaultView?.MutationObserver,r=i?new i(s):null;r?.observe(n,{attributes:!0,attributeFilter:[ho]});let l=fo(t);return l?.addEventListener?.("change",s),t.addEventListener(fa,s),()=>{r?.disconnect(),l?.removeEventListener?.("change",s),t.removeEventListener(fa,s)}}var gi={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},bi={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},wi={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},yi={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},jt={};for(let[e,t]of Object.entries(bi))jt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(yi))jt[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(wi))jt[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(gi.renames.map(e=>[e.old,e.new]));function bo(e){let t=jt[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function O(e){return bo(e).prop}function a(e){return`var(${O(e)})`}function xi(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(O(t)));return Number.isFinite(n)?n:0}function _(e,t){let n=bo(t),o=e.ownerDocument??document,s=o.createElement("span");s.dataset.ncLive=t,s.style.position="absolute",s.style.pointerEvents="none";let i=`var(${n.prop})`;n.kind==="family"?s.style.fontFamily=i:n.kind==="length"||n.kind==="other"||n.kind==="duration"?s.style.paddingLeft=i:s.style.color=i,(e instanceof Element?e:o.documentElement).append(s);let r=(o.defaultView??window).getComputedStyle(s),l=n.kind==="family"?r.fontFamily:n.kind==="color"?r.color:r.paddingLeft;return s.remove(),l}function wo(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function vi(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var $i="[data-modulated], [data-modulated] *";function Gt(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function ga(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function ki(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${O("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${O("divider")}: ${a(`module-div-stack-${o}`)};
      ${O("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${O("text-sub")}: ${a("module-sub-stack-1")};
      ${O("divider")}: ${a("module-div-stack-1")};
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
${$i} { transition: none; }
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
  ${O("text-sub")}: ${a("module-sub-stack-1")};
  ${O("divider")}: ${a("module-div-stack-1")};
  ${O("slider-track")}: ${a("module-div-stack-1")};
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
  ${O("text-sub")}: ${a("module-sub-stack-1")};
  ${O("divider")}: ${a("module-div-stack-1")};
  ${O("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${O("text-sub")}: ${a("module-sub-stack-1")};
  ${O("divider")}: ${a("module-div-stack-1")};
  ${O("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${O("text-sub")}: inherit;
  ${O("divider")}: inherit;
  ${O("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${O("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${O("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${O("divider")}: ${a("strip-divider")}; }
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
${ga("")}
}
@media (max-width: 1023px) {
${ga("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${Gt("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${Gt("")}
}
@media (max-width: 1023px) {
${Gt("html[data-nc-landscape] ")}
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
`}var Wt=null,Ei="nc-ui-fallback";function yo(e=globalThis.document){if(!e?.documentElement||(e.documentElement,Wt&&Wt.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ei} {
${ki()}
}
`,e.head.append(t),Wt=t}var Ai=new URL("/looper/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Si=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Ai,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Si(document);function xo(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let s=t.createElement("span");s.dataset.ncOn="",s.textContent=e.onText??"On";let i=t.createElement("span");i.dataset.ncOff="",i.textContent=e.offText??"Off",o.append(s,i),n.append(o);let r=!1,l=d=>{r=d===!0,n.setAttribute("aria-checked",r?"true":"false")};l(e.checked);let c=()=>{l(!r),e.onChange?.(r)};return n.addEventListener("click",c),{el:n,get checked(){return r},set:l,destroy(){n.removeEventListener("click",c),n.remove()}}}var vo=new WeakMap,ba=.25;function Mi(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let s=t.createElement("span");s.className="nc-fader-cap",s.setAttribute("aria-hidden","true"),n.append(o,s);let i=0,r=e.step??.005,l=e.onChange,c=e.onReset,d=u=>Math.min(1,Math.max(0,u)),p=()=>{n.style.setProperty("--fader-pos",String(i)),n.setAttribute("aria-valuenow",String(Math.round(i*1e3)/1e3))},h=u=>{let m=d(u);m!==i&&(i=m,p(),l?.(m))},b=0,f=!1;n.addEventListener("pointerdown",u=>{if(u.button!==0)return;u.preventDefault(),n.focus?.({preventScroll:!0});let m=n.getBoundingClientRect();u.target!==s&&m.height>0&&h(1-(u.clientY-m.top)/m.height),b=u.clientY,f=!0,n.dataset.dragging="true",n.setPointerCapture?.(u.pointerId)}),n.addEventListener("pointermove",u=>{if(!f)return;let m=n.getBoundingClientRect().height||1,w=(b-u.clientY)/m*(u.shiftKey?ba:1);b=u.clientY,h(i+w)});let x=()=>{f=!1,delete n.dataset.dragging};n.addEventListener("pointerup",x),n.addEventListener("pointercancel",x),n.addEventListener("lostpointercapture",x),n.addEventListener("dblclick",u=>{u.preventDefault(),c?.()}),n.addEventListener("keydown",u=>{let m=u.shiftKey?r*ba:r,w={ArrowUp:i+m,ArrowRight:i+m,ArrowDown:i-m,ArrowLeft:i-m,PageUp:i+r*10,PageDown:i-r*10,Home:0,End:1};u.key in w&&(u.preventDefault(),h(w[u.key]))});let y={el:n,get value(){return i},get dragging(){return f},set(u){f||(i=d(Number(u)||0),p())},setText(u){u?n.setAttribute("aria-valuetext",u):n.removeAttribute("aria-valuetext")},setLabel(u){n.setAttribute("aria-label",u)},configure(u){typeof u.step=="number"&&u.step>0&&(r=u.step),u.onChange&&(l=u.onChange),u.onReset&&(c=u.onReset)}};return y.setLabel(e.label),y.set(e.value??0),y.setText(e.valueText),vo.set(n,y),y}function Ti(e){return vo.get(e)}var $o=new WeakMap,Li=.2,Ci=1.5,zi=.5;function Fi(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function wa(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Fi(o.getComputedStyle(e).getPropertyValue(O(t)),n)}function Ni(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let s=t.createElement("button");s.type="button",s.className="nc-meter-clip",s.dataset.lit="false";let i=t.createElement("div");i.className="nc-meter-bars",i.setAttribute("aria-hidden","true");let r=[];for(let y=0;y<n;y++){let u=t.createElement("span");u.className="nc-meter-bar";let m=t.createElement("span");m.className="nc-meter-peak";let w=t.createElement("span");w.className="nc-meter-rms";let g=t.createElement("span");g.className="nc-meter-hold",u.append(m,w,g),i.append(u),r.push({peak:m,rms:w,hold:g,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(s,i);let l=e.label,c=e.onClear,d=!1,p=-1,h=-1,b=()=>{s.dataset.lit=d?"true":"false",s.setAttribute("aria-pressed",d?"true":"false"),s.setAttribute("aria-label",d?`${l} clipped: clear`:`${l} clip light`),s.title=d?"Clipped. Click to clear":"Clip light"},f=(y,u,m,w)=>{let g=Math.round(w*1e3)/1e3;m[u]!==g&&(m[u]=g,y.style.transform=u==="hold"?`translateY(${Math.round((1-g)*1e3)/10}%)`:`scaleY(${g})`)};s.addEventListener("click",()=>{x.clear(),c?.()});let x={el:o,get clipped(){return d},update(y,u){p<0&&(p=wa(o,"motion-meter-fall",Li)),h<0&&(h=wa(o,"motion-meter-hold",Ci));let m=Math.max(0,Math.min(.25,Number(u)||0)),w=p>0?Math.exp(-m/p):0;r.forEach((g,k)=>{let L=y[k]??y[0]??{peak:0,rms:0},E=Math.min(1,Math.max(0,Number(L.peak)||0)),v=Math.min(E,Math.max(0,Number(L.rms)||0));L.over&&x.clip(),g.level.peak=E>=g.level.peak?E:E+(g.level.peak-E)*w,g.level.rms=v>=g.level.rms?v:v+(g.level.rms-v)*w,g.holdAge+=m,E>=g.holdAt?(g.holdAt=E,g.holdAge=0):g.holdAge>h&&(g.holdAt=Math.max(E,g.holdAt-zi*m)),f(g.peak,"peak",g.shown,g.level.peak),f(g.rms,"rms",g.shown,g.level.rms),f(g.hold,"hold",g.shown,g.holdAt),g.hold.dataset.off=g.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,b())},clear(){d=!1,b()},reset(){for(let y of r)y.level.peak=0,y.level.rms=0,y.holdAt=0,y.holdAge=0,f(y.peak,"peak",y.shown,0),f(y.rms,"rms",y.shown,0),f(y.hold,"hold",y.shown,0),y.hold.dataset.off="true"},setLabel(y){l=y,b()},configure(y){y.onClear&&(c=y.onClear)}};return b(),x.reset(),$o.set(o,x),x}function Di(e){return e?$o.get(e):void 0}var qi=3,Pi=new Set(["freq","q","rate","time","log"]);function On(e,t,n){return!e||!Pi.has(e)||!(n>t)?"linear":t>0?"log":"power"}function ut(e,t,n){return On(e,t,n)!=="linear"}function Mt(e,t,n,o){let s=Number(o);if(!(n>t)||!Number.isFinite(s))return 0;let i=Math.min(n,Math.max(t,s)),r=On(e,t,n);if(r==="log")return Math.log(i/t)/Math.log(n/t);let l=(i-t)/(n-t);return r==="power"?Math.cbrt(l):l}function ko(e,t,n,o){let s=Math.min(1,Math.max(0,Number(o)||0)),i=On(e,t,n);return i==="log"?t*(n/t)**s:t+(n-t)*(i==="power"?s**qi:s)}function Eo(e,t,n,o){let s=Math.min(n,Math.max(t,e));if(o>0){s=t+Math.round((s-t)/o)*o;let i=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));s=Number(s.toFixed(i)),s=Math.min(n,Math.max(t,s))}return s}function st(e,t,n,o){return Math.round(Mt(e,t,n,o)*1e3)}function Tt(e,t,n,o,s){return Eo(ko(e,t,n,Number(o)/1e3),t,n,s)}function Ii(e,t,n=!1){let o=Number(e)||0,s=n?1:1e3/100,i=null;return t==="ArrowRight"||t==="ArrowUp"?i=o+s:t==="ArrowLeft"||t==="ArrowDown"?i=o-s:t==="PageUp"?i=o+1e3/10:t==="PageDown"?i=o-1e3/10:t==="Home"?i=0:t==="End"&&(i=1e3),i===null?null:Math.min(1e3,Math.max(0,Math.round(i)))}function _n(e,t,n,o,s,i=!1,r){let l=st(e,t,n,o),c=Ii(l,s,i);if(c===null)return null;let d=Tt(e,t,n,c,r),p=Math.sign(c-l),h=Eo(Number(o),t,n,r);for(;p!==0&&d===h&&c>0&&c<1e3;)c+=p,d=Tt(e,t,n,c,r);return d}function ya(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function ji(e,t,n,o=n/6){let s=e.some(p=>p===null),i=Math.max(0,n-(s?o:0)),r=e.reduce((p,h,b)=>h===null?p:p+ya(t[b]),0),l=r>0?i/r:0,c=e.map(p=>p===null?0:Math.min(i,ya(p)*l));if(s){let p=c.reduce((b,f)=>b+f,0),h=e.indexOf(null);c[h]=Math.max(o,n-p)}let d=[0];for(let p of c)d.push(Math.round((d[d.length-1]+p)*100)/100);return s&&(d[d.length-1]=n),d}function Bi(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.floor(t*o)),i=Math.max(1,Math.floor(n*o));(e.width!==s||e.height!==i)&&(e.width=s,e.height=i);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function fe(e){return Math.max(0,Math.min(1,e))}function Ao(e,t){let{ctx:n,w:o,h:s}=Bi(e);if(!n)return;n.clearRect(0,0,o,s);let i=vi(e);if(t.paint==="swatch"){let c=_(e,"accent"),d=_(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,s),n.fillStyle=d,n.fillRect(o/2,0,o/2,s);return}if(t.paint==="filter"&&typeof t.hz=="number"){Oi(n,o,s,t,e,i);return}if(t.paint==="filter"){let c=t.mode??"lp",d=_(e,wo(c)),p=_(e,"divider"),h=fe(t.cutoff??.5),b=.08+(1-fe(t.resonance??.2))*.22;n.strokeStyle=p,n.beginPath(),n.moveTo(0,s*.72),n.lineTo(o,s*.72),n.stroke(),n.beginPath();for(let f=0;f<=o;f++){let x=f/Math.max(1,o),y=0;c==="lp"?y=x<h?1:Math.max(0,1-(x-h)/b):c==="hp"?y=x>h?1:Math.max(0,1-(h-x)/b):y=Math.max(0,1-Math.abs(x-h)/b);let u=s*.78-y*s*.62;f===0?n.moveTo(f,u):n.lineTo(f,u)}n.strokeStyle=d,n.stroke(),n.fillStyle=_(e,"text-sub"),n.font=i,n.fillText(c.toUpperCase(),0,s),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=_(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[p,h,b]=ji([c,d],t.max??[1,4],o),f=2,x=s-1;n.beginPath(),n.moveTo(p,x),n.lineTo(h,f);let y=Math.max(1,Math.ceil(b-h));for(let u=1;u<=y;u++){let m=u/y;n.lineTo(h+(b-h)*m,x-(x-f)*Math.exp(-4.6*m)*(1-m*.01))}n.lineTo(b,x),n.lineTo(o,x),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,p]=Array.isArray(t.region)?t.region:[0,1],h=_(e,"accent"),b=_(e,"text-sub"),f=s/2;n.fillStyle=_(e,"accent-soft"),n.fillRect(fe(d)*o,0,(fe(p)-fe(d))*o,s),n.strokeStyle=_(e,"divider"),n.beginPath(),n.moveTo(0,f),n.lineTo(o,f),n.stroke();let x=Math.floor(c.length/2);for(let y=0;y<x;y++){let u=(y+.5)/x*o,m=Math.max(-1,Math.min(1,c[y*2]??0)),w=Math.max(-1,Math.min(1,c[y*2+1]??0)),g=(y+.5)/x;n.strokeStyle=g>=d&&g<=p?h:b,n.beginPath(),n.moveTo(u,f-w*(f-1)),n.lineTo(u,f-m*(f-1)+.5),n.stroke()}n.strokeStyle=h;for(let y of[d,p,...Array.isArray(t.markers)?t.markers:[]]){let u=Math.round(fe(y)*(o-1))+.5;n.beginPath(),n.moveTo(u,0),n.lineTo(u,s),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=_(e,"text"),n.fillRect(Math.round(fe(t.position)*(o-1)),0,1,s)),x||(n.fillStyle=b,n.font=i,n.fillText(t.empty??"Empty",0,f+4)),e.dataset.ncAccent=h;return}if(t.paint==="meter"){let c=fe(t.level??0);n.fillStyle=_(e,"divider"),n.fillRect(0,s*.4,o,s*.2),n.fillStyle=_(e,"accent"),n.fillRect(0,s*.4,o*c,s*.2),e.dataset.ncAccent=n.fillStyle;return}let r=Math.max(1,t.steps??16),l=((t.step??0)%r+r)%r;n.fillStyle=_(e,"rhythm.step-cell-off"),n.fillRect(0,s*.45,o,s*.1),n.fillStyle=_(e,"rhythm.playhead"),n.fillRect(l/r*o,s*.3,Math.max(1,o/r),s*.4),e.dataset.ncAccent=_(e,"accent")}var tt=20,hn=2e4,Ut=24,xa=-60;function Ri(e,t,n,o,s=48e3){let i=2*Math.PI*Math.min(t,s*.49)/s,r=Math.cos(i),l=Math.sin(i)/(2*n),c,d,p;e==="hp"?[c,d,p]=[(1+r)/2,-(1+r),(1+r)/2]:e==="bp"?[c,d,p]=[l,0,-l]:[c,d,p]=[(1-r)/2,1-r,(1-r)/2];let h=1+l,b=-2*r,f=1-l,x=2*Math.PI*o/s,y=(g,k,L)=>g+k*Math.cos(x)+L*Math.cos(2*x),u=(g,k)=>-(g*Math.sin(x)+k*Math.sin(2*x)),m=Math.hypot(y(c,d,p),u(d,p)),w=Math.hypot(y(h,b,f),u(b,f));return w>0?m/w:0}function Hi(e,t){return Math.log(Math.max(tt,Math.min(hn,e))/tt)/Math.log(hn/tt)*t}function va(e,t,n){let o=Math.max(xa,Math.min(Ut,e));return t+(Ut-o)/(Ut-xa)*(n-t)}function Oi(e,t,n,o,s,i){let r=o.mode??"lp",l=_(s,wo(r)),c=_(s,"divider"),d=_(s,"text-sub"),p=Number.parseFloat(String(i).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),h=1,b=Math.max(h+4,n-p-3),f=o.q??Math.SQRT1_2,x=Math.round(va(0,h,b))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,x),e.lineTo(t,x),e.stroke(),e.beginPath();for(let y=0;y<=t;y++){let u=tt*(hn/tt)**(y/Math.max(1,t)),m=o.open?1:Ri(r,o.hz,f,u,o.sampleRate),w=va(20*Math.log10(Math.max(1e-5,m)),h,b);y===0?e.moveTo(y,w):e.lineTo(y,w)}if(e.strokeStyle=l,e.stroke(),!o.open){let y=Math.round(Hi(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(y,h),e.lineTo(y,b),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=i,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",s.dataset.ncAccent=l,s.dataset.ncFilterHz=String(Math.round(o.hz))}function se(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let s=n.defaultView.getComputedStyle(o).color;return o.remove(),s}function _i(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Ce=20,ht=2e4,Vn=Math.log(ht/Ce),mn=32,Vi=250,Gi=-100,Wi=1200,Ui=4.5,$a=-6,Se=-96,Yi=48,ka=[100,1e3,1e4],Ki=[6,12];function Be(e,t){return Math.log(Math.max(Ce,Math.min(ht,e))/Ce)/Vn*t}function vt(e,t){return Ce*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*Vn)}function xe(e,t,n,o){let s=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*s}function fn(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var So=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function Xi(e,t,n,o){let s=n?3:1,i=c=>({db:Math.max(-o,Math.min(o,e.db+c*s))}),r=c=>({hz:Math.max(e.minHz??Ce,Math.min(e.maxHz??ht,e.hz*2**(c*s/6)))}),l=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*s)))});switch(t){case"ArrowUp":return i(1);case"ArrowDown":return i(-1);case"ArrowRight":return e.moveHz?r(1):i(1);case"ArrowLeft":return e.moveHz?r(-1):i(-1);case"PageUp":return e.moveQ?l(1):null;case"PageDown":return e.moveQ?l(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function Gn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function Ji(e,t,n,o,s,i,r,l,c){let d=c?.25:1,p={},h=Math.max(1,i/2-l);if(p.db=Math.max(-r,Math.min(r,t.db-o*d/h*r/Gn(e))),e.moveHz){let b=t.hz*Math.exp(n*d/Math.max(1,s)*Vn);p.hz=Math.max(e.minHz??Ce,Math.min(e.maxHz??ht,b))}return p}function Qi(e,t,n,o,s){let i=Math.max(0,n.left)+1,r=Math.min(n.right,s)-1,l=Math.min(t.width*3+o*2,r-i),c=Math.max(i,Math.min(e.left,r-l));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(l)}}var W=new WeakMap;function Zi(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let s=document.createElement("canvas");s.className="nc-eq-spectrum",s.setAttribute("aria-hidden","true");let i=document.createElement("canvas");i.className="nc-eq-curve",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-eq-tip",r.setAttribute("aria-hidden","true"),r.hidden=!0,o.append(s,i);for(let c of e.bands)o.append(er(n,c,t));o.append(r),o.addEventListener("click",c=>{if(!Fo(n)||c.button>0)return;let d=zo(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let l=document.createElement("i");return l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l),W.set(n,{control:e,cache:null,spec:null,active:null}),To(n,e),n}function Mo(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function er(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let s=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},i=()=>s()?.bands.find(d=>d.id===t.id)??null,r=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let p=i();p&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),r={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:p.hz,db:p.db}},o.dataset.drag="true",ge(e,t.id))}),o.addEventListener("pointermove",d=>{if(!r||d.pointerId!==r.id)return;let p=s(),h=i(),b=W.get(e);if(!p||!h||!b?.box)return;let{w:f,h:x,pad:y}=b.box;p.onBand(h.id,Ji(h,r.start,d.clientX-r.x,d.clientY-r.y,f,x,p.range??18,y,d.shiftKey))});let l=d=>{!r||d.pointerId!==r.id||(r=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&ge(e,null))};o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("dblclick",d=>{d.preventDefault(),s()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let p=s(),h=i();if(!p||!h)return;let b=Xi(h,d.key,d.shiftKey,p.range??18);b&&(d.preventDefault(),b==="reset"?p.onReset?.(h.id):p.onBand(h.id,b),ge(e,h.id))});let c=null;return o.addEventListener("wheel",d=>{let p=s(),h=i();if(!p||!h?.moveQ)return;d.preventDefault();let b=d.timeStamp;(!c||b-c.t>400)&&(c={q:h.q,t:b});let f=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(h.minQ??.1,Math.min(h.maxQ??20,c.q*2**(-f/240))),c.t=b,p.onBand(h.id,{q:c.q}),ge(e,h.id)},{passive:!1}),o.addEventListener("pointerenter",()=>ge(e,t.id)),o.addEventListener("focus",()=>ge(e,t.id)),o.addEventListener("pointerleave",()=>{!r&&e.ownerDocument.activeElement!==o&&ge(e,null)}),o.addEventListener("blur",()=>{r||ge(e,null)}),o}function ge(e,t){let n=W.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?Oe(e):Wn(e)}function Wn(e){let t=W.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(x=>x.id===t.active):null;for(let x of e.querySelectorAll(".nc-eq-node"))x instanceof HTMLElement&&(o&&x.dataset.band===o.id?x.dataset.active="true":delete x.dataset.active);if(!o||!t.box){n.hidden=!0;return}let s=[o.label,So(o.db)];o.kind==="peak"?s.push(fn(o.hz),`Q ${o.q.toFixed(1)}`):s.push(`${o.kind==="lowshelf"?"below":"above"} ${fn(o.hz)}`),n.textContent=s.join(" · "),n.dataset.tone=String(tr(t.control,o)),n.hidden=!1;let{w:i,h:r,pad:l}=t.box,c=Be(o.hz,i),d=xe(o.db*Gn(o),r,t.control.range??18,l),p=n.offsetWidth,h=n.offsetHeight,b=Math.max(0,Math.min(i-p,c-p/2)),f=d-h-l*1.5>=0?d-h-l*1.5:Math.min(r-h,d+l*1.5);n.style.left=`${Math.round(b)}px`,n.style.top=`${Math.round(f)}px`}function tr(e,t){return e.bands.indexOf(t)%3+1}function To(e,t){let n=W.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",Un(e);let o=t.range??18;t.bands.forEach((s,i)=>{let r=Mo(e,s.id);r instanceof HTMLElement&&(r.dataset.tone=String(i%3+1),r.dataset.kind=s.kind,r.setAttribute("aria-label",`${s.label} band`),r.setAttribute("aria-valuemin",String(-o)),r.setAttribute("aria-valuemax",String(o)),r.setAttribute("aria-valuenow",String(s.db)),r.setAttribute("aria-valuetext",s.valueText??`${So(s.db)}, ${fn(s.hz)}`),r.setAttribute("aria-keyshortcuts",s.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),s.help?r.setAttribute("data-nc-help",s.help):r.removeAttribute("data-nc-help"))}),Oe(e),rr(e)}function Lo(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,s=Math.max(1,Math.round(t*o)),i=Math.max(1,Math.round(n*o));(e.width!==s||e.height!==i)&&(e.width=s,e.height=i);let r=e.getContext("2d");return r?.setTransform(o,0,0,o,0,0),{ctx:r,w:t,h:n}}function Co(e){return{curve:se(e,"eq-curve"),fill:se(e,"eq-fill"),quiet:se(e,"text-sub"),grid:se(e,"eq-grid"),zero:se(e,"divider"),label:se(e,"text-sub"),spectrum:se(e,"eq-spectrum"),bands:[se(e,"eq-band-1"),se(e,"eq-band-2"),se(e,"eq-band-3")]}}function nr(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function Oe(e){W.has(e)&&Un(e);let t=W.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:s,w:i,h:r}=Lo(n);if(!s)return;let l=Math.max(8,Math.round(r*.06)),c=o.range??18;t.box={w:i,h:r,pad:l},t.colours=Co(e);let d=t.colours,p=nr(o,i);if(!t.cache||t.cache.key!==p){let k=Math.max(64,Math.ceil(i)+1),L=new Float64Array(k);for(let v=0;v<k;v++)L[v]=vt(v/(k-1)*i,i);let E=null;try{E=typeof o.response=="function"?o.response(L):null}catch{E=null}t.cache={key:p,freqs:L,total:E?.total??new Float64Array(k),bands:E?.bands??[]}}s.clearRect(0,0,i,r);let h=_i(e),b=o.on!==!1;ar(s,i,r,c,l,d,h);let{freqs:f,total:x,bands:y}=t.cache,u=Array.from(f,k=>Be(k,i)),m=xe(0,r,c,l);y.forEach((k,L)=>{if(!k||!k.some(A=>Math.abs(A)>.05))return;let E=b?d.bands[L%3]:d.quiet,v=Array.from(k,A=>xe(A,r,c,l));s.save(),t.active&&o.bands[L]?.id===t.active&&(s.globalAlpha=.14,s.fillStyle=E,Ea(s,u,v,m)),s.globalAlpha=b?.75:.4,s.strokeStyle=E,s.lineWidth=.75,Yt(s,u,v),s.restore()});let w=Array.from(x,k=>xe(k,r,c,l)),g=b?d.curve:d.quiet;s.save(),s.fillStyle=b?d.fill:d.quiet,s.globalAlpha=b?.2:.08,Ea(s,u,w,m),s.restore(),s.save(),s.strokeStyle=b?d.fill:g,s.lineJoin="round",s.lineCap="round",b&&(s.globalAlpha=.16,s.lineWidth=4,Yt(s,u,w)),s.globalAlpha=1,s.strokeStyle=g,s.lineWidth=1.25,Yt(s,u,w),s.restore(),or(e),Wn(e)}function ar(e,t,n,o,s,i,r){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let p=c*d;if(p<Ce||p>ht)continue;let h=Math.round(Be(p,t))+.5;e.globalAlpha=ka.includes(p)?.9:.35,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(h,0),e.lineTo(h,n),e.stroke()}for(let c of Ki)if(!(c>o))for(let d of[1,-1]){let p=Math.round(xe(c*d,n,o,s))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=i.grid,e.beginPath(),e.moveTo(0,p),e.lineTo(t,p),e.stroke()}e.globalAlpha=1,e.strokeStyle=i.zero;let l=Math.round(xe(0,n,o,s))+.5;e.beginPath(),e.moveTo(0,l),e.lineTo(t,l),e.stroke(),e.font=r,e.fillStyle=i.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of ka){let d=c>=1e3?`${c/1e3}k`:String(c),p=e.measureText(d).width,h=Be(c,t)+3;e.fillText(d,h+p+2>t?Be(c,t)-p-3:h,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=xe(c,n,o,s);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Lt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let s=(t[o]+t[o+1])/2,i=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],s,i)}e.lineTo(t[t.length-1],n[n.length-1])}function Yt(e,t,n){e.beginPath(),Lt(e,t,n),e.stroke()}function Ea(e,t,n,o){e.beginPath(),Lt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function zo(e){return e.closest("[data-nc-maxable]")}function Fo(e){let t=zo(e);return!!t&&!t.hasAttribute("data-nc-max")}function Un(e){let t=Fo(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=W.get(e);n?.active&&(n.active=null,Wn(e))}return t}function or(e){Un(e);let t=W.get(e);if(!t?.box)return;let{w:n,h:o,pad:s}=t.box,i=t.control.range??18;for(let r of t.control.bands){let l=Mo(e,r.id);l instanceof HTMLElement&&(l.style.left=`${Be(r.hz,n).toFixed(1)}px`,l.style.top=`${xe(r.db*Gn(r),o,i,s).toFixed(1)}px`)}}function sr(e,t,n,o){let s=o/2/n,i=new Float32Array(e),r=new Float32Array(e),l=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,p=(c+.5)/(e-1)*t,h=vt(d,t),b=vt(p,t),f=vt(c/(e-1)*t,t);i[c]=Math.min(n-1,h/s),r[c]=Math.min(n-1,b/s),l[c]=Ui*Math.log2(f/1e3)}return{lo:i,hi:r,tilt:l}}function ir(e,t,n){let o=Math.floor(t),s=Math.ceil(n);if(s-o<=1){let r=t-o,l=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??l;return l+(c-l)*r}let i=-1/0;for(let r=o;r<=s&&r<e.length;r++)e[r]>i&&(i=e[r]);return i}function rr(e){let t=W.get(e);if(t){if(!t.control.spectrum){Do(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let s=W.get(e)?.spec;s&&(s.visible=o.some(i=>i.isIntersecting),gn(e))}),t.spec.io.observe(e)):t.spec.visible=!0}gn(e)}}function gn(e){let t=W.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){No(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=bn(e),n.onVis||(n.onVis=()=>gn(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&wn(e,!1)}function bn(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function wn(e,t){let n=W.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,Kt(e,bn(e))),Vi):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(s=>(n.raf=0,Kt(e,s))):n.timer=o.setTimeout(()=>(n.timer=0,Kt(e,bn(e))),mn))}function No(e){let t=W.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function Do(e){let t=W.get(e)?.spec;if(!t)return;No(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=W.get(e);n&&(n.spec=null)}function Kt(e,t){let n=W.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){Do(e);return}if(!o.analyser)return;if(t-o.last<mn-4&&!o.idle){wn(e,!1);return}let s=o.last?Math.min(.25,(t-o.last)/1e3):mn/1e3;o.last=t;let i=e.querySelector(".nc-eq-spectrum");if(!(i instanceof HTMLCanvasElement))return;let{ctx:r,w:l,h:c}=Lo(i);if(!r)return;let d=Math.max(16,Math.round(l/2)),p=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==l||o.map.sr!==p)&&(o.map={cols:d,w:l,sr:p,...sr(d,l,o.buf.length,p)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let h=-1/0,b=Yi*s,{lo:f,hi:x,tilt:y}=o.map;for(let m=0;m<d;m++){let w=ir(o.buf,f[m],x[m]);w>h&&(h=w);let g=w+y[m],k=o.disp[m]-b;o.disp[m]=g>k?g:k}h>Gi&&(o.loud=t);let u=t-o.loud>Wi;r.clearRect(0,0,l,c),(!u||o.disp.some(m=>m>Se))&&lr(r,l,c,o.disp,n.colours??Co(e)),o.idle=u&&!o.disp.some(m=>m>Se),wn(e,o.idle)}function lr(e,t,n,o,s){let i=o.length,r=new Array(i),l=new Array(i),c=d=>{let p=o[Math.max(0,Math.min(i-1,d))];return Number.isFinite(p)?p:Se};for(let d=0;d<i;d++){let p=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,h=(Math.max(Se,Math.min($a,Number.isFinite(p)?p:Se))-Se)/($a-Se);r[d]=d/(i-1)*t,l[d]=n-h*n}e.save(),e.fillStyle=s.spectrum,e.globalAlpha=.13,e.beginPath(),Lt(e,r,l),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=s.spectrum,e.lineWidth=1,e.beginPath(),Lt(e,r,l),e.stroke(),e.restore()}var ee=new WeakMap,cr=450,dr=6,pr=33,Xt=24,ur="http://www.w3.org/2000/svg";function hr(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function mr(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function fr(e,t,n,o,s){let i=e.slice();if(t===o)return i[o]=s,i;let r=t<o?1:-1;for(let l=t;l!==o+r;l+=r){let c=(l-t)/(o-t);i[l]=Math.round((n+(s-n)*c)*100)/100}return i}function gr(e,t){let n=e.steps[t],o=(e.shapes??[]).find(i=>i.value===n.shape),s=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${s}`}function Me(e,t){let n=document.createElementNS(ur,e);for(let[o,s]of Object.entries(t))n.setAttribute(o,String(s));return n}function qo(e){let t=Me("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Me("path",{d:e})),t}function br(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let s=document.createElement("div");s.className="nc-lsteps-axis",s.setAttribute("aria-hidden","true");let i=document.createElement("div");i.className="nc-lsteps-shapes",i.setAttribute("role","tablist");let r=document.createElement("div");r.className="nc-lsteps-pick",r.setAttribute("role","menu"),r.hidden=!0,n.append(o,s,i,r);let l=document.createElement("i");l.className="nc-token-probe",l.dataset.ncProbe="",n.append(l);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return ee.set(n,c),yr(n,o),xr(n,r),Po(n,e),n}function ne(e){let t=ee.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function wr(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function Jt(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=wr(e);return{i:mr(t.clientX,o),level:hr(t.clientY-n.top,n.height)}}function yr(e,t){let n=ee.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",i=>{let r=ne(e);if(!r||i.button>0||!r.steps.length)return;i.preventDefault(),Ct(e),t.setPointerCapture?.(i.pointerId);let l=Jt(t,i),c=r.steps.map(d=>d.level);n.drag={id:i.pointerId,x:i.clientX,y:i.clientY,start:c,levels:c,i:l.i,level:l.level,moved:!1,long:!1},n.focus=l.i,Aa(e,l.i,l.level,l.i,l.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,ne(e)?.onLevels(d.start.slice(),!0),Qt(e,d.i))},cr)}),t.addEventListener("pointermove",i=>{let r=n.drag;if(!r||r.id!==i.pointerId||r.long||!r.moved&&Math.hypot(i.clientX-r.x,i.clientY-r.y)<dr)return;r.moved=!0,o();let l=Jt(t,i);Aa(e,r.i,r.level,l.i,l.level,!1),r.i=l.i,r.level=l.level});let s=i=>{let r=n.drag;!r||r.id!==i.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(i.pointerId),r.long||ne(e)?.onLevels(r.levels.slice(),!0),yn(e,-1))};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",i=>{let r=n.drag;!r||r.id!==i.pointerId||(o(),n.drag=null,r.long||ne(e)?.onLevels(r.start.slice(),!0),yn(e,-1))}),t.addEventListener("contextmenu",i=>{ne(e)?.onShape&&(i.preventDefault(),Qt(e,Jt(t,i).i))}),t.addEventListener("keydown",i=>{let r=ne(e);if(!r||!r.steps.length)return;let l=r.steps.length,c=Math.min(n.focus,l-1),d=r.steps[c].level,p=h=>{let b=r.steps.map(f=>f.level);b[c]=Math.round(Math.max(0,Math.min(1,h))*100)/100,r.onLevels(b,!0)};switch(i.key){case"ArrowLeft":n.focus=(c-1+l)%l;break;case"ArrowRight":n.focus=(c+1)%l;break;case"ArrowUp":p(d+(i.shiftKey?.01:.05));break;case"ArrowDown":p(d-(i.shiftKey?.01:.05));break;case"PageUp":p(d+.25);break;case"PageDown":p(d-.25);break;case"Home":p(1);break;case"End":p(0);break;case"Enter":case" ":if(!r.onShape)return;Qt(e,c);break;default:return}i.preventDefault(),xn(e)}),t.addEventListener("focus",()=>xn(e)),t.addEventListener("blur",()=>{for(let i of t.querySelectorAll("[data-focus]"))i.removeAttribute("data-focus")})}function Aa(e,t,n,o,s,i){let r=ee.get(e).drag;r&&(r.levels=fr(r.levels,t,n,o,s),yn(e,o,r.levels[o]),ne(e)?.onLevels(r.levels.slice(),i))}function yn(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function xn(e){let t=ee.get(e),n=e.querySelector(".nc-lsteps-plot"),o=ne(e);if(!n||!o)return;for(let i of n.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===t.focus?i.dataset.focus="true":i.removeAttribute("data-focus");let s=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[s]?.level??0)*100))),n.setAttribute("aria-valuetext",gr(o,s))}function xr(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),Ct(e,!0);return}let o=[...t.querySelectorAll("button")],s=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(s+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(s-1+o.length)%o.length]?.focus())}),ee.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&Ct(e)}}function Qt(e,t){let n=ne(e),o=e.querySelector(".nc-lsteps-pick"),s=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!s)return;let i=ee.get(e);i.focus=t,o.textContent="";let r=document.createElement("span");r.className="nc-lsteps-pick-head",r.textContent=`Step ${t+1}`,o.append(r);for(let f of n.shapes??[]){let x=document.createElement("button");x.type="button",x.setAttribute("role","menuitemradio"),x.setAttribute("aria-checked",n.steps[t]?.shape===f.value?"true":"false"),f.icon&&x.append(qo(f.icon)),x.append(document.createTextNode(f.label)),x.addEventListener("click",()=>{ne(e)?.onShape?.(t,f.value),Ct(e,!0)}),o.append(x)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",i.outside,!0);let l=s.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=l?.getBoundingClientRect(),p=o.getBoundingClientRect().width,h=d?d.left+d.width/2-c.left:0,b=Math.max(0,Math.min(c.width-p,h-p/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(b)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function Ct(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",ee.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function vr(e,t){let n=ee.get(e),o=e.querySelector(".nc-lsteps-plot"),s=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",s.textContent="";for(let i=0;i<t;i++){let r=document.createElement("div");r.className="nc-lsteps-step",r.dataset.i=String(i),i%4===0&&i>0&&(r.dataset.beat="true");let l=Me("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});l.append(Me("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Me("path",{class:"nc-lsteps-env",d:""}),Me("path",{class:"nc-lsteps-top",d:""}),Me("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),r.append(l),o.append(r);let c=document.createElement("span");i%4===0&&(c.textContent=String(i+1)),i%4===0&&i>0&&(c.dataset.beat="true"),s.append(c)}}}function Po(e,t){let n=ee.get(e);if(!n)return;n.control=t;let o=t.steps.length;vr(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let s=e.querySelector(".nc-lsteps-plot");s.setAttribute("aria-label",t.label??"Steps");let i=Math.max(.5,Math.min(.75,t.swing??.5)),r=s.querySelectorAll(".nc-lsteps-step"),l=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((f,x)=>{let y=r[x];if(!y)return;let u=String((x%2?1-i:i)*2);y.style.setProperty("--nc-lsteps-grow",u),l[x]?.style.setProperty("--nc-lsteps-grow",u),t.played!==void 0&&x>=t.played?y.dataset.out="true":y.removeAttribute("data-out"),y.dataset.zero=f.level<=0?"true":"false";let m=Math.max(0,Math.min(1,f.level)),w=y.querySelector(".nc-lsteps-level");w.setAttribute("y",String(100-m*100)),w.setAttribute("height",String(m*100));let g=t.curve?t.curve(x,Xt):null,k="M0 100",L="";for(let E=0;E<=Xt;E++){let v=g?Math.max(0,Math.min(1,g[E]??m)):m,A=E/Xt*100,$=100-v*100;k+=` L${A.toFixed(2)} ${$.toFixed(2)}`,L+=`${E?" L":"M"}${A.toFixed(2)} ${$.toFixed(2)}`}y.querySelector(".nc-lsteps-env").setAttribute("d",`${k} L100 100 Z`),y.querySelector(".nc-lsteps-top").setAttribute("d",L)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(f=>`${f.value}:${f.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let f of t.shapes??[]){let x=document.createElement("button");x.type="button",x.className="nc-lsteps-shape",x.setAttribute("role","tab"),x.dataset.shape=String(f.value),f.icon&&x.append(qo(f.icon)),x.append(document.createTextNode(f.label)),x.addEventListener("click",()=>ne(e)?.onShapeAll?.(f.value)),c.append(x)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let p=t.played??o,h=t.steps[0]?.shape,b=t.steps.slice(0,p).every(f=>f.shape===h);for(let f of c.querySelectorAll(".nc-lsteps-shape")){let x=b&&f.dataset.shape===String(h);f.setAttribute("aria-selected",x?"true":"false"),f.tabIndex=x||!b&&f===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),xn(e),n.last=-2,$r(e)}function $r(e){let t=ee.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&Zt(e,null);return}let o=0,s=i=>{if(t.loop=0,!e.isConnected||!t.control.playhead){Zt(e,null);return}i-o>=pr&&(o=i,Zt(e,t.control.playhead())),t.loop=n.requestAnimationFrame(s)};t.loop=n.requestAnimationFrame(s)}function Zt(e,t){let n=ee.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,s=!!t?.locked;if(!(n.last===o&&n.lastLocked===s)){n.last=o,n.lastLocked=s;for(let i of e.querySelectorAll(".nc-lsteps-step"))Number(i.dataset.i)===o?(i.dataset.playhead="true",i.dataset.locked=s?"true":"false"):(i.removeAttribute("data-playhead"),i.removeAttribute("data-locked"));e.dataset.free=t&&!s?"true":"false"}}var kr=.8912509381337456,vn=32,Er=250,Ar=1200,Sr=.2,Io=1.5;function Mr(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Tr(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let s=e.createElement("span");s.className="nc-fx-level-fill",o.append(s),t.append(o)}return t}var zt=new WeakMap,Sa=new WeakMap;function Ma(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let s=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),i=Number.parseFloat(s);return Number.isFinite(i)?s.endsWith("ms")?i/1e3:i:n}function Lr(e){let t=Sa.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(s=>{for(let i of s){let r=zt.get(i.target);r&&(r.seen.set(i.target,i.isIntersecting),nt(r))}Ie(t)})),e.addEventListener("visibilitychange",()=>{for(let s of t.recs)nt(s);Ie(t)}),Sa.set(e,t),t}var jo=e=>e.els.some(t=>t.isConnected);function Cr(e){if(!e.loop.io)return jo(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function nt(e){let t=!e.dead&&!!e.source&&Cr(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=Yn(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),En(e))}function Yn(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Ie(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Bo(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=Yn(e)),!e.raf&&!e.timer&&$n(e,!1)}function $n(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>Ta(e,Yn(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Er):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(s=>(e.raf=0,Ta(e,s))):e.timer=n.setTimeout(()=>(e.timer=0,o()),vn)}function Bo(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function Ta(e,t){if(t-e.last<vn-4&&!e.idle&&e.last){$n(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):vn/1e3;e.last=t,e.frames++;let o=!1,s=!1;for(let i of e.recs){if(!jo(i)){(i.placed||e.frames-i.born>90)&&Ro(i);continue}i.placed=!0,i.open&&(s=!0,zr(i,n,t)&&(e.loud=t),(i.disp[0]>0||i.disp[1]>0)&&(o=!0))}if(!s){Bo(e);return}e.idle=t-e.loud>Ar&&!o,$n(e,e.idle)}function zr(e,t,n){if(e.fall<0){let b=e.els[0];e.fall=Ma(b,"motion-meter-fall",Sr),e.hold=Ma(b,"motion-meter-hold",Io)}let o=null;try{o=e.source.read()}catch{o=null}let s=typeof o=="number",i=s?o:Number(o?.in)||0,r=!s&&o!==null&&typeof o=="object"&&typeof o.out=="number",l=r&&Number(o.out)||0,c=r?"2":"1";if(e.rows!==c){e.rows=c;for(let b of e.els)b.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,p=[i,l],h=!1;for(let b=0;b<2;b++){let f=Mr(p[b]);f>0&&(h=!0),e.disp[b]=f>=e.disp[b]?f:f+(e.disp[b]-f)*d,e.disp[b]<.001&&(e.disp[b]=0),p[b]>=kr&&(e.clipAt[b]=n);let x=e.clipAt[b]>0&&n-e.clipAt[b]<e.hold*1e3;kn(e,b,e.disp[b],x)}return h}function kn(e,t,n,o){let s=Math.round(n*1e3)/1e3,i=o?"true":"false";if(!(e.shown[t]===s&&e.clipShown[t]===i)){e.shown[t]=s,e.clipShown[t]=i;for(let r of e.els){let l=r.children[t]?.firstElementChild;l&&(l.style.transform=`scaleY(${s})`,l.dataset.clip=i)}}}function En(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,kn(e,0,0,!1),kn(e,1,0,!1)}function Ro(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),zt.get(t)===e&&zt.delete(t)}function Fr(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,s=Lr(o),i={els:n,source:t??null,loop:s,open:!1,dead:!1,seen:new Map,born:s.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Io,rows:""};for(let r of n)zt.set(r,i),s.io?.observe(r);if(s.recs.add(i),En(i),!s.io){let r=o.defaultView,l=()=>{nt(i),Ie(s)};typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(l):setTimeout(l,0)}return{set(r){let l=r??null;if(!i.dead){if(l===i.source){nt(i),Ie(s);return}i.open&&(i.open=!1,i.source?.close?.(),En(i)),i.source=l,nt(i),Ie(s)}},destroy(){i.dead||Ro(i),Ie(s)}}}var Ho={slop:8,longPressMs:500,pitchPx:16},Nr=class{constructor(e,t,n=Ho){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let s=this.hit(t,n);return s<0?!1:(this.phase="pending",this.pointer=e,this.pad=s,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let s=t-this.x0,i=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(s,i)<this.config.slop)return;Math.abs(i)>=Math.abs(s)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let r=Math.trunc(-i/this.config.pitchPx);r!==this.degrees&&(this.degrees=r,this.emit({kind:"pitch",pad:this.pad,degrees:r,phase:"move"}))}else if(this.phase==="paint"){let r=this.hit(t,n);r>=0&&r!==this.lastPad&&(this.lastPad=r,this.emit({kind:"paint",pad:r,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function Dr(e,t,n,o=Ho){let s=!1,i=0,r=(d,p)=>{let h=e.ownerDocument.elementFromPoint?.(d,p),b=[...e.querySelectorAll(t)],f=h?b.findIndex(u=>u===h||u.contains(h)):-1;if(f>=0)return f;let x=-1,y=Number.POSITIVE_INFINITY;return b.forEach((u,m)=>{if(u.hidden)return;let w=u.getBoundingClientRect();if(p<w.top||p>w.bottom)return;let g=Math.abs(d-(w.left+w.width/2));g<y&&g<=w.width&&(x=m,y=g)}),x},l=new Nr(r,d=>{(d.kind==="paint"||d.kind==="long")&&(s=!0),n(d)},o),c=()=>{i&&clearTimeout(i),i=0};return e.addEventListener("pointerdown",d=>{d.button>0||(s=!1,l.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),i=setTimeout(()=>l.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{l.state!=="idle"&&(l.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),l.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),l.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),l.cancel(d.pointerId)}),e.addEventListener("click",d=>{s&&(s=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),l}var Oo="netcomposer.groups.v1";function Kn(){try{return globalThis.localStorage??null}catch{return null}}function _o(e=Kn(),t=Oo){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[s,i]of Object.entries(n))typeof i=="boolean"&&o.set(s,i);return o}catch{return new Map}}function qr(e,t,n,o=Oo){let s=_o(e,o);s.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(s)))}catch{}}function Pr(e,t=Kn()){return _o(t).get(e.id)??e.open===!0}function Ir(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let s=document.createElement("button");s.type="button",s.className="nc-group-toggle",s.id=`${e.id}-group-toggle`;let i=document.createElement("span");i.className="nc-group-title";let r=document.createElement("span");r.className="nc-group-summary";let l=document.createElement("span");l.className="nc-group-mark",l.setAttribute("aria-hidden","true"),s.append(i,r,l);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",s.id),s.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return s.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";qr(Kn(),e.id,d),An(o,d);let p=t(o);p?.type==="group"&&p.onToggle?.(d)}),o.append(s,c),Vo(o,e),An(o,Pr(e)),Go(o,e),o}function An(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let s=n?.querySelector(".nc-group-mark");s&&(s.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Vo(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Go(e,t){Vo(e,t)&&An(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),s=t.summary??"";o&&o.textContent!==s&&(o.textContent=s)}var mt="application/x-nc-pad",La="http://www.w3.org/2000/svg";function jr(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],s=[];for(let i=0;i<n;i++){let r=Math.floor(i*t/n),l=Math.max(r+1,Math.floor((i+1)*t/n)),c=0,d=0;for(let h=r;h<l;h++)c=Math.min(c,e[2*h]??0),d=Math.max(d,e[2*h+1]??0);let p=n===1?50:i/(n-1)*100;o.push(`${p.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),s.push(`${p.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${s.reverse().join("L")}Z`}function Br(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((s,i)=>o.append(Rr(n,i,t))),n.append(o),n.addEventListener("keydown",s=>{s.key==="Escape"&&$t(n)}),Uo(n,e),n}function Rr(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let s=document.createElement("span");s.className="nc-padgrid-pad-bar",s.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-padgrid-pad-name";let r=document.createElement("span");r.className="nc-padgrid-pad-hint";let l=document.createElement("span");l.className="nc-padgrid-pad-badge";let c=document.createElementNS(La,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(La,"path");return c.append(d),o.append(s,i,r,l,c),Or(e,o,t,n),i.addEventListener("dblclick",()=>{let p=n(e);p?.type==="padGrid"&&p.onRename&&o.dataset.empty!=="true"&&Wo(e,o,t,n)}),o.addEventListener("dragstart",p=>{if(o.dataset.empty==="true"||!p.dataTransfer){p.preventDefault();return}p.dataTransfer.setData(mt,String(t)),p.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",p=>{let h=p.dataTransfer?.types??[];!h.includes("Files")&&!h.includes(mt)||(p.preventDefault(),p.stopPropagation(),p.dataTransfer&&(p.dataTransfer.dropEffect=h.includes(mt)&&!p.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",p=>{delete o.dataset.drop;let h=n(e);if(h?.type!=="padGrid")return;let b=p.dataTransfer?.getData(mt);if(b!==void 0&&b!==""){p.preventDefault(),p.stopPropagation();let x=Number(b);x!==t&&h.onMove?.(x,t,p.altKey);return}let f=p.dataTransfer?.files?.[0];f&&(p.preventDefault(),p.stopPropagation(),h.onFile?.(t,f))}),o}function Hr(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function Or(e,t,n,o){let s=0,i=!1,r=0,l=0,c=()=>{window.clearTimeout(s),s=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;i=!1,r=d.clientX,l=d.clientY,c();let p=o(e);p?.type==="padGrid"&&(p.onDown?.(n),!(p.onDown&&d.pointerType==="mouse")&&(s=window.setTimeout(()=>{s=0,i=Ca(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{s&&Math.hypot(d.clientX-r,d.clientY-l)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),i=Ca(e,t,n,o)}),t.addEventListener("click",()=>{if(i){i=!1;return}Hr(e,n,o)})}function Ca(e,t,n,o){let s=o(e);if(s?.type!=="padGrid"||!s.menu)return!1;let i=s.menu(n);if(!i.length)return!1;$t(e);let r=document.createElement("div");r.className="nc-slot-scrim",r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),$t(e)}),r.addEventListener("click",p=>p.stopPropagation());let l=document.createElement("div");l.className="nc-slot-menu nc-padgrid-pad-menu",l.setAttribute("role","menu"),l.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let p of i){let h=document.createElement("button");h.type="button",h.className="nc-menu-btn",h.setAttribute("role","menuitem"),h.dataset.ncMenuItem=p.id,h.textContent=p.label,h.addEventListener("click",()=>{$t(e);let b=o(e);b?.type==="padGrid"&&(p.id==="rename"&&b.onRename?Wo(e,t,n,o):b.onMenu?.(n,p.id))}),l.append(h)}e.append(r,l);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return l.style.left=`${d.left-c.left}px`,l.style.top=`${d.bottom-c.top}px`,l.querySelector("button")?.focus(),!0}function Wo(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let s=o(e);if(s?.type!=="padGrid")return;let i=document.createElement("input");i.type="text",i.className="nc-padgrid-rename",i.maxLength=s.nameMax??24,i.value=s.pads[n]?.label??"",i.setAttribute("aria-label",`Name of pad ${n+1}`);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();i.style.left=`${l.left-r.left}px`,i.style.top=`${l.top-r.top}px`,i.style.width=`${l.width}px`;let c=!1,d=p=>{if(c)return;c=!0;let h=i.value.trim();i.remove(),t.focus();let b=o(e);p&&h&&b?.type==="padGrid"&&b.onRename?.(n,h)};i.addEventListener("keydown",p=>{p.stopPropagation(),p.key==="Enter"?d(!0):p.key==="Escape"&&d(!1)}),i.addEventListener("blur",()=>d(!0));for(let p of["pointerdown","click","dblclick"])i.addEventListener(p,h=>h.stopPropagation());e.append(i),i.focus(),i.select()}function $t(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Uo(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,s)=>{let i=n[s];if(!(i instanceof HTMLButtonElement))return;let r=i.querySelector(".nc-padgrid-pad-name"),l=i.querySelector(".nc-padgrid-pad-hint"),c=i.querySelector(".nc-padgrid-pad-wave path"),d=i.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),i.draggable=!o.empty,o.empty?(i.dataset.empty="true",r&&(r.textContent=t.emptyLabel??"Load"),l&&(l.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete i.dataset.empty,r&&(r.textContent=o.label),l&&(l.textContent=o.hint??""),c?.setAttribute("d",jr(o.peaks))),!o.empty&&o.hint?i.dataset.hint="true":delete i.dataset.hint,o.lane?i.dataset.ncLane=String(o.lane):delete i.dataset.ncLane;let p=t.selected===s;p?i.dataset.selected="true":delete i.dataset.selected,i.setAttribute("aria-pressed",p?"true":"false"),o.playing?i.dataset.playing="true":delete i.dataset.playing,i.setAttribute("aria-label",o.empty?`Pad ${s+1}, empty: load a sample`:`Pad ${s+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${p?", selected":""}`)})}function J(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Bt(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let s=document.createElement("span");return s.className="nc-readout",s.dataset.ncReadout="",n.append(o,s),n}function za(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function it(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var _r=450,Fa=8;function le(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function Vr(e){let t=xi(e,"target-min");return t>0?t:44}function Gr(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=Vr(e),o=n/2,s=t.map(i=>i.parentElement?.getBoundingClientRect()??null);for(let i=0;i<t.length;i++){let r=t[i],l=s[i];if(!(r instanceof HTMLElement)||!l||l.width===0||l.height===0)continue;if(l.width>=n&&l.height>=n){r.style.display="none";continue}let c=l.left+l.width/2,d=l.top+l.height/2,p=c-o,h=c+o,b=d-o,f=d+o;for(let x=0;x<t.length;x++){if(i===x)continue;let y=s[x];if(!y||y.width===0)continue;let u=y.left+y.width/2,m=y.top+y.height/2;Math.abs(m-d)<o*2&&(u>c?h=Math.min(h,(c+u)/2):u<c&&(p=Math.max(p,(c+u)/2))),Math.abs(u-c)<o*2&&(m>d?f=Math.min(f,(d+m)/2):m<d&&(b=Math.max(b,(d+m)/2)))}p=Math.min(p,l.left),h=Math.max(h,l.right),b=Math.min(b,l.top),f=Math.max(f,l.bottom),r.style.left=`${p-l.left}px`,r.style.top=`${b-l.top}px`,r.style.width=`${Math.max(0,h-p)}px`,r.style.height=`${Math.max(0,f-b)}px`,r.style.transform="none"}}function Yo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function Na(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function Te(e,t){switch(e.type){case"slider":return Wr(e,t);case"select":return Yr(e,t);case"toggle":return Kr(e,t);case"button":return Xr(e,t);case"readout":return Jr(e);case"label":return tl(e);case"note":return Da(e);case"knob":return ol(e,t);case"choice":return sl(e,t);case"slotRow":return il(e,t);case"stepGrid":return dl(e,t);case"canvas":return ml(e);case"fx":return kl(e,t);case"eqGraph":return Zi(e,t);case"levelSteps":return br(e,t);case"group":return Ir(e,t,Te);case"strip":return fl(e,t);case"stripAdd":return yl(e,t);case"padGrid":return Br(e,t);case"moves":return Zr(e,t);default:return Da({id:"unknown",text:""})}}function oe(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Jo(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Ko(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let s=e.querySelector("[data-nc-readout]");s&&(s.textContent=t.valueText??it(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),za(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")za(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&ve(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&nl(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??it(t.value))}else if(t.type==="choice")Qo(e,t);else if(t.type==="slotRow")es(e,t);else if(t.type==="stepGrid")Mn(e,t);else if(t.type==="padGrid")Uo(e,t);else if(t.type==="moves")Xo(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&Ao(n,t)}else if(t.type==="eqGraph")To(e,t);else if(t.type==="levelSteps")Po(e,t);else if(t.type==="strip"){os(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Re(n.id)}"]`);o instanceof Element&&oe(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")ns(e,t);else if(t.type==="group"){Go(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Re(n.id)}"]`);o instanceof Element&&oe(o,n)}}else if(t.type==="fx"){hs(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Re(n.id)}"]`);o instanceof Element&&oe(o,n)}}}}function Wr(e,t){let n=Bt(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let s=ut(e.taper,e.min,e.max);o.min=String(s?0:e.min),o.max=String(s?1e3:e.max),o.step=String(s?1:e.step),s&&(o.dataset.ncTaper=e.taper),o.value=String(Ko(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let i=l=>s?Tt(l.taper??e.taper,l.min,l.max,o.value,l.step):Number(o.value);o.addEventListener("input",()=>{let l=t(o);l?.type==="slider"&&l.onChange(i(l))}),o.addEventListener("change",()=>{let l=t(o);l?.type==="slider"&&l.onCommit?.(i(l))}),s&&o.addEventListener("keydown",l=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,p=_n(d,c.min,c.max,c.value,l.key,l.shiftKey,c.step);p!==null&&(l.preventDefault(),o.value=String(st(d,c.min,c.max,p)),c.onChange(p),c.onCommit?.(p))});let r=n.querySelector("[data-nc-readout]");return n.insertBefore(o,r),e.onTap&&n.insertBefore(Ur(e,o,t),r),n.append(J()),oe(n,e),n}function Ko(e){return ut(e.taper,e.min,e.max)?st(e.taper,e.min,e.max,e.value):e.value}function Ur(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(le());let s=i=>{let r=n(t);r?.type==="slider"&&r.onTap?.(i)};return o.addEventListener("pointerdown",i=>{i.button===0&&s(i.timeStamp)}),o.addEventListener("keydown",i=>{i.repeat||i.key!=="Enter"&&i.key!==" "||(i.preventDefault(),s(i.timeStamp))}),o}function Yr(e,t){let n=Bt(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let s=null;for(let i of e.options){let r=document.createElement("option");r.value=i.value,r.textContent=i.label,i.disabled&&(r.disabled=!0),i.group?s?.getAttribute("label")!==i.group&&(s=document.createElement("optgroup"),s.setAttribute("label",i.group),o.append(s)):s=null,(s??o).append(r)}return o.value=e.value,o.addEventListener("change",()=>{let i=t(o);i?.type==="select"&&i.onChange(o.value)}),n.append(o,J()),n}function Kr(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(J()),oe(n,e),n}function Xr(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let i=t(n);i?.type==="button"&&i.onPress()}),n.append(J()),oe(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let s=document.createElement("button");return s.type="button",s.className="nc-sparkle-btn",s.dataset.ncSparkle=e.id,s.setAttribute("aria-label","Surprise me"),s.title=e.sparkleTitle??"Surprise me",s.innerHTML=Yo(),s.addEventListener("click",()=>{let i=n.closest(".nc-module")?.querySelector(".nc-slot-row");i instanceof HTMLElement&&ts(i);let r=t(n);r?.type==="button"&&r.onSparkle?.()}),o.append(n,s),o}function Jr(e){let t=Bt(e.id,e.label);return t.append(J()),oe(t,e),t}var Qr=450;function Zr(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let s=document.createElement("div");s.className="nc-moves-row",s.setAttribute("role","group"),s.setAttribute("aria-label",o.label),o.title&&(s.title=o.title);let i=document.createElement("span");i.className="nc-moves-label",i.setAttribute("aria-hidden","true"),i.textContent=o.label;let r=document.createElement("div");r.className="nc-moves-btns";for(let l of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=l.id,c.title=l.title??l.text,c.setAttribute("aria-label",`${o.label} ${l.text}`),c.append(el(l.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(l.id)}),r.append(c)}s.append(i,r),n.append(s)}return Xo(n,e),n}function Xo(e,t){for(let n of t.groups)for(let o of n.moves){let s=e.querySelector(`[data-nc-move="${Re(o.id)}"]`);s instanceof HTMLButtonElement&&(s.disabled=o.disabled===!0)}}function el(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function tl(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(J()),t}function Da(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(J()),t}function qa(e){if(typeof e.valueText=="string")return e.valueText;let t=it(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Jo(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function nl(e,t){let n=Mt(t.taper,t.min,t.max,t.value);Jo(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let s=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Mt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,s))),e.style.setProperty("--knob-to",String(Math.max(o,s)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",qa(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${qa(t)}`}function al(e,t){if(ut(e.taper,e.min,e.max))return _n(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,s=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+s:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-s:null}function ol(e,t){let n=Bt(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let s=document.createElement("i");s.className="nc-knob-mark",o.append(s);let i=0,r=0;o.addEventListener("pointerdown",d=>{i=d.clientY;let p=t(o);r=p&&"value"in p?Number(p.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let l=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",l),o.addEventListener("pointercancel",l),o.addEventListener("lostpointercapture",l),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let p=t(o);if(p?.type!=="knob")return;if(ut(p.taper,p.min,p.max)){let f=Mt(p.taper,p.min,p.max,r)-(d.clientY-i)/120;p.onChange(ko(p.taper,p.min,p.max,f));return}let h=p.max-p.min||1,b=Math.min(p.max,Math.max(p.min,r-(d.clientY-i)*h/120));p.onChange(b)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let p=t(o);if(p?.type!=="knob")return;let h=al(p,d);h!==null&&(d.preventDefault(),p.onChange(Math.min(p.max,Math.max(p.min,h))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(J()),oe(n,e),n}function sl(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let s=document.createElement("button");s.type="button",s.className="nc-choice",s.dataset.ncChoice=o.value,s.setAttribute("role","tab"),s.textContent=o.label,s.addEventListener("click",()=>{let i=t(n);i?.type==="choice"&&i.onChange(o.value)}),s.addEventListener("keydown",i=>{let r=[...n.querySelectorAll("[data-nc-choice]")],l=r.indexOf(s),c=l;if(i.key==="ArrowRight"||i.key==="ArrowDown")c=(l+1)%r.length;else if(i.key==="ArrowLeft"||i.key==="ArrowUp")c=(l-1+r.length)%r.length;else if(i.key==="Home")c=0;else if(i.key==="End")c=r.length-1;else return;let d=r[c];d instanceof HTMLButtonElement&&(i.preventDefault(),d.focus(),d.click())}),n.append(s)}return n.append(J()),Qo(n,e),n}function Qo(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function il(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let p=0;p<e.slots.length;p++){let h=e.slots[p],b=document.createElement("span");b.className="nc-snap-wrap";let f=document.createElement("button");f.type="button",f.className="nc-snap",f.dataset.ncSlot=String(p),f.textContent=h.label,f.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",b.append(f,le()),rl(b,f,n,p,t),o.append(b)}let s=e.onSparkle?document.createElement("button"):null;s&&(s.type="button",s.className="nc-sparkle",s.setAttribute("aria-label","Surprise me"),s.innerHTML=Yo(),s.append(le()),s.addEventListener("click",()=>{ts(n);let p=t(n);p?.type==="slotRow"&&p.onSparkle?.()}));let i=document.createElement("div");i.className="nc-field nc-morph-field",i.dataset.ncSlider="";let r=document.createElement("span");r.className="nc-label",r.textContent="Morph";let l=document.createElement("input");l.type="range",l.className="nc-range nc-morph",l.min="0",l.max="4",l.step="0.01",l.setAttribute("aria-label","Morph time"),l.addEventListener("input",()=>{let p=t(n);p?.type==="slotRow"&&p.onMorph(Number(l.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",i.append(r,c,l);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...s?[s]:[]),n.append(d,i,J()),Zo(n,t),es(n,e),n}function Pa(e,t,n,o){let s=n(e);if(s?.type!=="slotRow")return;Qe(e);let i=o.shiftKey?"store":o.altKey?"clear":"recall";s.onSlot(t,i)}function rl(e,t,n,o,s){let i=0,r=0,l=0,c=!1,d=!1,p=!1,h=!1,b=()=>{window.clearTimeout(i),i=0},f=m=>{let w=m.clientX-r,g=m.clientY-l;w*w+g*g>Fa*Fa&&(c=!0,b())},x=()=>{h&&(h=!1,window.removeEventListener("pointermove",f),window.removeEventListener("pointerup",y),window.removeEventListener("pointercancel",u))},y=m=>{let w=i!==0&&!c&&!d;b(),x(),w&&(p=!0,Pa(n,o,s,m))},u=()=>{c=!0,b(),x()};e.addEventListener("pointerdown",m=>{m.button===0&&(x(),d=!1,c=!1,p=!1,r=m.clientX,l=m.clientY,b(),i=window.setTimeout(()=>{i=0,!c&&(d=!0,ll(n,t,o,s))},_r),h=!0,window.addEventListener("pointermove",f),window.addEventListener("pointerup",y),window.addEventListener("pointercancel",u))}),e.addEventListener("contextmenu",m=>m.preventDefault()),e.addEventListener("click",m=>{if(p||d||c){p=!1,d=!1,c=!1;return}Pa(n,o,s,m)})}function Zo(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=Ia("Save","store"),s=Ia("Clear","clear");n.append(o,s);let i=document.createElement("div");i.className="nc-slot-scrim",i.hidden=!0,i.setAttribute("aria-hidden","true"),i.addEventListener("pointerdown",r=>{r.preventDefault(),r.stopPropagation(),Qe(e)}),i.addEventListener("click",r=>r.stopPropagation()),e.append(i,n),n.addEventListener("click",r=>{let l=r.target;if(!(l instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);l.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),Qe(e)):l.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),Qe(e))}),e.addEventListener("keydown",r=>{r.key==="Escape"&&Qe(e)})}function Ia(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function ll(e,t,n,o){Zo(e,o);let s=e.querySelector(".nc-slot-menu");if(!(s instanceof HTMLElement))return;let i=e.querySelector(".nc-slot-scrim");i instanceof HTMLElement&&(i.hidden=!1),s.hidden=!1,s.dataset.ncIndex=String(n);let r=e.getBoundingClientRect(),l=t.getBoundingClientRect();s.style.left=`${l.left-r.left}px`,s.style.top=`${l.bottom-r.top}px`,s.querySelector("button")?.focus()}function Qe(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function es(e,t){for(let s of e.querySelectorAll("[data-nc-slot]")){if(!(s instanceof HTMLButtonElement))continue;let i=Number(s.dataset.ncSlot),r=t.slots[i];if(!r)continue;s.textContent=r.label,r.filled?s.dataset.filled="true":delete s.dataset.filled,r.active?s.dataset.active="true":delete s.dataset.active,r.edited?s.dataset.edited="true":delete s.dataset.edited,r.queued?s.dataset.queued="true":delete s.dataset.queued,r.queued&&r.pulse?s.dataset.pulse="true":delete s.dataset.pulse;let l=[r.filled?"saved":"empty",r.active?"playing":"",r.edited?"edited":"",r.queued?"queued, tap again to switch now":""];s.setAttribute("aria-label",[r.label,...l.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function ts(e){let t=e.dataset.ncLastFill||null,n=ii(t);e.dataset.ncLastFill=n;let o=ri(n);if(o)for(let[s,i]of Object.entries(o))e.style.setProperty(s,i)}function cl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,s=i=>{if(o===i)return;o=i,n.setAttribute("aria-pressed",i?"true":"false");let r=t(e);r?.type==="stepGrid"&&r.onFill?.(i)};n.addEventListener("pointerdown",i=>{i.button===0&&(i.preventDefault(),n.setPointerCapture?.(i.pointerId),s(!0))});for(let i of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(i,()=>s(!1));return n.addEventListener("keydown",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),i.repeat||s(!0))}),n.addEventListener("keyup",i=>{i.key!==" "&&i.key!=="Enter"||(i.preventDefault(),s(!1))}),n.addEventListener("contextmenu",i=>i.preventDefault()),n}function dl(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let s=u=>{let m=document.createElement("button");return m.type="button",m.setAttribute("role","radio"),m.textContent=u,o.append(m),m},i=s("Note"),r=s("Accent");r.dataset.ncAccentMode="";let l=u=>{for(let m of[i,r]){let w=m===u;m.setAttribute("aria-checked",w?"true":"false"),m.tabIndex=w?0:-1}};l(i);for(let u of[i,r])u.addEventListener("click",()=>l(u));o.addEventListener("keydown",u=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(u.key))return;u.preventDefault();let m=r.getAttribute("aria-checked")==="true"?i:r;l(m),m.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(cl(n,t)),e.onClear){let u=document.createElement("button");u.type="button",u.className="nc-fill nc-clear",u.dataset.ncClear="",u.textContent=e.clearLabel??"Clear",u.title="Clear every step (Undo takes it back)",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.onClear?.()}),c.append(u)}n.append(c);for(let u of e.rows){let m=document.createElement("div");m.className="nc-row",m.dataset.ncRow="";let w=document.createElement("button");w.type="button",w.className="nc-name",w.textContent=u.label,w.setAttribute("aria-label",`Select ${u.label}`),u.lane&&(w.dataset.ncLane=String((u.lane-1)%4+1));let g=!1,k=0;w.addEventListener("pointerdown",v=>{g=!1,!(v.pointerType==="mouse"||v.button!==0)&&(k=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(g=!0,A.onSelectRow?.(A.rows.findIndex($=>$.id===u.id),!0))},Qr))});for(let v of["pointerup","pointercancel","pointerleave"])w.addEventListener(v,()=>window.clearTimeout(k));w.addEventListener("contextmenu",v=>{g&&v.preventDefault()}),w.addEventListener("click",v=>{let A=t(n);if(A?.type!=="stepGrid")return;if(g){g=!1;return}let $=A.rows.findIndex(S=>S.id===u.id),M=!!A.selectedRows&&(v.shiftKey||v.metaKey||v.ctrlKey);A.onSelectRow?.($,M)}),w.addEventListener("keydown",v=>pl(n,w,v));let L=[];for(let v of["mute","solo"]){if(!(v==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let $=document.createElement("button");$.type="button",$.className="nc-ms",$.dataset.ncMs=v,$.textContent=v==="mute"?"M":"S",$.setAttribute("aria-label",`${v==="mute"?"Mute":"Solo"} ${u.label}`),A.append($,le()),A.addEventListener("click",()=>{let M=t(n);if(M?.type!=="stepGrid")return;let S=M.rows.findIndex(C=>C.id===u.id);(v==="mute"?M.onMute:M.onSolo)?.(S)}),L.push(A)}let E=document.createElement("div");E.className="nc-steps";for(let v=0;v<u.steps.length;v++){let A=document.createElement("span");A.className="nc-step-wrap";let $=document.createElement("button");$.type="button",$.className="nc-step",$.dataset.ncStep=`${u.id}:${v}`,$.setAttribute("aria-label",`${u.label} step ${v+1}`),A.append($,le()),A.addEventListener("click",M=>{let S=t(n);if(S?.type!=="stepGrid")return;let C=S.rows.findIndex(D=>D.id===u.id),F=r.getAttribute("aria-checked")==="true";S.onToggle(C,v,M.shiftKey||F)}),E.append(A)}if(e.onLength&&E.append(ul(n,E,u,t)),m.append(...L,w,E),e.onDice){let v=document.createElement("button");v.type="button",v.className="nc-sparkle nc-row-dice",v.dataset.ncDice=u.id,v.setAttribute("aria-label",`Re-roll ${u.label}`),v.title=`Re-roll ${u.label}: new steps for this lane (Undo takes it back)`,v.innerHTML=Na(),v.append(le()),v.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex($=>$.id===u.id))}),m.append(v)}m.addEventListener("click",v=>{if(v.target!==m)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex($=>$.id===u.id))}),ja(n,E,".nc-step-wrap",t,r,()=>u.id),n.append(m)}let d=document.createElement("div");d.className="nc-pads-head";let p=(u,m,w)=>{let g=document.createElement("button");return g.type="button",g.className=u,g.textContent=m,w&&g.setAttribute("aria-label",w),g},h=p("nc-pads-step","‹","Previous lane"),b=p("nc-pads-step","›","Next lane"),f=document.createElement(e.onLength?"button":"span");f.className="nc-pads-label",f.setAttribute("aria-live","polite"),e.onLength&&(f.type="button",f.dataset.ncLenToggle="",f.addEventListener("click",()=>{let u=t(n);u?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Mn(n,u))}));for(let[u,m]of[[h,-1],[b,1]])u.addEventListener("click",()=>{let w=t(n);if(w?.type!=="stepGrid"||w.rows.length===0)return;let g=w.rows.length;w.onSelectRow?.(((ft(w)+m)%g+g)%g)});if(d.append(h,f,b),e.onDice){let u=p("nc-pads-step nc-pads-dice","","Re-roll lane");u.dataset.ncPadsDice="",u.innerHTML=Na(),u.addEventListener("click",()=>{let m=t(n);if(m?.type!=="stepGrid")return;let w=ft(m);w>=0&&m.onDice?.(w)}),d.append(u)}if(e.transport){let u=p("nc-pads-play","Play");u.dataset.ncPadsPlay="",u.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&m.transport?.onToggle()}),d.append(u)}n.append(d);let x=document.createElement("div");x.className="nc-pads",x.setAttribute("role","group");let y=Math.max(0,...e.rows.map(u=>u.steps.length));for(let u=0;u<y;u++){let m=document.createElement("button");m.type="button",m.className="nc-pad",m.dataset.ncPad=String(u),m.textContent=String(u+1),m.addEventListener("click",w=>{let g=t(n);if(g?.type!=="stepGrid")return;let k=ft(g);if(k<0)return;if(n.dataset.ncLenMode==="true"){g.onLength?.(k,u+1);return}let L=r.getAttribute("aria-checked")==="true";g.onToggle(k,u,w.shiftKey||L)}),x.append(m)}return ja(n,x,".nc-pad",t,r,()=>{let u=t(n);return u?.type==="stepGrid"?u.rows[ft(u)]?.id:void 0}),n.append(x),n.append(J()),Mn(n,e),n}function ft(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function ja(e,t,n,o,s,i){let r="on",l=!0,c=-1,d=(p,h)=>{let b=p.rows[c]?.steps[h];!b||h>=p.rows[c].length||(p.onSet?p.onSet(c,h,r,l):!!b[r]!==l&&p.onToggle(c,h,r==="accent"))};Dr(t,n,p=>{let h=o(e);if(h?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(p.kind!=="paint")return;let b=h.rows.findIndex(f=>f.id===i());b>=0&&h.rows[b].length!==p.pad+1&&h.onLength?.(b,p.pad+1);return}if(p.kind==="paint"){if(p.phase==="start"){let b=i();c=h.rows.findIndex(x=>x.id===b);let f=h.rows[c]?.steps[p.pad];if(!f)return;r=s.getAttribute("aria-checked")==="true"?"accent":"on",l=!f[r]}d(h,p.pad)}else if(p.kind==="long"){let b=i(),f=h.rows.findIndex(y=>y.id===b),x=t.querySelectorAll(n)[p.pad];f>=0&&x instanceof HTMLElement&&h.onLongPress?.(f,p.pad,x)}}})}function pl(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],s=o.indexOf(t),i=s;n.key==="ArrowDown"?i=s+1:n.key==="ArrowUp"?i=s-1:n.key==="Home"?i=0:i=o.length-1;let r=o[i];!(r instanceof HTMLElement)||r===t||(n.preventDefault(),r.focus(),r.click())}function ul(e,t,n,o){let s=document.createElement("button");s.type="button",s.className="nc-len-handle",s.dataset.ncLen=n.id,s.setAttribute("role","slider"),s.setAttribute("aria-valuemin","1"),s.setAttribute("aria-valuemax",String(n.steps.length)),s.append(le());let i=d=>{let p=o(e);if(p?.type!=="stepGrid")return;let h=p.rows.findIndex(x=>x.id===n.id),b=p.rows[h];if(!b)return;let f=Math.max(1,Math.min(b.steps.length,d));f!==b.length&&p.onLength?.(h,f)},r=d=>{let p=[...t.querySelectorAll(".nc-step")],h=1;return p.forEach((b,f)=>{let x=b.getBoundingClientRect();x.width>0&&d>=x.left+x.width/2&&(h=f+1)}),h},l=d=>i(r(d.clientX)),c=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete s.dataset.dragging};return s.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),s.dataset.dragging="true",window.addEventListener("pointermove",l),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),s.addEventListener("keydown",d=>{let p=o(e);if(p?.type!=="stepGrid")return;let h=p.rows.find(f=>f.id===n.id);if(!h)return;let b={ArrowLeft:h.length-1,ArrowDown:h.length-1,ArrowRight:h.length+1,ArrowUp:h.length+1,Home:1,End:h.steps.length};d.key in b&&(d.preventDefault(),i(b[d.key]))}),s}var en=new WeakMap,gt=new WeakMap;function hl(e){return e?(gt.has(e)||(gt.set(e,un(e)),go(t=>{gt.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))Sn(n,Number(n.getAttribute("data-nc-velocity")))},e)),gt.get(e)):"light"}function Sn(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:hl(e.ownerDocument),s=n===null?null:`${o} ${n}`;if(!(en.has(e)&&en.get(e)===s)){if(en.set(e,s),n===null){for(let i of Object.keys(ma(1)))e.style.removeProperty(i);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[i,r]of Object.entries(ma(n,ha[o]??ha.light)))e.style.setProperty(i,r)}}function Ba(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Mn(e,t){let n=t.rows.some(p=>p.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let s=e.querySelector(".nc-pads"),i=t.rows.find(p=>p.id===t.selectedRow)??t.rows[0],r=e.querySelector(".nc-pads-label"),l=e.dataset.ncLenMode==="true"&&!!t.onLength;r instanceof HTMLElement&&i&&(r.textContent=l?`${i.label} · ${i.length}`:i.label,t.onLength&&(r.setAttribute("aria-pressed",l?"true":"false"),r.setAttribute("aria-label",l?`${i.label} length ${i.length} steps: tap or drag the pads to set the end, tap here when done`:`${i.label}, ${i.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&i&&(c.setAttribute("aria-label",`Re-roll ${i.label}`),c.title=`Re-roll ${i.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let p=!!t.transport?.playing,h=t.transport?.label??(p?"Stop":"Play");d.textContent!==h&&(d.textContent=h),d.setAttribute("aria-pressed",p?"true":"false");let b=t.transport?.ariaLabel;b?d.setAttribute("aria-label",b):d.removeAttribute("aria-label")}if(s instanceof HTMLElement&&i){s.setAttribute("aria-label",`${i.label} steps`),i.lane&&(s.dataset.ncLane=String((i.lane-1)%4+1)),i.mute||n&&!i.solo?s.dataset.silent="true":delete s.dataset.silent;let p=i.length>0?(t.playhead%i.length+i.length)%i.length:-1;for(let h of s.querySelectorAll("[data-nc-pad]")){let b=Number(h.getAttribute("data-nc-pad")),f=i.steps[b];h instanceof HTMLButtonElement&&(h.hidden=!f||!l&&b>=i.length,l&&b>=i.length?h.dataset.out="true":delete h.dataset.out,l&&b===i.length-1?h.dataset.end="true":delete h.dataset.end,h.setAttribute("aria-label",`${i.label} step ${b+1}${f?.markLabel?`, ${f.markLabel}`:""}`),Ba(h,f),h.setAttribute("aria-pressed",f?.on?"true":"false"),f?.accent?h.dataset.accent="true":delete h.dataset.accent,f?.dim?h.dataset.dim="true":delete h.dataset.dim,Sn(h,f?.velocity),t.playhead>=0&&b===p?h.dataset.playhead="true":delete h.dataset.playhead)}}for(let p of t.rows){for(let f=0;f<p.steps.length;f++){let x=p.steps[f],y=e.querySelector(`[data-nc-step="${p.id}:${f}"]`);if(!(y instanceof HTMLButtonElement))continue;let u=y.closest(".nc-row");if(u instanceof HTMLElement){t.selectedRow===p.id?u.dataset.selected="true":delete u.dataset.selected;let k=t.selectedRow!==p.id&&(t.selectedRows??[]).includes(p.id);k?u.dataset.picked="true":delete u.dataset.picked;let L=u.querySelector(".nc-name");L instanceof HTMLElement&&(L.setAttribute("aria-pressed",t.selectedRow===p.id||k?"true":"false"),L.textContent!==p.label&&(L.textContent=p.label,L.setAttribute("aria-label",`Select ${p.label}`))),p.mute||n&&!p.solo?u.dataset.silent="true":delete u.dataset.silent;for(let E of u.querySelectorAll("[data-nc-ms]")){let v=E.getAttribute("data-nc-ms")==="mute"?p.mute:p.solo;E.setAttribute("aria-pressed",v?"true":"false")}}y.setAttribute("aria-pressed",x.on?"true":"false");let m=`${p.label} step ${f+1}${x.markLabel?`, ${x.markLabel}`:""}`;y.getAttribute("aria-label")!==m&&y.setAttribute("aria-label",m),Ba(y,x),x.accent?y.dataset.accent="true":delete y.dataset.accent,x.dim?y.dataset.dim="true":delete y.dataset.dim,f%4===0?y.dataset.bar="true":delete y.dataset.bar,typeof x.velocity=="number"?(y.dataset.velocity="true",y.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,x.velocity))*100)}%`)):(delete y.dataset.velocity,y.style.removeProperty("--level")),Sn(y,x.velocity);let w=t.playhead>=0&&p.length>0?(t.playhead%p.length+p.length)%p.length:-1;f===w?y.dataset.playhead="true":delete y.dataset.playhead;let g=!!t.onLength&&t.selectedRow===p.id;y.hidden=f>=p.length&&!g,f>=p.length&&g?y.dataset.out="true":delete y.dataset.out}let h=e.querySelector(`[data-nc-len="${p.id}"]`),b=e.querySelector(`[data-nc-step="${p.id}:${Math.max(0,p.length-1)}"]`)?.closest(".nc-step-wrap");if(h instanceof HTMLElement&&b&&b.nextElementSibling!==h){let f=document.activeElement===h;b.after(h),f&&h.focus()}h instanceof HTMLElement&&(h.setAttribute("aria-valuenow",String(p.length)),h.setAttribute("aria-label",`${p.label} length, ${p.length} steps`),h.title=`${p.label}: drag to set the length (${p.length} steps)`)}}function ml(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,J()),t}function fl(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let s=document.createElement("span");s.className="nc-strip-name",s.dataset.ncStripName="";let i=!e.master&&typeof e.onFold=="function",r=null;i&&(n.dataset.ncFoldable="",r=ls(),r.dataset.ncStripHide="",r.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==r&&r.focus())})),o.append(s);let l=null;if(!e.master&&typeof e.onMove=="function"){l=document.createElement("button"),l.type="button",l.className="nc-strip-grip",l.dataset.ncStripGrip="",l.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let g=document.createElement("span");g.className="nc-strip-grip-dots",g.setAttribute("aria-hidden","true"),l.append(g),l.addEventListener("keydown",k=>{if(k.key!=="ArrowLeft"&&k.key!=="ArrowRight"||k.ctrlKey||k.metaKey||k.shiftKey)return;let L=t(n);L?.type==="strip"&&(k.preventDefault(),L.onMove?.(k.key==="ArrowLeft"?-1:1))})}if(l&&typeof e.onShade=="function"&&(l.setAttribute("aria-haspopup","dialog"),l.addEventListener("click",()=>Oa(n,l,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",g=>{g.pointerType==="touch"||g.pointerType==="pen"||g.target instanceof Element&&g.target.closest("input, .nc-strip-remove")||(g.preventDefault(),Oa(n,o,t,{x:g.clientX,y:g.clientY}))}),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let k=t(n);k?.type==="strip"&&k.onRemove?.(g)}),o.append(g)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks",k.dataset.ncHacks="",g.append(k,le()),g.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onHacks?.()}),c.append(g)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let g=document.createElement("span");g.className="nc-hacks-wrap nc-sends-view-wrap";let k=document.createElement("button");k.type="button",k.className="nc-hacks nc-sends-view",k.dataset.ncSendsView="",g.append(k,le()),g.addEventListener("click",()=>{let L=t(n);L?.type==="strip"&&L.onSendsView?.()}),d.append(g)}for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let k=document.createElement("span");k.className="nc-ms-wrap";let L=document.createElement("button");L.type="button",L.className="nc-ms",L.dataset.ncMs=g,L.textContent=g==="mute"?"M":"S",k.append(L,le()),k.addEventListener("click",()=>{let E=t(n);E?.type==="strip"&&(g==="mute"?E.onMute:E.onSolo)?.()}),d.append(k)}let p=document.createElement("div");p.className="nc-strip-sends";for(let g of e.sends??[])p.append(Te({...g,type:"knob",compact:!0},t));let h=document.createElement("div");h.className="nc-strip-pan",e.pan&&h.append(Te(Xn(e),t));let b=document.createElement("div");b.className="nc-strip-body";let f=document.createElement("span");f.className="nc-scale",f.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let k=document.createElement("span");k.className="nc-scale-tick",k.style.setProperty("--tick-pos",String(g.value)),k.textContent=g.label,f.append(k)}let x=Mi({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let k=t(n);k?.type==="strip"&&k.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&Ha(g)}}),y=Ni({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(b.append(f,x.el,y.el),i){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let k=document.createElement("span");k.className="nc-strip-fold-cap",k.setAttribute("aria-hidden","true");let L=document.createElement("span");L.className="nc-ui-fx-fold-name",L.dataset.ncStripFoldName="";let E=document.createElement("span");E.className="nc-strip-fold-pan",E.setAttribute("aria-hidden","true"),E.hidden=!e.pan,g.append(k,E,L),g.addEventListener("click",()=>{let v=t(n);if(v?.type!=="strip")return;v.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),b.prepend(g)}let u=document.createElement("button");u.type="button",u.className="nc-strip-db",u.dataset.ncReadout="";let m=0;u.addEventListener("click",g=>{let k=t(n);k?.type!=="strip"||!k.onTypeIn||(window.clearTimeout(m),g.detail===0?Ra(n,u,t):g.detail===1&&(m=window.setTimeout(()=>Ra(n,u,t),wl)))}),u.addEventListener("dblclick",()=>{window.clearTimeout(m);let g=t(n);g?.type==="strip"&&Ha(g)});let w=document.createElement("div");return w.className="nc-strip-trim",e.trim&&w.append(Te(Jn(e),t)),r&&n.append(r),l&&n.append(l),n.append(o,w,c,d,p,h,b,u,J()),os(n,e),n}function Xn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??bl(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function Jn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??gl(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:s=>t.onChange(s)}}function gl(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function bl(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var wl=250;function Ra(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let s=document.createElement("input");s.type="text",s.className="nc-strip-db-input",s.inputMode="decimal",s.spellcheck=!1,s.autocomplete="off",s.value=o.valueText??it(o.value),s.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(s),s.focus(),s.select?.();let i=!1,r=l=>{if(i)return;i=!0;let c=s.value;if(s.remove(),t.hidden=!1,l){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};s.addEventListener("keydown",l=>{l.key==="Enter"?(l.preventDefault(),r(!0)):l.key==="Escape"&&(l.preventDefault(),r(!1))}),s.addEventListener("blur",()=>r(!1))}function yl(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-strip-add-plus",s.textContent="+";let i=document.createElement("span");i.className="nc-strip-add-label",o.append(s,i);let r=document.createElement("select");return r.className="nc-strip-add-select",r.addEventListener("change",()=>{let l=t(n),c=r.value;as(r),l?.type==="stripAdd"&&c&&l.onAdd(c)}),n.append(o,r,J()),ns(n,e),n}function ns(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let s=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],i=[...o.options].map(l=>`${l.value}|${l.textContent}|${l.disabled}`).join(","),r=s.map(l=>`${l.value}|${l.label}|${l.disabled===!0}`).join(",");i!==r&&(o.replaceChildren(...s.map(l=>{let c=document.createElement("option");return c.value=l.value,c.textContent=l.label,c.disabled=l.disabled===!0,c})),as(o))}function as(e){let t=e.options[0];t&&(t.selected=!0)}function Ha(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function os(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let s=e.querySelector(".nc-fader"),i=s?Ti(s):void 0;i&&(i.configure({step:t.step}),i.set(t.value),i.setText(t.valueText),i.setLabel(`${t.label} level`)),Di(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let r=e.querySelector(".nc-strip-db");if(r instanceof HTMLElement){let x=t.valueText??it(t.value);r.textContent!==x&&(r.textContent=x),r.setAttribute("aria-label",`${t.label} level ${x}`);let y=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";r.title=t.onTypeIn?`Click to type a value. ${y}`:y}for(let x of e.querySelectorAll("[data-nc-ms]")){let y=x.getAttribute("data-nc-ms"),u=y==="mute"?t.mute===!0:t.solo===!0;x.setAttribute("aria-pressed",u?"true":"false"),x.setAttribute("aria-label",`${y==="mute"?"Mute":"Solo"} ${t.label}`)}let l=e.querySelector("[data-nc-hacks]");if(l){let x=t.hacksLabel??"Hacks";l.textContent!==x&&(l.textContent=x),l.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),l.setAttribute("aria-label",`${x}: ${t.label}`),l.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let x=t.sendsViewLabel??"Sends";c.textContent!==x&&(c.textContent=x),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${x}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),ve(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let p=ss(t);if(p?e.dataset.ncShade=String(p):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let x=e.querySelector(`.nc-strip-trim [data-nc-id="${Re(t.trim.id)}"]`);x&&oe(x,Jn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let x=e.querySelector(`.nc-strip-pan [data-nc-id="${Re(t.pan.id)}"]`);x&&oe(x,Xn(t))}let h=!t.master&&typeof t.onFold=="function"&&t.folded===!0;h?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let b=e.querySelector("[data-nc-strip-hide]");b instanceof HTMLElement&&(cs(b,h,t.label),ve(b,t.foldHelp));let f=e.querySelector("[data-nc-strip-fold]");if(f instanceof HTMLElement){f.hidden=!h,f.setAttribute("aria-label",`Expand ${t.label}`);let x=f.querySelector("[data-nc-strip-fold-name]");x&&x.textContent!==t.label&&(x.textContent=t.label),ve(f,t.foldedHelp??t.foldHelp)}}function ss(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=is?t:0}var is=8,bt=null;function Oa(e,t,n,o){bt?.();let s=n(e);if(s?.type!=="strip")return null;let i=e.ownerDocument,r=i.defaultView??globalThis,l=i.createElement("div");l.className="nc-strip-menu",l.dataset.ncStripMenu="",l.setAttribute("role","dialog"),l.setAttribute("aria-label",`${s.label}: shade and place`);let c=i.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(s.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=i.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let p=ss(s),h=e.querySelector("[data-nc-strip-grip]")??t,b=(m=!1)=>{if(bt!==b)return;bt=null;let w=l.contains(i.activeElement);l.remove(),i.removeEventListener("keydown",x,!0),i.removeEventListener("pointerdown",y,!0),r.removeEventListener("resize",u),(m||w)&&h?.isConnected&&h.focus?.({preventScroll:!0})},f=[0,...Array.from({length:is},(m,w)=>w+1)].map(m=>{let w=i.createElement("button");return w.type="button",w.setAttribute("role","radio"),w.setAttribute("aria-checked",m===p?"true":"false"),w.setAttribute("tabindex",m===p?"0":"-1"),w.dataset.ncShadeChoice=String(m),m===0?(w.textContent="Auto",w.setAttribute("aria-label","Auto: alternate light and dark"),w.title="Auto: alternate light and dark"):(w.textContent=String(m),w.setAttribute("aria-label",`Shade ${m}`),w.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${m})`)),w.addEventListener("click",()=>{let g=n(e);b(!0),g?.type==="strip"&&g.onShade?.(m===0?null:m)}),w});if(d.append(...f),d.addEventListener("keydown",m=>{let w=f.indexOf(i.activeElement);if(w<0)return;let g=-1;m.key==="ArrowRight"||m.key==="ArrowDown"?g=(w+1)%f.length:m.key==="ArrowLeft"||m.key==="ArrowUp"?g=(w-1+f.length)%f.length:m.key==="Home"?g=0:m.key==="End"&&(g=f.length-1),!(g<0)&&(m.preventDefault(),f[w].setAttribute("tabindex","-1"),f[g].setAttribute("tabindex","0"),f[g].focus())}),l.append(c,d),typeof s.onMove=="function"){let m=[...e.parentElement?.children??[]].filter(g=>g.classList?.contains("nc-strip")&&!g.hasAttribute("data-nc-master")),w=m.indexOf(e);for(let[g,k,L]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let E=i.createElement("button");E.type="button",E.className="nc-strip-menu-item",E.dataset.ncStripMove=g<0?"left":"right";let v=i.createElement("span");v.textContent=k;let A=i.createElement("kbd");A.textContent=L,A.setAttribute("aria-hidden","true"),E.append(v,A),E.disabled=g<0?w<=0:w<0||w>=m.length-1,E.addEventListener("click",()=>{let $=n(e);b(!0),$?.type==="strip"&&$.onMove?.(g)}),l.append(E)}}i.body.append(l),(()=>{let m=t.getBoundingClientRect?.()??{bottom:0,right:0},w=l.offsetWidth,g=l.offsetHeight,k=r.innerWidth||i.documentElement.clientWidth||w,L=r.innerHeight||i.documentElement.clientHeight||g,E=o?o.x:m.right-w,v=o?o.y:m.bottom+4;E=Math.max(4,Math.min(E,k-w-4)),v+g>L-4&&(v=Math.max(4,(o?o.y:m.top)-g-4)),l.style.left=`${Math.round(E)}px`,l.style.top=`${Math.round(v)}px`})();let x=m=>{if(m.key==="Escape")m.preventDefault(),m.stopPropagation(),b(!0);else if(m.key==="Tab"&&l.contains(i.activeElement)){let w=[...l.querySelectorAll("button:not([disabled])")].filter(k=>k.getAttribute("tabindex")!=="-1"),g=(w.indexOf(i.activeElement)+(m.shiftKey?-1:1)+w.length)%w.length;m.preventDefault(),w[g]?.focus()}},y=m=>{l.contains(m.target)||b(!1)},u=()=>b(!1);return i.addEventListener("keydown",x,!0),i.addEventListener("pointerdown",y,!0),r.addEventListener("resize",u),bt=b,(f.find(m=>m.getAttribute("tabindex")==="0")??f[0]).focus({preventScroll:!0}),{el:l,close:()=>b(!1)}}var Tn=typeof ResizeObserver=="function"?new ResizeObserver(xl):null;function xl(e){for(let t of e){if(!t.target.isConnected){Tn.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&vl(n)}}function vl(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,s=n instanceof HTMLElement?n.offsetHeight:0,i=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+s+i}px`)}function $l(e){if(Tn)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Tn.observe(t)}function kl(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let s=typeof e.onFold=="function",i=!!e.meter,r=typeof e.onRemove=="function";if(e.on===void 0&&!s&&!Ft(e)&&!i&&!r)n.append(o);else{let l=document.createElement("div");if(l.className="nc-ui-fx-hd",l.append(o),i&&l.append(ps(n,"head")),e.on!==void 0){let c=xo({checked:e.on,labelledBy:o.id,onChange:d=>{let p=t(c.el);p?.type==="fx"&&p.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",l.append(c.el)}s&&l.append(Al(n,t)),Ft(e)&&l.append(Ll(n,t)),r&&l.append(Cl(t)),n.append(l)}s&&n.prepend(Sl(n,t)),i&&us(n,e);for(let l of e.controls)n.append(Te(l,t));if(e.more?.length){let l=document.createElement("details");l.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",l.append(c);for(let d of e.more)l.append(Te(d,t));n.append(l)}return n.append(J()),hs(n,e),$l(n),n}var El=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function rs(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&El(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Al(e,t){let n=ls();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),rs(e))}),n}function ls(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function cs(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Sl(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let s=document.createElement("span");s.className="nc-ui-fx-fold-name",s.dataset.ncFxFoldName="";let i=document.createElement("span");return i.className="nc-fold-tri",i.setAttribute("aria-hidden","true"),n.append(i,o,s),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(ps(e,"fold")),n.addEventListener("click",()=>{let r=t(n);if(r?.type==="fx"){if(r.folded!==!0){let l=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(l instanceof HTMLElement){l.click();return}}r.onFold?.(!1),rs(e)}}),n}var _e=new Set;function kt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var Ft=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Ml="(max-width: 768px)";function Tl(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Ll(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Tl()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(ds(e,o,!_e.has(o.id)),n.focus())}),n}function Cl(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function ds(e,t,n){n?_e.add(t.id):_e.delete(t.id),Qn(e,t)}function zl(e,t){t?.type==="fx"&&_e.has(t.id)&&ds(e,t,!1)}function Fl(e){return e.ownerDocument.defaultView?.matchMedia?.(Ml).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function Qn(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=Ft(t)&&_e.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!Ft(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),kt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Oe(r)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",ve(n,t.maxHelp)),!o){e.dataset.ncMax&&_a(e);return}if(!e.isConnected){let r=()=>e.isConnected&&_e.has(t.id)&&Qn(e,t);queueMicrotask(()=>{e.isConnected?r():kt(e.ownerDocument,r)});return}let s=Fl(e),i=[...e.children].filter(r=>r.matches?.(".nc-field, [data-nc-slider]")).length;i>0&&e.style.setProperty("--nc-fx-dials",String(i)),e.dataset.ncMax!==s&&(e.dataset.ncMax&&_a(e),e.dataset.ncMax=s,s==="over"&&Nl(e,t)),Dl(e.ownerDocument),s==="over"&&Zn(e),kt(e.ownerDocument,()=>{for(let r of e.querySelectorAll(".nc-eq"))r instanceof HTMLElement&&Oe(r)})}function _a(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),kt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Oe(n)})}function Nl(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let s=e.querySelector("[data-nc-fx-max]");s instanceof HTMLElement&&s.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function Zn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,s=e.ownerDocument.defaultView,i=Number.parseFloat(s?.getComputedStyle(o).columnGap??"")||0,r=Qi(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),i,s?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${r.left}px`,e.style.top=`${r.top}px`,e.style.width=`${r.width}px`}var Va=new WeakSet;function Dl(e){Va.has(e)||(Va.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(s=>s.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&Zn(t)}))}var Ln=new WeakMap;function ps(e,t){let n=Tr(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function us(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let s of n)ve(s,t.meterHelp);let o=Ln.get(e);o?o.set(t.meter):Ln.set(e,Fr(n,t.meter))}function hs(e,t){(t.meter||Ln.has(e))&&us(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let s=typeof t.onFold=="function"&&t.folded===!0;s?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let i=e.querySelector("[data-nc-fx-hide]");i instanceof HTMLElement&&(cs(i,s,t.title),ve(i,t.foldHelp)),Qn(e,t);let r=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(r instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;r.hidden=s,r.setAttribute("aria-label",c),r.title=c}let l=e.querySelector(":scope > [data-nc-fx-fold]");if(l instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";l.hidden=!s,l.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),l.dataset.on=t.on===!0?"true":"false";let d=l.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let p=l.querySelector("[data-nc-fx-fold-name]");p&&(p.textContent=t.title),ve(l,t.foldHelp)}}function ve(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Re(e){return e.replace(/["\\]/g,"\\$&")}function ql(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(s=>s.type==="canvas"&&s.id===n.dataset.ncId);o?.type==="canvas"&&Ao(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&Oe(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&Zn(n);Gr(e)}var Pl=1e3,Il=e=>e===!0?"log":typeof e=="string"?e:"linear";function jl(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??Il(e.log),s=ut(o,e.min,e.max),i=n.createElement("div");i.className="nc-field",i.dataset.ncRow="",i.dataset.ncSlider="",i.dataset.ncId=e.id;let r=n.createElement("label");r.className="nc-label",r.setAttribute("for",e.id),r.textContent=e.label;let l=n.createElement("input");l.type="range",l.className="nc-range",l.id=e.id,l.dataset.ncId=e.id,l.min=String(s?0:e.min),l.max=String(s?Pl:e.max),l.step=s?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",i.append(r,l,c,d);let p=e.value,h=()=>{let f=e.format(p);c.textContent=f,l.setAttribute("aria-valuetext",f)},b=f=>{p=f,n.activeElement!==l&&(l.value=String(s?st(o,e.min,e.max,p):p)),h()};return l.addEventListener("input",()=>{p=s?Tt(o,e.min,e.max,l.value,e.step):Number(l.value),h(),e.onInput(p)}),s&&l.addEventListener("keydown",f=>{let x=_n(o,e.min,e.max,p,f.key,f.shiftKey,e.step);x===null||l.disabled||(f.preventDefault(),l.value=String(st(o,e.min,e.max,x)),p=x,h(),e.onInput(p))}),l.disabled=e.disabled===!0,b(e.value),{el:i,set:b,setDisabled(f){l.disabled=f===!0}}}var Bl=ye["toast-duration"];function Rl({message:e,actionLabel:t}){return t?`${e}, ${t}`:String(e)}function Hl(e,t,n,o){let s=l=>({top:l,bottom:l+n}),i=l=>e.some(c=>c&&c.bottom>l.top&&c.top<l.bottom),r=s(t-o-n);return i(r)?i(s(o))?"bottom":"top":"bottom"}function Ol(e,t,n,o,s,i){let r=e.bottom+s,l=Math.max(i,Math.min(e.left,o-i-n.width));for(let c=!0,d=0;c&&d<8;d++){c=!1;for(let p of t)p&&p.bottom>r&&p.top<r+n.height&&p.right>l&&p.left<l+n.width&&(r=p.bottom+s,c=!0)}return{top:r,left:l}}var Ga="data-nc-ui-toast-live";function _l(e,t){let n=t.querySelector(`[${Ga}]`);return n||(n=e.createElement("div"),n.setAttribute(Ga,""),n.setAttribute("aria-live","polite"),n.setAttribute("aria-atomic","true"),n.setAttribute("role","status"),n.className="nc-ui-toast-live",t.appendChild(n)),n}function Vl({message:e,actionLabel:t,onAction:n,duration:o=Bl,onClose:s,avoid:i=[],anchor:r,host:l,document:c=globalThis.document}={}){l=l??c.body;let d=c.defaultView??globalThis,p=c.createElement("div");p.className="nc-ui-toast",p.setAttribute("data-state","enter");let h=c.createElement("span");h.className="nc-ui-toast-message",h.textContent=e,p.appendChild(h);let b=null;t&&(b=c.createElement("button"),b.type="button",b.className="nc-ui-toast-action",b.textContent=t,p.appendChild(b)),l.appendChild(p);let f="open",x=N=>N&&typeof N.getBoundingClientRect=="function"?N.getBoundingClientRect():null,y=x(p),u=y?.height||44,m=d.getComputedStyle?.(p),w=Number.parseFloat(m?.getPropertyValue(O("toast-offset")))||16,g=Number.parseFloat(m?.getPropertyValue(O("toast-anchor-gap")))||8,k=x(r),L=d.innerHeight??0,E=i.map(x).filter(Boolean),v=k&&k.bottom>0&&k.top<L?Ol(k,E,{width:y?.width||0,height:u},d.innerWidth??0,g,w):null;v&&v.top+u<=L?(p.setAttribute("data-placement","anchor"),p.style.top=`${v.top+(d.scrollY??0)}px`,p.style.left=`${v.left+(d.scrollX??0)}px`):p.setAttribute("data-placement",Hl(E,L,u,w));let A=d.requestAnimationFrame?.bind(d)??(N=>setTimeout(N,16));A(()=>A(()=>{f==="open"&&p.setAttribute("data-state","open")})),_l(c,l).textContent=Rl({message:e,actionLabel:t});let $,M,S=new Promise(N=>{M=N}),C=N=>{clearTimeout($),$=setTimeout(()=>P("timeout"),N)},F=o,D=Date.now(),j=()=>{f==="open"&&(clearTimeout($),F=Math.max(0,F-(Date.now()-D)))},B=()=>{f==="open"&&(D=Date.now(),C(F))};p.addEventListener("pointerenter",j),p.addEventListener("pointerleave",B),p.addEventListener("focusin",j),p.addEventListener("focusout",B),b?.addEventListener("click",()=>{if(f==="open")try{n?.()}finally{P("action")}}),Number.isFinite(o)&&C(o);function P(N="close"){if(f!=="open")return;f="closing",clearTimeout($),p.setAttribute("data-state","closing"),s?.(N);let I=d.getComputedStyle?.(p),he=I?Math.max(0,...String(I.transitionDuration||"").split(",").map(me=>Number.parseFloat(me)*(me.trim().endsWith("ms")?1:1e3)||0)):0,de=()=>{f!=="gone"&&(f="gone",p.remove(),M(N))};p.addEventListener("transitionend",de),setTimeout(de,he+50)}return{el:p,close:P,closed:S}}var ze="data-nc-help";function Gl(e,t,n,o=0,s=6,i=8){let r=e.top-s-t.height,l=r>=o+i?"above":"below",c=l==="above"?r:e.bottom+s,d=Math.max(i,Math.min(e.left,n-i-t.width));return{top:Math.round(c),left:Math.round(d),side:l}}var tn=new WeakMap;function Wl(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function Ul({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=tn.get(e);if(n)return n;let o=e.defaultView,s=null,i=null,r,l=!1,c,d=null,p=!1,h=0,b=()=>{clearTimeout(r),p&&!l&&(h=Date.now()+1500),p=!1,s&&(s.hidden=!0,delete s.dataset.pinned)},f=()=>{b(),clearTimeout(c),i=null,d=null,l=!1},x=(v,A)=>{clearTimeout(r),d=A;let $=Date.now()<h?Math.min(t,300):t;r=setTimeout(()=>{i===v&&v.isConnected&&!l&&m(v)&&(p=!0)},$)},y=v=>({x:Number(v.clientX)||0,y:Number(v.clientY)||0}),u=(v,A,$)=>!v||Math.hypot(v.x-A.x,v.y-A.y)>$,m=(v,A)=>{let $=A??v.getAttribute(ze);if(!$)return!1;s||(s=e.createElement("div"),s.className="nc-ui-help",s.setAttribute("role","tooltip"),s.dataset.testid="nc-help",s.style.position="fixed",s.style.pointerEvents="none",s.style.zIndex="6",e.body.appendChild(s)),s.textContent=$,s.hidden=!1,s.style.visibility="hidden",s.style.top="0px",s.style.left="0px";let M=v.getBoundingClientRect(),S=Gl(M,{width:s.offsetWidth,height:s.offsetHeight},o.innerWidth,Wl(e));return s.style.top=`${S.top}px`,s.style.left=`${S.left}px`,s.dataset.side=S.side,s.style.visibility="",!0},w=v=>{if(l||v.pointerType==="touch")return;let A=v.target&&v.target.closest?v.target.closest(`[${ze}]`):null;A!==i&&(f(),!(!A||v.buttons)&&(i=A,x(A,y(v))))},g=v=>{if(l||v.pointerType==="touch"||!i)return;if(v.buttons){b(),d=null;return}let A=y(v);p?u(d,A,8)&&(b(),x(i,A)):u(d,A,4)&&x(i,A)},k=v=>{!l&&!v.relatedTarget&&f()},L=v=>{(l||v.key==="Escape")&&f()};e.addEventListener("pointerover",w),e.addEventListener("pointermove",g,{passive:!0}),e.addEventListener("pointerout",k),e.addEventListener("pointerdown",f,!0),e.addEventListener("keydown",L),o.addEventListener("scroll",f,!0),o.addEventListener("blur",f);let E={hide:f,pin(v,A,{ms:$=0}={}){return f(),!v||!v.isConnected||!m(v,A)?!1:(l=!0,s.dataset.pinned="",$>0&&(c=setTimeout(f,$)),!0)},uninstall(){f(),e.removeEventListener("pointerover",w),e.removeEventListener("pointermove",g),e.removeEventListener("pointerout",k),e.removeEventListener("pointerdown",f,!0),e.removeEventListener("keydown",L),o.removeEventListener("scroll",f,!0),o.removeEventListener("blur",f),s?.remove(),s=null,tn.delete(e)}};return tn.set(e,E),E}var ea="netcomposer.rhythm.hidden.v1",ue=new WeakMap;function nn(){try{return globalThis.localStorage??null}catch{return null}}function ms(e,t=ea){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Wa(e,t,n,o=ea){let s=ms(e,o);n?s.add(t):s.delete(t);try{e?.setItem(o,JSON.stringify([...s]))}catch{}}function ta(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(s=>s.controls)],n=[],o=s=>{if(n.push(s),s.type==="group")for(let i of s.controls)o(i)};for(let s of t)o(s),s.type==="fx"&&n.push(...s.controls,...s.more??[]),s.type==="strip"&&(n.push(...(s.sends??[]).map(i=>({...i,type:"knob",compact:!0}))),s.pan&&n.push(Xn(s)),s.trim&&n.push(Jn(s)));return n}function fs(e,t){if(!(!e||!t))return ta(e).find(n=>n.id===t)}function Yl(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${ta(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function Kl(e,t){if(!t.title)return;if(!t.panel){let i=document.createElement("h3");i.className="nc-ui-fx-name",i.textContent=t.title,e.append(i);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let s=document.createElement("span");s.className="nc-panel-subject",s.dataset.ncPanelSubject="",n.append(o,s),e.append(n),gs(e,t)}function gs(e,t){if(!t.panel)return;let n=[...e.children].find(i=>i.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),s=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),s&&(s.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function Xl(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=ue.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return fs(n,o)}function Jl(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],s=Yl(t);if(e.dataset.ncSignature===s){for(let i of o){let r=e.querySelector(`[data-nc-section="${Ya(i.id)}"]`);r&&gs(r,i);for(let l of i.controls){let c=e.querySelector(`[data-nc-id="${Ya(l.id)}"]`);c instanceof Element&&oe(c,l)}r instanceof HTMLElement&&Cn(r,i,n)}return}e.dataset.ncSignature=s,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let i of o){let r=document.createElement("div");r.className="nc-section",r.dataset.ncSection=i.id,i.inset&&(r.dataset.ncInset="true"),i.area&&(r.dataset.ncArea=i.area),i.label&&(r.setAttribute("role","group"),r.setAttribute("aria-label",i.label)),i.panel&&(r.dataset.ncPanel="true",r.setAttribute("role","region"),i.title&&r.setAttribute("aria-label",i.title)),Kl(r,i);let l=i.panel?document.createElement("div"):r;i.panel&&(l.className="nc-panel-body",r.append(l));for(let c of i.controls)l.append(Te(c,Xl));e.append(r),Cn(r,i,n)}}function bs(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,s=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,s))}}var Ql="(max-width: 768px)",ws=new WeakMap;function Ua(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function Zl(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let s=Ua("prev"),i=Ua("next"),r=document.createElement("span");r.className="nc-fx-page-count",r.dataset.ncFxPageCount="",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-ui-toast-live",l.dataset.ncFxPageLive="",l.setAttribute("aria-live","polite"),o.append(s,r,i,l);let c=(d,p)=>{let h=ws.get(e);if(!h||p.getAttribute("aria-disabled")==="true")return;let b=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:f}=bs(b,h.pageSize,(t.pages.get(h.id)??0)+d);t.pages.set(h.id,f),h.onPage?.(f),Cn(e,{...h,page:f},t),p.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===p&&(p===s?i:s).focus(),t.redraw()};return s.addEventListener("click",()=>c(-1,s)),i.addEventListener("click",()=>c(1,i)),e.prepend(o),o}function Cn(e,t,n){ws.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],s=t.pageSize??0,{pages:i,page:r}=bs(o.length,s,t.page??n.pages.get(t.id)??0);if(s>0&&n.pages.set(t.id,r),i<=1){for(let u of[...e.children])u.classList.contains("nc-fx-pager")&&u.remove();delete e.dataset.ncPaged;for(let u of o)delete u.dataset.ncOffPage;return}e.dataset.ncPaged="";let l=e.ownerDocument.defaultView?.matchMedia?.(Ql).matches===!0,c=e.closest(".nc-module");o.forEach((u,m)=>{let w=Math.floor(m/s)!==r;if(w?u.dataset.ncOffPage="":delete u.dataset.ncOffPage,w&&!l){let g=c instanceof HTMLElement?ue.get(c):void 0;zl(u,fs(g,u.dataset.ncId))}});let d=Zl(e,n),p=d.querySelector('[data-nc-fx-page="prev"]'),h=d.querySelector('[data-nc-fx-page="next"]');p.setAttribute("aria-disabled",r===0?"true":"false"),h.setAttribute("aria-disabled",r===i-1?"true":"false");let b=d.querySelector("[data-nc-fx-page-count]"),f=`${r+1} / ${i}`;b.textContent!==f&&(b.textContent=f);let x=d.querySelector("[data-nc-fx-page-live]"),y=`Effects page ${r+1} of ${i}`;x.textContent!==y&&(x.textContent=y)}function Ya(e){return e.replace(/["\\]/g,"\\$&")}function ec(e,t=ea){yo();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=ms(nn(),t).has(e.id),s=document.createElement("header");s.className="nc-module-hd",s.dataset.ncRow="";let i=document.createElement("h2");i.className="nc-title",i.id=`${e.id}-title`;let r=document.createElement("span");r.className="nc-module-end";let l=document.createElement("button");l.type="button",l.className="nc-hide",l.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=xo({labelledBy:i.id,onChange:w=>(ue.get(n)??e).onToggle?.(w)});d.el.dataset.ncModuleSwitch="",r.append(d.el,l,c);let p=document.createElement("span");p.className="nc-snap-msg",p.dataset.ncStatus="",s.append(i,p,r);let h=document.createElement("div");h.className="nc-module-body",h.id=`${e.id}-body`;let b=document.createElement("button");b.type="button",b.className="nc-slim";let f=document.createElement("span");f.className="nc-slim-lines",b.append(f);let x=document.createElement("i");x.className="nc-token-probe",x.dataset.ncProbe="",n.append(x,s,h,b),n.setAttribute("aria-labelledby",i.id);let y=w=>{let g=ue.get(n)??e;n.dataset.ncOpen=w?"false":"true",h.hidden=w,b.hidden=!w,l.textContent=w?"+":"−",l.setAttribute("aria-expanded",w?"false":"true"),l.setAttribute("aria-controls",h.id),l.setAttribute("aria-label",`${w?"Show":"Hide"} ${g.title}`),l.title=w?"Show":"Hide",w?n.dataset.ncSlim="":delete n.dataset.ncSlim};l.addEventListener("click",()=>{let w=n.dataset.ncOpen==="true";Wa(nn(),(ue.get(n)??e).id,w,t),y(w),zn(n.parentElement)}),b.addEventListener("click",()=>{Wa(nn(),(ue.get(n)??e).id,!1,t),y(!1),zn(n.parentElement)});let u={pages:new Map,redraw:()=>m.redraw()},m={el:n,update(w){ue.set(n,w),w.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,i.textContent=w.title,p.textContent=w.status??"",w.status!==void 0?p.setAttribute("aria-live","polite"):p.removeAttribute("aria-live"),f.textContent=w.summary??w.title,d.el.hidden=w.on===void 0,d.set(w.on===!0),w.on===!1?h.dataset.ncDim="true":delete h.dataset.ncDim,b.setAttribute("aria-label",`Show ${w.title}`),Jl(h,w,u),y(h.hidden),m.redraw()},redraw(){let w=ue.get(n);w&&ql(n,ta(w))}};return ue.set(n,e),y(o),m.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>m.redraw()).observe(n),go(()=>m.redraw(),n.ownerDocument),m}function tc(e,t,n="adjacent"){yo(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((s,i)=>{let r=i%4+1;s.el.dataset.ncShade=String(r),s.el.dataset.ncPlace=o;let l=s.el.querySelector("[data-nc-index]");l&&(l.textContent=String(r).padStart(2,"0")),e.append(s.el),s.redraw()}),zn(e)}function zn(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(i=>i instanceof HTMLElement&&i.classList.contains("nc-module")),n=t.some(i=>i.hasAttribute("data-nc-lead")),o=t.map(i=>i.hasAttribute("data-nc-slim")?a("module-slim-column"):n?i.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let s=t.filter(i=>!i.hasAttribute("data-nc-slim"));n&&t.length===4&&s.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const nc={tempo:"The song's tempo: the Studio's. It locks once Pass 1 exists.",bars:"How long one lap is. Every lap you play into becomes a pass. Locked once Pass 1 exists.","count-in":"One bar before bar 1, counted over every tab with the metronome. Off: Pass 1 starts with the clock.",start:"How Jam starts. Count-in: a bar of clicks, then Pass 1. Wait: Jam waits for the first sound from any instrument, and Pass 1 starts on its beat.","jam-wait":"Wait for the first sound from any instrument: Pass 1 starts on that beat, and every lap after it becomes a pass. Space anywhere.",waiting:"Waiting for the first sound. Press again (or Space) to cancel. Nothing is recorded.","pattern-pass":"An instrument's own pattern, recorded once and again when it changes. It doesn't replay while that instrument plays its pattern itself.",metronome:"A click on every beat while you jam. It's never in Rec, Keep or an export.",volume:"The click's volume. Kept in this browser.",quantize:"Moves notes onto the grid when they replay. Off plays them as you played them. Passes keep what you played.",strength:"How far notes move toward the grid.",jam:"Start the Studio and record: after the count-in every lap becomes a pass. Space anywhere.",stop:"Stop the Studio. A lap you were in is kept if it has notes. Space anywhere.",undo:"Drop this lap if it has notes, else the last pass. Backspace anywhere.",redo:"Bring back what Undo took. Shift+Backspace anywhere.",mute:"Silence this pass at once.",solo:"Play only the soloed passes, at once. Mute wins over solo.","pass-volume":"This pass's level. Notes play softer as it goes down.",star:"Star the passes you like. Clear unstarred deletes the rest.",repeat:"This pass is shorter than the song. ×N repeats it to fill the song; once plays it once and leaves the rest free.",ruler:"Drag across bar numbers to repeat just those bars; click one to repeat it. Drag an end to move it, double-click to clear. Jamming, it starts next lap.","loop-off":"Play the whole song again (from the next lap while jamming).",shift:"Move this pass a bar earlier or later. It wraps around at the song's end. What you played stays as it was.","clear-unkept":"Delete every pass without a star.","new-song":"Start a new song at the Studio's tempo. This one stays in Songs.",songs:"Your songs in this browser: open, rename or delete one. Open now: {name}.",delete:"Delete this pass. Undo brings it back.","pass-quantize":"This pass's quantize. Song follows the Setup. 1/8T is eighth-note triplets. Notes move when they replay; the pass keeps what you played.","pass-strength":"How far this pass's notes move toward its grid.","knob-pass":"The knobs you moved in this lap. They move again on replay. Muted or deleted, each goes back to where it was.","you-have-it":"You moved this knob, so this pass lets go of it until the lap ends. Then it takes the knob again."};function rt(e){return nc[e]??""}const ys="nc-song-looper",na=7,ac=[1,2,3,4,5,6,7],Fn=8,xs=/^[A-Za-z0-9._-]{1,64}$/,Nn=24,Dn=64,q=960,R=4,ce=32,je=4e3,Rt=120,Nt=40,Dt=240,oc=8,Le=40,Ht=["off","1/4","1/8","1/8T","1/16","1/32"],sc=["1/4","1/8T"],ic={"1/4":q,"1/8":q/2,"1/8T":q/3,"1/16":q/4,"1/32":q/8},Ot=[.5,.75,1],vs=128,qn=e=>!!e.knobs?.length,ae=e=>`${e.inst}|${e.param}`,Ve=e=>Math.max(1,Math.floor(e/R)),V=e=>e.bars*R*q,qt=R*q;function Pn(e){const t=e.loop;return t?{start:(t.from-1)*qt,length:(t.to-t.from+1)*qt}:{start:0,length:V(e)}}function at(e,t){const n=V(t);if(!e.repeat||e.endTick>=n)return[0];const o=[];for(let s=0;s<n;s+=e.endTick)o.push(s);return o}function ot(e,t){if(!e.shift)return 0;const n=V(t),o=e.repeat&&e.endTick<n?e.endTick:n,s=e.shift*qt%o;return s<0?s+o:s}function rc(e,t){const n=V(t),o=e.repeat&&e.endTick<n?e.endTick:n;return Math.max(0,Math.round(o/qt)-1)}function lc(e){const t=Math.round(e.bars*R*60/e.bpm);return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function $s(e=new Date,t=Math.random){return`sl-${e.toISOString().replace(/[-:T]/g,"").slice(0,12)}-${Math.floor(t()*65535).toString(16).padStart(4,"0")}`}const aa=Le*2;function ks(e,t=new Date,n=Math.random){const o=Math.min(Dt,Math.max(Nt,Math.round(Number.isFinite(e)?e:80))),s=t.toISOString();return{format:ys,version:na,id:$s(t,n),name:`Jam ${t.toLocaleDateString("en-US",{day:"numeric",month:"short"})} ${t.toTimeString().slice(0,5)}`,createdAt:s,updatedAt:s,song:{bpm:o,beatsPerBar:R,bars:Math.min(oc,Ve(o)),countInBars:1,ppq:q},passes:[],comps:[]}}const Ae=e=>typeof e=="object"&&e!==null&&!Array.isArray(e),Z=e=>Number.isInteger(e),pe=(e,t=128)=>typeof e=="string"&&e.length>0&&e.length<=t,an=e=>typeof e=="string"&&!Number.isNaN(Date.parse(e)),ie=(e,t)=>{for(const n of Object.keys(e))if(!t.includes(n))return n;return null};function Ka(e,t){if(e===void 0)return null;if(!Ae(e))return"quantize must be an object";const n=ie(e,["grid","strength"]);return n?`quantize has an unknown field (${n})`:!Ht.includes(e.grid)||t<5&&sc.includes(e.grid)?t<5?"quantize grid is not off, 1/8, 1/16 or 1/32":"quantize grid is not off, 1/4, 1/8, 1/8T, 1/16 or 1/32":Ot.includes(e.strength)?null:"quantize strength is not 50, 75 or 100%"}function cc(e){if(!Ae(e)||e.format!==ys)return"it isn't a Lupa song";if(!ac.includes(e.version))return`it's from another format (version ${String(e.version)})`;const t=ie(e,["format","version","id","name","createdAt","updatedAt","song","passes","comps"]);if(t)return`it has an unknown field (${t})`;if(!pe(e.id))return"its id is missing";if(!pe(e.name,aa))return"its name is missing";if(!an(e.createdAt)||!an(e.updatedAt))return"its dates are wrong";const n=e.song;if(!Ae(n))return"its song is missing";const o=ie(n,["bpm","beatsPerBar","bars","countInBars","ppq","quantize","loop","start"]);if(o)return`its song has an unknown field (${o})`;if(n.start!==void 0){if(e.version<7)return"its song has an unknown field (start)";if(n.start!=="wait")return"its start is not Count-in or Wait"}if(!Z(n.bpm)||n.bpm<Nt||n.bpm>Dt)return`its tempo is not ${Nt}–${Dt}`;if(n.beatsPerBar!==R)return"it isn't in 4/4";if(!Z(n.bars)||n.bars<1||n.bars>Ve(n.bpm))return`its bars are not 1–${Ve(n.bpm)}`;if(n.countInBars!==0&&n.countInBars!==1)return"its count-in is not 0 or 1 bar";if(n.ppq!==q)return`its ticks are not ${q} a beat`;const s=Ka(n.quantize,e.version);if(s)return`its song's ${s}`;if(n.loop!==void 0){if(e.version<3)return"its song has an unknown field (loop)";const c=n.loop;if(!Ae(c)||ie(c,["from","to"])||!Z(c.from)||!Z(c.to)||c.from<1||c.to<c.from||c.to>n.bars)return`its loop is not bars 1–${n.bars}`}const i=V(n);if(!Array.isArray(e.passes))return"its passes are missing";if(e.passes.length>ce)return`it has more than ${ce} passes`;if(!Array.isArray(e.comps)||e.comps.length)return"its comps are not empty (comps come in v1.1)";const r=new Set,l=new Set;for(let c=0;c<e.passes.length;c++){const d=e.passes[c],p=`Pass ${c+1}`;if(!Ae(d))return`${p} is not an object`;const h=ie(d,["id","n","name","recordedAt","endTick","kept","mute","solo","volume","instruments","events","quantize","repeat","shift","knobs","pattern"]);if(h)return`${p} has an unknown field (${h})`;if(d.pattern!==void 0){if(e.version<7)return`${p} has an unknown field (pattern)`;if(d.pattern!==!0)return`${p}'s pattern is not true`;if(d.knobs!==void 0)return`${p} is a pattern and moves knobs`}const b=new Map;if(d.knobs!==void 0){if(e.version<6)return`${p} has an unknown field (knobs)`;if(!Array.isArray(d.knobs)||!d.knobs.length||d.knobs.length>Fn)return`${p}'s knobs are not 1–${Fn}`;for(const y of d.knobs){if(!Ae(y)||ie(y,["inst","param","label","base"]))return`${p} has a knob that is wrong`;if(!pe(y.inst,64)||!(Array.isArray(d.instruments)&&d.instruments.includes(y.inst)))return`${p} has a knob from an instrument not listed`;if(typeof y.param!="string"||!xs.test(y.param))return`${p} has a knob with a bad id`;if(!pe(y.label,Nn))return`${p}'s knob ${y.param} has no name`;if(typeof y.base!="number"||!(y.base>=0&&y.base<=1))return`${p}'s knob ${y.param} does not start at 0–1`;const u=`${y.inst}|${y.param}`;if(b.has(u))return`${p} has knob ${y.param} twice`;b.set(u,y)}if(d.quantize!==void 0)return`${p} moves knobs and has a quantize`}if(d.repeat!==void 0&&(e.version<3||typeof d.repeat!="boolean"))return`${p}'s repeat is not true or false`;if(d.shift!==void 0&&(e.version<4||!Z(d.shift)||d.shift===0||Math.abs(d.shift)>Dn))return`${p}'s shift is not a whole number of bars`;if(!pe(d.id)||r.has(d.id))return`${p} has no id of its own`;if(r.add(d.id),!Z(d.n)||d.n<1||l.has(d.n))return`${p} has no number of its own`;if(l.add(d.n),!pe(d.name,Le))return`${p}'s name is not 1–${Le} characters`;if(!an(d.recordedAt))return`${p}'s date is wrong`;if(!Z(d.endTick)||d.endTick<=0||d.endTick>i)return`${p}'s end is not in the song`;for(const y of["kept","mute","solo"])if(typeof d[y]!="boolean")return`${p}'s ${y} is not true or false`;if(typeof d.volume!="number"||!(d.volume>=0&&d.volume<=1))return`${p}'s volume is not 0–1`;if(!Array.isArray(d.instruments)||!d.instruments.every(y=>pe(y,64)))return`${p}'s instruments are wrong`;const f=Ka(d.quantize,e.version);if(f)return`${p}'s ${f}`;if(!Array.isArray(d.events))return`${p}'s events are missing`;if(d.events.length>je)return`${p} has more than ${je} events`;let x=Number.NEGATIVE_INFINITY;for(let y=0;y<d.events.length;y++){const u=d.events[y],m=`event ${y+1} in ${p}`;if(!Ae(u))return`${m} is not an object`;if(!pe(u.inst,64)||!d.instruments.includes(u.inst))return`${m} is from an instrument not listed`;if(!Z(u.at)||u.at<-Rt||u.at>=d.endTick)return`${m} is outside the pass`;if(u.at<x)return`${m} is out of order`;if(x=u.at,u.kind==="take"){if(e.version===1)return`${m} is of an unknown kind`;const g=ie(u,["kind","inst","take","at","len","peaks"]);if(g)return`${m} has an unknown field (${g})`;if(!pe(u.take)||u.take.length>128)return`${m} has no take`;if(!Z(u.len)||u.len<1||u.at+u.len>i)return`${m} has a length outside the song`;if(u.peaks!==void 0&&!(Array.isArray(u.peaks)&&u.peaks.length<=vs&&u.peaks.every(k=>typeof k=="number"&&k>=0&&k<=1)))return`${m} has bad peaks`;continue}if(u.kind==="param"){if(e.version<6||!b.size)return`${m} is of an unknown kind`;const g=ie(u,["kind","inst","param","at","value"]);if(g)return`${m} has an unknown field (${g})`;if(typeof u.param!="string"||!b.has(`${u.inst}|${u.param}`))return`${m} moves a knob the pass doesn't list`;if(typeof u.value!="number"||!(u.value>=0&&u.value<=1))return`${m} has a value outside 0–1`;continue}if(b.size)return`${m} is not a knob move in a knob pass`;if(d.pattern===!0&&u.kind!==void 0&&u.kind!=="note")return`${m} is not a note in a pattern pass`;if(u.kind==="slot"){const g=ie(u,["kind","inst","slot","at"]);if(g)return`${m} has an unknown field (${g})`;if(!Z(u.slot)||u.slot<1||u.slot>16)return`${m} has slot ${String(u.slot)}`;continue}const w=ie(u,["kind","inst","note","vel","at","len","slice","name"]);if(w)return`${m} has an unknown field (${w})`;if(u.kind!==void 0&&u.kind!=="note")return`${m} is of an unknown kind`;if(!Z(u.note)||u.note<0||u.note>127)return`${m} has note ${String(u.note)}`;if(typeof u.vel!="number"||!(u.vel>0&&u.vel<=1))return`${m} has velocity ${String(u.vel)}`;if(!Z(u.len)||u.len<1||u.len>i)return`${m} has a length outside the song`;if(u.slice!==void 0&&!(Z(u.slice)&&u.slice>=0&&u.slice<=255))return`${m} has slice ${String(u.slice)}`;if(u.name!==void 0&&!(typeof u.name=="string"&&u.name.length>0&&u.name.length<=Le))return`${m} has a bad sound name`}}return null}function oa(e){const t=cc(e);if(t)return{error:`This Lupa song can't be opened: ${t}.`};const n=structuredClone(e);return n.version=na,{session:n}}const Xa=e=>`${e.note}|${e.at}|${e.slice??""}`,dc=30;function Ja(e,t){if(e.length!==t.length)return!1;const n=new Map;for(const o of t)n.set(Xa(o),o);if(n.size!==t.length)return!1;for(const o of e){const s=n.get(Xa(o));if(!s||Math.abs(s.len-o.len)>dc||Math.abs(s.vel-o.vel)>.02)return!1}return!0}class pc{song;b0;passes;drafts=new Map;held=new Map;knobDrafts=new Map;knobValues=new Map;patternDrafts=new Map;redoStack=[];laps=new WeakMap;through=-1;paused=!1;now;stats={taken:0,ignored:0,overCap:0,empty:0,samePattern:0};constructor(t){this.song=t.song,this.b0=t.b0,this.passes=t.passes??[],this.now=t.now??(()=>new Date)}get lapBeats(){return this.lapTicks/q}get lapTicks(){return Pn(this.song).length}get lapStart(){return Pn(this.song).start}get full(){return this.passes.length>=ce}hasDraft(t){return(this.drafts.get(t)?.count??0)>0||(this.knobDrafts.get(t)?.events.length??0)>0}place(t){const n=t-this.b0,o=Math.floor(n/this.lapBeats+1e-12);return{lap:o,tick:Math.round((n-o*this.lapBeats)*q)}}placeOn(t){const n=this.place(t);return n.tick>=this.lapTicks-Rt?{lap:n.lap+1,tick:n.tick-this.lapTicks}:n}beatOf(t,n){return this.b0+t*this.lapBeats+n/q}played(t,n){const o=[];for(const s of n){if(s.type==="sound"||s.type==="note"&&s.stopped){this.stats.ignored++;continue}if(s.type==="note"&&!s.on){this.release(t,s.id,s.beat);continue}if(s.type==="note"&&s.pattern){const p=this.patternNote(t,s);p&&o.push(p);continue}if(s.type==="chordPad"||s.type==="lap"){this.stats.ignored++;continue}if(s.type==="take"){const p=this.voicePass(t,s);p&&o.push({lap:this.laps.get(p)??0,ev:p.events[0]});continue}if(s.type==="param"){const p=this.knob(t,s);p&&o.push(p);continue}if(this.paused||this.full){this.stats.ignored++;continue}const{lap:i,tick:r}=this.placeOn(s.beat);if(i<0||i<=this.through){this.stats.ignored++;continue}const l=this.drafts.get(i)??{lap:i,events:[],count:0};if(l.events.length>=je){this.stats.overCap++;continue}let c;const d=this.lapStart+r;if(s.type==="slot")c={kind:"slot",inst:t,slot:s.slot,at:d};else{const p={inst:t,note:s.note,vel:on(s.velocity),at:d,len:1};s.slice!==void 0&&(p.slice=s.slice),typeof s.name=="string"&&s.name.trim()&&(p.name=s.name.trim().slice(0,Le)),this.held.set(`${t}|${s.id}`,{ev:p,onBeat:s.beat}),c=p}Ne(l.events,c),l.count++,this.drafts.set(i,l),this.stats.taken++,o.push({lap:i,ev:c})}return o}patternNote(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:s}=this.place(n.beat);if(o<0||o<=this.through)return this.stats.ignored++,null;const i=this.patternDrafts.get(o)??new Map,r=i.get(t)??[];if(r.length>=je)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:on(n.velocity),at:this.lapStart+s,len:1};return n.slice!==void 0&&(l.slice=n.slice),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:n.beat}),Ne(r,l),i.set(t,r),this.patternDrafts.set(o,i),this.stats.taken++,{lap:o,ev:l}}snapFirst(t,n,o,s=this.b0){if(!n.on||this.paused||this.full||this.through>=0)return null;const i=Math.max(0,Math.min(this.lapTicks-1,Math.round((s-this.b0)*q))),r=this.drafts.get(0)??{lap:0,events:[],count:0};if(r.events.length>=je)return this.stats.overCap++,null;const l={inst:t,note:n.note,vel:on(n.velocity),at:this.lapStart+i,len:1};return n.slice!==void 0&&(l.slice=n.slice),typeof n.name=="string"&&n.name.trim()&&(l.name=n.name.trim().slice(0,Le)),this.held.set(`${t}|${n.id}`,{ev:l,onBeat:Math.min(o,s)}),Ne(r.events,l),r.count++,this.drafts.set(0,r),this.stats.taken++,{lap:0,ev:l}}knob(t,n){const o=ae({inst:t,param:n.param}),s=Qa(n.value),i=this.knobValues.get(o);if(s!==null&&this.knobValues.set(o,s),s===null||!xs.test(n.param)||this.paused||this.full)return this.stats.ignored++,null;const{lap:r,tick:l}=this.place(n.beat);if(r<0||r<=this.through)return this.stats.ignored++,null;const c=this.knobDrafts.get(r)??{lap:r,events:[],knobs:new Map};let d=c.knobs.get(o);if(!d){if(c.knobs.size>=Fn)return this.stats.ignored++,null;const b=(n.label??"").trim().slice(0,Nn)||n.param.slice(0,Nn);d={inst:t,param:n.param,label:b,base:Qa(n.from)??i??s},c.knobs.set(o,d)}let p;for(let b=c.events.length-1;b>=0&&!p;b--){const f=c.events[b];f.inst===t&&f.param===n.param&&(p=f)}if(p&&p.value===s)return null;if(c.events.length>=je)return this.stats.overCap++,null;const h={kind:"param",inst:t,param:n.param,at:this.lapStart+l,value:s};return Ne(c.events,h),this.knobDrafts.set(r,c),this.stats.taken++,{lap:r,ev:h}}release(t,n,o){const s=`${t}|${n}`,i=this.held.get(s);i&&(this.held.delete(s),i.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((o-i.onBeat)*q))))}seam(t){const n=this.place(t).lap,o=[];for(let s=this.through+1;s<n;s++){this.through=s,o.push(...this.commitPatterns(s,this.lapTicks));const i=this.commit(s,this.lapTicks);i&&o.push(i);const r=this.commitKnobs(s,this.lapTicks);r&&o.push(r)}return o}stop(t){for(const[i,r]of this.held)this.held.delete(i),r.ev.len=Math.max(1,Math.min(this.lapTicks,Math.round((t-r.onBeat)*q)));const n=this.seam(t),{lap:o,tick:s}=this.place(t);if(o>=0&&o>this.through){this.through=o;const i=R*q,r=Math.min(this.lapTicks,Math.max(i,Math.ceil(Math.max(1,s)/i)*i)),l=this.patternDrafts.get(o);if(l)for(const[p,h]of l){const b=h.filter(f=>f.at-this.lapStart<=s);b.length?l.set(p,b):l.delete(p)}n.push(...this.commitPatterns(o,r,s));const c=this.commit(o,r);c&&n.push(c);const d=this.commitKnobs(o,r);d&&n.push(d)}return this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),n}voicePass(t,n){if(this.paused||this.full)return this.stats.ignored++,null;const{lap:o,tick:s}=this.place(n.beat);if(o<0||!n.take||this.passes.some(d=>d.events.some(p=>p.kind==="take"&&p.take===n.take)))return this.stats.ignored++,null;const i=Math.max(0,Math.min(this.lapTicks-1,s)),r=Math.max(1,Math.min(this.lapTicks-i,Math.round(n.lengthBeats*q))),l={kind:"take",inst:t,take:n.take.slice(0,128),at:this.lapStart+i,len:r};Array.isArray(n.peaks)&&n.peaks.length&&(l.peaks=n.peaks.slice(0,vs).map(d=>Number.isFinite(d)?Math.round(Math.max(0,Math.min(1,d))*100)/100:0)),this.drafts.set(-1-o,{lap:o,events:[l],count:1});const c=this.commitDraft(-1-o,o,this.lapTicks);return c&&this.stats.taken++,c}isHeld(t){for(const n of this.held.values())if(n.ev===t)return!0;return!1}lapOf(t){return this.laps.get(t)}rebase(t,n,o){const s=this.drafts.get(n),i=this.knobDrafts.get(n),r=this.patternDrafts.get(n),l=this.lapStart-o;if(this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),r){for(const c of r.values())for(const d of c)d.at+=l;this.patternDrafts.set(0,r)}if(s){for(const c of s.events)c.at+=l;s.lap=0,this.drafts.set(0,s)}if(i){for(const c of i.events)c.at+=l;i.lap=0,this.knobDrafts.set(0,i)}}resume(t){this.b0=t,this.laps=new WeakMap,this.through=-1,this.drafts.clear(),this.knobDrafts.clear(),this.patternDrafts.clear(),this.held.clear()}commit(t,n){return this.commitDraft(t,t,n)}commitDraft(t,n,o){const s=this.drafts.get(t);if(this.drafts.delete(t),!s||s.count===0)return this.stats.empty++,null;if(this.full)return this.stats.ignored+=s.count,null;const i=this.passes.reduce((d,p)=>Math.max(d,p.n),0)+1,r=this.lapStart,l=s.events.filter(d=>d.at-r<o),c={id:`p${i}-${this.now().getTime().toString(36)}`,n:i,name:`Pass ${i}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?V(this.song):o,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(d=>d.inst))],events:l};return this.passes.push(c),this.laps.set(c,n),this.redoStack=[],c}commitPatterns(t,n,o){const s=this.patternDrafts.get(t);if(this.patternDrafts.delete(t),!s)return[];const i=[],r=this.lapStart;for(const[l,c]of s){const d=c.filter(y=>y.at-r<n);if(!d.length)continue;let p;for(const y of this.passes)y.pattern&&y.instruments.includes(l)&&(!p||y.n>p.n)&&(p=y);const h=(p?.events??[]).filter(y=>y.kind!=="slot"&&y.kind!=="take"&&y.kind!=="param"),b=o===void 0?h:h.filter(y=>y.at-r<=o);if(p&&Ja(d,b)){this.stats.samePattern++;continue}if(this.full){this.stats.ignored+=d.length;continue}if(p&&this.laps.get(p)===t-1&&h.length){const y=h[0]?.at??0;if(Ja(d.filter(u=>u.at>=y),h)){const u=this.passes.indexOf(p);u>=0&&this.passes.splice(u,1)}}const f=this.passes.reduce((y,u)=>Math.max(y,u.n),0)+1,x={id:`p${f}-${this.now().getTime().toString(36)}`,n:f,name:`Pass ${f}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?V(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[l],events:d,pattern:!0};this.passes.push(x),this.laps.set(x,t),this.redoStack=[],i.push(x)}return i}patternDrafting(){const t=[];for(const[n,o]of this.patternDrafts)for(const[s,i]of o)t.push({lap:n,inst:s,events:i});return t}commitKnobs(t,n){const o=this.knobDrafts.get(t);if(this.knobDrafts.delete(t),!o?.events.length)return null;if(this.full)return this.stats.ignored+=o.events.length,null;const s=this.lapStart,i=o.events.filter(p=>p.at-s<n);if(!i.length)return null;const r=new Set(i.map(p=>ae(p))),l=[...o.knobs.values()].filter(p=>r.has(ae(p))),c=this.passes.reduce((p,h)=>Math.max(p,h.n),0)+1,d={id:`p${c}-${this.now().getTime().toString(36)}`,n:c,name:`Pass ${c}`,recordedAt:this.now().toISOString(),endTick:this.song.loop?V(this.song):n,kept:!1,mute:!1,solo:!1,volume:1,instruments:[...new Set(l.map(p=>p.inst))],events:i,knobs:l.map(p=>({...p}))};return this.passes.push(d),this.laps.set(d,t),this.redoStack=[],d}knobDrafting(){return[...this.knobDrafts.values()].map(t=>({lap:t.lap,events:t.events,knobs:[...t.knobs.values()]}))}drafting(){return[...this.drafts.values()].map(t=>({lap:t.lap,events:t.events}))}undo(t){const{lap:n}=this.place(t),o=this.drafts.get(n),s=this.knobDrafts.get(n);if(o&&o.count>0||s?.events.length){this.drafts.delete(n),this.knobDrafts.delete(n);const l=o??{lap:n,events:[],count:0};for(const[d,p]of this.held)l.events.includes(p.ev)&&this.held.delete(d);const c={kind:"lap",draft:l,...s?.events.length?{knobs:s}:{}};return this.redoStack.push(c),c}const i=this.passes.pop();if(!i)return null;const r={kind:"pass",pass:i};return this.redoStack.push(r),r}redo(t){const n=this.redoStack.pop();if(!n)return null;if(n.kind==="pass"){if(this.full)return this.redoStack.push(n),null;const l=this.passes.findIndex(c=>c.n>n.pass.n);return l<0?this.passes.push(n.pass):this.passes.splice(l,0,n.pass),n}const{lap:o}=this.place(t);if(n.draft.lap===o||n.draft.lap>this.through){const l=this.drafts.get(n.draft.lap);if(l)for(const c of n.draft.events)Ne(l.events,c);else n.draft.count&&this.drafts.set(n.draft.lap,n.draft);if(l&&(l.count+=n.draft.count),n.knobs){const c=this.knobDrafts.get(n.knobs.lap);if(!c)this.knobDrafts.set(n.knobs.lap,n.knobs);else{for(const d of n.knobs.events)Ne(c.events,d);for(const[d,p]of n.knobs.knobs)c.knobs.has(d)||c.knobs.set(d,p)}}return n}n.draft.count&&this.drafts.set(n.draft.lap,n.draft),n.knobs&&this.knobDrafts.set(n.knobs.lap,n.knobs);const s=this.commit(n.draft.lap,this.lapTicks),i=this.commitKnobs(n.draft.lap,this.lapTicks),r=s??i;return r?{kind:"pass",pass:r}:null}forgetUndone(){this.redoStack=[]}get canRedo(){return this.redoStack.length>0}}function Qa(e){return typeof e!="number"||!Number.isFinite(e)?null:Math.round(Math.max(0,Math.min(1,e))*1e4)/1e4}function on(e){return typeof e=="number"&&e>0?Math.min(1,e):.8}function Ne(e,t){let n=e.length;for(;n>0&&e[n-1].at>t.at;)n--;e.splice(n,0,t)}const Za=.5,uc=64,Ee="draft:",hc=12;function eo(e,t){const n=t&&t.grid!=="off"?ic[t.grid]:void 0;if(!t||!n)return e;const o=Math.round(e/n)*n;return Math.round(e+(o-e)*t.strength)}function Xe(e,t){return e.mute?!1:t?e.solo:!0}const to=e=>e.kind==="slot",sn=e=>e.kind==="take",rn=e=>e.kind==="param",mc=.25,fc=4,gc=.05;class bc{constructor(t,n){this.rec=t,this.sink=n}sentTo=Number.NEGATIVE_INFINITY;serial=0;sounding=new Map;waiting=[];rung=[];takesSent=new Map;announceLaps=!0;live=null;knobs=new Map;hands=new Map;resend=new Map;stats={sent:0,dropped:0,rewinds:0,slots:0,takes:0,laps:0,released:0,params:0,live:0,byInst:{}};get song(){return this.rec.song}start(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.restart()}forgetKnobs(){this.knobs.clear(),this.hands.clear(),this.resend.clear()}rebase(t){for(const[n,o]of this.takesSent)o<=t+1e-9&&this.takesSent.delete(n);this.hands.clear();for(const n of this.knobs.values())n.fresh=!1;this.rung=this.rung.filter(n=>!n.pass.startsWith(Ee))}stop(){this.sentTo=Number.NEGATIVE_INFINITY,this.rung=[],this.sounding.clear(),this.waiting=[],this.takesSent.clear(),this.forgetKnobs(),this.sink.off()}rewind(t){if(this.sentTo===Number.NEGATIVE_INFINITY)return;for(const o of this.knobs.values())o.fresh=!1;this.silence(t);const n=[...this.takesSent.values()].some(o=>o>t);if(!(t>=this.sentTo&&!n)){this.stats.rewinds++,this.sink.off(t),this.sentTo=Math.min(this.sentTo,t),this.waiting=this.waiting.filter(o=>o.beat<t);for(const[o,s]of this.takesSent)s>t&&this.takesSent.delete(o);for(const[o,s]of this.sounding)this.sounding.set(o,s.filter(i=>i.start<t))}}pump(t,n,o){const s=this.rec,i=[];if(this.waiting.length){const $=[];for(const M of this.waiting){if(s.isHeld(M.ev)){$.push(M);continue}if(M.beat>=t)i.push(M);else{const S=Math.min(M.ev.len,this.rec.lapTicks)/q-(t-M.beat);S>.05&&i.push({...M,beat:t,lenBeats:S})}}this.waiting=$}const r=Math.max(this.sentTo,t);if(!(n>r)&&!i.length&&!this.lateTakes(t))return 0;const l=o?.lapTicks??s.lapTicks,c=l/q,d=o?.lapStart??s.lapStart,p=d+l,h=o?.b0??s.b0,b=($,M)=>h+$*c+(M-d)/q,f=$=>$>=d-Rt&&$<p,x=Math.max(0,Math.floor((r-h)/c)-1),y=Math.floor((n-h)/c)+1,u=[],m=($,M,S)=>{const C=S+$.at;if(!f(C))return;const F=b(M,C);F>=r&&F<n&&u.push({inst:$.inst,beat:F,slot:$.slot})},w=[],g=($,M,S,C,F=Number.NEGATIVE_INFINITY,D=Number.POSITIVE_INFINITY)=>{const j=C,B=j+M.at,P=Math.min(B+M.len,j+$.endTick,D),N=Math.max(B,d,F),I=Math.min(P,p);if(I<=N)return;const he=b(S,N),de=b(S,I),me=`${$.id}|${S}|${j}`;if(this.takesSent.has(me)||de<=t||he>=n)return;const $e=Math.max(he,t);if(de-$e<gc)return;const Ue=(N-B)/q+($e-he),Ye={type:"take",id:`t${++this.serial}`,beat:$e,take:M.take,lengthBeats:Ue+(de-$e),gain:Math.max(0,Math.min(1,$.volume))};Ue>1e-9&&(Ye.offsetBeats=Ue),this.takesSent.set(me,de),w.push({inst:M.inst,ev:Ye})},k=s.passes,L=k.some($=>$.solo&&!$.mute),E=($,M,S,C,F,D,j,B=!1)=>{if(!f(F))return;const P=b(D,F);if(P>=r&&P<n){if(B&&this.live?.(M,P)){this.stats.live++;return}s.isHeld(C)?this.waiting.push({inst:M,age:S,beat:P,ev:C,velocity:j,pass:$}):i.push({inst:M,age:S,beat:P,ev:C,velocity:j,pass:$})}};for(const $ of k){if(!Xe($,L))continue;const M=o?void 0:s.lapOf($),S=M===void 0?0:M+1,C=$.quantize??this.song.quantize,F=at($,this.song),D=ot($,this.song),j=F.length>1?$.endTick:V(this.song),B=P=>{const N=P+D;return D&&N>=j?N-j:N};for(let P=Math.max(S,x);P<=y;P++)for(const N of F)for(const I of $.events)if(!(I.at>=$.endTick)){if(to(I)){m(I,P,N+B(I.at)-I.at);continue}if(!rn(I)){if(sn(I)){D?(g($,I,P,N+D,N,N+j),g($,I,P,N+D-j,N,N+j)):g($,I,P,N);continue}E($.id,I.inst,$.n,I,N+B(eo(I.at,C)),P,I.vel*$.volume,$.pattern===!0)}}}if(!L)for(const $ of s.drafting())for(let M=Math.max(o?0:$.lap+1,x);M<=y;M++)for(const S of $.events){if(to(S)){m(S,M,0);continue}sn(S)||rn(S)||E(`${Ee}${$.lap}`,S.inst,Number.POSITIVE_INFINITY,S,eo(S.at,this.song.quantize),M,S.vel)}if(this.announceLaps&&!s.full&&!s.paused){const $=[];for(let M=Math.max(0,Math.ceil((r-h)/c));h+M*c<n;M++)$.push({type:"lap",id:`l${++this.serial}`,beat:h+M*c,lengthBeats:c});$.length&&(this.sink.laps($),this.stats.laps+=$.length)}if(this.pumpKnobs(t,r,n,{b0:h,L:c,cs:d,ce:p,beatAt:b,inCycle:f,lapLo:x,lapHi:y,loopChange:!!o}),this.sentTo=Math.max(this.sentTo,n),w.length){const $=new Map;for(const M of w)$.set(M.inst,[...$.get(M.inst)??[],M.ev]);for(const[M,S]of $)this.sink.controls(M,S);this.stats.takes+=w.length}if(u.length){u.sort((M,S)=>M.beat-S.beat);const $=new Map;for(const M of u){const S=$.get(M.inst)??[];S.push({type:"slot",id:`s${++this.serial}`,beat:M.beat,slot:M.slot}),$.set(M.inst,S)}for(const[M,S]of $)this.sink.controls(M,S);this.stats.slots+=u.length}if(!i.length)return 0;i.sort(($,M)=>$.beat-M.beat||M.age-$.age);const v=new Map;for(const $ of i){const M=$.lenBeats??Math.max(1,Math.min($.ev.len,l))/q;if(!this.voice($.inst,$.beat,$.beat+M,$.age)){this.stats.dropped++;continue}const S={note:$.ev.note,velocity:Math.max(.01,Math.min(1,$.velocity)),startBeat:$.beat,lengthBeats:M,spanBeats:M,gate:1,role:"chord",offsetSec:0,hit:++this.serial,root:$.ev.note};$.ev.slice!==void 0&&(S.slice=$.ev.slice),this.rung.push({inst:$.inst,pass:$.pass,note:S});const C=v.get($.inst)??[];C.push(S),v.set($.inst,C)}let A=0;for(const[$,M]of v)this.sink.send($,M),A+=M.length,this.stats.byInst[$]=(this.stats.byInst[$]??0)+M.length;return this.stats.sent+=A,A}knobSources(t){const n=this.rec,o=n.passes.some(i=>i.solo&&!i.mute),s=[];for(const i of n.passes){if(!qn(i)||!Xe(i,o))continue;const r=t?void 0:n.lapOf(i);s.push({id:i.id,age:i.n,first:r===void 0?0:r+1,endTick:i.endTick,...i.repeat?{repeat:!0}:{},...i.shift?{shift:i.shift}:{},knobs:i.knobs??[],events:i.events.filter(rn)})}if(!o)for(const i of n.knobDrafting())s.push({id:`${Ee}${i.lap}`,age:1e9+i.lap,first:t?0:i.lap+1,endTick:V(this.song),knobs:i.knobs,events:i.events});return s}driver(t,n,o){let s=null;for(const i of t)i.first<=o&&i.knobs.some(r=>ae(r)===n)&&(!s||i.age>s.age)&&(s=i);return s}curve(t,n){const o=t.knobs.find(l=>ae(l)===n),s=mc*this.song.bpm*q/60,i=[];let r=null;for(const l of t.events){if(ae(l)!==n||l.at>=t.endTick)continue;const c=r===null?Number.POSITIVE_INFINITY:l.at-r;i.push({at:l.at,value:l.value,...c>0&&c<=s?{glide:Math.min(fc,c/q)}:{}}),r=l.at}return{base:o?.base??i[0]?.value??0,points:i}}valueAt(t,n,o){const s=ot(t,this.song),i=at(t,this.song).length>1,r=i?t.endTick:V(this.song);let l=i?o-Math.floor(o/r)*r:o;l-=s,l<0&&(l+=r);let c=n.base;for(const d of n.points){if(d.at>l)break;c=d.value}return c}knobMarks(t,n){const o=at(t,this.song),s=ot(t,this.song),i=o.length>1?t.endTick:V(this.song),r=c=>{const d=c+s;return s&&d>=i?d-i:d},l=[];for(const c of o){l.push({t:c+r(0),value:n.base});for(const d of n.points)l.push({t:c+r(d.at),value:d.value,...d.glide?{glide:d.glide}:{}})}return l}pumpKnobs(t,n,o,s){for(const[c,d]of this.hands)d.until<=t&&this.hands.delete(c);const i=this.knobSources(s.loopChange),r=new Map;for(const c of this.knobs.values())r.set(ae(c),c);for(const c of i)for(const d of c.knobs)r.set(ae(d),d);if(!r.size)return;const l=new Map;for(const[c,d]of r){const p=this.resend.get(c);this.resend.delete(c);const h=p!==void 0?Math.min(n,Math.max(p,t)):n;if(!(o>h))continue;const b=this.hands.get(c),f=w=>!!b&&w>=b.from-1e-9&&w<b.until-1e-9;let x=this.knobs.get(c);const y=[],u=Math.max(0,Math.min(s.lapLo,Math.floor((h-s.b0)/s.L)-1));for(let w=u;w<=s.lapHi;w++){const g=s.beatAt(w,s.cs);if(s.beatAt(w,s.ce)<=h||g>=o)continue;const L=this.driver(i,c,w),E=Math.max(h,g);if(!L){x?.driver&&(f(E)||y.push({beat:E,value:x.base}),x.driver=null);continue}const v=this.curve(L,c);if(x||(x={inst:d.inst,param:d.param,driver:null,base:v.base,fresh:!1},this.knobs.set(c,x)),x.driver!==L.id||!x.fresh){const A=s.cs+(E-g)*q;f(E)||y.push({beat:E,value:this.valueAt(L,v,A)}),x.driver=L.id,x.base=v.base,x.fresh=!0}g>=h&&g<o&&!f(g)&&y.push({beat:g,value:this.valueAt(L,v,s.cs)});for(const A of this.knobMarks(L,v)){if(!s.inCycle(A.t)||A.t<s.cs)continue;const $=s.beatAt(w,A.t);$<h||$>=o||f($)||y.push({beat:$,value:A.value,...A.glide?{glide:A.glide}:{}})}}if(!y.length)continue;y.sort((w,g)=>w.beat-g.beat);const m=l.get(d.inst)??[];for(let w=0;w<y.length;w++){const g=y[w],k=y[w+1];k&&Math.abs(k.beat-g.beat)<1e-9||m.push({type:"param",id:`k${++this.serial}`,beat:g.beat,param:d.param,value:g.value,...g.glide?{glide:g.glide}:{}})}l.set(d.inst,m)}for(const[c,d]of l)d.length&&(d.sort((p,h)=>p.beat-h.beat),this.sink.controls(c,d),this.stats.params+=d.length)}hand(t,n,o){if(this.sentTo===Number.NEGATIVE_INFINITY)return null;const s=ae({inst:t,param:n}),i=this.rec,{lap:r}=i.place(o),l=i.beatOf(r+1,0),c=this.hands.get(s);if(c&&Math.abs(c.until-l)<1e-9)return this.sentTo>l&&this.resend.set(s,l),c;const d=this.driver(this.knobSources(!1),s,r);if(!d)return null;const p={inst:t,param:n,driver:d.id,from:o,until:l};return this.hands.set(s,p),this.sentTo>l&&this.resend.set(s,l),p}handsAt(t){const n=[];for(const o of this.hands.values()){if(t<o.from-1e-9||t>=o.until)continue;let s=o.driver;if(s.startsWith(Ee)){const i=Number(s.slice(Ee.length));s=this.rec.passes.find(r=>qn(r)&&this.rec.lapOf(r)===i)?.id??null}n.push({...o,pass:s})}return n}silence(t){if(this.rung=this.rung.filter(c=>c.note.startBeat>=t-uc),!this.rung.length||!this.sink.release)return;const n=this.rec.passes,o=n.some(c=>c.solo&&!c.mute),s=new Map(n.map(c=>[c.id,c])),i=new Set(this.rec.drafting().map(c=>c.lap)),r=c=>{if(c.startsWith(Ee)){const p=Number(c.slice(Ee.length));if(i.has(p))return!o;const h=n.find(b=>this.rec.lapOf(b)===p);return!!h&&Xe(h,o)}const d=s.get(c);return!!d&&Xe(d,o)},l=new Map;this.rung=this.rung.filter(c=>c.note.startBeat>=t||r(c.pass)?!0:(l.set(c.inst,[...l.get(c.inst)??[],c.note]),!1));for(const[c,d]of l)this.sink.release(c,d);l.size&&(this.stats.released+=[...l.values()].reduce((c,d)=>c+d.length,0))}lateTakes(t){const n=this.rec,o=Math.floor((t-n.b0)/n.lapBeats),s=n.passes.some(i=>i.solo&&!i.mute);return n.passes.some(i=>{if(!Xe(i,s)||!i.events.some(sn))return!1;const r=n.lapOf(i);return r===void 0||o>r})}voice(t,n,o,s){const i=(this.sounding.get(t)??[]).filter(r=>r.end>n);if(i.length>=hc){let r=0;for(let l=1;l<i.length;l++)i[l].age<i[r].age&&(r=l);if(s<=i[r].age)return this.sounding.set(t,i),!1;i.splice(r,1)}return i.push({start:n,end:o,age:s}),this.sounding.set(t,i),!0}}const no=.125,wc=2*R,yc={running:!1,beatAt:()=>0,timeAt:()=>0};class xc{session;rec;replay;deps;wantJam=!1;jamming=!1;lastBeat=0;lastLap=-1;notice="";listeners=new Set;offs=[];listening=!1;soundOff=null;recent=[];starting=null;snap=null;startedBy=null;countedIn=!0;patterns=new Map;constructor(t,n){this.session=t,this.deps=n,this.rec=new pc({song:t.song,b0:0,passes:t.passes,now:n.date}),this.replay=n.sink?new bc(this.rec,n.sink):null,this.replay&&(this.replay.live=(s,i)=>this.live(s,i));const o=n.host;o?.clock&&this.offs.push(o.clock.onChange(s=>this.clockChanged(s))),o?.onPlayed&&this.offs.push(o.onPlayed((s,i)=>this.played(s,i))),o?.claimKeys&&this.offs.push(o.claimKeys(["Space","Backspace"],s=>(s.code==="Space"?this.toggle():s.shiftKey?this.redo():this.undo(),!0))),this.syncTempo()}get transport(){return this.deps.host?.clock?.transport??yc}beatNow(){return this.transport.beatAt(this.deps.now())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}changed(t=!0){t&&(this.session.updatedAt=(this.deps.date?.()??new Date).toISOString(),this.deps.save(this.session));for(const n of[...this.listeners])try{n()}catch{}}syncTempo(){if(this.session.passes.length)return;const t=this.deps.host?.studioTransport?.bpm();if(typeof t!="number"||!Number.isFinite(t))return;const n=Math.min(Dt,Math.max(Nt,Math.round(t)));n!==this.session.song.bpm&&(this.session.song.bpm=n,this.session.song.bars=Math.min(this.session.song.bars,Ve(n)),this.changed())}toggle(){this.waiting?this.cancelWait():this.jamming||this.wantJam?this.stop():this.jam()}get waiting(){return this.listening||this.starting!==null}jam(){const t=this.deps.host;if(!t?.studioTransport||!t.clock){this.notice="Jam works inside the Studio.",this.changed(!1);return}if(this.syncTempo(),this.notice="",this.session.song.start==="wait"){if(t.onSound){this.wait();return}this.notice="Wait needs a newer Studio. Counting in."}if(this.transport.running){const o=Math.ceil(this.beatNow()/R+.05)*R;this.begin(o)}else this.wantJam=!0,t.metronome?.want(!0),t.studioTransport.playOnly?t.studioTransport.playOnly(t.instance??"looper"):t.studioTransport.play();this.changed(!1)}wait(){const t=this.deps.host;if(!t?.onSound)return;this.recent=[],this.listening=!0;let n=null;try{n=t.onSound(o=>this.heard(o))}catch{n=null}this.listening?this.soundOff=n:n?.(),this.changed(!1)}stopListening(){this.listening=!1;const t=this.soundOff;this.soundOff=null;try{t?.()}catch{}}cancelWait(){const t=this.starting!==null;this.stopListening(),this.starting=null,this.recent=[],t&&this.transport.running&&this.deps.host?.studioTransport?.stop(),this.changed(!1)}heard(t){if(!this.listening)return;this.startedBy=t;const n=this.deps.host;if((t.kind==="start"||t.kind==="in")&&t.from!=="studio"&&t.beat!==null&&this.markLive(t.from,t.beat),t.stopped||t.beat===null||!this.transport.running){this.stopListening(),this.starting={at:t.at,from:t.from,lead:[]};for(const i of this.recent)i.at>=t.at-.1&&this.starting.lead.push(i);this.recent=[],n?.studioTransport?.playOnly?n.studioTransport.playOnly(n.instance??"looper"):n?.studioTransport?.play(),this.changed(!1);return}const o=t.kind==="start"||t.kind==="in"?t.beat:Math.floor((t.beat+no)/R)*R;this.stopListening();const s=this.recent;this.recent=[],this.begin(o,!1);for(const i of s){const r=i.events.filter(l=>!(l.type==="note"&&l.stopped)&&l.beat>=o-no);r.length&&this.record(i.source,r)}this.changed(!1)}startFromSound(t){const n=this.starting;if(this.starting=null,!n)return;this.begin(t,!1);const o=this.transport.timeAt(t),s=Math.max(1e-6,this.transport.beatAt(o+1)-t);this.snap={b0:t,first:null,t0:o,bps:s,until:o+.25};for(const i of n.lead)this.snapPlayed(i.source,i.events,i.at);this.changed(!1)}snapPlayed(t,n,o){const s=this.snap;if(!s)return[...n];const i=[],r=s.b0+(o-s.t0)*s.bps;for(const l of n){const c=l.type==="note"&&l.stopped||l.type==="note"&&l.beat<s.b0-1e-9;if(l.type!=="note"||!c){i.push(l);continue}if(!l.on){this.rec.played(t,[{...l,stopped:!1,beat:Math.max(r,s.b0)}]);continue}s.first===null&&(s.first=o);const d=s.b0+Math.max(0,o-s.first)*s.bps;this.rec.snapFirst(t,{...l,stopped:!1},Math.min(r,d),d)&&this.changed(!1)}return i}markLive(t,n){const o=this.patterns.get(t);!o||n>o.last+R+1e-6||n<o.from-R?this.patterns.set(t,{from:n,last:n}):(o.last=Math.max(o.last,n),o.from=Math.min(o.from,n))}live(t,n){const o=this.patterns.get(t);return!!o&&n>=o.from-1e-6&&n<=o.last+R+1e-6}begin(t,n=!0){this.wantJam=!1,this.jamming=!0,this.snap=null;const o=t+(n?this.session.song.countInBars*R:0);if(this.countedIn=o>t,this.rec.resume(o),this.replay?.start(),this.transport.running){const s=Math.min(t,this.beatNow());this.replay?.pump(s,this.transport.beatAt(this.deps.now()+Za))}this.lastLap=-1,this.deps.host?.metronome?.want(!0),this.showCountIn(t,o)}showCountIn(t,n){const o=this.deps.host;if(!this.deps.countIn||!o?.mapper||n<=t)return;const s=this.transport,i=l=>o.mapper?.toContextTime(s.timeAt(l))??0,r=[];for(let l=t;l<n;l++)r.push(i(l));try{this.deps.countIn.show("looper",{beats:r,accents:r.map((l,c)=>c%R===0),until:i(n)})}catch{}}stop(){if(this.waiting){this.cancelWait();return}const t=this.deps.host,n=this.jamming;this.finish(this.transport.running?this.beatNow():this.lastBeat),(n||this.transport.running)&&t?.studioTransport?.stop()}finish(t){this.wantJam=!1,this.snap=null,this.pending&&(this.applyLoop(this.pending.loop),this.pending=null),this.jamming&&(this.jamming=!1,this.rec.stop(t).length&&(this.notice="")),this.rec.paused=!1,this.replay?.stop(),this.deps.host?.metronome?.want(!1);try{this.deps.countIn?.clear("looper")}catch{}this.changed()}clockChanged(t){const n=typeof t.beat=="number"?t.beat:0;t.kind==="start"&&this.starting?this.startFromSound(n):t.kind==="start"&&this.wantJam?this.begin(n):t.kind==="stop"&&(this.jamming||this.wantJam)?this.finish(this.lastBeat):t.kind==="snapshot"&&!this.transport.running&&this.jamming&&this.finish(this.lastBeat),(t.kind==="stop"||t.kind==="snapshot"&&!this.transport.running)&&(this.patterns.clear(),this.starting&&(this.starting=null,this.recent=[])),this.changed(!1)}played(t,n){for(const i of n)i.type==="note"&&i.on&&i.pattern&&!i.stopped&&this.markLive(t,i.beat);const o=this.deps.now();if(this.starting){this.starting.lead.push({source:t,events:n,at:o});return}if(this.listening){this.keepRecent(t,n,o);return}if(!this.jamming)return;const s=this.snap?this.snapPlayed(t,n,o):n;this.snap&&o>this.snap.until&&(this.snap=null),s.length&&this.record(t,s)}keepRecent(t,n,o){const s=this.transport.running?this.beatNow():null;this.recent.push({source:t,events:n,at:o}),s!==null&&(this.recent=this.recent.filter(i=>i.events.some(r=>r.beat>=s-wc))),this.recent.length>256&&this.recent.splice(0,this.recent.length-256)}record(t,n){let o=!1;if(this.replay)for(const i of n)i.type==="param"&&this.replay.hand(t,i.param,i.beat)&&(o=!0);const s=this.rec.played(t,n);o&&!s.length&&this.changed(!1),s.length&&this.changed(s.some(i=>i.ev.kind==="take"))}tick(){if(!this.jamming||!this.transport.running)return!1;const t=this.beatNow();this.lastBeat=t;const{lap:n}=this.rec.place(t);let o=!1;const s=this.deps.load?.()==="over";s&&!this.rec.paused&&(this.rec.paused=!0,this.notice="Too busy to record. Playback carries on.",o=!0),n!==this.lastLap&&(this.lastLap=n,o=!0,!s&&this.rec.paused&&(this.rec.paused=!1,this.notice=""));const i=this.rec.seam(t),r=this.pending;if(r&&t>=r.seam){this.pending=null;const d=this.rec.lapStart,p=this.rec.place(t).lap;this.applyLoop(r.loop),this.rec.rebase(r.seam,p,d),this.replay?.rebase(r.seam),this.lastLap=-1,this.changed()}const l=this.transport.beatAt(this.deps.now()+Za),c=this.pending;if(c&&l>c.seam){this.replay?.pump(t,c.seam);const d=Pn({bars:this.session.song.bars,...c.loop?{loop:c.loop}:{}});this.replay?.pump(Math.max(t,c.seam),l,{b0:c.seam,lapStart:d.start,lapTicks:d.length})}else this.replay?.pump(t,l);return i.length?(this.changed(),!0):o}view(){const t=this.session,n=this.transport,o=this.jamming&&n.running?this.beatNow():null,s=o!==null&&!this.countedIn?Math.max(o,this.rec.b0):o,i=s===null?null:this.rec.place(s),r=s!==null&&s<this.rec.b0,l=t.passes.reduce((p,h)=>Math.max(p,h.n),0)+1,c=this.deps.host?.studioTransport?.bpm(),d=this.waiting?"waiting":this.jamming?r?"count-in":this.rec.full?"full":this.rec.paused?"paused":"recording":"idle";return{session:t,phase:d,jamming:this.jamming||this.wantJam,bar:i&&!r?Math.floor((this.rec.lapStart+i.tick)/(R*960))+1:null,songPos:i&&!r?(this.rec.lapStart+i.tick)/V(t.song):null,pendingLoop:this.pending?.loop,nextPass:l,waiting:this.waiting,countIn:r&&s!==null?Math.max(1,Math.ceil(this.rec.b0-s)):null,lapPos:i&&!r?i.tick/this.rec.lapTicks:null,lapHasNotes:i?this.rec.hasDraft(i.lap):!1,hands:s!==null&&i&&!r?this.handsAt(s):[],canRedo:this.rec.canRedo,locked:t.passes.length>0,studioBpm:typeof c=="number"&&Math.round(c)!==t.song.bpm?Math.round(c):null,notice:this.notice}}handsAt(t){if(!this.replay)return[];const n=V(this.session.song),o=i=>{const{tick:r}=this.rec.place(i);return Math.max(0,Math.min(1,(this.rec.lapStart+r)/n))},s=[];for(const i of this.replay.handsAt(t)){if(!i.pass)continue;const r=(this.rec.lapStart+this.rec.lapTicks)/n;s.push({pass:i.pass,inst:i.inst,param:i.param,from:o(i.from),to:r})}return s}replayChanged(t=!0){if(!this.jamming||!this.replay||!this.transport.running)return;const n=this.beatNow();this.replay.rewind(t?n:Math.ceil(n+1e-6))}undo(){const t=this.rec.undo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"This lap is dropped.":`${t.pass.name} undone.`:"Nothing to undo.",t&&this.replayChanged(),this.changed(!!t),t}redo(){const t=this.rec.redo(this.jamming?this.beatNow():Number.NEGATIVE_INFINITY);return this.notice=t?t.kind==="lap"?"The lap is back.":`${t.pass.name} is back.`:"Nothing to redo.",t&&this.replayChanged(),this.changed(!!t),t}setSong(t){const n=this.session.song;if(t.bars!==void 0&&!this.jamming&&!this.wantJam){const o=Math.max(1,Math.min(Ve(n.bpm),Math.round(t.bars)));if(!this.session.passes.length)n.bars=o;else if(o>n.bars&&t.grow){n.bars=o;const s=V(n);for(const i of this.session.passes)i.endTick<s&&i.repeat===void 0&&(i.repeat=t.grow==="repeat")}}t.countInBars!==void 0&&(n.countInBars=t.countInBars),t.start==="wait"?n.start="wait":t.start==="count-in"&&delete n.start,t.quantize===null||t.quantize?.grid==="off"?delete n.quantize:t.quantize&&(n.quantize={...t.quantize}),t.quantize!==void 0&&this.replayChanged(!1),this.changed()}setLoop(t){const n=this.session.song;let o=null;if(t){const l=Math.max(1,Math.min(n.bars,Math.round(t.from))),c=Math.max(l,Math.min(n.bars,Math.round(t.to)));o=l===1&&c===n.bars?null:{from:l,to:c}}if(!this.jamming||!this.transport.running){this.pending=null,this.applyLoop(o),this.changed();return}const s=this.beatNow(),{lap:i}=this.rec.place(s),r=this.rec.beatOf(Math.max(i+1,0),0);this.pending={loop:o,seam:r},this.replay?.rewind(r),this.changed(!1)}applyLoop(t){t?this.session.song.loop=t:delete this.session.song.loop}pending=null;pass(t){return this.session.passes.find(n=>n.id===t)}editPass(t,n){const o=this.pass(t);if(o){if(n.name!==void 0){const s=n.name.replace(/\s+/g," ").trim().slice(0,Le);o.name=s||`Pass ${o.n}`}if(n.kept!==void 0&&(o.kept=n.kept),n.mute!==void 0&&(o.mute=n.mute),n.solo!==void 0&&(o.solo=n.solo),n.volume!==void 0&&(o.volume=Math.min(1,Math.max(0,n.volume))),n.repeat!==void 0&&o.endTick<V(this.session.song)&&(o.repeat=n.repeat),n.shift!==void 0){const s=Math.max(-Dn,Math.min(Dn,Math.round(n.shift)||0));s?o.shift=s:delete o.shift}n.quantize===null?delete o.quantize:n.quantize&&(o.quantize={...n.quantize}),n.mute!==void 0||n.solo!==void 0||n.repeat!==void 0||n.shift!==void 0?this.replayChanged():(n.volume!==void 0||n.quantize!==void 0)&&this.replayChanged(!1),this.changed()}}deletePass(t){const n=this.session.passes.findIndex(s=>s.id===t);if(n<0)return null;const[o]=this.session.passes.splice(n,1);return this.notice="",this.replayChanged(),this.changed(),o?{pass:o,index:n}:null}restorePass(t,n){const o=this.session.passes;return o.length>=ce||o.some(s=>s.id===t.id)?!1:(o.splice(Math.min(Math.max(0,n),o.length),0,t),this.replayChanged(),this.changed(),!0)}clearUnkept(){const t=this.session.passes.length,n=this.session.passes.filter(o=>o.kept);return this.session.passes.splice(0,t,...n),this.replayChanged(),this.changed(),t-n.length}newSong(){(this.jamming||this.waiting)&&this.stop();const t=ks(this.deps.host?.studioTransport?.bpm()??this.session.song.bpm,this.deps.date?.());return t.song.countInBars=this.session.song.countInBars,this.session.song.start&&(t.song.start=this.session.song.start),this.use(t),this.changed(),t}openSession(t){(this.jamming||this.waiting)&&this.stop(),this.use(t),this.changed(!1)}rename(t){const n=t.replace(/\s+/g," ").trim().slice(0,aa);return!n||n===this.session.name?!1:(this.session.name=n,this.changed(),!0)}use(t){this.session=t,this.rec.song=t.song,this.rec.passes=t.passes,this.rec.forgetUndone(),this.notice=""}get passCount(){return this.session.passes.length}get maxPasses(){return ce}dispose(){this.stopListening();for(const t of this.offs.splice(0))t();this.deps.host?.metronome?.want(!1),this.listeners.clear()}}const Es=e=>e==="off"?"Off":e;function vc(e){const t=e.quantize?.grid??"off";return`Song · ${t==="off"?"off":t}`}function $c(e){return[{value:"song",label:vc(e)},...Ht.map(t=>({value:t,label:Es(t)}))]}const kc=()=>Ot.map(e=>({value:String(e),label:`${Math.round(e*100)}%`})),Ec=e=>e.quantize?.grid??"song",Ac=e=>!!e.quantize&&e.quantize.grid!=="off";function Sc(e,t,n){return n==="song"||!Ht.includes(n)?null:{grid:n,strength:e.quantize?.strength??t.quantize?.strength??1}}function Mc(e,t){const n=Number(t);return!e.quantize||!Ot.includes(n)?null:{grid:e.quantize.grid,strength:n}}const Tc="netcomposer-looper",re="sessions",Lc="netcomposer.looper.current.v1",Cc=500;function zc(e){return new Promise((t,n)=>{const o=e.open(Tc,1);o.onupgradeneeded=()=>{o.result.objectStoreNames.contains(re)||o.result.createObjectStore(re,{keyPath:"id"})},o.onsuccess=()=>t(o.result),o.onerror=()=>n(o.error)})}function ao(e){return new Promise((t,n)=>{e.oncomplete=()=>t(),e.onerror=()=>n(e.error),e.onabort=()=>n(e.error)})}function Fc(e={}){const t=e.idb===void 0?oo(()=>globalThis.indexedDB):e.idb,n=e.local===void 0?oo(()=>globalThis.localStorage):e.local,o=e.currentKey??Lc;let s=null;const i=()=>t?(s??=zc(t),s):Promise.reject(new Error("no IndexedDB"));let r=null,l=null,c=Promise.resolve(),d=0;const p=u=>{try{n?.setItem(o,u)}catch{}},h=async u=>{const g=(await i()).transaction(re,"readonly").objectStore(re).get(u);return new Promise((k,L)=>{g.onsuccess=()=>k(g.result),g.onerror=()=>L(g.error)})},b=u=>{const m=c.then(async()=>{const g=(await i()).transaction(re,"readwrite");u(g.objectStore(re)),await ao(g)});return c=m.catch(()=>{d++}),m.then(()=>!0,()=>!1)},f=async u=>{if(!t||!u)return null;try{const m=await h(u);return m===void 0?null:oa(m)}catch{return null}},x=u=>{const m=structuredClone(u);c=c.then(async()=>{const g=(await i()).transaction(re,"readwrite");g.objectStore(re).put(m),await ao(g),p(m.id)}).catch(()=>{d++})},y=()=>{l&&clearTimeout(l),l=null;const u=r;r=null,u&&x(u)};return{async load(){let u=null;try{u=n?.getItem(o)??null}catch{u=null}return u?f(u):null},get:f,setCurrent:p,async list(){if(!t)return[];y(),await c;let u=[];try{const g=(await i()).transaction(re,"readonly").objectStore(re).getAll();u=await new Promise((k,L)=>{g.onsuccess=()=>k(g.result),g.onerror=()=>L(g.error)})}catch{return[]}return Dc(u)},async rename(u,m){const w=In(m);if(!t||!w)return!1;y(),await c;let g;try{g=await h(u)}catch{return!1}return!g||typeof g!="object"?!1:b(k=>k.put({...g,name:w}))},async remove(u){return t?(r?.id===u&&(l&&clearTimeout(l),l=null,r=null),b(m=>m.delete(u))):!1},async adopt(u){const m=await f(u.id);if(m&&"session"in m&&Nc(m.session,u))return m.session;const w=m===null?structuredClone(u):{...structuredClone(u),id:$s(),name:In(`${u.name} (scene)`)||u.name};if(!await b(k=>k.put(w)))throw new Error("not saved");return w},save(u,m=!1){if(r=u,m){y();return}l||(l=setTimeout(y,Cc))},async flush(){y(),await c},get failures(){return d}}}function In(e){return typeof e=="string"?e.replace(/\s+/g," ").trim().slice(0,aa):""}function Nc(e,t){return JSON.stringify({...e,updatedAt:""})===JSON.stringify({...t,updatedAt:""})}function Dc(e){const t=[];for(const o of e){if(!o||typeof o!="object")continue;const s=o;if(typeof s.id!="string"||!s.id)continue;const i=oa(o);if("session"in i){const r=i.session;t.push({id:r.id,name:r.name,passes:r.passes.length,bars:r.song.bars,updatedAt:r.updatedAt})}else{const r=s.song;t.push({id:s.id,name:In(s.name)||"Untitled song",passes:Array.isArray(s.passes)?s.passes.length:0,bars:typeof r?.bars=="number"?r.bars:0,updatedAt:typeof s.updatedAt=="string"?s.updatedAt:"",error:i.error})}}const n=o=>{const s=Date.parse(o.updatedAt);return Number.isNaN(s)?0:s};return t.sort((o,s)=>n(s)-n(o))}const qc=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Pc(e,t=new Date){const n=new Date(e),o=n.getTime();if(Number.isNaN(o))return"";const s=t.getTime()-o;if(s>=0&&s<6e4)return"just now";if(s>=0&&s<36e5)return`${Math.floor(s/6e4)} min ago`;const i=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,r=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime(),l=Math.round((r(t)-r(n))/864e5);if(l===0)return`today ${i}`;if(l===1)return`yesterday ${i}`;const c=`${qc[n.getMonth()]} ${n.getDate()}`;return n.getFullYear()===t.getFullYear()?c:`${c}, ${n.getFullYear()}`}function Ic(e,t=new Date){const n=[`${e.passes} ${e.passes===1?"pass":"passes"}`,`${e.bars} ${e.bars===1?"bar":"bars"}`],o=Pc(e.updatedAt,t);return o&&n.push(o),n.join(" · ")}function oo(e){try{return e()??null}catch{return null}}const jc=4e3;function U(e,t={},...n){const o=document.createElement(e);for(const[s,i]of Object.entries(t))o.setAttribute(s,i);return o.append(...n),o}function Bc(e){const t=U("button",{type:"button",class:"nc-page-action lp-songs-btn","aria-haspopup":"menu","aria-expanded":"false","aria-controls":"lp-songs","data-lp-id":"songs"},"Songs"),n=U("div",{class:"lp-songs-list",role:"none"}),o=U("div",{class:"lp-songs-msg",role:"status"});o.hidden=!0;const s=U("div",{id:"lp-songs",class:"lp-songs",role:"menu","aria-label":"Songs","data-lp-id":"songs-menu"},n,o,U("div",{class:"lp-songs-sep",role:"separator"}),U("div",{class:"lp-songs-note"},e.note)),i=U("span",{class:"lp-songs-wrap"},t,s);let r=null,l=null;const c=()=>i.hasAttribute("data-open"),d=E=>{o.textContent=E,o.hidden=!E},p=()=>[...n.querySelectorAll(".lp-song-main")],h=E=>E?.closest(".lp-song")??null,b=E=>[...E.querySelectorAll('[role="menuitem"]')],f=(E,v="main")=>{((E?n.querySelector(`.lp-song[data-song="${CSS.escape(E)}"]`):null)?.querySelector(`.lp-song-${v}`)??p()[0]??t).focus({preventScroll:!0})},x=()=>{if(!r)return;clearTimeout(r.timer);const E=n.querySelector(`.lp-song[data-song="${CSS.escape(r.id)}"] .lp-song-delete`);E&&(E.textContent="Delete",E.removeAttribute("data-lp-ask")),r=null};async function y(E){const v=await e.list(),A=e.openId(),$=e.now?.()??new Date;x(),l=null,n.replaceChildren(...v.map(M=>{const S=M.id===A,C=`${Ic(M,$)}${S?" · open":""}${M.error?" · doesn't open":""}`,F=U("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-main","data-lp-id":`song-${M.id}`,"aria-label":`${M.name}, ${C}`},U("span",{class:"lp-song-name"},M.name),U("span",{class:"lp-song-sub"},C));S&&F.setAttribute("aria-current","true"),F.addEventListener("click",()=>void u(M));const D=U("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-rename","data-lp-id":`song-rename-${M.id}`,"aria-label":`Rename ${M.name}`},"Rename");D.addEventListener("click",()=>m(M)),M.error&&(D.disabled=!0);const j=U("button",{type:"button",role:"menuitem",tabindex:"-1",class:"lp-song-act lp-song-delete","data-lp-id":`song-delete-${M.id}`,"aria-label":`Delete ${M.name}`},"Delete");j.addEventListener("click",()=>void w(M,j));const B=U("div",{class:"lp-song",role:"none","data-song":M.id},F,U("span",{class:"lp-song-acts",role:"none"},D,j));return S&&B.setAttribute("data-open",""),B})),v.length||n.append(U("div",{class:"lp-songs-empty"},"No songs yet.")),E&&f(E.id,E.part)}async function u(E){if(E.id===e.openId()){k(!0);return}const v=await e.open(E.id);if(v){d(v);return}k(!0)}function m(E){const v=n.querySelector(`.lp-song[data-song="${CSS.escape(E.id)}"]`),A=v?.querySelector(".lp-song-main"),$=A?.querySelector(".lp-song-name");if(!v||!A||!$)return;x(),l=E.id;const M=U("input",{class:"lp-name-input lp-song-input",value:E.name,maxlength:"80","aria-label":"Song name","data-lp-id":`song-name-${E.id}`});M.value=E.name;let S=!1;const C=async F=>{if(S)return;S=!0,l=null;const D=M.value.replace(/\s+/g," ").trim();F&&D&&D!==E.name&&await e.rename(E.id,D),await y({id:E.id,part:"rename"})};M.addEventListener("keydown",F=>{F.stopPropagation(),F.key==="Enter"?(F.preventDefault(),C(!0)):F.key==="Escape"&&(F.preventDefault(),C(!1))}),M.addEventListener("blur",()=>void C(!0)),v.setAttribute("data-renaming",""),v.insertBefore(M,A),M.focus(),M.select()}async function w(E,v){if(r?.id!==E.id){x(),v.textContent="Press again to delete",v.setAttribute("data-lp-ask",""),r={id:E.id,timer:setTimeout(x,jc)};return}x();const A=p().findIndex(S=>h(S)?.dataset.song===E.id);await e.remove(E.id),await y();const $=p();($[Math.min(Math.max(A,0),$.length-1)]??t).focus({preventScroll:!0})}async function g(){c()||(i.setAttribute("data-open",""),t.setAttribute("aria-expanded","true"),document.addEventListener("pointerdown",L,!0)),d(""),await y({id:e.openId()})}function k(E=!1){c()&&(x(),i.removeAttribute("data-open"),t.setAttribute("aria-expanded","false"),document.removeEventListener("pointerdown",L,!0),d(""),E&&t.focus({preventScroll:!0}))}function L(E){i.contains(E.target)||k()}return t.addEventListener("click",()=>c()?k():void g()),t.addEventListener("keydown",E=>{(E.key==="ArrowDown"||E.key==="ArrowUp")&&(E.preventDefault(),g().then(()=>{const v=p();(E.key==="ArrowUp"?v[v.length-1]:v[0])?.focus({preventScroll:!0})}))}),s.addEventListener("keydown",E=>{if(l)return;const v=p(),A=document.activeElement,$=h(A),M=v.findIndex(C=>h(C)===$);let S;if(E.key==="ArrowDown")S=v[(M+1)%v.length];else if(E.key==="ArrowUp")S=v[(M-1+v.length)%v.length];else if(E.key==="Home")S=v[0];else if(E.key==="End")S=v[v.length-1];else if(E.key==="ArrowRight"||E.key==="ArrowLeft"){if(!$)return;const C=b($).filter(j=>!j.disabled),F=C.indexOf(A),D=E.key==="ArrowRight"?1:-1;S=C[Math.min(C.length-1,Math.max(0,F+D))]}else if(E.key==="Escape"){E.preventDefault(),E.stopPropagation(),k(!0);return}else if(E.key==="Tab"){k(!1);return}else return;E.preventDefault(),S?.focus({preventScroll:!0})}),{el:i,button:t,open:g,close:k,isOpen:c,async refresh(){c()&&!l&&await y()}}}const As=()=>{try{if(typeof window>"u"||window.parent===window)return null;const e=window.parent.ncStudio;return e&&e.version===1?e:null}catch{return null}};let De;function Rc(){if(De!==void 0)return De;De=null;try{De=As()?.attach("looper",{instance:1})??null}catch{De=null}return De}function Hc(){return As()?.countIn??null}function Oc(){try{const e=window.parent.__NC_LOAD__;return typeof e?.state=="string"?e.state:null}catch{return null}}const _c="netcomposer.looper.hidden.v1",Vc=50;function T(e,t={},...n){const o=document.createElement(e);for(const[s,i]of Object.entries(t))i!==void 0&&o.setAttribute(s,i);for(const s of n)s!==null&&s!==!1&&o.append(s);return o}const G=e=>({[ze]:rt(e)||void 0});function Y(e,t,n){const o=T("button",{type:"button",...t},e);return o.addEventListener("click",n),o}function Ze(e,t){return T("span",{class:"nc-label",...t?G(t):{}},e)}function Ss(e,t,n,o,s,i=!1){const r=T("div",{class:"nc-seg",role:"radiogroup","aria-label":t,"data-lp-id":e});for(const l of n){const c=Y(l.label,{role:"radio","aria-checked":String(l.value===o),"data-lp-id":`${e}-${l.value}`},()=>{l.value!==o&&s(l.value)});c.disabled=i,r.append(c)}return r}function jn(e,t,n,o,s,i="lp-toggle"){return Y(t,{class:i,"aria-pressed":String(n),"data-lp-id":e,...G(o)},s)}function sa(e,...t){const n=document.activeElement,o=n instanceof HTMLElement&&e.contains(n)?n.dataset.lpId:void 0;e.replaceChildren(...t.filter(s=>!!s)),o&&e.querySelector(`[data-lp-id="${CSS.escape(o)}"]`)?.focus()}function Ms(e,t,n){const o=T("div",{class:"lp-body","data-lp-module":e}),s=()=>({id:e,title:t,summary:n(),controls:[{type:"label",id:`${e}-mount`,text:""}]}),i=ec(s(),_c),r=()=>{const l=i.el.querySelector(`[data-nc-id="${e}-mount"]`);l&&l.nextSibling!==o&&l.after(o)};return r(),{handle:i,mount:o,update(){i.update(s()),r()}}}const Q=Rc(),X=Fc({currentKey:Q?.storageKey?.("netcomposer.looper.current.v1")}),qe=await X.load();let Ts="",Bn;qe&&"session"in qe?Bn=qe.session:(qe&&"error"in qe&&(Ts=`Your last song didn't open: ${qe.error}. A new one is started.`),Bn=ks(Q?.studioTransport?.bpm()??120));function Gc(){let e=null;try{e=Q?.notesSource?.("Lupa")??null}catch{e=null}if(!e)return null;const t=e,n=new Set,o=s=>{n.has(s)||(n.add(s),t.setTarget(s,{role:"chord",on:!0,layer:!0}))};return{send(s,i){o(s),t.send(i,s)},controls(s,i){o(s),t.sendControls(i,s)},laps(s){let i=[];try{i=(Q?.notesTargets?.()??[]).filter(r=>r.type==="lucy"&&r.takesNotes).map(r=>r.instance)}catch{i=[]}for(const r of i)o(r),t.sendControls(s,r)},off(s){t.off(s===void 0?"stop":"restart",s)},release(s,i){n.has(s)&&t.release?.(i,s)},restart(){t.restart()}}}const z=new xc(Bn,{host:Q,countIn:Hc(),load:Oc,now:Xs,save:e=>X.save(e),sink:Gc()});z.notice=Ts;addEventListener("pagehide",()=>X.save(z.session,!0));let lt=null;const Ls=document.getElementById("app");Ls.classList.add("nc","nc-page");Ul();const Cs=T("header",{class:"nc-page-hd"},T("div",{},T("h1",{class:"nc-page-title"},T("span",{class:"lp-brand"},"LUPA")," ",T("span",{class:"nc-page-sep"},"/")," LOOPER ",T("span",{class:"nc-page-sep"},"/")," ",T("span",{class:"nc-mono"},"01")),T("p",{class:"nc-page-sub"},"A NetComposer element.")),T("div",{class:"nc-page-actions"},Kc(),Y("New song",{class:"nc-page-action","data-lp-id":"new-song",...G("new-song")},()=>Uc()))),zs=T("div",{class:"nc-stack","data-nc-layout":"adjacent","data-lp-stack":""}),Fs=T("footer",{class:"lp-foot lp-sub"},T("span",{class:"lp-notice",role:"status"}),T("span",{class:"lp-mono"},"netcomposer.looper.01"));Ls.append(Cs,T("main",{class:"nc-page-body"},zs),Fs);let Pe=null;function Wc(){return Cs.querySelector('[data-lp-id="new-song"]')}function ln(e){const t=Wc();t&&(t.textContent=e?"Press again for a new song":"New song",t.toggleAttribute("data-lp-ask",e))}function Uc(){if(z.passCount&&!Pe){ln(!0),Pe=setTimeout(()=>{Pe=null,ln(!1)},4e3);return}Pe&&clearTimeout(Pe),Pe=null,ln(!1),Ns(),z.notice="New song started. The last one stays in Songs.",te()}function Ns(){z.newSong(),Fe=null,K="all"}function Yc(){return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)?"⌘S":"Ctrl+S"}function Kc(){return lt=Bc({list:()=>X.list(),openId:()=>z.session.id,open:so,async rename(e,t){e===z.session.id?z.rename(t):await X.rename(e,t)},async remove(e){if(e===z.session.id){z.jamming&&z.stop(),await X.flush();const t=(await X.list()).find(o=>o.id!==e&&!o.error);(t?await so(t.id):"no song")&&Ns(),z.notice="Song deleted."}await X.remove(e),te()},note:Q?`Songs save as you play, in this browser. Save the Studio’s scene (${Yc()}) to keep the open song in the scene file too.`:"Songs save as you play, in this browser."}),lt.el}async function so(e){if(z.jamming)return"Stop jamming to open another song.";await X.flush();const t=await X.get(e);return t?"error"in t?`That song doesn't open: ${t.error}.`:(z.openSession(t.session),X.setCurrent(t.session.id),Fe=null,K="all",z.notice=`“${t.session.name}” is open.`,te(),null):"That song isn't in this browser any more."}function Xc(){lt?.button.setAttribute(ze,rt("songs").replace("{name}",z.session.name))}const Ds=T("section",{class:"lp-setup","aria-label":"Setup","data-lp-id":"setup"}),we=Q?.metronome,qs=jl({id:"click-volume",label:"Click",min:0,max:100,step:1,value:Math.round((we?.prefs().volume??.7)*100),format:e=>`${Math.round(e)}%`,onInput:e=>we?.set({volume:e/100})});qs.el.setAttribute(ze,rt("volume"));we?.onChange(()=>te());function Pt(e,t,n,o,s,i=!1){const r=T("select",{class:"nc-select lp-select","aria-label":t,"data-lp-id":e});for(const l of n){const c=T("option",{value:l.value},l.label);l.value===o&&(c.selected=!0),r.append(c)}return r.disabled=i,r.addEventListener("change",()=>s(r.value)),r}let be=null;function Jc(e){if(be===null)return null;const t=e.session.song,n=be*R*q,o=e.session.passes.filter(l=>l.endTick<n&&l.repeat===void 0),s=o.length?Math.max(...o.map(l=>Math.floor(n/l.endTick))):be/t.bars,i=l=>{const c=be;be=null,l&&c&&z.setSong({bars:c,grow:l}),te()},r=o.length;return T("div",{class:"lp-ask",role:"alertdialog","aria-label":"Grow the song","data-lp-id":"grow-ask"},T("span",{class:"lp-ask-title"},`Grow to ${be} bars?`),T("span",{class:"lp-sub"},r?`${r===1?"A pass is":`${r} passes are`} shorter. Repeat ${r===1?"it":"them"} to fill the song, or play ${r===1?"it":"them"} once so the rest is free. Each pass can change later.`:"Your passes keep their place."),Y(`Repeat ×${Math.max(2,Math.round(s))}`,{class:"nc-btn lp-ask-main","data-lp-id":"grow-repeat"},()=>i("repeat")),Y("Play once",{class:"nc-btn","data-lp-id":"grow-once"},()=>i("once")),Y("Cancel",{class:"nc-btn lp-ask-cancel","data-lp-id":"grow-cancel"},()=>i(null)))}function Qc(e){const t=e.session.song,n=t.start==="wait",o=n?T("span",{class:"lp-sub","data-lp-id":"start-sub"},"Jam waits for the first sound from any instrument."):T("span",{class:"lp-sub lp-start-sub","data-lp-id":"start-sub"},t.countInBars?"One bar of clicks first. ":"No count-in: Pass 1 starts with the clock. ",Y(t.countInBars?"Off":"On",{class:"lp-loop-off","data-lp-id":"count-in",...G("count-in")},()=>z.setSong({countInBars:t.countInBars?0:1})));return T("div",{class:"lp-field"},Ze("Start","start"),Ss("start","Start",[{value:"count-in",label:"Count-in"},{value:"wait",label:"Wait"}],n?"wait":"count-in",s=>z.setSong({start:s==="wait"?"wait":"count-in"}),e.jamming||e.waiting),o)}function Zc(e){const t=e.session.song,n=[1,2,4,8,16].filter(s=>s<=Ve(t.bpm)&&(!e.locked||s>=t.bars)),o=t.quantize;sa(Ds,T("h3",{class:"lp-section-title"},"Setup"),T("div",{class:"lp-field"},Ze("Tempo","tempo"),T("span",{class:"lp-value","data-lp-id":"tempo"},`${t.bpm} BPM`),e.studioBpm?T("span",{class:"lp-sub"},`Studio at ${e.studioBpm}: passes play at the Studio's tempo.`):e.locked?T("span",{class:"lp-sub"},"Locked: the song has passes."):T("span",{class:"lp-sub"},"Follows the Studio.")),T("div",{class:"lp-field"},Ze("Length","bars"),Ss("bars","Bars",n.map(s=>({value:String(s),label:String(s)})),String(be??t.bars),s=>{const i=Number(s);e.locked&&i>t.bars?(be=i,te()):z.setSong({bars:i})},e.jamming),Jc(e)??T("span",{class:"lp-sub"},`${t.bars} ${t.bars===1?"bar":"bars"} · ${lc(t)}`)),Qc(e),we?T("div",{class:"lp-row lp-toggles"},jn("metronome","Metronome",we.prefs().on,"metronome",()=>we.set({on:!we.prefs().on}))):null,we?qs.el:null,T("div",{class:"lp-pair"},T("label",{class:"lp-field"},Ze("Quantize","quantize"),Pt("quantize","Quantize",Ht.map(s=>({value:s,label:Es(s)})),o?.grid??"off",s=>z.setSong({quantize:s==="off"?null:{grid:s,strength:o?.strength??1}}))),T("label",{class:"lp-field"},Ze("Strength","strength"),Pt("strength","Strength",Ot.map(s=>({value:String(s),label:`${Math.round(s*100)}%`})),String(o?.strength??1),s=>o&&z.setSong({quantize:{grid:o.grid,strength:Number(s)}}),!o))))}const Ps=Ms("jam","Jam",()=>{const e=z.view(),t=e.session.song.loop,n=t?`loop ${Ge(t)}`:`/ ${e.session.song.bars}`;return e.jamming?`Pass ${e.nextPass} · Bar ${e.bar??"–"} ${n}`:`${z.passCount} / ${ce} passes`});function Ge(e){return e.from===e.to?`${e.from}`:`${e.from}–${e.to}`}const ed="http://www.w3.org/2000/svg",H=(e,t)=>{const n=document.createElementNS(ed,e);for(const[o,s]of Object.entries(t))n.setAttribute(o,s);return n},ct=44,Rn=2*Math.PI*ct,Is=H("svg",{viewBox:"0 0 100 100","aria-hidden":"true"}),js=H("circle",{class:"lp-ring-arc",cx:"50",cy:"50",r:String(ct),"stroke-width":"3","stroke-dasharray":`0 ${Rn}`,transform:"rotate(-90 50 50)"}),Et=H("circle",{class:"lp-ring-head",cx:"50",cy:"6",r:"3"});Is.append(H("circle",{class:"lp-ring-track",cx:"50",cy:"50",r:String(ct),"stroke-width":"1"}),js,Et);const Bs=T("span",{class:"lp-bar","data-lp-id":"bar"},"–"),Rs=T("span",{class:"lp-pass","data-lp-id":"pass"}),td=T("div",{class:"lp-ring"},Is,T("div",{class:"lp-ring-mid"},Bs,Rs));function Hs(e){const t=e.lapPos??0;js.setAttribute("stroke-dasharray",`${t*Rn} ${Rn}`);const n=t*2*Math.PI;Et.setAttribute("cx",String(50+ct*Math.sin(n))),Et.setAttribute("cy",String(50-ct*Math.cos(n))),Et.style.visibility=e.lapPos===null?"hidden":"visible";const o=e.session.song.loop;Bs.textContent=e.countIn!==null?String(e.countIn):o?e.bar!==null?`${e.bar} · ${Ge(o)}`:Ge(o):e.bar!==null?`${e.bar} / ${e.session.song.bars}`:`– / ${e.session.song.bars}`;const s=e.phase==="waiting"?`WAITING · PASS ${e.nextPass}`:e.phase==="count-in"?"COUNT-IN":e.phase==="full"?`FULL · ${ce} / ${ce}`:e.phase==="paused"?"PAUSED":e.phase==="recording"?`PASS ${e.nextPass}`:e.jamming?"STARTING":`NEXT · PASS ${e.nextPass}`;Rs.replaceChildren(...e.phase==="recording"?[T("span",{class:"lp-dot","aria-hidden":"true"})]:[],s)}function nd(e){const t=e.session.song.start==="wait",n=Y(e.waiting?"WAITING":e.jamming?"STOP":"JAM",{class:e.waiting?"nc-btn lp-big lp-waiting":"nc-btn lp-big","data-lp-id":"jam",...G(e.waiting?"waiting":e.jamming?"stop":t?"jam-wait":"jam"),...e.jamming||e.waiting?{}:{"data-jam":""},...e.waiting?{"aria-pressed":"true"}:{}},()=>z.toggle());n.disabled=!Q;const o=Y("UNDO",{class:"nc-btn","data-lp-id":"undo",...G("undo")},()=>z.undo());o.disabled=!e.lapHasNotes&&!z.passCount;const s=Y("REDO",{class:"nc-btn","data-lp-id":"redo",...G("redo")},()=>z.redo());s.disabled=!e.canRedo,Hs(e);const i=e.session.song.loop,r=e.pendingLoop,l=r!==void 0?T("p",{class:"lp-sub","data-lp-id":"loop-next"},r?`Loop ${Ge(r)} from the next lap.`:"Loop off from the next lap."):null,c=i&&r===void 0?T("div",{class:"lp-loop-line"},T("span",{},`Loop ${Ge(i)}`),Y("Off",{class:"lp-loop-off","data-lp-id":"loop-off",...G("loop-off")},()=>z.setLoop(null))):null;sa(Ps.mount,T("div",{class:"lp-jam-stack"},td,n,T("div",{class:"lp-two"},o,s),c,l,Q?e.waiting?T("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},T("b",{},"Play anything, on any instrument."),` Pass ${e.nextPass} starts on that beat. Press again to cancel.`):t&&!e.jamming?T("p",{class:"lp-sub lp-hint","data-lp-id":"jam-hint"},`Jam waits for the first sound from any instrument. Pass ${e.nextPass} starts on that beat.`):null:T("p",{class:"lp-sub"},"Open Lupa inside the Studio to jam.")),Ds)}const _t=Ms("passes","Passes",()=>`${z.passCount} / ${ce}`);let Fe=null,K="all",wt={at:0,bar:0};const ad={"astrid-synth":"ASTRID",nyx:"NYX",lucy:"LUCY"},dt={"astrid-synth":{token:"astrid",noun:["note","notes"]},nyx:{token:"nyx",noun:["hit","hits"]},lucy:{token:"lucy",noun:["take","takes"]},"petra-rhythm":{token:"petra",noun:["hit","hits"]},"olive-bass":{token:"olive",noun:["note","notes"]}},pt=e=>e.split("#")[0]??e,od=e=>dt[pt(e)]?.noun[0]==="hit",ia=e=>e.kind===void 0||e.kind==="note";function He(e){const[t=e,n]=e.split("#"),o=ad[t]??t.toUpperCase();return n?`${o} ${n}`:o}function sd(e,t){const n=new Map;for(const s of e.events)s.inst===t&&ia(s)&&s.name&&n.set(s.name,(n.get(s.name)??0)+1);const o=[...n].sort((s,i)=>i[1]-s[1]).map(([s])=>s);return o.length?o.length===1?o[0]:`${o[0]} +${o.length-1}`:""}function io(e,t){let n=0,o=0,s=0;for(const c of e.events)c.inst===t&&(c.kind==="slot"?o++:c.kind==="take"?s++:ia(c)&&n++);const[i,r]=dt[pt(t)]?.noun??["note","notes"],l=[];return s&&l.push(s===1?"voice":`${s} takes`),n&&l.push(`${n} ${n===1?i:r}`),o&&l.push(`${o} slot ${o===1?"change":"changes"}`),l.join(" · ")||"nothing"}const Vt=new Map,id=1;function Os(e,t){const n=t.bars,o=q,s=V(t),i=at(e,t),r=ot(e,t),l=i.length>1?e.endTick:s,c=S=>r&&S+r>=l?S+r-l:S+r,d=t.loop,p=d?(d.from-1)*R*q:0,h=d?d.to*R*q:s,b=(S,C)=>(C>0?.45:1)*(S>=p-Rt&&S<h?1:.35),f=1e3,x=34,y=H("svg",{class:"lp-strip",viewBox:`0 0 ${f} ${x}`,preserveAspectRatio:"none",role:"img","aria-label":`${e.name} across the loop`});d&&y.append(H("rect",{class:"lp-strip-loop",x:String(p/s*f),y:"0",width:String((h-p)/s*f),height:String(x)}));const u=n*R;for(let S=1;S<u;S++){const C=String(S*f/u);S%R!==0&&n>8||y.append(S%R===0?H("line",{class:n>8&&S%(4*R)===0?"lp-strip-bar lp-strip-bar4":"lp-strip-bar",x1:C,x2:C,y1:"0",y2:String(x)}):H("line",{class:"lp-strip-beat",x1:C,x2:C,y1:String(x/2-2),y2:String(x/2+2)}))}const m=e.events.filter(ia),w=[],g=o/4*id,k=new Set(m.filter(S=>od(S.inst)).map(S=>S.inst)),L=new Map,E=[...new Set(m.filter(S=>k.has(S.inst)).map(S=>S.note))].sort((S,C)=>C-S);E.length>=2&&E.length<=4&&E.forEach((S,C)=>L.set(S,C));const v=m.filter(S=>!k.has(S.inst)).map(S=>S.note);let A=Math.min(...v)-2,$=Math.max(...v)+2;if($-A<12){const S=($+A)/2;A=S-6,$=S+6}for(const S of i)for(const C of m){const F=S+c(C.at);if(F>=s||C.at>=e.endTick)continue;const D=F/s*f,j=((.35+.65*C.vel)*b(F,S)).toFixed(2);if(k.has(C.inst)){const B=L.get(C.note);let P,N;if(B===void 0){const I=4+C.vel*9;P=x/2-I,N=x/2+I}else{const I=6+B*(x-12)/Math.max(1,L.size-1);P=I-3,N=I+3}y.append(H("line",{class:"lp-strip-hit",x1:D.toFixed(1),x2:D.toFixed(1),y1:P.toFixed(1),y2:N.toFixed(1),"stroke-opacity":j})),w.push(F/s,Math.min(1,(F+g)/s))}else{const B=Math.min(s,F+Math.max(1,C.len))/s*f,P=(4+(1-(C.note-A)/($-A))*(x-8)).toFixed(1);y.append(H("line",{class:"lp-strip-note",x1:D.toFixed(1),x2:Math.max(D+.1,B-2).toFixed(1),y1:P,y2:P,"stroke-opacity":j})),w.push(F/s,Math.min(1,(F+Math.max(g,C.len))/s))}}const M=S=>r?[{base:S+r,lo:S,hi:S+l},{base:S+r-l,lo:S,hi:S+l}]:[{base:S,lo:S,hi:s}];for(const S of i)for(const C of M(S))for(const F of e.events){if(F.kind!=="take")continue;const D=C.base+F.at,j=Math.min(s,D+F.len,C.base+e.endTick,C.hi),B=Math.max(D,C.lo);if(B>=s||j<=B)continue;const P=B/s*f,N=j/s*f,I=F.peaks?.length?F.peaks:[.35,.35],he=Math.floor((B-D)/F.len*(I.length-1)),de=Math.ceil((j-D)/F.len*(I.length-1)),me=I.slice(Math.max(0,he),Math.max(he+2,de+1)),$e=me.length>=2?me:[.35,.35],Ue=$e.length,Ye=x/2,Us=ke=>Math.max(.6,ke*(x/2-2)),la=$e.map((ke,Ke)=>[P+(N-P)*Ke/Math.max(1,Ue-1),Us(ke)]),Ys=la.map(([ke,Ke])=>`${ke.toFixed(1)},${(Ye-Ke).toFixed(1)}`),Ks=[...la].reverse().map(([ke,Ke])=>`${ke.toFixed(1)},${(Ye+Ke).toFixed(1)}`);y.append(H("path",{class:"lp-strip-voice",d:`M${Ys.join(" L")} L${Ks.join(" L")} Z`,opacity:b(B,S).toFixed(2)})),w.push(B/s,Math.min(1,(B+F.len)/s))}for(const S of i)for(const C of e.events){if(C.kind!=="slot"||S+c(C.at)>=s)continue;const F=((S+c(C.at))/s*f).toFixed(1);y.append(H("line",{class:"lp-strip-slot",x1:F,x2:F,y1:"0",y2:String(x)}))}if(e.endTick<s&&!e.repeat){const S=(c(e.endTick)/s*f).toFixed(1);y.append(H("line",{class:"lp-strip-end",x1:S,x2:S,y1:"8",y2:String(x-8)}))}return Vt.set(e.id,Float32Array.from(w)),y}function cn(e){if(e.length<=6)return e;const[t=e,n]=e.split(" ");return n?`${t.slice(0,6)} ${n.slice(0,3)}`:t.slice(0,3)}function _s(e){const[t,n]=e;return t?n?e.length===2?`${cn(t.label)} + ${cn(n.label)}`:`${cn(t.label)} + ${e.length-1}`:t.label:""}function rd(e){const t=e.knobs??[],n=T("span",{class:"lp-knob-tag","aria-label":`Knobs: ${t.map(s=>s.label).join(", ")}`,...G("knob-pass")},_s(t)),o=H("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return o.append(H("circle",{cx:"5",cy:"5",r:"4",fill:"none",stroke:"currentColor"}),H("line",{x1:"5",y1:"5",x2:"5",y2:"1.5",stroke:"currentColor"})),n.prepend(o),n}function ld(){const e=T("span",{class:"lp-knob-tag lp-pattern-tag","data-lp-pattern":"",...G("pattern-pass")},"Pattern"),t=H("svg",{viewBox:"0 0 10 10","aria-hidden":"true"});return t.append(H("rect",{x:"0.5",y:"0.5",width:"4",height:"4",fill:"currentColor"}),H("rect",{x:"5.5",y:"0.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),H("rect",{x:"0.5",y:"5.5",width:"4",height:"4",fill:"none",stroke:"currentColor"}),H("rect",{x:"5.5",y:"5.5",width:"4",height:"4",fill:"currentColor"})),e.prepend(t),e}function cd(e,t,n){const o=Os({...e,events:[]},t),s=1e3,i=34,r=V(t),l=at(e,t),c=ot(e,t),d=l.length>1?e.endTick:r,p=f=>((1-f)*(i-4)+2).toFixed(1),h=f=>(f/r*s).toFixed(1);o.setAttribute("aria-label",`${_s(e.knobs??[])} across the loop`),n&&o.append(H("rect",{class:"lp-strip-hand",x:(n.from*s).toFixed(1),y:"0",width:(Math.max(0,n.to-n.from)*s).toFixed(1),height:String(i)}));const b=[];if((e.knobs??[]).forEach((f,x)=>{const y=ae(f),u=e.events.filter(v=>v.kind==="param"&&ae(v)===y&&v.at<e.endTick),m=v=>c&&v+c>=d?v+c-d:v+c,w=v=>{let A=l.length>1?v-Math.floor(v/d)*d:v;if(A-=c,A<0&&(A+=d),A>=e.endTick)return null;let $=f.base;for(const M of u){if(M.at>A)break;$=M.value}return $},g=new Set([0,r]);for(const v of l){g.add(v),g.add(Math.min(r,v+d)),g.add(Math.min(r,v+e.endTick)),g.add(v+m(0));for(const A of u)g.add(v+m(A.at))}const k=[...g].filter(v=>v>=0&&v<=r).sort((v,A)=>v-A),L=[];let E=[];for(let v=0;v<k.length-1;v++){const A=k[v],$=k[v+1];if($<=A)continue;const M=w(A);if(M===null){E.length&&L.push(E),E=[];continue}E.push([A,M],[$,M])}E.length&&L.push(E);for(const v of L){if(v.length<2)continue;const A=v.map(([$,M])=>`${h($)},${p(M)}`).join(" ");x===0&&o.append(H("polygon",{class:"lp-strip-area",points:`${h(v[0][0])},${i} ${A} ${h(v.at(-1)[0])},${i}`})),o.append(H("polyline",{class:`lp-strip-curve${x?" lp-strip-curve-2":""}`,points:A}))}for(const v of u)for(const A of l){const $=A+(v.at+c)%d;b.push($/r,Math.min(1,($+q/4)/r))}}),e.endTick<r&&!e.repeat){const f=((c&&e.endTick+c>=d?e.endTick+c-d:e.endTick+c)/r*s).toFixed(1);o.append(H("line",{class:"lp-strip-end",x1:f,x2:f,y1:"8",y2:String(i-8)}))}return Vt.set(e.id,Float32Array.from(b)),o}function yt(e){if(e<=0)return"−∞ dB";const t=20*Math.log10(e);return t>-.05?"0.0 dB":`−${Math.abs(t).toFixed(1)} dB`}const We={loop:"M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4",star:"M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z",trash:"M4 7h16M9 7V4.5h6V7M6.5 7l1 13h9l1-13M10 11v6M14 11v6",earlier:"M15 6l-6 6 6 6",later:"M9 6l6 6-6 6"};function ra(e){const t=H("svg",{class:"lp-icon",viewBox:"0 0 24 24","aria-hidden":"true"});return t.append(H("path",{d:e})),t}function It(e,t,n,o,s){const i=Y("",{class:"lp-icon-btn","aria-label":t,"data-lp-id":e,...o},s);return i.append(ra(n)),i}let ro=null;function dd(e){Fe===e.id&&(Fe=null);const t=z.deletePass(e.id);if(!t)return;ro?.close();const n=Vl({message:`${t.pass.name} deleted`,actionLabel:"Undo",onAction:()=>z.restorePass(t.pass,t.index),anchor:_t.mount});n.el.setAttribute("data-lp-id","delete-toast"),ro=n}function pd(e,t,n=null){const o=z.session.song,s=qn(e),i=R*o.ppq,r=Fe===e.id,l=[...new Set(e.instruments)],c=Y("",{class:"lp-pass-name","data-lp-id":`name-${e.id}`,"aria-expanded":String(r)},()=>{Fe=r?null:e.id,te()}),d=T("span",{class:"lp-pass-line"},T("span",{class:"lp-pass-title"},e.name));for(const w of l)d.append(T("span",{class:"lp-inst","data-inst":dt[pt(w)]?.token??""},He(w)));const p=[];for(const w of l){const g=sd(e,w);p.push(g?`${g} · ${io(e,w)}`:io(e,w))}l.length||p.push("Empty"),e.mute&&p.push("muted");const h=s?T("span",{class:"lp-pass-sub lp-knob-sub"},rd(e),e.mute?T("span",{},"Muted"):null,n?T("span",{class:"lp-hand-note",...G("you-have-it")},"you have it"):null):e.pattern?T("span",{class:"lp-pass-sub lp-knob-sub"},T("span",{class:"lp-pass-sub-text"},p.join(" · ")),ld()):T("span",{class:"lp-pass-sub"},p.join(" · "));c.append(T("span",{class:"lp-now","aria-hidden":"true"}),T("span",{class:"lp-pass-text"},d,h));const b=T("input",{type:"range",class:"lp-fader",min:"0",max:"100",step:"1","aria-label":`${e.name} level`,"data-lp-id":`vol-${e.id}`,...G("pass-volume")});b.value=String(Math.round(e.volume*100));const f=T("span",{class:"lp-db","data-lp-id":`db-${e.id}`},yt(e.volume));b.style.setProperty("--lp-fill",`${b.value}%`),b.setAttribute("aria-valuetext",yt(e.volume)),b.addEventListener("input",()=>{const w=Number(b.value)/100;f.textContent=yt(w),b.style.setProperty("--lp-fill",`${b.value}%`),b.setAttribute("aria-valuetext",yt(w)),z.editPass(e.id,{volume:w})});const x=T("div",{class:"lp-ms-pair"},jn(`mute-${e.id}`,"M",e.mute,"mute",()=>z.editPass(e.id,{mute:!e.mute}),"lp-ms lp-ms-m"),jn(`solo-${e.id}`,"S",e.solo,"solo",()=>z.editPass(e.id,{solo:!e.solo}),"lp-ms lp-ms-s"));x.querySelector(".lp-ms-m")?.setAttribute("aria-label",`Mute ${e.name}`),x.querySelector(".lp-ms-s")?.setAttribute("aria-label",`Solo ${e.name}`);const y=It(`star-${e.id}`,e.kept?`Unstar ${e.name}`:`Star ${e.name}`,We.star,{"aria-pressed":String(e.kept),...G("star")},()=>z.editPass(e.id,{kept:!e.kept})),u=It(`delete-${e.id}`,`Delete ${e.name}`,We.trash,G("delete"),()=>dd(e)),m=T("div",{class:"lp-pass-row","data-lp-pass":e.id,...e.mute?{"data-muted":""}:{},...t&&!e.solo?{"data-quiet":""}:{},...r?{"data-open":""}:{}},c,T("div",{class:"lp-tools"},hd(e,o),md(e,o),x,T("div",{class:"lp-acts"},y,u)),T("div",{class:"lp-strip-box"},s?cd(e,o,n):Os(e,o),T("span",{class:"lp-head","aria-hidden":"true"})),s?T("div",{class:"lp-play"},T("div",{class:"lp-q","data-none":"","aria-hidden":"true"}),T("div",{class:"lp-vol","data-knob":"","aria-hidden":"true"})):T("div",{class:"lp-play"},ud(e,o),T("div",{class:"lp-vol"},b,f)));if(n&&m.setAttribute("data-hand",dt[pt(l[0]??"")]?.token??""),r){const w=new Set;for(const L of e.events)w.add(Math.floor(L.at/i));const g=T("div",{class:"lp-bars",style:`--lp-bars: ${o.bars}`});for(let L=0;L<o.bars;L++)g.append(T("span",w.has(L)?{"data-on":""}:{},String(L+1)));const k=T("input",{class:"lp-name-input",value:e.name,maxlength:"40","aria-label":"Pass name","data-lp-id":`rename-${e.id}`});k.addEventListener("change",()=>z.editPass(e.id,{name:k.value})),m.append(T("div",{class:"lp-sheet"},k,T("span",{class:"lp-sub"},`${e.events.length} events · recorded ${new Date(e.recordedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}`),T("span",{class:"lp-sub"},s?`Moves ${l.map(He).join(" and ")}'s ${(e.knobs??[]).map(L=>L.label).join(", ")}. Muted, they go back where they were.`:`Plays through ${l.map(He).join(" and ")||"its instrument"}'s current sound.`),g))}return m}function ud(e,t){const n=Pt(`pq-${e.id}`,`${e.name} quantize`,$c(t),Ec(e),s=>z.editPass(e.id,{quantize:Sc(e,t,s)}));n.setAttribute(ze,rt("pass-quantize"));const o=[n];if(Ac(e)&&e.quantize){const s=Pt(`ps-${e.id}`,`${e.name} strength`,kc(),String(e.quantize.strength),i=>{const r=Mc(e,i);r&&z.editPass(e.id,{quantize:r})});s.setAttribute(ze,rt("pass-strength")),o.push(s)}return T("div",{class:"lp-q",role:"group","aria-label":`${e.name} quantize`,...e.quantize?{"data-own":""}:{}},...o)}function hd(e,t){const n=e.shift??0,o=rc(e,t),s=d=>`${Math.abs(d)} ${Math.abs(d)===1?"bar":"bars"}`,i=d=>z.editPass(e.id,{shift:Math.max(-o,Math.min(o,n+d))}),r=It(`shift-earlier-${e.id}`,`Move ${e.name} a bar earlier`,We.earlier,n<=-o?{disabled:""}:{},()=>i(-1)),l=It(`shift-later-${e.id}`,`Move ${e.name} a bar later`,We.later,n>=o?{disabled:""}:{},()=>i(1)),c=n===0?"0":n>0?`+${n}`:`−${-n}`;return T("div",{class:"lp-shift",role:"group","aria-label":n===0?`${e.name}: where it was played`:`${e.name}: ${s(n)} ${n>0?"later":"earlier"}`,...n?{"data-moved":""}:{},...G("shift")},r,T("span",{class:"lp-shift-n","data-lp-id":`shift-${e.id}`,"aria-hidden":"true"},c),l)}function md(e,t){const n=V(t);if(e.endTick>=n)return T("span",{class:"lp-repeat-none","aria-hidden":"true"});const o=Math.ceil(n/e.endTick),s=!!e.repeat,i=Math.round(e.endTick/(R*q)),r=Y(s?`×${o}`:"once",{class:"lp-repeat","aria-pressed":String(s),"aria-label":s?`${e.name} repeats every ${i} ${i===1?"bar":"bars"}; press to play it once`:`${e.name} plays once; press to repeat it`,"data-lp-id":`repeat-${e.id}`,...G("repeat")},()=>z.editPass(e.id,{repeat:!s}));return s&&r.prepend(ra(We.loop)),r}function fd(e){const t=e.session.song,n=t.bars,o=e.pendingLoop===void 0?t.loop:e.pendingLoop??void 0,s=T("div",{class:"lp-ruler",role:"group","aria-label":"Bars, and the loop","data-lp-id":"ruler",style:`--lp-bars: ${n}`,...G("ruler")}),i=T("div",{class:"lp-ruler-nums","aria-hidden":"true"}),r=[];for(let m=1;m<=n;m++){const w=T("span",o&&m>=o.from&&m<=o.to?{"data-in":""}:{},String(m));r.push(w),i.append(w)}const l=T("div",{class:"lp-ruler-lane"});for(let m=1;m<n;m++)l.append(T("span",{class:"lp-ruler-tick",style:`--lp-at: ${m}`}));const c=T("div",{class:"lp-loop-band",...e.pendingLoop!==void 0?{"data-pending":""}:{}}),d=m=>{c.hidden=!m,m&&(c.style.setProperty("--lp-from",String(m.from-1)),c.style.setProperty("--lp-to",String(m.to))),r.forEach((w,g)=>{m&&g+1>=m.from&&g+1<=m.to?w.setAttribute("data-in",""):w.removeAttribute("data-in")})};d(o);const p=T("span",{class:"lp-ruler-hint",role:"status"}),h="Drag across bars to repeat them";let b;const f=m=>{p.textContent=m,p.hidden=!1,p.setAttribute("data-tell",""),clearTimeout(b),b=setTimeout(()=>{p.removeAttribute("data-tell"),p.textContent=h,p.hidden=!!t.loop},3e3)},x=m=>{const w=T("button",{type:"button",class:"lp-loop-handle","data-end":m,"aria-label":m==="from"?"Loop start":"Loop end","data-lp-id":`loop-${m}`});return w.addEventListener("keydown",g=>{const k=t.loop;if(!k||g.key!=="ArrowLeft"&&g.key!=="ArrowRight")return;g.preventDefault();const L=g.key==="ArrowLeft"?-1:1,E={...k};m==="from"?E.from=Math.max(1,Math.min(k.to,k.from+L)):E.to=Math.min(n,Math.max(k.from,k.to+L)),z.setLoop(E)}),w.addEventListener("pointerdown",g=>{const k=o;k&&(g.stopPropagation(),u(g,L=>m==="from"?{from:Math.min(L,k.to),to:k.to}:{from:k.from,to:Math.max(L,k.from)}))}),w};c.append(x("from"),x("to"));const y=m=>{const w=l.getBoundingClientRect();return Math.max(1,Math.min(n,Math.floor((m-w.left)/Math.max(1,w.width)*n)+1))},u=(m,w)=>{if(e.jamming&&!Q){f("Stop jamming to change the loop");return}s.setPointerCapture?.(m.pointerId),s.setAttribute("data-dragging","");const g=y(m.clientX);let k=!1,L=w(g);d(L);const E=A=>{y(A.clientX)!==g&&(k=!0),L=w(y(A.clientX)),d(L)},v=()=>{s.removeEventListener("pointermove",E),s.removeEventListener("pointerup",v),s.removeEventListener("pointercancel",v),s.removeAttribute("data-dragging");for(const M of r)M.removeAttribute("data-hover");const A=performance.now();if(!k&&wt.bar===g&&A-wt.at<450){wt={at:0,bar:0},z.setLoop(null);return}if(wt=k?{at:0,bar:0}:{at:A,bar:g},L.from===1&&L.to===n&&!t.loop){d(void 0),f("That's the whole song. Pick fewer bars.");return}z.setLoop(L)};s.addEventListener("pointermove",E),s.addEventListener("pointerup",v),s.addEventListener("pointercancel",v)};return s.addEventListener("pointerdown",m=>{if(m.button!==0)return;const w=y(m.clientX);u(m,g=>({from:Math.min(w,g),to:Math.max(w,g)}))}),s.addEventListener("pointermove",m=>{if(s.hasAttribute("data-dragging"))return;const w=y(m.clientX);r.forEach((g,k)=>{k+1===w?g.setAttribute("data-hover",""):g.removeAttribute("data-hover")})}),s.addEventListener("pointerleave",()=>{for(const m of r)m.removeAttribute("data-hover")}),p.textContent=h,p.hidden=!!o||n<2,l.append(p,c),s.append(i,l),s}function gd(e){if(e.length<2)return null;const t=new Map;for(const i of e)for(const r of new Set(i.instruments))t.set(r,(t.get(r)??0)+1);const n=e.filter(i=>i.kept).length;K!=="all"&&K!=="starred"&&!t.has(K)&&(K="all"),K==="starred"&&!n&&(K="all");const o=(i,r,l,c={})=>{const d=Y("",{class:"lp-chip","aria-pressed":String(K===i),"data-lp-id":`filter-${i}`,...c},()=>{K=K===i?"all":i,te()});return d.append(r,T("span",{class:"lp-chip-n"},String(l))),d},s=T("div",{class:"lp-chips",role:"group","aria-label":"Show passes"},o("all","All",e.length));for(const[i,r]of[...t].sort((l,c)=>He(l[0]).localeCompare(He(c[0]))))s.append(o(i,He(i),r,{"data-inst":dt[pt(i)]?.token??""}));return n&&s.append(o("starred",ra(We.star),n,{"aria-label":"Starred"})),s}function bd(e){const t=e.session.passes,n=t.some(c=>c.solo),o=t.filter(c=>K==="all"?!0:K==="starred"?c.kept:c.instruments.includes(K)),s=T("div",{class:"lp-passes","data-lp-id":"pass-list"});(t.length||e.session.song.loop)&&s.append(T("div",{class:"lp-pass-head"},fd(e))),e.phase==="recording"&&s.append(T("div",{class:"lp-pass-row lp-live","data-live":""},T("span",{class:"lp-pass-name"},T("span",{class:"lp-dot","aria-hidden":"true"}),T("span",{class:"lp-pass-text"},T("span",{class:"lp-pass-title"},`Pass ${e.nextPass}`),T("span",{class:"lp-pass-sub"},e.lapHasNotes?"Recording":"Waiting for notes"))))),Vt.clear();const i=new Map;for(const c of e.hands){const d=i.get(c.pass);i.set(c.pass,d?{from:Math.min(d.from,c.from),to:Math.max(d.to,c.to)}:c)}for(const c of[...o].reverse())s.append(pd(c,n,i.get(c.id)??null));!t.length&&e.phase!=="recording"?s.append(T("p",{class:"lp-sub","data-lp-id":"passes-empty"},e.waiting?"Waiting for the first sound.":"No passes yet. Press Jam (or Space) and play.")):t.length&&!o.length&&s.append(T("p",{class:"lp-sub"},"No passes here."));const r=t.filter(c=>!c.kept).length,l=Y(`CLEAR UNSTARRED${r?` (${r})`:""}`,{class:"nc-btn lp-clear","data-lp-id":"clear-unkept",...G("clear-unkept")},()=>z.clearUnkept());l.disabled=!r,sa(_t.mount,gd(t),s,t.length?T("div",{class:"lp-between"},T("span",{class:"lp-row"},l,T("span",{class:"lp-sub"},"Starred passes stay.")),T("span",{class:"lp-mono lp-sub","data-lp-id":"count"},`${t.length} / ${ce}`)):null),et=""}let et="";function wd(e){const t=_t.mount.querySelector(".lp-passes");if(!t)return;const n=e.jamming&&e.phase!=="count-in"?e.songPos:null;if(n===null){if(t.hasAttribute("data-playing")&&t.removeAttribute("data-playing"),et){for(const l of t.querySelectorAll("[data-now]"))l.removeAttribute("data-now");et=""}return}t.setAttribute("data-playing",""),t.style.setProperty("--lp-pos",n.toFixed(4));const o=e.session.passes.some(l=>l.solo),s=[];for(const l of e.session.passes){if(l.mute||o&&!l.solo)continue;const c=Vt.get(l.id);if(c){for(let d=0;d<c.length;d+=2)if(c[d]<=n&&n<c[d+1]){s.push(l.id);break}}}const i=s.join("|");if(i===et)return;et=i;const r=new Set(s);for(const l of t.querySelectorAll("[data-lp-pass]")){const c=r.has(l.dataset.lpPass??"");c!==l.hasAttribute("data-now")&&l.toggleAttribute("data-now",c)}}const Vs=[Ps,_t];tc(zs,Vs.map(e=>e.handle),"adjacent");let lo="";function Gs(e){const t=e.phase==="waiting"?"Lupa · waiting for the first sound":e.phase==="count-in"?`Lupa · count-in ${e.countIn}`:e.jamming&&e.bar!==null?e.session.song.loop?`Lupa · Bar ${e.bar} · loop ${Ge(e.session.song.loop)} · Pass ${e.nextPass}`:`Lupa · Bar ${e.bar} / ${e.session.song.bars} · Pass ${e.nextPass}`:null,n=`${t}|${e.phase}`;if(n!==lo){lo=n;try{Q?.readout?.(t),Q?.chip?.(e.waiting?{text:"Waiting"}:e.jamming?{text:e.phase==="recording"?`Pass ${e.nextPass}`:e.phase==="count-in"?"Count-in":"Jam",recording:e.phase==="recording"}:z.passCount?{text:`${z.passCount} passes`}:null)}catch{}}}function te(){const e=z.view();Zc(e),nd(e),bd(e);for(const n of Vs)n.update();const t=Fs.querySelector(".lp-notice");t&&(t.textContent=e.notice),Xc(),Gs(e)}z.onChange(te);setInterval(()=>{z.tick()&&te(),z.jamming||z.syncTempo()},Vc);function Ws(){const e=z.view();(e.jamming||e.waiting)&&(Hs(e),Gs(e)),wd(e),requestAnimationFrame(Ws)}requestAnimationFrame(Ws);te();Q?.providePreset?.({format:"nc-song-looper",version:na,get:()=>structuredClone(z.session),async set(e){const t=oa(e);if("error"in t)throw new Error(t.error);if(!t.session.passes.length)return;z.jamming&&z.stop(),await X.flush();const n=await X.adopt(t.session);z.openSession(n),X.setCurrent(n.id),Fe=null,K="all",z.notice=`“${n.name}” is open, from the Studio’s scene.`,te(),lt?.refresh()}});window.__looper={looper:z,store:X,songs:()=>lt,view:()=>z.view(),get hosted(){return!!Q}};
