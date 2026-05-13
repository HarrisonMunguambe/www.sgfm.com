<template>
  <section id="choice" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-violet-500/20 pointer-events-none"
    ></div>

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p
          class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase sgfm-rise"
        >
          Pronto?
        </p>
        <h2
          class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white sgfm-rise delay-1"
        >
          Escolha como pretende aceder ao <span class="sgfm-gradient-text">SGFM</span>
        </h2>
        <p
          class="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base sm:text-lg sgfm-rise delay-2"
        >
          Quer já faça parte da plataforma ou esteja a começar, está a um clique de assumir o
          controlo total do fundo de maneio da sua empresa.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6 relative">
        <router-link to="/login" class="block group">
          <CardGlass
            hover
            class="p-8 transition-transform group-hover:-translate-y-1 sgfm-rise delay-1"
          >
            <div class="flex items-center justify-between mb-5">
              <div
                class="h-12 w-12 rounded-xl bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-300 flex items-center justify-center sgfm-neon-cyan"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M11 3h5a1 1 0 011 1v12a1 1 0 01-1 1h-5v-2h4V5h-4V3zM9 7l-1.4 1.4L9.2 10H3v2h6.2L7.6 13.6 9 15l4-4-4-4z"
                  />
                </svg>
              </div>
              <span
                class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500"
              >
                Acesso rápido
              </span>
            </div>

            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Já tenho conta</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Entre na plataforma para continuar a gerir pedidos, aprovações e relatórios.
            </p>

            <ul class="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li v-for="f in loginFeatures" :key="f" class="flex items-start gap-2">
                <svg
                  class="mt-0.5 shrink-0 text-sky-500 dark:text-cyan-300"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                </svg>
                <span>{{ f }}</span>
              </li>
            </ul>

            <div
              class="mt-auto pt-6 inline-flex items-center gap-2 text-sky-600 dark:text-cyan-300 text-sm font-semibold group-hover:gap-3 transition-all"
            >
              Iniciar sessão
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z" />
              </svg>
            </div>
          </CardGlass>
        </router-link>

        <router-link to="/register" class="block group relative">
          <span
            class="absolute -top-3 right-6 z-20 px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-[0_8px_20px_-8px_rgba(139,92,246,0.55)]"
          >
            Recomendado
          </span>
          <CardGlass
            glow
            hover
            class="p-8 transition-transform group-hover:-translate-y-1 sgfm-rise delay-2"
          >
            <div class="flex items-center justify-between mb-5">
              <div
                class="h-12 w-12 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 flex items-center justify-center sgfm-neon-violet"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
                  />
                </svg>
              </div>
              <span
                class="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500"
              >
                Começar do zero
              </span>
            </div>

            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Criar conta</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Registo simples com validação por código. A sua organização fica activa em minutos.
            </p>

            <ul class="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li v-for="f in registerFeatures" :key="f" class="flex items-start gap-2">
                <svg
                  class="mt-0.5 shrink-0 text-violet-500 dark:text-violet-300"
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                </svg>
                <span>{{ f }}</span>
              </li>
            </ul>

            <div
              class="mt-auto pt-6 inline-flex items-center gap-2 text-violet-600 dark:text-violet-300 text-sm font-semibold group-hover:gap-3 transition-all"
            >
              Iniciar registo
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

const loginFeatures = [
  'E-mail, telefone ou Google',
  'Acesso ao painel completo',
  'Sessão segura e auditada',
]

const registerFeatures = [
  'Verificação por código (OTP)',
  'Pronto em menos de 2 minutos',
  'Trial sem cartão de crédito',
]
</script>
