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
          <span class="text-slate-900 dark:text-white font-medium">Mercados Globais</span>
        </nav>

        <!-- Header -->
        <div class="sgfm-rise">
          <div
            class="font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full sgfm-glass text-xs text-slate-700 dark:text-slate-300 mb-4 sm:mb-5"
          >
            <span class="sgfm-ticker-dot"></span>
            Notícias em tempo real
          </div>
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]"
          >
            <span class="sgfm-gradient-text">Mercados Globais</span>
          </h1>
          <p
            class="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Acompanhe as principais manchetes de economia e mercados globais, agregadas de fontes
            fiáveis e actualizadas em tempo real.
          </p>
        </div>

        <div class="mt-8 sm:mt-10 sgfm-rise delay-2">
          <NewsFeed />
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
import NewsFeed from '@/components/observatorio/NewsFeed.vue'
</script>
