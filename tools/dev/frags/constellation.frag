---TITLE---
Chronotecture · The Constellation — how the charts connect
---CSS---
  .cmap{display:grid;grid-template-columns:1fr 300px;gap:18px;align-items:start}
  @media(max-width:880px){.cmap{grid-template-columns:1fr}}
  .pane{border:1px solid var(--line);border-radius:12px;background:#0e1526;padding:14px 16px;min-height:220px}
  .pane .tag{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.24em;color:var(--muted);text-transform:uppercase}
  .pane h3{font-family:'Cormorant Garamond',serif;font-size:24px;margin:4px 0 6px;font-weight:600}
  .pane p{font-size:13px;line-height:1.55;color:#d3dbec;margin:0 0 8px}
  .pane .apps{font-size:12px;color:var(--muted);line-height:1.6}
  .pane .apps b{color:var(--anchor);font-family:'JetBrains Mono',monospace;font-weight:500}
  .pane a{display:inline-block;margin-top:8px;color:#4fe3ff;font-family:'JetBrains Mono',monospace;font-size:12px;text-decoration:none;border:1px solid #26324f;border-radius:100px;padding:6px 12px}
  .node,.chart{cursor:pointer}
---BODY---
  <header class="masthead">
    <div class="kicker">Chronotecture Atlas · Cross-Map</div>
    <h1>Chronotecture
      <span class="sub">The Constellation — the numbers and dates the charts share</span>
    </h1>
    <p class="prov">An atlas cross-map, not a Breshears plate. Each <b>gold star</b> is a rebuilt chart; each <b>blue node</b> is a number or date, and a line joins them only where that figure is written on the chart’s plate. Every figure is given as the plate writes it, with the plate cited in the source list at the end. Click a node to light up every chart that uses it; click a star, then “Open”, to go to its rebuild.</p>
  </header>

  <div class="grid">
    <div class="card">
      <h2>The cross-map</h2>
      <div class="hint">Click a node or star; click empty space to reset. <span class="anchor-key"><i></i>CHARTS ◆ · SHARED FIGURES ●</span></div>
      <div class="cmap">
        <div class="scroller" data-focus=".5"><svg id="map" class="mid" viewBox="0 0 1000 760" role="img" aria-label="Constellation cross-map of shared numbers and dates"></svg></div>
        <div class="pane" id="pane"><div class="tag" id="ptag">Start here</div><h3 id="ptitle">138</h3><p id="pdesc">Click any node or star.</p><div class="apps" id="papps"></div><a id="popen" href="#" style="display:none">Open →</a></div>
      </div>
    </div>
    <div class="bottom">
      <div class="card"><h2>Cycle mathematics</h2><div class="hint">The shared figures, checked against the plates that write them. Figures that do not hold are kept and marked <i>as written</i>.</div><div class="mathgrid">
        <div class="mrow"><span class="eq">138 × 4 = 552 · × 8 = 1104 · × 16 = 2208</span><span class="cap">The doubling drawn on plate&nbsp;119; 552, 1104 and 2208 are written on II·b and II·c.</span></div>
        <div class="mrow"><span class="eq">414 × 4 = 1656 = 864 + 792</span><span class="cap">The Flood palindrome, II·b.</span></div>
        <div class="mrow"><span class="eq">1962 + 144 = 2106 · 1902 + 144 = 2046 · 144 × 3 = 432</span><span class="cap">II·b, I·e, VI·c.</span></div>
        <div class="mrow"><span class="eq">1135 BC = 2670 AM (II·c) · 2760 AM (II·b)</span><span class="cap">The comet that darkens the sun.</span><span class="aw">as written — 3895 − 1135 = 2760; II·c’s 2670 transposes it</span></div>
        <div class="mrow"><span class="eq">1688 BC [2208 AM] · 552 to 1135 BC or from 2239 BC</span><span class="cap">II·b and II·c.</span><span class="aw">as written — 2208&nbsp;AM is 1687&nbsp;BC, and 552 from either 1135 or 2239&nbsp;BC lands on 1687&nbsp;BC</span></div>
        <div class="mrow"><span class="eq">622 − 552 = 70 AD · 622 AD = 4516 AM</span><span class="cap">VI·c and VI·d.</span></div>
        <div class="mrow"><span class="eq">3361 + 2435 = 5796 = 1902 AD · 1902 + 204 = 2106</span><span class="cap">Chart&nbsp;I and I·e.</span></div>
        <div class="mrow"><span class="eq">1902 + 126 = 2028 · 2028 + 24 = 2052</span><span class="cap">The Great Step.</span></div>
      </div></div>
      <div class="card"><h2>Full transcription</h2><div class="hint">Every node’s figure, as written, and the plates that write it.</div><details class="tx"><summary>Show sources</summary><div class="cols" id="srcs"></div></details><div class="foot">An atlas cross-map built from J.&nbsp;M.&nbsp;Breshears, <i>Chronotecture: Lost Science of Prophetic Engineering</i> (2017), plates&nbsp;13–30, 44, 97–99 and 114, and the atlas’ own plate&nbsp;119. Figures transcribed unchanged; this is an interpretive map for study, not an endorsement of the underlying claims.</div></div>
    </div>
  </div>
---JS---
const CX=500, CY=380;
const CHARTS=[
  {id:'I',lbl:'I',full:'Chart I · The Pyramid-Inch Calendar (plate 13)',href:'chart-i.html',refs:['d1902','d1460','p3036','p3361','enoch']},
  {id:'Ie',lbl:'I·e',full:'Chart I·e · The Giza Course Countdown (plate 17)',href:'ie.html',refs:['d1902','d2106','n144','d2046']},
  {id:'Id',lbl:'I·d',full:'Chart I·d · The Great Step Axis (plate 16)',href:'p016.html',refs:['d1902','d2106','d2046']},
  {id:'IIb',lbl:'II·b',full:'Chart II·b · The Palindrome of the Great Flood (plate 19)',href:'iib.html',refs:['n552','n1104','n2208','n1656','n144','flood','d1135','d1688','d583','d1902','d2106','d2046']},
  {id:'IIc',lbl:'II·c',full:'Chart II·c · Spans from the Comet of 1135 BC (plate 20)',href:'iic.html',refs:['n552','n1104','n2208','flood','d1135','d1688','d583','d2106','enoch']},
  {id:'VIc',lbl:'VI·c',full:'Chart VI·c · The Islamic Hijrah Calendar (plate 29)',href:'vic.html',refs:['d622','n552','n144','d2106','enoch','d1054']},
  {id:'VId',lbl:'VI·d',full:'Chart VI·d · The Hijrah Doublings (plate 30)',href:'vid.html',refs:['d622','d2106']},
  {id:'Xc',lbl:'X·c',full:'Chart X·c · Iron Empires (plate 44)',href:'p044.html',refs:['d1054','d2106','d2046']},
  {id:'GS',lbl:'Step',full:'The Great Step Countdown (plates 97, 99)',href:'great-step.html',refs:['d1902','d2028','d2052']},
  {id:'PhI',lbl:'Ph·I',full:'Phoenix Chronometry I (plate 114)',href:'p114.html',refs:['n138','d1902']},
  {id:'119',lbl:'119',full:'Plate 119 · The Recursive Palindrome (atlas colophon)',href:'p119.html',refs:['n138','n552','n1104','n2208','n19']}
];
const NODES={
  n138:{lbl:'138',tag:'number',desc:'Doubled on plate 119: 138×4 = 552, ×8 = 1104, ×16 = 2208. Phoenix Chronometry I totals pyramid measures to multiples of 138 (e.g. 6348 = 138×46).'},
  n552:{lbl:'552',tag:'span',desc:'II·b: 2239 BC → 1688 BC [2208 AM] (as written; the arithmetic gives 1687 BC). II·c: 1135 BC → 583 BC, and back to 1688 BC [2208]. VI·c: 70 AD → 622 AD.'},
  n1104:{lbl:'1104',tag:'span',desc:'“1104 yrs [552×2]”. II·b: 2239 BC → 1135 BC [2760 AM]. II·c: 2239 BC ← 1135 BC → 31 BC.'},
  n2208:{lbl:'2208 AM',tag:'marker',desc:'“1688 BC [2208 AM]” (II·b) and “1688 BC [2208]” (II·c). 2208 = 138×16; 2208 AM is 1687 BC by the plates’ own Anno Mundi count.'},
  n1656:{lbl:'1656',tag:'span',desc:'II·b: 1656 years either side of the Flood, “414×4 or 864+792”. The Flood is 2239 BC [1656 AM].'},
  n144:{lbl:'144',tag:'span',desc:'II·b: 1962 AD is 144 years to Armageddon 2106 AD; 1902 is 144 years to 2046 AD. I·e: 144 years to 2046 AD. VI·c: 432 [144×3].'},
  n19:{lbl:'19',tag:'cycle',desc:'Plate 119: the Metonic cycle, 19 years = 235 lunations; 138 − 19 = 119.'},
  flood:{lbl:'Great Flood',tag:'date',desc:'2239 BC [1656 AM] (II·b, II·c): the centre of the II·b palindrome; “Deluge 2239 BC” on II·c.'},
  d1135:{lbl:'1135 BC',tag:'date',desc:'Comet darkens the sun. II·c: 1135 BC [2670 AM]; II·b: 1135 BC [2760 AM]. 3895 − 1135 = 2760.'},
  d1688:{lbl:'1688 BC',tag:'date',desc:'Comet darkens the sun [2208 AM] (II·b, II·c).'},
  d583:{lbl:'583 BC',tag:'date',desc:'Sun darkened during the Medo-Lydian war. II·b: 583 BC [3312 AM]; II·c: [Herodotus].'},
  d622:{lbl:'622 AD',tag:'date',desc:'622 AD [4516 AM] Islamic Hijrah Calendar (VI·c, VI·d).'},
  d1054:{lbl:'1054 AD',tag:'date',desc:'VI·c: 1054 AD supernova in Taurus and division of Roman Church. X·c: the axis of the Iron Empires chart.'},
  d1460:{lbl:'1460 BC',tag:'date',desc:'Chart I: 1460 BC [2435 Annus Mundi], the passage junction; Enoch: 365×4 = 1460.'},
  d1902:{lbl:'1902 AD',tag:'date',desc:'Chart I: 5796 AM, 1902 AD start of Giza Course Countdown Calendar. I·e: 1902 AD [5796 AM] Stonehenge chronolithic system ends. II·b: Stonehenge chronology to 1902 AD. The Great Step: its face.'},
  d2028:{lbl:'2028 AD',tag:'date',desc:'The Great Step: 2028 AD (5922 AM), the final limestone year (126 P″ = 42×3).'},
  d2046:{lbl:'2046 AD',tag:'date',desc:'I·e: 2046 AD [5940 AM] astroid impact. II·b: 1902 is 144 years to 2046 AD impact.'},
  d2052:{lbl:'2052 AD',tag:'date',desc:'The Great Step: 2028 AD is exactly 24 years before the Seven Kings are released in 2052 AD.'},
  d2106:{lbl:'2106 AD',tag:'date',desc:'6000 AM, Armageddon and the return of the Chief Cornerstone (I·e, II·b, II·c, VI·c, VI·d).'},
  enoch:{lbl:'Enoch',tag:'figure',desc:'Chart I: Enoch ascended in 365th year, 365×4 = 1460. II·c: 2066 AD when Enoch & Elijah return as Two Witnesses. VI·c: 2066 AD appearance of Enoch and Elijah.'},
  p3036:{lbl:'3036 P″',tag:'measure',desc:'Chart I: 3036 P″ to passage end joint, down the Descendant Passage.'},
  p3361:{lbl:'3361 P″',tag:'measure',desc:'Chart I: 3361 P″ to face of Great Step, up the Ascendant Passage.'}
};
CHARTS.forEach((c,i)=>{const a=-Math.PI/2+i*2*Math.PI/CHARTS.length;c.pos=[CX+190*Math.cos(a),CY+130*Math.sin(a)];});
const keys=Object.keys(NODES);
keys.forEach((k,i)=>{const a=-Math.PI/2+i*2*Math.PI/keys.length;NODES[k].pos=[CX+410*Math.cos(a),CY+300*Math.sin(a)];NODES[k].deg=0;});
CHARTS.forEach(c=>c.refs.forEach(r=>NODES[r].deg++));
const svg=document.getElementById('map');
[150,250,340].forEach(r=>svg.appendChild(el('ellipse',{cx:CX,cy:CY,rx:r*1.3,ry:r*0.92,fill:'none',stroke:'#1a2338'})));
const edges=[];
CHARTS.forEach(c=>c.refs.forEach(r=>{const p=NODES[r].pos,l=el('line',{x1:c.pos[0],y1:c.pos[1],x2:p[0],y2:p[1],stroke:'#33415f',opacity:.4});l.dataset.a=c.id;l.dataset.b=r;edges.push(l);svg.appendChild(l);}));
const nodeEls={};
keys.forEach(k=>{const n=NODES[k],p=n.pos,big=n.deg>=3,r=big?9:7,g=el('g',{class:'node'});
  g.appendChild(el('circle',{cx:p[0],cy:p[1],r:r+7,fill:'#5cb3f2',opacity:0,class:'halo'}));
  g.appendChild(el('circle',{cx:p[0],cy:p[1],r,fill:big?'#8fd0ff':'#3a8fc8',stroke:'#0b0f1a','stroke-width':2}));
  const right=p[0]>=CX;tx(g,p[0]+(right?r+8:-(r+8)),p[1]+4,n.lbl,{fill:'#dfe6f5','font-size':13,'text-anchor':right?'start':'end',class:'mono h'});
  svg.appendChild(g);nodeEls[k]=g;});
CHARTS.forEach(c=>{const p=c.pos,g=el('g',{class:'chart'});
  g.appendChild(el('circle',{cx:p[0],cy:p[1],r:30,fill:'#ffcf5c',opacity:0,class:'halo'}));
  g.appendChild(el('circle',{cx:p[0],cy:p[1],r:21,fill:'#ffcf5c',stroke:'#0b0f1a','stroke-width':2}));
  tx(g,p[0],p[1]+4,c.lbl,{fill:'#1a1204','font-size':c.lbl.length>3?11:13,'text-anchor':'middle','font-weight':700});
  svg.appendChild(g);nodeEls[c.id]=g;});
const chartMap={};CHARTS.forEach(c=>chartMap[c.id]=c);
function adj(id){const s={[id]:1};edges.forEach(e=>{if(e.dataset.a===id)s[e.dataset.b]=1;if(e.dataset.b===id)s[e.dataset.a]=1;});return s;}
function focus(id){const nb=adj(id);
  for(const k in nodeEls){const g=nodeEls[k];g.style.opacity=nb[k]?1:.15;g.querySelector('.halo').setAttribute('opacity',k===id?.5:nb[k]?.2:0);}
  edges.forEach(e=>{const on=e.dataset.a===id||e.dataset.b===id;e.setAttribute('stroke',on?'#4fe3ff':'#33415f');e.setAttribute('stroke-width',on?2:1);e.setAttribute('opacity',on?.9:.06);});
  const c=chartMap[id];
  document.getElementById('ptag').textContent=c?'Rebuilt chart':NODES[id].tag;
  document.getElementById('ptitle').textContent=c?c.lbl:NODES[id].lbl;
  document.getElementById('pdesc').textContent=c?c.full:NODES[id].desc;
  document.getElementById('papps').innerHTML=c?('Shares '+c.refs.map(r=>'<b>'+NODES[r].lbl+'</b>').join(' · ')):('Written on '+CHARTS.filter(x=>x.refs.includes(id)).map(x=>'<b>'+x.lbl+'</b>').join(' · '));
  const o=document.getElementById('popen');o.style.display=c?'inline-block':'none';if(c){o.href=c.href;o.textContent='Open '+c.lbl+' →';}}
function reset(){for(const k in nodeEls){nodeEls[k].style.opacity=1;nodeEls[k].querySelector('.halo').setAttribute('opacity',0);}
  edges.forEach(e=>{e.setAttribute('stroke','#33415f');e.setAttribute('stroke-width',1);e.setAttribute('opacity',.4);});}
for(const k in nodeEls)nodeEls[k].addEventListener('click',ev=>{ev.stopPropagation();focus(k);});
svg.addEventListener('click',reset);
focus('n138');
document.getElementById('srcs').innerHTML='<div><h3>Shared figures</h3><ul>'+keys.map(k=>'<li><b>'+NODES[k].lbl+'</b> — '+NODES[k].desc+'</li>').join('')+'</ul></div><div><h3>Charts</h3><ul>'+CHARTS.map(c=>'<li><b>'+c.lbl+'</b> — '+c.full+'</li>').join('')+'</ul></div>';
