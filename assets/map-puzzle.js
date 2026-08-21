// ============================================================
//  assets/map-puzzle.js — Pin the Province (standalone game)
//
//  Self-contained: does NOT depend on map.js. Used by the
//  dedicated game page /play/map/index.html (and anywhere you
//  drop <div id="puzzle-arena"> + a #puzzle-map svg wrapper).
//
//  Usage:
//    initPinTheProvince({ svgUrl, arenaId })
//      svgUrl   — path to china-Map.svg (relative to the PAGE)
//      arenaId  — id of the div that hosts game controls/results
//
//  XP is stored in localStorage 'rc_puzzle_xp' — the same key
//  the map page reads, so game progress feeds the Explorer level.
//
//  Three modes:
//  • learn  — auto-tour, highlights provinces one by one
//  • easy   — "Spot the Province": tap the named province on
//             the map. Name + landmark icon shown. +10 XP each.
//  • hard   — same as easy, 10s per question, no landmark hint.
// ============================================================

(function () {
  'use strict';

  // ── PROVINCE DATA (same ids as map.js; idx = path order in china-Map.svg) ──
  const PROVINCES = [
    {idx:0,  id:'beijing',        zh:'北京', en:'Beijing',        region:'north', lx:488, ly:143,
     desc:"China's capital. Great Wall, Forbidden City, Tiananmen. Essential first stop."},
    {idx:1,  id:'tianjin',        zh:'天津', en:'Tianjin',        region:'north', lx:500, ly:157,
     desc:'Historic port city near Beijing. European architecture, famous Goubuli buns.'},
    {idx:2,  id:'hebei',          zh:'河北', en:'Hebei',          region:'north', lx:476, ly:168,
     desc:'Surrounds Beijing & Tianjin. Chengde Summer Palace, Zhangjiakou ski mountains.'},
    {idx:3,  id:'shanxi',         zh:'山西', en:'Shanxi',         region:'north', lx:449, ly:178,
     desc:'Ancient culture. Pingyao old city (UNESCO), Yungang Grottoes.'},
    {idx:4,  id:'inner-mongolia', zh:'内蒙古',en:'Inner Mongolia', region:'north', lx:430, ly:102,
     desc:'Vast steppes, nomadic culture, horse riding, incredible starry skies.'},
    {idx:5,  id:'liaoning',       zh:'辽宁', en:'Liaoning',       region:'north', lx:546, ly:143,
     desc:"Dalian's coastline, Shenyang Imperial Palace. Gateway to Northeast China."},
    {idx:6,  id:'jilin',          zh:'吉林', en:'Jilin',          region:'north', lx:575, ly:116,
     desc:'Changchun & Jilin City. Ski resorts, rime ice scenery, Korean cultural heritage.'},
    {idx:7,  id:'heilongjiang',   zh:'黑龙江',en:'Heilongjiang',   region:'north', lx:578, ly:65,
     desc:"China's northernmost province. Ice & Snow Festival, Siberian tigers, vast forests."},
    {idx:8,  id:'shanghai',       zh:'上海', en:'Shanghai',       region:'east', lx:532, ly:230,
     desc:"China's global metropolis. Iconic Bund, world-class dining, fashion."},
    {idx:9,  id:'jiangsu',        zh:'江苏', en:'Jiangsu',        region:'east', lx:513, ly:212,
     desc:"Suzhou gardens, Nanjing history, water towns — China's Venice."},
    {idx:10, id:'zhejiang',       zh:'浙江', en:'Zhejiang',       region:'east', lx:527, ly:246,
     desc:"Hangzhou West Lake, tea culture, water towns. Alibaba's home."},
    {idx:11, id:'anhui',          zh:'安徽', en:'Anhui',          region:'east', lx:499, ly:224,
     desc:'Yellow Mountain (Huangshan) — the most photographed peak in China.'},
    {idx:12, id:'fujian',         zh:'福建', en:'Fujian',         region:'east', lx:508, ly:273,
     desc:"Tea country, Tulou buildings, Quanzhou Maritime Silk Road. K's hometown!"},
    {idx:13, id:'jiangxi',        zh:'江西', en:'Jiangxi',        region:'east', lx:487, ly:261,
     desc:'Jingdezhen porcelain, Lushan Mountain, Wuyuan golden fields.'},
    {idx:14, id:'shandong',       zh:'山东', en:'Shandong',       region:'north', lx:511, ly:185,
     desc:'Birthplace of Confucius. Mount Tai, Qingdao beer, beautiful coastline.'},
    {idx:15, id:'henan',          zh:'河南', en:'Henan',          region:'north', lx:475, ly:207,
     desc:'Heart of ancient China. Shaolin Temple, Longmen Grottoes, Yellow River.'},
    {idx:16, id:'hubei',          zh:'湖北', en:'Hubei',          region:'south', lx:460, ly:232,
     desc:'Three Gorges Dam, Wuhan, Yangtze River heartland.'},
    {idx:17, id:'hunan',          zh:'湖南', en:'Hunan',          region:'south', lx:458, ly:263,
     desc:"Avatar Mountains (Zhangjiajie), Mao's birthplace, fiercely spicy cuisine."},
    {idx:18, id:'guangdong',      zh:'广东', en:'Guangdong',      region:'south', lx:480, ly:297,
     desc:'Shenzhen tech hub, Cantonese cuisine, Pearl River Delta, dim sum culture.'},
    {idx:19, id:'guangxi',        zh:'广西', en:'Guangxi',        region:'south', lx:434, ly:290,
     desc:"Guilin's karst mountains & Li River cruise. Zhuang ethnic culture."},
    {idx:20, id:'hainan',         zh:'海南', en:'Hainan',         region:'south', lx:448, ly:360,
     desc:"China's tropical paradise. Sanya beaches, palm trees, duty-free shopping."},
    {idx:21, id:'chongqing',      zh:'重庆', en:'Chongqing',      region:'west', lx:428, ly:241,
     desc:'Mountain megacity. Hotpot capital, cyberpunk skyline, Three Gorges cruise.'},
    {idx:22, id:'sichuan',        zh:'四川', en:'Sichuan',        region:'west', lx:393, ly:235,
     desc:'Panda paradise! Spicy food, Jiuzhaigou lakes, Leshan Giant Buddha.'},
    {idx:23, id:'guizhou',        zh:'贵州', en:'Guizhou',        region:'south', lx:423, ly:266,
     desc:'Hidden waterfalls, Huangguoshu Falls, Miao & Dong ethnic culture.'},
    {idx:24, id:'yunnan',         zh:'云南', en:'Yunnan',         region:'south', lx:385, ly:278,
     desc:'Lijiang, Shangri-La, rice terraces, 25 ethnic groups. Backpacker paradise.'},
    {idx:25, id:'tibet',          zh:'西藏', en:'Tibet',          region:'west', lx:291, ly:228,
     desc:'Potala Palace, Mt. Everest Base Camp. The roof of the world.'},
    {idx:26, id:'shaanxi',        zh:'陕西', en:'Shaanxi',        region:'west', lx:436, ly:195,
     desc:"Terracotta Army, ancient Xi'an. The Silk Road begins here!"},
    {idx:27, id:'gansu',          zh:'甘肃', en:'Gansu',          region:'west', lx:374, ly:165,
     desc:'Silk Road corridor. Dunhuang Mogao Caves, Rainbow Mountains, Jiayuguan Fort.'},
    {idx:28, id:'qinghai',        zh:'青海', en:'Qinghai',        region:'west', lx:342, ly:196,
     desc:'Qinghai Lake, Tibetan plateau, breathtaking high-altitude scenery.'},
    {idx:29, id:'ningxia',        zh:'宁夏', en:'Ningxia',        region:'north', lx:422, ly:178,
     desc:'Desert meets oasis. Shapotou sand dunes, Hui Muslim culture.'},
    {idx:30, id:'xinjiang',       zh:'新疆', en:'Xinjiang',       region:'west', lx:252, ly:142,
     desc:"China's largest region. Taklamakan Desert, Silk Road oases, Kashgar bazaar."}
  ];

  const LANDMARK = {
    beijing:'🏯', tianjin:'🌊', hebei:'🐉', shanxi:'🏮',
    'inner-mongolia':'🐎', liaoning:'⚓', jilin:'⛷️', heilongjiang:'❄️',
    shanghai:'🌃', jiangsu:'🏛️', zhejiang:'🍵', anhui:'⛰️',
    fujian:'🏮', jiangxi:'🏺', shandong:'🍺', henan:'🏛️',
    hubei:'🌉', hunan:'🏞️', guangdong:'🍜', guangxi:'🏔️',
    hainan:'🌴', chongqing:'🔥', sichuan:'🐼', guizhou:'💧',
    yunnan:'🌸', tibet:'⛰️', shaanxi:'🏺', gansu:'🕌',
    qinghai:'🐦', ningxia:'🐪', xinjiang:'🕌'
  };
  const REGION_COLOR = { north:'#378ADD', east:'#1D9E75', west:'#BA7517', south:'#D85A30' };

  let state = {
    svg: null,
    provEls: {},          // id -> <path>
    arena: null,
    mode: 'easy',
    loaded: false
  };

  function shuffle(a) { return a.slice().sort(() => Math.random() - 0.5); }

  function addXp(n) {
    const cur = parseInt(localStorage.getItem('rc_puzzle_xp') || '0', 10);
    localStorage.setItem('rc_puzzle_xp', String(cur + n));
  }
  function getXp() { return parseInt(localStorage.getItem('rc_puzzle_xp') || '0', 10); }

  function toast(msg) {
    let t = document.getElementById('puzzle-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'puzzle-toast';
      t.className = 'pz-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2200);
  }

  // ── INIT: fetch SVG, annotate provinces, wire UI ───────────
  function initPinTheProvince(opts) {
    opts = opts || {};
    const svgUrl = opts.svgUrl || '../assets/china-Map.svg';
    state.arena = document.getElementById(opts.arenaId || 'puzzle-arena');
    const wrap = document.getElementById(opts.mapId || 'puzzle-map');

    if (!wrap) { console.warn('Pin the Province: no map wrapper element found.'); return; }
    if (!state.arena) { console.warn('Pin the Province: no arena element found.'); return; }

    fetch(svgUrl)
      .then(r => { if (!r.ok) throw new Error('SVG fetch failed ' + r.status); return r.text(); })
      .then(txt => {
        const doc = new DOMParser().parseFromString(txt, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        if (!svg) throw new Error('No <svg> found');
        svg.setAttribute('id', 'puzzle-svg');
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('viewBox', svg.getAttribute('viewBox') || '0 0 640 400');
        doc.querySelectorAll('style, text').forEach(n => n.remove());

        const paths = Array.from(svg.querySelectorAll('path'));
        PROVINCES.forEach(p => {
          const el = paths[p.idx];
          if (!el) return;
          el.setAttribute('id', 'pz-' + p.id);
          el.setAttribute('class', 'pz-prov');
          el.setAttribute('data-en', p.en);
          el.setAttribute('data-zh', p.zh);
          el.setAttribute('data-region', p.region);
          el.setAttribute('data-desc', p.desc);
          state.provEls[p.id] = el;
        });
        // decorative paths: Taiwan(31) HK(32) Macau(33) South Sea(34) — keep compliant
        [31, 32, 33, 34].forEach(i => {
          const el = paths[i];
          if (el) el.setAttribute('class', 'pz-prov pz-decor');
        });

        wrap.innerHTML = '';
        wrap.appendChild(svg);
        state.svg = svg;
        state.loaded = true;

        // province hover tooltip
        svg.querySelectorAll('.pz-prov:not(.pz-decor)').forEach(el => {
          el.addEventListener('mousemove', function (e) { showTip(e, this); });
          el.addEventListener('mouseleave', hideTip);
        });

        // mode buttons
        const btns = document.querySelectorAll('[data-pz-mode]');
        btns.forEach(b => {
          b.addEventListener('click', () => {
            btns.forEach(x => x.classList.remove('on'));
            b.classList.add('on');
            state.mode = b.dataset.pzMode;
          });
        });
        const startBtn = document.getElementById('pz-start');
        if (startBtn) startBtn.addEventListener('click', () => startPuzzle(state.mode));

        // XP display
        const xpEl = document.getElementById('pz-xp');
        if (xpEl) xpEl.innerHTML = getXp() + ' <small>XP</small>';

        // landing state
        if (state.arena) state.arena.innerHTML = arenaWelcome();
        toast('🗺️ Map ready — pick a mode and hit Start!');
      })
      .catch(err => {
        console.error('Pin the Province:', err);
        if (wrap) wrap.innerHTML = '<p style="padding:40px;text-align:center;color:#9a9a93">Map failed to load — please open this page via a local server or the live site.</p>';
      });
  }

  // ── TOOLTIP ────────────────────────────────────────────────
  let tipEl = null;
  function ensureTip() {
    if (tipEl) return tipEl;
    tipEl = document.createElement('div');
    tipEl.className = 'pz-tip';
    document.body.appendChild(tipEl);
    return tipEl;
  }
  function showTip(e, el) {
    const t = ensureTip();
    t.innerHTML = '<b>' + el.dataset.en + ' ' + (LANDMARK[el.id.replace('pz-','')] || '') + '</b>' +
      '<span>' + el.dataset.zh + ' · ' + el.dataset.desc + '</span>';
    t.style.opacity = 1;
    let x = e.clientX + 16, y = e.clientY - 10;
    if (x + 240 > window.innerWidth) x = e.clientX - 245;
    if (y + 90 > window.innerHeight) y = e.clientY - 95;
    t.style.left = x + 'px';
    t.style.top = y + 'px';
  }
  function hideTip() {
    if (tipEl) tipEl.style.opacity = 0;
  }

  // ── LANDING (before first play) ────────────────────────────
  function arenaWelcome() {
    return '<div class="pz-welcome">' +
      '<div class="pz-welcome-em">🧩</div>' +
      '<div class="pz-welcome-t">Spot the Province</div>' +
      '<div class="pz-welcome-s">A province name appears — tap it on the map. Names &amp; landmark icons are always shown (except Hard), so anyone can play. <b>+10 XP per correct answer.</b></div>' +
      '</div>';
  }

  // ── GAME CORE ──────────────────────────────────────────────
  function startPuzzle(mode) {
    if (!state.loaded || !state.arena) { toast('Map still loading — one second!'); return; }
    const arena = state.arena;
    const pool = shuffle(PROVINCES).slice(0, 8);
    if (mode === 'learn') return runLearn(arena, pool);

    const timed = mode === 'hard';
    let i = 0, correct = 0;
    let handlers = [];
    let timerInt = null;

    arena.classList.add('playing');
    renderHud();
    renderQ();

    function cur() { return pool[i]; }

    function renderHud() {
      arena.innerHTML =
        '<div class="pz-hud">' +
          '<span class="pz-prog">Q 1/' + pool.length + '</span>' +
          '<span class="pz-correct">✓ 0</span>' +
          (timed ? '<span class="pz-time">⏱ 10</span>' : '') +
        '</div>' +
        '<div class="pz-q"></div>' +
        '<div class="pz-fb"></div>' +
        '<button class="pz-quit" type="button">Quit</button>';
      const q = arena.querySelector('.pz-quit');
      if (q) q.addEventListener('click', finish, { once: true });
    }

    function renderQ() {
      if (i >= pool.length) return finish();
      const p = cur();
      const prog = arena.querySelector('.pz-prog');
      const corr = arena.querySelector('.pz-correct');
      if (prog) prog.textContent = 'Q ' + (i + 1) + '/' + pool.length;
      if (corr) corr.textContent = '✓ ' + correct;
      const lm = LANDMARK[p.id] || '🗺️';
      const icon = timed ? '' : lm;
      const q = arena.querySelector('.pz-q');
      if (q) q.innerHTML =
        '<span class="pz-q-em">' + icon + '</span>' +
        '<span class="pz-q-tx">Tap <b>' + p.en + '</b> on the map</span>';
      const fb = arena.querySelector('.pz-fb');
      if (fb) { fb.textContent = ''; fb.className = 'pz-fb'; }
      attach();
      if (timed) startTimer();
    }

    function attach() {
      detach();
      Object.keys(state.provEls).forEach(id => {
        const el = state.provEls[id];
        if (!el) return;
        const h = function (ev) {
          ev.stopPropagation();
          if (id === cur().id) {
            correct++;
            addXp(10);
            fb('✓ Correct! +10 XP', 'ok');
            flash(el, 'ok');
            detach();
            i++;
            setTimeout(renderQ, 950);
          } else {
            fb('✗ Not ' + cur().en + ' — try again', 'no');
            flash(el, 'no');
          }
        };
        el.addEventListener('click', h, false);
        handlers.push({ el: el, h: h });
      });
    }
    function detach() {
      handlers.forEach(o => o.el.removeEventListener('click', o.h));
      handlers = [];
      clearInterval(timerInt);
      timerInt = null;
    }
    function flash(el, kind) {
      el.classList.add('pz-flash-' + kind);
      setTimeout(() => el.classList.remove('pz-flash-' + kind), 700);
    }
    function fb(t, kind) {
      const f = arena.querySelector('.pz-fb');
      if (!f) return;
      f.textContent = t;
      f.className = 'pz-fb ' + kind;
    }
    function startTimer() {
      clearInterval(timerInt);
      let t = 10;
      const el = arena.querySelector('.pz-time');
      if (el) el.textContent = '⏱ ' + t;
      timerInt = setInterval(() => {
        t--;
        if (el) el.textContent = '⏱ ' + Math.max(0, t);
        if (t <= 0) {
          clearInterval(timerInt);
          timerInt = null;
          fb('⏱ Time! It was ' + cur().en, 'no');
          detach();
          i++;
          setTimeout(renderQ, 1300);
        }
      }, 1000);
    }

    function finish() {
      detach();
      arena.classList.remove('playing');
      const r = correct / pool.length;
      const medal = r >= 0.875 ? '🏆' : r >= 0.625 ? '🐉' : r >= 0.375 ? '🐼' : '🐣';
      const rank = r >= 0.875 ? 'China Legend' : r >= 0.625 ? 'China Master' :
                   r >= 0.375 ? 'China Explorer' : 'China Rookie';
      arena.innerHTML =
        '<div class="pz-result">' +
          '<div class="pz-medal">' + medal + '</div>' +
          '<div class="pz-score">' + correct + ' / ' + pool.length + ' correct</div>' +
          '<div class="pz-rank">' + rank + '</div>' +
          '<button class="pz-again" type="button">Play again</button>' +
        '</div>';
      const again = arena.querySelector('.pz-again');
      if (again) again.addEventListener('click', function () { startPuzzle(state.mode); }, { once: true });
      const xpEl = document.getElementById('pz-xp');
      if (xpEl) xpEl.innerHTML = getXp() + ' <small>XP</small>';
      toast('🎮 ' + correct + '/' + pool.length + ' · +' + (correct * 10) + ' XP');
    }

    // ── LEARN MODE: auto-tour ────────────────────────────────
    function runLearn(arena, pool) {
      let li = 0, tour = null, stopped = false;
      arena.classList.add('playing');
      step();
      function step() {
        if (stopped) return;
        if (li >= pool.length) return finishLearn();
        const p = pool[li];
        Object.keys(state.provEls).forEach(id => state.provEls[id].classList.remove('pz-active'));
        const el = state.provEls[p.id];
        if (el) el.classList.add('pz-active');
        arena.innerHTML =
          '<div class="pz-learn">' +
            '<div class="pz-learn-em">' + (LANDMARK[p.id] || '🗺️') + '</div>' +
            '<div class="pz-learn-zh">' + p.zh + '</div>' +
            '<div class="pz-learn-en">' + p.en + ' · ' + p.region.charAt(0).toUpperCase() + p.region.slice(1) + '</div>' +
            '<div class="pz-learn-desc">' + p.desc + '</div>' +
            '<div class="pz-learn-prog">' + (li + 1) + ' / ' + pool.length + '</div>' +
            '<button class="pz-next" type="button">Next →</button>' +
            '<button class="pz-quit" type="button">Done</button>' +
          '</div>';
        arena.querySelector('.pz-next').addEventListener('click', function () { clearTimeout(tour); li++; step(); }, { once: true });
        arena.querySelector('.pz-quit').addEventListener('click', function () { stopped = true; finishLearn(); }, { once: true });
        tour = setTimeout(function () { li++; step(); }, 4500);
      }
      function finishLearn() {
        clearTimeout(tour);
        Object.keys(state.provEls).forEach(id => state.provEls[id].classList.remove('pz-active'));
        arena.classList.remove('playing');
        arena.innerHTML =
          '<div class="pz-result">' +
            '<div class="pz-medal">🌱</div>' +
            '<div class="pz-score">Tour done!</div>' +
            '<div class="pz-rank">Now try Easy — tap the named province on the map.</div>' +
            '<button class="pz-again" type="button">Start Easy</button>' +
          '</div>';
        const again = arena.querySelector('.pz-again');
        if (again) again.addEventListener('click', function () { startPuzzle('easy'); }, { once: true });
      }
    }
  }

  // expose
  window.initPinTheProvince = initPinTheProvince;
  window.startPuzzle = startPuzzle;
})();
