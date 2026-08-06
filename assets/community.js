// ============================================================
//  assets/community.js — Community Knowledge Hub
//
//  HOW TO ADD A POST (takes 2 minutes):
//  1. Copy any post object below
//  2. Paste it at the TOP of the POSTS array
//  3. Fill in:
//       id:       'post-XXX'  ← increment the number (post-011, post-012...)
//       category: 'lifehacks' | 'qa' | 'news'
//       date:     'July 2026'
//       tag:      'tip' | 'visa' | 'news'
//       title:    'Your title'
//       body:     `Your content`
//  4. Save → git add . → git commit -m "new post" → git push
//  Done. Live in 30 seconds.
// ============================================================

const POSTS = [
  // ── ADD NEW POSTS AT THE TOP ──────────────────────────────

  // ── LIFE HACKS ────────────────────────────────────────────
  {
    id: 'post-001',
    category: 'lifehacks',
    date: 'June 2026',
    tag: 'tip',
    title: '☀️ Summer in China — what to pack for June–August',
    body: `It gets HOT. Beijing and Shanghai regularly hit 35°C+ in summer. My honest packing list: light cotton clothes for nights, a small portable fan (or you can buy one in China :p), sunscreen, and a pair of walking shoes. Try to avoid being outside between 12pm and 3pm. The good news? Everything indoors is air-conditioned — sometimes aggressively so. Bring a light layer for museums and the metro.`
  },
  {
    id: 'post-002',
    category: 'lifehacks',
    date: 'May 2026',
    tag: 'tip',
    title: '💳 Check out the foreigner-friendly Alipay',
    body: `Big update — Alipay now lets you link a foreign Visa or Mastercard directly, without needing a Chinese bank account as an intermediate step. Download the International version, go to Settings → Bank Cards, and you're done in about 5 minutes. Do this before you land — it makes everything so much easier from day one.`
  },
  {
    id: 'post-003',
    category: 'lifehacks',
    date: 'April 2026',
    tag: 'tip',
    title: '🚰 Why restaurants give you hot water — and why it\'s actually great',
    body: `You'll notice that most Chinese restaurants serve hot or warm water instead of cold. This comes from traditional Chinese medicine — hot water is believed to aid digestion and balance the body. Don't ask for ice; embrace it. Bonus: hot water is free everywhere, even on trains. Bring a small thermos and you'll never pay for drinks again.`
  },
  {
    id: 'post-004',
    category: 'lifehacks',
    date: 'March 2026',
    tag: 'tip',
    title: '🚽 toilet culture',
    body: `There are many traditional squat toilets in China. Practice your Asian squat at home! You will need to straddle the pan with one foot on each side and squat down. And dont forget to bring some tissues with you!🧻`
  },

  // ── Q&A ───────────────────────────────────────────────────
  {
    id: 'post-005',
    category: 'qa',
    date: 'June 2026',
    tag: 'tip',
    title: '❓ Why don\'t restaurants serve ice water?--Amma',
    body: `This is one of the most asked questions from first-timers! In traditional Chinese culture, cold drinks — especially ice water — are considered bad for digestion and the body's "气qi" (energy balance). Most locals drink warm or hot water year-round. You can ask for cold water (冷水, lěng shuǐ) and most modern restaurants will accommodate you, but don't be surprised if it arrives at room temperature.`
  },
  {
    id: 'post-006',
    category: 'qa',
    date: 'May 2026',
    tag: 'tip',
    title: '❓ Can I use Google Maps in China?-- Nick',
    body: `No — Google is blocked in China. Use these instead: Amap (高德地图, Gaode) for navigation — it's what locals use and it's excellent. Baidu Maps works too but is entirely in Chinese. Apple Maps actually works reasonably well in China since Apple uses local data. Download Amap before you arrive. For transit specifically, the Metro app for each city (Beijing Metro, Shanghai Metro) is very accurate.`
  },
  {
    id: 'post-007',
    category: 'qa',
    date: 'April 2026',
    tag: 'tip',
    title: '❓ Is it safe to drink tap water in China?--Lily',
    body: `No — tap water in China is not safe to drink directly. Always drink bottled water or water that has been boiled. The good news: bottled water is extremely cheap (¥1–2 for 500ml everywhere), and hotels always provide hot water flasks or kettles. Hot water from thermoses at restaurants and on trains has been boiled and is safe. Never use tap water to brush your teeth without boiling it first.`
  },

  // ── NEWS ───────────────────────────────────────────────
  {
    id: 'post-008',
    category: 'news',
    date: 'June 2026',
    tag: 'visa',
    title: '🇦🇺 Australian travelers still need a visa — but transit is available',
    body: `Just a reminder for my lovely Australian friends: you still need to apply for a tourist (L) visa before entering China. Processing takes 4–7 business days, so don't leave it until the last minute. That said, if you're transiting through Shanghai, Beijing, or Guangzhou with an onward ticket to a third country, you can enter visa-free for up to 144 hours. Check the Get Ready section above for more details.`
  },
  {
    id: 'post-009',
    category: 'news',
    date: 'May 2026',
    tag: 'news',
    title: '💧 Some parks now provide 直饮水 drinking fountains',
    body: `Good news for budget travelers! Several major parks in Beijing, Shanghai and Chengdu have installed 直饮水 (zhí yǐn shuǐ) — direct drinking water fountains with purified water. Look for the blue tap icons on park maps. This is part of a citywide initiative to reduce plastic waste. Bring a reusable bottle — it saves money and the environment.`
  },
  {
    id: 'post-010',
    category: 'news',
    date: 'April 2026',
    tag: 'news',
    title: '🚄 High-speed rail now accepts foreign bank cards at ticket machines',
    body: `Major update for independent travelers: as of early 2026, most high-speed rail ticket machines at major stations now accept foreign Visa and Mastercard. Previously you needed a Chinese ID card or UnionPay card. You'll still need your passport. Recommended: book on the Trip.com app instead — you can reserve seats in advance, choose your carriage, and collect at the machine with your passport.`
  }

  // ── END OF POSTS ──────────────────────────────────────────
];

