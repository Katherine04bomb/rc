// ============================================================
//  assets/map.js — Interactive China Map (v2)
//
//  WHAT THIS FILE DOES
//  - Renders the province map from assets/china-Map.svg (compliant:
//    includes Taiwan, Hong Kong, Macau, South Sea Islands).
//  - Adds: interest filter chips, clickable CITY PINS, a travel-card
//    drawer, a "My Trip" planner panel, a badge wall, a Surprise
//    button, and a full-itinerary modal.
//  - Remembers the visitor's trip & badges in localStorage.
//
//  HOW TO EDIT (for the site owner)
//  • Add / edit a city  → edit data/cities.json ONLY (add x,y,
//    provinceId, interests). The pins, badges and trip panel read
//    from that one file. No code change needed.
//  • Add a filter chip  → edit FILTERS below.
//  • Province tooltip    → edit PROVINCE_MAP (don't change idx / lx / ly).
//  • Section heading     → edit the html string inside loadMap().
//  DO NOT edit china-Map.svg path data.
//
//  REQUIRES: a local http server (fetch + SVG injection need http).
// ============================================================

// ── TOOLTIP (province hover) ────────────────────────────────
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

// ── PROVINCE SELECT (click a province → light it up) ────────
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

// ── INTEREST FILTER CHIPS ───────────────────────────────────
// 想加一个新标签：在下面加一行 {key, emoji, label} 即可。
// key 必须和 cities.json 里每个城市的 interests 数组值一致。
const FILTERS = [
  { key: 'food',    emoji: '🍜', label: 'Food',    color: '#e67e22' },
  { key: 'nature',  emoji: '🏔️', label: 'Nature',  color: '#27ae60' },
  { key: 'history', emoji: '🏛️', label: 'History', color: '#8e44ad' },
  { key: 'city',    emoji: '🌆', label: 'Cities',  color: '#2980b9' },
  { key: 'wildlife',emoji: '🐼', label: 'Wildlife',color: '#c0392b' },
  { key: 'art',     emoji: '🎨', label: 'Art',     color: '#d35400' },
  { key: 'nightlife', emoji: '🌃', label: 'Nightlife', color: '#1abc9c' },
];

// Each filter gets its own glow color on the map
const FILTER_COLORS = Object.fromEntries(FILTERS.map(f => [f.key, f.color]));

// ── TRANSPORT LOOKUP (between two cities, by nameEn key) ─────
// 没列出的组合会回退到按地图距离估算的 HSR/Flight 时间。
const TRANSPORT = {
  'beijing|chengdu':'HSR · ~7h', 'beijing|chongqing':'HSR · ~7h',
  'beijing|guilin':'Flight · ~3h', 'beijing|hangzhou':'HSR · ~5h',
  'beijing|quanzhou':'Flight · ~2.5h', 'beijing|shanghai':'HSR · ~4.5h',
  'beijing|xian':'HSR · ~4.5h',
  'chengdu|chongqing':'HSR · ~1h', 'chengdu|guilin':'Flight · ~2h',
  'chengdu|hangzhou':'Flight · ~2.5h', 'chengdu|quanzhou':'Flight · ~3h',
  'chengdu|shanghai':'Flight · ~2.5h', 'chengdu|xian':'HSR · ~3h',
  'chongqing|guilin':'Flight · ~1.5h', 'chongqing|hangzhou':'Flight · ~2h',
  'chongqing|quanzhou':'Flight · ~2h', 'chongqing|shanghai':'Flight · ~2.5h',
  'chongqing|xian':'HSR · ~5h',
  'guilin|hangzhou':'Flight · ~2h', 'guilin|quanzhou':'Flight · ~1.5h',
  'guilin|shanghai':'Flight · ~2.5h', 'guilin|xian':'Flight · ~2h',
  'hangzhou|quanzhou':'HSR · ~3h', 'hangzhou|shanghai':'HSR · ~1h',
  'quanzhou|shanghai':'Flight · ~1.5h', 'quanzhou|xian':'Flight · ~2.5h',
  'shanghai|xian':'Flight · ~2h'
};

// ── RUNTIME STATE ───────────────────────────────────────────
let CITIES = [];                 // filled from cities.json
const provEls = {};              // id → <path> element (for filter highlight)
let activeFilter = null;

