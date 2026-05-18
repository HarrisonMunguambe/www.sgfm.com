/**
 * Serviço de notícias financeiras globais (GNews API).
 *
 * Estratégia de quota:
 *  - GNews free tier dá 100 pedidos/dia. Para poupar:
 *    1) Devolvemos imediatamente o cache local (se existir) antes de fazer fetch.
 *    2) Só fazemos fetch novo se o cache tiver mais de FRESH_TTL_MS.
 *    3) Se o fetch falhar (quota esgotada, offline, etc.) mantemos o cache antigo
 *       e marcamos `stale: true` para a UI mostrar um aviso discreto.
 */

const ENDPOINT = 'https://gnews.io/api/v4/top-headlines'
const CACHE_KEY = 'sgfm.observatorio.news.v1'
const FRESH_TTL_MS = 30 * 60 * 1000 // 30 minutos — só refresca se o cache for mais antigo

export interface NewsArticle {
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: { name: string; url: string }
}

export interface NewsCacheEntry {
  fetchedAt: number
  articles: NewsArticle[]
}

export interface NewsResult {
  articles: NewsArticle[]
  fetchedAt: number | null
  stale: boolean // true se estamos a mostrar cache porque o fetch falhou
  errorMessage?: string
}

function readCache(): NewsCacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as NewsCacheEntry
    if (!parsed.articles || !Array.isArray(parsed.articles)) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(entry: NewsCacheEntry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    // localStorage pode falhar em modo privado — ignoramos silenciosamente
  }
}

export function getCachedNews(): NewsResult {
  const cache = readCache()
  if (!cache) return { articles: [], fetchedAt: null, stale: false }
  return { articles: cache.articles, fetchedAt: cache.fetchedAt, stale: false }
}

/**
 * Devolve as notícias mais recentes. Devolve o cache imediatamente quando útil
 * e só vai à API se o cache estiver expirado ou inexistente.
 */
export async function fetchFinancialNews(options?: {
  forceRefresh?: boolean
}): Promise<NewsResult> {
  const cache = readCache()
  const now = Date.now()
  const isFresh = cache && now - cache.fetchedAt < FRESH_TTL_MS

  if (cache && isFresh && !options?.forceRefresh) {
    return { articles: cache.articles, fetchedAt: cache.fetchedAt, stale: false }
  }

  const apiKey = import.meta.env.VITE_GNEWS_API_KEY
  if (!apiKey) {
    if (cache) {
      return {
        articles: cache.articles,
        fetchedAt: cache.fetchedAt,
        stale: true,
        errorMessage: 'VITE_GNEWS_API_KEY não configurada — a mostrar cache anterior.',
      }
    }
    return {
      articles: [],
      fetchedAt: null,
      stale: true,
      errorMessage: 'VITE_GNEWS_API_KEY não configurada.',
    }
  }

  const params = new URLSearchParams({
    category: 'business',
    lang: 'pt',
    max: '12',
    apikey: apiKey,
  })

  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`)
    if (!res.ok) {
      // 403/429 normalmente = quota esgotada
      const reason = res.status === 403 || res.status === 429 ? 'Quota diária atingida' : `Erro HTTP ${res.status}`
      throw new Error(reason)
    }
    const data = (await res.json()) as { articles?: NewsArticle[] }
    const articles = data.articles ?? []

    const entry: NewsCacheEntry = { fetchedAt: Date.now(), articles }
    writeCache(entry)
    return { articles, fetchedAt: entry.fetchedAt, stale: false }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido ao obter notícias'
    if (cache) {
      return {
        articles: cache.articles,
        fetchedAt: cache.fetchedAt,
        stale: true,
        errorMessage: message,
      }
    }
    return { articles: [], fetchedAt: null, stale: true, errorMessage: message }
  }
}

export function formatRelativeTime(iso: string): string {
  const date = new Date(iso)
  const diff = Date.now() - date.getTime()
  const min = Math.round(diff / 60000)
  if (min < 1) return 'agora mesmo'
  if (min < 60) return `há ${min} min`
  const hours = Math.round(min / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.round(hours / 24)
  if (days < 7) return `há ${days} d`
  return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' })
}
