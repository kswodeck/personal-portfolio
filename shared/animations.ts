let _topbarReady = false;

export function initAnimations(): void {
  setupTopbarScroll();
  setupScrollReveal();
}

function setupTopbarScroll(): void {
  if (_topbarReady) return;
  const topbar = document.querySelector<HTMLElement>('.topbar');
  if (!topbar) return;
  _topbarReady = true;
  const update = (): void => topbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupScrollReveal(): void {
  // Stagger groups — each child gets a CSS --reveal-i variable for offset delay
  for (const sel of ['.skills-grid', '.projects-grid', '.education-list', '.build-pillars']) {
    document.querySelectorAll<HTMLElement>(`${sel} > *`).forEach((el, i) => {
      if (el.classList.contains('reveal')) return;
      el.style.setProperty('--reveal-i', String(i));
      el.classList.add('reveal', 'reveal--stagger');
    });
  }

  // Individual elements that reveal as a unit on scroll
  for (const sel of ['.section-heading', '.about-site-intro', '.experience-company']) {
    document.querySelectorAll<HTMLElement>(sel).forEach(el => {
      if (el.classList.contains('reveal')) return;
      el.classList.add('reveal');
    });
  }

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('is-visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  // Only observe elements not yet visible (safe to call multiple times)
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
}
