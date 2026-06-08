<script setup lang="ts">
import type { Meta } from '../types';
import FrameworkSwitcher from './FrameworkSwitcher.vue';

defineProps<{ meta: Meta; current: string }>();
</script>

<template>
  <section class="section about-site" id="about-site" aria-labelledby="about-site-heading">
    <div class="container">
      <h2 class="section-heading" id="about-site-heading">About This Site</h2>
      <p class="about-site-intro">
        This portfolio is built four times — once in each major front-end framework — all reading
        from a single shared <code>content.json</code>. Each implementation lives at its own URL
        path and is a fully independent, standalone build. Switch between them below:
      </p>
      <FrameworkSwitcher :meta="meta" :current="current" size="large" />
    </div>
  </section>
</template>
