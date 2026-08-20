#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_search_index.py — Full-text search index builder for Ready? China!

Scans every .html page in the site (root pages, guide folders, guides/*,
community/*), strips navigation/scripts/styles, keeps the readable main
content, and writes data/search-index.json for assets/search.js.

WHY: the old site search only matched a hand-written SEARCH_INDEX plus a
few city fields. This index covers the REAL body text of every page, so a
query like "peking duck" finds guides/beijing.html even though that phrase
only lives inside the page content.

USAGE (run from anywhere; site root is resolved automatically):
    python _builder/build_search_index.py

OUTPUT:
    data/search-index.json  ->  [{ title, url, tag, snippet, text }, ...]

REGENERATE whenever you change page content (guides, community, etc.).
"""

import json
import os
import re
import sys
from html.parser import HTMLParser

# ---------------------------------------------------------------- config
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(ROOT, "data", "search-index.json")

SKIP_DIRS = {"_builder", ".git", "data"}
# <title> fallback for pages without one
TITLE_FALLBACKS = {"index.html": "Ready? China!"}

# Tags whose content is never searchable (nav, footer, modals, scripts…)
SKIP_TAGS = {
    "script", "style", "noscript", "nav", "footer", "header",
    "svg", "head", "template", "iframe",
}

MAX_TEXT_CHARS = 12000         # covers the longest city guide body (~9.5k chars)
SNIPPET_CHARS = 200            # snippet shown in the result row

# Directory name -> friendly category label
TAG_BY_DIR = {
    "visa": "What to Prepare", "immigration": "What to Prepare",
    "flights-hotels": "What to Prepare", "esim": "What to Prepare",
    "wechat": "What to Prepare", "alipay": "What to Prepare",
    "qr-payments": "What to Prepare", "currency": "What to Prepare",
    "vpn": "What to Prepare", "travel-insurance": "What to Prepare",
    "didi": "Getting Around", "metro-guide": "Getting Around",
    "bus-guide": "Getting Around", "high-speed-train": "Getting Around",
    "bike-guide": "Getting Around", "amap-guide": "Getting Around",
    "food-guide": "Things to Know", "dianping-guide": "Things to Know",
    "phrases": "Things to Know", "emergency": "What to Prepare",
    "attractions": "Where to Go", "play": "Fun", "privacy": "About",
}

# ---------------------------------------------------------------- parser
class TextExtractor(HTMLParser):
    """Collects the visible text of a page, skipping nav/footer/scripts."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts = []
        self.skip_depth = 0
        self.in_title = False
        self.title_parts = []
        self.meta_desc = None
        self.in_head_meta = False

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        if tag in SKIP_TAGS:
            self.skip_depth += 1
        elif tag == "title":
            self.in_title = True
        elif tag == "meta" and not self.meta_desc:
            attrs = {k.lower(): (v or "").lower() for k, v in attrs}
            if attrs.get("name") == "description":
                self.meta_desc = dict(attrs).get("content")

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in SKIP_TAGS:
            self.skip_depth = max(0, self.skip_depth - 1)
        elif tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.skip_depth:
            return
        if self.in_title:
            self.title_parts.append(data)
        elif data.strip():
            self.parts.append(data)

    def title(self):
        t = "".join(self.title_parts).strip()
        return t or None

    def text(self):
        return " ".join(self.parts)

# ---------------------------------------------------------------- helpers
def clean(text):
    """Collapse whitespace and normalise quotes/dashes for matching."""
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"[“”]", '"', text)
    text = re.sub(r"[‘’]", "'", text)
    return text.strip()


def make_snippet(text, limit=SNIPPET_CHARS):
    if len(text) <= limit:
        return text
    return text[:limit].rstrip() + "…"


def guess_title(rel_path, extracted_title, meta_desc):
    if extracted_title:
        return extracted_title
    if rel_path in TITLE_FALLBACKS:
        return TITLE_FALLBACKS[rel_path]
    base = os.path.basename(rel_path)
    stem = os.path.splitext(base)[0]
    return stem.replace("-", " ").replace("_", " ").title()


def page_url(rel_path):
    """Relative URL used by search.js. Guide folders keep their bare name
    (matches the existing SEARCH_INDEX convention, e.g. 'visa')."""
    norm = rel_path.replace("\\", "/")
    if norm.endswith("/index.html"):
        return norm[: -len("/index.html")]  # 'visa', 'guides' won't hit this
    return norm  # 'guides/beijing.html', 'community/x.html', 'index.html'


def page_tag(rel_path):
    norm = rel_path.replace("\\", "/")
    if norm.startswith("guides/"):
        return "City Guide"
    if norm.startswith("community/"):
        return "Community"
    if norm.startswith("play/"):
        return "Fun"
    if norm.startswith("privacy/"):
        return "About"
    first = norm.split("/")[0]
    return TAG_BY_DIR.get(first, "Guide")


# ---------------------------------------------------------------- main
def main():
    pages = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS and not d.startswith(".")]
        for fn in sorted(filenames):
            if not fn.lower().endswith(".html"):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT)
            with open(full, encoding="utf-8", errors="replace") as fh:
                html = fh.read()

            parser = TextExtractor()
            try:
                parser.feed(html)
            except Exception as exc:  # never let one bad page kill the build
                print(f"  ! parse error {rel}: {exc}")
                continue

            body_text = clean(parser.text())
            if not body_text:
                print(f"  - skip (empty) {rel}")
                continue

            snippet = clean(parser.meta_desc) or make_snippet(body_text)
            title = guess_title(rel, parser.title(), snippet)

            pages.append({
                "title": title,
                "url": page_url(rel),
                "tag": page_tag(rel),
                "snippet": snippet[:SNIPPET_CHARS],
                "text": body_text[:MAX_TEXT_CHARS],
            })
            print(f"  + {rel}  ({len(body_text)} chars)")

    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    with open(OUTPUT, "w", encoding="utf-8") as fh:
        json.dump(pages, fh, ensure_ascii=False, separators=(",", ":"))

    print(f"\nIndexed {len(pages)} pages -> {os.path.relpath(OUTPUT, ROOT)}")
    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f"Index size: {size_kb:.0f} KB")


if __name__ == "__main__":
    sys.exit(main())
