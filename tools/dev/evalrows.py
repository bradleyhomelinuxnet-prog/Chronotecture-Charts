#!/usr/bin/env python3
"""Evaluate every math-card row in rows.json. Prints rows without an 'as written'
note whose arithmetic does not check, for manual review. Writes evald.json."""
import json, re, os
H = os.path.dirname(os.path.abspath(__file__)) + '/../'
d = json.load(open(H + 'rows.json'))
def ast(y, e): return -(y - 1) if e == 'BC' else y
def ev(x):
    x = x.replace('×', '*').replace('÷', '/').replace('−', '-').replace('–', '-').replace(',', '').replace('½', '.5')
    x = re.sub(r'(?<=\d)\s*[xX]\s*(?=\d)', '*', x)
    if not re.fullmatch(r'[\d.\s+*/()\-]+', x): return None
    try: return eval(x)
    except Exception: return None
def term(t):
    """-> (kind, value) kind in num|AD|BC|AM"""
    t = re.sub(r'\(.*?\)|\[.*?\]|✓|✗|“|”|"|’', '', t).strip()
    t = re.sub(r'\b(?:yrs?\.?|years?|P″|P"|p″|days|months|decades|SK|sk|in|ft)\b', '', t).strip()
    m = re.fullmatch(r'(.*?)\s*\b(AD|BC|AM)\b\.?', t)
    kind = 'num'
    if m: t, kind = m.group(1).strip(), m.group(2)
    v = ev(t) if t else None
    return (kind, v)
def check_seg(seg):
    """returns (checkable, ok, detail)"""
    s = seg.strip()
    # span:  Y1 BC|AD (+|→) N (→|=) Y2 AD|BC
    m = re.fullmatch(r'(\d{1,4})\s*(BC|AD)\s*(?:\[[^\]]*\])?\s*\+\s*(\d+(?:\.\d+)?)\s*(?:P″|yrs?\.?|years?)?\s*(?:→|=)\s*(\d{1,4})\s*(BC|AD).*', s)
    if m:
        y1, e1, n, y2, e2 = int(m.group(1)), m.group(2), float(m.group(3)), int(m.group(4)), m.group(5)
        got = ast(y1, e1) + n; exp = ast(y2, e2)
        return True, abs(got - exp) < 1e-6, 'lands on %s' % (('%g AD' % got) if got > 0 else ('%g BC' % (1 - got)))
    m = re.fullmatch(r'(\d{1,4})\s*(BC|AD)\s*(?:\[[^\]]*\])?\s*(?:→|←|to|–|-)\s*(\d{1,4})\s*(BC|AD)\s*(?:\[[^\]]*\])?\s*=\s*([\d,]+).*', s)
    if m:
        y1, e1, y2, e2, n = int(m.group(1)), m.group(2), int(m.group(3)), m.group(4), float(m.group(5).replace(',', ''))
        c = abs(ast(y2, e2) - ast(y1, e1)); return True, c == n, '%d years' % c
    if '=' not in s: return False, None, ''
    parts = s.split('=')
    vals = [term(p) for p in parts]
    good = [(k, v) for k, v in vals if v is not None]
    if len(good) < 2: return False, None, ''
    if not any(re.search(r'\d\s*[+×x*/−\-÷]\s*\d', p) for p in parts) and not len({k for k, _ in good}) > 1: return False, None, ''
    # convert AD/BC/AM to AM for comparison when kinds mix
    kinds = {k for k, _ in good}
    def norm(k, v):
        if kinds - {'num'} and len(kinds - {'num'}) > 1:
            if k == 'AD': return v + 3894
            if k == 'BC': return 3895 - v
        return v
    nv = [norm(k, v) for k, v in good]
    ok = all(abs(x - nv[0]) < 1e-6 for x in nv)
    return True, ok, ' = '.join('%g' % x for x in nv)
out = {}
for page, info in d.items():
    res = []
    for r in info['rows']:
        segs = re.split(r'\s+·\s+|\s*;\s+|\s+→\s+(?=\d+\s*(?:AD|BC)\b.*=)', r['eq'])
        checks = [check_seg(s) for s in segs]
        bad = [(s, c[2]) for s, c in zip(segs, checks) if c[0] and not c[1]]
        n_ok = sum(1 for c in checks if c[0] and c[1])
        res.append({'eq': r['eq'], 'cap': r['cap'], 'aw': r['aw'], 'auto_bad': bad, 'auto_ok': n_ok})
        if bad and not r['aw']:
            print(page, '|', r['eq'][:110], '|', bad)
    out[page] = {'kicker': info['kicker'], 'title': info['title'], 'rows': res}
json.dump(out, open(H + 'evald.json', 'w'), ensure_ascii=False, indent=1)
