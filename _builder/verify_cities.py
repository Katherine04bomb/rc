# -*- coding: utf-8 -*-
"""Verify the 16 generated city pages against the Beijing V4 template structure."""
import os, re, glob, sys

GUIDES = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "guides")
CITIES = [f for f in sorted(os.listdir(GUIDES)) if f.endswith(".html") and f != "beijing.html"]

REQUIRED_BLOCKS = [
    ("header/nav",            "<header>"),
    ("hero banner",           'class="guide-hero-banner"'),
    ("hero back btn",         'class="hero-back-btn"'),
    ("why block",             'class="why-beijing"'),
    ("why photo placeholder", 'class="why-photo-placeholder"'),
    ("top5 section",          'class="attraction-tiles"'),
    ("seo hidden",            'class="seo-hidden"'),
    ("stay section",          'class="district-grid"'),
    ("eat section",           'class="food-grid"'),
    ("tips section",          'callout-tip'),
    ("related",               'class="related-grid"'),
    ("back btn",              'class="guide-btn-primary"'),
    ("modal",                 'class="attr-modal"'),
    ("modal js",              'id="attrModal"'),
    ("city-guide.css",        'city-guide.css'),
    ("canonical",             '<link rel="canonical"'),
    ("og:title",              'property="og:title"'),
    ("GA",                    'G-3G3C5T1WRB'),
]

errors, warns = [], []
for fn in CITIES:
    path = os.path.join(GUIDES, fn)
    html = open(path, encoding="utf-8").read()
    missing = [name for name, needle in REQUIRED_BLOCKS if needle not in html]
    if missing:
        errors.append(f"{fn}: MISSING blocks {missing}")
        continue

    # --- tile <-> seo-hidden linkage ---
    tiles = re.findall(r'data-tpl="([^"]+)"', html)
    tpl_ids = re.findall(r'id="tpl-([^"]+)"', html)
    if len(tiles) != 5: errors.append(f"{fn}: expected 5 tiles, got {len(tiles)}")
    if len(tpl_ids) != 5: errors.append(f"{fn}: expected 5 seo-hidden blocks, got {len(tpl_ids)}")
    if set(tiles) != set(tpl_ids):
        errors.append(f"{fn}: tile/template mismatch tiles={tiles} tpls={tpl_ids}")

    # --- modal data in each seo-hidden block ---
    tpl_blocks = re.findall(r'<div class="seo-hidden" id="tpl-([^"]+)" hidden>.*?</div>\s*</div>', html, re.S)
    for tid in tpl_ids:
        block = re.search(r'<div class="seo-hidden" id="tpl-%s" hidden>(.*?)</div>\s*</div>' % re.escape(tid), html, re.S)
        if not block or 'attraction-modal-data' not in block.group(1):
            errors.append(f"{fn}: tpl-{tid} missing attraction-modal-data")

    # --- stay districts & food count ---
    districts = len(re.findall(r'class="district-card"', html))
    foods = len(re.findall(r'class="food-card"', html))
    if districts < 3: errors.append(f"{fn}: only {districts} districts")
    if foods < 4: errors.append(f"{fn}: only {foods} food cards")

    # --- placeholders vs real images ---
    ph = len(re.findall(r'attraction-tile-img-placeholder|food-photo-ph', html))
    imgs = re.findall(r'<img src="(https?://[^"]+)"', html)
    broken = [u for u in imgs if not u.startswith(("https://res.cloudinary.com", "data:"))]
    if broken: errors.append(f"{fn}: suspicious image srcs {broken[:3]}")
    print(f"OK  {fn}: tiles={len(tiles)} tpls={len(tpl_ids)} districts={districts} foods={foods} ph={ph} imgs={len(imgs)}")

print()
if errors:
    print(f"FAIL: {len(errors)} issues")
    for e in errors: print("  -", e)
    sys.exit(1)
print(f"ALL 16 CITY PAGES PASS STRUCTURE CHECK")
