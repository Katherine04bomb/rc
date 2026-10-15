# 图片压缩指南

> 目标：把 `favicon.png` 从 1.28MB 压到 <50KB，把 `assets/kat/` 里 10 张插画从 11MB 压到 2MB 以内。

---

## 一、工具

用 **Squoosh**（Google 出的免费在线压缩工具）：
https://squoosh.app

不需要注册，直接拖图片进去，调参数，下载。

---

## 二、Favicon 压缩（5 分钟）

favicon 就是浏览器标签页上的小图标。现在它 1.28MB，但屏幕上只显示 16×16 到 32×32 像素。

### 步骤

1. 打开 https://squoosh.app
2. 把 `favicon.png` 拖进去
3. 右侧设置：
   - **Resize**：勾选，Width 填 `512`
   - **Format**：选 `PNG`（favicon 用 PNG 兼容性最好）
   - **Quality**：80（如果还是大，降到 70）
4. 左下角看文件大小，目标是 **<50KB**， ideally <20KB
5. 点右下角下载，替换仓库根目录的 `favicon.png`
6. git add / commit / push

### 进阶（可选）

如果还想支持老浏览器，可以把 favicon 转成 `.ico` 多尺寸格式：
- 用 https://favicon.io 或 https://realfavicongenerator.net
- 上传压好的 PNG，下载 `.ico` 和全套图标
- 替换 `favicon.png`，并在 HTML `<head>` 里加 `<link rel="icon" type="image/x-icon" href="/favicon.ico">`

---

## 三、Kat 插画批量压缩（15 分钟）

`assets/kat/` 下的插画是插画风格，**不适合用 PNG，适合用 WebP**。WebP 通常能比 PNG 小 70–80%，肉眼基本看不出区别。

### 推荐做法

#### 方案 A：一张一张用 Squoosh（最稳，推荐先压 1 张看效果）

1. 打开 https://squoosh.app
2. 拖一张 `assets/kat/` 里的图，比如 `kat-computer.png`
3. 右侧设置：
   - **Resize**：根据用途调整。如果这张图在页面里最大显示 400px 宽，就把 Width 改成 `800`（留 2 倍高清屏余量）
   - **Format**：选 `WebP`
   - **Quality**：80
   - **Effort**：75（默认即可）
4. 下载，文件名改成 `.webp`，比如 `kat-computer.webp`
5. 把仓库里原来的 `.png` 删掉，换成 `.webp`
6. 在引用这张图的 HTML / CSS / JS 里，把 `.png` 改成 `.webp`
7. 重复 10 次

#### 方案 B：用命令行批量转（如果你装了 Python + Pillow）

在仓库根目录运行：

```bash
# 先安装 Pillow
pip install Pillow

# 然后运行这个脚本
python compress_kat.py
```

脚本 `compress_kat.py` 内容如下：

```python
from PIL import Image
import os

src_dir = 'assets/kat'
max_width = 800  # 根据实际显示尺寸调整

for fn in os.listdir(src_dir):
    if not fn.lower().endswith('.png'):
        continue
    path = os.path.join(src_dir, fn)
    img = Image.open(path)
    # 等比缩放
    w, h = img.size
    if w > max_width:
        ratio = max_width / w
        img = img.resize((max_width, int(h * ratio)), Image.LANCZOS)
    # 转 WebP
    out_fn = os.path.splitext(fn)[0] + '.webp'
    out_path = os.path.join(src_dir, out_fn)
    img.save(out_path, 'WEBP', quality=80, method=6)
    old = os.path.getsize(path)
    new = os.path.getsize(out_path)
    print(f"{fn}: {old/1024:.1f}KB -> {out_fn}: {new/1024:.1f}KB ({new/old*100:.0f}%)")
```

运行后：
1. 检查每张 `.webp` 是否正常
2. 删掉原来的 `.png`
3. 批量替换代码里的 `.png` 引用为 `.webp`（可用 VS Code 全局查找替换）

---

## 四、懒加载（锦上添花，不是必须）

现在用户打开首页，浏览器会下载所有图片，包括还没滚到的。加懒加载后，图片只在滚动到附近时才下载。

### 做法

在所有 `<img>` 标签里加：

```html
<img src="assets/kat/kat-computer.webp" loading="lazy" alt="...">
```

`loading="lazy"` 是现代浏览器的原生属性，不需要额外 JS。

**但注意**：首屏第一张图（比如 hero 背景）不要加 lazy，否则首屏会空白。

---

## 五、检查清单

- [ ] `favicon.png` <50KB
- [ ] `assets/kat/` 总大小 <2MB
- [ ] 所有 `.png` 引用已改成 `.webp`
- [ ] 首屏关键图片没有加 `loading="lazy"`
- [ ] 在浏览器 DevTools 的 Network 面板刷新首页，确认总传输大小从 10MB+ 降到 2–3MB

---

## 六、预期效果

| 项目 | 现在 | 目标 |
|---|---|---|
| favicon | 1.28MB | <50KB |
| assets/kat/ | ~11MB | ~2MB |
| 首页总下载 | ~15MB+ | ~3MB |
| 机场 WiFi 打开时间 | 10–20 秒 | 3 秒内 |