// ── TAG STYLES ────────────────────────────────────────────────
// Same as before — untouched
const TAG_STYLES = {
  tip:  { label: "KAT'S TIP",   bg: 'var(--gold-soft)',  color: 'var(--gold)',       border: 'var(--gold-border)' },
  visa: { label: 'VISA UPDATE', bg: 'var(--red-soft)',   color: 'var(--accent)',     border: 'var(--red-border)'  },
  news: { label: 'CHINA NEWS',  bg: 'var(--surface2)',   color: 'var(--text-muted)', border: 'var(--border)'      }
};

// ── OPTIONAL FIREBASE CONFIG ──────────────────────────────────
// Fill this in to enable cross-user reaction counts.
// See the setup note at the bottom of this file.
const FIREBASE_CONFIG = {
  // apiKey: "YOUR_API_KEY",
  // authDomain: "YOUR_PROJECT.firebaseapp.com",
  // databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  // projectId: "YOUR_PROJECT",
  // storageBucket: "YOUR_PROJECT.appspot.com",
  // messagingSenderId: "YOUR_SENDER_ID",
  // appId: "YOUR_APP_ID"
  apiKey: "AIzaSyDzooV1gIT4l7qvPx8hlMsjCV74ptpHZcE",
  authDomain: "readychinawithme.firebaseapp.com",
  databaseURL: "https://readychinawithme-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "readychinawithme",
  storageBucket: "readychinawithme.firebasestorage.app",
  messagingSenderId: "208317204929",
  appId: "1:208317204929:web:aedfee479a2d7f81c80740"
};

// ── STATE ─────────────────────────────────────────────────────
let _commTab      = 'lifehacks';  // active tab
let _commQuery    = '';            // active search query
let _commReacts   = {};            // { postId: { helpful:0, nope:0, confused:0 } }
let _userVotes    = {};            // { postId: 'helpful'|'nope'|'confused'|null }
let _firebaseReady= false;

const LS_VOTES_KEY = 'rc-community-votes';
const LS_COUNTS_KEY= 'rc-community-counts';
const REACT_TYPES  = ['helpful','nope','confused'];

// ── HELPERS ───────────────────────────────────────────────────
function _getReacts(id) {
  if (!_commReacts[id]) _commReacts[id] = { helpful: 0, nope: 0, confused: 0 };
  return _commReacts[id];
}

