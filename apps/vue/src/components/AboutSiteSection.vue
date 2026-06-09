<script setup lang="ts">
import type { Meta, AboutSite } from '../types';
import FrameworkSwitcher from './FrameworkSwitcher.vue';

defineProps<{ meta: Meta; current: string; aboutSite: AboutSite }>();
</script>

<template>
  <section class="section about-site" id="about-site" aria-labelledby="about-site-heading">
    <div class="container">
      <h2 class="section-heading" id="about-site-heading">About This Site</h2>
      <p class="about-site-intro">{{ aboutSite.intro }}</p>
      <div class="build-pillars">
        <div v-for="pillar in aboutSite.pillars" :key="pillar.title" class="pillar-card">
          <div class="pillar-icon">{{ pillar.icon }}</div>
          <div class="pillar-title">{{ pillar.title }}</div>
          <p class="pillar-desc">{{ pillar.description }}</p>
          <div class="pillar-tags">
            <span v-for="tag in pillar.tags" :key="tag" class="pillar-tag">{{ tag }}</span>
          </div>
        </div>
      </div>
      <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:0.75rem;">
        You are currently viewing the <strong>{{ meta.frameworkLabels[current] }}</strong> version. Switch between implementations:
      </p>
      <FrameworkSwitcher :meta="meta" :current="current" size="large" />
    </div>
  </section>
</template>
