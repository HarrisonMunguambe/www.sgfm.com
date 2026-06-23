// ──────────────────────────────────────────────────────────
// useRecaptcha — gera tokens reCAPTCHA v3 da Google.
//
// Como usar (exemplo num <script setup>):
//
//   const { executeRecaptcha, isVerifying } = useRecaptcha()
//
//   async function submit() {
//     const token = await executeRecaptcha('login')
//     // enviar `token` no campo recaptcha_token
//   }
//
//   // No template, podes usar isVerifying para mostrar feedback:
//   //   <span v-if="isVerifying">🛡️ A verificar...</span>
//
// O script da Google é carregado lazily: só é injectado no <head>
// no primeiro `executeRecaptcha`. O badge "protected by reCAPTCHA"
// aparece automaticamente no canto inferior direito.
// ──────────────────────────────────────────────────────────

import { ref } from 'vue'

interface Grecaptcha {
  ready: (cb: () => void) => void
  execute: (siteKey: string, options: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha
  }
}

let scriptPromise: Promise<void> | null = null

function loadScript(siteKey: string): Promise<void> {
  // Se já carregámos uma vez, devolve a mesma promise (idempotente)
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    // Se o grecaptcha já existe (alguém carregou o script à mão), saltamos
    if (window.grecaptcha) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => {
      scriptPromise = null // permite tentar outra vez
      reject(new Error('Falha ao carregar o script do reCAPTCHA'))
    }
    document.head.appendChild(script)
  })

  return scriptPromise
}

// Estado partilhado entre todas as views que usem este composable.
// Se for `true`, alguma view está a gerar um token agora — útil para
// mostrar indicador visual ("A verificar...") no botão de submit.
const isVerifying = ref(false)

export function useRecaptcha() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY

  async function executeRecaptcha(action: string): Promise<string> {
    if (!siteKey) {
      throw new Error(
        'VITE_RECAPTCHA_SITE_KEY não configurada no .env. Reinicia o npm run dev depois de adicionar.',
      )
    }

    isVerifying.value = true
    try {
      // 1. Garante que o script foi carregado (lazy)
      await loadScript(siteKey)

      // 2. Espera que o grecaptcha esteja inicializado
      if (!window.grecaptcha) {
        throw new Error('reCAPTCHA não disponível após carregar o script')
      }

      // 3. Gera o token para a acção dada (ex: "login", "register", "forgot_password")
      //    O "action" ajuda o backend a saber em que contexto o user submeteu o pedido.
      return await new Promise<string>((resolve, reject) => {
        window.grecaptcha!.ready(async () => {
          try {
            const token = await window.grecaptcha!.execute(siteKey, { action })
            resolve(token)
          } catch (err) {
            reject(err)
          }
        })
      })
    } finally {
      isVerifying.value = false
    }
  }

  return { executeRecaptcha, isVerifying }
}
