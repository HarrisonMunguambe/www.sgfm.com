<template>
  <footer class="relative border-t border-slate-200 dark:border-white/5 py-12 mt-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8 mb-10">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div
              class="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white"
            >
              S
            </div>
            <span class="text-slate-900 dark:text-white font-semibold">SGFM</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Sistema de Gestão de Fundo de Maneio — controlo financeiro com IA para organizações
            modernas.
          </p>
        </div>
        <div>
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Produto</h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <router-link
                to="/#features"
                class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Funcionalidades</router-link
              >
            </li>
            <li>
              <router-link
                to="/#how"
                class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Como funciona</router-link
              >
            </li>
            <li>
              <router-link
                to="/observatorio"
                class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Observatório Financeiro</router-link
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">Preços</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Empresa</h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
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
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">Contacto</a>
            </li>
            <li><a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-slate-900 dark:text-white font-semibold mb-4 text-sm">Legal</h4>
          <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Termos de serviço</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Privacidade</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                >Segurança</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-sky-600 dark:hover:text-cyan-300 transition">LGPD / GDPR</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sgfm-divider"></div>

      <div
        class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500"
      >
        <div>© {{ year }} SGFM. Todos os direitos reservados.</div>
        <div class="flex items-center gap-4">
          <span>Feito em Moçambique</span>
          <span class="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
          <span>v2.0.1</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
