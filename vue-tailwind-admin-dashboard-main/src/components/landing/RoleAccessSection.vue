<template>
  <section id="acesso" class="relative py-24 overflow-hidden">
    <div
      class="absolute top-1/4 -right-24 w-80 h-80 rounded-full blur-3xl opacity-25 bg-violet-300 dark:bg-violet-500/25 sgfm-float pointer-events-none"
    ></div>
    <div
      class="absolute bottom-0 -left-24 w-72 h-72 rounded-full blur-3xl opacity-25 bg-sky-300 dark:bg-cyan-500/25 sgfm-float pointer-events-none"
      style="animation-delay: 2s"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p class="text-sky-600 dark:text-cyan-300 text-sm font-medium tracking-widest uppercase">
            Privacidade e controlo
          </p>
          <h2
            class="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
          >
            Cada pessoa vê <span class="sgfm-gradient-text">só o que precisa</span>
          </h2>
          <p
            class="mt-5 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl"
          >
            O acesso ao fundo de maneio é definido por perfil. O colaborador acompanha os seus
            pedidos, o gestor aprova a sua equipa e só o Financeiro controla o fundo. O auditor
            consulta tudo, sem poder alterar nada.
          </p>

          <ul class="mt-8 grid sm:grid-cols-2 gap-3">
            <li
              v-for="(f, i) in features"
              :key="f.title"
              v-reveal="{ delay: i * 110 }"
              class="flex items-start gap-3 p-4 rounded-xl border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur"
            >
              <span
                :class="['h-9 w-9 shrink-0 rounded-lg flex items-center justify-center', TONES[f.tone]]"
                v-html="f.icon"
              ></span>
              <div class="min-w-0">
                <div class="text-sm font-semibold text-slate-900 dark:text-white">
                  {{ f.title }}
                </div>
                <div class="mt-0.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {{ f.desc }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div ref="cardWrap">
          <CardGlass
            v-spotlight
            glow
            class="p-5 sm:p-6 sgfm-neon-cyan"
            @mouseenter="hovered = true"
            @mouseleave="hovered = false"
            @focusin="hovered = true"
            @focusout="hovered = false"
          >
            <div class="flex items-center justify-between gap-3">
              <div
                class="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                <span v-html="ICONS.eye"></span>
                Ver como
              </div>
              <span
                class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
              >
                Dados de exemplo
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Perfis de acesso"
              class="mt-3 grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-white/5"
            >
              <button
                v-for="(r, i) in roles"
                :key="r.key"
                :ref="(el) => (tabEls[i] = el as HTMLButtonElement | null)"
                type="button"
                role="tab"
                :id="`role-tab-${r.key}`"
                :aria-selected="active === i"
                aria-controls="role-panel"
                :tabindex="active === i ? 0 : -1"
                @click="select(i)"
                @keydown.right.prevent="select((i + 1) % roles.length, true)"
                @keydown.left.prevent="select((i + roles.length - 1) % roles.length, true)"
                :class="[
                  'relative overflow-hidden flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 px-1.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition',
                  active === i
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-white',
                ]"
              >
                <span class="shrink-0" v-html="r.tabIcon"></span>
                <span class="truncate max-w-full">{{ r.label }}</span>
                <span
                  v-if="autoplay && active === i"
                  :key="cycle"
                  :class="['role-progress', { 'is-paused': paused }]"
                  @animationend="next"
                ></span>
              </button>
            </div>

            <Transition name="role" mode="out-in">
              <div
                :key="role.key"
                id="role-panel"
                role="tabpanel"
                :aria-labelledby="`role-tab-${role.key}`"
                class="mt-5"
              >
                <!-- Perfil -->
                <div class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div
                      :class="[
                        'h-10 w-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br shadow-sm',
                        role.avatarBg,
                      ]"
                    >
                      {{ role.initials }}
                    </div>
                    <div class="min-w-0">
                      <div class="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {{ role.person }}
                      </div>
                      <div class="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {{ role.title }}
                      </div>
                    </div>
                  </div>
                  <span
                    :class="[
                      'shrink-0 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full',
                      TONES[role.scopeTone],
                    ]"
                  >
                    <span :class="['h-1.5 w-1.5 rounded-full', DOTS[role.scopeTone]]"></span>
                    {{ role.scope }}
                  </span>
                </div>

                <!-- Fundo -->
                <div
                  class="mt-4 h-[92px] rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-50/80 dark:bg-white/[0.03] px-4 flex items-center"
                >
                  <div v-if="role.fund === 'hidden'" class="w-full flex items-center justify-between gap-4">
                    <div class="min-w-0">
                      <div class="text-xs text-slate-500 dark:text-slate-400">Saldo do fundo</div>
                      <div
                        class="mt-1 text-2xl font-bold tabular-nums text-slate-400 dark:text-slate-500 blur-[6px] select-none"
                        aria-hidden="true"
                      >
                        0 000 000 MT
                      </div>
                      <span class="sr-only">Oculto para este perfil</span>
                    </div>
                    <div class="flex items-center gap-2.5 shrink-0">
                      <div class="text-right">
                        <div class="text-xs font-semibold text-slate-700 dark:text-slate-200">
                          Sem acesso
                        </div>
                        <div class="text-[11px] text-slate-500 dark:text-slate-400">
                          Reservado ao Financeiro
                        </div>
                      </div>
                      <img
                        src="/images/hero/3d/locked.png"
                        alt=""
                        width="44"
                        height="44"
                        draggable="false"
                        class="role-lock h-11 w-11"
                      />
                    </div>
                  </div>

                  <div v-else class="w-full">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-500 dark:text-slate-400">Nível do fundo</span>
                      <span class="font-semibold text-emerald-600 dark:text-emerald-300">
                        68% · saudável
                      </span>
                    </div>
                    <div class="mt-2 h-2.5 rounded-full bg-slate-200/70 dark:bg-white/10 overflow-hidden">
                      <div
                        class="fund-bar h-full rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500"
                        style="width: 68%"
                      ></div>
                    </div>
                    <div
                      class="mt-2 flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400"
                    >
                      <span class="truncate">
                        <span class="sgfm-gradient-text font-semibold">✦ Previsão IA:</span>
                        reposição sugerida em 6 dias
                      </span>
                      <span
                        v-if="role.fund === 'readonly'"
                        class="shrink-0 inline-flex items-center gap-1 font-medium text-amber-600 dark:text-amber-300"
                      >
                        <span v-html="ICONS.eye"></span>
                        Só leitura
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Lista -->
                <div class="mt-5">
                  <div class="flex items-center justify-between gap-3 mb-3 text-xs">
                    <span class="uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {{ role.listTitle }}
                    </span>
                    <span class="text-slate-400 dark:text-slate-500 truncate">{{ role.listHint }}</span>
                  </div>
                  <ul class="space-y-2">
                    <li
                      v-for="(it, j) in role.items"
                      :key="it.title"
                      class="role-item h-[54px] flex items-center justify-between gap-3 rounded-lg px-3 bg-slate-50 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/5"
                      :style="{ '--i': j }"
                    >
                      <div class="flex items-center gap-3 min-w-0">
                        <div
                          :class="['h-8 w-8 shrink-0 rounded-lg flex items-center justify-center', TONES[it.tone]]"
                          v-html="it.icon"
                        ></div>
                        <div class="min-w-0">
                          <div class="text-sm text-slate-900 dark:text-white truncate">
                            {{ it.title }}
                          </div>
                          <div class="text-xs text-slate-500 truncate">{{ it.meta }}</div>
                        </div>
                      </div>

                      <div
                        v-if="it.approvable && !decisions[it.title]"
                        class="flex items-center gap-1.5 shrink-0"
                      >
                        <button
                          type="button"
                          aria-label="Aprovar"
                          title="Aprovar"
                          class="h-7 w-7 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500 dark:hover:text-white transition"
                          @click="decide(it.title, 'approved')"
                          v-html="ICONS.check"
                        ></button>
                        <button
                          type="button"
                          aria-label="Recusar"
                          title="Recusar"
                          class="h-7 w-7 rounded-lg flex items-center justify-center bg-rose-100 text-rose-700 hover:bg-rose-500 hover:text-white dark:bg-rose-500/15 dark:text-rose-300 dark:hover:bg-rose-500 dark:hover:text-white transition"
                          @click="decide(it.title, 'rejected')"
                          v-html="ICONS.x"
                        ></button>
                      </div>
                      <span
                        v-else
                        :key="statusOf(it).text"
                        :class="[
                          'chip-in shrink-0 inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full',
                          TONES[statusOf(it).tone],
                        ]"
                      >
                        {{ statusOf(it).text }}
                      </span>
                    </li>
                  </ul>
                </div>

                <!-- Âmbito do perfil -->
                <div
                  class="mt-4 pt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"
                >
                  <span class="text-sky-600 dark:text-cyan-300" v-html="ICONS.shield"></span>
                  {{ role.note }}
                </div>
              </div>
            </Transition>
          </CardGlass>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import CardGlass from '@/components/neon/CardGlass.vue'
