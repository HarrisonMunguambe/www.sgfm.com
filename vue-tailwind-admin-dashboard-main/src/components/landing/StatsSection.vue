<template>
  <section id="features" class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">Em números</p>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Dados que falam por si
        </h2>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <CardGlass
          v-for="(s, i) in stats"
          :key="s.label"
          hover
          :class="['p-6 sgfm-rise', `delay-${i + 1}`]"
        >
          <div class="flex items-center justify-between mb-4">
            <div
              :class="[
                'h-10 w-10 rounded-lg flex items-center justify-center',
                s.iconBg,
              ]"
              v-html="s.icon"
            ></div>
            <span
              :class="[
                'text-xs font-medium px-2 py-1 rounded-full',
                s.delta.startsWith('+')
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
              ]"
            >
              {{ s.delta }}
            </span>
          </div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums">
            {{ s.display }}
          </div>
          <div class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ s.label }}</div>
        </CardGlass>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'

const totalManaged = ref(18_450_000)
const approved = ref(1_284)
const savings = ref(12.4)
const users = ref(342)

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  timer = setInterval(() => {
    totalManaged.value += Math.floor(Math.random() * 5000) - 1500
    approved.value += Math.random() > 0.5 ? 1 : 0
    savings.value = +(savings.value + (Math.random() * 0.2 - 0.1)).toFixed(2)
    users.value += Math.random() > 0.7 ? 1 : 0
  }, 2500)
})
onUnmounted(() => timer && clearInterval(timer))

function formatMZN(n: number) {
  return new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(n) + ' MT'
}

const stats = computed(() => [
  {
    label: 'Total gerido este mês',
    display: formatMZN(totalManaged.value),
    delta: '+8,2%',
    iconBg: 'bg-sky-100 dark:bg-cyan-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#0ea5e9"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"/></svg>',
  },
  {
    label: 'Requisições aprovadas',
    display: approved.value.toLocaleString('pt-MZ'),
    delta: '+12,6%',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#10b981"><path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z"/></svg>',
  },
  {
    label: 'Economia média',
    display: savings.value.toFixed(1) + '%',
    delta: '+1,4%',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#8b5cf6"><path d="M3 14l5-5 4 4 5-7v10H3z"/></svg>',
  },
  {
    label: 'Utilizadores activos',
    display: users.value.toLocaleString('pt-MZ'),
    delta: '+3,1%',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#6366f1"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z"/></svg>',
  },
])
</script>
