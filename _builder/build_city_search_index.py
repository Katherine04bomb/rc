import json
import re
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError:
    print("Need BeautifulSoup. Run: pip install beautifulsoup4")
    raise

GUIDES_DIR = Path("guides")
INDEX_PATH = Path("data/search-index.json")
BACKUP_PATH = Path("data/search-index.json.bak")


def extract_text(html):
    soup = BeautifulSoup(html, "html.parser")

    # 去掉 script/style
    for tag in soup(["script", "style"]):
        tag.decompose()

    # 标题
    title_tag = soup.find("title")
    title = ""
    if title_tag:
        title = title_tag.get_text(strip=True)
        title = re.sub(r"\s*—\s*Ready\?\s*China!\s*$", "", title)

    # 正文文本
    text = soup.get_text(separator=" ", strip=True)
    text = re.sub(r"\s+", " ", text)
    return title, text


def make_snippet(text, max_len=160):
    text = text.replace(";", ".")
    sentences = re.split(r"(?<=[.!?])\s+", text)
    snippet = ""
    for s in sentences:
        if len(snippet) + len(s) + 1 <= max_len:
            snippet += s + " "
        else:
            break
    return snippet.strip() or text[:max_len]


def main():
    if not GUIDES_DIR.exists():
        print(f"guides/ not found at {GUIDES_DIR.resolve()}")
        return

    new_items = []
    for html_path in sorted(GUIDES_DIR.glob("*.html")):
        if html_path.name.lower() == "index.html":
            continue

        html = html_path.read_text(encoding="utf-8")
        title, text = extract_text(html)
        url = f"guides/{html_path.name}"
        snippet = make_snippet(text)

        new_items.append({
            "title": title,
            "url": url,
            "tag": "City Guide",
            "snippet": snippet,
            "text": text,
        })
        print(f"Indexed: {title} -> {url}")

    # 读取现有索引
    if INDEX_PATH.exists():
        with INDEX_PATH.open("r", encoding="utf-8") as f:
            index = json.load(f)
        # 备份
        with BACKUP_PATH.open("w", encoding="utf-8") as f:
            json.dump(index, f, ensure_ascii=False, indent=2)
        print(f"Backup saved to {BACKUP_PATH}")
    else:
        index = []

    # 移除旧的城市 guide 条目，避免重复
    index = [item for item in index if item.get("tag") != "City Guide"]

    # 追加新生成的城市 guide 条目
    index.extend(new_items)

    with INDEX_PATH.open("w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)

    print(f"\nDone. Added {len(new_items)} city guides to {INDEX_PATH}")


if __name__ == "__main__":
    main()
