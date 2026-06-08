// Angular components can implement lifecycle interfaces like OnInit.
// `ngOnInit` runs once after the component's inputs are set — the right
// place to trigger data fetching (same role as React's useEffect([]) or
// Vue's onMounted).
import { Component, OnInit, inject } from '@angular/core';
import { ContentService } from './content.service';
import { TopBarComponent } from './components/top-bar.component';
import { HeroSectionComponent } from './components/hero-section.component';
import { AboutSectionComponent } from './components/about-section.component';
import { SkillsSectionComponent } from './components/skills-section.component';
import { ExperienceSectionComponent } from './components/experience-section.component';
import { ProjectsSectionComponent } from './components/projects-section.component';
import { EducationSectionComponent } from './components/education-section.component';
import { AboutSiteSectionComponent } from './components/about-site-section.component';
import { FooterSectionComponent } from './components/footer-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TopBarComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    SkillsSectionComponent,
    ExperienceSectionComponent,
    ProjectsSectionComponent,
    EducationSectionComponent,
    AboutSiteSectionComponent,
    FooterSectionComponent,
  ],
  template: `
    @if (contentService.error()) {
      <div style="padding:2rem;color:red;">
        Failed to load portfolio content: {{ contentService.error() }}
      </div>
    }
    @if (contentService.content(); as content) {
      <app-top-bar />
      <main id="main-content">
        <app-hero-section [profile]="content.profile" />
        <app-about-section [summary]="content.summary" />
        <app-skills-section [skills]="content.skills" />
        <app-experience-section [experience]="content.experience" />
        <app-projects-section [projects]="content.projects" />
        <app-education-section [education]="content.education" />
        <app-about-site-section [meta]="content.meta" [current]="content.meta.defaultFramework" />
      </main>
      <app-footer-section [profile]="content.profile" />
    }
  `,
})
export class App implements OnInit {
  contentService = inject(ContentService);

  ngOnInit(): void {
    this.contentService.load().then(() => {
      const content = this.contentService.content();
      if (content) {
        document.title = content.meta.siteTitle;
        const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (metaDesc) metaDesc.content = content.meta.description;
      }
    });
  }
}
