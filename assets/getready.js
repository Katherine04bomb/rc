// ============================================================
//  assets/getready.js
//  TASK 1 FIX: clicking a country now opens the official
//  government visa page in a new tab automatically.
// ============================================================

const visaDB = {
  us: {
    flag:'🇺🇸', name:'United States', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong> before you fly. Apply at the nearest Chinese Consulate — processing takes 4–7 business days. You're also eligible for <strong>144-hour visa-free transit</strong> through Beijing, Shanghai, Guangzhou, Chengdu and more (onward ticket required).`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.china-embassy.gov.cn/eng/'
  },
  uk: {
    flag:'🇬🇧', name:'United Kingdom', type:'✅ Visa-Free (15 days)',
    detail:`Great news — UK passport holders enjoy <strong>15-day visa-free entry</strong> (expanded 2024 policy). No application needed for short trips. Staying longer than 15 days? Apply for an L visa at the Chinese Embassy in London.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.chinese-embassy.org.uk/eng/'
  },
  au: {
    flag:'🇦🇺', name:'Australia', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong> before you fly. Apply at the Chinese Embassy in Canberra or consulates in Sydney or Melbourne. Processing takes 4–7 business days. <strong>144-hour transit visa-free</strong> is also available.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.china-embassy.gov.cn/eng/'
  },
  de: {
    flag:'🇩🇪', name:'Germany', type:'✅ Visa-Free (15 days)',
    detail:`German passport holders enjoy <strong>15-day visa-free entry</strong> (expanded 2024). No application needed for short stays. Staying longer? Apply at the Chinese Embassy in Berlin or consulates in Frankfurt, Hamburg, or Munich.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.china-botschaft.de/eng/'
  },
  fr: {
    flag:'🇫🇷', name:'France', type:'✅ Visa-Free (15 days)',
    detail:`French passport holders enjoy <strong>15-day visa-free entry</strong> (expanded 2024). For longer stays, apply at the Chinese Embassy in Paris or consulate in Lyon.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.amb-chine.fr/fra/'
  },
  ca: {
    flag:'🇨🇦', name:'Canada', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong> before you travel. Apply at the Chinese Consulate in Toronto, Vancouver, Calgary, or the Embassy in Ottawa. Processing takes 4–7 business days. <strong>144-hour transit visa-free</strong> is also available.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.chinaembassycanada.org/eng/'
  },
  sg: {
    flag:'🇸🇬', name:'Singapore', type:'✅ Visa-Free (30 days)',
    detail:`Singapore passport holders enjoy <strong>30-day visa-free entry</strong> — one of the most generous agreements China offers. No application needed for tourist stays under 30 days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cesg/eng/'
  },
  jp: {
    flag:'🇯🇵', name:'Japan', type:'✅ Visa-Free (15 days)',
    detail:`Japanese passport holders enjoy <strong>15-day visa-free entry</strong> (restored 2024). For stays longer than 15 days, apply at the Chinese Embassy in Tokyo or consulates in Osaka, Nagoya, Fukuoka, or Sapporo.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'http://www.china-embassy.or.jp/jpn/'
  },
  kr: {
    flag:'🇰🇷', name:'South Korea', type:'✅ Visa-Free (15 days)',
    detail:`South Korean passport holders enjoy <strong>15-day visa-free entry</strong> (expanded 2024). For longer stays, apply at the Chinese Embassy in Seoul or consulates in Busan or Guangzhou.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'http://kr.china-embassy.gov.cn/kor/'
  },
  nz: {
    flag:'🇳🇿', name:'New Zealand', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong> before travelling. Apply at the Chinese Embassy in Wellington or the Consulate in Auckland. Processing takes 4–7 business days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cenl/eng/'
  },
  it: {
    flag:'🇮🇹', name:'Italy', type:'✅ Visa-Free (15 days)',
    detail:`Italian passport holders enjoy <strong>15-day visa-free entry</strong> (2024 policy). For longer trips, apply at the Chinese Embassy in Rome or consulates in Milan or Florence.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/ceit/ita/'
  },
  es: {
    flag:'🇪🇸', name:'Spain', type:'✅ Visa-Free (15 days)',
    detail:`Spanish passport holders enjoy <strong>15-day visa-free entry</strong> (2024 policy). For longer trips, apply at the Chinese Embassy in Madrid or Consulate General in Barcelona.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cees/esp/'
  },
  nl: {
    flag:'🇳🇱', name:'Netherlands', type:'✅ Visa-Free (15 days)',
    detail:`Dutch passport holders enjoy <strong>15-day visa-free entry</strong> (2024 policy). For longer stays, apply at the Chinese Embassy in The Hague.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cenl/eng/'
  },
  se: {
    flag:'🇸🇪', name:'Sweden', type:'✅ Visa-Free (15 days)',
    detail:`Swedish passport holders enjoy <strong>15-day visa-free entry</strong> (2024 policy). For longer stays, apply at the Chinese Embassy in Stockholm.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cese/eng/'
  },
  ch: {
    flag:'🇨🇭', name:'Switzerland', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong>. Apply at the Chinese Embassy in Bern. Processing takes 4–7 business days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cech/ger/'
  },
  br: {
    flag:'🇧🇷', name:'Brazil', type:'✅ Visa-Free (30 days)',
    detail:`Brazilian passport holders enjoy <strong>30-day visa-free entry</strong> under the bilateral agreement. No application needed for tourist stays under 30 days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cebr/eng/'
  },
  in: {
    flag:'🇮🇳', name:'India', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong>. Apply at the Chinese Embassy in New Delhi or consulates in Mumbai, Kolkata, or Chennai. Processing takes 5–10 business days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/cein/eng/'
  },
  za: {
    flag:'🇿🇦', name:'South Africa', type:'Visa Required',
    detail:`You need an <strong>L (Tourist) visa</strong>. Apply at the Chinese Embassy in Pretoria. Processing takes 5–7 business days.`,
    officialUrl:'https://www.visaforchina.cn/globle/',
    embassyUrl:'https://www.mfa.gov.cn/ce/ceza/eng/'
  }
};

// TASK 1 FIX: opens official URL in new tab immediately on click
function showVisa(btn, code) {
  document.querySelectorAll('.country-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  const v = visaDB[code];
  const res = document.getElementById('visa-result');

  if (!v) {
    res.innerHTML = `<p style="font-size:12px;color:var(--text-muted)">We don't have specific info for your country yet. Please check the <a href="https://www.visaforchina.cn/globle/" target="_blank" rel="noopener" style="color:var(--gold)">official China Visa Service Centre →</a></p>`;
    res.classList.add('show');
    return;
  }

  const isVisaFree = v.type.includes('Visa-Free');

  res.innerHTML = `
    <div style="margin-bottom:10px">
      <strong style="font-size:15px">${v.flag} ${v.name}</strong>
      <span style="display:inline-block;margin-left:10px;padding:3px 10px;border-radius:10px;font-size:11px;font-weight:700;
        background:${isVisaFree ? 'rgba(39,174,96,.15)' : 'var(--red-soft)'};
        color:${isVisaFree ? '#27ae60' : 'var(--accent)'};
        border:1px solid ${isVisaFree ? 'rgba(39,174,96,.3)' : 'var(--red-border)'}">
        ${v.type}
      </span>
    </div>
    <p style="font-size:12px;color:var(--text-muted);line-height:1.7;margin-bottom:14px">${v.detail}</p>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <a href="${v.officialUrl}" target="_blank" rel="noopener"
        style="display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:white;
          padding:8px 16px;border-radius:6px;font-size:12px;text-decoration:none;font-weight:500">
        🔗 Official Visa Portal →
      </a>
      <a href="${v.embassyUrl}" target="_blank" rel="noopener"
        style="display:inline-flex;align-items:center;gap:6px;background:var(--surface2);color:var(--text-mid);
          padding:8px 16px;border-radius:6px;font-size:12px;text-decoration:none;border:1px solid var(--border)">
        🏛️ Embassy Info →
      </a>
    </div>
    <p style="font-size:10px;color:var(--text-muted);margin-top:10px">
      ⚠️ Visa policies change. Always verify with the official embassy before booking.
    </p>`;
  res.classList.add('show');

  // ── THE ACTUAL FIX: open official page in new tab immediately ──
}

