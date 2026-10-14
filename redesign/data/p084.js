// Plate 84 · Chart XXVIII — transcribed from plates/p084.png. Years as written on the plate (BCE negative).
window.PLATE = {
  plate: 84,
  chart: 'XXVIII',
  kind: 'figure',
  title: '52 P" Ceiling Block in Four 13-Year Periods',
  subtitle: '60.96 P" from 1902 CE to 1962 CE; 52 P" [13×4] from 1962 to 2014; 60 P" variance 1945 to 2005',
  signed: "Breshears '06",
  rotated: true,
  range: [1890, 2035],
  transcribed: 'Transcribed 13 Oct 2026 from the scan; 1962 start of the 52 P" block is given in the text, not at the block edge',
  anchors: [
    { year: 1902, label: '1902 CE' },
    { year: 1962, label: '1962 CE', note: 'End of 60.96 P" when 7200 yrs of Anunnaki NER system complete' },
  ],
  events: [
    { year: 1902, label: '1902 CE', cat: 'hist' },
    { year: 1945, label: 'North Wall of Subterranean Chamber', cat: 'hist', note: 'Marked 1945' },
    { year: 1962, label: '7200 yrs of Anunnaki NER system complete', cat: 'anun', note: 'Distance of 60.96 P" directly terminates at 1962 CE' },
    { year: 1963, label: 'Assassination of a king of the world [Kennedy]', cat: 'hist', note: '.96 indirectly infers November 1963' },
    { year: 1975, label: 'End of first 13-year period', cat: 'cycle', note: 'Centerpoint alignment of vertical lines perfectly equidistant from first 13-year period [1975]' },
    { year: 1988, label: '1988', cat: 'cycle' },
    { year: 2001, label: '2001', cat: 'cycle' },
    { year: 2005, label: 'North Wall of Queen’s Chamber', cat: 'hist', note: 'Marked 2005' },
    { year: 2014, label: '2014 (end of 52 P" block)', cat: 'cycle' },
    { year: 2022, label: '2022', cat: 'proph', note: 'End of upper 60.96 P" measure' },
  ],
  spans: [
    { from: 1902, to: 1962, label: '60.96 P"', cat: 'anun' },
    { from: 1962, to: 2014, years: 52, label: '52 P" [13×4] limestone ceiling block', formula: '13 × 4 = 52', cat: 'cycle' },
    { from: 1962, to: 2022, label: '60.96 P"', cat: 'proph' },
    { from: 1945, to: 2005, years: 60, label: '60 years · 60 P" variance', cat: 'hist', note: 'North Wall of Subterranean Chamber to North Wall of Queen’s Chamber' },
  ],
  cycles: [
    { start: 1962, step: 13, count: 4, label: '13', note: 'Four 13-year periods: 1975 · 1988 · 2001 · 2014' },
  ],
  math: [
    { eq: '13 × 4 = 52', cap: '52 P" limestone ceiling block divided into four 13-year periods' },
  ],
  notes: [
    '52 P" limestone ceiling block divided into four 13-year periods. This is confirmed by centerpoint alignment of vertical lines perfectly equidistant from first 13-year period [1975].',
    'Distance of 60.96 P" directly terminates at 1962 CE when 7200 yrs of Anunnaki NER system complete, but .96 indirectly infers November 1963: assassination of a king of the world [Kennedy].',
    'Cross-section with the North Wall of the Subterranean Chamber (1945) and the North Wall of the Queen’s Chamber (2005) projected onto the ceiling blocks.',
  ],
};
