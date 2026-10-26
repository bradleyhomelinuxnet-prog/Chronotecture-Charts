/* The Pyramid Chronograph — the Great Pyramid's passages in 3D, labelled with the
   sums Breshears wrote on plates 111–117, and his Great Step chronometer.

   No library: a pyramid is lines and flat faces, so this is a hand-written
   perspective projection onto a 2D canvas, painter-sorted. Everything is in
   pyramid inches (P″). Axes: x runs north (+) to south (−), y is height above the
   base, z runs east (+) to west (−). The passages are drawn in the centre plane,
   z = 0; on the monument they run about 287 P″ east of it.

   Geometry. Where a plate gives a measure, that measure places the part:
     plate 116  Great Step at 1656 above the base, 34 high; Gallery 340 high
     plate 112  Grand Gallery 1836, Ascending Passage 1546, junction 1110 down the
                Descending Passage, Queen's Chamber passage 1518 (boxed)
     plate 113  330 from the Great Step face to the King's Chamber; chamber 324 N–S
     plate 115  subterranean chamber 552 wide, 1162 below the base; 138 high (boxed)
     plate 116  King's Chamber 412 × 204 × 230
     plate 117  534 from the Great Step face to the chamber's far wall
     plate 111  apex 5814, present height 5448
   Elsewhere it uses standard survey figures (Petrie, Smyth), rounded: base 9131,
   passage slopes 26.3° down and 26.05° up, the antechamber layout, the shafts.

   Chronometer. Charts XXIV–XXXIII read the King's Chamber passage floor as years:
   1 P″ = 1 year south from the Great Step face, 1902 CE, so 204 → 2106 (6000 AM),
   330 → 2232 at the chamber's north wall, 534 → 2436 at its south wall. */
