<template>
  <nav
    :class="[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled || open
        ? 'sgfm-glass shadow-[0_8px_24px_-12px_rgba(15,23,42,0.15)] border-b border-slate-200/60 dark:border-white/5'
        : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <router-link to="/" class="flex items-center gap-2 shrink-0">
        <span class="sm:hidden">
          <AppLogo :full="false" imgClass="h-9 w-9" :width="32" :height="32" />
        </span>
        <span class="hidden sm:block">
          <AppLogo full imgClass="h-9 w-auto max-w-[160px]" :width="150" :height="40" />
        </span>
      </router-link>

      <div class="hidden lg:flex items-center gap-1 text-sm">
        <router-link v-for="l in desktopLinks" :key="l.to" :to="l.to" :class="navLinkClass(l)">
          <span class="relative inline-block">
            {{ l.label }}
            <span v-if="isActive(l)" class="nav-active-line"></span>
          </span>
        </router-link>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <ThemeToggle />
        <template v-if="!authed">
          <router-link
            to="/login"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white hover:border-sky-300 dark:hover:bg-white/10 dark:hover:border-cyan-300/40 hover:-translate-y-0.5 transition"
          >
            Entrar
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M11 3h5a1 1 0 011 1v12a1 1 0 01-1 1h-5v-2h4V5h-4V3zM9 7l-1.4 1.4L9.2 10H3v2h6.2L7.6 13.6 9 15l4-4-4-4z"
              />
            </svg>
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
            :class="[
              'px-3 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between',
              isActive(l)
                ? 'bg-sky-50 text-sky-700 dark:bg-cyan-500/10 dark:text-cyan-300'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5',
            ]"
          >
            <span>{{ l.label }}</span>
            <span
              v-if="isActive(l)"
              class="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-300"
            ></span>
          </router-link>

          <div class="h-px bg-slate-200 dark:bg-white/10 my-2"></div>

          <template v-if="!authed">
            <router-link
              to="/login"
              @click="open = false"
              class="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition"
            >
              <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M11 3h5a1 1 0 011 1v12a1 1 0 01-1 1h-5v-2h4V5h-4V3zM9 7l-1.4 1.4L9.2 10H3v2h6.2L7.6 13.6 9 15l4-4-4-4z"
                />
              </svg>
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

interface NavLink {
  to: string
  label: string
  hash?: string
  path?: string
}

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const router = useRouter()
const authed = ref(isAuthenticated())
const loggingOut = ref(false)
const activeHash = ref<string>('')

const desktopLinks: NavLink[] = [
  { to: '/#inicio', label: 'Início', hash: '#inicio' },
  { to: '/#features', label: 'Funcionalidades', hash: '#features' },
  { to: '/#how', label: 'Como funciona', hash: '#how' },
  { to: '/observatorio', label: 'Observatório', path: '/observatorio' },
  { to: '/#faq', label: 'FAQ', hash: '#faq' },
]

const mobileLinks = desktopLinks

function isActive(link: NavLink) {
  if (link.path) return route.path.startsWith(link.path)
  if (link.hash) return route.path === '/' && activeHash.value === link.hash
  return false
}

const baseLinkClass = 'relative px-3 py-2 rounded-lg transition-colors duration-200'

function navLinkClass(link: NavLink) {
  return [
    baseLinkClass,
    isActive(link)
      ? 'text-sky-600 dark:text-cyan-300 font-medium'
      : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300',
  ]
}

function onScroll() {
  scrolled.value = window.scrollY > 20
  if (route.path === '/' && window.scrollY < 200) {
    activeHash.value = '#inicio'
  }
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

watch(
  () => route.fullPath,
  () => {
    open.value = false
    authed.value = isAuthenticated()
  },
)

let observer: IntersectionObserver | null = null
const sectionIds = ['inicio', 'features', 'how', 'faq', 'choice']

function setupObserver() {
  observer?.disconnect()
  if (route.path !== '/') {
    activeHash.value = ''
    return
  }
  const els = sectionIds
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)
  if (!els.length) return

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) {
        activeHash.value = `#${(visible.target as HTMLElement).id}`
      }
    },
    { threshold: [0.2, 0.45, 0.7], rootMargin: '-30% 0px -50% 0px' },
  )
  els.forEach((el) => observer!.observe(el))
}

watch(
  () => route.path,
  () => {
    setTimeout(setupObserver, 50)
  },
)

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  setTimeout(setupObserver, 50)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
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

.nav-active-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 9999px;
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
}
:global(.dark) .nav-active-line {
  background: linear-gradient(90deg, #00f2fe, #8b5cf6);
}
</style>
