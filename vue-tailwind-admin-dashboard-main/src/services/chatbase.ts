/* eslint-disable @typescript-eslint/no-explicit-any */
const DEFAULT_BOT_ID = 'mSZotGPs9HDi85PvVHeQH'
const CHATBASE_SRC = 'https://www.chatbase.co/embed.min.js'
const CHATBASE_DOMAIN = 'www.chatbase.co'

type ChatbaseState = 'initialized' | 'loading' | 'uninitialized' | string
type ChatbaseStub = ((...args: any[]) => void) & { q: any[][] }

function getStateSafely(): ChatbaseState {
  try {
    return typeof window.chatbase === 'function'
      ? String(window.chatbase('getState'))
      : 'uninitialized'
  } catch {
    return 'uninitialized'
  }
}

function ensureChatbaseStub() {
  if (typeof window === 'undefined') return

  const state = getStateSafely()
  if (window.chatbase && state === 'initialized') return

  const fn: ChatbaseStub = ((...args: any[]) => {
    fn.q.push(args)
  }) as ChatbaseStub
  fn.q = []

  window.chatbase = new Proxy(fn as any, {
    get(target, prop) {
      if (prop === 'q') return target.q
      return (...args: any[]) => (target as any)(prop, ...args)
    },
  })
}

function injectScript(botId: string) {
  if (typeof document === 'undefined') return
  if (document.getElementById(botId)) return

  const script = document.createElement('script')
  script.src = CHATBASE_SRC
  script.id = botId
  script.setAttribute('domain', CHATBASE_DOMAIN)
  document.body.appendChild(script)
}

export function initChatbase(botId?: string) {
  if (typeof window === 'undefined') return

  const resolvedId = botId || (import.meta.env.VITE_CHATBASE_BOT_ID as string | undefined) || DEFAULT_BOT_ID

  ensureChatbaseStub()

  const onLoad = () => injectScript(resolvedId)

  if (document.readyState === 'complete') onLoad()
  else window.addEventListener('load', onLoad, { once: true })
}

export function identifyChatbase(token: string) {
  if (typeof window === 'undefined') return
  if (!token) return
  ensureChatbaseStub()
  window.chatbase?.('identify', { token })
}
