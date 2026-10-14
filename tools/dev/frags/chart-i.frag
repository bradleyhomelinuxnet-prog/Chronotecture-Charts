---TITLE---
Chronotecture · Chart I — The Pyramid-Inch Calendar
---CSS---
---BODY---
  <header class="masthead">
    <div class="kicker">Lost Science of Prophetic Engineering · Chart&nbsp;I · Plate&nbsp;13</div>
    <h1>Chronotecture
      <span class="sub">The Pyramid-Inch Calendar — 3361&nbsp;P″ + 2435&nbsp;AM = 5796&nbsp;AM [1902&nbsp;AD]</span>
    </h1>
    <p class="prov">A rebuild of Jason&nbsp;M.&nbsp;Breshears’ hand-drawn chart&nbsp;I (Breshears&nbsp;’06), with every date, measurement and annotation preserved verbatim; only the visual language is new. Its premise: <b>one pyramid-inch (P″) is one year</b>. The two passages meet at 1460&nbsp;BC [2435&nbsp;AM]; the Ascendant Passage runs <b>3361&nbsp;P″</b> from there to the face of the Great Step, giving <b>1902&nbsp;AD</b>, the start of the Giza Course Countdown Calendar, and the Descendant Passage runs <b>3036&nbsp;P″</b> down to its end joint.</p>
  </header>

  <div class="grid">
    <div class="card">
      <h2>Section through the passages</h2>
      <div class="hint">South face left, north face right, as on the plate. The Passage Conjunct Axis rises from the junction; the Central Axis stands at the face of the Great Step. Hover or tap a passage, axis or note. <span class="anchor-key"><i></i>1460 BC [2435 AM] · 1902 AD [5796 AM]</span></div>
      <div class="swipe">⟷ swipe to pan the section</div>
      <div class="scroller" data-focus=".5"><svg id="art" class="mid" viewBox="0 0 1000 700" role="img" aria-label="Section through the Great Pyramid passages, chart I"></svg></div>
    </div>
    <div class="bottom">
      <div class="card"><h2>Cycle mathematics</h2><div class="hint">The arithmetic actually written on the plate, checked (AM&nbsp;=&nbsp;3895&nbsp;−&nbsp;BC; AD&nbsp;+&nbsp;3894; no year zero). Figures that do not hold are kept and marked <i>as written</i>.</div><div class="mathgrid">
        <div class="mrow"><span class="eq">3361 + 2435 = 5796</span><span class="cap">“3361&nbsp;P″ + 2435&nbsp;AM [1460&nbsp;BC] = 5796&nbsp;AM; 1902&nbsp;AD start of Giza Course Countdown Calendar.”</span></div>
        <div class="mrow"><span class="eq">5796 AM = 1902 AD · 2435 AM = 1460 BC</span><span class="cap">Both conversions hold on the Anno Mundi count from 3895&nbsp;BC.</span></div>
        <div class="mrow"><span class="eq">414 × 14 = 5796</span><span class="cap">“5796&nbsp;AM [1902&nbsp;AD] is exactly 414×14 years, a sum referencing the Stonehenge Cursed Earth system.”</span></div>
        <div class="mrow"><span class="eq">3036 − 2436 = 600</span><span class="cap">“Differential of 600 between axis date of 2436 Annus Mundi and remaining 3036&nbsp;P″ down Descendant Passage.”</span><span class="aw">note — the sum holds as written; the same axis is 2435&nbsp;AM [1460&nbsp;BC] elsewhere on the plate, and 3036 − 2435 = 601</span></div>
        <div class="mrow"><span class="eq">365 × 4 = 1460</span><span class="cap">“Enoch ascended in 365th year: 365×4 = 1460.”</span></div>
        <div class="mrow"><span class="eq">2908 BC → 1460 BC = 1448 yrs = 144.8 decades</span><span class="cap">“This is 144.8 decades after Enoch’s ascent in Achuzan 2908&nbsp;BC [987&nbsp;AM].” 2908&nbsp;BC = 987&nbsp;AM holds.</span></div>
      </div><div style="font-size:12.5px;color:var(--muted);line-height:1.6">Read together with chart&nbsp;I·e: the 1902&nbsp;AD [5796&nbsp;AM] found here is the start of the 204-year Giza Course Countdown to 2106&nbsp;AD [6000&nbsp;AM].</div></div>
      <div class="card"><h2>Full transcription</h2><div class="hint">Every annotation on the plate, verbatim (capitalisation normalised), grouped by region.</div><details class="tx"><summary>Show transcription</summary><div class="cols">
        <div><h3>Header</h3><ul><li>I</li><li>Breshears ’06</li></ul></div>
        <div><h3>Pyramid (upper section)</h3><ul><li>South face</li><li>North face 51′51</li><li>Central axis at face of Great Step</li><li>3361 P″ (ascending line inside the circle)</li><li>3036 P″ (dashed descending line below the base)</li><li>3361 P″ + 2435 AM [1460 BC] = 5796 AM; <u>1902 AD</u> start of Giza Course Countdown Calendar</li></ul></div>
        <div><h3>Notes</h3><ul><li>5796 AM [1902 AD] is exactly 414×14 years, a sum referencing the <u>Stonehenge Cursed Earth</u> system.</li><li>Differential of 600 between axis date of 2436 Annus Mundi and remaining 3036 P″ down Descendant Passage, exhibiting relation to <u>Anunnaki Ner</u> system.</li></ul></div>
        <div><h3>Passages (lower section)</h3><ul><li>Ascendant Passage</li><li>3361 P″ to face of Great Step</li><li>Descendant Passage</li><li>3036 P″ to passage end joint</li><li>Pyramid entry</li><li>Passage conjunct axis</li><li>52 P″ (four bore heights: two on the Ascendant, one at the junction, one on the Descendant)</li></ul></div>
        <div><h3>Enoch</h3><ul><li>Enoch ascended in 365<sup>th</sup> year: 365×4 = <u>1460</u></li><li>1460 BC [2435 Annus Mundi] This is 144.8 decades after Enoch’s ascent in Achuzan 2908 BC [987 AM], Enoch’s 365<sup>th</sup> year.</li></ul></div>
      </div></details><div class="foot">Source: J.&nbsp;M.&nbsp;Breshears, <i>Chronotecture: Lost Science of Prophetic Engineering</i> (2017), chart&nbsp;I (plate&nbsp;13). Content transcribed unchanged; this is an interpretive redraw for study, not an endorsement of the underlying claims.</div></div>
    </div>
  </div>
