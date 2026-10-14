// Plate 6 — text page, from text/p006.txt. Years as written (BC negative).
window.PLATE = {
  plate: 6, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p006.txt)',
  title: 'One: The Pyramid Inch and Ussher’s Error', subtitle: 'Ussher: 4004 BC to 1996 AD; the true 6000 years: 3895 BC to 2106 AD', range: [-4100, 2150],
  events: [
    { year: -4004, label: 'Ussher’s Year One (Creation)', cat: 'hist' },
    { year: -3895, label: 'Mankind’s 6000 years of curse begin', am: 1, cat: 'eden' },
    { year: -2239, label: 'The Great Deluge', cat: 'flood' },
    { year: -4, label: 'Ussher’s birth of Christ', cat: 'hist' },
    { year: 1996, label: 'Ussher’s End of the World', cat: 'proph' },
    { year: 2106, label: 'End of the 6000 years', am: 6000, cat: 'proph' } ],
  spans: [
    { from: -4004, to: 1996, years: 6000, label: 'Ussher’s 6000 years', cat: 'hist', note: 'BC and AD counted as if contiguous: 4004 + 1996 = 6000, though with no year zero the span is 5999' },
    { from: -3895, to: 2106, years: 6000, label: 'Mankind’s 6000 years of curse', cat: 'proph' } ],
  math: [ { eq: '2106 - 1996 = 110', cap: 'Ussher’s Chronology is 110 years off the mark' } ],
  notes: [ 'Chronometry is the measuring of spatial dimensions in architecture to calculate increments of time; the unit of the Great Pyramid is the Pyramid Inch.', 'Ussher calculated BC and AD years together as if contiguous, an error that adds a year.' ],
};
