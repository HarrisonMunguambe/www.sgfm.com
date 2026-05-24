<template>
  <footer
    class="relative border-t border-slate-200 dark:border-white/5 pt-14 pb-8 mt-10 overflow-hidden"
  >
    <div
      class="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[200px] rounded-full blur-3xl opacity-15 bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 dark:from-cyan-500/20 dark:via-indigo-500/20 dark:to-violet-500/20 pointer-events-none"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 mb-12">
        <div class="lg:col-span-4">
          <router-link to="/" class="inline-flex items-center mb-4">
            <AppLogo full imgClass="h-9 w-auto max-w-[160px]" :width="150" :height="40" />
          </router-link>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
            Sistema de Gestão de Fundo de Maneio, controlo financeiro com inteligência artificial,
            pensado para organizações modernas de Moçambique.
          </p>

          <div class="mt-6 flex items-center gap-3">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              :aria-label="s.name"
              class="h-9 w-9 rounded-lg flex items-center justify-center border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-white hover:border-transparent hover:bg-gradient-to-br hover:from-sky-500 hover:to-violet-500 hover:-translate-y-0.5 transition-all"
            >
              <span v-html="s.icon"></span>
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Produto</h4>
          <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <router-link
                to="/#features"
                class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Funcionalidades</router-link
              >
            </li>
            <li>
              <router-link to="/#how" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Como funciona</router-link
              >
            </li>
            <li>
              <router-link
                to="/observatorio"
                class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Observatório</router-link
              >
            </li>
            <li>
              <router-link to="/#faq" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Perguntas frequentes</router-link
              >
            </li>
          </ul>
        </div>

        <div class="lg:col-span-2">
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Empresa</h4>
          <ul class="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Sobre nós</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Carreiras</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">Blog</a>
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Termos & Privacidade</a
              >
            </li>
          </ul>
        </div>

        <div class="lg:col-span-4">
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Contactos</h4>
          <ul class="space-y-3 text-sm">
            <li>
              <a
                href="tel:+258833478649"
                class="flex items-start gap-3 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition group"
              >
                <span
                  class="shrink-0 h-9 w-9 rounded-lg bg-sky-100 dark:bg-cyan-500/15 text-sky-600 dark:text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2 4a2 2 0 012-2h2.3a1 1 0 011 .8l1 4a1 1 0 01-.3 1L7 9.1a10 10 0 003.9 3.9l1.4-1a1 1 0 011-.3l4 1a1 1 0 01.8 1V16a2 2 0 01-2 2h-1A14 14 0 012 5V4z"
                    />
                  </svg>
                </span>
                <span>
                  <span
                    class="block text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500"
                    >Suporte técnico</span
                  >
                  <span class="font-medium">+258 83 347 8649</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="mailto:suporte@sgfm.co.mz"
                class="flex items-start gap-3 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-cyan-300 transition group"
              >
                <span
                  class="shrink-0 h-9 w-9 rounded-lg bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300 flex items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0l6 4 6-4H4zm12 2.2l-5.4 3.6a1 1 0 01-1.2 0L4 7.2V15h12V7.2z"
                    />
                  </svg>
                </span>
                <span>
                  <span
                    class="block text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500"
                    >E-mail</span
                  >
                  <span class="font-medium">suporte@sgfm.co.mz</span>
                </span>
              </a>
            </li>
            <li>
              <div class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <span
                  class="shrink-0 h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6zm0 4a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                </span>
                <span>
                  <span
                    class="block text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500"
                    >Escritório</span
                  >
                  <span class="font-medium">Av. Julius Nyerere, 1234</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400"
                    >Maputo, Moçambique</span
                  >
                </span>
              </div>
            </li>
            <li>
              <!-- <div class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <span
                  class="shrink-0 h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 4v4.2l3.4 2-1 1.6L9 11V6h2z"
                    />
                  </svg>
                </span>
                <span>
                  <span class="block text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Horário</span>
                  <span class="font-medium">Seg–Sex, 08:00 – 17:00</span>
                </span>
              </div> -->
            </li>
          </ul>
        </div>
      </div>

      <div class="sgfm-divider"></div>

      <div
        class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500"
      >
        <div
          class="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/40 px-3 py-1.5 text-[11px] font-medium text-slate-600 backdrop-blur-sm transition-colors duration-300 hover:border-slate-300 dark:border-slate-700/60 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-slate-600"
        >
          <svg
            class="h-3 w-3 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
          </svg>
          <span>
            <span class="font-semibold text-slate-700 dark:text-slate-200">{{ year }}</span>
            <span class="mx-1 text-slate-300 dark:text-slate-600">•</span>
            <span
              class="bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text font-semibold text-transparent dark:from-slate-200 dark:to-slate-400"
              >SGFM</span
            >
            <span class="hidden sm:inline">— Todos os direitos reservados.</span>
          </span>
        </div>
        <div class="flex items-center gap-4">
          <a
            href="https://harrisonmunguambe.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="sgfm-credit group inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 px-3 py-1.5 text-[11px] font-medium text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/60 hover:from-emerald-500/20 hover:via-teal-500/20 hover:to-sky-500/20 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)] hover:scale-105 dark:text-slate-200"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
              ></span>
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span>
              Projectado e Desenvolvido por
              <span
                class="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text font-semibold text-transparent"
              >
                Eng. Harrison Munguambe
              </span>
            </span>
            <svg
              class="h-3 w-3 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M7 17L17 7M17 7H8M17 7V16" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import AppLogo from '@/components/common/AppLogo.vue'

const year = new Date().getFullYear()

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>',
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
  },
  {
    name: 'Instagram',
    href: '#',
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
  },
  {
    name: 'X (Twitter)',
    href: '#',
    icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  },
]
</script>
