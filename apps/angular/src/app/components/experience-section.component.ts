import { Component, input } from '@angular/core';
import type { Company } from '../types';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  template: `
    <section class="section" id="experience" aria-labelledby="experience-heading">
      <div class="container">
        <h2 class="section-heading" id="experience-heading">Experience</h2>
        @for (company of experience(); track company.company) {
          <div class="experience-company">
            <div class="company-header">
              <span class="company-name">{{ company.company }}</span>
              <span class="company-location">{{ company.location }}</span>
            </div>
            @for (role of company.roles; track role.title) {
              <div class="role">
                <div class="role-header">
                  <span class="role-title">{{ role.title }}</span>
                  <span class="role-dates">{{ role.start }} – {{ role.end }}</span>
                </div>
                <ul class="role-bullets">
                  @for (bullet of role.bullets; track $index) {
                    <li>{{ bullet }}</li>
                  }
                </ul>
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
})
export class ExperienceSectionComponent {
  experience = input.required<Company[]>();
}
