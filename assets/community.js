// ============================================================
//  assets/community.js — Community Knowledge Hub
//
//  HOW TO ADD A POST (takes 3 minutes):
//  1. Copy any post object below
//  2. Paste it at the TOP of the POSTS array
//  3. Fill in:
//       id:       'post-XXX'  ← increment the number
//       slug:     'short-readable-url-slug'  ← lowercase, hyphens,
//                 no emoji — this becomes /community/<slug>.html
//       category: 'lifehacks' | 'qa' | 'news'
//       date:     'August 2026'
//       tag:      'tip' | 'visa' | 'news'
//       title:    'Your title'
//       body:     `Your content` (no backticks inside the body text)
//  4. Save
//  5. Run: python3 _builder/community_generator.py
//     This creates /community/<slug>.html — a real, indexable page
//     for the post, so it can rank in Google on its own.
//  6. git push (commit both community.js AND the new /community/*.html file)
//  Both index.html and community.html auto-update — no extra steps.
// ============================================================

const POSTS = [
  // ── ADD NEW POSTS AT THE TOP ──────────────────────────────
  {
    id: 'post-019',
    slug: 'rolling-suitcases-vs-backpacks-china',
    category: 'qa',
    date: 'August 2026',
    tag: 'tip',
    title: "❓ Why do Chinese travelers prefer rolling suitcases over backpacks? — Charlotte",
    body: `Great question, Charlotte. You'll notice this the second you step into a Chinese train station — locals glide past with sleek hard-shell suitcases while foreign backpackers look like they're about to summit Everest.
    Here's why rolling luggage dominates in China:
    Infrastructure is suitcase-friendly
    Chinese cities are built for wheels. Airports, high-speed rail stations, and metro systems have smooth floors, elevators, and escalators everywhere. Sidewalks are generally paved and flat. Unlike cobblestone European streets or Southeast Asian dirt roads, you rarely need to carry your bag for long distances. A 28-inch suitcase rolls effortlessly from the Beijing South Station platform to your hotel.
    
    High-speed rail culture
    The vast majority of domestic travel in China happens by high-speed rail, not buses or vans. On a train, you have massive overhead racks and luggage areas at the ends of each carriage. A suitcase sits neatly in these spaces; a bulky backpack gets squashed and is harder to store neatly. Chinese travelers also tend to pack more (gifts, snacks, backup clothes), and a suitcase simply holds more volume.
    
    Security and cleanliness
    Hard-shell suitcases protect electronics and gifts better in crowded spaces. They're also easier to keep clean in dusty or rainy conditions — just wipe the shell. Backpacks absorb sweat, rain, and subway grime directly onto your back.
    
    That said — personal preference wins
    Plenty of Chinese people, especially younger travelers and outdoor enthusiasts, prefer backpacks. If you're doing a lot of walking within cities, hopping on and off metro lines, or traveling light, a backpack keeps your hands free and is more agile. For backpacker hostels, rural trekking, or motorcycle trips in Yunnan, a backpack is absolutely the better choice.
    
    Kat's honest take: For a typical China trip (flying into Beijing/Shanghai, taking high-speed rail between cities, staying in hotels), a rolling suitcase is genuinely more convenient. But if your style is more "wander around old town alleys all day," go with a backpack. There's no wrong answer — just know that you'll be in the minority as a backpacker, and that's totally fine.`
  },
  {
    id: 'post-018',
    slug: 'how-to-use-chopsticks-china',
    category: 'lifehacks',
    date: 'August 2026',
    tag: 'tip',
    title: "🥢 How to use chopsticks in China (without embarrassing yourself)",
    body: `Chopsticks aren't just utensils in China — they're a daily ritual. Most locals have been using them since age three, so don't feel bad if you struggle at first. Here's how to get from fumbling to functional in one meal.
    
    Step 1: Hold the first chopstick like a pencil
    Rest it in the crook between your thumb and index finger, letting it sit naturally on your ring finger. This chopstick stays completely still — it's your anchor.
    <!-- PHOTO PLACEHOLDER 1 -->
    <div style="background:var(--surface2);border:2px dashed var(--border);border-radius:12px;padding:32px;text-align:center;margin:20px 0">
    <div style="font-size:32px;margin-bottom:8px">📸</div>
    <div style="font-size:13px;color:var(--text-muted)">Photo: Close-up of the "pencil grip" on the first chopstick</div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">Replace this block with: &lt;img src="../assets/images/YOUR_PHOTO.jpg" alt="Chopstick pencil grip" style="width:100%;border-radius:8px"&gt;</div>
    </div>
    
    Step 2: Move only the top chopstick
    Hold the second chopstick between your thumb, index, and middle fingers — like you're holding a pen ready to write. This is the only chopstick that moves. Open and close the tips by pivoting your index finger up and down.
    <!-- PHOTO PLACEHOLDER 2 -->
    <div style="background:var(--surface2);border:2px dashed var(--border);border-radius:12px;padding:32px;text-align:center;margin:20px 0">
    <div style="font-size:32px;margin-bottom:8px">📸</div>
    <div style="font-size:13px;color:var(--text-muted)">Photo: Hand position showing the moving top chopstick</div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">Replace this block with: &lt;img src="../assets/images/YOUR_PHOTO.jpg" alt="Moving top chopstick" style="width:100%;border-radius:8px"&gt;</div>
    </div>
    The common mistake? Trying to move both sticks. Lock the bottom one, move only the top.
    What NOT to do (seriously, locals will wince)
    - Don't stick chopsticks upright in your rice bowl — it resembles incense at a funeral and is considered extremely bad luck.
    - Don't wave them around while talking, point at people with them, or tap bowls to get service.
    - Don't pass food directly from your chopsticks to someone else's — this also has funeral associations.
    - If you need to set them down, rest them across your bowl or on the chopstick rest (筷子架). Never leave them sticking into food.
    <!-- YOUTUBE VIDEO PLACEHOLDER -->
    <div style="background:var(--surface2);border:2px dashed var(--border);border-radius:12px;padding:32px;text-align:center;margin:20px 0">
    <div style="font-size:32px;margin-bottom:8px">▶️</div>
    <div style="font-size:13px;color:var(--text-muted)">YouTube video placeholder — Kat's chopsticks tutorial</div>
    <div style="font-size:11px;color:var(--text-muted);margin-top:8px">Replace VIDEO_ID below with your YouTube video ID:</div>
    <code style="display:block;background:var(--bg);padding:8px;border-radius:4px;margin-top:8px;font-size:11px;word-break:break-all">&lt;iframe width="100%" height="360" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border-radius:8px"&gt;&lt;/iframe&gt;</code>
    </div>
    Practice tip: Start with larger items — dumplings, tofu cubes, broccoli florets. Rice is actually the hardest because it's loose and slippery. Many Chinese people bring the bowl right up to their mouth and shovel — it's completely acceptable, not rude at all.
    If you really can't manage, asking for a fork (叉子, chāzi) is fine in tourist areas. But learning even basic chopsticks earns you genuine smiles and respect from locals. It's worth the 10 minutes of awkwardness.`
  },
  {
    id: 'post-017',
    slug: 'china-public-transport-card',
    category: 'qa',
    date: 'August 2026',
    tag: 'tip',
    title: "❓ Is there a 7-day or 10-day transport card like Melbourne's Myki? — Crystal",
    body: `Not really. China doesn't have one nationwide public transport card that works across every city.
    Instead, public transport is usually city-based. Shanghai, Beijing, Guangzhou, etc. each have their own transport systems and payment options.
    For a short trip, you can usually:
    (1) Pay for metro rides with Alipay or the city's transport mini-program, or you can buy a single-ride ticket at the metro station, there's a metro guide on the website.
    (2) Use a local transport card if you're staying longer or taking public transport frequently (but if you're only visiting for a few days, don't worry about buying a physical transport card before you arrive. Set up Alipay first — it's usually much more convenient for visitors).`
  },
  // ── August 2026 ───────────────────────────────────────────
  {
    id: 'post-016',
    slug: 'wechat-pay-international-cards',
    category: 'news',
    date: 'August 2026',
    tag: 'news',
    title: '📱 WeChat Pay foreign-card usage surges 80% — how to set it up',
    body: `WeChat Pay has quietly become one of the most foreigner-friendly payment apps in China. In 2026 it supports card binding from seven major international card networks (Visa, Mastercard, JCB and more), and usage among foreign visitors is booming — transactions with international cards grew nearly 80% year-on-year in the first months of 2026.

How it works for tourists:
(1) Download WeChat and register with your foreign phone number.
(2) Add your card under Me → Services → Wallet → Cards. No Chinese bank account needed.
(3) Pay by scanning merchant QR codes — it works at millions of shops, restaurants, and metro stations.
(4) Bonus: 40+ overseas wallets can scan WeChat Pay QR codes directly, so some visitors don't even need to set up the app at all.

One thing to know: international cards carry a 3% fee, but it's waived for transactions under ¥200 through the end of 2026 — which covers most daily purchases like meals, metro fares, and street food. In-app payment guidance is now available in 16 languages.`
  },
  {
    id: 'post-015',
    slug: 'booking-com-hotels-china',
    category: 'qa',
    date: 'August 2026',
    tag: 'tip',
    title: '❓ Can I book hotels on Booking.com in China? — Tom',
    body: `Not reliably. Booking.com and Agoda technically list Chinese hotels, but many smaller properties only appear on Chinese platforms like Trip.com (formerly Ctrip), Meituan, or Fliggy. The best strategy: use Trip.com — it has a full English interface, accepts foreign cards, and lists both international chains AND local boutique hotels. If you're looking for something really unique (like a courtyard hotel in a Beijing hutong), Trip.com will have options that Booking.com won't show you.`
  },
  {
    id: 'post-014',
    slug: 'stay-cool-china-summer-heat',
    category: 'lifehacks',
    date: 'August 2026',
    tag: 'tip',
    title: '🧊 How to stay cool in China\'s August heat without spending a cent',
    body: `August is brutal. But there are secret ways to stay cool for free: (1) Big shopping malls blast AC all day and have plenty of seating — MixC and Joy City chains are everywhere. (2) Most museums are heavily air-conditioned and entry is often free or under ¥30. (3) Public libraries are another hidden gem — quiet, freezing cold, and free WiFi. (4) Starbucks in China has AC and you can sit for hours without buying a second drink. Just don't plan outdoor sightseeing between 11am and 3pm and you'll survive.`
  },

  // ── July 2026 ─────────────────────────────────────────────
  {
    id: 'post-013',
    slug: 'germany-visa-free-china',
    category: 'news',
    date: 'August 2026',
    tag: 'visa',
    title: '🇩🇪 Germany is on China\'s visa-free list — up to 30 days, no visa needed',
    body: `Quick update for my German friends: German passport holders can currently enter China visa-free for up to 30 days for tourism, business, family visits, or transit.

To be clear, this isn't brand new — Germany has been on China's visa-free list since December 2023. But the window has grown from the original 15 days to 30 days, and the policy is confirmed through at least December 31, 2026.

What you need:
(1) A valid ordinary passport, valid for the duration of your stay.
(2) No advance application — just show up at any open port.
(3) You can enter multiple times; there's currently no cap on entries.

Not covered: work, study, or news coverage — those still need the appropriate visa. When in doubt, check the visa guide before you book.`
  },
  {
    id: 'post-012',
    slug: 'vpn-china-instagram-whatsapp',
    category: 'qa',
    date: 'July 2026',
    tag: 'tip',
    title: '❓ Do I need a VPN to access Instagram and WhatsApp? — Sophie',
    body: `Yes — Instagram, WhatsApp, Facebook, Google, and most Western social media are blocked in China without a VPN. You MUST download and configure your VPN BEFORE you arrive, because VPN provider websites are also blocked inside China. I recommend ExpressVPN or Astrill — they've been the most reliable for my friends. Set it up at home, test it, and don't turn your phone's VPN off once you land. One more thing: don't post about your VPN on Chinese social media; just use it quietly.`
  },
  {
    id: 'post-011',
    slug: 'china-metro-apps-english',
    category: 'lifehacks',
    date: 'July 2026',
    tag: 'tip',
    title: '🚇 Chinese metro apps now support English — here are the 15 cities',
    body: `Good news for anyone who's ever stared at a Chinese subway map with no clue where to go. As of mid-2026, metro apps for 15 major cities now have a full English toggle: Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu, Hangzhou, Xi'an, Nanjing, Wuhan, Chongqing, Suzhou, Qingdao, Changsha, Kunming, and Xiamen. Download the city's official metro app before you arrive — they're on both the App Store and local Android stores (but not Google Play, since it's blocked). The apps show routes, transfer times, and last-train schedules in English.`
  },

  // ── ORIGINAL POSTS (June–March 2026) ─────────────────────
  {
    id: 'post-001',
    slug: 'china-summer-packing-list',
    category: 'lifehacks',
    date: 'June 2026',
    tag: 'tip',
    title: '☀️ Summer in China — what to pack for June–August',
    body: `It gets HOT. Beijing and Shanghai regularly hit 35°C+ in summer. My honest packing list: light cotton clothes for nights, a small portable fan (or you can buy one in China :p), sunscreen, and a pair of walking shoes. Try to avoid being outside between 12pm and 3pm. The good news? Everything indoors is air-conditioned — sometimes aggressively so. Bring a light layer for museums and the metro.`
  },
  {
    id: 'post-002',
    slug: 'foreigner-friendly-alipay',
    category: 'lifehacks',
    date: 'May 2026',
    tag: 'tip',
    title: '💳 Check out the foreigner-friendly Alipay',
    body: `Big update — Alipay now lets you link a foreign Visa or Mastercard directly, without needing a Chinese bank account as an intermediate step. Download the International version, go to Settings → Bank Cards, and you're done in about 5 minutes. Do this before you land — it makes everything so much easier from day one.`
  },
  {
    id: 'post-003',
    slug: 'why-china-restaurants-serve-hot-water',
    category: 'lifehacks',
    date: 'April 2026',
    tag: 'tip',
    title: '🚰 Why Chinese restaurants serve hot water — and how to use it to save money',
    body: `You'll notice most Chinese restaurants bring hot or warm water to your table instead of cold. It comes from traditional Chinese medicine, which treats warm drinks as better for digestion. (For the full story on the ice-water thing, there's a separate Q&A about that.)

Here's the practical upside: hot water is FREE basically everywhere — restaurants, hotels, trains, even some airport lounges. Bring a small thermos (保温杯, bǎowēn bēi) and you can:
(1) Fill up at breakfast and carry warm tea or plain water all day.
(2) Save ¥5–10 a day instead of buying bottled drinks.
(3) Brew loose-leaf tea on the go — it's cheap and everywhere.

It's one of those small habits that makes China travel feel surprisingly easy once you lean into it.`
  },
  {
    id: 'post-004',
    slug: 'china-toilet-culture-squat-toilets',
    category: 'lifehacks',
    date: 'March 2026',
    tag: 'tip',
    title: '🚽 Squat toilets in China — what to expect and how to use one',
    body: `Many public toilets in China — especially at stations, parks, and older restaurants — use traditional squat toilets. It's simple once you know how: stand over the pan with one foot on each side, and squat down. No part of you touches the pan.

Two tips from a local:
(1) Carry tissues (纸巾, zhǐjīn) everywhere — public toilets often run out or charge for them.
(2) If you really can't do it, look for the accessible/western-style stall (usually marked with a pictogram of a seated toilet). Most newer malls, airports, and hotels have them.

It feels a little awkward at first, but after a week most travelers say it's actually cleaner and faster than sitting.🧻`
  },

  // ── Q&A ───────────────────────────────────────────────────
  {
    id: 'post-005',
    slug: 'why-no-ice-water-china-restaurants',
    category: 'qa',
    date: 'June 2026',
    tag: 'tip',
    title: '❓ Why don\'t restaurants serve ice water?--Amma',
    body: `This is one of the most asked questions from first-timers! In traditional Chinese culture, cold drinks — especially ice water — are considered bad for digestion and the body's "气qi" (energy balance). Most locals drink warm or hot water year-round. You can ask for cold water (冷水, lěng shuǐ) and most modern restaurants will accommodate you, but don't be surprised if it arrives at room temperature.`
  },
  {
    id: 'post-006',
    slug: 'google-maps-alternative-china',
    category: 'qa',
    date: 'May 2026',
    tag: 'tip',
    title: '❓ Can I use Google Maps in China?-- Nick',
    body: `No — Google is blocked in China. Use these instead: Amap (高德地图, Gaode) for navigation — it's what locals use and it's excellent. Baidu Maps works too but is entirely in Chinese. Apple Maps actually works reasonably well in China since Apple uses local data. Download Amap before you arrive. For transit specifically, the Metro app for each city (Beijing Metro, Shanghai Metro) is very accurate.`
  },
  {
    id: 'post-007',
    slug: 'is-tap-water-safe-in-china',
    category: 'qa',
    date: 'April 2026',
    tag: 'tip',
    title: '❓ Is it safe to drink tap water in China?--Lily',
    body: `No — tap water in China is not safe to drink directly. Always drink bottled water or water that has been boiled. The good news: bottled water is extremely cheap (¥1–2 for 500ml everywhere), and hotels always provide hot water flasks or kettles. Hot water from thermoses at restaurants and on trains has been boiled and is safe. Brushing your teeth with tap water in big cities is generally fine — but don't drink it straight from the tap. When in doubt, use bottled or boiled water.`
  },

  // ── NEWS ───────────────────────────────────────────────
  {
    id: 'post-008',
    slug: 'australia-china-visa-transit',
    category: 'news',
    date: 'August 2026',
    tag: 'visa',
    title: '🇦🇺 Australia visa update: 30-day visa-free entry now covers Aussies',
    body: `Good news for my Australian friends — Australian passport holders can now enter China visa-free for up to 30 days for tourism, business, family visits, and transit. This is part of China's unilateral visa waiver covering 50 countries, and it runs through at least December 31, 2026.

What changed: previously Australians needed a tourist visa for any visit. Now, for stays up to 30 days, you can simply fly in with a valid ordinary passport. No application, no paperwork.

Three reminders:
(1) Your passport must be valid for at least the length of your stay.
(2) Work, study, and news reporting still require the appropriate visa.
(3) For short layovers (under 240 hours) when transiting to a third country, the separate 240-hour transit exemption also applies.

Not sure if this applies to your nationality? Check the visa guide on this site before booking.`
  },
  {
    id: 'post-009',
    slug: 'china-parks-drinking-water-fountains',
    category: 'news',
    date: 'August 2026',
    tag: 'news',
    title: '💧 Free drinking fountains in Chinese parks — where they exist (and where they don\'t)',
    body: `Good news for budget travelers: free public drinking fountains (直饮水, zhí yǐn shuǐ) are slowly appearing in Chinese parks — it's a real but still rare thing.

Where they actually exist
The fountains you'll find are mostly in newer municipal projects, not in the famous tourist parks. Real examples reported in Chinese media: Qingfeng Park and Zijin Park in Changzhou (Jiangsu), Binjiang Park in Shangrao (Jiangxi), Dadukou Park in Chongqing, and some parks in Meishan (Sichuan) and Rongxian (Zigong). They usually look like stainless-steel bubblers with a button — press, lean in, drink.

The honest reality
- Most parks in Beijing, Shanghai, and the big tourist cities do NOT have public drinking fountains. Don't plan around finding one.
- Even where they exist, they're designed for locals who already trust the system. As a visitor, you can't verify the maintenance schedule.

What to do instead
(1) Carry your own bottle — free hot water is available at hotels, high-speed rail stations, and most airports (look for the 开水/直饮水 water station).
(2) Bottled water is ¥1–2 at any convenience store (便利店, biànlì diàn).
(3) Tap water in cities is chlorinated and not recommended for drinking — filter or boil if you're in a pinch.

Bottom line: free park fountains are a nice-to-have trend, not a feature you can rely on yet. Pack a bottle, and use the train station water stations instead.`
  },
  {
    id: 'post-010',
    slug: 'high-speed-rail-foreign-cards-china',
    category: 'news',
    date: 'August 2026',
    tag: 'news',
    title: '🚄 Buying high-speed rail tickets in 2026 — what actually works for foreigners',
    body: `Paying for high-speed rail in China is easier than it used to be, but which method you use still matters a lot. Here's the honest 2026 picture.

The official 12306 app officially accepts international Visa, Mastercard, JCB and Diners Club — but foreign cards are still frequently declined in practice. Don't rely on it if you're in a hurry.

Most reliable option for foreigners: book on Trip.com. Full English interface, reliably accepts foreign cards (Visa, Mastercard, Amex, PayPal), and you just enter your passport details. You'll pay a small service fee, but it removes the headache.

Also works well: link a foreign card to Alipay or WeChat Pay, then pay on 12306 or at the station like a local — the 3% international fee is usually waived for transactions under ¥200.

Cash at the ticket window is the dependable fallback.

One huge simplification since 2020: high-speed rail is fully paperless. Your passport IS your ticket — scan it at the gate to board. No printing, no collection window.`
  }

  // ── END OF POSTS ──────────────────────────────────────────
];

