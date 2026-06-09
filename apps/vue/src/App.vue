<script setup lang="ts">
// `ref` holds reactive state. When `content.value` is set, Vue re-renders
// any template that reads it — no manual DOM updates needed.
import { ref, onMounted, nextTick } from 'vue';
import type { Content } from './types';
import { fetchContent } from '../../../shared/fetchContent';
import { initAnimations } from '../../../shared/animations';
import TopBar from './components/TopBar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import ExperienceSection from './components/ExperienceSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import EducationSection from './components/EducationSection.vue';
import AboutSiteSection from './components/AboutSiteSection.vue';
import FooterSection from './components/FooterSection.vue';

const content = ref<Content | null>(null);
const error = ref<string | null>(null);

// `onMounted` runs after the component is inserted into the DOM —
// the right place for side effects like data fetching.
onMounted(async () => {
  try {
    content.value = await fetchContent();
    await nextTick();
    initAnimations();

    if (content.value) {
      document.title = content.value.meta.siteTitle;
      const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (metaDesc) metaDesc.content = content.value.meta.description;
    }
  } catch (e) {
    error.value = (e as Error).message;
  }
});
</script>

<template>
  <div v-if="error" style="padding:2rem;color:red;">
    Failed to load portfolio content: {{ error }}
  </div>

  <!-- v-else-if renders only when content has loaded (non-null) -->
  <div v-else-if="content">
    <TopBar :meta="content.meta" :current="'vue'" />
    <main id="main-content">
      <HeroSection :profile="content.profile" />
      <AboutSection :summary="content.summary" />
      <SkillsSection :skills="content.skills" />
      <ExperienceSection :experience="content.experience" />
      <ProjectsSection :projects="content.projects" />
      <EducationSection :education="content.education" />
      <AboutSiteSection :meta="content.meta" :current="'vue'" :aboutSite="content.aboutSite" />
    </main>
    <FooterSection :profile="content.profile" />
  </div>
</template>
