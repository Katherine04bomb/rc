// ============================================================
//  assets/getready.js
//  10-step checklist with merged transport & QR payments.
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
    desc:"Requirements vary by nationality — some countries are visa-free for 15–30 days, others need to apply in advance. Click below to find out exactly what you need.",
    modal:{id:'visa-modal', label:'Check my visa →'},
  },
  {
    id:'step-flights', num:'Step 3',
    title:'✈️ Book Flights & Hotel',
    desc:"Not all hotels in China accept foreign guests — international chains are always a safe bet. If you're flying with a Chinese airline, Tuesdays tend to have lower prices!",
    modal:{id:'flights-modal', label:'Full guide →'},
  },
  {
    id:'step-esim', num:'Step 4',
    title:'📶 Get a SIM or eSIM',
    desc:"You'll need data from the moment you land. Four options: eSIM, Chinese SIM card, pocket WiFi, or international roaming. Sort this before you board.",
    modal:{id:'sim-modal', label:'Compare options →'},
  },
  {
    id:'step-payment', num:'Step 5',
    title:'💳 Set Up Payments',
    desc:"China is almost entirely cashless — street food stalls, taxis, supermarkets, all QR code. Set up Alipay or WeChat before you land. Learn how QR payments work too.",
    modal:{id:'payment-modal', label:'How to set up →'},
  },
  {
    id:'step-network', num:'Step 6',
    title:'🌐 Understand the Firewall & VPN',
    desc:"Google, Instagram, WhatsApp, and ChatGPT are all blocked in China. Download and test a VPN before you fly.",
    modal:{id:'network-modal', label:'VPN guide →'},
  },
  {
    id:'step-apps', num:'Step 7',
    title:'📱 Download Your Apps',
    desc:"There are 6 apps I would highly recommend you to download in advance. Set them up at home — some need verification that's much easier to do before you arrive.",
    modal:{id:'apps-modal', label:'See app guide →'}
  },
  {
    id:'step-transport', num:'Step 8',
    title:'🚗 Get Around Like a Local',
    desc:"From airport to hotel, metro to bullet trains, buses to bike shares — the complete guide to moving around China. Don't get into an unlicensed taxi.",
    modal:{id:'transport-modal', label:'Full transport guide →'},
  },
  {
    id:'step-emergency', num:'Step 9',
    title:'🆘 Emergency Numbers & Help',
    desc:"Screenshot these numbers before you land. Lost passport? Missed train? Got sick? Here's the calm, step-by-step guide for when things don't go to plan.",
    modal:{id:'emergency-modal', label:'View emergency guide →'},
  },
  {
    id:'step-insurance', num:'Step 10',
    title:'🏥 Get Travel Insurance',
    desc:"A single hospital visit in China without insurance can cost $2,000+. This is the step most travelers skip and later regret. Spend 10 minutes on this — it's worth every penny.",
    modal:{id:'insurance-modal', label:'What to look for →'},
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
  'Transport mastered — you\'re moving like a pro 🚇',
  'Emergency numbers saved — you\'re prepared 🆘',
  'Travel insurance sorted — smart move 🏥',
  '100% CHINA READY! You\'ve got this! Ni hao! 🇨🇳🎊'
];

let lastClickedStepIdx = -1;

function toggleStep(id) {
  const el = document.getElementById(id);
  el.classList.toggle('done');
  // Track which step was last clicked (for accurate status message)
  lastClickedStepIdx = steps.indexOf(id);
  // Highlight the most recently clicked step
  document.querySelectorAll('.check-step').forEach(s => s.classList.remove('last-clicked'));
  if (el.classList.contains('done')) el.classList.add('last-clicked');
  updateProgress();
}

