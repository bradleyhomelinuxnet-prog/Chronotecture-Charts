// Plate 18 · Chart II — transcribed from plates/p018.png. Years as written on the plate (BCE negative).
window.PLATE = {
  plate: 18,
  chart: 'II',
  kind: 'figure',
  title: 'Great Pyramid Passages in Pyramid Inches',
  subtitle: '3361 and 3036 p" passages; 325 p" variance; 1460 p" to the Great Step',
  rotated: true,
  range: [-2400, 600],
  transcribed: 'Transcribed 13 Oct 2026 from the scan',
  anchors: [
    { year: -2239, label: 'Great Flood', note: '1656 Annus Mundi is 2239 BCE' },
    { year: -1460, label: 'Axis Conjunct 1460 BCE' },
  ],
  events: [
    { year: -2239, label: 'Great Flood', am: 1656, cat: 'flood', note: '1656 [666+990]: Deluge' },
    { year: -1460, label: 'Axis Conjunct', cat: 'cycle' },
    { year: -1447, label: 'Exodus', cat: 'proph' },
    { year: -1135, label: 'Sun darkening; becomes new Axis Conjunct', cat: 'comet', note: '1460 BCE − 325 p" is sun darkening of 1135 BCE' },
    { year: 442, label: 'Year indicated by Queen’s Chamber tangent', am: 4336, cat: 'proph', note: 'Queen’s Chamber walls 144 p" high, tangent with ~1460 p" from Great Step; 1888 years after the Exodus in 1447 BCE' },
  ],
  spans: [
    { from: -1460, to: -1135, years: 325, label: '325 p" variance [3361−3036]', formula: '3361 - 3036 = 325', cat: 'comet' },
    { from: -1447, to: 442, years: 1888, label: '1888 years after the Exodus', cat: 'proph' },
  ],
  math: [
    { eq: '3361 - 3036 = 325', cap: 'Variance between passage lengths from 1460 BCE, in pyramid inches' },
    { eq: '1460 - 325 = 1135', cap: '1460 BCE − 325 p" is the sun darkening of 1135 BCE' },
    { eq: '1656 + 34 = 1700', cap: '1700 p" surface of Great Step; step is 34 p" high' },
    { eq: '1902 - 1460 = 442', cap: 'Queen’s Chamber tangent indicates 442 CE' },
    { eq: '666 + 990 = 1656', cap: '666 p" and 990 p" along the central axis: the Deluge' },
  ],
  notes: [
    'Cross-section of the Great Pyramid: descending and ascending passages, Grand Gallery, Queen’s Chamber and King’s Chamber with relieving stones, cut by a vertical Central Axis.',
    'The ascending passage is marked 3361 p" to Step; the shorter passage 3036 p"; an arc between them reads 325 p" variance.',
    'The Grand Gallery is marked 1460 p". Along the central axis: 666 p" and 990 p", summing to 1656 [666+990]: Deluge.',
    'Variance between passage lengths from 1460 BCE is 325 p" [3361−3036]; 1460 BCE − 325 p" is the sun darkening of 1135 BCE; 1135 BCE becomes new Axis Conjunct.',
    '1700 p" surface of Great Step: step is 34 p" high [1656+34=1700].',
    'Queen’s Chamber walls 144 p" high, tangent with ~1460 p" from Great Step, indicating year 442 CE [1902−1460], or 4336 Annus Mundi. This is 1888 years after the Exodus in 1447 BCE.',
    'A Base Line runs across the figure at ground level.',
  ],
};
