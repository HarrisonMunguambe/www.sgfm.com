<template>
  <div class="sgfm-surface min-h-screen">
    <div class="min-h-screen grid lg:grid-cols-2">
      <!-- LEFT — brand panel -->
      <div class="hidden lg:block">
        <AuthBrandPanel visual="setup" :visual-step="3" />
      </div>

      <!-- RIGHT — form -->
      <div class="relative flex flex-col">
        <!-- Top bar -->
        <div class="flex items-center justify-end gap-3 px-4 sm:px-6 lg:px-10 pt-4 sm:pt-5 lg:pt-6">
          <ThemeToggle />
        </div>

        <!-- Form centered -->
        <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <div class="w-full max-w-md sgfm-rise">
            <!-- Mobile logo -->
            <router-link to="/" class="inline-flex items-center mb-8 lg:hidden">
              <AppLogo full imgClass="h-10 w-auto max-w-[180px]" :width="150" :height="40" />
            </router-link>

            <div class="mb-8">
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full sgfm-glass border border-slate-200/70 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-4"
              >
                <span class="sgfm-ticker-dot"></span>
                Último passo
              </div>
              <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
                Completar perfil
              </h1>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Indique o telefone, departamento e cargo para activarmos a sua conta.
              </p>
            </div>

            <Form
              :resolver="resolver"
              :initial-values="{
                phone: '',
                department_id: null,
                role_id: null,
                alternative_phone: '',
              }"
              @submit="onFormSubmit"
              class="space-y-4"
            >
              <!-- Telefone -->
              <FormField v-slot="$field" name="phone">
                <PhoneInput
                  v-bind="$field.props"
                  id="cp-phone"
                  label="Telefone"
                  required
                  :error="$field.invalid ? $field.error?.message : undefined"
                />
              </FormField>

              <!-- Departamento -->
              <FormField v-slot="$field" name="department_id">
                <div>
                  <FloatLabel variant="on">
                    <Select
                      v-bind="$field.props"
                      input-id="cp-dept"
                      :options="departments"
                      option-label="name"
                      option-value="id"
                      :loading="loadingOptions"
                      :invalid="$field.invalid"
                      class="w-full"
                    />
                    <label for="cp-dept">
                      Departamento<span class="text-rose-500 ml-0.5">*</span>
                    </label>
                  </FloatLabel>
                  <p
                    v-if="$field.invalid"
                    class="mt-1.5 text-xs text-rose-500 flex items-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                      />
                    </svg>
                    {{ $field.error?.message }}
                  </p>
                </div>
              </FormField>

              <!-- Cargo -->
              <FormField v-slot="$field" name="role_id">
                <div>
                  <FloatLabel variant="on">
                    <Select
                      v-bind="$field.props"
                      input-id="cp-role"
                      :options="roles"
                      option-label="name"
                      option-value="id"
                      :loading="loadingOptions"
                      :invalid="$field.invalid"
                      class="w-full"
                    />
                    <label for="cp-role">
                      Cargo<span class="text-rose-500 ml-0.5">*</span>
                    </label>
                  </FloatLabel>
                  <p
                    v-if="$field.invalid"
                    class="mt-1.5 text-xs text-rose-500 flex items-center gap-1.5"
                  >
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
                      />
                    </svg>
                    {{ $field.error?.message }}
                  </p>
                </div>
              </FormField>

              <!-- Telefone alternativo (opcional) -->
              <FormField v-slot="$field" name="alternative_phone">
                <PhoneInput
                  v-bind="$field.props"
                  id="cp-altphone"
                  label="Telefone alternativo (opcional)"
                  :error="$field.invalid ? $field.error?.message : undefined"
                />
              </FormField>

              <ButtonNeon
                type="submit"
                block
                :loading="loading"
                variant="primary"
                class="mt-2"
              >
                Concluir e entrar
              </ButtonNeon>
            </Form>
          </div>
        </div>
      </div>
    </div>

    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'

import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'

import Select from 'primevue/select'
import FloatLabel from 'primevue/floatlabel'

import PhoneInput from '@/components/neon/PhoneInput.vue'
import ButtonNeon from '@/components/neon/ButtonNeon.vue'
import ToastContainer from '@/components/neon/ToastContainer.vue'
import AuthBrandPanel from '@/components/landing/AuthBrandPanel.vue'
import ThemeToggle from '@/components/landing/ThemeToggle.vue'
import AppLogo from '@/components/common/AppLogo.vue'

import api from '@/services/api'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const toast = useToast()

const loading = ref(false)
const loadingOptions = ref(false)
const departments = ref<{ id: number; name: string }[]>([])
const roles = ref<{ id: number; name: string }[]>([])

// ─── SCHEMA ──────────────────────────────────────────────
// Os nomes dos campos batem com o que o backend espera em
// POST /api/v1/auth/complete-profile.
// Os campos de telefone guardam APENAS os 9 dígitos (o prefixo +258
// é fixo no PhoneInput).
const schema = z.object({
  phone: z
    .string()
    .min(1, 'Indique o telefone')
    .regex(/^\d{9}$/, 'Telefone deve ter 9 dígitos'),
  department_id: z
    .number({ message: 'Selecione o departamento' })
    .int()
    .positive('Selecione o departamento'),
  role_id: z
    .number({ message: 'Selecione o cargo' })
    .int()
    .positive('Selecione o cargo'),
  alternative_phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^\d{9}$/.test(v),
      { message: 'Telefone alternativo deve ter 9 dígitos' },
    ),
})

const resolver = zodResolver(schema)
type CompleteProfileValues = z.infer<typeof schema>

// ─── SUBMIT ──────────────────────────────────────────────
async function onFormSubmit(event: FormSubmitEvent) {
  if (!event.valid) return
  const values = event.values as CompleteProfileValues

  loading.value = true
  try {
    const { data } = await api.post('/auth/complete-profile', {
      phone: values.phone,
      department_id: values.department_id,
      role_id: values.role_id,
      alternative_phone: values.alternative_phone || null,
    })
    // Actualizar o user no localStorage com os dados novos
    const user = data?.data?.user ?? data?.data
    if (user) {
      localStorage.setItem('sgfm_user', JSON.stringify(user))
    }
    toast.success('Perfil completo', 'Bem-vindo ao SGFM')
    router.push('/dashboard')
  } catch (err: unknown) {
    const msg = extractBackendError(err, 'Não foi possível concluir o perfil.')
    toast.error('Erro', msg)
  } finally {
    loading.value = false
  }
}

function extractBackendError(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as
      | { message?: string; errors?: Record<string, string[]> }
      | undefined
    if (data?.errors) {
      for (const field of Object.keys(data.errors)) {
        const messages = data.errors[field]
        if (messages && messages.length > 0) return messages[0]
      }
    }
    if (typeof data?.message === 'string') return data.message
  }
  if (err instanceof Error) return err.message
  return fallback
}

// ─── Carregar departamentos e cargos ─────────────────────
onMounted(async () => {
  loadingOptions.value = true
  try {
    const [d, r] = await Promise.all([
      api.get('/departments'),
      api.get('/roles'),
    ])
    departments.value = d.data?.data ?? d.data ?? []
    roles.value = r.data?.data ?? r.data ?? []
  } catch {
    toast.error('Erro', 'Não foi possível carregar departamentos e cargos.')
  } finally {
    loadingOptions.value = false
  }
})
</script>
