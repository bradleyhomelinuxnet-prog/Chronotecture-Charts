const { chromium } = require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:900}});
const files=fs.readdirSync('../../redesign').filter(f=>f.endsWith('.html'));
for(const f of files){await p.goto('file://../../redesign/'+f);await p.waitForTimeout(250);
 const out=await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);
  const cards=[...document.querySelectorAll('.card')];let s='TITLE '+document.title+'\nKICKER '+(document.querySelector('.kicker,.kick')||{}).innerText+'\n';
  for(const c of cards){const h=c.querySelector('h2');const ht=h?h.innerText:'';
    c.querySelectorAll('svg').forEach(x=>x.remove());const k=c;s+='\n#### '+ht+'\n'+k.innerText+'\n';}
  return s;});
 fs.writeFileSync('dump/'+f.replace('.html','.txt'),out);}
await b.close();})();
