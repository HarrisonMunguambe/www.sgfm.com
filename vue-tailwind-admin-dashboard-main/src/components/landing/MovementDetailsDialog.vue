<template>
  <teleport to="body">
    <transition name="dlg-overlay">
      <div
        v-if="open && movement"
        class="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <transition name="dlg-card" appear>
          <div
            v-if="open"
            class="relative w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_40px_80px_-20px_rgba(15,23,42,0.25)] overflow-hidden"
          >
            <!-- Header neon accent -->
            <div
              :class="[
                'h-1.5 w-full',
                movement.type === 'in'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                  : 'bg-gradient-to-r from-rose-500 to-orange-500',
              ]"
            ></div>

            <div class="p-6 sm:p-8">
              <!-- Top row: close + status -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'h-12 w-12 rounded-xl flex items-center justify-center',
                      movement.type === 'in'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
                    ]"
                  >
                    <svg
                      v-if="movement.type === 'in'"
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 4v10l4-4 1.4 1.4L10 17 4.6 11.4 6 10l4 4V4z" />
                    </svg>
                    <svg
                      v-else
                      width="22"
                      height="22"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 16V6l4 4 1.4-1.4L10 3 4.6 8.6 6 10l4-4v10z" />
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs font-medium uppercase tracking-widest text-slate-500">
                      {{ movement.type === 'in' ? 'Entrada de fundo' : 'Despesa aprovada' }}
                    </div>
                    <div class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                      {{ movement.description }}
                    </div>
                  </div>
                </div>
                <button
                  @click="$emit('close')"
                  class="h-9 w-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/5 transition"
                  aria-label="Fechar"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M6.7 5.3L5.3 6.7 8.6 10l-3.3 3.3 1.4 1.4L10 11.4l3.3 3.3 1.4-1.4L11.4 10l3.3-3.3-1.4-1.4L10 8.6z"
                    />
                  </svg>
                </button>
              </div>

              <!-- Amount -->
              <div class="rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 p-5 mb-6">
                <div class="flex items-end justify-between flex-wrap gap-2">
                  <div>
                    <div class="text-xs uppercase tracking-widest text-slate-500">Valor</div>
                    <div
                      :class="[
                        'mt-1 text-3xl sm:text-4xl font-bold tracking-tight tabular-nums',
                        movement.type === 'in'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400',
                      ]"
                    >
                      {{ movement.type === 'in' ? '+' : '−' }}{{ formatMZN(movement.amount) }}
                    </div>
                  </div>
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
                      details.status === 'Aprovado'
                        ? 'text-emerald-700 border-emerald-300 bg-emerald-50 dark:text-emerald-300 dark:border-emerald-400/30 dark:bg-emerald-500/10'
                        : 'text-amber-700 border-amber-300 bg-amber-50 dark:text-amber-300 dark:border-amber-400/30 dark:bg-amber-500/10',
                    ]"
                  >
                    <span
                      :class="[
                        'h-1.5 w-1.5 rounded-full',
                        details.status === 'Aprovado' ? 'bg-emerald-500' : 'bg-amber-500',
                      ]"
                    ></span>
                    {{ details.status }}
                  </span>
                </div>

                <!-- Mini breakdown -->
                <div class="mt-5 grid grid-cols-3 gap-3">
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500">
                      Subtotal
                    </div>
                    <div class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                      {{ formatMZN(details.subtotal) }}
                    </div>
                  </div>
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500">
                      IVA (17%)
                    </div>
                    <div class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                      {{ formatMZN(details.tax) }}
                    </div>
                  </div>
                  <div>
                    <div class="text-[10px] uppercase tracking-widest text-slate-500">Total</div>
                    <div class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
                      {{ formatMZN(movement.amount) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Details grid -->
              <div class="grid sm:grid-cols-2 gap-3 mb-6">
                <DetailRow label="Referência" :value="details.ref" mono />
                <DetailRow label="Data / Hora" :value="details.datetime" />
                <DetailRow label="Departamento" :value="movement.dept" />
                <DetailRow label="Categoria" :value="details.category" />
                <DetailRow label="Solicitante" :value="details.requester" />
                <DetailRow label="Aprovador" :value="details.approver" />
                <DetailRow label="Método" :value="details.method" />
                <DetailRow label="Fornecedor / Contraparte" :value="details.counterpart" />
              </div>

              <!-- Audit trail -->
              <div class="mb-6">
                <div class="text-xs uppercase tracking-widest text-slate-500 mb-3">
                  Trilha de auditoria
                </div>
                <ol class="space-y-3">
                  <li
                    v-for="(e, i) in details.timeline"
                    :key="i"
                    class="flex items-start gap-3 text-sm"
                  >
                    <span
                      :class="[
                        'mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full shrink-0',
                        e.done
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-400 dark:bg-white/5',
                      ]"
                    >
                      <svg
                        v-if="e.done"
                        width="11"
                        height="11"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z" />
                      </svg>
                    </span>
                    <div class="min-w-0 flex-1">
                      <div class="text-slate-900 dark:text-white font-medium">{{ e.label }}</div>
                      <div class="text-xs text-slate-500">{{ e.at }} • {{ e.actor }}</div>
                    </div>
                  </li>
                </ol>
              </div>

              <!-- Actions -->
              <div class="flex flex-wrap gap-3 justify-end">
                <button
                  @click="$emit('close')"
                  class="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 dark:text-slate-200 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition"
                >
                  Fechar
                </button>
                <button
                  class="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 inline-flex items-center gap-2 dark:text-slate-200 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      d="M10 2a1 1 0 011 1v8.6l2.3-2.3 1.4 1.4L10 15.4 5.3 10.7l1.4-1.4L9 11.6V3a1 1 0 011-1zm-7 14h14v2H3v-2z"
                    />
                  </svg>
                  Exportar PDF
                </button>
                <button
                  class="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.55)] hover:shadow-[0_10px_25px_-4px_rgba(139,92,246,0.65)] hover:-translate-y-0.5 inline-flex items-center gap-2 transition"
                >
                  Ver requisição
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 4l6 6-6 6V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, h, defineComponent } from 'vue'

