<script setup lang="ts">
import { computed } from 'vue';
import type { Meta } from '../types';
import { theme, toggleTheme } from '../composables/useTheme';
import FrameworkSwitcher from './FrameworkSwitcher.vue';

const props = defineProps<{ meta: Meta; current: string }>();

// `computed` derives a value from reactive state and caches it until deps change.
const toggleLabel = computed(() => theme.value === 'dark' ? '☀️' : '🌙');
</script>

<template>
  <div class="topbar" role="banner">
    <div class="container">
      <span class="topbar-left">Built with: {{ props.meta.frameworkLabels[props.current] }}</span>
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <FrameworkSwitcher :meta="props.meta" :current="props.current" size="small" />
        <button
          class="theme-toggle"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`"
          title="Toggle dark mode"
          @click="toggleTheme"
        >
          {{ toggleLabel }}
        </button>
      </div>
    </div>
  </div>
</template>