// AFTER — add a "no match" fallback after the forEach
function filterCountries() {
  const q = document.getElementById('visa-search').value.toLowerCase().trim();
  let anyVisible = false;
  document.querySelectorAll('.country-btn').forEach(b => {
    const show = b.textContent.toLowerCase().includes(q);
    b.style.display = show ? '' : 'none';
    if (show) anyVisible = true;
  });

  // Show/hide the fallback message
  const fallback = document.getElementById('visa-no-result');
  if (fallback) fallback.style.display = (!anyVisible && q.length > 0) ? 'block' : 'none';
}


// ── STEPS DATA ───────────────────────────────────────────────
const STEPS = [
  {
    id:'step-passport', num:'Step 1',
    title:'🛂 Check Your Passport',
    desc:"Is it still valid? China requires at least 6 months of validity beyond your travel dates. No passport yet? Start now — it can take 4–6 weeks.",
    modal:null
  },
  {
    id:'step-visa', num:'Step 2',
    title:'📋 Sort Your Visa',
    desc:"Requirements vary by nationality — some countries are visa-free for 15–30 days, others need to apply in advance. Click below to find out exactly what you need, and I'll take you straight to the official page.",
    modal:{id:'visa-modal', label:'Check my visa →'}
  },
  {
    id:'step-flights', num:'Step 3',
    title:'✈️ Book Flights & Hotels',
    desc:"Once your visa is sorted, book everything. Heads up: not all hotels in China accept foreign guests — international chains like IHG, Marriott, and Hilton are always a safe bet.",
    modal:null
  },
  {
    id:'step-esim', num:'Step 4',
    title:'📶 Get a SIM or eSIM',
    desc:"You'll need data from the moment you land. There are four options: eSIM, a Chinese SIM card , pocket WiFi or international roaming.",
    modal:{id:'sim-modal', label:'Compare options →'}
  },
  {
    id:'step-payment', num:'Step 5',
    title:'💳 Set Up Payments',
    desc:"China is almost entirely cashless — street food stalls, taxis, supermarkets, all QR code. My friend Kory couldn't pay for dinner on her first night. Set up Alipay or WeChat before you land. This is the most important thing on this list.",
    modal:{id:'payment-modal', label:'How to set up →'}
  },
  {
    id:'step-network', num:'Step 6',
    title:'🌐 Understand the Firewall & VPN',
    desc:"Google, Instagram, WhatsApp, and ChatGPT are all blocked in China. Download a VPN before you fly.",
    modal:{id:'network-modal', label:'VPN guide →'}
  },
  {
    id:'step-apps', num:'Step 7',
    title:'📱 Download Your Apps',
    desc:"Six apps will run your entire trip: WeChat, Alipay, Didi, Amap, Dianping, and Trip.com. Set them up at home — some need verification that's much easier to do before you arrive.",
    modal:{id:'apps-modal', label:'See app guide →'}
  },
  {
    id:'step-transport', num:'Step 8',
    title:'🚄 Understand How to Get Around',
    desc:"China's high-speed rail is genuinely world-class — fast, cheap, and reliable. I'll walk you through booking trains, using Didi without any Chinese, and navigating the metro like a local.",
    modal:{id:'transport-modal', label:'Transport guide →'}
  },
  {
    id:'step-emergency', num:'Step 9',
    title:'🆘 Save Emergency Numbers',
    desc:"Screenshot or save these numbers in your phone before you land. You probably won't need them — but you'll be glad you have them if you do.",
    modal:{id:'emergency-modal', label:'View numbers →'}
  },
  {
    id:'step-customs', num:'Step 10',
    title:'🛃 Understand Arrival & Immigration',
    desc:"You can fill in your Arrival Card online up to 3 days before you land — saves a lot of time at immigration. I'll walk you through exactly what to expect when you touch down.",
    modal:{id:'customs-modal', label:'Arrival guide →'}
  }
];

