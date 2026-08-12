READY? CHINA! - Migration package (2026-08-12)
=====================================================

WHAT THIS ZIP CONTAINS
----------------------
guides/*.html          17 city guide pages (beijing + 16 regenerated cities)
assets/city-guide.css  NEW stylesheet used ONLY by the 17 guide pages
_builder/              dev tools for regenerating / checking the pages

HOW TO APPLY ON YOUR NEW COMPUTER
---------------------------------
1. Unzip this file at the ROOT of your real site directory, e.g.:
       D:/readychina3/          (or wherever your site lives)
   It will OVERWRITE guides/*.html and add assets/city-guide.css.
2. Do NOT delete or overwrite assets/guide.css - other pages
   (alipay, wechat, metro-guide, food-guide ...) still use it.
3. Open a couple of pages locally (e.g. guides/shanghai.html) to verify.

HOW TO EDIT CITY CONTENT LATER
------------------------------
1. Edit _builder/data_a.py or _builder/data_b.py (city text data).
2. Run:  python _builder/generator.py
   It writes the 16 cities back into ../guides/ automatically.
   (beijing.html is the hand-crafted template - edit it directly.)
3. Sanity check:  python _builder/verify_cities.py
                  python _builder/check_links.py

NOTE: images are Cloudinary URLs - no local image files are needed.
      _builder/ is a dev folder; you may keep it outside the published
      site folder if you prefer (just keep generator.py + data_*.py
      together).
