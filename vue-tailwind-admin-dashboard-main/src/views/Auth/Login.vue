<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand / storytelling -->
      <div class="hidden lg:block">
        <AuthBrandPanel visual="live" />
      </div>

      <!-- RIGHT — form -->
      <div class="relative flex flex-col">
        <!-- Top bar (in-flow to prevent overlap with the form content) -->
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
            <!-- Mobile logo -->
            <router-link to="/" class="inline-flex items-center mb-8 lg:hidden">
              <AppLogo full imgClass="h-10 w-auto max-w-[180px]" :width="150" :height="40" />
            </router-link>

            <div class="mb-8">
              <h1
                class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              >
                Bem-vindo <span class="sgfm-gradient-text">de volta</span>
              </h1>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Inicie sessão para retomar o controlo do fundo de maneio da sua organização.
              </p>
            </div>

            <button
              type="button"
              @click="signInWithGoogle"
              class="w-full inline-flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] hover:bg-slate-50 dark:hover:bg-white/[0.08] text-slate-700 dark:text-white text-sm font-medium transition shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
            </button>

            <div class="flex items-center gap-3 my-6">
              <div class="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
              <span class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                ou com e-mail
              </span>
              <div class="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
            </div>

            <!--
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              FORM com validação automática via PrimeVue Forms + Zod
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

              <Form>
                - resolver: a função que valida os values contra o schema Zod
                - initial-values: estado inicial de cada campo
                - @submit: handler que recebe { valid, values, errors }
                - O slot v-slot="$form" expõe o estado global do form (não usado aqui)

              <FormField name="...">
                - name: tem de bater com a chave no schema Zod
                - O slot v-slot="$field" expõe:
                    $field.props      → modelValue + onUpdate:modelValue + onBlur (spread no input)
                    $field.invalid    → true se foi tocado E tem erro
                    $field.error      → objecto com .message quando inválido
                - O touched é gerido sozinho: só fica invalid depois do user tocar
                  ou depois de carregar em "Iniciar sessão"
            -->
            <Form
              :resolver="resolver"
              :initial-values="{ login: '', password: '' }"
              @submit="onFormSubmit"
              class="space-y-4"
            >
              <!-- Campo: login (e-mail ou telefone) -->
              <FormField v-slot="$field" name="login">
                <InputNeon
                  v-bind="$field.props"
                  id="login"
                  label="E-mail ou telefone"
                  placeholder="nome@empresa.com ou +258…"
                  autocomplete="username"
                  required
                  :error="$field.invalid ? $field.error?.message : undefined"
                />
              </FormField>

              <!-- Campo: password -->
              <FormField v-slot="$field" name="password">
                <InputNeon
                  v-bind="$field.props"
                  id="password"
                  label="Palavra-passe"
                  placeholder="Pelo menos 4 caracteres"
                  type="password"
                  autocomplete="current-password"
                  required
                  :error="$field.invalid ? $field.error?.message : undefined"
                />
              </FormField>

              <!--
                Estes dois itens (remember + esqueci) ficam FORA do <FormField>:
                - "Manter sessão" é um ref local sem validação
                - O link "Esqueceu a palavra-passe?" é navegação, não input
              -->
              <div class="flex items-center justify-between text-sm">
                <label
                  class="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                >
                  <input
                    v-model="remember"
                    type="checkbox"
                    class="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-500/50 dark:border-white/20 dark:bg-white/5 dark:text-cyan-400"
                  />
                  Manter a sessão iniciada
                </label>
                <router-link
                  to="/forgot-password"
                  class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200 transition"
                >
                  Esqueceu a palavra-passe?
                </router-link>
              </div>

              <ButtonNeon type="submit" block :loading="loading" variant="primary">
                Iniciar sessão
              </ButtonNeon>
            </Form>

            <p class="mt-8 text-sm text-center text-slate-600 dark:text-slate-400">
              Ainda não tem uma conta?
              <router-link
                to="/register"
                class="text-sky-600 hover:text-sky-700 dark:text-cyan-300 dark:hover:text-cyan-200 font-medium ml-1"
              >
                Criar conta
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

