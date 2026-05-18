<template>
  <div class="sgfm-surface relative min-h-screen">
    <LandingNavbar />

    <main class="relative pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
      <div class="absolute inset-0 sgfm-grid-bg pointer-events-none"></div>
      <div
        class="absolute top-10 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-sky-300 dark:bg-cyan-500 dark:opacity-20 sgfm-float"
      ></div>
      <div
        class="absolute bottom-0 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-violet-300 dark:bg-violet-500 dark:opacity-20 sgfm-float"
        style="animation-delay: 1.5s"
      ></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav
          class="mb-5 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex-wrap"
        >
          <router-link to="/" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">
            Início
          </router-link>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 4l6 6-6 6V4z" />
          </svg>
          <router-link
            to="/observatorio"
            class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
          >
            Observatório
          </router-link>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 4l6 6-6 6V4z" />
          </svg>
          <span class="text-slate-900 dark:text-white font-medium">A minha empresa</span>
        </nav>

        <!-- Header -->
        <div class="sgfm-rise">
          <div
            class="font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full sgfm-glass text-xs text-slate-700 dark:text-slate-300 mb-4 sm:mb-5"
          >
            <span class="sgfm-ticker-dot"></span>
            Análises geradas a usando Inteligência Artificial
          </div>
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
          >
            <span class="sgfm-gradient-text">A minha empresa</span>
          </h1>
          <p
            class="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Previsões, benchmarks e recomendações baseadas em dados agregados e anonimizados de
            centenas de organizações moçambicanas que usam o SGFM.
          </p>
        </div>

        <!-- Stats strip -->
        <div class="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 sgfm-rise delay-1">
          <StatPill label="Análises disponíveis" :value="String(insights.length)" />
          <StatPill label="Empresas na rede" value="412" />
          <StatPill label="Setores cobertos" value="9" />
          <StatPill label="Confiança média" value="89%" />
        </div>

        <!-- Filters -->
        <div class="mt-10 sm:mt-12 sgfm-rise delay-2">
          <div
            class="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
          >
            <button
              v-for="c in categories"
              :key="c.value"
              @click="active = c.value"
              :class="[
                'shrink-0 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition border whitespace-nowrap',
                active === c.value
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)]'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-sky-300 dark:hover:border-cyan-400/50',
              ]"
            >
              {{ c.label }}
              <span
                v-if="c.value !== 'all'"
                :class="[
                  'ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded',
                  active === c.value ? 'bg-white/20' : 'bg-slate-100 dark:bg-white/10',
                ]"
              >
                {{ countByCategory(c.value) }}
              </span>
            </button>
          </div>
        </div>

        <!-- Grid -->
        <div class="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <router-link
            v-for="(n, i) in filtered"
            :key="n.id"
            :to="`/observatorio/analise/${n.slug}`"
            class="block group"
          >
            <CardGlass
              hover
              :class="[
                'p-5 sm:p-6 flex flex-col h-full transition-transform group-hover:-translate-y-1 sgfm-rise',
                `delay-${(i % 4) + 1}`,
              ]"
            >
              <div class="flex items-center justify-between gap-2 mb-4 h-6">
                <span
                  :class="[
                    'text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border truncate max-w-[60%]',
                    categoryBadge(n.category),
                  ]"
                >
                  {{ n.tag }}
                </span>
                <span class="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v4.6l3 1.7-1 1.7-4-2.3V6a1 1 0 011-1z"
                    />
                  </svg>
                  {{ n.readMinutes }} min
                </span>
              </div>

              <h3
                class="text-slate-900 dark:text-white font-semibold leading-snug line-clamp-2 min-h-[3rem]"
              >
                {{ n.title }}
              </h3>

              <p
                class="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 min-h-[4.2rem]"
              >
                {{ n.snippet }}
              </p>

              <div
                class="mt-auto pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between gap-2"
              >
                <span class="text-xs text-slate-500 truncate">{{ n.source }}</span>
                <span
                  class="shrink-0 text-xs font-medium text-sky-600 dark:text-cyan-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Ler análise
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 4l6 6-6 6V4z" />
                  </svg>
                </span>
              </div>
            </CardGlass>
          </router-link>
        </div>

        <div v-if="filtered.length === 0" class="mt-12 text-center text-sm text-slate-500">
          Sem análises nesta categoria.
        </div>
      </div>
    </main>

    <LandingFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import BackToTop from '@/components/landing/BackToTop.vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import StatPill from '@/components/observatorio/StatPill.vue'
import { MOCK_INSIGHTS, type Insight } from '@/services/mockData'

const insights = MOCK_INSIGHTS
type CategoryValue = 'all' | Insight['category']

const categories: { value: CategoryValue; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'Previsão', label: 'Previsões' },
  { value: 'Recomendação', label: 'Recomendações' },
  { value: 'Mercado', label: 'Mercado' },
  { value: 'Benchmark', label: 'Benchmarks' },
  { value: 'Alerta', label: 'Alertas' },
]

const active = ref<CategoryValue>('all')

const filtered = computed(() =>
  active.value === 'all' ? insights : insights.filter((i) => i.category === active.value),
)

function countByCategory(v: CategoryValue) {
  if (v === 'all') return insights.length
  return insights.filter((i) => i.category === v).length
}

function categoryBadge(c: Insight['category']) {
  switch (c) {
    case 'Previsão':
      return 'bg-sky-500/10 text-sky-700 border-sky-300/60 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-400/30'
    case 'Recomendação':
      return 'bg-violet-500/10 text-violet-700 border-violet-300/60 dark:bg-violet-500/15 dark:text-violet-200 dark:border-violet-400/30'
    case 'Mercado':
      return 'bg-indigo-500/10 text-indigo-700 border-indigo-300/60 dark:bg-indigo-500/15 dark:text-indigo-200 dark:border-indigo-400/30'
    case 'Benchmark':
      return 'bg-emerald-500/10 text-emerald-700 border-emerald-300/60 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30'
    case 'Alerta':
      return 'bg-rose-500/10 text-rose-700 border-rose-300/60 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-400/30'
  }
  return ''
}
</script>
