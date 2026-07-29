// ============================================================
//  assets/map.js — Interactive China Map
//
//  Uses assets/china-Map.svg (pre-cropped viewBox, no internal
//  styles or text — map.js adds all labels and interactions).
//
//  HOW TO EDIT:
//  • Province tooltip text → edit desc in PROVINCE_MAP below
//  • Province label on map  → edit label field
//  • Section heading        → edit html string in loadMap()
//  DO NOT edit china-Map.svg path data.
//
//  REQUIRES: Live Server or any http server (fetch needs http)
// ============================================================

// ── TOOLTIP ─────────────────────────────────────────────────
function showTip(e, el) {
  const t = document.getElementById('prov-tip');
  document.getElementById('tip-zh').textContent   = el.dataset.zh   || '';
  document.getElementById('tip-en').textContent   = el.dataset.en   || '';
  document.getElementById('tip-desc').textContent = el.dataset.desc || '';
  t.style.display = 'block';
  moveTip(e);
}

function moveTip(e) {
  const t = document.getElementById('prov-tip');
  let x = e.clientX + 16, y = e.clientY - 10;
  if (x + 220 > window.innerWidth)  x = e.clientX - 225;
  if (y + 120 > window.innerHeight) y = e.clientY - 120;
  t.style.left = x + 'px';
  t.style.top  = y + 'px';
}

function hideTip() {
  document.getElementById('prov-tip').style.display = 'none';
}

// ── PROVINCE SELECT ──────────────────────────────────────────
let activeProv = null;

function selectProv(el) {
  if (activeProv) activeProv.classList.remove('active');
  if (activeProv === el) {
    activeProv = null;
    document.getElementById('map-pill').style.display = 'none';
    return;
  }
  el.classList.add('active');
  activeProv = el;
  document.getElementById('map-zh').textContent = el.dataset.zh;
  document.getElementById('map-en').textContent = el.dataset.en;
  document.getElementById('map-pill').style.display = 'inline-flex';
}

