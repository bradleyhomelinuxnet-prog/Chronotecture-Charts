// Plate 36 — text page, from text/p036.txt. Years as written (BCE negative).
window.PLATE = {
  plate: 36, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p036.txt)',
  title: '1135 BCE: The New Passage Conjunct Axis', subtitle: '3361 − 3036 = 325; 1460 BCE + 325 = 1135 BCE (2760 AM)', range: [-3950, 2150],
  anchors: [ { year: -1135, label: '1135 BCE (2760 AM)', note: 'Phoenix darkened the sun' } ],
  events: [
    { year: -3895, label: 'Banishment from Eden', am: 1, cat: 'eden' },
    { year: -2239, label: 'Great Flood', am: 1656, cat: 'flood' },
    { year: -1687, label: 'Phoenix transit; Canaanite offensive', cat: 'comet' },
    { year: -1460, label: 'Previous Passage Conjunct Axis', cat: 'cycle' },
    { year: -1135, label: 'Phoenix darkens the sun (Nebuchadnezzar I)', am: 2760, cat: 'comet' },
    { year: -583, label: 'Phoenix occults the sun (Nebuchadnezzar II)', cat: 'comet' },
    { year: -31, label: 'Earthquake during the Battle of Actium', am: 3864, cat: 'quake', note: '30,000 dead; end of the 7th Phoenix Cycle' },
    { year: 2010, label: '2010 CE', am: 5904, cat: 'cycle' } ],
  spans: [
    { from: -1460, to: -1135, years: 325, label: 'Add 325 P" to 1460 BCE', cat: 'cycle' },
    { from: -2239, to: -1687, years: 552, label: '552 years after the Flood', cat: 'comet' },
    { from: -1687, to: -1135, years: 552, label: '552 years', cat: 'comet' },
    { from: -1135, to: -583, years: 552, label: '552 years later', cat: 'comet' },
    { from: -1135, to: -31, years: 1104, label: '1104 years (552+552)', formula: '552 + 552 = 1104', cat: 'quake' },
    { from: -3895, to: -31, years: 3864, label: '7th Phoenix Cycle (552×7)', formula: '552 × 7 = 3864', cat: 'cycle' } ],
  math: [ { eq: '3361 - 3036 = 325', cap: 'Ascendant minus Descendant passage' }, { eq: '3360 - 3036 = 324', cap: 'With the variant 3360 P"' }, { eq: '108 × 3 = 324', cap: '324 P", or 108×3' }, { eq: '600 × 5 + 60 × 6 = 3360', cap: '3360 is 600×5 + 60×6' } ],
};
