/* ============================================================
 *  🐾 KAT DESK PET — 网站版"桌宠"（Ready? China!）
 *  ------------------------------------------------------------
 *  效果：右下角固定 Kat，待机摇摆、随机挥手/卖萌、闲置打瞌睡、
 *        点击弹出快捷菜单（WhatsApp / 搜索 / Ready Score / 收起）。
 *  纯前端、GitHub Pages 直接跑、零后端。
 *
 *  升级为"真·多帧动画"（像 Codex 桌宠那样会睡觉/比心）：
 *   1) 让 ChatGPT 生成 Kat 的 5 张动作帧（同形象同配色、512×512），
 *      放进 assets/kat/：kat-idle.png / kat-wave.png / kat-heart.png /
 *      kat-sleep.png / kat-cute.png
 *   2) 取消本文件里 KAT_FRAMES 的注释、改成你的路径即可，
 *      其余代码一行都不用动。
 * ============================================================ */
(function () {
  'use strict';

  // 避免重复注入
  if (document.getElementById('kat-pet')) return;

  // ── 0. 根路径探测（内页: /visa/, /alipay/… 的 assets 相对路径会 404）──
  // nav.js 在内页动态注入本脚本时会带 data-root="../"；
  // 首页静态引入时 src="assets/kat-pet.js"，相对路径本身就能用。
  var RC_ROOT = '';
  (function () {
    var s = document.currentScript || document.querySelector('script[src*="kat-pet.js"]');
    var attr = s && s.getAttribute('data-root');
    if (attr !== null && attr !== undefined) { RC_ROOT = attr; return; }
    if (s && s.src) {
      var m = s.src.match(/^(.*?assets\/)kat-pet\.js/);
      if (m) RC_ROOT = m[1]; // "../" on inner pages, "" at site root
    }
  })();

  // ── 1. 动作帧（已接入 ChatGPT 生成的 6 帧素材）────
  var FALLBACK = (window.RC_CONFIG && RC_CONFIG.katAvatar) || RC_ROOT + 'assets/kat-avatar.PNG';
  var KAT_FRAMES = {
    idle:  RC_ROOT + 'assets/kat/kat-idle.png',
    wave:  RC_ROOT + 'assets/kat/kat-wave.png',
    jump:  RC_ROOT + 'assets/kat/kat-jump.png',
    sleep: RC_ROOT + 'assets/kat/kat-sleep.png',
    cute:  RC_ROOT + 'assets/kat/kat-cute.png',
    wait:  RC_ROOT + 'assets/kat/kat-wait.png'
  };

  // ── 2. 行为参数 ──────────────────────────────────────────
  var IDLE_AFTER  = 30000;  // 30s 无操作 → 打瞌睡
  var ACTION_MIN  = 6000;   // 随机小动作最短间隔(ms)
  var ACTION_MAX  = 14000;  // 随机小动作最长间隔(ms)
  var ACTION_HOLD = 1600;   // 小动作持续(ms)后回 idle

  // ── 3. 快捷菜单 ─────────────────────────────────────────
  function waLink() {
    var num = (window.RC_CONFIG && RC_CONFIG.whatsappNumber) || '8613799200367';
    var txt = encodeURIComponent("Hi Kat! I'm on your site and have a question.");
    return 'https://wa.me/' + num + '?text=' + txt;
  }
    var MENU = [
    { icon: '💬', label: 'Chat with Kat', href: waLink(), target: '_blank' },
    { icon: '🔍', label: 'Search guides', href: 'https://www.readychinatravel.com/guides.html' },
    { icon: '✅', label: 'Ready Score',    href: 'https://www.readychinatravel.com/index.html#ready-section' },
    { icon: '🙈', label: 'Hide Kat',       action: 'hide' }
  ];

  // ── 4. 创建 DOM ─────────────────────────────────────────
    // ── 4. 创建 DOM ─────────────────────────────────────────
  var pet = document.createElement('div');
  pet.id = 'kat-pet';
  pet.style.position = 'fixed';
  pet.style.bottom = '18px';
  pet.style.right = '18px';
  pet.style.zIndex = '9999';
  pet.style.width = '84px';
  pet.style.lineHeight = '0';
  pet.style.cursor = 'pointer';
  pet.setAttribute('role','button');
  pet.setAttribute('aria-label','Kat, your travel assistant');

  pet.innerHTML =
    '<div class="kat-pet-imgwrap">' +
      '<img class="kat-pet-img" src="' + KAT_FRAMES.idle + '" alt="Kat">' +
      '<span class="kat-pet-badge">1</span>' +
      '<div class="kat-pet-hearts"></div>' +
    '</div>' +
    '<div class="kat-pet-bubble hidden">' +
      '<button class="kat-pet-bubble-close" aria-label="Close">&times;</button>' +
      '<div class="kat-pet-bubble-title">Hi, I\'m Kat 👋</div>' +
      '<div class="kat-pet-bubble-body">Your friend in China. Need a hand getting ready?</div>' +
    '</div>' +
    '<div class="kat-pet-menu hidden">' +
      MENU.map(function (m, i) {
        return '<a class="kat-pet-menu-item" data-i="' + i + '" href="' +
          (m.href || '#') + '"' +
          (m.target ? ' target="' + m.target + '" rel="noopener"' : '') + '>' +
          '<span class="kat-pet-menu-icon">' + m.icon + '</span>' +
          '<span class="kat-pet-menu-label">' + m.label + '</span></a>';
      }).join('') +
    '</div>';
  document.body.appendChild(pet);

  var img    = pet.querySelector('.kat-pet-img');
  var badge  = pet.querySelector('.kat-pet-badge');
  var bubble = pet.querySelector('.kat-pet-bubble');
  var menu   = pet.querySelector('.kat-pet-menu');
  var hearts = pet.querySelector('.kat-pet-hearts');

    // 隐藏旧版 WhatsApp 浮动按钮（功能已收进菜单）
  var oldBtn = document.getElementById('rc-whatsapp-btn');
  if (oldBtn) { oldBtn.style.display = 'none'; oldBtn.style.visibility = 'hidden'; }
  // 兜底：把所有可能的 WhatsApp 浮动按钮类名也隐藏
  document.querySelectorAll('#rc-whatsapp-btn, .rc-whatsapp-btn, .whatsapp-float').forEach(function(b){
    b.style.display = 'none'; b.style.visibility = 'hidden';
  });

  // ── 5. 状态机 ───────────────────────────────────────────
  var state = 'idle';
  var lastActivity = Date.now();

  function setState(next) {
    if (state === next) return;
    state = next;
    img.src = KAT_FRAMES[next] || FALLBACK;
    pet.classList.toggle('kat-sleep', next === 'sleep');
    pet.classList.toggle('kat-wave', next === 'wave' || next === 'jump');
    pet.classList.toggle('kat-cute', next === 'cute');
    pet.classList.toggle('kat-wait', next === 'wait');
  }

  function wake() {
    lastActivity = Date.now();
    if (state === 'sleep') setState('idle');
  }

  // 随机小动作：wave / jump / cute
  function scheduleAction() {
    var delay = ACTION_MIN + Math.random() * (ACTION_MAX - ACTION_MIN);
    setTimeout(function () {
      if (state === 'idle') {
        var r = Math.random();
        var pick = r < 0.4 ? 'wave' : (r < 0.7 ? 'jump' : 'cute');
        setState(pick);
        setTimeout(function () { if (state === pick) setState('idle'); }, ACTION_HOLD);
      }
      scheduleAction();
    }, delay);
  }
  scheduleAction();

  // 闲置检测 → 打瞌睡
  setInterval(function () {
    if (state !== 'sleep' && Date.now() - lastActivity > IDLE_AFTER) {
      setState('sleep');
    }
  }, 2000);

  // ── 6. 互动 ─────────────────────────────────────────────
  // 点击 Kat → 弹菜单 + 冒爱心 + 切换等待表情
  pet.addEventListener('click', function (e) {
    if (e.target.closest('.kat-pet-menu-item')) return; // 菜单项单独处理
    wake();
    popHearts();
    var opening = menu.classList.contains('hidden');
    bubble.classList.add('hidden');
    menu.classList.toggle('hidden');
    if (opening) {
      setState('wait');
    } else {
      setState('wave');
      setTimeout(function () { if (state === 'wave') setState('idle'); }, ACTION_HOLD);
    }
  });

  // 菜单项点击
  menu.addEventListener('click', function (e) {
    var item = e.target.closest('.kat-pet-menu-item');
    if (!item) return;
    var m = MENU[+item.dataset.i];
    if (m.action === 'hide') {
      e.preventDefault();
      pet.classList.add('kat-hidden');
      try { localStorage.setItem('kat_pet_hidden', '1'); } catch (err) {}
    }
    menu.classList.add('hidden');
    setState('idle');
  });

  // 点页面其他地方 → 关菜单 + 回 idle
  document.addEventListener('click', function (e) {
    if (pet.contains(e.target)) return;
    if (!menu.classList.contains('hidden')) {
      menu.classList.add('hidden');
      setState('idle');
    }
  });

  // 冒爱心
  function popHearts() {
    var h = document.createElement('span');
    h.className = 'kat-heart-pop';
    h.textContent = '❤';
    hearts.appendChild(h);
    setTimeout(function () { h.remove(); }, 900);
  }

  // 气泡关闭
  pet.querySelector('.kat-pet-bubble-close').addEventListener('click', function (e) {
    e.stopPropagation();
    bubble.classList.add('hidden');
  });

  // 用户活动 → 唤醒
  ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'].forEach(function (ev) {
    window.addEventListener(ev, wake, { passive: true });
  });

  // 首次访问：显示欢迎气泡 10s（仅一次）
  try {
    if (!localStorage.getItem('kat_pet_hidden') && !localStorage.getItem('kat_bubble_seen')) {
      bubble.classList.remove('hidden');
      localStorage.setItem('kat_bubble_seen', '1');
      setTimeout(function () { bubble.classList.add('hidden'); }, 10000);
    }
  } catch (err) {}

  // 之前藏过 → 不再显示
  try { if (localStorage.getItem('kat_pet_hidden')) pet.classList.add('kat-hidden'); } catch (err) {}

  // ── 7. 简单情境感知：滚动到 Ready Score 区域时提醒一次 ──
  var rsTarget = document.querySelector('#ready-score, [data-ready-score], a[href*="getready"]');
  if (rsTarget) {
    var rsShown = false;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !rsShown) {
            rsShown = true;
            bubble.querySelector('.kat-pet-bubble-title').textContent = 'Ready Score time? ✅';
            bubble.querySelector('.kat-pet-bubble-body').textContent = '17 steps to get China-ready. Start now →';
            bubble.classList.remove('hidden');
            setState('wave');
            setTimeout(function () {
              bubble.classList.add('hidden');
              if (state === 'wave') setState('idle');
            }, 6000);
          }
        });
      }, { threshold: 0.4 });
      io.observe(rsTarget);
    }
  }

})();
