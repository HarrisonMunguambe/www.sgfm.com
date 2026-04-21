<template>
  <section id="choice" class="relative py-24">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
          Pronto?
        </p>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Escolha como quer entrar no <span class="sgfm-gradient-text">SGFM</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <router-link to="/login" class="block group">
          <CardGlass
            hover
            class="p-8 h-full transition-transform group-hover:-translate-y-1 sgfm-rise delay-1"
          >
            <div
              class="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-300 flex items-center justify-center mb-5 sgfm-neon-cyan"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a4 4 0 100 8 4 4 0 000-8zm0 10c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Já tenho conta</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Entre com o seu email ou telefone e palavra-passe. Suportamos login social com Google.
            </p>
            <div
              class="mt-6 inline-flex items-center gap-2 text-sky-600 dark:text-cyan-300 text-sm font-medium group-hover:gap-3 transition-all"
            >
              Entrar
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
              </svg>
            </div>
          </CardGlass>
        </router-link>

        <router-link to="/register" class="block group">
          <CardGlass
            glow
            hover
            class="p-8 h-full transition-transform group-hover:-translate-y-1 sgfm-rise delay-2"
          >
            <div
              class="h-12 w-12 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 flex items-center justify-center mb-5 sgfm-neon-violet"
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Criar conta</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Registo em 3 passos rápidos com verificação por OTP. A sua organização estará ativa em
              menos de 2 minutos.
            </p>
            <div
              class="mt-6 inline-flex items-center gap-2 text-violet-600 dark:text-violet-300 text-sm font-medium group-hover:gap-3 transition-all"
            >
              Começar registo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
              </svg>
            </div>
          </CardGlass>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardGlass from '@/components/neon/CardGlass.vue'
</script>
