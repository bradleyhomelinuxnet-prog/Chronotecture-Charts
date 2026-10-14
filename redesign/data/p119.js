// Plate 119 — the atlas colophon (not a Breshears plate). Figures as drawn on plates/p119.png.
window.PLATE = {
  plate: 119, kind: 'figure',
  title: 'The Recursive Palindrome',
  subtitle: '138 − 19 = 119: the doubling of 138 and the 19-year Metonic cycle',
  rotated: false, range: [0, 2300],
  transcribed: 'Atlas colophon, not by Breshears; labels as drawn',
  cycles: [
    { start: 0, step: 138, count: 16, label: '138', note: '138 × 16 = 2208' },
  ],
  math: [
    { eq: '138 × 2 = 276', cap: '138×2' },
    { eq: '138 × 4 = 552', cap: 'The 552 of charts II·b, II·c and VI·c' },
    { eq: '138 × 8 = 1104', cap: '“1104 yrs [552×2]” on charts II·b and II·c' },
    { eq: '138 × 16 = 2208', cap: '2208 AM on charts II·b and II·c (as written there for 1688 BC; 2208 AM is 1687 BC)' },
    { eq: '138 - 19 = 119', cap: 'The plate’s number' },
  ],
  notes: [
    '19 · the Metonic cycle: 19 years = 235 lunations — sun & moon realign.',
    '138 · recursive doubling (mirrored): 138, 276, 552, 1104, 2208, each bar the same length either side of the axis.',
    'Frieze: 19 ↔ 91 · 138 ↔ 831 · 1·1·9 ↔ 9·1·1 · 138 − 19 = 119.',
  ],
};