function _loadLocalState() {
  try {
    _userVotes = JSON.parse(localStorage.getItem(LS_VOTES_KEY)) || {};
  } catch (e) { _userVotes = {}; }
  try {
    _commReacts = JSON.parse(localStorage.getItem(LS_COUNTS_KEY)) || {};
  } catch (e) { _commReacts = {}; }
}

function _saveLocalVotes() {
  try { localStorage.setItem(LS_VOTES_KEY, JSON.stringify(_userVotes)); } catch (e) {}
}

function _saveLocalCounts() {
  if (_firebaseReady) return; // Firebase is the source of truth
  try { localStorage.setItem(LS_COUNTS_KEY, JSON.stringify(_commReacts)); } catch (e) {}
}

function _getUserVote(id) {
  return _userVotes[id] || null;
}

function _setUserVote(id, type) {
  if (type) _userVotes[id] = type;
  else delete _userVotes[id];
  _saveLocalVotes();
}

// ── FIREBASE ──────────────────────────────────────────────────
function _initFirebase() {
  if (typeof firebase === 'undefined') return false;
  if (!FIREBASE_CONFIG.apiKey) return false;
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    _firebaseReady = true;
  } catch (e) {
    console.warn('Firebase init failed:', e);
    _firebaseReady = false;
  }
  return _firebaseReady;
}

function _watchPostReacts(id) {
  if (!_firebaseReady) return;
  firebase.database().ref('reactions/' + id).on('value', snapshot => {
    const data = snapshot.val() || { helpful: 0, nope: 0, confused: 0 };
    // Ensure all keys exist
    REACT_TYPES.forEach(t => { if (typeof data[t] !== 'number') data[t] = 0; });
    _commReacts[id] = data;
    _updateReactUI(id);
    _syncModalReacts(id);
  });
}

function _commitReactDelta(id, type, delta) {
  if (!_firebaseReady) return;
  const ref = firebase.database().ref('reactions/' + id + '/' + type);
  ref.transaction(current => {
    const val = (current || 0) + delta;
    return val < 0 ? 0 : val;
  });
}

// ── SEARCH ────────────────────────────────────────────────────
// Searches title + body across ALL categories
function commSearch(query) {
  _commQuery = query.trim().toLowerCase();
  _commRenderCards();
}

