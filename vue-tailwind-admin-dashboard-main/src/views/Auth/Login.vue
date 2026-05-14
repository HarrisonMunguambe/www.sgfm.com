<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand / storytelling -->
      <div class="hidden lg:block">
        <AuthBrandPanel
          tag="Inicie sessão no SGFM"
          title="Bem-vindo"
          titleAccent="de volta."
          description="Retome ao controlo do fundo de maneio da sua organização, com acesso rápido, seguro e inteligente."
          :bullets="[
            'Painel em tempo real com saldo e movimentos',
            'Aprovações com um clique em qualquer dispositivo',
            'Auditoria completa e informações com IA incluídas',
          ]"
        />
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
              <h1 class="text-3xl font-bold text-slate-900 dark:text-white">Iniciar sessão</h1>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Introduza as suas credenciais para continuar.
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

            <form @submit.prevent="onSubmit" class="space-y-4" novalidate>
              <InputNeon
                id="login"
                v-model="form.login"
                label="E-mail ou telefone"
                placeholder="nome@empresa.com ou +258…"
                :error="errors.login"
                required
                autocomplete="username"
                @blur="validateField('login')"
              />

              <InputNeon
                id="password"
                v-model="form.password"
                label="Palavra-passe"
                placeholder="Pelo menos 4 caracteres"
                type="password"
                :error="errors.password"
                required
                autocomplete="current-password"
                @blur="validateField('password')"
              />

              <div class="flex items-center justify-between text-sm">
                <label
                  class="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                >
                  <input
                    v-model="form.remember"
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
            </form>

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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputNeon from '@/components/neon/InputNeon.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import AuthBrandPanel from '@/components/landing/AuthBrandPanel.vue'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import AppLogo from '@/components/common/AppLogo.vue'
import { useToast } from '@/composables/useToast'
import { login as doLogin } from '@/services/auth'
import { API_BASE_URL } from '@/services/api'

const router = useRouter()
const toast = useToast()

const form = reactive({ login: '', password: '', remember: false })
const errors = reactive<{ login?: string; password?: string }>({})
const loading = ref(false)

function validateField(f: 'login' | 'password') {
  if (f === 'login') {
    if (!form.login) errors.login = 'Indique o e-mail ou o telefone'
    else if (!/^([^\s@]+@[^\s@]+\.[^\s@]+|\+?\d[\d\s-]{5,})$/.test(form.login))
      errors.login = 'Formato inválido'
    else errors.login = undefined
  }
  if (f === 'password') {
    if (!form.password) errors.password = 'Informe a palavra-passe'
    else if (form.password.length < 4) errors.password = 'Mínimo de 4 caracteres'
    else errors.password = undefined
  }
}

function validateAll() {
  validateField('login')
  validateField('password')
  return !errors.login && !errors.password
}

async function onSubmit() {
  if (!validateAll()) return
  loading.value = true
  try {
    await doLogin(form.login, form.password)
    toast.success('Bem-vindo ao SGFM', 'Sessão iniciada com sucesso.')
    router.push('/dashboard')
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Não foi possível iniciar sessão.'
    toast.error('Falha na autenticação', msg)
  } finally {
    loading.value = false
  }
}

function signInWithGoogle() {
  window.location.href = `${API_BASE_URL}/auth/google/redirect`
}
</script>
