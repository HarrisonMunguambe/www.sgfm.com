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
          <span class="text-slate-900 dark:text-white font-medium">Observatório Financeiro</span>
        </nav>

        <!-- Header -->
        <div class="sgfm-rise">
          <div
            class="font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full sgfm-glass text-xs text-slate-700 dark:text-slate-300 mb-4 sm:mb-5"
          >
            <span class="sgfm-ticker-dot"></span>
            Análises geradas usando Inteligência Artificial
          </div>
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
          >
            Observatório <span class="sgfm-gradient-text">Financeiro</span>
          </h1>
          <p
            class="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Escolhe a tua perspectiva: análises da tua organização com base nos dados do SGFM, ou
            notícias financeiras globais em português, agregadas de fontes verificadas.
          </p>
        </div>

        <!-- Two big cards -->
        <div class="mt-10 sm:mt-14 grid md:grid-cols-2 gap-5 sm:gap-7">
          <!-- Card 1: Empresa -->
          <router-link to="/observatorio/empresa" class="block group sgfm-rise delay-1">
            <CardGlass
              hover
              class="relative h-full p-7 sm:p-9 flex flex-col overflow-hidden transition-transform group-hover:-translate-y-1"
            >
              <div
                class="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-sky-400 to-indigo-500 group-hover:opacity-50 transition-opacity"
              ></div>

              <div class="relative">
                <div
                  class="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)]"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4 3h2v11h-2V10zm4-7h2v18h-2V3zm4 9h2v9h-2v-9z"
                    />
                  </svg>
                </div>

                <span
                  class="ml-3 inline-flex items-center gap-1 align-middle text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border bg-sky-500/10 text-sky-700 border-sky-300/60 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-400/30"
                >
                  Dados internos
                </span>

                <h2
                  class="mt-6 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight"
                >
                  A minha empresa
                </h2>
                <p
                  class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  Previsões, benchmarks sectoriais, recomendações e alertas gerados a partir dos
                  movimentos do teu fundo de maneio agradado ao SGFM.
                </p>

                <ul class="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-sky-500 dark:text-cyan-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Previsões e recomendações IA
                  </li>
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-sky-500 dark:text-cyan-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Benchmarks por sector
                  </li>
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-sky-500 dark:text-cyan-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Alertas e oportunidades
                  </li>
                </ul>

                <div class="mt-7">
                  <span
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_10px_25px_-10px_rgba(79,70,229,0.7)] hover:shadow-[0_15px_30px_-10px_rgba(79,70,229,0.85)] group-hover:gap-3 group-hover:from-sky-600 group-hover:to-indigo-700 transition-all"
                  >
                    Explorar análises da empresa
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 4l6 6-6 6V4z" />
                    </svg>
                  </span>
                </div>
              </div>
            </CardGlass>
          </router-link>

          <!-- Card 2: Global -->
          <router-link to="/observatorio/global" class="block group sgfm-rise delay-2">
            <CardGlass
              hover
              class="relative h-full p-7 sm:p-9 flex flex-col overflow-hidden transition-transform group-hover:-translate-y-1"
            >
              <div
                class="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30 bg-gradient-to-br from-violet-400 to-rose-500 group-hover:opacity-50 transition-opacity"
              ></div>

              <div class="relative">
                <div
                  class="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-rose-500 text-white shadow-[0_10px_30px_-10px_rgba(244,63,94,0.55)]"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 9h-3a15.6 15.6 0 00-1.1-5.2A8 8 0 0118.9 11zm-6.9 9c-1 0-2.2-2.3-2.8-6h5.6c-.6 3.7-1.8 6-2.8 6zm-2.9-8c.6-3.7 1.8-6 2.9-6s2.3 2.3 2.9 6H9.1zM9.2 5.8A15.6 15.6 0 008.1 11h-3a8 8 0 014.1-5.2zM5.1 13h3a15.6 15.6 0 001.1 5.2A8 8 0 015.1 13zm9.7 5.2A15.6 15.6 0 0015.9 13h3a8 8 0 01-4.1 5.2z"
                    />
                  </svg>
                </div>

                <span
                  class="ml-3 inline-flex items-center gap-1.5 align-middle text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border bg-rose-500/10 text-rose-700 border-rose-300/60 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-400/30"
                >
                  <span class="sgfm-ticker-dot"></span>
                  Notícias ao vivo
                </span>

                <h2
                  class="mt-6 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight"
                >
                  Mercados globais
                </h2>
                <p
                  class="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  Manchetes de economia e negócios, agregadas em tempo real de fontes verificadas.
                </p>

                <ul class="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-rose-500 dark:text-rose-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Fontes verificadas (categoria negócios)
                  </li>
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-rose-500 dark:text-rose-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Actualizadas continuamente
                  </li>
                  <li class="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="text-rose-500 dark:text-rose-300 shrink-0"
                    >
                      <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
                    </svg>
                    Fontes verificadas Mundialmente
                  </li>
                </ul>

                <div class="mt-7">
                  <span
                    class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-500 to-rose-500 shadow-[0_10px_25px_-10px_rgba(244,63,94,0.7)] hover:shadow-[0_15px_30px_-10px_rgba(244,63,94,0.85)] group-hover:gap-3 group-hover:from-violet-600 group-hover:to-rose-600 transition-all"
                  >
                    Ver notícias globais
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 4l6 6-6 6V4z" />
                    </svg>
                  </span>
                </div>
              </div>
            </CardGlass>
          </router-link>
        </div>
      </div>
    </main>

    <LandingFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import BackToTop from '@/components/landing/BackToTop.vue'
import CardGlass from '@/components/neon/CardGlass.vue'
</script>
