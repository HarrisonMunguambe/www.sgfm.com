<template>
  <div class="w-full">
    <FloatLabel variant="on">
      <Password
        v-if="type === 'password'"
        :input-id="id"
        :model-value="modelValue"
        :feedback="false"
        toggle-mask
        :input-class="inputClasses"
        :pt="{ root: { class: 'w-full' } }"
        :autocomplete="autocomplete"
        @update:model-value="onUpdate"
        @blur="onBlur"
      />
      <InputText
        v-else
        :id="id"
        :type="type"
        :model-value="modelValue"
        :class="inputClasses"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :inputmode="inputmode"
        :invalid="!!error"
        @update:model-value="onUpdate"
        @blur="onBlur"
      />
      <label :for="id">
        {{ label }}<span v-if="required" class="text-rose-500 ml-0.5">*</span>
      </label>
    </FloatLabel>
    <p
      v-if="error"
      class="mt-1.5 text-xs text-rose-500 flex items-center gap-1.5"
    >
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
import { computed } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import FloatLabel from 'primevue/floatlabel'

const props = withDefaults(
  defineProps<{
    modelValue: string
    label?: string
    placeholder?: string
    type?: string
    id?: string
    error?: string
    hint?: string
    required?: boolean
    autocomplete?: string
    maxlength?: number
    inputmode?:
      | 'none'
      | 'text'
      | 'tel'
      | 'url'
      | 'email'
      | 'numeric'
      | 'decimal'
      | 'search'
  }>(),
  { type: 'text' },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'blur'): void
}>()

const inputClasses = computed(() => [
  'w-full',
  props.error ? 'p-invalid' : '',
])

function onUpdate(v: string | undefined) {
  emit('update:modelValue', v ?? '')
}
function onBlur() {
  emit('blur')
}
</script>

<style scoped>
:deep(.p-inputtext),
:deep(.p-password-input) {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  border-radius: 0.75rem;
}
:deep(.p-floatlabel label) {
  font-size: 0.875rem;
}
</style>
