<template>
  <section id="testimonials" class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
          Depoimentos
        </p>
        <h2
          class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight sgfm-rise delay-1"
        >
          A confiança de quem <span class="sgfm-gradient-text">decide com dados</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <CardGlass
          v-for="(t, i) in testimonials"
          :key="t.id"
          hover
          :class="['p-7 relative sgfm-rise', `delay-${i + 1}`]"
        >
          <div class="absolute -top-4 left-6 text-6xl leading-none text-sky-400/40 dark:text-cyan-400/40 font-serif">
            “
          </div>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed relative">{{ t.text }}</p>
          <div class="mt-6 flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-white/5">
            <div
              class="h-11 w-11 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-sky-500 to-violet-500"
            >
              {{ t.avatar }}
            </div>
            <div>
              <div class="text-sm font-semibold text-slate-900 dark:text-white">{{ t.name }}</div>
              <div class="text-xs text-slate-500 dark:text-slate-400">{{ t.role }}</div>
            </div>
          </div>
        </CardGlass>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CardGlass from '@/components/neon/CardGlass.vue'
import { MOCK_TESTIMONIALS } from '@/services/mockData'
const testimonials = MOCK_TESTIMONIALS
</script>
