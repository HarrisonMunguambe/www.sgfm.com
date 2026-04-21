import api from './api'
import { MOCK_DEPARTMENTS, MOCK_OTP_CODE, MOCK_ROLES, MOCK_USER } from './mockData'
import type { RegisterStep1, RegisterStep3 } from './mockData'

const USE_MOCK = true

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export interface AuthUser {
  id: number
  name: string
  email: string
  phone?: string
  department?: string
  role?: string
}

function persistSession(token: string, user: AuthUser) {
  localStorage.setItem('sgfm_token', token)
  localStorage.setItem('sgfm_user', JSON.stringify(user))
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('sgfm_user')
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function getStoredToken(): string | null {
  return localStorage.getItem('sgfm_token')
}

export function isAuthenticated(): boolean {
  return !!getStoredToken()
}

export async function login(login: string, password: string): Promise<AuthUser> {
  if (USE_MOCK) {
    await wait(900)
    if (!login || !password) throw new Error('Credenciais inválidas')
    if (password.length < 4) throw new Error('Credenciais inválidas')
    const user: AuthUser = { ...MOCK_USER, email: login.includes('@') ? login : MOCK_USER.email }
    persistSession('mock-token-' + Date.now(), user)
    return user
  }
  const { data } = await api.post('/auth/login', { login, password })
  persistSession(data.token, data.user)
  return data.user
}

export async function logout(): Promise<void> {
  if (!USE_MOCK) {
    try {
      await api.post('/auth/logout')
    } catch {
      /* ignore */
    }
  }
  localStorage.removeItem('sgfm_token')
  localStorage.removeItem('sgfm_user')
}

export async function registerStep1(payload: RegisterStep1): Promise<{ ok: true }> {
  if (USE_MOCK) {
    await wait(700)
    if (payload.password !== payload.password_confirmation)
      throw new Error('As palavras-passe não coincidem')
    if (!payload.terms) throw new Error('Deve aceitar os termos')
    localStorage.setItem('sgfm_register_email', payload.email)
    return { ok: true }
  }
  await api.post('/auth/register/step1', payload)
  return { ok: true }
}

export async function verifyOtp(code: string): Promise<{ ok: true }> {
  if (USE_MOCK) {
    await wait(600)
    if (code !== MOCK_OTP_CODE) throw new Error('Código OTP inválido')
    return { ok: true }
  }
  await api.post('/auth/register/verify-otp', { code })
  return { ok: true }
}

export async function registerStep3(payload: RegisterStep3): Promise<AuthUser> {
  if (USE_MOCK) {
    await wait(900)
    const dept = MOCK_DEPARTMENTS.find((d) => d.id === payload.department_id)?.name ?? 'Financeiro'
    const role = MOCK_ROLES.find((r) => r.id === payload.role_id)?.name ?? 'Solicitante'
    const email = localStorage.getItem('sgfm_register_email') || 'novo@sgfm.com'
    const user: AuthUser = {
      id: Math.floor(Math.random() * 10_000),
      name: payload.full_name,
      email,
      department: dept,
      role,
    }
    persistSession('mock-token-' + Date.now(), user)
    localStorage.removeItem('sgfm_register_email')
    return user
  }
  const { data } = await api.post('/auth/register/step3', payload)
  persistSession(data.token, data.user)
  return data.user
}

export async function fetchDepartments() {
  if (USE_MOCK) {
    await wait(300)
    return MOCK_DEPARTMENTS
  }
  const { data } = await api.get('/departments')
  return data
}

export async function fetchRoles() {
  if (USE_MOCK) {
    await wait(300)
    return MOCK_ROLES
  }
  const { data } = await api.get('/roles')
  return data
}
