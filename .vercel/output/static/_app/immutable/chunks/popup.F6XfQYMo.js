import{w as I}from"./index.Naitio2P.js";import{U as M}from"./scheduler.cyAdSMMW.js";const T=I(void 0);function z(n,e){const{computePosition:E,autoUpdate:P,offset:h,shift:y,flip:b,arrow:L,size:$,autoPlacement:k,hide:U,inline:x}=M(T),r={open:!1,autoUpdateCleanup:()=>{}},d=':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';let s;const a="https://www.skeleton.dev/utilities/popups";let t,p;function A(){t=document.querySelector(`[data-popup="${e.target}"]`)??document.createElement("div"),p=t.querySelector(".arrow")??document.createElement("div")}A();function c(){if(!t)throw new Error(`The data-popup="${e.target}" element was not found. ${a}`);if(!E)throw new Error(`Floating UI 'computePosition' not found for data-popup="${e.target}". ${a}`);if(!h)throw new Error(`Floating UI 'offset' not found for data-popup="${e.target}". ${a}`);if(!y)throw new Error(`Floating UI 'shift' not found for data-popup="${e.target}". ${a}`);if(!b)throw new Error(`Floating UI 'flip' not found for data-popup="${e.target}". ${a}`);if(!L)throw new Error(`Floating UI 'arrow' not found for data-popup="${e.target}". ${a}`);const o=[];$&&o.push($(e.middleware?.size)),k&&o.push(k(e.middleware?.autoPlacement)),U&&o.push(U(e.middleware?.hide)),x&&o.push(x(e.middleware?.inline)),E(n,t,{placement:e.placement??"bottom",middleware:[h(e.middleware?.offset??8),y(e.middleware?.shift??{padding:8}),b(e.middleware?.flip),L(e.middleware?.arrow??{element:p||null}),...o]}).then(({x:i,y:m,placement:v,middlewareData:C})=>{if(Object.assign(t.style,{left:`${i}px`,top:`${m}px`}),p){const{x:F,y:D}=C.arrow,q={top:"bottom",right:"left",bottom:"top",left:"right"}[v.split("-")[0]];Object.assign(p.style,{left:F!=null?`${F}px`:"",top:D!=null?`${D}px`:"",right:"",bottom:"",[q]:"-4px"})}})}function l(){t&&(r.open=!0,e.state&&e.state({state:r.open}),c(),t.style.display="block",t.style.opacity="1",t.style.pointerEvents="auto",t.removeAttribute("inert"),r.autoUpdateCleanup=P(n,t,c),s=Array.from(t?.querySelectorAll(d)))}function u(o){if(!t)return;const i=parseFloat(window.getComputedStyle(t).transitionDuration.replace("s",""))*1e3;setTimeout(()=>{r.open=!1,e.state&&e.state({state:r.open}),t.style.opacity="0",t.setAttribute("inert",""),r.autoUpdateCleanup&&r.autoUpdateCleanup(),o&&o()},i)}function f(){r.open===!1?l():u()}function w(o){if(r.open===!1||n.contains(o.target))return;if(t&&t.contains(o.target)===!1){u();return}const i=e.closeQuery===void 0?"a[href], button":e.closeQuery;if(i==="")return;t?.querySelectorAll(i)?.forEach(v=>{v.contains(o.target)&&u()})}const S=o=>{if(r.open===!1)return;const i=o.key;if(i==="Escape"){o.preventDefault(),n.focus(),u();return}s=Array.from(t?.querySelectorAll(d)),r.open&&document.activeElement===n&&(i==="ArrowDown"||i==="Tab")&&d.length>0&&s.length>0&&(o.preventDefault(),s[0].focus())};switch(e.event){case"click":n.addEventListener("click",f,!0),window.addEventListener("click",w,!0);break;case"hover":n.addEventListener("mouseover",l,!0),n.addEventListener("mouseleave",()=>u(),!0);break;case"focus-blur":n.addEventListener("focus",f,!0),n.addEventListener("blur",()=>u(),!0);break;case"focus-click":n.addEventListener("focus",l,!0),window.addEventListener("click",w,!0);break;default:throw new Error(`Event value of '${e.event}' is not supported. ${a}`)}return window.addEventListener("keydown",S,!0),c(),{update(o){u(()=>{e=o,c(),A()})},destroy(){n.removeEventListener("click",f,!0),n.removeEventListener("mouseover",l,!0),n.removeEventListener("mouseleave",()=>u(),!0),n.removeEventListener("focus",f,!0),n.removeEventListener("focus",l,!0),n.removeEventListener("blur",()=>u(),!0),window.removeEventListener("click",w,!0),window.removeEventListener("keydown",S,!0)}}}export{z as p,T as s};
