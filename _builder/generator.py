import os
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""V4 city guide generator — renders each city page from data dicts using the
approved beijing.html template structure (Why / Top5 modal / Stay districts /
Eat photos / SEO hidden blocks / header / Back button)."""
import json, os, re

GUIDES = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "guides")
BASE = "https://www.readychinatravel.com/guides/"

HEADER = """<!-- HEADER — shared component, built by assets/nav.js (buildNav)
     so this template never needs to be hand-edited again for nav changes -->
<header id="site-header"></header>
<script src="../assets/nav.js"></script>
<script>buildNav();</script>"""

MODAL_JS = """<!-- Attraction modal (single shared dialog; content cloned from hidden SEO articles on click) -->
<div class="attr-modal" id="attrModal" hidden role="dialog" aria-modal="true" aria-labelledby="attrModalTitle">
  <div class="attr-modal-backdrop" data-close></div>
  <div class="attr-modal-box" role="document">
    <button class="attr-modal-close" type="button" aria-label="Close" data-close>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="attr-modal-img-wrap">
      <img class="attr-modal-img" src="" alt="">
    </div>
    <div class="attr-modal-body">
      <span class="attr-modal-tag"></span>
      <h3 id="attrModalTitle" class="attr-modal-title"></h3>
      <div class="attr-modal-sections"></div>
    </div>
  </div>
</div>