// ── CHECKLIST STATE ──────────────────────────────────────────
// These were previously in index.html inline <script>.
// They live here because they serve only the getready section.
const steps = [
  'step-passport','step-visa','step-flights','step-esim','step-payment',
  'step-network','step-apps','step-transport','step-emergency','step-customs'
];
const statusMsgs = [
  'Just getting started — your adventure awaits! 🌱',
  'Great start! Passport sorted ✅',
  'Visa sorted — you\'re officially going! 🎉',
  'Flights & hotel booked — it\'s real now! 🛫',
  'SIM ready — you\'ll have signal the moment you land 📶',
  'Payments sorted — you can eat ANYTHING 🍜',
  'Connected — Instagram works in China too 🌐',
  'Apps ready — you\'re basically a local 📱',
  'Transport sorted — rail, metro, Didi — you\'ve got this 🚄',
  'Emergency number saved - hope you feel safe! 🛃',
  '100% CHINA READY! See you there! 🇨🇳🎊'
];

function toggleStep(id) {
  document.getElementById(id).classList.toggle('done');
  updateProgress();
}

function updateProgress() {
  const done = steps.filter(s => document.getElementById(s).classList.contains('done')).length;
  const pct  = Math.round((done / steps.length) * 100);
  document.getElementById('prog-bar').style.width    = pct + '%';
  document.getElementById('pct-label').textContent   = pct + '%';
  document.getElementById('prog-status').textContent = statusMsgs[done] || statusMsgs[0];
}

