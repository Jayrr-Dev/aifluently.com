import{s as v,e as f,i as _,I as d,d as c,o as I,a0 as D,z as u,A as m,f as S,g as E,h as p,W as g,D as H,H as L,G as N,F as w,a1 as h,T as A}from"./scheduler.QZSgJ5Dp.js";import{g as y}from"./spread.rEx3vLA9.js";import{S as T,i as j}from"./index.lCWGoTYW.js";import{c as q,g as z}from"./store.Jk9-US9L.js";function b(o){let e;function t(l,n){return l[0].svg?F:C}let a=t(o),s=a(o);return{c(){s.c(),e=f()},l(l){s.l(l),e=f()},m(l,n){s.m(l,n),_(l,e,n)},p(l,n){a===(a=t(l))&&s?s.p(l,n):(s.d(1),s=a(l),s&&(s.c(),s.m(e.parentNode,e)))},d(l){l&&c(e),s.d(l)}}}function C(o){let e,t=[o[0].attributes],a={};for(let s=0;s<t.length;s+=1)a=u(a,t[s]);return{c(){e=S("span"),this.h()},l(s){e=E(s,"SPAN",{}),p(e).forEach(c),this.h()},h(){g(e,a)},m(s,l){_(s,e,l)},p(s,l){g(e,a=y(t,[l&1&&s[0].attributes]))},d(s){s&&c(e)}}}function F(o){let e,t,a=o[0].body+"",s=[o[0].attributes],l={};for(let n=0;n<s.length;n+=1)l=u(l,s[n]);return{c(){e=H("svg"),t=new L(!0),this.h()},l(n){e=N(n,"svg",{});var i=p(e);t=w(i,!0),i.forEach(c),this.h()},h(){t.a=null,h(e,l)},m(n,i){_(n,e,i),t.m(a,e)},p(n,i){i&1&&a!==(a=n[0].body+"")&&t.p(a),h(e,l=y(s,[i&1&&n[0].attributes]))},d(n){n&&c(e)}}}function G(o){let e,t=o[0]&&b(o);return{c(){t&&t.c(),e=f()},l(a){t&&t.l(a),e=f()},m(a,s){t&&t.m(a,s),_(a,e,s)},p(a,[s]){a[0]?t?t.p(a,s):(t=b(a),t.c(),t.m(e.parentNode,e)):t&&(t.d(1),t=null)},i:d,o:d,d(a){a&&c(e),t&&t.d(a)}}}function M(o,e,t){const a={name:"",loading:null,destroyed:!1};let s=!1,l=0,n;const i=r=>{typeof e.onLoad=="function"&&e.onLoad(r),A()("load",{icon:r})};function k(){t(3,l++,l)}return I(()=>{t(2,s=!0)}),D(()=>{t(1,a.destroyed=!0,a),a.loading&&(a.loading.abort(),t(1,a.loading=null,a))}),o.$$set=r=>{t(6,e=u(u({},e),m(r)))},o.$$.update=()=>{{const r=q(e.icon,a,s,k,i);t(0,n=r?z(r.data,e):null),n&&r.classes&&t(0,n.attributes.class=(typeof e.class=="string"?e.class+" ":"")+r.classes.join(" "),n)}},e=m(e),[n,a,s,l]}class O extends T{constructor(e){super(),j(this,e,M,G,v,{})}}export{O as I};
