// ============================================================
//  assets/getready.js
//  Reorganized into Before You Fly + After You Arrive phases
//  One shared progress bar counts all steps.
//  All existing modals preserved exactly.
//  New modals added for new steps.
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
}

function filterCountries() {
  const q = document.getElementById('visa-search').value.toLowerCase().trim();
  let anyVisible = false;
  document.querySelectorAll('.country-btn').forEach(b => {
    const show = b.textContent.toLowerCase().includes(q);
    b.style.display = show ? '' : 'none';
    if (show) anyVisible = true;
  });
  const fallback = document.getElementById('visa-no-result');
  if (fallback) fallback.style.display = (!anyVisible && q.length > 0) ? 'block' : 'none';
}

// ── STEPS DATA ───────────────────────────────────────────────
// phase: 'fly' = Before You Fly | 'arrive' = After You Arrive
const STEPS = [
  // ── BEFORE YOU FLY ────────────────────────────────────────
  {
    id:'step-passport', num:'Step 1', phase:'fly',
    title:'🛂 Check Your Passport',
    desc:"Is it still valid? China requires at least 6 months of validity beyond your travel dates. No passport yet? Start now — it can take 4–6 weeks.",
    modal:null
  },
  {
    id:'step-visa', num:'Step 2', phase:'fly',
    title:'📋 Sort Your Visa',
    desc:"Requirements vary by nationality — some countries are visa-free for 15–30 days, others need to apply in advance. Some might need your flight tickets and hotel booking when applying. Click below to find out exactly what you need.",
    modal:{id:'visa-modal', label:'Check my visa →'}
  },
  {
    id:'step-flights', num:'Step 3', phase:'fly',
    title:'✈️ Book Flights & Hotel',
    desc:"Heads up: not all hotels in China accept foreign guests — international chains like IHG, Marriott, and Hilton are always a safe bet. If you're flying with a Chinese airline, Tuesdays tend to have lower prices!",
    modal:null
  },
  {
    id:'step-esim', num:'Step 4', phase:'fly',
    title:'📶 Get a SIM or eSIM',
    desc:"You'll need data from the moment you land. Four options: eSIM, Chinese SIM card, pocket WiFi, or international roaming. Sort this before you board.",
    modal:{id:'sim-modal', label:'Compare options →'}
  },
  {
    id:'step-payment', num:'Step 5', phase:'fly',
    title:'💳 Set Up Payments',
    desc:"China is almost entirely cashless — street food stalls, taxis, supermarkets, all QR code. My friend Kory couldn't pay for dinner on her first night using her credit card. Set up Alipay or WeChat before you land.",
    modal:{id:'payment-modal', label:'How to set up →'}
  },
  {
    id:'step-network', num:'Step 6', phase:'fly',
    title:'🌐 Understand the Firewall & VPN',
    desc:"Google, Instagram, WhatsApp, and ChatGPT are all blocked in China. Download and test a VPN before you fly.",
    modal:{id:'network-modal', label:'VPN guide →'}
  },
  {
    id:'step-apps', num:'Step 7', phase:'fly',
    title:'📱 Download Your Apps',
    desc:"There are 6 apps I would highly recommend you to download in advance. Set them up at home — some need verification that's much easier to do before you arrive.",
    modal:{id:'apps-modal', label:'See app guide →'}
  },
  {
    id:'step-transport-intro', num:'Step 8', phase:'fly',
    title:'🚄 Know Your Transport Options',
    desc:"China's high-speed rail, metro, Didi, and domestic flights — each has a different use case. Know which one to use before you land so you're not figuring it out jet-lagged at the airport.",
    modal:{id:'transport-intro-modal', label:'Overview →'}
  },
  {
    id:'step-emergency', num:'Step 9', phase:'fly',
    title:'🆘 Save Emergency Numbers',
    desc:"Screenshot or save these numbers in your phone before you land. You probably won't need them — but you'll be glad you have them if you do.",
    modal:{id:'emergency-modal', label:'View numbers →'}
  },
  {
    id:'step-insurance', num:'Step 10', phase:'fly',
    title:'🏥 Get Travel Insurance',
    desc:"A single hospital visit in China without insurance can cost $2,000+. This is the step most travelers skip and later regret. Spend 10 minutes on this — it's worth every penny.",
    modal:{id:'insurance-modal', label:'What to look for →'}
  },

  // ── AFTER YOU ARRIVE ──────────────────────────────────────
  {
    id:'step-immigration', num:'Step 11', phase:'arrive',
    title:'🛃 Immigration & Arrival',
    desc:"What to expect at the border — which queue to join, what they'll ask, what to declare at customs. You can even fill in your Arrival Card online up to 3 days before you land.",
    modal:{id:'customs-modal', label:'Arrival guide →'}
  },
  {
    id:'step-hotel-transfer', num:'Step 12', phase:'arrive',
    title:'🚕 Get to Your Hotel',
    desc:"From arrivals hall to your front door — Didi, airport metro, hotel bus or airport bus. Don't get into an unlicensed taxi. Here's exactly what to do the moment you walk out of baggage claim.",
    modal:{id:'hotel-transfer-modal', label:'How to get there →'}
  },
  {
    id:'step-getaround', num:'Step 13', phase:'arrive',
    title:'🚇 Get Around Like a Local',
    desc:"Metro tickets, bullet train classes, Didi tips, domestic flights — the complete guide to moving around China once you're here.",
    modal:{id:'transport-modal', label:'Full transport guide →'}
  },
  {
    id:'step-qrpay', num:'Step 14', phase:'arrive',
    title:'📲 Using QR Payments',
    desc:"In China you scan with Alipay or WeChat — NOT your phone's camera app. Sounds small but this trips up almost everyone on day one. Here's exactly how it works.",
    modal:{id:'qrpay-modal', label:'How to pay →'}
  },
  {
    id:'step-food', num:'Step 15', phase:'arrive',
    title:'🍜 Order Food Confidently',
    desc:"Picture menus, QR code menus, translation apps, how to ask for no spice — everything you need to eat well without speaking Mandarin.",
    modal:{id:'food-modal', label:'Food guide →'}
  },
  {
    id:'step-locals', num:'Step 16', phase:'arrive',
    title:'🗣️ Talk with Locals',
    desc:"You don't have to speak Mandarin to have meaningful interactions - but these 10 phrases will take you surprisingly far, and locals absolutely love when you try.",
    modal:{id:'locals-modal', label:'Key phrases →'}
  },
  {
    id:'step-wrong', num:'Step 17', phase:'arrive',
    title:'🆘 If Something Goes Wrong',
    desc:"Lost passport, missed train, got sick, scammed, or just completely lost — here's the calm, step-by-step guide for when things don't go to plan.",
    modal:{id:'wrong-modal', label:'Emergency guide →'}
  }
];

