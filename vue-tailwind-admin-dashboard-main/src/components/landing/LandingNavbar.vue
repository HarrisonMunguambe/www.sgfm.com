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
        <div
          v-for="l in desktopLinks"
          :key="l.to"
          class="relative"
          @mouseenter="l.children && l.children.length && openMenu(l.to)"
          @mouseleave="l.children && l.children.length && closeMenu()"
        >
          <!-- Item com submenu (Observatório) -->
          <template v-if="l.children && l.children.length">
            <button
              type="button"
              @click="toggleMenu(l.to)"
              :class="[...navLinkClass(l), 'inline-flex items-center gap-1.5 cursor-pointer']"
              :aria-expanded="openSubmenu === l.to"
              aria-haspopup="menu"
            >
              <span class="relative inline-block">
                {{ l.label }}
                <span v-if="isActive(l)" class="nav-active-line"></span>
              </span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 20 20"
                fill="currentColor"
                :class="[
                  'transition-transform duration-200',
                  openSubmenu === l.to ? 'rotate-180' : '',
                ]"
              >
                <path d="M5 7l5 6 5-6H5z" />
              </svg>
            </button>

            <transition name="submenu">
              <div
                v-if="openSubmenu === l.to"
                role="menu"
                class="absolute top-full left-0 mt-2 min-w-[260px] rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-[0_20px_40px_-15px_rgba(15,23,42,0.25)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] p-2 z-50"
              >
                <router-link
                  v-for="child in l.children"
                  :key="child.to"
                  :to="child.to"
                  @click="openSubmenu = null"
                  class="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition group/item"
                >
                  <span
                    :class="[
                      'mt-0.5 inline-flex items-center justify-center h-9 w-9 rounded-lg shrink-0 text-white shadow-[0_6px_18px_-8px_rgba(79,70,229,0.55)]',
                      child.iconBg,
                    ]"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      v-html="child.iconPath"
                    ></svg>
                  </span>
                  <span class="flex-1 min-w-0">
                    <span
                      class="block text-sm font-semibold text-slate-900 dark:text-white group-hover/item:text-sky-600 dark:group-hover/item:text-cyan-300 transition"
                    >
                      {{ child.label }}
                    </span>
                    <span class="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {{ child.description }}
                    </span>
                  </span>
                </router-link>
              </div>
            </transition>
          </template>

          <!-- Item normal -->
          <router-link v-else :to="l.to" :class="navLinkClass(l)">
            <span class="relative inline-block">
              {{ l.label }}
              <span v-if="isActive(l)" class="nav-active-line"></span>
            </span>
          </router-link>
        </div>
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
          <div v-for="l in mobileLinks" :key="l.to">
            <router-link
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
            <!-- Subitens (Observatório) -->
            <div
              v-if="l.children && l.children.length"
              class="ml-3 mt-1 pl-3 border-l border-slate-200 dark:border-white/10 flex flex-col gap-1"
            >
              <router-link
                v-for="child in l.children"
                :key="child.to"
                :to="child.to"
                @click="open = false"
                class="px-3 py-2 rounded-xl text-sm transition flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                <span
                  :class="[
                    'inline-flex items-center justify-center h-7 w-7 rounded-md text-white shrink-0',
                    child.iconBg,
                  ]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    v-html="child.iconPath"
                  ></svg>
                </span>
                <span class="truncate">{{ child.label }}</span>
              </router-link>
            </div>
          </div>

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

interface NavChild {
  to: string
  label: string
  description: string
  iconBg: string
  iconPath: string
}

interface NavLink {
  to: string
  label: string
  hash?: string
  path?: string
  children?: NavChild[]
}

const scrolled = ref(false)
const open = ref(false)
const route = useRoute()
const router = useRouter()
const authed = ref(isAuthenticated())
const loggingOut = ref(false)
const activeHash = ref<string>('')
const openSubmenu = ref<string | null>(null)
let closeTimer: ReturnType<typeof setTimeout> | null = null

const desktopLinks: NavLink[] = [
  { to: '/#inicio', label: 'Início', hash: '#inicio' },
  { to: '/#features', label: 'Funcionalidades', hash: '#features' },
  { to: '/#how', label: 'Como funciona', hash: '#how' },
  {
    to: '/observatorio',
    label: 'Observatório',
    path: '/observatorio',
    children: [
      {
        to: '/observatorio/empresa',
        label: 'A minha empresa',
        description: 'Previsões e benchmarks dos dados de seu SGFM',
        iconBg: 'bg-gradient-to-br from-sky-500 to-indigo-600',
        iconPath:
          '<path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4 3h2v11h-2V10zm4-7h2v18h-2V3zm4 9h2v9h-2v-9z"/>',
      },
      {
        to: '/observatorio/global',
        label: 'Mercados globais',
        description: 'Notícias financeiras do Mundo, em tempo real',
        iconBg: 'bg-gradient-to-br from-violet-500 to-rose-500',
        iconPath:
          '<path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 9h-3a15.6 15.6 0 00-1.1-5.2A8 8 0 0118.9 11zm-6.9 9c-1 0-2.2-2.3-2.8-6h5.6c-.6 3.7-1.8 6-2.8 6zm-2.9-8c.6-3.7 1.8-6 2.9-6s2.3 2.3 2.9 6H9.1zM9.2 5.8A15.6 15.6 0 008.1 11h-3a8 8 0 014.1-5.2zM5.1 13h3a15.6 15.6 0 001.1 5.2A8 8 0 015.1 13zm9.7 5.2A15.6 15.6 0 0015.9 13h3a8 8 0 01-4.1 5.2z"/>',
      },
    ],
  },
  { to: '/#faq', label: 'FAQ', hash: '#faq' },
]

const mobileLinks = desktopLinks

function openMenu(key: string) {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
  openSubmenu.value = key
}
function closeMenu() {
  closeTimer = setTimeout(() => {
    openSubmenu.value = null
    closeTimer = null
  }, 120)
}
function toggleMenu(key: string) {
  openSubmenu.value = openSubmenu.value === key ? null : key
}

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

.submenu-enter-active,
.submenu-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
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