function updateProgress() {
  const done = steps.filter(s => document.getElementById(s) && document.getElementById(s).classList.contains('done')).length;
  const pct  = Math.round((done / steps.length) * 100);
  document.getElementById('prog-bar').style.width    = pct + '%';
  document.getElementById('pct-label').textContent   = pct + '%';

  // Status message based on the LAST CLICKED step (not done count)
  if (done === steps.length) {
    document.getElementById('prog-status').textContent = statusMsgs[statusMsgs.length - 1];
  } else if (lastClickedStepIdx >= 0) {
    // +1 because statusMsgs[0] = "just getting started", [1] = step index 0's message
    document.getElementById('prog-status').textContent = statusMsgs[lastClickedStepIdx + 1] || statusMsgs[0];
  } else {
    document.getElementById('prog-status').textContent = 'Start ticking steps below — let\'s get you ready 👇';
  }

  // Show Start Over button when at least 1 step is done
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) resetBtn.style.display = done > 0 ? '' : 'none';

  // 🎆 Celebration — fires EVERY time all steps are complete (no localStorage lock)
  if (done === steps.length) {
    triggerFireworks();
    setTimeout(() => openModal('celebrate-modal'), 1200);
  }
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
      </div>
      ${s.modal ? `<div class="step-action">
        <button class="step-btn" onclick="openModal('${s.modal.id}')">${s.modal.label}</button>
      </div>` : ''}
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
        <div style="display:flex;align-items:center;gap:12px">
          <button id="reset-btn" class="progress-reset-btn" onclick="resetChecklist()" style="display:none">↻ Start Over</button>
          <div class="progress-pct" id="pct-label">0%</div>
        </div>
      </div>
      <div class="progress-bar-bg"><div class="progress-bar-fill" id="prog-bar"></div></div>
      <div class="progress-status" id="prog-status">Start ticking steps below — let's get you ready 👇</div>
    </div>

    <div class="checklist-steps">${STEPS.map(buildStep).join('')}</div>

  </section>`;

  // ── ALL MODALS ───────────────────────────────────────────────
  const modalsHTML = `

  <!-- VISA MODAL — unchanged -->
  <div class="modal-overlay" id="visa-modal">
    <div class="modal-box">
      <div class="modal-header">
        <div><div class="modal-title">📋 Visa Guide · 签证<a href="visa" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
          <div class="country-btn" onclick="showVisa(this,'ru')">🇷🇺 Russia</div>
          <div class="country-btn" onclick="showVisa(this,'my')">🇲🇾 Malaysia</div>
          <div class="country-btn" onclick="showVisa(this,'vn')">🇻🇳 Vietnam</div>
          <div class="country-btn" onclick="showVisa(this,'th')">🇹🇭 Thailand</div>
          <div class="country-btn" onclick="showVisa(this,'mn')">🇲🇳 Mongolia</div>
          <div class="country-btn" onclick="showVisa(this,'nz')">🇳🇿 New Zealand</div>
          <div class="country-btn" onclick="showVisa(this,'it')">🇮🇹 Italy</div>
          <div class="country-btn" onclick="showVisa(this,'es')">🇪🇸 Spain</div>
          <div class="country-btn" onclick="showVisa(this,'nl')">🇳🇱 Netherlands</div>
          <div class="country-btn" onclick="showVisa(this,'se')">🇸🇪 Sweden</div>
          <div class="country-btn" onclick="showVisa(this,'ch')">🇨🇭 Switzerland</div>
          <div class="country-btn" onclick="showVisa(this,'br')">🇧🇷 Brazil</div>
          <div class="country-btn" onclick="showVisa(this,'in')">🇮🇳 India</div>
          <div class="country-btn" onclick="showVisa(this,'za')">🇿🇦 South Africa</div>
          <div class="country-btn" onclick="showVisa(this,'pk')">🇵🇰 Pakistan</div>
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

  <!-- FLIGHTS & HOTEL MODAL — Step 3 -->
  <div class="modal-overlay" id="flights-modal">
    <div class="modal-box"><div class="modal-header">
      <div>
        <div class="modal-title">✈️ Book Flights & Hotel · 订票订酒店<a href="flights-hotels" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
        <div class="modal-subtitle">Best platforms for foreigners — foreign cards accepted</div>
      </div>
      <button class="modal-close" onclick="closeModal('flights-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px"><strong>Key rule:</strong> Not all hotels in China accept foreign guests. Always book with international chains (IHG, Marriott, Hilton) or use Booking.com/Trip.com and filter for foreign-guest friendly properties.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">✈️ Booking Flights</div><ul class="info-list">
          <li><strong>Trip.com</strong> — best for China routes, foreign cards, includes domestic flights</li>
          <li><strong>Google Flights</strong> — best for comparing prices and flexible dates</li>
          <li>Direct with Air China, China Eastern, China Southern — often cheapest</li>
          <li>Tip: Tuesdays & Wednesdays tend to have lower fares on China routes</li>
          <li>Avoid Golden Week (Oct 1–7) and Chinese New Year — prices triple</li>
        </ul></div>
        <div class="info-card"><div class="info-card-title">🏨 Booking Hotels</div><ul class="info-list">
          <li><strong>Booking.com</strong> — most reliable for foreign travelers, free cancellation</li>
          <li><strong>Trip.com</strong> — great for local boutique hotels, 10–20% cheaper</li>
          <li>International chains always safe: IHG, Marriott, Hilton, Accor</li>
          <li>Always save your hotel address in Chinese on your phone</li>
          <li>Book refundable rooms until your visa is confirmed</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- SIM MODAL — unchanged -->
  <div class="modal-overlay" id="sim-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">📶 SIM Card & eSIM · 手机卡<a href="esim" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
          <a href="alipay" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 How to set up Alipay →</a>
        </div></div>
        <div class="app-item"><div class="app-icon-box">💬</div><div>
          <div class="app-name">WeChat Pay 微信支付 — Great backup</div>
          <div class="app-desc">Built into WeChat and also accepts foreign cards. You probably need WeChat for everything - mini programs, messaging and menu check, set up your account in advance.</div>
          <div class="app-tip">✅ WeChat has thousands of mini-programs — great for booking and ordering.</div>
          <a href="wechat" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 How to set up WeChat →</a>
        </div></div>
        <div class="app-item"><div class="app-icon-box">💵</div><div>
          <div class="app-name">Cash — Bring some, just in case</div>
          <div class="app-desc">Bring ¥100–500 RMB as backup if theres any internet issue. <strong>Refusing to accept RMB(Chinese Yuan) cash is illegal in China</strong>. Exchange at Bank of China for the best rates.</div>
          <div class="app-tip">⚠️ Let your bank know you're travelling so they don't block your card at ATMs.(ATMs with UnionPay/Visa logos work for foreign cards).</div>
          <a href="currency" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">💱 Currency Converter →</a>
        </div></div>
        <div class="app-item"><div class="app-icon-box">📲</div><div>
          <div class="app-name">QR Code Payments — How it actually works</div>
          <div class="app-desc"><strong>Why QR codes?</strong> China runs on QR payments — from luxury malls to street food carts. Cash and credit cards are rarely accepted. Two ways to pay: (1) <strong>You scan the vendor's QR</strong> — open Alipay/WeChat, tap Scan, point at their code, enter amount, confirm. (2) <strong>Vendor scans your QR</strong> — open Alipay → Receive, show your barcode, they scan it. <strong>The #1 mistake:</strong> using your phone's camera app instead of the Alipay/WeChat scan feature inside the app.</div>
          <div class="app-tip">✅ Restaurant tables: scan the table QR with WeChat to see the menu + order + pay — all without talking to anyone.</div>
          <a href="qr-payments" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:800;margin-top:8px">📲 How to use QR Code to pay →</a>
        </div></div>
      </div>
    </div></div>
  </div>

  <!-- NETWORK MODAL — unchanged -->
  <div class="modal-overlay" id="network-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🌐 The Firewall & VPN · 网络<a href="vpn" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
              <a href="wechat" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to register →</a>
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
              <a href="alipay" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to register →</a>
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
              <a href="didi" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to register →</a>
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
              <a href="amap-guide" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to use Amap →</a>
            </div>
          </div>
        </div>
        <div class="app-item">
          <div class="app-icon-box" style="background:#faf6ef;border-color:#CC0000">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAeFBMVEX/////ZjP/7en/VQv/Yy7/Wx3/YSr/XiP/ZTD/7+r/8+///fz/+fb/UgD/Xyb/TwD/azn/WBb/ckb/0sf/bT7/e1T/4Nj/zsL/6eP/tKH/o4r/wbL/dkz/lHf/uqn/i2n/gFr/rZj/qJH/hWL/noP/2dD/yLr/j3A1hrkOAAAG0UlEQVR4nO2b25KCOBCGB8hJQCSoKHISBX3/N1xFdyaJSSAQq7Zq+S8twc/Q6VOan59FixYtWrRo0aJFixYt+h8oCP2Vsfww+A6N2+WnOkYQUs9YFEIUX09551pFOpQFphgBQpxJIgQgTGFR3mwR+VXsRRNpBDbkgWxlg+m2x8AG0UsAFtVsJLdeW0Tqsdbn4zymYxLZRXoqirs5TFuA7DM9Fis6zFin7zA9qSavlZt8ielBFacToepBewIRfiiawB7tpzHd1kM3pkXZVFV2umJo7Me8bAqTv9f7AhSVnf8KauExc7AhFEmmOIYKam9Kz5xV+BfP0J/BywQoR/cjBDeh8P3Dzsy0CBbvMKyDp7sjzj+vWMVmVNQ83pS6X4BSK01jI3NHd9M0yy00Ty86yy/Khf1KAPTU/43EpqbeacycIJXn2zMIAMN4f9me1VR0awiVU81CtaqrDm/HQCLq7U55+ng+rdpXwMYQ6qTxO1QZuMK3byvK6vg2mFy95FFtCHXV2EKkNtD+v+DW//tkq4YCO0OoWG3n6Kq+rHckUcl8kqoDKMGGUEi9u/FJfVm6FqlTzS6GZu4z0ERYXXx4QbEZQKpmcqivvJFMocYjwMGVOrOfaByqZ1bZ+DqPoNk0L5u6s1CayGAItdJEPt2myaC4lJ3Gt1iEcjxleAh7T0LZOljjpxzPrI53dVBY6YlfVg1Z6ObLUI/w6jzNluxUNyufzwpd2Z2u8cJzoQiKIIwv221PpXIK6aZfSC6vAbrdNwOKYBpfL3lvlWXvoD1pfPf7dIcg1vukWuOcDkV27cH994m8FkNetr1KMsq5sUxXUMyA4rOntjdc9Fni+vfet4GEXajwrMv0Z0Dxm21V9JYLSMXnCmnyWhPItQlSbUk0Awo4nI87vmspWuS/n4fdnb4+FWrM8ltQDuV/aAtev4/wrq66NO3yNkHvBEXYl66+dpwDBRI+xdjCNwJBdO15aw+/tz3xhFh90dfNs/wUFiqqdC/NbKJIqAaPjr7mmgVFIiHaBRf4kVCidS36iXqgwTDPo+O7+IX07kAmgBAc7T/a0bpYbAHKwZ8ldtoUmw2FOMJ0s0Ht4aOaOGq7ERagiKxwDPy0atr2lG1dSbIdDvcB52YJYGdaY5fDHavZqQuKze7QahJqa1BOtDdZq3bIyO1APTz4+I5uCzEc7uzZyDyRM/YQKnDT28nZDHFZydHJujWpP/zsir4WkBnBxKinFHanta7EslTNAK8wOyvwL0jZ4rBXYqHobobV1Z4iLtus+9AmzjqT3kS+kz9Dm1DPChDsy2Y8l7uXulK7UM/lgrlJxzmjkkdoGwqZniNmkrzQMhQyjs8/B/rhSi3b1JQzxPzD2q1CEXnTOkwPedY0Vb5NpeZWiTe1CiU76gkPbRH3B6UYo3h/6j7zvkBs9NuEkpwUHFu4jv4aLATgjZN9/GRw5aksQqFC/HbYOvhjbwEcV+JquYgzdptQokEdEnkuQOjHrAZv7PagxI5ZeMHKCiFyhPI04A61rEERj99ZQa0zP7IWiuuOjTfWoIRD0VDfV/nYFcGdSWRsQZGEzz2Hi5YN/wTZvrotKGGhshFFC+ajJNMutgW14RYqlcV+UQhwVnj7u7UlKOGsb3ga5il+v/rJr6+yBMUHmMO4iS/hWL39vcoSFGCzg3A/cjoCcifhN8tQoOAa90NjQ79LBVmrcn//ih0oxJ4O/9xHz+tBzi387j9DKMXRGucQwmT0FAkq/5Yq/JufsAO1ZmPxdvy8DXn1kQK3a5KNN/Xx+XKoDXuXymCOy3v8mzSrEwy5gGx4hiz31JRNkAaa5JzQtYZrKM4VGK6UfASAn90oTeZSpQ0FwxGAH+kEMyEst+7Mc5wMhyXkYyXAYaE0Q0jjZDxWIv1FQpjHF9RzoYwHcKRjT/xsn5FNyWQ8qiQ/wvBYy2xMRztFGQ91ddKMcsOG+9tcKGo6a+1KY4jH3kY37zNGxLwhIR2p5BY81A04jhC4Gk+f3mTPD3FHbJoZwDGSD4tqFSDJOpCEDQz6odkhEVN//pS0UPkbR0jzdmAMe0BYOZipkXQmts/RQ3fbJgjPe3OFmPcC+6WSPJ3ovro1NaHzX6WhUya/HzpLXDYAONJMNo4WMg0x/+qoGfacKQImvw7S2XzhiWOCM16cuX2HisBZ72N1htP4o4TAjHV6Ki1UR1BTReBu1qtYvbLE/KUYDRLeTfQFvI4nSG14gf71AtrOfI/uV2FVxxRGukHEYR4EqXPNJsQ7NdZx29Q7DM3fYn0J4t21OaTmb8qMYfPdlWuulf8VmkWLFi1atGjRokWLFi36j+kfy71oRgMkReoAAAAASUVORK5CYII=" alt="点评" style="width:28px;height:28px;object-fit:contain" onerror="this.parentElement.inner HTML='🍽️'">
          </div>
          <div style="flex:1">
            <div class="app-name">大众点评 Dianping — Where to eat</div>
            <div class="app-desc">China's Yelp + TripAdvisor. Every restaurant and café rated and reviewed. Filter by "English menu" or "foreigner-friendly".</div>
            <div class="app-tip">✅ This is how locals decide where to eat. The ratings are very trustworthy.</div>
            <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
              <a href="https://apps.apple.com/app/id351091731" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#000;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">🍎 App Store</a>
              <a href="https://play.google.com/store/apps/details?id=com.dianping.v1" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:5px;background:#01875f;color:#fff;padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none">▶ Google Play</a>
              <a href="dianping-guide" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:6px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500">📖 How to use Dianping →</a>
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

  <!-- EMERGENCY MODAL — unchanged -->
  <div class="modal-overlay" id="emergency-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🆘 Emergency Numbers · 紧急电话<a href="emergency" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
      <div><div class="modal-title">🏥 Travel Insurance · 旅行保险<a href="travel-insurance" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
      <div><div class="modal-title">🛃 Immigration & Arrival · 入关<a href="immigration" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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

  <!-- TRANSPORT MODAL (Step 9 — After You Arrive) -->
  <div class="modal-overlay" id="transport-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🚇 Getting Around China · 出行指南<a href="get-around-like-local" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
      <div class="modal-subtitle">Airport transfers, metro, buses, bikes — the complete guide to moving around China</div></div>
      <button class="modal-close" onclick="closeModal('transport-modal')">×</button>
    </div>
    <div class="modal-body">
      <div class="modal-note" style="margin-bottom:16px">⚠️ <strong>First rule at the airport:</strong> Ignore anyone in arrivals who offers a "taxi" or "ride." These are unlicensed drivers who charge 3–5x the normal rate. Use Didi or the airport metro.</div>
      <div class="info-grid">
        <div class="info-card"><div class="info-card-title">🚄 High-Speed Rail (高铁)</div><ul class="info-list">
          <li>The backbone of China travel — fast, cheap, punctual</li>
          <li>Beijing → Shanghai: 4.5 hours (~¥550 / $75 USD for second-class seats)</li>
          <li>Book with your passport on Trip.com or the 12306 app</li>
          <li>G trains fastest, D trains slightly slower, C trains are city rail</li>
          <li>🥚 Easter egg: you can order food delivery to your seat by scanning the QR code!</li>
        </ul>
        <a href="high-speed-train" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 Full train guide →</a>
        </div>
        <div class="info-card"><div class="info-card-title">🚇 Metro — Day-to-day city travel</div><ul class="info-list">
          <li>Buy a single journey ticket at the machine — select English, enter destination, pay</li>
          <li>Or scan your Alipay / WeChat QR code directly at the gate (faster)</li>
          <li>Fares: ¥3–15 per journey — extremely affordable</li>
          <li>Rush hours: 7:30–9am and 5:30–7pm — expect crowding</li>
          <li>Need help? Go to 客服中心 (Customer Service) — staff are always there</li>
        </ul>
        <a href="metro-guide" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 Full metro guide →</a>
        </div>
        <div class="info-card"><div class="info-card-title">🚗 Didi Tips — China's Uber</div><ul class="info-list">
          <li>Set pickup precisely — pin your exact location on the map</li>
          <li>Copy-paste to driver: "我是外国人，不会讲中文" (I'm a foreigner, can't speak Mandarin)</li>
          <li>Check the driver's rating before accepting — 4.8+ is good</li>
          <li>Most city rides: ¥20–40 (~$3–6 USD)</li>
          <li>Much cheaper and safer than street taxis</li>
        </ul>
        <a href="didi" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 Full Didi guide →</a>
        </div>
        <div class="info-card"><div class="info-card-title">🚌 Public Bus — Budget travel</div><ul class="info-list">
          <li>Found in every city — covers areas metro doesn't reach</li>
          <li>Fares: ¥1–2 per ride — the cheapest way to get around</li>
          <li>Pay with Alipay/WeChat transport QR code, or get a bus card at any metro station</li>
          <li>Bus stops show routes in Chinese and pinyin — use Amap to find your route</li>
          <li>Buses announce stops in Chinese and English in most big cities</li>
        </ul>
        <a href="bus-guide" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 Bus guide →</a>
        </div>
        <div class="info-card"><div class="info-card-title">🚲 Shared Bikes — City hopping on two wheels</div><ul class="info-list">
          <li>Meituan Bike (美团单车) and Hellobike (哈啰单车) — the two biggest operators</li>
          <li>Scan the QR on the bike with Alipay or WeChat to unlock — no separate app needed</li>
          <li>Cost: ¥1–3 per 30 minutes. Great for short trips under 3km</li>
          <li>Park in designated zones (look for painted rectangles on the pavement) or face a fine</li>
          <li>Best for exploring hutongs, parks, and areas where metro doesn't reach</li>
        </ul>
        <a href="bike-guide" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:5px 12px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-top:8px">📖 Bike sharing guide →</a>
        </div>
        <div class="info-card"><div class="info-card-title">✈️ Domestic Flights</div><ul class="info-list">
          <li>Worth it for very long distances (e.g. Beijing → Yunnan)</li>
          <li>Book on Trip.com for English + foreign card support</li>
          <li>Arrive at least 1 hour early — security is thorough</li>
          <li>Budget options: Xiamen Air, Shenzhen Airlines</li>
        </ul></div>
      </div>
    </div></div>
  </div>

  <!-- CUSTOMS / IMMIGRATION MODAL — Step 11 (Bonus / Quick Access) -->
  <div class="modal-overlay" id="customs-modal">
    <div class="modal-box"><div class="modal-header">
      <div><div class="modal-title">🛃 Immigration & Arrival · 入关<a href="immigration" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:var(--gold-soft);color:var(--gold);padding:4px 10px;border-radius:6px;font-size:11px;text-decoration:none;border:1px solid var(--gold-border);font-weight:500;margin-left:10px">Read more →</a></div>
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
  </div>`;

  document.getElementById('ready-container').innerHTML = sectionHTML;
  document.getElementById('ready-modals-container').innerHTML = modalsHTML + `

  <!-- CELEBRATION MODAL — fires when all 17 steps complete -->
  <div class="modal-overlay" id="celebrate-modal" style="z-index:400">
    <div class="modal-box" style="max-width:500px;text-align:center;overflow:hidden">
      <div style="background:linear-gradient(135deg,var(--accent),#8b1a1a);padding:36px 32px 28px;position:relative">
        <div style="font-size:52px;margin-bottom:12px;animation:bounce 1s ease infinite alternate">🎆</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:26px;color:white;margin-bottom:8px">You're 100% China Ready!</h2>
        <p style="font-size:13px;color:rgba(255,255,255,.8);line-height:1.7">Every step complete. You've done more pre-trip preparation than 95% of first-time visitors to China. I'm genuinely proud of you.</p>
        <button class="modal-close" onclick="closeModal('celebrate-modal')" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.3);color:white">×</button>
      </div>
      <div style="padding:28px 32px">
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:20px;line-height:1.7">
          Get your free <strong>China Ready Checklist PDF</strong> — a printable version of everything you've just completed, perfect for offline reference during your trip.
        </p>
        <form id="celebrate-form" style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:14px"
          action="https://formspree.io/f/mnjypvzn" method="POST"
          onsubmit="handleCelebForm(event)">
          <input type="hidden" name="guide" value="china-ready-checklist">
          <input type="email" name="email" placeholder="your@email.com" required
            style="flex:1;min-width:200px;padding:10px 14px;border:1px solid var(--border);border-radius:8px;font-size:13px;font-family:'DM Sans',sans-serif;outline:none;background:var(--surface);color:var(--text)">
          <button type="submit" style="background:var(--accent);color:white;border:none;padding:10px 20px;border-radius:8px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;white-space:nowrap">Send me the PDF 🇨🇳</button>
        </form>
        <div id="celebrate-ok" style="display:none;font-size:13px;color:var(--gold);margin-bottom:12px">✅ On its way! Check your inbox.</div>
        <p style="font-size:11px;color:var(--text-muted)">No spam. Kat reads every email personally.</p>
      </div>
    </div>
  </div>
  <style>
    @keyframes bounce { from { transform:translateY(0); } to { transform:translateY(-8px); } }
  </style>`;

  // No localStorage — fresh start every page load
  updateProgress();
}

loadGetReady();

function handleCelebForm(e) {
  e.preventDefault();
  const form = document.getElementById('celebrate-form');
  fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} })
    .then(r => { if(r.ok) { form.style.display='none'; document.getElementById('celebrate-ok').style.display='block'; }})
    .catch(() => { document.getElementById('celebrate-ok').style.display='block'; });
}

// ── RESET CHECKLIST ──────────────────────────────────────────
function resetChecklist() {
  steps.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('done', 'last-clicked');
  });
  lastClickedStepIdx = -1;
  updateProgress();
}

// ── CANVAS FIREWORKS (5-second show) ─────────────────────────
function triggerFireworks() {
  const old = document.getElementById('fireworks-canvas');
  if (old) old.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'fireworks-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = ['#c0392b', '#e74c3c', '#f1c40f', '#e67e22', '#9b59b6', '#2ecc71', '#3498db', '#ff6b6b'];
  const particles = [];
  const rockets = [];

  function createExplosion(x, y, color) {
    const count = 55 + Math.floor(Math.random() * 25);
    const c = color || colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x: x, y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.0,
        decay: 0.006 + Math.random() * 0.01,
        color: c,
        size: 2 + Math.random() * 2.5
      });
    }
  }

  function launchRocket() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    rockets.push({
      x: canvas.width * (0.15 + Math.random() * 0.7),
      y: canvas.height,
      vy: -(7 + Math.random() * 4),
      targetY: canvas.height * (0.15 + Math.random() * 0.35),
      color: color,
      trail: []
    });
  }

  let animationId;
  function animate() {
    // clear canvas (transparent background, show page underneath)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update rockets
    for (let i = rockets.length - 1; i >= 0; i--) {
      const r = rockets[i];
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 10) r.trail.shift();
      r.y += r.vy;
      r.vy += 0.06;

      // Draw rocket trail
      r.trail.forEach(function(t, idx) {
        var alpha = idx / r.trail.length;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.globalAlpha = alpha * 0.7;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Explode when reaching peak
      if (r.y <= r.targetY || r.vy >= 0) {
        createExplosion(r.x, r.y, r.color);
        rockets.splice(i, 1);
      }
    }

    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;   // gravity
      p.vx *= 0.99;   // air resistance
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      // Particle core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fill();

      // Glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.12;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Launch rockets spread across ~3 seconds (show ends ~4s with particle fade)
  var launchTimes = [0, 350, 700, 1100, 1500, 1900, 2400, 2950];
  launchTimes.forEach(function(t) {
    setTimeout(function() {
      launchRocket();
      // Sometimes launch a double
      if (Math.random() > 0.5) setTimeout(launchRocket, 150);
    }, t);
  });

  // Instant explosions at start for immediate impact
  setTimeout(function() { createExplosion(canvas.width * 0.3, canvas.height * 0.3); }, 100);
  setTimeout(function() { createExplosion(canvas.width * 0.7, canvas.height * 0.25); }, 300);

  // Clean up after 4 seconds
  setTimeout(function() {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
    canvas.remove();
  }, 4000);
}
