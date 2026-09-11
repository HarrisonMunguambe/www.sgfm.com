<template>
  <div>
    <!-- Stale banner: aparece quando estamos a mostrar cache porque o fetch falhou -->
    <div
      v-if="result.stale && result.fetchedAt"
      class="mb-5 sm:mb-6 rounded-xl border border-amber-300/60 dark:border-amber-400/30 bg-amber-50/80 dark:bg-amber-500/10 px-4 py-3 text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-start gap-3"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" class="shrink-0 mt-0.5">
        <path
          d="M10 1.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zm0 4a1 1 0 011 1v4a1 1 0 11-2 0V6.5a1 1 0 011-1zm0 9.5a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z"
        />
      </svg>
      <div class="flex-1 min-w-0">
        <p class="font-semibold">A mostrar últimas notícias guardadas</p>
        <p class="opacity-80 mt-0.5">
          Não foi possível obter notícias mais recentes ({{
            result.errorMessage || 'sem detalhes'
          }}). Última actualização {{ relativeFetched }}.
        </p>
      </div>
      <button
        @click="refresh"
        :disabled="loading"
        class="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50"
      >
        {{ loading ? 'A tentar...' : 'Tentar agora' }}
      </button>
    </div>

    <!-- Filtros: tema e região -->
    <div class="mb-4 flex flex-wrap items-center gap-3">
      <div
        v-for="group in FILTER_GROUPS"
        :key="group.label"
        role="group"
        :aria-label="group.label"
        class="flex gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-white/5"
      >
        <button
          v-for="opt in group.options"
          :key="opt.key"
          type="button"
          :aria-pressed="group.selected() === opt.key"
          @click="group.select(opt.key)"
          :class="[
            'inline-flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-lg font-medium transition',
            group.selected() === opt.key
              ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white',
          ]"
        >
          <span class="shrink-0" v-html="opt.icon"></span>
          {{ opt.label }}
          <span
            v-if="opt.badge"
            class="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300"
          >
            {{ opt.badge }}
          </span>
        </button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="mb-5 flex items-center justify-between gap-3 flex-wrap">
      <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <span v-if="result.fetchedAt">
          Actualizado {{ relativeFetched }}
          <template v-if="region === 'intl'"> · notícias em inglês</template>
        </span>
        <span v-else>A carregar notícias...</span>
      </p>
      <button
        @click="refresh"
        :disabled="loading"
        class="text-xs font-medium inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:border-sky-300 dark:hover:border-cyan-400/50 disabled:opacity-50 transition"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="currentColor"
          :class="loading ? 'animate-spin' : ''"
        >
          <path d="M10 3a7 7 0 015.9 10.7l1.4 1.4A9 9 0 1010 19v-2a7 7 0 010-14z" />
        </svg>
        {{ loading ? 'A actualizar' : 'Actualizar' }}
      </button>
    </div>

    <!-- Empty state -->
    <div
      v-if="!loading && result.articles.length === 0"
      class="text-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-white/10"
    >
      <p class="text-slate-700 dark:text-slate-300 font-semibold">Sem notícias disponíveis</p>
      <p class="mt-1 text-sm text-slate-500">
        {{ result.errorMessage || 'Não há notícias em cache. Tenta novamente daqui a pouco.' }}
      </p>
    </div>

    <!-- Loading skeleton (só quando não há cache para mostrar) -->
    <div
      v-else-if="loading && result.articles.length === 0"
      class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
    >
      <div
        v-for="i in 6"
        :key="i"
        class="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] p-5 h-64 animate-pulse"
      >
        <div class="h-32 rounded-lg bg-slate-200 dark:bg-white/10"></div>
        <div class="mt-4 h-4 w-3/4 rounded bg-slate-200 dark:bg-white/10"></div>
        <div class="mt-2 h-3 w-1/2 rounded bg-slate-200 dark:bg-white/10"></div>
      </div>
    </div>

    <!-- News grid -->
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <a
        v-for="(n, i) in result.articles"
        :key="n.url"
        :href="n.url"
        target="_blank"
        rel="noopener noreferrer"
        class="block group"
      >
        <CardGlass
          hover
          :class="[
            'flex flex-col h-full overflow-hidden transition-transform group-hover:-translate-y-1 sgfm-rise',
            `delay-${(i % 4) + 1}`,
          ]"
        >
          <div class="relative aspect-[16/9] bg-slate-100 dark:bg-white/5 overflow-hidden">
            <img
              v-if="n.image"
              :src="n.image"
              :alt="n.title"
              loading="lazy"
              referrerpolicy="no-referrer"
              class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              @error="onImgError"
            />
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center text-slate-400 dark:text-white/30"
            >
              <svg width="40" height="40" viewBox="0 0 20 20" fill="currentColor">
                <path
                  d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v8l3-3 2 2 4-4 1 1V4H5z"
                />
              </svg>
            </div>
          </div>

          <div class="p-5 flex flex-col flex-1">
            <div
              class="flex items-center justify-between gap-2 mb-3 text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400"
            >
              <span class="truncate max-w-[60%]">{{ n.source.name }}</span>
              <span
                class="shrink-0 text-slate-400 dark:text-slate-500 normal-case tracking-normal font-medium"
              >
                {{ formatRelativeTime(n.publishedAt) }}
              </span>
            </div>

            <h3 class="text-slate-900 dark:text-white font-semibold leading-snug line-clamp-3">
              {{ n.title }}
            </h3>

            <p
              v-if="n.description"
              class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3"
            >
              {{ n.description }}
            </p>

            <div
              class="mt-auto pt-4 flex items-center justify-end text-xs font-medium text-sky-600 dark:text-cyan-300 group-hover:gap-2 inline-flex gap-1 transition-all"
            >
              Ler no site
              <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 4l6 6-6 6V4z" />
              </svg>
            </div>
          </div>
        </CardGlass>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import {
  fetchNews,
  formatRelativeTime,
  getCachedNews,
  type NewsRegion,
  type NewsResult,
  type NewsTopic,
} from '@/services/newsService'