// ── PROVINCE DATA ────────────────────────────────────────────
// idx   = <path> index in china-Map.svg (0-based, do not change)
// lx/ly = label position (original SVG coordinate space)
// label = text shown on the map
const PROVINCE_MAP = [
  {idx:0,  id:'beijing',        zh:'北京', en:'Beijing',       lx:488, ly:143, label:'京',
   desc:"China's capital. Great Wall, Forbidden City, Tiananmen. Essential first stop."},
  {idx:1,  id:'tianjin',        zh:'天津', en:'Tianjin',       lx:500, ly:157, label:'津',
   desc:'Historic port city near Beijing. European architecture, famous Goubuli buns.'},
  {idx:2,  id:'hebei',          zh:'河北', en:'Hebei',         lx:476, ly:168, label:'河北',
   desc:'Surrounds Beijing & Tianjin. Chengde Summer Palace, Zhangjiakou ski mountains.'},
  {idx:3,  id:'shanxi',         zh:'山西', en:'Shanxi',        lx:449, ly:178, label:'山西',
   desc:'Ancient culture. Pingyao old city (UNESCO), Yungang Grottoes.'},
  {idx:4,  id:'inner-mongolia', zh:'内蒙古',en:'Inner Mongolia',lx:430, ly:102, label:'内蒙古',
   desc:'Vast steppes, nomadic culture, horse riding, incredible starry skies.'},
  {idx:5,  id:'liaoning',       zh:'辽宁', en:'Liaoning',      lx:546, ly:143, label:'辽宁',
   desc:"Dalian's coastline, Shenyang Imperial Palace. Gateway to Northeast China."},
  {idx:6,  id:'jilin',          zh:'吉林', en:'Jilin',         lx:575, ly:116, label:'吉林',
   desc:'Changchun & Jilin City. Ski resorts, rime ice scenery, Korean cultural heritage.'},
  {idx:7,  id:'heilongjiang',   zh:'黑龙江',en:'Heilongjiang',  lx:578, ly:65,  label:'黑龙江',
   desc:"China's northernmost province. Ice & Snow Festival, Siberian tigers, vast forests."},
  {idx:8,  id:'shanghai',       zh:'上海', en:'Shanghai',      lx:532, ly:230, label:'沪',
   desc:"China's global metropolis. Iconic Bund, world-class dining, fashion."},
  {idx:9,  id:'jiangsu',        zh:'江苏', en:'Jiangsu',       lx:513, ly:212, label:'江苏',
   desc:"Suzhou gardens, Nanjing history, water towns — China's Venice."},
  {idx:10, id:'zhejiang',       zh:'浙江', en:'Zhejiang',      lx:527, ly:246, label:'浙江',
   desc:"Hangzhou West Lake, tea culture, water towns. Alibaba's home."},
  {idx:11, id:'anhui',          zh:'安徽', en:'Anhui',         lx:499, ly:224, label:'安徽',
   desc:'Yellow Mountain (Huangshan) — the most photographed peak in China.'},
  {idx:12, id:'fujian',         zh:'福建', en:'Fujian',        lx:508, ly:273, label:'福建',
   desc:"Tea country, Tulou buildings, Quanzhou Maritime Silk Road. K's hometown!"},
  {idx:13, id:'jiangxi',        zh:'江西', en:'Jiangxi',       lx:487, ly:261, label:'江西',
   desc:'Jingdezhen porcelain, Lushan Mountain, Wuyuan golden fields.'},
  {idx:14, id:'shandong',       zh:'山东', en:'Shandong',      lx:511, ly:185, label:'山东',
   desc:'Birthplace of Confucius. Mount Tai, Qingdao beer, beautiful coastline.'},
  {idx:15, id:'henan',          zh:'河南', en:'Henan',         lx:475, ly:207, label:'河南',
   desc:'Heart of ancient China. Shaolin Temple, Longmen Grottoes, Yellow River.'},
  {idx:16, id:'hubei',          zh:'湖北', en:'Hubei',         lx:460, ly:232, label:'湖北',
   desc:'Three Gorges Dam, Wuhan, Yangtze River heartland.'},
  {idx:17, id:'hunan',          zh:'湖南', en:'Hunan',         lx:458, ly:263, label:'湖南',
   desc:"Avatar Mountains (Zhangjiajie), Mao's birthplace, fiercely spicy cuisine."},
  {idx:18, id:'guangdong',      zh:'广东', en:'Guangdong',     lx:480, ly:297, label:'广东',
   desc:'Shenzhen tech hub, Cantonese cuisine, Pearl River Delta, dim sum culture.'},
  {idx:19, id:'guangxi',        zh:'广西', en:'Guangxi',       lx:434, ly:290, label:'广西',
   desc:"Guilin's karst mountains & Li River cruise. Zhuang ethnic culture."},
  {idx:20, id:'hainan',         zh:'海南', en:'Hainan',        lx:448, ly:360, label:'海南',
   desc:"China's tropical paradise. Sanya beaches, palm trees, duty-free shopping."},
  {idx:21, id:'chongqing',      zh:'重庆', en:'Chongqing',     lx:428, ly:241, label:'渝',
   desc:'Mountain megacity. Hotpot capital, cyberpunk skyline, Three Gorges cruise.'},
  {idx:22, id:'sichuan',        zh:'四川', en:'Sichuan',       lx:393, ly:235, label:'四川',
   desc:'Panda paradise! Spicy food, Jiuzhaigou lakes, Leshan Giant Buddha.'},
  {idx:23, id:'guizhou',        zh:'贵州', en:'Guizhou',       lx:423, ly:266, label:'贵州',
   desc:'Hidden waterfalls, Huangguoshu Falls, Miao & Dong ethnic culture.'},
  {idx:24, id:'yunnan',         zh:'云南', en:'Yunnan',        lx:385, ly:278, label:'云南',
   desc:'Lijiang, Shangri-La, rice terraces, 25 ethnic groups. Backpacker paradise.'},
  {idx:25, id:'tibet',          zh:'西藏', en:'Tibet',         lx:291, ly:228, label:'西藏',
   desc:'Potala Palace, Mt. Everest Base Camp. The roof of the world.'},
  {idx:26, id:'shaanxi',        zh:'陕西', en:'Shaanxi',       lx:436, ly:195, label:'陕西',
   desc:"Terracotta Army, ancient Xi'an. The Silk Road begins here!"},
  {idx:27, id:'gansu',          zh:'甘肃', en:'Gansu',         lx:374, ly:165, label:'甘肃',
   desc:'Silk Road corridor. Dunhuang Mogao Caves, Rainbow Mountains, Jiayuguan Fort.'},
  {idx:28, id:'qinghai',        zh:'青海', en:'Qinghai',       lx:342, ly:196, label:'青海',
   desc:'Qinghai Lake, Tibetan plateau, breathtaking high-altitude scenery.'},
  {idx:29, id:'ningxia',        zh:'宁夏', en:'Ningxia',       lx:422, ly:178, label:'宁',
   desc:'Desert meets oasis. Shapotou sand dunes, Hui Muslim culture.'},
  {idx:30, id:'xinjiang',       zh:'新疆', en:'Xinjiang',      lx:252, ly:142, label:'新疆',
   desc:"China's largest region. Taklamakan Desert, Silk Road oases, Kashgar bazaar."},
];

