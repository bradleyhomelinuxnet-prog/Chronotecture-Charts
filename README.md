# Chronotecture · The Prophecy Engine

A navigable study edition of Jason M. Breshears' *Chronotecture: The Lost Science of Prophetic Engineering* (2017): all 119 plates, plus rebuilt interactive charts in `redesign/`.

- Live site: https://bradleyhomelinuxnet-prog.github.io/Chronotecture-Charts/ (GitHub Pages, updates on every push to `main`)
- Mirror: https://hollywood-rogue-ai-ventures.w3spaces.com/Chronotecture-Charts/index.html (updated by hand)
- Run locally: open `index.html` in a browser, or serve this folder with any static server.

| Folder | What it is |
|---|---|
| `index.html`, `style.css`, `viewer.js` | The atlas and the plate viewer (pan, zoom, rotate) |
| `pages/` | One page per plate, p001 to p119 |
| `plates/` | The full-size plate images |
| `thumbs/` | Thumbnails for the index |
| `thumbs-redesign/` | Previews of the chart redesigns, shown in the index grid in place of the scans |
| `redesign/` | The rebuilt interactives: the original nine (Chart I, II·b, II·c, I·e, VI·c, VI·d, the Great Step, the Constellation, Plate 119) plus one page per chart plate, `pNNN.html` |
| `redesign/engine/`, `redesign/data/` | The shared chart engine: each `data/pNNN.js` describes one plate and `eNNN.html` draws it with `engine/chart.js`. Every plate (all 119) has one; plate pages show it as **Engine view**, alongside the hand-built redesign or the "Read text" view (spec: `engine/SPEC.md`) |
| `text/` | Cleaned transcriptions of the text plates (`pNNN.txt`), bundled into `texts.js` for the plate viewer's "Read text" view and the atlas search |
| `AUDIT.md` | The arithmetic audit: every sum and span on the chart rebuilds, checked plate by plate (report only; the plates' numbers are unchanged) |
| `tools/` | `wire.py` (wires the rebuilt pages into `viewer.js` and `index.html` from `plates.tsv`) and `build_texts.py` (builds `text/texts.js`) |

## Rebuilt chart pages

Each chart plate has a rebuilt page in `redesign/pNNN.html`, reached from its plate page with the **Original plate / Interactive redesign** switch. A page redraws the plate's timeline or section, keeps every date, span and measurement as written (with "as written" notes where the plate's arithmetic does not hold), and ends with a full transcription.

Chambers are named **Upper**, **Middle** and **Lower Chamber** throughout, never by the older royal names.

After adding or changing a page:

```
python3 tools/wire.py         # viewer switches, atlas stars, search words, counts
python3 tools/build_texts.py  # after editing text/pNNN.txt
```

## About the plates

The scans in `plates/` and `thumbs/` come from Jason M. Breshears' *Chronotecture* (2017) and remain his work. They're shared here for study within our research group, alongside the rebuilt charts and transcriptions. This project isn't affiliated with Breshears or [Archaix](https://archaix.com). If you hold the rights and want anything removed, please [open an issue](../../issues) and it will be taken down.

## Related

- [natori-on-psyfr](https://github.com/bradleyhomelinuxnet-prog/natori-on-psyfr): the predictive chronology engine
- [NatorionCipherPredictiveEngine](https://github.com/bradleyhomelinuxnet-prog/NatorionCipherPredictiveEngine): Ophis rebuilt for the browser
- [All projects](https://bradleyhomelinuxnet-prog.github.io/)
