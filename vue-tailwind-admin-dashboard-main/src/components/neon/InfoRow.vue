<template>
  <div
    class="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] px-4 py-3"
  >
    <div class="text-[11px] uppercase tracking-widest text-slate-500">{{ label }}</div>
    <div class="mt-0.5 text-sm text-slate-900 dark:text-white font-medium break-words">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label: string; value: string }>()
</script>
