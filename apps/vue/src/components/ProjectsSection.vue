<script setup lang="ts">
import type { Project } from '../types';
defineProps<{ projects: Project[] }>();
</script>

<template>
  <section class="section" id="projects" aria-labelledby="projects-heading">
    <div class="container">
      <h2 class="section-heading" id="projects-heading">Projects</h2>
      <div class="projects-grid">
        <article v-for="project in projects" :key="project.name" class="project-card">
          <div class="project-card-header">
            <span class="project-name">{{ project.name }}</span>
            <span class="project-date">{{ project.date }}</span>
          </div>
          <a
            v-if="project.url"
            :href="project.url"
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >↗ Visit</a>
          <ul class="project-bullets">
            <li v-for="(bullet, i) in project.bullets" :key="i">{{ bullet }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
