#!/usr/bin/env python3
"""Assemble a redesign page from gen/<name>.frag on the pNNN.html template.
A .frag holds four sections, each introduced by a marker line:
  ---TITLE---  ---CSS---  ---BODY---  ---JS---
Usage: build.py name [name...]   (writes ../../Chronotecture-Charts/redesign/<name>.html)
"""
import os, re, sys
G = os.path.dirname(os.path.abspath(__file__)) + '/'
F = G + 'frags/'
OUT = '../../redesign/'
head = open(G + 'head.html', encoding='utf-8').read()
helpers = open(G + 'helpers.js', encoding='utf-8').read()
for name in sys.argv[1:]:
    src = open(F + name + '.frag', encoding='utf-8').read()
    parts = dict(re.findall(r'^---(\w+)---\n(.*?)(?=^---\w+---\n|\Z)', src, flags=re.S | re.M))
    page = (head.replace('%%TITLE%%', parts['TITLE'].strip()).replace('%%CSS%%', parts.get('CSS', '').rstrip())
            + '<div class="wrap">\n' + parts['BODY'].strip() + '\n</div>\n<div id="tip"></div>\n<script>\n'
            + helpers + parts['JS'].strip() + '\n</script>\n</body>\n</html>\n')
    open(OUT + name + '.html', 'w', encoding='utf-8').write(page)
    print(name, len(page))