---JS---
const svg=document.getElementById('art');
const apex=[500,60], bL=[110,440], bR=[890,440], BASE=440;
const E=[700,255], J=[590,324], S=[150,600], G=[500,280], CX=500;
// bedrock courses
svg.appendChild(el('rect',{x:60,y:BASE,width:880,height:200,fill:'#0f1626',stroke:'#24304a'}));
for(let y=BASE+28;y<640;y+=28){svg.appendChild(el('line',{x1:60,y1:y,x2:940,y2:y,stroke:'#1a2338'}));
  for(let x=60+((y/28)%2?40:0);x<940;x+=80)svg.appendChild(el('line',{x1:x,y1:y-28,x2:x,y2:y,stroke:'#1a2338'}));}
// pyramid body and courses
svg.appendChild(el('polygon',{points:`${apex} ${bL} ${bR}`,fill:'#151d31',stroke:'#c9b98f','stroke-width':1.4}));
for(let y=84;y<BASE;y+=12){const t=(y-apex[1])/(BASE-apex[1]);svg.appendChild(el('line',{x1:apex[0]+(bL[0]-apex[0])*t,y1:y,x2:apex[0]+(bR[0]-apex[0])*t,y2:y,stroke:'#22304c'}));}
svg.appendChild(el('line',{x1:60,y1:BASE,x2:940,y2:BASE,stroke:'#3a486a','stroke-width':1.6}));
svg.appendChild(el('circle',{cx:600,cy:330,r:150,fill:'none',stroke:'#33415f','stroke-dasharray':'3 5'}));
// faces
function rot(s,x,y,a,o){return tx(svg,x,y,s,Object.assign({'text-anchor':'middle',transform:`rotate(${a} ${x} ${y})`,fill:'#8b95ad','font-size':12,class:'mono'},o||{}));}
rot('SOUTH FACE',282,236,-44);rot('NORTH FACE 51′51',790,318,44);
// central axis at face of Great Step
const ca=el('g',{});ca.appendChild(el('line',{x1:CX,y1:46,x2:CX,y2:660,stroke:'#ffcf5c','stroke-width':1.4,'stroke-dasharray':'4 5',opacity:.8}));
ca.appendChild(el('rect',{x:CX-4,y:40,width:8,height:620,fill:'transparent'}));
tx(ca,CX-8,262,'CENTRAL AXIS AT FACE OF GREAT STEP',{'text-anchor':'start',fill:'#ffcf5c','font-size':10.5,class:'mono h',transform:`rotate(-90 ${CX-8} 262)`});
svg.appendChild(ca);bind(ca,T('Central axis at face of Great Step','#ffcf5c','1902 AD [5796 AM]','The Ascendant Passage reaches the face of the Great Step on this axis.'));
// passage conjunct axis
const pa=el('g',{});pa.appendChild(el('line',{x1:J[0],y1:J[1],x2:J[0],y2:180,stroke:'#9c8bf0','stroke-width':1.2,'stroke-dasharray':'2 5'}));
pa.appendChild(el('rect',{x:J[0]-4,y:180,width:8,height:J[1]-180,fill:'transparent'}));
tx(pa,J[0]-6,308,'PASSAGE CONJUNCT AXIS',{fill:'#9c8bf0','font-size':10.5,class:'mono h',transform:`rotate(-90 ${J[0]-6} 308)`});
svg.appendChild(pa);bind(pa,T('Passage conjunct axis','#9c8bf0','1460 BC [2435 Annus Mundi]','Rises from the junction of the Ascendant and Descendant passages.'));
// passages
function passage(a,b,col,h){const g=el('g',{});
  g.appendChild(el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:col,'stroke-width':14,'stroke-linecap':'round',opacity:.22}));
  g.appendChild(el('line',{x1:a[0],y1:a[1],x2:b[0],y2:b[1],stroke:col,'stroke-width':3,'stroke-linecap':'round'}));
  bind(g,h);svg.appendChild(g);return g;}