const LS_TRIP   = 'rc_trip';     // localStorage key: array of nameEn
const LS_BADGES = 'rc_badges';   // localStorage key: {nameEn: 'been'|'interested'}

function loadTrip()   { try { return JSON.parse(localStorage.getItem(LS_TRIP)) || []; } catch(e){ return []; } }
function saveTrip(t)  { localStorage.setItem(LS_TRIP, JSON.stringify(t)); }
function loadBadges() { try { return JSON.parse(localStorage.getItem(LS_BADGES)) || {}; } catch(e){ return {}; } }
function saveBadges(b){ localStorage.setItem(LS_BADGES, JSON.stringify(b)); }

function cityByName(nameEn) { return CITIES.find(c => c.nameEn === nameEn); }

// parse leading integer from "4–6 days" → 4
function dayCount(city) {
  const m = String(city.days).match(/\d+/);
  return m ? parseInt(m[0], 10) : 3;
}
// sort trip north→south (smaller y = further north)
function geoSort(list) {
  return list.slice().sort((a, b) => (a.y || 999) - (b.y || 999));
}
function transportFor(a, b) {
  const key = [a.nameEn.toLowerCase(), b.nameEn.toLowerCase()].sort().join('|');
  if (TRANSPORT[key]) return TRANSPORT[key];

  // 根据 SVG 坐标距离估算，新增城市也能自动有合理交通
  const dx = (a.x || 0) - (b.x || 0);
  const dy = (a.y || 0) - (b.y || 0);
  const d = Math.sqrt(dx * dx + dy * dy);
  if (d < 50)  return 'HSR · ~1h';
  if (d < 100) return 'HSR · ~2h';
  if (d < 150) return 'HSR · ~4h';
  if (d < 220) return 'Flight · ~1.5h';
  if (d < 300) return 'Flight · ~2.5h';
  return 'Flight · ~3.5h';
}

// ── SHARED MAP SVG BUILDER ──────────────────────────────────
// Fetches china-Map.svg, annotates provinces, adds labels, and appends it to `wrap`.
// Returns a Promise that resolves with the SVG element.
// options.interactive = false disables province hover/click (used for homepage teaser).
function buildChinaMapSVG(svgUrl, wrap, options = {}) {
  const interactive = options.interactive !== false;
  return fetch(svgUrl)
    .then(r => { if (!r.ok) throw new Error('SVG fetch failed ' + r.status); return r.text(); })
    .then(svgText => {
      const svgDoc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      const svgEl  = svgDoc.querySelector('svg');
      svgDoc.querySelectorAll('style, text').forEach(n => n.remove());
      const allPaths = Array.from(svgEl.querySelectorAll('path'));

      // annotate interactive provinces
      PROVINCE_MAP.forEach(p => {
        const path = allPaths[p.idx];
        if (!path) return;
        path.setAttribute('id', p.id);
        path.setAttribute('class', 'province');
        path.setAttribute('data-zh', p.zh);
        path.setAttribute('data-en', p.en);
        path.setAttribute('data-desc', p.desc);
        if (interactive) {
          path.setAttribute('onmousemove', 'showTip(event,this)');
          path.setAttribute('onmouseleave', 'hideTip()');
          path.setAttribute('onclick', 'selectProv(this)');
          provEls[p.id] = path;
        }
      });

      // decorative paths: Taiwan(31) HK(32) Macau(33) South Sea(34)
      [31, 32, 33, 34].forEach(i => {
        const p = allPaths[i];
        if (p) p.setAttribute('class', 'province-decor');
      });

      // province text labels
      PROVINCE_MAP.forEach(p => {
        const t = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', p.lx); t.setAttribute('y', p.ly);
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('pointer-events', 'none');
        t.setAttribute('class', 'prov-lbl');
        t.textContent = p.label;
        svgEl.appendChild(t);
      });

      // Taiwan / HK / Macau / South Sea labels (keep compliant)
      const addText = (x, y, txt, size, fill, anchor='middle') => {
        const t = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', x); t.setAttribute('y', y);
        t.setAttribute('text-anchor', anchor);
        t.setAttribute('font-size', size); t.setAttribute('fill', fill);
        t.setAttribute('pointer-events', 'none');
        t.textContent = txt; svgEl.appendChild(t);
      };
      const addDot = (cx, cy, r, fill) => {
        const c = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
        c.setAttribute('fill', fill); c.setAttribute('pointer-events', 'none');
        svgEl.appendChild(c);
      };
      addText(528, 288, '台湾', 7, 'rgba(26,18,8,0.4)');
      addDot(472, 297, 2.5, 'var(--accent)');
      addText(478, 298, '香港 HK', 6.5, 'var(--accent)', 'start');
      addDot(468, 302, 1.8, 'rgba(26,18,8,0.5)');
      addText(474, 303, '澳門', 5.5, 'rgba(26,18,8,0.45)', 'start');
      const rect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '630'); rect.setAttribute('y', '325');
      rect.setAttribute('width', '60'); rect.setAttribute('height', '75');
      rect.setAttribute('fill', 'none');
      rect.setAttribute('stroke', 'var(--province-stroke)');
      rect.setAttribute('stroke-width', '0.8');
      rect.setAttribute('stroke-dasharray', '3,3');
      rect.setAttribute('rx', '2'); rect.setAttribute('opacity', '0.45');
      rect.setAttribute('pointer-events', 'none');
      svgEl.appendChild(rect);
      addText(660, 368, '南海诸岛', 6.5, 'rgba(26,18,8,0.35)');

      svgEl.setAttribute('id', 'china-map-svg');
      svgEl.setAttribute('width', '100%');
      svgEl.setAttribute('height', '100%');
      svgEl.removeAttribute('style');

      const loading = wrap.querySelector('#map-loading');
      if (loading) loading.remove();
      wrap.appendChild(svgEl);

      svgEl.addEventListener('mousemove', e => {
        if (document.getElementById('prov-tip') && document.getElementById('prov-tip').style.display === 'block') moveTip(e);
      });

      return svgEl;
    });
}

