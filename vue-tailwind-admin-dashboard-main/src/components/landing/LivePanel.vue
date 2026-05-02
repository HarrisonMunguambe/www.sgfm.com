<template>
  <section class="relative py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
            Ao vivo
          </p>
          <h2 class="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            Acompanhe o seu fundo <span class="sgfm-gradient-text">em tempo real</span>
          </h2>
          <p class="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            Isto não é apenas uma demonstração — é uma simulação real do painel do SGFM. O saldo é
            atualizado, as movimentações chegam e os alertas são acionados. Imagine isto com os dados
            da sua empresa.
          </p>

          <ul class="mt-6 space-y-3">
            <li
              v-for="b in bullets"
              :key="b"
              class="flex items-start gap-3 text-slate-700 dark:text-slate-300"
            >
              <span
                class="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-sky-700 dark:bg-cyan-500/20 dark:text-cyan-300"
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                </svg>
              </span>
              <span class="text-sm">{{ b }}</span>
            </li>
          </ul>
        </div>

        <CardGlass glow class="p-6 sgfm-neon-cyan live-card">
          <div class="flex items-center justify-between h-12">
            <div>
              <div class="text-xs text-slate-500 dark:text-slate-400">Saldo atual do fundo</div>
              <div
                class="mt-1 text-3xl font-bold text-slate-900 dark:text-white tabular-nums"
              >
                {{ formatMZN(balance) }}
              </div>
            </div>
            <div class="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-300">
              <span class="sgfm-ticker-dot"></span>
              Ao vivo
            </div>
          </div>

          <!-- Sparkline: altura fixa, não redimensiona -->
          <div class="mt-5 h-20 flex items-end gap-1 overflow-hidden">
            <div
              v-for="(v, i) in spark"
              :key="i"
              class="flex-1 rounded-t bg-gradient-to-t from-sky-400/60 to-violet-500/80 transition-[height] duration-500"
              :style="{ height: `${v}%` }"
            ></div>
          </div>

          <div class="mt-6">
            <div
              class="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 h-4"
            >
              Últimas movimentações
            </div>
            <!-- Lista com altura fixa e overflow oculto para evitar layout shift -->
            <div class="relative h-[280px] overflow-hidden">
              <ul class="movements-list space-y-2 absolute inset-x-0 top-0">
                <transition-group name="mv">
                  <li
                    v-for="m in movements.slice(0, 5)"
                    :key="m.key"
                    @click="openDetails(m)"
                    class="mv-item flex items-center justify-between rounded-lg bg-slate-50 dark:bg-white/[0.03] px-3 border border-slate-200/70 dark:border-white/5 cursor-pointer hover:border-sky-400/70 dark:hover:border-cyan-400/40 hover:bg-white dark:hover:bg-white/[0.06] transition"
                    role="button"
                    tabindex="0"
                    @keydown.enter="openDetails(m)"
                    @keydown.space.prevent="openDetails(m)"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div
                        :class="[
                          'h-8 w-8 rounded-lg flex items-center justify-center shrink-0',
                          m.type === 'in'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
                        ]"
                      >
                        <svg
                          v-if="m.type === 'in'"
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 4v10l4-4 1.4 1.4L10 17 4.6 11.4 6 10l4 4V4z" />
                        </svg>
                        <svg v-else width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 16V6l4 4 1.4-1.4L10 3 4.6 8.6 6 10l4-4v10z" />
                        </svg>
                      </div>
                      <div class="min-w-0">
                        <div class="text-sm text-slate-900 dark:text-white truncate">
                          {{ m.description }}
                        </div>
                        <div class="text-xs text-slate-500">{{ m.dept }} • {{ m.time }}</div>
                      </div>
                    </div>
                    <div
                      :class="[
                        'text-sm font-semibold tabular-nums shrink-0',
                        m.type === 'in'
                          ? 'text-emerald-600 dark:text-emerald-300'
                          : 'text-rose-600 dark:text-rose-300',
                      ]"
                    >
                      {{ m.type === 'in' ? '+' : '' }}{{ formatMZN(m.amount) }}
                    </div>
                  </li>
                </transition-group>
              </ul>
            </div>
          </div>
        </CardGlass>
      </div>
    </div>

    <MovementDetailsDialog
      :open="dialogOpen"
      :movement="selected"
      @close="dialogOpen = false"
    />
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import MovementDetailsDialog from '@/components/landing/MovementDetailsDialog.vue'
import { MOCK_RECENT_MOVEMENTS } from '@/services/mockData'

const bullets = [
  'Aprovações e rejeições em tempo real por departamento',
  'Alertas de IA quando um gasto desvia do padrão histórico',
  'Integração direta com conciliação bancária (em breve)',
]

const balance = ref(2_845_300)
const spark = ref<number[]>(Array.from({ length: 24 }, () => 30 + Math.random() * 60))
let seq = 1000

interface Mv {
  key: number
  description: string
  amount: number
  type: 'in' | 'out'
  dept: string
  time: string
}

const movements = ref<Mv[]>(
  MOCK_RECENT_MOVEMENTS.map((m, i) => ({
    key: i,
    description: m.description,
    amount: Math.abs(m.amount),
    type: m.type as 'in' | 'out',
    dept: m.dept,
    time: m.time,
  })),
)

const pool = [
  { description: 'Compra de toners para impressoras', dept: 'TI' },
  { description: 'Táxi – reunião com cliente', dept: 'Comercial' },
  { description: 'Reposição de caixa pequena', dept: 'Financeiro' },
  { description: 'Reembolso de despesas de viagem', dept: 'RH' },
  { description: 'Pagamento de fornecedor – água', dept: 'Operações' },
  { description: 'Recarga de telefones', dept: 'Suporte' },
]

const dialogOpen = ref(false)
const selected = ref<Mv | null>(null)
function openDetails(m: Mv) {
  selected.value = m
  dialogOpen.value = true
}

let timer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  timer = setInterval(() => {
    balance.value += Math.floor(Math.random() * 40_000) - 20_000
    spark.value = [...spark.value.slice(1), 30 + Math.random() * 70]
    const p = pool[Math.floor(Math.random() * pool.length)]
    const type: 'in' | 'out' = Math.random() > 0.6 ? 'in' : 'out'
    movements.value = [
      {
        key: seq++,
        description: p.description,
        amount: Math.floor(Math.random() * 80_000) + 5_000,
        type,
        dept: p.dept,
        time: 'agora',
      },
      ...movements.value,
    ].slice(0, 6)
  }, 2600)
})
onUnmounted(() => timer && clearInterval(timer))

function formatMZN(n: number) {
  return new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(n) + ' MT'
}
</script>

<style scoped>
.live-card {
  /* garante que o card não "cresce" com flutuações internas */
  min-height: 520px;
}
.mv-item {
  height: 52px; /* altura fixa impede layout shift */
}
.mv-enter-active,
.mv-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.mv-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.mv-leave-active {
  position: absolute;
  left: 0;
  right: 0;
}
.mv-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.98);
}
.mv-move {
  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}
</style>
