<script setup lang="ts">
import type { Education } from '../types';
defineProps<{ education: Education[] }>();
</script>

<template>
  <section class="section" id="education" aria-labelledby="education-heading">
    <div class="container">
      <h2 class="section-heading" id="education-heading">Education</h2>
      <div class="education-list">
        <div v-for="edu in education" :key="edu.institution" class="education-item">
          <div>
            <div class="education-institution">{{ edu.institution }}</div>
            <div class="education-credential">{{ edu.credential }}</div>
          </div>
          <div class="education-dates">{{ edu.start }} – {{ edu.end }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
