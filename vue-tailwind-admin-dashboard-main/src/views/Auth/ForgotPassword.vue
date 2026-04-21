<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand -->
      <div class="hidden lg:block">
        <AuthBrandPanel
          tag="Recuperar acesso"
          title="Esqueceu a senha?"
          titleAccent="Sem stress."
          description="Em três passos rápidos volta a ter acesso ao seu SGFM. Tudo seguro: verificação por OTP e auditoria completa."
          :bullets="[
            'Código de verificação por email e SMS',
            'Política de senhas robusta com validação em tempo real',
            'A sua conta mantém-se auditada em cada passo',
          ]"
        />
      </div>

      <!-- RIGHT — form -->
      <div class="relative flex items-center justify-center px-4 py-20 sm:p-10">
        <div class="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <router-link
            to="/login"
            class="hidden sm:inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-cyan-300 transition text-sm"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17 10H5l4-4-1.4-1.4L1.2 11l6.4 6.4L9 16l-4-4h12z" />
            </svg>
            Voltar ao login
          </router-link>
        </div>

        <div class="w-full max-w-md sgfm-rise">
          <router-link to="/" class="inline-flex items-center gap-2 mb-6 lg:hidden">
            <div
              class="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white"
            >
              S
            </div>
            <span class="text-slate-900 dark:text-white font-semibold text-lg">SGFM</span>
          </router-link>

          <AuthStepper :steps="stepperSteps" :current="step" class="mb-10" />

          <transition name="step" mode="out-in">
            <!-- STEP 1: email -->
            <div v-if="step === 1" key="1">
              <div class="mb-6">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Esqueceu a senha?</h1>
                <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Informe o email associado à sua conta e enviaremos um código de recuperação.
                </p>
              </div>

              <form @submit.prevent="submitEmail" class="space-y-5" novalidate>
                <InputNeon
                  id="fp-email"
                  v-model="email"
                  label="Email"
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
                    Entrar
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
                  Dica de teste: use <b>123456</b>
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
                    ← Alterar email
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
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Definir nova senha</h1>
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

                <!-- Força da senha -->
                <div class="pt-1">
                  <div class="flex items-center justify-between text-xs mb-1.5">
                    <span class="text-slate-600 dark:text-slate-400">Força da senha</span>
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
import InputOtp from 'primevue/inputotp'
import { useToast } from '@/composables/useToast'

const MOCK_OTP = '123456'
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const router = useRouter()
const toast = useToast()

const step = ref(1)
const loading = ref(false)

const stepperSteps = [
  {
    label: 'Email',
    hint: 'Identifique-se',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v8h12V6H4zm6 3l4-2H6l4 2z"/></svg>',
  },
  {
    label: 'Verificação',
    hint: 'Código OTP',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z"/></svg>',
  },
  {
    label: 'Nova senha',
    hint: 'Defina nova',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z"/></svg>',
  },
]

// ---------- STEP 1 ----------
const email = ref('')
const emailError = ref<string | undefined>()
function validateEmail() {
  if (!email.value) emailError.value = 'Informe o email'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) emailError.value = 'Email inválido'
  else emailError.value = undefined
}

async function submitEmail() {
  validateEmail()
  if (emailError.value) return
  loading.value = true
  try {
    await wait(700)
    toast.success('Código enviado', 'Verifique o seu email e SMS')
    step.value = 2
  } finally {
    loading.value = false
  }
}

// ---------- STEP 2: OTP via PrimeVue ----------
const otpCode = ref('')
const otpError = ref('')

async function submitOtp() {
  if (otpCode.value.length !== 6) {
    otpError.value = 'Introduza os 6 dígitos'
    return
  }
  loading.value = true
  try {
    await wait(600)
    if (otpCode.value !== MOCK_OTP) {
      otpError.value = 'Código inválido'
      return
    }
    toast.success('Código verificado', 'Agora defina a nova palavra-passe')
    step.value = 3
  } finally {
    loading.value = false
  }
}

function resend() {
  toast.info('Código reenviado', 'Verifique novamente email e SMS')
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
      confirmPassword.value !== newPassword.value
        ? 'As palavras-passe não coincidem'
        : undefined
  }
}

async function submitNewPassword() {
  validateNew('newPassword')
  validateNew('confirmPassword')
  if (newErrors.newPassword || newErrors.confirmPassword) return
  loading.value = true
  try {
    await wait(800)
    toast.success('Palavra-passe redefinida', 'Pode agora entrar com a nova senha')
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
