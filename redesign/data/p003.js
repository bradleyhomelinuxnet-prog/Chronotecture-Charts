// Plate 3 — text page, from text/p003.txt. Years as written (BC negative).
window.PLATE = {
  plate: 3, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p003.txt)',
  title: 'The Thesis: A 7344-Year Calendar', subtitle: '5239 BC to 2106 AD (6000 AM); completed 2815 BC (1080 AM)', range: [-5400, 2150],
  anchors: [ { year: 1902, label: '1902 AD', note: 'The Great Step: start of the Last Days' }, { year: 2046, label: '2046 AD', note: 'The structure’s chief geometrical message' } ],
  events: [
    { year: -5239, label: 'Pyramid chronology begins', cat: 'anun' },
    { year: -3113, label: 'Mayan Long-Count of 13 baktuns begins', cat: 'cycle' },
    { year: -2815, label: 'Great Pyramid completed', am: 1080, cat: 'hist', note: 'Precisely one third the way through its own timeline' },
    { year: 1902, label: 'Start of the Last Days (Great Step axis)', cat: 'proph' },
    { year: 2046, label: 'Terminal year: a message involving a third of the world', cat: 'impact', note: 'Mayan Long-Count ends in 2046 AD, not 2012 AD' },
    { year: 2106, label: 'Return of the Chief Cornerstone', am: 6000, cat: 'proph' } ],
  spans: [
    { from: -5239, to: 2106, years: 7344, label: 'Chronology of 7344 years (7200+72+72)', formula: '7200 + 72 + 72 = 7344', cat: 'proph' },
    { from: -5239, to: -2815, years: 2424, label: 'Start to completion', cat: 'hist' } ],
  math: [ { eq: '7344 ÷ 3 = 2448', cap: 'One third of the timeline (completed 2815 BC “precisely one third the way through”)' } ],
  notes: [ 'The dimensions encode 246 independent dates; a third of them connect to 2046 AD (246 ≡ 2046 because 0 has no value: 2Ø46). 96% were encoded before they occurred, during the 66.6% of the chronology after 2815 BC.', 'The orbital periods of Phoenix and NIBIRU, and the Cursed Earth and Phoenix Cycle epochs derived from the 138 year orbit of Phoenix, are recognised in the structure.', 'Note: 5239 BC to 2815 BC is 2424 years, not 2448 (one third of 7344); kept as the text states.' ],
};
