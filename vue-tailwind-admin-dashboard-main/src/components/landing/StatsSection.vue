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
            Menos burocracia, <span class="sgfm-gradient-text">mais controlo</span>
          </h2>
          <p
            class="mt-5 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl sgfm-rise delay-2"
          >
            Sem formulários em papel, sem assinaturas pelos corredores e sem recibos perdidos. Cada
            pedido fica rápido de aprovar e fácil de auditar.
          </p>

          <div ref="statsGridRef" class="grid grid-cols-2 gap-4 mt-10">
            <CardGlass
              v-for="(s, i) in stats"
              :key="s.label"
              v-reveal="{ delay: i * 120 }"
              hover
              class="p-5"
            >
              <div class="flex items-center justify-between gap-2 mb-3">
                <div
                  :class="['h-10 w-10 shrink-0 rounded-lg flex items-center justify-center', s.iconBg]"
                  v-html="s.icon"
                ></div>
                <span
                  class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 truncate"
                >
                  {{ s.chip }}
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

        <div ref="cycleRef" class="relative sgfm-rise delay-2 h-full">
          <div
            class="absolute -bottom-4 right-6 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-white text-xs font-semibold shadow-[0_10px_25px_-8px_rgba(99,102,241,0.6)] flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 1L3 11h6l-1 8 8-10h-6l1-8z" />
            </svg>
            De dias para minutos
          </div>

          <CardGlass class="p-6 relative h-full">
            <div class="h-full flex flex-col">
              <div class="flex items-start justify-between gap-4 mb-6">
                <div class="min-w-0">
                  <div class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Ciclo de um pedido
                  </div>
                  <div
                    :key="mode"
                    :class="[
                      'swap-in mt-1 text-2xl sm:text-3xl font-bold tabular-nums',
                      current.ok ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-300',
                    ]"
                  >
                    {{ current.total }}
                  </div>
                  <div class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    do pedido ao comprovativo
                  </div>
                </div>
                <div
                  class="flex shrink-0 gap-1 p-1 rounded-lg bg-slate-100/70 dark:bg-white/5"
                  role="group"
                  aria-label="Comparar processo"
                >
                  <button
                    v-for="k in modeKeys"
                    :key="k"
                    type="button"
                    :aria-pressed="mode === k"
                    @click="setMode(k)"
                    :class="[
                      'text-xs px-2.5 py-1 rounded-md font-medium transition whitespace-nowrap',
                      mode === k
                        ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white',
                    ]"
                  >
                    {{ modes[k].label }}
                  </button>
                </div>
              </div>

              <ol class="flex-1 flex flex-col justify-between gap-4">
                <li v-for="(s, i) in current.steps" :key="i">
                  <div class="flex items-center gap-3">
                    <span
                      :class="[
                        'h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-xs font-bold tabular-nums transition-colors duration-500',
                        current.dotClass,
                      ]"
                    >
                      0{{ i + 1 }}
                    </span>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-baseline justify-between gap-3">
                        <span
                          :key="mode + s.title"
                          class="swap-in text-sm font-medium text-slate-800 dark:text-slate-100 truncate"
                        >
                          {{ s.title }}
                        </span>
                        <span
                          :key="mode + s.time"
                          :class="['swap-in text-sm font-semibold tabular-nums shrink-0', current.timeClass]"
                        >
                          {{ s.time }}
                        </span>
                      </div>
                      <div
                        :key="mode + s.desc"
                        class="swap-in text-xs text-slate-500 dark:text-slate-400 truncate"
                      >
                        {{ s.desc }}
                      </div>
                    </div>
                  </div>
                  <div class="mt-2 ml-11 h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                    <div
                      :class="['cycle-bar h-full rounded-full bg-gradient-to-r', current.barClass]"
                      :style="{ width: `${barWidth(s.minutes)}%`, transitionDelay: `${i * 90}ms` }"
                    ></div>
                  </div>
                </li>
              </ol>

              <div
                class="mt-6 pt-5 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap gap-2"
              >
                <span
                  v-for="t in current.tags"
                  :key="mode + t"
                  :class="[
                    'swap-in inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full',
                    current.ok
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300',
                  ]"
                >
                  <svg v-if="current.ok" width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M5.4 4L4 5.4 8.6 10 4 14.6 5.4 16l4.6-4.6 4.6 4.6 1.4-1.4-4.6-4.6L16 5.4 14.6 4 10 8.6z"
                    />
                  </svg>
                  {{ t }}
                </span>
              </div>
            </div>
          </CardGlass>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import { vReveal } from '@/composables/landingEffects'

type ModeKey = 'paper' | 'sgfm'

interface Step {
  title: string
  desc: string
  time: string
  minutes: number
}

interface Mode {
  label: string
  total: string
  ok: boolean
  barClass: string
  timeClass: string
  dotClass: string
  steps: Step[]
  tags: string[]
}

// Barras em escala logarítmica: minutos e dias no mesmo gráfico sem que os minutos desapareçam
const MAX_MINUTES = 2880
const barWidth = (min: number) =>
  Math.max(4, Math.round((Math.log10(min + 1) / Math.log10(MAX_MINUTES + 1)) * 100))

