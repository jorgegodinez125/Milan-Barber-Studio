(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function setMenuOpen(isOpen) {
    if (!hamburger || !navLinks) return;

    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth();
      document.documentElement.style.setProperty(
        '--scrollbar-compensation',
        `${scrollbarWidth}px`
      );
    } else {
      document.documentElement.style.removeProperty('--scrollbar-compensation');
    }

    navLinks.classList.toggle('open', isOpen);
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('nav-open', isOpen);
  }

  if (hamburger && navLinks) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'navLinks');

    hamburger.addEventListener('click', (event) => {
      event.stopPropagation();
      setMenuOpen(!navLinks.classList.contains('open'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (!navLinks.classList.contains('open')) return;
      if (hamburger.contains(event.target) || navLinks.contains(event.target)) return;
      setMenuOpen(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));

  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');

  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 48);

    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 160) current = s.id;
    });
    navAs.forEach((a) => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--plateado)' : '';
    });
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => {
      const delay = el.classList.contains('reveal-delay-1') ? 0.1
        : el.classList.contains('reveal-delay-2') ? 0.2
        : el.classList.contains('reveal-delay-3') ? 0.3
        : el.classList.contains('reveal-delay-4') ? 0.4
        : 0;
      el.style.transitionDelay = `${delay}s`;
    });
  }
})();
