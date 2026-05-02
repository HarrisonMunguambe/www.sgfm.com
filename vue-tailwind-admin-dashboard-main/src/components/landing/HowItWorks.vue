<template>
  <section id="how" class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-14">
        <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
          Como funciona
        </p>
        <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
          Três passos. <span class="sgfm-gradient-text">Sem fricção.</span>
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Do pedido à aprovação e à conciliação — tudo num só fluxo, inteligente e auditável.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6 relative">
        <div class="hidden md:block absolute top-14 left-[16.5%] right-[16.5%] h-px sgfm-shimmer"></div>

        <CardGlass
          v-for="(step, i) in steps"
          :key="step.title"
          hover
          class="p-8 text-center relative"
        >
          <div class="flex justify-center mb-5">
            <div
              :class="[
                'h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl',
                step.color,
              ]"
            >
              {{ i + 1 }}
            </div>
          </div>
          <div
            class="mx-auto mb-4 h-14 w-14 rounded-full flex items-center justify-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
            v-html="step.icon"
          ></div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ step.desc }}
          </p>
        </CardGlass>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardGlass from '@/components/neon/CardGlass.vue'

const steps = [
  {
    title: 'Submeta a requisição',
    desc: 'Utilizadores abrem pedidos em segundos, com validação automática de limites e políticas.',
    color: 'bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-300 sgfm-neon-cyan',
    icon: '<svg width="26" height="26" viewBox="0 0 20 20" fill="#0ea5e9"><path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 3v2h10V6H5zm0 4v2h10v-2H5zm0 4v2h7v-2H5z"/></svg>',
  },
  {
    title: 'Aprovação inteligente',
    desc: 'A IA prioriza, deteta duplicações e encaminha ao aprovador correto com contexto completo.',
    color: 'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 sgfm-neon-violet',
    icon: '<svg width="26" height="26" viewBox="0 0 20 20" fill="#8b5cf6"><path d="M10 2l2.5 5 5.5.8-4 3.9 1 5.5L10 14.8 5 17.2l1-5.5-4-3.9 5.5-.8L10 2z"/></svg>',
  },
  {
    title: 'Concilie e audite',
    desc: 'Reposições automáticas, trilha de auditoria completa e relatórios exportáveis em 1 clique.',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    icon: '<svg width="26" height="26" viewBox="0 0 20 20" fill="#10b981"><path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z"/></svg>',
  },
]
</script>
