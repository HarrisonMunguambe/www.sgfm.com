<template>
  <CardGlass hover class="relative overflow-hidden p-5 group transition-transform hover:-translate-y-0.5 sgfm-rise">
    <!-- Glow no canto consoante o accent -->
    <div
      class="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
      :class="glowClass"
    ></div>

    <div class="relative">
      <div class="flex items-center justify-between mb-3">
        <div
          class="h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-[0_6px_18px_-8px_rgba(79,70,229,0.55)]"
          :class="iconBgClass"
        >
          <i :class="`pi ${icon}`" style="font-size: 1rem"></i>
        </div>
        <span
          v-if="trend"
          :class="[
            'inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full',
            trendClass,
          ]"
        >
          <i :class="trendIcon" style="font-size: 0.6rem"></i>
          {{ trend.label }}
        </span>
      </div>

      <p class="text-xs text-slate-500 dark:text-slate-400 font-medium">{{ label }}</p>
      <p class="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
        {{ value }}
      </p>
      <p v-if="hint" class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ hint }}</p>
    </div>
  </CardGlass>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'

interface Trend {
  direction: 'up' | 'down' | 'flat'
  label: string
}

const props = defineProps<{
  label: string
  value: string
  hint?: string
  icon: string
  accent?: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose'
  trend?: Trend
}>()

const iconBgClass = computed(() => {
  switch (props.accent) {
    case 'violet':
      return 'bg-gradient-to-br from-violet-500 to-purple-600'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-500 to-teal-600'
    case 'amber':
      return 'bg-gradient-to-br from-amber-500 to-orange-600'
    case 'rose':
      return 'bg-gradient-to-br from-rose-500 to-pink-600'
    case 'sky':
    default:
      return 'bg-gradient-to-br from-sky-500 to-indigo-600'
  }
})

const glowClass = computed(() => {
  switch (props.accent) {
    case 'violet':
      return 'bg-gradient-to-br from-violet-400 to-purple-500'
    case 'emerald':
      return 'bg-gradient-to-br from-emerald-400 to-teal-500'
    case 'amber':
      return 'bg-gradient-to-br from-amber-400 to-orange-500'
    case 'rose':
      return 'bg-gradient-to-br from-rose-400 to-pink-500'
    case 'sky':
    default:
      return 'bg-gradient-to-br from-sky-400 to-indigo-500'
  }
})

const trendClass = computed(() => {
  if (!props.trend) return ''
  switch (props.trend.direction) {
    case 'up':
      return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
    case 'down':
      return 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
    case 'flat':
      return 'bg-slate-500/15 text-slate-600 dark:text-slate-300'
  }
  return ''
})

const trendIcon = computed(() => {
  if (!props.trend) return ''
  switch (props.trend.direction) {
    case 'up':
      return 'pi pi-arrow-up'
    case 'down':
      return 'pi pi-arrow-down'
    case 'flat':
      return 'pi pi-minus'
  }
  return ''
})
</script>
