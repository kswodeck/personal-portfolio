import type { Meta, AboutSite } from '../types';
import { FrameworkSwitcher } from './FrameworkSwitcher';

export function AboutSiteSection({ meta, current, aboutSite }: { meta: Meta; current: string; aboutSite: AboutSite }) {
  return (
    <section className="section about-site" id="about-site" aria-labelledby="about-site-heading">
      <div className="container">
        <h2 className="section-heading" id="about-site-heading">About This Site</h2>
        <p className="about-site-intro">{aboutSite.intro}</p>
        <div className="build-pillars">
          {aboutSite.pillars.map(pillar => (
            <div key={pillar.title} className="pillar-card">
              <div className="pillar-icon">{pillar.icon}</div>
              <div className="pillar-title">{pillar.title}</div>
              <p className="pillar-desc">{pillar.description}</p>
              <div className="pillar-tags">
                {pillar.tags.map(tag => (
                  <span key={tag} className="pillar-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          You are currently viewing the <strong>{meta.frameworkLabels[current]}</strong> version. Switch between implementations:
        </p>
        <FrameworkSwitcher meta={meta} current={current} size="large" />
      </div>
    </section>
  );
}