// PrimeVue Forms + Zod
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

// Inputs / wrappers da app
import InputNeon from '@/components/neon/InputNeon.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import AuthBrandPanel from '@/components/landing/AuthBrandPanel.vue'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import AppLogo from '@/components/common/AppLogo.vue'

// Serviços + composables
import { useToast } from '@/composables/useToast'
import { login as doLogin } from '@/services/auth'
import { API_BASE_URL } from '@/services/api'

const router = useRouter()
const toast = useToast()

// Estado da UI — só o que NÃO é gerido pelo Form
const loading = ref(false)
const remember = ref(false)

// ──────────────────────────────────────────────────────────
// SCHEMA — define as regras de validação em forma declarativa.
// Cada chave (login, password) corresponde a um <FormField name="..." />
// no template. As mensagens em z.* aparecem em $field.error.message.
// ──────────────────────────────────────────────────────────
const schema = z.object({
  login: z
    .string()
    .min(1, 'Indique o e-mail ou o telefone')
    .regex(/^([^\s@]+@[^\s@]+\.[^\s@]+|\+?\d[\d\s-]{5,})$/, 'Formato inválido'),
  password: z.string().min(1, 'Informe a palavra-passe').min(4, 'Mínimo de 4 caracteres'),
})

// O resolver é uma adapter que liga o schema Zod ao PrimeVue Forms.
// É passado para o <Form :resolver="resolver">.
const resolver = zodResolver(schema)

// Tipo dos valores que o form devolve no submit (inferido do schema).
type LoginValues = z.infer<typeof schema>

// ──────────────────────────────────────────────────────────
// SUBMIT — chamado pelo <Form @submit="...">.
// O PrimeVue Forms só nos dá o controlo DEPOIS de validar tudo.
// Se houver erros, valid=false e nem fazemos chamada à API.
// ──────────────────────────────────────────────────────────
async function onFormSubmit(event: FormSubmitEvent) {
  // O PrimeVue Forms tipa `values` como Record<string, any> (genérico).
  // Como nós já validámos contra o nosso schema Zod, podemos
  // afirmar com segurança o tipo concreto LoginValues.
  if (!event.valid) return // erros já estão a ser mostrados pelos $field.invalid
  const values = event.values as LoginValues

  loading.value = true
  try {
    await doLogin(values.login, values.password)
    toast.success('Bem-vindo ao SGFM', 'Sessão iniciada com sucesso.')
    router.push('/dashboard')
  } catch (err: unknown) {
    const msg = extractBackendError(err, 'Não foi possível iniciar sessão.')
    toast.error('Falha na autenticação', msg)
  } finally {
    loading.value = false
  }
}

// ──────────────────────────────────────────────────────────
// Helper para extrair a mensagem mais útil de um erro do Laravel.
//
// O backend responde em formatos diferentes consoante o caso:
//
//   422 Validation Error:
//   { success: false,
//     message: "Dados inválidos",
//     errors: { login: ["Credenciais inválidas."] } }
//
//   500 / outras:
//   { message: "Algo correu mal." }
//
// Ordem de preferência:
//   1. errors.<campo>[0]  — o mais específico (ex: "Credenciais inválidas.")
//   2. message            — o genérico (ex: "Dados inválidos")
//   3. err.message        — erro JS puro (sem ser Axios)
//   4. fallback           — texto default da view
// ──────────────────────────────────────────────────────────
function extractBackendError(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined

    // 1. Preferir mensagens específicas por campo
    //    (devolve o primeiro erro do primeiro campo que tenha erros)
    if (data?.errors) {
      for (const field of Object.keys(data.errors)) {
        const messages = data.errors[field]
        if (messages && messages.length > 0) return messages[0]
      }
    }

    // 2. Cair na mensagem genérica
    if (typeof data?.message === 'string') return data.message
  }
  if (err instanceof Error) return err.message
  return fallback
}

// Login via Google (redirect ao backend que faz OAuth)
function signInWithGoogle() {
  window.location.href = `${API_BASE_URL}auth/google/redirect`
}
</script>
