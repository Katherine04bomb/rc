// ============================================================
//  assets/nav.js — Shared Header & Footer
//
//  Works on BOTH GitHub Pages (/rc/) and custom domain (/)
//  by using absolute paths from the repo root.
//
//  HOW TO USE on a guide page:
//    <script src="../assets/nav.js"></script>
//    <script>buildNav();</script>
//
//  REPO ROOT is auto-detected from window.location.
//  No manual rootPath needed — just call buildNav().
// ============================================================

function buildNav(rootPath) {
  // Auto-detect the repo root so links work on:
  // GitHub Pages:   katherine04bomb.github.io/rc/
  // Custom domain:  readychina.com/
  // Local dev:      127.0.0.1:5500/
  if (!rootPath) {
    const path = window.location.pathname;
    // If we're inside a subfolder like /rc/alipay/, go up to /rc/
    // If we're at the root domain, stay at /
    const parts = path.split('/').filter(Boolean);
    // Detect GitHub Pages repo prefix (e.g. 'rc')
    if (window.location.hostname.includes('github.io') && parts.length >= 1) {
      rootPath = '/' + parts[0] + '/';
    } else {
      // Custom domain or local: calculate relative path back to root
      const depth = parts.length;
      rootPath = depth <= 1 ? '/' : '../'.repeat(depth - 1);
    }
  }

  // ── HEADER ────────────────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
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
      <a class="nav-link" href="${rootPath}#ready-section">What to Prepare</a>
      <a class="nav-link" href="${rootPath}#cities-section">Where to Go</a>
      <a class="nav-link" href="${rootPath}#community-section">Things to Know</a>
      <a class="nav-link nav-cta" href="${rootPath}#planning-modal">
        <span class="soon-tag">SOON</span>AI Itinerary
      </a>
    </nav>`;
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
        <a href="${rootPath}guides" style="color:var(--text-muted)">All Guides</a>
      </div>
    </div>
    <div style="text-align:right;line-height:1.8">
      <div>AI Planner · Coming Soon</div>
      <div style="opacity:.5;margin-top:4px">© 2026 Ready? China!</div>
    </div>`;
  }
}
