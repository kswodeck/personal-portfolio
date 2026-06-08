import { Component, input } from '@angular/core';
import type { Skill } from '../types';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  template: `
    <section class="section" id="skills" aria-labelledby="skills-heading">
      <div class="container">
        <h2 class="section-heading" id="skills-heading">Skills</h2>
        <div class="skills-grid">
          @for (skill of skills(); track skill.category) {
            <div class="skill-category">
              <div class="skill-category-name">{{ skill.category }}</div>
              <div class="skill-tags">
                @for (item of skill.items; track item) {
                  <span class="skill-tag">{{ item }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsSectionComponent {
  skills = input.required<Skill[]>();
}
