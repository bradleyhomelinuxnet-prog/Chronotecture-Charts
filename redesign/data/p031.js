// Plate 31 — text page, from text/p031.txt. Years as written (BCE negative).
window.PLATE = {
  plate: 31, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p031.txt)',
  title: 'Four: Calendrical Alignments of 1902 CE', subtitle: 'Cursed Earth epochs of 414 years ending in 1902', range: [-4400, 2150],
  anchors: [ { year: 1902, label: '1902 CE', note: 'Beginning of the Last Days' } ],
  events: [
    { year: -4309, label: 'PreAdamic World destroyed', cat: 'impact', note: 'After 330 years of revolt' },
    { year: -3895, label: 'Mankind banished from Eden', am: 1, cat: 'eden' },
    { year: -2239, label: 'Great Flood', am: 1656, cat: 'flood' },
    { year: -1825, label: 'Abraham translating the Enochian texts', am: 2070, cat: 'hist', note: 'In his 144th month' },
    { year: -583, label: 'Phoenix darkens the sun', am: 3312, cat: 'comet', note: 'Medes and Lydians; Herodotus' },
    { year: 1902, label: 'Enuma Elish translated', cat: 'hist' },
    { year: 2040, label: 'Phoenix next blacks out the sun', cat: 'comet' } ],
  spans: [
    { from: -4309, to: 1902, years: 6210, label: '6210 years (414×15)', formula: '414 × 15 = 6210', cat: 'cycle' },
    { from: -4309, to: -3895, years: 414, label: '414 years prior to 3895 BCE', cat: 'cycle' },
    { from: -3895, to: 1902, years: 5796, label: '5796 years (414×14)', formula: '414 × 14 = 5796', cat: 'cycle' },
    { from: -2239, to: 1902, years: 4140, label: '4140 years (414×10)', formula: '414 × 10 = 4140', cat: 'flood' },
    { from: -1825, to: 1902, years: 3726, label: '3726 year (414×9) countdown', formula: '414 × 9 = 3726', cat: 'hist' },
    { from: -4309, to: -1825, years: 2484, label: '2484 years (414×6) after the ruin', formula: '414 × 6 = 2484', cat: 'impact' },
    { from: -583, to: 1902, years: 2484, label: '2484 years before 1902 CE', cat: 'comet' } ],
  math: [ { eq: '414 × 4 = 1656', cap: 'The 1656th year of the Hebraic Calendar' }, { eq: '414 × 5 = 2070', cap: '1825 BCE was the year 2070 Annus Mundi' } ],
};
