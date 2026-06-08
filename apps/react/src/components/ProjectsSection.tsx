import type { Project } from '../types';

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <div className="container">
        <h2 className="section-heading" id="projects-heading">Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <article key={project.name} className="project-card">
              <div className="project-card-header">
                <span className="project-name">{project.name}</span>
                <span className="project-date">{project.date}</span>
              </div>
              {project.url && (
                <a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer">
                  ↗ Visit
                </a>
              )}
              <ul className="project-bullets">
                {project.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
