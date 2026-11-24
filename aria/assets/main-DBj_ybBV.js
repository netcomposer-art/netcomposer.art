import{m as Gr,i as Wr,M as Xr,w as Kr,h as T,D as Qr,c as Zr,t as Jr,r as el,a as co,b as tl,l as al,d as nl,p as ol,f as il,S as rl,u as ll,s as ai}from"./sensors-G6N6u5RL.js";const xt=1,sl=32,dl=32;function cl(e,t){return{v:xt,kind:"energy",source:e,frames:t.slice(0,sl)}}function ul(e,t){return{v:xt,kind:"table",source:e,...t}}function ni(e,t){return{v:xt,kind:"off",source:e,reason:t}}function pl(e,t){return{v:xt,kind:"motion",source:e,frames:t.slice(0,dl)}}function hl(e,t,n){return{v:xt,kind:"shake",source:e,at:t,strength:n}}var ml="nc-ui",fl={color:{paper:"#F5F5F5",ink:"#242424","ink-label":"#242424",white:"#FFFFFF",ivory:"#FBFBFB",surf:"#EAEAEA",accent:"#003153","accent-wash":"rgba(0,49,83,0.07)","astrid-orange":"#EB512E","petra-blue":"#0A94D6","olive-green":"#8A9230","hacks-grey":"#8C8C8C","lucy-purple":"#9B30FF","calliope-pink":"#FC409F","aria-magma":"#FF2A3D","looper-gray":"#3F4448","triki-charcoal":"#2E2E2E","nyx-amber":"#BF8001","paper-bright":"#FCFCFC","accent-pad":"#1A6193","accent-velocity-min":"#477399","strip-3":"#E9E9E9","strip-4":"#E4E4E4","strip-5":"#DFDFDF","strip-6":"#DADADA","strip-7":"#D5D5D5","strip-8":"#D0D0D0","shade-1":"#F3F3F3","shade-2":"#EEEEEE","shade-3":"#E9E9E9","shade-4":"#E4E4E4","shade-5":"#FAFAFA","shade-6":"#EDEDED","shade-7":"#E0E0E0","shade-8":"#D3D3D3","sub-0":"#595959","sub-1":"#575757","sub-2":"#555555","sub-3":"#535353","sub-4":"#515151","div-0":"#DDDDDD","div-1":"#F2F2F2","div-2":"#E5E5E5","div-3":"#D8D8D8","div-4":"#CCCCCC",drawer:"#F1F1F1","mf-1":"#F2F2F2","mf-2":"#EFEFEF","mf-3":"#ECECEC","mf-4":"#E8E8E8","skeleton-hi":"#F0F0F0","map-off":"#9F9F9F",red:"hsl(8 55% 44%)","red-soft":"hsl(8 55% 44% / .5)","red-tension":"#A04A3F",amber:"#9A6B34","amber-stale":"hsl(38 50% 38%)",slate:"#56688C",plum:"#774A84","filter-blue":"#3E6FB0","filter-accent":"#315873","filter-red":"#B8443A","eq-blue-gray":"#B3C2D2","tw-gray-50":"oklch(98.5% 0.002 247.839)","tw-gray-100":"oklch(96.7% 0.003 264.542)","tw-gray-600":"oklch(44.6% 0.03 256.802)","tw-gray-700":"oklch(37.3% 0.034 259.733)","tw-gray-800":"oklch(27.8% 0.033 256.848)","tw-gray-900":"oklch(21% 0.034 264.665)","tw-red-500":"oklch(63.7% 0.237 25.331)","tw-red-600":"oklch(57.7% 0.245 27.325)","tw-red-700":"oklch(50.5% 0.213 27.518)","tw-red-50":"oklch(97.1% 0.013 17.38)","tw-red-300":"oklch(80.8% 0.114 19.571)","tw-red-400":"oklch(70.4% 0.191 22.216)",black:"#000000"}},Qa={"surface-page":"#F5F5F5",text:"#242424","text-sub":"#595959","brand-ink":"#2E2E2E",divider:"#DDDDDD","surface-raised":"#EAEAEA",accent:"#003153","accent-tint":"#D8DDE2","accent-soft":"rgba(0,49,83,0.1)","accent-faint":"rgba(0,49,83,0.35)","on-accent":"#F5F5F5",danger:"hsl(8 55% 44%)","danger-soft":"hsl(8 55% 44% / .5)",warning:"#9A6B34","warning-text":"hsl(38 50% 38%)","module-bg-adjacent-1":"#F3F3F3","module-bg-adjacent-2":"#EEEEEE","module-bg-adjacent-3":"#E9E9E9","module-bg-adjacent-4":"#E4E4E4","module-bg-stack-1":"#FAFAFA","module-bg-stack-2":"#EDEDED","module-bg-stack-3":"#E0E0E0","module-bg-stack-4":"#D3D3D3","module-sub-stack-1":"#575757","module-sub-stack-2":"#555555","module-sub-stack-3":"#535353","module-sub-stack-4":"#515151","module-div-stack-1":"#F2F2F2","module-div-stack-2":"#E5E5E5","module-div-stack-3":"#D8D8D8","module-div-stack-4":"#CCCCCC","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#DDDDDD","slider-progress":"#003153","slider-thumb":"#242424","slider-thumb-size":"11px","focus-ring":"#003153",playhead:"#003153","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#EAEAEA","slot-active-bg":"#003153","slot-active-ink":"#F5F5F5","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#F0F0F0","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#1A6193","meter-peak":"rgba(26,97,147,0.4)","meter-hold-mark":"#003153","meter-clip":"hsl(8 55% 44%)","meter-track":"#DDDDDD","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#1A6193","fx-level-out":"#003153","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#242424","fader-cap-line":"#F5F5F5","fader-cap-master":"#003153","strip-bg":"#F3F3F3","strip-alt-bg":"#EEEEEE","strip-shade-1":"#F3F3F3","strip-shade-2":"#EEEEEE","strip-shade-3":"#E9E9E9","strip-shade-4":"#E4E4E4","strip-shade-5":"#DFDFDF","strip-shade-6":"#DADADA","strip-shade-7":"#D5D5D5","strip-shade-8":"#D0D0D0","strip-divider":"#DDDDDD","strip-hacks-text":"#8C8C8C","fader-track":"rgba(36,36,36,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#003153","level-steps-bar":"rgba(0,49,83,0.14)","level-steps-free":"#56688C","eq-node-size":"8px","eq-graph-bg":"#FCFCFC","eq-curve":"#003153","eq-fill":"#3E6FB0","eq-grid":"#DDDDDD","eq-spectrum":"#56688C","eq-band-1":"#8A9230","eq-band-2":"#EB512E","eq-band-3":"#0A94D6","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#3E6FB0","filter-highpass":"#315873","filter-bandpass":"#B8443A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#242424","toast-text":"#F5F5F5","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#F5F5F5","dialog-scrim":"rgba(36,36,36,0.35)","fill-rack":"#E2E2E2","fill-panel":"#FCFCFC","fill-cell":"#E4E4E4","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#FCFCFC","instrument-astrid":"#EB512E","instrument-petra":"#0A94D6","instrument-olive":"#8A9230","instrument-lucy":"#9B30FF","instrument-nyx":"#BF8001","instrument-calliope":"#FC409F","instrument-looper":"#3F4448","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},zt={synth:{"key-white":"#FBFBFB","key-black":"#242424","key-hint-on-dark":"#F5F5F5","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#F2F2F2","area-2":"#EFEFEF","area-3":"#ECECEC","area-4":"#E8E8E8",intimacy:"#003153",energy:"#9A6B34",tension:"#A04A3F",ambiguity:"#56688C",movement:"#774A84",highlight:"rgba(0,49,83,0.07)"},situation:{"drawer-bg":"#F1F1F1","drawer-width":"600px","map-marker-off":"#9F9F9F","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#F5F5F5","step-cell-on":"#1A6193","step-cell-ink":"#F5F5F5","step-cell-accent":"#242424","step-cell-size":"14px","step-gap":"2px",playhead:"#003153","track-mute":"#595959","track-solo":"#003153","velocity-bar":"#003153","velocity-min":"#477399","velocity-max":"#003153","accent-mark":"#F5F5F5","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#242424","lane-1":"#242424","lane-2":"#003153","lane-3":"#9A6B34","lane-4":"#595959","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},gl={"surprise-fill":"#EAEAEA","surprise-ink":"#242424","surprise-on":"#003153","surprise-on-ink":"#F5F5F5","velocity-fill":"#1A6193"},Ie={"label-min-contrast":4.5,"surprise-saturation":[.85,1],"surprise-lightness":[.5,.6],"surprise-min-hue-gap":60,"surprise-on-lightness":.27,"surprise-on-max-saturation":.75,"velocity-range":[.05,1]},bl={light:{color:fl.color,semantic:Qa,component:zt,runtime:gl},dark:{color:{paper:"#1E1D1C",ink:"#E8E7E6","ink-label":"#242424",white:"#FFFFFF",ivory:"#CFCECD",surf:"#4C4B4A",accent:"#77B5E2","accent-wash":"rgba(119,181,226,0.07)","astrid-orange":"#EB512E","petra-blue":"#5AC4F7","olive-green":"#9CA536","hacks-grey":"#8C8C8C","lucy-purple":"#B566FF","calliope-pink":"#FD7CBD","aria-magma":"#FF2A3D","looper-gray":"#A9AFB4","triki-charcoal":"#BFBEBD","nyx-amber":"#FEAA02","paper-bright":"#1A1918","accent-pad":"#4B91C3","accent-velocity-min":"#5A8FB5","strip-3":"#343332","strip-4":"#373635","strip-5":"#3A3938","strip-6":"#3D3C3B","strip-7":"#403F3E","strip-8":"#434241","shade-1":"#272625","shade-2":"#302F2E","shade-3":"#393837","shade-4":"#424140","shade-5":"#191817","shade-6":"#262524","shade-7":"#333231","shade-8":"#403F3E","sub-0":"#AFAEAD","sub-1":"#AFAEAD","sub-2":"#939291","sub-3":"#A1A09F","sub-4":"#B1B0AF","div-0":"#4F4E4D","div-1":"#242322","div-2":"#31302F","div-3":"#3E3D3C","div-4":"#4B4A49",drawer:"#222120","mf-1":"#21201F","mf-2":"#242322","mf-3":"#272625","mf-4":"#2B2A29","skeleton-hi":"#292827","map-off":"#6F6E6D",red:"#DD7D6E","red-soft":"rgba(221, 125, 110, 0.5)","red-tension":"#D18075",amber:"#CC985C","amber-stale":"#D3AC69",slate:"#90A0C1",plum:"#BB93C8","filter-blue":"#6E9CD8","filter-accent":"#6597BA","filter-red":"#DC746A","eq-blue-gray":"#B3C2D2","tw-gray-50":"#1B1A19","tw-gray-100":"#232221","tw-gray-600":"#A6A5A4","tw-gray-700":"#BFBEBD","tw-gray-800":"#D5D4D3","tw-gray-900":"#E8E7E6","tw-red-500":"#ED645A","tw-red-600":"#EB7870","tw-red-700":"#EA8C86","tw-red-50":"#351E1D","tw-red-300":"#853832","tw-red-400":"#CC3D33",black:"#000000"},semantic:{"surface-page":"#1E1D1C",text:"#E8E7E6","text-sub":"#AFAEAD","brand-ink":"#BFBEBD",divider:"#4F4E4D","surface-raised":"#4C4B4A",accent:"#77B5E2","accent-tint":"#292F34","accent-soft":"rgba(119,181,226,0.1)","accent-faint":"rgba(119,181,226,0.35)","on-accent":"#1E1D1C",danger:"#DD7D6E","danger-soft":"rgba(221, 125, 110, 0.5)",warning:"#CC985C","warning-text":"#D3AC69","module-bg-adjacent-1":"#272625","module-bg-adjacent-2":"#302F2E","module-bg-adjacent-3":"#393837","module-bg-adjacent-4":"#424140","module-bg-stack-1":"#191817","module-bg-stack-2":"#262524","module-bg-stack-3":"#333231","module-bg-stack-4":"#403F3E","module-sub-stack-1":"#AFAEAD","module-sub-stack-2":"#939291","module-sub-stack-3":"#A1A09F","module-sub-stack-4":"#B1B0AF","module-div-stack-1":"#242322","module-div-stack-2":"#31302F","module-div-stack-3":"#3E3D3C","module-div-stack-4":"#4B4A49","module-pad":"24px","module-pad-y-desktop":"28px","module-pad-x-desktop":"32px","module-pad-x-slim":"14px","module-slim-column":"120px","stack-card-pad-y":"20px","section-gap":"48px","section-rule-gap":"40px","font-ui":"'Inter', 'Geist', sans-serif","font-readout":"'IBM Plex Mono', monospace","title-size":"24px","title-size-slim":"18px","title-weight":"400","title-tracking":"-.01em","label-size":"11px","label-weight":"500","label-tracking":".14em","readout-size":"12px","readout-size-small":"11px","body-size":"13px","slider-track":"#4F4E4D","slider-progress":"#77B5E2","slider-thumb":"#E8E7E6","slider-thumb-size":"11px","focus-ring":"#77B5E2",playhead:"#77B5E2","playhead-width":"2px","playhead-offset":"1px","slot-size":"14px","slot-span":"60px","slot-block":"48px","beat-gap":"8px","row-inset":"8px","marker-width":"4px","slot-radius":"2px","slot-gap":"2px","slot-font-size":"9px","slot-filled-bg":"#4C4B4A","slot-active-bg":"#77B5E2","slot-active-ink":"#1E1D1C","slot-dot":"3px","slot-dot-playing":"5px","sparkle-size":"14px","sparkle-icon-size":"12px","label-on-fill-dark":"#242424","label-on-fill-light":"#FFFFFF","skeleton-highlight":"#292827","transition-feedback":".15s","motion-fade":".2s","motion-fade-easing":"ease","motion-fade-out":".25s","motion-fade-out-easing":"ease-out","motion-slide":".22s","motion-slide-easing":"ease-out","motion-press-easing":"ease-out","motion-thumb":".15s","motion-thumb-easing":"ease","motion-meter-rise":"0s","motion-meter-fall":".2s","motion-meter-easing":"linear","motion-meter-hold":"1.5s","meter-fill":"#77B5E2","meter-peak":"rgba(75,145,195,0.4)","meter-hold-mark":"#77B5E2","meter-clip":"#DD7D6E","meter-track":"#4F4E4D","meter-width":"8px","clip-size":"6px","fx-level-bar":"3px","fx-level-height":"20px","fx-level-fold-length":"48px","fx-level-in":"#4B91C3","fx-level-out":"#77B5E2","fx-level-hot":"#EB512E","fader-height":"148px","fader-cap-width":"28px","fader-cap-height":"14px","fader-cap":"#E8E7E6","fader-cap-line":"#1E1D1C","fader-cap-master":"#77B5E2","strip-bg":"#272625","strip-alt-bg":"#302F2E","strip-shade-1":"#272625","strip-shade-2":"#302F2E","strip-shade-3":"#343332","strip-shade-4":"#373635","strip-shade-5":"#3A3938","strip-shade-6":"#3D3C3B","strip-shade-7":"#403F3E","strip-shade-8":"#434241","strip-divider":"#4F4E4D","strip-hacks-text":"#8C8C8C","fader-track":"rgba(232,231,230,0.25)","strip-width":"88px","strip-width-master":"112px","fx-card-width":"232px","strip-fold-width":"40px","eq-graph-height":"168px","eq-graph-height-max":"248px","level-steps-height":"96px","level-steps-height-max":"192px","level-steps-curve":"#77B5E2","level-steps-bar":"rgba(119,181,226,0.14)","level-steps-free":"#90A0C1","eq-node-size":"8px","eq-graph-bg":"#1A1918","eq-curve":"#B3C2D2","eq-fill":"#B3C2D2","eq-grid":"#4F4E4D","eq-spectrum":"#90A0C1","eq-band-1":"#9CA536","eq-band-2":"#EB512E","eq-band-3":"#5AC4F7","eq-panel-layer":"10","fx-fold-width":"120px","fx-fold-width-slim":"60px","head-margin-compact":"12px","scale-size":"9px","focus-width":"1px","focus-width-strong":"2px","target-min":"44px","target-min-coarse":"44px",hairline:"1px","rule-strong":"2px","trigger-dot":"6px","filter-lowpass":"#6E9CD8","filter-highpass":"#6597BA","filter-bandpass":"#DC746A","curve-stroke":"1.5","trace-stroke":"1.25","grid-stroke":"1","toast-bg":"#403F3E","toast-text":"#E8E7E6","toast-action":"#FFFFFF","toast-font-size":"12px","toast-pad-x":"16px","toast-gap":"8px","toast-radius":"2px","toast-offset":"16px","toast-anchor-gap":"8px","toast-target":"44px","move-size":"32px","move-icon":"16px","move-gap":"4px","move-row-gap":"8px","move-label-width":"64px","on-danger":"#1E1D1C","dialog-scrim":"rgba(0,0,0,0.55)","fill-rack":"#141312","fill-panel":"#2C2B2A","fill-cell":"#383736","fill-radius":"6px","fill-cell-radius":"3px","fill-gutter":"4px","dialog-width":"320px","dialog-pad":"16px","dialog-gap":"12px","dialog-button-gap":"8px","dialog-radius":"2px","dialog-leading":"1.35","module-gap":"8px","control-gap":"4px","header-gap":"12px","head-margin":"32px","name-width":"48px","slider-pitch":"20px","knob-size":"20px","display-height":"96px","button-tracking":".2em","button-pad-y":"12px","fx-name-weight":"700","label-leading":"1.35","motion-press":".1s","control-weight":"400","tab-size":"12px","tab-pad-y":"6px","tab-mark":"2px","select-pad-end":"18px","select-mark":"5px","page-head-layer":"20","page-head-bg":"#1A1918","instrument-astrid":"#EB512E","instrument-petra":"#5AC4F7","instrument-olive":"#9CA536","instrument-lucy":"#B566FF","instrument-nyx":"#FEAA02","instrument-calliope":"#FD7CBD","instrument-looper":"#A9AFB4","instrument-aria":"#FF2A3D","page-title-size":"15px","page-title-tracking":".28em","page-sub-size":"14px","page-sub-gap":"8px","page-action-gap":"24px","page-pad-x":"24px","page-pad-x-md":"48px","page-pad-x-xl":"64px","page-pad-y":"32px","page-pad-y-md":"48px","page-head-gap":"32px","page-head-gap-md":"48px","page-body-gap":"16px","page-body-gap-lg":"48px"},component:{synth:{"key-white":"#CFCECD","key-black":"#0F0E0D","key-hint-on-dark":"#E8E7E6","key-held-base":"#FFFFFF","keybed-height":"64px","curve-label-font":"monospace","curve-label-size":"8px","slim-curve-width":"48px"},meaning:{"area-1":"#21201F","area-2":"#242322","area-3":"#272625","area-4":"#2B2A29",intimacy:"#77B5E2",energy:"#CC985C",tension:"#D18075",ambiguity:"#90A0C1",movement:"#BB93C8",highlight:"rgba(119,181,226,0.07)"},situation:{"drawer-bg":"#222120","drawer-width":"600px","map-marker-off":"#6F6E6D","chart-tick-size":"10px","chart-tooltip-size":"11px"},rhythm:{"step-cell-off":"#1E1D1C","step-cell-on":"#4B91C3","step-cell-ink":"#1E1D1C","step-cell-accent":"#E8E7E6","step-cell-size":"14px","step-gap":"2px",playhead:"#77B5E2","track-mute":"#AFAEAD","track-solo":"#77B5E2","velocity-bar":"#77B5E2","velocity-min":"#5A8FB5","velocity-max":"#77B5E2","accent-mark":"#1E1D1C","accent-mark-size":"3px","step-mark-size":"9px","step-mark-inset":"2px","bar-accent":"#E8E7E6","lane-1":"#E8E7E6","lane-2":"#77B5E2","lane-3":"#CC985C","lane-4":"#AFAEAD","sparkle-gap":"6px","morph-max":"40px","morph-min":"24px","morph-readout":"34px","brand-size":"15px","brand-tracking":".28em","brand-weight":"500","brand-sub-size":"14px","brand-sub-gap":"8px"}},runtime:{"surprise-fill":"#4C4B4A","surprise-ink":"#E8E7E6","surprise-on":"#77B5E2","surprise-on-ink":"#1E1D1C","velocity-fill":"#4B91C3"}}},va=[{id:"prussian",name:"Prussian",about:"True greys and Prussian blue.",default:!0,swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#003153"},dark:{paper:"#1E1D1C",surf:"#4C4B4A",accent:"#77B5E2"}}},{id:"graphite",name:"Graphite",about:"Pure mono: only the instruments carry colour.",swatch:{light:{paper:"#F5F5F5",surf:"#EAEAEA",accent:"#2E2E2E"},dark:{paper:"#1D1D1D",surf:"#4B4B4B",accent:"#D9D9D9"}}},{id:"oxide",name:"Oxide",about:"Warm stone grey with a tape-oxide brown accent.",swatch:{light:{paper:"#F7F5F3",surf:"#ECE9E7",accent:"#5E3420"},dark:{paper:"#211C18",surf:"#504A45",accent:"#C9997A"}}},{id:"steel",name:"Steel",about:"Cool charcoal with a steel-blue accent.",swatch:{light:{paper:"#F3F5F8",surf:"#E8EAED",accent:"#2F5878"},dark:{paper:"#181E24",surf:"#454C54",accent:"#8FB4D6"}}},{id:"verdigris",name:"Verdigris",about:"Cool blue-grey like weathered copper, with a deep teal accent.",swatch:{light:{paper:"#F2F6F7",surf:"#E6EBEC",accent:"#0C4C56"},dark:{paper:"#161F21",surf:"#434E4F",accent:"#60B0BE"}}}],dt=e=>`--${ml}-${e}`,oi="data-nc-theme",uo="nc-ui-theme-change",vl="(prefers-color-scheme: dark)",Za=e=>e?.documentElement??null,ii=e=>e?.defaultView?.matchMedia?.(vl)??null,wl=e=>e==="light"||e==="dark"?e:"system";function xl(e=globalThis.document){return wl(Za(e)?.getAttribute(oi))}function wa(e=globalThis.document){let t=xl(e);return t!=="system"?t:ii(e)?.matches?"dark":"light"}var ri="data-nc-skin",yl=(va.find(e=>e.default)??va[0])?.id??"prussian",$l=e=>va.some(t=>t.id===e)?e:yl;function kl(e=globalThis.document){return $l(Za(e)?.getAttribute(ri))}function li(e,t=globalThis.document){let n=Za(t);if(!n)return()=>{};let o=()=>`${wa(t)} ${kl(t)}`,i=o(),r=()=>{let d=o();d!==i&&(i=d,e(wa(t)))},l=t.defaultView?.MutationObserver,s=l?new l(r):null;s?.observe(n,{attributes:!0,attributeFilter:[oi,ri]});let c=ii(t);return c?.addEventListener?.("change",r),t.addEventListener(uo,r),()=>{s?.disconnect(),c?.removeEventListener?.("change",r),t.removeEventListener(uo,r)}}var xa=Qa["label-on-fill-dark"],po=Qa["label-on-fill-light"],El=Ie["label-min-contrast"],Al=/^#[0-9a-f]{6}$/i,Ml=e=>typeof e=="string"&&Al.test(e),Lt=e=>Math.round(Math.max(0,Math.min(255,e))).toString(16).padStart(2,"0");function ho(e,t,n){e=(e%360+360)%360,t=Math.max(0,Math.min(1,t)),n=Math.max(0,Math.min(1,n));let o=t*Math.min(n,1-n),i=r=>{let l=(r+e/30)%12;return n-o*Math.max(-1,Math.min(l-3,9-l,1))};return`#${Lt(i(0)*255)}${Lt(i(8)*255)}${Lt(i(4)*255)}`}function si(e){let[t,n,o]=[1,3,5].map(d=>parseInt(e.slice(d,d+2),16)/255),i=Math.max(t,n,o),r=Math.min(t,n,o),l=(i+r)/2,s=i-r;if(!s)return{h:0,s:0,l};let c=s/(1-Math.abs(2*l-1));return{h:((i===t?60*((n-o)/s%6):i===n?60*((o-t)/s+2):60*((t-n)/s+4))+360)%360,s:c,l}}function mo(e){let[t,n,o]=[1,3,5].map(i=>{let r=parseInt(e.slice(i,i+2),16)/255;return r<=.03928?r/12.92:((r+.055)/1.055)**2.4});return .2126*t+.7152*n+.0722*o}function ya(e,t){let[n,o]=[mo(e),mo(t)].sort((i,r)=>r-i);return(n+.05)/(o+.05)}var qt=e=>ya(e,xa)>=ya(e,po)?xa:po;function di(e,t,n,o=El){let i=ho(e,t,n),r=qt(i)===xa?1:-1;for(let l=0;l<40&&ya(i,qt(i))<o;l++)n+=r*.01,i=ho(e,t,n);return i}function Sl(e){let{h:t,s:n}=si(e),o=di(t,Math.min(n,Ie["surprise-on-max-saturation"]),Ie["surprise-on-lightness"]);return{fill:e,ink:qt(e),on:o,onInk:qt(o)}}var Cl=(e,t)=>{let n=Math.abs(e-t)%360;return Math.min(n,360-n)};function Ll(e,t=Math.random){let[n,o]=Ie["surprise-saturation"],[i,r]=Ie["surprise-lightness"],l=Ie["surprise-min-hue-gap"],s=Ml(e)?si(e).h:null,c=t()*360;return s!==null&&Cl(c,s)<l&&(c=(s+l+t()*(360-2*l))%360),di(c,n+t()*(o-n),i+t()*(r-i))}function Tl(e){if(!e)return null;let t=Sl(e);return{[dt("surprise-fill")]:t.fill,[dt("surprise-ink")]:t.ink,[dt("surprise-on")]:t.on,[dt("surprise-on-ink")]:t.onInk}}var Fl=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Dl=e=>e<=.0031308?12.92*e:1.055*e**(1/2.4)-.055;function fo(e){let[t,n,o]=[1,3,5].map(s=>Fl(parseInt(e.slice(s,s+2),16)/255)),i=Math.cbrt(.4122214708*t+.5363325363*n+.0514459929*o),r=Math.cbrt(.2119034982*t+.6806995451*n+.1073969566*o),l=Math.cbrt(.0883024619*t+.2817188376*n+.6299787005*o);return[.2104542553*i+.793617785*r-.0040720468*l,1.9779984951*i-2.428592205*r+.4505937099*l,.0259040371*i+.7827717662*r-.808675766*l]}function Nl([e,t,n]){let o=(e+.3963377774*t+.2158037573*n)**3,i=(e-.1055613458*t-.0638541728*n)**3,r=(e-.0894841775*t-1.291485548*n)**3;return`#${[4.0767416621*o-3.3077115913*i+.2309699292*r,-1.2684380046*o+2.6097574011*i-.3413193965*r,-.0041960863*o-.7034186147*i+1.707614701*r].map(l=>Lt(Dl(Math.max(0,Math.min(1,l)))*255)).join("")}`.toUpperCase()}var zl=Ie["velocity-range"],ci={min:zt.rhythm["velocity-min"],max:zt.rhythm["velocity-max"]},go=Object.fromEntries(Object.entries(bl).map(([e,t])=>[e,{min:t.component.rhythm["velocity-min"],max:t.component.rhythm["velocity-max"],ink:t.component.rhythm["step-cell-ink"]}]));function ql(e,t=ci){let[n,o]=zl,i=Number.isFinite(e)?Math.max(n,Math.min(o,e)):n,r=(i-n)/(o-n),l=t.ink??zt.rhythm["step-cell-ink"];if(r<=0)return{velocity:i,t:0,fill:t.min.toUpperCase(),ink:l};if(r>=1)return{velocity:i,t:1,fill:t.max.toUpperCase(),ink:l};let s=fo(t.min),c=fo(t.max);return{velocity:i,t:r,fill:Nl(s.map((d,u)=>d+(c[u]-d)*r)),ink:l}}function bo(e,t=ci){return{[dt("velocity-fill")]:ql(e,t).fill}}var Bl={renames:[{old:"--nc-ui-key-white",new:"--nc-synth-key-white",js_old:"semantic['key-white']",js_new:"component.synth['key-white']"},{old:"--nc-ui-key-black",new:"--nc-synth-key-black",js_old:"semantic['key-black']",js_new:"component.synth['key-black']"},{old:"--nc-ui-key-hint-on-dark",new:"--nc-synth-key-hint-on-dark",js_old:"semantic['key-hint-on-dark']",js_new:"component.synth['key-hint-on-dark']"},{old:"--nc-ui-key-held-base",new:"--nc-synth-key-held-base",js_old:"semantic['key-held-base']",js_new:"component.synth['key-held-base']"},{old:"--nc-ui-keybed-height",new:"--nc-synth-keybed-height",js_old:"semantic['keybed-height']",js_new:"component.synth['keybed-height']"},{old:"--nc-ui-font-curve-label",new:"--nc-synth-curve-label-font",js_old:"semantic['font-curve-label']",js_new:"component.synth['curve-label-font']"},{old:"--nc-ui-curve-label-size",new:"--nc-synth-curve-label-size",js_old:"semantic['curve-label-size']",js_new:"component.synth['curve-label-size']"},{old:"--nc-ui-slim-curve-width",new:"--nc-synth-slim-curve-width",js_old:"semantic['slim-curve-width']",js_new:"component.synth['slim-curve-width']"},{old:"--nc-ui-meaning-area-1",new:"--nc-meaning-area-1",js_old:"semantic['meaning-area-1']",js_new:"component.meaning['area-1']"},{old:"--nc-ui-meaning-area-2",new:"--nc-meaning-area-2",js_old:"semantic['meaning-area-2']",js_new:"component.meaning['area-2']"},{old:"--nc-ui-meaning-area-3",new:"--nc-meaning-area-3",js_old:"semantic['meaning-area-3']",js_new:"component.meaning['area-3']"},{old:"--nc-ui-meaning-area-4",new:"--nc-meaning-area-4",js_old:"semantic['meaning-area-4']",js_new:"component.meaning['area-4']"},{old:"--nc-ui-meaning-intimacy",new:"--nc-meaning-intimacy",js_old:"semantic['meaning-intimacy']",js_new:"component.meaning['intimacy']"},{old:"--nc-ui-meaning-energy",new:"--nc-meaning-energy",js_old:"semantic['meaning-energy']",js_new:"component.meaning['energy']"},{old:"--nc-ui-meaning-tension",new:"--nc-meaning-tension",js_old:"semantic['meaning-tension']",js_new:"component.meaning['tension']"},{old:"--nc-ui-meaning-ambiguity",new:"--nc-meaning-ambiguity",js_old:"semantic['meaning-ambiguity']",js_new:"component.meaning['ambiguity']"},{old:"--nc-ui-meaning-movement",new:"--nc-meaning-movement",js_old:"semantic['meaning-movement']",js_new:"component.meaning['movement']"},{old:"--nc-ui-meaning-highlight",new:"--nc-meaning-highlight",js_old:"semantic['meaning-highlight']",js_new:"component.meaning['highlight']"},{old:"--nc-ui-drawer-bg",new:"--nc-situation-drawer-bg",js_old:"semantic['drawer-bg']",js_new:"component.situation['drawer-bg']"},{old:"--nc-ui-drawer-width",new:"--nc-situation-drawer-width",js_old:"semantic['drawer-width']",js_new:"component.situation['drawer-width']"},{old:"--nc-ui-map-marker-off",new:"--nc-situation-map-marker-off",js_old:"semantic['map-marker-off']",js_new:"component.situation['map-marker-off']"},{old:"--nc-ui-chart-tick-size",new:"--nc-situation-chart-tick-size",js_old:"semantic['chart-tick-size']",js_new:"component.situation['chart-tick-size']"},{old:"--nc-ui-chart-tooltip-size",new:"--nc-situation-chart-tooltip-size",js_old:"semantic['chart-tooltip-size']",js_new:"component.situation['chart-tooltip-size']"}]},Rl={"surface-page":"color",text:"color","text-sub":"color",divider:"color","surface-raised":"color",accent:"color","on-accent":"color",danger:"color","module-bg-adjacent-1":"color","module-bg-adjacent-2":"color","module-bg-adjacent-3":"color","module-bg-adjacent-4":"color","module-bg-stack-1":"color","module-bg-stack-2":"color","module-bg-stack-3":"color","module-bg-stack-4":"color","module-sub-stack-1":"color","module-sub-stack-2":"color","module-sub-stack-3":"color","module-sub-stack-4":"color","module-div-stack-1":"color","module-div-stack-2":"color","module-div-stack-3":"color","module-div-stack-4":"color","module-pad":"length","module-pad-y-desktop":"length","module-pad-x-desktop":"length","module-pad-x-slim":"length","module-slim-column":"length","target-min":"length","target-min-coarse":"length","stack-card-pad-y":"length","font-ui":"family","font-readout":"family","title-size":"length","title-size-slim":"length","title-weight":"other","title-tracking":"other","label-size":"length","label-weight":"other","label-tracking":"other","readout-size":"length","readout-size-small":"length","body-size":"length","slot-font-size":"length","slider-track":"color","slider-progress":"color","slider-thumb":"color","slider-thumb-size":"length","focus-ring":"color","focus-width":"length","focus-width-strong":"length",playhead:"color","playhead-width":"length","playhead-offset":"length",hairline:"length","rule-strong":"length","slot-size":"length","slot-span":"length","slot-block":"length","accent-tint":"color","accent-soft":"color","accent-faint":"color","beat-gap":"length","row-inset":"length","marker-width":"length","slot-radius":"length","slot-gap":"length","slot-filled-bg":"color","slot-active-bg":"color","slot-active-ink":"color","sparkle-size":"length","sparkle-icon-size":"length","label-on-fill-dark":"color","label-on-fill-light":"color","curve-stroke":"length","trace-stroke":"length","grid-stroke":"length","transition-feedback":"duration","motion-fade":"duration","motion-fade-out":"duration","motion-slide":"duration","motion-fade-easing":"other","motion-fade-out-easing":"other","motion-slide-easing":"other","motion-press-easing":"other","motion-thumb":"duration","motion-thumb-easing":"other","motion-meter-rise":"duration","motion-meter-fall":"duration","motion-meter-easing":"other","motion-meter-hold":"duration","meter-fill":"color","meter-peak":"color","meter-hold-mark":"color","meter-clip":"color","meter-track":"color","meter-width":"length","clip-size":"length","fx-level-bar":"length","fx-level-height":"length","fx-level-fold-length":"length","fx-level-in":"color","fx-level-out":"color","fx-level-hot":"color","fader-height":"length","fader-cap-width":"length","fader-cap-height":"length","fader-cap":"color","fader-cap-line":"color","fader-track":"color","strip-width":"length","strip-width-master":"length","scale-size":"length","fx-card-width":"length","fx-fold-width":"length","fx-fold-width-slim":"length","eq-graph-height":"length","eq-graph-height-max":"length","level-steps-height":"length","level-steps-height-max":"length","level-steps-curve":"color","level-steps-bar":"color","level-steps-free":"color","eq-node-size":"length","eq-graph-bg":"color","eq-curve":"color","eq-fill":"color","eq-grid":"color","eq-spectrum":"color","eq-band-1":"color","eq-band-2":"color","eq-band-3":"color","eq-panel-layer":"other","strip-fold-width":"length","head-margin-compact":"length","motion-press":"duration","control-weight":"other","tab-size":"length","tab-pad-y":"length","tab-mark":"length","select-pad-end":"length","select-mark":"length","page-head-layer":"other","page-head-bg":"color","instrument-astrid":"color","instrument-petra":"color","instrument-olive":"color","instrument-lucy":"color","instrument-nyx":"color","instrument-calliope":"color","fader-cap-master":"color","strip-hacks-text":"color","strip-alt-bg":"color","strip-shade-1":"color","strip-shade-2":"color","strip-shade-3":"color","strip-shade-4":"color","strip-shade-5":"color","strip-shade-6":"color","strip-shade-7":"color","strip-shade-8":"color","strip-bg":"color","strip-divider":"color","page-title-size":"length","page-title-tracking":"other","page-sub-size":"length","page-sub-gap":"length","page-action-gap":"length","page-pad-x":"length","page-pad-x-md":"length","page-pad-x-xl":"length","page-pad-y":"length","page-pad-y-md":"length","page-head-gap":"length","page-head-gap-md":"length","page-body-gap":"length","page-body-gap-lg":"length","filter-lowpass":"color","filter-highpass":"color","filter-bandpass":"color","toast-bg":"color","toast-text":"color","toast-action":"color","toast-font-size":"length","toast-pad-x":"length","toast-gap":"length","toast-radius":"length","toast-offset":"length","toast-anchor-gap":"length","toast-target":"length","move-size":"length","move-icon":"length","move-gap":"length","move-row-gap":"length","move-label-width":"length","on-danger":"color","dialog-scrim":"color","fill-rack":"color","fill-panel":"color","fill-cell":"color","fill-radius":"length","fill-cell-radius":"length","fill-gutter":"length","dialog-width":"length","dialog-pad":"length","dialog-gap":"length","dialog-button-gap":"length","dialog-radius":"length","dialog-leading":"other","module-gap":"length","control-gap":"length","header-gap":"length","head-margin":"length","name-width":"length","slider-pitch":"length","knob-size":"length","display-height":"length","button-tracking":"other","button-pad-y":"length","fx-name-weight":"other","label-leading":"other"},Pl={"step-cell-off":"color","step-cell-on":"color","step-cell-ink":"color","step-cell-accent":"color","step-cell-size":"length","step-gap":"length",playhead:"color","track-mute":"color","track-solo":"color","velocity-bar":"color","velocity-min":"color","velocity-max":"color","accent-mark":"color","accent-mark-size":"length","step-mark-size":"length","step-mark-inset":"length","bar-accent":"color","lane-1":"color","lane-2":"color","lane-3":"color","lane-4":"color","sparkle-gap":"length","morph-max":"length","morph-min":"length","morph-readout":"length","brand-size":"length","brand-tracking":"other","brand-weight":"other","brand-sub-size":"length","brand-sub-gap":"length"},Il={"surprise-fill":"color","surprise-ink":"color","surprise-on":"color","surprise-on-ink":"color","velocity-fill":"color"},_t={};for(let[e,t]of Object.entries(Rl))_t[e]={prop:`--nc-ui-${e}`,kind:t,tier:"semantic"};for(let[e,t]of Object.entries(Il))_t[e]={prop:`--nc-ui-${e}`,kind:t,tier:"runtime"};for(let[e,t]of Object.entries(Pl))_t[`rhythm.${e}`]={prop:`--nc-rhythm-${e}`,kind:t,tier:"rhythm"};new Map(Bl.renames.map(e=>[e.old,e.new]));function ui(e){let t=_t[e];if(!t)throw new Error(`Unknown token "${e}". Add it to src/alias.js.`);return t}function te(e){return ui(e).prop}function a(e){return`var(${te(e)})`}function Hl(e,t){if(!(e instanceof Element))return 0;let n=Number.parseFloat(getComputedStyle(e).getPropertyValue(te(t)));return Number.isFinite(n)?n:0}function ne(e,t){let n=ui(t),o=e.ownerDocument??document,i=o.createElement("span");i.dataset.ncLive=t,i.style.position="absolute",i.style.pointerEvents="none";let r=`var(${n.prop})`;n.kind==="family"?i.style.fontFamily=r:n.kind==="length"||n.kind==="other"||n.kind==="duration"?i.style.paddingLeft=r:i.style.color=r,(e instanceof Element?e:o.documentElement).append(i);let l=(o.defaultView??window).getComputedStyle(i),s=n.kind==="family"?l.fontFamily:n.kind==="color"?l.color:l.paddingLeft;return i.remove(),s}function pi(e){return e==="hp"?"filter-highpass":e==="bp"?"filter-bandpass":"filter-lowpass"}function jl(e){let t=e.ownerDocument??document,n=t.createElement("span");n.style.fontFamily=a("font-ui"),n.style.fontSize=a("label-size"),n.style.fontWeight=a("label-weight"),(e instanceof Element?e:t.documentElement).append(n);let o=(t.defaultView??window).getComputedStyle(n).font;return n.remove(),o}var Ol="[data-modulated], [data-modulated] *";function aa(e){let t=`${e}.nc-group[data-nc-collapse="phone"]`;return`  ${t} { display: flex; }
  ${t} > .nc-group-toggle { display: grid; }
  ${t} > .nc-group-body { display: flex; }
  ${t}[data-nc-open="false"] > .nc-group-body { display: none; }`}function vo(e){let t=`${e}.nc-stack[data-nc-layout="adjacent"]`;return`  ${t} {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(${a("module-slim-column")} * 2)), 1fr));
    align-items: start;
  }
  ${t} > .nc-module { border-inline-end: ${a("hairline")} solid ${a("divider")}; }
  /* Two rows tall as well, so the modules after it fill the column beside it before a new row starts. */
  ${t} > .nc-module[data-nc-lead]:not([data-nc-slim]) { grid-column: span 2; grid-row: span 2; }`}function na(e){return`  background-image: conic-gradient(from -26.565deg at 50% 100%, ${a(e)} 53.13deg, transparent 0);`}function _l(){let e=o=>`
    .nc-module[data-nc-place="stack"][data-nc-shade="${o}"],
    .nc-ui-fx[data-nc-depth="${o}"] {
      background: ${a(`module-bg-stack-${o}`)};
      ${te("text-sub")}: ${a(`module-sub-stack-${o}`)};
      ${te("divider")}: ${a(`module-div-stack-${o}`)};
      ${te("slider-track")}: ${a(`module-div-stack-${o}`)};
    }`,t=o=>`.nc-module[data-nc-place="adjacent"][data-nc-shade="${o}"] { background: ${a(`module-bg-adjacent-${o}`)}; }`,n=o=>o<4?`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] { background: ${a(`module-bg-adjacent-${o+1}`)}; }`:`.nc-module[data-nc-shade="${o}"] .nc-section[data-nc-inset="true"] {
      background: ${a("module-bg-stack-1")};
      ${te("text-sub")}: ${a("module-sub-stack-1")};
      ${te("divider")}: ${a("module-div-stack-1")};
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
${Ol} { transition: none; }
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
${na("text-sub")}
  background-size: ${a("select-mark")} ${a("select-mark")};
  background-position: right 0 center;
  background-repeat: no-repeat;
  background-origin: border-box;
}
.nc-dd { appearance: none; }
:is(.nc-select, .nc-dd):is(:hover, :focus):not(:disabled) {
${na("text")}
}
:is(.nc-select, .nc-dd):disabled {
${na("divider")}
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
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
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
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] > [data-nc-area="master"] {
  grid-area: master;
  align-items: center;
  padding-inline: ${a("control-gap")} ${a("module-pad")};
  padding-bottom: ${a("module-pad")};
  background: ${a("module-bg-stack-1")};
  ${te("text-sub")}: ${a("module-sub-stack-1")};
  ${te("divider")}: ${a("module-div-stack-1")};
  ${te("slider-track")}: ${a("module-div-stack-1")};
}
.nc-module-body[data-nc-layout="console"] .nc-ui-fx {
  margin: 0;
  padding: ${a("stack-card-pad-y")} ${a("module-pad")} ${a("module-pad")};
  ${te("text-sub")}: inherit;
  ${te("divider")}: inherit;
  ${te("slider-track")}: inherit;
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
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
/* …and the knob rings' and the meter's unlit track, which (div-0) vanishes on the middle light greys. */
.nc-strip[data-nc-shade]:not([data-nc-shade="1"]):not([data-nc-shade="2"]):not([data-nc-master]) { ${te("meter-track")}: color-mix(in oklab, ${a("text-sub")} 30%, var(--nc-strip-shade)); }
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
.nc-strip:not([data-nc-master]) > .nc-strip-ms { ${te("divider")}: ${a("strip-divider")}; }
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
${vo("")}
}
@media (max-width: 1023px) {
${vo("html[data-nc-landscape] ")}
}
/* Phone-only groups fold on phones: portrait, a landscape phone, and a Studio frame on a landscape phone. */
@media (max-width: 768px) {
${aa("")}
}
@media (orientation: landscape) and (max-height: 500px) and (max-width: 1023px) {
${aa("")}
}
@media (max-width: 1023px) {
${aa("html[data-nc-landscape] ")}
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
`}var oa=null,Ul="nc-ui-fallback";function hi(e=globalThis.document){if(!e?.documentElement||(e.documentElement,oa&&oa.ownerDocument===e))return;let t=e.createElement("style");t.dataset.ncKit="",t.textContent=`@layer ${Ul} {
${_l()}
}
`,e.head.append(t),oa=t}var Vl=new URL("/aria/assets/confirm-DwyQU4Nn.css",import.meta.url).href,Yl=e=>{let t=e.querySelector?.("link[data-nc-ui-confirm]");return!t&&e.head&&(t=e.createElement("link"),t.rel="stylesheet",t.href=Vl,t.dataset.ncUiConfirm="",t.ncWait=new Promise(n=>{let o=()=>{t.ncWait=null,n()};t.onload=o,t.onerror=o}),e.head.append(t)),t?.ncWait};typeof document<"u"&&Yl(document);function Ja(e={}){let t=e.doc??globalThis.document,n=t.createElement("button");n.type="button",n.className="nc-ui-switch",n.setAttribute("role","switch"),e.id&&(n.id=e.id),e.labelledBy?n.setAttribute("aria-labelledby",e.labelledBy):e.label&&n.setAttribute("aria-label",e.label);let o=t.createElement("span");o.className="nc-ui-switch-text",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.dataset.ncOn="",i.textContent=e.onText??"On";let r=t.createElement("span");r.dataset.ncOff="",r.textContent=e.offText??"Off",o.append(i,r),n.append(o);let l=!1,s=d=>{l=d===!0,n.setAttribute("aria-checked",l?"true":"false")};s(e.checked);let c=()=>{s(!l),e.onChange?.(l)};return n.addEventListener("click",c),{el:n,get checked(){return l},set:s,destroy(){n.removeEventListener("click",c),n.remove()}}}var mi=new WeakMap,wo=.25;function Gl(e){let t=e.doc??globalThis.document,n=t.createElement("div");n.className="nc-fader",n.tabIndex=0,n.setAttribute("role","slider"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-valuemin","0"),n.setAttribute("aria-valuemax","1");let o=t.createElement("span");o.className="nc-fader-track",o.setAttribute("aria-hidden","true");let i=t.createElement("span");i.className="nc-fader-cap",i.setAttribute("aria-hidden","true"),n.append(o,i);let r=0,l=e.step??.005,s=e.onChange,c=e.onReset,d=m=>Math.min(1,Math.max(0,m)),u=()=>{n.style.setProperty("--fader-pos",String(r)),n.setAttribute("aria-valuenow",String(Math.round(r*1e3)/1e3))},p=m=>{let v=d(m);v!==r&&(r=v,u(),s?.(v))},f=0,h=!1;n.addEventListener("pointerdown",m=>{if(m.button!==0)return;m.preventDefault(),n.focus?.({preventScroll:!0});let v=n.getBoundingClientRect();m.target!==i&&v.height>0&&p(1-(m.clientY-v.top)/v.height),f=m.clientY,h=!0,n.dataset.dragging="true",n.setPointerCapture?.(m.pointerId)}),n.addEventListener("pointermove",m=>{if(!h)return;let v=n.getBoundingClientRect().height||1,y=(f-m.clientY)/v*(m.shiftKey?wo:1);f=m.clientY,p(r+y)});let w=()=>{h=!1,delete n.dataset.dragging};n.addEventListener("pointerup",w),n.addEventListener("pointercancel",w),n.addEventListener("lostpointercapture",w),n.addEventListener("dblclick",m=>{m.preventDefault(),c?.()}),n.addEventListener("keydown",m=>{let v=m.shiftKey?l*wo:l,y={ArrowUp:r+v,ArrowRight:r+v,ArrowDown:r-v,ArrowLeft:r-v,PageUp:r+l*10,PageDown:r-l*10,Home:0,End:1};m.key in y&&(m.preventDefault(),p(y[m.key]))});let E={el:n,get value(){return r},get dragging(){return h},set(m){h||(r=d(Number(m)||0),u())},setText(m){m?n.setAttribute("aria-valuetext",m):n.removeAttribute("aria-valuetext")},setLabel(m){n.setAttribute("aria-label",m)},configure(m){typeof m.step=="number"&&m.step>0&&(l=m.step),m.onChange&&(s=m.onChange),m.onReset&&(c=m.onReset)}};return E.setLabel(e.label),E.set(e.value??0),E.setText(e.valueText),mi.set(n,E),E}function Wl(e){return mi.get(e)}var fi=new WeakMap,Xl=.2,Kl=1.5,Ql=.5;function Zl(e,t){let n=String(e??"").trim(),o=Number.parseFloat(n);return Number.isFinite(o)?n.endsWith("ms")?o/1e3:o:t}function xo(e,t,n){let o=e.ownerDocument?.defaultView??globalThis;return typeof o.getComputedStyle!="function"?n:Zl(o.getComputedStyle(e).getPropertyValue(te(t)),n)}function Jl(e){let t=e.doc??globalThis.document,n=e.channels===2?2:1,o=t.createElement("div");o.className="nc-meter",o.dataset.ncChannels=String(n);let i=t.createElement("button");i.type="button",i.className="nc-meter-clip",i.dataset.lit="false";let r=t.createElement("div");r.className="nc-meter-bars",r.setAttribute("aria-hidden","true");let l=[];for(let E=0;E<n;E++){let m=t.createElement("span");m.className="nc-meter-bar";let v=t.createElement("span");v.className="nc-meter-peak";let y=t.createElement("span");y.className="nc-meter-rms";let g=t.createElement("span");g.className="nc-meter-hold",m.append(v,y,g),r.append(m),l.push({peak:v,rms:y,hold:g,shown:{peak:-1,rms:-1,hold:-1},level:{peak:0,rms:0},holdAt:0,holdAge:0})}o.append(i,r);let s=e.label,c=e.onClear,d=!1,u=-1,p=-1,f=()=>{i.dataset.lit=d?"true":"false",i.setAttribute("aria-pressed",d?"true":"false"),i.setAttribute("aria-label",d?`${s} clipped: clear`:`${s} clip light`),i.title=d?"Clipped. Click to clear":"Clip light"},h=(E,m,v,y)=>{let g=Math.round(y*1e3)/1e3;v[m]!==g&&(v[m]=g,E.style.transform=m==="hold"?`translateY(${Math.round((1-g)*1e3)/10}%)`:`scaleY(${g})`)};i.addEventListener("click",()=>{w.clear(),c?.()});let w={el:o,get clipped(){return d},update(E,m){u<0&&(u=xo(o,"motion-meter-fall",Xl)),p<0&&(p=xo(o,"motion-meter-hold",Kl));let v=Math.max(0,Math.min(.25,Number(m)||0)),y=u>0?Math.exp(-v/u):0;l.forEach((g,P)=>{let M=E[P]??E[0]??{peak:0,rms:0},C=Math.min(1,Math.max(0,Number(M.peak)||0)),b=Math.min(C,Math.max(0,Number(M.rms)||0));M.over&&w.clip(),g.level.peak=C>=g.level.peak?C:C+(g.level.peak-C)*y,g.level.rms=b>=g.level.rms?b:b+(g.level.rms-b)*y,g.holdAge+=v,C>=g.holdAt?(g.holdAt=C,g.holdAge=0):g.holdAge>p&&(g.holdAt=Math.max(C,g.holdAt-Ql*v)),h(g.peak,"peak",g.shown,g.level.peak),h(g.rms,"rms",g.shown,g.level.rms),h(g.hold,"hold",g.shown,g.holdAt),g.hold.dataset.off=g.holdAt<=.001?"true":"false"})},clip(){d||(d=!0,f())},clear(){d=!1,f()},reset(){for(let E of l)E.level.peak=0,E.level.rms=0,E.holdAt=0,E.holdAge=0,h(E.peak,"peak",E.shown,0),h(E.rms,"rms",E.shown,0),h(E.hold,"hold",E.shown,0),E.hold.dataset.off="true"},setLabel(E){s=E,f()},configure(E){E.onClear&&(c=E.onClear)}};return f(),w.reset(),fi.set(o,w),w}function es(e){return e?fi.get(e):void 0}var ts=3,as=new Set(["freq","q","rate","time","log"]);function en(e,t,n){return!e||!as.has(e)||!(n>t)?"linear":t>0?"log":"power"}function yt(e,t,n){return en(e,t,n)!=="linear"}function Bt(e,t,n,o){let i=Number(o);if(!(n>t)||!Number.isFinite(i))return 0;let r=Math.min(n,Math.max(t,i)),l=en(e,t,n);if(l==="log")return Math.log(r/t)/Math.log(n/t);let s=(r-t)/(n-t);return l==="power"?Math.cbrt(s):s}function gi(e,t,n,o){let i=Math.min(1,Math.max(0,Number(o)||0)),r=en(e,t,n);return r==="log"?t*(n/t)**i:t+(n-t)*(r==="power"?i**ts:i)}function bi(e,t,n,o){let i=Math.min(n,Math.max(t,e));if(o>0){i=t+Math.round((i-t)/o)*o;let r=Math.min(12,Math.max(0,Math.ceil(-Math.log10(o))+1));i=Number(i.toFixed(r)),i=Math.min(n,Math.max(t,i))}return i}function gt(e,t,n,o){return Math.round(Bt(e,t,n,o)*1e3)}function Rt(e,t,n,o,i){return bi(gi(e,t,n,Number(o)/1e3),t,n,i)}function ns(e,t,n=!1){let o=Number(e)||0,i=n?1:1e3/100,r=null;return t==="ArrowRight"||t==="ArrowUp"?r=o+i:t==="ArrowLeft"||t==="ArrowDown"?r=o-i:t==="PageUp"?r=o+1e3/10:t==="PageDown"?r=o-1e3/10:t==="Home"?r=0:t==="End"&&(r=1e3),r===null?null:Math.min(1e3,Math.max(0,Math.round(r)))}function tn(e,t,n,o,i,r=!1,l){let s=gt(e,t,n,o),c=ns(s,i,r);if(c===null)return null;let d=Rt(e,t,n,c,l),u=Math.sign(c-s),p=bi(Number(o),t,n,l);for(;u!==0&&d===p&&c>0&&c<1e3;)c+=u,d=Rt(e,t,n,c,l);return d}function yo(e){let t=Number(e);return t>0&&Number.isFinite(t)?Math.log1p(t/.03):0}function os(e,t,n,o=n/6){let i=e.some(u=>u===null),r=Math.max(0,n-(i?o:0)),l=e.reduce((u,p,f)=>p===null?u:u+yo(t[f]),0),s=l>0?r/l:0,c=e.map(u=>u===null?0:Math.min(r,yo(u)*s));if(i){let u=c.reduce((f,h)=>f+h,0),p=e.indexOf(null);c[p]=Math.max(o,n-u)}let d=[0];for(let u of c)d.push(Math.round((d[d.length-1]+u)*100)/100);return i&&(d[d.length-1]=n),d}function is(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.floor(t*o)),r=Math.max(1,Math.floor(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function Ce(e){return Math.max(0,Math.min(1,e))}function vi(e,t){let{ctx:n,w:o,h:i}=is(e);if(!n)return;n.clearRect(0,0,o,i);let r=jl(e);if(t.paint==="swatch"){let c=ne(e,"accent"),d=ne(e,"rhythm.step-cell-on");e.dataset.ncAccent=c,e.dataset.ncStep=d,n.fillStyle=c,n.fillRect(0,0,o/2,i),n.fillStyle=d,n.fillRect(o/2,0,o/2,i);return}if(t.paint==="filter"&&typeof t.hz=="number"){ss(n,o,i,t,e,r);return}if(t.paint==="filter"){let c=t.mode??"lp",d=ne(e,pi(c)),u=ne(e,"divider"),p=Ce(t.cutoff??.5),f=.08+(1-Ce(t.resonance??.2))*.22;n.strokeStyle=u,n.beginPath(),n.moveTo(0,i*.72),n.lineTo(o,i*.72),n.stroke(),n.beginPath();for(let h=0;h<=o;h++){let w=h/Math.max(1,o),E=0;c==="lp"?E=w<p?1:Math.max(0,1-(w-p)/f):c==="hp"?E=w>p?1:Math.max(0,1-(p-w)/f):E=Math.max(0,1-Math.abs(w-p)/f);let m=i*.78-E*i*.62;h===0?n.moveTo(h,m):n.lineTo(h,m)}n.strokeStyle=d,n.stroke(),n.fillStyle=ne(e,"text-sub"),n.font=r,n.fillText(c.toUpperCase(),0,i),e.dataset.ncAccent=d;return}if(t.paint==="envelope"){n.strokeStyle=ne(e,"accent");let c=Math.max(0,t.attack??0),d=Math.max(0,t.decay??.4),[u,p,f]=os([c,d],t.max??[1,4],o),h=2,w=i-1;n.beginPath(),n.moveTo(u,w),n.lineTo(p,h);let E=Math.max(1,Math.ceil(f-p));for(let m=1;m<=E;m++){let v=m/E;n.lineTo(p+(f-p)*v,w-(w-h)*Math.exp(-4.6*v)*(1-v*.01))}n.lineTo(f,w),n.lineTo(o,w),n.stroke(),e.dataset.ncAccent=n.strokeStyle;return}if(t.paint==="waveform"){let c=Array.isArray(t.peaks)?t.peaks:[],[d,u]=Array.isArray(t.region)?t.region:[0,1],p=ne(e,"accent"),f=ne(e,"text-sub"),h=i/2;n.fillStyle=ne(e,"accent-soft"),n.fillRect(Ce(d)*o,0,(Ce(u)-Ce(d))*o,i),n.strokeStyle=ne(e,"divider"),n.beginPath(),n.moveTo(0,h),n.lineTo(o,h),n.stroke();let w=Math.floor(c.length/2);for(let E=0;E<w;E++){let m=(E+.5)/w*o,v=Math.max(-1,Math.min(1,c[E*2]??0)),y=Math.max(-1,Math.min(1,c[E*2+1]??0)),g=(E+.5)/w;n.strokeStyle=g>=d&&g<=u?p:f,n.beginPath(),n.moveTo(m,h-y*(h-1)),n.lineTo(m,h-v*(h-1)+.5),n.stroke()}n.strokeStyle=p;for(let E of[d,u,...Array.isArray(t.markers)?t.markers:[]]){let m=Math.round(Ce(E)*(o-1))+.5;n.beginPath(),n.moveTo(m,0),n.lineTo(m,i),n.stroke()}typeof t.position=="number"&&t.position>=0&&(n.fillStyle=ne(e,"text"),n.fillRect(Math.round(Ce(t.position)*(o-1)),0,1,i)),w||(n.fillStyle=f,n.font=r,n.fillText(t.empty??"Empty",0,h+4)),e.dataset.ncAccent=p;return}if(t.paint==="meter"){let c=Ce(t.level??0);n.fillStyle=ne(e,"divider"),n.fillRect(0,i*.4,o,i*.2),n.fillStyle=ne(e,"accent"),n.fillRect(0,i*.4,o*c,i*.2),e.dataset.ncAccent=n.fillStyle;return}let l=Math.max(1,t.steps??16),s=((t.step??0)%l+l)%l;n.fillStyle=ne(e,"rhythm.step-cell-off"),n.fillRect(0,i*.45,o,i*.1),n.fillStyle=ne(e,"rhythm.playhead"),n.fillRect(s/l*o,i*.3,Math.max(1,o/l),i*.4),e.dataset.ncAccent=ne(e,"accent")}var pt=20,$a=2e4,ia=24,$o=-60;function rs(e,t,n,o,i=48e3){let r=2*Math.PI*Math.min(t,i*.49)/i,l=Math.cos(r),s=Math.sin(r)/(2*n),c,d,u;e==="hp"?[c,d,u]=[(1+l)/2,-(1+l),(1+l)/2]:e==="bp"?[c,d,u]=[s,0,-s]:[c,d,u]=[(1-l)/2,1-l,(1-l)/2];let p=1+s,f=-2*l,h=1-s,w=2*Math.PI*o/i,E=(g,P,M)=>g+P*Math.cos(w)+M*Math.cos(2*w),m=(g,P)=>-(g*Math.sin(w)+P*Math.sin(2*w)),v=Math.hypot(E(c,d,u),m(d,u)),y=Math.hypot(E(p,f,h),m(f,h));return y>0?v/y:0}function ls(e,t){return Math.log(Math.max(pt,Math.min($a,e))/pt)/Math.log($a/pt)*t}function ko(e,t,n){let o=Math.max($o,Math.min(ia,e));return t+(ia-o)/(ia-$o)*(n-t)}function ss(e,t,n,o,i,r){let l=o.mode??"lp",s=ne(i,pi(l)),c=ne(i,"divider"),d=ne(i,"text-sub"),u=Number.parseFloat(String(r).match(/(\d+(?:\.\d+)?)px/)?.[1]??"10"),p=1,f=Math.max(p+4,n-u-3),h=o.q??Math.SQRT1_2,w=Math.round(ko(0,p,f))+.5;e.strokeStyle=c,e.lineWidth=1,e.beginPath(),e.moveTo(0,w),e.lineTo(t,w),e.stroke(),e.beginPath();for(let E=0;E<=t;E++){let m=pt*($a/pt)**(E/Math.max(1,t)),v=o.open?1:rs(l,o.hz,h,m,o.sampleRate),y=ko(20*Math.log10(Math.max(1e-5,v)),p,f);E===0?e.moveTo(E,y):e.lineTo(E,y)}if(e.strokeStyle=s,e.stroke(),!o.open){let E=Math.round(ls(o.hz,t))+.5;e.strokeStyle=d,e.setLineDash?.([2,3]),e.beginPath(),e.moveTo(E,p),e.lineTo(E,f),e.stroke(),e.setLineDash?.([])}e.fillStyle=d,e.font=r,e.textAlign="left",e.fillText("20 Hz",0,n-1),e.textAlign="right",e.fillText("20 kHz",t,n-1),e.textAlign="left",i.dataset.ncAccent=s,i.dataset.ncFilterHz=String(Math.round(o.hz))}function ye(e,t){let n=e.ownerDocument,o=n.createElement("span");o.style.position="absolute",o.style.color=`var(--nc-ui-${t})`,e.append(o);let i=n.defaultView.getComputedStyle(o).color;return o.remove(),i}function ds(e){let t=e.ownerDocument,n=t.createElement("span");n.style.fontFamily="var(--nc-ui-font-ui)",n.style.fontSize="var(--nc-ui-label-size)",n.style.fontWeight="var(--nc-ui-label-weight)",e.append(n);let o=t.defaultView.getComputedStyle(n).font;return n.remove(),o}var Oe=20,$t=2e4,an=Math.log($t/Oe),ka=32,cs=250,us=-100,ps=1200,hs=4.5,Eo=-6,Re=-96,ms=48,Ao=[100,1e3,1e4],fs=[6,12];function Ke(e,t){return Math.log(Math.max(Oe,Math.min($t,e))/Oe)/an*t}function Tt(e,t){return Oe*Math.exp(Math.max(0,Math.min(t,e))/Math.max(1,t)*an)}function Fe(e,t,n,o){let i=t/2-o;return t/2-Math.max(-n,Math.min(n,e))/n*i}function Ea(e){return e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} kHz`:`${Math.round(e)} Hz`}var wi=e=>`${e>0?"+":e<0?"−":""}${Math.abs(Math.round(e*10)/10)} dB`;function gs(e,t,n,o){let i=n?3:1,r=c=>({db:Math.max(-o,Math.min(o,e.db+c*i))}),l=c=>({hz:Math.max(e.minHz??Oe,Math.min(e.maxHz??$t,e.hz*2**(c*i/6)))}),s=c=>({q:Math.max(e.minQ??.1,Math.min(e.maxQ??20,e.q*1.25**(c*i)))});switch(t){case"ArrowUp":return r(1);case"ArrowDown":return r(-1);case"ArrowRight":return e.moveHz?l(1):r(1);case"ArrowLeft":return e.moveHz?l(-1):r(-1);case"PageUp":return e.moveQ?s(1):null;case"PageDown":return e.moveQ?s(-1):null;case"Delete":case"Backspace":case"Home":return"reset";default:return null}}function nn(e){return e.kind==="lowshelf"||e.kind==="highshelf"?.5:1}function bs(e,t,n,o,i,r,l,s,c){let d=c?.25:1,u={},p=Math.max(1,r/2-s);if(u.db=Math.max(-l,Math.min(l,t.db-o*d/p*l/nn(e))),e.moveHz){let f=t.hz*Math.exp(n*d/Math.max(1,i)*an);u.hz=Math.max(e.minHz??Oe,Math.min(e.maxHz??$t,f))}return u}function vs(e,t,n,o,i){let r=Math.max(0,n.left)+1,l=Math.min(n.right,i)-1,s=Math.min(t.width*3+o*2,l-r),c=Math.max(r,Math.min(e.left,l-s));return{left:Math.round(c-t.left),top:Math.round(e.top-t.top),width:Math.round(s)}}var re=new WeakMap;function ws(e,t){let n=document.createElement("div");n.className="nc-eq",n.dataset.ncId=e.id,n.dataset.ncEq="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-eq-plot";let i=document.createElement("canvas");i.className="nc-eq-spectrum",i.setAttribute("aria-hidden","true");let r=document.createElement("canvas");r.className="nc-eq-curve",r.setAttribute("aria-hidden","true");let l=document.createElement("span");l.className="nc-eq-tip",l.setAttribute("aria-hidden","true"),l.hidden=!0,o.append(i,r);for(let c of e.bands)o.append(xs(n,c,t));o.append(l),o.addEventListener("click",c=>{if(!Ai(n)||c.button>0)return;let d=Ei(n)?.querySelector("[data-nc-max-toggle]");d instanceof HTMLElement&&d.click()}),n.append(o);let s=document.createElement("i");return s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s),re.set(n,{control:e,cache:null,spec:null,active:null}),yi(n,e),n}function xi(e,t){return[...e.querySelectorAll(".nc-eq-node")].find(n=>n.dataset.band===t)??null}function xs(e,t,n){let o=document.createElement("div");o.className="nc-eq-node",o.tabIndex=0,o.dataset.band=t.id,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical");let i=()=>{let d=n(e);return d?.type==="eqGraph"?d:null},r=()=>i()?.bands.find(d=>d.id===t.id)??null,l=null;o.addEventListener("pointerdown",d=>{if(d.button!==0)return;let u=r();u&&(d.preventDefault(),o.focus({preventScroll:!0}),o.setPointerCapture?.(d.pointerId),l={id:d.pointerId,x:d.clientX,y:d.clientY,start:{hz:u.hz,db:u.db}},o.dataset.drag="true",Le(e,t.id))}),o.addEventListener("pointermove",d=>{if(!l||d.pointerId!==l.id)return;let u=i(),p=r(),f=re.get(e);if(!u||!p||!f?.box)return;let{w:h,h:w,pad:E}=f.box;u.onBand(p.id,bs(p,l.start,d.clientX-l.x,d.clientY-l.y,h,w,u.range??18,E,d.shiftKey))});let s=d=>{!l||d.pointerId!==l.id||(l=null,delete o.dataset.drag,e.ownerDocument.activeElement!==o&&!o.matches(":hover")&&Le(e,null))};o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("dblclick",d=>{d.preventDefault(),i()?.onReset?.(t.id)}),o.addEventListener("keydown",d=>{let u=i(),p=r();if(!u||!p)return;let f=gs(p,d.key,d.shiftKey,u.range??18);f&&(d.preventDefault(),f==="reset"?u.onReset?.(p.id):u.onBand(p.id,f),Le(e,p.id))});let c=null;return o.addEventListener("wheel",d=>{let u=i(),p=r();if(!u||!p?.moveQ)return;d.preventDefault();let f=d.timeStamp;(!c||f-c.t>400)&&(c={q:p.q,t:f});let h=d.deltaMode===1?d.deltaY*16:d.deltaMode===2?d.deltaY*400:d.deltaY;c.q=Math.max(p.minQ??.1,Math.min(p.maxQ??20,c.q*2**(-h/240))),c.t=f,u.onBand(p.id,{q:c.q}),Le(e,p.id)},{passive:!1}),o.addEventListener("pointerenter",()=>Le(e,t.id)),o.addEventListener("focus",()=>Le(e,t.id)),o.addEventListener("pointerleave",()=>{!l&&e.ownerDocument.activeElement!==o&&Le(e,null)}),o.addEventListener("blur",()=>{l||Le(e,null)}),o}function Le(e,t){let n=re.get(e);if(!n)return;let o=n.active!==t;n.active=t,o?et(e):on(e)}function on(e){let t=re.get(e),n=e.querySelector(".nc-eq-tip");if(!t||!(n instanceof HTMLElement))return;let o=t.active?t.control.bands.find(w=>w.id===t.active):null;for(let w of e.querySelectorAll(".nc-eq-node"))w instanceof HTMLElement&&(o&&w.dataset.band===o.id?w.dataset.active="true":delete w.dataset.active);if(!o||!t.box){n.hidden=!0;return}let i=[o.label,wi(o.db)];o.kind==="peak"?i.push(Ea(o.hz),`Q ${o.q.toFixed(1)}`):i.push(`${o.kind==="lowshelf"?"below":"above"} ${Ea(o.hz)}`),n.textContent=i.join(" · "),n.dataset.tone=String(ys(t.control,o)),n.hidden=!1;let{w:r,h:l,pad:s}=t.box,c=Ke(o.hz,r),d=Fe(o.db*nn(o),l,t.control.range??18,s),u=n.offsetWidth,p=n.offsetHeight,f=Math.max(0,Math.min(r-u,c-u/2)),h=d-p-s*1.5>=0?d-p-s*1.5:Math.min(l-p,d+s*1.5);n.style.left=`${Math.round(f)}px`,n.style.top=`${Math.round(h)}px`}function ys(e,t){return e.bands.indexOf(t)%3+1}function yi(e,t){let n=re.get(e);if(!n)return;n.control=t,e.setAttribute("aria-label",t.label??"EQ curve"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true",rn(e);let o=t.range??18;t.bands.forEach((i,r)=>{let l=xi(e,i.id);l instanceof HTMLElement&&(l.dataset.tone=String(r%3+1),l.dataset.kind=i.kind,l.setAttribute("aria-label",`${i.label} band`),l.setAttribute("aria-valuemin",String(-o)),l.setAttribute("aria-valuemax",String(o)),l.setAttribute("aria-valuenow",String(i.db)),l.setAttribute("aria-valuetext",i.valueText??`${wi(i.db)}, ${Ea(i.hz)}`),l.setAttribute("aria-keyshortcuts",i.moveQ?"ArrowUp ArrowDown ArrowLeft ArrowRight PageUp PageDown Delete":"ArrowUp ArrowDown Delete"),i.help?l.setAttribute("data-nc-help",i.help):l.removeAttribute("data-nc-help"))}),et(e),Ss(e)}function $i(e){let t=Math.max(1,e.clientWidth||0),n=Math.max(1,e.clientHeight||0),o=e.ownerDocument.defaultView?.devicePixelRatio||1,i=Math.max(1,Math.round(t*o)),r=Math.max(1,Math.round(n*o));(e.width!==i||e.height!==r)&&(e.width=i,e.height=r);let l=e.getContext("2d");return l?.setTransform(o,0,0,o,0,0),{ctx:l,w:t,h:n}}function ki(e){return{curve:ye(e,"eq-curve"),fill:ye(e,"eq-fill"),quiet:ye(e,"text-sub"),grid:ye(e,"eq-grid"),zero:ye(e,"divider"),label:ye(e,"text-sub"),spectrum:ye(e,"eq-spectrum"),bands:[ye(e,"eq-band-1"),ye(e,"eq-band-2"),ye(e,"eq-band-3")]}}function $s(e,t){return`${t}|${e.sampleRate??""}|${e.bands.map(n=>`${n.id}:${n.hz}:${n.db}:${n.q}`).join(",")}`}function et(e){re.has(e)&&rn(e);let t=re.get(e),n=e.querySelector(".nc-eq-curve");if(!t||!(n instanceof HTMLCanvasElement)||!e.isConnected)return;let o=t.control,{ctx:i,w:r,h:l}=$i(n);if(!i)return;let s=Math.max(8,Math.round(l*.06)),c=o.range??18;t.box={w:r,h:l,pad:s},t.colours=ki(e);let d=t.colours,u=$s(o,r);if(!t.cache||t.cache.key!==u){let P=Math.max(64,Math.ceil(r)+1),M=new Float64Array(P);for(let b=0;b<P;b++)M[b]=Tt(b/(P-1)*r,r);let C=null;try{C=typeof o.response=="function"?o.response(M):null}catch{C=null}t.cache={key:u,freqs:M,total:C?.total??new Float64Array(P),bands:C?.bands??[]}}i.clearRect(0,0,r,l);let p=ds(e),f=o.on!==!1;ks(i,r,l,c,s,d,p);let{freqs:h,total:w,bands:E}=t.cache,m=Array.from(h,P=>Ke(P,r)),v=Fe(0,l,c,s);E.forEach((P,M)=>{if(!P||!P.some(A=>Math.abs(A)>.05))return;let C=f?d.bands[M%3]:d.quiet,b=Array.from(P,A=>Fe(A,l,c,s));i.save(),t.active&&o.bands[M]?.id===t.active&&(i.globalAlpha=.14,i.fillStyle=C,Mo(i,m,b,v)),i.globalAlpha=f?.75:.4,i.strokeStyle=C,i.lineWidth=.75,ra(i,m,b),i.restore()});let y=Array.from(w,P=>Fe(P,l,c,s)),g=f?d.curve:d.quiet;i.save(),i.fillStyle=f?d.fill:d.quiet,i.globalAlpha=f?.2:.08,Mo(i,m,y,v),i.restore(),i.save(),i.strokeStyle=f?d.fill:g,i.lineJoin="round",i.lineCap="round",f&&(i.globalAlpha=.16,i.lineWidth=4,ra(i,m,y)),i.globalAlpha=1,i.strokeStyle=g,i.lineWidth=1.25,ra(i,m,y),i.restore(),Es(e),on(e)}function ks(e,t,n,o,i,r,l){e.save(),e.lineWidth=1;for(let c=10;c<=1e4;c*=10)for(let d=1;d<=9;d++){let u=c*d;if(u<Oe||u>$t)continue;let p=Math.round(Ke(u,t))+.5;e.globalAlpha=Ao.includes(u)?.9:.35,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(p,0),e.lineTo(p,n),e.stroke()}for(let c of fs)if(!(c>o))for(let d of[1,-1]){let u=Math.round(Fe(c*d,n,o,i))+.5;e.globalAlpha=c===12?.75:.4,e.strokeStyle=r.grid,e.beginPath(),e.moveTo(0,u),e.lineTo(t,u),e.stroke()}e.globalAlpha=1,e.strokeStyle=r.zero;let s=Math.round(Fe(0,n,o,i))+.5;e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke(),e.font=l,e.fillStyle=r.label,e.globalAlpha=.9,e.textBaseline="bottom",e.textAlign="left";for(let c of Ao){let d=c>=1e3?`${c/1e3}k`:String(c),u=e.measureText(d).width,p=Ke(c,t)+3;e.fillText(d,p+u+2>t?Ke(c,t)-u-3:p,n-2)}e.textBaseline="bottom",e.textAlign="right";for(let c of[12,0,-12]){if(Math.abs(c)>o)continue;let d=Fe(c,n,o,i);e.fillText(c>0?`+${c}`:c<0?`−${-c}`:"0",t-3,Math.round(d)-1)}e.restore()}function Pt(e,t,n){e.moveTo(t[0],n[0]);for(let o=1;o<t.length-1;o++){let i=(t[o]+t[o+1])/2,r=(n[o]+n[o+1])/2;e.quadraticCurveTo(t[o],n[o],i,r)}e.lineTo(t[t.length-1],n[n.length-1])}function ra(e,t,n){e.beginPath(),Pt(e,t,n),e.stroke()}function Mo(e,t,n,o){e.beginPath(),Pt(e,t,n),e.lineTo(t[t.length-1],o),e.lineTo(t[0],o),e.closePath(),e.fill()}function Ei(e){return e.closest("[data-nc-maxable]")}function Ai(e){let t=Ei(e);return!!t&&!t.hasAttribute("data-nc-max")}function rn(e){let t=Ai(e);t?e.dataset.locked="":delete e.dataset.locked;for(let n of e.querySelectorAll(".nc-eq-node"))n instanceof HTMLElement&&(n.setAttribute("tabindex",t?"-1":"0"),t?n.setAttribute("aria-hidden","true"):n.removeAttribute("aria-hidden"));if(t){let n=re.get(e);n?.active&&(n.active=null,on(e))}return t}function Es(e){rn(e);let t=re.get(e);if(!t?.box)return;let{w:n,h:o,pad:i}=t.box,r=t.control.range??18;for(let l of t.control.bands){let s=xi(e,l.id);s instanceof HTMLElement&&(s.style.left=`${Ke(l.hz,n).toFixed(1)}px`,s.style.top=`${Fe(l.db*nn(l),o,r,i).toFixed(1)}px`)}}function As(e,t,n,o){let i=o/2/n,r=new Float32Array(e),l=new Float32Array(e),s=new Float32Array(e);for(let c=0;c<e;c++){let d=(c-.5)/(e-1)*t,u=(c+.5)/(e-1)*t,p=Tt(d,t),f=Tt(u,t),h=Tt(c/(e-1)*t,t);r[c]=Math.min(n-1,p/i),l[c]=Math.min(n-1,f/i),s[c]=hs*Math.log2(h/1e3)}return{lo:r,hi:l,tilt:s}}function Ms(e,t,n){let o=Math.floor(t),i=Math.ceil(n);if(i-o<=1){let l=t-o,s=e[o]??-1/0,c=e[Math.min(e.length-1,o+1)]??s;return s+(c-s)*l}let r=-1/0;for(let l=o;l<=i&&l<e.length;l++)e[l]>r&&(r=e[l]);return r}function Ss(e){let t=re.get(e);if(t){if(!t.control.spectrum){Si(e);return}if(!t.spec){t.spec={analyser:null,buf:null,disp:null,map:null,raf:0,timer:0,last:0,loud:0,visible:!1,io:null};let n=e.ownerDocument.defaultView?.IntersectionObserver;n?(t.spec.io=new n(o=>{let i=re.get(e)?.spec;i&&(i.visible=o.some(r=>r.isIntersecting),Aa(e))}),t.spec.io.observe(e)):t.spec.visible=!0}Aa(e)}}function Aa(e){let t=re.get(e),n=t?.spec;if(!n)return;let o=e.ownerDocument;if(!(e.isConnected&&n.visible&&o.visibilityState!=="hidden"&&t.control.spectrum)){Mi(e);return}if(!n.analyser){if(n.source=t.control.spectrum,n.analyser=n.source.open?.()??null,!n.analyser)return;n.buf=new Float32Array(n.analyser.frequencyBinCount),n.loud=Ma(e),n.onVis||(n.onVis=()=>Aa(e),o.addEventListener("visibilitychange",n.onVis))}!n.raf&&!n.timer&&Sa(e,!1)}function Ma(e){return e.ownerDocument.defaultView?.performance?.now()??Date.now()}function Sa(e,t){let n=re.get(e)?.spec,o=e.ownerDocument.defaultView;!n||!o||(t?n.timer=o.setTimeout(()=>(n.timer=0,la(e,Ma(e))),cs):typeof o.requestAnimationFrame=="function"?n.raf=o.requestAnimationFrame(i=>(n.raf=0,la(e,i))):n.timer=o.setTimeout(()=>(n.timer=0,la(e,Ma(e))),ka))}function Mi(e){let t=re.get(e)?.spec;if(!t)return;let n=e.ownerDocument.defaultView;t.raf&&n?.cancelAnimationFrame?.(t.raf),t.timer&&n?.clearTimeout(t.timer),t.raf=0,t.timer=0,t.analyser&&(t.source?.close?.(),t.analyser=null,t.source=null),t.disp&&t.disp.fill(-1/0);let o=e.querySelector(".nc-eq-spectrum");o instanceof HTMLCanvasElement&&o.getContext("2d")?.clearRect(0,0,o.width,o.height)}function Si(e){let t=re.get(e)?.spec;if(!t)return;Mi(e),t.io?.disconnect(),t.onVis&&e.ownerDocument.removeEventListener("visibilitychange",t.onVis);let n=re.get(e);n&&(n.spec=null)}function la(e,t){let n=re.get(e),o=n?.spec;if(!n||!o)return;if(!e.isConnected){Si(e);return}if(!o.analyser)return;if(t-o.last<ka-4&&!o.idle){Sa(e,!1);return}let i=o.last?Math.min(.25,(t-o.last)/1e3):ka/1e3;o.last=t;let r=e.querySelector(".nc-eq-spectrum");if(!(r instanceof HTMLCanvasElement))return;let{ctx:l,w:s,h:c}=$i(r);if(!l)return;let d=Math.max(16,Math.round(s/2)),u=o.analyser.context?.sampleRate??n.control.sampleRate??48e3;(!o.map||o.map.cols!==d||o.map.w!==s||o.map.sr!==u)&&(o.map={cols:d,w:s,sr:u,...As(d,s,o.buf.length,u)},o.disp=new Float32Array(d).fill(-1/0)),o.analyser.getFloatFrequencyData(o.buf);let p=-1/0,f=ms*i,{lo:h,hi:w,tilt:E}=o.map;for(let v=0;v<d;v++){let y=Ms(o.buf,h[v],w[v]);y>p&&(p=y);let g=y+E[v],P=o.disp[v]-f;o.disp[v]=g>P?g:P}p>us&&(o.loud=t);let m=t-o.loud>ps;l.clearRect(0,0,s,c),(!m||o.disp.some(v=>v>Re))&&Cs(l,s,c,o.disp,n.colours??ki(e)),o.idle=m&&!o.disp.some(v=>v>Re),Sa(e,o.idle)}function Cs(e,t,n,o,i){let r=o.length,l=new Array(r),s=new Array(r),c=d=>{let u=o[Math.max(0,Math.min(r-1,d))];return Number.isFinite(u)?u:Re};for(let d=0;d<r;d++){let u=c(d)*.36+(c(d-1)+c(d+1))*.22+(c(d-2)+c(d+2))*.1,p=(Math.max(Re,Math.min(Eo,Number.isFinite(u)?u:Re))-Re)/(Eo-Re);l[d]=d/(r-1)*t,s[d]=n-p*n}e.save(),e.fillStyle=i.spectrum,e.globalAlpha=.13,e.beginPath(),Pt(e,l,s),e.lineTo(t,n),e.lineTo(0,n),e.closePath(),e.fill(),e.globalAlpha=.32,e.strokeStyle=i.spectrum,e.lineWidth=1,e.beginPath(),Pt(e,l,s),e.stroke(),e.restore()}var fe=new WeakMap,Ls=450,Ts=6,Fs=33,sa=24,Ds="http://www.w3.org/2000/svg";function Ns(e,t){let n=1-e/Math.max(1,t);return Math.round(Math.max(0,Math.min(1,n))*100)/100}function zs(e,t){for(let n=0;n<t.length;n++)if(e<t[n])return n;return t.length-1}function qs(e,t,n,o,i){let r=e.slice();if(t===o)return r[o]=i,r;let l=t<o?1:-1;for(let s=t;s!==o+l;s+=l){let c=(s-t)/(o-t);r[s]=Math.round((n+(i-n)*c)*100)/100}return r}function Bs(e,t){let n=e.steps[t],o=(e.shapes??[]).find(r=>r.value===n.shape),i=e.played!==void 0&&t>=e.played?", not playing":"";return`Step ${t+1} of ${e.steps.length}: ${Math.round(n.level*100)}%${o?`, ${o.label}`:""}${i}`}function Pe(e,t){let n=document.createElementNS(Ds,e);for(let[o,i]of Object.entries(t))n.setAttribute(o,String(i));return n}function Ci(e){let t=Pe("svg",{class:"nc-lsteps-ico",viewBox:"0 0 20 10","aria-hidden":"true",focusable:"false"});return t.append(Pe("path",{d:e})),t}function Rs(e,t){let n=document.createElement("div");n.className="nc-lsteps",n.dataset.ncId=e.id,n.dataset.ncLsteps="",n.setAttribute("role","group");let o=document.createElement("div");o.className="nc-lsteps-plot",o.tabIndex=0,o.setAttribute("role","slider"),o.setAttribute("aria-orientation","vertical"),o.setAttribute("aria-valuemin","0"),o.setAttribute("aria-valuemax","100"),o.setAttribute("aria-keyshortcuts","ArrowLeft ArrowRight ArrowUp ArrowDown PageUp PageDown Enter");let i=document.createElement("div");i.className="nc-lsteps-axis",i.setAttribute("aria-hidden","true");let r=document.createElement("div");r.className="nc-lsteps-shapes",r.setAttribute("role","tablist");let l=document.createElement("div");l.className="nc-lsteps-pick",l.setAttribute("role","menu"),l.hidden=!0,n.append(o,i,r,l);let s=document.createElement("i");s.className="nc-token-probe",s.dataset.ncProbe="",n.append(s);let c={control:e,lookup:t,focus:0,drag:null,timer:0,loop:0,last:-2,lastLocked:null,count:-1,shapeKey:"",outside:null};return fe.set(n,c),Is(n,o),Hs(n,l),Li(n,e),n}function be(e){let t=fe.get(e),n=t?.lookup?.(e);return n?.type==="levelSteps"?n:t?.control}function Ps(e){return[...e.querySelectorAll(".nc-lsteps-step")].map(t=>t.getBoundingClientRect().right)}function da(e,t){let n=(e.querySelector(".nc-lsteps-step")??e).getBoundingClientRect(),o=Ps(e);return{i:zs(t.clientX,o),level:Ns(t.clientY-n.top,n.height)}}function Is(e,t){let n=fe.get(e),o=()=>{n.timer&&(clearTimeout(n.timer),n.timer=0)};t.addEventListener("pointerdown",r=>{let l=be(e);if(!l||r.button>0||!l.steps.length)return;r.preventDefault(),It(e),t.setPointerCapture?.(r.pointerId);let s=da(t,r),c=l.steps.map(d=>d.level);n.drag={id:r.pointerId,x:r.clientX,y:r.clientY,start:c,levels:c,i:s.i,level:s.level,moved:!1,long:!1},n.focus=s.i,So(e,s.i,s.level,s.i,s.level,!1),o(),n.timer=setTimeout(()=>{n.timer=0;let d=n.drag;!d||d.moved||(d.long=!0,be(e)?.onLevels(d.start.slice(),!0),ca(e,d.i))},Ls)}),t.addEventListener("pointermove",r=>{let l=n.drag;if(!l||l.id!==r.pointerId||l.long||!l.moved&&Math.hypot(r.clientX-l.x,r.clientY-l.y)<Ts)return;l.moved=!0,o();let s=da(t,r);So(e,l.i,l.level,s.i,s.level,!1),l.i=s.i,l.level=s.level});let i=r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,t.releasePointerCapture?.(r.pointerId),l.long||be(e)?.onLevels(l.levels.slice(),!0),Ca(e,-1))};t.addEventListener("pointerup",i),t.addEventListener("pointercancel",r=>{let l=n.drag;!l||l.id!==r.pointerId||(o(),n.drag=null,l.long||be(e)?.onLevels(l.start.slice(),!0),Ca(e,-1))}),t.addEventListener("contextmenu",r=>{be(e)?.onShape&&(r.preventDefault(),ca(e,da(t,r).i))}),t.addEventListener("keydown",r=>{let l=be(e);if(!l||!l.steps.length)return;let s=l.steps.length,c=Math.min(n.focus,s-1),d=l.steps[c].level,u=p=>{let f=l.steps.map(h=>h.level);f[c]=Math.round(Math.max(0,Math.min(1,p))*100)/100,l.onLevels(f,!0)};switch(r.key){case"ArrowLeft":n.focus=(c-1+s)%s;break;case"ArrowRight":n.focus=(c+1)%s;break;case"ArrowUp":u(d+(r.shiftKey?.01:.05));break;case"ArrowDown":u(d-(r.shiftKey?.01:.05));break;case"PageUp":u(d+.25);break;case"PageDown":u(d-.25);break;case"Home":u(1);break;case"End":u(0);break;case"Enter":case" ":if(!l.onShape)return;ca(e,c);break;default:return}r.preventDefault(),La(e)}),t.addEventListener("focus",()=>La(e)),t.addEventListener("blur",()=>{for(let r of t.querySelectorAll("[data-focus]"))r.removeAttribute("data-focus")})}function So(e,t,n,o,i,r){let l=fe.get(e).drag;l&&(l.levels=qs(l.levels,t,n,o,i),Ca(e,o,l.levels[o]),be(e)?.onLevels(l.levels.slice(),r))}function Ca(e,t,n){for(let o of e.querySelectorAll(".nc-lsteps-step"))Number(o.dataset.i)===t?(o.dataset.dragging="true",o.dataset.level=`${Math.round(n*100)}%`):o.removeAttribute("data-dragging")}function La(e){let t=fe.get(e),n=e.querySelector(".nc-lsteps-plot"),o=be(e);if(!n||!o)return;for(let r of n.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===t.focus?r.dataset.focus="true":r.removeAttribute("data-focus");let i=Math.min(t.focus,o.steps.length-1);n.setAttribute("aria-valuenow",String(Math.round((o.steps[i]?.level??0)*100))),n.setAttribute("aria-valuetext",Bs(o,i))}function Hs(e,t){t.addEventListener("keydown",n=>{if(n.key==="Escape"){n.preventDefault(),It(e,!0);return}let o=[...t.querySelectorAll("button")],i=o.indexOf(n.target);(n.key==="ArrowRight"||n.key==="ArrowDown")&&(n.preventDefault(),o[(i+1)%o.length]?.focus()),(n.key==="ArrowLeft"||n.key==="ArrowUp")&&(n.preventDefault(),o[(i-1+o.length)%o.length]?.focus())}),fe.get(e).outside=n=>{!t.hidden&&!t.contains(n.target)&&It(e)}}function ca(e,t){let n=be(e),o=e.querySelector(".nc-lsteps-pick"),i=e.querySelector(".nc-lsteps-plot");if(!n?.onShape||!o||!i)return;let r=fe.get(e);r.focus=t,o.textContent="";let l=document.createElement("span");l.className="nc-lsteps-pick-head",l.textContent=`Step ${t+1}`,o.append(l);for(let h of n.shapes??[]){let w=document.createElement("button");w.type="button",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",n.steps[t]?.shape===h.value?"true":"false"),h.icon&&w.append(Ci(h.icon)),w.append(document.createTextNode(h.label)),w.addEventListener("click",()=>{be(e)?.onShape?.(t,h.value),It(e,!0)}),o.append(w)}o.setAttribute("aria-label",`Shape of step ${t+1}`),o.hidden=!1,e.ownerDocument.addEventListener("pointerdown",r.outside,!0);let s=i.querySelector(`.nc-lsteps-step[data-i="${t}"]`),c=e.getBoundingClientRect(),d=s?.getBoundingClientRect(),u=o.getBoundingClientRect().width,p=d?d.left+d.width/2-c.left:0,f=Math.max(0,Math.min(c.width-u,p-u/2));o.style.setProperty("--nc-lsteps-pick-x",`${Math.round(f)}px`),o.querySelector('[aria-checked="true"]')?.focus?.()??o.querySelector("button")?.focus?.()}function It(e,t=!1){let n=e.querySelector(".nc-lsteps-pick");!n||n.hidden||(e.ownerDocument.removeEventListener("pointerdown",fe.get(e).outside,!0),n.hidden=!0,n.textContent="",t&&e.querySelector(".nc-lsteps-plot")?.focus?.())}function js(e,t){let n=fe.get(e),o=e.querySelector(".nc-lsteps-plot"),i=e.querySelector(".nc-lsteps-axis");if(n.count!==t){n.count=t,o.textContent="",i.textContent="";for(let r=0;r<t;r++){let l=document.createElement("div");l.className="nc-lsteps-step",l.dataset.i=String(r),r%4===0&&r>0&&(l.dataset.beat="true");let s=Pe("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none","aria-hidden":"true",focusable:"false"});s.append(Pe("rect",{class:"nc-lsteps-level",x:0,y:100,width:100,height:0}),Pe("path",{class:"nc-lsteps-env",d:""}),Pe("path",{class:"nc-lsteps-top",d:""}),Pe("line",{class:"nc-lsteps-floor",x1:0,y1:100,x2:100,y2:100})),l.append(s),o.append(l);let c=document.createElement("span");r%4===0&&(c.textContent=String(r+1)),r%4===0&&r>0&&(c.dataset.beat="true"),i.append(c)}}}function Li(e,t){let n=fe.get(e);if(!n)return;n.control=t;let o=t.steps.length;js(e,o),e.setAttribute("aria-label",t.label??"Steps"),t.help?e.setAttribute("data-nc-help",t.help):e.removeAttribute("data-nc-help"),e.dataset.on=t.on===!1?"false":"true";let i=e.querySelector(".nc-lsteps-plot");i.setAttribute("aria-label",t.label??"Steps");let r=Math.max(.5,Math.min(.75,t.swing??.5)),l=i.querySelectorAll(".nc-lsteps-step"),s=e.querySelectorAll(".nc-lsteps-axis > span");t.steps.forEach((h,w)=>{let E=l[w];if(!E)return;let m=String((w%2?1-r:r)*2);E.style.setProperty("--nc-lsteps-grow",m),s[w]?.style.setProperty("--nc-lsteps-grow",m),t.played!==void 0&&w>=t.played?E.dataset.out="true":E.removeAttribute("data-out"),E.dataset.zero=h.level<=0?"true":"false";let v=Math.max(0,Math.min(1,h.level)),y=E.querySelector(".nc-lsteps-level");y.setAttribute("y",String(100-v*100)),y.setAttribute("height",String(v*100));let g=t.curve?t.curve(w,sa):null,P="M0 100",M="";for(let C=0;C<=sa;C++){let b=g?Math.max(0,Math.min(1,g[C]??v)):v,A=C/sa*100,k=100-b*100;P+=` L${A.toFixed(2)} ${k.toFixed(2)}`,M+=`${C?" L":"M"}${A.toFixed(2)} ${k.toFixed(2)}`}E.querySelector(".nc-lsteps-env").setAttribute("d",`${P} L100 100 Z`),E.querySelector(".nc-lsteps-top").setAttribute("d",M)});let c=e.querySelector(".nc-lsteps-shapes"),d=(t.shapes??[]).map(h=>`${h.value}:${h.label}`).join();if(d!==n.shapeKey){n.shapeKey=d,c.textContent="";for(let h of t.shapes??[]){let w=document.createElement("button");w.type="button",w.className="nc-lsteps-shape",w.setAttribute("role","tab"),w.dataset.shape=String(h.value),h.icon&&w.append(Ci(h.icon)),w.append(document.createTextNode(h.label)),w.addEventListener("click",()=>be(e)?.onShapeAll?.(h.value)),c.append(w)}}c.hidden=!(t.shapes?.length&&t.onShapeAll),c.setAttribute("aria-label",t.shapesLabel??"Shape of every step");let u=t.played??o,p=t.steps[0]?.shape,f=t.steps.slice(0,u).every(h=>h.shape===p);for(let h of c.querySelectorAll(".nc-lsteps-shape")){let w=f&&h.dataset.shape===String(p);h.setAttribute("aria-selected",w?"true":"false"),h.tabIndex=w||!f&&h===c.firstElementChild?0:-1}n.focus>=o&&(n.focus=0),La(e),n.last=-2,Os(e)}function Os(e){let t=fe.get(e),n=e.ownerDocument?.defaultView;if(!t||t.loop||!t.control.playhead||!n?.requestAnimationFrame){t&&!t.control.playhead&&ua(e,null);return}let o=0,i=r=>{if(t.loop=0,!e.isConnected||!t.control.playhead){ua(e,null);return}r-o>=Fs&&(o=r,ua(e,t.control.playhead())),t.loop=n.requestAnimationFrame(i)};t.loop=n.requestAnimationFrame(i)}function ua(e,t){let n=fe.get(e),o=t&&Number.isInteger(t.step)?t.step:-1,i=!!t?.locked;if(!(n.last===o&&n.lastLocked===i)){n.last=o,n.lastLocked=i;for(let r of e.querySelectorAll(".nc-lsteps-step"))Number(r.dataset.i)===o?(r.dataset.playhead="true",r.dataset.locked=i?"true":"false"):(r.removeAttribute("data-playhead"),r.removeAttribute("data-locked"));e.dataset.free=t&&!i?"true":"false"}}var _s=.8912509381337456,Ta=32,Us=250,Vs=1200,Ys=.2,Ti=1.5;function Gs(e){let t=Number(e);if(!(t>0))return 0;let n=(20*Math.log10(t)- -48)/48;return n<=0?0:n>=1?1:n}function Ws(e=globalThis.document){let t=e.createElement("span");t.className="nc-fx-level",t.setAttribute("aria-hidden","true"),t.dataset.ncRows="2";for(let n of["in","out"]){let o=e.createElement("span");o.className="nc-fx-level-bar",o.dataset.ncLevel=n;let i=e.createElement("span");i.className="nc-fx-level-fill",o.append(i),t.append(o)}return t}var Ht=new WeakMap,Co=new WeakMap;function Lo(e,t,n){let o=e.ownerDocument?.defaultView;if(typeof o?.getComputedStyle!="function")return n;let i=String(o.getComputedStyle(e).getPropertyValue(`--nc-ui-${t}`)??"").trim(),r=Number.parseFloat(i);return Number.isFinite(r)?i.endsWith("ms")?r/1e3:r:n}function Xs(e){let t=Co.get(e);if(t)return t;let n=e.defaultView;t={doc:e,recs:new Set,io:null,raf:0,timer:0,last:0,loud:0,idle:!1,frames:0};let o=n?.IntersectionObserver;return o&&(t.io=new o(i=>{for(let r of i){let l=Ht.get(r.target);l&&(l.seen.set(r.target,r.isIntersecting),ht(l))}Xe(t)})),e.addEventListener("visibilitychange",()=>{for(let i of t.recs)ht(i);Xe(t)}),Co.set(e,t),t}var Fi=e=>e.els.some(t=>t.isConnected);function Ks(e){if(!e.loop.io)return Fi(e);for(let t of e.els)if(e.seen.get(t)===!0&&t.isConnected)return!0;return!1}function ht(e){let t=!e.dead&&!!e.source&&Ks(e)&&e.loop.doc.visibilityState!=="hidden";if(t&&!e.open){let n=typeof e.source.open=="function"?e.source.open():!0;e.open=n!==!1,e.open&&(e.loop.loud=ln(e.loop))}else!t&&e.open&&(e.open=!1,e.source?.close?.(),Na(e))}function ln(e){return e.doc.defaultView?.performance?.now()??Date.now()}function Xe(e){let t=!1;for(let n of e.recs)n.open&&(t=!0);if(!t){Di(e);return}e.idle&&e.timer&&(e.doc.defaultView?.clearTimeout(e.timer),e.timer=0,e.idle=!1,e.loud=ln(e)),!e.raf&&!e.timer&&Fa(e,!1)}function Fa(e,t){let n=e.doc.defaultView;if(!n)return;let o=()=>To(e,ln(e));t?e.timer=n.setTimeout(()=>(e.timer=0,o()),Us):typeof n.requestAnimationFrame=="function"?e.raf=n.requestAnimationFrame(i=>(e.raf=0,To(e,i))):e.timer=n.setTimeout(()=>(e.timer=0,o()),Ta)}function Di(e){let t=e.doc.defaultView;e.raf&&t?.cancelAnimationFrame?.(e.raf),e.timer&&t?.clearTimeout(e.timer),e.raf=0,e.timer=0,e.idle=!1,e.last=0}function To(e,t){if(t-e.last<Ta-4&&!e.idle&&e.last){Fa(e,!1);return}let n=e.last?Math.min(.25,(t-e.last)/1e3):Ta/1e3;e.last=t,e.frames++;let o=!1,i=!1;for(let r of e.recs){if(!Fi(r)){(r.placed||e.frames-r.born>90)&&Ni(r);continue}r.placed=!0,r.open&&(i=!0,Qs(r,n,t)&&(e.loud=t),(r.disp[0]>0||r.disp[1]>0)&&(o=!0))}if(!i){Di(e);return}e.idle=t-e.loud>Vs&&!o,Fa(e,e.idle)}function Qs(e,t,n){if(e.fall<0){let f=e.els[0];e.fall=Lo(f,"motion-meter-fall",Ys),e.hold=Lo(f,"motion-meter-hold",Ti)}let o=null;try{o=e.source.read()}catch{o=null}let i=typeof o=="number",r=i?o:Number(o?.in)||0,l=!i&&o!==null&&typeof o=="object"&&typeof o.out=="number",s=l&&Number(o.out)||0,c=l?"2":"1";if(e.rows!==c){e.rows=c;for(let f of e.els)f.dataset.ncRows=c}let d=e.fall>0?Math.exp(-t/e.fall):0,u=[r,s],p=!1;for(let f=0;f<2;f++){let h=Gs(u[f]);h>0&&(p=!0),e.disp[f]=h>=e.disp[f]?h:h+(e.disp[f]-h)*d,e.disp[f]<.001&&(e.disp[f]=0),u[f]>=_s&&(e.clipAt[f]=n);let w=e.clipAt[f]>0&&n-e.clipAt[f]<e.hold*1e3;Da(e,f,e.disp[f],w)}return p}function Da(e,t,n,o){let i=Math.round(n*1e3)/1e3,r=o?"true":"false";if(!(e.shown[t]===i&&e.clipShown[t]===r)){e.shown[t]=i,e.clipShown[t]=r;for(let l of e.els){let s=l.children[t]?.firstElementChild;s&&(s.style.transform=`scaleY(${i})`,s.dataset.clip=r)}}}function Na(e){e.disp[0]=0,e.disp[1]=0,e.clipAt[0]=0,e.clipAt[1]=0,Da(e,0,0,!1),Da(e,1,0,!1)}function Ni(e){e.open&&(e.open=!1,e.source?.close?.()),e.dead=!0,e.loop.recs.delete(e);for(let t of e.els)e.loop.io?.unobserve(t),Ht.get(t)===e&&Ht.delete(t)}function Zs(e,t){let n=(Array.isArray(e)?e:[e]).filter(Boolean),o=n[0]?.ownerDocument??globalThis.document,i=Xs(o),r={els:n,source:t??null,loop:i,open:!1,dead:!1,seen:new Map,born:i.frames,placed:!1,disp:[0,0],shown:[-1,-1],clipShown:["",""],clipAt:[0,0],fall:-1,hold:Ti,rows:""};for(let l of n)Ht.set(l,r),i.io?.observe(l);if(i.recs.add(r),Na(r),!i.io){let l=o.defaultView,s=()=>{ht(r),Xe(i)};typeof l?.requestAnimationFrame=="function"?l.requestAnimationFrame(s):setTimeout(s,0)}return{set(l){let s=l??null;if(!r.dead){if(s===r.source){ht(r),Xe(i);return}r.open&&(r.open=!1,r.source?.close?.(),Na(r)),r.source=s,ht(r),Xe(i)}},destroy(){r.dead||Ni(r),Xe(i)}}}var zi={slop:8,longPressMs:500,pitchPx:16},Js=class{constructor(e,t,n=zi){this.hit=e,this.emit=t,this.config=n,this.phase="idle",this.pointer=-1,this.pad=-1,this.x0=0,this.y0=0,this.t0=0,this.degrees=0,this.lastPad=-1}get state(){return this.phase}down(e,t,n,o){if(this.phase!=="idle")return!1;let i=this.hit(t,n);return i<0?!1:(this.phase="pending",this.pointer=e,this.pad=i,this.x0=t,this.y0=n,this.t0=o,this.degrees=0,!0)}tick(e){this.phase==="pending"&&e-this.t0>=this.config.longPressMs&&(this.phase="long",this.emit({kind:"long",pad:this.pad}))}move(e,t,n,o){if(e!==this.pointer)return;let i=t-this.x0,r=n-this.y0;if(this.phase==="pending"){if(this.tick(o),this.phase!=="pending"||Math.hypot(i,r)<this.config.slop)return;Math.abs(r)>=Math.abs(i)?this.phase="pitch":(this.phase="paint",this.lastPad=this.pad,this.emit({kind:"paint",pad:this.pad,phase:"start"}))}if(this.phase==="pitch"){let l=Math.trunc(-r/this.config.pitchPx);l!==this.degrees&&(this.degrees=l,this.emit({kind:"pitch",pad:this.pad,degrees:l,phase:"move"}))}else if(this.phase==="paint"){let l=this.hit(t,n);l>=0&&l!==this.lastPad&&(this.lastPad=l,this.emit({kind:"paint",pad:l,phase:"enter"}))}}up(e,t,n,o){e===this.pointer&&(this.phase==="pending"&&this.move(e,t,n,o),this.phase==="pending"?this.emit({kind:"tap",pad:this.pad}):this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:this.degrees,phase:"commit"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}cancel(e){e===this.pointer&&(this.phase==="pitch"?this.emit({kind:"pitch",pad:this.pad,degrees:0,phase:"cancel"}):this.phase==="paint"&&this.emit({kind:"paint-end"}),this.reset())}reset(){this.phase="idle",this.pointer=-1,this.pad=-1,this.lastPad=-1,this.degrees=0}};function ed(e,t,n,o=zi){let i=!1,r=0,l=(d,u)=>{let p=e.ownerDocument.elementFromPoint?.(d,u),f=[...e.querySelectorAll(t)],h=p?f.findIndex(m=>m===p||m.contains(p)):-1;if(h>=0)return h;let w=-1,E=Number.POSITIVE_INFINITY;return f.forEach((m,v)=>{if(m.hidden)return;let y=m.getBoundingClientRect();if(u<y.top||u>y.bottom)return;let g=Math.abs(d-(y.left+y.width/2));g<E&&g<=y.width&&(w=v,E=g)}),w},s=new Js(l,d=>{(d.kind==="paint"||d.kind==="long")&&(i=!0),n(d)},o),c=()=>{r&&clearTimeout(r),r=0};return e.addEventListener("pointerdown",d=>{d.button>0||(i=!1,s.down(d.pointerId,d.clientX,d.clientY,d.timeStamp)&&(c(),r=setTimeout(()=>s.tick(performance.now()),o.longPressMs)))}),e.addEventListener("pointermove",d=>{s.state!=="idle"&&(s.move(d.pointerId,d.clientX,d.clientY,d.timeStamp),s.state!=="pending"&&c())}),e.addEventListener("pointerup",d=>{c(),s.up(d.pointerId,d.clientX,d.clientY,d.timeStamp)}),e.addEventListener("pointercancel",d=>{c(),s.cancel(d.pointerId)}),e.addEventListener("click",d=>{i&&(i=!1,d.stopPropagation(),d.preventDefault())},!0),e.addEventListener("contextmenu",d=>d.preventDefault()),s}var qi="netcomposer.groups.v1";function sn(){try{return globalThis.localStorage??null}catch{return null}}function Bi(e=sn(),t=qi){try{let n=JSON.parse(e?.getItem(t)??"{}"),o=new Map;if(n&&typeof n=="object"&&!Array.isArray(n))for(let[i,r]of Object.entries(n))typeof r=="boolean"&&o.set(i,r);return o}catch{return new Map}}function td(e,t,n,o=qi){let i=Bi(e,o);i.set(t,n);try{e?.setItem(o,JSON.stringify(Object.fromEntries(i)))}catch{}}function ad(e,t=sn()){return Bi(t).get(e.id)??e.open===!0}function nd(e,t,n){let o=document.createElement("div");o.className="nc-group",o.dataset.ncId=e.id;let i=document.createElement("button");i.type="button",i.className="nc-group-toggle",i.id=`${e.id}-group-toggle`;let r=document.createElement("span");r.className="nc-group-title";let l=document.createElement("span");l.className="nc-group-summary";let s=document.createElement("span");s.className="nc-group-mark",s.setAttribute("aria-hidden","true"),i.append(r,l,s);let c=document.createElement("div");c.className="nc-group-body",c.id=`${e.id}-group-body`,c.setAttribute("role","group"),c.setAttribute("aria-labelledby",i.id),i.setAttribute("aria-controls",c.id);for(let d of e.controls)c.append(n(d,t));return i.addEventListener("click",()=>{let d=o.dataset.ncOpen!=="true";td(sn(),e.id,d),za(o,d);let u=t(o);u?.type==="group"&&u.onToggle?.(d)}),o.append(i,c),Ri(o,e),za(o,ad(e)),Pi(o,e),o}function za(e,t){e.dataset.ncOpen=t?"true":"false";let n=e.querySelector(":scope > .nc-group-toggle"),o=e.querySelector(":scope > .nc-group-body");n?.setAttribute("aria-expanded",t?"true":"false");let i=n?.querySelector(".nc-group-mark");i&&(i.textContent=t?"−":"+"),o instanceof HTMLElement&&(o.hidden=!t&&e.dataset.ncCollapse!=="phone")}function Ri(e,t){let n=t.collapse==="phone"?"phone":void 0;return e.dataset.ncCollapse===n?!1:(n?e.dataset.ncCollapse=n:delete e.dataset.ncCollapse,!0)}function Pi(e,t){Ri(e,t)&&za(e,e.dataset.ncOpen==="true");let n=e.querySelector(":scope > .nc-group-toggle > .nc-group-title");n&&n.textContent!==t.title&&(n.textContent=t.title);let o=e.querySelector(":scope > .nc-group-toggle > .nc-group-summary"),i=t.summary??"";o&&o.textContent!==i&&(o.textContent=i)}var At="application/x-nc-pad",Fo="http://www.w3.org/2000/svg";function od(e){let t=Math.floor((e?.length??0)/2);if(!t)return"";let n=Math.min(48,t),o=[],i=[];for(let r=0;r<n;r++){let l=Math.floor(r*t/n),s=Math.max(l+1,Math.floor((r+1)*t/n)),c=0,d=0;for(let p=l;p<s;p++)c=Math.min(c,e[2*p]??0),d=Math.max(d,e[2*p+1]??0);let u=n===1?50:r/(n-1)*100;o.push(`${u.toFixed(1)} ${(10-Math.min(1,d)*10).toFixed(2)}`),i.push(`${u.toFixed(1)} ${(10-Math.max(-1,c)*10).toFixed(2)}`)}return`M${o.join("L")}L${i.reverse().join("L")}Z`}function id(e,t){let n=document.createElement("div");n.className="nc-padgrid",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Pads");let o=document.createElement("div");return o.className="nc-padgrid-pads",o.dataset.ncColumns=String(e.columns??2),e.pads.forEach((i,r)=>o.append(rd(n,r,t))),n.append(o),n.addEventListener("keydown",i=>{i.key==="Escape"&&Ft(n)}),Hi(n,e),n}function rd(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-padgrid-pad",o.dataset.ncPad=String(t);let i=document.createElement("span");i.className="nc-padgrid-pad-bar",i.setAttribute("aria-hidden","true");let r=document.createElement("span");r.className="nc-padgrid-pad-name";let l=document.createElement("span");l.className="nc-padgrid-pad-hint";let s=document.createElement("span");s.className="nc-padgrid-pad-badge";let c=document.createElementNS(Fo,"svg");c.setAttribute("class","nc-padgrid-pad-wave"),c.setAttribute("viewBox","0 0 100 20"),c.setAttribute("preserveAspectRatio","none"),c.setAttribute("aria-hidden","true");let d=document.createElementNS(Fo,"path");return c.append(d),o.append(i,r,l,s,c),sd(e,o,t,n),r.addEventListener("dblclick",()=>{let u=n(e);u?.type==="padGrid"&&u.onRename&&o.dataset.empty!=="true"&&Ii(e,o,t,n)}),o.addEventListener("dragstart",u=>{if(o.dataset.empty==="true"||!u.dataTransfer){u.preventDefault();return}u.dataTransfer.setData(At,String(t)),u.dataTransfer.effectAllowed="copyMove",o.dataset.dragging="true"}),o.addEventListener("dragend",()=>delete o.dataset.dragging),o.addEventListener("dragover",u=>{let p=u.dataTransfer?.types??[];!p.includes("Files")&&!p.includes(At)||(u.preventDefault(),u.stopPropagation(),u.dataTransfer&&(u.dataTransfer.dropEffect=p.includes(At)&&!u.altKey?"move":"copy"),o.dataset.drop="true")}),o.addEventListener("dragleave",()=>delete o.dataset.drop),o.addEventListener("drop",u=>{delete o.dataset.drop;let p=n(e);if(p?.type!=="padGrid")return;let f=u.dataTransfer?.getData(At);if(f!==void 0&&f!==""){u.preventDefault(),u.stopPropagation();let w=Number(f);w!==t&&p.onMove?.(w,t,u.altKey);return}let h=u.dataTransfer?.files?.[0];h&&(u.preventDefault(),u.stopPropagation(),p.onFile?.(t,h))}),o}function ld(e,t,n){let o=n(e);o?.type==="padGrid"&&o.onPress(t)}function sd(e,t,n,o){let i=0,r=!1,l=0,s=0,c=()=>{window.clearTimeout(i),i=0};t.addEventListener("pointerdown",d=>{if(d.button!==0)return;r=!1,l=d.clientX,s=d.clientY,c();let u=o(e);u?.type==="padGrid"&&(u.onDown?.(n),!(u.onDown&&d.pointerType==="mouse")&&(i=window.setTimeout(()=>{i=0,r=Do(e,t,n,o)},450)))}),t.addEventListener("pointermove",d=>{i&&Math.hypot(d.clientX-l,d.clientY-s)>8&&c()});for(let d of["pointerup","pointercancel","pointerleave"])t.addEventListener(d,c);t.addEventListener("contextmenu",d=>{d.preventDefault(),c(),r=Do(e,t,n,o)}),t.addEventListener("click",()=>{if(r){r=!1;return}ld(e,n,o)})}function Do(e,t,n,o){let i=o(e);if(i?.type!=="padGrid"||!i.menu)return!1;let r=i.menu(n);if(!r.length)return!1;Ft(e);let l=document.createElement("div");l.className="nc-slot-scrim",l.setAttribute("aria-hidden","true"),l.addEventListener("pointerdown",u=>{u.preventDefault(),u.stopPropagation(),Ft(e)}),l.addEventListener("click",u=>u.stopPropagation());let s=document.createElement("div");s.className="nc-slot-menu nc-padgrid-pad-menu",s.setAttribute("role","menu"),s.setAttribute("aria-label",t.getAttribute("aria-label")??"Pad");for(let u of r){let p=document.createElement("button");p.type="button",p.className="nc-menu-btn",p.setAttribute("role","menuitem"),p.dataset.ncMenuItem=u.id,p.textContent=u.label,p.addEventListener("click",()=>{Ft(e);let f=o(e);f?.type==="padGrid"&&(u.id==="rename"&&f.onRename?Ii(e,t,n,o):f.onMenu?.(n,u.id))}),s.append(p)}e.append(l,s);let c=e.getBoundingClientRect(),d=t.getBoundingClientRect();return s.style.left=`${d.left-c.left}px`,s.style.top=`${d.bottom-c.top}px`,s.querySelector("button")?.focus(),!0}function Ii(e,t,n,o){e.querySelector(":scope > .nc-padgrid-rename")?.remove();let i=o(e);if(i?.type!=="padGrid")return;let r=document.createElement("input");r.type="text",r.className="nc-padgrid-rename",r.maxLength=i.nameMax??24,r.value=i.pads[n]?.label??"",r.setAttribute("aria-label",`Name of pad ${n+1}`);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();r.style.left=`${s.left-l.left}px`,r.style.top=`${s.top-l.top}px`,r.style.width=`${s.width}px`;let c=!1,d=u=>{if(c)return;c=!0;let p=r.value.trim();r.remove(),t.focus();let f=o(e);u&&p&&f?.type==="padGrid"&&f.onRename?.(n,p)};r.addEventListener("keydown",u=>{u.stopPropagation(),u.key==="Enter"?d(!0):u.key==="Escape"&&d(!1)}),r.addEventListener("blur",()=>d(!0));for(let u of["pointerdown","click","dblclick"])r.addEventListener(u,p=>p.stopPropagation());e.append(r),r.focus(),r.select()}function Ft(e){for(let t of e.querySelectorAll(":scope > .nc-slot-scrim, :scope > .nc-padgrid-pad-menu"))t.remove()}function Hi(e,t){let n=e.querySelectorAll(".nc-padgrid-pad");t.pads.forEach((o,i)=>{let r=n[i];if(!(r instanceof HTMLButtonElement))return;let l=r.querySelector(".nc-padgrid-pad-name"),s=r.querySelector(".nc-padgrid-pad-hint"),c=r.querySelector(".nc-padgrid-pad-wave path"),d=r.querySelector(".nc-padgrid-pad-badge");d&&(d.textContent=o.empty?"":o.badge??""),r.draggable=!o.empty,o.empty?(r.dataset.empty="true",l&&(l.textContent=t.emptyLabel??"Load"),s&&(s.textContent=t.emptyHint??"tap or drop"),c?.setAttribute("d","")):(delete r.dataset.empty,l&&(l.textContent=o.label),s&&(s.textContent=o.hint??""),c?.setAttribute("d",od(o.peaks))),!o.empty&&o.hint?r.dataset.hint="true":delete r.dataset.hint,o.lane?r.dataset.ncLane=String(o.lane):delete r.dataset.ncLane;let u=t.selected===i;u?r.dataset.selected="true":delete r.dataset.selected,r.setAttribute("aria-pressed",u?"true":"false"),o.playing?r.dataset.playing="true":delete r.dataset.playing,r.setAttribute("aria-label",o.empty?`Pad ${i+1}, empty: load a sample`:`Pad ${i+1}, ${o.label}${o.hint?`, ${o.hint}`:""}${o.badgeLabel?`, ${o.badgeLabel}`:""}${u?", selected":""}`)})}function se(){let e=document.createElement("i");return e.className="nc-token-probe",e.dataset.ncProbe="",e}function Ut(e,t){let n=document.createElement("div");n.className="nc-field",n.dataset.ncRow="",n.dataset.ncId=e;let o=document.createElement("label");o.className="nc-label",o.htmlFor=e,o.textContent=t;let i=document.createElement("span");return i.className="nc-readout",i.dataset.ncReadout="",n.append(o,i),n}function No(e,t){let n=e.querySelector("[data-nc-probe]");e.textContent=t,n&&e.append(n)}function bt(e){if(!Number.isFinite(e))return"";let t=Math.round(e*100)/100;return String(t)}var dd=450,zo=8;function ke(){let e=document.createElement("span");return e.className="nc-hit",e.setAttribute("aria-hidden","true"),e}function cd(e){let t=Hl(e,"target-min");return t>0?t:44}function ud(e){if(!(e instanceof HTMLElement))return;let t=[...e.querySelectorAll(".nc-hit")],n=cd(e),o=n/2,i=t.map(r=>r.parentElement?.getBoundingClientRect()??null);for(let r=0;r<t.length;r++){let l=t[r],s=i[r];if(!(l instanceof HTMLElement)||!s||s.width===0||s.height===0)continue;if(s.width>=n&&s.height>=n){l.style.display="none";continue}let c=s.left+s.width/2,d=s.top+s.height/2,u=c-o,p=c+o,f=d-o,h=d+o;for(let w=0;w<t.length;w++){if(r===w)continue;let E=i[w];if(!E||E.width===0)continue;let m=E.left+E.width/2,v=E.top+E.height/2;Math.abs(v-d)<o*2&&(m>c?p=Math.min(p,(c+m)/2):m<c&&(u=Math.max(u,(c+m)/2))),Math.abs(m-c)<o*2&&(v>d?h=Math.min(h,(d+v)/2):v<d&&(f=Math.max(f,(d+v)/2)))}u=Math.min(u,s.left),p=Math.max(p,s.right),f=Math.min(f,s.top),h=Math.max(h,s.bottom),l.style.left=`${u-s.left}px`,l.style.top=`${f-s.top}px`,l.style.width=`${Math.max(0,p-u)}px`,l.style.height=`${Math.max(0,h-f)}px`,l.style.transform="none"}}function ji(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><path fill="currentColor" d="M7 0 8.1 5.9 14 7 8.1 8.1 7 14 5.9 8.1 0 7 5.9 5.9Z"/></svg>'}function qo(){return'<svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.4"/><circle cx="4.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="4.5" r="1.1" fill="currentColor"/><circle cx="7" cy="7" r="1.1" fill="currentColor"/><circle cx="4.5" cy="9.5" r="1.1" fill="currentColor"/><circle cx="9.5" cy="9.5" r="1.1" fill="currentColor"/></svg>'}function He(e,t){switch(e.type){case"slider":return pd(e,t);case"select":return md(e,t);case"toggle":return fd(e,t);case"button":return gd(e,t);case"readout":return bd(e);case"label":return yd(e);case"note":return Bo(e);case"knob":return Ed(e,t);case"choice":return Ad(e,t);case"slotRow":return Md(e,t);case"stepGrid":return Td(e,t);case"canvas":return zd(e);case"fx":return _d(e,t);case"eqGraph":return ws(e,t);case"levelSteps":return Rs(e,t);case"group":return nd(e,t,He);case"strip":return qd(e,t);case"stripAdd":return Id(e,t);case"padGrid":return id(e,t);case"moves":return wd(e,t);default:return Bo({id:"unknown",text:""})}}function ve(e,t){if(!(!(e instanceof Element)||e.dataset.ncId!==t.id)){if(t.type==="slider"&&e instanceof HTMLElement){let n=e.querySelector("input"),o=e.querySelector("label");o&&(o.textContent=t.label),n instanceof HTMLInputElement&&(n.disabled=t.disabled===!0,Ui(n,t.modulated===!0),document.activeElement!==n&&(n.value=String(Oi(t))),t.valueText?n.setAttribute("aria-valuetext",t.valueText):n.removeAttribute("aria-valuetext"));let i=e.querySelector("[data-nc-readout]");i&&(i.textContent=t.valueText??bt(t.value))}else if(t.type==="select"){let n=e.querySelector("select");n instanceof HTMLSelectElement&&document.activeElement!==n&&(n.value=t.value)}else if(t.type==="toggle"&&e instanceof HTMLButtonElement)e.setAttribute("aria-pressed",t.pressed?"true":"false");else if(t.type==="button"&&e instanceof HTMLButtonElement)e.dataset.on=t.on?"true":"false",e.setAttribute("aria-pressed",t.on?"true":"false"),No(e,t.label),t.ariaLabel?e.setAttribute("aria-label",t.ariaLabel):e.removeAttribute("aria-label");else if(t.type==="readout"){let n=e.querySelector("[data-nc-readout]");n&&(n.textContent=t.value)}else if(t.type==="label"||t.type==="note")No(e,t.text),t.type==="note"&&e instanceof HTMLElement&&(t.tone?e.dataset.ncTone=t.tone:delete e.dataset.ncTone);else if(t.type==="knob"){e instanceof HTMLElement&&De(e,t.help);let n=e.querySelector(".nc-knob");n instanceof HTMLElement&&$d(n,t);let o=e.querySelector("[data-nc-readout]");o&&(o.textContent=t.valueText??bt(t.value))}else if(t.type==="choice")Vi(e,t);else if(t.type==="slotRow")Gi(e,t);else if(t.type==="stepGrid")Ba(e,t);else if(t.type==="padGrid")Hi(e,t);else if(t.type==="moves")_i(e,t);else if(t.type==="canvas"&&e instanceof HTMLElement){let n=e.querySelector("canvas");n instanceof HTMLCanvasElement&&vi(n,t)}else if(t.type==="eqGraph")yi(e,t);else if(t.type==="levelSteps")Li(e,t);else if(t.type==="strip"){Qi(e,t);for(let n of t.sends??[]){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,{...n,type:"knob",compact:!0})}}else if(t.type==="stripAdd")Xi(e,t);else if(t.type==="group"){Pi(e,t);for(let n of t.controls){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,n)}}else if(t.type==="fx"){rr(e,t);for(let n of[...t.controls,...t.more??[]]){let o=e.querySelector(`[data-nc-id="${Qe(n.id)}"]`);o instanceof Element&&ve(o,n)}}}}function pd(e,t){let n=Ut(e.id,e.label);n.dataset.ncSlider="";let o=document.createElement("input");o.type="range",o.className="nc-range",o.id=e.id;let i=yt(e.taper,e.min,e.max);o.min=String(i?0:e.min),o.max=String(i?1e3:e.max),o.step=String(i?1:e.step),i&&(o.dataset.ncTaper=e.taper),o.value=String(Oi(e)),o.disabled=e.disabled===!0,o.dataset.ncId=e.id;let r=s=>i?Rt(s.taper??e.taper,s.min,s.max,o.value,s.step):Number(o.value);o.addEventListener("input",()=>{let s=t(o);s?.type==="slider"&&s.onChange(r(s))}),o.addEventListener("change",()=>{let s=t(o);s?.type==="slider"&&s.onCommit?.(r(s))}),i&&o.addEventListener("keydown",s=>{let c=t(o);if(c?.type!=="slider"||o.disabled)return;let d=c.taper??e.taper,u=tn(d,c.min,c.max,c.value,s.key,s.shiftKey,c.step);u!==null&&(s.preventDefault(),o.value=String(gt(d,c.min,c.max,u)),c.onChange(u),c.onCommit?.(u))});let l=n.querySelector("[data-nc-readout]");return n.insertBefore(o,l),e.onTap&&n.insertBefore(hd(e,o,t),l),n.append(se()),ve(n,e),n}function Oi(e){return yt(e.taper,e.min,e.max)?gt(e.taper,e.min,e.max,e.value):e.value}function hd(e,t,n){let o=document.createElement("button");o.type="button",o.className="nc-tap",o.dataset.ncTap=e.id,o.textContent="Tap",o.setAttribute("aria-label",`Tap ${e.label.toLowerCase()}`),o.title=`Tap ${e.label.toLowerCase()}: tap the beat, two taps or more`,o.append(ke());let i=r=>{let l=n(t);l?.type==="slider"&&l.onTap?.(r)};return o.addEventListener("pointerdown",r=>{r.button===0&&i(r.timeStamp)}),o.addEventListener("keydown",r=>{r.repeat||r.key!=="Enter"&&r.key!==" "||(r.preventDefault(),i(r.timeStamp))}),o}function md(e,t){let n=Ut(e.id,e.label),o=document.createElement("select");o.className="nc-select",o.id=e.id,o.dataset.ncId=e.id;let i=null;for(let r of e.options){let l=document.createElement("option");l.value=r.value,l.textContent=r.label,r.disabled&&(l.disabled=!0),r.group?i?.getAttribute("label")!==r.group&&(i=document.createElement("optgroup"),i.setAttribute("label",r.group),o.append(i)):i=null,(i??o).append(l)}return o.value=e.value,o.addEventListener("change",()=>{let r=t(o);r?.type==="select"&&r.onChange(o.value)}),n.append(o,se()),n}function fd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-toggle",n.id=e.id,n.dataset.ncId=e.id,n.dataset.ncRow="",e.role&&(n.dataset.ncRole=e.role),n.textContent=e.label,n.addEventListener("click",()=>{let o=t(n);o?.type==="toggle"&&o.onPress()}),n.append(se()),ve(n,e),n}function gd(e,t){let n=document.createElement("button");if(n.type="button",n.className="nc-btn",n.id=e.id,n.dataset.ncId=e.id,n.addEventListener("click",()=>{let r=t(n);r?.type==="button"&&r.onPress()}),n.append(se()),ve(n,e),!e.onSparkle)return n;let o=document.createElement("div");o.className="nc-play-row";let i=document.createElement("button");return i.type="button",i.className="nc-sparkle-btn",i.dataset.ncSparkle=e.id,i.setAttribute("aria-label","Surprise me"),i.title=e.sparkleTitle??"Surprise me",i.innerHTML=ji(),i.addEventListener("click",()=>{let r=n.closest(".nc-module")?.querySelector(".nc-slot-row");r instanceof HTMLElement&&Wi(r);let l=t(n);l?.type==="button"&&l.onSparkle?.()}),o.append(n,i),o}function bd(e){let t=Ut(e.id,e.label);return t.append(se()),ve(t,e),t}var vd=450;function wd(e,t){let n=document.createElement("div");n.className="nc-moves",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","group"),n.setAttribute("aria-label",e.label??"Moves");for(let o of e.groups){let i=document.createElement("div");i.className="nc-moves-row",i.setAttribute("role","group"),i.setAttribute("aria-label",o.label),o.title&&(i.title=o.title);let r=document.createElement("span");r.className="nc-moves-label",r.setAttribute("aria-hidden","true"),r.textContent=o.label;let l=document.createElement("div");l.className="nc-moves-btns";for(let s of o.moves){let c=document.createElement("button");c.type="button",c.className="nc-moves-btn",c.dataset.ncMove=s.id,c.title=s.title??s.text,c.setAttribute("aria-label",`${o.label} ${s.text}`),c.append(xd(s.icon)),c.addEventListener("click",()=>{let d=t(n);d?.type==="moves"&&d.onMove(s.id)}),l.append(c)}i.append(r,l),n.append(i)}return _i(n,e),n}function _i(e,t){for(let n of t.groups)for(let o of n.moves){let i=e.querySelector(`[data-nc-move="${Qe(o.id)}"]`);i instanceof HTMLButtonElement&&(i.disabled=o.disabled===!0)}}function xd(e){let t="http://www.w3.org/2000/svg",n=document.createElementNS(t,"svg");if(n.setAttribute("viewBox","0 0 16 16"),n.setAttribute("aria-hidden","true"),n.setAttribute("class","nc-moves-icon"),e?.stroke){let o=document.createElementNS(t,"path");o.setAttribute("d",e.stroke),o.setAttribute("fill","none"),o.setAttribute("stroke","currentColor"),o.setAttribute("stroke-width","1.5"),o.setAttribute("stroke-linecap","round"),o.setAttribute("stroke-linejoin","round"),n.append(o)}if(e?.fill){let o=document.createElementNS(t,"path");o.setAttribute("d",e.fill),o.setAttribute("fill","currentColor"),n.append(o)}return n}function yd(e){let t=document.createElement("span");return t.className="nc-label",t.dataset.ncId=e.id,t.dataset.ncText="",t.textContent=e.text,t.append(se()),t}function Bo(e){let t=document.createElement("p");return t.className="nc-note",t.dataset.ncId=e.id,t.dataset.ncRow="",e.tone&&(t.dataset.ncTone=e.tone),t.textContent=e.text,t.append(se()),t}function Ro(e){if(typeof e.valueText=="string")return e.valueText;let t=bt(e.value),n=typeof e.unit=="string"?e.unit:"";return n===""?t:n==="%"?`${t}%`:`${t} ${n}`}function Ui(e,t){t?e.dataset.modulated="true":delete e.dataset.modulated}function $d(e,t){let n=Bt(t.taper,t.min,t.max,t.value);Ui(e,t.modulated===!0);let o=Math.round(n*270);if(e.style.setProperty("--knob-turn",String(o)),t.bipolar){let i=typeof t.origin=="number"&&Number.isFinite(t.origin)?Math.round(Bt(t.taper,t.min,t.max,t.origin)*270):135;e.style.setProperty("--knob-from",String(Math.min(o,i))),e.style.setProperty("--knob-to",String(Math.max(o,i)))}e.setAttribute("role","slider"),e.setAttribute("aria-valuemin",String(t.min)),e.setAttribute("aria-valuemax",String(t.max)),e.setAttribute("aria-valuenow",String(t.value)),e.setAttribute("aria-valuetext",Ro(t)),e.setAttribute("aria-label",t.ariaLabel??t.label),e.title=`${t.ariaLabel??t.label}: ${Ro(t)}`}function kd(e,t){if(yt(e.taper,e.min,e.max))return tn(e.taper,e.min,e.max,e.value,t.key,t.shiftKey,e.step);let n=e.max-e.min||1,o=typeof e.step=="number"&&e.step>0?e.step:n/100,i=t.shiftKey?o/10:o;return t.key==="Home"?e.min:t.key==="End"?e.max:t.key==="PageUp"?e.value+o*10:t.key==="PageDown"?e.value-o*10:t.key==="ArrowUp"||t.key==="ArrowRight"?e.value+i:t.key==="ArrowDown"||t.key==="ArrowLeft"?e.value-i:null}function Ed(e,t){let n=Ut(e.id,e.label);e.compact&&(n.dataset.ncCompact=""),e.bipolar&&(n.dataset.ncBipolar="");let o=document.createElement("button");o.type="button",o.className="nc-knob",o.dataset.ncId=e.id;let i=document.createElement("i");i.className="nc-knob-mark",o.append(i);let r=0,l=0;o.addEventListener("pointerdown",d=>{r=d.clientY;let u=t(o);l=u&&"value"in u?Number(u.value):0,o.setPointerCapture?.(d.pointerId),n.dataset.ncDragging="true"});let s=()=>delete n.dataset.ncDragging;o.addEventListener("pointerup",s),o.addEventListener("pointercancel",s),o.addEventListener("lostpointercapture",s),o.addEventListener("pointermove",d=>{if(o.hasPointerCapture&&!o.hasPointerCapture(d.pointerId))return;let u=t(o);if(u?.type!=="knob")return;if(yt(u.taper,u.min,u.max)){let h=Bt(u.taper,u.min,u.max,l)-(d.clientY-r)/120;u.onChange(gi(u.taper,u.min,u.max,h));return}let p=u.max-u.min||1,f=Math.min(u.max,Math.max(u.min,l-(d.clientY-r)*p/120));u.onChange(f)}),o.addEventListener("dblclick",()=>{let d=t(o);d?.type==="knob"&&typeof d.defaultValue=="number"&&d.onChange(d.defaultValue)}),o.addEventListener("keydown",d=>{let u=t(o);if(u?.type!=="knob")return;let p=kd(u,d);p!==null&&(d.preventDefault(),u.onChange(Math.min(u.max,Math.max(u.min,p))))});let c=n.querySelector("[data-nc-readout]");return n.insertBefore(o,c),n.append(se()),ve(n,e),n}function Ad(e,t){let n=document.createElement("div");if(n.className="nc-choice-row",n.dataset.ncId=e.id,n.dataset.ncRow="",n.setAttribute("role","tablist"),n.setAttribute("aria-label",e.label),e.caption){let o=document.createElement("span");o.className="nc-label nc-choice-caption",o.setAttribute("aria-hidden","true"),o.textContent=e.caption,n.dataset.ncCaption="",n.append(o)}for(let o of e.options){let i=document.createElement("button");i.type="button",i.className="nc-choice",i.dataset.ncChoice=o.value,i.setAttribute("role","tab"),i.textContent=o.label,i.addEventListener("click",()=>{let r=t(n);r?.type==="choice"&&r.onChange(o.value)}),i.addEventListener("keydown",r=>{let l=[...n.querySelectorAll("[data-nc-choice]")],s=l.indexOf(i),c=s;if(r.key==="ArrowRight"||r.key==="ArrowDown")c=(s+1)%l.length;else if(r.key==="ArrowLeft"||r.key==="ArrowUp")c=(s-1+l.length)%l.length;else if(r.key==="Home")c=0;else if(r.key==="End")c=l.length-1;else return;let d=l[c];d instanceof HTMLButtonElement&&(r.preventDefault(),d.focus(),d.click())}),n.append(i)}return n.append(se()),Vi(n,e),n}function Vi(e,t){for(let n of e.querySelectorAll("[data-nc-choice]")){if(!(n instanceof HTMLButtonElement))continue;let o=n.dataset.ncChoice===t.value;n.setAttribute("aria-selected",o?"true":"false"),n.tabIndex=o?0:-1}}function Md(e,t){let n=document.createElement("div");n.className="nc-slot-row",n.dataset.ncRow="",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-snap-row",o.setAttribute("role","group"),o.setAttribute("aria-label","Snapshots");for(let u=0;u<e.slots.length;u++){let p=e.slots[u],f=document.createElement("span");f.className="nc-snap-wrap";let h=document.createElement("button");h.type="button",h.className="nc-snap",h.dataset.ncSlot=String(u),h.textContent=p.label,h.title="Recall. Long-press to save or clear. Shift-click saves. Option-click clears.",f.append(h,ke()),Sd(f,h,n,u,t),o.append(f)}let i=e.onSparkle?document.createElement("button"):null;i&&(i.type="button",i.className="nc-sparkle",i.setAttribute("aria-label","Surprise me"),i.innerHTML=ji(),i.append(ke()),i.addEventListener("click",()=>{Wi(n);let u=t(n);u?.type==="slotRow"&&u.onSparkle?.()}));let r=document.createElement("div");r.className="nc-field nc-morph-field",r.dataset.ncSlider="";let l=document.createElement("span");l.className="nc-label",l.textContent="Morph";let s=document.createElement("input");s.type="range",s.className="nc-range nc-morph",s.min="0",s.max="4",s.step="0.01",s.setAttribute("aria-label","Morph time"),s.addEventListener("input",()=>{let u=t(n);u?.type==="slotRow"&&u.onMorph(Number(s.value))});let c=document.createElement("span");c.className="nc-readout nc-morph-readout",c.dataset.ncMorph="",r.append(l,c,s);let d=document.createElement("div");return d.className="nc-slot-line",d.append(o,...i?[i]:[]),n.append(d,r,se()),Yi(n,t),Gi(n,e),n}function Po(e,t,n,o){let i=n(e);if(i?.type!=="slotRow")return;ct(e);let r=o.shiftKey?"store":o.altKey?"clear":"recall";i.onSlot(t,r)}function Sd(e,t,n,o,i){let r=0,l=0,s=0,c=!1,d=!1,u=!1,p=!1,f=()=>{window.clearTimeout(r),r=0},h=v=>{let y=v.clientX-l,g=v.clientY-s;y*y+g*g>zo*zo&&(c=!0,f())},w=()=>{p&&(p=!1,window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",E),window.removeEventListener("pointercancel",m))},E=v=>{let y=r!==0&&!c&&!d;f(),w(),y&&(u=!0,Po(n,o,i,v))},m=()=>{c=!0,f(),w()};e.addEventListener("pointerdown",v=>{v.button===0&&(w(),d=!1,c=!1,u=!1,l=v.clientX,s=v.clientY,f(),r=window.setTimeout(()=>{r=0,!c&&(d=!0,Cd(n,t,o,i))},dd),p=!0,window.addEventListener("pointermove",h),window.addEventListener("pointerup",E),window.addEventListener("pointercancel",m))}),e.addEventListener("contextmenu",v=>v.preventDefault()),e.addEventListener("click",v=>{if(u||d||c){u=!1,d=!1,c=!1;return}Po(n,o,i,v)})}function Yi(e,t){if(e.querySelector(".nc-slot-menu"))return;let n=document.createElement("div");n.className="nc-slot-menu",n.hidden=!0,n.setAttribute("role","menu"),n.setAttribute("aria-label","Slot");let o=Io("Save","store"),i=Io("Clear","clear");n.append(o,i);let r=document.createElement("div");r.className="nc-slot-scrim",r.hidden=!0,r.setAttribute("aria-hidden","true"),r.addEventListener("pointerdown",l=>{l.preventDefault(),l.stopPropagation(),ct(e)}),r.addEventListener("click",l=>l.stopPropagation()),e.append(r,n),n.addEventListener("click",l=>{let s=l.target;if(!(s instanceof HTMLButtonElement))return;let c=t(e);if(c?.type!=="slotRow")return;let d=Number(n.dataset.ncIndex);s.dataset.ncSlotOp==="store"?(c.onSlot(d,"store"),ct(e)):s.dataset.ncSlotOp==="clear"&&(c.onSlot(d,"clear"),ct(e))}),e.addEventListener("keydown",l=>{l.key==="Escape"&&ct(e)})}function Io(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-menu-btn",n.dataset.ncSlotOp=t,n.setAttribute("role","menuitem"),n.textContent=e,n}function Cd(e,t,n,o){Yi(e,o);let i=e.querySelector(".nc-slot-menu");if(!(i instanceof HTMLElement))return;let r=e.querySelector(".nc-slot-scrim");r instanceof HTMLElement&&(r.hidden=!1),i.hidden=!1,i.dataset.ncIndex=String(n);let l=e.getBoundingClientRect(),s=t.getBoundingClientRect();i.style.left=`${s.left-l.left}px`,i.style.top=`${s.bottom-l.top}px`,i.querySelector("button")?.focus()}function ct(e){let t=e.querySelector(".nc-slot-menu"),n=e.querySelector(".nc-slot-scrim");t instanceof HTMLElement&&(t.hidden=!0),n instanceof HTMLElement&&(n.hidden=!0)}function Gi(e,t){for(let i of e.querySelectorAll("[data-nc-slot]")){if(!(i instanceof HTMLButtonElement))continue;let r=Number(i.dataset.ncSlot),l=t.slots[r];if(!l)continue;i.textContent=l.label,l.filled?i.dataset.filled="true":delete i.dataset.filled,l.active?i.dataset.active="true":delete i.dataset.active,l.edited?i.dataset.edited="true":delete i.dataset.edited,l.queued?i.dataset.queued="true":delete i.dataset.queued,l.queued&&l.pulse?i.dataset.pulse="true":delete i.dataset.pulse;let s=[l.filled?"saved":"empty",l.active?"playing":"",l.edited?"edited":"",l.queued?"queued, tap again to switch now":""];i.setAttribute("aria-label",[l.label,...s.filter(Boolean)].join(", "))}let n=e.querySelector(".nc-morph");n instanceof HTMLInputElement&&document.activeElement!==n&&(n.value=String(t.morph));let o=e.querySelector("[data-nc-morph]");o&&(o.textContent=t.morphText)}function Wi(e){let t=e.dataset.ncLastFill||null,n=Ll(t);e.dataset.ncLastFill=n;let o=Tl(n);if(o)for(let[i,r]of Object.entries(o))e.style.setProperty(i,r)}function Ld(e,t){let n=document.createElement("button");n.type="button",n.className="nc-fill",n.dataset.ncFill="",n.textContent="Fill",n.title="Hold for a fill",n.setAttribute("aria-pressed","false");let o=!1,i=r=>{if(o===r)return;o=r,n.setAttribute("aria-pressed",r?"true":"false");let l=t(e);l?.type==="stepGrid"&&l.onFill?.(r)};n.addEventListener("pointerdown",r=>{r.button===0&&(r.preventDefault(),n.setPointerCapture?.(r.pointerId),i(!0))});for(let r of["pointerup","pointercancel","lostpointercapture","blur"])n.addEventListener(r,()=>i(!1));return n.addEventListener("keydown",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),r.repeat||i(!0))}),n.addEventListener("keyup",r=>{r.key!==" "&&r.key!=="Enter"||(r.preventDefault(),i(!1))}),n.addEventListener("contextmenu",r=>r.preventDefault()),n}function Td(e,t){let n=document.createElement("div");n.className="nc-section",n.dataset.ncId=e.id;let o=document.createElement("div");o.className="nc-seg",o.setAttribute("role","radiogroup"),o.setAttribute("aria-label","Step tool");let i=m=>{let v=document.createElement("button");return v.type="button",v.setAttribute("role","radio"),v.textContent=m,o.append(v),v},r=i("Note"),l=i("Accent");l.dataset.ncAccentMode="";let s=m=>{for(let v of[r,l]){let y=v===m;v.setAttribute("aria-checked",y?"true":"false"),v.tabIndex=y?0:-1}};s(r);for(let m of[r,l])m.addEventListener("click",()=>s(m));o.addEventListener("keydown",m=>{if(!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(m.key))return;m.preventDefault();let v=l.getAttribute("aria-checked")==="true"?r:l;s(v),v.focus()});let c=document.createElement("div");if(c.className="nc-step-tools",c.append(o),e.onFill&&c.append(Ld(n,t)),e.onClear){let m=document.createElement("button");m.type="button",m.className="nc-fill nc-clear",m.dataset.ncClear="",m.textContent=e.clearLabel??"Clear",m.title="Clear every step (Undo takes it back)",m.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.onClear?.()}),c.append(m)}n.append(c);for(let m of e.rows){let v=document.createElement("div");v.className="nc-row",v.dataset.ncRow="";let y=document.createElement("button");y.type="button",y.className="nc-name",y.textContent=m.label,y.setAttribute("aria-label",`Select ${m.label}`),m.lane&&(y.dataset.ncLane=String((m.lane-1)%4+1));let g=!1,P=0;y.addEventListener("pointerdown",b=>{g=!1,!(b.pointerType==="mouse"||b.button!==0)&&(P=window.setTimeout(()=>{let A=t(n);A?.type!=="stepGrid"||!A.selectedRows||(g=!0,A.onSelectRow?.(A.rows.findIndex(k=>k.id===m.id),!0))},vd))});for(let b of["pointerup","pointercancel","pointerleave"])y.addEventListener(b,()=>window.clearTimeout(P));y.addEventListener("contextmenu",b=>{g&&b.preventDefault()}),y.addEventListener("click",b=>{let A=t(n);if(A?.type!=="stepGrid")return;if(g){g=!1;return}let k=A.rows.findIndex($=>$.id===m.id),q=!!A.selectedRows&&(b.shiftKey||b.metaKey||b.ctrlKey);A.onSelectRow?.(k,q)}),y.addEventListener("keydown",b=>Fd(n,y,b));let M=[];for(let b of["mute","solo"]){if(!(b==="mute"?e.onMute:e.onSolo))continue;let A=document.createElement("span");A.className="nc-ms-wrap";let k=document.createElement("button");k.type="button",k.className="nc-ms",k.dataset.ncMs=b,k.textContent=b==="mute"?"M":"S",k.setAttribute("aria-label",`${b==="mute"?"Mute":"Solo"} ${m.label}`),A.append(k,ke()),A.addEventListener("click",()=>{let q=t(n);if(q?.type!=="stepGrid")return;let $=q.rows.findIndex(x=>x.id===m.id);(b==="mute"?q.onMute:q.onSolo)?.($)}),M.push(A)}let C=document.createElement("div");C.className="nc-steps";for(let b=0;b<m.steps.length;b++){let A=document.createElement("span");A.className="nc-step-wrap";let k=document.createElement("button");k.type="button",k.className="nc-step",k.dataset.ncStep=`${m.id}:${b}`,k.setAttribute("aria-label",`${m.label} step ${b+1}`),A.append(k,ke()),A.addEventListener("click",q=>{let $=t(n);if($?.type!=="stepGrid")return;let x=$.rows.findIndex(B=>B.id===m.id),R=l.getAttribute("aria-checked")==="true";$.onToggle(x,b,q.shiftKey||R)}),C.append(A)}if(e.onLength&&C.append(Dd(n,C,m,t)),v.append(...M,y,C),e.onDice){let b=document.createElement("button");b.type="button",b.className="nc-sparkle nc-row-dice",b.dataset.ncDice=m.id,b.setAttribute("aria-label",`Re-roll ${m.label}`),b.title=`Re-roll ${m.label}: new steps for this lane (Undo takes it back)`,b.innerHTML=qo(),b.append(ke()),b.addEventListener("click",()=>{let A=t(n);A?.type==="stepGrid"&&A.onDice?.(A.rows.findIndex(k=>k.id===m.id))}),v.append(b)}v.addEventListener("click",b=>{if(b.target!==v)return;let A=t(n);A?.type==="stepGrid"&&A.onSelectRow?.(A.rows.findIndex(k=>k.id===m.id))}),Ho(n,C,".nc-step-wrap",t,l,()=>m.id),n.append(v)}let d=document.createElement("div");d.className="nc-pads-head";let u=(m,v,y)=>{let g=document.createElement("button");return g.type="button",g.className=m,g.textContent=v,y&&g.setAttribute("aria-label",y),g},p=u("nc-pads-step","‹","Previous lane"),f=u("nc-pads-step","›","Next lane"),h=document.createElement(e.onLength?"button":"span");h.className="nc-pads-label",h.setAttribute("aria-live","polite"),e.onLength&&(h.type="button",h.dataset.ncLenToggle="",h.addEventListener("click",()=>{let m=t(n);m?.type==="stepGrid"&&(n.dataset.ncLenMode==="true"?delete n.dataset.ncLenMode:n.dataset.ncLenMode="true",Ba(n,m))}));for(let[m,v]of[[p,-1],[f,1]])m.addEventListener("click",()=>{let y=t(n);if(y?.type!=="stepGrid"||y.rows.length===0)return;let g=y.rows.length;y.onSelectRow?.(((Mt(y)+v)%g+g)%g)});if(d.append(p,h,f),e.onDice){let m=u("nc-pads-step nc-pads-dice","","Re-roll lane");m.dataset.ncPadsDice="",m.innerHTML=qo(),m.addEventListener("click",()=>{let v=t(n);if(v?.type!=="stepGrid")return;let y=Mt(v);y>=0&&v.onDice?.(y)}),d.append(m)}if(e.transport){let m=u("nc-pads-play","Play");m.dataset.ncPadsPlay="",m.addEventListener("click",()=>{let v=t(n);v?.type==="stepGrid"&&v.transport?.onToggle()}),d.append(m)}n.append(d);let w=document.createElement("div");w.className="nc-pads",w.setAttribute("role","group");let E=Math.max(0,...e.rows.map(m=>m.steps.length));for(let m=0;m<E;m++){let v=document.createElement("button");v.type="button",v.className="nc-pad",v.dataset.ncPad=String(m),v.textContent=String(m+1),v.addEventListener("click",y=>{let g=t(n);if(g?.type!=="stepGrid")return;let P=Mt(g);if(P<0)return;if(n.dataset.ncLenMode==="true"){g.onLength?.(P,m+1);return}let M=l.getAttribute("aria-checked")==="true";g.onToggle(P,m,y.shiftKey||M)}),w.append(v)}return Ho(n,w,".nc-pad",t,l,()=>{let m=t(n);return m?.type==="stepGrid"?m.rows[Mt(m)]?.id:void 0}),n.append(w),n.append(se()),Ba(n,e),n}function Mt(e){let t=e.rows.findIndex(n=>n.id===e.selectedRow);return t>=0?t:e.rows.length>0?0:-1}function Ho(e,t,n,o,i,r){let l="on",s=!0,c=-1,d=(u,p)=>{let f=u.rows[c]?.steps[p];!f||p>=u.rows[c].length||(u.onSet?u.onSet(c,p,l,s):!!f[l]!==s&&u.onToggle(c,p,l==="accent"))};ed(t,n,u=>{let p=o(e);if(p?.type==="stepGrid"){if(e.dataset.ncLenMode==="true"&&t.classList.contains("nc-pads")){if(u.kind!=="paint")return;let f=p.rows.findIndex(h=>h.id===r());f>=0&&p.rows[f].length!==u.pad+1&&p.onLength?.(f,u.pad+1);return}if(u.kind==="paint"){if(u.phase==="start"){let f=r();c=p.rows.findIndex(w=>w.id===f);let h=p.rows[c]?.steps[u.pad];if(!h)return;l=i.getAttribute("aria-checked")==="true"?"accent":"on",s=!h[l]}d(p,u.pad)}else if(u.kind==="long"){let f=r(),h=p.rows.findIndex(E=>E.id===f),w=t.querySelectorAll(n)[u.pad];h>=0&&w instanceof HTMLElement&&p.onLongPress?.(h,u.pad,w)}}})}function Fd(e,t,n){if(n.key!=="ArrowDown"&&n.key!=="ArrowUp"&&n.key!=="Home"&&n.key!=="End")return;let o=[...e.querySelectorAll(".nc-name")],i=o.indexOf(t),r=i;n.key==="ArrowDown"?r=i+1:n.key==="ArrowUp"?r=i-1:n.key==="Home"?r=0:r=o.length-1;let l=o[r];!(l instanceof HTMLElement)||l===t||(n.preventDefault(),l.focus(),l.click())}function Dd(e,t,n,o){let i=document.createElement("button");i.type="button",i.className="nc-len-handle",i.dataset.ncLen=n.id,i.setAttribute("role","slider"),i.setAttribute("aria-valuemin","1"),i.setAttribute("aria-valuemax",String(n.steps.length)),i.append(ke());let r=d=>{let u=o(e);if(u?.type!=="stepGrid")return;let p=u.rows.findIndex(w=>w.id===n.id),f=u.rows[p];if(!f)return;let h=Math.max(1,Math.min(f.steps.length,d));h!==f.length&&u.onLength?.(p,h)},l=d=>{let u=[...t.querySelectorAll(".nc-step")],p=1;return u.forEach((f,h)=>{let w=f.getBoundingClientRect();w.width>0&&d>=w.left+w.width/2&&(p=h+1)}),p},s=d=>r(l(d.clientX)),c=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c),delete i.dataset.dragging};return i.addEventListener("pointerdown",d=>{d.button===0&&(d.preventDefault(),i.dataset.dragging="true",window.addEventListener("pointermove",s),window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c))}),i.addEventListener("keydown",d=>{let u=o(e);if(u?.type!=="stepGrid")return;let p=u.rows.find(h=>h.id===n.id);if(!p)return;let f={ArrowLeft:p.length-1,ArrowDown:p.length-1,ArrowRight:p.length+1,ArrowUp:p.length+1,Home:1,End:p.steps.length};d.key in f&&(d.preventDefault(),r(f[d.key]))}),i}var pa=new WeakMap,St=new WeakMap;function Nd(e){return e?(St.has(e)||(St.set(e,wa(e)),li(t=>{St.set(e,t);for(let n of e.querySelectorAll("[data-nc-velocity]"))qa(n,Number(n.getAttribute("data-nc-velocity")))},e)),St.get(e)):"light"}function qa(e,t){let n=typeof t=="number"&&Number.isFinite(t)?t:null,o=n===null?null:Nd(e.ownerDocument),i=n===null?null:`${o} ${n}`;if(!(pa.has(e)&&pa.get(e)===i)){if(pa.set(e,i),n===null){for(let r of Object.keys(bo(1)))e.style.removeProperty(r);e.removeAttribute("data-nc-velocity");return}e.setAttribute("data-nc-velocity",String(n));for(let[r,l]of Object.entries(bo(n,go[o]??go.light)))e.style.setProperty(r,l)}}function jo(e,t){let n=typeof t?.mark=="string"?t.mark.trim().slice(0,2):"";n?e.dataset.ncMark!==n&&(e.dataset.ncMark=n):"ncMark"in e.dataset&&delete e.dataset.ncMark}function Ba(e,t){let n=t.rows.some(u=>u.solo),o=e.querySelector("[data-nc-clear]");o&&o.textContent!==(t.clearLabel??"Clear")&&(o.textContent=t.clearLabel??"Clear");let i=e.querySelector(".nc-pads"),r=t.rows.find(u=>u.id===t.selectedRow)??t.rows[0],l=e.querySelector(".nc-pads-label"),s=e.dataset.ncLenMode==="true"&&!!t.onLength;l instanceof HTMLElement&&r&&(l.textContent=s?`${r.label} · ${r.length}`:r.label,t.onLength&&(l.setAttribute("aria-pressed",s?"true":"false"),l.setAttribute("aria-label",s?`${r.label} length ${r.length} steps: tap or drag the pads to set the end, tap here when done`:`${r.label}, ${r.length} steps: tap to set the length`)));let c=e.querySelector("[data-nc-pads-dice]");c instanceof HTMLElement&&r&&(c.setAttribute("aria-label",`Re-roll ${r.label}`),c.title=`Re-roll ${r.label}: new steps for this lane (Undo takes it back)`);let d=e.querySelector("[data-nc-pads-play]");if(d instanceof HTMLElement){let u=!!t.transport?.playing,p=t.transport?.label??(u?"Stop":"Play");d.textContent!==p&&(d.textContent=p),d.setAttribute("aria-pressed",u?"true":"false");let f=t.transport?.ariaLabel;f?d.setAttribute("aria-label",f):d.removeAttribute("aria-label")}if(i instanceof HTMLElement&&r){i.setAttribute("aria-label",`${r.label} steps`),r.lane&&(i.dataset.ncLane=String((r.lane-1)%4+1)),r.mute||n&&!r.solo?i.dataset.silent="true":delete i.dataset.silent;let u=r.length>0?(t.playhead%r.length+r.length)%r.length:-1;for(let p of i.querySelectorAll("[data-nc-pad]")){let f=Number(p.getAttribute("data-nc-pad")),h=r.steps[f];p instanceof HTMLButtonElement&&(p.hidden=!h||!s&&f>=r.length,s&&f>=r.length?p.dataset.out="true":delete p.dataset.out,s&&f===r.length-1?p.dataset.end="true":delete p.dataset.end,p.setAttribute("aria-label",`${r.label} step ${f+1}${h?.markLabel?`, ${h.markLabel}`:""}`),jo(p,h),p.setAttribute("aria-pressed",h?.on?"true":"false"),h?.accent?p.dataset.accent="true":delete p.dataset.accent,h?.dim?p.dataset.dim="true":delete p.dataset.dim,qa(p,h?.velocity),t.playhead>=0&&f===u?p.dataset.playhead="true":delete p.dataset.playhead)}}for(let u of t.rows){for(let h=0;h<u.steps.length;h++){let w=u.steps[h],E=e.querySelector(`[data-nc-step="${u.id}:${h}"]`);if(!(E instanceof HTMLButtonElement))continue;let m=E.closest(".nc-row");if(m instanceof HTMLElement){t.selectedRow===u.id?m.dataset.selected="true":delete m.dataset.selected;let P=t.selectedRow!==u.id&&(t.selectedRows??[]).includes(u.id);P?m.dataset.picked="true":delete m.dataset.picked;let M=m.querySelector(".nc-name");M instanceof HTMLElement&&(M.setAttribute("aria-pressed",t.selectedRow===u.id||P?"true":"false"),M.textContent!==u.label&&(M.textContent=u.label,M.setAttribute("aria-label",`Select ${u.label}`))),u.mute||n&&!u.solo?m.dataset.silent="true":delete m.dataset.silent;for(let C of m.querySelectorAll("[data-nc-ms]")){let b=C.getAttribute("data-nc-ms")==="mute"?u.mute:u.solo;C.setAttribute("aria-pressed",b?"true":"false")}}E.setAttribute("aria-pressed",w.on?"true":"false");let v=`${u.label} step ${h+1}${w.markLabel?`, ${w.markLabel}`:""}`;E.getAttribute("aria-label")!==v&&E.setAttribute("aria-label",v),jo(E,w),w.accent?E.dataset.accent="true":delete E.dataset.accent,w.dim?E.dataset.dim="true":delete E.dataset.dim,h%4===0?E.dataset.bar="true":delete E.dataset.bar,typeof w.velocity=="number"?(E.dataset.velocity="true",E.style.setProperty("--level",`${Math.round(Math.max(0,Math.min(1,w.velocity))*100)}%`)):(delete E.dataset.velocity,E.style.removeProperty("--level")),qa(E,w.velocity);let y=t.playhead>=0&&u.length>0?(t.playhead%u.length+u.length)%u.length:-1;h===y?E.dataset.playhead="true":delete E.dataset.playhead;let g=!!t.onLength&&t.selectedRow===u.id;E.hidden=h>=u.length&&!g,h>=u.length&&g?E.dataset.out="true":delete E.dataset.out}let p=e.querySelector(`[data-nc-len="${u.id}"]`),f=e.querySelector(`[data-nc-step="${u.id}:${Math.max(0,u.length-1)}"]`)?.closest(".nc-step-wrap");if(p instanceof HTMLElement&&f&&f.nextElementSibling!==p){let h=document.activeElement===p;f.after(p),h&&p.focus()}p instanceof HTMLElement&&(p.setAttribute("aria-valuenow",String(u.length)),p.setAttribute("aria-label",`${u.label} length, ${u.length} steps`),p.title=`${u.label}: drag to set the length (${u.length} steps)`)}}function zd(e){let t=document.createElement("div");t.className="nc-field",t.dataset.ncId=e.id;let n=document.createElement("span");n.className="nc-label",n.textContent=e.label;let o=document.createElement("canvas");return o.className="nc-canvas",o.dataset.ncId=e.id,o.dataset.ncPaint=e.paint,t.append(n,o,se()),t}function qd(e,t){let n=document.createElement("div");n.className="nc-strip",n.dataset.ncId=e.id,n.setAttribute("role","group"),n.setAttribute("aria-label",e.label),e.master&&(n.dataset.ncMaster="");let o=document.createElement("div");o.className="nc-strip-hd";let i=document.createElement("span");i.className="nc-strip-name",i.dataset.ncStripName="";let r=!e.master&&typeof e.onFold=="function",l=null;r&&(n.dataset.ncFoldable="",l=tr(),l.dataset.ncStripHide="",l.addEventListener("click",()=>{let g=t(n);g?.type==="strip"&&(g.onFold?.(g.folded!==!0),document.activeElement!==l&&l.focus())})),o.append(i);let s=null;if(!e.master&&typeof e.onMove=="function"){s=document.createElement("button"),s.type="button",s.className="nc-strip-grip",s.dataset.ncStripGrip="",s.setAttribute("aria-keyshortcuts","Alt+ArrowLeft Alt+ArrowRight");let g=document.createElement("span");g.className="nc-strip-grip-dots",g.setAttribute("aria-hidden","true"),s.append(g),s.addEventListener("keydown",P=>{if(P.key!=="ArrowLeft"&&P.key!=="ArrowRight"||P.ctrlKey||P.metaKey||P.shiftKey)return;let M=t(n);M?.type==="strip"&&(P.preventDefault(),M.onMove?.(P.key==="ArrowLeft"?-1:1))})}if(s&&typeof e.onShade=="function"&&(s.setAttribute("aria-haspopup","dialog"),s.addEventListener("click",()=>Uo(n,s,t))),!e.master&&typeof e.onShade=="function"&&o.addEventListener("contextmenu",g=>{g.pointerType==="touch"||g.pointerType==="pen"||g.target instanceof Element&&g.target.closest("input, .nc-strip-remove")||(g.preventDefault(),Uo(n,o,t,{x:g.clientX,y:g.clientY}))}),e.onRemove){let g=document.createElement("button");g.type="button",g.className="nc-strip-remove",g.dataset.ncStripRemove="",g.textContent="×",g.addEventListener("click",()=>{let P=t(n);P?.type==="strip"&&P.onRemove?.(g)}),o.append(g)}let c=document.createElement("div");if(c.className="nc-strip-hacks",e.onHacks){let g=document.createElement("span");g.className="nc-hacks-wrap";let P=document.createElement("button");P.type="button",P.className="nc-hacks",P.dataset.ncHacks="",g.append(P,ke()),g.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onHacks?.()}),c.append(g)}let d=document.createElement("div");if(d.className="nc-strip-ms",e.onSendsView){let g=document.createElement("span");g.className="nc-hacks-wrap nc-sends-view-wrap";let P=document.createElement("button");P.type="button",P.className="nc-hacks nc-sends-view",P.dataset.ncSendsView="",g.append(P,ke()),g.addEventListener("click",()=>{let M=t(n);M?.type==="strip"&&M.onSendsView?.()}),d.append(g)}for(let g of["mute","solo"]){if(!(g==="mute"?e.onMute:e.onSolo))continue;let P=document.createElement("span");P.className="nc-ms-wrap";let M=document.createElement("button");M.type="button",M.className="nc-ms",M.dataset.ncMs=g,M.textContent=g==="mute"?"M":"S",P.append(M,ke()),P.addEventListener("click",()=>{let C=t(n);C?.type==="strip"&&(g==="mute"?C.onMute:C.onSolo)?.()}),d.append(P)}let u=document.createElement("div");u.className="nc-strip-sends";for(let g of e.sends??[])u.append(He({...g,type:"knob",compact:!0},t));let p=document.createElement("div");p.className="nc-strip-pan",e.pan&&p.append(He(dn(e),t));let f=document.createElement("div");f.className="nc-strip-body";let h=document.createElement("span");h.className="nc-scale",h.setAttribute("aria-hidden","true");for(let g of e.ticks??[]){let P=document.createElement("span");P.className="nc-scale-tick",P.style.setProperty("--tick-pos",String(g.value)),P.textContent=g.label,h.append(P)}let w=Gl({label:`${e.label} level`,value:e.value,step:e.step,valueText:e.valueText,onChange:g=>{let P=t(n);P?.type==="strip"&&P.onChange(g)},onReset:()=>{let g=t(n);g?.type==="strip"&&_o(g)}}),E=Jl({channels:e.channels===2?2:1,label:e.label,onClear:()=>{let g=t(n);g?.type==="strip"&&g.onClipClear?.()}});if(f.append(h,w.el,E.el),r){let g=document.createElement("button");g.type="button",g.className="nc-ui-fx-fold nc-strip-fold",g.dataset.ncStripFold="",g.setAttribute("aria-expanded","false");let P=document.createElement("span");P.className="nc-strip-fold-cap",P.setAttribute("aria-hidden","true");let M=document.createElement("span");M.className="nc-ui-fx-fold-name",M.dataset.ncStripFoldName="";let C=document.createElement("span");C.className="nc-strip-fold-pan",C.setAttribute("aria-hidden","true"),C.hidden=!e.pan,g.append(P,C,M),g.addEventListener("click",()=>{let b=t(n);if(b?.type!=="strip")return;b.onFold?.(!1);let A=n.querySelector("[data-nc-strip-hide]");A instanceof HTMLElement&&A.focus()}),f.prepend(g)}let m=document.createElement("button");m.type="button",m.className="nc-strip-db",m.dataset.ncReadout="";let v=0;m.addEventListener("click",g=>{let P=t(n);P?.type!=="strip"||!P.onTypeIn||(window.clearTimeout(v),g.detail===0?Oo(n,m,t):g.detail===1&&(v=window.setTimeout(()=>Oo(n,m,t),Pd)))}),m.addEventListener("dblclick",()=>{window.clearTimeout(v);let g=t(n);g?.type==="strip"&&_o(g)});let y=document.createElement("div");return y.className="nc-strip-trim",e.trim&&y.append(He(cn(e),t)),l&&n.append(l),s&&n.append(s),n.append(o,y,c,d,u,p,f,m,se()),Qi(n,e),n}function dn(e){let t=e.pan;return{type:"knob",id:t.id,label:t.label??"L R",ariaLabel:t.ariaLabel??`${e.label} pan`,min:-1,max:1,step:t.step??.05,value:t.value,valueText:t.valueText??Rd(t.value),defaultValue:0,compact:!0,bipolar:!0,help:t.help,onChange:n=>t.onChange(n)}}function cn(e){let t=e.trim,n=t.min??-12,o=t.max??24;return{type:"knob",id:t.id,label:t.label??"Trim",ariaLabel:t.ariaLabel??`${e.label} trim`,min:n,max:o,step:t.step??.5,value:t.value,valueText:t.valueText??Bd(t.value),defaultValue:t.defaultValue??0,origin:0,compact:!0,bipolar:!0,help:t.help,onChange:i=>t.onChange(i)}}function Bd(e){let t=Math.round((Number(e)||0)*10)/10;if(t===0)return"0 dB";let n=Number.isInteger(t)?String(Math.abs(t)):Math.abs(t).toFixed(1);return`${t>0?"+":"−"}${n} dB`}function Rd(e){let t=Math.round(Math.min(1,Math.max(-1,e))*100);return t===0?"C":t<0?`L ${-t}`:`R ${t}`}var Pd=250;function Oo(e,t,n){let o=n(e);if(o?.type!=="strip"||!o.onTypeIn||e.querySelector(".nc-strip-db-input"))return;let i=document.createElement("input");i.type="text",i.className="nc-strip-db-input",i.inputMode="decimal",i.spellcheck=!1,i.autocomplete="off",i.value=o.valueText??bt(o.value),i.setAttribute("aria-label",`${o.label} level in dB: type a value, Enter to set, Escape to cancel`),t.hidden=!0,t.after(i),i.focus(),i.select?.();let r=!1,l=s=>{if(r)return;r=!0;let c=i.value;if(i.remove(),t.hidden=!1,s){let d=n(e);d?.type==="strip"&&d.onTypeIn?.(c)}t.focus?.()};i.addEventListener("keydown",s=>{s.key==="Enter"?(s.preventDefault(),l(!0)):s.key==="Escape"&&(s.preventDefault(),l(!1))}),i.addEventListener("blur",()=>l(!1))}function Id(e,t){let n=document.createElement("div");n.className="nc-strip-add",n.dataset.ncId=e.id;let o=document.createElement("span");o.className="nc-strip-add-face",o.setAttribute("aria-hidden","true");let i=document.createElement("span");i.className="nc-strip-add-plus",i.textContent="+";let r=document.createElement("span");r.className="nc-strip-add-label",o.append(i,r);let l=document.createElement("select");return l.className="nc-strip-add-select",l.addEventListener("change",()=>{let s=t(n),c=l.value;Ki(l),s?.type==="stripAdd"&&c&&s.onAdd(c)}),n.append(o,l,se()),Xi(n,e),n}function Xi(e,t){let n=e.querySelector(".nc-strip-add-label");n&&(n.textContent=t.label);let o=e.querySelector("select");if(!(o instanceof HTMLSelectElement))return;o.setAttribute("aria-label",t.ariaLabel??t.label);let i=[{value:"",label:t.ariaLabel??t.label,disabled:!0},...t.options],r=[...o.options].map(s=>`${s.value}|${s.textContent}|${s.disabled}`).join(","),l=i.map(s=>`${s.value}|${s.label}|${s.disabled===!0}`).join(",");r!==l&&(o.replaceChildren(...i.map(s=>{let c=document.createElement("option");return c.value=s.value,c.textContent=s.label,c.disabled=s.disabled===!0,c})),Ki(o))}function Ki(e){let t=e.options[0];t&&(t.selected=!0)}function _o(e){e.onReset?e.onReset():typeof e.defaultValue=="number"&&e.onChange(e.defaultValue)}function Qi(e,t){let n=e.querySelector("[data-nc-strip-name]");n&&n.textContent!==t.label&&(n.textContent=t.label);let o=e.querySelector("[data-nc-strip-remove]");o&&(o.setAttribute("aria-label",`Remove ${t.label}`),o.title=`Remove ${t.label}`),e.setAttribute("aria-label",t.label),e.toggleAttribute("data-nc-sends-hidden",t.sendsHidden===!0);let i=e.querySelector(".nc-fader"),r=i?Wl(i):void 0;r&&(r.configure({step:t.step}),r.set(t.value),r.setText(t.valueText),r.setLabel(`${t.label} level`)),es(e.querySelector(".nc-meter")??void 0)?.setLabel(t.label);let l=e.querySelector(".nc-strip-db");if(l instanceof HTMLElement){let w=t.valueText??bt(t.value);l.textContent!==w&&(l.textContent=w),l.setAttribute("aria-label",`${t.label} level ${w}`);let E=t.resetText?`Double-click: back to ${t.resetText}`:"Double-click to reset";l.title=t.onTypeIn?`Click to type a value. ${E}`:E}for(let w of e.querySelectorAll("[data-nc-ms]")){let E=w.getAttribute("data-nc-ms"),m=E==="mute"?t.mute===!0:t.solo===!0;w.setAttribute("aria-pressed",m?"true":"false"),w.setAttribute("aria-label",`${E==="mute"?"Mute":"Solo"} ${t.label}`)}let s=e.querySelector("[data-nc-hacks]");if(s){let w=t.hacksLabel??"Hacks";s.textContent!==w&&(s.textContent=w),s.setAttribute("aria-pressed",t.hacks===!0?"true":"false"),s.setAttribute("aria-label",`${w}: ${t.label}`),s.toggleAttribute("data-nc-empty",t.hacksEmpty===!0)}let c=e.querySelector("[data-nc-sends-view]");if(c){let w=t.sendsViewLabel??"Sends";c.textContent!==w&&(c.textContent=w),c.setAttribute("aria-pressed",t.sendsView===!0?"true":"false"),c.setAttribute("aria-label",`${w}: ${t.sendsView===!0?"hide":"show"} the send effects`),c.toggleAttribute("data-nc-empty",t.sendsViewEmpty===!0),De(c,t.sendsViewHelp)}let d=e.querySelector("[data-nc-strip-grip]");d instanceof HTMLElement&&(d.setAttribute("aria-label",`Move ${t.label}`),d.title=t.moveHelp??"Drag to move this channel");let u=Zi(t);if(u?e.dataset.ncShade=String(u):delete e.dataset.ncShade,t.silent?e.dataset.silent="true":delete e.dataset.silent,delete e.dataset.ncIdentity,(t.trim||t.trimRow)&&!t.trimHidden?e.dataset.ncTrim="":delete e.dataset.ncTrim,t.trim){let w=e.querySelector(`.nc-strip-trim [data-nc-id="${Qe(t.trim.id)}"]`);w&&ve(w,cn(t))}if(t.pan){e.style.setProperty("--nc-strip-pan",String(t.pan.value));let w=e.querySelector(`.nc-strip-pan [data-nc-id="${Qe(t.pan.id)}"]`);w&&ve(w,dn(t))}let p=!t.master&&typeof t.onFold=="function"&&t.folded===!0;p?e.dataset.ncFolded="true":delete e.dataset.ncFolded;let f=e.querySelector("[data-nc-strip-hide]");f instanceof HTMLElement&&(ar(f,p,t.label),De(f,t.foldHelp));let h=e.querySelector("[data-nc-strip-fold]");if(h instanceof HTMLElement){h.hidden=!p,h.setAttribute("aria-label",`Expand ${t.label}`);let w=h.querySelector("[data-nc-strip-fold-name]");w&&w.textContent!==t.label&&(w.textContent=t.label),De(h,t.foldedHelp??t.foldHelp)}}function Zi(e){let t=e?.shade;return!e?.master&&Number.isInteger(t)&&t>=1&&t<=Ji?t:0}var Ji=8,Ct=null;function Uo(e,t,n,o){Ct?.();let i=n(e);if(i?.type!=="strip")return null;let r=e.ownerDocument,l=r.defaultView??globalThis,s=r.createElement("div");s.className="nc-strip-menu",s.dataset.ncStripMenu="",s.setAttribute("role","dialog"),s.setAttribute("aria-label",`${i.label}: shade and place`);let c=r.createElement("div");c.className="nc-strip-menu-title",c.id=`nc-strip-menu-title-${String(i.id).replace(/[^\w-]/g,"")}`,c.textContent="Shade";let d=r.createElement("div");d.className="nc-strip-menu-shades",d.setAttribute("role","radiogroup"),d.setAttribute("aria-labelledby",c.id);let u=Zi(i),p=e.querySelector("[data-nc-strip-grip]")??t,f=(v=!1)=>{if(Ct!==f)return;Ct=null;let y=s.contains(r.activeElement);s.remove(),r.removeEventListener("keydown",w,!0),r.removeEventListener("pointerdown",E,!0),l.removeEventListener("resize",m),(v||y)&&p?.isConnected&&p.focus?.({preventScroll:!0})},h=[0,...Array.from({length:Ji},(v,y)=>y+1)].map(v=>{let y=r.createElement("button");return y.type="button",y.setAttribute("role","radio"),y.setAttribute("aria-checked",v===u?"true":"false"),y.setAttribute("tabindex",v===u?"0":"-1"),y.dataset.ncShadeChoice=String(v),v===0?(y.textContent="Auto",y.setAttribute("aria-label","Auto: alternate light and dark"),y.title="Auto: alternate light and dark"):(y.textContent=String(v),y.setAttribute("aria-label",`Shade ${v}`),y.style.setProperty("--nc-swatch",`var(--nc-ui-strip-shade-${v})`)),y.addEventListener("click",()=>{let g=n(e);f(!0),g?.type==="strip"&&g.onShade?.(v===0?null:v)}),y});if(d.append(...h),d.addEventListener("keydown",v=>{let y=h.indexOf(r.activeElement);if(y<0)return;let g=-1;v.key==="ArrowRight"||v.key==="ArrowDown"?g=(y+1)%h.length:v.key==="ArrowLeft"||v.key==="ArrowUp"?g=(y-1+h.length)%h.length:v.key==="Home"?g=0:v.key==="End"&&(g=h.length-1),!(g<0)&&(v.preventDefault(),h[y].setAttribute("tabindex","-1"),h[g].setAttribute("tabindex","0"),h[g].focus())}),s.append(c,d),typeof i.onMove=="function"){let v=[...e.parentElement?.children??[]].filter(g=>g.classList?.contains("nc-strip")&&!g.hasAttribute("data-nc-master")),y=v.indexOf(e);for(let[g,P,M]of[[-1,"Move left","Alt ←"],[1,"Move right","Alt →"]]){let C=r.createElement("button");C.type="button",C.className="nc-strip-menu-item",C.dataset.ncStripMove=g<0?"left":"right";let b=r.createElement("span");b.textContent=P;let A=r.createElement("kbd");A.textContent=M,A.setAttribute("aria-hidden","true"),C.append(b,A),C.disabled=g<0?y<=0:y<0||y>=v.length-1,C.addEventListener("click",()=>{let k=n(e);f(!0),k?.type==="strip"&&k.onMove?.(g)}),s.append(C)}}r.body.append(s),(()=>{let v=t.getBoundingClientRect?.()??{bottom:0,right:0},y=s.offsetWidth,g=s.offsetHeight,P=l.innerWidth||r.documentElement.clientWidth||y,M=l.innerHeight||r.documentElement.clientHeight||g,C=o?o.x:v.right-y,b=o?o.y:v.bottom+4;C=Math.max(4,Math.min(C,P-y-4)),b+g>M-4&&(b=Math.max(4,(o?o.y:v.top)-g-4)),s.style.left=`${Math.round(C)}px`,s.style.top=`${Math.round(b)}px`})();let w=v=>{if(v.key==="Escape")v.preventDefault(),v.stopPropagation(),f(!0);else if(v.key==="Tab"&&s.contains(r.activeElement)){let y=[...s.querySelectorAll("button:not([disabled])")].filter(P=>P.getAttribute("tabindex")!=="-1"),g=(y.indexOf(r.activeElement)+(v.shiftKey?-1:1)+y.length)%y.length;v.preventDefault(),y[g]?.focus()}},E=v=>{s.contains(v.target)||f(!1)},m=()=>f(!1);return r.addEventListener("keydown",w,!0),r.addEventListener("pointerdown",E,!0),l.addEventListener("resize",m),Ct=f,(h.find(v=>v.getAttribute("tabindex")==="0")??h[0]).focus({preventScroll:!0}),{el:s,close:()=>f(!1)}}var Ra=typeof ResizeObserver=="function"?new ResizeObserver(Hd):null;function Hd(e){for(let t of e){if(!t.target.isConnected){Ra.unobserve(t.target);continue}let n=t.target.parentElement;n?.classList.contains("nc-ui-fx")&&jd(n)}}function jd(e){let t=e.querySelector(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name)"),n=e.querySelector(":scope > .nc-eq"),o=t instanceof HTMLElement?t.offsetHeight:0,i=n instanceof HTMLElement?n.offsetHeight:0,r=Number.parseFloat(getComputedStyle(e).rowGap)||0;e.style.setProperty("--nc-fx-hd-h",`${o}px`),e.style.setProperty("--nc-fx-pin-h",`${o+i+r}px`)}function Od(e){if(Ra)for(let t of e.querySelectorAll(":scope > :is(.nc-ui-fx-hd, .nc-ui-fx-name, .nc-eq)"))Ra.observe(t)}function _d(e,t){let n=document.createElement("div");n.className="nc-ui-fx",n.dataset.ncId=e.id,n.dataset.ncDepth=String(e.depth);let o=document.createElement("h3");o.className="nc-ui-fx-name",o.id=`${e.id}-name`,o.textContent=e.title;let i=typeof e.onFold=="function",r=!!e.meter,l=typeof e.onRemove=="function";if(e.on===void 0&&!i&&!jt(e)&&!r&&!l)n.append(o);else{let s=document.createElement("div");if(s.className="nc-ui-fx-hd",s.append(o),r&&s.append(or(n,"head")),e.on!==void 0){let c=Ja({checked:e.on,labelledBy:o.id,onChange:d=>{let u=t(c.el);u?.type==="fx"&&u.onToggle?.(d)}});c.el.dataset.ncFxSwitch="",s.append(c.el)}i&&s.append(Vd(n,t)),jt(e)&&s.append(Xd(n,t)),l&&s.append(Kd(t)),n.append(s)}i&&n.prepend(Yd(n,t)),r&&ir(n,e);for(let s of e.controls)n.append(He(s,t));if(e.more?.length){let s=document.createElement("details");s.className="nc-ui-more";let c=document.createElement("summary");c.textContent=e.moreLabel??"More",s.append(c);for(let d of e.more)s.append(He(d,t));n.append(s)}return n.append(se()),rr(n,e),Od(n),n}var Ud=e=>typeof e.getClientRects=="function"?e.getClientRects().length>0:!e.hidden;function er(e){let t=e.querySelector(":scope > [data-nc-fx-fold]"),n=e.querySelector("[data-nc-fx-hide]"),o=e.dataset.ncFolded==="true"&&t&&Ud(t)?t:n;o instanceof HTMLElement&&document.activeElement!==o&&o.focus()}function Vd(e,t){let n=tr();return n.dataset.ncFxHide="",n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(o.onFold?.(o.folded!==!0),er(e))}),n}function tr(){let e=document.createElement("button");e.type="button",e.className="nc-fold-toggle";let t=document.createElement("span");return t.className="nc-fold-tri",t.setAttribute("aria-hidden","true"),e.append(t),e}function ar(e,t,n){e.setAttribute("aria-expanded",t?"false":"true"),e.setAttribute("aria-label",`${t?"Expand":"Minimize"} ${n}`),e.title=t?"Expand":"Minimize"}function Yd(e,t){let n=document.createElement("button");n.type="button",n.className="nc-ui-fx-fold",n.dataset.ncFxFold="",n.setAttribute("aria-expanded","false");let o=document.createElement("span");o.className="nc-ui-fx-fold-state",o.dataset.ncFxFoldState="";let i=document.createElement("span");i.className="nc-ui-fx-fold-name",i.dataset.ncFxFoldName="";let r=document.createElement("span");return r.className="nc-fold-tri",r.setAttribute("aria-hidden","true"),n.append(r,o,i),e.querySelector(':scope > .nc-ui-fx-hd > [data-nc-fx-level="head"]')&&n.append(or(e,"fold")),n.addEventListener("click",()=>{let l=t(n);if(l?.type==="fx"){if(l.folded!==!0){let s=e.parentElement?.querySelector(':scope > .nc-ui-fx[data-nc-max="row"]')?.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]");if(s instanceof HTMLElement){s.click();return}}l.onFold?.(!1),er(e)}}),n}var tt=new Set;function Dt(e,t){let n=e.defaultView;typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(t):setTimeout(t,16)}var jt=e=>e.maximize===!0||e.maximize!==!1&&e.controls.some(t=>t.type==="eqGraph"||t.type==="levelSteps"),Gd="(max-width: 768px)";function Wd(){let e=document.createElement("span");e.className="nc-fx-max-icon",e.setAttribute("aria-hidden","true");for(let t=0;t<4;t++)e.append(document.createElement("i"));return e}function Xd(e,t){let n=document.createElement("button");return n.type="button",n.className="nc-fx-max",n.dataset.ncFxMax="",n.dataset.ncMaxToggle="",n.append(Wd()),n.addEventListener("click",()=>{let o=t(n);o?.type==="fx"&&(nr(e,o,!tt.has(o.id)),n.focus())}),n}function Kd(e){let t=document.createElement("button");return t.type="button",t.className="nc-fx-remove",t.dataset.ncFxRemove="",t.textContent="×",t.addEventListener("click",()=>{let n=e(t);n?.type==="fx"&&n.onRemove?.(t)}),t}function nr(e,t,n){n?tt.add(t.id):tt.delete(t.id),un(e,t)}function Qd(e,t){t?.type==="fx"&&tt.has(t.id)&&nr(e,t,!1)}function Zd(e){return e.ownerDocument.defaultView?.matchMedia?.(Gd).matches?"tall":e.closest('[data-nc-layout="console"] [data-nc-area="fx"]')?"row":"over"}function un(e,t){let n=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-max]"),o=jt(t)&&tt.has(t.id)&&!(typeof t.onFold=="function"&&t.folded===!0);if(n instanceof HTMLElement&&(n.hidden=!jt(t)||typeof t.onFold=="function"&&t.folded===!0,e.hasAttribute("data-nc-maxable")===n.hidden&&(e.toggleAttribute("data-nc-maxable",!n.hidden),Dt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&et(l)})),n.setAttribute("aria-pressed",o?"true":"false"),n.setAttribute("aria-label",`${o?"Restore":"Maximize"} ${t.title}`),n.title=o?"Restore (Esc)":"Maximize",De(n,t.maxHelp)),!o){e.dataset.ncMax&&Vo(e);return}if(!e.isConnected){let l=()=>e.isConnected&&tt.has(t.id)&&un(e,t);queueMicrotask(()=>{e.isConnected?l():Dt(e.ownerDocument,l)});return}let i=Zd(e),r=[...e.children].filter(l=>l.matches?.(".nc-field, [data-nc-slider]")).length;r>0&&e.style.setProperty("--nc-fx-dials",String(r)),e.dataset.ncMax!==i&&(e.dataset.ncMax&&Vo(e),e.dataset.ncMax=i,i==="over"&&Jd(e,t)),ec(e.ownerDocument),i==="over"&&pn(e),Dt(e.ownerDocument,()=>{for(let l of e.querySelectorAll(".nc-eq"))l instanceof HTMLElement&&et(l)})}function Vo(e){let t=e.dataset.ncMax;delete e.dataset.ncMax,e.style.removeProperty("--nc-fx-dials"),t==="over"&&(e.previousElementSibling?.matches(".nc-fx-ghost")&&e.previousElementSibling.remove(),e.querySelector(":scope > .nc-ui-fx-hd > .nc-fx-close")?.remove(),e.style.removeProperty("left"),e.style.removeProperty("top"),e.style.removeProperty("width"),e.removeAttribute("role"),e.removeAttribute("aria-label")),Dt(e.ownerDocument,()=>{for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&et(n)})}function Jd(e,t){let n=document.createElement("div");n.className="nc-fx-ghost",n.setAttribute("aria-hidden","true"),n.style.height=`${e.offsetHeight}px`,e.before(n),e.setAttribute("role","region"),e.setAttribute("aria-label",`${t.title}, maximized`);let o=document.createElement("button");o.type="button",o.className="nc-fx-close",o.textContent="×",o.setAttribute("aria-label",`Close ${t.title}`),o.title="Close (Esc)",o.addEventListener("click",()=>{let i=e.querySelector("[data-nc-fx-max]");i instanceof HTMLElement&&i.click()}),e.querySelector(":scope > .nc-ui-fx-hd")?.append(o)}function pn(e){let t=e.previousElementSibling,n=e.closest(".nc-module");if(!(t instanceof HTMLElement)||!t.matches(".nc-fx-ghost")||!(n instanceof HTMLElement))return;let o=n.parentElement instanceof HTMLElement?n.parentElement:n,i=e.ownerDocument.defaultView,r=Number.parseFloat(i?.getComputedStyle(o).columnGap??"")||0,l=vs(t.getBoundingClientRect(),n.getBoundingClientRect(),o.getBoundingClientRect(),r,i?.innerWidth??Number.POSITIVE_INFINITY);e.style.left=`${l.left}px`,e.style.top=`${l.top}px`,e.style.width=`${l.width}px`}var Yo=new WeakSet;function ec(e){Yo.has(e)||(Yo.add(e),e.addEventListener("keydown",t=>{if(t.key!=="Escape"||t.defaultPrevented)return;let n=[...e.querySelectorAll(".nc-ui-fx[data-nc-max]")],o=(n.find(i=>i.contains(e.activeElement))??n[n.length-1])?.querySelector("[data-nc-fx-max]");o instanceof HTMLElement&&(t.preventDefault(),o.click())}),e.defaultView?.addEventListener("resize",()=>{for(let t of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))t instanceof HTMLElement&&pn(t)}))}var Pa=new WeakMap;function or(e,t){let n=Ws(e.ownerDocument);return n.dataset.ncFxLevel=t,n}function ir(e,t){let n=[...e.querySelectorAll("[data-nc-fx-level]")];if(!n.length)return;for(let i of n)De(i,t.meterHelp);let o=Pa.get(e);o?o.set(t.meter):Pa.set(e,Zs(n,t.meter))}function rr(e,t){(t.meter||Pa.has(e))&&ir(e,t);let n=e.querySelector(".nc-ui-fx-name");n&&(n.textContent=t.title);let o=e.querySelector("[data-nc-fx-switch]");o&&o.setAttribute("aria-checked",t.on?"true":"false"),t.on===!1?e.dataset.ncDim="true":delete e.dataset.ncDim;let i=typeof t.onFold=="function"&&t.folded===!0;i?e.dataset.ncFolded="true":delete e.dataset.ncFolded,t.foldSlim===!0?e.dataset.ncFoldSlim="":delete e.dataset.ncFoldSlim;let r=e.querySelector("[data-nc-fx-hide]");r instanceof HTMLElement&&(ar(r,i,t.title),De(r,t.foldHelp)),un(e,t);let l=e.querySelector(":scope > .nc-ui-fx-hd > [data-nc-fx-remove]");if(l instanceof HTMLElement){let c=t.removeLabel??`Remove ${t.title}`;l.hidden=i,l.setAttribute("aria-label",c),l.title=c}let s=e.querySelector(":scope > [data-nc-fx-fold]");if(s instanceof HTMLElement){let c=t.on===void 0?"":t.on?"On":"Off";s.hidden=!i,s.setAttribute("aria-label",`Expand ${t.title}${c?`, ${c.toLowerCase()}`:""}`),s.dataset.on=t.on===!0?"true":"false";let d=s.querySelector("[data-nc-fx-fold-state]");d&&(d.textContent=c,d.hidden=c==="");let u=s.querySelector("[data-nc-fx-fold-name]");u&&(u.textContent=t.title),De(s,t.foldHelp)}}function De(e,t){t?e.setAttribute("data-nc-help",t):e.removeAttribute("data-nc-help")}function Qe(e){return e.replace(/["\\]/g,"\\$&")}function tc(e,t){for(let n of e.querySelectorAll("canvas")){if(!(n instanceof HTMLCanvasElement))continue;let o=t.find(i=>i.type==="canvas"&&i.id===n.dataset.ncId);o?.type==="canvas"&&vi(n,o)}for(let n of e.querySelectorAll(".nc-eq"))n instanceof HTMLElement&&et(n);for(let n of e.querySelectorAll('.nc-ui-fx[data-nc-max="over"]'))n instanceof HTMLElement&&pn(n);ud(e)}var ac=1e3,nc=e=>e===!0?"log":typeof e=="string"?e:"linear";function oc(e,t={}){let n=t.doc??globalThis.document;if(e.log===!0&&!(e.min>0&&e.max>e.min))throw new RangeError(`log slider ${e.id} needs 0 < min < max`);let o=e.taper??nc(e.log),i=yt(o,e.min,e.max),r=n.createElement("div");r.className="nc-field",r.dataset.ncRow="",r.dataset.ncSlider="",r.dataset.ncId=e.id;let l=n.createElement("label");l.className="nc-label",l.setAttribute("for",e.id),l.textContent=e.label;let s=n.createElement("input");s.type="range",s.className="nc-range",s.id=e.id,s.dataset.ncId=e.id,s.min=String(i?0:e.min),s.max=String(i?ac:e.max),s.step=i?"1":String(e.step??"any");let c=n.createElement("span");c.className="nc-readout",c.dataset.ncReadout="";let d=n.createElement("i");d.className="nc-token-probe",d.dataset.ncProbe="",r.append(l,s,c,d);let u=e.value,p=()=>{let h=e.format(u);c.textContent=h,s.setAttribute("aria-valuetext",h)},f=h=>{u=h,n.activeElement!==s&&(s.value=String(i?gt(o,e.min,e.max,u):u)),p()};return s.addEventListener("input",()=>{u=i?Rt(o,e.min,e.max,s.value,e.step):Number(s.value),p(),e.onInput(u)}),i&&s.addEventListener("keydown",h=>{let w=tn(o,e.min,e.max,u,h.key,h.shiftKey,e.step);w===null||s.disabled||(h.preventDefault(),s.value=String(gt(o,e.min,e.max,w)),u=w,p(),e.onInput(u))}),s.disabled=e.disabled===!0,f(e.value),{el:r,set:f,setDisabled(h){s.disabled=h===!0}}}var vt="data-nc-help";function ic(e,t,n,o=0,i=6,r=8){let l=e.top-i-t.height,s=l>=o+r?"above":"below",c=s==="above"?l:e.bottom+i,d=Math.max(r,Math.min(e.left,n-r-t.width));return{top:Math.round(c),left:Math.round(d),side:s}}var ha=new WeakMap;function rc(e){let t=parseFloat(e.defaultView?.getComputedStyle(e.documentElement).getPropertyValue("--nc-host-top")??"");return Number.isFinite(t)?t:0}function lc({document:e=globalThis.document,delay:t=1e3}={}){if(!e)return{uninstall(){},hide(){}};let n=ha.get(e);if(n)return n;let o=e.defaultView,i=null,r=null,l,s=!1,c,d=null,u=!1,p=0,f=()=>{clearTimeout(l),u&&!s&&(p=Date.now()+1500),u=!1,i&&(i.hidden=!0,delete i.dataset.pinned)},h=()=>{f(),clearTimeout(c),r=null,d=null,s=!1},w=(b,A)=>{clearTimeout(l),d=A;let k=Date.now()<p?Math.min(t,300):t;l=setTimeout(()=>{r===b&&b.isConnected&&!s&&v(b)&&(u=!0)},k)},E=b=>({x:Number(b.clientX)||0,y:Number(b.clientY)||0}),m=(b,A,k)=>!b||Math.hypot(b.x-A.x,b.y-A.y)>k,v=(b,A)=>{let k=A??b.getAttribute(vt);if(!k)return!1;i||(i=e.createElement("div"),i.className="nc-ui-help",i.setAttribute("role","tooltip"),i.dataset.testid="nc-help",i.style.position="fixed",i.style.pointerEvents="none",i.style.zIndex="6",e.body.appendChild(i)),i.textContent=k,i.hidden=!1,i.style.visibility="hidden",i.style.top="0px",i.style.left="0px";let q=b.getBoundingClientRect(),$=ic(q,{width:i.offsetWidth,height:i.offsetHeight},o.innerWidth,rc(e));return i.style.top=`${$.top}px`,i.style.left=`${$.left}px`,i.dataset.side=$.side,i.style.visibility="",!0},y=b=>{if(s||b.pointerType==="touch")return;let A=b.target&&b.target.closest?b.target.closest(`[${vt}]`):null;A!==r&&(h(),!(!A||b.buttons)&&(r=A,w(A,E(b))))},g=b=>{if(s||b.pointerType==="touch"||!r)return;if(b.buttons){f(),d=null;return}let A=E(b);u?m(d,A,8)&&(f(),w(r,A)):m(d,A,4)&&w(r,A)},P=b=>{!s&&!b.relatedTarget&&h()},M=b=>{(s||b.key==="Escape")&&h()};e.addEventListener("pointerover",y),e.addEventListener("pointermove",g,{passive:!0}),e.addEventListener("pointerout",P),e.addEventListener("pointerdown",h,!0),e.addEventListener("keydown",M),o.addEventListener("scroll",h,!0),o.addEventListener("blur",h);let C={hide:h,pin(b,A,{ms:k=0}={}){return h(),!b||!b.isConnected||!v(b,A)?!1:(s=!0,i.dataset.pinned="",k>0&&(c=setTimeout(h,k)),!0)},uninstall(){h(),e.removeEventListener("pointerover",y),e.removeEventListener("pointermove",g),e.removeEventListener("pointerout",P),e.removeEventListener("pointerdown",h,!0),e.removeEventListener("keydown",M),o.removeEventListener("scroll",h,!0),o.removeEventListener("blur",h),i?.remove(),i=null,ha.delete(e)}};return ha.set(e,C),C}var sc="(max-width: 768px)",dc='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M2 3.25h12v1.5H2zM2 7.25h12v1.5H2zM2 11.25h12v1.5H2z"/></svg>',cc='button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',uc=0;function pc({panel:e,button:t,label:n="Menu",media:o=sc}){let i=e.ownerDocument,r=i.defaultView??globalThis;e.classList.add("nc-page-menu"),e.id||(e.id=`nc-page-menu-${++uc}`);let l=t??i.createElement("button");t||(l.type="button",l.innerHTML=dc),l.classList.add("nc-page-menu-btn"),l.setAttribute("aria-label",n),l.setAttribute("aria-expanded","false"),l.setAttribute("aria-controls",e.id);let s=()=>e.hasAttribute("data-nc-open");function c(){s()||(e.setAttribute("data-nc-open",""),l.setAttribute("aria-expanded","true"),i.addEventListener("keydown",u,!0),i.addEventListener("pointerdown",p,!0),[...e.querySelectorAll(cc)].find(m=>!m.hidden&&m.getClientRects?.().length!==0)?.focus?.({preventScroll:!0}))}function d({focus:m}={}){if(!s())return;let v=e.contains(i.activeElement);e.removeAttribute("data-nc-open"),l.setAttribute("aria-expanded","false"),i.removeEventListener("keydown",u,!0),i.removeEventListener("pointerdown",p,!0),(m??v)&&l.focus?.({preventScroll:!0})}function u(m){m.key==="Escape"&&(m.preventDefault(),m.stopPropagation(),d({focus:!0}))}function p(m){let v=m.target;v instanceof r.Node&&(e.contains(v)||l.contains(v))||d({focus:!1})}let f=()=>s()?d({focus:!0}):c(),h=m=>{let v=m.target,y=v instanceof r.Element?v.closest("button"):null;!y||!e.contains(y)||y.closest("[data-nc-menu-stay]")||d({focus:!0})};l.addEventListener("click",f),e.addEventListener("click",h);let w=r.matchMedia?.(o),E=()=>{w?.matches||d({focus:!1})};return w?.addEventListener?.("change",E),{button:l,panel:e,open:c,close:d,isOpen:s,destroy(){d({focus:!1}),l.removeEventListener("click",f),e.removeEventListener("click",h),w?.removeEventListener?.("change",E)}}}var Vt="netcomposer.rhythm.hidden.v1",Me=new WeakMap;function Nt(){try{return globalThis.localStorage??null}catch{return null}}function lr(e,t=Vt){try{let n=JSON.parse(e?.getItem(t)??"[]");return new Set(Array.isArray(n)?n.filter(o=>typeof o=="string"):[])}catch{return new Set}}function Ia(e,t,n,o=Vt){let i=lr(e,o);n?i.add(t):i.delete(t);try{e?.setItem(o,JSON.stringify([...i]))}catch{}}function hc(e,t=Vt){let n=Nt();if(!(!n||n.getItem(`${t}:seeded`))){for(let o of e)Ia(n,o,!0,t);n.setItem(`${t}:seeded`,"1")}}function hn(e){let t=[...e.controls??[],...(e.sections??[]).flatMap(i=>i.controls)],n=[],o=i=>{if(n.push(i),i.type==="group")for(let r of i.controls)o(r)};for(let i of t)o(i),i.type==="fx"&&n.push(...i.controls,...i.more??[]),i.type==="strip"&&(n.push(...(i.sends??[]).map(r=>({...r,type:"knob",compact:!0}))),i.pan&&n.push(dn(i)),i.trim&&n.push(cn(i)));return n}function sr(e,t){if(!(!e||!t))return hn(e).find(n=>n.id===t)}function mc(e){return`${`${e.layout??""}:${(e.sections??[]).map(t=>`${t.id}${t.panel?":panel":""}${t.area?`@${t.area}`:""}`).join(",")}`}#${hn(e).map(t=>t.type==="stepGrid"?`stepGrid:${t.id}:${t.rows.map(n=>`${n.id}/${n.steps.length}`).join(",")}${t.onMute?":m":""}${t.onSolo?":s":""}`:t.type==="moves"?`moves:${t.id}:${t.groups.map(n=>`${n.id}=${n.moves.map(o=>o.id).join("+")}`).join(",")}`:t.type==="padGrid"?`padGrid:${t.id}:${t.pads.length}:${t.columns??2}`:t.type==="slotRow"?`slotRow:${t.id}:${t.slots.length}${t.onSparkle?":spark":""}`:t.type==="button"?`button:${t.id}${t.onSparkle?":spark":""}`:t.type==="select"?`select:${t.id}:${t.options.map(n=>`${n.group?`${n.group}/`:""}${n.value}${n.disabled?"!":""}`).join(",")}`:t.type==="strip"?`strip:${t.id}:${t.channels??1}:${t.master?"master":""}:${t.onMute?"m":""}${t.onSolo?"s":""}${t.onRemove?"x":""}${t.onHacks?"h":""}${t.onFold?"f":""}${t.pan?`p=${t.pan.id}`:""}${t.trim?`t=${t.trim.id}`:""}:${(t.sends??[]).map(n=>n.id).join(",")}:${(t.ticks??[]).map(n=>`${n.label}@${n.value}`).join(",")}`:t.type==="group"?`group:${t.id}:${t.controls.map(n=>n.id).join(",")}`:t.type==="fx"?`fx:${t.id}:${t.depth}:${t.on===void 0?"":"sw"}${t.onFold?":fold":""}${t.onRemove?":x":""}:${t.controls.map(n=>n.id).join(",")}/${(t.more??[]).map(n=>n.id).join(",")}`:`${t.type}:${t.id}`).join("|")}`}function fc(e,t){if(!t.title)return;if(!t.panel){let r=document.createElement("h3");r.className="nc-ui-fx-name",r.textContent=t.title,e.append(r);return}let n=document.createElement("div");n.className="nc-panel-hd";let o=document.createElement("h3");o.className="nc-panel-title",o.textContent=t.title;let i=document.createElement("span");i.className="nc-panel-subject",i.dataset.ncPanelSubject="",n.append(o,i),e.append(n),dr(e,t)}function dr(e,t){if(!t.panel)return;let n=[...e.children].find(r=>r.classList.contains("nc-panel-hd")),o=n?.querySelector(".nc-panel-title"),i=n?.querySelector(".nc-panel-subject");o&&(o.textContent=t.title??""),i&&(i.textContent=t.subject??""),t.lane?e.dataset.ncLane=String(t.lane):delete e.dataset.ncLane}function gc(e){let t=e.closest?.(".nc-module");if(!(t instanceof HTMLElement))return;let n=Me.get(t),o=e.getAttribute?.("data-nc-id")??e.closest?.("[data-nc-id]")?.getAttribute("data-nc-id");return sr(n,o)}function bc(e,t,n){let o=t.sections??[{id:"main",controls:t.controls??[]}],i=mc(t);if(e.dataset.ncSignature===i){for(let r of o){let l=e.querySelector(`[data-nc-section="${Wo(r.id)}"]`);l&&dr(l,r);for(let s of r.controls){let c=e.querySelector(`[data-nc-id="${Wo(s.id)}"]`);c instanceof Element&&ve(c,s)}l instanceof HTMLElement&&Ha(l,r,n)}return}e.dataset.ncSignature=i,e.replaceChildren(),t.layout==="console"?e.dataset.ncLayout="console":delete e.dataset.ncLayout;for(let r of o){let l=document.createElement("div");l.className="nc-section",l.dataset.ncSection=r.id,r.inset&&(l.dataset.ncInset="true"),r.area&&(l.dataset.ncArea=r.area),r.label&&(l.setAttribute("role","group"),l.setAttribute("aria-label",r.label)),r.panel&&(l.dataset.ncPanel="true",l.setAttribute("role","region"),r.title&&l.setAttribute("aria-label",r.title)),fc(l,r);let s=r.panel?document.createElement("div"):l;r.panel&&(s.className="nc-panel-body",l.append(s));for(let c of r.controls)s.append(He(c,gc));e.append(l),Ha(l,r,n)}}function cr(e,t,n){let o=t>0?Math.max(1,Math.ceil(e/t)):1,i=Number.isFinite(n)?Math.trunc(n):0;return{pages:o,page:Math.min(o-1,Math.max(0,i))}}var vc="(max-width: 768px)",ur=new WeakMap;function Go(e){let t=document.createElement("button");t.type="button",t.className="nc-fx-page-btn",t.dataset.ncFxPage=e;let n=e==="prev"?"Previous effects page":"Next effects page";t.setAttribute("aria-label",n),t.title=e==="prev"?"Previous page":"Next page";let o=document.createElement("span");return o.className="nc-fx-page-icon",o.setAttribute("aria-hidden","true"),t.append(o),t}function wc(e,t){let n=[...e.children].find(d=>d.classList.contains("nc-fx-pager"));if(n)return n;let o=document.createElement("div");o.className="nc-fx-pager",o.dataset.ncFxPager="",o.setAttribute("role","group"),o.setAttribute("aria-label","Effects pages");let i=Go("prev"),r=Go("next"),l=document.createElement("span");l.className="nc-fx-page-count",l.dataset.ncFxPageCount="",l.setAttribute("aria-hidden","true");let s=document.createElement("span");s.className="nc-ui-toast-live",s.dataset.ncFxPageLive="",s.setAttribute("aria-live","polite"),o.append(i,l,r,s);let c=(d,u)=>{let p=ur.get(e);if(!p||u.getAttribute("aria-disabled")==="true")return;let f=e.querySelectorAll(":scope > .nc-ui-fx").length,{page:h}=cr(f,p.pageSize,(t.pages.get(p.id)??0)+d);t.pages.set(p.id,h),p.onPage?.(h),Ha(e,{...p,page:h},t),u.getAttribute("aria-disabled")==="true"&&e.ownerDocument.activeElement===u&&(u===i?r:i).focus(),t.redraw()};return i.addEventListener("click",()=>c(-1,i)),r.addEventListener("click",()=>c(1,r)),e.prepend(o),o}function Ha(e,t,n){ur.set(e,t);let o=[...e.querySelectorAll(":scope > .nc-ui-fx")],i=t.pageSize??0,{pages:r,page:l}=cr(o.length,i,t.page??n.pages.get(t.id)??0);if(i>0&&n.pages.set(t.id,l),r<=1){for(let m of[...e.children])m.classList.contains("nc-fx-pager")&&m.remove();delete e.dataset.ncPaged;for(let m of o)delete m.dataset.ncOffPage;return}e.dataset.ncPaged="";let s=e.ownerDocument.defaultView?.matchMedia?.(vc).matches===!0,c=e.closest(".nc-module");o.forEach((m,v)=>{let y=Math.floor(v/i)!==l;if(y?m.dataset.ncOffPage="":delete m.dataset.ncOffPage,y&&!s){let g=c instanceof HTMLElement?Me.get(c):void 0;Qd(m,sr(g,m.dataset.ncId))}});let d=wc(e,n),u=d.querySelector('[data-nc-fx-page="prev"]'),p=d.querySelector('[data-nc-fx-page="next"]');u.setAttribute("aria-disabled",l===0?"true":"false"),p.setAttribute("aria-disabled",l===r-1?"true":"false");let f=d.querySelector("[data-nc-fx-page-count]"),h=`${l+1} / ${r}`;f.textContent!==h&&(f.textContent=h);let w=d.querySelector("[data-nc-fx-page-live]"),E=`Effects page ${l+1} of ${r}`;w.textContent!==E&&(w.textContent=E)}function Wo(e){return e.replace(/["\\]/g,"\\$&")}function xc(e,t=Vt){hi();let n=document.createElement("section");n.className="nc nc-module",n.dataset.ncModule=e.id,n.dataset.ncOpen="true",n.dataset.ncPlace="adjacent",n.dataset.ncShade="1",e.lead&&(n.dataset.ncLead=""),e.compact&&(n.dataset.ncCompact="");let o=lr(Nt(),t).has(e.id),i=document.createElement("header");i.className="nc-module-hd",i.dataset.ncRow="";let r=document.createElement("h2");r.className="nc-title",r.id=`${e.id}-title`;let l=document.createElement("span");l.className="nc-module-end";let s=document.createElement("button");s.type="button",s.className="nc-hide",s.dataset.ncHide="";let c=document.createElement("span");c.className="nc-index",c.dataset.ncIndex="";let d=Ja({labelledBy:r.id,onChange:y=>(Me.get(n)??e).onToggle?.(y)});d.el.dataset.ncModuleSwitch="",l.append(d.el,s,c);let u=document.createElement("span");u.className="nc-snap-msg",u.dataset.ncStatus="",i.append(r,u,l);let p=document.createElement("div");p.className="nc-module-body",p.id=`${e.id}-body`;let f=document.createElement("button");f.type="button",f.className="nc-slim";let h=document.createElement("span");h.className="nc-slim-lines",f.append(h);let w=document.createElement("i");w.className="nc-token-probe",w.dataset.ncProbe="",n.append(w,i,p,f),n.setAttribute("aria-labelledby",r.id);let E=y=>{let g=Me.get(n)??e;n.dataset.ncOpen=y?"false":"true",p.hidden=y,f.hidden=!y,s.textContent=y?"+":"−",s.setAttribute("aria-expanded",y?"false":"true"),s.setAttribute("aria-controls",p.id),s.setAttribute("aria-label",`${y?"Show":"Hide"} ${g.title}`),s.title=y?"Show":"Hide",y?n.dataset.ncSlim="":delete n.dataset.ncSlim};s.addEventListener("click",()=>{let y=n.dataset.ncOpen==="true";Ia(Nt(),(Me.get(n)??e).id,y,t),E(y),ja(n.parentElement)}),f.addEventListener("click",()=>{Ia(Nt(),(Me.get(n)??e).id,!1,t),E(!1),ja(n.parentElement)});let m={pages:new Map,redraw:()=>v.redraw()},v={el:n,update(y){Me.set(n,y),y.compact?n.dataset.ncCompact="":delete n.dataset.ncCompact,r.textContent=y.title,u.textContent=y.status??"",y.status!==void 0?u.setAttribute("aria-live","polite"):u.removeAttribute("aria-live"),h.textContent=y.summary??y.title,d.el.hidden=y.on===void 0,d.set(y.on===!0),y.on===!1?p.dataset.ncDim="true":delete p.dataset.ncDim,f.setAttribute("aria-label",`Show ${y.title}`),bc(p,y,m),E(p.hidden),v.redraw()},redraw(){let y=Me.get(n);y&&tc(n,hn(y))}};return Me.set(n,e),E(o),v.update(e),typeof ResizeObserver<"u"&&new ResizeObserver(()=>v.redraw()).observe(n),li(()=>v.redraw(),n.ownerDocument),v}function yc(e,t,n="adjacent"){hi(e.ownerDocument),e.classList.add("nc-stack"),e.dataset.ncLayout=n==="stack"?"stack":"adjacent",e.replaceChildren();let o=n==="stack"?"stack":"adjacent";t.forEach((i,r)=>{let l=r%4+1;i.el.dataset.ncShade=String(l),i.el.dataset.ncPlace=o;let s=i.el.querySelector("[data-nc-index]");s&&(s.textContent=String(l).padStart(2,"0")),e.append(i.el),i.redraw()}),ja(e)}function ja(e){if(!(e instanceof HTMLElement))return;if(e.dataset.ncLayout!=="adjacent"){e.style.removeProperty("--astrid-cols"),delete e.dataset.ncStackLast;return}let t=[...e.children].filter(r=>r instanceof HTMLElement&&r.classList.contains("nc-module")),n=t.some(r=>r.hasAttribute("data-nc-lead")),o=t.map(r=>r.hasAttribute("data-nc-slim")?a("module-slim-column"):n?r.hasAttribute("data-nc-lead")?"minmax(0, var(--astrid-lead-fr, 30fr))":"minmax(0, var(--astrid-rest-fr, 23.333fr))":"minmax(0, 1fr)");e.style.setProperty("--astrid-cols",o.join(" "));let i=t.filter(r=>!r.hasAttribute("data-nc-slim"));n&&t.length===4&&i.length===4?e.dataset.ncStackLast="true":delete e.dataset.ncStackLast}const $c={"page:hold":"Freeze what ARIA sends: the Ground table, Energy and your phone's motion stay where they are until you release Hold.","page:save":"Download ARIA's settings (station, Smoothing) as a file.","page:load":"Load an ARIA file.",station:"The seismometer ARIA listens to, live from EarthScope. Its ground motion becomes the Ground table and Energy.",custom:"Any station EarthScope streams, as NET STA LOC CHA (for example IU ANMO 00 BHZ).",status:"Live: data is arriving. Quiet: connected, nothing for two minutes. Offline: reconnecting; the 2010 recording plays meanwhile.",wave:"The last ten minutes at this station. The line is where ARIA is playing; the shaded slice is the table.",table:"One cycle of ground motion, mirrored so it loops. ASTRID plays it as its Ground table.",energy:"How much the ground moves against this station's last 30 minutes: its normal reads 0.5. ASTRID can use it as Ground Energy.",smoothing:"How slowly Energy follows the ground, in seconds.","motion:allow-motion":"Your phone asks once. Motion stays on this phone: ARIA turns it into signals for the Studio's instruments.","motion:via":"This device: the sensors of the device ARIA runs on. A phone with this Studio: pair a phone and its motion comes here.","remote:end":"End the pairing on both sides. The phone stops sending and the instruments hold their last value.","motion:status":"Live: motion is arriving. Paused: the screen locked or the page was hidden. Blocked: the phone said no.","motion:tilt-x":"Tip the phone left or right. Centre is 0; full tilt is −1 or +1. Instruments see it as Phone Tilt X.","motion:tilt-y":"Tip the top of the phone away from you or toward you. Centre is 0. Instruments see it as Phone Tilt Y.","motion:shake":"Jumps on a shake, then falls away. Each shake is also an event, e.g. a new phrase in the Generator.","motion:heading":"Which way the phone points, 0–360°. It changes slowly. Instruments see it as Phone Heading.","motion:smooth":"How gently the signals follow your hand. 0% is instant and jittery; 100% glides.","motion:centre":"Hold the phone the way you'll play it and keep it still for two seconds. That angle becomes 0.","motion:invert":"Flip the direction, so tipping the other way raises the value.","motion:off":"Stop reading motion. Instruments hold their last value."},mn=e=>$c[e]??"";function kc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ma={exports:{}},Xo;function Ec(){return Xo||(Xo=1,(function(e,t){var n=(function(){var o=function(M,C){var b=236,A=17,k=M,q=r[C],$=null,x=0,R=null,B=[],I={},V=function(F,D){x=k*4+17,$=(function(S){for(var N=new Array(S),z=0;z<S;z+=1){N[z]=new Array(S);for(var H=0;H<S;H+=1)N[z][H]=null}return N})(x),G(0,0),G(x-7,0),G(0,x-7),Q(),ee(),de(F,D),k>=7&&he(F),R==null&&(R=Et(k,q,B)),ce(R,D)},G=function(F,D){for(var S=-1;S<=7;S+=1)if(!(F+S<=-1||x<=F+S))for(var N=-1;N<=7;N+=1)D+N<=-1||x<=D+N||(0<=S&&S<=6&&(N==0||N==6)||0<=N&&N<=6&&(S==0||S==6)||2<=S&&S<=4&&2<=N&&N<=4?$[F+S][D+N]=!0:$[F+S][D+N]=!1)},K=function(){for(var F=0,D=0,S=0;S<8;S+=1){V(!0,S);var N=s.getLostPoint(I);(S==0||F>N)&&(F=N,D=S)}return D},ee=function(){for(var F=8;F<x-8;F+=1)$[F][6]==null&&($[F][6]=F%2==0);for(var D=8;D<x-8;D+=1)$[6][D]==null&&($[6][D]=D%2==0)},Q=function(){for(var F=s.getPatternPosition(k),D=0;D<F.length;D+=1)for(var S=0;S<F.length;S+=1){var N=F[D],z=F[S];if($[N][z]==null)for(var H=-2;H<=2;H+=1)for(var _=-2;_<=2;_+=1)H==-2||H==2||_==-2||_==2||H==0&&_==0?$[N+H][z+_]=!0:$[N+H][z+_]=!1}},he=function(F){for(var D=s.getBCHTypeNumber(k),S=0;S<18;S+=1){var N=!F&&(D>>S&1)==1;$[Math.floor(S/3)][S%3+x-8-3]=N}for(var S=0;S<18;S+=1){var N=!F&&(D>>S&1)==1;$[S%3+x-8-3][Math.floor(S/3)]=N}},de=function(F,D){for(var S=q<<3|D,N=s.getBCHTypeInfo(S),z=0;z<15;z+=1){var H=!F&&(N>>z&1)==1;z<6?$[z][8]=H:z<8?$[z+1][8]=H:$[x-15+z][8]=H}for(var z=0;z<15;z+=1){var H=!F&&(N>>z&1)==1;z<8?$[8][x-z-1]=H:z<9?$[8][15-z-1+1]=H:$[8][15-z-1]=H}$[x-8][8]=!F},ce=function(F,D){for(var S=-1,N=x-1,z=7,H=0,_=s.getMaskFunction(D),O=x-1;O>0;O-=2)for(O==6&&(O-=1);;){for(var J=0;J<2;J+=1)if($[N][O-J]==null){var ae=!1;H<F.length&&(ae=(F[H]>>>z&1)==1);var U=_(N,O-J);U&&(ae=!ae),$[N][O-J]=ae,z-=1,z==-1&&(H+=1,z=7)}if(N+=S,N<0||x<=N){N-=S,S=-S;break}}},we=function(F,D){for(var S=0,N=0,z=0,H=new Array(D.length),_=new Array(D.length),O=0;O<D.length;O+=1){var J=D[O].dataCount,ae=D[O].totalCount-J;N=Math.max(N,J),z=Math.max(z,ae),H[O]=new Array(J);for(var U=0;U<H[O].length;U+=1)H[O][U]=255&F.getBuffer()[U+S];S+=J;var oe=s.getErrorCorrectPolynomial(ae),ie=d(H[O],oe.getLength()-1),Ue=ie.mod(oe);_[O]=new Array(oe.getLength()-1);for(var U=0;U<_[O].length;U+=1){var it=U+Ue.getLength()-_[O].length;_[O][U]=it>=0?Ue.getAt(it):0}}for(var rt=0,U=0;U<D.length;U+=1)rt+=D[U].totalCount;for(var Ve=new Array(rt),qe=0,U=0;U<N;U+=1)for(var O=0;O<D.length;O+=1)U<H[O].length&&(Ve[qe]=H[O][U],qe+=1);for(var U=0;U<z;U+=1)for(var O=0;O<D.length;O+=1)U<_[O].length&&(Ve[qe]=_[O][U],qe+=1);return Ve},Et=function(F,D,S){for(var N=u.getRSBlocks(F,D),z=p(),H=0;H<S.length;H+=1){var _=S[H];z.put(_.getMode(),4),z.put(_.getLength(),s.getLengthInBits(_.getMode(),F)),_.write(z)}for(var O=0,H=0;H<N.length;H+=1)O+=N[H].dataCount;if(z.getLengthInBits()>O*8)throw"code length overflow. ("+z.getLengthInBits()+">"+O*8+")";for(z.getLengthInBits()+4<=O*8&&z.put(0,4);z.getLengthInBits()%8!=0;)z.putBit(!1);for(;!(z.getLengthInBits()>=O*8||(z.put(b,8),z.getLengthInBits()>=O*8));)z.put(A,8);return we(z,N)};I.addData=function(F,D){D=D||"Byte";var S=null;switch(D){case"Numeric":S=f(F);break;case"Alphanumeric":S=h(F);break;case"Byte":S=w(F);break;case"Kanji":S=E(F);break;default:throw"mode:"+D}B.push(S),R=null},I.isDark=function(F,D){if(F<0||x<=F||D<0||x<=D)throw F+","+D;return $[F][D]},I.getModuleCount=function(){return x},I.make=function(){if(k<1){for(var F=1;F<40;F++){for(var D=u.getRSBlocks(F,q),S=p(),N=0;N<B.length;N++){var z=B[N];S.put(z.getMode(),4),S.put(z.getLength(),s.getLengthInBits(z.getMode(),F)),z.write(S)}for(var H=0,N=0;N<D.length;N++)H+=D[N].dataCount;if(S.getLengthInBits()<=H*8)break}k=F}V(!1,K())},I.createTableTag=function(F,D){F=F||2,D=typeof D>"u"?F*4:D;var S="";S+='<table style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: "+D+"px;",S+='">',S+="<tbody>";for(var N=0;N<I.getModuleCount();N+=1){S+="<tr>";for(var z=0;z<I.getModuleCount();z+=1)S+='<td style="',S+=" border-width: 0px; border-style: none;",S+=" border-collapse: collapse;",S+=" padding: 0px; margin: 0px;",S+=" width: "+F+"px;",S+=" height: "+F+"px;",S+=" background-color: ",S+=I.isDark(N,z)?"#000000":"#ffffff",S+=";",S+='"/>';S+="</tr>"}return S+="</tbody>",S+="</table>",S},I.createSvgTag=function(F,D,S,N){var z={};typeof arguments[0]=="object"&&(z=arguments[0],F=z.cellSize,D=z.margin,S=z.alt,N=z.title),F=F||2,D=typeof D>"u"?F*4:D,S=typeof S=="string"?{text:S}:S||{},S.text=S.text||null,S.id=S.text?S.id||"qrcode-description":null,N=typeof N=="string"?{text:N}:N||{},N.text=N.text||null,N.id=N.text?N.id||"qrcode-title":null;var H=I.getModuleCount()*F+D*2,_,O,J,ae,U="",oe;for(oe="l"+F+",0 0,"+F+" -"+F+",0 0,-"+F+"z ",U+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',U+=z.scalable?"":' width="'+H+'px" height="'+H+'px"',U+=' viewBox="0 0 '+H+" "+H+'" ',U+=' preserveAspectRatio="xMinYMin meet"',U+=N.text||S.text?' role="img" aria-labelledby="'+Ae([N.id,S.id].join(" ").trim())+'"':"",U+=">",U+=N.text?'<title id="'+Ae(N.id)+'">'+Ae(N.text)+"</title>":"",U+=S.text?'<description id="'+Ae(S.id)+'">'+Ae(S.text)+"</description>":"",U+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',U+='<path d="',J=0;J<I.getModuleCount();J+=1)for(ae=J*F+D,_=0;_<I.getModuleCount();_+=1)I.isDark(J,_)&&(O=_*F+D,U+="M"+O+","+ae+oe);return U+='" stroke="transparent" fill="black"/>',U+="</svg>",U},I.createDataURL=function(F,D){F=F||2,D=typeof D>"u"?F*4:D;var S=I.getModuleCount()*F+D*2,N=D,z=S-D;return P(S,S,function(H,_){if(N<=H&&H<z&&N<=_&&_<z){var O=Math.floor((H-N)/F),J=Math.floor((_-N)/F);return I.isDark(J,O)?0:1}else return 1})},I.createImgTag=function(F,D,S){F=F||2,D=typeof D>"u"?F*4:D;var N=I.getModuleCount()*F+D*2,z="";return z+="<img",z+=' src="',z+=I.createDataURL(F,D),z+='"',z+=' width="',z+=N,z+='"',z+=' height="',z+=N,z+='"',S&&(z+=' alt="',z+=Ae(S),z+='"'),z+="/>",z};var Ae=function(F){for(var D="",S=0;S<F.length;S+=1){var N=F.charAt(S);switch(N){case"<":D+="&lt;";break;case">":D+="&gt;";break;case"&":D+="&amp;";break;case'"':D+="&quot;";break;default:D+=N;break}}return D},ot=function(F){var D=1;F=typeof F>"u"?D*2:F;var S=I.getModuleCount()*D+F*2,N=F,z=S-F,H,_,O,J,ae,U={"██":"█","█ ":"▀"," █":"▄","  ":" "},oe={"██":"▀","█ ":"▀"," █":" ","  ":" "},ie="";for(H=0;H<S;H+=2){for(O=Math.floor((H-N)/D),J=Math.floor((H+1-N)/D),_=0;_<S;_+=1)ae="█",N<=_&&_<z&&N<=H&&H<z&&I.isDark(O,Math.floor((_-N)/D))&&(ae=" "),N<=_&&_<z&&N<=H+1&&H+1<z&&I.isDark(J,Math.floor((_-N)/D))?ae+=" ":ae+="█",ie+=F<1&&H+1>=z?oe[ae]:U[ae];ie+=`
`}return S%2&&F>0?ie.substring(0,ie.length-S-1)+Array(S+1).join("▀"):ie.substring(0,ie.length-1)};return I.createASCII=function(F,D){if(F=F||1,F<2)return ot(D);F-=1,D=typeof D>"u"?F*2:D;var S=I.getModuleCount()*F+D*2,N=D,z=S-D,H,_,O,J,ae=Array(F+1).join("██"),U=Array(F+1).join("  "),oe="",ie="";for(H=0;H<S;H+=1){for(O=Math.floor((H-N)/F),ie="",_=0;_<S;_+=1)J=1,N<=_&&_<z&&N<=H&&H<z&&I.isDark(O,Math.floor((_-N)/F))&&(J=0),ie+=J?ae:U;for(O=0;O<F;O+=1)oe+=ie+`
`}return oe.substring(0,oe.length-1)},I.renderTo2dContext=function(F,D){D=D||2;for(var S=I.getModuleCount(),N=0;N<S;N++)for(var z=0;z<S;z++)F.fillStyle=I.isDark(N,z)?"black":"white",F.fillRect(N*D,z*D,D,D)},I};o.stringToBytesFuncs={default:function(M){for(var C=[],b=0;b<M.length;b+=1){var A=M.charCodeAt(b);C.push(A&255)}return C}},o.stringToBytes=o.stringToBytesFuncs.default,o.createStringToBytes=function(M,C){var b=(function(){for(var k=y(M),q=function(){var ee=k.read();if(ee==-1)throw"eof";return ee},$=0,x={};;){var R=k.read();if(R==-1)break;var B=q(),I=q(),V=q(),G=String.fromCharCode(R<<8|B),K=I<<8|V;x[G]=K,$+=1}if($!=C)throw $+" != "+C;return x})(),A=63;return function(k){for(var q=[],$=0;$<k.length;$+=1){var x=k.charCodeAt($);if(x<128)q.push(x);else{var R=b[k.charAt($)];typeof R=="number"?(R&255)==R?q.push(R):(q.push(R>>>8),q.push(R&255)):q.push(A)}}return q}};var i={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},r={L:1,M:0,Q:3,H:2},l={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},s=(function(){var M=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],C=1335,b=7973,A=21522,k={},q=function($){for(var x=0;$!=0;)x+=1,$>>>=1;return x};return k.getBCHTypeInfo=function($){for(var x=$<<10;q(x)-q(C)>=0;)x^=C<<q(x)-q(C);return($<<10|x)^A},k.getBCHTypeNumber=function($){for(var x=$<<12;q(x)-q(b)>=0;)x^=b<<q(x)-q(b);return $<<12|x},k.getPatternPosition=function($){return M[$-1]},k.getMaskFunction=function($){switch($){case l.PATTERN000:return function(x,R){return(x+R)%2==0};case l.PATTERN001:return function(x,R){return x%2==0};case l.PATTERN010:return function(x,R){return R%3==0};case l.PATTERN011:return function(x,R){return(x+R)%3==0};case l.PATTERN100:return function(x,R){return(Math.floor(x/2)+Math.floor(R/3))%2==0};case l.PATTERN101:return function(x,R){return x*R%2+x*R%3==0};case l.PATTERN110:return function(x,R){return(x*R%2+x*R%3)%2==0};case l.PATTERN111:return function(x,R){return(x*R%3+(x+R)%2)%2==0};default:throw"bad maskPattern:"+$}},k.getErrorCorrectPolynomial=function($){for(var x=d([1],0),R=0;R<$;R+=1)x=x.multiply(d([1,c.gexp(R)],0));return x},k.getLengthInBits=function($,x){if(1<=x&&x<10)switch($){case i.MODE_NUMBER:return 10;case i.MODE_ALPHA_NUM:return 9;case i.MODE_8BIT_BYTE:return 8;case i.MODE_KANJI:return 8;default:throw"mode:"+$}else if(x<27)switch($){case i.MODE_NUMBER:return 12;case i.MODE_ALPHA_NUM:return 11;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 10;default:throw"mode:"+$}else if(x<41)switch($){case i.MODE_NUMBER:return 14;case i.MODE_ALPHA_NUM:return 13;case i.MODE_8BIT_BYTE:return 16;case i.MODE_KANJI:return 12;default:throw"mode:"+$}else throw"type:"+x},k.getLostPoint=function($){for(var x=$.getModuleCount(),R=0,B=0;B<x;B+=1)for(var I=0;I<x;I+=1){for(var V=0,G=$.isDark(B,I),K=-1;K<=1;K+=1)if(!(B+K<0||x<=B+K))for(var ee=-1;ee<=1;ee+=1)I+ee<0||x<=I+ee||K==0&&ee==0||G==$.isDark(B+K,I+ee)&&(V+=1);V>5&&(R+=3+V-5)}for(var B=0;B<x-1;B+=1)for(var I=0;I<x-1;I+=1){var Q=0;$.isDark(B,I)&&(Q+=1),$.isDark(B+1,I)&&(Q+=1),$.isDark(B,I+1)&&(Q+=1),$.isDark(B+1,I+1)&&(Q+=1),(Q==0||Q==4)&&(R+=3)}for(var B=0;B<x;B+=1)for(var I=0;I<x-6;I+=1)$.isDark(B,I)&&!$.isDark(B,I+1)&&$.isDark(B,I+2)&&$.isDark(B,I+3)&&$.isDark(B,I+4)&&!$.isDark(B,I+5)&&$.isDark(B,I+6)&&(R+=40);for(var I=0;I<x;I+=1)for(var B=0;B<x-6;B+=1)$.isDark(B,I)&&!$.isDark(B+1,I)&&$.isDark(B+2,I)&&$.isDark(B+3,I)&&$.isDark(B+4,I)&&!$.isDark(B+5,I)&&$.isDark(B+6,I)&&(R+=40);for(var he=0,I=0;I<x;I+=1)for(var B=0;B<x;B+=1)$.isDark(B,I)&&(he+=1);var de=Math.abs(100*he/x/x-50)/5;return R+=de*10,R},k})(),c=(function(){for(var M=new Array(256),C=new Array(256),b=0;b<8;b+=1)M[b]=1<<b;for(var b=8;b<256;b+=1)M[b]=M[b-4]^M[b-5]^M[b-6]^M[b-8];for(var b=0;b<255;b+=1)C[M[b]]=b;var A={};return A.glog=function(k){if(k<1)throw"glog("+k+")";return C[k]},A.gexp=function(k){for(;k<0;)k+=255;for(;k>=256;)k-=255;return M[k]},A})();function d(M,C){if(typeof M.length>"u")throw M.length+"/"+C;var b=(function(){for(var k=0;k<M.length&&M[k]==0;)k+=1;for(var q=new Array(M.length-k+C),$=0;$<M.length-k;$+=1)q[$]=M[$+k];return q})(),A={};return A.getAt=function(k){return b[k]},A.getLength=function(){return b.length},A.multiply=function(k){for(var q=new Array(A.getLength()+k.getLength()-1),$=0;$<A.getLength();$+=1)for(var x=0;x<k.getLength();x+=1)q[$+x]^=c.gexp(c.glog(A.getAt($))+c.glog(k.getAt(x)));return d(q,0)},A.mod=function(k){if(A.getLength()-k.getLength()<0)return A;for(var q=c.glog(A.getAt(0))-c.glog(k.getAt(0)),$=new Array(A.getLength()),x=0;x<A.getLength();x+=1)$[x]=A.getAt(x);for(var x=0;x<k.getLength();x+=1)$[x]^=c.gexp(c.glog(k.getAt(x))+q);return d($,0).mod(k)},A}var u=(function(){var M=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],C=function(k,q){var $={};return $.totalCount=k,$.dataCount=q,$},b={},A=function(k,q){switch(q){case r.L:return M[(k-1)*4+0];case r.M:return M[(k-1)*4+1];case r.Q:return M[(k-1)*4+2];case r.H:return M[(k-1)*4+3];default:return}};return b.getRSBlocks=function(k,q){var $=A(k,q);if(typeof $>"u")throw"bad rs block @ typeNumber:"+k+"/errorCorrectionLevel:"+q;for(var x=$.length/3,R=[],B=0;B<x;B+=1)for(var I=$[B*3+0],V=$[B*3+1],G=$[B*3+2],K=0;K<I;K+=1)R.push(C(V,G));return R},b})(),p=function(){var M=[],C=0,b={};return b.getBuffer=function(){return M},b.getAt=function(A){var k=Math.floor(A/8);return(M[k]>>>7-A%8&1)==1},b.put=function(A,k){for(var q=0;q<k;q+=1)b.putBit((A>>>k-q-1&1)==1)},b.getLengthInBits=function(){return C},b.putBit=function(A){var k=Math.floor(C/8);M.length<=k&&M.push(0),A&&(M[k]|=128>>>C%8),C+=1},b},f=function(M){var C=i.MODE_NUMBER,b=M,A={};A.getMode=function(){return C},A.getLength=function($){return b.length},A.write=function($){for(var x=b,R=0;R+2<x.length;)$.put(k(x.substring(R,R+3)),10),R+=3;R<x.length&&(x.length-R==1?$.put(k(x.substring(R,R+1)),4):x.length-R==2&&$.put(k(x.substring(R,R+2)),7))};var k=function($){for(var x=0,R=0;R<$.length;R+=1)x=x*10+q($.charAt(R));return x},q=function($){if("0"<=$&&$<="9")return $.charCodeAt(0)-48;throw"illegal char :"+$};return A},h=function(M){var C=i.MODE_ALPHA_NUM,b=M,A={};A.getMode=function(){return C},A.getLength=function(q){return b.length},A.write=function(q){for(var $=b,x=0;x+1<$.length;)q.put(k($.charAt(x))*45+k($.charAt(x+1)),11),x+=2;x<$.length&&q.put(k($.charAt(x)),6)};var k=function(q){if("0"<=q&&q<="9")return q.charCodeAt(0)-48;if("A"<=q&&q<="Z")return q.charCodeAt(0)-65+10;switch(q){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+q}};return A},w=function(M){var C=i.MODE_8BIT_BYTE,b=o.stringToBytes(M),A={};return A.getMode=function(){return C},A.getLength=function(k){return b.length},A.write=function(k){for(var q=0;q<b.length;q+=1)k.put(b[q],8)},A},E=function(M){var C=i.MODE_KANJI,b=o.stringToBytesFuncs.SJIS;if(!b)throw"sjis not supported.";(function(q,$){var x=b(q);if(x.length!=2||(x[0]<<8|x[1])!=$)throw"sjis not supported."})("友",38726);var A=b(M),k={};return k.getMode=function(){return C},k.getLength=function(q){return~~(A.length/2)},k.write=function(q){for(var $=A,x=0;x+1<$.length;){var R=(255&$[x])<<8|255&$[x+1];if(33088<=R&&R<=40956)R-=33088;else if(57408<=R&&R<=60351)R-=49472;else throw"illegal char at "+(x+1)+"/"+R;R=(R>>>8&255)*192+(R&255),q.put(R,13),x+=2}if(x<$.length)throw"illegal char at "+(x+1)},k},m=function(){var M=[],C={};return C.writeByte=function(b){M.push(b&255)},C.writeShort=function(b){C.writeByte(b),C.writeByte(b>>>8)},C.writeBytes=function(b,A,k){A=A||0,k=k||b.length;for(var q=0;q<k;q+=1)C.writeByte(b[q+A])},C.writeString=function(b){for(var A=0;A<b.length;A+=1)C.writeByte(b.charCodeAt(A))},C.toByteArray=function(){return M},C.toString=function(){var b="";b+="[";for(var A=0;A<M.length;A+=1)A>0&&(b+=","),b+=M[A];return b+="]",b},C},v=function(){var M=0,C=0,b=0,A="",k={},q=function(x){A+=String.fromCharCode($(x&63))},$=function(x){if(!(x<0)){if(x<26)return 65+x;if(x<52)return 97+(x-26);if(x<62)return 48+(x-52);if(x==62)return 43;if(x==63)return 47}throw"n:"+x};return k.writeByte=function(x){for(M=M<<8|x&255,C+=8,b+=1;C>=6;)q(M>>>C-6),C-=6},k.flush=function(){if(C>0&&(q(M<<6-C),M=0,C=0),b%3!=0)for(var x=3-b%3,R=0;R<x;R+=1)A+="="},k.toString=function(){return A},k},y=function(M){var C=M,b=0,A=0,k=0,q={};q.read=function(){for(;k<8;){if(b>=C.length){if(k==0)return-1;throw"unexpected end of file./"+k}var x=C.charAt(b);if(b+=1,x=="=")return k=0,-1;if(x.match(/^\s$/))continue;A=A<<6|$(x.charCodeAt(0)),k+=6}var R=A>>>k-8&255;return k-=8,R};var $=function(x){if(65<=x&&x<=90)return x-65;if(97<=x&&x<=122)return x-97+26;if(48<=x&&x<=57)return x-48+52;if(x==43)return 62;if(x==47)return 63;throw"c:"+x};return q},g=function(M,C){var b=M,A=C,k=new Array(M*C),q={};q.setPixel=function(B,I,V){k[I*b+B]=V},q.write=function(B){B.writeString("GIF87a"),B.writeShort(b),B.writeShort(A),B.writeByte(128),B.writeByte(0),B.writeByte(0),B.writeByte(0),B.writeByte(0),B.writeByte(0),B.writeByte(255),B.writeByte(255),B.writeByte(255),B.writeString(","),B.writeShort(0),B.writeShort(0),B.writeShort(b),B.writeShort(A),B.writeByte(0);var I=2,V=x(I);B.writeByte(I);for(var G=0;V.length-G>255;)B.writeByte(255),B.writeBytes(V,G,255),G+=255;B.writeByte(V.length-G),B.writeBytes(V,G,V.length-G),B.writeByte(0),B.writeString(";")};var $=function(B){var I=B,V=0,G=0,K={};return K.write=function(ee,Q){if(ee>>>Q)throw"length over";for(;V+Q>=8;)I.writeByte(255&(ee<<V|G)),Q-=8-V,ee>>>=8-V,G=0,V=0;G=ee<<V|G,V=V+Q},K.flush=function(){V>0&&I.writeByte(G)},K},x=function(B){for(var I=1<<B,V=(1<<B)+1,G=B+1,K=R(),ee=0;ee<I;ee+=1)K.add(String.fromCharCode(ee));K.add(String.fromCharCode(I)),K.add(String.fromCharCode(V));var Q=m(),he=$(Q);he.write(I,G);var de=0,ce=String.fromCharCode(k[de]);for(de+=1;de<k.length;){var we=String.fromCharCode(k[de]);de+=1,K.contains(ce+we)?ce=ce+we:(he.write(K.indexOf(ce),G),K.size()<4095&&(K.size()==1<<G&&(G+=1),K.add(ce+we)),ce=we)}return he.write(K.indexOf(ce),G),he.write(V,G),he.flush(),Q.toByteArray()},R=function(){var B={},I=0,V={};return V.add=function(G){if(V.contains(G))throw"dup key:"+G;B[G]=I,I+=1},V.size=function(){return I},V.indexOf=function(G){return B[G]},V.contains=function(G){return typeof B[G]<"u"},V};return q},P=function(M,C,b){for(var A=g(M,C),k=0;k<C;k+=1)for(var q=0;q<M;q+=1)A.setPixel(q,k,b(q,k));var $=m();A.write($);for(var x=v(),R=$.toByteArray(),B=0;B<R.length;B+=1)x.writeByte(R[B]);return x.flush(),"data:image/gif;base64,"+x};return o})();(function(){n.stringToBytesFuncs["UTF-8"]=function(o){function i(r){for(var l=[],s=0;s<r.length;s++){var c=r.charCodeAt(s);c<128?l.push(c):c<2048?l.push(192|c>>6,128|c&63):c<55296||c>=57344?l.push(224|c>>12,128|c>>6&63,128|c&63):(s++,c=65536+((c&1023)<<10|r.charCodeAt(s)&1023),l.push(240|c>>18,128|c>>12&63,128|c>>6&63,128|c&63))}return l}return i(o)}})(),(function(o){e.exports=o()})(function(){return n})})(ma)),ma.exports}var Ac=Ec();const Mc=kc(Ac),Sc="#fff",Cc="#000";function Lc(e){const t=Mc(0,"M");t.addData(e),t.make();const n=t.getModuleCount(),o=4,i=n+o*2;let r="";for(let l=0;l<n;l++)for(let s=0;s<n;s++)t.isDark(l,s)&&(r+=`M${s+o} ${l+o}h1v1h-1z`);return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i} ${i}" shape-rendering="crispEdges" role="img" aria-label="Pairing code as a QR code"><rect width="${i}" height="${i}" fill="${Sc}"/><path d="${r}" fill="${Cc}"/></svg>`}const Ko="aria-motion-via",Qo="aria-remote-code",Tc=2e3,Fc=1e3,fa=10,Dc=1.5,Nc=3,zc=1/60,pr=["N","NE","E","SE","S","SW","W","NW"];function qc(e){const t=Math.round((e%1+1)%1*360)%360;return`${pr[Math.round(t/45)%8]} ${t}°`}function Zo(e){const t=Math.round(e*100)/100;return Math.abs(t)<.005?"0.00":`${t>0?"+":"−"}${Math.abs(t).toFixed(2)}`}function Bc(e){const t=Math.max(0,e/1e3);if(t<60)return"just now";if(t<5400)return`${Math.round(t/60)} min ago`;if(t<129600)return`${Math.round(t/3600)} h ago`;const n=Math.round(t/86400);return`${n} day${n===1?"":"s"} ago`}function Rc(e){const t=Gr(e.win),n=Wr(e.win),o=new Xr(e.settings()),i=Kr(e.win);let r=null,l=0,s=!1,c=t==="none",d=!1,u=o.values(),p=0,f=0,h=Number.NEGATIVE_INFINITY;const w=[];let E=null,m="",v=0;const y=(()=>{try{return e.win.sessionStorage}catch{return null}})();let g=y?.getItem(Ko)==="remote"?"remote":"device",P=null,M="idle",C="",b=null,A="",k=!0,q=!1,$=0,x=[];const R=new Qr;let B=0,I=0;const V=()=>e.win.performance.now(),G=()=>$>0&&V()-$<Tc;function K(){return g==="remote"?!P||M!=="paired"||!$?"off":k&&!q&&G()?"live":"paused":c?"none":s?"blocked":r?d?"paused":"live":d&&e.settings().on?"paused":"off"}let ee=K();function Q(){const L=K();i.set(g==="device"&&L==="live"),L!==ee&&(ee=L,e.onState()),Se()}function he(L){const j=o.step(L);u=j.values;const X=f?Math.max(0,L.t-f):0;for(f=L.t,p=Math.max(u.shake,p*Math.exp(-X/Dc)),j.shake!==null&&(w.push({t:L.t,s:j.shake}),e.held()||e.send(hl(e.sourceId(),e.ctxNow(),j.shake)));w.length&&w[0].t<L.t-fa;)w.shift();if(E&&o.angle)if(E.step(o.angle,L.t),E.centre){const W=E.centre;E=null,e.save({...e.settings(),centre:W,centredAt:Date.now()}),o.set(e.settings()),m=""}else E.gaveUp&&(E=null,m="It kept moving. Rest your hands and try again.");!e.held()&&L.t-h>=zc-1e-4&&(h=L.t,e.send(pl(e.sourceId(),[{at:e.ctxNow(),...u}]))),Yr()}function de(){r||(s=!1,r=al(e.win,he),l=e.win.performance.now(),e.win.clearTimeout(v),v=e.win.setTimeout(()=>{!r||r.gotData||d||(ce(),t==="open"?s=!0:c=!0,Q())},Nc*1e3),Q())}function ce(){r?.stop(),r=null,E=null,e.win.clearTimeout(v)}let we=!1;function Et(){const L=co(e.win);we=!0,e.save({...e.settings(),on:!0}),L.then(j=>{we=!1,j==="granted"?de():(s=j==="denied",Q())})}function Ae(){ce(),s=!1,e.save({...e.settings(),on:!1}),o.reset(),u=o.values(),p=0,w.length=0,Q()}function ot(){if(g!=="remote"&&!(!e.settings().on||r||c||d||we)){if(t==="open"){de();return}co(e.win).then(L=>{L==="granted"&&e.settings().on?de():L==="denied"&&(s=!0,Q())})}}function F(){if(o.set(e.settings()),g==="remote"){Se();return}!e.settings().on&&r?Ae():e.settings().on&&!r&&ot(),Se()}function D(){return e.sceneName?.().trim()||"TRIKI Studio"}function S(L){if(L.k==="m"){const j=ll(L);if(!j)return;const X=V();for(R.reading(j.t*1e3,X),x.push(X);x.length&&x[0]<X-1e3;)x.shift();const W=G()&&$>0;if($=X,q||!k)return;he(j),W||Q()}else if(L.k==="pong")typeof L.t0=="number"&&typeof L.tp=="number"&&R.pong(L.t0,L.tp,V());else if(L.k==="vis"){const j=L.v==="visible";j!==k&&(k=j,j&&o.reset(),Q())}else L.k==="hold"?(q=L.on===!0,Q()):L.k==="hi"&&(typeof L.name=="string"&&(A=L.name),Se())}function N(){const L=tl();try{y?.setItem(Qo,L)}catch{}return L}function z(L=!1){H(!1);const j=y?.getItem(Qo);b=!L&&j&&/^[A-Z2-9]{4}$/.test(j)?j:N(),M="connecting",C="",A="",k=!0,q=!1,$=0,x=[],R.reset(),o.reset(),u=o.values();const X=b;P=Zr({win:e.win,relay:el(e.win),code:X,role:"studio",token:Jr(e.win,"aria-remote-token"),name:D,onMessage:S,onState:(Z,le)=>{if(Z==="refused"&&le.why==="taken"){z(!0);return}M=Z,C=le.text??"",Z==="paired"?le.peer&&(A=le.peer):(A=Z==="waiting"?"":A,$=0,k=!0,q=!1,R.reset(),o.reset(),u=o.values()),Q()}}),e.win.clearInterval(B),B=e.win.setInterval(()=>{!P||M!=="paired"||P.send({k:"ping",t0:V(),d:R.ms,j:R.jitter,n:D()})},Fc),e.win.clearInterval(I);let W=!1;I=e.win.setInterval(()=>{const Z=K()==="live";Z!==W?(W=Z,Q()):Se()},500),Q()}function H(L){e.win.clearInterval(B),e.win.clearInterval(I),P&&(L?P.end():P.stop()),P=null,M=L?"ended":"idle",$=0,o.reset(),u=o.values()}function _(L){if(L!==g){g=L;try{y?.setItem(Ko,g)}catch{}g==="remote"?(ce(),d=!1,z()):(H(!1),M="idle",o.reset(),u=o.values(),ot()),Q()}}function O(){H(!0),Q()}e.win.document.addEventListener("visibilitychange",()=>{if(e.win.document.visibilityState==="hidden"){if(!r)return;ce(),d=!0}else{if(!d)return;d=!1,o.reset(),de();return}Q()});const J=T("div",{class:"aria-status",role:"status","data-aria":"motion-status",...e.help("motion:status")}),ae=T("span",{class:"aria-small aria-sub aria-mono","data-aria":"motion-to"}),U=T("div",{class:"aria-row-between aria-motion-head"},J,ae),oe=L=>T("span",{class:"aria-mo-val","data-aria":`motion-${L}`},"—"),ie=(L,j,X,W,...Z)=>T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},T("span",{},T("span",{class:"nc-label",...e.help(`motion:${X}`)},L),j?T("span",{class:"aria-small aria-sub aria-mono aria-mo-sub"},j):null),W),...Z),Ue=(...L)=>T("div",{class:"aria-row-between aria-small aria-sub aria-mono aria-ends"},...L.map(j=>typeof j=="string"?T("span",{},j):j)),it=L=>{const j=T("i",{}),X=T("div",{class:"aria-meter aria-mo-meter","data-bi":"",role:"meter","aria-label":L,"aria-valuemin":"-1","aria-valuemax":"1"},j);return{el:X,set(W){const Z=50+Math.min(0,W)*50,le=50+Math.max(0,W)*50;j.style.left=`${Z}%`,j.style.width=`${le-Z}%`,X.setAttribute("aria-valuenow",W.toFixed(2))}}},rt=it("Tilt X"),Ve=it("Tilt Y"),qe=oe("tilt-x"),Cn=oe("tilt-y"),Ln=T("i",{}),Tn=T("b",{}),Fn=T("div",{class:"aria-meter aria-mo-meter",role:"meter","aria-label":"Shake","aria-valuemin":"0","aria-valuemax":"1"},Tn,Ln),Dn=oe("shake"),Nn=T("span",{"data-aria":"motion-shakes"},"no shakes"),Wt=T("canvas",{class:"aria-mo-strip","data-aria":"motion-strip"}),Xt=T("canvas",{class:"aria-mo-tape","data-aria":"motion-tape"}),zn=oe("heading"),qn=T("div",{class:"aria-body aria-mo-live","data-aria":"motion-live"},ie("Tilt X",null,"tilt-x",qe,rt.el,Ue("left","0","right")),ie("Tilt Y",null,"tilt-y",Cn,Ve.el,Ue("back","0","forward")),ie("Shake",null,"shake",Dn,Fn,Wt,Ue("−10 s",Nn,"now")),ie("Heading","slow","heading",zn,Xt)),Kt=(L,j,X)=>{const W=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":j,...e.help(`motion:${j}`)},L);return W.addEventListener("click",X),W},Qt=L=>T("p",{class:"aria-mo-text"},L),xe=(L,j)=>T("p",{class:"aria-small aria-sub aria-mono",...j?{"data-aria":j}:{}},L),Bn=L=>T("div",{class:"aria-field"},T("span",{class:"nc-label"},L),T("div",{class:"aria-mo-names"},...["Tilt X","Tilt Y","Shake","Heading"].map(j=>T("span",{},T("span",{},j),T("span",{class:"aria-mono"},"—"))))),Rn=T("div",{class:"aria-body","data-aria":"motion-allow"},Qt("Tilt and shake this phone to move sounds in the Studio."),Kt("Allow motion","allow-motion",Et),xe("Your phone asks once. Nothing leaves this phone."),Bn("Signals it gives")),Pn=T("ol",{class:"aria-mo-steps","data-aria":"motion-steps"}),In=T("div",{class:"aria-body","data-aria":"motion-blocked"},Qt("Motion is blocked for this site, so ARIA can't read the phone."),T("div",{class:"aria-field"},T("span",{class:"nc-label"},"To allow it"),Pn),Kt("Try again","allow-motion",Et),xe(n?"Safari remembers No until it is closed. Your Studio and saves stay as they are.":"Your Studio and saves stay as they are.")),Hr=n?["Close Safari fully: swipe up from the bottom edge, pause, then swipe Safari away.",`Open ${e.studioUrl} again.`,"Tap Allow motion, then Allow."]:["Open this site's settings in your browser (the icon left of the address).","Set Motion sensors to Allow.","Come back and tap Try again."];Pn.append(...Hr.map(L=>T("li",{},L)));const Hn=T("div",{class:"aria-body","data-aria":"motion-none"},Qt("Open the Studio on your phone to use its motion."),xe(`This computer has no motion sensor. On your phone: ${e.studioUrl}`),xe("Or pair a phone with this Studio: choose A phone with this Studio above."),Bn("Signals it gives")),jn=xe("Paused while this page is hidden. It resumes when the page is back.","motion-paused"),Zt=T("div",{class:"aria-qr","data-aria":"remote-qr","aria-hidden":"true"}),On=T("span",{class:"aria-code","data-aria":"remote-code"},""),_n=T("p",{class:"aria-small aria-sub aria-mono","data-aria":"remote-status"}),jr=T("div",{class:"aria-pair-text"},T("p",{class:"aria-mo-text"},"Scan with your iPhone camera."),T("p",{class:"aria-small aria-sub aria-mono"},"Or open ",T("b",{},"netcomposer.art/remote")," and type"),On),Un=T("div",{class:"aria-body","data-aria":"remote-pair"},T("div",{class:"aria-pair"},Zt,jr),_n,xe("Only the phone's motion passes through. Nothing is stored. A Scene never keeps a pairing.")),Vn=xe("","remote-note"),Yn=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":"remote-end",...e.help("remote:end")},"End pairing");Yn.addEventListener("click",O);const Gn=T("div",{class:"aria-field"},Vn,Yn),Wn=xe("Pairing ended.","remote-ended-text"),Xn=T("button",{type:"button",class:"nc-btn aria-mo-btn","data-aria-action":"remote-again"},"Pair a phone again");Xn.addEventListener("click",()=>{z(!0)});const Kn=T("div",{class:"aria-body","data-aria":"remote-ended"},Wn,Xn);let Qn="";function Or(){if(!b)return;const L=ol(e.win.location.origin,b);Qn!==L&&(Qn=L,Zt.innerHTML=Lc(L),Zt.dataset.link=L),On.textContent=il(b),_n.replaceChildren(T("i",{class:`aria-dot-inline${M==="offline"?" aria-off":""}`}),M==="connecting"?"Opening a pairing code…":M==="offline"?"Can't reach the pairing relay. Trying again…":M==="refused"?C||"The relay refused this code.":"Waiting for a phone…")}const lt=T("div",{class:"aria-body","data-aria-module":"phone"},U,Un,qn,jn,Gn,Kn,Rn,In,Hn),Jt=Kt("Hold still to centre","centre",()=>{r&&(E=new rl,m="",Se())}),Zn=xe("","motion-centre"),Jn=L=>{const j=Ja({checked:e.settings()[`invert${L}`],label:`Invert Tilt ${L}`,onChange:W=>e.save({...e.settings(),[`invert${L}`]:W})});return j.el.dataset.aria=`motion-invert-${L.toLowerCase()}`,{row:T("div",{class:"aria-mo-row",...e.help("motion:invert")},T("span",{class:"nc-label"},`Invert Tilt ${L}`),j.el),sw:j}},eo=Jn("X"),to=Jn("Y"),ao=T("button",{type:"button",class:"nc-page-action aria-mo-off","data-aria-action":"motion-off",...e.help("motion:off")},"Turn motion off");ao.addEventListener("click",Ae);const _r=T("div",{class:"aria-body aria-mo-more"},T("div",{class:"aria-field"},Jt,Zn),eo.row,to.row,ao),no=xe(i.supported?"Screen stays on while motion is live.":"This browser can't keep the screen on: it may sleep while you play.","motion-foot");function Ur(L){const j={off:"OFF",blocked:"BLOCKED",live:"LIVE",paused:"PAUSED",none:"NO SENSOR"}[L],W=[T("span",{class:`aria-word ${L==="live"?"aria-live":L==="paused"?"aria-quiet":"aria-off"}`,"data-state":L},T("i",{class:"aria-dot"}),j)];g==="remote"&&M==="paired"?W.push(T("b",{"data-aria":"remote-phone"},A||"Phone"),T("span",{class:"aria-sub","data-aria":"remote-delay"},`delay ${nl(R.ms,R.jitter)}`)):L==="live"&&W.push(T("span",{class:"aria-sub","data-aria":"motion-rate"},`${r?.rate()??0} readings/s`)),J.replaceChildren(...W);const Z=e.listeners();ae.textContent=L!=="live"&&L!=="paused"?"":Z===null?"standalone":Z.length?`to ${Z.join(", ")}`:"no listeners yet"}function Se(){const L=K();lt.dataset.motionState=L,lt.dataset.via=g,lt.dataset.link=g==="remote"?M:"",Ur(L);const j=g==="remote",X=j&&M==="paired";qn.hidden=j?!X||!$:L!=="live"&&L!=="paused",jn.hidden=j||L!=="paused",Rn.hidden=j||L!=="off",In.hidden=j||L!=="blocked",Hn.hidden=j||L!=="none",no.hidden=j||L!=="live"&&L!=="paused",U.hidden=j&&!X,Un.hidden=!j||X||M==="ended"||M==="idle",Kn.hidden=!j||M!=="ended"&&M!=="idle",Gn.hidden=!X,j&&(Or(),Wn.textContent=C||"Pairing ended.",Vn.textContent=X?$?q?"Held on the phone: motion stays where it is.":k?L==="paused"?"Paused: nothing from the phone for a moment.":`${x.length} readings/s from the phone.`:"Paused: the phone's screen is off or the Remote page is hidden.":"Paired. Allow motion on the phone to start.":""),oo();const W=e.settings();eo.sw.set(W.invertX),to.sw.set(W.invertY);const Z=E?Math.max(1,Math.ceil(E.remaining(f))):0;Jt.textContent=E?`Hold still… ${Z}`:"Hold still to centre",Jt.toggleAttribute("data-holding",!!E),Zn.textContent=E?`Keep it still. Centring in ${Z} s.`:m||(W.centredAt?`Centred ${Bc(Date.now()-W.centredAt)}, at the angle you held then.`:"Not centred yet: 0 is a phone held at a reading angle.")}function oo(){rt.set(u.tiltX),Ve.set(u.tiltY),qe.textContent=Zo(u.tiltX),Cn.textContent=Zo(u.tiltY),Dn.textContent=u.shake.toFixed(2),Ln.style.width=`${Math.round(u.shake*1e3)/10}%`,Tn.style.width=`${Math.round(p*1e3)/10}%`,Fn.setAttribute("aria-valuenow",u.shake.toFixed(2)),zn.textContent=f?qc(u.heading):"—";const L=w.length;Nn.textContent=L?`${L} shake${L===1?"":"s"}`:"no shakes";const j=J.querySelector('[data-aria="motion-rate"]');j&&(j.textContent=`${r?.rate()??0} readings/s`),Vr()}const st=L=>getComputedStyle(lt).getPropertyValue(L).trim();function io(L){if(e.win.document.visibilityState==="hidden")return null;const j=L.getBoundingClientRect();if(!j.width||!j.height)return null;const X=e.win.devicePixelRatio||1,W=Math.round(j.width*X),Z=Math.round(j.height*X);(L.width!==W||L.height!==Z)&&(L.width=W,L.height=Z);const le=L.getContext("2d");return le?.clearRect(0,0,W,Z),le}function Vr(){const L=e.win.devicePixelRatio||1,j=io(Wt);if(j){const{width:W,height:Z}=Wt;j.fillStyle=st("--nc-ui-divider"),j.fillRect(0,Math.round(Z/2),W,Math.max(1,Math.round(L/2))),j.fillStyle=st("--aria-magma");for(const le of w){const ea=Math.max(0,f-le.t),ta=(1-ea/fa)*W,Be=Math.max(4*L,le.s*(Z-6*L));j.globalAlpha=.35+.65*(1-ea/fa),j.fillRect(Math.round(ta-L),Math.round((Z-Be)/2),Math.round(2*L),Math.round(Be))}j.globalAlpha=1}const X=io(Xt);if(X&&f){const{width:W,height:Z}=Xt,le=u.heading*360,ta=W/180;X.fillStyle=st("--nc-ui-text-sub"),X.font=`${10*L}px ${st("--nc-ui-font-readout")||"monospace"}`,X.textAlign="center",X.textBaseline="top";for(let Be=Math.floor((le-90)/15)*15;Be<=le+90;Be+=15){const Ge=W/2+(Be-le)*ta;if(Ge<0||Ge>W)continue;const ro=(Be%360+360)%360,lo=ro%45===0,so=(lo?12:6)*L;X.fillRect(Math.round(Ge),Z-so,Math.max(1,Math.round(L)),so),lo&&Ge>14*L&&Ge<W-14*L&&X.fillText(pr[ro/45],Ge,3*L)}X.fillStyle=st("--aria-magma"),X.fillRect(Math.round(W/2-L),18*L,Math.round(2*L),Z-18*L)}}let Ye=0;function Yr(){Ye||(Ye=e.win.requestAnimationFrame(()=>{Ye=0,Se()}),e.win.setTimeout(()=>{Ye&&(e.win.cancelAnimationFrame(Ye),Ye=0,oo())},250))}return{state:K,via:()=>g,setVia:_,start(){g==="remote"&&!P&&z()},body:lt,more:_r,foot:no,paint:Se,settingsChanged:F,resume:ot,debug:()=>({state:K(),values:u,support:t,shakes:w.length,listenStart:l,wake:i.held,via:g,link:M,code:b,phone:A,delay:R.ms,jitter:R.jitter,remoteRate:x.length})}}function hr(e){const t=e.trim().toUpperCase().split(/[\s.]+/).filter(Boolean),[n,o,i="00",r="BHZ"]=t;if(!n||!o||t.length>4)return null;const l=(s,c)=>c.test(s);return!l(n,/^[A-Z0-9]{1,2}$/)||!l(o,/^[A-Z0-9]{1,5}$/)||!l(i,/^([A-Z0-9]{0,2}|--)$/)||!l(r,/^[A-Z0-9]{3}$/)?null:{net:n,sta:o,loc:i,cha:r}}const Yt=[{id:"anmo",net:"IU",sta:"ANMO",loc:"00",cha:"BHZ",name:"Albuquerque, New Mexico"},{id:"hrv",net:"IU",sta:"HRV",loc:"00",cha:"BHZ",name:"Harvard, Massachusetts"},{id:"poha",net:"IU",sta:"POHA",loc:"00",cha:"BHZ",name:"Between Mauna Loa and Mauna Kea",note:"volcanic",fallback:{net:"IU",sta:"RAO",loc:"00",cha:"BHZ",name:"Raoul Island, an active volcano"}},{id:"axial",net:"OO",sta:"AXCC1",loc:"",cha:"HHZ",name:"Axial Seamount, sea floor",note:"1.5 km down",fallback:{net:"IU",sta:"PTCN",loc:"00",cha:"BHZ",name:"Pitcairn Island, Pacific"}},{id:"qspa",net:"IU",sta:"QSPA",loc:"00",cha:"BHZ",name:"South Pole",note:"the quietest site",fallback:{net:"IU",sta:"CASY",loc:"00",cha:"BHZ",name:"Casey, Antarctica"}},{id:"tato",net:"IU",sta:"TATO",loc:"00",cha:"BHZ",name:"Taipei, Taiwan",note:"a busy city",fallback:{net:"IU",sta:"MAJO",loc:"00",cha:"BHZ",name:"Matsushiro, Japan"}}],Pc="anmo",fn={file:"anmo-2010-02-27.mseed",name:"Recorded: Albuquerque, 27 Feb 2010"},Ic={IU:{name:"Global Seismograph Network (IU)",operator:"Albuquerque Seismological Laboratory / USGS",doi:"10.7914/SN/IU"},OO:{name:"Ocean Observatories Initiative (OO)",operator:"OOI",doi:"10.7914/SN/OO"}};function gn(e){const t=Ic[e],n="real time via EarthScope Consortium (NSF SAGE)";return t?`Data: ${t.name}, ${t.operator}, doi:${t.doi} · ${n}`:`Data: network ${e} (see fdsn.org/networks/detail/${e}) · ${n}`}const Hc="The facilities of EarthScope Consortium were used for access to waveforms, related metadata, and/or derived products. These services are funded through the National Science Foundation's Seismological Facility for the Advancement of Geoscience (SAGE) Award under Cooperative Agreement EAR-1724509.",mr="netcomposer.aria",fr=1,mt={station:Pc,custom:"IU ANMO 00 BHZ",smoothing:5,hold:!1,motion:{...ai(null),on:!1,centredAt:null}},gr=.5,br=30;function vr(e){const t=e&&typeof e=="object"?e:{},n=typeof t.station=="string"&&(t.station==="custom"||t.station==="recording"||Yt.some(r=>r.id===t.station))?t.station:mt.station,o=typeof t.custom=="string"&&t.custom.length<=40?t.custom:mt.custom,i=typeof t.smoothing=="number"&&Number.isFinite(t.smoothing)?t.smoothing:mt.smoothing;return{station:n,custom:o,smoothing:Math.min(br,Math.max(gr,i)),hold:t.hold===!0,motion:jc(t.motion)}}function wr(e){return{format:mr,version:fr,settings:{...e}}}function xr(e){if(!e||typeof e!="object")return null;const t=e;return t.format!==mr||typeof t.version!="number"||t.version>fr?null:vr(t.settings)}function jc(e){const t=e&&typeof e=="object"?e:{},n=t.centredAt;return{...ai(e),on:t.on===!0,centredAt:typeof n=="number"&&Number.isFinite(n)&&n>0?n:null}}function yr(){try{const e=Number(new URLSearchParams(window.location.search).get("instance"));return Number.isInteger(e)&&e>=1&&e<=99?e:1}catch{return 1}}let We;function Oc(e,t=yr()){if(We!==void 0)return We;We=null;try{if(typeof window>"u"||window.parent===window)return We;const n=window.parent.ncStudio;n&&n.version===1&&(We=n.attach(e,{instance:t}))}catch{}return We}function _c(e){return new Worker("/aria/assets/worker-q9eWHHNw.js",{type:"module",name:e?.name})}const Gt=yr(),bn=String(Gt).padStart(2,"0"),Ne=Oc("aria",Gt),Jo="netcomposer.aria.v1",vn=Ne?.storageKey?.(Jo)??Jo,$r=`${vn}.hidden`,Uc="(max-width: 768px)";function wn(){try{return window.localStorage}catch{return null}}function Vc(){try{const e=wn()?.getItem(vn);return e?vr(JSON.parse(e)):{...mt}}catch{return{...mt}}}let Y=Vc();function Yc(){try{wn()?.setItem(vn,JSON.stringify(Y))}catch{}}function Gc(){try{const e=new URLSearchParams(location.search).get("sl");if(e&&/^wss?:\/\//.test(e))return e;const t=wn()?.getItem("netcomposer.aria.sl");if(t&&/^wss?:\/\//.test(t))return t}catch{}return"wss://rtserve.earthscope.org/seedlink"}const ga=new URL(`/aria/${fn.file}`,location.href).href,_e=e=>({[vt]:mn(e)||void 0});function Wc(e,t,n){const o=T("button",{type:"button",...t},e);return o.addEventListener("click",n),o}const Ot=(e,t,n)=>T(n?"label":"span",{class:"nc-label",...n?{for:n}:{},...t?_e(t):{}},e),ba=e=>e===null?"":e<90?`${Math.round(e)} s`:e<5400?`${Math.round(e/60)} min`:`${(e/3600).toFixed(1)} h`,kr=new _c,Ee=e=>kr.postMessage(e);let ue={state:"off",station:null,newestAgeSec:null,behindSec:null,recorded:!1,note:""},$e=null;const Ze=[];let ge=null,ut=null,Oa=!1;function _a(){Oa||(Oa=!0,Er())}function Er(){if(!Oa)return;if(Y.station==="recording"){Ee({type:"recording",recordingUrl:ga});return}const t=Yt.find(n=>n.id===Y.station)??(()=>{const n=hr(Y.custom);return n?{...n,name:`${n.net}.${n.sta}`}:null})();if(!t){Ee({type:"recording",recordingUrl:ga});return}Ee({type:"start",station:{...t,name:t.name},url:Gc(),recordingUrl:ga})}const kt=Ne?.instance??`aria#${Gt}`,me=Ne?.situationSource?.(`ARIA ${Gt}`)??null,Ua=()=>Ne?.ctx?Ne.ctx.currentTime:performance.now()/1e3;function je(e){try{me?.send(e)}catch{}}function Ar(){return me?.demand().speeds??[]}me?.onDemand(()=>{Ee({type:"speeds",speeds:Ar()}),(me?.demand().receivers??0)>0&&_a(),qr(),pe?.paint()});function xn(){const e=ue.station;return{v:1,kind:"status",source:me?.id??kt,state:ue.state,station:e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null,newestAgeSec:ue.newestAgeSec,behindSec:ue.behindSec,...ue.retryAt?{retryAt:ue.retryAt}:{},hold:Y.hold,credit:gn(e?.net??"IU"),...ue.recorded?{recorded:!0}:{},motion:pe.state()}}let ei=0;kr.onmessage=e=>{const t=e.data,n=me?.id??kt;if(t.type==="tables"){for(const o of t.tables)o.speed===1&&(ut=o.samples),Y.hold||je(ul(n,{seq:o.seq,at:Ua(),speed:o.speed,station:Xc(),behindSec:o.behindSec,samples:o.samples,rms:o.rms}));Pr()}else if(t.type==="energy"){$e=t.value;const o=performance.now();!Y.hold&&o-ei>=100&&(ei=o,je(cl(n,[{at:Ua()+.1,value:t.value}])))}else t.type==="overview"?(ge=t,$e!==null&&(Ze.push($e),Ze.length>600&&Ze.shift()),Rr(),Ir()):t.type==="status"&&(ue=t,je(xn()),zr())};function Xc(){const e=ue.station;return e?{net:e.net,sta:e.sta,loc:e.loc,cha:e.cha,name:e.name,rate:e.rate}:null}const nt=document.getElementById("app");nt.classList.add("nc","nc-page");lc();function ze(e,t){const n=e.hold!==Y.hold;Y=e,Yc(),Ee({type:"smoothing",sec:Y.smoothing}),Ee({type:"hold",on:Y.hold}),n&&je(Y.hold?ni(me?.id??kt,"hold"):xn()),t&&Er(),pe.settingsChanged(),Br()}function Kc(){const e=new Blob([JSON.stringify(wr(Y),null,2)],{type:"application/json"}),t=T("a",{href:URL.createObjectURL(e),download:`aria-${bn}.json`});t.click(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)}const Je=T("input",{type:"file",accept:".json,application/json"});Je.hidden=!0;Je.addEventListener("change",async()=>{const e=Je.files?.[0];if(Je.value="",!(!e||e.size>64*1024))try{const t=xr(JSON.parse(await e.text()));t&&ze(t,!0)}catch{}});const Va=(e,t,n)=>Wc(e,{class:"nc-page-action","data-aria-action":n,..._e(`page:${n}`)},t),Ya=Va("Hold",()=>ze({...Y,hold:!Y.hold},!1),"hold"),ti=pc({panel:T("div",{},Va("Save",Kc,"save"),Va("Load",()=>Je.click(),"load"))}),Qc=T("header",{class:"nc-page-hd"},T("div",{},T("h1",{class:"nc-page-title"},T("span",{class:"aria-brand"},"ARIA")," ",T("span",{class:"nc-page-sep"},"/")," SITUATION ",T("span",{class:"nc-page-sep"},"/")," ",T("span",{class:"nc-mono"},bn)),T("p",{class:"nc-page-sub"},"A TRIKI instrument.")),T("div",{class:"nc-page-actions"},Ya,ti.panel,ti.button,Je)),Mr=T("div",{class:"nc-stack aria-stack","data-nc-layout":"adjacent"}),Sr=T("span",{class:"aria-credit","data-aria":"credit",title:Hc},gn("IU")),Zc=T("footer",{class:"aria-foot"},Sr,T("span",{},`netcomposer.situation.${bn}`));nt.append(Qc,T("main",{class:"nc-page-body"},Mr),Zc);function yn(e,t,n,o=()=>[],i={},r,l=()=>[]){const s=r??T("div",{class:"aria-body","data-aria-module":e}),c={[`${e}-mount`]:s,...i},d=()=>({id:e,title:t,summary:n(),controls:[...l(),{type:"label",id:`${e}-mount`,text:""},...o()]}),u=xc(d(),$r),p=()=>{for(const[f,h]of Object.entries(c)){const w=u.el.querySelector(`[data-nc-id="${f}"]`);w&&w.nextSibling!==h&&w.after(h)}};return p(),{handle:u,mount:s,update(){u.update(d()),p()}}}const Jc=()=>Y.station==="recording"?fn.name:Yt.find(e=>e.id===Y.station)?.name??Y.custom.toUpperCase(),$n=window.matchMedia(Uc).matches;$n&&hc(["station","signals"],$r);const kn=yn("station","Station",()=>ue.state==="live"?`${ue.station?.sta??Jc()} · live`:ue.recorded?"recorded":ue.state),En=yn("signals","Signals",()=>$e===null?"Energy —":`Energy ${$e.toFixed(2)}`),at=T("select",{class:"nc-select",id:"aria-station","data-aria-id":"station"});for(const e of Yt)at.append(T("option",{value:e.id},e.note?`${e.name} · ${e.note}`:e.name));at.append(T("option",{value:"custom"},"Other station…"),T("option",{value:"recording"},fn.name));at.addEventListener("change",()=>ze({...Y,station:at.value},!0));const ft=T("input",{class:"nc-field-input aria-custom",id:"aria-custom",type:"text",spellcheck:"false",autocomplete:"off",placeholder:"NET STA LOC CHA","data-aria-id":"custom",..._e("custom")});ft.addEventListener("change",()=>{hr(ft.value)&&ze({...Y,custom:ft.value.trim().toUpperCase()},!0)});const Cr=T("span",{class:"nc-mono aria-small aria-sub","data-aria":"code"}),Lr=T("div",{class:"aria-status",role:"status","data-aria":"status",..._e("status")}),Ga=T("p",{class:"aria-small aria-sub aria-mono","data-aria":"note"}),Wa=T("canvas",{class:"aria-wave","data-aria":"wave",..._e("wave")});kn.mount.append(T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Station","station","aria-station"),Cr),at),T("div",{class:"aria-field","data-aria":"custom-row"},Ot("Network station location channel","custom","aria-custom"),ft),Lr,Ga,T("div",{class:"aria-field"},Wa,T("div",{class:"aria-row-between aria-small aria-sub aria-mono aria-ends"},T("span",{},"−10 min"),T("span",{},"the line is where ARIA plays · the shaded slice is the table"),T("span",{},"now"))));const Xa=T("canvas",{class:"aria-cycle","data-aria":"table",..._e("table")}),Tr=T("span",{class:"aria-small aria-sub aria-mono","data-aria":"to"}),Fr=T("span",{class:"aria-energy-val","data-aria":"energy"},"—"),Dr=T("i",{}),Nr=T("div",{class:"aria-meter",role:"meter","aria-label":"Energy","aria-valuemin":"0","aria-valuemax":"1","data-aria":"meter"},Dr),Ka=T("canvas",{class:"aria-history","data-aria":"history"}),An=oc({id:"aria-smoothing",label:"Smoothing",min:gr,max:br,step:.1,value:Y.smoothing,taper:"time",format:e=>`${e.toFixed(1)} s`,onInput:e=>ze({...Y,smoothing:Math.round(e*10)/10},!1)});An.el.setAttribute(vt,mn("smoothing"));En.mount.append(T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Ground table","table"),Tr),Xa,T("div",{class:"aria-row-between aria-small aria-sub aria-mono"},T("span",{},"256 samples · mirrored"),T("span",{},"5 shapes a second"))),T("div",{class:"aria-field"},T("div",{class:"aria-row-between"},Ot("Energy","energy"),Fr),Nr,Ka,T("div",{class:"aria-row-between aria-small aria-sub aria-mono"},T("span",{},"−10 min"),T("span",{},"now"))),An.el,T("p",{class:"aria-small aria-sub aria-mono"},"Runs whether the Studio is playing or stopped."));const eu=()=>Y.motion,pe=Rc({win:window,settings:eu,save:e=>ze({...Y,motion:e},!1),send:je,sourceId:()=>me?.id??kt,ctxNow:Ua,listeners:()=>me?me.demand().motionNames??[]:null,held:()=>Y.hold,onState:()=>{je(xn()),Mn()},help:_e,studioUrl:"netcomposer.art/studio",sceneName:()=>{try{const e=window.parent!==window?window.parent.document.querySelector("input.scene-name"):null;return e&&"value"in e?String(e.value??""):""}catch{return""}}}),tu={off:"off",blocked:"blocked",live:"live",paused:"paused",none:"no sensor"},wt=yn("phone","My phone",()=>tu[pe.state()]??"",()=>[{type:"group",id:"aria-motion-more",title:"More",summary:au(),controls:[{type:"slider",id:"aria-motion-smooth",label:"Smooth",min:0,max:100,step:1,value:Math.round(Y.motion.smooth*100),valueText:`${Math.round(Y.motion.smooth*100)}%`,onChange:e=>ze({...Y,motion:{...Y.motion,smooth:e/100}},!1)},{type:"label",id:"phone-more-mount",text:""}]},{type:"label",id:"phone-foot-mount",text:""}],{"phone-more-mount":pe.more,"phone-foot-mount":pe.foot},pe.body,()=>[{type:"choice",id:"aria-motion-via",label:"Motion from",value:pe.via(),options:[{value:"device",label:"This device"},{value:"remote",label:"A phone with this Studio"}],onChange:e=>{pe.setVia(e==="remote"?"remote":"device"),Mn()}}]);function au(){const e=Y.motion;return`Smooth ${Math.round(e.smooth*100)}% · ${e.centredAt?"centred":"not centred"} · ${e.invertX&&e.invertY?"invert X and Y":e.invertX?"invert X":e.invertY?"invert Y":"invert off"}`}wt.handle.el.querySelector('[data-nc-id="aria-motion-smooth"]')?.setAttribute(vt,mn("motion:smooth"));yc(Mr,[kn.handle,En.handle,wt.handle],"adjacent");$n&&(wt.handle.el.dataset.ncShade="1");function zr(){const e=ue,t=e.recorded&&e.state!=="live"?"RECORDED":e.state.toUpperCase(),n=[T("span",{class:`aria-word aria-${e.state}`,"data-state":e.state},T("i",{class:"aria-dot"}),t)];e.station?.rate&&n.push(T("span",{class:"aria-sub"},`${e.station.rate} samples/s`)),e.newestAgeSec!==null&&n.push(T("span",{},`newest ${ba(e.newestAgeSec)} ago`)),e.behindSec!==null&&n.push(T("span",{"data-aria":"behind"},`playing ${ba(e.behindSec)} behind now`)),e.state==="offline"&&e.retryAt&&n.push(T("span",{class:"aria-sub"},`retry ${ba(Math.max(0,(e.retryAt-Date.now())/1e3))}`)),Lr.replaceChildren(...n),Ga.textContent=e.note,Ga.hidden=!e.note,Cr.textContent=e.station?[e.station.net,e.station.sta,e.station.loc,e.station.cha].join("."):"",Sr.textContent=gn(e.station?.net??"IU"),kn.update()}function qr(){const e=me?.demand();Tr.textContent=e?.names.length?`to ${e.names.join(", ")}`:Ne?"no instrument listens yet":"standalone"}function Br(){at.value=Y.station,ft.value=Y.custom,nt.querySelector('[data-aria="custom-row"]').hidden=Y.station!=="custom",Ya.setAttribute("aria-pressed",String(Y.hold)),Ya.classList.toggle("aria-held",Y.hold),An.set(Y.smoothing),zr(),qr(),Mn()}function Mn(){wt.update();const e=wt.handle.el.querySelector('[data-nc-id="aria-motion-more"]'),t=pe.state();e&&(e.hidden=t!=="live"&&t!=="paused"),pe.paint()}const Te=e=>getComputedStyle(nt).getPropertyValue(e).trim();function Sn(e){if(document.visibilityState==="hidden")return null;const t=e.getBoundingClientRect();if(!t.width||!t.height)return null;const n=window.devicePixelRatio||1,o=Math.round(t.width*n),i=Math.round(t.height*n);(e.width!==o||e.height!==i)&&(e.width=o,e.height=i);const r=e.getContext("2d");return r?.clearRect(0,0,o,i),r}function Rr(){const e=Sn(Wa);if(!e||!ge)return;const{width:t,height:n}=Wa,o=ge.min.length;e.fillStyle=Te("--nc-ui-divider");for(let i=1;i<5;i++)e.fillRect(Math.round(i*t/5),0,1,n);if(Number.isFinite(ge.playhead)){const i=ge.playhead*t;e.globalAlpha=.14,e.fillStyle=Te("--aria-magma"),e.fillRect(i-ge.window*t,0,Math.max(1,ge.window*t),n),e.globalAlpha=1}e.fillStyle=Te("--aria-magma");for(let i=0;i<o;i++){const r=Math.floor(i/o*t),l=n/2-ge.max[i]*(n/2-2),s=n/2-ge.min[i]*(n/2-2);e.fillRect(r,l,Math.max(1,Math.ceil(t/o)),Math.max(1,s-l))}Number.isFinite(ge.playhead)&&(e.fillStyle=Te("--nc-ui-accent"),e.fillRect(Math.round(ge.playhead*t)-1,0,2,n))}function Pr(){const e=Sn(Xa);if(!e||!ut)return;const{width:t,height:n}=Xa;e.fillStyle=Te("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),e.strokeStyle=Te("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.beginPath();for(let o=0;o<ut.length;o+=4){const i=o/ut.length*t,r=n/2-ut[o]*(n/2-3);o?e.lineTo(i,r):e.moveTo(i,r)}e.stroke()}function Ir(){Fr.textContent=$e===null?"—":$e.toFixed(2),Dr.style.width=`${Math.round(($e??0)*100)}%`,Nr.setAttribute("aria-valuenow",$e===null?"0":$e.toFixed(2)),En.update();const e=Sn(Ka);if(!e)return;const{width:t,height:n}=Ka;e.fillStyle=Te("--nc-ui-divider"),e.fillRect(0,Math.round(n/2),t,1),Ze.length&&(e.beginPath(),Ze.forEach((o,i)=>{const r=(600-Ze.length+i)/599*t,l=n-o*n;i?e.lineTo(r,l):e.moveTo(r,l)}),e.strokeStyle=Te("--aria-magma"),e.lineWidth=1.5*(window.devicePixelRatio||1),e.stroke())}window.addEventListener("resize",()=>{Rr(),Pr(),Ir()});Ne?.providePreset?.({format:"netcomposer.aria",version:1,get:()=>wr(Y),set:e=>{const t=xr(e);t&&ze(t,t.station!==Y.station||t.custom!==Y.custom)}});window.addEventListener("pagehide",()=>{je(ni(me?.id??kt,"removed")),Ee({type:"stop"})});$n&&(nt.dataset.ariaPhone="");Ee({type:"smoothing",sec:Y.smoothing});Ee({type:"hold",on:Y.hold});Ee({type:"speeds",speeds:Ar()});Br();pe.resume();pe.start();window.__ARIA_MOTION__=pe.debug;if(!Ne||(me?.demand().receivers??0)>0)_a();else{const e=setInterval(()=>{document.visibilityState==="visible"&&nt.getBoundingClientRect().width>0&&(clearInterval(e),_a())},1e3)}
