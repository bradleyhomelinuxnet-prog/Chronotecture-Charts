---TITLE---
Chronotecture · Plate 119 — The Recursive Palindrome
---CSS---
---BODY---
  <header class="masthead">
    <div class="kicker">Chronotecture Atlas · Colophon · Plate&nbsp;119</div>
    <h1>Chronotecture
      <span class="sub">Plate 119 — The Recursive Palindrome · 138 − 19 = 119</span>
    </h1>
    <p class="prov">Not from Breshears: an original closing plate for the atlas, rebuilt here with every figure as drawn on it. It reads the same distance out from its centre line in both directions (a <b>palindrome</b>), built on two numbers that run through the charts: <b>138</b>, whose recursive doubling 138 · 276 · 552 · 1104 · 2208 gives the 552 and 1104 of charts&nbsp;II·b and II·c and the 2208&nbsp;AM written there, and <b>19</b>, the Metonic cycle. Their difference is the plate’s own number, <b>138 − 19 = 119</b>.</p>
  </header>

  <div class="grid">
    <div class="card">
      <h2>The mirrored doubling</h2>
      <div class="hint">The Metonic semicircle above, nineteen steps from end to end; the five doublings of 138 below, each bar the same length either side of the axis. Gold bars are the figures that appear on Breshears’ plates. Hover or tap a bar. <span class="anchor-key"><i></i>MIRROR AXIS</span></div>
      <div class="swipe">⟷ swipe to pan the plate</div>
      <div class="scroller" data-focus=".5"><svg id="art" class="mid" viewBox="0 0 1200 760" role="img" aria-label="Plate 119, the recursive palindrome"></svg></div>
    </div>
    <div class="bottom">
      <div class="card"><h2>Cycle mathematics</h2><div class="hint">Every figure on the plate, checked. All of them hold.</div><div class="mathgrid">
        <div class="mrow"><span class="eq">138 × 1 = 138 · 138 × 2 = 276</span><span class="cap">The base and its first doubling (not on Breshears’ plates).</span></div>
        <div class="mrow"><span class="eq">138 × 4 = <span class="base138">552</span></span><span class="cap">The 552 of charts&nbsp;II·b, II·c and VI·c.</span></div>
        <div class="mrow"><span class="eq">138 × 8 = <span class="base138">1104</span> = 552 × 2</span><span class="cap">“1104 yrs [552×2]” on charts&nbsp;II·b and II·c.</span></div>
        <div class="mrow"><span class="eq">138 × 16 = <span class="base138">2208</span></span><span class="cap">1688&nbsp;BC [2208&nbsp;AM] on charts&nbsp;II·b and II·c.</span><span class="aw">as written on those plates — 2208&nbsp;AM is 1687&nbsp;BC; 1688&nbsp;BC is 2207&nbsp;AM</span></div>
        <div class="mrow"><span class="eq">19 years = 235 lunations</span><span class="cap">The Metonic cycle: sun and moon realign (19 × 365.2422 ≈ 235 × 29.5306 ≈ 6940 days).</span></div>
        <div class="mrow"><span class="eq">138 − 19 = 119 · 118 + 1 = 119</span><span class="cap">The plate’s number, one past Breshears’ last plate.</span></div>
        <div class="mrow"><span class="eq">19 ↔ 91 · 138 ↔ 831 · 1·1·9 ↔ 9·1·1</span><span class="cap">Reversals, read from either end: mirrors, not equalities.</span></div>
      </div></div>
      <div class="card"><h2>Full transcription</h2><div class="hint">Every label on the plate, verbatim.</div><details class="tx"><summary>Show transcription</summary><div class="cols">
        <div><h3>Header</h3><ul><li>119 (corner box)</li></ul></div>
        <div><h3>Upper figure</h3><ul><li>19 · the Metonic cycle</li><li>19 years = 235 lunations — sun &amp; moon realign</li></ul></div>
        <div><h3>Lower figure</h3><ul><li>138 · recursive doubling (mirrored)</li><li>138×1 · 138 · 138×1</li><li>138×2 · 276 · 138×2</li><li>138×4 · 552 · 138×4</li><li>138×8 · 1104 · 138×8</li><li>138×16 · 2208 · 138×16</li></ul></div>
        <div><h3>Frieze</h3><ul><li>19 ↔ 91</li><li>138 ↔ 831</li><li>1·1·9 ↔ 9·1·1</li><li>138 − 19 = 119</li></ul></div>
      </div></details><div class="foot">An original addition to the atlas, not part of Breshears’ <i>Chronotecture</i>; the 552, 1104 and 2208 it cites are his, from charts&nbsp;II·b and II·c (plates&nbsp;19–20).</div></div>
    </div>
  </div>