// ── TAG STYLES ────────────────────────────────────────────────
const TAG_STYLES = {
  tip:  { label: "KAT'S TIP",   bg: 'var(--gold-soft)',  color: 'var(--gold)',       border: 'var(--gold-border)' },
  visa: { label: 'VISA UPDATE', bg: 'var(--red-soft)',   color: 'var(--accent)',     border: 'var(--red-border)'  },
  news: { label: 'CHINA NEWS',  bg: 'var(--surface2)',   color: 'var(--text-muted)', border: 'var(--border)'      }
};

// ── FIREBASE CONFIG ────────────────────────────────────────
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDzooV1gIT4l7qvPx8hlMsjCV74ptpHZcE",
  authDomain: "readychinawithme.firebaseapp.com",
  databaseURL: "https://readychinawithme-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "readychinawithme",
  storageBucket: "readychinawithme.firebasestorage.app",
  messagingSenderId: "208317204929",
  appId: "1:208317204929:web:aedfee479a2d7f81c80740"
};

// ── PAGE DETECTION ─────────────────────────────────────────
// true on community.html (full page), false on index.html (preview)
const _isCommunityPage = window.location.pathname.toLowerCase().includes('community');

// ── STATE ─────────────────────────────────────────────────────
let _commTab      = 'lifehacks';
let _commQuery    = '';
let _commReacts   = {};
let _userVotes    = {};
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
  try { _userVotes = JSON.parse(localStorage.getItem(LS_VOTES_KEY)) || {}; } catch (e) { _userVotes = {}; }
  try { _commReacts = JSON.parse(localStorage.getItem(LS_COUNTS_KEY)) || {}; } catch (e) { _commReacts = {}; }
}

