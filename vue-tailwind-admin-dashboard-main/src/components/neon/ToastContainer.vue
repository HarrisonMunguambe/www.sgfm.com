<template>
  <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm">
    <transition-group name="toast">
      <div
        v-for="t in toast.items"
        :key="t.id"
        :class="[
          'pointer-events-auto rounded-xl backdrop-blur-xl border px-4 py-3 flex items-start gap-3 shadow-xl',
          t.type === 'success'
            ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-400/40 dark:text-emerald-100'
            : t.type === 'error'
              ? 'bg-rose-50/95 border-rose-200 text-rose-800 dark:bg-rose-500/10 dark:border-rose-400/40 dark:text-rose-100'
              : 'bg-sky-50/95 border-sky-200 text-sky-800 dark:bg-cyan-500/10 dark:border-cyan-400/40 dark:text-cyan-100',
        ]"
      >
        <div class="mt-0.5">
          <svg
            v-if="t.type === 'success'"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M10 2a8 8 0 100 16 8 8 0 000-16zm4 6.3l-5 5-3-3 1.4-1.4L9 10.5l3.6-3.6L14 8.3z"
            />
          </svg>
          <svg
            v-else-if="t.type === 'error'"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-5h2v5zm0-7H9V5h2v2z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm font-semibold">{{ t.title }}</div>
          <div v-if="t.message" class="text-xs opacity-80 mt-0.5">{{ t.message }}</div>
        </div>
        <button class="opacity-60 hover:opacity-100 transition" @click="toast.dismiss(t.id)">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M6.7 5.3L5.3 6.7 8.6 10l-3.3 3.3 1.4 1.4L10 11.4l3.3 3.3 1.4-1.4L11.4 10l3.3-3.3-1.4-1.4L10 8.6z"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const toast = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