// ── MAP LOADER ────────────────────────────────────────────────
function loadMap() {

  const html = `
  <section class="map-section-wrap" id="map-section">
    <div class="map-container">
      <div class="section-eyebrow" style="text-align:center">Explore · 探索中国</div>
      <h2 class="section-title" style="text-align:center">Click any province to learn more</h2>
      <p class="section-sub" style="text-align:center;margin-bottom:0">
        All 31 provinces — hover for a preview, click to light it up
      </p>
      <div id="china-map-svg-wrap">
        <div id="map-loading" style="text-align:center;padding:60px;color:var(--text-muted);font-size:13px">
          Loading map…
        </div>
      </div>
      <div id="map-active-strip" style="margin-top:12px">
        <div id="map-pill" class="map-pill" style="display:none">
          <span class="map-pill-zh" id="map-zh"></span>
          <span class="map-pill-en" id="map-en"></span>
          <span class="map-pill-btn" onclick="scrollToSection('cities-section')">→ See city guide</span>
        </div>
      </div>
    </div>
  </section>`;

  document.getElementById('map-container').innerHTML = html;

  fetch('assets/china-Map.svg')
    .then(r => {
      if (!r.ok) throw new Error('SVG fetch failed ' + r.status);
      return r.text();
    })
    .then(svgText => {
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
      const svgEl  = svgDoc.querySelector('svg');

      // Remove any leftover style/text nodes (pre-cropped SVG is already clean,
      // this is just a safety net)
      svgDoc.querySelectorAll('style, text').forEach(n => n.remove());

      const allPaths = Array.from(svgEl.querySelectorAll('path'));

      // ── Annotate interactive provinces ──────────────────
      PROVINCE_MAP.forEach(p => {
        const path = allPaths[p.idx];
        if (!path) return;
        path.setAttribute('id',           p.id);
        path.setAttribute('class',        'province');
        path.setAttribute('data-zh',      p.zh);
        path.setAttribute('data-en',      p.en);
        path.setAttribute('data-desc',    p.desc);
        path.setAttribute('onmousemove',  'showTip(event,this)');
        path.setAttribute('onmouseleave', 'hideTip()');
        path.setAttribute('onclick',      'selectProv(this)');
      });

      // ── Decorative paths ────────────────────────────────
      // path[31]=Taiwan  path[32]=HK  path[33]=Macau detail  path[34]=South Sea
      [31, 32, 33, 34].forEach(i => {
        const p = allPaths[i];
        if (p) p.setAttribute('class', 'province-decor');
      });

      // ── Add province text labels ─────────────────────────
      PROVINCE_MAP.forEach(p => {
        const t = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x',              p.lx);
        t.setAttribute('y',              p.ly);
        t.setAttribute('text-anchor',    'middle');
        t.setAttribute('pointer-events', 'none');
        t.setAttribute('class',          'prov-lbl');
        t.textContent = p.label;
        svgEl.appendChild(t);
      });

      // ── Taiwan label ─────────────────────────────────────
      const addText = (x, y, txt, size, fill, anchor='middle') => {
        const t = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('text-anchor', anchor);
        t.setAttribute('font-size', size);
        t.setAttribute('fill', fill);
        t.setAttribute('pointer-events', 'none');
        t.textContent = txt;
        svgEl.appendChild(t);
      };

      addText(528, 288, '台湾', 7, 'rgba(26,18,8,0.4)');

      // ── Hong Kong & Macau dots + labels ─────────────────
      const addDot = (cx, cy, r, fill) => {
        const c = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', cx); c.setAttribute('cy', cy);
        c.setAttribute('r',  r);
        c.setAttribute('fill', fill);
        c.setAttribute('pointer-events', 'none');
        svgEl.appendChild(c);
      };

      addDot(472, 297, 2.5, 'var(--accent)');
      addText(478, 298, '香港 HK', 6.5, 'var(--accent)', 'start');
      addDot(468, 302, 1.8, 'rgba(26,18,8,0.5)');
      addText(474, 303, '澳門', 5.5, 'rgba(26,18,8,0.45)', 'start');

      // ── South China Sea dashed box ────────────────────────
      const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '630'); rect.setAttribute('y', '325');
      rect.setAttribute('width', '60'); rect.setAttribute('height', '75');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', 'var(--province-stroke)');
      rect.setAttribute('stroke-width', '0.8');
      rect.setAttribute('stroke-dasharray', '3,3');
      rect.setAttribute('rx', '2');
      rect.setAttribute('opacity', '0.45');
      rect.setAttribute('pointer-events', 'none');
      svgEl.appendChild(rect);
      addText(660, 368, '南海诸岛', 6.5, 'rgba(26,18,8,0.35)');

      // ── Final SVG attributes ─────────────────────────────
      svgEl.setAttribute('id',     'china-map-svg');
      svgEl.setAttribute('width',  '100%');
      svgEl.setAttribute('height', '100%');
      svgEl.removeAttribute('style');

      // Inject
      const wrap = document.getElementById('china-map-svg-wrap');
      document.getElementById('map-loading').remove();
      wrap.appendChild(svgEl);

      // Tooltip follow
      svgEl.addEventListener('mousemove', e => {
        if (document.getElementById('prov-tip').style.display === 'block') moveTip(e);
      });
    })
    .catch(err => {
      console.error('Map error:', err);
      const loading = document.getElementById('map-loading');
      if (loading) loading.textContent = 'Map unavailable — please open with Live Server.';
    });
}

loadMap();
