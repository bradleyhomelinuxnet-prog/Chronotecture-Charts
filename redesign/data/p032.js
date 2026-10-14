// Plate 32 — text page, from text/p032.txt. Years as written (BCE negative).
window.PLATE = {
  plate: 32, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p032.txt)',
  title: 'The 600-Year Ner and the Mayan Count', subtitle: '144th course at 4140 P" is 2046 CE; 1872 years from 30 CE', range: [-5300, 2150],
  anchors: [ { year: 1902, label: '1902 CE' }, { year: 2106, label: '2106 CE (6000 AM)' } ],
  events: [
    { year: -5239, label: 'Anunnaki Chronology begins', am: -1344, cat: 'anun' },
    { year: -3113, label: 'Mayan Long-Count begins', cat: 'cycle' },
    { year: -2239, label: 'Great Deluge: 3000th Ner year, 2070th Cursed Earth year', am: 1656, cat: 'flood' },
    { year: -498, label: 'Gold tablets translated for King Philippus', am: 3397, cat: 'hist' },
    { year: 30, label: 'Jesus’ ministry begins; 12 Apostles chosen', am: 3924, cat: 'proph' },
    { year: 330, label: '330th year of Anno Domini', cat: 'hist' },
    { year: 1962, label: 'End of the Anunnaki Chronology', am: 5856, cat: 'anun' },
    { year: 2046, label: '144th course: comet impact on North America', cat: 'impact' },
    { year: 2106, label: 'Return of the Chief Cornerstone', am: 6000, cat: 'proph' } ],
  spans: [
    { from: -5239, to: 1962, label: 'Anunnaki Chronology of 600-year periods', cat: 'anun' },
    { from: 1962, to: 2106, years: 144, label: '144 year countdown', cat: 'proph' },
    { from: -5239, to: -2239, years: 3000, label: '3000th year (600×5)', formula: '600 × 5 = 3000', cat: 'flood' },
    { from: -498, to: 1902, years: 2400, label: 'Four 600-year epochs (2400 years)', formula: '600 × 4 = 2400', cat: 'hist' },
    { from: 30, to: 1902, years: 1872, label: '144×13 years (1872)', formula: '144 × 13 = 1872', cat: 'proph' },
    { from: -3113, to: 2046, label: 'Mayan Long-Count, 13 baktuns', cat: 'cycle' } ],
  math: [ { eq: '144000 × 13 = 1872000', cap: 'The Long-Count is 1,872,000 days, 13 baktuns of 144,000 days' } ],
  notes: [ 'Smyth measured the 10th course at 414 P" and the 143rd at 4144 P"; the 144th course began at 4140 P".' ],
};