function loadGetReady() {
  const stepsHTML = STEPS.map(s => `
    <div class="check-step" id="${s.id}">
      <div class="step-check" onclick="toggleStep('${s.id}')"></div>
      <div style="flex:1">
        <div class="step-num-label">${s.num}</div>
        <div class="step-title-main">${s.title}</div>
        <div class="step-desc-main">${s.desc}</div>
      </div>
      ${s.modal ? `<div class="step-action">
        <button class="step-btn" onclick="openModal('${s.modal.id}')">${s.modal.label}</button>
      </div>` : ''}
    </div>`).join('');

  const sectionHTML = `
  <section class="section" id="ready-section">
    <div class="section-eyebrow">Step by Step · 出发准备</div>
    <h2 class="section-title">Get Ready with Me</h2>
    <p class="section-sub">Tick off each step as you go — I've been through this with so many friends, and by the end of this list, you'll feel genuinely prepared.</p>
    <div class="progress-area">
      <div class="progress-header">
        <div class="progress-label">🇨🇳 China Ready Score</div>
        <div class="progress-pct" id="pct-label">0%</div>
      </div>
      <div class="progress-bar-bg"><div class="progress-bar-fill" id="prog-bar"></div></div>
      <div class="progress-status" id="prog-status">Start ticking steps below — let's get you ready 👇</div>
    </div>
    <div class="checklist-steps">${stepsHTML}</div>
  </section>`;

  const modalsHTML = `
  <!-- VISA MODAL -->
  <div class="modal-overlay" id="visa-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">📋 Visa Guide · 签证</div>
        <div class="modal-subtitle">Click your country — I'll show you what you need and open the official page</div></div>
        <button class="modal-close" onclick="closeModal('visa-modal')">×</button>
      </div>
      <div class="modal-body">
        <input class="nationality-search" id="visa-search" placeholder="Type your country to search..." oninput="filterCountries()"/>
        <div class="country-list" id="country-list">
          <div class="country-btn" onclick="showVisa(this,'us')">🇺🇸 USA</div>
          <div class="country-btn" onclick="showVisa(this,'uk')">🇬🇧 UK</div>
          <div class="country-btn" onclick="showVisa(this,'au')">🇦🇺 Australia</div>
          <div class="country-btn" onclick="showVisa(this,'de')">🇩🇪 Germany</div>
          <div class="country-btn" onclick="showVisa(this,'fr')">🇫🇷 France</div>
          <div class="country-btn" onclick="showVisa(this,'ca')">🇨🇦 Canada</div>
          <div class="country-btn" onclick="showVisa(this,'sg')">🇸🇬 Singapore</div>
          <div class="country-btn" onclick="showVisa(this,'jp')">🇯🇵 Japan</div>
          <div class="country-btn" onclick="showVisa(this,'kr')">🇰🇷 South Korea</div>
          <div class="country-btn" onclick="showVisa(this,'nz')">🇳🇿 New Zealand</div>
          <div class="country-btn" onclick="showVisa(this,'it')">🇮🇹 Italy</div>
          <div class="country-btn" onclick="showVisa(this,'es')">🇪🇸 Spain</div>
          <div class="country-btn" onclick="showVisa(this,'nl')">🇳🇱 Netherlands</div>
          <div class="country-btn" onclick="showVisa(this,'se')">🇸🇪 Sweden</div>
          <div class="country-btn" onclick="showVisa(this,'ch')">🇨🇭 Switzerland</div>
          <div class="country-btn" onclick="showVisa(this,'br')">🇧🇷 Brazil</div>
          <div class="country-btn" onclick="showVisa(this,'in')">🇮🇳 India</div>
          <div class="country-btn" onclick="showVisa(this,'za')">🇿🇦 South Africa</div>
        </div>
        <div class="visa-result" id="visa-result"></div>
        <div id="visa-no-result" style="display:none;padding:14px;font-size:12px;
  color:var(--text-muted);background:var(--surface);border-radius:8px;line-height:1.8">
  No country-specific information available yet.<br>
  <a href="https://www.visaforchina.cn/globle/" target="_blank" rel="noopener"
    style="color:var(--gold);font-weight:500">
    Check the official China Visa Service Centre →
  </a>
</div>
        <div class="visa-free-section">
          <div class="vf-title">🌟 144-Hour Transit Visa-Free — Eligible Countries:</div>
          <div class="vf-grid">
            <div class="vf-item">🇺🇸 United States</div><div class="vf-item">🇬🇧 United Kingdom</div>
            <div class="vf-item">🇩🇪 Germany</div><div class="vf-item">🇫🇷 France</div>
            <div class="vf-item">🇦🇺 Australia</div><div class="vf-item">🇨🇦 Canada</div>
            <div class="vf-item">🇮🇹 Italy</div><div class="vf-item">🇪🇸 Spain</div>
            <div class="vf-item">🇯🇵 Japan</div><div class="vf-item">🇰🇷 South Korea</div>
            <div class="vf-item">🇳🇱 Netherlands</div><div class="vf-item">🇸🇪 Sweden</div>
          </div>
          <p style="font-size:11px;color:var(--text-muted);margin-top:10px">You must have an onward ticket to a third country. Valid in Beijing, Shanghai, Guangzhou, Chengdu, and more.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- SIM MODAL -->
  <div class="modal-overlay" id="sim-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">📶 SIM Card & eSIM · 手机卡</div>
      <div class="modal-subtitle">How to stay connected from the moment you land</div></div>
      <button class="modal-close" onclick="closeModal('sim-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Heads up:</strong> A lot of hotels ask for a local phone number at check-in — so getting a SIM or eSIM isn't just about data, it's practically essential.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">📲 eSIM — Best for most travelers</div><ul class="info-list">
          <li>Best for stays of 5–15 days where you mainly need chat, maps, and social media</li>
          <li>Buy on Nomad, Airalo, Holafly, or China Unicom International before you fly</li>
          <li>Scan QR code → activate → works the moment you land ✅</li>
          <li>Around ¥100 ($13 USD) for 10GB / 30 days</li>
          <li>To check if your phone is compatible: dial <strong>*#06#</strong> — if you see EID, you're good ✅</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">💳 Physical SIM — Best for longer stays</div><ul class="info-list">
          <li>Best if you're staying 2+ weeks or need a real Chinese phone number</li>
          <li>Needed for registering certain apps, receiving bank codes, and hotel check-in</li>
          <li>Buy at China Mobile / Unicom / Telecom counters at all major airports</li>
          <li>Bring your passport — required by law to register your SIM</li>
          <li>Around ¥250 ($35 USD) for 80GB + 300 mins / 30 days</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">📡 Pocket WiFi — Best as a backup</div><ul class="info-list">
          <li>Great if your phone isn't eSIM compatible or you want to share data</li>
          <li>Rent at the airport or pre-book online — around $4 USD/day</li>
          <li>Return at the end of your trip (refundable deposit required)</li>
          <li>Not ideal if you're travelling solo or moving between cities a lot</li>
        </ul></div>
      </div>
      <div class="modal-note" style="margin-top:14px">💡 <strong>My honest pick:</strong> If your phone supports eSIM, grab Nomad or Airalo before you fly. Staying 2+ weeks? Get a China Mobile SIM at the airport — best coverage nationwide.</div>
    </div></div>
  </div>

  <!-- PAYMENT MODAL -->
  <div class="modal-overlay" id="payment-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">💳 Payments in China · 支付</div>
      <div class="modal-subtitle">China is almost entirely cashless — here's how to not get stuck</div></div>
      <button class="modal-close" onclick="closeModal('payment-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Real talk:</strong> My friend Kory couldn't pay for dinner on her first night because she didn't have Alipay set up. Even tiny food stalls are QR code only. Sort this before you land.</div>
      <div class="app-list">
        <div class="app-item"><div class="app-icon-box">💳</div><div>
          <div class="app-name">Alipay 支付宝 — Do this first</div>
          <div class="app-desc">Now officially supports foreign Visa, Mastercard, and Amex — no Chinese bank account needed. Used absolutely everywhere.</div>
          <div class="app-tip">✅ Use the International version. Settings → Bank Cards. Set this up before you land.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">💬</div><div>
          <div class="app-name">WeChat Pay 微信支付 — Great backup</div>
          <div class="app-desc">Built into WeChat and also accepts foreign cards. Since you need WeChat for everything anyway, set up the payment while you're at it.</div>
          <div class="app-tip">✅ WeChat has thousands of mini-programs too — great for booking and ordering.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">💵</div><div>
          <div class="app-name">Cash — Bring some, just in case</div>
          <div class="app-desc">Bring ¥500–1000 RMB as backup. Some older vendors and rural areas still prefer cash. Exchange at Bank of China for the best rates.</div>
          <div class="app-tip">⚠️ Let your bank know you're travelling so they don't block your card at ATMs.</div>
        </div></div>
      </div>
    </div></div>
  </div>

  <!-- NETWORK MODAL -->
  <div class="modal-overlay" id="network-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🌐 The Firewall & VPN · 网络</div>
      <div class="modal-subtitle">What's blocked, what works, and how to stay connected</div></div>
      <button class="modal-close" onclick="closeModal('network-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Why are things blocked?</strong> China runs a national internet filter called the "Great Firewall." Google, Instagram, WhatsApp, Facebook, YouTube, and ChatGPT are all blocked — it's not a glitch, it's government policy.</div>
      <div class="app-list">
        <div class="app-item"><div class="app-icon-box">🚫</div><div>
          <div class="app-name">What won't work in China</div>
          <div class="app-desc">Google (Search, Maps, Gmail, YouTube), Instagram, Facebook, WhatsApp, Twitter/X, Snapchat, Spotify, Netflix, and most Western news sites. Even some hotel WiFis are filtered.</div>
          <div class="app-tip">⚠️ If you rely on Google Maps, download an alternative before you arrive.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">🔐</div><div>
          <div class="app-name">VPN — The one rule you must follow</div>
          <div class="app-desc">Download and <strong>test</strong> your VPN before you fly. Once you're in China, the App Store and Play Store are also filtered — you can't download VPN apps after arrival. This is the #1 mistake first-time visitors make.</div>
          <div class="app-tip">Free VPNs almost never work reliably in China. Invest in a paid one — it's worth it.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">✅</div><div>
          <div class="app-name">What works great without a VPN</div>
          <div class="app-desc">Amap (better than Google Maps for China), Dianping (restaurant reviews), Bilibili (video), WeChat, and Alipay all work perfectly without any VPN.</div>
          <div class="app-tip">✅ Once you're set up with the right Chinese apps, you honestly won't miss the Western ones much.</div>
        </div></div>
      </div>
      <div class="modal-note" style="margin-top:14px">⚖️ <strong>On legality:</strong> VPN use by tourists is a grey area. Millions of visitors use them every year without issues. Personal use only.</div>
    </div></div>
  </div>

  <!-- APPS MODAL -->
  <div class="modal-overlay" id="apps-modal">
    <div class="modal-box" style="max-width:740px"><div class="modal-header">
      <div><div class="modal-title">📱 Essential Apps · 必备APP</div>
      <div class="modal-subtitle">Download these 6 before you fly — they'll run your entire trip</div></div>
      <button class="modal-close" onclick="closeModal('apps-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="app-list">
        <div class="app-item">
          <div class="app-icon-box" style="background:#07C160;border-color:#07C160">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/WeChat_logo.svg/64px-WeChat_logo.svg.png" alt="WeChat" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='💬'">
          </div>
          <div style="flex:1">
            <div class="app-name">WeChat 微信 — Your everything app</div>
            <div class="app-desc">Messaging, payments, maps, food ordering, mini-programs. Without WeChat, life in China gets hard fast.</div>
            <div class="app-tip">✅ Register with any phone number. Add your Chinese friends so they can show you around.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/wechat/id414478124" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.tencent.mm" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#1677FF;border-color:#1677FF">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alipay_logo.svg/64px-Alipay_logo.svg.png" alt="Alipay" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='💳'">
          </div>
          <div style="flex:1">
            <div class="app-name">Alipay 支付宝 — Pay for everything</div>
            <div class="app-desc">China's dominant payment app. Foreign Visa and Mastercard now accepted directly — no Chinese bank account needed.</div>
            <div class="app-tip">✅ Download the International version. Settings → Bank Cards. Do this before you land.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/alipay/id333206289" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#FF5A00;border-color:#FF5A00">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DiDi_Logo.svg/64px-DiDi_Logo.svg.png" alt="Didi" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='🚗'">
          </div>
          <div style="flex:1">
            <div class="app-name">Didi 滴滴 — China's Uber</div>
            <div class="app-desc">Works in English. No language barrier. Way cheaper than taxis. Set your pickup and destination in the app.</div>
            <div class="app-tip">🔑 My hack: send your driver a <strong>photo of where you are</strong> + "我是外国人，不会讲中文" — works every time.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/didi/id554499054" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.sdu.didi.gsui" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#3274F5;border-color:#3274F5">
            <span style="color:white;font-size:18px">🗺️</span>
          </div>
          <div style="flex:1">
            <div class="app-name">Amap 高德地图 — Navigation</div>
            <div class="app-desc">Google Maps doesn't work well in China. Amap is the most accurate option — English mode, works offline. Download city maps before you explore.</div>
            <div class="app-tip">✅ Switch to English in Settings. Far more accurate than Baidu Maps for foreigners.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/amap/id461703208" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.autonavi.minimap" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#CC0000;border-color:#CC0000">
            <span style="color:white;font-size:13px;font-weight:700">点评</span>
          </div>
          <div style="flex:1">
            <div class="app-name">大众点评 Dianping — Where to eat</div>
            <div class="app-desc">China's Yelp + TripAdvisor. Every restaurant and café rated and reviewed. Filter by "English menu" or "foreigner-friendly".</div>
            <div class="app-tip">✅ This is how locals decide where to eat. The ratings are very trustworthy.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/id351091731" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.dianping.v1" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#EF4D38;border-color:#EF4D38">
            <span style="color:white;font-size:12px;font-weight:700">Trip</span>
          </div>
          <div style="flex:1">
            <div class="app-name">Trip.com 携程 — Book everything</div>
            <div class="app-desc">Trains, flights, and hotels in one English-language app — and it accepts foreign cards. Way easier than the official 12306 rail app.</div>
            <div class="app-tip">✅ Use this to book high-speed rail — most reliable option for foreign passport holders.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/trip-com-travel-deals/id681752345" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=ctrip.english" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-note" style="margin-top:14px">🔤 <strong>For translation:</strong> Download Google Translate with the Chinese offline pack before you fly. Pleco is great for menus and signs — just point your camera at any text.</div>
    </div></div>
  </div>

  <!-- TRANSPORT MODAL -->
  <div class="modal-overlay" id="transport-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🚄 Getting Around China · 交通</div>
      <div class="modal-subtitle">The world's best rail network, affordable metro, and Didi for everything else</div></div>
      <button class="modal-close" onclick="closeModal('transport-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">🚄 High-Speed Rail</div><ul class="info-list">
          <li>Genuinely world-class — fast, clean, and on time</li>
          <li>Beijing → Shanghai in 4.5 hours for about ¥550 (~$75 USD)</li>
          <li>Book on Trip.com with your passport — much easier than the 12306 app</li>
          <li>G trains are fastest, D trains slightly slower, C trains are city rail</li>
          <li>Bring your passport to collect tickets at the station</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚇 Metro</div><ul class="info-list">
          <li>Every major city has a modern, extensive metro network</li>
          <li>Ticket machines have English — easy to use</li>
          <li>Or scan your WeChat or Alipay QR code at the gate</li>
          <li>Fares range from ¥3–15 per journey — incredibly affordable</li>
          <li>Covers all major tourist spots in every big city</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚗 Didi & Alternatives</div><ul class="info-list">
          <li>Didi is the most popular — works in English, no language skills needed</li>
          <li>曹操出行 and 花小猪 are cheaper alternatives worth trying</li>
          <li>Most city rides cost ¥20–40 (~$3–6 USD)</li>
          <li>Never get into an unlicensed taxi at airports</li>
          <li>Save your hotel name in Chinese — show it to the driver if needed</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">✈️ Domestic Flights</div><ul class="info-list">
          <li>Worth it for very long distances, e.g. Beijing to Yunnan</li>
          <li>Book on Trip.com for English support and foreign card payments</li>
          <li>Arrive at least 2 hours early — airport security is thorough</li>
          <li>Budget options include Xiamen Air and Shenzhen Airlines</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- EMERGENCY MODAL -->
  <div class="modal-overlay" id="emergency-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🆘 Emergency Numbers · 紧急电话</div>
      <div class="modal-subtitle">Screenshot this now and save it in your phone</div></div>
      <button class="modal-close" onclick="closeModal('emergency-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">📱 Save these before you land. If you have a Chinese number but can't speak Mandarin, you can send an emergency SMS to <strong>12110</strong> (police text line).</div>
      <div class="emergency-grid">
        <div class="emergency-card"><div class="emg-num">👮 110</div><div class="emg-title">Police</div><div class="emg-desc">For theft, physical attack, or anything threatening your safety. Available 24/7. SMS 12110 if you can't speak Mandarin.</div></div>
        <div class="emergency-card"><div class="emg-num">🚑 120</div><div class="emg-title">Ambulance</div><div class="emg-desc">Tell them your condition and exact location clearly. A single trip can cost $20–55 USD — please get travel insurance before you go.</div></div>
        <div class="emergency-card"><div class="emg-num">🔥 119</div><div class="emg-title">Fire</div><div class="emg-desc">Call immediately if there's a fire. Stay calm and give your exact address so they can reach you quickly.</div></div>
        <div class="emergency-card"><div class="emg-num">🚗 122</div><div class="emg-title">Traffic Accident</div><div class="emg-desc">Call 122 for road accidents in the city. For motorway or expressway incidents, dial 12122 instead.</div></div>
        <div class="emergency-card"><div class="emg-num">🌍 12308</div><div class="emg-title">Foreign Affairs</div><div class="emg-desc">For serious situations — lost passport, detention, or anything requiring consular support. Available in multiple languages.</div></div>
        <div class="emergency-card"><div class="emg-num">📋 12367</div><div class="emg-title">Visa & Immigration</div><div class="emg-desc">For questions about your visa, entry and exit policy, residency permits, or any immigration issue.</div></div>
      </div>
      <div class="modal-note" style="margin-top:14px">🏥 Beijing, Shanghai, and Chengdu all have international hospitals with English-speaking staff. Travel insurance that covers medical evacuation is strongly recommended.</div>
    </div></div>
  </div>

  <!-- CUSTOMS MODAL -->
  <div class="modal-overlay" id="customs-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🛃 Arrival Card & Immigration · 入关</div>
      <div class="modal-subtitle">Here's exactly what to expect when you land in China</div></div>
      <button class="modal-close" onclick="closeModal('customs-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">📝 <strong>Pro tip:</strong> You can fill in your Arrival Card online up to 3 days before you land — saves a lot of time at immigration. Search "中国入境卡网上填报" or ask your airline at check-in.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">✈️ On the Plane</div><ul class="info-list">
          <li>Fill in your Arrival Card — on the plane or online in advance</li>
          <li>Have your hotel address (in Chinese if possible) and phone number ready</li>
          <li>Have your return or onward ticket easily accessible</li>
          <li>Worth having ¥500 RMB cash as backup</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🛂 At Immigration</div><ul class="info-list">
          <li>Join the "Foreigners" queue — look for signs saying 外国人通道</li>
          <li>They'll take fingerprints and a photo — routine, don't worry</li>
          <li>Have ready: passport, Arrival Card, hotel booking confirmation</li>
          <li>If asked your purpose: "Tourism" (旅游, pronounced lǚ yóu)</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🧳 Customs</div><ul class="info-list">
          <li>Most travellers use the green "Nothing to Declare" channel</li>
          <li>You can bring up to ¥5000 RMB cash without declaring it</li>
          <li>Don't bring fresh fruit, meat, or dairy from abroad</li>
          <li>Personal electronics are fine</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚕 Getting to Your Hotel</div><ul class="info-list">
          <li>Use Didi from the arrivals hall — much cheaper than airport taxis</li>
          <li>Most major airports have metro connections into the city</li>
          <li>Have your hotel name saved in Chinese on your phone — show it to the driver</li>
          <li>Avoid anyone in the arrivals hall offering you a "taxi" — use the app</li>
        </ul></div>
      </div>
    </div></div>
  </div>`;

  document.getElementById('ready-container').innerHTML = sectionHTML;
  document.getElementById('ready-modals-container').innerHTML = modalsHTML;
}

loadGetReady();
