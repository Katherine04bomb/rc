// ============================================================
//  assets/nav.js — Shared Header & Footer
//
//  Works on BOTH GitHub Pages (/rc/) and custom domain (/)
//  by using absolute paths from the repo root.
//
//  HOW TO USE on a guide/inner page:
//    <header id="site-header"></header>
//    ...
//    <script src="../assets/nav.js"></script>
//    <script>buildNav();</script>
//
//  REPO ROOT is auto-detected from window.location.
//  No manual rootPath needed — just call buildNav().
//
//  HOW TO EDIT THE "What to Prepare" DROPDOWN:
//    Edit the PREPARE_ITEMS array below. Each `anchor` must
//    match a real id in assets/getready.js (STEPS array).
//
//  HOW TO EDIT THE "Things to Know" DROPDOWN:
//    Edit the KNOW_ITEMS array below. `tab` must match a
//    category used in assets/community.js (POSTS array).
//
//  "Where to Go" CITIES ARE NOT EDITED HERE.
//    They're pulled live from data/cities.json — the single
//    source of truth. Add a new city there and it appears
//    in this dropdown automatically.
//
//  Search is injected automatically on every page that calls
//  buildNav() — no extra <script> tag needed. See assets/search.js.
// ============================================================

// ============================================================
//  ⚙️ SITE CONFIG — 只需在这里填一次，全站生效
//  (Fill these once — they apply across the whole site)
// ============================================================
const RC_CONFIG = {
  // ── WhatsApp ─────────────────────────────────────────────
  // 你的 WhatsApp Business 号码：国家区号 + 号码，去掉 + 号。
  // 例：中国大陆 138 0000 0000 → '8613800000000'
  whatsappNumber: '8613799200367',
  whatsappPrefill:
    "Hi Kat! I'm planning a trip to China and had a question from your site.",

  // ── 免费 PDF 指南 ────────────────────────────────────────
  // 把 PDF 文件放到 assets/pdfs/ 目录（如 assets/pdfs/china-guide.pdf），
  // 访客填完邮箱后会自动看到"立即下载"按钮，不用等邮件。
  pdfUrl: 'assets/pdfs/china-guide.pdf',    // TODO: 确保文件存在

  // ── Kat 小人头像（右下角悬浮按钮）────────────────────────
  // 透明背景 PNG，放到 assets/ 目录（如 assets/kat-avatar.png）。
  // 生成方法：AI 生成图片 → remove.bg 去背 → 保存为 PNG 上传。
  katAvatar: 'assets/kat-avatar.PNG',       // ✅ 注意大写 .PNG，与 assets 里的文件名一致（GitHub Pages 区分大小写）

  // ── 社交链接（显示在新 footer 右侧）──────────────────────
  socialLinks: {
    whatsapp:  'https://wa.me/8613799200367',
    instagram: 'https://www.instagram.com/readychinatravel_kat',
    facebook:  'https://www.facebook.com/share/1Aq41hUq7Q/',
    youtube:   'https://youtube.com/@readychinatravel_kat',
  },

  // ── Affiliate 披露文案（显示在所有指南页的返佣链接附近）──
  affiliateNote:
    'Some links on this page are affiliate links — if you book through them, ' +
    'I may earn a small commission at no extra cost to you. Thank you for ' +
    'supporting Ready? China! 🇨🇳',
};

const PREPARE_ITEMS = [
  { label: 'Visa',               anchor: 'step-visa' },
  { label: 'Flights & Hotels',   anchor: 'step-flights' },
  { label: 'Data / SIM',         anchor: 'step-esim' },
  { label: 'Payments',           anchor: 'step-payment' },
  { label: 'Internet / Network', anchor: 'step-network' },
  { label: 'Apps',                anchor: 'step-apps' },
  { label: 'Transport',           anchor: 'step-transport' },
  { label: 'Emergency',           anchor: 'step-emergency' },
  { label: 'Insurance',           anchor: 'step-insurance' },
];

const KNOW_ITEMS = [
  { label: 'Tips', tab: 'lifehacks', icon: '💡' },
  { label: 'Q&A',  tab: 'qa',        icon: '❓' },
  { label: 'News', tab: 'news',      icon: '📢' },
];

