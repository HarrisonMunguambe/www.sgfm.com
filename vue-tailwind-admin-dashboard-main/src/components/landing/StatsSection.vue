<template>
  <section id="features" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-1/3 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 bg-sky-300 dark:bg-cyan-500/30 sgfm-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 -right-16 w-96 h-96 rounded-full blur-3xl opacity-20 bg-violet-300 dark:bg-violet-500/20 sgfm-float pointer-events-none"
      style="animation-delay: 2s"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        <div>
          <p
            class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase sgfm-rise"
          >
            Em números
          </p>
          <h2
            class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight sgfm-rise delay-1"
          >
            Dados que <span class="sgfm-gradient-text">falam por si</span>
          </h2>
          <p
            class="mt-5 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl sgfm-rise delay-2"
          >
            Veja a sua empresa em movimento. Cada pedido, aprovação e poupança são actualizados ao
            segundo no seu painel de gestor.
          </p>

          <div class="grid grid-cols-2 gap-4 mt-10">
            <CardGlass
              v-for="(s, i) in stats"
              :key="s.label"
              hover
              :class="['p-5 sgfm-rise', `delay-${Math.min(i + 1, 4)}`]"
            >
              <div class="flex items-center justify-between mb-3">
                <div
                  :class="['h-10 w-10 rounded-lg flex items-center justify-center', s.iconBg]"
                  v-html="s.icon"
                ></div>
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                >
                  {{ s.delta }}
                </span>
              </div>
              <div
                class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight tabular-nums"
              >
                {{ s.display }}
              </div>
              <div class="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {{ s.label }}
              </div>
            </CardGlass>
          </div>
        </div>

        <div class="relative sgfm-rise delay-2 h-full">
          <!-- <div
            class="absolute -top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-lg border border-white/60 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Em directo
          </div> -->

          <div
            class="absolute -bottom-4 right-6 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-white text-xs font-semibold shadow-[0_10px_25px_-8px_rgba(99,102,241,0.6)] flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 14l5-5 4 4 5-7v3h-2.6l-2.4 3.4-4-4L4.4 14z" />
            </svg>
            +12,6% este mês
          </div>

          <CardGlass class="p-6 relative h-full">
            <div class="h-full flex flex-col">
              <div class="flex items-start justify-between mb-5">
                <div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Movimentos · {{ currentBucket.label }}
                  </div>
                  <div
                    class="mt-1 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tabular-nums"
                  >
                    {{ formatMZN(currentBucket.total) }}
                  </div>
                </div>
                <div class="flex gap-1 p-1 rounded-lg bg-slate-100/70 dark:bg-white/5">
                  <button
                    v-for="r in rangeKeys"
                    :key="r"
                    type="button"
                    @click="range = r"
                    :class="[
                      'text-xs px-2.5 py-1 rounded-md font-medium transition',
                      range === r
                        ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white',
                    ]"
                  >
                    {{ r }}
                  </button>
                </div>
              </div>

              <div class="flex-1 min-h-[140px] flex items-stretch">
                <svg viewBox="0 0 400 140" class="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.35" />
                      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
                    </linearGradient>
                    <linearGradient id="chartLine" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stop-color="#0ea5e9" />
                      <stop offset="100%" stop-color="#8b5cf6" />
                    </linearGradient>
                  </defs>
                  <line
                    v-for="y in [35, 70, 105]"
                    :key="y"
                    x1="0"
                    :y1="y"
                    x2="400"
                    :y2="y"
                    stroke="currentColor"
                    stroke-width="0.5"
                    class="text-slate-200 dark:text-white/10"
                    stroke-dasharray="3 4"
                  />
                  <path :d="areaPath" fill="url(#chartGrad)" class="chart-anim" />
                  <path
                    :d="linePath"
                    fill="none"
                    stroke="url(#chartLine)"
                    stroke-width="2.5"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    class="chart-anim"
                  />
                  <circle
                    v-for="(p, i) in chartPoints"
                    :key="i"
                    :cx="p.x"
                    :cy="p.y"
                    :r="i === chartPoints.length - 1 ? 5 : 3"
                    fill="#fff"
                    :stroke="i === chartPoints.length - 1 ? '#8b5cf6' : '#0ea5e9'"
                    stroke-width="2"
                  />
                  <circle
                    :cx="chartPoints[chartPoints.length - 1].x"
                    :cy="chartPoints[chartPoints.length - 1].y"
                    r="5"
                    fill="#8b5cf6"
                    opacity="0.3"
                    class="pulse-dot"
                  />
                </svg>
              </div>

              <div class="mt-5 space-y-2.5">
                <div
                  v-for="(a, i) in activity"
                  :key="i"
                  :class="[
                    'flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/80 dark:bg-white/5 border border-slate-100 dark:border-white/5 sgfm-rise',
                    `delay-${i + 2}`,
                  ]"
                >
                  <div
                    :class="[
                      'h-9 w-9 rounded-full flex items-center justify-center shrink-0',
                      a.iconBg,
                    ]"
                    v-html="a.icon"
                  ></div>
                  <div class="flex-1 min-w-0">
                    <div
                      class="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 truncate"
                    >
                      {{ a.title }}
                    </div>
                    <div class="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                      {{ a.time }}
                    </div>
                  </div>
                  <div
                    :class="[
                      'text-xs sm:text-sm font-semibold tabular-nums shrink-0',
                      a.amountClass,
                    ]"
                  >
                    {{ a.amount }}
                  </div>
                </div>
              </div>
            </div>
          </CardGlass>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'

