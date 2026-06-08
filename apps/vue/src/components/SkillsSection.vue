<script setup lang="ts">
import type { Skill } from '../types';
defineProps<{ skills: Skill[] }>();
</script>

<template>
  <section class="section" id="skills" aria-labelledby="skills-heading">
    <div class="container">
      <h2 class="section-heading" id="skills-heading">Skills</h2>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.category" class="skill-category">
          <div class="skill-category-name">{{ skill.category }}</div>
          <div class="skill-tags">
            <span v-for="item in skill.items" :key="item" class="skill-tag">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
