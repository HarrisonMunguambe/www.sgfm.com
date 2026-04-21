<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium tracking-wide',
      'transition-all duration-300 overflow-hidden select-none',
      variantClasses,
      block ? 'w-full' : '',
      disabled || loading ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.98]',
    ]"
  >
    <span v-if="loading" class="absolute inset-0 flex items-center justify-center">
      <span class="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
    </span>
    <span :class="loading ? 'opacity-0' : 'inline-flex items-center gap-2'">
      <slot name="icon" />
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    type?: 'button' | 'submit' | 'reset'
    loading?: boolean
    disabled?: boolean
    block?: boolean
  }>(),
  { variant: 'primary', type: 'button' },
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 hover:border-sky-300 dark:text-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10'
    case 'ghost':
      return 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/5'
    case 'danger':
      return 'text-white bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_10px_25px_-10px_rgba(239,68,68,0.55)]'
    case 'primary':
    default:
      return 'text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 shadow-[0_10px_25px_-10px_rgba(79,70,229,0.55)] hover:shadow-[0_12px_30px_-8px_rgba(139,92,246,0.65)] hover:-translate-y-0.5'
  }
})
</script>