type RangeKey = 'D' | 'S' | 'M'

interface RangeBucket {
  total: number
  series: number[]
  label: string
}

const range = ref<RangeKey>('S')
const rangeKeys: RangeKey[] = ['D', 'S', 'M']

const buckets: Record<RangeKey, RangeBucket> = {
  D: { total: 48_500, series: [8, 14, 11, 18, 22, 19, 26], label: 'Hoje' },
  S: { total: 295_000, series: [42, 55, 48, 63, 58, 72, 80], label: 'Esta semana' },
  M: { total: 1_250_000, series: [180, 240, 215, 280, 320, 360], label: 'Este mês' },
}

const approved = ref(87)
const savings = ref(12.4)
const users = ref(24)

const currentBucket = computed(() => buckets[range.value])
const totalManaged = computed(() => buckets.M.total)

function formatMZN(n: number) {
  return new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(n) + ' MT'
}

const chartPoints = computed(() => {
  const w = 400
  const h = 140
  const pad = 10
  const values = currentBucket.value.series
  const max = Math.max(...values)
  const min = Math.min(...values)
  const span = Math.max(1, max - min)
  return values.map((v, i) => ({
    x: pad + (i * (w - pad * 2)) / Math.max(1, values.length - 1),
    y: h - pad - ((v - min) / span) * (h - pad * 2),
  }))
})

const linePath = computed(() => {
  const pts = chartPoints.value
  if (!pts.length) return ''
  return pts
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = pts[i - 1]
      const cx = (prev.x + p.x) / 2
      return `Q ${prev.x} ${prev.y} ${cx} ${(prev.y + p.y) / 2} T ${p.x} ${p.y}`
    })
    .join(' ')
})

const areaPath = computed(() => {
  const pts = chartPoints.value
  if (!pts.length) return ''
  return `${linePath.value} L ${pts[pts.length - 1].x} 140 L ${pts[0].x} 140 Z`
})

const activity = [
  {
    title: 'Pedido aprovado · Marketing',
    time: 'há 2 min · via WhatsApp',
    amount: '+ 12 500 MT',
    amountClass: 'text-emerald-600 dark:text-emerald-400',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="#10b981"><path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z"/></svg>',
  },
  {
    title: 'Transferência para colaborador',
    time: 'há 8 min · Logística',
    amount: '+ 4 500 MT',
    amountClass: 'text-sky-600 dark:text-cyan-300',
    iconBg: 'bg-sky-100 dark:bg-cyan-500/20',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="#0ea5e9"><path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z"/></svg>',
  },
  {
    title: 'Relatório IA gerado',
    time: 'há 14 min · automático',
    amount: 'Mensal',
    amountClass: 'text-violet-600 dark:text-violet-300',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="#8b5cf6"><path d="M10 2l2.4 5 5.6.8-4 4 1 5.6L10 14.8 4.9 17.4l1-5.6-4-4L7.6 7z"/></svg>',
  },
]

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

<style scoped>
.chart-anim {
  transition: d 0.8s ease-in-out;
}
.pulse-dot {
  transform-origin: center;
  animation: pulse-grow 1.8s ease-in-out infinite;
}
@keyframes pulse-grow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(2.2);
    opacity: 0;
  }
}
</style>
