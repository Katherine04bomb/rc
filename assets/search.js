// ============================================================
//  assets/search.js — Site search overlay
//
//  Loaded automatically by assets/nav.js on every page that
//  calls buildNav() — no manual <script> tag needed anywhere.
//
//  HOW TO ADD A NEW SEARCHABLE PAGE:
//    Add one object to SEARCH_INDEX below:
//    { title, snippet, url, icon, tag, keywords }
//    `url` is relative to the site root (rootPath is prepended
//    automatically). `keywords` is optional — extra search
//    terms that don't appear in the title/snippet (e.g. brand
//    names, common misspellings).
//
//  Cities are NOT listed here — they're pulled live from
//  data/cities.json, same single source used by the nav
//  dropdown and the homepage carousel.
//
//  This is a simple client-side substring/word matcher —
//  no backend, no build step. The index shape is intentionally
//  flat so a smarter (e.g. AI-assisted) ranking can be dropped
//  in later without changing the overlay UI.
// ============================================================

const SEARCH_INDEX = [
  { title: 'Visa Guide',            snippet: '77 countries visa-free — find out exactly what you need.',                     url: 'visa',              icon: '📋', tag: 'What to Prepare', keywords: 'visa-free application embassy consulate' },
  { title: 'Flights & Hotels',      snippet: 'Booking tips, which hotels accept foreigners, best days to fly.',              url: 'flights-hotels',    icon: '✈️', tag: 'What to Prepare', keywords: 'trip.com ctrip booking hotel flight' },
  { title: 'eSIM & SIM Cards',      snippet: 'Compare eSIM, physical SIM, pocket WiFi, and roaming options.',                url: 'esim',              icon: '📶', tag: 'What to Prepare', keywords: 'airalo data sim card roaming' },
  { title: 'Alipay Setup',          snippet: 'Step-by-step guide to setting up Alipay before you land.',                     url: 'alipay',            icon: '💳', tag: 'What to Prepare', keywords: 'alipay payment qr face scan' },
  { title: 'WeChat Setup',          snippet: 'Get WeChat and WeChat Pay working before your trip.',                          url: 'wechat',            icon: '💬', tag: 'What to Prepare', keywords: 'wechat pay weixin payment' },
  { title: 'QR Code Payments',      snippet: 'How cashless payment actually works in China, step by step.',                  url: 'qr-payments',       icon: '📱', tag: 'What to Prepare', keywords: 'qr code cashless payment scan' },
  { title: 'Currency & Exchange',   snippet: 'RMB cash, exchange rates, and where to get money in China.',                   url: 'currency',          icon: '💴', tag: 'What to Prepare', keywords: 'rmb yuan cash exchange money' },
  { title: 'VPN & The Firewall',    snippet: 'What is blocked, VPN recommendations, and how to test before you fly.',        url: 'vpn',               icon: '🌐', tag: 'What to Prepare', keywords: 'great firewall vpn google whatsapp instagram chatgpt blocked' },
  { title: 'Apps to Download',      snippet: 'The essential apps to install and verify before you arrive.',                  url: '#step-apps',        icon: '📱', tag: 'What to Prepare', keywords: 'app store download apps' },
  { title: 'Getting Around China',  snippet: 'Metro, taxis, Didi, bike shares, and airport transfers explained.',            url: 'get-around-like-local.html', icon: '🚗', tag: 'What to Prepare', keywords: 'transport metro taxi bike' },
  { title: 'Didi (Ride-Hailing)',   snippet: 'How to book a ride with Didi as a foreigner.',                                 url: 'didi',              icon: '🚕', tag: 'What to Prepare', keywords: 'didi ride hailing taxi app' },
  { title: 'Metro Guide',           snippet: 'Buying tickets, apps, and navigating China\u2019s metro systems.',             url: 'metro-guide',       icon: '🚇', tag: 'What to Prepare', keywords: 'metro subway train ticket' },
  { title: 'High-Speed Train',      snippet: 'Booking bullet trains, station tips, and what to expect onboard.',             url: 'high-speed-train',  icon: '🚄', tag: 'What to Prepare', keywords: 'gaotie bullet train ticket 12306' },
  { title: 'Emergency Numbers & Scams', snippet: 'Real scam examples and the numbers to screenshot before you land.',        url: 'emergency',         icon: '🆘', tag: 'What to Prepare', keywords: 'scam tea art student police hospital emergency' },
  { title: 'Travel Insurance',      snippet: 'What to look for, real cost data, and why this step matters most.',            url: 'travel-insurance',  icon: '🏥', tag: 'What to Prepare', keywords: 'insurance hospital cost coverage' },
  { title: 'Immigration & Customs', snippet: 'What to expect at the border, forms, and what not to bring.',                  url: 'immigration',       icon: '🛂', tag: 'What to Prepare', keywords: 'immigration customs border entry' },
  { title: 'Chinese Phrases',       snippet: 'Essential phrases for getting around, ordering, and emergencies.',             url: 'phrases',           icon: '🗣️', tag: 'What to Prepare', keywords: 'chinese language mandarin phrases' },
  { title: 'Food Guide',            snippet: 'How to order, what to try, and eating for picky or vegetarian travelers.',     url: 'food-guide',        icon: '🍜', tag: 'Things to Know', keywords: 'food vegetarian hotpot ordering restaurant' },
  { title: 'Explore the Map',       snippet: 'All 31 provinces — click around to explore China visually.',                  url: '#map-section',      icon: '🗺️', tag: 'Where to Go', keywords: 'map province explore' },
  { title: 'All Cities',            snippet: 'The complete list of city guides — best for what, how long to stay.',          url: 'cities.html',       icon: '🏙️', tag: 'Where to Go', keywords: 'cities list guide' },
  { title: 'Tips / Life Hacks',     snippet: 'Practical life hacks from Kat — everything I wish someone had told my friends.', url: '__know_lifehacks', icon: '💡', tag: 'Things to Know', keywords: 'tips life hacks advice' },
  { title: 'Q&A',                   snippet: 'Honest answers to the questions foreign visitors actually ask.',               url: '__know_qa',         icon: '❓', tag: 'Things to Know', keywords: 'questions answers qa faq' },
  { title: 'News',                  snippet: 'Policy changes and real updates that affect your trip.',                       url: '__know_news',       icon: '📢', tag: 'Things to Know', keywords: 'news updates policy changes' },
  { title: 'Get Ready Checklist',   snippet: 'The 10-step China Ready checklist — start here.',                              url: '#ready-section',    icon: '✅', tag: 'What to Prepare', keywords: 'checklist china ready score steps' },
  { title: 'Meet Katherine',        snippet: 'Who built Ready? China! and why.',                                             url: '#about-modal',      icon: '🙋‍♀️', tag: 'About', keywords: 'kat katherine about who' },
];

