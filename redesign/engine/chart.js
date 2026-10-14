/* Chronotecture plate engine.
 * Draws one plate spec (redesign/data/pNNN.js → window.PLATE) as an interactive horizontal timeline:
 * anchor lines, an event band with leader lines, packed span bars, cycle-ring rows, a math check panel,
 * the plate's own notes, and the original scan for comparison.
 *
 * Years in the spec are written as the plate writes them: negative = BC (2239 BC → -2239), no year zero.
 * The engine converts to astronomical years (1 BC = 0) for positions and arithmetic.
 */
(function () {
  const P = window.PLATE;
  const CAT = {
    comet: ['Comet / sky', 'var(--c-comet)'], quake: ['Quake / upheaval', 'var(--c-quake)'],
    proph: ['Prophecy', 'var(--c-proph)'], hist: ['History', 'var(--c-hist)'],
    flood: ['Flood', 'var(--c-flood)'], impact: ['Impact', 'var(--c-impact)'],
    eden: ['Eden / origins', 'var(--c-eden)'], anun: ['Anunnaki', 'var(--c-anun)'],
    cycle: ['Cycle', 'var(--c-cycle)'],
  };
  const col = (c) => (CAT[c] || CAT.hist)[1];
  const astro = (y) => (y < 0 ? y + 1 : y);
  const fmt = (y) => (y < 0 ? `${-y} BC` : `${y} AD`);
  const am = (y) => astro(y) + 3894; // Chronicon arithmetic: AD = AM − 3894
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, attrs = {}, kids = '') =>
    `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(' ')}>${kids}</${tag}>`;

  // ── page shell ───────────────────────────────────────────────
  document.title = `Chronotecture · Plate ${P.plate}${P.chart ? ' · Chart ' + P.chart : ''} — ${P.title}`;
  const pad = String(P.plate).padStart(3, '0');
  const cats = [...new Set([...(P.events || []), ...(P.spans || [])].map((x) => x.cat || 'hist'))];
  // Inside the plate page's frame the page already has its own navigation.
  const framed = window.self !== window.top;
  // A figure plate with nothing dated gets no timeline card, just its notes and the original.
  const hasTimeline = (P.events?.length || 0) + (P.spans?.length || 0) + (P.cycles?.length || 0) > 0;
  document.body.innerHTML = `
  ${framed ? '' : `<div class="nav"><a href="../pages/p${pad}.html">ORIGINAL PLATE</a><a href="../index.html">ATLAS</a></div>`}
  <div class="wrap">
    <header class="masthead">
      <div class="kicker">Chronotecture · Plate ${P.plate}${P.chart ? ' · Chart ' + esc(P.chart) : ''}</div>
      <h1>${esc(P.title)}${P.subtitle ? `<span class="sub">${esc(P.subtitle)}</span>` : ''}</h1>
      <div class="prov">Redrawn from <b>Plate ${P.plate}</b> of Jason M. Breshears, <i>Chronotecture: The Lost Science of Prophetic Engineering</i> (2017)${P.signed ? `, signed <b>${esc(P.signed)}</b>` : ''}. Dates and spans are transcribed as the plate gives them; the math panel checks the arithmetic, it doesn't change it.</div>
    </header>
    <div class="toolbar" id="chips" ${hasTimeline ? '' : 'hidden'}><span class="lbl">Show</span>${cats.map((c) => `<span class="chip" data-cat="${c}"><span class="dot" style="background:${col(c)}"></span>${(CAT[c] || CAT.hist)[0]}</span>`).join('')}</div>
    <div class="card" ${hasTimeline ? '' : 'hidden'}><h2>The timeline</h2><div class="hint">Hover any mark for its date, Anno Mundi year and arithmetic. Gold lines are the plate's anchors.</div>
      <div class="scroller"><svg class="tl" id="tl"></svg></div></div>
    <div class="bottom">
      <div class="card"><h2>The arithmetic</h2><div class="hint">Every span on the plate, checked. Red means the stated length and the dates disagree.</div><div class="mathgrid" id="math"></div>
        ${P.notes?.length ? `<h2 style="margin-top:14px">On the plate</h2><ul class="notes">${P.notes.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}</div>
      <div class="card"><h2>The original</h2><div class="hint">Plate ${P.plate} as drawn${P.rotated ? ', turned upright' : ''}. <a href="../plates/p${pad}.png" target="_blank">Full size</a></div>
        <div class="orig${P.rotated ? ' rot' : ''}"><img src="../plates/p${pad}.png" alt="Original plate ${P.plate}" loading="lazy"></div></div>
    </div>
    <div class="foot">${P.transcribed ? esc(P.transcribed) + ' · ' : ''}Engine: redesign/engine/chart.js · Data: redesign/data/p${pad}.js</div>
  </div><div id="tip"></div>`;

  // ── scale and view ───────────────────────────────────────────
  // The view is a window in astronomical years; drawing re-runs for every zoom.
  const W = 1400, L = 30, R = 30, PW = W - L - R;
  const range = P.range || [-5300, 2150];
  const full = { a: astro(range[0]), b: astro(range[1]) };
  let view = { ...full };
  const hist = (t) => (t <= 0 ? t - 1 : t); // astronomical → as written (BC negative)
  const MAXC = 40;
  const short = (t) => (t.length > MAXC ? t.slice(0, MAXC - 1) + '…' : t);
  const tip = (h, yr, b) => `data-h="${esc(h)}" data-yr="${esc(yr)}" data-b="${esc(b || '')}"`;
  const cycles = P.cycles || [];

  // Arithmetic is independent of the view, so it's settled once.
  const spansAll = (P.spans || []).map((s, i) => {
    const len = astro(s.to) - astro(s.from);
    return { ...s, i, len, ok: s.years == null || Math.abs(len - s.years) <= 1 };
  });

  function niceStep(span) {
    const raw = span / 9, p = 10 ** Math.floor(Math.log10(raw));
    for (const m of [1, 2, 2.5, 5, 10]) if (raw <= m * p) return m * p;
    return 10 * p;
  }

  function draw() {
    const { a: va, b: vb } = view;
    const x = (y) => L + ((astro(y) - va) / (vb - va)) * PW;
    const inView = (y) => astro(y) >= va && astro(y) <= vb;

    // event label rows: read rightward, flip leftward near the right edge, no overlaps
    const evs = (P.events || []).filter((e) => inView(e.year)).map((e) => ({ ...e, x: x(e.year) })).sort((p, q) => p.x - q.x);
    const rows = [];
    evs.forEach((e) => {
      const w = short(e.label).length * 6.6 + fmt(e.year).length * 7.4 + 14;
      e.flip = e.x + w > W - R;
      const [s0, s1] = e.flip ? [e.x - w, e.x] : [e.x, e.x + w];
      let r = rows.findIndex((iv) => iv.every(([p, q]) => s1 < p - 6 || s0 > q + 6));
      if (r < 0) { r = rows.length; rows.push([]); }
      rows[r].push([s0, s1]); e.row = r;
    });
    const EV_ROW = 30, AXIS_Y = 40 + Math.max(rows.length, 1) * EV_ROW + 20;

    // spans that touch the view, clipped to it, packed into rows
    const spans = spansAll.filter((s) => astro(s.to) >= va && astro(s.from) <= vb).map((s) => ({
      ...s, a: Math.max(x(s.from), L), b: Math.min(x(s.to), W - R), cutL: astro(s.from) < va, cutR: astro(s.to) > vb,
    }));
    const srows = [];
    [...spans].sort((p, q) => p.a - q.a).forEach((s) => {
      const textW = s.label.length * 6.6 + 16;
      s.flip = s.a + textW > W - R;
      const s0 = s.flip ? Math.min(s.a, s.b - textW) : s.a;
      const s1 = s.flip ? s.b : Math.max(s.b, s.a + textW);
      let r = srows.findIndex((iv) => iv.every(([p, q]) => s1 < p - 6 || s0 > q + 6));
      if (r < 0) { r = srows.length; srows.push([]); }
      srows[r].push([s0, s1]); s.row = r;
    });
    const SP_ROW = 30, SP_Y = AXIS_Y + 34;

    // cycle rows: ring size follows the zoom, capped so a deep zoom stays readable
    let cyEnd = SP_Y + srows.length * SP_ROW + 24;
    const cyR = cycles.map((c) => Math.min(((c.step / (vb - va)) * PW) / 2, 70));
    const cyY = cyR.map((r) => { const y = cyEnd + r; cyEnd += r * 2 + 18; return y; });
    const H = cyEnd + 30;

    let s = `<defs><clipPath id="plot"><rect x="${L}" y="0" width="${PW}" height="${H}"/></clipPath></defs>`;
    // ticks on round years as the plate writes them
    const step = niceStep(vb - va);
    for (let h = Math.ceil(hist(Math.floor(va)) / step) * step; ; h += step) {
      const t = h < 0 ? h + 1 : h;
      if (t > vb) break;
      if (t < va || h === 0) continue;
      const tx = L + ((t - va) / (vb - va)) * PW;
      s += `<line x1="${tx}" x2="${tx}" y1="${AXIS_Y}" y2="${H - 10}" stroke="#1b2540"/>`;
      s += `<text x="${tx}" y="${AXIS_Y + 17}" fill="#5b6785" font-size="11" text-anchor="middle" class="mono">${fmt(h)}</text>`;
    }
    s += `<line x1="${L}" x2="${W - R}" y1="${AXIS_Y}" y2="${AXIS_Y}" stroke="var(--line2)" stroke-width="1.5"/>`;
    const bcad = x(1);
    if (bcad > L && bcad < W - R) s += `<line x1="${bcad}" x2="${bcad}" y1="${AXIS_Y - 6}" y2="${H - 10}" stroke="#3b4a6e" stroke-dasharray="3 4"/><text x="${bcad + 5}" y="${H - 14}" fill="#5b6785" font-size="11">BC | AD</text>`;

    (P.anchors || []).filter((a) => inView(a.year)).forEach((a) => {
      const ax = x(a.year);
      s += `<g class="hot" ${tip(a.label, `${fmt(a.year)} · AM ${am(a.year)}`, a.note)}><line x1="${ax}" x2="${ax}" y1="18" y2="${H - 10}" stroke="var(--anchor)" stroke-width="2" stroke-opacity=".75"/>
        <text x="${ax}" y="12" fill="var(--anchor)" font-size="12.5" font-weight="600" text-anchor="middle" class="halo">${esc(a.label)}</text></g>`;
    });

    evs.forEach((e) => {
      const ty = AXIS_Y - 22 - e.row * EV_ROW;
      s += `<g class="hot" data-cat="${e.cat || 'hist'}" ${tip(e.label, `${fmt(e.year)} · AM ${e.am ?? am(e.year)}`, e.note)}>
        <line x1="${e.x}" x2="${e.x}" y1="${ty + 4}" y2="${AXIS_Y}" stroke="${col(e.cat)}" stroke-opacity=".5"/>
        <circle cx="${e.x}" cy="${AXIS_Y}" r="4.5" fill="${col(e.cat)}"/>
        <text x="${e.flip ? e.x - 6 : e.x + 6}" y="${ty}" text-anchor="${e.flip ? 'end' : 'start'}" fill="${col(e.cat)}" font-size="12.5" class="halo"><tspan class="mono" fill="#cfd6e6">${fmt(e.year)}</tspan> ${esc(short(e.label))}</text></g>`;
    });

    spans.forEach((sp) => {
      const y = SP_Y + sp.row * SP_ROW;
      const c = col(sp.cat || 'cycle');
      // a bar that continues past the window gets an arrowed end
      const arrow = (px, dir) => `<path d="M${px},${y + 3} l${dir * 7},6 l${-dir * 7},6" fill="none" stroke="${c}" stroke-width="1.6"/>`;
      const tx = sp.flip ? sp.b - (sp.cutR ? 18 : 6) : sp.a + (sp.cutL ? 18 : 6);
      s += `<g class="hot" data-cat="${sp.cat || 'cycle'}" ${tip(sp.label, `${fmt(sp.from)} → ${fmt(sp.to)} · ${sp.len} yr`, (sp.formula ? sp.formula + ' · ' : '') + (sp.note || ''))}>
        <rect x="${sp.a}" y="${y}" width="${Math.max(sp.b - sp.a, 2)}" height="18" rx="4" fill="${c}" fill-opacity=".28" stroke="${c}" stroke-opacity=".8"/>
        ${sp.cutL ? arrow(sp.a + 8, -1) : ''}${sp.cutR ? arrow(sp.b - 8, 1) : ''}
        <text x="${tx}" y="${y + 13}" text-anchor="${sp.flip ? 'end' : 'start'}" fill="#e9edf6" font-size="12" class="halo">${esc(sp.label)}</text></g>`;
    });

    s += '<g clip-path="url(#plot)">';
    cycles.forEach((c, ci) => {
      for (let k = 0; k < c.count; k++) {
        const a = c.start + k * c.step, b = a + c.step;
        if (astro(b) < va || astro(a) > vb) continue;
        const xa = x(a), xb = x(b), cx = (xa + xb) / 2, r = Math.min((xb - xa) / 2, cyR[ci]);
        s += `<g class="hot" data-cat="cycle" ${tip(`${c.label || c.step}-year cycle`, `${fmt(a)} → ${fmt(b)}`, c.note)}>
          <circle cx="${cx}" cy="${cyY[ci]}" r="${Math.max(r - 1, 3)}" fill="none" stroke="var(--c-cycle)" stroke-opacity=".7"/>
          ${r > 14 ? `<text x="${cx}" y="${cyY[ci] + 4}" fill="var(--c-cycle)" font-size="${Math.min(13, r * 0.6)}" text-anchor="middle" class="mono">${esc(c.label || c.step)}</text>` : ''}</g>`;
      }
    });
    s += '</g><rect id="brush" x="0" y="0" width="0" height="0" fill="var(--c-cycle)" fill-opacity=".1" stroke="var(--c-cycle)" stroke-dasharray="4 3"/>';

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = s;
    applyChips();
    const zoomed = view.a > full.a + 0.5 || view.b < full.b - 0.5;
    document.getElementById('zoomlbl').textContent = `${fmt(hist(Math.round(view.a)))} → ${fmt(hist(Math.round(view.b)))}`;
    document.getElementById('zfull').hidden = !zoomed;
    document.getElementById('zout').hidden = !zoomed;
  }

  // ── zoom controls ────────────────────────────────────────────
  const svg = document.getElementById('tl');
  svg.closest('.card').querySelector('.hint').insertAdjacentHTML('afterend', `<div class="zoombar">
    <span class="mono" id="zoomlbl"></span>
    <button class="chip" id="zdense" hidden></button>
    <button class="chip" id="zout" hidden>Zoom out</button>
    <button class="chip" id="zfull" hidden>Whole plate</button>
    <span class="zhint">Drag across the timeline to zoom in</span></div>`);

  const setView = (a, b) => {
    const span = Math.min(Math.max(b - a, 12), full.b - full.a);
    let na = (a + b) / 2 - span / 2;
    na = Math.min(Math.max(na, full.a), full.b - span);
    view = { a: na, b: na + span };
    draw();
  };
  document.getElementById('zfull').onclick = () => setView(full.a, full.b);
  document.getElementById('zout').onclick = () => { const m = (view.a + view.b) / 2, h = view.b - view.a; setView(m - h, m + h); };

  // The crowded stretch: the window an eighth of the plate wide holding the most dated events.
  (function dense() {
    const ys = (P.events || []).map((e) => astro(e.year)).sort((p, q) => p - q);
    const w = (full.b - full.a) / 8;
    let best = { n: 0 }, j = 0;
    for (let i = 0; i < ys.length; i++) {
      while (ys[i] - ys[j] > w) j++;
      if (i - j + 1 > best.n) best = { n: i - j + 1, a: ys[j], b: ys[i] };
    }
    if (best.n < 6 || best.n < ys.length * 0.3) return;
    const pad = Math.max((best.b - best.a) * 0.08, 5);
    const btn = document.getElementById('zdense');
    btn.hidden = false;
    btn.textContent = `Zoom to the crowded stretch · ${best.n} dates`;
    btn.onclick = () => setView(best.a - pad, best.b + pad);
  })();

  // Drag-to-zoom brush, in viewBox coordinates.
  const toVB = (ev) => { const p = svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  let drag = null;
  svg.addEventListener('pointerdown', (ev) => { if (ev.button === 0) { drag = { x0: toVB(ev).x }; svg.setPointerCapture(ev.pointerId); } });
  svg.addEventListener('pointermove', (ev) => {
    if (!drag) return;
    const x1 = toVB(ev).x, b = document.getElementById('brush');
    b.setAttribute('x', Math.min(drag.x0, x1)); b.setAttribute('width', Math.abs(x1 - drag.x0));
    b.setAttribute('height', svg.viewBox.baseVal.height);
  });
  svg.addEventListener('pointerup', (ev) => {
    if (!drag) return;
    const x1 = toVB(ev).x, x0 = drag.x0;
    drag = null;
    if (Math.abs(x1 - x0) < 10) { document.getElementById('brush').setAttribute('width', 0); return; }
    const yr = (px) => view.a + ((Math.min(Math.max(px, L), W - R) - L) / PW) * (view.b - view.a);
    setView(yr(Math.min(x0, x1)), yr(Math.max(x0, x1)));
  });

  // ── math panel ───────────────────────────────────────────────
  const math = [...spansAll.map((sp) => ({ eq: `${fmt(sp.from)} → ${fmt(sp.to)} = ${sp.len} yr${sp.years != null && !sp.ok ? `  (plate: ${sp.years})` : ''}`, cap: sp.label + (sp.formula ? ' · ' + sp.formula : ''), bad: !sp.ok })),
    ...(P.math || []).map((m) => {
      let bad = false;
      try { const [l, r] = m.eq.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '').split('='); bad = r != null && Math.abs(Function(`return (${l})`)() - Function(`return (${r})`)()) > 0.5; } catch { /* not pure arithmetic */ }
      return { ...m, bad };
    })];
  document.getElementById('math').innerHTML = math.map((m) => `<div class="mrow${m.bad ? ' bad' : ''}"><span class="eq">${esc(m.eq)}</span><span class="cap">${esc(m.cap || '')}</span></div>`).join('');

  // ── tooltips and category chips ──────────────────────────────
  const tipEl = document.getElementById('tip');
  svg.addEventListener('mousemove', (ev) => {
    const g = !drag && ev.target.closest('.hot');
    if (!g) { tipEl.style.opacity = 0; return; }
    tipEl.innerHTML = `<div class="t-h">${g.dataset.h}</div><div class="t-yr">${g.dataset.yr}</div>${g.dataset.b ? `<div class="t-b">${g.dataset.b}</div>` : ''}`;
    tipEl.style.opacity = 1;
    tipEl.style.left = Math.min(ev.clientX + 14, innerWidth - 330) + 'px';
    tipEl.style.top = ev.clientY + 14 + 'px';
  });
  svg.addEventListener('mouseleave', () => (tipEl.style.opacity = 0));
  function applyChips() {
    const off = new Set([...document.querySelectorAll('#chips .chip.off')].map((n) => n.dataset.cat));
    svg.querySelectorAll('[data-cat]').forEach((g) => g.classList.toggle('dim', off.has(g.dataset.cat)));
  }
  document.getElementById('chips').addEventListener('click', (ev) => {
    const c = ev.target.closest('.chip');
    if (!c) return;
    c.classList.toggle('off');
    applyChips();
  });

  draw();
  // pNNN.html#dense opens straight onto the crowded stretch.
  if (location.hash === '#dense') document.getElementById('zdense').click();
})();
