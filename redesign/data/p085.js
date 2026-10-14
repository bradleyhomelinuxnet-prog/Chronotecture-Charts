// Plate 85 · Chart XXIX — transcribed from plates/p085.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 85,
  chart: 'XXIX',
  kind: 'figure',
  title: '2016 AD Double-Referenced in Great Step',
  subtitle: 'Half of 228 P" from the Great Step, and half of 23 P" from 2005 AD, both land on 2016 AD',
  signed: "Breshears '06",
  rotated: true,
  range: [1890, 2145],
  transcribed: 'Transcribed 13 Oct 2026 from the scan; end year 2130 of the 228 P" span is not printed (1902 + 228)',
  anchors: [
    { year: 1902, label: 'Face of Great Step', note: 'Face of Great Step [1902]' },
    { year: 2016, label: '2016 AD', note: '2016 AD is exactly half this distance [1902+114 is 2016 AD]' },
  ],
  events: [
    { year: 1902, label: 'Face of Great Step', cat: 'hist' },
    { year: 2005, label: 'A: South Wall Queen’s Chamber', cat: 'hist', note: 'Marked 2005 at point A' },
    { year: 2016, label: 'Half of 228 P" and half of 23 P" both fall on 2016 AD', cat: 'proph' },
    { year: 2028, label: 'B: end of Great Step limestone / granite joint', cat: 'hist', note: 'Marked 2028 at point B' },
  ],
  spans: [
    { from: 1902, to: 2130, years: 228, label: 'Great Step to South Wall in Antechamber · 228 P" [114+114]', formula: '114 + 114 = 228', cat: 'hist', note: 'End year not printed; 1902 + 228' },
    { from: 1902, to: 2016, years: 114, label: '114 P"', cat: 'proph' },
    { from: 2005, to: 2028, years: 23, label: 'A to B · 23 P"', cat: 'hist', note: 'South Wall Queen’s Chamber to end of Great Step limestone / granite joint' },
    { from: 2005, to: 2016, label: 'Half of 23 years · 11½', cat: 'proph', note: 'Half of 23 years is 11½ from 2005 AD to 2016 AD' },
  ],
  math: [
    { eq: '114 + 114 = 228', cap: 'Face of Great Step to South Wall in Antechamber' },
    { eq: '1902 + 114 = 2016', cap: 'Half the distance lands on 2016 AD' },
    { eq: '23 ÷ 2 = 11.5', cap: 'Half of 23 years from 2005 AD to 2016 AD' },
  ],
  notes: [
    'Cross-section of the Great Step, Antechamber and granite floor, with the South Wall of the Antechamber marked and the Queen’s Chamber passage below.',
    'Point A (2005, South Wall Queen’s Chamber) and point B (2028, end of Great Step limestone at the granite joint) are joined by a semicircle.',
  ],
};
