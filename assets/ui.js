// ============================================================
//  assets/ui.js — Global UI utilities
//
//  These functions are called from onclick attributes in
//  index.html and from every module. Must load first.
//
//  HOW TO EDIT:
//  • Nav scroll targets      → scrollToSection(id) — id must
//    match the section's id attribute in the DOM
//  • Menu open/close logic   → toggleMenu / closeMenu
//  • Modal open/close logic  → openModal / closeModal
// ============================================================

// ── MENU ────────────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('menu-btn').classList.toggle('open');
  document.getElementById('menu-dropdown').classList.toggle('show');
}

function closeMenu() {
  document.getElementById('menu-btn').classList.remove('open');
  document.getElementById('menu-dropdown').classList.remove('show');
}

// Close menu when clicking anywhere outside it
document.addEventListener('click', e => {
  const btn  = document.getElementById('menu-btn');
  const drop = document.getElementById('menu-dropdown');
  if (!btn.contains(e.target) && !drop.contains(e.target)) closeMenu();
});

// ── SCROLL ──────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  closeMenu();
}

// ── MODALS ──────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
  document.body.style.overflow = '';
}

// Close modal when clicking the backdrop
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// Close modal or menu when pressing Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.show').forEach(m => closeModal(m.id));
    closeMenu();
  }
});
