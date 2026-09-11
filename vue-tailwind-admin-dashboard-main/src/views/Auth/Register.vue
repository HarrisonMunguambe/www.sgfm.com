<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand / storytelling -->
      <div class="hidden lg:block">
        <AuthBrandPanel visual="setup" :visual-step="step" />
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
          <div class="w-full max-w-lg sgfm-rise">
            <!-- Mobile logo -->
            <router-link to="/" class="inline-flex items-center mb-6 lg:hidden">
              <AppLogo full imgClass="h-10 w-auto max-w-[180px]" :width="150" :height="40" />
            </router-link>

            <!-- Stepper -->
            <AuthStepper :steps="stepperSteps" :current="step" class="mb-10" />

            <transition name="step" mode="out-in">
              <!-- ============================= STEP 1 ============================= -->
              <div v-if="step === 1" key="1">
                <div class="mb-6">
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Criar a sua conta SGFM
                  </h1>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Começamos pelos dados básicos. Demora menos de 1 minuto.
                  </p>
                </div>

                <form @submit.prevent="submitStep1" class="space-y-5" novalidate>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <InputNeon
                      id="reg-email"
                      v-model="s1.email"
                      label="E-mail"
                      type="email"
                      :error="e1.email"
                      required
                      autocomplete="email"
                      @blur="validate1('email')"
                    />
                    <PhoneInput
                      id="reg-phone"
                      v-model="s1.phone"
                      label="Telefone"
                      :error="e1.phone"
                      required
                      @blur="validate1('phone')"
                    />
                  </div>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <InputNeon
                      id="reg-pass"
                      v-model="s1.password"
                      label="Palavra-passe"
                      type="password"
                      :error="e1.password"
                      required
                      hint="Use letras, números e símbolos"
                      @blur="validate1('password')"
                    />
                    <InputNeon
                      id="reg-pass2"
                      v-model="s1.password_confirmation"
                      label="Confirmar palavra-passe"
                      type="password"
                      :error="e1.password_confirmation"
                      required
                      @blur="validate1('password_confirmation')"
                    />
                  </div>

                  <FloatLabel variant="on">
                    <Select
                      id="reg-secq"
                      v-model="s1.security_question"
                      :options="securityQuestions"
                      class="w-full"
                      :invalid="!!e1.security_question"
                      @blur="validate1('security_question')"
                    />
                    <label for="reg-secq">
                      Pergunta de segurança<span class="text-rose-500 ml-0.5">*</span>
                    </label>
                  </FloatLabel>
                  <p v-if="e1.security_question" class="-mt-3 text-xs text-rose-500">
                    {{ e1.security_question }}
                  </p>

                  <label
                    class="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none"
                  >
                    <Checkbox
                      v-model="s1.terms"
                      binary
                      input-id="reg-terms"
                      @change="validate1('terms')"
                    />
                    <span>
                      Aceito os
                      <a
                        class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                        href="#"
                        >Termos de Serviço</a
                      >
                      e a
                      <a
                        class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                        href="#"
                        >Política de Privacidade</a
                      >.
                    </span>
                  </label>
                  <p v-if="e1.terms" class="-mt-3 text-xs text-rose-500">{{ e1.terms }}</p>

                  <ButtonNeon type="submit" block :loading="loading" variant="primary">
                    Continuar
                  </ButtonNeon>

                  <p class="text-sm text-center text-slate-600 dark:text-slate-400 pt-2">
                    Já tem conta?
                    <router-link
                      to="/login"
                      class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200 font-medium"
                    >
                      Iniciar sessão
                    </router-link>
                  </p>
                </form>
              </div>

              <!-- ============================= STEP 2 ============================= -->
              <div v-else-if="step === 2" key="2">
                <div class="mb-6">
                  <div
                    class="inline-flex h-14 w-14 rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 items-center justify-center sgfm-neon-violet mb-4"
                  >
                    <svg width="26" height="26" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3zm0 7a1.5 1.5 0 01.5 2.9V15a.5.5 0 01-1 0v-1.1A1.5 1.5 0 0110 11z"
                      />
                    </svg>
                  </div>
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Verificação em duas etapas
                  </h1>
                  <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    Enviámos um código de 6 dígitos para
                    <span class="text-slate-900 dark:text-white font-medium">{{
                      s1.email || 'o seu e-mail'
                    }}</span>
                    e por SMS para
                    <span class="text-slate-900 dark:text-white font-medium">{{
                      s1.phone || 'o seu telefone'
                    }}</span
                    >.
                  </p>
                  <p class="mt-2 text-xs text-sky-600 dark:text-cyan-300/80">
                    Sugestão de teste: use o código <b>123456</b>
                  </p>
                </div>

                <form @submit.prevent="submitStep2" class="space-y-5">
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
                    Verificar
                  </ButtonNeon>

                  <div
                    class="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400"
                  >
                    <button
                      type="button"
                      class="hover:text-sky-600 dark:hover:text-cyan-300 transition"
                      @click="step = 1"
                    >
                      ← Alterar dados
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

              <!-- ============================= STEP 3 ============================= -->
              <div v-else key="3">
                <div class="mb-6">
                  <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
                    Quase lá! Complete o seu perfil
                  </h1>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    Esta informação ajuda a direcionar requisições e aprovações.
                  </p>
                </div>

                <form @submit.prevent="submitStep3" class="space-y-5">
                  <InputNeon
                    id="reg-fullname"
                    v-model="s3.full_name"
                    label="Nome completo"
                    :error="e3.full_name"
                    required
                    autocomplete="name"
                    @blur="validate3('full_name')"
                  />

                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <FloatLabel variant="on">
                        <Select
                          id="reg-dept"
                          v-model="s3.department_id"
                          :options="departments"
                          option-label="name"
                          option-value="id"
                          :loading="loadingOptions"
                          :invalid="!!e3.department_id"
                          class="w-full"
                          @blur="validate3('department_id')"
                        />
                        <label for="reg-dept">
                          Departamento<span class="text-rose-500 ml-0.5">*</span>
                        </label>
                      </FloatLabel>
                      <p v-if="e3.department_id" class="mt-1.5 text-xs text-rose-500">
                        {{ e3.department_id }}
                      </p>
                    </div>

                    <div>
                      <FloatLabel variant="on">
                        <Select
                          id="reg-role"
                          v-model="s3.role_id"
                          :options="roles"
                          option-label="name"
                          option-value="id"
                          :loading="loadingOptions"
                          :invalid="!!e3.role_id"
                          class="w-full"
                          @blur="validate3('role_id')"
                        />
                        <label for="reg-role">
                          Cargo<span class="text-rose-500 ml-0.5">*</span>
                        </label>
                      </FloatLabel>
                      <p v-if="e3.role_id" class="mt-1.5 text-xs text-rose-500">{{ e3.role_id }}</p>
                    </div>
                  </div>

                  <PhoneInput
                    id="reg-altphone"
                    v-model="s3.alt_phone"
                    label="Telefone alternativo (opcional)"
                  />

                  <ButtonNeon type="submit" block :loading="loading" variant="primary" class="mt-2">
                    Concluir registo
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
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputNeon from '@/components/neon/InputNeon.vue'
import PhoneInput from '@/components/neon/PhoneInput.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import AuthBrandPanel from '@/components/landing/AuthBrandPanel.vue'
import AuthStepper from '@/components/landing/AuthStepper.vue'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import AppLogo from '@/components/common/AppLogo.vue'
import Select from 'primevue/select'
import Checkbox from 'primevue/checkbox'
import InputOtp from 'primevue/inputotp'
import FloatLabel from 'primevue/floatlabel'
import { useToast } from '@/composables/useToast'
import {
  fetchDepartments,
  fetchRoles,
  registerStep1,
  registerStep3,
  verifyOtp,
} from '@/services/auth'