let _rcCities = [];
let _rcRoot = '/';
let _rcActiveIndex = -1;
let _rcResults = [];

function rcInitSearch() {
  const scriptTag = document.getElementById('rc-search-script');
  _rcRoot = (scriptTag && scriptTag.getAttribute('data-root')) || '/';

  if (!document.getElementById('rc-search-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'rc-search-overlay';
    overlay.innerHTML = `
      <div class="rc-search-box" role="dialog" aria-modal="true" aria-label="Search Ready? China!">
        <div class="rc-search-input-row">
          <span class="rc-search-icon">🔍</span>
          <input id="rc-search-input" type="text" placeholder="Search visa, Alipay, train, vegetarian…" autocomplete="off" />
          <span class="rc-search-brand">ready? China!</span>
          <span class="rc-search-esc">ESC</span>
        </div>
        <div id="rc-search-results" class="rc-search-results"></div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => { if (e.target === overlay) rcCloseSearch(); });

    const input = document.getElementById('rc-search-input');
    input.addEventListener('input', () => rcRunSearch(input.value));
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') rcCloseSearch();
      else if (e.key === 'ArrowDown') { e.preventDefault(); rcMoveActive(1); }
      else if (e.key === 'ArrowUp')   { e.preventDefault(); rcMoveActive(-1); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (_rcResults[_rcActiveIndex]) rcGoToResult(_rcResults[_rcActiveIndex]);
      }
    });
  }

  // Keyboard shortcut: press "/" anywhere (outside inputs) to open search
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      rcOpenSearch();
    }
  });

  // Load cities once so they're searchable too
  fetch(_rcRoot + 'data/cities.json')
    .then(r => r.json())
    .then(cities => { _rcCities = cities; })
    .catch(() => { _rcCities = []; });
}

function rcOpenSearch() {
  const overlay = document.getElementById('rc-search-overlay');
  if (!overlay) return;
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('rc-search-input');
  input.value = '';
  rcRunSearch('');
  setTimeout(() => input.focus(), 30);
}

function rcCloseSearch() {
  const overlay = document.getElementById('rc-search-overlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

function rcMoveActive(delta) {
  if (!_rcResults.length) return;
  _rcActiveIndex = (_rcActiveIndex + delta + _rcResults.length) % _rcResults.length;
  document.querySelectorAll('.rc-search-result').forEach((el, i) => {
    el.classList.toggle('active', i === _rcActiveIndex);
  });
  const activeEl = document.querySelectorAll('.rc-search-result')[_rcActiveIndex];
  if (activeEl) activeEl.scrollIntoView({ block: 'nearest' });
}

function rcRunSearch(query) {
  const resultsEl = document.getElementById('rc-search-results');
  const q = query.trim().toLowerCase();
  _rcActiveIndex = -1;

  if (!q) {
    resultsEl.innerHTML = `
      <div class="rc-search-hint">
        Search the whole site — pages, prep steps, and cities.
        <div class="rc-search-hint-tries">
          <button class="rc-search-try" onclick="document.getElementById('rc-search-input').value='visa';rcRunSearch('visa')">visa</button>
          <button class="rc-search-try" onclick="document.getElementById('rc-search-input').value='alipay';rcRunSearch('alipay')">alipay</button>
          <button class="rc-search-try" onclick="document.getElementById('rc-search-input').value='train';rcRunSearch('train')">train</button>
          <button class="rc-search-try" onclick="document.getElementById('rc-search-input').value='vegetarian';rcRunSearch('vegetarian')">vegetarian</button>
        </div>
      </div>`;
    _rcResults = [];
    return;
  }

  const pageMatches = SEARCH_INDEX.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.snippet.toLowerCase().includes(q) ||
    (item.keywords || '').toLowerCase().includes(q)
  );

  const cityMatches = _rcCities.filter(c =>
    c.nameEn.toLowerCase().includes(q) ||
    (c.bestFor || '').toLowerCase().includes(q) ||
    (c.tags || []).join(' ').toLowerCase().includes(q)
  ).map(c => ({
    title: c.nameEn,
    snippet: c.bestFor || 'City guide',
    url: 'guides/' + c.nameEn.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-') + '.html',
    icon: c.emoji || '🏙️',
    tag: 'City Guide',
  }));

  _rcResults = [...pageMatches, ...cityMatches];

  if (_rcResults.length === 0) {
    resultsEl.innerHTML = `<div class="rc-search-empty">No results for "${rcEscape(query)}" — try a different word, or check the "Things to Know" tab.</div>`;
    return;
  }

  resultsEl.innerHTML = _rcResults.map((r, i) => `
    <a class="rc-search-result" href="javascript:void(0)" onclick="rcGoToResultByIndex(${i})">
      <div class="rc-search-result-icon">${r.icon}</div>
      <div>
        <div class="rc-search-result-title">${rcEscape(r.title)}</div>
        <div class="rc-search-result-snippet">${rcEscape(r.snippet)}</div>
        <span class="rc-search-result-tag">${rcEscape(r.tag)}</span>
      </div>
    </a>`).join('');
}

function rcGoToResultByIndex(i) { rcGoToResult(_rcResults[i]); }

function rcGoToResult(result) {
  if (!result) return;
  rcCloseSearch();

  // "Things to Know" tab shortcuts
  if (result.url.startsWith('__know_')) {
    const tab = result.url.replace('__know_', '');
    rcGoKnow(tab, _rcRoot);
    return;
  }

  // Modals live on the homepage and open via JS, not a scroll target
  if (result.url === '#about-modal' || result.url === '#planning-modal') {
    const modalId = result.url.slice(1);
    if (document.getElementById(modalId) && typeof openModal === 'function') {
      openModal(modalId);
    } else {
      window.location.href = _rcRoot + 'index.html' + result.url;
    }
    return;
  }

  // Same-page anchor (only really "same page" when on the homepage)
  if (result.url.startsWith('#')) {
    const onIndex = !!document.getElementById('ready-container') || !!document.getElementById('ready-section');
    if (onIndex) {
      const target = document.querySelector(result.url);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.location.href = _rcRoot + 'index.html' + result.url;
    return;
  }

  window.location.href = _rcRoot + result.url;
}

function rcEscape(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

rcInitSearch();
