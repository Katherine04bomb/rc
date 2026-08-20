#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_all.py — Ready? China! 一键构建脚本（日常维护入口）

每次改完网站内容（加城市 / 加帖子 / 改正文）之后，跑这一个命令即可：

    python _builder/build_all.py

它会自动完成：
  1. 重新生成 sitemap.xml     —— 扫描全站真实存在的 HTML 页面，缺的补上、
                                  错的修正、已删除的移除
  2. 同步 guides.html 城市卡片 —— 发现 guides/ 里有城市页但目录页没卡片的，
                                  自动按 cities.json 数据补一张卡片
  3. 重建搜索索引              —— 调用 build_search_index.py
  4. 体检报告                  —— 列出缺地图坐标 / 缺卡片 / 缺 HTML 的帖子等问题

注意：本脚本不负责【生成城市页】和【生成社区帖 HTML】。
  - 新城市页：     先把 guides/xxx.html 写好，再跑本脚本
  - 新社区帖：     先在 assets/community.js 加帖子，再跑
                   python _builder/community_generator.py 生成 HTML，
                   然后跑本脚本收尾
"""

import html
import json
import os
import re
import subprocess
import sys
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://www.readychinatravel.com/'
TODAY = date.today().isoformat()

SKIP_DIRS = {'_builder', '.git', 'node_modules'}


# ---------------------------------------------------------------- helpers

def find_html_pages():
    """扫描全站，返回相对 URL 列表（index.html 归一化为目录形式）。"""
    urls = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if not fn.endswith('.html') or fn == '404.html':
                continue
            rel = os.path.relpath(os.path.join(dirpath, fn), ROOT).replace(os.sep, '/')
            if rel == 'index.html':
                urls.append('')
            elif fn == 'index.html':
                urls.append(rel[:-len('index.html')])   # alipay/index.html -> alipay/
            else:
                urls.append(rel)
    return urls


def write_sitemap(urls):
    """按现有格式重新生成 sitemap.xml。"""
    def sort_key(u):
        if u == '':
            return (0, '')
        if '/' not in u:
            return (1, u)
        return (2, u)

    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in sorted(urls, key=sort_key):
        lines.append('  <url>')
        lines.append('    <loc>' + BASE + u + '</loc>')
        lines.append('    <lastmod>' + TODAY + '</lastmod>')
        lines.append('  </url>')
    lines.append('</urlset>')
    path = os.path.join(ROOT, 'sitemap.xml')
    with open(path, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(lines) + '\n')
    return len(urls)


def sync_guide_cards(cities):
    """把 cities.json 里有、guides.html 里没有的城市卡片自动补上。"""
    guides_html = os.path.join(ROOT, 'guides.html')
    with open(guides_html, encoding='utf-8') as f:
        content = f.read()

    existing = set(re.findall(r'href="guides/([a-z0-9-]+)\.html"', content))
    on_disk = {fn[:-5] for fn in os.listdir(os.path.join(ROOT, 'guides'))
               if fn.endswith('.html')}

    def slug(name):
        return name.lower().replace("'", '').replace(' ', '-')

    missing = []
    for c in cities:
        s = slug(c['nameEn'])
        if s in on_disk and s not in existing:
            missing.append((s, c))

    if not missing:
        return 0

    card_tpl = (
        '      <article class="guide-card" data-category="city">\n'
        '        <a href="guides/{slug}.html" class="guide-card-link">\n'
        '          <div class="guide-card-meta">\n'
        '            <span class="guide-card-tag">City</span>\n'
        '            <span class="guide-card-time">{days}</span>\n'
        '          </div>\n'
        '          <h3 class="guide-card-title">{name}</h3>\n'
        '          <p class="guide-card-desc">{desc} &mdash; difficulty {diff}</p>\n'
        '          <span class="guide-card-cta">Read more &rarr;</span>\n'
        '        </a>\n'
        '      </article>\n'
    )
    blocks = []
    for s, c in missing:
        desc = html.escape(c.get('bestFor') or c.get('nameZh') or s, quote=False)
        blocks.append(card_tpl.format(
            slug=s, days=html.escape(c.get('days') or '', quote=False),
            name=html.escape(c['nameEn'], quote=False), desc=desc,
            diff=html.escape(c.get('difficulty') or '', quote=False)))
    new_cards = '\n'.join(blocks)

    # 插到最后一张城市卡片后面；找不到就插到最后一张卡片后面
    card_re = re.compile(r'      <article class="guide-card" data-category="city">.*?</article>\n',
                         re.DOTALL)
    matches = list(card_re.finditer(content))
    if matches:
        pos = matches[-1].end()
        content = content[:pos] + new_cards + content[pos:]
    else:
        generic = list(re.finditer(r'      <article class="guide-card">.*?</article>\n',
                                   content, re.DOTALL))
        if generic:
            pos = generic[-1].end()
            content = content[:pos] + new_cards + content[pos:]
        else:
            print('  ! guides.html 里找不到卡片区块，跳过卡片同步')
            return 0

    with open(guides_html, 'w', encoding='utf-8', newline='\n') as f:
        f.write(content)
    return len(missing)


def rebuild_search_index():
    script = os.path.join(ROOT, '_builder', 'build_search_index.py')
    r = subprocess.run([sys.executable, script], capture_output=True, text=True)
    ok = r.returncode == 0
    print('  搜索索引: ' + ('已重建' if ok else '构建失败!'))
    if not ok:
        print(r.stdout[-500:], r.stderr[-500:])
    return ok


def health_report(cities, urls):
    problems = 0

    no_xy = [c['nameEn'] for c in cities if c.get('x') is None or c.get('y') is None]
    no_int = [c['nameEn'] for c in cities if not c.get('interests')]
    no_prov = [c['nameEn'] for c in cities if not c.get('provinceId')]
    if no_xy:
        problems += 1
        print('  [!] 缺地图坐标 x/y（地图上不会有 pin）: ' + ', '.join(no_xy))
    if no_int:
        problems += 1
        print('  [!] 缺 interests（地图 vibe 筛选不生效）: ' + ', '.join(no_int))
    if no_prov:
        problems += 1
        print('  [!] 缺 provinceId（地图省份不高亮）: ' + ', '.join(no_prov))

    # community.js 里有帖子但没有对应 HTML
    cj = os.path.join(ROOT, 'assets', 'community.js')
    with open(cj, encoding='utf-8') as f:
        js = f.read()
    slugs = set(re.findall(r"slug:\s*'([^']+)'", js))
    have_html = {fn[:-5] for fn in os.listdir(os.path.join(ROOT, 'community'))
                 if fn.endswith('.html')}
    no_html = sorted(s for s in slugs - have_html if 'short-readable' not in s)
    if no_html:
        problems += 1
        print('  [!] 这些帖子在 community.js 里但没生成 HTML（先跑 '
              'python _builder/community_generator.py）: ' + ', '.join(no_html))

    # guides/ 页面没进 cities.json
    def slug(name):
        return name.lower().replace("'", '').replace(' ', '-')
    json_slugs = {slug(c['nameEn']) for c in cities}
    on_disk = {fn[:-5] for fn in os.listdir(os.path.join(ROOT, 'guides'))
               if fn.endswith('.html')}
    orphans = sorted(on_disk - json_slugs)
    if orphans:
        problems += 1
        print('  [!] guides/ 里有页面但 cities.json 没有数据（跑 '
              'python _builder/add_city.py guides/xxx.html）: ' + ', '.join(orphans))

    if problems == 0:
        print('  一切正常，没有发现问题。')
    return problems


# ---------------------------------------------------------------- main

def main():
    print('== build_all 开始 ==')
    print()

    print('[1/4] 重新生成 sitemap.xml')
    urls = find_html_pages()
    n = write_sitemap(urls)
    print('  已写入 %d 个 URL -> sitemap.xml' % n)

    print('[2/4] 同步 guides.html 城市卡片')
    with open(os.path.join(ROOT, 'data', 'cities.json'), encoding='utf-8') as f:
        cities = json.load(f)
    added = sync_guide_cards(cities)
    print('  新增 %d 张城市卡片（详见 git diff guides.html）' % added if added
          else '  无缺失卡片')

    print('[3/4] 重建搜索索引')
    rebuild_search_index()

    print('[4/4] 体检报告')
    health_report(cities, urls)

    print()
    print('== 完成 == 接下来: git add . && git commit -m "..." && git push')


if __name__ == '__main__':
    main()
