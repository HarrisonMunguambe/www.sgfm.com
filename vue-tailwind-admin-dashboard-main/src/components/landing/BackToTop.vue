<template>
  <transition name="fade-up">
    <button
      v-if="show"
      @click="scrollTop"
      title="Voltar ao topo"
      class="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-sky-500 to-indigo-600 shadow-[0_12px_30px_-8px_rgba(79,70,229,0.55)] hover:shadow-[0_15px_35px_-5px_rgba(139,92,246,0.65)] hover:-translate-y-1 transition-all"
      aria-label="Voltar ao topo"
    >
      <span
        class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-gradient-to-br from-sky-400 to-violet-500 blur-xl"
      ></span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="relative"
      >
        <path
          d="M10 3.5L3.5 10l1.4 1.4L9 7.3V17h2V7.3l4.1 4.1 1.4-1.4L10 3.5z"
        />
      </svg>
      <!-- ring de progresso do scroll -->
      <svg class="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="white"
          stroke-opacity="0.25"
          stroke-width="2"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-[stroke-dashoffset] duration-150 ease-out"
        />
      </svg>
    </button>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const show = ref(false)
const progress = ref(0)
const circumference = 2 * Math.PI * 22
const dashOffset = computed(() => circumference * (1 - progress.value))

function onScroll() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  show.value = y > 400
  progress.value = max > 0 ? Math.min(1, y / max) : 0
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s ease;
}
.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.9);
}
</style>