// ── MAP LOADER ───────────────────────────────────────────────
function loadMap(mode) {
  const isTeaser = mode === 'teaser';
  const container = document.getElementById('map-container');

  if (isTeaser) {
    container.innerHTML = `
      <section class="map-section-wrap map-section-teaser" id="map-section">
        <div class="map-teaser-grid">
          <div class="map-teaser-text">
            <div class="section-eyebrow">Explore · 探索中国</div>
            <h2 class="section-title">Plan your China, <em>city by city</em></h2>
            <p class="section-sub">
              Pick a vibe to light up the map, tap a <b>city pin</b>, and build your trip.
            </p>
            <a class="btn-primary map-teaser-cta" href="map.html">Explore the Map →</a>
            <div class="map-teaser-stats">
              <span><b>34</b> provinces & regions</span>
              <span class="dot-sep">·</span>
              <span><b>56</b> ethnic cultures</span>
              <span class="dot-sep">·</span>
              <span><b>11</b> cities curated by Kat</span>
            </div>
          </div>
          <div class="map-teaser-map">
            <div id="china-map-svg-wrap">
              <div id="map-loading" style="text-align:center;padding:60px;color:var(--text-muted);font-size:13px">Loading map…</div>
            </div>
          </div>
        </div>
      </section>`;
  } else {
    const chipHTML = FILTERS.map(f =>
      `<button class="map-chip" data-filter="${f.key}">${f.emoji} ${f.label}</button>`
    ).join('');

    container.innerHTML = `
      <section class="map-section-wrap" id="map-section">
        <div class="map-container">
          <div class="section-eyebrow" style="text-align:center">Explore · 探索中国</div>
          <h2 class="section-title" style="text-align:center">Plan your China, city by city</h2>
          <p class="section-sub" style="text-align:center;margin-bottom:10px">
            Pick a vibe to light up the map, tap a <b>city pin</b>, and build your trip.
          </p>

          <!-- INTEREST FILTER CHIPS -->
          <div class="map-chips" id="map-chips">${chipHTML}</div>

          <!-- KAT'S HINT -->
          <div class="map-hint" id="map-hint">🗺️ Kat says: tap a vibe, then tap a city pin to build your trip.</div>

          <div class="map-layout">
            <!-- LEFT: the map -->
            <div class="map-canvas">
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

            <!-- RIGHT: My Trip → Can't decide → Badges -->
            <aside class="map-side">
              <div class="explorer-panel" id="explorer-panel">
                <div class="explorer-title">🏅 China Explorer Level</div>
                <div class="explorer-level" id="explorer-level">Lv.1 纸上谈兵</div>
                <div class="explorer-bar-wrap"><div class="explorer-bar" id="explorer-bar"></div></div>
                <div class="explorer-sub" id="explorer-sub">Add your first city to level up.</div>
              </div>

              <div class="trip-panel">
                <div class="trip-head">
                  <span>🧳 My Trip</span>
                  <span class="trip-count" id="trip-count">0</span>
                </div>
                <div class="trip-list" id="trip-list"></div>
                <div class="interested-mini" id="interested-mini"></div>
                <button class="trip-btn" id="trip-itin" onclick="openItinerary()">📋 Get full itinerary</button>
              </div>

              <button class="surprise-btn" onclick="surpriseCity()">🎁 Can't decide? Surprise me</button>

              <div class="badge-wall">
                <div class="badge-head">🏅 My badges <span style="opacity:.6;font-weight:400">(tap a pin → ★ / ✓)</span></div>
                <div class="badge-grid" id="badge-grid"></div>
              </div>
            </aside>
          </div>
        </div>

        <!-- TRAVEL CARD DRAWER (slides up when a pin is tapped) -->
        <div class="travel-card" id="travel-card">
          <button class="tc-close" onclick="closeTravelCard()">×</button>
          <div class="tc-emoji" id="tc-emoji"></div>
          <div class="tc-body">
            <div class="tc-name"><span id="tc-zh"></span> <span id="tc-en"></span></div>
            <ul class="tc-bullets" id="tc-bullets"></ul>
            <div class="tc-actions">
              <button class="tc-btn tc-interested" id="tc-interested" onclick="tcToggle('interested')">★ Interested</button>
              <button class="tc-btn tc-been" id="tc-been" onclick="tcToggle('been')">✓ Been there</button>
              <button class="tc-btn tc-add" id="tc-add" onclick="tcAddTrip()">＋ Add to trip</button>
              <a class="tc-btn tc-read" id="tc-read" href="#">Read guide →</a>
            </div>
          </div>
        </div>

        <!-- ITINERARY MODAL -->
        <div class="modal-overlay" id="itinerary-modal">
          <div class="modal-box itin-box">
            <div class="modal-header">
              <div>
                <div class="modal-title" id="itin-title">Your China itinerary</div>
                <div class="modal-subtitle" id="itin-route"></div>
                <div class="itin-total" id="itin-total"></div>
              </div>
              <button class="modal-close" onclick="closeItinerary()">×</button>
            </div>
            <div class="modal-body" id="itin-body"></div>
            <div class="itin-footer">
              <button class="trip-btn trip-btn-ghost" onclick="copyItineraryText()">Copy text</button>
              <a class="trip-btn" id="email-itin" href="#" target="_blank">Email me this itinerary</a>
            </div>
          </div>
        </div>

        <!-- tiny toast -->
        <div class="map-toast" id="map-toast"></div>
      </section>`;
  }

  const wrap = document.getElementById('china-map-svg-wrap');
  const svgUrl = container.dataset.mapUrl || 'assets/china-Map.svg';
  const citiesUrl = container.dataset.citiesUrl || './data/cities.json';

  buildChinaMapSVG(svgUrl, wrap, { interactive: !isTeaser })
    .then(() => fetch(citiesUrl))
    .then(r => r.json())
    .then(cities => {
      CITIES = cities;
      buildCityPins({
        onClick: isTeaser
          ? () => { window.location.href = container.dataset.mapPage || 'map.html'; }
          : openCityPin
      });
      if (!isTeaser) {
        setupChips();
        renderTrip();
        renderBadges();
        updateExplorer();
      }
    })
    .catch(err => {
      console.error('Map error:', err);
      const loading = document.getElementById('map-loading');
      if (loading) loading.textContent = 'Map unavailable — please open with a local server.';
    });
}

