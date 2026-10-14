(function(){
  var stage=document.getElementById('stage');
  if(!stage) return;
  var paper=document.getElementById('paper');
  var W=+paper.dataset.w, H=+paper.dataset.h;
  var scale=1, x=0, y=0, rot=0, base=1;

  var PAGE=location.pathname.split('/').pop();

  // Plates drawn sideways open upright. Any plate you turn remembers its way (per browser).
  var UPRIGHT={'p017.html':90,'p029.html':90,'p030.html':90,'p038.html':90};
  var ROT_KEY='chrono-rot:'+PAGE;
  if(UPRIGHT[PAGE]) rot=UPRIGHT[PAGE];
  try{ var saved=localStorage.getItem(ROT_KEY); if(saved!==null){ saved=parseInt(saved,10); if(saved===0||saved===90||saved===180||saved===270) rot=saved; } }catch(e){}
  function saveRot(){ try{ if(rot===(UPRIGHT[PAGE]||0)) localStorage.removeItem(ROT_KEY); else localStorage.setItem(ROT_KEY,String(rot)); }catch(e){} }

  // Interactive redesigns for plates whose page has no switch of its own.
  // Generated list: tools/wire.py rewrites the REDESIGNS line from the redesign/ folder.
  var REDESIGNS={};
  var NUM=parseInt((PAGE.match(/p(\d+)\.html/)||[])[1],10);
  function addSeg(wrap,second){
    var seg=document.createElement('div'); seg.className='seg';
    seg.innerHTML='<button type="button" class="on" data-view="plate">Original plate</button><button type="button" data-view="redesign">'+second+'</button>';
    wrap.insertBefore(seg, wrap.firstChild);
  }
  (function wireRedesign(){
    var r=REDESIGNS[PAGE], wrap=document.getElementById('stagewrap');
    if(!r || !wrap || wrap.querySelector('.seg')) return;
    addSeg(wrap,'Interactive redesign \u2726');
    var f=document.createElement('iframe'); f.className='frame'; f.title='redesign'; f.loading='lazy'; f.src='../redesign/'+r[0];
    wrap.appendChild(f);
    var pn=document.querySelector('.tb-center .pnum');
    if(pn && !pn.querySelector('.serif')){ var s=document.createElement('span'); s.className='serif'; s.style.cssText='color:#ffcf5c;font-size:17px'; s.textContent=r[1]; pn.appendChild(document.createTextNode('\u00a0\u00b7\u00a0')); pn.appendChild(s); }
  })();

  // Text plates: a "Read text" view of the cleaned transcription in text/texts.js
  // (a script, not fetch(), so it also works when the atlas is opened from disk).
  (function wireText(){
    var wrap=document.getElementById('stagewrap');
    if(!wrap || wrap.querySelector('.seg') || !NUM) return;
    var sc=document.createElement('script'); sc.src='../text/texts.js';
    sc.onload=function(){
      var t=window.CHRONO_TEXT && window.CHRONO_TEXT[NUM];
      if(!t || wrap.querySelector('.seg')) return;
      addSeg(wrap,'Read text \u00b6');
      var pane=document.createElement('div'); pane.className='frame textpane';
      var lines=t.split('\n'), head=lines.shift(), h2=lines.shift(), html='<div class="tp-in"><div class="tp-k">'+esc(head)+'</div>';
      if(h2) html+='<h2 class="serif">'+esc(h2)+'</h2>';
      lines.join('\n').split(/\n\s*\n/).forEach(function(par){ par=par.trim(); if(par) html+='<p>'+esc(par).replace(/\n/g,'<br>')+'</p>'; });
      pane.innerHTML=html+'</div>'; wrap.appendChild(pane);
      bindSegs();
    };
    document.head.appendChild(sc);
    function esc(x){return x.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  })();

  // Layout fixes: the redesign switch sits on the plate, not under the top bar; on phones
  // the top bar fits the screen and the hint card gives way to the ORIENT buttons.
  (function phoneStyles(){
    var st=document.createElement('style');
    // .seg is placed against #stagewrap; without this it was placed against the page and
    // hid under the sticky top bar, so the "Interactive redesign" switch could not be reached.
    st.textContent='.stagewrap{position:relative}'+
      '.textpane{overflow:auto;-webkit-overflow-scrolling:touch}.textpane .tp-in{max-width:760px;margin:0 auto;padding:84px 30px 70px;color:#dfe6f5;font-size:17px;line-height:1.75}'+
      '.textpane .tp-k{font-family:\'JetBrains Mono\',monospace;font-size:11px;letter-spacing:.3em;color:#7f8db0;text-transform:uppercase}'+
      '.textpane h2{font-size:30px;color:#ffcf5c;margin:.3em 0 .8em;line-height:1.15}.textpane p{margin:0 0 1.05em}'+
      '@media(max-width:640px){'+
      '.topbar{gap:8px!important;padding-left:12px!important;padding-right:12px!important}'+
      '.topbar .brand{font-size:17px!important}.topbar .brand small{display:none!important}'+
      '.tb-center .badge{display:none!important}.tb-center .pnum{font-size:12px!important}.tb-center .serif{font-size:14px!important}'+
      '.topbar .navbtn{width:34px!important;height:34px!important}.topbar .navbtn.ghost{width:auto!important;padding:0 9px!important}'+
      '.hintbar{display:none!important}'+
      '.orient{left:12px!important;transform:none!important;max-width:calc(100% - 84px)!important;border-radius:16px!important;padding:6px 8px!important}'+
      '.orient span{display:none}'+
      '.textpane .tp-in{padding:70px 18px 50px!important;font-size:15.5px!important}'+
      '.seg{top:10px!important;max-width:calc(100% - 20px)}.seg button{padding:7px 11px!important;font-size:11.5px!important}'+
      '}';
    document.head.appendChild(st);
  })();

  function fit(){
    var sw=stage.clientWidth-80, sh=stage.clientHeight-80;
    var rw=(rot%180===0)?W:H, rh=(rot%180===0)?H:W;
    base=Math.min(sw/rw, sh/rh);
    scale=base; x=0; y=0; apply();
  }
  function apply(){
    paper.style.width=W+'px'; paper.style.height=H+'px';
    paper.style.transform='translate(-50%,-50%) translate('+x+'px,'+y+'px) scale('+scale+') rotate('+rot+'deg)';
  }
  function zoom(f){ scale=Math.max(base*0.5, Math.min(base*12, scale*f)); apply(); }
  function rotate(quarterTurns){ rot=((rot+90*quarterTurns)%360+360)%360; saveRot(); fit(); }

  stage.addEventListener('wheel',function(e){e.preventDefault();zoom(e.deltaY<0?1.12:0.89);},{passive:false});

  // Drag to pan. A press that starts on a button or link is left alone: capturing the
  // pointer there sent the release to the stage, so the button's click never fired.
  function onControl(t){ return t && t.closest && t.closest('button, a, .controls, .orient, .seg'); }
  // The plate image is not draggable: a native image drag cancelled the pan mid-way.
  var img=paper.querySelector('img');
  if(img){ img.draggable=false; img.addEventListener('dragstart',function(e){e.preventDefault();}); }
  stage.style.touchAction='none';
  var drag=false,px,py;
  stage.addEventListener('pointerdown',function(e){
    if(onControl(e.target) || e.button>0) return;
    e.preventDefault();
    drag=true;px=e.clientX;py=e.clientY;stage.classList.add('grabbing');
    try{stage.setPointerCapture(e.pointerId);}catch(err){}
  });
  stage.addEventListener('pointermove',function(e){if(!drag)return;x+=e.clientX-px;y+=e.clientY-py;px=e.clientX;py=e.clientY;apply();});
  function endDrag(){drag=false;stage.classList.remove('grabbing');}
  stage.addEventListener('pointerup',endDrag);
  stage.addEventListener('pointercancel',endDrag);
  window.addEventListener('resize',fit);

  var acts=document.querySelectorAll('[data-act]');
  for(var i=0;i<acts.length;i++){ acts[i].onclick=(function(b){return function(){
    var a=b.dataset.act;
    if(a==='in')zoom(1.25); else if(a==='out')zoom(0.8);
    else if(a==='rot')rotate(1); else if(a==='fit')fit();
  };})(acts[i]); }

  document.addEventListener('keydown',function(e){
    if(e.ctrlKey||e.metaKey||e.altKey) return;
    var t=e.target; if(t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)) return;
    if(e.key==='ArrowLeft'&&window.PREV)location.href=window.PREV;
    else if(e.key==='ArrowRight'&&window.NEXT)location.href=window.NEXT;
    else if(e.key==='+'||e.key==='=')zoom(1.25);
    else if(e.key==='-')zoom(0.8);
    else if(e.key==='r')rotate(1);
    else if(e.key==='R')rotate(-1);
    else if(e.key.toLowerCase()==='f')fit();
    else if(e.key==='Escape')location.href='../index.html';
  });
  fit();

  var bar=document.createElement('div');
  bar.className='orient';
  bar.setAttribute('role','group');
  bar.setAttribute('aria-label','Turn the plate');
  bar.style.cssText='position:absolute;left:50%;bottom:16px;transform:translateX(-50%);z-index:16;display:flex;flex-wrap:wrap;justify-content:center;gap:8px;align-items:center;max-width:calc(100% - 24px);background:#070d18cc;border:1px solid #26324f;border-radius:100px;padding:5px 6px 5px 14px;box-shadow:0 8px 26px -10px #000';
  var lbl=document.createElement('span');
  lbl.textContent='ORIENT';
  lbl.style.cssText='font-family:monospace;font-size:10px;letter-spacing:.18em;color:#7f8db0';
  bar.appendChild(lbl);
  function pill(txt,title,fn){
    var b=document.createElement('button');
    b.type='button';
    b.textContent=txt; b.title=title;
    b.style.cssText='font-family:monospace;font-size:12px;color:#1a1204;background:#ffce44;border:0;border-radius:100px;padding:8px 13px;cursor:pointer;font-weight:700;box-shadow:0 0 16px #ffd15c55;touch-action:manipulation';
    b.onclick=fn; bar.appendChild(b);
  }
  pill('Rotate L','Turn a quarter left (Shift+R)',function(){rotate(-1);});
  pill('Rotate R','Turn a quarter right (R)',function(){rotate(1);});
  pill('Flip 180','Turn upside down',function(){rotate(2);});
  stage.appendChild(bar);

  function bindSegs(){
    var segs=document.querySelectorAll('.seg button');
    var wrap=document.getElementById('stagewrap');
    for(var j=0;j<segs.length;j++){ segs[j].onclick=(function(btn){return function(){
      for(var k=0;k<segs.length;k++)segs[k].classList.remove('on');
      btn.classList.add('on');
      if(btn.dataset.view==='redesign')wrap.classList.add('redesign');
      else { wrap.classList.remove('redesign'); setTimeout(fit,30); }
    };})(segs[j]); }
  }
  bindSegs();
})();
