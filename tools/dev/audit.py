#!/usr/bin/env python3
"""Build AUDIT.md from rows.json (rendered math cards) and claims.json (dates and
bracketed formulas found in the transcriptions)."""
import json, re, os
H = os.path.dirname(os.path.abspath(__file__)) + '/../'
rows = json.load(open(H + 'rows.json'))
claims = json.load(open(H + 'claims.json'))
PLATE = {'chart-i': 13, 'ie': 17, 'iib': 19, 'iic': 20, 'vic': 29, 'vid': 30, 'great-step': 99, 'p119': 119, 'constellation': 200}
def plate_no(p): return PLATE.get(p, int(p[1:]) if re.fullmatch(r'p\d{3}', p) else 999)
# rows whose note marks a check that holds, not a failure
HOLD_NOTE = [('chart-i', '3036 − 2436'), ('p023', '1110 P″ + 2760'), ('p053', '1261 BC + 3036'), ('p080', '990 AM + 4950'),
             ('p084', '2005 − 1945'), ('p118', '3927 AM = 33 AD'), ('p119', '138 × 16')]
# failing rows that carry their note in the caption rather than a separate note
EXTRA_FAIL = {('p073', '366 ÷ 7 = 52.2'): '366 ÷ 7 = 52.29 (the plate truncates to 52.2)'}
# transcription claims that the checker misreads
SKIP_CLAIM = [('F', r'^\d{1,2} \['), ('AM', r'^745 BC \(2070 AM'), ('AM', r'^1480 BC \[1305 AM'), ('AM', r'^2052 AD \[1800 AM')]
CORR = {
 ('p022', '3000 + 3000'): '4687 BC → 1688 BC is 2999 years and 1688 BC → 1314 AD is 3001; both are 3000 from 1687 BC [2208 AM]',
 ('p022', '552 | 552'): '2239 BC → 1688 BC is 551 years and 1688 BC → 1135 BC is 553; both are 552 from 1687 BC',
 ('p061', '1296 = 108×12'): 'Shem born 2337 BC: 2337 − 1039 = 1298; the bar is labelled 1296',
 ('p043', '1600 = 40 × 40'): '607 BC → 1054 AD is 1660 years; 3288 AM + 1600 = 4888 AM = 994 AD',
 ('p041', '356 + 2400'): '356 AD is 4250 AM; 3539 AM is 356 BC, and it is from 356 BC that 2400 years reach 2045 AD',
 ('p041', '365 + 1680'): '365 AD is 4259 AM, not 5259',
 ('p081', '60.96 + 144'): '60.96 + 144 = 204.96, about 1 P″ past the 204 P″ well-pit axis it is drawn to',
 ('p081', '1700 − 1656'): '1700 − 1656 = 44; the riser is lettered 34 P″',
 ('p112', '1836 + 1546'): '1836 + 1546 = 3382, 21–22 more than the 3360/3361 P″ slope it is set against',
 ('p018', '1656 + 34'): '1656 + 34 = 1690',
 ('p062', '1998 − 1976'): '1998 − 1976 = 22',
 ('p080', '1902 + 60.9'): '1902 + 60.96 = 1962.96 (lettered “1962–1963”)',
 ('p084', '60.96 P″ → 2022'): '1962 + 60.96 = 2022.96 ≈ 2023',
 ('p087', '2052 + 38.8'): '2052 + 38.8 = 2090.8 (lettered 2090)',
 ('p088', '2014 + 38.8'): '2014 + 38.8 = 2052.8 (lettered 2052)',
 ('p059', '3895 AM + 1524'): '3895 + 1524 = 5419 (this paragraph is struck through with an X on the plate)',
}
def esc(s): return s.replace('|', '\\|').replace('\n', ' ').strip()
def note_of(r):
    if r['aw']: return r['aw']
    m = re.search(r'((?:as written|As written|as drawn)\s*[—:].*)', r['all'])
    return m.group(1) if m else ''
def correct_from(note):
    n = re.sub(r'^(?:as written|As written|as drawn|note)\s*[—:]\s*', '', note.strip())
    return n[0].upper() + n[1:] if n else n