(function () {
  'use strict';

  /* ------------------------------------------------------------ geometry -- */

  var RAD = Math.PI / 180;
  var DOWN = 26.3 * RAD, UP = 26.05 * RAD;
  var BASE_HALF = 9131 / 2, APEX = 5814, PRESENT = 5448;

  function add(p, q) { return [p[0] + q[0], p[1] + q[1], p[2] + q[2]]; }
  function along(p, angle, len, south, rising) {
    // A point `len` P″ from p along a passage in the centre plane.
    var dx = Math.cos(angle) * len * (south ? -1 : 1), dy = Math.sin(angle) * len * (rising ? 1 : -1);
    return add(p, [dx, dy, 0]);
  }

  // Work back from the Great Step face (x = 0), where the plates are most exact.
  var G1 = [0, 1656, 0];                                    // top of the Gallery floor, foot of the step
  var G0 = along(G1, UP, 1836, false, false);               // foot of the Grand Gallery
  var J = along(G0, UP, 1546, false, false);                // junction with the Descending Passage
  var E = along(J, DOWN, 1110, false, true);                // the entrance
  var STEP_TOP = 1656 + 34;
  var B = [E[0] - (E[1] + 1162) / Math.tan(DOWN), -1162, 0]; // foot of the Descending Passage
  var SUB_N = B[0] - 346, SUB_S = SUB_N - 324;              // subterranean chamber, north and south walls
  var QC_END = G0[0] - 1518;                                // Queen's Chamber passage, 1518 south

  var face = function (h) { return BASE_HALF * (1 - h / APEX); };

  function box(x0, x1, y0, y1, z0, z1) {
    return [[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]];
  }
  var BOX_FACES = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [1, 2, 6, 5], [0, 3, 7, 4]];

  // A passage: floor from a to b, `h` tall (vertical), `w` wide.
  function passage(a, b, h, w) {
    var hw = w / 2;
    return [[a[0], a[1], -hw], [b[0], b[1], -hw], [b[0], b[1], hw], [a[0], a[1], hw],
            [a[0], a[1] + h, -hw], [b[0], b[1] + h, -hw], [b[0], b[1] + h, hw], [a[0], a[1] + h, hw]];
  }

  var PARTS = [
    { id: 'dp', name: 'Descending Passage', kind: 'passage', verts: passage(E, B, 47, 41) },
    { id: 'lowpass', name: 'Passage to the subterranean chamber', kind: 'passage', verts: passage(B, [SUB_N, -1162, 0], 36, 32) },
    { id: 'sub', name: 'Subterranean chamber', kind: 'chamber', verts: box(SUB_S, SUB_N, -1162, -1162 + 138, -276, 276) },
    { id: 'ap', name: 'Ascending Passage', kind: 'passage', verts: passage(J, G0, 47, 41) },
    { id: 'qcp', name: 'Queen’s Chamber passage', kind: 'passage', verts: passage(G0, [QC_END, G0[1], 0], 46, 41) },
    { id: 'qc', name: 'Queen’s Chamber', kind: 'chamber', verts: box(QC_END - 206, QC_END, G0[1], G0[1] + 245, -113, 113) },
    { id: 'gg', name: 'Grand Gallery', kind: 'gallery', verts: passage(G0, G1, 340, 82) },
    { id: 'step', name: 'Great Step', kind: 'step', verts: box(-61, 0, 1656, STEP_TOP, -41, 41) },
    { id: 'ante', name: 'Antechamber', kind: 'chamber', verts: box(-229, -113, STEP_TOP, STEP_TOP + 149, -32, 32) },
    { id: 'kcp', name: 'Passages to the King’s Chamber', kind: 'passage', verts: box(-330, -61, STEP_TOP, STEP_TOP + 41, -21, 21) },
    { id: 'kc', name: 'King’s Chamber', kind: 'chamber', verts: box(-534, -330, STEP_TOP, STEP_TOP + 230, -371, 41) },
  ];

  // A straight shaft from a chamber wall at (x0, y0), rising at `deg` to the
  // north (+1) or south (−1) face: solves x = ±face(y) on the line.
  function shaft(x0, y0, deg, dir) {
    var t = Math.tan(deg * RAD), k = BASE_HALF / APEX;
    var u = (BASE_HALF - k * (y0 - dir * x0 * t)) / (1 + k * t); // |x| where the line meets the face
    var x = dir * u;
    return [[x0, y0, 0], [x, y0 + (x - x0) * dir * t, 0]];
  }

  // Lines that are not boxes: the well shaft (schematic) and the King's Chamber shafts.
  var WELL_FOOT = along(E, DOWN, 3550, true, false);
  var SHAFTS = [
    { name: 'Well shaft (schematic)', pts: [G0, [G0[0] - 60, G0[1] - 300, 0], [WELL_FOOT[0] + 40, WELL_FOOT[1] + 260, 0], WELL_FOOT] },
    { name: 'King’s Chamber north shaft', pts: shaft(-330, STEP_TOP + 36, 32.5, 1) },
    { name: 'King’s Chamber south shaft', pts: shaft(-534, STEP_TOP + 36, 45, -1) },
  ];

  /* ------------------------------------------------------- plate labels -- */

  // Each label is a plate's own words, pinned where the plate writes them.
  var mid = function (p, q, t) { return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t]; };
  var LABELS = [
    { plate: 111, at: [0, STEP_TOP + 340, 0], text: '2760 · level of the Great Step', sum: '2060 + 666 + 34 = 2760', note: 'Great Step 34″ high; ×10 is the Gallery ceiling over the step, 340.' },
    { plate: 111, at: along(E, DOWN, 3000, true, false), text: '2070 on the Descending Passage', sum: '1162 + 908 = 2070' },
    { plate: 111, at: along(E, DOWN, 2000, true, false), text: '4140 mean', sum: '4140 − 3036 = 1104', note: 'Written beside the Descending Passage.' },
    { plate: 111, at: [0, PRESENT, 0], text: '5448 present height · 5814 apex', note: '5814 P″ apex is 4114 to the step; 5448 present height is 3748.' },
    { plate: 111, at: E, text: '666 at the entrance', note: 'Heights at the entrance: 52 and 666; 1162 (1828) at the entrance face.' },

    { plate: 112, at: mid(E, J, 0.5), text: '1110 · entrance to the junction', note: 'Sloping lengths: 808 casing to entrance, 1110, 4146 and 3036 along the Descending Passage.' },
    { plate: 112, at: mid(J, G0, 0.5), text: '1546 · Ascending Passage' },
    { plate: 112, at: mid(G0, G1, 0.55), text: '1836 · Grand Gallery', note: 'Also 1815 written beside it.' },
    { plate: 112, at: mid(G0, [QC_END, G0[1], 0], 0.5), text: '1518 · boxed; 1518 × 3 = 4554', sum: '1518 × 3 = 4554' },
    { plate: 112, at: mid(E, B, 0.8), text: '3360 sloping line, one inch variance 3361', sum: '3000 + 360 = 3360' },
    { plate: 112, at: [-432, STEP_TOP + 230, -150], text: '204 · King’s and Queen’s Chambers', note: 'Both chambers marked 204; 534 between the Great Step and the axis.' },

    { plate: 113, at: [SUB_N - 162, -1162 + 138, 0], text: '324 = 108 × 3 · the lower chamber', sum: '162 + 162 = 324' },
    { plate: 113, at: [SUB_N + 173, -1162 - 40, 0], text: '346 · passage to the lower chamber' },
    { plate: 113, at: [SUB_S, -1162, -276], text: '1414 or 1412 · uneven terminus', sum: '906 + 508 = 1414' },
    { plate: 113, at: [-165, STEP_TOP - 70, 0], text: '330 · Great Step axis to the Upper Chamber', note: 'Axis offset 204 between the well-pit axis and the Great Step axis, drawn twice.' },

    { plate: 114, at: [0, STEP_TOP, 0], text: '5796 = 1902 CE', sum: '2760 + 3036 = 5796', note: '1110 + 176 + 666 + 808 = 2760; 2760 + 3036 = 5796 AM = 1902 CE.', anchor: true },
    { plate: 114, at: [face(4140), 4140, 0], text: '4140 · the 144th course', note: '144th course of blocks is 4140 inches.' },
    { plate: 114, at: [QC_END - 103, G0[1] + 245, 0], text: '1380 beside the Queen’s Chamber', sum: '534 + 846 = 1380' },
    { plate: 114, at: [0, APEX, 0], text: '6348 = 138 × 46', sum: '5814 + 534 = 6348' },
    { plate: 114, at: J, text: '176 · the junction', note: 'Entrance column 1110 + 176 + 666 + 808 = 2760.' },

    { plate: 115, at: [SUB_N - 162, -1162, 276], text: '552 wide = 138 × 4', sum: '2484 + 552 = 3036' },
    { plate: 115, at: B, text: '1162 to base · 908 along the passage', sum: '2070 + 552 + 138 = 2760' },

    { plate: 116, at: [-61, STEP_TOP, 0], text: '552 = 340 + 126 + 34 + 52', sum: '340 + 126 + 34 + 52 = 552' },
    { plate: 116, at: [-432, STEP_TOP + 230, 41], text: '412 × 204 × 230 = 19,331,040', sum: '552 × 35,020 = 19,331,040', note: 'The King’s Chamber in cubic inches; also 5520 × 3502.' },
    { plate: 116, at: [120, 1656 - 60, 41], text: '1656 = 138 × 12 to base', sum: '138 × 12 = 1656' },

    { plate: 117, at: [0, PRESENT, 287], text: '6000 − 5448 = 552', sum: '6000 − 5448 = 552', note: '5448 in height of the pyramid platform is 552 under 6000 inches.' },
    { plate: 117, at: [-534, STEP_TOP + 230, 0], text: '534 + 204 + 412 + 230 = 1380', sum: '534 + 204 + 412 + 230 = 1380' },
  ];

  // The chronometer's own marks (Charts XXIV–XXXIII).
  var TICKS = [
    { year: 1902, text: '1902 · Great Step face' },
    { year: 2106, text: '2106 · 6000 AM (204 P″)' },
    { year: 2232, text: '2232 · King’s Chamber (330 P″)' },
    { year: 2436, text: '2436 · far wall (534 P″)' },
  ];
  var CHRONO_FIRST = 1902, CHRONO_LAST = 2436;
  var chronoAt = function (year) { return [-(year - CHRONO_FIRST), STEP_TOP + 2, 0]; };

  /* -------------------------------------------------------------- camera -- */

  var cam = { yaw: Math.PI * 1.22, pitch: 0.28, dist: 17000, target: [0, 1600, 0], fov: 45 * RAD };
  var VIEWS = {
    three: { yaw: Math.PI * 1.22, pitch: 0.28, dist: 17000, target: [0, 1600, 0] },
    section: { yaw: Math.PI, pitch: 0, dist: 15000, target: [0, 1900, 0] },
    top: { yaw: Math.PI, pitch: 1.45, dist: 17000, target: [0, 0, 0] },
    step: { yaw: Math.PI * 1.15, pitch: 0.18, dist: 1600, target: [-260, STEP_TOP + 60, 0] },
    lower: { yaw: Math.PI * 1.2, pitch: 0.2, dist: 2600, target: [SUB_N - 150, -1080, 0] },
  };
  var PLATE_VIEW = { 111: 'section', 112: 'section', 113: 'lower', 114: 'three', 115: 'lower', 116: 'step', 117: 'step' };

  function basis() {
    var cp = Math.cos(cam.pitch);
    var eye = add(cam.target, [cp * Math.sin(cam.yaw) * cam.dist, Math.sin(cam.pitch) * cam.dist, cp * Math.cos(cam.yaw) * cam.dist]);
    var f = norm(sub(cam.target, eye));
    var r = norm(cross(f, [0, 1, 0]));
    if (!isFinite(r[0])) r = [1, 0, 0];
    var u = cross(r, f);
    return { eye: eye, f: f, r: r, u: u };
  }
  function sub(p, q) { return [p[0] - q[0], p[1] - q[1], p[2] - q[2]]; }
  function dot(p, q) { return p[0] * q[0] + p[1] * q[1] + p[2] * q[2]; }
  function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }

  /* -------------------------------------------------------------- render -- */

  var canvas, ctx, W = 0, H = 0, DPR = 1, B3, F;
  var show = { shell: true, passages: true, labels: true, chrono: true, mine: true };
  var focusPlate = null, selected = null, hits = [], myDates = [];
  var COLORS = {
    shell: 'rgba(231,195,85,', passage: '#5cb3f2', gallery: '#4fe3ff', chamber: '#9c8bf0', step: '#ffcf5c',
    label: '#e9edf6', dim: '#8b95ad', chrono: '#ffcf5c', mine: '#ef6f6f', ground: 'rgba(139,149,173,0.16)',
  };

  function project(p) {
    var d = sub(p, B3.eye), zc = dot(d, B3.f);
    if (zc < 1) return null;
    return [W / 2 + dot(d, B3.r) * F / zc, H / 2 - dot(d, B3.u) * F / zc, zc];
  }

  function poly(pts3, fill, stroke, width, polys) {
    var pts = [], z = 0;
    for (var i = 0; i < pts3.length; i++) { var p = project(pts3[i]); if (!p) return; pts.push(p); z += p[2]; }
    polys.push({ pts: pts, z: z / pts.length, fill: fill, stroke: stroke, width: width || 1 });
  }

  function draw() {
    if (!ctx) return;
    B3 = basis();
    F = H / (2 * Math.tan(cam.fov / 2));
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var polys = [];

    // Ground plane and bedrock line, for orientation.
    var g = BASE_HALF * 1.25;
    poly([[g, 0, g], [-g, 0, g], [-g, 0, -g], [g, 0, -g]], COLORS.ground, 'rgba(139,149,173,0.25)', 1, polys);

    if (show.shell) {
      var A = [0, APEX, 0];
      var c = [[BASE_HALF, 0, BASE_HALF], [-BASE_HALF, 0, BASE_HALF], [-BASE_HALF, 0, -BASE_HALF], [BASE_HALF, 0, -BASE_HALF]];
      var t = PRESENT / APEX;
      var top = c.map(function (q) { return [q[0] * (1 - t), PRESENT, q[2] * (1 - t)]; });
      for (var i = 0; i < 4; i++) {
        var j = (i + 1) % 4;
        poly([c[i], c[j], top[j], top[i]], COLORS.shell + '0.07)', COLORS.shell + '0.55)', 1.2, polys);
      }
      poly(top, COLORS.shell + '0.10)', COLORS.shell + '0.7)', 1.2, polys);
      // The missing apex, as the plates count it: 5814.
      for (var k = 0; k < 4; k++) poly([top[k], A], null, COLORS.shell + '0.35)', 1, polys);
    }

    if (show.passages) {
      PARTS.forEach(function (part) {
        var col = part.kind === 'chamber' ? COLORS.chamber : part.kind === 'gallery' ? COLORS.gallery : part.kind === 'step' ? COLORS.step : COLORS.passage;
        BOX_FACES.forEach(function (fi) {
          poly(fi.map(function (n) { return part.verts[n]; }), hexA(col, 0.22), hexA(col, 0.9), 1.1, polys);
        });
      });
    }

    polys.sort(function (a, b) { return b.z - a.z; });
    polys.forEach(function (p) {
      ctx.beginPath();
      p.pts.forEach(function (q, n) { n ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); });
      ctx.closePath();
      if (p.fill) { ctx.fillStyle = p.fill; ctx.fill(); }
      if (p.stroke) { ctx.strokeStyle = p.stroke; ctx.lineWidth = p.width; ctx.stroke(); }
    });

    if (show.passages) {
      ctx.setLineDash([6, 5]);
      SHAFTS.forEach(function (s) { line(s.pts, 'rgba(92,179,242,0.55)', 1.3); });
      ctx.setLineDash([]);
    }

    // Markers are gathered first and placed highest rank first, so a label only
    // ever gives way to a more important one: your dates, then the chronometer,
    // then the anchor sums, then the rest. Dimmed plates keep their dot only.
    hits = [];
    var queue = [];
    if (show.chrono) {
      line([chronoAt(CHRONO_FIRST), chronoAt(CHRONO_LAST)], COLORS.chrono, 2.5);
      TICKS.forEach(function (t) { queue.push([chronoAt(t.year), t.text, COLORS.chrono, 4, { chrono: t }, 2]); });
    }
    if (show.mine) {
      myDates.forEach(function (d) {
        if (d.year < CHRONO_FIRST || d.year > CHRONO_LAST) return;
        queue.push([chronoAt(d.year), d.text, COLORS.mine, 5, { mine: d }, 3]);
      });
    }
    if (show.labels) {
      LABELS.forEach(function (l) {
        var on = !focusPlate || l.plate === focusPlate;
        // Opened from a plate, that plate's own sums outrank the chronometer.
        var rank = !on ? 0 : focusPlate ? 2.5 : l.anchor ? 2 : 1;
        queue.push([l.at, l.text, on ? COLORS.label : COLORS.dim, on ? 3.5 : 2.5, { label: l }, rank, !on]);
      });
    }
    var placed = [];
    queue.sort(function (a, b) { return b[5] - a[5]; });
    // Dots go down lowest rank first so the important ones sit on top; text is
    // placed in rank order so it never covers a more important label.
    queue.slice().reverse().forEach(function (m) { drawDot(m[0], m[2], m[3], m[4], m[5]); });
    queue.forEach(function (m) { if (!m[6]) drawText(m[0], m[1], m[2], m[5], placed); });
  }

  function hexA(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  function line(pts3, color, width) {
    var pts = pts3.map(project);
    if (pts.some(function (p) { return !p; })) return;
    ctx.beginPath();
    pts.forEach(function (q, n) { n ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); });
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke();
  }

  var onScreen = function (p) { return p && p[0] > -50 && p[0] < W + 50 && p[1] > -50 && p[1] < H + 50; };

  function drawDot(p3, color, r, data, rank) {
    var p = project(p3);
    if (!onScreen(p)) return;
    ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.lineWidth = 1.5; ctx.strokeStyle = '#0b0f1a'; ctx.stroke();
    hits.push({ x: p[0], y: p[1], data: data, rank: rank });
  }

  // A label's text, unless it would overlap one already placed (which outranks it).
  function drawText(p3, words, color, rank, placed) {
    var p = project(p3);
    if (!onScreen(p)) return;
    ctx.font = (rank >= 2 ? '600 ' : '500 ') + (W < 600 ? 11 : 12.5) + 'px "Space Grotesk", system-ui, sans-serif';
    var w = ctx.measureText(words).width, x = p[0] + 8, y = p[1] - 8;
    if (x + w > W - 6) x = p[0] - 8 - w;
    var r = { x: x - 2, y: y - 12, w: w + 4, h: 16 };
    for (var i = 0; i < placed.length; i++) {
      var q = placed[i];
      if (r.x < q.x + q.w && r.x + r.w > q.x && r.y < q.y + q.h && r.y + r.h > q.y) return;
    }
    placed.push(r);
    ctx.lineWidth = 3.5; ctx.strokeStyle = '#0b0f1a'; ctx.lineJoin = 'round';
    ctx.strokeText(words, x, y);
    ctx.fillStyle = color; ctx.fillText(words, x, y);
  }

  /* ------------------------------------------------------- interaction -- */

  var spinning = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pointers = new Map(), lastPinch = 0, moved = false, downAt = null;

  function stopSpin() { spinning = false; }

  function bind() {
    canvas.addEventListener('pointerdown', function (e) {
      try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* a pointer the browser no longer tracks */ }
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      downAt = [e.clientX, e.clientY]; moved = false; stopSpin();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      var prev = pointers.get(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 2) {
        var ps = Array.from(pointers.values()), d = Math.hypot(ps[0][0] - ps[1][0], ps[0][1] - ps[1][1]);
        if (lastPinch) zoom(lastPinch / d);
        lastPinch = d; moved = true; return;
      }
      var dx = e.clientX - prev[0], dy = e.clientY - prev[1];
      // A click is a press that ends within a few pixels of where it began;
      // tiny jitter on the way must not turn it into a drag.
      if (downAt && Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 5) moved = true;
      if (e.shiftKey || e.buttons === 2) pan(dx, dy);
      else { cam.yaw -= dx * 0.008; cam.pitch = clamp(cam.pitch + dy * 0.006, -0.6, 1.5); }
      request();
    });
    function up(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastPinch = 0;
      if (!moved && e.type === 'pointerup') pick(e);
    }
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    canvas.addEventListener('wheel', function (e) { e.preventDefault(); stopSpin(); zoom(Math.exp(e.deltaY * 0.0012)); }, { passive: false });
    canvas.addEventListener('dblclick', function () { setView('three'); });
    canvas.addEventListener('keydown', function (e) {
      var k = e.key, step = 0.08;
      if (k === 'ArrowLeft') cam.yaw += step; else if (k === 'ArrowRight') cam.yaw -= step;
      else if (k === 'ArrowUp') cam.pitch = clamp(cam.pitch + step, -0.6, 1.5);
      else if (k === 'ArrowDown') cam.pitch = clamp(cam.pitch - step, -0.6, 1.5);
      else if (k === '+' || k === '=') zoom(0.85); else if (k === '-') zoom(1.18);
      else return;
      e.preventDefault(); stopSpin(); request();
    });
    addEventListener('resize', resize);
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function zoom(f) { cam.dist = clamp(cam.dist * f, 300, 40000); request(); }
  function pan(dx, dy) {
    var s = cam.dist / F;
    cam.target = add(cam.target, [-(B3.r[0] * dx - B3.u[0] * dy) * s, -(B3.r[1] * dx - B3.u[1] * dy) * s, -(B3.r[2] * dx - B3.u[2] * dy) * s]);
  }

  function pick(e) {
    var rect = canvas.getBoundingClientRect(), x = e.clientX - rect.left, y = e.clientY - rect.top;
    var best = null, bd = 18;
    hits.forEach(function (h) {
      var d = Math.hypot(h.x - x, h.y - y) - h.rank;
      if (d < bd) { bd = d; best = h; }
    });
    select(best ? best.data : null);
  }

  var raf = 0;
  function request() { if (!raf) raf = requestAnimationFrame(function () { raf = 0; draw(); }); }
  function tick() {
    if (spinning) { cam.yaw += 0.0025; draw(); }
    requestAnimationFrame(tick);
  }

  function resize() {
    var r = canvas.getBoundingClientRect();
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    request();
  }

  /* ----------------------------------------------------------- the page -- */

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }

  function setView(name) {
    var v = VIEWS[name]; if (!v) return;
    cam.yaw = v.yaw; cam.pitch = v.pitch; cam.dist = v.dist; cam.target = v.target.slice();
    stopSpin(); request();
    [].forEach.call(document.querySelectorAll('[data-view3d]'), function (b) { b.classList.toggle('on', b.dataset.view3d === name); });
  }

  function select(data) {
    selected = data && data.label ? data.label : null;
    var info = $('info');
    while (info.firstChild) info.removeChild(info.firstChild);
    if (!data) { info.appendChild(el('p', 'hint', 'Click a dot to read it. Drag to turn the pyramid; scroll or pinch to zoom; Shift-drag to pan.')); request(); return; }
    if (data.label) {
      var l = data.label;
      info.appendChild(el('div', 'kick', 'Plate ' + l.plate));
      info.appendChild(el('h3', null, l.text));
      if (l.sum) info.appendChild(el('div', 'eq', l.sum));
      if (l.note) info.appendChild(el('p', null, l.note));
      var a = el('a', 'open', 'Open plate ' + l.plate + ' ↗');
      a.href = '../pages/p' + ('00' + l.plate).slice(-3) + '.html'; a.target = '_top';
      info.appendChild(a);
    } else if (data.chrono) {
      info.appendChild(el('div', 'kick', 'Great Step chronometer'));
      info.appendChild(el('h3', null, data.chrono.text));
      info.appendChild(el('p', null, 'Charts XXIV–XXXIII read the floor south of the Great Step as years: 1 pyramid inch = 1 year from 1902 CE at the step face.'));
    } else if (data.mine) {
      info.appendChild(el('div', 'kick', 'Your date'));
      info.appendChild(el('h3', null, data.mine.text));
      info.appendChild(el('p', null, (data.mine.year - CHRONO_FIRST).toFixed(1) + ' P″ south of the Great Step face, ' + where(data.mine.year) + '.'));
    }
    request();
  }

  function where(year) {
    var x = year - CHRONO_FIRST;
    if (x < 61) return 'on the top of the Great Step';
    if (x < 113) return 'in the low passage before the Antechamber';
    if (x < 229) return 'in the Antechamber';
    if (x < 330) return 'in the passage to the King’s Chamber';
    return 'in the King’s Chamber';
  }

  function decimalYear(y, m, d) {
    var start = Date.UTC(y, 0, 1), next = Date.UTC(y + 1, 0, 1);
    return y + (Date.UTC(y, m - 1, d) - start) / (next - start);
  }

  // "2027", "2027-04-04", in any mix, from the #dates= hash or the box.
  function parseDates(text) {
    return String(text || '').split(/[\s,;]+/).map(function (s) {
      var m = /^(\d{4})(?:-(\d{2})-(\d{2}))?$/.exec(s.trim());
      if (!m) return null;
      var y = +m[1];
      return m[2] ? { year: decimalYear(y, +m[2], +m[3]), text: s.trim() } : { year: y + 0.5, text: String(y) };
    }).filter(Boolean);
  }

  function renderMine() {
    var list = $('mine-list');
    while (list.firstChild) list.removeChild(list.firstChild);
    myDates.forEach(function (d, i) {
      var inside = d.year >= CHRONO_FIRST && d.year <= CHRONO_LAST;
      var li = el('li', inside ? '' : 'out', d.text + (inside ? ' · ' + where(d.year) : ' · outside the chronometer (1902–2436)'));
      var x = el('button', 'x', '✕'); x.type = 'button'; x.setAttribute('aria-label', 'Remove ' + d.text);
      x.onclick = function () { myDates.splice(i, 1); renderMine(); request(); };
      li.appendChild(x); list.appendChild(li);
    });
  }

  function renderLabelList() {
    var ol = $('label-list');
    LABELS.forEach(function (l) {
      var li = el('li', null, 'Plate ' + l.plate + ' · ' + l.text + (l.sum && l.sum !== l.text ? ' · ' + l.sum : ''));
      ol.appendChild(li);
    });
  }

  function init() {
    canvas = $('scene'); ctx = canvas.getContext('2d');
    var q = new URLSearchParams(location.search);
    var p = parseInt(q.get('plate'), 10);
    if (p >= 111 && p <= 117) {
      focusPlate = p;
      $('focus').textContent = 'Showing plate ' + p + '’s numbers; the others are dimmed.';
    }
    var h = /(?:^#|&)dates=([^&]*)/.exec(location.hash);
    if (h) myDates = parseDates(decodeURIComponent(h[1]));

    [].forEach.call(document.querySelectorAll('[data-view3d]'), function (b) { b.onclick = function () { setView(b.dataset.view3d); }; });
    [].forEach.call(document.querySelectorAll('[data-show]'), function (b) {
      b.classList.toggle('off', !show[b.dataset.show]);
      b.onclick = function () { show[b.dataset.show] = !show[b.dataset.show]; b.classList.toggle('off', !show[b.dataset.show]); b.setAttribute('aria-pressed', String(show[b.dataset.show])); request(); };
      b.setAttribute('aria-pressed', String(show[b.dataset.show]));
    });
    $('mine-form').onsubmit = function (e) {
      e.preventDefault();
      var add = parseDates($('mine-input').value);
      myDates = myDates.concat(add);
      $('mine-input').value = '';
      renderMine(); request();
      if (add.length) setView('step');
    };

    renderMine(); renderLabelList(); select(null); bind(); resize();
    setView(focusPlate ? PLATE_VIEW[focusPlate] : myDates.length ? 'step' : 'three');
    if (!focusPlate && !myDates.length) spinning = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
