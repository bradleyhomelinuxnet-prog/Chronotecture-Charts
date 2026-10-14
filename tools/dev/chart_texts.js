// Writes text/pNNN.txt for each chart plate from the "Full transcription" of its redesign.
// Run from the repo root: NODE_PATH=$(npm root -g) node tools/dev/chart_texts.js
const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const R=JSON.parse(fs.readFileSync('viewer.js','utf8').match(/var REDESIGNS=(\{.*?\});/)[1]);
R['p019.html']=['iib.html','Chart II·b'];R['p020.html']=['iic.html','Chart II·c'];R['p119.html']=['p119.html','Plate 119'];
let n=0;
for(const k in R){if(fs.existsSync('text/'+k.replace('.html','.txt')))continue;
 await p.goto('file://'+process.cwd()+'/redesign/'+R[k][0]);await p.waitForTimeout(300);
 const t=await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);
  const d=[...document.querySelectorAll('details')].find(x=>/transcri|source/i.test(x.innerText.slice(0,60)))||document.querySelector('details');
  const sub=(document.querySelector('h1 .sub')||{}).textContent||document.title;
  if(!d)return null;const out=[];
  d.querySelectorAll('h3, li, p').forEach(e=>{const s=e.innerText.replace(/\s+/g,' ').trim();if(!s)return;
    if(e.tagName==='H3')out.push('\n'+s.charAt(0)+s.slice(1).toLowerCase()+'\n');else if(e.tagName==='LI')out.push('* '+s);else out.push('\n'+s+'\n');});
  return {sub:sub.trim(),body:out.join('\n').replace(/\n{3,}/g,'\n\n').trim()};});
 if(!t||!t.body)continue;const num=parseInt(k.slice(1,4),10);
 fs.writeFileSync('text/'+k.replace('.html','.txt'),'Plate '+num+' · '+R[k][1]+' · transcription of the drawn plate\n'+t.sub+'\n\n'+t.body.replace(/\n(?=\* )/g,'\n')+'\n');n++;}
console.log('wrote',n);await b.close();})();
