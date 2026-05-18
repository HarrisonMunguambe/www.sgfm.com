<template>
  <section id="insights" class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
          Observatório Financeiro
        </p>
        <h2
          class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight sgfm-rise delay-1"
        >
          A tua empresa e o mercado,
          <span class="sgfm-gradient-text">numa só vista</span>
        </h2>
        <p
          class="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed sgfm-rise delay-2"
        >
          Previsões e recomendações geradas pela IA do SGFM a partir dos teus dados internos,
          combinadas com manchetes verificadas de mercados globais.
        </p>
        <div
          class="mt-5 flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap"
        >
          <span class="inline-flex items-center gap-2">
            <span class="sgfm-ticker-dot"></span>
            Atualizado {{ lastUpdate }}
          </span>
          <span class="hidden sm:inline-block h-3 w-px bg-slate-300 dark:bg-white/15"></span>
          <span class="inline-flex items-center gap-1.5">
            <b class="text-slate-700 dark:text-slate-200 font-semibold tabular-nums">{{
              totalInsights
            }}</b>
            análises disponíveis
          </span>
        </div>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <CardGlass
          v-for="(n, i) in news"
          :key="n.id"
          hover
          :class="['p-6 flex flex-col sgfm-rise', `delay-${i + 1}`]"
        >
          <!-- Row 1: tag + time (fixed height) -->
          <div class="flex items-center justify-between mb-4 h-6">
            <span
              class="text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-gradient-to-r from-sky-500/15 to-violet-500/15 text-indigo-700 border border-sky-300/40 dark:from-cyan-500/25 dark:to-violet-500/25 dark:text-cyan-200 dark:border-cyan-400/20"
            >
              {{ n.tag }}
            </span>
            <span class="text-xs text-slate-500">{{ n.time }}</span>
          </div>

          <!-- Row 2: title (fixed 2-line height) -->
          <h3
            class="text-slate-900 dark:text-white font-semibold leading-snug line-clamp-2 min-h-[3rem]"
          >
            {{ n.title }}
          </h3>

          <!-- Row 3: snippet (fixed 3-line height) -->
          <p
            class="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 min-h-[4.2rem]"
          >
            {{ n.snippet }}
          </p>

          <!-- Divider pushes footer to the bottom consistently -->
          <div
            class="mt-5 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between mt-auto"
          >
            <span class="text-xs text-slate-500">{{ n.source }}</span>
            <router-link
              :to="`/observatorio/analise/${n.slug}`"
              class="text-xs font-medium text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200 inline-flex items-center gap-1"
            >
              Ler mais
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 4l6 6-6 6V4z" />
              </svg>
            </router-link>
          </div>
        </CardGlass>
      </div>

      <!-- Prominent centered CTA to explore the full Observatório -->
      <div class="mt-12 sm:mt-14 flex justify-center">
        <router-link
          to="/observatorio"
          class="group inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 shadow-[0_15px_35px_-10px_rgba(79,70,229,0.55)] hover:shadow-[0_18px_40px_-6px_rgba(139,92,246,0.65)] hover:-translate-y-0.5 transition-all"
        >
          Ver todas as análises
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="transition-transform group-hover:translate-x-1"
          >
            <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import { MOCK_AI_NEWS, MOCK_INSIGHTS } from '@/services/mockData'

const news = ref(MOCK_AI_NEWS)
const totalInsights = MOCK_INSIGHTS.length
const lastUpdate = ref('agora')

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  let n = 0
  timer = setInterval(() => {
    n++
    lastUpdate.value = `há ${n} min`
  }, 60_000)
})
onUnmounted(() => timer && clearInterval(timer))
</script>
