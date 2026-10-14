"""Wire every engine-drawn plate (redesign/data/pNNN.js) into the atlas.

For each one: the plate page (pages/pNNN.html) gets the "Original plate / Interactive redesign" toggle and the
embedded frame, exactly like the hand-built redesigns; index.html gets the plate in STARS (the star badge and
filter) and its title in KW (search). Safe to re-run: plates that are already wired are left alone.

Usage: python -I redesign/engine/link.py   (from the repo root)
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SEG = '  <div class="seg"><button class="on" data-view="plate">Original plate</button><button data-view="redesign">Interactive redesign ✦</button></div>'


def spec(path):
    t = path.read_text(encoding="utf-8")
    title = re.search(r"title:\s*(['\"])(.*?)\1", t)
    chart = re.search(r"chart:\s*(['\"])(.*?)\1", t)
    return (title.group(2) if title else ""), (chart.group(2) if chart else "")


def main():
    index_p = ROOT / "index.html"
    index = index_p.read_text(encoding="utf-8")
    stars = {int(k): 1 for k in re.findall(r"(\d+):1", re.search(r"var STARS=\{([^}]*)\}", index).group(1))}
    kw_m = re.search(r"var KW=(\{.*?\});", index)
    kw = json.loads(re.sub(r"(\d+):", r'"\1":', kw_m.group(1)))

    wired = []
    for data in sorted((ROOT / "redesign" / "data").glob("p[0-9][0-9][0-9].js")):
        n = int(data.stem[1:])
        title, chart = spec(data)
        page_p = ROOT / "pages" / f"p{n:03d}.html"
        page = page_p.read_text(encoding="utf-8")
        if 'class="frame"' not in page:
            lines = page.split("\n")
            # The template leaves line 9 (toggle) and line 21 (frame) as blank placeholders.
            assert lines[8].strip() == "" and lines[20].strip() == "", f"unexpected layout in {page_p.name}"
            lines[8] = SEG
            lines[20] = f'  <iframe class="frame" src="../redesign/p{n:03d}.html" title="redesign"></iframe>'
            page = "\n".join(lines)
            if chart and "Chart " not in page.split("pnum")[1][:200]:
                page = page.replace(
                    "/ 119</span></div>",
                    f"/ 119</span> &nbsp;·&nbsp; <span class='serif' style='color:#ffcf5c;font-size:17px'>Chart {chart}</span></div>",
                    1,
                )
            page_p.write_text(page, encoding="utf-8")
            wired.append(n)
        stars[n] = 1
        words = f"{('chart ' + chart.replace('·', ' ').lower()) if chart else ''} {title.lower()}".strip()
        kw.setdefault(str(n), words)

    kw_js = "{" + ",".join(f'{k}:{json.dumps(v)}' for k, v in sorted(kw.items(), key=lambda kv: int(kv[0]))) + "}"
    index = index[: kw_m.start(1)] + kw_js + index[kw_m.end(1):]
    index = re.sub(r"var STARS=\{[^}]*\}", "var STARS={" + ",".join(f"{k}:1" for k in sorted(stars)) + "}", index)
    index_p.write_text(index, encoding="utf-8")
    print(f"wired {len(wired)} plate pages: {wired}; {len(stars)} plates starred in the atlas")


if __name__ == "__main__":
    main()
