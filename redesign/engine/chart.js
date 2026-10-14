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

  // ── scale ────────────────────────────────────────────────────
  const W = 1400, L = 30, R = 30;
  const range = P.range || [-5300, 2150];
  const [ra, rb] = range.map(astro);
  const x = (y) => L + ((astro(y) - ra) / (rb - ra)) * (W - L - R);

  // event label rows (greedy, no overlap)
  // Labels read rightward from their mark; near the right edge they flip and read leftward.
  const MAXC = 40;
  const short = (t) => (t.length > MAXC ? t.slice(0, MAXC - 1) + '…' : t);
  const evs = (P.events || []).map((e, i) => ({ ...e, i, x: x(e.year) })).sort((a, b) => a.x - b.x);
  const rows = [];
  evs.forEach((e) => {
    const w = short(e.label).length * 6.6 + fmt(e.year).length * 7.4 + 14;
    e.flip = e.x + w > W - R;
    const [s0, s1] = e.flip ? [e.x - w, e.x] : [e.x, e.x + w];
    let r = rows.findIndex((iv) => iv.every(([a, b]) => s1 < a - 6 || s0 > b + 6));
    if (r < 0) { r = rows.length; rows.push([]); }
    rows[r].push([s0, s1]); e.row = r;
  });
  const EV_ROW = 30, evH = Math.max(rows.length, 1) * EV_ROW + 20;

  // span rows (packed)
  const spans = (P.spans || []).map((s, i) => ({ ...s, i, a: x(s.from), b: x(s.to) }));
  const srows = [];
  [...spans].sort((p, q) => p.a - q.a).forEach((s) => {
    const textW = s.label.length * 6.6 + 16;
    // A label wider than its bar spills right, or left when that would leave the chart.
    s.flip = s.a + textW > W - R;
    const s0 = s.flip ? Math.min(s.a, s.b - textW) : s.a;
    const s1 = s.flip ? s.b : Math.max(s.b, s.a + textW);
    let r = srows.findIndex((iv) => iv.every(([a, b]) => s1 < a - 6 || s0 > b + 6));
    if (r < 0) { r = srows.length; srows.push([]); }
    srows[r].push([s0, s1]); s.row = r;
  });
  const SP_ROW = 30, AXIS_Y = 40 + evH, SP_Y = AXIS_Y + 34;
  const CY_Y = SP_Y + srows.length * SP_ROW + 24;
  const cycles = P.cycles || [];
  const ringRows = cycles.map((c) => Math.max(...Array.from({ length: c.count }, (_, k) => x(c.start + (k + 1) * c.step * (c.step > 0 ? 1 : 1)) - x(c.start + k * c.step))) / 2);
  let cyEnd = CY_Y;
  const cyY = ringRows.map((r) => { const y = cyEnd + r; cyEnd += r * 2 + 18; return y; });
  const H = cyEnd + 30;

  // ── draw ─────────────────────────────────────────────────────
  let s = '';
  const tip = (h, yr, b) => `data-h="${esc(h)}" data-yr="${esc(yr)}" data-b="${esc(b || '')}"`;
  // axis ticks every 500 / 100 years depending on range
  const step = rb - ra > 3000 ? 500 : rb - ra > 1200 ? 200 : 100;
  for (let t = Math.ceil(range[0] / step) * step; t <= range[1]; t += step) {
    if (t === 0) continue;
    const tx = x(t);
    s += `<line x1="${tx}" x2="${tx}" y1="${AXIS_Y}" y2="${H - 10}" stroke="#1b2540"/>`;
    s += `<text x="${tx}" y="${AXIS_Y + 17}" fill="#5b6785" font-size="11" text-anchor="middle" class="mono">${fmt(t)}</text>`;
  }
  s += `<line x1="${L}" x2="${W - R}" y1="${AXIS_Y}" y2="${AXIS_Y}" stroke="var(--line2)" stroke-width="1.5"/>`;
  const bcad = x(1);
  if (bcad > L && bcad < W - R) s += `<line x1="${bcad}" x2="${bcad}" y1="${AXIS_Y - 6}" y2="${H - 10}" stroke="#3b4a6e" stroke-dasharray="3 4"/><text x="${bcad + 5}" y="${H - 14}" fill="#5b6785" font-size="11">BC | AD</text>`;

  (P.anchors || []).forEach((a) => {
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
    const len = astro(sp.to) - astro(sp.from);
    const ok = sp.years == null || Math.abs(len - sp.years) <= 1;
    sp.ok = ok; sp.len = len;
    s += `<g class="hot" data-cat="${sp.cat || 'cycle'}" ${tip(sp.label, `${fmt(sp.from)} → ${fmt(sp.to)} · ${len} yr`, (sp.formula ? sp.formula + ' · ' : '') + (sp.note || ''))}>
      <rect x="${sp.a}" y="${y}" width="${Math.max(sp.b - sp.a, 2)}" height="18" rx="4" fill="${col(sp.cat || 'cycle')}" fill-opacity=".28" stroke="${col(sp.cat || 'cycle')}" stroke-opacity=".8"/>
      <text x="${sp.flip ? sp.b - 6 : sp.a + 6}" y="${y + 13}" text-anchor="${sp.flip ? 'end' : 'start'}" fill="#e9edf6" font-size="12" class="halo">${esc(sp.label)}</text></g>`;
  });

  cycles.forEach((c, ci) => {
    for (let k = 0; k < c.count; k++) {
      const a = c.start + k * c.step, b = a + c.step;
      const xa = x(a), xb = x(b), r = (xb - xa) / 2, cx = xa + r;
      s += `<g class="hot" data-cat="cycle" ${tip(`${c.label || c.step}-year cycle`, `${fmt(a)} → ${fmt(b)}`, c.note)}>
        <circle cx="${cx}" cy="${cyY[ci]}" r="${Math.max(r - 1, 3)}" fill="none" stroke="var(--c-cycle)" stroke-opacity=".7"/>
        ${r > 14 ? `<text x="${cx}" y="${cyY[ci] + 4}" fill="var(--c-cycle)" font-size="${Math.min(13, r * 0.6)}" text-anchor="middle" class="mono">${esc(c.label || c.step)}</text>` : ''}</g>`;
    }
  });

  const svg = document.getElementById('tl');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = s;

  // ── math panel ───────────────────────────────────────────────
  const math = [...spans.map((sp) => ({ eq: `${fmt(sp.from)} → ${fmt(sp.to)} = ${sp.len} yr${sp.years != null && !sp.ok ? `  (plate: ${sp.years})` : ''}`, cap: sp.label + (sp.formula ? ' · ' + sp.formula : ''), bad: !sp.ok })),
    ...(P.math || []).map((m) => {
      let bad = false;
      try { const [l, r] = m.eq.replace(/×/g, '*').replace(/÷/g, '/').replace(/,/g, '').split('='); bad = r != null && Math.abs(Function(`return (${l})`)() - Function(`return (${r})`)()) > 0.5; } catch { /* not pure arithmetic */ }
      return { ...m, bad };
    })];
  document.getElementById('math').innerHTML = math.map((m) => `<div class="mrow${m.bad ? ' bad' : ''}"><span class="eq">${esc(m.eq)}</span><span class="cap">${esc(m.cap || '')}</span></div>`).join('');

  // ── interaction ──────────────────────────────────────────────
  const tipEl = document.getElementById('tip');
  svg.addEventListener('mousemove', (ev) => {
    const g = ev.target.closest('.hot');
    if (!g) { tipEl.style.opacity = 0; return; }
    tipEl.innerHTML = `<div class="t-h">${g.dataset.h}</div><div class="t-yr">${g.dataset.yr}</div>${g.dataset.b ? `<div class="t-b">${g.dataset.b}</div>` : ''}`;
    tipEl.style.opacity = 1;
    tipEl.style.left = Math.min(ev.clientX + 14, innerWidth - 330) + 'px';
    tipEl.style.top = ev.clientY + 14 + 'px';
  });
  svg.addEventListener('mouseleave', () => (tipEl.style.opacity = 0));
  document.getElementById('chips').addEventListener('click', (ev) => {
    const c = ev.target.closest('.chip');
    if (!c) return;
    c.classList.toggle('off');
    const off = new Set([...document.querySelectorAll('.chip.off')].map((n) => n.dataset.cat));
    svg.querySelectorAll('[data-cat]').forEach((g) => g.classList.toggle('dim', off.has(g.dataset.cat)));
  });
})();
