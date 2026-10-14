// Plate 78 — text page, from text/p078.txt. Years as written (BC negative).
window.PLATE = {
  plate: 78, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p078.txt)',
  title: 'Spans from 1554 AD to 2106 AD', subtitle: '280, 366, 400, 440, 444, 490, 520, 552 years', range: [1540, 2115],
  anchors: [ { year: 1554, label: '1554 AD (5448 AM)' } ],
  events: [
    { year: 1834, label: 'End of the Spanish Inquisition', am: 5728, cat: 'hist' },
    { year: 1920, label: 'Radio spreads the Gospel; League of Nations', am: 5814, cat: 'hist' },
    { year: 1954, label: 'Astroid passes over ecliptic; Hodges meteorite', am: 5848, cat: 'impact' },
    { year: 1994, label: 'Shoemaker-Levy 9 hits Jupiter', am: 5888, cat: 'comet' },
    { year: 1998, label: 'Last Days Epicentral Isometric Year', am: 5982, cat: 'proph', note: 'As written; 1998 AD is 5892 AM' },
    { year: 2044, label: 'First Trumpet meteoric rain', am: 5938, cat: 'impact' },
    { year: 2074, label: 'Seven Plagues begin', am: 5968, cat: 'proph' },
    { year: 2106, label: 'Armageddon; Stone Kingdom', am: 6000, cat: 'proph' } ],
  spans: [
    { from: 1554, to: 1834, years: 280, label: '280 years (40×7/70×4)', cat: 'hist' },
    { from: 1554, to: 1920, years: 366, label: '366 years (360+6)', cat: 'hist' },
    { from: 1554, to: 1954, years: 400, label: '400 years (40×10)', cat: 'impact' },
    { from: 1554, to: 1994, years: 440, label: '440 years (40×11)', cat: 'comet' },
    { from: 1554, to: 1998, years: 444, label: '444 years (a fourth of 1776)', cat: 'proph' },
    { from: 1554, to: 2044, years: 490, label: '490 years (70×7)', cat: 'impact' },
    { from: 1554, to: 2074, years: 520, label: '520 years (52×10)', cat: 'proph' },
    { from: 1554, to: 2106, years: 552, label: '552 years (Phoenix Cycle)', cat: 'proph' },
    { from: 1920, to: 2106, years: 186, label: 'Exactly 186 years after 1920 AD', cat: 'proph' } ],
  math: [ { eq: '40 × 7 = 280', cap: '280 years (40x7/70x4)' }, { eq: '7200 + 72 + 72 = 7344', cap: 'Inclined height 7344 P"' }, { eq: '7391 - 7344 = 47', cap: 'Smyth’s inclined height was 47 inches off' } ],
  notes: [ 'Note: the text writes 1998 AD as 5982 AM; 1998 AD is 5892 AM. Here the text calls 444 a fourth of 1776, correctly (plates 54, 70 and 74 say a third).' ],
};
