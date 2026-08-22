#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为 data/search-index.json 生成 City Guide 全文本条目。
纯标准库，无需 pip（不依赖 beautifulsoup4）。
用法： cd ~/desktop/readychina3 && python _builder/build_city_search_index.py
"""
import json
import re
import html
from pathlib import Path

GUIDES_DIR = Path("guides")
INDEX_PATH = Path("data/search-index.json")
BACKUP_PATH = Path("data/search-index.json.bak")


def extract_text(raw_html):
    cleaned = re.sub(r"<script[\s\S]*?</script>", " ", raw_html, flags=re.IGNORECASE)
    cleaned = re.sub(r"<style[\s\S]*?</style>", " ", cleaned, flags=re.IGNORECASE)
    title = ""
    m = re.search(r"<title[^>]*>([\s\S]*?)</title>", cleaned, flags=re.IGNORECASE)
    if m:
        title = html.unescape(m.group(1).strip())
        title = re.sub(r"\s*[—·]\s*Ready\?\s*China!\s*$", "", title).strip()
    text = re.sub(r"<[^>]+>", " ", cleaned)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return title, text


def make_snippet(text, max_len=160):
    text = re.sub(r"\s*;\s*", ". ", text)
    sentences = re.split(r"(?<=[.!?])\s+", text)
    out = ""
    for s in sentences:
        s = s.strip()
        if not s:
            continue
        if len(out) + len(s) + 1 <= max_len:
            out = (out + " " + s).strip()
        else:
            break
    return out or text[:max_len]


def main():
    if not GUIDES_DIR.exists():
        print(f"[错误] 找不到 guides/ 目录：{GUIDES_DIR.resolve()}")
        print("请先 cd 到仓库根目录（~/desktop/readychina3）再运行。")
        return

    new_items = []
    for html_path in sorted(GUIDES_DIR.glob("*.html")):
        if html_path.name.lower() == "index.html":
            continue
        raw = html_path.read_text(encoding="utf-8", errors="ignore")
        title, text = extract_text(raw)
        if not title:
            title = html_path.stem.replace("-", " ").title()
        url = f"guides/{html_path.name}"
        new_items.append({
            "title": title,
            "url": url,
            "tag": "City Guide",
            "snippet": make_snippet(text),
            "text": text,
        })
        print(f"  ✓ {title}  ->  {url}")

    if INDEX_PATH.exists():
        with INDEX_PATH.open("r", encoding="utf-8") as f:
            index = json.load(f)
        with BACKUP_PATH.open("w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        print(f"[备份] 原索引已存到 {BACKUP_PATH}")
    else:
        index = []

    before = len(index)
    index = [it for it in index if it.get("tag") != "City Guide"]  # 只清 City Guide，保留 Community/About 等
    removed = before - len(index)
    index.extend(new_items)

    with INDEX_PATH.open("w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)

    print(f"\n完成 ✅  新增 {len(new_items)} 条 City Guide，移除旧 {removed} 条。")
    print(f"search-index.json 现共 {len(index)} 条。")
    print("下一步： git add data/search-index.json && git commit && git push")


if __name__ == "__main__":
    main()