const SERVICES_ITEMS = [
  { label: 'All Services',            href: 'index.html', type: 'internal' },
  { label: 'Free Checklist',          href: 'index.html#ready-section', type: 'internal' },
  { label: 'Classical Beijing 1 Day', href: 'https://wa.me/8613799200367?text=Hi%20Kat!%20I%27m%20interested%20in%20the%20Classical%20Beijing%201%20Day%20tour.', type: 'external' },
  { label: 'Customised Itinerary',    href: 'https://wa.me/8613799200367?text=Hi%20Kat!%20I%27d%20love%20a%20custom%20itinerary%20for%20my%20China%20trip.', type: 'external' },
];

function buildNav(rootPath) {
  // Auto-detect the repo root so links work on:
  // GitHub Pages:   katherine04bomb.github.io/rc/
  // Custom domain:  readychinatravel.com/
  // Local dev:      127.0.0.1:5500/
  if (!rootPath) {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    if (window.location.hostname.includes('github.io') && parts.length >= 1) {
      rootPath = '/' + parts[0] + '/';
    } else {
      const depth = parts.length;
      rootPath = depth <= 1 ? '/' : '../'.repeat(depth - 1);
    }
  }

  // ── HEADER ────────────────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    const prepareLinks = PREPARE_ITEMS.map(i =>
      `<a class="nav-dd-link" href="${rootPath}#${i.anchor}">${i.label}</a>`
    ).join('');

    const knowLinks = KNOW_ITEMS.map(i =>
      `<button class="nav-dd-link" onclick="rcGoKnow('${i.tab}','${rootPath}')">${i.icon} ${i.label}</button>`
    ).join('');

    const servicesLinks = SERVICES_ITEMS.map(i => {
  if (i.type === 'external') {
    return `<a class="nav-dd-link" href="${i.href}" target="_blank" rel="noopener">${i.label}</a>`;
  }

  const clean = i.href.replace(/^index\.html/, '');
  return `<a class="nav-dd-link" href="${rootPath}${clean}">${i.label}</a>`;
}).join('');

    header.innerHTML = `
    <div class="logo-area" onclick="window.location='${rootPath}'" style="cursor:pointer" title="Go to homepage">
      <div class="logo-travelers">
        <div class="traveler">
          <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
            <circle cx="10" cy="4.5" r="3.5" fill="#c0392b" opacity=".85"/>
            <rect x="6" y="9" width="8" height="13" rx="2" fill="#c0392b" opacity=".85"/>
            <rect x="12.5" y="10" width="5" height="7" rx="1.5" fill="#9a7b2f" opacity=".9"/>
            <line x1="7.5" y1="22" x2="5.5" y2="31" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
            <line x1="12.5" y1="22" x2="14.5" y2="31" stroke="#c0392b" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>
          </svg>
        </div>
        <div class="traveler">
          <svg width="18" height="30" viewBox="0 0 18 30" fill="none">
            <circle cx="9" cy="4" r="3" fill="#9a7b2f" opacity=".8"/>
            <rect x="5.5" y="8" width="7" height="12" rx="2" fill="#9a7b2f" opacity=".8"/>
            <rect x="11" y="9" width="4.5" height="6.5" rx="1.5" fill="#c0392b" opacity=".7"/>
            <line x1="7" y1="20" x2="5.5" y2="29" stroke="#9a7b2f" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
            <line x1="11" y1="20" x2="12.5" y2="29" stroke="#9a7b2f" stroke-width="2.2" stroke-linecap="round" opacity=".8"/>
          </svg>
        </div>
        <div class="traveler">
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none">
            <circle cx="8" cy="3.5" r="2.8" fill="#4a3c28" opacity=".6"/>
            <rect x="5" y="7" width="6" height="11" rx="2" fill="#4a3c28" opacity=".6"/>
            <rect x="9.5" y="8" width="4" height="6" rx="1.5" fill="#c0392b" opacity=".55"/>
            <line x1="6.5" y1="18" x2="5" y2="27" stroke="#4a3c28" stroke-width="2" stroke-linecap="round" opacity=".6"/>
            <line x1="9.5" y1="18" x2="11" y2="27" stroke="#4a3c28" stroke-width="2" stroke-linecap="round" opacity=".6"/>
          </svg>
        </div>
      </div>
      <div class="logo-text">
        <div class="logo-main">Ready? China!</div>
        <div class="logo-sub">Survive &amp; Thrive with Kat</div>
      </div>
    </div>
    <nav>
      <div class="nav-item" data-nav="prepare">
        <button class="nav-link-btn" aria-haspopup="true" aria-expanded="false" onclick="rcToggleDropdown(this)">
          What to Prepare
          <svg class="nav-caret" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">${prepareLinks}</div>
      </div>

      <div class="nav-item" data-nav="goto">
        <button class="nav-link-btn" aria-haspopup="true" aria-expanded="false" onclick="rcToggleDropdown(this)">
          Where to Go
          <svg class="nav-caret" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">
          <a class="nav-dd-link nav-dd-highlight" href="${rootPath}#map-section">📍 Explore China</a>
          <div class="nav-dd-scroll" id="nav-cities-list">
            <div class="nav-dd-link" style="opacity:.5;cursor:default">Loading cities…</div>
          </div>
        </div>
      </div>

      <div class="nav-item" data-nav="know">
        <button class="nav-link-btn" aria-haspopup="true" aria-expanded="false" onclick="rcToggleDropdown(this)">
          Things to Know
          <svg class="nav-caret" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="nav-dropdown-panel">${knowLinks}</div>
      </div>

      <div class="nav-item" data-nav="services">
        <button class="nav-link-btn" aria-haspopup="true" aria-expanded="false" onclick="rcToggleDropdown(this)">
          What Kat Can Help
          <svg class="nav-caret" width="9" height="6" viewBox="0 0 9 6" fill="none"><path d="M1 1L4.5 5L8 1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
       </button>
       <div class="nav-dropdown-panel">${servicesLinks}</div>
      </div>

      <button class="nav-search-btn" aria-label="Search Ready? China!" onclick="rcOpenSearch()">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="7.2" cy="7.2" r="5.7" stroke="currentColor" stroke-width="1.6"/><line x1="11.3" y1="11.3" x2="15.5" y2="15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>

      <button class="nav-link nav-cta" onclick="rcOpenPlanner('${rootPath}')">
        <span class="soon-tag">SOON</span>AI Itinerary
      </button>
    </nav>`;

    rcFillCityDropdown(rootPath);
  }

  // ── FOOTER ────────────────────────────────────────────────
  const footer = document.getElementById('site-footer');
  if (footer) {
    footer.innerHTML = `
    <div class="rc-footer">
      <div class="rc-footer-grid">
        <div class="rc-footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="${rootPath}#ready-container">Get Ready Checklist</a></li>
            <li><a href="${rootPath}guides.html">City Guides</a></li>
            <li><a href="${rootPath}#community-container">Community</a></li>
            <li><a href="${rootPath}alipay">Alipay Setup</a></li>
            <li><a href="${rootPath}wechat">WeChat Setup</a></li>
          </ul>
        </div>
        <div class="rc-footer-col">
          <h4>Stay in touch</h4>
          <p class="rc-footer-closing">"No guide can capture China. You have to feel it yourself. I'll be here when you do."</p>
          <form class="rc-footer-form" action="https://formspree.io/f/mnjypvzn" method="POST">
            <input type="email" name="email" placeholder="your@email.com" required/>
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div class="rc-footer-col">
          <div class="rc-footer-brand">Ready? China!</div>
          <p style="font-size:12px;color:var(--text-muted);margin:0 0 4px">Survive &amp; Thrive with Kat</p>
          <p style="font-size:11px;color:var(--text-muted);margin:0">Made by a local, for curious friends.</p>
          <div class="rc-footer-socials">
            <a href="https://wa.me/${RC_CONFIG.whatsappNumber}" target="_blank" rel="noopener" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.2 1.2-1.7 1.2-.4.1-1 .1-1.6-.1-3.4-1.1-5.6-4-5.8-4.2-.2-.2-1.4-1.9-1.4-3.6s.9-2.5 1.2-2.9c.3-.3.7-.4.9-.4h.6c.2 0 .4 0 .6.5.2.5.8 1.9.8 2 .1.1.1.3 0 .5-.3.7-.9 1.2-.6 1.6 1 1.6 2.4 2.8 4.1 3.4.4.2.7.1.9-.1.2-.2.8-.9 1-1.2.2-.3.4-.3.7-.2.3.1 1.8.9 2.1 1 .3.2.5.2.6.4.1.1.1.7-.2 1.4z"/></svg>
            </a>
            <a href="${RC_CONFIG.socialLinks.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg>
            </a>
            <a href="${RC_CONFIG.socialLinks.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94z"/></svg>
            </a>
            <a href="${RC_CONFIG.socialLinks.youtube}" target="_blank" rel="noopener" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1-1-1.7-2-2C19.7 3.7 16 3.7 12 3.7s-7.7 0-9.5.5c-1 .3-1.7 1-2 2C0 7.9 0 12 0 12s0 4.1.5 5.8c.3 1 1 1.7 2 2 1.8.5 5.5.5 9.5.5s7.7 0 9.5-.5c1-.3 1.7-1 2-2 .5-1.7.5-5.8.5-5.8s0-4.1-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="rc-footer-bottom">
        <span>© 2026 Ready? China! · AI Planner Coming Soon</span>
        <span>
          <a href="${rootPath}privacy">Privacy Policy</a>
          <span> · </span>
          <a href="javascript:void(0)" onclick="if(window.rcOpenCookiePrefs)window.rcOpenCookiePrefs()">Cookie Preferences</a>
        </span>
      </div>
    </div>`;

    // ── Affiliate disclosure (tiny print at footer bottom) ──
    if (RC_CONFIG.affiliateNote) {
      const note = document.createElement('div');
      note.className = 'rc-footer-disclosure';
      note.textContent = RC_CONFIG.affiliateNote.replace('🇨🇳','');
      footer.querySelector('.rc-footer').appendChild(note);
    }
  }

  // ── WhatsApp floating button (whole site) ─────────────────
  rcInjectWhatsAppButton(rootPath);

  // Search overlay + index are shared across every page.
  // search.js is loaded dynamically here so no page needs its own
  // <script> tag for it — one less file to touch when adding pages.
  rcLoadSearchScript(rootPath);

  // Cookie consent banner — same dynamic-load pattern as search.js.
  rcLoadCookieConsentScript(rootPath);
}

