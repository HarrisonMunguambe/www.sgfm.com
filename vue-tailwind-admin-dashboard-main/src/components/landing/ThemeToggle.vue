<template>
  <button
    @click="toggleTheme"
    :title="isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
    :aria-label="isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group overflow-hidden bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-cyan-400/50"
  >
    <span
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-sky-400/20 to-violet-400/20 dark:from-cyan-400/20 dark:to-violet-500/20"
    ></span>

    <!-- Sun icon (visible in light mode) -->
    <svg
      class="absolute h-5 w-5 text-amber-500 transition-all duration-500"
      :class="
        isDarkMode
          ? 'opacity-0 rotate-90 scale-0'
          : 'opacity-100 rotate-0 scale-100'
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>

    <!-- Moon icon (visible in dark mode) -->
    <svg
      class="absolute h-5 w-5 text-indigo-300 transition-all duration-500"
      :class="
        isDarkMode
          ? 'opacity-100 rotate-0 scale-100'
          : 'opacity-0 -rotate-90 scale-0'
      "
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/components/layout/ThemeProvider.vue'
import type { ComputedRef } from 'vue'

const { isDarkMode, toggleTheme } = useTheme() as {
  isDarkMode: ComputedRef<boolean>
  toggleTheme: () => void
}
</script>
