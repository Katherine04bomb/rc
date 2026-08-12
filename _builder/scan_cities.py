import os
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Scan all 16 city guide pages and extract key info for the V4 rebuild."""
import re, json, os

GUIDES = r"C:/Users/Administrator/WorkBuddy/2026-08-12-10-25-39/readychina3_extracted/readychina3/guides"
CITIES = ["changxing","chengdu","chongqing","dunhuang","guilin","hangzhou","hengqin",
          "kashgar","lijiang","ordos","pingwu-baima","quanzhou","shanghai","xian",
          "yiwu","zhangjiajie"]

out = {}
for c in CITIES:
    p = os.path.join(GUIDES, c + ".html")
    if not os.path.exists(p):
        out[c] = {"error": "missing"}
        continue
    html = open(p, encoding="utf-8").read()
    info = {"file": c + ".html", "size": len(html)}
    # title
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    info["title"] = m.group(1).strip() if m else ""
    # hero city emoji / zh / en
    m = re.search(r'class="hero-city-emoji">([^<]+)</', html)
    info["emoji"] = m.group(1) if m else ""
    m = re.search(r'class="hero-city-zh">([^<]+)</', html)
    info["zh"] = m.group(1) if m else ""
    m = re.search(r'class="hero-city-en">([^<]+)</', html)
    info["en"] = m.group(1) if m else ""
    m = re.search(r'class="hero-city-sub">([^<]+)</', html)
    info["sub"] = m.group(1) if m else ""
    # hero background image URL
    m = re.search(r"guide-hero-banner\" style=\"background-image:[^']*url\('([^']+)'\)", html)
    info["hero_bg"] = m.group(1) if m else ""
    # meta tags
    info["meta_tags"] = re.findall(r'class="hero-meta-tag">([^<]+)<', html)
    # all cloudinary images (unique, in order)
    info["images"] = list(dict.fromkeys(re.findall(r"https://res\.cloudinary\.com/[^\s\"')]+", html)))
    # heading structure (h1/h2/h3) to understand existing sections
    heads = []
    for m in re.finditer(r"<h([123])[^>]*>(.*?)</h\1>", html, re.S):
        txt = re.sub(r"<[^>]+>", "", m.group(2)).strip()
        heads.append((m.group(1), txt[:80]))
    info["headings"] = heads
    # related city links
    info["related"] = re.findall(r'href="\./(\w+)\.html"', html)
    # original top-5 style hints: look for common attraction-ish headings
    out[c] = info

print(json.dumps(out, ensure_ascii=False, indent=1))
