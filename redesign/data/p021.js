// Plate 21 · Chart III — transcribed from plates/p021.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 21, chart: 'III', kind: 'figure',
  title: 'The 1135 BC Conjunct and 1688 AD',
  subtitle: '1135 BC [2760 AM] + 994 + 1828 = 5582 Annus Mundi, or 1688 AD',
  signed: "Breshears '06", rotated: false, range: [-1250, 2000],
  transcribed: 'Transcribed 14 Oct 2026 from the scan',
  anchors: [
    { year: -1135, label: '1135 BC Axis Conjunct', note: 'Junction of the ascending and descending passages' },
    { year: 1902, label: 'Axis 1902 AD' },
  ],
  events: [
    { year: -1135, label: 'Axis Conjunct', am: 2760, cat: 'comet' },
    { year: -141, label: 'Entry, 994 P" from the axis', am: 3754, cat: 'cycle' },
    { year: 1688, label: 'Anno Domini parallel to Sun darkening of 1688 BC', am: 5582, cat: 'comet' },
    { year: 1902, label: 'Axis', cat: 'proph' },
  ],
  spans: [
    { from: -1135, to: -141, years: 994, label: 'Axis to entry horizontal distance of 994 P"', cat: 'cycle' },
    { from: -141, to: 1688, years: 1828, label: '1828 P" (level with floor joint)', cat: 'comet' },
  ],
  math: [
    { eq: '2760 + 994 = 3754', cap: '1135 BC [2760 AM] + 994 = 141 BC [3754 AM]' },
    { eq: '3754 + 1828 = 5582', cap: '5582 Annus Mundi, or 1688 AD' },
    { eq: '1688 × 2 = 3376', cap: 'Years, which is length of ascendant passage to Great Step [3360] plus 16 years of Seven Comets' },
    { eq: '3360 + 16 = 3376', cap: '3360 P" to Step Joint + 16' },
  ],
  notes: [
    'Section of the Great Pyramid: 3360 P" to Step Joint along the ascending passage; 1828 P" vertical, level with floor joint at end of descendant passage.',
    'East-west width of Lower Chamber roof is 552 P".',
  ],
};
