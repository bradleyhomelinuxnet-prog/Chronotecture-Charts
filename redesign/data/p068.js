// Plate 68 — text page, from text/p068.txt. Years as written (BCE negative).
window.PLATE = {
  plate: 68, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p068.txt)',
  title: 'Planet Phoenix Darkened the Sun 583 BCE', subtitle: '3312 AM is 144×23 or 414×8; 2580 years either way', range: [-4400, 2150],
  anchors: [ { year: -583, label: '583 BCE (3312 AM)' } ],
  events: [
    { year: -4309, label: 'PreAdamic ruin', cat: 'impact' },
    { year: -3895, label: 'Year One', am: 1, cat: 'eden' },
    { year: -3163, label: 'Newgrange and Stonehenge I built', am: 732, cat: 'hist' },
    { year: -3113, label: 'Mayan Long-Count begins', cat: 'cycle' },
    { year: -2239, label: 'Great Flood', am: 1656, cat: 'flood' },
    { year: -583, label: 'Phoenix darkens the sun', am: 3312, cat: 'comet' },
    { year: 1298, label: 'Seven Comets over Europe', am: 5192, cat: 'comet' },
    { year: 1880, label: 'Obelisk in Central Park; Smyth’s Our Inheritance', cat: 'hist' },
    { year: 1998, label: 'Last Days Epicentral Year; Cuxton crop circle (108)', am: 5892, cat: 'proph' },
    { year: 2046, label: '13th baktun ends', cat: 'impact' } ],
  spans: [
    { from: -2239, to: -583, years: 1656, label: '1656 years after the Flood', cat: 'flood' },
    { from: -3895, to: -583, years: 3312, label: '8 Cursed Earth periods', formula: '414 × 8 = 3312', cat: 'cycle' },
    { from: -4309, to: -583, years: 3726, label: '9 Cursed Earth periods', formula: '414 × 9 = 3726', cat: 'cycle' },
    { from: -3163, to: -583, years: 2580, label: '2580 years before', cat: 'hist' },
    { from: -583, to: 1998, years: 2580, label: '2580 years after', cat: 'proph' },
    { from: -583, to: 1298, years: 1880, label: '1880 years, abbreviated to 1390 P"', cat: 'comet' } ],
  math: [ { eq: '144 × 23 = 3312', cap: '3312 AM is 144×23' } ],
  notes: [ 'Note: the text writes 3163 BCE (732 AM); 3895 − 3163 = 732 holds, so here the 2580 to 583 BCE also holds (compare plate 64, which writes 3162 BCE).' ],
};
