
const NS='http://www.w3.org/2000/svg';
function el(n,a,t){const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);if(t!=null)e.textContent=t;return e;}
const tip=document.getElementById('tip');
function showTip(h,e){tip.innerHTML=h;tip.style.opacity=1;const w=Math.min(300,innerWidth-16);tip.style.maxWidth=w+'px';
  let x=e.clientX+16,y=e.clientY+14;if(x+w>innerWidth)x=Math.max(8,e.clientX-w-8);
  const th=tip.offsetHeight||150;if(y+th>innerHeight)y=Math.max(8,e.clientY-th-10);tip.style.left=x+'px';tip.style.top=y+'px';}
function hideTip(){tip.style.opacity=0;}
function T(title,col,yr,body){return `<div class="t-h"><span class="d" style="background:${col}"></span>${title}</div>${yr?`<div class="t-yr">${yr}</div>`:''}${body?`<div class="t-b">${body}</div>`:''}`;}
function bind(n,h){n.style.cursor='pointer';n.addEventListener('mousemove',e=>showTip(h,e));n.addEventListener('mouseleave',hideTip);
  n.addEventListener('click',e=>{e.stopPropagation();showTip(h,e);});}
document.addEventListener('click',hideTip);
window.addEventListener('scroll',hideTip,{passive:true});
function tx(p,x,y,s,o){const t=el('text',Object.assign({x,y,fill:'#dfe6f5','font-size':12},o||{}),s);p.appendChild(t);return t;}
function chips(CAT,sel){const bar=document.getElementById('filters');if(!bar)return;const on=new Set(Object.keys(CAT));
  for(const[k,v]of Object.entries(CAT)){const c=document.createElement('div');c.className='chip';
    c.innerHTML=`<span class="dot" style="background:${v.c}"></span>${v.label}`;
    c.onclick=()=>{if(on.has(k)){on.delete(k);c.classList.add('off');}else{on.add(k);c.classList.remove('off');}
      document.querySelectorAll(sel).forEach(g=>{g.style.display=on.has(g.getAttribute('data-cat'))?'':'none';});};
    bar.appendChild(c);}}
function focusScrollers(){document.querySelectorAll('.scroller[data-focus]').forEach(s=>{s.scrollLeft=Math.max(0,s.scrollWidth*(+s.dataset.focus)-s.clientWidth/2);});}
window.addEventListener('load',focusScrollers);
function yl(v){return v<0?(-v)+' BC':v+' AD';}
// span bar: x1<x2 in px; offL draws an off-scale arrow at left end
function spanBar(p,o){const g=el('g',{class:'row','data-cat':o.cat});
  const x1=Math.min(o.x1,o.x2),x2=Math.max(o.x1,o.x2);
  g.appendChild(el('rect',{x:x1,y:o.y-4,width:Math.max(2,x2-x1),height:8,rx:4,fill:o.col,opacity:.92}));
  if(o.offL){g.appendChild(el('path',{d:`M${x1-2} ${o.y-9} L${x1-16} ${o.y} L${x1-2} ${o.y+9} Z`,fill:o.col}));}
  else g.appendChild(el('circle',{cx:x1,cy:o.y,r:4.5,fill:o.col,stroke:'#0b0f1a','stroke-width':1.5}));
  if(o.offR){g.appendChild(el('path',{d:`M${x2+2} ${o.y-9} L${x2+16} ${o.y} L${x2+2} ${o.y+9} Z`,fill:o.col}));}
  else g.appendChild(el('circle',{cx:x2,cy:o.y,r:4.5,fill:o.col,stroke:'#0b0f1a','stroke-width':1.5}));
  g.appendChild(el('rect',{x:x1-6,y:o.y-24,width:x2-x1+12,height:44,fill:'transparent'}));
  if(o.lab){const t=tx(g,o.lx,o.y-9,o.lab,{'text-anchor':o.la||'start','font-size':12.5,'font-weight':600,class:'h',fill:'#e6ecf8'});}
  if(o.lab2){tx(g,o.lx,o.y+17,o.lab2,{'text-anchor':o.la||'start','font-size':11,class:'h',fill:'#8b95ad'});}
  bind(g,o.tip);p.appendChild(g);return g;}

