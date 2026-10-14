# tools/dev: the scripts behind the October 2026 rebuild

Kept so the work can be redone, not needed to view the atlas. Run from this folder.

| File | What it does |
|---|---|
| `build.py name…` | Builds `redesign/<name>.html` from `frags/<name>.frag` on the pNNN template (`head.html` + `helpers.js`). Used for the nine legacy pages: chart-i, ie, iib, iic, vic, vid, great-step, constellation, p119 |
| `shot.js page[@width]…` | Screenshots redesign pages with Playwright and reports page errors (`NODE_PATH=$(npm root -g) node shot.js iib@390`) |
| `dump.js`, `rows.js` | Render every redesign page and save its card text / math rows (`dump/`, `rows.json`) |
| `check.py` | Pulls Anno Mundi dates and bracketed formulas from `dump/` and checks them (AM = 3895 − BC = AD + 3894) |
| `evalrows.py` | Evaluates each math row, BC→AD spans without a year zero |
| `audit.py` | Writes `AUDIT.md` from `rows.json` and `claims.json` |

Order for the audit: `node dump.js && node rows.js && python3 check.py && python3 evalrows.py && python3 audit.py`.
Paths are relative to this folder; outputs (`dump/`, `*.json`, screenshots) land in the repo root, so delete them after use (don't commit them).

**Redesign thumbnails.** `thumbs-redesign/pNNN.jpg` are screenshots of each chart redesign (292×380), shown in the index grid for chart plates; `thumbs/` keeps the original scans. To refresh: from the repo root run `NODE_PATH=$(npm root -g) node tools/dev/thumbs.js`, then resize each `t-pNNN.png` to 292×380 JPEG in `thumbs-redesign/` and delete the PNGs.
