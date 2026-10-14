// Plate 48 · Chart XIV·c — transcribed from plates/p048.png. Years as written on the plate (BCE negative).
window.PLATE = {
  plate: 48, chart: 'XIV·c',
  title: 'Mirrored Spans Around 1930 CE',
  subtitle: '1930 CE [5824 AM]; 114, 140 and 160 years either way',
  signed: "Breshears '07", rotated: true, range: [780, 2120],
  transcribed: 'Transcribed 14 Oct 2026 from the scan; the corner box has XIV·b struck out and XIV·c written',
  anchors: [
    { year: 1930, label: '1930 CE [5824 AM]', note: 'Pluto and Ugaritic Ras Shamra Records discovered; meteoric impact kills people in remote region of Brazil' },
    { year: 2106, label: '2106 CE [6000 AM]' },
  ],
  events: [
    { year: 820, label: 'Muslim discovery of Great Pyramid’s interior', cat: 'hist' },
    { year: 1770, label: 'Astroid on its way to 2046 impact passes ecliptic', am: 5664, cat: 'impact' },
    { year: 1790, label: 'Aztec Stone of the Fifth Sun discovered', am: 5684, cat: 'hist', note: 'Aztec Apocalypse shows comets and pyramid with eye' },
    { year: 1816, label: 'Mt. Tambora exploded, 80,000 dead', am: 5710, cat: 'quake', note: 'Poison gas, quake, tsunami and famine; heard 1000 miles away' },
    { year: 1906, label: 'Quake begins ruin of San Francisco', am: 5800, cat: 'quake', note: 'On 108th day a major quake initiated ruin of San Francisco in the Great Fire' },
    { year: 1930, label: 'Pluto and Ras Shamra records discovered', am: 5824, cat: 'hist' },
    { year: 1954, label: 'Astroid on 2046 impact journey passed ecliptic', am: 5848, cat: 'impact', note: 'Typhoon killed 1600 in Japan' },
    { year: 2044, label: 'First Trumpet is Meteoric Rain', am: 5938, cat: 'impact' },
    { year: 2070, label: 'Resurrection', cat: 'proph', note: '2070 [207×10] is 414×5' },
    { year: 2090, label: 'End of Seven Plagues [Meteoric Rain]', am: 5984, cat: 'proph' },
  ],
  spans: [
    { from: 1906, to: 1930, years: 24, label: '24', cat: 'quake' },
    { from: 1930, to: 1954, years: 24, label: '24', cat: 'impact' },
    { from: 1816, to: 1930, years: 114, label: '1816 CE [5710 AM] is 114 years', cat: 'quake' },
    { from: 1930, to: 2044, years: 114, label: '114 years to 2044 CE [5938 AM]', cat: 'impact' },
    { from: 1790, to: 1930, years: 140, label: '1790 CE is [5684 AM] 140 [70×2] years', formula: '70 × 2 = 140', cat: 'hist' },
    { from: 1930, to: 2070, years: 140, label: '140 years to 2070 CE Resurrection', cat: 'proph' },
    { from: 1770, to: 1930, years: 160, label: '1770 CE [5664 AM] was 160 [40×4] years', formula: '40 × 4 = 160', cat: 'impact' },
    { from: 1930, to: 2090, years: 160, label: '160 years to 2090 CE [5984 AM]', cat: 'proph' },
    { from: 820, to: 1930, years: 1110, label: '1110 years to 820 CE', cat: 'hist' },
  ],
  math: [
    { eq: '207 × 10 = 2070', cap: '2070 [207×10] is 414×5' },
    { eq: '414 × 5 = 2070', cap: '2070 [207×10] is 414×5' },
  ],
};
