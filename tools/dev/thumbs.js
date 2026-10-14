const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:1172}});
const m=fs.readFileSync('viewer.js','utf8').match(/var REDESIGNS=(\{.*?\});/)[1];const R=JSON.parse(m);
R['p019.html']=['iib.html'];R['p020.html']=['iic.html'];R['p119.html']=['p119.html'];
for(const k in R){await p.goto('file://'+process.cwd()+'/redesign/'+R[k][0]);await p.waitForTimeout(500);
 await p.evaluate(()=>{const a=document.querySelector('a[href="../index.html"]');if(a)a.style.display='none';});
 await p.screenshot({path:'t-'+k.replace('.html','')+'.png'});}
console.log(Object.keys(R).length);await b.close();})();
