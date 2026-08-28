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
      // s.src 是浏览器解析后的绝对 URL（如 https://…/assets/kat-pet.js），
      // 只取 pathname 里 assets/ 之前的部分，避免把域名整个吞进 RC_ROOT
      // 导致 "assets/assets/..." 双重路径 404（首页静态引入时的坑）。
      try {
        var p = new URL(s.src, window.location.href).pathname;
        var m = p.match(/^(.*)assets\/kat-pet\.js/);
        if (m) RC_ROOT = m[1]; // "/" at site root, "/visa/" on inner pages
      } catch (err) {}
    }
  })();

  // ── 1. 动作帧（已接入 ChatGPT 生成的 10 帧素材）────
  var FALLBACK = (window.RC_CONFIG && RC_CONFIG.katAvatar) || RC_ROOT + 'assets/kat-avatar.PNG';
  var KAT_FRAMES = {
    idle:  RC_ROOT + 'assets/kat/kat-idle.png',
    wave:  RC_ROOT + 'assets/kat/kat-wave.png',
    jump:  RC_ROOT + 'assets/kat/kat-jump.png',
    sleep: RC_ROOT + 'assets/kat/kat-sleep.png',
    cute:  RC_ROOT + 'assets/kat/kat-cute.png',
    wait:  RC_ROOT + 'assets/kat/kat-wait.png',
    map:   RC_ROOT + 'assets/kat/kat-map.png',
    curiosity:   RC_ROOT + 'assets/kat/kat-curiosity.png',
    eat:   RC_ROOT + 'assets/kat/kat-eat.png',
    lungaage:   RC_ROOT + 'assets/kat/kat-lungaage.png'
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
  var PET_SIZE  = 84;
  var PET_MARGIN = 18;
  var pet = document.createElement('div');
  pet.id = 'kat-pet';
  pet.style.position = 'fixed';
  pet.style.zIndex = '9999';
  pet.style.width = PET_SIZE + 'px';
  pet.style.lineHeight = '0';
  pet.style.cursor = 'grab';
  pet.style.touchAction = 'none'; // 移动端拖动时不触发页面滚动
  pet.style.transition = 'left .25s cubic-bezier(.2,.8,.3,1), top .25s cubic-bezier(.2,.8,.3,1)';
  pet.setAttribute('role','button');
  pet.setAttribute('aria-label','Kat, your travel assistant');

  // 初始位置：localStorage → 默认右下角
  function petDefaultPos() {
    return {
      left: Math.max(window.innerWidth  - PET_SIZE - PET_MARGIN, PET_MARGIN),
      top:  Math.max(window.innerHeight - PET_SIZE - PET_MARGIN, PET_MARGIN)
    };
  }
  function petClamp(left, top) {
    left = Math.max(PET_MARGIN, Math.min(left, window.innerWidth  - PET_SIZE - PET_MARGIN));
    top  = Math.max(PET_MARGIN, Math.min(top,  window.innerHeight - PET_SIZE - PET_MARGIN));
    return { left: left, top: top };
  }
  function petSetPos(left, top) {
    pet.style.left = left + 'px';
    pet.style.top  = top + 'px';
    pet.style.right = 'auto';
    pet.style.bottom = 'auto';
  }
  function petSnap(left, top) {
    // 吸附到最近的左/右边缘；垂直位置保留
    var mid = window.innerWidth / 2;
    var snapped = (left + PET_SIZE / 2) < mid ? PET_MARGIN : (window.innerWidth - PET_SIZE - PET_MARGIN);
    return { left: snapped, top: top };
  }
  function petSavePos(left, top) {
    try { localStorage.setItem('kat_pet_pos', JSON.stringify({ left: left, top: top })); } catch (e) {}
  }
  function petRestorePos() {
    try {
      var raw = localStorage.getItem('kat_pet_pos');
      if (raw) {
        var p = JSON.parse(raw);
        var c = petClamp(p.left, p.top);
        petSetPos(c.left, c.top);
        return;
      }
    } catch (e) {}
    var d = petDefaultPos();
    petSetPos(d.left, d.top);
  }
  petRestorePos();
  // 窗口缩放 → 保留相对位置
  window.addEventListener('resize', function () {
    var c = petClamp(parseFloat(pet.style.left) || 0, parseFloat(pet.style.top) || 0);
    petSetPos(c.left, c.top);
  });

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
    if (state === 'sleep') setState(baseState());
  }

  // 随机小动作：wave / jump / cute
  function scheduleAction() {
    var delay = ACTION_MIN + Math.random() * (ACTION_MAX - ACTION_MIN);
    setTimeout(function () {
      if (state === 'idle') {
        var r = Math.random();
        var pick = r < 0.4 ? 'wave' : (r < 0.7 ? 'jump' : 'cute');
        setState(pick);
        setTimeout(function () { if (state === pick) setState(baseState()); }, ACTION_HOLD);
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
  // Pointer Events：拖动 + 点击统一。位移 > 6px 算拖动，< 6px 算点击（弹菜单）。
  var DRAG_THRESHOLD = 6;
  var dragging = false, moved = false, dragStartX = 0, dragStartY = 0, dragOrigL = 0, dragOrigT = 0;

  function onPointerDown(e) {
    if (e.target.closest('.kat-pet-menu')) return; // 菜单区域不拖
    if (e.button !== undefined && e.button !== 0) return; // 只响应主键
    dragging = true; moved = false;
    dragStartX = e.clientX; dragStartY = e.clientY;
    dragOrigL = parseFloat(pet.style.left) || 0;
    dragOrigT = parseFloat(pet.style.top)  || 0;
    try { pet.setPointerCapture(e.pointerId); } catch (err) {}
    e.preventDefault();
  }

  function onPointerMove(e) {
    if (!dragging) return;
    var dx = e.clientX - dragStartX, dy = e.clientY - dragStartY;
    if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      moved = true;
      pet.style.cursor = 'grabbing';
      pet.style.transition = 'none';
      pet.classList.add('kat-dragging');
      menu.classList.add('hidden');
      img.src = KAT_FRAMES.cute || FALLBACK; // 被拎起来 → 卖萌
    }
    if (moved) {
      var c = petClamp(dragOrigL + dx, dragOrigT + dy);
      pet.style.left = c.left + 'px';
      pet.style.top  = c.top + 'px';
    }
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    pet.style.cursor = 'grab';
    pet.style.transition = 'left .25s cubic-bezier(.2,.8,.3,1), top .25s cubic-bezier(.2,.8,.3,1)';
    pet.classList.remove('kat-dragging');
    try { pet.releasePointerCapture(e.pointerId); } catch (err) {}
    if (moved) {
      // 松手 → 吸附 + 存位置
      var left = parseFloat(pet.style.left) || 0;
      var top  = parseFloat(pet.style.top)  || 0;
      var fin = petSnap(left, top);
      fin = petClamp(fin.left, fin.top);
      petSetPos(fin.left, fin.top);
      petSavePos(fin.left, fin.top);
      setState('idle');
    } else {
      // 没移动 → 当作点击：弹菜单
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
    }
  }

  function onPointerCancel() {
    if (!dragging) return;
    dragging = false; moved = false;
    pet.style.cursor = 'grab';
    pet.style.transition = 'left .25s cubic-bezier(.2,.8,.3,1), top .25s cubic-bezier(.2,.8,.3,1)';
    pet.classList.remove('kat-dragging');
  }

  pet.addEventListener('pointerdown', onPointerDown);
  pet.addEventListener('pointermove', onPointerMove);
  pet.addEventListener('pointerup',   onPointerUp);
  pet.addEventListener('pointercancel', onPointerCancel);

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
  // FIX: 原选择器找 #ready-score，但页面上不存在该 id。
  // 首页真实结构是 index.html 里静态的 <div id="ready-container">，
  // getready.js 稍后把 <section id="ready-section"> 注入其中
  // （kat-pet.js 在 getready.js 之前加载，只能观察到静态容器）。
  // IntersectionObserver 会在容器被填充后自动重新计算，滚动到位即触发。
  var rsTarget = document.querySelector('#ready-container, #ready-section, [data-ready-score], a[href*="getready"]');
  if (rsTarget) {
    var rsShown = false;
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !rsShown) {
            rsShown = true;
            bubble.querySelector('.kat-pet-bubble-title').textContent = 'Ready Score time? ✅';
            bubble.querySelector('.kat-pet-bubble-body').textContent = '10 steps to get China-ready. Start now →';
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

  // ── 8. China Ready Score 联动：宠物心情 = 清单进度 ─────────
  // getready.js（较晚加载）把勾选进度存进 localStorage('rc_ready_done')，
  // 并在每次打勾 / 复访还原时派发 'rc:progress' 事件（detail.pct = 0~100）。
  // 映射：0% sleep · 1–39% idle · 40–79% wave · 80–99% jump · 100% cute
  function currentReadyPct() {
    try {
      var saved = JSON.parse(localStorage.getItem('rc_ready_done') || '[]');
      if (!Array.isArray(saved) || !saved.length) return 0;
      return Math.min(100, Math.round(saved.length / 10 * 100)); // 10-step checklist
    } catch (err) { return 0; }
  }
  function petStateFor(pct) {
    if (pct <= 0) return 'sleep';
    if (pct < 40) return 'idle';
    if (pct < 80) return 'wave';
    if (pct < 100) return 'jump';
    return 'cute';
  }
  // 基准状态：随机小动作结束 / 从瞌睡唤醒后回落到这里，
  // 而不是永远 idle —— 这样"瞄一眼宠物心情"就等于看进度。
  function baseState() {
    var pct = currentReadyPct();
    if (pct >= 100) return 'cute';
    if (pct >= 80) return 'jump';
    if (pct >= 40) return 'wave';
    return 'idle';
  }
  // 打勾 → 实时换心情；复访（returning: true）→ 欢迎气泡
  document.addEventListener('rc:progress', function (e) {
    var pct = (e.detail && typeof e.detail.pct === 'number') ? e.detail.pct : 0;
    setState(petStateFor(pct));
    if (e.detail && e.detail.returning && bubble && bubble.classList.contains('hidden')) {
      bubble.querySelector('.kat-pet-bubble-title').textContent = 'Welcome back! 🎒';
      bubble.querySelector('.kat-pet-bubble-body').textContent = "You're " + pct + "% China-ready — let's keep going.";
      bubble.classList.remove('hidden');
      setTimeout(function () { bubble.classList.add('hidden'); }, 7000);
    }
  });
  // 进页面时按已存进度设定初始心情（仅首页有清单；0% 保持原有 idle 行为，
  // 其他没有清单的页面宠物行为完全不变）
  if (document.getElementById('ready-container')) {
    var initPct = currentReadyPct();
    if (initPct > 0) setState(petStateFor(initPct));
  }

})();
