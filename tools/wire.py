#!/usr/bin/env python3
"""Wire the rebuilt interactives into the atlas.

Reads redesign/*.html and tools/plates.tsv, then rewrites:
  * viewer.js  - the REDESIGNS map (which plate page gets the "Interactive redesign" switch)
                 and the ENGINE list (plates with redesign/data/pNNN.js get an "Engine view")
  * index.html - FLAGS (chart/text per plate), STARS (interactive), KW (search words),
                 and the interactive counter.
Run from the repository root: python3 tools/wire.py
"""
import glob, html, json, os, re

# Rebuilds named before the pNNN.html convention.
LEGACY = {13: 'chart-i.html', 17: 'ie.html', 19: 'iib.html', 20: 'iic.html',
          29: 'vic.html', 30: 'vid.html', 119: 'p119.html'}
# Plate pages that carry their own switch in their HTML; not listed in viewer.js.
OWN_SWITCH = {19, 20, 119}

rows = {}
for line in open('tools/plates.tsv', encoding='utf-8'):
    if not line.strip() or line.startswith('#'):
        continue
    n, kind, label, kw = (line.rstrip('\n').split('\t') + ['', '', ''])[:4]
    rows[int(n)] = {'kind': kind, 'label': label, 'kw': kw}

redesign = dict(LEGACY)
for path in glob.glob('redesign/p[0-9][0-9][0-9].html'):
    redesign[int(re.search(r'p(\d{3})', path).group(1))] = os.path.basename(path)

def label_of(n):
    r = rows.get(n, {})
    if r.get('label'):
        return r['label']
    src = open('redesign/' + redesign[n], encoding='utf-8').read()
    m = re.search(r'class="kicker">[^<]*?Chart(?:&nbsp;|\s)([^<·]+?)\s*(?:·|<)', src)
    return 'Chart ' + html.unescape(m.group(1)).strip() if m else 'Plate %d' % n

# viewer.js
vm = {('p%03d.html' % n): [redesign[n], label_of(n)] for n in sorted(redesign) if n not in OWN_SWITCH}
v = open('viewer.js', encoding='utf-8').read()
v = re.sub(r'  var REDESIGNS=\{.*?\};', lambda m: '  var REDESIGNS=' + json.dumps(vm, ensure_ascii=False, separators=(',', ':')) + ';', v, count=1, flags=re.S)
engine = sorted(int(re.search(r'p(\d{3})', x).group(1)) for x in glob.glob('redesign/data/p[0-9][0-9][0-9].js'))
v = re.sub(r'  var ENGINE=\[[^\]]*\];', '  var ENGINE=[%s];' % ','.join(map(str, engine)), v, count=1)
open('viewer.js', 'w', encoding='utf-8').write(v)

# index.html
ix = open('index.html', encoding='utf-8').read()
flags = list(re.search(r'var FLAGS="([01]+)"', ix).group(1))
for n, r in rows.items():
    if r['kind'] in ('chart', 'text'):
        flags[n - 1] = '1' if r['kind'] == 'chart' else '0'
kw = json.loads(re.sub(r'([{,])(\d+):', r'\1"\2":', re.search(r'var KW=(\{.*?\});', ix).group(1)))
kw = {int(k): v for k, v in kw.items()}
for n, r in rows.items():
    if r['kw']:
        words = (kw.get(n, '') + ' ' + r['label'].lower() + ' ' + r['kw'].lower().replace(',', ' ')).split()
        kw[n] = ' '.join(dict.fromkeys(words))
stars = {n: 1 for n in redesign}
ix = re.sub(r'var FLAGS="[01]+"', 'var FLAGS="%s"' % ''.join(flags), ix)
ix = re.sub(r'var STARS=\{.*?\};', 'var STARS={%s};' % ','.join('%d:1' % n for n in sorted(stars)), ix)
ix = re.sub(r'var KW=\{.*?\};', lambda m: 'var KW={%s};' % ','.join('%d:%s' % (n, json.dumps(kw[n], ensure_ascii=False)) for n in sorted(kw)), ix)
n_inter = len(stars) + 2  # + the Great Step and the Constellation, which have no plate of their own
ix = re.sub(r'(data-to=")\d+("[^>]*>0</div><div class="l">Interactive)', r'\g<1>%d\2' % n_inter, ix)
ix = re.sub(r'(data-to=")\d+("[^>]*>0</div><div class="l">Chart plates)', r'\g<1>%d\2' % flags.count('1'), ix)
open('index.html', 'w', encoding='utf-8').write(ix)
print('viewer.js: %d redesign switches, %d engine views; index.html: %d chart plates, %d interactive (%d plates)' % (len(vm), len(engine), flags.count('1'), n_inter, len(stars)))
