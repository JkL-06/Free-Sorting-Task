import{d as h,o as p,c as y,u as g,R as _,a as v,b as w,e as E,f as L}from"./vendor-Cyi8N_cm.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();h("color-scheme",{state(){return window.matchMedia("(prefers-color-scheme: dark)").matches?{colorScheme:"dark"}:{colorScheme:"light"}},getters:{currScheme(){return this.colorScheme}},actions:{switch(n){this.colorScheme=n}}});const P={__name:"App",setup(n){return(o,c)=>(p(),y(g(_)))}},S="modulepreload",R=function(n,o){return new URL(n,o).href},d={},b=function(o,c,i){let e=Promise.resolve();if(c&&c.length>0){const t=document.getElementsByTagName("link");e=Promise.all(c.map(r=>{if(r=R(r,i),r in d)return;d[r]=!0;const a=r.endsWith(".css"),m=a?'[rel="stylesheet"]':"";if(!!i)for(let l=t.length-1;l>=0;l--){const u=t[l];if(u.href===r&&(!a||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${m}`))return;const s=document.createElement("link");if(s.rel=a?"stylesheet":S,a||(s.as="script",s.crossOrigin=""),s.href=r,document.head.appendChild(s),a)return new Promise((l,u)=>{s.addEventListener("load",l),s.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${r}`)))})}))}return e.then(()=>o()).catch(t=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=t,window.dispatchEvent(r),!r.defaultPrevented)throw t})},O=v({history:w("./"),routes:[{path:"/exper",name:"jspsych",component:()=>b(()=>import("./default-Bzc-6Zv9.js"),__vite__mapDeps([0,1,2]),import.meta.url),alias:"/"}]}),k=E(),f=L(P);f.use(k);f.use(O);f.mount("#app");document.body.parentElement.classList.add("light");
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./default-Bzc-6Zv9.js","./vendor-Cyi8N_cm.js","./default-De3FlEkE.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}