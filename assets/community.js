// ============================================================
//  assets/community.js — Community section
//
//  HOW TO ADD A POST:
//  1. Copy one POST object from the POSTS array below
//  2. Paste it at the TOP of the array (newest posts first)
//  3. Fill in: date, tag, title, body
//  4. Save → git add . → git commit -m "new post" → git push
//  Done in 2 minutes. Live in 30 seconds.
//
//  TAG OPTIONS:
//  'tip'  → gold  — Kat's personal tips
//  'visa' → red   — visa & entry news
//  'news' → grey  — general China news
// ============================================================

const POSTS = [
  // ── ADD NEW POSTS AT THE TOP ──────────────────────────────
  {
    date: 'June 2025',
    tag: 'tip',
    title: '☀️ Summer in China — what to pack for June–August',
    body: `It gets HOT. Beijing and Shanghai regularly hit 35°C+ in summer. My honest packing list: light cotton clothes, a small portable fan (everyone here uses them — seriously), sunscreen, and a reusable water bottle. Try to avoid being outside between 11am and 3pm. The good news? Everything indoors is air-conditioned — sometimes aggressively so. Bring a light layer for museums and the metro.`
  },
  {
    date: 'May 2025',
    tag: 'tip',
    title: '💳 Alipay just got a lot easier for foreigners',
    body: `Big update — Alipay now lets you link a foreign Visa or Mastercard directly, without needing a Chinese bank account as an intermediate step. Download the International version, go to Settings → Bank Cards, and you're done in about 5 minutes. Do this before you land — it makes everything so much easier from day one.`
  },
  {
    date: 'April 2025',
    tag: 'visa',
    title: '🇦🇺 Australian travelers still need a visa — but transit is available',
    body: `Just a reminder for my Australian friends: you still need to apply for a tourist (L) visa before entering China. Processing takes 4–7 business days, so don't leave it until the last minute. That said, if you're transiting through Shanghai, Beijing, or Guangzhou with an onward ticket to a third country, you can enter visa-free for up to 144 hours. Check the Get Ready section above for more details.`
  }
  // ── END OF POSTS ──────────────────────────────────────────
];

const TAG_STYLES = {
  tip:  { label: "KAT'S TIP",    bg: 'var(--gold-soft)',  color: 'var(--gold)',   border: 'var(--gold-border)' },
  visa: { label: 'VISA UPDATE',  bg: 'var(--red-soft)',   color: 'var(--accent)', border: 'var(--red-border)'  },
  news: { label: 'CHINA NEWS',   bg: 'var(--surface2)',   color: 'var(--text-muted)', border: 'var(--border)' }
};

function buildPost(post) {
  const t = TAG_STYLES[post.tag] || TAG_STYLES.news;
  return `
    <div class="news-card">
      <div class="news-meta">
        <span class="news-date">${post.date}</span>
        <span class="news-tag" style="background:${t.bg};color:${t.color};border:1px solid ${t.border}">${t.label}</span>
      </div>
      <div class="news-headline">${post.title}</div>
      <div class="news-body">${post.body}</div>
    </div>`;
}

function loadCommunity() {
  const postsHTML = POSTS.map(buildPost).join('');

  const html = `
  <section class="section" id="community-section">
    <div class="section-eyebrow">Community · 旅行者社区</div>
    <h2 class="section-title">Latest from Kat</h2>
    <p class="section-sub">Real updates on visa changes, seasonal tips, and things I wish someone had told me before my friends visited. I post here whenever something important comes up.</p>

    ${postsHTML}

    <div class="community-coming">
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
}

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

loadCommunity();
