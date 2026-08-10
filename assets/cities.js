//============================================================
//  assets/cities.js — City cards with 3D flip overlay
//
//  HOW TO ADD A CITY: edit data/cities.json only
//  HOW TO ADD PHOTOS TO A CITY:
//    1. Create folder: images/cities/cityname/
//    2. Add your photos (jpg/webp, max 200kb each)
//    3. In cities.json, add to the city's "photos" array:
//       { "src": "images/cities/beijing/my-photo.jpg", "alt": "Description" }
//    4. Push — photos appear automatically
// ============================================================

// ── FLIP OVERLAY INJECTION ──────────────────────────────────
function ensureFlipOverlay() {
  if (document.getElementById('flip-overlay')) return;
  var html = '<div id="flip-overlay" class="flip-overlay">' +
    '<button class="flip-close" id="flip-close" aria-label="Close">\u00d7</button>' +
    '<div class="flip-card" id="flip-card">' +
      '<div class="flip-card-inner" id="flip-inner">' +
        '<div class="flip-front" id="flip-front"></div>' +
        '<div class="flip-back" id="flip-back"></div>' +
      '</div>' +
    '</div>' +
  '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
}

// ── FLIP CARD STATE ─────────────────────────────────────────
var _currentCity = null;
var _flipInner   = null;
var _flipOverlay = null;
var _flipFront   = null;

function initFlipRefs() {
  _flipOverlay = document.getElementById('flip-overlay');
  _flipInner   = document.getElementById('flip-inner');
  _flipFront   = document.getElementById('flip-front');
}

function openFlipCard(city) {
  _currentCity = city;

  var overlay = _flipOverlay || document.getElementById('flip-overlay');
  var inner   = _flipInner   || document.getElementById('flip-inner');
  var front   = _flipFront   || document.getElementById('flip-front');
  var back    = document.getElementById('flip-back');
  if (!overlay || !inner) return;

  // ── Populate FRONT ──
  front.innerHTML =
    '<div class="flip-front-emoji">' + city.emoji + '</div>' +
    '<div class="flip-front-name-zh">' + city.nameZh + '</div>' +
    '<div class="flip-front-name-en">' + city.nameEn + '</div>' +
    '<div class="flip-front-teaser">' + city.bestFor + '</div>' +
    '<div class="flip-front-tap">\uD83D\uDC46 Tap to flip</div>';

  // ── Populate BACK ──
  var photoStripHTML = _buildFlipPhotos(city.photos);
  var tagsHTML = city.tags.map(function(t) {
    return '<span class="flip-back-tag">' + t + '</span>';
  }).join('');

  back.innerHTML =
    photoStripHTML +
    '<div class="flip-back-body">' +
      '<div class="flip-back-row">' +
        '<span class="flip-back-name-zh">' + city.nameZh + '</span>' +
        '<span class="flip-back-name-en">' + city.nameEn + '</span>' +
      '</div>' +
      '<div class="flip-back-stats">' +
        '<span class="flip-back-stat"><span class="flip-back-stars">' + city.difficulty + '</span></span>' +
        '<span class="flip-back-stat">\uD83D\uDDD3 ' + city.days + '</span>' +
      '</div>' +
      '<div class="flip-back-best"><strong>Best for:</strong> ' + city.bestFor + '</div>' +
      '<div class="flip-back-tags">' + tagsHTML + '</div>' +
      '<div class="flip-top5">' +
        '<div class="flip-top5-title">Top 5 Spots</div>' +
        '<ol class="flip-top5-list">' +
          city.attractions.slice(0, 5).map(function(a, i) {
            return '<li><span class="flip-top5-num">' + (i + 1) + '</span>' + a.replace(/\s*—\s*/g, ' — ') + '</li>';
          }).join('') +
        '</ol>' +
      '</div>' +
      '<button class="flip-back-btn" id="flip-readmore">Read More \u2192</button>' +
    '</div>';

  // Show overlay, then animate flip
  overlay.classList.add('active');
  inner.classList.remove('flipped');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      inner.classList.add('flipped');
    });
  });
}

function _buildFlipPhotos(photos) {
  if (!photos || photos.length === 0) return '';
  var photosJSON = JSON.stringify(photos)
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
  var items = photos.map(function(p, i) {
    return '<img src="' + p.src + '" alt="' + p.alt + '" loading="lazy"' +
      ' class="flip-back-photo"' +
      ' onclick="event.stopPropagation();openLightbox(' + photosJSON + ',' + i + ')"' +
      ' onerror="this.style.display=\'none\'">';
  }).join('');
  return '<div class="flip-back-photo-strip">' + items + '</div>';
}

function closeFlipCard() {
  if (_flipInner) _flipInner.classList.remove('flipped');
  setTimeout(function() {
    if (_flipOverlay) _flipOverlay.classList.remove('active');
    document.body.style.overflow = '';
    _currentCity = null;
  }, 350);
}

function setupFlipOverlayEvents() {
  var overlay = document.getElementById('flip-overlay');
  if (!overlay) return;

  // Close button
  var closeBtn = document.getElementById('flip-close');
  if (closeBtn) closeBtn.addEventListener('click', closeFlipCard);

  // Backdrop click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeFlipCard();
  });

  // ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeFlipCard();
    }
  });

  // Tap front face to flip
  var front = document.getElementById('flip-front');
  if (front) {
    front.addEventListener('click', function() {
      if (_flipInner && !_flipInner.classList.contains('flipped')) {
        _flipInner.classList.add('flipped');
      }
    });
  }

  // Read More button (delegated on document)
  document.addEventListener('click', function(e) {
    var btn = e.target.closest ? e.target.closest('#flip-readmore') : null;
    if (!btn || !_currentCity) return;
    var slug = _currentCity.nameEn.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-');
    window.location.href = './guides/' + slug + '.html';
  });
}

