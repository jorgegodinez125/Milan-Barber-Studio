(function () {
  'use strict';

  const doc = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Menú móvil ─────────────────────────────────────────────────────── */
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.classList.toggle('menu-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
  }

  /* ── Barra al hacer scroll + botón de WhatsApp ──────────────────────── */
  const waFloat = document.getElementById('waFloat');
  const hero = document.getElementById('inicio');
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
    if (waFloat && hero) waFloat.classList.toggle('is-visible', y > hero.offsetHeight * 0.6);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ── Enlace activo en el menú ───────────────────────────────────────── */
  const links = new Map(
    Array.from(document.querySelectorAll('.nav-menu a')).map((a) => [a.getAttribute('href').slice(1), a])
  );

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove('is-active'));
      const link = links.get(entry.target.id);
      if (link) link.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));

  /* ── Galería ────────────────────────────────────────────────────────── */
  const grid = document.getElementById('galeriaGrid');
  const photos = Array.isArray(window.GALLERY_PHOTOS) ? window.GALLERY_PHOTOS : [];

  if (grid) {
    photos.forEach((photo, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-item reveal';
      btn.dataset.index = String(i);
      btn.setAttribute('aria-label', `Ampliar foto: ${photo.label || photo.alt || ''}`);

      const img = document.createElement('img');
      img.src = photo.src;
      img.alt = photo.alt || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 1200;
      img.height = 800;
      btn.appendChild(img);

      if (photo.label) {
        const cap = document.createElement('span');
        cap.className = 'gallery-caption';
        const name = document.createElement('span');
        name.textContent = photo.label;
        const num = document.createElement('span');
        num.textContent = String(i + 1).padStart(2, '0');
        cap.append(name, num);
        btn.appendChild(cap);
      }

      grid.appendChild(btn);
    });
  }

  /* ── Visor de fotos ─────────────────────────────────────────────────── */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  let current = 0;
  let opener = null;

  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    lbImg.src = p.src;
    lbImg.alt = p.alt || '';
    lbCaption.textContent = p.label || '';
  }

  if (lb && typeof lb.showModal === 'function' && grid) {
    grid.addEventListener('click', (e) => {
      const item = e.target.closest('.gallery-item');
      if (!item) return;
      opener = item;
      show(Number(item.dataset.index));
      lb.showModal();
      document.body.classList.add('menu-open');
    });

    lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
    lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
    lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.tagName === 'FIGURE') lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    lb.addEventListener('close', () => {
      document.body.classList.remove('menu-open');
      if (opener) opener.focus();
    });

    // Deslizar en móvil
    let startX = null;
    lb.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      startX = null;
    });
  }

  /* ── Aparición suave al hacer scroll ────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        // Escalonado entre elementos hermanos que entran juntos
        const siblings = Array.from(entry.target.parentElement.children).filter((el) => el.classList.contains('reveal'));
        const idx = Math.max(0, siblings.indexOf(entry.target));
        entry.target.style.transitionDelay = `${Math.min(idx, 5) * 0.09}s`;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => revealObserver.observe(el));
  }

  /* ── Año del footer ─────────────────────────────────────────────────── */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  doc.classList.add('is-ready');
})();
