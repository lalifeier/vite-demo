/**
 * name: @vvap/admin
 * version: v0.0.1
 * description: 
 * author: lalifeier
 * email: lalifeier@gmail.com
 * homepage: https://lalifeier.github.io
 */
import{k as c,S as p,u,v as _,T as i}from"./vendor.5ada8107.js";const h=c({setup(l){const{currentRoute:o,replace:a}=p(),{params:e,query:s}=u(o),{path:r,_redirect_type:n="path"}=e;Reflect.deleteProperty(e,"_redirect_type"),Reflect.deleteProperty(e,"path");const t=Array.isArray(r)?r.join("/"):r;return a(n==="name"?{name:t,query:s,params:e}:{path:t.startsWith("/")?t:"/"+t,query:s}),(d,f)=>(_(),i("div"))}});export{h as default};
//# sourceMappingURL=index.e4d83da1.js.map
