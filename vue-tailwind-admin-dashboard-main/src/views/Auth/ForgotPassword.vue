<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand -->
      <div class="hidden lg:block">
        <AuthBrandPanel visual="recover" :visual-step="step" />
      </div>

      <!-- RIGHT — form -->
      <div class="relative flex flex-col">
        <!-- Top bar (in-flow to prevent overlap with stepper/form content) -->
        <div class="flex items-center justify-end gap-3 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 lg:pt-6">
          <router-link
            to="/"
            class="group hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/60 px-3.5 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-sm shadow-[0_2px_8px_-2px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-sky-300 hover:bg-white hover:text-sky-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(14,165,233,0.35)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-cyan-300/40 dark:hover:bg-white/10 dark:hover:text-cyan-300 dark:hover:shadow-[0_8px_20px_-6px_rgba(34,211,238,0.35)]"
          >
            <svg
              class="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17 10H5l4-4-1.4-1.4L1.2 11l6.4 6.4L9 16l-4-4h12z" />
            </svg>
            Voltar ao início
          </router-link>
          <ThemeToggle />
        </div>

        <!-- Content centered in remaining vertical space -->
        <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <div class="w-full max-w-md sgfm-rise">
            <router-link to="/" class="inline-flex items-center mb-6 lg:hidden">
              <AppLogo full imgClass="h-10 w-auto max-w-[180px]" :width="150" :height="40" />
            </router-link>

            <AuthStepper :steps="stepperSteps" :current="step" class="mb-10" />

            <transition name="step" mode="out-in">
              <!-- STEP 1: email -->
              <div v-if="step === 1" key="1">
                <div class="mb-6">
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Esqueceu a palavra-passe?
                  </h1>
                  <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Indique o e-mail associado à sua conta e enviaremos um código de recuperação.
                  </p>
                </div>

                <form @submit.prevent="submitEmail" class="space-y-5" novalidate>
                  <InputNeon
                    id="fp-email"
                    v-model="email"
                    label="E-mail"
                    type="email"
                    :error="emailError"
                    required
                    autocomplete="email"
                    @blur="validateEmail"
                  />

                  <ButtonNeon type="submit" block :loading="loading" variant="primary">
                    Enviar código
                  </ButtonNeon>

                  <p class="text-sm text-center text-slate-600 dark:text-slate-400 pt-2">
                    Lembrou-se?
                    <router-link
                      to="/login"
                      class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200 font-medium ml-1"
                    >
                      Iniciar sessão
                    </router-link>
                  </p>
                </form>
              </div>

              <!-- STEP 2: OTP -->
              <div v-else-if="step === 2" key="2">
                <div class="mb-6">
                  <div
                    class="inline-flex h-14 w-14 rounded-2xl bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-300 items-center justify-center sgfm-neon-cyan mb-4"
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v8h12V6H4zm6 3l4-2H6l4 2z"
                      />
                    </svg>
                  </div>
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Introduza o código
                  </h1>
                  <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Enviámos um código de 6 dígitos para
                    <span class="text-slate-900 dark:text-white font-medium">{{ email }}</span
                    >. Válido por 10 minutos.
                  </p>
                  <p class="mt-2 text-xs text-sky-600 dark:text-cyan-300/80">
                    Sugestão de teste: use <b>123456</b>
                  </p>
                </div>

                <form @submit.prevent="submitOtp" class="space-y-5">
                  <div class="flex justify-center">
                    <InputOtp
                      v-model="otpCode"
                      :length="6"
                      integer-only
                      :pt="{ root: { class: 'gap-2 sm:gap-3' } }"
                    />
                  </div>

                  <p v-if="otpError" class="text-sm text-center text-rose-500">{{ otpError }}</p>

                  <ButtonNeon type="submit" block :loading="loading" variant="primary">
                    Verificar código
                  </ButtonNeon>

                  <div
                    class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
                  >
                    <button
                      type="button"
                      class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                      @click="step = 1"
                    >
                      ← Alterar e-mail
                    </button>
                    <button
                      type="button"
                      class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                      @click="resend"
                    >
                      Reenviar código
                    </button>
                  </div>
                </form>
              </div>

              <!-- STEP 3: nova senha -->
              <div v-else key="3">
                <div class="mb-6">
                  <div
                    class="inline-flex h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 items-center justify-center mb-4"
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z"
                      />
                    </svg>
                  </div>
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Definir nova palavra-passe
                  </h1>
                  <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Crie uma palavra-passe forte que ainda não tenha usado antes.
                  </p>
                </div>

                <form @submit.prevent="submitNewPassword" class="space-y-5">
                  <InputNeon
                    id="fp-newpass"
                    v-model="newPassword"
                    label="Nova palavra-passe"
                    type="password"
                    :error="newErrors.newPassword"
                    required
                    hint="Use letras, números e símbolos"
                    @blur="validateNew('newPassword')"
                  />

                  <InputNeon
                    id="fp-confirm"
                    v-model="confirmPassword"
                    label="Confirmar palavra-passe"
                    type="password"
                    :error="newErrors.confirmPassword"
                    required
                    @blur="validateNew('confirmPassword')"
                  />

                  <!-- Força da palavra-passe -->
                  <div class="pt-1">
                    <div class="flex items-center justify-between text-xs mb-1.5">
                      <span class="text-slate-600 dark:text-slate-400">Força da palavra-passe</span>
                      <span :class="['font-medium', strengthLabel.color]">
                        {{ strengthLabel.text }}
                      </span>
                    </div>
                    <div class="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                      <div
                        class="h-full transition-all duration-300"
                        :class="strengthLabel.bar"
                        :style="{ width: strength * 25 + '%' }"
                      ></div>
                    </div>
                  </div>

                  <ButtonNeon type="submit" block :loading="loading" variant="primary" class="mt-2">
                    Redefinir palavra-passe
                  </ButtonNeon>
                </form>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputNeon from '@/components/neon/InputNeon.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import AuthBrandPanel from '@/components/landing/AuthBrandPanel.vue'
