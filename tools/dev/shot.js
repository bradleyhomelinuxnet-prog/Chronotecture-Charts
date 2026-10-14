const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];
 for(const a of process.argv.slice(2)){const [f,w]=a.split('@');const p=await b.newPage({viewport:{width:+(w||1400),height:900}});
  p.on('pageerror',e=>errs.push(f+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(f+': '+m.text())});
  await p.goto('file://../../redesign/'+f+'.html');await p.waitForTimeout(400);
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  await p.screenshot({path:'../../shot-'+f+'-'+(w||1400)+'.png',fullPage:true});await p.close();}
 console.log(errs.length?errs.join('\n'):'no errors');await b.close();})();