function _saveLocalVotes() {
  try { localStorage.setItem(LS_VOTES_KEY, JSON.stringify(_userVotes)); } catch (e) {}
}

function _saveLocalCounts() {
  if (_firebaseReady) return;
  try { localStorage.setItem(LS_COUNTS_KEY, JSON.stringify(_commReacts)); } catch (e) {}
}

function _getUserVote(id) { return _userVotes[id] || null; }

function _setUserVote(id, type) {
  if (type) _userVotes[id] = type; else delete _userVotes[id];
  _saveLocalVotes();
}

// ── FIREBASE ──────────────────────────────────────────────────
function _initFirebase() {
  if (typeof firebase === 'undefined') return false;
  if (!FIREBASE_CONFIG.apiKey) return false;
  try { firebase.initializeApp(FIREBASE_CONFIG); _firebaseReady = true; }
  catch (e) { console.warn('Firebase init failed:', e); _firebaseReady = false; }
  return _firebaseReady;
}

function _watchPostReacts(id) {
  if (!_firebaseReady) return;
  firebase.database().ref('reactions/' + id).on('value', snapshot => {
    const data = snapshot.val() || { helpful: 0, nope: 0, confused: 0 };
    REACT_TYPES.forEach(t => { if (typeof data[t] !== 'number') data[t] = 0; });
    _commReacts[id] = data;
    _updateReactUI(id);
  });
}

