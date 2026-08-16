// ============================================================
//  assets/cookie-consent.js — Shared Cookie Consent Banner
//
//  Loaded automatically on every page via buildNav() in nav.js —
//  no per-page <script> tag needed, same pattern as search.js.
//
//  Stores the visitor's choice in localStorage under 'rc-consent'.
//  Shows once per browser until the choice is made (or cleared).
//  A "Cookie preferences" link in the footer lets visitors reopen
//  it and change their choice at any time.
//
//  NOTE ON SCOPE: this banner records a visitor's preference and
//  is the visible, honest place to change it. Making Google
//  Analytics / Travelpayouts actually stop firing when someone
//  clicks "Reject all" requires wiring those scripts to check
//  rcConsent.get() before loading — that's a separate follow-up
//  task, not yet done. Right now this is the consent UI + storage
//  layer only.
// ============================================================

const RC_CONSENT_KEY = 'rc-consent';

const rcConsent = {
  get() {
    try {
      const raw = localStorage.getItem(RC_CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },
  set(prefs) {
    try {
      localStorage.setItem(RC_CONSENT_KEY, JSON.stringify({
        ...prefs,
        timestamp: new Date().toISOString()
      }));
    } catch (e) { /* localStorage unavailable — banner will just reappear next visit */ }
  }
};

function rcInitCookieBanner(rootPath) {
  if (document.getElementById('rc-cookie-banner')) return; // already injected

  const existing = rcConsent.get();
  renderBanner(!existing);

  function renderBanner(show) {
    const old = document.getElementById('rc-cookie-banner');
    if (old) old.remove();

    const wrap = document.createElement('div');
    wrap.id = 'rc-cookie-banner';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-live', 'polite');
    wrap.setAttribute('aria-label', 'Cookie preferences');
    wrap.style.display = show ? 'flex' : 'none';
    wrap.innerHTML = `
      <div class="rc-cookie-card">
        <div class="rc-cookie-main">
          <div class="rc-cookie-title">We use cookies</div>
          <p class="rc-cookie-text">
            We use cookies for site analytics (Google Analytics) and to track affiliate
            referrals (Travelpayouts) when you click a partner link. Essential cookies
            that keep the site working are always on.
          </p>
          <div class="rc-cookie-prefs" id="rc-cookie-prefs" hidden>
            <label class="rc-cookie-toggle-row">
              <span>Essential <em>(always on)</em></span>
              <input type="checkbox" checked disabled>
            </label>
            <label class="rc-cookie-toggle-row">
              <span>Analytics <em>(Google Analytics)</em></span>
              <input type="checkbox" id="rc-pref-analytics" checked>
            </label>
            <label class="rc-cookie-toggle-row">
              <span>Affiliate tracking <em>(Travelpayouts)</em></span>
              <input type="checkbox" id="rc-pref-affiliate" checked>
            </label>
          </div>
        </div>
        <div class="rc-cookie-actions">
          <button type="button" class="rc-cookie-btn rc-cookie-btn-primary" data-action="accept">Accept all</button>
          <button type="button" class="rc-cookie-btn rc-cookie-btn-primary" data-action="reject">Reject all</button>
          <button type="button" class="rc-cookie-btn rc-cookie-btn-ghost" data-action="manage">Manage individual preferences</button>
          <button type="button" class="rc-cookie-btn rc-cookie-btn-save" id="rc-cookie-save" hidden data-action="save">Save preferences</button>
        </div>
        <div class="rc-cookie-links">
          <a href="${rootPath}privacy">Privacy Policy</a>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    wrap.querySelector('[data-action="accept"]').addEventListener('click', () => {
      rcConsent.set({ analytics: true, affiliate: true, choice: 'accepted' });
      renderBanner(false);
    });
    wrap.querySelector('[data-action="reject"]').addEventListener('click', () => {
      rcConsent.set({ analytics: false, affiliate: false, choice: 'rejected' });
      renderBanner(false);
    });
    wrap.querySelector('[data-action="manage"]').addEventListener('click', () => {
      const prefs = wrap.querySelector('#rc-cookie-prefs');
      const saveBtn = wrap.querySelector('#rc-cookie-save');
      prefs.hidden = false;
      saveBtn.hidden = false;
    });
    wrap.querySelector('[data-action="save"]').addEventListener('click', () => {
      const analytics = wrap.querySelector('#rc-pref-analytics').checked;
      const affiliate = wrap.querySelector('#rc-pref-affiliate').checked;
      rcConsent.set({ analytics, affiliate, choice: 'custom' });
      renderBanner(false);
    });
  }

  // Expose a way to reopen the banner (used by the footer "Cookie preferences" link)
  window.rcOpenCookiePrefs = () => renderBanner(true);
}
