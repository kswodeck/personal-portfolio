import { Component, input } from '@angular/core';
import { NgFor } from '@angular/common';
import { FrameworkSwitcherComponent } from './framework-switcher.component';
import type { Meta, AboutSite } from '../types';

@Component({
  selector: 'app-about-site-section',
  standalone: true,
  imports: [FrameworkSwitcherComponent, NgFor],
  template: `
    <section class="section about-site" id="about-site" aria-labelledby="about-site-heading">
      <div class="container">
        <h2 class="section-heading" id="about-site-heading">About This Site</h2>
        <p class="about-site-intro">{{ aboutSite().intro }}</p>
        <div class="build-pillars">
          @for (pillar of aboutSite().pillars; track pillar.title) {
            <div class="pillar-card">
              <div class="pillar-icon">{{ pillar.icon }}</div>
              <div class="pillar-title">{{ pillar.title }}</div>
              <p class="pillar-desc">{{ pillar.description }}</p>
              <div class="pillar-tags">
                @for (tag of pillar.tags; track tag) {
                  <span class="pillar-tag">{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:0.75rem;">
          You are currently viewing the <strong>{{ meta().frameworkLabels[current()] }}</strong> version. Switch between implementations:
        </p>
        <app-framework-switcher [meta]="meta()" [current]="current()" size="large" />
      </div>
    </section>
  `,
})
export class AboutSiteSectionComponent {
  meta = input.required<Meta>();
  current = input.required<string>();
  aboutSite = input.required<AboutSite>();
}
