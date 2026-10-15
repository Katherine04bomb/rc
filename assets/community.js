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
    id: 'post-024',
    slug: 'shared-power-bank-rental-china',
    category: 'lifehacks',
    date: '15 Oct 2026',
    tag: 'tip',
    title: '🪫 Forgot Your Power Bank? How to Rent One in China in 60 Seconds',
    body: `Forgot yours, or drained it before the flight even landed? Don't buy one — rent one. Shared power bank cabinets are everywhere in China: shopping malls, restaurants, metro stations, convenience stores. The main operator is Meituan, and renting takes about a minute.
    HOW TO RENT
    
    Open the Meituan app and tap "Power Bank", or in WeChat search for the 美团充电宝 mini program.
    
    Tap "Nearby stores" to see a map of cabinets with free slots.
    
    Tap "Scan to charge" and point your camera at the QR code on the cabinet — or just use Meituan's own scanner on the code.
    
    Agree to the terms, allow location access, and pick either deposit-free rental or pay with WeChat Pay / Alipay.
    
    The slot pops open. Take the bank and plug in your own cable.
    You can skip the app entirely too: walk up to any cabinet, open Meituan or WeChat, scan the QR code on it, confirm the free-rental coupon if one shows up, and the bank comes out by itself.
    
    HOW TO RETURN IT
    You do NOT have to go back to the same cabinet. Open the map in the mini program, find any cabinet of the same brand with a free slot, and push the bank in the direction shown on screen. Payment settles automatically.

WHAT IT COSTS

First 5 minutes: free
Then roughly 1.5 RMB per 30 minutes
Deposit: usually 99 RMB — but with a WeChat Pay score of about 550 or higher you can rent deposit-free
Daily cap: usually around 40 RMB, so you will never get an unlimited bill

Prices run slightly higher in first-tier cities.

ALSO WORTH KNOWING

Coffee shops, shopping malls and high-speed rail stations often have USB ports built right into the seating. And hotel front desks usually keep spare adapters and chargers that guests can borrow — just ask.`
  },
 {
    id: 'post-023',
    slug: 'power-bank-china-flight-rules',
    category: 'lifehacks',
    date: '15 Oct 2026',
    tag: 'tip',
    title: '🔋 Can I Take My Power Bank on a Chinese Flight? Check Watt-Hours, Not mAh',
    body: `You have probably heard this: "if it has the CCC mark and it is under 20,000 mAh, it is fine." That is not always true — and getting it wrong means watching your power bank go into a confiscation bin at security.

Chinese aviation security does not check milliamp-hours. It checks watt-hours (Wh).

THE THREE BANDS

Below 100 Wh   — ✅ Allowed. Straight through, no approval needed.
100 to 160 Wh  — ⚠️ Needs airline approval. Ask at the check-in counter BEFORE security. Without the permit you can be sent back.
Above 160 Wh   — ❌ Banned entirely. Confiscated or refused.

WHY 20,000 mAh CAN STILL BE TOO BIG

mAh alone does not tell you the energy — you need the voltage too.

Wh = (mAh ÷ 1000) × Voltage

At 3.7V (the usual cell voltage), 20,000 mAh = 74 Wh, safely in the green zone.

But plenty of newer fast-charge and laptop-rated banks run at 5.1V. The same 20,000 mAh at 5.1V = 102 Wh — that crosses into the yellow zone and needs a permit.

So the "under 20,000 mAh" rule of thumb quietly fails on exactly the power banks people are most likely to own.

HOW TO CHECK YOURS

Look at the label on the back. Most decent units print the Wh value directly — use that number first, do not calculate. If Wh is not printed, use the formula with the voltage shown on the label.

One more thing people miss: the label has to be legible. Even a power bank well under the limit can be refused if the printing is faded, blurry or missing. Check yours before you leave home.

BEFORE YOU FLY

Carry power banks in hand luggage only — they are banned from checked bags.

If yours is large or fast-charge, ask at check-in: "Does this one need a permit?" Sorting it out at the counter takes a minute; being turned back at the security line can cost you the flight.

On board, keep it switched off, do not bury it under thick bedding, and do not use it while it is charging.

WHAT ABOUT THE CCC MARK?

CCC (China Compulsory Certification) means the product meets Chinese safety standards for sale in China. It does NOT override the Wh limit. A certified 180 Wh bank is still banned; an uncertified 50 Wh one may still get questioned.

Two things decide whether you board: the Wh number, and a readable label.`
  },
 {
    id: 'post-022',
    slug: 'china-plug-adapter-voltage-guide',
    category: 'lifehacks',
    date: '15 Oct 2026',
    tag: 'tip',
    title: '🔌 Do I Need a Plug Adapter for China? Voltage, Sockets and What to Buy',
    body: `China runs on 220V / 50Hz — not the 110V you get in the US or Japan. Before you pack, flip over your phone charger and read the tiny print: if it says "100-240V" you are fine with just a cheap plug adapter. If it says a single voltage like "110V", you need a converter, or the device may fry.

Most phone and laptop chargers are dual-voltage these days, so for most travellers the answer is simple: bring a universal adapter, skip the converter.

THE THREE PLUG SHAPES YOU WILL MEET

Type A — two flat pins — phone chargers and small devices
Type C — two round pins (same as Europe) — laptop and camera chargers
Type I — three flat pins (same as Australia) — air conditioners and high-power appliances

Good news: Chinese wall sockets are usually combo units that swallow both two-pin and three-pin plugs in one faceplate, so you rarely get caught out.

WHAT TO BUY

Get a universal adapter that switches between US, EU, UK and Australian pin types, and accepts both 2-pin and 3-pin plugs so it fits China's new national-standard sockets.

Choose one that sits firmly. Cheap loose adapters wobble out of the socket mid-charge and are genuinely annoying. Budget 15 to 50 RMB if you buy inside China.

Bringing several devices? Pack one adapter plus a small Chinese power strip, then charge everything off a single wall socket.

FORGOT ONE?

No need to panic-buy at the airport. Large supermarkets stock adapters, and online shops deliver fast — search 万能转换插头 ("universal travel adapter") on JD, Taobao, Pinduoduo or Meituan. On Meituan or Ele.me it can arrive in about 30 minutes.

THE ONE REAL TRAP

Hair dryers and curling irons. Many US and Japanese models are single-voltage AND high-wattage. Either bring a transformer rated for the wattage, or just buy a cheap one in China.

WHERE TO CHARGE WHEN YOU ARE OUT

Coffee shops, shopping malls and high-speed rail stations often have USB ports or shared power banks you rent by scanning a code. Hotel front desks usually keep spare adapters and chargers guests can borrow.

PS — if you grew up in Hong Kong, Singapore or Malaysia, you already use the British BS1363 plug, which electrical engineers rate as one of the safest domestic plugs in the world: a fuse inside every plug, child-proof shutters, and insulated pins. The one known downside is how much it hurts if you step on it barefoot in the dark. Reportedly worse than Lego.`
  },
  {
    id: 'post-021',
    slug: 'how-to-claim-your-vat-back-in-china',
    category: 'qa',
    date: '8 Sep 2026',
    tag: 'tip',
    title: 'China Tax Refund Guide 2026: How to Get Your VAT Back When Shopping in China',
    body: `You've heard about tax-free shopping in Europe. But did you know China has its own departure tax refund system — and it just got a massive upgrade in 2026?
    
    If you're planning to shop in China (and trust me, you will — the electronics, the tea, the silk, the smart gadgets), you can get 8-11% of your purchase price back as a VAT refund when you leave the country. Here's everything you need to know.
    

    Who Qualifies for China's Tax Refund?

    You're eligible if you meet ALL of these conditions:
    1.You're a "overseas traveler" — meaning a foreign citizen or a resident of Hong Kong, Macao, or Taiwan who has stayed in mainland China for no more than 183 consecutive days
    2.You shop at a designated tax refund store — look for the "TaxFree" (离境退税) sign
    3.You spend at least 200 RMB at the same store on the same day (that's about $28 USD — very achievable)
    4.The goods are unused — you haven't opened or consumed them yet
    5.You leave within 90 days of purchase (for standard refund) or 28 days (for instant refund)
    6.You carry the goods out yourself — in your hand luggage or checked baggage
    7.You depart from a designated tax refund port (more on this below)
    


    What DOESN'T qualify for refund?
    - Items on China's prohibited/restricted export list
    - Goods that are already VAT-exempt
    - Items specified by the Ministry of Finance as non-refundable
    - Consumables you've already used (opened snacks, used cosmetics, etc.)
    

    How Much Do You Get Back?
    China's VAT has two main rates, and the refund rate is slightly lower (the difference covers processing fees):
    If you bought electronics, smartphones, or watches, the product has a VAT rate of 13%, you get 11% back. And if you bought books, certain food items, agricultural products, the product has a VAT rate of 9%, you get 8% back.
    

    Refund formula:
    > Refund amount = Invoice amount (incl. VAT) × Refund rate − Processing fee
    Example: You buy a Huawei phone for 3,000 RMB at a tax refund store.
    - Refund = 3,000 × 11% − fee ≈ ~320 RMB back (about $45 USD)

    Minimum spend: 200 RMB at one store on one day
    Cash refund limit: Up to 20,000 RMB in cash; above 20,000 RMB is paid by bank transfer
    Currency: All refunds are in Chinese Yuan (RMB)
    
    Two Ways to Claim: Standard vs Instant
    China offers two refund modes. Here's the difference:

    Mode 1: Standard Departure Refund (离境退税) - You shop at a tax refund store, get your refund paperwork, and claim the refund at the airport/port when you leave China.
    Process:
    1. Shop at a store with the "TaxFree" sign
    2. Ask for the *Departure Tax Refund Application Form (境外旅客购物离境退税申请单) and the sales invoice
    3. Keep your goods unused and in original packaging
    4. At departure: Go to customs at the airport/port, show your goods + form + invoice + passport
    5. Customs stamps your form
    6. Go to the refund agency counter (inside the restricted departure area) with your stamped form
    7. Receive your refund in cash (RMB) or bank transfer
    
    Mode 2: Instant Refund (即买即退) (RECOMMENDED) - You get your refund money right at the store when you buy, not at the airport. This is the game-changer.
    Process:
    1. Shop at a store offering "即买即退" (instant refund) service
    2. Present your passport and a credit card for pre-authorization
    3. Sign the agreement — you promise to leave China within 28 days from a designated port
    4. Receive cash (RMB) on the spot — the refund amount is handed to you immediately
    5. Use the money right away for more shopping (this is the whole point — it stimulates spending)
    6. At departure: Show your goods + form + invoice + passport to customs for verification
    7. Customs confirms → refund agency releases the pre-authorization hold on your credit card
    
    What if you don't leave within 28 days? The refund agency charges the pre-authorized amount back to your credit card. So don't overstay — you'll lose the refund.
    
    
    What's New in 2026? (Major Updates)

    1. Nationwide Cross-Province Mutual Recognition (since September 1, 2026) : This is the biggest change. Previously, if you shopped in Beijing and wanted to leave from Guangzhou, you might have issues. Now, since September 1, 2026:
    > Shop anywhere → Claim instant refund anywhere → Depart from any designated port nationwide
    [Example]: Enter China in Beijing, shop in Shanghai, get instant refund in Shanghai, fly home from Guangzhou Baiyun Airport. All works seamlessly. No more needing to depart from the same city where you shopped.
    This was rolled out province-by-province through 2026:
    - April 2026: Fujian + Guangdong cross-province
    - May 2026: Guangdong + Guangxi + Hainan
    - July 2026: Hunan + Fujian + Guangdong + Guangxi + Hainan
    - September 1, 2026: NATIONWIDE!

    2. Paperless Mobile Processing: Scan a QR code once upon entry to register your identity. You get a personal "Departure Tax Refund Service Code" that works at any tax refund store and port across the country. No paper forms to carry around — everything is digital.
    Benefits:
    - One code works nationwide
    - Check your refund status on your phone anytime
    - Electronic receipts and invoices stored digitally
    - Faster customs processing
    
    3. Random Inspection for Small Amounts (since July 1, 2026)
    If your refund claim is under 10,000 RMB, customs no longer inspects every single item. Instead, they do random sampling — if you're not selected, you skip the inspection entirely. Just show your service code and you're through.
    For claims of 10,000 RMB or above, physical inspection of goods is still mandatory.

    4. Unified 28-Day Validity (since July 1, 2026)
    The instant refund departure window was previously inconsistent across provinces. Now it's unified to **28 days** from the date of purchase. You have 28 days to leave China after getting your instant refund.
    5. 8,000+ Instant Refund Stores Nationwide
    As of April 2026, over 8,000 stores across China offer instant refund service — more than double from a year ago. Major shopping districts in Beijing, Shanghai, Guangzhou, Shenzhen, Chengdu, Hangzhou, Xi'an, and Hainan all have extensive coverage.
    
    H1 2026 stats:
    - Refund claim count: +1,296% YoY (nearly 13x)
    - Refund sales amount: +935% YoY (nearly 10x)
    - Instant refund stores: 8,000+ (doubled in one year)
    
    Where Can You Depart with Tax Refund?

    Tax refund ports include airports, seaports, and land border crossings across China. Major ones include:
    Airports:Beijing (PEK Capital, PKX Daxing), Shanghai (PVG Pudong, SHA Hongqiao), Guangzhou Baiyun (CAN),Shenzhen Bao'an (SZX), Chengdu Tianfu (TFU) / Shuangliu (CTU), Hangzhou Xiaoshan (HGH), Xi'an Xianyang (XIY), Chongqing Jiangbei (CKG), Sanya Phoenix (SYX) / Haikou Meilan (HAK), Kunming Changshui (KMG), Xiamen Gaoqi (XMN), Tianjin Binhai (TSN), Qingdao Liuting (TAO), Dalian Zhoushuizi (DLC) and more
    Land border ports:
    - Shenzhen: Futian, Shenzhen Bay, Luohu, Wenjindu
    - Zhuhai: HZMB Port, Hengqin Port, Jiuzhou Port
    - Shanghai: Wusong Cruise Port, Shanghai Port International Cruise Terminal
    Cruise ports: Shanghai, Tianjin, Xiamen, Qingdao, Guangzhou, Shenzhen, Beihai, Haikou, Sanya` 
  },
  {
    id: 'post-020',
    slug: 'shigatse-border-permit-suspended',
    category: 'news',
    date: '31 August 2026',
    tag: 'news',
    title: '📰 Shigatse border permits suspended after Gyirong Port mudslide (Aug 2026)',
    body: `📰 China News — Shigatse (Xizang / Tibet) border permits suspended after the Gyirong Port mudslide
    
    Heads-up if you were planning to cross into the Tibet region overland from Nepal, or travel to the Shigatse border area: China's National Immigration Administration has suspended electronic border administration area permits for Shigatse City, Xizang (Tibet) Autonomous Region.
    
    What happened
    On 26 August 2026, a large mudslide hit the Nepalese side near Gyirong Port (吉隆口岸) — the main road crossing between Nepal and China's Tibet region. Roads and communications at the port are cut, and further landslides are still possible. Rescue and relief work is ongoing.
    
    What changed for travelers
     From 00:00 on 28 August 2026, new electronic border administration area permits listing Shigatse as the destination are no longer being issued.
      If you already hold a valid e-permit with Shigatse as your destination, authorities are asking you NOT to travel to that area for now.
      No restart date yet — issuance will resume "when conditions allow," announced separately.

      Do you need to worry?
      This specifically affects the border administration zone around Shigatse and the Nepal–China overland route — not regular entry into China, and not the standard Tibet Travel Permit (入藏函) you'd arrange through a registered Tibetan tour operator for Lhasa or Everest Base Camp.
      If you were planning the Kathmandu → Gyirong → Shigatse → Lhasa overland route, expect it to be disrupted for now. Build in flexibility, watch for the official reopening notice, and keep a flying-in alternative (Lhasa has flights from several Chinese cities) as backup.
      
      Official source: National Immigration Administration (Exit and Entry Administration of the PRC), Announcement No. 5 of 2026, issued 27 August 2026.
      
      Kat's note: my heart goes out to everyone affected by the Gyirong Port mudslide. This is just the practical travel update — please keep the people there in your thoughts. 🤍`
  },
  
  {
    id: 'post-019',
    slug: 'rolling-suitcases-vs-backpacks-china',
    category: 'qa',
    date: '24 August 2026',
    tag: 'tip',
    title: "❓ Why do Chinese travelers prefer rolling suitcases over backpacks? — Charlotte",
    body: `Char notices this the second her step into a Chinese train station — locals glide past with sleek hard-shell suitcases while foreign backpackers look like they're about to summit Everest.
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
    date: '17 August 2026',
    tag: 'tip',
    title: "🥢 How to use chopsticks in China (without embarrassing yourself)",
    body: `Chopsticks aren't just utensils in China — they're a daily ritual. Most locals have been using them since age three, so don't feel bad if you struggle at first. Here's how to get from fumbling to functional in one meal.
    
    Step 1: Hold the first chopstick like a pencil
    Rest it in the crook between your thumb and index finger, letting it sit naturally on your ring finger. This chopstick stays completely still — it's your anchor.
    
    Step 2: Move only the top chopstick
    Hold the second chopstick between your thumb, index, and middle fingers — like you're holding a pen ready to write. This is the only chopstick that moves. Open and close the tips by pivoting your index finger up and down.
    
    The common mistake? Trying to move both sticks. Lock the bottom one, move only the top.
    What NOT to do (seriously, locals will wince)
    - Don't stick chopsticks upright in your rice bowl — it resembles incense at a funeral and is considered extremely bad luck.
    - Don't wave them around while talking, point at people with them, or tap bowls to get service.
    - Don't pass food directly from your chopsticks to someone else's — this also has funeral associations.
    - If you need to set them down, rest them across your bowl or on the chopstick rest (筷子架). Never leave them sticking into food.
    
    Practice tip: Start with larger items — dumplings, tofu cubes, broccoli florets. Rice is actually the hardest because it's loose and slippery. Many Chinese people bring the bowl right up to their mouth and shovel — it's completely acceptable, not rude at all.
    If you really can't manage, asking for a fork (叉子, chāzi) is fine in tourist areas. But learning even basic chopsticks earns you genuine smiles and respect from locals. It's worth the 10 minutes of awkwardness.`
  },
  {
    id: 'post-017',
    slug: 'china-public-transport-card',
    category: 'qa',
    date: '10 August 2026',
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
    date: '3 August 2026',
    tag: 'news',
    title: '📱 WeChat Pay expands international card support — now covers 80% of foreign visitors',
    body: `Not really. China doesn't have one nationwide public transport card that works across every city. Instead, public transport is usually city-based. Shanghai, Beijing, Guangzhou, etc. each have their own transport systems and payment options.
    For a short trip, you can usually: 1. Pay for metro rides with Alipay or the city's transport mini-program. 2.Buy a single-ride ticket at the metro station, there is a <a href="../metro-guide" style="color:var(--gold)">guide</a>. or 3.Use a local transport card if you're staying longer or taking public transport frequently.(but if you're only visiting for a few days, don't worry about buying a physical transport card before you arrive. Set up <a href="../alipay" style="color:var(--gold)">Alipay</a> first — it's usually much more convenient for visitors!)`
  },
  {
    id: 'post-015',
    slug: 'booking-com-hotels-china',
    category: 'qa',
    date: '1 August 2026',
    tag: 'tip',
    title: '❓ Can I book hotels on Booking.com in China? — Tom',
    body: `Not reliably. Booking.com and Agoda technically list Chinese hotels, but many smaller properties only appear on Chinese platforms like Trip.com (formerly Ctrip), Meituan, or Fliggy. The best strategy: use Trip.com — it has a full English interface, accepts foreign cards, and lists both international chains AND local boutique hotels. If you're looking for something really unique (like a courtyard hotel in a Beijing hutong), Trip.com will have options that Booking.com won't show you.`
  },
  {
    id: 'post-014',
    slug: 'stay-cool-china-summer-heat',
    category: 'lifehacks',
    date: '20 July 2026',
    tag: 'tip',
    title: '🧊 How to stay cool in China\'s August heat without spending a cent',
    body: `August is brutal. But there are secret ways to stay cool for free: (1) Big shopping malls blast AC all day and have plenty of seating — MixC and Joy City chains are everywhere. (2) Most museums are heavily air-conditioned and entry is often free or under ¥30. (3) Public libraries are another hidden gem — quiet, freezing cold, and free WiFi. (4) Starbucks in China has AC and you can sit for hours without buying a second drink. Just don't plan outdoor sightseeing between 11am and 3pm and you'll survive.`
  },

  // ── July 2026 ─────────────────────────────────────────────
  {
    id: 'post-013',
    slug: 'germany-visa-free-china',
    category: 'news',
    date: '13 July 2026',
    tag: 'visa',
    title: '🇩🇪 Germany now eligible for 15-day visa-free entry to China',
    body: `Big update for my German friends — as of July 2026, German passport holders can enter China visa-free for up to 15 days. This joins the growing list of countries that China has opened visa-free access to over the past year, including France, Switzerland, Italy, Spain, the Netherlands, Malaysia, and Singapore. The full list now covers over 15 countries. No visa application, no paperwork — just show up with your passport. Check your country's status before booking.`
  },
  {
    id: 'post-012',
    slug: 'vpn-china-instagram-whatsapp',
    category: 'qa',
    date: '9 July 2026',
    tag: 'tip',
    title: '❓ Do I need a VPN to access Instagram and WhatsApp? — Sophie',
    body: `Yes — Instagram, WhatsApp, Facebook, Google, and most Western social media are blocked in China without a VPN. You MUST download and configure your VPN BEFORE you arrive, because VPN provider websites are also blocked inside China. I recommend ExpressVPN or Astrill — they've been the most reliable for my friends. Set it up at home, test it, and don't turn your phone's VPN off once you land. One more thing: don't post about your VPN on Chinese social media; just use it quietly.`
  },
  {
    id: 'post-011',
    slug: 'china-metro-apps-english',
    category: 'lifehacks',
    date: '29 June 2026',
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
    date: '2 May 2026',
    tag: 'tip',
    title: '💳 Check out the foreigner-friendly Alipay',
    body: `Big update — Alipay now lets you link a foreign Visa or Mastercard directly, without needing a Chinese bank account as an intermediate step. Download the International version, go to Settings → Bank Cards, and you're done in about 5 minutes. Do this before you land — it makes everything so much easier from day one.`
  },
  {
    id: 'post-003',
    slug: 'why-china-restaurants-serve-hot-water',
    category: 'lifehacks',
    date: '9 May 2026',
    tag: 'tip',
    title: '🚰 Why restaurants give you hot water — and why it\'s actually great',
    body: `You'll notice that most Chinese restaurants serve hot or warm water instead of cold. This comes from traditional Chinese medicine — hot water is believed to aid digestion and balance the body. Don't ask for ice; embrace it. Bonus: hot water is free everywhere, even on trains. Bring a small thermos and you'll never pay for drinks again.`
  },
  {
    id: 'post-004',
    slug: 'china-toilet-culture-squat-toilets',
    category: 'lifehacks',
    date: '13 May 2026',
    tag: 'tip',
    title: '🚽 toilet culture',
    body: `There are many traditional squat toilets in China. Practice your Asian squat at home! You will need to straddle the pan with one foot on each side and squat down. And dont forget to bring some tissues with you!🧻`
  },

  // ── Q&A ───────────────────────────────────────────────────
  {
    id: 'post-005',
    slug: 'why-no-ice-water-china-restaurants',
    category: 'qa',
    date: '18 May 2026',
    tag: 'tip',
    title: '❓ Why don\'t restaurants serve ice water?--Amma',
    body: `This is one of the most asked questions from first-timers! In traditional Chinese culture, cold drinks — especially ice water — are considered bad for digestion and the body's "气qi" (energy balance). Most locals drink warm or hot water year-round. You can ask for cold water (冷水, lěng shuǐ) and most modern restaurants will accommodate you, but don't be surprised if it arrives at room temperature.`
  },
  {
    id: 'post-006',
    slug: 'google-maps-alternative-china',
    category: 'qa',
    date: '29 May 2026',
    tag: 'tip',
    title: '❓ Can I use Google Maps in China?-- Nick',
    body: `No — Google is blocked in China. Use these instead: Amap (高德地图, Gaode) for navigation — it's what locals use and it's excellent. Baidu Maps works too but is entirely in Chinese. Apple Maps actually works reasonably well in China since Apple uses local data. Download Amap before you arrive. For transit specifically, the Metro app for each city (Beijing Metro, Shanghai Metro) is very accurate.`
  },
  {
    id: 'post-007',
    slug: 'is-tap-water-safe-in-china',
    category: 'qa',
    date: '3 June 2026',
    tag: 'tip',
    title: '❓ Is it safe to drink tap water in China?--Lily',
    body: `No — tap water in China is not safe to drink directly. Always drink bottled water or water that has been boiled. The good news: bottled water is extremely cheap (¥1–2 for 500ml everywhere), and hotels always provide hot water flasks or kettles. Hot water from thermoses at restaurants and on trains has been boiled and is safe. Never use tap water to brush your teeth without boiling it first.`
  },

  // ── NEWS ───────────────────────────────────────────────
  {
    id: 'post-008',
    slug: 'australia-china-visa-transit',
    category: 'news',
    date: '8 June 2026',
    tag: 'visa',
    title: '🇦🇺 Australian travelers still need a visa — but transit is available',
    body: `Just a reminder for my lovely Australian friends: you still need to apply for a tourist (L) visa before entering China. Processing takes 4–7 business days, so don't leave it until the last minute. That said, if you're transiting through Shanghai, Beijing, or Guangzhou with an onward ticket to a third country, you can enter visa-free for up to 144 hours. Check the Get Ready section above for more details.`
  },
  {
    id: 'post-009',
    slug: 'china-parks-drinking-water-fountains',
    category: 'lifehacks',
    date: '15 June 2026',
    tag: 'tip',
    title: '💧 Some parks now provide drinking fountains 直饮水',
    body: `Good news for budget travelers! Several major parks in Beijing, Shanghai and Chengdu have installed 直饮水 (zhí yǐn shuǐ) — direct drinking water fountains with purified water. Look for the blue tap icons on park maps. This is part of a citywide initiative to reduce plastic waste. Bring a reusable bottle — it saves money and the environment.`
  },
  {
    id: 'post-010',
    slug: 'high-speed-rail-foreign-cards-china',
    category: 'news',
    date: '22 June 2026',
    tag: 'news',
    title: '🚄 High-speed rail now accepts foreign bank cards at ticket machines',
    body: `Major update for independent travelers: as of early 2026, most high-speed rail ticket machines at major stations now accept foreign Visa and Mastercard. Previously you needed a Chinese ID card or UnionPay card. You'll still need your passport. Recommended: book on the Trip.com app instead — you can reserve seats in advance, choose your carriage, and collect at the machine with your passport.`
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
  const catLabels    = { lifehacks: 'Kat\'s Hacks', qa: 'Q&A', news: 'News' };

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
    <div class="section-eyebrow">Kat's Tips · 旅行小抄</div>
    <div class="comm-title-row">
      <h2 class="section-title">Become a China master</h2>
      ${readMoreLink}
    </div>
    <p class="section-sub">Kat's hacks, honest Q&As, and real updates from Kat — everything I wish someone had told my friends before they visited China.</p>

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
      <button class="comm-tab active" data-tab="lifehacks" onclick="commShowTab('lifehacks')">💡 Kat's Hacks</button>
      <button class="comm-tab"        data-tab="qa"        onclick="commShowTab('qa')">❓ Q&amp;A</button>
      <button class="comm-tab"        data-tab="news"   onclick="commShowTab('news')">📢 News</button>
    </div>

    <!-- Card list -->
    <div id="comm-card-list" class="comm-card-list"></div>

    <!-- Email capture — lead magnet -->
    <div class="community-coming" style="margin-top:32px">
      <div class="comm-icon">📋</div>
      <div class="comm-title">Get the China Ready Checklist — free PDF</div>
      <div class="comm-sub">The exact 10-step checklist I give every friend before they visit China — visa, payments, eSIM, transport, and the apps that actually work. Download it, print it, keep it in your pocket.</div>
      <form id="community-email-form" class="guide-email-form" action="https://formspree.io/f/mnjypvzn" method="POST"
        style="display:flex;flex-direction:column;align-items:center;gap:12px"
        onsubmit="handleCommunityForm(event)">
        <input type="hidden" name="guide" value="checklist-pdf">
        <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
          <input class="comm-input" type="email" name="email" placeholder="your@email.com" required/>
          <button class="comm-btn" type="submit">Send me the PDF 📥</button>
        </div>
        <p style="font-size:11px;color:var(--text-muted);margin:0">No spam — just the checklist, plus the occasional genuinely useful update.</p>
      </form>
      <div id="community-email-form-ok" style="display:none;font-size:13px;color:var(--gold);margin-top:12px">
        ✅ You're in — grab your download below!
      </div>
      <div style="margin-top:16px;font-size:12px;color:var(--text-muted)">
        Questions before you go? Message me directly: <a href="mailto:hello@readychinatravel.com" style="color:var(--accent)">hello@readychinatravel.com</a>
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
      document.getElementById('community-email-form-ok').style.display = 'block';
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