passage(E,S,'#5cb3f2',T('Descendant Passage','#5cb3f2','3036 P″ to passage end joint','“Differential of 600 between axis date of 2436 Annus Mundi and remaining 3036 P″ down Descendant Passage, exhibiting relation to Anunnaki Ner system.”'));
passage(J,G,'#e7c355',T('Ascendant Passage','#e7c355','3361 P″ to face of Great Step','3361 P″ + 2435 AM [1460 BC] = 5796 AM; 1902 AD start of Giza Course Countdown Calendar.'));
// 52 P" bore heights
function tick(p,a,b,lab){const ang=Math.atan2(b[1]-a[1],b[0]-a[0])+Math.PI/2,dx=Math.cos(ang)*12,dy=Math.sin(ang)*12;
  const g=el('g',{});g.appendChild(el('line',{x1:p[0]-dx,y1:p[1]-dy,x2:p[0]+dx,y2:p[1]+dy,stroke:'#aeb7cd','stroke-width':1.6}));
  tx(g,p[0]+dx+4,p[1]+dy+12,lab,{fill:'#aeb7cd','font-size':10,class:'mono h'});bind(g,T('52 P″','#aeb7cd','bore height','The passage bore, marked 52 P″ on the plate.'));svg.appendChild(g);}
const onLine=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
tick(onLine(E,S,.08),E,S,'52 P″');tick(onLine(E,S,.72),E,S,'52 P″');tick(onLine(J,G,.55),J,G,'52 P″');tick(J,J,G,'52 P″');
// measures
function mlab(p,s,col,a){tx(svg,p[0],p[1],s,{fill:col,'font-size':14,'font-weight':600,class:'mono h','text-anchor':'middle',transform:`rotate(${a} ${p[0]} ${p[1]})`});}
mlab([548,290],'3361 P″','#e7c355',-26);mlab([330,474],'3036 P″','#5cb3f2',32);
rot('Ascendant Passage',552,328,-26,{fill:'#e7c355','font-size':11});rot('Descendant Passage',420,452,32,{fill:'#5cb3f2','font-size':11});
// nodes
function node(p,col,h){const g=el('g',{});g.appendChild(el('circle',{cx:p[0],cy:p[1],r:6.5,fill:col,stroke:'#0b0f1a','stroke-width':1.5}));
  g.appendChild(el('circle',{cx:p[0],cy:p[1],r:12,fill:'none',stroke:col,opacity:.5}));bind(g,h);svg.appendChild(g);return g;}
