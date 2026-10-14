const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:900}});
const files=fs.readdirSync('../../redesign').filter(f=>f.endsWith('.html'));const all={};
for(const f of files){await p.goto('file://../../redesign/'+f);await p.waitForTimeout(250);
 all[f.replace('.html','')]=await p.evaluate(()=>{
  const r=[...document.querySelectorAll('.mrow')].map(m=>{const g=s=>{const e=m.querySelector(s);return e?e.innerText.trim():''};return {eq:g('.eq'),cap:g('.cap'),aw:g('.aw'),all:m.innerText.trim()}});
  const t=[...document.querySelectorAll('table tr')].map(tr=>tr.innerText.trim());
  return {kicker:(document.querySelector('.kicker,.kick')||{innerText:''}).innerText,title:document.title,rows:r,table:t};});}
fs.writeFileSync('rows.json',JSON.stringify(all,null,1));
for(const k in all)if(all[k].rows.length<3)console.log(k,all[k].rows.length,all[k].table.length);
await b.close();})();
