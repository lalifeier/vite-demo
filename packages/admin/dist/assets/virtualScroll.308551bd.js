/**
 * name: @vvap/admin
 * version: v0.0.1
 * description: 
 * author: lalifeier
 * email: lalifeier@gmail.com
 * homepage: https://lalifeier.github.io
 */
import{c as x}from"./format.faa86510.js";import{k as v,r as y,h as S,a as u,u as s,ad as I,ae as g,x as r,n as b,v as z,T as L,q as V,_ as $,a8 as k}from"./vendor.5ada8107.js";import{_ as C}from"./plugin-vue_export-helper.21dcd24c.js";const M={data:{type:Array,default:()=>[]},itemSize:{type:Number,default:0,required:!0},bufferSize:{type:Number,default:0}};var N=v({name:"VirtualList",props:M,setup(t,{slots:l}){const n=y(null),a=S({startOffset:0,startIndex:0,endIndex:0}),f=u(()=>{const e=s(n);return e?Math.ceil(e.clientHeight/t.itemSize)+t.bufferSize:0}),m=u(()=>{const{data:e=[]}=t;return e.slice(a.startIndex,Math.min(a.endIndex,e.length))});I(()=>{const e=s(n);!e||(g(e,"scroll",c),o())});function c(e){var i;const d=((i=n.value)==null?void 0:i.scrollTop)||0;o(d)}function o(e=0){a.startIndex=Math.floor(e/t.itemSize),a.endIndex=a.startIndex+f.value,a.startOffset=a.startIndex*t.itemSize}const p=u(()=>({height:x(t.data.length*t.itemSize)})),h=u(()=>({transform:`translate3d(0,${a.startOffset}px,0)`}));return()=>r("div",{ref:n,class:"infinite-list-container"},[r("div",{class:"infinite-list-phantom",style:s(p)},null),r("div",{class:"infinite-list",style:s(h)},[s(m).map((e,d)=>{var i;return r("div",{class:"infinite-list-item",key:d},[(i=l.default)==null?void 0:i.call(l,{index:d,item:e})])})])])}});let _=[];for(let t=0;t<1e7;t++)_.push(t);const T=v({components:{VirtualList:N},setup(){return{data:_}}}),j={class:"virtual-list-demo virtual-list-demo-1"},B={class:"virtual-list-demo-item"};function D(t,l,n,a,f,m){const c=b("VirtualList");return z(),L("div",j,[r(c,{style:{height:"100vh"},data:t.data,"item-size":40,"buffer-size":0},{default:V(({item:o})=>[$("div",B,k(o),1)]),_:1},8,["data"])])}var w=C(T,[["render",D],["__scopeId","data-v-6dff2ffb"]]);export{w as default};
//# sourceMappingURL=virtualScroll.308551bd.js.map