// ============================================================
//  💬 WhatsApp 浮动按钮 — 全站右下角
// ============================================================
function rcInjectWhatsAppButton(rootPath) {
  if (!RC_CONFIG.whatsappNumber || RC_CONFIG.whatsappNumber.indexOf('X') !== -1) return;
  if (document.getElementById('rc-whatsapp-btn')) return;
  const text = encodeURIComponent(RC_CONFIG.whatsappPrefill);
  const btn = document.createElement('a');
  btn.id = 'rc-whatsapp-btn';
  btn.href = 'https://wa.me/' + RC_CONFIG.whatsappNumber + '?text=' + text;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.setAttribute('aria-label', 'Chat with Kat on WhatsApp');

  // Kat 小人（透明背景 PNG，配置在 RC_CONFIG.katAvatar）
  const img = document.createElement('img');
  img.src = rootPath + RC_CONFIG.katAvatar;
  img.alt = '';
  img.loading = 'lazy';
  btn.appendChild(img);

  // 绿色消息角标 "1"
  const badge = document.createElement('span');
  badge.className = 'rc-badge';
  badge.textContent = '1';
  btn.appendChild(badge);

  document.body.appendChild(btn);

  // ── Kat tooltip bubble (click × to close) ────────────────
  const tooltip = document.createElement('div');
  tooltip.id = 'rc-kat-tooltip';
  tooltip.innerHTML =
    '<button class="rc-kat-tooltip-close" aria-label="Close">&times;</button>' +
    '<div class="rc-kat-tooltip-title">Questions? Chat with Kat</div>' +
    '<div class="rc-kat-tooltip-body">I reply personally, usually within a day.</div>';
  document.body.appendChild(tooltip);

  tooltip.querySelector('.rc-kat-tooltip-close').addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    tooltip.classList.add('hidden');
    try { localStorage.setItem('rc_kat_tip_closed', '1'); } catch (err) {}
  });

  try {
    if (localStorage.getItem('rc_kat_tip_closed')) {
      tooltip.classList.add('hidden');
    } else {
      setTimeout(() => tooltip.classList.add('hidden'), 10000);
    }
  } catch (err) {}
}