// ── LIGHTBOX STATE ────────────────────────────────────────────
// Module-level — shared across all city cards
var _lbPhotos = [];   // current city's photos array
var _lbIndex  = 0;    // which photo is showing

function openLightbox(photos, startIndex) {
  _lbPhotos = photos;
  _lbIndex  = startIndex;

  var lb = document.getElementById('lightbox');
  lb.classList.toggle('single', photos.length === 1);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';

  _lbRender();
}

function _lbRender() {
  var photo = _lbPhotos[_lbIndex];
  var img   = document.getElementById('lb-img');

  // Fade swap: hide → update src → show
  img.style.animation = 'none';
  img.offsetHeight;                        // force reflow
  img.style.animation = '';

  img.src = photo.src;
  img.alt = photo.alt;
  document.getElementById('lb-caption').textContent = photo.alt;
  document.getElementById('lb-counter').textContent =
    _lbPhotos.length > 1 ? (_lbIndex + 1) + ' / ' + _lbPhotos.length : '';
}

function navigateLightbox(dir) {
  _lbIndex = (_lbIndex + dir + _lbPhotos.length) % _lbPhotos.length;
  _lbRender();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  // Only restore body scroll if flip overlay is not also open
  var fo = document.getElementById('flip-overlay');
  if (!fo || !fo.classList.contains('active')) {
    document.body.style.overflow = '';
  }
  _lbPhotos = [];
  _lbIndex  = 0;
}

// Keyboard support — arrow keys + ESC
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowLeft')  navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
  if (e.key === 'Escape')     closeLightbox();
});

// Click backdrop (the dark area outside the image) to close
var _lb = document.getElementById('lightbox');
if (_lb) {
  _lb.addEventListener('click', function(e) {
    if (e.target.id === 'lightbox') closeLightbox();
  });
}

// ── TOUCH / SWIPE SUPPORT ────────────────────────────────────
(function () {
  var touchStartX = 0;
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   function(e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigateLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });
})();

// ── BUILD CITY CARD ─────────────────────────────────────────
function buildCityCard(city, index) {
  var tagsHTML = city.tags
    .map(function(tag) { return '<span class="city-tag">' + tag + '</span>'; })
    .join('');

  return '<div class="city-card" data-city-index="' + index + '">' +
    '<div class="city-card-top">' +
      '<div class="city-emoji-big">' + city.emoji + '</div>' +
      '<div class="city-difficulty">' +
        '<div class="diff-label">Difficulty</div>' +
        '<div class="diff-stars">' + city.difficulty + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="city-name-zh">' + city.nameZh + '</div>' +
    '<div class="city-name-en">' + city.nameEn + '</div>' +
    '<div class="city-days">\uD83D\uDDD3 ' + city.days + '</div>' +
    '<div class="city-best-for"><strong>Best for:</strong> ' + city.bestFor + '</div>' +
    '<div class="city-tags">' + tagsHTML + '</div>' +
    '<div class="card-hint">Click to flip \u2192</div>' +
  '</div>';
}

async function loadCities() {
  var container = document.getElementById('cities-container');
  if (!container) return;

  try {
    var response = await fetch('./data/cities.json');
    if (!response.ok) throw new Error('HTTP ' + response.status);
    var cities = await response.json();

    // Inject flip overlay once
    ensureFlipOverlay();

    // Build cards
    container.innerHTML = cities.map(function(c, i) {
      return buildCityCard(c, i);
    }).join('');

    // Init flip refs
    initFlipRefs();
    setupFlipOverlayEvents();

    // Horizontal carousel arrows (homepage only; no-op on grid pages)
    setupCityCarousel();

    // Event delegation for city card clicks
    container.addEventListener('click', function(e) {
      var card = e.target.closest ? e.target.closest('.city-card') : null;
      if (!card) return;
      var idx = parseInt(card.getAttribute('data-city-index'));
      if (!isNaN(idx) && cities[idx]) {
        openFlipCard(cities[idx]);
      }
    });

  } catch (err) {
    console.error('loadCities() failed:', err);
    container.innerHTML = '<p style="color:var(--text-muted);font-size:13px;padding:20px 0">' +
      'City guide is loading... if this persists, please refresh. \uD83D\uDD04</p>';
  }
}

// ── HORIZONTAL CAROUSEL (homepage) ────────────────────────
function setupCityCarousel() {
  var wrap = document.querySelector('.city-carousel-wrap');
  if (!wrap) return;                       // grid pages have no carousel wrap
  var carousel = document.getElementById('cities-container');
  var prev = document.getElementById('cityPrev');
  var next = document.getElementById('cityNext');
  if (!carousel || !prev || !next) return;

  var cardStep = function() {
    var card = carousel.querySelector('.city-card');
    return card ? card.offsetWidth + 16 : 300;
  };
  next.addEventListener('click', function(e) {
    e.stopPropagation();
    carousel.scrollBy({ left: cardStep() * 2, behavior: 'smooth' });
  });
  prev.addEventListener('click', function(e) {
    e.stopPropagation();
    carousel.scrollBy({ left: -cardStep() * 2, behavior: 'smooth' });
  });
  var updateBtns = function() {
    prev.style.opacity = carousel.scrollLeft > 8 ? '1' : '0';
    next.style.opacity = (carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth - 8) ? '1' : '0';
  };
  carousel.addEventListener('scroll', updateBtns, { passive: true });
  updateBtns();
}

loadCities();
