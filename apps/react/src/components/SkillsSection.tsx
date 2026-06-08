import type { Skill } from '../types';

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <div className="container">
        <h2 className="section-heading" id="skills-heading">Skills</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <div key={skill.category} className="skill-category">
              <div className="skill-category-name">{skill.category}</div>
              <div className="skill-tags">
                {skill.items.map(item => (
                  <span key={item} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
