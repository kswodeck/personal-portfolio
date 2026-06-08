import type { Profile } from '../types';

export function FooterSection({ profile }: { profile: Profile }) {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <span className="footer-copy">© {year} {profile.name}</span>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
