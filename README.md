# Chronotecture · The Prophecy Engine (private backup)

A navigable edition of Jason M. Breshears' *Chronotecture: The Lost Science of Prophetic Engineering* (2017): all 119 plates, plus rebuilt interactive charts in `redesign/`.

**Private on purpose.** The plates in `plates/` and `thumbs/` are scans of Jason Breshears' charts. This repository is a backup of the live site, not a publication. Do not make it public.

- Live site: https://hollywood-rogue-ai-ventures.w3spaces.com/Chronotecture-Charts/index.html
- Run locally: open `index.html` in a browser, or serve this folder with any static server.

| Folder | What it is |
|---|---|
| `index.html`, `style.css`, `viewer.js` | The atlas and the plate viewer (pan, zoom, rotate) |
| `pages/` | One page per plate, p001 to p119 |
| `plates/` | The full-size plate images |
| `thumbs/` | Thumbnails for the index |
| `redesign/` | The rebuilt interactives: the original nine (Chart I, II·b, II·c, I·e, VI·c, VI·d, the Great Step, the Constellation, Plate 119) plus one page per chart plate, `pNNN.html` |
| `text/` | Cleaned transcriptions of the text plates (`pNNN.txt`), bundled into `texts.js` for the plate viewer's "Read text" view and the atlas search |
| `tools/` | `wire.py` (wires the rebuilt pages into `viewer.js` and `index.html` from `plates.tsv`) and `build_texts.py` (builds `text/texts.js`) |

## Rebuilt chart pages

Each chart plate has a rebuilt page in `redesign/pNNN.html`, reached from its plate page with the **Original plate / Interactive redesign** switch. A page redraws the plate's timeline or section, keeps every date, span and measurement as written (with "as written" notes where the plate's arithmetic does not hold), and ends with a full transcription.

Chambers are named **Upper**, **Middle** and **Lower Chamber** throughout, never by the older royal names.

After adding or changing a page:

```
python3 tools/wire.py         # viewer switches, atlas stars, search words, counts
python3 tools/build_texts.py  # after editing text/pNNN.txt
```