// ── CHECKLIST STATE ──────────────────────────────────────────
const steps = STEPS.map(s => s.id); // single source of truth — no duplication

const statusMsgs = [
  'Just getting started — your adventure awaits! 🌱',
  'Step 1 done — passport checked ✅',
  'Visa sorted — you\'re officially going! 🎉',
  'Flights & hotel booked — it\'s real now! 🛫',
  'SIM ready — you\'ll have signal the moment you land 📶',
  'Payments sorted — you can eat ANYTHING 🍜',
  'Firewall understood — VPN downloaded 🌐',
  'Apps ready — you\'re basically a local 📱',
  'Transport options understood 🚄',
  'Emergency numbers saved — you\'re prepared 🆘',
  'Travel insurance sorted — smart move 🏥',
  '✈️ PRE-TRIP COMPLETE! Now let\'s land safely…',
  'Immigration done — welcome to China! 🇨🇳',
  'Made it to the hotel — first mission complete, have a good rest! 🏨',
  'Getting around like a pro 🚇',
  'Payments working — scan away 📲',
  'Fed and happy 🍜',
  'Making friends with locals 🗣️',
  '100% CHINA READY! You\'ve got this! Ni hao! 🇨🇳🎊'
];

function toggleStep(id) {
  const el = document.getElementById(id);
  el.classList.toggle('done');
  // Persist each step independently — refresh-safe
  localStorage.setItem('rc_' + id, el.classList.contains('done') ? '1' : '0');
  updateProgress();
}

function updateProgress() {
  const done = steps.filter(s => document.getElementById(s) && document.getElementById(s).classList.contains('done')).length;
  const pct  = Math.round((done / steps.length) * 100);
  document.getElementById('prog-bar').style.width    = pct + '%';
  document.getElementById('pct-label').textContent   = pct + '%';
  document.getElementById('prog-status').textContent = statusMsgs[done] || statusMsgs[0];
}

// ── RENDER HELPERS ───────────────────────────────────────────
function buildStep(s) {
  return `
    <div class="check-step" id="${s.id}">
      <div class="step-check" onclick="toggleStep('${s.id}')"></div>
      <div style="flex:1">
        <div class="step-num-label">${s.num}</div>
        <div class="step-title-main">${s.title}</div>
        <div class="step-desc-main">${s.desc}</div>
        ${s.guide ? `<a href="${s.guide}" style="display:inline-flex;align-items:center;gap:5px;
          font-size:11px;color:var(--gold);margin-top:6px;text-decoration:none;
          font-weight:500;letter-spacing:.3px" title="Full step-by-step guide">
          📖 Full guide →
        </a>` : ''}
      </div>
      ${s.modal ? `<div class="step-action">
        <button class="step-btn" onclick="openModal('${s.modal.id}')">${s.modal.label}</button>
      </div>` : ''}
    </div>`;
}

function buildPhase(phase, icon, title, subtitle) {
  const phaseSteps = STEPS.filter(s => s.phase === phase);
  return `
    <div class="gr-phase">
      <div class="gr-phase-header">
        <div class="gr-phase-icon">${icon}</div>
        <div>
          <div class="gr-phase-title">${title}</div>
          <div class="gr-phase-sub">${subtitle}</div>
        </div>
      </div>
      <div class="checklist-steps">${phaseSteps.map(buildStep).join('')}</div>
    </div>`;
}

