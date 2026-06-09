import type { Content } from './types';

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function switcher(meta: Content['meta'], current: string, size: 'small' | 'large' = 'small'): string {
  const cls = size === 'large' ? 'fw-switcher-large' : 'fw-switcher';
  const links = meta.frameworks.map(fw => {
    const label = esc(meta.frameworkLabels[fw]);
    const path = esc(meta.frameworkPaths[fw]);
    if (fw === current) {
      return `<span aria-current="page">${label}</span>`;
    }
    return `<a href="${path}">${label}</a>`;
  }).join('');
  return `<nav class="${cls}" aria-label="Framework versions">${links}</nav>`;
}

function topbar(meta: Content['meta'], current: string): string {
  return `
    <div class="topbar" role="banner">
      <div class="container">
        <span class="topbar-left">Built with: ${esc(meta.frameworkLabels[current])}</span>
        <div style="display:flex;align-items:center;gap:0.75rem;">
          ${switcher(meta, current, 'small')}
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>
        </div>
      </div>
    </div>`;
}

function hero(profile: Content['profile']): string {
  const email = esc(profile.email);
  const linkedin = esc(profile.links.linkedin);
  const github = esc(profile.links.github);
  const photo = profile.image
    ? `<img class="hero-photo" src="${esc(profile.image)}" alt="${esc(profile.name)}" width="140" height="140" />`
    : '';
  return `
    <header class="hero">
      <div class="container">
        <div class="hero-body">
          <h1 class="hero-name">${esc(profile.name)}</h1>
          <p class="hero-title">${esc(profile.title)}</p>
          <p class="hero-tagline">${esc(profile.tagline)}</p>
          <p class="hero-location">📍 ${esc(profile.location)}</p>
          <div class="hero-links">
            <a href="mailto:${email}" aria-label="Email ${esc(profile.name)}">✉️ ${email}</a>
            <a href="${linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">💼 LinkedIn</a>
            <a href="${github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">🐙 GitHub</a>
          </div>
        </div>
        ${photo}
      </div>
    </header>`;
}

function about(summary: string): string {
  return `
    <section class="section" id="about" aria-labelledby="about-heading">
      <div class="container">
        <h2 class="section-heading" id="about-heading">About</h2>
        <p>${esc(summary)}</p>
      </div>
    </section>`;
}

function skills(items: Content['skills']): string {
  const cards = items.map(s => `
    <div class="skill-category">
      <div class="skill-category-name">${esc(s.category)}</div>
      <div class="skill-tags">
        ${s.items.map(i => `<span class="skill-tag">${esc(i)}</span>`).join('')}
      </div>
    </div>`).join('');
  return `
    <section class="section" id="skills" aria-labelledby="skills-heading">
      <div class="container">
        <h2 class="section-heading" id="skills-heading">Skills</h2>
        <div class="skills-grid">${cards}</div>
      </div>
    </section>`;
}

function experience(companies: Content['experience']): string {
  const blocks = companies.map(c => {
    const roles = c.roles.map(r => `
      <div class="role">
        <div class="role-header">
          <span class="role-title">${esc(r.title)}</span>
          <span class="role-dates">${esc(r.start)} – ${esc(r.end)}</span>
        </div>
        <ul class="role-bullets">
          ${r.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
        </ul>
      </div>`).join('');
    return `
      <div class="experience-company">
        <div class="company-header">
          <span class="company-name">${esc(c.company)}</span>
          <span class="company-location">${esc(c.location)}</span>
        </div>
        ${roles}
      </div>`;
  }).join('');
  return `
    <section class="section" id="experience" aria-labelledby="experience-heading">
      <div class="container">
        <h2 class="section-heading" id="experience-heading">Experience</h2>
        ${blocks}
      </div>
    </section>`;
}

function projects(items: Content['projects']): string {
  const cards = items.map(p => {
    const link = p.url
      ? `<a class="project-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">↗ Visit</a>`
      : '';
    return `
      <article class="project-card">
        <div class="project-card-header">
          <span class="project-name">${esc(p.name)}</span>
          <span class="project-date">${esc(p.date)}</span>
        </div>
        ${link}
        <ul class="project-bullets">
          ${p.bullets.map(b => `<li>${esc(b)}</li>`).join('')}
        </ul>
      </article>`;
  }).join('');
  return `
    <section class="section" id="projects" aria-labelledby="projects-heading">
      <div class="container">
        <h2 class="section-heading" id="projects-heading">Projects</h2>
        <div class="projects-grid">${cards}</div>
      </div>
    </section>`;
}

function education(items: Content['education']): string {
  const rows = items.map(e => `
    <div class="education-item">
      <div>
        <div class="education-institution">${esc(e.institution)}</div>
        <div class="education-credential">${esc(e.credential)}</div>
      </div>
      <div class="education-dates">${esc(e.start)} – ${esc(e.end)}</div>
    </div>`).join('');
  return `
    <section class="section" id="education" aria-labelledby="education-heading">
      <div class="container">
        <h2 class="section-heading" id="education-heading">Education</h2>
        <div class="education-list">${rows}</div>
      </div>
    </section>`;
}

function aboutSite(meta: Content['meta'], current: string): string {
  return `
    <section class="section about-site" id="about-site" aria-labelledby="about-site-heading">
      <div class="container">
        <h2 class="section-heading" id="about-site-heading">About This Site</h2>
        <p class="about-site-intro">
          This portfolio is built four times — once in each major front-end framework — all reading from
          a single shared <code>content.json</code>. Each implementation lives at its own URL path and is
          a fully independent, standalone build. Switch between them below:
        </p>
        ${switcher(meta, current, 'large')}
      </div>
    </section>`;
}

function footer(profile: Content['profile']): string {
  const year = new Date().getFullYear();
  return `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <span class="footer-copy">© ${year} ${esc(profile.name)}</span>
          <div class="footer-links">
            <a href="mailto:${esc(profile.email)}">Email</a>
            <a href="${esc(profile.links.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="${esc(profile.links.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>`;
}

export function renderApp(content: Content, currentFramework: string): string {
  return `
    ${topbar(content.meta, currentFramework)}
    <main id="main-content">
      ${hero(content.profile)}
      ${about(content.summary)}
      ${skills(content.skills)}
      ${experience(content.experience)}
      ${projects(content.projects)}
      ${education(content.education)}
      ${aboutSite(content.meta, currentFramework)}
    </main>
    ${footer(content.profile)}
  `;
}
