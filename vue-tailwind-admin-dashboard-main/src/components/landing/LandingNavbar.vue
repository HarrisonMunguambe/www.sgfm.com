<template>
  <nav
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled || open
        ? 'sgfm-glass shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)] border-b border-slate-200/60 dark:border-white/5'
        : 'bg-transparent',
    ]"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
    >
      <router-link to="/" class="flex items-center gap-2 shrink-0">
        <span class="sm:hidden">
          <AppLogo :full="false" imgClass="h-9 w-9" :width="32" :height="32" />
        </span>
        <span class="hidden sm:block">
          <AppLogo full imgClass="h-9 w-auto max-w-[160px]" :width="150" :height="40" />
        </span>
      </router-link>

      <!-- Desktop nav links (>= lg) -->
      <div class="hidden lg:flex items-center gap-7 text-sm text-slate-600 dark:text-slate-300">
        <router-link
          to="/#features"
          class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
        >
          Funcionalidades
        </router-link>
        <router-link
          to="/#how"
          class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
        >
          Como funciona
        </router-link>
        <router-link
          to="/observatorio"
          class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
        >
          Observatório
        </router-link>
        <router-link
          to="/#testimonials"
          class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
        >
          Depoimentos
        </router-link>
      </div>

      <!-- Desktop right side -->
      <div class="hidden md:flex items-center gap-3">
        <ThemeToggle />
        <template v-if="!authed">
          <router-link
            to="/login"
            class="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition px-3 py-2"
          >
            Iniciar sessão
          </router-link>
          <router-link
            to="/register"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)] hover:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 transition"
          >
            Criar conta
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 4l6 6-6 6V4z" />
            </svg>
          </router-link>
        </template>
        <template v-else>
          <button
            type="button"
            @click="onLogout"
            :disabled="loggingOut"
            class="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition px-3 py-2 disabled:opacity-60"
          >
            {{ loggingOut ? 'A sair…' : 'Sair' }}
          </button>
          <router-link
            to="/dashboard"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)] hover:shadow-[0_10px_25px_-5px_rgba(139,92,246,0.6)] hover:-translate-y-0.5 transition"
          >
            Ir para o painel
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 4l6 6-6 6V4z" />
            </svg>
          </router-link>
        </template>
      </div>

      <!-- Mobile: toggle + hamburger -->
      <div class="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <button
          @click="open = !open"
          class="h-10 w-10 inline-flex items-center justify-center rounded-xl border bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition"
          :aria-expanded="open"
          aria-label="Abrir menu"
        >
          <svg
            v-if="!open"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="text-slate-700 dark:text-slate-200"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            class="text-slate-700 dark:text-slate-200"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu panel -->
    <transition name="menu">
      <div
        v-if="open"
        class="md:hidden border-t border-slate-200/60 dark:border-white/5 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl"
      >
        <div class="px-4 sm:px-6 py-4 flex flex-col gap-1">
          <router-link
            v-for="l in mobileLinks"
            :key="l.to"
            :to="l.to"
            @click="open = false"
            class="px-3 py-3 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition"
          >
            {{ l.label }}
          </router-link>

          <div class="h-px bg-slate-200 dark:bg-white/10 my-2"></div>

          <template v-if="!authed">
            <router-link
              to="/login"
              @click="open = false"
              class="px-3 py-3 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition"
            >
              Iniciar sessão
            </router-link>
            <router-link
              to="/register"
              @click="open = false"
              class="mt-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-white px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)]"
            >
              Criar conta
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 4l6 6-6 6V4z" />
              </svg>
            </router-link>
          </template>
          <template v-else>
            <button
              type="button"
              @click="onLogout"
              :disabled="loggingOut"
              class="px-3 py-3 rounded-xl text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition text-left disabled:opacity-60"
            >
              {{ loggingOut ? 'A sair…' : 'Sair' }}
            </button>
            <router-link
              to="/dashboard"
              @click="open = false"
              class="mt-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-white px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)]"
            >
              Ir para o painel
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 4l6 6-6 6V4z" />
              </svg>
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import { isAuthenticated, logout } from '@/services/auth'
import AppLogo from '@/components/common/AppLogo.vue'

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const router = useRouter()
const authed = ref(isAuthenticated())
const loggingOut = ref(false)

const mobileLinks = [
  { to: '/#features', label: 'Funcionalidades' },
  { to: '/#how', label: 'Como funciona' },
  { to: '/observatorio', label: 'Observatório' },
  { to: '/#testimonials', label: 'Depoimentos' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

async function onLogout() {
  if (loggingOut.value) return
  loggingOut.value = true
  try {
    await logout()
    authed.value = false
  } finally {
    loggingOut.value = false
    open.value = false
    if (route.meta.requiresAuth) router.push('/')
  }
}

watch(() => route.fullPath, () => {
  open.value = false
  authed.value = isAuthenticated()
})

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}
.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