const router = useRouter()
const toast = useToast()

const step = ref(1)
const loading = ref(false)

const stepperSteps = [
  {
    label: 'Credenciais',
    hint: 'E-mail e palavra-passe',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a4 4 0 100 8 4 4 0 000-8zm0 10c-3.3 0-6 2.7-6 6h12c0-3.3-2.7-6-6-6z"/></svg>',
  },
  {
    label: 'Verificação',
    hint: 'Código OTP',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a5 5 0 00-5 5v2H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-1V7a5 5 0 00-5-5zm0 2a3 3 0 013 3v2H7V7a3 3 0 013-3z"/></svg>',
  },
  {
    label: 'Perfil',
    hint: 'Departamento e cargo',
    icon: '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1zm2 3v2h10V7H5zm0 4v2h10v-2H5zm0 4v1h6v-1H5z"/></svg>',
  },
]

const securityQuestions = [
  'Qual o nome do seu primeiro animal de estimação?',
  'Qual o nome da sua cidade natal?',
  'Qual o nome da sua mãe em solteira?',
  'Qual o nome da sua primeira escola?',
]

// Step 1
const s1 = reactive({
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  terms: false,
  security_question: '',
})
const e1 = reactive<Record<string, string | undefined>>({})
function validate1(f: string) {
  if (f === 'email')
    e1.email = !s1.email
      ? 'Indique o e-mail'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)
        ? undefined
        : 'E-mail inválido'
  if (f === 'phone')
    e1.phone = !s1.phone
      ? 'Informe o telefone'
      : /^\d{9}$/.test(s1.phone)
        ? undefined
        : 'Telefone deve ter 9 dígitos'
  if (f === 'password')
    e1.password = !s1.password
      ? 'Informe a palavra-passe'
      : s1.password.length < 8
        ? 'Mínimo 8 caracteres'
        : undefined
  if (f === 'password_confirmation')
    e1.password_confirmation =
      s1.password_confirmation !== s1.password ? 'As palavras-passe não coincidem' : undefined
  if (f === 'security_question')
    e1.security_question = !s1.security_question ? 'Selecione uma pergunta' : undefined
  if (f === 'terms') e1.terms = !s1.terms ? 'Deve aceitar os termos' : undefined
}
function validate1All() {
  ;['email', 'phone', 'password', 'password_confirmation', 'security_question', 'terms'].forEach(
    validate1,
  )
  return Object.values(e1).every((v) => !v)
}

