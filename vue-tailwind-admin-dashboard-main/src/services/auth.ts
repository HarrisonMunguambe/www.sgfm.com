// ──────────────────────────────────────────────────────────
// Camada de auth — a IMPLEMENTAR seguindo o guia (Pinia + types/auth.ts)
//
// O que está pronto:
//   - Tipos partilhados (AuthUser, RegisterStep1Input, RegisterStep3Input)
//   - Helpers de sessão local (getStoredUser, getStoredToken, isAuthenticated)
//   - Função logout local (só limpa o localStorage)
//
// O que falta TU implementares:
//   - login, registerStep1, verifyOtp, registerStep3
//   - forgotPassword, resetPassword
//   - fetchDepartments, fetchRoles
//
// Todas as funções "TODO" lançam erro propositadamente para deixar claro
// quando estão a ser chamadas sem implementação. Quando ligares ao backend,
// substituis cada `throw` por `await api.post(...)` / `api.get(...)`.
// ──────────────────────────────────────────────────────────

// ──────────────────────────────────────────────────────────
// Tipos partilhados
// ──────────────────────────────────────────────────────────

// Inicio de desenvolvimento

//  aqui e onde tenho as rotas ao backend
import api from '@/services/api'
// aqui e onde tenho os tipos do backend - a tal tipagem do typescript
import type { ApiSuccess, AuthUser,LoginPayload, LoginResponse } from '@/types/auth'
// para poder usar dados tipados de AuthUser em outras views, exporto o tipo AuthUser
export type { AuthUser }

// import do reccptcha
import {useRecaptcha} from '@/composables/useRecaptcha'

// ──────────────────────────────────────────────────────────
// Sessão local (sem backend) — usado pelo navbar, router, etc.
// ──────────────────────────────────────────────────────────


const { executeRecaptcha } = useRecaptcha()


const TOKEN_KEY = 'sgfm_token'
const USER_KEY = 'sgfm_user'

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getStoredToken()
}

// Logout local — limpa a sessão. Substitui pela versão que também chama
// /auth/logout quando ligares ao backend.
export async function logout(): Promise<void> {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

// ──────────────────────────────────────────────────────────
// TODO: ligar ao backend (POST /api/v1/auth/login)
// ──────────────────────────────────────────────────────────
export async function login(loginField: string, password: string): Promise<AuthUser> {

  const payload: LoginPayload = {
    login: loginField,
    password: password,
    recaptcha_token: 'recaptchaToken'
  }
  const { data } = await api.post<ApiSuccess<LoginResponse>>('auth/login', payload)

  // guardar token e user no localStorage
  localStorage.setItem(TOKEN_KEY, data.data.token)
  localStorage.setItem(USER_KEY, JSON.stringify(data.data.user))

  // retornar o user tipado para a view que chamou login()
  return data.data.user

}
