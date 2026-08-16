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
    <div>
      <div class="footer-brand">Ready? China!</div>
      <div>Survive &amp; Thrive with Kat · Made for You</div>
      <div style="margin-top:8px;font-size:11px">
        <a href="${rootPath}alipay" style="color:var(--text-muted);margin-right:16px">Alipay Setup</a>
        <a href="${rootPath}wechat" style="color:var(--text-muted);margin-right:16px">WeChat Setup</a>
        <a href="${rootPath}guides" style="color:var(--text-muted);margin-right:16px">All Guides</a>
        <a href="${rootPath}privacy" style="color:var(--text-muted)">Privacy Policy</a>
      </div>
    </div>
    <div style="text-align:right;line-height:1.8">
      <div>AI Planner · Coming Soon</div>
      <div style="opacity:.5;margin-top:4px">© 2026 Ready? China!</div>
    </div>`;
  }

  // Search overlay + index are shared across every page.
  // search.js is loaded dynamically here so no page needs its own
  // <script> tag for it — one less file to touch when adding pages.
  rcLoadSearchScript(rootPath);
}

function rcLoadSearchScript(rootPath) {
  if (document.getElementById('rc-search-script')) return; // already loaded
  const s = document.createElement('script');
  s.id = 'rc-search-script';
  s.src = rootPath + 'assets/search.js';
  s.setAttribute('data-root', rootPath);
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