import { vReveal, vSpotlight } from '@/composables/landingEffects'

type Tone = 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' | 'indigo' | 'slate'
type FundView = 'hidden' | 'full' | 'readonly'
type Decision = 'approved' | 'rejected'

interface RoleItem {
  title: string
  meta: string
  icon: string
  tone: Tone
  status?: { text: string; tone: Tone }
  approvable?: boolean
}

interface Role {
  key: string
  label: string
  tabIcon: string
  person: string
  initials: string
  title: string
  avatarBg: string
  scope: string
  scopeTone: Tone
  fund: FundView
  listTitle: string
  listHint: string
  items: RoleItem[]
  note: string
}

const TONES: Record<Tone, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  slate: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300',
}

const DOTS: Record<Tone, string> = {
  emerald: 'bg-emerald-500 dark:bg-emerald-300',
  amber: 'bg-amber-500 dark:bg-amber-300',
  rose: 'bg-rose-500 dark:bg-rose-300',
  sky: 'bg-sky-500 dark:bg-cyan-300',
  violet: 'bg-violet-500 dark:bg-violet-300',
  indigo: 'bg-indigo-500 dark:bg-indigo-300',
  slate: 'bg-slate-400 dark:bg-slate-300',
}

const svg = (d: string, size = 14) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="currentColor"><path d="${d}"/></svg>`

const PATHS = {
  eye: 'M10 4c-4.5 0-8 4.2-8.6 5.6a1 1 0 000 .8C2 11.8 5.5 16 10 16s8-4.2 8.6-5.6a1 1 0 000-.8C18 8.2 14.5 4 10 4zm0 9.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-2a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
  user: 'M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z',
  users:
    'M7 9a3 3 0 100-6 3 3 0 000 6zm6.5 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 10.5c-3 0-5.5 1.5-5.5 3.5V16h11v-2c0-2-2.5-3.5-5.5-3.5zm6.5 0c-.5 0-1 .1-1.4.2 1 .8 1.4 1.9 1.4 3.3V16h5v-2c0-1.9-2.2-3.5-5-3.5z',
  bank: 'M10 2l8 4v1.5H2V6l8-4zM3.5 9h2v6h-2V9zm4 0h2v6h-2V9zm3 0h2v6h-2V9zm4 0h2v6h-2V9zM2 16.5h16V18H2v-1.5z',
  search:
    'M8.5 3a5.5 5.5 0 014.4 8.8l3.9 3.9-1.1 1.1-3.9-3.9A5.5 5.5 0 118.5 3zm0 1.6a3.9 3.9 0 100 7.8 3.9 3.9 0 000-7.8z',
  car: 'M5 8l1.5-3.5A2 2 0 018.3 3h3.4a2 2 0 011.8 1.5L15 8h1a1 1 0 011 1v5a1 1 0 01-1 1h-1v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V15H7v1.5a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V15H4a1 1 0 01-1-1V9a1 1 0 011-1h1zm1.6 0h6.8l-1.1-2.7a.5.5 0 00-.5-.3H8.2a.5.5 0 00-.5.3L6.6 8zM6 12.5a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z',
  box: 'M10 2l7 3.2v9.6L10 18l-7-3.2V5.2L10 2zm0 1.8L5.3 5.9 10 8l4.7-2.1L10 3.8zM4.6 7.2v6.6l4.6 2.1V9.3L4.6 7.2zm10.8 0l-4.6 2.1v6.6l4.6-2.1V7.2z',
  receipt:
    'M5 2h7l4 4v11a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1zm6 1.5V7h3.5L11 3.5zM6.5 10h7v1.2h-7V10zm0 2.5h7v1.2h-7v-1.2zm0 2.5h4.5v1.2H6.5V15z',
  fuel: 'M4 3h7a1 1 0 011 1v6h1a2 2 0 012 2v2.5a.5.5 0 001 0V8.4l-1.7-1.7 1-1 2 2c.2.2.3.4.3.7v6.1a2 2 0 01-4 0V12a.5.5 0 00-.5-.5H12V17H3V4a1 1 0 011-1zm1 2v4h5V5H5z',
  printer: 'M5 3h10v4H5V3zm-2 5h14a1 1 0 011 1v5h-3v3H5v-3H2V9a1 1 0 011-1zm4 5v2.5h6V13H7z',
  send: 'M3 10h12l-4-4 1.4-1.4L18.8 10l-6.4 6.4L11 15l4-4H3z',
  clock: 'M10 2a8 8 0 100 16 8 8 0 000-16zm.8 4v3.7l3 1.8-.8 1.3-3.8-2.3V6h1.6z',
  chat: 'M10 2.5c-4.4 0-8 3.1-8 7 0 1.9.9 3.7 2.4 4.9L4 17.5l3.6-1.6c.8.2 1.6.4 2.4.4 4.4 0 8-3.1 8-7s-3.6-6.8-8-6.8z',
  check: 'M8 13.2L4.8 10l-1.4 1.4L8 16l9-9-1.4-1.4z',
  x: 'M5.4 4L4 5.4 8.6 10 4 14.6 5.4 16l4.6-4.6 4.6 4.6 1.4-1.4-4.6-4.6L16 5.4 14.6 4 10 8.6z',
  shield:
    'M10 2l6.5 2.5v5c0 4-2.8 7.4-6.5 8.5-3.7-1.1-6.5-4.5-6.5-8.5v-5L10 2zm-1 10.4l4.7-4.7-1.1-1.1L9 10.2 7.4 8.6l-1.1 1.1L9 12.4z',
  lock: 'M6 8V6a4 4 0 118 0v2h1a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1h1zm2 0h4V6a2 2 0 10-4 0v2zm2 3.5a1.5 1.5 0 00-.8 2.8V16h1.6v-1.7a1.5 1.5 0 00-.8-2.8z',
  split: 'M4 3h5v6H4V3zm7 0h5v6h-5V3zM4 11h5v6H4v-6zm7 0h5v6h-5v-6z',
} as const

type IconName = keyof typeof PATHS

const ICONS = Object.fromEntries(
  Object.entries(PATHS).map(([k, d]) => [k, svg(d, k === 'eye' ? 13 : 14)]),
) as Record<IconName, string>

const features: Array<{ title: string; desc: string; tone: Tone; icon: string }> = [
  {
    title: 'Permissões por perfil',
    desc: 'Colaborador, gestor, financeiro e auditor.',
    tone: 'sky',
    icon: svg(PATHS.users, 18),
  },
  {
    title: 'Decisões registadas',
    desc: 'Quem aprovou, quando e com que motivo.',
    tone: 'emerald',
    icon: svg(PATHS.shield, 18),
  },
  {
    title: 'Contas verificadas',
    desc: 'Validação por código OTP enviado ao email.',
    tone: 'violet',
    icon: svg(PATHS.lock, 18),
  },
  {
    title: 'Separação de funções',
    desc: 'Quem faz o pedido não o pode aprovar.',
    tone: 'indigo',
    icon: svg(PATHS.split, 18),
  },
]

const roles: Role[] = [
  {
    key: 'colaborador',
    label: 'Colaborador',
    tabIcon: ICONS.user,
    person: 'Carlos Mabunda',
    initials: 'CM',
    title: 'Colaborador · Logística',
    avatarBg: 'from-sky-400 to-cyan-500',
    scope: 'Acesso pessoal',
    scopeTone: 'sky',
    fund: 'hidden',
    listTitle: 'Os meus pedidos',
    listHint: '4 este mês',
    items: [
      {
        title: 'Táxi – reunião com cliente',
        meta: '2 500 MT · via WhatsApp',
        icon: ICONS.car,
        tone: 'sky',
        status: { text: 'Aprovado', tone: 'emerald' },
      },
      {
        title: 'Material de escritório',
        meta: '1 200 MT · via painel',
        icon: ICONS.box,
        tone: 'violet',
        status: { text: 'Pendente', tone: 'amber' },
      },
      {
        title: 'Almoço com fornecedor',
        meta: '1 850 MT · ontem',
        icon: ICONS.receipt,
        tone: 'amber',
        status: { text: 'Falta recibo', tone: 'rose' },
      },
      {
        title: 'Combustível – entregas',
        meta: '3 000 MT · semana passada',
        icon: ICONS.fuel,
        tone: 'slate',
        status: { text: 'Concluído', tone: 'slate' },
      },
    ],
    note: 'Vê apenas os seus próprios pedidos e o estado de cada um.',
  },
  {
    key: 'gestor',
    label: 'Gestor',
    tabIcon: ICONS.users,
    person: 'Ana Macuácua',
    initials: 'AM',
    title: 'Gestora · Comercial',
    avatarBg: 'from-violet-500 to-fuchsia-500',
    scope: 'Acesso de equipa',
    scopeTone: 'violet',
    fund: 'hidden',
    listTitle: 'À espera da sua aprovação',
    listHint: 'Equipa Comercial',
    items: [
      {
        title: 'Deslocação à Matola',
        meta: 'Joana S. · 3 000 MT · WhatsApp',
        icon: ICONS.car,
        tone: 'sky',
        approvable: true,
      },
      {
        title: 'Combustível – visita a cliente',
        meta: 'Pedro N. · 4 500 MT · painel',
        icon: ICONS.fuel,
        tone: 'violet',
        approvable: true,
      },
      {
        title: 'Impressão de propostas',
        meta: 'Rita C. · 900 MT · WhatsApp',
        icon: ICONS.printer,
        tone: 'amber',
        approvable: true,
      },
      {
        title: 'Almoço com cliente',
        meta: 'Joana S. · 1 600 MT · ontem',
        icon: ICONS.receipt,
        tone: 'slate',
        status: { text: 'Aprovado', tone: 'emerald' },
      },
    ],
    note: 'Aprova ou recusa apenas os pedidos da sua equipa.',
  },
  {
    key: 'financeiro',
    label: 'Financeiro',
    tabIcon: ICONS.bank,
    person: 'Rui Tembe',
    initials: 'RT',
    title: 'Director Financeiro',
    avatarBg: 'from-emerald-400 to-teal-500',
    scope: 'Acesso total',
    scopeTone: 'emerald',
    fund: 'full',
    listTitle: 'Desembolsos de hoje',
    listHint: 'Todos os departamentos',
    items: [
      {
        title: 'Táxi – reunião com cliente',
        meta: 'Logística · carteira móvel',
        icon: ICONS.send,
        tone: 'emerald',
        status: { text: 'Enviado', tone: 'emerald' },
      },
      {
        title: 'Combustível – visita a cliente',
        meta: 'Comercial · transferência',
        icon: ICONS.send,
        tone: 'emerald',
        status: { text: 'Enviado', tone: 'emerald' },
      },
      {
        title: 'Reposição de caixa pequena',
        meta: 'Operações · hoje, 16:00',
        icon: ICONS.clock,
        tone: 'sky',
        status: { text: 'Agendado', tone: 'sky' },
      },
      {
        title: 'Almoço com fornecedor',
        meta: 'Logística · recibo em falta',
        icon: ICONS.receipt,
        tone: 'amber',
        status: { text: 'A conciliar', tone: 'amber' },
      },
    ],
    note: 'Controla o fundo, os desembolsos e a conciliação.',
  },
  {
    key: 'auditor',
    label: 'Auditor',
    tabIcon: ICONS.search,
    person: 'Sofia Langa',
    initials: 'SL',
    title: 'Auditoria interna',
    avatarBg: 'from-amber-400 to-orange-500',
    scope: 'Só leitura',
    scopeTone: 'amber',
    fund: 'readonly',
    listTitle: 'Trilha de auditoria',
    listHint: 'Registo inalterável',
    items: [
      {
        title: 'Ana M. aprovou o pedido #1043',
        meta: '14:32 · Motivo: deslocação a cliente',
        icon: ICONS.check,
        tone: 'emerald',
        status: { text: 'Aprovação', tone: 'emerald' },
      },
      {
        title: 'Carlos M. submeteu o pedido #1043',
        meta: '14:29 · via WhatsApp',
        icon: ICONS.chat,
        tone: 'sky',
        status: { text: 'Pedido', tone: 'sky' },
      },
      {
        title: 'Comprovativo #1039 validado',
        meta: '13:58 · pelo Financeiro',
        icon: ICONS.receipt,
        tone: 'violet',
        status: { text: 'Conciliação', tone: 'violet' },
      },
      {
        title: 'Rui T. recusou o pedido #1037',
        meta: '13:10 · Motivo: sem justificativa',
        icon: ICONS.x,
        tone: 'rose',
        status: { text: 'Recusa', tone: 'rose' },
      },
    ],
    note: 'Consulta todo o histórico, sem poder alterar nada.',
  },
]

const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
const autoplay = !reducedMotion

const active = ref(0)
const cycle = ref(0)
const hovered = ref(false)
const inView = ref(false)
const paused = computed(() => hovered.value || !inView.value)
const role = computed(() => roles[active.value])

const tabEls: Array<HTMLButtonElement | null> = []
const cardWrap = ref<HTMLElement | null>(null)

const decisions = reactive<Record<string, Decision>>({})

function clearDecisions() {
  for (const k of Object.keys(decisions)) delete decisions[k]
}

function select(i: number, focus = false) {
  if (i !== active.value) clearDecisions()
  active.value = i
  cycle.value++
  if (focus) nextTick(() => tabEls[i]?.focus())
}

function next() {
  select((active.value + 1) % roles.length)
}

function decide(title: string, d: Decision) {
  decisions[title] = d
}

function statusOf(it: RoleItem): { text: string; tone: Tone } {
  const d = decisions[it.title]
  if (d === 'approved') return { text: 'Aprovado', tone: 'emerald' }
  if (d === 'rejected') return { text: 'Recusado', tone: 'rose' }
  return it.status ?? { text: '', tone: 'slate' }
}

let obs: IntersectionObserver | null = null
onMounted(() => {
  if (!cardWrap.value) return
  obs = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) inView.value = entry.isIntersecting
    },
    { threshold: 0.35 },
  )
  obs.observe(cardWrap.value)
})
onUnmounted(() => obs?.disconnect())
</script>

<style scoped>
.role-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  transform-origin: left;
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
  animation: role-progress 7s linear forwards;
}
.dark .role-progress {
  background: linear-gradient(90deg, #00f2fe, #8b5cf6);
}
.role-progress.is-paused {
  animation-play-state: paused;
}
@keyframes role-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.role-enter-active,
.role-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.role-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.role-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.role-item {
  animation: role-item-in 0.45s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  animation-delay: calc(var(--i) * 60ms + 80ms);
}
@keyframes role-item-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.fund-bar {
  transform-origin: left;
  animation: fund-grow 1s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s both;
}
@keyframes fund-grow {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.role-lock {
  filter: drop-shadow(0 8px 10px rgba(15, 23, 42, 0.18));
  animation: lock-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s both;
}
.dark .role-lock {
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.5));
}
@keyframes lock-pop {
  from {
    opacity: 0;
    transform: scale(0.6) rotate(-12deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.chip-in {
  animation: chip-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
@keyframes chip-in {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .role-item,
  .fund-bar,
  .role-lock,
  .chip-in {
    animation: none;
  }
  .role-enter-active,
  .role-leave-active {
    transition: none;
  }
}
</style>
