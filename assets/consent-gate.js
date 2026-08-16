// ============================================================
//  assets/consent-gate.js — Consent-gated loader for
//  Google Analytics and Travelpayouts Drive.
//
//  Included directly in <head> on every page — loaded BEFORE
//  nav.js / the cookie banner, so tracking never fires ahead
//  of a visitor's choice.
//
//  Reads the same 'rc-consent' localStorage key that
//  assets/cookie-consent.js writes to:
//    { analytics: true|false, affiliate: true|false, choice: '...' }
//
//  Behavior:
//  - No stored choice yet  -> nothing loads. The banner calls
//    rcLoadGA()/rcLoadTravelpayouts() itself once the visitor
//    accepts, rejects, or saves custom preferences.
//  - analytics: true       -> Google Analytics loads immediately.
//  - analytics: false      -> Google Analytics is not loaded, and
//    window['ga-disable-<ID>'] is set to true, which is Google's
//    own documented flag for stopping gtag.js from sending hits
//    even if it was already loaded earlier in the session.
//  - affiliate: true       -> Travelpayouts Drive loads immediately.
//  - affiliate: false      -> Travelpayouts Drive is not loaded.
//    (Travelpayouts has no equivalent "disable" flag — if it was
//    already loaded earlier in the same browser session, rejecting
//    afterward stops it from loading again on future page loads,
//    but can't retroactively un-load it from the current page.)
// ============================================================

(function () {
  var GA_ID = 'G-3G3C5T1WRB';

  function getConsent() {
    try {
      var raw = localStorage.getItem('rc-consent');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
  window.rcGetConsent = getConsent;

  window.rcLoadGA = function () {
    if (document.getElementById('rc-ga-script')) return; // already loaded
    window['ga-disable-' + GA_ID] = false;
    var s = document.createElement('script');
    s.id = 'rc-ga-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  };

  window.rcDisableGA = function () {
    // Google's documented opt-out flag: stops gtag.js from sending
    // further hits, even if it already loaded earlier this session.
    window['ga-disable-' + GA_ID] = true;
  };

  window.rcLoadTravelpayouts = function () {
    if (document.getElementById('rc-tp-marker')) return; // already loaded
    var marker = document.createElement('meta');
    marker.id = 'rc-tp-marker';
    document.head.appendChild(marker);

    // ── Travelpayouts Drive install snippet — exact, unmodified ──
    (function () {
      var script = document.createElement("script");
      script.async = 1;
      script.setAttribute("data-cmp-ab", "2");
      script.src = 'https://emrld.ltd/NTYyNzU5.js?t=562759';
      document.head.appendChild(script);
    })();
    // ── end exact snippet ──
  };

  var consent = getConsent();
  if (consent) {
    if (consent.analytics === true) {
      window.rcLoadGA();
    } else {
      window.rcDisableGA();
    }
    if (consent.affiliate === true) {
      window.rcLoadTravelpayouts();
    }
  }
  // consent === null (no choice made yet): load nothing. The banner
  // itself calls rcLoadGA() / rcLoadTravelpayouts() / rcDisableGA()
  // when the visitor makes a choice — see assets/cookie-consent.js.
})();