// ============================================================
//  📥 PDF 自动下载 — 访客填完邮箱立即显示下载按钮
//  (No more manually emailing PDFs — visitor gets it instantly)
// ============================================================
function rcSetupPdfAutoDownload() {
  if (!RC_CONFIG.pdfUrl) return;
  // Wait for all guide pages to finish parsing their inline scripts.
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.querySelectorAll('form.guide-email-form').forEach(form => {
        if (form.dataset.rcPdfBound) return;
        form.dataset.rcPdfBound = '1';
        // Keep the original submit handler (Formspree email capture)
        // and ADD an instant download button on success.
        const origOnsubmit = form.getAttribute('onsubmit');
        form.addEventListener('submit', function (e) {
          const downloadRow = document.createElement('div');
          downloadRow.className = 'rc-pdf-download';
          downloadRow.style.cssText =
            'margin-top:14px;text-align:center;display:none';
          downloadRow.innerHTML =
            '<a href="' + RC_CONFIG.pdfUrl + '" target="_blank" rel="noopener" ' +
            'style="display:inline-block;background:#fff;color:var(--accent);' +
            'font-weight:600;padding:11px 24px;border-radius:8px;' +
            'text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.18);font-size:13px">' +
            '📥 Download the PDF instantly →</a>' +
            '<div style="font-size:11px;opacity:.75;margin-top:8px">' +
            'No need to wait for email — grab it right here.</div>';
          const target = document.getElementById(form.id + '-ok') ||
            form.parentElement.querySelector('.guide-email-success') ||
            form.closest('.guide-email-capture');
          if (target) {
            target.appendChild(downloadRow);
            // Show it a moment after the original success handler hides the form.
            setTimeout(() => { downloadRow.style.display = 'block'; }, 900);
          }
        });
      });
    }, 300);
  });
}
if (typeof rcSetupPdfAutoDownload === 'function') rcSetupPdfAutoDownload();

