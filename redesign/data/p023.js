// Plate 23 · Chart IV — transcribed from plates/p023.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 23,
  chart: 'IV',
  kind: 'figure',
  title: 'Descending Passage Countdown from 1135 BC',
  subtitle: '3036 p" from 1135 BC to 1902; 1110 p" up to 25 BC; 1828 p" down to 1804',
  signed: "Breshears '06",
  rotated: true,
  range: [-1250, 2200],
  transcribed: 'Transcribed 13 Oct 2026 from the scan',
  anchors: [
    { year: -1135, label: 'Axis Conjunct', note: '1135 BC [2760 AM]' },
    { year: 1902, label: 'Great Step', note: 'Central Axis, Great Step 1902 AD [5796 AM]' },
    { year: 2106, label: '6000 AM', note: '6000 Annus Mundi [2106 AD]' },
  ],
  events: [
    { year: -1135, label: 'Axis Conjunct', am: 2760, cat: 'comet' },
    { year: -25, label: 'Entry: 1110 p" + 2760 is 3870 AM', am: 3870, cat: 'cycle' },
    { year: 1804, label: '1804 AD is 302 years to Armageddon', am: 5698, cat: 'proph', note: '1828 p" to exact depth level with floor joint; 3870 AM at entry becomes 5698 AM' },
    { year: 1902, label: 'Central Axis Great Step; beginning of Giza course countdown', am: 5796, cat: 'proph' },
    { year: 2106, label: '6000 Annus Mundi', am: 6000, cat: 'proph' },
  ],
  spans: [
    { from: -1135, to: 1902, label: '3036 p" from 1135 BC [2760 AM] to 1902 AD [5796 AM]', cat: 'proph' },
    { from: -1135, to: -25, label: '1110 p" + 2760 is 3870 AM [25 BC]', formula: '1110 + 2760 = 3870', cat: 'cycle' },
    { from: -25, to: 1804, label: '1828 p" to depth level with floor joint', cat: 'cycle' },
    { from: 1804, to: 2106, years: 302, label: '302 years to 6000 AM [2106 AD]', cat: 'proph' },
    { from: 1804, to: 1902, label: '302 p" floor joint to Central Axis', cat: 'proph' },
  ],
  math: [
    { eq: '1110 + 2760 = 3870', cap: '1110 p" above 1135 BC [2760 AM] gives 3870 AM at entry [25 BC]' },
    { eq: '3870 + 1828 = 5698', cap: '1828 p" down to floor-joint depth: 3870 AM becomes 5698 AM' },
    { eq: '5698 + 302 = 6000', cap: '1804 AD is exactly 302 years to 6000 Annus Mundi' },
    { eq: '2760 + 3036 = 5796', cap: '3036 p" from 1135 BC to 1902 AD' },
  ],
  notes: [
    'Cross-section of the Great Pyramid: the descending passage drawn heavy, with Grand Gallery, Queen’s and King’s Chambers on the Central Axis.',
    'Axis Conjunct 1135 BC [2760 AM] sits where the ascending passage meets the descending passage; a double arrow there reads backward and forward 1902 AD is referenced.',
    'A vertical 1828 p" line from the entrance and a horizontal line to the floor joint complete a triangle; the floor joint is 302 p" from the Central Axis.',
    '1828 p" to exact depth level with floor joint: 3870 AM at entry becomes 5698 AM, or 1804 AD, exactly 302 years to 6000 Annus Mundi [2106 AD]. This ends the Giza countdown, but the completed triangle brings us back to the 1902 AD floor joint, 302 p" from Central Axis 1902 AD Great Step, the beginning of the Giza course countdown.',
  ],
};
