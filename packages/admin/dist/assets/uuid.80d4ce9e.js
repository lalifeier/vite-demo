/**
 * name: @vvap/admin
 * version: v0.0.1
 * description: 
 * author: lalifeier
 * email: lalifeier@gmail.com
 * homepage: https://lalifeier.github.io
 */
function e(){return"10000000-1000-4000-8000-100000000000".replace(/[018]/g,t=>{const r=Number.parseInt(t,10);return(r^crypto.getRandomValues(new Uint8Array(1))[0]&15>>r/4).toString(16)})}export{e as u};
//# sourceMappingURL=uuid.80d4ce9e.js.map
