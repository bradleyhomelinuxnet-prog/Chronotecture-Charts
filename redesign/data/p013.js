// Plate 13 · Chart I — transcribed from plates/p013.png. Years as written on the plate (BC negative).
window.PLATE = {
  plate: 13,
  chart: 'I',
  kind: 'figure',
  title: 'The Pyramid-Inch Calendar',
  subtitle: '3361 P" + 2435 AM [1460 BC] = 5796 AM; 1902 AD start of the Giza Course Countdown',
  signed: "Breshears '06",
  rotated: false,
  range: [-3000, 2150],
  transcribed: 'Transcribed 14 Oct 2026 from the scan',
  anchors: [
    { year: -1460, label: '1460 BC [2435 AM]', note: 'Junction of the passages; the Passage Conjunct Axis rises here' },
    { year: 1902, label: '1902 AD [5796 AM]', note: 'Face of the Great Step; start of Giza Course Countdown Calendar' },
  ],
  events: [
    { year: -2908, label: 'Enoch’s ascent in Achuzan, his 365th year', am: 987, cat: 'eden' },
    { year: -1460, label: 'Passage junction', am: 2435, cat: 'cycle', note: 'This is 144.8 decades after Enoch’s ascent in Achuzan 2908 BC [987 AM]' },
    { year: 1902, label: 'Start of Giza Course Countdown Calendar', am: 5796, cat: 'proph', note: '5796 AM [1902 AD] is exactly 414×14 years, a sum referencing the Stonehenge Cursed Earth system' },
  ],
  spans: [
    { from: -1460, to: 1902, years: 3361, label: '3361 P" to face of Great Step', cat: 'proph', note: 'Ascendant Passage' },
    { from: -2908, to: -1460, years: 1448, label: '144.8 decades after Enoch’s ascent', cat: 'eden' },
  ],
  math: [
    { eq: '3361 + 2435 = 5796', cap: '3361 P" + 2435 AM [1460 BC] = 5796 AM; 1902 AD' },
    { eq: '414 × 14 = 5796', cap: 'Stonehenge Cursed Earth system' },
    { eq: '3036 - 2436 = 600', cap: 'Differential of 600 between axis date of 2436 Annus Mundi and remaining 3036 P" down Descendant Passage (the junction is 2435 AM elsewhere on the plate)' },
    { eq: '365 × 4 = 1460', cap: 'Enoch ascended in 365th year' },
  ],
  notes: [
    'A section of the Great Pyramid: south face left, north face 51′51 right, the Central Axis at the face of the Great Step.',
    'Ascendant Passage: 3361 P" to face of Great Step. Descendant Passage: 3036 P" to passage end joint, from the Pyramid Entry. Four bore heights of 52 P".',
    'Differential of 600 between axis date of 2436 Annus Mundi and remaining 3036 P" down Descendant Passage, exhibiting relation to Anunnaki Ner system.',
  ],
};
