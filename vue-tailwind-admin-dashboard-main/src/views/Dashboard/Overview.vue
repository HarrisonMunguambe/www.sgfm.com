<template>
  <AdminLayout>
    <div class="sgfm-surface relative -m-4 md:-m-6 p-4 md:p-6 min-h-[calc(100vh-72px)]">
      <!-- Decorative blobs (consistente com a landing) -->
      <div
        class="absolute top-10 -right-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-sky-300 dark:bg-cyan-500 dark:opacity-20 sgfm-float pointer-events-none"
      ></div>
      <div
        class="absolute bottom-0 -left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-25 bg-violet-300 dark:bg-violet-500 dark:opacity-20 sgfm-float pointer-events-none"
        style="animation-delay: 1.5s"
      ></div>

      <div class="relative space-y-6 sm:space-y-8">
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <!-- 1. HERO — estado do Fundo de Maneio (a peça central)         -->
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <CardGlass
          glow
          class="relative overflow-hidden sgfm-rise"
        >
          <!-- Grid pattern subtil + mini-blobs (mesma linguagem visual da landing) -->
          <div class="absolute inset-0 sgfm-grid-bg opacity-50 pointer-events-none"></div>
          <div
            class="absolute -top-32 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-sky-400 to-indigo-500 pointer-events-none"
          ></div>
          <div
            class="absolute -bottom-32 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-gradient-to-br from-violet-400 to-fuchsia-500 pointer-events-none"
          ></div>

          <div class="relative grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 p-6 sm:p-8">
            <!-- ── LEFT — info do fundo ───────────────────────── -->
            <div class="min-w-0">
              <!-- Badges no topo -->
              <div class="flex items-center gap-2 flex-wrap mb-5">
                <span
                  class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full sgfm-glass border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-300"
                >
                  <span class="sgfm-ticker-dot"></span>
                  Fundo de Maneio · Em tempo real
                </span>
                <span
                  :class="[
                    'inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border',
                    statusBadgeClass,
                  ]"
                >
                  <span class="h-1.5 w-1.5 rounded-full" :class="statusDotClass"></span>
                  {{ statusLabel }}
                </span>
              </div>

              <!-- Sucursal + selector -->
              <div class="flex items-center gap-3 flex-wrap mb-1">
                <h1 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {{ branch.name }}
                </h1>
                <Select
                  v-model="branch"
                  :options="branches"
                  option-label="name"
                  class="!text-xs"
                  :pt="{ root: { class: 'min-w-[160px]' } }"
                />
              </div>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {{ branch.address }} · Última reposição {{ fmtDate(branch.lastReplenishment) }}
              </p>

              <!-- Balance grande -->
              <div class="mt-7 sm:mt-8">
                <div class="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                  Saldo disponível
                </div>
                <div
                  class="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight sgfm-gradient-text leading-none"
                >
                  {{ fmtMoney(branch.balance) }}
                </div>
              </div>

              <!-- Progress bar com marcador do mínimo crítico -->
              <div class="mt-6 sm:mt-7">
                <div class="flex items-center justify-between text-xs mb-2">
                  <span class="text-slate-500 dark:text-slate-400">Disponibilidade do fundo</span>
                  <span class="font-bold text-slate-700 dark:text-slate-200 tabular-nums">
                    {{ Math.round(availabilityPercent) }}%
                  </span>
                </div>
                <div
                  class="relative h-2.5 rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden"
                >
                  <div
                    class="h-full rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(14,165,233,0.5)]"
                    :class="progressBarClass"
                    :style="{ width: `${Math.min(100, availabilityPercent)}%` }"
                  ></div>
                </div>
                <!-- Marcador do mínimo crítico (linha + label) -->
                <div class="relative h-0">
                  <div
                    class="absolute h-3 w-0.5 bg-rose-500/80 dark:bg-rose-400/80"
                    :style="{
                      left: `${(branch.minimum / branch.fixedFund) * 100}%`,
                      top: '-14px',
                    }"
                  ></div>
                  <div
                    class="absolute text-[10px] font-bold text-rose-600 dark:text-rose-300 whitespace-nowrap"
                    :style="{
                      left: `${(branch.minimum / branch.fixedFund) * 100}%`,
                      top: '4px',
                      transform: 'translateX(-50%)',
                    }"
                  >
                    Mínimo
                  </div>
                </div>
              </div>
            </div>

            <!-- ── RIGHT — stats + acções (painel denso) ──────── -->
            <div class="lg:border-l lg:border-slate-200/60 dark:lg:border-white/10 lg:pl-8">
              <!-- Mini-stats em coluna -->
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                      Fundo fixo
                    </div>
                    <div class="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {{ fmtMoney(branch.fixedFund) }}
                    </div>
                  </div>
                  <div
                    class="h-9 w-9 rounded-xl bg-sky-500/10 dark:bg-cyan-500/15 text-sky-600 dark:text-cyan-300 flex items-center justify-center"
                  >
                    <i class="pi pi-wallet" style="font-size: 0.9rem"></i>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                      Mínimo crítico
                    </div>
                    <div class="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {{ fmtMoney(branch.minimum) }}
                    </div>
                  </div>
                  <div
                    class="h-9 w-9 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300 flex items-center justify-center"
                  >
                    <i class="pi pi-exclamation-triangle" style="font-size: 0.9rem"></i>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                      A aguardar aprovação
                    </div>
                    <div class="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {{ pendingApprovals.length }}
                      <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
                        pedidos
                      </span>
                    </div>
                  </div>
                  <div
                    class="h-9 w-9 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 text-violet-600 dark:text-violet-300 flex items-center justify-center"
                  >
                    <i class="pi pi-inbox" style="font-size: 0.9rem"></i>
                  </div>
                </div>
              </div>

              <!-- Acções (estilo landing — gradient buttons) -->
              <div class="mt-6 pt-6 border-t border-slate-200/60 dark:border-white/10 space-y-2">
                <button
                  @click="onNewRequest"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-8px_rgba(79,70,229,0.55)] hover:shadow-[0_12px_25px_-8px_rgba(139,92,246,0.65)] hover:-translate-y-0.5 transition-all"
                >
                  <i class="pi pi-plus" style="font-size: 0.75rem"></i>
                  Novo pedido
                </button>

                <button
                  @click="scrollToApprovals"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all sgfm-glass border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-sky-300 dark:hover:border-cyan-400/50 hover:-translate-y-0.5"
                >
                  <i class="pi pi-check-square" style="font-size: 0.75rem"></i>
                  Aprovar pendentes
                  <span
                    v-if="pendingApprovals.length > 0"
                    class="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-[10px] font-bold"
                  >
                    {{ pendingApprovals.length }}
                  </span>
                </button>

                <button
                  @click="onReplenish"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all sgfm-glass border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-400/50 hover:-translate-y-0.5"
                >
                  <i class="pi pi-refresh" style="font-size: 0.75rem"></i>
                  Repor fundo
                </button>
              </div>
            </div>
          </div>
        </CardGlass>


        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <!-- 3. KPIs do mês (4 cartões compactos)                         -->
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 sgfm-rise delay-2">
          <KpiCard
            v-for="(k, i) in kpis"
            :key="k.label"
            :label="k.label"
            :value="k.value"
            :hint="k.hint"
            :trend="k.trend"
            :icon="k.icon"
            :accent="k.accent"
            :class="`delay-${(i % 4) + 1}`"
          />
        </div>

        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <!-- 4. CHARTS — evolução do saldo + gastos por categoria         -->
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <div class="grid lg:grid-cols-3 gap-4 sm:gap-6 sgfm-rise delay-3">
          <!-- Evolução do saldo (linha, 30 dias) — 2 colunas -->
          <CardGlass class="lg:col-span-2 p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                  Evolução do saldo
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Últimos 30 dias · {{ branch.name }}
                </p>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-sky-500"></span> Saldo
                <span class="h-2 w-2 rounded-full bg-rose-500 ml-2"></span> Mínimo
              </div>
            </div>
            <VueApexCharts
              type="area"
              height="280"
              :options="balanceChart.options"
              :series="balanceChart.series"
            />
          </CardGlass>

          <!-- Donut: gastos por departamento -->
          <CardGlass class="p-5 sm:p-6">
            <h3 class="text-base font-semibold text-slate-900 dark:text-white">
              Gastos por departamento
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-4">
              Mês corrente · total {{ fmtMoney(monthExpenses) }}
            </p>
            <VueApexCharts
              type="donut"
              height="260"
              :options="departmentChart.options"
              :series="departmentChart.series"
            />
          </CardGlass>
        </div>

        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <!-- 5. Gastos por sucursal (barras) — só DIRETOR                 -->
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <CardGlass v-if="isDirector" class="p-5 sm:p-6 sgfm-rise delay-4">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                Gastos por sucursal
              </h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Comparação mensal · todas as sucursais
              </p>
            </div>
          </div>
          <VueApexCharts
            type="bar"
            height="280"
            :options="branchesChart.options"
            :series="branchesChart.series"
          />
        </CardGlass>

        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <!-- 6. LISTAS ACIONÁVEIS                                         -->
        <!-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ -->
        <div ref="approvalsAnchor" class="grid lg:grid-cols-2 gap-4 sm:gap-6 sgfm-rise delay-4">
          <!-- A aguardar aprovação -->
          <CardGlass class="p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                  A aguardar a minha aprovação
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {{ pendingApprovals.length }}
                  {{ pendingApprovals.length === 1 ? 'pedido' : 'pedidos' }} pendentes
                </p>
              </div>
              <span
                v-if="pendingApprovals.length > 0"
                class="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 text-xs font-bold"
              >
                {{ pendingApprovals.length }}
              </span>
            </div>

            <div v-if="pendingApprovals.length === 0" class="py-10 text-center">
              <div class="text-3xl mb-2">✓</div>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Nenhum pedido pendente. Bom trabalho!
              </p>
            </div>

            <ul v-else class="divide-y divide-slate-200 dark:divide-white/10">
              <li
                v-for="req in pendingApprovals"
                :key="req.id"
                class="py-3 flex items-center gap-3"
              >
                <div
                  class="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 dark:from-cyan-500/20 dark:to-violet-500/20 flex items-center justify-center shrink-0"
                >
                  <span class="text-sm font-bold text-sky-700 dark:text-cyan-300">
                    {{ initialsOf(req.requester) }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {{ req.description }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {{ req.requester }} · {{ req.department }} · {{ req.daysAgo }}d
                  </p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-sm font-semibold text-slate-900 dark:text-white">
                    {{ fmtMoney(req.amount) }}
                  </p>
                  <div class="mt-1 flex gap-1.5 justify-end">
                    <button
                      @click="approveRequest(req.id)"
                      class="text-[10px] px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition font-semibold"
                    >
                      Aprovar
                    </button>
                    <button
                      @click="rejectRequest(req.id)"
                      class="text-[10px] px-2 py-1 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 hover:bg-rose-500/20 transition font-semibold"
                    >
                      Rejeitar
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </CardGlass>

          <!-- Últimos movimentos -->
          <CardGlass class="p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-base font-semibold text-slate-900 dark:text-white">
                  Últimos movimentos
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Entradas e saídas recentes do caixa
                </p>
              </div>
              <router-link
                to="/dashboard/movements"
                class="text-xs font-medium text-sky-600 dark:text-cyan-300 hover:underline"
              >
                Ver tudo →
              </router-link>
            </div>

            <ul class="divide-y divide-slate-200 dark:divide-white/10">
              <li
                v-for="mv in recentMovements"
                :key="mv.id"
                class="py-3 flex items-center gap-3"
              >
                <div
                  :class="[
                    'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
                    mv.type === 'in'
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : 'bg-rose-500/15 text-rose-700 dark:text-rose-300',
                  ]"
                >
                  <i :class="mv.type === 'in' ? 'pi pi-arrow-down-left' : 'pi pi-arrow-up-right'"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {{ mv.description }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {{ mv.dept }} · {{ mv.time }}
                  </p>
                </div>
                <div
                  :class="[
                    'text-sm font-semibold shrink-0 tabular-nums',
                    mv.type === 'in'
                      ? 'text-emerald-600 dark:text-emerald-300'
                      : 'text-slate-900 dark:text-white',
                  ]"
                >
                  {{ mv.type === 'in' ? '+' : '-' }} {{ fmtMoney(Math.abs(mv.amount)) }}
                </div>
              </li>
            </ul>
          </CardGlass>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import KpiCard from '@/components/dashboard/KpiCard.vue'
import VueApexCharts from 'vue3-apexcharts'
import Select from 'primevue/select'

const router = useRouter()

// ──────────────────────────────────────────────────────────
// Mock data — substituir por chamadas ao backend (api.get)
// ──────────────────────────────────────────────────────────

interface Branch {
  id: number
  name: string
  address: string
  balance: number
  fixedFund: number
  minimum: number
  lastReplenishment: string
}

const branches = ref<Branch[]>([
  {
    id: 1,
    name: 'Loja Beira',
    address: 'Av. Eduardo Mondlane, Beira',
    balance: 45_000,
    fixedFund: 60_000,
    minimum: 15_000,
    lastReplenishment: '2026-06-12',
  },
  {
    id: 2,
    name: 'Loja Maputo Central',
    address: 'Av. 25 de Setembro, Maputo',
    balance: 12_400,
    fixedFund: 80_000,
    minimum: 20_000,
    lastReplenishment: '2026-06-08',
  },
])

const branch = ref<Branch>(branches.value[0])

// Simulação de role — vai vir do auth store quando ligares ao backend
const isDirector = ref(true)

// ──────────────────────────────────────────────────────────
// Derived: estado do fundo (saudável / aviso / crítico)
// ──────────────────────────────────────────────────────────
const availabilityPercent = computed(
  () => (branch.value.balance / branch.value.fixedFund) * 100,
)

const fundStatus = computed<'healthy' | 'warning' | 'critical'>(() => {
  if (branch.value.balance < branch.value.minimum) return 'critical'
  if (branch.value.balance < branch.value.minimum * 1.5) return 'warning'
  return 'healthy'
})

const statusLabel = computed(() => {
  switch (fundStatus.value) {
    case 'healthy':
      return 'Saudável'
    case 'warning':
      return 'A aproximar-se do mínimo'
    case 'critical':
      return 'Abaixo do mínimo'
  }
  return ''
})

const statusBadgeClass = computed(() => {
  switch (fundStatus.value) {
    case 'healthy':
      return 'bg-emerald-500/10 text-emerald-700 border-emerald-300/60 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-400/30'
    case 'warning':
      return 'bg-amber-500/10 text-amber-700 border-amber-300/60 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-400/30'
    case 'critical':
      return 'bg-rose-500/10 text-rose-700 border-rose-300/60 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-400/30'
  }
  return ''
})

const statusDotClass = computed(() => {
  switch (fundStatus.value) {
    case 'healthy':
      return 'bg-emerald-500'
    case 'warning':
      return 'bg-amber-500'
    case 'critical':
      return 'bg-rose-500'
  }
  return ''
})

const progressBarClass = computed(() => {
  switch (fundStatus.value) {
    case 'healthy':
      return 'bg-gradient-to-r from-emerald-400 to-teal-500'
    case 'warning':
      return 'bg-gradient-to-r from-amber-400 to-orange-500'
    case 'critical':
      return 'bg-gradient-to-r from-rose-400 to-red-500'
  }
  return ''
})

// ──────────────────────────────────────────────────────────
// KPIs do mês
// ──────────────────────────────────────────────────────────
const monthExpenses = ref(128_000)
type KpiAccent = 'sky' | 'violet' | 'emerald' | 'amber' | 'rose'

interface Kpi {
  label: string
  value: string
  hint: string
  trend: { direction: 'up' | 'down' | 'flat'; label: string }
  icon: string
  accent: KpiAccent
}

const kpis = computed<Kpi[]>(() => [
  {
    label: 'Pedidos pendentes',
    value: '7',
    hint: '32.000 MT em valor',
    trend: { direction: 'up', label: '+2 vs. semana anterior' },
    icon: 'pi-inbox',
    accent: 'sky',
  },
  {
    label: 'Gasto do mês',
    value: fmtMoney(monthExpenses.value),
    hint: '78% do orçamento',
    trend: { direction: 'up', label: '+12% vs. mês passado' },
    icon: 'pi-wallet',
    accent: 'violet',
  },
  {
    label: 'Reembolsos processados',
    value: '23',
    hint: 'no mês corrente',
    trend: { direction: 'flat', label: 'estável' },
    icon: 'pi-replay',
    accent: 'emerald',
  },
  {
    label: 'Tempo médio aprovação',
    value: '4h 12m',
    hint: 'mediana do mês',
    trend: { direction: 'down', label: '-1h vs. mês passado' },
    icon: 'pi-clock',
    accent: 'amber',
  },
])


// ──────────────────────────────────────────────────────────
// Pedidos a aguardar aprovação
// ──────────────────────────────────────────────────────────
interface Request {
  id: number
  requester: string
  department: string
  description: string
  amount: number
  daysAgo: number
}

const pendingApprovals = ref<Request[]>([
  { id: 1, requester: 'Ana Macuácua', department: 'Operações', description: 'Material de escritório', amount: 4_800, daysAgo: 1 },
  { id: 2, requester: 'Pedro Sitoe', department: 'Logística', description: 'Combustível viatura', amount: 12_500, daysAgo: 2 },
  { id: 3, requester: 'Júlia Macamo', department: 'RH', description: 'Reembolso viagem Maputo', amount: 8_200, daysAgo: 5 },
  { id: 4, requester: 'Carlos Cossa', department: 'TI', description: 'Cabos de rede', amount: 3_400, daysAgo: 7 },
])

function approveRequest(id: number) {
  pendingApprovals.value = pendingApprovals.value.filter((r) => r.id !== id)
}
function rejectRequest(id: number) {
  pendingApprovals.value = pendingApprovals.value.filter((r) => r.id !== id)
}

// ──────────────────────────────────────────────────────────
// Últimos movimentos do caixa
// ──────────────────────────────────────────────────────────
const recentMovements = ref([
  { id: 1, description: 'Compra de material de escritório', amount: -4_580, type: 'out' as const, dept: 'Operações', time: '2 min' },
  { id: 2, description: 'Reposição mensal do fundo', amount: 25_000, type: 'in' as const, dept: 'Financeiro', time: '18 min' },
  { id: 3, description: 'Deslocação — Beira', amount: -3_240, type: 'out' as const, dept: 'Comercial', time: '1 h' },
  { id: 4, description: 'Pagamento de combustível', amount: -1_870, type: 'out' as const, dept: 'Logística', time: '3 h' },
  { id: 5, description: 'Reembolso — viagem aprovada', amount: 920, type: 'in' as const, dept: 'RH', time: '5 h' },
])

// ──────────────────────────────────────────────────────────
// Charts — opções do ApexCharts
// ──────────────────────────────────────────────────────────

const balanceChart = computed(() => {
  const days = 30
  // Gera dados mock da evolução do saldo
  const data: number[] = []
  let v = 65_000
  for (let i = 0; i < days; i++) {
    v += Math.random() > 0.85 ? 20_000 : -Math.random() * 4_500
    v = Math.max(10_000, v)
    data.push(Math.round(v))
  }
  data[data.length - 1] = branch.value.balance

  const minimumLine = Array(days).fill(branch.value.minimum)

  return {
    options: {
      chart: {
        type: 'area' as const,
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
      },
      colors: ['#0ea5e9', '#f43f5e'],
      stroke: { curve: 'smooth' as const, width: [3, 2], dashArray: [0, 6] },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.45,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      grid: { borderColor: 'rgba(148,163,184,0.15)', strokeDashArray: 4 },
      xaxis: {
        labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: Array.from({ length: days }, (_, i) => `D${i + 1}`),
      },
      yaxis: {
        labels: {
          style: { colors: '#94a3b8', fontSize: '11px' },
          formatter: (v: number) => `${(v / 1000).toFixed(0)}k`,
        },
      },
      tooltip: {
        theme: 'dark',
        y: { formatter: (v: number) => `${v.toLocaleString('pt-PT')} MT` },
      },
      legend: { show: false },
    },
    series: [
      { name: 'Saldo', data },
      { name: 'Mínimo', data: minimumLine },
    ],
  }
})

const departmentChart = computed(() => ({
  options: {
    chart: { type: 'donut' as const, fontFamily: 'inherit' },
    labels: ['Operações', 'Logística', 'RH', 'TI', 'Comercial'],
    colors: ['#0ea5e9', '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'],
    legend: {
      position: 'bottom' as const,
      labels: { colors: '#94a3b8' },
      fontSize: '12px',
      markers: { width: 10, height: 10 },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#94a3b8',
              fontSize: '12px',
              formatter: () => `${(monthExpenses.value / 1000).toFixed(0)}k MT`,
            },
            value: {
              color: '#0f172a',
              fontSize: '20px',
              fontWeight: 700,
              formatter: (v: string) => `${(Number(v) / 1000).toFixed(0)}k`,
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (v: number) => `${v.toLocaleString('pt-PT')} MT` },
    },
  },
  series: [42_000, 28_500, 22_800, 18_700, 16_000],
}))

