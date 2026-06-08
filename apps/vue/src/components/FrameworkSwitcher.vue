<script setup lang="ts">
// `defineProps` declares typed props — no `return` needed with <script setup>;
// everything declared here is automatically available in the template below.
import type { Meta } from '../types';

const props = defineProps<{
  meta: Meta;
  current: string;
  size?: 'small' | 'large';
}>();
</script>

<template>
  <!-- v-bind:class (shorthand :class) sets the CSS class reactively -->
  <nav
    :class="props.size === 'large' ? 'fw-switcher-large' : 'fw-switcher'"
    aria-label="Framework versions"
  >
    <!-- v-for iterates the array; :key is required for Vue's diff algorithm -->
    <template v-for="fw in props.meta.frameworks" :key="fw">
      <!-- v-if / v-else are structural directives that conditionally render -->
      <span v-if="fw === props.current" aria-current="page">
        {{ props.meta.frameworkLabels[fw] }}
      </span>
      <a v-else :href="props.meta.frameworkPaths[fw]">
        {{ props.meta.frameworkLabels[fw] }}
      </a>
    </template>
  </nav>
</template>
