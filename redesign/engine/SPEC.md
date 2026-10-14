# Plate spec (redesign/data/pNNN.js)

Each engine-drawn plate is two files:

- `redesign/data/pNNN.js` sets `window.PLATE = {...}` (format below; `data/p022.js` is the reference example)
- `redesign/pNNN.html`, a copy of `p022.html` with the data path changed

`engine/chart.js` draws everything; no plate gets its own drawing code.

## Year convention
Write years exactly as the plate writes them: **BC = negative, AD = positive, no year zero** (2239 BC → `-2239`,
503 AD → `503`). The engine converts to astronomical years for positions and arithmetic. Put a plate's own Anno Mundi
tag in `am` when the plate prints one; otherwise the engine computes AM = astro + 3894.

## Fields

| Field | Required | Shape |
|---|---|---|
| `plate` | yes | plate number |
| `chart` | if printed | chart label as printed, using `·` (e.g. `'III·b'`, `'VI·c'`) |
| `title` | yes | short descriptive name for what the plate shows (the plates have no titles; name the main idea, ≤ 7 words) |
| `subtitle` | optional | one line on the key numbers |
| `signed` | if signed | e.g. `"Breshears '07"` |
| `rotated` | yes | `true` if the plate is drawn sideways (text runs up the page), else `false` |
| `range` | yes | `[firstYear, lastYear]` with a little margin either side |
| `anchors` | optional | `{year, label, note?}` for the plate's heavy axis lines (the Flood, Year One, 1902…), 1–5 |
| `events` | yes | `{year, label, am?, cat, note?}` for every dated label. `label` ≤ 60 chars, paraphrase if longer, full detail in `note` |
| `spans` | yes | `{from, to, years?, label, formula?, cat, note?}` for every bar or bracket with a length. `years` = the length the plate prints |
| `cycles` | optional | `{start, step, count, label, note?}` for rows of equal circles or repeated equal segments |
| `math` | optional | `{eq, cap}` for arithmetic printed on the plate, e.g. `'552 × 3 = 1656'` (use × and ÷; pure arithmetic only on the left and right of `=`) |
| `notes` | optional | sentences for undated text blocks on the plate |
| `transcribed` | yes | `'Transcribed 13 Oct 2026 from the scan'` plus any uncertainty, e.g. `'; 2 labels illegible'` |

`cat` is one of: `comet`, `quake`, `proph`, `hist`, `flood`, `impact`, `eden`, `anun`, `cycle`.

## Rules
- Transcribe; don't correct. If the plate's arithmetic disagrees with its own dates, keep the plate's numbers; the
  math panel turns red on its own.
- Mark anything you can't read with `[?]` in the label rather than guessing.
- A plate that is not a timeline (a pyramid cross-section, a geometric figure, a table) still gets a spec: put its
  dated items in `events`/`spans` if it has any, describe the figure in `notes`, and set `kind: 'figure'`.
