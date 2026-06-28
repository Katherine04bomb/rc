// ============================================================
//  assets/map.js — Interactive China Map component
//
//  HOW TO EDIT:
//  • Change a province description → find the province in
//    PROVINCES array below, edit the desc field
//  • Change section heading/subtext → edit SECTION_HEADER
//  • The SVG polygon coordinates should NOT be changed
//    (they define the actual shape of each province)
// ============================================================

// ── TOOLTIP ─────────────────────────────────────────────────
// Called from SVG onmousemove / onmouseleave attrs generated below
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
// Called from SVG onclick attrs generated below
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

// ────────────────────────────────────────────────────────────
function loadMap() {

  // ── PROVINCE DATA ────────────────────────────────────────
  // To edit a province tooltip: change desc only
  // labelX/labelY = where the text label sits on the map
  // label = what appears on the map (zh + en or just zh for tiny provinces)
  const PROVINCES = [
    {
      id: 'heilongjiang',
      zh: '黑龙江', en: 'Heilongjiang',
      desc: "China's northernmost province. Ice & Snow Festival, Siberian tigers, vast forests.",
      points: '600,30 725,28 762,58 742,100 700,122 658,132 628,112 590,80',
      labels: [
        { x: 672, y: 74, cls: 'plzh', text: '黑龙江' },
        { x: 672, y: 83, cls: 'plen', text: 'Heilongjiang' }
      ]
    },
    {
      id: 'jilin',
      zh: '吉林', en: 'Jilin',
      desc: 'Changchun & Jilin City. Ski resorts, rime ice scenery, Korean cultural heritage.',
      points: '628,112 700,122 722,152 680,172 638,156 614,136',
      labels: [{ x: 665, y: 143, cls: 'plzh', text: '吉林 Jilin' }]
    },
    {
      id: 'liaoning',
      zh: '辽宁', en: 'Liaoning',
      desc: "Dalian's coastline, Shenyang Imperial Palace. Gateway to Northeast China.",
      points: '614,136 638,156 680,172 692,202 650,218 614,202 594,176 600,156',
      labels: [{ x: 638, y: 186, cls: 'plzh', text: '辽宁 Liaoning' }]
    },
    {
      id: 'inner-mongolia',
      zh: '内蒙古', en: 'Inner Mongolia',
      desc: 'Vast steppes, nomadic culture, horse riding, incredible starry skies.',
      points: '278,62 600,30 590,80 628,112 614,136 594,176 558,172 498,162 438,152 378,157 328,142 288,122 258,92',
      labels: [
        { x: 438, y: 112, cls: 'plzh', text: '内蒙古' },
        { x: 438, y: 122, cls: 'plen', text: 'Inner Mongolia' }
      ]
    },
    {
      id: 'beijing',
      zh: '北京', en: 'Beijing',
      desc: "China's capital. Great Wall, Forbidden City, Tiananmen. Essential first stop.",
      points: '548,172 570,162 584,177 580,194 559,197 543,187',
      labels: [{ x: 562, y: 184, cls: 'plzh', text: '京' }]
    },
    {
      id: 'tianjin',
      zh: '天津', en: 'Tianjin',
      desc: 'Historic port city near Beijing. European architecture, famous Goubuli buns.',
      points: '568,192 584,186 596,202 580,212 564,207',
      labels: [{ x: 580, y: 203, cls: 'plzh', text: '津' }]
    },
    {
      id: 'hebei',
      zh: '河北', en: 'Hebei',
      desc: 'Surrounds Beijing & Tianjin. Chengde Summer Palace, Zhangjiakou ski mountains.',
      points: '498,162 548,172 543,187 559,197 580,212 564,242 528,258 488,252 458,232 448,202 468,177',
      labels: [{ x: 508, y: 218, cls: 'plzh', text: '河北 Hebei' }]
    },
    {
      id: 'shanxi',
      zh: '山西', en: 'Shanxi',
      desc: 'Ancient culture. Pingyao old city (UNESCO), Yungang Grottoes.',
      points: '448,202 488,252 478,287 453,302 428,287 418,257 428,227',
      labels: [{ x: 450, y: 255, cls: 'plzh', text: '山西 Shanxi' }]
    },
    {
      id: 'shandong',
      zh: '山东', en: 'Shandong',
      desc: 'Birthplace of Confucius. Mount Tai, Qingdao beer, beautiful coastline.',
      points: '564,242 618,237 632,257 622,282 590,297 558,287 538,267 528,258',
      labels: [{ x: 582, y: 264, cls: 'plzh', text: '山东 Shandong' }]
    },
    {
      id: 'henan',
      zh: '河南', en: 'Henan',
      desc: 'Heart of ancient China. Shaolin Temple, Longmen Grottoes, Yellow River.',
      points: '478,287 528,258 558,287 553,322 518,342 483,332 463,312',
      labels: [{ x: 508, y: 307, cls: 'plzh', text: '河南 Henan' }]
    },
    {
      id: 'shaanxi',
      zh: '陕西', en: 'Shaanxi',
      desc: 'Terracotta Army, ancient Xi\'an. The Silk Road begins here!',
      points: '378,157 438,152 448,202 428,227 418,257 428,287 408,312 378,322 358,302 353,267 363,232 368,197',
      labels: [{ x: 394, y: 245, cls: 'plzh', text: '陕西 Shaanxi' }]
    },
    {
      id: 'gansu',
      zh: '甘肃', en: 'Gansu',
      desc: 'Silk Road corridor. Dunhuang Mogao Caves, Rainbow Mountains, Jiayuguan Fort.',
      points: '198,142 278,62 288,122 328,142 378,157 368,197 353,267 328,292 298,282 268,262 238,232 198,202 188,172',
      labels: [{ x: 272, y: 195, cls: 'plzh', text: '甘肃 Gansu' }]
    },
    {
      id: 'ningxia',
      zh: '宁夏', en: 'Ningxia',
      desc: 'Desert meets oasis. Shapotou sand dunes, Hui Muslim culture.',
      points: '353,267 363,232 368,197 383,202 388,232 383,262 366,277',
      labels: [{ x: 372, y: 242, cls: 'plzh', text: '宁夏' }]
    },
    {
      id: 'qinghai',
      zh: '青海', en: 'Qinghai',
      desc: 'Qinghai Lake, Tibetan plateau, breathtaking high-altitude scenery.',
      points: '148,252 198,202 238,232 268,262 298,282 308,322 278,362 238,372 198,362 168,332 143,297',
      labels: [{ x: 224, y: 298, cls: 'plzh', text: '青海 Qinghai' }]
    },
    {
      id: 'xinjiang',
      zh: '新疆', en: 'Xinjiang',
      desc: "China's largest region. Taklamakan Desert, Silk Road oases, Kashgar bazaar.",
      points: '28,82 198,82 198,142 188,172 198,202 148,252 143,297 98,312 58,292 28,252 18,182 22,122',
      labels: [{ x: 108, y: 188, cls: 'plzh', text: '新疆 Xinjiang' }]
    },
    {
      id: 'tibet',
      zh: '西藏', en: 'Tibet',
      desc: 'Potala Palace, Mt. Everest Base Camp. The roof of the world.',
      points: '98,312 143,297 148,252 198,362 238,372 258,412 218,442 168,452 128,432 93,402 78,362 83,332',
      labels: [{ x: 154, y: 388, cls: 'plzh', text: '西藏 Tibet' }]
    },
    {
      id: 'sichuan',
      zh: '四川', en: 'Sichuan',
      desc: 'Panda paradise! Spicy food, Jiuzhaigou lakes, Leshan Giant Buddha.',
      points: '298,282 328,292 353,267 366,277 383,262 388,312 378,352 353,382 318,392 288,372 268,342 258,312 268,292',
      labels: [{ x: 322, y: 334, cls: 'plzh', text: '四川 Sichuan' }]
    },
    {
      id: 'chongqing',
      zh: '重庆', en: 'Chongqing',
      desc: 'Mountain megacity. Hotpot capital, cyberpunk skyline, Three Gorges cruise.',
      points: '388,312 408,312 418,332 413,357 393,362 378,352',
      labels: [{ x: 397, y: 337, cls: 'plzh', text: '渝' }]
    },
    {
      id: 'guizhou',
      zh: '贵州', en: 'Guizhou',
      desc: 'Hidden waterfalls, Huangguoshu Falls, Miao & Dong ethnic culture.',
      points: '413,357 428,347 453,357 468,377 458,402 433,417 408,402 398,382',
      labels: [{ x: 434, y: 385, cls: 'plzh', text: '贵州 Guizhou' }]
    },
    {
      id: 'yunnan',
      zh: '云南', en: 'Yunnan',
      desc: 'Lijiang, Shangri-La, rice terraces, 25 ethnic groups. Backpacker paradise.',
      points: '258,412 288,372 318,392 353,382 378,402 393,422 383,457 353,472 308,482 278,462 258,442',
      labels: [{ x: 313, y: 432, cls: 'plzh', text: '云南 Yunnan' }]
    },
    {
      id: 'guangxi',
      zh: '广西', en: 'Guangxi',
      desc: "Guilin's karst mountains & Li River cruise. Zhuang ethnic culture.",
      points: '458,402 478,382 508,377 533,392 543,422 523,447 488,457 458,447 443,427',
      labels: [{ x: 493, y: 420, cls: 'plzh', text: '广西 Guangxi' }]
    },
    {
      id: 'guangdong',
      zh: '广东', en: 'Guangdong',
      desc: 'Shenzhen tech hub, Cantonese cuisine, Pearl River Delta, dim sum culture.',
      points: '533,392 568,377 598,382 613,407 603,432 573,447 543,452 523,447',
      labels: [{ x: 565, y: 414, cls: 'plzh', text: '广东 Guangdong' }]
    },
    {
      id: 'hainan',
      zh: '海南', en: 'Hainan',
      desc: "China's tropical paradise. Sanya beaches, palm trees, duty-free shopping.",
      points: '528,492 558,482 578,497 568,517 543,522 523,510',
      labels: [{ x: 550, y: 504, cls: 'plzh', text: '海南 Hainan' }]
    },
    {
      id: 'hunan',
      zh: '湖南', en: 'Hunan',
      desc: "Avatar Mountains (Zhangjiajie), Mao's birthplace, fiercely spicy cuisine.",
      points: '478,332 518,342 543,357 543,392 508,377 478,382 458,402 433,417 428,392 438,367 453,357 463,342',
      labels: [{ x: 487, y: 372, cls: 'plzh', text: '湖南 Hunan' }]
    },
    {
      id: 'hubei',
      zh: '湖北', en: 'Hubei',
      desc: 'Three Gorges Dam, Wuhan, Yangtze River heartland.',
      points: '453,312 483,297 518,302 538,317 543,357 518,342 478,332 463,342 453,330',
      labels: [{ x: 495, y: 325, cls: 'plzh', text: '湖北 Hubei' }]
    },
    {
      id: 'jiangsu',
      zh: '江苏', en: 'Jiangsu',
      desc: "Suzhou gardens, Nanjing history, water towns — China's Venice.",
      points: '558,287 588,297 618,302 618,327 593,342 568,347 553,322',
      labels: [{ x: 585, y: 318, cls: 'plzh', text: '江苏 Jiangsu' }]
    },
    {
      id: 'shanghai',
      zh: '上海', en: 'Shanghai',
      desc: "China's global metropolis. Iconic Bund, world-class dining, fashion.",
      points: '608,322 626,320 630,332 620,342 607,337',
      labels: [{ x: 618, y: 331, cls: 'plzh', text: '沪' }]
    },
    {
      id: 'zhejiang',
      zh: '浙江', en: 'Zhejiang',
      desc: 'Hangzhou West Lake, tea culture, water towns. Alibaba\'s home.',
      points: '593,342 623,332 638,347 633,372 608,382 588,372 583,352',
      labels: [{ x: 610, y: 360, cls: 'plzh', text: '浙江 Zhejiang' }]
    },
    {
      id: 'fujian',
      zh: '福建', en: 'Fujian',
      desc: "Tea country, Tulou buildings, Quanzhou's Maritime Silk Road. K's hometown!",
      points: '608,382 633,372 658,377 663,402 643,422 613,417 598,402',
      labels: [{ x: 630, y: 398, cls: 'plzh', text: '福建 Fujian' }]
    },
    {
      id: 'jiangxi',
      zh: '江西', en: 'Jiangxi',
      desc: 'Jingdezhen porcelain, Lushan Mountain, Wuyuan golden fields.',
      points: '568,347 593,342 583,352 588,372 608,382 598,402 573,412 553,397 543,372 548,352',
      labels: [{ x: 572, y: 378, cls: 'plzh', text: '江西 Jiangxi' }]
    },
    {
      id: 'anhui',
      zh: '安徽', en: 'Anhui',
      desc: 'Yellow Mountain (Huangshan) — the most photographed peak in China.',
      points: '538,297 558,287 553,322 568,347 548,352 528,342 518,322 523,302',
      labels: [{ x: 540, y: 322, cls: 'plzh', text: '安徽 Anhui' }]
    }
  ];

  // ── BUILD SVG PROVINCES ──────────────────────────────────
  const provinceSVG = PROVINCES.map(p => {
    const labelsHTML = p.labels.map(l =>
      `<text class="prov-lbl" x="${l.x}" y="${l.y}">
        <tspan class="${l.cls}" text-anchor="middle">${l.text}</tspan>
      </text>`
    ).join('');

    return `
      <g id="${p.id}" class="province"
         data-zh="${p.zh}" data-en="${p.en}" data-desc="${p.desc}"
         onmousemove="showTip(event,this)" onmouseleave="hideTip()" onclick="selectProv(this)">
        <polygon points="${p.points}"/>
      </g>
      ${labelsHTML}`;
  }).join('');

  // ── FULL SECTION HTML ────────────────────────────────────
  const html = `
  <section class="map-section-wrap" id="map-section">
    <div class="map-container">
      <div class="section-eyebrow" style="text-align:center">Explore · 探索中国</div>
      <h2 class="section-title" style="text-align:center">Click any province to learn more</h2>
      <p class="section-sub" style="text-align:center;margin-bottom:0">
        All 31 provinces, bilingual — hover for a preview, click to light it up
      </p>

      <svg id="china-map-svg" viewBox="0 0 900 760" xmlns="http://www.w3.org/2000/svg">
        ${provinceSVG}

        <!-- Taiwan -->
        <ellipse cx="670" cy="432" rx="14" ry="22"
          fill="var(--province-default)" stroke="var(--province-stroke)"
          stroke-width=".8" opacity=".6"/>
        <text class="prov-lbl" x="670" y="435">
          <tspan class="plzh" text-anchor="middle" font-size="5.5">台湾</tspan>
        </text>

        <!-- South China Sea islands -->
        <rect x="638" y="488" width="54" height="64" fill="none"
          stroke="var(--province-stroke)" stroke-width=".5"
          stroke-dasharray="3,3" rx="2" opacity=".4"/>
        <text x="665" y="524" fill="var(--text-muted)" font-size="5"
          text-anchor="middle" pointer-events="none" opacity=".5">南海诸岛</text>
      </svg>

      <div id="map-active-strip" style="margin-top:8px">
        <div id="map-pill" class="map-pill" style="display:none">
          <span class="map-pill-zh" id="map-zh"></span>
          <span class="map-pill-en" id="map-en"></span>
          <span class="map-pill-btn" onclick="scrollToSection('cities-section')">→ See city guide</span>
        </div>
      </div>
    </div>
  </section>`;

  document.getElementById('map-container').innerHTML = html;

  // Re-attach map SVG mousemove listener after injection
  const svg = document.getElementById('china-map-svg');
  if (svg) {
    svg.addEventListener('mousemove', e => {
      if (document.getElementById('prov-tip').style.display === 'block') {
        moveTip(e);
      }
    });
  }
}

loadMap();