svg.appendChild(el('path',{d:`M${G[0]-18} ${G[1]+8} h12 v-10 h12`,fill:'none',stroke:'#ffcf5c','stroke-width':2.4}));
node(G,'#ffcf5c',T('Face of the Great Step','#ffcf5c','5796 AM = 1902 AD','Start of the Giza Course Countdown Calendar.'));
node(J,'#9c8bf0',T('Junction · 1460 BC [2435 Annus Mundi]','#9c8bf0','144.8 decades after 2908 BC [987 AM]','Enoch ascended in his 365th year: 365×4 = 1460.'));
node(E,'#5cb3f2',T('Pyramid entry','#5cb3f2','north face 51′51','Mouth of the Descendant Passage.'));
node(S,'#5cb3f2',T('Passage end joint','#5cb3f2','3036 P″','The end of the Descendant Passage.'));
tx(svg,E[0]+14,E[1]+4,'Pyramid entry',{fill:'#5cb3f2','font-size':12,class:'h'});
tx(svg,S[0]+4,S[1]+26,'Passage end joint',{fill:'#5cb3f2','font-size':12,class:'h'});
// callouts
function note(x,y,lines,col,h){const g=el('g',{});lines.forEach((s,i)=>tx(g,x,y+i*16,s,{fill:i?'#c3ccdf':col,'font-size':i?12:13,'font-weight':i?400:600,class:'h'}));bind(g,h);svg.appendChild(g);}
note(150,150,['3361 P″ + 2435 AM [1460 BC] = 5796 AM;','1902 AD start of','Giza Course Countdown Calendar'],'#ffcf5c',T('1902 AD [5796 AM]','#ffcf5c','3361 + 2435 = 5796','5796 AM [1902 AD] is exactly 414×14 years, a sum referencing the Stonehenge Cursed Earth system.'));
svg.appendChild(el('path',{d:`M372 176 Q440 200 ${G[0]-12} ${G[1]-6}`,fill:'none',stroke:'#ffcf5c','stroke-width':1.2,'stroke-dasharray':'3 4'}));
note(640,520,['1460 BC [2435 Annus Mundi]','This is 144.8 decades after Enoch’s','ascent in Achuzan 2908 BC [987 AM],','Enoch’s 365th year.'],'#9c8bf0',T('1460 BC [2435 Annus Mundi]','#9c8bf0','2908 BC → 1460 BC = 1448 years','144.8 decades after Enoch’s ascent in Achuzan, 2908 BC [987 AM].'));
svg.appendChild(el('path',{d:`M636 512 L${J[0]+8} ${J[1]+10}`,fill:'none',stroke:'#9c8bf0','stroke-width':1.2,'stroke-dasharray':'3 4'}));
note(70,520,['Enoch ascended','in 365th year:','365 × 4 = 1460'],'#c9b98f',T('Enoch','#c9b98f','365 × 4 = 1460','Ascended in his 365th year.'));
note(640,470,['5796 AM [1902 AD] is exactly 414×14 years,','a sum referencing the Stonehenge Cursed Earth system.'],'#e7c355',T('414 × 14 = 5796','#e7c355','5796 AM [1902 AD]','A sum referencing the Stonehenge Cursed Earth system.'));
note(70,70,['Differential of 600 between axis date of','2436 Annus Mundi and remaining 3036 P″','down Descendant Passage, exhibiting','relation to Anunnaki Ner system.'],'#5cb3f2',T('Differential of 600','#5cb3f2','3036 − 2436 = 600','Note: the junction is 2435 AM [1460 BC] elsewhere on the plate; 3036 − 2435 = 601.'));
