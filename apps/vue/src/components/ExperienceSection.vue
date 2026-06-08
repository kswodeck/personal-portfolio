<script setup lang="ts">
import type { Company } from '../types';
defineProps<{ experience: Company[] }>();
</script>

<template>
  <section class="section" id="experience" aria-labelledby="experience-heading">
    <div class="container">
      <h2 class="section-heading" id="experience-heading">Experience</h2>
      <div v-for="company in experience" :key="company.company" class="experience-company">
        <div class="company-header">
          <span class="company-name">{{ company.company }}</span>
          <span class="company-location">{{ company.location }}</span>
        </div>
        <div v-for="role in company.roles" :key="role.title + role.start" class="role">
          <div class="role-header">
            <span class="role-title">{{ role.title }}</span>
            <span class="role-dates">{{ role.start }} – {{ role.end }}</span>
          </div>
          <ul class="role-bullets">
            <li v-for="(bullet, i) in role.bullets" :key="i">{{ bullet }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
