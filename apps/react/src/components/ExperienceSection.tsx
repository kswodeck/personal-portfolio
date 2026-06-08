import type { Company } from '../types';

export function ExperienceSection({ experience }: { experience: Company[] }) {
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <div className="container">
        <h2 className="section-heading" id="experience-heading">Experience</h2>
        {experience.map(company => (
          <div key={company.company} className="experience-company">
            <div className="company-header">
              <span className="company-name">{company.company}</span>
              <span className="company-location">{company.location}</span>
            </div>
            {company.roles.map(role => (
              <div key={role.title + role.start} className="role">
                <div className="role-header">
                  <span className="role-title">{role.title}</span>
                  <span className="role-dates">{role.start} – {role.end}</span>
                </div>
                <ul className="role-bullets">
                  {role.bullets.map((bullet, i) => <li key={i}>{bullet}</li>)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
