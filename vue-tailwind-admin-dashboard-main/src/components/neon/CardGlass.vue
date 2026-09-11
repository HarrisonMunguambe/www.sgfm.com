<template>
  <div
    :class="[
      'relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300',
      'bg-white/80 border border-slate-200/70 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.08)]',
      'dark:bg-white/[0.04] dark:border-white/10 dark:shadow-none',
      hover
        ? 'hover:border-cyan-400/60 hover:shadow-[0_10px_35px_-10px_rgba(14,165,233,0.35)] dark:hover:shadow-[0_0_30px_-5px_rgba(0,242,254,0.35)]'
        : '',
      glow ? 'neon-border-anim' : '',
    ]"
  >
    <div class="relative z-10 h-full flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hover?: boolean
  glow?: boolean
}>()
</script>

<style scoped>
.neon-border-anim::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 1rem;
  padding: 1px;
  background: linear-gradient(120deg, #0ea5e9, #6366f1, #8b5cf6, #0ea5e9);
  background-size: 300% 300%;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: neon-flow 6s ease infinite;
  pointer-events: none;
  opacity: 0.55;
  z-index: 0;
}
.dark .neon-border-anim::before {
  background: linear-gradient(120deg, #00f2fe, #4facfe, #8b5cf6, #00f2fe);
  opacity: 1;
}

@keyframes neon-flow {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
</style>