function _commitReactDelta(id, type, delta) {
  if (!_firebaseReady) return;
  const ref = firebase.database().ref('reactions/' + id + '/' + type);
  ref.transaction(current => { const val = (current || 0) + delta; return val < 0 ? 0 : val; });
}

// ── SEARCH ────────────────────────────────────────────────────
function commSearch(query) {
  _commQuery = query.trim().toLowerCase();
  _commRenderCards();
}

// ── TAB SWITCH ────────────────────────────────────────────────
function commShowTab(tab) {
  _commTab   = tab;
  _commQuery = '';
  const searchEl = document.getElementById('comm-search');
  if (searchEl) searchEl.value = '';

  document.querySelectorAll('.comm-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });

  _commRenderCards();
}

// ── RENDER CARDS ──────────────────────────────────────────────
// limit=0 means show all. On homepage limit=3.
function _commRenderCards(limit) {
  const list = document.getElementById('comm-card-list');
  if (!list) return;

  // Default limit: 3 on homepage (preview mode), 0 (all) on community page
  if (limit === undefined) limit = _isCommunityPage ? 0 : 3;

  let filtered;
  if (_commQuery.length > 0) {
    filtered = POSTS.filter(p =>
      p.title.toLowerCase().includes(_commQuery) ||
      p.body.toLowerCase().includes(_commQuery)
    );
  } else {
    filtered = POSTS.filter(p => p.category === _commTab);
  }

  // Only slice if limit > 0 (i.e. homepage preview mode)
  const displayed = limit > 0 ? filtered.slice(0, limit) : filtered;

  if (filtered.length === 0) {
    list.innerHTML = `<div class="comm-empty">No posts found for "<strong>${_commQuery}</strong>" — try a different word.</div>`;
    return;
  }

  const showCategory = _commQuery.length > 0;
  const catLabels    = { lifehacks: 'Life Hacks', qa: 'Q&A', news: 'News' };

  list.innerHTML = displayed.map(post => {
    const t   = TAG_STYLES[post.tag] || TAG_STYLES.news;
    const r   = _getReacts(post.id);
    const vote= _getUserVote(post.id);
    const cat = showCategory
      ? `<span class="comm-cat-label">${catLabels[post.category]}</span>` : '';

    return `
      <div class="news-card comm-card">
        <a class="comm-card-link" href="community/${post.slug}.html" aria-label="${post.title}"></a>
        <div class="news-meta">
          ${cat}
          <span class="news-date">${post.date}</span>
          <span class="news-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.border}">${t.label}</span>
        </div>
        <div class="news-headline">${post.title}</div>
        <div class="news-body comm-body-preview">${post.body}</div>
        <div class="comm-reactions">
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

// ── REACTIONS ─────────────────────────────────────────────────
function commReact(id, type) {
  const previousVote = _getUserVote(id);
  const r = _getReacts(id);

  if (previousVote === type) {
    r[type] = Math.max(0, (r[type] || 0) - 1);
    _setUserVote(id, null);
    if (_firebaseReady) _commitReactDelta(id, type, -1);
  } else {
    if (previousVote) {
      r[previousVote] = Math.max(0, (r[previousVote] || 0) - 1);
      if (_firebaseReady) _commitReactDelta(id, previousVote, -1);
    }
    r[type] = (r[type] || 0) + 1;
    _setUserVote(id, type);
    if (_firebaseReady) _commitReactDelta(id, type, +1);
  }

  _saveLocalCounts();
  _updateReactUI(id);
}

function _updateReactUI(id) {
  const r = _getReacts(id);
  const vote = _getUserVote(id);
  REACT_TYPES.forEach(type => {
    const countEl = document.getElementById(`r-${id}-${type}`);
    if (countEl) countEl.textContent = r[type] || '';
    const btnEl = document.getElementById(`rb-${id}-${type}`);
    if (btnEl) btnEl.classList.toggle('active', vote === type);
  });
}

// ── MAIN RENDER ───────────────────────────────────────────────
function loadCommunity() {
  // "Check All Posts" link — only on homepage (not community.html)
  const readMoreLink = _isCommunityPage ? '' : `
    <a href="community.html" class="comm-checkall-btn">Check All Posts &rarr;</a>`;

  const html = `
  <section class="section" id="community-section">
    <div class="section-eyebrow">Community · 旅行者社区</div>
    <div class="comm-title-row">
      <h2 class="section-title">Become a China master</h2>
      ${readMoreLink}
    </div>
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
        Or reach me directly: <a href="mailto:hello@readychinatravel.com" style="color:var(--accent)">hello@readychinatravel.com</a>
      </div>
    </div>
  </section>`;

  document.getElementById('community-container').innerHTML = html;
  _commRenderCards();
}

// ── FORM HANDLER ──────────────────────────────────────────────
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
  _getReacts(p.id);
  _watchPostReacts(p.id);
});
// Only build the full community feed (search/tabs/card list) on pages
// that actually have the #community-container element — index.html and
// community.html. Individual post pages (/community/<slug>.html) load
// this same file too, just for the reaction functions above — they
// don't have that container, so skip this part there.
if (document.getElementById('community-container')) {
  loadCommunity();
}

// If we arrived here via a "Things to Know" nav/search link from another
// page (e.g. ?tab=qa#community-section), select the right tab and scroll.
(function rcApplyTabFromURL() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab && ['lifehacks', 'qa', 'news'].includes(tab)) {
    commShowTab(tab);
    setTimeout(() => {
      const target = document.getElementById('community-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
})();