<script>
(function() {
  var modal = document.getElementById('attrModal');
  if (!modal) return;
  var boxImg = modal.querySelector('.attr-modal-img');
  var imgWrap = modal.querySelector('.attr-modal-img-wrap');
  var tagEl = modal.querySelector('.attr-modal-tag');
  var titleEl = document.getElementById('attrModalTitle');
  var sectionsEl = modal.querySelector('.attr-modal-sections');
  var boxEl = modal.querySelector('.attr-modal-box');
  var lastFocus = null;

  function open(key) {
    var tpl = document.getElementById('tpl-' + key);
    if (!tpl) return;
    var data = tpl.querySelector('.attraction-modal-data');
    if (!data) return;
    var src = data.getAttribute('data-img') || '';
    if (src) {
      boxImg.src = src;
      boxImg.alt = data.getAttribute('data-title') || '';
      imgWrap.style.display = '';
    } else {
      imgWrap.style.display = 'none';
      boxImg.src = '';
    }
    tagEl.textContent = data.getAttribute('data-tag') || '';
    titleEl.textContent = data.getAttribute('data-title') || '';
    sectionsEl.innerHTML = '';
    data.querySelectorAll('p').forEach(function(p) {
      sectionsEl.appendChild(p.cloneNode(true));
    });
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.documentElement.classList.add('attr-modal-open');
    setTimeout(function() {
      var closeBtn = modal.querySelector('.attr-modal-close');
      if (closeBtn) closeBtn.focus();
    }, 50);
    document.addEventListener('keydown', onKey);
  }
  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.documentElement.classList.remove('attr-modal-open');
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') { close(); }
    if (e.key === 'Tab') {
      var focusable = boxEl.querySelectorAll('button, [href], a, [tabindex]:not([tabindex="-1"])');
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  document.querySelectorAll('.attraction-tile').forEach(function(btn) {
    btn.addEventListener('click', function() { open(btn.getAttribute('data-tpl')); });
  });
  modal.querySelectorAll('[data-close]').forEach(function(el) {
    el.addEventListener('click', close);
  });
})();
</script>"""

EYE_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>'

def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def render_hero(d):
    if d.get("hero_bg"):
        bg = "linear-gradient(180deg, rgba(0,0,0,0.15) 0%%, rgba(0,0,0,0.55) 100%%), url('%s')" % d["hero_bg"]
    else:
        bg = d.get("hero_grad", "linear-gradient(135deg, #1e3c34 0%, #3a6b55 100%)")
    meta = "".join('<span class="hero-meta-tag">%s</span>' % esc(m) for m in d["meta_tags"])
    return """  <!-- HERO BANNER -->
  <div class="guide-hero-banner" style="background-image: %s">
    <a href="../index.html#cities-section" class="hero-back-btn">\u2190 Back</a>
    <div class="hero-banner-content">
      <div class="hero-city-emoji">%s</div>
      <div class="hero-city-zh">%s</div>
      <h1 class="hero-city-en">%s</h1>
      <p class="hero-city-sub">%s</p>
      <div class="hero-city-meta">
        %s
      </div>
    </div>
  </div>""" % (bg, d["emoji"], d["zh"], d["en"], esc(d["sub"]), meta)

def render_tiles(d):
    tiles = []
    for i, a in enumerate(d["top5"], 1):
        if a.get("img"):
            img_block = '<img src="%s" alt="%s" loading="lazy">' % (a["img"], esc(a.get("alt", a["title"])))
        else:
            img_block = '<span class="ph-emoji">%s</span><span class="ph-label">Add %s photo</span>' % (a.get("ph_emoji", d["emoji"]), esc(a.get("ph_label", a["title"])))
        img_class = 'attraction-tile-img' if a.get("img") else 'attraction-tile-img attraction-tile-img-placeholder'
        tiles.append("""    <button type="button" class="attraction-tile" data-tpl="%s">
      <span class="%s">
        %s
        <span class="attraction-tile-overlay">
          <span class="attraction-tile-cta">
            %s
            Read the story
          </span>
        </span>
        <span class="attraction-num">%d</span>
      </span>
      <span class="attraction-tile-meta">
        <span class="attraction-tile-title">%s</span>
        <span class="attraction-tag">%s</span>
      </span>
    </button>""" % (a["id"], img_class, img_block, EYE_SVG, i, a["title"], esc(a["tag"])))
    return '\n'.join(tiles)

def render_seo(d):
    blocks = []
    for a in d["top5"]:
        blocks.append("""  <div class="seo-hidden" id="tpl-%s" hidden>
    <article class="attraction-modal-data"
             data-img="%s"
             data-tag="%s"
             data-title="%s">
      <p><strong>The story:</strong> %s</p>
      <p><strong>Why it's a must-see:</strong> %s</p>
      <p class="attraction-tip"><strong>💡 Kat's tip:</strong> %s</p>
    </article>
  </div>""" % (a["id"], a.get("img", ""), esc(a["tag"]), esc(a["title"]), a["story"], a["why"], a["tip"]))
    return '\n'.join(blocks)

def render_stay(d):
    cards = []
    for s in d["stay"]:
        cards.append("""    <div class="district-card">
      <div class="district-head">
        <span class="district-name">%s</span>
        <span class="district-badge">%s</span>
      </div>
      <p class="district-desc">%s</p>
      <div class="district-meta">
        <span class="dm-item">🚇 %s</span>
        <span class="dm-item">🏛 %s</span>
      </div>
      <div class="district-hotel">%s</div>
    </div>""" % (s["name"], esc(s["badge"]), s["desc"], esc(s["metro"]), esc(s["landmark"]), esc(s["hotel"])))
    return '\n'.join(cards)

PH_CLASSES = ["ph-red","ph-orange","ph-teal","ph-navy","ph-crepe","ph-hotpot","ph-noodle","ph-gold"]
def render_eat(d):
    cards = []
    for i, f in enumerate(d["eat"]):
        if f.get("img"):
            photo = '<img src="%s" alt="%s" loading="lazy">' % (f["img"], esc(f.get("alt", f["name"])))
            ph_html = ""
        else:
            photo = ""
            ph_html = '<!-- PHOTO PLACEHOLDER: add a photo of %s here -->' % esc(f.get("zh", f["name"]))
            ph_html += '\n      <div class="food-photo food-photo-ph %s">\n        <span class="ph-emoji">%s</span>\n        <span class="ph-tag">Add photo</span>\n      </div>' % (PH_CLASSES[i % len(PH_CLASSES)], f.get("ph_emoji", "\U0001f35c"))
        if photo:
            photo = '<div class="food-photo">\n        ' + photo + '\n      </div>'
        cards.append("""    <div class="food-card">
      %s
      <div class="food-body">
        <div class="food-name">%s <span class="food-zh">%s</span></div>
        <p class="food-desc">%s</p>
        <div class="food-where">🍽 %s</div>
      </div>
    </div>""" % (ph_html, f["name"], f.get("zh",""), f["desc"], esc(f["where"])))
    return '\n'.join(cards)

def render_tips(d):
    out = []
    for t in d["tips"]:
        out.append('      <div class="callout callout-tip">\n      <div class="callout-label">Kat Says</div>\n      %s\n    </div>' % t)
    return '\n'.join(out)

def render_related(d):
    cards = []
    for r in d["related"]:
        if r.get("img"):
            img_style = "background-image:url('%s')" % r["img"]
        else:
            img_style = r.get("grad", "background:linear-gradient(135deg,#3a6b55,#1e3c34)")
        cards.append("""            <a href="./%s" class="related-card">
        <div class="related-card-img" style="%s">
          <span class="related-card-emoji">%s</span>
        </div>
        <div class="related-card-body">
          <div class="related-card-title">%s \u00b7 %s</div>
          <div class="related-card-desc">%s</div>
        </div>
      </a>""" % (r["file"], img_style, r["emoji"], r["zh"], r["en"], esc(r["desc"])))
    return '\n'.join(cards)

def render_city(d):
    meta = d["meta"]
    og_img = d.get("og_img") or d.get("hero_bg") or ""
    if og_img:
        og_img_line = '<meta property="og:image" content="%s">' % og_img
    else:
        og_img_line = ""
    html = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>%s</title>
<meta name="description" content="%s">
%s

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3G3C5T1WRB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3G3C5T1WRB');
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/style.css">
<link rel="stylesheet" href="../assets/city-guide.css">
  <link rel="canonical" href="%s">
  <meta property="og:title" content="%s">
  <meta property="og:description" content="%s">
  <meta property="og:type" content="article">
  <meta property="og:url" content="%s">
</head>
<body>

%s

<div class="guide-wrap">

%s

  <!-- WHY -->
  <h2 class="guide-section-title">\u2728 Why %s?</h2>
  <div class="why-beijing">
%s
    <!-- PHOTO PLACEHOLDER: replace this block with your favorite %s photo -->
    <div class="why-photo-placeholder">
      <span class="wpp-icon">%s</span>
      <span class="wpp-text">Your %s photo here</span>
      <span class="wpp-sub">Drop in your favorite shot of the city</span>
    </div>
  </div>

  <hr class="guide-section-divider">

  <!-- TOP 5 MUST-SEE (click photo for story) -->
  <h2 class="guide-section-title">🏛 Top 5 Must-See <span class="title-hint">click the photo to read the story</span></h2>

  <div class="attraction-tiles">

%s

  </div>

  <!-- SEO-safe hidden articles: text lives in normal HTML (Google indexes content in hidden/tab/accordion blocks), JS only clones it into the modal on click -->
%s

  <hr class="guide-section-divider">

  <!-- WHERE TO STAY (by district) -->
  <h2 class="guide-section-title">🛏 Where to Stay</h2>
  <p class="section-sub">Pick the right district and half your trip is planned. These are the bases locals actually recommend for visitors.</p>
  <div class="district-grid">

%s

  </div>

  <hr class="guide-section-divider">

  <!-- WHAT TO EAT (with photos) -->
  <h2 class="guide-section-title">🍜 What to Eat</h2>
  <div class="food-grid">

%s

  </div>

  <hr class="guide-section-divider">

  <!-- KAT'S TIPS -->
  <h2 class="guide-section-title">💡 Kat's Insider Tips</h2>
%s

  <hr class="guide-section-divider">

  <!-- RELATED CITIES -->
  <div class="related-guides">
    <h3>Explore More Cities</h3>
    <div class="related-grid">
%s

    </div>
  </div>

  <div style="text-align:center;margin-top:48px;padding-bottom:40px;">
    <a href="../index.html" class="guide-btn-primary">\u2190 Back to Ready? China!</a>
  </div>
</div>

%s

</body>
</html>""" % (
        d["title"], esc(meta), og_img_line, BASE + d["file"], d["title"], esc(meta), BASE + d["file"],
        HEADER,
        render_hero(d),
        d["en"], "\n    ".join("<p>%s</p>" % p for p in d["why"]), d["en"], d["why_emoji"], d["en"],
        render_tiles(d), render_seo(d), render_stay(d), render_eat(d), render_tips(d), render_related(d),
        MODAL_JS
    )
    return html

def main():
    import data_a, data_b
    cities = []
    for mod in (data_a, data_b):
        cities.extend(mod.CITIES)
    os.makedirs(GUIDES, exist_ok=True)
    for d in cities:
        out = render_city(d)
        path = os.path.join(GUIDES, d["file"])
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)
        print("WROTE %s (%d bytes)" % (d["file"], len(out)))

if __name__ == "__main__":
    main()