// ── BUILD CITY PINS (overlay on the SVG) ────────────────────
function buildCityPins(options = {}) {
  const svg = document.getElementById('china-map-svg');
  if (!svg) return;
  const NS = 'http://www.w3.org/2000/svg';
  const onClick = options.onClick || openCityPin;
  const showLabels = options.showLabels !== false; // default true

  // Route line layer (drawn first so pins sit on top)
  const routeGroup = document.createElementNS(NS, 'g');
  routeGroup.setAttribute('id', 'trip-route-group');
  svg.appendChild(routeGroup);

  const citiesWithCoords = CITIES.filter(c => c.x != null && c.y != null);
  citiesWithCoords.forEach((c, i) => {
    // Outer group handles absolute position; inner group handles pop animation
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'city-pin');
    g.setAttribute('data-city', c.nameEn);
    g.setAttribute('data-idx', i);
    g.setAttribute('transform', `translate(${c.x},${c.y})`);

    const inner = document.createElementNS(NS, 'g');
    inner.setAttribute('class', 'city-pin-inner');
    inner.style.animationDelay = (0.08 * i) + 's';

    const pulse = document.createElementNS(NS, 'circle');
    pulse.setAttribute('r', '7');
    pulse.setAttribute('class', 'city-pin-pulse');
    pulse.style.animationDelay = (i * 0.18 % 1.4) + 's';
    const c1 = document.createElementNS(NS, 'circle');
    c1.setAttribute('r', '7'); c1.setAttribute('class', 'city-pin-halo');
    const c2 = document.createElementNS(NS, 'circle');
    c2.setAttribute('r', '5'); c2.setAttribute('class', 'city-pin-dot');
    const e = document.createElementNS(NS, 'text');
    e.setAttribute('class', 'city-pin-emoji');
    e.setAttribute('text-anchor', 'middle');
    e.setAttribute('dy', '-7');
    e.textContent = c.emoji;
    inner.appendChild(pulse); inner.appendChild(c1); inner.appendChild(c2); inner.appendChild(e);

    if (showLabels) {
      const l = document.createElementNS(NS, 'text');
      l.setAttribute('class', 'city-pin-lbl');
      l.setAttribute('text-anchor', 'middle');
      l.setAttribute('y', '-17');
      l.textContent = c.nameEn;
      inner.appendChild(l);
    }

    g.appendChild(inner);
    g.addEventListener('click', (ev) => { ev.stopPropagation(); onClick(c.nameEn); });
    svg.appendChild(g);
  });
}