const FILTERS_KEY = 'sgfm.observatorio.news.filters'

function readFilters(): { topic: NewsTopic; region: NewsRegion } {
  try {
    const saved = JSON.parse(localStorage.getItem(FILTERS_KEY) ?? '{}')
    return {
      topic: saved.topic === 'technology' ? 'technology' : 'business',
      region: saved.region === 'intl' ? 'intl' : 'pt',
    }
  } catch {
    return { topic: 'business', region: 'pt' }
  }
}

const initial = readFilters()
const topic = ref<NewsTopic>(initial.topic)
const region = ref<NewsRegion>(initial.region)
const query = computed(() => ({ topic: topic.value, region: region.value }))

const svg = (d: string) =>
  `<svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor"><path d="${d}"/></svg>`

interface FilterGroup {
  label: string
  selected: () => string
  select: (key: string) => void
  options: { key: string; label: string; icon: string; badge?: string }[]
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    label: 'Tema',
    selected: () => topic.value,
    select: (k: string) => (topic.value = k as NewsTopic),
    options: [
      {
        key: 'business',
        label: 'Economia e mercados',
        icon: svg(
          'M3 3h1.6v12.4H17V17H3V3zm3 8l3-3 2.5 2.5L16 6l1.1 1.1-5.6 5.6L9 10.2l-1.9 1.9L6 11z',
        ),
      },
      {
        key: 'technology',
        label: 'Tecnologia',
        icon: svg(
          'M4 4h12a1 1 0 011 1v8a1 1 0 01-1 1h-4.5l.5 2h1.5v1.5h-7V16H8l.5-2H4a1 1 0 01-1-1V5a1 1 0 011-1zm.6 1.6v6.8h10.8V5.6H4.6z',
        ),
      },
    ],
  },
  {
    label: 'Região',
    selected: () => region.value,
    select: (k: string) => (region.value = k as NewsRegion),
    options: [
      {
        key: 'pt',
        label: 'Portugal',
        icon: svg(
          'M10 2a6 6 0 016 6c0 4.2-6 10-6 10S4 12.2 4 8a6 6 0 016-6zm0 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
        ),
      },
      {
        key: 'intl',
        label: 'Internacional',
        badge: 'EN',
        icon: svg(
          'M10 2a8 8 0 100 16 8 8 0 000-16zm5.9 7h-2.6a13 13 0 00-1-4.6A6.4 6.4 0 0115.9 9zM10 3.7c.8 1 1.5 3 1.7 5.3H8.3c.2-2.3.9-4.3 1.7-5.3zM7.7 4.4a13 13 0 00-1 4.6H4.1a6.4 6.4 0 013.6-4.6zM4.1 11h2.6c.1 1.7.5 3.3 1 4.6A6.4 6.4 0 014.1 11zm5.9 5.3c-.8-1-1.5-3-1.7-5.3h3.4c-.2 2.3-.9 4.3-1.7 5.3zm2.3-.7c.5-1.3.9-2.9 1-4.6h2.6a6.4 6.4 0 01-3.6 4.6z',
        ),
      },
    ],
  },
]

const result = ref<NewsResult>(getCachedNews(query.value))
const loading = ref(false)

const relativeFetched = computed(() =>
  result.value.fetchedAt ? formatRelativeTime(new Date(result.value.fetchedAt).toISOString()) : '',
)

// Evita que uma resposta antiga (de outro filtro) substitua a actual
let requestId = 0

async function load(force = false) {
  const id = ++requestId
  const q = query.value
  loading.value = true
  try {
    const res = await fetchNews(q, { forceRefresh: force })
    if (id === requestId) result.value = res
  } finally {
    if (id === requestId) loading.value = false
  }
}

watch(query, (q) => {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(q))
  } catch {
    // ignoramos (modo privado)
  }
  result.value = getCachedNews(q)
  load(false)
})

function refresh() {
  load(true)
}

function onImgError(e: Event) {
  // imagem partida → escondemos para revelar o placeholder por baixo
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
}

onMounted(() => load(false))
</script>
