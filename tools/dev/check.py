#!/usr/bin/env python3
"""Pull checkable claims out of dump/*.txt and evaluate them.
Kinds:
  AM    'Y BC|AD [N AM]'  -> AM = 3895 - BC or AD + 3894
  F     'N ... [a×b or c+d]' -> each alternative evaluates to N
  EQ    'a op b op c = d' arithmetic chains in math-card lines
  SPAN  'Y1 BC|AD → Y2 BC|AD = N' -> years between, no year zero
"""
import re, sys, glob, json, os
D = os.path.dirname(os.path.abspath(__file__)) + '/../dump/'
N = r'(\d[\d,]*(?:\.\d+)?)'
def num(s): return float(s.replace(',', ''))
def am_of(y, era): return 3895 - y if era == 'BC' else y + 3894
def ast(y, era): return -(y - 1) if era == 'BC' else y
def ev(expr):
    e = expr.replace('×', '*').replace('x', '*').replace('X', '*').replace('÷', '/').replace('−', '-').replace(',', '').replace('½', '.5')
    if not re.fullmatch(r'[\d.\s+*/()\-]+', e) or not re.search(r'\d\s*[+*/\-]\s*\d', e): return None
    try: return eval(e)
    except Exception: return None
out = {}
for f in sorted(glob.glob(D + '*.txt')):
    name = os.path.basename(f)[:-4]
    t = open(f, encoding='utf-8').read().replace(' ', ' ').replace('\xa0', ' ')
    claims = []
    seen = set()
    def add(kind, text, ok, correct=''):
        key = (kind, re.sub(r'\s+', ' ', text))
        if key in seen: return
        seen.add(key); claims.append([kind, key[1], ok, correct])
    for m in re.finditer(r'(?<![\d.])(\d{1,4})\s*(BC|AD)\s*[\[(]\s*([−-]?\d{1,4})\s*(?:AM|Annus Mundi|A\.M\.)\b', t):
        y, era, a = int(m.group(1)), m.group(2), int(m.group(3).replace('−', '-'))
        c = am_of(y, era)
        if (y, era, a) == (3895, 'BC', 1): continue
        add('AM', m.group(0), c == a, '%d %s = %d AM' % (y, era, c))
    for m in re.finditer(r'(?<![\d.])(\d{1,4})\s*(?:AM|Annus Mundi)\s*[\[(]\s*(\d{1,4})\s*(BC|AD)\s*[\])]', t):
        a, y, era = int(m.group(1)), int(m.group(2)), m.group(3)
        c = am_of(y, era)
        if (y, era, a) == (3895, 'BC', 1): continue
        add('AM', m.group(0), c == a, '%d %s = %d AM' % (y, era, c))
    for m in re.finditer(r'(?<![\d.])' + N + r'\s*(?:yrs?\.?|years?|P″|P"|months|days)?\s*[\[(]([^\]\)]{3,60})[\])]', t):
        n = num(m.group(1)); alts = re.split(r'\s+or\s+|;|:', m.group(2))
        for a in alts:
            v = ev(a.strip())
            if v is not None: add('F', '%s [%s]' % (m.group(1), a.strip()), abs(v - n) < 1e-6, '%s = %g' % (a.strip(), v))
    for line in t.split('\n'):
        for seg in re.split(r'\s+·\s+|;\s+', line):
            m = re.fullmatch(r'\s*(\d{1,4})\s*(BC|AD)\s*(?:\[[^\]]*\])?\s*(?:→|to|←|-|–)\s*(\d{1,4})\s*(BC|AD)\s*(?:\[[^\]]*\])?\s*=\s*' + N + r'.*', seg)
            if m:
                y1, e1, y2, e2, n = int(m.group(1)), m.group(2), int(m.group(3)), m.group(4), num(m.group(5))
                c = abs(ast(y2, e2) - ast(y1, e1)); add('SPAN', seg.strip()[:90], c == n, '%d years' % c); continue
            if '=' in seg and not re.search(r'BC|AD|AM|P″', seg.split('=')[0] if False else ''):
                parts = [p.strip() for p in seg.split('=')]
                vals = []
                for p in parts:
                    p2 = re.sub(r'\b(?:yrs?\.?|years?|P″|P"|AD|AM|days|months|decades)\b', '', p).strip()
                    v = ev(p2)
                    if v is None and re.fullmatch(r'[\d,]+(?:\.\d+)?', p2 or 'x'): v = num(p2)
                    vals.append(v)
                if sum(v is not None for v in vals) >= 2 and any(re.search(r'[+×x*/−\-]', re.sub(r'\b(?:yrs?|years?|AD|AM)\b', '', p)) for p in parts):
                    good = [v for v in vals if v is not None]
                    if 'BC' in seg: continue
                    ok = all(abs(v - good[0]) < 1e-6 for v in good)
                    add('EQ', seg.strip()[:90], ok, ' | '.join('%g' % v for v in good))
    out[name] = claims
json.dump(out, open(D + '../claims.json', 'w'), ensure_ascii=False, indent=0)
tot = sum(len(v) for v in out.values()); bad = [(k, c) for k, v in out.items() for c in v if not c[2]]
print('claims', tot, 'flagged', len(bad))
for k, c in bad: print(k, c[0], '|', c[1], '|', c[3])