const branchesChart = computed(() => ({
  options: {
    chart: {
      type: 'bar' as const,
      toolbar: { show: false },
      fontFamily: 'inherit',
      // Sem dim do resto das séries — evita o efeito "glow" branco no hover
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
    },
    colors: ['#0ea5e9', '#8b5cf6'],
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: '55%', distributed: false },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: 'rgba(148,163,184,0.15)', strokeDashArray: 4 },
    xaxis: {
      categories: ['Beira', 'Maputo Central', 'Nampula', 'Tete', 'Quelimane', 'Pemba'],
      labels: { style: { colors: '#94a3b8', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px' },
        formatter: (v: number) => `${(v / 1000).toFixed(0)}k`,
      },
    },
    legend: { position: 'top' as const, labels: { colors: '#94a3b8' } },
    tooltip: {
      // Tooltip fixo no canto — evita sobrepor as barras
      shared: true,
      intersect: false,
      followCursor: false,
      fixed: { enabled: true, position: 'topRight', offsetX: 0, offsetY: 0 },
      y: { formatter: (v: number) => `${v.toLocaleString('pt-PT')} MT` },
    },
  },
  series: [
    { name: 'Este mês', data: [128_000, 96_500, 72_300, 54_200, 38_700, 28_400] },
    { name: 'Mês passado', data: [104_500, 88_200, 68_900, 60_100, 42_300, 25_800] },
  ],
}))

// ──────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────
function fmtMoney(v: number): string {
  return `${v.toLocaleString('pt-PT')} MT`
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function initialsOf(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

// ──────────────────────────────────────────────────────────
// Acções
// ──────────────────────────────────────────────────────────
const approvalsAnchor = ref<HTMLElement | null>(null)

function scrollToApprovals() {
  approvalsAnchor.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onNewRequest() {
  router.push('/dashboard/requests/new')
}

function onReplenish() {
  router.push('/dashboard/fund/replenish')
}
</script>
