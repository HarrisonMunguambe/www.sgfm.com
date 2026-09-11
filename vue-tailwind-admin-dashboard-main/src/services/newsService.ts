/**
 * Serviço de notícias do Observatório (GNews API) — economia e tecnologia,
 * de Portugal ou internacionais.
 *
 * Estratégia de quota:
 *  - GNews free tier dá 100 pedidos/dia (máx. 10 artigos por pedido). Para poupar:
 *    1) Cada combinação tema × região tem o seu cache local, devolvido de imediato.
 *    2) Só fazemos fetch novo se o cache tiver mais de FRESH_TTL_MS.
 *    3) As combinações só são pedidas quando o utilizador as abre.
 *    4) Se o fetch falhar (quota esgotada, offline, etc.) mantemos o cache antigo
 *       e marcamos `stale: true` para a UI mostrar um aviso discreto.
 */

const ENDPOINT = 'https://gnews.io/api/v4/top-headlines'
const CACHE_PREFIX = 'sgfm.observatorio.news.v3'
const FRESH_TTL_MS = 60 * 60 * 1000 // 1 hora — só refresca se o cache for mais antigo

export type NewsTopic = 'business' | 'technology'
export type NewsRegion = 'pt' | 'intl'

export interface NewsQuery {
  topic: NewsTopic
  region: NewsRegion
}

// Sem país, `lang=pt` devolve sobretudo fontes do Brasil — fixamos Portugal.
// Moçambique não é suportado pela GNews. No internacional fixamos os EUA: dá as fontes
// mais conhecidas (Reuters, CNBC, NPR; 9to5Mac, MacRumors em tecnologia). Sem país
// vinham sobretudo sites de nicho; o Reino Unido mistura tabloides.
const REGION_PARAMS: Record<NewsRegion, Record<string, string>> = {
  pt: { lang: 'pt', country: 'pt' },
  intl: { lang: 'en', country: 'us' },
}

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

const cacheKey = (q: NewsQuery) => `${CACHE_PREFIX}.${q.topic}.${q.region}`

function readCache(q: NewsQuery): NewsCacheEntry | null {
  try {
    const raw = localStorage.getItem(cacheKey(q))
    if (!raw) return null
    const parsed = JSON.parse(raw) as NewsCacheEntry
    if (!parsed.articles || !Array.isArray(parsed.articles)) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(q: NewsQuery, entry: NewsCacheEntry) {
  try {
    localStorage.setItem(cacheKey(q), JSON.stringify(entry))
  } catch {
    // localStorage pode falhar em modo privado — ignoramos silenciosamente
  }
}

export function getCachedNews(q: NewsQuery): NewsResult {
  const cache = readCache(q)
  if (!cache) return { articles: [], fetchedAt: null, stale: false }
  return { articles: cache.articles, fetchedAt: cache.fetchedAt, stale: false }
}

/**
 * Devolve as notícias mais recentes para o tema e região pedidos. Devolve o cache
 * imediatamente quando útil e só vai à API se o cache estiver expirado ou inexistente.
 */
export async function fetchNews(
  q: NewsQuery,
  options?: { forceRefresh?: boolean },
): Promise<NewsResult> {
  const cache = readCache(q)
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
    category: q.topic,
    ...REGION_PARAMS[q.region],
    max: '10',
    apikey: apiKey,
  })

  try {
    const res = await fetch(`${ENDPOINT}?${params.toString()}`)
    if (!res.ok) {
      // 403/429 normalmente = quota esgotada
      const reason =
        res.status === 403 || res.status === 429
          ? 'Quota diária atingida'
          : `Erro HTTP ${res.status}`
      throw new Error(reason)
    }
    const data = (await res.json()) as { articles?: NewsArticle[] }
    const articles = data.articles ?? []

    const entry: NewsCacheEntry = { fetchedAt: Date.now(), articles }
    writeCache(q, entry)
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
