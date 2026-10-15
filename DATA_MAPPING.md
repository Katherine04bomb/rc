# Ready? China! 数据来源对照表

> 目的：改内容时知道要同步改哪些文件，避免"首页显示旧文案、内页显示新文案"这种自相矛盾。

---

## 一、城市数据

### 1. `data/cities.json` —— 前端运行时用的"轻量索引"

- **谁读它**：`assets/map.js`（地图 pin / vibe 筛选）、首页城市卡片、`assets/search.js`（搜索索引也会间接用到）
- **包含字段**：
  ```
  emoji, nameZh, nameEn, difficulty, days, bestFor, tags,
  attractions, photos, x, y, provinceId, interests
  ```
- **什么时候改**：
  - 新增 / 删除城市
  - 修改城市在地图上的坐标 `x, y`
  - 修改城市隶属的省份 `provinceId`
  - 修改 vibe 标签 `interests`（必须与 `assets/map.js` 里的 `FILTERS` 数组的 `key` 对应）
  - 修改城市一句话简介 `bestFor`、建议天数 `days`、难度 `difficulty`
  - 修改城市封面图 `photos`（会影响首页卡片和地图抽屉）

### 2. `_builder/data_a.py` + `_builder/data_b.py` —— 城市指南页的"完整内容源"

- **谁读它**：页面生成器（大概率是 `generator.py` 或类似脚本），用来生成 `guides/城市名.html`
- **data_a.py 包含城市**：Shanghai、Xi'an、Chengdu、Chongqing、Guilin、Hangzhou、Quanzhou、Dunhuang
- **data_b.py 包含城市**：Kashgar、Lijiang、Ordos、Pingwu Baima、Changxing、Hengqin、Yiwu、Zhangjiajie
- **字段远多于 cities.json**：
  ```
  file, title, meta, zh, en, emoji, sub, meta_tags,
  hero_bg, hero_grad, why_emoji, why,
  top5[], stay[], eat[], tips[], related[]
  ```
- **什么时候改**：
  - 修改城市指南页的任何正文（Why go、Top 5、住宿、美食、贴士）
  - 修改页面 `<title>` / `meta description`
  - 修改 `related` 底部推荐城市

### 3. 城市数据同步规则

| 你改的是 | 还要同步改 | 原因 |
|---|---|---|
| `data/cities.json` 里的 `nameEn` / `nameZh` / `emoji` | 对应 `_builder/data_a.py` 或 `data_b.py` 里的 `en` / `zh` / `emoji` | 同一个城市不能叫两个名字 |
| `data/cities.json` 里的 `bestFor` | 对应 Python 文件里的 `sub` | 首页简介和城市页副标题应一致 |
| `data/cities.json` 里的 `days` / `difficulty` | 对应 Python 文件里的 `meta_tags` | 星级和天数不能打架 |
| `data/cities.json` 里的 `attractions` | 对应 Python 文件里的 `top5[].title` | 首页"Top 5"和城市页 Top 5 列表是同一组内容 |
| `data/cities.json` 里的 `photos[].src` | 可考虑同步到 Python 文件里的 `hero_bg` 或 `top5[].img` | 视觉素材保持一致 |
| `_builder/data_a.py` 或 `data_b.py` 里的城市字段 | 检查 `data/cities.json` 是否需要同步 | 同上，反向检查 |

### 4. 新增城市的正确流程

1. 在 `_builder/data_a.py` 或 `data_b.py` 里新增完整城市字典
2. 运行页面生成脚本（通常是 `python _builder/generator.py` 或 `build_all.py`）生成 `guides/城市名.html`
3. 在 `data/cities.json` 里新增对应轻量条目（x, y, provinceId, interests 必须填）
4. 运行 `python _builder/build_all.py` 更新 sitemap 和搜索索引
5. git add / commit / push

---

## 二、社区文章

### 1. `assets/community.js` —— 社区文章元数据索引

- 包含每篇社区文章的 `slug`、`title`、`category`、`emoji`、`summary` 等
- 首页社区卡片区读取它来渲染卡片

### 2. `community/*.html` —— 实际文章页面

- 由 `_builder/community_generator.py` 根据 `assets/community.js` 生成

### 3. 同步规则

| 你改的是 | 还要同步改 | 原因 |
|---|---|---|
| `assets/community.js` 里新增 / 删除 / 改摘要 | 必须运行 `python _builder/community_generator.py` 重新生成对应 HTML | 否则文章页和列表页不同步 |
| 直接改 `community/*.html` 正文 | 也要改 `assets/community.js` 里的摘要 / 标题（如果变了） | 列表页显示的是 JS 里的元数据 |
| 改完社区内容 | 运行 `python _builder/build_all.py` 更新 sitemap 和搜索索引 | 让 Google 和站内搜索知道 |

---

## 三、问答游戏

### `play/quiz-data.js` —— 独立题库

- **重要：它和城市数据、社区数据没有自动同步关系。**
- 所有题目直接写死在这个文件里，按 `easy` / `medium` / `hard` 分组。
- 如果你在 `data/cities.json` 或城市指南里改了某个事实（比如"熊猫基地几点开门"），**不会**自动反映到 quiz 里。
- 同步规则：改完城市/文化类事实后，手动检查 quiz-data.js 里相关题目是否需更新。

---

## 四、导航 / 全局组件

### `assets/nav.js`

- 顶部导航条由它生成。
- 如果你新增了一个顶层页面或分类，需要在这里的 `PREPARE_ITEMS`、`KNOW_ITEMS`、`SERVICES_ITEMS` 等数组里加链接。

### `assets/ui.js`

- 全局函数：`toggleMenu`、`openModal`、`scrollToSection` 等。
- 所有页面都依赖它，通常不需要改。

---

## 五、构建产物（不要手动改，让脚本生成）

| 文件 | 生成方式 | 说明 |
|---|---|---|
| `sitemap.xml` | `_builder/build_all.py` | 扫描全站 HTML 自动生成 |
| `search-index.json` | `_builder/build_search_index.py`（由 `build_all.py` 调用） | 站内搜索索引 |
| `guides.html` 城市卡片 | `_builder/build_all.py` 里的 `sync_guide_cards()` | 根据 `cities.json` 自动补卡片 |

**原则**：每次改完内容，运行一次 `python _builder/build_all.py`，然后 git commit push。不要手改这三个文件。

---

## 六、快速检查清单

改内容前问自己三个问题：

1. **这条信息在运行时 JSON（`data/cities.json`、`assets/community.js`）里有没有？**
2. **这条信息在生成器数据源（`data_a.py`、`data_b.py`）里有没有？**
3. **这条信息在 sitemap / 搜索索引里需要更新吗？**

如果答案有 2 个及以上"有"，就必须同步改，否则一定会出现前后端不一致。