function rcLoadSearchScript(rootPath) {
  if (document.getElementById('rc-search-script')) return; // already loaded
  const s = document.createElement('script');
  s.id = 'rc-search-script';
  s.src = rootPath + 'assets/search.js';
  s.setAttribute('data-root', rootPath);
  document.body.appendChild(s);
}

function rcLoadCookieConsentScript(rootPath) {
  if (document.getElementById('rc-cookie-script')) return; // already loaded
  const s = document.createElement('script');
  s.id = 'rc-cookie-script';
  s.src = rootPath + 'assets/cookie-consent.js';
  s.onload = () => rcInitCookieBanner(rootPath);
  document.body.appendChild(s);
}

// ── DROPDOWN BEHAVIOR ───────────────────────────────────────
function rcToggleDropdown(btn) {
  const item = btn.closest('.nav-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.nav-item.open').forEach(el => {
    el.classList.remove('open');
    el.querySelector('.nav-link-btn').setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.nav-link-btn').setAttribute('aria-expanded', 'false');
    });
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav-item.open').forEach(el => el.classList.remove('open'));
  }
});

// ── "Where to Go" — CITY LIST FROM data/cities.json ─────────
async function rcFillCityDropdown(rootPath) {
  const list = document.getElementById('nav-cities-list');
  if (!list) return;
  try {
    const res = await fetch(rootPath + 'data/cities.json');
    const cities = await res.json();
    list.innerHTML = cities.map(c => {
      const slug = c.nameEn.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
      return `<a class="nav-dd-link" href="${rootPath}guides/${slug}.html">${c.emoji || ''} ${c.nameEn}</a>`;
    }).join('');
  } catch (err) {
    list.innerHTML = `<a class="nav-dd-link" href="${rootPath}cities.html">See all cities →</a>`;
  }
}

// ── "AI Itinerary" CTA — modal lives on the homepage only ───
function rcOpenPlanner(rootPath) {
  if (typeof openModal === 'function' && document.getElementById('planning-modal')) {
    openModal('planning-modal');
  } else {
    window.location.href = rootPath + 'index.html#planning-modal';
  }
}

// ── "Things to Know" — same-page tab switch or cross-page nav ─
function rcGoKnow(tab, rootPath) {
  document.querySelectorAll('.nav-item.open').forEach(el => el.classList.remove('open'));
  const onIndex = !!document.getElementById('community-container') || !!document.getElementById('community-section');
  if (onIndex) {
    if (typeof commShowTab === 'function') commShowTab(tab);
    const target = document.getElementById('community-section');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.location.href = rootPath + 'index.html?tab=' + tab + '#community-section';
  }
}
