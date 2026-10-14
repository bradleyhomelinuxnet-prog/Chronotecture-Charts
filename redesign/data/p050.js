// Plate 50 — text page, from text/p050.txt. Years as written (BC negative).
window.PLATE = {
  plate: 50, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p050.txt)',
  title: 'Ten: 2001 AD and the 4146 P" Passage', subtitle: '3114 BC + 666 = 1447 AM; 4146 to 1699 AD; + 302 to 2001 AD', range: [-3200, 2150],
  events: [
    { year: -3114, label: 'Mayan Long-Count start', am: 781, cat: 'cycle' },
    { year: -2448, label: '1447 AM, at the Entry (666 P")', am: 1447, cat: 'cycle', note: 'Parallels the 2448 AM Exodus in 1447 BC' },
    { year: 1699, label: 'End of the 4146 P" Descending Passage', am: 5593, cat: 'cycle' },
    { year: 1995, label: 'Similar event in America', am: 5889, cat: 'hist' },
    { year: 2001, label: 'Fall of the World Trade Center', am: 5895, cat: 'hist' },
    { year: 2006, label: 'Astroid near-miss (July 2-3)', cat: 'impact' } ],
  spans: [
    { from: -3114, to: -2448, years: 666, label: '666 P" to the Entry', cat: 'cycle' },
    { from: -2448, to: 1699, years: 4146, label: 'Descending Passage, 4146 P"', formula: '1110 + 3036 = 4146', cat: 'cycle' },
    { from: 1699, to: 2001, years: 302, label: '302 P" to the Great Step Central Axis', cat: 'hist' } ],
  math: [ { eq: '781 + 666 = 1447', cap: '3114 BC (781 AM) + 666 P"' } ],
};
