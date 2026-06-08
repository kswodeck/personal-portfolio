import { Component, input } from '@angular/core';
import type { Project } from '../types';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  template: `
    <section class="section" id="projects" aria-labelledby="projects-heading">
      <div class="container">
        <h2 class="section-heading" id="projects-heading">Projects</h2>
        <div class="projects-grid">
          @for (project of projects(); track project.name) {
            <article class="project-card">
              <div class="project-card-header">
                <span class="project-name">{{ project.name }}</span>
                <span class="project-date">{{ project.date }}</span>
              </div>
              @if (project.url) {
                <a class="project-link" [href]="project.url" target="_blank" rel="noopener noreferrer">
                  ↗ Visit
                </a>
              }
              <ul class="project-bullets">
                @for (bullet of project.bullets; track $index) {
                  <li>{{ bullet }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProjectsSectionComponent {
  projects = input.required<Project[]>();
}
