<template>
  <div class="sgfm-glass rounded-xl px-4 py-3">
    <div class="text-[10px] uppercase tracking-widest text-slate-500">{{ label }}</div>
    <div class="mt-1 text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string }>()
</script>