async function submitStep1() {
  if (!validate1All()) return
  loading.value = true
  try {
    await registerStep1({ ...s1 })
    toast.success('Código enviado', 'Verifique o e-mail e SMS.')
    step.value = 2
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao processar registo'
    toast.error('Não foi possível continuar', msg)
  } finally {
    loading.value = false
  }
}

// Step 2 — OTP via PrimeVue
const otpCode = ref('')
const otpError = ref('')

async function submitStep2() {
  if (otpCode.value.length !== 6) {
    otpError.value = 'Introduza os 6 dígitos'
    return
  }
  loading.value = true
  try {
    await verifyOtp(otpCode.value)
    toast.success('Código verificado', 'Agora complete o seu perfil')
    step.value = 3
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Código inválido'
    otpError.value = msg
  } finally {
    loading.value = false
  }
}

function resend() {
  toast.info('Código reenviado', 'Verifique novamente o e-mail e SMS.')
}

// Step 3
const departments = ref<{ id: number; name: string }[]>([])
const roles = ref<{ id: number; name: string }[]>([])
const loadingOptions = ref(false)

const s3 = reactive({
  full_name: '',
  department_id: null as number | null,
  role_id: null as number | null,
  alt_phone: '',
})
const e3 = reactive<Record<string, string | undefined>>({})
function validate3(f: string) {
  if (f === 'full_name')
    e3.full_name = !s3.full_name
      ? 'Informe o nome completo'
      : s3.full_name.trim().split(' ').length < 2
        ? 'Informe nome e apelido'
        : undefined
  if (f === 'department_id')
    e3.department_id = !s3.department_id ? 'Selecione o departamento' : undefined
  if (f === 'role_id') e3.role_id = !s3.role_id ? 'Selecione o cargo' : undefined
}
function validate3All() {
  ;['full_name', 'department_id', 'role_id'].forEach(validate3)
  return Object.values(e3).every((v) => !v)
}

async function submitStep3() {
  if (!validate3All()) return
  loading.value = true
  try {
    await registerStep3({ ...s3 })
    toast.success('Conta criada', 'Bem-vindo ao SGFM')
    router.push('/dashboard')
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erro ao concluir registo'
    toast.error('Falha ao criar conta', msg)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  loadingOptions.value = true
  try {
    const [d, r] = await Promise.all([fetchDepartments(), fetchRoles()])
    departments.value = d
    roles.value = r
  } finally {
    loadingOptions.value = false
  }
})
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