// ── TAB SWITCH ────────────────────────────────────────────────
function commShowTab(tab) {
  _commTab   = tab;
  _commQuery = '';
  document.getElementById('comm-search').value = '';

  // Update tab active state
  document.querySelectorAll('.comm-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  _commRenderCards();
}

// ── RENDER CARDS ──────────────────────────────────────────────
function _commRenderCards() {
  const list = document.getElementById('comm-card-list');
  if (!list) return;

  let filtered;
  if (_commQuery.length > 0) {
    // Search mode: show ALL categories, filter by query
    filtered = POSTS.filter(p =>
      p.title.toLowerCase().includes(_commQuery) ||
      p.body.toLowerCase().includes(_commQuery)
    );
  } else {
    // Tab mode: show only active category
    filtered = POSTS.filter(p => p.category === _commTab);
  }

  if (filtered.length === 0) {
    list.innerHTML = `<div class="comm-empty">No posts found for "<strong>${_commQuery}</strong>" — try a different word.</div>`;
    return;
  }

  // If searching, show a category label above each card
  const showCategory = _commQuery.length > 0;
  const catLabels    = { lifehacks: 'Life Hacks', qa: 'Q&A', news: 'News' };

  list.innerHTML = filtered.map(post => {
    const t   = TAG_STYLES[post.tag] || TAG_STYLES.news;
    const r   = _getReacts(post.id);
    const vote= _getUserVote(post.id);
    const cat = showCategory
      ? `<span class="comm-cat-label">${catLabels[post.category]}</span>` : '';

    return `
      <div class="news-card comm-card" onclick="commOpenCard('${post.id}')">
        <div class="news-meta">
          ${cat}
          <span class="news-date">${post.date}</span>
          <span class="news-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.border}">${t.label}</span>
        </div>
        <div class="news-headline">${post.title}</div>
        <div class="news-body comm-body-preview">${post.body}</div>
        <div class="comm-reactions" onclick="event.stopPropagation()">
          <button class="comm-react-btn ${vote === 'helpful' ? 'active' : ''}" id="rb-${post.id}-helpful" onclick="commReact('${post.id}','helpful')">
            👍 <span class="comm-react-label">Helpful</span>
            <span class="comm-react-count" id="r-${post.id}-helpful">${r.helpful || ''}</span>
          </button>
          <button class="comm-react-btn ${vote === 'nope' ? 'active' : ''}" id="rb-${post.id}-nope" onclick="commReact('${post.id}','nope')">
            👎 <span class="comm-react-label">Not Helpful</span>
            <span class="comm-react-count" id="r-${post.id}-nope">${r.nope || ''}</span>
          </button>
          <button class="comm-react-btn ${vote === 'confused' ? 'active' : ''}" id="rb-${post.id}-confused" onclick="commReact('${post.id}','confused')">
            ❓ <span class="comm-react-label">Confused</span>
            <span class="comm-react-count" id="r-${post.id}-confused">${r.confused || ''}</span>
          </button>
        </div>
      </div>`;
  }).join('');
}

// ── MODAL OPEN ────────────────────────────────────────────────
function commOpenCard(id) {
  const post = POSTS.find(p => p.id === id);
  if (!post) return;
  const t = TAG_STYLES[post.tag] || TAG_STYLES.news;
  const r = _getReacts(id);

  document.getElementById('comm-modal-tag').textContent   = t.label;
  document.getElementById('comm-modal-tag').style.cssText =
    `background:${t.bg};color:${t.color};border:1px solid ${t.border};` +
    `font-size:9px;font-weight:700;letter-spacing:1px;padding:3px 10px;border-radius:8px;`;
  document.getElementById('comm-modal-date').textContent  = post.date;
  document.getElementById('comm-modal-title').textContent = post.title;
  document.getElementById('comm-modal-body').textContent  = post.body;

  // Wire reactions inside modal
  REACT_TYPES.forEach(type => {
    const btn = document.getElementById(`cm-react-${type}`);
    if (btn) btn.onclick = () => { commReact(id, type); };
  });
  _syncModalReacts(id);

  document.getElementById('comm-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function _syncModalReacts(id) {
  const r = _getReacts(id);
  const vote = _getUserVote(id);
  document.getElementById('cm-react-helpful-count').textContent  = r.helpful  || '';
  document.getElementById('cm-react-nope-count').textContent     = r.nope     || '';
  document.getElementById('cm-react-confused-count').textContent = r.confused || '';

  REACT_TYPES.forEach(type => {
    const btn = document.getElementById(`cm-react-${type}`);
    if (btn) btn.classList.toggle('active', vote === type);
  });
}

// ── MODAL CLOSE ───────────────────────────────────────────────
function commCloseCard() {
  document.getElementById('comm-modal').classList.remove('show');
  document.body.style.overflow = '';
  _commRenderCards(); // refresh counts and active states on cards
}

// ── REACTIONS ─────────────────────────────────────────────────
function commReact(id, type) {
  const previousVote = _getUserVote(id);
  const r = _getReacts(id);

  if (previousVote === type) {
    // Same button clicked again → cancel the vote
    r[type] = Math.max(0, (r[type] || 0) - 1);
    _setUserVote(id, null);
    if (_firebaseReady) {
      _commitReactDelta(id, type, -1);
    }
  } else {
    // Remove previous vote if user is switching reactions
    if (previousVote) {
      r[previousVote] = Math.max(0, (r[previousVote] || 0) - 1);
      if (_firebaseReady) {
        _commitReactDelta(id, previousVote, -1);
      }
    }
    // Add new vote
    r[type] = (r[type] || 0) + 1;
    _setUserVote(id, type);
    if (_firebaseReady) {
      _commitReactDelta(id, type, +1);
    }
  }

  // If not using Firebase, persist counts locally
  _saveLocalCounts();

  // Update UI immediately
  _updateReactUI(id);
  _syncModalReacts(id);
}

function _updateReactUI(id) {
  const r = _getReacts(id);
  const vote = _getUserVote(id);

  REACT_TYPES.forEach(type => {
    // Inline card count
    const countEl = document.getElementById(`r-${id}-${type}`);
    if (countEl) countEl.textContent = r[type] || '';

    // Inline card button active state
    const btnEl = document.getElementById(`rb-${id}-${type}`);
    if (btnEl) btnEl.classList.toggle('active', vote === type);
  });
}

// ── MAIN RENDER ───────────────────────────────────────────────
function loadCommunity() {
  const html = `
  <section class="section" id="community-section">
    <div class="section-eyebrow">Community · 旅行者社区</div>
    <h2 class="section-title">Know Before You Go</h2>
    <p class="section-sub">Life hacks, honest Q&As, and real updates from Kat — everything I wish someone had told my friends before they visited China.</p>

    <!-- Search -->
    <div class="comm-search-wrap">
      <span class="comm-search-icon">🔍</span>
      <input
        id="comm-search"
        class="comm-search-input"
        type="text"
        placeholder="Search across all topics… try 'water' or 'payment'"
        oninput="commSearch(this.value)"
      />
    </div>

    <!-- Tabs -->
    <div class="comm-tabs">
      <button class="comm-tab active" data-tab="lifehacks" onclick="commShowTab('lifehacks')">💡 Life Hacks</button>
      <button class="comm-tab"        data-tab="qa"        onclick="commShowTab('qa')">❓ Q&amp;A</button>
      <button class="comm-tab"        data-tab="news"   onclick="commShowTab('news')">📢 News</button>
    </div>

    <!-- Card list -->
    <div id="comm-card-list" class="comm-card-list"></div>

    <!-- Email notify -->
    <div class="community-coming" style="margin-top:32px">
      <div class="comm-icon">🏮</div>
      <div class="comm-title">Want to be notified when I post?</div>
      <div class="comm-sub">Leave your email and I'll reach out personally whenever there's something new — visa policy changes, seasonal tips, or just a good story from a traveler who made it through.</div>
      <form action="https://formspree.io/f/mnjypvzn" method="POST"
        style="display:flex;flex-direction:column;align-items:center;gap:12px"
        onsubmit="handleCommunityForm(event)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <input class="comm-input" type="email" name="email" placeholder="your@email.com" required/>
          <button class="comm-btn" type="submit">Notify Me 🏮</button>
        </div>
        <p style="font-size:11px;color:var(--text-muted);margin:0">I read every email personally and reply to all of them.</p>
      </form>
      <div id="comm-success" style="display:none;font-size:13px;color:var(--gold);margin-top:12px">
        ✅ You're on the list! I'll be in touch soon.
      </div>
      <div style="margin-top:16px;font-size:12px;color:var(--text-muted)">
        Or reach me directly: <a href="mailto:katherine011004@gmail.com" style="color:var(--accent)">katherine011004@gmail.com</a>
      </div>
    </div>
  </section>`;

  document.getElementById('community-container').innerHTML = html;
  _commRenderCards();
}

// ── FORM HANDLER — untouched from original ────────────────────
function handleCommunityForm(e) {
  e.preventDefault();
  const form = e.target;
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(r => {
    if (r.ok) {
      form.style.display = 'none';
      document.getElementById('comm-success').style.display = 'block';
    }
  });
}

// ── INITIALIZE ────────────────────────────────────────────────
_loadLocalState();
_initFirebase();
POSTS.forEach(p => {
  _getReacts(p.id);       // ensure object exists
  _watchPostReacts(p.id); // start Firebase listener if available
});
loadCommunity();

/*
  ── SETUP NOTE: Cross-user reaction counts ──────────────────────
  GitHub Pages only serves static files, so reaction counts cannot
  be shared between different visitors without a small database.

  This file is ready to use Firebase Realtime Database for that.
  To enable it:

  1. Go to https://console.firebase.google.com and create a project.
  2. In the project, add a Web app and copy the firebaseConfig object.
  3. Paste those values into the FIREBASE_CONFIG object near the top
     of this file (uncomment the fields and replace the placeholders).
  4. In Firebase Console → Build → Realtime Database → Create Database,
     choose "Start in test mode" or use these rules:

        {
          "rules": {
            "reactions": {
              ".read": true,
              "$postId": {
                ".write": true
              }
            }
          }
        }

  5. Make sure index.html loads the Firebase SDKs before community.js:
        <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
        <script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"></script>

  Until Firebase is configured, each browser will keep its own counts
  in localStorage (so a user can still toggle/cancel their own vote).
*/