// ── FILTER CHIPS ────────────────────────────────────────────
function setupChips() {
  document.querySelectorAll('#map-chips .map-chip').forEach(btn => {
    const key = btn.dataset.filter;
    const f = FILTERS.find(x => x.key === key);
    if (f) btn.style.setProperty('--chip-color', f.color);
    btn.addEventListener('click', () => {
      if (activeFilter === key) { clearFilter(); return; }
      activeFilter = key;
      document.querySelectorAll('#map-chips .map-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(key);
    });
  });
}
function applyFilter(key) {
  const matchProv = new Set();
  const matchCity = new Set();
  CITIES.forEach(c => {
    if ((c.interests || []).includes(key)) {
      matchCity.add(c.nameEn);
      if (c.provinceId) matchProv.add(c.provinceId);
    }
  });
  const color = FILTER_COLORS[key] || '#c0392b';
  document.documentElement.style.setProperty('--filter-glow', color);

  // provinces: highlight matches, fade the rest
  Object.keys(provEls).forEach(id => {
    const p = provEls[id];
    p.classList.toggle('prov-match', matchProv.has(id));
    p.classList.toggle('prov-faded', !matchProv.has(id));
    p.style.fill = matchProv.has(id) ? color : '';
  });
  // pins: dim non-matching, boost matching
  document.querySelectorAll('.city-pin').forEach(g => {
    const match = matchCity.has(g.dataset.city);
    g.classList.toggle('pin-dim', !match);
    g.classList.toggle('pin-match', match);
    const dot = g.querySelector('.city-pin-dot');
    if (dot) dot.style.stroke = match ? color : '';
  });

  const f = FILTERS.find(x => x.key === key);
  showHint(`${f.emoji} ${f.label} mode: ${matchCity.size} city${matchCity.size === 1 ? '' : 'ies'} lit up. Tap one!`);
}
function clearFilter() {
  activeFilter = null;
  document.querySelectorAll('#map-chips .map-chip').forEach(b => b.classList.remove('active'));
  Object.values(provEls).forEach(p => {
    p.classList.remove('prov-match', 'prov-faded');
    p.style.fill = '';
  });
  document.querySelectorAll('.city-pin').forEach(g => {
    g.classList.remove('pin-dim', 'pin-match');
    const dot = g.querySelector('.city-pin-dot');
    if (dot) dot.style.stroke = '';
  });
  showHint('🗺️ Kat says: tap a vibe, then tap a city pin to build your trip.');
}
function showHint(text) {
  const h = document.getElementById('map-hint');
  if (!h) return;
  h.style.opacity = '0';
  setTimeout(() => { h.textContent = text; h.style.opacity = '1'; }, 150);
}

// ── TRAVEL CARD DRAWER ──────────────────────────────────────
function openCityPin(nameEn) {
  const c = cityByName(nameEn);
  if (!c) return;
  document.getElementById('tc-emoji').textContent = c.emoji;
  document.getElementById('tc-zh').textContent = c.nameZh;
  document.getElementById('tc-en').textContent = c.nameEn;
  const bullets = (c.attractions || []).slice(0, 3).map(a => `<li>${a}</li>`).join('');
  document.getElementById('tc-bullets').innerHTML = bullets;
  const slug = c.nameEn.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
  document.getElementById('tc-read').setAttribute('href', './guides/' + slug + '.html');

  // sync button states with saved badges
  const badges = loadBadges();
  const state = badges[c.nameEn];
  document.getElementById('tc-interested').classList.toggle('on', state === 'interested');
  document.getElementById('tc-been').classList.toggle('on', state === 'been');
  const trip = loadTrip();
  document.getElementById('tc-add').classList.toggle('on', trip.includes(c.nameEn));

  document.getElementById('travel-card').classList.add('open');
}
function closeTravelCard() {
  document.getElementById('travel-card').classList.remove('open');
}
function tcToggle(kind) {
  const en = document.getElementById('tc-en').textContent;
  const badges = loadBadges();
  if (badges[en] === kind) { delete badges[en]; }      // toggle off
  else { badges[en] = kind; }                          // set (overwrites the other)
  saveBadges(badges);
  document.getElementById('tc-interested').classList.toggle('on', badges[en] === 'interested');
  document.getElementById('tc-been').classList.toggle('on', badges[en] === 'been');
  renderBadges();
  renderInterested();
  updateExplorer();
  toast(kind === 'been' ? '🏅 Badge earned: Been there!' : '⭐ Saved as Interested');
}
function tcAddTrip() {
  const en = document.getElementById('tc-en').textContent;
  const trip = loadTrip();
  if (!trip.includes(en)) {
    trip.push(en);
    saveTrip(trip);
    document.getElementById('tc-add').classList.add('on');
    renderTrip();
    toast('＋ Added ' + en + ' to your trip');
  } else {
    toast(en + ' is already in your trip');
  }
}

// ── MY TRIP PANEL ───────────────────────────────────────────
function renderTrip() {
  const trip = loadTrip();
  const list = document.getElementById('trip-list');
  const count = document.getElementById('trip-count');
  if (!list) return;
  count.textContent = trip.length;
  if (trip.length === 0) {
    list.innerHTML = '<div class="trip-empty">Tap a city pin → “＋ Add to trip”.<br>Your route appears here.</div>';
  } else {
    const ordered = geoSort(trip.map(cityByName).filter(Boolean));
    list.innerHTML = ordered.map(c => `
      <div class="trip-item">
        <span class="trip-item-emoji">${c.emoji}</span>
        <span class="trip-item-name">${c.nameEn}</span>
        <span class="trip-item-days">${c.days}</span>
        <button class="trip-item-x" onclick="removeFromTrip('${c.nameEn}')">×</button>
      </div>`).join('');
    renderRoute(ordered);
  }
  if (trip.length === 0) renderRoute([]);
  updateExplorer();
  renderInterested();
}

// Draw a dashed route line between trip cities in map order
function renderRoute(ordered) {
  const svg = document.getElementById('china-map-svg');
  if (!svg) return;
  let g = document.getElementById('trip-route-group');
  const NS = 'http://www.w3.org/2000/svg';
  if (!g) {
    g = document.createElementNS(NS, 'g');
    g.setAttribute('id', 'trip-route-group');
    const firstPin = svg.querySelector('.city-pin');
    if (firstPin) svg.insertBefore(g, firstPin);
    else svg.appendChild(g);
  }
  g.innerHTML = '';
  if (ordered.length < 2) return;
  const d = ordered.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const path = document.createElementNS(NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', 'trip-route');
  g.appendChild(path);
  ordered.forEach(c => {
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', c.x);
    dot.setAttribute('cy', c.y);
    dot.setAttribute('r', 2.5);
    dot.setAttribute('class', 'trip-route-dot');
    g.appendChild(dot);
  });
}

// ── EXPLORER LEVEL / GAME PROGRESS ─────────────────────────
function updateExplorer() {
  const trip = loadTrip();
  const badges = loadBadges();
  const been = Object.values(badges).filter(v => v === 'been').length;
  const interested = Object.values(badges).filter(v => v === 'interested').length;
  const score = trip.length * 3 + been * 5 + interested * 1;

  const levels = [
    { min: 0,   label: 'Lv.1 纸上谈兵', sub: 'Add your first city to level up.' },
    { min: 3,   label: 'Lv.2 跃跃欲试', sub: 'You\'re building a real itinerary!' },
    { min: 9,   label: 'Lv.3 说走就走', sub: 'Kat would be proud of this route.' },
    { min: 18,  label: 'Lv.4 中国通',   sub: 'You\'re basically a local now.' },
    { min: 30,  label: 'Lv.5 超级玩家', sub: 'All the badges? Legendary.' }
  ];
  const level = levels.slice().reverse().find(l => score >= l.min);
  const next = levels.find(l => l.min > score);
  const nextMin = next ? next.min : score;
  const prevMin = levels[levels.indexOf(level)] ? levels[levels.indexOf(level)].min : 0;
  const pct = Math.min(100, Math.round(((score - prevMin) / Math.max(1, nextMin - prevMin)) * 100));

  const elLevel = document.getElementById('explorer-level');
  const elBar = document.getElementById('explorer-bar');
  const elSub = document.getElementById('explorer-sub');
  if (elLevel) elLevel.textContent = level.label;
  if (elBar) elBar.style.width = pct + '%';
  if (elSub) elSub.textContent = level.sub;
}
function addToTrip(nameEn) {
  const trip = loadTrip();
  if (!trip.includes(nameEn)) { trip.push(nameEn); saveTrip(trip); renderTrip(); }
}
function removeFromTrip(nameEn) {
  let trip = loadTrip();
  trip = trip.filter(n => n !== nameEn);
  saveTrip(trip);
  renderTrip();
  // keep the travel-card "Add" state in sync if open
  if (document.getElementById('tc-en') &&
      document.getElementById('tc-en').textContent === nameEn) {
    document.getElementById('tc-add').classList.remove('on');
  }
}

// Show a small "Interested" wishlist inside My Trip panel so visitors
// know what "Saved to Interested" actually means.
function renderInterested() {
  const wrap = document.getElementById('interested-mini');
  if (!wrap) return;
  const badges = loadBadges();
  const cities = CITIES.filter(c => badges[c.nameEn] === 'interested');
  if (cities.length === 0) {
    wrap.innerHTML = '';
    return;
  }
  const chips = cities.map(c =>
    `<button class="interested-chip" onclick="openCityPin('${c.nameEn}')">${c.emoji} ${c.nameEn}</button>`
  ).join('');
  wrap.innerHTML = `
    <div class="interested-head">⭐ Interested (${cities.length})</div>
    <div class="interested-hint">A wishlist, not part of your trip yet.</div>
    <div class="interested-list">${chips}</div>
  `;
}

// ── BADGE WALL ──────────────────────────────────────────────
function renderBadges() {
  const grid = document.getElementById('badge-grid');
  if (!grid) return;
  const badges = loadBadges();
  grid.innerHTML = CITIES.map(c => {
    const st = badges[c.nameEn] ? badges[c.nameEn] : '';
    return `<button class="badge ${st}" data-city="${c.nameEn}" title="${c.nameEn}">
      <span class="badge-emoji">${c.emoji}</span>
      <span class="badge-name">${c.nameEn}</span>
    </button>`;
  }).join('');
  grid.querySelectorAll('.badge').forEach(b => {
    b.addEventListener('click', () => openCityPin(b.dataset.city));
  });
  updateExplorer();
}

// ── SURPRISE ────────────────────────────────────────────────
function surpriseCity() {
  let pool = CITIES;
  if (activeFilter) {
    pool = CITIES.filter(c => (c.interests || []).includes(activeFilter));
    if (pool.length === 0) pool = CITIES;
  }
  if (pool.length === 0) return;
  const c = pool[Math.floor(Math.random() * pool.length)];
  openCityPin(c.nameEn);
  toast('🎁 Surprise: ' + c.nameEn + '!');
}

// ── ITINERARY MODAL ─────────────────────────────────────────
function openItinerary() {
  const trip = loadTrip();
  if (trip.length === 0) { toast('Add cities to your trip first 🧳'); return; }
  const ordered = geoSort(trip.map(cityByName).filter(Boolean));
  const routeLine = ordered.map(c => c.nameEn).join(' → ');

  let day = 1;
  let bodyHtml = '';
  ordered.forEach((c, i) => {
    const d = dayCount(c);
    const end = day + d - 1;
    const bullets = (c.attractions || []).slice(0, 3)
      .map(a => `<li>${a}</li>`).join('');
    let next = '';
    if (i < ordered.length - 1) {
      const nxt = ordered[i + 1];
      next = `<div class="itin-next">Next: Travel to ${nxt.nameEn}</div>`;
    }
    bodyHtml += `
      <div class="itin-day">
        <div class="itin-day-head">Day ${day}–${end}: ${c.emoji} ${c.nameZh} ${c.nameEn}</div>
        <ul class="itin-bullets">${bullets}</ul>
        ${next}
      </div>`;
    day = end + 1;
  });
  const totalDays = day - 1;

  document.getElementById('itin-title').textContent = `Your ${totalDays}-day China itinerary`;
  document.getElementById('itin-route').textContent = 'Route: ' + routeLine;
  document.getElementById('itin-body').innerHTML = bodyHtml;
  document.getElementById('itin-total').textContent =
    `${ordered.length} stops · ${totalDays} days total`;

  // prepare email body
  const textLines = [];
  textLines.push(`My ${totalDays}-day China route: ${routeLine}`);
  textLines.push('');
  day = 1;
  ordered.forEach((c, i) => {
    const d = dayCount(c);
    const end = day + d - 1;
    textLines.push(`Day ${day}–${end}: ${c.nameZh} ${c.nameEn}`);
    (c.attractions || []).slice(0, 3).forEach(a => textLines.push('• ' + a));
    if (i < ordered.length - 1) {
      textLines.push(`Next: Travel to ${ordered[i + 1].nameEn}`);
    }
    textLines.push('');
    day = end + 1;
  });
  const subject = encodeURIComponent('My China itinerary from Ready? China!');
  const body = encodeURIComponent(textLines.join('\n'));
  document.getElementById('email-itin').href = `mailto:?subject=${subject}&body=${body}`;

  document.getElementById('itinerary-modal').classList.add('show');
}
function closeItinerary() {
  document.getElementById('itinerary-modal').classList.remove('show');
}
function copyItineraryText() {
  const trip = loadTrip();
  if (trip.length === 0) { toast('Your trip is empty 🧳'); return; }
  const ordered = geoSort(trip.map(cityByName).filter(Boolean));
  let day = 1;
  const lines = [];
  lines.push(`My ${day - 1 + ordered.reduce((sum, c) => sum + dayCount(c), 0)}-day China route: ${ordered.map(c => c.nameEn).join(' → ')}`);
  lines.push('');
  ordered.forEach((c, i) => {
    const d = dayCount(c);
    const end = day + d - 1;
    lines.push(`Day ${day}–${end}: ${c.nameZh} ${c.nameEn}`);
    (c.attractions || []).slice(0, 3).forEach(a => lines.push('• ' + a));
    if (i < ordered.length - 1) lines.push(`Next: Travel to ${ordered[i + 1].nameEn}`);
    lines.push('');
    day = end + 1;
  });
  const text = lines.join('\n');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => toast('📋 Itinerary copied!'),
      () => toast('Copy failed'));
  } else {
    toast(text);
  }
}

// ── TOAST ───────────────────────────────────────────────────
let toastTimer = null;
function toast(msg) {
  const t = document.getElementById('map-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

// Detect mode from the container: 'teaser' for homepage, 'full' for standalone map page.
const mapContainer = document.getElementById('map-container');
const MAP_MODE = (mapContainer && mapContainer.dataset.mode === 'teaser') ? 'teaser' : 'full';
loadMap(MAP_MODE);
