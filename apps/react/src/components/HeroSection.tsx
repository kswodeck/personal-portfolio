import type { Profile } from '../types';

export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <header className="hero">
      <div className="container">
        <div className="hero-body">
          {profile.available && (
            <div className="available-badge">Open to work</div>
          )}
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-title">{profile.title}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-location">📍 {profile.location}</p>
          <div className="hero-links">
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
              ✉️ {profile.email}
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              💼 LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              🐙 GitHub
            </a>
            {profile.resumeUrl && (
              <a className="hero-resume-btn" href={profile.resumeUrl} download aria-label="Download resume PDF">
                ⬇ Resume
              </a>
            )}
          </div>

        </div>
        {profile.image && (
          <img className="hero-photo" src={profile.image} alt={profile.name} width={140} height={140} />
        )}
      </div>
    </header>
  );
}