// ── MAIN LOADER ──────────────────────────────────────────────
function loadGetReady() {

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

    ${buildPhase('fly',    '🛫', 'Before You Fly',    'Sort these out before you board — future you will be grateful')}
    ${buildPhase('arrive', '🛬', 'After You Arrive',  "You've landed — here's everything you need to hit the ground running")}

  </section>`;

  // ── ALL MODALS ───────────────────────────────────────────────
  const modalsHTML = `

  <!-- VISA MODAL — unchanged -->
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
        <div id="visa-no-result" style="display:none;padding:14px;font-size:12px;color:var(--text-muted);background:var(--surface);border-radius:8px;line-height:1.8">
          No country-specific information available yet.<br>
          <a href="https://www.visaforchina.cn/globle/" target="_blank" rel="noopener" style="color:var(--gold);font-weight:500">Check the official China Visa Service Centre →</a>
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

  <!-- SIM MODAL — unchanged -->
  <div class="modal-overlay" id="sim-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">📶 SIM Card & eSIM · 手机卡</div>
      <div class="modal-subtitle">How to stay connected from the moment you land</div></div>
      <button class="modal-close" onclick="closeModal('sim-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Heads up:</strong> The eSIM is the choice most people make, but getting a SIM card makes your trip funnier - you can order food, ride a shared bike, make reservations at restaurants or buy entrance tickets for specific places.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">📲 eSIM — Best for most travelers</div><ul class="info-list">
          <li><strong>Best for</strong> stays of 5–15 days where you mainly need chat, maps, and social media</li>
          <li><strong>Buy</strong> on Nomad, Airalo, Holafly, or China Unicom International before you fly</li>
          <li><strong>Activate:</strong> Scan QR code → activate → works the moment you land ✅</li>
          <li><strong>Cost</strong>around ¥100 ($13 USD) for 10GB / 30 days</li>
          <li>To check if your phone is compatible: dial <strong>*#06#</strong> — if you see EID, you're good ✅</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">💳 Physical SIM — Best for longer stays</div><ul class="info-list">
          <li><strong>Best</strong> if you're staying 2+ weeks or need a real Chinese phone number for registering certain apps, receiving bank codes, and hotel check-in</li>
          <li><strong>Buy</strong> at China Mobile / Unicom / Telecom counters at airports or visit carrier shops in the city</li>
          <li><strong>Register:</strong>Bring your passport → Go to a counter → choose a plan → ask staff to help you activate your plan → done</li>
          <li><strong>Cost</strong>around ¥250 ($35 USD) for 80GB + 300 mins calls / 30 days</li>
          <li>⚠️ Passport is required by law to register a Chinese SIM card</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">📡 Pocket WiFi — Best as a backup</div><ul class="info-list">
          <li>Great if your phone isn't eSIM compatible or you want to share data with your companions.</li>
          <li>Rent at the airport or pre-book online and return at the end of your trip (refundable deposit required)</li>
          <li><strong>Cost</strong>around $4 USD/day</li>
          <li>Not ideal if you're travelling solo or moving between cities a lot</li>
        </ul></div>
      </div>
      <div class="modal-note" style="margin-top:14px">💡 <strong>My honest pick:</strong> If your phone supports eSIM, grab one before you fly. Staying 2+ weeks? Get a China Mobile SIM at the airport — best coverage nationwide.</div>
    </div></div>
  </div>

  <!-- PAYMENT MODAL — unchanged -->
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
          <div class="app-desc">Built into WeChat and also accepts foreign cards. You probably need WeChat for everything - mini programs, messaging and menu check, set up your account in advance.</div>
          <div class="app-tip">✅ WeChat has thousands of mini-programs — great for booking and ordering.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">💵</div><div>
          <div class="app-name">Cash — Bring some, just in case</div>
          <div class="app-desc">Bring ¥100–500 RMB as backup if theres any internet issue. <strong>Refusing to accept RMB(Chinese Yuan) cash is illegal in China</strong>. Exchange at Bank of China for the best rates.</div>
          <div class="app-tip">⚠️ Let your bank know you're travelling so they don't block your card at ATMs.(ATMs with UnionPay/Visa logos work for foreign cards).</div>
        </div></div>
      </div>
    </div></div>
  </div>

  <!-- NETWORK MODAL — unchanged -->
  <div class="modal-overlay" id="network-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🌐 The Firewall & VPN · 网络</div>
      <div class="modal-subtitle">What's blocked, what works, and how to stay connected</div></div>
      <button class="modal-close" onclick="closeModal('network-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Why are things blocked?</strong> China runs a national internet filter called the "Great Firewall." Google, Instagram, WhatsApp, Facebook, YouTube, and ChatGPT are all blocked — it's government policy, not a glitch.</div>
      <div class="app-list">
        <div class="app-item"><div class="app-icon-box">🚫</div><div>
          <div class="app-name">What won't work in China</div>
          <div class="app-desc">Google (Search, Maps, Gmail, YouTube), Instagram, Facebook, WhatsApp, Twitter/X, Snapchat, Spotify, Netflix, and most Western news sites.</div>
          <div class="app-tip">⚠️ Download AMAP before you arrive — Google Maps won't work reliably.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">🔐</div><div>
          <div class="app-name">VPN — The one rule you must follow</div>
          <div class="app-desc">Download and <strong>test</strong> your VPN before you fly. Once in China, the App Store and Play Store are filtered — you can't easily download VPN apps after arrival. This is the #1 mistake first-time visitors make.</div>
          <div class="app-tip">Free VPNs almost never work reliably in China. Invest in a paid one.</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box">✅</div><div>
          <div class="app-name">What works great without a VPN</div>
          <div class="app-desc">Amap, Dianping, Didi, WeChat, and Alipay all work perfectly without any VPN.</div>
          <div class="app-tip">✅ Once you're set up with the right Chinese apps, you honestly won't miss much.</div>
        </div></div>
      </div>
      <div class="modal-note" style="margin-top:14px">⚖️ <strong>On legality:</strong> VPN use by tourists is a grey area. Millions of visitors use them every year without issues. Personal use only.</div>
    </div></div>
  </div>

  <!-- APPS MODAL — unchanged -->
  <div class="modal-overlay" id="apps-modal">
    <div class="modal-box" style="max-width:740px"><div class="modal-header">
      <div><div class="modal-title">📱 Essential Apps · 必备APP</div>
      <div class="modal-subtitle">Download these 6 before you fly — they'll run your entire trip</div></div>
      <button class="modal-close" onclick="closeModal('apps-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="app-list">
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#07C160">
            <img src="https://sgnewres.wechat.com/t/ofs-wechat/newsroom-web/res/_next/static/media/weChatWhite.5b5eb6c1.png" alt="WeChat" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='💬'">
          </div>
          <div style="flex:1">
            <div class="app-name">WeChat 微信 — Your everything app</div>
            <div class="app-desc">Messaging, payments, maps, food ordering, mini-programs. Without WeChat, life in China gets hard fast.</div>
            <div class="app-tip">✅ Register with any phone number. Add Chinese friends so they can help you anytime.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/wechat/id414478124" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.tencent.mm" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#1677FF">
            <img src="https://upload.wikimedia.org/wikipedia/en/c/c7/Alipay_logo_%282020%29.svg" alt="Alipay" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='💳'">
          </div>
          <div style="flex:1">
            <div class="app-name">Alipay 支付宝 — Pay for everything</div>
            <div class="app-desc">China's dominant payment app. Foreign Visa and Mastercard now accepted directly — no Chinese bank account needed.</div>
            <div class="app-tip">✅ Download the International version, turn on the translation to explore everything. Settings → Verify. Do this before you land.</div>
            <!-- ✏️ Add your YouTube tutorial link here when ready:
            <a href="https://youtube.com/YOUR_VIDEO_ID" target="_blank" class="yt-link">▶ Watch: How to set up Alipay</a> -->
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/alipay/id333206289" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
              <a href="../alipay" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to register →</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#FF5A00">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/75/DiDi_Logo.svg" alt="Didi" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='🚗'">
          </div>
          <div style="flex:1">
            <div class="app-name">Didi 滴滴 — China's Uber</div>
            <div class="app-desc">Works in English. No language barrier. Way cheaper than taxis.</div>
            <div class="app-tip">🔑 Send your driver a photo of where you are + "我是外国人，不会讲中文" — works every time.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/didi/id554499054" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.sdu.didi.psnger" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#3274F5">
            <img src="https://upload.wikimedia.org/wikipedia/en/e/e7/AutoNaviLogo.png" alt="AMAP" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='🗺️'">
          </div>
          <div style="flex:1">
            <div class="app-name">Amap 高德地图 — Navigation</div>
            <div class="app-desc">Google Maps doesn't work well in China. Amap is the most accurate option — English mode, works offline.</div>
            <div class="app-tip">✅ Switch to English in Settings. Far more accurate than Google Maps for foreigners.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/amap/id461703208" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.autonavi.minimap" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#CC0000">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAeFBMVEX/////ZjP/7en/VQv/Yy7/Wx3/YSr/XiP/ZTD/7+r/8+///fz/+fb/UgD/Xyb/TwD/azn/WBb/ckb/0sf/bT7/e1T/4Nj/zsL/6eP/tKH/o4r/wbL/dkz/lHf/uqn/i2n/gFr/rZj/qJH/hWL/noP/2dD/yLr/j3A1hrkOAAAG0UlEQVR4nO2b25KCOBCGB8hJQCSoKHISBX3/N1xFdyaJSSAQq7Zq+S8twc/Q6VOan59FixYtWrRo0aJFixYt+h8oCP2Vsfww+A6N2+WnOkYQUs9YFEIUX09551pFOpQFphgBQpxJIgQgTGFR3mwR+VXsRRNpBDbkgWxlg+m2x8AG0UsAFtVsJLdeW0Tqsdbn4zymYxLZRXoqirs5TFuA7DM9Fis6zFin7zA9qSavlZt8ielBFacToepBewIRfiiawB7tpzHd1kM3pkXZVFV2umJo7Me8bAqTv9f7AhSVnf8KauExc7AhFEmmOIYKam9Kz5xV+BfP0J/BywQoR/cjBDeh8P3Dzsy0CBbvMKyDp7sjzj+vWMVmVNQ83pS6X4BSK01jI3NHd9M0yy00Ty86yy/Khf1KAPTU/43EpqbeacycIJXn2zMIAMN4f9me1VR0awiVU81CtaqrDm/HQCLq7U55+ng+rdpXwMYQ6qTxO1QZuMK3byvK6vg2mFy95FFtCHXV2EKkNtD+v+DW//tkq4YCO0OoWG3n6Kq+rHckUcl8kqoDKMGGUEi9u/FJfVm6FqlTzS6GZu4z0ERYXXx4QbEZQKpmcqivvJFMocYjwMGVOrOfaByqZ1bZ+DqPoNk0L5u6s1CayGAItdJEPt2myaC4lJ3Gt1iEcjxleAh7T0LZOljjpxzPrI53dVBY6YlfVg1Z6ObLUI/w6jzNluxUNyufzwpd2Z2u8cJzoQiKIIwv221PpXIK6aZfSC6vAbrdNwOKYBpfL3lvlWXvoD1pfPf7dIcg1vukWuOcDkV27cH994m8FkNetr1KMsq5sUxXUMyA4rOntjdc9Fni+vfet4GEXajwrMv0Z0Dxm21V9JYLSMXnCmnyWhPItQlSbUk0Awo4nI87vmspWuS/n4fdnb4+FWrM8ltQDuV/aAtev4/wrq66NO3yNkHvBEXYl66+dpwDBRI+xdjCNwJBdO15aw+/tz3xhFh90dfNs/wUFiqqdC/NbKJIqAaPjr7mmgVFIiHaBRf4kVCidS36iXqgwTDPo+O7+IX07kAmgBAc7T/a0bpYbAHKwZ8ldtoUmw2FOMJ0s0Ht4aOaOGq7ERagiKxwDPy0atr2lG1dSbIdDvcB52YJYGdaY5fDHavZqQuKze7QahJqa1BOtDdZq3bIyO1APTz4+I5uCzEc7uzZyDyRM/YQKnDT28nZDHFZydHJujWpP/zsir4WkBnBxKinFHanta7EslTNAK8wOyvwL0jZ4rBXYqHobobV1Z4iLtus+9AmzjqT3kS+kz9Dm1DPChDsy2Y8l7uXulK7UM/lgrlJxzmjkkdoGwqZniNmkrzQMhQyjs8/B/rhSi3b1JQzxPzD2q1CEXnTOkwPedY0Vb5NpeZWiTe1CiU76gkPbRH3B6UYo3h/6j7zvkBs9NuEkpwUHFu4jv4aLATgjZN9/GRw5aksQqFC/HbYOvhjbwEcV+JquYgzdptQokEdEnkuQOjHrAZv7PagxI5ZeMHKCiFyhPI04A61rEERj99ZQa0zP7IWiuuOjTfWoIRD0VDfV/nYFcGdSWRsQZGEzz2Hi5YN/wTZvrotKGGhshFFC+ajJNMutgW14RYqlcV+UQhwVnj7u7UlKOGsb3ga5il+v/rJr6+yBMUHmMO4iS/hWL39vcoSFGCzg3A/cjoCcifhN8tQoOAa90NjQ79LBVmrcn//ih0oxJ4O/9xHz+tBzi387j9DKMXRGucQwmT0FAkq/5Yq/JufsAO1ZmPxdvy8DXn1kQK3a5KNN/Xx+XKoDXuXymCOy3v8mzSrEwy5gGx4hiz31JRNkAaa5JzQtYZrKM4VGK6UfASAn90oTeZSpQ0FwxGAH+kEMyEst+7Mc5wMhyXkYyXAYaE0Q0jjZDxWIv1FQpjHF9RzoYwHcKRjT/xsn5FNyWQ8qiQ/wvBYy2xMRztFGQ91ddKMcsOG+9tcKGo6a+1KY4jH3kY37zNGxLwhIR2p5BY81A04jhC4Gk+f3mTPD3FHbJoZwDGSD4tqFSDJOpCEDQz6odkhEVN//pS0UPkbR0jzdmAMe0BYOZipkXQmts/RQ3fbJgjPe3OFmPcC+6WSPJ3ovro1NaHzX6WhUya/HzpLXDYAONJMNo4WMg0x/+qoGfacKQImvw7S2XzhiWOCM16cuX2HisBZ72N1htP4o4TAjHV6Ki1UR1BTReBu1qtYvbLE/KUYDRLeTfQFvI4nSG14gf71AtrOfI/uV2FVxxRGukHEYR4EqXPNJsQ7NdZx29Q7DM3fYn0J4t21OaTmb8qMYfPdlWuulf8VmkWLFi1atGjRokWLFi36j+kfy71oRgMkReoAAAAASUVORK5CYII=" alt="点评" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='🍽️'">
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
          <div class="app-icon-box" style="background:#faf6ef;border-color:#EF4D38">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Trip.com_logo.svg" alt="Trip" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.innerHTML='✈️'">
          </div>
          <div style="flex:1">
            <div class="app-name">Trip.com 携程 — Book everything</div>
            <div class="app-desc">Trains, flights, and hotels in one English-language app — and it accepts foreign cards.</div>
            <div class="app-tip">✅ Use this to book high-speed rail — most reliable option for foreign passport holders.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/trip-com-travel-deals/id681752345" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=ctrip.english" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-note" style="margin-top:14px">🔤 <strong>For translation:</strong> Download Google Translate with the Chinese offline pack before you fly. <strong>Baidu Translate</strong> is a solid local alternative.</div>
    </div></div>
  </div>

  <!-- TRANSPORT INTRO MODAL (Step 8 — Before You Fly overview) -->
  <div class="modal-overlay" id="transport-intro-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🚄 Your Transport Options · 交通概览</div>
      <div class="modal-subtitle">Know what exists before you land — choose the right one for each journey</div></div>
      <button class="modal-close" onclick="closeModal('transport-intro-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">🚄 High-Speed Rail (高铁)</div><ul class="info-list">
          <li>The backbone of China travel — fast, cheap, punctual</li>
          <li>Beijing → Shanghai: 4.5 hours (~¥550 / $75 USD for second-class seats)</li>
          <li>Book with your passport on Trip.com or the 12306 app</li>
          <li>G trains fastest, D trains slightly slower, C trains are city rail</li>
          <li>🥚 Easter egg: you can order food delivery to your seat by scanning the QR code!</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚇 Metro (地铁)</div><ul class="info-list">
          <li>Every major city has a modern, extensive metro network</li>
          <li>The most ticket machines have English — or scan WeChat / Alipay QR at the gate</li>
          <li>Fares: ¥3–15 per journey — extremely affordable</li>
          <li>Covers all major tourist spots in every big city</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚗 Didi (滴滴)</div><ul class="info-list">
          <li>Works in English — set pickup and destination in the app</li>
          <li>Most city rides: ¥20–40 (~$3–6 USD)</li>
          <li>Much cheaper and safer than street taxis</li>
          <li>Avoid unlicensed "taxi" offers at airports (that charge extra fees)</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">✈️ Domestic Flights</div><ul class="info-list">
          <li>Worth it for very long distances (e.g. Beijing → Yunnan)</li>
          <li>Book on Trip.com for English + foreign card support</li>
          <li>Arrive at least 1 hour early — security is thorough</li>
          <li>Budget options: Xiamen Air, Shenzhen Airlines</li>
        </ul></div>
      </div>
      <div class="modal-note" style="margin-top:14px">💡 The full how-to guide — buying metro tickets, booking bullet trains, train seat classes — is in the <strong>After You Arrive</strong> section.</div>
    </div></div>
  </div>

  <!-- EMERGENCY MODAL — unchanged -->
  <div class="modal-overlay" id="emergency-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🆘 Emergency Numbers · 紧急电话</div>
      <div class="modal-subtitle">Screenshot this now and save it in your phone</div></div>
      <button class="modal-close" onclick="closeModal('emergency-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">📱 Save these before you land. If you have a Chinese number but can't speak Mandarin, you can send an emergency SMS to <strong>12110</strong> (police text line).</div>
      <div class="emergency-grid">
        <div class="emergency-card"><div class="emg-num">👮 110</div><div class="emg-title">Police</div><div class="emg-desc">For theft, attack, or anything threatening your safety. SMS 12110 if you can't speak Mandarin.</div></div>
        <div class="emergency-card"><div class="emg-num">🚑 120</div><div class="emg-title">Ambulance</div><div class="emg-desc">Tell them your condition and exact location clearly. Get travel insurance — a single trip can cost $55 USD.</div></div>
        <div class="emergency-card"><div class="emg-num">🔥 119</div><div class="emg-title">Fire</div><div class="emg-desc">Call immediately if there's a fire. Stay calm and give your exact address.</div></div>
        <div class="emergency-card"><div class="emg-num">🚗 122</div><div class="emg-title">Traffic Accident</div><div class="emg-desc">Call 122 for city road accidents. For expressways, dial 12122.</div></div>
        <div class="emergency-card"><div class="emg-num">🌍 12308</div><div class="emg-title">Foreign Affairs</div><div class="emg-desc">Lost passport, detention, or situations requiring consular support. Available in multiple languages.</div></div>
        <div class="emergency-card"><div class="emg-num">📋 12367</div><div class="emg-title">Visa & Immigration</div><div class="emg-desc">Questions about your visa, entry/exit policy, residency permits, or any immigration issue.</div></div>
      </div>
      <div class="modal-note" style="margin-top:14px">🏥 Beijing, Shanghai, and Chengdu all have international hospitals with English-speaking staff.</div>
    </div></div>
  </div>

  <!-- TRAVEL INSURANCE MODAL (new — Step 10) -->
  <div class="modal-overlay" id="insurance-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🏥 Travel Insurance · 旅行保险</div>
      <div class="modal-subtitle">The step most travelers skip — and later regret</div></div>
      <button class="modal-close" onclick="closeModal('insurance-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Real numbers:</strong> A hospital visit in Beijing without insurance can cost ¥5,000–50,000 ($700–7,000 USD). An ambulance ride is ¥400–800. Medical evacuation to your home country? Up to $100,000 USD. Travel insurance costs about $3–8 per day. It's not optional.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">✅ What to look for</div><ul class="info-list">
          <li>Medical coverage of at least $100,000 USD</li>
          <li>Emergency evacuation included</li>
          <li>Trip cancellation / interruption coverage</li>
          <li>Lost baggage and passport replacement</li>
          <li>24/7 emergency assistance hotline</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🌍 Recommended providers</div><ul class="info-list">
          <li><strong>World Nomads</strong> — popular with backpackers, covers adventure activities</li>
          <li><strong>SafetyWing</strong> — subscription-based, great for longer trips</li>
          <li><strong>Allianz Travel</strong> — solid comprehensive coverage</li>
          <li>Check if your credit card already includes travel insurance — many do!</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">📋 Before you buy</div><ul class="info-list">
          <li>Check if pre-existing conditions are covered</li>
          <li>Make sure China is explicitly included in coverage area</li>
          <li>Screenshot or print your policy number and emergency hotline</li>
          <li>Save the insurer's 24/7 number in your phone contacts</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- CUSTOMS / IMMIGRATION MODAL — unchanged (now Step 11) -->
  <div class="modal-overlay" id="customs-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🛃 Immigration & Arrival · 入关</div>
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
          <li>Worth having ¥300 RMB cash as backup</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🛂 At Immigration</div><ul class="info-list">
          <li>Join the "Foreigners" queue — look for signs saying 外国人通道</li>
          <li>They'll take fingerprints and a photo — routine, don't worry</li>
          <li>Have ready: passport, Arrival Card, hotel booking confirmation</li>
          <li>If asked your purpose: "Tourism" (旅游, lǚ yóu)</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🧳 Customs Declaration</div><ul class="info-list">
          <li>Most travellers use the green "Nothing to Declare" channel</li>
          <li>You can bring up to ¥5,000 RMB cash without declaring</li>
          <li>Don't bring fresh fruit, meat, or dairy from abroad</li>
          <li>Personal electronics are fine — power banks need CCC certification mark</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">💼 Luggage & Baggage Claim</div><ul class="info-list">
          <li>Follow signs to 行李提取 (baggage claim)</li>
          <li>Check the arrivals board for your flight number and belt number</li>
          <li>If your bag is lost or damaged, report it at the airline desk before leaving</li>
          <li>Keep your boarding pass until you've confirmed your bag arrived</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- HOTEL TRANSFER MODAL (new — Step 12) -->
  <div class="modal-overlay" id="hotel-transfer-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🚕 Airport → Your Hotel · 去酒店</div>
      <div class="modal-subtitle">Don't get into an unlicensed taxi — here's exactly what to do</div></div>
      <button class="modal-close" onclick="closeModal('hotel-transfer-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">⚠️ <strong>First rule:</strong> Ignore anyone in the arrivals hall who approaches you offering a "taxi" or "ride." These are unlicensed drivers who charge 3–5x the normal rate and sometimes take you to the wrong place. Use the app.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">📱 Option 1: Didi (Recommended)</div><ul class="info-list">
          <li>Open Didi → set destination to your hotel name in English — it will find it</li>
          <li>Wait in the designated ride-hailing zone (look for 网约车 signs at the airport)</li>
          <li>Share your hotel name in Chinese with the driver — screenshot it from Maps</li>
          <li>Most airport→city rides: ¥60–150 (~$8–20 USD)</li>
          <li>Pay through the app — no cash needed</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚇 Option 2: Airport Metro</div><ul class="info-list">
          <li>Most major airports (Beijing, Shanghai, Chengdu, Guangzhou) have direct metro links</li>
          <li>Cheapest option — usually ¥25–35 to the city centre</li>
          <li>Look for 地铁 signs in the arrivals hall</li>
          <li>Best if your hotel is near a metro station and you have light luggage</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚌 Option 3: Airport Bus (机场大巴)</div><ul class="info-list">
          <li>Cheap shuttles that run fixed routes to city hotels</li>
          <li>Look for 机场巴士 signs outside arrivals — usually ¥20–35</li>
          <li>Slower than metro but good if you have heavy luggage</li>
          <li>Pay with cash or Alipay at the counter</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🏨 At Your Hotel</div><ul class="info-list">
          <li>Show your passport — hotels in China are legally required to register it</li>
          <li>Some budget hotels don't accept foreign guests — book international chains to be safe</li>
          <li>Ask the front desk for the hotel's WeChat card or address in Chinese — useful for Didi</li>
          <li>Connect to the hotel WiFi and test your VPN before going out</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- TRANSPORT FULL MODAL (Step 13 — After You Arrive) -->
  <div class="modal-overlay" id="transport-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🚇 Getting Around China · 出行指南</div>
      <div class="modal-subtitle">Metro, bullet trains, Didi, and domestic flights — the complete guide</div></div>
      <button class="modal-close" onclick="closeModal('transport-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">🚇 Metro — Day-to-day city travel</div><ul class="info-list">
          <li>Buy a single journey ticket at the machine — select English, enter destination, pay</li>
          <li>Or scan your Alipay / WeChat QR code directly at the gate (faster)</li>
          <li>Fares: ¥3–15 per journey</li>
          <li>Rush hours: 7:30–9am and 5:30–7pm — expect crowding</li>
          <li>Need help? Go to 客服中心 (Customer Service) — staff are always there</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚄 Bullet Train Seat Classes</div><ul class="info-list">
          <li><strong>Business Class (商务座)</strong> — like business on a plane, fully flat seat, meals. Worth it on overnight routes.</li>
          <li><strong>First Class (一等座)</strong> — wider seats, more space, quieter carriage. ~30% more than second class.</li>
          <li><strong>Second Class (二等座)</strong> — perfectly comfortable, what most locals use. Best value.</li>
          <li><strong>Standing Ticket (无座)</strong> — no guaranteed seat, but you can often find one in second class. Only buy in emergencies.</li>
          <li>Book on Trip.com — use your passport number at the machine to collect</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚗 Didi Tips</div><ul class="info-list">
          <li>Set pickup precisely — pin your exact location on the map</li>
          <li>Copy-paste to driver: "我是外国人，不会讲中文" (I'm a foreigner, I can't speak Mandarin)</li>
          <li>Send a photo of your exact location if on a busy street</li>
          <li>Check the driver's rating before accepting — 4.8+ is good</li>
          <li>Cheaper alternatives: 曹操出行 and 花小猪 (worth trying after your first trip)</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">✈️ Domestic Flights</div><ul class="info-list">
          <li>Best for distances over 1,000km (e.g. Beijing → Yunnan, Shanghai → Xinjiang)</li>
          <li>Book on Trip.com — foreign cards accepted, English interface</li>
          <li>Arrive at least 2 hours before departure — security is thorough</li>
          <li>Budget airlines: Xiamen Air, Shenzhen Airlines, Juneyao Air</li>
          <li>Luggage rules: 20kg checked, 5kg carry-on typically</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- QR PAYMENT MODAL (new — Step 14) -->
  <div class="modal-overlay" id="qrpay-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">📲 QR Code Payments · 扫码支付</div>
      <div class="modal-subtitle">Scan with Alipay or WeChat — NOT your phone's camera app</div></div>
      <button class="modal-close" onclick="closeModal('qrpay-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">💡 <strong>The #1 confusion for first-timers:</strong> When a vendor shows you a QR code, you don't scan it with your phone's camera. You open Alipay or WeChat, tap the scan icon inside the app, then scan. This is how 99% of payments work in China.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">📱 How to Pay (Alipay)</div><ul class="info-list">
          <li>Open Alipay → tap the <strong>Scan (扫一扫)</strong> icon at the top</li>
          <li>Point your camera at the vendor's QR code</li>
          <li>Enter the amount if prompted, or it auto-fills</li>
          <li>Confirm with your fingerprint or passcode</li>
          <li>You'll hear a "payment successful" sound 🔔</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">💬 How to Pay (WeChat)</div><ul class="info-list">
          <li>Open WeChat → tap the <strong>+</strong> icon (top right) → Scan QR Code</li>
          <li>Or go to Me → Pay → Scan</li>
          <li>Same process as Alipay — point at the QR code and confirm</li>
          <li>WeChat Pay is widely accepted everywhere Alipay is</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🛒 When you're the one showing the QR</div><ul class="info-list">
          <li>Open Alipay → tap <strong>Receive (收钱)</strong> — show your QR to the vendor</li>
          <li>The vendor scans your code and enters the amount</li>
          <li>You'll get a notification when payment is received</li>
          <li>This is common at small shops and street stalls</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">⚠️ Common situations</div><ul class="info-list">
          <li><strong>Restaurant:</strong> Scan the table QR to see the menu and order directly</li>
          <li><strong>Supermarket:</strong> Self-checkout with Alipay QR — faster than cash</li>
          <li><strong>Convenience stores:</strong> Show your Alipay barcode at checkout</li>
          <li><strong>Vending machines:</strong> Scan the QR on screen with Alipay or WeChat</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- FOOD ORDERING MODAL (new — Step 15) -->
  <div class="modal-overlay" id="food-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🍜 Ordering Food · 点餐</div>
      <div class="modal-subtitle">Eat confidently without speaking Mandarin</div></div>
      <button class="modal-close" onclick="closeModal('food-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">📱 QR Code Menus</div><ul class="info-list">
          <li>Most restaurants have a QR code on the table — scan with WeChat</li>
          <li>A digital menu appears in Chinese — use Google Translate camera to read it</li>
          <li>Select items and quantities, then pay through the mini-program</li>
          <li>Your order goes straight to the kitchen — no need to talk to anyone</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🖼️ Picture Menus & Pointing</div><ul class="info-list">
          <li>Most local restaurants have photo menus — just point at what looks good</li>
          <li>Hold up fingers to show the quantity you want</li>
          <li>Smile — this works better than you think 😊</li>
          <li>Dianping app shows photos and reviews of every dish</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🔤 Translation Tips</div><ul class="info-list">
          <li>Google Translate camera: point at any menu text — instant translation</li>
          <li>Works offline if you've downloaded the Chinese language pack</li>
          <li>Baidu Translate is a good local alternative that works without VPN</li>
          <li>Show the translated text to staff — they understand immediately</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🌶️ Useful phrases for ordering</div><ul class="info-list">
          <li><strong>不辣 (bù là)</strong> — Not spicy</li>
          <li><strong>少辣 (shǎo là)</strong> — A little spicy</li>
          <li><strong>不要香菜 (bú yào xiāng cài)</strong> — No coriander/cilantro</li>
          <li><strong>这个 (zhè gè)</strong> — This one (point at menu)</li>
          <li><strong>好吃！(hǎo chī)</strong> — Delicious! (makes everyone smile)</li>
        </ul></div>
      </div>
      <div class="modal-note" style="margin-top:14px">🍱 <strong>Kat's tip:</strong> Use Dianping to find restaurants near you. Filter by rating (4.5+ is excellent). The photos show you exactly what to expect before you walk in.</div>
    </div></div>
  </div>

  <!-- LOCALS / PHRASES MODAL (new — Step 16) -->
  <div class="modal-overlay" id="locals-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🗣️ Talking with Locals · 和当地人交流</div>
      <div class="modal-subtitle">Ten phrases that take you surprisingly far</div></div>
      <button class="modal-close" onclick="closeModal('locals-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">💛 You don't need to speak Mandarin fluently. Even trying a few words will instantly make locals warmer and more helpful. Chinese people genuinely appreciate the effort.</div>
      <div class="app-list">
        <div class="app-item"><div class="app-icon-box" style="font-size:18px;background:var(--red-soft)">👋</div><div>
          <div class="app-name">Greetings</div>
          <div class="app-desc"><strong>你好 (nǐ hǎo)</strong> — Hello<br><strong>谢谢 (xiè xiè)</strong> — Thank you<br><strong>对不起 (duì bu qǐ)</strong> — Sorry / Excuse me<br><strong>不客气 (bú kè qì)</strong> — You're welcome</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box" style="font-size:18px;background:var(--gold-soft)">🛒</div><div>
          <div class="app-name">Shopping & Paying</div>
          <div class="app-desc"><strong>多少钱？(duō shǎo qián)</strong> — How much?<br><strong>太贵了 (tài guì le)</strong> — Too expensive<br><strong>可以便宜一点吗？(kě yǐ pián yí yī diǎn ma)</strong> — Can you give a discount?<br><strong>我要这个 (wǒ yào zhè gè)</strong> — I want this one</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box" style="font-size:18px;background:var(--surface2)">🗺️</div><div>
          <div class="app-name">Getting Around</div>
          <div class="app-desc"><strong>在哪里？(zài nǎ lǐ)</strong> — Where is...?<br><strong>去...怎么走？(qù... zěn me zǒu)</strong> — How do I get to...?<br><strong>我不懂 (wǒ bù dǒng)</strong> — I don't understand<br><strong>请慢点说 (qǐng màn diǎn shuō)</strong> — Please speak slowly</div>
        </div></div>
        <div class="app-item"><div class="app-icon-box" style="font-size:18px;background:var(--red-soft)">🆘</div><div>
          <div class="app-name">Emergencies</div>
          <div class="app-desc"><strong>我是外国人 (wǒ shì wài guó rén)</strong> — I am a foreigner<br><strong>我需要帮助 (wǒ xū yào bāng zhù)</strong> — I need help<br><strong>叫救护车 (jiào jiù hù chē)</strong> — Call an ambulance<br><strong>我的护照丢了 (wǒ de hù zhào diū le)</strong> — I lost my passport</div>
        </div></div>
      </div>
      <div class="modal-note" style="margin-top:14px">📱 <strong>Power move:</strong> Download the Chinese language pack in Google Translate before you fly. The camera translation feature reads menus, signs, and anything else instantly — even offline.</div>
    </div></div>
  </div>

  <!-- IF SOMETHING GOES WRONG MODAL (new — Step 17) -->
  <div class="modal-overlay" id="wrong-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🆘 If Something Goes Wrong · 紧急情况</div>
      <div class="modal-subtitle">Stay calm — here's exactly what to do</div></div>
      <button class="modal-close" onclick="closeModal('wrong-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">🪪 Lost Passport</div><ul class="info-list">
          <li>Call <strong>12308</strong> (Foreign Affairs hotline) immediately</li>
          <li>Go to the nearest Police Station to get a loss report (失物报案证明) — you'll need this</li>
          <li>Contact your country's embassy or consulate for emergency travel document</li>
          <li>Keep a photo of your passport in your phone cloud — makes this much faster</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🏥 Got Sick or Injured</div><ul class="info-list">
          <li>Call <strong>120</strong> for ambulance, or take a Didi to the nearest hospital</li>
          <li>Look for 国际医院 (International Hospital) — they have English-speaking staff</li>
          <li>Have your travel insurance policy number ready — show it at the hospital</li>
          <li>Beijing, Shanghai, Chengdu all have excellent international hospitals</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">😱 Got Scammed or Robbed</div><ul class="info-list">
          <li>Call <strong>110</strong> (Police) immediately — or SMS <strong>12110</strong> in Mandarin if needed</li>
          <li>Go to the nearest police station to file a report — needed for insurance claims</li>
          <li>Common scams: "tea ceremony" invitations, fake monks, overpriced art galleries</li>
          <li>Rule: if a stranger is overly friendly and leads you somewhere — politely decline</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🚂 Missed Train or Flight</div><ul class="info-list">
          <li>Trains: go to the ticket office immediately — you can usually change to the next available train for a small fee</li>
          <li>Flights: go to the airline desk in the airport — policies vary</li>
          <li>Book travel insurance that covers missed connections</li>
          <li>Trip.com has 24/7 English customer service: open the app → Help Center</li>
        </ul></div>
      </div>
      <div class="modal-note" style="margin-top:14px">💛 <strong>From Kat:</strong> Most trips go completely smoothly. But knowing this list exists makes you feel calmer the whole time — and that calm makes your trip better. You've got this.</div>
    </div></div>
  </div>`;

  document.getElementById('ready-container').innerHTML = sectionHTML;
  document.getElementById('ready-modals-container').innerHTML = modalsHTML;

  // ── RESTORE CHECKLIST STATE FROM LOCALSTORAGE ──────────
  // Each step is saved independently — ticking Step 5 only
  // marks Step 5, never affects other steps.
  STEPS.forEach(s => {
    if (localStorage.getItem('rc_' + s.id) === '1') {
      const el = document.getElementById(s.id);
      if (el) el.classList.add('done');
    }
  });
  updateProgress();
}

loadGetReady();
