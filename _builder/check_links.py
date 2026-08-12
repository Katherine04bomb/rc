# -*- coding: utf-8 -*-
"""Broken-link check at filesystem level: every relative href/src in the 16 new
city pages must resolve to an existing file inside readychina3/."""
import os, re, glob

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
GUIDES = os.path.join(ROOT, "guides")
CITIES = [f for f in sorted(os.listdir(GUIDES)) if f.endswith(".html") and f != "beijing.html"]

errors, total = [], 0
for fn in CITIES:
    html = open(os.path.join(GUIDES, fn), encoding="utf-8").read()
    refs = re.findall(r'(?:href|src)="([^"]+)"', html)
    local = [r for r in refs if r.startswith(("../", "./", "/")) and not r.startswith(("http", "data:", "//"))]
    for r in local:
        total += 1
        # strip fragment/query before resolving against the filesystem
        clean = r.split("#")[0].split("?")[0]
        if not clean:
            continue
        p = os.path.normpath(os.path.join(GUIDES, clean))
        if not os.path.exists(p):
            errors.append(f"{fn}: broken ref -> {r} (resolved {p})")
    # external images must be cloudinary or empty (GA/fonts allowed as head assets)
    ext = [r for r in refs if r.startswith("http")]
    bad = [r for r in ext if not (r.startswith("https://res.cloudinary.com")
                                   or "googletagmanager.com" in r or "fonts.googleapis.com" in r
                                   or "fonts.gstatic.com" in r or "readychinatravel.com" in r)]
    if bad:
        errors.append(f"{fn}: non-cloudinary external refs {bad[:3]}")

print(f"checked {total} local refs across {len(CITIES)} pages")
if errors:
    print("BROKEN:")
    for e in errors: print("  -", e)
else:
    print("ALL LOCAL REFS RESOLVE — no broken links")
