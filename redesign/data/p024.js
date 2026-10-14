// Plate 24 · Chart V — transcribed from plates/p024.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 24,
  chart: 'V',
  kind: 'figure',
  title: 'Entrance, Flood and the Well Pit Axis',
  subtitle: '990 + 666 = 1656 AM; 1656 + 1110 = 2766 AM; 2766 + 3014 = 5780 AM',
  signed: "Breshears '06",
  rotated: false,
  range: [-3000, 2200],
  transcribed: 'Transcribed 13 Oct 2026 from the scan',
  anchors: [
    { year: -2239, label: 'Deluge', note: '2239 BC Deluge' },
    { year: -1129, label: 'Axis Conjunct', note: '1129 BC [2766 AM]' },
  ],
  events: [
    { year: -2905, label: 'Sethites began pyramid construction', am: 990, cat: 'hist' },
    { year: -2239, label: 'Great Flood', am: 1656, cat: 'flood', note: '990 AM + 666 p" is 1656 AM Great Flood [2239 BC]' },
    { year: -1129, label: 'Axis Conjunct', am: 2766, cat: 'cycle', note: 'Flood 1656 AM + 1110 p" is 2766 AM [1129 BC]' },
    { year: 1886, label: 'End of 3014 p" horizontal axis', am: 5780, cat: 'proph', note: '2766 Annus Mundi + 3014 p" is 5780 AM [1886 AD]' },
    { year: 2090, label: 'Return of the Seven Comets for 33rd visitation', cat: 'comet', note: 'To bring the Seven Plagues of Revelation from the Deep' },
  ],
  spans: [
    { from: -2905, to: -2239, label: '666 p" down to base', formula: '990 + 666 = 1656', cat: 'flood' },
    { from: -2239, to: -1129, label: '1110 p" to Axis Conjunct 1129 BC', formula: '1656 + 1110 = 2766', cat: 'cycle' },
    { from: -1129, to: 1886, label: '3014 horizontal p" axis to axis', formula: '2766 + 3014 = 5780', cat: 'proph' },
    { from: 1886, to: 2090, years: 204, label: '204 years to Vertical Well Pit Axis', cat: 'comet', note: 'Differential of 204 p"' },
  ],
  math: [
    { eq: '990 + 666 = 1656', cap: 'Pyramid construction began 990 AM; + 666 p" is the Great Flood' },
    { eq: '1656 + 1110 = 2766', cap: 'Flood + 1110 p" is 2766 AM [1129 BC]' },
    { eq: '2766 + 3014 = 5780', cap: '2766 AM + 3014 p" is 5780 AM [1886 AD]' },
    { eq: '1886 + 204 = 2090', cap: '1886 AD to Vertical Well Pit Axis is 204 years' },
  ],
  notes: [
    'Upper figure: Great Pyramid cross-section with chambers on a dashed central axis; a heavy 3014 p" horizontal axis runs from the entrance line to the vertical Well Pit, with a differential of 204 p" marked.',
    'Lower figure: masonry courses with the descending passage; the 19th course marks the entrance. 1110 p" to Axis Conjunct 1129 BC [2766 AM] runs along the passage; 666 p" down to base.',
    '1886 AD to Vertical Well Pit Axis is 204 years, or 2090 AD return of the Seven Comets for 33rd visitation to bring the Seven Plagues of Revelation from the Deep.',
  ],
};
