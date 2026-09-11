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

// ──────────────────────────────────────────────────────────
// STUBS — funções que o Register.vue/ForgotPassword.vue importam.
// Existem só para o módulo carregar. Quando ligares cada uma ao backend,
// substituis o corpo por uma chamada `await api.post(...)` / `api.get(...)`.
// ──────────────────────────────────────────────────────────

// Tipos das payloads aceites pelas views (mesmo formato que já enviam)
export interface RegisterStep1Input {
  email: string
  phone: string
  password: string
  password_confirmation: string
  terms: boolean
  security_question: string
}

export interface RegisterStep3Input {
  full_name: string
  department_id: number | null
  role_id: number | null
  alt_phone?: string
}

// TODO: POST /api/v1/auth/register/step1
export async function registerStep1(payload: RegisterStep1Input): Promise<{ ok: true }> {
  void payload
  throw new Error('registerStep1() ainda não está implementado.')
}

// TODO: POST /api/v1/auth/register/step2
export async function verifyOtp(code: string): Promise<{ ok: true }> {
  void code
  throw new Error('verifyOtp() ainda não está implementado.')
}

// TODO: POST /api/v1/auth/register/step3
export async function registerStep3(payload: RegisterStep3Input): Promise<AuthUser> {
  void payload
  throw new Error('registerStep3() ainda não está implementado.')
}

// TODO: POST /api/v1/auth/password/forgot
export async function forgotPassword(email: string): Promise<{ ok: true }> {
  void email
  throw new Error('forgotPassword() ainda não está implementado.')
}

// TODO: POST /api/v1/auth/password/reset
export async function resetPassword(payload: {
  email: string
  otp: string
  password: string
  password_confirmation: string
}): Promise<{ ok: true }> {
  void payload
  throw new Error('resetPassword() ainda não está implementado.')
}

// TODO: GET /api/v1/departments
export async function fetchDepartments(): Promise<{ id: number; name: string }[]> {
  // Devolve array vazio em vez de throw para a view do Register conseguir
  // renderizar — só os dropdowns ficam vazios até ligares ao backend.
  return []
}

// TODO: GET /api/v1/roles
export async function fetchRoles(): Promise<{ id: number; name: string }[]> {
  return []
}
