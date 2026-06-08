<script setup lang="ts">
import type { Profile } from '../types';
defineProps<{ profile: Profile }>();
const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer-inner">
        <span class="footer-copy">© {{ year }} {{ profile.name }}</span>
        <div class="footer-links">
          <a :href="`mailto:${profile.email}`">Email</a>
          <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a :href="profile.links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</template>
