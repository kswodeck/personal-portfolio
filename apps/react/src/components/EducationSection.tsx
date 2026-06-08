import type { Education } from '../types';

export function EducationSection({ education }: { education: Education[] }) {
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <div className="container">
        <h2 className="section-heading" id="education-heading">Education</h2>
        <div className="education-list">
          {education.map(edu => (
            <div key={edu.institution} className="education-item">
              <div>
                <div className="education-institution">{edu.institution}</div>
                <div className="education-credential">{edu.credential}</div>
              </div>
              <div className="education-dates">{edu.start} – {edu.end}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
