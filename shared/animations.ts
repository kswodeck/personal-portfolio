let _topbarReady = false;
let _backToTopReady = false;
let _activeSectionReady = false;

export function initAnimations(taglines?: string[]): void {
  setupTopbarScroll();
  setupScrollReveal();
  setupBackToTop();
  setupActiveSection();
  setupStatCounters();
  if (taglines?.length) setupTypewriter('.hero-tagline', taglines);
}

function setupTopbarScroll(): void {
  if (_topbarReady) return;
  const topbar = document.querySelector<HTMLElement>('.topbar');
  if (!topbar) return;
  _topbarReady = true;
  const update = (): void => { topbar.classList.toggle('scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupScrollReveal(): void {
  for (const sel of ['.skills-grid', '.projects-grid', '.education-list', '.build-pillars']) {
    document.querySelectorAll<HTMLElement>(`${sel} > *`).forEach((el, i) => {
      if (el.classList.contains('reveal')) return;
      el.style.setProperty('--reveal-i', String(i));
      el.classList.add('reveal', 'reveal--stagger');
    });
  }
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
  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el));
}

function setupBackToTop(): void {
  if (_backToTopReady) return;
  _backToTopReady = true;
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Scroll back to top');
  btn.textContent = '↑';
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const update = (): void => { btn.classList.toggle('visible', window.scrollY > 400); };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function setupActiveSection(): void {
  if (_activeSectionReady) return;
  const topbar = document.querySelector<HTMLElement>('.topbar');
  if (!topbar) return;
  _activeSectionReady = true;

  // Thin scroll-progress bar along the bottom edge of the topbar
  const bar = document.createElement('div');
  bar.className = 'topbar-progress';
  topbar.appendChild(bar);

  const topbarLeft = topbar.querySelector<HTMLElement>('.topbar-left');
  const originalLabel = topbarLeft?.textContent ?? '';

  const sections = Array.from(document.querySelectorAll<HTMLElement>('.section[id]'));
  const labels: Record<string, string> = {
    'about':      'About',
    'skills':     'Skills',
    'experience': 'Experience',
    'projects':   'Projects',
    'education':  'Education',
    'about-site': 'About This Site',
  };

  const onScroll = (): void => {
    // Update progress bar width
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;

    // Update topbar-left label to show current section
    if (!topbarLeft) return;
    if (window.scrollY > 80) {
      let activeId = '';
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= 72) activeId = sec.id;
      }
      const label = labels[activeId] ?? originalLabel;
      if (topbarLeft.textContent !== label) topbarLeft.textContent = label;
    } else {
      if (topbarLeft.textContent !== originalLabel) topbarLeft.textContent = originalLabel;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setupStatCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('.stat-value[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      observer.unobserve(e.target);
      const el = e.target as HTMLElement;
      const target = el.dataset['target'] ?? '';
      const numMatch = target.match(/\d+/);
      if (!numMatch) { el.textContent = target; return; }

      const num = parseInt(numMatch[0], 10);
      const prefix = target.slice(0, numMatch.index ?? 0);
      const suffix = target.slice((numMatch.index ?? 0) + numMatch[0].length);
      const started = performance.now();
      const duration = 1200;

      const tick = (now: number): void => {
        const t = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3); // cubic ease-out
        el.textContent = `${prefix}${Math.floor(eased * num)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

function setupTypewriter(selector: string, phrases: string[]): void {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el || !phrases.length) return;

  el.classList.add('typewriter-active');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const tick = (): void => {
    const phrase = phrases[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 225);
      } else {
        setTimeout(tick, 18);
      }
    } else {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) {
        setTimeout(() => { deleting = true; tick(); }, 1400);
      } else {
        setTimeout(tick, 30);
      }
    }
  };

  el.textContent = '';
  // Delay start until after the hero entrance animation finishes
  setTimeout(tick, 450);
}