def is_claim(eq): return bool(re.search(r'[=+×÷−→◁▷]|\d\s*-\s*\d|\bx\b', eq))
pages = sorted(rows, key=plate_no)
fails = []
body = []
total = 0
for p in pages:
    info = rows[p]
    kick = re.sub(r'\s+', ' ', info['kicker']).title().replace('Ii', 'II').replace('Iv', 'IV').replace('Vi', 'VI').replace('Xx', 'XX')
    title = info['title'].replace('Chronotecture · ', '')
    out = []
    for r in info['rows']:
        eq = r['eq'] or r['all'].split('\n')[0]
        note = note_of(r)
        if not is_claim(eq) and not note: continue
        key = next((k for k in EXTRA_FAIL if k[0] == p and k[1] in eq), None)
        if key:
            ok, corr = False, EXTRA_FAIL[key]
        elif note and not any(h[0] == p and h[1] in eq for h in HOLD_NOTE):
            ok, corr = False, next((v for k, v in CORR.items() if k[0] == p and k[1] in eq), correct_from(note))
        else:
            ok, corr = True, ''
        cap = r['cap'].split('\n')[0]
        out.append((esc(eq), esc(cap)[:140], ok, esc(corr)))
    seen = {o[0] for o in out}
    for kind, text, ok, corr in claims.get(p, []):
        if kind not in ('AM', 'F'): continue
        if any(k == kind and re.search(rx, text) for k, rx in SKIP_CLAIM): continue
        t = text if text.endswith(']') or text.endswith(')') else text + (']' if '[' in text else ')')
        if t in seen: continue
        seen.add(t)
        if kind == 'AM' and not ok:
            m = re.search(r'(\d+) (BC|AD) = (-?\d+) AM', corr); a = re.search(r'([−-]?\d+)\s*(?:AM|Annus Mundi)', t)
            if m and a:
                av = int(a.group(1).replace('−', '-')); back = (str(3895 - av) + ' BC') if av <= 3894 else (str(av - 3894) + ' AD')
                corr = '%s %s = %s AM; %d AM = %s' % (m.group(1), m.group(2), m.group(3), av, back)
        out.append((esc(t), 'Transcription', ok, '' if ok else esc(corr)))
    if not out: continue
    total += len(out)
    body.append('\n## Plate %s · %s\n' % (plate_no(p) if plate_no(p) < 200 else '—', title))
    body.append('`redesign/%s.html`\n' % p)
    body.append('| # | Claim | Context | Holds | Correct figure |\n|---|---|---|:---:|---|')
    for i, (eq, cap, ok, corr) in enumerate(out, 1):
        body.append('| %d | %s | %s | %s | %s |' % (i, eq, cap, '✓' if ok else '✗', corr))
        if not ok: fails.append((plate_no(p), p, eq, corr))
head = '''# Arithmetic audit

Every sum and span on the chart rebuilds in `redesign/`, checked. One table per plate lists each claim, whether it holds, and the correct figure where it does not. **This is a report only: no plate's numbers were changed.** Every failure also has an "as written" note on its page.

## How the claims were checked

- **Sources.** The claims are the arithmetic each rebuild's *Cycle mathematics* card records from its plate, plus every Anno Mundi date (`Y BC [N AM]`) and bracketed formula (`4368 yrs. [52×84]`) in its full transcription. The readings are the rebuilds' transcriptions. Where a figure failed, it was checked against the plate scan before being recorded, for plates 13, 17, 19, 20, 29, 30, 54, 64 and 69.
- **Anno Mundi.** The plates count AM as years elapsed since 3895 BC: **AM = 3895 − BC year = AD year + 3894** (2239 BC = 1656 AM, 1460 BC = 2435 AM, 1902 AD = 5796 AM, 2106 AD = 6000 AM). The plates call 3895 BC itself "1 AM" or "Annus Mundi Year 1". That label is the convention's starting point and is not marked as an error.
- **BC to AD spans have no year zero.** From Y₁ BC to Y₂ AD is Y₁ + Y₂ − 1 years; for example, 2239 BC to 641 AD is 2879 years, not 2880.
- **Approximate figures.** Where the plate rounds or truncates (52.2 for 366 ÷ 7, 2016 for 2005 + 11½), the claim is marked ✗ with the exact figure, since the plate's own arithmetic does not close.
- The Constellation and Plate 119 are atlas pages, not Breshears plates; their figures are the plates' figures quoted, and are included for completeness.

## Pages corrected in this pass

Notes added for failures that had none: Chart X·b (p043), XVII·b (p054), XX·b (p064) and XXII (p069). Notes made more precise: p026, p038 and p042. Two earlier notes had used the epoch 3895 BC = 1 AM (AM = 3896 − BC) rather than the plates' own count, and so marked figures as wrong that hold on the plates' terms: Chart III·b (p022, "3343 BC at 553 AM") and Chart IV (p023, "3870 AM falls in 26 BC"). Both are corrected. The real failure on p022 is 1688 BC [2208 AM].
'''
summ = ['\n## Summary of failures\n', '%d claims checked across %d pages; **%d do not hold**.\n' % (total, sum(1 for b in body if b.startswith('\n## Plate')), len(fails)),
        '| Plate | Page | Claim as written | Correct figure |\n|---|---|---|---|']
for n, p, eq, corr in fails:
    summ.append('| %s | `%s` | %s | %s |' % (n if n < 200 else '—', p, eq, corr))
open('../../AUDIT.md', 'w', encoding='utf-8').write(head + '\n'.join(summ) + '\n\n## Plate by plate\n' + '\n'.join(body) + '\n')
print(total, len(fails))
