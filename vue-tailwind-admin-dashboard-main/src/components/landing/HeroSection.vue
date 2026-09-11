<template>
  <section id="inicio" class="relative pt-32 pb-12 overflow-hidden">
    <div class="absolute inset-0 sgfm-grid-bg pointer-events-none"></div>

    <div
      class="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-40 bg-sky-300 dark:bg-cyan-500 dark:opacity-30 sgfm-float"
    ></div>
    <div
      class="absolute top-32 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 bg-violet-300 dark:bg-violet-500 dark:opacity-20 sgfm-float"
      style="animation-delay: 1.5s"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full sgfm-glass text-xs text-slate-600 dark:text-slate-300 mb-6 sgfm-rise font-semibold"
      >
        <span class="sgfm-ticker-dot"></span>
        Plataforma Inteligente de Gestão Financeira
      </div>

      <h1
        class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.05] sgfm-rise delay-1"
      >
        <span class="sgfm-gradient-text">Órbita</span>
        <br />
        <span>Gestão de Fundo de Maneio</span>
      </h1>

      <div class="mt-6 h-7 sgfm-rise delay-2">
        <span
          :key="current"
          class="sgfm-typewriter text-slate-600 dark:text-slate-300 text-base sm:text-lg"
        >
          {{ current }}
        </span>
      </div>

      <p
        class="mt-6 max-w-xl mx-auto text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed sgfm-rise delay-3"
      >
        Receba pedidos via WhatsApp, SMS, email e painel aprove, em segundos e acompanhe cada
        metical do fundo de maneio em tempo real com relatórios inteligentes e suporte inteligente
        24/7.
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4 sgfm-rise delay-4">
        <button
          v-magnetic="0.35"
          @click="scrollToChoice"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 shadow-[0_15px_35px_-10px_rgba(79,70,229,0.55)] hover:shadow-[0_20px_45px_-8px_rgba(139,92,246,0.7)]"
        >
          Começar agora
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
          </svg>
        </button>

        <router-link
          v-magnetic="0.25"
          to="/login"
          class="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-white border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-white/5 backdrop-blur hover:bg-white hover:border-sky-300 dark:hover:bg-white/10 dark:hover:border-cyan-300/50"
        >
          Já tenho conta
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
          </svg>
        </router-link>
      </div>

      <HeroVisual3D class="mt-12 sm:mt-16 sgfm-rise delay-4" />

      <!-- <div
        class="mt-12 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-500 sgfm-rise delay-4"
      >
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#10b981">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          SSL Bancário
        </div>
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#10b981">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          99,98% de disponibilidade
        </div>
        <div class="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#10b981">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          Conforme os requisitos de auditoria
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { vMagnetic } from '@/composables/landingEffects'
import HeroVisual3D from '@/components/landing/HeroVisual3D.vue'

const phrases = [
  'Maior controle de fluxo de caixa.',
  '100% de controle dos Fundos Financeiros.',
  'Relatórios Automatizados Gerados por Inteligência Artificial.',
]
const current = ref(phrases[0])
let idx = 0
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    idx = (idx + 1) % phrases.length
    current.value = phrases[idx]
  }, 8000)
})
onUnmounted(() => timer && clearInterval(timer))

function scrollToChoice() {
  document.getElementById('choice')?.scrollIntoView({ behavior: 'smooth' })
}
</script>
