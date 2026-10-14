// Plate 37 — text page, from text/p037.txt. Years as written (BC negative).
window.PLATE = {
  plate: 37, kind: 'figure', rotated: false,
  transcribed: 'Transcribed 14 Oct 2026 from the typed text page (text/p037.txt)',
  title: 'The Hijrah Calendar, 622 AD, in the Passage', subtitle: '1480 AM + 3036 P" = 622 AD (4516 AM); 3036 is 506×6', range: [-700, 2150],
  anchors: [ { year: 622, label: '622 AD (4516 AM)', note: 'Islamic Hijrah Calendar begins' } ],
  events: [
    { year: -607, label: 'Nebuchadnezzar II defeats Assyria', am: 3288, cat: 'hist' },
    { year: -597, label: 'Babylonians sack Jerusalem', am: 3298, cat: 'hist' },
    { year: -490, label: 'Battle of Marathon; Herodotus born', am: 3405, cat: 'hist' },
    { year: 622, label: 'Mohammed’s flight to Medina', am: 4516, cat: 'proph' },
    { year: 1733, label: 'Georgia, last of the 13 Colonies', am: 5627, cat: 'hist' },
    { year: 1840, label: 'Rawlinson translates cuneiform', am: 5734, cat: 'hist' },
    { year: 1850, label: 'Library of Ashurbanipal discovered', am: 5744, cat: 'hist' } ],
  spans: [
    { from: -607, to: 622, years: 1228, label: '1228 years before', cat: 'hist' }, { from: 622, to: 1850, years: 1228, label: '1228 years after', cat: 'hist' },
    { from: -597, to: 622, years: 1218, label: '1218 years before', cat: 'hist' }, { from: 622, to: 1840, years: 1218, label: '1218 years after', cat: 'hist' },
    { from: -490, to: 622, years: 1111, label: '1111 years before', cat: 'hist' }, { from: 622, to: 1733, years: 1111, label: '1111 years after', cat: 'hist' } ],
  math: [ { eq: '506 × 6 = 3036', cap: 'The 3036 P" passage; 506 P" more to the Wellpit axis' }, { eq: '1218 + 1218 - 1 = 2435', cap: 'Reduplicated 1218 years add up to 2435 (excluding 622 AD), the 2435 AM of 1460 BC' } ],
};
