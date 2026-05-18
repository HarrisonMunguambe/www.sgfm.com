<template>
  <div class="sgfm-surface relative min-h-screen">
    <LandingNavbar />

    <main v-if="insight" class="relative pt-24 sm:pt-28 pb-16 sm:pb-20">
      <div class="absolute inset-0 sgfm-grid-bg pointer-events-none"></div>
      <div
        class="absolute top-10 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-20 bg-sky-300 dark:bg-cyan-500 dark:opacity-15 sgfm-float"
      ></div>

      <article class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            class="hover:text-sky-600 dark:hover:text-cyan-300 transition truncate max-w-[150px] sm:max-w-none"
          >
            Observatório
          </router-link>
          <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 4l6 6-6 6V4z" />
          </svg>
          <span class="text-slate-900 dark:text-white font-medium">
            {{ insight.category }}
          </span>
        </nav>

        <!-- Header -->
        <header class="sgfm-rise">
          <div class="flex items-center gap-x-3 gap-y-2 flex-wrap mb-4 sm:mb-5">
            <span
              :class="[
                'text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border',
                categoryBadge(insight.category),
              ]"
            >
              {{ insight.tag }}
            </span>
            <span class="text-xs text-slate-500 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 3a1 1 0 011 1v4.6l3 1.7-1 1.7-4-2.3V6a1 1 0 011-1z"
                />
              </svg>
              {{ insight.readMinutes }} min
            </span>
            <span class="text-xs text-slate-500 hidden sm:inline">• {{ insight.source }}</span>
            <span class="text-xs text-slate-500 hidden sm:inline">• {{ insight.time }}</span>
          </div>

          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]"
          >
            {{ insight.title }}
          </h1>
          <p
            class="mt-4 sm:mt-5 max-w-3xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            {{ insight.snippet }}
          </p>
          <!-- Source + time on mobile -->
          <div class="mt-3 flex items-center gap-2 text-xs text-slate-500 sm:hidden">
            <span>{{ insight.source }}</span>
            <span>•</span>
            <span>{{ insight.time }}</span>
          </div>
        </header>

        <!-- KPIs -->
        <div
          class="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sgfm-rise delay-1"
        >
          <div
            v-for="k in insight.kpis"
            :key="k.label"
            class="sgfm-glass rounded-xl p-4 sm:p-5 min-w-0"
          >
            <div class="text-[10px] uppercase tracking-widest text-slate-500 truncate">
              {{ k.label }}
            </div>
            <div class="mt-1 flex items-baseline gap-2 flex-wrap">
              <span
                class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tabular-nums"
              >
                {{ k.value }}
              </span>
              <span
                :class="[
                  'text-[11px] font-medium inline-flex items-center gap-0.5',
                  k.trend === 'up'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : k.trend === 'down'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-500',
                ]"
              >
                <svg
                  v-if="k.trend === 'up'"
                  width="11"
                  height="11"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 4l6 8H4z" />
                </svg>
                <svg
                  v-else-if="k.trend === 'down'"
                  width="11"
                  height="11"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 16L4 8h12z" />
                </svg>
                {{ k.delta }}
              </span>
            </div>
          </div>
        </div>

        <!-- Body -->
        <section class="mt-10 sm:mt-12 prose-like max-w-3xl sgfm-rise delay-2">
          <p
            v-for="(p, i) in insight.body"
            :key="i"
            class="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base mb-4 sm:mb-5"
          >
            {{ p }}
          </p>
        </section>

        <!-- Charts -->
        <section class="mt-10 sm:mt-12">
          <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-5">
            Dados que suportam a análise
          </h2>
          <div class="grid lg:grid-cols-2 gap-4 sm:gap-5">
            <InsightChart
              v-for="(c, i) in insight.charts"
              :key="i"
              :chart="c"
              class="sgfm-rise"
              :class="`delay-${(i % 4) + 1}`"
            />
          </div>
        </section>

        <!-- Recommendations -->
        <section class="mt-10 sm:mt-12">
          <div class="sgfm-glass rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden">
            <div
              class="absolute -top-10 -right-10 w-36 sm:w-48 h-36 sm:h-48 rounded-full blur-3xl opacity-30 bg-sky-300 dark:bg-cyan-500 dark:opacity-20 pointer-events-none"
            ></div>
            <div class="relative">
              <div class="flex items-center gap-3 mb-4 sm:mb-5">
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)] shrink-0"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2L7.5 7l-5.5.8 4 3.9-1 5.5L10 14.8 15 17.2l-1-5.5 4-3.9L12.5 7z"
                    />
                  </svg>
                </div>
                <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  O que recomendamos
                </h2>
              </div>
              <ul class="space-y-3">
                <li
                  v-for="(r, i) in insight.recommendations"
                  :key="i"
                  class="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300"
                >
                  <span
                    class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 shrink-0 text-xs font-bold"
                  >
                    {{ i + 1 }}
                  </span>
                  <span>{{ r }}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- CTA -->
        <section class="mt-10 sm:mt-12">
          <div
            class="rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden sgfm-brand-panel text-white"
          >
            <div class="relative max-w-2xl">
              <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                Aplique estas recomendações no seu SGFM
              </h3>
              <p class="mt-3 text-sm sm:text-base text-slate-200/90">
                Todas as análises deste Observatório assentam em dados agregados e anonimizados.
                Crie uma conta e comece a extrair as suas próprias análises da sua organização.
              </p>
              <div class="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <router-link
                  to="/register"
                  class="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-50 transition"
                >
                  Começar agora
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
                  </svg>
                </router-link>
                <router-link
                  to="/observatorio"
                  class="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-medium text-white border border-white/25 hover:bg-white/10 transition"
                >
                  Ver mais análises
                </router-link>
              </div>
            </div>
          </div>
        </section>

        <!-- Related -->
        <section v-if="related.length" class="mt-12 sm:mt-16">
          <div class="flex items-center justify-between gap-3 mb-4 sm:mb-5 flex-wrap">
            <h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Análises relacionadas
            </h2>
            <router-link
              to="/observatorio"
              class="text-xs sm:text-sm text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              Ver todas →
            </router-link>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <router-link
              v-for="r in related"
              :key="r.id"
              :to="`/observatorio/analise/${r.slug}`"
              class="block group"
            >
              <div
                class="sgfm-glass rounded-xl p-4 sm:p-5 h-full flex flex-col hover:-translate-y-1 transition-transform"
              >
                <span
                  :class="[
                    'self-start text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border',
                    categoryBadge(r.category),
                  ]"
                >
                  {{ r.tag }}
                </span>
                <h4
                  class="mt-3 text-sm font-semibold text-slate-900 dark:text-white line-clamp-2"
                >
                  {{ r.title }}
                </h4>
                <span
                  class="mt-auto pt-3 text-xs text-sky-600 dark:text-cyan-300 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Ler
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 4l6 6-6 6V4z" />
                  </svg>
                </span>
              </div>
            </router-link>
          </div>
        </section>
      </article>
    </main>

    <!-- Not found -->
    <main v-else class="relative pt-32 pb-20">
      <div class="max-w-3xl mx-auto px-4 text-center">
        <div class="text-6xl font-extrabold sgfm-gradient-text">404</div>
        <h1 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Análise não encontrada
        </h1>
        <p class="mt-3 text-slate-600 dark:text-slate-400">
          A análise que procura pode ter sido arquivada ou o endereço está incorreto.
        </p>
        <router-link
          to="/observatorio"
          class="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600 font-medium shadow-[0_10px_25px_-10px_rgba(79,70,229,0.55)]"
        >
          Voltar ao Observatório
        </router-link>
      </div>
    </main>

    <LandingFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import BackToTop from '@/components/landing/BackToTop.vue'
import InsightChart from '@/components/observatorio/InsightChart.vue'
import { MOCK_INSIGHTS, type Insight } from '@/services/mockData'

const route = useRoute()

const insight = computed<Insight | undefined>(() =>
  MOCK_INSIGHTS.find((i) => i.slug === route.params.slug),
)

const related = computed<Insight[]>(() => {
  if (!insight.value) return []
  return MOCK_INSIGHTS.filter(
    (i) => i.id !== insight.value!.id && i.category === insight.value!.category,
  )
    .concat(MOCK_INSIGHTS.filter((i) => i.id !== insight.value!.id))
    .filter((v, i, a) => a.findIndex((x) => x.id === v.id) === i)
    .slice(0, 3)
})

// Scroll to top when slug changes
watch(
  () => route.params.slug,
  () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }),
)

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

<style scoped>
@media (min-width: 640px) {
  .prose-like p:first-of-type::first-letter {
    font-size: 3.2rem;
    line-height: 1;
    float: left;
    padding: 0.25rem 0.75rem 0 0;
    font-weight: 700;
    background: linear-gradient(120deg, #0ea5e9, #6366f1, #8b5cf6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}
</style>
