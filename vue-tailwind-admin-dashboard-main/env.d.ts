/// <reference types="vite/client" />


// podes me explicar num parágrafo o que é este ficheiro e para que serve?
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_REDIRECT_URI: string
  readonly VITE_RECAPTCHA_SITE_KEY: string
  readonly VITE_ENABLE_GOOGLE_LOGIN: string
  readonly VITE_GNEWS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
