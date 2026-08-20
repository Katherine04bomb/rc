#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
add_city.py — 从 guides/xxx.html 自动提取数据，生成 JSON 条目并合并进 data/cities.json

用法（在仓库根目录运行）：
    python add_city.py guides/kunming.html
    python add_city.py guides/kunming.html --days "3-4 days"     # 手动指定推荐游玩天数
    python add_city.py guides/kunming.html --data data/cities.json   # 显式指定数据文件

前提：你的 guides/xxx.html 必须使用现有模板结构（hero-city-* / hero-meta-tag /
      attraction-tile-title / res.cloudinary 图片），否则提取到的字段可能不完整。

运行后手动检查 data/cities.json 里新加的那条，把缺失/不准的字段（尤其 days）改好，
再 push 到 GitHub 即可。
"""
import json
import os
import re
import sys

DEFAULT_DAYS = "2–3 days"  # HTML 里提取不到天数时的兜底值，请手动改成准确值


def extract(path):
    with open(path, encoding="utf-8") as f:
        html = f.read()

    def grab(pattern):
        m = re.search(pattern, html)
        return m.group(1).strip() if m else ""

    def clean(s):
        s = s.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">")
        return re.sub(r"<[^>]+>", "", s).strip()

    # ── hero 信息 ──────────────────────────────────────────────
    emoji = grab(r'class="hero-city-emoji">([^<]*)</')
    name_zh = grab(r'class="hero-city-zh">([^<]*)</')
    name_en = grab(r'<h1 class="hero-city-en">([^<]*)</')
    best_for = grab(r'class="hero-city-sub">([^<]*)</')

    # meta tags：第一个是难度星级，其余是标签
    metas = re.findall(r'class="hero-meta-tag">([^<]*)<', html)
    metas = [clean(m) for m in metas if clean(m)]
    difficulty = metas[0] if metas else "★★☆☆☆"
    tags = [m for m in metas[1:] if not m.startswith("🗓")]
    days_tag = [m for m in metas if m.startswith("🗓")]
    if days_tag:
        days = days_tag[0].replace("🗓", "").strip()
        days = days if days.lower().endswith("days") else days + " days"
    else:
        days = DEFAULT_DAYS

    # ── 景点（Top 5）──────────────────────────────────────────
    attractions = [clean(t) for t in re.findall(r'class="attraction-tile-title">([^<]*)<', html)]

    # ── 照片（hero 背景 + 页面里所有 cloudinary 图）────────────
    photos = []

    def add_photo(src, alt):
        if src and not any(p["src"] == src for p in photos):
            photos.append({"src": src, "alt": alt})

    m = re.search(r'guide-hero-banner"\s+style="background-image:\s*url\(\'([^\']+)\'\)', html)
    if m:
        add_photo(m.group(1), "City hero view")
    for m in re.finditer(r'<img[^>]*src="(https://res\.cloudinary\.com/[^"]+)"[^>]*alt="([^"]*)"', html):
        add_photo(m.group(1), m.group(2))

    return {
        "emoji": emoji or "📍",
        "nameZh": name_zh,
        "nameEn": name_en,
        "difficulty": difficulty,
        "days": days,
        "bestFor": best_for,
        "tags": tags,
        "attractions": attractions,
        "photos": photos,
    }


def find_data_file(explicit=None):
    """定位 data/cities.json。explicit 优先，其次常见位置，再其次当前目录下最近的 cities*.json"""
    if explicit and os.path.exists(explicit):
        return explicit
    candidates = [
        "data/cities.json",
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "cities.json"),
        os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "cities.json"),
    ]
    for c in candidates:
        if os.path.exists(c):
            return c
    # 兜底：当前目录下所有 *cities*.json，取修改时间最新的
    pats = [p for p in os.listdir(".") if "cities" in p.lower() and p.endswith(".json")]
    if pats:
        return max(pats, key=os.path.getmtime)
    return None


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    html_path = sys.argv[1]
    days_arg = None
    data_arg = None
    if "--days" in sys.argv:
        i = sys.argv.index("--days")
        if i + 1 < len(sys.argv):
            days_arg = sys.argv[i + 1]
    if "--data" in sys.argv:
        i = sys.argv.index("--data")
        if i + 1 < len(sys.argv):
            data_arg = sys.argv[i + 1]

    if not os.path.exists(html_path):
        print("找不到文件:", html_path)
        sys.exit(1)

    entry = extract(html_path)
    if days_arg:
        entry["days"] = days_arg

    data_path = find_data_file(data_arg)
    if not data_path:
        print("找不到 cities.json —— 请用 --data 指定，或在仓库根目录运行本脚本")
        sys.exit(1)

    with open(data_path, encoding="utf-8") as f:
        cities = json.load(f)

    slug = entry["nameEn"].lower().replace("'", "").replace(" ", "-")
    if any(c["nameEn"].lower().replace("'", "").replace(" ", "-") == slug for c in cities):
        print("! %s 已经存在于 cities.json，未做任何修改。" % entry["nameEn"])
        sys.exit(0)

    cities.append(entry)
    with open(data_path, "w", encoding="utf-8") as f:
        json.dump(cities, f, ensure_ascii=False, indent=2)

    print("✓ 已添加 %s (%s) 到 %s" % (entry["nameEn"], entry["nameZh"], data_path))
    print("  天数: %s | 难度: %s | 景点 %d 个 | 照片 %d 张" %
          (entry["days"], entry["difficulty"], len(entry["attractions"]), len(entry["photos"])))
    if not days_arg and "🗓" not in open(html_path, encoding="utf-8").read():
        print("  提醒: HTML 里没有天数信息，days 用了默认值 '%s'，请手动改准确。" % DEFAULT_DAYS)


if __name__ == "__main__":
    main()