const modes: Record<ModeKey, Mode> = {
  paper: {
    label: 'Em papel',
    total: '≈ 3 dias',
    ok: false,
    barClass: 'from-rose-400 to-amber-400',
    timeClass: 'text-rose-600 dark:text-rose-300',
    dotClass: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    steps: [
      { title: 'Preencher requisição', desc: 'Formulário em papel', time: '4 h', minutes: 240 },
      { title: 'Recolher assinaturas', desc: 'Gestor e Financeiro', time: '1–2 dias', minutes: 2160 },
      { title: 'Levantar o valor', desc: 'Deslocação à caixa', time: '3 h', minutes: 180 },
      { title: 'Entregar recibos', desc: 'Arquivo manual', time: '1 dia', minutes: 1440 },
    ],
    tags: ['Papel', 'Deslocações', 'Recibos perdidos'],
  },
  sgfm: {
    label: 'Com SGFM',
    total: '≈ 5 min',
    ok: true,
    barClass: 'from-sky-500 via-indigo-500 to-violet-500',
    timeClass: 'text-sky-600 dark:text-cyan-300',
    dotClass: 'bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-300',
    steps: [
      { title: 'Enviar pedido', desc: 'Via WhatsApp ou painel', time: '1 min', minutes: 1 },
      { title: 'Aprovar', desc: 'Notificação no telemóvel', time: '3 min', minutes: 3 },
      { title: 'Receber o valor', desc: 'Envio directo ao colaborador', time: 'segundos', minutes: 0.2 },
      { title: 'Enviar comprovativo', desc: 'Foto do recibo', time: '1 min', minutes: 1 },
    ],
    tags: ['Sem papel', 'Sem deslocações', 'Auditável'],
  },
}

const modeKeys: ModeKey[] = ['paper', 'sgfm']
const mode = ref<ModeKey>('paper')
const current = computed(() => modes[mode.value])
let touched = false

function setMode(k: ModeKey) {
  touched = true
  mode.value = k
}

const approvalMin = ref(60)
const traceable = ref(0)
const paperForms = ref(40)

const statsGridRef = ref<HTMLElement | null>(null)
const cycleRef = ref<HTMLElement | null>(null)
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tween(setter: (v: number) => void, from: number, to: number, duration = 1600) {
  if (prefersReducedMotion) {
    setter(to)
    return
  }
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 3)
    setter(from + (to - from) * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

let obs: IntersectionObserver | null = null
let autoSwitch: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        if (entry.target === statsGridRef.value) {
          tween((v) => (approvalMin.value = v), 60, 5)
          tween((v) => (traceable.value = v), 0, 100)
          tween((v) => (paperForms.value = v), 40, 0)
        } else if (entry.target === cycleRef.value) {
          // Mostra primeiro o processo em papel e depois a diferença com o SGFM
          autoSwitch = setTimeout(() => {
            if (!touched) mode.value = 'sgfm'
          }, 1400)
        }
        obs?.unobserve(entry.target)
      }
    },
    { threshold: 0.3 },
  )
  if (statsGridRef.value) obs.observe(statsGridRef.value)
  if (cycleRef.value) obs.observe(cycleRef.value)
})

onUnmounted(() => {
  obs?.disconnect()
  clearTimeout(autoSwitch)
})

const stats = computed(() => [
  {
    label: 'Tempo médio de aprovação',
    display: `< ${Math.round(approvalMin.value)} min`,
    chip: 'vs. 2–3 dias',
    iconBg: 'bg-sky-100 dark:bg-cyan-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#0ea5e9"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.8 4v3.7l3 1.8-.8 1.3-3.8-2.3V6h1.6z"/></svg>',
  },
  {
    label: 'Pedidos rastreáveis',
    display: `${Math.round(traceable.value)}%`,
    chip: 'Trilha completa',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#10b981"><path d="M10 2l6.5 2.5v5c0 4-2.8 7.4-6.5 8.5-3.7-1.1-6.5-4.5-6.5-8.5v-5L10 2zm-1 10.4l4.7-4.7-1.1-1.1L9 10.2 7.4 8.6l-1.1 1.1L9 12.4z"/></svg>',
  },
  {
    label: 'Formulários em papel',
    display: `${Math.round(paperForms.value)}`,
    chip: '100% digital',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#8b5cf6"><path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1zm6 1.5V7h3.5L11 3.5zM6.5 10h7v1.2h-7V10zm0 2.5h7v1.2h-7v-1.2zm0 2.5h4.5v1.2H6.5V15z"/></svg>',
  },
  {
    label: 'Pedidos via WhatsApp',
    display: '24/7',
    chip: 'Sempre disponível',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    icon: '<svg width="18" height="18" viewBox="0 0 20 20" fill="#6366f1"><path d="M10 2.5c-4.4 0-8 3.1-8 7 0 1.9.9 3.7 2.4 4.9L4 17.5l3.6-1.6c.8.2 1.6.4 2.4.4 4.4 0 8-3.1 8-7s-3.6-6.8-8-6.8z"/></svg>',
  },
])
</script>

<style scoped>
.cycle-bar {
  transition: width 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.swap-in {
  animation: swap-in 0.4s ease both;
}
@keyframes swap-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cycle-bar {
    transition: none;
  }
  .swap-in {
    animation: none;
  }
}
</style>