import AuthStepper from '@/components/landing/AuthStepper.vue'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import AppLogo from '@/components/common/AppLogo.vue'
import InputOtp from 'primevue/inputotp'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const step = ref(1)
const loading = ref(false)

const stepperSteps = [
  {
    label: 'E-mail',
    hint: 'Identifique-se',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v8h12V6H4zm6 3l4-2H6l4 2z"/></svg>',
  },
  {
    label: 'Verificação',
    hint: 'Código OTP',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z"/></svg>',
  },
  {
    label: 'Nova palavra-passe',
    hint: 'Defina nova',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z"/></svg>',
  },
]

// ---------- STEP 1 ----------
const email = ref('')
const emailError = ref<string | undefined>()
function validateEmail() {
  if (!email.value) emailError.value = 'Indique o e-mail'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) emailError.value = 'E-mail inválido'
  else emailError.value = undefined
}

async function submitEmail() {
  validateEmail()
  if (emailError.value) return
  // TODO: chamar forgotPassword(email.value) do services/auth.ts
  toast.success('Código enviado', 'Verifique o seu e-mail.')
  step.value = 2
}

// ---------- STEP 2: OTP via PrimeVue ----------
const otpCode = ref('')
const otpError = ref('')

function submitOtp() {
  // O backend valida o OTP apenas no /password/reset (em conjunto com a nova
  // senha). Aqui só validamos o formato e avançamos para o ecrã final.
  if (otpCode.value.length !== 6) {
    otpError.value = 'Introduza os 6 dígitos'
    return
  }
  otpError.value = ''
  step.value = 3
}

function resend() {
  // TODO: chamar forgotPassword(email.value) do services/auth.ts
  toast.info('Código reenviado', 'Verifique o seu e-mail.')
}

// ---------- STEP 3: new password ----------
const newPassword = ref('')
const confirmPassword = ref('')
const newErrors = reactive<{ newPassword?: string; confirmPassword?: string }>({})

const strength = computed(() => {
  const p = newPassword.value
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++
  if (/\d/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthLabel = computed(() => {
  switch (strength.value) {
    case 0:
    case 1:
      return {
        text: 'Fraca',
        color: 'text-rose-600 dark:text-rose-400',
        bar: 'bg-gradient-to-r from-rose-400 to-rose-500',
      }
    case 2:
      return {
        text: 'Média',
        color: 'text-amber-600 dark:text-amber-400',
        bar: 'bg-gradient-to-r from-amber-400 to-orange-500',
      }
    case 3:
      return {
        text: 'Boa',
        color: 'text-sky-600 dark:text-cyan-300',
        bar: 'bg-gradient-to-r from-sky-400 to-indigo-500',
      }
    default:
      return {
        text: 'Excelente',
        color: 'text-emerald-600 dark:text-emerald-400',
        bar: 'bg-gradient-to-r from-emerald-400 to-teal-500',
      }
  }
})

function validateNew(f: 'newPassword' | 'confirmPassword') {
  if (f === 'newPassword') {
    newErrors.newPassword = !newPassword.value
      ? 'Informe a nova palavra-passe'
      : newPassword.value.length < 8
        ? 'Mínimo 8 caracteres'
        : undefined
  }
  if (f === 'confirmPassword') {
    newErrors.confirmPassword =
      confirmPassword.value !== newPassword.value ? 'As palavras-passe não coincidem' : undefined
  }
}

async function submitNewPassword() {
  validateNew('newPassword')
  validateNew('confirmPassword')
  if (newErrors.newPassword || newErrors.confirmPassword) return
  loading.value = true
  try {
    // TODO: chamar resetPassword({ email, otp, password, password_confirmation })
    toast.success('Palavra-passe redefinida', 'Pode agora iniciar sessão com a nova palavra-passe.')
    setTimeout(() => router.push('/login'), 600)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.35s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