---JS---
const svg=document.getElementById('art'), CX=600;
svg.appendChild(el('line',{x1:CX,y1:40,x2:CX,y2:720,stroke:'#ffcf5c','stroke-width':1.5,opacity:.55,'stroke-dasharray':'2 6'}));
// 19 · Metonic semicircle
(function(){const cy=250,R=150,g=el('g',{});
  g.appendChild(el('path',{d:`M ${CX-R} ${cy} A ${R} ${R} 0 0 1 ${CX+R} ${cy}`,fill:'none',stroke:'#5cb3f2','stroke-width':2,opacity:.85}));
  for(let i=0;i<=19;i++){const a=Math.PI*(1-i/19),end=(i===0||i===19);
    g.appendChild(el('circle',{cx:CX+Math.cos(a)*R,cy:cy-Math.sin(a)*R,r:end?4.5:2.8,fill:end?'#ffcf5c':'#5cb3f2'}));}
  tx(g,CX,cy-R-16,'19 · the Metonic cycle',{fill:'#5cb3f2','font-size':14,'text-anchor':'middle',class:'mono'});
  tx(g,CX,cy-18,'19 years = 235 lunations — sun & moon realign',{fill:'#8b95ad','font-size':11.5,'text-anchor':'middle',class:'h'});
  bind(g,T('19 · the Metonic cycle','#5cb3f2','19 years = 235 lunations','Nineteen steps from end to end: sun and moon realign.'));svg.appendChild(g);})();
// 138 doublings, mirrored
const ROWS=[{v:138,m:'×1',n:'the base'},{v:276,m:'×2',n:'138 · 2'},{v:552,m:'×4',n:'the 552 of charts II·b, II·c and VI·c'},{v:1104,m:'×8',n:'552×2: “1104 yrs [552×2]” on charts II·b and II·c'},{v:2208,m:'×16',n:'1688 BC [2208 AM] on charts II·b and II·c'}];
tx(svg,CX,310,'138 · recursive doubling (mirrored)',{fill:'#ffcf5c','font-size':14,'text-anchor':'middle',class:'mono'});
ROWS.forEach((r,i)=>{const hw=r.v/2208*430,y=340+i*72,inA=r.v>=552,col=inA?'#ffcf5c':'#5c6a8f',g=el('g',{});
  g.appendChild(el('line',{x1:CX-hw,y1:y,x2:CX+hw,y2:y,stroke:col,'stroke-width':11,'stroke-linecap':'round',opacity:inA?.95:.6}));
  g.appendChild(el('rect',{x:CX-36,y:y-14,width:72,height:28,rx:14,fill:'#0b0f1a',stroke:col,'stroke-width':1.3}));
  tx(g,CX,y+5,String(r.v),{fill:col,'font-size':14,'text-anchor':'middle',class:'mono','font-weight':500});
  tx(g,CX-Math.max(hw,36)-12,y+4,'138'+r.m,{fill:'#aeb7cd','font-size':11.5,'text-anchor':'end',class:'mono'});
  tx(g,CX+Math.max(hw,36)+12,y+4,'138'+r.m,{fill:'#aeb7cd','font-size':11.5,class:'mono'});
  bind(g,T(`138 ${r.m} = ${r.v}`,col,'',r.n));svg.appendChild(g);});
['19 ↔ 91','138 ↔ 831','1·1·9 ↔ 9·1·1','138 − 19 = 119'].forEach((s,i)=>tx(svg,CX+(i-1.5)*300,736,s,{fill:'#c3ccdf','font-size':14,'text-anchor':'middle',class:'mono'}));
svg.appendChild(el('rect',{x:24,y:24,width:72,height:44,rx:4,fill:'none',stroke:'#4a5a80','stroke-width':1.4}));
tx(svg,60,54,'119',{fill:'#ffcf5c','font-size':22,'text-anchor':'middle','font-family':'Cormorant Garamond','font-weight':700});