interface Movement {
  key: number
  description: string
  amount: number
  type: 'in' | 'out'
  dept: string
  time: string
}

const props = defineProps<{
  open: boolean
  movement: Movement | null
}>()

defineEmits<{ (e: 'close'): void }>()

const DetailRow = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    mono: { type: Boolean, default: false },
  },
  setup(p) {
    return () =>
      h(
        'div',
        {
          class:
            'rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 px-3 py-2.5',
        },
        [
          h(
            'div',
            { class: 'text-[10px] uppercase tracking-widest text-slate-500' },
            p.label,
          ),
          h(
            'div',
            {
              class: [
                'mt-0.5 text-sm font-medium text-slate-900 dark:text-white break-words',
                p.mono ? 'font-mono' : '',
              ].join(' '),
            },
            p.value,
          ),
        ],
      )
  },
})

// Deterministic fake enrichment from the movement key
function seed(n: number) {
  let h = n + 2654435761
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b)
  return ((h ^ (h >>> 13)) >>> 0) / 0xffffffff
}

const requesters = [
  'Amélia Cossa',
  'Nelson Matola',
  'Isabel Tivane',
  'Bruno Mabjaia',
  'Clara Macuácua',
  'Jorge Sitoe',
]
const approvers = ['Dir. Financeira', 'CFO', 'Gestor de Fundo', 'Tesoureiro']
const methods = ['Caixa pequena', 'Transferência interbancária', 'M-Pesa empresarial', 'Cartão corporativo']
const counterparts = [
  'Papelaria Escolar, Lda',
  'Petromoc',
  'Taxi Premium',
  'Hotel Cardoso',
  'Vodacom Business',
  'Movitel Empresas',
  'Restaurante Zambi',
]
const categoriesIn = ['Reposição de caixa', 'Devolução de adiantamento', 'Reembolso interno']
const categoriesOut = ['Material de escritório', 'Combustível', 'Deslocação', 'Serviços', 'Representação']

const details = computed(() => {
  const m = props.movement
  if (!m) {
    return {
      ref: '—',
      datetime: '—',
      category: '—',
      requester: '—',
      approver: '—',
      method: '—',
      counterpart: '—',
      status: 'Pendente',
      subtotal: 0,
      tax: 0,
      timeline: [] as { label: string; at: string; actor: string; done: boolean }[],
    }
  }
  const r1 = seed(m.key)
  const r2 = seed(m.key * 7 + 13)
  const r3 = seed(m.key * 31 + 101)

  const now = new Date()
  const dt = new Date(now.getTime() - Math.floor(r1 * 1000 * 60 * 60 * 4))

  const subtotal = Math.round(m.amount / 1.17)
  const tax = m.amount - subtotal

  const cats = m.type === 'in' ? categoriesIn : categoriesOut

  return {
    ref: 'SGFM-' + String(100000 + (m.key % 900000)).padStart(6, '0'),
    datetime: new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dt),
    category: cats[Math.floor(r1 * cats.length)],
    requester: requesters[Math.floor(r2 * requesters.length)],
    approver: approvers[Math.floor(r3 * approvers.length)],
    method: methods[Math.floor(r1 * methods.length)],
    counterpart:
      m.type === 'in' ? 'Tesouraria Central' : counterparts[Math.floor(r2 * counterparts.length)],
    status: r3 > 0.15 ? 'Aprovado' : 'Pendente',
    subtotal,
    tax,
    timeline: [
      {
        label: 'Requisição submetida',
        at: new Intl.DateTimeFormat('pt-MZ', { hour: '2-digit', minute: '2-digit' }).format(
          new Date(dt.getTime() - 1000 * 60 * 45),
        ),
        actor: requesters[Math.floor(r2 * requesters.length)],
        done: true,
      },
      {
        label: 'Aprovação pelo supervisor',
        at: new Intl.DateTimeFormat('pt-MZ', { hour: '2-digit', minute: '2-digit' }).format(
          new Date(dt.getTime() - 1000 * 60 * 20),
        ),
        actor: approvers[Math.floor(r3 * approvers.length)],
        done: true,
      },
      {
        label: 'Liquidação do fundo',
        at: new Intl.DateTimeFormat('pt-MZ', { hour: '2-digit', minute: '2-digit' }).format(dt),
        actor: 'Tesouraria',
        done: r3 > 0.15,
      },
    ],
  }
})

function formatMZN(n: number) {
  return new Intl.NumberFormat('pt-MZ', { maximumFractionDigits: 0 }).format(n) + ' MT'
}
</script>

<style scoped>
.dlg-overlay-enter-active,
.dlg-overlay-leave-active {
  transition: opacity 0.2s ease;
}
.dlg-overlay-enter-from,
.dlg-overlay-leave-to {
  opacity: 0;
}
.dlg-card-enter-active {
  transition: all 0.25s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.dlg-card-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
</style>
