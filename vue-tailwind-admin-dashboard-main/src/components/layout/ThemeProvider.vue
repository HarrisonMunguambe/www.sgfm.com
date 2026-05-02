<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  type Theme,
  applyThemeToDocument,
  getInitialTheme,
  getStoredTheme,
  isTheme,
} from '@/utils/theme'

const theme = ref<Theme>(getInitialTheme())
const isDarkMode = computed(() => theme.value === 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

watch(
  theme,
  (newTheme) => {
    try {
      localStorage.setItem('theme', newTheme)
    } catch {
      // ignore
    }
    applyThemeToDocument(newTheme)
  },
  { immediate: true },
)

function onStorage(e: StorageEvent) {
  if (e.key !== 'theme') return
  const next = isTheme(e.newValue) ? (e.newValue as Theme) : getStoredTheme() ?? theme.value
  if (next !== theme.value) theme.value = next
}

onMounted(() => window.addEventListener('storage', onStorage))
onBeforeUnmount(() => window.removeEventListener('storage', onStorage))

provide('theme', {
  isDarkMode,
  toggleTheme,
})
</script>

<script lang="ts">
import { inject } from 'vue'

export function useTheme() {
  const theme = inject('theme')
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return theme
}
</script>
