import { reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: number
  type: ToastType
  title: string
  message?: string
}

const state = reactive<{ items: ToastItem[] }>({ items: [] })

let seq = 1

function push(type: ToastType, title: string, message?: string, timeout = 4000) {
  const id = seq++
  state.items.push({ id, type, title, message })
  setTimeout(() => {
    const i = state.items.findIndex((t) => t.id === id)
    if (i !== -1) state.items.splice(i, 1)
  }, timeout)
}

export function useToast() {
  return {
    items: state.items,
    success: (title: string, message?: string) => push('success', title, message),
    error: (title: string, message?: string) => push('error', title, message),
    info: (title: string, message?: string) => push('info', title, message),
    dismiss: (id: number) => {
      const i = state.items.findIndex((t) => t.id === id)
      if (i !== -1) state.items.splice(i, 1)
    },
  }
}
