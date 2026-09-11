<template>
  <div class="sgfm-surface relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-8">
    <!-- Decorative blobs (linguagem visual da landing) -->
    <div
      class="absolute top-10 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-sky-300 dark:bg-cyan-500 dark:opacity-20 sgfm-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-violet-300 dark:bg-violet-500 dark:opacity-20 sgfm-float pointer-events-none"
      style="animation-delay: 1.5s"
    ></div>

    <CardGlass glow class="relative max-w-md w-full p-8 sm:p-10 text-center sgfm-rise">
      <!-- Google logo no topo -->
      <div class="flex justify-center mb-6">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full sgfm-glass border border-slate-200/70 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path
              d="M18.75 10.2c0-.7-.06-1.2-.2-1.8H10.2v3.3h4.9c-.1.8-.6 2-1.8 2.8l2.7 2c1.7-1.5 2.7-3.8 2.7-6.3z"
              fill="#4285F4"
            />
            <path
              d="M10.2 18.75c2.4 0 4.4-.8 5.9-2.2l-2.7-2c-.8.5-1.8.9-3.2.9-2.4 0-4.4-1.5-5.1-3.7l-2.8 2.2c1.5 2.9 4.5 4.8 8 4.8z"
              fill="#34A853"
            />
            <path
              d="M5.1 11.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7L2.2 6.1A8.74 8.74 0 001.25 10c0 1.4.3 2.7.9 3.9l2.95-2.2z"
              fill="#FBBC05"
            />
            <path
              d="M10.2 4.6c1.7 0 2.8.7 3.5 1.3l2.5-2.4A8.5 8.5 0 0010.2 1.25c-3.5 0-6.5 2-8 4.9l2.9 2.2c.7-2.2 2.7-3.75 5.1-3.75z"
              fill="#EB4335"
            />
          </svg>
          Continuar com Google
        </div>
      </div>

      <!-- Ícone de status (grande, animado) -->
      <div class="flex justify-center mb-6">
        <!-- LOADING — círculos pulsantes em forma de "scan" -->
        <div
          v-if="status === 'loading'"
          class="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)]"
        >
          <div class="absolute inset-0 rounded-2xl ring-2 ring-sky-400/40 ring-offset-0 animate-ping"></div>
          <svg
            class="h-9 w-9 text-white animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="3"
            ></circle>
            <path
              class="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"
            ></path>
          </svg>
        </div>

        <!-- SUCCESS — check desenhado com stroke-dasharray + ring pulse -->
        <div
          v-else-if="status === 'success'"
          class="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(16,185,129,0.55)] auth-success-pop"
        >
          <div
            class="absolute inset-0 rounded-2xl ring-2 ring-emerald-400/60 ring-offset-0 auth-success-ring"
          ></div>
          <svg
            class="h-10 w-10 text-white"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path class="auth-check-stroke" d="M14 27 l8 8 l16 -18" />
          </svg>
        </div>

        <!-- ERROR — X com stroke animado -->
        <div
          v-else
          class="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(244,63,94,0.55)] auth-success-pop"
        >
          <svg
            class="h-10 w-10 text-white"
            viewBox="0 0 52 52"
            fill="none"
            stroke="currentColor"
            stroke-width="6"
            stroke-linecap="round"
          >
            <path class="auth-check-stroke" d="M16 16 L36 36" />
            <path class="auth-check-stroke" d="M36 16 L16 36" style="animation-delay: 0.15s" />
          </svg>
        </div>
      </div>

      <!-- Texto -->
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ titles[status] }}</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
        {{ messages[status] }}
      </p>

      <!-- Lista de "passos" — só durante loading e success -->
      <ul v-if="status !== 'error'" class="mt-6 space-y-2 text-left">
        <li
          v-for="(step, i) in steps"
          :key="step.label"
          class="flex items-center gap-3 text-sm transition-all duration-300"
          :class="[
            currentStep >= i
              ? 'text-slate-900 dark:text-white opacity-100'
              : 'text-slate-400 dark:text-slate-500 opacity-60',
          ]"
        >
          <span
            class="h-5 w-5 rounded-full flex items-center justify-center shrink-0 transition-colors"
            :class="
              currentStep > i
                ? 'bg-emerald-500 text-white'
                : currentStep === i
                  ? 'bg-sky-500/20 text-sky-600 dark:text-cyan-300'
                  : 'bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-slate-500'
            "
          >
            <svg
              v-if="currentStep > i"
              width="12"
              height="12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M16.7 5.3l-9 9-3.4-3.4 1.4-1.4 2 2 7.6-7.6 1.4 1.4z" />
            </svg>
            <span
              v-else-if="currentStep === i"
              class="h-2 w-2 rounded-full bg-current animate-pulse"
            ></span>
            <span v-else class="text-[10px] font-bold">{{ i + 1 }}</span>
          </span>
          {{ step.label }}
        </li>
      </ul>

      <!-- Acções quando dá erro -->
      <div v-if="status === 'error'" class="mt-6 flex flex-col gap-2">
        <router-link
          to="/login"
          class="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)] hover:-translate-y-0.5 transition-all"
        >
          Voltar ao login
        </router-link>
      </div>
    </CardGlass>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import CardGlass from '@/components/neon/CardGlass.vue'

const route = useRoute()
const router = useRouter()

const status = ref<'loading' | 'success' | 'error'>('loading')

// Índice do passo activo na lista (avança à medida que cada etapa termina)
const currentStep = ref(0)

const steps = [
  { label: 'A validar credenciais com a Google' },
  { label: 'A confirmar conta no SGFM' },
  { label: 'A preparar o teu painel' },
]

const titles = {
  loading: 'A entrar no SGFM',
  success: 'Acesso autorizado',
  error: 'Não foi possível entrar',
}

const messages = {
  loading: 'Estamos a verificar a tua sessão Google e a preparar o painel.',
  success: 'Sessão iniciada com a tua conta Google. A redireccionar para o painel…',
  error: 'O login com a Google falhou. Tenta de novo a partir do ecrã de entrada.',
}

const TOKEN_KEY = 'sgfm_token'
const USER_KEY = 'sgfm_user'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  const token = route.query.token as string | undefined
  const isNew = route.query.new === '1' || route.query.new === 'true'
  const error = route.query.error as string | undefined

  if (error || !token) {
    status.value = 'error'
    return
  }

  // Passo 1 → guardar token (já validado pelo backend antes de redireccionar)
  await sleep(400)
  localStorage.setItem(TOKEN_KEY, token)
  currentStep.value = 1

  // Passo 2 → confirmar conta no SGFM (chamar /me)
  try {
    const { data } = await api.get('/auth/me')
    const user = data?.data?.user ?? data?.data
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    await sleep(400)
    currentStep.value = 2
  } catch {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    status.value = 'error'
    return
  }

  // Passo 3 → preparar painel + completar
  await sleep(500)
  currentStep.value = 3
  status.value = 'success'

  // Redirect após o check "pousar" visualmente
  setTimeout(() => {
    router.replace(isNew ? '/complete-profile' : '/dashboard')
  }, 1100)
})
</script>

<style scoped>
/* Pop do ícone quando muda de loading → success/error */
.auth-success-pop {
  animation: auth-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes auth-pop {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Ring pulse à volta do ícone de sucesso */
.auth-success-ring {
  animation: auth-ring 1.8s ease-out infinite;
}
@keyframes auth-ring {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

/* Stroke desenhado do check / X (dasharray drawing effect) */
.auth-check-stroke {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: auth-draw 0.55s 0.1s ease-out forwards;
}
@keyframes auth-draw {
  to {
    stroke-dashoffset: 0;
  }
}
</style>
