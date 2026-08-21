#!/usr/bin/env python3
"""
_builder/community_generator.py — generates one real, indexable HTML
page per community post, so Google can find and rank each Q&A / tip /
news item on its own (instead of everything living only inside the
community.html feed, invisible to search engines).

HOW TO USE:
  1. Add or edit a post in assets/community.js as usual (see the
     instructions at the top of that file — every post now needs a
     `slug` field too).
  2. Run:  python3 _builder/community_generator.py
  3. This writes /community/<slug>.html for every post in POSTS.
  4. git add community.js community/*.html, then git push.

This script only READS assets/community.js — it never modifies it.
It parses the POSTS array with regex rather than a JS engine, so it
expects each post body to NOT contain a literal backtick character.
"""

import re
import os
import html

REPO_ROOT = os.path.join(os.path.dirname(__file__), '..')
COMMUNITY_JS = os.path.join(REPO_ROOT, 'assets', 'community.js')
OUTPUT_DIR = os.path.join(REPO_ROOT, 'community')
BASE_URL = 'https://www.readychinatravel.com'

TAG_STYLES = {
    'tip':  {'label': "KAT'S TIP",   'bg': 'var(--gold-soft)', 'color': 'var(--gold)',       'border': 'var(--gold-border)', 'icon': '💡'},
    'visa': {'label': 'VISA UPDATE', 'bg': 'var(--red-soft)',  'color': 'var(--accent)',     'border': 'var(--red-border)',  'icon': '🛂'},
    'news': {'label': 'CHINA NEWS',  'bg': 'var(--surface2)',  'color': 'var(--text-muted)', 'border': 'var(--border)',      'icon': '📰'},
}
CATEGORY_LABELS = {
    'lifehacks': "Kat's Hacks",
    'qa': 'Q&A',
    'news': 'China News',
}

EMOJI_PATTERN = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002600-\U000027BF"
    "\U0001F1E6-\U0001F1FF"
    "\U0000FE00-\U0000FE0F"   # variation selectors (e.g. the invisible tail of ☀️)
    "\U0000200D"              # zero-width joiner
    "]+",
    flags=re.UNICODE
)


def unescape_js_string(s):
    """Undo JS string escaping (\\' \\" \\\\) for text pulled out of a
    single/double-quoted JS string literal via regex."""
    return re.sub(r'\\(.)', r'\1', s)


def parse_posts(js_content):
    """Split the POSTS array into individual post blocks and extract fields."""
    match = re.search(r'const POSTS = \[(.*?)\n\];', js_content, re.DOTALL)
    if not match:
        raise ValueError("Could not find POSTS array in community.js")
    body = match.group(1)

    # Each post starts with a line containing "id: 'post-XXX',"
    blocks = re.split(r"(?=\{\s*\n\s*id: 'post-)", body)
    posts = []
    for block in blocks:
        if "id: 'post-" not in block:
            continue

        def field(pattern, required=True):
            m = re.search(pattern, block)
            if not m:
                if required:
                    raise ValueError(f"Missing required field, pattern={pattern}\nBlock:\n{block[:200]}")
                return None
            return m.group(1)

        post_id = field(r"id: 'post-(\d+)'")
        slug = field(r"slug: '([^']+)'")
        category = field(r"category: '([^']+)'")
        date = field(r"date: '([^']+)'")
        tag = field(r"tag: '([^']+)'")

        title_match = re.search(r"title: (['\"])((?:\\.|(?!\1).)*)\1", block)
        if not title_match:
            raise ValueError(f"Missing title in block for post-{post_id}")
        title = unescape_js_string(title_match.group(2))

        body_match = re.search(r"body: `([\s\S]*?)`\s*\n?\s*\}", block)
        if not body_match:
            raise ValueError(f"Missing body in block for post-{post_id}")
        post_body = body_match.group(1)

        posts.append({
            'id': f'post-{post_id}',
            'slug': slug,
            'category': category,
            'date': date,
            'tag': tag,
            'title': title,
            'body': post_body,
        })

    return posts


def clean_title(raw_title, category):
    """Strip leading emoji, and — only for Q&A posts — the trailing
    '— Name' / '--Name' attribution. Restricted to category=='qa'
    because that's the only category using this pattern; stripping it
    generally causes false positives (e.g. 'for June–August' looking
    like a '— August' attribution)."""
    t = EMOJI_PATTERN.sub('', raw_title).strip()
    if category == 'qa':
        t = re.sub(r'\s*[-–—]{1,2}\s*[A-Z][a-zA-Z]*\s*$', '', t).strip()
    return t


def meta_description(body_text, limit=155):
    plain = re.sub(r'<[^>]+>', '', body_text)
    plain = re.sub(r'\s+', ' ', plain).strip()
    if len(plain) <= limit:
        return plain
    cut = plain[:limit].rsplit(' ', 1)[0]
    return cut + '…'


