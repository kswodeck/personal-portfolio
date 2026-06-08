<script setup lang="ts">
defineProps<{ summary: string }>();
</script>

<template>
  <section class="section" id="about" aria-labelledby="about-heading">
    <div class="container">
      <h2 class="section-heading" id="about-heading">About</h2>
      <p>{{ summary }}</p>
    </div>
  </section>
</template>
