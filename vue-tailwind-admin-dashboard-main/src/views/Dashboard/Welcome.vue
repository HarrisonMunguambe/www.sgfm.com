<template>
  <div class="sgfm-surface min-h-screen relative p-4 sm:p-6 lg:p-10 overflow-hidden">
    <div class="absolute inset-0 sgfm-grid-bg pointer-events-none"></div>
    <div
      class="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-30 bg-sky-300 dark:bg-cyan-500 dark:opacity-20"
    ></div>
    <div
      class="absolute -bottom-24 -left-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-30 bg-violet-300 dark:bg-violet-500 dark:opacity-20"
    ></div>

    <!-- Top bar -->
    <div class="relative flex items-center justify-between gap-2 mb-6 sm:mb-8">
      <router-link to="/" class="flex items-center gap-2 min-w-0">
        <div
          class="h-9 w-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white shrink-0"
        >
          S
        </div>
        <span class="text-slate-900 dark:text-white font-semibold tracking-wide">SGFM</span>
        <span class="text-xs text-slate-500 ml-2 hidden sm:inline">Dashboard</span>
      </router-link>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <router-link
          to="/"
          class="hidden sm:inline-flex text-sm text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-300 transition px-3 py-2"
        >
          Ver landing
        </router-link>
        <ButtonNeon variant="secondary" :loading="loggingOut" @click="onLogout">
          Sair
        </ButtonNeon>
      </div>
    </div>

    <!-- Welcome -->
    <div class="relative max-w-5xl mx-auto">
      <CardGlass glow class="p-5 sm:p-8 lg:p-10 sgfm-rise">
        <div class="flex items-center gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div
            class="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center font-black text-white text-xl sm:text-2xl sgfm-neon-cyan shrink-0"
          >
            {{ initials }}
          </div>
          <div class="min-w-0">
            <h1
              class="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white truncate"
            >
              Bem-vindo, <span class="sgfm-gradient-text">{{ firstName }}</span>
            </h1>
            <p class="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
              A sua sessão SGFM está ativa. Este é o seu painel de boas-vindas.
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <InfoRow label="Nome completo" :value="user.name" />
          <InfoRow label="Email" :value="user.email" />
          <InfoRow label="Departamento" :value="user.department || '—'" />
          <InfoRow label="Cargo" :value="user.role || '—'" />
          <InfoRow v-if="user.phone" label="Telefone" :value="user.phone" />
          <InfoRow label="ID de utilizador" :value="'#' + user.id" />
        </div>

        <div class="sgfm-divider my-8"></div>

        <div class="grid sm:grid-cols-3 gap-4">
          <div class="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] p-5">
            <div class="text-xs text-slate-500 uppercase tracking-widest">Próximos passos</div>
            <div class="mt-2 text-slate-900 dark:text-white font-semibold">Configurar fundo</div>
            <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Crie o seu primeiro fundo de maneio e defina limites.
            </p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] p-5">
            <div class="text-xs text-slate-500 uppercase tracking-widest">Convide a equipa</div>
            <div class="mt-2 text-slate-900 dark:text-white font-semibold">Adicionar utilizadores</div>
            <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Ative aprovadores, solicitantes e auditores.
            </p>
          </div>
          <div class="rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.03] p-5">
            <div class="text-xs text-slate-500 uppercase tracking-widest">Explorar IA</div>
            <div class="mt-2 text-slate-900 dark:text-white font-semibold">Ativar insights</div>
            <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Deixe a IA analisar padrões do seu fundo.
            </p>
          </div>
        </div>
      </CardGlass>
    </div>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import CardGlass from '@/components/neon/CardGlass.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import { useToast } from '@/composables/useToast'
import { getStoredUser, logout } from '@/services/auth'
import InfoRow from '@/components/neon/InfoRow.vue'

const router = useRouter()
const toast = useToast()
const loggingOut = ref(false)

const user = getStoredUser() ?? {
  id: 0,
  name: 'Utilizador',
  email: '—',
  department: '—',
  role: '—',
}

const firstName = computed(() => user.name.split(' ')[0] || 'utilizador')
const initials = computed(() =>
  user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join(''),
)

async function onLogout() {
  loggingOut.value = true
  try {
    await logout()
    toast.success('Sessão terminada', 'Até breve!')
    setTimeout(() => router.push('/login'), 400)
  } finally {
    loggingOut.value = false
  }
}
</script>