def render_page(post):
    tag_info = TAG_STYLES.get(post['tag'], TAG_STYLES['news'])
    cat_label = CATEGORY_LABELS.get(post['category'], 'Community')
    title = clean_title(post['title'], post['category'])
    title_esc = html.escape(title, quote=True)
    desc = meta_description(post['body'])
    desc_esc = html.escape(desc, quote=True)
    url = f"{BASE_URL}/community/{post['slug']}"

    tag_badge = (
        f'<span style="background:{tag_info["bg"]};color:{tag_info["color"]};'
        f'border:1px solid {tag_info["border"]};font-size:11px;font-weight:700;'
        f'letter-spacing:1px;padding:4px 10px;border-radius:8px">{tag_info["label"]}</span>'
    )

    post_id = post['id']
    # Reaction buttons — identical markup/ids/onclick to the ones community.js
    # renders on the card, so the same commReact()/Firebase logic drives both
    # with zero duplicated reaction code. Counts start blank; community.js
    # fills them in from Firebase/localStorage once it loads (see scripts
    # near the closing </body> below).
    reactions_html = f"""
<div class="comm-reactions" style="margin-bottom:32px">
  <button class="comm-react-btn" id="rb-{post_id}-helpful" onclick="commReact('{post_id}','helpful')">
    👍 <span class="comm-react-label">Helpful</span>
    <span class="comm-react-count" id="r-{post_id}-helpful"></span>
  </button>
  <button class="comm-react-btn" id="rb-{post_id}-nope" onclick="commReact('{post_id}','nope')">
    👎 <span class="comm-react-label">Not Helpful</span>
    <span class="comm-react-count" id="r-{post_id}-nope"></span>
  </button>
  <button class="comm-react-btn" id="rb-{post_id}-confused" onclick="commReact('{post_id}','confused')">
    ❓ <span class="comm-react-label">Confused</span>
    <span class="comm-react-count" id="r-{post_id}-confused"></span>
  </button>
</div>"""

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title_esc} | Ready? China!</title>
<meta name="description" content="{desc_esc}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{title_esc} | Ready? China!">
<meta property="og:description" content="{desc_esc}">
<meta property="og:type" content="article">
<meta property="og:url" content="{url}">
<script src="../assets/consent-gate.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/style.css">
<link rel="stylesheet" href="../assets/guide.css">
</head>
<body>
<header id="site-header"></header>
<main>
<div class="guide-wrap">

<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="../">Home</a><span class="breadcrumb-sep">›</span>
  <a href="../community.html">Community</a><span class="breadcrumb-sep">›</span>
  <span class="breadcrumb-current">{title_esc}</span>
</nav>

<div class="guide-hero">
  <div class="guide-hero-icon">{tag_info['icon']}</div>
  <div>
    <div class="guide-hero-eyebrow">{cat_label} · Community</div>
    <h1>{title_esc}</h1>
    <div class="guide-meta">
      <span>📅 {post['date']}</span>
      {tag_badge}
    </div>
  </div>
</div>

<article style="font-size:15px;line-height:1.9;color:var(--text-mid);white-space:pre-line;margin-bottom:24px">{post['body']}</article>
{reactions_html}
<div class="callout callout-tip">
  <div class="callout-label">💬 Got a question of your own?</div>
  Kat answers new questions every week on the <a href="../community.html" style="color:var(--gold)">Community page</a> — search, browse by topic, or leave your email to get notified about new posts.
</div>

<section class="related-guides">
  <h3>Next Steps →</h3>
  <div class="related-grid">
    <a href="../community.html" class="related-card">
      <div class="related-card-icon">🏮</div>
      <div class="related-card-title">All Community Posts</div>
      <div class="related-card-desc">Browse every tip, Q&amp;A, and news update</div>
    </a>
    <a href="../visa" class="related-card">
      <div class="related-card-icon">🛂</div>
      <div class="related-card-title">Visa Guide</div>
      <div class="related-card-desc">Check if you need a visa for China</div>
    </a>
    <a href="../guides.html" class="related-card">
      <div class="related-card-icon">📚</div>
      <div class="related-card-title">All Guides</div>
      <div class="related-card-desc">Everything you need before and after you land</div>
    </a>
  </div>
</section>

</div>
</main>
<footer id="site-footer"></footer>

<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"></script>
<script src="../assets/community.js"></script>

<script src="../assets/nav.js"></script>
<script>buildNav('../');</script>
</body>
</html>
"""


def main():
    with open(COMMUNITY_JS, 'r', encoding='utf-8') as f:
        js_content = f.read()

    posts = parse_posts(js_content)
    print(f"Parsed {len(posts)} posts from community.js")

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    seen_slugs = set()
    for post in posts:
        if post['slug'] in seen_slugs:
            raise ValueError(f"Duplicate slug detected: {post['slug']}")
        seen_slugs.add(post['slug'])

        html_out = render_page(post)
        out_path = os.path.join(OUTPUT_DIR, f"{post['slug']}.html")
        with open(out_path, 'w', encoding='utf-8') as f:
            f.write(html_out)
        print(f"  wrote community/{post['slug']}.html  ({post['id']})")

    print(f"\nDone — {len(posts)} pages generated in /community/")


if __name__ == '__main__':
    main()
