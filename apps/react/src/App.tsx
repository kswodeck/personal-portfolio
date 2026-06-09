// React components are plain functions that return JSX.
// `useState` and `useEffect` are the two core hooks:
//   - useState: reactive value + setter (triggers re-render on change)
//   - useEffect: side effects after render (data fetch, DOM updates, subscriptions)
import { useState, useEffect } from 'react';
import type { Content } from './types';
import { useTheme } from './hooks/useTheme';
import { fetchContent } from '../../../shared/fetchContent';
import { initAnimations } from '../../../shared/animations';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { AboutSiteSection } from './components/AboutSiteSection';
import { FooterSection } from './components/FooterSection';

function App() {
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, toggleTheme } = useTheme();

  // Empty dependency array `[]` means this runs once after the first render —
  // equivalent to Vue's `onMounted`.
  useEffect(() => {
    fetchContent()
      .then(data => {
        setContent(data);
        document.title = data.meta.siteTitle;
        const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (metaDesc) metaDesc.content = data.meta.description;
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  // useEffect fires after paint — DOM is ready, safe to observe elements
  useEffect(() => {
    if (content) initAnimations();
  }, [content]);

  if (error) {
    return <div style={{ padding: '2rem', color: 'red' }}>Failed to load portfolio content: {error}</div>;
  }

  if (!content) return null;

  return (
    <>
      <TopBar
        meta={content.meta}
        current={'react'}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <main id="main-content">
        <HeroSection profile={content.profile} />
        <AboutSection summary={content.summary} />
        <SkillsSection skills={content.skills} />
        <ExperienceSection experience={content.experience} />
        <ProjectsSection projects={content.projects} />
        <EducationSection education={content.education} />
        <AboutSiteSection meta={content.meta} current={'react'} aboutSite={content.aboutSite} />
      </main>
      <FooterSection profile={content.profile} />
    </>
  );
}

export default App;
