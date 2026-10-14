// Plate 77 — text page, from text/p077.txt. Years as written (BC negative).
window.PLATE = {
  plate: 77, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p077.txt)',
  title: '1554 AD (5448 AM): The Present Height', subtitle: '1554 is 777+777; 4368 years from 2815 BC; 2520 from 967 BC', range: [-3950, 2150],
  anchors: [ { year: 1554, label: '1554 AD (5448 AM)' } ],
  events: [
    { year: -3895, label: 'Year One', am: 1, cat: 'eden' },
    { year: -2815, label: 'Great Pyramid finished', am: 1080, cat: 'hist' },
    { year: -1447, label: 'Exodus', cat: 'hist' },
    { year: -967, label: 'Temple of Solomon built', am: 2928, cat: 'hist' },
    { year: 1626, label: 'Tenth Phoenix Cycle ends', am: 5520, cat: 'cycle' },
    { year: 1920, label: 'Intended height 5814', am: 5814, cat: 'hist' },
    { year: 2106, label: 'Armageddon', am: 6000, cat: 'proph' } ],
  spans: [
    { from: -2815, to: 1554, years: 4368, label: '4368 years (52×84)', formula: '52 × 84 = 4368', cat: 'hist' },
    { from: -967, to: 1554, years: 2520, label: '2520 years (360×7)', cat: 'hist' },
    { from: -1447, to: -967, years: 480, label: '480 years after the Exodus', cat: 'hist' },
    { from: 1554, to: 1626, years: 72, label: '72 years (half of 144)', cat: 'cycle' },
    { from: 1626, to: 2106, years: 480, label: '480 years before Armageddon', cat: 'proph' } ],
  math: [ { eq: '777 + 777 = 1554', cap: '1554 is 777+777' }, { eq: '186 × 4 = 744', cap: '5814 is 186 under 6000; four faces' }, { eq: '552 × 10 = 5520', cap: 'Ten Phoenix Cycles from Year One' }, { eq: '40 × 138 = 5520', cap: '1626 AD is 40×138 years Annus Mundi' } ],
};
