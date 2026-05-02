<template>
  <div class="relative h-full overflow-hidden sgfm-brand-panel text-white">
    <!-- Background decoration -->
    <div class="absolute inset-0 sgfm-grid-bg opacity-60 pointer-events-none"></div>
    <div class="absolute -top-16 -left-16 w-80 h-80 rounded-full blur-3xl bg-cyan-400/30 sgfm-float"></div>
    <div
      class="absolute -bottom-16 -right-16 w-96 h-96 rounded-full blur-3xl bg-violet-500/30 sgfm-float"
      style="animation-delay: 1.5s"
    ></div>

    <div class="relative h-full flex flex-col justify-between p-8 sm:p-12">
      <!-- Top: logo -->
      <router-link to="/" class="inline-flex items-center gap-2 w-max">
        <AppLogo
          full
          forceTheme="dark"
          imgClass="h-9 w-auto max-w-[170px]"
          :width="150"
          :height="40"
        />
      </router-link>

      <!-- Middle: headline -->
      <div class="max-w-md">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-medium mb-5"
        >
          <span class="sgfm-ticker-dot"></span>
          {{ tag }}
        </div>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight">
          {{ title }}
          <span class="sgfm-gradient-text">{{ titleAccent }}</span>
        </h1>
        <p class="mt-5 text-base text-slate-200/90 leading-relaxed">
          {{ description }}
        </p>

        <!-- Benefícios -->
        <ul class="mt-8 space-y-3.5">
          <li
            v-for="b in bullets"
            :key="b"
            class="flex items-start gap-3 text-sm text-slate-100"
          >
            <span
              class="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300/20 border border-cyan-300/40 text-cyan-200"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
              </svg>
            </span>
            {{ b }}
          </li>
        </ul>
      </div>

      <!-- Bottom: trust row -->
      <div class="flex items-center gap-5 text-xs text-slate-300">
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#34d399">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          SSL Bancário
        </div>
        <div class="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#34d399">
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          Conformidade com auditoria
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@/components/common/AppLogo.vue'

withDefaults(
  defineProps<{
    tag?: string
    title?: string
    titleAccent?: string
    description?: string
    bullets?: string[]
  }>(),
  {
    tag: 'Plataforma financeira com IA',
    title: 'Gestão financeira',
    titleAccent: 'em tempo real.',
    description:
      'O SGFM reúne requisições, aprovações e reposições de fundo de maneio num único fluxo — com previsões inteligentes para antecipar desvios.',
    bullets: () => [
      'Aprovações em segundos, auditáveis de ponta a ponta',
      'Alertas com IA quando um gasto foge do padrão histórico',
      'Relatórios prontos para exportar em PDF ou Excel',
    ],
  },
)
</script>
