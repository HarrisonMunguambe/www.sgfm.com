<template>
  <div class="w-full">
    <div class="relative">
      <FloatLabel variant="on">
        <InputText
          :id="id"
          :model-value="modelValue"
          :class="[
            'w-full phone-input-padded',
            error ? 'p-invalid' : '',
          ]"
          :invalid="!!error"
          inputmode="tel"
          autocomplete="tel"
          :maxlength="9"
          :placeholder="placeholder ?? '84 123 4567'"
          @update:model-value="onUpdate"
          @keydown="onKeydown"
          @paste="onPaste"
          @blur="onBlur"
        />
        <label :for="id">
          {{ label }}<span v-if="required" class="text-rose-500 ml-0.5">*</span>
        </label>
      </FloatLabel>

      <!-- Prefixo fixo sobreposto (🇲🇿 +258) -->
      <div
        class="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 pointer-events-none select-none"
      >
        <span class="text-base leading-none">🇲🇿</span>
        <span>+258</span>
        <span class="h-4 w-px bg-slate-300 dark:bg-white/20 ml-1"></span>
      </div>
    </div>

    <!-- Mensagem de erro -->
    <p v-if="error" class="mt-1.5 text-xs text-rose-500 flex items-center gap-1.5">
      <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
        <path
          d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"
        />
      </svg>
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="mt-1.5 text-xs text-slate-500 dark:text-slate-400"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'

defineProps<{
  modelValue: string
  label?: string
  id?: string
  placeholder?: string
  error?: string
  hint?: string
  required?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'blur'): void
}>()

// Sanitiza qualquer valor para apenas dígitos + máximo 9 caracteres
function sanitize(v: string | undefined): string {
  return (v ?? '').replace(/\D/g, '').slice(0, 9)
}

function onUpdate(v: string | undefined) {
  emit('update:modelValue', sanitize(v))
}

function onBlur() {
  emit('blur')
}

// Bloqueia teclas não-numéricas (excepto controlo)
function onKeydown(e: KeyboardEvent) {
  const allowed = [
    'Backspace',
    'Delete',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
    'Enter',
    'Escape',
  ]
  if (allowed.includes(e.key)) return
  if (e.ctrlKey || e.metaKey) return // permitir Ctrl+A, Ctrl+C, Ctrl+V...
  if (!/^\d$/.test(e.key)) e.preventDefault()
}

// Quando o user faz paste, limpa o conteúdo para só conter dígitos
function onPaste(e: ClipboardEvent) {
  e.preventDefault()
  const pasted = e.clipboardData?.getData('text') ?? ''
  const cleaned = sanitize(pasted)
  emit('update:modelValue', cleaned)
}
</script>

<style scoped>
:deep(.phone-input-padded.p-inputtext) {
  padding-left: 5.25rem;
  padding-right: 1rem;
  padding-top: 0.875rem;
  padding-bottom: 0.875rem;
  font-size: 0.875rem;
  border-radius: 0.75rem;
  width: 100%;
  letter-spacing: 0.05em;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
}
:deep(.p-floatlabel label) {
  font-size: 0.875rem;
  left: 5.25rem; /* alinha o label com o início do número, não com o prefixo */
}
:deep(.p-floatlabel.p-floatlabel-on label) {
  left: 0.875rem; /* quando o label "sobe", volta ao canto */
}
</style>
