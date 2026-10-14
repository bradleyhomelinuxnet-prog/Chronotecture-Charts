// Plate 83 · Chart XXVII — transcribed from plates/p083.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 83,
  chart: 'XXVII',
  kind: 'figure',
  title: 'Great Step Calendar, 1902–2028 AD',
  subtitle: '126 p" is 12.6 decans; 120 years [1440 months] to 2022 AD; thirds of 42',
  signed: "Breshears '06",
  rotated: true,
  range: [1890, 2040],
  transcribed: 'Transcribed 13 Oct 2026 from the scan',
  anchors: [
    { year: 1902, label: '1902', note: 'Central axis (north–south) at the Great Step' },
    { year: 2028, label: '2028', note: 'End of the 126 p" Great Step' },
  ],
  events: [
    { year: 1902, label: 'Central axis', cat: 'proph' },
    { year: 1944, label: '1/3 of 126 p"', cat: 'cycle' },
    { year: 1945, label: 'Line to north wall of subterranean chamber', cat: 'proph' },
    { year: 1986, label: '2/3 of 126', cat: 'cycle' },
    { year: 2005, label: 'Vertical to south wall of Queen’s Chamber', cat: 'proph' },
    { year: 2022, label: '120 years [1440 months] end', cat: 'proph' },
    { year: 2028, label: 'Limestone/granite joint', cat: 'proph' },
  ],
  spans: [
    { from: 1902, to: 2022, years: 120, label: '120 years [1440 months] to 2022 AD', cat: 'proph' },
    { from: 1902, to: 2028, years: 126, label: '126 p" is 12.6 decans', cat: 'proph' },
    { from: 1902, to: 1944, years: 42, label: '1/3 of 126 p"', cat: 'cycle' },
    { from: 1944, to: 1986, years: 42, label: '1/3 of 126', cat: 'cycle' },
    { from: 1986, to: 2028, years: 42, label: '1/3 of 126', cat: 'cycle' },
  ],
  cycles: [
    { start: 1902, step: 12, count: 10, label: '12', note: 'Tick marks: 1902 · 1914 · 1926 · 1938 · 1950 · 1962 · 1974 · 1986 · 1998 · 2010 · 2022' },
  ],
  math: [
    { eq: '42 × 3 = 126', cap: '42×3 is 126' },
    { eq: '120 × 12 = 1440', cap: '120 years [1440 months]' },
    { eq: '126 ÷ 10 = 12.6', cap: '126 p" is 12.6 decans' },
  ],
  notes: [
    'Section at the Great Step: Grand Gallery to the north, Antechamber and King’s Chamber granite to the south; the passage conduit below is marked 3360 p".',
    'The Great Step top is scaled 1902–2028, with the limestone/granite joint at its south end.',
    'Dashed verticals drop to the south wall of the Queen’s Chamber (2005) and to the north wall of the subterranean chamber (1945).',
  ],
};
