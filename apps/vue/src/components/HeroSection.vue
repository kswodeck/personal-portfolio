<script setup lang="ts">
import type { Profile } from '../types';
defineProps<{ profile: Profile }>();
</script>

<template>
  <header class="hero">
    <div class="container">
      <h1 class="hero-name">{{ profile.name }}</h1>
      <p class="hero-title">{{ profile.title }}</p>
      <p class="hero-tagline">{{ profile.tagline }}</p>
      <p class="hero-location">📍 {{ profile.location }}</p>
      <div class="hero-links">
        <a :href="`mailto:${profile.email}`" :aria-label="`Email ${profile.name}`">
          ✉️ {{ profile.email }}
        </a>
        <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
          💼 LinkedIn
        </a>
        <a :href="profile.links.github" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
          🐙 GitHub
        </a>
      </div>
    </div>
  </header>
</template>
