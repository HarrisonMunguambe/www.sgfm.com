<template>
  <div class="w-full">
    <!-- Progress track + nodes -->
    <div class="relative">
      <!-- Track background -->
      <div
        class="absolute top-5 left-5 right-5 h-0.5 bg-slate-200 dark:bg-white/10 rounded-full"
      ></div>
      <!-- Track fill -->
      <div
        class="absolute top-5 left-5 h-0.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(14,165,233,0.5)]"
        :style="{ width: progressWidth }"
      ></div>

      <!-- Nodes -->
      <div class="relative flex items-start justify-between">
        <div
          v-for="(s, i) in steps"
          :key="i"
          class="flex flex-col items-center text-center min-w-0"
          :style="{ flex: '0 0 auto' }"
        >
          <div
            :class="[
              'relative h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300',
              i + 1 < current
                ? 'bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.65)]'
                : i + 1 === current
                  ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-cyan-300 border-2 border-sky-500 dark:border-cyan-400 shadow-[0_0_0_4px_rgba(14,165,233,0.18)] dark:shadow-[0_0_0_4px_rgba(0,242,254,0.18)] node-pulse'
                  : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/10',
            ]"
          >
            <transition name="node-icon" mode="out-in">
              <svg
                v-if="i + 1 < current"
                key="check"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
              </svg>
              <span
                v-else-if="s.icon"
                key="icon"
                class="inline-flex"
                v-html="s.icon"
              ></span>
              <span v-else key="num" class="text-sm font-bold">{{ i + 1 }}</span>
            </transition>
          </div>

          <div class="mt-2.5 hidden sm:block text-center">
            <div
              :class="[
                'text-xs font-semibold transition-colors whitespace-nowrap',
                i + 1 <= current
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-400 dark:text-slate-500',
              ]"
            >
              {{ s.label }}
            </div>
            <div
              v-if="s.hint"
              :class="[
                'hidden xl:block text-[10px] mt-0.5 transition-colors whitespace-nowrap',
                i + 1 <= current
                  ? 'text-slate-500 dark:text-slate-400'
                  : 'text-slate-400 dark:text-slate-600',
              ]"
            >
              {{ s.hint }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile current label -->
    <div class="mt-4 sm:hidden text-center">
      <div class="text-[10px] uppercase tracking-widest text-slate-500">
        Passo {{ current }} de {{ steps.length }}
      </div>
      <div class="text-sm font-semibold text-slate-900 dark:text-white">
        {{ steps[current - 1]?.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Step {
  label: string
  hint?: string
  icon?: string
}

const props = defineProps<{
  steps: Step[]
  current: number
}>()

const progressWidth = computed(() => {
  if (props.steps.length <= 1) return '0%'
  const completed = Math.max(0, props.current - 1)
  const pct = (completed / (props.steps.length - 1)) * 100
  return `calc(${pct}% - ${pct === 0 ? '0px' : '0px'})`
})
</script>

<style scoped>
.node-pulse::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 9999px;
  border: 2px solid currentColor;
  opacity: 0.5;
  animation: node-ring 1.6s ease-out infinite;
  pointer-events: none;
}
@keyframes node-ring {
  0% {
    transform: scale(0.95);
    opacity: 0.55;
  }
  70% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.node-icon-enter-active,
.node-icon-leave-active {
  transition: all 0.25s ease;
}
.node-icon-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.node-icon-leave-to {
  opacity: 0;
  transform: scale(1.4);
}
</style>
