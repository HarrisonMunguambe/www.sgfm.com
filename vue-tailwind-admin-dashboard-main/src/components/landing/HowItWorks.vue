<template>
  <section id="how" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-20 bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-violet-500/20 pointer-events-none"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p
          class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase sgfm-rise"
        >
          Como funciona
        </p>
        <h2
          class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white sgfm-rise delay-1"
        >
          Quatro passos. <span class="sgfm-gradient-text">Zero fricção.</span>
        </h2>
        <p
          class="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg sgfm-rise delay-2"
        >
          Do registo à conciliação, um fluxo único, inteligente e auditável, pensado para acelerar
          decisões sem perder controlo.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div
          class="hidden lg:block absolute top-[60px] left-[12%] right-[12%] h-px sgfm-shimmer pointer-events-none"
        ></div>

        <CardGlass
          v-for="(step, i) in steps"
          :key="step.title"
          hover
          :class="['p-6 relative sgfm-rise', `delay-${Math.min(i + 1, 4)}`]"
        >
          <div class="flex items-center justify-between mb-5">
            <div
              :class="['h-12 w-12 rounded-xl flex items-center justify-center', step.iconBg]"
              v-html="step.icon"
            ></div>
            <div
              class="text-4xl font-extrabold tabular-nums leading-none bg-clip-text text-transparent bg-gradient-to-br from-slate-300 to-slate-100 dark:from-slate-600 dark:to-slate-800"
            >
              0{{ i + 1 }}
            </div>
          </div>

          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ step.desc }}
          </p>

          <div class="mt-auto pt-5">
            <span
              :class="[
                'inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full',
                step.tagClass,
              ]"
            >
              <span class="h-1.5 w-1.5 rounded-full" :class="step.tagDot"></span>
              {{ step.tag }}
            </span>
          </div>
        </CardGlass>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardGlass from '@/components/neon/CardGlass.vue'

const steps = [
  {
    title: 'Crie a sua conta',
    desc: 'Registe-se, valide a sua conta usando o seu email com um código OTP e preencha o seu perfil com os seus dados e informações de contacto.',
    tag: 'Em ~2 minutos',
    iconBg: 'bg-sky-100 dark:bg-cyan-500/20',
    tagClass: 'bg-sky-50 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-300',
    tagDot: 'bg-sky-500 dark:bg-cyan-300',
    icon: '<svg width="22" height="22" viewBox="0 0 20 20" fill="#0ea5e9"><path d="M8 10a4 4 0 100-8 4 4 0 000 8zm0 1.5c-3.3 0-6 1.7-6 4V17h10v-1.5c0-2.3-2.7-4-6-4zm9-3h-2V6h-1.5v2.5H11V10h2.5v2.5H15V10h2V8.5z"/></svg>',
  },
  {
    title: 'Submeta o pedido',
    desc: 'Indique o valor, a finalidade e anexe a justificativa. O pedido segue automaticamente para o responsável, com notificação em tempo real.',
    tag: 'Via WhatsApp ou painel',
    iconBg: 'bg-violet-100 dark:bg-violet-500/20',
    tagClass: 'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',
    tagDot: 'bg-violet-500 dark:bg-violet-300',
    icon: '<svg width="22" height="22" viewBox="0 0 20 20" fill="#8b5cf6"><path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 3v2h10V6H5zm0 4v2h10v-2H5zm0 4v2h7v-2H5z"/></svg>',
  },
  {
    title: 'Aprovação e gestão',
    desc: 'O Fiel de Caixa ou Director Financeiro analisa, aprova ou recusa. Cada decisão fica registada data, autor e motivo para total transparência.',
    tag: 'Decisão registada',
    iconBg: 'bg-emerald-100 dark:bg-emerald-500/20',
    tagClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',
    tagDot: 'bg-emerald-500 dark:bg-emerald-300',
    icon: '<svg width="22" height="22" viewBox="0 0 20 20" fill="#10b981"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1 11.4L5.6 10 7 8.6l2 2L13 6.6 14.4 8 9 13.4z"/></svg>',
  },
  {
    title: 'Comprovativo e auditoria',
    desc: 'Após usar o valor, anexe os comprovativos. O saldo actualiza-se automaticamente e a trilha de auditoria mantém-se sempre completa.',
    tag: 'Auto-conciliado',
    iconBg: 'bg-indigo-100 dark:bg-indigo-500/20',
    tagClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300',
    tagDot: 'bg-indigo-500 dark:bg-indigo-300',
    icon: '<svg width="22" height="22" viewBox="0 0 20 20" fill="#6366f1"><path d="M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1zm6 1.5V7h3.5L11 3.5zM6.5 10h7v1.2h-7V10zm0 2.5h7v1.2h-7v-1.2zm0 2.5h4.5v1.2H6.5V15z"/></svg>',
  },
]
</script>
