// ──────────────────────────────────────────────────────────
// Contratos da API SGFM /api/v1/auth/*
// Estes tipos espelham EXACTAMENTE o que o backend espera/devolve.
// Se o backend mudar, é aqui que actualizaremos — e o TS sublinha o resto.
// ──────────────────────────────────────────────────────────
// Os outros endpoints usam `any` em services/auth.ts.


// formato de resposta do backend do laravel
export interface ApiSuccess<T> {
  success: boolean;
  data: T;
  message: string;
}

// Modelo a ser usado em Auth Login - Request e Response
// Request: o que o frontend envia para o backend
export interface LoginPayload{
  login: string;
  password: string;
  recaptcha_token: string;
}

// Response: o que o backend devolve para o frontend
export interface LoginResponse {
  user: AuthUser
  token: string
  token_type: string   // "Bearer" no teu caso, mas deixa string (string genérico)
}

export interface AuthUser {
  id: number
  email: string
  email_verified_at: string | null
  password_reset_sent_at: string | null
  password_reset_expires_at: string | null
  security_question: string | null
  security_answer_enabled: boolean | null
  worker_id: number
  created_at: string
  updated_at: string
  worker: Worker
}


export interface Worker {
  id: number
  name: string
  phone: string
  alternative_phone: string | null
  department_id: number
  role_id: number
  is_active: boolean
  deactivated_at: string | null
  phone_verified_at: string | null
  security_question_optin: boolean
  created_at: string
  updated_at: string
  department: Department
  role: Role
}

export interface Department {
  id: number
  name: string
  description: string | null
  is_active: number
  created_at: string
  updated_at: string
}

export interface Role {
  id: number
  name: string
  created_at: string
  updated_at: string
}
